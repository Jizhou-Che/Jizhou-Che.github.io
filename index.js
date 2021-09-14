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
	
	control_createGame(gameWindow);
}
