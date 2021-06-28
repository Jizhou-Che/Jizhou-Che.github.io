let media_audioContext = null;

let media_audioBuffers = null;

function media_loadAudio(mediaFiles) {
	// Audio context can only be created and resumed on direct user interaction.
	if (media_audioContext == null) {
		media_audioContext = new AudioContext();
	}
	if (media_audioContext.state == 'suspended') {
		media_audioContext.resume();
	}
	
	media_audioBuffers = new Array(mediaFiles.length);
	
	for (let i = 0; i < mediaFiles.length; i++) {
		// Request audio file.
		let request = new XMLHttpRequest();
		request.open('GET', mediaFiles[i], true);
		request.responseType = 'arraybuffer';
		request.onload = function() {
			media_audioBuffers[i] = request.response;
		}
		request.send();
	}
}

function media_replayAudio(audioID) {
	let source = media_audioContext.createBufferSource();
	media_audioContext.decodeAudioData(media_audioBuffers[audioID].slice()).then(function(buffer) {
		source.buffer = buffer;
		source.connect(media_audioContext.destination);
		source.start();
	});
}
