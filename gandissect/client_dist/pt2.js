/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"pt2": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./ts/pt2.ts","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/file-loader/dist/cjs.js?name=pt2.html!./pt2.html":
/*!****************************************************************************************************************!*\
  !*** /usr/local/home/davidbau/netdissect/client/node_modules/file-loader/dist/cjs.js?name=pt2.html!./pt2.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pt2.html";

/***/ }),

/***/ "./css/pt2.scss":
/*!**********************!*\
  !*** ./css/pt2.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./ts/api/GanterAPI.ts":
/*!*****************************!*\
  !*** ./ts/api/GanterAPI.ts ***!
  \*****************************/
/*! exports provided: GanterAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GanterAPI", function() { return GanterAPI; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/d3/index.js");
/*
Ganter API and Types
 */

class GanterAPI {
    static allProjects() {
        return d3__WEBPACK_IMPORTED_MODULE_0__["json"]('/api/all_projects');
    }
    static ablationChannels(project, layer = "layer2") {
        return d3__WEBPACK_IMPORTED_MODULE_0__["json"](`/api/channels?project=${project}&layer=${layer}`);
    }
    static recipes(project) {
        return d3__WEBPACK_IMPORTED_MODULE_0__["json"](`/api/recipes?project=${project}`);
    }
    static rankings(project, layer) {
        return d3__WEBPACK_IMPORTED_MODULE_0__["json"](`/api/rankings?project=${project}&layer=${layer}`);
    }
    static levels(project, layer, q = 0.99) {
        //../api/levels?project=churchoutdoor&layer=layer4&quantiles=0.99
        return d3__WEBPACK_IMPORTED_MODULE_0__["json"](`/api/levels?project=${project}&layer=${layer}&quantiles=${q}`);
    }
    static generateImgs(project, ids, wantz = 0, ablations = []) {
        return d3__WEBPACK_IMPORTED_MODULE_0__["json"]('/api/generate', {
            method: "POST",
            body: JSON.stringify({
                "ablations": ablations,
                "project": project,
                "ids": ids,
                "wantz": wantz
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }
    static generateImgsIntervention(project, ids, wantz = 0, ablation_rm = [], ablation_cp = [], mask_cp) {
        const payload = {
            // "ablations": ablations,
            "project": project,
            "ids": ids,
            "wantz": wantz,
            "interventions": [
                { ablations: ablation_rm },
                { ablations: ablation_cp, mask: mask_cp }
            ]
        };
        console.log(payload, "--- payload");
        return d3__WEBPACK_IMPORTED_MODULE_0__["json"]('/api/generate', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }
    static units(project, layer) {
        return d3__WEBPACK_IMPORTED_MODULE_0__["json"](`/api/units?project=${project}&layer=${layer}`);
    }
    static generateFeatures(project, imasks, layers, ablations = []) {
        /*
        project = feat_req['project']
        ids = feat_req['ids']
        masks = feat_req.get('masks', None)
        layers = feat_req.get('layers', None)
        ablations = feat_req.get('ablations', [])
        */
        const ids = imasks.map(d => d.id);
        const masks = imasks.map(d => ({
            shape: [],
            bitbounds: [],
            bitstring: d.mask
        }));
        return d3__WEBPACK_IMPORTED_MODULE_0__["json"]('/api/features', {
            method: "POST",
            body: JSON.stringify({
                ablations,
                project,
                ids,
                masks,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }
    static generateFeaturesLocal(project, ids, layers, masks, ablations = []) {
        /*
        project = feat_req['project']
        ids = feat_req['ids']
        masks = feat_req.get('masks', None)
        layers = feat_req.get('layers', None)
        ablations = feat_req.get('ablations', [])
        */
        // const ids = imasks.map(d => d.id);
        // const masks = imasks.map(d => ({
        //     shape: [],
        //     bitbounds: [],
        //     bitstring: d.mask
        // }));
        masks.forEach(mask => {
            if (mask.bitstring == null) {
                const bb = mask.bitbounds;
                const bits = (bb[2] - bb[0]) * (bb[3] - bb[1]);
                mask.bitstring = '1'.repeat(bits);
            }
        });
        return d3__WEBPACK_IMPORTED_MODULE_0__["json"]('/api/features', {
            method: "POST",
            body: JSON.stringify({
                ablations,
                project,
                ids,
                masks,
                layers
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }
}


/***/ }),

/***/ "./ts/etc/GlobalVars.ts":
/*!******************************!*\
  !*** ./ts/etc/GlobalVars.ts ***!
  \******************************/
/*! exports provided: GlobalEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalEvents", function() { return GlobalEvents; });
const GlobalEvents = {
    window_resize: 'GlobalEvents_wr',
    main_resize: 'GlobalEvents_mr'
};


/***/ }),

/***/ "./ts/etc/SVGplus.ts":
/*!***************************!*\
  !*** ./ts/etc/SVGplus.ts ***!
  \***************************/
/*! exports provided: SVG, SVGMeasurements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVG", function() { return SVG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGMeasurements", function() { return SVGMeasurements; });
/**
 * Created by hen on 5/15/17.
 */
class SVG {
    static translate({ x, y }) {
        return "translate(" + x + "," + y + ")";
    }
    static group(parent, classes, pos = { x: 0, y: 0 }) {
        return parent.append('g').attrs({
            class: classes,
            "transform": SVG.translate(pos)
        });
    }
}
class SVGMeasurements {
    constructor(baseElement, classes = '') {
        this.measureElement = baseElement.append('text')
            .attrs({ x: 0, y: -20, class: classes });
    }
    textLength(text, style = null) {
        this.measureElement.attr('style', style);
        this.measureElement.text(text);
        const tl = this.measureElement.node().getComputedTextLength();
        this.measureElement.text('');
        return tl;
    }
}


/***/ }),

/***/ "./ts/etc/SimpleEventHandler.ts":
/*!**************************************!*\
  !*** ./ts/etc/SimpleEventHandler.ts ***!
  \**************************************/
/*! exports provided: SimpleEventHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleEventHandler", function() { return SimpleEventHandler; });
/**
 * Created by hen on 5/15/17.
 */
class SimpleEventHandler {
    constructor(element) {
        this.element = element;
        this.eventListeners = [];
    }
    bind(eventNames, eventFunction) {
        for (const eventName of eventNames.split(' ')) {
            this.eventListeners.push({ eventName, eventFunction });
            const eventFunctionWrap = e => eventFunction(e.detail, e);
            this.element.addEventListener(eventName, eventFunctionWrap, false);
        }
    }
    getListeners() {
        return this.eventListeners;
    }
    trigger(eventName, detail) {
        this.element.dispatchEvent(new CustomEvent(eventName, { detail }));
    }
}


/***/ }),

/***/ "./ts/etc/URLHandler.ts":
/*!******************************!*\
  !*** ./ts/etc/URLHandler.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return URLHandler; });
/**
 * Created by hen on 5/15/17.
 */
class URLHandler {
    static basicURL() {
        const url_path = window.location.pathname.split('/').slice(0, -2).join('/');
        return window.location.origin + (url_path.length ? url_path : '');
    }
    /**
     * Read all URL parameters into a map.
     * @returns {Map} the url parameters as a key-value store (ES6 map)
     */
    static get parameters() {
        // Adapted from:  http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
        const query = window.location.search.substring(1);
        const vars = query.split('&');
        console.log(vars, "--- vars");
        const urlParameters = {};
        const isInt = x => (/^[0-9]+$/).test(x);
        const isFloat = x => (/^[0-9]+\.[0-9]*$/).test(x);
        const typeCast = val => {
            if (isInt(val)) {
                return Number.parseInt(val, 10);
            }
            else if (isFloat(val)) {
                return Number.parseFloat(val);
            }
            // else:
            return val;
        };
        vars.forEach(v => {
            if (v.length > 0) {
                const splits = v.split('=');
                const key = decodeURIComponent(splits[0]);
                let raw_value = decodeURIComponent(splits[1]);
                const isArray = raw_value.startsWith('..');
                if (isArray) {
                    raw_value = raw_value.slice(2);
                }
                if (raw_value.length < 1) {
                    urlParameters[key] = isArray ? [] : '';
                }
                else if (isArray) {
                    urlParameters[key] = raw_value.split(',')
                        .map(val => typeCast(val));
                }
                else {
                    urlParameters[key] = typeCast(raw_value);
                }
            }
        });
        return urlParameters;
    }
    /**
     * Generates an URL string from a map of url parameters
     * @param {{}} urlParameters - the map of parameters
     * @returns {string} - an URI string
     */
    static urlString(urlParameters) {
        const attr = [];
        Object.keys(urlParameters).forEach(k => {
            const v = urlParameters[k];
            if (v !== undefined) {
                let value = v;
                if (Array.isArray(v))
                    value = '..' + v.join(',');
                attr.push(encodeURI(k + '=' + value));
            }
        });
        const url = window.location.pathname;
        let res = url.substring(url.lastIndexOf('/') + 1);
        if (attr.length > 0) {
            res += '?' + attr.join('&');
        }
        return res;
    }
    static updateURLParam(key, value, addToBrowserHistory = true) {
        const currentParams = URLHandler.parameters;
        currentParams[key] = value;
        URLHandler.updateUrl(currentParams, addToBrowserHistory);
    }
    // /**
    //  * Generates a key-value map of all URL params and replaces replaceKeys
    //  * @param updateKeys
    //  */
    // static updateURLParams(updateKeys) {
    //     const currentParams = URLHandler.parameters;
    //     Object.keys(updateKeys).forEach((k) => currentParams[k] = updateKeys[k])
    //     return currentParams;
    // }
    static updateUrl(urlParameters, addToBrowserHistory = true) {
        if (addToBrowserHistory) {
            window.history.pushState(urlParameters, '', URLHandler.urlString(urlParameters));
        }
        else {
            window.history.replaceState(urlParameters, '', URLHandler.urlString(urlParameters));
        }
    }
}


/***/ }),

/***/ "./ts/etc/Util.ts":
/*!************************!*\
  !*** ./ts/etc/Util.ts ***!
  \************************/
/*! exports provided: Util, argsort, range, obj_to_arr, arr_to_obj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return Util; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "argsort", function() { return argsort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "range", function() { return range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "obj_to_arr", function() { return obj_to_arr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arr_to_obj", function() { return arr_to_obj; });
/**
 * Created by hen on 5/15/17.
 */
let the_unique_id_counter = 0;
class Util {
    static simpleUId({ prefix = '' }) {
        the_unique_id_counter += 1;
        return prefix + the_unique_id_counter;
    }
}
function argsort(array, sortFct) {
    return array
        .map((d, i) => [d, i])
        .sort((a, b) => sortFct(a[0], b[0]))
        .map(d => d[1]);
}
function range(end) {
    return [...Array(end).keys()];
}
function obj_to_arr(obj) {
    const sortedKeys = Object.keys(obj).sort();
    const res = [];
    sortedKeys.forEach(k => { res.push(k); res.push(obj[k]); });
    return res;
}
function arr_to_obj(arr) {
    const res = {};
    const max_l = Math.floor(arr.length / 2);
    for (let i = 0; i < max_l; i++) {
        res[arr[2 * i]] = arr[2 * i + 1];
    }
    return res;
}


/***/ }),

/***/ "./ts/pt2.ts":
/*!*******************!*\
  !*** ./ts/pt2.ts ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/d3/index.js");
/* harmony import */ var d3_selection_multi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection-multi */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/d3-selection-multi/index.js");
/* harmony import */ var _css_pt2_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/pt2.scss */ "./css/pt2.scss");
/* harmony import */ var _css_pt2_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_pt2_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _file_loader_name_pt2_html_pt2_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! file-loader?name=pt2.html!../pt2.html */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/file-loader/dist/cjs.js?name=pt2.html!./pt2.html");
/* harmony import */ var _file_loader_name_pt2_html_pt2_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_pt2_html_pt2_html__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _etc_SimpleEventHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./etc/SimpleEventHandler */ "./ts/etc/SimpleEventHandler.ts");
/* harmony import */ var _etc_GlobalVars__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./etc/GlobalVars */ "./ts/etc/GlobalVars.ts");
/* harmony import */ var _etc_URLHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./etc/URLHandler */ "./ts/etc/URLHandler.ts");
/* harmony import */ var _vis_ExampleView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vis/ExampleView */ "./ts/vis/ExampleView.ts");
/* harmony import */ var _api_GanterAPI__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./api/GanterAPI */ "./ts/api/GanterAPI.ts");
/* harmony import */ var _vis_PaintSelectView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./vis/PaintSelectView */ "./ts/vis/PaintSelectView.ts");
/* harmony import */ var _etc_Util__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./etc/Util */ "./ts/etc/Util.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};











