/* ============================================
   CODEFORGE — MAIN JS
   Cursor | Particles | Scroll | Animations
   ============================================ */

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX - 2.5}px, ${mouseY - 2.5}px)`;
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.transform = `translate(${curX - 16}px, ${curY - 16}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .feature-item, .course-card, .tcard, .problem-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(1.5)');
  el.addEventListener('mouseleave', () => {});
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.size = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.05;
      this.color = Math.random() > 0.7 ? '0,212,255' : '255,255,255';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  // Draw connections
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${0.04 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// ===== CODE TYPER =====
const codeTyper = document.getElementById('codeTyper');
if (codeTyper) {
  const lines = [
    '<span class="code-comment"># CodeForge Industry Lab — Swiggy Clone</span>',
    '<span class="code-keyword">from</span> <span class="code-var">flask</span> <span class="code-keyword">import</span> Flask, jsonify',
    '<span class="code-keyword">from</span> <span class="code-var">database</span> <span class="code-keyword">import</span> get_orders',
    '',
    '<span class="code-func">@app.route</span>(<span class="code-string">\'/api/orders\'</span>)',
    '<span class="code-keyword">def</span> <span class="code-func">fetch_orders</span>():',
    '  <span class="code-var">orders</span> = get_orders(<span class="code-var">user_id</span>)',
    '  <span class="code-comment">  # ✓ Indexed query — 10ms at 100k users</span>',
    '  <span class="code-keyword">return</span> jsonify(<span class="code-var">orders</span>)',
    '',
    '<span class="code-accent">✓ Code reviewed by Arjun (ex-Zepto)</span>',
    '<span class="code-accent">✓ Pushed to GitHub</span>',
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentHTML = '';

  function typeNextChar() {
    if (lineIndex >= lines.length) {
      setTimeout(() => {
        codeTyper.innerHTML = '';
        currentHTML = '';
        lineIndex = 0; charIndex = 0;
        typeNextChar();
      }, 3000);
      return;
    }
    const line = lines[lineIndex];
    if (charIndex <= line.length) {
      const visible = line.substring(0, charIndex);
      const rest = lines.slice(0, lineIndex).join('<br>');
      codeTyper.innerHTML = (rest ? rest + '<br>' : '') + visible + (charIndex < line.length ? '<span class="cursor-blink">|</span>' : '');
      charIndex++;
      setTimeout(typeNextChar, charIndex === 0 ? 0 : 18);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNextChar, 80);
    }
  }
  setTimeout(typeNextChar, 800);
}

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate stat bars
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, 300);
      });
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Also observe score cards
const scoreObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 400);
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.itch-score-card').forEach(el => scoreObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.hero-stats').forEach(el => statObserver.observe(el));

// ===== FEATURE TABS =====
const featureItems = document.querySelectorAll('.feature-item');
const featureScreens = document.querySelectorAll('.fscreen');
featureItems.forEach(item => {
  item.addEventListener('click', () => {
    const idx = item.dataset.feature;
    featureItems.forEach(f => f.classList.remove('active'));
    featureScreens.forEach(s => s.classList.remove('active'));
    item.classList.add('active');
    document.getElementById(`fscreen-${idx}`)?.classList.add('active');
  });
});

// Auto-rotate features
let featureIdx = 0;
setInterval(() => {
  featureIdx = (featureIdx + 1) % featureItems.length;
  featureItems.forEach(f => f.classList.remove('active'));
  featureScreens.forEach(s => s.classList.remove('active'));
  featureItems[featureIdx]?.classList.add('active');
  document.getElementById(`fscreen-${featureIdx}`)?.classList.add('active');
}, 4000);

// ===== VIDEO MODAL =====
const playBtn = document.getElementById('playVideo');
const videoModal = document.getElementById('videoModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');
const videoFrame = document.getElementById('videoFrame');

playBtn?.addEventListener('click', () => {
  videoModal.classList.add('open');
  document.body.style.overflow = 'hidden';
});
function closeModal() {
  videoModal.classList.remove('open');
  document.body.style.overflow = '';
  if (videoFrame) videoFrame.src = videoFrame.src; // stop video
}
modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== TESTIMONIALS SCROLL DOTS =====
const inner = document.getElementById('testimonialsInner');
const dotsContainer = document.getElementById('testimonialDots');
if (inner && dotsContainer) {
  const cards = inner.querySelectorAll('.tcard');
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'tdot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
    dotsContainer.appendChild(dot);
  });

  inner.addEventListener('scroll', () => {
    const scrollLeft = inner.scrollLeft;
    const cardWidth = cards[0]?.offsetWidth + 24 || 350;
    const active = Math.round(scrollLeft / cardWidth);
    dotsContainer.querySelectorAll('.tdot').forEach((d, i) => {
      d.classList.toggle('active', i === active);
    });
  });

  // Auto-scroll testimonials
  let autoScroll = setInterval(() => {
    const maxScroll = inner.scrollWidth - inner.clientWidth;
    if (inner.scrollLeft >= maxScroll - 10) {
      inner.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      inner.scrollBy({ left: 364, behavior: 'smooth' });
    }
  }, 4000);
  inner.addEventListener('mouseenter', () => clearInterval(autoScroll));
}

// ===== SMOOTH ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== ADD CURSOR BLINK STYLE =====
const style = document.createElement('style');
style.textContent = `
  .cursor-blink {
    display: inline-block;
    color: var(--accent);
    animation: cursorBlink 0.8s ease-in-out infinite;
  }
  @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
`;
document.head.appendChild(style);
