function getCountdown() {
  var countDownDate = new Date("September 29, 2023 00:00:00").getTime();

  var now = new Date().getTime();

  var distance = countDownDate - now;

  if (distance < 0) {
    document.getElementById("time").innerHTML = "<h2>Closed</h2>";
    return;
  }

  var weeks = Math.floor(distance / (1000 * 60 * 60 * 24) / 7);
  var days = Math.floor(distance / (1000 * 60 * 60 * 24) - weeks * 7);
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.querySelector(".weeks").innerHTML = weeks;
  document.querySelector(".days").innerHTML = days;
  document.querySelector(".hours").innerHTML = hours;
  document.querySelector(".minutes").innerHTML = minutes;

  if (weeks == 1) {
    document.querySelector(".weeks__label").innerHTML = "week";
  } else {
    document.querySelector(".weeks__label").innerHTML = "weeks";
  }

  if (days == 1) {
    document.querySelector(".days__label").innerHTML = "day";
  } else {
    document.querySelector(".days__label").innerHTML = "days";
  }

  if (hours == 1) {
    document.querySelector(".hours__label").innerHTML = "hour";
  } else {
    document.querySelector(".hours__label").innerHTML = "hours";
  }

  if (minutes == 1) {
    document.querySelector(".minutes__label").innerHTML = "minute";
  } else {
    document.querySelector(".minutes__label").innerHTML = "minutes";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".countdown")) {
    getCountdown();
    setInterval(function () {
      getCountdown();
    }, 1000);
  }

  //NAV
  ScrollTrigger.create({
    trigger: document.body,
    start: "5px top",
    end: "101% bottom",
    toggleClass: { targets: ".main-nav", className: "scrolled" },
  });
  //SWIPER

  if (document.querySelector(".swiper")) {
    const swiper = new Swiper(".swiper", {
      slidesPerView: "auto",
      loop: true,
      // centeredSlides: window.innerWidth > 768 ? false : true,
      centeredSlides: true,
    });

    var totalSlides = swiper.slides.length - swiper.loopedSlides * 2;

    var prev = document.querySelector(".arrow.prev");
    var next = document.querySelector(".arrow.next");

    prev.addEventListener("click", function () {
      swiper.slidePrev();
    });

    next.addEventListener("click", function () {
      swiper.slideNext();
    });

    if (window.innerWidth > 786) {
      document.querySelector(".bar").style.height =
        (1 / totalSlides) * 100 + "%";
    } else {
      document.querySelector(".bar").style.width =
        (1 / totalSlides) * 100 + "%";
    }

    swiper.on("slideChange", function () {
      var currentSlide = swiper.realIndex + 1;
      var progress = currentSlide / totalSlides;

      if (window.innerWidth > 768) {
        document.querySelector(".bar").style.height = progress * 100 + "%";
      } else {
        document.querySelector(".bar").style.width = progress * 100 + "%";
      }
    });
  }

  // PRICING

  document.querySelectorAll(".btn-cell .btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      btn.closest(".btn-cell").nextElementSibling.classList.toggle("active");
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 450);
    });
  });

  // MODAL

  document.querySelectorAll(".open-modal").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.add("init__modal");
    });
  });

  document.querySelector("#modal").addEventListener("click", function (e) {
    if (e.target.id == "modal") {
      document.body.classList.remove("init__modal");
    }
  });

  document
    .querySelector("#modal .close")
    .addEventListener("click", function () {
      document.body.classList.remove("init__modal");
    });

  //FAQ

  if (document.body.classList.contains("faq")) {
    document.querySelectorAll(".q-group .inner").forEach((toggle) => {
      toggle.addEventListener("click", function () {
        toggle.classList.toggle("active");

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 450);
      });
    });

    document.querySelectorAll(".q-group").forEach((group, i) => {
      var target = document.querySelectorAll(".cat a")[i];
      ScrollTrigger.create({
        trigger: group,
        start: "top 30%",
        end: "bottom 30%",
        toggleClass: { targets: target, className: "active" },
      });
    });
  }

  document.querySelector(".nav-toggle").addEventListener("click", function () {
    document.body.classList.toggle("init__nav");
  });
});

window.addEventListener("load", function () {
  // PIN

  if (document.querySelector("#amenities-pin")) {
    var pin = document.querySelector("#amenities-pin"),
      pinImages = gsap.utils.toArray("#amenities-pin img");

    ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        self.trigger.querySelector(".bar").style.height =
          self.progress * 100 + "%";
      },
    });

    pinImages.forEach((img, i) => {
      var target = document.querySelectorAll(".pinned .row__inner")[i];
      ScrollTrigger.create({
        trigger: img,
        start: "top 50%",
        end: "bottom 50%",
        toggleClass: { targets: target, className: "active" },
      });
    });
  }

  //EFFECTS
  gsap.from("#banner .btn", { opacity: 0, delay: 0.6 });

  const headlineTriggers = gsap.utils.toArray(".st__headline");

  headlineTriggers.forEach((headline) => {
    var splitInner = new SplitText(headline, {
      type: "lines",
      linesClass: "line__inner",
    });
    var splitOuter = new SplitText(headline, {
      type: "lines",
      linesClass: "line__outer no-overflow",
    });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: headline,
        start: "top 95%",
      },
    });
    tl.from(splitInner.lines, {
      duration: 1,
      yPercent: 100,
      ease: "power4.inOut",
      stagger: 0.05,
    });
  });

  const textTriggers = gsap.utils.toArray(".st__text");

  textTriggers.forEach((text) => {
    gsap.from(text, {
      duration: 1,
      opacity: 0,
      ease: "power4.inOut",

      scrollTrigger: {
        trigger: text,
        start: "top 85%",
      },
    });
  });

  document.body.classList.remove("loading");
});
