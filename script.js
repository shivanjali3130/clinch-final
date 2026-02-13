let cart = [];
let currentUser = null;
let users = [];


const products = [
    { name: 'Regal Ruby',price:'₹ 4,500',icon:'💄', category: 'makeup', description: 'Lipstick' },
    { name: 'Golden Hour',price:'₹ 4,750',icon:'💄',category:'makeup', description: 'Lipstick' },
    { name: 'Flawless Empire',price:'₹ 6,237',icon:'🧴', category: 'makeup', description: 'Glow Foundation' },
    { name: 'Cellular Luxe',price:'₹ 10,272',icon:'💧', category: 'skincare', description: 'Micro Sérum' },
    { name: 'Midnight Élite',price:'₹ 3,485',icon:'👁️', category: 'makeup', description: 'Mascara' },
    { name: 'Laque Luxe',price:'₹ 2,568',icon:'💅',category: 'Makeup', description: 'Longwear Nail Lacquer' },
    { name: 'Midnight Élégance',price:'₹ 12,840',icon:'🌺', category: 'frangance', description: ' Eau De Parfum'},
    { name: 'UV Élégance',price:'₹ 5,503',icon:'✨',category: 'skincare', description: 'Multi-Protection Daily' },
    { name: 'Assence Bloom',price:'₹ 6,500',icon:'🌺', category: 'fragnance', description: ' Eau De Parfum' },
    { name: 'Rose Diamond' ,price:'₹ 5,250',icon:'🌺', category: 'fragrance', description: ' Eau De Parfum'},
    { name: 'Petal Reverie' , price:'₹8,200',icon:'🌺',category: 'fragrance', description: 'Romantic Rose & Jasmine Blend'},
    { name: 'Oceanique Mist' ,price:'₹5,800',icon:'🌺', category: 'fragrance', description: 'Crisp & Fresh Aquatic Notes'},
    { name: 'Velvet Aura' ,price:'₹9,100',icon:'🌺', category: 'fragrance', description: 'Sensual Vanilla & Musk Accords'},
    { name: 'Citrus Muse' ,price:'₹4,900',icon:'🌺', category: 'fragrance', description: 'Vibrant Bergamot & Lemon Zest'},
    { name: 'Amber Myth' , price:'₹10,500',icon:'🌺',category: 'fragrance', description: 'arm, Spicy & Oriental Fragrance'},
    { name: 'Velvet Aura High-Coverage Concealer',price:'₹ 5,800',icon:'', category: 'Makeup', description: 'Hydrating & Longwear Formula' },
    { name: 'Radiant Flush Liquid Blush', price:' 4,500',icon:'🌸',category: 'Makeup', description: 'High-Impact Color, Dewy or Matte Finish' },
    { name: 'Zenith Dew Illuminator',price:'₹ 16,800',icon:'✨', category: 'Makeup', description: 'Ultra-Luxe Glass-Skin Finish & Firming Complex' },
    { name: 'LUMIÈRE ROYALE Eyeshadow Palette', price:'4,999',icon:'🎨',category: 'Makeup', description: 'EyeShadow' },
    { name: 'VELOURS TOUCH Foundation', price:'₹4,299',icon:'🧴',category: 'Makeup', description: 'Glow Foundation' },
    { name: 'NOIR LASH SUPRÊME Mascara',price:'₹ 2,299',icon:'👁️', category: 'Makeup', description: 'Longlasting Mascara' },
];

function openSearch() {
    const searchModal = document.getElementById('searchModal');
    searchModal.classList.add('active');
    document.getElementById('searchInput').focus();
    document.body.classList.add('modal-open');
}

