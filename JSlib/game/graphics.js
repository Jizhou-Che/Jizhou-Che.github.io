function graphics_resetBlocks(canvas, map) {
	if (canvas.getContext) {
		let context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (row in map) {
			for (col in map[row]) {
				if (map[row][col] == 1) {
					graphics_drawBlock(canvas, row, col);
				}
			}
		}
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_drawBlock(canvas, row, col) {
	if (canvas.getContext) {
		let context = canvas.getContext('2d');
		context.fillStyle = 'white';
		let blockSize = canvas.width / gameConfig_numBlocksX;
		context.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
		let blockBorder = Math.ceil(blockSize / 10);
		context.fillStyle = 'black';
		context.fillRect(col * blockSize + blockBorder, row * blockSize + blockBorder, blockSize - blockBorder * 2, blockSize - blockBorder * 2);
	} else {
		console.log("Cannot get context for canvas.");
	}
}

function graphics_resetChara(canvas, row, col) {
	if (canvas.getContext) {
		let context = canvas.getContext('2d');
		context.fillStyle = 'yellow';
		context.clearRect(0, 0, canvas.width, canvas.height);
		let blockSize = canvas.width / gameConfig_numBlocksX;
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

function graphics_updateChara(canvas, oldPosition, newPosition) {
	if (canvas.getContext) {
		if (oldPosition[0] != newPosition[0] || oldPosition[1] != newPosition[1]) {
			let context = canvas.getContext('2d');
			context.fillStyle = 'yellow';
			let blockSize = canvas.width / gameConfig_numBlocksX;
			let charaSizeX = gameConfig_charaSizeX * blockSize;
			let charaSizeY = gameConfig_charaSizeY * blockSize;
			context.clearRect(oldPosition[0] - 1, oldPosition[1] - 1, charaSizeX + 2, charaSizeY + 2);
			context.fillRect(newPosition[0], newPosition[1], charaSizeX, charaSizeY);
		}
	} else {
		console.log("Cannot get context for canvas.");
	}
}
