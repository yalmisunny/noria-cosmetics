// js/main.js

// --- Product Data (JSON Format) ---
const productData = [
    // --- SKINCARE ---
    {
        id: 'p5',
        name: '노리아 젠틀 퓨리파잉 클렌저',
        category: 'SKINCARE',
        subCategory: 'Cleanser',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600',
        hoverImage: 'https://images.unsplash.com/photo-1608248593802-8eb3a20da3c5?auto=format&fit=crop&q=80&w=600',
        badge: 'NEW'
    },
    {
        id: 'p4',
        name: '노리아 브라이트닝 토너',
        category: 'SKINCARE',
        subCategory: 'Toning',
        price: 22000,
        image: 'https://images.unsplash.com/photo-1608248593802-8eb3a20da3c5?auto=format&fit=crop&q=80&w=600',
        hoverImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600',
        badge: '무료배송'
    },
    {
        id: 'p1',
        name: '스킨1004 마다가스카르 센텔라 앰플',
        category: 'SKINCARE',
        subCategory: 'Essence',
        price: 14900,
        image: 'assets/images/앰플병.png',
        hoverImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
        badge: 'BEST'
    },
    {
        id: 'p6',
        name: '노리아 딥 모이스처링 크림',
        category: 'SKINCARE',
        subCategory: 'Moisturizing',
        price: 28000,
        image: 'https://images.unsplash.com/photo-1611074585206-9b51221651b7?auto=format&fit=crop&q=80&w=600',
        hoverImage: 'https://images.unsplash.com/photo-1615397323603-460f64c67ff2?auto=format&fit=crop&q=80&w=600',
        badge: 'NEW'
    },
    {
        id: 'p7',
        name: '노리아 데일리 선크림 & 진정 팩 세트',
        category: 'SKINCARE',
        subCategory: 'Sun & Mask',
        price: 32000,
        image: 'https://images.unsplash.com/photo-1556228720-1c2a05cf61eb?auto=format&fit=crop&q=80&w=600',
        hoverImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bb115ab?auto=format&fit=crop&q=80&w=600',
        badge: ''
    },
    // --- MAKEUP ---
    {
        id: 'p8',
        name: '노리아 퍼펙팅 파운데이션',
        category: 'MAKEUP',
        subCategory: 'Base',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=600',
        hoverImage: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=600',
        badge: 'BEST'
    },
    {
        id: 'p9',
        name: '노리아 글램 아이섀도우 팔레트',
        category: 'MAKEUP',
        subCategory: 'Eye',
        price: 28000,
        image: 'https://images.unsplash.com/photo-1512496115841-345028d7155c?auto=format&fit=crop&q=80&w=600',
        hoverImage: 'https://images.unsplash.com/photo-1590156546946-cb55b1d0a0f5?auto=format&fit=crop&q=80&w=600',
        badge: ''
    },
    {
        id: 'p3',
        name: '노리아 에센셜 매트 립스틱',
        category: 'MAKEUP',
        subCategory: 'Lip',
        price: 18000,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600',
        hoverImage: 'https://images.unsplash.com/photo-1571781526291-c477eb69bf41?auto=format&fit=crop&q=80&w=600',
        badge: 'BEST'
    },
    {
        id: 'p2',
        name: '카라디움 크림 치크 스틱',
        category: 'MAKEUP',
        subCategory: 'Face & Contour',
        price: 11900,
        image: 'assets/images/여성칙스틱.png',
        hoverImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
        badge: ''
    },
    {
        id: 'p10',
        name: '노리아 프로페셔널 브러쉬 세트',
        category: 'MAKEUP',
        subCategory: 'Tools',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1596462499128-4ce67b84aaeb?auto=format&fit=crop&q=80&w=600',
        hoverImage: 'https://images.unsplash.com/photo-1589017260528-7650882e30cc?auto=format&fit=crop&q=80&w=600',
        badge: '무료배송'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Cart
    initCartCount();

    // 2. Render Products (if on index page)
    const productContainer = document.getElementById('product-list-container');
    if (productContainer) {
        renderBestSellers();
        renderProducts('ALL');
        initFilters();
    }

    // 3. Event Delegation for Add to Cart & Navigation
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            e.stopPropagation(); // prevent triggering card click
            const btn = e.target;
            const product = {
                id: btn.getAttribute('data-id'),
                name: btn.getAttribute('data-name'),
                price: parseInt(btn.getAttribute('data-price')),
                image: btn.getAttribute('data-image'),
                quantity: 1
            };
            addToCart(product);
        } else if (e.target.closest('.product-wishlist')) {
            // wishlist toggle logic is inline, ignore taking actions here
        } else if (e.target.closest('.product-card')) {
            window.location.href = 'product_detail.html';
        }
    });
});

// --- Product Rendering & Filtering Logic ---
let currentMainFilter = 'ALL';
let currentSubFilter = 'ALL';

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            currentMainFilter = category;
            currentSubFilter = 'ALL'; // 메인 카테고리 변경 시 서브는 전체로 초기화
            
            renderSubFilters(category);
            renderProducts(category, 'ALL');
        });
    });
}

