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