const input = document.querySelector('input');
const scene = document.querySelector('.scene');

input.oninput = () => {
    scene.style.setProperty('--rx', input.value + 'deg');
}