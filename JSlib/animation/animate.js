function animate_setAnimation(animationDic, animationID, render, elements, timing, duration, timeFrac, direction, frame) {
	// [0]: render: The render function, which takes a list of elements to animate and the animation progress as argument.
	// [1]: elements: The list of elements to animate.
	// [2]: timing: The timing function.
	// [3]: duration: The total animation duration.
	// [4]: timeFrac: The time fraction the animation has performed.
	// [5]: direction: The direction of animation, 1 if forward, -1 if backward.
	// [6]: frame: The latest requested animation frame, if not null.
	animationDic[animationID] = [render, elements, timing, duration, timeFrac, direction, frame];
}

function animate_setAnimationDirection(animationDic, animationID, direction) {
	animationDic[animationID][5] = direction;
}

function animate(animationDic, animationID) {
	// Discard unregistered animation.
	if (!(animationID in animationDic)) {
		console.log("Unregistered animation.");
		return;
	}
	
	// Cancel unfinished animation.
	if (animationDic[animationID][6] != null) {
		cancelAnimationFrame(animationDic[animationID][6]);
	}
	
	// Perform new animation.
	let timeFracInit = animationDic[animationID][4];
	let timeInit = performance.now();
	if (animationDic[animationID][5] > 0) {
		// Forward direction.
		animationDic[animationID][6] = requestAnimationFrame(function renderFrame(timeNow) {
			animationDic[animationID][4] = timeFracInit + (timeNow - timeInit) / animationDic[animationID][3];
			if (animationDic[animationID][4] > 1) {
				animationDic[animationID][4] = 1;
			}
			let progress = animationDic[animationID][2](animationDic[animationID][4]);
			animationDic[animationID][0](animationDic[animationID][1], progress);
			if (animationDic[animationID][4] < 1) {
				animationDic[animationID][6] = requestAnimationFrame(renderFrame);
			} else {
				animationDic[animationID][6] = null;
			}
		});
	} else {
		// Backward direction.
		animationDic[animationID][6] = requestAnimationFrame(function renderFrame(timeNow) {
			animationDic[animationID][4] = timeFracInit - (timeNow - timeInit) / animationDic[animationID][3];
			if (animationDic[animationID][4] < 0) {
				animationDic[animationID][4] = 0;
			}
			let progress = animationDic[animationID][2](animationDic[animationID][4]);
			animationDic[animationID][0](animationDic[animationID][1], progress);
			if (animationDic[animationID][4] > 0) {
				animationDic[animationID][6] = requestAnimationFrame(renderFrame);
			} else {
				animationDic[animationID][6] = null;
			}
		});
	}
}
