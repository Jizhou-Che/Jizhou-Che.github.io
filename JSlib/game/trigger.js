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
	let xMin = blockPosition[1] * graphics_blockSize - graphics_charaSizeX;
	let xMax = (blockPosition[1] + 1) * graphics_blockSize;
	let yMin = blockPosition[0] * graphics_blockSize - graphics_charaSizeY;
	let yMax = (blockPosition[0] + 1) * graphics_blockSize;
	if (charaPosition[0] > xMin && charaPosition[0] < xMax && charaPosition[1] > yMin && charaPosition[1] < yMax) {
		return true;
	} else {
		return false;
	}
}
