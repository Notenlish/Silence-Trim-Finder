(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019e03d7-3554-7a42-b5a0-c2b72861541a";
    }
  } catch (e) {}
})();
import { a as O } from "./CNSOJBbxx5q0.js";
var y = {
  exports: {}
};
var n = {};
var o;
function S() {
  if (o) {
    return n;
  }
  o = 1;
  var u = O();
  function g(r) {
    var e = "https://react.dev/errors/" + r;
    if (arguments.length > 1) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var t = 2; t < arguments.length; t++) {
        e += "&args[]=" + encodeURIComponent(arguments[t]);
      }
    }
    return "Minified React error #" + r + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function a() {}
  var i = {
    d: {
      f: a,
      r: function () {
        throw Error(g(522));
      },
      D: a,
      C: a,
      L: a,
      m: a,
      X: a,
      S: a,
      M: a
    },
    p: 0,
    findDOMNode: null
  };
  var m = Symbol.for("react.portal");
  function v(r, e, t, c = null) {
    return {
      $$typeof: m,
      key: c == null ? null : "" + c,
      children: r,
      containerInfo: e,
      implementation: t
    };
  }
  var f = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(r, e) {
    if (r === "font") {
      return "";
    }
    if (typeof e == "string") {
      if (e === "use-credentials") {
        return e;
      } else {
        return "";
      }
    }
  }
  n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i;
  n.createPortal = function (r, e, t = null) {
    if (!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11) {
      throw Error(g(299));
    }
    return v(r, e, null, t);
  };
  n.flushSync = function (r) {
    var e = f.T;
    var t = i.p;
    try {
      f.T = null;
      i.p = 2;
      if (r) {
        return r();
      }
    } finally {
      f.T = e;
      i.p = t;
      i.d.f();
    }
  };
  n.preconnect = function (r, e) {
    if (typeof r == "string") {
      if (e) {
        e = e.crossOrigin;
        e = typeof e == "string" ? e === "use-credentials" ? e : "" : undefined;
      } else {
        e = null;
      }
      i.d.C(r, e);
    }
  };
  n.prefetchDNS = function (r) {
    if (typeof r == "string") {
      i.d.D(r);
    }
  };
  n.preinit = function (r, e) {
    if (typeof r == "string" && e && typeof e.as == "string") {
      var t = e.as;
      var c = d(t, e.crossOrigin);
      var s = typeof e.integrity == "string" ? e.integrity : undefined;
      var l = typeof e.fetchPriority == "string" ? e.fetchPriority : undefined;
      if (t === "style") {
        i.d.S(r, typeof e.precedence == "string" ? e.precedence : undefined, {
          crossOrigin: c,
          integrity: s,
          fetchPriority: l
        });
      } else if (t === "script") {
        i.d.X(r, {
          crossOrigin: c,
          integrity: s,
          fetchPriority: l,
          nonce: typeof e.nonce == "string" ? e.nonce : undefined
        });
      }
    }
  };
  n.preinitModule = function (r, e) {
    if (typeof r == "string") {
      if (typeof e == "object" && e !== null) {
        if (e.as == null || e.as === "script") {
          var t = d(e.as, e.crossOrigin);
          i.d.M(r, {
            crossOrigin: t,
            integrity: typeof e.integrity == "string" ? e.integrity : undefined,
            nonce: typeof e.nonce == "string" ? e.nonce : undefined
          });
        }
      } else if (e == null) {
        i.d.M(r);
      }
    }
  };
  n.preload = function (r, e) {
    if (typeof r == "string" && typeof e == "object" && e !== null && typeof e.as == "string") {
      var t = e.as;
      var c = d(t, e.crossOrigin);
      i.d.L(r, t, {
        crossOrigin: c,
        integrity: typeof e.integrity == "string" ? e.integrity : undefined,
        nonce: typeof e.nonce == "string" ? e.nonce : undefined,
        type: typeof e.type == "string" ? e.type : undefined,
        fetchPriority: typeof e.fetchPriority == "string" ? e.fetchPriority : undefined,
        referrerPolicy: typeof e.referrerPolicy == "string" ? e.referrerPolicy : undefined,
        imageSrcSet: typeof e.imageSrcSet == "string" ? e.imageSrcSet : undefined,
        imageSizes: typeof e.imageSizes == "string" ? e.imageSizes : undefined,
        media: typeof e.media == "string" ? e.media : undefined
      });
    }
  };
  n.preloadModule = function (r, e) {
    if (typeof r == "string") {
      if (e) {
        var t = d(e.as, e.crossOrigin);
        i.d.m(r, {
          as: typeof e.as == "string" && e.as !== "script" ? e.as : undefined,
          crossOrigin: t,
          integrity: typeof e.integrity == "string" ? e.integrity : undefined
        });
      } else {
        i.d.m(r);
      }
    }
  };
  n.requestFormReset = function (r) {
    i.d.r(r);
  };
  n.unstable_batchedUpdates = function (r, e) {
    return r(e);
  };
  n.useFormState = function (r, e, t) {
    return f.H.useFormState(r, e, t);
  };
  n.useFormStatus = function () {
    return f.H.useHostTransitionStatus();
  };
  n.version = "19.2.5";
  return n;
}
var _;
function T() {
  if (_) {
    return y.exports;
  }
  _ = 1;
  function u() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") {
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (g) {
        console.error(g);
      }
    }
  }
  u();
  y.exports = S();
  return y.exports;
}
export { T as r }; //# sourceMappingURL=Dr8MHZPCjXL2.js.map
//# chunkId=019e03d7-3554-7a42-b5a0-c2b72861541a