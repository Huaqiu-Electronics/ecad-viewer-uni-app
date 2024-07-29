var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
            (g[Symbol.iterator] = function () {
                return this;
            }),
                g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while ((g && ((g = 0), op[0] && (_ = 0)), _))
                try {
                    if (
                        ((f = 1),
                        y &&
                        (t =
                            op[0] & 2
                                ? y["return"]
                                : op[0]
                                    ? y["throw"] ||
                                    ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                        !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys),
                                    (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
var __values =
    (this && this.__values) ||
    function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator,
            m = s && o[s],
            i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length) o = void 0;
                    return { value: o && o[i++], done: !o };
                },
            };
        throw new TypeError(
            s ? "Object is not iterable." : "Symbol.iterator is not defined.",
        );
    };
if (!String.prototype.replaceAll) {
    // Check if the native function not exist
    Object.defineProperty(String.prototype, "replaceAll", {
        // Define replaceAll as a prototype for (Mother/Any) String
        configurable: true,
        writable: true,
        enumerable: false, // Editable & non-enumerable property (As it should be)
        value: function (search, replace) {
            // Set the function by closest input names (For good info in consoles)
            return this.replace(
                // Using native String.prototype.replace()
                Object.prototype.toString.call(search) === "[object RegExp]" // IsRegExp?
                    ? search.global // Is the RegEx global?
                        ? search // So pass it
                        : RegExp(
                            search.source,
                            /\/([a-z]*)$/.exec(search.toString())[1] + "g",
                        ) // If not, make a global clone from the RegEx
                    : RegExp(
                        String(search).replace(/[.^$*+?()[{|\\]/g, "\\$&"),
                        "g",
                    ), // Replace all reserved characters with '\' then make a global 'g' RegExp
                replace,
            ); // passing second argument
        },
    });
}
function is_primitive(value) {
    return (
        value === null ||
        (typeof value != "object" && typeof value != "function")
    );
}
function is_string(value) {
    return typeof value === "string";
}
function is_number(value) {
    return typeof value === "number" && !isNaN(value);
}
function is_iterable(value) {
    return (
        Array.isArray(value) ||
        typeof (value === null || value === void 0
            ? void 0
            : value[Symbol.iterator]) === "function"
    );
}
function is_array(value) {
    return Array.isArray(value);
}
// eslint-disable-next-line @typescript-eslint/ban-types
function is_object(value) {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        !(value instanceof RegExp) &&
        !(value instanceof Date)
    );
}
function is_HTMLElement(v) {
    return typeof HTMLElement === "object" && v instanceof HTMLElement;
}
/**
 * A tagged template literal that generates HTML
 *
 * This is loosely inspired by Lit's html, but vastly simplified for our use
 * case. We don't do any reactivity or automatic updating, so a lot of the
 * code required to synchronize and update DOM elements automatically isn't
 * needed.
 *
 * There are two key properties that this needs to have:
 * - It must limit the location of variable expansion so we can effectively
 *   work against XSS.
 * - Any elements used in the template literal should retain their identity
 *   once placed in the rendered tree.
 */
function html(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var template = document.createElement("template");
    template.innerHTML = prepare_template_html(strings, values);
    var content = template.content;
    content = document.importNode(content, true);
    apply_values_to_tree(content, values);
    if (content.childElementCount == 1) {
        return content.firstElementChild;
    } else {
        return content;
    }
}
/**
 * A tagged template literal that allows text to pass through the html
 * literal as-is, before variable interpolation happens.
 */
function literal(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var str = "";
    strings.forEach(function (string, i) {
        var _a;
        str += string + ((_a = values[i]) !== null && _a !== void 0 ? _a : "");
    });
    return new Literal(str);
}
var Literal = /** @class */ (function () {
    function Literal(text) {
        this.text = text;
    }
    return Literal;
})();
var placeholder_regex = /\$\$:(\d+):\$\$/g;
/**
 * Processes a given template literal into a suitable html template string.
 *
 * Inserts placeholders into the string for every replacement. These
 * placeholders will later be used to modify the constructed DOM node's
 * attributes and content.
 */
function prepare_template_html(strings, values) {
    var template_parts = [];
    for (var i = 0; i < strings.length - 1; i++) {
        template_parts.push(strings[i]);
        if (values[i] instanceof Literal) {
            template_parts.push(values[i].text);
        } else {
            template_parts.push("$$:".concat(i, ":$$"));
        }
    }
    template_parts.push(strings[strings.length - 1]);
    var template_string = template_parts.join("");
    return template_string;
}
/**
 * Walks through the give DOM tree and replaces placeholders with values.
 */
function apply_values_to_tree(tree, values) {
    var walker = document.createTreeWalker(
        tree,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
        null,
    );
    var node;
    while ((node = walker.nextNode()) !== null) {
        if (node.nodeType == Node.TEXT_NODE) {
            apply_content_value(node.parentNode, node, values);
        } else if (node.nodeType == Node.ELEMENT_NODE) {
            var elm = node;
            for (
                var _i = 0, _a = elm.getAttributeNames();
                _i < _a.length;
                _i++
            ) {
                var attr_name = _a[_i];
                var attr = elm.getAttributeNode(attr_name);
                apply_attribute_value(elm, attr, values);
            }
        }
    }
}
/**
 * Apply template values to a node's text content.
 */
function apply_content_value(node, text, values) {
    if (!node) {
        return;
    }
    var parts = text.data.split(placeholder_regex);
    if (!parts || parts.length == 1) {
        return;
    }
    if (is_HTMLElement(node) && ["script", "style"].includes(node.localName)) {
        throw new Error(
            "Cannot bind values inside of <script> or <style> tags",
        );
    }
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        // Don't bother adding empty text
        if (!part) {
            continue;
        }
        // Even parts are text nodes.
        if (i % 2 == 0) {
            node.insertBefore(new Text(part), text);
        }
        // Odd parts are placeholders.
        else {
            for (
                var _i = 0,
                    _a = convert_value_for_content(values[parseInt(part, 10)]);
                _i < _a.length;
                _i++
            ) {
                var value = _a[_i];
                if (value == null) continue;
                node.insertBefore(value, text);
            }
        }
    }
    // clear the text data instead of removing the node, since removing it will
    // break the tree walker.
    text.data = "";
}
/**
 * Apply template values to an element's attribute.
 */
