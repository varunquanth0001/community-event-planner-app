// Event Class
class Event {
    constructor(id, title, category, date, time, location, description, creator) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.date = date;
        this.time = time;
        this.location = location;
        this.description = description;
        this.creator = creator;
        this.attendees = [creator]; // Creator is automatically an attendee
        this.createdAt = new Date().toISOString();
    }
}

// Application State
class EventManager {
    constructor() {
        this.events = this.loadEvents();
        this.currentUser = localStorage.getItem('currentUser') || 'varun';
        this.currentEventId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserPreference();
        this.renderEvents();

        // Add some sample events if none exist
        if (this.events.length === 0) {
            this.createSampleEvents();
        }
    }

    createSampleEvents() {
        const sampleEvents = [
            new Event(
                this.generateId(),
                'Community BBQ & Networking',
                'social',
                '2026-02-15',
                '17:00',
                'Central Park Pavilion',
                'Join us for an evening of delicious food, great company, and meaningful connections! Bring your family and friends for a relaxing BBQ in the park.',
                'alice'
            ),
            new Event(
                this.generateId(),
                'Tech Professionals Meetup',
                'professional',
                '2026-02-10',
                '18:30',
                'Innovation Hub, Downtown',
                'Monthly gathering for tech professionals to share insights, discuss trends, and network. This month: AI and Machine Learning in Practice.',
                'bob'
            ),
            new Event(
                this.generateId(),
                'Weekend Soccer Tournament',
                'sports',
                '2026-02-08',
                '09:00',
                'Community Sports Complex',
                'Annual soccer tournament for all skill levels. Form your team or join as an individual player. Prizes for winners and refreshments provided!',
                'charlie'
            ),
            new Event(
                this.generateId(),
                'Art Gallery Opening',
                'arts',
                '2026-02-12',
                '19:00',
                'Modern Arts Gallery',
                'Featuring local artists showcasing contemporary works. Wine and cheese reception. Meet the artists and enjoy an evening of creativity and culture.',
                'diana'
            ),
            new Event(
                this.generateId(),
                'Coding Workshop for Beginners',
                'education',
                '2026-02-20',
                '14:00',
                'Public Library - Tech Lab',
                'Free workshop for anyone interested in learning web development basics. No prior experience needed. Laptops provided or bring your own.',
                'alice'
            )
        ];

        sampleEvents.forEach(event => {
            this.events.push(event);
        });
        this.saveEvents();
        this.renderEvents();
    }

    setupEventListeners() {
        // User selection
        document.getElementById('currentUser').addEventListener('change', (e) => {
            this.currentUser = e.target.value;
            localStorage.setItem('currentUser', this.currentUser);
            this.renderEvents();
        });

        // Create event button
        document.getElementById('createEventBtn').addEventListener('click', () => {
            this.openEventModal();
        });

        // Event form submission
        document.getElementById('eventForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEvent();
        });

