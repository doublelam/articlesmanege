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
/******/ 	return __webpack_require__(__webpack_require__.s = 208);
/******/ })
/************************************************************************/
/******/ ({

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var canvas_drawable_1 = __webpack_require__(48);
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

/***/ 48:
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (29:12)\nYou may need an appropriate loader to handle this file type.\n|     setStyle(option) {\n|         this.pointStyle = {\n|             ...this.pointStyle,\n|             ...option,\n|         };");

/***/ })

/******/ });