/* Version: 0.1.5 - February 21, 2022 09:25:34 */
/* eslint-disable */import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { useState, useEffect, createContext, useCallback, useMemo, useContext, useReducer, forwardRef, useRef, createRef, createElement } from 'react';
import _, { split } from 'lodash';
import styled, { css, keyframes, createGlobalStyle } from 'styled-components';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var useOutputHandler = function (_a) {
    var initialOutput = _a.initialOutput, _b = _a.shouldTypewrite, shouldTypewrite = _b === void 0 ? false : _b;
    var _c = useState([]), outputQueue = _c[0], setOutputQueue = _c[1];
    var _d = useState([]), output = _d[0], setOutput = _d[1];
    var _e = useState([]), currentOutputting = _e[0], setCurrentOutputting = _e[1];
    var _f = useState(false), isTypewriting = _f[0], setIsTypewriting = _f[1];
    var _g = useState(10), typeInterval = _g[0], setTypeInterval = _g[1];
    var addToOutput = function (value) {
        if (typeof value === 'string') {
            setOutput(function (prev) { return __spreadArray(__spreadArray([], prev, true), [value], false); });
        }
        else {
            setOutput(function (prev) { return __spreadArray(__spreadArray([], prev, true), value, true); });
        }
    };
    var startTypewriting = function () {
        setIsTypewriting(true);
    };
    var endTypewriting = function () {
        setOutput(function (prev) { return __spreadArray(__spreadArray([], prev, true), currentOutputting, true); });
        setCurrentOutputting([]);
        setIsTypewriting(false);
    };
    var changeCurrentOutput = function (value) {
        if (typeof value === 'string') {
            setCurrentOutputting(function (prev) { return __spreadArray(__spreadArray([], prev, true), [value], false); });
        }
        else {
            setCurrentOutputting(function (prev) { return __spreadArray(__spreadArray([], prev, true), value, true); });
        }
    };
    var changeTypeInterval = function (value) {
        setTypeInterval(value);
    };
    useEffect(function () {
        if (outputQueue.length > 0 && !isTypewriting) {
            switch (outputQueue[0].action) {
                case 'add':
                    if (shouldTypewrite) {
                        if (outputQueue[0].value.length !== 0) {
                            startTypewriting();
                        }
                        changeCurrentOutput(outputQueue[0].value);
                    }
                    else {
                        addToOutput(outputQueue[0].value);
                    }
                    break;
                case 'remove': {
                    var newOutput = __spreadArray([], output, true);
                    newOutput.splice(0 - outputQueue[0].value);
                    setOutput(newOutput);
                    break;
                }
                case 'clear':
                    setOutput([]);
                    break;
            }
            var newQueue = __spreadArray([], outputQueue, true);
            newQueue.shift();
            setOutputQueue(newQueue);
        }
    }, [outputQueue, isTypewriting, shouldTypewrite, output]);
    var addToQueue = function (actions) {
        setOutputQueue(function (prev) { return __spreadArray(__spreadArray([], prev, true), actions, true); });
    };
    var addLines = function (value, skipTypewriting) {
        if (skipTypewriting === void 0) { skipTypewriting = false; }
        if (skipTypewriting) {
            addToOutput(value);
            return;
        }
        setOutputQueue(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{ action: 'add', value: value }], false); });
    };
    var removeLines = function (numberOfLines) {
        var newOutput = __spreadArray([], output, true);
        newOutput.splice(0 - numberOfLines);
        setOutput(newOutput);
    };
    var clear = function () {
        setOutput([]);
    };
    useEffect(function () {
        addLines(initialOutput);
    }, []);
    return {
        output: output,
        outputQueue: outputQueue,
        addToQueue: addToQueue,
        addLines: addLines,
        removeLines: removeLines,
        clear: clear,
        currentOutputting: currentOutputting,
        typewriter: {
            isTypewriting: isTypewriting,
            startTypewriting: startTypewriting,
            endTypewriting: endTypewriting,
            typeInterval: typeInterval,
            changeTypeInterval: changeTypeInterval,
        },
    };
};

var LocalStorageContext = createContext(undefined);
var LocalStorageContextProvider = function (_a) {
    var children = _a.children, id = _a.id;
    var localStorageKey = "react-dos-terminal@".concat(id);
    var setToLS = useCallback(function (key, value) {
        var stored = window.localStorage.getItem(localStorageKey);
        var obj = {};
        if (stored) {
            obj = JSON.parse(stored);
        }
        obj[key] = value;
        window.localStorage.setItem(localStorageKey, JSON.stringify(obj));
    }, [localStorageKey]);
    var getFromLS = useCallback(function (key) {
        var value = window.localStorage.getItem(localStorageKey);
        var obj = {};
        if (value) {
            obj = JSON.parse(value);
            if (obj) {
                return obj[key];
            }
        }
        return null;
    }, [localStorageKey]);
    var getLSFreeSize = useCallback(function () {
        var lsTotal = 0;
        var xLen;
        Object.keys(localStorage).forEach(function (x) {
            if (Object.prototype.hasOwnProperty.call(localStorage, x)) {
                xLen = (localStorage[x].length + x.length) * 2;
                lsTotal += xLen;
            }
        });
        return (5000000 - lsTotal).toLocaleString('en-US', {
            minimumFractionDigits: 0,
        });
    }, []);
    var ls = useMemo(function () {
        return {
            set: setToLS,
            get: getFromLS,
            getLSFreeSize: getLSFreeSize,
        };
    }, [getFromLS, getLSFreeSize, setToLS]);
    return (jsx(LocalStorageContext.Provider, __assign({ value: ls }, { children: children }), void 0));
};
var useLocalStorage = function () {
    var ctx = useContext(LocalStorageContext);
    if (ctx === undefined) {
        throw new Error("useLocalStorage must be used within a LocalStorageContextProvider.");
    }
    return ctx;
};

var TerminalContext = createContext(undefined);
var TerminalContextProvider = function (_a) {
    var children = _a.children, config = _a.config;
    var ls = useLocalStorage();
    var output = useOutputHandler({
        initialOutput: config.initialOutput,
        shouldTypewrite: config.shouldTypewrite,
    });
    var terminalInitialState = {
        colors: config.colors,
        showOldScreenEffect: config.showOldScreenEffect,
        autoFocus: config.autoFocus,
        userHasInteracted: config.autoFocus,
        currentPrompt: config.currentPrompt,
        defaultPrompt: config.defaultPrompt,
    };
    var reducer = function (state, action) {
        switch (action.config) {
            case 'setUserHasInteracted':
                return __assign(__assign({}, state), { userHasInteracted: action.value });
            case 'setColors':
                ls.set('colors', action.value);
                return __assign(__assign({}, state), { colors: action.value });
            case 'setPrompt':
                ls.set('prompt', action.value);
                return __assign(__assign({}, state), { currentPrompt: action.value });
            default:
                return state;
        }
    };
    var _b = useReducer(reducer, terminalInitialState), state = _b[0], dispatch = _b[1];
    var t = useMemo(function () {
        return __assign(__assign({}, state), { output: output, setConfig: function (conf) {
                if (conf.config === 'setColors') {
                    dispatch({ config: 'setColors', value: conf.value });
                }
                if (conf.config === 'setPrompt') {
                    dispatch({
                        config: 'setPrompt',
                        value: conf.value !== ''
                            ? conf.value
                            : terminalInitialState.defaultPrompt,
                    });
                }
                if (conf.config === 'setUserHasInteracted') {
                    dispatch({
                        config: 'setUserHasInteracted',
                        value: conf.value,
                    });
                }
            } });
    }, [state, output, terminalInitialState.defaultPrompt]);
    return (jsx(TerminalContext.Provider, __assign({ value: t }, { children: children }), void 0));
};
var useTerminal = function () {
    var ctx = useContext(TerminalContext);
    if (ctx === undefined) {
        throw new Error("useTerminal must be used within a TerminalContextProvider.");
    }
    return ctx;
};

var defaults = {
    shouldPersisteUserData: true,
    loadingScreen: {
        showLoadingScreen: 'first-time',
        messageOrElement: [
            'Installing IOS react-dos-terminal',
            '',
            'Please wait...',
            '',
        ],
        loadingTime: 5000,
    },
    terminal: {
        colors: {
            background: '#000000',
            color: '#aaaaaa',
        },
        autoFocus: true,
        showOldScreenEffect: true,
        initialOutput: ['Welcome to IOS react-dos-terminal', '', ''],
        defaultPrompt: '$p$g',
        shouldTypewrite: true,
    },
    commands: {
        customCommands: [],
        excludeInternalCommands: process.env.NODE_ENV === 'development' ? [] : 'dev',
        shouldAllowHelp: true,
        messages: {
            toBeImplemented: "Error: \"%n\" command hasn't been implemented.",
            notFound: "Error: \"%n\" is not a valid command.",
            cantBeExecuted: "Error: \"%n\" can't be executed.",
            helpNotAvailable: "Error: there isn't any help available for command \"%n\"",
            isAlreadyRunning: "Error: \"%n\" is already running.",
        },
    },
    fileSystem: {
        customFiles: [],
        systemPaths: ['', 'system'],
        initialDir: '',
        useFakeFileSystem: true,
        excludeInternalFiles: false,
    },
};

/*! @license DOMPurify 2.3.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.5/LICENSE */

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var hasOwnProperty = Object.hasOwnProperty,
    setPrototypeOf = Object.setPrototypeOf,
    isFrozen = Object.isFrozen,
    getPrototypeOf = Object.getPrototypeOf,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var freeze = Object.freeze,
    seal = Object.seal,
    create = Object.create; // eslint-disable-line import/no-mutable-exports

var _ref = typeof Reflect !== 'undefined' && Reflect,
    apply = _ref.apply,
    construct = _ref.construct;

if (!apply) {
  apply = function apply(fun, thisValue, args) {
    return fun.apply(thisValue, args);
  };
}

if (!freeze) {
  freeze = function freeze(x) {
    return x;
  };
}

if (!seal) {
  seal = function seal(x) {
    return x;
  };
}

if (!construct) {
  construct = function construct(Func, args) {
    return new (Function.prototype.bind.apply(Func, [null].concat(_toConsumableArray(args))))();
  };
}

var arrayForEach = unapply(Array.prototype.forEach);
var arrayPop = unapply(Array.prototype.pop);
var arrayPush = unapply(Array.prototype.push);

var stringToLowerCase = unapply(String.prototype.toLowerCase);
var stringMatch = unapply(String.prototype.match);
var stringReplace = unapply(String.prototype.replace);
var stringIndexOf = unapply(String.prototype.indexOf);
var stringTrim = unapply(String.prototype.trim);

var regExpTest = unapply(RegExp.prototype.test);

var typeErrorCreate = unconstruct(TypeError);

function unapply(func) {
  return function (thisArg) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return apply(func, thisArg, args);
  };
}

function unconstruct(func) {
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return construct(func, args);
  };
}

/* Add properties to a lookup table */
function addToSet(set, array) {
  if (setPrototypeOf) {
    // Make 'in' and truthy checks like Boolean(set.constructor)
    // independent of any properties defined on Object.prototype.
    // Prevent prototype setters from intercepting set as a this value.
    setPrototypeOf(set, null);
  }

  var l = array.length;
  while (l--) {
    var element = array[l];
    if (typeof element === 'string') {
      var lcElement = stringToLowerCase(element);
      if (lcElement !== element) {
        // Config presets (e.g. tags.js, attrs.js) are immutable.
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }

        element = lcElement;
      }
    }

    set[element] = true;
  }

  return set;
}

/* Shallow clone an object */
function clone(object) {
  var newObject = create(null);

  var property = void 0;
  for (property in object) {
    if (apply(hasOwnProperty, object, [property])) {
      newObject[property] = object[property];
    }
  }

  return newObject;
}

/* IE10 doesn't support __lookupGetter__ so lets'
 * simulate it. It also automatically checks
 * if the prop is function or getter and behaves
 * accordingly. */
function lookupGetter(object, prop) {
  while (object !== null) {
    var desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }

      if (typeof desc.value === 'function') {
        return unapply(desc.value);
      }
    }

    object = getPrototypeOf(object);
  }

  function fallbackValue(element) {
    console.warn('fallback value for', element);
    return null;
  }

  return fallbackValue;
}

var html = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);

// SVG
var svg = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);

var svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);

// List of SVG elements that are disallowed by default.
// We still need to know them so that we can do namespace
// checks properly in case one wants to add them to
// allow-list.
var svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'fedropshadow', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);

var mathMl = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover']);

// Similarly to SVG, we want to know all MathML elements,
// even those that we disallow by default.
var mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);

var text = freeze(['#text']);

var html$1 = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot']);

var svg$1 = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);

var mathMl$1 = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);

var xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

// eslint-disable-next-line unicorn/better-regex
var MUSTACHE_EXPR = seal(/\{\{[\s\S]*|[\s\S]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
var ERB_EXPR = seal(/<%[\s\S]*|[\s\S]*%>/gm);
var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape
var ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
);
var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getGlobal = function getGlobal() {
  return typeof window === 'undefined' ? null : window;
};

/**
 * Creates a no-op policy for internal use only.
 * Don't export this function outside this module!
 * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
 * @param {Document} document The document object (to determine policy name suffix)
 * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
 * are not supported).
 */
var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
  if ((typeof trustedTypes === 'undefined' ? 'undefined' : _typeof(trustedTypes)) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
    return null;
  }

  // Allow the callers to control the unique policy name
  // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
  // Policy creation with duplicate names throws in Trusted Types.
  var suffix = null;
  var ATTR_NAME = 'data-tt-policy-suffix';
  if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
    suffix = document.currentScript.getAttribute(ATTR_NAME);
  }

  var policyName = 'dompurify' + (suffix ? '#' + suffix : '');

  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML: function createHTML(html$$1) {
        return html$$1;
      }
    });
  } catch (_) {
    // Policy creation failed (most likely another DOMPurify script has
    // already run). Skip creating the policy, as this will only cause errors
    // if TT are enforced.
    console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
    return null;
  }
};

