let articulosCarrito = [];

const listaProducto = document.querySelector("#listaProducto");
const contenedorCarrito = document.querySelector("#listaCarrito tbody");
const limpiarCarrito = document.querySelector("#limpiar-carrito");
const carrito = document.querySelector("#carrito");
const pagar = document.querySelector("#ir-a-pagar");

function añadirProducto(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains("agregarCarrito")) {
    const producto = evt.target.parentElement.parentElement;
    datosDelProducto(producto);
  }
}

function datosDelProducto(item) {
  const contenidoProducto = {
    imagen: item.querySelector("img").src,
    titulo: item.querySelector("h5").textContent,
    precio: item.querySelector("p").textContent,
    id: item.querySelector("a").getAttribute("id"),
    cantidad: 1,
  };
  if (articulosCarrito.some((product) => product.id === contenidoProducto.id)) {
    const productos = articulosCarrito.map((produc) => {
      if (produc.id === contenidoProducto.id) {
        let cantidad = parseInt(produc.cantidad);
        cantidad += 1;
        produc.cantidad = cantidad;
        return produc;
      } else {
        return produc;
      }
    });
    articulosCarrito = [...productos];
  } else {
    articulosCarrito = [...articulosCarrito, contenidoProducto];
  }
  diseñarCarritoHTML();
}

function diseñarCarritoHTML() {
  limpiarCarritoHTML();
  articulosCarrito.forEach((producto) => {
    const linea = document.createElement("tr");
    linea.innerHTML = `
        <th scope="row" > <img src="${producto.imagen}" class=" img-producto img-fluid rounded" /></th>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td><button type="button" class="btn-close btn-close-white borrar-producto" id="${producto.id}" aria-label="Close"></button></td>
        `;
    contenedorCarrito.appendChild(linea);
  });
  usarStorage();
}

function limpiarCarritoHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function limpiarCarritoStorage() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
  articulosCarrito = [];
  usarStorage();
}

function usarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

function eliminarProducto(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains("borrar-producto")) {
    const producto = evt.target.parentElement.parentElement;
    const productId = producto.querySelector("button").getAttribute("id");
    articulosCarrito = articulosCarrito.filter((prod) => prod.id !== productId);
    diseñarCarritoHTML();
  }
}

function irAPagar(event) {
  event.preventDefault(); 
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Algo salió mal, intenta nuevamente mas tarde!",
    footer: '<a href="#">Vuelve a la bodega</a>'
  });
  limpiarCarritoStorage();
}

listaProducto.addEventListener("click", añadirProducto);
limpiarCarrito.addEventListener("click", limpiarCarritoStorage);
carrito.addEventListener("click", eliminarProducto);
pagar.addEventListener("click", irAPagar);
window.addEventListener("DOMContentLoaded", () => {
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

  diseñarCarritoHTML();
});
