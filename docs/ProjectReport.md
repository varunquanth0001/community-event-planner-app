# Project Report
## Community Event Planner

| Field | Details |
|-------|---------|
| **Project Title** | Community Event Planner |
| **Author** | Varun |
| **Date** | February 2026 |
| **Version** | 1.0.0 |
| **Technology Stack** | HTML5, CSS3, JavaScript (ES6+), PWA |

---

## 1. Abstract

The **Community Event Planner** is a Progressive Web Application (PWA) designed to help community members create, discover, manage, and participate in local events. Built using vanilla HTML5, CSS3, and JavaScript without any external frameworks, the application features a glassmorphic UI design, user authentication, event CRUD operations, RSVP system, and powerful search/filter capabilities.

---

## 2. Introduction

### 2.1 Problem Statement
Communities lack a simple, lightweight, and dedicated platform for creating and managing local events.

### 2.2 Objectives
1. Develop a user-friendly web application for community event management
2. Implement user authentication for secure access
3. Enable event creation, editing, deletion, and RSVP functionality
4. Provide powerful search and filtering capabilities
5. Ensure the app works offline using PWA technology
6. Create a visually appealing, modern, and responsive UI

---

## 3. System Design

### 3.1 Architecture Diagram

```
┌──────────────────────────────────────────────────────┐
│                    USER (Browser)                     │
│  ┌─────────────────┐      ┌─────────────────────┐    │
│  │  Authentication  │      │   Main Application   │    │
│  │  login.html      │─────▶│  index.html          │    │
│  │  auth.js         │      │  app.js              │    │
│  │  auth-styles.css │      │  styles.css          │    │
│  └────────┬─────────┘      └──────────┬───────────┘    │
│           ▼                           ▼                │
│  ┌────────────────────────────────────────────────┐    │
│  │              LocalStorage API                  │    │
│  └────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────┐    │
│  │           Service Worker (Cache API)           │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

### 3.2 Modules
1. **Authentication** (`auth.js`) — Registration, Login, Session management
2. **Event Management** (`app.js`) — CRUD operations, RSVP, Search/Filter
3. **Service Worker** (`service-worker.js`) — Offline caching
4. **PWA** (`manifest.json`) — App installability

---

## 4. Implementation

### 4.1 Technology Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | CSS3 (Glassmorphism, Flexbox, Grid, Animations) |
| Logic | JavaScript ES6+ (Classes, Arrow Functions, Template Literals) |
| Storage | LocalStorage API |
| Offline | Service Workers, Cache API |
| App | PWA (Web App Manifest) |

### 4.2 File Structure

```
communityeventplanner/
├── index.html           → Main dashboard page
├── login.html           → Authentication page
├── app.js               → Event management logic
├── auth.js              → Authentication logic
├── styles.css           → Main application styles
├── auth-styles.css      → Authentication page styles
├── manifest.json        → PWA manifest
├── service-worker.js    → Offline caching
├── README.md            → Project documentation
└── docs/                → Project documents
```

---

## 5. Testing

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|----------------|--------|
| TC-01 | Register with valid details | Account created | ✅ Pass |
| TC-02 | Register with duplicate email | Error shown | ✅ Pass |
| TC-03 | Login with valid credentials | Redirect to dashboard | ✅ Pass |
| TC-04 | Login with wrong password | Error: "Incorrect password" | ✅ Pass |
| TC-05 | Create event with all fields | Event appears in grid | ✅ Pass |
| TC-06 | Edit own event | Event updated | ✅ Pass |
| TC-07 | Delete own event | Event removed | ✅ Pass |
| TC-08 | RSVP to event | User added to attendees | ✅ Pass |
| TC-09 | Cancel RSVP | User removed from attendees | ✅ Pass |
| TC-10 | Search by title | Matching events shown | ✅ Pass |
| TC-11 | Filter by category | Only matching shown | ✅ Pass |
| TC-12 | Filter by date | Only matching shown | ✅ Pass |
| TC-13 | Logout | Session cleared, redirect to login | ✅ Pass |
| TC-14 | Access dashboard without login | Redirect to login | ✅ Pass |
| TC-15 | App works offline | Cached pages load | ✅ Pass |

---

## 6. Limitations

1. No backend — data stored locally only
2. Simplified password hashing (demo-level)
3. No image upload for events
4. No push notifications
5. LocalStorage limit (~5-10 MB)

---

## 7. Future Enhancements

1. Backend Integration (Node.js + MongoDB)
2. Real Authentication (JWT + OAuth)
3. Image Upload
4. Push Notifications
5. Google Maps Integration
6. Comments System
7. Social Sharing

---

## 8. Conclusion

The Community Event Planner successfully demonstrates a complete, modern web application built entirely with vanilla web technologies, showcasing proficiency in frontend development, PWA technologies, UI/UX design, and client-side architecture.

---

## 9. References

1. MDN Web Docs — https://developer.mozilla.org
2. Google Developers (PWA) — https://web.dev/progressive-web-apps
3. Service Workers API — https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
4. CSS Glassmorphism — https://css.glass
