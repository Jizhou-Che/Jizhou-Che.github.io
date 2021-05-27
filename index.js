window.onload = function() {
	// Set up scroll event listener for window.
	testScroll = document.querySelector("#test_scroll");
	window.onscroll = function() {
		testScroll.innerHTML = "Scroll: " + scroll_windowScrollPercent() + ".";
	}
	
	// Set up animation for hiding renovation notice.
	hideRenovations = document.querySelector("#hide_renovations");
	hideRenovations.onclick = function() {
		hideRenovations.onclick = null;
		animate(renderHideRenovations, timing_linear, 150);
	}
}

function renderHideRenovations(progress) {
	renovations = document.querySelector("#renovations");
	height = renovations.offsetHeight;
	renovations.style.marginTop = (0 - height * progress) + "px";
}
