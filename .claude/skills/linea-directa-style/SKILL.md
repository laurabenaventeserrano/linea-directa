---
name: linea-directa-style
description: The visual style of Línea Directa (~/Documents/LINEA DIRECTA/), written as a reusable design system — the canonical palette (20 colours, the phone/paper alias) and the common 3 px stroke from Laura's Figma variables, plus fonts, windows, heart buttons, LCD screens, the character card, stamps, hover tags, pixel cursors, motion and copy voice. Use when building, styling or reviewing anything in Línea Directa (a screen, dialog, button, card state, illustration, colour or stroke tokens, Figma variables), or when Laura asks for something "in the Línea Directa style" in another project. Pair it with the `linea-directa` skill, which says what is frozen.
---

# Línea Directa style

A pastel late-90s / early-2000s handheld game: Game Boy Advance and Nintendo DS menus, desktop-toy windows, a board-game card, a fuchsia phone. It's playful and flat, with hard offset shadows, pixel type and no gradients on objects. Everything is built from the pieces below; nothing new gets invented when a piece already exists.

The source of truth is the code: `:root` and the components in `index.html`, the phone in `phone.js` (frozen), the cursors in `cursors/`. If this file and the code disagree, the code wins and this file gets fixed.

## Paleta y trazos · referencia canónica

> Añadido por Laura el 17 oct 2026. Fuente: manual de variables locales «Línea Directa», modo Pastel (Figma). Para colores y trazos, esta sección manda sobre el resto del documento.

Implementa el sistema visual de Línea Directa respetando sus tokens y sus usos semánticos.

### Alcance

Esta referencia define:
- 20 colores distintos.
- 1 alias de color.
- 1 grosor común de trazo: 3 px.
- Excepciones específicas para documentación.
- Conservación de imágenes ráster.

No define tipografías, escalas de espaciado, radios, dimensiones de componentes ni parámetros completos de sombra. Conserva los existentes en el proyecto y no presentes decisiones nuevas como reglas del sistema.

### Flujo de trabajo

1. Inspecciona la implementación existente: tokens, estilos globales, componentes y recursos.
2. Identifica los tokens equivalentes antes de crear otros.
3. Reutiliza la arquitectura y las convenciones del proyecto.
4. Aplica los colores según su función, no solo por semejanza visual.
5. Mantén los alias como referencias y los trazos vinculados al token común.
6. Limita los cambios al alcance solicitado.
7. Revisa el resultado y ejecuta las comprobaciones disponibles.
8. Resume los cambios y cualquier desviación o comprobación pendiente.

Si el proyecto contiene valores que contradicen esta referencia, señala la discrepancia. No hagas una migración global sin autorización.

### Paleta canónica

Los nombres son identificadores exactos. Los HEX representan sus valores de referencia, no colores adicionales que deban repetirse en los componentes.

| Token | HEX | Uso |
| --- | --- | --- |
| `phone/fuchsia` | `#FF2E9A` | Cuerpo del teléfono |
| `phone/ink` | `#2A0F45` | Rellenos y detalles |
| `phone/yellow` | `#FFE14D` | Pantalla y siluetas |
| `line` | `#A9507E` | Contornos de producto |
| `text` | `#7A3A60` | Texto de contenido |
| `cream` | `#FFFBF4` | Superficies y brillos |
| `blush` | `#FFD1E4` | Fondo y callpad |
| `pink` | `#FFB3D1` | Barras y cartas |
| `mint` | `#C3F0DF` | Tinte de ventana |
| `sky` | `#C9E2FF` | Tinte de ventana |
| `lav` | `#DCCBFF` | Tinte y estado activo |
| `butter` | `#FFF0B3` | Tinte y botón principal |
| `peri` | `#7B86E6` | Texto de pantalla |
| `screen` | `#F1F0FF` | Superficie LCD |
| `shadow` | `#F5A9C9` | Sombras de desplazamiento |
| `green` | `#8ADB93` | Acción de llamar |
| `red` | `#FF7FA3` | Acción de colgar |
| `yellow-dot` | `#FFE58A` | Indicador de ventana |
| `background/canvas` | `#FFFFFF` | Documentación y retícula |
| `border/section` | `#000000` | Borde de sección, aplicado al 10% de opacidad |

#### Alias obligatorio

`phone/paper` → `cream`

- Resuelve a `#FFFBF4` mediante una referencia a `cream`.
- No lo conviertas en un valor independiente.
- No lo cuentes como un color número 21.
- Un cambio de `cream` debe propagarse al alias.

### Trazos

Token: `stroke/default`  
Tipo de origen: `FLOAT`  
Valor: `3`  
Representación visual: `3 px`

