let control_gameWindow = null;

// KeyZ, Comma, Period.
let control_gameKeys = [false, false, false];
// KeyQ, KeyT, KeyP, ShiftLeft, ShiftRight, Slash.
let control_gameKeysCheat = [false, false, false, false, false, false];

let control_charaTeleportation = null;

let control_teleportationMode = null;
let control_invincibilityMode = null;

function control_createGame(gameWindow) {
	control_gameWindow = gameWindow;
	
	let gameInstructionsHeight = 50;
	if (gameWindow.clientWidth < gameConfig_minWidth || gameWindow.clientHeight < gameConfig_minHeight + gameInstructionsHeight) {
		let gameInstruction1 = document.createElement("span");
		gameInstruction1.innerHTML = "<pre>You found something, but your browser window is too small to display it.</pre>";
		let gameInstruction2 = document.createElement("span");
		gameInstruction2.innerHTML = "<pre>Press ESC to quit.</pre>";
		gameWindow.appendChild(gameInstruction1);
		gameWindow.appendChild(gameInstruction2);
		control_setKeyListenerError();
	} else {
		// Display game instructions.
		let gameInstruction = document.createElement("span");
		gameInstruction.innerHTML = "<pre>   <span id='keycap_jump' class='keycap_up'>Z</span>: Jump and Double Jump;   <span id='keycap_left' class='keycap_up'>,</span> and <span id='keycap_right' class='keycap_up'>.</span>: Move;   <span id='keycap_restart' class='keycap_up'>R</span>: Restart.   <span id='keycap_escape' class='keycap_up'>ESC</span>: Quit.</pre>";
		gameWindow.appendChild(gameInstruction);
		
		// Create game canvas.
		let gameHorizontalScale = Math.floor(gameWindow.clientWidth / (gameConfig_minWidth / 2));
		let gameVerticalScale = Math.floor((gameWindow.clientHeight -  gameInstructionsHeight) / (gameConfig_minHeight / 2));
		let gameScale = Math.min(gameHorizontalScale, gameVerticalScale);
		let gameWidth = (gameConfig_minWidth / 2) * gameScale;
		let gameHeight = (gameConfig_minHeight / 2) * gameScale;
		// Game background.
		let gameBackground = document.createElement("div");
		gameBackground.style.width = gameWidth + "px";
		gameBackground.style.height = gameHeight + "px";
		gameBackground.style.position = "relative";
		gameBackground.style.margin = "auto";
		gameBackground.style.backgroundColor = "black";
		gameWindow.appendChild(gameBackground);
		// Game canvas for spikes.
		graphics_canvasSpikes = document.createElement("canvas");
		graphics_canvasSpikes.setAttribute("width", gameWidth.toString());
		graphics_canvasSpikes.setAttribute("height", gameHeight.toString());
		graphics_canvasSpikes.style.position = "absolute";
		graphics_canvasSpikes.style.zIndex = "1";
		graphics_canvasSpikes.style.top = "0px";
		graphics_canvasSpikes.style.left = "0px";
		gameBackground.appendChild(graphics_canvasSpikes);
		// Game canvas for trap spikes.
		graphics_canvasTrapSpikes = document.createElement("canvas");
		graphics_canvasTrapSpikes.setAttribute("width", gameWidth.toString());
		graphics_canvasTrapSpikes.setAttribute("height", gameHeight.toString());
		graphics_canvasTrapSpikes.style.position = "absolute";
		graphics_canvasTrapSpikes.style.zIndex = "2";
		graphics_canvasTrapSpikes.style.top = "0px";
		graphics_canvasTrapSpikes.style.left = "0px";
		gameBackground.appendChild(graphics_canvasTrapSpikes);
		// Game canvas for blocks.
		graphics_canvasBlocks = document.createElement("canvas");
		graphics_canvasBlocks.setAttribute("width", gameWidth.toString());
		graphics_canvasBlocks.setAttribute("height", gameHeight.toString());
		graphics_canvasBlocks.style.position = "absolute";
		graphics_canvasBlocks.style.zIndex = "3";
		graphics_canvasBlocks.style.top = "0px";
		graphics_canvasBlocks.style.left = "0px";
		gameBackground.appendChild(graphics_canvasBlocks);
		// Game canvas for Chara.
		graphics_canvasChara = document.createElement("canvas");
		graphics_canvasChara.setAttribute("width", gameWidth.toString());
		graphics_canvasChara.setAttribute("height", gameHeight.toString());
		graphics_canvasChara.style.position = "absolute";
		graphics_canvasChara.style.zIndex = "4";
		graphics_canvasChara.style.top = "0px";
		graphics_canvasChara.style.left = "0px";
		gameBackground.appendChild(graphics_canvasChara);
		// Game canvas for animations.
		graphics_canvasAnimations = document.createElement("canvas");
		graphics_canvasAnimations.setAttribute("width", gameWidth.toString());
		graphics_canvasAnimations.setAttribute("height", gameHeight.toString());
		graphics_canvasAnimations.style.position = "absolute";
		graphics_canvasAnimations.style.zIndex = "5";
		graphics_canvasAnimations.style.top = "0px";
		graphics_canvasAnimations.style.left = "0px";
		gameBackground.appendChild(graphics_canvasAnimations);
		
		// Set graphics parameters.
		graphics_setSizeParameters();
		
		// Load sprites.
		graphics_loadSprites();
		
		// Set event listeners.
		control_setKeyListener();
		control_setMouseListener();
		
		// Register cheat indicators.
		graphics_registerInvincibilityIndicatorAnimation();
		graphics_registerTeleportationIndicatorAnimation();
		
		// Start game.
		control_restartGame();
	}
}

