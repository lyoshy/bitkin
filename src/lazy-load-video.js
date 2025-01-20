// Загрузка видео при попадании в зону видимости
new LazyLoad({
  elements_selector: "[data-lazy-visible]", // Загружаем видео с атрибутом data-lazy-visible
  threshold: 0,
});

// Загрузка видео по ховеру
document.querySelectorAll("[data-lazy-hover]").forEach((hoverElement) => {
  hoverElement.addEventListener("mouseenter", () => {
    const videoElement = hoverElement.querySelector("video");

    if (videoElement && !videoElement.classList.contains("loaded")) {
      new LazyLoad({
        elements_selector: "[data-lazy-hover]:hover video", // Загружаем видео внутри элемента с ховером
        callback_loaded: (el) => {
          el.classList.add("loaded"); // Добавляем класс после загрузки
          el.play(); // Автовоспроизведение после загрузки
        },
      });
    } else if (videoElement) {
      videoElement.play(); // Воспроизводим, если уже загружено
    }
  });

  hoverElement.addEventListener("mouseleave", () => {
    const videoElement = hoverElement.querySelector("video");
    if (videoElement) {
      videoElement.pause(); // Ставим на паузу при уходе курсора
    }
  });
});

// Загрузка видео по клику
document.querySelectorAll("[data-lazy-click]").forEach((clickElement) => {
  clickElement.addEventListener("click", () => {
    const videoElement = clickElement.querySelector("video");

    if (videoElement && !videoElement.classList.contains("loaded")) {
      new LazyLoad({
        elements_selector: "[data-lazy-click] video", // Загружаем видео внутри кликаемого элемента
        callback_loaded: (el) => {
          el.classList.add("loaded"); // Добавляем класс после загрузки
          el.play(); // Автовоспроизведение после загрузки
        },
      });
    } else if (videoElement) {
      videoElement.play(); // Воспроизводим, если уже загружено
    }
  });
});

// Загрузка видео по клику на "триггер"
document.querySelectorAll("[data-trigger]").forEach((triggerElement) => {
  triggerElement.addEventListener("click", () => {
    const targetSelector = triggerElement.getAttribute("data-trigger");
    const targetElement = document.querySelector(`[data-target="${targetSelector}"]`);

    if (targetElement) {
      const videoElement = targetElement.querySelector("video");

      if (videoElement && !videoElement.classList.contains("loaded")) {
        new LazyLoad({
          elements_selector: `[data-target="${targetSelector}"] video`, // Загружаем видео внутри цели
          callback_loaded: (el) => {
            el.classList.add("loaded"); // Добавляем класс после загрузки
            el.play(); // Автовоспроизведение после загрузки
          },
        });
      } else if (videoElement) {
        videoElement.play(); // Если уже загружено, просто воспроизводим
      }
    } else {
      console.error(`Цель с атрибутом data-target="${targetSelector}" не найдена.`);
    }
  });
});
