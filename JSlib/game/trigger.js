let trigger_triggerList = null;

function trigger_resetTriggers(triggers) {
	trigger_triggerList = triggers.slice();
	for (let trigger in trigger_triggerList) {
		trigger_triggerList[trigger].stage = 0;
		trigger_triggerList[trigger].progress = 0;
	}
}

function trigger_fireTriggers(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
	for (triggerID in trigger_triggerList) {
		trigger_triggerList[triggerID].fire(charaPositionOld, charaPositionNew, blocksPixels, frameDiff);
	}
}

function trigger_charaReachBlock(charaPositionNew, blockPosition) {
	let xMin = blockPosition[1] * graphics_blockSize - graphics_charaSizeX;
	let xMax = (blockPosition[1] + 1) * graphics_blockSize;
	let yMin = blockPosition[0] * graphics_blockSize - graphics_charaSizeY;
	let yMax = (blockPosition[0] + 1) * graphics_blockSize;
	if (charaPositionNew[0] > xMin && charaPositionNew[0] < xMax && charaPositionNew[1] > yMin && charaPositionNew[1] < yMax) {
		return true;
	}
	return false;
}

function trigger_charaReachBlockTop(charaPositionOld, charaPositionNew, blockPosition) {
	if (trigger_charaReachBlock(charaPositionNew, blockPosition)) {
		let blockPixelPosition = [blockPosition[1] * graphics_blockSize, blockPosition[0] * graphics_blockSize];
		if (charaPositionOld[1] + graphics_charaSizeY < blockPixelPosition[1] && charaPositionNew[1] + graphics_charaSizeY >= blockPixelPosition[1]) {
			let charaMovementX = charaPositionNew[0] - charaPositionOld[0];
			let charaMovementY = charaPositionNew[1] - charaPositionOld[1];
			let blockTopIntersectionX1 = charaPositionOld[0] + charaMovementX * (blockPixelPosition[1] - (charaPositionOld[1] + graphics_charaSizeY)) / charaMovementY;
			if (blockTopIntersectionX1 >= blockPixelPosition[0] && blockTopIntersectionX1 <= blockPixelPosition[0] + graphics_blockSize) {
				return true;
			}
			let blockTopIntersectionX2 = blockTopIntersectionX1 + graphics_charaSizeX;
			if (blockTopIntersectionX2 >= blockPixelPosition[0] && blockTopIntersectionX2 <= blockPixelPosition[0] + graphics_blockSize) {
				return true;
			}
		}
	}
	return false;
}

function trigger_charaReachBlockBottom(charaPositionOld, charaPositionNew, blockPosition) {
	if (trigger_charaReachBlock(charaPositionNew, blockPosition)) {
		let blockPixelPosition = [blockPosition[1] * graphics_blockSize, blockPosition[0] * graphics_blockSize];
		if (charaPositionOld[1] > blockPixelPosition[1] + graphics_blockSize && charaPositionNew[1] <= blockPixelPosition[1] + graphics_blockSize) {
			let charaMovementX = charaPositionNew[0] - charaPositionOld[0];
			let charaMovementY = charaPositionNew[1] - charaPositionOld[1];
			let blockBottomIntersectionX1 = charaPositionOld[0] + charaMovementX * ((blockPixelPosition[1] + graphics_blockSize) - charaPositionOld[1]) / charaMovementY;
			if (blockBottomIntersectionX1 >= blockPixelPosition[0] && blockBottomIntersectionX1 <= blockPixelPosition[0] + graphics_blockSize) {
				return true;
			}
			let blockBottomIntersectionX2 = blockBottomIntersectionX1 + graphics_charaSizeX;
			if (blockBottomIntersectionX2 >= blockPixelPosition[0] && blockBottomIntersectionX2 <= blockPixelPosition[0] + graphics_blockSize) {
				return true;
			}
		}
	}
	return false;
}

function trigger_charaReachBlockLeft(charaPositionOld, charaPositionNew, blockPosition) {
	if (trigger_charaReachBlock(charaPositionNew, blockPosition)) {
		let blockPixelPosition = [blockPosition[1] * graphics_blockSize, blockPosition[0] * graphics_blockSize];
		if (charaPositionOld[0] + graphics_charaSizeX < blockPixelPosition[0] && charaPositionNew[0] + graphics_charaSizeX >= blockPixelPosition[0]) {
			let charaMovementX = charaPositionNew[0] - charaPositionOld[0];
			let charaMovementY = charaPositionNew[1] - charaPositionOld[1];
			let blockLeftIntersectionY1 = charaPositionOld[1] + charaMovementY * (blockPixelPosition[0] - (charaPositionOld[0] + graphics_charaSizeX)) / charaMovementX;
			if (blockLeftIntersectionY1 >= blockPixelPosition[1] && blockLeftIntersectionY1 <= blockPixelPosition[1] + graphics_blockSize) {
				return true;
			}
			let blockLeftIntersectionY2 = blockLeftIntersectionY1 + graphics_charaSizeY;
			if (blockLeftIntersectionY2 >= blockPixelPosition[1] && blockLeftIntersectionY2 <= blockPixelPosition[1] + graphics_blockSize) {
				return true;
			}
		}
	}
	return false;
}

function trigger_charaReachBlockRight(charaPositionOld, charaPositionNew, blockPosition) {
	if (trigger_charaReachBlock(charaPositionNew, blockPosition)) {
		let blockPixelPosition = [blockPosition[1] * graphics_blockSize, blockPosition[0] * graphics_blockSize];
		if (charaPositionOld[0] > blockPixelPosition[0] + graphics_blockSize && charaPositionNew[0] <= blockPixelPosition[0] + graphics_blockSize) {
			let charaMovementX = charaPositionNew[0] - charaPositionOld[0];
			let charaMovementY = charaPositionNew[1] - charaPositionOld[1];
			let blockRightIntersectionY1 = charaPositionOld[1] + charaMovementY * ((blockPixelPosition[0] + graphics_blockSize) - charaPositionOld[0]) / charaMovementX;
			if (blockRightIntersectionY1 >= blockPixelPosition[1] && blockRightIntersectionY1 <= blockPixelPosition[1] + graphics_blockSize) {
				return true;
			}
			let blockRightIntersectionY2 = blockRightIntersectionY1 + graphics_charaSizeY;
			if (blockRightIntersectionY2 >= blockPixelPosition[1] && blockRightIntersectionY2 <= blockPixelPosition[1] + graphics_blockSize) {
				return true;
			}
		}
	}
	return false;
}

function trigger_charaInBlock(charaPositionNew, blockPosition) {
	let xMin = blockPosition[1] * graphics_blockSize;
	let xMax = (blockPosition[1] + 1) * graphics_blockSize - graphics_charaSizeX;
	let yMin = blockPosition[0] * graphics_blockSize;
	let yMax = (blockPosition[0] + 1) * graphics_blockSize - graphics_charaSizeY;
	if (charaPositionNew[0] > xMin && charaPositionNew[0] < xMax && charaPositionNew[1] > yMin && charaPositionNew[1] < yMax) {
		return true;
	}
	return false;
}
