// js/cart.js
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const cart = getCart();
    const cartList = document.getElementById('cart-item-list');
    
    if (cart.length === 0) {
        cartList.innerHTML = `<tr><td colspan="6" class="empty-cart">장바구니가 비어 있습니다.</td></tr>`;
        updateSummary(0);
        return;
    }

    let html = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        html += `
            <tr id="cart-item-${item.id}">
                <td class="col-img">
                    <img src="${item.image}" alt="${item.name}">
                </td>
                <td class="col-info">
                    <p class="cart-item-name">${item.name}</p>
                </td>
                <td class="col-price">${item.price.toLocaleString()}원</td>
                <td class="col-qty">
                    <div class="qty-control">
                        <button onclick="updateQty('${item.id}', -1)">-</button>
                        <input type="text" value="${item.quantity}" readonly>
                        <button onclick="updateQty('${item.id}', 1)">+</button>
                    </div>
                </td>
                <td class="col-total">${itemTotal.toLocaleString()}원</td>
                <td class="col-btn">
                    <button class="btn-remove" onclick="removeItem('${item.id}')">삭제</button>
                </td>
            </tr>
        `;
    });

    cartList.innerHTML = html;
    updateSummary(totalPrice);
}

function updateQty(id, change) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity < 1) {
            cart[itemIndex].quantity = 1;
        }
        saveCart(cart);
        initCartCount();
        renderCart();
    }
}

function removeItem(id) {
    const row = document.getElementById(`cart-item-${id}`);
    if (row) {
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            removeLogic(id);
        }, 300);
    } else {
        removeLogic(id);
    }
}

function removeLogic(id) {
    let cart = getCart();
    const itemToRemove = cart.find(item => item.id === id);
    if (itemToRemove) {
        if (typeof showToast === 'function') {
            showToast(`[${itemToRemove.name}]이(가) 장바구니에서 삭제되었습니다.`);
        }
    }
    
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    initCartCount();
    renderCart();
}

function updateSummary(totalProductPrice) {
    let shippingFee = 0;
    
    // 5만원 이상 무료배송
    if (totalProductPrice > 0 && totalProductPrice < 50000) {
        shippingFee = 3000;
    }

    const finalPrice = totalProductPrice + shippingFee;

    document.getElementById('cart-total-price').textContent = totalProductPrice.toLocaleString() + '원';
    document.getElementById('cart-shipping-fee').textContent = shippingFee.toLocaleString() + '원';
    document.getElementById('cart-final-price').textContent = finalPrice.toLocaleString() + '원';
}

function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        if (typeof showToast === 'function') {
            showToast("장바구니가 비어 있습니다.");
        } else {
            alert("장바구니가 비어 있습니다.");
        }
        return;
    }
    
    const finalPriceStr = document.getElementById('cart-final-price').textContent;
    const isConfirmed = confirm(`총 결제 금액은 ${finalPriceStr} 입니다.\n결제를 진행하시겠습니까?`);
    
    if (isConfirmed) {
        // Clear the cart
        saveCart([]);
        if (typeof initCartCount === 'function') {
            initCartCount();
        }
        renderCart();
        
        alert("결제가 성공적으로 완료되었습니다. 감사합니다!");
        window.location.href = 'index.html';
    }
}
