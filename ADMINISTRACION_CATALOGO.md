# 📋 Guía de Administración de Artículos - SOMOS CASUAL

Esta guía explica la arquitectura de gestión del catálogo de **SOMOS CASUAL**, detallando la separación entre la **Vista del Cliente** y la **Vista del Administrador**, y las opciones disponibles para actualizar y gestionar prendas, tallas, colores y precios en RD$.

---

## 👥 Vista del Cliente vs. Vista del Administrador

En una tienda con ventas coordinadas por WhatsApp, la experiencia del cliente debe ser visualmente impecable, ágil y sin fricciones de registro, mientras que la administración requiere control total sobre el catálogo:

| Característica | 🛍️ Vista del Cliente (Web Pública) | 🔐 Vista del Administrador |
| :--- | :--- | :--- |
| **Acceso** | Libre, cualquier clienta desde su móvil o PC | Privado (mediante panel protegido o archivo de datos) |
| **Visualización** | Catálogo con fotos, filtros, buscador y badges de tallas | Lista completa de artículos con opciones de edición |
| **Precios** | Precios claros en Pesos Dominicanos (`RD$`) | Posibilidad de cambiar precios y precios de oferta |
| **Disponibilidad** | Indicador *"Consultar disponibilidad"* | Control de existencias y opción de pausar/ocultar prendas |
| **Acción Principal** | Añadir prendas a la bolsa y enviar lista por WhatsApp | Crear, editar, activar, pausar o eliminar artículos |
| **Datos Personales** | No requiere registrarse ni ingresar contraseñas | Configuración del número de WhatsApp y datos del negocio |

---

## 👗 Anatomía de un Artículo en el Catálogo

Cada prenda en el sistema cuenta con los siguientes campos estructurados:

```javascript
{
  id: 'pantalon-cargo',                        // Identificador único (sin espacios ni acentos)
  name: 'Pantalón Cargo Casual Relaxed',       // Nombre comercial de la prenda
  category: 'Jeans & Pantalones',              // Categoría para los filtros del catálogo
  price: 2200,                                 // Precio de venta en Pesos Dominicanos (RD$)
  originalPrice: 2750,                         // (Opcional) Precio anterior tachado para simular rebaja
  tag: 'Súper Cómodo',                         // (Opcional) Insignia chic visible en la tarjeta
  image: 'https://ejemplo.com/foto1.jpg',      // Fotografía principal del artículo
  gallery: [                                   // Galería de fotos para el modal de detalle
    'https://ejemplo.com/foto1.jpg',
    'https://ejemplo.com/foto2.jpg'
  ],
  description: 'Pantalón de corte relajado con bolsillos...', // Descripción y sugerencia de uso
  sizes: ['S', 'M', 'L', 'XL'],               // Tallas disponibles para selección
  colors: [                                    // Colores con nombre y código de color (hex)
    { name: 'Verde Militar', hex: '#4b5320' },
    { name: 'Beige Cálido', hex: '#d2b48c' }
  ]
}
```

### 🏷️ Categorías Disponibles en la Tienda
Para que los filtros funcionen de forma automática, cada prenda debe pertenecer a una de las siguientes categorías exactas:
- `Tops & Camisas`
- `Jeans & Pantalones`
- `Vestidos Casuales`
- `Sets & Conjuntos`
- `Sneakers & Calzado`
- `Bolsos & Accesorios`

---

## 🛠️ ¿Cómo se Administran los Artículos? (3 Opciones)

Dependiendo de cómo prefieras gestionar tu tienda, existen 3 métodos de administración:

