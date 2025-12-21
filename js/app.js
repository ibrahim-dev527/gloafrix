/**
 * GloAfrix Marketplace - Main Application
 * Phase 1: Frontend with mock data
 * Phase 2: Will integrate with WordPress/WooCommerce API
 */

// Global State
let favorites = new Set();
let cart = [];
let currentCategory = 'Electronics';
let currentProduct = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    init();
    setupEventListeners();
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
}

/**
 * Page Navigation
 */
function showPage(pageName) {
    const pages = ['home', 'marketplace', 'services', 'blog', 'vendor', 'contact', 'cart', 'productDetail', 'login', 'signup', 'dashboard'];
    
    pages.forEach(page => {
        const pageElement = document.getElementById(page + 'Page');
        if (pageElement) {
            pageElement.classList.add('hidden');
        }
    });
    
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }

    // Close mobile menu
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

/**
 * Mobile Menu Toggle
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
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
 * Product Card Generator
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
                <div class="product-price">${product.price}</div>
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
 * Service Card Generator
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
                <div class="service-price">Starting at ${service.price}</div>
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
    
    const filtered = mockProducts.filter(p => p.category === currentCategory).slice(0, 4);
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
 * User Actions (UI Only - No backend logic per Phase 1 requirements)
 */
function toggleFavorite(id) {
    if (favorites.has(id)) {
        favorites.delete(id);
    } else {
        favorites.add(id);
    }
    
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
    
    updateCartBadge();
    updateCartDisplay();
    
    // Show success message
    alert(`${product.name} added to cart!`);
}

function updateCartBadge() {
    const badge = document.getElementById('cartCount');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
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
                <button class="btn btn-primary" onclick="showPage('marketplace')">Browse Products</button>
            </div>
        `;
    } else {
        // Cart with items (Phase 2 will have full implementation)
        cartItemsContainer.innerHTML = `
            <div style="padding: 2rem;">
                <h3>Cart functionality will be fully implemented in Phase 2</h3>
                <p>Current items: ${cart.length}</p>
                <button class="btn btn-secondary" onclick="clearCart()">Clear Cart</button>
            </div>
        `;
    }
    
    // Update summary
    updateCartSummary();
}

function updateCartSummary() {
    // Placeholder for Phase 2
    const subtotal = document.getElementById('cartSubtotal');
    const shipping = document.getElementById('cartShipping');
    const total = document.getElementById('cartTotal');
    
    if (subtotal) subtotal.textContent = 'GHS 0.00';
    if (shipping) shipping.textContent = 'GHS 0.00';
    if (total) total.textContent = 'GHS 0.00';
}

function clearCart() {
    cart = [];
    updateCartBadge();
    updateCartDisplay();
}

function proceedToCheckout() {
    alert('Checkout functionality will be implemented in Phase 2 with real payment integration.');
}

function viewProduct(id) {
    // Find product
    currentProduct = mockProducts.find(p => p.id === id) || mockRecommended.find(p => p.id === id);
    
    if (!currentProduct) return;
    
    // Update product detail page
    document.getElementById('productDetailTitle').textContent = currentProduct.name;
    document.getElementById('productDetailPrice').textContent = currentProduct.price;
    document.getElementById('productDetailDescription').textContent = currentProduct.description || 'Product description will be loaded from WordPress in Phase 2.';
    document.getElementById('mainProductImage').textContent = currentProduct.image;
    
    // Show product detail page
    showPage('productDetail');
}

function viewService(id) {
    const service = mockServices.find(s => s.id === id);
    if (!service) return;
    
    alert(`Viewing service: ${service.title}. Full service detail page will be implemented in Phase 2.`);
}

function hireFreelancer(id) {
    alert('Hiring functionality will be implemented in Phase 2 with real messaging and contract workflows.');
}

function readBlogPost(id) {
    const post = mockBlogPosts.find(p => p.id === id);
    if (!post) return;
    
    alert(`Reading: ${post.title}. Full blog post content will be fetched from WordPress in Phase 2.`);
}

/**
 * Product Detail Actions
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
    if (!currentProduct) return;
    
    const quantity = parseInt(document.getElementById('productQuantity').value);
    
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...currentProduct,
            quantity: quantity
        });
    }
    
    updateCartBadge();
    alert(`${quantity} x ${currentProduct.name} added to cart!`);
}

function toggleFavoriteFromDetail() {
    if (!currentProduct) return;
    
    toggleFavorite(currentProduct.id);
    alert(favorites.has(currentProduct.id) ? 'Added to favorites!' : 'Removed from favorites');
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
            sorted.sort((a, b) => a.numericPrice - b.numericPrice);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.numericPrice - a.numericPrice);
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
    
    // In Phase 2, this will send to WordPress
    // Example: fetch('/wp-json/contact/v1/submit', { method: 'POST', body: formData })
    
    alert('Message sent! We\'ll get back to you soon.\n\n(Phase 2 will implement real email functionality via WordPress)');
    e.target.reset();
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    // In Phase 2, integrate with WordPress authentication
    // Example: fetch('/wp-json/jwt-auth/v1/token', { method: 'POST', body: credentials })
    
    alert('Login functionality will be implemented in Phase 2 with WordPress authentication.');
    
    // Simulate successful login
    showPage('dashboard');
}

function handleSignupSubmit(e) {
    e.preventDefault();
    
    // Check password match
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // In Phase 2, integrate with WordPress user registration
    // Example: fetch('/wp-json/wp/v2/users', { method: 'POST', body: userData })
    
    alert('Account creation will be implemented in Phase 2 with WordPress user management.');
    
    // Simulate successful signup
    showPage('dashboard');
}

/**
 * Phase 2 API Integration Examples
 * 
 * Fetch Products:
 * fetch('/wp-json/wc/v3/products')
 *   .then(res => res.json())
 *   .then(products => {
 *     mockProducts = products;
 *     renderMarketplaceProducts();
 *   });
 * 
 * Fetch Services:
 * fetch('/wp-json/wp/v2/services')
 *   .then(res => res.json())
 *   .then(services => {
 *     mockServices = services;
 *     renderServices();
 *   });
 * 
 * Add to Cart (WooCommerce):
 * fetch('/wp-json/wc/store/cart/add-item', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ id: productId, quantity: 1 })
 * });
 */
