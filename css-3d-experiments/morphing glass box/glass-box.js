// The only purpose of this JS script is just to set the CSS variables, 
// since it is not possible to animate them with CSS. Everything else happens using CSS. 
// This is one example of the great synergy that can be achieved by using JS and CSS together.

let boxX = 0;
let boxY = 0;
let boxWidth = 0;
let boxHeight = 0;
let boxZ = 0;

const speed = {
    x: 2000,
    y: 3000,
    z: 0.01,
    w: 0.008,
    h: 0.006,
}

setInterval(() => { run(); }, 16.666);

function run() {
    
    // Z
    boxZ = (boxZ + speed.z) % 4;
    let cssZ = 75 + 25 * Math.sin(boxZ * (Math.PI / 2));

    // W
    boxWidth = (boxWidth + speed.w) % 4;
    let cssW = 150 + 50 * Math.sin(boxWidth * (Math.PI / 2));

    // H
    boxHeight = (boxHeight + speed.h) % 4;
    let cssH = 150 + 50 * Math.sin(boxHeight * (Math.PI / 2));

    // X
    boxX += (window.innerWidth + window.innerHeight)/ speed.x;
    if (boxX > window.innerWidth-(cssW/2)) {
        boxX = window.innerWidth-(cssW/2);
        speed.x *= -1;
    } else if (boxX < (cssW/2)) {
        boxX = (cssW/2);
        speed.x *= -1;
    }

    // Y
    boxY += (window.innerWidth + window.innerHeight)/ speed.y;
    if (boxY > window.innerHeight-(cssH/2)) {
        boxY = window.innerHeight-(cssH/2);
        speed.y *= -1;
    } else if (boxY < (cssH/2)) {
        boxY = (cssH/2);
        speed.y *= -1;
    }

    // Set CSS variables
    document.documentElement.style.setProperty('--boxX', Math.round(boxX) + "px");
    document.documentElement.style.setProperty('--boxY', Math.round(boxY) + "px");
    document.documentElement.style.setProperty('--boxWidth', cssW + "px");
    document.documentElement.style.setProperty('--boxHeight', cssH + "px");
    document.documentElement.style.setProperty('--boxZ', Math.round(cssZ) + "px");
}
