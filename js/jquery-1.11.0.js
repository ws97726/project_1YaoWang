/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */

(function (global, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        // For CommonJS and CommonJS-like environments where a proper window is present,
        // execute the factory and get jQuery
        // For environments that do not inherently posses a window with a document
        // (such as Node.js), expose a jQuery-making factory as module.exports
        // This accentuates the need for the creation of a real window
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

    // Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    // Can't do this because several apps including ASP.NET trace
    // the stack via arguments.caller.callee and Firefox dies if
    // you try to trace through "use strict" call chains. (#13335)
    // Support: Firefox 18+
    //

    var deletedIds = [];

    var slice = deletedIds.slice;

    var concat = deletedIds.concat;

    var push = deletedIds.push;

    var indexOf = deletedIds.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var trim = "".trim;

    var support = {};



    var
        version = "1.11.0",

        // Define a local copy of jQuery
        jQuery = function (selector, context) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
        },

        // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,

        // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function (all, letter) {
            return letter.toUpperCase();
        };

    jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // Start with an empty selector
        selector: "",

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function () {
            return slice.call(this);
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function (num) {
            return num != null ?

                // Return a 'clean' array
                (num < 0 ? this[num + this.length] : this[num]) :

                // Return just the object
                slice.call(this);
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function (elems) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;
            ret.context = this.context;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each: function (callback, args) {
            return jQuery.each(this, callback, args);
        },

        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },

        slice: function () {
            return this.pushStack(slice.apply(this, arguments));
        },

        first: function () {
            return this.eq(0);
        },

        last: function () {
            return this.eq(-1);
        },

        eq: function (i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },

        end: function () {
            return this.prevObject || this.constructor(null);
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    };

    jQuery.extend = jQuery.fn.extend = function () {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function (msg) {
            throw new Error(msg);
        },

        noop: function () {},

        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction: function (obj) {
            return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray || function (obj) {
            return jQuery.type(obj) === "array";
        },

        isWindow: function (obj) {
            /* jshint eqeqeq: false */
            return obj != null && obj == obj.window;
        },

        isNumeric: function (obj) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            return obj - parseFloat(obj) >= 0;
        },

        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },

        isPlainObject: function (obj) {
            var key;

            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }

            try {
                // Not own constructor property must be Object
                if (obj.constructor &&
                    !hasOwn.call(obj, "constructor") &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }

            // Support: IE<9
            // Handle iteration over inherited properties before own properties.
            if (support.ownLast) {
                for (key in obj) {
                    return hasOwn.call(obj, key);
                }
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            for (key in obj) {}

            return key === undefined || hasOwn.call(obj, key);
        },

        type: function (obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        },

        // Evaluates a script in a global context
        // Workarounds based on findings by Jim Driscoll
        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
        globalEval: function (data) {
            if (data && jQuery.trim(data)) {
                // We use execScript on Internet Explorer
                // We use an anonymous function so that context is window
                // rather than jQuery in Firefox
                (window.execScript || function (data) {
                    window["eval"].call(window, data);
                })(data);
            }
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function (string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },

        nodeName: function (elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        // args is for internal usage only
        each: function (obj, callback, args) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike(obj);

            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                }

                // A special, fast, case for the most common use of each
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                }
            }

            return obj;
        },

        // Use native String.trim function wherever possible
        trim: trim && !trim.call("\uFEFF\xA0") ?
            function (text) {
                return text == null ?
                    "" :
                    trim.call(text);
            } :

            // Otherwise use our own trimming functionality
            function (text) {
                return text == null ?
                    "" :
                    (text + "").replace(rtrim, "");
            },

        // results is for internal usage only
        makeArray: function (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret,
                        typeof arr === "string" ? [arr] : arr
                    );
                } else {
                    push.call(ret, arr);
                }
            }

            return ret;
        },

        inArray: function (elem, arr, i) {
            var len;

            if (arr) {
                if (indexOf) {
                    return indexOf.call(arr, elem, i);
                }

                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

                for (; i < len; i++) {
                    // Skip accessing in sparse arrays
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }

            return -1;
        },

        merge: function (first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            while (j < len) {
                first[i++] = second[j++];
            }

            // Support: IE<9
            // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
            if (len !== len) {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }

            first.length = i;

            return first;
        },

        grep: function (elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function (elems, callback, arg) {
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike(elems),
                ret = [];

            // Go through the array, translating each of the items to their new values
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }

                // Go through every key on the object,
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply([], ret);
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function (fn, context) {
            var args, proxy, tmp;

            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }

            // Simulated bind
            args = slice.call(arguments, 2);
            proxy = function () {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        now: function () {
            return +(new Date());
        },

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });

    // Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    function isArraylike(obj) {
        var length = obj.length,
            type = jQuery.type(obj);

        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    }
    var Sizzle =
        /*!
         * Sizzle CSS Selector Engine v1.10.16
         * http://sizzlejs.com/
         *
         * Copyright 2013 jQuery Foundation, Inc. and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2014-01-13
         */
        (function (window) {

            var i,
                support,
                Expr,
                getText,
                isXML,
                compile,
                outermostContext,
                sortInput,
                hasDuplicate,

                // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

                // Instance-specific data
                expando = "sizzle" + -(new Date()),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function (a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                    }
                    return 0;
                },

                // General-purpose constants
                strundefined = typeof undefined,
                MAX_NEGATIVE = 1 << 31,

                // Instance methods
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                // Use a stripped-down indexOf if we can't use a native one
                indexOf = arr.indexOf || function (elem) {
                    var i = 0,
                        len = this.length;
                    for (; i < len; i++) {
                        if (this[i] === elem) {
                            return i;
                        }
                    }
                    return -1;
                },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

                // Regular expressions

                // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",
                // http://www.w3.org/TR/css3-syntax/#characters
                characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

                // Loosely modeled on CSS identifier characters
                // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
                // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                identifier = characterEncoding.replace("w", "w#"),

                // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
                attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
                "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

                // Prefer arguments quoted,
                //   then not containing pseudos/brackets,
                //   then attribute selectors/non-parenthetical expressions,
                //   then anything else
                // These preferences are here to reduce the number of selectors
                //   needing tokenize in the PSEUDO preFilter
                pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",

                // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

                rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),

                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),

                matchExpr = {
                    "ID": new RegExp("^#(" + characterEncoding + ")"),
                    "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
                    "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                    "ATTR": new RegExp("^" + attributes),
                    "PSEUDO": new RegExp("^" + pseudos),
                    "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                        "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },

                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rnative = /^[^{]+\{\s*\[native \w/,

                // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rsibling = /[+~]/,
                rescape = /'|\\/g,

                // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                funescape = function (_, escaped, escapedWhitespace) {
                    var high = "0x" + escaped - 0x10000;
                    // NaN means non-codepoint
                    // Support: Firefox
                    // Workaround erroneous numeric interpretation of +"0x"
                    return high !== high || escapedWhitespace ?
                        escaped :
                        high < 0 ?
                        // BMP codepoint
                        String.fromCharCode(high + 0x10000) :
                        // Supplemental Plane codepoint (surrogate pair)
                        String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
                };

            // Optimize for push.apply( _, NodeList )
            try {
                push.apply(
                    (arr = slice.call(preferredDoc.childNodes)),
                    preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[preferredDoc.childNodes.length].nodeType;
            } catch (e) {
                push = {
                    apply: arr.length ?

                        // Leverage slice if possible
                        function (target, els) {
                            push_native.apply(target, slice.call(els));
                        } :

                        // Support: IE<9
                        // Otherwise append directly
                        function (target, els) {
                            var j = target.length,
                                i = 0;
                            // Can't trust NodeList.length
                            while ((target[j++] = els[i++])) {}
                            target.length = j - 1;
                        }
                };
            }

            function Sizzle(selector, context, results, seed) {
                var match, elem, m, nodeType,
                    // QSA vars
                    i, groups, old, nid, newContext, newSelector;

                if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                    setDocument(context);
                }

                context = context || document;
                results = results || [];

                if (!selector || typeof selector !== "string") {
                    return results;
                }

                if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                    return [];
                }

                if (documentIsHTML && !seed) {

                    // Shortcuts
                    if ((match = rquickExpr.exec(selector))) {
                        // Speed-up: Sizzle("#ID")
                        if ((m = match[1])) {
                            if (nodeType === 9) {
                                elem = context.getElementById(m);
                                // Check parentNode to catch when Blackberry 4.6 returns
                                // nodes that are no longer in the document (jQuery #6963)
                                if (elem && elem.parentNode) {
                                    // Handle the case where IE, Opera, and Webkit return items
                                    // by name instead of ID
                                    if (elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                } else {
                                    return results;
                                }
                            } else {
                                // Context is not a document
                                if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
                                    contains(context, elem) && elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            }

                            // Speed-up: Sizzle("TAG")
                        } else if (match[2]) {
                            push.apply(results, context.getElementsByTagName(selector));
                            return results;

                            // Speed-up: Sizzle(".CLASS")
                        } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                            push.apply(results, context.getElementsByClassName(m));
                            return results;
                        }
                    }

                    // QSA path
                    if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        nid = old = expando;
                        newContext = context;
                        newSelector = nodeType === 9 && selector;

                        // qSA works strangely on Element-rooted queries
                        // We can work around this by specifying an extra ID on the root
                        // and working up from there (Thanks to Andrew Dupont for the technique)
                        // IE 8 doesn't work on object elements
                        if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            groups = tokenize(selector);

                            if ((old = context.getAttribute("id"))) {
                                nid = old.replace(rescape, "\\$&");
                            } else {
                                context.setAttribute("id", nid);
                            }
                            nid = "[id='" + nid + "'] ";

                            i = groups.length;
                            while (i--) {
                                groups[i] = nid + toSelector(groups[i]);
                            }
                            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                            newSelector = groups.join(",");
                        }

                        if (newSelector) {
                            try {
                                push.apply(results,
                                    newContext.querySelectorAll(newSelector)
                                );
                                return results;
                            } catch (qsaError) {} finally {
                                if (!old) {
                                    context.removeAttribute("id");
                                }
                            }
                        }
                    }
                }

                // All others
                return select(selector.replace(rtrim, "$1"), context, results, seed);
            }

            /**
             * Create key-value caches of limited size
             * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];

                function cache(key, value) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if (keys.push(key + " ") > Expr.cacheLength) {
                        // Only keep the most recent entries
                        delete cache[keys.shift()];
                    }
                    return (cache[key + " "] = value);
                }
                return cache;
            }

            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction(fn) {
                fn[expando] = true;
                return fn;
            }

            /**
             * Support testing using an element
             * @param {Function} fn Passed the created div and expects a boolean result
             */
            function assert(fn) {
                var div = document.createElement("div");

                try {
                    return !!fn(div);
                } catch (e) {
                    return false;
                } finally {
                    // Remove from its parent by default
                    if (div.parentNode) {
                        div.parentNode.removeChild(div);
                    }
                    // release memory in IE
                    div = null;
                }
            }

            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle(attrs, handler) {
                var arr = attrs.split("|"),
                    i = attrs.length;

                while (i--) {
                    Expr.attrHandle[arr[i]] = handler;
                }
            }

            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck(a, b) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                    (~b.sourceIndex || MAX_NEGATIVE) -
                    (~a.sourceIndex || MAX_NEGATIVE);

                // Use IE sourceIndex if available on both nodes
                if (diff) {
                    return diff;
                }

                // Check if b follows a
                if (cur) {
                    while ((cur = cur.nextSibling)) {
                        if (cur === b) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1;
            }

            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo(fn) {
                return markFunction(function (argument) {
                    argument = +argument;
                    return markFunction(function (seed, matches) {
                        var j,
                            matchIndexes = fn([], seed.length, argument),
                            i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while (i--) {
                            if (seed[(j = matchIndexes[i])]) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }

            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext(context) {
                return context && typeof context.getElementsByTagName !== strundefined && context;
            }

            // Expose support vars for convenience
            support = Sizzle.support = {};

            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function (elem) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };

            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function (node) {
                var hasCompare,
                    doc = node ? node.ownerDocument || node : preferredDoc,
                    parent = doc.defaultView;

                // If no document and documentElement is available, return
                if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document;
                }

                // Set our document
                document = doc;
                docElem = doc.documentElement;

                // Support tests
                documentIsHTML = !isXML(doc);

                // Support: IE>8
                // If iframe document is assigned to "document" variable and if iframe has been reloaded,
                // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
                // IE6-8 do not support the defaultView property so parent will be undefined
                if (parent && parent !== parent.top) {
                    // IE11 does not have attachEvent, so all must suffer
                    if (parent.addEventListener) {
                        parent.addEventListener("unload", function () {
                            setDocument();
                        }, false);
                    } else if (parent.attachEvent) {
                        parent.attachEvent("onunload", function () {
                            setDocument();
                        });
                    }
                }

                /* Attributes
                ---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
                support.attributes = assert(function (div) {
                    div.className = "i";
                    return !div.getAttribute("className");
                });

                /* getElement(s)By*
                ---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function (div) {
                    div.appendChild(doc.createComment(""));
                    return !div.getElementsByTagName("*").length;
                });

                // Check if getElementsByClassName can be trusted
                support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function (div) {
                    div.innerHTML = "<div class='a'></div><div class='a i'></div>";

                    // Support: Safari<4
                    // Catch class over-caching
                    div.firstChild.className = "i";
                    // Support: Opera<10
                    // Catch gEBCN failure to find non-leading classes
                    return div.getElementsByClassName("i").length === 2;
                });

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function (div) {
                    docElem.appendChild(div).id = expando;
                    return !doc.getElementsByName || !doc.getElementsByName(expando).length;
                });

                // ID find and filter
                if (support.getById) {
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== strundefined && documentIsHTML) {
                            var m = context.getElementById(id);
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            return m && m.parentNode ? [m] : [];
                        }
                    };
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                } else {
                    // Support: IE6/7
                    // getElementById is not reliable as a find shortcut
                    delete Expr.find["ID"];

                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function (tag, context) {
                        if (typeof context.getElementsByTagName !== strundefined) {
                            return context.getElementsByTagName(tag);
                        }
                    } :
                    function (tag, context) {
                        var elem,
                            tmp = [],
                            i = 0,
                            results = context.getElementsByTagName(tag);

                        // Filter out possible comments
                        if (tag === "*") {
                            while ((elem = results[i++])) {
                                if (elem.nodeType === 1) {
                                    tmp.push(elem);
                                }
                            }

                            return tmp;
                        }
                        return results;
                    };

                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
                    if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
                        return context.getElementsByClassName(className);
                    }
                };

                /* QSA/matchesSelector
                ---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See http://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ((support.qsa = rnative.test(doc.querySelectorAll))) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function (div) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // http://bugs.jquery.com/ticket/12359
                        div.innerHTML = "<select t=''><option selected=''></option></select>";

                        // Support: IE8, Opera 10-12
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        if (div.querySelectorAll("[t^='']").length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                        }

                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if (!div.querySelectorAll("[selected]").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if (!div.querySelectorAll(":checked").length) {
                            rbuggyQSA.push(":checked");
                        }
                    });

                    assert(function (div) {
                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = doc.createElement("input");
                        input.setAttribute("type", "hidden");
                        div.appendChild(input).setAttribute("name", "D");

                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if (div.querySelectorAll("[name=d]").length) {
                            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if (!div.querySelectorAll(":enabled").length) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }

                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        div.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }

                if ((support.matchesSelector = rnative.test((matches = docElem.webkitMatchesSelector ||
                        docElem.mozMatchesSelector ||
                        docElem.oMatchesSelector ||
                        docElem.msMatchesSelector)))) {

                    assert(function (div) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call(div, "div");

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call(div, "[s!='']:x");
                        rbuggyMatches.push("!=", pseudos);
                    });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

                /* Contains
                ---------------------------------------------------------------------- */
                hasCompare = rnative.test(docElem.compareDocumentPosition);

                // Element contains another
                // Purposefully does not implement inclusive descendent
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test(docElem.contains) ?
                    function (a, b) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !!(bup && bup.nodeType === 1 && (
                            adown.contains ?
                            adown.contains(bup) :
                            a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
                        ));
                    } :
                    function (a, b) {
                        if (b) {
                            while ((b = b.parentNode)) {
                                if (b === a) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                /* Sorting
                ---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare ?
                    function (a, b) {

                        // Flag for duplicate removal
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if (compare) {
                            return compare;
                        }

                        // Calculate position if both inputs belong to the same document
                        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
                            a.compareDocumentPosition(b) :

                            // Otherwise we know they are disconnected
                            1;

                        // Disconnected nodes
                        if (compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

                            // Choose the first element that is related to our preferred document
                            if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                                return -1;
                            }
                            if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                                return 1;
                            }

                            // Maintain original order
                            return sortInput ?
                                (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
                                0;
                        }

                        return compare & 4 ? -1 : 1;
                    } :
                    function (a, b) {
                        // Exit early if the nodes are identical
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [a],
                            bp = [b];

                        // Parentless nodes are either documents or disconnected
                        if (!aup || !bup) {
                            return a === doc ? -1 :
                                b === doc ? 1 :
                                aup ? -1 :
                                bup ? 1 :
                                sortInput ?
                                (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
                                0;

                            // If the nodes are siblings, we can do a quick check
                        } else if (aup === bup) {
                            return siblingCheck(a, b);
                        }

                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ((cur = cur.parentNode)) {
                            ap.unshift(cur);
                        }
                        cur = b;
                        while ((cur = cur.parentNode)) {
                            bp.unshift(cur);
                        }

                        // Walk down the tree looking for a discrepancy
                        while (ap[i] === bp[i]) {
                            i++;
                        }

                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck(ap[i], bp[i]) :

                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                            bp[i] === preferredDoc ? 1 :
                            0;
                    };

                return doc;
            };

            Sizzle.matches = function (expr, elements) {
                return Sizzle(expr, null, null, elements);
            };

            Sizzle.matchesSelector = function (elem, expr) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }

                // Make sure that attribute selectors are quoted
                expr = expr.replace(rattributeQuotes, "='$1']");

                if (support.matchesSelector && documentIsHTML &&
                    (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                    (!rbuggyQSA || !rbuggyQSA.test(expr))) {

                    try {
                        var ret = matches.call(elem, expr);

                        // IE 9's matchesSelector returns false on disconnected nodes
                        if (ret || support.disconnectedMatch ||
                            // As well, disconnected nodes are said to be in a document
                            // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11) {
                            return ret;
                        }
                    } catch (e) {}
                }

                return Sizzle(expr, document, null, [elem]).length > 0;
            };

            Sizzle.contains = function (context, elem) {
                // Set document vars if needed
                if ((context.ownerDocument || context) !== document) {
                    setDocument(context);
                }
                return contains(context, elem);
            };

            Sizzle.attr = function (elem, name) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }

                var fn = Expr.attrHandle[name.toLowerCase()],
                    // Don't get fooled by Object.prototype properties (jQuery #13807)
                    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                    fn(elem, name, !documentIsHTML) :
                    undefined;

                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                    elem.getAttribute(name) :
                    (val = elem.getAttributeNode(name)) && val.specified ?
                    val.value :
                    null;
            };

            Sizzle.error = function (msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            };

            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function (results) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);

                if (hasDuplicate) {
                    while ((elem = results[i++])) {
                        if (elem === results[i]) {
                            j = duplicates.push(i);
                        }
                    }
                    while (j--) {
                        results.splice(duplicates[j], 1);
                    }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
            };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function (elem) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if (!nodeType) {
                    // If no nodeType, this is expected to be an array
                    while ((node = elem[i++])) {
                        // Do not traverse comment nodes
                        ret += getText(node);
                    }
                } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
            };

            Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                    ">": {
                        dir: "parentNode",
                        first: true
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: true
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },

                preFilter: {
                    "ATTR": function (match) {
                        match[1] = match[1].replace(runescape, funescape);

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = (match[4] || match[5] || "").replace(runescape, funescape);

                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice(0, 4);
                    },

                    "CHILD": function (match) {
                        /* matches from matchExpr["CHILD"]
                        	1 type (only|nth|...)
                        	2 what (child|of-type)
                        	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                        	4 xn-component of xn+y argument ([+-]?\d*n|)
                        	5 sign of xn-component
                        	6 x of xn-component
                        	7 sign of y-component
                        	8 y of y-component
                        */
                        match[1] = match[1].toLowerCase();

                        if (match[1].slice(0, 3) === "nth") {
                            // nth-* requires argument
                            if (!match[3]) {
                                Sizzle.error(match[0]);
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                            match[5] = +((match[7] + match[8]) || match[3] === "odd");

                            // other types prohibit arguments
                        } else if (match[3]) {
                            Sizzle.error(match[0]);
                        }

                        return match;
                    },

                    "PSEUDO": function (match) {
                        var excess,
                            unquoted = !match[5] && match[2];

                        if (matchExpr["CHILD"].test(match[0])) {
                            return null;
                        }

                        // Accept quoted arguments as-is
                        if (match[3] && match[4] !== undefined) {
                            match[2] = match[4];

                            // Strip excess characters from unquoted arguments
                        } else if (unquoted && rpseudo.test(unquoted) &&
                            // Get excess from tokenize (recursively)
                            (excess = tokenize(unquoted, true)) &&
                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                            // excess is a negative index
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess);
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice(0, 3);
                    }
                },

                filter: {

                    "TAG": function (nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function () {
                                return true;
                            } :
                            function (elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },

                    "CLASS": function (className) {
                        var pattern = classCache[className + " "];

                        return pattern ||
                            (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                            classCache(className, function (elem) {
                                return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                            });
                    },

                    "ATTR": function (name, operator, check) {
                        return function (elem) {
                            var result = Sizzle.attr(elem, name);

                            if (result == null) {
                                return operator === "!=";
                            }
                            if (!operator) {
                                return true;
                            }

                            result += "";

                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                operator === "^=" ? check && result.indexOf(check) === 0 :
                                operator === "*=" ? check && result.indexOf(check) > -1 :
                                operator === "$=" ? check && result.slice(-check.length) === check :
                                operator === "~=" ? (" " + result + " ").indexOf(check) > -1 :
                                operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                false;
                        };
                    },

                    "CHILD": function (type, what, argument, first, last) {
                        var simple = type.slice(0, 3) !== "nth",
                            forward = type.slice(-4) !== "last",
                            ofType = what === "of-type";

                        return first === 1 && last === 0 ?

                            // Shortcut for :nth-*(n)
                            function (elem) {
                                return !!elem.parentNode;
                            } :

                            function (elem, context, xml) {
                                var cache, outerCache, node, diff, nodeIndex, start,
                                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType;

                                if (parent) {

                                    // :(first|last|only)-(child|of-type)
                                    if (simple) {
                                        while (dir) {
                                            node = elem;
                                            while ((node = node[dir])) {
                                                if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }

                                    start = [forward ? parent.firstChild : parent.lastChild];

                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if (forward && useCache) {
                                        // Seek `elem` from a previously-cached index
                                        outerCache = parent[expando] || (parent[expando] = {});
                                        cache = outerCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = cache[0] === dirruns && cache[2];
                                        node = nodeIndex && parent.childNodes[nodeIndex];

                                        while ((node = ++nodeIndex && node && node[dir] ||

                                                // Fallback to seeking `elem` from the start
                                                (diff = nodeIndex = 0) || start.pop())) {

                                            // When found, cache indexes on `parent` and break
                                            if (node.nodeType === 1 && ++diff && node === elem) {
                                                outerCache[type] = [dirruns, nodeIndex, diff];
                                                break;
                                            }
                                        }

                                        // Use previously-cached element index if available
                                    } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                        diff = cache[1];

                                        // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                    } else {
                                        // Use the same loop as above to seek `elem` from the start
                                        while ((node = ++nodeIndex && node && node[dir] ||
                                                (diff = nodeIndex = 0) || start.pop())) {

                                            if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                                // Cache the index of each encountered element
                                                if (useCache) {
                                                    (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
                                                }

                                                if (node === elem) {
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || (diff % first === 0 && diff / first >= 0);
                                }
                            };
                    },

                    "PSEUDO": function (pseudo, argument) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                            fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                            Sizzle.error("unsupported pseudo: " + pseudo);

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if (fn[expando]) {
                            return fn(argument);
                        }

                        // But maintain support for old signatures
                        if (fn.length > 1) {
                            args = [pseudo, pseudo, "", argument];
                            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                                markFunction(function (seed, matches) {
                                    var idx,
                                        matched = fn(seed, argument),
                                        i = matched.length;
                                    while (i--) {
                                        idx = indexOf.call(seed, matched[i]);
                                        seed[idx] = !(matches[idx] = matched[i]);
                                    }
                                }) :
                                function (elem) {
                                    return fn(elem, 0, args);
                                };
                        }

                        return fn;
                    }
                },

                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function (selector) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                            results = [],
                            matcher = compile(selector.replace(rtrim, "$1"));

                        return matcher[expando] ?
                            markFunction(function (seed, matches, context, xml) {
                                var elem,
                                    unmatched = matcher(seed, null, xml, []),
                                    i = seed.length;

                                // Match elements unmatched by `matcher`
                                while (i--) {
                                    if ((elem = unmatched[i])) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function (elem, context, xml) {
                                input[0] = elem;
                                matcher(input, null, xml, results);
                                return !results.pop();
                            };
                    }),

                    "has": markFunction(function (selector) {
                        return function (elem) {
                            return Sizzle(selector, elem).length > 0;
                        };
                    }),

                    "contains": markFunction(function (text) {
                        return function (elem) {
                            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                        };
                    }),

                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction(function (lang) {
                        // lang value must be a valid identifier
                        if (!ridentifier.test(lang || "")) {
                            Sizzle.error("unsupported lang: " + lang);
                        }
                        lang = lang.replace(runescape, funescape).toLowerCase();
                        return function (elem) {
                            var elemLang;
                            do {
                                if ((elemLang = documentIsHTML ?
                                        elem.lang :
                                        elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return false;
                        };
                    }),

                    // Miscellaneous
                    "target": function (elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },

                    "root": function (elem) {
                        return elem === docElem;
                    },

                    "focus": function (elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },

                    // Boolean properties
                    "enabled": function (elem) {
                        return elem.disabled === false;
                    },

                    "disabled": function (elem) {
                        return elem.disabled === true;
                    },

                    "checked": function (elem) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function (elem) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if (elem.parentNode) {
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    // Contents
                    "empty": function (elem) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeType < 6) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "parent": function (elem) {
                        return !Expr.pseudos["empty"](elem);
                    },

                    // Element/input types
                    "header": function (elem) {
                        return rheader.test(elem.nodeName);
                    },

                    "input": function (elem) {
                        return rinputs.test(elem.nodeName);
                    },

                    "button": function (elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "text": function (elem) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&

                            // Support: IE<8
                            // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                    },

                    // Position-in-collection
                    "first": createPositionalPseudo(function () {
                        return [0];
                    }),

                    "last": createPositionalPseudo(function (matchIndexes, length) {
                        return [length - 1];
                    }),

                    "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
                        return [argument < 0 ? argument + length : argument];
                    }),

                    "even": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 0;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "odd": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 1;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; --i >= 0;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; ++i < length;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    })
                }
            };

            Expr.pseudos["nth"] = Expr.pseudos["eq"];

            // Add button/input type pseudos
            for (i in {
                    radio: true,
                    checkbox: true,
                    file: true,
                    password: true,
                    image: true
                }) {
                Expr.pseudos[i] = createInputPseudo(i);
            }
            for (i in {
                    submit: true,
                    reset: true
                }) {
                Expr.pseudos[i] = createButtonPseudo(i);
            }

            // Easy API for creating new setFilters
            function setFilters() {}
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            function tokenize(selector, parseOnly) {
                var matched, match, tokens, type,
                    soFar, groups, preFilters,
                    cached = tokenCache[selector + " "];

                if (cached) {
                    return parseOnly ? 0 : cached.slice(0);
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while (soFar) {

                    // Comma and first run
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice(match[0].length) || soFar;
                        }
                        groups.push((tokens = []));
                    }

                    matched = false;

                    // Combinators
                    if ((match = rcombinators.exec(soFar))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace(rtrim, " ")
                        });
                        soFar = soFar.slice(matched.length);
                    }

                    // Filters
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                                (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length);
                        }
                    }

                    if (!matched) {
                        break;
                    }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                    Sizzle.error(selector) :
                    // Cache the tokens
                    tokenCache(selector, groups).slice(0);
            }

            function toSelector(tokens) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for (; i < len; i++) {
                    selector += tokens[i].value;
                }
                return selector;
            }

            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                    checkNonElements = base && dir === "parentNode",
                    doneName = done++;

                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function (elem, context, xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                return matcher(elem, context, xml);
                            }
                        }
                    } :

                    // Check against all ancestor/preceding elements
                    function (elem, context, xml) {
                        var oldCache, outerCache,
                            newCache = [dirruns, doneName];

                        // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                        if (xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    if (matcher(elem, context, xml)) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    outerCache = elem[expando] || (elem[expando] = {});
                                    if ((oldCache = outerCache[dir]) &&
                                        oldCache[0] === dirruns && oldCache[1] === doneName) {

                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[2] = oldCache[2]);
                                    } else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        outerCache[dir] = newCache;

                                        // A match means we're done; a fail means we have to keep checking
                                        if ((newCache[2] = matcher(elem, context, xml))) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    };
            }

            function elementMatcher(matchers) {
                return matchers.length > 1 ?
                    function (elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }

            function condense(unmatched, map, filter, context, xml) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;

                for (; i < len; i++) {
                    if ((elem = unmatched[i])) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i);
                            }
                        }
                    }
                }

                return newUnmatched;
            }

            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function (seed, results, context, xml) {
                    var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                        // Get initial elements from seed or context
                        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

                        // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && (seed || !selector) ?
                        condense(elems, preMap, preFilter, context, xml) :
                        elems,

                        matcherOut = matcher ?
                        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                        postFinder || (seed ? preFilter : preexisting || postFilter) ?

                        // ...intermediate processing is necessary
                        [] :

                        // ...otherwise use results directly
                        results :
                        matcherIn;

                    // Find primary matches
                    if (matcher) {
                        matcher(matcherIn, matcherOut, context, xml);
                    }

                    // Apply postFilter
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while (i--) {
                            if ((elem = temp[i])) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                            }
                        }
                    }

                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i])) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push((matcherIn[i] = elem));
                                    }
                                }
                                postFinder(null, (matcherOut = []), temp, xml);
                            }

                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {

                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }

                        // Add elements to results, through postFinder if defined
                    } else {
                        matcherOut = condense(
                            matcherOut === results ?
                            matcherOut.splice(preexisting, matcherOut.length) :
                            matcherOut
                        );
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml);
                        } else {
                            push.apply(results, matcherOut);
                        }
                    }
                });
            }

            function matcherFromTokens(tokens) {
                var checkContext, matcher, j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[tokens[0].type],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,

                    // The foundational matcher ensures that elements are reachable from top-level context(s)
                    matchContext = addCombinator(function (elem) {
                        return elem === checkContext;
                    }, implicitRelative, true),
                    matchAnyContext = addCombinator(function (elem) {
                        return indexOf.call(checkContext, elem) > -1;
                    }, implicitRelative, true),
                    matchers = [function (elem, context, xml) {
                        return (!leadingRelative && (xml || context !== outermostContext)) || (
                            (checkContext = context).nodeType ?
                            matchContext(elem, context, xml) :
                            matchAnyContext(elem, context, xml));
                    }];

                for (; i < len; i++) {
                    if ((matcher = Expr.relative[tokens[i].type])) {
                        matchers = [addCombinator(elementMatcher(matchers), matcher)];
                    } else {
                        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

                        // Return special upon seeing a positional matcher
                        if (matcher[expando]) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for (; j < len; j++) {
                                if (Expr.relative[tokens[j].type]) {
                                    break;
                                }
                            }
                            return setMatcher(
                                i > 1 && elementMatcher(matchers),
                                i > 1 && toSelector(
                                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                    tokens.slice(0, i - 1).concat({
                                        value: tokens[i - 2].type === " " ? "*" : ""
                                    })
                                ).replace(rtrim, "$1"),
                                matcher,
                                i < j && matcherFromTokens(tokens.slice(i, j)),
                                j < len && matcherFromTokens((tokens = tokens.slice(j))),
                                j < len && toSelector(tokens)
                            );
                        }
                        matchers.push(matcher);
                    }
                }

                return elementMatcher(matchers);
            }

            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function (seed, context, xml, results, outermost) {
                        var elem, j, matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                            // We must always have either seed elements or outermost context
                            elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                            // Use integer dirruns iff this is the outermost matcher
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                            len = elems.length;

                        if (outermost) {
                            outermostContext = context !== document && context;
                        }

                        // Add elements passing elementMatchers directly to results
                        // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
                        // Support: IE<9, Safari
                        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                        for (; i !== len && (elem = elems[i]) != null; i++) {
                            if (byElement && elem) {
                                j = 0;
                                while ((matcher = elementMatchers[j++])) {
                                    if (matcher(elem, context, xml)) {
                                        results.push(elem);
                                        break;
                                    }
                                }
                                if (outermost) {
                                    dirruns = dirrunsUnique;
                                }
                            }

                            // Track unmatched elements for set filters
                            if (bySet) {
                                // They will have gone through all possible matchers
                                if ((elem = !matcher && elem)) {
                                    matchedCount--;
                                }

                                // Lengthen the array for every element, matched or not
                                if (seed) {
                                    unmatched.push(elem);
                                }
                            }
                        }

                        // Apply set filters to unmatched elements
                        matchedCount += i;
                        if (bySet && i !== matchedCount) {
                            j = 0;
                            while ((matcher = setMatchers[j++])) {
                                matcher(unmatched, setMatched, context, xml);
                            }

                            if (seed) {
                                // Reintegrate element matches to eliminate the need for sorting
                                if (matchedCount > 0) {
                                    while (i--) {
                                        if (!(unmatched[i] || setMatched[i])) {
                                            setMatched[i] = pop.call(results);
                                        }
                                    }
                                }

                                // Discard index placeholder values to get only actual matches
                                setMatched = condense(setMatched);
                            }

                            // Add matches to results
                            push.apply(results, setMatched);

                            // Seedless set matches succeeding multiple successful matchers stipulate sorting
                            if (outermost && !seed && setMatched.length > 0 &&
                                (matchedCount + setMatchers.length) > 1) {

                                Sizzle.uniqueSort(results);
                            }
                        }

                        // Override manipulation of globals by nested matchers
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup;
                        }

                        return unmatched;
                    };

                return bySet ?
                    markFunction(superMatcher) :
                    superMatcher;
            }

            compile = Sizzle.compile = function (selector, group /* Internal Use Only */ ) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[selector + " "];

                if (!cached) {
                    // Generate a function of recursive functions that can be used to check each element
                    if (!group) {
                        group = tokenize(selector);
                    }
                    i = group.length;
                    while (i--) {
                        cached = matcherFromTokens(group[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached);
                        } else {
                            elementMatchers.push(cached);
                        }
                    }

                    // Cache the compiled function
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                }
                return cached;
            };

            function multipleContexts(selector, contexts, results) {
                var i = 0,
                    len = contexts.length;
                for (; i < len; i++) {
                    Sizzle(selector, contexts[i], results);
                }
                return results;
            }

            function select(selector, context, results, seed) {
                var i, tokens, token, type, find,
                    match = tokenize(selector);

                if (!seed) {
                    // Try to minimize operations if there is only one group
                    if (match.length === 1) {

                        // Take a shortcut and set the context if the root selector is an ID
                        tokens = match[0] = match[0].slice(0);
                        if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                            support.getById && context.nodeType === 9 && documentIsHTML &&
                            Expr.relative[tokens[1].type]) {

                            context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                            if (!context) {
                                return results;
                            }
                            selector = selector.slice(tokens.shift().value.length);
                        }

                        // Fetch a seed set for right-to-left matching
                        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                        while (i--) {
                            token = tokens[i];

                            // Abort if we hit a combinator
                            if (Expr.relative[(type = token.type)]) {
                                break;
                            }
                            if ((find = Expr.find[type])) {
                                // Search, expanding context for leading sibling combinators
                                if ((seed = find(
                                        token.matches[0].replace(runescape, funescape),
                                        rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                                    ))) {

                                    // If seed is empty or no tokens remain, we can return early
                                    tokens.splice(i, 1);
                                    selector = seed.length && toSelector(tokens);
                                    if (!selector) {
                                        push.apply(results, seed);
                                        return results;
                                    }

                                    break;
                                }
                            }
                        }
                    }
                }

                // Compile and execute a filtering function
                // Provide `match` to avoid retokenization if we modified the selector above
                compile(selector, match)(
                    seed,
                    context,
                    !documentIsHTML,
                    results,
                    rsibling.test(selector) && testContext(context.parentNode) || context
                );
                return results;
            }

            // One-time assignments

            // Sort stability
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

            // Support: Chrome<14
            // Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;

            // Initialize against the default document
            setDocument();

            // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
            // Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function (div1) {
                // Should return 1, but returns 4 (following)
                return div1.compareDocumentPosition(document.createElement("div")) & 1;
            });

            // Support: IE<8
            // Prevent attribute/property "interpolation"
            // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if (!assert(function (div) {
                    div.innerHTML = "<a href='#'></a>";
                    return div.firstChild.getAttribute("href") === "#";
                })) {
                addHandle("type|href|height|width", function (elem, name, isXML) {
                    if (!isXML) {
                        return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                    }
                });
            }

            // Support: IE<9
            // Use defaultValue in place of getAttribute("value")
            if (!support.attributes || !assert(function (div) {
                    div.innerHTML = "<input/>";
                    div.firstChild.setAttribute("value", "");
                    return div.firstChild.getAttribute("value") === "";
                })) {
                addHandle("value", function (elem, name, isXML) {
                    if (!isXML && elem.nodeName.toLowerCase() === "input") {
                        return elem.defaultValue;
                    }
                });
            }

            // Support: IE<9
            // Use getAttributeNode to fetch booleans when getAttribute lies
            if (!assert(function (div) {
                    return div.getAttribute("disabled") == null;
                })) {
                addHandle(booleans, function (elem, name, isXML) {
                    var val;
                    if (!isXML) {
                        return elem[name] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
                    }
                });
            }

            return Sizzle;

        })(window);



    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;



    var rneedsContext = jQuery.expr.match.needsContext;

    var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



    var risSimple = /^.[^:#\[\.,]*$/;

    // Implement the identical functionality for filter and not
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function (elem, i) {
                /* jshint -W018 */
                return !!qualifier.call(elem, i, elem) !== not;
            });

        }

        if (qualifier.nodeType) {
            return jQuery.grep(elements, function (elem) {
                return (elem === qualifier) !== not;
            });

        }

        if (typeof qualifier === "string") {
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not);
            }

            qualifier = jQuery.filter(qualifier, elements);
        }

        return jQuery.grep(elements, function (elem) {
            return (jQuery.inArray(elem, qualifier) >= 0) !== not;
        });
    }

    jQuery.filter = function (expr, elems, not) {
        var elem = elems[0];

        if (not) {
            expr = ":not(" + expr + ")";
        }

        return elems.length === 1 && elem.nodeType === 1 ?
            jQuery.find.matchesSelector(elem, expr) ? [elem] : [] :
            jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
                return elem.nodeType === 1;
            }));
    };

    jQuery.fn.extend({
        find: function (selector) {
            var i,
                ret = [],
                self = this,
                len = self.length;

            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function () {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }

            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }

            // Needed because $( selector, context ) becomes $( context ).find( selector )
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function (selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function (selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function (selector) {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test(selector) ?
                jQuery(selector) :
                selector || [],
                false
            ).length;
        }
    });


    // Initialize a jQuery object


    // A central reference to the root jQuery(document)
    var rootjQuery,

        // Use the correct document accordingly with window argument (sandbox)
        document = window.document,

        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

        init = jQuery.fn.init = function (selector, context) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }

            // Handle HTML strings
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [null, selector, null];

                } else {
                    match = rquickExpr.exec(selector);
                }

                // Match html or make sure no context is specified for #id
                if (match && (match[1] || !context)) {

                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;

                        // scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge(this, jQuery.parseHTML(
                            match[1],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ));

                        // HANDLE: $(html, props)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                // Properties of context are called as methods if possible
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById(match[2]);

                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        if (elem && elem.parentNode) {
                            // Handle the case where IE and Opera return items
                            // by name instead of ID
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector);
                            }

                            // Otherwise, we inject the element directly into the jQuery object
                            this.length = 1;
                            this[0] = elem;
                        }

                        this.context = document;
                        this.selector = selector;
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if (!context || context.jquery) {
                    return (context || rootjQuery).find(selector);

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor(context).find(selector);
                }

                // HANDLE: $(DOMElement)
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if (jQuery.isFunction(selector)) {
                return typeof rootjQuery.ready !== "undefined" ?
                    rootjQuery.ready(selector) :
                    // Execute immediately if ready is not present
                    selector(jQuery);
            }

            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }

            return jQuery.makeArray(selector, this);
        };

    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery(document);


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
        // methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };

    jQuery.extend({
        dir: function (elem, dir, until) {
            var matched = [],
                cur = elem[dir];

            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },

        sibling: function (n, elem) {
            var r = [];

            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }

            return r;
        }
    });

    jQuery.fn.extend({
        has: function (target) {
            var i,
                targets = jQuery(target, this),
                len = targets.length;

            return this.filter(function () {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },

        closest: function (selectors, context) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
                jQuery(selectors, context || this.context) :
                0;

            for (; i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                    // Always skip document fragments
                    if (cur.nodeType < 11 && (pos ?
                            pos.index(cur) > -1 :

                            // Don't pass non-elements to Sizzle
                            cur.nodeType === 1 &&
                            jQuery.find.matchesSelector(cur, selectors))) {

                        matched.push(cur);
                        break;
                    }
                }
            }

            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },

        // Determine the position of an element within
        // the matched set of elements
        index: function (elem) {

            // No argument, return index in parent
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
            }

            // index in selector
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem));
            }

            // Locate the position of the desired element
            return jQuery.inArray(
                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem, this);
        },

        add: function (selector, context) {
            return this.pushStack(
                jQuery.unique(
                    jQuery.merge(this.get(), jQuery(selector, context))
                )
            );
        },

        addBack: function (selector) {
            return this.add(selector == null ?
                this.prevObject : this.prevObject.filter(selector)
            );
        }
    });

    function sibling(cur, dir) {
        do {
            cur = cur[dir];
        } while (cur && cur.nodeType !== 1);

        return cur;
    }

    jQuery.each({
        parent: function (elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function (elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function (elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function (elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function (elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function (elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function (elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function (elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function (elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function (elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function (elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function (elem) {
            return jQuery.nodeName(elem, "iframe") ?
                elem.contentDocument || elem.contentWindow.document :
                jQuery.merge([], elem.childNodes);
        }
    }, function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
            var ret = jQuery.map(this, fn, until);

            if (name.slice(-5) !== "Until") {
                selector = until;
            }

            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }

            if (this.length > 1) {
                // Remove duplicates
                if (!guaranteedUnique[name]) {
                    ret = jQuery.unique(ret);
                }

                // Reverse order for parents* and prev-derivatives
                if (rparentsprev.test(name)) {
                    ret = ret.reverse();
                }
            }

            return this.pushStack(ret);
        };
    });
    var rnotwhite = (/\S+/g);



    // String to Object options format cache
    var optionsCache = {};

    // Convert String-formatted options into Object-formatted ones and store in cache
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
            object[flag] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function (options) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            (optionsCache[options] || createOptions(options)) :
            jQuery.extend({}, options);

        var // Flag to know if list is currently firing
            firing,
            // Last fire value (for non-forgettable lists)
            memory,
            // Flag to know if list was already fired
            fired,
            // End of the loop when firing
            firingLength,
            // Index of currently firing callback (modified by remove if needed)
            firingIndex,
            // First callback to fire (used internally by add and fireWith)
            firingStart,
            // Actual callback list
            list = [],
            // Stack of fire calls for repeatable lists
            stack = !options.once && [],
            // Fire callbacks
            fire = function (data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false; // To prevent further calls using add
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift());
                        }
                    } else if (memory) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
            // Actual Callbacks object
            self = {
                // Add a callback or a collection of callbacks to the list
                add: function () {
                    if (list) {
                        // First, we save the current length
                        var start = list.length;
                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                var type = jQuery.type(arg);
                                if (type === "function") {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && type !== "string") {
                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);
                        // Do we need to add the callbacks to the
                        // current firing batch?
                        if (firing) {
                            firingLength = list.length;
                            // With memory, if we're not firing then
                            // we should call right away
                        } else if (memory) {
                            firingStart = start;
                            fire(memory);
                        }
                    }
                    return this;
                },
                // Remove a callback from the list
                remove: function () {
                    if (list) {
                        jQuery.each(arguments, function (_, arg) {
                            var index;
                            while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                list.splice(index, 1);
                                // Handle firing indexes
                                if (firing) {
                                    if (index <= firingLength) {
                                        firingLength--;
                                    }
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function (fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
                },
                // Remove all callbacks from the list
                empty: function () {
                    list = [];
                    firingLength = 0;
                    return this;
                },
                // Have the list do nothing anymore
                disable: function () {
                    list = stack = memory = undefined;
                    return this;
                },
                // Is it disabled?
                disabled: function () {
                    return !list;
                },
                // Lock the list in its current state
                lock: function () {
                    stack = undefined;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                // Is it locked?
                locked: function () {
                    return !stack;
                },
                // Call all callbacks with the given context and arguments
                fireWith: function (context, args) {
                    if (list && (!fired || stack)) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        if (firing) {
                            stack.push(args);
                        } else {
                            fire(args);
                        }
                    }
                    return this;
                },
                // Call all the callbacks with the given arguments
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },
                // To know if the callbacks have already been called at least once
                fired: function () {
                    return !!fired;
                }
            };

        return self;
    };


    jQuery.extend({

        Deferred: function (func) {
            var tuples = [
                    // action, add listener, listener list, final state
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                ],
                state = "pending",
                promise = {
                    state: function () {
                        return state;
                    },
                    always: function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function ( /* fnDone, fnFail, fnProgress */ ) {
                        var fns = arguments;
                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (i, tuple) {
                                var fn = jQuery.isFunction(fns[i]) && fns[i];
                                // deferred[ done | fail | progress ] for forwarding actions to newDefer
                                deferred[tuple[1]](function () {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise()
                                            .done(newDefer.resolve)
                                            .fail(newDefer.reject)
                                            .progress(newDefer.notify);
                                    } else {
                                        newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function (obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                },
                deferred = {};

            // Keep pipe for back-compat
            promise.pipe = promise.then;

            // Add list-specific methods
            jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];

                // promise[ done | fail | progress ] = list.add
                promise[tuple[1]] = list.add;

                // Handle state
                if (stateString) {
                    list.add(function () {
                        // state = [ resolved | rejected ]
                        state = stateString;

                        // [ reject_list | resolve_list ].disable; progress_list.lock
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }

                // deferred[ resolve | reject | notify ]
                deferred[tuple[0]] = function () {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });

            // Make the deferred a promise
            promise.promise(deferred);

            // Call given func if any
            if (func) {
                func.call(deferred, deferred);
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function (subordinate /* , ..., subordinateN */ ) {
            var i = 0,
                resolveValues = slice.call(arguments),
                length = resolveValues.length,

                // the count of uncompleted subordinates
                remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,

                // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

                // Update function for both resolve and progress values
                updateFunc = function (i, contexts, values) {
                    return function (value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values);

                        } else if (!(--remaining)) {
                            deferred.resolveWith(contexts, values);
                        }
                    };
                },

                progressValues, progressContexts, resolveContexts;

            // add listeners to Deferred subordinates; treat others as resolved
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise()
                            .done(updateFunc(i, resolveContexts, resolveValues))
                            .fail(deferred.reject)
                            .progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }

            // if we're not waiting on anything, resolve the master
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }

            return deferred.promise();
        }
    });


    // The deferred used on DOM ready
    var readyList;

    jQuery.fn.ready = function (fn) {
        // Add the callback
        jQuery.ready.promise().done(fn);

        return this;
    };

    jQuery.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Hold (or release) the ready event
        holdReady: function (hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },

        // Handle when the DOM is ready
        ready: function (wait) {

            // Abort if there are pending holds or we're already ready
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }

            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if (!document.body) {
                return setTimeout(jQuery.ready);
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith(document, [jQuery]);

            // Trigger any bound ready events
            if (jQuery.fn.trigger) {
                jQuery(document).trigger("ready").off("ready");
            }
        }
    });

    /**
     * Clean-up method for dom ready events
     */
    function detach() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed, false);
            window.removeEventListener("load", completed, false);

        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    }

    /**
     * The ready event handler and self cleanup method
     */
    function completed() {
        // readyState === "complete" is good enough for us to call the dom ready in oldIE
        if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
            detach();
            jQuery.ready();
        }
    }

    jQuery.ready.promise = function (obj) {
        if (!readyList) {

            readyList = jQuery.Deferred();

            // Catch cases where $(document).ready() is called after the browser event has already occurred.
            // we once tried to use readyState "interactive" here, but it caused issues like the one
            // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
            if (document.readyState === "complete") {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                setTimeout(jQuery.ready);

                // Standards-based browsers support DOMContentLoaded
            } else if (document.addEventListener) {
                // Use the handy event callback
                document.addEventListener("DOMContentLoaded", completed, false);

                // A fallback to window.onload, that will always work
                window.addEventListener("load", completed, false);

                // If IE event model is used
            } else {
                // Ensure firing before onload, maybe late but safe also for iframes
                document.attachEvent("onreadystatechange", completed);

                // A fallback to window.onload, that will always work
                window.attachEvent("onload", completed);

                // If IE and not a frame
                // continually check to see if the document is ready
                var top = false;

                try {
                    top = window.frameElement == null && document.documentElement;
                } catch (e) {}

                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {

                            try {
                                // Use the trick by Diego Perini
                                // http://javascript.nwbox.com/IEContentLoaded/
                                top.doScroll("left");
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50);
                            }

                            // detach all dom ready events
                            detach();

                            // and execute any waiting functions
                            jQuery.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise(obj);
    };


    var strundefined = typeof undefined;



    // Support: IE<9
    // Iteration over object's inherited properties before its own
    var i;
    for (i in jQuery(support)) {
        break;
    }
    support.ownLast = i !== "0";

    // Note: most support tests are defined in their respective modules.
    // false until the test is run
    support.inlineBlockNeedsLayout = false;

    jQuery(function () {
        // We need to execute this one support test ASAP because we need to know
        // if body.style.zoom needs to be set.

        var container, div,
            body = document.getElementsByTagName("body")[0];

        if (!body) {
            // Return for frameset docs that don't have a body
            return;
        }

        // Setup
        container = document.createElement("div");
        container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

        div = document.createElement("div");
        body.appendChild(container).appendChild(div);

        if (typeof div.style.zoom !== strundefined) {
            // Support: IE<8
            // Check if natively block-level elements act like inline-block
            // elements when setting their display to 'inline' and giving
            // them layout
            div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

            if ((support.inlineBlockNeedsLayout = (div.offsetWidth === 3))) {
                // Prevent IE 6 from affecting layout for positioned elements #11048
                // Prevent IE from shrinking the body in IE 7 mode #12869
                // Support: IE<8
                body.style.zoom = 1;
            }
        }

        body.removeChild(container);

        // Null elements to avoid leaks in IE
        container = div = null;
    });




    (function () {
        var div = document.createElement("div");

        // Execute the test only if not already executed in another module.
        if (support.deleteExpando == null) {
            // Support: IE<9
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = false;
            }
        }

        // Null elements to avoid leaks in IE.
        div = null;
    })();


    /**
     * Determines whether an object can have data
     */
    jQuery.acceptData = function (elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
            nodeType = +elem.nodeType || 1;

        // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
        return nodeType !== 1 && nodeType !== 9 ?
            false :

            // Nodes accept data unless otherwise specified; rejection can be conditional
            !noData || noData !== true && elem.getAttribute("classid") === noData;
    };


    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;

    function dataAttr(elem, key, data) {
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && elem.nodeType === 1) {

            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

            data = elem.getAttribute(name);

            if (typeof data === "string") {
                try {
                    data = data === "true" ? true :
                        data === "false" ? false :
                        data === "null" ? null :
                        // Only convert to a number if it doesn't change the string
                        +data + "" === data ? +data :
                        rbrace.test(data) ? jQuery.parseJSON(data) :
                        data;
                } catch (e) {}

                // Make sure we set the data so it isn't changed later
                jQuery.data(elem, key, data);

            } else {
                data = undefined;
            }
        }

        return data;
    }

    // checks a cache object for emptiness
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {

            // if the public data object is empty, the private is still empty
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== "toJSON") {
                return false;
            }
        }

        return true;
    }

    function internalData(elem, name, data, pvt /* Internal Use Only */ ) {
        if (!jQuery.acceptData(elem)) {
            return;
        }

        var ret, thisCache,
            internalKey = jQuery.expando,

            // We have to handle DOM nodes and JS objects differently because IE6-7
            // can't GC object references properly across the DOM-JS boundary
            isNode = elem.nodeType,

            // Only DOM nodes need the global jQuery cache; JS object data is
            // attached directly to the object so GC can occur automatically
            cache = isNode ? jQuery.cache : elem,

            // Only defining an ID for JS objects if its cache already exists allows
            // the code to shortcut on the same path as a DOM node with no cache
            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

        // Avoid doing any more work than we need to when trying to get data on an
        // object that has no data at all
        if ((!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string") {
            return;
        }

        if (!id) {
            // Only DOM nodes need a new unique ID for each element since their data
            // ends up in the global cache
            if (isNode) {
                id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
            } else {
                id = internalKey;
            }
        }

        if (!cache[id]) {
            // Avoid exposing jQuery metadata on plain JS objects when the object
            // is serialized using JSON.stringify
            cache[id] = isNode ? {} : {
                toJSON: jQuery.noop
            };
        }

        // An object can be passed to jQuery.data instead of a key/value pair; this gets
        // shallow copied over onto the existing cache
        if (typeof name === "object" || typeof name === "function") {
            if (pvt) {
                cache[id] = jQuery.extend(cache[id], name);
            } else {
                cache[id].data = jQuery.extend(cache[id].data, name);
            }
        }

        thisCache = cache[id];

        // jQuery data() is stored in a separate object inside the object's internal data
        // cache in order to avoid key collisions between internal data and user-defined
        // data.
        if (!pvt) {
            if (!thisCache.data) {
                thisCache.data = {};
            }

            thisCache = thisCache.data;
        }

        if (data !== undefined) {
            thisCache[jQuery.camelCase(name)] = data;
        }

        // Check for both converted-to-camel and non-converted data property names
        // If a data property was specified
        if (typeof name === "string") {

            // First Try to find as-is property data
            ret = thisCache[name];

            // Test for null|undefined property data
            if (ret == null) {

                // Try to find the camelCased property
                ret = thisCache[jQuery.camelCase(name)];
            }
        } else {
            ret = thisCache;
        }

        return ret;
    }

    function internalRemoveData(elem, name, pvt) {
        if (!jQuery.acceptData(elem)) {
            return;
        }

        var thisCache, i,
            isNode = elem.nodeType,

            // See jQuery.data for more information
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[jQuery.expando] : jQuery.expando;

        // If there is already no cache entry for this object, there is no
        // purpose in continuing
        if (!cache[id]) {
            return;
        }

        if (name) {

            thisCache = pvt ? cache[id] : cache[id].data;

            if (thisCache) {

                // Support array or space separated string names for data keys
                if (!jQuery.isArray(name)) {

                    // try the string as a key before any manipulation
                    if (name in thisCache) {
                        name = [name];
                    } else {

                        // split the camel cased version by spaces unless a key with the spaces exists
                        name = jQuery.camelCase(name);
                        if (name in thisCache) {
                            name = [name];
                        } else {
                            name = name.split(" ");
                        }
                    }
                } else {
                    // If "name" is an array of keys...
                    // When data is initially created, via ("key", "val") signature,
                    // keys will be converted to camelCase.
                    // Since there is no way to tell _how_ a key was added, remove
                    // both plain key and camelCase key. #12786
                    // This will only penalize the array argument path.
                    name = name.concat(jQuery.map(name, jQuery.camelCase));
                }

                i = name.length;
                while (i--) {
                    delete thisCache[name[i]];
                }

                // If there is no data left in the cache, we want to continue
                // and let the cache object itself get destroyed
                if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
                    return;
                }
            }
        }

        // See jQuery.data for more information
        if (!pvt) {
            delete cache[id].data;

            // Don't destroy the parent cache unless the internal data object
            // had been the only thing left in it
            if (!isEmptyDataObject(cache[id])) {
                return;
            }
        }

        // Destroy the cache
        if (isNode) {
            jQuery.cleanData([elem], true);

            // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
            /* jshint eqeqeq: false */
        } else if (support.deleteExpando || cache != cache.window) {
            /* jshint eqeqeq: true */
            delete cache[id];

            // When all else fails, null
        } else {
            cache[id] = null;
        }
    }

    jQuery.extend({
        cache: {},

        // The following elements (space-suffixed to avoid Object.prototype collisions)
        // throw uncatchable exceptions if you attempt to set expando properties
        noData: {
            "applet ": true,
            "embed ": true,
            // ...but Flash objects (which have this classid) *can* handle expandos
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },

        hasData: function (elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },

        data: function (elem, name, data) {
            return internalData(elem, name, data);
        },

        removeData: function (elem, name) {
            return internalRemoveData(elem, name);
        },

        // For internal use only.
        _data: function (elem, name, data) {
            return internalData(elem, name, data, true);
        },

        _removeData: function (elem, name) {
            return internalRemoveData(elem, name, true);
        }
    });

    jQuery.fn.extend({
        data: function (key, value) {
            var i, name, data,
                elem = this[0],
                attrs = elem && elem.attributes;

            // Special expections of .data basically thwart jQuery.access,
            // so implement the relevant behavior ourselves

            // Gets all values
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);

                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        i = attrs.length;
                        while (i--) {
                            name = attrs[i].name;

                            if (name.indexOf("data-") === 0) {
                                name = jQuery.camelCase(name.slice(5));

                                dataAttr(elem, name, data[name]);
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true);
                    }
                }

                return data;
            }

            // Sets multiple values
            if (typeof key === "object") {
                return this.each(function () {
                    jQuery.data(this, key);
                });
            }

            return arguments.length > 1 ?

                // Sets one value
                this.each(function () {
                    jQuery.data(this, key, value);
                }) :

                // Gets one value
                // Try to fetch any internally stored data first
                elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
        },

        removeData: function (key) {
            return this.each(function () {
                jQuery.removeData(this, key);
            });
        }
    });


    jQuery.extend({
        queue: function (elem, type, data) {
            var queue;

            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);

                // Speed up dequeue by getting out quickly if this is just a lookup
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },

        dequeue: function (elem, type) {
            type = type || "fx";

            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function () {
                    jQuery.dequeue(elem, type);
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }

            if (fn) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === "fx") {
                    queue.unshift("inprogress");
                }

                // clear up the last queue stop function
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }

            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },

        // not intended for public consumption - generates a queueHooks object, or returns the current one
        _queueHooks: function (elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function () {
                    jQuery._removeData(elem, type + "queue");
                    jQuery._removeData(elem, key);
                })
            });
        }
    });

    jQuery.fn.extend({
        queue: function (type, data) {
            var setter = 2;

            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }

            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }

            return data === undefined ?
                this :
                this.each(function () {
                    var queue = jQuery.queue(this, type, data);

                    // ensure a hooks for this queue
                    jQuery._queueHooks(this, type);

                    if (type === "fx" && queue[0] !== "inprogress") {
                        jQuery.dequeue(this, type);
                    }
                });
        },
        dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function (type) {
            return this.queue(type || "fx", []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function (type, obj) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function () {
                    if (!(--count)) {
                        defer.resolveWith(elements, [elements]);
                    }
                };

            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

    var cssExpand = ["Top", "Right", "Bottom", "Left"];

    var isHidden = function (elem, el) {
        // isHidden might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
    };



    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    var access = jQuery.access = function (elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            length = elems.length,
            bulk = key == null;

        // Sets many values
        if (jQuery.type(key) === "object") {
            chainable = true;
            for (i in key) {
                jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
            }

            // Sets one value
        } else if (value !== undefined) {
            chainable = true;

            if (!jQuery.isFunction(value)) {
                raw = true;
            }

            if (bulk) {
                // Bulk operations run against the entire set
                if (raw) {
                    fn.call(elems, value);
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function (elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }

            if (fn) {
                for (; i < length; i++) {
                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                }
            }
        }

        return chainable ?
            elems :

            // Gets
            bulk ?
            fn.call(elems) :
            length ? fn(elems[0], key) : emptyGet;
    };
    var rcheckableType = (/^(?:checkbox|radio)$/i);



    (function () {
        var fragment = document.createDocumentFragment(),
            div = document.createElement("div"),
            input = document.createElement("input");

        // Setup
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

        // IE strips leading whitespace when .innerHTML is used
        support.leadingWhitespace = div.firstChild.nodeType === 3;

        // Make sure that tbody elements aren't automatically inserted
        // IE will insert them into empty tables
        support.tbody = !div.getElementsByTagName("tbody").length;

        // Make sure that link elements get serialized correctly by innerHTML
        // This requires a wrapper element in IE
        support.htmlSerialize = !!div.getElementsByTagName("link").length;

        // Makes sure cloning an html5 element does not cause problems
        // Where outerHTML is undefined, this still works
        support.html5Clone =
            document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";

        // Check if a disconnected checkbox will retain its checked
        // value of true after appended to the DOM (IE6/7)
        input.type = "checkbox";
        input.checked = true;
        fragment.appendChild(input);
        support.appendChecked = input.checked;

        // Make sure textarea (and checkbox) defaultValue is properly cloned
        // Support: IE6-IE11+
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;

        // #11217 - WebKit loses check when the name is after the checked attribute
        fragment.appendChild(div);
        div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

        // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
        // old WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

        // Support: IE<9
        // Opera does not clone events (and typeof div.attachEvent === undefined).
        // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
        support.noCloneEvent = true;
        if (div.attachEvent) {
            div.attachEvent("onclick", function () {
                support.noCloneEvent = false;
            });

            div.cloneNode(true).click();
        }

        // Execute the test only if not already executed in another module.
        if (support.deleteExpando == null) {
            // Support: IE<9
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = false;
            }
        }

        // Null elements to avoid leaks in IE.
        fragment = div = input = null;
    })();


    (function () {
        var i, eventName,
            div = document.createElement("div");

        // Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
        for (i in {
                submit: true,
                change: true,
                focusin: true
            }) {
            eventName = "on" + i;

            if (!(support[i + "Bubbles"] = eventName in window)) {
                // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
                div.setAttribute(eventName, "t");
                support[i + "Bubbles"] = div.attributes[eventName].expando === false;
            }
        }

        // Null elements to avoid leaks in IE.
        div = null;
    })();


    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        global: {},

        add: function (elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn,
                special, eventHandle, handleObj,
                handlers, type, namespaces, origType,
                elemData = jQuery._data(elem);

            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if (!elemData) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function (e) {
                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
                        jQuery.event.dispatch.apply(eventHandle.elem, arguments) :
                        undefined;
                };
                // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
                eventHandle.elem = elem;
            }

            // Handle multiple events separated by a space
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // There *must* be a type, no attaching namespace-only handlers
                if (!type) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[type] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = (selector ? special.delegateType : special.bindType) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[type] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);

                // Init the event handler queue if we're the first
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener/attachEvent if the special events handler returns false
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        // Bind the global event handler to the element
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);

                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }

                if (special.add) {
                    special.add.call(elem, handleObj);

                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[type] = true;
            }

            // Nullify elem to prevent memory leaks in IE
            elem = null;
        },

        // Detach an event or set of events from an element
        remove: function (elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp,
                origCount, t, events,
                special, handlers, type,
                namespaces, origType,
                elemData = jQuery.hasData(elem) && jQuery._data(elem);

            if (!elemData || !(events = elemData.events)) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // Unbind all events (on this namespace, if provided) for the element
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }

                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

                // Remove matching events
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];

                    if ((mappedTypes || origType === handleObj.origType) &&
                        (!handler || handler.guid === handleObj.guid) &&
                        (!tmp || tmp.test(handleObj.namespace)) &&
                        (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);

                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }

                    delete events[type];
                }
            }

            // Remove the expando if it's no longer used
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;

                // removeData also checks for emptiness and clears the expando if empty
                // so use it instead of delete
                jQuery._removeData(elem, "events");
            }
        },

        trigger: function (event, data, elem, onlyHandlers) {
            var handle, ontype, cur,
                bubbleType, special, tmp, i,
                eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

            cur = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }

            if (type.indexOf(".") >= 0) {
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[jQuery.expando] ?
                event :
                new jQuery.Event(type, typeof event === "object" && event);

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ?
                new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ? [event] :
                jQuery.makeArray(data, [event]);

            // Allow special events to draw outside the lines
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }

            // Fire handlers on the event path
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

                event.type = i > 1 ?
                    bubbleType :
                    special.bindType || type;

                // jQuery handler
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }

                // Native handler
                handle = ontype && cur[ontype];
                if (handle && handle.apply && jQuery.acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if (!onlyHandlers && !event.isDefaultPrevented()) {

                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) &&
                    jQuery.acceptData(elem)) {

                    // Call a native DOM method on the target with the same name name as the event.
                    // Can't use an .isFunction() check here because IE6/7 fails that test.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ontype];

                        if (tmp) {
                            elem[ontype] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
                        try {
                            elem[type]();
                        } catch (e) {
                            // IE<9 dies on focus/blur to hidden element (#1486,#12518)
                            // only reproducible on winXP IE8 native, not IE9 in IE8 mode
                        }
                        jQuery.event.triggered = undefined;

                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        dispatch: function (event) {

            // Make a writable jQuery.Event from the native event object
            event = jQuery.event.fix(event);

            var i, ret, handleObj, matched, j,
                handlerQueue = [],
                args = slice.call(arguments),
                handlers = (jQuery._data(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;
            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;

                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

                    // Triggered event must either 1) have no namespace, or
                    // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler)
                            .apply(matched.elem, args);

                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }

            return event.result;
        },

        handlers: function (event, handlers) {
            var sel, handleObj, matches, i,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Find delegate handlers
            // Black-hole SVG <use> instance trees (#13180)
            // Avoid non-left-click bubbling in Firefox (#3861)
            if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {

                /* jshint eqeqeq: false */
                for (; cur != this; cur = cur.parentNode || this) {
                    /* jshint eqeqeq: true */

                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ?
                                    jQuery(sel, this).index(cur) >= 0 :
                                    jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            });
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                });
            }

            return handlerQueue;
        },

        fix: function (event) {
            if (event[jQuery.expando]) {
                return event;
            }

            // Create a writable copy of the event object and normalize some properties
            var i, prop, copy,
                type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type];

            if (!fixHook) {
                this.fixHooks[type] = fixHook =
                    rmouseEvent.test(type) ? this.mouseHooks :
                    rkeyEvent.test(type) ? this.keyHooks : {};
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

            event = new jQuery.Event(originalEvent);

            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }

            // Support: IE<9
            // Fix target property (#1925)
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }

            // Support: Chrome 23+, Safari?
            // Target should not be a text node (#504, #13143)
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }

            // Support: IE<9
            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
            event.metaKey = !!event.metaKey;

            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },

        // Includes some event props shared by KeyEvent and MouseEvent
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

        fixHooks: {},

        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (event, original) {

                // Add which for key events
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }

                return event;
            }
        },

        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (event, original) {
                var body, eventDoc, doc,
                    button = original.button,
                    fromElement = original.fromElement;

                // Calculate pageX/Y if missing and clientX/Y available
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;

                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }

                // Add relatedTarget, if necessary
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }

                // Add which for click: 1 === left; 2 === middle; 3 === right
                // Note: button is not normalized, so don't use it
                if (!event.which && button !== undefined) {
                    event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
                }

                return event;
            }
        },

        special: {
            load: {
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {
                // Fire native event if possible so blur/focus sequence is correct
                trigger: function () {
                    if (this !== safeActiveElement() && this.focus) {
                        try {
                            this.focus();
                            return false;
                        } catch (e) {
                            // Support: IE<9
                            // If we error on focus to hidden element (#1486, #12518),
                            // let .trigger() run the handlers
                        }
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                // For checkbox, fire native event so checked state will be right
                trigger: function () {
                    if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                        this.click();
                        return false;
                    }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function (event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },

            beforeunload: {
                postDispatch: function (event) {

                    // Even when returnValue equals to undefined Firefox will still show alert
                    if (event.result !== undefined) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },

        simulate: function (type, elem, event, bubble) {
            // Piggyback on a donor event to simulate a different one.
            // Fake originalEvent to avoid donor's stopPropagation, but if the
            // simulated event prevents default then we do the same on the donor.
            var e = jQuery.extend(
                new jQuery.Event(),
                event, {
                    type: type,
                    isSimulated: true,
                    originalEvent: {}
                }
            );
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };

    jQuery.removeEvent = document.removeEventListener ?
        function (elem, type, handle) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle, false);
            }
        } :
        function (elem, type, handle) {
            var name = "on" + type;

            if (elem.detachEvent) {

                // #8545, #7054, preventing memory leaks for custom events in IE6-8
                // detachEvent needed property on element, by name of that event, to properly expose it to GC
                if (typeof elem[name] === strundefined) {
                    elem[name] = null;
                }

                elem.detachEvent(name, handle);
            }
        };

    jQuery.Event = function (src, props) {
        // Allow instantiation without the 'new' keyword
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }

        // Event object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
                src.defaultPrevented === undefined && (
                    // Support: IE < 9
                    src.returnValue === false ||
                    // Support: Android < 4.0
                    src.getPreventDefault && src.getPreventDefault()) ?
                returnTrue :
                returnFalse;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if (props) {
            jQuery.extend(this, props);
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[jQuery.expando] = true;
    };

    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,

        preventDefault: function () {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;
            if (!e) {
                return;
            }

            // If preventDefault exists, run it on the original event
            if (e.preventDefault) {
                e.preventDefault();

                // Support: IE
                // Otherwise set the returnValue property of the original event to false
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;
            if (!e) {
                return;
            }
            // If stopPropagation exists, run it on the original event
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            // Support: IE
            // Set the cancelBubble property of the original event to true
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        }
    };

    // Create mouseenter/leave events using mouseover/out and event-time checks
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,

            handle: function (event) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;

                // For mousenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });

    // IE submit delegation
    if (!support.submitBubbles) {

        jQuery.event.special.submit = {
            setup: function () {
                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }

                // Lazy-add a submit handler when a descendant form may potentially be submitted
                jQuery.event.add(this, "click._submit keypress._submit", function (e) {
                    // Node name check avoids a VML-related crash in IE (#9807)
                    var elem = e.target,
                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !jQuery._data(form, "submitBubbles")) {
                        jQuery.event.add(form, "submit._submit", function (event) {
                            event._submit_bubble = true;
                        });
                        jQuery._data(form, "submitBubbles", true);
                    }
                });
                // return undefined since we don't need an event listener
            },

            postDispatch: function (event) {
                // If form was submitted by the user, bubble the event up the tree
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true);
                    }
                }
            },

            teardown: function () {
                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }

                // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
                jQuery.event.remove(this, "._submit");
            }
        };
    }

    // IE change delegation and checkbox/radio fix
    if (!support.changeBubbles) {

        jQuery.event.special.change = {

            setup: function () {

                if (rformElems.test(this.nodeName)) {
                    // IE doesn't fire change on a check/radio until blur; trigger it on click
                    // after a propertychange. Eat the blur-change in special.change.handle.
                    // This still fires onchange a second time for check/radio after blur.
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function (event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true;
                            }
                        });
                        jQuery.event.add(this, "click._change", function (event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false;
                            }
                            // Allow triggered, simulated change events (#11500)
                            jQuery.event.simulate("change", this, event, true);
                        });
                    }
                    return false;
                }
                // Delegated event; lazy-add a change handler on descendant inputs
                jQuery.event.add(this, "beforeactivate._change", function (e) {
                    var elem = e.target;

                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
                        jQuery.event.add(elem, "change._change", function (event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true);
                            }
                        });
                        jQuery._data(elem, "changeBubbles", true);
                    }
                });
            },

            handle: function (event) {
                var elem = event.target;

                // Swallow native change events from checkbox/radio, we already triggered them above
                if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                    return event.handleObj.handler.apply(this, arguments);
                }
            },

            teardown: function () {
                jQuery.event.remove(this, "._change");

                return !rformElems.test(this.nodeName);
            }
        };
    }

    // Create "bubbling" focus and blur events
    if (!support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function (orig, fix) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function (event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
            };

            jQuery.event.special[fix] = {
                setup: function () {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data(doc, fix);

                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    jQuery._data(doc, fix, (attaches || 0) + 1);
                },
                teardown: function () {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data(doc, fix) - 1;

                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        jQuery._removeData(doc, fix);
                    } else {
                        jQuery._data(doc, fix, attaches);
                    }
                }
            };
        });
    }

    jQuery.fn.extend({

        on: function (types, selector, data, fn, /*INTERNAL*/ one) {
            var type, origFn;

            // Types can be a map of types/handlers
            if (typeof types === "object") {
                // ( types-Object, selector, data )
                if (typeof selector !== "string") {
                    // ( types-Object, data )
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }

            if (data == null && fn == null) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                } else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }

            if (one === 1) {
                origFn = fn;
                fn = function (event) {
                    // Can use an empty set, since event contains the info
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                // Use same guid so caller can remove using origFn
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function () {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function (types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function (types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(
                    handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if (typeof types === "object") {
                // ( types-object [, selector] )
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function () {
                jQuery.event.remove(this, types, fn, selector);
            });
        },

        trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function (type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });


    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();

        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(
                    list.pop()
                );
            }
        }
        return safeFrag;
    }

    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
        "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

        // We have to close these tags to support XHTML (#13200)
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

            // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
            // unless wrapped in a div with non-breaking characters in front of it.
            _default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));

    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;

    function getAll(context, tag) {
        var elems, elem,
            i = 0,
            found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag || "*") :
            typeof context.querySelectorAll !== strundefined ? context.querySelectorAll(tag || "*") :
            undefined;

        if (!found) {
            for (found = [], elems = context.childNodes || context;
                (elem = elems[i]) != null; i++) {
                if (!tag || jQuery.nodeName(elem, tag)) {
                    found.push(elem);
                } else {
                    jQuery.merge(found, getAll(elem, tag));
                }
            }
        }

        return tag === undefined || tag && jQuery.nodeName(context, tag) ?
            jQuery.merge([context], found) :
            found;
    }

    // Used in buildFragment, fixes the defaultChecked property
    function fixDefaultChecked(elem) {
        if (rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked;
        }
    }

    // Support: IE<8
    // Manipulating tables requires a tbody
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") &&
            jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ?

            elem.getElementsByTagName("tbody")[0] ||
            elem.appendChild(elem.ownerDocument.createElement("tbody")) :
            elem;
    }

    // Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript(elem) {
        elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
        return elem;
    }

    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }

    // Mark scripts as having already been evaluated
    function setGlobalEval(elems, refElements) {
        var elem,
            i = 0;
        for (;
            (elem = elems[i]) != null; i++) {
            jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
        }
    }

    function cloneCopyEvent(src, dest) {

        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return;
        }

        var type, i, l,
            oldData = jQuery._data(src),
            curData = jQuery._data(dest, oldData),
            events = oldData.events;

        if (events) {
            delete curData.handle;
            curData.events = {};

            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i]);
                }
            }
        }

        // make the cloned public data object a copy from the original
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data);
        }
    }

    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;

        // We do not need to do anything for non-Elements
        if (dest.nodeType !== 1) {
            return;
        }

        nodeName = dest.nodeName.toLowerCase();

        // IE6-8 copies events bound via attachEvent when using cloneNode.
        if (!support.noCloneEvent && dest[jQuery.expando]) {
            data = jQuery._data(dest);

            for (e in data.events) {
                jQuery.removeEvent(dest, e, data.handle);
            }

            // Event data gets referenced instead of copied if the expando gets copied too
            dest.removeAttribute(jQuery.expando);
        }

        // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
        if (nodeName === "script" && dest.text !== src.text) {
            disableScript(dest).text = src.text;
            restoreScript(dest);

            // IE6-10 improperly clones children of object elements using classid.
            // IE10 throws NoModificationAllowedError if parent is null, #12132.
        } else if (nodeName === "object") {
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML;
            }

            // This path appears unavoidable for IE9. When cloning an object
            // element in IE9, the outerHTML strategy above is not sufficient.
            // If the src has innerHTML and the destination does not,
            // copy the src.innerHTML into the dest.innerHTML. #10324
            if (support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                dest.innerHTML = src.innerHTML;
            }

        } else if (nodeName === "input" && rcheckableType.test(src.type)) {
            // IE6-8 fails to persist the checked state of a cloned checkbox
            // or radio button. Worse, IE6-7 fail to give the cloned element
            // a checked appearance if the defaultChecked value isn't also set

            dest.defaultChecked = dest.checked = src.checked;

            // IE6-7 get confused and end up setting the value of a cloned
            // checkbox/radio button to an empty string instead of "on"
            if (dest.value !== src.value) {
                dest.value = src.value;
            }

            // IE6-8 fails to return the selected option to the default selected
            // state when cloning options
        } else if (nodeName === "option") {
            dest.defaultSelected = dest.selected = src.defaultSelected;

            // IE6-8 fails to set the defaultValue to the correct value when
            // cloning other types of input fields
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }

    jQuery.extend({
        clone: function (elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements,
                inPage = jQuery.contains(elem.ownerDocument, elem);

            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                clone = elem.cloneNode(true);

                // IE<=8 does not properly clone detached, unknown element nodes
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
            }

            if ((!support.noCloneEvent || !support.noCloneChecked) &&
                (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

                // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
                destElements = getAll(clone);
                srcElements = getAll(elem);

                // Fix all IE cloning issues
                for (i = 0;
                    (node = srcElements[i]) != null; ++i) {
                    // Ensure that the destination node is not null; Fixes #9587
                    if (destElements[i]) {
                        fixCloneNodeIssues(node, destElements[i]);
                    }
                }
            }

            // Copy the events from the original to the clone
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);

                    for (i = 0;
                        (node = srcElements[i]) != null; i++) {
                        cloneCopyEvent(node, destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }

            // Preserve script evaluation history
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }

            destElements = srcElements = node = null;

            // Return the cloned set
            return clone;
        },

        buildFragment: function (elems, context, scripts, selection) {
            var j, elem, contains,
                tmp, tag, tbody, wrap,
                l = elems.length,

                // Ensure a safe fragment
                safe = createSafeFragment(context),

                nodes = [],
                i = 0;

            for (; i < l; i++) {
                elem = elems[i];

                if (elem || elem === 0) {

                    // Add nodes directly
                    if (jQuery.type(elem) === "object") {
                        jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

                        // Convert non-html into a text node
                    } else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));

                        // Convert html into DOM nodes
                    } else {
                        tmp = tmp || safe.appendChild(context.createElement("div"));

                        // Deserialize a standard representation
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;

                        tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

                        // Descend through wrappers to the right content
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }

                        // Manually add leading whitespace removed by IE
                        if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
                        }

                        // Remove IE's autoinserted <tbody> from table fragments
                        if (!support.tbody) {

                            // String was a <table>, *may* have spurious <tbody>
                            elem = tag === "table" && !rtbody.test(elem) ?
                                tmp.firstChild :

                                // String was a bare <thead> or <tfoot>
                                wrap[1] === "<table>" && !rtbody.test(elem) ?
                                tmp :
                                0;

                            j = elem && elem.childNodes.length;
                            while (j--) {
                                if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) {
                                    elem.removeChild(tbody);
                                }
                            }
                        }

                        jQuery.merge(nodes, tmp.childNodes);

                        // Fix #12392 for WebKit and IE > 9
                        tmp.textContent = "";

                        // Fix #12392 for oldIE
                        while (tmp.firstChild) {
                            tmp.removeChild(tmp.firstChild);
                        }

                        // Remember the top-level container for proper cleanup
                        tmp = safe.lastChild;
                    }
                }
            }

            // Fix #11356: Clear elements from fragment
            if (tmp) {
                safe.removeChild(tmp);
            }

            // Reset defaultChecked for any radios and checkboxes
            // about to be appended to the DOM in IE 6/7 (#8060)
            if (!support.appendChecked) {
                jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
            }

            i = 0;
            while ((elem = nodes[i++])) {

                // #4087 - If origin and destination elements are the same, and this is
                // that element, do not do anything
                if (selection && jQuery.inArray(elem, selection) !== -1) {
                    continue;
                }

                contains = jQuery.contains(elem.ownerDocument, elem);

                // Append to fragment
                tmp = getAll(safe.appendChild(elem), "script");

                // Preserve script evaluation history
                if (contains) {
                    setGlobalEval(tmp);
                }

                // Capture executables
                if (scripts) {
                    j = 0;
                    while ((elem = tmp[j++])) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }

            tmp = null;

            return safe;
        },

        cleanData: function (elems, /* internal */ acceptData) {
            var elem, type, id, data,
                i = 0,
                internalKey = jQuery.expando,
                cache = jQuery.cache,
                deleteExpando = support.deleteExpando,
                special = jQuery.event.special;

            for (;
                (elem = elems[i]) != null; i++) {
                if (acceptData || jQuery.acceptData(elem)) {

                    id = elem[internalKey];
                    data = id && cache[id];

                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }

                        // Remove cache only if it was not already removed by jQuery.event.remove
                        if (cache[id]) {

                            delete cache[id];

                            // IE does not allow us to delete expando properties from nodes,
                            // nor does it have a removeAttribute function on Document nodes;
                            // we must handle all of these cases
                            if (deleteExpando) {
                                delete elem[internalKey];

                            } else if (typeof elem.removeAttribute !== strundefined) {
                                elem.removeAttribute(internalKey);

                            } else {
                                elem[internalKey] = null;
                            }

                            deletedIds.push(id);
                        }
                    }
                }
            }
        }
    });

    jQuery.fn.extend({
        text: function (value) {
            return access(this, function (value) {
                return value === undefined ?
                    jQuery.text(this) :
                    this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },

        append: function () {
            return this.domManip(arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },

        prepend: function () {
            return this.domManip(arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },

        before: function () {
            return this.domManip(arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },

        after: function () {
            return this.domManip(arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },

        remove: function (selector, keepData /* Internal Use Only */ ) {
            var elem,
                elems = selector ? jQuery.filter(selector, this) : this,
                i = 0;

            for (;
                (elem = elems[i]) != null; i++) {

                if (!keepData && elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem));
                }

                if (elem.parentNode) {
                    if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
                        setGlobalEval(getAll(elem, "script"));
                    }
                    elem.parentNode.removeChild(elem);
                }
            }

            return this;
        },

        empty: function () {
            var elem,
                i = 0;

            for (;
                (elem = this[i]) != null; i++) {
                // Remove element nodes and prevent memory leaks
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                }

                // Remove any remaining nodes
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }

                // If this is a select, ensure that it displays empty (#12336)
                // Support: IE<9
                if (elem.options && jQuery.nodeName(elem, "select")) {
                    elem.options.length = 0;
                }
            }

            return this;
        },

        clone: function (dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },

        html: function (value) {
            return access(this, function (value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;

                if (value === undefined) {
                    return elem.nodeType === 1 ?
                        elem.innerHTML.replace(rinlinejQuery, "") :
                        undefined;
                }

                // See if we can take a shortcut and just use innerHTML
                if (typeof value === "string" && !rnoInnerhtml.test(value) &&
                    (support.htmlSerialize || !rnoshimcache.test(value)) &&
                    (support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
                    !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

                    value = value.replace(rxhtmlTag, "<$1></$2>");

                    try {
                        for (; i < l; i++) {
                            // Remove element nodes and prevent memory leaks
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                    } catch (e) {}
                }

                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },

        replaceWith: function () {
            var arg = arguments[0];

            // Make the changes, replacing each context element with the new content
            this.domManip(arguments, function (elem) {
                arg = this.parentNode;

                jQuery.cleanData(getAll(this));

                if (arg) {
                    arg.replaceChild(elem, this);
                }
            });

            // Force removal if there was no new content (e.g., from empty arguments)
            return arg && (arg.length || arg.nodeType) ? this : this.remove();
        },

        detach: function (selector) {
            return this.remove(selector, true);
        },

        domManip: function (args, callback) {

            // Flatten any nested arrays
            args = concat.apply([], args);

            var first, node, hasScripts,
                scripts, doc, fragment,
                i = 0,
                l = this.length,
                set = this,
                iNoClone = l - 1,
                value = args[0],
                isFunction = jQuery.isFunction(value);

            // We can't cloneNode fragments that contain checked, in WebKit
            if (isFunction ||
                (l > 1 && typeof value === "string" &&
                    !support.checkClone && rchecked.test(value))) {
                return this.each(function (index) {
                    var self = set.eq(index);
                    if (isFunction) {
                        args[0] = value.call(this, index, self.html());
                    }
                    self.domManip(args, callback);
                });
            }

            if (l) {
                fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
                first = fragment.firstChild;

                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }

                if (first) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;

                    // Use the original fragment for the last item instead of the first because it can end up
                    // being emptied incorrectly in certain situations (#8070).
                    for (; i < l; i++) {
                        node = fragment;

                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);

                            // Keep references to cloned scripts for later restoration
                            if (hasScripts) {
                                jQuery.merge(scripts, getAll(node, "script"));
                            }
                        }

                        callback.call(this[i], node, i);
                    }

                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;

                        // Reenable scripts
                        jQuery.map(scripts, restoreScript);

                        // Evaluate executable scripts on first document insertion
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") &&
                                !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {

                                if (node.src) {
                                    // Optional AJAX dependency, but won't run scripts if not present
                                    if (jQuery._evalUrl) {
                                        jQuery._evalUrl(node.src);
                                    }
                                } else {
                                    jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
                                }
                            }
                        }
                    }

                    // Fix #11809: Avoid leaking memory
                    fragment = first = null;
                }
            }

            return this;
        }
    });

    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var elems,
                i = 0,
                ret = [],
                insert = jQuery(selector),
                last = insert.length - 1;

            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);

                // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
                push.apply(ret, elems.get());
            }

            return this.pushStack(ret);
        };
    });


    var iframe,
        elemdisplay = {};

    /**
     * Retrieve the actual display of a element
     * @param {String} name nodeName of the element
     * @param {Object} doc Document object
     */
    // Called only from within defaultDisplay
    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body),

            // getDefaultComputedStyle might be reliably used only on attached element
            display = window.getDefaultComputedStyle ?

            // Use of this method is a temporary fix (more like optmization) until something better comes along,
            // since it was removed from specification and supported only in FF
            window.getDefaultComputedStyle(elem[0]).display : jQuery.css(elem[0], "display");

        // We don't have any data stored on the element,
        // so use "detach" method as fast way to get rid of the element
        elem.detach();

        return display;
    }

    /**
     * Try to determine the default display value of an element
     * @param {String} nodeName
     */
    function defaultDisplay(nodeName) {
        var doc = document,
            display = elemdisplay[nodeName];

        if (!display) {
            display = actualDisplay(nodeName, doc);

            // If the simple way fails, read from inside an iframe
            if (display === "none" || !display) {

                // Use the already-created iframe if possible
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);

                // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
                doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;

                // Support: IE
                doc.write();
                doc.close();

                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }

            // Store the correct default display
            elemdisplay[nodeName] = display;
        }

        return display;
    }


    (function () {
        var a, shrinkWrapBlocksVal,
            div = document.createElement("div"),
            divReset =
            "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
            "display:block;padding:0;margin:0;border:0";

        // Setup
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[0];

        a.style.cssText = "float:left;opacity:.5";

        // Make sure that element opacity exists
        // (IE uses filter instead)
        // Use a regex to work around a WebKit issue. See #5145
        support.opacity = /^0.5/.test(a.style.opacity);

        // Verify style float existence
        // (IE uses styleFloat instead of cssFloat)
        support.cssFloat = !!a.style.cssFloat;

        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        // Null elements to avoid leaks in IE.
        a = div = null;

        support.shrinkWrapBlocks = function () {
            var body, container, div, containerStyles;

            if (shrinkWrapBlocksVal == null) {
                body = document.getElementsByTagName("body")[0];
                if (!body) {
                    // Test fired too early or in an unsupported environment, exit.
                    return;
                }

                containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
                container = document.createElement("div");
                div = document.createElement("div");

                body.appendChild(container).appendChild(div);

                // Will be changed later if needed.
                shrinkWrapBlocksVal = false;

                if (typeof div.style.zoom !== strundefined) {
                    // Support: IE6
                    // Check if elements with layout shrink-wrap their children
                    div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
                    div.innerHTML = "<div></div>";
                    div.firstChild.style.width = "5px";
                    shrinkWrapBlocksVal = div.offsetWidth !== 3;
                }

                body.removeChild(container);

                // Null elements to avoid leaks in IE.
                body = container = div = null;
            }

            return shrinkWrapBlocksVal;
        };

    })();
    var rmargin = (/^margin/);

    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");



    var getStyles, curCSS,
        rposition = /^(top|right|bottom|left)$/;

    if (window.getComputedStyle) {
        getStyles = function (elem) {
            return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
        };

        curCSS = function (elem, name, computed) {
            var width, minWidth, maxWidth, ret,
                style = elem.style;

            computed = computed || getStyles(elem);

            // getPropertyValue is only needed for .css('filter') in IE9, see #12537
            ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;

            if (computed) {

                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name);
                }

                // A tribute to the "awesome hack by Dean Edwards"
                // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
                // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
                // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
                if (rnumnonpx.test(ret) && rmargin.test(name)) {

                    // Remember the original values
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;

                    // Put in the new values to get a computed value out
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;

                    // Revert the changed values
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }

            // Support: IE
            // IE returns zIndex value as an integer.
            return ret === undefined ?
                ret :
                ret + "";
        };
    } else if (document.documentElement.currentStyle) {
        getStyles = function (elem) {
            return elem.currentStyle;
        };

        curCSS = function (elem, name, computed) {
            var left, rs, rsLeft, ret,
                style = elem.style;

            computed = computed || getStyles(elem);
            ret = computed ? computed[name] : undefined;

            // Avoid setting ret to empty string here
            // so we don't default to auto
            if (ret == null && style && style[name]) {
                ret = style[name];
            }

            // From the awesome hack by Dean Edwards
            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

            // If we're not dealing with a regular pixel number
            // but a number that has a weird ending, we need to convert it to pixels
            // but not position css attributes, as those are proportional to the parent element instead
            // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
            if (rnumnonpx.test(ret) && !rposition.test(name)) {

                // Remember the original values
                left = style.left;
                rs = elem.runtimeStyle;
                rsLeft = rs && rs.left;

                // Put in the new values to get a computed value out
                if (rsLeft) {
                    rs.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";

                // Revert the changed values
                style.left = left;
                if (rsLeft) {
                    rs.left = rsLeft;
                }
            }

            // Support: IE
            // IE returns zIndex value as an integer.
            return ret === undefined ?
                ret :
                ret + "" || "auto";
        };
    }




    function addGetHookIf(conditionFn, hookFn) {
        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function () {
                var condition = conditionFn();

                if (condition == null) {
                    // The test was not ready at this point; screw the hook this time
                    // but check again when needed next time.
                    return;
                }

                if (condition) {
                    // Hook not needed (or it's not possible to use it due to missing dependency),
                    // remove it.
                    // Since there are no other hooks for marginRight, remove the whole object.
                    delete this.get;
                    return;
                }

                // Hook needed; redefine it so that the support test is not executed again.

                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }


    (function () {
        var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
            pixelPositionVal, reliableMarginRightVal,
            div = document.createElement("div"),
            containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
            divReset =
            "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
            "display:block;padding:0;margin:0;border:0";

        // Setup
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[0];

        a.style.cssText = "float:left;opacity:.5";

        // Make sure that element opacity exists
        // (IE uses filter instead)
        // Use a regex to work around a WebKit issue. See #5145
        support.opacity = /^0.5/.test(a.style.opacity);

        // Verify style float existence
        // (IE uses styleFloat instead of cssFloat)
        support.cssFloat = !!a.style.cssFloat;

        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        // Null elements to avoid leaks in IE.
        a = div = null;

        jQuery.extend(support, {
            reliableHiddenOffsets: function () {
                if (reliableHiddenOffsetsVal != null) {
                    return reliableHiddenOffsetsVal;
                }

                var container, tds, isSupported,
                    div = document.createElement("div"),
                    body = document.getElementsByTagName("body")[0];

                if (!body) {
                    // Return for frameset docs that don't have a body
                    return;
                }

                // Setup
                div.setAttribute("className", "t");
                div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

                container = document.createElement("div");
                container.style.cssText = containerStyles;

                body.appendChild(container).appendChild(div);

                // Support: IE8
                // Check if table cells still have offsetWidth/Height when they are set
                // to display:none and there are still other visible table cells in a
                // table row; if so, offsetWidth/Height are not reliable for use when
                // determining if an element has been hidden directly using
                // display:none (it is still safe to use offsets if a parent element is
                // hidden; don safety goggles and see bug #4512 for more information).
                div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                tds = div.getElementsByTagName("td");
                tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
                isSupported = (tds[0].offsetHeight === 0);

                tds[0].style.display = "";
                tds[1].style.display = "none";

                // Support: IE8
                // Check if empty table cells still have offsetWidth/Height
                reliableHiddenOffsetsVal = isSupported && (tds[0].offsetHeight === 0);

                body.removeChild(container);

                // Null elements to avoid leaks in IE.
                div = body = null;

                return reliableHiddenOffsetsVal;
            },

            boxSizing: function () {
                if (boxSizingVal == null) {
                    computeStyleTests();
                }
                return boxSizingVal;
            },

            boxSizingReliable: function () {
                if (boxSizingReliableVal == null) {
                    computeStyleTests();
                }
                return boxSizingReliableVal;
            },

            pixelPosition: function () {
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return pixelPositionVal;
            },

            reliableMarginRight: function () {
                var body, container, div, marginDiv;

                // Use window.getComputedStyle because jsdom on node.js will break without it.
                if (reliableMarginRightVal == null && window.getComputedStyle) {
                    body = document.getElementsByTagName("body")[0];
                    if (!body) {
                        // Test fired too early or in an unsupported environment, exit.
                        return;
                    }

                    container = document.createElement("div");
                    div = document.createElement("div");
                    container.style.cssText = containerStyles;

                    body.appendChild(container).appendChild(div);

                    // Check if div with explicit width and no margin-right incorrectly
                    // gets computed margin-right based on width of container. (#3333)
                    // Fails in WebKit before Feb 2011 nightlies
                    // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                    marginDiv = div.appendChild(document.createElement("div"));
                    marginDiv.style.cssText = div.style.cssText = divReset;
                    marginDiv.style.marginRight = marginDiv.style.width = "0";
                    div.style.width = "1px";

                    reliableMarginRightVal = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);

                    body.removeChild(container);
                }

                return reliableMarginRightVal;
            }
        });

        function computeStyleTests() {
            var container, div,
                body = document.getElementsByTagName("body")[0];

            if (!body) {
                // Test fired too early or in an unsupported environment, exit.
                return;
            }

            container = document.createElement("div");
            div = document.createElement("div");
            container.style.cssText = containerStyles;

            body.appendChild(container).appendChild(div);

            div.style.cssText =
                "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
                "position:absolute;display:block;padding:1px;border:1px;width:4px;" +
                "margin-top:1%;top:1%";

            // Workaround failing boxSizing test due to offsetWidth returning wrong value
            // with some non-1 values of body zoom, ticket #13543
            jQuery.swap(body, body.style.zoom != null ? {
                zoom: 1
            } : {}, function () {
                boxSizingVal = div.offsetWidth === 4;
            });

            // Will be changed later if needed.
            boxSizingReliableVal = true;
            pixelPositionVal = false;
            reliableMarginRightVal = true;

            // Use window.getComputedStyle because jsdom on node.js will break without it.
            if (window.getComputedStyle) {
                pixelPositionVal = (window.getComputedStyle(div, null) || {}).top !== "1%";
                boxSizingReliableVal =
                    (window.getComputedStyle(div, null) || {
                        width: "4px"
                    }).width === "4px";
            }

            body.removeChild(container);

            // Null elements to avoid leaks in IE.
            div = body = null;
        }

    })();


    // A method for quickly swapping in/out CSS properties to get correct calculations.
    jQuery.swap = function (elem, options, callback, args) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }

        ret = callback.apply(elem, args || []);

        // Revert the old values
        for (name in options) {
            elem.style[name] = old[name];
        }

        return ret;
    };


    var
        ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity\s*=\s*([^)]*)/,

        // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
        // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
        rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),

        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: 0,
            fontWeight: 400
        },

        cssPrefixes = ["Webkit", "O", "Moz", "ms"];


    // return a css property mapped to a potentially vendor prefixed property
    function vendorPropName(style, name) {

        // shortcut for names that are not vendor prefixed
        if (name in style) {
            return name;
        }

        // check for vendor prefixed names
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;

        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name;
            }
        }

        return origName;
    }

    function showHide(elements, show) {
        var display, elem, hidden,
            values = [],
            index = 0,
            length = elements.length;

        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }

            values[index] = jQuery._data(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                // Reset the inline display of this element to learn if it is
                // being hidden by cascaded rules or not
                if (!values[index] && display === "none") {
                    elem.style.display = "";
                }

                // Set elements which have been overridden with display: none
                // in a stylesheet to whatever the default browser style is
                // for such an element
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
                }
            } else {

                if (!values[index]) {
                    hidden = isHidden(elem);

                    if (display && display !== "none" || !hidden) {
                        jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
                    }
                }
            }
        }

        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none";
            }
        }

        return elements;
    }

    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ?
            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") :
            value;
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ?
            // If we already have the right measurement, avoid augmentation
            4 :
            // Otherwise initialize for horizontal or vertical properties
            name === "width" ? 1 : 0,

            val = 0;

        for (; i < 4; i += 2) {
            // both box models exclude margin, so add it if we want it
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            }

            if (isBorderBox) {
                // border-box includes padding, so remove it if we want content
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }

                // at this point, extra isn't border nor margin, so remove border
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            } else {
                // at this point, extra isn't content, so add padding
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

                // at this point, extra isn't content nor padding, so add border
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }

        return val;
    }

    function getWidthOrHeight(elem, name, extra) {

        // Start with offset property, which is equivalent to the border-box value
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles(elem),
            isBorderBox = support.boxSizing() && jQuery.css(elem, "boxSizing", false, styles) === "border-box";

        // some non-html elements return undefined for offsetWidth, so check for null/undefined
        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
        if (val <= 0 || val == null) {
            // Fall back to computed then uncomputed css if necessary
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }

            // Computed unit is not pixels. Stop here and return.
            if (rnumnonpx.test(val)) {
                return val;
            }

            // we need the check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

            // Normalize "", auto, and prepare for extra
            val = parseFloat(val) || 0;
        }

        // use the active box-sizing model to add/subtract irrelevant styles
        return (val +
            augmentWidthOrHeight(
                elem,
                name,
                extra || (isBorderBox ? "border" : "content"),
                valueIsBorderBox,
                styles
            )
        ) + "px";
    }

    jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function (elem, computed) {
                    if (computed) {
                        // We should always get a number back from opacity
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "columnCount": true,
            "fillOpacity": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
            // normalize float css property
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },

        // Get and set the style property on a DOM Node
        style: function (elem, name, value, extra) {
            // Don't set styles on text and comment nodes
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = jQuery.camelCase(name),
                style = elem.style;

            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));

            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

            // Check if we're setting a value
            if (value !== undefined) {
                type = typeof value;

                // convert relative number strings (+= or -=) to relative numbers. #7345
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that null and NaN values aren't set. See: #7116
                if (value == null || value !== value) {
                    return;
                }

                // If a number was passed in, add 'px' to the (except for certain CSS properties)
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }

                // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
                // but it would mean to define eight (for every problematic property) identical functions
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

                    // Support: IE
                    // Swallow errors from 'invalid' CSS values (#5509)
                    try {
                        // Support: Chrome, Safari
                        // Setting style to blank string required to delete "style: x !important;"
                        style[name] = "";
                        style[name] = value;
                    } catch (e) {}
                }

            } else {
                // If a hook was provided get the non-computed value from there
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[name];
            }
        },

        css: function (elem, name, extra, styles) {
            var num, val, hooks,
                origName = jQuery.camelCase(name);

            // Make sure that we're working with the right name
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));

            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

            // If a hook was provided get the computed value from there
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }

            // Otherwise, if a way to get the computed value exists, use that
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }

            //convert "normal" to computed value
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }

            // Return, converting to number if forced or a qualifier was provided and val looks numeric
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
            }
            return val;
        }
    });

    jQuery.each(["height", "width"], function (i, name) {
        jQuery.cssHooks[name] = {
            get: function (elem, computed, extra) {
                if (computed) {
                    // certain elements can have dimension info if we invisibly show them
                    // however, it must have a current display style that would benefit from this
                    return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, "display")) ?
                        jQuery.swap(elem, cssShow, function () {
                            return getWidthOrHeight(elem, name, extra);
                        }) :
                        getWidthOrHeight(elem, name, extra);
                }
            },

            set: function (elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ?
                    augmentWidthOrHeight(
                        elem,
                        name,
                        extra,
                        support.boxSizing() && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
                        styles
                    ) : 0
                );
            }
        };
    });

    if (!support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function (elem, computed) {
                // IE uses filters for opacity
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
                    (0.01 * parseFloat(RegExp.$1)) + "" :
                    computed ? "1" : "";
            },

            set: function (elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";

                // IE has trouble with opacity if it does not have layout
                // Force it by setting the zoom level
                style.zoom = 1;

                // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
                // if value === "", then remove inline opacity #12685
                if ((value >= 1 || value === "") &&
                    jQuery.trim(filter.replace(ralpha, "")) === "" &&
                    style.removeAttribute) {

                    // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
                    // if "filter:" is present at all, clearType is disabled, we want to avoid this
                    // style.removeAttribute is IE Only, but so apparently is this code path...
                    style.removeAttribute("filter");

                    // if there is no filter style applied in a css rule or unset inline opacity, we are done
                    if (value === "" || currentStyle && !currentStyle.filter) {
                        return;
                    }
                }

                // otherwise, set new filter values
                style.filter = ralpha.test(filter) ?
                    filter.replace(ralpha, opacity) :
                    filter + " " + opacity;
            }
        };
    }

    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight,
        function (elem, computed) {
            if (computed) {
                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                // Work around by temporarily setting element display to inline-block
                return jQuery.swap(elem, {
                        "display": "inline-block"
                    },
                    curCSS, [elem, "marginRight"]);
            }
        }
    );

    // These hooks are used by animate to expand properties
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function (value) {
                var i = 0,
                    expanded = {},

                    // assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [value];

                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] =
                        parts[i] || parts[i - 2] || parts[0];
                }

                return expanded;
            }
        };

        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });

    jQuery.fn.extend({
        css: function (name, value) {
            return access(this, function (elem, name, value) {
                var styles, len,
                    map = {},
                    i = 0;

                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;

                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }

                    return map;
                }

                return value !== undefined ?
                    jQuery.style(elem, name, value) :
                    jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function () {
            return showHide(this, true);
        },
        hide: function () {
            return showHide(this);
        },
        toggle: function (state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }

            return this.each(function () {
                if (isHidden(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });


    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;

    Tween.prototype = {
        constructor: Tween,
        init: function (elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function () {
            var hooks = Tween.propHooks[this.prop];

            return hooks && hooks.get ?
                hooks.get(this) :
                Tween.propHooks._default.get(this);
        },
        run: function (percent) {
            var eased,
                hooks = Tween.propHooks[this.prop];

            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;

            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }

            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default: {
            get: function (tween) {
                var result;

                if (tween.elem[tween.prop] != null &&
                    (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop];
                }

                // passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails
                // so, simple values such as "10px" are parsed to Float.
                // complex values such as "rotate(1rad)" are returned as is.
                result = jQuery.css(tween.elem, tween.prop, "");
                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function (tween) {
                // use step hook for back compat - use cssHook if its there - use .style if its
                // available and use plain properties where available
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };

    // Support: IE <=9
    // Panic based approach to setting things on disconnected nodes

    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function (tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };

    jQuery.easing = {
        linear: function (p) {
            return p;
        },
        swing: function (p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        }
    };

    jQuery.fx = Tween.prototype.init;

    // Back Compat <1.8 extension point
    jQuery.fx.step = {};




    var
        fxNow, timerId,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [function (prop, value) {
                var tween = this.createTween(prop, value),
                    target = tween.cur(),
                    parts = rfxnum.exec(value),
                    unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),

                    // Starting value computation is required for potential unit mismatches
                    start = (jQuery.cssNumber[prop] || unit !== "px" && +target) &&
                    rfxnum.exec(jQuery.css(tween.elem, prop)),
                    scale = 1,
                    maxIterations = 20;

                if (start && start[3] !== unit) {
                    // Trust units reported by jQuery.css
                    unit = unit || start[3];

                    // Make sure we update the tween properties later on
                    parts = parts || [];

                    // Iteratively approximate from a nonzero starting point
                    start = +target || 1;

                    do {
                        // If previous iteration zeroed out, double until we get *something*
                        // Use a string for doubling factor so we don't accidentally see scale as unchanged below
                        scale = scale || ".5";

                        // Adjust and apply
                        start = start / scale;
                        jQuery.style(tween.elem, prop, start + unit);

                        // Update scale, tolerating zero or NaN from tween.cur()
                        // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
                    } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
                }

                // Update tween properties
                if (parts) {
                    start = tween.start = +start || +target || 0;
                    tween.unit = unit;
                    // If a +=/-= token was provided, we're doing a relative animation
                    tween.end = parts[1] ?
                        start + (parts[1] + 1) * parts[2] :
                        +parts[2];
                }

                return tween;
            }]
        };

    // Animations created synchronously will run synchronously
    function createFxNow() {
        setTimeout(function () {
            fxNow = undefined;
        });
        return (fxNow = jQuery.now());
    }

    // Generate parameters to create a standard animation
    function genFx(type, includeWidth) {
        var which,
            attrs = {
                height: type
            },
            i = 0;

        // if we include width, step value is 1 to do all cssExpand values,
        // if we don't include width, step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }

        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    function createTween(value, prop, animation) {
        var tween,
            collection = (tweeners[prop] || []).concat(tweeners["*"]),
            index = 0,
            length = collection.length;
        for (; index < length; index++) {
            if ((tween = collection[index].call(animation, prop, value))) {

                // we're done with this property
                return tween;
            }
        }
    }

    function defaultPrefilter(elem, props, opts) {
        /* jshint validthis: true */
        var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHidden(elem),
            dataShow = jQuery._data(elem, "fxshow");

        // handle queue: false promises
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function () {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always(function () {
                // doing this makes sure that the complete handler will be called
                // before this completes
                anim.always(function () {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }

        // height/width overflow pass
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            // Make sure that nothing sneaks out
            // Record all 3 overflow attributes because IE does not
            // change the overflow attribute when overflowX and
            // overflowY are set to the same value
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];

            // Set display property to inline-block for height/width
            // animations on inline elements that are having width/height animated
            display = jQuery.css(elem, "display");
            dDisplay = defaultDisplay(elem.nodeName);
            if (display === "none") {
                display = dDisplay;
            }
            if (display === "inline" &&
                jQuery.css(elem, "float") === "none") {

                // inline-level elements accept inline-block;
                // block-level elements need to be inline with layout
                if (!support.inlineBlockNeedsLayout || dDisplay === "inline") {
                    style.display = "inline-block";
                } else {
                    style.zoom = 1;
                }
            }
        }

        if (opts.overflow) {
            style.overflow = "hidden";
            if (!support.shrinkWrapBlocks()) {
                anim.always(function () {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2];
                });
            }
        }

        // show/hide pass
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {

                    // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            }
        }

        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ("hidden" in dataShow) {
                    hidden = dataShow.hidden;
                }
            } else {
                dataShow = jQuery._data(elem, "fxshow", {});
            }

            // store state if its toggle - enables .stop().toggle() to "reverse"
            if (toggle) {
                dataShow.hidden = !hidden;
            }
            if (hidden) {
                jQuery(elem).show();
            } else {
                anim.done(function () {
                    jQuery(elem).hide();
                });
            }
            anim.done(function () {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                }
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }
        }
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }

            if (index !== name) {
                props[name] = value;
                delete props[index];
            }

            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];

                // not quite $.extend, this wont overwrite keys already present.
                // also - reusing 'index' from above because we have the correct "name"
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }

    function Animation(elem, properties, options) {
        var result,
            stopped,
            index = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always(function () {
                // don't match elem in the :animated selector
                delete tick.elem;
            }),
            tick = function () {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                    // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;

                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }

                deferred.notifyWith(elem, [animation, percent, remaining]);

                if (percent < 1 && length) {
                    return remaining;
                } else {
                    deferred.resolveWith(elem, [animation]);
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {}
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function (prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end,
                        animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function (gotoEnd) {
                    var index = 0,
                        // if we are going to the end, we want to run all the tweens
                        // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }

                    // resolve when we played the last frame
                    // otherwise, reject
                    if (gotoEnd) {
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }),
            props = animation.props;

        propFilter(props, animation.opts.specialEasing);

        for (; index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result;
            }
        }

        jQuery.map(props, createTween, animation);

        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }

        jQuery.fx.timer(
            jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })
        );

        // attach callbacks from options
        return animation.progress(animation.opts.progress)
            .done(animation.opts.done, animation.opts.complete)
            .fail(animation.opts.fail)
            .always(animation.opts.always);
    }

    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function (props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"];
            } else {
                props = props.split(" ");
            }

            var prop,
                index = 0,
                length = props.length;

            for (; index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback);
            }
        },

        prefilter: function (callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback);
            } else {
                animationPrefilters.push(callback);
            }
        }
    });

    jQuery.speed = function (speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing ||
                jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };

        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
            opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

        // normalize opt.queue - true/undefined/null -> "fx"
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function () {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }

            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };

        return opt;
    };

    jQuery.fn.extend({
        fadeTo: function (speed, to, easing, callback) {

            // show any hidden elements after setting opacity to 0
            return this.filter(isHidden).css("opacity", 0).show()

                // animate to the value specified
                .end().animate({
                    opacity: to
                }, speed, easing, callback);
        },
        animate: function (prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function () {
                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation(this, jQuery.extend({}, prop), optall);

                    // Empty animations, or finishing resolves immediately
                    if (empty || jQuery._data(this, "finish")) {
                        anim.stop(true);
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || optall.queue === false ?
                this.each(doAnimation) :
                this.queue(optall.queue, doAnimation);
        },
        stop: function (type, clearQueue, gotoEnd) {
            var stopQueue = function (hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };

            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }

            return this.each(function () {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = jQuery._data(this);

                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }

                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }

                // start the next in the queue if the last step wasn't forced
                // timers currently will call their complete callbacks, which will dequeue
                // but only if they were gotoEnd
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function (type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function () {
                var index,
                    data = jQuery._data(this),
                    queue = data[type + "queue"],
                    hooks = data[type + "queueHooks"],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;

                // enable finishing flag on private data
                data.finish = true;

                // empty the queue first
                jQuery.queue(this, type, []);

                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }

                // look for any active animations, and finish them
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }

                // look for any animations in the old queue and finish them
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }

                // turn off finishing flag
                delete data.finish;
            });
        }
    });

    jQuery.each(["toggle", "show", "hide"], function (i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function (speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply(this, arguments) :
                this.animate(genFx(name, true), speed, easing, callback);
        };
    });

    // Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (name, props) {
        jQuery.fn[name] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });

    jQuery.timers = [];
    jQuery.fx.tick = function () {
        var timer,
            timers = jQuery.timers,
            i = 0;

        fxNow = jQuery.now();

        for (; i < timers.length; i++) {
            timer = timers[i];
            // Checks the timer has not already been removed
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }

        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };

    jQuery.fx.timer = function (timer) {
        jQuery.timers.push(timer);
        if (timer()) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };

    jQuery.fx.interval = 13;

    jQuery.fx.start = function () {
        if (!timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };

    jQuery.fx.stop = function () {
        clearInterval(timerId);
        timerId = null;
    };

    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
    };


    // Based off of the plugin by Clint Helfers, with permission.
    // http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function (time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";

        return this.queue(type, function (next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function () {
                clearTimeout(timeout);
            };
        });
    };


    (function () {
        var a, input, select, opt,
            div = document.createElement("div");

        // Setup
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[0];

        // First batch of tests.
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];

        a.style.cssText = "top:1px";

        // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
        support.getSetAttribute = div.className !== "t";

        // Get the style information from getAttribute
        // (IE uses .cssText instead)
        support.style = /top/.test(a.getAttribute("style"));

        // Make sure that URLs aren't manipulated
        // (IE normalizes it by default)
        support.hrefNormalized = a.getAttribute("href") === "/a";

        // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
        support.checkOn = !!input.value;

        // Make sure that a selected-by-default option has a working selected property.
        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
        support.optSelected = opt.selected;

        // Tests for enctype support on a form (#6743)
        support.enctype = !!document.createElement("form").enctype;

        // Make sure that the options inside disabled selects aren't marked as disabled
        // (WebKit marks them as disabled)
        select.disabled = true;
        support.optDisabled = !opt.disabled;

        // Support: IE8 only
        // Check if we can trust getAttribute("value")
        input = document.createElement("input");
        input.setAttribute("value", "");
        support.input = input.getAttribute("value") === "";

        // Check if an input maintains its value after becoming a radio
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";

        // Null elements to avoid leaks in IE.
        a = input = select = opt = div = null;
    })();


    var rreturn = /\r/g;

    jQuery.fn.extend({
        val: function (value) {
            var hooks, ret, isFunction,
                elem = this[0];

            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }

                    ret = elem.value;

                    return typeof ret === "string" ?
                        // handle most common string cases
                        ret.replace(rreturn, "") :
                        // handle cases where value is null/undef or number
                        ret == null ? "" : ret;
                }

                return;
            }

            isFunction = jQuery.isFunction(value);

            return this.each(function (i) {
                var val;

                if (this.nodeType !== 1) {
                    return;
                }

                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function (value) {
                        return value == null ? "" : value + "";
                    });
                }

                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

                // If set returns undefined, fall back to normal setting
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });

    jQuery.extend({
        valHooks: {
            option: {
                get: function (elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return val != null ?
                        val :
                        jQuery.text(elem);
                }
            },
            select: {
                get: function (elem) {
                    var value, option,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ?
                        max :
                        one ? index : 0;

                    // Loop through all the selected options
                    for (; i < max; i++) {
                        option = options[i];

                        // oldIE doesn't update selected after form reset (#2551)
                        if ((option.selected || i === index) &&
                            // Don't return options that are disabled or in a disabled optgroup
                            (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
                            (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

                            // Get the specific value for the option
                            value = jQuery(option).val();

                            // We don't need an array for one selects
                            if (one) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push(value);
                        }
                    }

                    return values;
                },

                set: function (elem, value) {
                    var optionSet, option,
                        options = elem.options,
                        values = jQuery.makeArray(value),
                        i = options.length;

                    while (i--) {
                        option = options[i];

                        if (jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) {

                            // Support: IE6
                            // When new option element is added to select box we need to
                            // force reflow of newly added node in order to workaround delay
                            // of initialization properties
                            try {
                                option.selected = optionSet = true;

                            } catch (_) {

                                // Will be executed only in IE6
                                option.scrollHeight;
                            }

                        } else {
                            option.selected = false;
                        }
                    }

                    // Force browsers to behave consistently when non-matching value is set
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }

                    return options;
                }
            }
        }
    });

    // Radios and checkboxes getter/setter
    jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = {
            set: function (elem, value) {
                if (jQuery.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function (elem) {
                // Support: Webkit
                // "" is returned instead of "on" if a value isn't specified
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });




    var nodeHook, boolHook,
        attrHandle = jQuery.expr.attrHandle,
        ruseDefault = /^(?:checked|selected)$/i,
        getSetAttribute = support.getSetAttribute,
        getSetInput = support.input;

    jQuery.fn.extend({
        attr: function (name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },

        removeAttr: function (name) {
            return this.each(function () {
                jQuery.removeAttr(this, name);
            });
        }
    });

    jQuery.extend({
        attr: function (elem, name, value) {
            var hooks, ret,
                nType = elem.nodeType;

            // don't get/set attributes on text, comment and attribute nodes
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            // Fallback to prop when attributes are not supported
            if (typeof elem.getAttribute === strundefined) {
                return jQuery.prop(elem, name, value);
            }

            // All attributes are lowercase
            // Grab necessary hook if one is defined
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] ||
                    (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
            }

            if (value !== undefined) {

                if (value === null) {
                    jQuery.removeAttr(elem, name);

                } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;

                } else {
                    elem.setAttribute(name, value + "");
                    return value;
                }

            } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;

            } else {
                ret = jQuery.find.attr(elem, name);

                // Non-existent attributes return null, we normalize to undefined
                return ret == null ?
                    undefined :
                    ret;
            }
        },

        removeAttr: function (elem, value) {
            var name, propName,
                i = 0,
                attrNames = value && value.match(rnotwhite);

            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    propName = jQuery.propFix[name] || name;

                    // Boolean attributes get special treatment (#10870)
                    if (jQuery.expr.match.bool.test(name)) {
                        // Set corresponding property to false
                        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                            elem[propName] = false;
                            // Support: IE<9
                            // Also clear defaultChecked/defaultSelected (if appropriate)
                        } else {
                            elem[jQuery.camelCase("default-" + name)] =
                                elem[propName] = false;
                        }

                        // See #9699 for explanation of this approach (setting first, then removal)
                    } else {
                        jQuery.attr(elem, name, "");
                    }

                    elem.removeAttribute(getSetAttribute ? name : propName);
                }
            }
        },

        attrHooks: {
            type: {
                set: function (elem, value) {
                    if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        // Setting the type on a radio button after the value resets the value in IE6-9
                        // Reset value to default in case type is set after value during creation
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        }
    });

    // Hook for boolean attributes
    boolHook = {
        set: function (elem, value, name) {
            if (value === false) {
                // Remove boolean attributes when set to false
                jQuery.removeAttr(elem, name);
            } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                // IE<8 needs the *property* name
                elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);

                // Use defaultChecked and defaultSelected for oldIE
            } else {
                elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
            }

            return name;
        }
    };

    // Retrieve booleans specially
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {

        var getter = attrHandle[name] || jQuery.find.attr;

        attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ?
            function (elem, name, isXML) {
                var ret, handle;
                if (!isXML) {
                    // Avoid an infinite loop by temporarily removing this function from the getter
                    handle = attrHandle[name];
                    attrHandle[name] = ret;
                    ret = getter(elem, name, isXML) != null ?
                        name.toLowerCase() :
                        null;
                    attrHandle[name] = handle;
                }
                return ret;
            } :
            function (elem, name, isXML) {
                if (!isXML) {
                    return elem[jQuery.camelCase("default-" + name)] ?
                        name.toLowerCase() :
                        null;
                }
            };
    });

    // fix oldIE attroperties
    if (!getSetInput || !getSetAttribute) {
        jQuery.attrHooks.value = {
            set: function (elem, value, name) {
                if (jQuery.nodeName(elem, "input")) {
                    // Does not return so that setAttribute is also used
                    elem.defaultValue = value;
                } else {
                    // Use nodeHook if defined (#1954); otherwise setAttribute is fine
                    return nodeHook && nodeHook.set(elem, value, name);
                }
            }
        };
    }

    // IE6/7 do not support getting/setting some attributes with get/setAttribute
    if (!getSetAttribute) {

        // Use this for any attribute in IE6/7
        // This fixes almost every IE6/7 issue
        nodeHook = {
            set: function (elem, value, name) {
                // Set the existing or create a new attribute node
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    elem.setAttributeNode(
                        (ret = elem.ownerDocument.createAttribute(name))
                    );
                }

                ret.value = value += "";

                // Break association with cloned elements by also using setAttribute (#9646)
                if (name === "value" || value === elem.getAttribute(name)) {
                    return value;
                }
            }
        };

        // Some attributes are constructed with empty-string values when not defined
        attrHandle.id = attrHandle.name = attrHandle.coords =
            function (elem, name, isXML) {
                var ret;
                if (!isXML) {
                    return (ret = elem.getAttributeNode(name)) && ret.value !== "" ?
                        ret.value :
                        null;
                }
            };

        // Fixing value retrieval on a button requires this module
        jQuery.valHooks.button = {
            get: function (elem, name) {
                var ret = elem.getAttributeNode(name);
                if (ret && ret.specified) {
                    return ret.value;
                }
            },
            set: nodeHook.set
        };

        // Set contenteditable to false on removals(#10429)
        // Setting to empty string throws an error as an invalid value
        jQuery.attrHooks.contenteditable = {
            set: function (elem, value, name) {
                nodeHook.set(elem, value === "" ? false : value, name);
            }
        };

        // Set width and height to auto instead of 0 on empty string( Bug #8150 )
        // This is for removals
        jQuery.each(["width", "height"], function (i, name) {
            jQuery.attrHooks[name] = {
                set: function (elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value;
                    }
                }
            };
        });
    }

    if (!support.style) {
        jQuery.attrHooks.style = {
            get: function (elem) {
                // Return undefined in the case of empty string
                // Note: IE uppercases css property names, but if we were to .toLowerCase()
                // .cssText, that would destroy case senstitivity in URL's, like in "background"
                return elem.style.cssText || undefined;
            },
            set: function (elem, value) {
                return (elem.style.cssText = value + "");
            }
        };
    }




    var rfocusable = /^(?:input|select|textarea|button|object)$/i,
        rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend({
        prop: function (name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },

        removeProp: function (name) {
            name = jQuery.propFix[name] || name;
            return this.each(function () {
                // try/catch handles cases where IE balks (such as removing a property on window)
                try {
                    this[name] = undefined;
                    delete this[name];
                } catch (e) {}
            });
        }
    });

    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },

        prop: function (elem, name, value) {
            var ret, hooks, notxml,
                nType = elem.nodeType;

            // don't get/set properties on text, comment and attribute nodes
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);

            if (notxml) {
                // Fix name and attach hooks
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }

            if (value !== undefined) {
                return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ?
                    ret :
                    (elem[name] = value);

            } else {
                return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ?
                    ret :
                    elem[name];
            }
        },

        propHooks: {
            tabIndex: {
                get: function (elem) {
                    // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    // Use proper attribute retrieval(#12072)
                    var tabindex = jQuery.find.attr(elem, "tabindex");

                    return tabindex ?
                        parseInt(tabindex, 10) :
                        rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ?
                        0 :
                        -1;
                }
            }
        }
    });

    // Some attributes require a special call on IE
    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if (!support.hrefNormalized) {
        // href/src property should get the full normalized URL (#10299/#12915)
        jQuery.each(["href", "src"], function (i, name) {
            jQuery.propHooks[name] = {
                get: function (elem) {
                    return elem.getAttribute(name, 4);
                }
            };
        });
    }

    // Support: Safari, IE9+
    // mis-reports the default selected property of an option
    // Accessing the parent's selectedIndex property fixes it
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function (elem) {
                var parent = elem.parentNode;

                if (parent) {
                    parent.selectedIndex;

                    // Make sure that it also works with optgroups, see #5701
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            }
        };
    }

    jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function () {
        jQuery.propFix[this.toLowerCase()] = this;
    });

    // IE6/7 call enctype encoding
    if (!support.enctype) {
        jQuery.propFix.enctype = "encoding";
    }




    var rclass = /[\t\r\n\f]/g;

    jQuery.fn.extend({
        addClass: function (value) {
            var classes, elem, cur, clazz, j, finalValue,
                i = 0,
                len = this.length,
                proceed = typeof value === "string" && value;

            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).addClass(value.call(this, j, this.className));
                });
            }

            if (proceed) {
                // The disjunction here is for better compressibility (see removeClass)
                classes = (value || "").match(rnotwhite) || [];

                for (; i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ?
                        (" " + elem.className + " ").replace(rclass, " ") :
                        " "
                    );

                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }

                        // only assign if different to avoid unneeded rendering.
                        finalValue = jQuery.trim(cur);
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }

            return this;
        },

        removeClass: function (value) {
            var classes, elem, cur, clazz, j, finalValue,
                i = 0,
                len = this.length,
                proceed = arguments.length === 0 || typeof value === "string" && value;

            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).removeClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];

                for (; i < len; i++) {
                    elem = this[i];
                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && (elem.className ?
                        (" " + elem.className + " ").replace(rclass, " ") :
                        ""
                    );

                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            // Remove *all* instances
                            while (cur.indexOf(" " + clazz + " ") >= 0) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }

                        // only assign if different to avoid unneeded rendering.
                        finalValue = value ? jQuery.trim(cur) : "";
                        if (elem.className !== finalValue) {
                            elem.className = finalValue;
                        }
                    }
                }
            }

            return this;
        },

        toggleClass: function (value, stateVal) {
            var type = typeof value;

            if (typeof stateVal === "boolean" && type === "string") {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }

            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }

            return this.each(function () {
                if (type === "string") {
                    // toggle individual class names
                    var className,
                        i = 0,
                        self = jQuery(this),
                        classNames = value.match(rnotwhite) || [];

                    while ((className = classNames[i++])) {
                        // check each className given, space separated list
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }

                    // Toggle whole class name
                } else if (type === strundefined || type === "boolean") {
                    if (this.className) {
                        // store className if set
                        jQuery._data(this, "__className__", this.className);
                    }

                    // If the element has a class name or if we're passed "false",
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                }
            });
        },

        hasClass: function (selector) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true;
                }
            }

            return false;
        }
    });




    // Return jQuery for attributes-only inclusion


    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {

        // Handle event binding
        jQuery.fn[name] = function (data, fn) {
            return arguments.length > 0 ?
                this.on(name, null, data, fn) :
                this.trigger(name);
        };
    });

    jQuery.fn.extend({
        hover: function (fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },

        bind: function (types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function (types, fn) {
            return this.off(types, null, fn);
        },

        delegate: function (selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function (selector, types, fn) {
            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });


    var nonce = jQuery.now();

    var rquery = (/\?/);



    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

    jQuery.parseJSON = function (data) {
        // Attempt to parse using the native JSON parser first
        if (window.JSON && window.JSON.parse) {
            // Support: Android 2.3
            // Workaround failure to string-cast null input
            return window.JSON.parse(data + "");
        }

        var requireNonComma,
            depth = null,
            str = jQuery.trim(data + "");

        // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
        // after removing valid tokens
        return str && !jQuery.trim(str.replace(rvalidtokens, function (token, comma, open, close) {

                // Force termination if we see a misplaced comma
                if (requireNonComma && comma) {
                    depth = 0;
                }

                // Perform no more replacements after returning to outermost depth
                if (depth === 0) {
                    return token;
                }

                // Commas must not follow "[", "{", or ","
                requireNonComma = open || comma;

                // Determine new depth
                // array/object open ("[" or "{"): depth += true - false (increment)
                // array/object close ("]" or "}"): depth += false - true (decrement)
                // other cases ("," or primitive): depth += true - true (numeric cast)
                depth += !close - !open;

                // Remove this token
                return "";
            })) ?
            (Function("return " + str))() :
            jQuery.error("Invalid JSON: " + data);
    };


    // Cross-browser xml parsing
    jQuery.parseXML = function (data) {
        var xml, tmp;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            if (window.DOMParser) { // Standard
                tmp = new DOMParser();
                xml = tmp.parseFromString(data, "text/xml");
            } else { // IE
                xml = new ActiveXObject("Microsoft.XMLDOM");
                xml.async = "false";
                xml.loadXML(data);
            }
        } catch (e) {
            xml = undefined;
        }
        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };


    var
        // Document location
        ajaxLocParts,
        ajaxLocation,

        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {},

        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {},

        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat("*");

    // #8138, IE may throw an exception when accessing
    // a field from window.location if document.domain has been set
    try {
        ajaxLocation = location.href;
    } catch (e) {
        // Use the href attribute of an A element
        // since IE will modify it given document.location
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }

    // Segment location into parts
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {

        // dataTypeExpression is optional and defaults to "*"
        return function (dataTypeExpression, func) {

            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

            if (jQuery.isFunction(func)) {
                // For each dataType in the dataTypeExpression
                while ((dataType = dataTypes[i++])) {
                    // Prepend if requested
                    if (dataType.charAt(0) === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);

                        // Otherwise append
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }

    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

        var inspected = {},
            seekingTransport = (structure === transports);

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }

        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }

    // A special extend for ajax options
    // that takes "flat" options (not to be deep extended)
    // Fixes #9887
    function ajaxExtend(target, src) {
        var deep, key,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }

        return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses(s, jqXHR, responses) {
        var firstDataType, ct, finalDataType, type,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }

        // Check if we're dealing with a known content-type
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            // Try convertible dataTypes
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev,
            converters = {},
            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while (current) {

            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }

            // Apply the dataFilter if provided
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }

            prev = current;
            current = dataTypes.shift();

            if (current) {

                // There's only work to do if current dataType is non-auto
                if (current === "*") {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if (prev !== "*" && prev !== current) {

                    // Seek a direct converter
                    conv = converters[prev + " " + current] || converters["* " + current];

                    // If none found, seek a pair
                    if (!conv) {
                        for (conv2 in converters) {

                            // If conv2 outputs current
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {

                                // If prev can be converted to accepted input
                                conv = converters[prev + " " + tmp[0]] ||
                                    converters["* " + tmp[0]];
                                if (conv) {
                                    // Condense equivalence converters
                                    if (conv === true) {
                                        conv = converters[conv2];

                                        // Otherwise, insert the intermediate dataType
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if (conv !== true) {

                        // Unless errors are allowed to bubble, catch and return them
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }

        return {
            state: "success",
            data: response
        };
    }

    jQuery.extend({

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            /*
            timeout: 0,
            data: null,
            dataType: null,
            username: null,
            password: null,
            cache: null,
            throws: false,
            traditional: false,
            headers: {},
            */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": jQuery.parseJSON,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function (target, settings) {
            return settings ?

                // Building a settings object
                ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

                // Extending ajaxSettings
                ajaxExtend(jQuery.ajaxSettings, target);
        },

        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),

        // Main method
        ajax: function (url, options) {

            // If url is an object, simulate pre-1.5 signature
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var // Cross-domain detection vars
                parts,
                // Loop variable
                i,
                // URL without anti-cache param
                cacheURL,
                // Response headers as string
                responseHeadersString,
                // timeout handle
                timeoutTimer,

                // To know if global events are to be dispatched
                fireGlobals,

                transport,
                // Response headers
                responseHeaders,
                // Create the final options object
                s = jQuery.ajaxSetup({}, options),
                // Callbacks context
                callbackContext = s.context || s,
                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ?
                jQuery(callbackContext) :
                jQuery.event,
                // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                // Status-dependent callbacks
                statusCode = s.statusCode || {},
                // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},
                // The jqXHR state
                state = 0,
                // Default abort message
                strAbort = "canceled",
                // Fake xhr
                jqXHR = {
                    readyState: 0,

                    // Builds headers hashtable if needed
                    getResponseHeader: function (key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },

                    // Raw string
                    getAllResponseHeaders: function () {
                        return state === 2 ? responseHeadersString : null;
                    },

                    // Caches the header
                    setRequestHeader: function (name, value) {
                        var lname = name.toLowerCase();
                        if (!state) {
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },

                    // Overrides response content-type header
                    overrideMimeType: function (type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Status-dependent callbacks
                    statusCode: function (map) {
                        var code;
                        if (map) {
                            if (state < 2) {
                                for (code in map) {
                                    // Lazy-add the new callback in a way that preserves old ones
                                    statusCode[code] = [statusCode[code], map[code]];
                                }
                            } else {
                                // Execute the appropriate callbacks
                                jqXHR.always(map[jqXHR.status]);
                            }
                        }
                        return this;
                    },

                    // Cancel the request
                    abort: function (statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };

            // Attach deferreds
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;

            // Remove hash character (#7531: and string promotion)
            // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

            // A cross-domain request is in order when we have a protocol:host:port mismatch
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts &&
                    (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
                        (parts[3] || (parts[1] === "http:" ? "80" : "443")) !==
                        (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))
                );
            }

            // Convert data if not already a string
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }

            // Apply prefilters
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

            // If request was aborted inside a prefilter, stop there
            if (state === 2) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            fireGlobals = s.global;

            // Watch for a new set of requests
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test(s.type);

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            cacheURL = s.url;

            // More options handling for requests with no content
            if (!s.hasContent) {

                // If data is available, append data to url
                if (s.data) {
                    cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add anti-cache in url if needed
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ?

                        // If there is already a '_' parameter, set its value
                        cacheURL.replace(rts, "$1_=" + nonce++) :

                        // Otherwise add one to the end
                        cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
                }
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }

            // Set the correct header, if data is being sent
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }

            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
                s.accepts["*"]
            );

            // Check for headers option
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }

            // Allow custom headers/mimetypes and early abort
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                // Abort if not done already and return
                return jqXHR.abort();
            }

            // aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                jqXHR[i](s[i]);
            }

            // Get transport
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

            // If no transport, we auto-abort
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }
                // Timeout
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function () {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }

                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    // Propagate exception as error if not done
                    if (state < 2) {
                        done(-1, e);
                        // Simply rethrow otherwise
                    } else {
                        throw e;
                    }
                }
            }

            // Callback for when everything is done
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Called once
                if (state === 2) {
                    return;
                }

                // State is "done" now
                state = 2;

                // Clear timeout if it exists
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert(s, response, jqXHR, isSuccess);

                // If successful, handle type chaining
                if (isSuccess) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }

                    // if no content
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";

                        // if not modified
                    } else if (status === 304) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    // We extract error from statusText
                    // then normalize statusText and status for non-aborts
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";

                // Success/Error
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }

                // Status-dependent callbacks
                jqXHR.statusCode(statusCode);
                statusCode = undefined;

                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError",
                        [jqXHR, s, isSuccess ? success : error]);
                }

                // Complete
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    // Handle the global AJAX counter
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },

        getScript: function (url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });

    jQuery.each(["get", "post"], function (i, method) {
        jQuery[method] = function (url, data, callback, type) {
            // shift arguments if data argument was omitted
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });

    // Attach a bunch of functions for handling common AJAX events
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
        jQuery.fn[type] = function (fn) {
            return this.on(type, fn);
        };
    });


    jQuery._evalUrl = function (url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        });
    };


    jQuery.fn.extend({
        wrapAll: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }

            if (this[0]) {
                // The elements to wrap the target around
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }

                wrap.map(function () {
                    var elem = this;

                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }

                    return elem;
                }).append(this);
            }

            return this;
        },

        wrapInner: function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }

            return this.each(function () {
                var self = jQuery(this),
                    contents = self.contents();

                if (contents.length) {
                    contents.wrapAll(html);

                } else {
                    self.append(html);
                }
            });
        },

        wrap: function (html) {
            var isFunction = jQuery.isFunction(html);

            return this.each(function (i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },

        unwrap: function () {
            return this.parent().each(function () {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        }
    });


    jQuery.expr.filters.hidden = function (elem) {
        // Support: Opera <= 12.12
        // Opera reports offsetWidths and offsetHeights less than zero on some elements
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
            (!support.reliableHiddenOffsets() &&
                ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none");
    };

    jQuery.expr.filters.visible = function (elem) {
        return !jQuery.expr.filters.hidden(elem);
    };




    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
        var name;

        if (jQuery.isArray(obj)) {
            // Serialize array item.
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);

                } else {
                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
                }
            });

        } else if (!traditional && jQuery.type(obj) === "object") {
            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }

        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }

    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery.param = function (a, traditional) {
        var prefix,
            s = [],
            add = function (key, value) {
                // If value is a function, invoke it and return its value
                value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
            // Serialize the form elements
            jQuery.each(a, function () {
                add(this.name, this.value);
            });

        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }

        // Return the resulting serialization
        return s.join("&").replace(r20, "+");
    };

    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                    // Can add propHook for "elements" to filter or add form elements
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this;
                })
                .filter(function () {
                    var type = this.type;
                    // Use .is(":disabled") so that fieldset[disabled] works
                    return this.name && !jQuery(this).is(":disabled") &&
                        rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                        (this.checked || !rcheckableType.test(type));
                })
                .map(function (i, elem) {
                    var val = jQuery(this).val();

                    return val == null ?
                        null :
                        jQuery.isArray(val) ?
                        jQuery.map(val, function (val) {
                            return {
                                name: elem.name,
                                value: val.replace(rCRLF, "\r\n")
                            };
                        }) : {
                            name: elem.name,
                            value: val.replace(rCRLF, "\r\n")
                        };
                }).get();
        }
    });


    // Create the request object
    // (This is still attached to ajaxSettings for backward compatibility)
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
        // Support: IE6+
        function () {

            // XHR cannot access local files, always use ActiveX for that case
            return !this.isLocal &&

                // Support: IE7-8
                // oldIE XHR does not support non-RFC2616 methods (#13240)
                // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
                // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
                // Although this check for six methods instead of eight
                // since IE also does not support "trace" and "connect"
                /^(get|post|head|put|delete|options)$/i.test(this.type) &&

                createStandardXHR() || createActiveXHR();
        } :
        // For all other browsers, use the standard XMLHttpRequest object
        createStandardXHR;

    var xhrId = 0,
        xhrCallbacks = {},
        xhrSupported = jQuery.ajaxSettings.xhr();

    // Support: IE<10
    // Open requests must be manually aborted on unload (#5280)
    if (window.ActiveXObject) {
        jQuery(window).on("unload", function () {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](undefined, true);
            }
        });
    }

    // Determine support properties
    support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
    xhrSupported = support.ajax = !!xhrSupported;

    // Create transport if the browser can provide an xhr
    if (xhrSupported) {

        jQuery.ajaxTransport(function (options) {
            // Cross domain only allowed if supported through XMLHttpRequest
            if (!options.crossDomain || support.cors) {

                var callback;

                return {
                    send: function (headers, complete) {
                        var i,
                            xhr = options.xhr(),
                            id = ++xhrId;

                        // Open the socket
                        xhr.open(options.type, options.url, options.async, options.username, options.password);

                        // Apply custom fields if provided
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i];
                            }
                        }

                        // Override mime type if needed
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType);
                        }

                        // X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }

                        // Set headers
                        for (i in headers) {
                            // Support: IE<9
                            // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
                            // request header to a null-value.
                            //
                            // To keep consistent with other XHR implementations, cast the value
                            // to string and ignore `undefined`.
                            if (headers[i] !== undefined) {
                                xhr.setRequestHeader(i, headers[i] + "");
                            }
                        }

                        // Do send the request
                        // This may raise an exception which is actually
                        // handled in jQuery.ajax (so no try/catch here)
                        xhr.send((options.hasContent && options.data) || null);

                        // Listener
                        callback = function (_, isAbort) {
                            var status, statusText, responses;

                            // Was never called and is aborted or complete
                            if (callback && (isAbort || xhr.readyState === 4)) {
                                // Clean up
                                delete xhrCallbacks[id];
                                callback = undefined;
                                xhr.onreadystatechange = jQuery.noop;

                                // Abort manually if needed
                                if (isAbort) {
                                    if (xhr.readyState !== 4) {
                                        xhr.abort();
                                    }
                                } else {
                                    responses = {};
                                    status = xhr.status;

                                    // Support: IE<10
                                    // Accessing binary-data responseText throws an exception
                                    // (#11426)
                                    if (typeof xhr.responseText === "string") {
                                        responses.text = xhr.responseText;
                                    }

                                    // Firefox throws an exception when accessing
                                    // statusText for faulty cross-domain requests
                                    try {
                                        statusText = xhr.statusText;
                                    } catch (e) {
                                        // We normalize with Webkit giving an empty statusText
                                        statusText = "";
                                    }

                                    // Filter status for non standard behaviors

                                    // If the request is local and we have data: assume a success
                                    // (success with no data won't get notified, that's the best we
                                    // can do given current implementations)
                                    if (!status && options.isLocal && !options.crossDomain) {
                                        status = responses.text ? 200 : 404;
                                        // IE - #1450: sometimes returns 1223 when it should be 204
                                    } else if (status === 1223) {
                                        status = 204;
                                    }
                                }
                            }

                            // Call complete if needed
                            if (responses) {
                                complete(status, statusText, responses, xhr.getAllResponseHeaders());
                            }
                        };

                        if (!options.async) {
                            // if we're in sync mode we fire the callback
                            callback();
                        } else if (xhr.readyState === 4) {
                            // (IE6 & IE7) if it's in cache and has been
                            // retrieved directly we need to fire the callback
                            setTimeout(callback);
                        } else {
                            // Add to the list of active xhr callbacks
                            xhr.onreadystatechange = xhrCallbacks[id] = callback;
                        }
                    },

                    abort: function () {
                        if (callback) {
                            callback(undefined, true);
                        }
                    }
                };
            }
        });
    }

    // Functions to create xhrs
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }




    // Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function (text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });

    // Handle cache's special case and global
    jQuery.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });

    // Bind script tag hack transport
    jQuery.ajaxTransport("script", function (s) {

        // This transport only deals with cross domain requests
        if (s.crossDomain) {

            var script,
                head = document.head || jQuery("head")[0] || document.documentElement;

            return {

                send: function (_, callback) {

                    script = document.createElement("script");

                    script.async = true;

                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }

                    script.src = s.url;

                    // Attach handlers for all browsers
                    script.onload = script.onreadystatechange = function (_, isAbort) {

                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

                            // Handle memory leak in IE
                            script.onload = script.onreadystatechange = null;

                            // Remove the script
                            if (script.parentNode) {
                                script.parentNode.removeChild(script);
                            }

                            // Dereference the script
                            script = null;

                            // Callback if not abort
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };

                    // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    head.insertBefore(script, head.firstChild);
                },

                abort: function () {
                    if (script) {
                        script.onload(undefined, true);
                    }
                }
            };
        }
    });




    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

    // Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
            this[callback] = true;
            return callback;
        }
    });

    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
                "url" :
                typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data"
            );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if (jsonProp || s.dataTypes[0] === "jsonp") {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function () {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };

            // force json dataType
            s.dataTypes[0] = "json";

            // Install callback
            overwritten = window[callbackName];
            window[callbackName] = function () {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function () {
                // Restore preexisting value
                window[callbackName] = overwritten;

                // Save back as free
                if (s[callbackName]) {
                    // make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // save the callback name for future use
                    oldCallbacks.push(callbackName);
                }

                // Call if it was a function and we have a response
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });




    // data: string of html
    // context (optional): If specified, the fragment will be created in this context, defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function (data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null;
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }
        context = context || document;

        var parsed = rsingleTag.exec(data),
            scripts = !keepScripts && [];

        // Single tag
        if (parsed) {
            return [context.createElement(parsed[1])];
        }

        parsed = jQuery.buildFragment([data], context, scripts);

        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }

        return jQuery.merge([], parsed.childNodes);
    };


    // Keep a copy of the old load method
    var _load = jQuery.fn.load;

    /**
     * Load a url into a page
     */
    jQuery.fn.load = function (url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments);
        }

        var selector, response, type,
            self = this,
            off = url.indexOf(" ");

        if (off >= 0) {
            selector = url.slice(off, url.length);
            url = url.slice(0, off);
        }

        // If it's a function
        if (jQuery.isFunction(params)) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if (params && typeof params === "object") {
            type = "POST";
        }

        // If we have elements to modify, make the request
        if (self.length > 0) {
            jQuery.ajax({
                url: url,

                // if "type" variable is undefined, then "GET" method will be used
                type: type,
                dataType: "html",
                data: params
            }).done(function (responseText) {

                // Save response for use in complete callback
                response = arguments;

                self.html(selector ?

                    // If a selector was specified, locate the right elements in a dummy div
                    // Exclude scripts to avoid IE 'Permission Denied' errors
                    jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

                    // Otherwise use the full result
                    responseText);

            }).complete(callback && function (jqXHR, status) {
                self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
            });
        }

        return this;
    };




    jQuery.expr.filters.animated = function (elem) {
        return jQuery.grep(jQuery.timers, function (fn) {
            return elem === fn.elem;
        }).length;
    };





    var docElem = window.document.documentElement;

    /**
     * Gets a window from an element
     */
    function getWindow(elem) {
        return jQuery.isWindow(elem) ?
            elem :
            elem.nodeType === 9 ?
            elem.defaultView || elem.parentWindow :
            false;
    }

    jQuery.offset = {
        setOffset: function (elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                position = jQuery.css(elem, "position"),
                curElem = jQuery(elem),
                props = {};

            // set position first, in-case top/left are set even on static elem
            if (position === "static") {
                elem.style.position = "relative";
            }

            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") &&
                jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;

            // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }

            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }

            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }

            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };

    jQuery.fn.extend({
        offset: function (options) {
            if (arguments.length) {
                return options === undefined ?
                    this :
                    this.each(function (i) {
                        jQuery.offset.setOffset(this, options, i);
                    });
            }

            var docElem, win,
                box = {
                    top: 0,
                    left: 0
                },
                elem = this[0],
                doc = elem && elem.ownerDocument;

            if (!doc) {
                return;
            }

            docElem = doc.documentElement;

            // Make sure it's not a disconnected DOM node
            if (!jQuery.contains(docElem, elem)) {
                return box;
            }

            // If we don't have gBCR, just use 0,0 rather than error
            // BlackBerry 5, iOS 3 (original iPhone)
            if (typeof elem.getBoundingClientRect !== strundefined) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            };
        },

        position: function () {
            if (!this[0]) {
                return;
            }

            var offsetParent, offset,
                parentOffset = {
                    top: 0,
                    left: 0
                },
                elem = this[0];

            // fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
            if (jQuery.css(elem, "position") === "fixed") {
                // we assume that getBoundingClientRect is available when computed position is fixed
                offset = elem.getBoundingClientRect();
            } else {
                // Get *real* offsetParent
                offsetParent = this.offsetParent();

                // Get correct offsets
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset();
                }

                // Add offsetParent borders
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
            }

            // Subtract parent offsets and element margins
            // note: when an element has margin: auto the offsetLeft and marginLeft
            // are the same in Safari causing offset.left to incorrectly be 0
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },

        offsetParent: function () {
            return this.map(function () {
                var offsetParent = this.offsetParent || docElem;

                while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || docElem;
            });
        }
    });

    // Create scrollLeft and scrollTop methods
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (method, prop) {
        var top = /Y/.test(prop);

        jQuery.fn[method] = function (val) {
            return access(this, function (elem, method, val) {
                var win = getWindow(elem);

                if (val === undefined) {
                    return win ? (prop in win) ? win[prop] :
                        win.document.documentElement[method] :
                        elem[method];
                }

                if (win) {
                    win.scrollTo(
                        !top ? val : jQuery(win).scrollLeft(),
                        top ? val : jQuery(win).scrollTop()
                    );

                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length, null);
        };
    });

    // Add the top/left cssHooks using jQuery.fn.position
    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // getComputedStyle returns percent when specified for top/left/bottom/right
    // rather than make the css module depend on the offset module, we just check for it here
    jQuery.each(["top", "left"], function (i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
            function (elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);
                    // if curCSS returns percentage, fallback to offset
                    return rnumnonpx.test(computed) ?
                        jQuery(elem).position()[prop] + "px" :
                        computed;
                }
            }
        );
    });


    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function (name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function (defaultExtra, funcName) {
            // margin is only for outerHeight, outerWidth
            jQuery.fn[funcName] = function (margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

                return access(this, function (elem, type, value) {
                    var doc;

                    if (jQuery.isWindow(elem)) {
                        // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                        // isn't a whole lot we can do. See pull request at this URL for discussion:
                        // https://github.com/jquery/jquery/pull/764
                        return elem.document.documentElement["client" + name];
                    }

                    // Get document width or height
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;

                        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
                        // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
                        return Math.max(
                            elem.body["scroll" + name], doc["scroll" + name],
                            elem.body["offset" + name], doc["offset" + name],
                            doc["client" + name]
                        );
                    }

                    return value === undefined ?
                        // Get width or height on the element, requesting but not forcing parseFloat
                        jQuery.css(elem, type, extra) :

                        // Set width or height on the element
                        jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });


    // The number of elements contained in the matched element set
    jQuery.fn.size = function () {
        return this.length;
    };

    jQuery.fn.andSelf = jQuery.fn.addBack;




    // Register as a named AMD module, since jQuery can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase jquery is used because AMD module names are
    // derived from file names, and jQuery is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of jQuery, it will work.
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function () {
            return jQuery;
        });
    }




    var
        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

        // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }

        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

    // Expose jQuery and $ identifiers, even in
    // AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
    // and CommonJS for browser emulators (#13566)
    if (typeof noGlobal === strundefined) {
        window.jQuery = window.$ = jQuery;
    }




    return jQuery;

}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnktMS4xMS4wLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG4gKiBqUXVlcnkgSmF2YVNjcmlwdCBMaWJyYXJ5IHYxLjExLjBcclxuICogaHR0cDovL2pxdWVyeS5jb20vXHJcbiAqXHJcbiAqIEluY2x1ZGVzIFNpenpsZS5qc1xyXG4gKiBodHRwOi8vc2l6emxlanMuY29tL1xyXG4gKlxyXG4gKiBDb3B5cmlnaHQgMjAwNSwgMjAxNCBqUXVlcnkgRm91bmRhdGlvbiwgSW5jLiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXHJcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXHJcbiAqXHJcbiAqIERhdGU6IDIwMTQtMDEtMjNUMjE6MDJaXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAvLyBGb3IgQ29tbW9uSlMgYW5kIENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHdoZXJlIGEgcHJvcGVyIHdpbmRvdyBpcyBwcmVzZW50LFxyXG4gICAgICAgIC8vIGV4ZWN1dGUgdGhlIGZhY3RvcnkgYW5kIGdldCBqUXVlcnlcclxuICAgICAgICAvLyBGb3IgZW52aXJvbm1lbnRzIHRoYXQgZG8gbm90IGluaGVyZW50bHkgcG9zc2VzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFxyXG4gICAgICAgIC8vIChzdWNoIGFzIE5vZGUuanMpLCBleHBvc2UgYSBqUXVlcnktbWFraW5nIGZhY3RvcnkgYXMgbW9kdWxlLmV4cG9ydHNcclxuICAgICAgICAvLyBUaGlzIGFjY2VudHVhdGVzIHRoZSBuZWVkIGZvciB0aGUgY3JlYXRpb24gb2YgYSByZWFsIHdpbmRvd1xyXG4gICAgICAgIC8vIGUuZy4gdmFyIGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIikod2luZG93KTtcclxuICAgICAgICAvLyBTZWUgdGlja2V0ICMxNDU0OSBmb3IgbW9yZSBpbmZvXHJcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuZG9jdW1lbnQgP1xyXG4gICAgICAgICAgICBmYWN0b3J5KGdsb2JhbCwgdHJ1ZSkgOlxyXG4gICAgICAgICAgICBmdW5jdGlvbiAodykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF3LmRvY3VtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwialF1ZXJ5IHJlcXVpcmVzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWN0b3J5KHcpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmYWN0b3J5KGdsb2JhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUGFzcyB0aGlzIGlmIHdpbmRvdyBpcyBub3QgZGVmaW5lZCB5ZXRcclxufSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24gKHdpbmRvdywgbm9HbG9iYWwpIHtcclxuXHJcbiAgICAvLyBDYW4ndCBkbyB0aGlzIGJlY2F1c2Ugc2V2ZXJhbCBhcHBzIGluY2x1ZGluZyBBU1AuTkVUIHRyYWNlXHJcbiAgICAvLyB0aGUgc3RhY2sgdmlhIGFyZ3VtZW50cy5jYWxsZXIuY2FsbGVlIGFuZCBGaXJlZm94IGRpZXMgaWZcclxuICAgIC8vIHlvdSB0cnkgdG8gdHJhY2UgdGhyb3VnaCBcInVzZSBzdHJpY3RcIiBjYWxsIGNoYWlucy4gKCMxMzMzNSlcclxuICAgIC8vIFN1cHBvcnQ6IEZpcmVmb3ggMTgrXHJcbiAgICAvL1xyXG5cclxuICAgIHZhciBkZWxldGVkSWRzID0gW107XHJcblxyXG4gICAgdmFyIHNsaWNlID0gZGVsZXRlZElkcy5zbGljZTtcclxuXHJcbiAgICB2YXIgY29uY2F0ID0gZGVsZXRlZElkcy5jb25jYXQ7XHJcblxyXG4gICAgdmFyIHB1c2ggPSBkZWxldGVkSWRzLnB1c2g7XHJcblxyXG4gICAgdmFyIGluZGV4T2YgPSBkZWxldGVkSWRzLmluZGV4T2Y7XHJcblxyXG4gICAgdmFyIGNsYXNzMnR5cGUgPSB7fTtcclxuXHJcbiAgICB2YXIgdG9TdHJpbmcgPSBjbGFzczJ0eXBlLnRvU3RyaW5nO1xyXG5cclxuICAgIHZhciBoYXNPd24gPSBjbGFzczJ0eXBlLmhhc093blByb3BlcnR5O1xyXG5cclxuICAgIHZhciB0cmltID0gXCJcIi50cmltO1xyXG5cclxuICAgIHZhciBzdXBwb3J0ID0ge307XHJcblxyXG5cclxuXHJcbiAgICB2YXJcclxuICAgICAgICB2ZXJzaW9uID0gXCIxLjExLjBcIixcclxuXHJcbiAgICAgICAgLy8gRGVmaW5lIGEgbG9jYWwgY29weSBvZiBqUXVlcnlcclxuICAgICAgICBqUXVlcnkgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgLy8gVGhlIGpRdWVyeSBvYmplY3QgaXMgYWN0dWFsbHkganVzdCB0aGUgaW5pdCBjb25zdHJ1Y3RvciAnZW5oYW5jZWQnXHJcbiAgICAgICAgICAgIC8vIE5lZWQgaW5pdCBpZiBqUXVlcnkgaXMgY2FsbGVkIChqdXN0IGFsbG93IGVycm9yIHRvIGJlIHRocm93biBpZiBub3QgaW5jbHVkZWQpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgalF1ZXJ5LmZuLmluaXQoc2VsZWN0b3IsIGNvbnRleHQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSB0cmltIEJPTSBhbmQgTkJTUCAoaGVyZSdzIGxvb2tpbmcgYXQgeW91LCBTYWZhcmkgNS4wIGFuZCBJRSlcclxuICAgICAgICBydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyxcclxuXHJcbiAgICAgICAgLy8gTWF0Y2hlcyBkYXNoZWQgc3RyaW5nIGZvciBjYW1lbGl6aW5nXHJcbiAgICAgICAgcm1zUHJlZml4ID0gL14tbXMtLyxcclxuICAgICAgICByZGFzaEFscGhhID0gLy0oW1xcZGEtel0pL2dpLFxyXG5cclxuICAgICAgICAvLyBVc2VkIGJ5IGpRdWVyeS5jYW1lbENhc2UgYXMgY2FsbGJhY2sgdG8gcmVwbGFjZSgpXHJcbiAgICAgICAgZmNhbWVsQ2FzZSA9IGZ1bmN0aW9uIChhbGwsIGxldHRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBqUXVlcnkuZm4gPSBqUXVlcnkucHJvdG90eXBlID0ge1xyXG4gICAgICAgIC8vIFRoZSBjdXJyZW50IHZlcnNpb24gb2YgalF1ZXJ5IGJlaW5nIHVzZWRcclxuICAgICAgICBqcXVlcnk6IHZlcnNpb24sXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBqUXVlcnksXHJcblxyXG4gICAgICAgIC8vIFN0YXJ0IHdpdGggYW4gZW1wdHkgc2VsZWN0b3JcclxuICAgICAgICBzZWxlY3RvcjogXCJcIixcclxuXHJcbiAgICAgICAgLy8gVGhlIGRlZmF1bHQgbGVuZ3RoIG9mIGEgalF1ZXJ5IG9iamVjdCBpcyAwXHJcbiAgICAgICAgbGVuZ3RoOiAwLFxyXG5cclxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzbGljZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgTnRoIGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgZWxlbWVudCBzZXQgT1JcclxuICAgICAgICAvLyBHZXQgdGhlIHdob2xlIG1hdGNoZWQgZWxlbWVudCBzZXQgYXMgYSBjbGVhbiBhcnJheVxyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKG51bSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtICE9IG51bGwgP1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiBhICdjbGVhbicgYXJyYXlcclxuICAgICAgICAgICAgICAgIChudW0gPCAwID8gdGhpc1tudW0gKyB0aGlzLmxlbmd0aF0gOiB0aGlzW251bV0pIDpcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4ganVzdCB0aGUgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBzbGljZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFRha2UgYW4gYXJyYXkgb2YgZWxlbWVudHMgYW5kIHB1c2ggaXQgb250byB0aGUgc3RhY2tcclxuICAgICAgICAvLyAocmV0dXJuaW5nIHRoZSBuZXcgbWF0Y2hlZCBlbGVtZW50IHNldClcclxuICAgICAgICBwdXNoU3RhY2s6IGZ1bmN0aW9uIChlbGVtcykge1xyXG5cclxuICAgICAgICAgICAgLy8gQnVpbGQgYSBuZXcgalF1ZXJ5IG1hdGNoZWQgZWxlbWVudCBzZXRcclxuICAgICAgICAgICAgdmFyIHJldCA9IGpRdWVyeS5tZXJnZSh0aGlzLmNvbnN0cnVjdG9yKCksIGVsZW1zKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgb2xkIG9iamVjdCBvbnRvIHRoZSBzdGFjayAoYXMgYSByZWZlcmVuY2UpXHJcbiAgICAgICAgICAgIHJldC5wcmV2T2JqZWN0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0LmNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIG5ld2x5LWZvcm1lZCBlbGVtZW50IHNldFxyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEV4ZWN1dGUgYSBjYWxsYmFjayBmb3IgZXZlcnkgZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBzZXQuXHJcbiAgICAgICAgLy8gKFlvdSBjYW4gc2VlZCB0aGUgYXJndW1lbnRzIHdpdGggYW4gYXJyYXkgb2YgYXJncywgYnV0IHRoaXMgaXNcclxuICAgICAgICAvLyBvbmx5IHVzZWQgaW50ZXJuYWxseS4pXHJcbiAgICAgICAgZWFjaDogZnVuY3Rpb24gKGNhbGxiYWNrLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZWFjaCh0aGlzLCBjYWxsYmFjaywgYXJncyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWFwOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKGpRdWVyeS5tYXAodGhpcywgZnVuY3Rpb24gKGVsZW0sIGkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKGVsZW0sIGksIGVsZW0pO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2xpY2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKHNsaWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpcnN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVxKDApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxhc3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXEoLTEpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGVxOiBmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBqID0gK2kgKyAoaSA8IDAgPyBsZW4gOiAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKGogPj0gMCAmJiBqIDwgbGVuID8gW3RoaXNbal1dIDogW10pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2T2JqZWN0IHx8IHRoaXMuY29uc3RydWN0b3IobnVsbCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxyXG4gICAgICAgIC8vIEJlaGF2ZXMgbGlrZSBhbiBBcnJheSdzIG1ldGhvZCwgbm90IGxpa2UgYSBqUXVlcnkgbWV0aG9kLlxyXG4gICAgICAgIHB1c2g6IHB1c2gsXHJcbiAgICAgICAgc29ydDogZGVsZXRlZElkcy5zb3J0LFxyXG4gICAgICAgIHNwbGljZTogZGVsZXRlZElkcy5zcGxpY2VcclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZCA9IGpRdWVyeS5mbi5leHRlbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNyYywgY29weUlzQXJyYXksIGNvcHksIG5hbWUsIG9wdGlvbnMsIGNsb25lLFxyXG4gICAgICAgICAgICB0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXHJcbiAgICAgICAgICAgIGkgPSAxLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxyXG4gICAgICAgICAgICBkZWVwID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cclxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgICAgZGVlcCA9IHRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIC8vIHNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcclxuICAgICAgICAgICAgdGFyZ2V0ID0gYXJndW1lbnRzW2ldIHx8IHt9O1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcclxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIiAmJiAhalF1ZXJ5LmlzRnVuY3Rpb24odGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxyXG4gICAgICAgIGlmIChpID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcztcclxuICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXHJcbiAgICAgICAgICAgIGlmICgob3B0aW9ucyA9IGFyZ3VtZW50c1tpXSkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgZm9yIChuYW1lIGluIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcmMgPSB0YXJnZXRbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29weSA9IG9wdGlvbnNbbmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3BcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBjb3B5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZXAgJiYgY29weSAmJiAoalF1ZXJ5LmlzUGxhaW5PYmplY3QoY29weSkgfHwgKGNvcHlJc0FycmF5ID0galF1ZXJ5LmlzQXJyYXkoY29weSkpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29weUlzQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcHlJc0FycmF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNBcnJheShzcmMpID8gc3JjIDogW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0galF1ZXJ5LmV4dGVuZChkZWVwLCBjbG9uZSwgY29weSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3B5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gY29weTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZCh7XHJcbiAgICAgICAgLy8gVW5pcXVlIGZvciBlYWNoIGNvcHkgb2YgalF1ZXJ5IG9uIHRoZSBwYWdlXHJcbiAgICAgICAgZXhwYW5kbzogXCJqUXVlcnlcIiArICh2ZXJzaW9uICsgTWF0aC5yYW5kb20oKSkucmVwbGFjZSgvXFxEL2csIFwiXCIpLFxyXG5cclxuICAgICAgICAvLyBBc3N1bWUgalF1ZXJ5IGlzIHJlYWR5IHdpdGhvdXQgdGhlIHJlYWR5IG1vZHVsZVxyXG4gICAgICAgIGlzUmVhZHk6IHRydWUsXHJcblxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG5vb3A6IGZ1bmN0aW9uICgpIHt9LFxyXG5cclxuICAgICAgICAvLyBTZWUgdGVzdC91bml0L2NvcmUuanMgZm9yIGRldGFpbHMgY29uY2VybmluZyBpc0Z1bmN0aW9uLlxyXG4gICAgICAgIC8vIFNpbmNlIHZlcnNpb24gMS4zLCBET00gbWV0aG9kcyBhbmQgZnVuY3Rpb25zIGxpa2UgYWxlcnRcclxuICAgICAgICAvLyBhcmVuJ3Qgc3VwcG9ydGVkLiBUaGV5IHJldHVybiBmYWxzZSBvbiBJRSAoIzI5NjgpLlxyXG4gICAgICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS50eXBlKG9iaikgPT09IFwiZnVuY3Rpb25cIjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS50eXBlKG9iaikgPT09IFwiYXJyYXlcIjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpc1dpbmRvdzogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAvKiBqc2hpbnQgZXFlcWVxOiBmYWxzZSAqL1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09IG9iai53aW5kb3c7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaXNOdW1lcmljOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIC8vIHBhcnNlRmxvYXQgTmFOcyBudW1lcmljLWNhc3QgZmFsc2UgcG9zaXRpdmVzIChudWxsfHRydWV8ZmFsc2V8XCJcIilcclxuICAgICAgICAgICAgLy8gLi4uYnV0IG1pc2ludGVycHJldHMgbGVhZGluZy1udW1iZXIgc3RyaW5ncywgcGFydGljdWxhcmx5IGhleCBsaXRlcmFscyAoXCIweC4uLlwiKVxyXG4gICAgICAgICAgICAvLyBzdWJ0cmFjdGlvbiBmb3JjZXMgaW5maW5pdGllcyB0byBOYU5cclxuICAgICAgICAgICAgcmV0dXJuIG9iaiAtIHBhcnNlRmxvYXQob2JqKSA+PSAwO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlzRW1wdHlPYmplY3Q6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU7XHJcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpc1BsYWluT2JqZWN0OiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXk7XHJcblxyXG4gICAgICAgICAgICAvLyBNdXN0IGJlIGFuIE9iamVjdC5cclxuICAgICAgICAgICAgLy8gQmVjYXVzZSBvZiBJRSwgd2UgYWxzbyBoYXZlIHRvIGNoZWNrIHRoZSBwcmVzZW5jZSBvZiB0aGUgY29uc3RydWN0b3IgcHJvcGVydHkuXHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IERPTSBub2RlcyBhbmQgd2luZG93IG9iamVjdHMgZG9uJ3QgcGFzcyB0aHJvdWdoLCBhcyB3ZWxsXHJcbiAgICAgICAgICAgIGlmICghb2JqIHx8IGpRdWVyeS50eXBlKG9iaikgIT09IFwib2JqZWN0XCIgfHwgb2JqLm5vZGVUeXBlIHx8IGpRdWVyeS5pc1dpbmRvdyhvYmopKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAvLyBOb3Qgb3duIGNvbnN0cnVjdG9yIHByb3BlcnR5IG11c3QgYmUgT2JqZWN0XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmNvbnN0cnVjdG9yICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWhhc093bi5jYWxsKG9iaiwgXCJjb25zdHJ1Y3RvclwiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFoYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCBcImlzUHJvdG90eXBlT2ZcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIElFOCw5IFdpbGwgdGhyb3cgZXhjZXB0aW9ucyBvbiBjZXJ0YWluIGhvc3Qgb2JqZWN0cyAjOTg5N1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw5XHJcbiAgICAgICAgICAgIC8vIEhhbmRsZSBpdGVyYXRpb24gb3ZlciBpbmhlcml0ZWQgcHJvcGVydGllcyBiZWZvcmUgb3duIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICAgIGlmIChzdXBwb3J0Lm93bkxhc3QpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNPd24uY2FsbChvYmosIGtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxyXG4gICAgICAgICAgICAvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cclxuICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7fVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGtleSA9PT0gdW5kZWZpbmVkIHx8IGhhc093bi5jYWxsKG9iaiwga2V5KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0eXBlOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmogPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiArIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID9cclxuICAgICAgICAgICAgICAgIGNsYXNzMnR5cGVbdG9TdHJpbmcuY2FsbChvYmopXSB8fCBcIm9iamVjdFwiIDpcclxuICAgICAgICAgICAgICAgIHR5cGVvZiBvYmo7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRXZhbHVhdGVzIGEgc2NyaXB0IGluIGEgZ2xvYmFsIGNvbnRleHRcclxuICAgICAgICAvLyBXb3JrYXJvdW5kcyBiYXNlZCBvbiBmaW5kaW5ncyBieSBKaW0gRHJpc2NvbGxcclxuICAgICAgICAvLyBodHRwOi8vd2VibG9ncy5qYXZhLm5ldC9ibG9nL2RyaXNjb2xsL2FyY2hpdmUvMjAwOS8wOS8wOC9ldmFsLWphdmFzY3JpcHQtZ2xvYmFsLWNvbnRleHRcclxuICAgICAgICBnbG9iYWxFdmFsOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBqUXVlcnkudHJpbShkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gV2UgdXNlIGV4ZWNTY3JpcHQgb24gSW50ZXJuZXQgRXhwbG9yZXJcclxuICAgICAgICAgICAgICAgIC8vIFdlIHVzZSBhbiBhbm9ueW1vdXMgZnVuY3Rpb24gc28gdGhhdCBjb250ZXh0IGlzIHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgLy8gcmF0aGVyIHRoYW4galF1ZXJ5IGluIEZpcmVmb3hcclxuICAgICAgICAgICAgICAgICh3aW5kb3cuZXhlY1NjcmlwdCB8fCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd1tcImV2YWxcIl0uY2FsbCh3aW5kb3csIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSkoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IGRhc2hlZCB0byBjYW1lbENhc2U7IHVzZWQgYnkgdGhlIGNzcyBhbmQgZGF0YSBtb2R1bGVzXHJcbiAgICAgICAgLy8gTWljcm9zb2Z0IGZvcmdvdCB0byBodW1wIHRoZWlyIHZlbmRvciBwcmVmaXggKCM5NTcyKVxyXG4gICAgICAgIGNhbWVsQ2FzZTogZnVuY3Rpb24gKHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2Uocm1zUHJlZml4LCBcIm1zLVwiKS5yZXBsYWNlKHJkYXNoQWxwaGEsIGZjYW1lbENhc2UpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG5vZGVOYW1lOiBmdW5jdGlvbiAoZWxlbSwgbmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBhcmdzIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XHJcbiAgICAgICAgZWFjaDogZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2ssIGFyZ3MpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBvYmoubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgaXNBcnJheSA9IGlzQXJyYXlsaWtlKG9iaik7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJncykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suYXBwbHkob2JqW2ldLCBhcmdzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suYXBwbHkob2JqW2ldLCBhcmdzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEEgc3BlY2lhbCwgZmFzdCwgY2FzZSBmb3IgdGhlIG1vc3QgY29tbW9uIHVzZSBvZiBlYWNoXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjYWxsYmFjay5jYWxsKG9ialtpXSwgaSwgb2JqW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suY2FsbChvYmpbaV0sIGksIG9ialtpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBVc2UgbmF0aXZlIFN0cmluZy50cmltIGZ1bmN0aW9uIHdoZXJldmVyIHBvc3NpYmxlXHJcbiAgICAgICAgdHJpbTogdHJpbSAmJiAhdHJpbS5jYWxsKFwiXFx1RkVGRlxceEEwXCIpID9cclxuICAgICAgICAgICAgZnVuY3Rpb24gKHRleHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0ID09IG51bGwgP1xyXG4gICAgICAgICAgICAgICAgICAgIFwiXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRyaW0uY2FsbCh0ZXh0KTtcclxuICAgICAgICAgICAgfSA6XHJcblxyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgdXNlIG91ciBvd24gdHJpbW1pbmcgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgICAgICBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQgPT0gbnVsbCA/XHJcbiAgICAgICAgICAgICAgICAgICAgXCJcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgKHRleHQgKyBcIlwiKS5yZXBsYWNlKHJ0cmltLCBcIlwiKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gcmVzdWx0cyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxyXG4gICAgICAgIG1ha2VBcnJheTogZnVuY3Rpb24gKGFyciwgcmVzdWx0cykge1xyXG4gICAgICAgICAgICB2YXIgcmV0ID0gcmVzdWx0cyB8fCBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcnIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXlsaWtlKE9iamVjdChhcnIpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5tZXJnZShyZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBhcnIgPT09IFwic3RyaW5nXCIgPyBbYXJyXSA6IGFyclxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHB1c2guY2FsbChyZXQsIGFycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5BcnJheTogZnVuY3Rpb24gKGVsZW0sIGFyciwgaSkge1xyXG4gICAgICAgICAgICB2YXIgbGVuO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFycikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4T2YpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXhPZi5jYWxsKGFyciwgZWxlbSwgaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGVuID0gYXJyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGkgPSBpID8gaSA8IDAgPyBNYXRoLm1heCgwLCBsZW4gKyBpKSA6IGkgOiAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIGFjY2Vzc2luZyBpbiBzcGFyc2UgYXJyYXlzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgaW4gYXJyICYmIGFycltpXSA9PT0gZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtZXJnZTogZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcclxuICAgICAgICAgICAgdmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgaiA9IDAsXHJcbiAgICAgICAgICAgICAgICBpID0gZmlyc3QubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGogPCBsZW4pIHtcclxuICAgICAgICAgICAgICAgIGZpcnN0W2krK10gPSBzZWNvbmRbaisrXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgICAgICAvLyBXb3JrYXJvdW5kIGNhc3Rpbmcgb2YgLmxlbmd0aCB0byBOYU4gb24gb3RoZXJ3aXNlIGFycmF5bGlrZSBvYmplY3RzIChlLmcuLCBOb2RlTGlzdHMpXHJcbiAgICAgICAgICAgIGlmIChsZW4gIT09IGxlbikge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHNlY29uZFtqXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RbaSsrXSA9IHNlY29uZFtqKytdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmaXJzdC5sZW5ndGggPSBpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZpcnN0O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdyZXA6IGZ1bmN0aW9uIChlbGVtcywgY2FsbGJhY2ssIGludmVydCkge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2tJbnZlcnNlLFxyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBlbGVtcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja0V4cGVjdCA9ICFpbnZlcnQ7XHJcblxyXG4gICAgICAgICAgICAvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgb25seSBzYXZpbmcgdGhlIGl0ZW1zXHJcbiAgICAgICAgICAgIC8vIHRoYXQgcGFzcyB0aGUgdmFsaWRhdG9yIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrSW52ZXJzZSA9ICFjYWxsYmFjayhlbGVtc1tpXSwgaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tJbnZlcnNlICE9PSBjYWxsYmFja0V4cGVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChlbGVtc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIGFyZyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxyXG4gICAgICAgIG1hcDogZnVuY3Rpb24gKGVsZW1zLCBjYWxsYmFjaywgYXJnKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gZWxlbXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgaXNBcnJheSA9IGlzQXJyYXlsaWtlKGVsZW1zKSxcclxuICAgICAgICAgICAgICAgIHJldCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gR28gdGhyb3VnaCB0aGUgYXJyYXksIHRyYW5zbGF0aW5nIGVhY2ggb2YgdGhlIGl0ZW1zIHRvIHRoZWlyIG5ldyB2YWx1ZXNcclxuICAgICAgICAgICAgaWYgKGlzQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrKGVsZW1zW2ldLCBpLCBhcmcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdvIHRocm91Z2ggZXZlcnkga2V5IG9uIHRoZSBvYmplY3QsXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgaW4gZWxlbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrKGVsZW1zW2ldLCBpLCBhcmcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXHJcbiAgICAgICAgICAgIHJldHVybiBjb25jYXQuYXBwbHkoW10sIHJldCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQSBnbG9iYWwgR1VJRCBjb3VudGVyIGZvciBvYmplY3RzXHJcbiAgICAgICAgZ3VpZDogMSxcclxuXHJcbiAgICAgICAgLy8gQmluZCBhIGZ1bmN0aW9uIHRvIGEgY29udGV4dCwgb3B0aW9uYWxseSBwYXJ0aWFsbHkgYXBwbHlpbmcgYW55XHJcbiAgICAgICAgLy8gYXJndW1lbnRzLlxyXG4gICAgICAgIHByb3h5OiBmdW5jdGlvbiAoZm4sIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGFyZ3MsIHByb3h5LCB0bXA7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHRtcCA9IGZuW2NvbnRleHRdO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IGZuO1xyXG4gICAgICAgICAgICAgICAgZm4gPSB0bXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFF1aWNrIGNoZWNrIHRvIGRldGVybWluZSBpZiB0YXJnZXQgaXMgY2FsbGFibGUsIGluIHRoZSBzcGVjXHJcbiAgICAgICAgICAgIC8vIHRoaXMgdGhyb3dzIGEgVHlwZUVycm9yLCBidXQgd2Ugd2lsbCBqdXN0IHJldHVybiB1bmRlZmluZWQuXHJcbiAgICAgICAgICAgIGlmICghalF1ZXJ5LmlzRnVuY3Rpb24oZm4pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTaW11bGF0ZWQgYmluZFxyXG4gICAgICAgICAgICBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xyXG4gICAgICAgICAgICBwcm94eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHRoZSBndWlkIG9mIHVuaXF1ZSBoYW5kbGVyIHRvIHRoZSBzYW1lIG9mIG9yaWdpbmFsIGhhbmRsZXIsIHNvIGl0IGNhbiBiZSByZW1vdmVkXHJcbiAgICAgICAgICAgIHByb3h5Lmd1aWQgPSBmbi5ndWlkID0gZm4uZ3VpZCB8fCBqUXVlcnkuZ3VpZCsrO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByb3h5O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG5vdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKyhuZXcgRGF0ZSgpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBqUXVlcnkuc3VwcG9ydCBpcyBub3QgdXNlZCBpbiBDb3JlIGJ1dCBvdGhlciBwcm9qZWN0cyBhdHRhY2ggdGhlaXJcclxuICAgICAgICAvLyBwcm9wZXJ0aWVzIHRvIGl0IHNvIGl0IG5lZWRzIHRvIGV4aXN0LlxyXG4gICAgICAgIHN1cHBvcnQ6IHN1cHBvcnRcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxyXG4gICAgalF1ZXJ5LmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbiAoaSwgbmFtZSkge1xyXG4gICAgICAgIGNsYXNzMnR5cGVbXCJbb2JqZWN0IFwiICsgbmFtZSArIFwiXVwiXSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGlzQXJyYXlsaWtlKG9iaikge1xyXG4gICAgICAgIHZhciBsZW5ndGggPSBvYmoubGVuZ3RoLFxyXG4gICAgICAgICAgICB0eXBlID0galF1ZXJ5LnR5cGUob2JqKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiZnVuY3Rpb25cIiB8fCBqUXVlcnkuaXNXaW5kb3cob2JqKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob2JqLm5vZGVUeXBlID09PSAxICYmIGxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0eXBlID09PSBcImFycmF5XCIgfHwgbGVuZ3RoID09PSAwIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIgJiYgbGVuZ3RoID4gMCAmJiAobGVuZ3RoIC0gMSkgaW4gb2JqO1xyXG4gICAgfVxyXG4gICAgdmFyIFNpenpsZSA9XHJcbiAgICAgICAgLyohXHJcbiAgICAgICAgICogU2l6emxlIENTUyBTZWxlY3RvciBFbmdpbmUgdjEuMTAuMTZcclxuICAgICAgICAgKiBodHRwOi8vc2l6emxlanMuY29tL1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQ29weXJpZ2h0IDIwMTMgalF1ZXJ5IEZvdW5kYXRpb24sIEluYy4gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xyXG4gICAgICAgICAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gICAgICAgICAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIERhdGU6IDIwMTQtMDEtMTNcclxuICAgICAgICAgKi9cclxuICAgICAgICAoZnVuY3Rpb24gKHdpbmRvdykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0LFxyXG4gICAgICAgICAgICAgICAgRXhwcixcclxuICAgICAgICAgICAgICAgIGdldFRleHQsXHJcbiAgICAgICAgICAgICAgICBpc1hNTCxcclxuICAgICAgICAgICAgICAgIGNvbXBpbGUsXHJcbiAgICAgICAgICAgICAgICBvdXRlcm1vc3RDb250ZXh0LFxyXG4gICAgICAgICAgICAgICAgc29ydElucHV0LFxyXG4gICAgICAgICAgICAgICAgaGFzRHVwbGljYXRlLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIExvY2FsIGRvY3VtZW50IHZhcnNcclxuICAgICAgICAgICAgICAgIHNldERvY3VtZW50LFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQsXHJcbiAgICAgICAgICAgICAgICBkb2NFbGVtLFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRJc0hUTUwsXHJcbiAgICAgICAgICAgICAgICByYnVnZ3lRU0EsXHJcbiAgICAgICAgICAgICAgICByYnVnZ3lNYXRjaGVzLFxyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5zLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEluc3RhbmNlLXNwZWNpZmljIGRhdGFcclxuICAgICAgICAgICAgICAgIGV4cGFuZG8gPSBcInNpenpsZVwiICsgLShuZXcgRGF0ZSgpKSxcclxuICAgICAgICAgICAgICAgIHByZWZlcnJlZERvYyA9IHdpbmRvdy5kb2N1bWVudCxcclxuICAgICAgICAgICAgICAgIGRpcnJ1bnMgPSAwLFxyXG4gICAgICAgICAgICAgICAgZG9uZSA9IDAsXHJcbiAgICAgICAgICAgICAgICBjbGFzc0NhY2hlID0gY3JlYXRlQ2FjaGUoKSxcclxuICAgICAgICAgICAgICAgIHRva2VuQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxyXG4gICAgICAgICAgICAgICAgY29tcGlsZXJDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXHJcbiAgICAgICAgICAgICAgICBzb3J0T3JkZXIgPSBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhID09PSBiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0R1cGxpY2F0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZW5lcmFsLXB1cnBvc2UgY29uc3RhbnRzXHJcbiAgICAgICAgICAgICAgICBzdHJ1bmRlZmluZWQgPSB0eXBlb2YgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgTUFYX05FR0FUSVZFID0gMSA8PCAzMSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJbnN0YW5jZSBtZXRob2RzXHJcbiAgICAgICAgICAgICAgICBoYXNPd24gPSAoe30pLmhhc093blByb3BlcnR5LFxyXG4gICAgICAgICAgICAgICAgYXJyID0gW10sXHJcbiAgICAgICAgICAgICAgICBwb3AgPSBhcnIucG9wLFxyXG4gICAgICAgICAgICAgICAgcHVzaF9uYXRpdmUgPSBhcnIucHVzaCxcclxuICAgICAgICAgICAgICAgIHB1c2ggPSBhcnIucHVzaCxcclxuICAgICAgICAgICAgICAgIHNsaWNlID0gYXJyLnNsaWNlLFxyXG4gICAgICAgICAgICAgICAgLy8gVXNlIGEgc3RyaXBwZWQtZG93biBpbmRleE9mIGlmIHdlIGNhbid0IHVzZSBhIG5hdGl2ZSBvbmVcclxuICAgICAgICAgICAgICAgIGluZGV4T2YgPSBhcnIuaW5kZXhPZiB8fCBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tpXSA9PT0gZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBib29sZWFucyA9IFwiY2hlY2tlZHxzZWxlY3RlZHxhc3luY3xhdXRvZm9jdXN8YXV0b3BsYXl8Y29udHJvbHN8ZGVmZXJ8ZGlzYWJsZWR8aGlkZGVufGlzbWFwfGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWRcIixcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZWd1bGFyIGV4cHJlc3Npb25zXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gV2hpdGVzcGFjZSBjaGFyYWN0ZXJzIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyN3aGl0ZXNwYWNlXHJcbiAgICAgICAgICAgICAgICB3aGl0ZXNwYWNlID0gXCJbXFxcXHgyMFxcXFx0XFxcXHJcXFxcblxcXFxmXVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zeW50YXgvI2NoYXJhY3RlcnNcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlckVuY29kaW5nID0gXCIoPzpcXFxcXFxcXC58W1xcXFx3LV18W15cXFxceDAwLVxcXFx4YTBdKStcIixcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBMb29zZWx5IG1vZGVsZWQgb24gQ1NTIGlkZW50aWZpZXIgY2hhcmFjdGVyc1xyXG4gICAgICAgICAgICAgICAgLy8gQW4gdW5xdW90ZWQgdmFsdWUgc2hvdWxkIGJlIGEgQ1NTIGlkZW50aWZpZXIgaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zZWxlY3RvcnMvI2F0dHJpYnV0ZS1zZWxlY3RvcnNcclxuICAgICAgICAgICAgICAgIC8vIFByb3BlciBzeW50YXg6IGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCN2YWx1ZS1kZWYtaWRlbnRpZmllclxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllciA9IGNoYXJhY3RlckVuY29kaW5nLnJlcGxhY2UoXCJ3XCIsIFwidyNcIiksXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWNjZXB0YWJsZSBvcGVyYXRvcnMgaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNhdHRyaWJ1dGUtc2VsZWN0b3JzXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzID0gXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpXCIgKyB3aGl0ZXNwYWNlICtcclxuICAgICAgICAgICAgICAgIFwiKig/OihbKl4kfCF+XT89KVwiICsgd2hpdGVzcGFjZSArIFwiKig/OihbJ1xcXCJdKSgoPzpcXFxcXFxcXC58W15cXFxcXFxcXF0pKj8pXFxcXDN8KFwiICsgaWRlbnRpZmllciArIFwiKXwpfClcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcXVwiLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFByZWZlciBhcmd1bWVudHMgcXVvdGVkLFxyXG4gICAgICAgICAgICAgICAgLy8gICB0aGVuIG5vdCBjb250YWluaW5nIHBzZXVkb3MvYnJhY2tldHMsXHJcbiAgICAgICAgICAgICAgICAvLyAgIHRoZW4gYXR0cmlidXRlIHNlbGVjdG9ycy9ub24tcGFyZW50aGV0aWNhbCBleHByZXNzaW9ucyxcclxuICAgICAgICAgICAgICAgIC8vICAgdGhlbiBhbnl0aGluZyBlbHNlXHJcbiAgICAgICAgICAgICAgICAvLyBUaGVzZSBwcmVmZXJlbmNlcyBhcmUgaGVyZSB0byByZWR1Y2UgdGhlIG51bWJlciBvZiBzZWxlY3RvcnNcclxuICAgICAgICAgICAgICAgIC8vICAgbmVlZGluZyB0b2tlbml6ZSBpbiB0aGUgUFNFVURPIHByZUZpbHRlclxyXG4gICAgICAgICAgICAgICAgcHNldWRvcyA9IFwiOihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpKD86XFxcXCgoKFsnXFxcIl0pKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXSkqPylcXFxcM3woKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKVtcXFxcXV18XCIgKyBhdHRyaWJ1dGVzLnJlcGxhY2UoMywgOCkgKyBcIikqKXwuKilcXFxcKXwpXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTGVhZGluZyBhbmQgbm9uLWVzY2FwZWQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgY2FwdHVyaW5nIHNvbWUgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVycyBwcmVjZWRpbmcgdGhlIGxhdHRlclxyXG4gICAgICAgICAgICAgICAgcnRyaW0gPSBuZXcgUmVnRXhwKFwiXlwiICsgd2hpdGVzcGFjZSArIFwiK3woKD86XnxbXlxcXFxcXFxcXSkoPzpcXFxcXFxcXC4pKilcIiArIHdoaXRlc3BhY2UgKyBcIiskXCIsIFwiZ1wiKSxcclxuXHJcbiAgICAgICAgICAgICAgICByY29tbWEgPSBuZXcgUmVnRXhwKFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKixcIiArIHdoaXRlc3BhY2UgKyBcIipcIiksXHJcbiAgICAgICAgICAgICAgICByY29tYmluYXRvcnMgPSBuZXcgUmVnRXhwKFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKihbPit+XXxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIHdoaXRlc3BhY2UgKyBcIipcIiksXHJcblxyXG4gICAgICAgICAgICAgICAgcmF0dHJpYnV0ZVF1b3RlcyA9IG5ldyBSZWdFeHAoXCI9XCIgKyB3aGl0ZXNwYWNlICsgXCIqKFteXFxcXF0nXFxcIl0qPylcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcXVwiLCBcImdcIiksXHJcblxyXG4gICAgICAgICAgICAgICAgcnBzZXVkbyA9IG5ldyBSZWdFeHAocHNldWRvcyksXHJcbiAgICAgICAgICAgICAgICByaWRlbnRpZmllciA9IG5ldyBSZWdFeHAoXCJeXCIgKyBpZGVudGlmaWVyICsgXCIkXCIpLFxyXG5cclxuICAgICAgICAgICAgICAgIG1hdGNoRXhwciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcIklEXCI6IG5ldyBSZWdFeHAoXCJeIyhcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQ0xBU1NcIjogbmV3IFJlZ0V4cChcIl5cXFxcLihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVEFHXCI6IG5ldyBSZWdFeHAoXCJeKFwiICsgY2hhcmFjdGVyRW5jb2RpbmcucmVwbGFjZShcIndcIiwgXCJ3KlwiKSArIFwiKVwiKSxcclxuICAgICAgICAgICAgICAgICAgICBcIkFUVFJcIjogbmV3IFJlZ0V4cChcIl5cIiArIGF0dHJpYnV0ZXMpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiUFNFVURPXCI6IG5ldyBSZWdFeHAoXCJeXCIgKyBwc2V1ZG9zKSxcclxuICAgICAgICAgICAgICAgICAgICBcIkNISUxEXCI6IG5ldyBSZWdFeHAoXCJeOihvbmx5fGZpcnN0fGxhc3R8bnRofG50aC1sYXN0KS0oY2hpbGR8b2YtdHlwZSkoPzpcXFxcKFwiICsgd2hpdGVzcGFjZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKihldmVufG9kZHwoKFsrLV18KShcXFxcZCopbnwpXCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86KFsrLV18KVwiICsgd2hpdGVzcGFjZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKihcXFxcZCspfCkpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KVwiLCBcImlcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJib29sXCI6IG5ldyBSZWdFeHAoXCJeKD86XCIgKyBib29sZWFucyArIFwiKSRcIiwgXCJpXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciB1c2UgaW4gbGlicmFyaWVzIGltcGxlbWVudGluZyAuaXMoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIHVzZSB0aGlzIGZvciBQT1MgbWF0Y2hpbmcgaW4gYHNlbGVjdGBcclxuICAgICAgICAgICAgICAgICAgICBcIm5lZWRzQ29udGV4dFwiOiBuZXcgUmVnRXhwKFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKls+K35dfDooZXZlbnxvZGR8ZXF8Z3R8bHR8bnRofGZpcnN0fGxhc3QpKD86XFxcXChcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlc3BhY2UgKyBcIiooKD86LVxcXFxkKT9cXFxcZCopXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KSg/PVteLV18JClcIiwgXCJpXCIpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHJpbnB1dHMgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLFxyXG4gICAgICAgICAgICAgICAgcmhlYWRlciA9IC9eaFxcZCQvaSxcclxuXHJcbiAgICAgICAgICAgICAgICBybmF0aXZlID0gL15bXntdK1xce1xccypcXFtuYXRpdmUgXFx3LyxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBFYXNpbHktcGFyc2VhYmxlL3JldHJpZXZhYmxlIElEIG9yIFRBRyBvciBDTEFTUyBzZWxlY3RvcnNcclxuICAgICAgICAgICAgICAgIHJxdWlja0V4cHIgPSAvXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLyxcclxuXHJcbiAgICAgICAgICAgICAgICByc2libGluZyA9IC9bK35dLyxcclxuICAgICAgICAgICAgICAgIHJlc2NhcGUgPSAvJ3xcXFxcL2csXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ1NTIGVzY2FwZXMgaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvc3luZGF0YS5odG1sI2VzY2FwZWQtY2hhcmFjdGVyc1xyXG4gICAgICAgICAgICAgICAgcnVuZXNjYXBlID0gbmV3IFJlZ0V4cChcIlxcXFxcXFxcKFtcXFxcZGEtZl17MSw2fVwiICsgd2hpdGVzcGFjZSArIFwiP3woXCIgKyB3aGl0ZXNwYWNlICsgXCIpfC4pXCIsIFwiaWdcIiksXHJcbiAgICAgICAgICAgICAgICBmdW5lc2NhcGUgPSBmdW5jdGlvbiAoXywgZXNjYXBlZCwgZXNjYXBlZFdoaXRlc3BhY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGlnaCA9IFwiMHhcIiArIGVzY2FwZWQgLSAweDEwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5hTiBtZWFucyBub24tY29kZXBvaW50XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogRmlyZWZveFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdvcmthcm91bmQgZXJyb25lb3VzIG51bWVyaWMgaW50ZXJwcmV0YXRpb24gb2YgK1wiMHhcIlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoaWdoICE9PSBoaWdoIHx8IGVzY2FwZWRXaGl0ZXNwYWNlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlZCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2ggPCAwID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQk1QIGNvZGVwb2ludFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKGhpZ2ggKyAweDEwMDAwKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBsZW1lbnRhbCBQbGFuZSBjb2RlcG9pbnQgKHN1cnJvZ2F0ZSBwYWlyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKGhpZ2ggPj4gMTAgfCAweEQ4MDAsIGhpZ2ggJiAweDNGRiB8IDB4REMwMCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gT3B0aW1pemUgZm9yIHB1c2guYXBwbHkoIF8sIE5vZGVMaXN0IClcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHB1c2guYXBwbHkoXHJcbiAgICAgICAgICAgICAgICAgICAgKGFyciA9IHNsaWNlLmNhbGwocHJlZmVycmVkRG9jLmNoaWxkTm9kZXMpKSxcclxuICAgICAgICAgICAgICAgICAgICBwcmVmZXJyZWREb2MuY2hpbGROb2Rlc1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4wXHJcbiAgICAgICAgICAgICAgICAvLyBEZXRlY3Qgc2lsZW50bHkgZmFpbGluZyBwdXNoLmFwcGx5XHJcbiAgICAgICAgICAgICAgICBhcnJbcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMubGVuZ3RoXS5ub2RlVHlwZTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcHVzaCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBseTogYXJyLmxlbmd0aCA/XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMZXZlcmFnZSBzbGljZSBpZiBwb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAodGFyZ2V0LCBlbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hfbmF0aXZlLmFwcGx5KHRhcmdldCwgc2xpY2UuY2FsbChlbHMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSA6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBhcHBlbmQgZGlyZWN0bHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHRhcmdldCwgZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaiA9IHRhcmdldC5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDYW4ndCB0cnVzdCBOb2RlTGlzdC5sZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgodGFyZ2V0W2orK10gPSBlbHNbaSsrXSkpIHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQubGVuZ3RoID0gaiAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIFNpenpsZShzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoLCBlbGVtLCBtLCBub2RlVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBRU0EgdmFyc1xyXG4gICAgICAgICAgICAgICAgICAgIGksIGdyb3Vwcywgb2xkLCBuaWQsIG5ld0NvbnRleHQsIG5ld1NlbGVjdG9yO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoY29udGV4dCA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogcHJlZmVycmVkRG9jKSAhPT0gZG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXREb2N1bWVudChjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghc2VsZWN0b3IgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChub2RlVHlwZSA9IGNvbnRleHQubm9kZVR5cGUpICE9PSAxICYmIG5vZGVUeXBlICE9PSA5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudElzSFRNTCAmJiAhc2VlZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKG1hdGNoID0gcnF1aWNrRXhwci5leGVjKHNlbGVjdG9yKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3BlZWQtdXA6IFNpenpsZShcIiNJRFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG0gPSBtYXRjaFsxXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlVHlwZSA9PT0gOSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKG0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHBhcmVudE5vZGUgdG8gY2F0Y2ggd2hlbiBCbGFja2JlcnJ5IDQuNiByZXR1cm5zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm9kZXMgdGhhdCBhcmUgbm8gbG9uZ2VyIGluIHRoZSBkb2N1bWVudCAoalF1ZXJ5ICM2OTYzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtICYmIGVsZW0ucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgSUUsIE9wZXJhLCBhbmQgV2Via2l0IHJldHVybiBpdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBieSBuYW1lIGluc3RlYWQgb2YgSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0uaWQgPT09IG0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChlbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDb250ZXh0IGlzIG5vdCBhIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQub3duZXJEb2N1bWVudCAmJiAoZWxlbSA9IGNvbnRleHQub3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZChtKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbnMoY29udGV4dCwgZWxlbSkgJiYgZWxlbS5pZCA9PT0gbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTcGVlZC11cDogU2l6emxlKFwiVEFHXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbMl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2guYXBwbHkocmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3BlZWQtdXA6IFNpenpsZShcIi5DTEFTU1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChtID0gbWF0Y2hbM10pICYmIHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2guYXBwbHkocmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBRU0EgcGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0LnFzYSAmJiAoIXJidWdneVFTQSB8fCAhcmJ1Z2d5UVNBLnRlc3Qoc2VsZWN0b3IpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuaWQgPSBvbGQgPSBleHBhbmRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdDb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VsZWN0b3IgPSBub2RlVHlwZSA9PT0gOSAmJiBzZWxlY3RvcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHFTQSB3b3JrcyBzdHJhbmdlbHkgb24gRWxlbWVudC1yb290ZWQgcXVlcmllc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4gd29yayBhcm91bmQgdGhpcyBieSBzcGVjaWZ5aW5nIGFuIGV4dHJhIElEIG9uIHRoZSByb290XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCB3b3JraW5nIHVwIGZyb20gdGhlcmUgKFRoYW5rcyB0byBBbmRyZXcgRHVwb250IGZvciB0aGUgdGVjaG5pcXVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJRSA4IGRvZXNuJ3Qgd29yayBvbiBvYmplY3QgZWxlbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVUeXBlID09PSAxICYmIGNvbnRleHQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzID0gdG9rZW5pemUoc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgob2xkID0gY29udGV4dC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuaWQgPSBvbGQucmVwbGFjZShyZXNjYXBlLCBcIlxcXFwkJlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmlkID0gXCJbaWQ9J1wiICsgbmlkICsgXCInXSBcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gZ3JvdXBzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cHNbaV0gPSBuaWQgKyB0b1NlbGVjdG9yKGdyb3Vwc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb250ZXh0ID0gcnNpYmxpbmcudGVzdChzZWxlY3RvcikgJiYgdGVzdENvbnRleHQoY29udGV4dC5wYXJlbnROb2RlKSB8fCBjb250ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VsZWN0b3IgPSBncm91cHMuam9pbihcIixcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoLmFwcGx5KHJlc3VsdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbChuZXdTZWxlY3RvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAocXNhRXJyb3IpIHt9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQucmVtb3ZlQXR0cmlidXRlKFwiaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFsbCBvdGhlcnNcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3Qoc2VsZWN0b3IucmVwbGFjZShydHJpbSwgXCIkMVwiKSwgY29udGV4dCwgcmVzdWx0cywgc2VlZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDcmVhdGUga2V5LXZhbHVlIGNhY2hlcyBvZiBsaW1pdGVkIHNpemVcclxuICAgICAgICAgICAgICogQHJldHVybnMge0Z1bmN0aW9uKHN0cmluZywgT2JqZWN0KX0gUmV0dXJucyB0aGUgT2JqZWN0IGRhdGEgYWZ0ZXIgc3RvcmluZyBpdCBvbiBpdHNlbGYgd2l0aFxyXG4gICAgICAgICAgICAgKlx0cHJvcGVydHkgbmFtZSB0aGUgKHNwYWNlLXN1ZmZpeGVkKSBzdHJpbmcgYW5kIChpZiB0aGUgY2FjaGUgaXMgbGFyZ2VyIHRoYW4gRXhwci5jYWNoZUxlbmd0aClcclxuICAgICAgICAgICAgICpcdGRlbGV0aW5nIHRoZSBvbGRlc3QgZW50cnlcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNhY2hlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjYWNoZShrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIChrZXkgKyBcIiBcIikgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGggbmF0aXZlIHByb3RvdHlwZSBwcm9wZXJ0aWVzIChzZWUgSXNzdWUgIzE1NylcclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5cy5wdXNoKGtleSArIFwiIFwiKSA+IEV4cHIuY2FjaGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBlbnRyaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVtrZXlzLnNoaWZ0KCldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGNhY2hlW2tleSArIFwiIFwiXSA9IHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIE1hcmsgYSBmdW5jdGlvbiBmb3Igc3BlY2lhbCB1c2UgYnkgU2l6emxlXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBtYXJrXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXJrRnVuY3Rpb24oZm4pIHtcclxuICAgICAgICAgICAgICAgIGZuW2V4cGFuZG9dID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFN1cHBvcnQgdGVzdGluZyB1c2luZyBhbiBlbGVtZW50XHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFBhc3NlZCB0aGUgY3JlYXRlZCBkaXYgYW5kIGV4cGVjdHMgYSBib29sZWFuIHJlc3VsdFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gYXNzZXJ0KGZuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWZuKGRpdik7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgZnJvbSBpdHMgcGFyZW50IGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGl2LnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZGl2KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVsZWFzZSBtZW1vcnkgaW4gSUVcclxuICAgICAgICAgICAgICAgICAgICBkaXYgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQWRkcyB0aGUgc2FtZSBoYW5kbGVyIGZvciBhbGwgb2YgdGhlIHNwZWNpZmllZCBhdHRyc1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0cnMgUGlwZS1zZXBhcmF0ZWQgbGlzdCBvZiBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgVGhlIG1ldGhvZCB0aGF0IHdpbGwgYmUgYXBwbGllZFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkSGFuZGxlKGF0dHJzLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJyID0gYXR0cnMuc3BsaXQoXCJ8XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBhdHRycy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEV4cHIuYXR0ckhhbmRsZVthcnJbaV1dID0gaGFuZGxlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIENoZWNrcyBkb2N1bWVudCBvcmRlciBvZiB0d28gc2libGluZ3NcclxuICAgICAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBhXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gYlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIGxlc3MgdGhhbiAwIGlmIGEgcHJlY2VkZXMgYiwgZ3JlYXRlciB0aGFuIDAgaWYgYSBmb2xsb3dzIGJcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNpYmxpbmdDaGVjayhhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VyID0gYiAmJiBhLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpZmYgPSBjdXIgJiYgYS5ub2RlVHlwZSA9PT0gMSAmJiBiLm5vZGVUeXBlID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKH5iLnNvdXJjZUluZGV4IHx8IE1BWF9ORUdBVElWRSkgLVxyXG4gICAgICAgICAgICAgICAgICAgICh+YS5zb3VyY2VJbmRleCB8fCBNQVhfTkVHQVRJVkUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVzZSBJRSBzb3VyY2VJbmRleCBpZiBhdmFpbGFibGUgb24gYm90aCBub2Rlc1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpZmYpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlmZjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBiIGZvbGxvd3MgYVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoY3VyID0gY3VyLm5leHRTaWJsaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyID09PSBiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGEgPyAxIDogLTE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGlucHV0IHR5cGVzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVJbnB1dFBzZXVkbyh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGJ1dHRvbnNcclxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUJ1dHRvblBzZXVkbyh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG5hbWUgPT09IFwiaW5wdXRcIiB8fCBuYW1lID09PSBcImJ1dHRvblwiKSAmJiBlbGVtLnR5cGUgPT09IHR5cGU7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBwb3NpdGlvbmFsc1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiAoYXJndW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmd1bWVudCA9ICthcmd1bWVudDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uIChzZWVkLCBtYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hJbmRleGVzID0gZm4oW10sIHNlZWQubGVuZ3RoLCBhcmd1bWVudCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gbWF0Y2hJbmRleGVzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1hdGNoIGVsZW1lbnRzIGZvdW5kIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXhlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VlZFsoaiA9IG1hdGNoSW5kZXhlc1tpXSldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VlZFtqXSA9ICEobWF0Y2hlc1tqXSA9IHNlZWRbal0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIENoZWNrcyBhIG5vZGUgZm9yIHZhbGlkaXR5IGFzIGEgU2l6emxlIGNvbnRleHRcclxuICAgICAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fE9iamVjdD19IGNvbnRleHRcclxuICAgICAgICAgICAgICogQHJldHVybnMge0VsZW1lbnR8T2JqZWN0fEJvb2xlYW59IFRoZSBpbnB1dCBub2RlIGlmIGFjY2VwdGFibGUsIG90aGVyd2lzZSBhIGZhbHN5IHZhbHVlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiB0ZXN0Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dCAmJiB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gc3RydW5kZWZpbmVkICYmIGNvbnRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEV4cG9zZSBzdXBwb3J0IHZhcnMgZm9yIGNvbnZlbmllbmNlXHJcbiAgICAgICAgICAgIHN1cHBvcnQgPSBTaXp6bGUuc3VwcG9ydCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIERldGVjdHMgWE1MIG5vZGVzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IGVsZW0gQW4gZWxlbWVudCBvciBhIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmZiBlbGVtIGlzIGEgbm9uLUhUTUwgWE1MIG5vZGVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlzWE1MID0gU2l6emxlLmlzWE1MID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgIC8vIGRvY3VtZW50RWxlbWVudCBpcyB2ZXJpZmllZCBmb3IgY2FzZXMgd2hlcmUgaXQgZG9lc24ndCB5ZXQgZXhpc3RcclxuICAgICAgICAgICAgICAgIC8vIChzdWNoIGFzIGxvYWRpbmcgaWZyYW1lcyBpbiBJRSAtICM0ODMzKVxyXG4gICAgICAgICAgICAgICAgdmFyIGRvY3VtZW50RWxlbWVudCA9IGVsZW0gJiYgKGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtKS5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRFbGVtZW50ID8gZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lICE9PSBcIkhUTUxcIiA6IGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNldHMgZG9jdW1lbnQtcmVsYXRlZCB2YXJpYWJsZXMgb25jZSBiYXNlZCBvbiB0aGUgY3VycmVudCBkb2N1bWVudFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBbZG9jXSBBbiBlbGVtZW50IG9yIGRvY3VtZW50IG9iamVjdCB0byB1c2UgdG8gc2V0IHRoZSBkb2N1bWVudFxyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjdXJyZW50IGRvY3VtZW50XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZXREb2N1bWVudCA9IFNpenpsZS5zZXREb2N1bWVudCA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzQ29tcGFyZSxcclxuICAgICAgICAgICAgICAgICAgICBkb2MgPSBub2RlID8gbm9kZS5vd25lckRvY3VtZW50IHx8IG5vZGUgOiBwcmVmZXJyZWREb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gZG9jLmRlZmF1bHRWaWV3O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIG5vIGRvY3VtZW50IGFuZCBkb2N1bWVudEVsZW1lbnQgaXMgYXZhaWxhYmxlLCByZXR1cm5cclxuICAgICAgICAgICAgICAgIGlmIChkb2MgPT09IGRvY3VtZW50IHx8IGRvYy5ub2RlVHlwZSAhPT0gOSB8fCAhZG9jLmRvY3VtZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgb3VyIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudCA9IGRvYztcclxuICAgICAgICAgICAgICAgIGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQgdGVzdHNcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50SXNIVE1MID0gIWlzWE1MKGRvYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU+OFxyXG4gICAgICAgICAgICAgICAgLy8gSWYgaWZyYW1lIGRvY3VtZW50IGlzIGFzc2lnbmVkIHRvIFwiZG9jdW1lbnRcIiB2YXJpYWJsZSBhbmQgaWYgaWZyYW1lIGhhcyBiZWVuIHJlbG9hZGVkLFxyXG4gICAgICAgICAgICAgICAgLy8gSUUgd2lsbCB0aHJvdyBcInBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBhY2Nlc3NpbmcgXCJkb2N1bWVudFwiIHZhcmlhYmxlLCBzZWUgalF1ZXJ5ICMxMzkzNlxyXG4gICAgICAgICAgICAgICAgLy8gSUU2LTggZG8gbm90IHN1cHBvcnQgdGhlIGRlZmF1bHRWaWV3IHByb3BlcnR5IHNvIHBhcmVudCB3aWxsIGJlIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQgIT09IHBhcmVudC50b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJRTExIGRvZXMgbm90IGhhdmUgYXR0YWNoRXZlbnQsIHNvIGFsbCBtdXN0IHN1ZmZlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcihcInVubG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXREb2N1bWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJlbnQuYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LmF0dGFjaEV2ZW50KFwib251bmxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RG9jdW1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8qIEF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw4XHJcbiAgICAgICAgICAgICAgICAvLyBWZXJpZnkgdGhhdCBnZXRBdHRyaWJ1dGUgcmVhbGx5IHJldHVybnMgYXR0cmlidXRlcyBhbmQgbm90IHByb3BlcnRpZXMgKGV4Y2VwdGluZyBJRTggYm9vbGVhbnMpXHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0LmF0dHJpYnV0ZXMgPSBhc3NlcnQoZnVuY3Rpb24gKGRpdikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5jbGFzc05hbWUgPSBcImlcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWRpdi5nZXRBdHRyaWJ1dGUoXCJjbGFzc05hbWVcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKiBnZXRFbGVtZW50KHMpQnkqXHJcbiAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpIHJldHVybnMgb25seSBlbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgc3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IGFzc2VydChmdW5jdGlvbiAoZGl2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGRvYy5jcmVhdGVDb21tZW50KFwiXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSBjYW4gYmUgdHJ1c3RlZFxyXG4gICAgICAgICAgICAgICAgc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gcm5hdGl2ZS50ZXN0KGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSAmJiBhc3NlcnQoZnVuY3Rpb24gKGRpdikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J2EnPjwvZGl2PjxkaXYgY2xhc3M9J2EgaSc+PC9kaXY+XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IFNhZmFyaTw0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2F0Y2ggY2xhc3Mgb3Zlci1jYWNoaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmZpcnN0Q2hpbGQuY2xhc3NOYW1lID0gXCJpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogT3BlcmE8MTBcclxuICAgICAgICAgICAgICAgICAgICAvLyBDYXRjaCBnRUJDTiBmYWlsdXJlIHRvIGZpbmQgbm9uLWxlYWRpbmcgY2xhc3Nlc1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkaXYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImlcIikubGVuZ3RoID09PSAyO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8MTBcclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGdldEVsZW1lbnRCeUlkIHJldHVybnMgZWxlbWVudHMgYnkgbmFtZVxyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGJyb2tlbiBnZXRFbGVtZW50QnlJZCBtZXRob2RzIGRvbid0IHBpY2sgdXAgcHJvZ3JhbWF0aWNhbGx5LXNldCBuYW1lcyxcclxuICAgICAgICAgICAgICAgIC8vIHNvIHVzZSBhIHJvdW5kYWJvdXQgZ2V0RWxlbWVudHNCeU5hbWUgdGVzdFxyXG4gICAgICAgICAgICAgICAgc3VwcG9ydC5nZXRCeUlkID0gYXNzZXJ0KGZ1bmN0aW9uIChkaXYpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2NFbGVtLmFwcGVuZENoaWxkKGRpdikuaWQgPSBleHBhbmRvO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhZG9jLmdldEVsZW1lbnRzQnlOYW1lIHx8ICFkb2MuZ2V0RWxlbWVudHNCeU5hbWUoZXhwYW5kbykubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSUQgZmluZCBhbmQgZmlsdGVyXHJcbiAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydC5nZXRCeUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRXhwci5maW5kW1wiSURcIl0gPSBmdW5jdGlvbiAoaWQsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRCeUlkICE9PSBzdHJ1bmRlZmluZWQgJiYgZG9jdW1lbnRJc0hUTUwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBwYXJlbnROb2RlIHRvIGNhdGNoIHdoZW4gQmxhY2tiZXJyeSA0LjYgcmV0dXJuc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm9kZXMgdGhhdCBhcmUgbm8gbG9uZ2VyIGluIHRoZSBkb2N1bWVudCAjNjk2M1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG0gJiYgbS5wYXJlbnROb2RlID8gW21dIDogW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIEV4cHIuZmlsdGVyW1wiSURcIl0gPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHJJZCA9IGlkLnJlcGxhY2UocnVuZXNjYXBlLCBmdW5lc2NhcGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBhdHRySWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU2LzdcclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXRFbGVtZW50QnlJZCBpcyBub3QgcmVsaWFibGUgYXMgYSBmaW5kIHNob3J0Y3V0XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIEV4cHIuZmluZFtcIklEXCJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBFeHByLmZpbHRlcltcIklEXCJdID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKHJ1bmVzY2FwZSwgZnVuZXNjYXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUgIT09IHN0cnVuZGVmaW5lZCAmJiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlICYmIG5vZGUudmFsdWUgPT09IGF0dHJJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRhZ1xyXG4gICAgICAgICAgICAgICAgRXhwci5maW5kW1wiVEFHXCJdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHRhZywgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IHN0cnVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gOlxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICh0YWcsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgcG9zc2libGUgY29tbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgoZWxlbSA9IHJlc3VsdHNbaSsrXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS5ub2RlVHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXAucHVzaChlbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRtcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENsYXNzXHJcbiAgICAgICAgICAgICAgICBFeHByLmZpbmRbXCJDTEFTU1wiXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJiBmdW5jdGlvbiAoY2xhc3NOYW1lLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgIT09IHN0cnVuZGVmaW5lZCAmJiBkb2N1bWVudElzSFRNTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKiBRU0EvbWF0Y2hlc1NlbGVjdG9yXHJcbiAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUVNBIGFuZCBtYXRjaGVzU2VsZWN0b3Igc3VwcG9ydFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG1hdGNoZXNTZWxlY3Rvcig6YWN0aXZlKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoSUU5L09wZXJhIDExLjUpXHJcbiAgICAgICAgICAgICAgICByYnVnZ3lNYXRjaGVzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcVNhKDpmb2N1cykgcmVwb3J0cyBmYWxzZSB3aGVuIHRydWUgKENocm9tZSAyMSlcclxuICAgICAgICAgICAgICAgIC8vIFdlIGFsbG93IHRoaXMgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBJRTgvOSB0aGF0IHRocm93cyBhbiBlcnJvclxyXG4gICAgICAgICAgICAgICAgLy8gd2hlbmV2ZXIgYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIGlzIGFjY2Vzc2VkIG9uIGFuIGlmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy8gU28sIHdlIGFsbG93IDpmb2N1cyB0byBwYXNzIHRocm91Z2ggUVNBIGFsbCB0aGUgdGltZSB0byBhdm9pZCB0aGUgSUUgZXJyb3JcclxuICAgICAgICAgICAgICAgIC8vIFNlZSBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMzM3OFxyXG4gICAgICAgICAgICAgICAgcmJ1Z2d5UVNBID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChzdXBwb3J0LnFzYSA9IHJuYXRpdmUudGVzdChkb2MucXVlcnlTZWxlY3RvckFsbCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQnVpbGQgUVNBIHJlZ2V4XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVnZXggc3RyYXRlZ3kgYWRvcHRlZCBmcm9tIERpZWdvIFBlcmluaVxyXG4gICAgICAgICAgICAgICAgICAgIGFzc2VydChmdW5jdGlvbiAoZGl2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlbGVjdCBpcyBzZXQgdG8gZW1wdHkgc3RyaW5nIG9uIHB1cnBvc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyB0byB0ZXN0IElFJ3MgdHJlYXRtZW50IG9mIG5vdCBleHBsaWNpdGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldHRpbmcgYSBib29sZWFuIGNvbnRlbnQgYXR0cmlidXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW5jZSBpdHMgcHJlc2VuY2Ugc2hvdWxkIGJlIGVub3VnaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjM1OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gXCI8c2VsZWN0IHQ9Jyc+PG9wdGlvbiBzZWxlY3RlZD0nJz48L29wdGlvbj48L3NlbGVjdD5cIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFOCwgT3BlcmEgMTAtMTJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90aGluZyBzaG91bGQgYmUgc2VsZWN0ZWQgd2hlbiBlbXB0eSBzdHJpbmdzIGZvbGxvdyBePSBvciAkPSBvciAqPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbdF49JyddXCIpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmJ1Z2d5UVNBLnB1c2goXCJbKl4kXT1cIiArIHdoaXRlc3BhY2UgKyBcIiooPzonJ3xcXFwiXFxcIilcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBCb29sZWFuIGF0dHJpYnV0ZXMgYW5kIFwidmFsdWVcIiBhcmUgbm90IHRyZWF0ZWQgY29ycmVjdGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbc2VsZWN0ZWRdXCIpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmJ1Z2d5UVNBLnB1c2goXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKig/OnZhbHVlfFwiICsgYm9vbGVhbnMgKyBcIilcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlYmtpdC9PcGVyYSAtIDpjaGVja2VkIHNob3VsZCByZXR1cm4gc2VsZWN0ZWQgb3B0aW9uIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6Y2hlY2tlZFwiKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJidWdneVFTQS5wdXNoKFwiOmNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KGZ1bmN0aW9uIChkaXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogV2luZG93cyA4IE5hdGl2ZSBBcHBzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSB0eXBlIGFuZCBuYW1lIGF0dHJpYnV0ZXMgYXJlIHJlc3RyaWN0ZWQgZHVyaW5nIC5pbm5lckhUTUwgYXNzaWdubWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSBkb2MuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaW5wdXQpLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJEXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuZm9yY2UgY2FzZS1zZW5zaXRpdml0eSBvZiBuYW1lIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbmFtZT1kXVwiKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJidWdneVFTQS5wdXNoKFwibmFtZVwiICsgd2hpdGVzcGFjZSArIFwiKlsqXiR8IX5dPz1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZGIDMuNSAtIDplbmFibGVkLzpkaXNhYmxlZCBhbmQgaGlkZGVuIGVsZW1lbnRzIChoaWRkZW4gZWxlbWVudHMgYXJlIHN0aWxsIGVuYWJsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6ZW5hYmxlZFwiKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJidWdneVFTQS5wdXNoKFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9wZXJhIDEwLTExIGRvZXMgbm90IHRocm93IG9uIHBvc3QtY29tbWEgaW52YWxpZCBwc2V1ZG9zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiKiw6eFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmJ1Z2d5UVNBLnB1c2goXCIsLio6XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgPSBybmF0aXZlLnRlc3QoKG1hdGNoZXMgPSBkb2NFbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2NFbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2NFbGVtLm9NYXRjaGVzU2VsZWN0b3IgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jRWxlbS5tc01hdGNoZXNTZWxlY3RvcikpKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoZnVuY3Rpb24gKGRpdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgaXQncyBwb3NzaWJsZSB0byBkbyBtYXRjaGVzU2VsZWN0b3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb24gYSBkaXNjb25uZWN0ZWQgbm9kZSAoSUUgOSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCA9IG1hdGNoZXMuY2FsbChkaXYsIFwiZGl2XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBzaG91bGQgZmFpbCB3aXRoIGFuIGV4Y2VwdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHZWNrbyBkb2VzIG5vdCBlcnJvciwgcmV0dXJucyBmYWxzZSBpbnN0ZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMuY2FsbChkaXYsIFwiW3MhPScnXTp4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYnVnZ3lNYXRjaGVzLnB1c2goXCIhPVwiLCBwc2V1ZG9zKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByYnVnZ3lRU0EgPSByYnVnZ3lRU0EubGVuZ3RoICYmIG5ldyBSZWdFeHAocmJ1Z2d5UVNBLmpvaW4oXCJ8XCIpKTtcclxuICAgICAgICAgICAgICAgIHJidWdneU1hdGNoZXMgPSByYnVnZ3lNYXRjaGVzLmxlbmd0aCAmJiBuZXcgUmVnRXhwKHJidWdneU1hdGNoZXMuam9pbihcInxcIikpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qIENvbnRhaW5zXHJcbiAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAgICAgICAgICAgICBoYXNDb21wYXJlID0gcm5hdGl2ZS50ZXN0KGRvY0VsZW0uY29tcGFyZURvY3VtZW50UG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEVsZW1lbnQgY29udGFpbnMgYW5vdGhlclxyXG4gICAgICAgICAgICAgICAgLy8gUHVycG9zZWZ1bGx5IGRvZXMgbm90IGltcGxlbWVudCBpbmNsdXNpdmUgZGVzY2VuZGVudFxyXG4gICAgICAgICAgICAgICAgLy8gQXMgaW4sIGFuIGVsZW1lbnQgZG9lcyBub3QgY29udGFpbiBpdHNlbGZcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5zID0gaGFzQ29tcGFyZSB8fCBybmF0aXZlLnRlc3QoZG9jRWxlbS5jb250YWlucykgP1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZG93biA9IGEubm9kZVR5cGUgPT09IDkgPyBhLmRvY3VtZW50RWxlbWVudCA6IGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXAgPSBiICYmIGIucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEgPT09IGJ1cCB8fCAhIShidXAgJiYgYnVwLm5vZGVUeXBlID09PSAxICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkb3duLmNvbnRhaW5zID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkb3duLmNvbnRhaW5zKGJ1cCkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAmJiBhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGJ1cCkgJiAxNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgICAgICAgICB9IDpcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChiID0gYi5wYXJlbnROb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiID09PSBhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvKiBTb3J0aW5nXHJcbiAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRG9jdW1lbnQgb3JkZXIgc29ydGluZ1xyXG4gICAgICAgICAgICAgICAgc29ydE9yZGVyID0gaGFzQ29tcGFyZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGEsIGIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZsYWcgZm9yIGR1cGxpY2F0ZSByZW1vdmFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhID09PSBiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNEdXBsaWNhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNvcnQgb24gbWV0aG9kIGV4aXN0ZW5jZSBpZiBvbmx5IG9uZSBpbnB1dCBoYXMgY29tcGFyZURvY3VtZW50UG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBhcmUgPSAhYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAtICFiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGFyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBwb3NpdGlvbiBpZiBib3RoIGlucHV0cyBiZWxvbmcgdG8gdGhlIHNhbWUgZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyZSA9IChhLm93bmVyRG9jdW1lbnQgfHwgYSkgPT09IChiLm93bmVyRG9jdW1lbnQgfHwgYikgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihiKSA6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHdlIGtub3cgdGhleSBhcmUgZGlzY29ubmVjdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGlzY29ubmVjdGVkIG5vZGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlICYgMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCFzdXBwb3J0LnNvcnREZXRhY2hlZCAmJiBiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGEpID09PSBjb21wYXJlKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENob29zZSB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIHJlbGF0ZWQgdG8gb3VyIHByZWZlcnJlZCBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEgPT09IGRvYyB8fCBhLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGIgPT09IGRvYyB8fCBiLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFpbnRhaW4gb3JpZ2luYWwgb3JkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzb3J0SW5wdXQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmRleE9mLmNhbGwoc29ydElucHV0LCBhKSAtIGluZGV4T2YuY2FsbChzb3J0SW5wdXQsIGIpKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmUgJiA0ID8gLTEgOiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gOlxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4aXQgZWFybHkgaWYgdGhlIG5vZGVzIGFyZSBpZGVudGljYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEgPT09IGIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0R1cGxpY2F0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVwID0gYS5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVwID0gYi5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXAgPSBbYV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicCA9IFtiXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcmVudGxlc3Mgbm9kZXMgYXJlIGVpdGhlciBkb2N1bWVudHMgb3IgZGlzY29ubmVjdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXVwIHx8ICFidXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhID09PSBkb2MgPyAtMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYiA9PT0gZG9jID8gMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVwID8gLTEgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1cCA/IDEgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRJbnB1dCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGluZGV4T2YuY2FsbChzb3J0SW5wdXQsIGEpIC0gaW5kZXhPZi5jYWxsKHNvcnRJbnB1dCwgYikpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBub2RlcyBhcmUgc2libGluZ3MsIHdlIGNhbiBkbyBhIHF1aWNrIGNoZWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXVwID09PSBidXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaWJsaW5nQ2hlY2soYSwgYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSB3ZSBuZWVkIGZ1bGwgbGlzdHMgb2YgdGhlaXIgYW5jZXN0b3JzIGZvciBjb21wYXJpc29uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ciA9IGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgoY3VyID0gY3VyLnBhcmVudE5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcC51bnNoaWZ0KGN1cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyID0gYjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChjdXIgPSBjdXIucGFyZW50Tm9kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJwLnVuc2hpZnQoY3VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2FsayBkb3duIHRoZSB0cmVlIGxvb2tpbmcgZm9yIGEgZGlzY3JlcGFuY3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGFwW2ldID09PSBicFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBhIHNpYmxpbmcgY2hlY2sgaWYgdGhlIG5vZGVzIGhhdmUgYSBjb21tb24gYW5jZXN0b3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmdDaGVjayhhcFtpXSwgYnBbaV0pIDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2Ugbm9kZXMgaW4gb3VyIGRvY3VtZW50IHNvcnQgZmlyc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwW2ldID09PSBwcmVmZXJyZWREb2MgPyAtMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicFtpXSA9PT0gcHJlZmVycmVkRG9jID8gMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvYztcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIFNpenpsZS5tYXRjaGVzID0gZnVuY3Rpb24gKGV4cHIsIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU2l6emxlKGV4cHIsIG51bGwsIG51bGwsIGVsZW1lbnRzKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIFNpenpsZS5tYXRjaGVzU2VsZWN0b3IgPSBmdW5jdGlvbiAoZWxlbSwgZXhwcikge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXHJcbiAgICAgICAgICAgICAgICBpZiAoKGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtKSAhPT0gZG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXREb2N1bWVudChlbGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBhdHRyaWJ1dGUgc2VsZWN0b3JzIGFyZSBxdW90ZWRcclxuICAgICAgICAgICAgICAgIGV4cHIgPSBleHByLnJlcGxhY2UocmF0dHJpYnV0ZVF1b3RlcywgXCI9JyQxJ11cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yICYmIGRvY3VtZW50SXNIVE1MICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKCFyYnVnZ3lNYXRjaGVzIHx8ICFyYnVnZ3lNYXRjaGVzLnRlc3QoZXhwcikpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKCFyYnVnZ3lRU0EgfHwgIXJidWdneVFTQS50ZXN0KGV4cHIpKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0gbWF0Y2hlcy5jYWxsKGVsZW0sIGV4cHIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSUUgOSdzIG1hdGNoZXNTZWxlY3RvciByZXR1cm5zIGZhbHNlIG9uIGRpc2Nvbm5lY3RlZCBub2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0IHx8IHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzIHdlbGwsIGRpc2Nvbm5lY3RlZCBub2RlcyBhcmUgc2FpZCB0byBiZSBpbiBhIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmcmFnbWVudCBpbiBJRSA5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmRvY3VtZW50ICYmIGVsZW0uZG9jdW1lbnQubm9kZVR5cGUgIT09IDExKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU2l6emxlKGV4cHIsIGRvY3VtZW50LCBudWxsLCBbZWxlbV0pLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBTaXp6bGUuY29udGFpbnMgPSBmdW5jdGlvbiAoY29udGV4dCwgZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0KSAhPT0gZG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXREb2N1bWVudChjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWlucyhjb250ZXh0LCBlbGVtKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIFNpenpsZS5hdHRyID0gZnVuY3Rpb24gKGVsZW0sIG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgaWYgKChlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSkgIT09IGRvY3VtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RG9jdW1lbnQoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZuID0gRXhwci5hdHRySGFuZGxlW25hbWUudG9Mb3dlckNhc2UoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKGpRdWVyeSAjMTM4MDcpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gZm4gJiYgaGFzT3duLmNhbGwoRXhwci5hdHRySGFuZGxlLCBuYW1lLnRvTG93ZXJDYXNlKCkpID9cclxuICAgICAgICAgICAgICAgICAgICBmbihlbGVtLCBuYW1lLCAhZG9jdW1lbnRJc0hUTUwpIDpcclxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID9cclxuICAgICAgICAgICAgICAgICAgICB2YWwgOlxyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnQuYXR0cmlidXRlcyB8fCAhZG9jdW1lbnRJc0hUTUwgP1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uZ2V0QXR0cmlidXRlKG5hbWUpIDpcclxuICAgICAgICAgICAgICAgICAgICAodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpKSAmJiB2YWwuc3BlY2lmaWVkID9cclxuICAgICAgICAgICAgICAgICAgICB2YWwudmFsdWUgOlxyXG4gICAgICAgICAgICAgICAgICAgIG51bGw7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBTaXp6bGUuZXJyb3IgPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTeW50YXggZXJyb3IsIHVucmVjb2duaXplZCBleHByZXNzaW9uOiBcIiArIG1zZyk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogRG9jdW1lbnQgc29ydGluZyBhbmQgcmVtb3ZpbmcgZHVwbGljYXRlc1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5TGlrZX0gcmVzdWx0c1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgU2l6emxlLnVuaXF1ZVNvcnQgPSBmdW5jdGlvbiAocmVzdWx0cykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlcyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGogPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVubGVzcyB3ZSAqa25vdyogd2UgY2FuIGRldGVjdCBkdXBsaWNhdGVzLCBhc3N1bWUgdGhlaXIgcHJlc2VuY2VcclxuICAgICAgICAgICAgICAgIGhhc0R1cGxpY2F0ZSA9ICFzdXBwb3J0LmRldGVjdER1cGxpY2F0ZXM7XHJcbiAgICAgICAgICAgICAgICBzb3J0SW5wdXQgPSAhc3VwcG9ydC5zb3J0U3RhYmxlICYmIHJlc3VsdHMuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzLnNvcnQoc29ydE9yZGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzRHVwbGljYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChlbGVtID0gcmVzdWx0c1tpKytdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbSA9PT0gcmVzdWx0c1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9IGR1cGxpY2F0ZXMucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoai0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMuc3BsaWNlKGR1cGxpY2F0ZXNbal0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDbGVhciBpbnB1dCBhZnRlciBzb3J0aW5nIHRvIHJlbGVhc2Ugb2JqZWN0c1xyXG4gICAgICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvc2l6emxlL3B1bGwvMjI1XHJcbiAgICAgICAgICAgICAgICBzb3J0SW5wdXQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFV0aWxpdHkgZnVuY3Rpb24gZm9yIHJldHJpZXZpbmcgdGhlIHRleHQgdmFsdWUgb2YgYW4gYXJyYXkgb2YgRE9NIG5vZGVzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl8RWxlbWVudH0gZWxlbVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0VGV4dCA9IFNpenpsZS5nZXRUZXh0ID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbm9kZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBubyBub2RlVHlwZSwgdGhpcyBpcyBleHBlY3RlZCB0byBiZSBhbiBhcnJheVxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgobm9kZSA9IGVsZW1baSsrXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gbm90IHRyYXZlcnNlIGNvbW1lbnQgbm9kZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ICs9IGdldFRleHQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlVHlwZSA9PT0gMSB8fCBub2RlVHlwZSA9PT0gOSB8fCBub2RlVHlwZSA9PT0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5uZXJUZXh0IHVzYWdlIHJlbW92ZWQgZm9yIGNvbnNpc3RlbmN5IG9mIG5ldyBsaW5lcyAoalF1ZXJ5ICMxMTE1MylcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVsZW0udGV4dENvbnRlbnQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJhdmVyc2UgaXRzIGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSBnZXRUZXh0KGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLm5vZGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBpbmNsdWRlIGNvbW1lbnQgb3IgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiBub2Rlc1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBFeHByID0gU2l6emxlLnNlbGVjdG9ycyA9IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDYW4gYmUgYWRqdXN0ZWQgYnkgdGhlIHVzZXJcclxuICAgICAgICAgICAgICAgIGNhY2hlTGVuZ3RoOiA1MCxcclxuXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQc2V1ZG86IG1hcmtGdW5jdGlvbixcclxuXHJcbiAgICAgICAgICAgICAgICBtYXRjaDogbWF0Y2hFeHByLFxyXG5cclxuICAgICAgICAgICAgICAgIGF0dHJIYW5kbGU6IHt9LFxyXG5cclxuICAgICAgICAgICAgICAgIGZpbmQ6IHt9LFxyXG5cclxuICAgICAgICAgICAgICAgIHJlbGF0aXZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCI+XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyOiBcInBhcmVudE5vZGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3Q6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcjogXCJwYXJlbnROb2RlXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiK1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3Q6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiflwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgcHJlRmlsdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJBVFRSXCI6IGZ1bmN0aW9uIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFsxXSA9IG1hdGNoWzFdLnJlcGxhY2UocnVuZXNjYXBlLCBmdW5lc2NhcGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0aGUgZ2l2ZW4gdmFsdWUgdG8gbWF0Y2hbM10gd2hldGhlciBxdW90ZWQgb3IgdW5xdW90ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbM10gPSAobWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIikucmVwbGFjZShydW5lc2NhcGUsIGZ1bmVzY2FwZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMl0gPT09IFwifj1cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbM10gPSBcIiBcIiArIG1hdGNoWzNdICsgXCIgXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaC5zbGljZSgwLCA0KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcIkNISUxEXCI6IGZ1bmN0aW9uIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBtYXRjaGVzIGZyb20gbWF0Y2hFeHByW1wiQ0hJTERcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHQxIHR5cGUgKG9ubHl8bnRofC4uLilcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHQyIHdoYXQgKGNoaWxkfG9mLXR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0MyBhcmd1bWVudCAoZXZlbnxvZGR8XFxkKnxcXGQqbihbKy1dXFxkKyk/fC4uLilcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHQ0IHhuLWNvbXBvbmVudCBvZiB4bit5IGFyZ3VtZW50IChbKy1dP1xcZCpufClcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHQ1IHNpZ24gb2YgeG4tY29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0NiB4IG9mIHhuLWNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcdDcgc2lnbiBvZiB5LWNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcdDggeSBvZiB5LWNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFsxXSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMV0uc2xpY2UoMCwgMykgPT09IFwibnRoXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG50aC0qIHJlcXVpcmVzIGFyZ3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1hdGNoWzNdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l6emxlLmVycm9yKG1hdGNoWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBudW1lcmljIHggYW5kIHkgcGFyYW1ldGVycyBmb3IgRXhwci5maWx0ZXIuQ0hJTERcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbWVtYmVyIHRoYXQgZmFsc2UvdHJ1ZSBjYXN0IHJlc3BlY3RpdmVseSB0byAwLzFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzRdID0gKyhtYXRjaFs0XSA/IG1hdGNoWzVdICsgKG1hdGNoWzZdIHx8IDEpIDogMiAqIChtYXRjaFszXSA9PT0gXCJldmVuXCIgfHwgbWF0Y2hbM10gPT09IFwib2RkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzVdID0gKygobWF0Y2hbN10gKyBtYXRjaFs4XSkgfHwgbWF0Y2hbM10gPT09IFwib2RkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG90aGVyIHR5cGVzIHByb2hpYml0IGFyZ3VtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzNdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXp6bGUuZXJyb3IobWF0Y2hbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJQU0VVRE9cIjogZnVuY3Rpb24gKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleGNlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnF1b3RlZCA9ICFtYXRjaFs1XSAmJiBtYXRjaFsyXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaEV4cHJbXCJDSElMRFwiXS50ZXN0KG1hdGNoWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFjY2VwdCBxdW90ZWQgYXJndW1lbnRzIGFzLWlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaFszXSAmJiBtYXRjaFs0XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFsyXSA9IG1hdGNoWzRdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0cmlwIGV4Y2VzcyBjaGFyYWN0ZXJzIGZyb20gdW5xdW90ZWQgYXJndW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodW5xdW90ZWQgJiYgcnBzZXVkby50ZXN0KHVucXVvdGVkKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IGV4Y2VzcyBmcm9tIHRva2VuaXplIChyZWN1cnNpdmVseSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChleGNlc3MgPSB0b2tlbml6ZSh1bnF1b3RlZCwgdHJ1ZSkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNsb3NpbmcgcGFyZW50aGVzaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChleGNlc3MgPSB1bnF1b3RlZC5pbmRleE9mKFwiKVwiLCB1bnF1b3RlZC5sZW5ndGggLSBleGNlc3MpIC0gdW5xdW90ZWQubGVuZ3RoKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4Y2VzcyBpcyBhIG5lZ2F0aXZlIGluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKDAsIGV4Y2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFsyXSA9IHVucXVvdGVkLnNsaWNlKDAsIGV4Y2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiBvbmx5IGNhcHR1cmVzIG5lZWRlZCBieSB0aGUgcHNldWRvIGZpbHRlciBtZXRob2QgKHR5cGUgYW5kIGFyZ3VtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2guc2xpY2UoMCwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJUQUdcIjogZnVuY3Rpb24gKG5vZGVOYW1lU2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVOYW1lID0gbm9kZU5hbWVTZWxlY3Rvci5yZXBsYWNlKHJ1bmVzY2FwZSwgZnVuZXNjYXBlKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZU5hbWVTZWxlY3RvciA9PT0gXCIqXCIgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbm9kZU5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwiQ0xBU1NcIjogZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF0dGVybiA9IGNsYXNzQ2FjaGVbY2xhc3NOYW1lICsgXCIgXCJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhdHRlcm4gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwYXR0ZXJuID0gbmV3IFJlZ0V4cChcIihefFwiICsgd2hpdGVzcGFjZSArIFwiKVwiICsgY2xhc3NOYW1lICsgXCIoXCIgKyB3aGl0ZXNwYWNlICsgXCJ8JClcIikpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0NhY2hlKGNsYXNzTmFtZSwgZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGF0dGVybi50ZXN0KHR5cGVvZiBlbGVtLmNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBlbGVtLmNsYXNzTmFtZSB8fCB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgIT09IHN0cnVuZGVmaW5lZCAmJiBlbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJBVFRSXCI6IGZ1bmN0aW9uIChuYW1lLCBvcGVyYXRvciwgY2hlY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gU2l6emxlLmF0dHIoZWxlbSwgbmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wZXJhdG9yID09PSBcIiE9XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wZXJhdG9yID09PSBcIj1cIiA/IHJlc3VsdCA9PT0gY2hlY2sgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yID09PSBcIiE9XCIgPyByZXN1bHQgIT09IGNoZWNrIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvciA9PT0gXCJePVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoY2hlY2spID09PSAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvciA9PT0gXCIqPVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoY2hlY2spID4gLTEgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yID09PSBcIiQ9XCIgPyBjaGVjayAmJiByZXN1bHQuc2xpY2UoLWNoZWNrLmxlbmd0aCkgPT09IGNoZWNrIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvciA9PT0gXCJ+PVwiID8gKFwiIFwiICsgcmVzdWx0ICsgXCIgXCIpLmluZGV4T2YoY2hlY2spID4gLTEgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yID09PSBcInw9XCIgPyByZXN1bHQgPT09IGNoZWNrIHx8IHJlc3VsdC5zbGljZSgwLCBjaGVjay5sZW5ndGggKyAxKSA9PT0gY2hlY2sgKyBcIi1cIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJDSElMRFwiOiBmdW5jdGlvbiAodHlwZSwgd2hhdCwgYXJndW1lbnQsIGZpcnN0LCBsYXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaW1wbGUgPSB0eXBlLnNsaWNlKDAsIDMpICE9PSBcIm50aFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yd2FyZCA9IHR5cGUuc2xpY2UoLTQpICE9PSBcImxhc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mVHlwZSA9IHdoYXQgPT09IFwib2YtdHlwZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpcnN0ID09PSAxICYmIGxhc3QgPT09IDAgP1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0IGZvciA6bnRoLSoobilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhZWxlbS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVsZW0sIGNvbnRleHQsIHhtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWNoZSwgb3V0ZXJDYWNoZSwgbm9kZSwgZGlmZiwgbm9kZUluZGV4LCBzdGFydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyID0gc2ltcGxlICE9PSBmb3J3YXJkID8gXCJuZXh0U2libGluZ1wiIDogXCJwcmV2aW91c1NpYmxpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gb2ZUeXBlICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlQ2FjaGUgPSAheG1sICYmICFvZlR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDooZmlyc3R8bGFzdHxvbmx5KS0oY2hpbGR8b2YtdHlwZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpbXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGRpcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBlbGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgobm9kZSA9IG5vZGVbZGlyXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mVHlwZSA/IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSA6IG5vZGUubm9kZVR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXZlcnNlIGRpcmVjdGlvbiBmb3IgOm9ubHktKiAoaWYgd2UgaGF2ZW4ndCB5ZXQgZG9uZSBzbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IGRpciA9IHR5cGUgPT09IFwib25seVwiICYmICFzdGFydCAmJiBcIm5leHRTaWJsaW5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBbZm9yd2FyZCA/IHBhcmVudC5maXJzdENoaWxkIDogcGFyZW50Lmxhc3RDaGlsZF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub24teG1sIDpudGgtY2hpbGQoLi4uKSBzdG9yZXMgY2FjaGUgZGF0YSBvbiBgcGFyZW50YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9yd2FyZCAmJiB1c2VDYWNoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VlayBgZWxlbWAgZnJvbSBhIHByZXZpb3VzbHktY2FjaGVkIGluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlckNhY2hlID0gcGFyZW50W2V4cGFuZG9dIHx8IChwYXJlbnRbZXhwYW5kb10gPSB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZSA9IG91dGVyQ2FjaGVbdHlwZV0gfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlSW5kZXggPSBjYWNoZVswXSA9PT0gZGlycnVucyAmJiBjYWNoZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYgPSBjYWNoZVswXSA9PT0gZGlycnVucyAmJiBjYWNoZVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlSW5kZXggJiYgcGFyZW50LmNoaWxkTm9kZXNbbm9kZUluZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKG5vZGUgPSArK25vZGVJbmRleCAmJiBub2RlICYmIG5vZGVbZGlyXSB8fFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmFsbGJhY2sgdG8gc2Vla2luZyBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRpZmYgPSBub2RlSW5kZXggPSAwKSB8fCBzdGFydC5wb3AoKSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2hlbiBmb3VuZCwgY2FjaGUgaW5kZXhlcyBvbiBgcGFyZW50YCBhbmQgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSAmJiArK2RpZmYgJiYgbm9kZSA9PT0gZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlckNhY2hlW3R5cGVdID0gW2RpcnJ1bnMsIG5vZGVJbmRleCwgZGlmZl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgcHJldmlvdXNseS1jYWNoZWQgZWxlbWVudCBpbmRleCBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1c2VDYWNoZSAmJiAoY2FjaGUgPSAoZWxlbVtleHBhbmRvXSB8fCAoZWxlbVtleHBhbmRvXSA9IHt9KSlbdHlwZV0pICYmIGNhY2hlWzBdID09PSBkaXJydW5zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWZmID0gY2FjaGVbMV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8geG1sIDpudGgtY2hpbGQoLi4uKSBvciA6bnRoLWxhc3QtY2hpbGQoLi4uKSBvciA6bnRoKC1sYXN0KT8tb2YtdHlwZSguLi4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIHNhbWUgbG9vcCBhcyBhYm92ZSB0byBzZWVrIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlW2Rpcl0gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRpZmYgPSBub2RlSW5kZXggPSAwKSB8fCBzdGFydC5wb3AoKSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChvZlR5cGUgPyBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOiBub2RlLm5vZGVUeXBlID09PSAxKSAmJiArK2RpZmYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FjaGUgdGhlIGluZGV4IG9mIGVhY2ggZW5jb3VudGVyZWQgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlQ2FjaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChub2RlW2V4cGFuZG9dIHx8IChub2RlW2V4cGFuZG9dID0ge30pKVt0eXBlXSA9IFtkaXJydW5zLCBkaWZmXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgPT09IGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbmNvcnBvcmF0ZSB0aGUgb2Zmc2V0LCB0aGVuIGNoZWNrIGFnYWluc3QgY3ljbGUgc2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWZmIC09IGxhc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkaWZmID09PSBmaXJzdCB8fCAoZGlmZiAlIGZpcnN0ID09PSAwICYmIGRpZmYgLyBmaXJzdCA+PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwiUFNFVURPXCI6IGZ1bmN0aW9uIChwc2V1ZG8sIGFyZ3VtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBzZXVkby1jbGFzcyBuYW1lcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI3BzZXVkby1jbGFzc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByaW9yaXRpemUgYnkgY2FzZSBzZW5zaXRpdml0eSBpbiBjYXNlIGN1c3RvbSBwc2V1ZG9zIGFyZSBhZGRlZCB3aXRoIHVwcGVyY2FzZSBsZXR0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoYXQgc2V0RmlsdGVycyBpbmhlcml0cyBmcm9tIHBzZXVkb3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbiA9IEV4cHIucHNldWRvc1twc2V1ZG9dIHx8IEV4cHIuc2V0RmlsdGVyc1twc2V1ZG8udG9Mb3dlckNhc2UoKV0gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpenpsZS5lcnJvcihcInVuc3VwcG9ydGVkIHBzZXVkbzogXCIgKyBwc2V1ZG8pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHVzZXIgbWF5IHVzZSBjcmVhdGVQc2V1ZG8gdG8gaW5kaWNhdGUgdGhhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhcmd1bWVudHMgYXJlIG5lZWRlZCB0byBjcmVhdGUgdGhlIGZpbHRlciBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBqdXN0IGFzIFNpenpsZSBkb2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmbltleHBhbmRvXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKGFyZ3VtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQnV0IG1haW50YWluIHN1cHBvcnQgZm9yIG9sZCBzaWduYXR1cmVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmbi5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzID0gW3BzZXVkbywgcHNldWRvLCBcIlwiLCBhcmd1bWVudF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRXhwci5zZXRGaWx0ZXJzLmhhc093blByb3BlcnR5KHBzZXVkby50b0xvd2VyQ2FzZSgpKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya0Z1bmN0aW9uKGZ1bmN0aW9uIChzZWVkLCBtYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZHgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkID0gZm4oc2VlZCwgYXJndW1lbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IG1hdGNoZWQubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHggPSBpbmRleE9mLmNhbGwoc2VlZCwgbWF0Y2hlZFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWVkW2lkeF0gPSAhKG1hdGNoZXNbaWR4XSA9IG1hdGNoZWRbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmbihlbGVtLCAwLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBwc2V1ZG9zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUG90ZW50aWFsbHkgY29tcGxleCBwc2V1ZG9zXHJcbiAgICAgICAgICAgICAgICAgICAgXCJub3RcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmltIHRoZSBzZWxlY3RvciBwYXNzZWQgdG8gY29tcGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhdm9pZCB0cmVhdGluZyBsZWFkaW5nIGFuZCB0cmFpbGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzcGFjZXMgYXMgY29tYmluYXRvcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyID0gY29tcGlsZShzZWxlY3Rvci5yZXBsYWNlKHJ0cmltLCBcIiQxXCIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVyW2V4cGFuZG9dID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtGdW5jdGlvbihmdW5jdGlvbiAoc2VlZCwgbWF0Y2hlcywgY29udGV4dCwgeG1sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubWF0Y2hlZCA9IG1hdGNoZXIoc2VlZCwgbnVsbCwgeG1sLCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBzZWVkLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWF0Y2ggZWxlbWVudHMgdW5tYXRjaGVkIGJ5IGBtYXRjaGVyYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChlbGVtID0gdW5tYXRjaGVkW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VlZFtpXSA9ICEobWF0Y2hlc1tpXSA9IGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVsZW0sIGNvbnRleHQsIHhtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0WzBdID0gZWxlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyKGlucHV0LCBudWxsLCB4bWwsIHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhcmVzdWx0cy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGFzXCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gU2l6emxlKHNlbGVjdG9yLCBlbGVtKS5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcImNvbnRhaW5zXCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZWxlbS50ZXh0Q29udGVudCB8fCBlbGVtLmlubmVyVGV4dCB8fCBnZXRUZXh0KGVsZW0pKS5pbmRleE9mKHRleHQpID4gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFwiV2hldGhlciBhbiBlbGVtZW50IGlzIHJlcHJlc2VudGVkIGJ5IGEgOmxhbmcoKSBzZWxlY3RvclxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIGJhc2VkIHNvbGVseSBvbiB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYmVpbmcgZXF1YWwgdG8gdGhlIGlkZW50aWZpZXIgQyxcclxuICAgICAgICAgICAgICAgICAgICAvLyBvciBiZWdpbm5pbmcgd2l0aCB0aGUgaWRlbnRpZmllciBDIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IFwiLVwiLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBtYXRjaGluZyBvZiBDIGFnYWluc3QgdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZSBpcyBwZXJmb3JtZWQgY2FzZS1pbnNlbnNpdGl2ZWx5LlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBpZGVudGlmaWVyIEMgZG9lcyBub3QgaGF2ZSB0byBiZSBhIHZhbGlkIGxhbmd1YWdlIG5hbWUuXCJcclxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2xhbmctcHNldWRvXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYW5nXCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiAobGFuZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsYW5nIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBpZGVudGlmaWVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmlkZW50aWZpZXIudGVzdChsYW5nIHx8IFwiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXp6bGUuZXJyb3IoXCJ1bnN1cHBvcnRlZCBsYW5nOiBcIiArIGxhbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhbmcgPSBsYW5nLnJlcGxhY2UocnVuZXNjYXBlLCBmdW5lc2NhcGUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1MYW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZWxlbUxhbmcgPSBkb2N1bWVudElzSFRNTCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmxhbmcgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5nZXRBdHRyaWJ1dGUoXCJ4bWw6bGFuZ1wiKSB8fCBlbGVtLmdldEF0dHJpYnV0ZShcImxhbmdcIikpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtTGFuZyA9IGVsZW1MYW5nLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtTGFuZyA9PT0gbGFuZyB8fCBlbGVtTGFuZy5pbmRleE9mKGxhbmcgKyBcIi1cIikgPT09IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoKGVsZW0gPSBlbGVtLnBhcmVudE5vZGUpICYmIGVsZW0ubm9kZVR5cGUgPT09IDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBNaXNjZWxsYW5lb3VzXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0YXJnZXRcIjogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24gJiYgd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNoICYmIGhhc2guc2xpY2UoMSkgPT09IGVsZW0uaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyb290XCI6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtID09PSBkb2NFbGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwiZm9jdXNcIjogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0gPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKCFkb2N1bWVudC5oYXNGb2N1cyB8fCBkb2N1bWVudC5oYXNGb2N1cygpKSAmJiAhIShlbGVtLnR5cGUgfHwgZWxlbS5ocmVmIHx8IH5lbGVtLnRhYkluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBCb29sZWFuIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICBcImVuYWJsZWRcIjogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGlzYWJsZWRcIjogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjaGVja2VkXCI6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluIENTUzMsIDpjaGVja2VkIHNob3VsZCByZXR1cm4gYm90aCBjaGVja2VkIGFuZCBzZWxlY3RlZCBlbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZU5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAobm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiAhIWVsZW0uY2hlY2tlZCkgfHwgKG5vZGVOYW1lID09PSBcIm9wdGlvblwiICYmICEhZWxlbS5zZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZFwiOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBY2Nlc3NpbmcgdGhpcyBwcm9wZXJ0eSBtYWtlcyBzZWxlY3RlZC1ieS1kZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9wdGlvbnMgaW4gU2FmYXJpIHdvcmsgcHJvcGVybHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0ucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLnNlbGVjdGVkID09PSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbnRlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbXB0eVwiOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2VtcHR5LXBzZXVkb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA6ZW1wdHkgaXMgbmVnYXRlZCBieSBlbGVtZW50ICgxKSBvciBjb250ZW50IG5vZGVzICh0ZXh0OiAzOyBjZGF0YTogNDsgZW50aXR5IHJlZjogNSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgYnV0IG5vdCBieSBvdGhlcnMgKGNvbW1lbnQ6IDg7IHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb246IDc7IGV0Yy4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vZGVUeXBlIDwgNiB3b3JrcyBiZWNhdXNlIGF0dHJpYnV0ZXMgKDIpIGRvIG5vdCBhcHBlYXIgYXMgY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0ubm9kZVR5cGUgPCA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwicGFyZW50XCI6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhRXhwci5wc2V1ZG9zW1wiZW1wdHlcIl0oZWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRWxlbWVudC9pbnB1dCB0eXBlc1xyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZGVyXCI6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByaGVhZGVyLnRlc3QoZWxlbS5ub2RlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpbnB1dFwiOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmlucHV0cy50ZXN0KGVsZW0ubm9kZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCI6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gXCJidXR0b25cIiB8fCBuYW1lID09PSBcImJ1dHRvblwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXR0cjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnR5cGUgPT09IFwidGV4dFwiICYmXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmV3IEhUTUw1IGF0dHJpYnV0ZSB2YWx1ZXMgKGUuZy4sIFwic2VhcmNoXCIpIGFwcGVhciB3aXRoIGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKFwidHlwZVwiKSkgPT0gbnVsbCB8fCBhdHRyLnRvTG93ZXJDYXNlKCkgPT09IFwidGV4dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBQb3NpdGlvbi1pbi1jb2xsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgXCJmaXJzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFswXTtcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYXN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24gKG1hdGNoSW5kZXhlcywgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbbGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwiZXFcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiAobWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwiZXZlblwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uIChtYXRjaEluZGV4ZXMsIGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpICs9IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoSW5kZXhlcy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaEluZGV4ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwib2RkXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24gKG1hdGNoSW5kZXhlcywgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hJbmRleGVzLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoSW5kZXhlcztcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uIChtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDsgLS1pID49IDA7KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaEluZGV4ZXMucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hJbmRleGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcImd0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24gKG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOyArK2kgPCBsZW5ndGg7KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaEluZGV4ZXMucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hJbmRleGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBFeHByLnBzZXVkb3NbXCJudGhcIl0gPSBFeHByLnBzZXVkb3NbXCJlcVwiXTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCBidXR0b24vaW5wdXQgdHlwZSBwc2V1ZG9zXHJcbiAgICAgICAgICAgIGZvciAoaSBpbiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW86IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3g6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSkge1xyXG4gICAgICAgICAgICAgICAgRXhwci5wc2V1ZG9zW2ldID0gY3JlYXRlSW5wdXRQc2V1ZG8oaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChpIGluIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJtaXQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzZXQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pIHtcclxuICAgICAgICAgICAgICAgIEV4cHIucHNldWRvc1tpXSA9IGNyZWF0ZUJ1dHRvblBzZXVkbyhpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRWFzeSBBUEkgZm9yIGNyZWF0aW5nIG5ldyBzZXRGaWx0ZXJzXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldEZpbHRlcnMoKSB7fVxyXG4gICAgICAgICAgICBzZXRGaWx0ZXJzLnByb3RvdHlwZSA9IEV4cHIuZmlsdGVycyA9IEV4cHIucHNldWRvcztcclxuICAgICAgICAgICAgRXhwci5zZXRGaWx0ZXJzID0gbmV3IHNldEZpbHRlcnMoKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRva2VuaXplKHNlbGVjdG9yLCBwYXJzZU9ubHkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYXRjaGVkLCBtYXRjaCwgdG9rZW5zLCB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvRmFyLCBncm91cHMsIHByZUZpbHRlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVkID0gdG9rZW5DYWNoZVtzZWxlY3RvciArIFwiIFwiXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2FjaGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlT25seSA/IDAgOiBjYWNoZWQuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc29GYXIgPSBzZWxlY3RvcjtcclxuICAgICAgICAgICAgICAgIGdyb3VwcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcHJlRmlsdGVycyA9IEV4cHIucHJlRmlsdGVyO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChzb0Zhcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDb21tYSBhbmQgZmlyc3QgcnVuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXRjaGVkIHx8IChtYXRjaCA9IHJjb21tYS5leGVjKHNvRmFyKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBjb25zdW1lIHRyYWlsaW5nIGNvbW1hcyBhcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29GYXIgPSBzb0Zhci5zbGljZShtYXRjaFswXS5sZW5ndGgpIHx8IHNvRmFyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKCh0b2tlbnMgPSBbXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDb21iaW5hdG9yc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgobWF0Y2ggPSByY29tYmluYXRvcnMuZXhlYyhzb0ZhcikpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbWF0Y2hlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhc3QgZGVzY2VuZGFudCBjb21iaW5hdG9ycyB0byBzcGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbWF0Y2hbMF0ucmVwbGFjZShydHJpbSwgXCIgXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb0ZhciA9IHNvRmFyLnNsaWNlKG1hdGNoZWQubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpbHRlcnNcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHR5cGUgaW4gRXhwci5maWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChtYXRjaCA9IG1hdGNoRXhwclt0eXBlXS5leGVjKHNvRmFyKSkgJiYgKCFwcmVGaWx0ZXJzW3R5cGVdIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1hdGNoID0gcHJlRmlsdGVyc1t0eXBlXShtYXRjaCkpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG1hdGNoZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzOiBtYXRjaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb0ZhciA9IHNvRmFyLnNsaWNlKG1hdGNoZWQubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXRjaGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgaW52YWxpZCBleGNlc3NcclxuICAgICAgICAgICAgICAgIC8vIGlmIHdlJ3JlIGp1c3QgcGFyc2luZ1xyXG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvciBvciByZXR1cm4gdG9rZW5zXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VPbmx5ID9cclxuICAgICAgICAgICAgICAgICAgICBzb0Zhci5sZW5ndGggOlxyXG4gICAgICAgICAgICAgICAgICAgIHNvRmFyID9cclxuICAgICAgICAgICAgICAgICAgICBTaXp6bGUuZXJyb3Ioc2VsZWN0b3IpIDpcclxuICAgICAgICAgICAgICAgICAgICAvLyBDYWNoZSB0aGUgdG9rZW5zXHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5DYWNoZShzZWxlY3RvciwgZ3JvdXBzKS5zbGljZSgwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdG9TZWxlY3Rvcih0b2tlbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSB0b2tlbnMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciArPSB0b2tlbnNbaV0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZENvbWJpbmF0b3IobWF0Y2hlciwgY29tYmluYXRvciwgYmFzZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpciA9IGNvbWJpbmF0b3IuZGlyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrTm9uRWxlbWVudHMgPSBiYXNlICYmIGRpciA9PT0gXCJwYXJlbnROb2RlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZU5hbWUgPSBkb25lKys7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmF0b3IuZmlyc3QgP1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGFnYWluc3QgY2xvc2VzdCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlbGVtLCBjb250ZXh0LCB4bWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChlbGVtID0gZWxlbVtkaXJdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVyKGVsZW0sIGNvbnRleHQsIHhtbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgYWdhaW5zdCBhbGwgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVsZW0sIGNvbnRleHQsIHhtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2xkQ2FjaGUsIG91dGVyQ2FjaGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYWNoZSA9IFtkaXJydW5zLCBkb25lTmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCBzZXQgYXJiaXRyYXJ5IGRhdGEgb24gWE1MIG5vZGVzLCBzbyB0aGV5IGRvbid0IGJlbmVmaXQgZnJvbSBkaXIgY2FjaGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeG1sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKGVsZW0gPSBlbGVtW2Rpcl0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcihlbGVtLCBjb250ZXh0LCB4bWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgoZWxlbSA9IGVsZW1bZGlyXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyQ2FjaGUgPSBlbGVtW2V4cGFuZG9dIHx8IChlbGVtW2V4cGFuZG9dID0ge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG9sZENhY2hlID0gb3V0ZXJDYWNoZVtkaXJdKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkQ2FjaGVbMF0gPT09IGRpcnJ1bnMgJiYgb2xkQ2FjaGVbMV0gPT09IGRvbmVOYW1lKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXNzaWduIHRvIG5ld0NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAobmV3Q2FjaGVbMl0gPSBvbGRDYWNoZVsyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXVzZSBuZXdjYWNoZSBzbyByZXN1bHRzIGJhY2stcHJvcGFnYXRlIHRvIHByZXZpb3VzIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlckNhY2hlW2Rpcl0gPSBuZXdDYWNoZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIG1hdGNoIG1lYW5zIHdlJ3JlIGRvbmU7IGEgZmFpbCBtZWFucyB3ZSBoYXZlIHRvIGtlZXAgY2hlY2tpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobmV3Q2FjaGVbMl0gPSBtYXRjaGVyKGVsZW0sIGNvbnRleHQsIHhtbCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBlbGVtZW50TWF0Y2hlcihtYXRjaGVycykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXJzLmxlbmd0aCA+IDEgP1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlbGVtLCBjb250ZXh0LCB4bWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBtYXRjaGVycy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2hlcnNbaV0oZWxlbSwgY29udGV4dCwgeG1sKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IDpcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVyc1swXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY29uZGVuc2UodW5tYXRjaGVkLCBtYXAsIGZpbHRlciwgY29udGV4dCwgeG1sKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbSxcclxuICAgICAgICAgICAgICAgICAgICBuZXdVbm1hdGNoZWQgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSB1bm1hdGNoZWQubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcHBlZCA9IG1hcCAhPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGVsZW0gPSB1bm1hdGNoZWRbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlsdGVyIHx8IGZpbHRlcihlbGVtLCBjb250ZXh0LCB4bWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdVbm1hdGNoZWQucHVzaChlbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXBwZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3VW5tYXRjaGVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRNYXRjaGVyKHByZUZpbHRlciwgc2VsZWN0b3IsIG1hdGNoZXIsIHBvc3RGaWx0ZXIsIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvc3RGaWx0ZXIgJiYgIXBvc3RGaWx0ZXJbZXhwYW5kb10pIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3N0RmlsdGVyID0gc2V0TWF0Y2hlcihwb3N0RmlsdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwb3N0RmluZGVyICYmICFwb3N0RmluZGVyW2V4cGFuZG9dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdEZpbmRlciA9IHNldE1hdGNoZXIocG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24gKHNlZWQsIHJlc3VsdHMsIGNvbnRleHQsIHhtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wLCBpLCBlbGVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVNYXAgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1hcCA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVleGlzdGluZyA9IHJlc3VsdHMubGVuZ3RoLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IGluaXRpYWwgZWxlbWVudHMgZnJvbSBzZWVkIG9yIGNvbnRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbXMgPSBzZWVkIHx8IG11bHRpcGxlQ29udGV4dHMoc2VsZWN0b3IgfHwgXCIqXCIsIGNvbnRleHQubm9kZVR5cGUgPyBbY29udGV4dF0gOiBjb250ZXh0LCBbXSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmVmaWx0ZXIgdG8gZ2V0IG1hdGNoZXIgaW5wdXQsIHByZXNlcnZpbmcgYSBtYXAgZm9yIHNlZWQtcmVzdWx0cyBzeW5jaHJvbml6YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlckluID0gcHJlRmlsdGVyICYmIChzZWVkIHx8ICFzZWxlY3RvcikgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kZW5zZShlbGVtcywgcHJlTWFwLCBwcmVGaWx0ZXIsIGNvbnRleHQsIHhtbCkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtcyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXJPdXQgPSBtYXRjaGVyID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHBvc3RGaW5kZXIsIG9yIGZpbHRlcmVkIHNlZWQsIG9yIG5vbi1zZWVkIHBvc3RGaWx0ZXIgb3IgcHJlZXhpc3RpbmcgcmVzdWx0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdEZpbmRlciB8fCAoc2VlZCA/IHByZUZpbHRlciA6IHByZWV4aXN0aW5nIHx8IHBvc3RGaWx0ZXIpID9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC4uLmludGVybWVkaWF0ZSBwcm9jZXNzaW5nIGlzIG5lY2Vzc2FyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbXSA6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAuLi5vdGhlcndpc2UgdXNlIHJlc3VsdHMgZGlyZWN0bHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXJJbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmluZCBwcmltYXJ5IG1hdGNoZXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyKG1hdGNoZXJJbiwgbWF0Y2hlck91dCwgY29udGV4dCwgeG1sKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IHBvc3RGaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zdEZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wID0gY29uZGVuc2UobWF0Y2hlck91dCwgcG9zdE1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RGaWx0ZXIodGVtcCwgW10sIGNvbnRleHQsIHhtbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVbi1tYXRjaCBmYWlsaW5nIGVsZW1lbnRzIGJ5IG1vdmluZyB0aGVtIGJhY2sgdG8gbWF0Y2hlckluXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSB0ZW1wLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChlbGVtID0gdGVtcFtpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyT3V0W3Bvc3RNYXBbaV1dID0gIShtYXRjaGVySW5bcG9zdE1hcFtpXV0gPSBlbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3RGaW5kZXIgfHwgcHJlRmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zdEZpbmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgZmluYWwgbWF0Y2hlck91dCBieSBjb25kZW5zaW5nIHRoaXMgaW50ZXJtZWRpYXRlIGludG8gcG9zdEZpbmRlciBjb250ZXh0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gbWF0Y2hlck91dC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGVsZW0gPSBtYXRjaGVyT3V0W2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBtYXRjaGVySW4gc2luY2UgZWxlbSBpcyBub3QgeWV0IGEgZmluYWwgbWF0Y2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAucHVzaCgobWF0Y2hlckluW2ldID0gZWxlbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RGaW5kZXIobnVsbCwgKG1hdGNoZXJPdXQgPSBbXSksIHRlbXAsIHhtbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSBtYXRjaGVkIGVsZW1lbnRzIGZyb20gc2VlZCB0byByZXN1bHRzIHRvIGtlZXAgdGhlbSBzeW5jaHJvbml6ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGVsZW0gPSBtYXRjaGVyT3V0W2ldKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGVtcCA9IHBvc3RGaW5kZXIgPyBpbmRleE9mLmNhbGwoc2VlZCwgZWxlbSkgOiBwcmVNYXBbaV0pID4gLTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZWRbdGVtcF0gPSAhKHJlc3VsdHNbdGVtcF0gPSBlbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBlbGVtZW50cyB0byByZXN1bHRzLCB0aHJvdWdoIHBvc3RGaW5kZXIgaWYgZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXJPdXQgPSBjb25kZW5zZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXJPdXQgPT09IHJlc3VsdHMgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlck91dC5zcGxpY2UocHJlZXhpc3RpbmcsIG1hdGNoZXJPdXQubGVuZ3RoKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyT3V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3N0RmluZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0RmluZGVyKG51bGwsIHJlc3VsdHMsIG1hdGNoZXJPdXQsIHhtbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoLmFwcGx5KHJlc3VsdHMsIG1hdGNoZXJPdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hdGNoZXJGcm9tVG9rZW5zKHRva2Vucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrQ29udGV4dCwgbWF0Y2hlciwgaixcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSB0b2tlbnMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlYWRpbmdSZWxhdGl2ZSA9IEV4cHIucmVsYXRpdmVbdG9rZW5zWzBdLnR5cGVdLFxyXG4gICAgICAgICAgICAgICAgICAgIGltcGxpY2l0UmVsYXRpdmUgPSBsZWFkaW5nUmVsYXRpdmUgfHwgRXhwci5yZWxhdGl2ZVtcIiBcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IGxlYWRpbmdSZWxhdGl2ZSA/IDEgOiAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZm91bmRhdGlvbmFsIG1hdGNoZXIgZW5zdXJlcyB0aGF0IGVsZW1lbnRzIGFyZSByZWFjaGFibGUgZnJvbSB0b3AtbGV2ZWwgY29udGV4dChzKVxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoQ29udGV4dCA9IGFkZENvbWJpbmF0b3IoZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0gPT09IGNoZWNrQ29udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICB9LCBpbXBsaWNpdFJlbGF0aXZlLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaEFueUNvbnRleHQgPSBhZGRDb21iaW5hdG9yKGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleE9mLmNhbGwoY2hlY2tDb250ZXh0LCBlbGVtKSA+IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXJzID0gW2Z1bmN0aW9uIChlbGVtLCBjb250ZXh0LCB4bWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICghbGVhZGluZ1JlbGF0aXZlICYmICh4bWwgfHwgY29udGV4dCAhPT0gb3V0ZXJtb3N0Q29udGV4dCkpIHx8IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGVja0NvbnRleHQgPSBjb250ZXh0KS5ub2RlVHlwZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaENvbnRleHQoZWxlbSwgY29udGV4dCwgeG1sKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaEFueUNvbnRleHQoZWxlbSwgY29udGV4dCwgeG1sKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfV07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgobWF0Y2hlciA9IEV4cHIucmVsYXRpdmVbdG9rZW5zW2ldLnR5cGVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVycyA9IFthZGRDb21iaW5hdG9yKGVsZW1lbnRNYXRjaGVyKG1hdGNoZXJzKSwgbWF0Y2hlcildO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXIgPSBFeHByLmZpbHRlclt0b2tlbnNbaV0udHlwZV0uYXBwbHkobnVsbCwgdG9rZW5zW2ldLm1hdGNoZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHNwZWNpYWwgdXBvbiBzZWVpbmcgYSBwb3NpdGlvbmFsIG1hdGNoZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXJbZXhwYW5kb10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIG5leHQgcmVsYXRpdmUgb3BlcmF0b3IgKGlmIGFueSkgZm9yIHByb3BlciBoYW5kbGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9ICsraTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOyBqIDwgbGVuOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoRXhwci5yZWxhdGl2ZVt0b2tlbnNbal0udHlwZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldE1hdGNoZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA+IDEgJiYgZWxlbWVudE1hdGNoZXIobWF0Y2hlcnMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPiAxICYmIHRvU2VsZWN0b3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBwcmVjZWRpbmcgdG9rZW4gd2FzIGEgZGVzY2VuZGFudCBjb21iaW5hdG9yLCBpbnNlcnQgYW4gaW1wbGljaXQgYW55LWVsZW1lbnQgYCpgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2Vucy5zbGljZSgwLCBpIC0gMSkuY29uY2F0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0b2tlbnNbaSAtIDJdLnR5cGUgPT09IFwiIFwiID8gXCIqXCIgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5yZXBsYWNlKHJ0cmltLCBcIiQxXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA8IGogJiYgbWF0Y2hlckZyb21Ub2tlbnModG9rZW5zLnNsaWNlKGksIGopKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqIDwgbGVuICYmIG1hdGNoZXJGcm9tVG9rZW5zKCh0b2tlbnMgPSB0b2tlbnMuc2xpY2UoaikpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqIDwgbGVuICYmIHRvU2VsZWN0b3IodG9rZW5zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVycy5wdXNoKG1hdGNoZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudE1hdGNoZXIobWF0Y2hlcnMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ5U2V0ID0gc2V0TWF0Y2hlcnMubGVuZ3RoID4gMCxcclxuICAgICAgICAgICAgICAgICAgICBieUVsZW1lbnQgPSBlbGVtZW50TWF0Y2hlcnMubGVuZ3RoID4gMCxcclxuICAgICAgICAgICAgICAgICAgICBzdXBlck1hdGNoZXIgPSBmdW5jdGlvbiAoc2VlZCwgY29udGV4dCwgeG1sLCByZXN1bHRzLCBvdXRlcm1vc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0sIGosIG1hdGNoZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkQ291bnQgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5tYXRjaGVkID0gc2VlZCAmJiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1hdGNoZWQgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRCYWNrdXAgPSBvdXRlcm1vc3RDb250ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgbXVzdCBhbHdheXMgaGF2ZSBlaXRoZXIgc2VlZCBlbGVtZW50cyBvciBvdXRlcm1vc3QgY29udGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbXMgPSBzZWVkIHx8IGJ5RWxlbWVudCAmJiBFeHByLmZpbmRbXCJUQUdcIl0oXCIqXCIsIG91dGVybW9zdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgaW50ZWdlciBkaXJydW5zIGlmZiB0aGlzIGlzIHRoZSBvdXRlcm1vc3QgbWF0Y2hlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlycnVuc1VuaXF1ZSA9IChkaXJydW5zICs9IGNvbnRleHRCYWNrdXAgPT0gbnVsbCA/IDEgOiBNYXRoLnJhbmRvbSgpIHx8IDAuMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSBlbGVtcy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3V0ZXJtb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dCAhPT0gZG9jdW1lbnQgJiYgY29udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGVsZW1lbnRzIHBhc3NpbmcgZWxlbWVudE1hdGNoZXJzIGRpcmVjdGx5IHRvIHJlc3VsdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gS2VlcCBgaWAgYSBzdHJpbmcgaWYgdGhlcmUgYXJlIG5vIGVsZW1lbnRzIHNvIGBtYXRjaGVkQ291bnRgIHdpbGwgYmUgXCIwMFwiIGJlbG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDksIFNhZmFyaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUb2xlcmF0ZSBOb2RlTGlzdCBwcm9wZXJ0aWVzIChJRTogXCJsZW5ndGhcIjsgU2FmYXJpOiA8bnVtYmVyPikgbWF0Y2hpbmcgZWxlbWVudHMgYnkgaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7IGkgIT09IGxlbiAmJiAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChieUVsZW1lbnQgJiYgZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgobWF0Y2hlciA9IGVsZW1lbnRNYXRjaGVyc1tqKytdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcihlbGVtLCBjb250ZXh0LCB4bWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3V0ZXJtb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmFjayB1bm1hdGNoZWQgZWxlbWVudHMgZm9yIHNldCBmaWx0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnlTZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGV5IHdpbGwgaGF2ZSBnb25lIHRocm91Z2ggYWxsIHBvc3NpYmxlIG1hdGNoZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChlbGVtID0gIW1hdGNoZXIgJiYgZWxlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZENvdW50LS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMZW5ndGhlbiB0aGUgYXJyYXkgZm9yIGV2ZXJ5IGVsZW1lbnQsIG1hdGNoZWQgb3Igbm90XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5tYXRjaGVkLnB1c2goZWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBzZXQgZmlsdGVycyB0byB1bm1hdGNoZWQgZWxlbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZENvdW50ICs9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChieVNldCAmJiBpICE9PSBtYXRjaGVkQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChtYXRjaGVyID0gc2V0TWF0Y2hlcnNbaisrXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyKHVubWF0Y2hlZCwgc2V0TWF0Y2hlZCwgY29udGV4dCwgeG1sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlaW50ZWdyYXRlIGVsZW1lbnQgbWF0Y2hlcyB0byBlbGltaW5hdGUgdGhlIG5lZWQgZm9yIHNvcnRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlZENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh1bm1hdGNoZWRbaV0gfHwgc2V0TWF0Y2hlZFtpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNYXRjaGVkW2ldID0gcG9wLmNhbGwocmVzdWx0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERpc2NhcmQgaW5kZXggcGxhY2Vob2xkZXIgdmFsdWVzIHRvIGdldCBvbmx5IGFjdHVhbCBtYXRjaGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWF0Y2hlZCA9IGNvbmRlbnNlKHNldE1hdGNoZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBtYXRjaGVzIHRvIHJlc3VsdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2guYXBwbHkocmVzdWx0cywgc2V0TWF0Y2hlZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VlZGxlc3Mgc2V0IG1hdGNoZXMgc3VjY2VlZGluZyBtdWx0aXBsZSBzdWNjZXNzZnVsIG1hdGNoZXJzIHN0aXB1bGF0ZSBzb3J0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3V0ZXJtb3N0ICYmICFzZWVkICYmIHNldE1hdGNoZWQubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtYXRjaGVkQ291bnQgKyBzZXRNYXRjaGVycy5sZW5ndGgpID4gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXp6bGUudW5pcXVlU29ydChyZXN1bHRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3ZlcnJpZGUgbWFuaXB1bGF0aW9uIG9mIGdsb2JhbHMgYnkgbmVzdGVkIG1hdGNoZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdXRlcm1vc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJtb3N0Q29udGV4dCA9IGNvbnRleHRCYWNrdXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bm1hdGNoZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnlTZXQgP1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtGdW5jdGlvbihzdXBlck1hdGNoZXIpIDpcclxuICAgICAgICAgICAgICAgICAgICBzdXBlck1hdGNoZXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbXBpbGUgPSBTaXp6bGUuY29tcGlsZSA9IGZ1bmN0aW9uIChzZWxlY3RvciwgZ3JvdXAgLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSxcclxuICAgICAgICAgICAgICAgICAgICBzZXRNYXRjaGVycyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRNYXRjaGVycyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGVbc2VsZWN0b3IgKyBcIiBcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFjYWNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBHZW5lcmF0ZSBhIGZ1bmN0aW9uIG9mIHJlY3Vyc2l2ZSBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBjaGVjayBlYWNoIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwID0gdG9rZW5pemUoc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpID0gZ3JvdXAubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVkID0gbWF0Y2hlckZyb21Ub2tlbnMoZ3JvdXBbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGVkW2V4cGFuZG9dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNYXRjaGVycy5wdXNoKGNhY2hlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50TWF0Y2hlcnMucHVzaChjYWNoZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDYWNoZSB0aGUgY29tcGlsZWQgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICBjYWNoZWQgPSBjb21waWxlckNhY2hlKHNlbGVjdG9yLCBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlZDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG11bHRpcGxlQ29udGV4dHMoc2VsZWN0b3IsIGNvbnRleHRzLCByZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gY29udGV4dHMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIFNpenpsZShzZWxlY3RvciwgY29udGV4dHNbaV0sIHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdChzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGksIHRva2VucywgdG9rZW4sIHR5cGUsIGZpbmQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSB0b2tlbml6ZShzZWxlY3Rvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJ5IHRvIG1pbmltaXplIG9wZXJhdGlvbnMgaWYgdGhlcmUgaXMgb25seSBvbmUgZ3JvdXBcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gubGVuZ3RoID09PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUYWtlIGEgc2hvcnRjdXQgYW5kIHNldCB0aGUgY29udGV4dCBpZiB0aGUgcm9vdCBzZWxlY3RvciBpcyBhbiBJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMgPSBtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCA+IDIgJiYgKHRva2VuID0gdG9rZW5zWzBdKS50eXBlID09PSBcIklEXCIgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQuZ2V0QnlJZCAmJiBjb250ZXh0Lm5vZGVUeXBlID09PSA5ICYmIGRvY3VtZW50SXNIVE1MICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFeHByLnJlbGF0aXZlW3Rva2Vuc1sxXS50eXBlXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSAoRXhwci5maW5kW1wiSURcIl0odG9rZW4ubWF0Y2hlc1swXS5yZXBsYWNlKHJ1bmVzY2FwZSwgZnVuZXNjYXBlKSwgY29udGV4dCkgfHwgW10pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnNsaWNlKHRva2Vucy5zaGlmdCgpLnZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZldGNoIGEgc2VlZCBzZXQgZm9yIHJpZ2h0LXRvLWxlZnQgbWF0Y2hpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IG1hdGNoRXhwcltcIm5lZWRzQ29udGV4dFwiXS50ZXN0KHNlbGVjdG9yKSA/IDAgOiB0b2tlbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBYm9ydCBpZiB3ZSBoaXQgYSBjb21iaW5hdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoRXhwci5yZWxhdGl2ZVsodHlwZSA9IHRva2VuLnR5cGUpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChmaW5kID0gRXhwci5maW5kW3R5cGVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlYXJjaCwgZXhwYW5kaW5nIGNvbnRleHQgZm9yIGxlYWRpbmcgc2libGluZyBjb21iaW5hdG9yc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc2VlZCA9IGZpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5tYXRjaGVzWzBdLnJlcGxhY2UocnVuZXNjYXBlLCBmdW5lc2NhcGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnNpYmxpbmcudGVzdCh0b2tlbnNbMF0udHlwZSkgJiYgdGVzdENvbnRleHQoY29udGV4dC5wYXJlbnROb2RlKSB8fCBjb250ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBzZWVkIGlzIGVtcHR5IG9yIG5vIHRva2VucyByZW1haW4sIHdlIGNhbiByZXR1cm4gZWFybHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBzZWVkLmxlbmd0aCAmJiB0b1NlbGVjdG9yKHRva2Vucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2guYXBwbHkocmVzdWx0cywgc2VlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbXBpbGUgYW5kIGV4ZWN1dGUgYSBmaWx0ZXJpbmcgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIC8vIFByb3ZpZGUgYG1hdGNoYCB0byBhdm9pZCByZXRva2VuaXphdGlvbiBpZiB3ZSBtb2RpZmllZCB0aGUgc2VsZWN0b3IgYWJvdmVcclxuICAgICAgICAgICAgICAgIGNvbXBpbGUoc2VsZWN0b3IsIG1hdGNoKShcclxuICAgICAgICAgICAgICAgICAgICBzZWVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgIWRvY3VtZW50SXNIVE1MLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgcnNpYmxpbmcudGVzdChzZWxlY3RvcikgJiYgdGVzdENvbnRleHQoY29udGV4dC5wYXJlbnROb2RlKSB8fCBjb250ZXh0XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE9uZS10aW1lIGFzc2lnbm1lbnRzXHJcblxyXG4gICAgICAgICAgICAvLyBTb3J0IHN0YWJpbGl0eVxyXG4gICAgICAgICAgICBzdXBwb3J0LnNvcnRTdGFibGUgPSBleHBhbmRvLnNwbGl0KFwiXCIpLnNvcnQoc29ydE9yZGVyKS5qb2luKFwiXCIpID09PSBleHBhbmRvO1xyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogQ2hyb21lPDE0XHJcbiAgICAgICAgICAgIC8vIEFsd2F5cyBhc3N1bWUgZHVwbGljYXRlcyBpZiB0aGV5IGFyZW4ndCBwYXNzZWQgdG8gdGhlIGNvbXBhcmlzb24gZnVuY3Rpb25cclxuICAgICAgICAgICAgc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzID0gISFoYXNEdXBsaWNhdGU7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIGFnYWluc3QgdGhlIGRlZmF1bHQgZG9jdW1lbnRcclxuICAgICAgICAgICAgc2V0RG9jdW1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IFdlYmtpdDw1MzcuMzIgLSBTYWZhcmkgNi4wLjMvQ2hyb21lIDI1IChmaXhlZCBpbiBDaHJvbWUgMjcpXHJcbiAgICAgICAgICAgIC8vIERldGFjaGVkIG5vZGVzIGNvbmZvdW5kaW5nbHkgZm9sbG93ICplYWNoIG90aGVyKlxyXG4gICAgICAgICAgICBzdXBwb3J0LnNvcnREZXRhY2hlZCA9IGFzc2VydChmdW5jdGlvbiAoZGl2MSkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2hvdWxkIHJldHVybiAxLCBidXQgcmV0dXJucyA0IChmb2xsb3dpbmcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGl2MS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKSAmIDE7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OFxyXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGF0dHJpYnV0ZS9wcm9wZXJ0eSBcImludGVycG9sYXRpb25cIlxyXG4gICAgICAgICAgICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzY0MjklMjhWUy44NSUyOS5hc3B4XHJcbiAgICAgICAgICAgIGlmICghYXNzZXJ0KGZ1bmN0aW9uIChkaXYpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gXCI8YSBocmVmPScjJz48L2E+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpdi5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcImhyZWZcIikgPT09IFwiI1wiO1xyXG4gICAgICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgIGFkZEhhbmRsZShcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIiwgZnVuY3Rpb24gKGVsZW0sIG5hbWUsIGlzWE1MKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1hNTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUobmFtZSwgbmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInR5cGVcIiA/IDEgOiAyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgICAgICAvLyBVc2UgZGVmYXVsdFZhbHVlIGluIHBsYWNlIG9mIGdldEF0dHJpYnV0ZShcInZhbHVlXCIpXHJcbiAgICAgICAgICAgIGlmICghc3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFhc3NlcnQoZnVuY3Rpb24gKGRpdikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBcIjxpbnB1dC8+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpdi5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpID09PSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgIGFkZEhhbmRsZShcInZhbHVlXCIsIGZ1bmN0aW9uIChlbGVtLCBuYW1lLCBpc1hNTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNYTUwgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw5XHJcbiAgICAgICAgICAgIC8vIFVzZSBnZXRBdHRyaWJ1dGVOb2RlIHRvIGZldGNoIGJvb2xlYW5zIHdoZW4gZ2V0QXR0cmlidXRlIGxpZXNcclxuICAgICAgICAgICAgaWYgKCFhc3NlcnQoZnVuY3Rpb24gKGRpdikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkaXYuZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIikgPT0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRIYW5kbGUoYm9vbGVhbnMsIGZ1bmN0aW9uIChlbGVtLCBuYW1lLCBpc1hNTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1hNTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbVtuYW1lXSA9PT0gdHJ1ZSA/IG5hbWUudG9Mb3dlckNhc2UoKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpKSAmJiB2YWwuc3BlY2lmaWVkID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC52YWx1ZSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gU2l6emxlO1xyXG5cclxuICAgICAgICB9KSh3aW5kb3cpO1xyXG5cclxuXHJcblxyXG4gICAgalF1ZXJ5LmZpbmQgPSBTaXp6bGU7XHJcbiAgICBqUXVlcnkuZXhwciA9IFNpenpsZS5zZWxlY3RvcnM7XHJcbiAgICBqUXVlcnkuZXhwcltcIjpcIl0gPSBqUXVlcnkuZXhwci5wc2V1ZG9zO1xyXG4gICAgalF1ZXJ5LnVuaXF1ZSA9IFNpenpsZS51bmlxdWVTb3J0O1xyXG4gICAgalF1ZXJ5LnRleHQgPSBTaXp6bGUuZ2V0VGV4dDtcclxuICAgIGpRdWVyeS5pc1hNTERvYyA9IFNpenpsZS5pc1hNTDtcclxuICAgIGpRdWVyeS5jb250YWlucyA9IFNpenpsZS5jb250YWlucztcclxuXHJcblxyXG5cclxuICAgIHZhciBybmVlZHNDb250ZXh0ID0galF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0O1xyXG5cclxuICAgIHZhciByc2luZ2xlVGFnID0gKC9ePChcXHcrKVxccypcXC8/Pig/OjxcXC9cXDE+fCkkLyk7XHJcblxyXG5cclxuXHJcbiAgICB2YXIgcmlzU2ltcGxlID0gL14uW146I1xcW1xcLixdKiQvO1xyXG5cclxuICAgIC8vIEltcGxlbWVudCB0aGUgaWRlbnRpY2FsIGZ1bmN0aW9uYWxpdHkgZm9yIGZpbHRlciBhbmQgbm90XHJcbiAgICBmdW5jdGlvbiB3aW5ub3coZWxlbWVudHMsIHF1YWxpZmllciwgbm90KSB7XHJcbiAgICAgICAgaWYgKGpRdWVyeS5pc0Z1bmN0aW9uKHF1YWxpZmllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5ncmVwKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbSwgaSkge1xyXG4gICAgICAgICAgICAgICAgLyoganNoaW50IC1XMDE4ICovXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISFxdWFsaWZpZXIuY2FsbChlbGVtLCBpLCBlbGVtKSAhPT0gbm90O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocXVhbGlmaWVyLm5vZGVUeXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZ3JlcChlbGVtZW50cywgZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZWxlbSA9PT0gcXVhbGlmaWVyKSAhPT0gbm90O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHF1YWxpZmllciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBpZiAocmlzU2ltcGxlLnRlc3QocXVhbGlmaWVyKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5maWx0ZXIocXVhbGlmaWVyLCBlbGVtZW50cywgbm90KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcXVhbGlmaWVyID0galF1ZXJ5LmZpbHRlcihxdWFsaWZpZXIsIGVsZW1lbnRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBqUXVlcnkuZ3JlcChlbGVtZW50cywgZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIChqUXVlcnkuaW5BcnJheShlbGVtLCBxdWFsaWZpZXIpID49IDApICE9PSBub3Q7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgalF1ZXJ5LmZpbHRlciA9IGZ1bmN0aW9uIChleHByLCBlbGVtcywgbm90KSB7XHJcbiAgICAgICAgdmFyIGVsZW0gPSBlbGVtc1swXTtcclxuXHJcbiAgICAgICAgaWYgKG5vdCkge1xyXG4gICAgICAgICAgICBleHByID0gXCI6bm90KFwiICsgZXhwciArIFwiKVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1zLmxlbmd0aCA9PT0gMSAmJiBlbGVtLm5vZGVUeXBlID09PSAxID9cclxuICAgICAgICAgICAgalF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKGVsZW0sIGV4cHIpID8gW2VsZW1dIDogW10gOlxyXG4gICAgICAgICAgICBqUXVlcnkuZmluZC5tYXRjaGVzKGV4cHIsIGpRdWVyeS5ncmVwKGVsZW1zLCBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0ubm9kZVR5cGUgPT09IDE7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgZmluZDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICAgICAgcmV0ID0gW10sXHJcbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGxlbiA9IHNlbGYubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKGpRdWVyeShzZWxlY3RvcikuZmlsdGVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGpRdWVyeS5jb250YWlucyhzZWxmW2ldLCB0aGlzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LmZpbmQoc2VsZWN0b3IsIHNlbGZbaV0sIHJldCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE5lZWRlZCBiZWNhdXNlICQoIHNlbGVjdG9yLCBjb250ZXh0ICkgYmVjb21lcyAkKCBjb250ZXh0ICkuZmluZCggc2VsZWN0b3IgKVxyXG4gICAgICAgICAgICByZXQgPSB0aGlzLnB1c2hTdGFjayhsZW4gPiAxID8galF1ZXJ5LnVuaXF1ZShyZXQpIDogcmV0KTtcclxuICAgICAgICAgICAgcmV0LnNlbGVjdG9yID0gdGhpcy5zZWxlY3RvciA/IHRoaXMuc2VsZWN0b3IgKyBcIiBcIiArIHNlbGVjdG9yIDogc2VsZWN0b3I7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2sod2lubm93KHRoaXMsIHNlbGVjdG9yIHx8IFtdLCBmYWxzZSkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm90OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKHdpbm5vdyh0aGlzLCBzZWxlY3RvciB8fCBbXSwgdHJ1ZSkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXM6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gISF3aW5ub3coXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYSBwb3NpdGlvbmFsL3JlbGF0aXZlIHNlbGVjdG9yLCBjaGVjayBtZW1iZXJzaGlwIGluIHRoZSByZXR1cm5lZCBzZXRcclxuICAgICAgICAgICAgICAgIC8vIHNvICQoXCJwOmZpcnN0XCIpLmlzKFwicDpsYXN0XCIpIHdvbid0IHJldHVybiB0cnVlIGZvciBhIGRvYyB3aXRoIHR3byBcInBcIi5cclxuICAgICAgICAgICAgICAgIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiAmJiBybmVlZHNDb250ZXh0LnRlc3Qoc2VsZWN0b3IpID9cclxuICAgICAgICAgICAgICAgIGpRdWVyeShzZWxlY3RvcikgOlxyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgfHwgW10sXHJcbiAgICAgICAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICAgICApLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBhIGpRdWVyeSBvYmplY3RcclxuXHJcblxyXG4gICAgLy8gQSBjZW50cmFsIHJlZmVyZW5jZSB0byB0aGUgcm9vdCBqUXVlcnkoZG9jdW1lbnQpXHJcbiAgICB2YXIgcm9vdGpRdWVyeSxcclxuXHJcbiAgICAgICAgLy8gVXNlIHRoZSBjb3JyZWN0IGRvY3VtZW50IGFjY29yZGluZ2x5IHdpdGggd2luZG93IGFyZ3VtZW50IChzYW5kYm94KVxyXG4gICAgICAgIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50LFxyXG5cclxuICAgICAgICAvLyBBIHNpbXBsZSB3YXkgdG8gY2hlY2sgZm9yIEhUTUwgc3RyaW5nc1xyXG4gICAgICAgIC8vIFByaW9yaXRpemUgI2lkIG92ZXIgPHRhZz4gdG8gYXZvaWQgWFNTIHZpYSBsb2NhdGlvbi5oYXNoICgjOTUyMSlcclxuICAgICAgICAvLyBTdHJpY3QgSFRNTCByZWNvZ25pdGlvbiAoIzExMjkwOiBtdXN0IHN0YXJ0IHdpdGggPClcclxuICAgICAgICBycXVpY2tFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qfCMoW1xcdy1dKikpJC8sXHJcblxyXG4gICAgICAgIGluaXQgPSBqUXVlcnkuZm4uaW5pdCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2gsIGVsZW07XHJcblxyXG4gICAgICAgICAgICAvLyBIQU5ETEU6ICQoXCJcIiksICQobnVsbCksICQodW5kZWZpbmVkKSwgJChmYWxzZSlcclxuICAgICAgICAgICAgaWYgKCFzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEhhbmRsZSBIVE1MIHN0cmluZ3NcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yLmNoYXJBdCgwKSA9PT0gXCI8XCIgJiYgc2VsZWN0b3IuY2hhckF0KHNlbGVjdG9yLmxlbmd0aCAtIDEpID09PSBcIj5cIiAmJiBzZWxlY3Rvci5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFzc3VtZSB0aGF0IHN0cmluZ3MgdGhhdCBzdGFydCBhbmQgZW5kIHdpdGggPD4gYXJlIEhUTUwgYW5kIHNraXAgdGhlIHJlZ2V4IGNoZWNrXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBbbnVsbCwgc2VsZWN0b3IsIG51bGxdO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBycXVpY2tFeHByLmV4ZWMoc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1hdGNoIGh0bWwgb3IgbWFrZSBzdXJlIG5vIGNvbnRleHQgaXMgc3BlY2lmaWVkIGZvciAjaWRcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaCAmJiAobWF0Y2hbMV0gfHwgIWNvbnRleHQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhBTkRMRTogJChodG1sKSAtPiAkKGFycmF5KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dCBpbnN0YW5jZW9mIGpRdWVyeSA/IGNvbnRleHRbMF0gOiBjb250ZXh0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2NyaXB0cyBpcyB0cnVlIGZvciBiYWNrLWNvbXBhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnRlbnRpb25hbGx5IGxldCB0aGUgZXJyb3IgYmUgdGhyb3duIGlmIHBhcnNlSFRNTCBpcyBub3QgcHJlc2VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkubWVyZ2UodGhpcywgalF1ZXJ5LnBhcnNlSFRNTChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dCAmJiBjb250ZXh0Lm5vZGVUeXBlID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBkb2N1bWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBIQU5ETEU6ICQoaHRtbCwgcHJvcHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyc2luZ2xlVGFnLnRlc3QobWF0Y2hbMV0pICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KGNvbnRleHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKG1hdGNoIGluIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcm9wZXJ0aWVzIG9mIGNvbnRleHQgYXJlIGNhbGxlZCBhcyBtZXRob2RzIGlmIHBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGpRdWVyeS5pc0Z1bmN0aW9uKHRoaXNbbWF0Y2hdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW21hdGNoXShjb250ZXh0W21hdGNoXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuLi5hbmQgb3RoZXJ3aXNlIHNldCBhcyBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyKG1hdGNoLCBjb250ZXh0W21hdGNoXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhBTkRMRTogJCgjaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1hdGNoWzJdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHBhcmVudE5vZGUgdG8gY2F0Y2ggd2hlbiBCbGFja2JlcnJ5IDQuNiByZXR1cm5zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vZGVzIHRoYXQgYXJlIG5vIGxvbmdlciBpbiB0aGUgZG9jdW1lbnQgIzY5NjNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0gJiYgZWxlbS5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgSUUgYW5kIE9wZXJhIHJldHVybiBpdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnkgbmFtZSBpbnN0ZWFkIG9mIElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS5pZCAhPT0gbWF0Y2hbMl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm9vdGpRdWVyeS5maW5kKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIHdlIGluamVjdCB0aGUgZWxlbWVudCBkaXJlY3RseSBpbnRvIHRoZSBqUXVlcnkgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzWzBdID0gZWxlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBIQU5ETEU6ICQoZXhwciwgJCguLi4pKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghY29udGV4dCB8fCBjb250ZXh0LmpxdWVyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoY29udGV4dCB8fCByb290alF1ZXJ5KS5maW5kKHNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSEFORExFOiAkKGV4cHIsIGNvbnRleHQpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKHdoaWNoIGlzIGp1c3QgZXF1aXZhbGVudCB0bzogJChjb250ZXh0KS5maW5kKGV4cHIpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKGNvbnRleHQpLmZpbmQoc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEhBTkRMRTogJChET01FbGVtZW50KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yLm5vZGVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzWzBdID0gc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBIQU5ETEU6ICQoZnVuY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dCBmb3IgZG9jdW1lbnQgcmVhZHlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChqUXVlcnkuaXNGdW5jdGlvbihzZWxlY3RvcikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygcm9vdGpRdWVyeS5yZWFkeSAhPT0gXCJ1bmRlZmluZWRcIiA/XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdGpRdWVyeS5yZWFkeShzZWxlY3RvcikgOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgaW1tZWRpYXRlbHkgaWYgcmVhZHkgaXMgbm90IHByZXNlbnRcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcihqUXVlcnkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0b3Iuc2VsZWN0b3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yLnNlbGVjdG9yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gc2VsZWN0b3IuY29udGV4dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5tYWtlQXJyYXkoc2VsZWN0b3IsIHRoaXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgLy8gR2l2ZSB0aGUgaW5pdCBmdW5jdGlvbiB0aGUgalF1ZXJ5IHByb3RvdHlwZSBmb3IgbGF0ZXIgaW5zdGFudGlhdGlvblxyXG4gICAgaW5pdC5wcm90b3R5cGUgPSBqUXVlcnkuZm47XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBjZW50cmFsIHJlZmVyZW5jZVxyXG4gICAgcm9vdGpRdWVyeSA9IGpRdWVyeShkb2N1bWVudCk7XHJcblxyXG5cclxuICAgIHZhciBycGFyZW50c3ByZXYgPSAvXig/OnBhcmVudHN8cHJldig/OlVudGlsfEFsbCkpLyxcclxuICAgICAgICAvLyBtZXRob2RzIGd1YXJhbnRlZWQgdG8gcHJvZHVjZSBhIHVuaXF1ZSBzZXQgd2hlbiBzdGFydGluZyBmcm9tIGEgdW5pcXVlIHNldFxyXG4gICAgICAgIGd1YXJhbnRlZWRVbmlxdWUgPSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiB0cnVlLFxyXG4gICAgICAgICAgICBjb250ZW50czogdHJ1ZSxcclxuICAgICAgICAgICAgbmV4dDogdHJ1ZSxcclxuICAgICAgICAgICAgcHJldjogdHJ1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZCh7XHJcbiAgICAgICAgZGlyOiBmdW5jdGlvbiAoZWxlbSwgZGlyLCB1bnRpbCkge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hlZCA9IFtdLFxyXG4gICAgICAgICAgICAgICAgY3VyID0gZWxlbVtkaXJdO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGN1ciAmJiBjdXIubm9kZVR5cGUgIT09IDkgJiYgKHVudGlsID09PSB1bmRlZmluZWQgfHwgY3VyLm5vZGVUeXBlICE9PSAxIHx8ICFqUXVlcnkoY3VyKS5pcyh1bnRpbCkpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VyLm5vZGVUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKGN1cik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdXIgPSBjdXJbZGlyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlZDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaWJsaW5nOiBmdW5jdGlvbiAobiwgZWxlbSkge1xyXG4gICAgICAgICAgICB2YXIgciA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICg7IG47IG4gPSBuLm5leHRTaWJsaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobi5ub2RlVHlwZSA9PT0gMSAmJiBuICE9PSBlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgci5wdXNoKG4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkuZm4uZXh0ZW5kKHtcclxuICAgICAgICBoYXM6IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRzID0galF1ZXJ5KHRhcmdldCwgdGhpcyksXHJcbiAgICAgICAgICAgICAgICBsZW4gPSB0YXJnZXRzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoalF1ZXJ5LmNvbnRhaW5zKHRoaXMsIHRhcmdldHNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xvc2VzdDogZnVuY3Rpb24gKHNlbGVjdG9ycywgY29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgY3VyLFxyXG4gICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBsID0gdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBtYXRjaGVkID0gW10sXHJcbiAgICAgICAgICAgICAgICBwb3MgPSBybmVlZHNDb250ZXh0LnRlc3Qoc2VsZWN0b3JzKSB8fCB0eXBlb2Ygc2VsZWN0b3JzICE9PSBcInN0cmluZ1wiID9cclxuICAgICAgICAgICAgICAgIGpRdWVyeShzZWxlY3RvcnMsIGNvbnRleHQgfHwgdGhpcy5jb250ZXh0KSA6XHJcbiAgICAgICAgICAgICAgICAwO1xyXG5cclxuICAgICAgICAgICAgZm9yICg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY3VyID0gdGhpc1tpXTsgY3VyICYmIGN1ciAhPT0gY29udGV4dDsgY3VyID0gY3VyLnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBbHdheXMgc2tpcCBkb2N1bWVudCBmcmFnbWVudHNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyLm5vZGVUeXBlIDwgMTEgJiYgKHBvcyA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MuaW5kZXgoY3VyKSA+IC0xIDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBwYXNzIG5vbi1lbGVtZW50cyB0byBTaXp6bGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ci5ub2RlVHlwZSA9PT0gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKGN1ciwgc2VsZWN0b3JzKSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWQucHVzaChjdXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayhtYXRjaGVkLmxlbmd0aCA+IDEgPyBqUXVlcnkudW5pcXVlKG1hdGNoZWQpIDogbWF0Y2hlZCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHdpdGhpblxyXG4gICAgICAgIC8vIHRoZSBtYXRjaGVkIHNldCBvZiBlbGVtZW50c1xyXG4gICAgICAgIGluZGV4OiBmdW5jdGlvbiAoZWxlbSkge1xyXG5cclxuICAgICAgICAgICAgLy8gTm8gYXJndW1lbnQsIHJldHVybiBpbmRleCBpbiBwYXJlbnRcclxuICAgICAgICAgICAgaWYgKCFlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXNbMF0gJiYgdGhpc1swXS5wYXJlbnROb2RlKSA/IHRoaXMuZmlyc3QoKS5wcmV2QWxsKCkubGVuZ3RoIDogLTE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGluZGV4IGluIHNlbGVjdG9yXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlbSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5pbkFycmF5KHRoaXNbMF0sIGpRdWVyeShlbGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExvY2F0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRlc2lyZWQgZWxlbWVudFxyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmluQXJyYXkoXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpdCByZWNlaXZlcyBhIGpRdWVyeSBvYmplY3QsIHRoZSBmaXJzdCBlbGVtZW50IGlzIHVzZWRcclxuICAgICAgICAgICAgICAgIGVsZW0uanF1ZXJ5ID8gZWxlbVswXSA6IGVsZW0sIHRoaXMpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZDogZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayhcclxuICAgICAgICAgICAgICAgIGpRdWVyeS51bmlxdWUoXHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKHRoaXMuZ2V0KCksIGpRdWVyeShzZWxlY3RvciwgY29udGV4dCkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkQmFjazogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZChzZWxlY3RvciA9PSBudWxsID9cclxuICAgICAgICAgICAgICAgIHRoaXMucHJldk9iamVjdCA6IHRoaXMucHJldk9iamVjdC5maWx0ZXIoc2VsZWN0b3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2libGluZyhjdXIsIGRpcikge1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgY3VyID0gY3VyW2Rpcl07XHJcbiAgICAgICAgfSB3aGlsZSAoY3VyICYmIGN1ci5ub2RlVHlwZSAhPT0gMSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXI7XHJcbiAgICB9XHJcblxyXG4gICAgalF1ZXJ5LmVhY2goe1xyXG4gICAgICAgIHBhcmVudDogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IDExID8gcGFyZW50IDogbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmVudHM6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZGlyKGVsZW0sIFwicGFyZW50Tm9kZVwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmVudHNVbnRpbDogZnVuY3Rpb24gKGVsZW0sIGksIHVudGlsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZGlyKGVsZW0sIFwicGFyZW50Tm9kZVwiLCB1bnRpbCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2libGluZyhlbGVtLCBcIm5leHRTaWJsaW5nXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJldjogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNpYmxpbmcoZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBuZXh0QWxsOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmRpcihlbGVtLCBcIm5leHRTaWJsaW5nXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJldkFsbDogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5kaXIoZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBuZXh0VW50aWw6IGZ1bmN0aW9uIChlbGVtLCBpLCB1bnRpbCkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmRpcihlbGVtLCBcIm5leHRTaWJsaW5nXCIsIHVudGlsKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByZXZVbnRpbDogZnVuY3Rpb24gKGVsZW0sIGksIHVudGlsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZGlyKGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIsIHVudGlsKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNpYmxpbmdzOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LnNpYmxpbmcoKGVsZW0ucGFyZW50Tm9kZSB8fCB7fSkuZmlyc3RDaGlsZCwgZWxlbSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGlsZHJlbjogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5zaWJsaW5nKGVsZW0uZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250ZW50czogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5ub2RlTmFtZShlbGVtLCBcImlmcmFtZVwiKSA/XHJcbiAgICAgICAgICAgICAgICBlbGVtLmNvbnRlbnREb2N1bWVudCB8fCBlbGVtLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQgOlxyXG4gICAgICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKFtdLCBlbGVtLmNoaWxkTm9kZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIGZ1bmN0aW9uIChuYW1lLCBmbikge1xyXG4gICAgICAgIGpRdWVyeS5mbltuYW1lXSA9IGZ1bmN0aW9uICh1bnRpbCwgc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgdmFyIHJldCA9IGpRdWVyeS5tYXAodGhpcywgZm4sIHVudGlsKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuYW1lLnNsaWNlKC01KSAhPT0gXCJVbnRpbFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHVudGlsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0b3IgJiYgdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBqUXVlcnkuZmlsdGVyKHNlbGVjdG9yLCByZXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlc1xyXG4gICAgICAgICAgICAgICAgaWYgKCFndWFyYW50ZWVkVW5pcXVlW25hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0galF1ZXJ5LnVuaXF1ZShyZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldmVyc2Ugb3JkZXIgZm9yIHBhcmVudHMqIGFuZCBwcmV2LWRlcml2YXRpdmVzXHJcbiAgICAgICAgICAgICAgICBpZiAocnBhcmVudHNwcmV2LnRlc3QobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSByZXQucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2socmV0KTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICB2YXIgcm5vdHdoaXRlID0gKC9cXFMrL2cpO1xyXG5cclxuXHJcblxyXG4gICAgLy8gU3RyaW5nIHRvIE9iamVjdCBvcHRpb25zIGZvcm1hdCBjYWNoZVxyXG4gICAgdmFyIG9wdGlvbnNDYWNoZSA9IHt9O1xyXG5cclxuICAgIC8vIENvbnZlcnQgU3RyaW5nLWZvcm1hdHRlZCBvcHRpb25zIGludG8gT2JqZWN0LWZvcm1hdHRlZCBvbmVzIGFuZCBzdG9yZSBpbiBjYWNoZVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyhvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIG9iamVjdCA9IG9wdGlvbnNDYWNoZVtvcHRpb25zXSA9IHt9O1xyXG4gICAgICAgIGpRdWVyeS5lYWNoKG9wdGlvbnMubWF0Y2gocm5vdHdoaXRlKSB8fCBbXSwgZnVuY3Rpb24gKF8sIGZsYWcpIHtcclxuICAgICAgICAgICAgb2JqZWN0W2ZsYWddID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBDcmVhdGUgYSBjYWxsYmFjayBsaXN0IHVzaW5nIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcclxuICAgICAqXHJcbiAgICAgKlx0b3B0aW9uczogYW4gb3B0aW9uYWwgbGlzdCBvZiBzcGFjZS1zZXBhcmF0ZWQgb3B0aW9ucyB0aGF0IHdpbGwgY2hhbmdlIGhvd1xyXG4gICAgICpcdFx0XHR0aGUgY2FsbGJhY2sgbGlzdCBiZWhhdmVzIG9yIGEgbW9yZSB0cmFkaXRpb25hbCBvcHRpb24gb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQnkgZGVmYXVsdCBhIGNhbGxiYWNrIGxpc3Qgd2lsbCBhY3QgbGlrZSBhbiBldmVudCBjYWxsYmFjayBsaXN0IGFuZCBjYW4gYmVcclxuICAgICAqIFwiZmlyZWRcIiBtdWx0aXBsZSB0aW1lcy5cclxuICAgICAqXHJcbiAgICAgKiBQb3NzaWJsZSBvcHRpb25zOlxyXG4gICAgICpcclxuICAgICAqXHRvbmNlOlx0XHRcdHdpbGwgZW5zdXJlIHRoZSBjYWxsYmFjayBsaXN0IGNhbiBvbmx5IGJlIGZpcmVkIG9uY2UgKGxpa2UgYSBEZWZlcnJlZClcclxuICAgICAqXHJcbiAgICAgKlx0bWVtb3J5Olx0XHRcdHdpbGwga2VlcCB0cmFjayBvZiBwcmV2aW91cyB2YWx1ZXMgYW5kIHdpbGwgY2FsbCBhbnkgY2FsbGJhY2sgYWRkZWRcclxuICAgICAqXHRcdFx0XHRcdGFmdGVyIHRoZSBsaXN0IGhhcyBiZWVuIGZpcmVkIHJpZ2h0IGF3YXkgd2l0aCB0aGUgbGF0ZXN0IFwibWVtb3JpemVkXCJcclxuICAgICAqXHRcdFx0XHRcdHZhbHVlcyAobGlrZSBhIERlZmVycmVkKVxyXG4gICAgICpcclxuICAgICAqXHR1bmlxdWU6XHRcdFx0d2lsbCBlbnN1cmUgYSBjYWxsYmFjayBjYW4gb25seSBiZSBhZGRlZCBvbmNlIChubyBkdXBsaWNhdGUgaW4gdGhlIGxpc3QpXHJcbiAgICAgKlxyXG4gICAgICpcdHN0b3BPbkZhbHNlOlx0aW50ZXJydXB0IGNhbGxpbmdzIHdoZW4gYSBjYWxsYmFjayByZXR1cm5zIGZhbHNlXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBqUXVlcnkuQ2FsbGJhY2tzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBvcHRpb25zIGZyb20gU3RyaW5nLWZvcm1hdHRlZCB0byBPYmplY3QtZm9ybWF0dGVkIGlmIG5lZWRlZFxyXG4gICAgICAgIC8vICh3ZSBjaGVjayBpbiBjYWNoZSBmaXJzdClcclxuICAgICAgICBvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgP1xyXG4gICAgICAgICAgICAob3B0aW9uc0NhY2hlW29wdGlvbnNdIHx8IGNyZWF0ZU9wdGlvbnMob3B0aW9ucykpIDpcclxuICAgICAgICAgICAgalF1ZXJ5LmV4dGVuZCh7fSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHZhciAvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCBpcyBjdXJyZW50bHkgZmlyaW5nXHJcbiAgICAgICAgICAgIGZpcmluZyxcclxuICAgICAgICAgICAgLy8gTGFzdCBmaXJlIHZhbHVlIChmb3Igbm9uLWZvcmdldHRhYmxlIGxpc3RzKVxyXG4gICAgICAgICAgICBtZW1vcnksXHJcbiAgICAgICAgICAgIC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IHdhcyBhbHJlYWR5IGZpcmVkXHJcbiAgICAgICAgICAgIGZpcmVkLFxyXG4gICAgICAgICAgICAvLyBFbmQgb2YgdGhlIGxvb3Agd2hlbiBmaXJpbmdcclxuICAgICAgICAgICAgZmlyaW5nTGVuZ3RoLFxyXG4gICAgICAgICAgICAvLyBJbmRleCBvZiBjdXJyZW50bHkgZmlyaW5nIGNhbGxiYWNrIChtb2RpZmllZCBieSByZW1vdmUgaWYgbmVlZGVkKVxyXG4gICAgICAgICAgICBmaXJpbmdJbmRleCxcclxuICAgICAgICAgICAgLy8gRmlyc3QgY2FsbGJhY2sgdG8gZmlyZSAodXNlZCBpbnRlcm5hbGx5IGJ5IGFkZCBhbmQgZmlyZVdpdGgpXHJcbiAgICAgICAgICAgIGZpcmluZ1N0YXJ0LFxyXG4gICAgICAgICAgICAvLyBBY3R1YWwgY2FsbGJhY2sgbGlzdFxyXG4gICAgICAgICAgICBsaXN0ID0gW10sXHJcbiAgICAgICAgICAgIC8vIFN0YWNrIG9mIGZpcmUgY2FsbHMgZm9yIHJlcGVhdGFibGUgbGlzdHNcclxuICAgICAgICAgICAgc3RhY2sgPSAhb3B0aW9ucy5vbmNlICYmIFtdLFxyXG4gICAgICAgICAgICAvLyBGaXJlIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICBmaXJlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIG1lbW9yeSA9IG9wdGlvbnMubWVtb3J5ICYmIGRhdGE7XHJcbiAgICAgICAgICAgICAgICBmaXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmaXJpbmdJbmRleCA9IGZpcmluZ1N0YXJ0IHx8IDA7XHJcbiAgICAgICAgICAgICAgICBmaXJpbmdTdGFydCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmaXJpbmdMZW5ndGggPSBsaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZpcmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmb3IgKDsgbGlzdCAmJiBmaXJpbmdJbmRleCA8IGZpcmluZ0xlbmd0aDsgZmlyaW5nSW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0W2ZpcmluZ0luZGV4XS5hcHBseShkYXRhWzBdLCBkYXRhWzFdKSA9PT0gZmFsc2UgJiYgb3B0aW9ucy5zdG9wT25GYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW1vcnkgPSBmYWxzZTsgLy8gVG8gcHJldmVudCBmdXJ0aGVyIGNhbGxzIHVzaW5nIGFkZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmaXJpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmUoc3RhY2suc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1lbW9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBBY3R1YWwgQ2FsbGJhY2tzIG9iamVjdFxyXG4gICAgICAgICAgICBzZWxmID0ge1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIGEgY2FsbGJhY2sgb3IgYSBjb2xsZWN0aW9uIG9mIGNhbGxiYWNrcyB0byB0aGUgbGlzdFxyXG4gICAgICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlyc3QsIHdlIHNhdmUgdGhlIGN1cnJlbnQgbGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGFydCA9IGxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gYWRkKGFyZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5lYWNoKGFyZ3MsIGZ1bmN0aW9uIChfLCBhcmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IGpRdWVyeS50eXBlKGFyZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMudW5pcXVlIHx8ICFzZWxmLmhhcyhhcmcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2goYXJnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnICYmIGFyZy5sZW5ndGggJiYgdHlwZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnNwZWN0IHJlY3Vyc2l2ZWx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZChhcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KShhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyB3ZSBuZWVkIHRvIGFkZCB0aGUgY2FsbGJhY2tzIHRvIHRoZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXJyZW50IGZpcmluZyBiYXRjaD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyaW5nTGVuZ3RoID0gbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXaXRoIG1lbW9yeSwgaWYgd2UncmUgbm90IGZpcmluZyB0aGVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBzaG91bGQgY2FsbCByaWdodCBhd2F5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWVtb3J5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJpbmdTdGFydCA9IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZShtZW1vcnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBhIGNhbGxiYWNrIGZyb20gdGhlIGxpc3RcclxuICAgICAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5lYWNoKGFyZ3VtZW50cywgZnVuY3Rpb24gKF8sIGFyZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChpbmRleCA9IGpRdWVyeS5pbkFycmF5KGFyZywgbGlzdCwgaW5kZXgpKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBmaXJpbmcgaW5kZXhlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IDw9IGZpcmluZ0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyaW5nTGVuZ3RoLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IDw9IGZpcmluZ0luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJpbmdJbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYSBnaXZlbiBjYWxsYmFjayBpcyBpbiB0aGUgbGlzdC5cclxuICAgICAgICAgICAgICAgIC8vIElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCByZXR1cm4gd2hldGhlciBvciBub3QgbGlzdCBoYXMgY2FsbGJhY2tzIGF0dGFjaGVkLlxyXG4gICAgICAgICAgICAgICAgaGFzOiBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4gPyBqUXVlcnkuaW5BcnJheShmbiwgbGlzdCkgPiAtMSA6ICEhKGxpc3QgJiYgbGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgY2FsbGJhY2tzIGZyb20gdGhlIGxpc3RcclxuICAgICAgICAgICAgICAgIGVtcHR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmluZ0xlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gSGF2ZSB0aGUgbGlzdCBkbyBub3RoaW5nIGFueW1vcmVcclxuICAgICAgICAgICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gc3RhY2sgPSBtZW1vcnkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gSXMgaXQgZGlzYWJsZWQ/XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhbGlzdDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBMb2NrIHRoZSBsaXN0IGluIGl0cyBjdXJyZW50IHN0YXRlXHJcbiAgICAgICAgICAgICAgICBsb2NrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtZW1vcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIElzIGl0IGxvY2tlZD9cclxuICAgICAgICAgICAgICAgIGxvY2tlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhc3RhY2s7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gQ2FsbCBhbGwgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGNvbnRleHQgYW5kIGFyZ3VtZW50c1xyXG4gICAgICAgICAgICAgICAgZmlyZVdpdGg6IGZ1bmN0aW9uIChjb250ZXh0LCBhcmdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QgJiYgKCFmaXJlZCB8fCBzdGFjaykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3MgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBbY29udGV4dCwgYXJncy5zbGljZSA/IGFyZ3Muc2xpY2UoKSA6IGFyZ3NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZShhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBDYWxsIGFsbCB0aGUgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50c1xyXG4gICAgICAgICAgICAgICAgZmlyZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmlyZVdpdGgodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBUbyBrbm93IGlmIHRoZSBjYWxsYmFja3MgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2VcclxuICAgICAgICAgICAgICAgIGZpcmVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhZmlyZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZCh7XHJcblxyXG4gICAgICAgIERlZmVycmVkOiBmdW5jdGlvbiAoZnVuYykge1xyXG4gICAgICAgICAgICB2YXIgdHVwbGVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFjdGlvbiwgYWRkIGxpc3RlbmVyLCBsaXN0ZW5lciBsaXN0LCBmaW5hbCBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIFtcInJlc29sdmVcIiwgXCJkb25lXCIsIGpRdWVyeS5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKSwgXCJyZXNvbHZlZFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBbXCJyZWplY3RcIiwgXCJmYWlsXCIsIGpRdWVyeS5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKSwgXCJyZWplY3RlZFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBbXCJub3RpZnlcIiwgXCJwcm9ncmVzc1wiLCBqUXVlcnkuQ2FsbGJhY2tzKFwibWVtb3J5XCIpXVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gXCJwZW5kaW5nXCIsXHJcbiAgICAgICAgICAgICAgICBwcm9taXNlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFsd2F5czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5kb25lKGFyZ3VtZW50cykuZmFpbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoZW46IGZ1bmN0aW9uICggLyogZm5Eb25lLCBmbkZhaWwsIGZuUHJvZ3Jlc3MgKi8gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmbnMgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqUXVlcnkuRGVmZXJyZWQoZnVuY3Rpb24gKG5ld0RlZmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZWFjaCh0dXBsZXMsIGZ1bmN0aW9uIChpLCB0dXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKGZuc1tpXSkgJiYgZm5zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmVycmVkWyBkb25lIHwgZmFpbCB8IHByb2dyZXNzIF0gZm9yIGZvcndhcmRpbmcgYWN0aW9ucyB0byBuZXdEZWZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkW3R1cGxlWzFdXShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5lZCA9IGZuICYmIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5lZCAmJiBqUXVlcnkuaXNGdW5jdGlvbihyZXR1cm5lZC5wcm9taXNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuZWQucHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUobmV3RGVmZXIucmVzb2x2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChuZXdEZWZlci5yZWplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb2dyZXNzKG5ld0RlZmVyLm5vdGlmeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdEZWZlclt0dXBsZVswXSArIFwiV2l0aFwiXSh0aGlzID09PSBwcm9taXNlID8gbmV3RGVmZXIucHJvbWlzZSgpIDogdGhpcywgZm4gPyBbcmV0dXJuZWRdIDogYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbnMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgYSBwcm9taXNlIGZvciB0aGlzIGRlZmVycmVkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgb2JqIGlzIHByb3ZpZGVkLCB0aGUgcHJvbWlzZSBhc3BlY3QgaXMgYWRkZWQgdG8gdGhlIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2U6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iaiAhPSBudWxsID8galF1ZXJ5LmV4dGVuZChvYmosIHByb21pc2UpIDogcHJvbWlzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIC8vIEtlZXAgcGlwZSBmb3IgYmFjay1jb21wYXRcclxuICAgICAgICAgICAgcHJvbWlzZS5waXBlID0gcHJvbWlzZS50aGVuO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIGxpc3Qtc3BlY2lmaWMgbWV0aG9kc1xyXG4gICAgICAgICAgICBqUXVlcnkuZWFjaCh0dXBsZXMsIGZ1bmN0aW9uIChpLCB0dXBsZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3QgPSB0dXBsZVsyXSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZVN0cmluZyA9IHR1cGxlWzNdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHByb21pc2VbIGRvbmUgfCBmYWlsIHwgcHJvZ3Jlc3MgXSA9IGxpc3QuYWRkXHJcbiAgICAgICAgICAgICAgICBwcm9taXNlW3R1cGxlWzFdXSA9IGxpc3QuYWRkO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5hZGQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGF0ZSA9IFsgcmVzb2x2ZWQgfCByZWplY3RlZCBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gc3RhdGVTdHJpbmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBbIHJlamVjdF9saXN0IHwgcmVzb2x2ZV9saXN0IF0uZGlzYWJsZTsgcHJvZ3Jlc3NfbGlzdC5sb2NrXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdHVwbGVzW2kgXiAxXVsyXS5kaXNhYmxlLCB0dXBsZXNbMl1bMl0ubG9jayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZGVmZXJyZWRbIHJlc29sdmUgfCByZWplY3QgfCBub3RpZnkgXVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWRbdHVwbGVbMF1dID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkW3R1cGxlWzBdICsgXCJXaXRoXCJdKHRoaXMgPT09IGRlZmVycmVkID8gcHJvbWlzZSA6IHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWRbdHVwbGVbMF0gKyBcIldpdGhcIl0gPSBsaXN0LmZpcmVXaXRoO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2UgdGhlIGRlZmVycmVkIGEgcHJvbWlzZVxyXG4gICAgICAgICAgICBwcm9taXNlLnByb21pc2UoZGVmZXJyZWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsbCBnaXZlbiBmdW5jIGlmIGFueVxyXG4gICAgICAgICAgICBpZiAoZnVuYykge1xyXG4gICAgICAgICAgICAgICAgZnVuYy5jYWxsKGRlZmVycmVkLCBkZWZlcnJlZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFsbCBkb25lIVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRGVmZXJyZWQgaGVscGVyXHJcbiAgICAgICAgd2hlbjogZnVuY3Rpb24gKHN1Ym9yZGluYXRlIC8qICwgLi4uLCBzdWJvcmRpbmF0ZU4gKi8gKSB7XHJcbiAgICAgICAgICAgIHZhciBpID0gMCxcclxuICAgICAgICAgICAgICAgIHJlc29sdmVWYWx1ZXMgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyksXHJcbiAgICAgICAgICAgICAgICBsZW5ndGggPSByZXNvbHZlVmFsdWVzLmxlbmd0aCxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgY291bnQgb2YgdW5jb21wbGV0ZWQgc3Vib3JkaW5hdGVzXHJcbiAgICAgICAgICAgICAgICByZW1haW5pbmcgPSBsZW5ndGggIT09IDEgfHwgKHN1Ym9yZGluYXRlICYmIGpRdWVyeS5pc0Z1bmN0aW9uKHN1Ym9yZGluYXRlLnByb21pc2UpKSA/IGxlbmd0aCA6IDAsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIG1hc3RlciBEZWZlcnJlZC4gSWYgcmVzb2x2ZVZhbHVlcyBjb25zaXN0IG9mIG9ubHkgYSBzaW5nbGUgRGVmZXJyZWQsIGp1c3QgdXNlIHRoYXQuXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZCA9IHJlbWFpbmluZyA9PT0gMSA/IHN1Ym9yZGluYXRlIDogalF1ZXJ5LkRlZmVycmVkKCksXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIGZ1bmN0aW9uIGZvciBib3RoIHJlc29sdmUgYW5kIHByb2dyZXNzIHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlRnVuYyA9IGZ1bmN0aW9uIChpLCBjb250ZXh0cywgdmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0c1tpXSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlc1tpXSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gc2xpY2UuY2FsbChhcmd1bWVudHMpIDogdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMgPT09IHByb2dyZXNzVmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5ub3RpZnlXaXRoKGNvbnRleHRzLCB2YWx1ZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghKC0tcmVtYWluaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgoY29udGV4dHMsIHZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1ZhbHVlcywgcHJvZ3Jlc3NDb250ZXh0cywgcmVzb2x2ZUNvbnRleHRzO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIGxpc3RlbmVycyB0byBEZWZlcnJlZCBzdWJvcmRpbmF0ZXM7IHRyZWF0IG90aGVycyBhcyByZXNvbHZlZFxyXG4gICAgICAgICAgICBpZiAobGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NWYWx1ZXMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzQ29udGV4dHMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmVDb250ZXh0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlVmFsdWVzW2ldICYmIGpRdWVyeS5pc0Z1bmN0aW9uKHJlc29sdmVWYWx1ZXNbaV0ucHJvbWlzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZVZhbHVlc1tpXS5wcm9taXNlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKHVwZGF0ZUZ1bmMoaSwgcmVzb2x2ZUNvbnRleHRzLCByZXNvbHZlVmFsdWVzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGRlZmVycmVkLnJlamVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9ncmVzcyh1cGRhdGVGdW5jKGksIHByb2dyZXNzQ29udGV4dHMsIHByb2dyZXNzVmFsdWVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLS1yZW1haW5pbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB3ZSdyZSBub3Qgd2FpdGluZyBvbiBhbnl0aGluZywgcmVzb2x2ZSB0aGUgbWFzdGVyXHJcbiAgICAgICAgICAgIGlmICghcmVtYWluaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aChyZXNvbHZlQ29udGV4dHMsIHJlc29sdmVWYWx1ZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyBUaGUgZGVmZXJyZWQgdXNlZCBvbiBET00gcmVhZHlcclxuICAgIHZhciByZWFkeUxpc3Q7XHJcblxyXG4gICAgalF1ZXJ5LmZuLnJlYWR5ID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgICAgLy8gQWRkIHRoZSBjYWxsYmFja1xyXG4gICAgICAgIGpRdWVyeS5yZWFkeS5wcm9taXNlKCkuZG9uZShmbik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBqUXVlcnkuZXh0ZW5kKHtcclxuICAgICAgICAvLyBJcyB0aGUgRE9NIHJlYWR5IHRvIGJlIHVzZWQ/IFNldCB0byB0cnVlIG9uY2UgaXQgb2NjdXJzLlxyXG4gICAgICAgIGlzUmVhZHk6IGZhbHNlLFxyXG5cclxuICAgICAgICAvLyBBIGNvdW50ZXIgdG8gdHJhY2sgaG93IG1hbnkgaXRlbXMgdG8gd2FpdCBmb3IgYmVmb3JlXHJcbiAgICAgICAgLy8gdGhlIHJlYWR5IGV2ZW50IGZpcmVzLiBTZWUgIzY3ODFcclxuICAgICAgICByZWFkeVdhaXQ6IDEsXHJcblxyXG4gICAgICAgIC8vIEhvbGQgKG9yIHJlbGVhc2UpIHRoZSByZWFkeSBldmVudFxyXG4gICAgICAgIGhvbGRSZWFkeTogZnVuY3Rpb24gKGhvbGQpIHtcclxuICAgICAgICAgICAgaWYgKGhvbGQpIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5yZWFkeVdhaXQrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5yZWFkeSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSB3aGVuIHRoZSBET00gaXMgcmVhZHlcclxuICAgICAgICByZWFkeTogZnVuY3Rpb24gKHdhaXQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEFib3J0IGlmIHRoZXJlIGFyZSBwZW5kaW5nIGhvbGRzIG9yIHdlJ3JlIGFscmVhZHkgcmVhZHlcclxuICAgICAgICAgICAgaWYgKHdhaXQgPT09IHRydWUgPyAtLWpRdWVyeS5yZWFkeVdhaXQgOiBqUXVlcnkuaXNSZWFkeSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgYm9keSBleGlzdHMsIGF0IGxlYXN0LCBpbiBjYXNlIElFIGdldHMgYSBsaXR0bGUgb3ZlcnplYWxvdXMgKHRpY2tldCAjNTQ0MykuXHJcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoalF1ZXJ5LnJlYWR5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhhdCB0aGUgRE9NIGlzIHJlYWR5XHJcbiAgICAgICAgICAgIGpRdWVyeS5pc1JlYWR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGEgbm9ybWFsIERPTSBSZWFkeSBldmVudCBmaXJlZCwgZGVjcmVtZW50LCBhbmQgd2FpdCBpZiBuZWVkIGJlXHJcbiAgICAgICAgICAgIGlmICh3YWl0ICE9PSB0cnVlICYmIC0talF1ZXJ5LnJlYWR5V2FpdCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIGZ1bmN0aW9ucyBib3VuZCwgdG8gZXhlY3V0ZVxyXG4gICAgICAgICAgICByZWFkeUxpc3QucmVzb2x2ZVdpdGgoZG9jdW1lbnQsIFtqUXVlcnldKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRyaWdnZXIgYW55IGJvdW5kIHJlYWR5IGV2ZW50c1xyXG4gICAgICAgICAgICBpZiAoalF1ZXJ5LmZuLnRyaWdnZXIpIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeShkb2N1bWVudCkudHJpZ2dlcihcInJlYWR5XCIpLm9mZihcInJlYWR5XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhbi11cCBtZXRob2QgZm9yIGRvbSByZWFkeSBldmVudHNcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZGV0YWNoKCkge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgY29tcGxldGVkLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRldGFjaEV2ZW50KFwib25yZWFkeXN0YXRlY2hhbmdlXCIsIGNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5kZXRhY2hFdmVudChcIm9ubG9hZFwiLCBjb21wbGV0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSByZWFkeSBldmVudCBoYW5kbGVyIGFuZCBzZWxmIGNsZWFudXAgbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNvbXBsZXRlZCgpIHtcclxuICAgICAgICAvLyByZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgaXMgZ29vZCBlbm91Z2ggZm9yIHVzIHRvIGNhbGwgdGhlIGRvbSByZWFkeSBpbiBvbGRJRVxyXG4gICAgICAgIGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyIHx8IGV2ZW50LnR5cGUgPT09IFwibG9hZFwiIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xyXG4gICAgICAgICAgICBkZXRhY2goKTtcclxuICAgICAgICAgICAgalF1ZXJ5LnJlYWR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeS5yZWFkeS5wcm9taXNlID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIGlmICghcmVhZHlMaXN0KSB7XHJcblxyXG4gICAgICAgICAgICByZWFkeUxpc3QgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENhdGNoIGNhc2VzIHdoZXJlICQoZG9jdW1lbnQpLnJlYWR5KCkgaXMgY2FsbGVkIGFmdGVyIHRoZSBicm93c2VyIGV2ZW50IGhhcyBhbHJlYWR5IG9jY3VycmVkLlxyXG4gICAgICAgICAgICAvLyB3ZSBvbmNlIHRyaWVkIHRvIHVzZSByZWFkeVN0YXRlIFwiaW50ZXJhY3RpdmVcIiBoZXJlLCBidXQgaXQgY2F1c2VkIGlzc3VlcyBsaWtlIHRoZSBvbmVcclxuICAgICAgICAgICAgLy8gZGlzY292ZXJlZCBieSBDaHJpc1MgaGVyZTogaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTIyODIjY29tbWVudDoxNVxyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgaXQgYXN5bmNocm9ub3VzbHkgdG8gYWxsb3cgc2NyaXB0cyB0aGUgb3Bwb3J0dW5pdHkgdG8gZGVsYXkgcmVhZHlcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoalF1ZXJ5LnJlYWR5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdGFuZGFyZHMtYmFzZWQgYnJvd3NlcnMgc3VwcG9ydCBET01Db250ZW50TG9hZGVkXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBoYW5keSBldmVudCBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQSBmYWxsYmFjayB0byB3aW5kb3cub25sb2FkLCB0aGF0IHdpbGwgYWx3YXlzIHdvcmtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBjb21wbGV0ZWQsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBJRSBldmVudCBtb2RlbCBpcyB1c2VkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgZmlyaW5nIGJlZm9yZSBvbmxvYWQsIG1heWJlIGxhdGUgYnV0IHNhZmUgYWxzbyBmb3IgaWZyYW1lc1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYXR0YWNoRXZlbnQoXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiwgY29tcGxldGVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBIGZhbGxiYWNrIHRvIHdpbmRvdy5vbmxvYWQsIHRoYXQgd2lsbCBhbHdheXMgd29ya1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmF0dGFjaEV2ZW50KFwib25sb2FkXCIsIGNvbXBsZXRlZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgSUUgYW5kIG5vdCBhIGZyYW1lXHJcbiAgICAgICAgICAgICAgICAvLyBjb250aW51YWxseSBjaGVjayB0byBzZWUgaWYgdGhlIGRvY3VtZW50IGlzIHJlYWR5XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9wID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB0b3AgPSB3aW5kb3cuZnJhbWVFbGVtZW50ID09IG51bGwgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodG9wICYmIHRvcC5kb1Njcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBkb1Njcm9sbENoZWNrKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWpRdWVyeS5pc1JlYWR5KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIHRyaWNrIGJ5IERpZWdvIFBlcmluaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9qYXZhc2NyaXB0Lm53Ym94LmNvbS9JRUNvbnRlbnRMb2FkZWQvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wLmRvU2Nyb2xsKFwibGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChkb1Njcm9sbENoZWNrLCA1MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGV0YWNoIGFsbCBkb20gcmVhZHkgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhY2goKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgZXhlY3V0ZSBhbnkgd2FpdGluZyBmdW5jdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5yZWFkeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVhZHlMaXN0LnByb21pc2Uob2JqKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHZhciBzdHJ1bmRlZmluZWQgPSB0eXBlb2YgdW5kZWZpbmVkO1xyXG5cclxuXHJcblxyXG4gICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgLy8gSXRlcmF0aW9uIG92ZXIgb2JqZWN0J3MgaW5oZXJpdGVkIHByb3BlcnRpZXMgYmVmb3JlIGl0cyBvd25cclxuICAgIHZhciBpO1xyXG4gICAgZm9yIChpIGluIGpRdWVyeShzdXBwb3J0KSkge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydC5vd25MYXN0ID0gaSAhPT0gXCIwXCI7XHJcblxyXG4gICAgLy8gTm90ZTogbW9zdCBzdXBwb3J0IHRlc3RzIGFyZSBkZWZpbmVkIGluIHRoZWlyIHJlc3BlY3RpdmUgbW9kdWxlcy5cclxuICAgIC8vIGZhbHNlIHVudGlsIHRoZSB0ZXN0IGlzIHJ1blxyXG4gICAgc3VwcG9ydC5pbmxpbmVCbG9ja05lZWRzTGF5b3V0ID0gZmFsc2U7XHJcblxyXG4gICAgalF1ZXJ5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIGV4ZWN1dGUgdGhpcyBvbmUgc3VwcG9ydCB0ZXN0IEFTQVAgYmVjYXVzZSB3ZSBuZWVkIHRvIGtub3dcclxuICAgICAgICAvLyBpZiBib2R5LnN0eWxlLnpvb20gbmVlZHMgdG8gYmUgc2V0LlxyXG5cclxuICAgICAgICB2YXIgY29udGFpbmVyLCBkaXYsXHJcbiAgICAgICAgICAgIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XHJcblxyXG4gICAgICAgIGlmICghYm9keSkge1xyXG4gICAgICAgICAgICAvLyBSZXR1cm4gZm9yIGZyYW1lc2V0IGRvY3MgdGhhdCBkb24ndCBoYXZlIGEgYm9keVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXR1cFxyXG4gICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBcImJvcmRlcjowO3dpZHRoOjA7aGVpZ2h0OjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDotOTk5OXB4O21hcmdpbi10b3A6MXB4XCI7XHJcblxyXG4gICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZGl2LnN0eWxlLnpvb20gIT09IHN0cnVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw4XHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIG5hdGl2ZWx5IGJsb2NrLWxldmVsIGVsZW1lbnRzIGFjdCBsaWtlIGlubGluZS1ibG9ja1xyXG4gICAgICAgICAgICAvLyBlbGVtZW50cyB3aGVuIHNldHRpbmcgdGhlaXIgZGlzcGxheSB0byAnaW5saW5lJyBhbmQgZ2l2aW5nXHJcbiAgICAgICAgICAgIC8vIHRoZW0gbGF5b3V0XHJcbiAgICAgICAgICAgIGRpdi5zdHlsZS5jc3NUZXh0ID0gXCJib3JkZXI6MDttYXJnaW46MDt3aWR0aDoxcHg7cGFkZGluZzoxcHg7ZGlzcGxheTppbmxpbmU7em9vbToxXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoKHN1cHBvcnQuaW5saW5lQmxvY2tOZWVkc0xheW91dCA9IChkaXYub2Zmc2V0V2lkdGggPT09IDMpKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCBJRSA2IGZyb20gYWZmZWN0aW5nIGxheW91dCBmb3IgcG9zaXRpb25lZCBlbGVtZW50cyAjMTEwNDhcclxuICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgSUUgZnJvbSBzaHJpbmtpbmcgdGhlIGJvZHkgaW4gSUUgNyBtb2RlICMxMjg2OVxyXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OFxyXG4gICAgICAgICAgICAgICAgYm9keS5zdHlsZS56b29tID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYm9keS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xyXG5cclxuICAgICAgICAvLyBOdWxsIGVsZW1lbnRzIHRvIGF2b2lkIGxlYWtzIGluIElFXHJcbiAgICAgICAgY29udGFpbmVyID0gZGl2ID0gbnVsbDtcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgICAgIC8vIEV4ZWN1dGUgdGhlIHRlc3Qgb25seSBpZiBub3QgYWxyZWFkeSBleGVjdXRlZCBpbiBhbm90aGVyIG1vZHVsZS5cclxuICAgICAgICBpZiAoc3VwcG9ydC5kZWxldGVFeHBhbmRvID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgICAgICBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gPSB0cnVlO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGRpdi50ZXN0O1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTnVsbCBlbGVtZW50cyB0byBhdm9pZCBsZWFrcyBpbiBJRS5cclxuICAgICAgICBkaXYgPSBudWxsO1xyXG4gICAgfSkoKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgYW4gb2JqZWN0IGNhbiBoYXZlIGRhdGFcclxuICAgICAqL1xyXG4gICAgalF1ZXJ5LmFjY2VwdERhdGEgPSBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgIHZhciBub0RhdGEgPSBqUXVlcnkubm9EYXRhWyhlbGVtLm5vZGVOYW1lICsgXCIgXCIpLnRvTG93ZXJDYXNlKCldLFxyXG4gICAgICAgICAgICBub2RlVHlwZSA9ICtlbGVtLm5vZGVUeXBlIHx8IDE7XHJcblxyXG4gICAgICAgIC8vIERvIG5vdCBzZXQgZGF0YSBvbiBub24tZWxlbWVudCBET00gbm9kZXMgYmVjYXVzZSBpdCB3aWxsIG5vdCBiZSBjbGVhcmVkICgjODMzNSkuXHJcbiAgICAgICAgcmV0dXJuIG5vZGVUeXBlICE9PSAxICYmIG5vZGVUeXBlICE9PSA5ID9cclxuICAgICAgICAgICAgZmFsc2UgOlxyXG5cclxuICAgICAgICAgICAgLy8gTm9kZXMgYWNjZXB0IGRhdGEgdW5sZXNzIG90aGVyd2lzZSBzcGVjaWZpZWQ7IHJlamVjdGlvbiBjYW4gYmUgY29uZGl0aW9uYWxcclxuICAgICAgICAgICAgIW5vRGF0YSB8fCBub0RhdGEgIT09IHRydWUgJiYgZWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc2lkXCIpID09PSBub0RhdGE7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB2YXIgcmJyYWNlID0gL14oPzpcXHtbXFx3XFxXXSpcXH18XFxbW1xcd1xcV10qXFxdKSQvLFxyXG4gICAgICAgIHJtdWx0aURhc2ggPSAvKFtBLVpdKS9nO1xyXG5cclxuICAgIGZ1bmN0aW9uIGRhdGFBdHRyKGVsZW0sIGtleSwgZGF0YSkge1xyXG4gICAgICAgIC8vIElmIG5vdGhpbmcgd2FzIGZvdW5kIGludGVybmFsbHksIHRyeSB0byBmZXRjaCBhbnlcclxuICAgICAgICAvLyBkYXRhIGZyb20gdGhlIEhUTUw1IGRhdGEtKiBhdHRyaWJ1dGVcclxuICAgICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkICYmIGVsZW0ubm9kZVR5cGUgPT09IDEpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gXCJkYXRhLVwiICsga2V5LnJlcGxhY2Uocm11bHRpRGFzaCwgXCItJDFcIikudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGRhdGEgPSBlbGVtLmdldEF0dHJpYnV0ZShuYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YSA9PT0gXCJ0cnVlXCIgPyB0cnVlIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID09PSBcIm51bGxcIiA/IG51bGwgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IGNvbnZlcnQgdG8gYSBudW1iZXIgaWYgaXQgZG9lc24ndCBjaGFuZ2UgdGhlIHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArZGF0YSArIFwiXCIgPT09IGRhdGEgPyArZGF0YSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJicmFjZS50ZXN0KGRhdGEpID8galF1ZXJ5LnBhcnNlSlNPTihkYXRhKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGRhdGEgc28gaXQgaXNuJ3QgY2hhbmdlZCBsYXRlclxyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LmRhdGEoZWxlbSwga2V5LCBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVja3MgYSBjYWNoZSBvYmplY3QgZm9yIGVtcHRpbmVzc1xyXG4gICAgZnVuY3Rpb24gaXNFbXB0eURhdGFPYmplY3Qob2JqKSB7XHJcbiAgICAgICAgdmFyIG5hbWU7XHJcbiAgICAgICAgZm9yIChuYW1lIGluIG9iaikge1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlIHB1YmxpYyBkYXRhIG9iamVjdCBpcyBlbXB0eSwgdGhlIHByaXZhdGUgaXMgc3RpbGwgZW1wdHlcclxuICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwiZGF0YVwiICYmIGpRdWVyeS5pc0VtcHR5T2JqZWN0KG9ialtuYW1lXSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuYW1lICE9PSBcInRvSlNPTlwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGludGVybmFsRGF0YShlbGVtLCBuYW1lLCBkYXRhLCBwdnQgLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XHJcbiAgICAgICAgaWYgKCFqUXVlcnkuYWNjZXB0RGF0YShlbGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmV0LCB0aGlzQ2FjaGUsXHJcbiAgICAgICAgICAgIGludGVybmFsS2V5ID0galF1ZXJ5LmV4cGFuZG8sXHJcblxyXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIGhhbmRsZSBET00gbm9kZXMgYW5kIEpTIG9iamVjdHMgZGlmZmVyZW50bHkgYmVjYXVzZSBJRTYtN1xyXG4gICAgICAgICAgICAvLyBjYW4ndCBHQyBvYmplY3QgcmVmZXJlbmNlcyBwcm9wZXJseSBhY3Jvc3MgdGhlIERPTS1KUyBib3VuZGFyeVxyXG4gICAgICAgICAgICBpc05vZGUgPSBlbGVtLm5vZGVUeXBlLFxyXG5cclxuICAgICAgICAgICAgLy8gT25seSBET00gbm9kZXMgbmVlZCB0aGUgZ2xvYmFsIGpRdWVyeSBjYWNoZTsgSlMgb2JqZWN0IGRhdGEgaXNcclxuICAgICAgICAgICAgLy8gYXR0YWNoZWQgZGlyZWN0bHkgdG8gdGhlIG9iamVjdCBzbyBHQyBjYW4gb2NjdXIgYXV0b21hdGljYWxseVxyXG4gICAgICAgICAgICBjYWNoZSA9IGlzTm9kZSA/IGpRdWVyeS5jYWNoZSA6IGVsZW0sXHJcblxyXG4gICAgICAgICAgICAvLyBPbmx5IGRlZmluaW5nIGFuIElEIGZvciBKUyBvYmplY3RzIGlmIGl0cyBjYWNoZSBhbHJlYWR5IGV4aXN0cyBhbGxvd3NcclxuICAgICAgICAgICAgLy8gdGhlIGNvZGUgdG8gc2hvcnRjdXQgb24gdGhlIHNhbWUgcGF0aCBhcyBhIERPTSBub2RlIHdpdGggbm8gY2FjaGVcclxuICAgICAgICAgICAgaWQgPSBpc05vZGUgPyBlbGVtW2ludGVybmFsS2V5XSA6IGVsZW1baW50ZXJuYWxLZXldICYmIGludGVybmFsS2V5O1xyXG5cclxuICAgICAgICAvLyBBdm9pZCBkb2luZyBhbnkgbW9yZSB3b3JrIHRoYW4gd2UgbmVlZCB0byB3aGVuIHRyeWluZyB0byBnZXQgZGF0YSBvbiBhblxyXG4gICAgICAgIC8vIG9iamVjdCB0aGF0IGhhcyBubyBkYXRhIGF0IGFsbFxyXG4gICAgICAgIGlmICgoIWlkIHx8ICFjYWNoZVtpZF0gfHwgKCFwdnQgJiYgIWNhY2hlW2lkXS5kYXRhKSkgJiYgZGF0YSA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaWQpIHtcclxuICAgICAgICAgICAgLy8gT25seSBET00gbm9kZXMgbmVlZCBhIG5ldyB1bmlxdWUgSUQgZm9yIGVhY2ggZWxlbWVudCBzaW5jZSB0aGVpciBkYXRhXHJcbiAgICAgICAgICAgIC8vIGVuZHMgdXAgaW4gdGhlIGdsb2JhbCBjYWNoZVxyXG4gICAgICAgICAgICBpZiAoaXNOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZCA9IGVsZW1baW50ZXJuYWxLZXldID0gZGVsZXRlZElkcy5wb3AoKSB8fCBqUXVlcnkuZ3VpZCsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWQgPSBpbnRlcm5hbEtleTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjYWNoZVtpZF0pIHtcclxuICAgICAgICAgICAgLy8gQXZvaWQgZXhwb3NpbmcgalF1ZXJ5IG1ldGFkYXRhIG9uIHBsYWluIEpTIG9iamVjdHMgd2hlbiB0aGUgb2JqZWN0XHJcbiAgICAgICAgICAgIC8vIGlzIHNlcmlhbGl6ZWQgdXNpbmcgSlNPTi5zdHJpbmdpZnlcclxuICAgICAgICAgICAgY2FjaGVbaWRdID0gaXNOb2RlID8ge30gOiB7XHJcbiAgICAgICAgICAgICAgICB0b0pTT046IGpRdWVyeS5ub29wXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBbiBvYmplY3QgY2FuIGJlIHBhc3NlZCB0byBqUXVlcnkuZGF0YSBpbnN0ZWFkIG9mIGEga2V5L3ZhbHVlIHBhaXI7IHRoaXMgZ2V0c1xyXG4gICAgICAgIC8vIHNoYWxsb3cgY29waWVkIG92ZXIgb250byB0aGUgZXhpc3RpbmcgY2FjaGVcclxuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG5hbWUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBpZiAocHZ0KSB7XHJcbiAgICAgICAgICAgICAgICBjYWNoZVtpZF0gPSBqUXVlcnkuZXh0ZW5kKGNhY2hlW2lkXSwgbmFtZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYWNoZVtpZF0uZGF0YSA9IGpRdWVyeS5leHRlbmQoY2FjaGVbaWRdLmRhdGEsIG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzQ2FjaGUgPSBjYWNoZVtpZF07XHJcblxyXG4gICAgICAgIC8vIGpRdWVyeSBkYXRhKCkgaXMgc3RvcmVkIGluIGEgc2VwYXJhdGUgb2JqZWN0IGluc2lkZSB0aGUgb2JqZWN0J3MgaW50ZXJuYWwgZGF0YVxyXG4gICAgICAgIC8vIGNhY2hlIGluIG9yZGVyIHRvIGF2b2lkIGtleSBjb2xsaXNpb25zIGJldHdlZW4gaW50ZXJuYWwgZGF0YSBhbmQgdXNlci1kZWZpbmVkXHJcbiAgICAgICAgLy8gZGF0YS5cclxuICAgICAgICBpZiAoIXB2dCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXNDYWNoZS5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzQ2FjaGUuZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzQ2FjaGUgPSB0aGlzQ2FjaGUuZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpc0NhY2hlW2pRdWVyeS5jYW1lbENhc2UobmFtZSldID0gZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBib3RoIGNvbnZlcnRlZC10by1jYW1lbCBhbmQgbm9uLWNvbnZlcnRlZCBkYXRhIHByb3BlcnR5IG5hbWVzXHJcbiAgICAgICAgLy8gSWYgYSBkYXRhIHByb3BlcnR5IHdhcyBzcGVjaWZpZWRcclxuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpcnN0IFRyeSB0byBmaW5kIGFzLWlzIHByb3BlcnR5IGRhdGFcclxuICAgICAgICAgICAgcmV0ID0gdGhpc0NhY2hlW25hbWVdO1xyXG5cclxuICAgICAgICAgICAgLy8gVGVzdCBmb3IgbnVsbHx1bmRlZmluZWQgcHJvcGVydHkgZGF0YVxyXG4gICAgICAgICAgICBpZiAocmV0ID09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcnkgdG8gZmluZCB0aGUgY2FtZWxDYXNlZCBwcm9wZXJ0eVxyXG4gICAgICAgICAgICAgICAgcmV0ID0gdGhpc0NhY2hlW2pRdWVyeS5jYW1lbENhc2UobmFtZSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0ID0gdGhpc0NhY2hlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbnRlcm5hbFJlbW92ZURhdGEoZWxlbSwgbmFtZSwgcHZ0KSB7XHJcbiAgICAgICAgaWYgKCFqUXVlcnkuYWNjZXB0RGF0YShlbGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdGhpc0NhY2hlLCBpLFxyXG4gICAgICAgICAgICBpc05vZGUgPSBlbGVtLm5vZGVUeXBlLFxyXG5cclxuICAgICAgICAgICAgLy8gU2VlIGpRdWVyeS5kYXRhIGZvciBtb3JlIGluZm9ybWF0aW9uXHJcbiAgICAgICAgICAgIGNhY2hlID0gaXNOb2RlID8galF1ZXJ5LmNhY2hlIDogZWxlbSxcclxuICAgICAgICAgICAgaWQgPSBpc05vZGUgPyBlbGVtW2pRdWVyeS5leHBhbmRvXSA6IGpRdWVyeS5leHBhbmRvO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IG5vIGNhY2hlIGVudHJ5IGZvciB0aGlzIG9iamVjdCwgdGhlcmUgaXMgbm9cclxuICAgICAgICAvLyBwdXJwb3NlIGluIGNvbnRpbnVpbmdcclxuICAgICAgICBpZiAoIWNhY2hlW2lkXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobmFtZSkge1xyXG5cclxuICAgICAgICAgICAgdGhpc0NhY2hlID0gcHZ0ID8gY2FjaGVbaWRdIDogY2FjaGVbaWRdLmRhdGE7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpc0NhY2hlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydCBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG5hbWVzIGZvciBkYXRhIGtleXNcclxuICAgICAgICAgICAgICAgIGlmICghalF1ZXJ5LmlzQXJyYXkobmFtZSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdHJ5IHRoZSBzdHJpbmcgYXMgYSBrZXkgYmVmb3JlIGFueSBtYW5pcHVsYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSBpbiB0aGlzQ2FjaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IFtuYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3BsaXQgdGhlIGNhbWVsIGNhc2VkIHZlcnNpb24gYnkgc3BhY2VzIHVubGVzcyBhIGtleSB3aXRoIHRoZSBzcGFjZXMgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSBpbiB0aGlzQ2FjaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIFwibmFtZVwiIGlzIGFuIGFycmF5IG9mIGtleXMuLi5cclxuICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIGRhdGEgaXMgaW5pdGlhbGx5IGNyZWF0ZWQsIHZpYSAoXCJrZXlcIiwgXCJ2YWxcIikgc2lnbmF0dXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGtleXMgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gY2FtZWxDYXNlLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZXJlIGlzIG5vIHdheSB0byB0ZWxsIF9ob3dfIGEga2V5IHdhcyBhZGRlZCwgcmVtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYm90aCBwbGFpbiBrZXkgYW5kIGNhbWVsQ2FzZSBrZXkuICMxMjc4NlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBvbmx5IHBlbmFsaXplIHRoZSBhcnJheSBhcmd1bWVudCBwYXRoLlxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLmNvbmNhdChqUXVlcnkubWFwKG5hbWUsIGpRdWVyeS5jYW1lbENhc2UpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpID0gbmFtZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNDYWNoZVtuYW1lW2ldXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBkYXRhIGxlZnQgaW4gdGhlIGNhY2hlLCB3ZSB3YW50IHRvIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgICAvLyBhbmQgbGV0IHRoZSBjYWNoZSBvYmplY3QgaXRzZWxmIGdldCBkZXN0cm95ZWRcclxuICAgICAgICAgICAgICAgIGlmIChwdnQgPyAhaXNFbXB0eURhdGFPYmplY3QodGhpc0NhY2hlKSA6ICFqUXVlcnkuaXNFbXB0eU9iamVjdCh0aGlzQ2FjaGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZWUgalF1ZXJ5LmRhdGEgZm9yIG1vcmUgaW5mb3JtYXRpb25cclxuICAgICAgICBpZiAoIXB2dCkge1xyXG4gICAgICAgICAgICBkZWxldGUgY2FjaGVbaWRdLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAvLyBEb24ndCBkZXN0cm95IHRoZSBwYXJlbnQgY2FjaGUgdW5sZXNzIHRoZSBpbnRlcm5hbCBkYXRhIG9iamVjdFxyXG4gICAgICAgICAgICAvLyBoYWQgYmVlbiB0aGUgb25seSB0aGluZyBsZWZ0IGluIGl0XHJcbiAgICAgICAgICAgIGlmICghaXNFbXB0eURhdGFPYmplY3QoY2FjaGVbaWRdKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXN0cm95IHRoZSBjYWNoZVxyXG4gICAgICAgIGlmIChpc05vZGUpIHtcclxuICAgICAgICAgICAgalF1ZXJ5LmNsZWFuRGF0YShbZWxlbV0sIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlIGRlbGV0ZSB3aGVuIHN1cHBvcnRlZCBmb3IgZXhwYW5kb3Mgb3IgYGNhY2hlYCBpcyBub3QgYSB3aW5kb3cgcGVyIGlzV2luZG93ICgjMTAwODApXHJcbiAgICAgICAgICAgIC8qIGpzaGludCBlcWVxZXE6IGZhbHNlICovXHJcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gfHwgY2FjaGUgIT0gY2FjaGUud2luZG93KSB7XHJcbiAgICAgICAgICAgIC8qIGpzaGludCBlcWVxZXE6IHRydWUgKi9cclxuICAgICAgICAgICAgZGVsZXRlIGNhY2hlW2lkXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdoZW4gYWxsIGVsc2UgZmFpbHMsIG51bGxcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWNoZVtpZF0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBqUXVlcnkuZXh0ZW5kKHtcclxuICAgICAgICBjYWNoZToge30sXHJcblxyXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgZWxlbWVudHMgKHNwYWNlLXN1ZmZpeGVkIHRvIGF2b2lkIE9iamVjdC5wcm90b3R5cGUgY29sbGlzaW9ucylcclxuICAgICAgICAvLyB0aHJvdyB1bmNhdGNoYWJsZSBleGNlcHRpb25zIGlmIHlvdSBhdHRlbXB0IHRvIHNldCBleHBhbmRvIHByb3BlcnRpZXNcclxuICAgICAgICBub0RhdGE6IHtcclxuICAgICAgICAgICAgXCJhcHBsZXQgXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiZW1iZWQgXCI6IHRydWUsXHJcbiAgICAgICAgICAgIC8vIC4uLmJ1dCBGbGFzaCBvYmplY3RzICh3aGljaCBoYXZlIHRoaXMgY2xhc3NpZCkgKmNhbiogaGFuZGxlIGV4cGFuZG9zXHJcbiAgICAgICAgICAgIFwib2JqZWN0IFwiOiBcImNsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMFwiXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFzRGF0YTogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgZWxlbSA9IGVsZW0ubm9kZVR5cGUgPyBqUXVlcnkuY2FjaGVbZWxlbVtqUXVlcnkuZXhwYW5kb11dIDogZWxlbVtqUXVlcnkuZXhwYW5kb107XHJcbiAgICAgICAgICAgIHJldHVybiAhIWVsZW0gJiYgIWlzRW1wdHlEYXRhT2JqZWN0KGVsZW0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uIChlbGVtLCBuYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbERhdGEoZWxlbSwgbmFtZSwgZGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVtb3ZlRGF0YTogZnVuY3Rpb24gKGVsZW0sIG5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGludGVybmFsUmVtb3ZlRGF0YShlbGVtLCBuYW1lKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXHJcbiAgICAgICAgX2RhdGE6IGZ1bmN0aW9uIChlbGVtLCBuYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbERhdGEoZWxlbSwgbmFtZSwgZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3JlbW92ZURhdGE6IGZ1bmN0aW9uIChlbGVtLCBuYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbFJlbW92ZURhdGEoZWxlbSwgbmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgZGF0YTogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGksIG5hbWUsIGRhdGEsXHJcbiAgICAgICAgICAgICAgICBlbGVtID0gdGhpc1swXSxcclxuICAgICAgICAgICAgICAgIGF0dHJzID0gZWxlbSAmJiBlbGVtLmF0dHJpYnV0ZXM7XHJcblxyXG4gICAgICAgICAgICAvLyBTcGVjaWFsIGV4cGVjdGlvbnMgb2YgLmRhdGEgYmFzaWNhbGx5IHRod2FydCBqUXVlcnkuYWNjZXNzLFxyXG4gICAgICAgICAgICAvLyBzbyBpbXBsZW1lbnQgdGhlIHJlbGV2YW50IGJlaGF2aW9yIG91cnNlbHZlc1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0cyBhbGwgdmFsdWVzXHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGpRdWVyeS5kYXRhKGVsZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAhalF1ZXJ5Ll9kYXRhKGVsZW0sIFwicGFyc2VkQXR0cnNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGF0dHJzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IGF0dHJzW2ldLm5hbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUuaW5kZXhPZihcImRhdGEtXCIpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IGpRdWVyeS5jYW1lbENhc2UobmFtZS5zbGljZSg1KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFBdHRyKGVsZW0sIG5hbWUsIGRhdGFbbmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fZGF0YShlbGVtLCBcInBhcnNlZEF0dHJzXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2V0cyBtdWx0aXBsZSB2YWx1ZXNcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5kYXRhKHRoaXMsIGtleSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxID9cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTZXRzIG9uZSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZGF0YSh0aGlzLCBrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0pIDpcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXRzIG9uZSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGZldGNoIGFueSBpbnRlcm5hbGx5IHN0b3JlZCBkYXRhIGZpcnN0XHJcbiAgICAgICAgICAgICAgICBlbGVtID8gZGF0YUF0dHIoZWxlbSwga2V5LCBqUXVlcnkuZGF0YShlbGVtLCBrZXkpKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW1vdmVEYXRhOiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LnJlbW92ZURhdGEodGhpcywga2V5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGpRdWVyeS5leHRlbmQoe1xyXG4gICAgICAgIHF1ZXVlOiBmdW5jdGlvbiAoZWxlbSwgdHlwZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgcXVldWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9ICh0eXBlIHx8IFwiZnhcIikgKyBcInF1ZXVlXCI7XHJcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IGpRdWVyeS5fZGF0YShlbGVtLCB0eXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTcGVlZCB1cCBkZXF1ZXVlIGJ5IGdldHRpbmcgb3V0IHF1aWNrbHkgaWYgdGhpcyBpcyBqdXN0IGEgbG9va3VwXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcXVldWUgfHwgalF1ZXJ5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUgPSBqUXVlcnkuX2RhdGEoZWxlbSwgdHlwZSwgalF1ZXJ5Lm1ha2VBcnJheShkYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVldWUgfHwgW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZXF1ZXVlOiBmdW5jdGlvbiAoZWxlbSwgdHlwZSkge1xyXG4gICAgICAgICAgICB0eXBlID0gdHlwZSB8fCBcImZ4XCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgcXVldWUgPSBqUXVlcnkucXVldWUoZWxlbSwgdHlwZSksXHJcbiAgICAgICAgICAgICAgICBzdGFydExlbmd0aCA9IHF1ZXVlLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGZuID0gcXVldWUuc2hpZnQoKSxcclxuICAgICAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKGVsZW0sIHR5cGUpLFxyXG4gICAgICAgICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZGVxdWV1ZShlbGVtLCB0eXBlKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgZnggcXVldWUgaXMgZGVxdWV1ZWQsIGFsd2F5cyByZW1vdmUgdGhlIHByb2dyZXNzIHNlbnRpbmVsXHJcbiAgICAgICAgICAgIGlmIChmbiA9PT0gXCJpbnByb2dyZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgIGZuID0gcXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0TGVuZ3RoLS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmbikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCBhIHByb2dyZXNzIHNlbnRpbmVsIHRvIHByZXZlbnQgdGhlIGZ4IHF1ZXVlIGZyb20gYmVpbmdcclxuICAgICAgICAgICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgZGVxdWV1ZWRcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImZ4XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWV1ZS51bnNoaWZ0KFwiaW5wcm9ncmVzc1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjbGVhciB1cCB0aGUgbGFzdCBxdWV1ZSBzdG9wIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgaG9va3Muc3RvcDtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwoZWxlbSwgbmV4dCwgaG9va3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXN0YXJ0TGVuZ3RoICYmIGhvb2tzKSB7XHJcbiAgICAgICAgICAgICAgICBob29rcy5lbXB0eS5maXJlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBub3QgaW50ZW5kZWQgZm9yIHB1YmxpYyBjb25zdW1wdGlvbiAtIGdlbmVyYXRlcyBhIHF1ZXVlSG9va3Mgb2JqZWN0LCBvciByZXR1cm5zIHRoZSBjdXJyZW50IG9uZVxyXG4gICAgICAgIF9xdWV1ZUhvb2tzOiBmdW5jdGlvbiAoZWxlbSwgdHlwZSkge1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gdHlwZSArIFwicXVldWVIb29rc1wiO1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5Ll9kYXRhKGVsZW0sIGtleSkgfHwgalF1ZXJ5Ll9kYXRhKGVsZW0sIGtleSwge1xyXG4gICAgICAgICAgICAgICAgZW1wdHk6IGpRdWVyeS5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKS5hZGQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fcmVtb3ZlRGF0YShlbGVtLCB0eXBlICsgXCJxdWV1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuX3JlbW92ZURhdGEoZWxlbSwga2V5KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGpRdWVyeS5mbi5leHRlbmQoe1xyXG4gICAgICAgIHF1ZXVlOiBmdW5jdGlvbiAodHlwZSwgZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgc2V0dGVyID0gMjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHR5cGU7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJmeFwiO1xyXG4gICAgICAgICAgICAgICAgc2V0dGVyLS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgc2V0dGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4galF1ZXJ5LnF1ZXVlKHRoaXNbMF0sIHR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YSA9PT0gdW5kZWZpbmVkID9cclxuICAgICAgICAgICAgICAgIHRoaXMgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcXVldWUgPSBqUXVlcnkucXVldWUodGhpcywgdHlwZSwgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVuc3VyZSBhIGhvb2tzIGZvciB0aGlzIHF1ZXVlXHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Ll9xdWV1ZUhvb2tzKHRoaXMsIHR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJmeFwiICYmIHF1ZXVlWzBdICE9PSBcImlucHJvZ3Jlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZGVxdWV1ZSh0aGlzLCB0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlcXVldWU6IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LmRlcXVldWUodGhpcywgdHlwZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xlYXJRdWV1ZTogZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVldWUodHlwZSB8fCBcImZ4XCIsIFtdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIEdldCBhIHByb21pc2UgcmVzb2x2ZWQgd2hlbiBxdWV1ZXMgb2YgYSBjZXJ0YWluIHR5cGVcclxuICAgICAgICAvLyBhcmUgZW1wdGllZCAoZnggaXMgdGhlIHR5cGUgYnkgZGVmYXVsdClcclxuICAgICAgICBwcm9taXNlOiBmdW5jdGlvbiAodHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciB0bXAsXHJcbiAgICAgICAgICAgICAgICBjb3VudCA9IDEsXHJcbiAgICAgICAgICAgICAgICBkZWZlciA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgaSA9IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISgtLWNvdW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlV2l0aChlbGVtZW50cywgW2VsZW1lbnRzXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgb2JqID0gdHlwZTtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgICAgICAgICAgdG1wID0galF1ZXJ5Ll9kYXRhKGVsZW1lbnRzW2ldLCB0eXBlICsgXCJxdWV1ZUhvb2tzXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRtcCAmJiB0bXAuZW1wdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcC5lbXB0eS5hZGQocmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZShvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmFyIHBudW0gPSAoL1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8pLnNvdXJjZTtcclxuXHJcbiAgICB2YXIgY3NzRXhwYW5kID0gW1wiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCJdO1xyXG5cclxuICAgIHZhciBpc0hpZGRlbiA9IGZ1bmN0aW9uIChlbGVtLCBlbCkge1xyXG4gICAgICAgIC8vIGlzSGlkZGVuIG1pZ2h0IGJlIGNhbGxlZCBmcm9tIGpRdWVyeSNmaWx0ZXIgZnVuY3Rpb247XHJcbiAgICAgICAgLy8gaW4gdGhhdCBjYXNlLCBlbGVtZW50IHdpbGwgYmUgc2Vjb25kIGFyZ3VtZW50XHJcbiAgICAgICAgZWxlbSA9IGVsIHx8IGVsZW07XHJcbiAgICAgICAgcmV0dXJuIGpRdWVyeS5jc3MoZWxlbSwgXCJkaXNwbGF5XCIpID09PSBcIm5vbmVcIiB8fCAhalF1ZXJ5LmNvbnRhaW5zKGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSk7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgLy8gTXVsdGlmdW5jdGlvbmFsIG1ldGhvZCB0byBnZXQgYW5kIHNldCB2YWx1ZXMgb2YgYSBjb2xsZWN0aW9uXHJcbiAgICAvLyBUaGUgdmFsdWUvcyBjYW4gb3B0aW9uYWxseSBiZSBleGVjdXRlZCBpZiBpdCdzIGEgZnVuY3Rpb25cclxuICAgIHZhciBhY2Nlc3MgPSBqUXVlcnkuYWNjZXNzID0gZnVuY3Rpb24gKGVsZW1zLCBmbiwga2V5LCB2YWx1ZSwgY2hhaW5hYmxlLCBlbXB0eUdldCwgcmF3KSB7XHJcbiAgICAgICAgdmFyIGkgPSAwLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBlbGVtcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIGJ1bGsgPSBrZXkgPT0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gU2V0cyBtYW55IHZhbHVlc1xyXG4gICAgICAgIGlmIChqUXVlcnkudHlwZShrZXkpID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGNoYWluYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGZvciAoaSBpbiBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5hY2Nlc3MoZWxlbXMsIGZuLCBpLCBrZXlbaV0sIHRydWUsIGVtcHR5R2V0LCByYXcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXRzIG9uZSB2YWx1ZVxyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjaGFpbmFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFqUXVlcnkuaXNGdW5jdGlvbih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHJhdyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChidWxrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBCdWxrIG9wZXJhdGlvbnMgcnVuIGFnYWluc3QgdGhlIGVudGlyZSBzZXRcclxuICAgICAgICAgICAgICAgIGlmIChyYXcpIHtcclxuICAgICAgICAgICAgICAgICAgICBmbi5jYWxsKGVsZW1zLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAuLi5leGNlcHQgd2hlbiBleGVjdXRpbmcgZnVuY3Rpb24gdmFsdWVzXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGsgPSBmbjtcclxuICAgICAgICAgICAgICAgICAgICBmbiA9IGZ1bmN0aW9uIChlbGVtLCBrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBidWxrLmNhbGwoalF1ZXJ5KGVsZW0pLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGZuKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4oZWxlbXNbaV0sIGtleSwgcmF3ID8gdmFsdWUgOiB2YWx1ZS5jYWxsKGVsZW1zW2ldLCBpLCBmbihlbGVtc1tpXSwga2V5KSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2hhaW5hYmxlID9cclxuICAgICAgICAgICAgZWxlbXMgOlxyXG5cclxuICAgICAgICAgICAgLy8gR2V0c1xyXG4gICAgICAgICAgICBidWxrID9cclxuICAgICAgICAgICAgZm4uY2FsbChlbGVtcykgOlxyXG4gICAgICAgICAgICBsZW5ndGggPyBmbihlbGVtc1swXSwga2V5KSA6IGVtcHR5R2V0O1xyXG4gICAgfTtcclxuICAgIHZhciByY2hlY2thYmxlVHlwZSA9ICgvXig/OmNoZWNrYm94fHJhZGlvKSQvaSk7XHJcblxyXG5cclxuXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcclxuICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcclxuICAgICAgICAgICAgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcblxyXG4gICAgICAgIC8vIFNldHVwXHJcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZShcImNsYXNzTmFtZVwiLCBcInRcIik7XHJcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IFwiICA8bGluay8+PHRhYmxlPjwvdGFibGU+PGEgaHJlZj0nL2EnPmE8L2E+XCI7XHJcblxyXG4gICAgICAgIC8vIElFIHN0cmlwcyBsZWFkaW5nIHdoaXRlc3BhY2Ugd2hlbiAuaW5uZXJIVE1MIGlzIHVzZWRcclxuICAgICAgICBzdXBwb3J0LmxlYWRpbmdXaGl0ZXNwYWNlID0gZGl2LmZpcnN0Q2hpbGQubm9kZVR5cGUgPT09IDM7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRib2R5IGVsZW1lbnRzIGFyZW4ndCBhdXRvbWF0aWNhbGx5IGluc2VydGVkXHJcbiAgICAgICAgLy8gSUUgd2lsbCBpbnNlcnQgdGhlbSBpbnRvIGVtcHR5IHRhYmxlc1xyXG4gICAgICAgIHN1cHBvcnQudGJvZHkgPSAhZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGJvZHlcIikubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBsaW5rIGVsZW1lbnRzIGdldCBzZXJpYWxpemVkIGNvcnJlY3RseSBieSBpbm5lckhUTUxcclxuICAgICAgICAvLyBUaGlzIHJlcXVpcmVzIGEgd3JhcHBlciBlbGVtZW50IGluIElFXHJcbiAgICAgICAgc3VwcG9ydC5odG1sU2VyaWFsaXplID0gISFkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gTWFrZXMgc3VyZSBjbG9uaW5nIGFuIGh0bWw1IGVsZW1lbnQgZG9lcyBub3QgY2F1c2UgcHJvYmxlbXNcclxuICAgICAgICAvLyBXaGVyZSBvdXRlckhUTUwgaXMgdW5kZWZpbmVkLCB0aGlzIHN0aWxsIHdvcmtzXHJcbiAgICAgICAgc3VwcG9ydC5odG1sNUNsb25lID1cclxuICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm5hdlwiKS5jbG9uZU5vZGUodHJ1ZSkub3V0ZXJIVE1MICE9PSBcIjw6bmF2PjwvOm5hdj5cIjtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgYSBkaXNjb25uZWN0ZWQgY2hlY2tib3ggd2lsbCByZXRhaW4gaXRzIGNoZWNrZWRcclxuICAgICAgICAvLyB2YWx1ZSBvZiB0cnVlIGFmdGVyIGFwcGVuZGVkIHRvIHRoZSBET00gKElFNi83KVxyXG4gICAgICAgIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XHJcbiAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG4gICAgICAgIHN1cHBvcnQuYXBwZW5kQ2hlY2tlZCA9IGlucHV0LmNoZWNrZWQ7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0ZXh0YXJlYSAoYW5kIGNoZWNrYm94KSBkZWZhdWx0VmFsdWUgaXMgcHJvcGVybHkgY2xvbmVkXHJcbiAgICAgICAgLy8gU3VwcG9ydDogSUU2LUlFMTErXHJcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IFwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiO1xyXG4gICAgICAgIHN1cHBvcnQubm9DbG9uZUNoZWNrZWQgPSAhIWRpdi5jbG9uZU5vZGUodHJ1ZSkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZTtcclxuXHJcbiAgICAgICAgLy8gIzExMjE3IC0gV2ViS2l0IGxvc2VzIGNoZWNrIHdoZW4gdGhlIG5hbWUgaXMgYWZ0ZXIgdGhlIGNoZWNrZWQgYXR0cmlidXRlXHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gXCI8aW5wdXQgdHlwZT0ncmFkaW8nIGNoZWNrZWQ9J2NoZWNrZWQnIG5hbWU9J3QnLz5cIjtcclxuXHJcbiAgICAgICAgLy8gU3VwcG9ydDogU2FmYXJpIDUuMSwgaU9TIDUuMSwgQW5kcm9pZCA0LngsIEFuZHJvaWQgMi4zXHJcbiAgICAgICAgLy8gb2xkIFdlYktpdCBkb2Vzbid0IGNsb25lIGNoZWNrZWQgc3RhdGUgY29ycmVjdGx5IGluIGZyYWdtZW50c1xyXG4gICAgICAgIHN1cHBvcnQuY2hlY2tDbG9uZSA9IGRpdi5jbG9uZU5vZGUodHJ1ZSkuY2xvbmVOb2RlKHRydWUpLmxhc3RDaGlsZC5jaGVja2VkO1xyXG5cclxuICAgICAgICAvLyBTdXBwb3J0OiBJRTw5XHJcbiAgICAgICAgLy8gT3BlcmEgZG9lcyBub3QgY2xvbmUgZXZlbnRzIChhbmQgdHlwZW9mIGRpdi5hdHRhY2hFdmVudCA9PT0gdW5kZWZpbmVkKS5cclxuICAgICAgICAvLyBJRTktMTAgY2xvbmVzIGV2ZW50cyBib3VuZCB2aWEgYXR0YWNoRXZlbnQsIGJ1dCB0aGV5IGRvbid0IHRyaWdnZXIgd2l0aCAuY2xpY2soKVxyXG4gICAgICAgIHN1cHBvcnQubm9DbG9uZUV2ZW50ID0gdHJ1ZTtcclxuICAgICAgICBpZiAoZGl2LmF0dGFjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGRpdi5hdHRhY2hFdmVudChcIm9uY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc3VwcG9ydC5ub0Nsb25lRXZlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBkaXYuY2xvbmVOb2RlKHRydWUpLmNsaWNrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFeGVjdXRlIHRoZSB0ZXN0IG9ubHkgaWYgbm90IGFscmVhZHkgZXhlY3V0ZWQgaW4gYW5vdGhlciBtb2R1bGUuXHJcbiAgICAgICAgaWYgKHN1cHBvcnQuZGVsZXRlRXhwYW5kbyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDlcclxuICAgICAgICAgICAgc3VwcG9ydC5kZWxldGVFeHBhbmRvID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBkaXYudGVzdDtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgc3VwcG9ydC5kZWxldGVFeHBhbmRvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUUuXHJcbiAgICAgICAgZnJhZ21lbnQgPSBkaXYgPSBpbnB1dCA9IG51bGw7XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpLCBldmVudE5hbWUsXHJcbiAgICAgICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgICAgIC8vIFN1cHBvcnQ6IElFPDkgKGxhY2sgc3VibWl0L2NoYW5nZSBidWJibGUpLCBGaXJlZm94IDIzKyAobGFjayBmb2N1c2luIGV2ZW50KVxyXG4gICAgICAgIGZvciAoaSBpbiB7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmb2N1c2luOiB0cnVlXHJcbiAgICAgICAgICAgIH0pIHtcclxuICAgICAgICAgICAgZXZlbnROYW1lID0gXCJvblwiICsgaTtcclxuXHJcbiAgICAgICAgICAgIGlmICghKHN1cHBvcnRbaSArIFwiQnViYmxlc1wiXSA9IGV2ZW50TmFtZSBpbiB3aW5kb3cpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBCZXdhcmUgb2YgQ1NQIHJlc3RyaWN0aW9ucyAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vU2VjdXJpdHkvQ1NQKVxyXG4gICAgICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZShldmVudE5hbWUsIFwidFwiKTtcclxuICAgICAgICAgICAgICAgIHN1cHBvcnRbaSArIFwiQnViYmxlc1wiXSA9IGRpdi5hdHRyaWJ1dGVzW2V2ZW50TmFtZV0uZXhwYW5kbyA9PT0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUUuXHJcbiAgICAgICAgZGl2ID0gbnVsbDtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIHZhciByZm9ybUVsZW1zID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWEpJC9pLFxyXG4gICAgICAgIHJrZXlFdmVudCA9IC9ea2V5LyxcclxuICAgICAgICBybW91c2VFdmVudCA9IC9eKD86bW91c2V8Y29udGV4dG1lbnUpfGNsaWNrLyxcclxuICAgICAgICByZm9jdXNNb3JwaCA9IC9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLyxcclxuICAgICAgICBydHlwZW5hbWVzcGFjZSA9IC9eKFteLl0qKSg/OlxcLiguKyl8KSQvO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJldHVyblRydWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmV0dXJuRmFsc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNhZmVBY3RpdmVFbGVtZW50KCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge31cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogSGVscGVyIGZ1bmN0aW9ucyBmb3IgbWFuYWdpbmcgZXZlbnRzIC0tIG5vdCBwYXJ0IG9mIHRoZSBwdWJsaWMgaW50ZXJmYWNlLlxyXG4gICAgICogUHJvcHMgdG8gRGVhbiBFZHdhcmRzJyBhZGRFdmVudCBsaWJyYXJ5IGZvciBtYW55IG9mIHRoZSBpZGVhcy5cclxuICAgICAqL1xyXG4gICAgalF1ZXJ5LmV2ZW50ID0ge1xyXG5cclxuICAgICAgICBnbG9iYWw6IHt9LFxyXG5cclxuICAgICAgICBhZGQ6IGZ1bmN0aW9uIChlbGVtLCB0eXBlcywgaGFuZGxlciwgZGF0YSwgc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgdmFyIHRtcCwgZXZlbnRzLCB0LCBoYW5kbGVPYmpJbixcclxuICAgICAgICAgICAgICAgIHNwZWNpYWwsIGV2ZW50SGFuZGxlLCBoYW5kbGVPYmosXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVycywgdHlwZSwgbmFtZXNwYWNlcywgb3JpZ1R5cGUsXHJcbiAgICAgICAgICAgICAgICBlbGVtRGF0YSA9IGpRdWVyeS5fZGF0YShlbGVtKTtcclxuXHJcbiAgICAgICAgICAgIC8vIERvbid0IGF0dGFjaCBldmVudHMgdG8gbm9EYXRhIG9yIHRleHQvY29tbWVudCBub2RlcyAoYnV0IGFsbG93IHBsYWluIG9iamVjdHMpXHJcbiAgICAgICAgICAgIGlmICghZWxlbURhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2FsbGVyIGNhbiBwYXNzIGluIGFuIG9iamVjdCBvZiBjdXN0b20gZGF0YSBpbiBsaWV1IG9mIHRoZSBoYW5kbGVyXHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVyLmhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZU9iakluID0gaGFuZGxlcjtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBoYW5kbGVPYmpJbi5oYW5kbGVyO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBoYW5kbGVPYmpJbi5zZWxlY3RvcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGhhbmRsZXIgaGFzIGEgdW5pcXVlIElELCB1c2VkIHRvIGZpbmQvcmVtb3ZlIGl0IGxhdGVyXHJcbiAgICAgICAgICAgIGlmICghaGFuZGxlci5ndWlkKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmd1aWQgPSBqUXVlcnkuZ3VpZCsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0IHRoZSBlbGVtZW50J3MgZXZlbnQgc3RydWN0dXJlIGFuZCBtYWluIGhhbmRsZXIsIGlmIHRoaXMgaXMgdGhlIGZpcnN0XHJcbiAgICAgICAgICAgIGlmICghKGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cykpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghKGV2ZW50SGFuZGxlID0gZWxlbURhdGEuaGFuZGxlKSkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIERpc2NhcmQgdGhlIHNlY29uZCBldmVudCBvZiBhIGpRdWVyeS5ldmVudC50cmlnZ2VyKCkgYW5kXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBhbiBldmVudCBpcyBjYWxsZWQgYWZ0ZXIgYSBwYWdlIGhhcyB1bmxvYWRlZFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgalF1ZXJ5ICE9PSBzdHJ1bmRlZmluZWQgJiYgKCFlIHx8IGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgIT09IGUudHlwZSkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQuZGlzcGF0Y2guYXBwbHkoZXZlbnRIYW5kbGUuZWxlbSwgYXJndW1lbnRzKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgZWxlbSBhcyBhIHByb3BlcnR5IG9mIHRoZSBoYW5kbGUgZm4gdG8gcHJldmVudCBhIG1lbW9yeSBsZWFrIHdpdGggSUUgbm9uLW5hdGl2ZSBldmVudHNcclxuICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlLmVsZW0gPSBlbGVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBIYW5kbGUgbXVsdGlwbGUgZXZlbnRzIHNlcGFyYXRlZCBieSBhIHNwYWNlXHJcbiAgICAgICAgICAgIHR5cGVzID0gKHR5cGVzIHx8IFwiXCIpLm1hdGNoKHJub3R3aGl0ZSkgfHwgW1wiXCJdO1xyXG4gICAgICAgICAgICB0ID0gdHlwZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB3aGlsZSAodC0tKSB7XHJcbiAgICAgICAgICAgICAgICB0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKHR5cGVzW3RdKSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBvcmlnVHlwZSA9IHRtcFsxXTtcclxuICAgICAgICAgICAgICAgIG5hbWVzcGFjZXMgPSAodG1wWzJdIHx8IFwiXCIpLnNwbGl0KFwiLlwiKS5zb3J0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVGhlcmUgKm11c3QqIGJlIGEgdHlwZSwgbm8gYXR0YWNoaW5nIG5hbWVzcGFjZS1vbmx5IGhhbmRsZXJzXHJcbiAgICAgICAgICAgICAgICBpZiAoIXR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBldmVudCBjaGFuZ2VzIGl0cyB0eXBlLCB1c2UgdGhlIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMgZm9yIHRoZSBjaGFuZ2VkIHR5cGVcclxuICAgICAgICAgICAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFt0eXBlXSB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBzZWxlY3RvciBkZWZpbmVkLCBkZXRlcm1pbmUgc3BlY2lhbCBldmVudCBhcGkgdHlwZSwgb3RoZXJ3aXNlIGdpdmVuIHR5cGVcclxuICAgICAgICAgICAgICAgIHR5cGUgPSAoc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUpIHx8IHR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHNwZWNpYWwgYmFzZWQgb24gbmV3bHkgcmVzZXQgdHlwZVxyXG4gICAgICAgICAgICAgICAgc3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsW3R5cGVdIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGhhbmRsZU9iaiBpcyBwYXNzZWQgdG8gYWxsIGV2ZW50IGhhbmRsZXJzXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVPYmogPSBqUXVlcnkuZXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdUeXBlOiBvcmlnVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3VpZDogaGFuZGxlci5ndWlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcclxuICAgICAgICAgICAgICAgICAgICBuZWVkc0NvbnRleHQ6IHNlbGVjdG9yICYmIGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KHNlbGVjdG9yKSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZXMuam9pbihcIi5cIilcclxuICAgICAgICAgICAgICAgIH0sIGhhbmRsZU9iakluKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJbml0IHRoZSBldmVudCBoYW5kbGVyIHF1ZXVlIGlmIHdlJ3JlIHRoZSBmaXJzdFxyXG4gICAgICAgICAgICAgICAgaWYgKCEoaGFuZGxlcnMgPSBldmVudHNbdHlwZV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMgPSBldmVudHNbdHlwZV0gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB1c2UgYWRkRXZlbnRMaXN0ZW5lci9hdHRhY2hFdmVudCBpZiB0aGUgc3BlY2lhbCBldmVudHMgaGFuZGxlciByZXR1cm5zIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzcGVjaWFsLnNldHVwIHx8IHNwZWNpYWwuc2V0dXAuY2FsbChlbGVtLCBkYXRhLCBuYW1lc3BhY2VzLCBldmVudEhhbmRsZSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJpbmQgdGhlIGdsb2JhbCBldmVudCBoYW5kbGVyIHRvIHRoZSBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtLmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBldmVudEhhbmRsZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtLmF0dGFjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmF0dGFjaEV2ZW50KFwib25cIiArIHR5cGUsIGV2ZW50SGFuZGxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3BlY2lhbC5hZGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVjaWFsLmFkZC5jYWxsKGVsZW0sIGhhbmRsZU9iaik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVPYmouaGFuZGxlci5ndWlkID0gaGFuZGxlci5ndWlkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgdG8gdGhlIGVsZW1lbnQncyBoYW5kbGVyIGxpc3QsIGRlbGVnYXRlcyBpbiBmcm9udFxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGhhbmRsZXJzLmRlbGVnYXRlQ291bnQrKywgMCwgaGFuZGxlT2JqKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVPYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEtlZXAgdHJhY2sgb2Ygd2hpY2ggZXZlbnRzIGhhdmUgZXZlciBiZWVuIHVzZWQsIGZvciBldmVudCBvcHRpbWl6YXRpb25cclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5nbG9iYWxbdHlwZV0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBOdWxsaWZ5IGVsZW0gdG8gcHJldmVudCBtZW1vcnkgbGVha3MgaW4gSUVcclxuICAgICAgICAgICAgZWxlbSA9IG51bGw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRGV0YWNoIGFuIGV2ZW50IG9yIHNldCBvZiBldmVudHMgZnJvbSBhbiBlbGVtZW50XHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiAoZWxlbSwgdHlwZXMsIGhhbmRsZXIsIHNlbGVjdG9yLCBtYXBwZWRUeXBlcykge1xyXG4gICAgICAgICAgICB2YXIgaiwgaGFuZGxlT2JqLCB0bXAsXHJcbiAgICAgICAgICAgICAgICBvcmlnQ291bnQsIHQsIGV2ZW50cyxcclxuICAgICAgICAgICAgICAgIHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLFxyXG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlcywgb3JpZ1R5cGUsXHJcbiAgICAgICAgICAgICAgICBlbGVtRGF0YSA9IGpRdWVyeS5oYXNEYXRhKGVsZW0pICYmIGpRdWVyeS5fZGF0YShlbGVtKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZWxlbURhdGEgfHwgIShldmVudHMgPSBlbGVtRGF0YS5ldmVudHMpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE9uY2UgZm9yIGVhY2ggdHlwZS5uYW1lc3BhY2UgaW4gdHlwZXM7IHR5cGUgbWF5IGJlIG9taXR0ZWRcclxuICAgICAgICAgICAgdHlwZXMgPSAodHlwZXMgfHwgXCJcIikubWF0Y2gocm5vdHdoaXRlKSB8fCBbXCJcIl07XHJcbiAgICAgICAgICAgIHQgPSB0eXBlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHdoaWxlICh0LS0pIHtcclxuICAgICAgICAgICAgICAgIHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWModHlwZXNbdF0pIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IG9yaWdUeXBlID0gdG1wWzFdO1xyXG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlcyA9ICh0bXBbMl0gfHwgXCJcIikuc3BsaXQoXCIuXCIpLnNvcnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVbmJpbmQgYWxsIGV2ZW50cyAob24gdGhpcyBuYW1lc3BhY2UsIGlmIHByb3ZpZGVkKSBmb3IgdGhlIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIGlmICghdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodHlwZSBpbiBldmVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LnJlbW92ZShlbGVtLCB0eXBlICsgdHlwZXNbdF0sIGhhbmRsZXIsIHNlbGVjdG9yLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsW3R5cGVdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IChzZWxlY3RvciA/IHNwZWNpYWwuZGVsZWdhdGVUeXBlIDogc3BlY2lhbC5iaW5kVHlwZSkgfHwgdHlwZTtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXJzID0gZXZlbnRzW3R5cGVdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgdG1wID0gdG1wWzJdICYmIG5ldyBSZWdFeHAoXCIoXnxcXFxcLilcIiArIG5hbWVzcGFjZXMuam9pbihcIlxcXFwuKD86LipcXFxcLnwpXCIpICsgXCIoXFxcXC58JClcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIG1hdGNoaW5nIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgb3JpZ0NvdW50ID0gaiA9IGhhbmRsZXJzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChqLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVPYmogPSBoYW5kbGVyc1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChtYXBwZWRUeXBlcyB8fCBvcmlnVHlwZSA9PT0gaGFuZGxlT2JqLm9yaWdUeXBlKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoIWhhbmRsZXIgfHwgaGFuZGxlci5ndWlkID09PSBoYW5kbGVPYmouZ3VpZCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCF0bXAgfHwgdG1wLnRlc3QoaGFuZGxlT2JqLm5hbWVzcGFjZSkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGhhbmRsZU9iai5zZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gXCIqKlwiICYmIGhhbmRsZU9iai5zZWxlY3RvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGosIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsZU9iai5zZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMuZGVsZWdhdGVDb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGVjaWFsLnJlbW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lhbC5yZW1vdmUuY2FsbChlbGVtLCBoYW5kbGVPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBnZW5lcmljIGV2ZW50IGhhbmRsZXIgaWYgd2UgcmVtb3ZlZCBzb21ldGhpbmcgYW5kIG5vIG1vcmUgaGFuZGxlcnMgZXhpc3RcclxuICAgICAgICAgICAgICAgIC8vIChhdm9pZHMgcG90ZW50aWFsIGZvciBlbmRsZXNzIHJlY3Vyc2lvbiBkdXJpbmcgcmVtb3ZhbCBvZiBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzKVxyXG4gICAgICAgICAgICAgICAgaWYgKG9yaWdDb3VudCAmJiAhaGFuZGxlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzcGVjaWFsLnRlYXJkb3duIHx8IHNwZWNpYWwudGVhcmRvd24uY2FsbChlbGVtLCBuYW1lc3BhY2VzLCBlbGVtRGF0YS5oYW5kbGUpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkucmVtb3ZlRXZlbnQoZWxlbSwgdHlwZSwgZWxlbURhdGEuaGFuZGxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZXhwYW5kbyBpZiBpdCdzIG5vIGxvbmdlciB1c2VkXHJcbiAgICAgICAgICAgIGlmIChqUXVlcnkuaXNFbXB0eU9iamVjdChldmVudHMpKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgZWxlbURhdGEuaGFuZGxlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZURhdGEgYWxzbyBjaGVja3MgZm9yIGVtcHRpbmVzcyBhbmQgY2xlYXJzIHRoZSBleHBhbmRvIGlmIGVtcHR5XHJcbiAgICAgICAgICAgICAgICAvLyBzbyB1c2UgaXQgaW5zdGVhZCBvZiBkZWxldGVcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5fcmVtb3ZlRGF0YShlbGVtLCBcImV2ZW50c1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uIChldmVudCwgZGF0YSwgZWxlbSwgb25seUhhbmRsZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBoYW5kbGUsIG9udHlwZSwgY3VyLFxyXG4gICAgICAgICAgICAgICAgYnViYmxlVHlwZSwgc3BlY2lhbCwgdG1wLCBpLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRQYXRoID0gW2VsZW0gfHwgZG9jdW1lbnRdLFxyXG4gICAgICAgICAgICAgICAgdHlwZSA9IGhhc093bi5jYWxsKGV2ZW50LCBcInR5cGVcIikgPyBldmVudC50eXBlIDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICBuYW1lc3BhY2VzID0gaGFzT3duLmNhbGwoZXZlbnQsIFwibmFtZXNwYWNlXCIpID8gZXZlbnQubmFtZXNwYWNlLnNwbGl0KFwiLlwiKSA6IFtdO1xyXG5cclxuICAgICAgICAgICAgY3VyID0gdG1wID0gZWxlbSA9IGVsZW0gfHwgZG9jdW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAvLyBEb24ndCBkbyBldmVudHMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xyXG4gICAgICAgICAgICBpZiAoZWxlbS5ub2RlVHlwZSA9PT0gMyB8fCBlbGVtLm5vZGVUeXBlID09PSA4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGZvY3VzL2JsdXIgbW9ycGhzIHRvIGZvY3VzaW4vb3V0OyBlbnN1cmUgd2UncmUgbm90IGZpcmluZyB0aGVtIHJpZ2h0IG5vd1xyXG4gICAgICAgICAgICBpZiAocmZvY3VzTW9ycGgudGVzdCh0eXBlICsgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGUuaW5kZXhPZihcIi5cIikgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gTmFtZXNwYWNlZCB0cmlnZ2VyOyBjcmVhdGUgYSByZWdleHAgdG8gbWF0Y2ggZXZlbnQgdHlwZSBpbiBoYW5kbGUoKVxyXG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlcyA9IHR5cGUuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IG5hbWVzcGFjZXMuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIG5hbWVzcGFjZXMuc29ydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9udHlwZSA9IHR5cGUuaW5kZXhPZihcIjpcIikgPCAwICYmIFwib25cIiArIHR5cGU7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcclxuICAgICAgICAgICAgZXZlbnQgPSBldmVudFtqUXVlcnkuZXhwYW5kb10gP1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgOlxyXG4gICAgICAgICAgICAgICAgbmV3IGpRdWVyeS5FdmVudCh0eXBlLCB0eXBlb2YgZXZlbnQgPT09IFwib2JqZWN0XCIgJiYgZXZlbnQpO1xyXG5cclxuICAgICAgICAgICAgLy8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxyXG4gICAgICAgICAgICBldmVudC5pc1RyaWdnZXIgPSBvbmx5SGFuZGxlcnMgPyAyIDogMztcclxuICAgICAgICAgICAgZXZlbnQubmFtZXNwYWNlID0gbmFtZXNwYWNlcy5qb2luKFwiLlwiKTtcclxuICAgICAgICAgICAgZXZlbnQubmFtZXNwYWNlX3JlID0gZXZlbnQubmFtZXNwYWNlID9cclxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoXCIoXnxcXFxcLilcIiArIG5hbWVzcGFjZXMuam9pbihcIlxcXFwuKD86LipcXFxcLnwpXCIpICsgXCIoXFxcXC58JClcIikgOlxyXG4gICAgICAgICAgICAgICAgbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFuIHVwIHRoZSBldmVudCBpbiBjYXNlIGl0IGlzIGJlaW5nIHJldXNlZFxyXG4gICAgICAgICAgICBldmVudC5yZXN1bHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmICghZXZlbnQudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSBlbGVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDbG9uZSBhbnkgaW5jb21pbmcgZGF0YSBhbmQgcHJlcGVuZCB0aGUgZXZlbnQsIGNyZWF0aW5nIHRoZSBoYW5kbGVyIGFyZyBsaXN0XHJcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhID09IG51bGwgPyBbZXZlbnRdIDpcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5tYWtlQXJyYXkoZGF0YSwgW2V2ZW50XSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBbGxvdyBzcGVjaWFsIGV2ZW50cyB0byBkcmF3IG91dHNpZGUgdGhlIGxpbmVzXHJcbiAgICAgICAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFt0eXBlXSB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKCFvbmx5SGFuZGxlcnMgJiYgc3BlY2lhbC50cmlnZ2VyICYmIHNwZWNpYWwudHJpZ2dlci5hcHBseShlbGVtLCBkYXRhKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIGV2ZW50IHByb3BhZ2F0aW9uIHBhdGggaW4gYWR2YW5jZSwgcGVyIFczQyBldmVudHMgc3BlYyAoIzk5NTEpXHJcbiAgICAgICAgICAgIC8vIEJ1YmJsZSB1cCB0byBkb2N1bWVudCwgdGhlbiB0byB3aW5kb3c7IHdhdGNoIGZvciBhIGdsb2JhbCBvd25lckRvY3VtZW50IHZhciAoIzk3MjQpXHJcbiAgICAgICAgICAgIGlmICghb25seUhhbmRsZXJzICYmICFzcGVjaWFsLm5vQnViYmxlICYmICFqUXVlcnkuaXNXaW5kb3coZWxlbSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBidWJibGVUeXBlID0gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgfHwgdHlwZTtcclxuICAgICAgICAgICAgICAgIGlmICghcmZvY3VzTW9ycGgudGVzdChidWJibGVUeXBlICsgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXIgPSBjdXIucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAoOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRQYXRoLnB1c2goY3VyKTtcclxuICAgICAgICAgICAgICAgICAgICB0bXAgPSBjdXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gT25seSBhZGQgd2luZG93IGlmIHdlIGdvdCB0byBkb2N1bWVudCAoZS5nLiwgbm90IHBsYWluIG9iaiBvciBkZXRhY2hlZCBET00pXHJcbiAgICAgICAgICAgICAgICBpZiAodG1wID09PSAoZWxlbS5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50UGF0aC5wdXNoKHRtcC5kZWZhdWx0VmlldyB8fCB0bXAucGFyZW50V2luZG93IHx8IHdpbmRvdyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZpcmUgaGFuZGxlcnMgb24gdGhlIGV2ZW50IHBhdGhcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlICgoY3VyID0gZXZlbnRQYXRoW2krK10pICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZXZlbnQudHlwZSA9IGkgPiAxID9cclxuICAgICAgICAgICAgICAgICAgICBidWJibGVUeXBlIDpcclxuICAgICAgICAgICAgICAgICAgICBzcGVjaWFsLmJpbmRUeXBlIHx8IHR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8galF1ZXJ5IGhhbmRsZXJcclxuICAgICAgICAgICAgICAgIGhhbmRsZSA9IChqUXVlcnkuX2RhdGEoY3VyLCBcImV2ZW50c1wiKSB8fCB7fSlbZXZlbnQudHlwZV0gJiYgalF1ZXJ5Ll9kYXRhKGN1ciwgXCJoYW5kbGVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmFwcGx5KGN1ciwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTmF0aXZlIGhhbmRsZXJcclxuICAgICAgICAgICAgICAgIGhhbmRsZSA9IG9udHlwZSAmJiBjdXJbb250eXBlXTtcclxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGUgJiYgaGFuZGxlLmFwcGx5ICYmIGpRdWVyeS5hY2NlcHREYXRhKGN1cikpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5yZXN1bHQgPSBoYW5kbGUuYXBwbHkoY3VyLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQucmVzdWx0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBldmVudC50eXBlID0gdHlwZTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIG5vYm9keSBwcmV2ZW50ZWQgdGhlIGRlZmF1bHQgYWN0aW9uLCBkbyBpdCBub3dcclxuICAgICAgICAgICAgaWYgKCFvbmx5SGFuZGxlcnMgJiYgIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCghc3BlY2lhbC5fZGVmYXVsdCB8fCBzcGVjaWFsLl9kZWZhdWx0LmFwcGx5KGV2ZW50UGF0aC5wb3AoKSwgZGF0YSkgPT09IGZhbHNlKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5hY2NlcHREYXRhKGVsZW0pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbGwgYSBuYXRpdmUgRE9NIG1ldGhvZCBvbiB0aGUgdGFyZ2V0IHdpdGggdGhlIHNhbWUgbmFtZSBuYW1lIGFzIHRoZSBldmVudC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDYW4ndCB1c2UgYW4gLmlzRnVuY3Rpb24oKSBjaGVjayBoZXJlIGJlY2F1c2UgSUU2LzcgZmFpbHMgdGhhdCB0ZXN0LlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGRvIGRlZmF1bHQgYWN0aW9ucyBvbiB3aW5kb3csIHRoYXQncyB3aGVyZSBnbG9iYWwgdmFyaWFibGVzIGJlICgjNjE3MClcclxuICAgICAgICAgICAgICAgICAgICBpZiAob250eXBlICYmIGVsZW1bdHlwZV0gJiYgIWpRdWVyeS5pc1dpbmRvdyhlbGVtKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgcmUtdHJpZ2dlciBhbiBvbkZPTyBldmVudCB3aGVuIHdlIGNhbGwgaXRzIEZPTygpIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBlbGVtW29udHlwZV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtW29udHlwZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IHJlLXRyaWdnZXJpbmcgb2YgdGhlIHNhbWUgZXZlbnQsIHNpbmNlIHdlIGFscmVhZHkgYnViYmxlZCBpdCBhYm92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkID0gdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1bdHlwZV0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSUU8OSBkaWVzIG9uIGZvY3VzL2JsdXIgdG8gaGlkZGVuIGVsZW1lbnQgKCMxNDg2LCMxMjUxOClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgcmVwcm9kdWNpYmxlIG9uIHdpblhQIElFOCBuYXRpdmUsIG5vdCBJRTkgaW4gSUU4IG1vZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbVtvbnR5cGVdID0gdG1wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQucmVzdWx0O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2UgYSB3cml0YWJsZSBqUXVlcnkuRXZlbnQgZnJvbSB0aGUgbmF0aXZlIGV2ZW50IG9iamVjdFxyXG4gICAgICAgICAgICBldmVudCA9IGpRdWVyeS5ldmVudC5maXgoZXZlbnQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGksIHJldCwgaGFuZGxlT2JqLCBtYXRjaGVkLCBqLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlclF1ZXVlID0gW10sXHJcbiAgICAgICAgICAgICAgICBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcnMgPSAoalF1ZXJ5Ll9kYXRhKHRoaXMsIFwiZXZlbnRzXCIpIHx8IHt9KVtldmVudC50eXBlXSB8fCBbXSxcclxuICAgICAgICAgICAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFtldmVudC50eXBlXSB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgZml4LWVkIGpRdWVyeS5FdmVudCByYXRoZXIgdGhhbiB0aGUgKHJlYWQtb25seSkgbmF0aXZlIGV2ZW50XHJcbiAgICAgICAgICAgIGFyZ3NbMF0gPSBldmVudDtcclxuICAgICAgICAgICAgZXZlbnQuZGVsZWdhdGVUYXJnZXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgcHJlRGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlLCBhbmQgbGV0IGl0IGJhaWwgaWYgZGVzaXJlZFxyXG4gICAgICAgICAgICBpZiAoc3BlY2lhbC5wcmVEaXNwYXRjaCAmJiBzcGVjaWFsLnByZURpc3BhdGNoLmNhbGwodGhpcywgZXZlbnQpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgaGFuZGxlcnNcclxuICAgICAgICAgICAgaGFuZGxlclF1ZXVlID0galF1ZXJ5LmV2ZW50LmhhbmRsZXJzLmNhbGwodGhpcywgZXZlbnQsIGhhbmRsZXJzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJ1biBkZWxlZ2F0ZXMgZmlyc3Q7IHRoZXkgbWF5IHdhbnQgdG8gc3RvcCBwcm9wYWdhdGlvbiBiZW5lYXRoIHVzXHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAoKG1hdGNoZWQgPSBoYW5kbGVyUXVldWVbaSsrXSkgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBtYXRjaGVkLmVsZW07XHJcblxyXG4gICAgICAgICAgICAgICAgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoKGhhbmRsZU9iaiA9IG1hdGNoZWQuaGFuZGxlcnNbaisrXSkgJiYgIWV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIGV2ZW50IG11c3QgZWl0aGVyIDEpIGhhdmUgbm8gbmFtZXNwYWNlLCBvclxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDIpIGhhdmUgbmFtZXNwYWNlKHMpIGEgc3Vic2V0IG9yIGVxdWFsIHRvIHRob3NlIGluIHRoZSBib3VuZCBldmVudCAoYm90aCBjYW4gaGF2ZSBubyBuYW1lc3BhY2UpLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZXZlbnQubmFtZXNwYWNlX3JlIHx8IGV2ZW50Lm5hbWVzcGFjZV9yZS50ZXN0KGhhbmRsZU9iai5uYW1lc3BhY2UpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5oYW5kbGVPYmogPSBoYW5kbGVPYmo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEgPSBoYW5kbGVPYmouZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9ICgoalF1ZXJ5LmV2ZW50LnNwZWNpYWxbaGFuZGxlT2JqLm9yaWdUeXBlXSB8fCB7fSkuaGFuZGxlIHx8IGhhbmRsZU9iai5oYW5kbGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGx5KG1hdGNoZWQuZWxlbSwgYXJncyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZXZlbnQucmVzdWx0ID0gcmV0KSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxsIHRoZSBwb3N0RGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlXHJcbiAgICAgICAgICAgIGlmIChzcGVjaWFsLnBvc3REaXNwYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgc3BlY2lhbC5wb3N0RGlzcGF0Y2guY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBldmVudC5yZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlcnM6IGZ1bmN0aW9uIChldmVudCwgaGFuZGxlcnMpIHtcclxuICAgICAgICAgICAgdmFyIHNlbCwgaGFuZGxlT2JqLCBtYXRjaGVzLCBpLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlclF1ZXVlID0gW10sXHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZUNvdW50ID0gaGFuZGxlcnMuZGVsZWdhdGVDb3VudCxcclxuICAgICAgICAgICAgICAgIGN1ciA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpbmQgZGVsZWdhdGUgaGFuZGxlcnNcclxuICAgICAgICAgICAgLy8gQmxhY2staG9sZSBTVkcgPHVzZT4gaW5zdGFuY2UgdHJlZXMgKCMxMzE4MClcclxuICAgICAgICAgICAgLy8gQXZvaWQgbm9uLWxlZnQtY2xpY2sgYnViYmxpbmcgaW4gRmlyZWZveCAoIzM4NjEpXHJcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZUNvdW50ICYmIGN1ci5ub2RlVHlwZSAmJiAoIWV2ZW50LmJ1dHRvbiB8fCBldmVudC50eXBlICE9PSBcImNsaWNrXCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLyoganNoaW50IGVxZXFlcTogZmFsc2UgKi9cclxuICAgICAgICAgICAgICAgIGZvciAoOyBjdXIgIT0gdGhpczsgY3VyID0gY3VyLnBhcmVudE5vZGUgfHwgdGhpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qIGpzaGludCBlcWVxZXE6IHRydWUgKi9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgY2hlY2sgbm9uLWVsZW1lbnRzICgjMTMyMDgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgcHJvY2VzcyBjbGlja3Mgb24gZGlzYWJsZWQgZWxlbWVudHMgKCM2OTExLCAjODE2NSwgIzExMzgyLCAjMTE3NjQpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ci5ub2RlVHlwZSA9PT0gMSAmJiAoY3VyLmRpc2FibGVkICE9PSB0cnVlIHx8IGV2ZW50LnR5cGUgIT09IFwiY2xpY2tcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGVsZWdhdGVDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVPYmogPSBoYW5kbGVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBjb25mbGljdCB3aXRoIE9iamVjdC5wcm90b3R5cGUgcHJvcGVydGllcyAoIzEzMjAzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsID0gaGFuZGxlT2JqLnNlbGVjdG9yICsgXCIgXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXNbc2VsXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlc1tzZWxdID0gaGFuZGxlT2JqLm5lZWRzQ29udGV4dCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeShzZWwsIHRoaXMpLmluZGV4KGN1cikgPj0gMCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5maW5kKHNlbCwgdGhpcywgbnVsbCwgW2N1cl0pLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzW3NlbF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2goaGFuZGxlT2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXJRdWV1ZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtOiBjdXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnM6IG1hdGNoZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgdGhlIHJlbWFpbmluZyAoZGlyZWN0bHktYm91bmQpIGhhbmRsZXJzXHJcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZUNvdW50IDwgaGFuZGxlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyUXVldWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbTogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyczogaGFuZGxlcnMuc2xpY2UoZGVsZWdhdGVDb3VudClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlclF1ZXVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpeDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudFtqUXVlcnkuZXhwYW5kb10pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgd3JpdGFibGUgY29weSBvZiB0aGUgZXZlbnQgb2JqZWN0IGFuZCBub3JtYWxpemUgc29tZSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgIHZhciBpLCBwcm9wLCBjb3B5LFxyXG4gICAgICAgICAgICAgICAgdHlwZSA9IGV2ZW50LnR5cGUsXHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50ID0gZXZlbnQsXHJcbiAgICAgICAgICAgICAgICBmaXhIb29rID0gdGhpcy5maXhIb29rc1t0eXBlXTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZml4SG9vaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXhIb29rc1t0eXBlXSA9IGZpeEhvb2sgPVxyXG4gICAgICAgICAgICAgICAgICAgIHJtb3VzZUV2ZW50LnRlc3QodHlwZSkgPyB0aGlzLm1vdXNlSG9va3MgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJrZXlFdmVudC50ZXN0KHR5cGUpID8gdGhpcy5rZXlIb29rcyA6IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvcHkgPSBmaXhIb29rLnByb3BzID8gdGhpcy5wcm9wcy5jb25jYXQoZml4SG9vay5wcm9wcykgOiB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQgPSBuZXcgalF1ZXJ5LkV2ZW50KG9yaWdpbmFsRXZlbnQpO1xyXG5cclxuICAgICAgICAgICAgaSA9IGNvcHkubGVuZ3RoO1xyXG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wID0gY29weVtpXTtcclxuICAgICAgICAgICAgICAgIGV2ZW50W3Byb3BdID0gb3JpZ2luYWxFdmVudFtwcm9wXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgICAgICAvLyBGaXggdGFyZ2V0IHByb3BlcnR5ICgjMTkyNSlcclxuICAgICAgICAgICAgaWYgKCFldmVudC50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9IG9yaWdpbmFsRXZlbnQuc3JjRWxlbWVudCB8fCBkb2N1bWVudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogQ2hyb21lIDIzKywgU2FmYXJpP1xyXG4gICAgICAgICAgICAvLyBUYXJnZXQgc2hvdWxkIG5vdCBiZSBhIHRleHQgbm9kZSAoIzUwNCwgIzEzMTQzKVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0Lm5vZGVUeXBlID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgICAgICAvLyBGb3IgbW91c2Uva2V5IGV2ZW50cywgbWV0YUtleT09ZmFsc2UgaWYgaXQncyB1bmRlZmluZWQgKCMzMzY4LCAjMTEzMjgpXHJcbiAgICAgICAgICAgIGV2ZW50Lm1ldGFLZXkgPSAhIWV2ZW50Lm1ldGFLZXk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZml4SG9vay5maWx0ZXIgPyBmaXhIb29rLmZpbHRlcihldmVudCwgb3JpZ2luYWxFdmVudCkgOiBldmVudDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBJbmNsdWRlcyBzb21lIGV2ZW50IHByb3BzIHNoYXJlZCBieSBLZXlFdmVudCBhbmQgTW91c2VFdmVudFxyXG4gICAgICAgIHByb3BzOiBcImFsdEtleSBidWJibGVzIGNhbmNlbGFibGUgY3RybEtleSBjdXJyZW50VGFyZ2V0IGV2ZW50UGhhc2UgbWV0YUtleSByZWxhdGVkVGFyZ2V0IHNoaWZ0S2V5IHRhcmdldCB0aW1lU3RhbXAgdmlldyB3aGljaFwiLnNwbGl0KFwiIFwiKSxcclxuXHJcbiAgICAgICAgZml4SG9va3M6IHt9LFxyXG5cclxuICAgICAgICBrZXlIb29rczoge1xyXG4gICAgICAgICAgICBwcm9wczogXCJjaGFyIGNoYXJDb2RlIGtleSBrZXlDb2RlXCIuc3BsaXQoXCIgXCIpLFxyXG4gICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChldmVudCwgb3JpZ2luYWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgd2hpY2ggZm9yIGtleSBldmVudHNcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC53aGljaCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQud2hpY2ggPSBvcmlnaW5hbC5jaGFyQ29kZSAhPSBudWxsID8gb3JpZ2luYWwuY2hhckNvZGUgOiBvcmlnaW5hbC5rZXlDb2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1vdXNlSG9va3M6IHtcclxuICAgICAgICAgICAgcHJvcHM6IFwiYnV0dG9uIGJ1dHRvbnMgY2xpZW50WCBjbGllbnRZIGZyb21FbGVtZW50IG9mZnNldFggb2Zmc2V0WSBwYWdlWCBwYWdlWSBzY3JlZW5YIHNjcmVlblkgdG9FbGVtZW50XCIuc3BsaXQoXCIgXCIpLFxyXG4gICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChldmVudCwgb3JpZ2luYWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBib2R5LCBldmVudERvYywgZG9jLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbiA9IG9yaWdpbmFsLmJ1dHRvbixcclxuICAgICAgICAgICAgICAgICAgICBmcm9tRWxlbWVudCA9IG9yaWdpbmFsLmZyb21FbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBwYWdlWC9ZIGlmIG1pc3NpbmcgYW5kIGNsaWVudFgvWSBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5wYWdlWCA9PSBudWxsICYmIG9yaWdpbmFsLmNsaWVudFggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50RG9jID0gZXZlbnQudGFyZ2V0Lm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jID0gZXZlbnREb2MuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBldmVudERvYy5ib2R5O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wYWdlWCA9IG9yaWdpbmFsLmNsaWVudFggKyAoZG9jICYmIGRvYy5zY3JvbGxMZWZ0IHx8IGJvZHkgJiYgYm9keS5zY3JvbGxMZWZ0IHx8IDApIC0gKGRvYyAmJiBkb2MuY2xpZW50TGVmdCB8fCBib2R5ICYmIGJvZHkuY2xpZW50TGVmdCB8fCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wYWdlWSA9IG9yaWdpbmFsLmNsaWVudFkgKyAoZG9jICYmIGRvYy5zY3JvbGxUb3AgfHwgYm9keSAmJiBib2R5LnNjcm9sbFRvcCB8fCAwKSAtIChkb2MgJiYgZG9jLmNsaWVudFRvcCB8fCBib2R5ICYmIGJvZHkuY2xpZW50VG9wIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCByZWxhdGVkVGFyZ2V0LCBpZiBuZWNlc3NhcnlcclxuICAgICAgICAgICAgICAgIGlmICghZXZlbnQucmVsYXRlZFRhcmdldCAmJiBmcm9tRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnJlbGF0ZWRUYXJnZXQgPSBmcm9tRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0ID8gb3JpZ2luYWwudG9FbGVtZW50IDogZnJvbUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHdoaWNoIGZvciBjbGljazogMSA9PT0gbGVmdDsgMiA9PT0gbWlkZGxlOyAzID09PSByaWdodFxyXG4gICAgICAgICAgICAgICAgLy8gTm90ZTogYnV0dG9uIGlzIG5vdCBub3JtYWxpemVkLCBzbyBkb24ndCB1c2UgaXRcclxuICAgICAgICAgICAgICAgIGlmICghZXZlbnQud2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC53aGljaCA9IChidXR0b24gJiAxID8gMSA6IChidXR0b24gJiAyID8gMyA6IChidXR0b24gJiA0ID8gMiA6IDApKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3BlY2lhbDoge1xyXG4gICAgICAgICAgICBsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IHRyaWdnZXJlZCBpbWFnZS5sb2FkIGV2ZW50cyBmcm9tIGJ1YmJsaW5nIHRvIHdpbmRvdy5sb2FkXHJcbiAgICAgICAgICAgICAgICBub0J1YmJsZTogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmb2N1czoge1xyXG4gICAgICAgICAgICAgICAgLy8gRmlyZSBuYXRpdmUgZXZlbnQgaWYgcG9zc2libGUgc28gYmx1ci9mb2N1cyBzZXF1ZW5jZSBpcyBjb3JyZWN0XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMgIT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5mb2N1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBlcnJvciBvbiBmb2N1cyB0byBoaWRkZW4gZWxlbWVudCAoIzE0ODYsICMxMjUxOCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgLnRyaWdnZXIoKSBydW4gdGhlIGhhbmRsZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGVUeXBlOiBcImZvY3VzaW5cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBibHVyOiB7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMgPT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5ibHVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlVHlwZTogXCJmb2N1c291dFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNsaWNrOiB7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgY2hlY2tib3gsIGZpcmUgbmF0aXZlIGV2ZW50IHNvIGNoZWNrZWQgc3RhdGUgd2lsbCBiZSByaWdodFxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqUXVlcnkubm9kZU5hbWUodGhpcywgXCJpbnB1dFwiKSAmJiB0aGlzLnR5cGUgPT09IFwiY2hlY2tib3hcIiAmJiB0aGlzLmNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRm9yIGNyb3NzLWJyb3dzZXIgY29uc2lzdGVuY3ksIGRvbid0IGZpcmUgbmF0aXZlIC5jbGljaygpIG9uIGxpbmtzXHJcbiAgICAgICAgICAgICAgICBfZGVmYXVsdDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5ub2RlTmFtZShldmVudC50YXJnZXQsIFwiYVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGJlZm9yZXVubG9hZDoge1xyXG4gICAgICAgICAgICAgICAgcG9zdERpc3BhdGNoOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRXZlbiB3aGVuIHJldHVyblZhbHVlIGVxdWFscyB0byB1bmRlZmluZWQgRmlyZWZveCB3aWxsIHN0aWxsIHNob3cgYWxlcnRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQucmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQub3JpZ2luYWxFdmVudC5yZXR1cm5WYWx1ZSA9IGV2ZW50LnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaW11bGF0ZTogZnVuY3Rpb24gKHR5cGUsIGVsZW0sIGV2ZW50LCBidWJibGUpIHtcclxuICAgICAgICAgICAgLy8gUGlnZ3liYWNrIG9uIGEgZG9ub3IgZXZlbnQgdG8gc2ltdWxhdGUgYSBkaWZmZXJlbnQgb25lLlxyXG4gICAgICAgICAgICAvLyBGYWtlIG9yaWdpbmFsRXZlbnQgdG8gYXZvaWQgZG9ub3IncyBzdG9wUHJvcGFnYXRpb24sIGJ1dCBpZiB0aGVcclxuICAgICAgICAgICAgLy8gc2ltdWxhdGVkIGV2ZW50IHByZXZlbnRzIGRlZmF1bHQgdGhlbiB3ZSBkbyB0aGUgc2FtZSBvbiB0aGUgZG9ub3IuXHJcbiAgICAgICAgICAgIHZhciBlID0galF1ZXJ5LmV4dGVuZChcclxuICAgICAgICAgICAgICAgIG5ldyBqUXVlcnkuRXZlbnQoKSxcclxuICAgICAgICAgICAgICAgIGV2ZW50LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBpc1NpbXVsYXRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiB7fVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoYnViYmxlKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlcihlLCBudWxsLCBlbGVtKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5kaXNwYXRjaC5jYWxsKGVsZW0sIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBqUXVlcnkucmVtb3ZlRXZlbnQgPSBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyID9cclxuICAgICAgICBmdW5jdGlvbiAoZWxlbSwgdHlwZSwgaGFuZGxlKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gOlxyXG4gICAgICAgIGZ1bmN0aW9uIChlbGVtLCB0eXBlLCBoYW5kbGUpIHtcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSBcIm9uXCIgKyB0eXBlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVsZW0uZGV0YWNoRXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAjODU0NSwgIzcwNTQsIHByZXZlbnRpbmcgbWVtb3J5IGxlYWtzIGZvciBjdXN0b20gZXZlbnRzIGluIElFNi04XHJcbiAgICAgICAgICAgICAgICAvLyBkZXRhY2hFdmVudCBuZWVkZWQgcHJvcGVydHkgb24gZWxlbWVudCwgYnkgbmFtZSBvZiB0aGF0IGV2ZW50LCB0byBwcm9wZXJseSBleHBvc2UgaXQgdG8gR0NcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlbVtuYW1lXSA9PT0gc3RydW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbVtuYW1lXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZWxlbS5kZXRhY2hFdmVudChuYW1lLCBoYW5kbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBqUXVlcnkuRXZlbnQgPSBmdW5jdGlvbiAoc3JjLCBwcm9wcykge1xyXG4gICAgICAgIC8vIEFsbG93IGluc3RhbnRpYXRpb24gd2l0aG91dCB0aGUgJ25ldycga2V5d29yZFxyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBqUXVlcnkuRXZlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgalF1ZXJ5LkV2ZW50KHNyYywgcHJvcHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRXZlbnQgb2JqZWN0XHJcbiAgICAgICAgaWYgKHNyYyAmJiBzcmMudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsRXZlbnQgPSBzcmM7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHNyYy50eXBlO1xyXG5cclxuICAgICAgICAgICAgLy8gRXZlbnRzIGJ1YmJsaW5nIHVwIHRoZSBkb2N1bWVudCBtYXkgaGF2ZSBiZWVuIG1hcmtlZCBhcyBwcmV2ZW50ZWRcclxuICAgICAgICAgICAgLy8gYnkgYSBoYW5kbGVyIGxvd2VyIGRvd24gdGhlIHRyZWU7IHJlZmxlY3QgdGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgICAgICAgIHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gc3JjLmRlZmF1bHRQcmV2ZW50ZWQgfHxcclxuICAgICAgICAgICAgICAgIHNyYy5kZWZhdWx0UHJldmVudGVkID09PSB1bmRlZmluZWQgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFIDwgOVxyXG4gICAgICAgICAgICAgICAgICAgIHNyYy5yZXR1cm5WYWx1ZSA9PT0gZmFsc2UgfHxcclxuICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBBbmRyb2lkIDwgNC4wXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjLmdldFByZXZlbnREZWZhdWx0ICYmIHNyYy5nZXRQcmV2ZW50RGVmYXVsdCgpKSA/XHJcbiAgICAgICAgICAgICAgICByZXR1cm5UcnVlIDpcclxuICAgICAgICAgICAgICAgIHJldHVybkZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gRXZlbnQgdHlwZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHNyYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFB1dCBleHBsaWNpdGx5IHByb3ZpZGVkIHByb3BlcnRpZXMgb250byB0aGUgZXZlbnQgb2JqZWN0XHJcbiAgICAgICAgaWYgKHByb3BzKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeS5leHRlbmQodGhpcywgcHJvcHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgdGltZXN0YW1wIGlmIGluY29taW5nIGV2ZW50IGRvZXNuJ3QgaGF2ZSBvbmVcclxuICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IHNyYyAmJiBzcmMudGltZVN0YW1wIHx8IGpRdWVyeS5ub3coKTtcclxuXHJcbiAgICAgICAgLy8gTWFyayBpdCBhcyBmaXhlZFxyXG4gICAgICAgIHRoaXNbalF1ZXJ5LmV4cGFuZG9dID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8galF1ZXJ5LkV2ZW50IGlzIGJhc2VkIG9uIERPTTMgRXZlbnRzIGFzIHNwZWNpZmllZCBieSB0aGUgRUNNQVNjcmlwdCBMYW5ndWFnZSBCaW5kaW5nXHJcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAzL1dELURPTS1MZXZlbC0zLUV2ZW50cy0yMDAzMDMzMS9lY21hLXNjcmlwdC1iaW5kaW5nLmh0bWxcclxuICAgIGpRdWVyeS5FdmVudC5wcm90b3R5cGUgPSB7XHJcbiAgICAgICAgaXNEZWZhdWx0UHJldmVudGVkOiByZXR1cm5GYWxzZSxcclxuICAgICAgICBpc1Byb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXHJcbiAgICAgICAgaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxyXG5cclxuICAgICAgICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcclxuICAgICAgICAgICAgaWYgKCFlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHByZXZlbnREZWZhdWx0IGV4aXN0cywgcnVuIGl0IG9uIHRoZSBvcmlnaW5hbCBldmVudFxyXG4gICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFXHJcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2Ugc2V0IHRoZSByZXR1cm5WYWx1ZSBwcm9wZXJ0eSBvZiB0aGUgb3JpZ2luYWwgZXZlbnQgdG8gZmFsc2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XHJcbiAgICAgICAgICAgIGlmICghZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIElmIHN0b3BQcm9wYWdhdGlvbiBleGlzdHMsIHJ1biBpdCBvbiB0aGUgb3JpZ2luYWwgZXZlbnRcclxuICAgICAgICAgICAgaWYgKGUuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRVxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGNhbmNlbEJ1YmJsZSBwcm9wZXJ0eSBvZiB0aGUgb3JpZ2luYWwgZXZlbnQgdG8gdHJ1ZVxyXG4gICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhdGUgbW91c2VlbnRlci9sZWF2ZSBldmVudHMgdXNpbmcgbW91c2VvdmVyL291dCBhbmQgZXZlbnQtdGltZSBjaGVja3NcclxuICAgIGpRdWVyeS5lYWNoKHtcclxuICAgICAgICBtb3VzZWVudGVyOiBcIm1vdXNlb3ZlclwiLFxyXG4gICAgICAgIG1vdXNlbGVhdmU6IFwibW91c2VvdXRcIlxyXG4gICAgfSwgZnVuY3Rpb24gKG9yaWcsIGZpeCkge1xyXG4gICAgICAgIGpRdWVyeS5ldmVudC5zcGVjaWFsW29yaWddID0ge1xyXG4gICAgICAgICAgICBkZWxlZ2F0ZVR5cGU6IGZpeCxcclxuICAgICAgICAgICAgYmluZFR5cGU6IGZpeCxcclxuXHJcbiAgICAgICAgICAgIGhhbmRsZTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRlZCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlT2JqID0gZXZlbnQuaGFuZGxlT2JqO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEZvciBtb3VzZW50ZXIvbGVhdmUgY2FsbCB0aGUgaGFuZGxlciBpZiByZWxhdGVkIGlzIG91dHNpZGUgdGhlIHRhcmdldC5cclxuICAgICAgICAgICAgICAgIC8vIE5COiBObyByZWxhdGVkVGFyZ2V0IGlmIHRoZSBtb3VzZSBsZWZ0L2VudGVyZWQgdGhlIGJyb3dzZXIgd2luZG93XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlbGF0ZWQgfHwgKHJlbGF0ZWQgIT09IHRhcmdldCAmJiAhalF1ZXJ5LmNvbnRhaW5zKHRhcmdldCwgcmVsYXRlZCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudHlwZSA9IGhhbmRsZU9iai5vcmlnVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBoYW5kbGVPYmouaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnR5cGUgPSBmaXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIElFIHN1Ym1pdCBkZWxlZ2F0aW9uXHJcbiAgICBpZiAoIXN1cHBvcnQuc3VibWl0QnViYmxlcykge1xyXG5cclxuICAgICAgICBqUXVlcnkuZXZlbnQuc3BlY2lhbC5zdWJtaXQgPSB7XHJcbiAgICAgICAgICAgIHNldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IG5lZWQgdGhpcyBmb3IgZGVsZWdhdGVkIGZvcm0gc3VibWl0IGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgaWYgKGpRdWVyeS5ub2RlTmFtZSh0aGlzLCBcImZvcm1cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTGF6eS1hZGQgYSBzdWJtaXQgaGFuZGxlciB3aGVuIGEgZGVzY2VuZGFudCBmb3JtIG1heSBwb3RlbnRpYWxseSBiZSBzdWJtaXR0ZWRcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5hZGQodGhpcywgXCJjbGljay5fc3VibWl0IGtleXByZXNzLl9zdWJtaXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBOb2RlIG5hbWUgY2hlY2sgYXZvaWRzIGEgVk1MLXJlbGF0ZWQgY3Jhc2ggaW4gSUUgKCM5ODA3KVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtID0gZS50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0gPSBqUXVlcnkubm9kZU5hbWUoZWxlbSwgXCJpbnB1dFwiKSB8fCBqUXVlcnkubm9kZU5hbWUoZWxlbSwgXCJidXR0b25cIikgPyBlbGVtLmZvcm0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm0gJiYgIWpRdWVyeS5fZGF0YShmb3JtLCBcInN1Ym1pdEJ1YmJsZXNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LmFkZChmb3JtLCBcInN1Ym1pdC5fc3VibWl0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuX3N1Ym1pdF9idWJibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Ll9kYXRhKGZvcm0sIFwic3VibWl0QnViYmxlc1wiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB1bmRlZmluZWQgc2luY2Ugd2UgZG9uJ3QgbmVlZCBhbiBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcG9zdERpc3BhdGNoOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIGZvcm0gd2FzIHN1Ym1pdHRlZCBieSB0aGUgdXNlciwgYnViYmxlIHRoZSBldmVudCB1cCB0aGUgdHJlZVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50Ll9zdWJtaXRfYnViYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGV2ZW50Ll9zdWJtaXRfYnViYmxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUgJiYgIWV2ZW50LmlzVHJpZ2dlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQuc2ltdWxhdGUoXCJzdWJtaXRcIiwgdGhpcy5wYXJlbnROb2RlLCBldmVudCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgbmVlZCB0aGlzIGZvciBkZWxlZ2F0ZWQgZm9ybSBzdWJtaXQgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICBpZiAoalF1ZXJ5Lm5vZGVOYW1lKHRoaXMsIFwiZm9ybVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgZGVsZWdhdGVkIGhhbmRsZXJzOyBjbGVhbkRhdGEgZXZlbnR1YWxseSByZWFwcyBzdWJtaXQgaGFuZGxlcnMgYXR0YWNoZWQgYWJvdmVcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5yZW1vdmUodGhpcywgXCIuX3N1Ym1pdFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSUUgY2hhbmdlIGRlbGVnYXRpb24gYW5kIGNoZWNrYm94L3JhZGlvIGZpeFxyXG4gICAgaWYgKCFzdXBwb3J0LmNoYW5nZUJ1YmJsZXMpIHtcclxuXHJcbiAgICAgICAgalF1ZXJ5LmV2ZW50LnNwZWNpYWwuY2hhbmdlID0ge1xyXG5cclxuICAgICAgICAgICAgc2V0dXA6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmZvcm1FbGVtcy50ZXN0KHRoaXMubm9kZU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSUUgZG9lc24ndCBmaXJlIGNoYW5nZSBvbiBhIGNoZWNrL3JhZGlvIHVudGlsIGJsdXI7IHRyaWdnZXIgaXQgb24gY2xpY2tcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZnRlciBhIHByb3BlcnR5Y2hhbmdlLiBFYXQgdGhlIGJsdXItY2hhbmdlIGluIHNwZWNpYWwuY2hhbmdlLmhhbmRsZS5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIHN0aWxsIGZpcmVzIG9uY2hhbmdlIGEgc2Vjb25kIHRpbWUgZm9yIGNoZWNrL3JhZGlvIGFmdGVyIGJsdXIuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gXCJjaGVja2JveFwiIHx8IHRoaXMudHlwZSA9PT0gXCJyYWRpb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5hZGQodGhpcywgXCJwcm9wZXJ0eWNoYW5nZS5fY2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQucHJvcGVydHlOYW1lID09PSBcImNoZWNrZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2p1c3RfY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQuYWRkKHRoaXMsIFwiY2xpY2suX2NoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qdXN0X2NoYW5nZWQgJiYgIWV2ZW50LmlzVHJpZ2dlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2p1c3RfY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxsb3cgdHJpZ2dlcmVkLCBzaW11bGF0ZWQgY2hhbmdlIGV2ZW50cyAoIzExNTAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LnNpbXVsYXRlKFwiY2hhbmdlXCIsIHRoaXMsIGV2ZW50LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIERlbGVnYXRlZCBldmVudDsgbGF6eS1hZGQgYSBjaGFuZ2UgaGFuZGxlciBvbiBkZXNjZW5kYW50IGlucHV0c1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LmFkZCh0aGlzLCBcImJlZm9yZWFjdGl2YXRlLl9jaGFuZ2VcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbSA9IGUudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmZvcm1FbGVtcy50ZXN0KGVsZW0ubm9kZU5hbWUpICYmICFqUXVlcnkuX2RhdGEoZWxlbSwgXCJjaGFuZ2VCdWJibGVzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5hZGQoZWxlbSwgXCJjaGFuZ2UuX2NoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUgJiYgIWV2ZW50LmlzU2ltdWxhdGVkICYmICFldmVudC5pc1RyaWdnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQuc2ltdWxhdGUoXCJjaGFuZ2VcIiwgdGhpcy5wYXJlbnROb2RlLCBldmVudCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuX2RhdGEoZWxlbSwgXCJjaGFuZ2VCdWJibGVzXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaGFuZGxlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbGVtID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN3YWxsb3cgbmF0aXZlIGNoYW5nZSBldmVudHMgZnJvbSBjaGVja2JveC9yYWRpbywgd2UgYWxyZWFkeSB0cmlnZ2VyZWQgdGhlbSBhYm92ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMgIT09IGVsZW0gfHwgZXZlbnQuaXNTaW11bGF0ZWQgfHwgZXZlbnQuaXNUcmlnZ2VyIHx8IChlbGVtLnR5cGUgIT09IFwicmFkaW9cIiAmJiBlbGVtLnR5cGUgIT09IFwiY2hlY2tib3hcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQuaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQucmVtb3ZlKHRoaXMsIFwiLl9jaGFuZ2VcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICFyZm9ybUVsZW1zLnRlc3QodGhpcy5ub2RlTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENyZWF0ZSBcImJ1YmJsaW5nXCIgZm9jdXMgYW5kIGJsdXIgZXZlbnRzXHJcbiAgICBpZiAoIXN1cHBvcnQuZm9jdXNpbkJ1YmJsZXMpIHtcclxuICAgICAgICBqUXVlcnkuZWFjaCh7XHJcbiAgICAgICAgICAgIGZvY3VzOiBcImZvY3VzaW5cIixcclxuICAgICAgICAgICAgYmx1cjogXCJmb2N1c291dFwiXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKG9yaWcsIGZpeCkge1xyXG5cclxuICAgICAgICAgICAgLy8gQXR0YWNoIGEgc2luZ2xlIGNhcHR1cmluZyBoYW5kbGVyIG9uIHRoZSBkb2N1bWVudCB3aGlsZSBzb21lb25lIHdhbnRzIGZvY3VzaW4vZm9jdXNvdXRcclxuICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5zaW11bGF0ZShmaXgsIGV2ZW50LnRhcmdldCwgalF1ZXJ5LmV2ZW50LmZpeChldmVudCksIHRydWUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LnNwZWNpYWxbZml4XSA9IHtcclxuICAgICAgICAgICAgICAgIHNldHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvYyA9IHRoaXMub3duZXJEb2N1bWVudCB8fCB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2hlcyA9IGpRdWVyeS5fZGF0YShkb2MsIGZpeCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYXR0YWNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIob3JpZywgaGFuZGxlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fZGF0YShkb2MsIGZpeCwgKGF0dGFjaGVzIHx8IDApICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gdGhpcy5vd25lckRvY3VtZW50IHx8IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaGVzID0galF1ZXJ5Ll9kYXRhKGRvYywgZml4KSAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYXR0YWNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIob3JpZywgaGFuZGxlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fcmVtb3ZlRGF0YShkb2MsIGZpeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Ll9kYXRhKGRvYywgZml4LCBhdHRhY2hlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeS5mbi5leHRlbmQoe1xyXG5cclxuICAgICAgICBvbjogZnVuY3Rpb24gKHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIC8qSU5URVJOQUwqLyBvbmUpIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUsIG9yaWdGbjtcclxuXHJcbiAgICAgICAgICAgIC8vIFR5cGVzIGNhbiBiZSBhIG1hcCBvZiB0eXBlcy9oYW5kbGVyc1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAoIHR5cGVzLU9iamVjdCwgc2VsZWN0b3IsIGRhdGEgKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICggdHlwZXMtT2JqZWN0LCBkYXRhIClcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YSB8fCBzZWxlY3RvcjtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodHlwZSBpbiB0eXBlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub24odHlwZSwgc2VsZWN0b3IsIGRhdGEsIHR5cGVzW3R5cGVdLCBvbmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhID09IG51bGwgJiYgZm4gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gKCB0eXBlcywgZm4gKVxyXG4gICAgICAgICAgICAgICAgZm4gPSBzZWxlY3RvcjtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBzZWxlY3RvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChmbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKCB0eXBlcywgc2VsZWN0b3IsIGZuIClcclxuICAgICAgICAgICAgICAgICAgICBmbiA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKCB0eXBlcywgZGF0YSwgZm4gKVxyXG4gICAgICAgICAgICAgICAgICAgIGZuID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGZuID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgZm4gPSByZXR1cm5GYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghZm4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob25lID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnRm4gPSBmbjtcclxuICAgICAgICAgICAgICAgIGZuID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuIHVzZSBhbiBlbXB0eSBzZXQsIHNpbmNlIGV2ZW50IGNvbnRhaW5zIHRoZSBpbmZvXHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCkub2ZmKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ0ZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy8gVXNlIHNhbWUgZ3VpZCBzbyBjYWxsZXIgY2FuIHJlbW92ZSB1c2luZyBvcmlnRm5cclxuICAgICAgICAgICAgICAgIGZuLmd1aWQgPSBvcmlnRm4uZ3VpZCB8fCAob3JpZ0ZuLmd1aWQgPSBqUXVlcnkuZ3VpZCsrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5hZGQodGhpcywgdHlwZXMsIGZuLCBkYXRhLCBzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25lOiBmdW5jdGlvbiAodHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbih0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuLCAxKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9mZjogZnVuY3Rpb24gKHR5cGVzLCBzZWxlY3RvciwgZm4pIHtcclxuICAgICAgICAgICAgdmFyIGhhbmRsZU9iaiwgdHlwZTtcclxuICAgICAgICAgICAgaWYgKHR5cGVzICYmIHR5cGVzLnByZXZlbnREZWZhdWx0ICYmIHR5cGVzLmhhbmRsZU9iaikge1xyXG4gICAgICAgICAgICAgICAgLy8gKCBldmVudCApICBkaXNwYXRjaGVkIGpRdWVyeS5FdmVudFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlT2JqID0gdHlwZXMuaGFuZGxlT2JqO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KHR5cGVzLmRlbGVnYXRlVGFyZ2V0KS5vZmYoXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlT2JqLm5hbWVzcGFjZSA/IGhhbmRsZU9iai5vcmlnVHlwZSArIFwiLlwiICsgaGFuZGxlT2JqLm5hbWVzcGFjZSA6IGhhbmRsZU9iai5vcmlnVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVPYmouc2VsZWN0b3IsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlT2JqLmhhbmRsZXJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAoIHR5cGVzLW9iamVjdCBbLCBzZWxlY3Rvcl0gKVxyXG4gICAgICAgICAgICAgICAgZm9yICh0eXBlIGluIHR5cGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmYodHlwZSwgc2VsZWN0b3IsIHR5cGVzW3R5cGVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RvciA9PT0gZmFsc2UgfHwgdHlwZW9mIHNlbGVjdG9yID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICggdHlwZXMgWywgZm5dIClcclxuICAgICAgICAgICAgICAgIGZuID0gc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZm4gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBmbiA9IHJldHVybkZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LnJlbW92ZSh0aGlzLCB0eXBlcywgZm4sIHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24gKHR5cGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlcih0eXBlLCBkYXRhLCB0aGlzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmlnZ2VySGFuZGxlcjogZnVuY3Rpb24gKHR5cGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzWzBdO1xyXG4gICAgICAgICAgICBpZiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5ldmVudC50cmlnZ2VyKHR5cGUsIGRhdGEsIGVsZW0sIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNhZmVGcmFnbWVudChkb2N1bWVudCkge1xyXG4gICAgICAgIHZhciBsaXN0ID0gbm9kZU5hbWVzLnNwbGl0KFwifFwiKSxcclxuICAgICAgICAgICAgc2FmZUZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgICAgIGlmIChzYWZlRnJhZy5jcmVhdGVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChsaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc2FmZUZyYWcuY3JlYXRlRWxlbWVudChcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LnBvcCgpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzYWZlRnJhZztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbm9kZU5hbWVzID0gXCJhYmJyfGFydGljbGV8YXNpZGV8YXVkaW98YmRpfGNhbnZhc3xkYXRhfGRhdGFsaXN0fGRldGFpbHN8ZmlnY2FwdGlvbnxmaWd1cmV8Zm9vdGVyfFwiICtcclxuICAgICAgICBcImhlYWRlcnxoZ3JvdXB8bWFya3xtZXRlcnxuYXZ8b3V0cHV0fHByb2dyZXNzfHNlY3Rpb258c3VtbWFyeXx0aW1lfHZpZGVvXCIsXHJcbiAgICAgICAgcmlubGluZWpRdWVyeSA9IC8galF1ZXJ5XFxkKz1cIig/Om51bGx8XFxkKylcIi9nLFxyXG4gICAgICAgIHJub3NoaW1jYWNoZSA9IG5ldyBSZWdFeHAoXCI8KD86XCIgKyBub2RlTmFtZXMgKyBcIilbXFxcXHMvPl1cIiwgXCJpXCIpLFxyXG4gICAgICAgIHJsZWFkaW5nV2hpdGVzcGFjZSA9IC9eXFxzKy8sXHJcbiAgICAgICAgcnhodG1sVGFnID0gLzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW1xcdzpdKylbXj5dKilcXC8+L2dpLFxyXG4gICAgICAgIHJ0YWdOYW1lID0gLzwoW1xcdzpdKykvLFxyXG4gICAgICAgIHJ0Ym9keSA9IC88dGJvZHkvaSxcclxuICAgICAgICByaHRtbCA9IC88fCYjP1xcdys7LyxcclxuICAgICAgICBybm9Jbm5lcmh0bWwgPSAvPCg/OnNjcmlwdHxzdHlsZXxsaW5rKS9pLFxyXG4gICAgICAgIC8vIGNoZWNrZWQ9XCJjaGVja2VkXCIgb3IgY2hlY2tlZFxyXG4gICAgICAgIHJjaGVja2VkID0gL2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSxcclxuICAgICAgICByc2NyaXB0VHlwZSA9IC9eJHxcXC8oPzpqYXZhfGVjbWEpc2NyaXB0L2ksXHJcbiAgICAgICAgcnNjcmlwdFR5cGVNYXNrZWQgPSAvXnRydWVcXC8oLiopLyxcclxuICAgICAgICByY2xlYW5TY3JpcHQgPSAvXlxccyo8ISg/OlxcW0NEQVRBXFxbfC0tKXwoPzpcXF1cXF18LS0pPlxccyokL2csXHJcblxyXG4gICAgICAgIC8vIFdlIGhhdmUgdG8gY2xvc2UgdGhlc2UgdGFncyB0byBzdXBwb3J0IFhIVE1MICgjMTMyMDApXHJcbiAgICAgICAgd3JhcE1hcCA9IHtcclxuICAgICAgICAgICAgb3B0aW9uOiBbMSwgXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsIFwiPC9zZWxlY3Q+XCJdLFxyXG4gICAgICAgICAgICBsZWdlbmQ6IFsxLCBcIjxmaWVsZHNldD5cIiwgXCI8L2ZpZWxkc2V0PlwiXSxcclxuICAgICAgICAgICAgYXJlYTogWzEsIFwiPG1hcD5cIiwgXCI8L21hcD5cIl0sXHJcbiAgICAgICAgICAgIHBhcmFtOiBbMSwgXCI8b2JqZWN0PlwiLCBcIjwvb2JqZWN0PlwiXSxcclxuICAgICAgICAgICAgdGhlYWQ6IFsxLCBcIjx0YWJsZT5cIiwgXCI8L3RhYmxlPlwiXSxcclxuICAgICAgICAgICAgdHI6IFsyLCBcIjx0YWJsZT48dGJvZHk+XCIsIFwiPC90Ym9keT48L3RhYmxlPlwiXSxcclxuICAgICAgICAgICAgY29sOiBbMiwgXCI8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIl0sXHJcbiAgICAgICAgICAgIHRkOiBbMywgXCI8dGFibGU+PHRib2R5Pjx0cj5cIiwgXCI8L3RyPjwvdGJvZHk+PC90YWJsZT5cIl0sXHJcblxyXG4gICAgICAgICAgICAvLyBJRTYtOCBjYW4ndCBzZXJpYWxpemUgbGluaywgc2NyaXB0LCBzdHlsZSwgb3IgYW55IGh0bWw1IChOb1Njb3BlKSB0YWdzLFxyXG4gICAgICAgICAgICAvLyB1bmxlc3Mgd3JhcHBlZCBpbiBhIGRpdiB3aXRoIG5vbi1icmVha2luZyBjaGFyYWN0ZXJzIGluIGZyb250IG9mIGl0LlxyXG4gICAgICAgICAgICBfZGVmYXVsdDogc3VwcG9ydC5odG1sU2VyaWFsaXplID8gWzAsIFwiXCIsIFwiXCJdIDogWzEsIFwiWDxkaXY+XCIsIFwiPC9kaXY+XCJdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzYWZlRnJhZ21lbnQgPSBjcmVhdGVTYWZlRnJhZ21lbnQoZG9jdW1lbnQpLFxyXG4gICAgICAgIGZyYWdtZW50RGl2ID0gc2FmZUZyYWdtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG5cclxuICAgIHdyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcclxuICAgIHdyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XHJcbiAgICB3cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBbGwoY29udGV4dCwgdGFnKSB7XHJcbiAgICAgICAgdmFyIGVsZW1zLCBlbGVtLFxyXG4gICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgZm91bmQgPSB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gc3RydW5kZWZpbmVkID8gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcgfHwgXCIqXCIpIDpcclxuICAgICAgICAgICAgdHlwZW9mIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCAhPT0gc3RydW5kZWZpbmVkID8gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHRhZyB8fCBcIipcIikgOlxyXG4gICAgICAgICAgICB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmICghZm91bmQpIHtcclxuICAgICAgICAgICAgZm9yIChmb3VuZCA9IFtdLCBlbGVtcyA9IGNvbnRleHQuY2hpbGROb2RlcyB8fCBjb250ZXh0O1xyXG4gICAgICAgICAgICAgICAgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRhZyB8fCBqUXVlcnkubm9kZU5hbWUoZWxlbSwgdGFnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kLnB1c2goZWxlbSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5tZXJnZShmb3VuZCwgZ2V0QWxsKGVsZW0sIHRhZykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGFnID09PSB1bmRlZmluZWQgfHwgdGFnICYmIGpRdWVyeS5ub2RlTmFtZShjb250ZXh0LCB0YWcpID9cclxuICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKFtjb250ZXh0XSwgZm91bmQpIDpcclxuICAgICAgICAgICAgZm91bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXNlZCBpbiBidWlsZEZyYWdtZW50LCBmaXhlcyB0aGUgZGVmYXVsdENoZWNrZWQgcHJvcGVydHlcclxuICAgIGZ1bmN0aW9uIGZpeERlZmF1bHRDaGVja2VkKGVsZW0pIHtcclxuICAgICAgICBpZiAocmNoZWNrYWJsZVR5cGUudGVzdChlbGVtLnR5cGUpKSB7XHJcbiAgICAgICAgICAgIGVsZW0uZGVmYXVsdENoZWNrZWQgPSBlbGVtLmNoZWNrZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFN1cHBvcnQ6IElFPDhcclxuICAgIC8vIE1hbmlwdWxhdGluZyB0YWJsZXMgcmVxdWlyZXMgYSB0Ym9keVxyXG4gICAgZnVuY3Rpb24gbWFuaXB1bGF0aW9uVGFyZ2V0KGVsZW0sIGNvbnRlbnQpIHtcclxuICAgICAgICByZXR1cm4galF1ZXJ5Lm5vZGVOYW1lKGVsZW0sIFwidGFibGVcIikgJiZcclxuICAgICAgICAgICAgalF1ZXJ5Lm5vZGVOYW1lKGNvbnRlbnQubm9kZVR5cGUgIT09IDExID8gY29udGVudCA6IGNvbnRlbnQuZmlyc3RDaGlsZCwgXCJ0clwiKSA/XHJcblxyXG4gICAgICAgICAgICBlbGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGJvZHlcIilbMF0gfHxcclxuICAgICAgICAgICAgZWxlbS5hcHBlbmRDaGlsZChlbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpKSA6XHJcbiAgICAgICAgICAgIGVsZW07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVwbGFjZS9yZXN0b3JlIHRoZSB0eXBlIGF0dHJpYnV0ZSBvZiBzY3JpcHQgZWxlbWVudHMgZm9yIHNhZmUgRE9NIG1hbmlwdWxhdGlvblxyXG4gICAgZnVuY3Rpb24gZGlzYWJsZVNjcmlwdChlbGVtKSB7XHJcbiAgICAgICAgZWxlbS50eXBlID0gKGpRdWVyeS5maW5kLmF0dHIoZWxlbSwgXCJ0eXBlXCIpICE9PSBudWxsKSArIFwiL1wiICsgZWxlbS50eXBlO1xyXG4gICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc3RvcmVTY3JpcHQoZWxlbSkge1xyXG4gICAgICAgIHZhciBtYXRjaCA9IHJzY3JpcHRUeXBlTWFza2VkLmV4ZWMoZWxlbS50eXBlKTtcclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgZWxlbS50eXBlID0gbWF0Y2hbMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoXCJ0eXBlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNYXJrIHNjcmlwdHMgYXMgaGF2aW5nIGFscmVhZHkgYmVlbiBldmFsdWF0ZWRcclxuICAgIGZ1bmN0aW9uIHNldEdsb2JhbEV2YWwoZWxlbXMsIHJlZkVsZW1lbnRzKSB7XHJcbiAgICAgICAgdmFyIGVsZW0sXHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgIGZvciAoO1xyXG4gICAgICAgICAgICAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgalF1ZXJ5Ll9kYXRhKGVsZW0sIFwiZ2xvYmFsRXZhbFwiLCAhcmVmRWxlbWVudHMgfHwgalF1ZXJ5Ll9kYXRhKHJlZkVsZW1lbnRzW2ldLCBcImdsb2JhbEV2YWxcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9uZUNvcHlFdmVudChzcmMsIGRlc3QpIHtcclxuXHJcbiAgICAgICAgaWYgKGRlc3Qubm9kZVR5cGUgIT09IDEgfHwgIWpRdWVyeS5oYXNEYXRhKHNyYykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHR5cGUsIGksIGwsXHJcbiAgICAgICAgICAgIG9sZERhdGEgPSBqUXVlcnkuX2RhdGEoc3JjKSxcclxuICAgICAgICAgICAgY3VyRGF0YSA9IGpRdWVyeS5fZGF0YShkZXN0LCBvbGREYXRhKSxcclxuICAgICAgICAgICAgZXZlbnRzID0gb2xkRGF0YS5ldmVudHM7XHJcblxyXG4gICAgICAgIGlmIChldmVudHMpIHtcclxuICAgICAgICAgICAgZGVsZXRlIGN1ckRhdGEuaGFuZGxlO1xyXG4gICAgICAgICAgICBjdXJEYXRhLmV2ZW50cyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yICh0eXBlIGluIGV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbCA9IGV2ZW50c1t0eXBlXS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQuYWRkKGRlc3QsIHR5cGUsIGV2ZW50c1t0eXBlXVtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1ha2UgdGhlIGNsb25lZCBwdWJsaWMgZGF0YSBvYmplY3QgYSBjb3B5IGZyb20gdGhlIG9yaWdpbmFsXHJcbiAgICAgICAgaWYgKGN1ckRhdGEuZGF0YSkge1xyXG4gICAgICAgICAgICBjdXJEYXRhLmRhdGEgPSBqUXVlcnkuZXh0ZW5kKHt9LCBjdXJEYXRhLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaXhDbG9uZU5vZGVJc3N1ZXMoc3JjLCBkZXN0KSB7XHJcbiAgICAgICAgdmFyIG5vZGVOYW1lLCBlLCBkYXRhO1xyXG5cclxuICAgICAgICAvLyBXZSBkbyBub3QgbmVlZCB0byBkbyBhbnl0aGluZyBmb3Igbm9uLUVsZW1lbnRzXHJcbiAgICAgICAgaWYgKGRlc3Qubm9kZVR5cGUgIT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZU5hbWUgPSBkZXN0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIC8vIElFNi04IGNvcGllcyBldmVudHMgYm91bmQgdmlhIGF0dGFjaEV2ZW50IHdoZW4gdXNpbmcgY2xvbmVOb2RlLlxyXG4gICAgICAgIGlmICghc3VwcG9ydC5ub0Nsb25lRXZlbnQgJiYgZGVzdFtqUXVlcnkuZXhwYW5kb10pIHtcclxuICAgICAgICAgICAgZGF0YSA9IGpRdWVyeS5fZGF0YShkZXN0KTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoZSBpbiBkYXRhLmV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LnJlbW92ZUV2ZW50KGRlc3QsIGUsIGRhdGEuaGFuZGxlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRXZlbnQgZGF0YSBnZXRzIHJlZmVyZW5jZWQgaW5zdGVhZCBvZiBjb3BpZWQgaWYgdGhlIGV4cGFuZG8gZ2V0cyBjb3BpZWQgdG9vXHJcbiAgICAgICAgICAgIGRlc3QucmVtb3ZlQXR0cmlidXRlKGpRdWVyeS5leHBhbmRvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElFIGJsYW5rcyBjb250ZW50cyB3aGVuIGNsb25pbmcgc2NyaXB0cywgYW5kIHRyaWVzIHRvIGV2YWx1YXRlIG5ld2x5LXNldCB0ZXh0XHJcbiAgICAgICAgaWYgKG5vZGVOYW1lID09PSBcInNjcmlwdFwiICYmIGRlc3QudGV4dCAhPT0gc3JjLnRleHQpIHtcclxuICAgICAgICAgICAgZGlzYWJsZVNjcmlwdChkZXN0KS50ZXh0ID0gc3JjLnRleHQ7XHJcbiAgICAgICAgICAgIHJlc3RvcmVTY3JpcHQoZGVzdCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJRTYtMTAgaW1wcm9wZXJseSBjbG9uZXMgY2hpbGRyZW4gb2Ygb2JqZWN0IGVsZW1lbnRzIHVzaW5nIGNsYXNzaWQuXHJcbiAgICAgICAgICAgIC8vIElFMTAgdGhyb3dzIE5vTW9kaWZpY2F0aW9uQWxsb3dlZEVycm9yIGlmIHBhcmVudCBpcyBudWxsLCAjMTIxMzIuXHJcbiAgICAgICAgfSBlbHNlIGlmIChub2RlTmFtZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBpZiAoZGVzdC5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBkZXN0Lm91dGVySFRNTCA9IHNyYy5vdXRlckhUTUw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgcGF0aCBhcHBlYXJzIHVuYXZvaWRhYmxlIGZvciBJRTkuIFdoZW4gY2xvbmluZyBhbiBvYmplY3RcclxuICAgICAgICAgICAgLy8gZWxlbWVudCBpbiBJRTksIHRoZSBvdXRlckhUTUwgc3RyYXRlZ3kgYWJvdmUgaXMgbm90IHN1ZmZpY2llbnQuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBzcmMgaGFzIGlubmVySFRNTCBhbmQgdGhlIGRlc3RpbmF0aW9uIGRvZXMgbm90LFxyXG4gICAgICAgICAgICAvLyBjb3B5IHRoZSBzcmMuaW5uZXJIVE1MIGludG8gdGhlIGRlc3QuaW5uZXJIVE1MLiAjMTAzMjRcclxuICAgICAgICAgICAgaWYgKHN1cHBvcnQuaHRtbDVDbG9uZSAmJiAoc3JjLmlubmVySFRNTCAmJiAhalF1ZXJ5LnRyaW0oZGVzdC5pbm5lckhUTUwpKSkge1xyXG4gICAgICAgICAgICAgICAgZGVzdC5pbm5lckhUTUwgPSBzcmMuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiByY2hlY2thYmxlVHlwZS50ZXN0KHNyYy50eXBlKSkge1xyXG4gICAgICAgICAgICAvLyBJRTYtOCBmYWlscyB0byBwZXJzaXN0IHRoZSBjaGVja2VkIHN0YXRlIG9mIGEgY2xvbmVkIGNoZWNrYm94XHJcbiAgICAgICAgICAgIC8vIG9yIHJhZGlvIGJ1dHRvbi4gV29yc2UsIElFNi03IGZhaWwgdG8gZ2l2ZSB0aGUgY2xvbmVkIGVsZW1lbnRcclxuICAgICAgICAgICAgLy8gYSBjaGVja2VkIGFwcGVhcmFuY2UgaWYgdGhlIGRlZmF1bHRDaGVja2VkIHZhbHVlIGlzbid0IGFsc28gc2V0XHJcblxyXG4gICAgICAgICAgICBkZXN0LmRlZmF1bHRDaGVja2VkID0gZGVzdC5jaGVja2VkID0gc3JjLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyBJRTYtNyBnZXQgY29uZnVzZWQgYW5kIGVuZCB1cCBzZXR0aW5nIHRoZSB2YWx1ZSBvZiBhIGNsb25lZFxyXG4gICAgICAgICAgICAvLyBjaGVja2JveC9yYWRpbyBidXR0b24gdG8gYW4gZW1wdHkgc3RyaW5nIGluc3RlYWQgb2YgXCJvblwiXHJcbiAgICAgICAgICAgIGlmIChkZXN0LnZhbHVlICE9PSBzcmMudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGRlc3QudmFsdWUgPSBzcmMudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElFNi04IGZhaWxzIHRvIHJldHVybiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRvIHRoZSBkZWZhdWx0IHNlbGVjdGVkXHJcbiAgICAgICAgICAgIC8vIHN0YXRlIHdoZW4gY2xvbmluZyBvcHRpb25zXHJcbiAgICAgICAgfSBlbHNlIGlmIChub2RlTmFtZSA9PT0gXCJvcHRpb25cIikge1xyXG4gICAgICAgICAgICBkZXN0LmRlZmF1bHRTZWxlY3RlZCA9IGRlc3Quc2VsZWN0ZWQgPSBzcmMuZGVmYXVsdFNlbGVjdGVkO1xyXG5cclxuICAgICAgICAgICAgLy8gSUU2LTggZmFpbHMgdG8gc2V0IHRoZSBkZWZhdWx0VmFsdWUgdG8gdGhlIGNvcnJlY3QgdmFsdWUgd2hlblxyXG4gICAgICAgICAgICAvLyBjbG9uaW5nIG90aGVyIHR5cGVzIG9mIGlucHV0IGZpZWxkc1xyXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZU5hbWUgPT09IFwiaW5wdXRcIiB8fCBub2RlTmFtZSA9PT0gXCJ0ZXh0YXJlYVwiKSB7XHJcbiAgICAgICAgICAgIGRlc3QuZGVmYXVsdFZhbHVlID0gc3JjLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZCh7XHJcbiAgICAgICAgY2xvbmU6IGZ1bmN0aW9uIChlbGVtLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cykge1xyXG4gICAgICAgICAgICB2YXIgZGVzdEVsZW1lbnRzLCBub2RlLCBjbG9uZSwgaSwgc3JjRWxlbWVudHMsXHJcbiAgICAgICAgICAgICAgICBpblBhZ2UgPSBqUXVlcnkuY29udGFpbnMoZWxlbS5vd25lckRvY3VtZW50LCBlbGVtKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdXBwb3J0Lmh0bWw1Q2xvbmUgfHwgalF1ZXJ5LmlzWE1MRG9jKGVsZW0pIHx8ICFybm9zaGltY2FjaGUudGVzdChcIjxcIiArIGVsZW0ubm9kZU5hbWUgKyBcIj5cIikpIHtcclxuICAgICAgICAgICAgICAgIGNsb25lID0gZWxlbS5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSUU8PTggZG9lcyBub3QgcHJvcGVybHkgY2xvbmUgZGV0YWNoZWQsIHVua25vd24gZWxlbWVudCBub2Rlc1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnREaXYuaW5uZXJIVE1MID0gZWxlbS5vdXRlckhUTUw7XHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudERpdi5yZW1vdmVDaGlsZChjbG9uZSA9IGZyYWdtZW50RGl2LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKCFzdXBwb3J0Lm5vQ2xvbmVFdmVudCB8fCAhc3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCkgJiZcclxuICAgICAgICAgICAgICAgIChlbGVtLm5vZGVUeXBlID09PSAxIHx8IGVsZW0ubm9kZVR5cGUgPT09IDExKSAmJiAhalF1ZXJ5LmlzWE1MRG9jKGVsZW0pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gV2UgZXNjaGV3IFNpenpsZSBoZXJlIGZvciBwZXJmb3JtYW5jZSByZWFzb25zOiBodHRwOi8vanNwZXJmLmNvbS9nZXRhbGwtdnMtc2l6emxlLzJcclxuICAgICAgICAgICAgICAgIGRlc3RFbGVtZW50cyA9IGdldEFsbChjbG9uZSk7XHJcbiAgICAgICAgICAgICAgICBzcmNFbGVtZW50cyA9IGdldEFsbChlbGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGaXggYWxsIElFIGNsb25pbmcgaXNzdWVzXHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIChub2RlID0gc3JjRWxlbWVudHNbaV0pICE9IG51bGw7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBkZXN0aW5hdGlvbiBub2RlIGlzIG5vdCBudWxsOyBGaXhlcyAjOTU4N1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXN0RWxlbWVudHNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZml4Q2xvbmVOb2RlSXNzdWVzKG5vZGUsIGRlc3RFbGVtZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDb3B5IHRoZSBldmVudHMgZnJvbSB0aGUgb3JpZ2luYWwgdG8gdGhlIGNsb25lXHJcbiAgICAgICAgICAgIGlmIChkYXRhQW5kRXZlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVlcERhdGFBbmRFdmVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcmNFbGVtZW50cyA9IHNyY0VsZW1lbnRzIHx8IGdldEFsbChlbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBkZXN0RWxlbWVudHMgPSBkZXN0RWxlbWVudHMgfHwgZ2V0QWxsKGNsb25lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG5vZGUgPSBzcmNFbGVtZW50c1tpXSkgIT0gbnVsbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lQ29weUV2ZW50KG5vZGUsIGRlc3RFbGVtZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9uZUNvcHlFdmVudChlbGVtLCBjbG9uZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3RvcnlcclxuICAgICAgICAgICAgZGVzdEVsZW1lbnRzID0gZ2V0QWxsKGNsb25lLCBcInNjcmlwdFwiKTtcclxuICAgICAgICAgICAgaWYgKGRlc3RFbGVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRHbG9iYWxFdmFsKGRlc3RFbGVtZW50cywgIWluUGFnZSAmJiBnZXRBbGwoZWxlbSwgXCJzY3JpcHRcIikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZXN0RWxlbWVudHMgPSBzcmNFbGVtZW50cyA9IG5vZGUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBjbG9uZWQgc2V0XHJcbiAgICAgICAgICAgIHJldHVybiBjbG9uZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBidWlsZEZyYWdtZW50OiBmdW5jdGlvbiAoZWxlbXMsIGNvbnRleHQsIHNjcmlwdHMsIHNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgaiwgZWxlbSwgY29udGFpbnMsXHJcbiAgICAgICAgICAgICAgICB0bXAsIHRhZywgdGJvZHksIHdyYXAsXHJcbiAgICAgICAgICAgICAgICBsID0gZWxlbXMubGVuZ3RoLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEVuc3VyZSBhIHNhZmUgZnJhZ21lbnRcclxuICAgICAgICAgICAgICAgIHNhZmUgPSBjcmVhdGVTYWZlRnJhZ21lbnQoY29udGV4dCksXHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZXMgPSBbXSxcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yICg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbSB8fCBlbGVtID09PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBub2RlcyBkaXJlY3RseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqUXVlcnkudHlwZShlbGVtKSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkubWVyZ2Uobm9kZXMsIGVsZW0ubm9kZVR5cGUgPyBbZWxlbV0gOiBlbGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgbm9uLWh0bWwgaW50byBhIHRleHQgbm9kZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXJodG1sLnRlc3QoZWxlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChjb250ZXh0LmNyZWF0ZVRleHROb2RlKGVsZW0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgaHRtbCBpbnRvIERPTSBub2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRtcCB8fCBzYWZlLmFwcGVuZENoaWxkKGNvbnRleHQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEZXNlcmlhbGl6ZSBhIHN0YW5kYXJkIHJlcHJlc2VudGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZyA9IChydGFnTmFtZS5leGVjKGVsZW0pIHx8IFtcIlwiLCBcIlwiXSlbMV0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JhcCA9IHdyYXBNYXBbdGFnXSB8fCB3cmFwTWFwLl9kZWZhdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wLmlubmVySFRNTCA9IHdyYXBbMV0gKyBlbGVtLnJlcGxhY2UocnhodG1sVGFnLCBcIjwkMT48LyQyPlwiKSArIHdyYXBbMl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEZXNjZW5kIHRocm91Z2ggd3JhcHBlcnMgdG8gdGhlIHJpZ2h0IGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IHdyYXBbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChqLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRtcC5sYXN0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1hbnVhbGx5IGFkZCBsZWFkaW5nIHdoaXRlc3BhY2UgcmVtb3ZlZCBieSBJRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN1cHBvcnQubGVhZGluZ1doaXRlc3BhY2UgJiYgcmxlYWRpbmdXaGl0ZXNwYWNlLnRlc3QoZWxlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLnB1c2goY29udGV4dC5jcmVhdGVUZXh0Tm9kZShybGVhZGluZ1doaXRlc3BhY2UuZXhlYyhlbGVtKVswXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgSUUncyBhdXRvaW5zZXJ0ZWQgPHRib2R5PiBmcm9tIHRhYmxlIGZyYWdtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN1cHBvcnQudGJvZHkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdHJpbmcgd2FzIGEgPHRhYmxlPiwgKm1heSogaGF2ZSBzcHVyaW91cyA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gdGFnID09PSBcInRhYmxlXCIgJiYgIXJ0Ym9keS50ZXN0KGVsZW0pID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXAuZmlyc3RDaGlsZCA6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0cmluZyB3YXMgYSBiYXJlIDx0aGVhZD4gb3IgPHRmb290PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBbMV0gPT09IFwiPHRhYmxlPlwiICYmICFydGJvZHkudGVzdChlbGVtKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSBlbGVtICYmIGVsZW0uY2hpbGROb2Rlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoai0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGpRdWVyeS5ub2RlTmFtZSgodGJvZHkgPSBlbGVtLmNoaWxkTm9kZXNbal0pLCBcInRib2R5XCIpICYmICF0Ym9keS5jaGlsZE5vZGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUNoaWxkKHRib2R5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5tZXJnZShub2RlcywgdG1wLmNoaWxkTm9kZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRml4ICMxMjM5MiBmb3IgV2ViS2l0IGFuZCBJRSA+IDlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wLnRleHRDb250ZW50ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpeCAjMTIzOTIgZm9yIG9sZElFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0bXAuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wLnJlbW92ZUNoaWxkKHRtcC5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhlIHRvcC1sZXZlbCBjb250YWluZXIgZm9yIHByb3BlciBjbGVhbnVwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHNhZmUubGFzdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRml4ICMxMTM1NjogQ2xlYXIgZWxlbWVudHMgZnJvbSBmcmFnbWVudFxyXG4gICAgICAgICAgICBpZiAodG1wKSB7XHJcbiAgICAgICAgICAgICAgICBzYWZlLnJlbW92ZUNoaWxkKHRtcCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlc2V0IGRlZmF1bHRDaGVja2VkIGZvciBhbnkgcmFkaW9zIGFuZCBjaGVja2JveGVzXHJcbiAgICAgICAgICAgIC8vIGFib3V0IHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBET00gaW4gSUUgNi83ICgjODA2MClcclxuICAgICAgICAgICAgaWYgKCFzdXBwb3J0LmFwcGVuZENoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ncmVwKGdldEFsbChub2RlcywgXCJpbnB1dFwiKSwgZml4RGVmYXVsdENoZWNrZWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKChlbGVtID0gbm9kZXNbaSsrXSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAjNDA4NyAtIElmIG9yaWdpbiBhbmQgZGVzdGluYXRpb24gZWxlbWVudHMgYXJlIHRoZSBzYW1lLCBhbmQgdGhpcyBpc1xyXG4gICAgICAgICAgICAgICAgLy8gdGhhdCBlbGVtZW50LCBkbyBub3QgZG8gYW55dGhpbmdcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24gJiYgalF1ZXJ5LmluQXJyYXkoZWxlbSwgc2VsZWN0aW9uKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWlucyA9IGpRdWVyeS5jb250YWlucyhlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0byBmcmFnbWVudFxyXG4gICAgICAgICAgICAgICAgdG1wID0gZ2V0QWxsKHNhZmUuYXBwZW5kQ2hpbGQoZWxlbSksIFwic2NyaXB0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3RvcnlcclxuICAgICAgICAgICAgICAgIGlmIChjb250YWlucykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEdsb2JhbEV2YWwodG1wKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDYXB0dXJlIGV4ZWN1dGFibGVzXHJcbiAgICAgICAgICAgICAgICBpZiAoc2NyaXB0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoZWxlbSA9IHRtcFtqKytdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNjcmlwdFR5cGUudGVzdChlbGVtLnR5cGUgfHwgXCJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdHMucHVzaChlbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdG1wID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzYWZlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsZWFuRGF0YTogZnVuY3Rpb24gKGVsZW1zLCAvKiBpbnRlcm5hbCAqLyBhY2NlcHREYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtLCB0eXBlLCBpZCwgZGF0YSxcclxuICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgaW50ZXJuYWxLZXkgPSBqUXVlcnkuZXhwYW5kbyxcclxuICAgICAgICAgICAgICAgIGNhY2hlID0galF1ZXJ5LmNhY2hlLFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlRXhwYW5kbyA9IHN1cHBvcnQuZGVsZXRlRXhwYW5kbyxcclxuICAgICAgICAgICAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbDtcclxuXHJcbiAgICAgICAgICAgIGZvciAoO1xyXG4gICAgICAgICAgICAgICAgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWNjZXB0RGF0YSB8fCBqUXVlcnkuYWNjZXB0RGF0YShlbGVtKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZCA9IGVsZW1baW50ZXJuYWxLZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBpZCAmJiBjYWNoZVtpZF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh0eXBlIGluIGRhdGEuZXZlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWNpYWxbdHlwZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LnJlbW92ZShlbGVtLCB0eXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBzaG9ydGN1dCB0byBhdm9pZCBqUXVlcnkuZXZlbnQucmVtb3ZlJ3Mgb3ZlcmhlYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkucmVtb3ZlRXZlbnQoZWxlbSwgdHlwZSwgZGF0YS5oYW5kbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGNhY2hlIG9ubHkgaWYgaXQgd2FzIG5vdCBhbHJlYWR5IHJlbW92ZWQgYnkgalF1ZXJ5LmV2ZW50LnJlbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGVbaWRdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhY2hlW2lkXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJRSBkb2VzIG5vdCBhbGxvdyB1cyB0byBkZWxldGUgZXhwYW5kbyBwcm9wZXJ0aWVzIGZyb20gbm9kZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub3IgZG9lcyBpdCBoYXZlIGEgcmVtb3ZlQXR0cmlidXRlIGZ1bmN0aW9uIG9uIERvY3VtZW50IG5vZGVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UgbXVzdCBoYW5kbGUgYWxsIG9mIHRoZXNlIGNhc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVsZXRlRXhwYW5kbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlbGVtW2ludGVybmFsS2V5XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtLnJlbW92ZUF0dHJpYnV0ZSAhPT0gc3RydW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoaW50ZXJuYWxLZXkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbVtpbnRlcm5hbEtleV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZWRJZHMucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkuZm4uZXh0ZW5kKHtcclxuICAgICAgICB0ZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzcyh0aGlzLCBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkudGV4dCh0aGlzKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eSgpLmFwcGVuZCgodGhpc1swXSAmJiB0aGlzWzBdLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpLmNyZWF0ZVRleHROb2RlKHZhbHVlKSk7XHJcbiAgICAgICAgICAgIH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhcHBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLCBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQodGhpcywgZWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwcmVwZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRvbU1hbmlwKGFyZ3VtZW50cywgZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KHRoaXMsIGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUoZWxlbSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiZWZvcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLCBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWxlbSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFmdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRvbU1hbmlwKGFyZ3VtZW50cywgZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsZW0sIHRoaXMubmV4dFNpYmxpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIChzZWxlY3Rvciwga2VlcERhdGEgLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtLFxyXG4gICAgICAgICAgICAgICAgZWxlbXMgPSBzZWxlY3RvciA/IGpRdWVyeS5maWx0ZXIoc2VsZWN0b3IsIHRoaXMpIDogdGhpcyxcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yICg7XHJcbiAgICAgICAgICAgICAgICAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWtlZXBEYXRhICYmIGVsZW0ubm9kZVR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuY2xlYW5EYXRhKGdldEFsbChlbGVtKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0ucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZWVwRGF0YSAmJiBqUXVlcnkuY29udGFpbnMoZWxlbS5vd25lckRvY3VtZW50LCBlbGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRHbG9iYWxFdmFsKGdldEFsbChlbGVtLCBcInNjcmlwdFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW1wdHk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGVsZW0sXHJcbiAgICAgICAgICAgICAgICBpID0gMDtcclxuXHJcbiAgICAgICAgICAgIGZvciAoO1xyXG4gICAgICAgICAgICAgICAgKGVsZW0gPSB0aGlzW2ldKSAhPSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBlbGVtZW50IG5vZGVzIGFuZCBwcmV2ZW50IG1lbW9yeSBsZWFrc1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0ubm9kZVR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuY2xlYW5EYXRhKGdldEFsbChlbGVtLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBhbnkgcmVtYWluaW5nIG5vZGVzXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoZWxlbS5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVDaGlsZChlbGVtLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYSBzZWxlY3QsIGVuc3VyZSB0aGF0IGl0IGRpc3BsYXlzIGVtcHR5ICgjMTIzMzYpXHJcbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw5XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5vcHRpb25zICYmIGpRdWVyeS5ub2RlTmFtZShlbGVtLCBcInNlbGVjdFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0ub3B0aW9ucy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbG9uZTogZnVuY3Rpb24gKGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzKSB7XHJcbiAgICAgICAgICAgIGRhdGFBbmRFdmVudHMgPSBkYXRhQW5kRXZlbnRzID09IG51bGwgPyBmYWxzZSA6IGRhdGFBbmRFdmVudHM7XHJcbiAgICAgICAgICAgIGRlZXBEYXRhQW5kRXZlbnRzID0gZGVlcERhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGRhdGFBbmRFdmVudHMgOiBkZWVwRGF0YUFuZEV2ZW50cztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4galF1ZXJ5LmNsb25lKHRoaXMsIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaHRtbDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3ModGhpcywgZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXNbMF0gfHwge30sXHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbCA9IHRoaXMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0ubm9kZVR5cGUgPT09IDEgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTC5yZXBsYWNlKHJpbmxpbmVqUXVlcnksIFwiXCIpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNlZSBpZiB3ZSBjYW4gdGFrZSBhIHNob3J0Y3V0IGFuZCBqdXN0IHVzZSBpbm5lckhUTUxcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgIXJub0lubmVyaHRtbC50ZXN0KHZhbHVlKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChzdXBwb3J0Lmh0bWxTZXJpYWxpemUgfHwgIXJub3NoaW1jYWNoZS50ZXN0KHZhbHVlKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAoc3VwcG9ydC5sZWFkaW5nV2hpdGVzcGFjZSB8fCAhcmxlYWRpbmdXaGl0ZXNwYWNlLnRlc3QodmFsdWUpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICF3cmFwTWFwWyhydGFnTmFtZS5leGVjKHZhbHVlKSB8fCBbXCJcIiwgXCJcIl0pWzFdLnRvTG93ZXJDYXNlKCldKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShyeGh0bWxUYWcsIFwiPCQxPjwvJDI+XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gdGhpc1tpXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtLm5vZGVUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmNsZWFuRGF0YShnZXRBbGwoZWxlbSwgZmFsc2UpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHVzaW5nIGlubmVySFRNTCB0aHJvd3MgYW4gZXhjZXB0aW9uLCB1c2UgdGhlIGZhbGxiYWNrIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5KCkuYXBwZW5kKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlcGxhY2VXaXRoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbMF07XHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIHRoZSBjaGFuZ2VzLCByZXBsYWNpbmcgZWFjaCBjb250ZXh0IGVsZW1lbnQgd2l0aCB0aGUgbmV3IGNvbnRlbnRcclxuICAgICAgICAgICAgdGhpcy5kb21NYW5pcChhcmd1bWVudHMsIGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICBhcmcgPSB0aGlzLnBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LmNsZWFuRGF0YShnZXRBbGwodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhcmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmcucmVwbGFjZUNoaWxkKGVsZW0sIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZvcmNlIHJlbW92YWwgaWYgdGhlcmUgd2FzIG5vIG5ldyBjb250ZW50IChlLmcuLCBmcm9tIGVtcHR5IGFyZ3VtZW50cylcclxuICAgICAgICAgICAgcmV0dXJuIGFyZyAmJiAoYXJnLmxlbmd0aCB8fCBhcmcubm9kZVR5cGUpID8gdGhpcyA6IHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGV0YWNoOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlKHNlbGVjdG9yLCB0cnVlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkb21NYW5pcDogZnVuY3Rpb24gKGFyZ3MsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXHJcbiAgICAgICAgICAgIGFyZ3MgPSBjb25jYXQuYXBwbHkoW10sIGFyZ3MpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpcnN0LCBub2RlLCBoYXNTY3JpcHRzLFxyXG4gICAgICAgICAgICAgICAgc2NyaXB0cywgZG9jLCBmcmFnbWVudCxcclxuICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgbCA9IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgc2V0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGlOb0Nsb25lID0gbCAtIDEsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGFyZ3NbMF0sXHJcbiAgICAgICAgICAgICAgICBpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24odmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gV2UgY2FuJ3QgY2xvbmVOb2RlIGZyYWdtZW50cyB0aGF0IGNvbnRhaW4gY2hlY2tlZCwgaW4gV2ViS2l0XHJcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uIHx8XHJcbiAgICAgICAgICAgICAgICAobCA+IDEgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIXN1cHBvcnQuY2hlY2tDbG9uZSAmJiByY2hlY2tlZC50ZXN0KHZhbHVlKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGYgPSBzZXQuZXEoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3NbMF0gPSB2YWx1ZS5jYWxsKHRoaXMsIGluZGV4LCBzZWxmLmh0bWwoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZG9tTWFuaXAoYXJncywgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsKSB7XHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IGpRdWVyeS5idWlsZEZyYWdtZW50KGFyZ3MsIHRoaXNbMF0ub3duZXJEb2N1bWVudCwgZmFsc2UsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgZmlyc3QgPSBmcmFnbWVudC5maXJzdENoaWxkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmcmFnbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gZmlyc3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0cyA9IGpRdWVyeS5tYXAoZ2V0QWxsKGZyYWdtZW50LCBcInNjcmlwdFwiKSwgZGlzYWJsZVNjcmlwdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzU2NyaXB0cyA9IHNjcmlwdHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIG9yaWdpbmFsIGZyYWdtZW50IGZvciB0aGUgbGFzdCBpdGVtIGluc3RlYWQgb2YgdGhlIGZpcnN0IGJlY2F1c2UgaXQgY2FuIGVuZCB1cFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJlaW5nIGVtcHRpZWQgaW5jb3JyZWN0bHkgaW4gY2VydGFpbiBzaXR1YXRpb25zICgjODA3MCkuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGZyYWdtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IGlOb0Nsb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0galF1ZXJ5LmNsb25lKG5vZGUsIHRydWUsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgcmVmZXJlbmNlcyB0byBjbG9uZWQgc2NyaXB0cyBmb3IgbGF0ZXIgcmVzdG9yYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNTY3JpcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKHNjcmlwdHMsIGdldEFsbChub2RlLCBcInNjcmlwdFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc1tpXSwgbm9kZSwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzU2NyaXB0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2MgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0ub3duZXJEb2N1bWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZW5hYmxlIHNjcmlwdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lm1hcChzY3JpcHRzLCByZXN0b3JlU2NyaXB0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV2YWx1YXRlIGV4ZWN1dGFibGUgc2NyaXB0cyBvbiBmaXJzdCBkb2N1bWVudCBpbnNlcnRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGhhc1NjcmlwdHM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHNjcmlwdHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNjcmlwdFR5cGUudGVzdChub2RlLnR5cGUgfHwgXCJcIikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhalF1ZXJ5Ll9kYXRhKG5vZGUsIFwiZ2xvYmFsRXZhbFwiKSAmJiBqUXVlcnkuY29udGFpbnMoZG9jLCBub2RlKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5zcmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3B0aW9uYWwgQUpBWCBkZXBlbmRlbmN5LCBidXQgd29uJ3QgcnVuIHNjcmlwdHMgaWYgbm90IHByZXNlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGpRdWVyeS5fZXZhbFVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Ll9ldmFsVXJsKG5vZGUuc3JjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5nbG9iYWxFdmFsKChub2RlLnRleHQgfHwgbm9kZS50ZXh0Q29udGVudCB8fCBub2RlLmlubmVySFRNTCB8fCBcIlwiKS5yZXBsYWNlKHJjbGVhblNjcmlwdCwgXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRml4ICMxMTgwOTogQXZvaWQgbGVha2luZyBtZW1vcnlcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudCA9IGZpcnN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LmVhY2goe1xyXG4gICAgICAgIGFwcGVuZFRvOiBcImFwcGVuZFwiLFxyXG4gICAgICAgIHByZXBlbmRUbzogXCJwcmVwZW5kXCIsXHJcbiAgICAgICAgaW5zZXJ0QmVmb3JlOiBcImJlZm9yZVwiLFxyXG4gICAgICAgIGluc2VydEFmdGVyOiBcImFmdGVyXCIsXHJcbiAgICAgICAgcmVwbGFjZUFsbDogXCJyZXBsYWNlV2l0aFwiXHJcbiAgICB9LCBmdW5jdGlvbiAobmFtZSwgb3JpZ2luYWwpIHtcclxuICAgICAgICBqUXVlcnkuZm5bbmFtZV0gPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgdmFyIGVsZW1zLFxyXG4gICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICByZXQgPSBbXSxcclxuICAgICAgICAgICAgICAgIGluc2VydCA9IGpRdWVyeShzZWxlY3RvciksXHJcbiAgICAgICAgICAgICAgICBsYXN0ID0gaW5zZXJ0Lmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgICAgICBmb3IgKDsgaSA8PSBsYXN0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGVsZW1zID0gaSA9PT0gbGFzdCA/IHRoaXMgOiB0aGlzLmNsb25lKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KGluc2VydFtpXSlbb3JpZ2luYWxdKGVsZW1zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBNb2Rlcm4gYnJvd3NlcnMgY2FuIGFwcGx5IGpRdWVyeSBjb2xsZWN0aW9ucyBhcyBhcnJheXMsIGJ1dCBvbGRJRSBuZWVkcyBhIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgcHVzaC5hcHBseShyZXQsIGVsZW1zLmdldCgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKHJldCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgaWZyYW1lLFxyXG4gICAgICAgIGVsZW1kaXNwbGF5ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZSB0aGUgYWN0dWFsIGRpc3BsYXkgb2YgYSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBub2RlTmFtZSBvZiB0aGUgZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRvYyBEb2N1bWVudCBvYmplY3RcclxuICAgICAqL1xyXG4gICAgLy8gQ2FsbGVkIG9ubHkgZnJvbSB3aXRoaW4gZGVmYXVsdERpc3BsYXlcclxuICAgIGZ1bmN0aW9uIGFjdHVhbERpc3BsYXkobmFtZSwgZG9jKSB7XHJcbiAgICAgICAgdmFyIGVsZW0gPSBqUXVlcnkoZG9jLmNyZWF0ZUVsZW1lbnQobmFtZSkpLmFwcGVuZFRvKGRvYy5ib2R5KSxcclxuXHJcbiAgICAgICAgICAgIC8vIGdldERlZmF1bHRDb21wdXRlZFN0eWxlIG1pZ2h0IGJlIHJlbGlhYmx5IHVzZWQgb25seSBvbiBhdHRhY2hlZCBlbGVtZW50XHJcbiAgICAgICAgICAgIGRpc3BsYXkgPSB3aW5kb3cuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUgP1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlIG9mIHRoaXMgbWV0aG9kIGlzIGEgdGVtcG9yYXJ5IGZpeCAobW9yZSBsaWtlIG9wdG1pemF0aW9uKSB1bnRpbCBzb21ldGhpbmcgYmV0dGVyIGNvbWVzIGFsb25nLFxyXG4gICAgICAgICAgICAvLyBzaW5jZSBpdCB3YXMgcmVtb3ZlZCBmcm9tIHNwZWNpZmljYXRpb24gYW5kIHN1cHBvcnRlZCBvbmx5IGluIEZGXHJcbiAgICAgICAgICAgIHdpbmRvdy5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZShlbGVtWzBdKS5kaXNwbGF5IDogalF1ZXJ5LmNzcyhlbGVtWzBdLCBcImRpc3BsYXlcIik7XHJcblxyXG4gICAgICAgIC8vIFdlIGRvbid0IGhhdmUgYW55IGRhdGEgc3RvcmVkIG9uIHRoZSBlbGVtZW50LFxyXG4gICAgICAgIC8vIHNvIHVzZSBcImRldGFjaFwiIG1ldGhvZCBhcyBmYXN0IHdheSB0byBnZXQgcmlkIG9mIHRoZSBlbGVtZW50XHJcbiAgICAgICAgZWxlbS5kZXRhY2goKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpc3BsYXk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcnkgdG8gZGV0ZXJtaW5lIHRoZSBkZWZhdWx0IGRpc3BsYXkgdmFsdWUgb2YgYW4gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5vZGVOYW1lXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGRlZmF1bHREaXNwbGF5KG5vZGVOYW1lKSB7XHJcbiAgICAgICAgdmFyIGRvYyA9IGRvY3VtZW50LFxyXG4gICAgICAgICAgICBkaXNwbGF5ID0gZWxlbWRpc3BsYXlbbm9kZU5hbWVdO1xyXG5cclxuICAgICAgICBpZiAoIWRpc3BsYXkpIHtcclxuICAgICAgICAgICAgZGlzcGxheSA9IGFjdHVhbERpc3BsYXkobm9kZU5hbWUsIGRvYyk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgc2ltcGxlIHdheSBmYWlscywgcmVhZCBmcm9tIGluc2lkZSBhbiBpZnJhbWVcclxuICAgICAgICAgICAgaWYgKGRpc3BsYXkgPT09IFwibm9uZVwiIHx8ICFkaXNwbGF5KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBhbHJlYWR5LWNyZWF0ZWQgaWZyYW1lIGlmIHBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICBpZnJhbWUgPSAoaWZyYW1lIHx8IGpRdWVyeShcIjxpZnJhbWUgZnJhbWVib3JkZXI9JzAnIHdpZHRoPScwJyBoZWlnaHQ9JzAnLz5cIikpLmFwcGVuZFRvKGRvYy5kb2N1bWVudEVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFsd2F5cyB3cml0ZSBhIG5ldyBIVE1MIHNrZWxldG9uIHNvIFdlYmtpdCBhbmQgRmlyZWZveCBkb24ndCBjaG9rZSBvbiByZXVzZVxyXG4gICAgICAgICAgICAgICAgZG9jID0gKGlmcmFtZVswXS5jb250ZW50V2luZG93IHx8IGlmcmFtZVswXS5jb250ZW50RG9jdW1lbnQpLmRvY3VtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFXHJcbiAgICAgICAgICAgICAgICBkb2Mud3JpdGUoKTtcclxuICAgICAgICAgICAgICAgIGRvYy5jbG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPSBhY3R1YWxEaXNwbGF5KG5vZGVOYW1lLCBkb2MpO1xyXG4gICAgICAgICAgICAgICAgaWZyYW1lLmRldGFjaCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTdG9yZSB0aGUgY29ycmVjdCBkZWZhdWx0IGRpc3BsYXlcclxuICAgICAgICAgICAgZWxlbWRpc3BsYXlbbm9kZU5hbWVdID0gZGlzcGxheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkaXNwbGF5O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhLCBzaHJpbmtXcmFwQmxvY2tzVmFsLFxyXG4gICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxyXG4gICAgICAgICAgICBkaXZSZXNldCA9XHJcbiAgICAgICAgICAgIFwiLXdlYmtpdC1ib3gtc2l6aW5nOmNvbnRlbnQtYm94Oy1tb3otYm94LXNpemluZzpjb250ZW50LWJveDtib3gtc2l6aW5nOmNvbnRlbnQtYm94O1wiICtcclxuICAgICAgICAgICAgXCJkaXNwbGF5OmJsb2NrO3BhZGRpbmc6MDttYXJnaW46MDtib3JkZXI6MFwiO1xyXG5cclxuICAgICAgICAvLyBTZXR1cFxyXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBcIiAgPGxpbmsvPjx0YWJsZT48L3RhYmxlPjxhIGhyZWY9Jy9hJz5hPC9hPjxpbnB1dCB0eXBlPSdjaGVja2JveCcvPlwiO1xyXG4gICAgICAgIGEgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhXCIpWzBdO1xyXG5cclxuICAgICAgICBhLnN0eWxlLmNzc1RleHQgPSBcImZsb2F0OmxlZnQ7b3BhY2l0eTouNVwiO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBlbGVtZW50IG9wYWNpdHkgZXhpc3RzXHJcbiAgICAgICAgLy8gKElFIHVzZXMgZmlsdGVyIGluc3RlYWQpXHJcbiAgICAgICAgLy8gVXNlIGEgcmVnZXggdG8gd29yayBhcm91bmQgYSBXZWJLaXQgaXNzdWUuIFNlZSAjNTE0NVxyXG4gICAgICAgIHN1cHBvcnQub3BhY2l0eSA9IC9eMC41Ly50ZXN0KGEuc3R5bGUub3BhY2l0eSk7XHJcblxyXG4gICAgICAgIC8vIFZlcmlmeSBzdHlsZSBmbG9hdCBleGlzdGVuY2VcclxuICAgICAgICAvLyAoSUUgdXNlcyBzdHlsZUZsb2F0IGluc3RlYWQgb2YgY3NzRmxvYXQpXHJcbiAgICAgICAgc3VwcG9ydC5jc3NGbG9hdCA9ICEhYS5zdHlsZS5jc3NGbG9hdDtcclxuXHJcbiAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJjb250ZW50LWJveFwiO1xyXG4gICAgICAgIGRpdi5jbG9uZU5vZGUodHJ1ZSkuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcIlwiO1xyXG4gICAgICAgIHN1cHBvcnQuY2xlYXJDbG9uZVN0eWxlID0gZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID09PSBcImNvbnRlbnQtYm94XCI7XHJcblxyXG4gICAgICAgIC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUUuXHJcbiAgICAgICAgYSA9IGRpdiA9IG51bGw7XHJcblxyXG4gICAgICAgIHN1cHBvcnQuc2hyaW5rV3JhcEJsb2NrcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGJvZHksIGNvbnRhaW5lciwgZGl2LCBjb250YWluZXJTdHlsZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2hyaW5rV3JhcEJsb2Nrc1ZhbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFib2R5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGVzdCBmaXJlZCB0b28gZWFybHkgb3IgaW4gYW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnQsIGV4aXQuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclN0eWxlcyA9IFwiYm9yZGVyOjA7d2lkdGg6MDtoZWlnaHQ6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0Oi05OTk5cHhcIjtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFdpbGwgYmUgY2hhbmdlZCBsYXRlciBpZiBuZWVkZWQuXHJcbiAgICAgICAgICAgICAgICBzaHJpbmtXcmFwQmxvY2tzVmFsID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkaXYuc3R5bGUuem9vbSAhPT0gc3RydW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU2XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZWxlbWVudHMgd2l0aCBsYXlvdXQgc2hyaW5rLXdyYXAgdGhlaXIgY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuY3NzVGV4dCA9IGRpdlJlc2V0ICsgXCI7d2lkdGg6MXB4O3BhZGRpbmc6MXB4O3pvb206MVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBcIjxkaXY+PC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmZpcnN0Q2hpbGQuc3R5bGUud2lkdGggPSBcIjVweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHNocmlua1dyYXBCbG9ja3NWYWwgPSBkaXYub2Zmc2V0V2lkdGggIT09IDM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYm9keS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUUuXHJcbiAgICAgICAgICAgICAgICBib2R5ID0gY29udGFpbmVyID0gZGl2ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNocmlua1dyYXBCbG9ja3NWYWw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9KSgpO1xyXG4gICAgdmFyIHJtYXJnaW4gPSAoL15tYXJnaW4vKTtcclxuXHJcbiAgICB2YXIgcm51bW5vbnB4ID0gbmV3IFJlZ0V4cChcIl4oXCIgKyBwbnVtICsgXCIpKD8hcHgpW2EteiVdKyRcIiwgXCJpXCIpO1xyXG5cclxuXHJcblxyXG4gICAgdmFyIGdldFN0eWxlcywgY3VyQ1NTLFxyXG4gICAgICAgIHJwb3NpdGlvbiA9IC9eKHRvcHxyaWdodHxib3R0b218bGVmdCkkLztcclxuXHJcbiAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuICAgICAgICBnZXRTdHlsZXMgPSBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY3VyQ1NTID0gZnVuY3Rpb24gKGVsZW0sIG5hbWUsIGNvbXB1dGVkKSB7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCwgbWluV2lkdGgsIG1heFdpZHRoLCByZXQsXHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGVsZW0uc3R5bGU7XHJcblxyXG4gICAgICAgICAgICBjb21wdXRlZCA9IGNvbXB1dGVkIHx8IGdldFN0eWxlcyhlbGVtKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldFByb3BlcnR5VmFsdWUgaXMgb25seSBuZWVkZWQgZm9yIC5jc3MoJ2ZpbHRlcicpIGluIElFOSwgc2VlICMxMjUzN1xyXG4gICAgICAgICAgICByZXQgPSBjb21wdXRlZCA/IGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUobmFtZSkgfHwgY29tcHV0ZWRbbmFtZV0gOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29tcHV0ZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmV0ID09PSBcIlwiICYmICFqUXVlcnkuY29udGFpbnMoZWxlbS5vd25lckRvY3VtZW50LCBlbGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGpRdWVyeS5zdHlsZShlbGVtLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBIHRyaWJ1dGUgdG8gdGhlIFwiYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1wiXHJcbiAgICAgICAgICAgICAgICAvLyBDaHJvbWUgPCAxNyBhbmQgU2FmYXJpIDUuMCB1c2VzIFwiY29tcHV0ZWQgdmFsdWVcIiBpbnN0ZWFkIG9mIFwidXNlZCB2YWx1ZVwiIGZvciBtYXJnaW4tcmlnaHRcclxuICAgICAgICAgICAgICAgIC8vIFNhZmFyaSA1LjEuNyAoYXQgbGVhc3QpIHJldHVybnMgcGVyY2VudGFnZSBmb3IgYSBsYXJnZXIgc2V0IG9mIHZhbHVlcywgYnV0IHdpZHRoIHNlZW1zIHRvIGJlIHJlbGlhYmx5IHBpeGVsc1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhZ2FpbnN0IHRoZSBDU1NPTSBkcmFmdCBzcGVjOiBodHRwOi8vZGV2LnczLm9yZy9jc3N3Zy9jc3NvbS8jcmVzb2x2ZWQtdmFsdWVzXHJcbiAgICAgICAgICAgICAgICBpZiAocm51bW5vbnB4LnRlc3QocmV0KSAmJiBybWFyZ2luLnRlc3QobmFtZSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gc3R5bGUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluV2lkdGggPSBzdHlsZS5taW5XaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aCA9IHN0eWxlLm1heFdpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBQdXQgaW4gdGhlIG5ldyB2YWx1ZXMgdG8gZ2V0IGEgY29tcHV0ZWQgdmFsdWUgb3V0XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUubWluV2lkdGggPSBzdHlsZS5tYXhXaWR0aCA9IHN0eWxlLndpZHRoID0gcmV0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGNvbXB1dGVkLndpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBSZXZlcnQgdGhlIGNoYW5nZWQgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZS5taW5XaWR0aCA9IG1pbldpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLm1heFdpZHRoID0gbWF4V2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFXHJcbiAgICAgICAgICAgIC8vIElFIHJldHVybnMgekluZGV4IHZhbHVlIGFzIGFuIGludGVnZXIuXHJcbiAgICAgICAgICAgIHJldHVybiByZXQgPT09IHVuZGVmaW5lZCA/XHJcbiAgICAgICAgICAgICAgICByZXQgOlxyXG4gICAgICAgICAgICAgICAgcmV0ICsgXCJcIjtcclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY3VycmVudFN0eWxlKSB7XHJcbiAgICAgICAgZ2V0U3R5bGVzID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW0uY3VycmVudFN0eWxlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGN1ckNTUyA9IGZ1bmN0aW9uIChlbGVtLCBuYW1lLCBjb21wdXRlZCkge1xyXG4gICAgICAgICAgICB2YXIgbGVmdCwgcnMsIHJzTGVmdCwgcmV0LFxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBlbGVtLnN0eWxlO1xyXG5cclxuICAgICAgICAgICAgY29tcHV0ZWQgPSBjb21wdXRlZCB8fCBnZXRTdHlsZXMoZWxlbSk7XHJcbiAgICAgICAgICAgIHJldCA9IGNvbXB1dGVkID8gY29tcHV0ZWRbbmFtZV0gOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyBBdm9pZCBzZXR0aW5nIHJldCB0byBlbXB0eSBzdHJpbmcgaGVyZVxyXG4gICAgICAgICAgICAvLyBzbyB3ZSBkb24ndCBkZWZhdWx0IHRvIGF1dG9cclxuICAgICAgICAgICAgaWYgKHJldCA9PSBudWxsICYmIHN0eWxlICYmIHN0eWxlW25hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBzdHlsZVtuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRnJvbSB0aGUgYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1xyXG4gICAgICAgICAgICAvLyBodHRwOi8vZXJpay5lYWUubmV0L2FyY2hpdmVzLzIwMDcvMDcvMjcvMTguNTQuMTUvI2NvbW1lbnQtMTAyMjkxXHJcblxyXG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgZGVhbGluZyB3aXRoIGEgcmVndWxhciBwaXhlbCBudW1iZXJcclxuICAgICAgICAgICAgLy8gYnV0IGEgbnVtYmVyIHRoYXQgaGFzIGEgd2VpcmQgZW5kaW5nLCB3ZSBuZWVkIHRvIGNvbnZlcnQgaXQgdG8gcGl4ZWxzXHJcbiAgICAgICAgICAgIC8vIGJ1dCBub3QgcG9zaXRpb24gY3NzIGF0dHJpYnV0ZXMsIGFzIHRob3NlIGFyZSBwcm9wb3J0aW9uYWwgdG8gdGhlIHBhcmVudCBlbGVtZW50IGluc3RlYWRcclxuICAgICAgICAgICAgLy8gYW5kIHdlIGNhbid0IG1lYXN1cmUgdGhlIHBhcmVudCBpbnN0ZWFkIGJlY2F1c2UgaXQgbWlnaHQgdHJpZ2dlciBhIFwic3RhY2tpbmcgZG9sbHNcIiBwcm9ibGVtXHJcbiAgICAgICAgICAgIGlmIChybnVtbm9ucHgudGVzdChyZXQpICYmICFycG9zaXRpb24udGVzdChuYW1lKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoZSBvcmlnaW5hbCB2YWx1ZXNcclxuICAgICAgICAgICAgICAgIGxlZnQgPSBzdHlsZS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgcnMgPSBlbGVtLnJ1bnRpbWVTdHlsZTtcclxuICAgICAgICAgICAgICAgIHJzTGVmdCA9IHJzICYmIHJzLmxlZnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHV0IGluIHRoZSBuZXcgdmFsdWVzIHRvIGdldCBhIGNvbXB1dGVkIHZhbHVlIG91dFxyXG4gICAgICAgICAgICAgICAgaWYgKHJzTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJzLmxlZnQgPSBlbGVtLmN1cnJlbnRTdHlsZS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3R5bGUubGVmdCA9IG5hbWUgPT09IFwiZm9udFNpemVcIiA/IFwiMWVtXCIgOiByZXQ7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBzdHlsZS5waXhlbExlZnQgKyBcInB4XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgc3R5bGUubGVmdCA9IGxlZnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocnNMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnMubGVmdCA9IHJzTGVmdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUVcclxuICAgICAgICAgICAgLy8gSUUgcmV0dXJucyB6SW5kZXggdmFsdWUgYXMgYW4gaW50ZWdlci5cclxuICAgICAgICAgICAgcmV0dXJuIHJldCA9PT0gdW5kZWZpbmVkID9cclxuICAgICAgICAgICAgICAgIHJldCA6XHJcbiAgICAgICAgICAgICAgICByZXQgKyBcIlwiIHx8IFwiYXV0b1wiO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gYWRkR2V0SG9va0lmKGNvbmRpdGlvbkZuLCBob29rRm4pIHtcclxuICAgICAgICAvLyBEZWZpbmUgdGhlIGhvb2ssIHdlJ2xsIGNoZWNrIG9uIHRoZSBmaXJzdCBydW4gaWYgaXQncyByZWFsbHkgbmVlZGVkLlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbmRpdGlvbiA9IGNvbmRpdGlvbkZuKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmRpdGlvbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHRlc3Qgd2FzIG5vdCByZWFkeSBhdCB0aGlzIHBvaW50OyBzY3JldyB0aGUgaG9vayB0aGlzIHRpbWVcclxuICAgICAgICAgICAgICAgICAgICAvLyBidXQgY2hlY2sgYWdhaW4gd2hlbiBuZWVkZWQgbmV4dCB0aW1lLlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZGl0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSG9vayBub3QgbmVlZGVkIChvciBpdCdzIG5vdCBwb3NzaWJsZSB0byB1c2UgaXQgZHVlIHRvIG1pc3NpbmcgZGVwZW5kZW5jeSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGl0LlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZXJlIGFyZSBubyBvdGhlciBob29rcyBmb3IgbWFyZ2luUmlnaHQsIHJlbW92ZSB0aGUgd2hvbGUgb2JqZWN0LlxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmdldDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSG9vayBuZWVkZWQ7IHJlZGVmaW5lIGl0IHNvIHRoYXQgdGhlIHN1cHBvcnQgdGVzdCBpcyBub3QgZXhlY3V0ZWQgYWdhaW4uXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmdldCA9IGhvb2tGbikuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGEsIHJlbGlhYmxlSGlkZGVuT2Zmc2V0c1ZhbCwgYm94U2l6aW5nVmFsLCBib3hTaXppbmdSZWxpYWJsZVZhbCxcclxuICAgICAgICAgICAgcGl4ZWxQb3NpdGlvblZhbCwgcmVsaWFibGVNYXJnaW5SaWdodFZhbCxcclxuICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcclxuICAgICAgICAgICAgY29udGFpbmVyU3R5bGVzID0gXCJib3JkZXI6MDt3aWR0aDowO2hlaWdodDowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6LTk5OTlweFwiLFxyXG4gICAgICAgICAgICBkaXZSZXNldCA9XHJcbiAgICAgICAgICAgIFwiLXdlYmtpdC1ib3gtc2l6aW5nOmNvbnRlbnQtYm94Oy1tb3otYm94LXNpemluZzpjb250ZW50LWJveDtib3gtc2l6aW5nOmNvbnRlbnQtYm94O1wiICtcclxuICAgICAgICAgICAgXCJkaXNwbGF5OmJsb2NrO3BhZGRpbmc6MDttYXJnaW46MDtib3JkZXI6MFwiO1xyXG5cclxuICAgICAgICAvLyBTZXR1cFxyXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBcIiAgPGxpbmsvPjx0YWJsZT48L3RhYmxlPjxhIGhyZWY9Jy9hJz5hPC9hPjxpbnB1dCB0eXBlPSdjaGVja2JveCcvPlwiO1xyXG4gICAgICAgIGEgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhXCIpWzBdO1xyXG5cclxuICAgICAgICBhLnN0eWxlLmNzc1RleHQgPSBcImZsb2F0OmxlZnQ7b3BhY2l0eTouNVwiO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBlbGVtZW50IG9wYWNpdHkgZXhpc3RzXHJcbiAgICAgICAgLy8gKElFIHVzZXMgZmlsdGVyIGluc3RlYWQpXHJcbiAgICAgICAgLy8gVXNlIGEgcmVnZXggdG8gd29yayBhcm91bmQgYSBXZWJLaXQgaXNzdWUuIFNlZSAjNTE0NVxyXG4gICAgICAgIHN1cHBvcnQub3BhY2l0eSA9IC9eMC41Ly50ZXN0KGEuc3R5bGUub3BhY2l0eSk7XHJcblxyXG4gICAgICAgIC8vIFZlcmlmeSBzdHlsZSBmbG9hdCBleGlzdGVuY2VcclxuICAgICAgICAvLyAoSUUgdXNlcyBzdHlsZUZsb2F0IGluc3RlYWQgb2YgY3NzRmxvYXQpXHJcbiAgICAgICAgc3VwcG9ydC5jc3NGbG9hdCA9ICEhYS5zdHlsZS5jc3NGbG9hdDtcclxuXHJcbiAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJjb250ZW50LWJveFwiO1xyXG4gICAgICAgIGRpdi5jbG9uZU5vZGUodHJ1ZSkuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcIlwiO1xyXG4gICAgICAgIHN1cHBvcnQuY2xlYXJDbG9uZVN0eWxlID0gZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID09PSBcImNvbnRlbnQtYm94XCI7XHJcblxyXG4gICAgICAgIC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUUuXHJcbiAgICAgICAgYSA9IGRpdiA9IG51bGw7XHJcblxyXG4gICAgICAgIGpRdWVyeS5leHRlbmQoc3VwcG9ydCwge1xyXG4gICAgICAgICAgICByZWxpYWJsZUhpZGRlbk9mZnNldHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWxpYWJsZUhpZGRlbk9mZnNldHNWYWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWxpYWJsZUhpZGRlbk9mZnNldHNWYWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciwgdGRzLCBpc1N1cHBvcnRlZCxcclxuICAgICAgICAgICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFib2R5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIGZvciBmcmFtZXNldCBkb2NzIHRoYXQgZG9uJ3QgaGF2ZSBhIGJvZHlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0dXBcclxuICAgICAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJjbGFzc05hbWVcIiwgXCJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IFwiICA8bGluay8+PHRhYmxlPjwvdGFibGU+PGEgaHJlZj0nL2EnPmE8L2E+PGlucHV0IHR5cGU9J2NoZWNrYm94Jy8+XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gY29udGFpbmVyU3R5bGVzO1xyXG5cclxuICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFOFxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGFibGUgY2VsbHMgc3RpbGwgaGF2ZSBvZmZzZXRXaWR0aC9IZWlnaHQgd2hlbiB0aGV5IGFyZSBzZXRcclxuICAgICAgICAgICAgICAgIC8vIHRvIGRpc3BsYXk6bm9uZSBhbmQgdGhlcmUgYXJlIHN0aWxsIG90aGVyIHZpc2libGUgdGFibGUgY2VsbHMgaW4gYVxyXG4gICAgICAgICAgICAgICAgLy8gdGFibGUgcm93OyBpZiBzbywgb2Zmc2V0V2lkdGgvSGVpZ2h0IGFyZSBub3QgcmVsaWFibGUgZm9yIHVzZSB3aGVuXHJcbiAgICAgICAgICAgICAgICAvLyBkZXRlcm1pbmluZyBpZiBhbiBlbGVtZW50IGhhcyBiZWVuIGhpZGRlbiBkaXJlY3RseSB1c2luZ1xyXG4gICAgICAgICAgICAgICAgLy8gZGlzcGxheTpub25lIChpdCBpcyBzdGlsbCBzYWZlIHRvIHVzZSBvZmZzZXRzIGlmIGEgcGFyZW50IGVsZW1lbnQgaXNcclxuICAgICAgICAgICAgICAgIC8vIGhpZGRlbjsgZG9uIHNhZmV0eSBnb2dnbGVzIGFuZCBzZWUgYnVnICM0NTEyIGZvciBtb3JlIGluZm9ybWF0aW9uKS5cclxuICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBcIjx0YWJsZT48dHI+PHRkPjwvdGQ+PHRkPnQ8L3RkPjwvdHI+PC90YWJsZT5cIjtcclxuICAgICAgICAgICAgICAgIHRkcyA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgdGRzWzBdLnN0eWxlLmNzc1RleHQgPSBcInBhZGRpbmc6MDttYXJnaW46MDtib3JkZXI6MDtkaXNwbGF5Om5vbmVcIjtcclxuICAgICAgICAgICAgICAgIGlzU3VwcG9ydGVkID0gKHRkc1swXS5vZmZzZXRIZWlnaHQgPT09IDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHRkc1swXS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHRkc1sxXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU4XHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBlbXB0eSB0YWJsZSBjZWxscyBzdGlsbCBoYXZlIG9mZnNldFdpZHRoL0hlaWdodFxyXG4gICAgICAgICAgICAgICAgcmVsaWFibGVIaWRkZW5PZmZzZXRzVmFsID0gaXNTdXBwb3J0ZWQgJiYgKHRkc1swXS5vZmZzZXRIZWlnaHQgPT09IDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGJvZHkucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBOdWxsIGVsZW1lbnRzIHRvIGF2b2lkIGxlYWtzIGluIElFLlxyXG4gICAgICAgICAgICAgICAgZGl2ID0gYm9keSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbGlhYmxlSGlkZGVuT2Zmc2V0c1ZhbDtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGJveFNpemluZzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJveFNpemluZ1ZhbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcHV0ZVN0eWxlVGVzdHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBib3hTaXppbmdWYWw7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBib3hTaXppbmdSZWxpYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJveFNpemluZ1JlbGlhYmxlVmFsID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wdXRlU3R5bGVUZXN0cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJveFNpemluZ1JlbGlhYmxlVmFsO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcGl4ZWxQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBpeGVsUG9zaXRpb25WYWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGVTdHlsZVRlc3RzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGl4ZWxQb3NpdGlvblZhbDtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHJlbGlhYmxlTWFyZ2luUmlnaHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBib2R5LCBjb250YWluZXIsIGRpdiwgbWFyZ2luRGl2O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVzZSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSBiZWNhdXNlIGpzZG9tIG9uIG5vZGUuanMgd2lsbCBicmVhayB3aXRob3V0IGl0LlxyXG4gICAgICAgICAgICAgICAgaWYgKHJlbGlhYmxlTWFyZ2luUmlnaHRWYWwgPT0gbnVsbCAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFib2R5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRlc3QgZmlyZWQgdG9vIGVhcmx5IG9yIGluIGFuIHVuc3VwcG9ydGVkIGVudmlyb25tZW50LCBleGl0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBjb250YWluZXJTdHlsZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBkaXYgd2l0aCBleHBsaWNpdCB3aWR0aCBhbmQgbm8gbWFyZ2luLXJpZ2h0IGluY29ycmVjdGx5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0cyBjb21wdXRlZCBtYXJnaW4tcmlnaHQgYmFzZWQgb24gd2lkdGggb2YgY29udGFpbmVyLiAoIzMzMzMpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmFpbHMgaW4gV2ViS2l0IGJlZm9yZSBGZWIgMjAxMSBuaWdodGxpZXNcclxuICAgICAgICAgICAgICAgICAgICAvLyBXZWJLaXQgQnVnIDEzMzQzIC0gZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHdyb25nIHZhbHVlIGZvciBtYXJnaW4tcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5EaXYgPSBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luRGl2LnN0eWxlLmNzc1RleHQgPSBkaXYuc3R5bGUuY3NzVGV4dCA9IGRpdlJlc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkRpdi5zdHlsZS5tYXJnaW5SaWdodCA9IG1hcmdpbkRpdi5zdHlsZS53aWR0aCA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IFwiMXB4XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlbGlhYmxlTWFyZ2luUmlnaHRWYWwgPSAhcGFyc2VGbG9hdCgod2luZG93LmdldENvbXB1dGVkU3R5bGUobWFyZ2luRGl2LCBudWxsKSB8fCB7fSkubWFyZ2luUmlnaHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBib2R5LnJlbW92ZUNoaWxkKGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbGlhYmxlTWFyZ2luUmlnaHRWYWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcHV0ZVN0eWxlVGVzdHMoKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250YWluZXIsIGRpdixcclxuICAgICAgICAgICAgICAgIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWJvZHkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRlc3QgZmlyZWQgdG9vIGVhcmx5IG9yIGluIGFuIHVuc3VwcG9ydGVkIGVudmlyb25tZW50LCBleGl0LlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IGNvbnRhaW5lclN0eWxlcztcclxuXHJcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICAgICAgICAgZGl2LnN0eWxlLmNzc1RleHQgPVxyXG4gICAgICAgICAgICAgICAgXCItd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3g7XCIgK1xyXG4gICAgICAgICAgICAgICAgXCJwb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6MXB4O2JvcmRlcjoxcHg7d2lkdGg6NHB4O1wiICtcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcDoxJTt0b3A6MSVcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIFdvcmthcm91bmQgZmFpbGluZyBib3hTaXppbmcgdGVzdCBkdWUgdG8gb2Zmc2V0V2lkdGggcmV0dXJuaW5nIHdyb25nIHZhbHVlXHJcbiAgICAgICAgICAgIC8vIHdpdGggc29tZSBub24tMSB2YWx1ZXMgb2YgYm9keSB6b29tLCB0aWNrZXQgIzEzNTQzXHJcbiAgICAgICAgICAgIGpRdWVyeS5zd2FwKGJvZHksIGJvZHkuc3R5bGUuem9vbSAhPSBudWxsID8ge1xyXG4gICAgICAgICAgICAgICAgem9vbTogMVxyXG4gICAgICAgICAgICB9IDoge30sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGJveFNpemluZ1ZhbCA9IGRpdi5vZmZzZXRXaWR0aCA9PT0gNDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBXaWxsIGJlIGNoYW5nZWQgbGF0ZXIgaWYgbmVlZGVkLlxyXG4gICAgICAgICAgICBib3hTaXppbmdSZWxpYWJsZVZhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHBpeGVsUG9zaXRpb25WYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmVsaWFibGVNYXJnaW5SaWdodFZhbCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBVc2Ugd2luZG93LmdldENvbXB1dGVkU3R5bGUgYmVjYXVzZSBqc2RvbSBvbiBub2RlLmpzIHdpbGwgYnJlYWsgd2l0aG91dCBpdC5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICBwaXhlbFBvc2l0aW9uVmFsID0gKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRpdiwgbnVsbCkgfHwge30pLnRvcCAhPT0gXCIxJVwiO1xyXG4gICAgICAgICAgICAgICAgYm94U2l6aW5nUmVsaWFibGVWYWwgPVxyXG4gICAgICAgICAgICAgICAgICAgICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkaXYsIG51bGwpIHx8IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNHB4XCJcclxuICAgICAgICAgICAgICAgICAgICB9KS53aWR0aCA9PT0gXCI0cHhcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYm9keS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gTnVsbCBlbGVtZW50cyB0byBhdm9pZCBsZWFrcyBpbiBJRS5cclxuICAgICAgICAgICAgZGl2ID0gYm9keSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIC8vIEEgbWV0aG9kIGZvciBxdWlja2x5IHN3YXBwaW5nIGluL291dCBDU1MgcHJvcGVydGllcyB0byBnZXQgY29ycmVjdCBjYWxjdWxhdGlvbnMuXHJcbiAgICBqUXVlcnkuc3dhcCA9IGZ1bmN0aW9uIChlbGVtLCBvcHRpb25zLCBjYWxsYmFjaywgYXJncykge1xyXG4gICAgICAgIHZhciByZXQsIG5hbWUsXHJcbiAgICAgICAgICAgIG9sZCA9IHt9O1xyXG5cclxuICAgICAgICAvLyBSZW1lbWJlciB0aGUgb2xkIHZhbHVlcywgYW5kIGluc2VydCB0aGUgbmV3IG9uZXNcclxuICAgICAgICBmb3IgKG5hbWUgaW4gb3B0aW9ucykge1xyXG4gICAgICAgICAgICBvbGRbbmFtZV0gPSBlbGVtLnN0eWxlW25hbWVdO1xyXG4gICAgICAgICAgICBlbGVtLnN0eWxlW25hbWVdID0gb3B0aW9uc1tuYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldCA9IGNhbGxiYWNrLmFwcGx5KGVsZW0sIGFyZ3MgfHwgW10pO1xyXG5cclxuICAgICAgICAvLyBSZXZlcnQgdGhlIG9sZCB2YWx1ZXNcclxuICAgICAgICBmb3IgKG5hbWUgaW4gb3B0aW9ucykge1xyXG4gICAgICAgICAgICBlbGVtLnN0eWxlW25hbWVdID0gb2xkW25hbWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHZhclxyXG4gICAgICAgIHJhbHBoYSA9IC9hbHBoYVxcKFteKV0qXFwpL2ksXHJcbiAgICAgICAgcm9wYWNpdHkgPSAvb3BhY2l0eVxccyo9XFxzKihbXildKikvLFxyXG5cclxuICAgICAgICAvLyBzd2FwcGFibGUgaWYgZGlzcGxheSBpcyBub25lIG9yIHN0YXJ0cyB3aXRoIHRhYmxlIGV4Y2VwdCBcInRhYmxlXCIsIFwidGFibGUtY2VsbFwiLCBvciBcInRhYmxlLWNhcHRpb25cIlxyXG4gICAgICAgIC8vIHNlZSBoZXJlIGZvciBkaXNwbGF5IHZhbHVlczogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9DU1MvZGlzcGxheVxyXG4gICAgICAgIHJkaXNwbGF5c3dhcCA9IC9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispLyxcclxuICAgICAgICBybnVtc3BsaXQgPSBuZXcgUmVnRXhwKFwiXihcIiArIHBudW0gKyBcIikoLiopJFwiLCBcImlcIiksXHJcbiAgICAgICAgcnJlbE51bSA9IG5ldyBSZWdFeHAoXCJeKFsrLV0pPShcIiArIHBudW0gKyBcIilcIiwgXCJpXCIpLFxyXG5cclxuICAgICAgICBjc3NTaG93ID0ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNzc05vcm1hbFRyYW5zZm9ybSA9IHtcclxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogMCxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogNDAwXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3NzUHJlZml4ZXMgPSBbXCJXZWJraXRcIiwgXCJPXCIsIFwiTW96XCIsIFwibXNcIl07XHJcblxyXG5cclxuICAgIC8vIHJldHVybiBhIGNzcyBwcm9wZXJ0eSBtYXBwZWQgdG8gYSBwb3RlbnRpYWxseSB2ZW5kb3IgcHJlZml4ZWQgcHJvcGVydHlcclxuICAgIGZ1bmN0aW9uIHZlbmRvclByb3BOYW1lKHN0eWxlLCBuYW1lKSB7XHJcblxyXG4gICAgICAgIC8vIHNob3J0Y3V0IGZvciBuYW1lcyB0aGF0IGFyZSBub3QgdmVuZG9yIHByZWZpeGVkXHJcbiAgICAgICAgaWYgKG5hbWUgaW4gc3R5bGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjaGVjayBmb3IgdmVuZG9yIHByZWZpeGVkIG5hbWVzXHJcbiAgICAgICAgdmFyIGNhcE5hbWUgPSBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKSxcclxuICAgICAgICAgICAgb3JpZ05hbWUgPSBuYW1lLFxyXG4gICAgICAgICAgICBpID0gY3NzUHJlZml4ZXMubGVuZ3RoO1xyXG5cclxuICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBjc3NQcmVmaXhlc1tpXSArIGNhcE5hbWU7XHJcbiAgICAgICAgICAgIGlmIChuYW1lIGluIHN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9yaWdOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dIaWRlKGVsZW1lbnRzLCBzaG93KSB7XHJcbiAgICAgICAgdmFyIGRpc3BsYXksIGVsZW0sIGhpZGRlbixcclxuICAgICAgICAgICAgdmFsdWVzID0gW10sXHJcbiAgICAgICAgICAgIGluZGV4ID0gMCxcclxuICAgICAgICAgICAgbGVuZ3RoID0gZWxlbWVudHMubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgZWxlbSA9IGVsZW1lbnRzW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKCFlbGVtLnN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFsdWVzW2luZGV4XSA9IGpRdWVyeS5fZGF0YShlbGVtLCBcIm9sZGRpc3BsYXlcIik7XHJcbiAgICAgICAgICAgIGRpc3BsYXkgPSBlbGVtLnN0eWxlLmRpc3BsYXk7XHJcbiAgICAgICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXNldCB0aGUgaW5saW5lIGRpc3BsYXkgb2YgdGhpcyBlbGVtZW50IHRvIGxlYXJuIGlmIGl0IGlzXHJcbiAgICAgICAgICAgICAgICAvLyBiZWluZyBoaWRkZW4gYnkgY2FzY2FkZWQgcnVsZXMgb3Igbm90XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlc1tpbmRleF0gJiYgZGlzcGxheSA9PT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCBlbGVtZW50cyB3aGljaCBoYXZlIGJlZW4gb3ZlcnJpZGRlbiB3aXRoIGRpc3BsYXk6IG5vbmVcclxuICAgICAgICAgICAgICAgIC8vIGluIGEgc3R5bGVzaGVldCB0byB3aGF0ZXZlciB0aGUgZGVmYXVsdCBicm93c2VyIHN0eWxlIGlzXHJcbiAgICAgICAgICAgICAgICAvLyBmb3Igc3VjaCBhbiBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmIGlzSGlkZGVuKGVsZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzW2luZGV4XSA9IGpRdWVyeS5fZGF0YShlbGVtLCBcIm9sZGRpc3BsYXlcIiwgZGVmYXVsdERpc3BsYXkoZWxlbS5ub2RlTmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdmFsdWVzW2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbiA9IGlzSGlkZGVuKGVsZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzcGxheSAmJiBkaXNwbGF5ICE9PSBcIm5vbmVcIiB8fCAhaGlkZGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fZGF0YShlbGVtLCBcIm9sZGRpc3BsYXlcIiwgaGlkZGVuID8gZGlzcGxheSA6IGpRdWVyeS5jc3MoZWxlbSwgXCJkaXNwbGF5XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgZGlzcGxheSBvZiBtb3N0IG9mIHRoZSBlbGVtZW50cyBpbiBhIHNlY29uZCBsb29wXHJcbiAgICAgICAgLy8gdG8gYXZvaWQgdGhlIGNvbnN0YW50IHJlZmxvd1xyXG4gICAgICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBlbGVtID0gZWxlbWVudHNbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoIWVsZW0uc3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc2hvdyB8fCBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiIHx8IGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gc2hvdyA/IHZhbHVlc1tpbmRleF0gfHwgXCJcIiA6IFwibm9uZVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UG9zaXRpdmVOdW1iZXIoZWxlbSwgdmFsdWUsIHN1YnRyYWN0KSB7XHJcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBybnVtc3BsaXQuZXhlYyh2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoZXMgP1xyXG4gICAgICAgICAgICAvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBcInN1YnRyYWN0XCIsIGUuZy4sIHdoZW4gdXNlZCBhcyBpbiBjc3NIb29rc1xyXG4gICAgICAgICAgICBNYXRoLm1heCgwLCBtYXRjaGVzWzFdIC0gKHN1YnRyYWN0IHx8IDApKSArIChtYXRjaGVzWzJdIHx8IFwicHhcIikgOlxyXG4gICAgICAgICAgICB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhdWdtZW50V2lkdGhPckhlaWdodChlbGVtLCBuYW1lLCBleHRyYSwgaXNCb3JkZXJCb3gsIHN0eWxlcykge1xyXG4gICAgICAgIHZhciBpID0gZXh0cmEgPT09IChpc0JvcmRlckJveCA/IFwiYm9yZGVyXCIgOiBcImNvbnRlbnRcIikgP1xyXG4gICAgICAgICAgICAvLyBJZiB3ZSBhbHJlYWR5IGhhdmUgdGhlIHJpZ2h0IG1lYXN1cmVtZW50LCBhdm9pZCBhdWdtZW50YXRpb25cclxuICAgICAgICAgICAgNCA6XHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSBpbml0aWFsaXplIGZvciBob3Jpem9udGFsIG9yIHZlcnRpY2FsIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgbmFtZSA9PT0gXCJ3aWR0aFwiID8gMSA6IDAsXHJcblxyXG4gICAgICAgICAgICB2YWwgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKDsgaSA8IDQ7IGkgKz0gMikge1xyXG4gICAgICAgICAgICAvLyBib3RoIGJveCBtb2RlbHMgZXhjbHVkZSBtYXJnaW4sIHNvIGFkZCBpdCBpZiB3ZSB3YW50IGl0XHJcbiAgICAgICAgICAgIGlmIChleHRyYSA9PT0gXCJtYXJnaW5cIikge1xyXG4gICAgICAgICAgICAgICAgdmFsICs9IGpRdWVyeS5jc3MoZWxlbSwgZXh0cmEgKyBjc3NFeHBhbmRbaV0sIHRydWUsIHN0eWxlcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc0JvcmRlckJveCkge1xyXG4gICAgICAgICAgICAgICAgLy8gYm9yZGVyLWJveCBpbmNsdWRlcyBwYWRkaW5nLCBzbyByZW1vdmUgaXQgaWYgd2Ugd2FudCBjb250ZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoZXh0cmEgPT09IFwiY29udGVudFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsIC09IGpRdWVyeS5jc3MoZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbaV0sIHRydWUsIHN0eWxlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgYm9yZGVyIG5vciBtYXJnaW4sIHNvIHJlbW92ZSBib3JkZXJcclxuICAgICAgICAgICAgICAgIGlmIChleHRyYSAhPT0gXCJtYXJnaW5cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCAtPSBqUXVlcnkuY3NzKGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbaV0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50LCBzbyBhZGQgcGFkZGluZ1xyXG4gICAgICAgICAgICAgICAgdmFsICs9IGpRdWVyeS5jc3MoZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbaV0sIHRydWUsIHN0eWxlcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgY29udGVudCBub3IgcGFkZGluZywgc28gYWRkIGJvcmRlclxyXG4gICAgICAgICAgICAgICAgaWYgKGV4dHJhICE9PSBcInBhZGRpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCArPSBqUXVlcnkuY3NzKGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbaV0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodChlbGVtLCBuYW1lLCBleHRyYSkge1xyXG5cclxuICAgICAgICAvLyBTdGFydCB3aXRoIG9mZnNldCBwcm9wZXJ0eSwgd2hpY2ggaXMgZXF1aXZhbGVudCB0byB0aGUgYm9yZGVyLWJveCB2YWx1ZVxyXG4gICAgICAgIHZhciB2YWx1ZUlzQm9yZGVyQm94ID0gdHJ1ZSxcclxuICAgICAgICAgICAgdmFsID0gbmFtZSA9PT0gXCJ3aWR0aFwiID8gZWxlbS5vZmZzZXRXaWR0aCA6IGVsZW0ub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICAgICAgICBzdHlsZXMgPSBnZXRTdHlsZXMoZWxlbSksXHJcbiAgICAgICAgICAgIGlzQm9yZGVyQm94ID0gc3VwcG9ydC5ib3hTaXppbmcoKSAmJiBqUXVlcnkuY3NzKGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMpID09PSBcImJvcmRlci1ib3hcIjtcclxuXHJcbiAgICAgICAgLy8gc29tZSBub24taHRtbCBlbGVtZW50cyByZXR1cm4gdW5kZWZpbmVkIGZvciBvZmZzZXRXaWR0aCwgc28gY2hlY2sgZm9yIG51bGwvdW5kZWZpbmVkXHJcbiAgICAgICAgLy8gc3ZnIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjQ5Mjg1XHJcbiAgICAgICAgLy8gTWF0aE1MIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NDkxNjY4XHJcbiAgICAgICAgaWYgKHZhbCA8PSAwIHx8IHZhbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vIEZhbGwgYmFjayB0byBjb21wdXRlZCB0aGVuIHVuY29tcHV0ZWQgY3NzIGlmIG5lY2Vzc2FyeVxyXG4gICAgICAgICAgICB2YWwgPSBjdXJDU1MoZWxlbSwgbmFtZSwgc3R5bGVzKTtcclxuICAgICAgICAgICAgaWYgKHZhbCA8IDAgfHwgdmFsID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IGVsZW0uc3R5bGVbbmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENvbXB1dGVkIHVuaXQgaXMgbm90IHBpeGVscy4gU3RvcCBoZXJlIGFuZCByZXR1cm4uXHJcbiAgICAgICAgICAgIGlmIChybnVtbm9ucHgudGVzdCh2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRoZSBjaGVjayBmb3Igc3R5bGUgaW4gY2FzZSBhIGJyb3dzZXIgd2hpY2ggcmV0dXJucyB1bnJlbGlhYmxlIHZhbHVlc1xyXG4gICAgICAgICAgICAvLyBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSBzaWxlbnRseSBmYWxscyBiYWNrIHRvIHRoZSByZWxpYWJsZSBlbGVtLnN0eWxlXHJcbiAgICAgICAgICAgIHZhbHVlSXNCb3JkZXJCb3ggPSBpc0JvcmRlckJveCAmJiAoc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSgpIHx8IHZhbCA9PT0gZWxlbS5zdHlsZVtuYW1lXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgXCJcIiwgYXV0bywgYW5kIHByZXBhcmUgZm9yIGV4dHJhXHJcbiAgICAgICAgICAgIHZhbCA9IHBhcnNlRmxvYXQodmFsKSB8fCAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdXNlIHRoZSBhY3RpdmUgYm94LXNpemluZyBtb2RlbCB0byBhZGQvc3VidHJhY3QgaXJyZWxldmFudCBzdHlsZXNcclxuICAgICAgICByZXR1cm4gKHZhbCArXHJcbiAgICAgICAgICAgIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KFxyXG4gICAgICAgICAgICAgICAgZWxlbSxcclxuICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICBleHRyYSB8fCAoaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVJc0JvcmRlckJveCxcclxuICAgICAgICAgICAgICAgIHN0eWxlc1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSArIFwicHhcIjtcclxuICAgIH1cclxuXHJcbiAgICBqUXVlcnkuZXh0ZW5kKHtcclxuICAgICAgICAvLyBBZGQgaW4gc3R5bGUgcHJvcGVydHkgaG9va3MgZm9yIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHRcclxuICAgICAgICAvLyBiZWhhdmlvciBvZiBnZXR0aW5nIGFuZCBzZXR0aW5nIGEgc3R5bGUgcHJvcGVydHlcclxuICAgICAgICBjc3NIb29rczoge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIChlbGVtLCBjb21wdXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wdXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBzaG91bGQgYWx3YXlzIGdldCBhIG51bWJlciBiYWNrIGZyb20gb3BhY2l0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0gY3VyQ1NTKGVsZW0sIFwib3BhY2l0eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldCA9PT0gXCJcIiA/IFwiMVwiIDogcmV0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIERvbid0IGF1dG9tYXRpY2FsbHkgYWRkIFwicHhcIiB0byB0aGVzZSBwb3NzaWJseS11bml0bGVzcyBwcm9wZXJ0aWVzXHJcbiAgICAgICAgY3NzTnVtYmVyOiB7XHJcbiAgICAgICAgICAgIFwiY29sdW1uQ291bnRcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJmaWxsT3BhY2l0eVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImZvbnRXZWlnaHRcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJsaW5lSGVpZ2h0XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwib3BhY2l0eVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIm9yZGVyXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwib3JwaGFuc1wiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIndpZG93c1wiOiB0cnVlLFxyXG4gICAgICAgICAgICBcInpJbmRleFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcInpvb21cIjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEFkZCBpbiBwcm9wZXJ0aWVzIHdob3NlIG5hbWVzIHlvdSB3aXNoIHRvIGZpeCBiZWZvcmVcclxuICAgICAgICAvLyBzZXR0aW5nIG9yIGdldHRpbmcgdGhlIHZhbHVlXHJcbiAgICAgICAgY3NzUHJvcHM6IHtcclxuICAgICAgICAgICAgLy8gbm9ybWFsaXplIGZsb2F0IGNzcyBwcm9wZXJ0eVxyXG4gICAgICAgICAgICBcImZsb2F0XCI6IHN1cHBvcnQuY3NzRmxvYXQgPyBcImNzc0Zsb2F0XCIgOiBcInN0eWxlRmxvYXRcIlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEdldCBhbmQgc2V0IHRoZSBzdHlsZSBwcm9wZXJ0eSBvbiBhIERPTSBOb2RlXHJcbiAgICAgICAgc3R5bGU6IGZ1bmN0aW9uIChlbGVtLCBuYW1lLCB2YWx1ZSwgZXh0cmEpIHtcclxuICAgICAgICAgICAgLy8gRG9uJ3Qgc2V0IHN0eWxlcyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXHJcbiAgICAgICAgICAgIGlmICghZWxlbSB8fCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggfHwgIWVsZW0uc3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lXHJcbiAgICAgICAgICAgIHZhciByZXQsIHR5cGUsIGhvb2tzLFxyXG4gICAgICAgICAgICAgICAgb3JpZ05hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKG5hbWUpLFxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBlbGVtLnN0eWxlO1xyXG5cclxuICAgICAgICAgICAgbmFtZSA9IGpRdWVyeS5jc3NQcm9wc1tvcmlnTmFtZV0gfHwgKGpRdWVyeS5jc3NQcm9wc1tvcmlnTmFtZV0gPSB2ZW5kb3JQcm9wTmFtZShzdHlsZSwgb3JpZ05hbWUpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldHMgaG9vayBmb3IgdGhlIHByZWZpeGVkIHZlcnNpb25cclxuICAgICAgICAgICAgLy8gZm9sbG93ZWQgYnkgdGhlIHVucHJlZml4ZWQgdmVyc2lvblxyXG4gICAgICAgICAgICBob29rcyA9IGpRdWVyeS5jc3NIb29rc1tuYW1lXSB8fCBqUXVlcnkuY3NzSG9va3Nbb3JpZ05hbWVdO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgd2UncmUgc2V0dGluZyBhIHZhbHVlXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgcmVsYXRpdmUgbnVtYmVyIHN0cmluZ3MgKCs9IG9yIC09KSB0byByZWxhdGl2ZSBudW1iZXJzLiAjNzM0NVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwic3RyaW5nXCIgJiYgKHJldCA9IHJyZWxOdW0uZXhlYyh2YWx1ZSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAocmV0WzFdICsgMSkgKiByZXRbMl0gKyBwYXJzZUZsb2F0KGpRdWVyeS5jc3MoZWxlbSwgbmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpeGVzIGJ1ZyAjOTIzN1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcIm51bWJlclwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IG51bGwgYW5kIE5hTiB2YWx1ZXMgYXJlbid0IHNldC4gU2VlOiAjNzExNlxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIGEgbnVtYmVyIHdhcyBwYXNzZWQgaW4sIGFkZCAncHgnIHRvIHRoZSAoZXhjZXB0IGZvciBjZXJ0YWluIENTUyBwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwibnVtYmVyXCIgJiYgIWpRdWVyeS5jc3NOdW1iZXJbb3JpZ05hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEZpeGVzICM4OTA4LCBpdCBjYW4gYmUgZG9uZSBtb3JlIGNvcnJlY3RseSBieSBzcGVjaWZpbmcgc2V0dGVycyBpbiBjc3NIb29rcyxcclxuICAgICAgICAgICAgICAgIC8vIGJ1dCBpdCB3b3VsZCBtZWFuIHRvIGRlZmluZSBlaWdodCAoZm9yIGV2ZXJ5IHByb2JsZW1hdGljIHByb3BlcnR5KSBpZGVudGljYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAgICBpZiAoIXN1cHBvcnQuY2xlYXJDbG9uZVN0eWxlICYmIHZhbHVlID09PSBcIlwiICYmIG5hbWUuaW5kZXhPZihcImJhY2tncm91bmRcIikgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZVtuYW1lXSA9IFwiaW5oZXJpdFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQsIHVzZSB0aGF0IHZhbHVlLCBvdGhlcndpc2UganVzdCBzZXQgdGhlIHNwZWNpZmllZCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKCFob29rcyB8fCAhKFwic2V0XCIgaW4gaG9va3MpIHx8ICh2YWx1ZSA9IGhvb2tzLnNldChlbGVtLCB2YWx1ZSwgZXh0cmEpKSAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3dhbGxvdyBlcnJvcnMgZnJvbSAnaW52YWxpZCcgQ1NTIHZhbHVlcyAoIzU1MDkpXHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogQ2hyb21lLCBTYWZhcmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0dGluZyBzdHlsZSB0byBibGFuayBzdHJpbmcgcmVxdWlyZWQgdG8gZGVsZXRlIFwic3R5bGU6IHggIWltcG9ydGFudDtcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZVtuYW1lXSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgbm9uLWNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcclxuICAgICAgICAgICAgICAgIGlmIChob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmIChyZXQgPSBob29rcy5nZXQoZWxlbSwgZmFsc2UsIGV4dHJhKSkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGp1c3QgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzdHlsZSBvYmplY3RcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZVtuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNzczogZnVuY3Rpb24gKGVsZW0sIG5hbWUsIGV4dHJhLCBzdHlsZXMpIHtcclxuICAgICAgICAgICAgdmFyIG51bSwgdmFsLCBob29rcyxcclxuICAgICAgICAgICAgICAgIG9yaWdOYW1lID0galF1ZXJ5LmNhbWVsQ2FzZShuYW1lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxyXG4gICAgICAgICAgICBuYW1lID0galF1ZXJ5LmNzc1Byb3BzW29yaWdOYW1lXSB8fCAoalF1ZXJ5LmNzc1Byb3BzW29yaWdOYW1lXSA9IHZlbmRvclByb3BOYW1lKGVsZW0uc3R5bGUsIG9yaWdOYW1lKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXRzIGhvb2sgZm9yIHRoZSBwcmVmaXhlZCB2ZXJzaW9uXHJcbiAgICAgICAgICAgIC8vIGZvbGxvd2VkIGJ5IHRoZSB1bnByZWZpeGVkIHZlcnNpb25cclxuICAgICAgICAgICAgaG9va3MgPSBqUXVlcnkuY3NzSG9va3NbbmFtZV0gfHwgalF1ZXJ5LmNzc0hvb2tzW29yaWdOYW1lXTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXHJcbiAgICAgICAgICAgIGlmIChob29rcyAmJiBcImdldFwiIGluIGhvb2tzKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBob29rcy5nZXQoZWxlbSwgdHJ1ZSwgZXh0cmEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIGlmIGEgd2F5IHRvIGdldCB0aGUgY29tcHV0ZWQgdmFsdWUgZXhpc3RzLCB1c2UgdGhhdFxyXG4gICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IGN1ckNTUyhlbGVtLCBuYW1lLCBzdHlsZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2NvbnZlcnQgXCJub3JtYWxcIiB0byBjb21wdXRlZCB2YWx1ZVxyXG4gICAgICAgICAgICBpZiAodmFsID09PSBcIm5vcm1hbFwiICYmIG5hbWUgaW4gY3NzTm9ybWFsVHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBjc3NOb3JtYWxUcmFuc2Zvcm1bbmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJldHVybiwgY29udmVydGluZyB0byBudW1iZXIgaWYgZm9yY2VkIG9yIGEgcXVhbGlmaWVyIHdhcyBwcm92aWRlZCBhbmQgdmFsIGxvb2tzIG51bWVyaWNcclxuICAgICAgICAgICAgaWYgKGV4dHJhID09PSBcIlwiIHx8IGV4dHJhKSB7XHJcbiAgICAgICAgICAgICAgICBudW0gPSBwYXJzZUZsb2F0KHZhbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXh0cmEgPT09IHRydWUgfHwgalF1ZXJ5LmlzTnVtZXJpYyhudW0pID8gbnVtIHx8IDAgOiB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkuZWFjaChbXCJoZWlnaHRcIiwgXCJ3aWR0aFwiXSwgZnVuY3Rpb24gKGksIG5hbWUpIHtcclxuICAgICAgICBqUXVlcnkuY3NzSG9va3NbbmFtZV0gPSB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKGVsZW0sIGNvbXB1dGVkLCBleHRyYSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXB1dGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2VydGFpbiBlbGVtZW50cyBjYW4gaGF2ZSBkaW1lbnNpb24gaW5mbyBpZiB3ZSBpbnZpc2libHkgc2hvdyB0aGVtXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaG93ZXZlciwgaXQgbXVzdCBoYXZlIGEgY3VycmVudCBkaXNwbGF5IHN0eWxlIHRoYXQgd291bGQgYmVuZWZpdCBmcm9tIHRoaXNcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5vZmZzZXRXaWR0aCA9PT0gMCAmJiByZGlzcGxheXN3YXAudGVzdChqUXVlcnkuY3NzKGVsZW0sIFwiZGlzcGxheVwiKSkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuc3dhcChlbGVtLCBjc3NTaG93LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0V2lkdGhPckhlaWdodChlbGVtLCBuYW1lLCBleHRyYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0V2lkdGhPckhlaWdodChlbGVtLCBuYW1lLCBleHRyYSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChlbGVtLCB2YWx1ZSwgZXh0cmEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdHlsZXMgPSBleHRyYSAmJiBnZXRTdHlsZXMoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0UG9zaXRpdmVOdW1iZXIoZWxlbSwgdmFsdWUsIGV4dHJhID9cclxuICAgICAgICAgICAgICAgICAgICBhdWdtZW50V2lkdGhPckhlaWdodChcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQuYm94U2l6aW5nKCkgJiYgalF1ZXJ5LmNzcyhlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzKSA9PT0gXCJib3JkZXItYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlc1xyXG4gICAgICAgICAgICAgICAgICAgICkgOiAwXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghc3VwcG9ydC5vcGFjaXR5KSB7XHJcbiAgICAgICAgalF1ZXJ5LmNzc0hvb2tzLm9wYWNpdHkgPSB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKGVsZW0sIGNvbXB1dGVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJRSB1c2VzIGZpbHRlcnMgZm9yIG9wYWNpdHlcclxuICAgICAgICAgICAgICAgIHJldHVybiByb3BhY2l0eS50ZXN0KChjb21wdXRlZCAmJiBlbGVtLmN1cnJlbnRTdHlsZSA/IGVsZW0uY3VycmVudFN0eWxlLmZpbHRlciA6IGVsZW0uc3R5bGUuZmlsdGVyKSB8fCBcIlwiKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgKDAuMDEgKiBwYXJzZUZsb2F0KFJlZ0V4cC4kMSkpICsgXCJcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcHV0ZWQgPyBcIjFcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChlbGVtLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gZWxlbS5zdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3R5bGUgPSBlbGVtLmN1cnJlbnRTdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5ID0galF1ZXJ5LmlzTnVtZXJpYyh2YWx1ZSkgPyBcImFscGhhKG9wYWNpdHk9XCIgKyB2YWx1ZSAqIDEwMCArIFwiKVwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjdXJyZW50U3R5bGUgJiYgY3VycmVudFN0eWxlLmZpbHRlciB8fCBzdHlsZS5maWx0ZXIgfHwgXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJRSBoYXMgdHJvdWJsZSB3aXRoIG9wYWNpdHkgaWYgaXQgZG9lcyBub3QgaGF2ZSBsYXlvdXRcclxuICAgICAgICAgICAgICAgIC8vIEZvcmNlIGl0IGJ5IHNldHRpbmcgdGhlIHpvb20gbGV2ZWxcclxuICAgICAgICAgICAgICAgIHN0eWxlLnpvb20gPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIHNldHRpbmcgb3BhY2l0eSB0byAxLCBhbmQgbm8gb3RoZXIgZmlsdGVycyBleGlzdCAtIGF0dGVtcHQgdG8gcmVtb3ZlIGZpbHRlciBhdHRyaWJ1dGUgIzY2NTJcclxuICAgICAgICAgICAgICAgIC8vIGlmIHZhbHVlID09PSBcIlwiLCB0aGVuIHJlbW92ZSBpbmxpbmUgb3BhY2l0eSAjMTI2ODVcclxuICAgICAgICAgICAgICAgIGlmICgodmFsdWUgPj0gMSB8fCB2YWx1ZSA9PT0gXCJcIikgJiZcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkudHJpbShmaWx0ZXIucmVwbGFjZShyYWxwaGEsIFwiXCIpKSA9PT0gXCJcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXR0aW5nIHN0eWxlLmZpbHRlciB0byBudWxsLCBcIlwiICYgXCIgXCIgc3RpbGwgbGVhdmUgXCJmaWx0ZXI6XCIgaW4gdGhlIGNzc1RleHRcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBcImZpbHRlcjpcIiBpcyBwcmVzZW50IGF0IGFsbCwgY2xlYXJUeXBlIGlzIGRpc2FibGVkLCB3ZSB3YW50IHRvIGF2b2lkIHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUgaXMgSUUgT25seSwgYnV0IHNvIGFwcGFyZW50bHkgaXMgdGhpcyBjb2RlIHBhdGguLi5cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoXCJmaWx0ZXJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGZpbHRlciBzdHlsZSBhcHBsaWVkIGluIGEgY3NzIHJ1bGUgb3IgdW5zZXQgaW5saW5lIG9wYWNpdHksIHdlIGFyZSBkb25lXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcIlwiIHx8IGN1cnJlbnRTdHlsZSAmJiAhY3VycmVudFN0eWxlLmZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSwgc2V0IG5ldyBmaWx0ZXIgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICBzdHlsZS5maWx0ZXIgPSByYWxwaGEudGVzdChmaWx0ZXIpID9cclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIucmVwbGFjZShyYWxwaGEsIG9wYWNpdHkpIDpcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgKyBcIiBcIiArIG9wYWNpdHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeS5jc3NIb29rcy5tYXJnaW5SaWdodCA9IGFkZEdldEhvb2tJZihzdXBwb3J0LnJlbGlhYmxlTWFyZ2luUmlnaHQsXHJcbiAgICAgICAgZnVuY3Rpb24gKGVsZW0sIGNvbXB1dGVkKSB7XHJcbiAgICAgICAgICAgIGlmIChjb21wdXRlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gV2ViS2l0IEJ1ZyAxMzM0MyAtIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyB3cm9uZyB2YWx1ZSBmb3IgbWFyZ2luLXJpZ2h0XHJcbiAgICAgICAgICAgICAgICAvLyBXb3JrIGFyb3VuZCBieSB0ZW1wb3JhcmlseSBzZXR0aW5nIGVsZW1lbnQgZGlzcGxheSB0byBpbmxpbmUtYmxvY2tcclxuICAgICAgICAgICAgICAgIHJldHVybiBqUXVlcnkuc3dhcChlbGVtLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiOiBcImlubGluZS1ibG9ja1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJDU1MsIFtlbGVtLCBcIm1hcmdpblJpZ2h0XCJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgLy8gVGhlc2UgaG9va3MgYXJlIHVzZWQgYnkgYW5pbWF0ZSB0byBleHBhbmQgcHJvcGVydGllc1xyXG4gICAgalF1ZXJ5LmVhY2goe1xyXG4gICAgICAgIG1hcmdpbjogXCJcIixcclxuICAgICAgICBwYWRkaW5nOiBcIlwiLFxyXG4gICAgICAgIGJvcmRlcjogXCJXaWR0aFwiXHJcbiAgICB9LCBmdW5jdGlvbiAocHJlZml4LCBzdWZmaXgpIHtcclxuICAgICAgICBqUXVlcnkuY3NzSG9va3NbcHJlZml4ICsgc3VmZml4XSA9IHtcclxuICAgICAgICAgICAgZXhwYW5kOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBleHBhbmRlZCA9IHt9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhc3N1bWVzIGEgc2luZ2xlIG51bWJlciBpZiBub3QgYSBzdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cyA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnNwbGl0KFwiIFwiKSA6IFt2YWx1ZV07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICg7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBleHBhbmRlZFtwcmVmaXggKyBjc3NFeHBhbmRbaV0gKyBzdWZmaXhdID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydHNbaV0gfHwgcGFydHNbaSAtIDJdIHx8IHBhcnRzWzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBleHBhbmRlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICghcm1hcmdpbi50ZXN0KHByZWZpeCkpIHtcclxuICAgICAgICAgICAgalF1ZXJ5LmNzc0hvb2tzW3ByZWZpeCArIHN1ZmZpeF0uc2V0ID0gc2V0UG9zaXRpdmVOdW1iZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgY3NzOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzcyh0aGlzLCBmdW5jdGlvbiAoZWxlbSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdHlsZXMsIGxlbixcclxuICAgICAgICAgICAgICAgICAgICBtYXAgPSB7fSxcclxuICAgICAgICAgICAgICAgICAgICBpID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoalF1ZXJ5LmlzQXJyYXkobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZXMgPSBnZXRTdHlsZXMoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gbmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwW25hbWVbaV1dID0galF1ZXJ5LmNzcyhlbGVtLCBuYW1lW2ldLCBmYWxzZSwgc3R5bGVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgP1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5zdHlsZShlbGVtLCBuYW1lLCB2YWx1ZSkgOlxyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5jc3MoZWxlbSwgbmFtZSk7XHJcbiAgICAgICAgICAgIH0sIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzaG93SGlkZSh0aGlzLCB0cnVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNob3dIaWRlKHRoaXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZSA/IHRoaXMuc2hvdygpIDogdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzSGlkZGVuKHRoaXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIFR3ZWVuKGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUd2Vlbi5wcm90b3R5cGUuaW5pdChlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyk7XHJcbiAgICB9XHJcbiAgICBqUXVlcnkuVHdlZW4gPSBUd2VlbjtcclxuXHJcbiAgICBUd2Vlbi5wcm90b3R5cGUgPSB7XHJcbiAgICAgICAgY29uc3RydWN0b3I6IFR3ZWVuLFxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZywgdW5pdCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgICAgICAgICB0aGlzLnByb3AgPSBwcm9wO1xyXG4gICAgICAgICAgICB0aGlzLmVhc2luZyA9IGVhc2luZyB8fCBcInN3aW5nXCI7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLm5vdyA9IHRoaXMuY3VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kID0gZW5kO1xyXG4gICAgICAgICAgICB0aGlzLnVuaXQgPSB1bml0IHx8IChqUXVlcnkuY3NzTnVtYmVyW3Byb3BdID8gXCJcIiA6IFwicHhcIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjdXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzW3RoaXMucHJvcF07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaG9va3MgJiYgaG9va3MuZ2V0ID9cclxuICAgICAgICAgICAgICAgIGhvb2tzLmdldCh0aGlzKSA6XHJcbiAgICAgICAgICAgICAgICBUd2Vlbi5wcm9wSG9va3MuX2RlZmF1bHQuZ2V0KHRoaXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVuOiBmdW5jdGlvbiAocGVyY2VudCkge1xyXG4gICAgICAgICAgICB2YXIgZWFzZWQsXHJcbiAgICAgICAgICAgICAgICBob29rcyA9IFR3ZWVuLnByb3BIb29rc1t0aGlzLnByb3BdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3MgPSBlYXNlZCA9IGpRdWVyeS5lYXNpbmdbdGhpcy5lYXNpbmddKFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnQsIHRoaXMub3B0aW9ucy5kdXJhdGlvbiAqIHBlcmNlbnQsIDAsIDEsIHRoaXMub3B0aW9ucy5kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zID0gZWFzZWQgPSBwZXJjZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm93ID0gKHRoaXMuZW5kIC0gdGhpcy5zdGFydCkgKiBlYXNlZCArIHRoaXMuc3RhcnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnN0ZXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdGVwLmNhbGwodGhpcy5lbGVtLCB0aGlzLm5vdywgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChob29rcyAmJiBob29rcy5zZXQpIHtcclxuICAgICAgICAgICAgICAgIGhvb2tzLnNldCh0aGlzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFR3ZWVuLnByb3BIb29rcy5fZGVmYXVsdC5zZXQodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBUd2Vlbi5wcm90b3R5cGUuaW5pdC5wcm90b3R5cGUgPSBUd2Vlbi5wcm90b3R5cGU7XHJcblxyXG4gICAgVHdlZW4ucHJvcEhvb2tzID0ge1xyXG4gICAgICAgIF9kZWZhdWx0OiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKHR3ZWVuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0d2Vlbi5lbGVtW3R3ZWVuLnByb3BdICE9IG51bGwgJiZcclxuICAgICAgICAgICAgICAgICAgICAoIXR3ZWVuLmVsZW0uc3R5bGUgfHwgdHdlZW4uZWxlbS5zdHlsZVt0d2Vlbi5wcm9wXSA9PSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0d2Vlbi5lbGVtW3R3ZWVuLnByb3BdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHBhc3NpbmcgYW4gZW1wdHkgc3RyaW5nIGFzIGEgM3JkIHBhcmFtZXRlciB0byAuY3NzIHdpbGwgYXV0b21hdGljYWxseVxyXG4gICAgICAgICAgICAgICAgLy8gYXR0ZW1wdCBhIHBhcnNlRmxvYXQgYW5kIGZhbGxiYWNrIHRvIGEgc3RyaW5nIGlmIHRoZSBwYXJzZSBmYWlsc1xyXG4gICAgICAgICAgICAgICAgLy8gc28sIHNpbXBsZSB2YWx1ZXMgc3VjaCBhcyBcIjEwcHhcIiBhcmUgcGFyc2VkIHRvIEZsb2F0LlxyXG4gICAgICAgICAgICAgICAgLy8gY29tcGxleCB2YWx1ZXMgc3VjaCBhcyBcInJvdGF0ZSgxcmFkKVwiIGFyZSByZXR1cm5lZCBhcyBpcy5cclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpRdWVyeS5jc3ModHdlZW4uZWxlbSwgdHdlZW4ucHJvcCwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAvLyBFbXB0eSBzdHJpbmdzLCBudWxsLCB1bmRlZmluZWQgYW5kIFwiYXV0b1wiIGFyZSBjb252ZXJ0ZWQgdG8gMC5cclxuICAgICAgICAgICAgICAgIHJldHVybiAhcmVzdWx0IHx8IHJlc3VsdCA9PT0gXCJhdXRvXCIgPyAwIDogcmVzdWx0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh0d2Vlbikge1xyXG4gICAgICAgICAgICAgICAgLy8gdXNlIHN0ZXAgaG9vayBmb3IgYmFjayBjb21wYXQgLSB1c2UgY3NzSG9vayBpZiBpdHMgdGhlcmUgLSB1c2UgLnN0eWxlIGlmIGl0c1xyXG4gICAgICAgICAgICAgICAgLy8gYXZhaWxhYmxlIGFuZCB1c2UgcGxhaW4gcHJvcGVydGllcyB3aGVyZSBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgIGlmIChqUXVlcnkuZnguc3RlcFt0d2Vlbi5wcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5meC5zdGVwW3R3ZWVuLnByb3BdKHR3ZWVuKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHdlZW4uZWxlbS5zdHlsZSAmJiAodHdlZW4uZWxlbS5zdHlsZVtqUXVlcnkuY3NzUHJvcHNbdHdlZW4ucHJvcF1dICE9IG51bGwgfHwgalF1ZXJ5LmNzc0hvb2tzW3R3ZWVuLnByb3BdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5zdHlsZSh0d2Vlbi5lbGVtLCB0d2Vlbi5wcm9wLCB0d2Vlbi5ub3cgKyB0d2Vlbi51bml0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHdlZW4uZWxlbVt0d2Vlbi5wcm9wXSA9IHR3ZWVuLm5vdztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gU3VwcG9ydDogSUUgPD05XHJcbiAgICAvLyBQYW5pYyBiYXNlZCBhcHByb2FjaCB0byBzZXR0aW5nIHRoaW5ncyBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcclxuXHJcbiAgICBUd2Vlbi5wcm9wSG9va3Muc2Nyb2xsVG9wID0gVHdlZW4ucHJvcEhvb2tzLnNjcm9sbExlZnQgPSB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodHdlZW4pIHtcclxuICAgICAgICAgICAgaWYgKHR3ZWVuLmVsZW0ubm9kZVR5cGUgJiYgdHdlZW4uZWxlbS5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0d2Vlbi5lbGVtW3R3ZWVuLnByb3BdID0gdHdlZW4ubm93O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBqUXVlcnkuZWFzaW5nID0ge1xyXG4gICAgICAgIGxpbmVhcjogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzd2luZzogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAtIE1hdGguY29zKHAgKiBNYXRoLlBJKSAvIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBqUXVlcnkuZnggPSBUd2Vlbi5wcm90b3R5cGUuaW5pdDtcclxuXHJcbiAgICAvLyBCYWNrIENvbXBhdCA8MS44IGV4dGVuc2lvbiBwb2ludFxyXG4gICAgalF1ZXJ5LmZ4LnN0ZXAgPSB7fTtcclxuXHJcblxyXG5cclxuXHJcbiAgICB2YXJcclxuICAgICAgICBmeE5vdywgdGltZXJJZCxcclxuICAgICAgICByZnh0eXBlcyA9IC9eKD86dG9nZ2xlfHNob3d8aGlkZSkkLyxcclxuICAgICAgICByZnhudW0gPSBuZXcgUmVnRXhwKFwiXig/OihbKy1dKT18KShcIiArIHBudW0gKyBcIikoW2EteiVdKikkXCIsIFwiaVwiKSxcclxuICAgICAgICBycnVuID0gL3F1ZXVlSG9va3MkLyxcclxuICAgICAgICBhbmltYXRpb25QcmVmaWx0ZXJzID0gW2RlZmF1bHRQcmVmaWx0ZXJdLFxyXG4gICAgICAgIHR3ZWVuZXJzID0ge1xyXG4gICAgICAgICAgICBcIipcIjogW2Z1bmN0aW9uIChwcm9wLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHR3ZWVuID0gdGhpcy5jcmVhdGVUd2Vlbihwcm9wLCB2YWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gdHdlZW4uY3VyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMgPSByZnhudW0uZXhlYyh2YWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgdW5pdCA9IHBhcnRzICYmIHBhcnRzWzNdIHx8IChqUXVlcnkuY3NzTnVtYmVyW3Byb3BdID8gXCJcIiA6IFwicHhcIiksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0YXJ0aW5nIHZhbHVlIGNvbXB1dGF0aW9uIGlzIHJlcXVpcmVkIGZvciBwb3RlbnRpYWwgdW5pdCBtaXNtYXRjaGVzXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSAoalF1ZXJ5LmNzc051bWJlcltwcm9wXSB8fCB1bml0ICE9PSBcInB4XCIgJiYgK3RhcmdldCkgJiZcclxuICAgICAgICAgICAgICAgICAgICByZnhudW0uZXhlYyhqUXVlcnkuY3NzKHR3ZWVuLmVsZW0sIHByb3ApKSxcclxuICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4SXRlcmF0aW9ucyA9IDIwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGFydCAmJiBzdGFydFszXSAhPT0gdW5pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRydXN0IHVuaXRzIHJlcG9ydGVkIGJ5IGpRdWVyeS5jc3NcclxuICAgICAgICAgICAgICAgICAgICB1bml0ID0gdW5pdCB8fCBzdGFydFszXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIHVwZGF0ZSB0aGUgdHdlZW4gcHJvcGVydGllcyBsYXRlciBvblxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzID0gcGFydHMgfHwgW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGl2ZWx5IGFwcHJveGltYXRlIGZyb20gYSBub256ZXJvIHN0YXJ0aW5nIHBvaW50XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSArdGFyZ2V0IHx8IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgcHJldmlvdXMgaXRlcmF0aW9uIHplcm9lZCBvdXQsIGRvdWJsZSB1bnRpbCB3ZSBnZXQgKnNvbWV0aGluZypcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIGEgc3RyaW5nIGZvciBkb3VibGluZyBmYWN0b3Igc28gd2UgZG9uJ3QgYWNjaWRlbnRhbGx5IHNlZSBzY2FsZSBhcyB1bmNoYW5nZWQgYmVsb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSBzY2FsZSB8fCBcIi41XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGp1c3QgYW5kIGFwcGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gc3RhcnQgLyBzY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LnN0eWxlKHR3ZWVuLmVsZW0sIHByb3AsIHN0YXJ0ICsgdW5pdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgc2NhbGUsIHRvbGVyYXRpbmcgemVybyBvciBOYU4gZnJvbSB0d2Vlbi5jdXIoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBbmQgYnJlYWtpbmcgdGhlIGxvb3AgaWYgc2NhbGUgaXMgdW5jaGFuZ2VkIG9yIHBlcmZlY3QsIG9yIGlmIHdlJ3ZlIGp1c3QgaGFkIGVub3VnaFxyXG4gICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKHNjYWxlICE9PSAoc2NhbGUgPSB0d2Vlbi5jdXIoKSAvIHRhcmdldCkgJiYgc2NhbGUgIT09IDEgJiYgLS1tYXhJdGVyYXRpb25zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdHdlZW4gcHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSB0d2Vlbi5zdGFydCA9ICtzdGFydCB8fCArdGFyZ2V0IHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdHdlZW4udW5pdCA9IHVuaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgYSArPS8tPSB0b2tlbiB3YXMgcHJvdmlkZWQsIHdlJ3JlIGRvaW5nIGEgcmVsYXRpdmUgYW5pbWF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgdHdlZW4uZW5kID0gcGFydHNbMV0gP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCArIChwYXJ0c1sxXSArIDEpICogcGFydHNbMl0gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICArcGFydHNbMl07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHR3ZWVuO1xyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgLy8gQW5pbWF0aW9ucyBjcmVhdGVkIHN5bmNocm9ub3VzbHkgd2lsbCBydW4gc3luY2hyb25vdXNseVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRnhOb3coKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZ4Tm93ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiAoZnhOb3cgPSBqUXVlcnkubm93KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdlbmVyYXRlIHBhcmFtZXRlcnMgdG8gY3JlYXRlIGEgc3RhbmRhcmQgYW5pbWF0aW9uXHJcbiAgICBmdW5jdGlvbiBnZW5GeCh0eXBlLCBpbmNsdWRlV2lkdGgpIHtcclxuICAgICAgICB2YXIgd2hpY2gsXHJcbiAgICAgICAgICAgIGF0dHJzID0ge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0eXBlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICAvLyBpZiB3ZSBpbmNsdWRlIHdpZHRoLCBzdGVwIHZhbHVlIGlzIDEgdG8gZG8gYWxsIGNzc0V4cGFuZCB2YWx1ZXMsXHJcbiAgICAgICAgLy8gaWYgd2UgZG9uJ3QgaW5jbHVkZSB3aWR0aCwgc3RlcCB2YWx1ZSBpcyAyIHRvIHNraXAgb3ZlciBMZWZ0IGFuZCBSaWdodFxyXG4gICAgICAgIGluY2x1ZGVXaWR0aCA9IGluY2x1ZGVXaWR0aCA/IDEgOiAwO1xyXG4gICAgICAgIGZvciAoOyBpIDwgNDsgaSArPSAyIC0gaW5jbHVkZVdpZHRoKSB7XHJcbiAgICAgICAgICAgIHdoaWNoID0gY3NzRXhwYW5kW2ldO1xyXG4gICAgICAgICAgICBhdHRyc1tcIm1hcmdpblwiICsgd2hpY2hdID0gYXR0cnNbXCJwYWRkaW5nXCIgKyB3aGljaF0gPSB0eXBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluY2x1ZGVXaWR0aCkge1xyXG4gICAgICAgICAgICBhdHRycy5vcGFjaXR5ID0gYXR0cnMud2lkdGggPSB0eXBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGF0dHJzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVR3ZWVuKHZhbHVlLCBwcm9wLCBhbmltYXRpb24pIHtcclxuICAgICAgICB2YXIgdHdlZW4sXHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24gPSAodHdlZW5lcnNbcHJvcF0gfHwgW10pLmNvbmNhdCh0d2VlbmVyc1tcIipcIl0pLFxyXG4gICAgICAgICAgICBpbmRleCA9IDAsXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoKHR3ZWVuID0gY29sbGVjdGlvbltpbmRleF0uY2FsbChhbmltYXRpb24sIHByb3AsIHZhbHVlKSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB3ZSdyZSBkb25lIHdpdGggdGhpcyBwcm9wZXJ0eVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHR3ZWVuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlZmF1bHRQcmVmaWx0ZXIoZWxlbSwgcHJvcHMsIG9wdHMpIHtcclxuICAgICAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOiB0cnVlICovXHJcbiAgICAgICAgdmFyIHByb3AsIHZhbHVlLCB0b2dnbGUsIHR3ZWVuLCBob29rcywgb2xkZmlyZSwgZGlzcGxheSwgZERpc3BsYXksXHJcbiAgICAgICAgICAgIGFuaW0gPSB0aGlzLFxyXG4gICAgICAgICAgICBvcmlnID0ge30sXHJcbiAgICAgICAgICAgIHN0eWxlID0gZWxlbS5zdHlsZSxcclxuICAgICAgICAgICAgaGlkZGVuID0gZWxlbS5ub2RlVHlwZSAmJiBpc0hpZGRlbihlbGVtKSxcclxuICAgICAgICAgICAgZGF0YVNob3cgPSBqUXVlcnkuX2RhdGEoZWxlbSwgXCJmeHNob3dcIik7XHJcblxyXG4gICAgICAgIC8vIGhhbmRsZSBxdWV1ZTogZmFsc2UgcHJvbWlzZXNcclxuICAgICAgICBpZiAoIW9wdHMucXVldWUpIHtcclxuICAgICAgICAgICAgaG9va3MgPSBqUXVlcnkuX3F1ZXVlSG9va3MoZWxlbSwgXCJmeFwiKTtcclxuICAgICAgICAgICAgaWYgKGhvb2tzLnVucXVldWVkID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGhvb2tzLnVucXVldWVkID0gMDtcclxuICAgICAgICAgICAgICAgIG9sZGZpcmUgPSBob29rcy5lbXB0eS5maXJlO1xyXG4gICAgICAgICAgICAgICAgaG9va3MuZW1wdHkuZmlyZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWhvb2tzLnVucXVldWVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZGZpcmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhvb2tzLnVucXVldWVkKys7XHJcblxyXG4gICAgICAgICAgICBhbmltLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkb2luZyB0aGlzIG1ha2VzIHN1cmUgdGhhdCB0aGUgY29tcGxldGUgaGFuZGxlciB3aWxsIGJlIGNhbGxlZFxyXG4gICAgICAgICAgICAgICAgLy8gYmVmb3JlIHRoaXMgY29tcGxldGVzXHJcbiAgICAgICAgICAgICAgICBhbmltLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9va3MudW5xdWV1ZWQtLTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWpRdWVyeS5xdWV1ZShlbGVtLCBcImZ4XCIpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob29rcy5lbXB0eS5maXJlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaGVpZ2h0L3dpZHRoIG92ZXJmbG93IHBhc3NcclxuICAgICAgICBpZiAoZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoXCJoZWlnaHRcIiBpbiBwcm9wcyB8fCBcIndpZHRoXCIgaW4gcHJvcHMpKSB7XHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IG5vdGhpbmcgc25lYWtzIG91dFxyXG4gICAgICAgICAgICAvLyBSZWNvcmQgYWxsIDMgb3ZlcmZsb3cgYXR0cmlidXRlcyBiZWNhdXNlIElFIGRvZXMgbm90XHJcbiAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgb3ZlcmZsb3cgYXR0cmlidXRlIHdoZW4gb3ZlcmZsb3dYIGFuZFxyXG4gICAgICAgICAgICAvLyBvdmVyZmxvd1kgYXJlIHNldCB0byB0aGUgc2FtZSB2YWx1ZVxyXG4gICAgICAgICAgICBvcHRzLm92ZXJmbG93ID0gW3N0eWxlLm92ZXJmbG93LCBzdHlsZS5vdmVyZmxvd1gsIHN0eWxlLm92ZXJmbG93WV07XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgZGlzcGxheSBwcm9wZXJ0eSB0byBpbmxpbmUtYmxvY2sgZm9yIGhlaWdodC93aWR0aFxyXG4gICAgICAgICAgICAvLyBhbmltYXRpb25zIG9uIGlubGluZSBlbGVtZW50cyB0aGF0IGFyZSBoYXZpbmcgd2lkdGgvaGVpZ2h0IGFuaW1hdGVkXHJcbiAgICAgICAgICAgIGRpc3BsYXkgPSBqUXVlcnkuY3NzKGVsZW0sIFwiZGlzcGxheVwiKTtcclxuICAgICAgICAgICAgZERpc3BsYXkgPSBkZWZhdWx0RGlzcGxheShlbGVtLm5vZGVOYW1lKTtcclxuICAgICAgICAgICAgaWYgKGRpc3BsYXkgPT09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID0gZERpc3BsYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRpc3BsYXkgPT09IFwiaW5saW5lXCIgJiZcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5jc3MoZWxlbSwgXCJmbG9hdFwiKSA9PT0gXCJub25lXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpbmxpbmUtbGV2ZWwgZWxlbWVudHMgYWNjZXB0IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgICAgIC8vIGJsb2NrLWxldmVsIGVsZW1lbnRzIG5lZWQgdG8gYmUgaW5saW5lIHdpdGggbGF5b3V0XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN1cHBvcnQuaW5saW5lQmxvY2tOZWVkc0xheW91dCB8fCBkRGlzcGxheSA9PT0gXCJpbmxpbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZS56b29tID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdHMub3ZlcmZsb3cpIHtcclxuICAgICAgICAgICAgc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICBpZiAoIXN1cHBvcnQuc2hyaW5rV3JhcEJsb2NrcygpKSB7XHJcbiAgICAgICAgICAgICAgICBhbmltLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUub3ZlcmZsb3cgPSBvcHRzLm92ZXJmbG93WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93WCA9IG9wdHMub3ZlcmZsb3dbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUub3ZlcmZsb3dZID0gb3B0cy5vdmVyZmxvd1syXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzaG93L2hpZGUgcGFzc1xyXG4gICAgICAgIGZvciAocHJvcCBpbiBwcm9wcykge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHByb3BzW3Byb3BdO1xyXG4gICAgICAgICAgICBpZiAocmZ4dHlwZXMuZXhlYyh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwcm9wc1twcm9wXTtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZSA9IHRvZ2dsZSB8fCB2YWx1ZSA9PT0gXCJ0b2dnbGVcIjtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gKGhpZGRlbiA/IFwiaGlkZVwiIDogXCJzaG93XCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGRhdGFTaG93IGxlZnQgb3ZlciBmcm9tIGEgc3RvcHBlZCBoaWRlIG9yIHNob3cgYW5kIHdlIGFyZSBnb2luZyB0byBwcm9jZWVkIHdpdGggc2hvdywgd2Ugc2hvdWxkIHByZXRlbmQgdG8gYmUgaGlkZGVuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcInNob3dcIiAmJiBkYXRhU2hvdyAmJiBkYXRhU2hvd1twcm9wXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb3JpZ1twcm9wXSA9IGRhdGFTaG93ICYmIGRhdGFTaG93W3Byb3BdIHx8IGpRdWVyeS5zdHlsZShlbGVtLCBwcm9wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFqUXVlcnkuaXNFbXB0eU9iamVjdChvcmlnKSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVNob3cpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcImhpZGRlblwiIGluIGRhdGFTaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuID0gZGF0YVNob3cuaGlkZGVuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YVNob3cgPSBqUXVlcnkuX2RhdGEoZWxlbSwgXCJmeHNob3dcIiwge30pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9yZSBzdGF0ZSBpZiBpdHMgdG9nZ2xlIC0gZW5hYmxlcyAuc3RvcCgpLnRvZ2dsZSgpIHRvIFwicmV2ZXJzZVwiXHJcbiAgICAgICAgICAgIGlmICh0b2dnbGUpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFTaG93LmhpZGRlbiA9ICFoaWRkZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGhpZGRlbikge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KGVsZW0pLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFuaW0uZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KGVsZW0pLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFuaW0uZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcDtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5fcmVtb3ZlRGF0YShlbGVtLCBcImZ4c2hvd1wiKTtcclxuICAgICAgICAgICAgICAgIGZvciAocHJvcCBpbiBvcmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LnN0eWxlKGVsZW0sIHByb3AsIG9yaWdbcHJvcF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9yIChwcm9wIGluIG9yaWcpIHtcclxuICAgICAgICAgICAgICAgIHR3ZWVuID0gY3JlYXRlVHdlZW4oaGlkZGVuID8gZGF0YVNob3dbcHJvcF0gOiAwLCBwcm9wLCBhbmltKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIShwcm9wIGluIGRhdGFTaG93KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTaG93W3Byb3BdID0gdHdlZW4uc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhpZGRlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbi5lbmQgPSB0d2Vlbi5zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW4uc3RhcnQgPSBwcm9wID09PSBcIndpZHRoXCIgfHwgcHJvcCA9PT0gXCJoZWlnaHRcIiA/IDEgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcm9wRmlsdGVyKHByb3BzLCBzcGVjaWFsRWFzaW5nKSB7XHJcbiAgICAgICAgdmFyIGluZGV4LCBuYW1lLCBlYXNpbmcsIHZhbHVlLCBob29rcztcclxuXHJcbiAgICAgICAgLy8gY2FtZWxDYXNlLCBzcGVjaWFsRWFzaW5nIGFuZCBleHBhbmQgY3NzSG9vayBwYXNzXHJcbiAgICAgICAgZm9yIChpbmRleCBpbiBwcm9wcykge1xyXG4gICAgICAgICAgICBuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZShpbmRleCk7XHJcbiAgICAgICAgICAgIGVhc2luZyA9IHNwZWNpYWxFYXNpbmdbbmFtZV07XHJcbiAgICAgICAgICAgIHZhbHVlID0gcHJvcHNbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoalF1ZXJ5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBlYXNpbmcgPSB2YWx1ZVsxXTtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcHJvcHNbaW5kZXhdID0gdmFsdWVbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcHJvcHNbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwcm9wc1tpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoaG9va3MgJiYgXCJleHBhbmRcIiBpbiBob29rcykge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBob29rcy5leHBhbmQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHByb3BzW25hbWVdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG5vdCBxdWl0ZSAkLmV4dGVuZCwgdGhpcyB3b250IG92ZXJ3cml0ZSBrZXlzIGFscmVhZHkgcHJlc2VudC5cclxuICAgICAgICAgICAgICAgIC8vIGFsc28gLSByZXVzaW5nICdpbmRleCcgZnJvbSBhYm92ZSBiZWNhdXNlIHdlIGhhdmUgdGhlIGNvcnJlY3QgXCJuYW1lXCJcclxuICAgICAgICAgICAgICAgIGZvciAoaW5kZXggaW4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShpbmRleCBpbiBwcm9wcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHNbaW5kZXhdID0gdmFsdWVbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWFsRWFzaW5nW2luZGV4XSA9IGVhc2luZztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzcGVjaWFsRWFzaW5nW25hbWVdID0gZWFzaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEFuaW1hdGlvbihlbGVtLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCxcclxuICAgICAgICAgICAgc3RvcHBlZCxcclxuICAgICAgICAgICAgaW5kZXggPSAwLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBhbmltYXRpb25QcmVmaWx0ZXJzLmxlbmd0aCxcclxuICAgICAgICAgICAgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZG9uJ3QgbWF0Y2ggZWxlbSBpbiB0aGUgOmFuaW1hdGVkIHNlbGVjdG9yXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGljay5lbGVtO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdG9wcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUaW1lID0gZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcclxuICAgICAgICAgICAgICAgICAgICByZW1haW5pbmcgPSBNYXRoLm1heCgwLCBhbmltYXRpb24uc3RhcnRUaW1lICsgYW5pbWF0aW9uLmR1cmF0aW9uIC0gY3VycmVudFRpbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFyY2hhaWMgY3Jhc2ggYnVnIHdvbid0IGFsbG93IHVzIHRvIHVzZSAxIC0gKCAwLjUgfHwgMCApICgjMTI0OTcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IHJlbWFpbmluZyAvIGFuaW1hdGlvbi5kdXJhdGlvbiB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnQgPSAxIC0gdGVtcCxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gYW5pbWF0aW9uLnR3ZWVucy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLnR3ZWVuc1tpbmRleF0ucnVuKHBlcmNlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLm5vdGlmeVdpdGgoZWxlbSwgW2FuaW1hdGlvbiwgcGVyY2VudCwgcmVtYWluaW5nXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBlcmNlbnQgPCAxICYmIGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1haW5pbmc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKGVsZW0sIFthbmltYXRpb25dKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbiA9IGRlZmVycmVkLnByb21pc2Uoe1xyXG4gICAgICAgICAgICAgICAgZWxlbTogZWxlbSxcclxuICAgICAgICAgICAgICAgIHByb3BzOiBqUXVlcnkuZXh0ZW5kKHt9LCBwcm9wZXJ0aWVzKSxcclxuICAgICAgICAgICAgICAgIG9wdHM6IGpRdWVyeS5leHRlbmQodHJ1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwZWNpYWxFYXNpbmc6IHt9XHJcbiAgICAgICAgICAgICAgICB9LCBvcHRpb25zKSxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsUHJvcGVydGllczogcHJvcGVydGllcyxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsT3B0aW9uczogb3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHdlZW5zOiBbXSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVR3ZWVuOiBmdW5jdGlvbiAocHJvcCwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR3ZWVuID0galF1ZXJ5LlR3ZWVuKGVsZW0sIGFuaW1hdGlvbi5vcHRzLCBwcm9wLCBlbmQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5vcHRzLnNwZWNpYWxFYXNpbmdbcHJvcF0gfHwgYW5pbWF0aW9uLm9wdHMuZWFzaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24udHdlZW5zLnB1c2godHdlZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0d2VlbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdG9wOiBmdW5jdGlvbiAoZ290b0VuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlIGFyZSBnb2luZyB0byB0aGUgZW5kLCB3ZSB3YW50IHRvIHJ1biBhbGwgdGhlIHR3ZWVuc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2Ugd2Ugc2tpcCB0aGlzIHBhcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gZ290b0VuZCA/IGFuaW1hdGlvbi50d2VlbnMubGVuZ3RoIDogMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RvcHBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcHBlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi50d2VlbnNbaW5kZXhdLnJ1bigxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc29sdmUgd2hlbiB3ZSBwbGF5ZWQgdGhlIGxhc3QgZnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UsIHJlamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnb3RvRW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKGVsZW0sIFthbmltYXRpb24sIGdvdG9FbmRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3RXaXRoKGVsZW0sIFthbmltYXRpb24sIGdvdG9FbmRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBwcm9wcyA9IGFuaW1hdGlvbi5wcm9wcztcclxuXHJcbiAgICAgICAgcHJvcEZpbHRlcihwcm9wcywgYW5pbWF0aW9uLm9wdHMuc3BlY2lhbEVhc2luZyk7XHJcblxyXG4gICAgICAgIGZvciAoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBhbmltYXRpb25QcmVmaWx0ZXJzW2luZGV4XS5jYWxsKGFuaW1hdGlvbiwgZWxlbSwgcHJvcHMsIGFuaW1hdGlvbi5vcHRzKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgalF1ZXJ5Lm1hcChwcm9wcywgY3JlYXRlVHdlZW4sIGFuaW1hdGlvbik7XHJcblxyXG4gICAgICAgIGlmIChqUXVlcnkuaXNGdW5jdGlvbihhbmltYXRpb24ub3B0cy5zdGFydCkpIHtcclxuICAgICAgICAgICAgYW5pbWF0aW9uLm9wdHMuc3RhcnQuY2FsbChlbGVtLCBhbmltYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgalF1ZXJ5LmZ4LnRpbWVyKFxyXG4gICAgICAgICAgICBqUXVlcnkuZXh0ZW5kKHRpY2ssIHtcclxuICAgICAgICAgICAgICAgIGVsZW06IGVsZW0sXHJcbiAgICAgICAgICAgICAgICBhbmltOiBhbmltYXRpb24sXHJcbiAgICAgICAgICAgICAgICBxdWV1ZTogYW5pbWF0aW9uLm9wdHMucXVldWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBhdHRhY2ggY2FsbGJhY2tzIGZyb20gb3B0aW9uc1xyXG4gICAgICAgIHJldHVybiBhbmltYXRpb24ucHJvZ3Jlc3MoYW5pbWF0aW9uLm9wdHMucHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgIC5kb25lKGFuaW1hdGlvbi5vcHRzLmRvbmUsIGFuaW1hdGlvbi5vcHRzLmNvbXBsZXRlKVxyXG4gICAgICAgICAgICAuZmFpbChhbmltYXRpb24ub3B0cy5mYWlsKVxyXG4gICAgICAgICAgICAuYWx3YXlzKGFuaW1hdGlvbi5vcHRzLmFsd2F5cyk7XHJcbiAgICB9XHJcblxyXG4gICAgalF1ZXJ5LkFuaW1hdGlvbiA9IGpRdWVyeS5leHRlbmQoQW5pbWF0aW9uLCB7XHJcbiAgICAgICAgdHdlZW5lcjogZnVuY3Rpb24gKHByb3BzLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBpZiAoalF1ZXJ5LmlzRnVuY3Rpb24ocHJvcHMpKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHByb3BzO1xyXG4gICAgICAgICAgICAgICAgcHJvcHMgPSBbXCIqXCJdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJvcHMgPSBwcm9wcy5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBwcm9wLFxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwLFxyXG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgZm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wID0gcHJvcHNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdHdlZW5lcnNbcHJvcF0gPSB0d2VlbmVyc1twcm9wXSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIHR3ZWVuZXJzW3Byb3BdLnVuc2hpZnQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJlZmlsdGVyOiBmdW5jdGlvbiAoY2FsbGJhY2ssIHByZXBlbmQpIHtcclxuICAgICAgICAgICAgaWYgKHByZXBlbmQpIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvblByZWZpbHRlcnMudW5zaGlmdChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25QcmVmaWx0ZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LnNwZWVkID0gZnVuY3Rpb24gKHNwZWVkLCBlYXNpbmcsIGZuKSB7XHJcbiAgICAgICAgdmFyIG9wdCA9IHNwZWVkICYmIHR5cGVvZiBzcGVlZCA9PT0gXCJvYmplY3RcIiA/IGpRdWVyeS5leHRlbmQoe30sIHNwZWVkKSA6IHtcclxuICAgICAgICAgICAgY29tcGxldGU6IGZuIHx8ICFmbiAmJiBlYXNpbmcgfHxcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5pc0Z1bmN0aW9uKHNwZWVkKSAmJiBzcGVlZCxcclxuICAgICAgICAgICAgZHVyYXRpb246IHNwZWVkLFxyXG4gICAgICAgICAgICBlYXNpbmc6IGZuICYmIGVhc2luZyB8fCBlYXNpbmcgJiYgIWpRdWVyeS5pc0Z1bmN0aW9uKGVhc2luZykgJiYgZWFzaW5nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb3B0LmR1cmF0aW9uID0galF1ZXJ5LmZ4Lm9mZiA/IDAgOiB0eXBlb2Ygb3B0LmR1cmF0aW9uID09PSBcIm51bWJlclwiID8gb3B0LmR1cmF0aW9uIDpcclxuICAgICAgICAgICAgb3B0LmR1cmF0aW9uIGluIGpRdWVyeS5meC5zcGVlZHMgPyBqUXVlcnkuZnguc3BlZWRzW29wdC5kdXJhdGlvbl0gOiBqUXVlcnkuZnguc3BlZWRzLl9kZWZhdWx0O1xyXG5cclxuICAgICAgICAvLyBub3JtYWxpemUgb3B0LnF1ZXVlIC0gdHJ1ZS91bmRlZmluZWQvbnVsbCAtPiBcImZ4XCJcclxuICAgICAgICBpZiAob3B0LnF1ZXVlID09IG51bGwgfHwgb3B0LnF1ZXVlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIG9wdC5xdWV1ZSA9IFwiZnhcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFF1ZXVlaW5nXHJcbiAgICAgICAgb3B0Lm9sZCA9IG9wdC5jb21wbGV0ZTtcclxuXHJcbiAgICAgICAgb3B0LmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoalF1ZXJ5LmlzRnVuY3Rpb24ob3B0Lm9sZCkpIHtcclxuICAgICAgICAgICAgICAgIG9wdC5vbGQuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5xdWV1ZSkge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LmRlcXVldWUodGhpcywgb3B0LnF1ZXVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBvcHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGpRdWVyeS5mbi5leHRlbmQoe1xyXG4gICAgICAgIGZhZGVUbzogZnVuY3Rpb24gKHNwZWVkLCB0bywgZWFzaW5nLCBjYWxsYmFjaykge1xyXG5cclxuICAgICAgICAgICAgLy8gc2hvdyBhbnkgaGlkZGVuIGVsZW1lbnRzIGFmdGVyIHNldHRpbmcgb3BhY2l0eSB0byAwXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlcihpc0hpZGRlbikuY3NzKFwib3BhY2l0eVwiLCAwKS5zaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhbmltYXRlIHRvIHRoZSB2YWx1ZSBzcGVjaWZpZWRcclxuICAgICAgICAgICAgICAgIC5lbmQoKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiB0b1xyXG4gICAgICAgICAgICAgICAgfSwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2spO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYW5pbWF0ZTogZnVuY3Rpb24gKHByb3AsIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhciBlbXB0eSA9IGpRdWVyeS5pc0VtcHR5T2JqZWN0KHByb3ApLFxyXG4gICAgICAgICAgICAgICAgb3B0YWxsID0galF1ZXJ5LnNwZWVkKHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrKSxcclxuICAgICAgICAgICAgICAgIGRvQW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9wZXJhdGUgb24gYSBjb3B5IG9mIHByb3Agc28gcGVyLXByb3BlcnR5IGVhc2luZyB3b24ndCBiZSBsb3N0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuaW0gPSBBbmltYXRpb24odGhpcywgalF1ZXJ5LmV4dGVuZCh7fSwgcHJvcCksIG9wdGFsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEVtcHR5IGFuaW1hdGlvbnMsIG9yIGZpbmlzaGluZyByZXNvbHZlcyBpbW1lZGlhdGVseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbXB0eSB8fCBqUXVlcnkuX2RhdGEodGhpcywgXCJmaW5pc2hcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbS5zdG9wKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRvQW5pbWF0aW9uLmZpbmlzaCA9IGRvQW5pbWF0aW9uO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGVtcHR5IHx8IG9wdGFsbC5xdWV1ZSA9PT0gZmFsc2UgP1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lYWNoKGRvQW5pbWF0aW9uKSA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlKG9wdGFsbC5xdWV1ZSwgZG9BbmltYXRpb24pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKHR5cGUsIGNsZWFyUXVldWUsIGdvdG9FbmQpIHtcclxuICAgICAgICAgICAgdmFyIHN0b3BRdWV1ZSA9IGZ1bmN0aW9uIChob29rcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0b3AgPSBob29rcy5zdG9wO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGhvb2tzLnN0b3A7XHJcbiAgICAgICAgICAgICAgICBzdG9wKGdvdG9FbmQpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBnb3RvRW5kID0gY2xlYXJRdWV1ZTtcclxuICAgICAgICAgICAgICAgIGNsZWFyUXVldWUgPSB0eXBlO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2xlYXJRdWV1ZSAmJiB0eXBlICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWV1ZSh0eXBlIHx8IFwiZnhcIiwgW10pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZXF1ZXVlID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHR5cGUgIT0gbnVsbCAmJiB0eXBlICsgXCJxdWV1ZUhvb2tzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXJzID0galF1ZXJ5LnRpbWVycyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0galF1ZXJ5Ll9kYXRhKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2luZGV4XSAmJiBkYXRhW2luZGV4XS5zdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BRdWV1ZShkYXRhW2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGluZGV4IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaW5kZXhdICYmIGRhdGFbaW5kZXhdLnN0b3AgJiYgcnJ1bi50ZXN0KGluZGV4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcFF1ZXVlKGRhdGFbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGluZGV4ID0gdGltZXJzLmxlbmd0aDsgaW5kZXgtLTspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGltZXJzW2luZGV4XS5lbGVtID09PSB0aGlzICYmICh0eXBlID09IG51bGwgfHwgdGltZXJzW2luZGV4XS5xdWV1ZSA9PT0gdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXJzW2luZGV4XS5hbmltLnN0b3AoZ290b0VuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcXVldWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSBuZXh0IGluIHRoZSBxdWV1ZSBpZiB0aGUgbGFzdCBzdGVwIHdhc24ndCBmb3JjZWRcclxuICAgICAgICAgICAgICAgIC8vIHRpbWVycyBjdXJyZW50bHkgd2lsbCBjYWxsIHRoZWlyIGNvbXBsZXRlIGNhbGxiYWNrcywgd2hpY2ggd2lsbCBkZXF1ZXVlXHJcbiAgICAgICAgICAgICAgICAvLyBidXQgb25seSBpZiB0aGV5IHdlcmUgZ290b0VuZFxyXG4gICAgICAgICAgICAgICAgaWYgKGRlcXVldWUgfHwgIWdvdG9FbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZGVxdWV1ZSh0aGlzLCB0eXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaW5pc2g6IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBqUXVlcnkuX2RhdGEodGhpcyksXHJcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSBkYXRhW3R5cGUgKyBcInF1ZXVlXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvb2tzID0gZGF0YVt0eXBlICsgXCJxdWV1ZUhvb2tzXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVycyA9IGpRdWVyeS50aW1lcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gcXVldWUgPyBxdWV1ZS5sZW5ndGggOiAwO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGVuYWJsZSBmaW5pc2hpbmcgZmxhZyBvbiBwcml2YXRlIGRhdGFcclxuICAgICAgICAgICAgICAgIGRhdGEuZmluaXNoID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSB0aGUgcXVldWUgZmlyc3RcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5xdWV1ZSh0aGlzLCB0eXBlLCBbXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGhvb2tzICYmIGhvb2tzLnN0b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBob29rcy5zdG9wLmNhbGwodGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbG9vayBmb3IgYW55IGFjdGl2ZSBhbmltYXRpb25zLCBhbmQgZmluaXNoIHRoZW1cclxuICAgICAgICAgICAgICAgIGZvciAoaW5kZXggPSB0aW1lcnMubGVuZ3RoOyBpbmRleC0tOykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aW1lcnNbaW5kZXhdLmVsZW0gPT09IHRoaXMgJiYgdGltZXJzW2luZGV4XS5xdWV1ZSA9PT0gdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcnNbaW5kZXhdLmFuaW0uc3RvcCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGxvb2sgZm9yIGFueSBhbmltYXRpb25zIGluIHRoZSBvbGQgcXVldWUgYW5kIGZpbmlzaCB0aGVtXHJcbiAgICAgICAgICAgICAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWVbaW5kZXhdICYmIHF1ZXVlW2luZGV4XS5maW5pc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWVbaW5kZXhdLmZpbmlzaC5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0dXJuIG9mZiBmaW5pc2hpbmcgZmxhZ1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGRhdGEuZmluaXNoO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkuZWFjaChbXCJ0b2dnbGVcIiwgXCJzaG93XCIsIFwiaGlkZVwiXSwgZnVuY3Rpb24gKGksIG5hbWUpIHtcclxuICAgICAgICB2YXIgY3NzRm4gPSBqUXVlcnkuZm5bbmFtZV07XHJcbiAgICAgICAgalF1ZXJ5LmZuW25hbWVdID0gZnVuY3Rpb24gKHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVlZCA9PSBudWxsIHx8IHR5cGVvZiBzcGVlZCA9PT0gXCJib29sZWFuXCIgP1xyXG4gICAgICAgICAgICAgICAgY3NzRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKSA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUoZ2VuRngobmFtZSwgdHJ1ZSksIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gR2VuZXJhdGUgc2hvcnRjdXRzIGZvciBjdXN0b20gYW5pbWF0aW9uc1xyXG4gICAgalF1ZXJ5LmVhY2goe1xyXG4gICAgICAgIHNsaWRlRG93bjogZ2VuRngoXCJzaG93XCIpLFxyXG4gICAgICAgIHNsaWRlVXA6IGdlbkZ4KFwiaGlkZVwiKSxcclxuICAgICAgICBzbGlkZVRvZ2dsZTogZ2VuRngoXCJ0b2dnbGVcIiksXHJcbiAgICAgICAgZmFkZUluOiB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IFwic2hvd1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWRlT3V0OiB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IFwiaGlkZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWRlVG9nZ2xlOiB7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IFwidG9nZ2xlXCJcclxuICAgICAgICB9XHJcbiAgICB9LCBmdW5jdGlvbiAobmFtZSwgcHJvcHMpIHtcclxuICAgICAgICBqUXVlcnkuZm5bbmFtZV0gPSBmdW5jdGlvbiAoc3BlZWQsIGVhc2luZywgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZShwcm9wcywgc3BlZWQsIGVhc2luZywgY2FsbGJhY2spO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkudGltZXJzID0gW107XHJcbiAgICBqUXVlcnkuZngudGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGltZXIsXHJcbiAgICAgICAgICAgIHRpbWVycyA9IGpRdWVyeS50aW1lcnMsXHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICBmeE5vdyA9IGpRdWVyeS5ub3coKTtcclxuXHJcbiAgICAgICAgZm9yICg7IGkgPCB0aW1lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGltZXIgPSB0aW1lcnNbaV07XHJcbiAgICAgICAgICAgIC8vIENoZWNrcyB0aGUgdGltZXIgaGFzIG5vdCBhbHJlYWR5IGJlZW4gcmVtb3ZlZFxyXG4gICAgICAgICAgICBpZiAoIXRpbWVyKCkgJiYgdGltZXJzW2ldID09PSB0aW1lcikge1xyXG4gICAgICAgICAgICAgICAgdGltZXJzLnNwbGljZShpLS0sIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRpbWVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgalF1ZXJ5LmZ4LnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnhOb3cgPSB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGpRdWVyeS5meC50aW1lciA9IGZ1bmN0aW9uICh0aW1lcikge1xyXG4gICAgICAgIGpRdWVyeS50aW1lcnMucHVzaCh0aW1lcik7XHJcbiAgICAgICAgaWYgKHRpbWVyKCkpIHtcclxuICAgICAgICAgICAgalF1ZXJ5LmZ4LnN0YXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgalF1ZXJ5LnRpbWVycy5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGpRdWVyeS5meC5pbnRlcnZhbCA9IDEzO1xyXG5cclxuICAgIGpRdWVyeS5meC5zdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRpbWVySWQpIHtcclxuICAgICAgICAgICAgdGltZXJJZCA9IHNldEludGVydmFsKGpRdWVyeS5meC50aWNrLCBqUXVlcnkuZnguaW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmZ4LnN0b3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcklkKTtcclxuICAgICAgICB0aW1lcklkID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmZ4LnNwZWVkcyA9IHtcclxuICAgICAgICBzbG93OiA2MDAsXHJcbiAgICAgICAgZmFzdDogMjAwLFxyXG4gICAgICAgIC8vIERlZmF1bHQgc3BlZWRcclxuICAgICAgICBfZGVmYXVsdDogNDAwXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvLyBCYXNlZCBvZmYgb2YgdGhlIHBsdWdpbiBieSBDbGludCBIZWxmZXJzLCB3aXRoIHBlcm1pc3Npb24uXHJcbiAgICAvLyBodHRwOi8vYmxpbmRzaWduYWxzLmNvbS9pbmRleC5waHAvMjAwOS8wNy9qcXVlcnktZGVsYXkvXHJcbiAgICBqUXVlcnkuZm4uZGVsYXkgPSBmdW5jdGlvbiAodGltZSwgdHlwZSkge1xyXG4gICAgICAgIHRpbWUgPSBqUXVlcnkuZnggPyBqUXVlcnkuZnguc3BlZWRzW3RpbWVdIHx8IHRpbWUgOiB0aW1lO1xyXG4gICAgICAgIHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUodHlwZSwgZnVuY3Rpb24gKG5leHQsIGhvb2tzKSB7XHJcbiAgICAgICAgICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChuZXh0LCB0aW1lKTtcclxuICAgICAgICAgICAgaG9va3Muc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGEsIGlucHV0LCBzZWxlY3QsIG9wdCxcclxuICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICAgICAgLy8gU2V0dXBcclxuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiY2xhc3NOYW1lXCIsIFwidFwiKTtcclxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gXCIgIDxsaW5rLz48dGFibGU+PC90YWJsZT48YSBocmVmPScvYSc+YTwvYT48aW5wdXQgdHlwZT0nY2hlY2tib3gnLz5cIjtcclxuICAgICAgICBhID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYVwiKVswXTtcclxuXHJcbiAgICAgICAgLy8gRmlyc3QgYmF0Y2ggb2YgdGVzdHMuXHJcbiAgICAgICAgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICAgICAgICBvcHQgPSBzZWxlY3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSk7XHJcbiAgICAgICAgaW5wdXQgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKVswXTtcclxuXHJcbiAgICAgICAgYS5zdHlsZS5jc3NUZXh0ID0gXCJ0b3A6MXB4XCI7XHJcblxyXG4gICAgICAgIC8vIFRlc3Qgc2V0QXR0cmlidXRlIG9uIGNhbWVsQ2FzZSBjbGFzcy4gSWYgaXQgd29ya3MsIHdlIG5lZWQgYXR0ckZpeGVzIHdoZW4gZG9pbmcgZ2V0L3NldEF0dHJpYnV0ZSAoaWU2LzcpXHJcbiAgICAgICAgc3VwcG9ydC5nZXRTZXRBdHRyaWJ1dGUgPSBkaXYuY2xhc3NOYW1lICE9PSBcInRcIjtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBzdHlsZSBpbmZvcm1hdGlvbiBmcm9tIGdldEF0dHJpYnV0ZVxyXG4gICAgICAgIC8vIChJRSB1c2VzIC5jc3NUZXh0IGluc3RlYWQpXHJcbiAgICAgICAgc3VwcG9ydC5zdHlsZSA9IC90b3AvLnRlc3QoYS5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKSk7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IFVSTHMgYXJlbid0IG1hbmlwdWxhdGVkXHJcbiAgICAgICAgLy8gKElFIG5vcm1hbGl6ZXMgaXQgYnkgZGVmYXVsdClcclxuICAgICAgICBzdXBwb3J0LmhyZWZOb3JtYWxpemVkID0gYS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpID09PSBcIi9hXCI7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRoZSBkZWZhdWx0IGNoZWNrYm94L3JhZGlvIHZhbHVlIChcIlwiIG9uIFdlYktpdDsgXCJvblwiIGVsc2V3aGVyZSlcclxuICAgICAgICBzdXBwb3J0LmNoZWNrT24gPSAhIWlucHV0LnZhbHVlO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBhIHNlbGVjdGVkLWJ5LWRlZmF1bHQgb3B0aW9uIGhhcyBhIHdvcmtpbmcgc2VsZWN0ZWQgcHJvcGVydHkuXHJcbiAgICAgICAgLy8gKFdlYktpdCBkZWZhdWx0cyB0byBmYWxzZSBpbnN0ZWFkIG9mIHRydWUsIElFIHRvbywgaWYgaXQncyBpbiBhbiBvcHRncm91cClcclxuICAgICAgICBzdXBwb3J0Lm9wdFNlbGVjdGVkID0gb3B0LnNlbGVjdGVkO1xyXG5cclxuICAgICAgICAvLyBUZXN0cyBmb3IgZW5jdHlwZSBzdXBwb3J0IG9uIGEgZm9ybSAoIzY3NDMpXHJcbiAgICAgICAgc3VwcG9ydC5lbmN0eXBlID0gISFkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKS5lbmN0eXBlO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgb3B0aW9ucyBpbnNpZGUgZGlzYWJsZWQgc2VsZWN0cyBhcmVuJ3QgbWFya2VkIGFzIGRpc2FibGVkXHJcbiAgICAgICAgLy8gKFdlYktpdCBtYXJrcyB0aGVtIGFzIGRpc2FibGVkKVxyXG4gICAgICAgIHNlbGVjdC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgc3VwcG9ydC5vcHREaXNhYmxlZCA9ICFvcHQuZGlzYWJsZWQ7XHJcblxyXG4gICAgICAgIC8vIFN1cHBvcnQ6IElFOCBvbmx5XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UgY2FuIHRydXN0IGdldEF0dHJpYnV0ZShcInZhbHVlXCIpXHJcbiAgICAgICAgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJcIik7XHJcbiAgICAgICAgc3VwcG9ydC5pbnB1dCA9IGlucHV0LmdldEF0dHJpYnV0ZShcInZhbHVlXCIpID09PSBcIlwiO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBhbiBpbnB1dCBtYWludGFpbnMgaXRzIHZhbHVlIGFmdGVyIGJlY29taW5nIGEgcmFkaW9cclxuICAgICAgICBpbnB1dC52YWx1ZSA9IFwidFwiO1xyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyYWRpb1wiKTtcclxuICAgICAgICBzdXBwb3J0LnJhZGlvVmFsdWUgPSBpbnB1dC52YWx1ZSA9PT0gXCJ0XCI7XHJcblxyXG4gICAgICAgIC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUUuXHJcbiAgICAgICAgYSA9IGlucHV0ID0gc2VsZWN0ID0gb3B0ID0gZGl2ID0gbnVsbDtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIHZhciBycmV0dXJuID0gL1xcci9nO1xyXG5cclxuICAgIGpRdWVyeS5mbi5leHRlbmQoe1xyXG4gICAgICAgIHZhbDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBob29rcywgcmV0LCBpc0Z1bmN0aW9uLFxyXG4gICAgICAgICAgICAgICAgZWxlbSA9IHRoaXNbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9va3MgPSBqUXVlcnkudmFsSG9va3NbZWxlbS50eXBlXSB8fCBqUXVlcnkudmFsSG9va3NbZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldChlbGVtLCBcInZhbHVlXCIpKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBlbGVtLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIiA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBtb3N0IGNvbW1vbiBzdHJpbmcgY2FzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LnJlcGxhY2UocnJldHVybiwgXCJcIikgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgY2FzZXMgd2hlcmUgdmFsdWUgaXMgbnVsbC91bmRlZiBvciBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID09IG51bGwgPyBcIlwiIDogcmV0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZVR5cGUgIT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWx1ZS5jYWxsKHRoaXMsIGksIGpRdWVyeSh0aGlzKS52YWwoKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRyZWF0IG51bGwvdW5kZWZpbmVkIGFzIFwiXCI7IGNvbnZlcnQgbnVtYmVycyB0byBzdHJpbmdcclxuICAgICAgICAgICAgICAgIGlmICh2YWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgKz0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoalF1ZXJ5LmlzQXJyYXkodmFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGpRdWVyeS5tYXAodmFsLCBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5LnZhbEhvb2tzW3RoaXMudHlwZV0gfHwgalF1ZXJ5LnZhbEhvb2tzW3RoaXMubm9kZU5hbWUudG9Mb3dlckNhc2UoKV07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgc2V0IHJldHVybnMgdW5kZWZpbmVkLCBmYWxsIGJhY2sgdG8gbm9ybWFsIHNldHRpbmdcclxuICAgICAgICAgICAgICAgIGlmICghaG9va3MgfHwgIShcInNldFwiIGluIGhvb2tzKSB8fCBob29rcy5zZXQodGhpcywgdmFsLCBcInZhbHVlXCIpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkuZXh0ZW5kKHtcclxuICAgICAgICB2YWxIb29rczoge1xyXG4gICAgICAgICAgICBvcHRpb246IHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0galF1ZXJ5LmZpbmQuYXR0cihlbGVtLCBcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgIT0gbnVsbCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS50ZXh0KGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZWxlY3Q6IHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUsIG9wdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IGVsZW0ub3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBlbGVtLnNlbGVjdGVkSW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZSA9IGVsZW0udHlwZSA9PT0gXCJzZWxlY3Qtb25lXCIgfHwgaW5kZXggPCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBvbmUgPyBudWxsIDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gaW5kZXggPCAwID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4IDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25lID8gaW5kZXggOiAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSBvcHRpb25zW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2xkSUUgZG9lc24ndCB1cGRhdGUgc2VsZWN0ZWQgYWZ0ZXIgZm9ybSByZXNldCAoIzI1NTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgob3B0aW9uLnNlbGVjdGVkIHx8IGkgPT09IGluZGV4KSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgcmV0dXJuIG9wdGlvbnMgdGhhdCBhcmUgZGlzYWJsZWQgb3IgaW4gYSBkaXNhYmxlZCBvcHRncm91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN1cHBvcnQub3B0RGlzYWJsZWQgPyAhb3B0aW9uLmRpc2FibGVkIDogb3B0aW9uLmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpID09PSBudWxsKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCB8fCAhalF1ZXJ5Lm5vZGVOYW1lKG9wdGlvbi5wYXJlbnROb2RlLCBcIm9wdGdyb3VwXCIpKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgc3BlY2lmaWMgdmFsdWUgZm9yIHRoZSBvcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0galF1ZXJ5KG9wdGlvbikudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCBhbiBhcnJheSBmb3Igb25lIHNlbGVjdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGktU2VsZWN0cyByZXR1cm4gYW4gYXJyYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoZWxlbSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uU2V0LCBvcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9IGpRdWVyeS5tYWtlQXJyYXkodmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gb3B0aW9ucy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gb3B0aW9uc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqUXVlcnkuaW5BcnJheShqUXVlcnkudmFsSG9va3Mub3B0aW9uLmdldChvcHRpb24pLCB2YWx1ZXMpID49IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gbmV3IG9wdGlvbiBlbGVtZW50IGlzIGFkZGVkIHRvIHNlbGVjdCBib3ggd2UgbmVlZCB0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yY2UgcmVmbG93IG9mIG5ld2x5IGFkZGVkIG5vZGUgaW4gb3JkZXIgdG8gd29ya2Fyb3VuZCBkZWxheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2YgaW5pdGlhbGl6YXRpb24gcHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBvcHRpb25TZXQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKF8pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2lsbCBiZSBleGVjdXRlZCBvbmx5IGluIElFNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvcmNlIGJyb3dzZXJzIHRvIGJlaGF2ZSBjb25zaXN0ZW50bHkgd2hlbiBub24tbWF0Y2hpbmcgdmFsdWUgaXMgc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25TZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zZWxlY3RlZEluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJhZGlvcyBhbmQgY2hlY2tib3hlcyBnZXR0ZXIvc2V0dGVyXHJcbiAgICBqUXVlcnkuZWFjaChbXCJyYWRpb1wiLCBcImNoZWNrYm94XCJdLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgalF1ZXJ5LnZhbEhvb2tzW3RoaXNdID0ge1xyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChlbGVtLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpRdWVyeS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZWxlbS5jaGVja2VkID0galF1ZXJ5LmluQXJyYXkoalF1ZXJ5KGVsZW0pLnZhbCgpLCB2YWx1ZSkgPj0gMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghc3VwcG9ydC5jaGVja09uKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeS52YWxIb29rc1t0aGlzXS5nZXQgPSBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogV2Via2l0XHJcbiAgICAgICAgICAgICAgICAvLyBcIlwiIGlzIHJldHVybmVkIGluc3RlYWQgb2YgXCJvblwiIGlmIGEgdmFsdWUgaXNuJ3Qgc3BlY2lmaWVkXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSA9PT0gbnVsbCA/IFwib25cIiA6IGVsZW0udmFsdWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgdmFyIG5vZGVIb29rLCBib29sSG9vayxcclxuICAgICAgICBhdHRySGFuZGxlID0galF1ZXJ5LmV4cHIuYXR0ckhhbmRsZSxcclxuICAgICAgICBydXNlRGVmYXVsdCA9IC9eKD86Y2hlY2tlZHxzZWxlY3RlZCkkL2ksXHJcbiAgICAgICAgZ2V0U2V0QXR0cmlidXRlID0gc3VwcG9ydC5nZXRTZXRBdHRyaWJ1dGUsXHJcbiAgICAgICAgZ2V0U2V0SW5wdXQgPSBzdXBwb3J0LmlucHV0O1xyXG5cclxuICAgIGpRdWVyeS5mbi5leHRlbmQoe1xyXG4gICAgICAgIGF0dHI6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzKHRoaXMsIGpRdWVyeS5hdHRyLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbW92ZUF0dHI6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LnJlbW92ZUF0dHIodGhpcywgbmFtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGpRdWVyeS5leHRlbmQoe1xyXG4gICAgICAgIGF0dHI6IGZ1bmN0aW9uIChlbGVtLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaG9va3MsIHJldCxcclxuICAgICAgICAgICAgICAgIG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRvbid0IGdldC9zZXQgYXR0cmlidXRlcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcclxuICAgICAgICAgICAgaWYgKCFlbGVtIHx8IG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZhbGxiYWNrIHRvIHByb3Agd2hlbiBhdHRyaWJ1dGVzIGFyZSBub3Qgc3VwcG9ydGVkXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgPT09IHN0cnVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5wcm9wKGVsZW0sIG5hbWUsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWxsIGF0dHJpYnV0ZXMgYXJlIGxvd2VyY2FzZVxyXG4gICAgICAgICAgICAvLyBHcmFiIG5lY2Vzc2FyeSBob29rIGlmIG9uZSBpcyBkZWZpbmVkXHJcbiAgICAgICAgICAgIGlmIChuVHlwZSAhPT0gMSB8fCAhalF1ZXJ5LmlzWE1MRG9jKGVsZW0pKSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaG9va3MgPSBqUXVlcnkuYXR0ckhvb2tzW25hbWVdIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKGpRdWVyeS5leHByLm1hdGNoLmJvb2wudGVzdChuYW1lKSA/IGJvb2xIb29rIDogbm9kZUhvb2spO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5yZW1vdmVBdHRyKGVsZW0sIG5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaG9va3MgJiYgXCJzZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3Muc2V0KGVsZW0sIHZhbHVlLCBuYW1lKSkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSArIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KGVsZW0sIG5hbWUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBqUXVlcnkuZmluZC5hdHRyKGVsZW0sIG5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0ID09IG51bGwgP1xyXG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVtb3ZlQXR0cjogZnVuY3Rpb24gKGVsZW0sIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lLCBwcm9wTmFtZSxcclxuICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgYXR0ck5hbWVzID0gdmFsdWUgJiYgdmFsdWUubWF0Y2gocm5vdHdoaXRlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhdHRyTmFtZXMgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKChuYW1lID0gYXR0ck5hbWVzW2krK10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcE5hbWUgPSBqUXVlcnkucHJvcEZpeFtuYW1lXSB8fCBuYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBCb29sZWFuIGF0dHJpYnV0ZXMgZ2V0IHNwZWNpYWwgdHJlYXRtZW50ICgjMTA4NzApXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpRdWVyeS5leHByLm1hdGNoLmJvb2wudGVzdChuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXQgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSB0byBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0U2V0SW5wdXQgJiYgZ2V0U2V0QXR0cmlidXRlIHx8ICFydXNlRGVmYXVsdC50ZXN0KG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtW3Byb3BOYW1lXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxzbyBjbGVhciBkZWZhdWx0Q2hlY2tlZC9kZWZhdWx0U2VsZWN0ZWQgKGlmIGFwcHJvcHJpYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbVtqUXVlcnkuY2FtZWxDYXNlKFwiZGVmYXVsdC1cIiArIG5hbWUpXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbVtwcm9wTmFtZV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VlICM5Njk5IGZvciBleHBsYW5hdGlvbiBvZiB0aGlzIGFwcHJvYWNoIChzZXR0aW5nIGZpcnN0LCB0aGVuIHJlbW92YWwpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmF0dHIoZWxlbSwgbmFtZSwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZShnZXRTZXRBdHRyaWJ1dGUgPyBuYW1lIDogcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXR0ckhvb2tzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGVsZW0sIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdXBwb3J0LnJhZGlvVmFsdWUgJiYgdmFsdWUgPT09IFwicmFkaW9cIiAmJiBqUXVlcnkubm9kZU5hbWUoZWxlbSwgXCJpbnB1dFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXR0aW5nIHRoZSB0eXBlIG9uIGEgcmFkaW8gYnV0dG9uIGFmdGVyIHRoZSB2YWx1ZSByZXNldHMgdGhlIHZhbHVlIGluIElFNi05XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IHZhbHVlIHRvIGRlZmF1bHQgaW4gY2FzZSB0eXBlIGlzIHNldCBhZnRlciB2YWx1ZSBkdXJpbmcgY3JlYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGVsZW0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0udmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhvb2sgZm9yIGJvb2xlYW4gYXR0cmlidXRlc1xyXG4gICAgYm9vbEhvb2sgPSB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoZWxlbSwgdmFsdWUsIG5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGJvb2xlYW4gYXR0cmlidXRlcyB3aGVuIHNldCB0byBmYWxzZVxyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LnJlbW92ZUF0dHIoZWxlbSwgbmFtZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2V0U2V0SW5wdXQgJiYgZ2V0U2V0QXR0cmlidXRlIHx8ICFydXNlRGVmYXVsdC50ZXN0KG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJRTw4IG5lZWRzIHRoZSAqcHJvcGVydHkqIG5hbWVcclxuICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCFnZXRTZXRBdHRyaWJ1dGUgJiYgalF1ZXJ5LnByb3BGaXhbbmFtZV0gfHwgbmFtZSwgbmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXNlIGRlZmF1bHRDaGVja2VkIGFuZCBkZWZhdWx0U2VsZWN0ZWQgZm9yIG9sZElFXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtW2pRdWVyeS5jYW1lbENhc2UoXCJkZWZhdWx0LVwiICsgbmFtZSldID0gZWxlbVtuYW1lXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0cmlldmUgYm9vbGVhbnMgc3BlY2lhbGx5XHJcbiAgICBqUXVlcnkuZWFjaChqUXVlcnkuZXhwci5tYXRjaC5ib29sLnNvdXJjZS5tYXRjaCgvXFx3Ky9nKSwgZnVuY3Rpb24gKGksIG5hbWUpIHtcclxuXHJcbiAgICAgICAgdmFyIGdldHRlciA9IGF0dHJIYW5kbGVbbmFtZV0gfHwgalF1ZXJ5LmZpbmQuYXR0cjtcclxuXHJcbiAgICAgICAgYXR0ckhhbmRsZVtuYW1lXSA9IGdldFNldElucHV0ICYmIGdldFNldEF0dHJpYnV0ZSB8fCAhcnVzZURlZmF1bHQudGVzdChuYW1lKSA/XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlbGVtLCBuYW1lLCBpc1hNTCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJldCwgaGFuZGxlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1hNTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3AgYnkgdGVtcG9yYXJpbHkgcmVtb3ZpbmcgdGhpcyBmdW5jdGlvbiBmcm9tIHRoZSBnZXR0ZXJcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGUgPSBhdHRySGFuZGxlW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJIYW5kbGVbbmFtZV0gPSByZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gZ2V0dGVyKGVsZW0sIG5hbWUsIGlzWE1MKSAhPSBudWxsID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZS50b0xvd2VyQ2FzZSgpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBhdHRySGFuZGxlW25hbWVdID0gaGFuZGxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICAgICAgfSA6XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlbGVtLCBuYW1lLCBpc1hNTCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1hNTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtW2pRdWVyeS5jYW1lbENhc2UoXCJkZWZhdWx0LVwiICsgbmFtZSldID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZS50b0xvd2VyQ2FzZSgpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGZpeCBvbGRJRSBhdHRyb3BlcnRpZXNcclxuICAgIGlmICghZ2V0U2V0SW5wdXQgfHwgIWdldFNldEF0dHJpYnV0ZSkge1xyXG4gICAgICAgIGpRdWVyeS5hdHRySG9va3MudmFsdWUgPSB7XHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGVsZW0sIHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoalF1ZXJ5Lm5vZGVOYW1lKGVsZW0sIFwiaW5wdXRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBEb2VzIG5vdCByZXR1cm4gc28gdGhhdCBzZXRBdHRyaWJ1dGUgaXMgYWxzbyB1c2VkXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5kZWZhdWx0VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIG5vZGVIb29rIGlmIGRlZmluZWQgKCMxOTU0KTsgb3RoZXJ3aXNlIHNldEF0dHJpYnV0ZSBpcyBmaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVIb29rICYmIG5vZGVIb29rLnNldChlbGVtLCB2YWx1ZSwgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElFNi83IGRvIG5vdCBzdXBwb3J0IGdldHRpbmcvc2V0dGluZyBzb21lIGF0dHJpYnV0ZXMgd2l0aCBnZXQvc2V0QXR0cmlidXRlXHJcbiAgICBpZiAoIWdldFNldEF0dHJpYnV0ZSkge1xyXG5cclxuICAgICAgICAvLyBVc2UgdGhpcyBmb3IgYW55IGF0dHJpYnV0ZSBpbiBJRTYvN1xyXG4gICAgICAgIC8vIFRoaXMgZml4ZXMgYWxtb3N0IGV2ZXJ5IElFNi83IGlzc3VlXHJcbiAgICAgICAgbm9kZUhvb2sgPSB7XHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGVsZW0sIHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGV4aXN0aW5nIG9yIGNyZWF0ZSBhIG5ldyBhdHRyaWJ1dGUgbm9kZVxyXG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZShuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmICghcmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGVOb2RlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAocmV0ID0gZWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUF0dHJpYnV0ZShuYW1lKSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldC52YWx1ZSA9IHZhbHVlICs9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQnJlYWsgYXNzb2NpYXRpb24gd2l0aCBjbG9uZWQgZWxlbWVudHMgYnkgYWxzbyB1c2luZyBzZXRBdHRyaWJ1dGUgKCM5NjQ2KVxyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwidmFsdWVcIiB8fCB2YWx1ZSA9PT0gZWxlbS5nZXRBdHRyaWJ1dGUobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTb21lIGF0dHJpYnV0ZXMgYXJlIGNvbnN0cnVjdGVkIHdpdGggZW1wdHktc3RyaW5nIHZhbHVlcyB3aGVuIG5vdCBkZWZpbmVkXHJcbiAgICAgICAgYXR0ckhhbmRsZS5pZCA9IGF0dHJIYW5kbGUubmFtZSA9IGF0dHJIYW5kbGUuY29vcmRzID1cclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVsZW0sIG5hbWUsIGlzWE1MKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0O1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1hNTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAocmV0ID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpKSAmJiByZXQudmFsdWUgIT09IFwiXCIgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQudmFsdWUgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBGaXhpbmcgdmFsdWUgcmV0cmlldmFsIG9uIGEgYnV0dG9uIHJlcXVpcmVzIHRoaXMgbW9kdWxlXHJcbiAgICAgICAgalF1ZXJ5LnZhbEhvb2tzLmJ1dHRvbiA9IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoZWxlbSwgbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZShuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQgJiYgcmV0LnNwZWNpZmllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogbm9kZUhvb2suc2V0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGNvbnRlbnRlZGl0YWJsZSB0byBmYWxzZSBvbiByZW1vdmFscygjMTA0MjkpXHJcbiAgICAgICAgLy8gU2V0dGluZyB0byBlbXB0eSBzdHJpbmcgdGhyb3dzIGFuIGVycm9yIGFzIGFuIGludmFsaWQgdmFsdWVcclxuICAgICAgICBqUXVlcnkuYXR0ckhvb2tzLmNvbnRlbnRlZGl0YWJsZSA9IHtcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoZWxlbSwgdmFsdWUsIG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGVIb29rLnNldChlbGVtLCB2YWx1ZSA9PT0gXCJcIiA/IGZhbHNlIDogdmFsdWUsIG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHdpZHRoIGFuZCBoZWlnaHQgdG8gYXV0byBpbnN0ZWFkIG9mIDAgb24gZW1wdHkgc3RyaW5nKCBCdWcgIzgxNTAgKVxyXG4gICAgICAgIC8vIFRoaXMgaXMgZm9yIHJlbW92YWxzXHJcbiAgICAgICAgalF1ZXJ5LmVhY2goW1wid2lkdGhcIiwgXCJoZWlnaHRcIl0sIGZ1bmN0aW9uIChpLCBuYW1lKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeS5hdHRySG9va3NbbmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChlbGVtLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShuYW1lLCBcImF1dG9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzdXBwb3J0LnN0eWxlKSB7XHJcbiAgICAgICAgalF1ZXJ5LmF0dHJIb29rcy5zdHlsZSA9IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHVuZGVmaW5lZCBpbiB0aGUgY2FzZSBvZiBlbXB0eSBzdHJpbmdcclxuICAgICAgICAgICAgICAgIC8vIE5vdGU6IElFIHVwcGVyY2FzZXMgY3NzIHByb3BlcnR5IG5hbWVzLCBidXQgaWYgd2Ugd2VyZSB0byAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAgICAgLy8gLmNzc1RleHQsIHRoYXQgd291bGQgZGVzdHJveSBjYXNlIHNlbnN0aXRpdml0eSBpbiBVUkwncywgbGlrZSBpbiBcImJhY2tncm91bmRcIlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uc3R5bGUuY3NzVGV4dCB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGVsZW0sIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGVsZW0uc3R5bGUuY3NzVGV4dCA9IHZhbHVlICsgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIHZhciByZm9jdXNhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9ufG9iamVjdCkkL2ksXHJcbiAgICAgICAgcmNsaWNrYWJsZSA9IC9eKD86YXxhcmVhKSQvaTtcclxuXHJcbiAgICBqUXVlcnkuZm4uZXh0ZW5kKHtcclxuICAgICAgICBwcm9wOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzcyh0aGlzLCBqUXVlcnkucHJvcCwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW1vdmVQcm9wOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgICAgICBuYW1lID0galF1ZXJ5LnByb3BGaXhbbmFtZV0gfHwgbmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0cnkvY2F0Y2ggaGFuZGxlcyBjYXNlcyB3aGVyZSBJRSBiYWxrcyAoc3VjaCBhcyByZW1vdmluZyBhIHByb3BlcnR5IG9uIHdpbmRvdylcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpc1tuYW1lXTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGpRdWVyeS5leHRlbmQoe1xyXG4gICAgICAgIHByb3BGaXg6IHtcclxuICAgICAgICAgICAgXCJmb3JcIjogXCJodG1sRm9yXCIsXHJcbiAgICAgICAgICAgIFwiY2xhc3NcIjogXCJjbGFzc05hbWVcIlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHByb3A6IGZ1bmN0aW9uIChlbGVtLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgcmV0LCBob29rcywgbm90eG1sLFxyXG4gICAgICAgICAgICAgICAgblR5cGUgPSBlbGVtLm5vZGVUeXBlO1xyXG5cclxuICAgICAgICAgICAgLy8gZG9uJ3QgZ2V0L3NldCBwcm9wZXJ0aWVzIG9uIHRleHQsIGNvbW1lbnQgYW5kIGF0dHJpYnV0ZSBub2Rlc1xyXG4gICAgICAgICAgICBpZiAoIWVsZW0gfHwgblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbm90eG1sID0gblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyhlbGVtKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChub3R4bWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIEZpeCBuYW1lIGFuZCBhdHRhY2ggaG9va3NcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBqUXVlcnkucHJvcEZpeFtuYW1lXSB8fCBuYW1lO1xyXG4gICAgICAgICAgICAgICAgaG9va3MgPSBqUXVlcnkucHJvcEhvb2tzW25hbWVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvb2tzICYmIFwic2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLnNldChlbGVtLCB2YWx1ZSwgbmFtZSkpICE9PSB1bmRlZmluZWQgP1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCA6XHJcbiAgICAgICAgICAgICAgICAgICAgKGVsZW1bbmFtZV0gPSB2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldChlbGVtLCBuYW1lKSkgIT09IG51bGwgP1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCA6XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbVtuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHByb3BIb29rczoge1xyXG4gICAgICAgICAgICB0YWJJbmRleDoge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVsZW0udGFiSW5kZXggZG9lc24ndCBhbHdheXMgcmV0dXJuIHRoZSBjb3JyZWN0IHZhbHVlIHdoZW4gaXQgaGFzbid0IGJlZW4gZXhwbGljaXRseSBzZXRcclxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vZmx1aWRwcm9qZWN0Lm9yZy9ibG9nLzIwMDgvMDEvMDkvZ2V0dGluZy1zZXR0aW5nLWFuZC1yZW1vdmluZy10YWJpbmRleC12YWx1ZXMtd2l0aC1qYXZhc2NyaXB0L1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZSBwcm9wZXIgYXR0cmlidXRlIHJldHJpZXZhbCgjMTIwNzIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmluZGV4ID0galF1ZXJ5LmZpbmQuYXR0cihlbGVtLCBcInRhYmluZGV4XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFiaW5kZXggP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUludCh0YWJpbmRleCwgMTApIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmZvY3VzYWJsZS50ZXN0KGVsZW0ubm9kZU5hbWUpIHx8IHJjbGlja2FibGUudGVzdChlbGVtLm5vZGVOYW1lKSAmJiBlbGVtLmhyZWYgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTb21lIGF0dHJpYnV0ZXMgcmVxdWlyZSBhIHNwZWNpYWwgY2FsbCBvbiBJRVxyXG4gICAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTM2NDI5JTI4VlMuODUlMjkuYXNweFxyXG4gICAgaWYgKCFzdXBwb3J0LmhyZWZOb3JtYWxpemVkKSB7XHJcbiAgICAgICAgLy8gaHJlZi9zcmMgcHJvcGVydHkgc2hvdWxkIGdldCB0aGUgZnVsbCBub3JtYWxpemVkIFVSTCAoIzEwMjk5LyMxMjkxNSlcclxuICAgICAgICBqUXVlcnkuZWFjaChbXCJocmVmXCIsIFwic3JjXCJdLCBmdW5jdGlvbiAoaSwgbmFtZSkge1xyXG4gICAgICAgICAgICBqUXVlcnkucHJvcEhvb2tzW25hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShuYW1lLCA0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdXBwb3J0OiBTYWZhcmksIElFOStcclxuICAgIC8vIG1pcy1yZXBvcnRzIHRoZSBkZWZhdWx0IHNlbGVjdGVkIHByb3BlcnR5IG9mIGFuIG9wdGlvblxyXG4gICAgLy8gQWNjZXNzaW5nIHRoZSBwYXJlbnQncyBzZWxlY3RlZEluZGV4IHByb3BlcnR5IGZpeGVzIGl0XHJcbiAgICBpZiAoIXN1cHBvcnQub3B0U2VsZWN0ZWQpIHtcclxuICAgICAgICBqUXVlcnkucHJvcEhvb2tzLnNlbGVjdGVkID0ge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgaXQgYWxzbyB3b3JrcyB3aXRoIG9wdGdyb3Vwcywgc2VlICM1NzAxXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeS5lYWNoKFtcclxuICAgICAgICBcInRhYkluZGV4XCIsXHJcbiAgICAgICAgXCJyZWFkT25seVwiLFxyXG4gICAgICAgIFwibWF4TGVuZ3RoXCIsXHJcbiAgICAgICAgXCJjZWxsU3BhY2luZ1wiLFxyXG4gICAgICAgIFwiY2VsbFBhZGRpbmdcIixcclxuICAgICAgICBcInJvd1NwYW5cIixcclxuICAgICAgICBcImNvbFNwYW5cIixcclxuICAgICAgICBcInVzZU1hcFwiLFxyXG4gICAgICAgIFwiZnJhbWVCb3JkZXJcIixcclxuICAgICAgICBcImNvbnRlbnRFZGl0YWJsZVwiXHJcbiAgICBdLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgalF1ZXJ5LnByb3BGaXhbdGhpcy50b0xvd2VyQ2FzZSgpXSA9IHRoaXM7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBJRTYvNyBjYWxsIGVuY3R5cGUgZW5jb2RpbmdcclxuICAgIGlmICghc3VwcG9ydC5lbmN0eXBlKSB7XHJcbiAgICAgICAgalF1ZXJ5LnByb3BGaXguZW5jdHlwZSA9IFwiZW5jb2RpbmdcIjtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICB2YXIgcmNsYXNzID0gL1tcXHRcXHJcXG5cXGZdL2c7XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjbGF6eiwgaiwgZmluYWxWYWx1ZSxcclxuICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBwcm9jZWVkID0gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGpRdWVyeS5pc0Z1bmN0aW9uKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5hZGRDbGFzcyh2YWx1ZS5jYWxsKHRoaXMsIGosIHRoaXMuY2xhc3NOYW1lKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHByb2NlZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBkaXNqdW5jdGlvbiBoZXJlIGlzIGZvciBiZXR0ZXIgY29tcHJlc3NpYmlsaXR5IChzZWUgcmVtb3ZlQ2xhc3MpXHJcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gKHZhbHVlIHx8IFwiXCIpLm1hdGNoKHJub3R3aGl0ZSkgfHwgW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSB0aGlzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKGVsZW0uY2xhc3NOYW1lID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiIFwiICsgZWxlbS5jbGFzc05hbWUgKyBcIiBcIikucmVwbGFjZShyY2xhc3MsIFwiIFwiKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChjbGF6eiA9IGNsYXNzZXNbaisrXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXIuaW5kZXhPZihcIiBcIiArIGNsYXp6ICsgXCIgXCIpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ciArPSBjbGF6eiArIFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0galF1ZXJ5LnRyaW0oY3VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0uY2xhc3NOYW1lICE9PSBmaW5hbFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGZpbmFsVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY2xhenosIGosIGZpbmFsVmFsdWUsXHJcbiAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgcHJvY2VlZCA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGpRdWVyeS5pc0Z1bmN0aW9uKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5yZW1vdmVDbGFzcyh2YWx1ZS5jYWxsKHRoaXMsIGosIHRoaXMuY2xhc3NOYW1lKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvY2VlZCkge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9ICh2YWx1ZSB8fCBcIlwiKS5tYXRjaChybm90d2hpdGUpIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtID0gdGhpc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGV4cHJlc3Npb24gaXMgaGVyZSBmb3IgYmV0dGVyIGNvbXByZXNzaWJpbGl0eSAoc2VlIGFkZENsYXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKGVsZW0uY2xhc3NOYW1lID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgKFwiIFwiICsgZWxlbS5jbGFzc05hbWUgKyBcIiBcIikucmVwbGFjZShyY2xhc3MsIFwiIFwiKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXCJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKGNsYXp6ID0gY2xhc3Nlc1tqKytdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlICphbGwqIGluc3RhbmNlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGN1ci5pbmRleE9mKFwiIFwiICsgY2xhenogKyBcIiBcIikgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ciA9IGN1ci5yZXBsYWNlKFwiIFwiICsgY2xhenogKyBcIiBcIiwgXCIgXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0gdmFsdWUgPyBqUXVlcnkudHJpbShjdXIpIDogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW0uY2xhc3NOYW1lICE9PSBmaW5hbFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGZpbmFsVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRvZ2dsZUNsYXNzOiBmdW5jdGlvbiAodmFsdWUsIHN0YXRlVmFsKSB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZVZhbCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlVmFsID8gdGhpcy5hZGRDbGFzcyh2YWx1ZSkgOiB0aGlzLnJlbW92ZUNsYXNzKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGpRdWVyeS5pc0Z1bmN0aW9uKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSh0aGlzKS50b2dnbGVDbGFzcyh2YWx1ZS5jYWxsKHRoaXMsIGksIHRoaXMuY2xhc3NOYW1lLCBzdGF0ZVZhbCksIHN0YXRlVmFsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdG9nZ2xlIGluZGl2aWR1YWwgY2xhc3MgbmFtZXNcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZiA9IGpRdWVyeSh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcyA9IHZhbHVlLm1hdGNoKHJub3R3aGl0ZSkgfHwgW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoY2xhc3NOYW1lID0gY2xhc3NOYW1lc1tpKytdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBlYWNoIGNsYXNzTmFtZSBnaXZlbiwgc3BhY2Ugc2VwYXJhdGVkIGxpc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuaGFzQ2xhc3MoY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUb2dnbGUgd2hvbGUgY2xhc3MgbmFtZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBzdHJ1bmRlZmluZWQgfHwgdHlwZSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RvcmUgY2xhc3NOYW1lIGlmIHNldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuX2RhdGEodGhpcywgXCJfX2NsYXNzTmFtZV9fXCIsIHRoaXMuY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBlbGVtZW50IGhhcyBhIGNsYXNzIG5hbWUgb3IgaWYgd2UncmUgcGFzc2VkIFwiZmFsc2VcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGVuIHJlbW92ZSB0aGUgd2hvbGUgY2xhc3NuYW1lIChpZiB0aGVyZSB3YXMgb25lLCB0aGUgYWJvdmUgc2F2ZWQgaXQpLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBicmluZyBiYWNrIHdoYXRldmVyIHdhcyBwcmV2aW91c2x5IHNhdmVkIChpZiBhbnl0aGluZyksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZmFsbGluZyBiYWNrIHRvIHRoZSBlbXB0eSBzdHJpbmcgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NOYW1lID0gdGhpcy5jbGFzc05hbWUgfHwgdmFsdWUgPT09IGZhbHNlID8gXCJcIiA6IGpRdWVyeS5fZGF0YSh0aGlzLCBcIl9fY2xhc3NOYW1lX19cIikgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFzQ2xhc3M6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gXCIgXCIgKyBzZWxlY3RvciArIFwiIFwiLFxyXG4gICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBsID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpc1tpXS5ub2RlVHlwZSA9PT0gMSAmJiAoXCIgXCIgKyB0aGlzW2ldLmNsYXNzTmFtZSArIFwiIFwiKS5yZXBsYWNlKHJjbGFzcywgXCIgXCIpLmluZGV4T2YoY2xhc3NOYW1lKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyBSZXR1cm4galF1ZXJ5IGZvciBhdHRyaWJ1dGVzLW9ubHkgaW5jbHVzaW9uXHJcblxyXG5cclxuICAgIGpRdWVyeS5lYWNoKChcImJsdXIgZm9jdXMgZm9jdXNpbiBmb2N1c291dCBsb2FkIHJlc2l6ZSBzY3JvbGwgdW5sb2FkIGNsaWNrIGRibGNsaWNrIFwiICtcclxuICAgICAgICBcIm1vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlIFwiICtcclxuICAgICAgICBcImNoYW5nZSBzZWxlY3Qgc3VibWl0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgZXJyb3IgY29udGV4dG1lbnVcIikuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbiAoaSwgbmFtZSkge1xyXG5cclxuICAgICAgICAvLyBIYW5kbGUgZXZlbnQgYmluZGluZ1xyXG4gICAgICAgIGpRdWVyeS5mbltuYW1lXSA9IGZ1bmN0aW9uIChkYXRhLCBmbikge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDAgP1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbihuYW1lLCBudWxsLCBkYXRhLCBmbikgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKG5hbWUpO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkuZm4uZXh0ZW5kKHtcclxuICAgICAgICBob3ZlcjogZnVuY3Rpb24gKGZuT3ZlciwgZm5PdXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW91c2VlbnRlcihmbk92ZXIpLm1vdXNlbGVhdmUoZm5PdXQgfHwgZm5PdmVyKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaW5kOiBmdW5jdGlvbiAodHlwZXMsIGRhdGEsIGZuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9uKHR5cGVzLCBudWxsLCBkYXRhLCBmbik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1bmJpbmQ6IGZ1bmN0aW9uICh0eXBlcywgZm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2ZmKHR5cGVzLCBudWxsLCBmbik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIChzZWxlY3RvciwgdHlwZXMsIGRhdGEsIGZuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9uKHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdW5kZWxlZ2F0ZTogZnVuY3Rpb24gKHNlbGVjdG9yLCB0eXBlcywgZm4pIHtcclxuICAgICAgICAgICAgLy8gKCBuYW1lc3BhY2UgKSBvciAoIHNlbGVjdG9yLCB0eXBlcyBbLCBmbl0gKVxyXG4gICAgICAgICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHRoaXMub2ZmKHNlbGVjdG9yLCBcIioqXCIpIDogdGhpcy5vZmYodHlwZXMsIHNlbGVjdG9yIHx8IFwiKipcIiwgZm4pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgbm9uY2UgPSBqUXVlcnkubm93KCk7XHJcblxyXG4gICAgdmFyIHJxdWVyeSA9ICgvXFw/Lyk7XHJcblxyXG5cclxuXHJcbiAgICB2YXIgcnZhbGlkdG9rZW5zID0gLygsKXwoXFxbfHspfCh9fF0pfFwiKD86W15cIlxcXFxcXHJcXG5dfFxcXFxbXCJcXFxcXFwvYmZucnRdfFxcXFx1W1xcZGEtZkEtRl17NH0pKlwiXFxzKjo/fHRydWV8ZmFsc2V8bnVsbHwtPyg/ITBcXGQpXFxkKyg/OlxcLlxcZCt8KSg/OltlRV1bKy1dP1xcZCt8KS9nO1xyXG5cclxuICAgIGpRdWVyeS5wYXJzZUpTT04gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vIEF0dGVtcHQgdG8gcGFyc2UgdXNpbmcgdGhlIG5hdGl2ZSBKU09OIHBhcnNlciBmaXJzdFxyXG4gICAgICAgIGlmICh3aW5kb3cuSlNPTiAmJiB3aW5kb3cuSlNPTi5wYXJzZSkge1xyXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBBbmRyb2lkIDIuM1xyXG4gICAgICAgICAgICAvLyBXb3JrYXJvdW5kIGZhaWx1cmUgdG8gc3RyaW5nLWNhc3QgbnVsbCBpbnB1dFxyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LkpTT04ucGFyc2UoZGF0YSArIFwiXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJlcXVpcmVOb25Db21tYSxcclxuICAgICAgICAgICAgZGVwdGggPSBudWxsLFxyXG4gICAgICAgICAgICBzdHIgPSBqUXVlcnkudHJpbShkYXRhICsgXCJcIik7XHJcblxyXG4gICAgICAgIC8vIEd1YXJkIGFnYWluc3QgaW52YWxpZCAoYW5kIHBvc3NpYmx5IGRhbmdlcm91cykgaW5wdXQgYnkgZW5zdXJpbmcgdGhhdCBub3RoaW5nIHJlbWFpbnNcclxuICAgICAgICAvLyBhZnRlciByZW1vdmluZyB2YWxpZCB0b2tlbnNcclxuICAgICAgICByZXR1cm4gc3RyICYmICFqUXVlcnkudHJpbShzdHIucmVwbGFjZShydmFsaWR0b2tlbnMsIGZ1bmN0aW9uICh0b2tlbiwgY29tbWEsIG9wZW4sIGNsb3NlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRm9yY2UgdGVybWluYXRpb24gaWYgd2Ugc2VlIGEgbWlzcGxhY2VkIGNvbW1hXHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZU5vbkNvbW1hICYmIGNvbW1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVwdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFBlcmZvcm0gbm8gbW9yZSByZXBsYWNlbWVudHMgYWZ0ZXIgcmV0dXJuaW5nIHRvIG91dGVybW9zdCBkZXB0aFxyXG4gICAgICAgICAgICAgICAgaWYgKGRlcHRoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbW1hcyBtdXN0IG5vdCBmb2xsb3cgXCJbXCIsIFwie1wiLCBvciBcIixcIlxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZU5vbkNvbW1hID0gb3BlbiB8fCBjb21tYTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZXRlcm1pbmUgbmV3IGRlcHRoXHJcbiAgICAgICAgICAgICAgICAvLyBhcnJheS9vYmplY3Qgb3BlbiAoXCJbXCIgb3IgXCJ7XCIpOiBkZXB0aCArPSB0cnVlIC0gZmFsc2UgKGluY3JlbWVudClcclxuICAgICAgICAgICAgICAgIC8vIGFycmF5L29iamVjdCBjbG9zZSAoXCJdXCIgb3IgXCJ9XCIpOiBkZXB0aCArPSBmYWxzZSAtIHRydWUgKGRlY3JlbWVudClcclxuICAgICAgICAgICAgICAgIC8vIG90aGVyIGNhc2VzIChcIixcIiBvciBwcmltaXRpdmUpOiBkZXB0aCArPSB0cnVlIC0gdHJ1ZSAobnVtZXJpYyBjYXN0KVxyXG4gICAgICAgICAgICAgICAgZGVwdGggKz0gIWNsb3NlIC0gIW9wZW47XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoaXMgdG9rZW5cclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9KSkgP1xyXG4gICAgICAgICAgICAoRnVuY3Rpb24oXCJyZXR1cm4gXCIgKyBzdHIpKSgpIDpcclxuICAgICAgICAgICAgalF1ZXJ5LmVycm9yKFwiSW52YWxpZCBKU09OOiBcIiArIGRhdGEpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy8gQ3Jvc3MtYnJvd3NlciB4bWwgcGFyc2luZ1xyXG4gICAgalF1ZXJ5LnBhcnNlWE1MID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgeG1sLCB0bXA7XHJcbiAgICAgICAgaWYgKCFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LkRPTVBhcnNlcikgeyAvLyBTdGFuZGFyZFxyXG4gICAgICAgICAgICAgICAgdG1wID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgICAgICAgICAgICAgeG1sID0gdG1wLnBhcnNlRnJvbVN0cmluZyhkYXRhLCBcInRleHQveG1sXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBJRVxyXG4gICAgICAgICAgICAgICAgeG1sID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MRE9NXCIpO1xyXG4gICAgICAgICAgICAgICAgeG1sLmFzeW5jID0gXCJmYWxzZVwiO1xyXG4gICAgICAgICAgICAgICAgeG1sLmxvYWRYTUwoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHhtbCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF4bWwgfHwgIXhtbC5kb2N1bWVudEVsZW1lbnQgfHwgeG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicGFyc2VyZXJyb3JcIikubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeS5lcnJvcihcIkludmFsaWQgWE1MOiBcIiArIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geG1sO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdmFyXHJcbiAgICAgICAgLy8gRG9jdW1lbnQgbG9jYXRpb25cclxuICAgICAgICBhamF4TG9jUGFydHMsXHJcbiAgICAgICAgYWpheExvY2F0aW9uLFxyXG5cclxuICAgICAgICByaGFzaCA9IC8jLiokLyxcclxuICAgICAgICBydHMgPSAvKFs/Jl0pXz1bXiZdKi8sXHJcbiAgICAgICAgcmhlYWRlcnMgPSAvXiguKj8pOlsgXFx0XSooW15cXHJcXG5dKilcXHI/JC9tZywgLy8gSUUgbGVhdmVzIGFuIFxcciBjaGFyYWN0ZXIgYXQgRU9MXHJcbiAgICAgICAgLy8gIzc2NTMsICM4MTI1LCAjODE1MjogbG9jYWwgcHJvdG9jb2wgZGV0ZWN0aW9uXHJcbiAgICAgICAgcmxvY2FsUHJvdG9jb2wgPSAvXig/OmFib3V0fGFwcHxhcHAtc3RvcmFnZXwuKy1leHRlbnNpb258ZmlsZXxyZXN8d2lkZ2V0KTokLyxcclxuICAgICAgICBybm9Db250ZW50ID0gL14oPzpHRVR8SEVBRCkkLyxcclxuICAgICAgICBycHJvdG9jb2wgPSAvXlxcL1xcLy8sXHJcbiAgICAgICAgcnVybCA9IC9eKFtcXHcuKy1dKzopKD86XFwvXFwvKD86W15cXC8/I10qQHwpKFteXFwvPyM6XSopKD86OihcXGQrKXwpfCkvLFxyXG5cclxuICAgICAgICAvKiBQcmVmaWx0ZXJzXHJcbiAgICAgICAgICogMSkgVGhleSBhcmUgdXNlZnVsIHRvIGludHJvZHVjZSBjdXN0b20gZGF0YVR5cGVzIChzZWUgYWpheC9qc29ucC5qcyBmb3IgYW4gZXhhbXBsZSlcclxuICAgICAgICAgKiAyKSBUaGVzZSBhcmUgY2FsbGVkOlxyXG4gICAgICAgICAqICAgIC0gQkVGT1JFIGFza2luZyBmb3IgYSB0cmFuc3BvcnRcclxuICAgICAgICAgKiAgICAtIEFGVEVSIHBhcmFtIHNlcmlhbGl6YXRpb24gKHMuZGF0YSBpcyBhIHN0cmluZyBpZiBzLnByb2Nlc3NEYXRhIGlzIHRydWUpXHJcbiAgICAgICAgICogMykga2V5IGlzIHRoZSBkYXRhVHlwZVxyXG4gICAgICAgICAqIDQpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcclxuICAgICAgICAgKiA1KSBleGVjdXRpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBjb250aW51ZSBkb3duIHRvIFwiKlwiIGlmIG5lZWRlZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByZWZpbHRlcnMgPSB7fSxcclxuXHJcbiAgICAgICAgLyogVHJhbnNwb3J0cyBiaW5kaW5nc1xyXG4gICAgICAgICAqIDEpIGtleSBpcyB0aGUgZGF0YVR5cGVcclxuICAgICAgICAgKiAyKSB0aGUgY2F0Y2hhbGwgc3ltYm9sIFwiKlwiIGNhbiBiZSB1c2VkXHJcbiAgICAgICAgICogMykgc2VsZWN0aW9uIHdpbGwgc3RhcnQgd2l0aCB0cmFuc3BvcnQgZGF0YVR5cGUgYW5kIFRIRU4gZ28gdG8gXCIqXCIgaWYgbmVlZGVkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdHJhbnNwb3J0cyA9IHt9LFxyXG5cclxuICAgICAgICAvLyBBdm9pZCBjb21tZW50LXByb2xvZyBjaGFyIHNlcXVlbmNlICgjMTAwOTgpOyBtdXN0IGFwcGVhc2UgbGludCBhbmQgZXZhZGUgY29tcHJlc3Npb25cclxuICAgICAgICBhbGxUeXBlcyA9IFwiKi9cIi5jb25jYXQoXCIqXCIpO1xyXG5cclxuICAgIC8vICM4MTM4LCBJRSBtYXkgdGhyb3cgYW4gZXhjZXB0aW9uIHdoZW4gYWNjZXNzaW5nXHJcbiAgICAvLyBhIGZpZWxkIGZyb20gd2luZG93LmxvY2F0aW9uIGlmIGRvY3VtZW50LmRvbWFpbiBoYXMgYmVlbiBzZXRcclxuICAgIHRyeSB7XHJcbiAgICAgICAgYWpheExvY2F0aW9uID0gbG9jYXRpb24uaHJlZjtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyBVc2UgdGhlIGhyZWYgYXR0cmlidXRlIG9mIGFuIEEgZWxlbWVudFxyXG4gICAgICAgIC8vIHNpbmNlIElFIHdpbGwgbW9kaWZ5IGl0IGdpdmVuIGRvY3VtZW50LmxvY2F0aW9uXHJcbiAgICAgICAgYWpheExvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgICAgYWpheExvY2F0aW9uLmhyZWYgPSBcIlwiO1xyXG4gICAgICAgIGFqYXhMb2NhdGlvbiA9IGFqYXhMb2NhdGlvbi5ocmVmO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlZ21lbnQgbG9jYXRpb24gaW50byBwYXJ0c1xyXG4gICAgYWpheExvY1BhcnRzID0gcnVybC5leGVjKGFqYXhMb2NhdGlvbi50b0xvd2VyQ2FzZSgpKSB8fCBbXTtcclxuXHJcbiAgICAvLyBCYXNlIFwiY29uc3RydWN0b3JcIiBmb3IgalF1ZXJ5LmFqYXhQcmVmaWx0ZXIgYW5kIGpRdWVyeS5hamF4VHJhbnNwb3J0XHJcbiAgICBmdW5jdGlvbiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoc3RydWN0dXJlKSB7XHJcblxyXG4gICAgICAgIC8vIGRhdGFUeXBlRXhwcmVzc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gXCIqXCJcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGFUeXBlRXhwcmVzc2lvbiwgZnVuYykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhVHlwZUV4cHJlc3Npb24gIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGZ1bmMgPSBkYXRhVHlwZUV4cHJlc3Npb247XHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZUV4cHJlc3Npb24gPSBcIipcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGFUeXBlLFxyXG4gICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZXMgPSBkYXRhVHlwZUV4cHJlc3Npb24udG9Mb3dlckNhc2UoKS5tYXRjaChybm90d2hpdGUpIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGpRdWVyeS5pc0Z1bmN0aW9uKGZ1bmMpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgZWFjaCBkYXRhVHlwZSBpbiB0aGUgZGF0YVR5cGVFeHByZXNzaW9uXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoKGRhdGFUeXBlID0gZGF0YVR5cGVzW2krK10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJlcGVuZCBpZiByZXF1ZXN0ZWRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVR5cGUuY2hhckF0KDApID09PSBcIitcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZSA9IGRhdGFUeXBlLnNsaWNlKDEpIHx8IFwiKlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoc3RydWN0dXJlW2RhdGFUeXBlXSA9IHN0cnVjdHVyZVtkYXRhVHlwZV0gfHwgW10pLnVuc2hpZnQoZnVuYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgYXBwZW5kXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHN0cnVjdHVyZVtkYXRhVHlwZV0gPSBzdHJ1Y3R1cmVbZGF0YVR5cGVdIHx8IFtdKS5wdXNoKGZ1bmMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmFzZSBpbnNwZWN0aW9uIGZ1bmN0aW9uIGZvciBwcmVmaWx0ZXJzIGFuZCB0cmFuc3BvcnRzXHJcbiAgICBmdW5jdGlvbiBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyhzdHJ1Y3R1cmUsIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIpIHtcclxuXHJcbiAgICAgICAgdmFyIGluc3BlY3RlZCA9IHt9LFxyXG4gICAgICAgICAgICBzZWVraW5nVHJhbnNwb3J0ID0gKHN0cnVjdHVyZSA9PT0gdHJhbnNwb3J0cyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluc3BlY3QoZGF0YVR5cGUpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkO1xyXG4gICAgICAgICAgICBpbnNwZWN0ZWRbZGF0YVR5cGVdID0gdHJ1ZTtcclxuICAgICAgICAgICAgalF1ZXJ5LmVhY2goc3RydWN0dXJlW2RhdGFUeXBlXSB8fCBbXSwgZnVuY3Rpb24gKF8sIHByZWZpbHRlck9yRmFjdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGFUeXBlT3JUcmFuc3BvcnQgPSBwcmVmaWx0ZXJPckZhY3Rvcnkob3B0aW9ucywgb3JpZ2luYWxPcHRpb25zLCBqcVhIUik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFUeXBlT3JUcmFuc3BvcnQgPT09IFwic3RyaW5nXCIgJiYgIXNlZWtpbmdUcmFuc3BvcnQgJiYgIWluc3BlY3RlZFtkYXRhVHlwZU9yVHJhbnNwb3J0XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YVR5cGVzLnVuc2hpZnQoZGF0YVR5cGVPclRyYW5zcG9ydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zcGVjdChkYXRhVHlwZU9yVHJhbnNwb3J0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlZWtpbmdUcmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShzZWxlY3RlZCA9IGRhdGFUeXBlT3JUcmFuc3BvcnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGluc3BlY3Qob3B0aW9ucy5kYXRhVHlwZXNbMF0pIHx8ICFpbnNwZWN0ZWRbXCIqXCJdICYmIGluc3BlY3QoXCIqXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEEgc3BlY2lhbCBleHRlbmQgZm9yIGFqYXggb3B0aW9uc1xyXG4gICAgLy8gdGhhdCB0YWtlcyBcImZsYXRcIiBvcHRpb25zIChub3QgdG8gYmUgZGVlcCBleHRlbmRlZClcclxuICAgIC8vIEZpeGVzICM5ODg3XHJcbiAgICBmdW5jdGlvbiBhamF4RXh0ZW5kKHRhcmdldCwgc3JjKSB7XHJcbiAgICAgICAgdmFyIGRlZXAsIGtleSxcclxuICAgICAgICAgICAgZmxhdE9wdGlvbnMgPSBqUXVlcnkuYWpheFNldHRpbmdzLmZsYXRPcHRpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICBmb3IgKGtleSBpbiBzcmMpIHtcclxuICAgICAgICAgICAgaWYgKHNyY1trZXldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIChmbGF0T3B0aW9uc1trZXldID8gdGFyZ2V0IDogKGRlZXAgfHwgKGRlZXAgPSB7fSkpKVtrZXldID0gc3JjW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRlZXApIHtcclxuICAgICAgICAgICAgalF1ZXJ5LmV4dGVuZCh0cnVlLCB0YXJnZXQsIGRlZXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH1cclxuXHJcbiAgICAvKiBIYW5kbGVzIHJlc3BvbnNlcyB0byBhbiBhamF4IHJlcXVlc3Q6XHJcbiAgICAgKiAtIGZpbmRzIHRoZSByaWdodCBkYXRhVHlwZSAobWVkaWF0ZXMgYmV0d2VlbiBjb250ZW50LXR5cGUgYW5kIGV4cGVjdGVkIGRhdGFUeXBlKVxyXG4gICAgICogLSByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIHJlc3BvbnNlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFqYXhIYW5kbGVSZXNwb25zZXMocywganFYSFIsIHJlc3BvbnNlcykge1xyXG4gICAgICAgIHZhciBmaXJzdERhdGFUeXBlLCBjdCwgZmluYWxEYXRhVHlwZSwgdHlwZSxcclxuICAgICAgICAgICAgY29udGVudHMgPSBzLmNvbnRlbnRzLFxyXG4gICAgICAgICAgICBkYXRhVHlwZXMgPSBzLmRhdGFUeXBlcztcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGF1dG8gZGF0YVR5cGUgYW5kIGdldCBjb250ZW50LXR5cGUgaW4gdGhlIHByb2Nlc3NcclxuICAgICAgICB3aGlsZSAoZGF0YVR5cGVzWzBdID09PSBcIipcIikge1xyXG4gICAgICAgICAgICBkYXRhVHlwZXMuc2hpZnQoKTtcclxuICAgICAgICAgICAgaWYgKGN0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGN0ID0gcy5taW1lVHlwZSB8fCBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UncmUgZGVhbGluZyB3aXRoIGEga25vd24gY29udGVudC10eXBlXHJcbiAgICAgICAgaWYgKGN0KSB7XHJcbiAgICAgICAgICAgIGZvciAodHlwZSBpbiBjb250ZW50cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRzW3R5cGVdICYmIGNvbnRlbnRzW3R5cGVdLnRlc3QoY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGVzLnVuc2hpZnQodHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIGEgcmVzcG9uc2UgZm9yIHRoZSBleHBlY3RlZCBkYXRhVHlwZVxyXG4gICAgICAgIGlmIChkYXRhVHlwZXNbMF0gaW4gcmVzcG9uc2VzKSB7XHJcbiAgICAgICAgICAgIGZpbmFsRGF0YVR5cGUgPSBkYXRhVHlwZXNbMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVHJ5IGNvbnZlcnRpYmxlIGRhdGFUeXBlc1xyXG4gICAgICAgICAgICBmb3IgKHR5cGUgaW4gcmVzcG9uc2VzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGFUeXBlc1swXSB8fCBzLmNvbnZlcnRlcnNbdHlwZSArIFwiIFwiICsgZGF0YVR5cGVzWzBdXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbmFsRGF0YVR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdERhdGFUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3REYXRhVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gT3IganVzdCB1c2UgZmlyc3Qgb25lXHJcbiAgICAgICAgICAgIGZpbmFsRGF0YVR5cGUgPSBmaW5hbERhdGFUeXBlIHx8IGZpcnN0RGF0YVR5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiB3ZSBmb3VuZCBhIGRhdGFUeXBlXHJcbiAgICAgICAgLy8gV2UgYWRkIHRoZSBkYXRhVHlwZSB0byB0aGUgbGlzdCBpZiBuZWVkZWRcclxuICAgICAgICAvLyBhbmQgcmV0dXJuIHRoZSBjb3JyZXNwb25kaW5nIHJlc3BvbnNlXHJcbiAgICAgICAgaWYgKGZpbmFsRGF0YVR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKGZpbmFsRGF0YVR5cGUgIT09IGRhdGFUeXBlc1swXSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGVzLnVuc2hpZnQoZmluYWxEYXRhVHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlc1tmaW5hbERhdGFUeXBlXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogQ2hhaW4gY29udmVyc2lvbnMgZ2l2ZW4gdGhlIHJlcXVlc3QgYW5kIHRoZSBvcmlnaW5hbCByZXNwb25zZVxyXG4gICAgICogQWxzbyBzZXRzIHRoZSByZXNwb25zZVhYWCBmaWVsZHMgb24gdGhlIGpxWEhSIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFqYXhDb252ZXJ0KHMsIHJlc3BvbnNlLCBqcVhIUiwgaXNTdWNjZXNzKSB7XHJcbiAgICAgICAgdmFyIGNvbnYyLCBjdXJyZW50LCBjb252LCB0bXAsIHByZXYsXHJcbiAgICAgICAgICAgIGNvbnZlcnRlcnMgPSB7fSxcclxuICAgICAgICAgICAgLy8gV29yayB3aXRoIGEgY29weSBvZiBkYXRhVHlwZXMgaW4gY2FzZSB3ZSBuZWVkIHRvIG1vZGlmeSBpdCBmb3IgY29udmVyc2lvblxyXG4gICAgICAgICAgICBkYXRhVHlwZXMgPSBzLmRhdGFUeXBlcy5zbGljZSgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgY29udmVydGVycyBtYXAgd2l0aCBsb3dlcmNhc2VkIGtleXNcclxuICAgICAgICBpZiAoZGF0YVR5cGVzWzFdKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29udiBpbiBzLmNvbnZlcnRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnZlcnRlcnNbY29udi50b0xvd2VyQ2FzZSgpXSA9IHMuY29udmVydGVyc1tjb252XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHRvIGVhY2ggc2VxdWVudGlhbCBkYXRhVHlwZVxyXG4gICAgICAgIHdoaWxlIChjdXJyZW50KSB7XHJcblxyXG4gICAgICAgICAgICBpZiAocy5yZXNwb25zZUZpZWxkc1tjdXJyZW50XSkge1xyXG4gICAgICAgICAgICAgICAganFYSFJbcy5yZXNwb25zZUZpZWxkc1tjdXJyZW50XV0gPSByZXNwb25zZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQXBwbHkgdGhlIGRhdGFGaWx0ZXIgaWYgcHJvdmlkZWRcclxuICAgICAgICAgICAgaWYgKCFwcmV2ICYmIGlzU3VjY2VzcyAmJiBzLmRhdGFGaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gcy5kYXRhRmlsdGVyKHJlc3BvbnNlLCBzLmRhdGFUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJldiA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBkYXRhVHlwZXMuc2hpZnQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVGhlcmUncyBvbmx5IHdvcmsgdG8gZG8gaWYgY3VycmVudCBkYXRhVHlwZSBpcyBub24tYXV0b1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09IFwiKlwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBwcmV2O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IHJlc3BvbnNlIGlmIHByZXYgZGF0YVR5cGUgaXMgbm9uLWF1dG8gYW5kIGRpZmZlcnMgZnJvbSBjdXJyZW50XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByZXYgIT09IFwiKlwiICYmIHByZXYgIT09IGN1cnJlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2VlayBhIGRpcmVjdCBjb252ZXJ0ZXJcclxuICAgICAgICAgICAgICAgICAgICBjb252ID0gY29udmVydGVyc1twcmV2ICsgXCIgXCIgKyBjdXJyZW50XSB8fCBjb252ZXJ0ZXJzW1wiKiBcIiArIGN1cnJlbnRdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBub25lIGZvdW5kLCBzZWVrIGEgcGFpclxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnYyIGluIGNvbnZlcnRlcnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBjb252MiBvdXRwdXRzIGN1cnJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IGNvbnYyLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0bXBbMV0gPT09IGN1cnJlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgcHJldiBjYW4gYmUgY29udmVydGVkIHRvIGFjY2VwdGVkIGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udiA9IGNvbnZlcnRlcnNbcHJldiArIFwiIFwiICsgdG1wWzBdXSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0ZXJzW1wiKiBcIiArIHRtcFswXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29uZGVuc2UgZXF1aXZhbGVuY2UgY29udmVydGVyc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udiA9IGNvbnZlcnRlcnNbY29udjJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgaW5zZXJ0IHRoZSBpbnRlcm1lZGlhdGUgZGF0YVR5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb252ZXJ0ZXJzW2NvbnYyXSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHRtcFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlcy51bnNoaWZ0KHRtcFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBjb252ZXJ0ZXIgKGlmIG5vdCBhbiBlcXVpdmFsZW5jZSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udiAhPT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVW5sZXNzIGVycm9ycyBhcmUgYWxsb3dlZCB0byBidWJibGUsIGNhdGNoIGFuZCByZXR1cm4gdGhlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udiAmJiBzW1widGhyb3dzXCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IGNvbnYocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IGNvbnYocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcInBhcnNlcmVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBjb252ID8gZSA6IFwiTm8gY29udmVyc2lvbiBmcm9tIFwiICsgcHJldiArIFwiIHRvIFwiICsgY3VycmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXRlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgZGF0YTogcmVzcG9uc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeS5leHRlbmQoe1xyXG5cclxuICAgICAgICAvLyBDb3VudGVyIGZvciBob2xkaW5nIHRoZSBudW1iZXIgb2YgYWN0aXZlIHF1ZXJpZXNcclxuICAgICAgICBhY3RpdmU6IDAsXHJcblxyXG4gICAgICAgIC8vIExhc3QtTW9kaWZpZWQgaGVhZGVyIGNhY2hlIGZvciBuZXh0IHJlcXVlc3RcclxuICAgICAgICBsYXN0TW9kaWZpZWQ6IHt9LFxyXG4gICAgICAgIGV0YWc6IHt9LFxyXG5cclxuICAgICAgICBhamF4U2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgdXJsOiBhamF4TG9jYXRpb24sXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGlzTG9jYWw6IHJsb2NhbFByb3RvY29sLnRlc3QoYWpheExvY1BhcnRzWzFdKSxcclxuICAgICAgICAgICAgZ2xvYmFsOiB0cnVlLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOFwiLFxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICB0aW1lb3V0OiAwLFxyXG4gICAgICAgICAgICBkYXRhOiBudWxsLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogbnVsbCxcclxuICAgICAgICAgICAgdXNlcm5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBudWxsLFxyXG4gICAgICAgICAgICBjYWNoZTogbnVsbCxcclxuICAgICAgICAgICAgdGhyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgdHJhZGl0aW9uYWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7fSxcclxuICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgICAgIGFjY2VwdHM6IHtcclxuICAgICAgICAgICAgICAgIFwiKlwiOiBhbGxUeXBlcyxcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwidGV4dC9wbGFpblwiLFxyXG4gICAgICAgICAgICAgICAgaHRtbDogXCJ0ZXh0L2h0bWxcIixcclxuICAgICAgICAgICAgICAgIHhtbDogXCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsXHJcbiAgICAgICAgICAgICAgICBqc29uOiBcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdFwiXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjb250ZW50czoge1xyXG4gICAgICAgICAgICAgICAgeG1sOiAveG1sLyxcclxuICAgICAgICAgICAgICAgIGh0bWw6IC9odG1sLyxcclxuICAgICAgICAgICAgICAgIGpzb246IC9qc29uL1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2VGaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgIHhtbDogXCJyZXNwb25zZVhNTFwiLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJyZXNwb25zZVRleHRcIixcclxuICAgICAgICAgICAgICAgIGpzb246IFwicmVzcG9uc2VKU09OXCJcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIERhdGEgY29udmVydGVyc1xyXG4gICAgICAgICAgICAvLyBLZXlzIHNlcGFyYXRlIHNvdXJjZSAob3IgY2F0Y2hhbGwgXCIqXCIpIGFuZCBkZXN0aW5hdGlvbiB0eXBlcyB3aXRoIGEgc2luZ2xlIHNwYWNlXHJcbiAgICAgICAgICAgIGNvbnZlcnRlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IGFueXRoaW5nIHRvIHRleHRcclxuICAgICAgICAgICAgICAgIFwiKiB0ZXh0XCI6IFN0cmluZyxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUZXh0IHRvIGh0bWwgKHRydWUgPSBubyB0cmFuc2Zvcm1hdGlvbilcclxuICAgICAgICAgICAgICAgIFwidGV4dCBodG1sXCI6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRXZhbHVhdGUgdGV4dCBhcyBhIGpzb24gZXhwcmVzc2lvblxyXG4gICAgICAgICAgICAgICAgXCJ0ZXh0IGpzb25cIjogalF1ZXJ5LnBhcnNlSlNPTixcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQYXJzZSB0ZXh0IGFzIHhtbFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXh0IHhtbFwiOiBqUXVlcnkucGFyc2VYTUxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIEZvciBvcHRpb25zIHRoYXQgc2hvdWxkbid0IGJlIGRlZXAgZXh0ZW5kZWQ6XHJcbiAgICAgICAgICAgIC8vIHlvdSBjYW4gYWRkIHlvdXIgb3duIGN1c3RvbSBvcHRpb25zIGhlcmUgaWZcclxuICAgICAgICAgICAgLy8gYW5kIHdoZW4geW91IGNyZWF0ZSBvbmUgdGhhdCBzaG91bGRuJ3QgYmVcclxuICAgICAgICAgICAgLy8gZGVlcCBleHRlbmRlZCAoc2VlIGFqYXhFeHRlbmQpXHJcbiAgICAgICAgICAgIGZsYXRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBDcmVhdGVzIGEgZnVsbCBmbGVkZ2VkIHNldHRpbmdzIG9iamVjdCBpbnRvIHRhcmdldFxyXG4gICAgICAgIC8vIHdpdGggYm90aCBhamF4U2V0dGluZ3MgYW5kIHNldHRpbmdzIGZpZWxkcy5cclxuICAgICAgICAvLyBJZiB0YXJnZXQgaXMgb21pdHRlZCwgd3JpdGVzIGludG8gYWpheFNldHRpbmdzLlxyXG4gICAgICAgIGFqYXhTZXR1cDogZnVuY3Rpb24gKHRhcmdldCwgc2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzID9cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBCdWlsZGluZyBhIHNldHRpbmdzIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgYWpheEV4dGVuZChhamF4RXh0ZW5kKHRhcmdldCwgalF1ZXJ5LmFqYXhTZXR0aW5ncyksIHNldHRpbmdzKSA6XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRXh0ZW5kaW5nIGFqYXhTZXR0aW5nc1xyXG4gICAgICAgICAgICAgICAgYWpheEV4dGVuZChqUXVlcnkuYWpheFNldHRpbmdzLCB0YXJnZXQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFqYXhQcmVmaWx0ZXI6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyhwcmVmaWx0ZXJzKSxcclxuICAgICAgICBhamF4VHJhbnNwb3J0OiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHModHJhbnNwb3J0cyksXHJcblxyXG4gICAgICAgIC8vIE1haW4gbWV0aG9kXHJcbiAgICAgICAgYWpheDogZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdXJsIGlzIGFuIG9iamVjdCwgc2ltdWxhdGUgcHJlLTEuNSBzaWduYXR1cmVcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZvcmNlIG9wdGlvbnMgdG8gYmUgYW4gb2JqZWN0XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgdmFyIC8vIENyb3NzLWRvbWFpbiBkZXRlY3Rpb24gdmFyc1xyXG4gICAgICAgICAgICAgICAgcGFydHMsXHJcbiAgICAgICAgICAgICAgICAvLyBMb29wIHZhcmlhYmxlXHJcbiAgICAgICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICAgICAgLy8gVVJMIHdpdGhvdXQgYW50aS1jYWNoZSBwYXJhbVxyXG4gICAgICAgICAgICAgICAgY2FjaGVVUkwsXHJcbiAgICAgICAgICAgICAgICAvLyBSZXNwb25zZSBoZWFkZXJzIGFzIHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VIZWFkZXJzU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgLy8gdGltZW91dCBoYW5kbGVcclxuICAgICAgICAgICAgICAgIHRpbWVvdXRUaW1lcixcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUbyBrbm93IGlmIGdsb2JhbCBldmVudHMgYXJlIHRvIGJlIGRpc3BhdGNoZWRcclxuICAgICAgICAgICAgICAgIGZpcmVHbG9iYWxzLFxyXG5cclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydCxcclxuICAgICAgICAgICAgICAgIC8vIFJlc3BvbnNlIGhlYWRlcnNcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlSGVhZGVycyxcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgZmluYWwgb3B0aW9ucyBvYmplY3RcclxuICAgICAgICAgICAgICAgIHMgPSBqUXVlcnkuYWpheFNldHVwKHt9LCBvcHRpb25zKSxcclxuICAgICAgICAgICAgICAgIC8vIENhbGxiYWNrcyBjb250ZXh0XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja0NvbnRleHQgPSBzLmNvbnRleHQgfHwgcyxcclxuICAgICAgICAgICAgICAgIC8vIENvbnRleHQgZm9yIGdsb2JhbCBldmVudHMgaXMgY2FsbGJhY2tDb250ZXh0IGlmIGl0IGlzIGEgRE9NIG5vZGUgb3IgalF1ZXJ5IGNvbGxlY3Rpb25cclxuICAgICAgICAgICAgICAgIGdsb2JhbEV2ZW50Q29udGV4dCA9IHMuY29udGV4dCAmJiAoY2FsbGJhY2tDb250ZXh0Lm5vZGVUeXBlIHx8IGNhbGxiYWNrQ29udGV4dC5qcXVlcnkpID9cclxuICAgICAgICAgICAgICAgIGpRdWVyeShjYWxsYmFja0NvbnRleHQpIDpcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudCxcclxuICAgICAgICAgICAgICAgIC8vIERlZmVycmVkc1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVmZXJyZWQgPSBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksXHJcbiAgICAgICAgICAgICAgICAvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZSA9IHMuc3RhdHVzQ29kZSB8fCB7fSxcclxuICAgICAgICAgICAgICAgIC8vIEhlYWRlcnMgKHRoZXkgYXJlIHNlbnQgYWxsIGF0IG9uY2UpXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SGVhZGVycyA9IHt9LFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEhlYWRlcnNOYW1lcyA9IHt9LFxyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGpxWEhSIHN0YXRlXHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IDAsXHJcbiAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IGFib3J0IG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIHN0ckFib3J0ID0gXCJjYW5jZWxlZFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gRmFrZSB4aHJcclxuICAgICAgICAgICAgICAgIGpxWEhSID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU6IDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEJ1aWxkcyBoZWFkZXJzIGhhc2h0YWJsZSBpZiBuZWVkZWRcclxuICAgICAgICAgICAgICAgICAgICBnZXRSZXNwb25zZUhlYWRlcjogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZUhlYWRlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZUhlYWRlcnMgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmhlYWRlcnMuZXhlYyhyZXNwb25zZUhlYWRlcnNTdHJpbmcpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZUhlYWRlcnNbbWF0Y2hbMV0udG9Mb3dlckNhc2UoKV0gPSBtYXRjaFsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IHJlc3BvbnNlSGVhZGVyc1trZXkudG9Mb3dlckNhc2UoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoID09IG51bGwgPyBudWxsIDogbWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmF3IHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgIGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgPT09IDIgPyByZXNwb25zZUhlYWRlcnNTdHJpbmcgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhY2hlcyB0aGUgaGVhZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UmVxdWVzdEhlYWRlcjogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHJlcXVlc3RIZWFkZXJzTmFtZXNbbG5hbWVdID0gcmVxdWVzdEhlYWRlcnNOYW1lc1tsbmFtZV0gfHwgbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT3ZlcnJpZGVzIHJlc3BvbnNlIGNvbnRlbnQtdHlwZSBoZWFkZXJcclxuICAgICAgICAgICAgICAgICAgICBvdmVycmlkZU1pbWVUeXBlOiBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLm1pbWVUeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IGZ1bmN0aW9uIChtYXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvZGUgaW4gbWFwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExhenktYWRkIHRoZSBuZXcgY2FsbGJhY2sgaW4gYSB3YXkgdGhhdCBwcmVzZXJ2ZXMgb2xkIG9uZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZVtjb2RlXSA9IFtzdGF0dXNDb2RlW2NvZGVdLCBtYXBbY29kZV1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgYXBwcm9wcmlhdGUgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganFYSFIuYWx3YXlzKG1hcFtqcVhIUi5zdGF0dXNdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDYW5jZWwgdGhlIHJlcXVlc3RcclxuICAgICAgICAgICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24gKHN0YXR1c1RleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFsVGV4dCA9IHN0YXR1c1RleHQgfHwgc3RyQWJvcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydC5hYm9ydChmaW5hbFRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoMCwgZmluYWxUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIEF0dGFjaCBkZWZlcnJlZHNcclxuICAgICAgICAgICAgZGVmZXJyZWQucHJvbWlzZShqcVhIUikuY29tcGxldGUgPSBjb21wbGV0ZURlZmVycmVkLmFkZDtcclxuICAgICAgICAgICAganFYSFIuc3VjY2VzcyA9IGpxWEhSLmRvbmU7XHJcbiAgICAgICAgICAgIGpxWEhSLmVycm9yID0ganFYSFIuZmFpbDtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBoYXNoIGNoYXJhY3RlciAoIzc1MzE6IGFuZCBzdHJpbmcgcHJvbW90aW9uKVxyXG4gICAgICAgICAgICAvLyBBZGQgcHJvdG9jb2wgaWYgbm90IHByb3ZpZGVkICgjNTg2NjogSUU3IGlzc3VlIHdpdGggcHJvdG9jb2wtbGVzcyB1cmxzKVxyXG4gICAgICAgICAgICAvLyBIYW5kbGUgZmFsc3kgdXJsIGluIHRoZSBzZXR0aW5ncyBvYmplY3QgKCMxMDA5MzogY29uc2lzdGVuY3kgd2l0aCBvbGQgc2lnbmF0dXJlKVxyXG4gICAgICAgICAgICAvLyBXZSBhbHNvIHVzZSB0aGUgdXJsIHBhcmFtZXRlciBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgcy51cmwgPSAoKHVybCB8fCBzLnVybCB8fCBhamF4TG9jYXRpb24pICsgXCJcIikucmVwbGFjZShyaGFzaCwgXCJcIikucmVwbGFjZShycHJvdG9jb2wsIGFqYXhMb2NQYXJ0c1sxXSArIFwiLy9cIik7XHJcblxyXG4gICAgICAgICAgICAvLyBBbGlhcyBtZXRob2Qgb3B0aW9uIHRvIHR5cGUgYXMgcGVyIHRpY2tldCAjMTIwMDRcclxuICAgICAgICAgICAgcy50eXBlID0gb3B0aW9ucy5tZXRob2QgfHwgb3B0aW9ucy50eXBlIHx8IHMubWV0aG9kIHx8IHMudHlwZTtcclxuXHJcbiAgICAgICAgICAgIC8vIEV4dHJhY3QgZGF0YVR5cGVzIGxpc3RcclxuICAgICAgICAgICAgcy5kYXRhVHlwZXMgPSBqUXVlcnkudHJpbShzLmRhdGFUeXBlIHx8IFwiKlwiKS50b0xvd2VyQ2FzZSgpLm1hdGNoKHJub3R3aGl0ZSkgfHwgW1wiXCJdO1xyXG5cclxuICAgICAgICAgICAgLy8gQSBjcm9zcy1kb21haW4gcmVxdWVzdCBpcyBpbiBvcmRlciB3aGVuIHdlIGhhdmUgYSBwcm90b2NvbDpob3N0OnBvcnQgbWlzbWF0Y2hcclxuICAgICAgICAgICAgaWYgKHMuY3Jvc3NEb21haW4gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcGFydHMgPSBydXJsLmV4ZWMocy51cmwudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICBzLmNyb3NzRG9tYWluID0gISEocGFydHMgJiZcclxuICAgICAgICAgICAgICAgICAgICAocGFydHNbMV0gIT09IGFqYXhMb2NQYXJ0c1sxXSB8fCBwYXJ0c1syXSAhPT0gYWpheExvY1BhcnRzWzJdIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChwYXJ0c1szXSB8fCAocGFydHNbMV0gPT09IFwiaHR0cDpcIiA/IFwiODBcIiA6IFwiNDQzXCIpKSAhPT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKGFqYXhMb2NQYXJ0c1szXSB8fCAoYWpheExvY1BhcnRzWzFdID09PSBcImh0dHA6XCIgPyBcIjgwXCIgOiBcIjQ0M1wiKSkpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDb252ZXJ0IGRhdGEgaWYgbm90IGFscmVhZHkgYSBzdHJpbmdcclxuICAgICAgICAgICAgaWYgKHMuZGF0YSAmJiBzLnByb2Nlc3NEYXRhICYmIHR5cGVvZiBzLmRhdGEgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHMuZGF0YSA9IGpRdWVyeS5wYXJhbShzLmRhdGEsIHMudHJhZGl0aW9uYWwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBcHBseSBwcmVmaWx0ZXJzXHJcbiAgICAgICAgICAgIGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKHByZWZpbHRlcnMsIHMsIG9wdGlvbnMsIGpxWEhSKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHJlcXVlc3Qgd2FzIGFib3J0ZWQgaW5zaWRlIGEgcHJlZmlsdGVyLCBzdG9wIHRoZXJlXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpxWEhSO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBXZSBjYW4gZmlyZSBnbG9iYWwgZXZlbnRzIGFzIG9mIG5vdyBpZiBhc2tlZCB0b1xyXG4gICAgICAgICAgICBmaXJlR2xvYmFscyA9IHMuZ2xvYmFsO1xyXG5cclxuICAgICAgICAgICAgLy8gV2F0Y2ggZm9yIGEgbmV3IHNldCBvZiByZXF1ZXN0c1xyXG4gICAgICAgICAgICBpZiAoZmlyZUdsb2JhbHMgJiYgalF1ZXJ5LmFjdGl2ZSsrID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlcihcImFqYXhTdGFydFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVXBwZXJjYXNlIHRoZSB0eXBlXHJcbiAgICAgICAgICAgIHMudHlwZSA9IHMudHlwZS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHJlcXVlc3QgaGFzIGNvbnRlbnRcclxuICAgICAgICAgICAgcy5oYXNDb250ZW50ID0gIXJub0NvbnRlbnQudGVzdChzLnR5cGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2F2ZSB0aGUgVVJMIGluIGNhc2Ugd2UncmUgdG95aW5nIHdpdGggdGhlIElmLU1vZGlmaWVkLVNpbmNlXHJcbiAgICAgICAgICAgIC8vIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciBsYXRlciBvblxyXG4gICAgICAgICAgICBjYWNoZVVSTCA9IHMudXJsO1xyXG5cclxuICAgICAgICAgICAgLy8gTW9yZSBvcHRpb25zIGhhbmRsaW5nIGZvciByZXF1ZXN0cyB3aXRoIG5vIGNvbnRlbnRcclxuICAgICAgICAgICAgaWYgKCFzLmhhc0NvbnRlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBkYXRhIGlzIGF2YWlsYWJsZSwgYXBwZW5kIGRhdGEgdG8gdXJsXHJcbiAgICAgICAgICAgICAgICBpZiAocy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVVUkwgPSAocy51cmwgKz0gKHJxdWVyeS50ZXN0KGNhY2hlVVJMKSA/IFwiJlwiIDogXCI/XCIpICsgcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAjOTY4MjogcmVtb3ZlIGRhdGEgc28gdGhhdCBpdCdzIG5vdCB1c2VkIGluIGFuIGV2ZW50dWFsIHJldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHMuZGF0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgYW50aS1jYWNoZSBpbiB1cmwgaWYgbmVlZGVkXHJcbiAgICAgICAgICAgICAgICBpZiAocy5jYWNoZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzLnVybCA9IHJ0cy50ZXN0KGNhY2hlVVJMKSA/XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IGEgJ18nIHBhcmFtZXRlciwgc2V0IGl0cyB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZVVSTC5yZXBsYWNlKHJ0cywgXCIkMV89XCIgKyBub25jZSsrKSA6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIG9uZSB0byB0aGUgZW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlVVJMICsgKHJxdWVyeS50ZXN0KGNhY2hlVVJMKSA/IFwiJlwiIDogXCI/XCIpICsgXCJfPVwiICsgbm9uY2UrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cclxuICAgICAgICAgICAgaWYgKHMuaWZNb2RpZmllZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpRdWVyeS5sYXN0TW9kaWZpZWRbY2FjaGVVUkxdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAganFYSFIuc2V0UmVxdWVzdEhlYWRlcihcIklmLU1vZGlmaWVkLVNpbmNlXCIsIGpRdWVyeS5sYXN0TW9kaWZpZWRbY2FjaGVVUkxdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChqUXVlcnkuZXRhZ1tjYWNoZVVSTF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKFwiSWYtTm9uZS1NYXRjaFwiLCBqUXVlcnkuZXRhZ1tjYWNoZVVSTF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGNvcnJlY3QgaGVhZGVyLCBpZiBkYXRhIGlzIGJlaW5nIHNlbnRcclxuICAgICAgICAgICAgaWYgKHMuZGF0YSAmJiBzLmhhc0NvbnRlbnQgJiYgcy5jb250ZW50VHlwZSAhPT0gZmFsc2UgfHwgb3B0aW9ucy5jb250ZW50VHlwZSkge1xyXG4gICAgICAgICAgICAgICAganFYSFIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBzLmNvbnRlbnRUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHRoZSBBY2NlcHRzIGhlYWRlciBmb3IgdGhlIHNlcnZlciwgZGVwZW5kaW5nIG9uIHRoZSBkYXRhVHlwZVxyXG4gICAgICAgICAgICBqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKFxyXG4gICAgICAgICAgICAgICAgXCJBY2NlcHRcIixcclxuICAgICAgICAgICAgICAgIHMuZGF0YVR5cGVzWzBdICYmIHMuYWNjZXB0c1tzLmRhdGFUeXBlc1swXV0gP1xyXG4gICAgICAgICAgICAgICAgcy5hY2NlcHRzW3MuZGF0YVR5cGVzWzBdXSArIChzLmRhdGFUeXBlc1swXSAhPT0gXCIqXCIgPyBcIiwgXCIgKyBhbGxUeXBlcyArIFwiOyBxPTAuMDFcIiA6IFwiXCIpIDpcclxuICAgICAgICAgICAgICAgIHMuYWNjZXB0c1tcIipcIl1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBoZWFkZXJzIG9wdGlvblxyXG4gICAgICAgICAgICBmb3IgKGkgaW4gcy5oZWFkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKGksIHMuaGVhZGVyc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFsbG93IGN1c3RvbSBoZWFkZXJzL21pbWV0eXBlcyBhbmQgZWFybHkgYWJvcnRcclxuICAgICAgICAgICAgaWYgKHMuYmVmb3JlU2VuZCAmJiAocy5iZWZvcmVTZW5kLmNhbGwoY2FsbGJhY2tDb250ZXh0LCBqcVhIUiwgcykgPT09IGZhbHNlIHx8IHN0YXRlID09PSAyKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQWJvcnQgaWYgbm90IGRvbmUgYWxyZWFkeSBhbmQgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganFYSFIuYWJvcnQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gYWJvcnRpbmcgaXMgbm8gbG9uZ2VyIGEgY2FuY2VsbGF0aW9uXHJcbiAgICAgICAgICAgIHN0ckFib3J0ID0gXCJhYm9ydFwiO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5zdGFsbCBjYWxsYmFja3Mgb24gZGVmZXJyZWRzXHJcbiAgICAgICAgICAgIGZvciAoaSBpbiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogMSxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogMVxyXG4gICAgICAgICAgICAgICAgfSkge1xyXG4gICAgICAgICAgICAgICAganFYSFJbaV0oc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0cmFuc3BvcnRcclxuICAgICAgICAgICAgdHJhbnNwb3J0ID0gaW5zcGVjdFByZWZpbHRlcnNPclRyYW5zcG9ydHModHJhbnNwb3J0cywgcywgb3B0aW9ucywganFYSFIpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgbm8gdHJhbnNwb3J0LCB3ZSBhdXRvLWFib3J0XHJcbiAgICAgICAgICAgIGlmICghdHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICBkb25lKC0xLCBcIk5vIFRyYW5zcG9ydFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGpxWEhSLnJlYWR5U3RhdGUgPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNlbmQgZ2xvYmFsIGV2ZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlyZUdsb2JhbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlcihcImFqYXhTZW5kXCIsIFtqcVhIUiwgc10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gVGltZW91dFxyXG4gICAgICAgICAgICAgICAgaWYgKHMuYXN5bmMgJiYgcy50aW1lb3V0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqcVhIUi5hYm9ydChcInRpbWVvdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgcy50aW1lb3V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChyZXF1ZXN0SGVhZGVycywgZG9uZSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvcGFnYXRlIGV4Y2VwdGlvbiBhcyBlcnJvciBpZiBub3QgZG9uZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgtMSwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbXBseSByZXRocm93IG90aGVyd2lzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3Igd2hlbiBldmVyeXRoaW5nIGlzIGRvbmVcclxuICAgICAgICAgICAgZnVuY3Rpb24gZG9uZShzdGF0dXMsIG5hdGl2ZVN0YXR1c1RleHQsIHJlc3BvbnNlcywgaGVhZGVycykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzU3VjY2Vzcywgc3VjY2VzcywgZXJyb3IsIHJlc3BvbnNlLCBtb2RpZmllZCxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gbmF0aXZlU3RhdHVzVGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDYWxsZWQgb25jZVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN0YXRlIGlzIFwiZG9uZVwiIG5vd1xyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSAyO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENsZWFyIHRpbWVvdXQgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICBpZiAodGltZW91dFRpbWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGVyZWZlcmVuY2UgdHJhbnNwb3J0IGZvciBlYXJseSBnYXJiYWdlIGNvbGxlY3Rpb25cclxuICAgICAgICAgICAgICAgIC8vIChubyBtYXR0ZXIgaG93IGxvbmcgdGhlIGpxWEhSIG9iamVjdCB3aWxsIGJlIHVzZWQpXHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2FjaGUgcmVzcG9uc2UgaGVhZGVyc1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VIZWFkZXJzU3RyaW5nID0gaGVhZGVycyB8fCBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCByZWFkeVN0YXRlXHJcbiAgICAgICAgICAgICAgICBqcVhIUi5yZWFkeVN0YXRlID0gc3RhdHVzID4gMCA/IDQgOiAwO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERldGVybWluZSBpZiBzdWNjZXNzZnVsXHJcbiAgICAgICAgICAgICAgICBpc1N1Y2Nlc3MgPSBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCB8fCBzdGF0dXMgPT09IDMwNDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgcmVzcG9uc2UgZGF0YVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYWpheEhhbmRsZVJlc3BvbnNlcyhzLCBqcVhIUiwgcmVzcG9uc2VzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IG5vIG1hdHRlciB3aGF0ICh0aGF0IHdheSByZXNwb25zZVhYWCBmaWVsZHMgYXJlIGFsd2F5cyBzZXQpXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IGFqYXhDb252ZXJ0KHMsIHJlc3BvbnNlLCBqcVhIUiwgaXNTdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBzdWNjZXNzZnVsLCBoYW5kbGUgdHlwZSBjaGFpbmluZ1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIElmLU1vZGlmaWVkLVNpbmNlIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciwgaWYgaW4gaWZNb2RpZmllZCBtb2RlLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmlmTW9kaWZpZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcihcIkxhc3QtTW9kaWZpZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RpZmllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lmxhc3RNb2RpZmllZFtjYWNoZVVSTF0gPSBtb2RpZmllZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllZCA9IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKFwiZXRhZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGlmaWVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXRhZ1tjYWNoZVVSTF0gPSBtb2RpZmllZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgbm8gY29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDIwNCB8fCBzLnR5cGUgPT09IFwiSEVBRFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIm5vY29udGVudFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbm90IG1vZGlmaWVkXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IDMwNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJub3Rtb2RpZmllZFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBkYXRhLCBsZXQncyBjb252ZXJ0IGl0XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTdWNjZXNzID0gIWVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgZXh0cmFjdCBlcnJvciBmcm9tIHN0YXR1c1RleHRcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGVuIG5vcm1hbGl6ZSBzdGF0dXNUZXh0IGFuZCBzdGF0dXMgZm9yIG5vbi1hYm9ydHNcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHN0YXR1c1RleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyB8fCAhc3RhdHVzVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJlcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgZGF0YSBmb3IgdGhlIGZha2UgeGhyIG9iamVjdFxyXG4gICAgICAgICAgICAgICAganFYSFIuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAganFYSFIuc3RhdHVzVGV4dCA9IChuYXRpdmVTdGF0dXNUZXh0IHx8IHN0YXR1c1RleHQpICsgXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdWNjZXNzL0Vycm9yXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgoY2FsbGJhY2tDb250ZXh0LCBbc3VjY2Vzcywgc3RhdHVzVGV4dCwganFYSFJdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0V2l0aChjYWxsYmFja0NvbnRleHQsIFtqcVhIUiwgc3RhdHVzVGV4dCwgZXJyb3JdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xyXG4gICAgICAgICAgICAgICAganFYSFIuc3RhdHVzQ29kZShzdGF0dXNDb2RlKTtcclxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGUgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZpcmVHbG9iYWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoaXNTdWNjZXNzID8gXCJhamF4U3VjY2Vzc1wiIDogXCJhamF4RXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2pxWEhSLCBzLCBpc1N1Y2Nlc3MgPyBzdWNjZXNzIDogZXJyb3JdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWZlcnJlZC5maXJlV2l0aChjYWxsYmFja0NvbnRleHQsIFtqcVhIUiwgc3RhdHVzVGV4dF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmaXJlR2xvYmFscykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKFwiYWpheENvbXBsZXRlXCIsIFtqcVhIUiwgc10pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgZ2xvYmFsIEFKQVggY291bnRlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKC0talF1ZXJ5LmFjdGl2ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LnRyaWdnZXIoXCJhamF4U3RvcFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBqcVhIUjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRKU09OOiBmdW5jdGlvbiAodXJsLCBkYXRhLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmdldCh1cmwsIGRhdGEsIGNhbGxiYWNrLCBcImpzb25cIik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0U2NyaXB0OiBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmdldCh1cmwsIHVuZGVmaW5lZCwgY2FsbGJhY2ssIFwic2NyaXB0XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGpRdWVyeS5lYWNoKFtcImdldFwiLCBcInBvc3RcIl0sIGZ1bmN0aW9uIChpLCBtZXRob2QpIHtcclxuICAgICAgICBqUXVlcnlbbWV0aG9kXSA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNhbGxiYWNrLCB0eXBlKSB7XHJcbiAgICAgICAgICAgIC8vIHNoaWZ0IGFyZ3VtZW50cyBpZiBkYXRhIGFyZ3VtZW50IHdhcyBvbWl0dGVkXHJcbiAgICAgICAgICAgIGlmIChqUXVlcnkuaXNGdW5jdGlvbihkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IHR5cGUgfHwgY2FsbGJhY2s7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBtZXRob2QsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBjYWxsYmFja1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQXR0YWNoIGEgYnVuY2ggb2YgZnVuY3Rpb25zIGZvciBoYW5kbGluZyBjb21tb24gQUpBWCBldmVudHNcclxuICAgIGpRdWVyeS5lYWNoKFtcImFqYXhTdGFydFwiLCBcImFqYXhTdG9wXCIsIFwiYWpheENvbXBsZXRlXCIsIFwiYWpheEVycm9yXCIsIFwiYWpheFN1Y2Nlc3NcIiwgXCJhamF4U2VuZFwiXSwgZnVuY3Rpb24gKGksIHR5cGUpIHtcclxuICAgICAgICBqUXVlcnkuZm5bdHlwZV0gPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgZm4pO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgalF1ZXJ5Ll9ldmFsVXJsID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHJldHVybiBqUXVlcnkuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBnbG9iYWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInRocm93c1wiOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBqUXVlcnkuZm4uZXh0ZW5kKHtcclxuICAgICAgICB3cmFwQWxsOiBmdW5jdGlvbiAoaHRtbCkge1xyXG4gICAgICAgICAgICBpZiAoalF1ZXJ5LmlzRnVuY3Rpb24oaHRtbCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykud3JhcEFsbChodG1sLmNhbGwodGhpcywgaSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZWxlbWVudHMgdG8gd3JhcCB0aGUgdGFyZ2V0IGFyb3VuZFxyXG4gICAgICAgICAgICAgICAgdmFyIHdyYXAgPSBqUXVlcnkoaHRtbCwgdGhpc1swXS5vd25lckRvY3VtZW50KS5lcSgwKS5jbG9uZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpc1swXS5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcC5pbnNlcnRCZWZvcmUodGhpc1swXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgd3JhcC5tYXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGVsZW0uZmlyc3RDaGlsZCAmJiBlbGVtLmZpcnN0Q2hpbGQubm9kZVR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgICAgICAgICAgICAgfSkuYXBwZW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB3cmFwSW5uZXI6IGZ1bmN0aW9uIChodG1sKSB7XHJcbiAgICAgICAgICAgIGlmIChqUXVlcnkuaXNGdW5jdGlvbihodG1sKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSh0aGlzKS53cmFwSW5uZXIoaHRtbC5jYWxsKHRoaXMsIGkpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0galF1ZXJ5KHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzID0gc2VsZi5jb250ZW50cygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50cy53cmFwQWxsKGh0bWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHdyYXA6IGZ1bmN0aW9uIChodG1sKSB7XHJcbiAgICAgICAgICAgIHZhciBpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oaHRtbCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykud3JhcEFsbChpc0Z1bmN0aW9uID8gaHRtbC5jYWxsKHRoaXMsIGkpIDogaHRtbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVud3JhcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQoKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghalF1ZXJ5Lm5vZGVOYW1lKHRoaXMsIFwiYm9keVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5yZXBsYWNlV2l0aCh0aGlzLmNoaWxkTm9kZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5lbmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgalF1ZXJ5LmV4cHIuZmlsdGVycy5oaWRkZW4gPSBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgIC8vIFN1cHBvcnQ6IE9wZXJhIDw9IDEyLjEyXHJcbiAgICAgICAgLy8gT3BlcmEgcmVwb3J0cyBvZmZzZXRXaWR0aHMgYW5kIG9mZnNldEhlaWdodHMgbGVzcyB0aGFuIHplcm8gb24gc29tZSBlbGVtZW50c1xyXG4gICAgICAgIHJldHVybiBlbGVtLm9mZnNldFdpZHRoIDw9IDAgJiYgZWxlbS5vZmZzZXRIZWlnaHQgPD0gMCB8fFxyXG4gICAgICAgICAgICAoIXN1cHBvcnQucmVsaWFibGVIaWRkZW5PZmZzZXRzKCkgJiZcclxuICAgICAgICAgICAgICAgICgoZWxlbS5zdHlsZSAmJiBlbGVtLnN0eWxlLmRpc3BsYXkpIHx8IGpRdWVyeS5jc3MoZWxlbSwgXCJkaXNwbGF5XCIpKSA9PT0gXCJub25lXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBqUXVlcnkuZXhwci5maWx0ZXJzLnZpc2libGUgPSBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgIHJldHVybiAhalF1ZXJ5LmV4cHIuZmlsdGVycy5oaWRkZW4oZWxlbSk7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG5cclxuICAgIHZhciByMjAgPSAvJTIwL2csXHJcbiAgICAgICAgcmJyYWNrZXQgPSAvXFxbXFxdJC8sXHJcbiAgICAgICAgckNSTEYgPSAvXFxyP1xcbi9nLFxyXG4gICAgICAgIHJzdWJtaXR0ZXJUeXBlcyA9IC9eKD86c3VibWl0fGJ1dHRvbnxpbWFnZXxyZXNldHxmaWxlKSQvaSxcclxuICAgICAgICByc3VibWl0dGFibGUgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxrZXlnZW4pL2k7XHJcblxyXG4gICAgZnVuY3Rpb24gYnVpbGRQYXJhbXMocHJlZml4LCBvYmosIHRyYWRpdGlvbmFsLCBhZGQpIHtcclxuICAgICAgICB2YXIgbmFtZTtcclxuXHJcbiAgICAgICAgaWYgKGpRdWVyeS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgICAgICAgLy8gU2VyaWFsaXplIGFycmF5IGl0ZW0uXHJcbiAgICAgICAgICAgIGpRdWVyeS5lYWNoKG9iaiwgZnVuY3Rpb24gKGksIHYpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFkaXRpb25hbCB8fCByYnJhY2tldC50ZXN0KHByZWZpeCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmVhdCBlYWNoIGFycmF5IGl0ZW0gYXMgYSBzY2FsYXIuXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkKHByZWZpeCwgdik7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGlzIG5vbi1zY2FsYXIgKGFycmF5IG9yIG9iamVjdCksIGVuY29kZSBpdHMgbnVtZXJpYyBpbmRleC5cclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBhcmFtcyhwcmVmaXggKyBcIltcIiArICh0eXBlb2YgdiA9PT0gXCJvYmplY3RcIiA/IGkgOiBcIlwiKSArIFwiXVwiLCB2LCB0cmFkaXRpb25hbCwgYWRkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRyYWRpdGlvbmFsICYmIGpRdWVyeS50eXBlKG9iaikgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgLy8gU2VyaWFsaXplIG9iamVjdCBpdGVtLlxyXG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBidWlsZFBhcmFtcyhwcmVmaXggKyBcIltcIiArIG5hbWUgKyBcIl1cIiwgb2JqW25hbWVdLCB0cmFkaXRpb25hbCwgYWRkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBTZXJpYWxpemUgc2NhbGFyIGl0ZW0uXHJcbiAgICAgICAgICAgIGFkZChwcmVmaXgsIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlcmlhbGl6ZSBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzIG9yIGEgc2V0IG9mXHJcbiAgICAvLyBrZXkvdmFsdWVzIGludG8gYSBxdWVyeSBzdHJpbmdcclxuICAgIGpRdWVyeS5wYXJhbSA9IGZ1bmN0aW9uIChhLCB0cmFkaXRpb25hbCkge1xyXG4gICAgICAgIHZhciBwcmVmaXgsXHJcbiAgICAgICAgICAgIHMgPSBbXSxcclxuICAgICAgICAgICAgYWRkID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGludm9rZSBpdCBhbmQgcmV0dXJuIGl0cyB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBqUXVlcnkuaXNGdW5jdGlvbih2YWx1ZSkgPyB2YWx1ZSgpIDogKHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgc1tzLmxlbmd0aF0gPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRyYWRpdGlvbmFsIHRvIHRydWUgZm9yIGpRdWVyeSA8PSAxLjMuMiBiZWhhdmlvci5cclxuICAgICAgICBpZiAodHJhZGl0aW9uYWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0cmFkaXRpb25hbCA9IGpRdWVyeS5hamF4U2V0dGluZ3MgJiYgalF1ZXJ5LmFqYXhTZXR0aW5ncy50cmFkaXRpb25hbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIGFuIGFycmF5IHdhcyBwYXNzZWQgaW4sIGFzc3VtZSB0aGF0IGl0IGlzIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMuXHJcbiAgICAgICAgaWYgKGpRdWVyeS5pc0FycmF5KGEpIHx8IChhLmpxdWVyeSAmJiAhalF1ZXJ5LmlzUGxhaW5PYmplY3QoYSkpKSB7XHJcbiAgICAgICAgICAgIC8vIFNlcmlhbGl6ZSB0aGUgZm9ybSBlbGVtZW50c1xyXG4gICAgICAgICAgICBqUXVlcnkuZWFjaChhLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBhZGQodGhpcy5uYW1lLCB0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRyYWRpdGlvbmFsLCBlbmNvZGUgdGhlIFwib2xkXCIgd2F5ICh0aGUgd2F5IDEuMy4yIG9yIG9sZGVyXHJcbiAgICAgICAgICAgIC8vIGRpZCBpdCksIG90aGVyd2lzZSBlbmNvZGUgcGFyYW1zIHJlY3Vyc2l2ZWx5LlxyXG4gICAgICAgICAgICBmb3IgKHByZWZpeCBpbiBhKSB7XHJcbiAgICAgICAgICAgICAgICBidWlsZFBhcmFtcyhwcmVmaXgsIGFbcHJlZml4XSwgdHJhZGl0aW9uYWwsIGFkZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIHNlcmlhbGl6YXRpb25cclxuICAgICAgICByZXR1cm4gcy5qb2luKFwiJlwiKS5yZXBsYWNlKHIyMCwgXCIrXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBqUXVlcnkuZm4uZXh0ZW5kKHtcclxuICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5wYXJhbSh0aGlzLnNlcmlhbGl6ZUFycmF5KCkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VyaWFsaXplQXJyYXk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDYW4gYWRkIHByb3BIb29rIGZvciBcImVsZW1lbnRzXCIgdG8gZmlsdGVyIG9yIGFkZCBmb3JtIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0galF1ZXJ5LnByb3AodGhpcywgXCJlbGVtZW50c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudHMgPyBqUXVlcnkubWFrZUFycmF5KGVsZW1lbnRzKSA6IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIC5pcyhcIjpkaXNhYmxlZFwiKSBzbyB0aGF0IGZpZWxkc2V0W2Rpc2FibGVkXSB3b3Jrc1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hbWUgJiYgIWpRdWVyeSh0aGlzKS5pcyhcIjpkaXNhYmxlZFwiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByc3VibWl0dGFibGUudGVzdCh0aGlzLm5vZGVOYW1lKSAmJiAhcnN1Ym1pdHRlclR5cGVzLnRlc3QodHlwZSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuY2hlY2tlZCB8fCAhcmNoZWNrYWJsZVR5cGUudGVzdCh0eXBlKSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoaSwgZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBqUXVlcnkodGhpcykudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgPT0gbnVsbCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuaXNBcnJheSh2YWwpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lm1hcCh2YWwsIGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZWxlbS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWwucmVwbGFjZShyQ1JMRiwgXCJcXHJcXG5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZWxlbS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbC5yZXBsYWNlKHJDUkxGLCBcIlxcclxcblwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIENyZWF0ZSB0aGUgcmVxdWVzdCBvYmplY3RcclxuICAgIC8vIChUaGlzIGlzIHN0aWxsIGF0dGFjaGVkIHRvIGFqYXhTZXR0aW5ncyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSlcclxuICAgIGpRdWVyeS5hamF4U2V0dGluZ3MueGhyID0gd2luZG93LkFjdGl2ZVhPYmplY3QgIT09IHVuZGVmaW5lZCA/XHJcbiAgICAgICAgLy8gU3VwcG9ydDogSUU2K1xyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFhIUiBjYW5ub3QgYWNjZXNzIGxvY2FsIGZpbGVzLCBhbHdheXMgdXNlIEFjdGl2ZVggZm9yIHRoYXQgY2FzZVxyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNMb2NhbCAmJlxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFNy04XHJcbiAgICAgICAgICAgICAgICAvLyBvbGRJRSBYSFIgZG9lcyBub3Qgc3VwcG9ydCBub24tUkZDMjYxNiBtZXRob2RzICgjMTMyNDApXHJcbiAgICAgICAgICAgICAgICAvLyBTZWUgaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL21zNTM2NjQ4KHY9dnMuODUpLmFzcHhcclxuICAgICAgICAgICAgICAgIC8vIGFuZCBodHRwOi8vd3d3LnczLm9yZy9Qcm90b2NvbHMvcmZjMjYxNi9yZmMyNjE2LXNlYzkuaHRtbCNzZWM5XHJcbiAgICAgICAgICAgICAgICAvLyBBbHRob3VnaCB0aGlzIGNoZWNrIGZvciBzaXggbWV0aG9kcyBpbnN0ZWFkIG9mIGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAvLyBzaW5jZSBJRSBhbHNvIGRvZXMgbm90IHN1cHBvcnQgXCJ0cmFjZVwiIGFuZCBcImNvbm5lY3RcIlxyXG4gICAgICAgICAgICAgICAgL14oZ2V0fHBvc3R8aGVhZHxwdXR8ZGVsZXRlfG9wdGlvbnMpJC9pLnRlc3QodGhpcy50eXBlKSAmJlxyXG5cclxuICAgICAgICAgICAgICAgIGNyZWF0ZVN0YW5kYXJkWEhSKCkgfHwgY3JlYXRlQWN0aXZlWEhSKCk7XHJcbiAgICAgICAgfSA6XHJcbiAgICAgICAgLy8gRm9yIGFsbCBvdGhlciBicm93c2VycywgdXNlIHRoZSBzdGFuZGFyZCBYTUxIdHRwUmVxdWVzdCBvYmplY3RcclxuICAgICAgICBjcmVhdGVTdGFuZGFyZFhIUjtcclxuXHJcbiAgICB2YXIgeGhySWQgPSAwLFxyXG4gICAgICAgIHhockNhbGxiYWNrcyA9IHt9LFxyXG4gICAgICAgIHhoclN1cHBvcnRlZCA9IGpRdWVyeS5hamF4U2V0dGluZ3MueGhyKCk7XHJcblxyXG4gICAgLy8gU3VwcG9ydDogSUU8MTBcclxuICAgIC8vIE9wZW4gcmVxdWVzdHMgbXVzdCBiZSBtYW51YWxseSBhYm9ydGVkIG9uIHVubG9hZCAoIzUyODApXHJcbiAgICBpZiAod2luZG93LkFjdGl2ZVhPYmplY3QpIHtcclxuICAgICAgICBqUXVlcnkod2luZG93KS5vbihcInVubG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB4aHJDYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgICAgIHhockNhbGxiYWNrc1trZXldKHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgc3VwcG9ydCBwcm9wZXJ0aWVzXHJcbiAgICBzdXBwb3J0LmNvcnMgPSAhIXhoclN1cHBvcnRlZCAmJiAoXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHJTdXBwb3J0ZWQpO1xyXG4gICAgeGhyU3VwcG9ydGVkID0gc3VwcG9ydC5hamF4ID0gISF4aHJTdXBwb3J0ZWQ7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHRyYW5zcG9ydCBpZiB0aGUgYnJvd3NlciBjYW4gcHJvdmlkZSBhbiB4aHJcclxuICAgIGlmICh4aHJTdXBwb3J0ZWQpIHtcclxuXHJcbiAgICAgICAgalF1ZXJ5LmFqYXhUcmFuc3BvcnQoZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgLy8gQ3Jvc3MgZG9tYWluIG9ubHkgYWxsb3dlZCBpZiBzdXBwb3J0ZWQgdGhyb3VnaCBYTUxIdHRwUmVxdWVzdFxyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuY3Jvc3NEb21haW4gfHwgc3VwcG9ydC5jb3JzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZDogZnVuY3Rpb24gKGhlYWRlcnMsIGNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyID0gb3B0aW9ucy54aHIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gKyt4aHJJZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9wZW4gdGhlIHNvY2tldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIub3BlbihvcHRpb25zLnR5cGUsIG9wdGlvbnMudXJsLCBvcHRpb25zLmFzeW5jLCBvcHRpb25zLnVzZXJuYW1lLCBvcHRpb25zLnBhc3N3b3JkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IGN1c3RvbSBmaWVsZHMgaWYgcHJvdmlkZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMueGhyRmllbGRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgaW4gb3B0aW9ucy54aHJGaWVsZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHJbaV0gPSBvcHRpb25zLnhockZpZWxkc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3ZlcnJpZGUgbWltZSB0eXBlIGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5taW1lVHlwZSAmJiB4aHIub3ZlcnJpZGVNaW1lVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUob3B0aW9ucy5taW1lVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFgtUmVxdWVzdGVkLVdpdGggaGVhZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvciBjcm9zcy1kb21haW4gcmVxdWVzdHMsIHNlZWluZyBhcyBjb25kaXRpb25zIGZvciBhIHByZWZsaWdodCBhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWtpbiB0byBhIGppZ3NhdyBwdXp6bGUsIHdlIHNpbXBseSBuZXZlciBzZXQgaXQgdG8gYmUgc3VyZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKGl0IGNhbiBhbHdheXMgYmUgc2V0IG9uIGEgcGVyLXJlcXVlc3QgYmFzaXMgb3IgZXZlbiB1c2luZyBhamF4U2V0dXApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvciBzYW1lLWRvbWFpbiByZXF1ZXN0cywgd29uJ3QgY2hhbmdlIGhlYWRlciBpZiBhbHJlYWR5IHByb3ZpZGVkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuY3Jvc3NEb21haW4gJiYgIWhlYWRlcnNbXCJYLVJlcXVlc3RlZC1XaXRoXCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzW1wiWC1SZXF1ZXN0ZWQtV2l0aFwiXSA9IFwiWE1MSHR0cFJlcXVlc3RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGhlYWRlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpIGluIGhlYWRlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFJ3MgQWN0aXZlWE9iamVjdCB0aHJvd3MgYSAnVHlwZSBNaXNtYXRjaCcgZXhjZXB0aW9uIHdoZW4gc2V0dGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVxdWVzdCBoZWFkZXIgdG8gYSBudWxsLXZhbHVlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvIGtlZXAgY29uc2lzdGVudCB3aXRoIG90aGVyIFhIUiBpbXBsZW1lbnRhdGlvbnMsIGNhc3QgdGhlIHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBzdHJpbmcgYW5kIGlnbm9yZSBgdW5kZWZpbmVkYC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZWFkZXJzW2ldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihpLCBoZWFkZXJzW2ldICsgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvIHNlbmQgdGhlIHJlcXVlc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBtYXkgcmFpc2UgYW4gZXhjZXB0aW9uIHdoaWNoIGlzIGFjdHVhbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZWQgaW4galF1ZXJ5LmFqYXggKHNvIG5vIHRyeS9jYXRjaCBoZXJlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2VuZCgob3B0aW9ucy5oYXNDb250ZW50ICYmIG9wdGlvbnMuZGF0YSkgfHwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMaXN0ZW5lclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uIChfLCBpc0Fib3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdHVzLCBzdGF0dXNUZXh0LCByZXNwb25zZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2FzIG5ldmVyIGNhbGxlZCBhbmQgaXMgYWJvcnRlZCBvciBjb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIChpc0Fib3J0IHx8IHhoci5yZWFkeVN0YXRlID09PSA0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsZWFuIHVwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHhockNhbGxiYWNrc1tpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGpRdWVyeS5ub29wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBYm9ydCBtYW51YWxseSBpZiBuZWVkZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNBYm9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci5hYm9ydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IHhoci5zdGF0dXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTwxMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBY2Nlc3NpbmcgYmluYXJ5LWRhdGEgcmVzcG9uc2VUZXh0IHRocm93cyBhbiBleGNlcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKCMxMTQyNilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB4aHIucmVzcG9uc2VUZXh0ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZXMudGV4dCA9IHhoci5yZXNwb25zZVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggdGhyb3dzIGFuIGV4Y2VwdGlvbiB3aGVuIGFjY2Vzc2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGF0dXNUZXh0IGZvciBmYXVsdHkgY3Jvc3MtZG9tYWluIHJlcXVlc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0geGhyLnN0YXR1c1RleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIG5vcm1hbGl6ZSB3aXRoIFdlYmtpdCBnaXZpbmcgYW4gZW1wdHkgc3RhdHVzVGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbHRlciBzdGF0dXMgZm9yIG5vbiBzdGFuZGFyZCBiZWhhdmlvcnNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXF1ZXN0IGlzIGxvY2FsIGFuZCB3ZSBoYXZlIGRhdGE6IGFzc3VtZSBhIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKHN1Y2Nlc3Mgd2l0aCBubyBkYXRhIHdvbid0IGdldCBub3RpZmllZCwgdGhhdCdzIHRoZSBiZXN0IHdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbiBkbyBnaXZlbiBjdXJyZW50IGltcGxlbWVudGF0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0dXMgJiYgb3B0aW9ucy5pc0xvY2FsICYmICFvcHRpb25zLmNyb3NzRG9tYWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSByZXNwb25zZXMudGV4dCA/IDIwMCA6IDQwNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFIC0gIzE0NTA6IHNvbWV0aW1lcyByZXR1cm5zIDEyMjMgd2hlbiBpdCBzaG91bGQgYmUgMjA0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSAxMjIzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSAyMDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FsbCBjb21wbGV0ZSBpZiBuZWVkZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZShzdGF0dXMsIHN0YXR1c1RleHQsIHJlc3BvbnNlcywgeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5hc3luYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UncmUgaW4gc3luYyBtb2RlIHdlIGZpcmUgdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAoSUU2ICYgSUU3KSBpZiBpdCdzIGluIGNhY2hlIGFuZCBoYXMgYmVlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmV0cmlldmVkIGRpcmVjdGx5IHdlIG5lZWQgdG8gZmlyZSB0aGUgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRvIHRoZSBsaXN0IG9mIGFjdGl2ZSB4aHIgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0geGhyQ2FsbGJhY2tzW2lkXSA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWJvcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh1bmRlZmluZWQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZ1bmN0aW9ucyB0byBjcmVhdGUgeGhyc1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlU3RhbmRhcmRYSFIoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFjdGl2ZVhIUigpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyBJbnN0YWxsIHNjcmlwdCBkYXRhVHlwZVxyXG4gICAgalF1ZXJ5LmFqYXhTZXR1cCh7XHJcbiAgICAgICAgYWNjZXB0czoge1xyXG4gICAgICAgICAgICBzY3JpcHQ6IFwidGV4dC9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9lY21hc2NyaXB0LCBhcHBsaWNhdGlvbi94LWVjbWFzY3JpcHRcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udGVudHM6IHtcclxuICAgICAgICAgICAgc2NyaXB0OiAvKD86amF2YXxlY21hKXNjcmlwdC9cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnZlcnRlcnM6IHtcclxuICAgICAgICAgICAgXCJ0ZXh0IHNjcmlwdFwiOiBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5Lmdsb2JhbEV2YWwodGV4dCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBjYWNoZSdzIHNwZWNpYWwgY2FzZSBhbmQgZ2xvYmFsXHJcbiAgICBqUXVlcnkuYWpheFByZWZpbHRlcihcInNjcmlwdFwiLCBmdW5jdGlvbiAocykge1xyXG4gICAgICAgIGlmIChzLmNhY2hlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcy5jYWNoZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocy5jcm9zc0RvbWFpbikge1xyXG4gICAgICAgICAgICBzLnR5cGUgPSBcIkdFVFwiO1xyXG4gICAgICAgICAgICBzLmdsb2JhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEJpbmQgc2NyaXB0IHRhZyBoYWNrIHRyYW5zcG9ydFxyXG4gICAgalF1ZXJ5LmFqYXhUcmFuc3BvcnQoXCJzY3JpcHRcIiwgZnVuY3Rpb24gKHMpIHtcclxuXHJcbiAgICAgICAgLy8gVGhpcyB0cmFuc3BvcnQgb25seSBkZWFscyB3aXRoIGNyb3NzIGRvbWFpbiByZXF1ZXN0c1xyXG4gICAgICAgIGlmIChzLmNyb3NzRG9tYWluKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2NyaXB0LFxyXG4gICAgICAgICAgICAgICAgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgalF1ZXJ5KFwiaGVhZFwiKVswXSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbmQ6IGZ1bmN0aW9uIChfLCBjYWxsYmFjaykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocy5zY3JpcHRDaGFyc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdC5jaGFyc2V0ID0gcy5zY3JpcHRDaGFyc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0LnNyYyA9IHMudXJsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBdHRhY2ggaGFuZGxlcnMgZm9yIGFsbCBicm93c2Vyc1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKF8sIGlzQWJvcnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Fib3J0IHx8ICFzY3JpcHQucmVhZHlTdGF0ZSB8fCAvbG9hZGVkfGNvbXBsZXRlLy50ZXN0KHNjcmlwdC5yZWFkeVN0YXRlKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBtZW1vcnkgbGVhayBpbiBJRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgc2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NyaXB0LnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlcmVmZXJlbmNlIHRoZSBzY3JpcHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FsbGJhY2sgaWYgbm90IGFib3J0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzQWJvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygyMDAsIFwic3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENpcmN1bXZlbnQgSUU2IGJ1Z3Mgd2l0aCBiYXNlIGVsZW1lbnRzICgjMjcwOSBhbmQgIzQzNzgpIGJ5IHByZXBlbmRpbmdcclxuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgbmF0aXZlIERPTSBtYW5pcHVsYXRpb24gdG8gYXZvaWQgb3VyIGRvbU1hbmlwIEFKQVggdHJpY2tlcnlcclxuICAgICAgICAgICAgICAgICAgICBoZWFkLmluc2VydEJlZm9yZShzY3JpcHQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGFib3J0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcmlwdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQub25sb2FkKHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgIHZhciBvbGRDYWxsYmFja3MgPSBbXSxcclxuICAgICAgICByanNvbnAgPSAvKD0pXFw/KD89JnwkKXxcXD9cXD8vO1xyXG5cclxuICAgIC8vIERlZmF1bHQganNvbnAgc2V0dGluZ3NcclxuICAgIGpRdWVyeS5hamF4U2V0dXAoe1xyXG4gICAgICAgIGpzb25wOiBcImNhbGxiYWNrXCIsXHJcbiAgICAgICAganNvbnBDYWxsYmFjazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBvbGRDYWxsYmFja3MucG9wKCkgfHwgKGpRdWVyeS5leHBhbmRvICsgXCJfXCIgKyAobm9uY2UrKykpO1xyXG4gICAgICAgICAgICB0aGlzW2NhbGxiYWNrXSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBEZXRlY3QsIG5vcm1hbGl6ZSBvcHRpb25zIGFuZCBpbnN0YWxsIGNhbGxiYWNrcyBmb3IganNvbnAgcmVxdWVzdHNcclxuICAgIGpRdWVyeS5hamF4UHJlZmlsdGVyKFwianNvbiBqc29ucFwiLCBmdW5jdGlvbiAocywgb3JpZ2luYWxTZXR0aW5ncywganFYSFIpIHtcclxuXHJcbiAgICAgICAgdmFyIGNhbGxiYWNrTmFtZSwgb3ZlcndyaXR0ZW4sIHJlc3BvbnNlQ29udGFpbmVyLFxyXG4gICAgICAgICAgICBqc29uUHJvcCA9IHMuanNvbnAgIT09IGZhbHNlICYmIChyanNvbnAudGVzdChzLnVybCkgP1xyXG4gICAgICAgICAgICAgICAgXCJ1cmxcIiA6XHJcbiAgICAgICAgICAgICAgICB0eXBlb2Ygcy5kYXRhID09PSBcInN0cmluZ1wiICYmICEocy5jb250ZW50VHlwZSB8fCBcIlwiKS5pbmRleE9mKFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpICYmIHJqc29ucC50ZXN0KHMuZGF0YSkgJiYgXCJkYXRhXCJcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIGlmZiB0aGUgZXhwZWN0ZWQgZGF0YSB0eXBlIGlzIFwianNvbnBcIiBvciB3ZSBoYXZlIGEgcGFyYW1ldGVyIHRvIHNldFxyXG4gICAgICAgIGlmIChqc29uUHJvcCB8fCBzLmRhdGFUeXBlc1swXSA9PT0gXCJqc29ucFwiKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgY2FsbGJhY2sgbmFtZSwgcmVtZW1iZXJpbmcgcHJlZXhpc3RpbmcgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGl0XHJcbiAgICAgICAgICAgIGNhbGxiYWNrTmFtZSA9IHMuanNvbnBDYWxsYmFjayA9IGpRdWVyeS5pc0Z1bmN0aW9uKHMuanNvbnBDYWxsYmFjaykgP1xyXG4gICAgICAgICAgICAgICAgcy5qc29ucENhbGxiYWNrKCkgOlxyXG4gICAgICAgICAgICAgICAgcy5qc29ucENhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5zZXJ0IGNhbGxiYWNrIGludG8gdXJsIG9yIGZvcm0gZGF0YVxyXG4gICAgICAgICAgICBpZiAoanNvblByb3ApIHtcclxuICAgICAgICAgICAgICAgIHNbanNvblByb3BdID0gc1tqc29uUHJvcF0ucmVwbGFjZShyanNvbnAsIFwiJDFcIiArIGNhbGxiYWNrTmFtZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocy5qc29ucCAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHMudXJsICs9IChycXVlcnkudGVzdChzLnVybCkgPyBcIiZcIiA6IFwiP1wiKSArIHMuanNvbnAgKyBcIj1cIiArIGNhbGxiYWNrTmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVXNlIGRhdGEgY29udmVydGVyIHRvIHJldHJpZXZlIGpzb24gYWZ0ZXIgc2NyaXB0IGV4ZWN1dGlvblxyXG4gICAgICAgICAgICBzLmNvbnZlcnRlcnNbXCJzY3JpcHQganNvblwiXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2VDb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXJyb3IoY2FsbGJhY2tOYW1lICsgXCIgd2FzIG5vdCBjYWxsZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VDb250YWluZXJbMF07XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBmb3JjZSBqc29uIGRhdGFUeXBlXHJcbiAgICAgICAgICAgIHMuZGF0YVR5cGVzWzBdID0gXCJqc29uXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBJbnN0YWxsIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIG92ZXJ3cml0dGVuID0gd2luZG93W2NhbGxiYWNrTmFtZV07XHJcbiAgICAgICAgICAgIHdpbmRvd1tjYWxsYmFja05hbWVdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VDb250YWluZXIgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBDbGVhbi11cCBmdW5jdGlvbiAoZmlyZXMgYWZ0ZXIgY29udmVydGVycylcclxuICAgICAgICAgICAganFYSFIuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgcHJlZXhpc3RpbmcgdmFsdWVcclxuICAgICAgICAgICAgICAgIHdpbmRvd1tjYWxsYmFja05hbWVdID0gb3ZlcndyaXR0ZW47XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2F2ZSBiYWNrIGFzIGZyZWVcclxuICAgICAgICAgICAgICAgIGlmIChzW2NhbGxiYWNrTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCByZS11c2luZyB0aGUgb3B0aW9ucyBkb2Vzbid0IHNjcmV3IHRoaW5ncyBhcm91bmRcclxuICAgICAgICAgICAgICAgICAgICBzLmpzb25wQ2FsbGJhY2sgPSBvcmlnaW5hbFNldHRpbmdzLmpzb25wQ2FsbGJhY2s7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhdmUgdGhlIGNhbGxiYWNrIG5hbWUgZm9yIGZ1dHVyZSB1c2VcclxuICAgICAgICAgICAgICAgICAgICBvbGRDYWxsYmFja3MucHVzaChjYWxsYmFja05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENhbGwgaWYgaXQgd2FzIGEgZnVuY3Rpb24gYW5kIHdlIGhhdmUgYSByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlQ29udGFpbmVyICYmIGpRdWVyeS5pc0Z1bmN0aW9uKG92ZXJ3cml0dGVuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJ3cml0dGVuKHJlc3BvbnNlQ29udGFpbmVyWzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZUNvbnRhaW5lciA9IG92ZXJ3cml0dGVuID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIERlbGVnYXRlIHRvIHNjcmlwdFxyXG4gICAgICAgICAgICByZXR1cm4gXCJzY3JpcHRcIjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyBkYXRhOiBzdHJpbmcgb2YgaHRtbFxyXG4gICAgLy8gY29udGV4dCAob3B0aW9uYWwpOiBJZiBzcGVjaWZpZWQsIHRoZSBmcmFnbWVudCB3aWxsIGJlIGNyZWF0ZWQgaW4gdGhpcyBjb250ZXh0LCBkZWZhdWx0cyB0byBkb2N1bWVudFxyXG4gICAgLy8ga2VlcFNjcmlwdHMgKG9wdGlvbmFsKTogSWYgdHJ1ZSwgd2lsbCBpbmNsdWRlIHNjcmlwdHMgcGFzc2VkIGluIHRoZSBodG1sIHN0cmluZ1xyXG4gICAgalF1ZXJ5LnBhcnNlSFRNTCA9IGZ1bmN0aW9uIChkYXRhLCBjb250ZXh0LCBrZWVwU2NyaXB0cykge1xyXG4gICAgICAgIGlmICghZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZXh0ID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgICAgICBrZWVwU2NyaXB0cyA9IGNvbnRleHQ7XHJcbiAgICAgICAgICAgIGNvbnRleHQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcblxyXG4gICAgICAgIHZhciBwYXJzZWQgPSByc2luZ2xlVGFnLmV4ZWMoZGF0YSksXHJcbiAgICAgICAgICAgIHNjcmlwdHMgPSAha2VlcFNjcmlwdHMgJiYgW107XHJcblxyXG4gICAgICAgIC8vIFNpbmdsZSB0YWdcclxuICAgICAgICBpZiAocGFyc2VkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbY29udGV4dC5jcmVhdGVFbGVtZW50KHBhcnNlZFsxXSldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGFyc2VkID0galF1ZXJ5LmJ1aWxkRnJhZ21lbnQoW2RhdGFdLCBjb250ZXh0LCBzY3JpcHRzKTtcclxuXHJcbiAgICAgICAgaWYgKHNjcmlwdHMgJiYgc2NyaXB0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgalF1ZXJ5KHNjcmlwdHMpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGpRdWVyeS5tZXJnZShbXSwgcGFyc2VkLmNoaWxkTm9kZXMpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy8gS2VlcCBhIGNvcHkgb2YgdGhlIG9sZCBsb2FkIG1ldGhvZFxyXG4gICAgdmFyIF9sb2FkID0galF1ZXJ5LmZuLmxvYWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGEgdXJsIGludG8gYSBwYWdlXHJcbiAgICAgKi9cclxuICAgIGpRdWVyeS5mbi5sb2FkID0gZnVuY3Rpb24gKHVybCwgcGFyYW1zLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdXJsICE9PSBcInN0cmluZ1wiICYmIF9sb2FkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfbG9hZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHNlbGVjdG9yLCByZXNwb25zZSwgdHlwZSxcclxuICAgICAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIG9mZiA9IHVybC5pbmRleE9mKFwiIFwiKTtcclxuXHJcbiAgICAgICAgaWYgKG9mZiA+PSAwKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yID0gdXJsLnNsaWNlKG9mZiwgdXJsLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5zbGljZSgwLCBvZmYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgaXQncyBhIGZ1bmN0aW9uXHJcbiAgICAgICAgaWYgKGpRdWVyeS5pc0Z1bmN0aW9uKHBhcmFtcykpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFdlIGFzc3VtZSB0aGF0IGl0J3MgdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gcGFyYW1zO1xyXG4gICAgICAgICAgICBwYXJhbXMgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIGJ1aWxkIGEgcGFyYW0gc3RyaW5nXHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMgJiYgdHlwZW9mIHBhcmFtcyA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICB0eXBlID0gXCJQT1NUXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiB3ZSBoYXZlIGVsZW1lbnRzIHRvIG1vZGlmeSwgbWFrZSB0aGUgcmVxdWVzdFxyXG4gICAgICAgIGlmIChzZWxmLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgalF1ZXJ5LmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgXCJ0eXBlXCIgdmFyaWFibGUgaXMgdW5kZWZpbmVkLCB0aGVuIFwiR0VUXCIgbWV0aG9kIHdpbGwgYmUgdXNlZFxyXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImh0bWxcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXNwb25zZVRleHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTYXZlIHJlc3BvbnNlIGZvciB1c2UgaW4gY29tcGxldGUgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYXJndW1lbnRzO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuaHRtbChzZWxlY3RvciA/XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGEgc2VsZWN0b3Igd2FzIHNwZWNpZmllZCwgbG9jYXRlIHRoZSByaWdodCBlbGVtZW50cyBpbiBhIGR1bW15IGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEV4Y2x1ZGUgc2NyaXB0cyB0byBhdm9pZCBJRSAnUGVybWlzc2lvbiBEZW5pZWQnIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeShcIjxkaXY+XCIpLmFwcGVuZChqUXVlcnkucGFyc2VIVE1MKHJlc3BvbnNlVGV4dCkpLmZpbmQoc2VsZWN0b3IpIDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHVzZSB0aGUgZnVsbCByZXN1bHRcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICAgICAgfSkuY29tcGxldGUoY2FsbGJhY2sgJiYgZnVuY3Rpb24gKGpxWEhSLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZWFjaChjYWxsYmFjaywgcmVzcG9uc2UgfHwgW2pxWEhSLnJlc3BvbnNlVGV4dCwgc3RhdHVzLCBqcVhIUl0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuXHJcbiAgICBqUXVlcnkuZXhwci5maWx0ZXJzLmFuaW1hdGVkID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICByZXR1cm4galF1ZXJ5LmdyZXAoalF1ZXJ5LnRpbWVycywgZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtID09PSBmbi5lbGVtO1xyXG4gICAgICAgIH0pLmxlbmd0aDtcclxuICAgIH07XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIHZhciBkb2NFbGVtID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSB3aW5kb3cgZnJvbSBhbiBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldFdpbmRvdyhlbGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGpRdWVyeS5pc1dpbmRvdyhlbGVtKSA/XHJcbiAgICAgICAgICAgIGVsZW0gOlxyXG4gICAgICAgICAgICBlbGVtLm5vZGVUeXBlID09PSA5ID9cclxuICAgICAgICAgICAgZWxlbS5kZWZhdWx0VmlldyB8fCBlbGVtLnBhcmVudFdpbmRvdyA6XHJcbiAgICAgICAgICAgIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeS5vZmZzZXQgPSB7XHJcbiAgICAgICAgc2V0T2Zmc2V0OiBmdW5jdGlvbiAoZWxlbSwgb3B0aW9ucywgaSkge1xyXG4gICAgICAgICAgICB2YXIgY3VyUG9zaXRpb24sIGN1ckxlZnQsIGN1ckNTU1RvcCwgY3VyVG9wLCBjdXJPZmZzZXQsIGN1ckNTU0xlZnQsIGNhbGN1bGF0ZVBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBqUXVlcnkuY3NzKGVsZW0sIFwicG9zaXRpb25cIiksXHJcbiAgICAgICAgICAgICAgICBjdXJFbGVtID0galF1ZXJ5KGVsZW0pLFxyXG4gICAgICAgICAgICAgICAgcHJvcHMgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBwb3NpdGlvbiBmaXJzdCwgaW4tY2FzZSB0b3AvbGVmdCBhcmUgc2V0IGV2ZW4gb24gc3RhdGljIGVsZW1cclxuICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09PSBcInN0YXRpY1wiKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjdXJPZmZzZXQgPSBjdXJFbGVtLm9mZnNldCgpO1xyXG4gICAgICAgICAgICBjdXJDU1NUb3AgPSBqUXVlcnkuY3NzKGVsZW0sIFwidG9wXCIpO1xyXG4gICAgICAgICAgICBjdXJDU1NMZWZ0ID0galF1ZXJ5LmNzcyhlbGVtLCBcImxlZnRcIik7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZVBvc2l0aW9uID0gKHBvc2l0aW9uID09PSBcImFic29sdXRlXCIgfHwgcG9zaXRpb24gPT09IFwiZml4ZWRcIikgJiZcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5pbkFycmF5KFwiYXV0b1wiLCBbY3VyQ1NTVG9wLCBjdXJDU1NMZWZ0XSkgPiAtMTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gYmUgYWJsZSB0byBjYWxjdWxhdGUgcG9zaXRpb24gaWYgZWl0aGVyIHRvcCBvciBsZWZ0IGlzIGF1dG8gYW5kIHBvc2l0aW9uIGlzIGVpdGhlciBhYnNvbHV0ZSBvciBmaXhlZFxyXG4gICAgICAgICAgICBpZiAoY2FsY3VsYXRlUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGN1clBvc2l0aW9uID0gY3VyRWxlbS5wb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY3VyVG9wID0gY3VyUG9zaXRpb24udG9wO1xyXG4gICAgICAgICAgICAgICAgY3VyTGVmdCA9IGN1clBvc2l0aW9uLmxlZnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJUb3AgPSBwYXJzZUZsb2F0KGN1ckNTU1RvcCkgfHwgMDtcclxuICAgICAgICAgICAgICAgIGN1ckxlZnQgPSBwYXJzZUZsb2F0KGN1ckNTU0xlZnQpIHx8IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChqUXVlcnkuaXNGdW5jdGlvbihvcHRpb25zKSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMuY2FsbChlbGVtLCBpLCBjdXJPZmZzZXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy50b3AgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcHJvcHMudG9wID0gKG9wdGlvbnMudG9wIC0gY3VyT2Zmc2V0LnRvcCkgKyBjdXJUb3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubGVmdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wcy5sZWZ0ID0gKG9wdGlvbnMubGVmdCAtIGN1ck9mZnNldC5sZWZ0KSArIGN1ckxlZnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChcInVzaW5nXCIgaW4gb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy51c2luZy5jYWxsKGVsZW0sIHByb3BzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ckVsZW0uY3NzKHByb3BzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgb2Zmc2V0OiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5vZmZzZXQuc2V0T2Zmc2V0KHRoaXMsIG9wdGlvbnMsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZG9jRWxlbSwgd2luLFxyXG4gICAgICAgICAgICAgICAgYm94ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZWxlbSA9IHRoaXNbMF0sXHJcbiAgICAgICAgICAgICAgICBkb2MgPSBlbGVtICYmIGVsZW0ub3duZXJEb2N1bWVudDtcclxuXHJcbiAgICAgICAgICAgIGlmICghZG9jKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIGl0J3Mgbm90IGEgZGlzY29ubmVjdGVkIERPTSBub2RlXHJcbiAgICAgICAgICAgIGlmICghalF1ZXJ5LmNvbnRhaW5zKGRvY0VsZW0sIGVsZW0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYm94O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGdCQ1IsIGp1c3QgdXNlIDAsMCByYXRoZXIgdGhhbiBlcnJvclxyXG4gICAgICAgICAgICAvLyBCbGFja0JlcnJ5IDUsIGlPUyAzIChvcmlnaW5hbCBpUGhvbmUpXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgIT09IHN0cnVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aW4gPSBnZXRXaW5kb3coZG9jKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRvcDogYm94LnRvcCArICh3aW4ucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3ApIC0gKGRvY0VsZW0uY2xpZW50VG9wIHx8IDApLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogYm94LmxlZnQgKyAod2luLnBhZ2VYT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsTGVmdCkgLSAoZG9jRWxlbS5jbGllbnRMZWZ0IHx8IDApXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcG9zaXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBvZmZzZXRQYXJlbnQsIG9mZnNldCxcclxuICAgICAgICAgICAgICAgIHBhcmVudE9mZnNldCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVsZW0gPSB0aGlzWzBdO1xyXG5cclxuICAgICAgICAgICAgLy8gZml4ZWQgZWxlbWVudHMgYXJlIG9mZnNldCBmcm9tIHdpbmRvdyAocGFyZW50T2Zmc2V0ID0ge3RvcDowLCBsZWZ0OiAwfSwgYmVjYXVzZSBpdCBpcyBpdHMgb25seSBvZmZzZXQgcGFyZW50XHJcbiAgICAgICAgICAgIGlmIChqUXVlcnkuY3NzKGVsZW0sIFwicG9zaXRpb25cIikgPT09IFwiZml4ZWRcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gd2UgYXNzdW1lIHRoYXQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlzIGF2YWlsYWJsZSB3aGVuIGNvbXB1dGVkIHBvc2l0aW9uIGlzIGZpeGVkXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0ICpyZWFsKiBvZmZzZXRQYXJlbnRcclxuICAgICAgICAgICAgICAgIG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGNvcnJlY3Qgb2Zmc2V0c1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5vZmZzZXQoKTtcclxuICAgICAgICAgICAgICAgIGlmICghalF1ZXJ5Lm5vZGVOYW1lKG9mZnNldFBhcmVudFswXSwgXCJodG1sXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50T2Zmc2V0ID0gb2Zmc2V0UGFyZW50Lm9mZnNldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCBvZmZzZXRQYXJlbnQgYm9yZGVyc1xyXG4gICAgICAgICAgICAgICAgcGFyZW50T2Zmc2V0LnRvcCArPSBqUXVlcnkuY3NzKG9mZnNldFBhcmVudFswXSwgXCJib3JkZXJUb3BXaWR0aFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHBhcmVudE9mZnNldC5sZWZ0ICs9IGpRdWVyeS5jc3Mob2Zmc2V0UGFyZW50WzBdLCBcImJvcmRlckxlZnRXaWR0aFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VidHJhY3QgcGFyZW50IG9mZnNldHMgYW5kIGVsZW1lbnQgbWFyZ2luc1xyXG4gICAgICAgICAgICAvLyBub3RlOiB3aGVuIGFuIGVsZW1lbnQgaGFzIG1hcmdpbjogYXV0byB0aGUgb2Zmc2V0TGVmdCBhbmQgbWFyZ2luTGVmdFxyXG4gICAgICAgICAgICAvLyBhcmUgdGhlIHNhbWUgaW4gU2FmYXJpIGNhdXNpbmcgb2Zmc2V0LmxlZnQgdG8gaW5jb3JyZWN0bHkgYmUgMFxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdG9wOiBvZmZzZXQudG9wIC0gcGFyZW50T2Zmc2V0LnRvcCAtIGpRdWVyeS5jc3MoZWxlbSwgXCJtYXJnaW5Ub3BcIiwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBvZmZzZXQubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0IC0galF1ZXJ5LmNzcyhlbGVtLCBcIm1hcmdpbkxlZnRcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudCB8fCBkb2NFbGVtO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChvZmZzZXRQYXJlbnQgJiYgKCFqUXVlcnkubm9kZU5hbWUob2Zmc2V0UGFyZW50LCBcImh0bWxcIikgJiYgalF1ZXJ5LmNzcyhvZmZzZXRQYXJlbnQsIFwicG9zaXRpb25cIikgPT09IFwic3RhdGljXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZG9jRWxlbTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHNjcm9sbExlZnQgYW5kIHNjcm9sbFRvcCBtZXRob2RzXHJcbiAgICBqUXVlcnkuZWFjaCh7XHJcbiAgICAgICAgc2Nyb2xsTGVmdDogXCJwYWdlWE9mZnNldFwiLFxyXG4gICAgICAgIHNjcm9sbFRvcDogXCJwYWdlWU9mZnNldFwiXHJcbiAgICB9LCBmdW5jdGlvbiAobWV0aG9kLCBwcm9wKSB7XHJcbiAgICAgICAgdmFyIHRvcCA9IC9ZLy50ZXN0KHByb3ApO1xyXG5cclxuICAgICAgICBqUXVlcnkuZm5bbWV0aG9kXSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzcyh0aGlzLCBmdW5jdGlvbiAoZWxlbSwgbWV0aG9kLCB2YWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciB3aW4gPSBnZXRXaW5kb3coZWxlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbiA/IChwcm9wIGluIHdpbikgPyB3aW5bcHJvcF0gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW4uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50W21ldGhvZF0gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtW21ldGhvZF07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbi5zY3JvbGxUbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgIXRvcCA/IHZhbCA6IGpRdWVyeSh3aW4pLnNjcm9sbExlZnQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID8gdmFsIDogalF1ZXJ5KHdpbikuc2Nyb2xsVG9wKClcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbVttZXRob2RdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBtZXRob2QsIHZhbCwgYXJndW1lbnRzLmxlbmd0aCwgbnVsbCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgdG9wL2xlZnQgY3NzSG9va3MgdXNpbmcgalF1ZXJ5LmZuLnBvc2l0aW9uXHJcbiAgICAvLyBXZWJraXQgYnVnOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjkwODRcclxuICAgIC8vIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBwZXJjZW50IHdoZW4gc3BlY2lmaWVkIGZvciB0b3AvbGVmdC9ib3R0b20vcmlnaHRcclxuICAgIC8vIHJhdGhlciB0aGFuIG1ha2UgdGhlIGNzcyBtb2R1bGUgZGVwZW5kIG9uIHRoZSBvZmZzZXQgbW9kdWxlLCB3ZSBqdXN0IGNoZWNrIGZvciBpdCBoZXJlXHJcbiAgICBqUXVlcnkuZWFjaChbXCJ0b3BcIiwgXCJsZWZ0XCJdLCBmdW5jdGlvbiAoaSwgcHJvcCkge1xyXG4gICAgICAgIGpRdWVyeS5jc3NIb29rc1twcm9wXSA9IGFkZEdldEhvb2tJZihzdXBwb3J0LnBpeGVsUG9zaXRpb24sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlbGVtLCBjb21wdXRlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXB1dGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcHV0ZWQgPSBjdXJDU1MoZWxlbSwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgY3VyQ1NTIHJldHVybnMgcGVyY2VudGFnZSwgZmFsbGJhY2sgdG8gb2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJudW1ub25weC50ZXN0KGNvbXB1dGVkKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeShlbGVtKS5wb3NpdGlvbigpW3Byb3BdICsgXCJweFwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIENyZWF0ZSBpbm5lckhlaWdodCwgaW5uZXJXaWR0aCwgaGVpZ2h0LCB3aWR0aCwgb3V0ZXJIZWlnaHQgYW5kIG91dGVyV2lkdGggbWV0aG9kc1xyXG4gICAgalF1ZXJ5LmVhY2goe1xyXG4gICAgICAgIEhlaWdodDogXCJoZWlnaHRcIixcclxuICAgICAgICBXaWR0aDogXCJ3aWR0aFwiXHJcbiAgICB9LCBmdW5jdGlvbiAobmFtZSwgdHlwZSkge1xyXG4gICAgICAgIGpRdWVyeS5lYWNoKHtcclxuICAgICAgICAgICAgcGFkZGluZzogXCJpbm5lclwiICsgbmFtZSxcclxuICAgICAgICAgICAgY29udGVudDogdHlwZSxcclxuICAgICAgICAgICAgXCJcIjogXCJvdXRlclwiICsgbmFtZVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChkZWZhdWx0RXh0cmEsIGZ1bmNOYW1lKSB7XHJcbiAgICAgICAgICAgIC8vIG1hcmdpbiBpcyBvbmx5IGZvciBvdXRlckhlaWdodCwgb3V0ZXJXaWR0aFxyXG4gICAgICAgICAgICBqUXVlcnkuZm5bZnVuY05hbWVdID0gZnVuY3Rpb24gKG1hcmdpbiwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGFpbmFibGUgPSBhcmd1bWVudHMubGVuZ3RoICYmIChkZWZhdWx0RXh0cmEgfHwgdHlwZW9mIG1hcmdpbiAhPT0gXCJib29sZWFuXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhID0gZGVmYXVsdEV4dHJhIHx8IChtYXJnaW4gPT09IHRydWUgfHwgdmFsdWUgPT09IHRydWUgPyBcIm1hcmdpblwiIDogXCJib3JkZXJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY2Vzcyh0aGlzLCBmdW5jdGlvbiAoZWxlbSwgdHlwZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG9jO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoalF1ZXJ5LmlzV2luZG93KGVsZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzIG9mIDUvOC8yMDEyIHRoaXMgd2lsbCB5aWVsZCBpbmNvcnJlY3QgcmVzdWx0cyBmb3IgTW9iaWxlIFNhZmFyaSwgYnV0IHRoZXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlzbid0IGEgd2hvbGUgbG90IHdlIGNhbiBkby4gU2VlIHB1bGwgcmVxdWVzdCBhdCB0aGlzIFVSTCBmb3IgZGlzY3Vzc2lvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvcHVsbC83NjRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50W1wiY2xpZW50XCIgKyBuYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBkb2N1bWVudCB3aWR0aCBvciBoZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbS5ub2RlVHlwZSA9PT0gOSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2MgPSBlbGVtLmRvY3VtZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVpdGhlciBzY3JvbGxbV2lkdGgvSGVpZ2h0XSBvciBvZmZzZXRbV2lkdGgvSGVpZ2h0XSBvciBjbGllbnRbV2lkdGgvSGVpZ2h0XSwgd2hpY2hldmVyIGlzIGdyZWF0ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVuZm9ydHVuYXRlbHksIHRoaXMgY2F1c2VzIGJ1ZyAjMzgzOCBpbiBJRTYvOCBvbmx5LCBidXQgdGhlcmUgaXMgY3VycmVudGx5IG5vIGdvb2QsIHNtYWxsIHdheSB0byBmaXggaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYm9keVtcInNjcm9sbFwiICsgbmFtZV0sIGRvY1tcInNjcm9sbFwiICsgbmFtZV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmJvZHlbXCJvZmZzZXRcIiArIG5hbWVdLCBkb2NbXCJvZmZzZXRcIiArIG5hbWVdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jW1wiY2xpZW50XCIgKyBuYW1lXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgd2lkdGggb3IgaGVpZ2h0IG9uIHRoZSBlbGVtZW50LCByZXF1ZXN0aW5nIGJ1dCBub3QgZm9yY2luZyBwYXJzZUZsb2F0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5jc3MoZWxlbSwgdHlwZSwgZXh0cmEpIDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LnN0eWxlKGVsZW0sIHR5cGUsIHZhbHVlLCBleHRyYSk7XHJcbiAgICAgICAgICAgICAgICB9LCB0eXBlLCBjaGFpbmFibGUgPyBtYXJnaW4gOiB1bmRlZmluZWQsIGNoYWluYWJsZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8gVGhlIG51bWJlciBvZiBlbGVtZW50cyBjb250YWluZWQgaW4gdGhlIG1hdGNoZWQgZWxlbWVudCBzZXRcclxuICAgIGpRdWVyeS5mbi5zaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aDtcclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmZuLmFuZFNlbGYgPSBqUXVlcnkuZm4uYWRkQmFjaztcclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyBSZWdpc3RlciBhcyBhIG5hbWVkIEFNRCBtb2R1bGUsIHNpbmNlIGpRdWVyeSBjYW4gYmUgY29uY2F0ZW5hdGVkIHdpdGggb3RoZXJcclxuICAgIC8vIGZpbGVzIHRoYXQgbWF5IHVzZSBkZWZpbmUsIGJ1dCBub3QgdmlhIGEgcHJvcGVyIGNvbmNhdGVuYXRpb24gc2NyaXB0IHRoYXRcclxuICAgIC8vIHVuZGVyc3RhbmRzIGFub255bW91cyBBTUQgbW9kdWxlcy4gQSBuYW1lZCBBTUQgaXMgc2FmZXN0IGFuZCBtb3N0IHJvYnVzdFxyXG4gICAgLy8gd2F5IHRvIHJlZ2lzdGVyLiBMb3dlcmNhc2UganF1ZXJ5IGlzIHVzZWQgYmVjYXVzZSBBTUQgbW9kdWxlIG5hbWVzIGFyZVxyXG4gICAgLy8gZGVyaXZlZCBmcm9tIGZpbGUgbmFtZXMsIGFuZCBqUXVlcnkgaXMgbm9ybWFsbHkgZGVsaXZlcmVkIGluIGEgbG93ZXJjYXNlXHJcbiAgICAvLyBmaWxlIG5hbWUuIERvIHRoaXMgYWZ0ZXIgY3JlYXRpbmcgdGhlIGdsb2JhbCBzbyB0aGF0IGlmIGFuIEFNRCBtb2R1bGUgd2FudHNcclxuICAgIC8vIHRvIGNhbGwgbm9Db25mbGljdCB0byBoaWRlIHRoaXMgdmVyc2lvbiBvZiBqUXVlcnksIGl0IHdpbGwgd29yay5cclxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgICAgIGRlZmluZShcImpxdWVyeVwiLCBbXSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIHZhclxyXG4gICAgICAgIC8vIE1hcCBvdmVyIGpRdWVyeSBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxyXG4gICAgICAgIF9qUXVlcnkgPSB3aW5kb3cualF1ZXJ5LFxyXG5cclxuICAgICAgICAvLyBNYXAgb3ZlciB0aGUgJCBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxyXG4gICAgICAgIF8kID0gd2luZG93LiQ7XHJcblxyXG4gICAgalF1ZXJ5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoZGVlcCkge1xyXG4gICAgICAgIGlmICh3aW5kb3cuJCA9PT0galF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy4kID0gXyQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGVlcCAmJiB3aW5kb3cualF1ZXJ5ID09PSBqUXVlcnkpIHtcclxuICAgICAgICAgICAgd2luZG93LmpRdWVyeSA9IF9qUXVlcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4galF1ZXJ5O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBFeHBvc2UgalF1ZXJ5IGFuZCAkIGlkZW50aWZpZXJzLCBldmVuIGluXHJcbiAgICAvLyBBTUQgKCM3MTAyI2NvbW1lbnQ6MTAsIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L3B1bGwvNTU3KVxyXG4gICAgLy8gYW5kIENvbW1vbkpTIGZvciBicm93c2VyIGVtdWxhdG9ycyAoIzEzNTY2KVxyXG4gICAgaWYgKHR5cGVvZiBub0dsb2JhbCA9PT0gc3RydW5kZWZpbmVkKSB7XHJcbiAgICAgICAgd2luZG93LmpRdWVyeSA9IHdpbmRvdy4kID0galF1ZXJ5O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIHJldHVybiBqUXVlcnk7XHJcblxyXG59KSk7Il0sImZpbGUiOiJqcXVlcnktMS4xMS4wLmpzIn0=
