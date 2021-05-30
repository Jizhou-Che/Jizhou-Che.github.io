window.onload = function() {
	// Define content scroll dictionary.
	contentScrollDic = {
		content_1: [0.05, 0.5]
	}
	
	// Set up scroll event listener for window.
	testScroll = document.querySelector("#test_scroll");
	window.onscroll = function() {
		scroll = scroll_windowScrollPercent();
		testScroll.innerHTML = "Scroll: " + scroll + ".";
		renderContent(contentScrollDic, scroll);
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

function renderContent(contentScrollDic, scroll) {
	for (contentID in contentScrollDic) {
		content = document.querySelector("#" + contentID);
		if (scroll >= contentScrollDic[contentID][0] && scroll <= contentScrollDic[contentID][1]) {
			contentScrollPercent = scroll_tangent(scroll, contentScrollDic[contentID][0], contentScrollDic[contentID][1]);
			content.style.top = (window.innerHeight - (window.innerHeight + content.offsetHeight) * contentScrollPercent) + "px";
			content.style.opacity = 1 - Math.abs(2 * contentScrollPercent - 1);
		} else {
			content.style.top = "100%";
		}
	}
}
