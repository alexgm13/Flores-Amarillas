// ==========================================================================
// 1. INICIALIZACIÓN DE LA ANIMACIÓN
// ==========================================================================
const initAnimation = () => {
  document.body.classList.remove("container");
};

if (document.readyState === "complete") {
  initAnimation();
} else {
  window.addEventListener("load", initAnimation);
}

// ==========================================================================
// 2. CONTROL DEL AUDIO DE FONDO (MIRANDA - PERFECTA)
// ==========================================================================
const audio = document.getElementById("bg-audio");
const btnMusic = document.getElementById("btn-music");
const tapOverlay = document.getElementById("tap-overlay");
const START_TIME = 0; // Reproducción desde el inicio de la canción

if (audio) {
  audio.addEventListener("loadedmetadata", () => {
    if (audio.currentTime < START_TIME) {
      audio.currentTime = START_TIME;
    }
  });

  // Al finalizar la canción, reiniciar el bucle automáticamente
  audio.addEventListener("ended", () => {
    audio.currentTime = START_TIME;
    audio.play();
  });
}

function playSong() {
  if (!audio) return;
  if (audio.currentTime < START_TIME) {
    audio.currentTime = START_TIME;
  }
  audio.play().then(() => {
    if (btnMusic) {
      btnMusic.classList.add("playing");
      btnMusic.textContent = "🔊";
    }
    if (tapOverlay) {
      tapOverlay.classList.add("hidden");
    }
  }).catch(() => {
    // Si las políticas de seguridad del navegador impiden el autoplay sin interacción,
    // mostramos el aviso para que con un simple toque empiece de inmediato
    if (btnMusic) {
      btnMusic.classList.remove("playing");
      btnMusic.textContent = "🎵";
    }
    if (tapOverlay) {
      tapOverlay.classList.remove("hidden");
    }
  });
}

function pauseSong() {
  if (!audio) return;
  audio.pause();
  if (btnMusic) {
    btnMusic.classList.remove("playing");
    btnMusic.textContent = "🎵";
  }
}

// Intentar reproducir inmediatamente al cargar
playSong();
window.addEventListener("DOMContentLoaded", playSong);
window.addEventListener("load", playSong);

// Botón flotante para pausar / reanudar
if (btnMusic) {
  btnMusic.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!audio) return;
    if (audio.paused) {
      playSong();
    } else {
      pauseSong();
    }
  });
}

// ==========================================================================
// 3. GALERÍA DE FOTOS (RECURSOS/FOTOS - 10 FOTOS VERIFICADAS)
// ==========================================================================
const photos = [
  "Recursos/Fotos/WhatsApp Image 2026-09-21 at 11.44.53 AM (1).jpeg",
  "Recursos/Fotos/WhatsApp Image 2026-09-21 at 11.44.53 AM (2).jpeg",
  "Recursos/Fotos/WhatsApp Image 2026-09-21 at 11.44.53 AM (3).jpeg",
  "Recursos/Fotos/WhatsApp Image 2026-09-21 at 11.44.53 AM (4).jpeg",
  "Recursos/Fotos/WhatsApp Image 2026-09-21 at 11.44.53 AM (5).jpeg",
  "Recursos/Fotos/WhatsApp Image 2026-09-21 at 11.44.53 AM (6).jpeg",
  "Recursos/Fotos/WhatsApp Image 2026-09-21 at 11.44.53 AM.jpeg",
  "Recursos/Fotos/WhatsApp Image 2026-09-21 at 11.44.54 AM (1).jpeg",
  "Recursos/Fotos/WhatsApp Image 2026-09-21 at 11.44.54 AM (2).jpeg",
  "Recursos/Fotos/WhatsApp Image 2026-09-21 at 11.44.54 AM.jpeg"
];

// Barajar fotos para que cada sesión sea única
let availablePhotoIndices = [];
function getNextPhotoUrl() {
  if (availablePhotoIndices.length === 0) {
    availablePhotoIndices = Array.from({ length: photos.length }, (_, i) => i);
    // Mezclar aleatoriamente
    for (let i = availablePhotoIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availablePhotoIndices[i], availablePhotoIndices[j]] = [availablePhotoIndices[j], availablePhotoIndices[i]];
    }
  }
  const nextIdx = availablePhotoIndices.pop();
  return {
    url: photos[nextIdx],
    number: nextIdx + 1
  };
}

