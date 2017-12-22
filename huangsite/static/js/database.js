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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var getdom_1 = __webpack_require__(3);
var ajax_1 = __webpack_require__(4);
var domOperate_1 = __webpack_require__(5);
var recursive_methods_1 = __webpack_require__(10);
var OperateDatabase = /** @class */ (function () {
    function OperateDatabase() {
        this.liContainer = getdom_1.ele('#list-container');
        this.fetchBasesBtn = getdom_1.ele('#fetch-bases-btn');
    }
    OperateDatabase.prototype.handleBtnClick = function () {
        var _this = this;
        console.log('button', this.fetchBasesBtn);
        this.fetchBasesBtn.onclick = function (e) {
            _this.getBases(function (data) {
                _this.fillContainer(_this.liContainer, data.content);
                console.log(recursive_methods_1.map(function (v) { return v + 'mm'; }, ['sss', 3, 4, 5, 6, 7]));
            });
        };
    };
    OperateDatabase.prototype.fillContainer = function (container, arr) {
        var ulContainer = domOperate_1.removeAll(container);
        console.log();
        var listDoms = recursive_methods_1.map(function (v) {
            var liDom = document.createElement('li');
            liDom.appendChild(document.createTextNode(String(v)));
            ulContainer.appendChild(liDom);
            return liDom;
        }, arr);
        console.log(listDoms);
    };
    OperateDatabase.prototype.getBases = function (cb) {
        ajax_1.post('/post/list_bases').then(function (data) {
            console.log('data2', data);
            cb(data);
        });
    };
    OperateDatabase.prototype.start = function () {
        this.handleBtnClick();
    };
    return OperateDatabase;
}());
var main = function () {
    var operateDataBases = new OperateDatabase();
    operateDataBases.start();
};
main();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ele = function (query) { return document.querySelector(query); };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ajax = function (url, opt) {
    return fetch(url, opt).then(function (response) {
        var _res = response.clone();
        return _res.blob().then(function (d) {
            return (CONTENT_MAP[d.type] ||
                CONTENT_MAP['otherwise'])(response.clone());
        });
    });
};
var request = function (method, url, params) {
    var headers = new Headers({
        'Content-Type': 'application/json'
    });
    var option = {
        method: method,
        credentials: 'include',
        headers: headers
    };
    if (params) {
        option.body = JSON.stringify(params);
    }
    console.log('option', option);
    return exports.ajax(url, option).then(function (data) {
        if (!data.success) {
            console.error('Got data with error: ', data.error);
            return Promise.reject(data.error);
        }
        return data;
    })["catch"](function (e) {
        console.error('Get error from fetch: ', e);
        return Promise.reject(e);
    });
};
exports.post = function (url, params) { return request('POST', url, params); };
exports.get = function (url, params) { return request('GET', url, params); };
var CONTENT_MAP = {
    'otherwise': function (res) {
        var json = res.clone().json();
        return json;
    }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.removeAll = function (container) {
    if (!container.hasChildNodes()) {
        return container;
    }
    container.removeChild(container.firstChild);
    return exports.removeAll(container);
};


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(11));
__export(__webpack_require__(12));
//# sourceMappingURL=index.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A negeric function
 *
 * @param n paramter of function, start from 0
 * @returns returns a number of fibonacci number
 */
exports.fibonacci = function (n) {
    var fibonacciI = function (forward, afterward, num) {
        var temSum = forward + afterward;
        if (num <= 0) {
            return afterward;
        }
        return fibonacciI(afterward, temSum, num - 1);
    };
    return fibonacciI(0, 1, n);
};
/**
 * Fibonacci function which returns fibonacci consequence
 *
 * @param n parameter of function, start from 0
 * @returns returns a sequence of fibonacci numbers
 */
exports.fibonacciArr = function (n) {
    var fibonacciArrI = function (sumArr, forward, afterward, num) {
        var temSum = forward + afterward;
        if (num <= 0) {
            return sumArr;
        }
        return fibonacciArrI(sumArr.concat(temSum), afterward, temSum, num - 1);
    };
    return fibonacciArrI([1], 0, 1, n);
};
//# sourceMappingURL=sequence.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param func
 * @param list
 * @returns
 */
exports.filter = function (func, list) {
    var filterI = function (rsl, fun, li) {
        var eles = rsl.concat(fun(li[0]) ? [li[0]] : []);
        if (li.length <= 1) {
            return eles;
        }
        return filterI(eles, func, li.slice(1));
    };
    return filterI([], func, list);
};
/**
 *
 * This method is without trail optimization
 * @param func
 * @param list
 * @returns return array or string
 */
