/* Version: 0.1.4 - February 11, 2022 05:39:30 */
/* eslint-disable */import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { createContext, useReducer, useMemo, useContext, useState, useEffect, forwardRef, useRef, useCallback, createRef, createElement } from 'react';
import _ from 'lodash';
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

var defaults = {
    shouldPersisteUserData: true,
    loadingScreen: {
        shouldShow: 'first-time',
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
        formatPrompt: '$p$g',
    },
    commands: {
        commands: [],
        excludeCommands: [],
        shouldAllowHelp: true,
        messages: {
            toBeImplemented: "Error: \"%n\" command hasn't been implemented.",
            notFound: "Error: \"%n\" is not a valid command.",
            cantBeExecuted: "Error: \"%n\" can't be executed.",
            helpNotAvailable: "Error: \"%n\" doesn't have any help available.",
        },
    },
    fileSystem: {
        files: [],
        initialDir: '',
        useFakeFileSystem: true,
        useInternalFiles: true,
    },
};

var _a;
var localStorageKey = (_a = process.env.REACT_APP_NAME) !== null && _a !== void 0 ? _a : 'react-dos-terminal';
var setToLS = function (key, value) {
    var stored = window.localStorage.getItem(localStorageKey);
    var obj = {};
    if (stored) {
        obj = JSON.parse(stored);
    }
    obj[key] = value;
    window.localStorage.setItem(localStorageKey, JSON.stringify(obj));
};
var getFromLS = function (key) {
    var value = window.localStorage.getItem(localStorageKey);
    var obj = {};
    if (value) {
        obj = JSON.parse(value);
        if (obj) {
            return obj[key];
        }
    }
    return null;
};
var getLsFreeSize = function () {
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
};
var ls = { set: setToLS, get: getFromLS, freeSize: getLsFreeSize };

var TerminalContext = createContext(undefined);
var TerminalContextProvider = function (_a) {
    var children = _a.children, config = _a.config;
    var terminalInitialState = {
        colors: config.colors,
        showOldScreenEffect: config.showOldScreenEffect,
        autoFocus: config.autoFocus,
        isActive: config.autoFocus,
        formatPrompt: config.formatPrompt,
    };
    var reducer = function (state, action) {
        switch (action.config) {
            case 'isActive':
                return __assign(__assign({}, state), { isActive: action.value });
            case 'setColors':
                ls.set('colors', action.value);
                return __assign(__assign({}, state), { colors: action.value });
            default:
                return state;
        }
    };
    var _b = useReducer(reducer, terminalInitialState), state = _b[0], dispatch = _b[1];
    var t = useMemo(function () {
        return __assign(__assign({}, state), { userHasInteracted: function () {
                dispatch({ config: 'isActive', value: true });
            }, setConfig: function (conf) {
                if (conf.config === 'setColors') {
                    dispatch({ config: 'setColors', value: conf.value });
                }
            } });
    }, [state]);
    return (jsx(TerminalContext.Provider, __assign({ value: t }, { children: children }), void 0));
};
var useTerminal = function () {
    var ctx = useContext(TerminalContext);
    if (ctx === undefined) {
        throw new Error("useTerminal must be used within a TerminalContextProvider.");
    }
    return ctx;
};

var replacePromptParams = function (prompt, dir) {
    var p = prompt.replace(/\$p/g, "C:\\".concat(dir));
    p = p.replace(/\$g/g, '>');
    p = p.replace(/\$l/g, '<');
    p = p.replace(/\$n/g, 'C:');
    p = p.replace(/\$b/g, '|');
    p = p.replace(/\$\$/g, '$');
    p = p.replace(/\$_/g, '\n');
    p = p.replace(/\$a/g, '&');
    p = p.replace(/\$c/g, '(');
    p = p.replace(/\$f/g, ')');
    p = p.replace(/\$s/g, ' ');
    p = p.replace(/\$t/g, new Date().toLocaleTimeString());
    p = p.replace(/\$d/g, new Date().toLocaleDateString());
    return p;
};
var formatPrompt = function (prompt, dir) {
    var final = replacePromptParams(prompt, dir);
    return final;
};
var fullDirPath = function (dir) {
    return "C:\\".concat(dir);
};
var getDir = function (files, dirPath) {
    var parts = dirPath.split('\\');
    var obj = files;
    for (var i = 0; i < parts.length; i += 1) {
        if (parts[i] === '') {
            continue;
        }
        if (obj.files[parts[i]]) {
            obj = obj.files[parts[i]].c;
        }
        else {
            return null;
        }
    }
    return obj;
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
    getCommandsSize: getCommandsSize,
    fullDirPath: fullDirPath,
    formatPrompt: formatPrompt,
};

