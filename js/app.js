/**
 * GloAfrix Marketplace - Enhanced Application with Dark Mode & Image Upload
 */

// Global State
let favorites = new Set();
let cart = [];
let currentCategory = 'Electronics';
let currentProduct = null;
let freelancerApplications = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    init();
    setupEventListeners();
    loadCartFromStorage();
    loadFavoritesFromStorage();
    initDarkMode();
});

/**
 * Initialize all page components
 */
function init() {
    renderCategoryPills();
    renderHomeProducts();
    renderRecommendedProducts();
    renderMarketplaceProducts();
    renderServices();
    renderBlogPosts();
    renderVendorProducts();
    updateCartBadge();
    initMobileMenu();
    detectMobileAndApplyScroll();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }

    // Freelancer Form
    const freelancerForm = document.getElementById('freelancerForm');
    if (freelancerForm) {
        freelancerForm.addEventListener('submit', handleFreelancerSubmit);
    }

    // Window resize for mobile detection
    window.addEventListener('resize', detectMobileAndApplyScroll);
}

/**
 * Dark Mode Functions
 */
function initDarkMode() {
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem('gloafrix_darkMode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }
}

function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    // Save preference
    localStorage.setItem('gloafrix_darkMode', isDarkMode ? 'enabled' : 'disabled');
    
    // Update icon
    updateDarkModeIcon(isDarkMode);
    
    // Show notification
    showNotification(isDarkMode ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
}

function updateDarkModeIcon(isDarkMode) {
    const darkModeButtons = document.querySelectorAll('.dark-mode-toggle, [onclick*="toggleDarkMode"]');
    darkModeButtons.forEach(btn => {
        if (isDarkMode) {
            btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                </svg>
            `;
        } else {
            btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            `;
        }
        btn.title = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
    });
}

/**
 * Image Upload Functions
 */
function initImageUpload(containerId, inputId) {
    const container = document.getElementById(containerId);
    const input = document.getElementById(inputId);
    
    if (!container || !input) return;
    
    container.addEventListener('click', () => input.click());
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                displayImagePreview(container, event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
}

function displayImagePreview(container, imageSrc) {
    container.classList.add('has-image');
    container.innerHTML = `
        <img src="${imageSrc}" alt="Preview" class="image-preview">
        <button type="button" class="remove-image-btn" onclick="removeImagePreview('${container.id}')">×</button>
    `;
}

function removeImagePreview(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.classList.remove('has-image');
    container.innerHTML = `
        <div class="upload-icon">📸</div>
        <div class="upload-text">Click to upload image</div>
        <div class="upload-hint">Supports: JPG, PNG, GIF (Max 5MB)</div>
    `;
    
    // Reset the file input
    const input = container.nextElementSibling || document.querySelector(`input[type="file"]`);
    if (input) input.value = '';
}


/**
 * FIXED Mobile Menu Functions - Replace existing mobile menu code
 */

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.mobile-menu-close');

    console.log('Initializing mobile menu...'); // Debug

    if (menuToggle) {
        // Remove any existing listeners
        menuToggle.onclick = null;
        
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked'); // Debug
            toggleMobileMenu();
        });
    } else {
        console.error('Menu toggle button not found!');
    }

    if (overlay) {
        overlay.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMobileMenu();
        });
    }
    
    // Close menu when clicking menu items
    const menuItems = document.querySelectorAll('.mobile-menu-item, .mobile-menu-category');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            setTimeout(closeMobileMenu, 100);
        });
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    console.log('Toggle mobile menu called'); // Debug
    
    if (!mobileMenu || !overlay) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    const isActive = mobileMenu.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    console.log('Opening mobile menu'); // Debug
    
    if (!mobileMenu || !overlay) return;
    
    // Show elements
    mobileMenu.style.display = 'block';
    overlay.style.display = 'block';
    
    // Force browser reflow
    void mobileMenu.offsetWidth;
    
    // Add active classes
    requestAnimationFrame(() => {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    console.log('Closing mobile menu'); // Debug
    
    if (!mobileMenu || !overlay) return;
    
    // Remove active classes
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Wait for transition to complete before hiding
    setTimeout(() => {
        if (!mobileMenu.classList.contains('active')) {
            mobileMenu.style.display = 'none';
            overlay.style.display = 'none';
        }
    }, 300);
}

// Make sure this is called when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing menu');
    initMobileMenu();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}


