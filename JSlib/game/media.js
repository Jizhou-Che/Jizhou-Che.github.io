let audioContext = null;

function media_loadAudio(mediaFiles) {
	// Audio context can only be created and resumed on direct user interaction.
	if (audioContext == null) {
		audioContext = new AudioContext();
	}
	if (audioContext.state == 'suspended') {
		audioContext.resume();
	}
	
	let mediaBuffers = new Array(mediaFiles.length);
	
	for (let i = 0; i < mediaFiles.length; i++) {
		// Request audio file.
		let request = new XMLHttpRequest();
		request.open('GET', mediaFiles[i], true);
		request.responseType = 'arraybuffer';
		request.onload = function() {
			mediaBuffers[i] = request.response;
		}
		request.send();
	}
	
	return mediaBuffers;
}

function media_replayAudio(arrayBuffer) {
	let source = audioContext.createBufferSource();
	audioContext.decodeAudioData(arrayBuffer).then(function(buffer) {
		source.buffer = buffer;
		source.connect(audioContext.destination);
		source.start();
	});
}
