let trap_trapList = [];

function trap_resetTraps() {
	trap_trapList = [];
}

function trap_updateTrapSpikes(frameDiff) {
	graphics_clearTrapSpikes();
	for (let trapID in trap_trapList) {
		if (!trap_trapList[trapID].complete) {
			trap_trapList[trapID].fire(frameDiff);
		}
	}
}

function trap_addBlock(blocksPixels, size, position) {
	graphics_drawBlock(size, position);
	for (let i = Math.floor(position[0] * graphics_blockSize); i < (position[0] + size) * graphics_blockSize; i++) {
		for (let j = Math.floor(position[1] * graphics_blockSize); j < (position[1] + size) * graphics_blockSize; j++) {
			blocksPixels[i][j] = true;
		}
	}
}

function trap_addSpike(type, size, position) {
	graphics_drawSpike(graphics_canvasSpikes, type, size, position);
}

function trap_addMovingSpikeLinear(type, size, startPosition, endPosition, numFrames) {
	trap_trapList.push({
		id: trap_trapList.length,
		complete: false,
		currentFrame: 0,
		fire: function(frameDiff) {
			this.currentFrame += frameDiff;
			if (this.currentFrame <= numFrames) {
				let currentPosition = [startPosition[0] + (endPosition[0] - startPosition[0]) * (this.currentFrame / numFrames), startPosition[1] + (endPosition[1] - startPosition[1]) * (this.currentFrame / numFrames)];
				graphics_drawSpike(graphics_canvasTrapSpikes, type, size, currentPosition);
			} else {
				this.complete = true;
			}
		}
	});
}