function closeSearch() {
    const searchModal = document.getElementById('searchModal');
    searchModal.classList.remove('active');
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
    document.body.classList.remove('modal-open');
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
 
    const results = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    const resultsDiv = document.getElementById('searchResults');
    
    if (query.length > 0 && results.length > 0) {
        
        resultsDiv.innerHTML = `
            <h3 style="font-size: 14px; letter-spacing: 2px; margin-bottom: 20px; text-transform: uppercase;">
                Search Results (${results.length})
            </h3>
            ${results.map(product => `
                <div class="search-result-item" onclick="addToCart('${product.name}', ${product.price}, '${product.icon}'); closeSearch();">
                    <div style="display: flex; align-items: center; gap: 20px;">
                        <span style="font-size: 40px;">${product.icon}</span>
                        <div style="flex: 1;">
                            <h4 style="font-size: 14px; letter-spacing: 1px; margin-bottom: 5px; text-transform: uppercase;">
                                ${product.name}
                            </h4>
                            <p style="font-size: 11px; opacity: 0.7; margin-bottom: 5px;">
                                ${product.description}
                            </p>
                            <p style="font-size: 12px; font-weight: 500;">$${product.price}.00</p>
                        </div>
                        <span style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #999;">
                            Click to add
                        </span>
                    </div>
                </div>
            `).join('')}
        `;
    } else if (query.length > 0) {
        
        resultsDiv.innerHTML = `
            <div style="padding: 40px 20px; text-align: center;">
                <p style="font-size: 14px; margin-bottom: 10px;">No results found for "${query}"</p>
                <p style="font-size: 12px; opacity: 0.7;">Try searching for makeup, fragrance, or skincare</p>
            </div>
        `;
    } else {
        
        resultsDiv.innerHTML = '';
    }
}

function openUser() {
    const userModal = document.getElementById('userModal');
    userModal.classList.add('active');
    document.body.classList.add('modal-open');
    
    if (currentUser) {
        showDashboard();
    }
}

function closeUser() {
    const userModal = document.getElementById('userModal');
    userModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

/**
 *
 * @param {Event} e 
 */
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        alert('An account with this email already exists. Please sign in.');
        showLogin();
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password,
        orders: [],
        registrationDate: new Date().toLocaleDateString()
    };

    users.push(newUser);
    
    alert(`Welcome ${name}! Your account has been created successfully.\nPlease sign in to continue.`);
    showLogin();
    document.getElementById('registerForm').reset();
}

/**
 * 
 * @param {Event} e 
 */
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        showDashboard();
        alert(`Welcome back, ${user.name}!`);
    } else {
        alert('Invalid email or password.\n\nPlease try again or register for a new account.');
    }
}

function showDashboard() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('userDashboard').classList.add('active');
    document.getElementById('userName').textContent = currentUser.name;
    loadOrders();
}


function loadOrders() {
    const ordersList = document.getElementById('ordersList');
    
    if (currentUser.orders && currentUser.orders.length > 0) {
        ordersList.innerHTML = currentUser.orders.map((order, index) => `
            <div class="order-item">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <div>
                        <h4 style="font-size: 14px; letter-spacing: 1px; margin-bottom: 5px;">
                            Order #${String(index + 1).padStart(4, '0')}
                        </h4>
                        <p style="font-size: 11px; color: #999;">${order.date}</p>
                    </div>
                    <span style="font-size: 11px; background: #f0f0f0; padding: 4px 12px; border-radius: 3px;">
                        Completed
                    </span>
                </div>
                <div style="border-top: 1px solid #f0f0f0; padding-top: 15px;">
                    <p style="font-size: 12px; color: #666; margin-bottom: 10px;">
                        ${order.items.length} item(s): ${order.items.map(item => item.name).join(', ')}
                    </p>
                    <p style="font-size: 16px; font-weight: 500;">Total: $${order.total.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
    } else {
        ordersList.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; background: #f8f8f8; border-radius: 5px;">
                <p style="color: #999; font-size: 13px; margin-bottom: 10px;">No orders yet</p>
                <p style="color: #999; font-size: 12px;">Start shopping to see your orders here</p>
            </div>
        `;
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to sign out?')) {
        currentUser = null;
        document.getElementById('userDashboard').classList.remove('active');
        showLogin();
        document.getElementById('loginForm').reset();
        alert('You have been signed out successfully.');
    }
}

function openCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.add('active');
    document.body.classList.add('modal-open');
    renderCart();
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

/**
 * 
 * @param {string} name 
 * @param {number} price 
 * @param {string} icon 
 * @param {string} priceText 
 */
function addToCart(name, price, icon, priceText) {
    console.log('addToCart called with:', { name, price, icon, priceText });

    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
    
        existingItem.quantity++;
        console.log('Item quantity updated');
        alert(`${name} quantity updated in your bag!\nCurrent quantity: ${existingItem.quantity}`);
    } else {
    
        cart.push({
            name: name,
            price: price,
            icon: icon,
            priceText: priceText || `$${price}.00`,
            quantity: 1
        });
        console.log('Item added to cart. Cart now contains:', cart);
        alert(`${name} added to your bag!\nPrice: ${priceText || '$' + price + '.00'}`);
    }
    
    updateCartCount();
    renderCart();
    openCart();  
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;

        if (totalItems === 0) {
            cartCountElement.style.display = 'none';
        } else {
            cartCountElement.style.display = 'flex';
        }
    }
}

