let graphics_canvasSpikes = null;
let graphics_canvasTrapSpikes = null;
let graphics_canvasBlocks = null;
let graphics_canvasChara = null;
let graphics_canvasAnimations = null;

let graphics_animationList = [];

let graphics_blockSize = null;
let graphics_charaSizeX = null;
let graphics_charaSizeY = null;

function graphics_setSizeParameters() {
	graphics_blockSize = graphics_canvasBlocks.width / gameConfig_numBlocksX;
	graphics_charaSizeX = gameConfig_charaSizeX * graphics_blockSize;
	graphics_charaSizeY = gameConfig_charaSizeY * graphics_blockSize;
}

function graphics_resetMap(map) {
	graphics_resetBlocks(map);
	graphics_resetSpikes(map);
}

function graphics_resetSpikes(map) {
	let context = graphics_canvasSpikes.getContext('2d');
	context.clearRect(0, 0, graphics_canvasSpikes.width, graphics_canvasSpikes.height);
	for (row in map) {
		for (col in map[row]) {
			graphics_drawSpike(graphics_canvasSpikes, map[row][col], 1, [parseInt(row), parseInt(col)]);
		}
	}
}

function graphics_drawSpike(canvas, type, size, position) {
	let context = canvas.getContext('2d');
	context.fillStyle = 'white';
	context.beginPath();
	switch (type) {
		case 1:
			// Draw spike up.
			context.moveTo(position[1] * graphics_blockSize, (position[0] + size) * graphics_blockSize);
			context.lineTo((position[1] + 0.5 * size) * graphics_blockSize, position[0] * graphics_blockSize);
			context.lineTo((position[1] + size) * graphics_blockSize, (position[0] + size) * graphics_blockSize);
			break;
		case 2:
			// Draw spike down.
			context.moveTo(position[1] * graphics_blockSize, position[0] * graphics_blockSize);
			context.lineTo((position[1] + 0.5 * size) * graphics_blockSize, (position[0] + size) * graphics_blockSize);
			context.lineTo((position[1] + size) * graphics_blockSize, position[0] * graphics_blockSize);
			break;
		case 3:
			// Draw spike left.
			context.moveTo((position[1] + size) * graphics_blockSize, position[0] * graphics_blockSize);
			context.lineTo(position[1] * graphics_blockSize, (position[0] + 0.5 * size) * graphics_blockSize);
			context.lineTo((position[1] + size) * graphics_blockSize, (position[0] + size) * graphics_blockSize);
			break;
		case 4:
			// Draw spike right.
			context.moveTo(position[1] * graphics_blockSize, position[0] * graphics_blockSize);
			context.lineTo((position[1] + size) * graphics_blockSize, (position[0] + 0.5 * size) * graphics_blockSize);
			context.lineTo(position[1] * graphics_blockSize, (position[0] + size) * graphics_blockSize);
			break;
	}
	context.fill();
}

function graphics_removeSpike(canvas, size, position) {
	let context = canvas.getContext('2d');
	context.clearRect(position[1] * graphics_blockSize, position[0] * graphics_blockSize, graphics_blockSize * size, graphics_blockSize * size);
}

function graphics_clearTrapSpikes() {
	let context = graphics_canvasTrapSpikes.getContext('2d');
	context.clearRect(0, 0, graphics_canvasTrapSpikes.width, graphics_canvasTrapSpikes.height);
}

function graphics_resetBlocks(map) {
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
}

function graphics_drawBlock(size, position) {
	let context = graphics_canvasBlocks.getContext('2d');
	context.fillStyle = 'white';
	context.fillRect(position[1] * graphics_blockSize, position[0] * graphics_blockSize, graphics_blockSize * size, graphics_blockSize * size);
	let blockBorder = Math.ceil(graphics_blockSize * size / 10);
	context.fillStyle = 'black';
	context.fillRect(position[1] * graphics_blockSize + blockBorder, position[0] * graphics_blockSize + blockBorder, graphics_blockSize * size - blockBorder * 2, graphics_blockSize * size - blockBorder * 2);
}

function graphics_removeBlock(size, position) {
	let context = graphics_canvasBlocks.getContext('2d');
	context.clearRect(position[1] * graphics_blockSize, position[0] * graphics_blockSize, graphics_blockSize * size, graphics_blockSize * size);
}

function graphics_resetChara(position) {
	let charaPositionX = position[1] * graphics_blockSize + (graphics_blockSize - graphics_charaSizeX) / 2;
	let charaPositionY = position[0] * graphics_blockSize + (graphics_blockSize - graphics_charaSizeY) / 2;
	let context = graphics_canvasChara.getContext('2d');
	context.fillStyle = 'yellow';
	context.clearRect(0, 0, graphics_canvasChara.width, graphics_canvasChara.height);
	context.fillRect(charaPositionX, charaPositionY, graphics_charaSizeX, graphics_charaSizeY);
	return [charaPositionX, charaPositionY];
}

