/**
 * SOMOS CASUAL - Módulo Principal de la Aplicación
 * Coordinación de módulos e inicialización en DOMContentLoaded.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Catálogo y Filtros
  if (typeof initCategoryTabs === 'function') initCategoryTabs();
  if (typeof initSearchAndSort === 'function') initSearchAndSort();
  if (typeof renderCatalogProducts === 'function') renderCatalogProducts();

  // 2. Inicializar Modal de Prenda
  if (typeof initModalEvents === 'function') initModalEvents();

  // 3. Inicializar Carrito / Drawer
  if (typeof initCartDrawer === 'function') initCartDrawer();
  if (typeof updateCartBadge === 'function') updateCartBadge();
  if (typeof renderCartItems === 'function') renderCartItems();

  // 4. Inicializar Configuración de WhatsApp
  if (typeof initSettingsModal === 'function') initSettingsModal();

  // 5. Inicializar Panel de la Clienta (Mi Espacio)
  if (typeof initClientPanel === 'function') initClientPanel();
});
