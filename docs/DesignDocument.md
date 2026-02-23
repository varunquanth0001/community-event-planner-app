# Design Document
## Community Event Planner

---

## 1. Design Philosophy
- **Simplicity First** — No external frameworks; pure HTML, CSS, JavaScript
- **Offline First** — PWA-enabled with service worker caching
- **Modern Aesthetics** — Glassmorphic UI with dark theme
- **Modular Architecture** — OOP with ES6 classes

---

## 2. UI/UX Design

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0f172a` | Main background |
| `--bg-secondary` | `#1e293b` | Card backgrounds |
| `--text-primary` | `#f1f5f9` | Primary text |
| `--accent-primary` | `#6366f1` | Primary actions (Indigo) |
| `--accent-secondary` | `#ec4899` | Secondary (Pink) |
| `--accent-tertiary` | `#14b8a6` | Tertiary (Teal) |

### Category Colors

| Category | Color |
|----------|-------|
| Social | Indigo `#6366f1` |
| Professional | Pink `#ec4899` |
| Sports | Teal `#14b8a6` |
| Arts | Amber `#f59e0b` |
| Education | Green `#10b981` |
| Other | Slate `#64748b` |

### Visual Elements

| Element | Style |
|---------|-------|
| Cards | Glassmorphic with `backdrop-filter: blur()` |
| Buttons | Gradient backgrounds with hover animations |
| Modals | Centered overlay with slide-in |
| Inputs | Dark background with glow on focus |

---

## 3. Component Architecture

```
login.html
├── AuthContainer
│   ├── BgAnimation
│   ├── AuthCard (LoginForm / SignupForm)
│   └── FeaturesSection
└── ToastNotification

index.html
├── Header (Title, UserProfile, Buttons)
├── Controls (SearchBox, Filters)
├── EventsGrid (EventCards)
├── EventModal (Create/Edit Form)
└── DetailModal (View + RSVP + Actions)
```

---

## 4. Data Design

### LocalStorage Schema
```
localStorage
├── "event_planner_users"   → JSON Array of Users
├── "event_planner_session" → JSON Object (session)
├── "events"                → JSON Array of Events
└── "currentUser"           → String (user ID)
```

### Entity Relationship
```
User ──creates──▶ Event (1:many)
User ──attends──▶ Event (many:many via attendees[])
```

---

## 5. Interaction Flows

### Authentication Flow
```
Open App → Check Session → No Session → Login Page
→ Login/Register → Save Session → Dashboard
```

### Event CRUD Flow
```
Create: Click "+" → Modal → Fill Form → Save → LocalStorage → Render
Edit: Click Card → Detail → Edit Btn → Modal → Save → Render
Delete: Click Card → Detail → Delete Btn → Confirm → Remove → Render
```

### RSVP Flow
```
Click RSVP → Toggle in attendees[] → Save → Re-render
(Creator cannot un-RSVP)
```

---

## 6. Security Design

| Area | Implementation |
|------|---------------|
| Password Storage | Hashed (demo-level) |
| Session | LocalStorage JSON object |
| Route Protection | Session check on page load |
| Permissions | Only creators edit/delete |

---

## 7. PWA Design

- **Strategy**: Cache-first, Network-fallback
- **Cache**: `event-planner-v1`
- **Events**: Install (cache files), Fetch (serve from cache), Activate (cleanup)

---

## 8. Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| > 1200px | 3-column grid |
| 768-1200px | 2-column grid |
| < 768px | 1-column grid, stacked layout |
| < 480px | Compact mobile layout |
