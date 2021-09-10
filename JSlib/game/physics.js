let physics_frame = null;

function physics_start(chara) {
	// Initialise spikes.
	let spikesContext = graphics_canvasSpikes.getContext('2d');
	let trapSpikesContext = graphics_canvasTrapSpikes.getContext('2d');
	
	// Initialise blocks.
	let blocksContext = graphics_canvasBlocks.getContext('2d');
	let blocksImageData = blocksContext.getImageData(0, 0, graphics_canvasBlocks.width, graphics_canvasBlocks.height);
	let blocksPixelsFlat = new Array(blocksImageData.data.length / 4);
	for (let i = 0; i < blocksPixelsFlat.length; i++) {
		// Check alpha values only.
		blocksPixelsFlat[i] = blocksImageData.data[i * 4 + 3] != 0;
	}
	let blocksPixels = new Array(blocksImageData.height);
	for (let i = 0; i < blocksPixels.length; i++) {
		blocksPixels[i] = blocksPixelsFlat.slice(i * blocksImageData.width, (i + 1) * blocksImageData.width);
	}
	
	// Initialise Chara.
	let charaPositionOld = graphics_resetChara(chara.spawnPosition);
	let charaPositionNew = charaPositionOld.slice();
	let blockSize = graphics_canvasBlocks.width / gameConfig_numBlocksX;
	let charaSizeX = gameConfig_charaSizeX * blockSize;
	let charaSizeY = gameConfig_charaSizeY * blockSize;
	let charaSpeedX = gameConfig_speedX * blockSize;
	let charaSpeedY = 0;
	let charaGravity = gameConfig_gravity * blockSize;
	let charaJump1InitSpeedY = gameConfig_jump1InitSpeedY * blockSize;
	let charaJump2InitSpeedY = gameConfig_jump2InitSpeedY * blockSize;
	let charaJumpStatus = 2;
	let charaLastJumpKey = false;
	let charaKilled = false;
	let charaDeathProgress = 0;
	
	// Request animation frame.
	let lastFrameNumber = 0;
	let frameDuration = 1000 / gameConfig_fps;
	let timeInit = performance.now();
	physics_frame = requestAnimationFrame(function renderFrame(timeNow) {
		frameNumber = Math.floor((timeNow - timeInit) / frameDuration);
		if (frameNumber > lastFrameNumber) {
			frameDiff = frameNumber - lastFrameNumber;
			
			if (!charaKilled) {
				// Chara horizontal movement.
				charaPositionNew = charaPositionOld.slice();
				if (control_gameKeys[1]) {
					// Chara moves left.
					charaPositionNew[0] -= charaSpeedX * frameDiff;
				} else if (control_gameKeys[2]) {
					// Chara moves right.
					charaPositionNew[0] += charaSpeedX * frameDiff;
				}
				
				// Chara vertical movement.
				let charaStepX1 = Math.floor(charaPositionOld[0]);
				charaStepX1 = Math.min(Math.max(charaStepX1, 0), blocksImageData.width);
				let charaStepX2 = Math.ceil(charaPositionOld[0] + charaSizeX);
				charaStepX2 = Math.min(Math.max(charaStepX2, 0), blocksImageData.width);
				let charaStepY = Math.ceil(charaPositionOld[1] + charaSizeY);
				let charaBottomTouch = [];
				if (charaStepY >= 0 && charaStepY < blocksImageData.height) {
					charaBottomTouch = blocksPixels[charaStepY].slice(charaStepX1, charaStepX2);
				}
				if (charaBottomTouch.some(v => v == true)) {
					// Chara is on ground.
					charaJumpStatus = 0;
				} else if (charaJumpStatus == 0) {
					// Chara falls off ground without jumping.
					charaJumpStatus = 1;
				}
				if (!charaLastJumpKey && control_gameKeys[0]) {
					// Chara tries to jump.
					switch (charaJumpStatus) {
						case 0:
							charaJumpStatus = 1;
							charaSpeedY = charaJump1InitSpeedY;
							media_playSound("sound_jump1");
							break;
						case 1:
							charaJumpStatus = 2;
							charaSpeedY = charaJump2InitSpeedY;
							media_playSound("sound_jump2");
							break;
					}
				}
				charaLastJumpKey = control_gameKeys[0];
				if (charaSpeedY < 0 && !control_gameKeys[0]) {
					// Chara moves up but does not hold jump.
					for (let i = 0; i < frameDiff; i++) {
						charaSpeedY *= gameConfig_jumpDecayRate;
						charaSpeedY += charaGravity;
					}
				} else {
					charaSpeedY += charaGravity * frameDiff;
				}
				charaPositionNew[1] += charaSpeedY;
				
				// Fire triggers.
				trigger_fireTriggers(charaPositionNew, blocksPixels, frameDiff);
				
				// Update trap spikes.
				trap_updateTrapSpikes(frameDiff);
				
				// Collision detection.
				let charaMovementX = charaPositionNew[0] - charaPositionOld[0];
				let charaMovementY = charaPositionNew[1] - charaPositionOld[1];
				let charaCollidesLeft = false;
				let charaCollidesRight = false;
				let charaCollidesTop = false;
				let charaCollidesBottom = false;
				if (charaMovementX != 0 || charaMovementY != 0) {
					let charaMovementAbsX = Math.abs(charaMovementX);
					let charaMovementAbsY = Math.abs(charaMovementY);
					let charaMaxMovement = Math.max(charaMovementAbsX, charaMovementAbsY);
					let charaMovementUnitX = charaMovementX / charaMaxMovement;
					let charaMovementUnitY = charaMovementY / charaMaxMovement;
					let numUnits = Math.ceil(charaMaxMovement);
					let charaPositionTracker = charaPositionOld.slice();
					for (let i = 0; i < numUnits; i++) {
						if (i == numUnits - 1) {
							charaPositionTracker = charaPositionNew.slice();
						} else {
							charaPositionTracker[0] += charaMovementUnitX;
							charaPositionTracker[1] += charaMovementUnitY;
						}
						// Boundary tolerence.
						let rangeX1 = Math.floor(charaPositionTracker[0]);
						let rangeX2 = Math.ceil(charaPositionTracker[0] + charaSizeX);
						if (charaMovementUnitX < 0) {
							rangeX1 += 1;
						}
						rangeX1 = Math.min(Math.max(rangeX1, 0), blocksImageData.width);
						if (charaMovementUnitX > 0) {
							rangeX2 -= 1;
						}
						rangeX2 = Math.min(Math.max(rangeX2, 0), blocksImageData.width);
						let rangeY1 = Math.floor(charaPositionTracker[1]);
						let rangeY2 = Math.ceil(charaPositionTracker[1] + charaSizeY);
						if (charaMovementUnitY < 0) {
							rangeY1 += 1;
						}
						rangeY1 = Math.min(Math.max(rangeY1, 0), blocksImageData.height);
						if (charaMovementUnitY > 0) {
							rangeY2 -= 1;
						}
						rangeY2 = Math.min(Math.max(rangeY2, 0), blocksImageData.height);
						// Collision correction.
						if (charaMovementUnitX < 0) {
							let charaLeftX = Math.floor(charaPositionTracker[0]);
							let charaLeftCollision = [];
							if (charaLeftX >= 0 && charaLeftX < blocksImageData.width) {
								charaLeftCollision = blocksPixels.slice(rangeY1, rangeY2).map(a => a[charaLeftX]);
							}
							if (charaLeftCollision.some(v => v == true)) {
								// Left collision.
								charaCollidesLeft = true;
								charaMovementUnitX = 0;
								charaPositionTracker[0] = Math.floor(charaPositionTracker[0]) + 1;
								charaPositionNew[0] = charaPositionTracker[0];
							}
						}
						if (charaMovementUnitX > 0) {
							let charaRightX = Math.ceil(charaPositionTracker[0] + charaSizeX) - 1;
							let charaRightCollision = [];
							if (charaRightX >= 0 && charaRightX < blocksImageData.width) {
								charaRightCollision = blocksPixels.slice(rangeY1, rangeY2).map(a => a[charaRightX]);
							}
							if (charaRightCollision.some(v => v == true)) {
								// Right collision.
								charaCollidesRight = true;
								charaMovementUnitX = 0;
								charaPositionTracker[0] = Math.ceil(charaPositionTracker[0] + charaSizeX) - 1 - charaSizeX;
								charaPositionNew[0] = charaPositionTracker[0];
							}
						}
						if (charaMovementUnitY < 0) {
							let charaTopY = Math.floor(charaPositionTracker[1]);
							let charaTopCollision = [];
							if (charaTopY >= 0 && charaTopY < blocksImageData.height) {
								charaTopCollision = blocksPixels[charaTopY].slice(rangeX1, rangeX2);
							}
							if (charaTopCollision.some(v => v == true)) {
								// Top collision.
								charaCollidesTop = true;
								charaSpeedY = 0;
								charaMovementUnitY = 0;
								charaPositionTracker[1] = Math.floor(charaPositionTracker[1]) + 1;
								charaPositionNew[1] = charaPositionTracker[1];
							}
						}
						if (charaMovementUnitY > 0) {
							let charaBottomY = Math.ceil(charaPositionTracker[1] + charaSizeY) - 1;
							let charaBottomCollision = [];
							if (charaBottomY >= 0 && charaBottomY < blocksImageData.height) {
								charaBottomCollision = blocksPixels[charaBottomY].slice(rangeX1, rangeX2);
							}
							if (charaBottomCollision.some(v => v == true)) {
								// Bottom collision.
								charaCollidesBottom = true;
								charaSpeedY = 0;
								charaMovementUnitY = 0;
								charaPositionTracker[1] = Math.ceil(charaPositionTracker[1] + charaSizeY) - 1 - charaSizeY;
								charaPositionNew[1] = charaPositionTracker[1];
							}
						}
					}
				}
				
				// Death check.
				let charaSpikeCollision = spikesContext.getImageData(charaPositionNew[0], charaPositionNew[1], charaSizeX, charaSizeY);
				let charaTrapSpikeCollision = trapSpikesContext.getImageData(charaPositionNew[0], charaPositionNew[1], charaSizeX, charaSizeY);
				for (let i = 3; i < charaSpikeCollision.data.length; i += 4) {
					if (charaSpikeCollision.data[i] != 0 || charaTrapSpikeCollision.data[i] != 0) {
						// Chara was pricked to death.
						charaKilled = true;
						media_muteMusic("music_background");
						media_playSound("sound_death");
						media_playMusic("music_death", false);
						break;
					}
				}
				let charaLeftX = Math.floor(charaPositionNew[0]);
				let charaRightX = Math.ceil(charaPositionNew[0] + charaSizeX) - 1;
				let charaTopY = Math.floor(charaPositionNew[1]);
				let charaBottomY = Math.ceil(charaPositionNew[1] + charaSizeY) - 1;
				if ((charaLeftX < 0 && charaRightX < 0) ||
					(charaLeftX >= blocksImageData.width && charaRightX >= blocksImageData.width) ||
					(charaTopY < 0 && charaBottomY < 0) ||
					(charaTopY >= blocksImageData.height && charaBottomY >= blocksImageData.height)) {
					// Chara fell out of the world.
					charaKilled = true;
					media_muteMusic("music_background");
					media_playSound("sound_death");
					media_playMusic("music_death", false);
				}
				if ((charaCollidesLeft && charaCollidesRight) || (charaCollidesTop && charaCollidesBottom)) {
					// Chara suffocated in a wall.
					charaKilled = true;
					media_muteMusic("music_background");
					media_playSound("sound_death");
					media_playMusic("music_death", false);
				}
			}
			
			// Update frame.
			if (!charaKilled) {
				graphics_updateChara(charaPositionOld, charaPositionNew);
			} else {
				graphics_updateDeadChara(charaPositionNew, charaDeathProgress);
				charaDeathProgress += 1 / 15 * frameDiff;
			}
			charaPositionOld = charaPositionNew;
			lastFrameNumber = frameNumber;
		}
		
		if (charaDeathProgress < 1) {
			physics_frame = requestAnimationFrame(renderFrame);
		}
	});
}

function physics_stop() {
	if (physics_frame != null) {
		cancelAnimationFrame(physics_frame);
	}
}
