// Funci�n principal que se encarga de gestionar las llamadas a otras funciones y dem�s cosas respecto con el formulario del usuario.
function mainFormulario() {
    var element = document.getElementById('error');
    // Comprueba si el nombre cumple los requisitos y si es asi llama al manejador de pantallas para cambiar la pantalla.
    // Si no muestra el mensaje de error.
    if (comprobarNombre()) {
        manejadorPantallas();
    } else {
        element.innerHTML = "El nombre introducido no cumple los requisitos de formato. Debe tener m�nimo tres caracteres alfab�ticos (A-Z).";
    }
}

// Comprueba si el nombre cumple los requisitos.
function comprobarNombre() {
    // Expresion regular que permite un nombre con minimo 3 caracteres y que tan solo contenga caracteres alfabeticos.
    var expNombre = /^[A-Za-z������]{3,}$/;
    var valor = document.getElementById('name').value;

    if (comprobar(valor, expNombre)) {
        nombre = valor;
        fullForm = true;
        return true;
    }

    return false;
}

// Comprueba que el parametro cumpla lo de la expresi�n.
function comprobar(parametro, expresion) {
    return expresion.test(parametro);
}