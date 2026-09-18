/**
 * SOMOS CASUAL - Catálogo de Ropa Casual para Salir y Andar
 * Prendas versátiles, cómodas y chic para el día a día, salidas, cine, compras y reuniones casuales.
 */

const DEFAULT_PRODUCTS_DATA = [
  {
    id: 'camisa-oversize',
    name: 'Camisa Oversize Popelín Casual',
    category: 'Tops & Camisas',
    price: 1500,
    originalPrice: 1950,
    isFeatured: true,
    tag: 'Básico Diario',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'La camisa oversize definitiva para salir y andar. Llévala abierta sobre un top básico, anudada a la cintura o suelta con jeans. Tejido suave, fresco y con caída moderna.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanco Clásico', hex: '#ffffff' },
      { name: 'Negro', hex: '#1c1917' },
      { name: 'Celeste Claro', hex: '#dbeafe' },
      { name: 'Beige Arena', hex: '#e2d5c5' }
    ]
  },
  {
    id: 'pantalon-cargo',
    name: 'Pantalón Cargo Casual Relaxed',
    category: 'Jeans & Pantalones',
    price: 2200,
    originalPrice: 2750,
    isFeatured: true,
    tag: 'Súper Cómodo',
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pantalón cargo de tiro alto y bota recta con bolsillos utilitarios modernos. Confeccionado en tela stretch ligera para caminar todo el día sin incomodidades.',
    sizes: ['32', '34', '36', '38'],
    colors: [
      { name: 'Beige', hex: '#d8c7b5' },
      { name: 'Negro', hex: '#1c1917' },
      { name: 'Verde Militar', hex: '#5c6449' }
    ]
  },
  {
    id: 'sneakers-urban-white',
    name: 'Sneakers Urban Casual White',
    category: 'Sneakers & Calzado',
    price: 3500,
    originalPrice: 4200,
    isFeatured: true,
    tag: 'Para Andar Todo el Día',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Los tenis blancos esenciales que combinan con vestidos, jeans y shorts. Suela ergonómica con amortiguación suave, perfectos para andar horas en el mall o pasear.',
    sizes: ['36', '37', '38', '39', '40'],
    colors: [
      { name: 'Blanco Total', hex: '#ffffff' },
      { name: 'Blanco & Nude', hex: '#f3ece5' }
    ]
  },
  {
    id: 'jeans-wide-leg',
    name: 'Jeans Wide Leg Tiro Alto',
    category: 'Jeans & Pantalones',
    price: 2400,
    originalPrice: 2900,
    isFeatured: true,
    tag: 'Favorito',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Denim suave con ajuste favorecedor en la cintura y pierna ancha relajada. El pantalón comodín que transforma una camiseta básica en un look para salir a cenar.',
    sizes: ['32', '34', '36', '38'],
    colors: [
      { name: 'Azul Medio Vintage', hex: '#658cb2' },
      { name: 'Negro Grafito', hex: '#262626' }
    ]
  },
  {
    id: 'top-halter-basico',
    name: 'Top Halter Cuello Alto Stretch',
    category: 'Tops & Camisas',
    price: 950,
    originalPrice: 1300,
    isFeatured: true,
    tag: 'Esencial',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Top sin mangas en algodón acanalado suave de doble capa. No transparenta, se adapta a tu cuerpo y queda increíble con jeans altos o shorts.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Negro', hex: '#1c1917' },
      { name: 'Blanco', hex: '#ffffff' },
      { name: 'Moca Cálido', hex: '#7b5e4d' }
    ]
  },
  {
    id: 'vestido-casual-ribbed',
    name: 'Vestido Corto Casual Ribbed',
    category: 'Vestidos Casuales',
    price: 1850,
    originalPrice: 2350,
    isFeatured: false,
    tag: 'Casual Chic',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Vestido corto de tejido elástico canalé con cuello redondo. Póntelo con tus tenis para el día o agrégale una chaqueta y botas para la noche.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Negro Intenso', hex: '#1c1917' },
      { name: 'Gris Jaspeado', hex: '#9e9e9e' },
      { name: 'Beige Cálido', hex: '#e3d6c7' }
    ]
  },
  {
    id: 'set-casual-short',
    name: 'Set Casual Sobrecamisa & Short',
    category: 'Sets & Conjuntos',
    price: 2950,
    originalPrice: 3600,
    isFeatured: false,
    tag: 'Look Completo',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Conjunto de dos piezas para resolver tu outfit en 1 minuto: sobrecamisa relajada con botones y short de tiro alto con pretina elástica y bolsillos.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Arena Natural', hex: '#d9cbbb' },
      { name: 'Negro', hex: '#1c1917' },
      { name: 'Verde Salvia', hex: '#8ea08c' }
    ]
  },
  {
    id: 'sobrecamisa-denim',
    name: 'Chaqueta Shacket Denim Suave',
    category: 'Tops & Camisas',
    price: 2600,
    originalPrice: 3200,
    isFeatured: false,
    tag: 'Tercera Pieza',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sobrecamisa de denim ligero corte boyfriend. El toque que completa cualquier look para tardes de cine, centro comercial o salir a comer.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Denim Medio', hex: '#587fa3' },
      { name: 'Denim Negro', hex: '#292929' }
    ]
  },
  {
    id: 'bodysuit-cuello-cuadrado',
    name: 'Bodysuit Básico Cuello Cuadrado',
    category: 'Tops & Camisas',
    price: 1200,
    originalPrice: 1550,
    isFeatured: false,
    tag: 'Imprescindible',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Body moldeador suave con escote cuadrado que resalta el escote. Cierre inferior con broches ajustables. No se sale del pantalón al andar.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Negro', hex: '#1c1917' },
      { name: 'Blanco Hueso', hex: '#faf7f2' },
      { name: 'Chocolate', hex: '#48352b' }
    ]
  },
  {
    id: 'cartera-crossbody',
    name: 'Cartera Crossbody para Salir',
    category: 'Bolsos & Accesorios',
    price: 1750,
    originalPrice: 2200,
    isFeatured: false,
    tag: 'Práctica',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Bolso bandolera de tamaño ideal para llevar teléfono, llaves, billetera y labial con las manos libres mientras caminas o sales.',
    sizes: ['Única'],
    colors: [
      { name: 'Negro Mate', hex: '#1a1a1a' },
      { name: 'Caramelo', hex: '#945d3c' },
      { name: 'Crema', hex: '#f0ece2' }
    ]
  },
  {
    id: 'gorra-casual-bordada',
    name: 'Gorra Estética Bordada Casual',
    category: 'Bolsos & Accesorios',
    price: 850,
    originalPrice: 1100,
    isFeatured: false,
    tag: 'Detalle Street',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Gorra de algodón suave con lavado vintage y hebilla metálica ajustable. El accesorio preferido para un look relajado de fin de semana.',
    sizes: ['Única (Ajustable)'],
    colors: [
      { name: 'Khaki', hex: '#c5b59b' },
      { name: 'Negro Lavado', hex: '#262626' },
      { name: 'Verde Bosque', hex: '#3d4c38' }
    ]
  },
  {
    id: 'sandalias-plataforma',
    name: 'Sandalias Plataforma Cómodas',
    category: 'Sneakers & Calzado',
    price: 2800,
    originalPrice: 3400,
    isFeatured: false,
    tag: 'Para Caminar',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sandalias de suela gruesa acolchada y tiras ajustables. Ganas altura sin sacrificar la comodidad al caminar y salir de tarde.',
    sizes: ['36', '37', '38', '39', '40'],
    colors: [
      { name: 'Negro', hex: '#1c1917' },
      { name: 'Nude / Beige', hex: '#d8c7b8' }
    ]
  }
];

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

