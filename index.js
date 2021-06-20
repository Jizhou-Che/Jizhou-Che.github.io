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
	let gameMinWidth = 800;
	let gameMinHeight = 500;
	if (gameWindow.clientWidth < gameMinWidth || gameWindow.clientHeight < gameMinHeight + gameInstructionsHeight) {
		let gameInstruction1 = document.createElement("span");
		gameInstruction1.innerHTML = "<pre>You found something, but your window is too small to display it.</pre>";
		let gameInstruction2 = document.createElement("span");
		gameInstruction2.innerHTML = "<pre>Press ESC to quit.</pre>";
		gameWindow.appendChild(gameInstruction1);
		gameWindow.appendChild(gameInstruction2);
		document.addEventListener("keyup", gameKeyListenerError);
	} else {
		// Display game instructions.
		let gameInstruction = document.createElement("span");
		gameInstruction.innerHTML = "<pre>ESC: Quit;   R: Restart;   Z: Jump and Double Jump;   Left and Right Arrows: Move.</pre>";
		gameWindow.appendChild(gameInstruction);
		
		// Display game canvas.
		let gameBackground = document.createElement("div");
		let gameHorizontalScale = Math.floor(gameWindow.clientWidth / (gameMinWidth / 2));
		let gameVerticalScale = Math.floor((gameWindow.clientHeight -  gameInstructionsHeight) / (gameMinHeight / 2));
		let gameScale = Math.min(gameHorizontalScale, gameVerticalScale);
		gameBackground.style.width = (gameMinWidth / 2) * gameScale + "px";
		gameBackground.style.height = (gameMinHeight / 2) * gameScale + "px";
		gameBackground.style.margin = "auto";
		gameBackground.style.backgroundColor = "black";
		gameWindow.appendChild(gameBackground);
		
		// Test keys.
		let gameKeyTest = document.createElement("span");
		gameKeyTest.setAttribute("id", "game_key_test");
		gameWindow.appendChild(gameKeyTest);
		
		// Set key event listeners.
		// Key status for "w", "a" and "d" respectively.
		let gameKeys = [0, 0, 0];
		document.addEventListener("keydown", function gameKeyListenerDown(event) {
			gameKeyHandlerDown(event, gameKeys, gameKeyListenerDown);
		});
		document.addEventListener("keyup", function gameKeyListenerUp(event) {
			gameKeyHandlerUp(event, gameKeys, gameKeyListenerUp);
		});
	}
	// TODO: Use cookies to remember game state.
}

function gameKeyListenerError(event) {
	if (event.key === "Escape") {
		document.removeEventListener("keyup", gameKeyListenerError);
		let gameWindow = document.querySelector("#game_window");
		gameWindow.parentNode.removeChild(gameWindow);
	}
}

function gameKeyHandlerDown(event, gameKeys, gameKeyListenerDown) {
	switch (event.key) {
		case "Escape":
			document.removeEventListener("keydown", gameKeyListenerDown);
			return;
		case "w":
			gameKeys[0] = 1;
			break;
		case "a":
			gameKeys[1] = 1;
			break;
		case "d":
			gameKeys[2] = 1;
			break;
	}
	
	let gameKeyTest = document.querySelector("#game_key_test");
	gameKeyTest.innerHTML = gameKeys.toString();
}

function gameKeyHandlerUp(event, gameKeys, gameKeyListenerUp) {
	switch (event.key) {
		case "Escape":
			document.removeEventListener("keyup", gameKeyListenerUp);
			let gameWindow = document.querySelector("#game_window");
			gameWindow.parentNode.removeChild(gameWindow);
			return;
		case "w":
			gameKeys[0] = 0;
			break;
		case "a":
			gameKeys[1] = 0;
			break;
		case "d":
			gameKeys[2] = 0;
			break;
	}
	
	let gameKeyTest = document.querySelector("#game_key_test");
	gameKeyTest.innerHTML = gameKeys.toString();
}