function createDOMPurify() {
  var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

  var DOMPurify = function DOMPurify(root) {
    return createDOMPurify(root);
  };

  /**
   * Version label, exposed for easier checks
   * if DOMPurify is up to date or not
   */
  DOMPurify.version = '2.3.5';

  /**
   * Array of elements that DOMPurify removed during sanitation.
   * Empty if nothing was removed.
   */
  DOMPurify.removed = [];

  if (!window || !window.document || window.document.nodeType !== 9) {
    // Not running in a browser, provide a factory function
    // so that you can pass your own Window
    DOMPurify.isSupported = false;

    return DOMPurify;
  }

  var originalDocument = window.document;

  var document = window.document;
  var DocumentFragment = window.DocumentFragment,
      HTMLTemplateElement = window.HTMLTemplateElement,
      Node = window.Node,
      Element = window.Element,
      NodeFilter = window.NodeFilter,
      _window$NamedNodeMap = window.NamedNodeMap,
      NamedNodeMap = _window$NamedNodeMap === undefined ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
      HTMLFormElement = window.HTMLFormElement,
      DOMParser = window.DOMParser,
      trustedTypes = window.trustedTypes;


  var ElementPrototype = Element.prototype;

  var cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
  var getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
  var getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
  var getParentNode = lookupGetter(ElementPrototype, 'parentNode');

  // As per issue #47, the web-components registry is inherited by a
  // new document created via createHTMLDocument. As per the spec
  // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
  // a new empty registry is used when creating a template contents owner
  // document, so we use that as our parent document to ensure nothing
  // is inherited.
  if (typeof HTMLTemplateElement === 'function') {
    var template = document.createElement('template');
    if (template.content && template.content.ownerDocument) {
      document = template.content.ownerDocument;
    }
  }

  var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);
  var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML('') : '';

  var _document = document,
      implementation = _document.implementation,
      createNodeIterator = _document.createNodeIterator,
      createDocumentFragment = _document.createDocumentFragment,
      getElementsByTagName = _document.getElementsByTagName;
  var importNode = originalDocument.importNode;


  var documentMode = {};
  try {
    documentMode = clone(document).documentMode ? document.documentMode : {};
  } catch (_) {}

  var hooks = {};

  /**
   * Expose whether this browser supports running the full DOMPurify.
   */
  DOMPurify.isSupported = typeof getParentNode === 'function' && implementation && typeof implementation.createHTMLDocument !== 'undefined' && documentMode !== 9;

  var MUSTACHE_EXPR$$1 = MUSTACHE_EXPR,
      ERB_EXPR$$1 = ERB_EXPR,
      DATA_ATTR$$1 = DATA_ATTR,
      ARIA_ATTR$$1 = ARIA_ATTR,
      IS_SCRIPT_OR_DATA$$1 = IS_SCRIPT_OR_DATA,
      ATTR_WHITESPACE$$1 = ATTR_WHITESPACE;
  var IS_ALLOWED_URI$$1 = IS_ALLOWED_URI;

  /**
   * We consider the elements and attributes below to be safe. Ideally
   * don't add any new ones but feel free to remove unwanted ones.
   */

  /* allowed element names */

  var ALLOWED_TAGS = null;
  var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(html), _toConsumableArray$1(svg), _toConsumableArray$1(svgFilters), _toConsumableArray$1(mathMl), _toConsumableArray$1(text)));

  /* Allowed attribute names */
  var ALLOWED_ATTR = null;
  var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray$1(html$1), _toConsumableArray$1(svg$1), _toConsumableArray$1(mathMl$1), _toConsumableArray$1(xml)));

  /*
   * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
   * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
   * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
   * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
   */
  var CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));

  /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
  var FORBID_TAGS = null;

  /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
  var FORBID_ATTR = null;

  /* Decide if ARIA attributes are okay */
  var ALLOW_ARIA_ATTR = true;

  /* Decide if custom data attributes are okay */
  var ALLOW_DATA_ATTR = true;

  /* Decide if unknown protocols are okay */
  var ALLOW_UNKNOWN_PROTOCOLS = false;

  /* Output should be safe for common template engines.
   * This means, DOMPurify removes data attributes, mustaches and ERB
   */
  var SAFE_FOR_TEMPLATES = false;

  /* Decide if document with <html>... should be returned */
  var WHOLE_DOCUMENT = false;

  /* Track whether config is already set on this instance of DOMPurify. */
  var SET_CONFIG = false;

  /* Decide if all elements (e.g. style, script) must be children of
   * document.body. By default, browsers might move them to document.head */
  var FORCE_BODY = false;

  /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
   * string (or a TrustedHTML object if Trusted Types are supported).
   * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
   */
  var RETURN_DOM = false;

  /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
   * string  (or a TrustedHTML object if Trusted Types are supported) */
  var RETURN_DOM_FRAGMENT = false;

  /* Try to return a Trusted Type object instead of a string, return a string in
   * case Trusted Types are not supported  */
  var RETURN_TRUSTED_TYPE = false;

  /* Output should be free from DOM clobbering attacks? */
  var SANITIZE_DOM = true;

  /* Keep element content when removing element? */
  var KEEP_CONTENT = true;

  /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
   * of importing it into a new Document and returning a sanitized copy */
  var IN_PLACE = false;

  /* Allow usage of profiles like html, svg and mathMl */
  var USE_PROFILES = {};

  /* Tags to ignore content of when KEEP_CONTENT is true */
  var FORBID_CONTENTS = null;
  var DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);

  /* Tags that are safe for data: URIs */
  var DATA_URI_TAGS = null;
  var DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);

  /* Attributes safe for values like "javascript:" */
  var URI_SAFE_ATTRIBUTES = null;
  var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);

  var MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
  var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
  /* Document namespace */
  var NAMESPACE = HTML_NAMESPACE;
  var IS_EMPTY_INPUT = false;

  /* Parsing of strict XHTML documents */
  var PARSER_MEDIA_TYPE = void 0;
  var SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
  var DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
  var transformCaseFunc = void 0;

  /* Keep a reference to config to pass to hooks */
  var CONFIG = null;

  /* Ideally, do not touch anything below this line */
  /* ______________________________________________ */

  var formElement = document.createElement('form');

  var isRegexOrFunction = function isRegexOrFunction(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };

  /**
   * _parseConfig
   *
   * @param  {Object} cfg optional config literal
   */
  // eslint-disable-next-line complexity
  var _parseConfig = function _parseConfig(cfg) {
    if (CONFIG && CONFIG === cfg) {
      return;
    }

    /* Shield configuration object from tampering */
    if (!cfg || (typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) !== 'object') {
      cfg = {};
    }

    /* Shield configuration object from prototype pollution */
    cfg = clone(cfg);

    /* Set configuration parameters */
    ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
    URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = 'FORBID_CONTENTS' in cfg ? addToSet({}, cfg.FORBID_CONTENTS) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
    FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
    USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
    RETURN_DOM = cfg.RETURN_DOM || false; // Default false
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
    FORCE_BODY = cfg.FORCE_BODY || false; // Default false
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
    IN_PLACE = cfg.IN_PLACE || false; // Default false
    IS_ALLOWED_URI$$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$$1;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }

    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }

    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }

    PARSER_MEDIA_TYPE =
    // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE;

    // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
    transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? function (x) {
      return x;
    } : stringToLowerCase;

    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }

    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }

    /* Parse profile info */
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(text)));
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html);
        addToSet(ALLOWED_ATTR, html$1);
      }

      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg);
        addToSet(ALLOWED_ATTR, svg$1);
        addToSet(ALLOWED_ATTR, xml);
      }

      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg$1);
        addToSet(ALLOWED_ATTR, xml);
      }

      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl);
        addToSet(ALLOWED_ATTR, mathMl$1);
        addToSet(ALLOWED_ATTR, xml);
      }
    }

    /* Merge configuration parameters */
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }

      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
    }

    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }

      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
    }

    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
    }

    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }

      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS);
    }

    /* Add #text in case KEEP_CONTENT is set to true */
    if (KEEP_CONTENT) {
      ALLOWED_TAGS['#text'] = true;
    }

    /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
    }

    /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ['tbody']);
      delete FORBID_TAGS.tbody;
    }

    // Prevent further manipulation of configuration.
    // Not available in IE8, Safari 5, etc.
    if (freeze) {
      freeze(cfg);
    }

    CONFIG = cfg;
  };

  var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);

  var HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']);

  /* Keep track of all possible SVG and MathML tags
   * so that we can perform the namespace checks
   * correctly. */
  var ALL_SVG_TAGS = addToSet({}, svg);
  addToSet(ALL_SVG_TAGS, svgFilters);
  addToSet(ALL_SVG_TAGS, svgDisallowed);

  var ALL_MATHML_TAGS = addToSet({}, mathMl);
  addToSet(ALL_MATHML_TAGS, mathMlDisallowed);

  /**
   *
   *
   * @param  {Element} element a DOM element whose namespace is being checked
   * @returns {boolean} Return false if the element has a
   *  namespace that a spec-compliant parser would never
   *  return. Return true otherwise.
   */
  var _checkValidNamespace = function _checkValidNamespace(element) {
    var parent = getParentNode(element);

    // In JSDOM, if we're inside shadow DOM, then parentNode
    // can be null. We just simulate parent in this case.
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: HTML_NAMESPACE,
        tagName: 'template'
      };
    }

    var tagName = stringToLowerCase(element.tagName);
    var parentTagName = stringToLowerCase(parent.tagName);

    if (element.namespaceURI === SVG_NAMESPACE) {
      // The only way to switch from HTML namespace to SVG
      // is via <svg>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'svg';
      }

      // The only way to switch from MathML to SVG is via
      // svg if parent is either <annotation-xml> or MathML
      // text integration points.
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }

      // We only allow elements that are defined in SVG
      // spec. All others are disallowed in SVG namespace.
      return Boolean(ALL_SVG_TAGS[tagName]);
    }

    if (element.namespaceURI === MATHML_NAMESPACE) {
      // The only way to switch from HTML namespace to MathML
      // is via <math>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'math';
      }

      // The only way to switch from SVG to MathML is via
      // <math> and HTML integration points
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
      }

      // We only allow elements that are defined in MathML
      // spec. All others are disallowed in MathML namespace.
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }

    if (element.namespaceURI === HTML_NAMESPACE) {
      // The only way to switch from SVG to HTML is via
      // HTML integration points, and from MathML to HTML
      // is via MathML text integration points
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }

      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }

      // Certain elements are allowed in both SVG and HTML
      // namespace. We need to specify them explicitly
      // so that they don't get erronously deleted from
      // HTML namespace.
      var commonSvgAndHTMLElements = addToSet({}, ['title', 'style', 'font', 'a', 'script']);

      // We disallow tags that are specific for MathML
      // or SVG and should never appear in HTML namespace
      return !ALL_MATHML_TAGS[tagName] && (commonSvgAndHTMLElements[tagName] || !ALL_SVG_TAGS[tagName]);
    }

    // The code should never reach this place (this means
    // that the element somehow got namespace that is not
    // HTML, SVG or MathML). Return false just in case.
    return false;
  };

  /**
   * _forceRemove
   *
   * @param  {Node} node a DOM node
   */
  var _forceRemove = function _forceRemove(node) {
    arrayPush(DOMPurify.removed, { element: node });
    try {
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      node.parentNode.removeChild(node);
    } catch (_) {
      try {
        node.outerHTML = emptyHTML;
      } catch (_) {
        node.remove();
      }
    }
  };

  /**
   * _removeAttribute
   *
   * @param  {String} name an Attribute name
   * @param  {Node} node a DOM node
   */
  var _removeAttribute = function _removeAttribute(name, node) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: node.getAttributeNode(name),
        from: node
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: node
      });
    }

    node.removeAttribute(name);

    // We void attribute values for unremovable "is"" attributes
    if (name === 'is' && !ALLOWED_ATTR[name]) {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(node);
        } catch (_) {}
      } else {
        try {
          node.setAttribute(name, '');
        } catch (_) {}
      }
    }
  };

  /**
   * _initDocument
   *
   * @param  {String} dirty a string of dirty markup
   * @return {Document} a DOM, filled with the dirty markup
   */
  var _initDocument = function _initDocument(dirty) {
    /* Create a HTML document */
    var doc = void 0;
    var leadingWhitespace = void 0;

    if (FORCE_BODY) {
      dirty = '<remove></remove>' + dirty;
    } else {
      /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
      var matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }

    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml') {
      // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
    }

    var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    /*
     * Use the DOMParser API by default, fallback later if needs be
     * DOMParser not work for svg when has multiple root element.
     */
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {}
    }

    /* Use createHTMLDocument in case DOMParser is not available */
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, 'template', null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? '' : dirtyPayload;
      } catch (_) {
        // Syntax error if dirtyPayload is invalid xml
      }
    }

    var body = doc.body || doc.documentElement;

    if (dirty && leadingWhitespace) {
      body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }

    /* Work on whole document or just its body */
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
    }

    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };

  /**
   * _createIterator
   *
   * @param  {Document} root document/fragment to create iterator for
   * @return {Iterator} iterator instance
   */
  var _createIterator = function _createIterator(root) {
    return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
  };

  /**
   * _isClobbered
   *
   * @param  {Node} elm element to check for clobbering attacks
   * @return {Boolean} true if clobbered, false if safe
   */
  var _isClobbered = function _isClobbered(elm) {
    return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function');
  };

  /**
   * _isNode
   *
   * @param  {Node} obj object to check whether it's a DOM node
   * @return {Boolean} true is object is a DOM node
   */
  var _isNode = function _isNode(object) {
    return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? object instanceof Node : object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
  };

  /**
   * _executeHook
   * Execute user configurable hooks
   *
   * @param  {String} entryPoint  Name of the hook's entry point
   * @param  {Node} currentNode node to work on with the hook
   * @param  {Object} data additional hook parameters
   */
  var _executeHook = function _executeHook(entryPoint, currentNode, data) {
    if (!hooks[entryPoint]) {
      return;
    }

    arrayForEach(hooks[entryPoint], function (hook) {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  };

  /**
   * _sanitizeElements
   *
   * @protect nodeName
   * @protect textContent
   * @protect removeChild
   *
   * @param   {Node} currentNode to check for permission to exist
   * @return  {Boolean} true if node was killed, false if left alive
   */
  var _sanitizeElements = function _sanitizeElements(currentNode) {
    var content = void 0;

    /* Execute a hook if present */
    _executeHook('beforeSanitizeElements', currentNode, null);

    /* Check if element is clobbered or can clobber */
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Check if tagname contains Unicode */
    if (stringMatch(currentNode.nodeName, /[\u0080-\uFFFF]/)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Now let's check the element's type and name */
    var tagName = transformCaseFunc(currentNode.nodeName);

    /* Execute a hook if present */
    _executeHook('uponSanitizeElement', currentNode, {
      tagName: tagName,
      allowedTags: ALLOWED_TAGS
    });

    /* Detect mXSS attempts abusing namespace confusion */
    if (!_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Mitigate a problem with templates inside select */
    if (tagName === 'select' && regExpTest(/<template/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Remove element if anything forbids its presence */
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      /* Keep content except for bad-listed elements */
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        var parentNode = getParentNode(currentNode) || currentNode.parentNode;
        var childNodes = getChildNodes(currentNode) || currentNode.childNodes;

        if (childNodes && parentNode) {
          var childCount = childNodes.length;

          for (var i = childCount - 1; i >= 0; --i) {
            parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
          }
        }
      }

      if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
      }

      _forceRemove(currentNode);
      return true;
    }

    /* Check whether element has a valid namespace */
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }

    if ((tagName === 'noscript' || tagName === 'noembed') && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }

    /* Sanitize element content to be template-safe */
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
      /* Get the element's text content */
      content = currentNode.textContent;
      content = stringReplace(content, MUSTACHE_EXPR$$1, ' ');
      content = stringReplace(content, ERB_EXPR$$1, ' ');
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
        currentNode.textContent = content;
      }
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeElements', currentNode, null);

    return false;
  };

  /**
   * _isValidAttribute
   *
   * @param  {string} lcTag Lowercase tag name of containing element.
   * @param  {string} lcName Lowercase attribute name.
   * @param  {string} value Attribute value.
   * @return {Boolean} Returns true if `value` is valid, otherwise false.
   */
  // eslint-disable-next-line complexity
  var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
    /* Make sure attribute cannot clobber */
    if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
      return false;
    }

    /* Allow valid data-* attributes: At least one character after "-"
        (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
        XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
        We don't need to check the value; it's always URI safe. */
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$$1, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$$1, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
      // First condition does a very basic check if a) it's basically a valid custom element tagname AND
      // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
      _basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) ||
      // Alternative, second condition checks if it's an `is`-attribute, AND
      // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
        return false;
      }
      /* Check value is safe. First, is attr inert? If so, is safe */
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$$1, stringReplace(value, ATTR_WHITESPACE$$1, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$$1, stringReplace(value, ATTR_WHITESPACE$$1, ''))) ; else if (!value) ; else {
      return false;
    }

    return true;
  };

  /**
   * _basicCustomElementCheck
   * checks if at least one dash is included in tagName, and it's not the first char
   * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
   * @param {string} tagName name of the tag of the node to sanitize
   */
  var _basicCustomElementTest = function _basicCustomElementTest(tagName) {
    return tagName.indexOf('-') > 0;
  };

  /**
   * _sanitizeAttributes
   *
   * @protect attributes
   * @protect nodeName
   * @protect removeAttribute
   * @protect setAttribute
   *
   * @param  {Node} currentNode to sanitize
   */
  var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
    var attr = void 0;
    var value = void 0;
    var lcName = void 0;
    var l = void 0;
    /* Execute a hook if present */
    _executeHook('beforeSanitizeAttributes', currentNode, null);

    var attributes = currentNode.attributes;

    /* Check if we have attributes; if not we might have a text node */

    if (!attributes) {
      return;
    }

    var hookEvent = {
      attrName: '',
      attrValue: '',
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR
    };
    l = attributes.length;

    /* Go backwards over all attributes; safely remove bad ones */
    while (l--) {
      attr = attributes[l];
      var _attr = attr,
          name = _attr.name,
          namespaceURI = _attr.namespaceURI;

      value = stringTrim(attr.value);
      lcName = transformCaseFunc(name);

      /* Execute a hook if present */
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
      _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
      value = hookEvent.attrValue;
      /* Did the hooks approve of the attribute? */
      if (hookEvent.forceKeepAttr) {
        continue;
      }

      /* Remove attribute */
      _removeAttribute(name, currentNode);

      /* Did the hooks approve of the attribute? */
      if (!hookEvent.keepAttr) {
        continue;
      }

      /* Work around a security issue in jQuery 3.0 */
      if (regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }

      /* Sanitize attribute content to be template-safe */
      if (SAFE_FOR_TEMPLATES) {
        value = stringReplace(value, MUSTACHE_EXPR$$1, ' ');
        value = stringReplace(value, ERB_EXPR$$1, ' ');
      }

      /* Is `value` valid for this attribute? */
      var lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        continue;
      }

      /* Handle invalid data-* attribute set by try-catching it */
      try {
        if (namespaceURI) {
          currentNode.setAttributeNS(namespaceURI, name, value);
        } else {
          /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
          currentNode.setAttribute(name, value);
        }

        arrayPop(DOMPurify.removed);
      } catch (_) {}
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeAttributes', currentNode, null);
  };

  /**
   * _sanitizeShadowDOM
   *
   * @param  {DocumentFragment} fragment to iterate over recursively
   */
  var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
    var shadowNode = void 0;
    var shadowIterator = _createIterator(fragment);

    /* Execute a hook if present */
    _executeHook('beforeSanitizeShadowDOM', fragment, null);

    while (shadowNode = shadowIterator.nextNode()) {
      /* Execute a hook if present */
      _executeHook('uponSanitizeShadowNode', shadowNode, null);

      /* Sanitize tags and elements */
      if (_sanitizeElements(shadowNode)) {
        continue;
      }

      /* Deep shadow DOM detected */
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(shadowNode.content);
      }

      /* Check attributes, sanitize if necessary */
      _sanitizeAttributes(shadowNode);
    }

    /* Execute a hook if present */
    _executeHook('afterSanitizeShadowDOM', fragment, null);
  };

  /**
   * Sanitize
   * Public method providing core sanitation functionality
   *
   * @param {String|Node} dirty string or DOM node
   * @param {Object} configuration object
   */
  // eslint-disable-next-line complexity
  DOMPurify.sanitize = function (dirty, cfg) {
    var body = void 0;
    var importedNode = void 0;
    var currentNode = void 0;
    var oldNode = void 0;
    var returnNode = void 0;
    /* Make sure we have a string to sanitize.
      DO NOT return early, as this will return the wrong type if
      the user has requested a DOM object rather than a string */
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = '<!-->';
    }

    /* Stringify, in case dirty is an object */
    if (typeof dirty !== 'string' && !_isNode(dirty)) {
      // eslint-disable-next-line no-negated-condition
      if (typeof dirty.toString !== 'function') {
        throw typeErrorCreate('toString is not a function');
      } else {
        dirty = dirty.toString();
        if (typeof dirty !== 'string') {
          throw typeErrorCreate('dirty is not a string, aborting');
        }
      }
    }

    /* Check we can run. Otherwise fall back or ignore */
    if (!DOMPurify.isSupported) {
      if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
        if (typeof dirty === 'string') {
          return window.toStaticHTML(dirty);
        }

        if (_isNode(dirty)) {
          return window.toStaticHTML(dirty.outerHTML);
        }
      }

      return dirty;
    }

    /* Assign config vars */
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }

    /* Clean up removed elements */
    DOMPurify.removed = [];

    /* Check if dirty is correctly typed for IN_PLACE */
    if (typeof dirty === 'string') {
      IN_PLACE = false;
    }

    if (IN_PLACE) {
      /* Do some early pre-sanitization to avoid unsafe root nodes */
      if (dirty.nodeName) {
        var tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
        }
      }
    } else if (dirty instanceof Node) {
      /* If dirty is a DOM element, append to an empty document to avoid
         elements being stripped by the parser */
      body = _initDocument('<!---->');
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
        /* Node is already a body, use as is */
        body = importedNode;
      } else if (importedNode.nodeName === 'HTML') {
        body = importedNode;
      } else {
        // eslint-disable-next-line unicorn/prefer-dom-node-append
        body.appendChild(importedNode);
      }
    } else {
      /* Exit directly if we have nothing to do */
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
      // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf('<') === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }

      /* Initialize the document to work on */
      body = _initDocument(dirty);

      /* Check we have a DOM node from the data */
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
      }
    }

    /* Remove first element node (ours) if FORCE_BODY is set */
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }

    /* Get node iterator */
    var nodeIterator = _createIterator(IN_PLACE ? dirty : body);

    /* Now start iterating over the created document */
    while (currentNode = nodeIterator.nextNode()) {
      /* Fix IE's strange behavior with manipulated textNodes #89 */
      if (currentNode.nodeType === 3 && currentNode === oldNode) {
        continue;
      }

      /* Sanitize tags and elements */
      if (_sanitizeElements(currentNode)) {
        continue;
      }

      /* Shadow DOM detected, sanitize it */
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }

      /* Check attributes, sanitize if necessary */
      _sanitizeAttributes(currentNode);

      oldNode = currentNode;
    }

    oldNode = null;

    /* If we sanitized `dirty` in-place, return it. */
    if (IN_PLACE) {
      return dirty;
    }

    /* Return sanitized string or DOM */
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);

        while (body.firstChild) {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }

      if (ALLOWED_ATTR.shadowroot) {
        /*
          AdoptNode() is not used because internal state is not reset
          (e.g. the past names map of a HTMLFormElement), this is safe
          in theory but we would rather not risk another attack vector.
          The state that is cloned by importNode() is explicitly defined
          by the specs.
        */
        returnNode = importNode.call(originalDocument, returnNode, true);
      }

      return returnNode;
    }

    var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;

    /* Sanitize final string template-safe */
    if (SAFE_FOR_TEMPLATES) {
      serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$$1, ' ');
      serializedHTML = stringReplace(serializedHTML, ERB_EXPR$$1, ' ');
    }

    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };

  /**
   * Public method to set the configuration once
   * setConfig
   *
   * @param {Object} cfg configuration object
   */
  DOMPurify.setConfig = function (cfg) {
    _parseConfig(cfg);
    SET_CONFIG = true;
  };

  /**
   * Public method to remove the configuration
   * clearConfig
   *
   */
  DOMPurify.clearConfig = function () {
    CONFIG = null;
    SET_CONFIG = false;
  };

  /**
   * Public method to check if an attribute value is valid.
   * Uses last set config, if any. Otherwise, uses config defaults.
   * isValidAttribute
   *
   * @param  {string} tag Tag name of containing element.
   * @param  {string} attr Attribute name.
   * @param  {string} value Attribute value.
   * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
   */
  DOMPurify.isValidAttribute = function (tag, attr, value) {
    /* Initialize shared config vars if necessary. */
    if (!CONFIG) {
      _parseConfig({});
    }

    var lcTag = transformCaseFunc(tag);
    var lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };

  /**
   * AddHook
   * Public method to add DOMPurify hooks
   *
   * @param {String} entryPoint entry point for the hook to add
   * @param {Function} hookFunction function to execute
   */
  DOMPurify.addHook = function (entryPoint, hookFunction) {
    if (typeof hookFunction !== 'function') {
      return;
    }

    hooks[entryPoint] = hooks[entryPoint] || [];
    arrayPush(hooks[entryPoint], hookFunction);
  };

  /**
   * RemoveHook
   * Public method to remove a DOMPurify hook at a given entryPoint
   * (pops it from the stack of hooks if more are present)
   *
   * @param {String} entryPoint entry point for the hook to remove
   */
  DOMPurify.removeHook = function (entryPoint) {
    if (hooks[entryPoint]) {
      arrayPop(hooks[entryPoint]);
    }
  };

  /**
   * RemoveHooks
   * Public method to remove all DOMPurify hooks at a given entryPoint
   *
   * @param  {String} entryPoint entry point for the hooks to remove
   */
  DOMPurify.removeHooks = function (entryPoint) {
    if (hooks[entryPoint]) {
      hooks[entryPoint] = [];
    }
  };

  /**
   * RemoveAllHooks
   * Public method to remove all DOMPurify hooks
   *
   */
  DOMPurify.removeAllHooks = function () {
    hooks = {};
  };

  return DOMPurify;
}

