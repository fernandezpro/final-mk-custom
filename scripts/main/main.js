import { arrayMarcadorasInicial } from "../baseDeDatos/baseDatos.js";
import { setearEstadoCarrito,crearProductoEnCarrito ,actualizarBotonCompra,actualizarSubtotal} from "../funcionesCarrito/funcionesCarrito.js";
import {crearDivsMarcadoras} from "../funcionesGaleriaMarcadoras/funcionesGaleria.js";
import {agregarEventotipo, arrayMarcadoras,agregarEventoReestablecer, agregarEventoOrdenar, ordenarAlfabeticamente} from "../filtradoYOrden/filtradoYOrden.js";
let carrito=[];
let carritoEnLS=localStorage.getItem('Carrito');
if(carritoEnLS){
    carrito=JSON.parse(carritoEnLS);
}
function agregarReproduccionAutomaticaVideo(){
    let body=document.getElementById("body");
    let video=document.getElementById("video");
    video.play();
    body.onscroll=()=>{
        if(window.scrollY<150){
            video.play();
        }
    }
}


agregarReproduccionAutomaticaVideo();
setearEstadoCarrito(carrito,arrayMarcadoras);
crearDivsMarcadoras(arrayMarcadoras,carrito);
agregarEventotipo(carrito);
agregarEventoReestablecer(carrito);
agregarEventoOrdenar(carrito);



for(let producto of carrito){
    crearProductoEnCarrito(producto,carrito);
    actualizarBotonCompra(producto,carrito);
    actualizarSubtotal(carrito);
}