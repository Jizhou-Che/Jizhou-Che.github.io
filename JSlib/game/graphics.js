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

function graphics_updateChara(positionOld, positionNew) {
	if (graphics_canvasChara.getContext) {
		if (positionOld[0] != positionNew[0] || positionOld[1] != positionNew[1]) {
			let context = graphics_canvasChara.getContext('2d');
			context.fillStyle = 'yellow';
			let blockSize = graphics_canvasChara.width / gameConfig_numBlocksX;
			let charaSizeX = gameConfig_charaSizeX * blockSize;
			let charaSizeY = gameConfig_charaSizeY * blockSize;
			context.clearRect(positionOld[0] - 1, positionOld[1] - 1, charaSizeX + 2, charaSizeY + 2);
			context.fillRect(positionNew[0], positionNew[1], charaSizeX, charaSizeY);
		}
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_updateDeadChara(position, progress) {
	if (graphics_canvasChara.getContext) {
		let context = graphics_canvasChara.getContext('2d');
		let blockSize = graphics_canvasChara.width / gameConfig_numBlocksX;
		let charaSizeX = gameConfig_charaSizeX * blockSize;
		let charaSizeY = gameConfig_charaSizeY * blockSize;
		if (progress < 1) {
			context.clearRect(0, 0, graphics_canvasChara.width, graphics_canvasChara.height);
			context.fillStyle = 'rgba(255, 0, 0, ' + (1 - progress) + ')';
			context.fillRect(position[0] - charaSizeX * 10 * progress, position[1] - charaSizeY * 10 * progress, charaSizeX + charaSizeX * 20 * progress, charaSizeY + charaSizeY * 20 * progress);
		}
		progress += 1 / 15;
		return progress;
	} else {
		console.log("Cannot get context for canvas.");
	}
}
