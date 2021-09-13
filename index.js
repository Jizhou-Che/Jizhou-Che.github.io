window.onload = function() {
	// Define content scroll dictionary.
	let contentScrollDic = {
		content_1: [0.05, 0.4]
	};
	
	// Initialise animation dictionary.
	let animationDic = {};
	
	// Set up scroll event listener for window.
	let scrollLast = 0;
	let testScroll = document.querySelector("#test_scroll");
	window.onscroll = function() {
		let scroll = scroll_windowScrollPercent();
		let scrollDirection = scroll_windowScrollDirection(scroll, scrollLast);
		scrollLast = scroll;
		testScroll.innerHTML = "Scroll: " + scroll + ". Scroll Direction: " + scrollDirection + ".";
		renderContent(contentScrollDic, scroll, scrollDirection, animationDic);
	}
	
	// Set up animation for hiding renovation notice.
	let renovations = document.querySelector("#renovations");
	let hideRenovations = document.querySelector("#hide_renovations");
	hideRenovations.onclick = function() {
		hideRenovations.onclick = null;
		animate_setAnimation(animationDic, "hide_renovations", renderHideRenovations, [renovations], timing_linear, 150, 0, 1, null);
		animate(animationDic, "hide_renovations");
	}
	
	// Set up animation for content cells.
	for (contentID in contentScrollDic) {
		let cellsRight = document.querySelectorAll("#" + contentID + " " + ".content_col_right" + " > " + ".content_cell");
		for (let i = 0; i < cellsRight.length; i++) {
			animate_setAnimation(animationDic, contentID + "_right_cell_" + i, renderShowCell, [cellsRight[i]], timing_convexCircle, 500, 0, 1, null);
		}
	}
	
	// Test animation.
	let blockBlue = document.querySelector("#block_blue");
	animate_setAnimation(animationDic, "block_blue_hide", renderHideBlock, [blockBlue], timing_power, 1000, 0, 1, null);
	blockBlue.onclick = function() {
		animate(animationDic, "block_blue_hide");
		if (animationDic["block_blue_hide"][5] > 0) {
			animate_setAnimationDirection(animationDic, "block_blue_hide", -1);
		} else {
			animate_setAnimationDirection(animationDic, "block_blue_hide", 1);
		}
	}
	
	// Test game.
	let renovationsText = document.querySelector("#renovations_text");
	renovationsText.onclick = loadGame;
}

// Test animation.
function renderHideBlock(elements, progress) {
	for (i in elements) {
		elements[i].style.marginLeft = progress * 500 + "px";
	}
}

function renderHideRenovations(elements, progress) {
	for (i in elements) {
		let height = elements[i].offsetHeight;
		elements[i].style.marginTop = (0 - height * progress) + "px";
	}
}

function renderShowCell(elements, progress) {
	for (i in elements) {
		elements[i].style.opacity = progress;
		elements[i].style.marginLeft = 20 - 20 * progress + "px";
	}
}

function renderContent(contentScrollDic, scroll, scrollDirection, animationDic) {
	let frame = requestAnimationFrame(function renderFrame(timeNow) {
		for (contentID in contentScrollDic) {
			let content = document.querySelector("#" + contentID);
			if (scroll >= contentScrollDic[contentID][0] && scroll <= contentScrollDic[contentID][1]) {
				// Content is within window.
				let contentScrollPercent = scroll_tangent(scroll, contentScrollDic[contentID][0], contentScrollDic[contentID][1]);
				// Render content block.
				content.style.top = (window.innerHeight - (window.innerHeight + content.offsetHeight) * contentScrollPercent) + "px";
				content.style.opacity = 1 - Math.abs(2 * contentScrollPercent - 1);
				// Animate content children.
				let cellsRight = document.querySelectorAll("#" + contentID + " " + ".content_col_right" + " > " + ".content_cell");
				if (scrollDirection > 0) {
					for (let i = 0; i < cellsRight.length; i++) {
						if (contentScrollPercent > 0.4 + 0.15 * (i / cellsRight.length)) {
							let animationID = contentID + "_right_cell_" + i;
							animate_setAnimationDirection(animationDic, animationID, 1);
							animate(animationDic, animationID);
						}
					}
				} else {
					for (let i = 0; i < cellsRight.length; i++) {
						if (contentScrollPercent < 0.4 + 0.15 * (i / cellsRight.length)) {
							let animationID = contentID + "_right_cell_" + i;
							animate_setAnimationDirection(animationDic, animationID, -1);
							animate(animationDic, animationID);
						}
					}
				}
			} else {
				content.style.top = "100%";
			}
		}
	});
}

function loadGame() {
	let gameWindow = document.createElement("div");
	gameWindow.setAttribute("id", "game_window");
	gameWindow.style.width = "100%";
	gameWindow.style.height = "100%";
	gameWindow.style.top = "0px";
	gameWindow.style.backgroundColor = "gray";
	gameWindow.style.position = "fixed";
	document.body.appendChild(gameWindow);
	
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
		
		// Display game canvas.
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
		
		// Set event listeners.
		control_setKeyListener();
		control_setMouseListener();
		
		// Start game.
		control_restartGame();
	}
}
