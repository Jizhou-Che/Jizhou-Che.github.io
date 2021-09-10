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

function trigger_charaReachBlock(charaPosition, blockPosition) {
	let blockSize = graphics_canvasBlocks.width / gameConfig_numBlocksX;
	let charaSizeX = gameConfig_charaSizeX * blockSize;
	let charaSizeY = gameConfig_charaSizeY * blockSize;
	let xMin = blockPosition[1] * blockSize - charaSizeX;
	let xMax = (blockPosition[1] + 1) * blockSize;
	let yMin = blockPosition[0] * blockSize - charaSizeY;
	let yMax = (blockPosition[0] + 1) * blockSize;
	if (charaPosition[0] > xMin && charaPosition[0] < xMax && charaPosition[1] > yMin && charaPosition[1] < yMax) {
		return true;
	} else {
		return false;
	}
}