/**
 * Freelancer Registration Functions
 */
let skills = [];

function addSkill() {
    const input = document.getElementById('skillInput');
    const skill = input.value.trim();
    
    if (skill && !skills.includes(skill)) {
        skills.push(skill);
        renderSkills();
        input.value = '';
    }
}

function removeSkill(skill) {
    skills = skills.filter(s => s !== skill);
    renderSkills();
}

function renderSkills() {
    const container = document.getElementById('skillsList');
    if (!container) return;
    
    container.innerHTML = skills.map(skill => `
        <span class="skill-tag">
            ${skill}
            <button type="button" onclick="removeSkill('${skill}')">×</button>
        </span>
    `).join('');
}

function handleFreelancerSubmit(e) {
    e.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName')?.value,
        email: document.getElementById('email')?.value,
        phone: document.getElementById('phone')?.value,
        category: document.getElementById('category')?.value,
        experience: document.getElementById('experience')?.value,
        skills: skills,
        hourlyRate: document.getElementById('hourlyRate')?.value,
        portfolio: document.getElementById('portfolio')?.value,
        bio: document.getElementById('bio')?.value,
        status: 'pending',
        submittedAt: new Date().toISOString()
    };
    
    // Save to localStorage (in real app, this would be sent to backend)
    const applications = JSON.parse(localStorage.getItem('gloafrix_freelancer_applications') || '[]');
    applications.push(formData);
    localStorage.setItem('gloafrix_freelancer_applications', JSON.stringify(applications));
    
    showNotification('✅ Application submitted successfully! We\'ll review it and get back to you soon.');
    
    // Redirect after short delay
    setTimeout(() => {
        window.location.href = 'services.html';
    }, 2000);
}

/**
 * Detect Mobile and Apply Horizontal Scroll to Product Grids
 */
function detectMobileAndApplyScroll() {
    const isMobile = window.innerWidth < 768;
    const productGrids = document.querySelectorAll('.product-grid');
    
    productGrids.forEach(grid => {
        if (isMobile) {
            grid.classList.add('mobile-scroll');
        } else {
            grid.classList.remove('mobile-scroll');
        }
    });
}

/**
 * Local Storage for Cart Persistence
 */
function saveCartToStorage() {
    try {
        localStorage.setItem('gloafrix_cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Failed to save cart:', e);
    }
}

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('gloafrix_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartBadge();
            updateCartDisplay();
        }
    } catch (e) {
        console.error('Failed to load cart:', e);
    }
}

/**
 * Local Storage for Favorites Persistence
 */
function saveFavoritesToStorage() {
    try {
        localStorage.setItem('gloafrix_favorites', JSON.stringify([...favorites]));
    } catch (e) {
        console.error('Failed to save favorites:', e);
    }
}

function loadFavoritesFromStorage() {
    try {
        const savedFavorites = localStorage.getItem('gloafrix_favorites');
        if (savedFavorites) {
            favorites = new Set(JSON.parse(savedFavorites));
        }
    } catch (e) {
        console.error('Failed to load favorites:', e);
    }
}

/**
 * Category Pills Rendering
 */
function renderCategoryPills() {
    const container = document.getElementById('categoryPills');
    if (!container) return;
    
    container.innerHTML = categories.map((cat, index) => `
        <button class="pill ${index === 0 ? 'active' : ''}" onclick="filterCategory('${cat}', this)">
            ${cat}
        </button>
    `).join('');
}

/**
 * Filter products by category
 */
function filterCategory(category, element) {
    currentCategory = category;
    
    // Update active pill
    document.querySelectorAll('.pill').forEach(pill => pill.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }
    
    // Re-render products
    renderHomeProducts();
}

/**
 * Product Card Generator with GHS Currency
 */