var run$7 = function (_a) {
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
var help$7 = [
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
var cd = { run: run$7, help: help$7 };

var run$6 = function () {
    return {
        output: [{ action: 'clear' }],
    };
};
var help$6 = ['Clears the command prompt screen.'];
var cls = {
    run: run$6,
    help: help$6,
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

var help$5 = [
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
var run$5 = function (_a) {
    var args = _a.args;
    var re = /[0-9A-Fa-f]{2}/g;
    if (!args || !re.test(args) || args[0] === args[1]) {
        return { output: [{ action: 'add', value: help$5 }] };
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
var color = { run: run$5, help: help$5 };

var help$4 = [
    'The DIR command displays information about files and directories, and how much disk space is available.',
    '',
    "DIR [path] [/a[:Attributes]]",
    '',
    "/a:Attributes\t   Displays only files with the specified file attributes. Attributes is a series of letters, each representing an attribute as shown below.",
    '',
    "h: shows hidden files",
    '',
];
var run$4 = function (_a) {
    var args = _a.args, files = _a.files, actualDir = _a.actualDir;
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
    var getFinalOutput = function (f, filesNumber, dirsNumber, size) {
        var _a;
        var freeSize = (4194304 - f.totalSize).toLocaleString('en-US', {
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
    var output = function (f, finalPath, content, showHidden) {
        var filesNumber = 0;
        var dirsNumber = 0;
        var size = 0;
        var space = ' ';
        if (!content.files) {
            return __spreadArray(__spreadArray([], getInitialOutput(finalPath), true), getFinalOutput(f, filesNumber, dirsNumber, size), true);
        }
        var dirContent = Object.keys(content.files).reduce(function (acc, item) {
            var text = '';
            if (showHidden || content.files[item].a[1] !== 'h') {
                if (content.files[item].t === 'f' ||
                    content.files[item].t === 'e' ||
                    content.files[item].t === 's') {
                    filesNumber += filesNumber;
                    size += content.files[item].s;
                    text = "".concat(item).concat(space.repeat(28 - item.length)).concat(content.files[item].s.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                    }));
                }
                else {
                    dirsNumber += dirsNumber;
                    text = "".concat(item).concat(space.repeat(20 - item.length), "&ltDIR&gt");
                }
                acc.push(text);
            }
            return acc;
        }, []);
        if (!dirContent || _.isEmpty(dirContent)) {
            return __spreadArray(__spreadArray([], getInitialOutput(finalPath), true), getFinalOutput(files, filesNumber, dirsNumber, size), true);
        }
        return __spreadArray(__spreadArray(__spreadArray([], getInitialOutput(finalPath), true), dirContent, true), getFinalOutput(files, filesNumber, dirsNumber, size), true);
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
                    ], help$4, true),
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
                        value: output(files, actualDir, content, showHidden),
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
                result = output(files, finalPath, content, showHidden);
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
var dir = { run: run$4, help: help$4 };

var replaceName = function (name, message) {
    var msg = message === null || message === void 0 ? void 0 : message.replace('%n', name.toLowerCase());
    return msg === null || msg === void 0 ? void 0 : msg.replace('%N', name.toUpperCase());
};
var commandNotFound = function (_a) {
    var name = _a.name, messages = _a.messages;
    var msg = replaceName(name, messages.notFound);
    return {
        output: [{ action: 'add', value: [msg, ''] }],
    };
};
var toBeImplemented = function (_a) {
    var name = _a.name, messages = _a.messages;
    var msg = replaceName(name, messages.toBeImplemented);
    return {
        output: [{ action: 'add', value: [msg, ''] }],
    };
};
var cantBeExecuted = function (_a) {
    var name = _a.name, messages = _a.messages;
    var msg = replaceName(name, messages.cantBeExecuted);
    return {
        output: [{ action: 'add', value: [msg, ''] }],
    };
};
var helpNotAvailable = function (_a) {
    var name = _a.name, messages = _a.messages;
    var msg = replaceName(name, messages.helpNotAvailable);
    return {
        output: [{ action: 'add', value: [msg, ''] }],
    };
};
var link = function (href, text) {
    return "<a href=\"".concat(href, "\" target=\"_blank\" >").concat(text, "</a>");
};
var commandsHelper = {
    commandNotFound: commandNotFound,
    toBeImplemented: toBeImplemented,
    cantBeExecuted: cantBeExecuted,
    helpNotAvailable: helpNotAvailable,
    link: link,
};

var help$3 = function (props) {
    var commands = props.allCommands;
    var args = props.args;
    if (!args) {
        var output = commands.reduce(function (acc, command) {
            if (command.help) {
                acc.push(command.name.toUpperCase());
            }
            return acc;
        }, []);
        return {
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
        };
    }
    var cmd = commands.filter(function (command) {
        return command.name === args ||
            (command.alias && command.alias.includes(args));
    });
    if (cmd[0] && cmd[0].help) {
        var h = void 0;
        if (typeof cmd[0].help === 'function') {
            h = cmd[0].help();
        }
        else {
            h = cmd[0].help;
        }
        return {
            output: [
                { action: 'add', value: ['', args.toUpperCase(), ''] },
                { action: 'add', value: h },
                { action: 'add', value: [''] },
            ],
        };
    }
    return helpNotAvailable(__assign(__assign({}, props), { name: args }));
};

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

var help$2 = [
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
var run$3 = function () {
    return {
        output: [{ action: 'add', value: help$2 }],
    };
};
var reactDosTerminal = { run: run$3, help: help$2 };

var run$2 = function () { return __awaiter(void 0, void 0, void 0, function () {
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
    run: run$2,
    waitingMessage: waitingMessage,
};

var useCaretHandler = function () {
    var _a = useState(0), caretCorrection = _a[0], setCaretCorrection = _a[1];
    var _b = useState(null), actualInput = _b[0], setActualInput = _b[1];
    var terminal = useTerminal();
    var isActive = terminal.isActive, autoFocus = terminal.autoFocus;
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
        if (isActive && actualInput)
            actualInput.focus();
        if (!isActive && autoFocus && actualInput)
            actualInput.focus();
    }, [actualInput, isActive, autoFocus]);
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
var preStyles = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-family: 'IBM VGA 9x16', monospace !important;\n    font-size: 18px !important;\n    line-height: 18px !important;\n    outline: none;\n    margin: 0;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n"], ["\n    font-family: 'IBM VGA 9x16', monospace !important;\n    font-size: 18px !important;\n    line-height: 18px !important;\n    outline: none;\n    margin: 0;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n"])));
var flash = keyframes(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    50% {\n        opacity: 1;\n    }\n"], ["\n    50% {\n        opacity: 1;\n    }\n"])));
var blink = keyframes(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    50% {\n    border-color: transparent;\n    }\n"], ["\n    50% {\n    border-color: transparent;\n    }\n"])));
var ScreenContainer = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    height: 100%;\n    width: 100%;\n    margin: 0;\n    padding: 0;\n    overflow-x: hidden;\n    overflow-y: auto;\n    text-align: left;\n    padding-bottom: 1px;\n    text-shadow: 7px 0px 20px #808080a8;\n    ", ";\n    a {\n        color: ", ";\n        background-color: ", ";\n    }\n"], ["\n    height: 100%;\n    width: 100%;\n    margin: 0;\n    padding: 0;\n    overflow-x: hidden;\n    overflow-y: auto;\n    text-align: left;\n    padding-bottom: 1px;\n    text-shadow: 7px 0px 20px #808080a8;\n    ", ";\n    a {\n        color: ", ";\n        background-color: ", ";\n    }\n"])), function (props) { return getColorsCSS(props.colors, props.oldEffect); }, function (props) { return props.colors.background; }, function (props) { return props.colors.color; });
var ScreenContent = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    width: 134%;\n    height: 100%;\n    word-break: break-all;\n    font-family: 'IBM VGA 9x16', monospace !important;\n    font-size: 18px !important;\n    line-height: 18px !important;\n    transform: scaleX(0.75);\n    position: relative;\n    left: -16.7%;\n"], ["\n    width: 134%;\n    height: 100%;\n    word-break: break-all;\n    font-family: 'IBM VGA 9x16', monospace !important;\n    font-size: 18px !important;\n    line-height: 18px !important;\n    transform: scaleX(0.75);\n    position: relative;\n    left: -16.7%;\n"])));
var CommandScreenContainer = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    height: ", ";\n    ", "\n"], ["\n    height: ", ";\n    ", "\n"])), function (props) { return (props.fullscreen ? '100%' : 'auto'); }, function (props) { return getColorsCSS(props.colors, props.oldEffect); });
var CommandScreenContent = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject([""], [""])));
var OutputContainer = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    outline: none;\n    margin: 0;\n    ", "\n"], ["\n    outline: none;\n    margin: 0;\n    ", "\n"])), function (props) { return getColorsCSS(props.colors); });
var OutputContent = styled.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    padding: 4px 8px 0 8px;\n"], ["\n    padding: 4px 8px 0 8px;\n"])));
var PrintContainer = styled.div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    ", "\n    ", "\n"], ["\n    ", "\n    ", "\n"])), function (props) {
    return props.flashing
        ? css(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n                  animation: ", " 1.5s infinite;\n                  opacity: 0;\n              "], ["\n                  animation: ", " 1.5s infinite;\n                  opacity: 0;\n              "])), flash) : "";
}, function (props) { return getColorsCSS(props.colors); });
var PrintContent = styled.div(templateObject_13 || (templateObject_13 = __makeTemplateObject([""], [""])));
var PrintLine = styled.pre(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n    ", "\n"], ["\n    ", "\n"])), preStyles);
var InputContainer = styled.span(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n    padding-left: 8px;\n    outline: none;\n    margin: 0;\n    display: inline-block;\n\n    ", "\n\n    pre {\n        display: inline;\n        ", "\n    }\n"], ["\n    padding-left: 8px;\n    outline: none;\n    margin: 0;\n    display: inline-block;\n\n    ", "\n\n    pre {\n        display: inline;\n        ", "\n    }\n"])), function (props) { return getColorsCSS(props.colors); }, preStyles);
var InputContent = styled.div(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n    display: inline;\n    outline: none;\n    visibility: visible;\n    caret-color: transparent;\n    outline: none;\n    margin: 0;\n    padding-left: 8px;\n\n    ::selection {\n        color: black;\n        background: gray;\n    }\n"], ["\n    display: inline;\n    outline: none;\n    visibility: visible;\n    caret-color: transparent;\n    outline: none;\n    margin: 0;\n    padding-left: 8px;\n\n    ::selection {\n        color: black;\n        background: gray;\n    }\n"])));
var InputCaret = styled.span(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n    border-bottom: 2px solid;\n    animation: ", " 1s step-end infinite;\n    position: relative;\n    top: -3px;\n    display: inline-block;\n    line-height: 16px;\n    left: ", "ch;\n    ", "\n"], ["\n    border-bottom: 2px solid;\n    animation: ", " 1s step-end infinite;\n    position: relative;\n    top: -3px;\n    display: inline-block;\n    line-height: 16px;\n    left: ", "ch;\n    ", "\n"])), blink, function (props) { return props.positionCorrection; }, function (props) { return getColorsCSS(props.colors); });
var templateObject_1$1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17;

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
    var endRef = useRef(null);
    useEffect(function () {
        if (endRef.current) {
            endRef.current.scrollIntoView({ block: 'end' });
        }
    });
    return (jsxs(Fragment, { children: [jsxs(PrintContainer, __assign({}, rest, { colors: colors, flashing: flashing, ref: divRef }, { children: [typeof output === 'object' &&
                        output.length > 0 &&
                        output.map(function (line, index) {
                            return (jsx(PrintContent, { children: line !== '' ? (jsx(PrintLine, { dangerouslySetInnerHTML: {
                                        __html: line,
                                    } }, void 0)) : (jsx("br", {}, void 0)) }, "".concat(index, "|").concat(line)));
                        }), typeof output === 'string' && output.length > 0 && (jsx(PrintContent, { children: output !== '' ? (jsx(PrintLine, { dangerouslySetInnerHTML: { __html: output } }, void 0)) : (jsx("br", {}, void 0)) }, void 0))] }), void 0), jsx("div", { ref: endRef }, void 0)] }, void 0));
};
var PrintWithTypewriter = function (_a) {
    var output = _a.output, typewriter = _a.typewriter, _b = _a.flashing, flashing = _b === void 0 ? false : _b, colors = _a.colors, rest = __rest(_a, ["output", "typewriter", "flashing", "colors"]);
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
                        if (endRef.current)
                            endRef.current.scrollIntoView({ block: 'end' });
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
    }, [lastOutput, handleTypewrite, output, divRef, typewriter]);
    return (jsxs(Fragment, { children: [jsxs(PrintContainer, __assign({}, rest, { colors: colors, flashing: flashing, ref: divRef }, { children: [typeof output === 'object' &&
                        output.length > 0 &&
                        output.map(function (line, index) {
                            return (jsx(PrintContent, { children: line !== '' ? (jsx(PrintLine, { dangerouslySetInnerHTML: {
                                        __html: line,
                                    } }, void 0)) : (jsx("br", {}, void 0)) }, "".concat(index, "|").concat(line)));
                        }), typeof output === 'string' && output.length > 0 && (jsx(PrintContent, { children: output !== '' ? (jsx(PrintLine, { dangerouslySetInnerHTML: { __html: output } }, void 0)) : (jsx("br", {}, void 0)) }, void 0))] }), void 0), jsx("div", { ref: endRef }, void 0)] }, void 0));
};
var Typewriter = function (_a) {
    var output = _a.output, _b = _a.flashing, flashing = _b === void 0 ? false : _b, colors = _a.colors, rest = __rest(_a, ["output", "flashing", "colors"]);
    return (jsxs(Fragment, { children: [jsx(Output.Print, __assign({ output: output.outputHistory }, rest, { colors: colors, flashing: flashing }), void 0), jsx(PrintWithTypewriter, __assign({ typewriter: output.typewriter, output: output.lastOutput }, rest, { colors: colors, flashing: flashing }), void 0)] }, void 0));
};
Output.Typewriter = Typewriter;
Output.Print = Print;

var CommandContext = createContext(undefined);
var CommandContextProvider = function (_a) {
    var children = _a.children, config = _a.config;
    var terminalCommandInitialState = {
        allCommands: config.commands,
        shouldAllowHelp: config.shouldAllowHelp,
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
    var endRef = useRef(null);
    useEffect(function () {
        if (endRef.current) {
            endRef.current.scrollIntoView({ block: 'end' });
        }
    });
    return (jsx(CommandScreenContainer, __assign({}, rest, { colors: colors !== null && colors !== void 0 ? colors : terminal.colors, oldEffect: oldEffect !== null && oldEffect !== void 0 ? oldEffect : terminal.showOldScreenEffect, fullscreen: fullscreen }, { children: jsxs(CommandScreenContent, { children: [children, jsx("div", { ref: endRef }, void 0)] }, void 0) }), void 0));
};

var TestDynamicOutput = function (_a) {
    var name = _a.name, args = _a.args, outputHandler = _a.outputHandler;
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
            if (outputHandler) {
                var linesToRemove = args === 'with-output' ? 2 : 4;
                outputHandler.addToQueue([
                    args === 'with-output'
                        ? { action: 'clear' }
                        : { action: 'remove', value: linesToRemove },
                    { action: 'add', value: toOutput },
                ]);
            }
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
    if (args !== 'with-output') {
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

var help$1 = [
    'The TYPE command displays the contents of a text file. However, it does not allow you to edit the file, or add new text.',
    '',
    'The TYPE command has no options.',
    '',
    'TYPE [filename]',
    '',
    'Filename is the name of the file to show.',
    '',
];
var run$1 = function (_a) {
    var args = _a.args, actualDir = _a.actualDir, files = _a.files;
    if (!args) {
        return {
            output: [
                {
                    action: 'add',
                    value: __spreadArray([
                        "Error: TYPE command requires an argument.",
                        ''
                    ], help$1, true),
                },
            ],
        };
    }
    var content = fileSystemHelper.getDir(files, actualDir);
    var file = (content === null || content === void 0 ? void 0 : content.files[args]) ? content === null || content === void 0 ? void 0 : content.files[args] : false;
    if (!file) {
        return {
            output: [
                { action: 'add', value: ["File ".concat(args, " doesn't exists."), ''] },
            ],
        };
    }
    if (file.t !== 'f') {
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
    if (typeof file.c === 'string') {
        return { output: [{ action: 'add', value: ['', file.c, ''] }] };
    }
    var cont = file.c;
    return { output: [{ action: 'add', value: __spreadArray(__spreadArray([''], cont, true), [''], false) }] };
};
var type = { run: run$1, help: help$1 };

var help = ['The VER command displays the version of react-dos-terminal.'];
var run = function (_a) {
    var args = _a.args;
    if (args !== '') {
        return {
            output: [
                {
                    action: 'add',
                    value: __spreadArray([
                        "Error: VER command doesn't have arguments.",
                        ''
                    ], help, true),
                },
            ],
        };
    }
    var version = '0.1.4 - February 11, 2022 05:39:30';
    return {
        output: [
            {
                action: 'add',
                value: ['', "react-dos-terminal version: ".concat(version), ''],
            },
        ],
    };
};
var ver = { run: run, help: help };

var commandsList = [
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
        name: '😎',
        action: hidden,
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
        action: commandsHelper.toBeImplemented,
    },
];
var fileSystemSubstituteCommands = [
    {
        name: 'help',
        alias: ['/?'],
        action: help$3,
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
var calcFileSize = function (name, file) {
    var _a;
    var filesize = (name.length + 3) * 2;
    if (file.t === 'e' || file.t === 's') {
        var x = file.c;
        filesize += fileSystemHelper.getCommandsSize([x]);
    }
    else if (file.t === 'f') {
        filesize += JSON.stringify(file.c).length * 2;
    }
    else {
        var content = file.c;
        filesize += (_a = content.totalSize) !== null && _a !== void 0 ? _a : 0;
    }
    return filesize;
};
var createFileSystemFromArray = function (files) {
    var final = {};
    var totalSize = 0;
    var obj = files.reduce(function (acc, file) {
        var _a;
        var _b;
        var contentDir = {};
        var contentOther = '';
        if (file.type === 'directory') {
            contentDir = createFileSystemFromArray(file.content);
        }
        else if (file.type === 'file' && typeof file.content === 'string') {
            contentOther = file.content;
        }
        else if (file.type === 'file' && typeof file.content !== 'string') {
            contentOther = file.content;
        }
        else {
            contentOther = file.content;
        }
        var newFileType;
        if (file.type === 'directory') {
            newFileType = 'd';
        }
        else if (file.type === 'file') {
            newFileType = 'f';
        }
        else if (file.type === 'exec-file') {
            newFileType = 'e';
        }
        else {
            newFileType = 's';
        }
        var newContent = file.type === 'directory' ? contentDir : contentOther;
        var fileObj = {
            c: newContent,
            a: file.attributes,
            t: newFileType,
        };
        var fs = (_b = file.fakeFileSize) !== null && _b !== void 0 ? _b : 0;
        var filesize = calcFileSize(file.name, fileObj) + fs;
        totalSize += filesize;
        acc.files = __assign(__assign({}, acc.files), (_a = {}, _a[file.name] = __assign(__assign({}, fileObj), { s: filesize }), _a));
        acc.totalSize = totalSize;
        return acc;
    }, final);
    return obj;
};
var renameEqualFiles = function (contentA, contentB) {
    var finalContent = __spreadArray([], contentA, true);
    contentB.forEach(function (file) {
        if (file.type === 'file' ||
            file.type === 'exec-file' ||
            file.type === 'system-file') {
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
var createFakeFileSystem = function (internal, external) {
    if (!internal) {
        return { files: {}, totalSize: 0 };
    }
    if (!external) {
        return createFileSystemFromArray(internal);
    }
    var mergedDirs = mergeEqualDirs(internal, external);
    var content = renameEqualFiles(internal, external);
    var int = createFileSystemFromArray(internal);
    var ext = createFileSystemFromArray(external);
    var cont = createFileSystemFromArray(content);
    var dirs = createFileSystemFromArray(mergedDirs);
    var files = __assign(__assign(__assign(__assign({}, int.files), ext.files), cont.files), dirs.files);
    var totalSize = Object.values(files).reduce(function (acc, file) { return acc + file.s; }, 0);
    var result = { files: files, totalSize: totalSize };
    return result;
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

var useOutputHandler = function (initial) {
    var _a = useState([
        { action: 'add', value: initial },
    ]), outputQueue = _a[0], setOutputQueue = _a[1];
    var _b = useState([]), outputHistory = _b[0], setOutputHistory = _b[1];
    var _c = useState([]), lastOutput = _c[0], setLastOutput = _c[1];
    var _d = useState(false), isTypewriting = _d[0], setIsTypewriting = _d[1];
    var _e = useState(10), typeInterval = _e[0], setTypeInterval = _e[1];
    var addToHistory = function (value) {
        if (typeof value === 'string') {
            setOutputHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [value], false); });
        }
        else {
            setOutputHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), value, true); });
        }
    };
    var removeFromHistory = useCallback(function (value) {
        var newHistory = __spreadArray([], outputHistory, true);
        newHistory.splice(0 - value);
        setOutputHistory(newHistory);
    }, [outputHistory]);
    var clearHistory = function () {
        setOutputHistory([]);
    };
    var addToQueue = function (actions) {
        setOutputQueue(function (prev) { return __spreadArray(__spreadArray([], prev, true), actions, true); });
    };
    var startTypewriting = function () {
        setIsTypewriting(true);
    };
    var endTypewriting = function () {
        setOutputHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), lastOutput, true); });
        setLastOutput([]);
        setIsTypewriting(false);
    };
    var changeLastOutput = function (value) {
        setLastOutput(value);
    };
    var changeTypeInterval = function (value) {
        setTypeInterval(value);
    };
    useEffect(function () {
        if (outputQueue.length > 0 && !isTypewriting) {
            switch (outputQueue[0].action) {
                case 'add':
                    startTypewriting();
                    if (typeof outputQueue[0].value === 'string') {
                        changeLastOutput([outputQueue[0].value]);
                    }
                    else {
                        changeLastOutput(outputQueue[0].value);
                    }
                    break;
                case 'remove':
                    removeFromHistory(outputQueue[0].value);
                    break;
                case 'clear':
                    clearHistory();
                    break;
            }
            var newQueue = __spreadArray([], outputQueue, true);
            newQueue.shift();
            setOutputQueue(newQueue);
        }
    }, [outputQueue, isTypewriting, removeFromHistory]);
    return {
        outputHistory: outputHistory,
        addToHistory: addToHistory,
        removeFromHistory: removeFromHistory,
        outputQueue: outputQueue,
        addToQueue: addToQueue,
        lastOutput: lastOutput,
        typewriter: {
            isTypewriting: isTypewriting,
            startTypewriting: startTypewriting,
            endTypewriting: endTypewriting,
            typeInterval: typeInterval,
            changeTypeInterval: changeTypeInterval,
        },
    };
};

var TerminalScreen = function (_a) {
    var children = _a.children, colors = _a.colors, oldEffect = _a.oldEffect, rest = __rest(_a, ["children", "colors", "oldEffect"]);
    var terminal = useTerminal();
    var endRef = useRef(null);
    useEffect(function () {
        if (endRef.current) {
            endRef.current.scrollIntoView({ block: 'end' });
        }
    });
    return (jsx(ScreenContainer, __assign({ colors: colors !== null && colors !== void 0 ? colors : terminal.colors, oldEffect: oldEffect !== null && oldEffect !== void 0 ? oldEffect : terminal.showOldScreenEffect }, { children: jsxs(ScreenContent, __assign({}, rest, { children: [children, jsx("div", { ref: endRef }, void 0)] }), void 0) }), void 0));
};

var FileSystemContext = createContext(undefined);
var FileSystemContextProvider = function (_a) {
    var children = _a.children, config = _a.config;
    var fileSystemInitialState = {
        actualDir: config.actualDir,
        allFiles: config.allFiles,
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
    var action = _a.action, outputHandler = _a.outputHandler;
    var terminal = useTerminal();
    var filesystem = useFileSystem();
    var command = useCommand();
    var messages = command.messages, shouldAllowHelp = command.shouldAllowHelp, allCommands = command.allCommands;
    var actualDir = filesystem.actualDir, files = filesystem.allFiles;
    var run = function (cmd) { return __awaiter(void 0, void 0, void 0, function () {
        var getNameAndArgs, _a, name, args, isHelp, props, dispatch, runAction, runHelp, executable, terminalCommand, executableCommand;
        return __generator(this, function (_b) {
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
            _a = getNameAndArgs(cmd), name = _a.name, args = _a.args, isHelp = _a.isHelp;
            outputHandler.addToHistory("".concat(fileSystemHelper.formatPrompt(terminal.formatPrompt, actualDir), " ").concat(cmd));
            if (name === '') {
                command.setActualCmd(null);
                return [2];
            }
            props = { name: name, args: args, allCommands: allCommands, messages: messages, actualDir: actualDir, files: files };
            dispatch = function (response, waitingMessage) {
                command.setActualCmd(__assign({ name: name, args: args, waitingMessage: waitingMessage }, response));
                if (response.configTerminal !== undefined) {
                    if (response.configTerminal.config === 'setColors')
                        terminal.setConfig(response.configTerminal);
                    if (response.configTerminal.config === 'setActualDir') {
                        filesystem.setActualDir(response.configTerminal.value);
                    }
                }
                if (response.output) {
                    outputHandler.addToQueue(response.output);
                }
                if (!waitingMessage)
                    command.startRunningCommand();
                if (response.dynamic) {
                    action('NEW_CMD', 'dynamic');
                    return;
                }
                action('NEW_CMD', 'static');
            };
            runAction = function (cm) { return __awaiter(void 0, void 0, void 0, function () {
                var waitingMessage, response;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            waitingMessage = (_a = cm === null || cm === void 0 ? void 0 : cm.async) === null || _a === void 0 ? void 0 : _a.waitingMessage;
                            if (waitingMessage) {
                                outputHandler.addToQueue([
                                    { action: 'add', value: waitingMessage },
                                ]);
                                action('NEW_CMD', 'async');
                            }
                            if (!cm.action) return [3, 2];
                            return [4, cm.action(props)];
                        case 1:
                            response = _b.sent();
                            dispatch(response, waitingMessage);
                            return [2];
                        case 2:
                            dispatch(commandsHelper.commandNotFound(props));
                            return [2];
                    }
                });
            }); };
            runHelp = function (cm) {
                if (cm.help) {
                    dispatch(help$3(__assign(__assign({}, props), { name: 'help', args: name })));
                }
                else {
                    dispatch(commandsHelper.helpNotAvailable(props));
                }
            };
            executable = function (p) {
                if (_.isEmpty(p.files)) {
                    return null;
                }
                var pathsToSearch = [actualDir, '', '\\system'];
                var c = pathsToSearch.reduce(function (acc, path) {
                    if (_.isEmpty(acc)) {
                        var dirContent = fileSystemHelper.getDir(files, path);
                        if (dirContent && dirContent.files) {
                            if (dirContent.files[p.name] &&
                                (dirContent.files[p.name].t === 'e' ||
                                    dirContent.files[p.name].t === 's')) {
                                return dirContent.files[p.name].c;
                            }
                            if (dirContent.files["".concat(p.name, ".com")] &&
                                (dirContent.files["".concat(p.name, ".com")].t === 'e' ||
                                    dirContent.files["".concat(p.name, ".com")].t === 's')) {
                                return dirContent.files["".concat(p.name, ".com")]
                                    .c;
                            }
                            if (dirContent.files["".concat(props.name, ".exe")] &&
                                (dirContent.files["".concat(props.name, ".exe")].t === 'e' ||
                                    dirContent.files["".concat(props.name, ".exe")].t === 's')) {
                                return dirContent.files["".concat(props.name, ".exe")]
                                    .c;
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
            terminalCommand = allCommands.filter(function (c) {
                var _a;
                return c.name.toLowerCase() === name.toLowerCase() ||
                    ((_a = c.alias) === null || _a === void 0 ? void 0 : _a.find(function (a) {
                        return a.toLowerCase().includes(name.toLowerCase());
                    }));
            });
            if (terminalCommand[0]) {
                if (isHelp) {
                    runHelp(terminalCommand[0]);
                    return [2];
                }
                runAction(terminalCommand[0]);
            }
            else {
                executableCommand = executable(props);
                if (executableCommand) {
                    if (isHelp) {
                        runHelp(terminalCommand[0]);
                        return [2];
                    }
                    runAction(executableCommand);
                }
                else {
                    dispatch(commandsHelper.commandNotFound(props));
                }
            }
            return [2];
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

var useMainMachine = function (_a) {
    var outputHandler = _a.outputHandler;
    var command = useCommand();
    var isRunningCommand = command.isRunningCommand, endRunningCommand = command.endRunningCommand, setActualCmd = command.setActualCmd;
    var outputQueue = outputHandler.outputQueue;
    var isTypewriting = outputHandler.typewriter.isTypewriting;
    var _b = useState(''), type = _b[0], setType = _b[1];
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
    var _c = useStateMachine(mainMachine), state = _c[0], action = _c[1];
    return { state: state, action: action };
};

var UserDefinedElement = function (_a) {
    var element = _a.element, outputHandler = _a.outputHandler;
    return createElement(element.type, __assign(__assign({}, element.props), { outputHandler: outputHandler }), null);
};

var Main = function (_a) {
    var _b;
    var initialOutput = _a.initialOutput;
    var _c = useState(false), hideOutput = _c[0], setHideOutput = _c[1];
    var terminal = useTerminal();
    var filesystem = useFileSystem();
    var actualDir = filesystem.actualDir;
    var command = useCommand();
    var dynamic = (_b = command.actualCmd) === null || _b === void 0 ? void 0 : _b.dynamic;
    var input = useInput();
    var commandsHistory = useCommandsHistory({ input: input.ref });
    var outputHandler = useOutputHandler(initialOutput);
    var _d = useMainMachine({ outputHandler: outputHandler }), state = _d.state, action = _d.action;
    var commandsHandler = useCommandsHandler({ state: state, action: action, outputHandler: outputHandler });
    var handleKeyUp = function (e) {
        if (!terminal.isActive) {
            terminal.userHasInteracted();
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
    return (jsxs(TerminalScreen, __assign({ onClick: function () { return input && input.setFocus(); } }, { children: [!hideOutput && (jsx(Output, { children: jsx(Output.Typewriter, { output: outputHandler }, void 0) }, void 0)), state === 'RUNNING_COMMAND' && dynamic && (jsx(UserDefinedElement, { element: dynamic === null || dynamic === void 0 ? void 0 : dynamic.element, outputHandler: outputHandler }, void 0)), state !== 'RUNNING_COMMAND' &&
                !outputHandler.typewriter.isTypewriting && (jsx(Input, { onKeyUp: handleKeyUp, id: "terminal_input", ref: input.ref, prompt: fileSystemHelper.formatPrompt(terminal.formatPrompt, actualDir) }, void 0))] }), void 0));
};

var useLoadingScreen = function (config) {
    var shouldShowLoading = function (loadingScreen, isInstalled) {
        var _a;
        var ss = (_a = loadingScreen.shouldShow) !== null && _a !== void 0 ? _a : 'first-time';
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
        name: 'readme.txt',
        type: 'file',
        content: reactDosTerminal.help,
        attributes: 's',
    },
    {
        name: 'system',
        type: 'directory',
        attributes: 's',
        content: [
            {
                name: 'doskey.exe',
                type: 'system-file',
                attributes: 'sh',
                content: {
                    name: 'doskey',
                    action: commandsHelper.cantBeExecuted,
                },
                fakeFileSize: fileSystemHelper.getFakeFileSize([
                    useCommandsHistory,
                    useCaretHandler,
                ]),
            },
            {
                name: 'help.com',
                type: 'exec-file',
                attributes: 's',
                content: {
                    name: 'help',
                    action: help$3,
                },
                fakeFileSize: fileSystemHelper.getFakeFileSize(help$3),
            },
        ],
    },
    {
        name: 'command.com',
        type: 'system-file',
        attributes: 'sh',
        content: {
            name: 'command',
            action: commandsHelper.cantBeExecuted,
        },
        fakeFileSize: fileSystemHelper.getCommandsSize(commandsList) +
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
        type: 'system-file',
        attributes: 'sh',
        content: {
            name: 'io',
            action: commandsHelper.cantBeExecuted,
        },
        fakeFileSize: fileSystemHelper.getFakeFileSize([
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
        type: 'system-file',
        attributes: 'sh',
        content: {
            name: 'msdos',
            action: commandsHelper.cantBeExecuted,
        },
        fakeFileSize: fileSystemHelper.getFakeFileSize([
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
];

var useInitializer = function (config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var isInstalled = ls.get('i');
    var _o = useState(false), isInitialized = _o[0], setIsInitialized = _o[1];
    var persisteData = (config === null || config === void 0 ? void 0 : config.shouldPersisteUserData) !== undefined
        ? config.shouldPersisteUserData
        : defaults.shouldPersisteUserData;
    var _p = useState(defaults.terminal.colors), finalColors = _p[0], setFinalColors = _p[1];
    var finalOldScreenEffect = ((_a = config === null || config === void 0 ? void 0 : config.terminal) === null || _a === void 0 ? void 0 : _a.showOldScreenEffect) !== undefined
        ? (_b = config === null || config === void 0 ? void 0 : config.terminal) === null || _b === void 0 ? void 0 : _b.showOldScreenEffect
        : defaults.terminal.showOldScreenEffect;
    var _q = useState(), finalFormatPrompt = _q[0], setFinalFormatPrompt = _q[1];
    var _r = useState(), finalInitialDir = _r[0], setFinalInitialDir = _r[1];
    var finalAutofocus = ((_c = config === null || config === void 0 ? void 0 : config.terminal) === null || _c === void 0 ? void 0 : _c.autoFocus) !== undefined
        ? config.terminal.autoFocus
        : defaults.terminal.autoFocus;
    var finalMessages = __assign(__assign({}, defaults.commands.messages), (_d = config === null || config === void 0 ? void 0 : config.commands) === null || _d === void 0 ? void 0 : _d.messages);
    var finalExcludeCommands = ((_e = config === null || config === void 0 ? void 0 : config.commands) === null || _e === void 0 ? void 0 : _e.excludeCommands) !== undefined
        ? config.commands.excludeCommands
        : defaults.commands.excludeCommands;
    var finalAllowHelp = ((_f = config === null || config === void 0 ? void 0 : config.commands) === null || _f === void 0 ? void 0 : _f.shouldAllowHelp) !== undefined
        ? config.commands.shouldAllowHelp
        : defaults.commands.shouldAllowHelp;
    var finalCommands = useMemo(function () {
        var _a, _b, _c, _d, _e;
        var cmd;
        if (((_a = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _a === void 0 ? void 0 : _a.useFakeFileSystem) !== false) {
            var fc = commandsList.concat(fileSystemCommands);
            cmd = initializer.createCommands(fc, (_b = config === null || config === void 0 ? void 0 : config.commands) === null || _b === void 0 ? void 0 : _b.commands);
        }
        else {
            var fc = commandsList.concat(fileSystemSubstituteCommands);
            cmd = initializer.createCommands(fc, (_c = config === null || config === void 0 ? void 0 : config.commands) === null || _c === void 0 ? void 0 : _c.commands);
        }
        if (((_d = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _d === void 0 ? void 0 : _d.useInternalFiles) === false) {
            cmd = initializer.createCommands(cmd, fileSystemSubstituteCommands);
        }
        if (!finalAllowHelp) {
            cmd = initializer.excludeCommands(cmd, ['help']);
        }
        cmd = initializer.createCommands(cmd, (_e = config === null || config === void 0 ? void 0 : config.commands) === null || _e === void 0 ? void 0 : _e.commands);
        return initializer.createCommands(cmd, immutableCommands);
    }, [
        (_g = config === null || config === void 0 ? void 0 : config.commands) === null || _g === void 0 ? void 0 : _g.commands,
        (_h = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _h === void 0 ? void 0 : _h.useFakeFileSystem,
        (_j = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _j === void 0 ? void 0 : _j.useInternalFiles,
        finalAllowHelp,
    ]);
    var finalFiles = useMemo(function () {
        var _a, _b, _c;
        if (((_a = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _a === void 0 ? void 0 : _a.useFakeFileSystem) !== false &&
            ((_b = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _b === void 0 ? void 0 : _b.useInternalFiles) !== false) {
            return initializer.createFakeFileSystem(files, (_c = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _c === void 0 ? void 0 : _c.files);
        }
        if ((config === null || config === void 0 ? void 0 : config.fileSystem.useFakeFileSystem) !== false &&
            (config === null || config === void 0 ? void 0 : config.fileSystem.useInternalFiles) === false &&
            config.fileSystem.files) {
            return initializer.createFakeFileSystem(config.fileSystem.files);
        }
        return initializer.createFakeFileSystem();
    }, [config]);
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
                    ((_e = config === null || config === void 0 ? void 0 : config.terminal) === null || _e === void 0 ? void 0 : _e.formatPrompt) !== undefined
                        ? (_f = config === null || config === void 0 ? void 0 : config.terminal) === null || _f === void 0 ? void 0 : _f.formatPrompt
                        : defaults.terminal.formatPrompt;
                if (col)
                    ls.set('colors', col);
                ls.set('i', '1');
                ls.set('actualDir', actualD);
                ls.set('formatPrompt', prompt_1);
            }
            else {
                col = ls.get('colors');
                var dir = ls.get('actualDir');
                var promp = ls.get('formatPrompt');
                actualD = typeof dir !== 'string' ? '' : dir;
                prompt_1 = typeof promp !== 'string' ? '' : promp;
            }
            ls.set('oldEffect', finalOldScreenEffect ? '1' : '0');
            setFinalColors(col);
            setFinalInitialDir(actualD);
            setIsInitialized(true);
            setFinalFormatPrompt(prompt_1);
        }
    }, [
        (_k = config === null || config === void 0 ? void 0 : config.terminal) === null || _k === void 0 ? void 0 : _k.colors,
        (_l = config === null || config === void 0 ? void 0 : config.fileSystem) === null || _l === void 0 ? void 0 : _l.initialDir,
        isInstalled,
        isInitialized,
        persisteData,
        finalOldScreenEffect,
        finalInitialDir,
        (_m = config === null || config === void 0 ? void 0 : config.terminal) === null || _m === void 0 ? void 0 : _m.formatPrompt,
        finalFormatPrompt,
    ]);
    return {
        terminal: {
            colors: finalColors,
            showOldScreenEffect: finalOldScreenEffect,
            autoFocus: finalAutofocus,
            formatPrompt: finalFormatPrompt,
        },
        commands: {
            commands: finalCommands,
            shouldAllowHelp: finalAllowHelp,
            excludeCommands: finalExcludeCommands,
            messages: finalMessages,
        },
        isInitialized: isInitialized,
        fileSystem: {
            actualDir: finalInitialDir,
            allFiles: finalFiles,
        },
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
    var output = useOutputHandler(getContent());
    return (jsxs(Fragment, { children: [!React.isValidElement(content) && (jsx(TerminalScreen, { children: jsx(Output, { children: jsx(Output.Typewriter, { output: output, flashing: true }, void 0) }, void 0) }, void 0)), React.isValidElement(content) && (jsx(UserDefinedElement, { element: content, outputHandler: output }, void 0))] }, void 0));
};
var Terminal = function (_a) {
    var _b, _c, _d;
    var config = _a.config;
    var initializer = useInitializer(config);
    var loadingScreen = useLoadingScreen(config === null || config === void 0 ? void 0 : config.loadingScreen);
    var initialOutput = ((_b = config === null || config === void 0 ? void 0 : config.terminal) === null || _b === void 0 ? void 0 : _b.initialOutput) !== undefined
        ? (_c = config === null || config === void 0 ? void 0 : config.terminal) === null || _c === void 0 ? void 0 : _c.initialOutput
        : (_d = defaults === null || defaults === void 0 ? void 0 : defaults.terminal) === null || _d === void 0 ? void 0 : _d.initialOutput;
    return (jsx(React.StrictMode, { children: initializer.isInitialized && (jsxs(Fragment, { children: [jsx(GlobalStyles, {}, void 0), jsxs(TerminalContextProvider, __assign({ config: initializer.terminal }, { children: [!loadingScreen.isLoading && (jsx(FileSystemContextProvider, __assign({ config: initializer.fileSystem }, { children: jsx(CommandContextProvider, __assign({ config: initializer.commands }, { children: jsx(Main, { initialOutput: initialOutput }, void 0) }), void 0) }), void 0)), loadingScreen.isLoading && (jsx(LoadingScreen, { content: loadingScreen.content }, void 0))] }), void 0)] }, void 0)) }, void 0));
};

export { CommandScreen, Input, Output, Terminal, colorsHelper, fileSystemHelper, useCommand, useInput, useStateMachine };
