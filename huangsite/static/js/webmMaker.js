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
/* require sass */
__webpack_require__(210);
var canvas_drawable_1 = __webpack_require__(48);
var getdom_1 = __webpack_require__(74);
var reset_canvas_1 = __webpack_require__(75);
var reset_container_1 = __webpack_require__(211);
var WebmMaker = /** @class */ (function () {
    function WebmMaker() {
        this.getEles();
        this.onScreenModeChange();
        this.resetLayout();
    }
    WebmMaker.prototype.main = function () {
        this.initCanvas();
    };
    WebmMaker.prototype.initCanvas = function () {
        reset_canvas_1.resetCanvas(this.canvasEle);
        this.drawCanvas = new canvas_drawable_1.CanvasDrawable(this.canvasEle.getContext("2d"));
        this.drawCanvas.endraw();
    };
    WebmMaker.prototype.resetLayout = function () {
        reset_container_1.resetContainer(this.container);
    };
    WebmMaker.prototype.onScreenModeChange = function () {
        var _this = this;
        window.onresize = function (e) {
            _this.resetLayout();
        };
    };
    WebmMaker.prototype.getEles = function () {
        this.container = getdom_1.ele("#container");
        this.canvasEle = getdom_1.ele("#canvas");
    };
    return WebmMaker;
}());
var webmmaker = new WebmMaker();
webmmaker.main();


/***/ }),

/***/ 210:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Missing binding /Users/donlin/Desktop/articlesmanege/node_modules/node-sass/vendor/darwin-x64-64/binding.node\nNode Sass could not find a binding for your current environment: OS X 64-bit with Node.js 10.x\n\nFound bindings for the following environments:\n  - OS X 64-bit with Node.js 8.x\n\nThis usually happens because your environment has changed since running `npm install`.\nRun `npm rebuild node-sass` to download the binding for your current environment.\n    at module.exports (/Users/donlin/Desktop/articlesmanege/node_modules/node-sass/lib/binding.js:15:13)\n    at Object.<anonymous> (/Users/donlin/Desktop/articlesmanege/node_modules/node-sass/lib/index.js:14:35)\n    at Module._compile (internal/modules/cjs/loader.js:689:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)\n    at Module.load (internal/modules/cjs/loader.js:599:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:530:3)\n    at Module.require (internal/modules/cjs/loader.js:637:17)\n    at require (internal/modules/cjs/helpers.js:22:18)\n    at Object.<anonymous> (/Users/donlin/Desktop/articlesmanege/node_modules/sass-loader/lib/loader.js:3:14)\n    at Module._compile (internal/modules/cjs/loader.js:689:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)\n    at Module.load (internal/modules/cjs/loader.js:599:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:530:3)\n    at Module.require (internal/modules/cjs/loader.js:637:17)\n    at require (internal/modules/cjs/helpers.js:22:18)\n    at loadLoader (/Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/LoaderRunner.js:165:10)\n    at /Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/LoaderRunner.js:176:18\n    at loadLoader (/Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/loadLoader.js:47:3)\n    at iteratePitchingLoaders (/Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/NormalModule.js:182:3)\n    at NormalModule.build (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/NormalModule.js:275:15)\n    at Compilation.buildModule (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/Compilation.js:157:10)\n    at moduleFactory.create (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/Compilation.js:460:10)\n    at factory (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/NormalModuleFactory.js:243:5)\n    at applyPluginsAsyncWaterfall (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/NormalModuleFactory.js:94:13)\n    at runLoaders (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/LoaderRunner.js:367:11\n    at /Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/LoaderRunner.js:172:11\n    at loadLoader (/Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/loadLoader.js:32:11)\n    at iteratePitchingLoaders (/Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/LoaderRunner.js:165:10)\n    at /Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/LoaderRunner.js:176:18\n    at loadLoader (/Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/loadLoader.js:47:3)\n    at iteratePitchingLoaders (/Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/donlin/Desktop/articlesmanege/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/NormalModule.js:182:3)\n    at NormalModule.build (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/NormalModule.js:275:15)\n    at Compilation.buildModule (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/Compilation.js:157:10)\n    at moduleFactory.create (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/Compilation.js:460:10)\n    at factory (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/NormalModuleFactory.js:243:5)\n    at applyPluginsAsyncWaterfall (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/NormalModuleFactory.js:94:13)\n    at /Users/donlin/Desktop/articlesmanege/node_modules/tapable/lib/Tapable.js:268:11\n    at NormalModuleFactory.params.normalModuleFactory.plugin (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/CompatibilityPlugin.js:52:5)\n    at NormalModuleFactory.applyPluginsAsyncWaterfall (/Users/donlin/Desktop/articlesmanege/node_modules/tapable/lib/Tapable.js:272:13)\n    at resolver (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/NormalModuleFactory.js:69:10)\n    at process.nextTick (/Users/donlin/Desktop/articlesmanege/node_modules/webpack/lib/NormalModuleFactory.js:196:7)\n    at process._tickCallback (internal/process/next_tick.js:61:11)");

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.resetContainer = function (dom) {
    var _a = [window.innerWidth, window.innerHeight], scrnWidth = _a[0], scrnHeight = _a[1];
    var longerSideLength = 0;
    var shorterSideLength = 0;
    var screenMode = "HORIZONTAL";
    if (scrnWidth < scrnHeight) {
        longerSideLength = scrnHeight;
        shorterSideLength = scrnWidth;
        screenMode = "VERTICAL";
    }
    else {
        longerSideLength = scrnWidth;
        shorterSideLength = scrnHeight;
        screenMode = "HORIZONTAL";
    }
    dom.style.width = String(longerSideLength) + "px";
    dom.style.height = String(shorterSideLength) + "px";
    if (screenMode === "VERTICAL") {
        alert("please set the screen landscape");
        // dom.style.transform = "rotateZ(90deg)";
    }
    else {
        dom.style.transform = "rotateZ(0deg)";
    }
};


/***/ }),

/***/ 48:
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (29:12)\nYou may need an appropriate loader to handle this file type.\n|     setStyle(option) {\n|         this.pointStyle = {\n|             ...this.pointStyle,\n|             ...option,\n|         };");

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ele = function (query) { return document.querySelector(query); };


/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.resetCanvas = function (canvas) {
    var _a = [
        canvas.parentElement.offsetWidth,
        canvas.parentElement.offsetHeight,
    ], pWidth = _a[0], pHeight = _a[1];
    canvas.width = pWidth;
    canvas.height = pHeight;
};


/***/ })

/******/ });