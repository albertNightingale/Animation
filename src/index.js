const Animation = require('./AttackAnimation');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let lastFrame = Date.now();
const animation = new Animation(0, 100, 0.1, 0.05);
const assets = new Map();

async function loadImage(imgPath) {
    console.time('loadImage');
    const img = new Image(); 
    img.src = imgPath;
    return new Promise((resolve, reject) => {
        img.addEventListener('load', () => {
            resolve(img);
        }, {once: true});
        img.addEventListener('error', () => {
            reject(new Error('Could not load image at ' + imgPath));
        }, {once: true});
    }).finally(() => {
        console.timeEnd('loadImage');
    });
}

async function getImageLoaded(imgPath)
{
    if (!assets.has(imgPath)) {
        assets.set(imgPath, loadImage(imgPath));
    }
    const image = await assets.get(imgPath);
    return image;
}

async function drawImage(imgPath, x, y, width, height) {
    const img = await getImageLoaded(imgPath);
    if (img)
    {
        ctx.drawImage(img, -width/2 + x, -height/2 + y, width, height);
    }
}

async function drawWeapon() {
    ctx.save();

    ctx.translate(canvas.width/2 - 20, canvas.height/2 + 50);
    ctx.rotate(animation.val * Math.PI / 180);
    ctx.translate(-canvas.width/2 + 20, -canvas.height/2 - 50);
    await drawImage('/img/day_holding_metal_axe.png', canvas.width/2, canvas.height/2, 40, 100);

    ctx.restore();
}

function clearRect() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

async function render() {
    ctx.save();
    ctx.fillStyle = '#57072B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await drawWeapon();
    ctx.restore();
}

function update(delta) {
    animation.update(delta);
}

async function run() {
  const now = Date.now();
  const delta = now - lastFrame;
  lastFrame = now;

  clearRect();
  update(delta);
  await render();

  requestAnimationFrame(run);
}

run();