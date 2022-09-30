import Prism from "https://cdn.skypack.dev/prismjs";
import "https://cdn.skypack.dev/prismjs/plugins/show-invisibles/prism-show-invisibles";

Prism.manual = true;
const CODE = document.querySelector("code");
Prism.highlightElement(CODE, false, () => {
	const KEYWORDS = document.querySelectorAll(".token.keyword");
	for (const KEYWORD of KEYWORDS) {
		const NEW_LINE = document.createElement("span");
		NEW_LINE.className = "line";
		let LEVEL = 0;
		let currentSpace = KEYWORD;

		while (
			currentSpace.previousElementSibling &&
			currentSpace.previousElementSibling.className.indexOf("space") !== -1
		) {
			if (window.CP.shouldStopExecution(0)) break;
			currentSpace = currentSpace.previousElementSibling;
			LEVEL++;
		}
		window.CP.exitedLoop(0);
		NEW_LINE.style.setProperty("--level", LEVEL);
		NEW_LINE.indentLevel = LEVEL;
		CODE.insertBefore(NEW_LINE, KEYWORD);
		const KIDS = [KEYWORD];
		let currentKid = KEYWORD;
		let abort = false;
		while (!abort && currentKid.nextSibling !== null) {
			if (window.CP.shouldStopExecution(1)) break;
			currentKid = currentKid.nextSibling;
			if (currentKid.className && currentKid.className.indexOf("lf") !== -1)
				abort = true;
			KIDS.push(currentKid);
		}
		window.CP.exitedLoop(1);
		KIDS.forEach((KID) => NEW_LINE.appendChild(KID));
	}

	// Get all the closing brackets
	const POTENTIALS = CODE.querySelectorAll(".token.punctuation");
	let CLOSERS = [];
	POTENTIALS.forEach((P) => {
		if (
			P.innerText === "}" &&
			(P.previousElementSibling.className.indexOf("lf") !== -1 ||
				P.previousElementSibling.className.indexOf("line") !== -1) &&
			P.nextElementSibling.className.indexOf("lf") !== -1
		) {
			CLOSERS.push(P);
		}
	});
	for (const CLOSER of CLOSERS) {
		let seed = CLOSER;
		let abort = false;
		let level = 0;
		while (seed.previousElementSibling && !abort) {
			if (window.CP.shouldStopExecution(2)) break;
			seed = seed.previousElementSibling;
			if (seed.className.indexOf("line") !== -1 && seed.indentLevel > level) {
				level = seed.indentLevel;
			}
			if (seed)
				if (seed.indentLevel === 0) {
					seed.classList.add("block-start");
					abort = true;
				}
		}
		window.CP.exitedLoop(2);
		CLOSER.classList.add("closer");
		CLOSER.classList.add("block-end");
		CLOSER.style.setProperty("--level", level + 1);
	}
	// Now you gotta wrap the block...
	const OPENERS = CODE.querySelectorAll(".line");

	OPENERS.forEach((OPENER) => {
		// if it isn't a block, just wrap it
		if (
			OPENER.className.indexOf("block-start") === -1 &&
			OPENER.parentNode === CODE
		) {
			const BLOCK_WRAP = document.createElement("span");
			BLOCK_WRAP.className = "code-block";
			CODE.insertBefore(BLOCK_WRAP, OPENER);
			BLOCK_WRAP.appendChild(OPENER);
		}
		// Need to wrap the whole thing
		if (OPENER.className.indexOf("block-start") !== -1) {
			// Find the "block-end" and put everything in between into the wrap
			const BLOCK_WRAP = document.createElement("span");
			BLOCK_WRAP.className = "code-block";
			CODE.insertBefore(BLOCK_WRAP, OPENER);
			// Grab all the elements
			let KIDS = [OPENER];
			let currentKid = OPENER;
			let abort = false;
			while (currentKid.nextSibling && !abort) {
				if (window.CP.shouldStopExecution(3)) break;
				currentKid = currentKid.nextSibling;
				KIDS.push(currentKid);
				if (
					currentKid.className &&
					currentKid.className.indexOf("block-end") !== -1
				)
					abort = true;
			}
			window.CP.exitedLoop(3);
			KIDS.forEach((KID) => BLOCK_WRAP.appendChild(KID));
		}
	});
});

