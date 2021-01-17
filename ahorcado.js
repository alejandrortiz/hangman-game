// Array con las palabras que se usarán para jugar.
var words = ["abuhado", "amover", "haiga", "jipiar", "mamporrero", "orate", "sapenco", "uebos", "vagido"];
var letters; // String que contiene las letras que estan dentro de la palabra seleccionada.
var lettersFails; // String donde se introduciran las letras que el usuario a fallado.
var wordSelect; // Palabra seleccionada en el array de palabras anterior.
var nombre; // Nombre que el usuario introduce por pantalla.
var fullForm = false;

// Al cargar la pantalla se iniciará los comandos introducidos.
window.onload = function () {
    init();
};

// Inicia algunas de las variables globales dejandolas vacias, e inciada las funciones de pintado.
function init() {
    letters = " ";
    lettersFails = "";
    // Selecciona aleatoriamente la palabra con la que se jugará la partida.
    wordSelect = aleatorio(0, words.length - 1);
    drawHagman();
    drawWord();
    // Inicializa tot a cero por si a habido alguna partida anterior.
    document.getElementById('letters_fail').innerHTML = ""; // Elemento que muestra las palabras erroneas.
    document.getElementById('button').removeAttribute("disabled"); // Activa el boton para enviar letras y procesarlas.
}

function checkLetter() {
    try {
        var letter = document.getElementById('letter'); // Letra introducida en el input.
        var element = document.getElementById('button'); // Elemento boton.

        // Comprueba que la letra introducida no haya sido ya introducida para no volver a contarla como error o acierto.
        if (letters.indexOf(letter.value) != -1 || lettersFails.indexOf(letter.value) != -1) {
            limpiar(letter);
            letter.focus();
            return;
        }

        // Comprueba si la letra introducida por el usuario esta en la palabra si esta la introduce en la variable que
        // guarda las letras que estan en la palabra.
        if (words[wordSelect].indexOf(letter.value) != -1) letters += letter.value;
        else fail(letter.value);

        // Llama a la funcion para pintar el dibujo del ahoracado.
        drawHagman();
        drawWord(); // Pinta la palabra a adivinar.
        limpiar(letter); // Limipia el input
        letter.focus(); // Le de el foco al input.
        // Si final devuelve 1 es que el jugador ha perdido.
        if (checkEnd() == 1) {
            element.setAttribute("disabled", ""); // Bloque el boton para no seguir jugando.
            alert("¡Has Perdido " + nombre + "!");
        } else if (checkEnd() == 2) { // Si devuelve 2 es que el jugador ha ganado.
            element.setAttribute("disabled", ""); // Bloque el boton para no seguir jugando.
            alert("¡Has Ganado " + nombre + "!");
        }
    } catch (err) {
        alert(err.message);
    }
}

// En caso de fallar lo introduce en el string de letras introducidas y falladas y lo pinta en el elemento HTML correspondiente.
function fail(letter) {
    lettersFails += letter;
    document.getElementById('letters_fail').innerHTML += letter + ",";
}

// Comprueba si hay final de partida.
function checkEnd() {
    // Si el string de letras falladas es igual a 6 significa que se ha completado el ahorcado por lo tanto el jugador a perdido.
    if (lettersFails.length == 6)
        return 1;
    // Comprueba si las letras de la palabra todas estan dentro del string que contiene las letras acertadas. Si no estan continua jugando.
    for (var i = 0; i < words[wordSelect].length; i++)
        if (letters.indexOf(words[wordSelect].charAt(i)) == -1) return 0;

    return 2;
}

// Pinta la palabra a adivinar.
function drawWord() {
    var element = document.getElementById('word');
    // Cada vez elimina lo que puediese tener dentro para no repetir la palabra muchas veces.
    element.innerHTML = "";

    // Pintal la palabra si las letras que selecciona con la posicion de 'i' estan dentro de las letras dichas pintará
    // la letra, y si no lo esta pintará un '_'.
    for (var i = 0; i < words[wordSelect].length; i++) {
        if (letters.indexOf(words[wordSelect].charAt(i)) != -1) element.innerHTML += " " + words[wordSelect].charAt(i);
        else element.innerHTML += "_ ";
    }
}

// Pinta el dibujo del ahorcado.
function drawHagman() {
    // Crea el elemento 'img'.
    var addImg = document.createElement('img');
    // En caso de existir algo dentro del elemento HTML con id img lo vacia.
    document.getElementById('img').innerHTML = "";
    // Dentro del elemento HTML con 'id' -> 'img' introduce un elemento hijo creado anteriormente.
    var img = document.getElementById('img').appendChild(addImg);

    // Introduce los atributos del enlace de la imagen, el title y el alt, de la imagen del ahorcado.
    img.setAttribute("src", "img/ahorcado_" + lettersFails.length + ".png");
    img.setAttribute("alt", "Ahorcado");
    img.setAttribute("title", "Ahorcado");
}

// Limpiar el input pasado por parametro.
function limpiar(elemento) {
    elemento.value = "";
}

// Devuelve un número aleatorio entre los dos números de los parametros.
function aleatorio(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
