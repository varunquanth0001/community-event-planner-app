# Test Plan & Test Cases
## Community Event Planner

---

## 1. Authentication Tests

| TC ID | Test Case | Expected Result | Status |
|-------|-----------|----------------|--------|
| AUTH-01 | Register with valid details | Account created | ✅ Pass |
| AUTH-02 | Register with short name (<2 chars) | Error shown | ✅ Pass |
| AUTH-03 | Register with invalid email | Error shown | ✅ Pass |
| AUTH-04 | Register with short password (<6) | Error shown | ✅ Pass |
| AUTH-05 | Register with mismatched passwords | Error shown | ✅ Pass |
| AUTH-06 | Register with duplicate email | Error shown | ✅ Pass |
| AUTH-07 | Password strength indicator | Weak/Medium/Strong shown | ✅ Pass |
| AUTH-08 | Login with valid credentials | Redirect to dashboard | ✅ Pass |
| AUTH-09 | Login with wrong password | Error shown | ✅ Pass |
| AUTH-10 | Login with non-existent email | Error shown | ✅ Pass |
| AUTH-11 | Toggle password visibility | Password shown/hidden | ✅ Pass |
| AUTH-12 | Auto-redirect if logged in | Redirect to dashboard | ✅ Pass |
| AUTH-13 | Redirect if not logged in | Redirect to login | ✅ Pass |

## 2. Event Management Tests

| TC ID | Test Case | Expected Result | Status |
|-------|-----------|----------------|--------|
| EVT-01 | Create event with all fields | Event in grid | ✅ Pass |
| EVT-02 | Cancel event creation | Modal closes, no event | ✅ Pass |
| EVT-03 | Edit own event | Event updated | ✅ Pass |
| EVT-04 | Edit button hidden for others | Buttons not visible | ✅ Pass |
| EVT-05 | Delete own event | Event removed | ✅ Pass |
| EVT-06 | Events persist after refresh | Events still visible | ✅ Pass |
| EVT-07 | Sample events on first load | 5 events appear | ✅ Pass |

## 3. RSVP Tests

| TC ID | Test Case | Expected Result | Status |
|-------|-----------|----------------|--------|
| RSVP-01 | RSVP to event | User added, button changes | ✅ Pass |
| RSVP-02 | Cancel RSVP | User removed | ✅ Pass |
| RSVP-03 | Quick RSVP from card | Works correctly | ✅ Pass |
| RSVP-04 | Creator shows Organizer badge | Badge shown | ✅ Pass |
| RSVP-05 | Creator can't cancel RSVP | Button disabled | ✅ Pass |

## 4. Search & Filter Tests

| TC ID | Test Case | Expected Result | Status |
|-------|-----------|----------------|--------|
| SRCH-01 | Search by title | Matching events shown | ✅ Pass |
| SRCH-02 | Search by location | Matching events shown | ✅ Pass |
| SRCH-03 | No results found | Empty state shown | ✅ Pass |
| SRCH-04 | Filter by category | Only matching shown | ✅ Pass |
| SRCH-05 | Filter by date (Upcoming) | Future events shown | ✅ Pass |
| SRCH-06 | Combined search + filter | All filters applied | ✅ Pass |

## 5. PWA Tests

| TC ID | Test Case | Expected Result | Status |
|-------|-----------|----------------|--------|
| PWA-01 | Service Worker registers | SW registered | ✅ Pass |
| PWA-02 | Files cached | Files in cache storage | ✅ Pass |
| PWA-03 | App works offline | Loads from cache | ✅ Pass |
| PWA-04 | Install button appears | Button visible | ✅ Pass |

## 6. Test Summary

| Module | Total | Passed | Pass Rate |
|--------|-------|--------|-----------|
| Authentication | 13 | 13 | 100% |
| Event Management | 7 | 7 | 100% |
| RSVP | 5 | 5 | 100% |
| Search & Filter | 6 | 6 | 100% |
| PWA | 4 | 4 | 100% |
| **Total** | **35** | **35** | **100%** |
