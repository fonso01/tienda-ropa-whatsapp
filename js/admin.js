/**
 * SOMOS CASUAL - Panel de Administración (Lógica JS)
 * Control de catálogo de prendas, ajustes de tienda y exportación.
 */

let CURRENT_CATALOG = [];
let EDITING_PRODUCT_ID = null;

document.addEventListener('DOMContentLoaded', () => {
  initSecurityPin();
});

// ============================================================================
// 1. SEGURIDAD Y ACCESO POR PIN
// ============================================================================
function initSecurityPin() {
  const pinOverlay = document.getElementById('adminPinOverlay');
  const pinForm = document.getElementById('adminPinForm');
  const pinInput = document.getElementById('adminPinInput');
  const pinErrorMsg = document.getElementById('adminPinError');

  const isAuthenticated = sessionStorage.getItem('somos_casual_admin_auth') === 'true';

  if (isAuthenticated) {
    if (pinOverlay) pinOverlay.style.display = 'none';
    initAdminDashboard();
  } else {
    if (pinOverlay) pinOverlay.style.display = 'flex';
    if (pinInput) pinInput.focus();
  }

  if (pinForm) {
    pinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPin = pinInput.value.trim();
      const currentPin = getStoreSettings().adminPin || '1234';

      if (enteredPin === currentPin) {
        sessionStorage.setItem('somos_casual_admin_auth', 'true');
        pinOverlay.style.display = 'none';
        showAdminToast('Acceso concedido al panel', '🔓');
        initAdminDashboard();
      } else {
        if (pinErrorMsg) {
          pinErrorMsg.textContent = 'Código PIN incorrecto. Intenta de nuevo.';
          pinErrorMsg.style.display = 'block';
        }
        pinInput.value = '';
        pinInput.focus();
      }
    });
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem('somos_casual_admin_auth');
  window.location.reload();
}

// ============================================================================
// 2. INICIALIZACIÓN DEL DASHBOARD
// ============================================================================
function initAdminDashboard() {
  CURRENT_CATALOG = typeof getStoreCatalog === 'function' ? getStoreCatalog() : (window.PRODUCTS_DATA || []);
  
  initTabNavigation();
  initCatalogToolbar();
  initProductModal();
  initSettingsForm();
  
  updateDashboardStats();
  renderAdminCatalogTable();
}

// Pestañas principales
function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.admin-nav-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.dataset.target;
      document.querySelectorAll('.admin-tab-section').forEach(sec => {
        sec.classList.toggle('active', sec.id === targetId);
      });
    });
  });
}

// ============================================================================
// 3. MÉTRICAS Y ESTADÍSTICAS
// ============================================================================
function updateDashboardStats() {
  const total = CURRENT_CATALOG.length;
  const active = CURRENT_CATALOG.filter(p => !p.isPaused).length;
  const paused = CURRENT_CATALOG.filter(p => p.isPaused).length;
  
  const categories = new Set(CURRENT_CATALOG.map(p => p.category));

  const totalEl = document.getElementById('statTotalProducts');
  const activeEl = document.getElementById('statActiveProducts');
  const pausedEl = document.getElementById('statPausedProducts');
  const catEl = document.getElementById('statTotalCategories');

  if (totalEl) totalEl.textContent = total;
  if (activeEl) activeEl.textContent = active;
  if (pausedEl) pausedEl.textContent = paused;
  if (catEl) catEl.textContent = categories.size;
}

// ============================================================================
// 4. TABLA DEL CATÁLOGO (RENDER & FILTROS)
// ============================================================================
function initCatalogToolbar() {
  const searchInput = document.getElementById('adminCatalogSearch');
  const categoryFilter = document.getElementById('adminCategoryFilter');
  const newProductBtn = document.getElementById('adminNewProductBtn');

  if (searchInput) searchInput.addEventListener('input', renderAdminCatalogTable);
  if (categoryFilter) categoryFilter.addEventListener('change', renderAdminCatalogTable);
  if (newProductBtn) newProductBtn.addEventListener('click', () => openProductModalForCreate());
}

