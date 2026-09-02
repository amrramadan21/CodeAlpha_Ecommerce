let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==============================
// PRODUCTS
// ==============================

const products = [
    {
        id: 1,
        name: "Headphone",
        description:
            "High-quality wireless headphones for an immersive audio experience.",
        price: 49.99,
        image: "./images/headphone.jpg"
    },
    {
        id: 2,
        name: "Smartwatch",
        description:
            "Stay connected and track your fitness with our latest smartwatch.",
        price: 59.99,
        image: "./images/smartwatch.jpg"
    },
    {
        id: 3,
        name: "Sneakers",
        description:
            "Comfortable and stylish sneakers for everyday wear.",
        price: 69.99,
        image: "./images/sneackers.jpg"
    },
    {
        id: 4,
        name: "Handbag",
        description:
            "Elegant and spacious handbag for all your essentials.",
        price: 79.99,
        image: "./images/handbag.jpg"
    }
];


// ==============================
// GET HTML ELEMENTS
// ==============================

const productContainer =
    document.querySelector(".products-container");

const cartCount =
    document.getElementById("cart-count");

const cartItems =
    document.getElementById("cart-items");

const cartTotal =
    document.getElementById("cart-total");


// ==============================
// RENDER PRODUCTS
// ==============================

products.forEach(product => {

    const article =
        document.createElement("article");

    article.classList.add("product-card");


    article.innerHTML = `
        <img
            src="${product.image}"
            alt="${product.name}"
        >

        <h2>${product.name}</h2>

        <p>
            ${product.description}
        </p>

        <p class="price">
            $${product.price.toFixed(2)}
        </p>

        <button
            type="button"
            class="add-to-cart"
            data-product-id="${product.id}"
        >
            Add to Cart
        </button>
    `;


    productContainer.appendChild(article);

});


// ==============================
// ADD TO CART BUTTONS
// ==============================

const addToCartButtons =
    document.querySelectorAll(".add-to-cart");


addToCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productId =
            Number(button.dataset.productId);


        const product =
            products.find(
                product => product.id === productId
            );


        const existingItem =
            cart.find(
                item => item.id === productId
            );


        // If product already exists in cart
        if (existingItem) {

            existingItem.quantity += 1;

        }

        // If product doesn't exist yet
        else {

            cart.push({
                ...product,
                quantity: 1
            });

        }


        saveCart();
        renderCart();

    });

});

// ==============================
// SAVE CART TO LOCAL STORAGE
// ==============================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ==============================
// RENDER CART
// ==============================

function renderCart() {

    // Clear old cart HTML
    cartItems.innerHTML = "";


    // ==============================
    // EMPTY CART
    // ==============================

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart-message">
                Your cart is empty.
            </p>
        `;


        cartCount.textContent = "0";

        cartTotal.textContent = "0.00";


        return;
    }


    // ==============================
    // DISPLAY CART ITEMS
    // ==============================

    cart.forEach(product => {

        const cartItem =
            document.createElement("div");


        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="cart-item-info">

                <h3>
                    ${product.name}
                </h3>


                <p>
                    $${product.price.toFixed(2)}
                </p>


                <div class="quantity-controls">

                    <button
                        type="button"
                        class="decrease-btn"
                        data-id="${product.id}"
                    >
                        -
                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        type="button"
                        class="increase-btn"
                        data-id="${product.id}"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                type="button"
                class="remove-btn"
                data-id="${product.id}"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    // ==============================
    // CALCULATE TOTAL ITEMS
    // ==============================

    const totalItems =
        cart.reduce(
            (sum, product) =>
                sum + product.quantity,
            0
        );


    cartCount.textContent = totalItems;


    // ==============================
    // CALCULATE TOTAL PRICE
    // ==============================

    const totalPrice =
        cart.reduce(
            (sum, product) =>
                sum +
                product.price * product.quantity,
            0
        );


    cartTotal.textContent =
        totalPrice.toFixed(2);


    // ==============================
    // GET CART BUTTONS
    // ==============================

    const increaseButtons =
        document.querySelectorAll(".increase-btn");

    const decreaseButtons =
        document.querySelectorAll(".decrease-btn");

    const removeButtons =
        document.querySelectorAll(".remove-btn");


    // ==============================
    // INCREASE QUANTITY
    // ==============================

    increaseButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);


            increaseQuantity(productId);

        });

    });


    // ==============================
    // DECREASE QUANTITY
    // ==============================

    decreaseButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);


            decreaseQuantity(productId);

        });

    });


    // ==============================
    // REMOVE ITEM
    // ==============================

    removeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);


            removeFromCart(productId);

        });

    });

}


// ==============================
// INCREASE PRODUCT QUANTITY
// ==============================

function increaseQuantity(productId) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (item) {

        item.quantity += 1;

    }

    saveCart();
    renderCart();

}


// ==============================
// DECREASE PRODUCT QUANTITY
// ==============================

function decreaseQuantity(productId) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) {
        return;
    }


    if (item.quantity > 1) {

        item.quantity -= 1;

    }

    else {

        removeFromCart(productId);

        return;

    }


    saveCart();
    renderCart();

}


// ==============================
// REMOVE PRODUCT
// ==============================

function removeFromCart(productId) {

    cart = cart.filter(
        product =>
            product.id !== productId
    );


    saveCart();
    renderCart();

}


// ==============================
// INITIAL CART RENDER
// ==============================

renderCart();