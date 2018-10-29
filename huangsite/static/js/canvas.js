/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 212);
/******/ })
/************************************************************************/
/******/ ({

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var canvas_drawable_1 = __webpack_require__(46);
var canvas = document.getElementById("canvas");
var erase = document.getElementById("erase");
var draw = document.getElementById("draw");
var getImage = document.getElementById("getimage");
var clearAll = document.getElementById("clearall");
var getBlob = document.getElementById("getblob");
var drawable = new canvas_drawable_1.CanvasDrawable(canvas.getContext("2d"));
erase.onclick = function (e) {
    drawable.enerase();
};
draw.onclick = function (e) {
    drawable.endraw();
};
getImage.onclick = function (e) {
    console.log(drawable.getCanvasBase64());
};
clearAll.onclick = function (e) {
    drawable.cleanAll();
};
getBlob.onclick = function (e) {
    drawable.getCanvasBlob("image/webp", 1).then(function (blob) {
        console.log(blob);
    });
};


/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__judge_end__ = __webpack_require__(47);

class CanvasDrawable {
    constructor(canvasContext, opt = {
            color: "rgba(0,0,0,.5)",
            width: 1,
        }) {
        this.lastPoint = [0, 0];
        this.lastEndPoint = [0, 0];
        this.paddingAndBorder = [0, 0];
        this.domPosition = [0, 0];
        this.drawScale = 1;
        this.pointMode = "DRAW";
        this.innerWidthAndHeight = [0, 0];
        this.canvasContext = canvasContext;
        this.pointStyle = opt;
        this.bandMethods();
        this.getCanvasPaddingAndBorder(canvasContext);
    }
    native(type, ...opt) {
        this.canvasContext[type](...opt);
        return this;
    }
    nativeContext() {
        return this.canvasContext;
    }
    setStyle(option) {
        this.pointStyle = option;
        return this;
    }
    getStyle() {
        return this.pointStyle;
    }
    cleanAll() {
        this.canvasContext.clearRect(0, 0, this.innerWidthAndHeight[0], this.innerWidthAndHeight[1]);
    }
    getCanvasBase64(...args) {
        return this.canvasContext.canvas.toDataURL(...args);
    }
    getCanvasBlob(...args) {
        return new Promise((resolve, reject) => {
            this.canvasContext.canvas.toBlob((blob) => {
                resolve(blob);
            }, ...args);
        });
    }
    enerase() {
        this.pointMode = "ERASE";
        return this;
    }
    endraw() {
        this.pointMode = "DRAW";
        return this;
    }
    setCanvasStroke() {
        this.canvasContext.strokeStyle = this.pointStyle.color;
        this.canvasContext.lineWidth = this.pointStyle.width;
    }
    getCanvasPaddingAndBorder(canvasContext) {
        const styles = getComputedStyle(canvasContext.canvas);
        const canvasRect = canvasContext.canvas.getBoundingClientRect();
        this.domPosition = [canvasRect.left, canvasRect.top];
        this.paddingAndBorder = [
            parseFloat(styles.paddingLeft) + parseFloat(styles.borderLeftWidth),
            parseFloat(styles.paddingTop) + parseFloat(styles.borderTopWidth),
        ];
        this.innerWidthAndHeight = [
            this.canvasContext.canvas.clientWidth,
            this.canvasContext.canvas.clientHeight,
        ];
    }
    recalculateCoordination(coordinate) {
        return [
            coordinate[0] - this.domPosition[0] - this.paddingAndBorder[0],
            coordinate[1] - this.domPosition[1] - this.paddingAndBorder[1],
        ];
    }
    bandMethods() {
        const can = this.canvasContext.canvas;
        if (__WEBPACK_IMPORTED_MODULE_0__judge_end__["a" /* ifMobile */]) {
            can.ontouchstart = e => {
                const reCoordinate = this.recalculateCoordination([e.touches[0].clientX, e.touches[0].clientY]);
                this.touched(reCoordinate[0], reCoordinate[1]);
            };
            can.ontouchmove = e => {
                const reCoordinate = this.recalculateCoordination([e.touches[0].clientX, e.touches[0].clientY]);
                this.moveWhenErase(reCoordinate[0], reCoordinate[1]);
                this.moveWhenDraw(reCoordinate[0], reCoordinate[1]);
            };
            return this;
        }
        can.onmousedown = e => {
            const reCoordinate = this.recalculateCoordination([e.clientX, e.clientY]);
            this.touched(reCoordinate[0], reCoordinate[1]);
        };
        can.onmousemove = e => {
            if (e.buttons <= 0) {
                return;
            }
            const reCoordinate = this.recalculateCoordination([e.clientX, e.clientY]);
            this.moveWhenErase(reCoordinate[0], reCoordinate[1]);
            this.moveWhenDraw(reCoordinate[0], reCoordinate[1]);
        };
        return this;
    }
    touched(x, y) {
        this.lastPoint = [x, y];
        this.lastEndPoint = [x, y];
        this.setCanvasStroke();
    }
    moveWhenErase(x, y, width = 10) {
        if (this.pointMode !== "ERASE") {
            return;
        }
        const halfSide = width / 2;
        const startPoint = [x - halfSide, y - halfSide];
        this.canvasContext.clearRect(startPoint[0], startPoint[1], width, width);
    }
    moveWhenDraw(x, y, scale = this.drawScale) {
        if (this.pointMode !== "DRAW") {
            return;
        }
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.lastEndPoint[0], this.lastEndPoint[1]);
        const endPoint = [
            (x - this.lastPoint[0]) * scale + this.lastEndPoint[0],
            (y - this.lastPoint[1]) * scale + this.lastEndPoint[1],
        ];
        this.canvasContext.lineTo(endPoint[0], endPoint[1]);
        this.canvasContext.stroke();
        this.canvasContext.closePath();
        this.lastPoint = [x, y];
        this.lastEndPoint = endPoint;
    }
}
/* harmony export (immutable) */ __webpack_exports__["CanvasDrawable"] = CanvasDrawable;

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const ifHasTouch = () => {
    if (window.ontouchstart !== void 0) {
        return true;
    }
    return false;
};
const ifMobile = ifHasTouch();
/* harmony export (immutable) */ __webpack_exports__["a"] = ifMobile;

//# sourceMappingURL=judge-end.js.map

/***/ })

/******/ });