/**
 * 
 * @param {string} name 
 * @param {number} change
 */
function changeQuantity(name, change) {
    const item = cart.find(i => i.name === name);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCartCount();
            renderCart();
        }
    }
}

/**
 * 
 * @param {string} name
 */
function removeFromCart(name) {
    if (confirm(`Remove ${name} from your bag?`)) {
        cart = cart.filter(item => item.name !== name);
        updateCartCount();
        renderCart();
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 60px; margin-bottom: 20px;">🛍️</div>
                <h3>Your shopping bag is empty</h3>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">
                    Add items to get started
                </p>
            </div>
        `;
        cartSummary.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.icon}</div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${item.priceText || '$' + item.price + '.00'}</div>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="changeQuantity('${item.name}', -1)">−</button>
                        <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity('${item.name}', 1)">+</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                        <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
                        <span style="font-size: 13px; font-weight: 500;">
                            ${item.priceText ? item.priceText.replace(/\s+RS/i, '') + ' RS' : '$' + (item.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 100 ? 0 : 10;
        const total = subtotal + shipping;
        
        document.getElementById('cartTotal').innerHTML = `
            <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e5e5e5;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; font-weight: normal;">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: normal;">
                    <span>Shipping</span>
                    <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 500;">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;
        
        cartSummary.style.display = 'block';
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your shopping bag is empty!');
        return;
    }

    if (!currentUser) {
        alert('Please sign in to complete your purchase');
        closeCart();
        openUser();
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    const order = {
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        items: [...cart],
        subtotal: subtotal,
        shipping: shipping,
        total: total,
        status: 'Completed'
    };

    currentUser.orders.push(order);
 
    alert(`✓ Order Placed Successfully!\n\n` +
          `Order Total: $${total.toFixed(2)}\n` +
          `Items: ${cart.length}\n\n` +
          `Thank you for your purchase, ${currentUser.name}!\n` +
          `Your order has been confirmed.`);

    cart = [];
    updateCartCount();
    renderCart();
    closeCart();
}

function scrollToProducts() {
    const productsSection = document.getElementById('productsSection');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * 
 * @param {string} sectionId 
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

document.addEventListener('click', function(event) {
    const searchModal = document.getElementById('searchModal');
    const userModal = document.getElementById('userModal');
    const cartModal = document.getElementById('cartModal');

    if (event.target === searchModal) {
        closeSearch();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSearch();
        closeUser();
        closeCart();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
   
    document.body.addEventListener('click', function(e) {
        
        const clickedBtn = e.target.closest('button, a, .btn, .shop-btn, .btn-secondary, .discover-btn');
        
        if (!clickedBtn) return;
        
        const buttonText = clickedBtn.textContent.trim().toLowerCase();
        
        
        if (buttonText === 'discover high jewellery' || clickedBtn.classList.contains('discover-btn')) {
            e.preventDefault();
      
            return;
        }
        
        
        if (buttonText.includes('checkout') || 
            buttonText.includes('sign') || 
            buttonText.includes('register') ||
            buttonText.includes('login') ||
            buttonText.includes('remove') ||
            buttonText === 'try on') {
            return;
        }
        
        // Handle Shop Now and Add to Bag buttons
        if (buttonText.includes('shop') || 
            buttonText.includes('add to bag') || 
            clickedBtn.classList.contains('shop-btn') ||
            clickedBtn.classList.contains('btn-secondary')) {
            
            e.preventDefault();
            
            // Find the product container - expanded search to include more containers
            const productContainer = clickedBtn.closest('.product-card') || 
                                   clickedBtn.closest('.featured-product') ||
                                   clickedBtn.closest('.wj-high-jewelry-showcase') ||
                                   clickedBtn.closest('.wj-timepiece-showcase') ||
                                   clickedBtn.closest('.wj-watch-detail') ||
                                   clickedBtn.closest('[class*="product"]') ||
                                   clickedBtn.closest('[class*="showcase"]') ||
                                   clickedBtn.closest('[class*="jewelry"]') ||
                                   clickedBtn.closest('[class*="watch"]');
            
            if (!productContainer) {
                console.error('Could not find product container');
                return;
            }
            
            // Find product name - expanded search
            let productName = productContainer.querySelector('.wj-high-jewelry-title')?.textContent ||
                            productContainer.querySelector('.wj-watch-name')?.textContent ||
                            productContainer.querySelector('.wj-timepiece-title')?.textContent ||
                            productContainer.querySelector('h4')?.textContent ||
                            productContainer.querySelector('h3')?.textContent ||
                            productContainer.querySelector('h2')?.textContent ||
                            productContainer.querySelector('.product-name')?.textContent ||
                            productContainer.querySelector('[class*="title"]')?.textContent ||
                            productContainer.querySelector('[class*="name"]')?.textContent;
            
            if (!productName) {
                console.error('Could not find product name');
                return;
            }
            
            productName = productName.trim();
            
            
            let priceText = null;
            let priceElement = null;
            
            
            priceElement = productContainer.querySelector('.price') ||
                          productContainer.querySelector('.product-price') ||
                          productContainer.querySelector('.wj-watch-price') ||
                          productContainer.querySelector('.wj-timepiece-price') ||
                          productContainer.querySelector('[class*="price"]');
            
            if (priceElement) {
                priceText = priceElement.textContent;
            }
            
            
            if (!priceText) {
                const features = productContainer.querySelectorAll('.wj-high-jewelry-features li, .wj-watch-specs li, .wj-timepiece-specs li, li');
                for (const feature of features) {
                    const text = feature.textContent;
                    if (text.match(/(?:RS|₹|\$|USD|EUR|£)\s*[\d,]+/i) || text.match(/[\d,]+\s*(?:RS|₹|\$|USD|EUR|£)/i)) {
                        priceText = text;
                        break;
                    }
                }
            }
            
            if (!priceText) {
                const allText = productContainer.textContent;
                const priceMatch = allText.match(/(?:RS|₹|\$|USD|EUR|£)\s*([\d,]+)|(\d[\d,]+)\s*(?:RS|₹|\$|USD|EUR|£)/i);
                if (priceMatch) {
                    priceText = priceMatch[0];
                }
            }
            
            if (!priceText) {
                console.error('Could not find product price in container:', productContainer);
                alert('Price information not found. Please check the product details.');
                return;
            }
            
            
            let productPrice = 0;
            
            
            const priceMatch = priceText.match(/(\d[\d,]*)/);
            if (priceMatch) {
                productPrice = parseInt(priceMatch[1].replace(/,/g, ''));
            }
            
            if (productPrice === 0) {
                console.error('Could not parse price:', priceText);
                alert('Unable to parse price. Please check the product details.');
                return;
            }
            
            const productIcon = '🛍️';
            
            console.log('Adding to cart:', { name: productName, price: productPrice, priceText: priceText.trim(), icon: productIcon });
            
            addToCart(productName, productPrice, productIcon, priceText.trim());
        }
    });

    console.log('Luxury Beauty E-Commerce System Loaded Successfully!');
    console.log(`${products.length} products available`);
});

function scrollCarousel(direction) {
    const carousel = document.getElementById('productCarousel');
    const scrollAmount = 400;
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

const carousel = document.getElementById('productCarousel');
if (carousel) {
    carousel.addEventListener('scroll', () => {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const currentScroll = carousel.scrollLeft;
        const page = currentScroll > maxScroll / 2 ? 2 : 1;
        const carouselNav = document.querySelector('.carousel-nav');
        if (carouselNav) {
            carouselNav.textContent = `${page} / 2`;
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-section, .product-card, .category-card').forEach(el => {
    observer.observe(el);
});