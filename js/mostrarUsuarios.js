// document.addEventListener("DOMContentLoaded", function() {
//     const main = document.querySelector("main");
//     let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

//     // Crear la tabla
//     let tabla = document.createElement("table");
//     tabla.style.width = "100%";
//     tabla.style.borderCollapse = "collapse";

//     // Crear encabezado
//     let thead = document.createElement("thead");
//     let filaEncabezado = document.createElement("tr");
//     let thNombre = document.createElement("th");
//     thNombre.textContent = "Nombre";
//     thNombre.style.border = "1px solid #ccc";
//     let thCorreo = document.createElement("th");
//     thCorreo.textContent = "Correo";
//     thCorreo.style.border = "1px solid #ccc";
//     filaEncabezado.appendChild(thNombre);
//     filaEncabezado.appendChild(thCorreo);
//     thead.appendChild(filaEncabezado);
//     tabla.appendChild(thead);

//     // Crear cuerpo de la tabla
//     let tbody = document.createElement("tbody");
//     usuarios.forEach(usuario => {
//         let fila = document.createElement("tr");
//         let tdNombre = document.createElement("td");
//         tdNombre.textContent = usuario.nombre;
//         tdNombre.style.border = "1px solid #ccc";
//         let tdCorreo = document.createElement("td");
//         tdCorreo.textContent = usuario.email;
//         tdCorreo.style.border = "1px solid #ccc";
//         fila.appendChild(tdNombre);
//         fila.appendChild(tdCorreo);
//         tbody.appendChild(fila);
//     });
//     tabla.appendChild(tbody);

//     // Insertar la tabla en el main
//     main.appendChild(tabla);
// });