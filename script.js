function dividirNumeros() {
    let columnas = [];
    let inicio = 1;

    for (let letra = "B".charCodeAt(0); letra <= "O".charCodeAt(0); letra++) {
        let columna = [];
        for (let i = inicio; i <= inicio + 14; i++) {
            columna.push(i);
        }
        columnas.push(columna);
        inicio += 15;
    }
    return columnas;
}

function crearCeldas() {
    let numerosPorColumna = dividirNumeros();

    for (let i = 0; i < 5; i++) {
        let columna = numerosPorColumna[i];
        let filaId = "fila" + (i + 1);
        let filaElement = document.getElementById(filaId);

        for (let j = 0; j < columna.length; j++) {
            let cell = document.createElement("td");
            cell.id = `n${columna[j]}`;
            cell.textContent = columna[j];
            filaElement.appendChild(cell);
        }
    }
}
let generados = [];
let mostrables = [];

function generarValor() {
    let min = Math.ceil(1);
    let max = Math.floor(76);
    let letras = ["B", "I", "N", "G", "O"];

    while (true) {
        console.log(mostrables);
        let valor = Math.floor(Math.random() * (max - min) + min);

        if (!generados.includes(valor)) {
            let cell = document.getElementById(`n${valor}`);
            cell.style.backgroundColor = "yellow";
            cell.style.color = "black";
            generados.push(valor);
            if (mostrables.length >= 5) {
                mostrables.shift();
            }
            mostrables.push(setFormato(valor, letras));
            return setFormato(valor, letras);
        }
        if (generados.length === 75) {
            alert("Ya se han jugado todos los numeros");
            return;
        }
    }
}

function setFormato(valor, letras) {
    if (valor < 16) {
        return `${letras[0]}${valor}`;
    } else if (valor >= 16 && valor <= 30) {
        return `${letras[1]}${valor}`;
    } else if (valor >= 31 && valor <= 45) {
        return `${letras[2]}${valor}`;
    } else if (valor >= 46 && valor <= 60) {
        return `${letras[3]}${valor}`;
    } else if (valor >= 61 && valor <= 75) {
        return `${letras[4]}${valor}`;
    }
}
// funcion para mostrar los valores =============================================================================================================================
function mostrarValor() {
    let texto = document.getElementById("valorGenerado");
    texto.textContent = generarValor();
    valores();
}
// funcion para mostrar los valores =============================================================================================================================

let interval;
function autoGen() {
    if (!interval) {
        interval = setInterval(() => {
            if (generados.length === 75) {
                clearInterval(interval);
                interval = null;
            }
            mostrarValor();
        }, 2000);
    }
}
function stopGen() {
    clearInterval(interval);
    interval = null;
}
// alerta==========================================================================================================================================================
// function confirmReset() {
//     Swal.fire({
//         title: "Estas seguro?",
//         text: "No podras revertir esta accion!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Si, Reinicialo!",
//         cancelButtonText: "Cancelar",
//     }).then((result) => {
//         if (result.isConfirmed) {
//             reset();
//             Swal.fire(
//                 "Reiniciado!",
//                 "Tu juego ha sido reiniciado!.",
//                 "success"
//             );
//         }
//     });
// }
// fin de la alerta=================================================================================================================================================
function reset() {
    for (let x = 0; x < generados.length; x++) {
        let cell = document.getElementById(`n${generados[x]}`);
        cell.style.backgroundColor = "transparent";
        cell.style.color = "rgb(252, 247, 189)";
    }
    let valor = document.getElementById("valorGenerado");
    let mostrable = document.getElementById("mostrar");
    mostrable.innerHTML = null;
    valor.textContent = null;
    generados = [];
    mostrables = [];
}
function valores() {
    let mostrable = document.getElementById("mostrar");
    mostrable.innerHTML = null;
    for (let x = 0; x < mostrables.length; x++) {
        let div = document.createElement("div");
        div.textContent = mostrables[x];
        mostrable.appendChild(div);
    }
}
function targetCells() {
    let div = document.getElementById("patron");
    div.innerHTML = null;
    for (let i = 0; i < 5; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 5; j++) {
            let cell = document.createElement("td");
            cell.id = `c${i}${j}`
            cell.style.width = "40px";
            cell.style.height = "40px";
            cell.style.backgroundColor = "yellow";
            cell.onclick = cambiarColor.bind(null, cell);
            cell.onmouseover = function () {
                this.style.cursor = "pointer";
                this.style.transition = "background-color 0.3s";
            };
            row.appendChild(cell);
        }
        div.appendChild(row);
    }
}
function cambiarColor(celda) {
    if (celda.style.backgroundColor === "green") {
        celda.style.backgroundColor = "yellow";
    } else {
        celda.style.backgroundColor = "green";
    }
}
function clearCells(){
    for (let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            cell = document.getElementById(`c${i}${j}`);
            cell.style.backgroundColor = "yellow";
        }
    }
}

window.onload = () => {
    crearCeldas(), targetCells();
};
