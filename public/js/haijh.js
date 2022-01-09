/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AttackAnimation.js":
/*!********************************!*\
  !*** ./src/AttackAnimation.js ***!
  \********************************/
/***/ ((module) => {

eval("class Animation {\n    constructor(min, max, frontSpeed, backSpeed) {\n        this.forward = true;\n        this.val = 0;\n        this.active = false;\n\n        this.max = max;\n        this.min = min;\n        this.fs = frontSpeed;\n        this.bs = backSpeed;\n    }\n\n    /**\n     * delta is time passed since the last frame\n     * \n     * @param delta \n     */\n    update(delta) {\n        console.log(\"val: \" + this.val);\n        if (this.forward) {\n            this.val += delta * this.fs;\n            if (this.val >= this.max) {\n                this.val = this.max;\n                this.forward = false;\n            }\n        }\n        else {\n            this.val -= delta * this.bs;\n            if (this.val <= this.min) {\n                this.val = this.min;\n                this.forward = true;\n            }\n        }\n    }\n}\n\nmodule.exports = Animation;\n\n\n//# sourceURL=webpack://animation/./src/AttackAnimation.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Animation = __webpack_require__(/*! ./AttackAnimation */ \"./src/AttackAnimation.js\");\n\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\n\nlet lastFrame = Date.now();\nconst animation = new Animation(0, 100, 0.1, 0.05);\nconst assets = new Map();\n\nasync function loadImage(imgPath) {\n    console.time('loadImage');\n    const img = new Image(); \n    img.src = imgPath;\n    return new Promise((resolve, reject) => {\n        img.addEventListener('load', () => {\n            resolve(img);\n        }, {once: true});\n        img.addEventListener('error', () => {\n            reject(new Error('Could not load image at ' + imgPath));\n        }, {once: true});\n    }).finally(() => {\n        console.timeEnd('loadImage');\n    });\n}\n\nasync function getImageLoaded(imgPath)\n{\n    if (!assets.has(imgPath)) {\n        assets.set(imgPath, loadImage(imgPath));\n    }\n    const image = await assets.get(imgPath);\n    return image;\n}\n\nasync function drawImage(imgPath, x, y, width, height) {\n    const img = await getImageLoaded(imgPath);\n    if (img)\n    {\n        ctx.drawImage(img, -width/2 + x, -height/2 + y, width, height);\n    }\n}\n\nasync function drawWeapon() {\n    ctx.save();\n\n    ctx.translate(canvas.width/2 - 20, canvas.height/2 + 50);\n    ctx.rotate(animation.val * Math.PI / 180);\n    ctx.translate(-canvas.width/2 + 20, -canvas.height/2 - 50);\n    await drawImage('/img/day_holding_metal_axe.png', canvas.width/2, canvas.height/2, 40, 100);\n\n    ctx.restore();\n}\n\nfunction clearRect() {\n    ctx.save();\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    ctx.restore();\n}\n\nasync function render() {\n    ctx.save();\n    ctx.fillStyle = '#57072B';\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    await drawWeapon();\n    ctx.restore();\n}\n\nfunction update(delta) {\n    animation.update(delta);\n}\n\nasync function run() {\n  const now = Date.now();\n  const delta = now - lastFrame;\n  lastFrame = now;\n\n  clearRect();\n  update(delta);\n  await render();\n\n  requestAnimationFrame(run);\n}\n\nrun();\n\n//# sourceURL=webpack://animation/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;