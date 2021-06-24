function physics_start(gameCanvasBlocks, gameCanvasChara, gameKeys) {
	// Initialise Chara.
	let charaPositionOld = graphics_resetChara(gameCanvasChara, game1_charaSpawnRow, game1_charaSpawnCol);
	let blockSize = gameCanvasBlocks.width / gameConfig_numBlocksX;
	let charaSizeX = gameConfig_charaSizeX * blockSize;
	let charaSizeY = gameConfig_charaSizeY * blockSize;
	let charaSpeed = gameConfig_speed * blockSize;
	
	// Initialise blocks.
	let blocksContext = gameCanvasBlocks.getContext('2d');
	let blocksImageData = blocksContext.getImageData(0, 0, gameCanvasBlocks.width, gameCanvasBlocks.height);
	let blocksPixelsFlat = new Array(blocksImageData.data.length / 4);
	for (let i = 0; i < blocksPixelsFlat.length; i++) {
		// Check alpha values only.
		blocksPixelsFlat[i] = blocksImageData.data[i * 4 + 3] != 0;
	}
	let blocksPixels = new Array(blocksImageData.height);
	for (let i = 0; i < blocksPixels.length; i++) {
		blocksPixels[i] = blocksPixelsFlat.slice(i * blocksImageData.width, (i + 1) * blocksImageData.width);
	}
	
	// Request animation frame.
	let lastFrameNumber = 0;
	let frameDuration = 1000 / gameConfig_fps;
	let timeInit = performance.now();
	let frame = requestAnimationFrame(function renderFrame(timeNow) {
		frameNumber = Math.floor((timeNow - timeInit) / frameDuration);
		if (frameNumber > lastFrameNumber) {
			frameDiff = frameNumber - lastFrameNumber;
			
			// Chara horizontal movement.
			let charaPositionNew = charaPositionOld.slice();
			if (gameKeys[1]) {
				// Chara moves left.
				charaPositionNew[0] -= charaSpeed * frameDiff;
			} else if (gameKeys[2]) {
				// Chara moves right.
				charaPositionNew[0] += charaSpeed * frameDiff;
			}
			
			// Chara vertical movement.
			
			// Trigger check.
			
			// Collision correction.
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
					if (charaMovementUnitX > 0) {
						let charaRightCollision = blocksPixels.slice(Math.ceil(charaPositionTracker[1]), Math.floor(charaPositionTracker[1] + charaSizeY)).map(a => a[Math.floor(charaPositionTracker[0] + charaSizeX)]);
						if (charaRightCollision.some(v => v == true)) {
							// Right collision.
							charaMovementUnitX = 0;
							charaPositionTracker[0] = Math.floor(charaPositionTracker[0]) - 1;
							charaPositionNew[0] = charaPositionTracker[0];
						}
					}
					if (charaMovementUnitX < 0) {
						let charaLeftCollision = blocksPixels.slice(Math.ceil(charaPositionTracker[1]), Math.floor(charaPositionTracker[1] + charaSizeY)).map(a => a[Math.floor(charaPositionTracker[0])]);
						if (charaLeftCollision.some(v => v == true)) {
							// Left collision.
							charaMovementUnitX = 0;
							charaPositionTracker[0] = Math.floor(charaPositionTracker[0]) + 1;
							charaPositionNew[0] = charaPositionTracker[0];
						}
					}
					if (charaMovementUnitY > 0) {
						//
					}
					if (charaMovementUnitY < 0) {
						//
					}
				}
			}
			
			// Death check.
			
			// Update frame.
			graphics_updateChara(gameCanvasChara, charaPositionOld, charaPositionNew);
			charaPositionOld = charaPositionNew;
			lastFrameNumber = frameNumber;
		}
		frame = requestAnimationFrame(renderFrame);
	});
}

function physics_stop() {}
