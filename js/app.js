/**
 * SOMOS CASUAL - Módulo Principal de la Aplicación
 * Coordinación de módulos e inicialización en DOMContentLoaded.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Menú Móvil (Hamburguesa ☰)
  initMobileMenu();

  // 2. Inicializar Catálogo y Filtros
  if (typeof initCategoryTabs === 'function') initCategoryTabs();
  if (typeof initSearchAndSort === 'function') initSearchAndSort();
  if (typeof renderCatalogProducts === 'function') renderCatalogProducts();

  // 3. Inicializar Modal de Prenda (Ficha Boutique)
  if (typeof initModalEvents === 'function') initModalEvents();

  // 4. Inicializar Carrito / Drawer
  if (typeof initCartDrawer === 'function') initCartDrawer();
  if (typeof updateCartBadge === 'function') updateCartBadge();
  if (typeof renderCartItems === 'function') renderCartItems();

  // 5. Inicializar Configuración de WhatsApp
  if (typeof initSettingsModal === 'function') initSettingsModal();

  // 6. Inicializar Panel de la Clienta (Favoritos y Pedidos)
  if (typeof initClientPanel === 'function') initClientPanel();

  // 7. Validar Estado de la Tienda
  checkStoreAccess();
});

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const closeBtn = document.getElementById('mobileNavClose');
  const links = document.querySelectorAll('.mobile-nav-links a');

  function openMenu() {
    if (backdrop) {
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeMenu();
    });
  }

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

function checkStoreAccess() {
  const settings = typeof getStoreSettings === 'function' ? getStoreSettings() : { isStoreClosed: false };
  const isAdminAuthenticated = sessionStorage.getItem('somos_casual_admin_auth') === 'true';
  const screen = document.getElementById('comingSoonScreen');
  const msgEl = document.getElementById('comingSoonMessage');

  if (settings.isStoreClosed && !isAdminAuthenticated) {
    if (screen) {
      screen.style.display = 'flex';
      if (msgEl && settings.maintenanceMessage) {
        msgEl.textContent = settings.maintenanceMessage;
      }
      document.body.style.overflow = 'hidden';
    }
  } else {
    if (screen) {
      screen.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
}
