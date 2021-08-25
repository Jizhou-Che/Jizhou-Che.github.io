function trap_addBlock(blocksPixels, row, col, size) {
	let blockSize = graphics_canvasBlocks.width / gameConfig_numBlocksX;
	graphics_drawBlock(row, col, size);
	for (let i = Math.floor(row * blockSize); i < (row + size) * blockSize; i++) {
		for (let j = Math.floor(col * blockSize); j < (col + size) * blockSize; j++) {
			blocksPixels[i][j] = true;
		}
	}
}

function trap_addSpike(type, row, col, size) {
	switch (type) {
		case 1:
			graphics_drawSpikeUp(row, col, size);
			break;
		case 2:
			graphics_drawSpikeDown(row, col, size);
			break;
		case 3:
			graphics_drawSpikeLeft(row, col, size);
			break;
		case 4:
			graphics_drawSpikeRight(row, col, size);
			break;
	}
}
