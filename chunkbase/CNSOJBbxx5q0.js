(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019d8a7d-c9c6-7870-8693-7042db7e52ee";
    }
  } catch (e) {}
})();
function V(p, T) {
  for (var v = 0; v < T.length; v++) {
    const l = T[v];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const _ in l) {
        if (_ !== "default" && !(_ in p)) {
          const R = Object.getOwnPropertyDescriptor(l, _);
          if (R) {
            Object.defineProperty(p, _, R.get ? R : {
              enumerable: true,
              get: () => l[_]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(p, Symbol.toStringTag, {
    value: "Module"
  }));
}
function F(p) {
  if (p && p.__esModule && Object.prototype.hasOwnProperty.call(p, "default")) {
    return p.default;
  } else {
    return p;
  }
}
var h = {
  exports: {}
};
var r = {};
var k;
function tt() {
  if (k) {
    return r;
  }
  k = 1;
  var p = Symbol.for("react.transitional.element");
  var T = Symbol.for("react.portal");
  var v = Symbol.for("react.fragment");
  var l = Symbol.for("react.strict_mode");
  var _ = Symbol.for("react.profiler");
  var R = Symbol.for("react.consumer");
  var U = Symbol.for("react.context");
  var D = Symbol.for("react.forward_ref");
  var q = Symbol.for("react.suspense");
  var z = Symbol.for("react.memo");
  var w = Symbol.for("react.lazy");
  var G = Symbol.for("react.activity");
  var j = Symbol.iterator;
  function K(t) {
    if (t === null || typeof t != "object") {
      return null;
    } else {
      t = j && t[j] || t["@@iterator"];
      if (typeof t == "function") {
        return t;
      } else {
        return null;
      }
    }
  }
  var P = {
    isMounted: function () {
      return false;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  };
  var H = Object.assign;
  var $ = {};
  function y(t, e, u) {
    this.props = t;
    this.context = e;
    this.refs = $;
    this.updater = u || P;
  }
  y.prototype.isReactComponent = {};
  y.prototype.setState = function (t, e) {
    if (typeof t != "object" && typeof t != "function" && t != null) {
      throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    }
    this.updater.enqueueSetState(this, t, e, "setState");
  };
  y.prototype.forceUpdate = function (t) {
    this.updater.enqueueForceUpdate(this, t, "forceUpdate");
  };
  function N() {}
  N.prototype = y.prototype;
  function C(t, e, u) {
    this.props = t;
    this.context = e;
    this.refs = $;
    this.updater = u || P;
  }
  var d = C.prototype = new N();
  d.constructor = C;
  H(d, y.prototype);
  d.isPureReactComponent = true;
  var M = Array.isArray;
  function g() {}
  var f = {
    H: null,
    A: null,
    T: null,
    S: null
  };
  var Y = Object.prototype.hasOwnProperty;
  function A(t, e, u) {
    var n = u.ref;
    return {
      $$typeof: p,
      type: t,
      key: e,
      ref: n !== undefined ? n : null,
      props: u
    };
  }
  function B(t, e) {
    return A(t.type, e, t.props);
  }
  function S(t) {
    return typeof t == "object" && t !== null && t.$$typeof === p;
  }
  function W(t) {
    var e = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + t.replace(/[=:]/g, function (u) {
      return e[u];
    });
  }
  var b = /\/+/g;
  function O(t, e) {
    if (typeof t == "object" && t !== null && t.key != null) {
      return W("" + t.key);
    } else {
      return e.toString(36);
    }
  }
  function Q(t) {
    switch (t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw t.reason;
      default:
        if (typeof t.status == "string") {
          t.then(g, g);
        } else {
          t.status = "pending";
          t.then(function (e) {
            if (t.status === "pending") {
              t.status = "fulfilled";
              t.value = e;
            }
          }, function (e) {
            if (t.status === "pending") {
              t.status = "rejected";
              t.reason = e;
            }
          });
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw t.reason;
        }
    }
    throw t;
  }
  function E(t, e, u, n, o) {
    var s = typeof t;
    if (s === "undefined" || s === "boolean") {
      t = null;
    }
    var i = false;
    if (t === null) {
      i = true;
    } else {
      switch (s) {
        case "bigint":
        case "string":
        case "number":
          i = true;
          break;
        case "object":
          switch (t.$$typeof) {
            case p:
            case T:
              i = true;
              break;
            case w:
              i = t._init;
              return E(i(t._payload), e, u, n, o);
          }
      }
    }
    if (i) {
      o = o(t);
      i = n === "" ? "." + O(t, 0) : n;
      if (M(o)) {
        u = "";
        if (i != null) {
          u = i.replace(b, "$&/") + "/";
        }
        E(o, e, u, "", function (J) {
          return J;
        });
      } else if (o != null) {
        if (S(o)) {
          o = B(o, u + (o.key == null || t && t.key === o.key ? "" : ("" + o.key).replace(b, "$&/") + "/") + i);
        }
        e.push(o);
      }
      return 1;
    }
    i = 0;
    var a = n === "" ? "." : n + ":";
    if (M(t)) {
      for (var c = 0; c < t.length; c++) {
        n = t[c];
        s = a + O(n, c);
        i += E(n, e, u, s, o);
      }
    } else {
      c = K(t);
      if (typeof c == "function") {
        t = c.call(t);
        c = 0;
        while (!(n = t.next()).done) {
          n = n.value;
          s = a + O(n, c++);
          i += E(n, e, u, s, o);
        }
      } else if (s === "object") {
        if (typeof t.then == "function") {
          return E(Q(t), e, u, n, o);
        }
        e = String(t);
        throw Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
      }
    }
    return i;
  }
  function m(t, e, u) {
    if (t == null) {
      return t;
    }
    var n = [];
    var o = 0;
    E(t, n, "", "", function (s) {
      return e.call(u, s, o++);
    });
    return n;
  }
  function X(t) {
    if (t._status === -1) {
      var e = t._result;
      e = e();
      e.then(function (u) {
        if (t._status === 0 || t._status === -1) {
          t._status = 1;
          t._result = u;
        }
      }, function (u) {
        if (t._status === 0 || t._status === -1) {
          t._status = 2;
          t._result = u;
        }
      });
      if (t._status === -1) {
        t._status = 0;
        t._result = e;
      }
    }
    if (t._status === 1) {
      return t._result.default;
    }
    throw t._result;
  }
  var I = typeof reportError == "function" ? reportError : function (t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) {
        return;
      }
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  };
  var Z = {
    map: m,
    forEach: function (t, e, u) {
      m(t, function () {
        e.apply(this, arguments);
      }, u);
    },
    count: function (t) {
      var e = 0;
      m(t, function () {
        e++;
      });
      return e;
    },
    toArray: function (t) {
      return m(t, function (e) {
        return e;
      }) || [];
    },
    only: function (t) {
      if (!S(t)) {
        throw Error("React.Children.only expected to receive a single React element child.");
      }
      return t;
    }
  };
  r.Activity = G;
  r.Children = Z;
  r.Component = y;
  r.Fragment = v;
  r.Profiler = _;
  r.PureComponent = C;
  r.StrictMode = l;
  r.Suspense = q;
  r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f;
  r.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function (t) {
      return f.H.useMemoCache(t);
    }
  };
  r.cache = function (t) {
    return function () {
      return t.apply(null, arguments);
    };
  };
  r.cacheSignal = function () {
    return null;
  };
  r.cloneElement = function (t, e, u) {
    if (t == null) {
      throw Error("The argument must be a React element, but you passed " + t + ".");
    }
    var n = H({}, t.props);
    var o = t.key;
    if (e != null) {
      if (e.key !== undefined) {
        o = "" + e.key;
      }
      for (s in e) {
        if (!!Y.call(e, s) && s !== "key" && s !== "__self" && s !== "__source" && (s !== "ref" || e.ref !== undefined)) {
          n[s] = e[s];
        }
      }
    }
    var s = arguments.length - 2;
    if (s === 1) {
      n.children = u;
    } else if (s > 1) {
      var i = Array(s);
      for (var a = 0; a < s; a++) {
        i[a] = arguments[a + 2];
      }
      n.children = i;
    }
    return A(t.type, o, n);
  };
  r.createContext = function (t) {
    t = {
      $$typeof: U,
      _currentValue: t,
      _currentValue2: t,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    t.Provider = t;
    t.Consumer = {
      $$typeof: R,
      _context: t
    };
    return t;
  };
  r.createElement = function (t, e, u) {
    var n;
    var o = {};
    var s = null;
    if (e != null) {
      if (e.key !== undefined) {
        s = "" + e.key;
      }
      for (n in e) {
        if (Y.call(e, n) && n !== "key" && n !== "__self" && n !== "__source") {
          o[n] = e[n];
        }
      }
    }
    var i = arguments.length - 2;
    if (i === 1) {
      o.children = u;
    } else if (i > 1) {
      var a = Array(i);
      for (var c = 0; c < i; c++) {
        a[c] = arguments[c + 2];
      }
      o.children = a;
    }
    if (t && t.defaultProps) {
      i = t.defaultProps;
      for (n in i) {
        if (o[n] === undefined) {
          o[n] = i[n];
        }
      }
    }
    return A(t, s, o);
  };
  r.createRef = function () {
    return {
      current: null
    };
  };
  r.forwardRef = function (t) {
    return {
      $$typeof: D,
      render: t
    };
  };
  r.isValidElement = S;
  r.lazy = function (t) {
    return {
      $$typeof: w,
      _payload: {
        _status: -1,
        _result: t
      },
      _init: X
    };
  };
  r.memo = function (t, e) {
    return {
      $$typeof: z,
      type: t,
      compare: e === undefined ? null : e
    };
  };
  r.startTransition = function (t) {
    var e = f.T;
    var u = {};
    f.T = u;
    try {
      var n = t();
      var o = f.S;
      if (o !== null) {
        o(u, n);
      }
      if (typeof n == "object" && n !== null && typeof n.then == "function") {
        n.then(g, I);
      }
    } catch (s) {
      I(s);
    } finally {
      if (e !== null && u.types !== null) {
        e.types = u.types;
      }
      f.T = e;
    }
  };
  r.unstable_useCacheRefresh = function () {
    return f.H.useCacheRefresh();
  };
  r.use = function (t) {
    return f.H.use(t);
  };
  r.useActionState = function (t, e, u) {
    return f.H.useActionState(t, e, u);
  };
  r.useCallback = function (t, e) {
    return f.H.useCallback(t, e);
  };
  r.useContext = function (t) {
    return f.H.useContext(t);
  };
  r.useDebugValue = function () {};
  r.useDeferredValue = function (t, e) {
    return f.H.useDeferredValue(t, e);
  };
  r.useEffect = function (t, e) {
    return f.H.useEffect(t, e);
  };
  r.useEffectEvent = function (t) {
    return f.H.useEffectEvent(t);
  };
  r.useId = function () {
    return f.H.useId();
  };
  r.useImperativeHandle = function (t, e, u) {
    return f.H.useImperativeHandle(t, e, u);
  };
  r.useInsertionEffect = function (t, e) {
    return f.H.useInsertionEffect(t, e);
  };
  r.useLayoutEffect = function (t, e) {
    return f.H.useLayoutEffect(t, e);
  };
  r.useMemo = function (t, e) {
    return f.H.useMemo(t, e);
  };
  r.useOptimistic = function (t, e) {
    return f.H.useOptimistic(t, e);
  };
  r.useReducer = function (t, e, u) {
    return f.H.useReducer(t, e, u);
  };
  r.useRef = function (t) {
    return f.H.useRef(t);
  };
  r.useState = function (t) {
    return f.H.useState(t);
  };
  r.useSyncExternalStore = function (t, e, u) {
    return f.H.useSyncExternalStore(t, e, u);
  };
  r.useTransition = function () {
    return f.H.useTransition();
  };
  r.version = "19.2.5";
  return r;
}
var L;
function et() {
  if (!L) {
    L = 1;
    h.exports = tt();
  }
  return h.exports;
}
var x = et();
const rt = F(x);
const nt = V({
  __proto__: null,
  default: rt
}, [x]);
export { rt as R, et as a, nt as b, F as g, x as r }; //# sourceMappingURL=CNSOJBbxx5q0.js.map
//# chunkId=019d8a7d-c9c6-7870-8693-7042db7e52ee