let exampleIDs = d3__WEBPACK_IMPORTED_MODULE_0__["range"](0, 60);
const global = {
    sidebar: () => d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.sidenav').node()
        .getBoundingClientRect().width
};
const current = {
    project: "",
    indexSort: d3__WEBPACK_IMPORTED_MODULE_0__["range"](100),
    layer: () => d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#layer_selector").node().value,
    single_ngram: () => +d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#unitSingleAbNgram").node().value
};
window.onload = () => {
    const eventHandler = new _etc_SimpleEventHandler__WEBPACK_IMPORTED_MODULE_4__["SimpleEventHandler"](d3__WEBPACK_IMPORTED_MODULE_0__["select"]('body').node());
    const project_selector = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#project_selector');
    const main_view_sel = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.floating_content');
    const exampleView = new _vis_ExampleView__WEBPACK_IMPORTED_MODULE_7__["ExampleView"](main_view_sel.select('.ablation_examples'), eventHandler);
    exampleView.imgWidth = 50;
    const psv = new _vis_PaintSelectView__WEBPACK_IMPORTED_MODULE_9__["PaintSelectView"](d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#paint_image'), eventHandler);
    d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#reset_mask_btn").on("click", () => psv.reset());
    const compare_img = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#compare_img');
    const minExInput = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#minEx');
    const noExInput = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#noEx');
    const abNoInput = d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#noAb");
    const start_params = _etc_URLHandler__WEBPACK_IMPORTED_MODULE_6__["default"].parameters;
    _api_GanterAPI__WEBPACK_IMPORTED_MODULE_8__["GanterAPI"].allProjects()
        .then((projects) => {
        const project_selected = start_params['project'];
        let options = project_selector
            .selectAll('option').data(projects);
        options.exit().remove();
        options.enter().append('option')
            .merge(options)
            .attr('value', d => d.project).text(d => d.project)
            .property('selected', d => d.project === project_selected);
        projectChange(project_selector.property('value'));
    });
    project_selector.on('change', d => {
        projectChange(project_selector.property('value'));
    });
    function projectChange(project) {
        console.log(project, "--- project");
        current.project = project;
        _etc_URLHandler__WEBPACK_IMPORTED_MODULE_6__["default"].updateURLParam('project', project, false);
        // GanterAPI.ablationChannels(project)
        //     .then((data) => {
        //         //     ablationView.update(data.res);
        //         //
        //         //     barchartTest.update({
        //         //         ids: [], values: data.res.ablation
        //         //
        //         //     })
        //         //
        //         //     recipes = {};
        //         //     d3.json(`/api/recipes?project=${project}`)
        //         //         .then((data: APIRes_Recipes) => {
        //         //             console.log(data.res, "--- data.res");
        //         //             data.res.forEach(rec => recipes[rec.name] = rec);
        //         //
        //         //             d3.select('.recipes').selectAll('option').remove();
        //         //             d3.select('.recipes').selectAll('option')
        //         //                 .data(data.res).enter().append('option').attrs({
        //         //                 value: d => d.name
        //         //             }).text(d => d.name)
        //         //                 .property('selected', d => d.name === start_params['recipe']);
        //         //
        //         //
        //         //             d3.select(".apply_rec_btn")
        //         //                 .style('opacity', 1)
        //         //                 .style('pointer-events', null)
        //         //             ;
        //         //
        //         //             if ('recipe' in start_params) {
        //         //                 applyRecipe();
        //         //             }
        //         //
        //         //
        //         //         })
        //         //
        //         //
        //     })
        generateSamples();
    }
    minExInput.on('input', () => {
        _etc_URLHandler__WEBPACK_IMPORTED_MODULE_6__["default"].updateURLParam('minEx', minExInput.node().value);
        generateSamples();
    });
    noExInput.on('input', () => {
        _etc_URLHandler__WEBPACK_IMPORTED_MODULE_6__["default"].updateURLParam('noEx', noExInput.node().value);
        generateSamples();
    });
    function generateSamples() {
        const url_p = _etc_URLHandler__WEBPACK_IMPORTED_MODULE_6__["default"].parameters;
        let minEx = +minExInput.node().value;
        let noEx = +noExInput.node().value;
        if ('minEx' in url_p) {
            minEx = +url_p['minEx'];
            minExInput.node().value = '' + minEx;
        }
        if ('noEx' in url_p) {
            noEx = +url_p['noEx'];
            noExInput.node().value = '' + noEx;
        }
        exampleIDs = d3__WEBPACK_IMPORTED_MODULE_0__["range"](minEx, minEx + noEx);
        console.log(exampleIDs, "--- exampleIDs");
        _api_GanterAPI__WEBPACK_IMPORTED_MODULE_8__["GanterAPI"].generateImgs(current.project, exampleIDs)
            .then((data) => {
            exampleView.update({ orig: data });
            //
        });
    }
    window.onresize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        // console.log(w, h, "--- w,h");
        re_layout(w, h);
    };
    function re_layout(w, h) {
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.sidenav')
            .style('height', (h - 45) + 'px');
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.main_frame')
            .style('height', (h - 45) + 'px')
            .style('width', (w - 300) + 'px');
        eventHandler.trigger(_etc_GlobalVars__WEBPACK_IMPORTED_MODULE_5__["GlobalEvents"].window_resize, { w, h });
        eventHandler.trigger(_etc_GlobalVars__WEBPACK_IMPORTED_MODULE_5__["GlobalEvents"].main_resize, {
            w: (w - global.sidebar()),
            h: (h - 45)
        });
    }
    re_layout(window.innerWidth, window.innerHeight);
    function displayDetails(imgList) {
        const dt = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.sidenav .detail_img');
        if (imgList) {
            dt.html(imgList
                .map(img => `<img src="${img}" width="${global.sidebar() - 10}">`)
                .join('<br>'));
        }
        else {
            dt.html(`<svg width="${global.sidebar() - 10}" height="${global.sidebar() - 10}">`);
        }
    }
    eventHandler.bind(_vis_ExampleView__WEBPACK_IMPORTED_MODULE_7__["ExampleView"].events.hovered_image_pair, (d) => {
        if (d.hovered) {
            displayDetails(d.images.map(img => img.d));
        }
        else {
            displayDetails(null);
        }
    });
    eventHandler.bind(_vis_ExampleView__WEBPACK_IMPORTED_MODULE_7__["ExampleView"].events.clicked_image_pair, (d) => {
        console.log(d, "--- d");
        const img = new Image();
        img.onload = () => {
            psv.update({
                image: img,
                imageID: '' + d.images[0].id
            });
        };
        img.src = d.images[0].d;
    });
    abNoInput.on('input', () => {
        _etc_URLHandler__WEBPACK_IMPORTED_MODULE_6__["default"].updateURLParam('noAb', abNoInput.node().value);
        generateCompare();
    });
    function generateCompare() {
        const url_p = _etc_URLHandler__WEBPACK_IMPORTED_MODULE_6__["default"].parameters;
        if ('noAb' in url_p) {
            abNoInput.node().value = url_p['noAb'];
        }
        else {
            _etc_URLHandler__WEBPACK_IMPORTED_MODULE_6__["default"].updateURLParam('noAb', abNoInput.node().value);
        }
        const noAb = +abNoInput.node().value;
        _api_GanterAPI__WEBPACK_IMPORTED_MODULE_8__["GanterAPI"].generateImgs(current.project, [psv.imageID], 0, current.indexSort.slice(0, noAb).map(d => ({
            alpha: 1,
            layer: current.layer(),
            unit: d
        }))).then((abImage) => {
            console.log(abImage, "--- abimage");
            compare_img.html(`<img src="${abImage.res[0].d}" width="200%"/>`);
        });
    }
    eventHandler.bind(_vis_PaintSelectView__WEBPACK_IMPORTED_MODULE_9__["PaintSelectView"].events.maskChanged, (mask) => {
        _api_GanterAPI__WEBPACK_IMPORTED_MODULE_8__["GanterAPI"].generateFeatures(current.project, [mask], [current.layer()]).then((data) => {
            console.log(data.res, "--- values");
            const indexSort = Object(_etc_Util__WEBPACK_IMPORTED_MODULE_10__["argsort"])(data.res[current.layer()].max, (a, b) => b - a);
            current.indexSort = indexSort;
            _api_GanterAPI__WEBPACK_IMPORTED_MODULE_8__["GanterAPI"].units(current.project, current.layer()).then((data) => {
                console.log(data.res, "--- units");
                const units = d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#units").selectAll(".units").data(indexSort);
                units.exit().remove();
                const unitsEnter = units.enter().append('img').attr('class', 'units');
                unitsEnter.merge(units).attrs({
                    src: im_index => data.res[im_index].img,
                    width: 50
                });
            });
            generateCompare();
        });
    });
    function requestAll(indices, cummulative = true, everyUnit = 10, unitStepSize = 10, callback = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = [];
            let indis = [...d3__WEBPACK_IMPORTED_MODULE_0__["range"](0, everyUnit)];
            if (unitStepSize > 0) {
                indis = [...indis, ...d3__WEBPACK_IMPORTED_MODULE_0__["range"](everyUnit, indices.length, unitStepSize)];
            }
            for (const i of indis) {
                console.log(indices.slice(0, i), "--- indices.slice(0, i)");
                let layers = [];
                if (cummulative) {
                    layers = indices.slice(0, i).map(d => ({
                        alpha: 1,
                        layer: current.layer(),
                        unit: d
                    }));
                }
                else {
                    // layers = [{
                    //     alpha: 1,
                    //     layer: current.layer(),
                    //     unit: indices[i]
                    // }]
                    layers = indices.map((d, ii) => ({
                        alpha: ((i - current.single_ngram() < ii) && (ii <= i)) ? 0 : 1,
                        layer: current.layer(),
                        unit: d
                    }));
                }
                const img = yield _api_GanterAPI__WEBPACK_IMPORTED_MODULE_8__["GanterAPI"].generateImgs(current.project, [psv.imageID], 0, layers);
                if (callback && cummulative)
                    callback(img.res[0].d, i);
                if (callback && !cummulative)
                    callback(img.res[0].d, indices[i]);
                res.push(img.res[0]);
            }
            return res;
        });
    }
    d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#unitAbBtn").on('click', () => {
        const unitAb = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#unitAb');
        unitAb.html('');
        // const indis = current.indexSort;
        const all = requestAll(current.indexSort, true, 10, 10, (img, index) => {
            const div = unitAb.append('div')
                .style('display', 'inline-block')
                .style('position', 'relative')
                .style('margin-left', '2px')
                .on('mouseenter', d => {
                displayDetails([img]);
            })
                .on('mouseleave', d => {
                displayDetails(null);
            });
            div.append('img').attr('src', img).attr('width', 100);
            div.append('text')
                .style('position', 'absolute')
                .style('top', '5px')
                .style('left', '5px')
                .text('i: ' + index);
            if (index === 10)
                unitAb.append('br');
        });
        all.then(a => console.log(a, "--- a"));
    });
    d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#unitSingleAbBtn").on('click', () => {
        const unitAb = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#unitSingleAb');
        unitAb.html('');
        const indis = current.indexSort;
        const all = requestAll(indis, false, indis.length, -1, (img, index) => {
            const div = unitAb.append('div')
                .style('display', 'inline-block')
                .style('position', 'relative')
                .style('margin-left', '2px')
                .on('mouseenter', d => {
                displayDetails([img]);
            })
                .on('mouseleave', d => {
                displayDetails(null);
            });
            div.append('img').attr('src', img).attr('width', 100);
            div.append('text')
                .style('position', 'absolute')
                .style('top', '5px')
                .style('left', '5px')
                .text('i: ' + index);
            // if (index === 10) unitAb.append('br');
        });
        all.then(a => console.log(a, "--- a"));
    });
};


/***/ }),

/***/ "./ts/vis/ExampleView.ts":
/*!*******************************!*\
  !*** ./ts/vis/ExampleView.ts ***!
  \*******************************/
/*! exports provided: ExampleView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExampleView", function() { return ExampleView; });
/* harmony import */ var _VisComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VisComponent */ "./ts/vis/VisComponent.ts");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/d3/index.js");


class ExampleView extends _VisComponent__WEBPACK_IMPORTED_MODULE_0__["VComponent"] {
    constructor(d3parent, eventHandler) {
        super(d3parent, eventHandler);
        this._imgWidth = -1;
        this._current = {};
        this.css_name = "ExampleView";
        this.options = { pos: { x: 0, y: 0 } };
        this.superInitHTML();
        this._init();
    }
    _init() {
        this.div_origs = this.base.append('div').attr('class', 'examples');
    }
    _render(rData = this.renderData) {
        if (!rData)
            return;
        const that = this;
        const renderList = rData.orig.res.map(d => [d]);
        if (rData.compare) {
            rData.compare.res.map((d, i) => renderList[i].push(d));
        }
        let img_pairs = this.div_origs.selectAll('.img_pair').data(renderList);
        img_pairs.exit().remove();
        img_pairs = img_pairs.enter().append('div').attr('class', 'img_pair')
            .merge(img_pairs);
        let imgs = img_pairs.selectAll('img').data(d => d);
        imgs.exit().remove();
        imgs.enter().append('img')
            .merge(imgs)
            .attr('src', d => d.d)
            .attr('width', this._imgWidth > -1 ? this._imgWidth : null);
        img_pairs.on('click', function (d) {
            const eventDetail = {
                caller: d3__WEBPACK_IMPORTED_MODULE_1__["select"](this),
                images: d
            };
            that.eventHandler.trigger(ExampleView.events.clicked_image_pair, eventDetail);
        });
        img_pairs.on('mouseenter', function (d) {
            const eventDetail = {
                caller: d3__WEBPACK_IMPORTED_MODULE_1__["select"](this),
                images: d,
                hovered: true
            };
            that.eventHandler.trigger(ExampleView.events.hovered_image_pair, eventDetail);
        });
        img_pairs.on('mouseleave', function (d) {
            const eventDetail = {
                caller: d3__WEBPACK_IMPORTED_MODULE_1__["select"](this),
                images: d,
                hovered: false
            };
            that.eventHandler.trigger(ExampleView.events.hovered_image_pair, eventDetail);
        });
    }
    _wrangle(data) {
        return data;
    }
    set ablated(data) {
        this.data.compare = data;
        this.renderData = this._wrangle(this.data);
        this._render();
    }
    set imgWidth(imgWidth) {
        this._imgWidth = imgWidth;
        this._render();
    }
}
ExampleView.events = {
    request_examples: "ExampleView_re",
    hovered_image_pair: "ExampleView_hip",
    clicked_image_pair: "ExampleView_cip",
};


/***/ }),

/***/ "./ts/vis/PaintSelectView.ts":
/*!***********************************!*\
  !*** ./ts/vis/PaintSelectView.ts ***!
  \***********************************/
/*! exports provided: PaintSelectView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaintSelectView", function() { return PaintSelectView; });
/* harmony import */ var _VisComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VisComponent */ "./ts/vis/VisComponent.ts");
/* harmony import */ var paint_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! paint_select */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/paint_select/dist/paint_select.js");
/* harmony import */ var paint_select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(paint_select__WEBPACK_IMPORTED_MODULE_1__);


class PaintSelectView extends _VisComponent__WEBPACK_IMPORTED_MODULE_0__["VComponent"] {
    constructor(_parent, _eventHandler) {
        super(_parent, _eventHandler);
        this.css_name = "PaintSelectView";
        this.superInitHTML();
        // TODO:hack
        // this.base.attr('class', '');
        this._init();
    }
    _init() {
        this.psw = new paint_select__WEBPACK_IMPORTED_MODULE_1__["PaintSelectWidget"](this.base.node(), {
            overlayModified: (me, mask) => {
                this.fireMaskEvent(mask);
            }
        }, null, 1);
        this.psw.radius = 20;
        this.psw.drawColor = '#f06069';
        this.psw.alpha = .3;
    }
    fireMaskEvent(mask) {
        const imgMask = {
            id: this.renderData.imageID || -1,
            mask
        };
        this.eventHandler.trigger(PaintSelectView.events.maskChanged, imgMask);
    }
    _wrangle(data) {
        return data;
    }
    _render(rD = this.renderData) {
        this.psw.backgroundImage = rD.image;
        this.psw.redraw();
    }
    // private selectionModified(me, mask) {
    //
    //     console.log(this, "--- this");
    //     const imgMask: ImageMask = {
    //         id: this.renderData.backgroundImageID || -1,
    //         mask
    //     }
    //
    //     this.eventHandler.trigger(PaintSelectView.events.maskChanged,
    //         imgMask
    //     )
    //
    //
    //     // console.log(me, image,"--- me, image");
    // }
    resetSelection() {
        this.psw.reset();
    }
    get image() {
        return this.psw.backgroundImage;
    }
    get imageID() {
        return this.renderData.imageID;
    }
    set zoom(z) {
        this.psw.zoom = z;
    }
    set opacity(o) {
        this.psw.alpha = o;
    }
    reset(supressEvent = false) {
        this.psw.reset();
        if (!supressEvent) {
            this.fireMaskEvent(this.psw.currentMask);
        }
    }
}
PaintSelectView.events = {
    maskChanged: "PaintSelectView_mc"
};


/***/ }),

/***/ "./ts/vis/VisComponent.ts":
/*!********************************!*\
  !*** ./ts/vis/VisComponent.ts ***!
  \********************************/
/*! exports provided: VComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VComponent", function() { return VComponent; });
/* harmony import */ var _etc_Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../etc/Util */ "./ts/etc/Util.ts");
/* harmony import */ var _etc_SimpleEventHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../etc/SimpleEventHandler */ "./ts/etc/SimpleEventHandler.ts");
/* harmony import */ var _etc_SVGplus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../etc/SVGplus */ "./ts/etc/SVGplus.ts");



