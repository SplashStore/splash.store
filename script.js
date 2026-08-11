let carrito = [];

// =====================================================
// AGREGAR PRODUCTO
// =====================================================

function agregarCarrito(nombre, precio) {

    carrito.push({
        nombre: nombre,
        precio: precio
    });

    actualizarCarrito();

    alert("✅ Producto agregado al carrito");
}


// =====================================================
// ACTUALIZAR CARRITO
// =====================================================

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
                $${producto.precio.toLocaleString("es-AR")}
            </span>

            <button onclick="eliminarProducto(${index})">
                ❌
            </button>

        `;

        lista.appendChild(elemento);

    });

    document.getElementById("total").textContent =
        total.toLocaleString("es-AR");
}


// =====================================================
// ELIMINAR PRODUCTO
// =====================================================

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();
}


// =====================================================
// MOSTRAR CARRITO
// =====================================================

function mostrarCarrito() {

    document.getElementById("ventanaCarrito").style.display =
        "flex";
}


// =====================================================
// CERRAR CARRITO
// =====================================================

function cerrarCarrito() {

    document.getElementById("ventanaCarrito").style.display =
        "none";
}


// =====================================================
// VACIAR CARRITO
// =====================================================

function vaciarCarrito() {

    carrito = [];

    actualizarCarrito();
}


// =====================================================
// LOGIN
// =====================================================

function mostrarLogin() {

    document.getElementById("ventanaLogin").style.display =
        "flex";
}


function cerrarLogin() {

    document.getElementById("ventanaLogin").style.display =
        "none";
}


function iniciarSesion() {

    alert(
        "El sistema de usuarios lo agregaremos en el siguiente paso."
    );
}


// =====================================================
// BUSCADOR
// =====================================================

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


// =====================================================
// CATEGORÍAS
// =====================================================

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


// =====================================================
// IR A PRODUCTOS
// =====================================================

function irProductos() {

    document.querySelector("main").scrollIntoView({
        behavior: "smooth"
    });
}


// =====================================================
// PACK DE 3 PERFUMES
// =====================================================

let perfumesSeleccionados = [];


// =====================================================
// MOSTRAR PACK
// =====================================================

function mostrarPack() {

    perfumesSeleccionados = [];

    let opciones =
        document.getElementById("opcionesPack");

    opciones.innerHTML = "";

    document.getElementById("cantidadPack").textContent = "0";

    let productos =
        document.querySelectorAll(
            '.producto[data-categoria="tubitos-arabes"]'
        );

    productos.forEach(producto => {

        let nombre =
            producto.querySelector("h3").textContent;

        let boton =
            document.createElement("button");

        boton.textContent =
            "⬜ " + nombre;

        boton.className =
            "opcion-pack";

        boton.onclick = function() {

            seleccionarPerfume(
                nombre,
                boton
            );

        };

        opciones.appendChild(boton);

    });

    document.getElementById("ventanaPack").style.display =
        "flex";
}


// =====================================================
// SELECCIONAR PERFUME
// =====================================================

function seleccionarPerfume(nombre, boton) {

    let posicion =
        perfumesSeleccionados.indexOf(nombre);

    if (posicion !== -1) {

        perfumesSeleccionados.splice(
            posicion,
            1
        );

        boton.textContent =
            "⬜ " + nombre;

        boton.classList.remove(
            "seleccionado"
        );

        actualizarCantidadPack();

        return;
    }

    if (perfumesSeleccionados.length >= 3) {

        alert(
            "⚠️ Solo podés elegir 3 perfumes."
        );

        return;
    }

    perfumesSeleccionados.push(nombre);

    boton.textContent =
        "✅ " + nombre;

    boton.classList.add(
        "seleccionado"
    );

    actualizarCantidadPack();
}


// =====================================================
// ACTUALIZAR CANTIDAD PACK
// =====================================================

function actualizarCantidadPack() {

    document.getElementById("cantidadPack").textContent =
        perfumesSeleccionados.length;
}


// =====================================================
// CERRAR PACK
// =====================================================

function cerrarPack() {

    document.getElementById("ventanaPack").style.display =
        "none";
}


// =====================================================
// AGREGAR PACK AL CARRITO
// =====================================================

function agregarPack() {

    if (perfumesSeleccionados.length !== 3) {

        alert(
            "⚠️ Tenés que elegir exactamente 3 perfumes."
        );

        return;
    }

    let nombres =
        perfumesSeleccionados.join(" + ");

    carrito.push({

        nombre:
            "🎁 Pack 3 Perfumes: " + nombres,

        precio: 18000

    });

    actualizarCarrito();

    cerrarPack();

    alert(
        "✅ Pack agregado al carrito por $18.000"
    );
}


// =====================================================
// FINALIZAR COMPRA POR WHATSAPP
// =====================================================

function finalizarCompra() {

    if (carrito.length === 0) {

        alert(
            "🛒 Tu carrito está vacío."
        );

        return;
    }

    // TU WHATSAPP
    let numeroWhatsApp = "5493586028606";

    let total = 0;

    let mensaje =
        "🛍️ *NUEVO PEDIDO - MI TIENDA*\n\n";

    carrito.forEach((producto, index) => {

        mensaje +=
            `${index + 1}. ${producto.nombre}\n`;

        mensaje +=
            `💰 $${producto.precio.toLocaleString("es-AR")}\n\n`;

        total += producto.precio;
    });

    mensaje +=
        "━━━━━━━━━━━━━━\n";

    mensaje +=
        `💵 *TOTAL: $${total.toLocaleString("es-AR")}*\n\n`;

    mensaje +=
        "Hola! Quiero realizar este pedido.";

    // CONVERTIR EL MENSAJE PARA URL
    let url =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        encodeURIComponent(mensaje);

    // ABRIR WHATSAPP
    window.location.href = url;
}