        // Close modals
        document.getElementById('closeEventModal').addEventListener('click', () => {
            this.closeEventModal();
        });
        document.getElementById('cancelEventBtn').addEventListener('click', () => {
            this.closeEventModal();
        });
        document.getElementById('closeDetailModal').addEventListener('click', () => {
            this.closeDetailModal();
        });
        document.getElementById('closeDetailBtn').addEventListener('click', () => {
            this.closeDetailModal();
        });

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeEventModal();
                this.closeDetailModal();
            }
        });

        // Search and filters
        document.getElementById('searchInput').addEventListener('input', () => {
            this.renderEvents();
        });
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.renderEvents();
        });
        document.getElementById('dateFilter').addEventListener('change', () => {
            this.renderEvents();
        });

        // Detail modal actions
        document.getElementById('rsvpBtn').addEventListener('click', () => {
            this.toggleRSVP();
        });
        document.getElementById('editEventBtn').addEventListener('click', () => {
            this.editCurrentEvent();
        });
        document.getElementById('deleteEventBtn').addEventListener('click', () => {
            this.deleteCurrentEvent();
        });
    }

    loadUserPreference() {
        document.getElementById('currentUser').value = this.currentUser;
    }

    generateId() {
        return 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    loadEvents() {
        const stored = localStorage.getItem('events');
        return stored ? JSON.parse(stored) : [];
    }

    saveEvents() {
        localStorage.setItem('events', JSON.stringify(this.events));
    }

    openEventModal(event = null) {
        const modal = document.getElementById('eventModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('eventForm');

        if (event) {
            // Edit mode
            modalTitle.textContent = 'Edit Event';
            document.getElementById('eventId').value = event.id;
            document.getElementById('eventTitle').value = event.title;
            document.getElementById('eventCategory').value = event.category;
            document.getElementById('eventDate').value = event.date;
            document.getElementById('eventTime').value = event.time;
            document.getElementById('eventLocation').value = event.location;
            document.getElementById('eventDescription').value = event.description;
        } else {
            // Create mode
            modalTitle.textContent = 'Create Event';
            form.reset();
            document.getElementById('eventId').value = '';
        }

        modal.classList.add('active');
    }

    closeEventModal() {
        document.getElementById('eventModal').classList.remove('active');
        document.getElementById('eventForm').reset();
    }

    saveEvent() {
        const eventId = document.getElementById('eventId').value;
        const title = document.getElementById('eventTitle').value;
        const category = document.getElementById('eventCategory').value;
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const location = document.getElementById('eventLocation').value;
        const description = document.getElementById('eventDescription').value;

        if (eventId) {
            // Update existing event
            const event = this.events.find(e => e.id === eventId);
            if (event && event.creator === this.currentUser) {
                event.title = title;
                event.category = category;
                event.date = date;
                event.time = time;
                event.location = location;
                event.description = description;
            }
        } else {
            // Create new event
            const newEvent = new Event(
                this.generateId(),
                title,
                category,
                date,
                time,
                location,
                description,
                this.currentUser
            );
            this.events.push(newEvent);
        }

        this.saveEvents();
        this.renderEvents();
        this.closeEventModal();
    }

    deleteCurrentEvent() {
        if (!this.currentEventId) return;

        const event = this.events.find(e => e.id === this.currentEventId);
        if (event && event.creator === this.currentUser) {
            if (confirm('Are you sure you want to delete this event?')) {
                this.events = this.events.filter(e => e.id !== this.currentEventId);
                this.saveEvents();
                this.closeDetailModal();
                this.renderEvents();
            }
        }
    }

    editCurrentEvent() {
        if (!this.currentEventId) return;

        const event = this.events.find(e => e.id === this.currentEventId);
        if (event && event.creator === this.currentUser) {
            this.closeDetailModal();
            this.openEventModal(event);
        }
    }

    toggleRSVP() {
        if (!this.currentEventId) return;

        const event = this.events.find(e => e.id === this.currentEventId);
        if (!event) return;

        const attendeeIndex = event.attendees.indexOf(this.currentUser);

        if (attendeeIndex > -1) {
            // Remove RSVP (but not if they're the creator)
            if (event.creator !== this.currentUser) {
                event.attendees.splice(attendeeIndex, 1);
            }
        } else {
            // Add RSVP
            event.attendees.push(this.currentUser);
        }

        this.saveEvents();
        this.renderEvents();
        this.showEventDetail(event);
    }

    showEventDetail(event) {
        this.currentEventId = event.id;
        const modal = document.getElementById('detailModal');
        const content = document.getElementById('eventDetailContent');
        const isCreator = event.creator === this.currentUser;
        const hasRSVP = event.attendees.includes(this.currentUser);

        // Format date and time
        const eventDate = new Date(event.date + 'T' + event.time);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const formattedTime = eventDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h3 style="margin: 0; font-size: 2rem;">${event.title}</h3>
        <span class="category-badge category-${event.category}">${event.category}</span>
      </div>
      
      <div class="event-info">
        <p><strong>📅 Date:</strong> ${formattedDate}</p>
        <p><strong>🕐 Time:</strong> ${formattedTime}</p>
        <p><strong>📍 Location:</strong> ${event.location}</p>
        <p><strong>👤 Created by:</strong> ${this.formatUsername(event.creator)}</p>
      </div>
      
      <h3>Description</h3>
      <p style="color: var(--text-secondary); line-height: 1.8;">${event.description}</p>
      
      <div class="attendees-list">
        <h3>Attendees (${event.attendees.length})</h3>
        ${event.attendees.map(attendee => `
          <div class="attendee-item">
            ${this.formatUsername(attendee)}
            ${attendee === event.creator ? ' (Organizer)' : ''}
            ${attendee === this.currentUser ? ' (You)' : ''}
          </div>
        `).join('')}
      </div>
    `;

        // Show/hide action buttons based on permissions
        const rsvpBtn = document.getElementById('rsvpBtn');
        const editBtn = document.getElementById('editEventBtn');
        const deleteBtn = document.getElementById('deleteEventBtn');

        if (hasRSVP && !isCreator) {
            rsvpBtn.textContent = 'Cancel RSVP';
            rsvpBtn.style.display = 'inline-block';
        } else if (!hasRSVP) {
            rsvpBtn.textContent = 'RSVP';
            rsvpBtn.style.display = 'inline-block';
        } else {
            rsvpBtn.style.display = 'none';
        }

        editBtn.style.display = isCreator ? 'inline-block' : 'none';
        deleteBtn.style.display = isCreator ? 'inline-block' : 'none';

        modal.classList.add('active');
    }

    closeDetailModal() {
        document.getElementById('detailModal').classList.remove('active');
        this.currentEventId = null;
    }

    formatUsername(username) {
        const names = {
            varun: 'Varun (Admin)',
            alice: 'Alice Johnson',
            bob: 'Bob Smith',
            charlie: 'Charlie Davis',
            diana: 'Diana Martinez'
        };
        return names[username] || username;
    }

    getFilteredEvents() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const dateFilter = document.getElementById('dateFilter').value;

        let filtered = this.events;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchTerm) ||
                event.description.toLowerCase().includes(searchTerm) ||
                event.location.toLowerCase().includes(searchTerm)
            );
        }

        // Category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(event => event.category === categoryFilter);
        }

        // Date filter
        if (dateFilter !== 'all') {
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            filtered = filtered.filter(event => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);

                switch (dateFilter) {
                    case 'upcoming':
                        return eventDate >= now;
                    case 'thisWeek':
                        const weekFromNow = new Date(now);
                        weekFromNow.setDate(weekFromNow.getDate() + 7);
                        return eventDate >= now && eventDate <= weekFromNow;
                    case 'thisMonth':
                        return eventDate.getMonth() === now.getMonth() &&
                            eventDate.getFullYear() === now.getFullYear();
                    default:
                        return true;
                }
            });
        }

        // Sort by date (earliest first)
        filtered.sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.time);
            const dateB = new Date(b.date + 'T' + b.time);
            return dateA - dateB;
        });

        return filtered;
    }

    renderEvents() {
        const grid = document.getElementById('eventsGrid');
        const emptyState = document.getElementById('emptyState');
        const filtered = this.getFilteredEvents();

        if (filtered.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');

        grid.innerHTML = filtered.map(event => {
            const isCreator = event.creator === this.currentUser;
            const hasRSVP = event.attendees.includes(this.currentUser);

            // Format date
            const eventDate = new Date(event.date + 'T' + event.time);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            const formattedTime = eventDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });

            return `
        <div class="event-card" onclick="app.showEventDetail(app.events.find(e => e.id === '${event.id}'))">
          <div class="event-card-header">
            <div>
              <h3>${event.title}</h3>
            </div>
            <span class="category-badge category-${event.category}">${event.category}</span>
          </div>
          
          <div class="event-info">
            <p>📅 ${formattedDate} at ${formattedTime}</p>
            <p>📍 ${event.location}</p>
          </div>
          
          <p class="event-description">${event.description}</p>
          
          <div class="event-footer">
            <span class="attendees-count">👥 ${event.attendees.length} attending</span>
            ${hasRSVP ? '<span class="rsvp-badge">✓ You\'re Going</span>' : ''}
          </div>
        </div>
      `;
        }).join('');
    }
}

// Initialize the application
const app = new EventManager();
