// // GSAP LOAD
// gsap.matchMedia().add("(min-width: 479px)", () => {
//   $(".hero_text").each(function () {
//     const element = $(this);
//     const chars = element.find(".char");

//     let tl = gsap.timeline();
//     tl.set(chars, { visibility: "visible" });
//     tl.from(chars, {
//       yPercent: 120,
//       duration: 1.2,
//       ease: "power4.out",
//       stagger: { amount: 0.25 },
//     });
//   });
// });
