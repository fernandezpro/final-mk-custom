import { arrayMarcadorasInicial } from "../baseDeDatos/baseDatos.js";
import { crearDivsMarcadoras } from "../funcionesGaleriaMarcadoras/funcionesGaleria.js";
import { actualizarBotonCompra } from "../funcionesCarrito/funcionesCarrito.js";
let arrayMarcadoras = arrayMarcadorasInicial;
/*
    Funcion que elimina todos los divs presentes de Marcadoras en la galeria, los que esten en
    el "arrayMarcadoras".
*/
function eliminarDivsMarcadoras() {
    for (let MarcadoraBuscado of arrayMarcadoras) {
        let divBuscado = document.getElementById(MarcadoraBuscado.id);
        divBuscado.remove();
    }
}
/*
    Agrega el evento de enviar al formulario que filtra los productos por tipo.
*/
function agregarEventotipo(carrito) {
    let boton = document.getElementById("filtrar");
    boton.onclick = (e) => {
        let formulario = document.getElementById("formulario");
        let form = new FormData(formulario);
        e.preventDefault();
        let tipoSeleccionado = (form.get("tipo"));
        if (tipoSeleccionado != null) {
            let galeria = document.querySelector("#galeria");
            galeria.style.opacity = "0";
            setTimeout(filtrarPortipo, 800, tipoSeleccionado, carrito);
        }
    }
}
/*
    Realiza la accion de crear un nuevo array solo con Marcadoras del tipo recibido por parametro
*/
function filtrarPortipo(tipo, carrito) {
    let nuevoArray = arrayMarcadorasInicial.filter(Marcadora => Marcadora.tipo == tipo);
    eliminarDivsMarcadoras();
    arrayMarcadoras = nuevoArray;
    crearDivsMarcadoras(nuevoArray, carrito);
    actualizarTodosLosBotones(nuevoArray, carrito);
}
/*
    Agrega el evento para reestablecer los Marcadoras sin ningun filtro.
*/
function agregarEventoReestablecer(carrito) {
    let botonReset = document.getElementById("reestablecer");
    botonReset.onclick = () => {
        let galeria = document.querySelector("#galeria");
        galeria.style.opacity = "0";
        setTimeout(function () {
            eliminarDivsMarcadoras();
            arrayMarcadoras = arrayMarcadorasInicial;
            crearDivsMarcadoras(arrayMarcadorasInicial, carrito);
            actualizarTodosLosBotones(arrayMarcadorasInicial, carrito);
        }, 700);
    }
}
/*
    Actualiza todos los botones de compra segun el carrito, o sea que va a decir "AGREGAR AL CARRITO"
    si no está, o "EN EL CARRITO" si está.
*/
function actualizarTodosLosBotones(cualquierArrayMarcadoras, carrito) {
    for (let Marcadora of cualquierArrayMarcadoras) {
        actualizarBotonCompra(Marcadora, carrito);
    }

}
/*
    Agrega al boton de ordenar, el evento correspondiente para que pueda realizar dicha accion.
*/
function agregarEventoOrdenar(carrito) {
    let botonOrdenar = document.getElementById("ordenar");
    botonOrdenar.onclick = (e) => {
        e.preventDefault();
        let galeria = document.querySelector("#galeria");
        galeria.style.opacity = "0";
        let orden = document.getElementById("select-orden").value;
        setTimeout(function () {
            switch (orden) {
                case "Menor a mayor precio":
                    ordenarMenorAMayor(carrito);
                    break;
                case "Mayor a menor precio":
                    ordenarMayorAMenor(carrito);
                    break;
                case "Alfabéticamente":
                    ordenarAlfabeticamente(carrito);
                    break;
            }
        }, 800);
    }
}
/*
    Utiliza arrayMarcadoras para ordenar por precio los Marcadoras , de MENOR a MAYOR precio.
*/
function ordenarMenorAMayor(carrito) {
    let nuevoArray = arrayMarcadoras;
    eliminarDivsMarcadoras();
    nuevoArray.sort((a, b) => a.precio - b.precio);
    crearDivsMarcadoras(nuevoArray, carrito);
    actualizarTodosLosBotones(nuevoArray, carrito);

}
/*
    Utiliza arrayMarcadoras para ordenar por precio los Marcadoras , de MAYOR a MENOR precio.
*/
function ordenarMayorAMenor(carrito) {
    let nuevoArray = arrayMarcadoras;
    eliminarDivsMarcadoras();
    nuevoArray.sort((a, b) => b.precio - a.precio);
    crearDivsMarcadoras(nuevoArray, carrito);
    actualizarTodosLosBotones(nuevoArray, carrito);
}
/*
    Funcion auxiliar para ordenar por nombre los Marcadoras.
*/
function SortArray(a, b) {
    return a.nombre.localeCompare(b.nombre);
}
/*
    Utiliza arrayMarcadoras para ordenar por orden alfabetico los Marcadoras.
*/
function ordenarAlfabeticamente(carrito) {
    let nuevoArray = arrayMarcadoras;
    eliminarDivsMarcadoras();
    nuevoArray = nuevoArray.sort(SortArray);
    crearDivsMarcadoras(nuevoArray, carrito);

    actualizarTodosLosBotones(nuevoArray, carrito);
}
export { agregarEventotipo, agregarEventoReestablecer, agregarEventoOrdenar, ordenarAlfabeticamente, arrayMarcadoras };