class VComponent {
    // CONSTRUCTOR ============================================================
    /**
     * Simple constructor. Subclasses should call @superInit(options) as well.
     * see why here: https://stackoverflow.com/questions/43595943/why-are-derived-class-property-values-not-seen-in-the-base-class-constructor
     *
     * template:
     constructor(d3Parent: D3Sel, eventHandler?: SimpleEventHandler, options: {} = {}) {
        super(d3Parent, eventHandler);
        // -- access to subclass params:
        this.superInit(options);
     }
     *
     * @param {D3Sel} d3parent  D3 selection of parent SVG DOM Element
     * @param {SimpleEventHandler} eventHandler a global event handler object or 'null' for local event handler
     */
    constructor(d3parent, eventHandler) {
        this.id = _etc_Util__WEBPACK_IMPORTED_MODULE_0__["Util"].simpleUId({});
        this.parent = d3parent;
        // If not further specified - create a local event handler bound to the bas element
        this.eventHandler = eventHandler ||
            new _etc_SimpleEventHandler__WEBPACK_IMPORTED_MODULE_1__["SimpleEventHandler"](this.parent.node());
        // Object for storing internal states and variables
        this._visibility = { hidden: false };
    }
    // protected createSvgLayers(layers=['bg','main','fg']){
    //     this._layers = {}
    //     this.base = SVG.group(this.parent,
    //             this.css_name + ' ID' + this.id,
    //             this.options.pos);
    //
    // }
    superInitHTML(options = {}) {
        Object.keys(options).forEach(key => this.options[key] = options[key]);
        this.base = this.parent.append('div')
            .classed(this.css_name, true);
    }
    /**
     * Has to be called as last call in subclass constructor.
     * @param {{}} options
     * @param defaultLayers -- create the default <g> layers: bg -> main -> fg
     */
    superInitSVG(options = {}, defaultLayers = ['bg', 'main', 'fg']) {
        // Set default options if not specified in constructor call
        // const defaults = this.defaultOptions;
        // this.options = {};
        // const keys = new Set([...Object.keys(defaults), ...Object.keys(options)]);
        // keys.forEach(key => this.options[key] = (key in options) ? options[key] : defaults[key]);
        Object.keys(options).forEach(key => this.options[key] = options[key]);
        this.layers = {};
        // Create the base group element
        this.base = _etc_SVGplus__WEBPACK_IMPORTED_MODULE_2__["SVG"].group(this.parent, this.css_name + ' ID' + this.id, this.options.pos);
        // create default layers: background, main, foreground
        if (defaultLayers) {
            // construction order is important !
            defaultLayers.forEach(layer => {
                this.layers[layer] = _etc_SVGplus__WEBPACK_IMPORTED_MODULE_2__["SVG"].group(this.base, layer);
            });
            // this.layers.bg = SVG.group(this.base, 'bg');
            // this.layers.main = SVG.group(this.base, 'main');
            // this.layers.fg = SVG.group(this.base, 'fg');
        }
    }
    // DATA UPDATE & RENDER ============================================================
    /**
     * Every time data has changed, update is called and
     * triggers wrangling and re-rendering
     * @param {Object} data data object
     * @return {*} ---
     */
    update(data) {
        this.data = data;
        if (this._visibility.hidden)
            return;
        this.renderData = this._wrangle(data);
        this._render(this.renderData);
    }
    // UPDATE OPTIONS ============================================================
    /**
     * Updates instance options
     * @param {Object} options only the options that should be updated
     * @param {Boolean} reRender if option change requires a re-rendering (default:false)
     * @returns {*} ---
     */
    updateOptions({ options, reRender = false }) {
        Object.keys(options).forEach(k => this.options[k] = options[k]);
        if (reRender)
            this._render(this.renderData);
    }
    // === CONVENIENCE ====
    setHideElement(hE) {
        this._visibility.hideElement = hE;
    }
    hideView() {
        if (!this._visibility.hidden) {
            const hE = this._visibility.hideElement || this.parent;
            hE.transition().styles({
                'opacity': 0,
                'pointer-events': 'none'
            }).style('display', 'none');
            this._visibility.hidden = true;
        }
    }
    unhideView() {
        if (this._visibility.hidden) {
            const hE = this._visibility.hideElement || this.parent;
            hE.transition().styles({
                'opacity': 1,
                'pointer-events': null,
                'display': null
            });
            this._visibility.hidden = false;
            // this.update(this.data);
        }
    }
    destroy() {
        this.base.remove();
    }
}
// STATIC FIELDS ============================================================
/**
 * The static property that contains all class related events.
 * Should be overwritten and event strings have to be unique!!
 */