var purify = createDOMPurify();

var replacePromptParams = function (prompt, dir) {
    var p = prompt.replace(/\$p/gi, "C:\\".concat(dir));
    p = p.replace(/\$q/gi, '=');
    p = p.replace(/\$g/gi, '>');
    p = p.replace(/\$l/gi, '<');
    p = p.replace(/\$n/gi, 'C:');
    p = p.replace(/\$b/gi, '|');
    p = p.replace(/\$\$/gi, '$');
    p = p.replace(/\$_/gi, '\n');
    p = p.replace(/\$a/gi, '&');
    p = p.replace(/\$c/gi, '(');
    p = p.replace(/\$f/gi, ')');
    p = p.replace(/\$s/gi, ' ');
    p = p.replace(/\$t/gi, new Date().toLocaleTimeString());
    p = p.replace(/\$d/gi, new Date().toLocaleDateString());
    return p;
};
var formatPrompt = function (prompt, dir) {
    var final = replacePromptParams(prompt, dir);
    return purify.sanitize(final);
};
var fullDirPath = function (dir) {
    return "C:\\".concat(dir);
};
var getDir = function (files, dirPath) {
    var parts = dirPath.split('\\');
    var obj = files;
    var _loop_1 = function (i) {
        if (parts[i] === '') {
            return "continue";
        }
        var test = obj.find(function (c) { return c.name === parts[i]; });
        if (test) {
            obj = test.content;
        }
        else {
            return { value: null };
        }
    };
    for (var i = 0; i < parts.length; i += 1) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return obj;
};
var getFile = function (files, name, pathsToSearch, matchFullName) {
    if (matchFullName === void 0) { matchFullName = false; }
    var regexAttrib = /(.+?)(\.[^.]*$|$)/;
    var c = pathsToSearch.reduce(function (acc, path) {
        if (_.isEmpty(acc)) {
            var dirContent = getDir(files, path);
            if (dirContent) {
                var fileName_1 = name;
                var file = void 0;
                if (!matchFullName) {
                    file = dirContent.find(function (f) {
                        var match = f.name.match(regexAttrib);
                        return (match &&
                            (match[0] === fileName_1 || match[1] === fileName_1));
                    });
                }
                else {
                    file = dirContent.find(function (f) { return f.name === name; });
                }
                if (file) {
                    return file;
                }
            }
        }
        return acc;
    }, {});
    if (!_.isEmpty(c)) {
        return c;
    }
    return null;
};
var getFakeFileSize = function (func) {
    if (typeof func === 'function') {
        var x = func.toString();
        return JSON.stringify(x).length * 2;
    }
    return func.reduce(function (acc, cmd) {
        var x = cmd.toString();
        var val = acc + JSON.stringify(x).length * 2;
        return val;
    }, 0);
};
var getCommandsSize = function (commands) {
    return commands.reduce(function (acc, cmd) {
        var filesize = (cmd.alias ? cmd.alias.toString().length : 0) * 2;
        var help = cmd.help ? cmd.help.toString().length : 0;
        if (cmd.action) {
            filesize += getFakeFileSize([cmd.action]) + help + acc;
            return filesize;
        }
        return acc;
    }, 0);
};
var fileSystemHelper = {
    getFakeFileSize: getFakeFileSize,
    getDir: getDir,
    getFile: getFile,
    getCommandsSize: getCommandsSize,
    fullDirPath: fullDirPath,
    formatPrompt: formatPrompt,
};

var run$8 = function (_a) {
    var name = _a.name, args = _a.args, files = _a.files, actualDir = _a.actualDir;
    if (!args && (name === 'cd' || name === 'chdir')) {
        return {};
    }
    if (name === 'cd\\' || name === 'chdir\\') {
        return { configTerminal: { config: 'setActualDir', value: '' } };
    }
    var regexNameReturn = /\.\./;
    if (regexNameReturn.test(name) && actualDir === '') {
        return {
            output: [
                {
                    action: 'add',
                    value: ["Error: You can't move back from root.", ''],
                },
            ],
        };
    }
    if (regexNameReturn.test(name) && actualDir !== '') {
        return { configTerminal: { config: 'setActualDir', value: '' } };
    }
    if (args[0] === '\\' && args.length === 1) {
        return { configTerminal: { config: 'setActualDir', value: '' } };
    }
    if (args[0] === '\\' && args.length > 1) {
        var dirPath = args.substring(1);
        var dirContent = fileSystemHelper.getDir(files, dirPath);
        if (dirContent) {
            return {
                configTerminal: { config: 'setActualDir', value: dirPath },
            };
        }
        return {
            output: [
                {
                    action: 'add',
                    value: ["This directory doesn't exists.", ''],
                },
            ],
        };
    }
    if (args[0] !== '\\') {
        var dirPath = "".concat(actualDir, "\\").concat(args);
        var dirContent = fileSystemHelper.getDir(files, dirPath);
        var newDir = actualDir === '' ? args : "".concat(actualDir, "\\").concat(args);
        if (dirContent) {
            return { configTerminal: { config: 'setActualDir', value: newDir } };
        }
        return {
            output: [
                {
                    action: 'add',
                    value: ["This directory doesn't exists.", ''],
                },
            ],
        };
    }
    return {
        output: [
            {
                action: 'add',
                value: ["Error: Some strange error has occurred.", ''],
            },
        ],
    };
};
var help$8 = [
    "CHDIR (change directory) is a command used to switch directories.",
    '',
    "CHDIR [path]   If path directory is available in the current directory, it takes you into path directory.",
    "CHDIR \\[path]  If path directory is available, it would first move back to the root of the drive and then go into the path directory.",
    "CHDIR\\   Goes to the highest level (the root) of the drive.",
    "CHDIR..  Moves back one directory.",
    '',
    "CD [path]   If path directory is available in the current directory, it takes you into path directory.",
    "CD \\[path]  If path directory is available, it would first move back to the root of the drive and then go into the path directory.",
    "CD\\   Goes to the highest level (the root) of the drive.",
    "CD..  Moves back one directory.",
    '',
];
var cd = { run: run$8, help: help$8 };

