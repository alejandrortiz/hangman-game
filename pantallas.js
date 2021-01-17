// Maneja la pantalla que se tiene que mostrar en cada momento.
function manejadorPantallas() {
    var form = document.getElementById("form");
    var game = document.getElementById("game");

    // En caso de que el formulario de inicio donde el usuario introduce su nombre, le da una clase u otra a los
    // diferentes elementos para ocultarlos o mostrarlos.
    if (!fullForm) {
        form.className = "visible";
        game.className = "oculto";
    } else {
        form.className = "oculto";
        game.className = "visible";
    }

}