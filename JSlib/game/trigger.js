let trigger_triggerList = null;

function trigger_resetTriggers(triggers) {
	trigger_triggerList = triggers;
	for (let trigger in trigger_triggerList) {
		trigger_triggerList[trigger].stage = 0;
		trigger_triggerList[trigger].progress = 0;
	}
}

function trigger_fireTriggers(charaPosition, blocksPixels, frameDiff) {
	for (triggerID in trigger_triggerList) {
		trigger_triggerList[triggerID].fire(charaPosition, blocksPixels, frameDiff);
	}
}

function trigger_charaReachBlock(charaPosition, row, col) {
	let blockSize = graphics_canvasBlocks.width / gameConfig_numBlocksX;
	let charaSizeX = gameConfig_charaSizeX * blockSize;
	let charaSizeY = gameConfig_charaSizeY * blockSize;
	let xMin = col * blockSize - charaSizeX;
	let xMax = (col + 1) * blockSize;
	let yMin = row * blockSize - charaSizeY;
	let yMax = (row + 1) * blockSize;
	if (charaPosition[0] > xMin && charaPosition[0] < xMax && charaPosition[1] > yMin && charaPosition[1] < yMax) {
		return true;
	} else {
		return false;
	}
}

function trigger_addBlock(blocksPixels, row, col) {
	let blockSize = graphics_canvasBlocks.width / gameConfig_numBlocksX;
	graphics_drawBlock(row, col);
	for (let i = row * blockSize; i < (row + 1) * blockSize; i++) {
		for (let j = col * blockSize; j < (col + 1) * blockSize; j++) {
			blocksPixels[i][j] = true;
		}
	}
}

function trigger_addSpike(type, row, col) {
	switch (type) {
		case 1:
			graphics_drawSpikeUp(row, col);
			break;
		case 2:
			graphics_drawSpikeDown(row, col);
			break;
		case 3:
			graphics_drawSpikeLeft(row, col);
			break;
		case 4:
			graphics_drawSpikeRight(row, col);
			break;
	}
}