// import Prism from 'https://cdn.skypack.dev/prismjs'
// import 'https://cdn.skypack.dev/prismjs/plugins/show-invisibles/prism-show-invisibles'

// Prism.manual = true
// const CODE = document.querySelector('code')

// Prism.highlightElement(CODE, false, () => {
// 	const KEYWORDS = document.querySelectorAll('.token.keyword')
// 	for (const KEYWORD of KEYWORDS) {
// 		const NEW_LINE = document.createElement('span')
// 		NEW_LINE.className = 'line'
// 		let LEVEL = 0
// 		let currentSpace = KEYWORD

// 		while (
// 			currentSpace.previousElementSibling &&
// 			currentSpace.previousElementSibling.className.indexOf('space') !== -1
// 		) {
// 			currentSpace = currentSpace.previousElementSibling
// 			LEVEL++
// 		}
// 		NEW_LINE.style.setProperty('--level', LEVEL)
// 		NEW_LINE.indentLevel = LEVEL
// 		CODE.insertBefore(NEW_LINE, KEYWORD)
// 		const KIDS = [KEYWORD]
// 		let currentKid = KEYWORD
// 		let abort = false
// 		while (!abort && currentKid.nextSibling !== null) {
// 			currentKid = currentKid.nextSibling
// 			if (currentKid.className && currentKid.className.indexOf('lf') !== -1)
// 				abort = true
// 			KIDS.push(currentKid)
// 		}
// 		KIDS.forEach((KID) => NEW_LINE.appendChild(KID))
// 	}

// 	// Get all the closing brackets
// 	const POTENTIALS = CODE.querySelectorAll('.token.punctuation')
// 	let CLOSERS = []
// 	POTENTIALS.forEach((P) => {
// 		if (
// 			P.innerText === '}' &&
// 			(P.previousElementSibling.className.indexOf('lf') !== -1 ||
// 				P.previousElementSibling.className.indexOf('line') !== -1) &&
// 			P.nextElementSibling.className.indexOf('lf') !== -1
// 		) {
// 			CLOSERS.push(P)
// 		}
// 	})
// 	for (const CLOSER of CLOSERS) {
// 		let seed = CLOSER
// 		let abort = false
// 		let level = 0
// 		while (seed.previousElementSibling && !abort) {
// 			seed = seed.previousElementSibling
// 			if (seed.className.indexOf('line') !== -1 && seed.indentLevel > level) {
// 				level = seed.indentLevel
// 			}
// 			if (seed)
// 				if (seed.indentLevel === 0) {
// 					seed.classList.add('block-start')
// 					abort = true
// 				}
// 		}
// 		CLOSER.classList.add('closer')
// 		CLOSER.classList.add('block-end')
// 		CLOSER.style.setProperty('--level', level + 1)
// 	}
// 	// Now you gotta wrap the block...
// 	const OPENERS = CODE.querySelectorAll('.line')

// 	OPENERS.forEach((OPENER) => {
// 		// if it isn't a block, just wrap it
// 		if (
// 			OPENER.className.indexOf('block-start') === -1 &&
// 			OPENER.parentNode === CODE
// 		) {
// 			const BLOCK_WRAP = document.createElement('span')
// 			BLOCK_WRAP.className = 'code-block'
// 			CODE.insertBefore(BLOCK_WRAP, OPENER)
// 			BLOCK_WRAP.appendChild(OPENER)
// 		}
// 		// Need to wrap the whole thing
// 		if (OPENER.className.indexOf('block-start') !== -1) {
// 			// Find the "block-end" and put everything in between into the wrap
// 			const BLOCK_WRAP = document.createElement('span')
// 			BLOCK_WRAP.className = 'code-block'
// 			CODE.insertBefore(BLOCK_WRAP, OPENER)
// 			// Grab all the elements
// 			let KIDS = [OPENER]
// 			let currentKid = OPENER
// 			let abort = false
// 			while (currentKid.nextSibling && !abort) {
// 				currentKid = currentKid.nextSibling
// 				KIDS.push(currentKid)
// 				if (
// 					currentKid.className &&
// 					currentKid.className.indexOf('block-end') !== -1
// 				)
// 					abort = true
// 			}
// 			KIDS.forEach((KID) => BLOCK_WRAP.appendChild(KID))
// 		}
// 	})
// })
