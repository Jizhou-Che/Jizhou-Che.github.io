let physics_frame = null;

let physics_charaKilled = null;

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
	let charaSpeedX = gameConfig_speedX * graphics_blockSize;
	let charaSpeedY = 0;
	let charaGravity = gameConfig_gravity * graphics_blockSize;
	let charaJump1InitSpeedY = gameConfig_jump1InitSpeedY * graphics_blockSize;
	let charaJump2InitSpeedY = gameConfig_jump2InitSpeedY * graphics_blockSize;
	let charaJumpStatus = 2;
	let charaLastJumpKey = false;
	let charaLastKillKey = false;
	physics_charaKilled = false;
	
	// Request animation frame.
	let lastFrameNumber = 0;
	let frameDuration = 1000 / gameConfig_fps;
	let timeInit = performance.now();
	physics_frame = requestAnimationFrame(function renderFrame(timeNow) {
		frameNumber = Math.floor((timeNow - timeInit) / frameDuration);
		if (frameNumber > lastFrameNumber) {
			frameDiff = frameNumber - lastFrameNumber;
			
			if (!physics_charaKilled) {
				// Suicide check.
				if (charaLastKillKey && !control_gameKeysCheat[0]) {
					// Chara blew up.
					physics_charaKilled = true;
					graphics_clearChara();
					graphics_registerCharaDeathAnimation(charaPositionNew);
					media_muteMusic("music_background");
					media_playSound("sound_death");
					media_playMusic("music_death", false);
				}
				charaLastKillKey = control_gameKeysCheat[0];
			}
			
			if (!physics_charaKilled) {
				// Teleportation check.
				let charaTeleported = false;
				if (control_charaTeleportation) {
					let charaTeleportationAllowed = true;
					charaPositionNew = [control_charaTeleportation[0] - graphics_charaSizeX / 2, control_charaTeleportation[1] - graphics_charaSizeY / 2];
					let charaCollision = blocksContext.getImageData(charaPositionNew[0], charaPositionNew[1], graphics_charaSizeX, graphics_charaSizeY);
					for (let i = 3; i < charaCollision.data.length; i += 4) {
						if (charaCollision.data[i] != 0) {
							charaTeleportationAllowed = false;
							break;
						}
					}
					if (charaTeleportationAllowed) {
						// TODO: Play sound effect.
						graphics_registerCharaTeleportationSuccessAnimation(charaPositionNew);
						charaTeleported = true;
					} else {
						// TODO: Play sound effect.
						graphics_registerCharaTeleportationFailureAnimation(charaPositionNew);
						charaPositionNew = charaPositionOld.slice();
					}
					control_charaTeleportation = null;
				} else {
					charaPositionNew = charaPositionOld.slice();
				}
				
				// Movement check.
				if (!charaTeleported) {
					// Chara horizontal movement.
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
					let charaStepX2 = Math.ceil(charaPositionOld[0] + graphics_charaSizeX);
					charaStepX2 = Math.min(Math.max(charaStepX2, 0), blocksImageData.width);
					let charaStepY = Math.ceil(charaPositionOld[1] + graphics_charaSizeY);
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
				}
				
				// Fire triggers.
				trigger_fireTriggers(charaPositionNew, blocksPixels, frameDiff);
				
				// Update trap spikes.
				trap_updateTrapSpikes(frameDiff);
				
				// Collision detection.
				let charaCollidesLeft = false;
				let charaCollidesRight = false;
				let charaCollidesTop = false;
				let charaCollidesBottom = false;
				if (!charaTeleported) {
					let charaMovementX = charaPositionNew[0] - charaPositionOld[0];
					let charaMovementY = charaPositionNew[1] - charaPositionOld[1];
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
							let rangeX2 = Math.ceil(charaPositionTracker[0] + graphics_charaSizeX);
							if (charaMovementUnitX < 0) {
								rangeX1 += 1;
							}
							rangeX1 = Math.min(Math.max(rangeX1, 0), blocksImageData.width);
							if (charaMovementUnitX > 0) {
								rangeX2 -= 1;
							}
							rangeX2 = Math.min(Math.max(rangeX2, 0), blocksImageData.width);
							let rangeY1 = Math.floor(charaPositionTracker[1]);
							let rangeY2 = Math.ceil(charaPositionTracker[1] + graphics_charaSizeY);
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
								let charaRightX = Math.ceil(charaPositionTracker[0] + graphics_charaSizeX) - 1;
								let charaRightCollision = [];
								if (charaRightX >= 0 && charaRightX < blocksImageData.width) {
									charaRightCollision = blocksPixels.slice(rangeY1, rangeY2).map(a => a[charaRightX]);
								}
								if (charaRightCollision.some(v => v == true)) {
									// Right collision.
									charaCollidesRight = true;
									charaMovementUnitX = 0;
									charaPositionTracker[0] = Math.ceil(charaPositionTracker[0] + graphics_charaSizeX) - 1 - graphics_charaSizeX;
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
								let charaBottomY = Math.ceil(charaPositionTracker[1] + graphics_charaSizeY) - 1;
								let charaBottomCollision = [];
								if (charaBottomY >= 0 && charaBottomY < blocksImageData.height) {
									charaBottomCollision = blocksPixels[charaBottomY].slice(rangeX1, rangeX2);
								}
								if (charaBottomCollision.some(v => v == true)) {
									// Bottom collision.
									charaCollidesBottom = true;
									charaSpeedY = 0;
									charaMovementUnitY = 0;
									charaPositionTracker[1] = Math.ceil(charaPositionTracker[1] + graphics_charaSizeY) - 1 - graphics_charaSizeY;
									charaPositionNew[1] = charaPositionTracker[1];
								}
							}
						}
					}
				}
				
				// Death check.
				if (!(control_gameKeysCheat[3] && control_gameKeysCheat[4] && control_gameKeysCheat[5])) {
					control_invincibilityMode = false;
					let charaSpikeCollision = spikesContext.getImageData(charaPositionNew[0], charaPositionNew[1], graphics_charaSizeX, graphics_charaSizeY);
					let charaTrapSpikeCollision = trapSpikesContext.getImageData(charaPositionNew[0], charaPositionNew[1], graphics_charaSizeX, graphics_charaSizeY);
					for (let i = 3; i < charaSpikeCollision.data.length; i += 4) {
						if (charaSpikeCollision.data[i] != 0 || charaTrapSpikeCollision.data[i] != 0) {
							// Chara was pricked to death.
							physics_charaKilled = true;
							graphics_clearChara();
							graphics_registerCharaDeathAnimation(charaPositionNew);
							media_muteMusic("music_background");
							media_playSound("sound_death");
							media_playMusic("music_death", false);
							break;
						}
					}
				} else {
					control_invincibilityMode = true;
				}
				let charaLeftX = Math.floor(charaPositionNew[0]);
				let charaRightX = Math.ceil(charaPositionNew[0] + graphics_charaSizeX) - 1;
				let charaTopY = Math.floor(charaPositionNew[1]);
				let charaBottomY = Math.ceil(charaPositionNew[1] + graphics_charaSizeY) - 1;
				if ((charaLeftX < 0 && charaRightX < 0) ||
					(charaLeftX >= blocksImageData.width && charaRightX >= blocksImageData.width) ||
					(charaTopY < 0 && charaBottomY < 0) ||
					(charaTopY >= blocksImageData.height && charaBottomY >= blocksImageData.height)) {
					// Chara fell out of the world.
					physics_charaKilled = true;
					graphics_clearChara();
					graphics_registerCharaDeathAnimation(charaPositionNew);
					media_muteMusic("music_background");
					media_playSound("sound_death");
					media_playMusic("music_death", false);
				}
				if ((charaCollidesLeft && charaCollidesRight) || (charaCollidesTop && charaCollidesBottom)) {
					// Chara suffocated in a wall.
					physics_charaKilled = true;
					graphics_clearChara();
					graphics_registerCharaDeathAnimation(charaPositionNew);
					media_muteMusic("music_background");
					media_playSound("sound_death");
					media_playMusic("music_death", false);
				}
			}
			
			// Update frame.
			if (!physics_charaKilled) {
				graphics_updateChara(charaPositionOld, charaPositionNew);
				charaPositionOld = charaPositionNew;
			}
			graphics_renderAnimations(frameDiff);
			
			lastFrameNumber = frameNumber;
		}
		
		physics_frame = requestAnimationFrame(renderFrame);
	});
}

function physics_stop() {
	if (physics_frame != null) {
		cancelAnimationFrame(physics_frame);
	}
}