Reglas:
- Usa `line` en contornos, iconos y divisores de producto.
- Usa `cream` para los brillos.
- Reserva `phone/ink` para rellenos y detalles de tinta oscura; no lo uses como sustituto del contorno común.
- Reutiliza `stroke/default` en lugar de repetir el grosor en cada componente.
- No introduzcas grosores alternativos para el producto sin una indicación explícita.

### Vincular, no duplicar

#### En una implementación web

- Centraliza los valores en la capa de tokens del proyecto.
- Consume referencias desde componentes y estilos.
- No distribuyas HEX o valores RGB literales por la interfaz.
- Si ya existen tokens equivalentes, reutilízalos en vez de crear una segunda paleta.
- Conserva los alias como referencias reales.

Si no existe una convención de nombres, utiliza propiedades CSS con prefijo `--ld-` y sustituye `/` por `-`:

- `phone/fuchsia` → `--ld-phone-fuchsia`
- `background/canvas` → `--ld-background-canvas`
- `border/section` → `--ld-border-section`
- `stroke/default` → `--ld-stroke-default`

Representa el grosor CSS como `3px` y el alias como:

    --ld-phone-paper: var(--ld-cream);

Para SVG, utiliza los mismos tokens en `fill`, `stroke` y `stroke-width`. Respeta las unidades y transformaciones de su sistema de coordenadas para mantener el grosor visual previsto.

#### Si trabajas con Figma

- Aplica las variables locales a rellenos y trazos.
- Vincula el grosor a `stroke/default`.
- Conserva `phone/paper` como alias de `cream`.
- No sustituyas vínculos por valores literales equivalentes.

### Excepciones de documentación

- `background/canvas` es el blanco del fondo y la retícula de documentación. No lo conviertas automáticamente en el fondo de todas las superficies de producto.
- `border/section` es negro al 10% de opacidad y se utiliza únicamente en bordes de sección de documentación.
- Aplica esa opacidad al borde, no al contenedor completo ni a su contenido.
- No uses `border/section` en contornos de producto: estos corresponden a `line`.
- La referencia no especifica un grosor propio para el borde técnico de documentación. No lo inventes como parte del sistema.

### Imágenes ráster

Conserva las imágenes existentes intactas.

Salvo petición explícita:
- No las recolorees.
- No les apliques filtros para forzar la paleta.
- No las traces ni las conviertas en elementos editables.
- No las reemplaces por recreaciones.

La aplicación de tokens se realiza sobre los elementos editables, no sobre los píxeles de las imágenes.

### Límites y decisiones no definidas

- No deduzcas una escala tipográfica o un sistema de radios a partir de esta paleta.
- El token `shadow` define el color, no el desplazamiento, desenfoque ni expansión de una sombra.
- No inventes colores adicionales para estados sin indicarlo.
- Mantén diferenciados `phone/yellow`, `butter` y `yellow-dot`, así como `text`, `line` y `phone/ink`.
- Si un requisito de accesibilidad entra en conflicto con una combinación de colores, informa del problema y busca primero una solución dentro de la paleta. No cambies silenciosamente los valores canónicos.

### Lista de comprobación

Antes de terminar, verifica:

- [ ] Se han conservado los 20 colores canónicos y sus funciones.
- [ ] `phone/paper` referencia a `cream`.
- [ ] Los componentes consumen tokens, no copias de sus valores.
- [ ] Los trazos de producto utilizan `stroke/default`, equivalente a 3 px.
- [ ] Los contornos de producto usan `line`.
- [ ] Los brillos usan `cream`.
- [ ] El negro al 10% se limita a bordes de sección de documentación.
- [ ] Las imágenes ráster permanecen intactas.
- [ ] No se han atribuido al sistema reglas que la referencia no define.
- [ ] Se han revisado legibilidad, contraste y posibles desbordamientos.
- [ ] Se han ejecutado las comprobaciones disponibles o indicado cuáles no pudieron realizarse.

### Discrepancias con el código actual (pendientes de decisión de Laura)

Detectadas al añadir esta referencia. No se ha migrado nada.

- **Grosores.** La referencia fija un único trazo de 3 px (`stroke/default`). El código usa también 2 px (etiquetas, chips, tags, botones pequeños, cartas pequeñas, etiqueta flotante), 4 px (logo, botón grande, pantalla del teléfono) y 1,5 px en el patrón de las cartas. No existe un token de trazo; el grosor se repite en cada regla.
- **Nombres.** El código usa `--fuchsia`, `--line`, `--cream`… en lugar de `phone/fuchsia` o `--ld-*`. Según la referencia, se reutilizan los tokens existentes; no hace falta renombrar.
- **Tokens que faltan en `:root`:** `phone/ink`, `phone/yellow`, `phone/paper` (alias), `yellow-dot`, `stroke/default`. Hoy viven como HEX literales en `phone.js`, `game.js` (iconos, corazones, paleta de retratos) y `index.html` (puntos de ventana `#FFE58A`, SVG en data URI).
- **HEX literales fuera de la capa de tokens:** corazones e iconos en `game.js`, fondos de carta en data URI, cursores en `cursors/make-cursors.py`, paletas de los retratos en `candidates.js`.
- **Ilustración de los retratos.** Los retratos de píxel usan colores propios de cada personaje (pieles, pelo, ropa) que no forman parte de la paleta. La referencia no dice nada de retratos; se tratan como ilustración, sin cambios.

