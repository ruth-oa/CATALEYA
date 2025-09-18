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