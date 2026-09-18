# SOMOS CASUAL - Tienda Femenina & Pedidos por WhatsApp 🛍️💬

Plataforma e-commerce con diseño femenino casual, catálogo de prendas para salir y andar, y confirmación de pedidos vía WhatsApp.

- 💻 **Entorno Local (Desarrollo)**: `http://localhost:4173/`
- 🔐 **Panel de Administración Local**: `http://localhost:4173/admin.html` *(PIN: `1234`)*
- 🔒 **Estado del Proyecto**: Modo **En Preparación / Privado** activo (el catálogo no es visible al público mientras lo preparas).
- 📋 **Guía de Administración de Artículos**: [ADMINISTRACION_CATALOGO.md](file:///c:/Users/E7450%20i7%2016GB%20RAM/Documents/tienda/ADMINISTRACION_CATALOGO.md)

---

## 📁 Arquitectura Modular del Proyecto

El código está completamente separado y organizado en módulos independientes para facilitar su lectura, mantenimiento y escalabilidad:

```text
tienda/
│
├── index.html                  # Tienda pública para clientas y marcado de modales
├── admin.html                  # Panel de administración protegido por PIN (CRUD y ajustes)
├── README.md                   # Documentación técnica y guía de inicio
├── ADMINISTRACION_CATALOGO.md  # Guía de gestión de artículos (Cliente vs Administrador)
│
├── css/                        # Estilos modulares organizados por componentes
│   ├── main.css                # Archivo maestro que importa todos los submódulos
│   ├── variables.css           # Paleta de color femenina, tipografía Playfair y reset base
│   ├── header.css              # Barra de anuncios, logotipo de Somos Casual y botón de bolsa
│   ├── hero.css                # Portada editorial, marco fotográfico en arco y pilares
│   ├── catalog.css             # Pestañas de categorías, buscador, ordenación y fichas de prendas
│   ├── client-panel.css        # Estilos para el panel lateral de la clienta (Mi Espacio)
│   ├── admin.css               # Estilos del dashboard de administración
│   ├── modal.css               # Modal de detalle de prenda, selectores de talla/color y stepper
│   ├── drawer.css              # Panel lateral "Mi Pedido", resumen financiero y botón WhatsApp
│   └── footer.css              # Sección "Cómo Funciona", historia de Somos Casual y footer
│
└── js/                         # Lógica JavaScript modular
    ├── data.js                 # Catálogo reactivo, fallback de 12 prendas y gestión de ajustes
    ├── client-panel.js         # Datos de entrega de clienta, favoritos e historial de pedidos
    ├── admin.js                # Lógica de administración (PIN, CRUD de prendas, exportación)
    ├── cart.js                 # Estado del carrito, totales, almacenamiento en localStorage y badges
    ├── catalog.js              # Filtrado por categorías, búsqueda en tiempo real y favoritos
    ├── modal.js                # Modal de detalle, selección de variantes y stepper de cantidad
    ├── whatsapp.js             # Generador del mensaje estructurado de WhatsApp y ajustes
    └── app.js                  # Punto de entrada e inicialización de módulos en DOMContentLoaded
```

---

## 🌟 Características Principales

1. **Diseño Editorial Femenino**:
   - Paleta suave en tonos lino, marfil (`#fcf9f5`), champagne y terracota (`#a85845`).
   - Tipografía editorial de alta moda: **`Playfair Display`** para títulos y **`Plus Jakarta Sans`** para lectura cómoda.
   - Marco de fotografía en arco orgánico con detalles de alta gama (`✦`).

2. **Catálogo Exclusivo de Mujer**:
   - Vestidos, Blusas & Tops, Pantalones & Faldas, Conjuntos, Calzado y Accesorios.
   - Búsqueda en vivo y ordenación por precio en Pesos Dominicanos (`RD$`).

3. **Flujo de WhatsApp & Disponibilidad**:
   - Estado oficial **"Consultar disponibilidad"** (sin promesas rígidas en la web).
   - Generación automática del mensaje estructurado:
   ```text
   Hola, quiero realizar el siguiente pedido:

   1. Camisa Oversize de Lino Crudo
      Talla: M
      Color: Negro
      Cantidad: 1
      Precio: RD$1,500

   2. Pantalón Cargo con Caída Fluida
      Talla: 32
      Color: Beige
      Cantidad: 1
      Precio: RD$2,200

   Total: RD$3,700

   Quisiera confirmar disponibilidad.
   ```

4. **Configuración Segura de WhatsApp y Tienda**:
   - Gestionada exclusivamente desde el **Panel de Administración (`admin.html`)** protegido por PIN para que las clientas no tengan acceso a modificar ajustes de la tienda.

---

## 🚀 Cómo Abrir la Tienda

- **En el navegador**: Abre directamente [index.html](file:///c:/Users/E7450%20i7%2016GB%20RAM/Documents/tienda/index.html).
- **Servidor local**: Si el servidor está activo, visita `http://localhost:4173`.
