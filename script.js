// =====================================================
// CARRITO
// =====================================================

let carrito = [];


// =====================================================
// AGREGAR PRODUCTO AL CARRITO
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

    const contador = document.getElementById("contador");
    const lista = document.getElementById("listaCarrito");
    const totalElemento = document.getElementById("total");

    if (!contador || !lista || !totalElemento) {
        return;
    }

    contador.textContent = carrito.length;

    lista.innerHTML = "";

    let total = 0;

    carrito.forEach(function(producto, index) {

        total += producto.precio;

        const elemento = document.createElement("div");

        elemento.innerHTML = `
            <span>
                <strong>${producto.nombre}</strong>
                <br>
                $${producto.precio.toLocaleString("es-AR")}
            </span>

            <button
                type="button"
                onclick="eliminarProducto(${index})">
                ❌
            </button>
        `;

        lista.appendChild(elemento);
    });

    totalElemento.textContent =
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

    const ventana =
        document.getElementById("ventanaCarrito");

    if (ventana) {
        ventana.style.display = "flex";
    }
}


// =====================================================
// CERRAR CARRITO
// =====================================================

function cerrarCarrito() {

    const ventana =
        document.getElementById("ventanaCarrito");

    if (ventana) {
        ventana.style.display = "none";
    }
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

    const ventana =
        document.getElementById("ventanaLogin");

    if (ventana) {
        ventana.style.display = "flex";
    }
}


function cerrarLogin() {

    const ventana =
        document.getElementById("ventanaLogin");

    if (ventana) {
        ventana.style.display = "none";
    }
}


function iniciarSesion() {

    alert(
        "👤 El sistema de usuarios estará disponible próximamente."
    );
}


// =====================================================
// BUSCADOR
// =====================================================

function buscar() {

    const buscador =
        document.getElementById("busqueda");

    if (!buscador) {
        return;
    }

    const texto =
        buscador.value.toLowerCase().trim();

    const productos =
        document.querySelectorAll(".producto");

    productos.forEach(function(producto) {

        const titulo =
            producto.querySelector("h3");

        if (!titulo) {
            return;
        }

        const nombre =
            titulo.textContent.toLowerCase();

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

    const productos =
        document.querySelectorAll(".producto");

    productos.forEach(function(producto) {

        const categoriaProducto =
            producto.dataset.categoria;

        if (
            categoria === "todos" ||
            categoriaProducto === categoria
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

    const productos =
        document.querySelector("main");

    if (productos) {

        productos.scrollIntoView({
            behavior: "smooth"
        });
    }
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

    const opciones =
        document.getElementById("opcionesPack");

    const cantidad =
        document.getElementById("cantidadPack");

    const ventana =
        document.getElementById("ventanaPack");


    if (!opciones || !cantidad || !ventana) {
        alert("⚠️ No se encontró la ventana del pack.");
        return;
    }


    opciones.innerHTML = "";

    cantidad.textContent = "0";


    const productos =
        document.querySelectorAll(
            '.producto[data-categoria="tubitos-arabes"]'
        );


    productos.forEach(function(producto) {

        const titulo =
            producto.querySelector("h3");

        if (!titulo) {
            return;
        }

        const nombre =
            titulo.textContent.trim();


        const boton =
            document.createElement("button");


        boton.type = "button";

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


    ventana.style.display = "flex";
}


// =====================================================
// SELECCIONAR PERFUME PARA EL PACK
// =====================================================

function seleccionarPerfume(nombre, boton) {

    const posicion =
        perfumesSeleccionados.indexOf(nombre);


    // SI YA ESTÁ SELECCIONADO
    // LO QUITAMOS

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


    // MÁXIMO 3

    if (perfumesSeleccionados.length >= 3) {

        alert(
            "⚠️ Solo podés elegir 3 perfumes."
        );

        return;
    }


    // AGREGAR

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

    const cantidad =
        document.getElementById("cantidadPack");

    if (cantidad) {

        cantidad.textContent =
            perfumesSeleccionados.length;
    }
}


// =====================================================
// CERRAR PACK
// =====================================================

function cerrarPack() {

    const ventana =
        document.getElementById("ventanaPack");

    if (ventana) {

        ventana.style.display = "none";
    }
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


    const nombres =
        perfumesSeleccionados.join(" + ");


    carrito.push({

        nombre:
            "🎁 Pack 3 Perfumes: " +
            nombres,

        precio: 18000
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

    // COMPROBAR CARRITO

    if (carrito.length === 0) {

        alert(
            "🛒 Tu carrito está vacío."
        );

        return;
    }


    // =================================================
    // TU NÚMERO DE WHATSAPP
    // =================================================

    const numeroWhatsApp =
        "5493586028606";


    // =================================================
    // CREAR MENSAJE
    // =================================================

    let mensaje =
        "🛍️ NUEVO PEDIDO - MI TIENDA\n\n";


    let total = 0;


    carrito.forEach(function(producto, index) {

        mensaje +=
            `${index + 1}. ${producto.nombre}\n`;

        mensaje +=
            `💰 $${producto.precio.toLocaleString("es-AR")}\n\n`;

        total += producto.precio;
    });


    mensaje +=
        "━━━━━━━━━━━━━━━━\n";


    mensaje +=
        `💵 TOTAL: $${total.toLocaleString("es-AR")}\n\n`;


    mensaje +=
        "Hola! Quiero realizar este pedido.";


    // =================================================
    // CODIFICAR MENSAJE
    // =================================================

    const mensajeCodificado =
        encodeURIComponent(mensaje);


    // =================================================
    // LINK DE WHATSAPP
    // =================================================

    const url =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        mensajeCodificado;


    // =================================================
    // ABRIR WHATSAPP
    // =================================================

    window.location.href = url;
}


// =====================================================
// INICIAR CARRITO
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        actualizarCarrito();

    }
);
