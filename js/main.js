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
  let totalPagar = 0;
  articulosCarrito.forEach((producto) => {
      const precio = parseFloat(producto.precio.replace('$', ''));
      totalPagar += precio * parseInt(producto.cantidad);
      const linea = document.createElement("tr");
      linea.innerHTML = `
          <th scope="row"> <img src="${producto.imagen}" class="img-producto img-fluid rounded" /></th>
          <td>${producto.titulo}</td>
          <td>${producto.precio}</td>
          <td>${producto.cantidad}</td>
          <td><button type="button" class="btn-close btn-close-white borrar-producto" id="${producto.id}" aria-label="Close"></button></td>
      `;
      contenedorCarrito.appendChild(linea);
  });
  const totalPagarElement = document.getElementById("totalPagar");
  totalPagarElement.textContent = totalPagar.toFixed(2);
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
    const productId = evt.target.getAttribute("id");
    const productoIndex = articulosCarrito.findIndex(prod => prod.id === productId);
    if (productoIndex !== -1) {
      if (articulosCarrito[productoIndex].cantidad > 1) {
        articulosCarrito[productoIndex].cantidad -= 1;
      } else {
        articulosCarrito.splice(productoIndex, 1);
      }
      diseñarCarritoHTML();
    }
  }
}

function irAPagar(event) {
  event.preventDefault(); 
  if (articulosCarrito.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No hay productos en el carrito",
      footer: '<a href="#">Vuelve a la bodega</a>'
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salió mal, intenta nuevamente mas tarde!",
      footer: '<a href="#">Vuelve a la bodega</a>'
    });
    limpiarCarritoStorage();
  }
}

const footerLinks = document.querySelectorAll("footer a");
footerLinks.forEach(link => {
  link.addEventListener("click", mostrarSweetAlert);
});

function mostrarSweetAlert(event) {
  event.preventDefault(); 
  Swal.fire({
    title: "😦",
    text: "Lo sentimos, aún estamos creando nuestras redes",
    icon: "info"
  });
}

function diseñarProductos(productos){
  const contenido = document.querySelector('#listadoProducto');
  let html= "";
  productos.forEach((item)=>{
    html += `
    <div class="col card" style="width: 18rem;">
      <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
      <div class="card-body">
        <h5 class="card-title">${item.nombre}</h5>
        <small class="card-text">Precio:</small>
        <p class="card-text text-muted mb-1">$${item.precio}</p>
        <a href="#" class="btn btn-dark agregarCarrito" id="${item.id}">Añadir</a>
      </div>
    </div>
    `;
  });
  contenido.innerHTML = html;
}

limpiarCarrito.addEventListener("click", () => {
  limpiarCarritoHTML();
  const totalPagarElement = document.getElementById("totalPagar");
  totalPagarElement.textContent = "0.00";
});

listaProducto.addEventListener("click", añadirProducto);
carrito.addEventListener("click", eliminarProducto);
pagar.addEventListener("click", irAPagar);
window.addEventListener("DOMContentLoaded", () => {
  fetch('data/productos.json')
      .then((respuesta) => {
          return respuesta.json()
      })
      .then(data => {
          diseñarProductos(data.productos)
      })
      .catch(err => {
          console.log(err)
          return Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo salió mal al cargar los productos",
          });
      })
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  diseñarCarritoHTML();
});
