// VIDEO PLAYER

// class VideoWithBackground {
//   video;
//   canvas;
//   step;
//   ctx;

//   constructor(videoId, canvasId) {
//     const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

//     if (!mediaQuery.matches) {
//       this.video = document.getElementById(videoId);
//       this.canvas = document.getElementById(canvasId);

//       window.addEventListener("load", this.init, false);
//       window.addEventListener("unload", this.cleanup, false);
//     }
//   }

//   draw = () => {
//     this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
//   };

//   drawLoop = () => {
//     this.draw();
//     this.step = window.requestAnimationFrame(this.drawLoop);
//   };

//   drawPause = () => {
//     window.cancelAnimationFrame(this.step);
//     this.step = undefined;
//   };

//   init = () => {
//     this.ctx = this.canvas.getContext("2d");
//     this.ctx.filter = "blur(1px)";

//     this.video.addEventListener("loadeddata", this.draw, false);
//     this.video.addEventListener("seeked", this.draw, false);
//     this.video.addEventListener("play", this.drawLoop, false);
//     this.video.addEventListener("pause", this.drawPause, false);
//     this.video.addEventListener("ended", this.drawPause, false);
//   };

//   cleanup = () => {
//     this.video.removeEventListener("loadeddata", this.draw);
//     this.video.removeEventListener("seeked", this.draw);
//     this.video.removeEventListener("play", this.drawLoop);
//     this.video.removeEventListener("pause", this.drawPause);
//     this.video.removeEventListener("ended", this.drawPause);
//   };
// }

// // Инициализация
// const el = new VideoWithBackground("mainVideo", "js-canvas");

// document.addEventListener("DOMContentLoaded", function () {
//   const video = document.getElementById("mainVideo");
//   const marker = document.querySelector(".video-marker-simplified");
//   const timeline = document.querySelector(".video-timeline");
//   const cursor = document.querySelector(".cursor");
//   const cursorText = document.querySelector(".cursor p");
//   const timestamp = document.querySelector(".timestamp");
//   const overlay = document.querySelector(".overlay");

//   let isPlaying = false;

//   // Формат времени
//   function formatTime(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
//   }

//   // Обновление таймштампа
//   function updateTimestamp() {
//     if (video && timestamp) {
//       const remainingTime = video.duration - video.currentTime;
//       timestamp.textContent = formatTime(remainingTime);
//     }
//   }

//   // Инициализация видео
//   function initVideo() {
//     video.addEventListener("loadedmetadata", function () {
//       if (timestamp) timestamp.textContent = formatTime(video.duration);
//     });

//     video.addEventListener("timeupdate", function () {
//       if (video.duration) {
//         const percentage = (video.currentTime / video.duration) * 100;
//         if (marker) marker.style.left = `calc(${percentage}% - 1px)`;
//         updateTimestamp();
//       }
//     });

//     if (timeline) {
//       timeline.addEventListener("click", function (e) {
//         const rect = timeline.getBoundingClientRect();
//         const clickPosition = e.clientX - rect.left;
//         const percentage = clickPosition / rect.width;
//         video.currentTime = percentage * video.duration;
//         if (marker) marker.style.left = `calc(${percentage * 100}% - 1px)`;
//         updateTimestamp();
//       });
//     }

//     if (overlay) {
//       overlay.addEventListener("click", function () {
//         if (isPlaying) {
//           video.pause();
//           if (cursorText) cursorText.textContent = "Play";
//         } else {
//           video.play();
//           if (cursorText) cursorText.textContent = "Pause";
//         }
//         isPlaying = !isPlaying;
//       });
//     }
//   }

//   initVideo();

//   // Курсор
//   document.addEventListener("mousemove", function (e) {
//     if (cursor) cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
//   });
// });
// // VIDEO JS
// const bgVideo1 = document.getElementById("bgVideo1");
// const bgVideo2 = document.getElementById("bgVideo2");
// function syncVideos() {
//   if (Math.abs(bgVideo1.currentTime - bgVideo2.currentTime) > 0.1) {
//     bgVideo2.currentTime = bgVideo1.currentTime;
//   }
// }
// bgVideo1.addEventListener("play", () => {
//   bgVideo2.play();
//   bgVideo1.addEventListener("timeupdate", syncVideos);
// });
// bgVideo1.addEventListener("pause", () => {
//   bgVideo2.pause();
// });