function control_restartGame() {
	// TODO: Use cookies to remember game level.
	physics_stop();
	media_muteMusic("music_background");
	media_stopMusicSoft();
	media_loadAudio(game1_mediaFiles);
	graphics_resetMap(game1_map);
	graphics_resetAnimations();
	graphics_registerSavePointsAnimation(game1_chara);
	trigger_resetTriggers(game1_triggers);
	trap_resetTraps();
	physics_start(game1_chara);
}

function control_setKeyListenerError() {
	document.addEventListener("keyup", control_keyListenerError);
}

function control_setKeyListener() {
	document.addEventListener("keydown", function gameKeyListenerDown(event) {
		control_keyHandlerDown(event, gameKeyListenerDown);
	});
	document.addEventListener("keyup", function gameKeyListenerUp(event) {
		control_keyHandlerUp(event, gameKeyListenerUp);
	});
}

function control_keyListenerError(event) {
	if (event.code === "Escape") {
		document.removeEventListener("keyup", control_keyListenerError);
		control_gameWindow.parentNode.removeChild(control_gameWindow);
	}
}

function control_keyHandlerDown(event, gameKeyListenerDown) {
	switch (event.code) {
		case "Escape":
			document.removeEventListener("keydown", gameKeyListenerDown);
			let keycap_escape = document.querySelector("#keycap_escape");
			keycap_escape.classList.remove('keycap_up');
			keycap_escape.classList.add('keycap_down');
			break;
		case "KeyZ":
			control_gameKeys[0] = true;
			let keycap_jump = document.querySelector("#keycap_jump");
			keycap_jump.classList.remove('keycap_up');
			keycap_jump.classList.add('keycap_down');
			break;
		case "Comma":
			control_gameKeys[1] = true;
			control_gameKeys[2] = false;
			let keycap_left = document.querySelector("#keycap_left");
			keycap_left.classList.remove('keycap_up');
			keycap_left.classList.add('keycap_down');
			break;
		case "Period":
			control_gameKeys[2] = true;
			control_gameKeys[1] = false;
			let keycap_right = document.querySelector("#keycap_right");
			keycap_right.classList.remove('keycap_up');
			keycap_right.classList.add('keycap_down');
			break;
		case "KeyR":
			let keycap_restart = document.querySelector("#keycap_restart");
			keycap_restart.classList.remove('keycap_up');
			keycap_restart.classList.add('keycap_down');
		case "KeyQ":
			control_gameKeysCheat[0] = true;
			break;
		case "KeyT":
			control_gameKeysCheat[1] = true;
			if (control_gameKeysCheat[2]) {
				control_teleportationMode = true;
			}
			break;
		case "KeyP":
			control_gameKeysCheat[2] = true;
			if (control_gameKeysCheat[1]) {
				control_teleportationMode = true;
			}
			break;
		case "ShiftLeft":
			control_gameKeysCheat[3] = true;
			break;
		case "ShiftRight":
			control_gameKeysCheat[4] = true;
			break;
		case "Slash":
			control_gameKeysCheat[5] = true;
			break;
	}
}

function control_keyHandlerUp(event, gameKeyListenerUp) {
	switch (event.code) {
		case "Escape":
			document.removeEventListener("keyup", gameKeyListenerUp);
			media_stopMusicHard();
			physics_stop();
			control_gameWindow.parentNode.removeChild(control_gameWindow);
			break;
		case "KeyZ":
			control_gameKeys[0] = false;
			let keycap_jump = document.querySelector("#keycap_jump");
			keycap_jump.classList.remove('keycap_down');
			keycap_jump.classList.add('keycap_up');
			break;
		case "Comma":
			control_gameKeys[1] = false;
			let keycap_left = document.querySelector("#keycap_left");
			keycap_left.classList.remove('keycap_down');
			keycap_left.classList.add('keycap_up');
			break;
		case "Period":
			control_gameKeys[2] = false;
			let keycap_right = document.querySelector("#keycap_right");
			keycap_right.classList.remove('keycap_down');
			keycap_right.classList.add('keycap_up');
			break;
		case "KeyR":
			control_restartGame(graphics_canvasSpikes, graphics_canvasBlocks, graphics_canvasChara);
			let keycap_restart = document.querySelector("#keycap_restart");
			keycap_restart.classList.remove('keycap_down');
			keycap_restart.classList.add('keycap_up');
			break;
		case "KeyQ":
			control_gameKeysCheat[0] = false;
			break;
		case "KeyT":
			control_gameKeysCheat[1] = false;
			control_teleportationMode = false;
			break;
		case "KeyP":
			control_gameKeysCheat[2] = false;
			control_teleportationMode = false;
			break;
		case "ShiftLeft":
			control_gameKeysCheat[3] = false;
			break;
		case "ShiftRight":
			control_gameKeysCheat[4] = false;
			break;
		case "Slash":
			control_gameKeysCheat[5] = false;
			break;
	}
}

function control_setMouseListener() {
	graphics_canvasAnimations.addEventListener("mouseup", function gameMouseListenerUp(event) {
		if (control_gameKeysCheat[1] && control_gameKeysCheat[2]) {
			if (!physics_charaKilled) {
				control_charaTeleportation = [event.offsetX, event.offsetY];
			}
		}
	});
}
