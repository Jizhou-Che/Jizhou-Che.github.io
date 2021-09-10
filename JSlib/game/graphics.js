let graphics_canvasSpikes = null;
let graphics_canvasTrapSpikes = null;
let graphics_canvasBlocks = null;
let graphics_canvasChara = null;

function graphics_resetMap(map) {
	graphics_resetBlocks(map);
	graphics_resetSpikes(map);
}

function graphics_resetSpikes(map) {
	if (graphics_canvasSpikes.getContext) {
		let context = graphics_canvasSpikes.getContext('2d');
		context.clearRect(0, 0, graphics_canvasSpikes.width, graphics_canvasSpikes.height);
		for (row in map) {
			for (col in map[row]) {
				graphics_drawSpike(graphics_canvasSpikes, map[row][col], 1, [parseInt(row), parseInt(col)]);
			}
		}
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_drawSpike(canvas, type, size, position) {
	if (canvas.getContext) {
		let blockSize = canvas.width / gameConfig_numBlocksX;
		let context = canvas.getContext('2d');
		context.fillStyle = 'white';
		context.beginPath();
		switch (type) {
			case 1:
				// Draw spike up.
				context.moveTo(position[1] * blockSize, (position[0] + size) * blockSize);
				context.lineTo((position[1] + 0.5 * size) * blockSize, position[0] * blockSize);
				context.lineTo((position[1] + size) * blockSize, (position[0] + size) * blockSize);
				break;
			case 2:
				// Draw spike down.
				context.moveTo(position[1] * blockSize, position[0] * blockSize);
				context.lineTo((position[1] + 0.5 * size) * blockSize, (position[0] + size) * blockSize);
				context.lineTo((position[1] + size) * blockSize, position[0] * blockSize);
				break;
			case 3:
				// Draw spike left.
				context.moveTo((position[1] + size) * blockSize, position[0] * blockSize);
				context.lineTo(position[1] * blockSize, (position[0] + 0.5 * size) * blockSize);
				context.lineTo((position[1] + size) * blockSize, (position[0] + size) * blockSize);
				break;
			case 4:
				// Draw spike right.
				context.moveTo(position[1] * blockSize, position[0] * blockSize);
				context.lineTo((position[1] + size) * blockSize, (position[0] + 0.5 * size) * blockSize);
				context.lineTo(position[1] * blockSize, (position[0] + size) * blockSize);
				break;
		}
		context.fill();
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_clearTrapSpikes() {
	if (graphics_canvasTrapSpikes.getContext) {
		let context = graphics_canvasTrapSpikes.getContext('2d');
		context.clearRect(0, 0, graphics_canvasTrapSpikes.width, graphics_canvasTrapSpikes.height);
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
				switch (map[row][col]) {
					case 9:
						graphics_drawBlock(1, [parseInt(row), parseInt(col)]);
						break;
				}
			}
		}
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_drawBlock(size, position) {
	if (graphics_canvasBlocks.getContext) {
		let context = graphics_canvasBlocks.getContext('2d');
		context.fillStyle = 'white';
		let blockSize = graphics_canvasBlocks.width / gameConfig_numBlocksX;
		context.fillRect(position[1] * blockSize, position[0] * blockSize, blockSize * size, blockSize * size);
		let blockBorder = Math.ceil(blockSize * size / 10);
		context.fillStyle = 'black';
		context.fillRect(position[1] * blockSize + blockBorder, position[0] * blockSize + blockBorder, blockSize * size - blockBorder * 2, blockSize * size - blockBorder * 2);
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_resetChara(position) {
	if (graphics_canvasChara.getContext) {
		let context = graphics_canvasChara.getContext('2d');
		context.fillStyle = 'yellow';
		context.clearRect(0, 0, graphics_canvasChara.width, graphics_canvasChara.height);
		let blockSize = graphics_canvasChara.width / gameConfig_numBlocksX;
		let charaSizeX = gameConfig_charaSizeX * blockSize;
		let charaSizeY = gameConfig_charaSizeY * blockSize;
		let charaPositionX = position[1] * blockSize + (blockSize - charaSizeX) / 2;
		let charaPositionY = position[0] * blockSize + (blockSize - charaSizeY) / 2;
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
	} else {
		console.log("Cannot get context for canvas.");
	}
}
