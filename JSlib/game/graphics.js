let graphics_canvasSpikes = null;
let graphics_canvasTrapSpikes = null;
let graphics_canvasBlocks = null;
let graphics_canvasChara = null;
let graphics_canvasAnimations = null;

let graphics_animationList = [];

let graphics_blockSize = null;
let graphics_sizeScale = null;
let graphics_charaSizeX = null;
let graphics_charaSizeY = null;

let graphics_spriteCharaIdleRight1 = null;
let graphics_spriteCharaIdleRight2 = null;
let graphics_spriteCharaIdleRight3 = null;
let graphics_spriteCharaIdleRight4 = null;
let graphics_spriteCharaRunningRight1 = null;
let graphics_spriteCharaRunningRight2 = null;
let graphics_spriteCharaRunningRight3 = null;
let graphics_spriteCharaRunningRight4 = null;
let graphics_spriteCharaJumpRight1 = null;
let graphics_spriteCharaJumpRight2 = null;
let graphics_spriteCharaFallRight1 = null;
let graphics_spriteCharaFallRight2 = null;
let graphics_spriteCharaIdleLeft1 = null;
let graphics_spriteCharaIdleLeft2 = null;
let graphics_spriteCharaIdleLeft3 = null;
let graphics_spriteCharaIdleLeft4 = null;
let graphics_spriteCharaRunningLeft1 = null;
let graphics_spriteCharaRunningLeft2 = null;
let graphics_spriteCharaRunningLeft3 = null;
let graphics_spriteCharaRunningLeft4 = null;
let graphics_spriteCharaJumpLeft1 = null;
let graphics_spriteCharaJumpLeft2 = null;
let graphics_spriteCharaFallLeft1 = null;
let graphics_spriteCharaFallLeft2 = null;
let graphics_spriteCharaDeath = null;

let graphics_charaSpriteStatus = {
	// Direction: unchanged, right, left.
	direction: 1,
	// Status: unchanged, idle, running, jump, fall.
	status: 1,
	// Lifespan: number of frames before switching to the next alternate sprite.
	lifespan: 6,
	// Frame: current frame in lifespan.
	frame: 0,
	// Sprite: current sprite.
	sprite: null
};

function graphics_setSizeParameters() {
	graphics_blockSize = graphics_canvasBlocks.width / gameConfig_numBlocksX;
	graphics_sizeScale = graphics_blockSize / gameConfig_iwBlockSize;
	graphics_charaSizeX = gameConfig_charaSizeX * graphics_blockSize;
	graphics_charaSizeY = gameConfig_charaSizeY * graphics_blockSize;
}

