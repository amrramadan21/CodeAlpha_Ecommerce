const products = [
    {
        id: 1,
        name: "Product One",
        description: "This is our first product.",
        price: 49.99,
        image: "./images/headphone.jpg"
    },
    {
        id: 2,
        name: "Product Two",
        description: "This is our second product.",
        price: 59.99,
        image: "./images/smartwatch.jpg"
    },
    {
        id: 3,
        name: "Product Three",
        description: "This is our third product.",
        price: 69.99,
        image: "./images/sneackers.jpg"
    },
    {
        id: 4,
        name: "Product Four",
        description: "This is our fourth product.",
        price: 79.99,
        image: "./images/handbag.jpg"
    }
];


const productContainer =
    document.querySelector(".products-container");


products.forEach(product => {

    const article = document.createElement("article");

    article.classList.add("product-card");

    article.innerHTML = `
        <img
            src="${product.image}"
            alt="${product.name}"
        >

        <h2>${product.name}</h2>

        <p>${product.description}</p>

        <p class="price">$${product.price.toFixed(2)}</p>

        <button type="button">
            Add to Cart
        </button>
    `;

    productContainer.appendChild(article);
});