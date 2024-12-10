// Variables clave
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartLink = document.getElementById("cart-link");

// Objeto para almacenar los productos del carrito
let cart = {};

// Agregar producto al carrito
addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const product = e.target.closest(".product");
        const productId = product.dataset.id;
        const productName = product.dataset.name;
        const productPrice = parseFloat(product.dataset.price);

        // Si el producto ya está en el carrito, aumenta la cantidad
        if (cart[productId]) {
            cart[productId].quantity++;
        } else {
            // Agrega un nuevo producto al carrito
            cart[productId] = {
                name: productName,
                price: productPrice,
                quantity: 1,
            };
        }

        updateCart();
    });
});

// Actualizar el carrito
function updateCart() {
    // Limpia el contenido del carrito
    cartItemsContainer.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    // Recorre los productos en el carrito
    for (const productId in cart) {
        const item = cart[productId];
        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        itemCount += item.quantity;

        // Crear una fila para cada producto
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button class="remove-item" data-id="${productId}">Eliminar</button></td>
        `;
        cartItemsContainer.appendChild(row);
    }

    // Actualiza el total y el contador del carrito
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartLink.textContent = `Carrito (${itemCount})`;
}

// Delegación de eventos para los botones "Eliminar"
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
        const productId = event.target.dataset.id; // Obtener el ID del producto
        delete cart[productId]; // Eliminar el producto del carrito
        updateCart(); // Actualizar el carrito
    }
});