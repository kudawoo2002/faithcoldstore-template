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
const videoTimeLineEl = document.querySelector(".video-timeline");
const currentVidTimeEl = document.querySelector(".current-time");
const currentVidDurationEl = document.querySelector(".video-duraation");
const playBtnEl = document.querySelector(".play-btn");
const xBtnEl = document.querySelector(".x-btn");
let timer;

// Play button
playBtnEl.addEventListener("click", () => {
  videoContainerEl.classList.add("show-video");
});

// Close video player
xBtnEl.addEventListener("click", () => {
  videoContainerEl.classList.remove("show-video");
  mainVideoEl.pause();
});

// Hide controller
const hideControls = () => {
  if (mainVideoEl.paused) return;
  timer = setTimeout(() => {
    videoContainerEl.classList.remove("show-controls");
  }, 3000);
};
hideControls();

videoContainerEl.addEventListener("mousemove", () => {
  videoContainerEl.classList.add("show-controls");
  clearTimeout(timer);
  hideControls();
});
// Display video time as parcentage in the progress bar
const formatTime = (time) => {
  let seconds = Math.floor(time % 60);
  let minutes = Math.floor(time / 60) % 60;
  let hours = Math.floor(time / 3660);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;
  if (hours == 0) {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

mainVideoEl.addEventListener("loadeddata", () => {
  currentVidDurationEl.innerText = formatTime(mainVideoEl.duration);
});
mainVideoEl.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target;

  let percent = (currentTime / duration) * 100;
  progressBarEl.style.width = `${percent}%`;
  currentVidTimeEl.innerText = formatTime(currentTime);
  // currentVidDurationEl.innerHTML = formatTime(duration);
});

// Video Time line

videoTimeLineEl.addEventListener("click", (e) => {
  let timeLineWidth = videoTimeLineEl.clientWidth;
  mainVideoEl.currentTime = (e.offsetX / timeLineWidth) * mainVideoEl.duration;
});

const draggableProgressBar = (e) => {
  let timeLineWidth = videoTimeLineEl.clientWidth;
  progressBarEl.style.width = `${e.offsetX}px`;
  mainVideoEl.currentTime = (e.offsetX / timeLineWidth) * mainVideoEl.duration;
  currentVidTimeEl.innerText = formatTime(mainVideoEl.currentTime);
};

videoTimeLineEl.addEventListener("mousedown", () => {
  videoTimeLineEl.addEventListener("mousemove", draggableProgressBar);
});

videoContainerEl.addEventListener("mouseup", () => {
  videoTimeLineEl.removeEventListener("mousemove", draggableProgressBar);
});

videoTimeLineEl.addEventListener("mousemove", (e) => {
  const progressEreaEl = document.querySelector(".progress-area span");
  let offsetX = e.offsetX;
  progressEreaEl.style.left = `${offsetX}px`;
  let timeLineWidth = videoTimeLineEl.clientWidth;
  let progressTimeBar = (e.offsetX / timeLineWidth) * mainVideoEl.duration;
  progressEreaEl.innerHTML = formatTime(progressTimeBar);
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
