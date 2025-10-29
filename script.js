function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId + '-page').classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.nav-link[data-page="' + pageId + '"]').forEach(link => {
        link.classList.add('active');
    });
    
    const breadcrumb = document.querySelector('.breadcrumb');
    if (pageId === 'home') {
        breadcrumb.innerHTML = '<a href="#" class="nav-link" data-page="home">Home</a> / <span>Dashboard</span>';
    } else {
        const pageTitle = document.getElementById(pageId + '-page').querySelector('h2').textContent;
        breadcrumb.innerHTML = '<a href="#" class="nav-link" data-page="home">Home</a> / <span>' + pageTitle + '</span>';
    }
}

document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        showPage(page);
        document.querySelector('nav').classList.remove('active');
    });
});

let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('departmentEvents')) || [];

function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const currentMonth = document.getElementById('currentMonth');
    
    currentMonth.textContent = currentDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
    });

    calendar.innerHTML = '';

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const totalDays = lastDay.getDate();
    const startingDay = firstDay.getDay();

    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendar.appendChild(emptyDay);
    }

    for (let day = 1; day <= totalDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);

        const dayEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day && 
                   eventDate.getMonth() === currentDate.getMonth() && 
                   eventDate.getFullYear() === currentDate.getFullYear();
        });

        if (dayEvents.length > 0) {
            const eventDot = document.createElement('div');
            eventDot.className = 'event-dot';
            eventDot.title = dayEvents.map(event => event.title).join(', ');
            dayElement.appendChild(eventDot);
        }

        calendar.appendChild(dayElement);
    }
}

document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;

    const newEvent = {
        id: Date.now().toString(),
        title: title,
        date: date
    };

    events.push(newEvent);
    localStorage.setItem('departmentEvents', JSON.stringify(events));
    this.reset();
    generateCalendar();
    alert('Event added successfully!');
});

document.getElementById('prevMonth').addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
});

document.querySelector('.nav-toggle').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

const sidebarItems = document.querySelectorAll('.sidebar-item');
sidebarItems.forEach(item => {
    const link = item.querySelector('a');
    link.addEventListener('click', function(e) {
        if (item.querySelector('.sidebar-submenu')) {
            e.preventDefault();
            sidebarItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        }
    });
});

document.querySelectorAll('.file-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const fileName = this.querySelector('.file-name').textContent;
        alert('This would download: ' + fileName + '\n\nFor now, this is a demo. When you add real files, this will work!');
    });
});

generateCalendar();