function timing_linear(timeFrac) {
	return timeFrac;
}

function timing_logarithm(timeFrac) {
	let base = Math.E;
	let x = 1 + timeFrac * (base - 1);
	switch (base) {
		case Math.E:
			return Math.log(x);
		case 2:
			return Math.log2(x);
		case 10:
			return Math.log10(x);
		default:
			return Math.log(x) / Math.log(base);
	}
}

function timing_convexSine(timeFrac) {
	let x = timeFrac * (Math.PI / 2);
	return Math.sin(x);
}

function timing_concaveSine(timeFrac) {
	let x = timeFrac * (Math.PI / 2);
	return 1 - Math.cos(x);
}

function timing_power(timeFrac) {
	let k = 5;
	return Math.pow(timeFrac, k);
}

function timing_convexCircle(timeFrac) {
	return Math.sin(Math.acos(1 - timeFrac));
}

function timing_concaveCircle(timeFrac) {
	return 1 - Math.sin(Math.acos(timeFrac));
}
