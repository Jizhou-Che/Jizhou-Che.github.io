let control_gameKeys = [false, false, false];

function control_restartGame() {
	// TODO: Use cookies to remember game level.
	physics_stop();
	media_muteMusic("music_background");
	media_stopMusicSoft();
	media_loadAudio(game1_mediaFiles);
	graphics_resetMap(game1_map);
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
		let gameWindow = document.querySelector("#game_window");
		gameWindow.parentNode.removeChild(gameWindow);
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
	}
}

function control_keyHandlerUp(event, gameKeyListenerUp) {
	switch (event.code) {
		case "Escape":
			document.removeEventListener("keyup", gameKeyListenerUp);
			media_stopMusicHard();
			let gameWindow = document.querySelector("#game_window");
			gameWindow.parentNode.removeChild(gameWindow);
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
	}
}
