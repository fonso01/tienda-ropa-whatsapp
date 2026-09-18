/**
 * SOMOS CASUAL - Módulo del Catálogo
 * Filtrado por categorías, búsqueda en tiempo real, ordenación y renderizado de tarjetas.
 */

function renderCatalogProducts() {
  const container = document.getElementById('catalogProductsGrid');
  const countEl = document.getElementById('catalogCount');
  if (!container || typeof PRODUCTS_DATA === 'undefined') return;

  let filtered = [...PRODUCTS_DATA];

  // 1. Filtrar por categoría
  if (APP_STATE.selectedCategory !== 'Todos') {
    filtered = filtered.filter(p => p.category.toLowerCase() === APP_STATE.selectedCategory.toLowerCase());
  }

  // 2. Filtrar por búsqueda
  if (APP_STATE.searchQuery.trim() !== '') {
    const q = APP_STATE.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // 3. Ordenar
  switch (APP_STATE.sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'default':
    default:
      // Conservar orden de catálogo
      break;
  }

  if (countEl) {
    countEl.textContent = `${filtered.length} piezas seleccionadas`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-catalog-state">
        <h3 style="font-family: var(--font-serif); margin-bottom: 0.5rem;">No encontramos piezas para tu búsqueda</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
          Prueba con otra palabra clave o explora todas las categorías de nuestra colección.
        </p>
        <button class="btn-chic-primary" type="button" onclick="resetCatalogFilters()">
          Ver toda la colección
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => createProductCardHtml(p)).join('');
  attachProductCardEvents(container);
}

function resetCatalogFilters() {
  APP_STATE.selectedCategory = 'Todos';
  APP_STATE.searchQuery = '';
  const searchInput = document.getElementById('catalogSearchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === 'Todos');
  });

  renderCatalogProducts();
}

function createProductCardHtml(product) {
  return `
    <article class="product-item-card" data-id="${product.id}">
      <div class="product-img-box">
        ${product.tag ? `<span class="product-chic-badge">${product.tag}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <button class="product-quick-hover-btn" type="button" data-action="open-detail" data-id="${product.id}">
          <span>Ver Talla & Detalles</span> →
        </button>
      </div>

      <div class="product-info-box">
        <span class="product-item-category">${product.category}</span>
        <h3 class="product-item-name">${product.name}</h3>
        <div class="product-item-price-row">
          <span class="product-price-rd">${formatCurrencyRD(product.price)}</span>
          ${product.originalPrice ? `<span class="product-price-prev">${formatCurrencyRD(product.originalPrice)}</span>` : ''}
        </div>
        
        <!-- Estado Oficial Requerido: Consultar disponibilidad -->
        <span class="product-inquiry-status">Consultar disponibilidad</span>
      </div>
    </article>
  `;
}

function attachProductCardEvents(container) {
  container.querySelectorAll('.product-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.dataset.id;
      if (typeof openProductModal === 'function') {
        openProductModal(productId);
      }
    });
  });
}

function initCategoryTabs() {
  const tabs = document.querySelectorAll('.category-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      APP_STATE.selectedCategory = tab.dataset.category;
      renderCatalogProducts();
    });
  });
}

function initSearchAndSort() {
  const searchInput = document.getElementById('catalogSearchInput');
  const sortSelect = document.getElementById('catalogSortSelect');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      APP_STATE.searchQuery = e.target.value;
      renderCatalogProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      APP_STATE.sortBy = e.target.value;
      renderCatalogProducts();
    });
  }
}
