// GSAP LOAD
gsap.matchMedia().add("(min-width: 479px)", () => {
  $(".hero_main_wrap").each(function () {
    const wrapper = $(this);
    const bgVisual = wrapper.find(".hero_main_bg_visual");
    const firstLogoSvg = wrapper.find(".hero_main_logo_svg:first-of-type");
    const lastLogoSvg = wrapper.find(".hero_main_logo_svg:last-of-type");
    const logoPaths = wrapper.find(".hero_main_logo_path");
    const bgBlur = wrapper.find(".hero_main_bg_blur");
    const modalFill = wrapper.find(".g_modal_fill");
    const titleChars = wrapper.find(".hero_main_title, .char");
    const columnItems = wrapper.find(".hero_main_column-2 > *");
    const navWrap = $(".nav_wrap");
    const loadOverlay = $(".loading_overlay_wrap");

    gsap.from(bgVisual, {
      opacity: 0,
      delay: 0.5,
      duration: 2.5,
      ease: "power1.out",
    });

    gsap.set(firstLogoSvg, { y: "-50svh", yPercent: 65, xPercent: 42 });
    gsap.set(lastLogoSvg, { y: "-50svh", yPercent: 65, xPercent: -42 });
    gsap.set(modalFill, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" });

    const loadTl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power4.out",
        transformOrigin: "50% 50%",
      },
    });

    loadTl.from(wrapper.find(".hero_main_logo_path.is-first"), {
      yPercent: -102,
      scale: 1,
      stagger: { amount: 0.25, from: "start" },
    });
    loadTl.to(firstLogoSvg, { y: 0, yPercent: 0 });
    loadTl.to(lastLogoSvg, { y: 0, yPercent: 0 }, "<");
    loadTl.to(
      logoPaths,
      {
        yPercent: -102,
        stagger: { amount: 0.15, from: "start" },
        duration: 0.85,
      },
      "<"
    );
    loadTl.from(
      bgBlur,
      {
        maskImage: "linear-gradient(to top, black 100%, transparent 200%)",
      },
      "<"
    );
    loadTl.to(firstLogoSvg, { xPercent: 0 }, "<0.5");
    loadTl.to(lastLogoSvg, { xPercent: 0 }, "<");

    loadTl.from(
      modalFill,
      {
        clipPath: "polygon(49.999% 0, 50% 0, 50% 100%, 49.999% 100%)",
        opacity: 0,
      },
      "<"
    );

    loadTl.from(
      titleChars,
      {
        x: "0.6em",
        opacity: 0,
        stagger: { amount: 0.25, from: "start" },
        duration: 0.75,
      },
      "<"
    );
    loadTl.from(wrapper.find(".hero_main_title ~ *"), { x: "2rem", opacity: 0 }, "<");
    loadTl.from(columnItems, { x: "-2rem", opacity: 0 }, "<");
    loadTl.from(navWrap, { opacity: 0, onComplete: initializePageAnimations }, "<");
    loadTl.set(loadOverlay, { pointerEvents: "none" });

    function initializePageAnimations() {
      let scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero_main_contain",
          start: "top top",
          end: "bottom 10%",
          scrub: true,
          markers: false,
        },
      });

      scrollTl.to(".hero_main_logo_path.is-last", {
        yPercent: 302,
        stagger: { amount: 0.1, from: "center" },
      });
      scrollTl.to(
        ".hero_main_logo_svg",
        {
          yPercent: 200,
          opacity: 0,
          duration: 1,
        },
        "<"
      );
      scrollTl.to(".hero_main_layout", { yPercent: 60 }, "<");
      scrollTl.to(".hero_main_layout", { opacity: 0, duration: 0.2 }, "<");
      scrollTl.to(
        bgBlur,
        {
          maskImage: "linear-gradient(to top, black 100%, transparent 200%)",
        },
        "<"
      );
    }
  });
});

// if (sessionStorage.getItem("visited") === null) {
//   // Устанавливаем флаг "посещено" только при первом посещении
//   sessionStorage.setItem("visited", "true");

