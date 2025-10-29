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

// Add these functions to your existing script.js file

// Shop data
let shopItems = {
    vegetables: [
        { id: 1, name: "Fresh Tomatoes", price: 2.50, unit: "per lb", image: "🥬", description: "Freshly harvested tomatoes from our garden", available: true },
        { id: 2, name: "Carrots", price: 1.75, unit: "per lb", image: "🥕", description: "Organic carrots, crisp and sweet", available: true },
        { id: 3, name: "Lettuce", price: 1.50, unit: "per head", image: "🥬", description: "Fresh green lettuce", available: true },
        { id: 4, name: "Bell Peppers", price: 3.00, unit: "per lb", image: "🫑", description: "Colorful bell peppers", available: false },
        { id: 5, name: "Cucumbers", price: 1.25, unit: "each", image: "🥒", description: "Fresh cucumbers", available: true }
    ],
    plants: [
        { id: 1, name: "Orchid Plant", price: 15.00, unit: "each", image: "🌸", description: "Beautiful flowering orchid", available: true },
        { id: 2, name: "Succulent Set", price: 8.50, unit: "set of 3", image: "🌵", description: "Low maintenance succulent plants", available: true },
        { id: 3, name: "Herb Garden Kit", price: 12.00, unit: "kit", image: "🌿", description: "Basil, mint, and parsley starter kit", available: true },
        { id: 4, name: "Rose Bush", price: 18.00, unit: "each", image: "🌹", description: "Red rose bush", available: false }
    ],
    chickens: [
        { id: 1, name: "Fresh Eggs", price: 4.00, unit: "per dozen", image: "🥚", description: "Farm fresh eggs from our chickens", available: true },
        { id: 2, name: "Whole Chicken", price: 12.00, unit: "each", image: "🍗", description: "Fresh whole chicken", available: true },
        { id: 3, name: "Chicken Feed", price: 8.50, unit: "20lb bag", image: "🌾", description: "Organic chicken feed", available: true }
    ]
};

let cart = JSON.parse(localStorage.getItem('shopCart')) || [];

// Shop functions
function showShopCategory(category) {
    // Hide all category contents
    document.querySelectorAll('.shop-category').forEach(cat => {
        cat.classList.remove('active');
    });
    
    // Show selected category
    document.getElementById(category + '-shop').classList.add('active');
    
    // Update active tab
    document.querySelectorAll('.shop-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.shop-tab[data-category="${category}"]`).classList.add('active');
    
    renderShopItems(category);
}

function renderShopItems(category) {
    const container = document.getElementById(category + '-items');
    const items = shopItems[category];
    
    container.innerHTML = items.map(item => `
        <div class="shop-item-card ${!item.available ? 'out-of-stock' : ''}">
            <div class="shop-item-image">${item.image}</div>
            <div class="shop-item-info">
                <h4>${item.name}</h4>
                <p class="shop-item-description">${item.description}</p>
                <div class="shop-item-price">$${item.price} <span>${item.unit}</span></div>
                <div class="shop-item-availability ${item.available ? 'in-stock' : 'out-of-stock'}">
                    ${item.available ? 'In Stock' : 'Out of Stock'}
                </div>
            </div>
            <div class="shop-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id}, '${category}')">-</button>
                    <span class="quantity-display" id="quantity-${category}-${item.id}">0</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id}, '${category}')">+</button>
                </div>
                <button class="btn btn-primary add-to-cart-btn" 
                        onclick="addToCart(${item.id}, '${category}')"
                        ${!item.available ? 'disabled' : ''}>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    updateCartDisplay();
}

function increaseQuantity(itemId, category) {
    const quantityDisplay = document.getElementById(`quantity-${category}-${itemId}`);
    let quantity = parseInt(quantityDisplay.textContent) || 0;
    quantityDisplay.textContent = quantity + 1;
}

function decreaseQuantity(itemId, category) {
    const quantityDisplay = document.getElementById(`quantity-${category}-${itemId}`);
    let quantity = parseInt(quantityDisplay.textContent) || 0;
    if (quantity > 0) {
        quantityDisplay.textContent = quantity - 1;
    }
}

function addToCart(itemId, category) {
    const quantityDisplay = document.getElementById(`quantity-${category}-${itemId}`);
    const quantity = parseInt(quantityDisplay.textContent) || 0;
    
    if (quantity === 0) {
        alert('Please select quantity first');
        return;
    }
    
    const item = shopItems[category].find(i => i.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId && cartItem.category === category);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: itemId,
            category: category,
            name: item.name,
            price: item.price,
            unit: item.unit,
            image: item.image,
            quantity: quantity
        });
    }
    
    // Reset quantity
    quantityDisplay.textContent = '0';
    
    // Save to localStorage
    localStorage.setItem('shopCart', JSON.stringify(cart));
    
    // Update cart display
    updateCartDisplay();
    
    alert(`Added ${quantity} ${item.name} to cart!`);
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items list
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price} ${item.unit}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, '${item.category}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, '${item.category}', 1)">+</button>
                </div>
                <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id}, '${item.category}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }
}

function updateCartQuantity(itemId, category, change) {
    const item = cart.find(cartItem => cartItem.id === itemId && cartItem.category === category);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId, category);
        } else {
            localStorage.setItem('shopCart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

function removeFromCart(itemId, category) {
    cart = cart.filter(item => !(item.id === itemId && item.category === category));
    localStorage.setItem('shopCart', JSON.stringify(cart));
    updateCartDisplay();
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        localStorage.setItem('shopCart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // In a real application, this would connect to a payment processor
    alert('Thank you for your order! This would proceed to checkout in a real application.');
    
    // Clear cart after successful checkout
    cart = [];
    localStorage.setItem('shopCart', JSON.stringify(cart));
    updateCartDisplay();
}

// Initialize shop when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize shop if we're on the shop page
    if (document.getElementById('shop-page')) {
        showShopCategory('vegetables');
        updateCartDisplay();
    }
});
