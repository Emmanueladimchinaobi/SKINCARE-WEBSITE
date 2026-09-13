const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =====================================
// CHECK IF THIS IS A SHARED WISHLIST
// =====================================

const urlParams = new URLSearchParams(window.location.search);

const sharedWishlistId = urlParams.get("wishlist");


// =====================================
// DISPLAY CART
// =====================================

function displayCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="text-center text-gray-500 text-xl">
                Your wishlist is empty.
            </p>
        `;

        return;
    }


    cart.forEach((item, index) => {

        cartItems.innerHTML += `

        <div class="bg-white text-black rounded-xl shadow-lg p-5 flex flex-col items-center md:flex-row gap-8">

            <img
                src="${item.image}"
                class="w-75 h-75 object-contain rounded-lg animate-gentle"
            >

            <div class="flex-1">

                <h2 class="text-sm font-bold">
                    ${item.name}
                </h2>


                <div class="flex items-center gap-3 mt-4">

                    <button
                        onclick="decrease(${index})"
                        class="border border-black px-3 py-1 rounded">
                        -
                    </button>

                    <span class="font-semibold">
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increase(${index})"
                        class="border border-black px-3 py-1 rounded">
                        +
                    </button>

                </div>

            </div>


            <div class="text-right">

                <button
                    onclick="removeItem(${index})"
                    class="mt-3 border border-white bg-black text-white px-4 py-2 rounded-lg">
                    Remove
                </button>

            </div>

        </div>

        <br>

        `;
    });


    localStorage.setItem("cart", JSON.stringify(cart));
}


// =====================================
// INCREASE
// =====================================

function increase(index) {

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// =====================================
// DECREASE
// =====================================

function decrease(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// =====================================
// REMOVE
// =====================================

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// =====================================
// LOAD SHARED WISHLIST
// =====================================

async function loadSharedWishlist() {

    try {

        const response = await fetch(
            `https://skincare-website-hquu.onrender.com/wishlists/${sharedWishlistId}`
        );


        const data = await response.json();


        if (!response.ok) {

            cartItems.innerHTML = `
                <p class="text-center text-red-500 text-xl">
                    ${data.message || "Wishlist not found."}
                </p>
            `;

            return;

        }


        // Use the shared wishlist
        cart = data.items;


        displayCart();


    } catch (error) {

        console.error("Error loading wishlist:", error);

        cartItems.innerHTML = `
            <p class="text-center text-red-500 text-xl">
                Unable to load wishlist.
            </p>
        `;

    }

}


// =====================================
// START
// =====================================

if (sharedWishlistId) {

    loadSharedWishlist();

} else {

    displayCart();

}