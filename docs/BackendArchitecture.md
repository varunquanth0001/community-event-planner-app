# Backend Architecture Document
## Community Event Planner

---

## 1. Overview
This project uses a **client-side backend architecture** — all data processing, authentication, and storage happens in the browser using JavaScript classes and LocalStorage API.

## 2. Architecture Comparison

| Traditional Backend | Our Client-Side Backend |
|--------------------|------------------------|
| Express.js / Django | `auth.js` + `app.js` (ES6 Classes) |
| MongoDB / MySQL | LocalStorage API |
| JWT / Session Cookies | LocalStorage Session Object |
| bcrypt hashing | Custom hash function |
| REST API endpoints | Class methods |

## 3. Authentication API (`auth.js`)

### AuthManager.register(name, email, password, confirmPassword)
- **Equivalent**: `POST /api/auth/register`
- **Validations**: Name (≥2 chars), Email (regex), Password (≥6 chars), Password match, Unique email
- **Returns**: `{ success, message, user }`

### AuthManager.login(email, password, remember)
- **Equivalent**: `POST /api/auth/login`
- **Flow**: Validate → Find user → Compare hash → Create session → Save to LocalStorage
- **Returns**: `{ success, message, user }`

### AuthManager.hashPassword(password)
- Simple bit-shift hash (demo-level; use bcrypt in production)

### AuthManager.checkPasswordStrength(password)
- Scores: length ≥8, ≥12, mixed case, digits, special chars
- Returns: `weak` (0-2), `medium` (3-4), `strong` (5)

## 4. Event Management API (`app.js`)

### EventManager.saveEvent()
- **Equivalent**: `POST /api/events` (create) or `PUT /api/events/:id` (update)
- Permission check: only creator can update

### EventManager.deleteCurrentEvent()
- **Equivalent**: `DELETE /api/events/:id`
- Permission check + confirmation dialog

### EventManager.toggleRSVP() / quickRSVP(eventId)
- **Equivalent**: `POST /api/events/:id/rsvp`
- Toggle user in attendees array; creator protected from un-RSVP

### EventManager.getFilteredEvents()
- **Equivalent**: `GET /api/events?search=&category=&date=`
- Pipeline: Text Search → Category Filter → Date Filter → Sort by date

## 5. Database Schema (LocalStorage)

| Key | Type | Description |
|-----|------|-------------|
| `event_planner_users` | JSON Array | User accounts |
| `event_planner_session` | JSON Object | Active session |
| `events` | JSON Array | All events |
| `currentUser` | String | Current user ID |

## 6. Security

| Feature | Implementation | Production Recommendation |
|---------|---------------|--------------------------|
| Password hashing | Simple hash | bcrypt with salt |
| Session | LocalStorage JSON | HTTP-only cookies / JWT |
| Permissions | Client-side check | Server-side middleware |

## 7. Upgrade Path to Full Backend

| Method | Endpoint | Maps To |
|--------|---------|---------|
| POST | `/api/auth/register` | `AuthManager.register()` |
| POST | `/api/auth/login` | `AuthManager.login()` |
| POST | `/api/auth/logout` | `AuthManager.clearSession()` |
| GET | `/api/events` | `EventManager.loadEvents()` |
| POST | `/api/events` | `EventManager.saveEvent()` (create) |
| PUT | `/api/events/:id` | `EventManager.saveEvent()` (update) |
| DELETE | `/api/events/:id` | `EventManager.deleteCurrentEvent()` |
| POST | `/api/events/:id/rsvp` | `EventManager.toggleRSVP()` |

**Recommended Stack**: Node.js + Express + MongoDB + JWT + bcrypt
