var pics = [
	["https://picsum.photos/1200/800?image=100", "headline 1"],
	["https://picsum.photos/1200/800?image=101", "headline 2"],
	["https://picsum.photos/800/1200?image=102", "headline 3"],
	["https://picsum.photos/1200/800?image=103", "headline 4"],
	["https://picsum.photos/1200/800?image=104", "headline 5"],
	["https://picsum.photos/800/1200?image=115", "headline 6"],
	["https://picsum.photos/1200/800?image=106", "headline 7"],
	["https://picsum.photos/1200/800?image=107", "headline 8"],
	["https://picsum.photos/1200/800?image=108", "headline 9"],
	["https://picsum.photos/1200/800?image=109", "headline 10"],
];

builtGallery();
function builtGallery() {
	var imgsCont = document.querySelector(".gallery");
	var ix = 0;

	for (let ix in pics) {
		var pic = document.createElement("DIV");
		pic.style.backgroundImage = 'url("' + pics[ix][0] + '")';
		pic.classList.add("gallery__item");
		pic.addEventListener("click", setGallery.bind(null, ix), false);

		imgsCont.appendChild(pic);
	}
}

function setGallery(ix) {
	ix = parseInt(ix);

	if (ix < 0) {
		document.querySelector(".lightbox").classList.remove("on");
	} else {
		document.querySelector(".lightbox").classList.add("on");

		document.querySelector(".lightbox__img").src = pics[ix][0];
		document.querySelector(".lightbox__title").innerHTML = pics[ix][1];

		if (ix > 0) {
			document
				.querySelector(".lightbox__back")
				.setAttribute("onclick", "setGallery(" + (ix - 1) + ")");
		} else {
			document.querySelector(".lightbox__back").removeAttribute("onclick");
		}

		if (ix < pics.length - 1) {
			document
				.querySelector(".lightbox__next")
				.setAttribute("onclick", "setGallery(" + (ix + 1) + ")");
		} else {
			document.querySelector(".lightbox__next").removeAttribute("onclick");
		}
	}
}
