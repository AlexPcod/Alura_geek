const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");

// Función para cargar productos desde el servidor
async function fetchProducts() {
    const response = await fetch("http://localhost:3000/products");
    const products = await response.json();
    renderProducts(products);
}

// Renderizar productos en el DOM
function renderProducts(products) {
    productList.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-container--info">
                <p>${product.name}</p>
                <div class="card-container--value">
                    <p>$${product.price}</p>
                    <img src="./assets/trashIcon.png" alt="Eliminar" onclick="deleteProduct(${product.id})">
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Agregar nuevo producto
productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const image = e.target.image.value;

    const newProduct = { name, price, image };

    await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    });

    fetchProducts();
    productForm.reset();
});

// Eliminar producto
async function deleteProduct(id) {
    await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
    });
    fetchProducts();
}

// Cargar productos al iniciar
fetchProducts();