var run$7 = function () {
    return {
        output: [{ action: 'clear' }],
    };
};
var help$7 = ['Clears the command prompt screen.'];
var cls = {
    run: run$7,
    help: help$7,
};

var allowedColors = [
    '#000000',
    '#0000aa',
    '#00aa00',
    '#00aaaa',
    '#aa0000',
    '#aa00aa',
    '#aa5500',
    '#aaaaaa',
    '#555555',
    '#5555ff',
    '#55ff55',
    '#55ffff',
    '#ff5555',
    '#ff55ff',
    '#ffff55',
    '#ffffff',
];
var namesMap = [
    'black',
    'blue',
    'green',
    'aqua',
    'red',
    'purple',
    'yellow',
    'white',
    'gray',
    'lightblue',
    'lightgreen',
    'lightaqua',
    'lightred',
    'lightpurple',
    'lightyellow',
    'brightwhite',
];
var ColorException = function (type, value) {
    switch (type) {
        case 'name':
            return "Invalid Color Name Exception: provided color name ".concat(value, " is not a valid name\n\r\n\r\n        Valid names are: ").concat(namesMap.join(', '));
        case 'color':
            return "Invalid Color Exception: provided color is not valid \n\r\n\r\n        Valid color are: ".concat(allowedColors.join(', '));
        default:
            return "Invalid Color Exception";
    }
};
var getColorByHex = function (color) {
    return allowedColors[parseInt(color, 16)];
};
var getColorByName = function (color) {
    var index = namesMap.indexOf(color);
    if (index === -1) {
        throw ColorException('name', color);
    }
    return allowedColors[index];
};
var getHexByColor = function (color) {
    var index = allowedColors.indexOf(color);
    if (index === -1) {
        throw ColorException('color', color);
    }
    return index.toString(16);
};
var colorsHelper = {
    getHexByColor: getHexByColor,
    getColorByName: getColorByName,
    getColorByHex: getColorByHex,
    allowedColors: allowedColors,
};

var help$6 = [
    'The COLOR command is used to configure the terminal colors.',
    '',
    "COLOR [HH]",
    '',
    'Color attributes are specified by TWO hex digits -- the first corresponds to the background; the second the foreground. Digits MUST BE diferent. Each digit can be any of the below values:',
    '',
    "0 = Black       8 = Gray",
    '1 = Blue        9 = Light Blue',
    '2 = Green       A = Light Green',
    '3 = Aqua        B = Light Aqua',
    '4 = Red         C = Light Red',
    '5 = Purple      D = Light Purple',
    '6 = Yellow      E = Light Yellow',
    "7 = White       F = Bright White",
    '',
];
var run$6 = function (_a) {
    var args = _a.args;
    var re = /[0-9A-Fa-f]{2}/g;
    if (!args || !re.test(args) || args[0] === args[1]) {
        return { output: [{ action: 'add', value: help$6 }] };
    }
    var colors = {
        background: colorsHelper.getColorByHex(args[0]),
        color: colorsHelper.getColorByHex(args[1]),
    };
    return {
        output: [
            { action: 'add', value: ['Colors changed successfully.', ''] },
        ],
        configTerminal: { config: 'setColors', value: colors },
    };
};
var color = { run: run$6, help: help$6 };

var help$5 = [
    'The DIR command displays information about files and directories, and how much disk space is available.',
    '',
    "DIR [path] [/a[:Attributes]]",
    '',
    "/a:Attributes\t   Displays only files with the specified file attributes. Attributes is a series of letters, each representing an attribute as shown below.",
    '',
    "h: shows hidden files",
    '',
];
var run$5 = function (_a) {
    var args = _a.args, files = _a.files, actualDir = _a.actualDir, totalSize = _a.totalSize;
    var device = function () {
        var dvc = navigator.userAgent.match(/(MSIE|(?!Gecko.+)Firefox|(?!AppleWebKit.+Chrome.+)Safari|(?!AppleWebKit.+)Chrome|AppleWebKit(?!.+Chrome|.+Safari)|Gecko(?!.+Firefox))(?: |\/)([\d.apre]+)/);
        return dvc !== null && dvc !== void 0 ? dvc : 'OS';
    };
    var getInitialOutput = function (finalPath) {
        var dev = device();
        return [
            '',
            "Volume in drive C is ".concat(dev[1]),
            "Volume version is ".concat(dev[2]),
            '',
            "Directory of ".concat(fileSystemHelper.fullDirPath(finalPath)),
            '',
            '',
        ];
    };
    var getFinalOutput = function (filesNumber, dirsNumber, size) {
        var _a;
        var freeSize = (4194304 - totalSize).toLocaleString('en-US', {
            minimumFractionDigits: 0,
        });
        return [
            '',
            "   ".concat(filesNumber, " File(s)   ").concat((_a = size.toLocaleString('en-US', { minimumFractionDigits: 0 })) !== null && _a !== void 0 ? _a : 0, " bytes"),
            "   ".concat(dirsNumber, " Dir(s)   ").concat(freeSize, " bytes free"),
            '',
            '',
        ];
    };
    var output = function (finalPath, content, showHidden) {
        var filesNumber = 0;
        var dirsNumber = 0;
        var size = 0;
        var space = ' ';
        if (_.isEmpty(content)) {
            return __spreadArray(__spreadArray([], getInitialOutput(finalPath), true), getFinalOutput(filesNumber, dirsNumber, size), true);
        }
        var dirContent = content.reduce(function (acc, item) {
            var _a, _b;
            var text = '';
            if (showHidden || item.attributes[1] !== 'h') {
                if (item.type !== 'directory') {
                    filesNumber += 1;
                    size += (_a = item.size) !== null && _a !== void 0 ? _a : 0;
                    text = "".concat(item.name).concat(space.repeat(28 - item.name.length)).concat((_b = item.size) === null || _b === void 0 ? void 0 : _b.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                    }));
                }
                else {
                    dirsNumber += 1;
                    text = "".concat(item.name).concat(space.repeat(20 - item.name.length), "&ltDIR&gt");
                }
                acc.push(text);
            }
            return acc;
        }, []);
        if (!dirContent || _.isEmpty(dirContent)) {
            return __spreadArray(__spreadArray([], getInitialOutput(finalPath), true), getFinalOutput(filesNumber, dirsNumber, size), true);
        }
        return __spreadArray(__spreadArray(__spreadArray([], getInitialOutput(finalPath), true), dirContent, true), getFinalOutput(filesNumber, dirsNumber, size), true);
    };
    var showHidden = false;
    var regexAttrib = /\/a:([a-zA-Z]+)/;
    var match = args.match(regexAttrib);
    if (match && match[1] && match[1].includes('h')) {
        showHidden = true;
    }
    else if (match && match[1] && !match[1].includes('h')) {
        return {
            output: [
                {
                    action: 'add',
                    value: __spreadArray([
                        "Error: ".concat(match[0], " is not a valid argument."),
                        ''
                    ], help$5, true),
                },
            ],
        };
    }
    if (args === '' || (match && args === match[0])) {
        var content = fileSystemHelper.getDir(files, actualDir);
        if (content) {
            return {
                output: [
                    {
                        action: 'add',
                        value: output(actualDir, content, showHidden),
                    },
                ],
            };
        }
    }
    var options = args.split(' ');
    var result;
    options.forEach(function (option) {
        if ((match !== null && option !== match[0]) || !match) {
            var path = option;
            var finalPath = path[0] === '\\' ? path : actualDir + path;
            var content = fileSystemHelper.getDir(files, finalPath);
            if (content) {
                result = output(finalPath, content, showHidden);
            }
        }
    });
    if (result) {
        return { output: [{ action: 'add', value: result }] };
    }
    return {
        output: [
            { action: 'add', value: ['Error: directory does not exist.', ''] },
        ],
    };
};
var dir = { run: run$5, help: help$5 };

var replaceName = function (name, message) {
    var msg = message === null || message === void 0 ? void 0 : message.replace('%n', name.toLowerCase());
    return msg === null || msg === void 0 ? void 0 : msg.replace('%N', name.toUpperCase());
};
var commandNotFound = {
    name: 'notfound',
    action: function (_a) {
        var name = _a.name, messages = _a.messages;
        var msg = replaceName(name, messages.notFound);
        return {
            output: [{ action: 'add', value: [msg, ''] }],
        };
    },
};
var toBeImplemented = {
    name: 'toBeImplemented',
    action: function (_a) {
        var name = _a.name, messages = _a.messages;
        var msg = replaceName(name, messages.toBeImplemented);
        return {
            output: [{ action: 'add', value: [msg, ''] }],
        };
    },
};
var cantBeExecuted = {
    name: 'cantBeExecuted',
    action: function (_a) {
        var name = _a.name, messages = _a.messages;
        var msg = replaceName(name, messages.cantBeExecuted);
        return {
            output: [{ action: 'add', value: [msg, ''] }],
        };
    },
};
var helpNotAvailable = {
    name: 'helpNotAvailable',
    action: function (_a) {
        var name = _a.name, messages = _a.messages;
        var msg = replaceName(name, messages.helpNotAvailable);
        return {
            output: [{ action: 'add', value: [msg, ''] }],
        };
    },
};
var isAlreadyRunning = {
    name: 'isAlreadyRunning',
    action: function (_a) {
        var name = _a.name, messages = _a.messages;
        var msg = replaceName(name, messages.isAlreadyRunning);
        return {
            output: [{ action: 'add', value: [msg, ''] }],
        };
    },
};
var link = function (href, text) {
    return "<a href=\"".concat(href, "\" target=\"_blank\" >").concat(text, "</a>");
};
var commandsHelper = {
    commandNotFound: commandNotFound,
    toBeImplemented: toBeImplemented,
    cantBeExecuted: cantBeExecuted,
    helpNotAvailable: helpNotAvailable,
    isAlreadyRunning: isAlreadyRunning,
    link: link,
};

var help$4 = function (props) { return __awaiter(void 0, void 0, void 0, function () {
    var commands, args, files, actualDir, helpText, output, h, cmd, systemPaths, file;
    return __generator(this, function (_a) {
        commands = props.allCommands;
        args = props.args, files = props.files, actualDir = props.actualDir;
        helpText = function (cmd) {
            if (cmd && cmd.help) {
                if (typeof cmd.help === 'function') {
                    return cmd.help();
                }
                return cmd.help;
            }
            return '';
        };
        if (!args) {
            output = commands.reduce(function (acc, command) {
                if (command.help) {
                    acc.push(command.name.toUpperCase());
                }
                return acc;
            }, []);
            return [2, {
                    output: [
                        {
                            action: 'add',
                            value: __spreadArray(__spreadArray([
                                '',
                                'HELP',
                                '',
                                "The HELP command is used to access the help for available commands.",
                                '',
                                "HELP [command]",
                                "",
                                "command\tDisplays help information on that command.",
                                '',
                                'Help is available for those commands:',
                                ''
                            ], output.sort(), true), [
                                '',
                            ], false),
                        },
                    ],
                }];
        }
        cmd = commands.filter(function (command) {
            return command.name === args ||
                (command.alias && command.alias.includes(args));
        });
        h = helpText(cmd[0]);
        if (_.isEmpty(h)) {
            systemPaths = [actualDir, '', '\\system'];
            file = fileSystemHelper.getFile(files, args, systemPaths);
            if (file &&
                (file.type === 'application/executable' ||
                    file.type === 'application/system')) {
                h = helpText(file.content);
            }
        }
        if (!_.isEmpty(h)) {
            return [2, {
                    output: [
                        { action: 'add', value: ['', args.toUpperCase(), ''] },
                        { action: 'add', value: h },
                        { action: 'add', value: [''] },
                    ],
                }];
        }
        if (commandsHelper.helpNotAvailable.action) {
            return [2, commandsHelper.helpNotAvailable.action(__assign(__assign({}, props), { name: args }))];
        }
        return [2, {
                output: [{ action: 'add', value: 'Error: Unknown error' }],
            }];
    });
}); };

var hidden = function () {
    return {
        output: [
            {
                action: 'add',
                value: [
                    '',
                    'Oh, no!!!',
                    '',
                    "You found my secret code!!!",
                    '',
                    '😱😱😱😱😱😱',
                    '',
                    '',
                ],
            },
        ],
    };
};

var help$3 = [
    '____ ____ ____ ____ ___',
    '|__/ |___ |__| |     | ',
    '|  \\ |___ |  | |___  | ',
    '',
    '      ___  ____ ____ ',
    '   __ |  \\ |  | [__  __    ',
    '      |__/ |__| ___]     ',
    '      ',
    '___ ____ ____ _  _ _ _  _ ____ _    ',
    ' |  |___ |__/ |\\/| | |\\ | |__| |    ',
    ' |  |___ |  \\ |  | | | \\| |  | |___ ',
    '',
    '',
    "This project was made by ".concat(commandsHelper.link('https://tpabarbosa.github.io/#/contact', 'Tatiana Barbosa'), " with create-react-app and typescript. It's a simple component to mimic the behavior of a DOS command line interface."),
    '',
    '',
    "By now only a few commands are available, but much more can be done to improve it. See ".concat(commandsHelper.link('https://github.com/tpabarbosa', 'documentation'), " to get more information."),
    '',
    '',
    "Thanks to \"VileR\" from ".concat(commandsHelper.link('https://int10h.org/oldschool-pc-fonts', 'THE OLDSCHOOL PC FONT RESOURCE'), " for adapting and providing various oldschool fonts. WebPlus_IBM_VGA_9x16.woff was the chosen font for this project."),
    '',
];
var run$4 = function () {
    return {
        output: [{ action: 'add', value: help$3 }],
    };
};
var reactDosTerminal = { run: run$4, help: help$3 };

var run$3 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var callAsync;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                callAsync = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2, new Promise(function (resolve) {
                                setTimeout(function () {
                                    resolve(true);
                                }, 3000);
                            })];
                    });
                }); };
                return [4, callAsync().then()];
            case 1:
                _a.sent();
                return [2, {
                        output: [
                            { action: 'remove', value: 3 },
                            { action: 'add', value: ['', 'Finished async command', ''] },
                        ],
                    }];
        }
    });
}); };
var waitingMessage = ['Loading...', '', 'Please wait...'];
var testAsync = {
    run: run$3,
    waitingMessage: waitingMessage,
};