function createProductCard(product, showBadge = false) {
    const isFavorite = favorites.has(product.id);
    return `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image">
                ${product.image}
                ${showBadge && product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <button class="favorite-btn" onclick="event.stopPropagation(); toggleFavorite(${product.id})">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">GHS ${product.ghsPrice.toFixed(2)}</div>
                ${product.rating ? `
                    <div class="product-rating">
                        ${[...Array(5)].map((_, i) => `
                            <span class="star ${i < product.rating ? '' : 'empty'}">★</span>
                        `).join('')}
                    </div>
                ` : ''}
                <button class="btn btn-primary" style="width: 100%;" onclick="event.stopPropagation(); addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

/**
 * Service Card Generator with GHS Currency
 */
function createServiceCard(service) {
    return `
        <div class="service-card" onclick="viewService(${service.id})">
            <div class="service-header">
                <div class="service-avatar">${service.avatar}</div>
                <div class="service-meta">
                    <div class="service-title">${service.title}</div>
                    <div class="service-provider">by ${service.provider}</div>
                </div>
            </div>
            <div class="service-description">${service.description}</div>
            <div class="service-footer">
                <div class="service-price">GHS ${service.ghsPrice.toFixed(2)}</div>
                <button class="btn-hire" onclick="event.stopPropagation(); hireFreelancer(${service.id})">
                    Hire Now
                </button>
            </div>
        </div>
    `;
}

/**
 * Blog Card Generator
 */
function createBlogCard(post) {
    return `
        <div class="blog-card" onclick="readBlogPost(${post.id})">
            <div class="blog-image">${post.image}</div>
            <div class="blog-content">
                <div class="blog-category">${post.category}</div>
                <div class="blog-title">${post.title}</div>
                <div class="blog-excerpt">${post.excerpt}</div>
                <div class="blog-meta">
                    <span>${post.author}</span>
                    <span>•</span>
                    <span>${post.date}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render Functions
 */
function renderHomeProducts() {
    const container = document.getElementById('homeProductGrid');
    if (!container) return;
    
    const filtered = mockProducts.filter(p => p.category === currentCategory).slice(0, 6);
    container.innerHTML = filtered.map(p => createProductCard(p)).join('');
}

function renderRecommendedProducts() {
    const container = document.getElementById('recommendedGrid');
    if (!container) return;
    
    container.innerHTML = mockRecommended.map(p => createProductCard(p, true)).join('');
}

function renderMarketplaceProducts() {
    const container = document.getElementById('marketplaceGrid');
    if (!container) return;
    
    container.innerHTML = mockProducts.map(p => createProductCard(p)).join('');
}

function renderServices() {
    const container = document.getElementById('servicesGrid');
    if (!container) return;
    
    container.innerHTML = mockServices.map(s => createServiceCard(s)).join('');
}

function renderBlogPosts() {
    const container = document.getElementById('blogGrid');
    if (!container) return;
    
    container.innerHTML = mockBlogPosts.map(p => createBlogCard(p)).join('');
}

function renderVendorProducts() {
    const container = document.getElementById('vendorProductsGrid');
    if (!container) return;
    
    container.innerHTML = mockProducts.slice(0, 6).map(p => createProductCard(p)).join('');
}

/**
 * Enhanced Cart Functionality with Persistence
 */
function toggleFavorite(id) {
    if (favorites.has(id)) {
        favorites.delete(id);
    } else {
        favorites.add(id);
    }
    
    saveFavoritesToStorage();
    
    // Re-render all grids
    renderHomeProducts();
    renderRecommendedProducts();
    renderMarketplaceProducts();
    renderVendorProducts();
}

function addToCart(id) {
    // Find product in mockProducts or mockRecommended
    let product = mockProducts.find(p => p.id === id) || mockRecommended.find(p => p.id === id);
    
    if (!product) return;
    
    // Check if already in cart
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartBadge();
    updateCartDisplay();
    
    // Show success notification
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCartToStorage();
    updateCartBadge();
    updateCartDisplay();
    showNotification('Item removed from cart');
}

function updateCartQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        saveCartToStorage();
        updateCartDisplay();
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cartCount');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Start shopping to add items to your cart</p>
                <button class="btn btn-primary" onclick="window.location.href='marketplace.html'">Browse Products</button>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">GHS ${item.ghsPrice.toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">−</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Update summary
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.ghsPrice * item.quantity), 0);
    const shipping = subtotal > 0 ? 10.00 : 0; // GHS 10 flat shipping
    const total = subtotal + shipping;
    
    const subtotalEl = document.getElementById('cartSubtotal');
    const shippingEl = document.getElementById('cartShipping');
    const totalEl = document.getElementById('cartTotal');
    
    if (subtotalEl) subtotalEl.textContent = `GHS ${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `GHS ${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `GHS ${total.toFixed(2)}`;
}