exports.sort = function (func, list) {
    if (list.length <= 1) {
        return list;
    }
    var midVal = list[0];
    var leftVals = exports.sort(func, exports.filter(function (v) {
        return func(list[0], v);
    }, list.slice(1)));
    var rightVals = exports.sort(func, exports.filter(function (v) {
        return !func(list[0], v);
    }, list.slice(1)));
    return leftVals.concat(midVal).concat(rightVals);
};
/**
 *
 * @param func function is uesed to judge the value
 * @param list the list of input
 * @returns returns an element
 */
exports.extreme = function (func, list) {
    if (list.length <= 1) {
        return list[0];
    }
    var extremeI = function (fun, li, max) {
        var temMax = fun(max, li[0]) ? max : li[0];
        if (li.length <= 1) {
            return temMax;
        }
        return extremeI(fun, li.slice(1), temMax);
    };
    return extremeI(func, list.slice(1), list[0]);
};
/**
 *
 * @param func
 * @param list
 */
exports.whileis = function (func, list) {
    var whileisI = function (sumArr, fun, li) {
        if (!fun(li[0]) || li.length <= 0) {
            return sumArr;
        }
        return whileisI(sumArr.concat(li[0]), fun, li.slice(1));
    };
    return whileisI([], func, list);
};
/**
 *
 * @param func
 * @param list
 */
exports.drop = function (func, list) {
    var dropI = function (sumArr, fun, li) {
        if (!li.length) {
            return sumArr;
        }
        var restVal = li.length <= 1 ? [] : li.slice(1);
        if (fun(li[0])) {
            return sumArr.concat(restVal);
        }
        return dropI(sumArr.concat(li[0]), fun, restVal);
    };
    return dropI([], func, list);
};
/**
 *
 * @param func
 * @param list
 */
exports.sorter = function (func, list) {
    if (!list.length) {
        return [];
    }
    var sorterI = function (sumArr, fun, li) {
        var extremeVal = exports.extreme(function (a, b) { return !fun(a, b); }, li);
        var val = sumArr.concat(extremeVal);
        if (li.length <= 1) {
            return val;
        }
        return sorterI(val, fun, exports.drop(function (v) { return v === extremeVal; }, li));
    };
    return sorterI([], func, list);
};
/**
 *
 * @param func
 * @param list
 */
exports.map = function (func, list) {
    if (!list.length) {
        return [];
    }
    var mapI = function (sumArr, index, fun, li) {
        var currentEle = sumArr.concat(fun(li[0], index));
        if (li.length <= 1) {
            return currentEle;
        }
        return mapI(currentEle, index + 1, fun, li.slice(1));
    };
    return mapI([], 0, func, list);
};
/**
 * A function that get the type of the input
 *
 * @param param
 * @return return the type of the input
 */
exports.getType = function (param) {
    if (Array.isArray(param)) {
        return "array";
    }
    if (param instanceof Date) {
        return "date";
    }
    if (param === null) {
        return null;
    }
    if (param instanceof RegExp) {
        return "regExp";
    }
    if (param instanceof Error) {
        return "error";
    }
    return typeof param;
};
/**
 * compare if two input values equals
 *
 * @param a First value
 * @param b Second value
 */
exports.congruence = function (a, b) {
    var typeFirst = exports.getType(a);
    if (typeFirst !== exports.getType(b)) {
        return false;
    }
    var TYPE_METHODS_MAP = {
        array: function (x, y) {
            if (x.length !== y.length) {
                return false;
            }
            var ifEqual = function (pre, nex) {
                var compareFirst = exports.congruence(pre[0], nex[0]);
                if (pre.length <= 1) {
                    return compareFirst;
                }
                return compareFirst && TYPE_METHODS_MAP.array(pre.slice(1), nex.slice(1));
            };
            return ifEqual(x, y);
        },
        function: function (x, y) {
            return String(x) === String(y);
        },
        object: function (x, y) {
            var xKeys = Object.keys(x);
            var yKeys = Object.keys(y);
            if (xKeys.length !== yKeys.length) {
                return false;
            }
            var ifKeysEqual = TYPE_METHODS_MAP.array(xKeys, yKeys);
            var ifEqual = function (keys) {
                if (keys.length <= 0) {
                    return true;
                }
                var compareFirst = exports.congruence(x[keys[0]], y[keys[0]]);
                if (keys.length <= 1) {
                    return compareFirst;
                }
                return compareFirst && ifEqual(keys.slice(1));
            };
            return ifKeysEqual && ifEqual(xKeys);
        },
        otherwise: function (x, y) { return a === b; },
    };
    return (TYPE_METHODS_MAP[typeFirst] || TYPE_METHODS_MAP.otherwise)(a, b);
};
//# sourceMappingURL=list-methods.js.map

/***/ })
/******/ ]);