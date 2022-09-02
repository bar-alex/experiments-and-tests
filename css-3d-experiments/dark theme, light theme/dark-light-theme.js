function _(e) {
	return document.getElementById(e);
}

var nightmode = true;
var lastnight = 0;
var nrMain = 0;

var snmb = _("bulb") || null;

var allColors = [];

allColors.push(["black", [20, 20, 20], [230, 230, 230]]);
allColors.push(["dark-gray", [90, 90, 90], [160, 160, 160]]);
allColors.push(["light-gray", [160, 160, 160], [90, 90, 90]]);
allColors.push(["white", [230, 230, 230], [20, 20, 20]]);

var cssColor = [];
GetCssColors();

function GetCssColors() {
	var ix = 1;

	for (i = 0; i < allColors.length; i++) {
		cssColor[allColors[i][0]] = [
			allColors[i][ix][0],
			allColors[i][ix][1],
			allColors[i][ix][2],
		];
		document.documentElement.style.setProperty(
			"--" + allColors[i][0],
			"rgb(" + cssColor[allColors[i][0]].join() + ")"
		);
	}

	document.documentElement.style.setProperty("--background_d", "var(--black)");
}

_("nmode").onclick = function () {
	nightmode = !nightmode;
	nightRun();

	setTimeout(function () {
		_("nmode").innerHTML = "Turn " + (nightmode ? "on" : "off") + " the light";
	}, 500);
};

function nightRun() {
	if (lastnight == 0) {
		var dt = 1;
	} else {
		var dt = Math.min(50, performance.now() - lastnight);
	}

	lastnight = performance.now();

	nrMain = Math.min(100, Math.max(0, nrMain + dt * (nightmode ? -0.1 : 0.1)));
	var nrCos = (1 - Math.cos((nrMain / 100) * Math.PI)) / 2;

	for (i = 0; i < allColors.length; i++) {
		for (ii = 0; ii < 3; ii++) {
			cssColor[allColors[i][0]][ii] = Math.round(
				allColors[i][1][ii] +
					(allColors[i][2][ii] - allColors[i][1][ii]) * nrCos
			);
		}
		document.documentElement.style.setProperty(
			"--" + allColors[i][0],
			"rgb(" + cssColor[allColors[i][0]].join() + ")"
		);
	}

	var rect = snmb.getBoundingClientRect();

	var t = Math.max(0, nrCos * 200 - 100);
	var b = Math.min(100, nrCos * 200);

	document.documentElement.style.setProperty(
		"--background",
		"radial-gradient(ellipse  at " +
			(rect.left + rect.right) / 2 + "px " +
			(rect.top + 20) + "px, rgb(240,240,240) 0%, rgb(240,240,240) " +
			t + "%, rgb(20,20,20) " +
			b + "%, rgb(20,20,20) 100%)"
	);

	if (nrMain != (nightmode ? 0 : 100)) {
		requestAnimationFrame(nightRun);
	} else {
		lastnight = 0;
	}
}