//   // GSAP LOAD
//   gsap.matchMedia().add("(min-width: 479px)", () => {
//     $(".hero_main_wrap").each(function () {
//       const wrapper = $(this);
//       const bgVisual = wrapper.find(".hero_main_bg_visual");
//       const firstLogoSvg = wrapper.find(".hero_main_logo_svg:first-of-type");
//       const lastLogoSvg = wrapper.find(".hero_main_logo_svg:last-of-type");
//       const logoPaths = wrapper.find(".hero_main_logo_path");
//       const bgBlur = wrapper.find(".hero_main_bg_blur");
//       const modalFill = wrapper.find(".g_modal_fill");
//       const titleChars = wrapper.find(".hero_main_title, .char");
//       const columnItems = wrapper.find(".hero_main_column-2 > *");
//       const navWrap = $(".nav_wrap");

//       gsap.from(bgVisual, {
//         opacity: 0,
//         delay: 0.5,
//         duration: 2.5,
//         ease: "power1.out",
//       });

//       gsap.set(firstLogoSvg, { y: "-50svh", yPercent: 65, xPercent: 42 });
//       gsap.set(lastLogoSvg, { y: "-50svh", yPercent: 65, xPercent: -42 });
//       gsap.set(modalFill, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" });

//       const loadTl = gsap.timeline({
//         defaults: {
//           duration: 1,
//           ease: "power4.out",
//           transformOrigin: "50% 50%",
//         },
//       });

//       loadTl.from(wrapper.find(".hero_main_logo_path.is-first"), {
//         yPercent: -102,
//         scale: 1,
//         stagger: { amount: 0.25, from: "start" },
//       });
//       loadTl.to(firstLogoSvg, { y: 0, yPercent: 0 });
//       loadTl.to(lastLogoSvg, { y: 0, yPercent: 0 }, "<");
//       loadTl.to(
//         logoPaths,
//         {
//           yPercent: -102,
//           stagger: { amount: 0.15, from: "start" },
//           duration: 0.85,
//         },
//         "<"
//       );
//       loadTl.from(
//         bgBlur,
//         {
//           maskImage: "linear-gradient(to top, black 100%, transparent 200%)",
//         },
//         "<"
//       );
//       loadTl.to(firstLogoSvg, { xPercent: 0 }, "<0.5");
//       loadTl.to(lastLogoSvg, { xPercent: 0 }, "<");

//       loadTl.from(
//         modalFill,
//         {
//           clipPath: "polygon(49.999% 0, 50% 0, 50% 100%, 49.999% 100%)",
//           opacity: 0,
//         },
//         "<"
//       );

//       loadTl.from(
//         titleChars,
//         {
//           x: "0.6em",
//           opacity: 0,
//           stagger: { amount: 0.25, from: "start" },
//           duration: 0.75,
//         },
//         "<"
//       );
//       loadTl.from(wrapper.find(".hero_main_title ~ *"), { x: "2rem", opacity: 0 }, "<");
//       loadTl.from(columnItems, { x: "-2rem", opacity: 0 }, "<");
//       loadTl.from(navWrap, { opacity: 0, onComplete: initializePageAnimations }, "<");

//       function initializePageAnimations() {
//         let scrollTl = gsap.timeline({
//           scrollTrigger: {
//             trigger: ".hero_main_contain",
//             start: "top top",
//             end: "bottom 10%",
//             scrub: true,
//             markers: false,
//           },
//         });

//         scrollTl.to(".hero_main_logo_path.is-last", {
//           yPercent: 302,
//           stagger: { amount: 0.1, from: "center" },
//         });
//         scrollTl.to(
//           ".hero_main_logo_svg",
//           {
//             yPercent: 200,
//             opacity: 0,
//             duration: 1,
//           },
//           "<"
//         );
//         scrollTl.to(".hero_main_layout", { yPercent: 60 }, "<");
//         scrollTl.to(".hero_main_layout", { opacity: 0, duration: 0.2 }, "<");
//         scrollTl.to(
//           bgBlur,
//           {
//             maskImage: "linear-gradient(to top, black 100%, transparent 200%)",
//           },
//           "<"
//         );
//       }
//     });
//   });
// }
