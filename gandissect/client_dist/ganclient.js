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
/******/ 		"ganclient": 0
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
/******/ 	deferredModules.push(["./ts/ganclient.ts","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/file-loader/dist/cjs.js?name=index.html!./index.html":
/*!********************************************************************************************************************!*\
  !*** /usr/local/home/davidbau/netdissect/client/node_modules/file-loader/dist/cjs.js?name=index.html!./index.html ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ }),

/***/ "./css/ganclient.scss":
/*!****************************!*\
  !*** ./css/ganclient.scss ***!
  \****************************/
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

/***/ "./ts/ganclient.ts":
/*!*************************!*\
  !*** ./ts/ganclient.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/d3/index.js");
/* harmony import */ var d3_selection_multi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection-multi */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/d3-selection-multi/index.js");
/* harmony import */ var _css_ganclient_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/ganclient.scss */ "./css/ganclient.scss");
/* harmony import */ var _css_ganclient_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_ganclient_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _file_loader_name_index_html_index_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! file-loader?name=index.html!../index.html */ "../../../../../../../../usr/local/home/davidbau/netdissect/client/node_modules/file-loader/dist/cjs.js?name=index.html!./index.html");
/* harmony import */ var _file_loader_name_index_html_index_html__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_file_loader_name_index_html_index_html__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _etc_SimpleEventHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./etc/SimpleEventHandler */ "./ts/etc/SimpleEventHandler.ts");
/* harmony import */ var _api_GanterAPI__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./api/GanterAPI */ "./ts/api/GanterAPI.ts");
/* harmony import */ var _etc_Util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./etc/Util */ "./ts/etc/Util.ts");
/* harmony import */ var _vis_PaintSelectView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vis/PaintSelectView */ "./ts/vis/PaintSelectView.ts");



// import '../node_modules/font-awesome/css/font-awesome.min.css'