function renderSubFilters(mainCategory) {
    const subFiltersContainer = document.getElementById('sub-filters');
    if (!subFiltersContainer) return;

    if (mainCategory === 'ALL') {
        subFiltersContainer.style.display = 'none';
        subFiltersContainer.innerHTML = '';
        return;
    }

    const subCategories = [...new Set(productData
        .filter(p => p.category === mainCategory && p.subCategory)
        .map(p => p.subCategory)
    )];

    if (subCategories.length === 0) {
        subFiltersContainer.style.display = 'none';
        subFiltersContainer.innerHTML = '';
        return;
    }

    let html = `<button class="sub-filter-btn ${currentSubFilter === 'ALL' ? 'active' : ''}" data-sub="ALL">전체 보기</button>`;
    subCategories.forEach(sub => {
        // "MAKEUP / BLUSH" 와 같은 형태를 보기 좋게 처리 (단순히 보이도록)
        const displayLabel = sub.includes('/') ? sub.split('/')[1].trim() : sub;
        html += `<button class="sub-filter-btn" data-sub="${sub}">${displayLabel}</button>`;
    });

    subFiltersContainer.innerHTML = html;
    subFiltersContainer.style.display = 'flex';

    const subBtns = subFiltersContainer.querySelectorAll('.sub-filter-btn');
    subBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            subBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentSubFilter = btn.getAttribute('data-sub');
            renderProducts(currentMainFilter, currentSubFilter);
        });
    });
}

function renderProducts(filterCategory, filterSubCategory = 'ALL') {
    const container = document.getElementById('product-list-container');
    if (!container) return;

    // Fade out animation
    container.style.opacity = 0;
    
    setTimeout(() => {
        let filteredData = productData;
        if (filterCategory !== 'ALL') {
            filteredData = filteredData.filter(p => p.category === filterCategory);
        }
        if (filterSubCategory !== 'ALL') {
            filteredData = filteredData.filter(p => p.subCategory === filterSubCategory);
        }

        let html = '';
        filteredData.forEach(p => {
            const badgeHtml = p.badge ? `<span class="product-badge">${p.badge}</span>` : '';
            
            // Randomize rating slightly for realism, or use a fixed one
            const ratingScore = (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1);
            const reviewCount = Math.floor(Math.random() * 300) + 50;

            html += `
                <article class="product-card">
                    <div class="product-img-wrap">
                        ${badgeHtml}
                        <div class="product-wishlist" onclick="this.classList.toggle('active'); event.stopPropagation();">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </div>
                        <img src="${p.image}" class="img-main" alt="${p.name}">
                        <img src="${p.hoverImage}" class="img-hover" alt="${p.name} Hover">
                        <div class="quick-add-overlay">
                            <button class="add-to-cart-btn" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}">Quick Add +</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${p.subCategory}</div>
                        <h3 class="product-name">${p.name}</h3>
                        <div class="product-rating">
                            <span class="stars">★★★★★</span>
                            <span>${ratingScore} (${reviewCount})</span>
                        </div>
                        <p class="product-price">${p.price.toLocaleString()}원</p>
                    </div>
                </article>
            `;
        });

        if (filteredData.length === 0) {
            html = '<div class="empty-products">해당 카테고리의 상품이 없습니다.</div>';
        }

        container.innerHTML = html;
        
        // Fade in animation
        container.style.opacity = 1;
    }, 300); // 300ms matches CSS transition
}

function renderBestSellers() {
    const container = document.getElementById('bestseller-list-container');
    if (!container) return;

    // 'BEST' 배지를 가진 상품 필터링
    const bestSellers = productData.filter(p => p.badge === 'BEST');

    let html = '';
    bestSellers.forEach(p => {
        const badgeHtml = `<span class="product-badge">${p.badge}</span>`;
        const ratingScore = (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1);
        const reviewCount = Math.floor(Math.random() * 800) + 200;

        html += `
            <article class="product-card">
                <div class="product-img-wrap">
                    ${badgeHtml}
                    <div class="product-wishlist" onclick="this.classList.toggle('active'); event.stopPropagation();">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>
                    <img src="${p.image}" class="img-main" alt="${p.name}">
                    <img src="${p.hoverImage}" class="img-hover" alt="${p.name} Hover">
                    <div class="quick-add-overlay">
                        <button class="add-to-cart-btn" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}">Quick Add +</button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${p.subCategory}</div>
                    <h3 class="product-name">${p.name}</h3>
                    <div class="product-rating">
                        <span class="stars">★★★★★</span>
                        <span>${ratingScore} (${reviewCount})</span>
                    </div>
                    <p class="product-price">${p.price.toLocaleString()}원</p>
                </div>
            </article>
        `;
    });

    if (bestSellers.length === 0) {
        html = '<div class="empty-products">베스트셀러 상품이 없습니다.</div>';
    }

    container.innerHTML = html;
}


function getCart() {
    const cart = localStorage.getItem('noria_cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('noria_cart', JSON.stringify(cart));
}

function initCartCount() {
    const cart = getCart();
    const countElement = document.getElementById('nav-cart-count');
    if (countElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.textContent = totalItems;
    }
}

function addToCart(product) {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    saveCart(cart);
    initCartCount();
    
    // UI Feedback (Toast)
    showToast(`[${product.name}]이(가) 장바구니에 담겼습니다.`);
}

function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    container.appendChild(toast);

    // Remove after 3 seconds (matching animation)
    setTimeout(() => {
        toast.remove();
        if (container.children.length === 0) {
            container.remove();
        }
    }, 3000);
}