### Opción 1: Archivo de Datos Centralizado (Método Actual - Rápido y 100% Gratuito)
Actualmente, todas las prendas residen en el archivo [`js/data.js`](file:///c:/Users/E7450%20i7%2016GB%20RAM/Documents/tienda/js/data.js).

**¿Cómo agregar una prenda nueva?**
1. Abre el archivo [`js/data.js`](file:///c:/Users/E7450%20i7%2016GB%20RAM/Documents/tienda/js/data.js).
2. Copia uno de los bloques de prenda existentes y pégalo al inicio o al final de la lista `PRODUCTS_DATA`.
3. Modifica el nombre, precio, tallas y fotos.
4. Guarda y sube los cambios a GitHub (`git commit` y `git push`). El cambio se refleja automáticamente en la web.

**¿Cómo pausar o eliminar una prenda?**
- Para ocultarla temporalmente, puedes comentar el bloque con `/* ... */` o simplemente borrarlo.

---

### Opción 2: Panel Visual de Administrador (`admin.html`) con Clave PIN
Podemos crear una página privada (por ejemplo, `admin.html`) a la que solo tú tengas acceso mediante una contraseña o código PIN:

**¿Qué incluye esta pantalla?**
1. **Formulario Visual**: Campos para escribir el nombre, elegir categoría en una lista desplegable, escribir el precio en RD$, ingresar links de fotos, y seleccionar tallas y colores mediante casillas de verificación.
2. **Tabla de Artículos Activos**: Ver todas las prendas con botones de **[Editar]**, **[Pausar/Ocultar]** y **[Eliminar]**.
3. **Generador de Catálogo con 1 Clic**: Un botón que genera y descarga el archivo `data.js` actualizado o guarda los cambios en el almacenamiento de tu navegador.

---

### Opción 3: Conexión con Base de Datos en la Nube (Google Sheets o Firebase)
Si deseas administrar la tienda directamente desde tu celular en cualquier momento sin tocar archivos:

1. **Google Sheets como Base de Datos**:
   - Cada fila de una hoja de cálculo es una prenda: Columna A (Nombre), Columna B (Precio), Columna C (Tallas), etc.
   - La web lee los datos automáticamente desde la hoja de cálculo.
   - Cambias un precio o agregas una foto en Google Sheets desde la app de tu celular y la web se actualiza al instante.
2. **Firebase Firestore / Supabase**:
   - Panel de control en la nube con login de usuario y contraseña para administradores.

---

## 📸 Recomendaciones para las Fotografías

Para mantener la estética editorial de **SOMOS CASUAL**:
1. **Formato vertical**: Proporción recomendada `3:4` o `4:5` (resolución recomendada: `800 x 1000 px` o similar).
2. **Alojamiento gratuito de imágenes**:
   - Puedes subir las fotos de tus prendas a plataformas como [ImgBB](https://imgbb.com/) o [Cloudinary](https://cloudinary.com/) y copiar el enlace directo (`.jpg` o `.png`).
3. **Iluminación natural**: Fotos de cuerpo entero o medio cuerpo donde la prenda se aprecie claramente en movimiento o uso cotidiano.

---

## 💬 Flujo de Atención de Pedidos

Cuando una clienta pulsa el botón **"ENVIAR PEDIDO POR WHATSAPP"**, recibirás un mensaje como este:

```text
Hola, quiero realizar el siguiente pedido:

1. Camisa Oversize Popelín Casual
   Talla: M
   Color: Blanco Clásico
   Cantidad: 1
   Precio: RD$1,500

Total: RD$1,500

Cliente: Carolina Pérez
Sector / Ciudad: Santo Domingo, Bella Vista
Nota: ¿Tienen servicio a domicilio hoy mismo?

Quisiera confirmar disponibilidad.
```

**Pasos para el Administrador al recibir el mensaje:**
1. Verificar si la talla y color solicitados están físicamente disponibles.
2. Confirmar el costo de envío según la dirección del cliente.
3. Enviar la cuenta bancaria o link de pago para completar la compra.
4. Coordinar la entrega y empaque.

---

## ⚙️ Cambiar el Número de WhatsApp Receptor

Puedes cambiar el número que recibe los pedidos en cualquier momento:
1. En la página web principal, pulsa el ícono de engranaje (**⚙**) en la barra superior.
2. Ingresa tu número telefónico con código de país (Ej. `18095550199` para República Dominicana).
3. Pulsa **Guardar Cambios**. A partir de ese momento, todos los pedidos se enviarán a ese número.
