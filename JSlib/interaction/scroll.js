function scroll_windowScrollPercent() {
	return window.scrollY / (document.body.offsetHeight - window.innerHeight);
}

function scroll_linear(scroll, start, stop) {
	return (scroll - start) / (stop - start);
}

function scroll_tangent(scroll, start, stop) {
	k = 0.9;
	x = ((scroll - start) / (stop - start)) * (k * Math.PI) - (k * Math.PI / 2);
	shiftY = Math.tan(k * Math.PI / 2);
	scaleY = shiftY * 2;
	return (Math.tan(x) + shiftY) / scaleY;
}