function graphics_loadSprites() {
	graphics_spriteCharaIdleRight1 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaIdleRight1.src = "Resources/Sprite/charaIdleRight1.png";
	graphics_spriteCharaIdleRight2 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaIdleRight2.src = "Resources/Sprite/charaIdleRight2.png";
	graphics_spriteCharaIdleRight3 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaIdleRight3.src = "Resources/Sprite/charaIdleRight3.png";
	graphics_spriteCharaIdleRight4 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaIdleRight4.src = "Resources/Sprite/charaIdleRight4.png";
	graphics_spriteCharaRunningRight1 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaRunningRight1.src = "Resources/Sprite/charaRunningRight1.png";
	graphics_spriteCharaRunningRight2 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaRunningRight2.src = "Resources/Sprite/charaRunningRight2.png";
	graphics_spriteCharaRunningRight3 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaRunningRight3.src = "Resources/Sprite/charaRunningRight3.png";
	graphics_spriteCharaRunningRight4 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaRunningRight4.src = "Resources/Sprite/charaRunningRight4.png";
	graphics_spriteCharaJumpRight1 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaJumpRight1.src = "Resources/Sprite/charaJumpRight1.png";
	graphics_spriteCharaJumpRight2 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaJumpRight2.src = "Resources/Sprite/charaJumpRight2.png";
	graphics_spriteCharaFallRight1 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaFallRight1.src = "Resources/Sprite/charaFallRight1.png";
	graphics_spriteCharaFallRight2 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaFallRight2.src = "Resources/Sprite/charaFallRight2.png";
	graphics_spriteCharaIdleLeft1 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaIdleLeft1.src = "Resources/Sprite/charaIdleLeft1.png";
	graphics_spriteCharaIdleLeft2 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaIdleLeft2.src = "Resources/Sprite/charaIdleLeft2.png";
	graphics_spriteCharaIdleLeft3 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaIdleLeft3.src = "Resources/Sprite/charaIdleLeft3.png";
	graphics_spriteCharaIdleLeft4 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaIdleLeft4.src = "Resources/Sprite/charaIdleLeft4.png";
	graphics_spriteCharaRunningLeft1 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaRunningLeft1.src = "Resources/Sprite/charaRunningLeft1.png";
	graphics_spriteCharaRunningLeft2 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaRunningLeft2.src = "Resources/Sprite/charaRunningLeft2.png";
	graphics_spriteCharaRunningLeft3 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaRunningLeft3.src = "Resources/Sprite/charaRunningLeft3.png";
	graphics_spriteCharaRunningLeft4 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaRunningLeft4.src = "Resources/Sprite/charaRunningLeft4.png";
	graphics_spriteCharaJumpLeft1 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaJumpLeft1.src = "Resources/Sprite/charaJumpLeft1.png";
	graphics_spriteCharaJumpLeft2 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaJumpLeft2.src = "Resources/Sprite/charaJumpLeft2.png";
	graphics_spriteCharaFallLeft1 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaFallLeft1.src = "Resources/Sprite/charaFallLeft1.png";
	graphics_spriteCharaFallLeft2 = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaFallLeft2.src = "Resources/Sprite/charaFallLeft2.png";
	graphics_spriteCharaDeath = new Image(graphics_blockSize, graphics_blockSize);
	graphics_spriteCharaDeath.src = "Resources/Sprite/charaDeath.png";
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

function graphics_drawSave(position) {
	let pixelPosition = [position[1] * graphics_blockSize, position[0] * graphics_blockSize];
	let context = graphics_canvasAnimations.getContext('2d');
	context.fillStyle = 'green';
	context.beginPath();
	context.arc(pixelPosition[0] + graphics_blockSize / 2, pixelPosition[1] + graphics_blockSize / 2, graphics_blockSize / 3, 0, Math.PI * 2, true);
	context.fill();
}

function graphics_resetChara(position) {
	graphics_charaSpriteStatus.direction = 1;
	graphics_charaSpriteStatus.status = 1;
	graphics_charaSpriteStatus.frame = 0;
	graphics_charaSpriteStatus.sprite = graphics_spriteCharaIdleRight1;
	let charaPositionX = position[1] * graphics_blockSize + (graphics_blockSize - graphics_charaSizeX) / 2;
	let charaPositionY = position[0] * graphics_blockSize + (graphics_blockSize - graphics_charaSizeY) / 2;
	let context = graphics_canvasChara.getContext('2d');
	context.fillStyle = 'yellow';
	context.clearRect(0, 0, graphics_canvasChara.width, graphics_canvasChara.height);
	context.drawImage(graphics_charaSpriteStatus.sprite, charaPositionX - 10 * graphics_sizeScale, charaPositionY - 5 * graphics_sizeScale, graphics_charaSpriteStatus.sprite.width, graphics_charaSpriteStatus.sprite.height);
	return [charaPositionX, charaPositionY];
}

function graphics_updateChara(positionOld, positionNew, frameDiff) {
	let direction = 0;
	if (positionNew[0] > positionOld[0]) {
		// Direction: right.
		direction = 1;
	} else if (positionNew[0] < positionOld[0]) {
		// Direction: left.
		direction = 2;
	}
	
	let status = 0;
	if (positionNew[1] < positionOld[1]) {
		// Status: jump.
		status = 3;
	} else if (positionNew[1] > positionOld[1]) {
		// Status: fall.
		status = 4;
	} else {
		if (direction == 0) {
			// Status: idle.
			status = 1;
		} else {
			// Status: running.
			status = 2;
		}
	}
	
	if (direction == graphics_charaSpriteStatus.direction) {
		// Direction: unchanged.
		direction = 0;
	}
	if (status == graphics_charaSpriteStatus.status) {
		// Status: unchanged.
		status = 0;
	}
	
	if (direction != 0 || status != 0) {
		if (direction != 0) {
			graphics_charaSpriteStatus.direction = direction;
		}
		if (status != 0) {
			graphics_charaSpriteStatus.status = status;
		}
		graphics_charaSpriteStatus.frame = 0;
		switch (graphics_charaSpriteStatus.direction) {
			case 1:
				switch (graphics_charaSpriteStatus.status) {
					case 1:
						graphics_charaSpriteStatus.sprite = graphics_spriteCharaIdleRight1;
						break;
					case 2:
						graphics_charaSpriteStatus.sprite = graphics_spriteCharaRunningRight1;
						break;
					case 3:
						graphics_charaSpriteStatus.sprite = graphics_spriteCharaJumpRight1;
						break;
					case 4:
						graphics_charaSpriteStatus.sprite = graphics_spriteCharaFallRight1;
						break;
				}
				break;
			case 2:
				switch (graphics_charaSpriteStatus.status) {
					case 1:
						graphics_charaSpriteStatus.sprite = graphics_spriteCharaIdleLeft1;
						break;
					case 2:
						graphics_charaSpriteStatus.sprite = graphics_spriteCharaRunningLeft1;
						break;
					case 3:
						graphics_charaSpriteStatus.sprite = graphics_spriteCharaJumpLeft1;
						break;
					case 4:
						graphics_charaSpriteStatus.sprite = graphics_spriteCharaFallLeft1;
						break;
				}
				break;
		}
	} else {
		graphics_charaSpriteStatus.frame += frameDiff;
		if (graphics_charaSpriteStatus.frame > graphics_charaSpriteStatus.lifespan) {
			graphics_charaSpriteStatus.frame %= graphics_charaSpriteStatus.lifespan;
			// Switch to next alternate sprite.
			switch (graphics_charaSpriteStatus.direction) {
				case 1:
					switch (graphics_charaSpriteStatus.status) {
						case 1:
							switch (graphics_charaSpriteStatus.sprite) {
								case graphics_spriteCharaIdleRight1:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaIdleRight2;
									break;
								case graphics_spriteCharaIdleRight2:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaIdleRight3;
									break;
								case graphics_spriteCharaIdleRight3:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaIdleRight4;
									break;
								case graphics_spriteCharaIdleRight4:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaIdleRight1;
									break;
							}
							break;
						case 2:
							switch (graphics_charaSpriteStatus.sprite) {
								case graphics_spriteCharaRunningRight1:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaRunningRight2;
									break;
								case graphics_spriteCharaRunningRight2:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaRunningRight3;
									break;
								case graphics_spriteCharaRunningRight3:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaRunningRight4;
									break;
								case graphics_spriteCharaRunningRight4:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaRunningRight1;
									break;
							}
							break;
						case 3:
							switch (graphics_charaSpriteStatus.sprite) {
								case graphics_spriteCharaJumpRight1:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaJumpRight2;
									break;
								case graphics_spriteCharaJumpRight2:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaJumpRight1;
									break;
							}
							break;
						case 4:
							switch (graphics_charaSpriteStatus.sprite) {
								case graphics_spriteCharaFallRight1:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaFallRight2;
									break;
								case graphics_spriteCharaFallRight2:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaFallRight1;
									break;
							}
							break;
					}
					break;
				case 2:
					switch (graphics_charaSpriteStatus.status) {
						case 1:
							switch (graphics_charaSpriteStatus.sprite) {
								case graphics_spriteCharaIdleLeft1:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaIdleLeft2;
									break;
								case graphics_spriteCharaIdleLeft2:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaIdleLeft3;
									break;
								case graphics_spriteCharaIdleLeft3:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaIdleLeft4;
									break;
								case graphics_spriteCharaIdleLeft4:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaIdleLeft1;
									break;
							}
							break;
						case 2:
							switch (graphics_charaSpriteStatus.sprite) {
								case graphics_spriteCharaRunningLeft1:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaRunningLeft2;
									break;
								case graphics_spriteCharaRunningLeft2:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaRunningLeft3;
									break;
								case graphics_spriteCharaRunningLeft3:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaRunningLeft4;
									break;
								case graphics_spriteCharaRunningLeft4:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaRunningLeft1;
									break;
							}
							break;
						case 3:
							switch (graphics_charaSpriteStatus.sprite) {
								case graphics_spriteCharaJumpLeft1:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaJumpLeft2;
									break;
								case graphics_spriteCharaJumpLeft2:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaJumpLeft1;
									break;
							}
							break;
						case 4:
							switch (graphics_charaSpriteStatus.sprite) {
								case graphics_spriteCharaFallLeft1:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaFallLeft2;
									break;
								case graphics_spriteCharaFallLeft2:
									graphics_charaSpriteStatus.sprite = graphics_spriteCharaFallLeft1;
									break;
							}
							break;
					}
					break;
			}
		}
	}
	
	let context = graphics_canvasChara.getContext('2d');
	context.clearRect(positionOld[0] - 10 * graphics_sizeScale - 1, positionOld[1] - 5 * graphics_sizeScale - 1, graphics_blockSize + 2, graphics_blockSize + 2);
	context.drawImage(graphics_charaSpriteStatus.sprite, positionNew[0] - 10 * graphics_sizeScale, positionNew[1] - 5 * graphics_sizeScale, graphics_charaSpriteStatus.sprite.width, graphics_charaSpriteStatus.sprite.height);
}

function graphics_clearChara() {
	let context = graphics_canvasChara.getContext('2d');
	context.clearRect(0, 0, graphics_canvasChara.width, graphics_canvasChara.height);
}

function graphics_resetAnimations() {
	for (let animationID in graphics_animationList) {
		if (graphics_animationList[animationID].id != "chara_death" &&
			graphics_animationList[animationID].id != "chara_teleportation_success" &&
			graphics_animationList[animationID].id != "chara_teleportation_failure" &&
			graphics_animationList[animationID].id != "invincibility_indicator" &&
			graphics_animationList[animationID].id != "teleportation_indicator") {
			graphics_animationList.splice(animationID, 1);
		}
	}
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
		id: "chara_death",
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
		id: "chara_teleportation_success",
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
		id: "chara_teleportation_failure",
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
		id: "invincibility_indicator",
		render: function(frameDiff) {
			if (control_invincibilityMode) {
				let context = graphics_canvasAnimations.getContext('2d');
				context.fillStyle = 'rgba(255, 0, 255, 1)';
				context.font = fontSize + 'px monospace';
				context.fillText("[INVINCIBILITY]", graphics_canvasAnimations.width - fontSize * 10, fontSize * 2);
			}
		}
	});
}

function graphics_registerTeleportationIndicatorAnimation() {
	let fontSize = graphics_charaSizeX;
	graphics_animationList.push({
		id: "teleportation_indicator",
		render: function(frameDiff) {
			if (control_teleportationMode) {
				let context = graphics_canvasAnimations.getContext('2d');
				context.fillStyle = 'rgba(255, 0, 255, 1)';
				context.font = fontSize + 'px monospace';
				context.fillText("[TELEPORTATION]", graphics_canvasAnimations.width - fontSize * 10, fontSize * 3.5);
			}
		}
	});
}

function graphics_registerSavePointsAnimation(chara) {
	graphics_animationList.push({
		id: "save_points",
		render: function(frameDiff) {
			for (let savePointID in chara.savePoints) {
				if (chara.savePoints[savePointID][0] != chara.spawnPosition[0] || chara.savePoints[savePointID][1] != chara.spawnPosition[1]) {
					graphics_drawSave(chara.savePoints[savePointID]);
				}
			}
		}
	});
}