// MODAL FLIP
const modalFill = document.querySelector(".g_modal_fill");
const modalPlace = document.querySelector(".g_modal_place");
const modalCinema = document.querySelector(".g_modal_cinema");
const visualElement = document.querySelector(".g_modal_visual");
const closeButton = document.querySelector(".g_modal_player_close_wrap");
const videoElement = document.getElementById("mainVideo");

const tl = gsap.timeline();
const flipDuration = 0.6;
gsap.set(".g_modal_player_wrap", { autoAlpha: 0 });

// Открытие модального окна
visualElement.addEventListener("click", () => {
  const state = Flip.getState(modalFill);
  modalPlace.appendChild(modalFill);

  tl.add(Flip.from(state, { duration: flipDuration, ease: "power3.out" }))
    .to(".g_modal_visual", { autoAlpha: 0, duration: flipDuration }, "<")
    .to(".g_modal_player_wrap", { autoAlpha: 1, duration: flipDuration }, "<")
    .to(".g_modal_place", { backgroundColor: "rgba(0, 0, 0, 1)", duration: flipDuration }, "<")
    .set(".g_modal_place", { pointerEvents: "auto" })
    .play();

  if (videoElement) {
    videoElement.currentTime = 0;
    videoElement.play();
  }
});

// Закрытие модального окна
closeButton.addEventListener("click", () => {
  const state = Flip.getState(modalFill);
  modalCinema.appendChild(modalFill);

  tl.add(Flip.from(state, { duration: flipDuration, ease: "power3.out" }))
    .to(".g_modal_visual", { autoAlpha: 1, duration: flipDuration }, "<")
    .to(".g_modal_player_wrap", { autoAlpha: 0, duration: flipDuration }, "<")
    .to(".g_modal_place", { backgroundColor: "rgba(0, 0, 0, 0)", duration: flipDuration }, "<")
    .set(".g_modal_place", { pointerEvents: "none" })
    .play();

  if (videoElement) videoElement.pause();
});

// MODAL CURSOR
let cursorItem = document.querySelector(".g_cursor_wrap");
let cursorParagraph = cursorItem.querySelector("p");
let targets = document.querySelectorAll("[data-cursor]");
let xOffset = 6;
let yOffset = 30;
let cursorIsOnRight = false;
let currentTarget = null;
let lastText = "";

// Определяем центр экрана
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// Устанавливаем начальное положение курсора в центре
gsap.set(cursorItem, {
  x: windowWidth / 2,
  y: windowHeight / 2,
  xPercent: xOffset,
  yPercent: yOffset,
});

// Используем GSAP quick.to для плавной анимации движения курсора
let xTo = gsap.quickTo(cursorItem, "x", { ease: "power3" });
let yTo = gsap.quickTo(cursorItem, "y", { ease: "power3" });

// На движение мыши обновляем позицию курсора
window.addEventListener("mousemove", (e) => {
  let cursorX = e.clientX;
  let cursorY = e.clientY;

  // Default offsets
  let xPercent = xOffset;
  let yPercent = yOffset;

  // Adjust X offset if in the rightmost 19% of the window
  if (cursorX > windowWidth * 0.81) {
    cursorIsOnRight = true;
    xPercent = -100;
  } else {
    cursorIsOnRight = false;
  }

  // Adjust Y offset if in the bottom 10% of the current viewport
  if (cursorY > windowHeight * 0.9) {
    yPercent = -120;
  }

  if (currentTarget) {
    let newText = currentTarget.getAttribute("data-cursor");
    if (currentTarget.hasAttribute("data-easteregg") && cursorIsOnRight) {
      newText = currentTarget.getAttribute("data-easteregg");
    }

    if (newText !== lastText) {
      // Update text only if it changes
      cursorParagraph.innerHTML = newText;
      lastText = newText;
    }
  }

  gsap.to(cursorItem, { xPercent: xPercent, yPercent: yPercent, duration: 0.9, ease: "power3" });
  xTo(cursorX);
  yTo(cursorY);
});

// Обработчики событий для элементов с атрибутами data-cursor
targets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    currentTarget = target;

    let newText = target.hasAttribute("data-easteregg")
      ? target.getAttribute("data-easteregg")
      : target.getAttribute("data-cursor");

    if (newText !== lastText) {
      cursorParagraph.innerHTML = newText;
      lastText = newText;
    }
  });
});
