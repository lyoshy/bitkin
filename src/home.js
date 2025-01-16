// HOME

// // GSAP LOAD
// gsap.matchMedia().add("(min-width: 479px)", () => {
//   $(".hero_main_wrap").each(function () {
//     const wrapper = $(this);
//     const bgVisual = wrapper.find(".hero_main_bg_visual");
//     const firstLogoSvg = wrapper.find(".hero_main_logo_svg:first-of-type");
//     const lastLogoSvg = wrapper.find(".hero_main_logo_svg:last-of-type");
//     const logoPaths = wrapper.find(".hero_main_logo_path");
//     const bgBlur = wrapper.find(".hero_main_bg_blur");
//     const modalFill = wrapper.find(".g_modal_fill");
//     const titleChars = wrapper.find(".hero_main_title, .char");
//     const columnItems = wrapper.find(".hero_main_column-2 > *");
//     const navWrap = $(".nav_wrap");

//     gsap.from(bgVisual, {
//       opacity: 0,
//       delay: 0.5,
//       duration: 2.5,
//       ease: "power1.out",
//     });

//     gsap.set(firstLogoSvg, { y: "-50svh", yPercent: 65, xPercent: 42 });
//     gsap.set(lastLogoSvg, { y: "-50svh", yPercent: 65, xPercent: -42 });
//     gsap.set(modalFill, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" });

//     const loadTl = gsap.timeline({
//       defaults: {
//         duration: 1,
//         ease: "power4.out",
//         transformOrigin: "50% 50%",
//       },
//     });

//     loadTl.from(wrapper.find(".hero_main_logo_path.is-first"), {
//       yPercent: -102,
//       scale: 1,
//       stagger: { amount: 0.25, from: "start" },
//     });
//     loadTl.to(firstLogoSvg, { y: 0, yPercent: 0 });
//     loadTl.to(lastLogoSvg, { y: 0, yPercent: 0 }, "<");
//     loadTl.to(
//       logoPaths,
//       {
//         yPercent: -102,
//         stagger: { amount: 0.15, from: "start" },
//         duration: 0.85,
//       },
//       "<"
//     );
//     loadTl.from(
//       bgBlur,
//       {
//         maskImage: "linear-gradient(to top, black 100%, transparent 200%)",
//       },
//       "<"
//     );
//     loadTl.to(firstLogoSvg, { xPercent: 0 }, "<0.5");
//     loadTl.to(lastLogoSvg, { xPercent: 0 }, "<");

//     loadTl.from(
//       modalFill,
//       {
//         clipPath: "polygon(49.999% 0, 50% 0, 50% 100%, 49.999% 100%)",
//         opacity: 0,
//       },
//       "<"
//     );

//     loadTl.from(
//       titleChars,
//       {
//         x: "0.6em",
//         opacity: 0,
//         stagger: { amount: 0.25, from: "start" },
//         duration: 0.75,
//       },
//       "<"
//     );
//     loadTl.from(wrapper.find(".hero_main_title ~ *"), { x: "2rem", opacity: 0 }, "<");
//     loadTl.from(columnItems, { x: "-2rem", opacity: 0 }, "<");
//     loadTl.from(navWrap, { opacity: 0, onComplete: initializePageAnimations }, "<");

//     function initializePageAnimations() {
//       let scrollTl = gsap.timeline({
//         scrollTrigger: {
//           trigger: ".hero_main_contain",
//           start: "top top",
//           end: "bottom 10%",
//           scrub: true,
//           markers: false,
//         },
//       });

//       scrollTl.to(".hero_main_logo_path.is-last", {
//         yPercent: 302,
//         stagger: { amount: 0.1, from: "center" },
//       });
//       scrollTl.to(
//         ".hero_main_logo_svg",
//         {
//           yPercent: 200,
//           opacity: 0,
//           duration: 1,
//         },
//         "<"
//       );
//       scrollTl.to(".hero_main_layout", { yPercent: 60 }, "<");
//       scrollTl.to(".hero_main_layout", { opacity: 0, duration: 0.2 }, "<");
//       scrollTl.to(
//         bgBlur,
//         {
//           maskImage: "linear-gradient(to top, black 100%, transparent 200%)",
//         },
//         "<"
//       );
//     }
//   });
// });

// GSAP FLIP
function attr(defaultVal, attrVal) {
  const defaultValType = typeof defaultVal;
  if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
  if (attrVal === "true" && defaultValType === "boolean") return true;
  if (attrVal === "false" && defaultValType === "boolean") return false;
  if (isNaN(attrVal) && defaultValType === "string") return attrVal;
  if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
  return defaultVal;
}

