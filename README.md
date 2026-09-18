# AURA ATELIER RD - Tienda Femenina & Pedidos por WhatsApp 🛍️💬

Plataforma e-commerce con diseño editorial femenino exclusivo, catálogo de prendas casuales para salir y andar, y confirmación de pedidos vía WhatsApp.

- 🌐 **Sitio Web en Vivo (GitHub Pages)**: [https://fonso01.github.io/tienda-ropa-whatsapp/](https://fonso01.github.io/tienda-ropa-whatsapp/)
- 📦 **Repositorio en GitHub**: [https://github.com/fonso01/tienda-ropa-whatsapp](https://github.com/fonso01/tienda-ropa-whatsapp)

---

## 📁 Arquitectura Modular del Proyecto

El código está completamente separado y organizado en módulos independientes para facilitar su lectura, mantenimiento y escalabilidad:

```text
tienda/
│
├── index.html            # Estructura semántica principal y marcado de modales
├── README.md             # Documentación técnica y guía de personalización
│
├── css/                  # Estilos modulares organizados por componentes
│   ├── main.css          # Archivo maestro que importa todos los submódulos
│   ├── variables.css     # Paleta de color femenina, tipografía Playfair y reset base
│   ├── header.css        # Barra de anuncios, logotipo del atelier y botón de bolsa
│   ├── hero.css          # Portada editorial, marco fotográfico en arco y pilares
│   ├── catalog.css       # Pestañas de categorías, buscador, ordenación y fichas de prendas
│   ├── modal.css         # Modal de detalle de prenda, selectores de talla/color y stepper
│   ├── drawer.css        # Panel lateral "Mi Pedido", resumen financiero y botón WhatsApp
│   └── footer.css        # Sección "Cómo Funciona", historia del atelier, footer y botón flotante
│
└── js/                   # Lógica JavaScript modular
    ├── data.js           # Catálogo de prendas, tallas, colores y precios en RD$
    ├── cart.js           # Estado del carrito, totales, almacenamiento en localStorage y badges
    ├── catalog.js        # Filtrado por categorías, búsqueda en tiempo real y ordenación
    ├── modal.js          # Modal de detalle, selección de variantes y stepper de cantidad
    ├── whatsapp.js       # Generador del mensaje estructurado de WhatsApp y ajustes
    └── app.js            # Punto de entrada e inicialización de módulos en DOMContentLoaded
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

4. **Configuración Dinámica de WhatsApp**:
   - Botón de engranaje (⚙️) en la cabecera para cambiar el número de teléfono del negocio y el nombre de la marca sin editar código.

---

## 🚀 Cómo Abrir la Tienda

- **En el navegador**: Abre directamente [index.html](file:///c:/Users/E7450%20i7%2016GB%20RAM/Documents/tienda/index.html).
- **Servidor local**: Si el servidor está activo, visita `http://localhost:4173`.