var useCaretHandler = function () {
    var _a = useState(0), caretCorrection = _a[0], setCaretCorrection = _a[1];
    var _b = useState(null), actualInput = _b[0], setActualInput = _b[1];
    var terminal = useTerminal();
    var userHasInteracted = terminal.userHasInteracted, autoFocus = terminal.autoFocus;
    var setInputRef = function (input) {
        setActualInput(input);
    };
    var getCaretPosition = function (editableDiv) {
        var caretPos = 0;
        var sel;
        var range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel && sel.rangeCount) {
                range = sel.getRangeAt(0);
                if (range.commonAncestorContainer.parentNode === editableDiv) {
                    caretPos = range.endOffset;
                }
            }
        }
        return caretPos;
    };
    var setCaret = function (editableDiv, charPos) {
        var range = document.createRange();
        var sel = window.getSelection();
        if (editableDiv.firstChild !== null) {
            range.setStart(editableDiv.firstChild, charPos);
        }
        else {
            range.setStart(editableDiv, charPos);
        }
        range.collapse(true);
        if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
    };
    var updateCaretPosition = function () {
        var tex = actualInput === null || actualInput === void 0 ? void 0 : actualInput.textContent;
        var pos = actualInput ? getCaretPosition(actualInput) : 0;
        setCaretCorrection(pos - tex.length);
        if (actualInput)
            actualInput.focus();
    };
    var setPosition = function (pos) {
        var tex = actualInput === null || actualInput === void 0 ? void 0 : actualInput.textContent;
        if (actualInput)
            setCaret(actualInput, pos);
        setCaretCorrection(pos - tex.length);
    };
    useEffect(function () {
        if (userHasInteracted && actualInput)
            actualInput.focus();
        if (!userHasInteracted && autoFocus && actualInput)
            actualInput.focus();
    }, [actualInput, userHasInteracted, autoFocus]);
    return {
        caretCorrection: caretCorrection,
        updateCaretPosition: updateCaretPosition,
        input: actualInput,
        setPosition: setPosition,
        setInputRef: setInputRef,
    };
};

var getBackground = function (striped, background) {
    var text = "repeating-linear-gradient(6deg, ".concat(background, "e0 1px, ").concat(background, " 6px)");
    return striped ? text : "".concat(background);
};
var getColorsCSS = function (colors, oldEffect) {
    var text = "background: ".concat(getBackground(oldEffect, colors === null || colors === void 0 ? void 0 : colors.background), ";");
    if (colors) {
        return css(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n            ", "\n            ", "\n        "], ["\n            ", "\n            ", "\n        "])), colors.color !== undefined ? "color: ".concat(colors.color, ";") : ';', colors.background !== undefined ? text : ';');
    }
    return ';';
};
var preStyles = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-family: 'IBM VGA 9x16', monospace !important;\n    font-size: 18px !important;\n    line-height: 18px !important;\n    outline: none !important;\n    margin: 0 !important;\n    white-space: pre-wrap !important;\n    word-wrap: break-word !important;\n    border: 0 !important;\n    background-color: transparent !important;\n    border-radius: 0 !important;\n    padding: 0 !important;\n"], ["\n    font-family: 'IBM VGA 9x16', monospace !important;\n    font-size: 18px !important;\n    line-height: 18px !important;\n    outline: none !important;\n    margin: 0 !important;\n    white-space: pre-wrap !important;\n    word-wrap: break-word !important;\n    border: 0 !important;\n    background-color: transparent !important;\n    border-radius: 0 !important;\n    padding: 0 !important;\n"])));
var flash = keyframes(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    50% {\n        opacity: 1;\n    }\n"], ["\n    50% {\n        opacity: 1;\n    }\n"])));
var blink = keyframes(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    50% {\n    border-color: transparent;\n    }\n"], ["\n    50% {\n    border-color: transparent;\n    }\n"])));
var ScreenContainer = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    height: 100%;\n    width: 100%;\n    margin: 0;\n    padding: 0;\n    overflow-x: hidden;\n    overflow-y: auto;\n    text-align: left;\n    padding-bottom: 1px;\n    ", "\n    ", ";\n    a {\n        color: ", ";\n        background-color: ", ";\n    }\n"], ["\n    height: 100%;\n    width: 100%;\n    margin: 0;\n    padding: 0;\n    overflow-x: hidden;\n    overflow-y: auto;\n    text-align: left;\n    padding-bottom: 1px;\n    ", "\n    ", ";\n    a {\n        color: ", ";\n        background-color: ", ";\n    }\n"])), function (props) {
    return props.oldEffect
        ? css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n                  text-shadow: 7px 0px 20px #808080a8;\n              "], ["\n                  text-shadow: 7px 0px 20px #808080a8;\n              "]))) : '';
}, function (props) { return getColorsCSS(props.colors, props.oldEffect); }, function (props) { return props.colors.background; }, function (props) { return props.colors.color; });
var ScreenContent = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    width: 134%;\n    height: 100%;\n    word-break: break-all;\n    font-family: 'IBM VGA 9x16', monospace !important;\n    font-size: 18px !important;\n    line-height: 18px !important;\n    transform: scaleX(0.75);\n    position: relative;\n    left: -16.7%;\n"], ["\n    width: 134%;\n    height: 100%;\n    word-break: break-all;\n    font-family: 'IBM VGA 9x16', monospace !important;\n    font-size: 18px !important;\n    line-height: 18px !important;\n    transform: scaleX(0.75);\n    position: relative;\n    left: -16.7%;\n"])));
var CommandScreenContainer = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    height: ", ";\n    ", "\n"], ["\n    height: ", ";\n    ", "\n"])), function (props) { return (props.fullscreen ? '100%' : 'auto'); }, function (props) { return getColorsCSS(props.colors, props.oldEffect); });
var CommandScreenContent = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject([""], [""])));
var OutputContainer = styled.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    outline: none;\n    margin: 0;\n    ", "\n"], ["\n    outline: none;\n    margin: 0;\n    ", "\n"])), function (props) { return getColorsCSS(props.colors); });
var OutputContent = styled.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    padding: 4px 8px 0 8px;\n"], ["\n    padding: 4px 8px 0 8px;\n"])));
var PrintContainer = styled.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n    ", "\n    ", "\n"], ["\n    ", "\n    ", "\n"])), function (props) {
    return props.flashing
        ? css(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n                  animation: ", " 1.5s infinite;\n                  opacity: 0;\n              "], ["\n                  animation: ", " 1.5s infinite;\n                  opacity: 0;\n              "])), flash) : "";
}, function (props) { return getColorsCSS(props.colors); });
var PrintContent = styled.div(templateObject_14 || (templateObject_14 = __makeTemplateObject([""], [""])));
var PrintLine = styled.pre(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n    ", "\n"], ["\n    ", "\n"])), preStyles);
var InputContainer = styled.span(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n    padding-left: 8px;\n    outline: none;\n    margin: 0;\n    display: inline-block;\n\n    ", "\n\n    pre {\n        display: inline;\n        ", "\n    }\n"], ["\n    padding-left: 8px;\n    outline: none;\n    margin: 0;\n    display: inline-block;\n\n    ", "\n\n    pre {\n        display: inline;\n        ", "\n    }\n"])), function (props) { return getColorsCSS(props.colors); }, preStyles);
var InputContent = styled.div(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n    display: inline;\n    outline: none;\n    visibility: visible;\n    caret-color: transparent;\n    outline: none;\n    margin: 0;\n    padding-left: 8px;\n\n    ::selection {\n        color: black;\n        background: gray;\n    }\n"], ["\n    display: inline;\n    outline: none;\n    visibility: visible;\n    caret-color: transparent;\n    outline: none;\n    margin: 0;\n    padding-left: 8px;\n\n    ::selection {\n        color: black;\n        background: gray;\n    }\n"])));
var InputCaret = styled.span(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n    border-bottom: 2px solid;\n    animation: ", " 1s step-end infinite;\n    position: relative;\n    top: -3px;\n    display: inline-block;\n    line-height: 16px;\n    left: ", "ch;\n    ", "\n"], ["\n    border-bottom: 2px solid;\n    animation: ", " 1s step-end infinite;\n    position: relative;\n    top: -3px;\n    display: inline-block;\n    line-height: 16px;\n    left: ", "ch;\n    ", "\n"])), blink, function (props) { return props.positionCorrection; }, function (props) { return getColorsCSS(props.colors); });
var templateObject_1$1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18;

var Caret = function (_a) {
    var correction = _a.correction, colors = _a.colors;
    return (jsx(InputCaret, __assign({ positionCorrection: correction, colors: colors }, { children: "\u00A0" }), void 0));
};
var Input = forwardRef(function (_a, ref) {
    var onClick = _a.onClick, onInput = _a.onInput, onKeyDown = _a.onKeyDown, onKeyPress = _a.onKeyPress, onKeyUp = _a.onKeyUp, id = _a.id, _b = _a.prompt, prompt = _b === void 0 ? '' : _b, colors = _a.colors, caretColors = _a.caretColors, rest = __rest(_a, ["onClick", "onInput", "onKeyDown", "onKeyPress", "onKeyUp", "id", "prompt", "colors", "caretColors"]);
    var _c = useState(false), isCaretLoaded = _c[0], setIsCaretLoaded = _c[1];
    var caretHandler = useCaretHandler();
    useEffect(function () {
        if (!isCaretLoaded) {
            var el = document.getElementById(id);
            if (el)
                caretHandler.setInputRef(el);
            setIsCaretLoaded(function (prev) { return !prev; });
        }
    }, [isCaretLoaded, id, caretHandler]);
    var handleKeyUp = function (e) {
        if (onKeyUp)
            onKeyUp(e);
        caretHandler.updateCaretPosition();
    };
    var handleInput = function (e) {
        if (onInput)
            onInput(e);
        caretHandler.updateCaretPosition();
    };
    var handleKeyDown = function (e) {
        if (onKeyDown)
            onKeyDown(e);
        caretHandler.updateCaretPosition();
    };
    var handleKeyPress = function (e) {
        if (onKeyPress)
            onKeyPress(e);
        caretHandler.updateCaretPosition();
    };
    var handleClick = function (e) {
        if (onClick)
            onClick(e);
        caretHandler.updateCaretPosition();
    };
    return (jsxs(InputContainer, __assign({}, rest, { colors: colors }, { children: [jsx("pre", { children: prompt }, void 0), jsx(InputContent, { ref: ref, id: id, contentEditable: "true", onClick: handleClick, onInput: handleInput, onKeyUp: handleKeyUp, onKeyDown: handleKeyDown, onKeyPress: handleKeyPress, autoCorrect: "off", autoCapitalize: "none", spellCheck: false, inputMode: "text" }, void 0), jsx(Caret, { correction: caretHandler.caretCorrection, colors: caretColors }, void 0)] }), void 0));
});

var Output = function (_a) {
    var children = _a.children, colors = _a.colors, rest = __rest(_a, ["children", "colors"]);
    return (jsx(OutputContainer, __assign({ colors: colors }, rest, { children: jsx(OutputContent, { children: children }, void 0) }), void 0));
};
var Print = function (_a) {
    var output = _a.output, _b = _a.flashing, flashing = _b === void 0 ? false : _b, colors = _a.colors, rest = __rest(_a, ["output", "flashing", "colors"]);
    var divRef = useRef(null);
    return (jsxs(PrintContainer, __assign({}, rest, { colors: colors, flashing: flashing, ref: divRef }, { children: [typeof output === 'object' &&
                output.length > 0 &&
                output.map(function (line, index) {
                    return (jsx(PrintContent, { children: line !== '' ? (jsx(PrintLine, { dangerouslySetInnerHTML: {
                                __html: purify.sanitize(line),
                            } }, void 0)) : (jsx("br", {}, void 0)) }, "".concat(index, "|").concat(line)));
                }), typeof output === 'string' && output.length > 0 && (jsx(PrintContent, { children: output !== '' ? (jsx(PrintLine, { dangerouslySetInnerHTML: {
                        __html: purify.sanitize(output),
                    } }, void 0)) : (jsx("br", {}, void 0)) }, void 0))] }), void 0));
};
var PrintWithTypewriter = function (_a) {
    var output = _a.output, typewriter = _a.typewriter, _b = _a.flashing, flashing = _b === void 0 ? false : _b, colors = _a.colors, rest = __rest(_a, ["output", "typewriter", "flashing", "colors"]);
    var terminal = useTerminal();
    var userHasInteracted = terminal.userHasInteracted;
    var divRef = useRef(null);
    var _c = useState([]), lastOutput = _c[0], setLastOutput = _c[1];
    var endRef = useRef(null);
    var handleTypewrite = useCallback(function (text, el) { return __awaiter(void 0, void 0, void 0, function () {
        var elem, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    elem = el;
                    return [4, new Promise(function (resolve) {
                            var word = text ? text.split('') : [];
                            var id;
                            var type = function () {
                                var _a, _b;
                                if (word.length > 0) {
                                    if (el.textContent) {
                                        elem.textContent += (_a = word.shift()) !== null && _a !== void 0 ? _a : '';
                                    }
                                    else {
                                        elem.textContent = (_b = word.shift()) !== null && _b !== void 0 ? _b : '';
                                    }
                                }
                                if (word.length === 0) {
                                    clearInterval(id);
                                    resolve(true);
                                }
                            };
                            id = setInterval(type, typewriter.typeInterval);
                            if (!text) {
                                clearInterval(id);
                                resolve(true);
                            }
                        })];
                case 1:
                    resp = _a.sent();
                    return [2, resp];
            }
        });
    }); }, [typewriter]);
    useEffect(function () {
        var typewrite = function (children) { return __awaiter(void 0, void 0, void 0, function () {
            var chdren, text, i, j, el;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        chdren = children;
                        text = [];
                        for (i = 0; i < children.length; i += 1) {
                            text.push((_a = children[i].children[0].textContent) !== null && _a !== void 0 ? _a : '');
                            chdren[i].children[0].textContent = '';
                        }
                        j = 0;
                        _b.label = 1;
                    case 1:
                        if (!(j < children.length)) return [3, 4];
                        el = children[j].children[0];
                        return [4, handleTypewrite(text[j], el).then()];
                    case 2:
                        _b.sent();
                        if (userHasInteracted && endRef.current) {
                            endRef.current.scrollIntoView({ block: 'nearest' });
                        }
                        if (j === children.length - 1 && typewriter.isTypewriting) {
                            typewriter.endTypewriting();
                        }
                        _b.label = 3;
                    case 3:
                        j += 1;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        }); };
        if (divRef.current &&
            typewriter.isTypewriting &&
            !_.isEqual(output, lastOutput) &&
            output.length > 0) {
            var children = divRef.current.children;
            typewrite(children);
            setLastOutput(output);
        }
        if (!typewriter.isTypewriting && lastOutput.length !== 0) {
            setLastOutput([]);
        }
    }, [
        lastOutput,
        handleTypewrite,
        output,
        divRef,
        typewriter,
        userHasInteracted,
    ]);
    return (jsxs(Fragment, { children: [jsxs(PrintContainer, __assign({}, rest, { colors: colors, flashing: flashing, ref: divRef }, { children: [typeof output === 'object' &&
                        output.length > 0 &&
                        output.map(function (line, index) {
                            return (jsx(PrintContent, { children: line !== '' ? (jsx(PrintLine, { dangerouslySetInnerHTML: {
                                        __html: purify.sanitize(line),
                                    } }, void 0)) : (jsx("br", {}, void 0)) }, "".concat(index, "|").concat(line)));
                        }), typeof output === 'string' && output.length > 0 && (jsx(PrintContent, { children: output !== '' ? (jsx(PrintLine, { dangerouslySetInnerHTML: {
                                __html: purify.sanitize(output),
                            } }, void 0)) : (jsx("br", {}, void 0)) }, void 0))] }), void 0), jsx("div", { ref: endRef }, void 0)] }, void 0));
};
var Typewriter = function (_a) {
    var output = _a.output, _b = _a.flashing, flashing = _b === void 0 ? false : _b, colors = _a.colors, rest = __rest(_a, ["output", "flashing", "colors"]);
    return (jsxs(Fragment, { children: [jsx(Output.Print, __assign({ output: output.output }, rest, { colors: colors, flashing: flashing }), void 0), jsx(PrintWithTypewriter, __assign({ typewriter: output.typewriter, output: output.currentOutputting }, rest, { colors: colors, flashing: flashing }), void 0)] }, void 0));
};
Output.Typewriter = Typewriter;
Output.Print = Print;

var CommandContext = createContext(undefined);
var CommandContextProvider = function (_a) {
    var children = _a.children, config = _a.config;
    var terminalCommandInitialState = {
        allCommands: config === null || config === void 0 ? void 0 : config.allCommands,
        shouldAllowHelp: config === null || config === void 0 ? void 0 : config.shouldAllowHelp,
        actualCmd: null,
        isRunningCommand: false,
        messages: config.messages,
    };
    var reducer = function (state, action) {
        switch (action.type) {
            case 'isRunningCommand':
                return __assign(__assign({}, state), { isRunningCommand: action.value });
            case 'setActualCmd':
                return __assign(__assign({}, state), { actualCmd: action.value });
            default:
                return state;
        }
    };
    var _b = useReducer(reducer, terminalCommandInitialState), state = _b[0], dispatch = _b[1];
    var cm = useMemo(function () {
        return __assign(__assign({}, state), { startRunningCommand: function () {
                dispatch({ type: 'isRunningCommand', value: true });
            }, endRunningCommand: function () {
                dispatch({ type: 'isRunningCommand', value: false });
            }, setActualCmd: function (cmd) {
                dispatch({ type: 'setActualCmd', value: cmd });
            } });
    }, [state]);
    return (jsx(CommandContext.Provider, __assign({ value: cm }, { children: children }), void 0));
};
var useCommand = function () {
    var ctx = useContext(CommandContext);
    if (ctx === undefined) {
        throw new Error("useCommand must be used within a CommandContextProvider.");
    }
    return ctx;
};

var useInput = function () {
    var ref = createRef();
    var getText = function () {
        var text = '';
        if (ref.current) {
            text = ref.current.textContent ? ref.current.textContent : '';
        }
        return text.trim();
    };
    var setText = function (text) {
        if (ref.current) {
            ref.current.textContent = text;
        }
    };
    var setFocus = function () {
        if (ref.current) {
            ref.current.focus();
        }
    };
    return {
        ref: ref,
        getText: getText,
        setText: setText,
        setFocus: setFocus,
    };
};

var CommandScreen = function (_a) {
    var children = _a.children, colors = _a.colors, oldEffect = _a.oldEffect, _b = _a.fullscreen, fullscreen = _b === void 0 ? false : _b, rest = __rest(_a, ["children", "colors", "oldEffect", "fullscreen"]);
    var terminal = useTerminal();
    return (jsx(CommandScreenContainer, __assign({}, rest, { colors: colors !== null && colors !== void 0 ? colors : terminal.colors, oldEffect: oldEffect !== null && oldEffect !== void 0 ? oldEffect : terminal.showOldScreenEffect, fullscreen: fullscreen }, { children: jsx(CommandScreenContent, { children: children }, void 0) }), void 0));
};

var TestDynamicOutput = function (_a) {
    var name = _a.name, args = _a.args;
    var terminal = useTerminal();
    var command = useCommand();
    var input = useInput();
    var _b = useState(''), internalOutput = _b[0], setInternalOutput = _b[1];
    var handleKeyDown = function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            var text = input.getText();
            var toOutput = [
                '',
                "Hello, ".concat(text === '' ? 'Unkown Person' : text, "!"),
                '',
                "Finishing command ".concat(name, " ").concat(args, "..."),
                '',
            ];
            var linesToRemove = args === 'with-output' ? 2 : 4;
            terminal.output.addToQueue([
                args === 'with-output'
                    ? { action: 'clear' }
                    : { action: 'remove', value: linesToRemove },
                { action: 'add', value: toOutput },
            ]);
            command.endRunningCommand();
        }
    };
    var handleInput = function () {
        setInternalOutput(input.getText());
    };
    var colors = {
        background: colorsHelper.getColorByName('red'),
        color: colorsHelper.getColorByName('brightwhite'),
    };
    return (jsxs(CommandScreen, __assign({ colors: colors, fullscreen: !!(args === 'with-output' && command.isRunningCommand) }, { children: [args === 'with-output' && command.isRunningCommand && (jsx(Output, __assign({ style: { height: '95%' } }, { children: jsx(Output.Print, { output: [
                        "just testing... Type your name: ".concat(internalOutput, " "),
                    ] }, void 0) }), void 0)), jsx(Input, { onInput: handleInput, onKeyDown: function (e) {
                    return handleKeyDown(e);
                }, id: "dynamic_input", ref: input.ref, prompt: ">>>" }, void 0)] }), void 0));
};
var testDynamic = function (_a) {
    var name = _a.name, args = _a.args;
    var terminalOutput = [
        "Now running command: ".concat(name, "."),
        '',
        "Please enter your name:",
    ];
    if (args !== 'with-output' && args !== '') {
        terminalOutput.push("Error: Unknown argument ".concat(args));
    }
    terminalOutput.push('');
    return {
        output: [
            {
                action: 'add',
                value: args === 'with-output' ? '' : terminalOutput,
            },
        ],
        dynamic: {
            element: jsx(TestDynamicOutput, { name: name, args: args }, void 0),
            options: {
                shouldHideTerminalOutput: args === 'with-output',
            },
        },
    };
};

