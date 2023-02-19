const obtenerMarcadoras = async () => {
    const response = await fetch('scripts/baseDeDatos/stock.json');
    let Marcadoras = await response.json();
    return Marcadoras;
};
let arrayMarcadorasInicial=(await obtenerMarcadoras());

export{arrayMarcadorasInicial};