function apply_attribute_value(elm, attr, values) {
    var parts = attr.value.split(placeholder_regex);
    if (!parts || parts.length == 1) {
        return;
    }
    if (attr.localName.startsWith("on")) {
        throw new Error(
            "Cannot bind to event handler ".concat(attr.localName, "."),
        );
    }
    if (parts.length == 3 && parts[0] == "" && parts[2] == "") {
        // special case of attr="${value}", which explicitly handles true/false
        var value = values[parseInt(parts[1], 10)];
        if (value === true) {
            attr.value = "";
        } else if (value === false || value === null || value === undefined) {
            elm.removeAttribute(attr.name);
        } else {
            attr.value = convert_value_for_attr(value, attr.name);
        }
        return;
    }
    attr.value = attr.value.replaceAll(placeholder_regex, function (_, number) {
        var value = values[parseInt(number, 10)];
        return convert_value_for_attr(value, attr.localName);
    });
}
function convert_value_for_content(value) {
    var _i, value_1, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (value == null || value == undefined) {
                    return [2 /*return*/];
                }
                if (!is_primitive(value)) return [3 /*break*/, 2];
                return [4 /*yield*/, new Text(value.toString())];
            case 1:
                _a.sent();
                return [2 /*return*/];
            case 2:
                if (
                    !(
                        value instanceof Node ||
                        value instanceof DocumentFragment
                    )
                )
                    return [3 /*break*/, 4];
                return [4 /*yield*/, value];
            case 3:
                _a.sent();
                return [2 /*return*/];
            case 4:
                if (!is_iterable(value)) return [3 /*break*/, 9];
                (_i = 0), (value_1 = value);
                _a.label = 5;
            case 5:
                if (!(_i < value_1.length)) return [3 /*break*/, 8];
                i = value_1[_i];
                return [5 /*yield**/, __values(convert_value_for_content(i))];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8:
                return [2 /*return*/];
            case 9:
                throw new Error("Invalid value ".concat(value));
        }
    });
}
function convert_value_for_attr(value, attr_name) {
    if (value == null || value == undefined) {
        return "";
    }
    if (is_primitive(value)) {
        return value.toString();
    }
    if (is_iterable(value)) {
        return Array.from(value)
            .map(function (v) {
                return convert_value_for_attr(v, attr_name);
            })
            .join("");
    }
    throw new Error("Invalid value ".concat(value));
}

function readFilePromise (file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            resolve({
                name: file.name,
                content: content,
            });
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsText(file);
    });
}