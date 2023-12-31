class TresEnRayaGUI {
    constructor() {
        this.inicializarTablero();
        this.crearTableroHTML();
        this.jugadorActual = "X";
    }

    inicializarTablero() {
        this.tablero = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    }

    crearTableroHTML() {
        const tableroDiv = document.getElementById("tablero");
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const casilla = document.createElement("div");
                casilla.className = "casilla";
                casilla.dataset.fila = i;
                casilla.dataset.columna = j;
                casilla.addEventListener("click", () => this.hacerMovimiento(i, j));
                tableroDiv.appendChild(casilla);
            }
        }
    }

    hacerMovimiento(fila, columna) {
        if (this.tablero[fila][columna] === ' ') {
            this.tablero[fila][columna] = this.jugadorActual;
            this.actualizarTableroHTML();

            if (this.verificarGanador()) {
                alert(`¡El ganador es el jugador ${this.jugadorActual}!`);
                this.reiniciarJuego();
            } else if (this.esEmpate()) {
                alert("¡Es un empate!");
                this.reiniciarJuego();
            } else {
                this.jugadorActual = this.jugadorActual === 'X' ? 'O' : 'X';
            }
        }
    }

    actualizarTableroHTML() {
        const casillas = document.querySelectorAll('.casilla');
        casillas.forEach(casilla => {
            const fila = casilla.dataset.fila;
            const columna = casilla.dataset.columna;
            casilla.textContent = this.tablero[fila][columna];
        });
    }

    verificarGanador() {
        for (let i = 0; i < 3; i++) {
            if (
                (this.tablero[i][0] === this.jugadorActual && this.tablero[i][1] === this.jugadorActual && this.tablero[i][2] === this.jugadorActual) ||
                (this.tablero[0][i] === this.jugadorActual && this.tablero[1][i] === this.jugadorActual && this.tablero[2][i] === this.jugadorActual)
            ) {
                return true;
            }
        }

        if (
            (this.tablero[0][0] === this.jugadorActual && this.tablero[1][1] === this.jugadorActual && this.tablero[2][2] === this.jugadorActual) ||
            (this.tablero[0][2] === this.jugadorActual && this.tablero[1][1] === this.jugadorActual && this.tablero[2][0] === this.jugadorActual)
        ) {
            return true;
        }

        return false;
    }

    esEmpate() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.tablero[i][j] === ' ') {
                    return false; // Todavía hay casillas vacías, no es empate
                }
            }
        }
        return true; // No hay casillas vacías, es un empate
    }

    reiniciarJuego() {
        const reiniciar = confirm("¿Deseas reiniciar el juego?");
        if (reiniciar) {
            this.inicializarTablero();
            this.actualizarTableroHTML();
            this.jugadorActual = "X";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const juego = new TresEnRayaGUI();
    const reiniciarBtn = document.getElementById("reiniciarBtn");
    reiniciarBtn.addEventListener("click", () => juego.reiniciarJuego());
});
