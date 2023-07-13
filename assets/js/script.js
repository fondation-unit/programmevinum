const IMG_FOLDER = "./src/images/";
const SM_BREAKPOINT = 830;

function setWindowHeight() {
  var windowHeight = window.innerHeight;
  var header = document.querySelector(".header");
  if (header) {
    header.style.height = windowHeight + "px";
  }
}

function scrolledIntoViewport() {
  var nav = document.querySelector(".nav"),
    partTitleZone = nav.querySelector(".part-title-zone"),
    triggers = document.querySelectorAll(".nav-trigger"),
    triggerInView = Array.prototype.slice.call(triggers).filter(trigger => trigger.getBoundingClientRect().top < 20),
    activeTrigger = triggerInView[triggerInView.length - 1];

  if (activeTrigger) {
    nav.classList.add("solid");
    var partTitle = addPartTitleToNav(activeTrigger),
      line = partTitle.querySelector(".line")

    partTitleZone.innerHTML = partTitle.innerHTML;
    partTitleZone.classList.add("append");
    line.classList.add("append");
  } else {
    nav.classList.remove("solid");
    partTitleZone.classList.remove("append");
    nav.querySelector(".part-title-zone").innerHTML = "";
  }
}

function translatedIntoViewport() {
  var triggers = document.querySelectorAll(".transition-inplace"),
    triggerInView = Array.prototype.slice.call(triggers).filter(trigger => {
      var rect = trigger.getBoundingClientRect()
      return rect.top <= window.innerHeight && rect.bottom >= 500
    }),
    activeTrigger = triggerInView[triggerInView.length - 1];

  if (activeTrigger) {
    activeTrigger.classList.add("append");
  }
}

function navTriggerInViewport() {
  var triggers = document.querySelectorAll(".nav-trigger"),
    triggerInView = Array.prototype.slice.call(triggers).filter(trigger => {
      var rect = trigger.getBoundingClientRect()
      return rect.top <= window.innerHeight && rect.bottom >= 0
    }),
    activeTrigger = triggerInView[triggerInView.length - 1];

  if (activeTrigger) {
    var partTitle = addPartTitleToNav(activeTrigger),
      line = partTitle.querySelector(".line");

    line.classList.add("append");
  }
}

function addPartTitleToNav(trigger) {
  return trigger.firstChild.nextElementSibling;
}

function setScrollerTransform() {
  var scrollTop = window.scrollY,
    docHeight = document.body.offsetHeight,
    winHeight = window.innerHeight,
    scrollPercent = scrollTop / (docHeight - winHeight);

  var scroller = document.querySelector(".scroller");
  scroller.style.transform = `scaleX(${scrollPercent})`;
}

var pattern = document.querySelector("#pattern");
if (pattern) {
  var onScroll = (function () {
    var startPos;

    function run() {
      var fromTop = window.pageYOffset,
        rect = pattern.getBoundingClientRect(),
        scrollDelta;

      // check if element is in viewport
      if ((rect.top - window.innerHeight) <= 0 && rect.bottom > 0)
        startPos = startPos === undefined ? fromTop : startPos;
      else {
        startPos = 0;
        return;
      }

      scrollDelta = (fromTop - startPos) * 0.1; // "speed" per scrolled frame
      pattern.style.transform = `translateX(-${scrollDelta}px)`;
    }

    run();

    return run;
  })();
}

function menuActions() {
  var menuTrigger = document.querySelector("#menu-trigger"),
    menu = document.querySelector(".menu"),
    menuHrefs = document.querySelectorAll(".menu-href"),
    menuHrefsSecondary = document.querySelectorAll(".menu-href-secondary"),
    nav = document.querySelector(".nav"),
    menuTriggerIcon = nav.querySelector("#menu-trigger-icon"),
    body = document.querySelector("body");

  // Toggle menu behaviour
  menuTrigger.addEventListener("click", function () {
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      menu.classList.add("close");
      nav.classList.remove("menu-active");
      menuTriggerIcon.src = IMG_FOLDER + "menu-icon.svg";
      body.style.overflow = "auto";
    } else {
      menu.classList.remove("close");
      menu.classList.add("active");
      nav.classList.add("menu-active");
      menuTriggerIcon.src = IMG_FOLDER + "menu-close-icon.svg";
      body.style.overflow = "hidden";
    }
  });

  // Bind click event on menu items
  Array.prototype.slice.call(menuHrefs).forEach(link => link.addEventListener("click", triggerCloseMenu, false));
  if (menuHrefsSecondary) {
    Array.prototype.slice.call(menuHrefsSecondary).forEach(link => link.addEventListener("click", triggerCloseMenu.bind(null, redirect = true), false));
  }

  // Make logo clickable to scroll to top
  var logo = document.querySelector(".site-logo");
  logo.addEventListener("click", function () { scrollToTop(logo) }, false);
}

function triggerCloseMenu(e, redirect = false) {
  e.preventDefault();
  var target = document.querySelector(e.target.getAttribute("href")),
    menu = document.querySelector(".menu"),
    nav = document.querySelector(".nav"),
    menuTriggerIcon = nav.querySelector("#menu-trigger-icon"),
    body = document.querySelector("body");

  menu.classList.remove("active");
  menu.classList.add("close");
  nav.classList.remove("menu-active");
  menuTriggerIcon.src = IMG_FOLDER + "menu-icon.svg";
  body.style.overflow = "auto";

  if (redirect) {
    window.location = href;
  } else {
    scrollToTop(target);
  }
}

function scrollToTop(target) {
  window.scrollTo({
    top: target.offsetTop,
    behavior: 'smooth'
  });
}

function setElementsInViewport() {
  // Make the transitionning elements in view on load
  var triggers = document.querySelectorAll(".nav-trigger, .transition-inplace");
  Array.prototype.slice.call(triggers).filter(trigger => {
    var rect = trigger.getBoundingClientRect()
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      trigger.classList.add("append");
    }
  });
}

window.addEventListener("load", setElementsInViewport, false)
window.addEventListener("load", setWindowHeight, false);
window.addEventListener("load", menuActions, false);
window.addEventListener("load", scrolledIntoViewport, false);
window.addEventListener("resize", setWindowHeight, false);
window.addEventListener("scroll", onScroll, false);
window.addEventListener("scroll", scrolledIntoViewport, false);
window.addEventListener("scroll", navTriggerInViewport, false);
window.addEventListener("scroll", setScrollerTransform, false);
window.addEventListener("scroll", translatedIntoViewport, false);