var testStatic = function (_a) {
    var name = _a.name, args = _a.args;
    return {
        output: [
            {
                action: 'add',
                value: [
                    "Testing command: ".concat(name),
                    '',
                    args ? "Error: this command doesn't have arguments." : '',
                    '',
                ],
            },
        ],
    };
};

var help$2 = [
    'The TYPE command displays the contents of a text file. However, it does not allow you to edit the file, or add new text.',
    '',
    'The TYPE command has no options.',
    '',
    'TYPE [filename]',
    '',
    'Filename is the name of the file to show.',
    '',
];
var run$2 = function (_a) {
    var args = _a.args, actualDir = _a.actualDir, files = _a.files;
    if (!args) {
        return {
            output: [
                {
                    action: 'add',
                    value: __spreadArray([
                        "Error: TYPE command requires an argument.",
                        ''
                    ], help$2, true),
                },
            ],
        };
    }
    var file = fileSystemHelper.getFile(files, args, [actualDir], true);
    if (!file) {
        return {
            output: [
                { action: 'add', value: ["File ".concat(args, " doesn't exists."), ''] },
            ],
        };
    }
    var fileType = split(file.type, '/');
    if (fileType[0] !== 'text') {
        return {
            output: [
                {
                    action: 'add',
                    value: [
                        '',
                        "MZ\u00C9\u2665\u2666  \u00A9@\u00D3\u266B\u25BC\u2551\u266B\u2524 \u2550!\u00A9\u263AL\u2550!.",
                        "$\u2663\u00B7\u221FA\u00F8r\u00DDA\u00F8r\u00DDA\u00F8r\u00DDU\u00ADw\u00FD@\u00F8r\u00DDU\u00ADq\u00FDC\u00F8r\u00DDU\u00ADv\u00FDP\u00F8r\u00DDA\u00F8s\u00DDb\u00F8r\u00DDU\u00ADs\u00FDF\u00F8r\u00DDU\u00ADz\u00FDC\u00F8r\u00DDU\u00AD\u00EC\u00DD@\u00F8r\u00DDU\u00ADp\u00FD@\u00F8r\u00DDRichA\u00F8r\u00DDPEd\u00E5\u2660M\u00DD(\u00AD\"\u2642\u263B\u266B\u00B6$0\u00B6\u25BA@\u263A\u25BA\u263B",
                        '',
                        '',
                        "@\u2560' \u2514\"T\u25BA \u2191\u263A(!\u25BA\u263A.text\u00D3   \u25BA",
                        "\u2666 '.rdata\u2560",
                        "\u266B@@.datax\u26600\u263B\u2191@\u2514.pdata\u2560@\u263B,",
                        '',
                        '',
                    ],
                },
            ],
        };
    }
    if (typeof file.content === 'string') {
        return { output: [{ action: 'add', value: ['', file.content, ''] }] };
    }
    var cont = file.content;
    return { output: [{ action: 'add', value: __spreadArray(__spreadArray([''], cont, true), [''], false) }] };
};
var type = { run: run$2, help: help$2 };

var help$1 = ['The VER command displays the version of react-dos-terminal.'];
var run$1 = function (_a) {
    var args = _a.args;
    if (args !== '') {
        return {
            output: [
                {
                    action: 'add',
                    value: __spreadArray([
                        "Error: VER command doesn't have arguments.",
                        ''
                    ], help$1, true),
                },
            ],
        };
    }
    var version = '0.1.5 - February 21, 2022 09:25:34';
    return {
        output: [
            {
                action: 'add',
                value: ['', "react-dos-terminal", "version: ".concat(version), ''],
            },
        ],
    };
};
var ver = { run: run$1, help: help$1 };

var help = [
    'The PROMPT command allows you to adjust how much information is shown in command prompt, including displaying any text you want, such as the name of the current directory, the time and date.',
    '',
    "PROMPT [text]",
    '',
    '[text] specifies a new command prompt that can be made up of normal characters and the below special codes. If not specified, this command resets the command prompt to the default setting, which is the current drive letter and directory followed by the greater than symbol (>).',
    '',
    "Character       Description",
    '   Sp              Current full path',
    '   $q              = (equal sign)',
    '   $g              > (greater than sign)',
    '   $l              < (less than sign)',
    '   $n              Current drive',
    '   $b              | (pipe symbol)',
    '   $$              $ (dollar sign)',
    '   $_              ENTER-LINEFEED',
    '   $a              & (ampersand)',
    "   $c              ( (left parenthesis)",
    "   $f              ) (rigth parenthesis)",
    "   $s              SPACE",
    "   $t              current TIME",
    "   $d              current DATE",
    '',
];
var run = function (_a) {
    var args = _a.args;
    if (!args) {
        return {
            output: [
                { action: 'add', value: ['Prompt changed successfully.', ''] },
            ],
            configTerminal: { config: 'setPrompt', value: '' },
        };
    }
    return {
        output: [
            { action: 'add', value: ['Prompt changed successfully.', ''] },
        ],
        configTerminal: { config: 'setPrompt', value: args },
    };
};
var prompt = { run: run, help: help };

var commandsList = [
    {
        name: 'cls',
        alias: ['clear'],
        action: cls.run,
        help: cls.help,
    },
    {
        name: 'ver',
        action: ver.run,
        help: ver.help,
    },
    {
        name: 'color',
        action: color.run,
        help: color.help,
    },
    {
        name: 'prompt',
        action: prompt.run,
        help: prompt.help,
    },
    {
        name: '😎',
        action: hidden,
    },
];
var devCommands = [
    {
        name: 'test-static',
        alias: ['static'],
        action: testStatic,
    },
    {
        name: 'test-dynamic',
        alias: ['dynamic'],
        action: testDynamic,
    },
    {
        name: 'test-async',
        alias: ['async'],
        action: testAsync.run,
        async: { waitingMessage: testAsync.waitingMessage },
    },
];
var immutableCommands = [
    {
        name: 'react-dos-terminal',
        action: reactDosTerminal.run,
    },
];
var fileSystemCommands = [
    {
        name: 'type',
        action: type.run,
        help: type.help,
    },
    {
        name: 'dir',
        alias: ['ls'],
        action: dir.run,
        help: dir.help,
    },
    {
        name: 'cd',
        alias: ['cd..', 'cd\\', 'chdir', 'chdir..', 'chdir\\'],
        action: cd.run,
        help: cd.help,
    },
    {
        name: 'edit',
        action: commandsHelper.toBeImplemented.action,
    },
];
var fileSystemSubstituteCommands = [
    {
        name: 'help',
        alias: ['/?'],
        action: help$4,
    },
];

var createCommands = function (internal, external) {
    if (!external) {
        return internal;
    }
    var internalCommands = internal.reduce(function (acc, intCmd) {
        var equalCmd = external.filter(function (extCmd) { return intCmd.name === extCmd.name; });
        if (equalCmd.length > 0) {
            acc.push(__assign(__assign({}, intCmd), equalCmd[0]));
        }
        else {
            acc.push(intCmd);
        }
        return acc;
    }, []);
    var uniqueExternalCommands = external.reduce(function (acc, cmd) {
        var found = internalCommands.filter(function (c) {
            return _.isEqual(cmd.name, c.name);
        });
        if (!found[0])
            acc.push(cmd);
        return acc;
    }, []);
    return __spreadArray(__spreadArray([], internalCommands, true), uniqueExternalCommands, true);
};
var excludeCommands = function (commands, toExclude) {
    if (!toExclude || toExclude.length === 0) {
        return commands;
    }
    if (toExclude === 'all') {
        return [];
    }
    var finalCommands = commands.filter(function (command) { return !toExclude.includes(command.name); });
    return finalCommands;
};
var renameEqualFiles = function (contentA, contentB) {
    var finalContent = __spreadArray([], contentA, true);
    contentB.forEach(function (file) {
        if (file.type !== 'directory') {
            var found = contentA.filter(function (fileA) { return fileA.name === file.name; });
            if (found[0]) {
                var re = /(.+?)(\.[^.]*$|$)/;
                var match = file.name.match(re);
                if (match && match[1] && match[2]) {
                    finalContent.push({
                        name: "".concat(match[1], "(1)").concat(match[2]),
                        type: file.type,
                        attributes: file.attributes,
                        content: file.content,
                    });
                }
            }
            else {
                finalContent.push(file);
            }
        }
    });
    return finalContent;
};
var mainAttrib = function (a, b) {
    if (a.attributes[0] === 's' || b.attributes[0] === 's') {
        return 's';
    }
    if (a.attributes[0] === 'r' || b.attributes[0] === 'r') {
        return 'r';
    }
    return 'w';
};
var hiddenAttrib = function (a, b) {
    if (a.attributes[1] === 'h' || b.attributes[1] === 'h') {
        return 'h';
    }
    return '';
};
var getMergedDir = function (a, b) {
    var contentA = a.content;
    var contentB = b.content;
    return {
        name: a.name,
        type: 'directory',
        content: mergeEqualDirs(contentA, contentB),
        attributes: (mainAttrib(a, b) + hiddenAttrib(a, b)),
    };
};
var mergeEqualDirs = function (a, b) {
    var dirsA = a.filter(function (item) { return item.type === 'directory'; });
    var mergedDirs = [];
    dirsA.forEach(function (dirA) {
        var dirB = b.filter(function (item) { return item.type === 'directory' && item.name === dirA.name; });
        if (dirB[0]) {
            var mergedDir = getMergedDir(dirA, dirB[0]);
            var contentA = dirA.content;
            var contentB = dirB[0].content;
            var finalContent = renameEqualFiles(contentA, contentB);
            mergedDir.content = __spreadArray([], finalContent, true);
            mergedDirs.push(mergedDir);
        }
    });
    return mergedDirs;
};
var calcSize = function (file) {
    var _a;
    var filesize = (_a = file.size) !== null && _a !== void 0 ? _a : 0;
    filesize += (file.name.length + 3) * 2;
    if (file.type === 'application/executable' ||
        file.type === 'application/system') {
        var x = file.content;
        filesize += fileSystemHelper.getCommandsSize([x]);
    }
    else if (file.type.includes('text/')) {
        filesize += JSON.stringify(file.content).length * 2;
    }
    else {
        var content = file.content;
        var final = content.map(function (f) {
            return __assign(__assign({}, f), { size: calcSize(f) });
        });
        var finalS = final.reduce(function (acc, f) {
            return acc + f.size;
        }, 0);
        filesize += finalS !== null && finalS !== void 0 ? finalS : 0;
    }
    return filesize;
};
var getFilesWithSize = function (files) {
    var finalFiles = files.map(function (file) {
        if (file.type !== 'directory') {
            return __assign(__assign({}, file), { size: calcSize(file) });
        }
        var dir = file.content;
        var newContent = getFilesWithSize(dir);
        return __assign(__assign({}, file), { content: newContent, size: calcSize(file) });
    });
    return finalFiles;
};
var createFakeFileSystem = function (internal, external) {
    if (!internal) {
        return { files: [], totalSize: 0 };
    }
    if (!external) {
        var files_1 = getFilesWithSize(internal);
        var totalSize_1 = internal.reduce(function (acc, file) { var _a; return acc + ((_a = file.size) !== null && _a !== void 0 ? _a : 0); }, 0);
        return { files: files_1, totalSize: totalSize_1 };
    }
    var mergedDirs = mergeEqualDirs(internal, external);
    var content = renameEqualFiles(internal, external);
    var test = content.map(function (file) {
        var equalD = mergedDirs.find(function (dir) { return dir.name === file.name; });
        if (equalD && !_.isEmpty(equalD)) {
            return equalD;
        }
        return file;
    });
    external.forEach(function (file) {
        var equalExt = test.find(function (f) { return f.name === file.name; });
        if (!equalExt || _.isEmpty(equalExt)) {
            test.push(file);
        }
    });
    var files = getFilesWithSize(test);
    var totalSize = files.reduce(function (acc, file) { var _a; return acc + ((_a = file.size) !== null && _a !== void 0 ? _a : 0); }, 0);
    return { files: files, totalSize: totalSize };
};
var initializer = {
    createFakeFileSystem: createFakeFileSystem,
    createCommands: createCommands,
    excludeCommands: excludeCommands,
};

