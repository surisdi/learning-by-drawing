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
/******/ 		"pt1": 0
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
/******/ 	deferredModules.push(["./ts/pt1.ts","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/file-loader/dist/cjs.js?name=pt1.html!./pt1.html":
/*!****************************************************************************************************************!*\
  !*** /usr/local/home/davidbau/netdissect/client/node_modules/file-loader/dist/cjs.js?name=pt1.html!./pt1.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pt1.html";

/***/ }),

/***/ "./css/pt1.scss":
/*!**********************!*\
  !*** ./css/pt1.scss ***!
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

/***/ "./ts/pt1.ts":
/*!*******************!*\
  !*** ./ts/pt1.ts ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/d3/index.js");
/* harmony import */ var d3_selection_multi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-selection-multi */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/d3-selection-multi/index.js");
/* harmony import */ var _css_pt1_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/pt1.scss */ "./css/pt1.scss");
/* harmony import */ var _css_pt1_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_css_pt1_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _file_loader_name_pt1_html_pt1_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! file-loader?name=pt1.html!../pt1.html */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/file-loader/dist/cjs.js?name=pt1.html!./pt1.html");
/* harmony import */ var _file_loader_name_pt1_html_pt1_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_pt1_html_pt1_html__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _etc_SimpleEventHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./etc/SimpleEventHandler */ "./ts/etc/SimpleEventHandler.ts");
/* harmony import */ var _etc_GlobalVars__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./etc/GlobalVars */ "./ts/etc/GlobalVars.ts");
/* harmony import */ var _vis_AblationView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vis/AblationView */ "./ts/vis/AblationView.ts");
/* harmony import */ var _etc_URLHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./etc/URLHandler */ "./ts/etc/URLHandler.ts");
/* harmony import */ var _vis_ExampleView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./vis/ExampleView */ "./ts/vis/ExampleView.ts");
/* harmony import */ var _vis_BarchartCanvas__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./vis/BarchartCanvas */ "./ts/vis/BarchartCanvas.ts");
/* harmony import */ var _api_GanterAPI__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./api/GanterAPI */ "./ts/api/GanterAPI.ts");












const global = {
    sidebar: () => d3__WEBPACK_IMPORTED_MODULE_1__["select"]('.sidenav').node()
        .getBoundingClientRect().width
};
let exampleIDs = d3__WEBPACK_IMPORTED_MODULE_1__["range"](20, 30);
window.onload = () => {
    console.log("-hen-- ");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()();
    const eventHandler = new _etc_SimpleEventHandler__WEBPACK_IMPORTED_MODULE_5__["SimpleEventHandler"](d3__WEBPACK_IMPORTED_MODULE_1__["select"]('body').node());
    const project_selector = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#project_selector');
    const layer_selector = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#layer_selector');
    const main_view_sel = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('.floating_content');
    const ablationView = new _vis_AblationView__WEBPACK_IMPORTED_MODULE_7__["AblationView"](main_view_sel.select('.ablation_modifier'), eventHandler);
    const exampleView = new _vis_ExampleView__WEBPACK_IMPORTED_MODULE_9__["ExampleView"](main_view_sel.select('.ablation_examples'), eventHandler);
    exampleView.imgWidth = 75;
    // TODO: TEST starts here --------
    const barchartTest = new _vis_BarchartCanvas__WEBPACK_IMPORTED_MODULE_10__["BarchartCanvas"](main_view_sel.select('#bars'), eventHandler);
    barchartTest.update({
        ids: [1, 2, 4, 3, 5], values: [.2, .4, .12, -.5, -.2]
    });
    // TODO: TEST ends here --------
    // let projects = {};
    let recipes = {};
    const start_params = _etc_URLHandler__WEBPACK_IMPORTED_MODULE_8__["default"].parameters;
    _api_GanterAPI__WEBPACK_IMPORTED_MODULE_11__["GanterAPI"].allProjects()
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
        _etc_URLHandler__WEBPACK_IMPORTED_MODULE_8__["default"].updateURLParam('project', project, false);
        _api_GanterAPI__WEBPACK_IMPORTED_MODULE_11__["GanterAPI"].ablationChannels(project)
            .then((channelResponse) => {
            ablationView.update(channelResponse.res);
            barchartTest.update({
                ids: [], values: channelResponse.res.ablation
            });
            recipes = {};
            _api_GanterAPI__WEBPACK_IMPORTED_MODULE_11__["GanterAPI"].recipes(project)
                .then((recipeResponse) => {
                console.log(recipeResponse.res, "--- data.res");
                recipeResponse.res.forEach(rec => recipes[rec.name] = rec);
                d3__WEBPACK_IMPORTED_MODULE_1__["select"]('.recipes').selectAll('option').remove();
                d3__WEBPACK_IMPORTED_MODULE_1__["select"]('.recipes').selectAll('option')
                    .data(recipeResponse.res).enter().append('option').attrs({
                    value: d => d.name
                }).text(d => d.name)
                    .property('selected', d => d.name === start_params['recipe']);
                d3__WEBPACK_IMPORTED_MODULE_1__["select"](".select_rec_btn")
                    .style('opacity', 1)
                    .style('pointer-events', null);
                if ('recipe' in start_params) {
                    selectRecipe();
                }
            });
        });
        _api_GanterAPI__WEBPACK_IMPORTED_MODULE_11__["GanterAPI"].generateImgs(project, exampleIDs)
            .then((data) => {
            exampleView.update({ orig: data });
        });
    }
    const apply_btn = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#apply_recipe_btn');
    const apply_spinner = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#apply_recipe_spinner');
    apply_btn.on('click', () => {
        const abl = ablationView.ablation_modified;
        const project = project_selector.property('value');
        const layer = layer_selector.property('value');
        apply_spinner.style('opacity', 1);
        _api_GanterAPI__WEBPACK_IMPORTED_MODULE_11__["GanterAPI"].generateImgs(project, exampleIDs, 0, abl.map((alpha, unit) => ({
            alpha,
            layer,
            unit
        })))
            .then((data) => {
            apply_spinner.style('opacity', 0);
            exampleView.ablated = data;
        });
    });
    function selectRecipe() {
        const rec_key = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('.recipes').property('value');
        _etc_URLHandler__WEBPACK_IMPORTED_MODULE_8__["default"].updateURLParam('recipe', rec_key);
        const rec = recipes[rec_key];
        ablationView.ablation = rec.unit.map(d => d.alpha);
        barchartTest.update({
            ids: [], values: rec.unit.map(d => d.alpha)
        });
        d3__WEBPACK_IMPORTED_MODULE_1__["selectAll"](".select_rec_btn")
            .style('opacity', 0)
            .style('pointer-events', 'none');
    }
    d3__WEBPACK_IMPORTED_MODULE_1__["selectAll"](".select_rec_btn").on('click', () => {
        selectRecipe();
    });
    d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#reset_all').on('click', () => {
        ablationView.reset_all();
    });
    d3__WEBPACK_IMPORTED_MODULE_1__["select"]('.recipes').on('change', () => {
        d3__WEBPACK_IMPORTED_MODULE_1__["selectAll"](".select_rec_btn")
            .style('opacity', 1)
            .style('pointer-events', null);
    });
    /*
    *
    ******  GLOBAL EVENTS  *******
    *
    * */
    window.onresize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        // console.log(w, h, "--- w,h");
        re_layout(w, h);
    };
    function re_layout(w, h) {
        d3__WEBPACK_IMPORTED_MODULE_1__["selectAll"]('.sidenav')
            .style('height', (h - 45) + 'px');
        d3__WEBPACK_IMPORTED_MODULE_1__["selectAll"]('.main_frame')
            .style('height', (h - 45) + 'px')
            .style('width', (w - 300) + 'px');
        eventHandler.trigger(_etc_GlobalVars__WEBPACK_IMPORTED_MODULE_6__["GlobalEvents"].window_resize, { w, h });
        eventHandler.trigger(_etc_GlobalVars__WEBPACK_IMPORTED_MODULE_6__["GlobalEvents"].main_resize, {
            w: (w - global.sidebar()),
            h: (h - 45)
        });
    }
    re_layout(window.innerWidth, window.innerHeight);
    eventHandler.bind(_vis_AblationView__WEBPACK_IMPORTED_MODULE_7__["AblationView"].events.image_hovered, d => {
        const dt = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('.sidenav').select('.detail_img');
        if (d.hovered) {
            dt.html(`<img src="${d.image}" width="${global.sidebar() - 10}">`);
        }
        else {
            dt.html(`<svg width="${global.sidebar() - 10}" height="${global.sidebar() - 10}">`);
        }
    });
    eventHandler.bind(_vis_ExampleView__WEBPACK_IMPORTED_MODULE_9__["ExampleView"].events.hovered_image_pair, (d) => {
        const dt = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('.sidenav').select('.detail_img');
        if (d.hovered) {
            dt.html(d.images
                .map(img => `<img src="${img.d}" width="${global.sidebar() - 10}">`)
                .join('<br>'));
        }
        else {
            dt.html(`<svg width="${global.sidebar() - 10}" height="${global.sidebar() - 10}">`);
        }
    });
};


/***/ }),

/***/ "./ts/vis/AblationView.ts":
/*!********************************!*\
  !*** ./ts/vis/AblationView.ts ***!
  \********************************/
/*! exports provided: AblationView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AblationView", function() { return AblationView; });
/* harmony import */ var _VisComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VisComponent */ "./ts/vis/VisComponent.ts");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/d3/index.js");
/* harmony import */ var _etc_Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../etc/Util */ "./ts/etc/Util.ts");
/* harmony import */ var _etc_GlobalVars__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../etc/GlobalVars */ "./ts/etc/GlobalVars.ts");
/* harmony import */ var _etc_URLHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../etc/URLHandler */ "./ts/etc/URLHandler.ts");





// export type ImageMatrixImage = { img: string; id: number, label: number, pred: number }
//
// type ImageMatrixRender = {
//     layer: string;
//     images: ImageMatrixImage[]
// }[]
class AblationView extends _VisComponent__WEBPACK_IMPORTED_MODULE_0__["VComponent"] {
    constructor(d3parent, eventHandler) {
        super(d3parent, eventHandler);
        this.css_name = 'AblationView';
        this.options = {
            pos: { x: 0, y: 0 },
            measures: {
                img_width: 50,
                img_dist: 52,
                barHeight: 100,
                main: {
                    padding: 10
                }
            }
        };
        this._current = {
            width: 100,
            img_range: [0, 10],
            img_space: 10,
            ablation_scale: d3__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"](),
            ablation_changes: { 1: 1, 3: 0 },
            sort: {
                i_to_s: [],
                s_to_i: []
            }
        };
        this.superInitHTML();
        this._init();
    }
    _init() {
        const ms = this.options.measures;
        const c = this._current;
        this.rs = this.base.append('svg').attrs({
            class: 'ranking_selector',
            width: 100,
            height: ms.barHeight
        });
        this.eventHandler.bind(_etc_GlobalVars__WEBPACK_IMPORTED_MODULE_3__["GlobalEvents"].main_resize, (d) => {
            c.width = (d.w - 2 * ms.main.padding);
            this.rs.attr('width', c.width);
            c.img_space = Math.floor(c.width / ms.img_dist);
            c.img_range[1] = c.img_range[0] + c.img_space;
            // console.log(c.img_range,"--- c.img_range");
            this._render();
        });
        this.eventHandler.bind(AblationView.events.ablation_changed, (d) => {
            this.actionChangeAblationValue(d.i, d.new_value);
        });
        const start_params = _etc_URLHandler__WEBPACK_IMPORTED_MODULE_4__["default"].parameters;
        if ('abl_chg' in start_params) {
            this._current.ablation_changes = Object(_etc_Util__WEBPACK_IMPORTED_MODULE_2__["arr_to_obj"])(start_params['abl_chg']);
        }
    }
    _render(renderData = this.renderData) {
        if (!renderData)
            return;
        const cur = this._current;
        // TODO: correct for over-length range
        this._correct_selection_range();
        //TODO: hack for now
        if (cur.sort.s_to_i.length !== renderData.channels.length) {
            cur.sort.s_to_i = d3__WEBPACK_IMPORTED_MODULE_1__["range"](renderData.channels.length);
            cur.sort.i_to_s = d3__WEBPACK_IMPORTED_MODULE_1__["range"](cur.sort.s_to_i.length);
            cur.sort.s_to_i.forEach((i, s) => cur.sort.i_to_s[i] = s);
        }
        if (renderData.ablation) {
            this.renderRangeSelector();
        }
        if (renderData.channels) {
            this.renderImages();
        }
    }
    _correct_selection_range(renderData = this.renderData) {
        const cur = this._current;
        if (cur.img_range[1] >= renderData.channels.length) {
            const diff = renderData.channels.length - cur.img_range[1];
            cur.img_range[1] += diff;
            cur.img_range[0] += diff;
            if (cur.img_range[0] < 0)
                cur.img_range[0] = 0;
        }
    }
    renderRangeSelector(renderData = this.renderData) {
        const that = this;
        const cur = this._current;
        const ms = this.options.measures;
        const layers = {
            fg: null,
            bg: null,
            brush: null,
            main: null
        };
        if (!this.rs.property('configured')) {
            for (const l of ['bg', 'main', 'brush', 'fg']) {
                layers[l] = this.rs.append('g').attr('class', l);
            }
            this.rs.property('configured', true);
        }
        else {
            for (const l of ['bg', 'main', 'brush', 'fg']) {
                layers[l] = this.rs.select(`.${l}`);
            }
        }
        const xScale = d3__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"]()
            .domain([0, renderData.ablation.length + 1])
            .range([22, cur.width]);
        const barWidth = xScale(1) - xScale(0);
        const ab_min_max = d3__WEBPACK_IMPORTED_MODULE_1__["extent"](renderData.ablation);
        if (ab_min_max[0] > 0)
            ab_min_max[0] = 0;
        const yScale = d3__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"]()
            .domain(ab_min_max)
            .range([ms.barHeight - 5, 5]);
        const zero = yScale(0);
        // map sort order to elements: i=data array index, s=sort index, d=data
        const ab_data = cur.sort.s_to_i
            .map((i, s) => ({ i, s, abl: renderData.ablation[i] }));
        const bar = layers.main.selectAll(".bar").data(ab_data);
        bar.exit().remove();
        const barEnter = bar.enter().append('rect').attr('class', 'bar');
        barEnter.merge(bar).attrs({
            class: d => (d.abl >= 0) ? "bar pos" : 'bar neg',
            x: (d, i) => xScale(i),
            y: (d) => (d.abl >= 0) ? yScale(d.abl) : zero,
            height: (d) => (d.abl >= 0) ? zero - yScale(d.abl) : yScale(d.abl) - zero,
            width: barWidth
        });
        const y_axis_g = layers.bg.selectAll('.y-axis').data([ab_min_max]);
        const yAxis = d3__WEBPACK_IMPORTED_MODULE_1__["axisLeft"](yScale);
        y_axis_g.enter()
            .append('g').classed('y-axis', true)
            .attr('transform', 'translate(20,0)')
            .merge(y_axis_g).call(yAxis);
        const b = d3__WEBPACK_IMPORTED_MODULE_1__["brushX"]()
            .extent([[22, 0], [cur.width, ms.barHeight]])
            .on('brush', function () {
            // console.log("brush--- ", d3.event.type);
            // if (d3.event.sourceEvent) console.log(d3.event.sourceEvent.type,"--- d3.event.sourceEvent.type");
            if (!d3__WEBPACK_IMPORTED_MODULE_1__["event"].sourceEvent || d3__WEBPACK_IMPORTED_MODULE_1__["event"].sourceEvent.type === "brush")
                return;
            // console.log("--- beyond --");
            const d0 = d3__WEBPACK_IMPORTED_MODULE_1__["event"].selection.map(xScale.invert), d1 = d0.map(Math.round);
            // If empty when rounded, use floor instead.
            if (d1[0] >= d1[1]) {
                d1[0] = Math.floor(d0[0]);
                d1[1] = d1[0] + cur.img_space;
            }
            cur.img_range = d1;
            that._correct_selection_range();
            // console.log(d3.event.selection, "--- d3.event.selection");
            d3__WEBPACK_IMPORTED_MODULE_1__["select"](this).call(d3__WEBPACK_IMPORTED_MODULE_1__["event"].target.move, cur.img_range.map(xScale));
            that.renderImages();
        });
        const bRender = layers.brush.call(b).call(b.move, cur.img_range.map(xScale));
        bRender.selectAll('.handle').remove();
        bRender.selectAll('.overlay').attr('pointer-events', 'none');
    }
    renderImages(renderData = this.renderData) {
        const cur = this._current;
        // map sort order to elements: i=data array index, s=sort index, d=data
        const selection = d3__WEBPACK_IMPORTED_MODULE_1__["range"](cur.img_range[0], cur.img_range[1])
            .map(s_index => cur.sort.s_to_i[s_index])
            .map((i, s) => ({ i, s, img: renderData.channels[i] }));
        // console.log(selection, "--- selection");
        let img_box = this.base.selectAll(".img_box")
            .data(selection);
        img_box.exit().remove();
        const img_boxEnter = img_box.enter()
            .append('div').attr('class', 'img_box');
        img_box = img_boxEnter.merge(img_box)
            .html(d => `<img src="${d.img.d}">`);
        if (renderData.ablation) {
            this.renderImageAblation(renderData);
        }
        img_box.on('mouseenter', d => this.eventHandler
            .trigger(AblationView.events.image_hovered, {
            image: d.img.d,
            hovered: true
        }));
        img_box.on('mouseleave', d => this.eventHandler
            .trigger(AblationView.events.image_hovered, {
            image: d.img.d,
            hovered: false
        }));
    }
    actionChangeAblationValue(i, v) {
        console.log(i, v, "--- i,v");
        if (v === undefined) {
            delete this._current.ablation_changes[i];
        }
        else {
            this._current.ablation_changes[i] = v;
        }
        _etc_URLHandler__WEBPACK_IMPORTED_MODULE_4__["default"].updateURLParam('abl_chg', Object(_etc_Util__WEBPACK_IMPORTED_MODULE_2__["obj_to_arr"])(this._current.ablation_changes), true);
        this.renderImageAblation();
    }
    renderImageAblation(renderData = this.renderData) {
        const that = this;
        const cur = this._current;
        const yScale = cur.ablation_scale.copy().range([65, 5]);
        const zero = yScale(0);
        const pos1 = yScale(1);
        const neg1 = yScale(-1);
        const img_box = this.base.selectAll(".img_box");
        img_box.html((d, i) => {
            //TODO: fix this (include order)
            // const av = renderData.ablation[i];
            return `<img src="${d.img.d}"><div>
                <svg width="40" height="70">
                <rect class="bar" x="3" width="10" height="40"></rect>
                <rect class="pos_marker pos1" x="15" y="${pos1 - 5}" width="20" height="10"></rect>
                <rect class="pos_marker reset" x="15" y="${(pos1 + zero) / 2 - 5}" width="20" height="10"></rect> 
                <rect class="pos_marker zero" x="15" y="${zero - 5}" width="20" height="10"></rect>
                <text class="pos_marker_text" x="25" y="${pos1}"> 1 </text>
                <text class="pos_marker_text" x="25" y="${zero}"> 0 </text>
                <text class="pos_marker_text" x="25" y="${(pos1 + zero) / 2}"> orig </text>
                </svg></div>`;
        });
        img_box.selectAll('.bar')
            .data((d, i) => {
            const ab_chg = cur.ablation_changes[d.i];
            if (ab_chg !== undefined) {
                return [ab_chg];
            }
            else {
                return [renderData.ablation[d.i]];
            }
        })
            .attrs({
            class: d => (d >= 0) ? "bar pos" : 'bar neg',
            // x: 3,
            y: (d) => (d >= 0) ? yScale(d) : zero,
            height: (d) => (d >= 0) ? zero - yScale(d) : yScale(d) - zero,
        });
        img_box.selectAll('.pos_marker').data(d => [d, d, d])
            .classed('selected', function (d) {
            const me = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this);
            const v = cur.ablation_changes[d.i];
            return (me.classed('reset') && v === undefined)
                || (me.classed('pos1') && v === 1)
                || (me.classed('zero') && v === 0);
        })
            .on('click', function (d) {
            const me = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this);
            let new_value = undefined;
            // if (me.classed('reset')) newValue = null;
            if (me.classed('zero'))
                new_value = 0;
            if (me.classed('pos1'))
                new_value = 1;
            that.eventHandler.trigger(AblationView.events.ablation_changed, { i: d.i, new_value });
        });
    }
    _wrangle(data) {
        if (!data.ablation) {
            const rnd = d3__WEBPACK_IMPORTED_MODULE_1__["randomNormal"]();
            data.ablation = d3__WEBPACK_IMPORTED_MODULE_1__["range"](data.channels.length).map(() => rnd());
            //data.channels.length
        }
        if (data.ablation) {
            const ab_min_max = d3__WEBPACK_IMPORTED_MODULE_1__["extent"](data.ablation);
            if (ab_min_max[0] > 0)
                ab_min_max[0] = 0;
            if (ab_min_max[1] < 1)
                ab_min_max[1] = 1;
            this._current.ablation_scale.domain(ab_min_max);
            this._current.sort.s_to_i = Object(_etc_Util__WEBPACK_IMPORTED_MODULE_2__["argsort"])(data.ablation, (a, b) => b - a);
            this._current.sort.i_to_s = d3__WEBPACK_IMPORTED_MODULE_1__["range"](this._current.sort.s_to_i.length);
            this._current.sort.s_to_i.forEach((i, s) => this._current.sort.i_to_s[i] = s);
        }
        return data;
    }
    //
    // public set z(_z) {
    //     this.data.z = _z;
    //     this.renderData = this._wrangle(this.data);
    //     this._render();
    // }
    //
    // public get z() {
    //     return this.data.z;
    // }
    set ablation(_a) {
        this.data.ablation = _a;
        this.renderData = this._wrangle(this.data);
        this._render();
    }
    get ablation_modified() {
        const ab_c = this._current.ablation_changes;
        return this.data.ablation.map((d, i) => (i in ab_c) ? ab_c[i] : d);
    }
    reset_all() {
        this._current.ablation_changes = {};
        _etc_URLHandler__WEBPACK_IMPORTED_MODULE_4__["default"].updateURLParam('abl_chg', Object(_etc_Util__WEBPACK_IMPORTED_MODULE_2__["obj_to_arr"])(this._current.ablation_changes), true);
        this.renderImageAblation();
    }
}
AblationView.events = {
    image_hovered: 'AblationView_ih',
    ablation_changed: 'AblationView_abch',
};


