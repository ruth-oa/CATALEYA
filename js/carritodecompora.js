let carrito = [];

// Función que revisa si hay usuario logueado
function estaLogueado() {
  return sessionStorage.getItem("usuarioActual") ? true : false;
}

window.abrirModal = function() {
  document.getElementById('modalPago').style.display = "flex";
  actualizarResumenPago(); // esta función calcula el total
}

window.cerrarModal = function() {
  document.getElementById('modalPago').style.display = "none";
}

// Configuración de botones
document.querySelectorAll('.coleccion-item').forEach(item => {
  const btnAgregar = item.querySelector('.agregar-carrito');
  const nombre = item.querySelector('h3').textContent;
  const precio = parseFloat(item.querySelector('.price').textContent.replace(/[^\d.]/g,''));
  const imagen = item.querySelector('img').src;

  let cantidad = 1;
  const cantidadSpan = item.querySelector('.cantidad');

  // Controles de cantidad
  item.querySelector('.menos').addEventListener('click', () => {
    if(cantidad > 1) cantidad--;
    cantidadSpan.textContent = cantidad;
  });

  item.querySelector('.mas').addEventListener('click', () => {
    cantidad++;
    cantidadSpan.textContent = cantidad;
  });

  // Agregar al carrito
  btnAgregar.addEventListener('click', () => {
    if(!estaLogueado()){
      // Abrir modal login si no hay sesión
      const modal = new bootstrap.Modal(document.getElementById('loginModal'));
      modal.show();
      return;
    }

    // Si el producto ya existe en el carrito
    const existente = carrito.find(p => p.nombre === nombre);
    if(existente){
      existente.cantidad += cantidad;
    } else {
      carrito.push({ nombre, precio, imagen, cantidad });
    }

    // Reset cantidad
    cantidad = 1;
    cantidadSpan.textContent = 1;

    actualizarCarrito();
  });
});

// Función para actualizar carrito visualmente
function actualizarCarrito() {
  const carritoDiv = document.getElementById('carrito-items');
  carritoDiv.innerHTML = '';
  let total = 0;

  carrito.forEach((prod, i) => {
    const div = document.createElement('div');
    div.classList.add('carrito-item');
    div.innerHTML = `
      <img src="${prod.imagen}" style="width:50px;height:50px;">
      <div><strong>${prod.nombre}</strong> S/${prod.precio.toFixed(2)} x ${prod.cantidad}</div>
      <div>
        <button class="menosCarrito">-</button>
        <button class="masCarrito">+</button>
        <button class="eliminar">🗑️</button>
      </div>
    `;
    carritoDiv.appendChild(div);

    // Eventos botones
    div.querySelector('.menosCarrito').addEventListener('click', () => cambiarCantidad(i,-1));
    div.querySelector('.masCarrito').addEventListener('click', () => cambiarCantidad(i,1));
    div.querySelector('.eliminar').addEventListener('click', () => eliminarProducto(i));

    total += prod.precio * prod.cantidad;
  });

  document.getElementById('total').textContent = `Total: S/${total.toFixed(2)}`;
  document.getElementById('carrito').style.display = carrito.length ? 'block' : 'none';
}

function cambiarCantidad(i, delta){
  carrito[i].cantidad += delta;
  if(carrito[i].cantidad <= 0) carrito.splice(i,1);
  actualizarCarrito();
}

function eliminarProducto(i){
  carrito.splice(i,1);
  actualizarCarrito();
}

// Botón del carrito
const btnCart = document.getElementById('cart');
const carritoDiv = document.getElementById('carrito');

// Inicialmente oculto si está vacío
carritoDiv.style.display = carrito.length ? "block" : "none";

// Abrir / cerrar carrito con botón
btnCart.addEventListener('click', () => {
    if(carritoDiv.style.display === "none" || carritoDiv.style.display === ""){
        carritoDiv.style.display = "block"; // mostrar
    } else {
        carritoDiv.style.display = "none"; // ocultar
    }
});

// Botón "cerrar" dentro del carrito
document.querySelector('.cerrar-carrito').addEventListener('click', () => {
    carritoDiv.style.display = "none";
});

// Obtener todos los botones "Ver más"
document.querySelectorAll('.ver-mas').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.coleccion-item');
    const nombre = item.querySelector('h3').textContent;
    const precio = item.querySelector('.price').textContent;
    const imagen = item.querySelector('img').src;
    const descripcion = item.querySelector('p.text-muted')?.textContent || "Sin descripción";

    // Llenar el modal con los datos del producto
    document.getElementById('modalNombre').textContent = nombre;
    document.getElementById('modalPrecio').textContent = precio;
    document.getElementById('modalImagen').src = imagen;
    document.getElementById('modalDescripcion').textContent = descripcion;

    // Configurar botón "Agregar al carrito" dentro del modal
    const btnAgregar = document.getElementById('modalAgregarCarrito');
    btnAgregar.onclick = () => {
      const cantidad = parseInt(item.querySelector('.cantidad').textContent);
      agregarAlCarrito(nombre, parseFloat(precio.replace(/[^\d.]/g, '')), imagen, cantidad);
      // Opcional: cerrar modal automáticamente
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalProducto1'));
      modal.hide();
    };
  });
});

// Función que agrega productos al carrito (usa tu lógica existente)
function agregarAlCarrito(nombre, precio, imagen, cantidad) {
  let existente = carrito.find(p => p.nombre === nombre);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, imagen, cantidad });
  }
  actualizarCarrito();
}

function finalizarCompra() {
    const nombre = document.getElementById('nombreEnvio').value.trim();
    const direccion = document.getElementById('direccionEnvio').value.trim();
    const metodo = document.getElementById('metodoPago').value;

    if(!nombre || !direccion || !metodo){
        alert("Por favor completa todos los campos.");
        return;
    }

    // Limpiar carrito
    carrito = [];
    actualizarCarrito();

    // Cerrar modal de pago
    cerrarModal();

    // Mostrar mensaje de Gracias
    const graciasDiv = document.getElementById('graciasCompra');
    graciasDiv.style.display = 'block';

    // Ocultar después de 4 segundos
    setTimeout(() => {
        graciasDiv.style.display = 'none';
    }, 2000);
}