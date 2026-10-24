# ✦ Sorpresa de Cumpleaños para Anthonella (19 Años) ✦

Página web interactiva de cumpleaños diseñada con estética **Soft Rockstar + Dreamy Anime**, protagonizada por **tulipanes**, cielos nocturnos estrellados, detalles de diario musical, las **tres fotografías/ilustraciones integradas** y tu **canción personalizada en MP3**. Construida únicamente con **HTML5, CSS3 y JavaScript Vanilla**, lista para abrirse localmente o publicarse gratis en **GitHub + Vercel**.

---

## 📁 1. Estructura del Proyecto

```text
cumple-anthonella/
├── index.html                      # Estructura de las 3 pantallas (con las 3 imágenes y la canción ya integradas)
├── css/
│   └── style.css                   # Estilos para computadora y celular (360px, 375px, 390px, 430px)
├── js/
│   └── app.js                      # Navegación de las 3 pantallas, lluvia de pétalos/estrellas y reproductor
├── assets/
│   ├── images/
│   │   ├── foto1.jpg               # Imagen 1 integrada (Ilustración Spider-Punk en azul)
│   │   ├── foto2.jpg               # Imagen 2 integrada (Retrato de Anthonella)
│   │   ├── foto3.jpg               # Imagen 3 integrada (Ilustración Spider-Punk estilo cómic)
│   │   ├── tulipan-icono.svg       # Icono vectorial de tulipán (favicon y encabezado)
│   │   └── LEEME_FOTOS.txt         # Nota informativa de la carpeta de imágenes
│   └── audio/
│       ├── musica.mp3              # Canción principal integrada en el reproductor
│       └── LEEME_AUDIO.txt         # Nota informativa de la carpeta de audio
└── README.md                       # Guía paso a paso de prueba y publicación
```

---

## 💻 2. Cómo Abrir y Probar el Proyecto Localmente

No necesitas editar ningún archivo ni instalar programas adicionales:

1. Abre la carpeta `cumple-anthonella` en tu computadora.
2. Haz **doble clic sobre el archivo `index.html`**.
3. **Prueba el recorrido completo:**
   - **Música:** Pulsa el botón **"Música: OFF"** arriba a la derecha para reproducir `assets/audio/musica.mp3` y vuelve a pulsarlo cuando quieras pausarla.
   - **Pantalla 1 (Bienvenida):** Portada con tulipanes, estrellas y reproductor decorativo. Pulsa **"Comenzar la experiencia ✦"**.
   - **Pantalla 2 (Carta personal):** Lee la carta completa sobre la hoja de papel clara, desde `"Holaaaa, Anthonella."` hasta la firma `"Con cariño, Deyvi"`.
   - **Pantalla 3 (Sorpresa final):** Ramo iluminado de tulipanes, lluvia de pétalos/estrellas, galería con **`foto1.jpg`**, **`foto2.jpg`** y **`foto3.jpg`**, y botón **"↺ Volver a empezar"**.

---

## 🚀 3. Cómo Subir los Archivos a GitHub

### Opción A: Subir archivos directamente desde el navegador (Sin usar consola)
1. Entra en [github.com](https://github.com/) e inicia sesión con tu cuenta.
2. En la esquina superior derecha, haz clic en el botón **`+`** y selecciona **"New repository"**.
3. En **Repository name**, escribe: `cumple-anthonella`.
4. Elige **Public** o **Private** y haz clic en **"Create repository"**.
5. En la pantalla siguiente, haz clic en el enlace **"uploading an existing file"**.
6. Abre la carpeta `cumple-anthonella` en tu computadora, selecciona **todos los elementos que están dentro** (`index.html`, `css`, `js`, `assets`, `README.md`) y arrástralos hacia la ventana de GitHub.
7. Espera a que terminen de cargar todos los archivos (incluyendo las 3 fotos y `musica.mp3`) y haz clic en el botón verde **"Commit changes"**.

### Opción B: Subir usando Git desde la terminal
Si tienes Git instalado en tu computadora, abre una terminal dentro de la carpeta `cumple-anthonella` y ejecuta:

```bash
git init
git add .
git commit -m "Sorpresa de cumpleaños para Anthonella lista"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/cumple-anthonella.git
git push -u origin main
```

---

## 🌐 4. Cómo Conectar GitHub con Vercel y Publicar la Web

1. Entra en [vercel.com](https://vercel.com/) e inicia sesión con **"Continue with GitHub"**.
2. Haz clic en **"Add New..."** → **"Project"**.
3. Busca tu repositorio `cumple-anthonella` y haz clic en **"Import"**.
4. En la pantalla de configuración:
   - **Framework Preset:** Déjalo en **`Other`**.
   - **Build and Output Settings:** Déjalo vacío por defecto.
5. Haz clic en **"Deploy"**.
6. En pocos segundos tendrás tu enlace público (por ejemplo: `https://cumple-anthonella.vercel.app`) listo para abrir en celular o computadora y compartir con Anthonella.
