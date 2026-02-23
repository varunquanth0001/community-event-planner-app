# Deployment Guide
## Community Event Planner

---

## Local Development

### Python Server
```bash
cd communityeventplanner
python -m http.server 8000
# Open: http://localhost:8000
```

### Node.js Server
```bash
npm install -g http-server
http-server -p 8000
```

### VS Code Live Server
Right-click `index.html` → "Open with Live Server"

---

## Deployment Options

### 1. Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### 2. Netlify (Easiest)
1. Go to https://app.netlify.com/drop
2. Drag project folder
3. Get instant URL

### 3. GitHub Pages
1. Push to GitHub
2. Settings → Pages → Deploy from `main` branch
3. URL: `https://username.github.io/repo-name/`

### 4. Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## Deployment Checklist

- [ ] All files present (HTML, CSS, JS, manifest, SW)
- [ ] Test login/signup locally
- [ ] Test event CRUD
- [ ] Test RSVP
- [ ] Test search and filters
- [ ] Deploy to chosen platform
- [ ] Verify HTTPS (for PWA)
- [ ] Test PWA installation