## Tokens (resumen de uso en el código)

Para valores y funciones canónicas, ver «Paleta y trazos · referencia canónica» arriba. Esta tabla describe cómo se usan hoy en `index.html`.

| Token | Value | Use |
|---|---|---|
| `--fuchsia` | `#FF2E9A` | **The phone only**, plus the logo and dialog titles |
| `--line` | `#A9507E` | Every outline, small labels, hard shadows |
| `--text` | `#7A3A60` | Body text, names |
| `--cream` | `#FFFBF4` | Window and box backgrounds |
| `--blush` | `#FFD1E4` | Page, call pad, blocked card |
| `--pink` | `#FFB3D1` | Card, default title bar, texts trait |
| `--mint` | `#C3F0DF` | Bar, plans trait, photo background |
| `--sky` | `#C9E2FF` | Bar, photo background |
| `--lav` | `#DCCBFF` | Bar, NOT trait, photo background |
| `--butter` | `#FFF0B3` | Name labels, primary buttons, stamps, tags |
| `--peri` | `#7B86E6` | Screen text, focus ring, "dialled" ring |
| `--screen` | `#F1F0FF` | LCD and list screens |
| `--green` | `#8ADB93` | Call heart, "on the line" ring |
| `--red` | `#FF7FA3` | Hang-up heart, BLOCK, danger hearts |
| `--shadow` | `#F5A9C9` | Soft pink offset shadow on windows |

Phone ink `#2A0F45` and phone yellow `#FFE14D` exist only inside `phone.js`, and as the outline of pixel portraits.

**Page:** a blush background with a mint → blush → butter vertical gradient and a white 28px grid (`1.5px` lines at 75% white).

## Type

- **Silkscreen** (`--px`): all UI, labels, buttons and tags, in UPPERCASE at 7–12px, bold for labels.
- **VT323** (`--lcd`): anything that appears on a screen: clues, dialogue, phone numbers, traits, stats (17–27px).
- **Titan One** (`--logo`): the logo, character names, dialog titles and archetypes. Dialog titles are fuchsia with a 2px line stroke (`-webkit-text-stroke` + `paint-order:stroke fill`).

No other fonts. No sentence-case UI labels.

## Shape and depth

- Borders are always in `--line`. **Canonical stroke: 3px (`stroke/default`).** Today the code also uses 2px on small items and 4px on the logo and big buttons; that discrepancy is pending Laura's decision (see above). Don't add new widths.
- Radii: 16px for windows, 12px for cards and screens, 6–8px for labels and tags.
- **Hard offset shadows, never blur:** `6px 6px 0 var(--shadow)` on windows, `4px 4px 0 var(--line)` on cards, `3px 3px 0 var(--line)` on buttons, `2px 2px 0 var(--line)` on tags and small buttons.
- Pressing something moves it into its shadow: `:active{transform:translate(2px,2px)}`, with a smaller shadow.

## Components

