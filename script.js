const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden");
  mobileMenu.classList.add("flex");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("flex");
  mobileMenu.classList.add("hidden");
});

const servicesBtn = document.getElementById("services-btn");
const backBtn = document.getElementById("back-btn");

const mainMenu = document.getElementById("main-menu");
const submenu = document.getElementById("submenu");

// Open submenu
servicesBtn.addEventListener("click", () => {
  mainMenu.classList.remove("translate-x-0");
  mainMenu.classList.add("-translate-x-full");

  submenu.classList.remove("translate-x-full");
  submenu.classList.add("translate-x-0");
});

// Go back
backBtn.addEventListener("click", () => {
  submenu.classList.remove("translate-x-0");
  submenu.classList.add("translate-x-full");

  mainMenu.classList.remove("-translate-x-full");
  mainMenu.classList.add("translate-x-0");
});

const servicesbtn2 = document.getElementById ("services-btn2");
const servicesmenu2 = document.getElementById ("services-menu2");
servicesbtn2.addEventListener ("click", () => {
    servicesmenu2.classList.toggle("hidden");
});
