/**
 * SOMOS CASUAL - Módulo del Panel de la Clienta (Mi Espacio)
 * Gestión de perfil, favoritos e historial de pedidos.
 */

const CLIENT_STORAGE_KEYS = {
  INFO: 'somos_casual_client_info',
  WISHLIST: 'somos_casual_wishlist',
  ORDERS: 'somos_casual_orders_history'
};

function getClientInfo() {
  try {
    return JSON.parse(localStorage.getItem(CLIENT_STORAGE_KEYS.INFO) || '{}');
  } catch (e) {
    return {};
  }
}

function saveClientInfoToStorage(info) {
  localStorage.setItem(CLIENT_STORAGE_KEYS.INFO, JSON.stringify(info));
  // Sincronizar con el drawer de pedidos si está abierto o cargado
  const nameInput = document.getElementById('cartCustomerName');
  const cityInput = document.getElementById('cartCustomerCity');
  const notesInput = document.getElementById('cartCustomerNotes');
  if (nameInput && info.name) nameInput.value = info.name;
  if (cityInput && info.city) cityInput.value = info.city;
  if (notesInput && info.notes) notesInput.value = info.notes;
}

function getClientWishlist() {
  try {
    return JSON.parse(localStorage.getItem(CLIENT_STORAGE_KEYS.WISHLIST) || '[]');
  } catch (e) {
    return [];
  }
}

function saveClientWishlist(list) {
  localStorage.setItem(CLIENT_STORAGE_KEYS.WISHLIST, JSON.stringify(list));
  updateWishlistBadges();
  renderWishlistItems();
}

function getOrdersHistory() {
  try {
    return JSON.parse(localStorage.getItem(CLIENT_STORAGE_KEYS.ORDERS) || '[]');
  } catch (e) {
    return [];
  }
}

