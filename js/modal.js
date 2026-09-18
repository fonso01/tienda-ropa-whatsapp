/**
 * SOMOS CASUAL - Módulo del Modal de Detalle de Prenda (Ficha Boutique)
 * Visualización de la prenda, fotos secundarias, selectores de talla/color,
 * stepper, agregar al pedido, favoritos directos y consulta por WhatsApp.
 */

function initModalEvents() {
  const backdrop = document.getElementById('productModalBackdrop');
  const closeBtn = document.getElementById('productModalCloseBtn');

  if (closeBtn) closeBtn.addEventListener('click', closeProductModal);

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeProductModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      if (typeof closeCartDrawer === 'function') closeCartDrawer();
      if (typeof closeClientPanel === 'function') closeClientPanel();
      if (typeof closeSettingsModal === 'function') closeSettingsModal();
    }
  });

  const addBtn = document.getElementById('modalAddToCartBtn');
  if (addBtn) addBtn.addEventListener('click', handleModalAddToCart);

  const favBtn = document.getElementById('modalFavToggleBtn');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      if (APP_STATE.modalProduct && typeof toggleProductFavorite === 'function') {
        toggleProductFavorite(APP_STATE.modalProduct.id);
        updateModalFavoriteButton();
      }
    });
  }

  const waBtn = document.getElementById('modalWhatsAppInquiryBtn');
  if (waBtn) {
    waBtn.addEventListener('click', handleModalWhatsAppInquiry);
  }
}

function openProductModal(productId) {
  const catalog = (typeof getStoreCatalog === 'function' ? getStoreCatalog() : window.PRODUCTS_DATA) || [];
  const product = catalog.find(p => p.id === productId);
  if (!product) return;

  APP_STATE.modalProduct = product;
  APP_STATE.modalSelectedSize = product.sizes[0] || 'Única';
  APP_STATE.modalSelectedColor = product.colors[0] ? product.colors[0].name : 'Natural';
  APP_STATE.modalQuantity = 1;

  document.getElementById('modalMainImage').src = product.image;
  document.getElementById('modalMainImage').alt = product.name;
  document.getElementById('modalCategory').textContent = product.category;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalPrice').textContent = formatCurrencyRD(product.price);

  const originalPriceEl = document.getElementById('modalOriginalPrice');
  if (product.originalPrice) {
    originalPriceEl.textContent = formatCurrencyRD(product.originalPrice);
    originalPriceEl.style.display = 'inline';
  } else {
    originalPriceEl.style.display = 'none';
  }

  document.getElementById('modalDescription').textContent = product.description;

  // Miniaturas
  const thumbsContainer = document.getElementById('modalThumbnails');
  thumbsContainer.innerHTML = '';
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  gallery.forEach((imgUrl, index) => {
    const thumb = document.createElement('div');
    thumb.className = `modal-thumb-item ${index === 0 ? 'active' : ''}`;
    thumb.innerHTML = `<img src="${imgUrl}" alt="${product.name} miniatura ${index + 1}" />`;
    thumb.addEventListener('click', () => {
      document.getElementById('modalMainImage').src = imgUrl;
      thumbsContainer.querySelectorAll('.modal-thumb-item').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
    thumbsContainer.appendChild(thumb);
  });

  renderSizeSelectors(product);
  renderColorSelectors(product);
  updateModalQuantityDisplay();
  updateModalFavoriteButton();

  const backdrop = document.getElementById('productModalBackdrop');
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const backdrop = document.getElementById('productModalBackdrop');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function renderSizeSelectors(product) {
  const container = document.getElementById('modalSizeSelectorGrid');
  const label = document.getElementById('modalSelectedSizeLabel');
  if (!container) return;
  container.innerHTML = '';

  product.sizes.forEach(size => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `size-chic-btn ${size === APP_STATE.modalSelectedSize ? 'selected' : ''}`;
    btn.textContent = size;
    btn.addEventListener('click', () => {
      APP_STATE.modalSelectedSize = size;
      if (label) label.textContent = size;
      container.querySelectorAll('.size-chic-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
    container.appendChild(btn);
  });

  if (label) label.textContent = APP_STATE.modalSelectedSize;
}

function renderColorSelectors(product) {
  const container = document.getElementById('modalColorSelectorGrid');
  const label = document.getElementById('modalSelectedColorLabel');
  if (!container) return;
  container.innerHTML = '';

  product.colors.forEach(color => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `color-chic-btn ${color.name === APP_STATE.modalSelectedColor ? 'selected' : ''}`;
    btn.innerHTML = `
      <span class="color-circle" style="background-color: ${color.hex};"></span>
      <span>${color.name}</span>
    `;
    btn.addEventListener('click', () => {
      APP_STATE.modalSelectedColor = color.name;
      if (label) label.textContent = color.name;
      container.querySelectorAll('.color-chic-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
    container.appendChild(btn);
  });

  if (label) label.textContent = APP_STATE.modalSelectedColor;
}

function updateModalQuantityDisplay() {
  const qtyEl = document.getElementById('modalQtyDisplay');
  if (qtyEl) qtyEl.textContent = APP_STATE.modalQuantity;
}

function stepModalQuantity(delta) {
  const newQty = APP_STATE.modalQuantity + delta;
  if (newQty >= 1 && newQty <= 20) {
    APP_STATE.modalQuantity = newQty;
    updateModalQuantityDisplay();
  }
}

function updateModalFavoriteButton() {
  const btn = document.getElementById('modalFavToggleBtn');
  if (!btn || !APP_STATE.modalProduct) return;
  const list = typeof getClientWishlist === 'function' ? getClientWishlist() : [];
  const isFav = list.includes(APP_STATE.modalProduct.id);
  btn.classList.toggle('active', isFav);
  btn.innerHTML = isFav ? '<span>❤️</span> <span>En favoritos</span>' : '<span>♡</span> <span>Añadir a favoritos</span>';
}

function handleModalWhatsAppInquiry() {
  if (!APP_STATE.modalProduct) return;
  const phone = (APP_STATE.whatsappNumber || '18095550199').replace(/[^0-9]/g, '');
  const p = APP_STATE.modalProduct;
  const size = APP_STATE.modalSelectedSize || 'Única';
  const color = APP_STATE.modalSelectedColor || 'Estándar';
  const text = `Hola SOMOS CASUAL, quisiera consultar disponibilidad de la prenda *${p.name}* en talla *${size}* y color *${color}* (Precio: ${formatCurrencyRD(p.price)}).`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}

function handleModalAddToCart() {
  if (!APP_STATE.modalProduct) return;

  const newItem = {
    productId: APP_STATE.modalProduct.id,
    name: APP_STATE.modalProduct.name,
    category: APP_STATE.modalProduct.category,
    price: APP_STATE.modalProduct.price,
    image: APP_STATE.modalProduct.image,
    size: APP_STATE.modalSelectedSize,
    color: APP_STATE.modalSelectedColor,
    quantity: APP_STATE.modalQuantity
  };

  const existingIndex = APP_STATE.cart.findIndex(
    item => item.productId === newItem.productId && item.size === newItem.size && item.color === newItem.color
  );

  if (existingIndex > -1) {
    APP_STATE.cart[existingIndex].quantity += newItem.quantity;
  } else {
    APP_STATE.cart.push(newItem);
  }

  saveCartToStorage();
  closeProductModal();

  showToast(`${newItem.name} agregada a tu pedido`);

  setTimeout(() => {
    if (typeof openCartDrawer === 'function') {
      openCartDrawer();
    }
  }, 350);
}
