# B-SHP BROTHERS · cómo subir el sitio

Documento para quien administra el servidor. Todo lo que hay que saber cabe aquí.

---

## Lo esencial en cinco líneas

- Es un **sitio estático**: HTML, CSS, JS e imágenes. **No hay build, ni Node, ni
  base de datos, ni backend.**
- **La raíz del sitio es el contenido de la carpeta `web/`** del repositorio. Nada de
  lo que está fuera de `web/` se publica.
- **Todas las rutas son relativas**, así que funciona igual en la raíz de un dominio
  que dentro de un subdirectorio. Lo único que no se puede hacer es sacar archivos
  de `web/` o reordenar `assets/`.
- **Hace falta HTTPS.** El checkout de Hotmart no abre su modal sobre http.
- Pesa **~113 MB**, casi todo vídeo en `web/assets/video/`.

**Repositorio:** https://github.com/24821717/B-SHP-BROTHERS (público, rama `main`)

---

## Cómo subirlo

### Opción A · desde el repositorio (recomendada)

```bash
git clone https://github.com/24821717/B-SHP-BROTHERS.git
rsync -av --delete B-SHP-BROTHERS/web/ /var/www/bshp/
```

Para actualizar después de cada cambio: `git pull` y repetir el `rsync`. El repo es
público, no hace falta ningún acceso para clonarlo.

### Opción B · sin git

Descargar el ZIP desde *Code → Download ZIP* en GitHub y subir por FTP/SFTP **el
contenido de la carpeta `web/`** al directorio público del dominio.

### Configuración del servidor

En la carpeta `deploy/` del repo están los dos archivos listos:

- **`deploy/.htaccess`** — Apache / cPanel. Se copia a la raíz del sitio.
- **`deploy/nginx-bshp.conf`** — Nginx. Ajustar `root` y los certificados.

Cubren lo único que este sitio necesita del servidor:

| Qué | Por qué |
|---|---|
| `index.html` como índice de directorio | `/thegame/` y `/legal/` son carpetas reales |
| Redirección a HTTPS | el checkout de Hotmart no funciona en http |
| MIME `video/mp4` | hay ocho vídeos de fondo; sin esto no reproducen |
| gzip en HTML/CSS/JS | imágenes y vídeo **no**: ya vienen comprimidos |
| Vídeos con caché de un año | pesan, y cuando cambian se les cambia el nombre |
| HTML/CSS/JS/imágenes **sin caché** | mientras el sitio esté en revisión |

> Sobre lo último: ya pasó una vez. Se cachearon las imágenes un año con el mismo
> nombre y el cliente siguió viendo el logo viejo días después de corregirlo. Con
> ETag la revalidación devuelve un 304 y no cuesta ancho de banda. Cuando el sitio
> se estabilice se puede subir la caché sin problema.

---

## Estructura

```
web/                     ← la raíz del sitio
├── index.html           ← la HOME
├── thegame/index.html   ← la sales page
├── legal/               ← términos, privacidad, contacto (aún sin redactar)
└── assets/
    ├── css/  js/  img/  video/
```

---

## Servicios externos que carga la página

Ninguno requiere credenciales ni configuración en el servidor: son enlaces y scripts
públicos. Sólo hay que dejar salida a internet.

- **Google Fonts** — `fonts.googleapis.com`, `fonts.gstatic.com`
- **Hotmart** — `static.hotmart.com` (el widget) y `pay.hotmart.com` (el checkout)
- **Stripe** — cuando Fer entregue los enlaces, los botones de la tienda apuntarán a
  `buy.stripe.com`. No hay que instalar nada: son enlaces normales.
- Redes sociales y WhatsApp, como enlaces salientes.

---

## Dominio

Apuntar **bshpbrothers.com** (y `www`, redirigido al principal) al servidor, y emitir
el certificado. Ojo con el nombre: es **bshp**, sin la O.

---

## Qué NO hay que tocar

- **No mover ni renombrar nada dentro de `web/assets/`.** Las rutas están escritas en
  el HTML y en `home-v2.js`.
- **No minificar ni concatenar el CSS y el JS** por ahora. El sitio está en rondas de
  revisión con el cliente y se edita a mano varias veces al día.
- **No borrar `web/legal/`.** Son páginas provisionales que existen para que ningún
  enlace del pie quede muerto hasta que lleguen los textos legales.

---

## Nota sobre Netlify

Hoy el sitio está publicado en Netlify (`b-shopbrothers.netlify.app`) y se despliega
solo con cada `git push` a `main`. Si pasa a servidor propio hay que decidir una de
dos cosas, para que no queden dos versiones vivas contradiciéndose:

1. **Mantener Netlify como entorno de pruebas** — lo recomendable: se revisa ahí y se
   publica en producción cuando está aprobado.
2. **Apagarlo** — *Site configuration → Danger zone → Delete site*.

---

## Contacto técnico

El sitio lo construye y mantiene **Marcela Osorio (Hashi.dev)**. Los cambios de
contenido y diseño salen de ahí y llegan por `git push` a `main`. Para dudas de
estructura o rutas, preguntar antes de mover archivos.
