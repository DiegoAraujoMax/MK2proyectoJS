let articulosCarrito = [];


const listaProducto = document.querySelector("#listaProducto");
const contenedorCarrito = document.querySelector("#listaCarrito");


function añadirProducto(evt){
    evt.preventDefault()
    if(evt.target.classList.contains('agregarCarrito')){
        //console.log(evt.target.parentElement.parentElement)
        const producto = evt.target.parentElement.parentElement
        //console.log(producto)
        datosDelProducto(producto)
    }
}
function datosDelProducto(item){
    //console.log(item)
    const contenidoProducto= {
        imagen: item.querySelector('img').src,
        titulo: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        id: item.querySelector('a').getAttribute('id'),
        cantidad:1
    };
    if(articulosCarrito.some(product => product.id === contenidoProducto.id)){
        const productos = articulosCarrito.map( produc =>{
            if(produc.id === contenidoProducto.id){
                let cantidad = parseInt(produc.cantidad)
                cantidad+=1
                produc.cantidad = cantidad
                return produc
            }else{
                return produc
            }
        })
        articulosCarrito = [...productos]
    }else{
        //articulosCarrito.push(contenidoProducto)
        articulosCarrito = [...articulosCarrito,contenidoProducto]
    }
    //console.log(contenidoProducto);
   
console.log(articulosCarrito)
}


listaProducto.addEventListener('click', añadirProducto);