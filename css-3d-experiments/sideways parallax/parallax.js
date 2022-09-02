var layers = document.querySelectorAll(".layer");
window.onscroll = function () {
	move();
};

function move() {
	var offset = 1 - (window.pageYOffset || document.documentElement.scrollTop);
	if (offset == 0) {
		return false;
	}
	offset = offset > 0 ? 1 : -1;

	let ix = 1;
	for (layer of layers) {
		let thisOffset = offset * ix;
		ix *= 2;

		let newPosition =
			Number(
				window
					.getComputedStyle(layer)
					.getPropertyValue("background-position")
					.split("px")[0]
			) + thisOffset;
		layer.style.backgroundPosition = newPosition + "px 0";
	}
	window.scrollTo(0, 1);
}