/***/ }),

/***/ "./ts/vis/BarchartCanvas.ts":
/*!**********************************!*\
  !*** ./ts/vis/BarchartCanvas.ts ***!
  \**********************************/
/*! exports provided: BarchartCanvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarchartCanvas", function() { return BarchartCanvas; });
/* harmony import */ var _VisComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VisComponent */ "./ts/vis/VisComponent.ts");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/d3/index.js");


class BarchartCanvas extends _VisComponent__WEBPACK_IMPORTED_MODULE_0__["VComponent"] {
    constructor(d3parent, eventHandler) {
        super(d3parent, eventHandler);
        // public static events = {
        //     request_examples: "ExampleView_re",
        //     apply_recipe: "ExampleView_ar"
        // }
        this._current = {};
        this.css_name = "BarchartCanvas";
        this.options = {
            pos: { x: 0, y: 0 },
            w: 200,
            h: 100
        };
        this.superInitHTML();
        this._init();
    }
    _init() {
        const op = this.options;
        this.c = this.base.append('canvas').attrs({
            width: op.w,
            height: op.h
        }).style('position', 'absolute').node()
            .getContext("2d");
        this.svg = this.base.append('svg').attrs({
            width: op.w,
            height: op.h
        }).style('position', 'absolute');
        this.svg.append('g').call(d3__WEBPACK_IMPORTED_MODULE_1__["brushX"]().extent([[0, 0], [op.w, op.h]])
            .on("end", () => {
            console.log("--- bEnd");
        }));
    }
    _render(rData = this.renderData) {
        const op = this.options;
        this.c.clearRect(0, 0, op.w, op.h);
        const yMinMax = d3__WEBPACK_IMPORTED_MODULE_1__["extent"](rData.values);
        if (yMinMax[0] > 0)
            yMinMax[0] = 0;
        const yScale = d3__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"]()
            .domain(yMinMax)
            .range([op.h - 4, 2]);
        const xScale = d3__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"]()
            .domain([0, rData.values.length])
            .range([2, op.w - 4]);
        const barWidth = xScale(1) - xScale(0);
        const yZero = yScale(0);
        const rD = d3__WEBPACK_IMPORTED_MODULE_1__["zip"](rData.values, rData.ids);
        this.c.beginPath();
        this.c.fillStyle = 'red';
        rData.values.forEach((v, i) => {
            if (v >= 0) {
                this.c.fillRect(xScale(i), yScale(v), barWidth, yZero - yScale(v));
            }
            else {
                this.c.fillRect(xScale(i), yZero, barWidth, yScale(v) - yZero);
            }
        });
        // this.c.fillRect(10, 10, 20, 20);
        this.c.closePath();
    }
    _wrangle(data) {
        // data.values = data.values.sort();
        return data;
    }
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHQxLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY3NzL3B0MS5zY3NzIiwid2VicGFjazovLy8uL3RzL2FwaS9HYW50ZXJBUEkudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvZXRjL0dsb2JhbFZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvZXRjL1NWR3BsdXMudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvZXRjL1NpbXBsZUV2ZW50SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi90cy9ldGMvVVJMSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi90cy9ldGMvVXRpbC50cyIsIndlYnBhY2s6Ly8vLi90cy9wdDEudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdmlzL0FibGF0aW9uVmlldy50cyIsIndlYnBhY2s6Ly8vLi90cy92aXMvQmFyY2hhcnRDYW52YXMudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdmlzL0V4YW1wbGVWaWV3LnRzIiwid2VicGFjazovLy8uL3RzL3Zpcy9WaXNDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QztnQkFDbkIsU0FBUyxFQUFFLENBQUM7Z0JBQ1osZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsU0FBUyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLDBCQUEwQjtTQUU3QjtJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QixDQUFDOztBQXZORCw2RUFBNkU7QUFFN0U7OztHQUdHO0FBRUksaUJBQU0sR0FBTyxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxDQUFDIiwiZmlsZSI6InB0MS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicHQxXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi90cy9wdDEudHNcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInB0MS5odG1sXCI7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLypcbkdhbnRlciBBUEkgYW5kIFR5cGVzXG4gKi9cblxuaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzXCI7XG5cbmV4cG9ydCB0eXBlIEFibGF0aW9uRGF0YSA9IHtcbiAgICBjaGFubmVsczogeyBkOiBzdHJpbmcsIGlkOiBudW1iZXIgfVtdLFxuICAgIGFibGF0aW9uOiBudW1iZXJbXSB8IG51bGwsXG4gICAgLy8gejogbnVtYmVyW10gfCBudWxsXG59XG5cbmV4cG9ydCB0eXBlIEFibGF0aW9uVXBsb2FkID0ge1xuICAgIGFscGhhOiBudW1iZXIsIGxheWVyOiBzdHJpbmcsIHVuaXQ6IG51bWJlciwgdmFsdWU/OiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgUmVjaXBlID0ge1xuICAgIGxheWVyOiBzdHJpbmcsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHVuaXQ6IHsgYWxwaGE6IG51bWJlciwgdW5pdDogbnVtYmVyIH1bXVxufVxuXG5leHBvcnQgdHlwZSBSYW5raW5nID0ge1xuICAgIG1ldHJpYzogc3RyaW5nLFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBzY29yZXM6IG51bWJlcltdXG59XG5cblxuZXhwb3J0IHR5cGUgQVBJX1Byb2plY3QgPSB7XG4gICAgcHJvamVjdDogc3RyaW5nXG4gICAgaW5mbzoge1xuICAgICAgICBsYXllcnM6IHN0cmluZ1tdXG4gICAgfVxuXG59XG5cbmV4cG9ydCB0eXBlIEFQSV9BbGxQcm9qZWN0ID0gQVBJX1Byb2plY3RbXVxuZXhwb3J0IHR5cGUgQVBJX0NoYW5uZWxzID0ge1xuICAgIHJlcXVlc3Q6IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICAgcmVzOiBBYmxhdGlvbkRhdGFcbn1cblxuZXhwb3J0IHR5cGUgQVBJX1JlY2lwZXMgPSB7XG4gICAgcmVxdWVzdDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSxcbiAgICByZXM6IFJlY2lwZVtdXG59XG5cbmV4cG9ydCB0eXBlIEFQSV9SYW5raW5ncyA9IHtcbiAgICByZXF1ZXN0OiB7IHByb2plY3Q6IHN0cmluZywgbGF5ZXI6IHN0cmluZyB9LFxuICAgIHJlczogUmFua2luZ1tdXG59XG5cblxuZXhwb3J0IHR5cGUgR0FOVW5pdCA9IHtcbiAgICB1bml0OiBudW1iZXIsIGltZzogc3RyaW5nLCBsYWJlbDogc3RyaW5nXG59XG5leHBvcnQgdHlwZSBBUElfdW5pdHMgPSB7XG4gICAgcmVxdWVzdDogeyBwcm9qZWN0OiBzdHJpbmcsIGxheWVyOiBzdHJpbmcgfSxcbiAgICByZXM6IEdBTlVuaXRbXVxufVxuXG5cbmV4cG9ydCB0eXBlIEFQSV9nZW5lcmF0ZSA9IHtcbiAgICByZXF1ZXN0OiB7XG4gICAgICAgIFwiYWJsYXRpb25zXCI6XG4gICAgICAgICAgICBBYmxhdGlvblVwbG9hZFtdIHwgbnVsbCxcbiAgICAgICAgXCJpZHNcIjogbnVtYmVyW10sXG4gICAgICAgIFwicHJvamVjdFwiOiBzdHJpbmcsXG4gICAgICAgIFwid2FudHpcIjogYm9vbGVhblxuICAgIH0sXG4gICAgcmVzOiB7IGQ6IHN0cmluZywgaWQ/OiBudW1iZXIgfVtdXG59XG5cbmV4cG9ydCB0eXBlIEltYWdlTWFzayA9IHtcbiAgICBpZDogc3RyaW5nLFxuICAgIG1hc2s6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBBUElfRmVhdHVyZU1hc2sgPSB7XG4gICAgYml0Ym91bmRzOiBudW1iZXJbXSxcbiAgICBiaXRzdHJpbmc6IHN0cmluZyB8IG51bGwsXG4gICAgc2hhcGU6IG51bWJlcltdXG59XG5cbmV4cG9ydCB0eXBlIEFQSV9nZW5GZWF0dXJlcyA9IHtcbiAgICByZXF1ZXN0OiB7XG4gICAgICAgIGFibGF0aW9uczpcbiAgICAgICAgICAgIEFibGF0aW9uVXBsb2FkW10gfCBudWxsLFxuICAgICAgICBpZHM6IG51bWJlcltdLFxuICAgICAgICBtYXNrczogc3RyaW5nW10sXG4gICAgICAgIHByb2plY3Q6IHN0cmluZyxcblxuICAgIH0sXG4gICAgcmVzOiB7IGQ6IHN0cmluZywgaWQ/OiBudW1iZXIgfVtdXG59XG5cblxudHlwZSBBUElfTGV2ZWxzID17XG4gICAgcmVxdWVzdDp7XG4gICAgICAgIGxheWVyOnN0cmluZyxcbiAgICAgICAgcHJvamVjdDpzdHJpbmcsXG4gICAgICAgIHF1YW50aWxlczpudW1iZXJbXVxuICAgIH0sXG4gICAgcmVzOm51bWJlcltdW11cbn1cblxuZXhwb3J0IGNsYXNzIEdhbnRlckFQSSB7XG5cbiAgICBzdGF0aWMgYWxsUHJvamVjdHMoKTogUHJvbWlzZTxBUElfQWxsUHJvamVjdD4ge1xuICAgICAgICByZXR1cm4gZDMuanNvbignL2FwaS9hbGxfcHJvamVjdHMnKVxuICAgIH1cblxuICAgIHN0YXRpYyBhYmxhdGlvbkNoYW5uZWxzKHByb2plY3Q6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllciA9IFwibGF5ZXIyXCIpOiBQcm9taXNlPEFQSV9DaGFubmVscz4ge1xuICAgICAgICByZXR1cm4gZDMuanNvbihgL2FwaS9jaGFubmVscz9wcm9qZWN0PSR7cHJvamVjdH0mbGF5ZXI9JHtsYXllcn1gKVxuICAgIH1cblxuICAgIHN0YXRpYyByZWNpcGVzKHByb2plY3Q6IHN0cmluZyk6IFByb21pc2U8QVBJX1JlY2lwZXM+IHtcbiAgICAgICAgcmV0dXJuIGQzLmpzb24oYC9hcGkvcmVjaXBlcz9wcm9qZWN0PSR7cHJvamVjdH1gKVxuICAgIH1cblxuICAgIHN0YXRpYyByYW5raW5ncyhwcm9qZWN0OiBzdHJpbmcsIGxheWVyOiBzdHJpbmcpOiBQcm9taXNlPEFQSV9SYW5raW5ncz4ge1xuICAgICAgICByZXR1cm4gZDMuanNvbihgL2FwaS9yYW5raW5ncz9wcm9qZWN0PSR7cHJvamVjdH0mbGF5ZXI9JHtsYXllcn1gKVxuICAgIH1cblxuXG4gICAgc3RhdGljIGxldmVscyhwcm9qZWN0OiBzdHJpbmcsIGxheWVyOiBzdHJpbmcsIHE6bnVtYmVyPTAuOTkpOiBQcm9taXNlPEFQSV9MZXZlbHM+IHtcbiAgICAgICAgLy8uLi9hcGkvbGV2ZWxzP3Byb2plY3Q9Y2h1cmNob3V0ZG9vciZsYXllcj1sYXllcjQmcXVhbnRpbGVzPTAuOTlcbiAgICAgICAgcmV0dXJuIGQzLmpzb24oYC9hcGkvbGV2ZWxzP3Byb2plY3Q9JHtwcm9qZWN0fSZsYXllcj0ke2xheWVyfSZxdWFudGlsZXM9JHtxfWApXG5cbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZW5lcmF0ZUltZ3MocHJvamVjdDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBudW1iZXJbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbnR6ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFibGF0aW9uczogQWJsYXRpb25VcGxvYWRbXSA9IFtdKTogUHJvbWlzZTxBUElfZ2VuZXJhdGU+IHtcbiAgICAgICAgcmV0dXJuIGQzLmpzb24oJy9hcGkvZ2VuZXJhdGUnLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIFwiYWJsYXRpb25zXCI6IGFibGF0aW9ucyxcbiAgICAgICAgICAgICAgICBcInByb2plY3RcIjogcHJvamVjdCxcbiAgICAgICAgICAgICAgICBcImlkc1wiOiBpZHMsXG4gICAgICAgICAgICAgICAgXCJ3YW50elwiOiB3YW50elxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdlbmVyYXRlSW1nc0ludGVydmVudGlvbihwcm9qZWN0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHM6IG51bWJlcltdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FudHogPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJsYXRpb25fcm06IEFibGF0aW9uVXBsb2FkW10gPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFibGF0aW9uX2NwOiBBYmxhdGlvblVwbG9hZFtdID0gW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrX2NwOiBBUElfRmVhdHVyZU1hc2tcbiAgICApOiBQcm9taXNlPEFQSV9nZW5lcmF0ZT4ge1xuXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICAvLyBcImFibGF0aW9uc1wiOiBhYmxhdGlvbnMsXG4gICAgICAgICAgICBcInByb2plY3RcIjogcHJvamVjdCxcbiAgICAgICAgICAgIFwiaWRzXCI6IGlkcyxcbiAgICAgICAgICAgIFwid2FudHpcIjogd2FudHosXG4gICAgICAgICAgICBcImludGVydmVudGlvbnNcIjogW1xuICAgICAgICAgICAgICAgIHthYmxhdGlvbnM6IGFibGF0aW9uX3JtfSxcbiAgICAgICAgICAgICAgICB7YWJsYXRpb25zOiBhYmxhdGlvbl9jcCwgbWFzazogbWFza19jcH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHBheWxvYWQsIFwiLS0tIHBheWxvYWRcIik7XG5cbiAgICAgICAgcmV0dXJuIGQzLmpzb24oJy9hcGkvZ2VuZXJhdGUnLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHVuaXRzKHByb2plY3Q6IHN0cmluZywgbGF5ZXI6IHN0cmluZyk6IFByb21pc2U8QVBJX3VuaXRzPiB7XG4gICAgICAgIHJldHVybiBkMy5qc29uKGAvYXBpL3VuaXRzP3Byb2plY3Q9JHtwcm9qZWN0fSZsYXllcj0ke2xheWVyfWApXG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZ2VuZXJhdGVGZWF0dXJlcyhwcm9qZWN0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hc2tzOiBJbWFnZU1hc2tbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllcnM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFibGF0aW9uczogQWJsYXRpb25VcGxvYWRbXSA9IFtdKTogUHJvbWlzZTxBUElfZ2VuRmVhdHVyZXM+IHtcbiAgICAgICAgLypcbiAgICAgICAgcHJvamVjdCA9IGZlYXRfcmVxWydwcm9qZWN0J11cbiAgICAgICAgaWRzID0gZmVhdF9yZXFbJ2lkcyddXG4gICAgICAgIG1hc2tzID0gZmVhdF9yZXEuZ2V0KCdtYXNrcycsIE5vbmUpXG4gICAgICAgIGxheWVycyA9IGZlYXRfcmVxLmdldCgnbGF5ZXJzJywgTm9uZSlcbiAgICAgICAgYWJsYXRpb25zID0gZmVhdF9yZXEuZ2V0KCdhYmxhdGlvbnMnLCBbXSlcbiAgICAgICAgKi9cblxuXG4gICAgICAgIGNvbnN0IGlkcyA9IGltYXNrcy5tYXAoZCA9PiBkLmlkKTtcbiAgICAgICAgY29uc3QgbWFza3MgPSBpbWFza3MubWFwKGQgPT4gKHtcbiAgICAgICAgICAgIHNoYXBlOiBbXSxcbiAgICAgICAgICAgIGJpdGJvdW5kczogW10sXG4gICAgICAgICAgICBiaXRzdHJpbmc6IGQubWFza1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgcmV0dXJuIGQzLmpzb24oJy9hcGkvZmVhdHVyZXMnLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGFibGF0aW9ucyxcbiAgICAgICAgICAgICAgICBwcm9qZWN0LFxuICAgICAgICAgICAgICAgIGlkcyxcbiAgICAgICAgICAgICAgICBtYXNrcyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZW5lcmF0ZUZlYXR1cmVzTG9jYWwocHJvamVjdDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBudW1iZXJbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyczogc3RyaW5nW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrczogQVBJX0ZlYXR1cmVNYXNrW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYmxhdGlvbnM6IEFibGF0aW9uVXBsb2FkW10gPSBbXSk6IFByb21pc2U8QVBJX2dlbkZlYXR1cmVzPiB7XG4gICAgICAgIC8qXG4gICAgICAgIHByb2plY3QgPSBmZWF0X3JlcVsncHJvamVjdCddXG4gICAgICAgIGlkcyA9IGZlYXRfcmVxWydpZHMnXVxuICAgICAgICBtYXNrcyA9IGZlYXRfcmVxLmdldCgnbWFza3MnLCBOb25lKVxuICAgICAgICBsYXllcnMgPSBmZWF0X3JlcS5nZXQoJ2xheWVycycsIE5vbmUpXG4gICAgICAgIGFibGF0aW9ucyA9IGZlYXRfcmVxLmdldCgnYWJsYXRpb25zJywgW10pXG4gICAgICAgICovXG5cblxuICAgICAgICAvLyBjb25zdCBpZHMgPSBpbWFza3MubWFwKGQgPT4gZC5pZCk7XG4gICAgICAgIC8vIGNvbnN0IG1hc2tzID0gaW1hc2tzLm1hcChkID0+ICh7XG4gICAgICAgIC8vICAgICBzaGFwZTogW10sXG4gICAgICAgIC8vICAgICBiaXRib3VuZHM6IFtdLFxuICAgICAgICAvLyAgICAgYml0c3RyaW5nOiBkLm1hc2tcbiAgICAgICAgLy8gfSkpO1xuXG4gICAgICAgIG1hc2tzLmZvckVhY2gobWFzayA9PiB7XG4gICAgICAgICAgICBpZiAobWFzay5iaXRzdHJpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJiID0gbWFzay5iaXRib3VuZHM7XG4gICAgICAgICAgICAgICAgY29uc3QgYml0cyA9IChiYlsyXSAtIGJiWzBdKSAqIChiYlszXSAtIGJiWzFdKTtcbiAgICAgICAgICAgICAgICBtYXNrLmJpdHN0cmluZyA9ICcxJy5yZXBlYXQoYml0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgcmV0dXJuIGQzLmpzb24oJy9hcGkvZmVhdHVyZXMnLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGFibGF0aW9ucyxcbiAgICAgICAgICAgICAgICBwcm9qZWN0LFxuICAgICAgICAgICAgICAgIGlkcyxcbiAgICAgICAgICAgICAgICBtYXNrcyxcbiAgICAgICAgICAgICAgICBsYXllcnNcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbn1cblxuIiwiZXhwb3J0IGNvbnN0IEdsb2JhbEV2ZW50cyA9IHtcbiAgICB3aW5kb3dfcmVzaXplOiAnR2xvYmFsRXZlbnRzX3dyJyxcbiAgICBtYWluX3Jlc2l6ZTogJ0dsb2JhbEV2ZW50c19tcidcbn0iLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiZDNcIlxuXG4vKipcbiAqIENyZWF0ZWQgYnkgaGVuIG9uIDUvMTUvMTcuXG4gKi9cbmV4cG9ydCBjbGFzcyBTVkcge1xuICAgIHN0YXRpYyB0cmFuc2xhdGUoe3gsIHl9KSB7XG4gICAgICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIHggKyBcIixcIiArIHkgKyBcIilcIlxuICAgIH1cblxuICAgIHN0YXRpYyBncm91cChwYXJlbnQsIGNsYXNzZXMsIHBvcyA9IHt4OiAwLCB5OiAwfSkge1xuICAgICAgICByZXR1cm4gcGFyZW50LmFwcGVuZCgnZycpLmF0dHJzKHtcbiAgICAgICAgICAgIGNsYXNzOiBjbGFzc2VzLFxuICAgICAgICAgICAgXCJ0cmFuc2Zvcm1cIjogU1ZHLnRyYW5zbGF0ZShwb3MpXG4gICAgICAgIH0pXG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBTVkdNZWFzdXJlbWVudHMge1xuXG4gICAgcHJpdmF0ZSBtZWFzdXJlRWxlbWVudDogZDMuU2VsZWN0aW9uPGFueSwgYW55LCBhbnksIGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcihiYXNlRWxlbWVudCwgY2xhc3NlcyA9ICcnKSB7XG4gICAgICAgIHRoaXMubWVhc3VyZUVsZW1lbnQgPSBiYXNlRWxlbWVudC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHJzKHt4OiAwLCB5OiAtMjAsIGNsYXNzOiBjbGFzc2VzfSlcblxuICAgIH1cblxuICAgIHRleHRMZW5ndGgodGV4dCwgc3R5bGUgPSBudWxsKSB7XG4gICAgICAgIHRoaXMubWVhc3VyZUVsZW1lbnQuYXR0cignc3R5bGUnLCBzdHlsZSk7XG4gICAgICAgIHRoaXMubWVhc3VyZUVsZW1lbnQudGV4dCh0ZXh0KTtcbiAgICAgICAgY29uc3QgdGwgPSAoPFNWR1RleHRFbGVtZW50PiB0aGlzLm1lYXN1cmVFbGVtZW50Lm5vZGUoKSkuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCk7XG4gICAgICAgIHRoaXMubWVhc3VyZUVsZW1lbnQudGV4dCgnJyk7XG5cbiAgICAgICAgcmV0dXJuIHRsO1xuICAgIH1cbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgaGVuIG9uIDUvMTUvMTcuXG4gKi9cbmV4cG9ydCBjbGFzcyBTaW1wbGVFdmVudEhhbmRsZXIge1xuXG4gICAgZWxlbWVudDogRWxlbWVudDtcbiAgICBldmVudExpc3RlbmVyczogb2JqZWN0W107XG5cblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycyA9IFtdXG4gICAgfVxuXG5cbiAgICBiaW5kKGV2ZW50TmFtZXM6IHN0cmluZywgZXZlbnRGdW5jdGlvbjogRnVuY3Rpb24pIHtcbiAgICAgICAgZm9yIChjb25zdCBldmVudE5hbWUgb2YgZXZlbnROYW1lcy5zcGxpdCgnICcpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzLnB1c2goe2V2ZW50TmFtZSwgZXZlbnRGdW5jdGlvbn0pO1xuICAgICAgICAgICAgY29uc3QgZXZlbnRGdW5jdGlvbldyYXAgPSBlID0+IGV2ZW50RnVuY3Rpb24oZS5kZXRhaWwsIGUpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEZ1bmN0aW9uV3JhcCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TGlzdGVuZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudExpc3RlbmVycztcbiAgICB9XG5cbiAgICB0cmlnZ2VyKGV2ZW50TmFtZTogc3RyaW5nLCBkZXRhaWw6IG9iamVjdCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7ZGV0YWlsfSkpO1xuICAgIH1cblxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBoZW4gb24gNS8xNS8xNy5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVUkxIYW5kbGVyIHtcblxuICAgIHN0YXRpYyBiYXNpY1VSTCgpIHtcbiAgICAgICAgY29uc3QgdXJsX3BhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKS5zbGljZSgwLCAtMikuam9pbignLycpO1xuXG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgKHVybF9wYXRoLmxlbmd0aCA/IHVybF9wYXRoIDogJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWQgYWxsIFVSTCBwYXJhbWV0ZXJzIGludG8gYSBtYXAuXG4gICAgICogQHJldHVybnMge01hcH0gdGhlIHVybCBwYXJhbWV0ZXJzIGFzIGEga2V5LXZhbHVlIHN0b3JlIChFUzYgbWFwKVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgcGFyYW1ldGVycygpOiBvYmplY3Qge1xuICAgICAgICAvLyBBZGFwdGVkIGZyb206ICBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIwOTA1NTEvcGFyc2UtcXVlcnktc3RyaW5nLWluLWphdmFzY3JpcHRcbiAgICAgICAgY29uc3QgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcbiAgICAgICAgY29uc3QgdmFycyA9IHF1ZXJ5LnNwbGl0KCcmJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHZhcnMsIFwiLS0tIHZhcnNcIik7XG5cbiAgICAgICAgY29uc3QgdXJsUGFyYW1ldGVycyA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGlzSW50ID0geCA9PiAoL15bMC05XSskLykudGVzdCh4KTtcbiAgICAgICAgY29uc3QgaXNGbG9hdCA9IHggPT4gKC9eWzAtOV0rXFwuWzAtOV0qJC8pLnRlc3QoeCk7XG5cbiAgICAgICAgY29uc3QgdHlwZUNhc3QgPSB2YWwgPT4ge1xuICAgICAgICAgICAgaWYgKGlzSW50KHZhbCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHZhbCwgMTApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0Zsb2F0KHZhbCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyLnBhcnNlRmxvYXQodmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGVsc2U6XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG5cblxuICAgICAgICB2YXJzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICBpZiAodi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BsaXRzID0gdi5zcGxpdCgnPScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChzcGxpdHNbMF0pO1xuICAgICAgICAgICAgICAgIGxldCByYXdfdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQoc3BsaXRzWzFdKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGlzQXJyYXkgPSByYXdfdmFsdWUuc3RhcnRzV2l0aCgnLi4nKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICByYXdfdmFsdWUgPSByYXdfdmFsdWUuc2xpY2UoMik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJhd192YWx1ZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybFBhcmFtZXRlcnNba2V5XSA9IGlzQXJyYXkgPyBbXSA6ICcnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICB1cmxQYXJhbWV0ZXJzW2tleV0gPSByYXdfdmFsdWUuc3BsaXQoJywnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCh2YWwgPT4gdHlwZUNhc3QodmFsKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsUGFyYW1ldGVyc1trZXldID0gdHlwZUNhc3QocmF3X3ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB1cmxQYXJhbWV0ZXJzO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYW4gVVJMIHN0cmluZyBmcm9tIGEgbWFwIG9mIHVybCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIHt7fX0gdXJsUGFyYW1ldGVycyAtIHRoZSBtYXAgb2YgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gYW4gVVJJIHN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyB1cmxTdHJpbmcodXJsUGFyYW1ldGVyczogb2JqZWN0KSB7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBbXTtcbiAgICAgICAgT2JqZWN0LmtleXModXJsUGFyYW1ldGVycykuZm9yRWFjaChrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSB1cmxQYXJhbWV0ZXJzW2tdO1xuICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHY7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodikpIHZhbHVlID0gJy4uJyArIHYuam9pbignLCcpO1xuICAgICAgICAgICAgICAgIGF0dHIucHVzaChlbmNvZGVVUkkoayArICc9JyArIHZhbHVlKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIGxldCByZXMgPSB1cmwuc3Vic3RyaW5nKHVybC5sYXN0SW5kZXhPZignLycpICsgMSk7XG4gICAgICAgIGlmIChhdHRyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlcyArPSAnPycgKyBhdHRyLmpvaW4oJyYnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBkYXRlVVJMUGFyYW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBhbnlbXSwgYWRkVG9Ccm93c2VySGlzdG9yeSA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFBhcmFtcyA9IFVSTEhhbmRsZXIucGFyYW1ldGVycztcbiAgICAgICAgY3VycmVudFBhcmFtc1trZXldID0gdmFsdWU7XG4gICAgICAgIFVSTEhhbmRsZXIudXBkYXRlVXJsKGN1cnJlbnRQYXJhbXMsIGFkZFRvQnJvd3Nlckhpc3RvcnkpO1xuICAgIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIEdlbmVyYXRlcyBhIGtleS12YWx1ZSBtYXAgb2YgYWxsIFVSTCBwYXJhbXMgYW5kIHJlcGxhY2VzIHJlcGxhY2VLZXlzXG4gICAgLy8gICogQHBhcmFtIHVwZGF0ZUtleXNcbiAgICAvLyAgKi9cbiAgICAvLyBzdGF0aWMgdXBkYXRlVVJMUGFyYW1zKHVwZGF0ZUtleXMpIHtcbiAgICAvLyAgICAgY29uc3QgY3VycmVudFBhcmFtcyA9IFVSTEhhbmRsZXIucGFyYW1ldGVycztcbiAgICAvLyAgICAgT2JqZWN0LmtleXModXBkYXRlS2V5cykuZm9yRWFjaCgoaykgPT4gY3VycmVudFBhcmFtc1trXSA9IHVwZGF0ZUtleXNba10pXG4gICAgLy8gICAgIHJldHVybiBjdXJyZW50UGFyYW1zO1xuICAgIC8vIH1cblxuXG4gICAgc3RhdGljIHVwZGF0ZVVybCh1cmxQYXJhbWV0ZXJzOiBvYmplY3QsIGFkZFRvQnJvd3Nlckhpc3RvcnkgPSB0cnVlKSB7XG4gICAgICAgIGlmIChhZGRUb0Jyb3dzZXJIaXN0b3J5KSB7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUodXJsUGFyYW1ldGVycywgJycsXG4gICAgICAgICAgICAgICAgVVJMSGFuZGxlci51cmxTdHJpbmcodXJsUGFyYW1ldGVycykpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUodXJsUGFyYW1ldGVycywgJycsXG4gICAgICAgICAgICAgICAgVVJMSGFuZGxlci51cmxTdHJpbmcodXJsUGFyYW1ldGVycykpXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgKiBhcyBkMyBmcm9tIFwiZDNcIjtcblxuLyoqXG4gKiBDcmVhdGVkIGJ5IGhlbiBvbiA1LzE1LzE3LlxuICovXG5sZXQgdGhlX3VuaXF1ZV9pZF9jb3VudGVyID0gMDtcblxuZXhwb3J0IGNsYXNzIFV0aWwge1xuICAgIHN0YXRpYyBzaW1wbGVVSWQoe3ByZWZpeCA9ICcnfSk6IHN0cmluZyB7XG4gICAgICAgIHRoZV91bmlxdWVfaWRfY291bnRlciArPSAxO1xuXG4gICAgICAgIHJldHVybiBwcmVmaXggKyB0aGVfdW5pcXVlX2lkX2NvdW50ZXI7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEM1NlbCA9IGQzLlNlbGVjdGlvbjxhbnksIGFueSwgYW55LCBhbnk+XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmdzb3J0KGFycmF5LCBzb3J0RmN0KTpudW1iZXJbXSB7XG4gICAgcmV0dXJuIGFycmF5XG4gICAgICAgIC5tYXAoKGQsIGkpID0+IFtkLCBpXSlcbiAgICAgICAgLnNvcnQoKGEsYikgPT4gc29ydEZjdChhWzBdLCBiWzBdKSlcbiAgICAgICAgLm1hcChkID0+IGRbMV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2UoZW5kKXtcbiAgICByZXR1cm4gWy4uLkFycmF5KGVuZCkua2V5cygpXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JqX3RvX2FycihvYmo6b2JqZWN0KXtcbiAgICBjb25zdCBzb3J0ZWRLZXlzID0gT2JqZWN0LmtleXMob2JqKS5zb3J0KCk7XG4gICAgY29uc3QgcmVzPVtdO1xuICAgIHNvcnRlZEtleXMuZm9yRWFjaChrID0+IHtyZXMucHVzaChrKTsgcmVzLnB1c2gob2JqW2tdKX0pXG4gICAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycl90b19vYmooYXJyOmFueSl7XG4gICAgY29uc3QgcmVzPXt9O1xuICAgIGNvbnN0IG1heF9sID0gTWF0aC5mbG9vcihhcnIubGVuZ3RoLzIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpPG1heF9sOyBpKyspe1xuICAgICAgICByZXNbYXJyWzIqaV1dID0gYXJyWzIqaSsxXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnXG5pbXBvcnQgXCJkMy1zZWxlY3Rpb24tbXVsdGlcIjtcblxuaW1wb3J0ICcuLi9jc3MvcHQxLnNjc3MnXG5cblxuaW1wb3J0IFwiIWZpbGUtbG9hZGVyP25hbWU9cHQxLmh0bWwhLi4vcHQxLmh0bWxcIjtcbmltcG9ydCB7U2ltcGxlRXZlbnRIYW5kbGVyfSBmcm9tIFwiLi9ldGMvU2ltcGxlRXZlbnRIYW5kbGVyXCI7XG5pbXBvcnQge0dsb2JhbEV2ZW50c30gZnJvbSBcIi4vZXRjL0dsb2JhbFZhcnNcIjtcbmltcG9ydCB7QWJsYXRpb25WaWV3fSBmcm9tIFwiLi92aXMvQWJsYXRpb25WaWV3XCI7XG5pbXBvcnQgVVJMSGFuZGxlciBmcm9tIFwiLi9ldGMvVVJMSGFuZGxlclwiO1xuaW1wb3J0IHtFeGFtcGxlVmlldywgRXhhbXBsZVZpZXdNb3VzZUV2ZW50fSBmcm9tIFwiLi92aXMvRXhhbXBsZVZpZXdcIjtcbmltcG9ydCB7QmFyY2hhcnRDYW52YXN9IGZyb20gXCIuL3Zpcy9CYXJjaGFydENhbnZhc1wiO1xuaW1wb3J0IHtHYW50ZXJBUEl9IGZyb20gXCIuL2FwaS9HYW50ZXJBUElcIjtcblxuXG5jb25zdCBnbG9iYWwgPSB7XG4gICAgc2lkZWJhcjogKCkgPT4gKDxFbGVtZW50PmQzLnNlbGVjdCgnLnNpZGVuYXYnKS5ub2RlKCkpXG4gICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxufTtcblxuXG5sZXQgZXhhbXBsZUlEcyA9IGQzLnJhbmdlKDIwLCAzMCk7XG5cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIi1oZW4tLSBcIik7XG4gICAgJCgpO1xuXG4gICAgY29uc3QgZXZlbnRIYW5kbGVyID0gbmV3IFNpbXBsZUV2ZW50SGFuZGxlcig8RWxlbWVudD5kMy5zZWxlY3QoJ2JvZHknKS5ub2RlKCkpO1xuXG4gICAgY29uc3QgcHJvamVjdF9zZWxlY3RvciA9IGQzLnNlbGVjdCgnI3Byb2plY3Rfc2VsZWN0b3InKTtcbiAgICBjb25zdCBsYXllcl9zZWxlY3RvciA9IGQzLnNlbGVjdCgnI2xheWVyX3NlbGVjdG9yJyk7XG4gICAgY29uc3QgbWFpbl92aWV3X3NlbCA9IGQzLnNlbGVjdCgnLmZsb2F0aW5nX2NvbnRlbnQnKTtcblxuICAgIGNvbnN0IGFibGF0aW9uVmlldyA9IG5ldyBBYmxhdGlvblZpZXcobWFpbl92aWV3X3NlbC5zZWxlY3QoJy5hYmxhdGlvbl9tb2RpZmllcicpLCBldmVudEhhbmRsZXIpO1xuICAgIGNvbnN0IGV4YW1wbGVWaWV3ID0gbmV3IEV4YW1wbGVWaWV3KG1haW5fdmlld19zZWwuc2VsZWN0KCcuYWJsYXRpb25fZXhhbXBsZXMnKSwgZXZlbnRIYW5kbGVyKVxuICAgIGV4YW1wbGVWaWV3LmltZ1dpZHRoPTc1O1xuXG5cbiAgICAvLyBUT0RPOiBURVNUIHN0YXJ0cyBoZXJlIC0tLS0tLS0tXG4gICAgY29uc3QgYmFyY2hhcnRUZXN0ID0gbmV3IEJhcmNoYXJ0Q2FudmFzKG1haW5fdmlld19zZWwuc2VsZWN0KCcjYmFycycpLCBldmVudEhhbmRsZXIpO1xuXG5cbiAgICBiYXJjaGFydFRlc3QudXBkYXRlKHtcbiAgICAgICAgaWRzOiBbMSwgMiwgNCwgMywgNV0sIHZhbHVlczogWy4yLCAuNCwgLjEyLCAtLjUsIC0uMl1cbiAgICB9KVxuXG5cbiAgICAvLyBUT0RPOiBURVNUIGVuZHMgaGVyZSAtLS0tLS0tLVxuXG4gICAgLy8gbGV0IHByb2plY3RzID0ge307XG4gICAgbGV0IHJlY2lwZXMgPSB7fTtcblxuICAgIGNvbnN0IHN0YXJ0X3BhcmFtcyA9IFVSTEhhbmRsZXIucGFyYW1ldGVycztcblxuICAgIEdhbnRlckFQSS5hbGxQcm9qZWN0cygpXG4gICAgICAgIC50aGVuKChwcm9qZWN0cykgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0X3NlbGVjdGVkID0gc3RhcnRfcGFyYW1zWydwcm9qZWN0J107XG5cbiAgICAgICAgICAgIGxldCBvcHRpb25zID0gcHJvamVjdF9zZWxlY3RvclxuICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ29wdGlvbicpLmRhdGEocHJvamVjdHMpO1xuICAgICAgICAgICAgb3B0aW9ucy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICBvcHRpb25zLmVudGVyKCkuYXBwZW5kKCdvcHRpb24nKVxuICAgICAgICAgICAgICAgIC5tZXJnZShvcHRpb25zKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd2YWx1ZScsIGQgPT4gZC5wcm9qZWN0KS50ZXh0KGQgPT4gZC5wcm9qZWN0KVxuICAgICAgICAgICAgICAgIC5wcm9wZXJ0eSgnc2VsZWN0ZWQnLCBkID0+IGQucHJvamVjdCA9PT0gcHJvamVjdF9zZWxlY3RlZCk7XG5cbiAgICAgICAgICAgIHByb2plY3RDaGFuZ2UocHJvamVjdF9zZWxlY3Rvci5wcm9wZXJ0eSgndmFsdWUnKSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICBwcm9qZWN0X3NlbGVjdG9yLm9uKCdjaGFuZ2UnLCBkID0+IHtcbiAgICAgICAgcHJvamVjdENoYW5nZShwcm9qZWN0X3NlbGVjdG9yLnByb3BlcnR5KCd2YWx1ZScpKTtcbiAgICB9KTtcblxuXG4gICAgZnVuY3Rpb24gcHJvamVjdENoYW5nZShwcm9qZWN0KSB7XG4gICAgICAgIFVSTEhhbmRsZXIudXBkYXRlVVJMUGFyYW0oJ3Byb2plY3QnLCBwcm9qZWN0LCBmYWxzZSk7XG4gICAgICAgIEdhbnRlckFQSS5hYmxhdGlvbkNoYW5uZWxzKHByb2plY3QpXG4gICAgICAgICAgICAudGhlbigoY2hhbm5lbFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgYWJsYXRpb25WaWV3LnVwZGF0ZShjaGFubmVsUmVzcG9uc2UucmVzKTtcbiAgICAgICAgICAgICAgICBiYXJjaGFydFRlc3QudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgaWRzOiBbXSwgdmFsdWVzOiBjaGFubmVsUmVzcG9uc2UucmVzLmFibGF0aW9uXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZWNpcGVzID0ge307XG5cbiAgICAgICAgICAgICAgICBHYW50ZXJBUEkucmVjaXBlcyhwcm9qZWN0KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVjaXBlUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlY2lwZVJlc3BvbnNlLnJlcywgXCItLS0gZGF0YS5yZXNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWNpcGVSZXNwb25zZS5yZXMuZm9yRWFjaChyZWMgPT4gcmVjaXBlc1tyZWMubmFtZV0gPSByZWMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5yZWNpcGVzJykuc2VsZWN0QWxsKCdvcHRpb24nKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLnJlY2lwZXMnKS5zZWxlY3RBbGwoJ29wdGlvbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEocmVjaXBlUmVzcG9uc2UucmVzKS5lbnRlcigpLmFwcGVuZCgnb3B0aW9uJykuYXR0cnMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkID0+IGQubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGV4dChkID0+IGQubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvcGVydHkoJ3NlbGVjdGVkJywgZCA9PiBkLm5hbWUgPT09IHN0YXJ0X3BhcmFtc1sncmVjaXBlJ10pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdChcIi5zZWxlY3RfcmVjX2J0blwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgncmVjaXBlJyBpbiBzdGFydF9wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RSZWNpcGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgR2FudGVyQVBJLmdlbmVyYXRlSW1ncyhwcm9qZWN0LCBleGFtcGxlSURzKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBleGFtcGxlVmlldy51cGRhdGUoe29yaWc6IGRhdGF9KVxuXG4gICAgICAgICAgICB9KVxuXG4gICAgfVxuXG5cbiAgICBjb25zdCBhcHBseV9idG4gPSBkMy5zZWxlY3QoJyNhcHBseV9yZWNpcGVfYnRuJyk7XG4gICAgY29uc3QgYXBwbHlfc3Bpbm5lciA9IGQzLnNlbGVjdCgnI2FwcGx5X3JlY2lwZV9zcGlubmVyJyk7XG4gICAgYXBwbHlfYnRuLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWJsID0gYWJsYXRpb25WaWV3LmFibGF0aW9uX21vZGlmaWVkO1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdF9zZWxlY3Rvci5wcm9wZXJ0eSgndmFsdWUnKTtcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBsYXllcl9zZWxlY3Rvci5wcm9wZXJ0eSgndmFsdWUnKTtcblxuICAgICAgICBhcHBseV9zcGlubmVyLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgR2FudGVyQVBJLmdlbmVyYXRlSW1ncyhwcm9qZWN0LCBleGFtcGxlSURzLCAwLFxuICAgICAgICAgICAgYWJsLm1hcCgoYWxwaGEsIHVuaXQpID0+ICh7XG4gICAgICAgICAgICAgICAgYWxwaGEsXG4gICAgICAgICAgICAgICAgbGF5ZXIsXG4gICAgICAgICAgICAgICAgdW5pdFxuICAgICAgICAgICAgfSkpKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBhcHBseV9zcGlubmVyLnN0eWxlKCdvcGFjaXR5JywgMCk7XG4gICAgICAgICAgICAgICAgZXhhbXBsZVZpZXcuYWJsYXRlZCA9IGRhdGE7XG4gICAgICAgICAgICB9KVxuICAgIH0pO1xuXG5cbiAgICBmdW5jdGlvbiBzZWxlY3RSZWNpcGUoKSB7XG4gICAgICAgIGNvbnN0IHJlY19rZXkgPSBkMy5zZWxlY3QoJy5yZWNpcGVzJykucHJvcGVydHkoJ3ZhbHVlJyk7XG4gICAgICAgIFVSTEhhbmRsZXIudXBkYXRlVVJMUGFyYW0oJ3JlY2lwZScsIHJlY19rZXkpO1xuXG4gICAgICAgIGNvbnN0IHJlYyA9IHJlY2lwZXNbcmVjX2tleV07XG4gICAgICAgIGFibGF0aW9uVmlldy5hYmxhdGlvbiA9IHJlYy51bml0Lm1hcChkID0+IGQuYWxwaGEpO1xuXG4gICAgICAgIGJhcmNoYXJ0VGVzdC51cGRhdGUoe1xuICAgICAgICAgICAgaWRzOiBbXSwgdmFsdWVzOiByZWMudW5pdC5tYXAoZCA9PiBkLmFscGhhKVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgZDMuc2VsZWN0QWxsKFwiLnNlbGVjdF9yZWNfYnRuXCIpXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKVxuICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICB9XG5cbiAgICBkMy5zZWxlY3RBbGwoXCIuc2VsZWN0X3JlY19idG5cIikub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBzZWxlY3RSZWNpcGUoKTtcbiAgICB9KTtcblxuICAgIGQzLnNlbGVjdCgnI3Jlc2V0X2FsbCcpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgYWJsYXRpb25WaWV3LnJlc2V0X2FsbCgpO1xuICAgIH0pXG5cbiAgICBkMy5zZWxlY3QoJy5yZWNpcGVzJykub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgZDMuc2VsZWN0QWxsKFwiLnNlbGVjdF9yZWNfYnRuXCIpXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKVxuICAgICAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsIG51bGwpXG4gICAgfSlcblxuXG5cbiAgICAvKlxuICAgICpcbiAgICAqKioqKiogIEdMT0JBTCBFVkVOVFMgICoqKioqKipcbiAgICAqXG4gICAgKiAqL1xuXG5cbiAgICB3aW5kb3cub25yZXNpemUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY29uc3QgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgLy8gY29uc29sZS5sb2codywgaCwgXCItLS0gdyxoXCIpO1xuXG4gICAgICAgIHJlX2xheW91dCh3LCBoKTtcblxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVfbGF5b3V0KHcsIGgpIHtcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcuc2lkZW5hdicpXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIChoIC0gNDUpICsgJ3B4JylcblxuICAgICAgICBkMy5zZWxlY3RBbGwoJy5tYWluX2ZyYW1lJylcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgKGggLSA0NSkgKyAncHgnKVxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsICh3IC0gMzAwKSArICdweCcpXG5cbiAgICAgICAgZXZlbnRIYW5kbGVyLnRyaWdnZXIoR2xvYmFsRXZlbnRzLndpbmRvd19yZXNpemUsIHt3LCBofSlcblxuICAgICAgICBldmVudEhhbmRsZXIudHJpZ2dlcihHbG9iYWxFdmVudHMubWFpbl9yZXNpemUsIHtcbiAgICAgICAgICAgIHc6ICh3IC0gZ2xvYmFsLnNpZGViYXIoKSksXG4gICAgICAgICAgICBoOiAoaCAtIDQ1KVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgcmVfbGF5b3V0KHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG5cbiAgICBldmVudEhhbmRsZXIuYmluZChBYmxhdGlvblZpZXcuZXZlbnRzLmltYWdlX2hvdmVyZWQsIGQgPT4ge1xuICAgICAgICBjb25zdCBkdCA9IGQzLnNlbGVjdCgnLnNpZGVuYXYnKS5zZWxlY3QoJy5kZXRhaWxfaW1nJyk7XG5cbiAgICAgICAgaWYgKGQuaG92ZXJlZCkge1xuICAgICAgICAgICAgZHQuaHRtbChgPGltZyBzcmM9XCIke2QuaW1hZ2V9XCIgd2lkdGg9XCIke2dsb2JhbC5zaWRlYmFyKCkgLSAxMH1cIj5gKVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkdC5odG1sKGA8c3ZnIHdpZHRoPVwiJHtnbG9iYWwuc2lkZWJhcigpIC0gMTB9XCIgaGVpZ2h0PVwiJHtnbG9iYWwuc2lkZWJhcigpIC0gMTB9XCI+YClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBldmVudEhhbmRsZXIuYmluZChFeGFtcGxlVmlldy5ldmVudHMuaG92ZXJlZF9pbWFnZV9wYWlyLCAoZDpFeGFtcGxlVmlld01vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZHQgPSBkMy5zZWxlY3QoJy5zaWRlbmF2Jykuc2VsZWN0KCcuZGV0YWlsX2ltZycpO1xuXG4gICAgICAgIGlmIChkLmhvdmVyZWQpIHtcbiAgICAgICAgICAgIGR0Lmh0bWwoZC5pbWFnZXNcbiAgICAgICAgICAgICAgICAubWFwKGltZyA9PmA8aW1nIHNyYz1cIiR7aW1nLmR9XCIgd2lkdGg9XCIke2dsb2JhbC5zaWRlYmFyKCkgLSAxMH1cIj5gIClcbiAgICAgICAgICAgICAgICAuam9pbignPGJyPicpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHQuaHRtbChgPHN2ZyB3aWR0aD1cIiR7Z2xvYmFsLnNpZGViYXIoKSAtIDEwfVwiIGhlaWdodD1cIiR7Z2xvYmFsLnNpZGViYXIoKSAtIDEwfVwiPmApXG4gICAgICAgIH1cbiAgICB9KVxuXG5cbn1cblxuXG5cbiIsImltcG9ydCB7VkNvbXBvbmVudH0gZnJvbSBcIi4vVmlzQ29tcG9uZW50XCI7XG5pbXBvcnQgKiBhcyBkMyBmcm9tIFwiZDNcIjtcbmltcG9ydCB7U2ltcGxlRXZlbnRIYW5kbGVyfSBmcm9tIFwiLi4vZXRjL1NpbXBsZUV2ZW50SGFuZGxlclwiO1xuaW1wb3J0IHthcmdzb3J0LCBhcnJfdG9fb2JqLCBEM1NlbCwgb2JqX3RvX2Fycn0gZnJvbSBcIi4uL2V0Yy9VdGlsXCI7XG5pbXBvcnQge0dsb2JhbEV2ZW50c30gZnJvbSBcIi4uL2V0Yy9HbG9iYWxWYXJzXCI7XG5pbXBvcnQge2JydXNofSBmcm9tIFwiZDNcIjtcbmltcG9ydCBVUkxIYW5kbGVyIGZyb20gXCIuLi9ldGMvVVJMSGFuZGxlclwiO1xuaW1wb3J0IHtBYmxhdGlvbkRhdGF9IGZyb20gXCIuLi9hcGkvR2FudGVyQVBJXCI7XG5cblxuXG4vLyBleHBvcnQgdHlwZSBJbWFnZU1hdHJpeEltYWdlID0geyBpbWc6IHN0cmluZzsgaWQ6IG51bWJlciwgbGFiZWw6IG51bWJlciwgcHJlZDogbnVtYmVyIH1cbi8vXG4vLyB0eXBlIEltYWdlTWF0cml4UmVuZGVyID0ge1xuLy8gICAgIGxheWVyOiBzdHJpbmc7XG4vLyAgICAgaW1hZ2VzOiBJbWFnZU1hdHJpeEltYWdlW11cbi8vIH1bXVxuXG5leHBvcnQgY2xhc3MgQWJsYXRpb25WaWV3IGV4dGVuZHMgVkNvbXBvbmVudDxBYmxhdGlvbkRhdGE+IHtcblxuICAgIHB1YmxpYyBzdGF0aWMgZXZlbnRzID0ge1xuICAgICAgICBpbWFnZV9ob3ZlcmVkOiAnQWJsYXRpb25WaWV3X2loJyxcbiAgICAgICAgYWJsYXRpb25fY2hhbmdlZDogJ0FibGF0aW9uVmlld19hYmNoJyxcblxuICAgIH07XG5cbiAgICBwcm90ZWN0ZWQgY3NzX25hbWU6IHN0cmluZyA9ICdBYmxhdGlvblZpZXcnO1xuXG5cbiAgICBwcm90ZWN0ZWQgb3B0aW9ucyA9IHtcbiAgICAgICAgcG9zOiB7eDogMCwgeTogMH0sXG4gICAgICAgIG1lYXN1cmVzOiB7XG4gICAgICAgICAgICBpbWdfd2lkdGg6IDUwLFxuICAgICAgICAgICAgaW1nX2Rpc3Q6IDUyLFxuICAgICAgICAgICAgYmFySGVpZ2h0OiAxMDAsXG4gICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMTBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcm90ZWN0ZWQgX2N1cnJlbnQgPSB7XG4gICAgICAgIHdpZHRoOiAxMDAsXG4gICAgICAgIGltZ19yYW5nZTogWzAsIDEwXSxcbiAgICAgICAgaW1nX3NwYWNlOiAxMCxcbiAgICAgICAgYWJsYXRpb25fc2NhbGU6IGQzLnNjYWxlTGluZWFyKCksXG4gICAgICAgIGFibGF0aW9uX2NoYW5nZXM6IDx7IFtrZXk6IG51bWJlcl06IG51bWJlciB9PnsxOiAxLCAzOiAwfSxcblxuICAgICAgICBzb3J0OiB7XG4gICAgICAgICAgICBpX3RvX3M6IFtdLFxuICAgICAgICAgICAgc190b19pOiBbXVxuICAgICAgICB9XG5cbiAgICB9O1xuXG5cbiAgICBwcml2YXRlIHJzOiBkMy5TZWxlY3Rpb248ZDMuQmFzZVR5cGUsIGFueSwgYW55LCBhbnk+O1xuXG5cbiAgICBjb25zdHJ1Y3RvcihkM3BhcmVudDogRDNTZWwsIGV2ZW50SGFuZGxlcj86IFNpbXBsZUV2ZW50SGFuZGxlcikge1xuICAgICAgICBzdXBlcihkM3BhcmVudCwgZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgdGhpcy5zdXBlckluaXRIVE1MKCk7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2luaXQoKSB7XG4gICAgICAgIGNvbnN0IG1zID0gdGhpcy5vcHRpb25zLm1lYXN1cmVzO1xuICAgICAgICBjb25zdCBjID0gdGhpcy5fY3VycmVudDtcbiAgICAgICAgdGhpcy5ycyA9IHRoaXMuYmFzZS5hcHBlbmQoJ3N2ZycpLmF0dHJzKHtcbiAgICAgICAgICAgIGNsYXNzOiAncmFua2luZ19zZWxlY3RvcicsXG4gICAgICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICAgICAgaGVpZ2h0OiBtcy5iYXJIZWlnaHRcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5iaW5kKEdsb2JhbEV2ZW50cy5tYWluX3Jlc2l6ZSwgKGQpID0+IHtcbiAgICAgICAgICAgIGMud2lkdGggPSAoZC53IC0gMiAqIG1zLm1haW4ucGFkZGluZyk7XG4gICAgICAgICAgICB0aGlzLnJzLmF0dHIoJ3dpZHRoJywgYy53aWR0aCk7XG4gICAgICAgICAgICBjLmltZ19zcGFjZSA9IE1hdGguZmxvb3IoYy53aWR0aCAvIG1zLmltZ19kaXN0KTtcbiAgICAgICAgICAgIGMuaW1nX3JhbmdlWzFdID0gYy5pbWdfcmFuZ2VbMF0gKyBjLmltZ19zcGFjZTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYy5pbWdfcmFuZ2UsXCItLS0gYy5pbWdfcmFuZ2VcIik7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICAgICAgfSlcblxuXG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLmJpbmQoQWJsYXRpb25WaWV3LmV2ZW50cy5hYmxhdGlvbl9jaGFuZ2VkLCAoZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25DaGFuZ2VBYmxhdGlvblZhbHVlKGQuaSwgZC5uZXdfdmFsdWUpO1xuXG5cbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBzdGFydF9wYXJhbXMgPSBVUkxIYW5kbGVyLnBhcmFtZXRlcnNcblxuICAgICAgICBpZiAoJ2FibF9jaGcnIGluIHN0YXJ0X3BhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudC5hYmxhdGlvbl9jaGFuZ2VzID0gYXJyX3RvX29iaihzdGFydF9wYXJhbXNbJ2FibF9jaGcnXSlcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3JlbmRlcihyZW5kZXJEYXRhOiBBYmxhdGlvbkRhdGEgPSB0aGlzLnJlbmRlckRhdGEpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFyZW5kZXJEYXRhKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGN1ciA9IHRoaXMuX2N1cnJlbnQ7XG5cbiAgICAgICAgLy8gVE9ETzogY29ycmVjdCBmb3Igb3Zlci1sZW5ndGggcmFuZ2VcbiAgICAgICAgdGhpcy5fY29ycmVjdF9zZWxlY3Rpb25fcmFuZ2UoKTtcblxuICAgICAgICAvL1RPRE86IGhhY2sgZm9yIG5vd1xuICAgICAgICBpZiAoY3VyLnNvcnQuc190b19pLmxlbmd0aCAhPT0gcmVuZGVyRGF0YS5jaGFubmVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGN1ci5zb3J0LnNfdG9faSA9IGQzLnJhbmdlKHJlbmRlckRhdGEuY2hhbm5lbHMubGVuZ3RoKTtcblxuICAgICAgICAgICAgY3VyLnNvcnQuaV90b19zID0gZDMucmFuZ2UoY3VyLnNvcnQuc190b19pLmxlbmd0aCk7XG4gICAgICAgICAgICBjdXIuc29ydC5zX3RvX2kuZm9yRWFjaCgoaSwgcykgPT4gY3VyLnNvcnQuaV90b19zW2ldID0gcylcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHJlbmRlckRhdGEuYWJsYXRpb24pIHtcblxuICAgICAgICAgICAgdGhpcy5yZW5kZXJSYW5nZVNlbGVjdG9yKCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHJlbmRlckRhdGEuY2hhbm5lbHMpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVySW1hZ2VzKCk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29ycmVjdF9zZWxlY3Rpb25fcmFuZ2UocmVuZGVyRGF0YSA9IHRoaXMucmVuZGVyRGF0YSkge1xuICAgICAgICBjb25zdCBjdXIgPSB0aGlzLl9jdXJyZW50O1xuXG4gICAgICAgIGlmIChjdXIuaW1nX3JhbmdlWzFdID49IHJlbmRlckRhdGEuY2hhbm5lbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gcmVuZGVyRGF0YS5jaGFubmVscy5sZW5ndGggLSBjdXIuaW1nX3JhbmdlWzFdO1xuICAgICAgICAgICAgY3VyLmltZ19yYW5nZVsxXSArPSBkaWZmO1xuICAgICAgICAgICAgY3VyLmltZ19yYW5nZVswXSArPSBkaWZmO1xuICAgICAgICAgICAgaWYgKGN1ci5pbWdfcmFuZ2VbMF0gPCAwKSBjdXIuaW1nX3JhbmdlWzBdID0gMDtcblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHJlbmRlclJhbmdlU2VsZWN0b3IocmVuZGVyRGF0YTogQWJsYXRpb25EYXRhID0gdGhpcy5yZW5kZXJEYXRhKSB7XG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICBjb25zdCBjdXIgPSB0aGlzLl9jdXJyZW50O1xuICAgICAgICBjb25zdCBtcyA9IHRoaXMub3B0aW9ucy5tZWFzdXJlcztcblxuICAgICAgICBjb25zdCBsYXllcnMgPSB7XG4gICAgICAgICAgICBmZzogPEQzU2VsPm51bGwsXG4gICAgICAgICAgICBiZzogPEQzU2VsPm51bGwsXG4gICAgICAgICAgICBicnVzaDogPEQzU2VsPm51bGwsXG4gICAgICAgICAgICBtYWluOiA8RDNTZWw+bnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghdGhpcy5ycy5wcm9wZXJ0eSgnY29uZmlndXJlZCcpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGwgb2YgWydiZycsICdtYWluJywgJ2JydXNoJywgJ2ZnJ10pIHtcbiAgICAgICAgICAgICAgICBsYXllcnNbbF0gPSB0aGlzLnJzLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJzLnByb3BlcnR5KCdjb25maWd1cmVkJywgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGwgb2YgWydiZycsICdtYWluJywgJ2JydXNoJywgJ2ZnJ10pIHtcbiAgICAgICAgICAgICAgICBsYXllcnNbbF0gPSB0aGlzLnJzLnNlbGVjdChgLiR7bH1gKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBjb25zdCB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCByZW5kZXJEYXRhLmFibGF0aW9uLmxlbmd0aCArIDFdKVxuICAgICAgICAgICAgLnJhbmdlKFsyMiwgY3VyLndpZHRoXSk7XG5cbiAgICAgICAgY29uc3QgYmFyV2lkdGggPSB4U2NhbGUoMSkgLSB4U2NhbGUoMCk7XG5cbiAgICAgICAgY29uc3QgYWJfbWluX21heCA9IGQzLmV4dGVudChyZW5kZXJEYXRhLmFibGF0aW9uKTtcbiAgICAgICAgaWYgKGFiX21pbl9tYXhbMF0gPiAwKSBhYl9taW5fbWF4WzBdID0gMDtcbiAgICAgICAgY29uc3QgeVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihhYl9taW5fbWF4KVxuICAgICAgICAgICAgLnJhbmdlKFttcy5iYXJIZWlnaHQgLSA1LCA1XSk7XG4gICAgICAgIGNvbnN0IHplcm8gPSB5U2NhbGUoMCk7XG5cbiAgICAgICAgLy8gbWFwIHNvcnQgb3JkZXIgdG8gZWxlbWVudHM6IGk9ZGF0YSBhcnJheSBpbmRleCwgcz1zb3J0IGluZGV4LCBkPWRhdGFcbiAgICAgICAgY29uc3QgYWJfZGF0YSA9IGN1ci5zb3J0LnNfdG9faVxuICAgICAgICAgICAgLm1hcCgoaSwgcykgPT4gKHtpLCBzLCBhYmw6IHJlbmRlckRhdGEuYWJsYXRpb25baV19KSk7XG5cbiAgICAgICAgY29uc3QgYmFyID0gbGF5ZXJzLm1haW4uc2VsZWN0QWxsKFwiLmJhclwiKS5kYXRhKGFiX2RhdGEpO1xuICAgICAgICBiYXIuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIGNvbnN0IGJhckVudGVyID0gYmFyLmVudGVyKCkuYXBwZW5kKCdyZWN0JykuYXR0cignY2xhc3MnLCAnYmFyJyk7XG5cblxuICAgICAgICBiYXJFbnRlci5tZXJnZShiYXIpLmF0dHJzKHtcbiAgICAgICAgICAgIGNsYXNzOiBkID0+IChkLmFibCA+PSAwKSA/IFwiYmFyIHBvc1wiIDogJ2JhciBuZWcnLFxuICAgICAgICAgICAgeDogKGQsIGkpID0+IHhTY2FsZShpKSxcbiAgICAgICAgICAgIHk6IChkKSA9PiAoZC5hYmwgPj0gMCkgPyB5U2NhbGUoZC5hYmwpIDogemVybyxcbiAgICAgICAgICAgIGhlaWdodDogKGQpID0+IChkLmFibCA+PSAwKSA/IHplcm8gLSB5U2NhbGUoZC5hYmwpIDogeVNjYWxlKGQuYWJsKSAtIHplcm8sXG4gICAgICAgICAgICB3aWR0aDogYmFyV2lkdGhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgeV9heGlzX2cgPSBsYXllcnMuYmcuc2VsZWN0QWxsKCcueS1heGlzJykuZGF0YShbYWJfbWluX21heF0pO1xuICAgICAgICBjb25zdCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHlTY2FsZSk7XG4gICAgICAgIHlfYXhpc19nLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2cnKS5jbGFzc2VkKCd5LWF4aXMnLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMjAsMCknKVxuICAgICAgICAgICAgLm1lcmdlKHlfYXhpc19nKS5jYWxsKHlBeGlzKTtcblxuXG4gICAgICAgIGNvbnN0IGIgPSBkMy5icnVzaFgoKVxuICAgICAgICAgICAgLmV4dGVudChbWzIyLCAwXSwgW2N1ci53aWR0aCwgbXMuYmFySGVpZ2h0XV0pXG4gICAgICAgICAgICAub24oJ2JydXNoJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYnJ1c2gtLS0gXCIsIGQzLmV2ZW50LnR5cGUpO1xuICAgICAgICAgICAgICAgIC8vIGlmIChkMy5ldmVudC5zb3VyY2VFdmVudCkgY29uc29sZS5sb2coZDMuZXZlbnQuc291cmNlRXZlbnQudHlwZSxcIi0tLSBkMy5ldmVudC5zb3VyY2VFdmVudC50eXBlXCIpO1xuICAgICAgICAgICAgICAgIGlmICghZDMuZXZlbnQuc291cmNlRXZlbnQgfHwgZDMuZXZlbnQuc291cmNlRXZlbnQudHlwZSA9PT0gXCJicnVzaFwiKSByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCItLS0gYmV5b25kIC0tXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGQwID0gZDMuZXZlbnQuc2VsZWN0aW9uLm1hcCh4U2NhbGUuaW52ZXJ0KSxcbiAgICAgICAgICAgICAgICAgICAgZDEgPSBkMC5tYXAoTWF0aC5yb3VuZCk7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiBlbXB0eSB3aGVuIHJvdW5kZWQsIHVzZSBmbG9vciBpbnN0ZWFkLlxuICAgICAgICAgICAgICAgIGlmIChkMVswXSA+PSBkMVsxXSkge1xuICAgICAgICAgICAgICAgICAgICBkMVswXSA9IE1hdGguZmxvb3IoZDBbMF0pO1xuICAgICAgICAgICAgICAgICAgICBkMVsxXSA9IGQxWzBdICsgY3VyLmltZ19zcGFjZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VyLmltZ19yYW5nZSA9IGQxO1xuICAgICAgICAgICAgICAgIHRoYXQuX2NvcnJlY3Rfc2VsZWN0aW9uX3JhbmdlKCk7XG5cblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGQzLmV2ZW50LnNlbGVjdGlvbiwgXCItLS0gZDMuZXZlbnQuc2VsZWN0aW9uXCIpO1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKGQzLmV2ZW50LnRhcmdldC5tb3ZlLCBjdXIuaW1nX3JhbmdlLm1hcCh4U2NhbGUpKTtcbiAgICAgICAgICAgICAgICB0aGF0LnJlbmRlckltYWdlcygpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICBjb25zdCBiUmVuZGVyID0gbGF5ZXJzLmJydXNoLmNhbGwoYikuY2FsbChiLm1vdmUsIGN1ci5pbWdfcmFuZ2UubWFwKHhTY2FsZSkpO1xuICAgICAgICBiUmVuZGVyLnNlbGVjdEFsbCgnLmhhbmRsZScpLnJlbW92ZSgpO1xuICAgICAgICBiUmVuZGVyLnNlbGVjdEFsbCgnLm92ZXJsYXknKS5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHJlbmRlckltYWdlcyhyZW5kZXJEYXRhOiBBYmxhdGlvbkRhdGEgPSB0aGlzLnJlbmRlckRhdGEpIHtcbiAgICAgICAgY29uc3QgY3VyID0gdGhpcy5fY3VycmVudDtcblxuICAgICAgICAvLyBtYXAgc29ydCBvcmRlciB0byBlbGVtZW50czogaT1kYXRhIGFycmF5IGluZGV4LCBzPXNvcnQgaW5kZXgsIGQ9ZGF0YVxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBkMy5yYW5nZShjdXIuaW1nX3JhbmdlWzBdLCBjdXIuaW1nX3JhbmdlWzFdKVxuICAgICAgICAgICAgLm1hcChzX2luZGV4ID0+IGN1ci5zb3J0LnNfdG9faVtzX2luZGV4XSlcbiAgICAgICAgICAgIC5tYXAoKGksIHMpID0+ICh7aSwgcywgaW1nOiByZW5kZXJEYXRhLmNoYW5uZWxzW2ldfSkpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGlvbiwgXCItLS0gc2VsZWN0aW9uXCIpO1xuXG4gICAgICAgIGxldCBpbWdfYm94ID0gdGhpcy5iYXNlLnNlbGVjdEFsbChcIi5pbWdfYm94XCIpXG4gICAgICAgICAgICAuZGF0YShzZWxlY3Rpb24pO1xuICAgICAgICBpbWdfYm94LmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICBjb25zdCBpbWdfYm94RW50ZXIgPSBpbWdfYm94LmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpLmF0dHIoJ2NsYXNzJywgJ2ltZ19ib3gnKTtcblxuICAgICAgICBpbWdfYm94ID0gaW1nX2JveEVudGVyLm1lcmdlKGltZ19ib3gpXG4gICAgICAgICAgICAuaHRtbChkID0+IGA8aW1nIHNyYz1cIiR7ZC5pbWcuZH1cIj5gKTtcblxuICAgICAgICBpZiAocmVuZGVyRGF0YS5hYmxhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJJbWFnZUFibGF0aW9uKHJlbmRlckRhdGEpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGltZ19ib3gub24oJ21vdXNlZW50ZXInLCBkID0+IHRoaXMuZXZlbnRIYW5kbGVyXG4gICAgICAgICAgICAudHJpZ2dlcihBYmxhdGlvblZpZXcuZXZlbnRzLmltYWdlX2hvdmVyZWQsIHtcbiAgICAgICAgICAgICAgICBpbWFnZTogZC5pbWcuZCxcbiAgICAgICAgICAgICAgICBob3ZlcmVkOiB0cnVlXG4gICAgICAgICAgICB9KSlcblxuICAgICAgICBpbWdfYm94Lm9uKCdtb3VzZWxlYXZlJywgZCA9PiB0aGlzLmV2ZW50SGFuZGxlclxuICAgICAgICAgICAgLnRyaWdnZXIoQWJsYXRpb25WaWV3LmV2ZW50cy5pbWFnZV9ob3ZlcmVkLCB7XG4gICAgICAgICAgICAgICAgaW1hZ2U6IGQuaW1nLmQsXG4gICAgICAgICAgICAgICAgaG92ZXJlZDogZmFsc2VcbiAgICAgICAgICAgIH0pKVxuXG5cbiAgICB9XG5cblxuICAgIHByaXZhdGUgYWN0aW9uQ2hhbmdlQWJsYXRpb25WYWx1ZShpLCB2KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGksIHYsIFwiLS0tIGksdlwiKTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2N1cnJlbnQuYWJsYXRpb25fY2hhbmdlc1tpXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnQuYWJsYXRpb25fY2hhbmdlc1tpXSA9IHY7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIFVSTEhhbmRsZXIudXBkYXRlVVJMUGFyYW0oJ2FibF9jaGcnLCBvYmpfdG9fYXJyKHRoaXMuX2N1cnJlbnQuYWJsYXRpb25fY2hhbmdlcyksIHRydWUpXG4gICAgICAgIHRoaXMucmVuZGVySW1hZ2VBYmxhdGlvbigpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJJbWFnZUFibGF0aW9uKHJlbmRlckRhdGEgPSB0aGlzLnJlbmRlckRhdGEpIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGN1ciA9IHRoaXMuX2N1cnJlbnQ7XG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGN1ci5hYmxhdGlvbl9zY2FsZS5jb3B5KCkucmFuZ2UoWzY1LCA1XSk7XG4gICAgICAgIGNvbnN0IHplcm8gPSB5U2NhbGUoMCk7XG4gICAgICAgIGNvbnN0IHBvczEgPSB5U2NhbGUoMSk7XG4gICAgICAgIGNvbnN0IG5lZzEgPSB5U2NhbGUoLTEpO1xuXG4gICAgICAgIGNvbnN0IGltZ19ib3g6IGQzLlNlbGVjdGlvbjxkMy5CYXNlVHlwZSwgeyBpOiBudW1iZXI7IHM6IG51bWJlcjsgaW1nOiB7IGQ6IHN0cmluZzsgaWQ6IG51bWJlciB9IH0sIGFueSwgYW55PlxuICAgICAgICAgICAgPSB0aGlzLmJhc2Uuc2VsZWN0QWxsKFwiLmltZ19ib3hcIik7XG5cblxuICAgICAgICBpbWdfYm94Lmh0bWwoKGQsIGkpID0+IHtcbiAgICAgICAgICAgIC8vVE9ETzogZml4IHRoaXMgKGluY2x1ZGUgb3JkZXIpXG5cbiAgICAgICAgICAgIC8vIGNvbnN0IGF2ID0gcmVuZGVyRGF0YS5hYmxhdGlvbltpXTtcbiAgICAgICAgICAgIHJldHVybiBgPGltZyBzcmM9XCIke2QuaW1nLmR9XCI+PGRpdj5cbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiNDBcIiBoZWlnaHQ9XCI3MFwiPlxuICAgICAgICAgICAgICAgIDxyZWN0IGNsYXNzPVwiYmFyXCIgeD1cIjNcIiB3aWR0aD1cIjEwXCIgaGVpZ2h0PVwiNDBcIj48L3JlY3Q+XG4gICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJwb3NfbWFya2VyIHBvczFcIiB4PVwiMTVcIiB5PVwiJHtwb3MxIC0gNX1cIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMTBcIj48L3JlY3Q+XG4gICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJwb3NfbWFya2VyIHJlc2V0XCIgeD1cIjE1XCIgeT1cIiR7KHBvczEgKyB6ZXJvKSAvIDIgLSA1fVwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIxMFwiPjwvcmVjdD4gXG4gICAgICAgICAgICAgICAgPHJlY3QgY2xhc3M9XCJwb3NfbWFya2VyIHplcm9cIiB4PVwiMTVcIiB5PVwiJHt6ZXJvIC0gNX1cIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMTBcIj48L3JlY3Q+XG4gICAgICAgICAgICAgICAgPHRleHQgY2xhc3M9XCJwb3NfbWFya2VyX3RleHRcIiB4PVwiMjVcIiB5PVwiJHtwb3MxfVwiPiAxIDwvdGV4dD5cbiAgICAgICAgICAgICAgICA8dGV4dCBjbGFzcz1cInBvc19tYXJrZXJfdGV4dFwiIHg9XCIyNVwiIHk9XCIke3plcm99XCI+IDAgPC90ZXh0PlxuICAgICAgICAgICAgICAgIDx0ZXh0IGNsYXNzPVwicG9zX21hcmtlcl90ZXh0XCIgeD1cIjI1XCIgeT1cIiR7KHBvczEgKyB6ZXJvKSAvIDJ9XCI+IG9yaWcgPC90ZXh0PlxuICAgICAgICAgICAgICAgIDwvc3ZnPjwvZGl2PmBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaW1nX2JveC5zZWxlY3RBbGwoJy5iYXInKVxuICAgICAgICAgICAgLmRhdGEoKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhYl9jaGcgPSBjdXIuYWJsYXRpb25fY2hhbmdlc1tkLmldO1xuICAgICAgICAgICAgICAgIGlmIChhYl9jaGcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2FiX2NoZ107XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtyZW5kZXJEYXRhLmFibGF0aW9uW2QuaV1dXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHJzKHtcbiAgICAgICAgICAgICAgICBjbGFzczogZCA9PiAoZCA+PSAwKSA/IFwiYmFyIHBvc1wiIDogJ2JhciBuZWcnLFxuICAgICAgICAgICAgICAgIC8vIHg6IDMsXG4gICAgICAgICAgICAgICAgeTogKGQpID0+IChkID49IDApID8geVNjYWxlKGQpIDogemVybyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IChkKSA9PiAoZCA+PSAwKSA/IHplcm8gLSB5U2NhbGUoZCkgOiB5U2NhbGUoZCkgLSB6ZXJvLFxuICAgICAgICAgICAgICAgIC8vIHdpZHRoOiAxMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaW1nX2JveC5zZWxlY3RBbGwoJy5wb3NfbWFya2VyJykuZGF0YShkID0+IFtkLCBkLCBkXSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChkOiB7IGksIHMsIGltZyB9KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWUgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdiA9IGN1ci5hYmxhdGlvbl9jaGFuZ2VzW2QuaV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIChtZS5jbGFzc2VkKCdyZXNldCcpICYmIHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgfHwgKG1lLmNsYXNzZWQoJ3BvczEnKSAmJiB2ID09PSAxKVxuICAgICAgICAgICAgICAgICAgICB8fCAobWUuY2xhc3NlZCgnemVybycpICYmIHYgPT09IDApO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWUgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgbGV0IG5ld192YWx1ZTogbnVtYmVyIHwgbnVsbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAvLyBpZiAobWUuY2xhc3NlZCgncmVzZXQnKSkgbmV3VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChtZS5jbGFzc2VkKCd6ZXJvJykpIG5ld192YWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKG1lLmNsYXNzZWQoJ3BvczEnKSkgbmV3X3ZhbHVlID0gMTtcblxuICAgICAgICAgICAgICAgIHRoYXQuZXZlbnRIYW5kbGVyLnRyaWdnZXIoQWJsYXRpb25WaWV3LmV2ZW50cy5hYmxhdGlvbl9jaGFuZ2VkLFxuICAgICAgICAgICAgICAgICAgICB7aTogZC5pLCBuZXdfdmFsdWV9XG4gICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICB9KVxuXG5cbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBfd3JhbmdsZShkYXRhOiBBYmxhdGlvbkRhdGEpIHtcblxuICAgICAgICBpZiAoIWRhdGEuYWJsYXRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IHJuZCA9IGQzLnJhbmRvbU5vcm1hbCgpO1xuICAgICAgICAgICAgZGF0YS5hYmxhdGlvbiA9IGQzLnJhbmdlKGRhdGEuY2hhbm5lbHMubGVuZ3RoKS5tYXAoKCkgPT4gcm5kKCkpXG4gICAgICAgICAgICAvL2RhdGEuY2hhbm5lbHMubGVuZ3RoXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhLmFibGF0aW9uKSB7XG5cblxuICAgICAgICAgICAgY29uc3QgYWJfbWluX21heCA9IGQzLmV4dGVudChkYXRhLmFibGF0aW9uKTtcbiAgICAgICAgICAgIGlmIChhYl9taW5fbWF4WzBdID4gMCkgYWJfbWluX21heFswXSA9IDA7XG4gICAgICAgICAgICBpZiAoYWJfbWluX21heFsxXSA8IDEpIGFiX21pbl9tYXhbMV0gPSAxO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudC5hYmxhdGlvbl9zY2FsZS5kb21haW4oYWJfbWluX21heCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnQuc29ydC5zX3RvX2kgPSBhcmdzb3J0KGRhdGEuYWJsYXRpb24sIChhLCBiKSA9PiBiIC0gYSlcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnQuc29ydC5pX3RvX3MgPSBkMy5yYW5nZSh0aGlzLl9jdXJyZW50LnNvcnQuc190b19pLmxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50LnNvcnQuc190b19pLmZvckVhY2goKGksIHMpID0+IHRoaXMuX2N1cnJlbnQuc29ydC5pX3RvX3NbaV0gPSBzKVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIHB1YmxpYyBzZXQgeihfeikge1xuICAgIC8vICAgICB0aGlzLmRhdGEueiA9IF96O1xuICAgIC8vICAgICB0aGlzLnJlbmRlckRhdGEgPSB0aGlzLl93cmFuZ2xlKHRoaXMuZGF0YSk7XG4gICAgLy8gICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIHB1YmxpYyBnZXQgeigpIHtcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuZGF0YS56O1xuICAgIC8vIH1cblxuICAgIHB1YmxpYyBzZXQgYWJsYXRpb24oX2EpIHtcbiAgICAgICAgdGhpcy5kYXRhLmFibGF0aW9uID0gX2E7XG4gICAgICAgIHRoaXMucmVuZGVyRGF0YSA9IHRoaXMuX3dyYW5nbGUodGhpcy5kYXRhKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBhYmxhdGlvbl9tb2RpZmllZCgpIHtcbiAgICAgICAgY29uc3QgYWJfYyA9IHRoaXMuX2N1cnJlbnQuYWJsYXRpb25fY2hhbmdlcztcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5hYmxhdGlvbi5tYXAoKGQsIGkpID0+IChpIGluIGFiX2MpID8gYWJfY1tpXSA6IGQpO1xuICAgIH1cblxuXG4gICAgcmVzZXRfYWxsKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50LmFibGF0aW9uX2NoYW5nZXMgPSB7fTtcbiAgICAgICAgVVJMSGFuZGxlci51cGRhdGVVUkxQYXJhbSgnYWJsX2NoZycsIG9ial90b19hcnIodGhpcy5fY3VycmVudC5hYmxhdGlvbl9jaGFuZ2VzKSwgdHJ1ZSlcbiAgICAgICAgdGhpcy5yZW5kZXJJbWFnZUFibGF0aW9uKCk7XG4gICAgfVxufSIsImltcG9ydCB7VkNvbXBvbmVudH0gZnJvbSBcIi4vVmlzQ29tcG9uZW50XCI7XG5pbXBvcnQge0QzU2VsfSBmcm9tIFwiLi4vZXRjL1V0aWxcIjtcbmltcG9ydCB7U2ltcGxlRXZlbnRIYW5kbGVyfSBmcm9tIFwiLi4vZXRjL1NpbXBsZUV2ZW50SGFuZGxlclwiO1xuaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzXCI7XG5cbi8vIGV4cG9ydCB0eXBlIEFQSV9nZW5lcmF0ZSA9IHtcbi8vICAgICByZXF1ZXN0OiB7XG4vLyAgICAgICAgIFwiYWJsYXRpb25zXCI6XG4vLyAgICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICAgXCJhbHBoYVwiOiBudW1iZXIsXG4vLyAgICAgICAgICAgICAgICAgXCJsYXllclwiOiBzdHJpbmcsXG4vLyAgICAgICAgICAgICAgICAgXCJ1bml0XCI6IG51bWJlclxuLy8gICAgICAgICAgICAgfVtdIHwgbnVsbCxcbi8vICAgICAgICAgXCJpZHNcIjogbnVtYmVyW10sXG4vLyAgICAgICAgIFwicHJvamVjdFwiOiBzdHJpbmcsXG4vLyAgICAgICAgIFwid2FudHpcIjogYm9vbGVhblxuLy8gICAgIH0sXG4vLyAgICAgcmVzOiB7IGQ6IHN0cmluZywgaWQ/OiBudW1iZXIgfVtdXG4vL1xuLy8gfVxuZXhwb3J0IHR5cGUgQmFyY2hhcnRDYW52YXNEYXRhID0ge1xuICAgIHZhbHVlczogbnVtYmVyW10sXG4gICAgaWRzOiBudW1iZXJbXVxufVxuXG5leHBvcnQgY2xhc3MgQmFyY2hhcnRDYW52YXMgZXh0ZW5kcyBWQ29tcG9uZW50PEJhcmNoYXJ0Q2FudmFzRGF0YT4ge1xuICAgIHByaXZhdGUgYzogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHByaXZhdGUgc3ZnOiBkMy5TZWxlY3Rpb248ZDMuQmFzZVR5cGUsIGFueSwgYW55LCBhbnk+O1xuXG5cbiAgICBjb25zdHJ1Y3RvcihkM3BhcmVudDogRDNTZWwsIGV2ZW50SGFuZGxlcj86IFNpbXBsZUV2ZW50SGFuZGxlcikge1xuICAgICAgICBzdXBlcihkM3BhcmVudCwgZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgdGhpcy5zdXBlckluaXRIVE1MKCk7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgc3RhdGljIGV2ZW50cyA9IHtcbiAgICAvLyAgICAgcmVxdWVzdF9leGFtcGxlczogXCJFeGFtcGxlVmlld19yZVwiLFxuICAgIC8vICAgICBhcHBseV9yZWNpcGU6IFwiRXhhbXBsZVZpZXdfYXJcIlxuICAgIC8vIH1cblxuXG4gICAgcHJvdGVjdGVkIF9jdXJyZW50ID0ge307XG4gICAgcHJvdGVjdGVkIGNzc19uYW1lID0gXCJCYXJjaGFydENhbnZhc1wiO1xuICAgIHByb3RlY3RlZCBvcHRpb25zID0ge1xuICAgICAgICBwb3M6IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgdzogMjAwLFxuICAgICAgICBoOiAxMDBcbiAgICB9O1xuXG4gICAgcHJvdGVjdGVkIF9pbml0KCkge1xuICAgICAgICBjb25zdCBvcCA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdGhpcy5jID0gKDxIVE1MQ2FudmFzRWxlbWVudD4gdGhpcy5iYXNlLmFwcGVuZCgnY2FudmFzJykuYXR0cnMoe1xuICAgICAgICAgICAgd2lkdGg6IG9wLncsXG4gICAgICAgICAgICBoZWlnaHQ6IG9wLmhcbiAgICAgICAgfSkuc3R5bGUoJ3Bvc2l0aW9uJywnYWJzb2x1dGUnKS5ub2RlKCkpXG4gICAgICAgICAgICAuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIHRoaXMuc3ZnID10aGlzLmJhc2UuYXBwZW5kKCdzdmcnKS5hdHRycyh7XG4gICAgICAgICAgICB3aWR0aDogb3AudyxcbiAgICAgICAgICAgIGhlaWdodDogb3AuaFxuICAgICAgICB9KS5zdHlsZSgncG9zaXRpb24nLCdhYnNvbHV0ZScpO1xuXG4gICAgICAgIHRoaXMuc3ZnLmFwcGVuZCgnZycpLmNhbGwoZDMuYnJ1c2hYKCkuZXh0ZW50KFtbMCwgMF0sIFtvcC53LCBvcC5oXV0pXG4gICAgICAgIC5vbihcImVuZFwiLCAoKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0gYkVuZFwiKTtcbiAgICAgICAgfSkpXG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3JlbmRlcihyRGF0YTogQmFyY2hhcnRDYW52YXNEYXRhID0gdGhpcy5yZW5kZXJEYXRhKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG9wID0gdGhpcy5vcHRpb25zO1xuXG4gICAgICAgIHRoaXMuYy5jbGVhclJlY3QoMCwgMCwgb3Audywgb3AuaCk7XG5cbiAgICAgICAgY29uc3QgeU1pbk1heCA9IGQzLmV4dGVudChyRGF0YS52YWx1ZXMpO1xuICAgICAgICBpZiAoeU1pbk1heFswXSA+IDApIHlNaW5NYXhbMF0gPSAwO1xuXG4gICAgICAgIGNvbnN0IHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oeU1pbk1heClcbiAgICAgICAgICAgIC5yYW5nZShbb3AuaCAtIDQsIDJdKTtcblxuICAgICAgICBjb25zdCB4U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCByRGF0YS52YWx1ZXMubGVuZ3RoXSlcbiAgICAgICAgICAgIC5yYW5nZShbMiwgb3AudyAtIDRdKTtcblxuICAgICAgICBjb25zdCBiYXJXaWR0aCA9IHhTY2FsZSgxKSAtIHhTY2FsZSgwKTtcbiAgICAgICAgY29uc3QgeVplcm8gPSB5U2NhbGUoMCk7XG4gICAgICAgIGNvbnN0IHJEID0gZDMuemlwKHJEYXRhLnZhbHVlcywgckRhdGEuaWRzKTtcblxuICAgICAgICB0aGlzLmMuYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuYy5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgckRhdGEudmFsdWVzLmZvckVhY2goKHYsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh2ID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmMuZmlsbFJlY3QoeFNjYWxlKGkpLCB5U2NhbGUodiksIGJhcldpZHRoLCB5WmVybyAtIHlTY2FsZSh2KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYy5maWxsUmVjdCh4U2NhbGUoaSksIHlaZXJvLCBiYXJXaWR0aCwgeVNjYWxlKHYpIC0geVplcm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGlzLmMuZmlsbFJlY3QoMTAsIDEwLCAyMCwgMjApO1xuICAgICAgICB0aGlzLmMuY2xvc2VQYXRoKCk7XG5cblxuXG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3dyYW5nbGUoZGF0YTogQmFyY2hhcnRDYW52YXNEYXRhKSB7XG4gICAgICAgIC8vIGRhdGEudmFsdWVzID0gZGF0YS52YWx1ZXMuc29ydCgpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cblxufSIsImltcG9ydCB7VkNvbXBvbmVudH0gZnJvbSBcIi4vVmlzQ29tcG9uZW50XCI7XG5pbXBvcnQge0QzU2VsfSBmcm9tIFwiLi4vZXRjL1V0aWxcIjtcbmltcG9ydCB7U2ltcGxlRXZlbnRIYW5kbGVyfSBmcm9tIFwiLi4vZXRjL1NpbXBsZUV2ZW50SGFuZGxlclwiO1xuaW1wb3J0IHtBUElfZ2VuZXJhdGV9IGZyb20gXCIuLi9hcGkvR2FudGVyQVBJXCI7XG5pbXBvcnQgKiBhcyBkMyBmcm9tIFwiZDNcIlxuXG5leHBvcnQgdHlwZSBFeGFtcGxlVmlld0RhdGEgPSB7XG4gICAgb3JpZzogQVBJX2dlbmVyYXRlLFxuICAgIGNvbXBhcmU/OiBBUElfZ2VuZXJhdGVcbn1cblxuZXhwb3J0IHR5cGUgRXhhbXBsZVZpZXdNb3VzZUV2ZW50ID0ge1xuICAgIGNhbGxlcjogRDNTZWwsXG4gICAgaW1hZ2VzOiB7IGQ6IHN0cmluZywgaWQ/OiBudW1iZXIgfVtdLFxuICAgIGhvdmVyZWQ/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBFeGFtcGxlVmlldyBleHRlbmRzIFZDb21wb25lbnQ8RXhhbXBsZVZpZXdEYXRhPiB7XG4gICAgcHJpdmF0ZSBkaXZfb3JpZ3M6IEQzU2VsO1xuICAgIHJlbmRlckRhdGE6IEV4YW1wbGVWaWV3RGF0YTtcblxuICAgIHByaXZhdGUgX2ltZ1dpZHRoID0gLTE7XG5cblxuICAgIGNvbnN0cnVjdG9yKGQzcGFyZW50OiBEM1NlbCwgZXZlbnRIYW5kbGVyPzogU2ltcGxlRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgIHN1cGVyKGQzcGFyZW50LCBldmVudEhhbmRsZXIpO1xuICAgICAgICB0aGlzLnN1cGVySW5pdEhUTUwoKTtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZXZlbnRzID0ge1xuICAgICAgICByZXF1ZXN0X2V4YW1wbGVzOiBcIkV4YW1wbGVWaWV3X3JlXCIsXG4gICAgICAgIGhvdmVyZWRfaW1hZ2VfcGFpcjogXCJFeGFtcGxlVmlld19oaXBcIixcbiAgICAgICAgY2xpY2tlZF9pbWFnZV9wYWlyOiBcIkV4YW1wbGVWaWV3X2NpcFwiLFxuXG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgX2N1cnJlbnQgPSB7fTtcbiAgICBwcm90ZWN0ZWQgY3NzX25hbWUgPSBcIkV4YW1wbGVWaWV3XCI7XG4gICAgcHJvdGVjdGVkIG9wdGlvbnMgPSB7cG9zOiB7eDogMCwgeTogMH19O1xuXG4gICAgcHJvdGVjdGVkIF9pbml0KCkge1xuICAgICAgICB0aGlzLmRpdl9vcmlncyA9IHRoaXMuYmFzZS5hcHBlbmQoJ2RpdicpLmF0dHIoJ2NsYXNzJywgJ2V4YW1wbGVzJyk7XG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3JlbmRlcihyRGF0YSA9IHRoaXMucmVuZGVyRGF0YSk6IHZvaWQge1xuICAgICAgICBpZiAoIXJEYXRhKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHJlbmRlckxpc3QgPSByRGF0YS5vcmlnLnJlcy5tYXAoZCA9PiBbZF0pO1xuXG4gICAgICAgIGlmIChyRGF0YS5jb21wYXJlKSB7XG4gICAgICAgICAgICByRGF0YS5jb21wYXJlLnJlcy5tYXAoKGQsIGkpID0+IHJlbmRlckxpc3RbaV0ucHVzaChkKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW1nX3BhaXJzID0gdGhpcy5kaXZfb3JpZ3Muc2VsZWN0QWxsKCcuaW1nX3BhaXInKS5kYXRhKHJlbmRlckxpc3QpO1xuICAgICAgICBpbWdfcGFpcnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICBpbWdfcGFpcnMgPSBpbWdfcGFpcnMuZW50ZXIoKS5hcHBlbmQoJ2RpdicpLmF0dHIoJ2NsYXNzJywgJ2ltZ19wYWlyJylcbiAgICAgICAgICAgIC5tZXJnZShpbWdfcGFpcnMpO1xuXG4gICAgICAgIGxldCBpbWdzID0gaW1nX3BhaXJzLnNlbGVjdEFsbCgnaW1nJykuZGF0YShkID0+IGQpO1xuICAgICAgICBpbWdzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgaW1ncy5lbnRlcigpLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgIC5tZXJnZShpbWdzKVxuICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGQgPT4gZC5kKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5faW1nV2lkdGggPiAtMSA/IHRoaXMuX2ltZ1dpZHRoIDogbnVsbCk7XG5cblxuICAgICAgICBpbWdfcGFpcnMub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50RGV0YWlsOiBFeGFtcGxlVmlld01vdXNlRXZlbnQgPSB7XG4gICAgICAgICAgICAgICAgY2FsbGVyOiBkMy5zZWxlY3QodGhpcyksXG4gICAgICAgICAgICAgICAgaW1hZ2VzOiBkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGF0LmV2ZW50SGFuZGxlci50cmlnZ2VyKFxuICAgICAgICAgICAgICAgIEV4YW1wbGVWaWV3LmV2ZW50cy5jbGlja2VkX2ltYWdlX3BhaXIsXG4gICAgICAgICAgICAgICAgZXZlbnREZXRhaWxcbiAgICAgICAgICAgIClcbiAgICAgICAgfSlcblxuICAgICAgICBpbWdfcGFpcnMub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgY29uc3QgZXZlbnREZXRhaWw6IEV4YW1wbGVWaWV3TW91c2VFdmVudCA9IHtcbiAgICAgICAgICAgICAgICBjYWxsZXI6IGQzLnNlbGVjdCh0aGlzKSxcbiAgICAgICAgICAgICAgICBpbWFnZXM6IGQsXG4gICAgICAgICAgICAgICAgaG92ZXJlZDogdHJ1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhhdC5ldmVudEhhbmRsZXIudHJpZ2dlcihcbiAgICAgICAgICAgICAgICBFeGFtcGxlVmlldy5ldmVudHMuaG92ZXJlZF9pbWFnZV9wYWlyLFxuICAgICAgICAgICAgICAgIGV2ZW50RGV0YWlsXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICAgIGltZ19wYWlycy5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBjb25zdCBldmVudERldGFpbDogRXhhbXBsZVZpZXdNb3VzZUV2ZW50ID0ge1xuICAgICAgICAgICAgICAgIGNhbGxlcjogZDMuc2VsZWN0KHRoaXMpLFxuICAgICAgICAgICAgICAgIGltYWdlczogZCxcbiAgICAgICAgICAgICAgICBob3ZlcmVkOiBmYWxzZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhhdC5ldmVudEhhbmRsZXIudHJpZ2dlcihcbiAgICAgICAgICAgICAgICBFeGFtcGxlVmlldy5ldmVudHMuaG92ZXJlZF9pbWFnZV9wYWlyLFxuICAgICAgICAgICAgICAgIGV2ZW50RGV0YWlsXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF93cmFuZ2xlKGRhdGE6IEV4YW1wbGVWaWV3RGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzZXQgYWJsYXRlZChkYXRhOiBBUElfZ2VuZXJhdGUpIHtcbiAgICAgICAgdGhpcy5kYXRhLmNvbXBhcmUgPSBkYXRhO1xuICAgICAgICB0aGlzLnJlbmRlckRhdGEgPSB0aGlzLl93cmFuZ2xlKHRoaXMuZGF0YSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cblxuXG4gICAgcHVibGljIHNldCBpbWdXaWR0aChpbWdXaWR0aDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2ltZ1dpZHRoID0gaW1nV2lkdGg7XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cblxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBIZW5kcmlrIFN0cm9iZWx0IChoZW5kcmlrLnN0cm9iZWx0LmNvbSkgb24gMTIvMy8xNi5cbiAqL1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnXG5pbXBvcnQge0QzU2VsLCBVdGlsfSBmcm9tIFwiLi4vZXRjL1V0aWxcIjtcbmltcG9ydCB7U2ltcGxlRXZlbnRIYW5kbGVyfSBmcm9tIFwiLi4vZXRjL1NpbXBsZUV2ZW50SGFuZGxlclwiO1xuaW1wb3J0IHtTVkd9IGZyb20gXCIuLi9ldGMvU1ZHcGx1c1wiO1xuXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWQ29tcG9uZW50PERhdGFJbnRlcmZhY2U+IHtcblxuICAgIC8vIFNUQVRJQyBGSUVMRFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3RhdGljIHByb3BlcnR5IHRoYXQgY29udGFpbnMgYWxsIGNsYXNzIHJlbGF0ZWQgZXZlbnRzLlxuICAgICAqIFNob3VsZCBiZSBvdmVyd3JpdHRlbiBhbmQgZXZlbnQgc3RyaW5ncyBoYXZlIHRvIGJlIHVuaXF1ZSEhXG4gICAgICovXG5cbiAgICBzdGF0aWMgZXZlbnRzOiB7fSA9IHtub0V2ZW50OiAnVkNvbXBvbmVudF9ub0V2ZW50J307XG5cbiAgICAvKipcbiAgICAgKiBzZXQgb2YgQUxMIG9wdGlvbnMgYW5kIHRoZWlyIGRlZmF1bHRzXG4gICAgICogRXhhbXBsZTpcbiAgICAgKiB7XG4gICAgICAgIHBvczoge3g6IDEwLCB5OiAxMH0sXG4gICAgICAgIC8vIExpc3Qgb2YgRXZlbnRzIHRoYXQgYXJlIE9OTFkgaGFuZGxlZCBnbG9iYWxseTpcbiAgICAgICAgZ2xvYmFsRXhjbHVzaXZlRXZlbnRzOiBbXVxuICAgIH07XG4gICAgICpcbiAgICAgKi9cbiAgICAgICAgLy8gYWJzdHJhY3QgcmVhZG9ubHkgZGVmYXVsdE9wdGlvbnM7XG5cblxuICAgICAgICAvLyAvKipcbiAgICAgICAgLy8gICogRGVmaW5lcyB0aGUgbGF5ZXJzIGluIFNWRyAgZm9yIGJnLG1haW4sZmcsLi4uXG4gICAgICAgIC8vICAqL1xuICAgICAgICAvLyBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgbGF5b3V0OiB7IG5hbWU6IHN0cmluZywgcG9zOiBudW1iZXJbXSB9W10gPSBbe25hbWU6ICdtYWluJywgcG9zOiBbMCwgMF19XTtcblxuXG4gICAgcHJvdGVjdGVkIGlkOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIHBhcmVudDogRDNTZWw7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG9wdGlvbnM6IHsgcG9zOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0sIFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIHByb3RlY3RlZCBiYXNlOiBEM1NlbDtcbiAgICBwcm90ZWN0ZWQgbGF5ZXJzOiB7IG1haW4/OiBEM1NlbCwgZmc/OiBEM1NlbCwgYmc/OiBEM1NlbCwgW2tleTogc3RyaW5nXTogRDNTZWwgfTtcbiAgICBwcm90ZWN0ZWQgZXZlbnRIYW5kbGVyOiBTaW1wbGVFdmVudEhhbmRsZXI7XG4gICAgcHJvdGVjdGVkIF92aXNpYmlsaXR5OiB7IGhpZGRlbjogYm9vbGVhbiwgaGlkZUVsZW1lbnQ/OiBEM1NlbCB8IG51bGw7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIHByb3RlY3RlZCBkYXRhOiBEYXRhSW50ZXJmYWNlO1xuICAgIHByb3RlY3RlZCByZW5kZXJEYXRhOiBhbnk7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNzc19uYW1lOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF9jdXJyZW50OiB7fTtcblxuICAgIC8vIENPTlNUUlVDVE9SID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cbiAgICAvKipcbiAgICAgKiBTaW1wbGUgY29uc3RydWN0b3IuIFN1YmNsYXNzZXMgc2hvdWxkIGNhbGwgQHN1cGVySW5pdChvcHRpb25zKSBhcyB3ZWxsLlxuICAgICAqIHNlZSB3aHkgaGVyZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDM1OTU5NDMvd2h5LWFyZS1kZXJpdmVkLWNsYXNzLXByb3BlcnR5LXZhbHVlcy1ub3Qtc2Vlbi1pbi10aGUtYmFzZS1jbGFzcy1jb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogdGVtcGxhdGU6XG4gICAgIGNvbnN0cnVjdG9yKGQzUGFyZW50OiBEM1NlbCwgZXZlbnRIYW5kbGVyPzogU2ltcGxlRXZlbnRIYW5kbGVyLCBvcHRpb25zOiB7fSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGQzUGFyZW50LCBldmVudEhhbmRsZXIpO1xuICAgICAgICAvLyAtLSBhY2Nlc3MgdG8gc3ViY2xhc3MgcGFyYW1zOlxuICAgICAgICB0aGlzLnN1cGVySW5pdChvcHRpb25zKTtcbiAgICAgfVxuICAgICAqXG4gICAgICogQHBhcmFtIHtEM1NlbH0gZDNwYXJlbnQgIEQzIHNlbGVjdGlvbiBvZiBwYXJlbnQgU1ZHIERPTSBFbGVtZW50XG4gICAgICogQHBhcmFtIHtTaW1wbGVFdmVudEhhbmRsZXJ9IGV2ZW50SGFuZGxlciBhIGdsb2JhbCBldmVudCBoYW5kbGVyIG9iamVjdCBvciAnbnVsbCcgZm9yIGxvY2FsIGV2ZW50IGhhbmRsZXJcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoZDNwYXJlbnQ6IEQzU2VsLCBldmVudEhhbmRsZXI/OiBTaW1wbGVFdmVudEhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5pZCA9IFV0aWwuc2ltcGxlVUlkKHt9KTtcblxuICAgICAgICB0aGlzLnBhcmVudCA9IGQzcGFyZW50O1xuXG4gICAgICAgIC8vIElmIG5vdCBmdXJ0aGVyIHNwZWNpZmllZCAtIGNyZWF0ZSBhIGxvY2FsIGV2ZW50IGhhbmRsZXIgYm91bmQgdG8gdGhlIGJhcyBlbGVtZW50XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyID0gZXZlbnRIYW5kbGVyIHx8XG4gICAgICAgICAgICBuZXcgU2ltcGxlRXZlbnRIYW5kbGVyKHRoaXMucGFyZW50Lm5vZGUoKSk7XG5cbiAgICAgICAgLy8gT2JqZWN0IGZvciBzdG9yaW5nIGludGVybmFsIHN0YXRlcyBhbmQgdmFyaWFibGVzXG4gICAgICAgIHRoaXMuX3Zpc2liaWxpdHkgPSB7aGlkZGVuOiBmYWxzZX07XG5cbiAgICB9XG5cblxuICAgIC8vIHByb3RlY3RlZCBjcmVhdGVTdmdMYXllcnMobGF5ZXJzPVsnYmcnLCdtYWluJywnZmcnXSl7XG4gICAgLy8gICAgIHRoaXMuX2xheWVycyA9IHt9XG4gICAgLy8gICAgIHRoaXMuYmFzZSA9IFNWRy5ncm91cCh0aGlzLnBhcmVudCxcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmNzc19uYW1lICsgJyBJRCcgKyB0aGlzLmlkLFxuICAgIC8vICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb3MpO1xuICAgIC8vXG4gICAgLy8gfVxuXG4gICAgcHJvdGVjdGVkIHN1cGVySW5pdEhUTUwob3B0aW9uczoge30gPSB7fSkge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGtleSA9PiB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XSk7XG4gICAgICAgIHRoaXMuYmFzZSA9IHRoaXMucGFyZW50LmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5jbGFzc2VkKHRoaXMuY3NzX25hbWUsIHRydWUpXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEhhcyB0byBiZSBjYWxsZWQgYXMgbGFzdCBjYWxsIGluIHN1YmNsYXNzIGNvbnN0cnVjdG9yLlxuICAgICAqIEBwYXJhbSB7e319IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gZGVmYXVsdExheWVycyAtLSBjcmVhdGUgdGhlIGRlZmF1bHQgPGc+IGxheWVyczogYmcgLT4gbWFpbiAtPiBmZ1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBzdXBlckluaXRTVkcob3B0aW9uczoge30gPSB7fSwgZGVmYXVsdExheWVycyA9IFsnYmcnLCAnbWFpbicsICdmZyddKSB7XG4gICAgICAgIC8vIFNldCBkZWZhdWx0IG9wdGlvbnMgaWYgbm90IHNwZWNpZmllZCBpbiBjb25zdHJ1Y3RvciBjYWxsXG4gICAgICAgIC8vIGNvbnN0IGRlZmF1bHRzID0gdGhpcy5kZWZhdWx0T3B0aW9ucztcbiAgICAgICAgLy8gdGhpcy5vcHRpb25zID0ge307XG4gICAgICAgIC8vIGNvbnN0IGtleXMgPSBuZXcgU2V0KFsuLi5PYmplY3Qua2V5cyhkZWZhdWx0cyksIC4uLk9iamVjdC5rZXlzKG9wdGlvbnMpXSk7XG4gICAgICAgIC8vIGtleXMuZm9yRWFjaChrZXkgPT4gdGhpcy5vcHRpb25zW2tleV0gPSAoa2V5IGluIG9wdGlvbnMpID8gb3B0aW9uc1trZXldIDogZGVmYXVsdHNba2V5XSk7XG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goa2V5ID0+IHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldKTtcblxuXG4gICAgICAgIHRoaXMubGF5ZXJzID0ge307XG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBiYXNlIGdyb3VwIGVsZW1lbnRcbiAgICAgICAgdGhpcy5iYXNlID0gU1ZHLmdyb3VwKHRoaXMucGFyZW50LFxuICAgICAgICAgICAgdGhpcy5jc3NfbmFtZSArICcgSUQnICsgdGhpcy5pZCxcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb3MpO1xuXG5cbiAgICAgICAgLy8gY3JlYXRlIGRlZmF1bHQgbGF5ZXJzOiBiYWNrZ3JvdW5kLCBtYWluLCBmb3JlZ3JvdW5kXG4gICAgICAgIGlmIChkZWZhdWx0TGF5ZXJzKSB7XG4gICAgICAgICAgICAvLyBjb25zdHJ1Y3Rpb24gb3JkZXIgaXMgaW1wb3J0YW50ICFcbiAgICAgICAgICAgIGRlZmF1bHRMYXllcnMuZm9yRWFjaChsYXllciA9PntcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyc1tsYXllcl0gPSBTVkcuZ3JvdXAodGhpcy5iYXNlLCBsYXllcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gdGhpcy5sYXllcnMuYmcgPSBTVkcuZ3JvdXAodGhpcy5iYXNlLCAnYmcnKTtcbiAgICAgICAgICAgIC8vIHRoaXMubGF5ZXJzLm1haW4gPSBTVkcuZ3JvdXAodGhpcy5iYXNlLCAnbWFpbicpO1xuICAgICAgICAgICAgLy8gdGhpcy5sYXllcnMuZmcgPSBTVkcuZ3JvdXAodGhpcy5iYXNlLCAnZmcnKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNob3VsZCBiZSBvdmVyd3JpdHRlbiB0byBjcmVhdGUgdGhlIHN0YXRpYyBET00gZWxlbWVudHNcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJuIHsqfSAtLS1cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2luaXQoKTtcblxuICAgIC8vIERBVEEgVVBEQVRFICYgUkVOREVSID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgLyoqXG4gICAgICogRXZlcnkgdGltZSBkYXRhIGhhcyBjaGFuZ2VkLCB1cGRhdGUgaXMgY2FsbGVkIGFuZFxuICAgICAqIHRyaWdnZXJzIHdyYW5nbGluZyBhbmQgcmUtcmVuZGVyaW5nXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgZGF0YSBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHsqfSAtLS1cbiAgICAgKi9cbiAgICB1cGRhdGUoZGF0YTogRGF0YUludGVyZmFjZSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICBpZiAodGhpcy5fdmlzaWJpbGl0eS5oaWRkZW4pIHJldHVybjtcbiAgICAgICAgdGhpcy5yZW5kZXJEYXRhID0gdGhpcy5fd3JhbmdsZShkYXRhKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyKHRoaXMucmVuZGVyRGF0YSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEYXRhIHdyYW5nbGluZyBtZXRob2QgLS0gaW1wbGVtZW50IGluIHN1YmNsYXNzLiBSZXR1cm5zIHRoaXMucmVuZGVyRGF0YS5cbiAgICAgKiBTaW1wbGVzdCBpbXBsZW1lbnRhdGlvbjogYHJldHVybiBkYXRhO2BcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBkYXRhXG4gICAgICogQHJldHVybnMgeyp9IC0tIGRhdGEgaW4gcmVuZGVyIGZvcm1hdFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfd3JhbmdsZShkYXRhKTtcblxuXG4gICAgLyoqXG4gICAgICogSXMgcmVzcG9uc2libGUgZm9yIG1hcHBpbmcgZGF0YSB0byBET00gZWxlbWVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVuZGVyRGF0YSBwcmUtcHJvY2Vzc2VkICh3cmFuZ2xlZCkgZGF0YVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEByZXR1cm5zIHsqfSAtLS1cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX3JlbmRlcihyZW5kZXJEYXRhKTogdm9pZDtcblxuXG4gICAgLy8gVVBEQVRFIE9QVElPTlMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBpbnN0YW5jZSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgb25seSB0aGUgb3B0aW9ucyB0aGF0IHNob3VsZCBiZSB1cGRhdGVkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZVJlbmRlciBpZiBvcHRpb24gY2hhbmdlIHJlcXVpcmVzIGEgcmUtcmVuZGVyaW5nIChkZWZhdWx0OmZhbHNlKVxuICAgICAqIEByZXR1cm5zIHsqfSAtLS1cbiAgICAgKi9cbiAgICB1cGRhdGVPcHRpb25zKHtvcHRpb25zLCByZVJlbmRlciA9IGZhbHNlfSkge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGsgPT4gdGhpcy5vcHRpb25zW2tdID0gb3B0aW9uc1trXSk7XG4gICAgICAgIGlmIChyZVJlbmRlcikgdGhpcy5fcmVuZGVyKHRoaXMucmVuZGVyRGF0YSk7XG4gICAgfVxuXG5cbiAgICAvLyA9PT0gQ09OVkVOSUVOQ0UgPT09PVxuXG5cbiAgICBzZXRIaWRlRWxlbWVudChoRTogRDNTZWwpIHtcbiAgICAgICAgdGhpcy5fdmlzaWJpbGl0eS5oaWRlRWxlbWVudCA9IGhFO1xuICAgIH1cblxuICAgIGhpZGVWaWV3KCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Zpc2liaWxpdHkuaGlkZGVuKSB7XG4gICAgICAgICAgICBjb25zdCBoRSA9IHRoaXMuX3Zpc2liaWxpdHkuaGlkZUVsZW1lbnQgfHwgdGhpcy5wYXJlbnQ7XG4gICAgICAgICAgICBoRS50cmFuc2l0aW9uKCkuc3R5bGVzKHtcbiAgICAgICAgICAgICAgICAnb3BhY2l0eSc6IDAsXG4gICAgICAgICAgICAgICAgJ3BvaW50ZXItZXZlbnRzJzogJ25vbmUnXG4gICAgICAgICAgICB9KS5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB0aGlzLl92aXNpYmlsaXR5LmhpZGRlbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmhpZGVWaWV3KCkge1xuICAgICAgICBpZiAodGhpcy5fdmlzaWJpbGl0eS5oaWRkZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGhFID0gdGhpcy5fdmlzaWJpbGl0eS5oaWRlRWxlbWVudCB8fCB0aGlzLnBhcmVudDtcbiAgICAgICAgICAgIGhFLnRyYW5zaXRpb24oKS5zdHlsZXMoe1xuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMSxcbiAgICAgICAgICAgICAgICAncG9pbnRlci1ldmVudHMnOiBudWxsLFxuICAgICAgICAgICAgICAgICdkaXNwbGF5JzogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl92aXNpYmlsaXR5LmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gdGhpcy51cGRhdGUodGhpcy5kYXRhKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5iYXNlLnJlbW92ZSgpO1xuICAgIH1cblxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9