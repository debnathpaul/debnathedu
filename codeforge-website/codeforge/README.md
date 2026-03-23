# CodeForge — EdTech Website

A modern, dark-themed EdTech website for CodeForge — solving the gap between college theory and industry skills.

## 🚀 Deploy to GitHub Pages (3 steps)

### Step 1: Create GitHub repo
1. Go to [github.com/new](https://github.com/new)
2. Name it: `codeforge` (or any name you like)
3. Keep it **Public**
4. Click **Create repository**

### Step 2: Upload files
```bash
# If you have Git installed:
git init
git add .
git commit -m "Initial CodeForge website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/codeforge.git
git push -u origin main
```

**Or use GitHub's web UI:**
- Click "uploading an existing file" on the repo page
- Drag and drop all files/folders
- Commit

### Step 3: Enable GitHub Pages
1. Go to repo **Settings** → **Pages**
2. Under "Source" select **GitHub Actions**
3. The workflow will auto-deploy!
4. Your site will be live at: `https://YOUR_USERNAME.github.io/codeforge`

---

## 📁 File Structure
```
codeforge/
├── index.html          ← Landing page
├── courses.html        ← All courses page
├── css/
│   ├── style.css       ← Main styles (dark theme)
│   └── courses.css     ← Courses page styles
├── js/
│   ├── main.js         ← Animations, particles, interactions
│   └── courses.js      ← Course filters, accordion
└── .github/
    └── workflows/
        └── deploy.yml  ← Auto-deploy to GitHub Pages
```

## ✨ Features
- Dark futuristic theme with cyan accents
- Animated particle background
- Code typing animation
- Scroll reveal animations
- Custom cursor
- Counter animations
- Auto-rotating testimonials
- Video modal
- Mobile responsive
- Filter & accordion on courses page
- 4 complete courses with full curriculum

## 🎨 Customization
Edit `css/style.css` CSS variables at top:
```css
--accent: #00d4ff;      /* Main cyan color */
--bg-primary: #080b0f;  /* Darkest background */
```