function clearCart() {
    cart = [];
    saveCartToStorage();
    updateCartBadge();
    updateCartDisplay();
    showNotification('Cart cleared');
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showNotification('Checkout functionality will be implemented in Phase 2');
}

/**
 * Notification System
 */
function showNotification(message, type = 'default') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: ${isDarkMode ? '#f9fafb' : '#1f2937'};
        color: ${isDarkMode ? '#111827' : 'white'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,${isDarkMode ? '0.5' : '0.3'});
        z-index: 3000;
        ${isDarkMode ? 'border: 1px solid #e5e7eb;' : ''}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);

  
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(100px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Product Detail Functions
 */
function viewProduct(id) {
    currentProduct = mockProducts.find(p => p.id === id) || mockRecommended.find(p => p.id === id);
    
    if (!currentProduct) return;
    
    // Store in sessionStorage for product detail page
    sessionStorage.setItem('currentProduct', JSON.stringify(currentProduct));
    
    // Navigate to product detail page
    window.location.href = `product-detail.html?id=${id}`;
}

function viewService(id) {
    const service = mockServices.find(s => s.id === id);
    if (!service) return;
    
    showNotification(`Viewing service: ${service.title}. Full service detail page will be implemented in Phase 2.`);
}

function hireFreelancer(id) {
    showNotification('Hiring functionality will be implemented in Phase 2 with real messaging and contract workflows.');
}

function readBlogPost(id) {
    const post = mockBlogPosts.find(p => p.id === id);
    if (!post) return;
    
    showNotification(`Reading: ${post.title}. Full blog post content will be fetched from WordPress in Phase 2.`);
}

/**
 * Product Detail Page Functions
 */
function increaseQuantity() {
    const input = document.getElementById('productQuantity');
    if (input) {
        input.value = parseInt(input.value) + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('productQuantity');
    if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function addToCartFromDetail() {
    if (!currentProduct) {
        // Try to load from sessionStorage
        const stored = sessionStorage.getItem('currentProduct');
        if (stored) {
            currentProduct = JSON.parse(stored);
        } else {
            return;
        }
    }
    
    const quantity = parseInt(document.getElementById('productQuantity')?.value || 1);
    
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...currentProduct,
            quantity: quantity
        });
    }
    
    saveCartToStorage();
    updateCartBadge();
    showNotification(`${quantity} x ${currentProduct.name} added to cart!`);
}

function toggleFavoriteFromDetail() {
    if (!currentProduct) return;
    
    toggleFavorite(currentProduct.id);
    showNotification(favorites.has(currentProduct.id) ? 'Added to favorites!' : 'Removed from favorites');
}

/**
 * Search and Filter Functions
 */
function searchProducts(query) {
    const container = document.getElementById('marketplaceGrid');
    if (!container) return;
    
    const filtered = mockProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );
    
    container.innerHTML = filtered.length > 0 
        ? filtered.map(p => createProductCard(p)).join('')
        : '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;">No products found</div>';
}

function sortProducts(sortBy) {
    const container = document.getElementById('marketplaceGrid');
    if (!container) return;
    
    let sorted = [...mockProducts];
    
    switch(sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.ghsPrice - b.ghsPrice);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.ghsPrice - a.ghsPrice);
            break;
        case 'rating':
            sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        default:
            sorted = mockProducts;
    }
    
    container.innerHTML = sorted.map(p => createProductCard(p)).join('');
}

/**
 * Form Handlers
 */
function handleContactSubmit(e) {
    e.preventDefault();
    showNotification('Message sent! We\'ll get back to you soon.');
    e.target.reset();
}

function handleLoginSubmit(e) {
    e.preventDefault();
    showNotification('Login functionality will be implemented in Phase 2 with WordPress authentication.');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

function handleSignupSubmit(e) {
    e.preventDefault();
    
    const password = document.getElementById('signupPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!');
        return;
    }
    
    showNotification('Account creation will be implemented in Phase 2.');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}