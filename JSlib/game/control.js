let control_gameKeys = [false, false, false];

function control_restartGame() {
	// TODO: Use cookies to remember game level.
	physics_stop();
	media_pauseMusic("music_background");
	media_stopMusic();
	media_loadAudio(game1_mediaFiles);
	graphics_resetSpikes(game1_spikes);
	graphics_resetBlocks(game1_blocks);
	trigger_resetTriggers(game1_triggers);
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
			return;
		case "KeyZ":
			control_gameKeys[0] = true;
			break;
		case "Comma":
			control_gameKeys[1] = true;
			control_gameKeys[2] = false;
			break;
		case "Period":
			control_gameKeys[2] = true;
			control_gameKeys[1] = false;
			break;
	}
}

function control_keyHandlerUp(event, gameKeyListenerUp) {
	switch (event.code) {
		case "Escape":
			document.removeEventListener("keyup", gameKeyListenerUp);
			media_stopMusic();
			media_clearMusicSources();
			let gameWindow = document.querySelector("#game_window");
			gameWindow.parentNode.removeChild(gameWindow);
			return;
		case "KeyZ":
			control_gameKeys[0] = false;
			break;
		case "Comma":
			control_gameKeys[1] = false;
			break;
		case "Period":
			control_gameKeys[2] = false;
			break;
		case "KeyR":
			control_restartGame(graphics_canvasSpikes, graphics_canvasBlocks, graphics_canvasChara);
			break;
	}
}
