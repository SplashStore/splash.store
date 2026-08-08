let carrito = [];


// AGREGAR PRODUCTO

function agregarCarrito(nombre, precio) {

    carrito.push({
        nombre: nombre,
        precio: precio
    });

    actualizarCarrito();

    alert("✅ Producto agregado al carrito");
}


// ACTUALIZAR CARRITO

function actualizarCarrito() {

    document.getElementById("contador").textContent =
        carrito.length;

    let lista =
        document.getElementById("listaCarrito");

    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, index) => {

        total += producto.precio;

        let elemento =
            document.createElement("div");

        elemento.innerHTML = `

            <span>
                ${producto.nombre}
                <br>
                $${producto.precio.toLocaleString()}
            </span>

            <button
                onclick="eliminarProducto(${index})">
                ❌
            </button>

        `;

        lista.appendChild(elemento);

    });

    document.getElementById("total").textContent =
        total.toLocaleString();
}


// ELIMINAR PRODUCTO

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();
}


// MOSTRAR CARRITO

function mostrarCarrito() {

    document.getElementById(
        "ventanaCarrito"
    ).style.display = "flex";

}


// CERRAR CARRITO

function cerrarCarrito() {

    document.getElementById(
        "ventanaCarrito"
    ).style.display = "none";

}


// VACIAR CARRITO

function vaciarCarrito() {

    carrito = [];

    actualizarCarrito();

}


// LOGIN

function mostrarLogin() {

    document.getElementById(
        "ventanaLogin"
    ).style.display = "flex";

}


function cerrarLogin() {

    document.getElementById(
        "ventanaLogin"
    ).style.display = "none";

}


function iniciarSesion() {

    alert(
        "El sistema de usuarios lo agregaremos en el siguiente paso."
    );

}


// BUSCADOR

function buscar() {

    let texto =
        document
        .getElementById("busqueda")
        .value
        .toLowerCase();

    let productos =
        document.querySelectorAll(".producto");

    productos.forEach(producto => {

        let nombre =
            producto
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (nombre.includes(texto)) {

            producto.style.display = "block";

        } else {

            producto.style.display = "none";

        }

    });

}


// CATEGORÍAS

function filtrar(categoria) {

    let productos =
        document.querySelectorAll(".producto");

    productos.forEach(producto => {

        if (
            categoria === "todos" ||
            producto.dataset.categoria === categoria
        ) {

            producto.style.display = "block";

        } else {

            producto.style.display = "none";

        }

    });

}


// IR A PRODUCTOS

function irProductos() {

    document.querySelector("main")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// FINALIZAR COMPRA POR WHATSAPP

function finalizarCompra() {

    if (carrito.length === 0) {

        alert("🛒 Tu carrito está vacío.");

        return;
    }

    // PONÉ ACÁ TU NÚMERO DE WHATSAPP
    // Argentina: 549 + código de área + número
    const numeroWhatsApp = "5493586028606";

    let mensaje = "🛍️ Hola! Quiero realizar este pedido:%0A%0A";

    let total = 0;

    carrito.forEach((producto, index) => {

        mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio.toLocaleString()}%0A`;

        total += producto.precio;

    });

    mensaje += `%0A💰 Total: $${total.toLocaleString()}`;

    const enlace =
        `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

    window.open(enlace, "_blank");
}