var useCommandsHistory = function (_a) {
    var input = _a.input;
    var caretHandler = useCaretHandler();
    useEffect(function () {
        if (input.current) {
            caretHandler.setInputRef(input.current);
        }
    }, [input, caretHandler]);
    var _b = useState([]), cmdsHistoryList = _b[0], setCmdHistoryList = _b[1];
    var _c = useState(cmdsHistoryList.length), actualCmd = _c[0], setActualCmd = _c[1];
    var add = function (cmd) {
        if (cmd.trim() !== '' &&
            cmd.trim() !== cmdsHistoryList[cmdsHistoryList.length - 1]) {
            setCmdHistoryList(__spreadArray(__spreadArray([], cmdsHistoryList, true), [cmd.trim()], false));
            setActualCmd(cmdsHistoryList.length + 1);
        }
        else {
            setActualCmd(cmdsHistoryList.length);
        }
    };
    var up = function () {
        var _a;
        if (actualCmd === 0) {
            caretHandler.input.textContent = cmdsHistoryList[0];
            caretHandler.setPosition(0);
            return cmdsHistoryList[0];
        }
        var cmd = (_a = cmdsHistoryList[actualCmd - 1]) !== null && _a !== void 0 ? _a : '';
        caretHandler.input.textContent = cmd;
        caretHandler.setPosition(cmd.length);
        setActualCmd(function (prev) { return prev - 1; });
        return cmd;
    };
    var down = function () {
        var _a;
        if (actualCmd === cmdsHistoryList.length) {
            caretHandler.input.textContent = '';
            caretHandler.setPosition(0);
            return '';
        }
        var cmd = (_a = cmdsHistoryList[actualCmd + 1]) !== null && _a !== void 0 ? _a : '';
        caretHandler.input.textContent = cmd;
        caretHandler.setPosition(cmd.length);
        setActualCmd(function (prev) { return prev + 1; });
        return cmd;
    };
    return {
        add: add,
        up: up,
        down: down,
        length: actualCmd,
    };
};

var TerminalScreen = function (_a) {
    var children = _a.children, colors = _a.colors, oldEffect = _a.oldEffect, rest = __rest(_a, ["children", "colors", "oldEffect"]);
    var terminal = useTerminal();
    var autoFocus = terminal.autoFocus;
    var _b = useState(false), gotFocus = _b[0], setGotFocus = _b[1];
    var endRef = useRef(null);
    useEffect(function () {
        if (!gotFocus && autoFocus && endRef.current) {
            endRef.current.scrollIntoView({ block: 'start' });
            window.scrollBy(0, -8);
            setGotFocus(true);
        }
    });
    return (jsxs(Fragment, { children: [jsx("div", { ref: endRef }, void 0), jsx(ScreenContainer, __assign({ colors: colors !== null && colors !== void 0 ? colors : terminal.colors, oldEffect: oldEffect !== null && oldEffect !== void 0 ? oldEffect : terminal.showOldScreenEffect }, { children: jsx(ScreenContent, __assign({}, rest, { children: children }), void 0) }), void 0)] }, void 0));
};

var FileSystemContext = createContext(undefined);
var FileSystemContextProvider = function (_a) {
    var children = _a.children, config = _a.config;
    var ls = useLocalStorage();
    var fileSystemInitialState = {
        actualDir: config.actualDir,
        files: config.files,
        totalSize: config.totalSize,
        systemPaths: config.systemPaths,
    };
    var reducer = function (state, action) {
        switch (action.type) {
            case 'setActualDir':
                ls.set('actualDir', action.value);
                return __assign(__assign({}, state), { actualDir: action.value });
            case 'setFiles':
                return __assign(__assign({}, state), { allFiles: action.value });
            default:
                return state;
        }
    };
    var _b = useReducer(reducer, fileSystemInitialState), state = _b[0], dispatch = _b[1];
    var fs = useMemo(function () {
        return __assign(__assign({}, state), { setFiles: function (files) {
                dispatch({ type: 'setFiles', value: files });
            }, setActualDir: function (value) {
                dispatch({ type: 'setActualDir', value: value });
            } });
    }, [state]);
    return (jsx(FileSystemContext.Provider, __assign({ value: fs }, { children: children }), void 0));
};
var useFileSystem = function () {
    var ctx = useContext(FileSystemContext);
    if (ctx === undefined) {
        throw new Error("useFileSystem must be used within a FileSystemContextProvider.");
    }
    return ctx;
};

var useCommandsHandler = function (_a) {
    var action = _a.action;
    var terminal = useTerminal();
    var filesystem = useFileSystem();
    var command = useCommand();
    var messages = command.messages, shouldAllowHelp = command.shouldAllowHelp, allCommands = command.allCommands;
    var actualDir = filesystem.actualDir, files = filesystem.files, totalSize = filesystem.totalSize, systemPaths = filesystem.systemPaths;
    var run = function (cmd) { return __awaiter(void 0, void 0, void 0, function () {
        var getNameAndArgs, _a, name, args, isHelp, props, dispatch, runAction, executable, terminalCommand, _b, executableCommand;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    getNameAndArgs = function (c) {
                        var index = c.indexOf(' ');
                        var name = '';
                        var args = '';
                        var isHelp = false;
                        if (index !== -1) {
                            name = c.substring(0, index).trim();
                            args = c.substring(index + 1).trim();
                        }
                        else {
                            name = c.trim();
                        }
                        if (shouldAllowHelp) {
                            var reg = /\/\?/;
                            if (reg.test(name) && name !== '/?') {
                                isHelp = true;
                                name = name.substring(0, name.length - 2);
                            }
                            else if (args === '/?') {
                                isHelp = true;
                            }
                            else if (!reg.test(name) && name === '/?') {
                                isHelp = true;
                            }
                        }
                        return { name: name, args: args, isHelp: isHelp };
                    };
                    _a = getNameAndArgs(cmd.replace(/</g, '&lt;')), name = _a.name, args = _a.args, isHelp = _a.isHelp;
                    terminal.output.addLines("".concat(fileSystemHelper.formatPrompt(terminal.currentPrompt, actualDir), " ").concat(cmd.replace(/</g, '&lt;')), true);
                    if (name === '') {
                        command.setActualCmd(null);
                        return [2];
                    }
                    props = {
                        name: name,
                        args: args,
                        allCommands: allCommands,
                        messages: messages,
                        actualDir: actualDir,
                        files: files,
                        totalSize: totalSize,
                        systemPaths: systemPaths,
                    };
                    dispatch = function (response) {
                        command.setActualCmd(__assign({ name: name, args: args }, response));
                        if (response.configTerminal !== undefined) {
                            if (response.configTerminal.config === 'setColors' ||
                                response.configTerminal.config === 'setPrompt')
                                terminal.setConfig(response.configTerminal);
                            if (response.configTerminal.config === 'setActualDir') {
                                filesystem.setActualDir(response.configTerminal.value);
                            }
                        }
                        if (response.output) {
                            terminal.output.addToQueue(response.output);
                        }
                        command.startRunningCommand();
                        if (response.dynamic) {
                            action('NEW_CMD', 'dynamic');
                            return;
                        }
                        action('NEW_CMD', 'static');
                    };
                    runAction = function (cm) { return __awaiter(void 0, void 0, void 0, function () {
                        var isAsync, waitingMessage, response, response;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    isAsync = cm === null || cm === void 0 ? void 0 : cm.async;
                                    waitingMessage = (_a = cm === null || cm === void 0 ? void 0 : cm.async) === null || _a === void 0 ? void 0 : _a.waitingMessage;
                                    if (isAsync) {
                                        action('NEW_CMD', 'async');
                                    }
                                    if (waitingMessage) {
                                        terminal.output.addLines(waitingMessage);
                                    }
                                    if (!cm.action) return [3, 2];
                                    return [4, cm.action(props)];
                                case 1:
                                    response = _b.sent();
                                    dispatch(response);
                                    return [2];
                                case 2:
                                    if (!commandsHelper.commandNotFound.action) return [3, 4];
                                    return [4, commandsHelper.commandNotFound.action(props)];
                                case 3:
                                    response = _b.sent();
                                    dispatch(response);
                                    _b.label = 4;
                                case 4: return [2];
                            }
                        });
                    }); };
                    executable = function (p) {
                        if (_.isEmpty(p.files)) {
                            return null;
                        }
                        var pathsToSearch = __spreadArray([actualDir], systemPaths, true);
                        var file = fileSystemHelper.getFile(files, p.name, pathsToSearch);
                        if (file) {
                            if (file.type === 'application/executable' ||
                                file.type === 'application/system') {
                                return file.content;
                            }
                            return commandsHelper.cantBeExecuted;
                        }
                        return null;
                    };
                    terminalCommand = allCommands.filter(function (c) {
                        var _a;
                        return c.name.toLowerCase() === name.toLowerCase() ||
                            ((_a = c.alias) === null || _a === void 0 ? void 0 : _a.find(function (a) { return a.toLowerCase() === name.toLowerCase(); }));
                    });
                    if (!isHelp) return [3, 2];
                    _b = dispatch;
                    return [4, help$4(__assign(__assign({}, props), { name: 'help', args: name }))];
                case 1:
                    _b.apply(void 0, [_c.sent()]);
                    return [2];
                case 2:
                    if (terminalCommand[0]) {
                        runAction(terminalCommand[0]);
                    }
                    else {
                        executableCommand = executable(props);
                        if (executableCommand) {
                            runAction(executableCommand);
                        }
                        else {
                            runAction(commandsHelper.commandNotFound);
                        }
                    }
                    return [2];
            }
        });
    }); };
    return {
        run: run,
    };
};

var useStateMachine = function (machine) {
    var _a = useState(machine.initialState), state = _a[0], setState = _a[1];
    var dispatchAction = useCallback(function (action, arg) {
        var Action = machine.states[state].actions[action];
        if (Action) {
            if (Action.newState)
                setState(Action.newState);
            if (Action.onTransition)
                Action.onTransition(arg);
        }
        else {
            throw new Error("Invalid action \"".concat(action, "\" for state \"").concat(state, "\""));
        }
    }, [state]);
    useEffect(function () {
        if (machine.initialEffect)
            machine.initialEffect();
    }, []);
    useEffect(function () {
        if (machine.machineEffect)
            machine.machineEffect();
    }, machine.machineEffectDependencies);
    useEffect(function () {
        var Effect = machine.states[state].effect;
        if (Effect)
            Effect();
    }, machine.statesEffectDependencies
        ? __spreadArray(__spreadArray([], machine.statesEffectDependencies, true), [state, machine.states], false) : [state, machine.states]);
    return [state, dispatchAction];
};

var useMainMachine = function () {
    var terminal = useTerminal();
    var command = useCommand();
    var isRunningCommand = command.isRunningCommand, endRunningCommand = command.endRunningCommand, setActualCmd = command.setActualCmd;
    var outputQueue = terminal.output.outputQueue;
    var isTypewriting = terminal.output.typewriter.isTypewriting;
    var _a = useState(''), type = _a[0], setType = _a[1];
    var onFinishCommand = function () {
        endRunningCommand();
        setActualCmd(null);
        setType('');
        action('FINISH_CMD');
    };
    var mainMachine = {
        initialState: 'IDDLE',
        statesEffectDependencies: [
            isRunningCommand,
            isTypewriting,
            outputQueue,
            type,
        ],
        states: {
            IDDLE: {
                actions: {
                    NEW_CMD: {
                        newState: 'RUNNING_COMMAND',
                        onTransition: function (cmdType) {
                            setType(cmdType);
                        },
                    },
                },
            },
            RUNNING_COMMAND: {
                effect: function () {
                    if (!isRunningCommand && type === 'dynamic') {
                        onFinishCommand();
                        return;
                    }
                    if (isRunningCommand &&
                        outputQueue.length === 0 &&
                        !isTypewriting &&
                        type !== 'dynamic' &&
                        type !== '') {
                        onFinishCommand();
                    }
                },
                actions: { FINISH_CMD: { newState: 'IDDLE' } },
            },
        },
    };
    var _b = useStateMachine(mainMachine), state = _b[0], action = _b[1];
    return { state: state, action: action };
};

var UserDefinedElement = function (_a) {
    var element = _a.element;
    return createElement(element.type, __assign({}, element.props), null);
};

var Main = function () {
    var _a;
    var _b = useState(false), hideOutput = _b[0], setHideOutput = _b[1];
    var terminal = useTerminal();
    var filesystem = useFileSystem();
    var actualDir = filesystem.actualDir;
    var command = useCommand();
    var dynamic = (_a = command.actualCmd) === null || _a === void 0 ? void 0 : _a.dynamic;
    var input = useInput();
    var commandsHistory = useCommandsHistory({ input: input.ref });
    var _c = useMainMachine(), state = _c.state, action = _c.action;
    var commandsHandler = useCommandsHandler({ state: state, action: action });
    var handleKeyUp = function (e) {
        if (!terminal.userHasInteracted) {
            terminal.setConfig({ config: 'setUserHasInteracted', value: true });
        }
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                commandsHistory.up();
                return;
            case 'ArrowDown':
                e.preventDefault();
                commandsHistory.down();
                return;
            case 'Enter': {
                var cmd = input.getText();
                e.preventDefault();
                commandsHandler.run(cmd);
                input.setText('');
                commandsHistory.add(cmd);
                break;
            }
        }
    };
    useEffect(function () {
        var _a;
        if (state === 'RUNNING_COMMAND' &&
            ((_a = dynamic === null || dynamic === void 0 ? void 0 : dynamic.options) === null || _a === void 0 ? void 0 : _a.shouldHideTerminalOutput)) {
            setHideOutput(true);
        }
        if (state !== 'RUNNING_COMMAND') {
            setHideOutput(false);
        }
    }, [state, dynamic]);
    return (jsxs(TerminalScreen, __assign({ onClick: function () { return input && input.setFocus(); } }, { children: [!hideOutput && (jsx(Output, { children: jsx(Output.Typewriter, { output: terminal.output }, void 0) }, void 0)), state === 'RUNNING_COMMAND' && dynamic && (jsx(UserDefinedElement, { element: dynamic === null || dynamic === void 0 ? void 0 : dynamic.element }, void 0)), state !== 'RUNNING_COMMAND' &&
                !terminal.output.typewriter.isTypewriting && (jsx(Input, { onKeyUp: handleKeyUp, id: "terminal_input", ref: input.ref, prompt: fileSystemHelper.formatPrompt(terminal.currentPrompt, actualDir) }, void 0))] }), void 0));
};

