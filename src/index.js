const Animation = require('./AttackAnimation');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let lastFrame = Date.now();
const animation = new Animation(0, 100, 0.1, 0.05);
const assets = new Map();

function loadImage(imgPath) {
    const img = new Image(); 
    img.src = imgPath;
    img.onload = () => assets.set(imgPath, img); // onloadcomplete add it to the imgPath
}

function getImageLoaded(imgPath)
{
    if (assets.has(imgPath))
    {
        return assets.get(imgPath);
    }
    loadImage(imgPath);
    return null;
}

function drawImage(imgPath, x, y, width, height) {
    const img = getImageLoaded(imgPath);
    if (img)
    {
        ctx.drawImage(img, -width/2 + x, -height/2 + y, width, height);
    }
}

function drawWeapon() {
    ctx.save();

    ctx.translate(canvas.width/2 - 20, canvas.height/2 + 50);
    ctx.rotate(animation.val * Math.PI / 180);
    ctx.translate(-canvas.width/2 + 20, -canvas.height/2 - 50);
    drawImage('/img/day_holding_metal_axe.png', canvas.width/2, canvas.height/2, 40, 100);

    ctx.restore();
}

function clearRect() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

function render() {
    ctx.save();
    ctx.fillStyle = '#57072B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawWeapon();
    ctx.restore();
}

function update(delta) {
    animation.update(delta);
}

function run() {
  const now = Date.now();
  const delta = now - lastFrame;
  lastFrame = now;

  clearRect();
  update(delta);
  render();

  requestAnimationFrame(run);
}

run();