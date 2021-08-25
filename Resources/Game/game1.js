let game1_chara = {
	spawnRow: 12,
	spawnCol: 2
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
		fire: function(charaPosition, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					trap_addSpike(1, 3.95, 3.5, 1);
					trap_addSpike(3, 2, 2, 0.5);
					trap_addBlock(blocksPixels, 10, 16.25, 0.5);
					this.stage = 1;
					break;
			}
		}
	},
	{
		id: 1,
		stage: 0,
		progress: 0,
		fire: function(charaPosition, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPosition, 12, 11)) {
						trap_addBlock(blocksPixels, 12, 11, 1);
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
		fire: function(charaPosition, blocksPixels, frameDiff) {
			switch (this.stage) {
				case 0:
					if (trigger_charaReachBlock(charaPosition, 11, 7)) {
						trap_addSpike(1, 11, 7, 1);
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
	"music_background" : "Resources/Music/Megaman Junction.mp3",
	"music_death" : "Resources/Music/Might Is Right But Tight.wav"
};
