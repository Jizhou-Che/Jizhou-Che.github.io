function animate(render, timing, duration) {
	let timeInit = performance.now();
	animation = requestAnimationFrame(function animateFrame(timeNow) {
		let timeFrac = (timeNow - timeInit) / duration;
		if (timeFrac > 1) {
			timeFrac = 1;
		}
		let progress = timing(timeFrac);
		render(progress);
		if (timeFrac < 1) {
			requestAnimationFrame(animateFrame);
		}
	});
	return animation;
}