const events = {
    picking: 'picking',
    dropping: 'dropping'
};
const current = {
    sidebar: {
        width: 400,
        visible: true
    },
    image: {
        size: 300
    },
    projects: {},
    recipes: {
        ablation: {},
        copy: {},
        copy_values: []
    },
    unit_sorting: {
        // ablation: <number[]>null,
        copy: null
    },
    pick: {
        selection: [[0, 0], [0, 0]],
        id: -1,
        ablated: false
    }
};
class Helper {
    static update_selector(selector, entries) {
        let rec_op = selector.selectAll('option').data(entries);
        rec_op.exit().remove();
        rec_op.enter().append('option')
            .merge(rec_op)
            .attr('value', d => d)
            .text(d => d);
    }
    ;
    static selector_on_change_or_enter(selector, f) {
        selector.on('change', () => {
            f();
        });
        selector.on('keypress', () => {
            if (d3__WEBPACK_IMPORTED_MODULE_0__["event"].keyCode == 13) {
                f();
            }
        });
    }
    ;
}
window.onload = () => {
    const side_bar = d3__WEBPACK_IMPORTED_MODULE_0__["select"](".side_bar");
    side_bar.style('width', `${current.sidebar.width}px`);
    const eventHandler = new _etc_SimpleEventHandler__WEBPACK_IMPORTED_MODULE_4__["SimpleEventHandler"](d3__WEBPACK_IMPORTED_MODULE_0__["select"]('body').node());
    /*
    *
    * ==== Variables and Accesors
    *
    * */
    /*
    *
    * Project and Layer Selection
    *
    * */
    const ds_selector = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#project_selector');
    const layer_selector = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#layer_selector');
    const recipe_ablation_selector = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#recipe_select_ablation');
    const recipe_copy_selector = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#recipe_select_copy');
    const sel_project = () => current.projects[ds_selector.property('value')];
    const sel_layer = () => layer_selector.property('value');
    const sel_watch = () => d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.watch.selected')
        .attr('id').split('_')[1];
    const ablation_values = (recipe) => current.recipes.ablation[recipe].scores;
    function setup_project_layer() {
        const updateProjectSelector = () => {
            // const ds = ds_selector.property('value');
            const project = sel_project();
            // d3.select('#raw_code')
            //     .text(JSON.stringify(current.projects[ds], null, 2))
            const layers = layer_selector.selectAll('option')
                .data(project.info.layers);
            layers.exit().remove();
            layers.enter().append('option')
                .merge(layers)
                .attr('value', d => d)
                .attr('selected', d => d.match(/4$/g) ? true : null) // for demo
                .text(d => d);
            updateRecipeList();
        };
        function updateRecipeList() {
            current.recipes.ablation = {};
            _api_GanterAPI__WEBPACK_IMPORTED_MODULE_5__["GanterAPI"].rankings(sel_project().project, sel_layer())
                .then(ranks => {
                console.log(ranks, "--- recipes");
                const names = ranks.res.map(d => d.name);
                Helper.update_selector(recipe_ablation_selector, names);
                Helper.update_selector(recipe_copy_selector, names);
                current.recipes.ablation = {};
                current.recipes.copy = {};
                ranks.res.forEach(rank => {
                    current.recipes.ablation[rank.name] = rank;
                    current.recipes.copy[rank.name] = rank;
                });
                update_units();
            });
            _api_GanterAPI__WEBPACK_IMPORTED_MODULE_5__["GanterAPI"].levels(sel_project().project, sel_layer())
                .then(level_req => {
                current.recipes.copy_values = level_req.res
                    .map(levels => levels[0]);
            });
        }
        _api_GanterAPI__WEBPACK_IMPORTED_MODULE_5__["GanterAPI"].allProjects().then((projects) => {
            projects.forEach(p => current.projects[p.project] = p);
            let options = ds_selector
                .selectAll('option').data(projects.map(p => p.project));
            options.exit().remove();
            options.enter().append('option')
                .merge(options).attr('value', d => d).text(d => d);
            updateProjectSelector();
        });
        ds_selector.on('change', d => {
            updateProjectSelector();
        });
    }
    setup_project_layer();
    /*
    *
    * ===== RECIPES and UNITS ======
    *
    * */
    function update_units_ablation() {
        const r_string = recipe_ablation_selector.property('value');
        const label_prefix = r_string.split('-')[0];
        update_unit_images(ablation_values(r_string), label_prefix);
    }
    function update_units_copy() {
        const r_string = recipe_copy_selector.property('value');
        const label_prefix = r_string.split('-')[0];
        update_unit_images(ablation_values(r_string), label_prefix);
    }
    recipe_ablation_selector.on('change', () => {
        console.log(sel_watch(), "--- sel_watch()");
        // if ('ablation' === sel_watch()) update_units_ablation();
        update_units();
        updateImages();
    });
    recipe_copy_selector.on('change', () => {
        // if ('copy' === sel_watch()) update_units_copy();
        update_units();
        updateImages();
    });
    d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.watch').on('click', function () {
        const me = this;
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.watch')
            .classed('selected', function () {
            return this == me;
        });
        if (sel_watch() === 'ablation') {
            update_units_ablation();
        }
        else {
            update_units_copy();
        }
    });
    function update_units() {
        if (sel_watch() === 'ablation') {
            update_units_ablation();
        }
        else {
            update_units_copy();
        }
    }
    function update_unit_images(values = null, label_prefix = '', sort_fct = (a, b) => a - b) {
        const ablate_ids = _current_ablation_ids();
        const copy_ids = _current_copy_ids();
        _api_GanterAPI__WEBPACK_IMPORTED_MODULE_5__["GanterAPI"].units(sel_project().project, sel_layer())
            .then(unitres => {
            const units = unitres.res;
            let indices = [];
            if (values) {
                indices = Object(_etc_Util__WEBPACK_IMPORTED_MODULE_6__["argsort"])(values, sort_fct);
            }
            else {
                indices = d3__WEBPACK_IMPORTED_MODULE_0__["range"](units.length);
            }
            let uni = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#units')
                .selectAll('.unit')
                .data(indices); //, (d, i) => i + 'c' + d);
            uni.exit().remove();
            const uniEnter = uni.enter().append('div')
                .attr('class', 'unit');
            uniEnter.append('img').classed('unitImg', true);
            uniEnter.append('div').classed('label', true);
            // uniEnter.append('div').classed('ablation', true);
            uni = uniEnter.merge(uni);
            uni.select('img')
                .attr('src', d => units[d].img)
                .classed('ablate', d => ablate_ids.includes(d))
                .classed('copy', d => copy_ids.includes(d));
            uni.select('.label').text((d, i) => `${label_prefix} #${i}`);
            // uni.select('.ablation')
            //     .style('width', d =>
            //         values.length > d ? `${(values[d]) / values[indices[0]] * 59 + 1}px` : '1px'
            //     )
        });
    }
    const rm_unit = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#rm_unit');
    const cp_unit = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#cp_unit');
    const no_rm_units = () => +rm_unit.property('value');
    const no_cp_units = () => +cp_unit.property('value');
    rm_unit.on('change', () => {
        updateImages();
        update_units();
    });
    /*
    *
    * === IMAGES ===
    *
    * */
    const image_select = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#image_select');
    const sel_images = () => {
        const img_str = image_select.property('value');
        const parts = img_str.trim().split(',');
        let res = [];
        parts.forEach(part_x => {
            const part = part_x.trim();
            if (!!part.match(/^[0-9]+$/g)) {
                res = [...res, +part];
            }
            else if (!!part.match(/^[0-9]+-[0-9]+$/g)) {
                const subparts = part.split('-');
                res = [...res, ...d3__WEBPACK_IMPORTED_MODULE_0__["range"](+subparts[0], +subparts[1] + 1)];
            }
        });
        return res;
    };
    Helper.selector_on_change_or_enter(image_select, updateImages);
    const image_list = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#image_list');
    const subImageToID = d => `id_${d.id}${d.ablated ? '-ablated' : ''}`;
    const sel_zoom = () => +d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#input_zoom').property('value');
    d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#input_zoom').on('change', () => {
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.gan_sub_image').each(function (d) {
            const me = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this);
            const psv = me.property('psv');
            psv.zoom = sel_zoom();
        });
    });
    const sel_opacity = () => d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#input_opacity').property('value');
    d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#input_opacity').on('change', () => {
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.gan_sub_image').each(function (d) {
            const me = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this);
            const psv = me.property('psv');
            psv.opacity = sel_opacity();
        });
    });
    function _updateImages(imgs) {
        const zoom_level = sel_zoom();
        const opacity = sel_opacity();
        let gan_image = image_list.selectAll('.gan_image')
            .data(imgs);
        gan_image.exit().remove();
        gan_image = gan_image.enter().append('div')
            .attr('class', 'gan_image')
            .merge(gan_image);
        let gan_sub = gan_image.selectAll('.gan_sub_image')
            .data(d => d);
        gan_sub.exit().remove();
        const gan_sub_enter = gan_sub.enter().append('div')
            .attr('class', d => 'gan_sub_image ' + subImageToID(d))
            .html('<img/><br/>');
        gan_sub_enter.each(function (d) {
            console.log(d, this, "---enter d");
            const me = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this);
            const psv = new _vis_PaintSelectView__WEBPACK_IMPORTED_MODULE_7__["PaintSelectView"](d3__WEBPACK_IMPORTED_MODULE_0__["select"](this), eventHandler);
            psv.zoom = zoom_level;
            psv.opacity = opacity;
            me.property('psv', psv);
        });
        gan_sub_enter.append('button')
            .on('click', function () {
            const p = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode);
            const psv = p.property('psv');
            psv.reset();
        });
        gan_sub_enter.append('span');
        // TODO: v1
        // const svgs = gan_sub_enter.append('svg');
        // decorateSVG(svgs);
        gan_sub = gan_sub_enter.merge(gan_sub);
        gan_sub.each(function (d) {
            const me = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this);
            const psv = me.property('psv');
            const img = new Image();
            img.onload = () => {
                psv.update({
                    image: img,
                    imageID: subImageToID(d)
                });
            };
            img.src = d.d;
        });
        // todo: v1
        // gan_sub.select('img')
        //     .attr('class', subImageToID)
        //     .attr('src', d => d.d)
        //     .attr('width', current.image.size);
        gan_sub.select('span').text(d => d.ablated ? d.id + '-ablated' : d.id);
    }
    function decorateSVG(svg) {
        console.log(svg, "--- svg");
        const im_s = current.image.size;
        svg.attr('width', im_s)
            .attr('height', im_s);
        const bg = svg.append('g').attr('class', 'bg');
        bg.append('rect').attr('class', 'pointer');
        const activeLayer = svg.append('rect')
            .attr('class', 'single_pick')
            .attr('width', im_s)
            .attr('height', im_s);
        activeLayer.on('mousemove', function () {
            const pointer = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode).select('.pointer');
            if (pointer.classed('selected'))
                return;
            const coo = d3__WEBPACK_IMPORTED_MODULE_0__["mouse"](this);
            let tl_grid = coo.map(coord_im2grid).map(Math.floor);
            const br_grid = tl_grid.map(d => d + 1);
            const br = br_grid.map(coord_grid2im);
            const tl = tl_grid.map(coord_grid2im);
            pointer.attrs({
                x: tl[0],
                y: tl[1],
                width: br[0] - tl[0],
                height: br[1] - tl[1]
            });
            pointer.property('_selection_', [tl_grid, br_grid]);
        });
        activeLayer.on('click', function (d) {
            const pointer = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode).select('.pointer');
            const newValue = !pointer.classed('selected');
            pointer.classed('selected', newValue);
            if (newValue) {
                const edata = {
                    image: d,
                    selection: pointer.property('_selection_')
                };
                eventHandler.trigger(events.dropping, edata);
            }
            else {
                const edata = {
                    image: d,
                    selection: null
                };
                eventHandler.trigger(events.dropping, edata);
            }
        });
        activeLayer.on('mouseleave', function () {
            const pointer = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this.parentNode).select('.pointer');
            if (!pointer.classed('selected')) {
                pointer.attrs({ x: -10, y: -10, width: 0, height: 0 });
            }
        });
    }
    const coord_im2grid = x => x * 8. / current.image.size;
    const coord_grid2im = x => Math.round(x * current.image.size / 8.);
    function selectPicker(id, ablated) {
        const sub_images = image_list.selectAll('.gan_sub_image');
        const add_them = sub_images.filter((d) => {
            return (d.id === id) && (d.ablated === ablated);
        });
        sub_images.select('button').classed('selected', false);
        sub_images.select('svg .brush').remove();
        add_them.select('button').classed('selected', true);
        const im_s = current.image.size;
        // const d_unit = x => x * 8. / im_s;
        // const d_unit_inv = x => Math.round(x * im_s / 8.);
        function burshend() {
            if (!d3__WEBPACK_IMPORTED_MODULE_0__["event"].sourceEvent)
                return; // Only transition after input.
            if (!d3__WEBPACK_IMPORTED_MODULE_0__["event"].selection)
                return; // Ignore empty selections.
            console.log(d3__WEBPACK_IMPORTED_MODULE_0__["event"].selection, "--- d3.event.selection");
            const p0 = d3__WEBPACK_IMPORTED_MODULE_0__["event"].selection[0].map(coord_im2grid);
            const p1 = d3__WEBPACK_IMPORTED_MODULE_0__["event"].selection[1].map(coord_im2grid);
            let p00 = p0.map(Math.round);
            let p11 = p1.map(Math.round);
            if (p00[0] >= p11[0]) {
                p00[0] = Math.floor(p0[0]);
                p11[0] = Math.floor(p0[0]) + 1;
            }
            if (p00[1] >= p11[1]) {
                p00[1] = Math.floor(p0[1]);
                p11[1] = Math.floor(p0[1]) + 1;
            }
            current.pick.selection = [p00, p11];
            eventHandler.trigger(events.picking, null);
            const pl = [p00.map(coord_grid2im), p11.map(coord_grid2im)];
            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).transition().call(brush.move, pl);
        }
        const brush = d3__WEBPACK_IMPORTED_MODULE_0__["brush"]()
            .extent([[0, 0], [im_s, im_s]])
            .on('end', burshend);
        add_them.select('svg').append("g")
            .attr("class", "brush")
            .call(brush)
            .selectAll('.selection')
            .style('fill-opacity', 0.2)
            .style('stroke', 'red')
            .style('stroke-width', '2px');
        // .on("start brush", brushed)
        // .on("end", brushended);
    }
    function _current_ablation_ids() {
        const n_rm = no_rm_units();
        // ablation_sort_values(recipe_ablation_selector.property('value'));
        let us = Object(_etc_Util__WEBPACK_IMPORTED_MODULE_6__["argsort"])(ablation_values(recipe_ablation_selector.property('value')), (a, b) => a - b);
        if (!us)
            us = d3__WEBPACK_IMPORTED_MODULE_0__["range"](n_rm + 1);
        return us
            .slice(0, Math.min(n_rm, us.length));
    }
    function _current_ablation_payload() {
        const layer = sel_layer();
        return _current_ablation_ids()
            .map(unit => ({
            layer,
            unit,
            alpha: 1
        }));
    }
    function _current_copy_ids() {
        const n_cp = no_cp_units();
        const sort_dim = recipe_copy_selector.property('value');
        let us = Object(_etc_Util__WEBPACK_IMPORTED_MODULE_6__["argsort"])(ablation_values(sort_dim), (a, b) => a - b);
        return us
            .slice(0, Math.min(n_cp, us.length));
    }
    function _current_copy_payload() {
        const copy_values = current.recipes.copy_values;
        const layer = sel_layer();
        return _current_copy_ids()
            .map(unit => ({
            layer,
            unit,
            alpha: 1,
            value: +copy_values[unit]
        }));
    }
    function _current_copy_payload_old() {
        const n_cp = no_cp_units();
        const sort_dim = recipe_copy_selector.property('value');
        const us = Object(_etc_Util__WEBPACK_IMPORTED_MODULE_6__["argsort"])(current.unit_sorting.copy[sort_dim], (a, b) => b - a);
        // const copy_values = current.unit_sorting.copy[sort_dim.split('_')[0]];
        const copy_values = current.unit_sorting.copy['max'];
        console.log(copy_values, "--- copy_values");
        const layer = sel_layer();
        return us
            .slice(0, Math.min(n_cp, us.length))
            .map(unit => ({
            layer,
            unit,
            alpha: 1,
            value: +copy_values[unit]
        }));
    }
    function updateImages(images = sel_images()) {
        _api_GanterAPI__WEBPACK_IMPORTED_MODULE_5__["GanterAPI"].generateImgs(sel_project().project, images, 0, [])
            .then(gImgs => {
            const n_rm = no_rm_units();
            console.log(n_rm, "--- n");
            if (n_rm > 0) {
                const payload = _current_ablation_payload();
                _api_GanterAPI__WEBPACK_IMPORTED_MODULE_5__["GanterAPI"]
                    .generateImgs(sel_project().project, images, 0, payload)
                    .then(abl_res => {
                    _updateImages(gImgs.res
                        .map((d, i) => {
                        const abl = abl_res.res[i];
                        return [{
                                d: d.d,
                                id: d.id,
                                ablated: false
                            }, {
                                d: abl.d,
                                id: d.id,
                                ablated: true
                            }];
                    }));
                });
            }
            else {
                _updateImages(gImgs.res.map(d => [{
                        d: d.d,
                        id: d.id,
                        ablated: false
                    }]));
            }
        });
    }
    /*
     *
     *  ===== EVENTS ====
     *
     */
    eventHandler.bind(events.picking, () => {
        const pick = current.pick;
        const bb = pick.selection; // IN CG ORDER --> convert to Matrix order
        const ablations = pick.ablated ? _current_ablation_payload() : [];
        _api_GanterAPI__WEBPACK_IMPORTED_MODULE_5__["GanterAPI"].generateFeaturesLocal(sel_project().project, [pick.id], [sel_layer()], [{
                shape: [8, 8],
                bitbounds: [bb[0][1], bb[0][0], bb[1][1], bb[1][0]],
                bitstring: null
            }], ablations).then(f_resp => {
            const features = f_resp.res[sel_layer()];
            Helper.update_selector(recipe_copy_selector, Object.keys(features));
            current.unit_sorting.copy = features;
            Object.keys(features);
        });
    });
    // TODO: broken -- was for V1 --- ID is now attached to DIV and not IMG
    eventHandler.bind(events.dropping, (edata) => {
        console.log(edata, "--- edata");
        const bb = edata.selection;
        console.log(_current_copy_payload(), "--- _current_copy_payload()");
        if (bb) {
            _api_GanterAPI__WEBPACK_IMPORTED_MODULE_5__["GanterAPI"].generateImgsIntervention(sel_project().project, [edata.image.id], 0, edata.image.ablated ? _current_ablation_payload() : [], _current_copy_payload(), {
                bitbounds: [bb[0][1], bb[0][0], bb[1][1], bb[1][0]],
                bitstring: '1',
                shape: [8, 8]
            }).then(d => {
                d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.' + subImageToID(edata.image))
                    .attr('src', d.res[0].d);
                console.log(d.res[0].d, subImageToID(edata.image), "--- d");
            });
        }
        else {
            _api_GanterAPI__WEBPACK_IMPORTED_MODULE_5__["GanterAPI"].generateImgs(sel_project().project, [edata.image.id], 0, edata.image.ablated ? _current_ablation_payload() : []).then(d => {
                d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.' + subImageToID(edata.image))
                    .attr('src', d.res[0].d);
            });
        }
    });
    eventHandler.bind(_vis_PaintSelectView__WEBPACK_IMPORTED_MODULE_7__["PaintSelectView"].events.maskChanged, (im) => {
        const img_data = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.' + im.id).datum();
        _api_GanterAPI__WEBPACK_IMPORTED_MODULE_5__["GanterAPI"].generateImgsIntervention(sel_project().project, [img_data.id], 0, img_data.ablated ? _current_ablation_payload() : [], _current_copy_payload(), {
            bitbounds: [],
            bitstring: im.mask,
            shape: []
        }).then(d => {
            d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.' + im.id).each(function () {
                const me = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this);
                const psv = me.property('psv');
                const img = new Image();
                img.onload = () => {
                    psv.update({
                        image: img,
                        imageID: im.id
                    });
                };
                img.src = d.res[0].d;
            });
            // .attr('src', d.res[0].d);
            console.log(d.res[0].d, "--- d");
        });
        // } else {
        //     GanterAPI.generateImgs(
        //         sel_project().project,
        //         [edata.image.id],
        //         0,
        //         edata.image.ablated ? _current_ablation_payload() : []
        //     ).then(d => {
        //         d3.selectAll('.' + subImageToID(edata.image))
        //             .attr('src', d.res[0].d);
        //
        //     })
        // }
    });
    /*
    *
    *  ===== UI stuff ====
    *
     */
    function setup_ui() {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#sidebar_btn')
            .on('click', function () {
            const sb = current.sidebar;
            sb.visible = !sb.visible;
            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this)
                .classed('on', sb.visible);
            side_bar.classed('hidden', !sb.visible);
            side_bar.style('right', sb.visible ? null : `-${current.sidebar.width}px`);
            re_layout();
        });
        window.onresize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            // console.log(w, h, "--- w,h");
            re_layout(w, h);
        };
        function re_layout(w = window.innerWidth, h = window.innerHeight) {
            d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.sidenav')
                .style('height', (h - 53) + 'px');
            const sb = current.sidebar;
            const mainWidth = w - (sb.visible ? sb.width : 0);
            d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.main_frame')
                .style('height', (h - 53) + 'px')
                .style('width', mainWidth + 'px');
            // eventHandler.trigger(GlobalEvents.window_resize, {w, h})
            // eventHandler.trigger(GlobalEvents.main_resize, {
            //     w: (w - global.sidebar()),
            //     h: (h - 45)
            // })
        }
        re_layout(window.innerWidth, window.innerHeight);
    }
    setup_ui();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguaHRtbCIsIndlYnBhY2s6Ly8vLi9jc3MvZ2FuY2xpZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vdHMvYXBpL0dhbnRlckFQSS50cyIsIndlYnBhY2s6Ly8vLi90cy9ldGMvU1ZHcGx1cy50cyIsIndlYnBhY2s6Ly8vLi90cy9ldGMvU2ltcGxlRXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3RzL2V0Yy9VdGlsLnRzIiwid2VicGFjazovLy8uL3RzL2dhbmNsaWVudC50cyIsIndlYnBhY2s6Ly8vLi90cy92aXMvUGFpbnRTZWxlY3RWaWV3LnRzIiwid2VicGFjazovLy8uL3RzL3Zpcy9WaXNDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7O0FBdk5ELDZFQUE2RTtBQUU3RTs7O0dBR0c7QUFFSSxpQkFBTSxHQUFPLEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFDLENBQUMiLCJmaWxlIjoiZ2FuY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJnYW5jbGllbnRcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3RzL2dhbmNsaWVudC50c1wiLFwidmVuZG9yXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW5kZXguaHRtbFwiOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8qXG5HYW50ZXIgQVBJIGFuZCBUeXBlc1xuICovXG5cbmltcG9ydCAqIGFzIGQzIGZyb20gXCJkM1wiO1xuXG5leHBvcnQgdHlwZSBBYmxhdGlvbkRhdGEgPSB7XG4gICAgY2hhbm5lbHM6IHsgZDogc3RyaW5nLCBpZDogbnVtYmVyIH1bXSxcbiAgICBhYmxhdGlvbjogbnVtYmVyW10gfCBudWxsLFxuICAgIC8vIHo6IG51bWJlcltdIHwgbnVsbFxufVxuXG5leHBvcnQgdHlwZSBBYmxhdGlvblVwbG9hZCA9IHtcbiAgICBhbHBoYTogbnVtYmVyLCBsYXllcjogc3RyaW5nLCB1bml0OiBudW1iZXIsIHZhbHVlPzogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFJlY2lwZSA9IHtcbiAgICBsYXllcjogc3RyaW5nLFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICB1bml0OiB7IGFscGhhOiBudW1iZXIsIHVuaXQ6IG51bWJlciB9W11cbn1cblxuZXhwb3J0IHR5cGUgUmFua2luZyA9IHtcbiAgICBtZXRyaWM6IHN0cmluZyxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgc2NvcmVzOiBudW1iZXJbXVxufVxuXG5cbmV4cG9ydCB0eXBlIEFQSV9Qcm9qZWN0ID0ge1xuICAgIHByb2plY3Q6IHN0cmluZ1xuICAgIGluZm86IHtcbiAgICAgICAgbGF5ZXJzOiBzdHJpbmdbXVxuICAgIH1cblxufVxuXG5leHBvcnQgdHlwZSBBUElfQWxsUHJvamVjdCA9IEFQSV9Qcm9qZWN0W11cbmV4cG9ydCB0eXBlIEFQSV9DaGFubmVscyA9IHtcbiAgICByZXF1ZXN0OiB7IFtrZXk6IHN0cmluZ106IGFueSB9LFxuICAgIHJlczogQWJsYXRpb25EYXRhXG59XG5cbmV4cG9ydCB0eXBlIEFQSV9SZWNpcGVzID0ge1xuICAgIHJlcXVlc3Q6IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICAgcmVzOiBSZWNpcGVbXVxufVxuXG5leHBvcnQgdHlwZSBBUElfUmFua2luZ3MgPSB7XG4gICAgcmVxdWVzdDogeyBwcm9qZWN0OiBzdHJpbmcsIGxheWVyOiBzdHJpbmcgfSxcbiAgICByZXM6IFJhbmtpbmdbXVxufVxuXG5cbmV4cG9ydCB0eXBlIEdBTlVuaXQgPSB7XG4gICAgdW5pdDogbnVtYmVyLCBpbWc6IHN0cmluZywgbGFiZWw6IHN0cmluZ1xufVxuZXhwb3J0IHR5cGUgQVBJX3VuaXRzID0ge1xuICAgIHJlcXVlc3Q6IHsgcHJvamVjdDogc3RyaW5nLCBsYXllcjogc3RyaW5nIH0sXG4gICAgcmVzOiBHQU5Vbml0W11cbn1cblxuXG5leHBvcnQgdHlwZSBBUElfZ2VuZXJhdGUgPSB7XG4gICAgcmVxdWVzdDoge1xuICAgICAgICBcImFibGF0aW9uc1wiOlxuICAgICAgICAgICAgQWJsYXRpb25VcGxvYWRbXSB8IG51bGwsXG4gICAgICAgIFwiaWRzXCI6IG51bWJlcltdLFxuICAgICAgICBcInByb2plY3RcIjogc3RyaW5nLFxuICAgICAgICBcIndhbnR6XCI6IGJvb2xlYW5cbiAgICB9LFxuICAgIHJlczogeyBkOiBzdHJpbmcsIGlkPzogbnVtYmVyIH1bXVxufVxuXG5leHBvcnQgdHlwZSBJbWFnZU1hc2sgPSB7XG4gICAgaWQ6IHN0cmluZyxcbiAgICBtYXNrOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgQVBJX0ZlYXR1cmVNYXNrID0ge1xuICAgIGJpdGJvdW5kczogbnVtYmVyW10sXG4gICAgYml0c3RyaW5nOiBzdHJpbmcgfCBudWxsLFxuICAgIHNoYXBlOiBudW1iZXJbXVxufVxuXG5leHBvcnQgdHlwZSBBUElfZ2VuRmVhdHVyZXMgPSB7XG4gICAgcmVxdWVzdDoge1xuICAgICAgICBhYmxhdGlvbnM6XG4gICAgICAgICAgICBBYmxhdGlvblVwbG9hZFtdIHwgbnVsbCxcbiAgICAgICAgaWRzOiBudW1iZXJbXSxcbiAgICAgICAgbWFza3M6IHN0cmluZ1tdLFxuICAgICAgICBwcm9qZWN0OiBzdHJpbmcsXG5cbiAgICB9LFxuICAgIHJlczogeyBkOiBzdHJpbmcsIGlkPzogbnVtYmVyIH1bXVxufVxuXG5cbnR5cGUgQVBJX0xldmVscyA9e1xuICAgIHJlcXVlc3Q6e1xuICAgICAgICBsYXllcjpzdHJpbmcsXG4gICAgICAgIHByb2plY3Q6c3RyaW5nLFxuICAgICAgICBxdWFudGlsZXM6bnVtYmVyW11cbiAgICB9LFxuICAgIHJlczpudW1iZXJbXVtdXG59XG5cbmV4cG9ydCBjbGFzcyBHYW50ZXJBUEkge1xuXG4gICAgc3RhdGljIGFsbFByb2plY3RzKCk6IFByb21pc2U8QVBJX0FsbFByb2plY3Q+IHtcbiAgICAgICAgcmV0dXJuIGQzLmpzb24oJy9hcGkvYWxsX3Byb2plY3RzJylcbiAgICB9XG5cbiAgICBzdGF0aWMgYWJsYXRpb25DaGFubmVscyhwcm9qZWN0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIgPSBcImxheWVyMlwiKTogUHJvbWlzZTxBUElfQ2hhbm5lbHM+IHtcbiAgICAgICAgcmV0dXJuIGQzLmpzb24oYC9hcGkvY2hhbm5lbHM/cHJvamVjdD0ke3Byb2plY3R9JmxheWVyPSR7bGF5ZXJ9YClcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVjaXBlcyhwcm9qZWN0OiBzdHJpbmcpOiBQcm9taXNlPEFQSV9SZWNpcGVzPiB7XG4gICAgICAgIHJldHVybiBkMy5qc29uKGAvYXBpL3JlY2lwZXM/cHJvamVjdD0ke3Byb2plY3R9YClcbiAgICB9XG5cbiAgICBzdGF0aWMgcmFua2luZ3MocHJvamVjdDogc3RyaW5nLCBsYXllcjogc3RyaW5nKTogUHJvbWlzZTxBUElfUmFua2luZ3M+IHtcbiAgICAgICAgcmV0dXJuIGQzLmpzb24oYC9hcGkvcmFua2luZ3M/cHJvamVjdD0ke3Byb2plY3R9JmxheWVyPSR7bGF5ZXJ9YClcbiAgICB9XG5cblxuICAgIHN0YXRpYyBsZXZlbHMocHJvamVjdDogc3RyaW5nLCBsYXllcjogc3RyaW5nLCBxOm51bWJlcj0wLjk5KTogUHJvbWlzZTxBUElfTGV2ZWxzPiB7XG4gICAgICAgIC8vLi4vYXBpL2xldmVscz9wcm9qZWN0PWNodXJjaG91dGRvb3ImbGF5ZXI9bGF5ZXI0JnF1YW50aWxlcz0wLjk5XG4gICAgICAgIHJldHVybiBkMy5qc29uKGAvYXBpL2xldmVscz9wcm9qZWN0PSR7cHJvamVjdH0mbGF5ZXI9JHtsYXllcn0mcXVhbnRpbGVzPSR7cX1gKVxuXG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZ2VuZXJhdGVJbWdzKHByb2plY3Q6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkczogbnVtYmVyW10sXG4gICAgICAgICAgICAgICAgICAgICAgICB3YW50eiA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBhYmxhdGlvbnM6IEFibGF0aW9uVXBsb2FkW10gPSBbXSk6IFByb21pc2U8QVBJX2dlbmVyYXRlPiB7XG4gICAgICAgIHJldHVybiBkMy5qc29uKCcvYXBpL2dlbmVyYXRlJywge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBcImFibGF0aW9uc1wiOiBhYmxhdGlvbnMsXG4gICAgICAgICAgICAgICAgXCJwcm9qZWN0XCI6IHByb2plY3QsXG4gICAgICAgICAgICAgICAgXCJpZHNcIjogaWRzLFxuICAgICAgICAgICAgICAgIFwid2FudHpcIjogd2FudHpcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZW5lcmF0ZUltZ3NJbnRlcnZlbnRpb24ocHJvamVjdDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBudW1iZXJbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbnR6ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFibGF0aW9uX3JtOiBBYmxhdGlvblVwbG9hZFtdID0gW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYmxhdGlvbl9jcDogQWJsYXRpb25VcGxvYWRbXSA9IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza19jcDogQVBJX0ZlYXR1cmVNYXNrXG4gICAgKTogUHJvbWlzZTxBUElfZ2VuZXJhdGU+IHtcblxuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgLy8gXCJhYmxhdGlvbnNcIjogYWJsYXRpb25zLFxuICAgICAgICAgICAgXCJwcm9qZWN0XCI6IHByb2plY3QsXG4gICAgICAgICAgICBcImlkc1wiOiBpZHMsXG4gICAgICAgICAgICBcIndhbnR6XCI6IHdhbnR6LFxuICAgICAgICAgICAgXCJpbnRlcnZlbnRpb25zXCI6IFtcbiAgICAgICAgICAgICAgICB7YWJsYXRpb25zOiBhYmxhdGlvbl9ybX0sXG4gICAgICAgICAgICAgICAge2FibGF0aW9uczogYWJsYXRpb25fY3AsIG1hc2s6IG1hc2tfY3B9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhwYXlsb2FkLCBcIi0tLSBwYXlsb2FkXCIpO1xuXG4gICAgICAgIHJldHVybiBkMy5qc29uKCcvYXBpL2dlbmVyYXRlJywge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyB1bml0cyhwcm9qZWN0OiBzdHJpbmcsIGxheWVyOiBzdHJpbmcpOiBQcm9taXNlPEFQSV91bml0cz4ge1xuICAgICAgICByZXR1cm4gZDMuanNvbihgL2FwaS91bml0cz9wcm9qZWN0PSR7cHJvamVjdH0mbGF5ZXI9JHtsYXllcn1gKVxuICAgIH1cblxuXG4gICAgc3RhdGljIGdlbmVyYXRlRmVhdHVyZXMocHJvamVjdDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYXNrczogSW1hZ2VNYXNrW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXJzOiBzdHJpbmdbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYmxhdGlvbnM6IEFibGF0aW9uVXBsb2FkW10gPSBbXSk6IFByb21pc2U8QVBJX2dlbkZlYXR1cmVzPiB7XG4gICAgICAgIC8qXG4gICAgICAgIHByb2plY3QgPSBmZWF0X3JlcVsncHJvamVjdCddXG4gICAgICAgIGlkcyA9IGZlYXRfcmVxWydpZHMnXVxuICAgICAgICBtYXNrcyA9IGZlYXRfcmVxLmdldCgnbWFza3MnLCBOb25lKVxuICAgICAgICBsYXllcnMgPSBmZWF0X3JlcS5nZXQoJ2xheWVycycsIE5vbmUpXG4gICAgICAgIGFibGF0aW9ucyA9IGZlYXRfcmVxLmdldCgnYWJsYXRpb25zJywgW10pXG4gICAgICAgICovXG5cblxuICAgICAgICBjb25zdCBpZHMgPSBpbWFza3MubWFwKGQgPT4gZC5pZCk7XG4gICAgICAgIGNvbnN0IG1hc2tzID0gaW1hc2tzLm1hcChkID0+ICh7XG4gICAgICAgICAgICBzaGFwZTogW10sXG4gICAgICAgICAgICBiaXRib3VuZHM6IFtdLFxuICAgICAgICAgICAgYml0c3RyaW5nOiBkLm1hc2tcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHJldHVybiBkMy5qc29uKCcvYXBpL2ZlYXR1cmVzJywge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBhYmxhdGlvbnMsXG4gICAgICAgICAgICAgICAgcHJvamVjdCxcbiAgICAgICAgICAgICAgICBpZHMsXG4gICAgICAgICAgICAgICAgbWFza3MsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZ2VuZXJhdGVGZWF0dXJlc0xvY2FsKHByb2plY3Q6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkczogbnVtYmVyW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllcnM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3M6IEFQSV9GZWF0dXJlTWFza1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJsYXRpb25zOiBBYmxhdGlvblVwbG9hZFtdID0gW10pOiBQcm9taXNlPEFQSV9nZW5GZWF0dXJlcz4ge1xuICAgICAgICAvKlxuICAgICAgICBwcm9qZWN0ID0gZmVhdF9yZXFbJ3Byb2plY3QnXVxuICAgICAgICBpZHMgPSBmZWF0X3JlcVsnaWRzJ11cbiAgICAgICAgbWFza3MgPSBmZWF0X3JlcS5nZXQoJ21hc2tzJywgTm9uZSlcbiAgICAgICAgbGF5ZXJzID0gZmVhdF9yZXEuZ2V0KCdsYXllcnMnLCBOb25lKVxuICAgICAgICBhYmxhdGlvbnMgPSBmZWF0X3JlcS5nZXQoJ2FibGF0aW9ucycsIFtdKVxuICAgICAgICAqL1xuXG5cbiAgICAgICAgLy8gY29uc3QgaWRzID0gaW1hc2tzLm1hcChkID0+IGQuaWQpO1xuICAgICAgICAvLyBjb25zdCBtYXNrcyA9IGltYXNrcy5tYXAoZCA9PiAoe1xuICAgICAgICAvLyAgICAgc2hhcGU6IFtdLFxuICAgICAgICAvLyAgICAgYml0Ym91bmRzOiBbXSxcbiAgICAgICAgLy8gICAgIGJpdHN0cmluZzogZC5tYXNrXG4gICAgICAgIC8vIH0pKTtcblxuICAgICAgICBtYXNrcy5mb3JFYWNoKG1hc2sgPT4ge1xuICAgICAgICAgICAgaWYgKG1hc2suYml0c3RyaW5nID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiYiA9IG1hc2suYml0Ym91bmRzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJpdHMgPSAoYmJbMl0gLSBiYlswXSkgKiAoYmJbM10gLSBiYlsxXSk7XG4gICAgICAgICAgICAgICAgbWFzay5iaXRzdHJpbmcgPSAnMScucmVwZWF0KGJpdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHJldHVybiBkMy5qc29uKCcvYXBpL2ZlYXR1cmVzJywge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBhYmxhdGlvbnMsXG4gICAgICAgICAgICAgICAgcHJvamVjdCxcbiAgICAgICAgICAgICAgICBpZHMsXG4gICAgICAgICAgICAgICAgbWFza3MsXG4gICAgICAgICAgICAgICAgbGF5ZXJzXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG59XG5cbiIsImltcG9ydCAqIGFzIGQzIGZyb20gXCJkM1wiXG5cbi8qKlxuICogQ3JlYXRlZCBieSBoZW4gb24gNS8xNS8xNy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNWRyB7XG4gICAgc3RhdGljIHRyYW5zbGF0ZSh7eCwgeX0pIHtcbiAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgeCArIFwiLFwiICsgeSArIFwiKVwiXG4gICAgfVxuXG4gICAgc3RhdGljIGdyb3VwKHBhcmVudCwgY2xhc3NlcywgcG9zID0ge3g6IDAsIHk6IDB9KSB7XG4gICAgICAgIHJldHVybiBwYXJlbnQuYXBwZW5kKCdnJykuYXR0cnMoe1xuICAgICAgICAgICAgY2xhc3M6IGNsYXNzZXMsXG4gICAgICAgICAgICBcInRyYW5zZm9ybVwiOiBTVkcudHJhbnNsYXRlKHBvcylcbiAgICAgICAgfSlcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIFNWR01lYXN1cmVtZW50cyB7XG5cbiAgICBwcml2YXRlIG1lYXN1cmVFbGVtZW50OiBkMy5TZWxlY3Rpb248YW55LCBhbnksIGFueSwgYW55PjtcblxuICAgIGNvbnN0cnVjdG9yKGJhc2VFbGVtZW50LCBjbGFzc2VzID0gJycpIHtcbiAgICAgICAgdGhpcy5tZWFzdXJlRWxlbWVudCA9IGJhc2VFbGVtZW50LmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAuYXR0cnMoe3g6IDAsIHk6IC0yMCwgY2xhc3M6IGNsYXNzZXN9KVxuXG4gICAgfVxuXG4gICAgdGV4dExlbmd0aCh0ZXh0LCBzdHlsZSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5tZWFzdXJlRWxlbWVudC5hdHRyKCdzdHlsZScsIHN0eWxlKTtcbiAgICAgICAgdGhpcy5tZWFzdXJlRWxlbWVudC50ZXh0KHRleHQpO1xuICAgICAgICBjb25zdCB0bCA9ICg8U1ZHVGV4dEVsZW1lbnQ+IHRoaXMubWVhc3VyZUVsZW1lbnQubm9kZSgpKS5nZXRDb21wdXRlZFRleHRMZW5ndGgoKTtcbiAgICAgICAgdGhpcy5tZWFzdXJlRWxlbWVudC50ZXh0KCcnKTtcblxuICAgICAgICByZXR1cm4gdGw7XG4gICAgfVxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBoZW4gb24gNS8xNS8xNy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNpbXBsZUV2ZW50SGFuZGxlciB7XG5cbiAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgIGV2ZW50TGlzdGVuZXJzOiBvYmplY3RbXTtcblxuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0gW11cbiAgICB9XG5cblxuICAgIGJpbmQoZXZlbnROYW1lczogc3RyaW5nLCBldmVudEZ1bmN0aW9uOiBGdW5jdGlvbikge1xuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50TmFtZSBvZiBldmVudE5hbWVzLnNwbGl0KCcgJykpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMucHVzaCh7ZXZlbnROYW1lLCBldmVudEZ1bmN0aW9ufSk7XG4gICAgICAgICAgICBjb25zdCBldmVudEZ1bmN0aW9uV3JhcCA9IGUgPT4gZXZlbnRGdW5jdGlvbihlLmRldGFpbCwgZSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50RnVuY3Rpb25XcmFwLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIHRyaWdnZXIoZXZlbnROYW1lOiBzdHJpbmcsIGRldGFpbDogb2JqZWN0KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIHtkZXRhaWx9KSk7XG4gICAgfVxuXG59IiwiaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzXCI7XG5cbi8qKlxuICogQ3JlYXRlZCBieSBoZW4gb24gNS8xNS8xNy5cbiAqL1xubGV0IHRoZV91bmlxdWVfaWRfY291bnRlciA9IDA7XG5cbmV4cG9ydCBjbGFzcyBVdGlsIHtcbiAgICBzdGF0aWMgc2ltcGxlVUlkKHtwcmVmaXggPSAnJ30pOiBzdHJpbmcge1xuICAgICAgICB0aGVfdW5pcXVlX2lkX2NvdW50ZXIgKz0gMTtcblxuICAgICAgICByZXR1cm4gcHJlZml4ICsgdGhlX3VuaXF1ZV9pZF9jb3VudGVyO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRDNTZWwgPSBkMy5TZWxlY3Rpb248YW55LCBhbnksIGFueSwgYW55PlxuXG5leHBvcnQgZnVuY3Rpb24gYXJnc29ydChhcnJheSwgc29ydEZjdCk6bnVtYmVyW10ge1xuICAgIHJldHVybiBhcnJheVxuICAgICAgICAubWFwKChkLCBpKSA9PiBbZCwgaV0pXG4gICAgICAgIC5zb3J0KChhLGIpID0+IHNvcnRGY3QoYVswXSwgYlswXSkpXG4gICAgICAgIC5tYXAoZCA9PiBkWzFdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlKGVuZCl7XG4gICAgcmV0dXJuIFsuLi5BcnJheShlbmQpLmtleXMoKV1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9ial90b19hcnIob2JqOm9iamVjdCl7XG4gICAgY29uc3Qgc29ydGVkS2V5cyA9IE9iamVjdC5rZXlzKG9iaikuc29ydCgpO1xuICAgIGNvbnN0IHJlcz1bXTtcbiAgICBzb3J0ZWRLZXlzLmZvckVhY2goayA9PiB7cmVzLnB1c2goayk7IHJlcy5wdXNoKG9ialtrXSl9KVxuICAgIHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJfdG9fb2JqKGFycjphbnkpe1xuICAgIGNvbnN0IHJlcz17fTtcbiAgICBjb25zdCBtYXhfbCA9IE1hdGguZmxvb3IoYXJyLmxlbmd0aC8yKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaTxtYXhfbDsgaSsrKXtcbiAgICAgICAgcmVzW2FyclsyKmldXSA9IGFyclsyKmkrMV07XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59IiwiaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnXG5pbXBvcnQge2JydXNofSBmcm9tICdkMydcbmltcG9ydCBcImQzLXNlbGVjdGlvbi1tdWx0aVwiO1xuXG5pbXBvcnQgJy4uL2Nzcy9nYW5jbGllbnQuc2Nzcydcbi8vIGltcG9ydCAnLi4vbm9kZV9tb2R1bGVzL2ZvbnQtYXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnXG5pbXBvcnQgXCIhZmlsZS1sb2FkZXI/bmFtZT1pbmRleC5odG1sIS4uL2luZGV4Lmh0bWxcIjtcbmltcG9ydCB7U2ltcGxlRXZlbnRIYW5kbGVyfSBmcm9tIFwiLi9ldGMvU2ltcGxlRXZlbnRIYW5kbGVyXCI7XG5pbXBvcnQge1xuICAgIEFibGF0aW9uVXBsb2FkLFxuICAgIEFQSV9Qcm9qZWN0LFxuICAgIEdhbnRlckFQSSwgSW1hZ2VNYXNrLFxuICAgIFJhbmtpbmcsXG4gICAgUmVjaXBlXG59IGZyb20gXCIuL2FwaS9HYW50ZXJBUElcIjtcbmltcG9ydCB7YXJnc29ydH0gZnJvbSBcIi4vZXRjL1V0aWxcIjtcbmltcG9ydCB7UGFpbnRTZWxlY3RWaWV3fSBmcm9tIFwiLi92aXMvUGFpbnRTZWxlY3RWaWV3XCI7XG5cblxudHlwZSBQcm9qZWN0TWFwID0ge1xuICAgIFtrZXk6IHN0cmluZ106IEFQSV9Qcm9qZWN0XG59O1xuXG50eXBlIFJlY2lwZU1hcCA9IHtcbiAgICBba2V5OiBzdHJpbmddOiBSYW5raW5nXG59XG5cbmNvbnN0IGV2ZW50cyA9IHtcbiAgICBwaWNraW5nOiAncGlja2luZycsXG4gICAgZHJvcHBpbmc6ICdkcm9wcGluZydcblxufVxuXG5jb25zdCBjdXJyZW50ID0ge1xuICAgIHNpZGViYXI6IHtcbiAgICAgICAgd2lkdGg6IDQwMCxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgaW1hZ2U6IHtcbiAgICAgICAgc2l6ZTogMzAwXG4gICAgfSxcbiAgICBwcm9qZWN0czogPFByb2plY3RNYXA+e30sXG4gICAgcmVjaXBlczoge1xuICAgICAgICBhYmxhdGlvbjogPFJlY2lwZU1hcD57fSxcbiAgICAgICAgY29weTogPFJlY2lwZU1hcD57fSxcbiAgICAgICAgY29weV92YWx1ZXM6IDxudW1iZXJbXT4gW11cbiAgICB9LFxuICAgIHVuaXRfc29ydGluZzoge1xuICAgICAgICAvLyBhYmxhdGlvbjogPG51bWJlcltdPm51bGwsXG4gICAgICAgIGNvcHk6IDx7IFtrZXk6IHN0cmluZ106IG51bWJlcltdIH0+bnVsbFxuICAgIH0sXG4gICAgcGljazoge1xuICAgICAgICBzZWxlY3Rpb246IFtbMCwgMF0sIFswLCAwXV0sXG4gICAgICAgIGlkOiAtMSxcbiAgICAgICAgYWJsYXRlZDogZmFsc2VcbiAgICB9XG5cbn07XG5cbmNsYXNzIEhlbHBlciB7XG5cbiAgICBzdGF0aWMgdXBkYXRlX3NlbGVjdG9yKHNlbGVjdG9yLCBlbnRyaWVzKSB7XG4gICAgICAgIGxldCByZWNfb3AgPSBzZWxlY3Rvci5zZWxlY3RBbGwoJ29wdGlvbicpLmRhdGEoZW50cmllcyk7XG4gICAgICAgIHJlY19vcC5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHJlY19vcC5lbnRlcigpLmFwcGVuZCgnb3B0aW9uJylcbiAgICAgICAgICAgIC5tZXJnZShyZWNfb3ApXG4gICAgICAgICAgICAuYXR0cigndmFsdWUnLCBkID0+IGQpXG4gICAgICAgICAgICAudGV4dChkID0+IGQpO1xuICAgIH07XG5cblxuICAgIHN0YXRpYyBzZWxlY3Rvcl9vbl9jaGFuZ2Vfb3JfZW50ZXIoc2VsZWN0b3IsIGYpIHtcbiAgICAgICAgc2VsZWN0b3Iub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIGYoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsZWN0b3Iub24oJ2tleXByZXNzJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGQzLmV2ZW50LmtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgICAgICAgICBmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICBjb25zdCBzaWRlX2JhciA9IGQzLnNlbGVjdChcIi5zaWRlX2JhclwiKTtcbiAgICBzaWRlX2Jhci5zdHlsZSgnd2lkdGgnLCBgJHtjdXJyZW50LnNpZGViYXIud2lkdGh9cHhgKTtcblxuICAgIGNvbnN0IGV2ZW50SGFuZGxlciA9IG5ldyBTaW1wbGVFdmVudEhhbmRsZXIoPEVsZW1lbnQ+ZDMuc2VsZWN0KCdib2R5Jykubm9kZSgpKTtcblxuICAgIC8qXG4gICAgKlxuICAgICogPT09PSBWYXJpYWJsZXMgYW5kIEFjY2Vzb3JzXG4gICAgKlxuICAgICogKi9cblxuXG4gICAgLypcbiAgICAqXG4gICAgKiBQcm9qZWN0IGFuZCBMYXllciBTZWxlY3Rpb25cbiAgICAqXG4gICAgKiAqL1xuXG4gICAgY29uc3QgZHNfc2VsZWN0b3IgPSBkMy5zZWxlY3QoJyNwcm9qZWN0X3NlbGVjdG9yJyk7XG4gICAgY29uc3QgbGF5ZXJfc2VsZWN0b3IgPSBkMy5zZWxlY3QoJyNsYXllcl9zZWxlY3RvcicpO1xuICAgIGNvbnN0IHJlY2lwZV9hYmxhdGlvbl9zZWxlY3RvciA9IGQzLnNlbGVjdCgnI3JlY2lwZV9zZWxlY3RfYWJsYXRpb24nKTtcbiAgICBjb25zdCByZWNpcGVfY29weV9zZWxlY3RvciA9IGQzLnNlbGVjdCgnI3JlY2lwZV9zZWxlY3RfY29weScpO1xuXG4gICAgY29uc3Qgc2VsX3Byb2plY3QgPSAoKSA9PiBjdXJyZW50LnByb2plY3RzW2RzX3NlbGVjdG9yLnByb3BlcnR5KCd2YWx1ZScpXTtcbiAgICBjb25zdCBzZWxfbGF5ZXIgPSAoKSA9PiA8c3RyaW5nPmxheWVyX3NlbGVjdG9yLnByb3BlcnR5KCd2YWx1ZScpO1xuICAgIGNvbnN0IHNlbF93YXRjaCA9ICgpID0+IGQzLnNlbGVjdCgnLndhdGNoLnNlbGVjdGVkJylcbiAgICAgICAgLmF0dHIoJ2lkJykuc3BsaXQoJ18nKVsxXTtcblxuXG4gICAgY29uc3QgYWJsYXRpb25fdmFsdWVzID0gKHJlY2lwZSkgPT4gY3VycmVudC5yZWNpcGVzLmFibGF0aW9uW3JlY2lwZV0uc2NvcmVzO1xuXG4gICAgZnVuY3Rpb24gc2V0dXBfcHJvamVjdF9sYXllcigpIHtcblxuXG4gICAgICAgIGNvbnN0IHVwZGF0ZVByb2plY3RTZWxlY3RvciA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnN0IGRzID0gZHNfc2VsZWN0b3IucHJvcGVydHkoJ3ZhbHVlJyk7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gc2VsX3Byb2plY3QoKTtcbiAgICAgICAgICAgIC8vIGQzLnNlbGVjdCgnI3Jhd19jb2RlJylcbiAgICAgICAgICAgIC8vICAgICAudGV4dChKU09OLnN0cmluZ2lmeShjdXJyZW50LnByb2plY3RzW2RzXSwgbnVsbCwgMikpXG4gICAgICAgICAgICBjb25zdCBsYXllcnMgPSBsYXllcl9zZWxlY3Rvci5zZWxlY3RBbGwoJ29wdGlvbicpXG4gICAgICAgICAgICAgICAgLmRhdGEocHJvamVjdC5pbmZvLmxheWVycyk7XG4gICAgICAgICAgICBsYXllcnMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICAgICAgbGF5ZXJzLmVudGVyKCkuYXBwZW5kKCdvcHRpb24nKVxuICAgICAgICAgICAgICAgIC5tZXJnZShsYXllcnMpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3ZhbHVlJywgZCA9PiBkKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzZWxlY3RlZCcsIGQgPT4gZC5tYXRjaCgvNCQvZykgPyB0cnVlIDogbnVsbCkgLy8gZm9yIGRlbW9cbiAgICAgICAgICAgICAgICAudGV4dChkID0+IGQpXG5cblxuICAgICAgICAgICAgdXBkYXRlUmVjaXBlTGlzdCgpO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUmVjaXBlTGlzdCgpIHtcbiAgICAgICAgICAgIGN1cnJlbnQucmVjaXBlcy5hYmxhdGlvbiA9IHt9O1xuXG4gICAgICAgICAgICBHYW50ZXJBUEkucmFua2luZ3Moc2VsX3Byb2plY3QoKS5wcm9qZWN0LCBzZWxfbGF5ZXIoKSlcbiAgICAgICAgICAgICAgICAudGhlbihyYW5rcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJhbmtzLCBcIi0tLSByZWNpcGVzXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVzID0gcmFua3MucmVzLm1hcChkID0+IGQubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIEhlbHBlci51cGRhdGVfc2VsZWN0b3IocmVjaXBlX2FibGF0aW9uX3NlbGVjdG9yLCBuYW1lcyk7XG4gICAgICAgICAgICAgICAgICAgIEhlbHBlci51cGRhdGVfc2VsZWN0b3IocmVjaXBlX2NvcHlfc2VsZWN0b3IsIG5hbWVzKTtcblxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LnJlY2lwZXMuYWJsYXRpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5yZWNpcGVzLmNvcHkgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgcmFua3MucmVzLmZvckVhY2gocmFuayA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LnJlY2lwZXMuYWJsYXRpb25bcmFuay5uYW1lXSA9IHJhbms7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LnJlY2lwZXMuY29weVtyYW5rLm5hbWVdID0gcmFuaztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlX3VuaXRzKCk7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgR2FudGVyQVBJLmxldmVscyhzZWxfcHJvamVjdCgpLnByb2plY3QsIHNlbF9sYXllcigpKVxuICAgICAgICAgICAgICAgIC50aGVuKGxldmVsX3JlcSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQucmVjaXBlcy5jb3B5X3ZhbHVlcyA9IGxldmVsX3JlcS5yZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAobGV2ZWxzID0+IGxldmVsc1swXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgR2FudGVyQVBJLmFsbFByb2plY3RzKCkudGhlbigocHJvamVjdHMpID0+IHtcblxuICAgICAgICAgICAgcHJvamVjdHMuZm9yRWFjaChwID0+IGN1cnJlbnQucHJvamVjdHNbcC5wcm9qZWN0XSA9IHApO1xuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBkc19zZWxlY3RvclxuICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ29wdGlvbicpLmRhdGEocHJvamVjdHMubWFwKHAgPT4gcC5wcm9qZWN0KSk7XG4gICAgICAgICAgICBvcHRpb25zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIG9wdGlvbnMuZW50ZXIoKS5hcHBlbmQoJ29wdGlvbicpXG4gICAgICAgICAgICAgICAgLm1lcmdlKG9wdGlvbnMpLmF0dHIoJ3ZhbHVlJywgZCA9PiBkKS50ZXh0KGQgPT4gZCk7XG5cbiAgICAgICAgICAgIHVwZGF0ZVByb2plY3RTZWxlY3RvcigpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRzX3NlbGVjdG9yLm9uKCdjaGFuZ2UnLCBkID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZVByb2plY3RTZWxlY3RvcigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXR1cF9wcm9qZWN0X2xheWVyKCk7XG5cblxuICAgIC8qXG4gICAgKlxuICAgICogPT09PT0gUkVDSVBFUyBhbmQgVU5JVFMgPT09PT09XG4gICAgKlxuICAgICogKi9cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV91bml0c19hYmxhdGlvbigpIHtcbiAgICAgICAgY29uc3Qgcl9zdHJpbmc6IHN0cmluZyA9IHJlY2lwZV9hYmxhdGlvbl9zZWxlY3Rvci5wcm9wZXJ0eSgndmFsdWUnKTtcbiAgICAgICAgY29uc3QgbGFiZWxfcHJlZml4ID0gcl9zdHJpbmcuc3BsaXQoJy0nKVswXTtcbiAgICAgICAgdXBkYXRlX3VuaXRfaW1hZ2VzKFxuICAgICAgICAgICAgYWJsYXRpb25fdmFsdWVzKHJfc3RyaW5nKSxcbiAgICAgICAgICAgIGxhYmVsX3ByZWZpeFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV91bml0c19jb3B5KCkge1xuICAgICAgICBjb25zdCByX3N0cmluZzogc3RyaW5nID0gcmVjaXBlX2NvcHlfc2VsZWN0b3IucHJvcGVydHkoJ3ZhbHVlJyk7XG4gICAgICAgIGNvbnN0IGxhYmVsX3ByZWZpeCA9IHJfc3RyaW5nLnNwbGl0KCctJylbMF07XG4gICAgICAgIHVwZGF0ZV91bml0X2ltYWdlcyhcbiAgICAgICAgICAgIGFibGF0aW9uX3ZhbHVlcyhyX3N0cmluZyksXG4gICAgICAgICAgICBsYWJlbF9wcmVmaXhcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZWNpcGVfYWJsYXRpb25fc2VsZWN0b3Iub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coc2VsX3dhdGNoKCksIFwiLS0tIHNlbF93YXRjaCgpXCIpO1xuICAgICAgICAvLyBpZiAoJ2FibGF0aW9uJyA9PT0gc2VsX3dhdGNoKCkpIHVwZGF0ZV91bml0c19hYmxhdGlvbigpO1xuICAgICAgICB1cGRhdGVfdW5pdHMoKTtcbiAgICAgICAgdXBkYXRlSW1hZ2VzKCk7XG4gICAgfSk7XG5cbiAgICByZWNpcGVfY29weV9zZWxlY3Rvci5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAvLyBpZiAoJ2NvcHknID09PSBzZWxfd2F0Y2goKSkgdXBkYXRlX3VuaXRzX2NvcHkoKTtcbiAgICAgICAgdXBkYXRlX3VuaXRzKCk7XG4gICAgICAgIHVwZGF0ZUltYWdlcygpO1xuICAgIH0pO1xuXG4gICAgZDMuc2VsZWN0QWxsKCcud2F0Y2gnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICAgICAgZDMuc2VsZWN0QWxsKCcud2F0Y2gnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzID09IG1lXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc2VsX3dhdGNoKCkgPT09ICdhYmxhdGlvbicpIHtcbiAgICAgICAgICAgIHVwZGF0ZV91bml0c19hYmxhdGlvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXBkYXRlX3VuaXRzX2NvcHkoKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV91bml0cygpIHtcbiAgICAgICAgaWYgKHNlbF93YXRjaCgpID09PSAnYWJsYXRpb24nKSB7XG4gICAgICAgICAgICB1cGRhdGVfdW5pdHNfYWJsYXRpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVwZGF0ZV91bml0c19jb3B5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV91bml0X2ltYWdlcyh2YWx1ZXM6IG51bWJlcltdID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxfcHJlZml4ID0gJycsIHNvcnRfZmN0ID0gKGEsIGIpID0+IGEgLSBiKSB7XG5cbiAgICAgICAgY29uc3QgYWJsYXRlX2lkcyA9IF9jdXJyZW50X2FibGF0aW9uX2lkcygpO1xuICAgICAgICBjb25zdCBjb3B5X2lkcyA9IF9jdXJyZW50X2NvcHlfaWRzKCk7XG5cblxuICAgICAgICBHYW50ZXJBUEkudW5pdHMoc2VsX3Byb2plY3QoKS5wcm9qZWN0LCBzZWxfbGF5ZXIoKSlcbiAgICAgICAgICAgIC50aGVuKHVuaXRyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXRzID0gdW5pdHJlcy5yZXM7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW5kaWNlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNlcyA9IGFyZ3NvcnQodmFsdWVzLCBzb3J0X2ZjdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNlcyA9IGQzLnJhbmdlKHVuaXRzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHVuaSA9IGQzLnNlbGVjdCgnI3VuaXRzJylcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnVuaXQnKVxuICAgICAgICAgICAgICAgICAgICAuZGF0YShpbmRpY2VzKS8vLCAoZCwgaSkgPT4gaSArICdjJyArIGQpO1xuXG4gICAgICAgICAgICAgICAgdW5pLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB1bmlFbnRlciA9IHVuaS5lbnRlcigpLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3VuaXQnKTtcblxuICAgICAgICAgICAgICAgIHVuaUVudGVyLmFwcGVuZCgnaW1nJykuY2xhc3NlZCgndW5pdEltZycsIHRydWUpO1xuICAgICAgICAgICAgICAgIHVuaUVudGVyLmFwcGVuZCgnZGl2JykuY2xhc3NlZCgnbGFiZWwnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAvLyB1bmlFbnRlci5hcHBlbmQoJ2RpdicpLmNsYXNzZWQoJ2FibGF0aW9uJywgdHJ1ZSk7XG5cblxuICAgICAgICAgICAgICAgIHVuaSA9IHVuaUVudGVyLm1lcmdlKHVuaSk7XG4gICAgICAgICAgICAgICAgdW5pLnNlbGVjdCgnaW1nJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGQgPT4gdW5pdHNbZF0uaW1nKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnYWJsYXRlJywgZCA9PiBhYmxhdGVfaWRzLmluY2x1ZGVzKGQpKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnY29weScsIGQgPT4gY29weV9pZHMuaW5jbHVkZXMoZCkpO1xuICAgICAgICAgICAgICAgIHVuaS5zZWxlY3QoJy5sYWJlbCcpLnRleHQoKGQsIGkpID0+IGAke2xhYmVsX3ByZWZpeH0gIyR7aX1gKVxuICAgICAgICAgICAgICAgIC8vIHVuaS5zZWxlY3QoJy5hYmxhdGlvbicpXG4gICAgICAgICAgICAgICAgLy8gICAgIC5zdHlsZSgnd2lkdGgnLCBkID0+XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB2YWx1ZXMubGVuZ3RoID4gZCA/IGAkeyh2YWx1ZXNbZF0pIC8gdmFsdWVzW2luZGljZXNbMF1dICogNTkgKyAxfXB4YCA6ICcxcHgnXG4gICAgICAgICAgICAgICAgLy8gICAgIClcblxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBybV91bml0ID0gZDMuc2VsZWN0KCcjcm1fdW5pdCcpO1xuICAgIGNvbnN0IGNwX3VuaXQgPSBkMy5zZWxlY3QoJyNjcF91bml0Jyk7XG5cbiAgICBjb25zdCBub19ybV91bml0cyA9ICgpID0+ICtybV91bml0LnByb3BlcnR5KCd2YWx1ZScpO1xuICAgIGNvbnN0IG5vX2NwX3VuaXRzID0gKCkgPT4gK2NwX3VuaXQucHJvcGVydHkoJ3ZhbHVlJyk7XG5cbiAgICBybV91bml0Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIHVwZGF0ZUltYWdlcygpO1xuICAgICAgICB1cGRhdGVfdW5pdHMoKTtcbiAgICB9KTtcblxuXG4gICAgLypcbiAgICAqXG4gICAgKiA9PT0gSU1BR0VTID09PVxuICAgICpcbiAgICAqICovXG5cbiAgICBjb25zdCBpbWFnZV9zZWxlY3QgPSBkMy5zZWxlY3QoJyNpbWFnZV9zZWxlY3QnKTtcbiAgICBjb25zdCBzZWxfaW1hZ2VzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpbWdfc3RyOiBzdHJpbmcgPSBpbWFnZV9zZWxlY3QucHJvcGVydHkoJ3ZhbHVlJyk7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gaW1nX3N0ci50cmltKCkuc3BsaXQoJywnKTtcbiAgICAgICAgbGV0IHJlcyA9IFtdO1xuICAgICAgICBwYXJ0cy5mb3JFYWNoKHBhcnRfeCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0ID0gcGFydF94LnRyaW0oKTtcbiAgICAgICAgICAgIGlmICghIXBhcnQubWF0Y2goL15bMC05XSskL2cpKSB7XG4gICAgICAgICAgICAgICAgcmVzID0gWy4uLnJlcywgK3BhcnRdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghIXBhcnQubWF0Y2goL15bMC05XSstWzAtOV0rJC9nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnBhcnRzID0gcGFydC5zcGxpdCgnLScpO1xuICAgICAgICAgICAgICAgIHJlcyA9IFsuLi5yZXMsIC4uLmQzLnJhbmdlKCtzdWJwYXJ0c1swXSwgK3N1YnBhcnRzWzFdICsgMSldXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcblxuICAgIEhlbHBlci5zZWxlY3Rvcl9vbl9jaGFuZ2Vfb3JfZW50ZXIoaW1hZ2Vfc2VsZWN0LCB1cGRhdGVJbWFnZXMpO1xuXG5cbiAgICBjb25zdCBpbWFnZV9saXN0ID0gZDMuc2VsZWN0KCcjaW1hZ2VfbGlzdCcpO1xuICAgIHR5cGUgU3ViSW1hZ2VUeXBlID0geyBkOiBzdHJpbmcsIGlkOiBudW1iZXIsIGFibGF0ZWQ6IGJvb2xlYW4gfVxuXG4gICAgY29uc3Qgc3ViSW1hZ2VUb0lEID0gZCA9PiBgaWRfJHtkLmlkfSR7ZC5hYmxhdGVkID8gJy1hYmxhdGVkJyA6ICcnfWA7XG4gICAgY29uc3Qgc2VsX3pvb20gPSAoKTogbnVtYmVyID0+ICtkMy5zZWxlY3QoJyNpbnB1dF96b29tJykucHJvcGVydHkoJ3ZhbHVlJylcblxuICAgIGQzLnNlbGVjdCgnI2lucHV0X3pvb20nKS5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBkMy5zZWxlY3RBbGwoJy5nYW5fc3ViX2ltYWdlJykuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgY29uc3QgbWUgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICBjb25zdCBwc3YgPSA8UGFpbnRTZWxlY3RWaWV3Pm1lLnByb3BlcnR5KCdwc3YnKTtcbiAgICAgICAgICAgIHBzdi56b29tID0gc2VsX3pvb20oKTtcbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIGNvbnN0IHNlbF9vcGFjaXR5ID0gKCkgPT4gZDMuc2VsZWN0KCcjaW5wdXRfb3BhY2l0eScpLnByb3BlcnR5KCd2YWx1ZScpO1xuXG4gICAgZDMuc2VsZWN0KCcjaW5wdXRfb3BhY2l0eScpLm9uKCdjaGFuZ2UnLCgpPT57XG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmdhbl9zdWJfaW1hZ2UnKS5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBjb25zdCBtZSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgIGNvbnN0IHBzdiA9IDxQYWludFNlbGVjdFZpZXc+bWUucHJvcGVydHkoJ3BzdicpO1xuICAgICAgICAgICAgcHN2Lm9wYWNpdHkgPSBzZWxfb3BhY2l0eSgpO1xuICAgICAgICB9KVxuXG5cbiAgICB9KVxuXG5cblxuXG4gICAgZnVuY3Rpb24gX3VwZGF0ZUltYWdlcyhpbWdzOiBTdWJJbWFnZVR5cGVbXVtdKSB7XG5cbiAgICAgICAgY29uc3Qgem9vbV9sZXZlbCA9IHNlbF96b29tKCk7XG4gICAgICAgIGNvbnN0IG9wYWNpdHkgPSBzZWxfb3BhY2l0eSgpO1xuXG4gICAgICAgIGxldCBnYW5faW1hZ2UgPSBpbWFnZV9saXN0LnNlbGVjdEFsbCgnLmdhbl9pbWFnZScpXG4gICAgICAgICAgICAuZGF0YShpbWdzKTtcbiAgICAgICAgZ2FuX2ltYWdlLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgZ2FuX2ltYWdlID0gZ2FuX2ltYWdlLmVudGVyKCkuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dhbl9pbWFnZScpXG4gICAgICAgICAgICAubWVyZ2UoZ2FuX2ltYWdlKTtcblxuICAgICAgICBsZXQgZ2FuX3N1YiA9IGdhbl9pbWFnZS5zZWxlY3RBbGwoJy5nYW5fc3ViX2ltYWdlJylcbiAgICAgICAgICAgIC5kYXRhKGQgPT4gZCk7XG4gICAgICAgIGdhbl9zdWIuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICBjb25zdCBnYW5fc3ViX2VudGVyID0gZ2FuX3N1Yi5lbnRlcigpLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGQgPT4gJ2dhbl9zdWJfaW1hZ2UgJyArIHN1YkltYWdlVG9JRChkKSlcbiAgICAgICAgICAgIC5odG1sKCc8aW1nLz48YnIvPicpO1xuXG4gICAgICAgIGdhbl9zdWJfZW50ZXIuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZCwgdGhpcywgXCItLS1lbnRlciBkXCIpO1xuICAgICAgICAgICAgY29uc3QgbWUgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICBjb25zdCBwc3YgPSBuZXcgUGFpbnRTZWxlY3RWaWV3KGQzLnNlbGVjdCh0aGlzKSwgZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgICAgIHBzdi56b29tID0gem9vbV9sZXZlbDtcbiAgICAgICAgICAgIHBzdi5vcGFjaXR5ID0gb3BhY2l0eTtcbiAgICAgICAgICAgIG1lLnByb3BlcnR5KCdwc3YnLCBwc3YpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbl9zdWJfZW50ZXIuYXBwZW5kKCdidXR0b24nKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwID0gZDMuc2VsZWN0KCg8YW55PnRoaXMpLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBzdiA9IDxQYWludFNlbGVjdFZpZXc+cC5wcm9wZXJ0eSgncHN2Jyk7XG4gICAgICAgICAgICAgICAgcHN2LnJlc2V0KCk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBnYW5fc3ViX2VudGVyLmFwcGVuZCgnc3BhbicpO1xuXG4gICAgICAgIC8vIFRPRE86IHYxXG4gICAgICAgIC8vIGNvbnN0IHN2Z3MgPSBnYW5fc3ViX2VudGVyLmFwcGVuZCgnc3ZnJyk7XG4gICAgICAgIC8vIGRlY29yYXRlU1ZHKHN2Z3MpO1xuXG4gICAgICAgIGdhbl9zdWIgPSBnYW5fc3ViX2VudGVyLm1lcmdlKGdhbl9zdWIpO1xuXG5cbiAgICAgICAgZ2FuX3N1Yi5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBjb25zdCBtZSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgIGNvbnN0IHBzdiA9IDxQYWludFNlbGVjdFZpZXc+bWUucHJvcGVydHkoJ3BzdicpO1xuXG4gICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcHN2LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBpbWcsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlSUQ6IHN1YkltYWdlVG9JRChkKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaW1nLnNyYyA9IGQuZDtcblxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0b2RvOiB2MVxuICAgICAgICAvLyBnYW5fc3ViLnNlbGVjdCgnaW1nJylcbiAgICAgICAgLy8gICAgIC5hdHRyKCdjbGFzcycsIHN1YkltYWdlVG9JRClcbiAgICAgICAgLy8gICAgIC5hdHRyKCdzcmMnLCBkID0+IGQuZClcbiAgICAgICAgLy8gICAgIC5hdHRyKCd3aWR0aCcsIGN1cnJlbnQuaW1hZ2Uuc2l6ZSk7XG4gICAgICAgIGdhbl9zdWIuc2VsZWN0KCdzcGFuJykudGV4dChkID0+IGQuYWJsYXRlZCA/IGQuaWQgKyAnLWFibGF0ZWQnIDogZC5pZCk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWNvcmF0ZVNWRyhzdmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coc3ZnLCBcIi0tLSBzdmdcIik7XG4gICAgICAgIGNvbnN0IGltX3MgPSBjdXJyZW50LmltYWdlLnNpemU7XG4gICAgICAgIHN2Zy5hdHRyKCd3aWR0aCcsIGltX3MpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgaW1fcyk7XG5cblxuICAgICAgICBjb25zdCBiZyA9IHN2Zy5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdiZycpO1xuICAgICAgICBiZy5hcHBlbmQoJ3JlY3QnKS5hdHRyKCdjbGFzcycsICdwb2ludGVyJyk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUxheWVyID0gc3ZnLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnc2luZ2xlX3BpY2snKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgaW1fcylcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBpbV9zKTtcblxuICAgICAgICBhY3RpdmVMYXllci5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgcG9pbnRlciA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLnNlbGVjdCgnLnBvaW50ZXInKTtcbiAgICAgICAgICAgIGlmIChwb2ludGVyLmNsYXNzZWQoJ3NlbGVjdGVkJykpIHJldHVybjtcblxuXG4gICAgICAgICAgICBjb25zdCBjb28gPSBkMy5tb3VzZSh0aGlzKTtcbiAgICAgICAgICAgIGxldCB0bF9ncmlkID0gY29vLm1hcChjb29yZF9pbTJncmlkKS5tYXAoTWF0aC5mbG9vcik7XG4gICAgICAgICAgICBjb25zdCBicl9ncmlkID0gdGxfZ3JpZC5tYXAoZCA9PiBkICsgMSlcblxuXG4gICAgICAgICAgICBjb25zdCBiciA9IGJyX2dyaWQubWFwKGNvb3JkX2dyaWQyaW0pO1xuICAgICAgICAgICAgY29uc3QgdGwgPSB0bF9ncmlkLm1hcChjb29yZF9ncmlkMmltKTtcblxuICAgICAgICAgICAgcG9pbnRlci5hdHRycyh7XG4gICAgICAgICAgICAgICAgeDogdGxbMF0sXG4gICAgICAgICAgICAgICAgeTogdGxbMV0sXG4gICAgICAgICAgICAgICAgd2lkdGg6IGJyWzBdIC0gdGxbMF0sXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBiclsxXSAtIHRsWzFdXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBwb2ludGVyLnByb3BlcnR5KCdfc2VsZWN0aW9uXycsIFt0bF9ncmlkLCBicl9ncmlkXSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWN0aXZlTGF5ZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQ6IFN1YkltYWdlVHlwZSkge1xuICAgICAgICAgICAgY29uc3QgcG9pbnRlciA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLnNlbGVjdCgnLnBvaW50ZXInKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gIXBvaW50ZXIuY2xhc3NlZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIHBvaW50ZXIuY2xhc3NlZCgnc2VsZWN0ZWQnLCBuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVkYXRhOiBEcm9wRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZTogZCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBwb2ludGVyLnByb3BlcnR5KCdfc2VsZWN0aW9uXycpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlci50cmlnZ2VyKGV2ZW50cy5kcm9wcGluZywgZWRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGF0YTogRHJvcEV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IGQsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogbnVsbFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIudHJpZ2dlcihldmVudHMuZHJvcHBpbmcsIGVkYXRhKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgYWN0aXZlTGF5ZXIub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBwb2ludGVyID0gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSkuc2VsZWN0KCcucG9pbnRlcicpO1xuICAgICAgICAgICAgaWYgKCFwb2ludGVyLmNsYXNzZWQoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgICAgICAgICBwb2ludGVyLmF0dHJzKHt4OiAtMTAsIHk6IC0xMCwgd2lkdGg6IDAsIGhlaWdodDogMH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgIH1cblxuICAgIGNvbnN0IGNvb3JkX2ltMmdyaWQgPSB4ID0+IHggKiA4LiAvIGN1cnJlbnQuaW1hZ2Uuc2l6ZTtcbiAgICBjb25zdCBjb29yZF9ncmlkMmltID0geCA9PiBNYXRoLnJvdW5kKHggKiBjdXJyZW50LmltYWdlLnNpemUgLyA4Lik7XG5cblxuICAgIGZ1bmN0aW9uIHNlbGVjdFBpY2tlcihpZDogbnVtYmVyLCBhYmxhdGVkOiBib29sZWFuKSB7XG5cbiAgICAgICAgY29uc3Qgc3ViX2ltYWdlcyA9IGltYWdlX2xpc3Quc2VsZWN0QWxsKCcuZ2FuX3N1Yl9pbWFnZScpO1xuXG4gICAgICAgIGNvbnN0IGFkZF90aGVtID0gc3ViX2ltYWdlcy5maWx0ZXIoKGQ6IFN1YkltYWdlVHlwZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChkLmlkID09PSBpZCkgJiYgKGQuYWJsYXRlZCA9PT0gYWJsYXRlZClcbiAgICAgICAgfSlcblxuICAgICAgICBzdWJfaW1hZ2VzLnNlbGVjdCgnYnV0dG9uJykuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICAgIHN1Yl9pbWFnZXMuc2VsZWN0KCdzdmcgLmJydXNoJykucmVtb3ZlKCk7XG5cbiAgICAgICAgYWRkX3RoZW0uc2VsZWN0KCdidXR0b24nKS5jbGFzc2VkKCdzZWxlY3RlZCcsIHRydWUpO1xuICAgICAgICBjb25zdCBpbV9zID0gY3VycmVudC5pbWFnZS5zaXplO1xuICAgICAgICAvLyBjb25zdCBkX3VuaXQgPSB4ID0+IHggKiA4LiAvIGltX3M7XG4gICAgICAgIC8vIGNvbnN0IGRfdW5pdF9pbnYgPSB4ID0+IE1hdGgucm91bmQoeCAqIGltX3MgLyA4Lik7XG5cbiAgICAgICAgZnVuY3Rpb24gYnVyc2hlbmQoKSB7XG4gICAgICAgICAgICBpZiAoIWQzLmV2ZW50LnNvdXJjZUV2ZW50KSByZXR1cm47IC8vIE9ubHkgdHJhbnNpdGlvbiBhZnRlciBpbnB1dC5cbiAgICAgICAgICAgIGlmICghZDMuZXZlbnQuc2VsZWN0aW9uKSByZXR1cm47IC8vIElnbm9yZSBlbXB0eSBzZWxlY3Rpb25zLlxuICAgICAgICAgICAgY29uc29sZS5sb2coZDMuZXZlbnQuc2VsZWN0aW9uLCBcIi0tLSBkMy5ldmVudC5zZWxlY3Rpb25cIik7XG4gICAgICAgICAgICBjb25zdCBwMCA9IGQzLmV2ZW50LnNlbGVjdGlvblswXS5tYXAoY29vcmRfaW0yZ3JpZCk7XG4gICAgICAgICAgICBjb25zdCBwMSA9IGQzLmV2ZW50LnNlbGVjdGlvblsxXS5tYXAoY29vcmRfaW0yZ3JpZCk7XG5cbiAgICAgICAgICAgIGxldCBwMDAgPSBwMC5tYXAoTWF0aC5yb3VuZCk7XG4gICAgICAgICAgICBsZXQgcDExID0gcDEubWFwKE1hdGgucm91bmQpO1xuXG4gICAgICAgICAgICBpZiAocDAwWzBdID49IHAxMVswXSkge1xuICAgICAgICAgICAgICAgIHAwMFswXSA9IE1hdGguZmxvb3IocDBbMF0pO1xuICAgICAgICAgICAgICAgIHAxMVswXSA9IE1hdGguZmxvb3IocDBbMF0pICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwMDBbMV0gPj0gcDExWzFdKSB7XG4gICAgICAgICAgICAgICAgcDAwWzFdID0gTWF0aC5mbG9vcihwMFsxXSk7XG4gICAgICAgICAgICAgICAgcDExWzFdID0gTWF0aC5mbG9vcihwMFsxXSkgKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50LnBpY2suc2VsZWN0aW9uID0gW3AwMCwgcDExXTtcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlci50cmlnZ2VyKGV2ZW50cy5waWNraW5nLCBudWxsKTtcblxuXG4gICAgICAgICAgICBjb25zdCBwbCA9IFtwMDAubWFwKGNvb3JkX2dyaWQyaW0pLCBwMTEubWFwKGNvb3JkX2dyaWQyaW0pXTtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKCkuY2FsbChicnVzaC5tb3ZlLCBwbClcblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYnJ1c2g6IGFueSA9IGQzLmJydXNoKClcbiAgICAgICAgICAgIC5leHRlbnQoW1swLCAwXSwgW2ltX3MsIGltX3NdXSlcbiAgICAgICAgICAgIC5vbignZW5kJywgYnVyc2hlbmQpO1xuXG5cbiAgICAgICAgYWRkX3RoZW0uc2VsZWN0KCdzdmcnKS5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiYnJ1c2hcIilcbiAgICAgICAgICAgIC5jYWxsKGJydXNoKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnNlbGVjdGlvbicpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIDAuMilcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ3JlZCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsICcycHgnKVxuXG5cbiAgICAgICAgLy8gLm9uKFwic3RhcnQgYnJ1c2hcIiwgYnJ1c2hlZClcbiAgICAgICAgLy8gLm9uKFwiZW5kXCIsIGJydXNoZW5kZWQpO1xuXG5cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIF9jdXJyZW50X2FibGF0aW9uX2lkcygpIHtcbiAgICAgICAgY29uc3Qgbl9ybSA9IG5vX3JtX3VuaXRzKCk7XG4gICAgICAgIC8vIGFibGF0aW9uX3NvcnRfdmFsdWVzKHJlY2lwZV9hYmxhdGlvbl9zZWxlY3Rvci5wcm9wZXJ0eSgndmFsdWUnKSk7XG5cbiAgICAgICAgbGV0IHVzID0gYXJnc29ydChcbiAgICAgICAgICAgIGFibGF0aW9uX3ZhbHVlcyhcbiAgICAgICAgICAgICAgICByZWNpcGVfYWJsYXRpb25fc2VsZWN0b3IucHJvcGVydHkoJ3ZhbHVlJykpLFxuICAgICAgICAgICAgKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgICAgaWYgKCF1cykgdXMgPSBkMy5yYW5nZShuX3JtICsgMSk7XG4gICAgICAgIHJldHVybiB1c1xuICAgICAgICAgICAgLnNsaWNlKDAsIE1hdGgubWluKG5fcm0sIHVzLmxlbmd0aCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2N1cnJlbnRfYWJsYXRpb25fcGF5bG9hZCgpOiBBYmxhdGlvblVwbG9hZFtdIHtcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBzZWxfbGF5ZXIoKTtcbiAgICAgICAgcmV0dXJuIF9jdXJyZW50X2FibGF0aW9uX2lkcygpXG4gICAgICAgICAgICAubWFwKHVuaXQgPT4gKHtcbiAgICAgICAgICAgICAgICBsYXllcixcbiAgICAgICAgICAgICAgICB1bml0LFxuICAgICAgICAgICAgICAgIGFscGhhOiAxXG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2N1cnJlbnRfY29weV9pZHMoKSB7XG4gICAgICAgIGNvbnN0IG5fY3AgPSBub19jcF91bml0cygpO1xuXG4gICAgICAgIGNvbnN0IHNvcnRfZGltID0gcmVjaXBlX2NvcHlfc2VsZWN0b3IucHJvcGVydHkoJ3ZhbHVlJyk7XG4gICAgICAgIGxldCB1cyA9IGFyZ3NvcnQoYWJsYXRpb25fdmFsdWVzKHNvcnRfZGltKSwgKGEsIGIpID0+IGEgLSBiKTtcblxuICAgICAgICByZXR1cm4gdXNcbiAgICAgICAgICAgIC5zbGljZSgwLCBNYXRoLm1pbihuX2NwLCB1cy5sZW5ndGgpKVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2N1cnJlbnRfY29weV9wYXlsb2FkKCk6IEFibGF0aW9uVXBsb2FkW10ge1xuXG4gICAgICAgIGNvbnN0IGNvcHlfdmFsdWVzID0gY3VycmVudC5yZWNpcGVzLmNvcHlfdmFsdWVzO1xuICAgICAgICBjb25zdCBsYXllciA9IHNlbF9sYXllcigpO1xuXG4gICAgICAgIHJldHVybiBfY3VycmVudF9jb3B5X2lkcygpXG4gICAgICAgICAgICAubWFwKHVuaXQgPT4gKHtcbiAgICAgICAgICAgICAgICBsYXllcixcbiAgICAgICAgICAgICAgICB1bml0LFxuICAgICAgICAgICAgICAgIGFscGhhOiAxLFxuICAgICAgICAgICAgICAgIHZhbHVlOiArY29weV92YWx1ZXNbdW5pdF1cbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIF9jdXJyZW50X2NvcHlfcGF5bG9hZF9vbGQoKTogQWJsYXRpb25VcGxvYWRbXSB7XG4gICAgICAgIGNvbnN0IG5fY3AgPSBub19jcF91bml0cygpO1xuXG4gICAgICAgIGNvbnN0IHNvcnRfZGltID0gcmVjaXBlX2NvcHlfc2VsZWN0b3IucHJvcGVydHkoJ3ZhbHVlJyk7XG4gICAgICAgIGNvbnN0IHVzID0gYXJnc29ydChjdXJyZW50LnVuaXRfc29ydGluZy5jb3B5W3NvcnRfZGltXSwgKGEsIGIpID0+IGIgLSBhKTtcbiAgICAgICAgLy8gY29uc3QgY29weV92YWx1ZXMgPSBjdXJyZW50LnVuaXRfc29ydGluZy5jb3B5W3NvcnRfZGltLnNwbGl0KCdfJylbMF1dO1xuICAgICAgICBjb25zdCBjb3B5X3ZhbHVlcyA9IGN1cnJlbnQudW5pdF9zb3J0aW5nLmNvcHlbJ21heCddO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGNvcHlfdmFsdWVzLCBcIi0tLSBjb3B5X3ZhbHVlc1wiKTtcblxuICAgICAgICBjb25zdCBsYXllciA9IHNlbF9sYXllcigpO1xuICAgICAgICByZXR1cm4gdXNcbiAgICAgICAgICAgIC5zbGljZSgwLCBNYXRoLm1pbihuX2NwLCB1cy5sZW5ndGgpKVxuICAgICAgICAgICAgLm1hcCh1bml0ID0+ICh7XG4gICAgICAgICAgICAgICAgbGF5ZXIsXG4gICAgICAgICAgICAgICAgdW5pdCxcbiAgICAgICAgICAgICAgICBhbHBoYTogMSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogK2NvcHlfdmFsdWVzW3VuaXRdXG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVJbWFnZXMoaW1hZ2VzID0gc2VsX2ltYWdlcygpKSB7XG4gICAgICAgIEdhbnRlckFQSS5nZW5lcmF0ZUltZ3MoXG4gICAgICAgICAgICBzZWxfcHJvamVjdCgpLnByb2plY3QsIGltYWdlcyxcbiAgICAgICAgICAgIDAsIFtdKVxuICAgICAgICAgICAgLnRoZW4oZ0ltZ3MgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgbl9ybSA9IG5vX3JtX3VuaXRzKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobl9ybSwgXCItLS0gblwiKTtcbiAgICAgICAgICAgICAgICBpZiAobl9ybSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IF9jdXJyZW50X2FibGF0aW9uX3BheWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgR2FudGVyQVBJXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2VuZXJhdGVJbWdzKHNlbF9wcm9qZWN0KCkucHJvamVjdCwgaW1hZ2VzLCAwLCBwYXlsb2FkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oYWJsX3JlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3VwZGF0ZUltYWdlcyhnSW1ncy5yZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWJsID0gYWJsX3Jlcy5yZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOiBkLmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJsYXRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOiBhYmwuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYmxhdGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3VwZGF0ZUltYWdlcyhnSW1ncy5yZXMubWFwKGQgPT4gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGQ6IGQuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWJsYXRlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfV0pKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcblxuICAgIH1cblxuXG4gICAgLypcbiAgICAgKlxuICAgICAqICA9PT09PSBFVkVOVFMgPT09PVxuICAgICAqXG4gICAgICovXG5cblxuICAgIGV2ZW50SGFuZGxlci5iaW5kKGV2ZW50cy5waWNraW5nLCAoKSA9PiB7XG5cbiAgICAgICAgY29uc3QgcGljayA9IGN1cnJlbnQucGljaztcbiAgICAgICAgY29uc3QgYmIgPSBwaWNrLnNlbGVjdGlvbjsgLy8gSU4gQ0cgT1JERVIgLS0+IGNvbnZlcnQgdG8gTWF0cml4IG9yZGVyXG5cbiAgICAgICAgY29uc3QgYWJsYXRpb25zID0gcGljay5hYmxhdGVkID8gX2N1cnJlbnRfYWJsYXRpb25fcGF5bG9hZCgpIDogW107XG5cbiAgICAgICAgR2FudGVyQVBJLmdlbmVyYXRlRmVhdHVyZXNMb2NhbChcbiAgICAgICAgICAgIHNlbF9wcm9qZWN0KCkucHJvamVjdCxcbiAgICAgICAgICAgIFtwaWNrLmlkXSxcbiAgICAgICAgICAgIFtzZWxfbGF5ZXIoKV0sXG4gICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgIHNoYXBlOiBbOCwgOF0sXG4gICAgICAgICAgICAgICAgYml0Ym91bmRzOiBbYmJbMF1bMV0sIGJiWzBdWzBdLCBiYlsxXVsxXSwgYmJbMV1bMF1dLFxuICAgICAgICAgICAgICAgIGJpdHN0cmluZzogbnVsbFxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBhYmxhdGlvbnNcbiAgICAgICAgKS50aGVuKGZfcmVzcCA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmVzID0gZl9yZXNwLnJlc1tzZWxfbGF5ZXIoKV07XG5cbiAgICAgICAgICAgIEhlbHBlci51cGRhdGVfc2VsZWN0b3IocmVjaXBlX2NvcHlfc2VsZWN0b3IsIE9iamVjdC5rZXlzKGZlYXR1cmVzKSk7XG4gICAgICAgICAgICBjdXJyZW50LnVuaXRfc29ydGluZy5jb3B5ID0gZmVhdHVyZXM7XG5cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGZlYXR1cmVzKVxuICAgICAgICB9KVxuXG5cbiAgICB9KTtcblxuXG4gICAgdHlwZSBEcm9wRXZlbnREYXRhID0ge1xuICAgICAgICBpbWFnZTogU3ViSW1hZ2VUeXBlLFxuICAgICAgICBzZWxlY3Rpb246IG51bWJlcltdW11cbiAgICB9XG5cblxuICAgIC8vIFRPRE86IGJyb2tlbiAtLSB3YXMgZm9yIFYxIC0tLSBJRCBpcyBub3cgYXR0YWNoZWQgdG8gRElWIGFuZCBub3QgSU1HXG4gICAgZXZlbnRIYW5kbGVyLmJpbmQoZXZlbnRzLmRyb3BwaW5nLCAoZWRhdGE6IERyb3BFdmVudERhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZWRhdGEsIFwiLS0tIGVkYXRhXCIpO1xuXG4gICAgICAgIGNvbnN0IGJiID0gZWRhdGEuc2VsZWN0aW9uO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKF9jdXJyZW50X2NvcHlfcGF5bG9hZCgpLCBcIi0tLSBfY3VycmVudF9jb3B5X3BheWxvYWQoKVwiKTtcblxuICAgICAgICBpZiAoYmIpIHtcbiAgICAgICAgICAgIEdhbnRlckFQSS5nZW5lcmF0ZUltZ3NJbnRlcnZlbnRpb24oXG4gICAgICAgICAgICAgICAgc2VsX3Byb2plY3QoKS5wcm9qZWN0LFxuICAgICAgICAgICAgICAgIFtlZGF0YS5pbWFnZS5pZF0sXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBlZGF0YS5pbWFnZS5hYmxhdGVkID8gX2N1cnJlbnRfYWJsYXRpb25fcGF5bG9hZCgpIDogW10sXG4gICAgICAgICAgICAgICAgX2N1cnJlbnRfY29weV9wYXlsb2FkKCksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBiaXRib3VuZHM6IFtiYlswXVsxXSwgYmJbMF1bMF0sIGJiWzFdWzFdLCBiYlsxXVswXV0sXG4gICAgICAgICAgICAgICAgICAgIGJpdHN0cmluZzogJzEnLFxuICAgICAgICAgICAgICAgICAgICBzaGFwZTogWzgsIDhdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS50aGVuKGQgPT4ge1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLicgKyBzdWJJbWFnZVRvSUQoZWRhdGEuaW1hZ2UpKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgZC5yZXNbMF0uZCk7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkLnJlc1swXS5kLCBzdWJJbWFnZVRvSUQoZWRhdGEuaW1hZ2UpLCBcIi0tLSBkXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEdhbnRlckFQSS5nZW5lcmF0ZUltZ3MoXG4gICAgICAgICAgICAgICAgc2VsX3Byb2plY3QoKS5wcm9qZWN0LFxuICAgICAgICAgICAgICAgIFtlZGF0YS5pbWFnZS5pZF0sXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBlZGF0YS5pbWFnZS5hYmxhdGVkID8gX2N1cnJlbnRfYWJsYXRpb25fcGF5bG9hZCgpIDogW11cbiAgICAgICAgICAgICkudGhlbihkID0+IHtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy4nICsgc3ViSW1hZ2VUb0lEKGVkYXRhLmltYWdlKSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGQucmVzWzBdLmQpO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgIH0pO1xuXG5cbiAgICBldmVudEhhbmRsZXIuYmluZChQYWludFNlbGVjdFZpZXcuZXZlbnRzLm1hc2tDaGFuZ2VkLCAoaW06IEltYWdlTWFzaykgPT4ge1xuXG4gICAgICAgIGNvbnN0IGltZ19kYXRhID0gPFN1YkltYWdlVHlwZT4gZDMuc2VsZWN0KCcuJyArIGltLmlkKS5kYXR1bSgpO1xuXG5cbiAgICAgICAgR2FudGVyQVBJLmdlbmVyYXRlSW1nc0ludGVydmVudGlvbihcbiAgICAgICAgICAgIHNlbF9wcm9qZWN0KCkucHJvamVjdCxcbiAgICAgICAgICAgIFtpbWdfZGF0YS5pZF0sXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgaW1nX2RhdGEuYWJsYXRlZCA/IF9jdXJyZW50X2FibGF0aW9uX3BheWxvYWQoKSA6IFtdLFxuICAgICAgICAgICAgX2N1cnJlbnRfY29weV9wYXlsb2FkKCksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYml0Ym91bmRzOiBbXSxcbiAgICAgICAgICAgICAgICBiaXRzdHJpbmc6IGltLm1hc2ssXG4gICAgICAgICAgICAgICAgc2hhcGU6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICkudGhlbihkID0+IHtcbiAgICAgICAgICAgIGQzLnNlbGVjdEFsbCgnLicgKyBpbS5pZCkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWUgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHN2ID0gPFBhaW50U2VsZWN0Vmlldz5tZS5wcm9wZXJ0eSgncHN2Jyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwc3YudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiBpbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUlEOiBpbS5pZFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IGQucmVzWzBdLmQ7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gLmF0dHIoJ3NyYycsIGQucmVzWzBdLmQpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkLnJlc1swXS5kLCBcIi0tLSBkXCIpO1xuICAgICAgICB9KVxuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgR2FudGVyQVBJLmdlbmVyYXRlSW1ncyhcbiAgICAgICAgLy8gICAgICAgICBzZWxfcHJvamVjdCgpLnByb2plY3QsXG4gICAgICAgIC8vICAgICAgICAgW2VkYXRhLmltYWdlLmlkXSxcbiAgICAgICAgLy8gICAgICAgICAwLFxuICAgICAgICAvLyAgICAgICAgIGVkYXRhLmltYWdlLmFibGF0ZWQgPyBfY3VycmVudF9hYmxhdGlvbl9wYXlsb2FkKCkgOiBbXVxuICAgICAgICAvLyAgICAgKS50aGVuKGQgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGQzLnNlbGVjdEFsbCgnLicgKyBzdWJJbWFnZVRvSUQoZWRhdGEuaW1hZ2UpKVxuICAgICAgICAvLyAgICAgICAgICAgICAuYXR0cignc3JjJywgZC5yZXNbMF0uZCk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9XG5cblxuICAgIH0pO1xuXG5cbiAgICAvKlxuICAgICpcbiAgICAqICA9PT09PSBVSSBzdHVmZiA9PT09XG4gICAgKlxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0dXBfdWkoKSB7XG5cblxuICAgICAgICBkMy5zZWxlY3QoJyNzaWRlYmFyX2J0bicpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNiID0gY3VycmVudC5zaWRlYmFyO1xuXG4gICAgICAgICAgICAgICAgc2IudmlzaWJsZSA9ICFzYi52aXNpYmxlO1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnb24nLCBzYi52aXNpYmxlKTtcbiAgICAgICAgICAgICAgICBzaWRlX2Jhci5jbGFzc2VkKCdoaWRkZW4nLCAhc2IudmlzaWJsZSk7XG4gICAgICAgICAgICAgICAgc2lkZV9iYXIuc3R5bGUoJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgc2IudmlzaWJsZSA/IG51bGwgOiBgLSR7Y3VycmVudC5zaWRlYmFyLndpZHRofXB4YCk7XG5cbiAgICAgICAgICAgICAgICByZV9sYXlvdXQoKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgd2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgY29uc3QgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHcsIGgsIFwiLS0tIHcsaFwiKTtcblxuICAgICAgICAgICAgcmVfbGF5b3V0KHcsIGgpO1xuXG5cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiByZV9sYXlvdXQodyA9IHdpbmRvdy5pbm5lcldpZHRoLCBoID0gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5zaWRlbmF2JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIChoIC0gNTMpICsgJ3B4JylcblxuICAgICAgICAgICAgY29uc3Qgc2IgPSBjdXJyZW50LnNpZGViYXI7XG4gICAgICAgICAgICBjb25zdCBtYWluV2lkdGggPSB3IC0gKHNiLnZpc2libGUgPyBzYi53aWR0aCA6IDApO1xuICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcubWFpbl9mcmFtZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCAoaCAtIDUzKSArICdweCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIG1haW5XaWR0aCArICdweCcpXG5cbiAgICAgICAgICAgIC8vIGV2ZW50SGFuZGxlci50cmlnZ2VyKEdsb2JhbEV2ZW50cy53aW5kb3dfcmVzaXplLCB7dywgaH0pXG5cbiAgICAgICAgICAgIC8vIGV2ZW50SGFuZGxlci50cmlnZ2VyKEdsb2JhbEV2ZW50cy5tYWluX3Jlc2l6ZSwge1xuICAgICAgICAgICAgLy8gICAgIHc6ICh3IC0gZ2xvYmFsLnNpZGViYXIoKSksXG4gICAgICAgICAgICAvLyAgICAgaDogKGggLSA0NSlcbiAgICAgICAgICAgIC8vIH0pXG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJlX2xheW91dCh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgIH1cblxuICAgIHNldHVwX3VpKCk7XG59XG5cblxuXG5cbiIsImltcG9ydCB7VkNvbXBvbmVudH0gZnJvbSBcIi4vVmlzQ29tcG9uZW50XCI7XG5pbXBvcnQge0QzU2VsfSBmcm9tIFwiLi4vZXRjL1V0aWxcIjtcbmltcG9ydCB7U2ltcGxlRXZlbnRIYW5kbGVyfSBmcm9tIFwiLi4vZXRjL1NpbXBsZUV2ZW50SGFuZGxlclwiO1xuaW1wb3J0IHtQYWludFNlbGVjdFdpZGdldH0gZnJvbSBcInBhaW50X3NlbGVjdFwiO1xuaW1wb3J0IHtHYW50ZXJBUEksIEltYWdlTWFza30gZnJvbSBcIi4uL2FwaS9HYW50ZXJBUElcIjtcblxuXG5leHBvcnQgdHlwZSBQYWludFNlbGVjdFZpZXdEYXRhID0ge1xuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIGltYWdlSUQ/OiBzdHJpbmcsXG4gICAgcmVzZXRTZWxlY3Rpb24/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBQYWludFNlbGVjdFZpZXcgZXh0ZW5kcyBWQ29tcG9uZW50PFBhaW50U2VsZWN0Vmlld0RhdGE+IHtcbiAgICBwcm90ZWN0ZWQgb3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnk7IHBvczogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgfTsgfTtcbiAgICBwcm90ZWN0ZWQgY3NzX25hbWUgPSBcIlBhaW50U2VsZWN0Vmlld1wiO1xuICAgIHByb3RlY3RlZCBfY3VycmVudDoge307XG4gICAgcHJpdmF0ZSBwc3c6IFBhaW50U2VsZWN0V2lkZ2V0O1xuXG5cbiAgICBwdWJsaWMgc3RhdGljIGV2ZW50cyA9IHtcbiAgICAgICAgbWFza0NoYW5nZWQ6IFwiUGFpbnRTZWxlY3RWaWV3X21jXCJcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihfcGFyZW50OiBEM1NlbCwgX2V2ZW50SGFuZGxlcjogU2ltcGxlRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgIHN1cGVyKF9wYXJlbnQsIF9ldmVudEhhbmRsZXIpO1xuICAgICAgICB0aGlzLnN1cGVySW5pdEhUTUwoKTtcbiAgICAgICAgLy8gVE9ETzpoYWNrXG4gICAgICAgIC8vIHRoaXMuYmFzZS5hdHRyKCdjbGFzcycsICcnKTtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfaW5pdCgpIHtcbiAgICAgICAgdGhpcy5wc3cgPSBuZXcgUGFpbnRTZWxlY3RXaWRnZXQodGhpcy5iYXNlLm5vZGUoKSwge1xuICAgICAgICAgICAgb3ZlcmxheU1vZGlmaWVkOiAobWUsIG1hc2spID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVNYXNrRXZlbnQobWFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG51bGwsIDEpO1xuICAgICAgICB0aGlzLnBzdy5yYWRpdXMgPSAyMDtcbiAgICAgICAgdGhpcy5wc3cuZHJhd0NvbG9yID0gJyNmMDYwNjknO1xuICAgICAgICB0aGlzLnBzdy5hbHBoYSA9IC4zO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlyZU1hc2tFdmVudChtYXNrKSB7XG4gICAgICAgIGNvbnN0IGltZ01hc2s6IEltYWdlTWFzayA9IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLnJlbmRlckRhdGEuaW1hZ2VJRCB8fCAtMSxcbiAgICAgICAgICAgIG1hc2tcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyKFBhaW50U2VsZWN0Vmlldy5ldmVudHMubWFza0NoYW5nZWQsXG4gICAgICAgICAgICBpbWdNYXNrXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3dyYW5nbGUoZGF0YTogUGFpbnRTZWxlY3RWaWV3RGF0YSkge1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfcmVuZGVyKHJEOiBQYWludFNlbGVjdFZpZXdEYXRhID0gdGhpcy5yZW5kZXJEYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHN3LmJhY2tncm91bmRJbWFnZSA9IHJELmltYWdlO1xuICAgICAgICB0aGlzLnBzdy5yZWRyYXcoKTtcbiAgICB9XG5cblxuICAgIC8vIHByaXZhdGUgc2VsZWN0aW9uTW9kaWZpZWQobWUsIG1hc2spIHtcbiAgICAvL1xuICAgIC8vICAgICBjb25zb2xlLmxvZyh0aGlzLCBcIi0tLSB0aGlzXCIpO1xuICAgIC8vICAgICBjb25zdCBpbWdNYXNrOiBJbWFnZU1hc2sgPSB7XG4gICAgLy8gICAgICAgICBpZDogdGhpcy5yZW5kZXJEYXRhLmJhY2tncm91bmRJbWFnZUlEIHx8IC0xLFxuICAgIC8vICAgICAgICAgbWFza1xuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlcihQYWludFNlbGVjdFZpZXcuZXZlbnRzLm1hc2tDaGFuZ2VkLFxuICAgIC8vICAgICAgICAgaW1nTWFza1xuICAgIC8vICAgICApXG4gICAgLy9cbiAgICAvL1xuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhtZSwgaW1hZ2UsXCItLS0gbWUsIGltYWdlXCIpO1xuICAgIC8vIH1cblxuICAgIHByaXZhdGUgcmVzZXRTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHN3LnJlc2V0KClcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBzdy5iYWNrZ3JvdW5kSW1hZ2U7XG4gICAgfVxuXG4gICAgZ2V0IGltYWdlSUQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRhdGEuaW1hZ2VJRDtcbiAgICB9XG5cblxuICAgIHNldCB6b29tKHopIHtcbiAgICAgICAgdGhpcy5wc3cuem9vbSA9IHo7XG4gICAgfVxuXG4gICAgc2V0IG9wYWNpdHkobzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucHN3LmFscGhhID0gbztcbiAgICB9XG5cblxuICAgIHJlc2V0KHN1cHJlc3NFdmVudCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucHN3LnJlc2V0KCk7XG4gICAgICAgIGlmICghc3VwcmVzc0V2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmZpcmVNYXNrRXZlbnQodGhpcy5wc3cuY3VycmVudE1hc2spXG4gICAgICAgIH1cbiAgICB9XG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEhlbmRyaWsgU3Ryb2JlbHQgKGhlbmRyaWsuc3Ryb2JlbHQuY29tKSBvbiAxMi8zLzE2LlxuICovXG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMydcbmltcG9ydCB7RDNTZWwsIFV0aWx9IGZyb20gXCIuLi9ldGMvVXRpbFwiO1xuaW1wb3J0IHtTaW1wbGVFdmVudEhhbmRsZXJ9IGZyb20gXCIuLi9ldGMvU2ltcGxlRXZlbnRIYW5kbGVyXCI7XG5pbXBvcnQge1NWR30gZnJvbSBcIi4uL2V0Yy9TVkdwbHVzXCI7XG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZDb21wb25lbnQ8RGF0YUludGVyZmFjZT4ge1xuXG4gICAgLy8gU1RBVElDIEZJRUxEUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzdGF0aWMgcHJvcGVydHkgdGhhdCBjb250YWlucyBhbGwgY2xhc3MgcmVsYXRlZCBldmVudHMuXG4gICAgICogU2hvdWxkIGJlIG92ZXJ3cml0dGVuIGFuZCBldmVudCBzdHJpbmdzIGhhdmUgdG8gYmUgdW5pcXVlISFcbiAgICAgKi9cblxuICAgIHN0YXRpYyBldmVudHM6IHt9ID0ge25vRXZlbnQ6ICdWQ29tcG9uZW50X25vRXZlbnQnfTtcblxuICAgIC8qKlxuICAgICAqIHNldCBvZiBBTEwgb3B0aW9ucyBhbmQgdGhlaXIgZGVmYXVsdHNcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqIHtcbiAgICAgICAgcG9zOiB7eDogMTAsIHk6IDEwfSxcbiAgICAgICAgLy8gTGlzdCBvZiBFdmVudHMgdGhhdCBhcmUgT05MWSBoYW5kbGVkIGdsb2JhbGx5OlxuICAgICAgICBnbG9iYWxFeGNsdXNpdmVFdmVudHM6IFtdXG4gICAgfTtcbiAgICAgKlxuICAgICAqL1xuICAgICAgICAvLyBhYnN0cmFjdCByZWFkb25seSBkZWZhdWx0T3B0aW9ucztcblxuXG4gICAgICAgIC8vIC8qKlxuICAgICAgICAvLyAgKiBEZWZpbmVzIHRoZSBsYXllcnMgaW4gU1ZHICBmb3IgYmcsbWFpbixmZywuLi5cbiAgICAgICAgLy8gICovXG4gICAgICAgIC8vIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSBsYXlvdXQ6IHsgbmFtZTogc3RyaW5nLCBwb3M6IG51bWJlcltdIH1bXSA9IFt7bmFtZTogJ21haW4nLCBwb3M6IFswLCAwXX1dO1xuXG5cbiAgICBwcm90ZWN0ZWQgaWQ6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgcGFyZW50OiBEM1NlbDtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb3B0aW9uczogeyBwb3M6IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSwgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAgcHJvdGVjdGVkIGJhc2U6IEQzU2VsO1xuICAgIHByb3RlY3RlZCBsYXllcnM6IHsgbWFpbj86IEQzU2VsLCBmZz86IEQzU2VsLCBiZz86IEQzU2VsLCBba2V5OiBzdHJpbmddOiBEM1NlbCB9O1xuICAgIHByb3RlY3RlZCBldmVudEhhbmRsZXI6IFNpbXBsZUV2ZW50SGFuZGxlcjtcbiAgICBwcm90ZWN0ZWQgX3Zpc2liaWxpdHk6IHsgaGlkZGVuOiBib29sZWFuLCBoaWRlRWxlbWVudD86IEQzU2VsIHwgbnVsbDsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAgcHJvdGVjdGVkIGRhdGE6IERhdGFJbnRlcmZhY2U7XG4gICAgcHJvdGVjdGVkIHJlbmRlckRhdGE6IGFueTtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3NzX25hbWU6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2N1cnJlbnQ6IHt9O1xuXG4gICAgLy8gQ09OU1RSVUNUT1IgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuICAgIC8qKlxuICAgICAqIFNpbXBsZSBjb25zdHJ1Y3Rvci4gU3ViY2xhc3NlcyBzaG91bGQgY2FsbCBAc3VwZXJJbml0KG9wdGlvbnMpIGFzIHdlbGwuXG4gICAgICogc2VlIHdoeSBoZXJlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MzU5NTk0My93aHktYXJlLWRlcml2ZWQtY2xhc3MtcHJvcGVydHktdmFsdWVzLW5vdC1zZWVuLWluLXRoZS1iYXNlLWNsYXNzLWNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiB0ZW1wbGF0ZTpcbiAgICAgY29uc3RydWN0b3IoZDNQYXJlbnQ6IEQzU2VsLCBldmVudEhhbmRsZXI/OiBTaW1wbGVFdmVudEhhbmRsZXIsIG9wdGlvbnM6IHt9ID0ge30pIHtcbiAgICAgICAgc3VwZXIoZDNQYXJlbnQsIGV2ZW50SGFuZGxlcik7XG4gICAgICAgIC8vIC0tIGFjY2VzcyB0byBzdWJjbGFzcyBwYXJhbXM6XG4gICAgICAgIHRoaXMuc3VwZXJJbml0KG9wdGlvbnMpO1xuICAgICB9XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0QzU2VsfSBkM3BhcmVudCAgRDMgc2VsZWN0aW9uIG9mIHBhcmVudCBTVkcgRE9NIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge1NpbXBsZUV2ZW50SGFuZGxlcn0gZXZlbnRIYW5kbGVyIGEgZ2xvYmFsIGV2ZW50IGhhbmRsZXIgb2JqZWN0IG9yICdudWxsJyBmb3IgbG9jYWwgZXZlbnQgaGFuZGxlclxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihkM3BhcmVudDogRDNTZWwsIGV2ZW50SGFuZGxlcj86IFNpbXBsZUV2ZW50SGFuZGxlcikge1xuICAgICAgICB0aGlzLmlkID0gVXRpbC5zaW1wbGVVSWQoe30pO1xuXG4gICAgICAgIHRoaXMucGFyZW50ID0gZDNwYXJlbnQ7XG5cbiAgICAgICAgLy8gSWYgbm90IGZ1cnRoZXIgc3BlY2lmaWVkIC0gY3JlYXRlIGEgbG9jYWwgZXZlbnQgaGFuZGxlciBib3VuZCB0byB0aGUgYmFzIGVsZW1lbnRcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIgPSBldmVudEhhbmRsZXIgfHxcbiAgICAgICAgICAgIG5ldyBTaW1wbGVFdmVudEhhbmRsZXIodGhpcy5wYXJlbnQubm9kZSgpKTtcblxuICAgICAgICAvLyBPYmplY3QgZm9yIHN0b3JpbmcgaW50ZXJuYWwgc3RhdGVzIGFuZCB2YXJpYWJsZXNcbiAgICAgICAgdGhpcy5fdmlzaWJpbGl0eSA9IHtoaWRkZW46IGZhbHNlfTtcblxuICAgIH1cblxuXG4gICAgLy8gcHJvdGVjdGVkIGNyZWF0ZVN2Z0xheWVycyhsYXllcnM9WydiZycsJ21haW4nLCdmZyddKXtcbiAgICAvLyAgICAgdGhpcy5fbGF5ZXJzID0ge31cbiAgICAvLyAgICAgdGhpcy5iYXNlID0gU1ZHLmdyb3VwKHRoaXMucGFyZW50LFxuICAgIC8vICAgICAgICAgICAgIHRoaXMuY3NzX25hbWUgKyAnIElEJyArIHRoaXMuaWQsXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBvcyk7XG4gICAgLy9cbiAgICAvLyB9XG5cbiAgICBwcm90ZWN0ZWQgc3VwZXJJbml0SFRNTChvcHRpb25zOiB7fSA9IHt9KSB7XG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goa2V5ID0+IHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldKTtcbiAgICAgICAgdGhpcy5iYXNlID0gdGhpcy5wYXJlbnQuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmNsYXNzZWQodGhpcy5jc3NfbmFtZSwgdHJ1ZSlcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSGFzIHRvIGJlIGNhbGxlZCBhcyBsYXN0IGNhbGwgaW4gc3ViY2xhc3MgY29uc3RydWN0b3IuXG4gICAgICogQHBhcmFtIHt7fX0gb3B0aW9uc1xuICAgICAqIEBwYXJhbSBkZWZhdWx0TGF5ZXJzIC0tIGNyZWF0ZSB0aGUgZGVmYXVsdCA8Zz4gbGF5ZXJzOiBiZyAtPiBtYWluIC0+IGZnXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHN1cGVySW5pdFNWRyhvcHRpb25zOiB7fSA9IHt9LCBkZWZhdWx0TGF5ZXJzID0gWydiZycsICdtYWluJywgJ2ZnJ10pIHtcbiAgICAgICAgLy8gU2V0IGRlZmF1bHQgb3B0aW9ucyBpZiBub3Qgc3BlY2lmaWVkIGluIGNvbnN0cnVjdG9yIGNhbGxcbiAgICAgICAgLy8gY29uc3QgZGVmYXVsdHMgPSB0aGlzLmRlZmF1bHRPcHRpb25zO1xuICAgICAgICAvLyB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICAgICAgLy8gY29uc3Qga2V5cyA9IG5ldyBTZXQoWy4uLk9iamVjdC5rZXlzKGRlZmF1bHRzKSwgLi4uT2JqZWN0LmtleXMob3B0aW9ucyldKTtcbiAgICAgICAgLy8ga2V5cy5mb3JFYWNoKGtleSA9PiB0aGlzLm9wdGlvbnNba2V5XSA9IChrZXkgaW4gb3B0aW9ucykgPyBvcHRpb25zW2tleV0gOiBkZWZhdWx0c1trZXldKTtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChrZXkgPT4gdGhpcy5vcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV0pO1xuXG5cbiAgICAgICAgdGhpcy5sYXllcnMgPSB7fTtcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGJhc2UgZ3JvdXAgZWxlbWVudFxuICAgICAgICB0aGlzLmJhc2UgPSBTVkcuZ3JvdXAodGhpcy5wYXJlbnQsXG4gICAgICAgICAgICB0aGlzLmNzc19uYW1lICsgJyBJRCcgKyB0aGlzLmlkLFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBvcyk7XG5cblxuICAgICAgICAvLyBjcmVhdGUgZGVmYXVsdCBsYXllcnM6IGJhY2tncm91bmQsIG1haW4sIGZvcmVncm91bmRcbiAgICAgICAgaWYgKGRlZmF1bHRMYXllcnMpIHtcbiAgICAgICAgICAgIC8vIGNvbnN0cnVjdGlvbiBvcmRlciBpcyBpbXBvcnRhbnQgIVxuICAgICAgICAgICAgZGVmYXVsdExheWVycy5mb3JFYWNoKGxheWVyID0+e1xuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJzW2xheWVyXSA9IFNWRy5ncm91cCh0aGlzLmJhc2UsIGxheWVyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyB0aGlzLmxheWVycy5iZyA9IFNWRy5ncm91cCh0aGlzLmJhc2UsICdiZycpO1xuICAgICAgICAgICAgLy8gdGhpcy5sYXllcnMubWFpbiA9IFNWRy5ncm91cCh0aGlzLmJhc2UsICdtYWluJyk7XG4gICAgICAgICAgICAvLyB0aGlzLmxheWVycy5mZyA9IFNWRy5ncm91cCh0aGlzLmJhc2UsICdmZycpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2hvdWxkIGJlIG92ZXJ3cml0dGVuIHRvIGNyZWF0ZSB0aGUgc3RhdGljIERPTSBlbGVtZW50c1xuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEByZXR1cm4geyp9IC0tLVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfaW5pdCgpO1xuXG4gICAgLy8gREFUQSBVUERBVEUgJiBSRU5ERVIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvKipcbiAgICAgKiBFdmVyeSB0aW1lIGRhdGEgaGFzIGNoYW5nZWQsIHVwZGF0ZSBpcyBjYWxsZWQgYW5kXG4gICAgICogdHJpZ2dlcnMgd3JhbmdsaW5nIGFuZCByZS1yZW5kZXJpbmdcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBkYXRhIG9iamVjdFxuICAgICAqIEByZXR1cm4geyp9IC0tLVxuICAgICAqL1xuICAgIHVwZGF0ZShkYXRhOiBEYXRhSW50ZXJmYWNlKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIGlmICh0aGlzLl92aXNpYmlsaXR5LmhpZGRlbikgcmV0dXJuO1xuICAgICAgICB0aGlzLnJlbmRlckRhdGEgPSB0aGlzLl93cmFuZ2xlKGRhdGEpO1xuICAgICAgICB0aGlzLl9yZW5kZXIodGhpcy5yZW5kZXJEYXRhKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIERhdGEgd3JhbmdsaW5nIG1ldGhvZCAtLSBpbXBsZW1lbnQgaW4gc3ViY2xhc3MuIFJldHVybnMgdGhpcy5yZW5kZXJEYXRhLlxuICAgICAqIFNpbXBsZXN0IGltcGxlbWVudGF0aW9uOiBgcmV0dXJuIGRhdGE7YFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIGRhdGFcbiAgICAgKiBAcmV0dXJucyB7Kn0gLS0gZGF0YSBpbiByZW5kZXIgZm9ybWF0XG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF93cmFuZ2xlKGRhdGEpO1xuXG5cbiAgICAvKipcbiAgICAgKiBJcyByZXNwb25zaWJsZSBmb3IgbWFwcGluZyBkYXRhIHRvIERPTSBlbGVtZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZW5kZXJEYXRhIHByZS1wcm9jZXNzZWQgKHdyYW5nbGVkKSBkYXRhXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybnMgeyp9IC0tLVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfcmVuZGVyKHJlbmRlckRhdGEpOiB2b2lkO1xuXG5cbiAgICAvLyBVUERBVEUgT1BUSU9OUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIGluc3RhbmNlIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBvbmx5IHRoZSBvcHRpb25zIHRoYXQgc2hvdWxkIGJlIHVwZGF0ZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlUmVuZGVyIGlmIG9wdGlvbiBjaGFuZ2UgcmVxdWlyZXMgYSByZS1yZW5kZXJpbmcgKGRlZmF1bHQ6ZmFsc2UpXG4gICAgICogQHJldHVybnMgeyp9IC0tLVxuICAgICAqL1xuICAgIHVwZGF0ZU9wdGlvbnMoe29wdGlvbnMsIHJlUmVuZGVyID0gZmFsc2V9KSB7XG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goayA9PiB0aGlzLm9wdGlvbnNba10gPSBvcHRpb25zW2tdKTtcbiAgICAgICAgaWYgKHJlUmVuZGVyKSB0aGlzLl9yZW5kZXIodGhpcy5yZW5kZXJEYXRhKTtcbiAgICB9XG5cblxuICAgIC8vID09PSBDT05WRU5JRU5DRSA9PT09XG5cblxuICAgIHNldEhpZGVFbGVtZW50KGhFOiBEM1NlbCkge1xuICAgICAgICB0aGlzLl92aXNpYmlsaXR5LmhpZGVFbGVtZW50ID0gaEU7XG4gICAgfVxuXG4gICAgaGlkZVZpZXcoKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmlzaWJpbGl0eS5oaWRkZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGhFID0gdGhpcy5fdmlzaWJpbGl0eS5oaWRlRWxlbWVudCB8fCB0aGlzLnBhcmVudDtcbiAgICAgICAgICAgIGhFLnRyYW5zaXRpb24oKS5zdHlsZXMoe1xuICAgICAgICAgICAgICAgICdvcGFjaXR5JzogMCxcbiAgICAgICAgICAgICAgICAncG9pbnRlci1ldmVudHMnOiAnbm9uZSdcbiAgICAgICAgICAgIH0pLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIHRoaXMuX3Zpc2liaWxpdHkuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuaGlkZVZpZXcoKSB7XG4gICAgICAgIGlmICh0aGlzLl92aXNpYmlsaXR5LmhpZGRlbikge1xuICAgICAgICAgICAgY29uc3QgaEUgPSB0aGlzLl92aXNpYmlsaXR5LmhpZGVFbGVtZW50IHx8IHRoaXMucGFyZW50O1xuICAgICAgICAgICAgaEUudHJhbnNpdGlvbigpLnN0eWxlcyh7XG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAxLFxuICAgICAgICAgICAgICAgICdwb2ludGVyLWV2ZW50cyc6IG51bGwsXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknOiBudWxsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3Zpc2liaWxpdHkuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICAvLyB0aGlzLnVwZGF0ZSh0aGlzLmRhdGEpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmJhc2UucmVtb3ZlKCk7XG4gICAgfVxuXG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=