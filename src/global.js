// // alert("hello");
// TEXT ANIMATION

let typeSplit = new SplitType(".hero_main_title, .header_main_title,[text_split]", {
  types: "lines, words, chars",
  tagName: "span",
});

gsap.matchMedia().add("(min-width: 479px)", () => {
  $("[text_split]").each(function () {
    const element = $(this);
    const chars = element.find(".char");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "top 80%",
        toggleActions: "none play none reset",
      },
    });

    // Предварительное скрытие текста
    tl.set(chars, { visibility: "visible" });

    // Анимация
    tl.from(chars, {
      yPercent: 120,
      duration: 1.2,
      ease: "power4.out",
      stagger: { amount: 0.25 },
    });
  });
});

//UTILITY
const images = document.querySelectorAll(".parallax");
new Ukiyo(images);

let debounceTimeout;
$("[gsap_scrolltrigger_update]").on("click", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 600);
});

// GSAP MARQUEE
gsap.matchMedia().add("(min-width: 479px)", () => {
  $(".about_marquee_contain, .logo_contain").each(function () {
    const container = $(this);
    const marqueeWrap = container.find(".about_marquee_wrap, .logo_marquee_wrap");

    let marqueeTL = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: false,
      },
    });

    marqueeTL.to(marqueeWrap, {
      x: "-40vw",
      stagger: {
        amount: 0.15,
        from: "start",
      },
    });
  });
});

//GSAP PORTFOLIO CARD
gsap.matchMedia().add("(min-width: 479px)", () => {
  $(".portfolio_card_wrap").each(function () {
    const card = $(this);
    const visual = card.find(".portfolio_card_visual");
    const headerItems = card.find(".portfolio_card_header *");
    const column = card.find(".portfolio_card_item.u-column-1");

    let portfolioTL = gsap.timeline({
      paused: true,
      defaults: {
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.393,0 0.496,0.392 0.496,0.496 0.496,0.615 0.6,1 1,1 "
        ),
        duration: 0.6,
      },
    });

    // Скрытие второго элемента до анимации
    portfolioTL.set(visual.find("> :nth-child(2)"), { display: "block" });

    // Анимации
    portfolioTL.to(visual, { scale: 0.7, aspectRatio: "16 / 9" });
    portfolioTL.from(visual.find("> :nth-child(1)"), { autoAlpha: 1 }, "<");
    portfolioTL.from(visual.find("> :nth-child(2)"), { autoAlpha: 0 }, "<");
    portfolioTL.to(
      headerItems,
      {
        yPercent: -100,
        stagger: { amount: 0.1, from: "start" },
      },
      "<"
    );
    portfolioTL.to(column, { paddingLeft: "1rem" }, "<");

    // Обработчики событий
    card.on("mouseenter", () => portfolioTL.play());
    card.on("mouseleave", () => portfolioTL.reverse());
  });
});
