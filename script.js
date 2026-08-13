let carrito = [];
let perfumesSeleccionados = [];

// =====================================================
// AGREGAR PRODUCTO AL CARRITO
// =====================================================

function agregarCarrito(nombre, precio) {

    let cantidad = prompt(
        "¿Cuántas unidades querés comprar de:\n\n" + nombre
    );

    if (cantidad === null) {
        return;
    }

    cantidad = parseInt(cantidad);

    if (isNaN(cantidad) || cantidad <= 0) {

        alert("⚠️ Tenés que ingresar una cantidad válida.");

        return;
    }

    carrito.push({
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    });

    actualizarCarrito();

    alert(
        "✅ Agregaste " +
        cantidad +
        " unidad(es) de " +
        nombre
    );
}


// =====================================================
// ACTUALIZAR CARRITO
// =====================================================

function actualizarCarrito() {

    let lista =
        document.getElementById("listaCarrito");

    lista.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;


    carrito.forEach((producto, index) => {

        let subtotal =
            producto.precio * producto.cantidad;

        total += subtotal;

        cantidadTotal += producto.cantidad;


        let elemento =
            document.createElement("div");


        elemento.innerHTML = `

            <span>

                <strong>
                    ${producto.nombre}
                </strong>

                <br><br>

                📦 Cantidad:
                ${producto.cantidad}

                <br>

                💰 Precio:
                $${producto.precio.toLocaleString()}

                <br>

                💵 Subtotal:
                <strong>
                    $${subtotal.toLocaleString()}
                </strong>

            </span>


            <button
                onclick="eliminarProducto(${index})"
            >
                ❌
            </button>

        `;


        lista.appendChild(elemento);

    });


    document.getElementById("contador").textContent =
        cantidadTotal;


    document.getElementById("total").textContent =
        total.toLocaleString();
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

    document.getElementById(
        "ventanaCarrito"
    ).style.display = "flex";
}


// =====================================================
// CERRAR CARRITO
// =====================================================

function cerrarCarrito() {

    document.getElementById(
        "ventanaCarrito"
    ).style.display = "none";
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

    document
        .querySelector("main")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// =====================================================
// MOSTRAR PACK DE 3
// =====================================================

function mostrarPack() {

    perfumesSeleccionados = [];


    let opciones =
        document.getElementById("opcionesPack");


    opciones.innerHTML = "";


    document.getElementById(
        "cantidadPack"
    ).textContent = "0";


    let productos =
        document.querySelectorAll(
            '.producto[data-categoria="tubitos-arabes"]'
        );


    productos.forEach(producto => {

        let nombre =
            producto
            .querySelector("h3")
            .textContent;


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


    document.getElementById(
        "ventanaPack"
    ).style.display = "flex";
}


// =====================================================
// SELECCIONAR PERFUME DEL PACK
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
// ACTUALIZAR CANTIDAD DEL PACK
// =====================================================

function actualizarCantidadPack() {

    document.getElementById(
        "cantidadPack"
    ).textContent =
        perfumesSeleccionados.length;
}


// =====================================================
// CERRAR PACK
// =====================================================

function cerrarPack() {

    document.getElementById(
        "ventanaPack"
    ).style.display = "none";
}


// =====================================================
// AGREGAR PACK
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
            "🎁 Pack 3 Perfumes: " +
            nombres,

        precio: 18000,

        cantidad: 1

    });


    actualizarCarrito();

    cerrarPack();


    alert(
        "✅ Pack agregado al carrito por $18.000"
    );
}


// =====================================================
// FINALIZAR COMPRA - WHATSAPP
// =====================================================

function finalizarCompra() {

    if (carrito.length === 0) {

        alert(
            "🛒 Tu carrito está vacío."
        );

        return;
    }


    let numeroWhatsApp =
        "5493586028606";


    let mensaje =
        "🛍️ *NUEVO PEDIDO - MI TIENDA*%0A%0A";


    let total = 0;


    carrito.forEach((producto, index) => {

        let subtotal =
            producto.precio *
            producto.cantidad;


        mensaje +=
            `${index + 1}. ${producto.nombre}%0A`;


        mensaje +=
            `📦 Cantidad: ${producto.cantidad}%0A`;


        mensaje +=
            `💰 Precio unidad: $${producto.precio.toLocaleString()}%0A`;


        mensaje +=
            `💵 Subtotal: $${subtotal.toLocaleString()}%0A%0A`;


        total += subtotal;

    });


    mensaje +=
        "━━━━━━━━━━━━━━%0A";


    mensaje +=
        `💵 *TOTAL: $${total.toLocaleString()}*%0A%0A`;


    mensaje +=
        "Hola! Quiero realizar este pedido.";


    let url =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        mensaje;


    window.open(
        url,
        "_blank"
    );
}
