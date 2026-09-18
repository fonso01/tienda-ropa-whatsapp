/**
 * SOMOS CASUAL - Módulo del Carrito / Pedido
 * Gestión del estado del pedido, persistencia en localStorage y renderizado del drawer.
 */

// Estado global compartido
var APP_STATE = window.APP_STATE = window.APP_STATE || {
  cart: JSON.parse(localStorage.getItem('somos_casual_cart') || localStorage.getItem('aura_cart') || '[]'),
  whatsappNumber: localStorage.getItem('somos_casual_whatsapp_number') || localStorage.getItem('aura_whatsapp_number') || '18095550199',
  storeName: localStorage.getItem('somos_casual_store_name') || localStorage.getItem('aura_store_name') || 'SOMOS CASUAL',
  selectedCategory: 'Todos',
  searchQuery: '',
  sortBy: 'default',
  modalProduct: null,
  modalSelectedSize: null,
  modalSelectedColor: null,
  modalQuantity: 1
};

function formatCurrencyRD(amount) {
  return 'RD$' + Number(amount).toLocaleString('es-DO');
}

function saveCartToStorage() {
  localStorage.setItem('somos_casual_cart', JSON.stringify(APP_STATE.cart));
  updateCartBadge();
  renderCartItems();
  if (typeof updateWhatsAppPreview === 'function') {
    updateWhatsAppPreview();
  }
}

function showToast(message, icon = '✦') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-chic-alert';
  toast.innerHTML = `<span style="color: #c89d58;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3200);
}

function initCartDrawer() {
  const openButtons = document.querySelectorAll('[data-action="open-cart"]');
  const closeButton = document.getElementById('cartDrawerCloseBtn');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  const keepBrowsingBtn = document.getElementById('keepBrowsingBtn');
  const checkoutBtn = document.getElementById('whatsappCheckoutBtn');
  const togglePreviewBtn = document.getElementById('togglePreviewAccordion');

  openButtons.forEach(btn => btn.addEventListener('click', openCartDrawer));
  if (closeButton) closeButton.addEventListener('click', closeCartDrawer);
  if (keepBrowsingBtn) keepBrowsingBtn.addEventListener('click', closeCartDrawer);

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeCartDrawer();
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleWhatsAppOrderSubmit);
  }

  if (togglePreviewBtn) {
    togglePreviewBtn.addEventListener('click', () => {
      const previewBox = document.getElementById('whatsappPreviewContent');
      if (previewBox) {
        const isHidden = previewBox.style.display === 'none';
        previewBox.style.display = isHidden ? 'block' : 'none';
        const arrow = togglePreviewBtn.querySelector('span.arrow');
        if (arrow) arrow.textContent = isHidden ? '▲' : '▼';
      }
    });
  }

  const customerNameInput = document.getElementById('cartCustomerName');
  const customerCityInput = document.getElementById('cartCustomerCity');
  const customerNotesInput = document.getElementById('cartCustomerNotes');

  [customerNameInput, customerCityInput, customerNotesInput].forEach(inp => {
    if (inp && typeof updateWhatsAppPreview === 'function') {
      inp.addEventListener('input', updateWhatsAppPreview);
    }
  });
}

function openCartDrawer() {
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (backdrop) {
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function updateCartBadge() {
  const totalCount = APP_STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = APP_STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const badgeCounter = document.getElementById('cartBadgeCounter');
  const headerTotal = document.getElementById('cartHeaderTotal');

  if (badgeCounter) badgeCounter.textContent = totalCount;
  if (headerTotal) headerTotal.textContent = formatCurrencyRD(totalAmount);
}

function renderCartItems() {
  const listContainer = document.getElementById('cartItemsList');
  const emptyState = document.getElementById('cartEmptyState');
  const totalEl = document.getElementById('cartTotalAmount');
  const checkoutBtn = document.getElementById('whatsappCheckoutBtn');
  const customerBox = document.getElementById('cartCustomerInfoBox');
  const previewBox = document.getElementById('cartPreviewBox');

  if (!listContainer) return;

  if (APP_STATE.cart.length === 0) {
    listContainer.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    if (customerBox) customerBox.style.display = 'none';
    if (previewBox) previewBox.style.display = 'none';
    if (totalEl) totalEl.textContent = 'RD$0';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  listContainer.style.display = 'flex';
  if (emptyState) emptyState.style.display = 'none';
  if (customerBox) customerBox.style.display = 'block';
  if (previewBox) previewBox.style.display = 'block';
  if (checkoutBtn) checkoutBtn.disabled = false;

  let total = 0;

  listContainer.innerHTML = APP_STATE.cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    return `
      <div class="cart-item-chic">
        <button class="cart-remove-item-btn" type="button" title="Eliminar prenda" onclick="removeCartItem(${index})">
          ✕
        </button>
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" />
        <div class="cart-item-meta">
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-specs">
            <span>Talla: <strong>${item.size}</strong></span>
            <span>Color: <strong>${item.color}</strong></span>
          </div>
          <div class="cart-item-bottom-row">
            <span class="cart-item-price-sum">${formatCurrencyRD(itemTotal)}</span>
            <div class="cart-stepper-mini">
              <button type="button" onclick="modifyCartItemQty(${index}, -1)">-</button>
              <span>${item.quantity}</span>
              <button type="button" onclick="modifyCartItemQty(${index}, 1)">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (totalEl) totalEl.textContent = formatCurrencyRD(total);
}

function modifyCartItemQty(index, delta) {
  if (!APP_STATE.cart[index]) return;

  const currentQty = APP_STATE.cart[index].quantity;
  const newQty = currentQty + delta;

  if (newQty <= 0) {
    removeCartItem(index);
  } else {
    APP_STATE.cart[index].quantity = newQty;
    saveCartToStorage();
  }
}

function removeCartItem(index) {
  if (!APP_STATE.cart[index]) return;
  const removedName = APP_STATE.cart[index].name;
  APP_STATE.cart.splice(index, 1);
  saveCartToStorage();
  showToast(`${removedName} retirada del pedido`);
}
