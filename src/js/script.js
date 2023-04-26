function setWindowHeight() {
  var windowHeight = window.innerHeight;
  var header = document.querySelector(".header");
  header.style.height = windowHeight + "px";
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

function elementInViewport() {
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

function menuActions() {
  var menuTrigger = document.querySelector("#menu-trigger"),
    menu = document.querySelector(".menu"),
    menuHrefs = menu.querySelectorAll(".menu-href");

  menuTrigger.addEventListener("click", function () {
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      menu.classList.add("close");
    } else {
      menu.classList.remove("close");
      menu.classList.add("active");
    }
  });

  Array.prototype.slice.call(menuHrefs).forEach(link => link.addEventListener("click", triggerCloseMenu))
}

function triggerCloseMenu(e) {
  e.preventDefault();
  var target = document.querySelector(e.target.getAttribute("href")),
    menu = document.querySelector(".menu");

  menu.classList.remove("active");
  menu.classList.add("close");

  window.scrollTo({
    top: target.offsetTop,
    behavior: 'smooth'
  });
}

window.addEventListener("load", setWindowHeight, false);
window.addEventListener("load", menuActions, false);
window.addEventListener("resize", setWindowHeight, false);
window.addEventListener("scroll", onScroll, false);
window.addEventListener("scroll", scrolledIntoViewport, false);
window.addEventListener("scroll", elementInViewport, false);
window.addEventListener("scroll", setScrollerTransform, false);
