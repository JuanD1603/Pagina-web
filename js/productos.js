const productos = [
    {id:1, nombre: 'Producto 1', precio: 100, imagen: 'https://via.placeholder.com/150' },
    {id:2, nombre: 'Producto 2', precio: 150, imagen: 'https://via.placeholder.com/150' },
    {id:3, nombre: 'Producto 3', precio: 200, imagen: 'https://via.placeholder.com/150' },
    {id:4, nombre: 'Producto 4', precio: 250, imagen: 'https://via.placeholder.com/150' },
    {id:5, nombre: 'Producto 5', precio: 300, imagen: 'https://via.placeholder.com/150' },
    {id:6, nombre: 'Producto 6', precio: 350, imagen: 'https://via.placeholder.com/150' },
    {id:7, nombre: 'Producto 7', precio: 400, imagen: 'https://via.placeholder.com/150' },
    {id:8, nombre: 'Producto 8', precio: 450, imagen: 'https://via.placeholder.com/150' },
    {id:9, nombre: 'Producto 9', precio: 500, imagen: 'https://via.placeholder.com/150' }
];

function mostrarProductos(){
    const contenedor = document.getElementById('productos');
    //ciclo para recorrer productos y mostrarlos en contenedor
    productos.forEach(producto => {
            const div = document.createElement('div');
            div.className = 'producto';
            div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            `;
            contenedor.appendChild(div); 
    });
}

let carrito = [];

function agregarAlCarrito(id){
    //buscar id en la lista y devolver a constante producto
    const producto = productos.find(p => p.id === id);
    //buscar en carrito si el producto ya esta
    const itemEnCarrito = carrito.find(item => item.id === id);

    if(itemEnCarrito){
        itemEnCarrito.cantidad++;
    }else{
        carrito.push({ ...producto, cantidad : 1});
    }

    document.getElementById('cantidadCarrito').innerText = carrito.length;
    actualizarCarrito();
}

function toggleCarrito(){
    const contenidocarrito = document.getElementById('carritoContainer');
    contenidocarrito.classList.toggle('oculto');
    actualizarCarrito();
}

function actualizarCarrito(){
    const contenidocarrito = document.getElementById('contenidoCarrito');
    contenidocarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        contenidocarrito.innerHTML += `
        <div class="carrito-item">
        <img src="${item.imagen}" alt="${item.nombre}">
        <span>${item.nombre} - $ ${item.precio} x ${item.cantidad} = $ ${subtotal} </span>
        <button onclick="quitarDelCarrito(${item.id})">Quitar</button>
        </div>`;
    });

    document.getElementById("totalAPagar").innerText = "Total a pagar $ " + total;

    if(carrito.length === 0){
        contenidocarrito.innerHTML = "<p>El carrito esta vacio</p>";
    }
}

function quitarDelCarrito(id){
    const index = carrito.findIndex(item => item.id === id);

    if(index !== -1){
        if(carrito[index].cantidad > 1){
            carrito[index].cantidad--;
        }else{
            carrito.splice(index,1);
        }
    }

    document.getElementById('cantidadCarrito').innerText = carrito.length;
    actualizarCarrito();
}

function pagar(){
    window.location.href = "https://www.paypal.com";
}

//va al final para cargar la pagina los productos
mostrarProductos();