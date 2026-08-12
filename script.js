const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
 mobileMenu.classList.remove("hidden");
 mobileMenu.classList.add("flex");
 
 
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
  mobileMenu.classList.remove("remove");
  
  
  
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


//*******products */

const products = document.querySelectorAll(".product");
const pagination = document.getElementById("pagination");


const productsPerPage = 4;

let currentPage = 1;

const totalPages = Math.ceil(products.length / productsPerPage);


function showProducts(page) {

    currentPage = page;

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;

    products.forEach((product, index) => {

        if (index >= start && index < end) {

            product.classList.remove("hidden");

        } else {

            product.classList.add("hidden");

        }

    });

    createPagination();

}


function createPagination() {

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {

        const button = document.createElement("button");

        button.textContent = i;

        button.className =
            "px-4 py-2 mx-1 rounded bg-gray-200 hover:bg-pink-600 hover:text-white  active:bg-red-700 transition-all duration-300";

        button.addEventListener("click", () => {

            showProducts(i);

        });

        pagination.appendChild(button);

    }

}


showProducts(1);