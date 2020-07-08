$tablero = document.querySelector("#tablero");
$cuadros = $tablero.querySelectorAll(".cuadro");
$boton = document.querySelector("#boton");
$estado = document.querySelector("#estado");
$ronda = document.querySelector("#ronda");

$boton.onclick = iniciar;

let ronda = 0;
let usuario = [];
let maquina = [];
bloquearinput();


function actualizarEstado(s) {
	$estado.textContent = s;
}

function actualizarRonda(n) {
	$ronda.textContent = n;
}

function bloquearinput() {
	$cuadros.forEach(element => {
		element.onclick = "";
	});
}

function allowinput() {
	$cuadros.forEach(element => {
		element.onclick = userinput;
	});
}

function reiniciar() {
	usuario = [];
	maquina = [];
	ronda = 0;
}

function cuadroRandom() {
	return $cuadros[Math.floor(Math.random() * 4)];
}

function gameOver() {
	bloquearinput();
	actualizarEstado("Perdiste en " + ronda + " rondas. Toca 'Empezar' para jugar otra vez");
}

function resaltar(cuadro) {
	cuadro.style.opacity = 1;
	setTimeout(function () {
		cuadro.style.opacity = 0.5;
	}, 500);
}

function userinput(e) {
	$target = e.target;
	usuario.push($target);
	resaltar($target);

	const correcto = maquina[usuario.length - 1];

	if (correcto.id !== $target.id) {
		gameOver();
		return;
	}
	
	if (maquina.length == usuario.length) {
		bloquearinput();
		setTimeout(turno, 1000);
	}


}

function turno() {
	actualizarEstado("Turno de la maquina");
	bloquearinput();

	const $nuevocuadro = cuadroRandom();
	maquina.push($nuevocuadro);

	const retraso = (maquina.length + 1) * 1000;

	maquina.forEach(function (cuadro, index) {
		const timerM = (index + 1) * 1000;
		setTimeout(function () {
			resaltar(cuadro);
		}, timerM);
	});

	setTimeout(function () {
		actualizarEstado("Turno del jugador");
		allowinput();
	}, retraso);

	usuario = [];
	ronda++;
	actualizarRonda(ronda);


}

function iniciar() {
	reiniciar();
	bloquearinput();
	turno();
}

