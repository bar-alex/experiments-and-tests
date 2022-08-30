var statusC = 0;
var cont = document.querySelector(".cont");

document.body.addEventListener("click", clearAll, true);
cont.addEventListener("click", clickStatus, true);

function clearAll(e) {
	if (
		e.path.find(function (e) {
			return e == document.querySelector(".cont");
		})
	) {
		return;
	}

	if (statusC > 1) {
		return false;
	}

	statusC = 3;
	setStatus();
}

function clickStatus(e) {
	console.log(e);
	if (
		e.path.find(function (e) {
			return e == document.querySelector("input");
		})
	) {
		return;
	}

	if (statusC < 2) {
		setStatus();
	}
}

function setStatus() {
	statusC = (statusC + 1) % 4;

	var input = document.querySelector("input");
	var icons = document.querySelectorAll("path");
	var span = document.querySelector("span");
	var ix = 0;

	if (statusC == 0) {
		document.querySelector("input").value = "";
	}

	if (statusC == 1) {
		input.classList.remove("off");
		input.focus();
	} else {
		input.classList.add("off");
	}

	for (let icon of icons) {
		icon.classList.add("off");
		if (ix == statusC) {
			icon.classList.remove("off");
		} else {
			icon.classList.add("off");
		}
		ix++;
	}

	if (statusC == 2) {
		setTimeout(function () {
			setStatus();
		}, 1000);
	}

	if (statusC == 3) {
		span.classList.remove("off");
		setTimeout(function () {
			setStatus();
		}, 3000);
	} else {
		span.classList.add("off");
	}
}
