// // VIDEO PLAYER

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