- **Window `.win`:** a cream panel with a coloured `.bar` (title in Silkscreen 11px on the left, three dots on the right: yellow `#FFE58A`, green, red), a `.pad` of 12px, and an optional `.status` strip (cells divided by 2px lines, the live cell in butter or red). Title-bar text uses a symbol prefix plus UPPERCASE: `♥ LÍNEA DIRECTA.EXE`, `♪ CLUES.TXT`, `✿ THE LINEUP`, `✦ HOW IT WORKS`.
- **Button `.btn`:** Silkscreen bold 12px on cream (or `.y` butter), with a 3px line border, 12px radius and a 3px hard shadow. The big version `.btn-big` uses a 4px border and a double shadow (pink then line). Labels can lead with a symbol: `▶ ☎ ♪ ✕ ?`.
- **Heart buttons `.heartbtn`:** the call pad. An SVG heart in green (call), lavender (delete) or red (hang up), with a cream glyph inside, a 3px line drop shadow and a Silkscreen 9px label underneath. `.glow` pulses it when it's the next thing to press.
- **Screen `.lcd` / `.list`:** a `--screen` background, a 3px line border, a 4px lavender inset ring and periwinkle VT323 text. Line-coloured `small` labels sit on top. The text cursor is a blinking periwinkle block.
- **Trait tag `.tag` / `.chip b`:** Silkscreen 7–8px, with a 2px line border on a trait colour (texts = pink, plans = mint, exes = butter, not = lavender).
- **Character card `.cand`:** see the `linea-directa` skill. Pink with the hearts-and-555 pattern, a `#NN` tag and the name on a butter label, the photo in a film-strip frame, traits in a cream box, the number on an LCD strip (CALL), and the red BLOCK button. Each card is tilted −1.5° to 1.5°.
- **Stamp `.stamp`:** Silkscreen bold 11px, a 3px border, butter, rotated −12°, sitting low on the photo. Words: BLOCKED, WRONG ONE, IT WAS ME.
- **Hover tag `.tip`:** one floating tag that follows the cursor, sitting just above the fingertip (or below the hand at the top of the screen). Silkscreen bold 10px in line colour, on butter, with a 2px line border, 6px radius and a 2px hard shadow. Mouse only. Every clickable thing has a `data-tip` with a short UPPERCASE verb phrase: `CALL VICKY`, `BLOCK VICKY`, `DIAL 5`, `PICK UP`, `HANG UP`, `WRONG ONE = GAME OVER`.
- **Game menu `.menu` / `.mi`:** a cream window with a 3px line border and a 6px pink shadow. Items are Silkscreen bold 13px. The selected item is butter with a 2px line border, a hard shadow and the pink heart as a selector that nudges side to side. Hover, focus and the arrow keys move the heart; Enter chooses.
- **HUD `.hud`:** a cream bar like the menu (3px line border, 16px radius, 6px pink shadow). The case label is Titan One 22px on butter, tilted −2°, with a 3px hard shadow; counts are VT323 on small screen chips; progress and life are rows of the red/cream heart (`I.meter`).
- **Case banner `.banner`:** a big butter Titan One label (like the logo, but in `--text`, not fuchsia) over a small screen tag, centred over everything without a backdrop, popping in and out in 1.6 s. No animation under reduced motion.
- **Next step `#nowNext`:** one Silkscreen line at the bottom of the main screen saying what to do now, starting with ▶. It never blinks.
- **Fixed stage `.staged`:** on desktop (≥900×560) the title and the game are a 1440×960 stage scaled to fit; anything dragged inside it divides pointer deltas by the scale `S`.
- **Card fan (title):** mini `.cand` cards (`.fan .fcard`) rotated around a point far below them (`transform-origin:50% 330%`, 8° apart), dealt in one after another, sitting behind the phone. Scope fan rules under `.fan` so the base `.cand` rule doesn't override them.
- **Caller ID:** a small screen box (screen background, lavender inset, hard line shadow) tilted 4°, next to the phone.
- **Dialog:** a pink 28px grid overlay, a `.win` up to 440px wide, a centred `.pad`, a Titan One title, VT323 quotes and stats on a screen box, and a `.btn-big` action at the bottom.

## Cursors (`cursors/`, drawn by `cursors/make-cursors.py`)

Nintendo-handheld pixel cursors: 2px per pixel, a line-colour outline, a cream glove, a pink cuff and a hard pink shadow one pixel down-right.

| Variable | Use | Hotspot |
|---|---|---|
| `--cur-arrow` | default, disabled | 1 1 |
| `--cur-hand` | anything clickable (buttons, cards, keys) | 9 1 (fingertip) |
| `--cur-grab` | the phone, the title phone | 16 14 |
| `--cur-grabbing` | while dragging the phone | 16 12 |

Never use the system `pointer` or `grab` cursors directly; always use `cursor:var(--cur-…)`. To draw a new cursor, add a grid to `make-cursors.py` (`K` outline, `W` glove, `P` cuff, `Y` butter) and run it.

## Pixel portraits

24×24 grids in `candidates.js`. `k` is the outline (phone ink), the palette is per character, and the background is a pastel token behind the frame. Props go in `over` (a phone, a rose, a magnifying glass…). Each portrait carries one visual clue to that character's red flag.

## Motion

Small, toy-like and quick, never on body text. Allowed: wiggle on the title phone, ring shake (`.12s`), a heart pulse on the next action, a stamp drop (`scale 2.6 → 1`), a card shake on a wrong pick, a 2px press on buttons, a dialog pop. Every animation turns off under `prefers-reduced-motion`.

## Copy voice

The UI is in English, short, deadpan and a bit mean-funny: dating red flags told like a 90s phone line. UI labels are UPPERCASE verbs. Dialogue is sentence case, in quotes, on a screen. The game is always called **Línea Directa**.

## Avoid

Fuchsia anywhere except the phone, the logo and dialog titles · blur shadows · gradients on objects · dark mode · neon or CRT-green · system cursors · new fonts · rounded "app" UI without the hard shadow · emoji (text symbols like ♥ ☎ ✕ ▶ ♪ ✿ ✦ are fine).
