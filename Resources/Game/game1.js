let game1_chara = {
	spawnPosition: [12, 1],
	savePoints: [[12, 1], [13, 7], [8, 17], [2, 14]]
}

let game1_map = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	[0, 0, 9, 9, 9, 9, 9, 9, 0, 9, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
	[0, 0, 0, 0, 0, 0, 0, 9, 0, 9, 0, 1, 0, 9, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
	[9, 9, 9, 9, 0, 0, 0, 9, 0, 9, 0, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[9, 0, 0, 9, 0, 0, 0, 9, 0, 9, 0, 0, 0, 0, 0, 9, 0, 0, 0, 1, 0, 0, 0, 0],
	[9, 9, 0, 9, 9, 9, 0, 9, 0, 9, 9, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 1, 1],
	[0, 0, 0, 0, 0, 0, 3, 9, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9],
	[0, 0, 9, 9, 9, 9, 9, 9, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 9, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 9, 0, 0, 9, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9, 9, 9, 0, 0],
	[0, 9, 9, 9, 0, 0, 9, 0, 3, 9, 9, 9, 9, 9, 9, 9, 2, 0, 2, 0, 2, 9, 0, 0],
	[0, 0, 0, 0, 0, 0, 9, 0, 0, 9, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0],
	[0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 1, 1, 1, 0, 9, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
];

let game1_triggers = [
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					trap_addSpike(3, 0.5, [1, 1]);
					trap_addSpike(4, 0.5, [2.5, 0]);
					trap_addBlock(blocksPixels, 0.5, [1, 1.5]);
					this.stage = 1;
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [12, 1])) {
						game1_chara.spawnPosition = [12, 1];
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [11, 2]) || trigger_charaReachBlock(charaPositionNew, [12, 2])) {
						trap_removeSpike(1, [13, 2]);
						trap_addMovingSpikeLinear(1, 1, [13, 2], [10, 2], 15);
						media_playSound("sound_trapSpike");
						this.stage = 1;
					}
					break;
				case 1:
					if (trigger_charaReachBlock(charaPositionNew, [14, 1])) {
						trap_addSpike(1, 1, [13, 1]);
						media_playSound("sound_trapSpike");
						this.stage = 2;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [11, 3.5]) || trigger_charaReachBlock(charaPositionNew, [12, 3.5])) {
						trap_addBlock(blocksPixels, 1, [11, 3.5]);
						media_playSound("sound_trapBlock");
						this.stage = 1;
					}
					break;
				case 1:
					if (trigger_charaReachBlockTop(charaPositionOld, charaPositionNew, [11, 3.5])) {
						trap_addSpike(1, 0.5, [10.5, 4]);
						media_playSound("sound_trapSpike");
						this.stage = 2;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [6, 4])) {
						trap_removeSpike(1, [6, 6]);
						trap_addMovingSpikeLinear(3, 1, [6, 6], [6, 0.5], 60);
						trap_addBlock(blocksPixels, 1, [7, 0]);
						trap_addBlock(blocksPixels, 1, [7, 1]);
						media_playSound("sound_trapSpike");
						this.stage = 1;
					}
					break;
				case 1:
					if (trigger_charaReachBlockTop(charaPositionOld, charaPositionNew, [6, 2])) {
						trap_addBlock(blocksPixels, 1, [6, 2]);
						media_playSound("sound_ohYes");
						this.stage = 2;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlockTop(charaPositionOld, charaPositionNew, [5, 4]) || trigger_charaReachBlockTop(charaPositionOld, charaPositionNew, [5, 5])) {
						trap_addSpike(1, 1, [4, 4]);
						trap_addSpike(1, 1, [4, 5]);
						media_playSound("sound_trapSpike");
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		progress: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [0, 1.5])) {
						trap_addBlock(blocksPixels, 1, [0, 3]);
						trap_addBlock(blocksPixels, 1, [0, 4]);
						trap_addBlock(blocksPixels, 1, [0, 5]);
						trap_addBlock(blocksPixels, 1, [0, 6]);
						trap_addBlock(blocksPixels, 1, [0, 7]);
						trap_addBlock(blocksPixels, 1, [0, 8]);
						trap_addBlock(blocksPixels, 1, [2, 2]);
						trap_addBlock(blocksPixels, 1, [2, 3]);
						trap_addBlock(blocksPixels, 1, [2, 4]);
						trap_addBlock(blocksPixels, 1, [2, 5]);
						trap_addBlock(blocksPixels, 1, [2, 6]);
						trap_removeBlock(blocksPixels, 1, [1, 2]);
						trap_removeBlock(blocksPixels, 1, [1, 3]);
						trap_removeBlock(blocksPixels, 1, [1, 4]);
						trap_removeBlock(blocksPixels, 1, [1, 5]);
						trap_removeBlock(blocksPixels, 1, [1, 6]);
						trap_removeBlock(blocksPixels, 1, [1, 7]);
						media_playSound("sound_trapBlock");
						this.stage = 1;
					}
					break;
				case 1:
					if (trigger_charaReachBlock(charaPositionNew, [1, 5])) {
						trap_addMovingSpikeLinear(2, 1, [1, 3], [1, 5], 80);
						trap_addMovingSpikeLinear(2, 1, [1, 6], [1, 8], 80);
						media_playSound("sound_trapSpike");
						this.stage = 2;
					}
					break;
				case 2:
					this.progress += frameDiff;
					if (this.progress >= 80) {
						trap_addMovingSpikeLinear(2, 1, [1, 5], [1, 0], 60);
						trap_addMovingSpikeLinear(2, 1, [1, 8], [1, 3], 60);
						media_playSound("sound_trapSpike");
						this.progress = 0;
						this.stage = 3;
					}
					break;
				case 3:
					this.progress += frameDiff;
					if (this.progress >= 60) {
						this.stage = 4;
					}
					break;
				case 4:
					trigger_triggerList.push({
						stage: 0,
						fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
							switch (this.stage) {
								case 0:
									if (trigger_charaReachBlock(charaPositionNew, [2, 4])) {
										trap_removeBlock(blocksPixels, 1, [2, 4]);
										media_playSound("sound_trapBlockBreak");
										this.stage = 1;
									}
									break;
							}
						}
					});
					trigger_triggerList.push({
						stage: 0,
						fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
							switch (this.stage) {
								case 0:
									if (trigger_charaReachBlock(charaPositionNew, [2, 5])) {
										trap_removeBlock(blocksPixels, 1, [2, 5]);
										media_playSound("sound_trapBlockBreak");
										this.stage = 1;
									}
									break;
							}
						}
					});
					trigger_triggerList.push({
						stage: 0,
						fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
							switch (this.stage) {
								case 0:
									if (trigger_charaReachBlock(charaPositionNew, [2, 6])) {
										trap_removeBlock(blocksPixels, 1, [2, 6]);
										media_playSound("sound_trapBlockBreak");
										this.stage = 1;
									}
									break;
							}
						}
					});
					this.stage = 5;
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [8, 7]) || trigger_charaReachBlock(charaPositionNew, [9, 7])) {
						trap_addSpike(4, 1, [8, 7]);
						trap_addSpike(4, 1, [9, 7]);
						media_playSound("sound_trapSpike");
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [9, 8])) {
						trap_removeSpike(1, [10, 8]);
						media_playSound("sound_trapSpike");
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [13, 7])) {
						game1_chara.spawnPosition = [13, 7];
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [12, 10])) {
						trap_removeSpike(1, [11, 10]);
						trap_removeSpike(1, [13, 10]);
						trap_addMovingSpikeLinear(2, 1, [11, 10], [11, 11], 10);
						trap_addMovingSpikeLinear(1, 1, [13, 10], [13, 11], 10);
						media_playSound("sound_trapSpike");
						this.stage = 1;
					}
					break;
				case 1:
					this.progress += frameDiff;
					if (this.progress >= 10) {
						trap_addMovingSpikeLinear(2, 1, [11, 11], [11, 10], 10);
						trap_addMovingSpikeLinear(1, 1, [13, 11], [13, 10], 10);
						this.progress = 0;
						this.stage = 2;
					}
					break;
				case 2:
					this.progress += frameDiff;
					if (this.progress >= 10) {
						trap_addSpike(2, 1, [11, 10]);
						trap_addSpike(1, 1, [13, 10]);
						this.stage = 3;
					}
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [12, 12])) {
						trap_removeSpike(1, [11, 12]);
						trap_removeSpike(1, [13, 12]);
						trap_addMovingSpikeLinear(2, 1, [11, 12], [11, 16], 30);
						trap_addMovingSpikeLinear(1, 1, [13, 12], [13, 16], 30);
						media_playSound("sound_trapSpike");
						this.stage = 1;
					}
					break;
				case 1:
					if (trigger_charaReachBlock(charaPositionNew, [14, 11]) || trigger_charaReachBlock(charaPositionNew, [14, 12])) {
						trap_removeBlock(blocksPixels, 1, [14, 11]);
						trap_removeBlock(blocksPixels, 1, [14, 12]);
						trap_addSpike(1, 1, [14, 11]);
						trap_addSpike(1, 1, [14, 12]);
						media_playSound("sound_trapBlock");
						this.stage = 2;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [11, 16]) || trigger_charaReachBlock(charaPositionNew, [12, 16]) || trigger_charaReachBlock(charaPositionNew, [13, 16])) {
						trap_removeSpike(1, [10, 16]);
						trap_addMovingSpikeLinear(2, 1, [10, 16], [14, 16], 10);
						media_playSound("sound_biu");
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [11, 18]) || trigger_charaReachBlock(charaPositionNew, [12, 18]) || trigger_charaReachBlock(charaPositionNew, [13, 18])) {
						trap_removeSpike(1, [10, 18]);
						trap_addMovingSpikeLinear(2, 1, [10, 18], [14, 17], 10);
						media_playSound("sound_biu");
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [14, 20])) {
						trap_addSpike(1, 1, [13, 20]);
						media_playSound("sound_ahhhh");
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [10, 22])) {
						trap_addBlock(blocksPixels, 1, [10, 22]);
						media_playSound("sound_trapBlock");
						this.stage = 1;
					}
					break;
				case 1:
					if (trigger_charaReachBlock(charaPositionNew, [13, 22]) || trigger_charaReachBlock(charaPositionNew, [13, 23])) {
						trap_addSpike(1, 1, [13, 22]);
						trap_addSpike(1, 1, [13, 23]);
						media_playSound("sound_trapSpike");
						this.stage = 2;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [6, 19])) {
						trap_removeBlock(blocksPixels, 1, [6, 19]);
						trap_addSpike(2, 1, [5.5, 19]);
						media_playSound("sound_trapBlock");
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [6, 20])) {
						trap_removeBlock(blocksPixels, 1, [6, 20]);
						trap_addSpike(2, 1, [5.5, 20]);
						media_playSound("sound_trapBlock");
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [8, 17])) {
						game1_chara.spawnPosition = [8, 17];
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlockBottom(charaPositionOld, charaPositionNew, [7, 14.5])) {
						trap_addBlock(blocksPixels, 1, [7, 14.5]);
						media_playSound("sound_coin");
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		progress: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [0, 19])) {
						trap_removeSpike(1, [0, 23]);
						trap_addMovingSpikeLinear(3, 1, [0, 23], [0, 20], 100);
						media_playSound("sound_trapSpike");
						this.stage = 1;
					}
					break;
				case 1:
					this.progress += frameDiff;
					if (this.progress >= 100) {
						trap_addMovingSpikeLinear(3, 1, [0, 20], [0, 24], 15);
						media_playSound("sound_trapSpike");
						this.stage = 3;
					}
					if (!trigger_charaReachBlock(charaPositionNew, [0, 19])) {
						trap_addSpike(1, 1, [0, 19]);
						media_playSound("sound_trapSpike");
						this.stage = 2;
					}
					break;
				case 2:
					if (this.progress < 100) {
						this.progress += frameDiff;
						if (this.progress >= 100) {
							trap_addMovingSpikeLinear(3, 1, [0, 20], [0, 24], 15);
							media_playSound("sound_trapSpike");
							this.stage = 3;
						}
					} else {
						this.stage = 3;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		progress: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [3, 18]) || trigger_charaReachBlock(charaPositionNew, [4, 18])) {
						trap_removeSpike(1, [4, 19]);
						trap_addMovingSpikeLinear(1, 1, [4, 19], [4, 16], 20);
						media_playSound("sound_trapSpike");
						this.stage = 1;
					}
					break;
				case 1:
					this.progress += frameDiff;
					if (this.progress >= 20) {
						trap_addSpike(1, 1, [4, 16]);
						this.stage = 2;
					}
					break;
			}
		}
	},
	{
		stage: 0,
		progress: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (game1_chara.spawnPosition[0] == 4 && game1_chara.spawnPosition[1] == 16) {
						trap_addSpike(2, 1, [2, 16]);
						trap_addSpike(1, 1, [3, 16]);
						this.stage = 3;
					} else {
						game1_chara.savePoints[3] = [2, 14];
						if (trigger_charaReachBlock(charaPositionNew, [2, 16]) || trigger_charaReachBlock(charaPositionNew, [3, 16])) {
							this.stage = 1;
						}
					}
					break;
				case 1:
					if (!trigger_charaReachBlock(charaPositionNew, [2, 16]) && !trigger_charaReachBlock(charaPositionNew, [3, 16])) {
						trap_removeSpike(1, [4, 16]);
						trap_addMovingSpikeLinear(2, 1, [1, 16], [2, 16], 5);
						trap_addMovingSpikeLinear(1, 1, [4, 16], [3, 16], 5);
						media_playSound("sound_trapSpike");
						media_playSound("sound_meow");
						this.stage = 2;
					}
					break;
				case 2:
					this.progress += frameDiff;
					game1_chara.savePoints[3][0] += 2 / 5;
					game1_chara.savePoints[3][1] += 2 / 5;
					if (this.progress >= 5) {
						game1_chara.savePoints[3] = [4, 16];
						trap_addSpike(2, 1, [2, 16]);
						trap_addSpike(1, 1, [3, 16]);
						this.stage = 3;
					}
					break;
				case 3:
					if (trigger_charaReachBlock(charaPositionNew, [4.5, 16])) {
						game1_chara.spawnPosition = [4, 16];
						graphics_registerAnimation({
							id: "game_win",
							render: function(frameDiff) {
								let context = graphics_canvasAnimations.getContext('2d');
								let fontSize = graphics_blockSize * 4;
								context.fillStyle = 'rgba(255, 0, 255, 1)';
								context.font = fontSize + 'px monospace';
								context.fillText("NICE!", graphics_blockSize * 6.5, graphics_blockSize * 8);
							}
						});
						this.stage = 4;
					}
					break;
			}
		}
	}
];

let game1_mediaFiles = {
	"sound_jump1" : "Resources/Sound/jump1.wav",
	"sound_jump2" : "Resources/Sound/jump2.wav",
	"sound_death" : "Resources/Sound/death.wav",
	"music_background" : "Resources/Music/Takin' It Back.m4a",
	"music_death" : "Resources/Music/Might Is Right But Tight.m4a",
	"sound_trapSpike" : "Resources/Sound/trapSpike.wav",
	"sound_trapBlock" : "Resources/Sound/trapBlock.wav",
	"sound_trapBlockBreak" : "Resources/Sound/trapBlockBreak.wav",
	"sound_ohYes" : "Resources/Sound/ohYes.wav",
	"sound_biu" : "Resources/Sound/biu.wav",
	"sound_ahhhh" : "Resources/Sound/ahhhh.wav",
	"sound_coin" : "Resources/Sound/coin.wav",
	"sound_meow" : "Resources/Sound/meow.wav"
};
