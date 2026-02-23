# Software Requirements Specification (SRS)
## Community Event Planner

| Field | Details |
|-------|---------|
| **Project Title** | Community Event Planner |
| **Version** | 1.0.0 |
| **Author** | Varun |
| **Date** | February 2026 |
| **Technology** | HTML5, CSS3, JavaScript (ES6+), PWA |

---

## 1. Introduction

### 1.1 Purpose
This document provides a complete Software Requirements Specification for the **Community Event Planner** web application.

### 1.2 Scope
The Community Event Planner is a Progressive Web Application (PWA) that enables users to create, manage, discover, and RSVP to community events. The application works entirely on the client-side using LocalStorage for data persistence.

### 1.3 Definitions & Abbreviations

| Term | Definition |
|------|-----------|
| **PWA** | Progressive Web Application |
| **RSVP** | Répondez s'il vous plaît (Please respond) |
| **CRUD** | Create, Read, Update, Delete |

---

## 2. Overall Description

### 2.1 Product Features (Summary)
- User Authentication (Login / Signup)
- Event CRUD Operations
- RSVP System
- Search & Filter
- PWA with Offline Support
- Responsive UI with Glassmorphic Design

### 2.2 User Classes

| User Type | Description |
|-----------|-------------|
| **Event Organizer** | Creates and manages events |
| **Attendee** | Browses events, RSVPs to events |
| **New User** | Registers an account |

### 2.3 Operating Environment
- **Client**: Any modern web browser
- **Platform**: Desktop, Tablet, Mobile (Responsive)
- **Storage**: Browser LocalStorage
- **Connectivity**: Works both online and offline (PWA)

---

## 3. Functional Requirements

### 3.1 Authentication Module

| ID | Requirement | Priority |
|----|------------|----------|
| FR-AUTH-01 | User registration with Name, Email, Password, Confirm Password | High |
| FR-AUTH-02 | Email format validation | High |
| FR-AUTH-03 | Minimum password length of 6 characters | High |
| FR-AUTH-04 | Password strength indicator | Medium |
| FR-AUTH-05 | Prevent duplicate email registrations | High |
| FR-AUTH-06 | Login with Email and Password | High |
| FR-AUTH-07 | Redirect authenticated users to dashboard | High |
| FR-AUTH-08 | Redirect unauthenticated users to login | High |
| FR-AUTH-09 | Logout with confirmation | Medium |
| FR-AUTH-10 | Toggle password visibility | Medium |

### 3.2 Event Management Module

| ID | Requirement | Priority |
|----|------------|----------|
| FR-EVT-01 | Create new events | High |
| FR-EVT-02 | Event fields: Title, Category, Date, Time, Location, Description | High |
| FR-EVT-03 | 6 categories: Social, Professional, Sports, Arts, Education, Other | High |
| FR-EVT-04 | Edit own events only | High |
| FR-EVT-05 | Delete own events with confirmation | High |
| FR-EVT-06 | Display events in responsive grid | Medium |
| FR-EVT-07 | Persist data in LocalStorage | High |

### 3.3 RSVP Module

| ID | Requirement | Priority |
|----|------------|----------|
| FR-RSVP-01 | RSVP to any event | High |
| FR-RSVP-02 | Cancel RSVP | High |
| FR-RSVP-03 | Creator auto-added as attendee | High |
| FR-RSVP-04 | Display attendee count and list | Medium |
| FR-RSVP-05 | Quick RSVP from event cards | Medium |

### 3.4 Search & Filter Module

| ID | Requirement | Priority |
|----|------------|----------|
| FR-SRCH-01 | Real-time text search (title, description, location) | High |
| FR-SRCH-02 | Category filter dropdown | High |
| FR-SRCH-03 | Date filter (Upcoming, This Week, This Month) | High |
| FR-SRCH-04 | Sort by date (earliest first) | Medium |

### 3.5 PWA Module

| ID | Requirement | Priority |
|----|------------|----------|
| FR-PWA-01 | Service Worker for offline caching | Medium |
| FR-PWA-02 | Cache essential files | Medium |
| FR-PWA-03 | Install App button | Low |
| FR-PWA-04 | Web manifest with metadata | Medium |

---

## 4. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|------------|
| NFR-01 | Performance | Page load within 2 seconds |
| NFR-02 | Performance | Real-time search (<100ms) |
| NFR-03 | Usability | Responsive across all viewports |
| NFR-04 | Usability | Modern glassmorphic design |
| NFR-05 | Reliability | Offline support after initial load |
| NFR-06 | Reliability | Data persists via LocalStorage |
| NFR-07 | Security | Passwords hashed before storage |
| NFR-08 | Security | Only creators can edit/delete events |
| NFR-09 | Compatibility | Chrome, Firefox, Edge, Safari |

---

## 5. System Architecture

```
┌─────────────────────────────────────────────────┐
│                  CLIENT (Browser)                │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │login.html│  │index.html│  │service-worker │  │
│  │auth.js   │  │app.js    │  │    .js        │  │
│  │auth-css  │  │styles.css│  │               │  │
│  └────┬─────┘  └────┬─────┘  └───────┬───────┘  │
│       └──────┬───────┘                │          │
│              ▼                        ▼          │
│     ┌──────────────┐        ┌──────────────┐     │
│     │ LocalStorage │        │  Cache API   │     │
│     └──────────────┘        └──────────────┘     │
└─────────────────────────────────────────────────┘
```

---

## 6. Data Dictionary

### User Object

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique user ID |
| name | String | Full name |
| email | String | Email (unique) |
| password | String | Hashed password |
| avatar | Object | `{ type, initial, color }` |
| createdAt | String | ISO timestamp |

### Event Object

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique event ID |
| title | String | Event title |
| category | String | social/professional/sports/arts/education/other |
| date | String | YYYY-MM-DD |
| time | String | HH:MM |
| location | String | Event location |
| description | String | Event description |
| creator | String | User ID of creator |
| attendees | Array | Array of user IDs |
| createdAt | String | ISO timestamp |
