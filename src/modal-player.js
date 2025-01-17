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
