function setWindowHeight() {
  var windowHeight = window.innerHeight;
  var header = document.querySelector(".header");
  header.style.height = windowHeight + "px";
}

function scrolledIntoViewport() {
  var nav = document.querySelector(".nav"),
    partTitleZone = nav.querySelector(".part-title-zone"),
    triggers = document.querySelectorAll(".nav-trigger"),
    triggerInView = Array.prototype.slice.call(triggers).filter(trigger => trigger.getBoundingClientRect().top < 0),
    activeTrigger = triggerInView[triggerInView.length - 1];

  if (activeTrigger) {
    nav.classList.add("solid");
    var partTitle = addPartTitleToNav(activeTrigger);
    partTitleZone.innerHTML = partTitle;
    partTitleZone.classList.add("append");
  } else {
    nav.classList.remove("solid");
    partTitleZone.classList.remove("append");
    nav.querySelector(".part-title-zone").innerHTML = "";
  }
}

function addPartTitleToNav(trigger) {
  return trigger.firstChild.nextElementSibling.innerHTML;
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

window.addEventListener("load", setWindowHeight, false);
window.addEventListener("resize", setWindowHeight, false);
window.addEventListener("scroll", onScroll);
window.addEventListener("scroll", scrolledIntoViewport);
window.addEventListener("scroll", setScrollerTransform);