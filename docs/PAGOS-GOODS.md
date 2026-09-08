# B-SHP GOODS · cobro en dólares

Cómo queda montada la tienda de la home, qué tiene que hacer Fer y qué hace falta
para encenderla.

---

## 1. La plataforma recomendada: **Stripe**

Para lo que se pide —cobrar **en dólares**, desde México, en una web estática, sin
complicaciones— Stripe es la opción correcta:

- **Cobra en USD.** El cliente ve y paga en dólares; a Fer le llega en pesos a su
  banco mexicano. Es lo que Mercado Pago no hace: allí el checkout es en MXN.
- **No hace falta programar nada más ni pagar hosting extra.** Se usan los
  **Payment Links**: Fer crea el producto en su panel, Stripe le da una URL, y esa
  URL se pega en el catálogo. El sitio sigue siendo estático en Netlify.
- **El checkout ya trae lo que una tienda necesita**: dirección de envío, costes de
  envío, cantidad, tallas (como campo personalizado), cupones y los recibos por correo.
- Cobra con tarjeta nacional e internacional, Apple Pay y Google Pay.

**Comisiones (confirmar en stripe.com/mx/pricing antes de fijar precios).** En México
la referencia pública es **3.6% + $3 MXN** por transacción, **+2%** por conversión de
divisa cuando cobras en una moneda distinta a la de tu cuenta, y un recargo extra si
la tarjeta es internacional. Sobre una camiseta de $45 USD son unos **3 USD**.

### La alternativa, por si Fer la prefiere

**Mercado Pago**, si acepta cobrar **en pesos**. A cambio de renunciar al dólar gana
lo que más vende en México: **OXXO, SPEI y meses sin intereses**, y el alta es más
sencilla (no exige la misma formalidad fiscal). Se integraría igual: link de pago por
producto. Si Fer quiere las dos cosas, lo natural es Stripe para el extranjero y
Mercado Pago para México, pero eso ya es duplicar el catálogo: no lo recomiendo para
arrancar.

**Shopify** sólo tendría sentido si esto crece a un catálogo grande con inventario y
variantes. Hoy son seis piezas: es matar moscas a cañonazos y una cuota mensual.

---

## 2. Qué tiene que hacer Fer (una sola vez)

1. **Abrir la cuenta de Stripe** en `stripe.com/mx`. Le van a pedir:
   - **RFC activo** como persona física con actividad empresarial (régimen 612 o
     RESICO 626) o persona moral. *El nombre legal tiene que coincidir exactamente
     con el SAT.*
   - **Cuenta bancaria en México** (CLABE) a ese mismo nombre.
   - Dirección fiscal y un documento de identidad.
2. **Activar el cobro en USD**: en *Settings → Payments → Currencies*, añadir dólar.
3. **Crear un producto por pieza** (*Products → Add product*) con su foto, su nombre
   y su **precio en USD**.
4. **Generar un Payment Link por pieza** (*Payment Links → New*), y dentro de cada uno:
   - Activar **«Collect shipping address»** y añadir sus **tarifas de envío**
     (México / EE. UU. / resto, con el precio que decida).
   - Activar **«Adjust quantity»** para que el cliente pueda llevarse más de una.
   - En **camiseta, sudadera, gorra y bucket**, añadir un **campo personalizado**
     tipo desplegable llamado **Talla** con las opciones reales (S, M, L, XL…).
     Sin esto no sabrá qué talla enviar.
5. **Pasarle a Marcela las seis URLs** (`https://buy.stripe.com/…`) **y los seis precios**.

---

## 3. Qué necesito de Fer para encenderlo

Literalmente dos columnas:

| Pieza | Precio USD | Payment Link |
|---|---|---|
| Camiseta | | |
| Sudadera | | |
| Gorra | | |
| Bucket | | |
| Termo | | |
| Taza | | |

Y tres decisiones más:

- **¿A dónde envía?** Sólo México, o también EE. UU. / internacional. Define las
  tarifas de envío que hay que cargar en Stripe.
- **Tallas reales** de camiseta, sudadera, gorra y bucket.
- **Política de cambios y devoluciones**, y los **datos fiscales y de contacto**.
  Vendiendo producto físico esto deja de ser opcional: hoy `/legal/…` sigue vacío.

---

## 4. Cómo se enciende (30 segundos, sin tocar diseño)

Todo vive en un único bloque al final de **`web/assets/js/home-v2.js`**:

```js
var GOODS = {
  camiseta: { precio: 45, enlace: 'https://buy.stripe.com/xxxxxxxx' },
  sudadera: { precio: null, enlace: '' },
  ...
};
```

- `precio`: el número en dólares, sin símbolo.
- `enlace`: el Payment Link de esa pieza.

**Regla de seguridad:** una pieza sólo sale a la venta si tiene **las dos cosas**.
Si falta cualquiera, sigue mostrando «Próximamente» y no se puede comprar — así no
hay forma de publicar un precio sin cobro detrás, ni un cobro sin precio a la vista.
Por eso hoy las seis están en `null`: la tienda está montada y apagada.

**Para ver cómo queda ya mismo**, abre la home con `?demo=1` al final de la URL:
rellena precios de ejemplo y monta los botones. No cobra nada y sólo aparece con ese
parámetro.

---

## 5. Antes de vender de verdad

- [ ] Probar una compra real de $1 USD y comprobar que llega el dinero y el correo.
- [ ] Redactar devoluciones, envíos, privacidad y términos en `/legal/…`.
- [ ] Decidir quién empaqueta y envía, y en cuánto tiempo. El checkout no lo hace.