function renderAdminCatalogTable() {
  const tbody = document.getElementById('adminCatalogTbody');
  if (!tbody) return;

  const searchQuery = (document.getElementById('adminCatalogSearch')?.value || '').toLowerCase().trim();
  const selectedCat = document.getElementById('adminCategoryFilter')?.value || 'all';

  let filtered = [...CURRENT_CATALOG];

  if (selectedCat !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCat);
  }

  if (searchQuery) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      (p.tag && p.tag.toLowerCase().includes(searchQuery))
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 3rem 1rem; color: var(--admin-text-muted);">
          No se encontraron prendas con los filtros seleccionados.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(product => {
    const isPaused = Boolean(product.isPaused);
    const formattedPrice = 'RD$' + Number(product.price).toLocaleString('es-DO');
    const prevPrice = product.originalPrice ? `<span style="text-decoration: line-through; color: var(--admin-text-muted); font-size: 0.78rem;">RD$${Number(product.originalPrice).toLocaleString('es-DO')}</span>` : '';

    const sizesHtml = (product.sizes || []).map(s => `<span class="chip-mini">${s}</span>`).join('');
    const colorsHtml = (product.colors || []).map(c => `<span class="color-dot" title="${c.name}" style="background-color: ${c.hex};"></span>`).join('');

    return `
      <tr>
        <td>
          <div class="product-row-preview">
            <img src="${product.image}" alt="${product.name}" class="product-row-thumb" />
            <div>
              <div class="product-row-title">${product.name}</div>
              <div class="product-row-category">${product.category} ${product.tag ? `• <em>${product.tag}</em>` : ''}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="status-pill ${isPaused ? 'paused' : 'active'}">
            ${isPaused ? '⏸ Pausada' : '● Activa'}
          </span>
        </td>
        <td>
          <div><strong>${formattedPrice}</strong></div>
          ${prevPrice}
        </td>
        <td>
          <div class="chips-row">${sizesHtml || '<span style="color:#999;font-size:0.75rem;">Sin tallas</span>'}</div>
        </td>
        <td>
          <div class="chips-row" style="align-items: center;">${colorsHtml || '<span style="color:#999;font-size:0.75rem;">Sin colores</span>'}</div>
        </td>
        <td>
          <div class="row-actions-group">
            <button class="btn-icon-table" type="button" title="${isPaused ? 'Activar en tienda' : 'Pausar prenda'}" onclick="toggleProductPause('${product.id}')">
              ${isPaused ? '▶️' : '⏸️'}
            </button>
            <button class="btn-icon-table" type="button" title="Editar prenda" onclick="openProductModalForEdit('${product.id}')">
              ✏️
            </button>
            <button class="btn-icon-table" type="button" title="Eliminar prenda" style="color: var(--admin-danger);" onclick="deleteProduct('${product.id}')">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Pausar / Activar prenda
function toggleProductPause(productId) {
  const index = CURRENT_CATALOG.findIndex(p => p.id === productId);
  if (index === -1) return;

  CURRENT_CATALOG[index].isPaused = !CURRENT_CATALOG[index].isPaused;
  saveStoreCatalog(CURRENT_CATALOG);
  
  updateDashboardStats();
  renderAdminCatalogTable();
  
  const status = CURRENT_CATALOG[index].isPaused ? 'pausada' : 'activada';
  showAdminToast(`Prenda ${status} correctamente`, '✨');
}

// Eliminar prenda
function deleteProduct(productId) {
  const product = CURRENT_CATALOG.find(p => p.id === productId);
  if (!product) return;

  if (confirm(`¿Estás segura de eliminar "${product.name}" del catálogo?`)) {
    CURRENT_CATALOG = CURRENT_CATALOG.filter(p => p.id !== productId);
    saveStoreCatalog(CURRENT_CATALOG);
    
    updateDashboardStats();
    renderAdminCatalogTable();
    showAdminToast(`"${product.name}" ha sido eliminada`, '🗑️');
  }
}

// ============================================================================
// 5. MODAL DE CREACIÓN / EDICIÓN DE PRENDAS
// ============================================================================
function initProductModal() {
  const backdrop = document.getElementById('adminProductModalBackdrop');
  const closeBtn = document.getElementById('adminProductModalCloseBtn');
  const form = document.getElementById('adminProductForm');
  const imgInput = document.getElementById('prodMainImgInput');
  const imgPreview = document.getElementById('prodImgPreview');

  if (closeBtn) closeBtn.addEventListener('click', closeProductModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeProductModal();
    });
  }

  // Previsualización de imagen en tiempo real
  if (imgInput && imgPreview) {
    imgInput.addEventListener('input', () => {
      const url = imgInput.value.trim();
      imgPreview.src = url || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80';
    });
  }

  if (form) {
    form.addEventListener('submit', handleProductFormSubmit);
  }
}

function openProductModalForCreate() {
  EDITING_PRODUCT_ID = null;
  const title = document.getElementById('adminProductModalTitle');
  const form = document.getElementById('adminProductForm');
  if (title) title.textContent = 'Nueva Prenda Casual';
  if (form) form.reset();

  document.getElementById('prodImgPreview').src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80';
  document.getElementById('prodSizesInput').value = 'S, M, L, XL';
  document.getElementById('prodColorsInput').value = 'Blanco Clásico:#ffffff, Negro:#1c1917';

  openModal();
}

function openProductModalForEdit(productId) {
  EDITING_PRODUCT_ID = productId;
  const product = CURRENT_CATALOG.find(p => p.id === productId);
  if (!product) return;

  const title = document.getElementById('adminProductModalTitle');
  if (title) title.textContent = 'Editar Prenda: ' + product.name;

  document.getElementById('prodNameInput').value = product.name || '';
  document.getElementById('prodCategoryInput').value = product.category || 'Tops & Camisas';
  document.getElementById('prodPriceInput').value = product.price || '';
  document.getElementById('prodOriginalPriceInput').value = product.originalPrice || '';
  document.getElementById('prodTagInput').value = product.tag || '';
  document.getElementById('prodMainImgInput').value = product.image || '';
  document.getElementById('prodImgPreview').src = product.image || '';
  document.getElementById('prodGalleryInput').value = (product.gallery || []).join('\n');
  document.getElementById('prodSizesInput').value = (product.sizes || []).join(', ');
  
  const colorsFormatted = (product.colors || []).map(c => `${c.name}:${c.hex}`).join(', ');
  document.getElementById('prodColorsInput').value = colorsFormatted;
  document.getElementById('prodDescInput').value = product.description || '';

  openModal();
}

function openModal() {
  const backdrop = document.getElementById('adminProductModalBackdrop');
  if (backdrop) backdrop.classList.add('active');
}

function closeProductModal() {
  const backdrop = document.getElementById('adminProductModalBackdrop');
  if (backdrop) backdrop.classList.remove('active');
  EDITING_PRODUCT_ID = null;
}

function handleProductFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('prodNameInput').value.trim();
  const category = document.getElementById('prodCategoryInput').value;
  const price = Number(document.getElementById('prodPriceInput').value) || 0;
  const originalPriceRaw = document.getElementById('prodOriginalPriceInput').value.trim();
  const originalPrice = originalPriceRaw ? Number(originalPriceRaw) : null;
  const tag = document.getElementById('prodTagInput').value.trim();
  const image = document.getElementById('prodMainImgInput').value.trim();
  
  const galleryRaw = document.getElementById('prodGalleryInput').value.trim();
  const gallery = galleryRaw ? galleryRaw.split('\n').map(s => s.trim()).filter(Boolean) : [image];

  const sizesRaw = document.getElementById('prodSizesInput').value.trim();
  const sizes = sizesRaw ? sizesRaw.split(',').map(s => s.trim()).filter(Boolean) : ['Única'];

  const colorsRaw = document.getElementById('prodColorsInput').value.trim();
  const colors = colorsRaw.split(',').map(pair => {
    const parts = pair.split(':');
    return {
      name: (parts[0] || 'Color').trim(),
      hex: (parts[1] || '#333333').trim()
    };
  }).filter(c => Boolean(c.name));

  const description = document.getElementById('prodDescInput').value.trim();

  if (EDITING_PRODUCT_ID) {
    // Modo Edición
    const index = CURRENT_CATALOG.findIndex(p => p.id === EDITING_PRODUCT_ID);
    if (index > -1) {
      CURRENT_CATALOG[index] = {
        ...CURRENT_CATALOG[index],
        name,
        category,
        price,
        originalPrice,
        tag,
        image,
        gallery: gallery.length > 0 ? gallery : [image],
        sizes,
        colors,
        description
      };
      showAdminToast('Prenda actualizada correctamente', '✏️');
    }
  } else {
    // Modo Creación
    const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newId = slug + '-' + Date.now().toString().slice(-4);

    const newProduct = {
      id: newId,
      name,
      category,
      price,
      originalPrice,
      isFeatured: false,
      isPaused: false,
      tag,
      image,
      gallery: gallery.length > 0 ? gallery : [image],
      description,
      sizes,
      colors
    };

    CURRENT_CATALOG.unshift(newProduct);
    showAdminToast('¡Nueva prenda agregada al catálogo!', '👗');
  }

  saveStoreCatalog(CURRENT_CATALOG);
  updateDashboardStats();
  renderAdminCatalogTable();
  closeProductModal();
}

// ============================================================================
// 6. FORMULARIO DE AJUSTES DE TIENDA
// ============================================================================
function initSettingsForm() {
  const form = document.getElementById('adminSettingsForm');
  const settings = getStoreSettings();

  if (document.getElementById('setStoreName')) document.getElementById('setStoreName').value = settings.storeName;
  if (document.getElementById('setStoreSubtitle')) document.getElementById('setStoreSubtitle').value = settings.storeSubtitle;
  if (document.getElementById('setWhatsappNumber')) document.getElementById('setWhatsappNumber').value = settings.whatsappNumber;
  if (document.getElementById('setAnnouncement')) document.getElementById('setAnnouncement').value = settings.announcementText;
  if (document.getElementById('setAdminPin')) document.getElementById('setAdminPin').value = settings.adminPin || '1234';

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const newSettings = {
        storeName: document.getElementById('setStoreName').value.trim() || 'SOMOS CASUAL',
        storeSubtitle: document.getElementById('setStoreSubtitle').value.trim() || 'SANTO DOMINGO • RD',
        whatsappNumber: document.getElementById('setWhatsappNumber').value.trim().replace(/[^0-9]/g, '') || '18095550199',
        announcementText: document.getElementById('setAnnouncement').value.trim(),
        adminPin: document.getElementById('setAdminPin').value.trim() || '1234'
      };

      saveStoreSettings(newSettings);
      showAdminToast('Ajustes de tienda guardados exitosamente', '⚙️');
    });
  }
}

// ============================================================================
// 7. RESPALDOS, EXPORTACIÓN Y RESTAURACIÓN
// ============================================================================
function downloadDataJsFile() {
  const content = `/**
 * SOMOS CASUAL - Catálogo de Ropa Casual para Salir y Andar
 * Catálogo exportado desde el Panel de Administración.
 */

const DEFAULT_PRODUCTS_DATA = ${JSON.stringify(CURRENT_CATALOG, null, 2)};

// Gestión dinámica de catálogo en memoria y localStorage
function getStoreCatalog() {
  if (typeof localStorage === 'undefined') return DEFAULT_PRODUCTS_DATA;
  try {
    const saved = localStorage.getItem('somos_casual_custom_catalog');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error al cargar catálogo personalizado:', e);
  }
  return DEFAULT_PRODUCTS_DATA;
}

function saveStoreCatalog(newCatalog) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('somos_casual_custom_catalog', JSON.stringify(newCatalog));
  }
  PRODUCTS_DATA = newCatalog;
  if (typeof window !== 'undefined') {
    window.PRODUCTS_DATA = newCatalog;
  }
}

