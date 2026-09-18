/**
 * AURA ATELIER RD - Módulo de WhatsApp
 * Generador exacto del mensaje de pedido, URL encoder y modal de configuración.
 */

function generateWhatsAppMessageText() {
  if (!APP_STATE || !APP_STATE.cart || APP_STATE.cart.length === 0) return '';

  const customerName = document.getElementById('cartCustomerName')?.value.trim() || '';
  const customerCity = document.getElementById('cartCustomerCity')?.value.trim() || '';
  const customerNotes = document.getElementById('cartCustomerNotes')?.value.trim() || '';

  let lines = [];
  lines.push('Hola, quiero realizar el siguiente pedido:');
  lines.push('');

  let total = 0;
  APP_STATE.cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    total += itemSubtotal;

    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`   Talla: ${item.size}`);
    lines.push(`   Color: ${item.color}`);
    lines.push(`   Cantidad: ${item.quantity}`);
    lines.push(`   Precio: ${formatCurrencyRD(itemSubtotal)}`);
    lines.push('');
  });

  lines.push(`Total: ${formatCurrencyRD(total)}`);
  lines.push('');

  if (customerName || customerCity) {
    if (customerName) lines.push(`Cliente: ${customerName}`);
    if (customerCity) lines.push(`Ciudad/Sector: ${customerCity}`);
    lines.push('');
  }

  if (customerNotes) {
    lines.push(`Nota: ${customerNotes}`);
    lines.push('');
  }

  lines.push('Quisiera confirmar disponibilidad.');

  return lines.join('\n');
}

function updateWhatsAppPreview() {
  const previewEl = document.getElementById('whatsappPreviewText');
  if (previewEl) {
    const msg = generateWhatsAppMessageText();
    previewEl.textContent = msg || 'Tu pedido está vacío.';
  }
}

function handleWhatsAppOrderSubmit() {
  if (!APP_STATE || !APP_STATE.cart || APP_STATE.cart.length === 0) {
    if (typeof showToast === 'function') {
      showToast('Tu pedido está vacío. Elige una prenda primero.');
    }
    return;
  }

  const messageText = generateWhatsAppMessageText();
  const phone = (APP_STATE.whatsappNumber || '18095550199').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(messageText)}`;

  window.open(whatsappUrl, '_blank');
  if (typeof showToast === 'function') {
    showToast('Abriendo WhatsApp con tu pedido preparado...');
  }
}

function initSettingsModal() {
  const settingsBtn = document.getElementById('openSettingsBtn');
  const backdrop = document.getElementById('settingsModalBackdrop');
  const closeBtn = document.getElementById('settingsModalCloseBtn');
  const form = document.getElementById('settingsForm');
  const phoneInput = document.getElementById('settingsPhoneInput');
  const storeNameInput = document.getElementById('settingsStoreNameInput');

  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      phoneInput.value = APP_STATE.whatsappNumber;
      storeNameInput.value = APP_STATE.storeName;
      backdrop.classList.add('active');
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeSettingsModal);

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeSettingsModal();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPhone = phoneInput.value.trim();
      const newStoreName = storeNameInput.value.trim();

      if (newPhone) {
        APP_STATE.whatsappNumber = newPhone;
        localStorage.setItem('aura_whatsapp_number', newPhone);
      }
      if (newStoreName) {
        APP_STATE.storeName = newStoreName;
        localStorage.setItem('aura_store_name', newStoreName);
        document.querySelectorAll('.store-name-text').forEach(el => el.textContent = newStoreName);
      }

      closeSettingsModal();
      if (typeof showToast === 'function') {
        showToast('Configuración guardada exitosamente');
      }
      updateWhatsAppPreview();
    });
  }
}

function closeSettingsModal() {
  const backdrop = document.getElementById('settingsModalBackdrop');
  if (backdrop) backdrop.classList.remove('active');
}

function openDirectWhatsAppInquiry() {
  const phone = (APP_STATE.whatsappNumber || '18095550199').replace(/[^0-9]/g, '');
  const greeting = `Hola ${APP_STATE.storeName || 'AURA ATELIER'}, quisiera hacerles una consulta sobre una prenda y disponibilidad de tallas.`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(greeting)}`, '_blank');
}
