const navbarEl = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.screenY > 0) {
    navbarEl.classList.add("sticky");
  } else {
    navbarEl.classList.remove("sticky");
  }
});
