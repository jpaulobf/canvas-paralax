
var bgCanvas0 		= null;
var bgCanvas1 		= null;
var bgCanvasN 		= null;
var bgCanvas2 		= null;
var ctx1      		= null;
var ctx2      		= null;
var ctxN      		= null;

var imageTile		= null;
var imageTileN      = null;
var tileWH          = 32;
var tilePX          = 10;
var tilePY          = 7;
var offsetL         = 2;
var offsetR         = 2;

var tileMap1 = [[0,0,0,0,0,0,0], //1
			   [0,0,0,0,0,0,0], //2
			   [0,0,0,0,0,0,0], //3
			   [0,0,0,0,0,0,0], //4
			   [0,0,0,0,0,0,0], //5
			   [0,0,0,0,0,0,0], //6
			   [0,0,0,0,0,0,0], //7
			   [0,0,0,0,0,0,0], //8
			   [0,0,0,0,0,0,0], //9
			   [0,9,0,0,0,0,0], //10
			   [0,10,0,0,0,0,0], //11
			   [0,0,0,0,0,0,0], //12
			   [0,0,0,0,0,0,0], //13
			   [0,0,0,0,0,0,0], //14
			   [0,0,0,0,0,0,0], //15
			   [0,0,0,0,0,0,0], //16
			   [0,0,0,0,0,0,0], //17
			   [0,0,0,0,0,0,0], //18
			   [0,0,0,0,0,0,0], //19
			   [0,0,0,0,0,0,0], //20
			   [0,0,0,0,0,0,0], //21
			   [0,0,0,0,0,0,0],  ]; //22

var tileMapN = [[0,0,0,0,0,0,0], //1
				[0,1,0,0,0,0,0], //2
				[0,2,0,0,0,0,0], //3
				[0,3,0,0,0,0,0], //4
				[0,4,0,0,0,0,0], //5
				[0,5,0,0,0,0,0], //6
				[0,6,0,0,0,0,0], //7
				[0,7,0,0,0,0,0], //8
				[0,8,0,0,0,0,0], //9
				[0,9,0,0,0,0,0], //10
				[0,10,0,0,0,0,0], //11
				[0,11,0,0,0,0,0], //12
				[0,12,0,0,0,0,0], //13
				[0,13,0,0,0,0,0], //14
				[0,14,0,0,0,0,0], //15
				[0,15,0,0,0,0,0], //16
				[0,16,0,0,0,0,0], //17
				[0,17,0,0,0,0,0], //18
				[0,18,0,0,0,0,0], //19
				[0,19,0,0,0,0,0], //20
				[0,20,0,0,0,0,0], //21
				[0,0,0,0,0,0,0],  ]; //22

var tileMap2 = [[0,0,0,0,0,0,0], //1
			   [0,0,0,0,0,0,0], //2
			   [0,1,0,0,0,0,0], //3
			   [0,0,0,0,0,0,0], //4
			   [0,2,0,0,0,0,0], //5
			   [0,0,0,0,0,0,0], //6
			   [0,0,0,0,0,0,0], //7
			   [0,0,0,0,0,0,0], //8
			   [6,7,0,0,0,0,0], //9
			   [0,0,0,0,0,0,0], //10
			   [0,0,11,0,0,0,0], //11
			   [0,3,0,0,0,0,0], //12
			   [0,0,0,0,0,0,0], //13
			   [0,0,13,0,0,0,0], //14
			   [0,0,14,0,0,0,0], //15
			   [0,0,0,0,0,0,0], //16
			   [0,0,0,0,0,0,0], //17
			   [6,7,0,0,0,0,0], //18
			   [0,0,0,0,0,0,0], //19
			   [0,0,3,0,0,0,0], //20
			   [0,0,0,0,0,0,0], //21
			   [0,0,0,0,0,0,0],  ]; //22

var direction           = "L"; //L = Left | R = Right
var velocity1           = 0; //velocidade
var displacement1       = 0.0; //pixel
var velocity2           = 2; //velocidade
var displacement2       = 0.2; //pixel
var velocityN           = 1; //velocidade
var displacementN       = 0.06; //pixel

var currentPosition1    = 0;
var columnPosition1     = Math.floor(currentPosition1 / tileWH);
var currentPosition2     = 0;
var columnPosition2      = Math.floor(currentPosition2 / tileWH);
var currentPositionN     = 0;
var columnPositionN      = Math.floor(currentPositionN / tileWH);
var currentPositionMax  = (tileMap2.length * tileWH) - (tilePX + offsetL + offsetR) * tileWH;
var dps1                = velocity1 * displacement1; //deslocamento por segundo
var dps2                = velocity2 * displacement2; //deslocamento por segundo
var dpsN                = velocityN * displacementN; //deslocamento por segundo

