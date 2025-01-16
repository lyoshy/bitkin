gsap.matchMedia().add("(min-width: 479px)", () => {
  // Инициализация переменных
  const toggleWrap = document.querySelector(".hero_project_toggle_wrap");
  const toggleFirst = document.querySelector(".hero_project_toggle_first");
  const toggleLast = document.querySelector(".hero_project_toggle_last");
  const toggleBg = document.querySelector(".hero_project_toggle_bg");

  const tabFirst = document.querySelector(".hero_project_tab_first");
  const tabLast = document.querySelector(".hero_project_tab_last");

  const visualProjectsItem = document.querySelectorAll(".visual_projects_cms_item");
  const visualProjectsWrap = document.querySelector(".visual_projects_wrap");

  // Проверка существования ключевых элементов
  if (
    toggleWrap &&
    toggleFirst &&
    toggleLast &&
    toggleBg &&
    tabFirst &&
    tabLast &&
    visualProjectsWrap
  ) {
    // Устанавливаем начальные стили
    gsap.set(tabLast, { autoAlpha: 0, scale: 0.9 });
    gsap.set(toggleWrap, { clipPath: "inset(0% 50% round 100vw)" });

    // Флаг состояния
    let isInFirst = true;

    // Функция переключения табов
    const toggleTabs = (toLast) => {
      const state = Flip.getState(toggleBg);

      if (toLast) {
        toggleLast.appendChild(toggleBg);
        gsap.to(tabFirst, { autoAlpha: 0, scale: 0.9, duration: 0.6, ease: "power3.out" });
        gsap.to(tabLast, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power3.out" });
        gsap.to(visualProjectsItem, {
          autoAlpha: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "power3.out",
        });
        gsap.to(visualProjectsWrap, {
          height: "0px",
          display: "none",
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        toggleFirst.appendChild(toggleBg);
        gsap.to(tabLast, { autoAlpha: 0, scale: 0.9, duration: 0.6, ease: "power3.out" });
        gsap.to(tabFirst, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power3.out" });
        gsap.to(visualProjectsItem, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
        gsap.to(visualProjectsWrap, {
          height: "auto",
          display: "block",
          duration: 0.6,
          ease: "power3.out",
        });
      }

      isInFirst = !isInFirst;

      // Воспроизводим анимацию Flip
      Flip.from(state, {
        duration: 0.6,
        ease: "power3.out",
        absolute: true,
      });
    };

    // Обработчик клика
    toggleWrap.addEventListener("click", () => toggleTabs(isInFirst));
  }

  // Анимация прокрутки
  $(".page_wrap").each(function () {
    const pageWrap = $(this);
    const toggleElement = pageWrap.find(".hero_project_toggle_wrap");

    // Проверка существования элемента
    if (!toggleElement.length) return;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: pageWrap,
        start: "top 50%",
        endTrigger: ".portfolio_main_wrap",
        end: "top bottom",
        toggleActions: "play reverse play reverse",
        markers: false,
      },
    });

    scrollTl.to(toggleElement, {
      clipPath: "inset(0% 0% round 100vw)",
      duration: 0.6,
      ease: "power3.inOut",
    });
  });
});
