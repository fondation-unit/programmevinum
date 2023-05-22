const clickAnchorTag = (anchor = false, e) => {
  e.preventDefault();
  window.open(anchor.href, "_blank");
}

// Partners list
const reseau = document.querySelectorAll(".reseau-items");

Array.prototype.slice.call(reseau).forEach(reseauElement => {
  Array.prototype.slice.call(reseauElement.children).forEach(element => {
    element.addEventListener("mouseenter", () => {
      const target = element.dataset.target;
      if (target) {
        const mapElement = document.querySelector("#" + target);
        if (mapElement)
          mapElement.classList.add("active");
      }
    });

    element.addEventListener("mouseleave", () => {
      const target = element.dataset.target;
      if (target) {
        const mapElement = document.querySelector("#" + target);
        if (mapElement)
          mapElement.classList.remove("active");
      }
    });
  });
});

// Map points
const mapPoints = document.querySelectorAll("g.reseau-item");

Array.prototype.slice.call(mapPoints).forEach(element => {
  element.addEventListener("mouseenter", () => {
    element.classList.add("active");
    const target = document.querySelector(`[data-target="${element.id}"]`);
    if (target) {
      target.classList.add("active");
      element.addEventListener("click", clickAnchorTag.bind(null, anchor = target.children[0]), false);
    }
  });
  element.addEventListener("mouseleave", () => {
    element.classList.remove("active");
    const target = document.querySelector(`[data-target="${element.id}"]`);
    if (target) {
      target.classList.remove("active");
      element.removeEventListener("click", clickAnchorTag);
    }
  });
});
