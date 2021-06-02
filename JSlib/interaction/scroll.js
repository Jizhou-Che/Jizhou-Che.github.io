function scroll_windowScrollPercent() {
	return window.scrollY / (document.body.offsetHeight - window.innerHeight);
}

function scroll_windowScrollDirection(scroll, scrollLast) {
	if (scroll > scrollLast) {
		return 1;
	} else if (scroll < scrollLast) {
		return -1;
	} else {
		return 0;
	}
}

function scroll_linear(scroll, start, stop) {
	return (scroll - start) / (stop - start);
}

function scroll_tangent(scroll, start, stop) {
	let k = 0.9;
	let x = ((scroll - start) / (stop - start)) * (k * Math.PI) - (k * Math.PI / 2);
	let shiftY = Math.tan(k * Math.PI / 2);
	let rangeY = shiftY * 2;
	return (Math.tan(x) + shiftY) / rangeY;
}
