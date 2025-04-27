
let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('events')) || [];

const eventTypes = {
    meeting: "bg-blue-100 border-blue-300",
    birthday: "bg-pink-100 border-pink-300",
    reminder: "bg-yellow-100 border-yellow-300",
    task: "bg-green-100 border-green-300"
};

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Initialize calendar
function initCalendar() {
    const weekdaysContainer = document.getElementById('weekdays');
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'p-2 text-center font-medium text-gray-600';
        dayElement.textContent = day;
        weekdaysContainer.appendChild(dayElement);
    });

    updateCalendar();
    setupEventListeners();
}

// Update calendar display
function updateCalendar() {
    const calendarContainer = document.getElementById('calendar');
    const monthDisplay = document.getElementById('monthDisplay');
    
    // Clear previous calendar
    calendarContainer.innerHTML = '';
    
    // Update month display
    monthDisplay.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    // Calculate days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const firstDayIndex = firstDay.getDay();
    const totalDays = lastDay.getDate();

    // Add empty cells for previous month
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'p-2 bg-gray-50';
        calendarContainer.appendChild(emptyCell);
    }

    // Add days
    for (let day = 1; day <= totalDays; day++) {
        const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(event => event.date === date);
        
        const dayCell = document.createElement('div');
        dayCell.className = 'min-h-24 p-2 border border-gray-200 hover:bg-gray-50';
        
        // Add day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'font-medium mb-1';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);

        // Add events
        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'space-y-1';
        
        dayEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = `p-1 text-xs rounded border ${eventTypes[event.type]} truncate`;
            eventElement.textContent = event.title;
            eventElement.title = `${event.title}\n${event.description}`;
            eventsContainer.appendChild(eventElement);
        });

        dayCell.appendChild(eventsContainer);
        calendarContainer.appendChild(dayCell);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('prevButton').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    // Modal controls
    const modal = document.getElementById('eventModal');
    const form = document.getElementById('eventForm');

    document.getElementById('addEventBtn').addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    document.getElementById('cancelButton').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newEvent = {
            id: Date.now(),
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            type: document.getElementById('eventType').value,
            description: document.getElementById('eventDescription').value
        };

        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));
        
        updateCalendar();
        modal.classList.add('hidden');
        form.reset();
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCalendar);