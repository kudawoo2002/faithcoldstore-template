// Adding sticky class to the navbar
const navbarEl = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbarEl.classList.add("sticky");
  } else {
    navbarEl.classList.remove("sticky");
  }
});

// End of Navbar

// Products
const filterNavEl = document.querySelectorAll(".filter-nav-link");
filterNavEl.forEach((filterLink) =>
  filterLink.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(".filter-nav-link.active")
      .classList.remove("active");
    filterLink.classList.add("active");

    const products = document.querySelectorAll(".product");
    products.forEach((product) => {
      product.classList.add("hide");
      if (
        filterLink.getAttribute("data-type") ===
          product.getAttribute("data-type") ||
        filterLink.getAttribute("data-type") === "all"
      ) {
        product.classList.remove("hide");
      }
    });
  })
);
// End of Product

// Video
const videoContainerEl = document.querySelector(".video-container");
const mainVideoEl = document.querySelector("video");
const playPauseBtnEl = document.querySelector(".play-pause i");
const progressBarEl = document.querySelector(".progress-bar");
const skipBackwardBtnEl = document.querySelector(".skip-backward i");
const skipforwardBtnEl = document.querySelector(".skip-forward i");
const volumeBtnEl = document.querySelector(".volume i");
const volumeSliderEl = document.querySelector(".left input");
const speedBtnEl = document.querySelector(".playback-speed span");
const speedOptionEl = document.querySelector(".speed-options");
const speedOptionDivEl = document.querySelectorAll(".speed-options div");
const picInPicBtnEl = document.querySelector(".pic-in-pic span");
const fullScreenBtnEl = document.querySelector(".fullscreen i");

// Display video time as parcentage in the progress bar
mainVideoEl.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target;

  let percent = (currentTime / duration) * 100;
  progressBarEl.style.width = `${percent}%`;
});

// Skip video backward button
skipBackwardBtnEl.addEventListener("click", () => {
  mainVideoEl.currentTime -= 5;
});

// Skip video Forward button
skipforwardBtnEl.addEventListener("click", () => {
  mainVideoEl.currentTime += 5;
});

// Mute, Increase Volume or used the slider
volumeBtnEl.addEventListener("click", () => {
  if (!volumeBtnEl.classList.contains("fa-volume-high")) {
    mainVideoEl.volume = 0.5;
    volumeBtnEl.classList.replace("fa-volume-xmark", "fa-volume-high");
  } else {
    mainVideoEl.volume = 0.0;
    volumeBtnEl.classList.replace("fa-volume-high", "fa-volume-xmark");
  }
  volumeSliderEl.value = mainVideoEl.volume;
});

volumeSliderEl.addEventListener("input", (e) => {
  mainVideoEl.volume = e.target.value * 1;
  if (mainVideoEl.volume === 0) {
    volumeBtnEl.classList.replace("fa-volume-high", "fa-volume-xmark");
  } else {
    volumeBtnEl.classList.replace("fa-volume-xmark", "fa-volume-high");
  }
});

// Play and pause video
playPauseBtnEl.addEventListener("click", () => {
  if (mainVideoEl.paused) {
    mainVideoEl.play();
    playPauseBtnEl.classList.replace("fa-play", "fa-pause");
  } else {
    mainVideoEl.pause();
    playPauseBtnEl.classList.replace("fa-pause", "fa-play");
  }
});

// Speed options
speedBtnEl.addEventListener("click", () => {
  speedOptionEl.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (
    e.target.tagName !== "SPAN" ||
    e.target.className !== "material-symbols-rounded"
  ) {
    speedOptionEl.classList.remove("show");
  }
});

speedOptionDivEl.forEach((option) => {
  option.addEventListener("click", () => {
    mainVideoEl.playbackRate = option.dataset.speed;
    speedOptionEl
      .querySelector(".active-option")
      .classList.remove("active-option");
    option.classList.add("active-option");
  });
});

// Picture in Picture Mode
picInPicBtnEl.addEventListener("click", () => {
  mainVideoEl.requestPictureInPicture();
});

// Fullscreen video Mode
fullScreenBtnEl.addEventListener("click", () => {
  mainVideoEl.requestFullscreen();
});
// End of Video
