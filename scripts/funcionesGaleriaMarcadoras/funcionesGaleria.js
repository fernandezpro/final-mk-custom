import { ordenarAlfabeticamente } from "../filtradoYOrden/filtradoYOrden.js";
import { crearProductoEnCarrito, actualizarBotonCompra, actualizarSubtotal } from "../funcionesCarrito/funcionesCarrito.js";
/*
    Crea los divs para cada Marcadora, segun su id, con todos sus elementos correspondientes,
    nombre,precio,imagen y un boton para agregar al carrito de compras.
*/
function crearDivsMarcadoras(arrayMarcadoras, carrito) {
    let galeria = document.querySelector("#galeria");
    galeria.style.opacity = "1";
    for (let Marcadora of arrayMarcadoras) {
        const { nombre, id, precio } = Marcadora;
        crearElementoDiv(id);
        agregarImagenMarcadora(id);
        agregarTituloMarcadora(id, nombre);
        agregarPrecioMarcadora(id, precio);
    }
    agregarBotonesComprar(arrayMarcadoras, carrito);

}
/*
    Crea un div cuyo id es el id del Marcadora que le corresponde.
*/
function crearElementoDiv(id) {
    let galeria = document.getElementById("galeria");
    let divMarcadora = document.createElement("div");
    divMarcadora.className = ("galeria__elemento");
    divMarcadora.setAttribute("id", id);
    galeria.appendChild(divMarcadora);
}
/*
    Agrega al div que tenga la id dada por parametro,el elemento img con la ruta
    de la imagen correspondiente y su clase.
*/
function agregarImagenMarcadora(id) {
    let ruta = `./styles/img/${id}.jpg`;
    let imagen = document.createElement("img");
    imagen.setAttribute("src", ruta);
    imagen.className = "galeria__elemento__img";
    document.getElementById((String(id))).append(imagen);
}
/*
    Agrega al div que tenga la id dada por parametro, el elemento h5 cuyo contenido es el
    nombre de Marcadora pasado por parametro con su clase.
*/
function agregarTituloMarcadora(id, nombre) {
    let elementoNombre = document.createElement("H5");
    elementoNombre.innerText = nombre;
    elementoNombre.className = "galeria__elemento__titulo";
    document.getElementById((String(id))).append(elementoNombre);
}
/*
    Agrega al div que tenga la id dada por parametro,el elemento h6 que va a mostrar
    el precio pasado por parametro, con la clase correspondiente
*/
function agregarPrecioMarcadora(id, precio) {
    let cadenaPrecio = `$${precio}ARS`;
    let elementoPrecio = document.createElement("H6");
    elementoPrecio.innerText = cadenaPrecio;
    elementoPrecio.className = "galeria__elemento__precio";
    document.getElementById((String(id))).append(elementoPrecio);
}
/*
    Crea todos los botones de compra de cada div y sus eventos correspondientes.
*/
function agregarBotonesComprar(arrayMarcadoras, carrito) {
    for (let Marcadora of arrayMarcadoras) {

        let idBoton = `${String(Marcadora.id)}_boton`;
        let boton = document.createElement("a");

        if (carrito.length > 0) {
            boton.innerText = (carrito.some(buscado => buscado.id == Marcadora.id)) ? "EN EL CARRITO" : "AGREGAR AL CARRITO";
        } else {
            boton.innerText = "AGREGAR AL CARRITO";
        }
        boton.className = "galeria__elemento__boton";
        boton.setAttribute("id", idBoton);

        boton.onclick = () => {
            let Marcadoraseleccionado = (arrayMarcadoras.find(producto => producto.id == (Marcadora.id)));
            let MarcadoraEstaEnCarrito = carrito.some(buscado => buscado.id == Marcadora.id);
            if (!MarcadoraEstaEnCarrito) {
                carrito.push(Marcadoraseleccionado);
                crearProductoEnCarrito(Marcadoraseleccionado, carrito);
                actualizarBotonCompra(Marcadoraseleccionado, carrito);
                actualizarSubtotal(carrito);
                mostrarToast("El producto ha sido agregado al carrito", true);
            }
            else {
                mostrarToast("El producto ya se encontraba agregado al carrito", false);
            }
        }
        document.getElementById((Marcadora.id)).append(boton);
    }
}
/*
    Crea y muestra un toast con el texto pasado por parametro.Si colorVerde es true,
    el toast tiene un fondo verde, si es false tiene un fondo rojo.
*/
function mostrarToast(texto, colorVerde) {
    let color = colorVerde ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, rgb(169, 10, 10), red)";
    Toastify({
        text: texto,
        duration: 2000,
        position: 'left',
        style: {
        background: color,
        }
    }).showToast();
}
export { crearDivsMarcadoras, mostrarToast };