function getStoreSettings() {
  if (typeof localStorage === 'undefined') {
    return {
      storeName: 'SOMOS CASUAL',
      storeSubtitle: 'SANTO DOMINGO • RD',
      whatsappNumber: '18095550199',
      announcementText: 'Envíos a todo el país • Atención personalizada y confirmación de tallas vía WhatsApp',
      adminPin: '1234'
    };
  }
  return {
    storeName: localStorage.getItem('somos_casual_store_name') || 'SOMOS CASUAL',
    storeSubtitle: localStorage.getItem('somos_casual_store_subtitle') || 'SANTO DOMINGO • RD',
    whatsappNumber: localStorage.getItem('somos_casual_whatsapp_number') || '18095550199',
    announcementText: localStorage.getItem('somos_casual_announcement') || 'Envíos a todo el país • Atención personalizada y confirmación de tallas vía WhatsApp',
    adminPin: localStorage.getItem('somos_casual_admin_pin') || '1234'
  };
}

function saveStoreSettings(settings) {
  if (typeof localStorage === 'undefined') return;
  if (settings.storeName) localStorage.setItem('somos_casual_store_name', settings.storeName);
  if (settings.storeSubtitle) localStorage.setItem('somos_casual_store_subtitle', settings.storeSubtitle);
  if (settings.whatsappNumber) localStorage.setItem('somos_casual_whatsapp_number', settings.whatsappNumber);
  if (settings.announcementText) localStorage.setItem('somos_casual_announcement', settings.announcementText);
  if (settings.adminPin) localStorage.setItem('somos_casual_admin_pin', settings.adminPin);
}