// Elementos del modal de foto
const photoModal = document.getElementById("photo-modal");
const photoImg = document.getElementById("photo-img");
const photoCaption = document.getElementById("photo-caption");
const photoCloseBtn = document.getElementById("photo-close-btn");
const photoBackdrop = document.getElementById("photo-backdrop");
const photoCard = document.getElementById("photo-card");

const captions = [
  "Un recuerdo inolvidable 💛",
  "Flores amarillas para iluminar tu sonrisa 🌻",
  "Momentos que se quedan para siempre ✨",
  "Porque te mereces todas las flores del mundo 💛",
  "Gracias por estar en mi vida 🌻",
  "21 de Septiembre: nuestro día especial ✨",
  "Que tu vida siempre florezca así de hermosa 💛"
];

function openPhotoModal() {
  const photo = getNextPhotoUrl();
  photoImg.src = photo.url;
  const randomCaption = captions[Math.floor(Math.random() * captions.length)];
  photoCaption.textContent = randomCaption;
  photoModal.classList.add("active");
}

function closePhotoModal() {
  photoModal.classList.remove("active");
}

if (photoCloseBtn) {
  photoCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closePhotoModal();
  });
}

if (photoBackdrop) {
  photoBackdrop.addEventListener("click", (e) => {
    e.stopPropagation();
    closePhotoModal();
  });
}

// Elementos del modal de letra "Nuestra canción"
const btnLyrics = document.getElementById("btn-lyrics");
const lyricsModal = document.getElementById("lyrics-modal");
const lyricsCloseBtn = document.getElementById("lyrics-close-btn");
const lyricsBackdrop = document.getElementById("lyrics-backdrop");

function openLyricsModal() {
  if (lyricsModal) {
    lyricsModal.classList.add("active");
  }
}

function closeLyricsModal() {
  if (lyricsModal) {
    lyricsModal.classList.remove("active");
  }
}

if (btnLyrics) {
  btnLyrics.addEventListener("click", (e) => {
    e.stopPropagation();
    openLyricsModal();
  });
}

if (lyricsCloseBtn) {
  lyricsCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLyricsModal();
  });
}

if (lyricsBackdrop) {
  lyricsBackdrop.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLyricsModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (lyricsModal && lyricsModal.classList.contains("active")) {
      closeLyricsModal();
    }
    if (photoModal && photoModal.classList.contains("active")) {
      closePhotoModal();
    }
  }
});

// ==========================================================================
// 4. GENERACIÓN DE ESTRELLA AMARILLA AL HACER CLIC
// ==========================================================================
function spawnYellowStar(x, y) {
  const container = document.createElement("div");
  container.className = "star-burst-container";
  container.style.left = `${x}px`;
  container.style.top = `${y}px`;

  container.innerHTML = `
    <svg class="main-star" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#fce700"/>
    </svg>
    <span class="star-sparkle s1">✨</span>
    <span class="star-sparkle s2">✨</span>
    <span class="star-sparkle s3">⭐</span>
    <span class="star-sparkle s4">✨</span>
  `;

  document.body.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 950);
}

// ==========================================================================
// 5. EVENTO DE CLIC GLOBAL (ESTRELLA + APERTURA DE FOTO)
// ==========================================================================
document.addEventListener("click", (e) => {
  // Evitar disparar si se hace clic en el botón de música o en el botón de letra
  if (e.target.closest("#btn-music") || e.target.closest("#btn-lyrics")) {
    return;
  }

  // Si el modal de letra está abierto:
  if (lyricsModal && lyricsModal.classList.contains("active")) {
    if (e.target.closest("#lyrics-card")) {
      return;
    }
    closeLyricsModal();
    spawnYellowStar(e.clientX, e.clientY);
    return;
  }

  // Si el modal de foto está abierto:
  if (photoModal && photoModal.classList.contains("active")) {
    if (e.target.closest("#photo-card")) {
      return;
    }
    closePhotoModal();
    spawnYellowStar(e.clientX, e.clientY);
    return;
  }

  // Asegurar que la música empiece inmediatamente si aún no sonaba
  if (audio && audio.paused) {
    playSong();
  }

  // 1. Generar la estrella amarilla en la posición del clic
  spawnYellowStar(e.clientX, e.clientY);

  // 2. Abrir el cuadro al centro mostrando una foto tras un breve instante mágico (320ms)
  setTimeout(() => {
    openPhotoModal();
  }, 320);
});
