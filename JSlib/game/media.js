let media_audioContext = null;

let media_audioBuffers = {};

let media_musicSources = {};

function media_loadAudio(mediaFiles) {
	// Audio context can only be created and resumed on direct user interaction.
	if (media_audioContext == null) {
		media_audioContext = new AudioContext();
	}
	if (media_audioContext.state == 'suspended') {
		media_audioContext.resume();
	}
	
	media_audioBuffers = {};
	
	for (let audioID in mediaFiles) {
		// Request audio file.
		let request = new XMLHttpRequest();
		request.open('GET', mediaFiles[audioID], true);
		request.responseType = 'arraybuffer';
		request.onload = function() {
			media_audioBuffers[audioID] = request.response;
			// Background music starts immediately after loaded.
			if (audioID == "music_background") {
				media_resumeMusic(audioID, true);
			}
		}
		request.send();
	}
}

function media_playSound(audioID) {
	// Sound should be very short in duration.
	// A piece of sound can have multiple instances playing at the same time.
	// Sound cannot be looped, paused or resumed.
	// Sound will not be stopped at level restart.
	media_audioContext.decodeAudioData(media_audioBuffers[audioID].slice()).then(function(buffer) {
		let source = media_audioContext.createBufferSource();
		source.buffer = buffer;
		source.connect(media_audioContext.destination);
		source.start();
	});
}

function media_playMusic(audioID, loop) {
	// Music can be longer in duration.
	// A piece of music should not have multiple instances playing at the same time.
	// Music can be looped, paused or resumed.
	// Music will be stopped at level restart.
	media_audioContext.decodeAudioData(media_audioBuffers[audioID].slice()).then(function(buffer) {
		let source = media_audioContext.createBufferSource();
		source.buffer = buffer;
		source.loop = loop;
		source.connect(media_audioContext.destination);
		source.start();
		media_musicSources[audioID] = {
			source: source,
			paused: false,
			startTime: media_audioContext.currentTime,
			offset: 0
		};
	});
}

function media_resumeMusic(audioID, loop) {
	if (media_musicSources[audioID]) {
		if (media_musicSources[audioID].paused) {
			media_musicSources[audioID].paused = false;
			media_musicSources[audioID].startTime = media_audioContext.currentTime;
			media_audioContext.decodeAudioData(media_audioBuffers[audioID].slice()).then(function(buffer) {
				let source = media_audioContext.createBufferSource();
				source.buffer = buffer;
				source.loop = loop;
				source.connect(media_audioContext.destination);
				source.start(0, media_musicSources[audioID].offset);
				media_musicSources[audioID].source = source;
			});
		}
	} else {
		media_playMusic(audioID, loop);
	}
}

function media_pauseMusic() {
	if (arguments.length == 0) {
		// Pause all music.
		for (let i in media_musicSources) {
			if (!media_musicSources[i].paused) {
				media_musicSources[i].paused = true;
				media_musicSources[i].offset = (media_musicSources[i].offset + media_audioContext.currentTime - media_musicSources[i].startTime) % media_musicSources[i].source.buffer.duration;
				media_musicSources[i].source.stop();
			}
		}
	} else {
		for (let i in arguments) {
			if (media_musicSources[arguments[i]]) {
				if (!media_musicSources[arguments[i]].paused) {
					media_musicSources[arguments[i]].paused = true;
					media_musicSources[arguments[i]].offset = (media_musicSources[arguments[i]].offset + media_audioContext.currentTime - media_musicSources[arguments[i]].startTime) % media_musicSources[arguments[i]].source.buffer.duration;
					media_musicSources[arguments[i]].source.stop();
				}
			}
		}
	}
}

function media_stopMusic() {
	if (arguments.length == 0) {
		// Stop all music.
		for (let i in media_musicSources) {
			if (!media_musicSources[i].paused) {
				media_musicSources[i].paused = true;
				media_musicSources[i].offset = 0;
				media_musicSources[i].source.stop();
			}
		}
	} else {
		for (let i in arguments) {
			if (media_musicSources[arguments[i]]) {
				if (!media_musicSources[arguments[i]].paused) {
					media_musicSources[arguments[i]].paused = true;
					media_musicSources[arguments[i]].offset = 0;
					media_musicSources[arguments[i]].source.stop();
				}
			}
		}
	}
}

function media_clearMusicSources() {
	media_musicSources = {};
}