function init() {

	bgCanvas0 = document.getElementById("bg-canvas-0");
	bgCanvas1 = document.getElementById("bg-canvas-1");
	bgCanvasN = document.getElementById("bg-canvas-N");
	bgCanvas2 = document.getElementById("bg-canvas-2");
	ctx1      = bgCanvas1.getContext("2d");
	ctx2      = bgCanvas2.getContext("2d");
	ctxN      = bgCanvasN.getContext("2d");

	imageTile	                  	= new Image();
	imageTile.src                  	= "./images/tiles.gif";
	imageTileN                  	= new Image();
	imageTileN.src                  = "./images/tiles2.png";
	bgCanvas0.style.backgroundColor = "rgb(68,183,230)";
	bgCanvas0.style.border          = "1px solid black";
	bgCanvas1.style.border          = "1px solid black";
	bgCanvasN.style.border          = "1px solid black";
	bgCanvas2.style.border          = "1px solid black";


	gameloop();
}

function render1() {
  //renderiza os tiles da tela e 2 offsets para a esquerda e 2 offsets para a direita
  for (var px = 0 + columnPosition1; px < (tilePX + offsetL + offsetR + columnPosition1); px++) {
	for (var py = 0; py < tileMap1[px].length; py++) {
		//imprime o tile

		if (tileMap1[px][py] != 0) {
		  ctx1.drawImage(imageTile,
						tileMap1[px][py] * tileWH,
						0,
						tileWH,
						tileWH,
						(px * tileWH) - (offsetL * tileWH) - Math.floor(currentPosition1),
						py * tileWH,
						tileWH,
						tileWH);
		}
	}
  }
}

function renderN() {
  //verifica o inversor
  inversor = (direction == "L")?1:-1;
  ctxN.clearRect(0, 0, bgCanvasN.width, bgCanvasN.height);

  //renderiza os tiles da tela e 2 offsets para a esquerda e 2 offsets para a direita
  for (var px = 0 + columnPositionN; px < (tilePX + offsetL + offsetR + columnPositionN); px++) {
	for (var py = 0; py < tileMapN[px].length; py++) {
		if (tileMapN[px][py] != 0) {
		  //imprime o tile
		  ctxN.drawImage(imageTileN,
										  tileMapN[px][py] * tileWH,
										  0,
										  tileWH,
										  tileWH,
										  (px * tileWH) - (offsetL * tileWH) - Math.floor(currentPositionN),
										  py * tileWH,
										  tileWH,
										  tileWH);
	  }
	}
  }

  if (inversor == 1) {
	if (currentPositionN < currentPositionMax) {
	  columnPositionN = Math.floor(currentPositionN / tileWH);
	  currentPositionN += dpsN;
	} else {
	  currentPositionN = currentPositionMax;
	}
  } else {
	if (currentPositionN > 0) {
	  columnPositionN = Math.floor(currentPositionN / tileWH);
	  currentPositionN += (dpsN * inversor);
	} else {
	  currentPositionN = 0;
	}
  }
}

function render2() {
  //verifica o inversor
  inversor = (direction == "L")?1:-1;
  ctx2.clearRect(0, 0, bgCanvas2.width, bgCanvas2.height);

  //renderiza os tiles da tela e 2 offsets para a esquerda e 2 offsets para a direita
  for (var px = 0 + columnPosition2; px < (tilePX + offsetL + offsetR + columnPosition2); px++) {
	for (var py = 0; py < tileMap2[px].length; py++) {
		if (tileMap2[px][py] != 0) {
		  //imprime o tile
		  ctx2.drawImage(imageTile,
										  tileMap2[px][py] * tileWH,
										  0,
										  tileWH,
										  tileWH,
										  (px * tileWH) - (offsetL * tileWH) - Math.floor(currentPosition2),
										  py * tileWH,
										  tileWH,
										  tileWH);
	  }
	}
  }

  if (inversor == 1) {
	if (currentPosition2 < currentPositionMax) {
	  columnPosition2 = Math.floor(currentPosition2 / tileWH);
	  currentPosition2 += dps2;
	} else {
	  currentPosition2 = currentPositionMax;
	}
  } else {
	if (currentPosition2 > 0) {
	  columnPosition2 = Math.floor(currentPosition2 / tileWH);
	  currentPosition2 += (dps2 * inversor);
	} else {
	  currentPosition2 = 0;
	}
  }

  document.getElementById("velocidade").innerHTML = "Velocidade: " + velocity2;
  document.getElementById("posicao").innerHTML = "Posi????o: " + Math.round(currentPosition2);
}

function gameloop() {
  render1();
  renderN();
  render2();
  window.requestAnimationFrame(gameloop);
}

function invertInversor() {
  direction = (direction == "L")?"R":"L";
}

function speed(value) {
  if (value < 0) { //negativo
	if (velocity2 > 0) {
	  velocity2 += value;
	}
  } else {
	if (velocity2 < 100) {
	  velocity2 += value;
	}
  }

  dps2 = velocity2 * displacement2;
}