const mm = gsap.matchMedia();

mm.add("(min-width: 479px)", () => {
  gsap.set(".hero_main_show_contain", { marginTop: "-25%" });

  $("[tr-scrollflip-element='component']").each(function (index) {
    const componentEl = $(this);
    const originEl = componentEl.find("[tr-scrollflip-element='origin']");
    const targetEl = componentEl.find("[tr-scrollflip-element='target']");
    const scrubStartEl = componentEl.find("[tr-scrollflip-scrubstart]");
    const scrubEndEl = componentEl.find("[tr-scrollflip-scrubend]");

    if (!originEl.length || !targetEl.length) return; // Skip if elements are missing

    const startSetting = attr("top top", scrubStartEl.attr("tr-scrollflip-scrubstart"));
    const endSetting = attr("bottom bottom", scrubEndEl.attr("tr-scrollflip-scrubend"));
    const staggerSpeedSetting = attr(0, componentEl.attr("tr-scrollflip-staggerspeed"));
    const staggerDirectionSetting = attr(
      "start",
      componentEl.attr("tr-scrollflip-staggerdirection")
    );
    const scaleSetting = attr(false, componentEl.attr("tr-scrollflip-scale"));
    const breakpointSetting = attr(479, componentEl.attr("tr-scrollflip-breakpoint"));

    const componentIndex = index;
    let timeline;

    // Assign matching data-flip-ids
    originEl.each(function (idx) {
      const flipId = `${componentIndex}-${idx}`;
      $(this).attr("data-flip-id", flipId);
      targetEl.eq(idx).attr("data-flip-id", flipId);
    });

    // Create the Flip timeline
    function createTimeline() {
      if (timeline) {
        timeline.kill();
        gsap.set(targetEl, { clearProps: "all" });
      }

      const state = Flip.getState(originEl);
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrubStartEl.length ? scrubStartEl : componentEl,
          endTrigger: scrubEndEl.length ? scrubEndEl : componentEl,
          start: startSetting,
          end: endSetting,
          scrub: true,
        },
      });

      timeline.add(
        Flip.from(state, {
          targets: targetEl,
          scale: scaleSetting,
          stagger: {
            amount: staggerSpeedSetting,
            from: staggerDirectionSetting,
          },
        })
      );
    }

    createTimeline();

    // Update timeline on window resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        createTimeline();
      }, 250);
    });
  });
});

mm.add("(max-width: 478px)", () => {
  gsap.set(".hero_main_show_contain", { marginTop: "0" });
  console.log("Flip animations and styles adjusted for small screens.");
});

// GSAP HEADER MAIN
gsap.matchMedia().add("(min-width: 479px)", () => {
  $(".header_main_wrap").each(function () {
    const wrapper = $(this);
    const title = wrapper.find(".header_main_title");
    const children = title.children();

    let headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: title,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: false,
      },
    });

    headerTl.from(children.eq(0), { xPercent: -40 });
    headerTl.from(children.eq(1), { xPercent: -30 }, "<");
    headerTl.from(children.eq(2), { xPercent: -20 }, "<");
    headerTl.from(title, { y: "-70vh" }, "<");
  });
});

// GSAP PROCESS
const processItems = document.querySelectorAll(".process_item_wrap");
if (processItems.length > 0) {
  const updateTop = (item) => {
    const sectionHeight = item.offsetHeight; // Текущая высота секции
    const viewportHeight = window.innerHeight; // Высота окна
    item.style.top = `-${sectionHeight - viewportHeight}px`;
  };
  processItems.forEach((item) => {
    const resizeObserver = new ResizeObserver(() => updateTop(item));
    resizeObserver.observe(item);
  });
  window.addEventListener("DOMContentLoaded", () => {
    processItems.forEach(updateTop);
  });
}

gsap.matchMedia().add("(min-width: 479px)", () => {
  $(".process_item_wrap").each(function () {
    const wrapper = $(this);
    const bgElement = wrapper.find(".process_item_bg");
    const columns = wrapper.find(".process_item_column-1 ~ *");

    let scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: false,
      },
    });

    scrollTl.to(bgElement, { opacity: 0.15, ease: "none" });
    scrollTl.to(columns, { y: "-3rem", duration: 1, ease: "none" }, "<");
    scrollTl.to(columns, { autoAlpha: 0, duration: 0.5, ease: "power3.out" }, "<0.5");
  });
});
