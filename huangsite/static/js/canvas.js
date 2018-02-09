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
/******/ 	return __webpack_require__(__webpack_require__.s = 209);
/******/ })
/************************************************************************/
/******/ ({

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var index_1 = __webpack_require__(210);
var canvas = document.getElementById("canvas");
var erase = document.getElementById("erase");
var draw = document.getElementById("draw");
var getImage = document.getElementById("getimage");
var clearAll = document.getElementById("clearall");
var getBlob = document.getElementById("getblob");
var drawable = new index_1.CanvasDrawable(canvas.getContext("2d"));
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

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var judge_end_1 = __webpack_require__(211);
var CanvasDrawable = /** @class */ (function () {
    function CanvasDrawable(canvasContext, opt) {
        if (opt === void 0) { opt = {
            color: "rgba(0,0,0,.5)",
            width: 1
        }; }
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
    CanvasDrawable.prototype.native = function (type) {
        var opt = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            opt[_i - 1] = arguments[_i];
        }
        (_a = this.canvasContext)[type].apply(_a, opt);
        return this;
        var _a;
    };
    CanvasDrawable.prototype.nativeContext = function () {
        return this.canvasContext;
    };
    CanvasDrawable.prototype.setStyle = function (option) {
        this.pointStyle = option;
        return this;
    };
    CanvasDrawable.prototype.getStyle = function () {
        return this.pointStyle;
    };
    CanvasDrawable.prototype.cleanAll = function () {
        this.canvasContext.clearRect(0, 0, this.innerWidthAndHeight[0], this.innerWidthAndHeight[1]);
    };
    CanvasDrawable.prototype.getCanvasBase64 = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this.canvasContext.canvas).toDataURL.apply(_a, args);
        var _a;
    };
    CanvasDrawable.prototype.getCanvasBlob = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            (_a = _this.canvasContext.canvas).toBlob.apply(_a, [function (blob) {
                    resolve(blob);
                }].concat(args));
            var _a;
        });
    };
    CanvasDrawable.prototype.enerase = function () {
        this.pointMode = "ERASE";
        return this;
    };
    CanvasDrawable.prototype.endraw = function () {
        this.pointMode = "DRAW";
        return this;
    };
    CanvasDrawable.prototype.setCanvasStroke = function () {
        this.canvasContext.strokeStyle = this.pointStyle.color;
        this.canvasContext.lineWidth = this.pointStyle.width;
    };
    CanvasDrawable.prototype.getCanvasPaddingAndBorder = function (canvasContext) {
        var styles = getComputedStyle(canvasContext.canvas);
        var canvasRect = canvasContext.canvas.getBoundingClientRect();
        this.domPosition = [canvasRect.left, canvasRect.top];
        this.paddingAndBorder = [
            parseFloat(styles.paddingLeft) + parseFloat(styles.borderLeftWidth),
            parseFloat(styles.paddingTop) + parseFloat(styles.borderTopWidth),
        ];
        this.innerWidthAndHeight = [
            this.canvasContext.canvas.clientWidth,
            this.canvasContext.canvas.clientHeight,
        ];
    };
    CanvasDrawable.prototype.recalculateCoordination = function (coordinate) {
        return [
            coordinate[0] - this.domPosition[0] - this.paddingAndBorder[0],
            coordinate[1] - this.domPosition[1] - this.paddingAndBorder[1],
        ];
    };
    CanvasDrawable.prototype.bandMethods = function () {
        var _this = this;
        var can = this.canvasContext.canvas;
        if (judge_end_1.ifMobile) {
            can.ontouchstart = function (e) {
                var reCoordinate = _this.recalculateCoordination([e.touches[0].clientX, e.touches[0].clientY]);
                _this.touched(reCoordinate[0], reCoordinate[1]);
            };
            can.ontouchmove = function (e) {
                var reCoordinate = _this.recalculateCoordination([e.touches[0].clientX, e.touches[0].clientY]);
                _this.moveWhenErase(reCoordinate[0], reCoordinate[1]);
                _this.moveWhenDraw(reCoordinate[0], reCoordinate[1]);
            };
            return this;
        }
        can.onmousedown = function (e) {
            var reCoordinate = _this.recalculateCoordination([e.clientX, e.clientY]);
            _this.touched(reCoordinate[0], reCoordinate[1]);
        };
        can.onmousemove = function (e) {
            if (e.buttons <= 0) {
                return;
            }
            var reCoordinate = _this.recalculateCoordination([e.clientX, e.clientY]);
            _this.moveWhenErase(reCoordinate[0], reCoordinate[1]);
            _this.moveWhenDraw(reCoordinate[0], reCoordinate[1]);
        };
        return this;
    };
    CanvasDrawable.prototype.touched = function (x, y) {
        this.lastPoint = [x, y];
        this.lastEndPoint = [x, y];
        this.setCanvasStroke();
    };
    CanvasDrawable.prototype.moveWhenErase = function (x, y, width) {
        if (width === void 0) { width = 10; }
        if (this.pointMode !== "ERASE") {
            return;
        }
        var halfSide = width / 2;
        var startPoint = [x - halfSide, y - halfSide];
        this.canvasContext.clearRect(startPoint[0], startPoint[1], width, width);
    };
    CanvasDrawable.prototype.moveWhenDraw = function (x, y, scale) {
        if (scale === void 0) { scale = this.drawScale; }
        if (this.pointMode !== "DRAW") {
            return;
        }
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.lastEndPoint[0], this.lastEndPoint[1]);
        var endPoint = [
            (x - this.lastPoint[0]) * scale + this.lastEndPoint[0],
            (y - this.lastPoint[1]) * scale + this.lastEndPoint[1],
        ];
        this.canvasContext.lineTo(endPoint[0], endPoint[1]);
        this.canvasContext.stroke();
        this.canvasContext.closePath();
        this.lastPoint = [x, y];
        this.lastEndPoint = endPoint;
    };
    return CanvasDrawable;
}());
exports.CanvasDrawable = CanvasDrawable;


/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ifHasTouch = function () {
    if (window.ontouchstart !== void 0) {
        return true;
    }
    return false;
};
exports.ifMobile = ifHasTouch();


/***/ })

/******/ });