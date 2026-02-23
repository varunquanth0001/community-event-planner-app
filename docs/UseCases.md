# Use Case Document
## Community Event Planner

---

## Actors

| Actor | Description |
|-------|-------------|
| **Guest** | Unauthenticated user |
| **Registered User** | Logged-in user |
| **Event Organizer** | Creator of a specific event |
| **System** | Automated processes |

---

## Use Cases

### UC-01: Register Account
- **Actor**: Guest
- **Flow**: Open app → Click Sign Up → Fill form → Submit → Account created → Switch to login

### UC-02: Login
- **Actor**: Guest
- **Flow**: Enter email/password → Submit → Session created → Redirect to dashboard

### UC-03: View Events
- **Actor**: Registered User
- **Flow**: Open dashboard → Events loaded from LocalStorage → Displayed in grid

### UC-04: Search Events
- **Actor**: Registered User
- **Flow**: Type in search box → Events filtered in real-time

### UC-05: Filter Events
- **Actor**: Registered User
- **Flow**: Select category/date from dropdown → Events filtered

### UC-06: Create Event
- **Actor**: Registered User
- **Flow**: Click "+" → Fill form → Save → Event added to grid

### UC-07: RSVP to Event
- **Actor**: Registered User
- **Flow**: Click RSVP → User added to attendees → Count updated

### UC-08: Cancel RSVP
- **Actor**: Registered User (not creator)
- **Flow**: Click "Going" → User removed from attendees

### UC-09: Edit Event
- **Actor**: Event Organizer
- **Flow**: Click event → Click Edit → Modify form → Save → Event updated

### UC-10: Delete Event
- **Actor**: Event Organizer
- **Flow**: Click event → Click Delete → Confirm → Event removed

### UC-11: Logout
- **Actor**: Registered User
- **Flow**: Click Logout → Confirm → Session cleared → Redirect to login

### UC-12: View Event Detail
- **Actor**: Registered User
- **Flow**: Click event card → Modal shows full details + attendees

### UC-13: Cache Resources (System)
- **Trigger**: First page load
- **Flow**: Service Worker installs → Caches essential files

### UC-14: Session Check (System)
- **Trigger**: Any page load
- **Flow**: Check LocalStorage for session → Redirect accordingly