VComponent.events = { noEvent: 'VComponent_noEvent' };


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHQyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY3NzL3B0Mi5zY3NzIiwid2VicGFjazovLy8uL3RzL2FwaS9HYW50ZXJBUEkudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvZXRjL0dsb2JhbFZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvZXRjL1NWR3BsdXMudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvZXRjL1NpbXBsZUV2ZW50SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi90cy9ldGMvVVJMSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi90cy9ldGMvVXRpbC50cyIsIndlYnBhY2s6Ly8vLi90cy9wdDIudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdmlzL0V4YW1wbGVWaWV3LnRzIiwid2VicGFjazovLy8uL3RzL3Zpcy9QYWludFNlbGVjdFZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdmlzL1Zpc0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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QWdCLEVBQUUsSUFBSTtnQkFDdEIsU0FBUyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLDBCQUEwQjtTQUU3QjtJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QixDQUFDOztBQXZORCw2RUFBNkU7QUFFN0U7OztHQUdHO0FBRUksaUJBQU0sR0FBTyxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxDQUFDIiwiZmlsZSI6InB0Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicHQyXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi90cy9wdDIudHNcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInB0Mi5odG1sXCI7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLypcbkdhbnRlciBBUEkgYW5kIFR5cGVzXG4gKi9cblxuaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzXCI7XG5cbmV4cG9ydCB0eXBlIEFibGF0aW9uRGF0YSA9IHtcbiAgICBjaGFubmVsczogeyBkOiBzdHJpbmcsIGlkOiBudW1iZXIgfVtdLFxuICAgIGFibGF0aW9uOiBudW1iZXJbXSB8IG51bGwsXG4gICAgLy8gejogbnVtYmVyW10gfCBudWxsXG59XG5cbmV4cG9ydCB0eXBlIEFibGF0aW9uVXBsb2FkID0ge1xuICAgIGFscGhhOiBudW1iZXIsIGxheWVyOiBzdHJpbmcsIHVuaXQ6IG51bWJlciwgdmFsdWU/OiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgUmVjaXBlID0ge1xuICAgIGxheWVyOiBzdHJpbmcsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHVuaXQ6IHsgYWxwaGE6IG51bWJlciwgdW5pdDogbnVtYmVyIH1bXVxufVxuXG5leHBvcnQgdHlwZSBSYW5raW5nID0ge1xuICAgIG1ldHJpYzogc3RyaW5nLFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBzY29yZXM6IG51bWJlcltdXG59XG5cblxuZXhwb3J0IHR5cGUgQVBJX1Byb2plY3QgPSB7XG4gICAgcHJvamVjdDogc3RyaW5nXG4gICAgaW5mbzoge1xuICAgICAgICBsYXllcnM6IHN0cmluZ1tdXG4gICAgfVxuXG59XG5cbmV4cG9ydCB0eXBlIEFQSV9BbGxQcm9qZWN0ID0gQVBJX1Byb2plY3RbXVxuZXhwb3J0IHR5cGUgQVBJX0NoYW5uZWxzID0ge1xuICAgIHJlcXVlc3Q6IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICAgcmVzOiBBYmxhdGlvbkRhdGFcbn1cblxuZXhwb3J0IHR5cGUgQVBJX1JlY2lwZXMgPSB7XG4gICAgcmVxdWVzdDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSxcbiAgICByZXM6IFJlY2lwZVtdXG59XG5cbmV4cG9ydCB0eXBlIEFQSV9SYW5raW5ncyA9IHtcbiAgICByZXF1ZXN0OiB7IHByb2plY3Q6IHN0cmluZywgbGF5ZXI6IHN0cmluZyB9LFxuICAgIHJlczogUmFua2luZ1tdXG59XG5cblxuZXhwb3J0IHR5cGUgR0FOVW5pdCA9IHtcbiAgICB1bml0OiBudW1iZXIsIGltZzogc3RyaW5nLCBsYWJlbDogc3RyaW5nXG59XG5leHBvcnQgdHlwZSBBUElfdW5pdHMgPSB7XG4gICAgcmVxdWVzdDogeyBwcm9qZWN0OiBzdHJpbmcsIGxheWVyOiBzdHJpbmcgfSxcbiAgICByZXM6IEdBTlVuaXRbXVxufVxuXG5cbmV4cG9ydCB0eXBlIEFQSV9nZW5lcmF0ZSA9IHtcbiAgICByZXF1ZXN0OiB7XG4gICAgICAgIFwiYWJsYXRpb25zXCI6XG4gICAgICAgICAgICBBYmxhdGlvblVwbG9hZFtdIHwgbnVsbCxcbiAgICAgICAgXCJpZHNcIjogbnVtYmVyW10sXG4gICAgICAgIFwicHJvamVjdFwiOiBzdHJpbmcsXG4gICAgICAgIFwid2FudHpcIjogYm9vbGVhblxuICAgIH0sXG4gICAgcmVzOiB7IGQ6IHN0cmluZywgaWQ/OiBudW1iZXIgfVtdXG59XG5cbmV4cG9ydCB0eXBlIEltYWdlTWFzayA9IHtcbiAgICBpZDogc3RyaW5nLFxuICAgIG1hc2s6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBBUElfRmVhdHVyZU1hc2sgPSB7XG4gICAgYml0Ym91bmRzOiBudW1iZXJbXSxcbiAgICBiaXRzdHJpbmc6IHN0cmluZyB8IG51bGwsXG4gICAgc2hhcGU6IG51bWJlcltdXG59XG5cbmV4cG9ydCB0eXBlIEFQSV9nZW5GZWF0dXJlcyA9IHtcbiAgICByZXF1ZXN0OiB7XG4gICAgICAgIGFibGF0aW9uczpcbiAgICAgICAgICAgIEFibGF0aW9uVXBsb2FkW10gfCBudWxsLFxuICAgICAgICBpZHM6IG51bWJlcltdLFxuICAgICAgICBtYXNrczogc3RyaW5nW10sXG4gICAgICAgIHByb2plY3Q6IHN0cmluZyxcblxuICAgIH0sXG4gICAgcmVzOiB7IGQ6IHN0cmluZywgaWQ/OiBudW1iZXIgfVtdXG59XG5cblxudHlwZSBBUElfTGV2ZWxzID17XG4gICAgcmVxdWVzdDp7XG4gICAgICAgIGxheWVyOnN0cmluZyxcbiAgICAgICAgcHJvamVjdDpzdHJpbmcsXG4gICAgICAgIHF1YW50aWxlczpudW1iZXJbXVxuICAgIH0sXG4gICAgcmVzOm51bWJlcltdW11cbn1cblxuZXhwb3J0IGNsYXNzIEdhbnRlckFQSSB7XG5cbiAgICBzdGF0aWMgYWxsUHJvamVjdHMoKTogUHJvbWlzZTxBUElfQWxsUHJvamVjdD4ge1xuICAgICAgICByZXR1cm4gZDMuanNvbignL2FwaS9hbGxfcHJvamVjdHMnKVxuICAgIH1cblxuICAgIHN0YXRpYyBhYmxhdGlvbkNoYW5uZWxzKHByb2plY3Q6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllciA9IFwibGF5ZXIyXCIpOiBQcm9taXNlPEFQSV9DaGFubmVscz4ge1xuICAgICAgICByZXR1cm4gZDMuanNvbihgL2FwaS9jaGFubmVscz9wcm9qZWN0PSR7cHJvamVjdH0mbGF5ZXI9JHtsYXllcn1gKVxuICAgIH1cblxuICAgIHN0YXRpYyByZWNpcGVzKHByb2plY3Q6IHN0cmluZyk6IFByb21pc2U8QVBJX1JlY2lwZXM+IHtcbiAgICAgICAgcmV0dXJuIGQzLmpzb24oYC9hcGkvcmVjaXBlcz9wcm9qZWN0PSR7cHJvamVjdH1gKVxuICAgIH1cblxuICAgIHN0YXRpYyByYW5raW5ncyhwcm9qZWN0OiBzdHJpbmcsIGxheWVyOiBzdHJpbmcpOiBQcm9taXNlPEFQSV9SYW5raW5ncz4ge1xuICAgICAgICByZXR1cm4gZDMuanNvbihgL2FwaS9yYW5raW5ncz9wcm9qZWN0PSR7cHJvamVjdH0mbGF5ZXI9JHtsYXllcn1gKVxuICAgIH1cblxuXG4gICAgc3RhdGljIGxldmVscyhwcm9qZWN0OiBzdHJpbmcsIGxheWVyOiBzdHJpbmcsIHE6bnVtYmVyPTAuOTkpOiBQcm9taXNlPEFQSV9MZXZlbHM+IHtcbiAgICAgICAgLy8uLi9hcGkvbGV2ZWxzP3Byb2plY3Q9Y2h1cmNob3V0ZG9vciZsYXllcj1sYXllcjQmcXVhbnRpbGVzPTAuOTlcbiAgICAgICAgcmV0dXJuIGQzLmpzb24oYC9hcGkvbGV2ZWxzP3Byb2plY3Q9JHtwcm9qZWN0fSZsYXllcj0ke2xheWVyfSZxdWFudGlsZXM9JHtxfWApXG5cbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZW5lcmF0ZUltZ3MocHJvamVjdDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBudW1iZXJbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbnR6ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFibGF0aW9uczogQWJsYXRpb25VcGxvYWRbXSA9IFtdKTogUHJvbWlzZTxBUElfZ2VuZXJhdGU+IHtcbiAgICAgICAgcmV0dXJuIGQzLmpzb24oJy9hcGkvZ2VuZXJhdGUnLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIFwiYWJsYXRpb25zXCI6IGFibGF0aW9ucyxcbiAgICAgICAgICAgICAgICBcInByb2plY3RcIjogcHJvamVjdCxcbiAgICAgICAgICAgICAgICBcImlkc1wiOiBpZHMsXG4gICAgICAgICAgICAgICAgXCJ3YW50elwiOiB3YW50elxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdlbmVyYXRlSW1nc0ludGVydmVudGlvbihwcm9qZWN0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHM6IG51bWJlcltdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FudHogPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJsYXRpb25fcm06IEFibGF0aW9uVXBsb2FkW10gPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFibGF0aW9uX2NwOiBBYmxhdGlvblVwbG9hZFtdID0gW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrX2NwOiBBUElfRmVhdHVyZU1hc2tcbiAgICApOiBQcm9taXNlPEFQSV9nZW5lcmF0ZT4ge1xuXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICAvLyBcImFibGF0aW9uc1wiOiBhYmxhdGlvbnMsXG4gICAgICAgICAgICBcInByb2plY3RcIjogcHJvamVjdCxcbiAgICAgICAgICAgIFwiaWRzXCI6IGlkcyxcbiAgICAgICAgICAgIFwid2FudHpcIjogd2FudHosXG4gICAgICAgICAgICBcImludGVydmVudGlvbnNcIjogW1xuICAgICAgICAgICAgICAgIHthYmxhdGlvbnM6IGFibGF0aW9uX3JtfSxcbiAgICAgICAgICAgICAgICB7YWJsYXRpb25zOiBhYmxhdGlvbl9jcCwgbWFzazogbWFza19jcH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHBheWxvYWQsIFwiLS0tIHBheWxvYWRcIik7XG5cbiAgICAgICAgcmV0dXJuIGQzLmpzb24oJy9hcGkvZ2VuZXJhdGUnLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHVuaXRzKHByb2plY3Q6IHN0cmluZywgbGF5ZXI6IHN0cmluZyk6IFByb21pc2U8QVBJX3VuaXRzPiB7XG4gICAgICAgIHJldHVybiBkMy5qc29uKGAvYXBpL3VuaXRzP3Byb2plY3Q9JHtwcm9qZWN0fSZsYXllcj0ke2xheWVyfWApXG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZ2VuZXJhdGVGZWF0dXJlcyhwcm9qZWN0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hc2tzOiBJbWFnZU1hc2tbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllcnM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFibGF0aW9uczogQWJsYXRpb25VcGxvYWRbXSA9IFtdKTogUHJvbWlzZTxBUElfZ2VuRmVhdHVyZXM+IHtcbiAgICAgICAgLypcbiAgICAgICAgcHJvamVjdCA9IGZlYXRfcmVxWydwcm9qZWN0J11cbiAgICAgICAgaWRzID0gZmVhdF9yZXFbJ2lkcyddXG4gICAgICAgIG1hc2tzID0gZmVhdF9yZXEuZ2V0KCdtYXNrcycsIE5vbmUpXG4gICAgICAgIGxheWVycyA9IGZlYXRfcmVxLmdldCgnbGF5ZXJzJywgTm9uZSlcbiAgICAgICAgYWJsYXRpb25zID0gZmVhdF9yZXEuZ2V0KCdhYmxhdGlvbnMnLCBbXSlcbiAgICAgICAgKi9cblxuXG4gICAgICAgIGNvbnN0IGlkcyA9IGltYXNrcy5tYXAoZCA9PiBkLmlkKTtcbiAgICAgICAgY29uc3QgbWFza3MgPSBpbWFza3MubWFwKGQgPT4gKHtcbiAgICAgICAgICAgIHNoYXBlOiBbXSxcbiAgICAgICAgICAgIGJpdGJvdW5kczogW10sXG4gICAgICAgICAgICBiaXRzdHJpbmc6IGQubWFza1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgcmV0dXJuIGQzLmpzb24oJy9hcGkvZmVhdHVyZXMnLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGFibGF0aW9ucyxcbiAgICAgICAgICAgICAgICBwcm9qZWN0LFxuICAgICAgICAgICAgICAgIGlkcyxcbiAgICAgICAgICAgICAgICBtYXNrcyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZW5lcmF0ZUZlYXR1cmVzTG9jYWwocHJvamVjdDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBudW1iZXJbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyczogc3RyaW5nW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrczogQVBJX0ZlYXR1cmVNYXNrW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYmxhdGlvbnM6IEFibGF0aW9uVXBsb2FkW10gPSBbXSk6IFByb21pc2U8QVBJX2dlbkZlYXR1cmVzPiB7XG4gICAgICAgIC8qXG4gICAgICAgIHByb2plY3QgPSBmZWF0X3JlcVsncHJvamVjdCddXG4gICAgICAgIGlkcyA9IGZlYXRfcmVxWydpZHMnXVxuICAgICAgICBtYXNrcyA9IGZlYXRfcmVxLmdldCgnbWFza3MnLCBOb25lKVxuICAgICAgICBsYXllcnMgPSBmZWF0X3JlcS5nZXQoJ2xheWVycycsIE5vbmUpXG4gICAgICAgIGFibGF0aW9ucyA9IGZlYXRfcmVxLmdldCgnYWJsYXRpb25zJywgW10pXG4gICAgICAgICovXG5cblxuICAgICAgICAvLyBjb25zdCBpZHMgPSBpbWFza3MubWFwKGQgPT4gZC5pZCk7XG4gICAgICAgIC8vIGNvbnN0IG1hc2tzID0gaW1hc2tzLm1hcChkID0+ICh7XG4gICAgICAgIC8vICAgICBzaGFwZTogW10sXG4gICAgICAgIC8vICAgICBiaXRib3VuZHM6IFtdLFxuICAgICAgICAvLyAgICAgYml0c3RyaW5nOiBkLm1hc2tcbiAgICAgICAgLy8gfSkpO1xuXG4gICAgICAgIG1hc2tzLmZvckVhY2gobWFzayA9PiB7XG4gICAgICAgICAgICBpZiAobWFzay5iaXRzdHJpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJiID0gbWFzay5iaXRib3VuZHM7XG4gICAgICAgICAgICAgICAgY29uc3QgYml0cyA9IChiYlsyXSAtIGJiWzBdKSAqIChiYlszXSAtIGJiWzFdKTtcbiAgICAgICAgICAgICAgICBtYXNrLmJpdHN0cmluZyA9ICcxJy5yZXBlYXQoYml0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgcmV0dXJuIGQzLmpzb24oJy9hcGkvZmVhdHVyZXMnLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGFibGF0aW9ucyxcbiAgICAgICAgICAgICAgICBwcm9qZWN0LFxuICAgICAgICAgICAgICAgIGlkcyxcbiAgICAgICAgICAgICAgICBtYXNrcyxcbiAgICAgICAgICAgICAgICBsYXllcnNcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbn1cblxuIiwiZXhwb3J0IGNvbnN0IEdsb2JhbEV2ZW50cyA9IHtcbiAgICB3aW5kb3dfcmVzaXplOiAnR2xvYmFsRXZlbnRzX3dyJyxcbiAgICBtYWluX3Jlc2l6ZTogJ0dsb2JhbEV2ZW50c19tcidcbn0iLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiZDNcIlxuXG4vKipcbiAqIENyZWF0ZWQgYnkgaGVuIG9uIDUvMTUvMTcuXG4gKi9cbmV4cG9ydCBjbGFzcyBTVkcge1xuICAgIHN0YXRpYyB0cmFuc2xhdGUoe3gsIHl9KSB7XG4gICAgICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIHggKyBcIixcIiArIHkgKyBcIilcIlxuICAgIH1cblxuICAgIHN0YXRpYyBncm91cChwYXJlbnQsIGNsYXNzZXMsIHBvcyA9IHt4OiAwLCB5OiAwfSkge1xuICAgICAgICByZXR1cm4gcGFyZW50LmFwcGVuZCgnZycpLmF0dHJzKHtcbiAgICAgICAgICAgIGNsYXNzOiBjbGFzc2VzLFxuICAgICAgICAgICAgXCJ0cmFuc2Zvcm1cIjogU1ZHLnRyYW5zbGF0ZShwb3MpXG4gICAgICAgIH0pXG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBTVkdNZWFzdXJlbWVudHMge1xuXG4gICAgcHJpdmF0ZSBtZWFzdXJlRWxlbWVudDogZDMuU2VsZWN0aW9uPGFueSwgYW55LCBhbnksIGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcihiYXNlRWxlbWVudCwgY2xhc3NlcyA9ICcnKSB7XG4gICAgICAgIHRoaXMubWVhc3VyZUVsZW1lbnQgPSBiYXNlRWxlbWVudC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHJzKHt4OiAwLCB5OiAtMjAsIGNsYXNzOiBjbGFzc2VzfSlcblxuICAgIH1cblxuICAgIHRleHRMZW5ndGgodGV4dCwgc3R5bGUgPSBudWxsKSB7XG4gICAgICAgIHRoaXMubWVhc3VyZUVsZW1lbnQuYXR0cignc3R5bGUnLCBzdHlsZSk7XG4gICAgICAgIHRoaXMubWVhc3VyZUVsZW1lbnQudGV4dCh0ZXh0KTtcbiAgICAgICAgY29uc3QgdGwgPSAoPFNWR1RleHRFbGVtZW50PiB0aGlzLm1lYXN1cmVFbGVtZW50Lm5vZGUoKSkuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCk7XG4gICAgICAgIHRoaXMubWVhc3VyZUVsZW1lbnQudGV4dCgnJyk7XG5cbiAgICAgICAgcmV0dXJuIHRsO1xuICAgIH1cbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgaGVuIG9uIDUvMTUvMTcuXG4gKi9cbmV4cG9ydCBjbGFzcyBTaW1wbGVFdmVudEhhbmRsZXIge1xuXG4gICAgZWxlbWVudDogRWxlbWVudDtcbiAgICBldmVudExpc3RlbmVyczogb2JqZWN0W107XG5cblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycyA9IFtdXG4gICAgfVxuXG5cbiAgICBiaW5kKGV2ZW50TmFtZXM6IHN0cmluZywgZXZlbnRGdW5jdGlvbjogRnVuY3Rpb24pIHtcbiAgICAgICAgZm9yIChjb25zdCBldmVudE5hbWUgb2YgZXZlbnROYW1lcy5zcGxpdCgnICcpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzLnB1c2goe2V2ZW50TmFtZSwgZXZlbnRGdW5jdGlvbn0pO1xuICAgICAgICAgICAgY29uc3QgZXZlbnRGdW5jdGlvbldyYXAgPSBlID0+IGV2ZW50RnVuY3Rpb24oZS5kZXRhaWwsIGUpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEZ1bmN0aW9uV3JhcCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TGlzdGVuZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudExpc3RlbmVycztcbiAgICB9XG5cbiAgICB0cmlnZ2VyKGV2ZW50TmFtZTogc3RyaW5nLCBkZXRhaWw6IG9iamVjdCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7ZGV0YWlsfSkpO1xuICAgIH1cblxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBoZW4gb24gNS8xNS8xNy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVUkxIYW5kbGVyIHtcblxuICAgIHN0YXRpYyBiYXNpY1VSTCgpIHtcbiAgICAgICAgY29uc3QgdXJsX3BhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKS5zbGljZSgwLCAtMikuam9pbignLycpO1xuXG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgKHVybF9wYXRoLmxlbmd0aCA/IHVybF9wYXRoIDogJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWQgYWxsIFVSTCBwYXJhbWV0ZXJzIGludG8gYSBtYXAuXG4gICAgICogQHJldHVybnMge01hcH0gdGhlIHVybCBwYXJhbWV0ZXJzIGFzIGEga2V5LXZhbHVlIHN0b3JlIChFUzYgbWFwKVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgcGFyYW1ldGVycygpOiBvYmplY3Qge1xuICAgICAgICAvLyBBZGFwdGVkIGZyb206ICBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIwOTA1NTEvcGFyc2UtcXVlcnktc3RyaW5nLWluLWphdmFzY3JpcHRcbiAgICAgICAgY29uc3QgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcbiAgICAgICAgY29uc3QgdmFycyA9IHF1ZXJ5LnNwbGl0KCcmJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHZhcnMsIFwiLS0tIHZhcnNcIik7XG5cbiAgICAgICAgY29uc3QgdXJsUGFyYW1ldGVycyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGlzSW50ID0geCA9PiAoL15bMC05XSskLykudGVzdCh4KTtcbiAgICAgICAgY29uc3QgaXNGbG9hdCA9IHggPT4gKC9eWzAtOV0rXFwuWzAtOV0qJC8pLnRlc3QoeCk7XG5cbiAgICAgICAgY29uc3QgdHlwZUNhc3QgPSB2YWwgPT4ge1xuICAgICAgICAgICAgaWYgKGlzSW50KHZhbCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHZhbCwgMTApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0Zsb2F0KHZhbCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyLnBhcnNlRmxvYXQodmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGVsc2U6XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG5cblxuICAgICAgICB2YXJzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICBpZiAodi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BsaXRzID0gdi5zcGxpdCgnPScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChzcGxpdHNbMF0pO1xuICAgICAgICAgICAgICAgIGxldCByYXdfdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQoc3BsaXRzWzFdKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGlzQXJyYXkgPSByYXdfdmFsdWUuc3RhcnRzV2l0aCgnLi4nKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICByYXdfdmFsdWUgPSByYXdfdmFsdWUuc2xpY2UoMik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJhd192YWx1ZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybFBhcmFtZXRlcnNba2V5XSA9IGlzQXJyYXkgPyBbXSA6ICcnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICB1cmxQYXJhbWV0ZXJzW2tleV0gPSByYXdfdmFsdWUuc3BsaXQoJywnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCh2YWwgPT4gdHlwZUNhc3QodmFsKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsUGFyYW1ldGVyc1trZXldID0gdHlwZUNhc3QocmF3X3ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB1cmxQYXJhbWV0ZXJzO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYW4gVVJMIHN0cmluZyBmcm9tIGEgbWFwIG9mIHVybCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIHt7fX0gdXJsUGFyYW1ldGVycyAtIHRoZSBtYXAgb2YgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gYW4gVVJJIHN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyB1cmxTdHJpbmcodXJsUGFyYW1ldGVyczogb2JqZWN0KSB7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBbXTtcbiAgICAgICAgT2JqZWN0LmtleXModXJsUGFyYW1ldGVycykuZm9yRWFjaChrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSB1cmxQYXJhbWV0ZXJzW2tdO1xuICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHY7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodikpIHZhbHVlID0gJy4uJyArIHYuam9pbignLCcpO1xuICAgICAgICAgICAgICAgIGF0dHIucHVzaChlbmNvZGVVUkkoayArICc9JyArIHZhbHVlKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIGxldCByZXMgPSB1cmwuc3Vic3RyaW5nKHVybC5sYXN0SW5kZXhPZignLycpICsgMSk7XG4gICAgICAgIGlmIChhdHRyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlcyArPSAnPycgKyBhdHRyLmpvaW4oJyYnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBkYXRlVVJMUGFyYW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBhbnlbXSwgYWRkVG9Ccm93c2VySGlzdG9yeSA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFBhcmFtcyA9IFVSTEhhbmRsZXIucGFyYW1ldGVycztcbiAgICAgICAgY3VycmVudFBhcmFtc1trZXldID0gdmFsdWU7XG4gICAgICAgIFVSTEhhbmRsZXIudXBkYXRlVXJsKGN1cnJlbnRQYXJhbXMsIGFkZFRvQnJvd3Nlckhpc3RvcnkpO1xuICAgIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIEdlbmVyYXRlcyBhIGtleS12YWx1ZSBtYXAgb2YgYWxsIFVSTCBwYXJhbXMgYW5kIHJlcGxhY2VzIHJlcGxhY2VLZXlzXG4gICAgLy8gICogQHBhcmFtIHVwZGF0ZUtleXNcbiAgICAvLyAgKi9cbiAgICAvLyBzdGF0aWMgdXBkYXRlVVJMUGFyYW1zKHVwZGF0ZUtleXMpIHtcbiAgICAvLyAgICAgY29uc3QgY3VycmVudFBhcmFtcyA9IFVSTEhhbmRsZXIucGFyYW1ldGVycztcbiAgICAvLyAgICAgT2JqZWN0LmtleXModXBkYXRlS2V5cykuZm9yRWFjaCgoaykgPT4gY3VycmVudFBhcmFtc1trXSA9IHVwZGF0ZUtleXNba10pXG4gICAgLy8gICAgIHJldHVybiBjdXJyZW50UGFyYW1zO1xuICAgIC8vIH1cblxuXG4gICAgc3RhdGljIHVwZGF0ZVVybCh1cmxQYXJhbWV0ZXJzOiBvYmplY3QsIGFkZFRvQnJvd3Nlckhpc3RvcnkgPSB0cnVlKSB7XG4gICAgICAgIGlmIChhZGRUb0Jyb3dzZXJIaXN0b3J5KSB7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUodXJsUGFyYW1ldGVycywgJycsXG4gICAgICAgICAgICAgICAgVVJMSGFuZGxlci51cmxTdHJpbmcodXJsUGFyYW1ldGVycykpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUodXJsUGFyYW1ldGVycywgJycsXG4gICAgICAgICAgICAgICAgVVJMSGFuZGxlci51cmxTdHJpbmcodXJsUGFyYW1ldGVycykpXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiZDNcIjtcblxuLyoqXG4gKiBDcmVhdGVkIGJ5IGhlbiBvbiA1LzE1LzE3LlxuICovXG5sZXQgdGhlX3VuaXF1ZV9pZF9jb3VudGVyID0gMDtcblxuZXhwb3J0IGNsYXNzIFV0aWwge1xuICAgIHN0YXRpYyBzaW1wbGVVSWQoe3ByZWZpeCA9ICcnfSk6IHN0cmluZyB7XG4gICAgICAgIHRoZV91bmlxdWVfaWRfY291bnRlciArPSAxO1xuXG4gICAgICAgIHJldHVybiBwcmVmaXggKyB0aGVfdW5pcXVlX2lkX2NvdW50ZXI7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEM1NlbCA9IGQzLlNlbGVjdGlvbjxhbnksIGFueSwgYW55LCBhbnk+XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmdzb3J0KGFycmF5LCBzb3J0RmN0KTpudW1iZXJbXSB7XG4gICAgcmV0dXJuIGFycmF5XG4gICAgICAgIC5tYXAoKGQsIGkpID0+IFtkLCBpXSlcbiAgICAgICAgLnNvcnQoKGEsYikgPT4gc29ydEZjdChhWzBdLCBiWzBdKSlcbiAgICAgICAgLm1hcChkID0+IGRbMV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2UoZW5kKXtcbiAgICByZXR1cm4gWy4uLkFycmF5KGVuZCkua2V5cygpXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JqX3RvX2FycihvYmo6b2JqZWN0KXtcbiAgICBjb25zdCBzb3J0ZWRLZXlzID0gT2JqZWN0LmtleXMob2JqKS5zb3J0KCk7XG4gICAgY29uc3QgcmVzPVtdO1xuICAgIHNvcnRlZEtleXMuZm9yRWFjaChrID0+IHtyZXMucHVzaChrKTsgcmVzLnB1c2gob2JqW2tdKX0pXG4gICAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycl90b19vYmooYXJyOmFueSl7XG4gICAgY29uc3QgcmVzPXt9O1xuICAgIGNvbnN0IG1heF9sID0gTWF0aC5mbG9vcihhcnIubGVuZ3RoLzIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpPG1heF9sOyBpKyspe1xuICAgICAgICByZXNbYXJyWzIqaV1dID0gYXJyWzIqaSsxXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnXG5pbXBvcnQgXCJkMy1zZWxlY3Rpb24tbXVsdGlcIjtcblxuaW1wb3J0ICcuLi9jc3MvcHQyLnNjc3MnXG5cblxuaW1wb3J0IFwiIWZpbGUtbG9hZGVyP25hbWU9cHQyLmh0bWwhLi4vcHQyLmh0bWxcIjtcbmltcG9ydCB7U2ltcGxlRXZlbnRIYW5kbGVyfSBmcm9tIFwiLi9ldGMvU2ltcGxlRXZlbnRIYW5kbGVyXCI7XG5pbXBvcnQge0dsb2JhbEV2ZW50c30gZnJvbSBcIi4vZXRjL0dsb2JhbFZhcnNcIjtcbmltcG9ydCBVUkxIYW5kbGVyIGZyb20gXCIuL2V0Yy9VUkxIYW5kbGVyXCI7XG5pbXBvcnQge0V4YW1wbGVWaWV3LCBFeGFtcGxlVmlld01vdXNlRXZlbnR9IGZyb20gXCIuL3Zpcy9FeGFtcGxlVmlld1wiO1xuXG5cbmltcG9ydCAqIGFzIFBTIGZyb20gXCJwYWludF9zZWxlY3RcIjtcbmltcG9ydCB7R2FudGVyQVBJLCBJbWFnZU1hc2t9IGZyb20gXCIuL2FwaS9HYW50ZXJBUElcIjtcbmltcG9ydCB7UGFpbnRTZWxlY3RWaWV3fSBmcm9tIFwiLi92aXMvUGFpbnRTZWxlY3RWaWV3XCI7XG5pbXBvcnQge2FyZ3NvcnR9IGZyb20gXCIuL2V0Yy9VdGlsXCI7XG5cblxubGV0IGV4YW1wbGVJRHMgPSBkMy5yYW5nZSgwLCA2MCk7XG5cblxuY29uc3QgZ2xvYmFsID0ge1xuICAgIHNpZGViYXI6ICgpID0+ICg8RWxlbWVudD5kMy5zZWxlY3QoJy5zaWRlbmF2Jykubm9kZSgpKVxuICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbn07XG5cbmNvbnN0IGN1cnJlbnQgPSB7XG4gICAgcHJvamVjdDogXCJcIixcbiAgICBpbmRleFNvcnQ6IGQzLnJhbmdlKDEwMCksXG4gICAgbGF5ZXI6ICgpID0+ICg8SFRNTFNlbGVjdEVsZW1lbnQ+ZDMuc2VsZWN0KFwiI2xheWVyX3NlbGVjdG9yXCIpLm5vZGUoKSkudmFsdWUsXG4gICAgc2luZ2xlX25ncmFtOigpPT4gKyg8SFRNTElucHV0RWxlbWVudD4gZDMuc2VsZWN0KFwiI3VuaXRTaW5nbGVBYk5ncmFtXCIpLm5vZGUoKSkudmFsdWVcbn1cblxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICAgIGNvbnN0IGV2ZW50SGFuZGxlciA9IG5ldyBTaW1wbGVFdmVudEhhbmRsZXIoPEVsZW1lbnQ+ZDMuc2VsZWN0KCdib2R5Jykubm9kZSgpKTtcblxuICAgIGNvbnN0IHByb2plY3Rfc2VsZWN0b3IgPSBkMy5zZWxlY3QoJyNwcm9qZWN0X3NlbGVjdG9yJyk7XG4gICAgY29uc3QgbWFpbl92aWV3X3NlbCA9IGQzLnNlbGVjdCgnLmZsb2F0aW5nX2NvbnRlbnQnKTtcbiAgICBjb25zdCBleGFtcGxlVmlldyA9IG5ldyBFeGFtcGxlVmlldyhtYWluX3ZpZXdfc2VsLnNlbGVjdCgnLmFibGF0aW9uX2V4YW1wbGVzJyksIGV2ZW50SGFuZGxlcilcbiAgICBleGFtcGxlVmlldy5pbWdXaWR0aCA9IDUwO1xuXG5cbiAgICBjb25zdCBwc3YgPSBuZXcgUGFpbnRTZWxlY3RWaWV3KGQzLnNlbGVjdCgnI3BhaW50X2ltYWdlJyksIGV2ZW50SGFuZGxlcik7XG4gICAgZDMuc2VsZWN0KFwiI3Jlc2V0X21hc2tfYnRuXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4gcHN2LnJlc2V0KCkpXG4gICAgY29uc3QgY29tcGFyZV9pbWcgPSBkMy5zZWxlY3QoJyNjb21wYXJlX2ltZycpO1xuXG5cbiAgICBjb25zdCBtaW5FeElucHV0ID0gZDMuc2VsZWN0KCcjbWluRXgnKTtcbiAgICBjb25zdCBub0V4SW5wdXQgPSBkMy5zZWxlY3QoJyNub0V4Jyk7XG4gICAgY29uc3QgYWJOb0lucHV0ID0gZDMuc2VsZWN0KFwiI25vQWJcIik7XG5cblxuICAgIGNvbnN0IHN0YXJ0X3BhcmFtcyA9IFVSTEhhbmRsZXIucGFyYW1ldGVycztcblxuICAgIEdhbnRlckFQSS5hbGxQcm9qZWN0cygpXG4gICAgICAgIC50aGVuKChwcm9qZWN0cykgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0X3NlbGVjdGVkID0gc3RhcnRfcGFyYW1zWydwcm9qZWN0J107XG5cbiAgICAgICAgICAgIGxldCBvcHRpb25zID0gcHJvamVjdF9zZWxlY3RvclxuICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ29wdGlvbicpLmRhdGEocHJvamVjdHMpO1xuICAgICAgICAgICAgb3B0aW9ucy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICBvcHRpb25zLmVudGVyKCkuYXBwZW5kKCdvcHRpb24nKVxuICAgICAgICAgICAgICAgIC5tZXJnZShvcHRpb25zKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd2YWx1ZScsIGQgPT4gZC5wcm9qZWN0KS50ZXh0KGQgPT4gZC5wcm9qZWN0KVxuICAgICAgICAgICAgICAgIC5wcm9wZXJ0eSgnc2VsZWN0ZWQnLCBkID0+IGQucHJvamVjdCA9PT0gcHJvamVjdF9zZWxlY3RlZCk7XG5cbiAgICAgICAgICAgIHByb2plY3RDaGFuZ2UocHJvamVjdF9zZWxlY3Rvci5wcm9wZXJ0eSgndmFsdWUnKSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICBwcm9qZWN0X3NlbGVjdG9yLm9uKCdjaGFuZ2UnLCBkID0+IHtcbiAgICAgICAgcHJvamVjdENoYW5nZShwcm9qZWN0X3NlbGVjdG9yLnByb3BlcnR5KCd2YWx1ZScpKTtcbiAgICB9KTtcblxuXG4gICAgZnVuY3Rpb24gcHJvamVjdENoYW5nZShwcm9qZWN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3QsIFwiLS0tIHByb2plY3RcIik7XG4gICAgICAgIGN1cnJlbnQucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIFVSTEhhbmRsZXIudXBkYXRlVVJMUGFyYW0oJ3Byb2plY3QnLCBwcm9qZWN0LCBmYWxzZSk7XG4gICAgICAgIC8vIEdhbnRlckFQSS5hYmxhdGlvbkNoYW5uZWxzKHByb2plY3QpXG4gICAgICAgIC8vICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIC8vICAgICBhYmxhdGlvblZpZXcudXBkYXRlKGRhdGEucmVzKTtcbiAgICAgICAgLy8gICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgIC8vICAgICBiYXJjaGFydFRlc3QudXBkYXRlKHtcbiAgICAgICAgLy8gICAgICAgICAvLyAgICAgICAgIGlkczogW10sIHZhbHVlczogZGF0YS5yZXMuYWJsYXRpb25cbiAgICAgICAgLy8gICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyAgICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgIHJlY2lwZXMgPSB7fTtcbiAgICAgICAgLy8gICAgICAgICAvLyAgICAgZDMuanNvbihgL2FwaS9yZWNpcGVzP3Byb2plY3Q9JHtwcm9qZWN0fWApXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgICAgICAudGhlbigoZGF0YTogQVBJUmVzX1JlY2lwZXMpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnJlcywgXCItLS0gZGF0YS5yZXNcIik7XG4gICAgICAgIC8vICAgICAgICAgLy8gICAgICAgICAgICAgZGF0YS5yZXMuZm9yRWFjaChyZWMgPT4gcmVjaXBlc1tyZWMubmFtZV0gPSByZWMpO1xuICAgICAgICAvLyAgICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgICAgICAgICAgZDMuc2VsZWN0KCcucmVjaXBlcycpLnNlbGVjdEFsbCgnb3B0aW9uJykucmVtb3ZlKCk7XG4gICAgICAgIC8vICAgICAgICAgLy8gICAgICAgICAgICAgZDMuc2VsZWN0KCcucmVjaXBlcycpLnNlbGVjdEFsbCgnb3B0aW9uJylcbiAgICAgICAgLy8gICAgICAgICAvLyAgICAgICAgICAgICAgICAgLmRhdGEoZGF0YS5yZXMpLmVudGVyKCkuYXBwZW5kKCdvcHRpb24nKS5hdHRycyh7XG4gICAgICAgIC8vICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHZhbHVlOiBkID0+IGQubmFtZVxuICAgICAgICAvLyAgICAgICAgIC8vICAgICAgICAgICAgIH0pLnRleHQoZCA9PiBkLm5hbWUpXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgICAgICAgICAgICAgIC5wcm9wZXJ0eSgnc2VsZWN0ZWQnLCBkID0+IGQubmFtZSA9PT0gc3RhcnRfcGFyYW1zWydyZWNpcGUnXSk7XG4gICAgICAgIC8vICAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgIC8vICAgICAgICAgICAgIGQzLnNlbGVjdChcIi5hcHBseV9yZWNfYnRuXCIpXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpXG4gICAgICAgIC8vICAgICAgICAgLy8gICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCBudWxsKVxuICAgICAgICAvLyAgICAgICAgIC8vICAgICAgICAgICAgIDtcbiAgICAgICAgLy8gICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgIC8vICAgICAgICAgICAgIGlmICgncmVjaXBlJyBpbiBzdGFydF9wYXJhbXMpIHtcbiAgICAgICAgLy8gICAgICAgICAvLyAgICAgICAgICAgICAgICAgYXBwbHlSZWNpcGUoKTtcbiAgICAgICAgLy8gICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgIC8vICAgICAgICAgfSlcbiAgICAgICAgLy8gICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgIC8vXG4gICAgICAgIC8vICAgICB9KVxuXG4gICAgICAgIGdlbmVyYXRlU2FtcGxlcygpO1xuICAgIH1cblxuICAgIG1pbkV4SW5wdXQub24oJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICBVUkxIYW5kbGVyLnVwZGF0ZVVSTFBhcmFtKCdtaW5FeCcsICg8SFRNTElucHV0RWxlbWVudD5taW5FeElucHV0Lm5vZGUoKSkudmFsdWUpO1xuICAgICAgICBnZW5lcmF0ZVNhbXBsZXMoKTtcbiAgICB9KVxuXG4gICAgbm9FeElucHV0Lm9uKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgVVJMSGFuZGxlci51cGRhdGVVUkxQYXJhbSgnbm9FeCcsICg8SFRNTElucHV0RWxlbWVudD5ub0V4SW5wdXQubm9kZSgpKS52YWx1ZSk7XG4gICAgICAgIGdlbmVyYXRlU2FtcGxlcygpO1xuICAgIH0pXG5cblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlU2FtcGxlcygpIHtcblxuICAgICAgICBjb25zdCB1cmxfcCA9IFVSTEhhbmRsZXIucGFyYW1ldGVycztcblxuICAgICAgICBsZXQgbWluRXggPSArKDxIVE1MSW5wdXRFbGVtZW50Pm1pbkV4SW5wdXQubm9kZSgpKS52YWx1ZTtcbiAgICAgICAgbGV0IG5vRXggPSArKDxIVE1MSW5wdXRFbGVtZW50Pm5vRXhJbnB1dC5ub2RlKCkpLnZhbHVlO1xuICAgICAgICBpZiAoJ21pbkV4JyBpbiB1cmxfcCkge1xuICAgICAgICAgICAgbWluRXggPSArdXJsX3BbJ21pbkV4J107XG4gICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+bWluRXhJbnB1dC5ub2RlKCkpLnZhbHVlID0gJycgKyBtaW5FeDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJ25vRXgnIGluIHVybF9wKSB7XG4gICAgICAgICAgICBub0V4ID0gK3VybF9wWydub0V4J107XG4gICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+bm9FeElucHV0Lm5vZGUoKSkudmFsdWUgPSAnJyArIG5vRXg7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGV4YW1wbGVJRHMgPSBkMy5yYW5nZShtaW5FeCwgbWluRXggKyBub0V4KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhleGFtcGxlSURzLCBcIi0tLSBleGFtcGxlSURzXCIpO1xuXG4gICAgICAgIEdhbnRlckFQSS5nZW5lcmF0ZUltZ3MoY3VycmVudC5wcm9qZWN0LCBleGFtcGxlSURzKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBleGFtcGxlVmlldy51cGRhdGUoe29yaWc6IGRhdGF9KVxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB9KVxuXG4gICAgfVxuXG5cbiAgICB3aW5kb3cub25yZXNpemUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY29uc3QgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgLy8gY29uc29sZS5sb2codywgaCwgXCItLS0gdyxoXCIpO1xuXG4gICAgICAgIHJlX2xheW91dCh3LCBoKTtcblxuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlX2xheW91dCh3LCBoKSB7XG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLnNpZGVuYXYnKVxuICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCAoaCAtIDQ1KSArICdweCcpXG5cbiAgICAgICAgZDMuc2VsZWN0QWxsKCcubWFpbl9mcmFtZScpXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIChoIC0gNDUpICsgJ3B4JylcbiAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCAodyAtIDMwMCkgKyAncHgnKVxuXG4gICAgICAgIGV2ZW50SGFuZGxlci50cmlnZ2VyKEdsb2JhbEV2ZW50cy53aW5kb3dfcmVzaXplLCB7dywgaH0pXG5cbiAgICAgICAgZXZlbnRIYW5kbGVyLnRyaWdnZXIoR2xvYmFsRXZlbnRzLm1haW5fcmVzaXplLCB7XG4gICAgICAgICAgICB3OiAodyAtIGdsb2JhbC5zaWRlYmFyKCkpLFxuICAgICAgICAgICAgaDogKGggLSA0NSlcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHJlX2xheW91dCh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgIGZ1bmN0aW9uIGRpc3BsYXlEZXRhaWxzKGltZ0xpc3QpIHtcbiAgICAgICAgY29uc3QgZHQgPSBkMy5zZWxlY3QoJy5zaWRlbmF2IC5kZXRhaWxfaW1nJyk7XG4gICAgICAgIGlmIChpbWdMaXN0KSB7XG4gICAgICAgICAgICBkdC5odG1sKGltZ0xpc3RcbiAgICAgICAgICAgICAgICAubWFwKGltZyA9PiBgPGltZyBzcmM9XCIke2ltZ31cIiB3aWR0aD1cIiR7Z2xvYmFsLnNpZGViYXIoKSAtIDEwfVwiPmApXG4gICAgICAgICAgICAgICAgLmpvaW4oJzxicj4nKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGR0Lmh0bWwoYDxzdmcgd2lkdGg9XCIke2dsb2JhbC5zaWRlYmFyKCkgLSAxMH1cIiBoZWlnaHQ9XCIke2dsb2JhbC5zaWRlYmFyKCkgLSAxMH1cIj5gKVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBldmVudEhhbmRsZXIuYmluZChFeGFtcGxlVmlldy5ldmVudHMuaG92ZXJlZF9pbWFnZV9wYWlyLCAoZDogRXhhbXBsZVZpZXdNb3VzZUV2ZW50KSA9PiB7XG5cbiAgICAgICAgaWYgKGQuaG92ZXJlZCkge1xuICAgICAgICAgICAgZGlzcGxheURldGFpbHMoZC5pbWFnZXMubWFwKGltZyA9PiBpbWcuZCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXNwbGF5RGV0YWlscyhudWxsKVxuICAgICAgICB9XG4gICAgfSlcblxuXG4gICAgZXZlbnRIYW5kbGVyLmJpbmQoRXhhbXBsZVZpZXcuZXZlbnRzLmNsaWNrZWRfaW1hZ2VfcGFpciwgKGQ6IEV4YW1wbGVWaWV3TW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkLCBcIi0tLSBkXCIpO1xuXG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgcHN2LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgaW1hZ2U6IGltZyxcbiAgICAgICAgICAgICAgICBpbWFnZUlEOiAnJytkLmltYWdlc1swXS5pZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgaW1nLnNyYyA9IGQuaW1hZ2VzWzBdLmQ7XG5cblxuICAgIH0pXG5cblxuICAgIGFiTm9JbnB1dC5vbignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgIFVSTEhhbmRsZXIudXBkYXRlVVJMUGFyYW0oJ25vQWInLCAoPEhUTUxJbnB1dEVsZW1lbnQ+YWJOb0lucHV0Lm5vZGUoKSkudmFsdWUpO1xuICAgICAgICBnZW5lcmF0ZUNvbXBhcmUoKTtcbiAgICB9KTtcblxuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVDb21wYXJlKCkge1xuICAgICAgICBjb25zdCB1cmxfcCA9IFVSTEhhbmRsZXIucGFyYW1ldGVycztcbiAgICAgICAgaWYgKCdub0FiJyBpbiB1cmxfcCkge1xuICAgICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmFiTm9JbnB1dC5ub2RlKCkpLnZhbHVlID0gdXJsX3BbJ25vQWInXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFVSTEhhbmRsZXIudXBkYXRlVVJMUGFyYW0oJ25vQWInLCAoPEhUTUxJbnB1dEVsZW1lbnQ+YWJOb0lucHV0Lm5vZGUoKSkudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vQWIgPSArKDxIVE1MSW5wdXRFbGVtZW50PmFiTm9JbnB1dC5ub2RlKCkpLnZhbHVlO1xuXG5cbiAgICAgICAgR2FudGVyQVBJLmdlbmVyYXRlSW1ncyhjdXJyZW50LnByb2plY3QsXG4gICAgICAgICAgICBbcHN2LmltYWdlSURdLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIGN1cnJlbnQuaW5kZXhTb3J0LnNsaWNlKDAsIG5vQWIpLm1hcChkID0+ICh7XG4gICAgICAgICAgICAgICAgYWxwaGE6IDEsXG4gICAgICAgICAgICAgICAgbGF5ZXI6IGN1cnJlbnQubGF5ZXIoKSxcbiAgICAgICAgICAgICAgICB1bml0OiBkXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgKS50aGVuKChhYkltYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWJJbWFnZSwgXCItLS0gYWJpbWFnZVwiKTtcbiAgICAgICAgICAgICAgICBjb21wYXJlX2ltZy5odG1sKGA8aW1nIHNyYz1cIiR7YWJJbWFnZS5yZXNbMF0uZH1cIiB3aWR0aD1cIjIwMCVcIi8+YClcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuXG4gICAgZXZlbnRIYW5kbGVyLmJpbmQoUGFpbnRTZWxlY3RWaWV3LmV2ZW50cy5tYXNrQ2hhbmdlZCwgKG1hc2s6IEltYWdlTWFzaykgPT4ge1xuXG5cbiAgICAgICAgR2FudGVyQVBJLmdlbmVyYXRlRmVhdHVyZXMoXG4gICAgICAgICAgICBjdXJyZW50LnByb2plY3QsXG4gICAgICAgICAgICBbbWFza10sXG4gICAgICAgICAgICBbY3VycmVudC5sYXllcigpXVxuICAgICAgICApLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnJlcywgXCItLS0gdmFsdWVzXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXhTb3J0ID0gYXJnc29ydChkYXRhLnJlc1tjdXJyZW50LmxheWVyKCldLm1heCwgKGEsIGIpID0+IGIgLSBhKTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnQuaW5kZXhTb3J0ID0gaW5kZXhTb3J0O1xuXG4gICAgICAgICAgICAgICAgR2FudGVyQVBJLnVuaXRzKGN1cnJlbnQucHJvamVjdCwgY3VycmVudC5sYXllcigpKS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5yZXMsIFwiLS0tIHVuaXRzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5pdHMgPSBkMy5zZWxlY3QoXCIjdW5pdHNcIikuc2VsZWN0QWxsKFwiLnVuaXRzXCIpLmRhdGEoaW5kZXhTb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXRzLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5pdHNFbnRlciA9IHVuaXRzLmVudGVyKCkuYXBwZW5kKCdpbWcnKS5hdHRyKCdjbGFzcycsICd1bml0cycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0c0VudGVyLm1lcmdlKHVuaXRzKS5hdHRycyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBpbV9pbmRleCA9PiBkYXRhLnJlc1tpbV9pbmRleF0uaW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUNvbXBhcmUoKTtcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIClcblxuXG4gICAgfSlcblxuXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdEFsbChpbmRpY2VzLCBjdW1tdWxhdGl2ZSA9IHRydWUsIGV2ZXJ5VW5pdCA9IDEwLCB1bml0U3RlcFNpemUgPSAxMCwgY2FsbGJhY2s6IChpbWc6IHN0cmluZywgaW5kZXg/OiBudW1iZXIpID0+IGFueSA9IG51bGwpIHtcblxuICAgICAgICBjb25zdCByZXMgPSBbXTtcblxuICAgICAgICBsZXQgaW5kaXMgPSBbLi4uZDMucmFuZ2UoMCwgZXZlcnlVbml0KV07XG4gICAgICAgIGlmICh1bml0U3RlcFNpemUgPiAwKSB7XG4gICAgICAgICAgICBpbmRpcyA9IFsuLi5pbmRpcywgLi4uZDMucmFuZ2UoZXZlcnlVbml0LCBpbmRpY2VzLmxlbmd0aCwgdW5pdFN0ZXBTaXplKV07XG4gICAgICAgIH1cblxuXG4gICAgICAgIGZvciAoY29uc3QgaSBvZiBpbmRpcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coaW5kaWNlcy5zbGljZSgwLCBpKSwgXCItLS0gaW5kaWNlcy5zbGljZSgwLCBpKVwiKTtcblxuICAgICAgICAgICAgbGV0IGxheWVycyA9IFtdO1xuICAgICAgICAgICAgaWYgKGN1bW11bGF0aXZlKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXJzID0gaW5kaWNlcy5zbGljZSgwLCBpKS5tYXAoZCA9PiAoe1xuICAgICAgICAgICAgICAgICAgICBhbHBoYTogMSxcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXI6IGN1cnJlbnQubGF5ZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgdW5pdDogZFxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBsYXllcnMgPSBbe1xuICAgICAgICAgICAgICAgIC8vICAgICBhbHBoYTogMSxcbiAgICAgICAgICAgICAgICAvLyAgICAgbGF5ZXI6IGN1cnJlbnQubGF5ZXIoKSxcbiAgICAgICAgICAgICAgICAvLyAgICAgdW5pdDogaW5kaWNlc1tpXVxuICAgICAgICAgICAgICAgIC8vIH1dXG5cbiAgICAgICAgICAgICAgICBsYXllcnMgPSBpbmRpY2VzLm1hcCgoZCxpaSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgYWxwaGE6ICgoaSAtIGN1cnJlbnQuc2luZ2xlX25ncmFtKCkgPCBpaSkgJiYgKGlpIDw9IGkpKSA/IDAgOiAxLFxuICAgICAgICAgICAgICAgICAgICBsYXllcjogY3VycmVudC5sYXllcigpLFxuICAgICAgICAgICAgICAgICAgICB1bml0OiBkXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGltZyA9IGF3YWl0IEdhbnRlckFQSS5nZW5lcmF0ZUltZ3MoY3VycmVudC5wcm9qZWN0LFxuICAgICAgICAgICAgICAgIFtwc3YuaW1hZ2VJRF0sXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBsYXllcnNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBjdW1tdWxhdGl2ZSkgY2FsbGJhY2soaW1nLnJlc1swXS5kLCBpKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiAhY3VtbXVsYXRpdmUpIGNhbGxiYWNrKGltZy5yZXNbMF0uZCwgaW5kaWNlc1tpXSk7XG4gICAgICAgICAgICByZXMucHVzaChpbWcucmVzWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG5cbiAgICBkMy5zZWxlY3QoXCIjdW5pdEFiQnRuXCIpLm9uKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICBjb25zdCB1bml0QWIgPSBkMy5zZWxlY3QoJyN1bml0QWInKTtcbiAgICAgICAgdW5pdEFiLmh0bWwoJycpO1xuXG4gICAgICAgIC8vIGNvbnN0IGluZGlzID0gY3VycmVudC5pbmRleFNvcnQ7XG5cblxuICAgICAgICBjb25zdCBhbGwgPSByZXF1ZXN0QWxsKGN1cnJlbnQuaW5kZXhTb3J0LFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIDEwLFxuICAgICAgICAgICAgMTAsXG4gICAgICAgICAgICAoaW1nLCBpbmRleCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gdW5pdEFiLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgncG9zaXRpb24nLCAncmVsYXRpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ21hcmdpbi1sZWZ0JywgJzJweCcpXG4gICAgICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsIGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURldGFpbHMoW2ltZ10pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURldGFpbHMobnVsbClcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmQoJ2ltZycpLmF0dHIoJ3NyYycsIGltZykuYXR0cignd2lkdGgnLCAxMDApO1xuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCAnNXB4JylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgJzVweCcpXG5cbiAgICAgICAgICAgICAgICAgICAgLnRleHQoJ2k6ICcgKyBpbmRleClcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDEwKSB1bml0QWIuYXBwZW5kKCdicicpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICBhbGwudGhlbihhID0+IGNvbnNvbGUubG9nKGEsIFwiLS0tIGFcIikpXG5cblxuICAgIH0pXG5cblxuICAgIGQzLnNlbGVjdChcIiN1bml0U2luZ2xlQWJCdG5cIikub24oJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHVuaXRBYiA9IGQzLnNlbGVjdCgnI3VuaXRTaW5nbGVBYicpO1xuICAgICAgICB1bml0QWIuaHRtbCgnJyk7XG5cbiAgICAgICAgY29uc3QgaW5kaXMgPSBjdXJyZW50LmluZGV4U29ydDtcblxuXG4gICAgICAgIGNvbnN0IGFsbCA9IHJlcXVlc3RBbGwoaW5kaXMsXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIGluZGlzLmxlbmd0aCxcbiAgICAgICAgICAgIC0xLFxuICAgICAgICAgICAgKGltZywgaW5kZXgpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRpdiA9IHVuaXRBYi5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdtYXJnaW4tbGVmdCcsICcycHgnKVxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXRhaWxzKFtpbWddKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXRhaWxzKG51bGwpXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kKCdpbWcnKS5hdHRyKCdzcmMnLCBpbWcpLmF0dHIoJ3dpZHRoJywgMTAwKTtcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJywgJzVweCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsICc1cHgnKVxuICAgICAgICAgICAgICAgICAgICAudGV4dCgnaTogJyArIGluZGV4KVxuICAgICAgICAgICAgICAgIC8vIGlmIChpbmRleCA9PT0gMTApIHVuaXRBYi5hcHBlbmQoJ2JyJyk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIGFsbC50aGVuKGEgPT4gY29uc29sZS5sb2coYSwgXCItLS0gYVwiKSlcblxuXG4gICAgfSlcblxufVxuXG4iLCJpbXBvcnQge1ZDb21wb25lbnR9IGZyb20gXCIuL1Zpc0NvbXBvbmVudFwiO1xuaW1wb3J0IHtEM1NlbH0gZnJvbSBcIi4uL2V0Yy9VdGlsXCI7XG5pbXBvcnQge1NpbXBsZUV2ZW50SGFuZGxlcn0gZnJvbSBcIi4uL2V0Yy9TaW1wbGVFdmVudEhhbmRsZXJcIjtcbmltcG9ydCB7QVBJX2dlbmVyYXRlfSBmcm9tIFwiLi4vYXBpL0dhbnRlckFQSVwiO1xuaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzXCJcblxuZXhwb3J0IHR5cGUgRXhhbXBsZVZpZXdEYXRhID0ge1xuICAgIG9yaWc6IEFQSV9nZW5lcmF0ZSxcbiAgICBjb21wYXJlPzogQVBJX2dlbmVyYXRlXG59XG5cbmV4cG9ydCB0eXBlIEV4YW1wbGVWaWV3TW91c2VFdmVudCA9IHtcbiAgICBjYWxsZXI6IEQzU2VsLFxuICAgIGltYWdlczogeyBkOiBzdHJpbmcsIGlkPzogbnVtYmVyIH1bXSxcbiAgICBob3ZlcmVkPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgRXhhbXBsZVZpZXcgZXh0ZW5kcyBWQ29tcG9uZW50PEV4YW1wbGVWaWV3RGF0YT4ge1xuICAgIHByaXZhdGUgZGl2X29yaWdzOiBEM1NlbDtcbiAgICByZW5kZXJEYXRhOiBFeGFtcGxlVmlld0RhdGE7XG5cbiAgICBwcml2YXRlIF9pbWdXaWR0aCA9IC0xO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihkM3BhcmVudDogRDNTZWwsIGV2ZW50SGFuZGxlcj86IFNpbXBsZUV2ZW50SGFuZGxlcikge1xuICAgICAgICBzdXBlcihkM3BhcmVudCwgZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgdGhpcy5zdXBlckluaXRIVE1MKCk7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGV2ZW50cyA9IHtcbiAgICAgICAgcmVxdWVzdF9leGFtcGxlczogXCJFeGFtcGxlVmlld19yZVwiLFxuICAgICAgICBob3ZlcmVkX2ltYWdlX3BhaXI6IFwiRXhhbXBsZVZpZXdfaGlwXCIsXG4gICAgICAgIGNsaWNrZWRfaW1hZ2VfcGFpcjogXCJFeGFtcGxlVmlld19jaXBcIixcblxuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIF9jdXJyZW50ID0ge307XG4gICAgcHJvdGVjdGVkIGNzc19uYW1lID0gXCJFeGFtcGxlVmlld1wiO1xuICAgIHByb3RlY3RlZCBvcHRpb25zID0ge3Bvczoge3g6IDAsIHk6IDB9fTtcblxuICAgIHByb3RlY3RlZCBfaW5pdCgpIHtcbiAgICAgICAgdGhpcy5kaXZfb3JpZ3MgPSB0aGlzLmJhc2UuYXBwZW5kKCdkaXYnKS5hdHRyKCdjbGFzcycsICdleGFtcGxlcycpO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9yZW5kZXIockRhdGEgPSB0aGlzLnJlbmRlckRhdGEpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFyRGF0YSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICBjb25zdCByZW5kZXJMaXN0ID0gckRhdGEub3JpZy5yZXMubWFwKGQgPT4gW2RdKTtcblxuICAgICAgICBpZiAockRhdGEuY29tcGFyZSkge1xuICAgICAgICAgICAgckRhdGEuY29tcGFyZS5yZXMubWFwKChkLCBpKSA9PiByZW5kZXJMaXN0W2ldLnB1c2goZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGltZ19wYWlycyA9IHRoaXMuZGl2X29yaWdzLnNlbGVjdEFsbCgnLmltZ19wYWlyJykuZGF0YShyZW5kZXJMaXN0KTtcbiAgICAgICAgaW1nX3BhaXJzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgaW1nX3BhaXJzID0gaW1nX3BhaXJzLmVudGVyKCkuYXBwZW5kKCdkaXYnKS5hdHRyKCdjbGFzcycsICdpbWdfcGFpcicpXG4gICAgICAgICAgICAubWVyZ2UoaW1nX3BhaXJzKTtcblxuICAgICAgICBsZXQgaW1ncyA9IGltZ19wYWlycy5zZWxlY3RBbGwoJ2ltZycpLmRhdGEoZCA9PiBkKTtcbiAgICAgICAgaW1ncy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIGltZ3MuZW50ZXIoKS5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAubWVyZ2UoaW1ncylcbiAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBkID0+IGQuZClcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMuX2ltZ1dpZHRoID4gLTEgPyB0aGlzLl9pbWdXaWR0aCA6IG51bGwpO1xuXG5cbiAgICAgICAgaW1nX3BhaXJzLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBjb25zdCBldmVudERldGFpbDogRXhhbXBsZVZpZXdNb3VzZUV2ZW50ID0ge1xuICAgICAgICAgICAgICAgIGNhbGxlcjogZDMuc2VsZWN0KHRoaXMpLFxuICAgICAgICAgICAgICAgIGltYWdlczogZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhhdC5ldmVudEhhbmRsZXIudHJpZ2dlcihcbiAgICAgICAgICAgICAgICBFeGFtcGxlVmlldy5ldmVudHMuY2xpY2tlZF9pbWFnZV9wYWlyLFxuICAgICAgICAgICAgICAgIGV2ZW50RGV0YWlsXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG5cbiAgICAgICAgaW1nX3BhaXJzLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50RGV0YWlsOiBFeGFtcGxlVmlld01vdXNlRXZlbnQgPSB7XG4gICAgICAgICAgICAgICAgY2FsbGVyOiBkMy5zZWxlY3QodGhpcyksXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBkLFxuICAgICAgICAgICAgICAgIGhvdmVyZWQ6IHRydWVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoYXQuZXZlbnRIYW5kbGVyLnRyaWdnZXIoXG4gICAgICAgICAgICAgICAgRXhhbXBsZVZpZXcuZXZlbnRzLmhvdmVyZWRfaW1hZ2VfcGFpcixcbiAgICAgICAgICAgICAgICBldmVudERldGFpbFxuICAgICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgICBpbWdfcGFpcnMub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgY29uc3QgZXZlbnREZXRhaWw6IEV4YW1wbGVWaWV3TW91c2VFdmVudCA9IHtcbiAgICAgICAgICAgICAgICBjYWxsZXI6IGQzLnNlbGVjdCh0aGlzKSxcbiAgICAgICAgICAgICAgICBpbWFnZXM6IGQsXG4gICAgICAgICAgICAgICAgaG92ZXJlZDogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoYXQuZXZlbnRIYW5kbGVyLnRyaWdnZXIoXG4gICAgICAgICAgICAgICAgRXhhbXBsZVZpZXcuZXZlbnRzLmhvdmVyZWRfaW1hZ2VfcGFpcixcbiAgICAgICAgICAgICAgICBldmVudERldGFpbFxuICAgICAgICAgICAgKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfd3JhbmdsZShkYXRhOiBFeGFtcGxlVmlld0RhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2V0IGFibGF0ZWQoZGF0YTogQVBJX2dlbmVyYXRlKSB7XG4gICAgICAgIHRoaXMuZGF0YS5jb21wYXJlID0gZGF0YTtcbiAgICAgICAgdGhpcy5yZW5kZXJEYXRhID0gdGhpcy5fd3JhbmdsZSh0aGlzLmRhdGEpO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzZXQgaW1nV2lkdGgoaW1nV2lkdGg6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9pbWdXaWR0aCA9IGltZ1dpZHRoO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge1ZDb21wb25lbnR9IGZyb20gXCIuL1Zpc0NvbXBvbmVudFwiO1xuaW1wb3J0IHtEM1NlbH0gZnJvbSBcIi4uL2V0Yy9VdGlsXCI7XG5pbXBvcnQge1NpbXBsZUV2ZW50SGFuZGxlcn0gZnJvbSBcIi4uL2V0Yy9TaW1wbGVFdmVudEhhbmRsZXJcIjtcbmltcG9ydCB7UGFpbnRTZWxlY3RXaWRnZXR9IGZyb20gXCJwYWludF9zZWxlY3RcIjtcbmltcG9ydCB7R2FudGVyQVBJLCBJbWFnZU1hc2t9IGZyb20gXCIuLi9hcGkvR2FudGVyQVBJXCI7XG5cblxuZXhwb3J0IHR5cGUgUGFpbnRTZWxlY3RWaWV3RGF0YSA9IHtcbiAgICBpbWFnZTogSFRNTEltYWdlRWxlbWVudCxcbiAgICBpbWFnZUlEPzogc3RyaW5nLFxuICAgIHJlc2V0U2VsZWN0aW9uPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgUGFpbnRTZWxlY3RWaWV3IGV4dGVuZHMgVkNvbXBvbmVudDxQYWludFNlbGVjdFZpZXdEYXRhPiB7XG4gICAgcHJvdGVjdGVkIG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55OyBwb3M6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IH07IH07XG4gICAgcHJvdGVjdGVkIGNzc19uYW1lID0gXCJQYWludFNlbGVjdFZpZXdcIjtcbiAgICBwcm90ZWN0ZWQgX2N1cnJlbnQ6IHt9O1xuICAgIHByaXZhdGUgcHN3OiBQYWludFNlbGVjdFdpZGdldDtcblxuXG4gICAgcHVibGljIHN0YXRpYyBldmVudHMgPSB7XG4gICAgICAgIG1hc2tDaGFuZ2VkOiBcIlBhaW50U2VsZWN0Vmlld19tY1wiXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoX3BhcmVudDogRDNTZWwsIF9ldmVudEhhbmRsZXI6IFNpbXBsZUV2ZW50SGFuZGxlcikge1xuICAgICAgICBzdXBlcihfcGFyZW50LCBfZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgdGhpcy5zdXBlckluaXRIVE1MKCk7XG4gICAgICAgIC8vIFRPRE86aGFja1xuICAgICAgICAvLyB0aGlzLmJhc2UuYXR0cignY2xhc3MnLCAnJyk7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2luaXQoKSB7XG4gICAgICAgIHRoaXMucHN3ID0gbmV3IFBhaW50U2VsZWN0V2lkZ2V0KHRoaXMuYmFzZS5ub2RlKCksIHtcbiAgICAgICAgICAgIG92ZXJsYXlNb2RpZmllZDogKG1lLCBtYXNrKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlTWFza0V2ZW50KG1hc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBudWxsLCAxKTtcbiAgICAgICAgdGhpcy5wc3cucmFkaXVzID0gMjA7XG4gICAgICAgIHRoaXMucHN3LmRyYXdDb2xvciA9ICcjZjA2MDY5JztcbiAgICAgICAgdGhpcy5wc3cuYWxwaGEgPSAuMztcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpcmVNYXNrRXZlbnQobWFzaykge1xuICAgICAgICBjb25zdCBpbWdNYXNrOiBJbWFnZU1hc2sgPSB7XG4gICAgICAgICAgICBpZDogdGhpcy5yZW5kZXJEYXRhLmltYWdlSUQgfHwgLTEsXG4gICAgICAgICAgICBtYXNrXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlcihQYWludFNlbGVjdFZpZXcuZXZlbnRzLm1hc2tDaGFuZ2VkLFxuICAgICAgICAgICAgaW1nTWFza1xuICAgICAgICApXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF93cmFuZ2xlKGRhdGE6IFBhaW50U2VsZWN0Vmlld0RhdGEpIHtcblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3JlbmRlcihyRDogUGFpbnRTZWxlY3RWaWV3RGF0YSA9IHRoaXMucmVuZGVyRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLnBzdy5iYWNrZ3JvdW5kSW1hZ2UgPSByRC5pbWFnZTtcbiAgICAgICAgdGhpcy5wc3cucmVkcmF3KCk7XG4gICAgfVxuXG5cbiAgICAvLyBwcml2YXRlIHNlbGVjdGlvbk1vZGlmaWVkKG1lLCBtYXNrKSB7XG4gICAgLy9cbiAgICAvLyAgICAgY29uc29sZS5sb2codGhpcywgXCItLS0gdGhpc1wiKTtcbiAgICAvLyAgICAgY29uc3QgaW1nTWFzazogSW1hZ2VNYXNrID0ge1xuICAgIC8vICAgICAgICAgaWQ6IHRoaXMucmVuZGVyRGF0YS5iYWNrZ3JvdW5kSW1hZ2VJRCB8fCAtMSxcbiAgICAvLyAgICAgICAgIG1hc2tcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXIoUGFpbnRTZWxlY3RWaWV3LmV2ZW50cy5tYXNrQ2hhbmdlZCxcbiAgICAvLyAgICAgICAgIGltZ01hc2tcbiAgICAvLyAgICAgKVxuICAgIC8vXG4gICAgLy9cbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2cobWUsIGltYWdlLFwiLS0tIG1lLCBpbWFnZVwiKTtcbiAgICAvLyB9XG5cbiAgICBwcml2YXRlIHJlc2V0U2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnBzdy5yZXNldCgpXG4gICAgfVxuXG4gICAgZ2V0IGltYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wc3cuYmFja2dyb3VuZEltYWdlO1xuICAgIH1cblxuICAgIGdldCBpbWFnZUlEKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEYXRhLmltYWdlSUQ7XG4gICAgfVxuXG5cbiAgICBzZXQgem9vbSh6KSB7XG4gICAgICAgIHRoaXMucHN3Lnpvb20gPSB6O1xuICAgIH1cblxuICAgIHNldCBvcGFjaXR5KG86IG51bWJlcikge1xuICAgICAgICB0aGlzLnBzdy5hbHBoYSA9IG87XG4gICAgfVxuXG5cbiAgICByZXNldChzdXByZXNzRXZlbnQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnBzdy5yZXNldCgpO1xuICAgICAgICBpZiAoIXN1cHJlc3NFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5maXJlTWFza0V2ZW50KHRoaXMucHN3LmN1cnJlbnRNYXNrKVxuICAgICAgICB9XG4gICAgfVxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBIZW5kcmlrIFN0cm9iZWx0IChoZW5kcmlrLnN0cm9iZWx0LmNvbSkgb24gMTIvMy8xNi5cbiAqL1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnXG5pbXBvcnQge0QzU2VsLCBVdGlsfSBmcm9tIFwiLi4vZXRjL1V0aWxcIjtcbmltcG9ydCB7U2ltcGxlRXZlbnRIYW5kbGVyfSBmcm9tIFwiLi4vZXRjL1NpbXBsZUV2ZW50SGFuZGxlclwiO1xuaW1wb3J0IHtTVkd9IGZyb20gXCIuLi9ldGMvU1ZHcGx1c1wiO1xuXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWQ29tcG9uZW50PERhdGFJbnRlcmZhY2U+IHtcblxuICAgIC8vIFNUQVRJQyBGSUVMRFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3RhdGljIHByb3BlcnR5IHRoYXQgY29udGFpbnMgYWxsIGNsYXNzIHJlbGF0ZWQgZXZlbnRzLlxuICAgICAqIFNob3VsZCBiZSBvdmVyd3JpdHRlbiBhbmQgZXZlbnQgc3RyaW5ncyBoYXZlIHRvIGJlIHVuaXF1ZSEhXG4gICAgICovXG5cbiAgICBzdGF0aWMgZXZlbnRzOiB7fSA9IHtub0V2ZW50OiAnVkNvbXBvbmVudF9ub0V2ZW50J307XG5cbiAgICAvKipcbiAgICAgKiBzZXQgb2YgQUxMIG9wdGlvbnMgYW5kIHRoZWlyIGRlZmF1bHRzXG4gICAgICogRXhhbXBsZTpcbiAgICAgKiB7XG4gICAgICAgIHBvczoge3g6IDEwLCB5OiAxMH0sXG4gICAgICAgIC8vIExpc3Qgb2YgRXZlbnRzIHRoYXQgYXJlIE9OTFkgaGFuZGxlZCBnbG9iYWxseTpcbiAgICAgICAgZ2xvYmFsRXhjbHVzaXZlRXZlbnRzOiBbXVxuICAgIH07XG4gICAgICpcbiAgICAgKi9cbiAgICAgICAgLy8gYWJzdHJhY3QgcmVhZG9ubHkgZGVmYXVsdE9wdGlvbnM7XG5cblxuICAgICAgICAvLyAvKipcbiAgICAgICAgLy8gICogRGVmaW5lcyB0aGUgbGF5ZXJzIGluIFNWRyAgZm9yIGJnLG1haW4sZmcsLi4uXG4gICAgICAgIC8vICAqL1xuICAgICAgICAvLyBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgbGF5b3V0OiB7IG5hbWU6IHN0cmluZywgcG9zOiBudW1iZXJbXSB9W10gPSBbe25hbWU6ICdtYWluJywgcG9zOiBbMCwgMF19XTtcblxuXG4gICAgcHJvdGVjdGVkIGlkOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIHBhcmVudDogRDNTZWw7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG9wdGlvbnM6IHsgcG9zOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIHByb3RlY3RlZCBiYXNlOiBEM1NlbDtcbiAgICBwcm90ZWN0ZWQgbGF5ZXJzOiB7IG1haW4/OiBEM1NlbCwgZmc/OiBEM1NlbCwgYmc/OiBEM1NlbCwgW2tleTogc3RyaW5nXTogRDNTZWwgfTtcbiAgICBwcm90ZWN0ZWQgZXZlbnRIYW5kbGVyOiBTaW1wbGVFdmVudEhhbmRsZXI7XG4gICAgcHJvdGVjdGVkIF92aXNpYmlsaXR5OiB7IGhpZGRlbjogYm9vbGVhbiwgaGlkZUVsZW1lbnQ/OiBEM1NlbCB8IG51bGw7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIHByb3RlY3RlZCBkYXRhOiBEYXRhSW50ZXJmYWNlO1xuICAgIHByb3RlY3RlZCByZW5kZXJEYXRhOiBhbnk7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNzc19uYW1lOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF9jdXJyZW50OiB7fTtcblxuICAgIC8vIENPTlNUUlVDVE9SID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAvKipcbiAgICAgKiBTaW1wbGUgY29uc3RydWN0b3IuIFN1YmNsYXNzZXMgc2hvdWxkIGNhbGwgQHN1cGVySW5pdChvcHRpb25zKSBhcyB3ZWxsLlxuICAgICAqIHNlZSB3aHkgaGVyZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDM1OTU5NDMvd2h5LWFyZS1kZXJpdmVkLWNsYXNzLXByb3BlcnR5LXZhbHVlcy1ub3Qtc2Vlbi1pbi10aGUtYmFzZS1jbGFzcy1jb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogdGVtcGxhdGU6XG4gICAgIGNvbnN0cnVjdG9yKGQzUGFyZW50OiBEM1NlbCwgZXZlbnRIYW5kbGVyPzogU2ltcGxlRXZlbnRIYW5kbGVyLCBvcHRpb25zOiB7fSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGQzUGFyZW50LCBldmVudEhhbmRsZXIpO1xuICAgICAgICAvLyAtLSBhY2Nlc3MgdG8gc3ViY2xhc3MgcGFyYW1zOlxuICAgICAgICB0aGlzLnN1cGVySW5pdChvcHRpb25zKTtcbiAgICAgfVxuICAgICAqXG4gICAgICogQHBhcmFtIHtEM1NlbH0gZDNwYXJlbnQgIEQzIHNlbGVjdGlvbiBvZiBwYXJlbnQgU1ZHIERPTSBFbGVtZW50XG4gICAgICogQHBhcmFtIHtTaW1wbGVFdmVudEhhbmRsZXJ9IGV2ZW50SGFuZGxlciBhIGdsb2JhbCBldmVudCBoYW5kbGVyIG9iamVjdCBvciAnbnVsbCcgZm9yIGxvY2FsIGV2ZW50IGhhbmRsZXJcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoZDNwYXJlbnQ6IEQzU2VsLCBldmVudEhhbmRsZXI/OiBTaW1wbGVFdmVudEhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5pZCA9IFV0aWwuc2ltcGxlVUlkKHt9KTtcblxuICAgICAgICB0aGlzLnBhcmVudCA9IGQzcGFyZW50O1xuXG4gICAgICAgIC8vIElmIG5vdCBmdXJ0aGVyIHNwZWNpZmllZCAtIGNyZWF0ZSBhIGxvY2FsIGV2ZW50IGhhbmRsZXIgYm91bmQgdG8gdGhlIGJhcyBlbGVtZW50XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyID0gZXZlbnRIYW5kbGVyIHx8XG4gICAgICAgICAgICBuZXcgU2ltcGxlRXZlbnRIYW5kbGVyKHRoaXMucGFyZW50Lm5vZGUoKSk7XG5cbiAgICAgICAgLy8gT2JqZWN0IGZvciBzdG9yaW5nIGludGVybmFsIHN0YXRlcyBhbmQgdmFyaWFibGVzXG4gICAgICAgIHRoaXMuX3Zpc2liaWxpdHkgPSB7aGlkZGVuOiBmYWxzZX07XG5cbiAgICB9XG5cblxuICAgIC8vIHByb3RlY3RlZCBjcmVhdGVTdmdMYXllcnMobGF5ZXJzPVsnYmcnLCdtYWluJywnZmcnXSl7XG4gICAgLy8gICAgIHRoaXMuX2xheWVycyA9IHt9XG4gICAgLy8gICAgIHRoaXMuYmFzZSA9IFNWRy5ncm91cCh0aGlzLnBhcmVudCxcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmNzc19uYW1lICsgJyBJRCcgKyB0aGlzLmlkLFxuICAgIC8vICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb3MpO1xuICAgIC8vXG4gICAgLy8gfVxuXG4gICAgcHJvdGVjdGVkIHN1cGVySW5pdEhUTUwob3B0aW9uczoge30gPSB7fSkge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGtleSA9PiB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XSk7XG4gICAgICAgIHRoaXMuYmFzZSA9IHRoaXMucGFyZW50LmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5jbGFzc2VkKHRoaXMuY3NzX25hbWUsIHRydWUpXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEhhcyB0byBiZSBjYWxsZWQgYXMgbGFzdCBjYWxsIGluIHN1YmNsYXNzIGNvbnN0cnVjdG9yLlxuICAgICAqIEBwYXJhbSB7e319IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gZGVmYXVsdExheWVycyAtLSBjcmVhdGUgdGhlIGRlZmF1bHQgPGc+IGxheWVyczogYmcgLT4gbWFpbiAtPiBmZ1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBzdXBlckluaXRTVkcob3B0aW9uczoge30gPSB7fSwgZGVmYXVsdExheWVycyA9IFsnYmcnLCAnbWFpbicsICdmZyddKSB7XG4gICAgICAgIC8vIFNldCBkZWZhdWx0IG9wdGlvbnMgaWYgbm90IHNwZWNpZmllZCBpbiBjb25zdHJ1Y3RvciBjYWxsXG4gICAgICAgIC8vIGNvbnN0IGRlZmF1bHRzID0gdGhpcy5kZWZhdWx0T3B0aW9ucztcbiAgICAgICAgLy8gdGhpcy5vcHRpb25zID0ge307XG4gICAgICAgIC8vIGNvbnN0IGtleXMgPSBuZXcgU2V0KFsuLi5PYmplY3Qua2V5cyhkZWZhdWx0cyksIC4uLk9iamVjdC5rZXlzKG9wdGlvbnMpXSk7XG4gICAgICAgIC8vIGtleXMuZm9yRWFjaChrZXkgPT4gdGhpcy5vcHRpb25zW2tleV0gPSAoa2V5IGluIG9wdGlvbnMpID8gb3B0aW9uc1trZXldIDogZGVmYXVsdHNba2V5XSk7XG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goa2V5ID0+IHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldKTtcblxuXG4gICAgICAgIHRoaXMubGF5ZXJzID0ge307XG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBiYXNlIGdyb3VwIGVsZW1lbnRcbiAgICAgICAgdGhpcy5iYXNlID0gU1ZHLmdyb3VwKHRoaXMucGFyZW50LFxuICAgICAgICAgICAgdGhpcy5jc3NfbmFtZSArICcgSUQnICsgdGhpcy5pZCxcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb3MpO1xuXG5cbiAgICAgICAgLy8gY3JlYXRlIGRlZmF1bHQgbGF5ZXJzOiBiYWNrZ3JvdW5kLCBtYWluLCBmb3JlZ3JvdW5kXG4gICAgICAgIGlmIChkZWZhdWx0TGF5ZXJzKSB7XG4gICAgICAgICAgICAvLyBjb25zdHJ1Y3Rpb24gb3JkZXIgaXMgaW1wb3J0YW50ICFcbiAgICAgICAgICAgIGRlZmF1bHRMYXllcnMuZm9yRWFjaChsYXllciA9PntcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyc1tsYXllcl0gPSBTVkcuZ3JvdXAodGhpcy5iYXNlLCBsYXllcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gdGhpcy5sYXllcnMuYmcgPSBTVkcuZ3JvdXAodGhpcy5iYXNlLCAnYmcnKTtcbiAgICAgICAgICAgIC8vIHRoaXMubGF5ZXJzLm1haW4gPSBTVkcuZ3JvdXAodGhpcy5iYXNlLCAnbWFpbicpO1xuICAgICAgICAgICAgLy8gdGhpcy5sYXllcnMuZmcgPSBTVkcuZ3JvdXAodGhpcy5iYXNlLCAnZmcnKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNob3VsZCBiZSBvdmVyd3JpdHRlbiB0byBjcmVhdGUgdGhlIHN0YXRpYyBET00gZWxlbWVudHNcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJuIHsqfSAtLS1cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2luaXQoKTtcblxuICAgIC8vIERBVEEgVVBEQVRFICYgUkVOREVSID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogRXZlcnkgdGltZSBkYXRhIGhhcyBjaGFuZ2VkLCB1cGRhdGUgaXMgY2FsbGVkIGFuZFxuICAgICAqIHRyaWdnZXJzIHdyYW5nbGluZyBhbmQgcmUtcmVuZGVyaW5nXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgZGF0YSBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHsqfSAtLS1cbiAgICAgKi9cbiAgICB1cGRhdGUoZGF0YTogRGF0YUludGVyZmFjZSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICBpZiAodGhpcy5fdmlzaWJpbGl0eS5oaWRkZW4pIHJldHVybjtcbiAgICAgICAgdGhpcy5yZW5kZXJEYXRhID0gdGhpcy5fd3JhbmdsZShkYXRhKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyKHRoaXMucmVuZGVyRGF0YSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEYXRhIHdyYW5nbGluZyBtZXRob2QgLS0gaW1wbGVtZW50IGluIHN1YmNsYXNzLiBSZXR1cm5zIHRoaXMucmVuZGVyRGF0YS5cbiAgICAgKiBTaW1wbGVzdCBpbXBsZW1lbnRhdGlvbjogYHJldHVybiBkYXRhO2BcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBkYXRhXG4gICAgICogQHJldHVybnMgeyp9IC0tIGRhdGEgaW4gcmVuZGVyIGZvcm1hdFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfd3JhbmdsZShkYXRhKTtcblxuXG4gICAgLyoqXG4gICAgICogSXMgcmVzcG9uc2libGUgZm9yIG1hcHBpbmcgZGF0YSB0byBET00gZWxlbWVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVuZGVyRGF0YSBwcmUtcHJvY2Vzc2VkICh3cmFuZ2xlZCkgZGF0YVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEByZXR1cm5zIHsqfSAtLS1cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX3JlbmRlcihyZW5kZXJEYXRhKTogdm9pZDtcblxuXG4gICAgLy8gVVBEQVRFIE9QVElPTlMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBpbnN0YW5jZSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgb25seSB0aGUgb3B0aW9ucyB0aGF0IHNob3VsZCBiZSB1cGRhdGVkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZVJlbmRlciBpZiBvcHRpb24gY2hhbmdlIHJlcXVpcmVzIGEgcmUtcmVuZGVyaW5nIChkZWZhdWx0OmZhbHNlKVxuICAgICAqIEByZXR1cm5zIHsqfSAtLS1cbiAgICAgKi9cbiAgICB1cGRhdGVPcHRpb25zKHtvcHRpb25zLCByZVJlbmRlciA9IGZhbHNlfSkge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGsgPT4gdGhpcy5vcHRpb25zW2tdID0gb3B0aW9uc1trXSk7XG4gICAgICAgIGlmIChyZVJlbmRlcikgdGhpcy5fcmVuZGVyKHRoaXMucmVuZGVyRGF0YSk7XG4gICAgfVxuXG5cbiAgICAvLyA9PT0gQ09OVkVOSUVOQ0UgPT09PVxuXG5cbiAgICBzZXRIaWRlRWxlbWVudChoRTogRDNTZWwpIHtcbiAgICAgICAgdGhpcy5fdmlzaWJpbGl0eS5oaWRlRWxlbWVudCA9IGhFO1xuICAgIH1cblxuICAgIGhpZGVWaWV3KCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Zpc2liaWxpdHkuaGlkZGVuKSB7XG4gICAgICAgICAgICBjb25zdCBoRSA9IHRoaXMuX3Zpc2liaWxpdHkuaGlkZUVsZW1lbnQgfHwgdGhpcy5wYXJlbnQ7XG4gICAgICAgICAgICBoRS50cmFuc2l0aW9uKCkuc3R5bGVzKHtcbiAgICAgICAgICAgICAgICAnb3BhY2l0eSc6IDAsXG4gICAgICAgICAgICAgICAgJ3BvaW50ZXItZXZlbnRzJzogJ25vbmUnXG4gICAgICAgICAgICB9KS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB0aGlzLl92aXNpYmlsaXR5LmhpZGRlbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmhpZGVWaWV3KCkge1xuICAgICAgICBpZiAodGhpcy5fdmlzaWJpbGl0eS5oaWRkZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGhFID0gdGhpcy5fdmlzaWJpbGl0eS5oaWRlRWxlbWVudCB8fCB0aGlzLnBhcmVudDtcbiAgICAgICAgICAgIGhFLnRyYW5zaXRpb24oKS5zdHlsZXMoe1xuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMSxcbiAgICAgICAgICAgICAgICAncG9pbnRlci1ldmVudHMnOiBudWxsLFxuICAgICAgICAgICAgICAgICdkaXNwbGF5JzogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl92aXNpYmlsaXR5LmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gdGhpcy51cGRhdGUodGhpcy5kYXRhKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5iYXNlLnJlbW92ZSgpO1xuICAgIH1cblxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9