function graphics_updateChara(positionOld, positionNew) {
	if (positionOld[0] != positionNew[0] || positionOld[1] != positionNew[1]) {
		let context = graphics_canvasChara.getContext('2d');
		context.fillStyle = 'yellow';
		context.clearRect(positionOld[0] - 1, positionOld[1] - 1, graphics_charaSizeX + 2, graphics_charaSizeY + 2);
		context.fillRect(positionNew[0], positionNew[1], graphics_charaSizeX, graphics_charaSizeY);
	}
}

function graphics_clearChara() {
	let context = graphics_canvasChara.getContext('2d');
	context.clearRect(0, 0, graphics_canvasChara.width, graphics_canvasChara.height);
}

function graphics_renderAnimations(frameDiff) {
	let context = graphics_canvasAnimations.getContext('2d');
	context.clearRect(0, 0, graphics_canvasAnimations.width, graphics_canvasAnimations.height);
	for (let animationID in graphics_animationList) {
		if (!graphics_animationList[animationID].complete) {
			graphics_animationList[animationID].render(frameDiff);
		}
	}
}

function graphics_registerAnimation(animation) {
	graphics_animationList.push(animation);
}

function graphics_registerCharaDeathAnimation(position) {
	let numFrames = 15;
	graphics_animationList.push({
		id: graphics_animationList.length,
		complete: false,
		currentFrame: 0,
		render: function(frameDiff) {
			this.currentFrame += frameDiff;
			if (this.currentFrame <= numFrames) {
				let progress = this.currentFrame / numFrames;
				let context = graphics_canvasAnimations.getContext('2d');
				context.fillStyle = 'rgba(255, 0, 0, ' + (1 - progress) + ')';
				context.fillRect(position[0] - graphics_charaSizeX * 10 * progress, position[1] - graphics_charaSizeY * 10 * progress, graphics_charaSizeX + graphics_charaSizeX * 20 * progress, graphics_charaSizeY + graphics_charaSizeY * 20 * progress);
			} else {
				this.complete = true;
			}
		}
	});
}

function graphics_registerCharaTeleportationSuccessAnimation(position) {
	let numFrames = 15;
	let maxRadius = graphics_blockSize * 2;
	graphics_animationList.push({
		id: graphics_animationList.length,
		complete: false,
		currentFrame: 0,
		render: function(frameDiff) {
			this.currentFrame += frameDiff;
			if (this.currentFrame <= numFrames) {
				let progress = this.currentFrame / numFrames;
				let context = graphics_canvasAnimations.getContext('2d');
				context.fillStyle = 'rgba(128, 0, 255, ' + progress + ')';
				context.beginPath();
				context.arc(position[0] + graphics_charaSizeX / 2, position[1] + graphics_charaSizeY / 2, maxRadius * (1 - progress), 0, Math.PI * 2, true);
				context.fill();
			} else {
				this.complete = true;
			}
		}
	});
}

function graphics_registerCharaTeleportationFailureAnimation(position) {
	let numFrames = 15;
	graphics_animationList.push({
		id: graphics_animationList.length,
		complete: false,
		currentFrame: 0,
		render: function(frameDiff) {
			this.currentFrame += frameDiff;
			if (this.currentFrame <= numFrames) {
				let progress = this.currentFrame / numFrames;
				let context = graphics_canvasAnimations.getContext('2d');
				context.strokeStyle = 'rgba(255, 0, 0, 1)';
				context.lineWidth = graphics_charaSizeX / 5;
				context.lineCap = 'round';
				context.beginPath()
				context.moveTo(position[0], position[1]);
				context.lineTo(position[0] + graphics_charaSizeX, position[1] + graphics_charaSizeY);
				context.moveTo(position[0], position[1] + graphics_charaSizeY);
				context.lineTo(position[0] + graphics_charaSizeX, position[1]);
				context.stroke();
			} else {
				this.complete = true;
			}
		}
	});
}

function graphics_registerInvincibilityIndicatorAnimation() {
	let fontSize = graphics_charaSizeX;
	graphics_animationList.push({
		id: graphics_animationList.length,
		render: function(frameDiff) {
			if (control_invincibilityMode) {
				let context = graphics_canvasAnimations.getContext('2d');
				context.fillStyle = 'rgba(0, 255, 0, 1)';
				context.font = fontSize + 'px monospace';
				context.fillText("[INVINCIBILITY]", graphics_canvasAnimations.width - fontSize * 10, fontSize * 2);
			}
		}
	});
}

function graphics_registerTeleportationIndicatorAnimation() {
	let fontSize = graphics_charaSizeX;
	graphics_animationList.push({
		id: graphics_animationList.length,
		render: function(frameDiff) {
			if (control_teleportationMode) {
				let context = graphics_canvasAnimations.getContext('2d');
				context.fillStyle = 'rgba(0, 255, 0, 1)';
				context.font = fontSize + 'px monospace';
				context.fillText("[TELEPORTATION]", graphics_canvasAnimations.width - fontSize * 10, fontSize * 3.5);
			}
		}
	});
}
