const menuBtn = document.getElementById("menuBtn");

const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
 mobileMenu.classList.toggle("hidden"); 
 menuBtn.classList.toggle("rotate-90")
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

const products2 = document.querySelectorAll(".product2");
const pagination2 = document.getElementById("pagination2");


const productsPerPage2 = 4;

let currentPage2 = 1;

const totalPages2 = Math.ceil(products2.length / productsPerPage2);


function showProducts2(page) {
 
    currentPage2 = page;

    const start = (page - 1) * productsPerPage2;
    const end = start + productsPerPage2;

    products2.forEach((product, index) => {

        if (index >= start && index < end) {

            product.classList.remove("hidden");

        } else {

            product.classList.add("hidden");

        }

    });

    createPagination2();
     

}


function createPagination2() {

    pagination2.innerHTML = "";

    for (let i = 1; i <= totalPages2; i++) {

        const button = document.createElement("button");

        button.textContent = i;

        button.className =
            "px-4 py-2 mx-1 rounded bg-gray-200 hover:bg-pink-600 hover:text-white  active:bg-red-700 transition-all duration-300";

        button.addEventListener("click", () => {

            showProducts2(i);

        });

        pagination2.appendChild(button);

    }

}


showProducts2(1);