var PRODUCTS_DATA = getStoreCatalog();

if (typeof window !== 'undefined') {
  window.DEFAULT_PRODUCTS_DATA = DEFAULT_PRODUCTS_DATA;
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.getStoreCatalog = getStoreCatalog;
  window.saveStoreCatalog = saveStoreCatalog;
  window.getStoreSettings = getStoreSettings;
  window.saveStoreSettings = saveStoreSettings;
}
`;

  const blob = new Blob([content], { type: 'application/javascript;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showAdminToast('data.js descargado correctamente', '💾');
}

function resetDefaultProductsCatalog() {
  if (confirm('¿Deseas restaurar el catálogo original de 12 prendas casuales? Cualquier prenda personalizada que hayas creado se restablecerá.')) {
    localStorage.removeItem('somos_casual_custom_catalog');
    CURRENT_CATALOG = typeof DEFAULT_PRODUCTS_DATA !== 'undefined' ? [...DEFAULT_PRODUCTS_DATA] : [];
    saveStoreCatalog(CURRENT_CATALOG);
    updateDashboardStats();
    renderAdminCatalogTable();
    showAdminToast('Catálogo restablecido al estado original', '🔄');
  }
}

// Notificación flotante Toast
function showAdminToast(message, icon = '✦') {
  const container = document.getElementById('adminToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'admin-toast-msg';
  toast.innerHTML = `<span style="color: #e2d5c5;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3200);
}
