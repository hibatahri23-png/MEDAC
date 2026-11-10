# Into the Abbys — descarga completa de la web

Todo lo que necesitas para usar, enseñar y seguir desarrollando la web del juego.

## Qué hay en esta carpeta

| Carpeta | Qué es |
| --- | --- |
| `web-estatica/` | La web ya terminada y lista para compartir. Funciona sin instalar nada. |
| `codigo-fuente/` | El proyecto completo (React + TanStack Start) para seguir modificándolo. |
| `imagenes/` | Las 4 imágenes originales del juego, sueltas y con nombre claro. |

---

## 1. Abrir la web terminada (`web-estatica/`)

### Opción rápida: solo mirar
Haz **doble clic en `web-estatica/index.html`**. Se abre la página completa con
diseño, imágenes y el formulario de contacto. Lo único que no responde es el
mini-juego de "Prueba el descenso" (necesita un pequeño servidor local, ver
abajo).

### Opción completa: web interactiva (recomendada)
Desde dentro de la carpeta `web-estatica`:

- **Windows:** doble clic en `ver-web.bat`
- **macOS / Linux:** `sh ver-web.sh` (o `sh ver-web.sh 9000` para otro puerto)
- **Sin Python:** `npx serve .`

Luego abre <http://localhost:8080>. Ahí sí funcionan el mini-juego (teclas **A**
y **D**, **Espacio** para saltar) y los controles táctiles del móvil.

### Subirla a internet
Copia el **contenido** de `web-estatica/` a la raíz de cualquier hosting
estático (Netlify, Vercel, GitHub Pages, Cloudflare Pages, tu propio servidor).
Súbela en la raíz, no dentro de una subcarpeta, para que las rutas encajen.

> Nota: al abrir la carpeta con `file://` o desde una subcarpeta, el navegador
> bloquea los scripts por seguridad; por eso la versión interactiva necesita
> servirse desde la raíz.

---

## 2. Seguir desarrollando (`codigo-fuente/`)

Requisitos: [Node.js](https://nodejs.org) 20+ y [Bun](https://bun.sh) (o npm).

```bash
cd codigo-fuente
bun install        # o: npm install
bun run dev        # o: npm run dev  →  http://localhost:8080
```

Compilar una versión de producción:

```bash
bun run build
```

Detalles útiles:

- El texto y las secciones de la página están en `src/routes/index.tsx`.
- Los colores y la tipografía están en `src/styles.css`.
- Las imágenes se referencian desde `src/assets/*.asset.json`.
- El correo del formulario de contacto está en la constante `CONTACT_EMAIL` de
  `src/routes/index.tsx`.

---

## 3. El formulario de contacto

Envía los mensajes a **cpidumitras@gmail.com** a través de FormSubmit; no
necesita servidor propio. La **primera** vez que alguien envíe un mensaje,
FormSubmit manda un correo de confirmación a esa dirección: haz clic en el
enlace una sola vez y a partir de ahí los mensajes llegan directo a tu bandeja.

---

## 4. Imágenes (`imagenes/`)

- `portada.png` — arte principal del juego (portada de la web)
- `animacion-personaje.gif` — animación del personaje
- `movimiento.png` — captura del juego en movimiento
- `desarrollo-godot.png` — captura del editor de Godot

---

## 5. Enlaces

- Web publicada: <https://magic-sponsor-showcase.lovable.app>
