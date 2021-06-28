let graphics_canvasSpikes = null;
let graphics_canvasBlocks = null;
let graphics_canvasChara = null;

function graphics_resetSpikes(map) {
	if (graphics_canvasSpikes.getContext) {
		let context = graphics_canvasSpikes.getContext('2d');
		context.clearRect(0, 0, graphics_canvasSpikes.width, graphics_canvasSpikes.height);
		for (row in map) {
			for (col in map[row]) {
				switch (map[row][col]) {
					case 1:
						graphics_drawSpikeUp(parseInt(row), parseInt(col));
						break;
					case 2:
						graphics_drawSpikeDown(parseInt(row), parseInt(col));
						break;
					case 3:
						graphics_drawSpikeLeft(parseInt(row), parseInt(col));
						break;
					case 4:
						graphics_drawSpikeRight(parseInt(row), parseInt(col));
						break;
				}
			}
		}
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_drawSpikeUp(row, col) {
	if (graphics_canvasSpikes.getContext) {
		let context = graphics_canvasSpikes.getContext('2d');
		context.fillStyle = 'white';
		let blockSize = graphics_canvasSpikes.width / gameConfig_numBlocksX;
		context.beginPath();
		context.moveTo(col * blockSize, (row + 1) * blockSize);
		context.lineTo((col + 0.5) * blockSize, row * blockSize);
		context.lineTo((col + 1) * blockSize, (row + 1) * blockSize);
		context.fill();
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_drawSpikeDown(row, col) {
	if (graphics_canvasSpikes.getContext) {
		let context = graphics_canvasSpikes.getContext('2d');
		context.fillStyle = 'white';
		let blockSize = graphics_canvasSpikes.width / gameConfig_numBlocksX;
		context.beginPath();
		context.moveTo(col * blockSize, row * blockSize);
		context.lineTo((col + 0.5) * blockSize, (row + 1) * blockSize);
		context.lineTo((col + 1) * blockSize, row * blockSize);
		context.fill();
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_drawSpikeLeft(row, col) {
	if (graphics_canvasSpikes.getContext) {
		let context = graphics_canvasSpikes.getContext('2d');
		context.fillStyle = 'white';
		let blockSize = graphics_canvasSpikes.width / gameConfig_numBlocksX;
		context.beginPath();
		context.moveTo((col + 1) * blockSize, row * blockSize);
		context.lineTo(col * blockSize, (row + 0.5) * blockSize);
		context.lineTo((col + 1) * blockSize, (row + 1) * blockSize);
		context.fill();
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_drawSpikeRight(row, col) {
	if (graphics_canvasSpikes.getContext) {
		let context = graphics_canvasSpikes.getContext('2d');
		context.fillStyle = 'white';
		let blockSize = graphics_canvasSpikes.width / gameConfig_numBlocksX;
		context.beginPath();
		context.moveTo(col * blockSize, row * blockSize);
		context.lineTo((col + 1) * blockSize, (row + 0.5) * blockSize);
		context.lineTo(col * blockSize, (row + 1) * blockSize);
		context.fill();
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_resetBlocks(map) {
	if (graphics_canvasBlocks.getContext) {
		let context = graphics_canvasBlocks.getContext('2d');
		context.clearRect(0, 0, graphics_canvasBlocks.width, graphics_canvasBlocks.height);
		for (row in map) {
			for (col in map[row]) {
				if (map[row][col] == 1) {
					graphics_drawBlock(parseInt(row), parseInt(col));
				}
			}
		}
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_drawBlock(row, col) {
	if (graphics_canvasBlocks.getContext) {
		let context = graphics_canvasBlocks.getContext('2d');
		context.fillStyle = 'white';
		let blockSize = graphics_canvasBlocks.width / gameConfig_numBlocksX;
		context.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
		let blockBorder = Math.ceil(blockSize / 10);
		context.fillStyle = 'black';
		context.fillRect(col * blockSize + blockBorder, row * blockSize + blockBorder, blockSize - blockBorder * 2, blockSize - blockBorder * 2);
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_resetChara(row, col) {
	if (graphics_canvasChara.getContext) {
		let context = graphics_canvasChara.getContext('2d');
		context.fillStyle = 'yellow';
		context.clearRect(0, 0, graphics_canvasChara.width, graphics_canvasChara.height);
		let blockSize = graphics_canvasChara.width / gameConfig_numBlocksX;
		let charaSizeX = gameConfig_charaSizeX * blockSize;
		let charaSizeY = gameConfig_charaSizeY * blockSize;
		let charaPositionX = col * blockSize + (blockSize - charaSizeX) / 2;
		let charaPositionY = row * blockSize + (blockSize - charaSizeY) / 2;
		context.fillRect(charaPositionX, charaPositionY, charaSizeX, charaSizeY);
		return [charaPositionX, charaPositionY];
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_updateChara(oldPosition, newPosition) {
	if (graphics_canvasChara.getContext) {
		if (oldPosition[0] != newPosition[0] || oldPosition[1] != newPosition[1]) {
			let context = graphics_canvasChara.getContext('2d');
			context.fillStyle = 'yellow';
			let blockSize = graphics_canvasChara.width / gameConfig_numBlocksX;
			let charaSizeX = gameConfig_charaSizeX * blockSize;
			let charaSizeY = gameConfig_charaSizeY * blockSize;
			context.clearRect(oldPosition[0] - 1, oldPosition[1] - 1, charaSizeX + 2, charaSizeY + 2);
			context.fillRect(newPosition[0], newPosition[1], charaSizeX, charaSizeY);
		}
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_updateDeadChara(oldPosition, newPosition, frameDiff) {
	if (graphics_canvasChara.getContext) {
		let context = graphics_canvasChara.getContext('2d');
		let blockSize = graphics_canvasChara.width / gameConfig_numBlocksX;
		let charaSizeX = gameConfig_charaSizeX * blockSize;
		let charaSizeY = gameConfig_charaSizeY * blockSize;
		let alpha = 1;
		if (oldPosition[0] != newPosition[0] || oldPosition[1] != newPosition[1]) {
			context.clearRect(0, 0, graphics_canvasChara.width, graphics_canvasChara.height);
			context.fillStyle = 'rgba(255, 0, 0, 1)';
			context.fillRect(newPosition[0], newPosition[1], charaSizeX, charaSizeY);
		} else {
			alpha = context.getImageData(newPosition[0] + charaSizeX / 2, newPosition[1] + charaSizeY / 2, 1, 1).data[3];
			alpha -= 17 * frameDiff;
			if (alpha < 0) {
				alpha = 0;
			}
			let deathProgress = (255 - alpha) / 255;
			context.clearRect(0, 0, graphics_canvasChara.width, graphics_canvasChara.height);
			context.fillStyle = 'rgba(255, 0, 0, ' + alpha / 255 + ')';
			context.fillRect(newPosition[0] - charaSizeX * 10 * deathProgress, newPosition[1] - charaSizeY * 10 * deathProgress, charaSizeX + charaSizeX * 20 * deathProgress, charaSizeY + charaSizeY * 20 * deathProgress);
		}
		return alpha == 0;
	} else {
		console.log("Cannot get context for canvas.");
	}
}
