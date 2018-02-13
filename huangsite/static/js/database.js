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
/******/ 	return __webpack_require__(__webpack_require__.s = 207);
/******/ })
/************************************************************************/
/******/ ({

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var recursive_methods_1 = __webpack_require__(68);
var ajax_1 = __webpack_require__(71);
var domOperate_1 = __webpack_require__(208);
var getdom_1 = __webpack_require__(72);
var OperateDatabase = /** @class */ (function () {
    function OperateDatabase() {
        this.liContainer = getdom_1.ele("#list-container");
        this.fetchBasesBtn = getdom_1.ele("#fetch-bases-btn");
    }
    OperateDatabase.prototype.handleBtnClick = function () {
        var _this = this;
        this.fetchBasesBtn.onclick = function (e) {
            _this.getBases(function (data) {
                _this.fillContainer(_this.liContainer, data.content);
            });
        };
    };
    OperateDatabase.prototype.fillContainer = function (container, arr) {
        var ulContainer = domOperate_1.removeAll(container);
        var listDoms = recursive_methods_1.map(function (v) {
            var liDom = document.createElement("li");
            liDom.appendChild(document.createTextNode(String(v)));
            ulContainer.appendChild(liDom);
            return liDom;
        }, arr);
    };
    OperateDatabase.prototype.getBases = function (cb) {
        ajax_1.post("/post/list_bases").then(function (data) {
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

/***/ 208:
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

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(69));
__export(__webpack_require__(70));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 69:
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

/***/ 70:
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
    return leftVals.concat([midVal]).concat(rightVals);
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
        return whileisI(sumArr.concat([li[0]]), fun, li.slice(1));
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
        var val = sumArr.concat([extremeVal]);
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
        var currentEle = sumArr.concat([fun(li[0], index)]);
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
exports.isCongruence = function (a, b) {
    var typeFirst = exports.getType(a);
    if (typeFirst !== exports.getType(b)) {
        return false;
    }
    var TYPE_METHODS_MAP = {
        array: function (x, y) {
            if (x === y) {
                return true;
            }
            if (x.length !== y.length) {
                return false;
            }
            var ifEqual = function (pre, nex) {
                var compareFirst = exports.isCongruence(pre[0], nex[0]);
                if (pre.length <= 1) {
                    return compareFirst;
                }
                return compareFirst && TYPE_METHODS_MAP.array(pre.slice(1), nex.slice(1));
            };
            return ifEqual(x, y);
        },
        function: function (x, y) {
            if (x === y) {
                return true;
            }
            return String(x) === String(y);
        },
        object: function (x, y) {
            if (x === y) {
                return true;
            }
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
                var compareFirst = exports.isCongruence(x[keys[0]], y[keys[0]]);
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
/**
 * A function would reverse the input list
 *
 * @param list list
 * @returns return a list
 */
exports.reverse = function (list) {
    if (!list.length) {
        return list;
    }
    var reverseI = function (outputArr, li) {
        var currentEle = [li[0]].concat(outputArr);
        if (li.length <= 1) {
            return currentEle;
        }
        return reverseI(currentEle, li.slice(1));
    };
    return reverseI([], list);
};
/**
 * A function
 *
 * @param gap
 * @param func
 * @param list
 */
exports.fragment = function (gap, func, list) {
    if (!list.length) {
        return [];
    }
    if (gap <= 0) {
        var error = new Error();
        error.message = "The first parameter should be a positive number";
        throw error;
    }
    var fragmentI = function (arr, index, gapN, fun, li) {
        var frag = fun(li.slice(0, gapN), index);
        var sumArr = arr.concat([frag]);
        if (li.length <= gap) {
            return sumArr;
        }
        return fragmentI(sumArr, index + 1, gapN, fun, li.slice(gapN));
    };
    return fragmentI([], 0, gap, func, list);
};
/**
 * A function return the deduplicated value
 *
 * @param list
 */
exports.deduplicate = function (list) {
    if (!list.length) {
        return [];
    }
    var deduplicateI = function (sumArr, li) {
        var filtedArr = exports.filter(function (v) { return !exports.isCongruence(li[0], v); }, li.slice(1));
        var arr = sumArr.concat(li[0]);
        if (li.length <= 1) {
            return arr;
        }
        return deduplicateI(arr, filtedArr);
    };
    return deduplicateI([], list);
};
//# sourceMappingURL=list-methods.js.map

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ajax = function (url, opt) {
    return fetch(url, opt).then(function (response) {
        var resI = response.clone();
        return resI.blob().then(function (d) {
            var data = (CONTENT_MAP[d.type] ||
                CONTENT_MAP.otherwise)(response.clone());
            return data;
        });
    });
};
var request = function (method, url, params) {
    var headers = new Headers({
        "Content-Type": "application/json"
    });
    var option = {
        credentials: "include",
        headers: headers,
        method: method
    };
    if (params) {
        option.body = JSON.stringify(params);
    }
    return exports.ajax(url, option).then(function (data) {
        if (!data.success) {
            Promise.reject(data.error);
        }
        return data;
    })["catch"](function (e) {
        return Promise.reject(e);
    });
};
exports.post = function (url, params) { return request("POST", url, params); };
exports.get = function (url, params) { return request("GET", url, params); };
var CONTENT_MAP = {
    otherwise: function (res) {
        var json = res.clone().json();
        return json;
    }
};


/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.ele = function (query) { return document.querySelector(query); };


/***/ })

/******/ });