var useLoadingScreen = function (config) {
    var ls = useLocalStorage();
    var shouldShowLoading = function (loadingScreen, isInstalled) {
        var _a;
        var ss = (_a = loadingScreen.showLoadingScreen) !== null && _a !== void 0 ? _a : 'first-time';
        switch (ss) {
            case 'always':
                return true;
            case 'never':
                return false;
            case 'first-time':
                return isInstalled !== '1';
            default:
                return isInstalled !== '1';
        }
    };
    var isInstalled = ls.get('i');
    var loadingScreen = useMemo(function () {
        return __assign(__assign({}, defaults.loadingScreen), config);
    }, [config]);
    var _a = useState(false), isLoading = _a[0], setIsLoading = _a[1];
    useEffect(function () {
        var finishLoading = function () {
            setIsLoading(false);
        };
        if (!isLoading && shouldShowLoading(loadingScreen, isInstalled)) {
            setIsLoading(true);
            setTimeout(finishLoading, loadingScreen.loadingTime);
        }
    }, []);
    return {
        isLoading: isLoading,
        content: loadingScreen.messageOrElement,
    };
};

var files = [
    {
        name: 'command.com',
        type: 'application/system',
        attributes: 'ph',
        content: commandsHelper.isAlreadyRunning,
        size: fileSystemHelper.getCommandsSize(commandsList) +
            fileSystemHelper.getFakeFileSize([
                useCommandsHandler,
                useCaretHandler,
                useMainMachine,
                CommandContextProvider,
                CommandScreen,
            ]),
    },
    {
        name: 'io.sys',
        type: 'application/system',
        attributes: 'ph',
        content: commandsHelper.cantBeExecuted,
        size: fileSystemHelper.getFakeFileSize([
            Main,
            TerminalScreen,
            TerminalContextProvider,
            useLoadingScreen,
            initializer.createCommands,
            useStateMachine,
        ]),
    },
    {
        name: 'msdos.sys',
        type: 'application/system',
        attributes: 'ph',
        content: commandsHelper.cantBeExecuted,
        size: fileSystemHelper.getFakeFileSize([
            useFileSystem,
            FileSystemContextProvider,
            function () { return fileSystemHelper; },
            initializer.createFakeFileSystem,
            Input,
            Output,
            UserDefinedElement,
            useInput,
            useOutputHandler,
        ]),
    },
    {
        name: 'system',
        type: 'directory',
        attributes: 'p',
        content: [
            {
                name: 'readme.txt',
                type: 'text/plain',
                content: reactDosTerminal.help,
                attributes: 'p',
            },
            {
                name: 'doskey.exe',
                type: 'application/system',
                attributes: 'ph',
                content: commandsHelper.isAlreadyRunning,
                size: fileSystemHelper.getFakeFileSize([
                    useCommandsHistory,
                    useCaretHandler,
                ]),
            },
            {
                name: 'help.com',
                type: 'application/executable',
                attributes: 'p',
                content: {
                    name: 'help',
                    action: help$4,
                },
                size: fileSystemHelper.getFakeFileSize(help$4),
            },
        ],
    },
];

var useInitializer = function (config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    var ls = useLocalStorage();
    var isInstalled = ls.get('i');
    var _v = useState(false), isInitialized = _v[0], setIsInitialized = _v[1];
    var persisteData = (config === null || config === void 0 ? void 0 : config.shouldPersisteUserData) !== undefined
        ? config.shouldPersisteUserData
        : defaults.shouldPersisteUserData;
    var _w = useState(defaults.terminal.colors), finalColors = _w[0], setFinalColors = _w[1];
    var finalOldScreenEffect = ((_a = config === null || config === void 0 ? void 0 : config.terminal) === null || _a === void 0 ? void 0 : _a.showOldScreenEffect) !== undefined
        ? (_b = config === null || config === void 0 ? void 0 : config.terminal) === null || _b === void 0 ? void 0 : _b.showOldScreenEffect
        : defaults.terminal.showOldScreenEffect;
    var finalDefaultPrompt = ((_c = config === null || config === void 0 ? void 0 : config.terminal) === null || _c === void 0 ? void 0 : _c.defaultPrompt) !== undefined
        ? (_d = config === null || config === void 0 ? void 0 : config.terminal) === null || _d === void 0 ? void 0 : _d.defaultPrompt
        : defaults.terminal.defaultPrompt;
    var _x = useState(), finalCurrentPrompt = _x[0], setFinalCurrentPrompt = _x[1];
    var _y = useState(), finalInitialDir = _y[0], setFinalInitialDir = _y[1];
    var initialOutput = ((_e = config === null || config === void 0 ? void 0 : config.terminal) === null || _e === void 0 ? void 0 : _e.initialOutput) !== undefined
        ? (_f = config === null || config === void 0 ? void 0 : config.terminal) === null || _f === void 0 ? void 0 : _f.initialOutput
        : (_g = defaults === null || defaults === void 0 ? void 0 : defaults.terminal) === null || _g === void 0 ? void 0 : _g.initialOutput;
    var finalAutofocus = ((_h = config === null || config === void 0 ? void 0 : config.terminal) === null || _h === void 0 ? void 0 : _h.autoFocus) !== undefined
        ? config.terminal.autoFocus
        : defaults.terminal.autoFocus;
    var finalShouldTypewrite = ((_j = config === null || config === void 0 ? void 0 : config.terminal) === null || _j === void 0 ? void 0 : _j.shouldTypewrite) !== undefined
        ? config.terminal.shouldTypewrite
        : defaults.terminal.shouldTypewrite;
    var finalMessages = __assign(__assign({}, defaults.commands.messages), (_k = config === null || config === void 0 ? void 0 : config.commands) === null || _k === void 0 ? void 0 : _k.messages);
    var finalAllowHelp = ((_l = config === null || config === void 0 ? void 0 : config.commands) === null || _l === void 0 ? void 0 : _l.shouldAllowHelp) !== undefined
        ? config.commands.shouldAllowHelp
        : defaults.commands.shouldAllowHelp;
    var finalExcludeCommands = ((_m = config === null || config === void 0 ? void 0 : config.commands) === null || _m === void 0 ? void 0 : _m.excludeInternalCommands) !== undefined
        ? config.commands.excludeInternalCommands
        : defaults.commands.excludeInternalCommands;
    var finalCommands = useMemo(function () {
        var _a, _b, _c, _d, _e;
        var cmd;
        var intCmd = [];
        if (finalExcludeCommands === 'dev') {
            intCmd = commandsList;
        }
        if (typeof finalExcludeCommands !== 'string') {
            intCmd = commandsList.concat(devCommands);
            intCmd = initializer.excludeCommands(intCmd, finalExcludeCommands);
        }
        if (((_a = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _a === void 0 ? void 0 : _a.useFakeFileSystem) !== false) {
            var fc = intCmd.concat(fileSystemCommands);
            cmd = initializer.createCommands(fc, (_b = config === null || config === void 0 ? void 0 : config.commands) === null || _b === void 0 ? void 0 : _b.customCommands);
        }
        else {
            var fc = intCmd.concat(fileSystemSubstituteCommands);
            cmd = initializer.createCommands(fc, (_c = config === null || config === void 0 ? void 0 : config.commands) === null || _c === void 0 ? void 0 : _c.customCommands);
        }
        if (((_d = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _d === void 0 ? void 0 : _d.excludeInternalFiles) === true) {
            cmd = initializer.createCommands(cmd, fileSystemSubstituteCommands);
        }
        if (!finalAllowHelp) {
            cmd = initializer.excludeCommands(cmd, ['help']);
        }
        cmd = initializer.createCommands(cmd, (_e = config === null || config === void 0 ? void 0 : config.commands) === null || _e === void 0 ? void 0 : _e.customCommands);
        var c = initializer.createCommands(cmd, immutableCommands);
        return c;
    }, [
        (_o = config === null || config === void 0 ? void 0 : config.commands) === null || _o === void 0 ? void 0 : _o.customCommands,
        (_p = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _p === void 0 ? void 0 : _p.useFakeFileSystem,
        (_q = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _q === void 0 ? void 0 : _q.excludeInternalFiles,
        finalAllowHelp,
        finalExcludeCommands,
    ]);
    var finalFiles = useMemo(function () {
        var _a, _b, _c, _d, _e;
        if (((_a = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _a === void 0 ? void 0 : _a.useFakeFileSystem) !== false &&
            ((_b = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _b === void 0 ? void 0 : _b.excludeInternalFiles) !== true) {
            return initializer.createFakeFileSystem(files, (_c = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _c === void 0 ? void 0 : _c.customFiles);
        }
        if (((_d = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _d === void 0 ? void 0 : _d.useFakeFileSystem) !== false &&
            ((_e = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _e === void 0 ? void 0 : _e.excludeInternalFiles) === true &&
            config.fileSystem.customFiles) {
            return initializer.createFakeFileSystem(config.fileSystem.customFiles);
        }
        return initializer.createFakeFileSystem();
    }, [config]);
    var finalSystemPaths = ((_r = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _r === void 0 ? void 0 : _r.systemPaths) !== undefined
        ? config.fileSystem.systemPaths
        : defaults.fileSystem.systemPaths;
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f;
        if (!isInitialized) {
            var col = void 0;
            var actualD = void 0;
            var prompt_1;
            if (isInstalled === null || isInstalled === '0' || !persisteData) {
                col = ((_a = config === null || config === void 0 ? void 0 : config.terminal) === null || _a === void 0 ? void 0 : _a.colors)
                    ? (_b = config === null || config === void 0 ? void 0 : config.terminal) === null || _b === void 0 ? void 0 : _b.colors
                    : defaults.terminal.colors;
                actualD =
                    ((_c = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _c === void 0 ? void 0 : _c.initialDir) !== undefined
                        ? (_d = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _d === void 0 ? void 0 : _d.initialDir
                        : defaults.fileSystem.initialDir;
                prompt_1 =
                    ((_e = config === null || config === void 0 ? void 0 : config.terminal) === null || _e === void 0 ? void 0 : _e.defaultPrompt) !== undefined
                        ? (_f = config === null || config === void 0 ? void 0 : config.terminal) === null || _f === void 0 ? void 0 : _f.defaultPrompt
                        : defaults.terminal.defaultPrompt;
                if (col)
                    ls.set('colors', col);
                ls.set('i', '1');
                ls.set('actualDir', actualD);
                ls.set('prompt', prompt_1);
            }
            else {
                col = ls.get('colors');
                var dir = ls.get('actualDir');
                var promp = ls.get('prompt');
                actualD = typeof dir !== 'string' ? '' : dir;
                prompt_1 = typeof promp !== 'string' ? '' : promp;
            }
            ls.set('oldEffect', finalOldScreenEffect ? '1' : '0');
            setFinalColors(col);
            setFinalInitialDir(actualD);
            setIsInitialized(true);
            setFinalCurrentPrompt(prompt_1);
        }
    }, [
        (_s = config === null || config === void 0 ? void 0 : config.terminal) === null || _s === void 0 ? void 0 : _s.colors,
        (_t = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _t === void 0 ? void 0 : _t.initialDir,
        isInstalled,
        isInitialized,
        persisteData,
        finalOldScreenEffect,
        finalInitialDir,
        (_u = config === null || config === void 0 ? void 0 : config.terminal) === null || _u === void 0 ? void 0 : _u.defaultPrompt,
        ls,
    ]);
    return {
        terminal: {
            colors: finalColors,
            showOldScreenEffect: finalOldScreenEffect,
            autoFocus: finalAutofocus,
            currentPrompt: finalCurrentPrompt,
            defaultPrompt: finalDefaultPrompt,
            initialOutput: initialOutput,
            shouldTypewrite: finalShouldTypewrite,
        },
        commands: {
            allCommands: finalCommands,
            shouldAllowHelp: finalAllowHelp,
            messages: finalMessages,
        },
        isInitialized: isInitialized,
        fileSystem: __assign({ actualDir: finalInitialDir, systemPaths: finalSystemPaths }, finalFiles),
    };
};

var VGA = require('../assets/WebPlus_IBM_VGA_9x16.woff');
var GlobalStyles = createGlobalStyle(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    @font-face {\n        font-family: 'IBM VGA 9x16';\n        src: url(", ") format('woff');\n        font-weight: normal;\n        font-style: normal;\n    }\n"], ["\n    @font-face {\n        font-family: 'IBM VGA 9x16';\n        src: url(", ") format('woff');\n        font-weight: normal;\n        font-style: normal;\n    }\n"])), VGA);
var templateObject_1;

var LoadingScreen = function (_a) {
    var content = _a.content;
    var getContent = function () {
        if (!React.isValidElement(content)) {
            if (typeof content === 'string') {
                return [content];
            }
            return content;
        }
        return [];
    };
    var output = useOutputHandler({
        initialOutput: getContent(),
        shouldTypewrite: true,
    });
    return (jsxs(TerminalScreen, { children: [!React.isValidElement(content) && (jsx(Output, { children: jsx(Output.Typewriter, { output: output, flashing: true }, void 0) }, void 0)), React.isValidElement(content) && (jsx(UserDefinedElement, { element: content }, void 0))] }, void 0));
};
var InitializeTerminal = function (_a) {
    var config = _a.config;
    var initializer = useInitializer(config);
    var loadingScreen = useLoadingScreen(config === null || config === void 0 ? void 0 : config.loadingScreen);
    return (jsx(Fragment, { children: initializer.isInitialized && (jsxs(Fragment, { children: [jsx(GlobalStyles, {}, void 0), jsxs(TerminalContextProvider, __assign({ config: initializer.terminal }, { children: [!loadingScreen.isLoading && (jsx(FileSystemContextProvider, __assign({ config: initializer.fileSystem }, { children: jsx(CommandContextProvider, __assign({ config: initializer.commands }, { children: jsx(Main, {}, void 0) }), void 0) }), void 0)), loadingScreen.isLoading && (jsx(LoadingScreen, { content: loadingScreen.content }, void 0))] }), void 0)] }, void 0)) }, void 0));
};
var Terminal = function (_a) {
    var config = _a.config, id = _a.id;
    if (id === '') {
        throw new Error("Id can not be empty");
    }
    return (jsx(React.StrictMode, { children: jsx(LocalStorageContextProvider, __assign({ id: id }, { children: jsx(InitializeTerminal, { config: config }, void 0) }), void 0) }, void 0));
};

export { CommandScreen, Input, Output, Terminal, colorsHelper, commandsHelper, fileSystemHelper, useCommand, useCommandsHistory, useFileSystem, useInput, useOutputHandler, useStateMachine, useTerminal };
