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
