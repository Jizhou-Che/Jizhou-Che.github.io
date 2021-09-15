let game1_chara = {
	spawnPosition: [12, 2]
}

let game1_map = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 9, 9, 9, 9, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[9, 0, 9, 9, 9, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 9],
	[9, 9, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 0, 0, 0, 0, 9],
	[9, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
	[9, 1, 0, 1, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 9],
	[9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
];

let game1_triggers = [
	{
		id: 0,
		stage: 0,
		progress: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					trap_addSpike(1, 1, [3.95, 3.5]);
					trap_addSpike(3, 0.5, [2, 2]);
					trap_addBlock(blocksPixels, 0.5, [10, 16.25]);
					this.stage = 1;
					break;
			}
		}
	},
	{
		id: 1,
		stage: 0,
		progress: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlockBottom(charaPositionOld, charaPositionNew, [12, 11])) {
						trap_addBlock(blocksPixels, 1, [12, 11]);
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		id: 2,
		stage: 0,
		progress: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [11, 7])) {
						trap_addSpike(1, 1, [11, 7]);
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		id: 3,
		stage: 0,
		progress: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPositionNew, [13, 20.5])) {
						trap_addMovingSpikeLinear(3, 1, [13, 22], [13, 19], 100);
						trap_addMovingSpikeLinear(4, 1, [13, 19], [13, 22], 100);
						this.stage = 1;
					}
					break;
			}
		}
	},
	{
		id: 4,
		stage: 0,
		progress: 0,
		fire: function(charaPositionOld, charaPositionNew, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaInBlock(charaPositionNew, [11, 20.5])) {
						trap_addBlock(blocksPixels, 1, [10, 20.5]);
						this.stage = 1;
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
	"music_background" : "Resources/Music/Dr. Wily Stage 1 - 2.m4a",
	"music_death" : "Resources/Music/Might Is Right But Tight.m4a"
};
