/**
 * ============================================================================
 * PROYECTO: SORPRESA DE CUMPLEAÑOS PARA ANTHONELLA (19 AÑOS)
 * ARCHIVO: js/app.js
 * DESCRIPCIÓN:
 * - Navegación fluida entre las 3 pantallas (Bienvenida, Carta, Sorpresa final)
 * - Contador de progreso, botones Siguiente, Anterior y Reinicio
 * - Animación ligera en Canvas (pétalos de tulipán, estrellas y confeti suave)
 * - Reproductor de música controlado por la usuaria (reproduce
 *   assets/audio/musica.mp3 y conserva la melodía ambiental Web Audio como
 *   respaldo automático si no se encuentra el archivo de audio)
 * - Respeto total a la preferencia de accesibilidad prefers-reduced-motion
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. ESTADO DE NAVEGACIÓN Y ELEMENTOS DEL DOM
     -------------------------------------------------------------------------- */
  const TOTAL_SCREENS = 3;
  let currentScreen = 1;

  const SCREEN_TITLES = {
    1: 'Paso 1 de 3 · Bienvenida',
    2: 'Paso 2 de 3 · Carta personal',
    3: 'Paso 3 de 3 · Sorpresa final'
  };

  // Referencias a elementos de la interfaz
  const screens = {
    1: document.getElementById('screen-1'),
    2: document.getElementById('screen-2'),
    3: document.getElementById('screen-3')
  };

  const progressCounter = document.getElementById('progress-counter');
  const stepStatusText = document.getElementById('step-status-text');
  const progressDots = document.querySelectorAll('.progress-dot');

  const btnStart = document.getElementById('btn-start');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnReset = document.getElementById('btn-reset');
  const btnRestartFinal = document.getElementById('btn-restart-final');
  const btnCelebrate = document.getElementById('btn-celebrate');
  const finaleStage = document.getElementById('finale-stage');

  const letterScrollArea = document.getElementById('letter-scroll-area');
  const letterScrollHint = document.getElementById('letter-scroll-hint');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* --------------------------------------------------------------------------
     2. FUNCIONES DE NAVEGACIÓN ENTRE LAS 3 PANTALLAS
     -------------------------------------------------------------------------- */

  /**
   * Cambia de pantalla sin recargar la página y actualiza todos los controles.
   * @param {number} targetScreen - Número de pantalla destino (1, 2 o 3)
   */
  function goToScreen(targetScreen) {
    const nextScreenNum = Number(targetScreen);
    if (nextScreenNum < 1 || nextScreenNum > TOTAL_SCREENS) {
      return;
    }

    currentScreen = nextScreenNum;

    // Mostrar únicamente la pantalla activa con transición suave
    for (let i = 1; i <= TOTAL_SCREENS; i++) {
      const section = screens[i];
      if (!section) continue;

      if (i === currentScreen) {
        section.hidden = false;
        void section.offsetWidth;
        section.classList.add('is-active');
      } else {
        section.classList.remove('is-active');
        section.hidden = true;
      }
    }

    // Actualizar contador superior (ej. "01 / 03")
    if (progressCounter) {
      progressCounter.textContent = `0${currentScreen} / 0${TOTAL_SCREENS}`;
    }

    // Actualizar texto descriptivo inferior
    if (stepStatusText) {
      stepStatusText.textContent = SCREEN_TITLES[currentScreen] || '';
    }

    // Actualizar puntos indicadores de progreso
    progressDots.forEach((dot) => {
      const dotScreen = Number(dot.getAttribute('data-goto'));
      const isCurrent = dotScreen === currentScreen;
      dot.classList.toggle('is-active', isCurrent);
      dot.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    // Actualizar estado de botones Anterior y Siguiente
    if (btnPrev) {
      btnPrev.disabled = currentScreen === 1;
    }
    if (btnNext) {
      btnNext.disabled = currentScreen === TOTAL_SCREENS;
    }

    // Acciones específicas por pantalla
    if (currentScreen === 2 && letterScrollArea) {
      updateLetterScrollHint();
    }

    if (currentScreen === 3) {
      launchCelebrationBurst();
    }

    // Llevar el scroll general arriba suavemente al cambiar de pantalla
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
  }

  /**
   * Actualiza el mensaje de pie de carta según el estado de lectura.
   */
  function updateLetterScrollHint() {
    if (!letterScrollArea || !letterScrollHint) return;
    const isAtBottom =
      letterScrollArea.scrollHeight - letterScrollArea.scrollTop <= letterScrollArea.clientHeight + 24;

    if (isAtBottom) {
      letterScrollHint.textContent = '✦ Carta completa · Con cariño, Deyvi ✦';
    } else {
      letterScrollHint.textContent = 'Desliza para leer la carta completa ↓';
    }
  }

  /* --------------------------------------------------------------------------
     3. EVENTOS DE NAVEGACIÓN
     -------------------------------------------------------------------------- */
  if (btnStart) {
    btnStart.addEventListener('click', () => goToScreen(2));
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentScreen > 1) {
        goToScreen(currentScreen - 1);
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentScreen < TOTAL_SCREENS) {
        goToScreen(currentScreen + 1);
      }
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (letterScrollArea) letterScrollArea.scrollTop = 0;
      goToScreen(1);
    });
  }

  if (btnRestartFinal) {
    btnRestartFinal.addEventListener('click', () => {
      if (letterScrollArea) letterScrollArea.scrollTop = 0;
      goToScreen(1);
    });
  }

  progressDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = Number(dot.getAttribute('data-goto'));
      goToScreen(target);
    });
  });

  if (letterScrollArea) {
    letterScrollArea.addEventListener('scroll', updateLetterScrollHint, { passive: true });
  }

  // Navegación accesible con teclado (Flecha izquierda / Flecha derecha)
  document.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight' && currentScreen < TOTAL_SCREENS) {
      goToScreen(currentScreen + 1);
    } else if (event.key === 'ArrowLeft' && currentScreen > 1) {
      goToScreen(currentScreen - 1);
    }
  });

  /* --------------------------------------------------------------------------
     4. SISTEMA DE PARTÍCULAS SUAVES (Pétalos, Estrellas y Confeti en Pantalla 3)
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  const PALETTE = ['#DCCCF5', '#C9E4F5', '#F2D5E4', '#8975B5', '#E4E7EF'];
  const ambientParticles = [];
  const burstParticles = [];
  const MAX_AMBIENT = 28;
  const MAX_BURST = 75;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createAmbientParticle(randomY) {
    const width = canvas ? canvas.width : window.innerWidth;
    const height = canvas ? canvas.height : window.innerHeight;
    const isStar = Math.random() > 0.55;

    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20,
      size: isStar ? 2 + Math.random() * 3.5 : 5 + Math.random() * 6,
      speedY: isStar ? 0.15 + Math.random() * 0.3 : 0.45 + Math.random() * 0.65,
      speedX: (Math.random() - 0.5) * 0.45,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      alpha: 0.35 + Math.random() * 0.5,
      type: isStar ? 'star' : 'petal'
    };
  }

  function initAmbientParticles() {
    ambientParticles.length = 0;
    const count = window.innerWidth < 600 ? 18 : MAX_AMBIENT;
    for (let i = 0; i < count; i++) {
      ambientParticles.push(createAmbientParticle(true));
    }
  }

  /**
   * Lanza una lluvia suave de pétalos de tulipán, estrellas y confeti pastel
   * para celebrar en la Pantalla 3.
   */
  function launchCelebrationBurst() {
    if (!canvas || prefersReducedMotion.matches) return;

    const centerX = canvas.width / 2;
    const originY = canvas.height * 0.32;

    for (let i = 0; i < 40; i++) {
      if (burstParticles.length >= MAX_BURST) {
        burstParticles.shift();
      }
      const angle = Math.random() * Math.PI * 2;
      const velocity = 1.6 + Math.random() * 4.2;
      const types = ['petal', 'star', 'confetti'];

      burstParticles.push({
        x: centerX + (Math.random() - 0.5) * 120,
        y: originY + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 1.8,
        gravity: 0.045 + Math.random() * 0.03,
        size: 5 + Math.random() * 6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.06,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha: 0.95,
        decay: 0.006 + Math.random() * 0.006,
        type: types[i % types.length]
      });
    }

    if (finaleStage) {
      finaleStage.classList.add('is-boosted');
      setTimeout(() => {
        finaleStage.classList.remove('is-boosted');
      }, 900);
    }
  }

  function drawPetal(context, x, y, size, rotation, color, alpha) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.globalAlpha = alpha;
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(0, -size);
    context.bezierCurveTo(size * 0.85, -size * 0.5, size * 0.85, size * 0.7, 0, size);
    context.bezierCurveTo(-size * 0.85, size * 0.7, -size * 0.85, -size * 0.5, 0, -size);
    context.fill();
    context.restore();
  }

  function drawFourPointStar(context, x, y, size, rotation, color, alpha) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.globalAlpha = alpha;
    context.fillStyle = color;
    context.beginPath();
    for (let i = 0; i < 4; i++) {
      context.lineTo(0, -size);
      context.rotate(Math.PI / 4);
      context.lineTo(0, -size * 0.35);
      context.rotate(Math.PI / 4);
    }
    context.closePath();
    context.fill();
    context.restore();
  }

  function drawConfetti(context, x, y, size, rotation, color, alpha) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.globalAlpha = alpha;
    context.fillStyle = color;
    context.fillRect(-size * 0.6, -size * 0.3, size * 1.2, size * 0.6);
    context.restore();
  }

  function renderCanvas() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Dibujar partículas ambientales
    for (let i = 0; i < ambientParticles.length; i++) {
      const p = ambientParticles[i];

      if (!prefersReducedMotion.matches) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.012) * 0.22;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 24) {
          p.y = -18;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 24) p.x = -18;
        if (p.x < -24) p.x = canvas.width + 18;
      }

      if (p.type === 'star') {
        drawFourPointStar(ctx, p.x, p.y, p.size, p.rotation, p.color, p.alpha);
      } else {
        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.alpha);
      }
    }

    // 2. Dibujar partículas de celebración (Pantalla 3)
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const b = burstParticles[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += b.gravity;
      b.rotation += b.rotationSpeed;
      b.alpha -= b.decay;

      if (b.alpha <= 0.02 || b.y > canvas.height + 30) {
        burstParticles.splice(i, 1);
        continue;
      }

      if (b.type === 'star') {
        drawFourPointStar(ctx, b.x, b.y, b.size, b.rotation, b.color, b.alpha);
      } else if (b.type === 'confetti') {
        drawConfetti(ctx, b.x, b.y, b.size, b.rotation, b.color, b.alpha);
      } else {
        drawPetal(ctx, b.x, b.y, b.size, b.rotation, b.color, b.alpha);
      }
    }

    if (!prefersReducedMotion.matches) {
      requestAnimationFrame(renderCanvas);
    }
  }

  if (canvas && ctx) {
    resizeCanvas();
    initAmbientParticles();
    renderCanvas();

    window.addEventListener('resize', () => {
      resizeCanvas();
      if (prefersReducedMotion.matches) {
        renderCanvas();
      }
    });
  }

  if (btnCelebrate) {
    btnCelebrate.addEventListener('click', () => {
      launchCelebrationBurst();
    });
  }

  /* --------------------------------------------------------------------------
     5. MÚSICA CONTROLADA POR LA USUARIA
     - Reproduce assets/audio/musica.mp3 al pulsar el botón de música.
     - Conserva la melodía ambiental Web Audio API como alternativa si el
       archivo de audio no se encuentra o no puede cargarse.
     -------------------------------------------------------------------------- */
  const btnMusic = document.getElementById('btn-music');
  const musicLabel = document.getElementById('music-label');
  const bgAudio = document.getElementById('bg-audio');

  let isMusicPlaying = false;
  let audioCtx = null;
  let melodyTimer = null;
  let noteStep = 0;

  // Escala dreamy en Mi mayor / Do# menor (alternativa de respaldo)
  const DREAMY_NOTES = [
    329.63, // E4
    392.00, // G4
    440.00, // A4
    493.88, // B4
    659.25, // E5
    587.33, // D5
    493.88, // B4
    440.00, // A4
    392.00, // G4
    493.88, // B4
    587.33, // D5
    659.25  // E5
  ];

  function hasCustomAudioSource() {
    if (!bgAudio) return false;
    const directSrc = bgAudio.getAttribute('src');
    if (directSrc && directSrc.trim() !== '') return true;
    const sourceEl = bgAudio.querySelector('source');
    return Boolean(sourceEl && sourceEl.getAttribute('src'));
  }

  function playSingleSynthNote(freq) {
    if (!audioCtx || !isMusicPlaying) return;

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.45);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 1.5);
  }

  function startDreamySynth() {
    stopDreamySynth();
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    playSingleSynthNote(DREAMY_NOTES[noteStep % DREAMY_NOTES.length]);
    noteStep++;

    melodyTimer = window.setInterval(() => {
      if (!isMusicPlaying) return;
      const freq = DREAMY_NOTES[noteStep % DREAMY_NOTES.length];
      playSingleSynthNote(freq);
      noteStep++;
    }, 680);
  }

  function stopDreamySynth() {
    if (melodyTimer) {
      clearInterval(melodyTimer);
      melodyTimer = null;
    }
  }

  function updateMusicButtonUI() {
    if (!btnMusic || !musicLabel) return;
    btnMusic.classList.toggle('is-playing', isMusicPlaying);
    btnMusic.setAttribute('aria-pressed', isMusicPlaying ? 'true' : 'false');
    musicLabel.textContent = isMusicPlaying ? 'Música: ON' : 'Música: OFF';
  }

  function toggleMusic() {
    isMusicPlaying = !isMusicPlaying;
    updateMusicButtonUI();

    if (isMusicPlaying) {
      if (hasCustomAudioSource() && typeof bgAudio.play === 'function') {
        try {
          const playPromise = bgAudio.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {
              startDreamySynth();
            });
          }
        } catch (_err) {
          startDreamySynth();
        }
      } else {
        startDreamySynth();
      }
    } else {
      if (bgAudio && typeof bgAudio.pause === 'function') {
        bgAudio.pause();
      }
      stopDreamySynth();
    }
  }

  if (btnMusic) {
    btnMusic.addEventListener('click', toggleMusic);
  }

  // Inicializar en la Pantalla 1 al cargar (sin reproducir audio automáticamente)
  goToScreen(1);
})();