function recordOrderHistory(order) {
  const list = getOrdersHistory();
  list.unshift({
    id: 'SC-' + Date.now().toString().slice(-6),
    date: new Date().toLocaleDateString('es-DO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    items: order.items || [],
    total: order.total || 0,
    customer: order.customer || {}
  });
  localStorage.setItem(CLIENT_STORAGE_KEYS.ORDERS, JSON.stringify(list));
  renderOrdersHistory();
}

function toggleProductFavorite(productId, event) {
  if (event) event.stopPropagation();
  let list = getClientWishlist();
  const index = list.indexOf(productId);
  let isAdded = false;

  if (index > -1) {
    list.splice(index, 1);
    if (typeof showToast === 'function') showToast('Eliminado de tus favoritos', '♡');
  } else {
    list.push(productId);
    isAdded = true;
    if (typeof showToast === 'function') showToast('Guardado en tus favoritos', '❤️');
  }

  saveClientWishlist(list);
  updateProductCardFavoriteButtons();
  return isAdded;
}

function updateProductCardFavoriteButtons() {
  const list = getClientWishlist();
  document.querySelectorAll('.product-fav-btn').forEach(btn => {
    const id = btn.dataset.productId;
    const isFav = list.includes(id);
    btn.classList.toggle('active', isFav);
    btn.innerHTML = isFav ? '❤️' : '♡';
    btn.setAttribute('aria-label', isFav ? 'Quitar de favoritos' : 'Añadir a favoritos');
  });
}

function updateWishlistBadges() {
  const list = getClientWishlist();
  const badges = document.querySelectorAll('.client-fav-count');
  badges.forEach(b => b.textContent = list.length);
}

function renderWishlistItems() {
  const container = document.getElementById('clientWishlistContainer');
  const emptyMsg = document.getElementById('clientWishlistEmpty');
  if (!container) return;

  const list = getClientWishlist();
  const catalog = typeof getStoreCatalog === 'function' ? getStoreCatalog() : (window.PRODUCTS_DATA || []);
  const favProducts = catalog.filter(p => list.includes(p.id));

  if (favProducts.length === 0) {
    container.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';
  container.innerHTML = favProducts.map(p => `
    <div class="fav-item-card" data-id="${p.id}">
      <img src="${p.image}" alt="${p.name}" class="fav-item-img" />
      <div class="fav-item-details">
        <span class="fav-item-category">${p.category}</span>
        <h4 class="fav-item-name">${p.name}</h4>
        <div class="fav-item-price">${typeof formatCurrencyRD === 'function' ? formatCurrencyRD(p.price) : 'RD$' + p.price}</div>
        <div class="fav-actions-row">
          <button type="button" class="btn-chic-primary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;" onclick="openProductModal('${p.id}'); closeClientPanel();">
            Ver & Elegir Talla
          </button>
          <button type="button" class="btn-icon-minimal" style="color: #991b1b; font-size: 0.85rem;" onclick="toggleProductFavorite('${p.id}')" title="Quitar">
            🗑
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderOrdersHistory() {
  const container = document.getElementById('clientOrdersContainer');
  const emptyMsg = document.getElementById('clientOrdersEmpty');
  if (!container) return;

  const orders = getOrdersHistory();
  if (orders.length === 0) {
    container.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';
  container.innerHTML = orders.map(ord => `
    <div class="order-history-card">
      <div class="order-history-header">
        <strong>Pedido #${ord.id}</strong>
        <span>${ord.date}</span>
      </div>
      <div class="order-status-badge">Consulta WhatsApp</div>
      <ul class="order-items-summary-list" style="margin-top: 0.6rem;">
        ${ord.items.map(it => `
          <li><strong>${it.quantity}x</strong> ${it.name} <small>(${it.size} / ${it.color})</small> - ${typeof formatCurrencyRD === 'function' ? formatCurrencyRD(it.price * it.quantity) : 'RD$' + (it.price * it.quantity)}</li>
        `).join('')}
      </ul>
      <div class="order-history-total">
        <span>Total:</span>
        <span style="color: var(--accent-terracotta);">${typeof formatCurrencyRD === 'function' ? formatCurrencyRD(ord.total) : 'RD$' + ord.total}</span>
      </div>
    </div>
  `).join('');
}

function initClientPanel() {
  const backdrop = document.getElementById('clientDrawerBackdrop');
  const openBtn = document.getElementById('openClientPanelBtn');
  const closeBtn = document.getElementById('closeClientPanelBtn');
  const form = document.getElementById('clientProfileForm');

  if (openBtn) {
    openBtn.addEventListener('click', () => openClientPanel());
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeClientPanel);
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeClientPanel();
    });
  }

  // Pestañas internas
  const tabs = document.querySelectorAll('.client-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.querySelectorAll('.client-tab-pane').forEach(p => {
        p.classList.toggle('active', p.id === target);
      });
    });
  });

  // Cargar datos guardados en el formulario
  const savedInfo = getClientInfo();
  if (savedInfo.name && document.getElementById('clientNameInput')) document.getElementById('clientNameInput').value = savedInfo.name;
  if (savedInfo.phone && document.getElementById('clientPhoneInput')) document.getElementById('clientPhoneInput').value = savedInfo.phone;
  if (savedInfo.city && document.getElementById('clientCityInput')) document.getElementById('clientCityInput').value = savedInfo.city;
  if (savedInfo.size && document.getElementById('clientSizeInput')) document.getElementById('clientSizeInput').value = savedInfo.size;
  if (savedInfo.notes && document.getElementById('clientNotesInput')) document.getElementById('clientNotesInput').value = savedInfo.notes;

  // Precargar también en el drawer de pedidos
  saveClientInfoToStorage(savedInfo);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedInfo = {
        name: document.getElementById('clientNameInput')?.value.trim() || '',
        phone: document.getElementById('clientPhoneInput')?.value.trim() || '',
        city: document.getElementById('clientCityInput')?.value.trim() || '',
        size: document.getElementById('clientSizeInput')?.value.trim() || '',
        notes: document.getElementById('clientNotesInput')?.value.trim() || ''
      };
      saveClientInfoToStorage(updatedInfo);
      if (typeof showToast === 'function') {
        showToast('Tus datos han sido guardados', '✨');
      }
    });
  }

  updateWishlistBadges();
  renderWishlistItems();
  renderOrdersHistory();
  updateProductCardFavoriteButtons();
}

function openClientPanel(tabName) {
  const backdrop = document.getElementById('clientDrawerBackdrop');
  if (backdrop) {
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  if (tabName) {
    const tabBtn = document.querySelector(`.client-tab-btn[data-tab="${tabName}"]`);
    if (tabBtn) tabBtn.click();
  }
  renderWishlistItems();
  renderOrdersHistory();
}

function closeClientPanel() {
  const backdrop = document.getElementById('clientDrawerBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

if (typeof window !== 'undefined') {
  window.initClientPanel = initClientPanel;
  window.openClientPanel = openClientPanel;
  window.closeClientPanel = closeClientPanel;
  window.toggleProductFavorite = toggleProductFavorite;
  window.recordOrderHistory = recordOrderHistory;
  window.updateProductCardFavoriteButtons = updateProductCardFavoriteButtons;
  window.getClientInfo = getClientInfo;
}
