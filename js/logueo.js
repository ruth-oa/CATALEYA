//logueo de usuario
document.getElementById("btn-login").addEventListener("click", function() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    // Obtener la lista de usuarios del almacenamiento local (localStorage)
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    // Buscar el usuario con el email y la contraseña proporcionados
    let usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.password === password);
    // Guardar el usuario en sesión (opcional)
    if (usuarioEncontrado) {
        sessionStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));
        alert("Inicio de sesión exitoso. ¡Bienvenido, " + usuarioEncontrado.nombre + "!");
        // Aquí puedes redirigir al usuario a otra página o realizar otras acciones
    } else {
        alert("Email o contraseña incorrectos. Por favor, intenta de nuevo.");
    }
    //cerrar modal
    loginModal.hide();
    actualizarInterfaz()
});

//cerrar sesion
document.getElementById("btn-logout").addEventListener("click", function() {
    // Eliminar el usuario de la sesión
    sessionStorage.removeItem("usuarioActual");
    actualizarInterfaz()
});

// Actualizar la interfaz de usuario según el estado de inicio de sesión
function actualizarInterfaz() {
    let usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));
    const datosUsuario = document.getElementById("datos-usuario");
    const btnLogout = document.getElementById("btn-logout");
    const btnLogin = document.getElementById("btn-open-login");
    const btnRegister = document.getElementById("btn-register")
    const main = document.querySelector("main");
    if (usuarioActual) {
        datosUsuario.textContent = "Usuario: " + usuarioActual.nombre;
        datosUsuario.classList.remove("oculto");
        btnLogout.classList.remove("oculto");
        btnLogin.classList.add("oculto");
        // main.classList.remove("oculto");

    } else {
        datosUsuario.textContent = "";
        datosUsuario.classList.add("oculto");
        btnLogout.classList.add("oculto");
        btnLogin.classList.remove("oculto");
        // main.classList.add("oculto");
    }
}
// Llamar a la función para actualizar la interfaz al cargar la página
document.addEventListener("DOMContentLoaded", actualizarInterfaz);

////// REGISTRO

//registar usuario
document.getElementById("btn-register").addEventListener("click", function() {
    let nuevoUsuario = {
        nombre: document.getElementById("registerName").value,
        email: document.getElementById("registerEmail").value,
        password: document.getElementById("registerPassword").value
    };
    const userconfirm = document.getElementById("confirmPassword").value;
    
    //Valiar de las contraseñas sean iguales
    if (nuevoUsuario.password !== userconfirm) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Obtener la lista de usuarios del almacenamiento local (localStorage) o inicializar un array vacío si no existe
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Agregar el nuevo usuario a la lista
    usuarios.push(nuevoUsuario);
    
    // Guardar el nuevo usuario en el almacenamiento local (localStorage)
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Bienvenido, " + nuevoUsuario.nombre + "!");

    // Limpiar los campos del formulario
    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("confirmPassword").value = "";

    // Cerrar el modal de registro y abrir el de login
    registerModal.hide();
    loginModal.show();
}); 


///// GENERAL

// Obtener los elementos de los botones y los modales
const btnOpenRegister = document.getElementById("btn-open-register");
const btnBackToLogin = document.getElementById("btn-back-to-login");

const loginModalElement = document.getElementById("loginModal");
const registerModalElement = document.getElementById("registerModal");

// Inicializar los modales de Bootstrap
const loginModal = new bootstrap.Modal(loginModalElement);
const registerModal = new bootstrap.Modal(registerModalElement);

// Evento para abrir el modal de registro y cerrar el de login
btnOpenRegister.addEventListener("click", () => {
  loginModal.hide(); // Oculta el modal de login
  registerModal.show(); // Muestra el modal de registro
});

// Evento para regresar al modal de login desde el de registro
btnBackToLogin.addEventListener("click", () => {
  registerModal.hide(); // Oculta el modal de registro
  loginModal.show(); // Muestra el modal de login
});
