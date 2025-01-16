// function resetWebflow(data) {
//   let dom = $(new DOMParser().parseFromString(data.next.html, "text/html")).find("html");
//   // reset webflow interactions
//   $("html").attr("data-wf-page", dom.attr("data-wf-page"));
//   window.Webflow && window.Webflow.destroy();
//   window.Webflow && window.Webflow.ready();
//   window.Webflow && window.Webflow.require("ix2").init();
//   // reset w--current class
//   $(".w--current").removeClass("w--current");
//   $("a").each(function () {
//     if ($(this).attr("href") === window.location.pathname) {
//       $(this).addClass("w--current");
//     }
//   });
//   // reset scripts
//   dom.find("[data-barba-script]").each(function () {
//     let codeString = $(this).text();
//     if (codeString.includes("DOMContentLoaded")) {
//       let newCodeString = codeString.replace(
//         /window\.addEventListener\("DOMContentLoaded",\s*\(\s*event\s*\)\s*=>\s*{\s*/,
//         ""
//       );
//       codeString = newCodeString.replace(/\s*}\s*\);\s*$/, "");
//     }
//     let script = document.createElement("script");
//     script.type = "text/javascript";
//     if ($(this).attr("src")) script.src = $(this).attr("src");
//     script.text = codeString;
//     document.body.appendChild(script).remove();
//   });
// }

// barba.hooks.enter((data) => {
//   gsap.set(data.next.container, { position: "fixed", top: 0, left: 0, width: "100%" });
// });
// barba.hooks.after((data) => {
//   gsap.set(data.next.container, { position: "relative" });
//   $(window).scrollTop(0);
//   resetWebflow(data);
// });

// barba.init({
//   preventRunning: true,
//   transitions: [
//     {
//       sync: true,
//       enter(data) {
//         let tl = gsap.timeline({
//           defaults: {
//             duration: 1,
//             ease: CustomEase.create(
//               "custom",
//               "M0,0 C0.21,0.403 0.174,0.674 0.3,0.8 0.432,0.932 0.504,1 1,1 "
//             ),
//           },
//         });

//         tl.to(data.current.container, { autoAlpha: 0.4, y: "-20vh" });
//         tl.to(
//           ".hero_title",
//           {
//             autoAlpha: 0.4,
//             y: "6rem",
//             duration: 1,
//             ease: "power4.out",
//             stagger: { amount: 0.25 },
//           },
//           "<"
//         );
//         tl.from(data.next.container, { y: "100vh" }, "<");
//         return tl;
//       },
//     },
//   ],
// });

function resetWebflow(data) {
  let dom = $(new DOMParser().parseFromString(data.next.html, "text/html")).find("html");
  // Сброс взаимодействий Webflow
  $("html").attr("data-wf-page", dom.attr("data-wf-page"));
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require("ix2").init();

  // Сброс класса w--current
  $(".w--current").removeClass("w--current");
  $("a").each(function () {
    if ($(this).attr("href") === window.location.pathname) {
      $(this).addClass("w--current");
    }
  });

  // Обработка стандартных скриптов data-barba-script
  dom.find("[data-barba-script]").each(function () {
    let codeString = $(this).text();

    // Удаление обертки DOMContentLoaded, если есть
    if (codeString.includes("DOMContentLoaded")) {
      let newCodeString = codeString.replace(
        /window\.addEventListener\("DOMContentLoaded",\s*\(\s*event\s*\)\s*=>\s*{\s*/,
        ""
      );
      codeString = newCodeString.replace(/\s*}\s*\);\s*$/, "");
    }

    let script = document.createElement("script");
    script.type = "text/javascript";
    if ($(this).attr("src")) script.src = $(this).attr("src");
    script.text = codeString;
    document.body.appendChild(script).remove();
  });
}

// Немедленное выполнение скриптов с атрибутом data-barba-script-immediate
function executeImmediateScripts(data) {
  let dom = $(new DOMParser().parseFromString(data.next.html, "text/html")).find("html");

  dom.find("[data-barba-script-immediate]").each(function () {
    let codeString = $(this).text();

    // Удаление обертки DOMContentLoaded, если есть
    if (codeString.includes("DOMContentLoaded")) {
      let newCodeString = codeString.replace(
        /window\.addEventListener\("DOMContentLoaded",\s*\(\s*event\s*\)\s*=>\s*{\s*/,
        ""
      );
      codeString = newCodeString.replace(/\s*}\s*\);\s*$/, "");
    }

    let script = document.createElement("script");
    script.type = "text/javascript";
    if ($(this).attr("src")) script.src = $(this).attr("src");
    script.text = codeString;
    document.body.appendChild(script);
  });
}

// Барба хуки
barba.hooks.beforeEnter((data) => {
  // Немедленно выполняем скрипты с атрибутом data-barba-script-immediate
  executeImmediateScripts(data);
});

barba.hooks.enter((data) => {
  gsap.set(data.next.container, { position: "fixed", top: 0, left: 0, width: "100%" });
});

barba.hooks.after((data) => {
  gsap.set(data.next.container, { position: "relative" });
  $(window).scrollTop(0);
  resetWebflow(data);
});

// Барба init
barba.init({
  preventRunning: true,
  transitions: [
    {
      sync: true,
      enter(data) {
        let tl = gsap.timeline({
          defaults: {
            duration: 1,
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.21,0.403 0.174,0.674 0.3,0.8 0.432,0.932 0.504,1 1,1 "
            ),
          },
        });

        // Анимация текущего (уходящего) контейнера
        tl.to(data.current.container, { autoAlpha: 0.4, y: "-20vh" });

        tl.from(
          $(data.next.container).find(".hero_title"),
          {
            y: "-30vh",
            duration: 1,
            ease: "power4.out",
            stagger: { amount: 0.25 },
          },
          "<"
        );

        // Анимация самого нового контейнера
        tl.from(data.next.container, { y: "100vh" }, "<");

        return tl;
      },
    },
  ],
});

// tl.from(chars, {
//   yPercent: 120,
//   duration: 1.2,
//   ease: "power4.out",
//   stagger: { amount: 0.25 },
// });
