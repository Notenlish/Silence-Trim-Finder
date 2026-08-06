(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019e03d7-352c-7452-a867-8eceed83e595";
    }
  } catch (e) {}
})();
import { a as Gh, r as bt } from "./CNSOJBbxx5q0.js";
import { r as Qh } from "./7OC5HNn7-IcQ.js";
import { r as Ch } from "./Dr8MHZPCjXL2.js";
var kc = {
  exports: {}
};
var ru = {};
var ty;
function Zh() {
  if (ty) {
    return ru;
  }
  ty = 1;
  var E = Qh();
  var r = Gh();
  var cl = Ch();
  function g(l) {
    var t = "https://react.dev/errors/" + l;
    if (arguments.length > 1) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++) {
        t += "&args[]=" + encodeURIComponent(arguments[a]);
      }
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function rl(l) {
    return !!l && (l.nodeType === 1 || l.nodeType === 9 || l.nodeType === 11);
  }
  function ul(l) {
    var t = l;
    var a = l;
    if (l.alternate) {
      while (t.return) {
        t = t.return;
      }
    } else {
      l = t;
      do {
        t = l;
        if ((t.flags & 4098) !== 0) {
          a = t.return;
        }
        l = t.return;
      } while (l);
    }
    if (t.tag === 3) {
      return a;
    } else {
      return null;
    }
  }
  function Wt(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null) {
        l = l.alternate;
        if (l !== null) {
          t = l.memoizedState;
        }
      }
      if (t !== null) {
        return t.dehydrated;
      }
    }
    return null;
  }
  function lu(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null) {
        l = l.alternate;
        if (l !== null) {
          t = l.memoizedState;
        }
      }
      if (t !== null) {
        return t.dehydrated;
      }
    }
    return null;
  }
  function tu(l) {
    if (ul(l) !== l) {
      throw Error(g(188));
    }
  }
  function En(l) {
    var t = l.alternate;
    if (!t) {
      t = ul(l);
      if (t === null) {
        throw Error(g(188));
      }
      if (t !== l) {
        return null;
      } else {
        return l;
      }
    }
    var a = l;
    var u = t;
    while (true) {
      var e = a.return;
      if (e === null) {
        break;
      }
      var n = e.alternate;
      if (n === null) {
        u = e.return;
        if (u !== null) {
          a = u;
          continue;
        }
        break;
      }
      if (e.child === n.child) {
        for (n = e.child; n;) {
          if (n === a) {
            tu(e);
            return l;
          }
          if (n === u) {
            tu(e);
            return t;
          }
          n = n.sibling;
        }
        throw Error(g(188));
      }
      if (a.return !== u.return) {
        a = e;
        u = n;
      } else {
        var f = false;
        for (var c = e.child; c;) {
          if (c === a) {
            f = true;
            a = e;
            u = n;
            break;
          }
          if (c === u) {
            f = true;
            u = e;
            a = n;
            break;
          }
          c = c.sibling;
        }
        if (!f) {
          for (c = n.child; c;) {
            if (c === a) {
              f = true;
              a = n;
              u = e;
              break;
            }
            if (c === u) {
              f = true;
              u = n;
              a = e;
              break;
            }
            c = c.sibling;
          }
          if (!f) {
            throw Error(g(189));
          }
        }
      }
      if (a.alternate !== u) {
        throw Error(g(190));
      }
    }
    if (a.tag !== 3) {
      throw Error(g(188));
    }
    if (a.stateNode.current === a) {
      return l;
    } else {
      return t;
    }
  }
  function Iu(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) {
      return l;
    }
    for (l = l.child; l !== null;) {
      t = Iu(l);
      if (t !== null) {
        return t;
      }
      l = l.sibling;
    }
    return null;
  }
  var C = Object.assign;
  var Pu = Symbol.for("react.element");
  var Il = Symbol.for("react.transitional.element");
  var El = Symbol.for("react.portal");
  var da = Symbol.for("react.fragment");
  var rc = Symbol.for("react.strict_mode");
  var Mn = Symbol.for("react.profiler");
  var Ic = Symbol.for("react.consumer");
  var Pl = Symbol.for("react.context");
  var on = Symbol.for("react.forward_ref");
  var On = Symbol.for("react.suspense");
  var Dn = Symbol.for("react.suspense_list");
  var Un = Symbol.for("react.memo");
  var At = Symbol.for("react.lazy");
  var Hn = Symbol.for("react.activity");
  var vy = Symbol.for("react.memo_cache_sentinel");
  var Pc = Symbol.iterator;
  function au(l) {
    if (l === null || typeof l != "object") {
      return null;
    } else {
      l = Pc && l[Pc] || l["@@iterator"];
      if (typeof l == "function") {
        return l;
      } else {
        return null;
      }
    }
  }
  var yy = Symbol.for("react.client.reference");
  function Nn(l) {
    if (l == null) {
      return null;
    }
    if (typeof l == "function") {
      if (l.$$typeof === yy) {
        return null;
      } else {
        return l.displayName || l.name || null;
      }
    }
    if (typeof l == "string") {
      return l;
    }
    switch (l) {
      case da:
        return "Fragment";
      case Mn:
        return "Profiler";
      case rc:
        return "StrictMode";
      case On:
        return "Suspense";
      case Dn:
        return "SuspenseList";
      case Hn:
        return "Activity";
    }
    if (typeof l == "object") {
      switch (l.$$typeof) {
        case El:
          return "Portal";
        case Pl:
          return l.displayName || "Context";
        case Ic:
          return (l._context.displayName || "Context") + ".Consumer";
        case on:
          var t = l.render;
          l = l.displayName;
          if (!l) {
            l = t.displayName || t.name || "";
            l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef";
          }
          return l;
        case Un:
          t = l.displayName || null;
          if (t !== null) {
            return t;
          } else {
            return Nn(l.type) || "Memo";
          }
        case At:
          t = l._payload;
          l = l._init;
          try {
            return Nn(l(t));
          } catch {}
      }
    }
    return null;
  }
  var uu = Array.isArray;
  var O = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  var G = cl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  var $t = {
    pending: false,
    data: null,
    method: null,
    action: null
  };
  var _n = [];
  var Sa = -1;
  function Jl(l) {
    return {
      current: l
    };
  }
  function el(l) {
    if (!(Sa < 0)) {
      l.current = _n[Sa];
      _n[Sa] = null;
      Sa--;
    }
  }
  function K(l, t) {
    Sa++;
    _n[Sa] = l.current;
    l.current = t;
  }
  var Wl = Jl(null);
  var eu = Jl(null);
  var Tt = Jl(null);
  var le = Jl(null);
  function te(l, t) {
    K(Tt, t);
    K(eu, l);
    K(Wl, null);
    switch (t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Ov(l) : 0;
        break;
      default:
        l = t.tagName;
        if (t = t.namespaceURI) {
          t = Ov(t);
          l = Dv(t, l);
        } else {
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
        }
    }
    el(Wl);
    K(Wl, l);
  }
  function ga() {
    el(Wl);
    el(eu);
    el(Tt);
  }
  function Bn(l) {
    if (l.memoizedState !== null) {
      K(le, l);
    }
    var t = Wl.current;
    var a = Dv(t, l.type);
    if (t !== a) {
      K(eu, l);
      K(Wl, a);
    }
  }
  function ae(l) {
    if (eu.current === l) {
      el(Wl);
      el(eu);
    }
    if (le.current === l) {
      el(le);
      $u._currentValue = $t;
    }
  }
  var qn;
  var li;
  function wt(l) {
    if (qn === undefined) {
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        qn = t && t[1] || "";
        li = a.stack.indexOf(`
    at`) > -1 ? " (<anonymous>)" : a.stack.indexOf("@") > -1 ? "@unknown:0:0" : "";
      }
    }
    return `
${qn}${l}${li}`;
  }
  var Yn = false;
  function Xn(l, t) {
    if (!l || Yn) {
      return "";
    }
    Yn = true;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = undefined;
    try {
      var u = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var b = function () {
                throw Error();
              };
              Object.defineProperty(b.prototype, "props", {
                set: function () {
                  throw Error();
                }
              });
              if (typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(b, []);
                } catch (S) {
                  var d = S;
                }
                Reflect.construct(l, [], b);
              } else {
                try {
                  b.call();
                } catch (S) {
                  d = S;
                }
                l.call(b.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (S) {
                d = S;
              }
              if ((b = l()) && typeof b.catch == "function") {
                b.catch(function () {});
              }
            }
          } catch (S) {
            if (S && d && typeof S.stack == "string") {
              return [S.stack, d.stack];
            }
          }
          return [null, null];
        }
      };
      u.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var e = Object.getOwnPropertyDescriptor(u.DetermineComponentFrameRoot, "name");
      if (e && e.configurable) {
        Object.defineProperty(u.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot"
        });
      }
      var n = u.DetermineComponentFrameRoot();
      var f = n[0];
      var c = n[1];
      if (f && c) {
        var i = f.split(`
`);
        var h = c.split(`
`);
        for (e = u = 0; u < i.length && !i[u].includes("DetermineComponentFrameRoot");) {
          u++;
        }
        while (e < h.length && !h[e].includes("DetermineComponentFrameRoot")) {
          e++;
        }
        if (u === i.length || e === h.length) {
          u = i.length - 1;
          e = h.length - 1;
          while (u >= 1 && e >= 0 && i[u] !== h[e]) {
            e--;
          }
        }
        for (; u >= 1 && e >= 0; u--, e--) {
          if (i[u] !== h[e]) {
            if (u !== 1 || e !== 1) {
              do {
                u--;
                e--;
                if (e < 0 || i[u] !== h[e]) {
                  var z = `
${i[u].replace(" at new ", " at ")}`;
                  if (l.displayName && z.includes("<anonymous>")) {
                    z = z.replace("<anonymous>", l.displayName);
                  }
                  return z;
                }
              } while (u >= 1 && e >= 0);
            }
            break;
          }
        }
      }
    } finally {
      Yn = false;
      Error.prepareStackTrace = a;
    }
    if (a = l ? l.displayName || l.name : "") {
      return wt(a);
    } else {
      return "";
    }
  }
  function my(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return wt(l.type);
      case 16:
        return wt("Lazy");
      case 13:
        if (l.child !== t && t !== null) {
          return wt("Suspense Fallback");
        } else {
          return wt("Suspense");
        }
      case 19:
        return wt("SuspenseList");
      case 0:
      case 15:
        return Xn(l.type, false);
      case 11:
        return Xn(l.type.render, false);
      case 1:
        return Xn(l.type, true);
      case 31:
        return wt("Activity");
      default:
        return "";
    }
  }
  function ti(l) {
    try {
      var t = "";
      var a = null;
      do {
        t += my(l, a);
        a = l;
        l = l.return;
      } while (l);
      return t;
    } catch (u) {
      return `
Error generating stack: ${u.message}
${u.stack}`;
    }
  }
  var Gn = Object.prototype.hasOwnProperty;
  var Qn = E.unstable_scheduleCallback;
  var Cn = E.unstable_cancelCallback;
  var hy = E.unstable_shouldYield;
  var dy = E.unstable_requestPaint;
  var Ml = E.unstable_now;
  var Sy = E.unstable_getCurrentPriorityLevel;
  var ai = E.unstable_ImmediatePriority;
  var ui = E.unstable_UserBlockingPriority;
  var ue = E.unstable_NormalPriority;
  var gy = E.unstable_LowPriority;
  var ei = E.unstable_IdlePriority;
  var zy = E.log;
  var sy = E.unstable_setDisableYieldValue;
  var nu = null;
  var ol = null;
  function Et(l) {
    if (typeof zy == "function") {
      sy(l);
    }
    if (ol && typeof ol.setStrictMode == "function") {
      try {
        ol.setStrictMode(nu, l);
      } catch {}
    }
  }
  var Ol = Math.clz32 ? Math.clz32 : Ty;
  var by = Math.log;
  var Ay = Math.LN2;
  function Ty(l) {
    l >>>= 0;
    if (l === 0) {
      return 32;
    } else {
      return 31 - (by(l) / Ay | 0) | 0;
    }
  }
  var ee = 256;
  var ne = 262144;
  var fe = 4194304;
  function Ft(l) {
    var t = l & 42;  // bitwise AND operator
    if (t !== 0) {
      return t;
    }
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function ce(l, t, a) {
    var u = l.pendingLanes;
    if (u === 0) {
      return 0;
    }
    var e = 0;
    var n = l.suspendedLanes;
    var f = l.pingedLanes;
    l = l.warmLanes;
    var c = u & 134217727;
    if (c !== 0) {
      u = c & ~n;
      if (u !== 0) {
        e = Ft(u);
      } else {
        f &= c;
        if (f !== 0) {
          e = Ft(f);
        } else if (!a) {
          a = c & ~l;
          if (a !== 0) {
            e = Ft(a);
          }
        }
      }
    } else {
      c = u & ~n;
      if (c !== 0) {
        e = Ft(c);
      } else if (f !== 0) {
        e = Ft(f);
      } else if (!a) {
        a = u & ~l;
        if (a !== 0) {
          e = Ft(a);
        }
      }
    }
    if (e === 0) {
      return 0;
    } else if (t !== 0 && t !== e && (t & n) === 0 && (n = e & -e, a = t & -t, n >= a || n === 32 && (a & 4194048) !== 0)) {
      return t;
    } else {
      return e;
    }
  }
  function fu(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Ey(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5000;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ni() {
    var l = fe;
    fe <<= 1;
    if ((fe & 62914560) === 0) {
      fe = 4194304;
    }
    return l;
  }
  function Zn(l) {
    var t = [];
    for (var a = 0; a < 31; a++) {
      t.push(l);
    }
    return t;
  }
  function cu(l, t) {
    l.pendingLanes |= t;
    if (t !== 268435456) {
      l.suspendedLanes = 0;
      l.pingedLanes = 0;
      l.warmLanes = 0;
    }
  }
  function My(l, t, a, u, e, n) {
    var f = l.pendingLanes;
    l.pendingLanes = a;
    l.suspendedLanes = 0;
    l.pingedLanes = 0;
    l.warmLanes = 0;
    l.expiredLanes &= a;
    l.entangledLanes &= a;
    l.errorRecoveryDisabledLanes &= a;
    l.shellSuspendCounter = 0;
    var c = l.entanglements;
    var i = l.expirationTimes;
    var h = l.hiddenUpdates;
    for (a = f & ~a; a > 0;) {
      var z = 31 - Ol(a);
      var b = 1 << z;
      c[z] = 0;
      i[z] = -1;
      var d = h[z];
      if (d !== null) {
        h[z] = null;
        z = 0;
        for (; z < d.length; z++) {
          var S = d[z];
          if (S !== null) {
            S.lane &= -536870913;
          }
        }
      }
      a &= ~b;
    }
    if (u !== 0) {
      fi(l, u, 0);
    }
    if (n !== 0 && e === 0 && l.tag !== 0) {
      l.suspendedLanes |= n & ~(f & ~t);
    }
  }
  function fi(l, t, a) {
    l.pendingLanes |= t;
    l.suspendedLanes &= ~t;
    var u = 31 - Ol(t);
    l.entangledLanes |= t;
    l.entanglements[u] = l.entanglements[u] | 1073741824 | a & 261930;
  }
  function ci(l, t) {
    var a = l.entangledLanes |= t;
    for (l = l.entanglements; a;) {
      var u = 31 - Ol(a);
      var e = 1 << u;
      if (e & t | l[u] & t) {
        l[u] |= t;
      }
      a &= ~e;
    }
  }
  function ii(l, t) {
    var a = t & -t;
    a = (a & 42) !== 0 ? 1 : Rn(a);
    if ((a & (l.suspendedLanes | t)) !== 0) {
      return 0;
    } else {
      return a;
    }
  }
  function Rn(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function pn(l) {
    l &= -l;
    if (l > 2) {
      if (l > 8) {
        if ((l & 134217727) !== 0) {
          return 32;
        } else {
          return 268435456;
        }
      } else {
        return 8;
      }
    } else {
      return 2;
    }
  }
  function vi() {
    var l = G.p;
    if (l !== 0) {
      return l;
    } else {
      l = window.event;
      if (l === undefined) {
        return 32;
      } else {
        return wv(l.type);
      }
    }
  }
  function yi(l, t) {
    var a = G.p;
    try {
      G.p = l;
      return t();
    } finally {
      G.p = a;
    }
  }
  var Mt = Math.random().toString(36).slice(2);
  var il = "__reactFiber$" + Mt;
  var Sl = "__reactProps$" + Mt;
  var za = "__reactContainer$" + Mt;
  var jn = "__reactEvents$" + Mt;
  var oy = "__reactListeners$" + Mt;
  var Oy = "__reactHandles$" + Mt;
  var mi = "__reactResources$" + Mt;
  var iu = "__reactMarker$" + Mt;
  function Vn(l) {
    delete l[il];
    delete l[Sl];
    delete l[jn];
    delete l[oy];
    delete l[Oy];
  }
  function sa(l) {
    var t = l[il];
    if (t) {
      return t;
    }
    for (var a = l.parentNode; a;) {
      if (t = a[za] || a[il]) {
        a = t.alternate;
        if (t.child !== null || a !== null && a.child !== null) {
          for (l = Yv(l); l !== null;) {
            if (a = l[il]) {
              return a;
            }
            l = Yv(l);
          }
        }
        return t;
      }
      l = a;
      a = l.parentNode;
    }
    return null;
  }
  function ba(l) {
    if (l = l[il] || l[za]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) {
        return l;
      }
    }
    return null;
  }
  function vu(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) {
      return l.stateNode;
    }
    throw Error(g(33));
  }
  function Aa(l) {
    var t = l[mi];
    t ||= l[mi] = {
      hoistableStyles: new Map(),
      hoistableScripts: new Map()
    };
    return t;
  }
  function nl(l) {
    l[iu] = true;
  }
  var hi = new Set();
  var di = {};
  function kt(l, t) {
    Ta(l, t);
    Ta(l + "Capture", t);
  }
  function Ta(l, t) {
    di[l] = t;
    l = 0;
    for (; l < t.length; l++) {
      hi.add(t[l]);
    }
  }
  var Dy = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$");
  var Si = {};
  var gi = {};
  function Uy(l) {
    if (Gn.call(gi, l)) {
      return true;
    } else if (Gn.call(Si, l)) {
      return false;
    } else if (Dy.test(l)) {
      return gi[l] = true;
    } else {
      Si[l] = true;
      return false;
    }
  }
  function ie(l, t, a) {
    if (Uy(t)) {
      if (a === null) {
        l.removeAttribute(t);
      } else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var u = t.toLowerCase().slice(0, 5);
            if (u !== "data-" && u !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + a);
      }
    }
  }
  function ve(l, t, a) {
    if (a === null) {
      l.removeAttribute(t);
    } else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + a);
    }
  }
  function lt(l, t, a, u) {
    if (u === null) {
      l.removeAttribute(a);
    } else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(a);
          return;
      }
      l.setAttributeNS(t, a, "" + u);
    }
  }
  function Yl(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function zi(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Hy(l, t, a) {
    var u = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (!l.hasOwnProperty(t) && typeof u !== "undefined" && typeof u.get == "function" && typeof u.set == "function") {
      var e = u.get;
      var n = u.set;
      Object.defineProperty(l, t, {
        configurable: true,
        get: function () {
          return e.call(this);
        },
        set: function (f) {
          a = "" + f;
          n.call(this, f);
        }
      });
      Object.defineProperty(l, t, {
        enumerable: u.enumerable
      });
      return {
        getValue: function () {
          return a;
        },
        setValue: function (f) {
          a = "" + f;
        },
        stopTracking: function () {
          l._valueTracker = null;
          delete l[t];
        }
      };
    }
  }
  function xn(l) {
    if (!l._valueTracker) {
      var t = zi(l) ? "checked" : "value";
      l._valueTracker = Hy(l, t, "" + l[t]);
    }
  }
  function si(l) {
    if (!l) {
      return false;
    }
    var t = l._valueTracker;
    if (!t) {
      return true;
    }
    var a = t.getValue();
    var u = "";
    if (l) {
      u = zi(l) ? l.checked ? "true" : "false" : l.value;
    }
    l = u;
    if (l !== a) {
      t.setValue(l);
      return true;
    } else {
      return false;
    }
  }
  function ye(l) {
    l = l || (typeof document !== "undefined" ? document : undefined);
    if (typeof l === "undefined") {
      return null;
    }
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Ny = /[\n"\\]/g;
  function Xl(l) {
    return l.replace(Ny, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function Kn(l, t, a, u, e, n, f, c) {
    l.name = "";
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean") {
      l.type = f;
    } else {
      l.removeAttribute("type");
    }
    if (t != null) {
      if (f === "number") {
        if (t === 0 && l.value === "" || l.value != t) {
          l.value = "" + Yl(t);
        }
      } else if (l.value !== "" + Yl(t)) {
        l.value = "" + Yl(t);
      }
    } else if (f === "submit" || f === "reset") {
      l.removeAttribute("value");
    }
    if (t != null) {
      Ln(l, f, Yl(t));
    } else if (a != null) {
      Ln(l, f, Yl(a));
    } else if (u != null) {
      l.removeAttribute("value");
    }
    if (e == null && n != null) {
      l.defaultChecked = !!n;
    }
    if (e != null) {
      l.checked = e && typeof e != "function" && typeof e != "symbol";
    }
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean") {
      l.name = "" + Yl(c);
    } else {
      l.removeAttribute("name");
    }
  }
  function bi(l, t, a, u, e, n, f, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean") {
      l.type = n;
    }
    if (t != null || a != null) {
      if ((n === "submit" || n === "reset") && t == null) {
        xn(l);
        return;
      }
      a = a != null ? "" + Yl(a) : "";
      t = t != null ? "" + Yl(t) : a;
      if (!c && t !== l.value) {
        l.value = t;
      }
      l.defaultValue = t;
    }
    u = u ?? e;
    u = typeof u != "function" && typeof u != "symbol" && !!u;
    l.checked = c ? l.checked : !!u;
    l.defaultChecked = !!u;
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean") {
      l.name = f;
    }
    xn(l);
  }
  function Ln(l, t, a) {
    if ((t !== "number" || ye(l.ownerDocument) !== l) && l.defaultValue !== "" + a) {
      l.defaultValue = "" + a;
    }
  }
  function Ea(l, t, a, u) {
    l = l.options;
    if (t) {
      t = {};
      for (var e = 0; e < a.length; e++) {
        t["$" + a[e]] = true;
      }
      for (a = 0; a < l.length; a++) {
        e = t.hasOwnProperty("$" + l[a].value);
        if (l[a].selected !== e) {
          l[a].selected = e;
        }
        if (e && u) {
          l[a].defaultSelected = true;
        }
      }
    } else {
      a = "" + Yl(a);
      t = null;
      e = 0;
      for (; e < l.length; e++) {
        if (l[e].value === a) {
          l[e].selected = true;
          if (u) {
            l[e].defaultSelected = true;
          }
          return;
        }
        if (t === null && !l[e].disabled) {
          t = l[e];
        }
      }
      if (t !== null) {
        t.selected = true;
      }
    }
  }
  function Ai(l, t, a) {
    if (t != null && (t = "" + Yl(t), t !== l.value && (l.value = t), a == null)) {
      if (l.defaultValue !== t) {
        l.defaultValue = t;
      }
      return;
    }
    l.defaultValue = a != null ? "" + Yl(a) : "";
  }
  function Ti(l, t, a, u) {
    if (t == null) {
      if (u != null) {
        if (a != null) {
          throw Error(g(92));
        }
        if (uu(u)) {
          if (u.length > 1) {
            throw Error(g(93));
          }
          u = u[0];
        }
        a = u;
      }
      if (a == null) {
        a = "";
      }
      t = a;
    }
    a = Yl(t);
    l.defaultValue = a;
    u = l.textContent;
    if (u === a && u !== "" && u !== null) {
      l.value = u;
    }
    xn(l);
  }
  function Ma(l, t) {
    if (t) {
      var a = l.firstChild;
      if (a && a === l.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var _y = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function Ei(l, t, a) {
    var u = t.indexOf("--") === 0;
    if (a == null || typeof a == "boolean" || a === "") {
      if (u) {
        l.setProperty(t, "");
      } else if (t === "float") {
        l.cssFloat = "";
      } else {
        l[t] = "";
      }
    } else if (u) {
      l.setProperty(t, a);
    } else if (typeof a != "number" || a === 0 || _y.has(t)) {
      if (t === "float") {
        l.cssFloat = a;
      } else {
        l[t] = ("" + a).trim();
      }
    } else {
      l[t] = a + "px";
    }
  }
  function Mi(l, t, a) {
    if (t != null && typeof t != "object") {
      throw Error(g(62));
    }
    l = l.style;
    if (a != null) {
      for (var u in a) {
        if (!!a.hasOwnProperty(u) && (t == null || !t.hasOwnProperty(u))) {
          if (u.indexOf("--") === 0) {
            l.setProperty(u, "");
          } else if (u === "float") {
            l.cssFloat = "";
          } else {
            l[u] = "";
          }
        }
      }
      for (var e in t) {
        u = t[e];
        if (t.hasOwnProperty(e) && a[e] !== u) {
          Ei(l, e, u);
        }
      }
    } else {
      for (var n in t) {
        if (t.hasOwnProperty(n)) {
          Ei(l, n, t[n]);
        }
      }
    }
  }
  function Jn(l) {
    if (l.indexOf("-") === -1) {
      return false;
    }
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var By = new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]);
  var qy = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function me(l) {
    if (qy.test("" + l)) {
      return "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')";
    } else {
      return l;
    }
  }
  function tt() {}
  var Wn = null;
  function $n(l) {
    l = l.target || l.srcElement || window;
    if (l.correspondingUseElement) {
      l = l.correspondingUseElement;
    }
    if (l.nodeType === 3) {
      return l.parentNode;
    } else {
      return l;
    }
  }
  var oa = null;
  var Oa = null;
  function oi(l) {
    var t = ba(l);
    if (t && (l = t.stateNode)) {
      var a = l[Sl] || null;
      l = t.stateNode;
      l: switch (t.type) {
        case "input":
          Kn(l, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
          t = a.name;
          if (a.type === "radio" && t != null) {
            for (a = l; a.parentNode;) {
              a = a.parentNode;
            }
            a = a.querySelectorAll("input[name=\"" + Xl("" + t) + "\"][type=\"radio\"]");
            t = 0;
            for (; t < a.length; t++) {
              var u = a[t];
              if (u !== l && u.form === l.form) {
                var e = u[Sl] || null;
                if (!e) {
                  throw Error(g(90));
                }
                Kn(u, e.value, e.defaultValue, e.defaultValue, e.checked, e.defaultChecked, e.type, e.name);
              }
            }
            for (t = 0; t < a.length; t++) {
              u = a[t];
              if (u.form === l.form) {
                si(u);
              }
            }
          }
          break l;
        case "textarea":
          Ai(l, a.value, a.defaultValue);
          break l;
        case "select":
          t = a.value;
          if (t != null) {
            Ea(l, !!a.multiple, t, false);
          }
      }
    }
  }
  var wn = false;
  function Oi(l, t, a) {
    if (wn) {
      return l(t, a);
    }
    wn = true;
    try {
      var u = l(t);
      return u;
    } finally {
      wn = false;
      if ((oa !== null || Oa !== null) && (Ie(), oa && (t = oa, l = Oa, Oa = oa = null, oi(t), l))) {
        for (t = 0; t < l.length; t++) {
          oi(l[t]);
        }
      }
    }
  }
  function yu(l, t) {
    var a = l.stateNode;
    if (a === null) {
      return null;
    }
    var u = a[Sl] || null;
    if (u === null) {
      return null;
    }
    a = u[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        if (!(u = !u.disabled)) {
          l = l.type;
          u = l !== "button" && l !== "input" && l !== "select" && l !== "textarea";
        }
        l = !u;
        break l;
      default:
        l = false;
    }
    if (l) {
      return null;
    }
    if (a && typeof a != "function") {
      throw Error(g(231, t, typeof a));
    }
    return a;
  }
  var at = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
  var Fn = false;
  if (at) {
    try {
      var mu = {};
      Object.defineProperty(mu, "passive", {
        get: function () {
          Fn = true;
        }
      });
      window.addEventListener("test", mu, mu);
      window.removeEventListener("test", mu, mu);
    } catch {
      Fn = false;
    }
  }
  var ot = null;
  var kn = null;
  var he = null;
  function Di() {
    if (he) {
      return he;
    }
    var l;
    var t = kn;
    var a = t.length;
    var u;
    var e = "value" in ot ? ot.value : ot.textContent;
    var n = e.length;
    for (l = 0; l < a && t[l] === e[l]; l++);
    var f = a - l;
    for (u = 1; u <= f && t[a - u] === e[n - u]; u++);
    return he = e.slice(l, u > 1 ? 1 - u : undefined);
  }
  function de(l) {
    var t = l.keyCode;
    if ("charCode" in l) {
      l = l.charCode;
      if (l === 0 && t === 13) {
        l = 13;
      }
    } else {
      l = t;
    }
    if (l === 10) {
      l = 13;
    }
    if (l >= 32 || l === 13) {
      return l;
    } else {
      return 0;
    }
  }
  function Se() {
    return true;
  }
  function Ui() {
    return false;
  }
  function gl(l) {
    function t(a, u, e, n, f) {
      this._reactName = a;
      this._targetInst = e;
      this.type = u;
      this.nativeEvent = n;
      this.target = f;
      this.currentTarget = null;
      for (var c in l) {
        if (l.hasOwnProperty(c)) {
          a = l[c];
          this[c] = a ? a(n) : n[c];
        }
      }
      this.isDefaultPrevented = n.defaultPrevented ?? n.returnValue === false ? Se : Ui;
      this.isPropagationStopped = Ui;
      return this;
    }
    C(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = true;
        var a = this.nativeEvent;
        if (a) {
          if (a.preventDefault) {
            a.preventDefault();
          } else if (typeof a.returnValue != "unknown") {
            a.returnValue = false;
          }
          this.isDefaultPrevented = Se;
        }
      },
      stopPropagation: function () {
        var a = this.nativeEvent;
        if (a) {
          if (a.stopPropagation) {
            a.stopPropagation();
          } else if (typeof a.cancelBubble != "unknown") {
            a.cancelBubble = true;
          }
          this.isPropagationStopped = Se;
        }
      },
      persist: function () {},
      isPersistent: Se
    });
    return t;
  }
  var rt = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  };
  var ge = gl(rt);
  var hu = C({}, rt, {
    view: 0,
    detail: 0
  });
  var Yy = gl(hu);
  var rn;
  var In;
  var du;
  var ze = C({}, hu, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: lf,
    button: 0,
    buttons: 0,
    relatedTarget: function (l) {
      if (l.relatedTarget === undefined) {
        if (l.fromElement === l.srcElement) {
          return l.toElement;
        } else {
          return l.fromElement;
        }
      } else {
        return l.relatedTarget;
      }
    },
    movementX: function (l) {
      if ("movementX" in l) {
        return l.movementX;
      } else {
        if (l !== du) {
          if (du && l.type === "mousemove") {
            rn = l.screenX - du.screenX;
            In = l.screenY - du.screenY;
          } else {
            In = rn = 0;
          }
          du = l;
        }
        return rn;
      }
    },
    movementY: function (l) {
      if ("movementY" in l) {
        return l.movementY;
      } else {
        return In;
      }
    }
  });
  var Hi = gl(ze);
  var Xy = C({}, ze, {
    dataTransfer: 0
  });
  var Gy = gl(Xy);
  var Qy = C({}, hu, {
    relatedTarget: 0
  });
  var Pn = gl(Qy);
  var Cy = C({}, rt, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  });
  var Zy = gl(Cy);
  var Ry = C({}, rt, {
    clipboardData: function (l) {
      if ("clipboardData" in l) {
        return l.clipboardData;
      } else {
        return window.clipboardData;
      }
    }
  });
  var py = gl(Ry);
  var jy = C({}, rt, {
    data: 0
  });
  var Ni = gl(jy);
  var Vy = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  };
  var xy = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  };
  var Ky = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Ly(l) {
    var t = this.nativeEvent;
    if (t.getModifierState) {
      return t.getModifierState(l);
    } else if (l = Ky[l]) {
      return !!t[l];
    } else {
      return false;
    }
  }
  function lf() {
    return Ly;
  }
  var Jy = C({}, hu, {
    key: function (l) {
      if (l.key) {
        var t = Vy[l.key] || l.key;
        if (t !== "Unidentified") {
          return t;
        }
      }
      if (l.type === "keypress") {
        l = de(l);
        if (l === 13) {
          return "Enter";
        } else {
          return String.fromCharCode(l);
        }
      } else if (l.type === "keydown" || l.type === "keyup") {
        return xy[l.keyCode] || "Unidentified";
      } else {
        return "";
      }
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: lf,
    charCode: function (l) {
      if (l.type === "keypress") {
        return de(l);
      } else {
        return 0;
      }
    },
    keyCode: function (l) {
      if (l.type === "keydown" || l.type === "keyup") {
        return l.keyCode;
      } else {
        return 0;
      }
    },
    which: function (l) {
      if (l.type === "keypress") {
        return de(l);
      } else if (l.type === "keydown" || l.type === "keyup") {
        return l.keyCode;
      } else {
        return 0;
      }
    }
  });
  var Wy = gl(Jy);
  var $y = C({}, ze, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  });
  var _i = gl($y);
  var wy = C({}, hu, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: lf
  });
  var Fy = gl(wy);
  var ky = C({}, rt, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  });
  var ry = gl(ky);
  var Iy = C({}, ze, {
    deltaX: function (l) {
      if ("deltaX" in l) {
        return l.deltaX;
      } else if ("wheelDeltaX" in l) {
        return -l.wheelDeltaX;
      } else {
        return 0;
      }
    },
    deltaY: function (l) {
      if ("deltaY" in l) {
        return l.deltaY;
      } else if ("wheelDeltaY" in l) {
        return -l.wheelDeltaY;
      } else if ("wheelDelta" in l) {
        return -l.wheelDelta;
      } else {
        return 0;
      }
    },
    deltaZ: 0,
    deltaMode: 0
  });
  var Py = gl(Iy);
  var lm = C({}, rt, {
    newState: 0,
    oldState: 0
  });
  var tm = gl(lm);
  var am = [9, 13, 27, 32];
  var tf = at && "CompositionEvent" in window;
  var Su = null;
  if (at && "documentMode" in document) {
    Su = document.documentMode;
  }
  var um = at && "TextEvent" in window && !Su;
  var Bi = at && (!tf || Su && Su > 8 && Su <= 11);
  var qi = " ";
  var Yi = false;
  function Xi(l, t) {
    switch (l) {
      case "keyup":
        return am.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function Gi(l) {
    l = l.detail;
    if (typeof l == "object" && "data" in l) {
      return l.data;
    } else {
      return null;
    }
  }
  var Da = false;
  function em(l, t) {
    switch (l) {
      case "compositionend":
        return Gi(t);
      case "keypress":
        if (t.which !== 32) {
          return null;
        } else {
          Yi = true;
          return qi;
        }
      case "textInput":
        l = t.data;
        if (l === qi && Yi) {
          return null;
        } else {
          return l;
        }
      default:
        return null;
    }
  }
  function nm(l, t) {
    if (Da) {
      if (l === "compositionend" || !tf && Xi(l, t)) {
        l = Di();
        he = kn = ot = null;
        Da = false;
        return l;
      } else {
        return null;
      }
    }
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!t.ctrlKey && !t.altKey && !t.metaKey || t.ctrlKey && t.altKey) {
          if (t.char && t.char.length > 1) {
            return t.char;
          }
          if (t.which) {
            return String.fromCharCode(t.which);
          }
        }
        return null;
      case "compositionend":
        if (Bi && t.locale !== "ko") {
          return null;
        } else {
          return t.data;
        }
      default:
        return null;
    }
  }
  var fm = {
    color: true,
    date: true,
    datetime: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true
  };
  function Qi(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    if (t === "input") {
      return !!fm[l.type];
    } else {
      return t === "textarea";
    }
  }
  function Ci(l, t, a, u) {
    if (oa) {
      if (Oa) {
        Oa.push(u);
      } else {
        Oa = [u];
      }
    } else {
      oa = u;
    }
    t = nn(t, "onChange");
    if (t.length > 0) {
      a = new ge("onChange", "change", null, a, u);
      l.push({
        event: a,
        listeners: t
      });
    }
  }
  var gu = null;
  var zu = null;
  function cm(l) {
    bv(l, 0);
  }
  function se(l) {
    var t = vu(l);
    if (si(t)) {
      return l;
    }
  }
  function Zi(l, t) {
    if (l === "change") {
      return t;
    }
  }
  var Ri = false;
  if (at) {
    var af;
    if (at) {
      var uf = "oninput" in document;
      if (!uf) {
        var pi = document.createElement("div");
        pi.setAttribute("oninput", "return;");
        uf = typeof pi.oninput == "function";
      }
      af = uf;
    } else {
      af = false;
    }
    Ri = af && (!document.documentMode || document.documentMode > 9);
  }
  function ji() {
    if (gu) {
      gu.detachEvent("onpropertychange", Vi);
      zu = gu = null;
    }
  }
  function Vi(l) {
    if (l.propertyName === "value" && se(zu)) {
      var t = [];
      Ci(t, zu, l, $n(l));
      Oi(cm, t);
    }
  }
  function im(l, t, a) {
    if (l === "focusin") {
      ji();
      gu = t;
      zu = a;
      gu.attachEvent("onpropertychange", Vi);
    } else if (l === "focusout") {
      ji();
    }
  }
  function vm(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown") {
      return se(zu);
    }
  }
  function ym(l, t) {
    if (l === "click") {
      return se(t);
    }
  }
  function mm(l, t) {
    if (l === "input" || l === "change") {
      return se(t);
    }
  }
  function hm(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var Dl = typeof Object.is == "function" ? Object.is : hm;
  function su(l, t) {
    if (Dl(l, t)) {
      return true;
    }
    if (typeof l != "object" || l === null || typeof t != "object" || t === null) {
      return false;
    }
    var a = Object.keys(l);
    var u = Object.keys(t);
    if (a.length !== u.length) {
      return false;
    }
    for (u = 0; u < a.length; u++) {
      var e = a[u];
      if (!Gn.call(t, e) || !Dl(l[e], t[e])) {
        return false;
      }
    }
    return true;
  }
  function xi(l) {
    while (l && l.firstChild) {
      l = l.firstChild;
    }
    return l;
  }
  function Ki(l, t) {
    var a = xi(l);
    l = 0;
    var u;
    for (; a;) {
      if (a.nodeType === 3) {
        u = l + a.textContent.length;
        if (l <= t && u >= t) {
          return {
            node: a,
            offset: t - l
          };
        }
        l = u;
      }
      l: {
        while (a) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break l;
          }
          a = a.parentNode;
        }
        a = undefined;
      }
      a = xi(a);
    }
  }
  function Li(l, t) {
    if (l && t) {
      if (l === t) {
        return true;
      } else if (l && l.nodeType === 3) {
        return false;
      } else if (t && t.nodeType === 3) {
        return Li(l, t.parentNode);
      } else if ("contains" in l) {
        return l.contains(t);
      } else if (l.compareDocumentPosition) {
        return !!(l.compareDocumentPosition(t) & 16);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function Ji(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = ye(l.document); t instanceof l.HTMLIFrameElement;) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = false;
      }
      if (a) {
        l = t.contentWindow;
      } else {
        break;
      }
      t = ye(l.document);
    }
    return t;
  }
  function ef(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var dm = at && "documentMode" in document && document.documentMode <= 11;
  var Ua = null;
  var nf = null;
  var bu = null;
  var ff = false;
  function Wi(l, t, a) {
    var u = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    if (!ff && Ua != null && Ua === ye(u)) {
      u = Ua;
      if ("selectionStart" in u && ef(u)) {
        u = {
          start: u.selectionStart,
          end: u.selectionEnd
        };
      } else {
        u = (u.ownerDocument && u.ownerDocument.defaultView || window).getSelection();
        u = {
          anchorNode: u.anchorNode,
          anchorOffset: u.anchorOffset,
          focusNode: u.focusNode,
          focusOffset: u.focusOffset
        };
      }
      if (!bu || !su(bu, u)) {
        bu = u;
        u = nn(nf, "onSelect");
        if (u.length > 0) {
          t = new ge("onSelect", "select", null, t, a);
          l.push({
            event: t,
            listeners: u
          });
          t.target = Ua;
        }
      }
    }
  }
  function It(l, t) {
    var a = {};
    a[l.toLowerCase()] = t.toLowerCase();
    a["Webkit" + l] = "webkit" + t;
    a["Moz" + l] = "moz" + t;
    return a;
  }
  var Ha = {
    animationend: It("Animation", "AnimationEnd"),
    animationiteration: It("Animation", "AnimationIteration"),
    animationstart: It("Animation", "AnimationStart"),
    transitionrun: It("Transition", "TransitionRun"),
    transitionstart: It("Transition", "TransitionStart"),
    transitioncancel: It("Transition", "TransitionCancel"),
    transitionend: It("Transition", "TransitionEnd")
  };
  var cf = {};
  var $i = {};
  if (at) {
    $i = document.createElement("div").style;
    if (!("AnimationEvent" in window)) {
      delete Ha.animationend.animation;
      delete Ha.animationiteration.animation;
      delete Ha.animationstart.animation;
    }
    if (!("TransitionEvent" in window)) {
      delete Ha.transitionend.transition;
    }
  }
  function Pt(l) {
    if (cf[l]) {
      return cf[l];
    }
    if (!Ha[l]) {
      return l;
    }
    var t = Ha[l];
    var a;
    for (a in t) {
      if (t.hasOwnProperty(a) && a in $i) {
        return cf[l] = t[a];
      }
    }
    return l;
  }
  var wi = Pt("animationend");
  var Fi = Pt("animationiteration");
  var ki = Pt("animationstart");
  var Sm = Pt("transitionrun");
  var gm = Pt("transitionstart");
  var zm = Pt("transitioncancel");
  var ri = Pt("transitionend");
  var Ii = new Map();
  var vf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  vf.push("scrollEnd");
  function xl(l, t) {
    Ii.set(l, t);
    kt(t, [l]);
  }
  var be = typeof reportError == "function" ? reportError : function (l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) {
        return;
      }
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  };
  var Gl = [];
  var Na = 0;
  var yf = 0;
  function Ae() {
    for (var l = Na, t = yf = Na = 0; t < l;) {
      var a = Gl[t];
      Gl[t++] = null;
      var u = Gl[t];
      Gl[t++] = null;
      var e = Gl[t];
      Gl[t++] = null;
      var n = Gl[t];
      Gl[t++] = null;
      if (u !== null && e !== null) {
        var f = u.pending;
        if (f === null) {
          e.next = e;
        } else {
          e.next = f.next;
          f.next = e;
        }
        u.pending = e;
      }
      if (n !== 0) {
        Pi(a, e, n);
      }
    }
  }
  function Te(l, t, a, u) {
    Gl[Na++] = l;
    Gl[Na++] = t;
    Gl[Na++] = a;
    Gl[Na++] = u;
    yf |= u;
    l.lanes |= u;
    l = l.alternate;
    if (l !== null) {
      l.lanes |= u;
    }
  }
  function mf(l, t, a, u) {
    Te(l, t, a, u);
    return Ee(l);
  }
  function la(l, t) {
    Te(l, null, null, t);
    return Ee(l);
  }
  function Pi(l, t, a) {
    l.lanes |= a;
    var u = l.alternate;
    if (u !== null) {
      u.lanes |= a;
    }
    var e = false;
    for (var n = l.return; n !== null;) {
      n.childLanes |= a;
      u = n.alternate;
      if (u !== null) {
        u.childLanes |= a;
      }
      if (n.tag === 22) {
        l = n.stateNode;
        if (l !== null && !(l._visibility & 1)) {
          e = true;
        }
      }
      l = n;
      n = n.return;
    }
    if (l.tag === 3) {
      n = l.stateNode;
      if (e && t !== null) {
        e = 31 - Ol(a);
        l = n.hiddenUpdates;
        u = l[e];
        if (u === null) {
          l[e] = [t];
        } else {
          u.push(t);
        }
        t.lane = a | 536870912;
      }
      return n;
    } else {
      return null;
    }
  }
  function Ee(l) {
    if (ju > 50) {
      ju = 0;
      Tc = null;
      throw Error(g(185));
    }
    for (var t = l.return; t !== null;) {
      l = t;
      t = l.return;
    }
    if (l.tag === 3) {
      return l.stateNode;
    } else {
      return null;
    }
  }
  var _a = {};
  function sm(l, t, a, u) {
    this.tag = l;
    this.key = a;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.refCleanup = this.ref = null;
    this.pendingProps = t;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = u;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function Ul(l, t, a, u) {
    return new sm(l, t, a, u);
  }
  function hf(l) {
    l = l.prototype;
    return !!l && !!l.isReactComponent;
  }
  function ut(l, t) {
    var a = l.alternate;
    if (a === null) {
      a = Ul(l.tag, t, l.key, l.mode);
      a.elementType = l.elementType;
      a.type = l.type;
      a.stateNode = l.stateNode;
      a.alternate = l;
      l.alternate = a;
    } else {
      a.pendingProps = t;
      a.type = l.type;
      a.flags = 0;
      a.subtreeFlags = 0;
      a.deletions = null;
    }
    a.flags = l.flags & 65011712;
    a.childLanes = l.childLanes;
    a.lanes = l.lanes;
    a.child = l.child;
    a.memoizedProps = l.memoizedProps;
    a.memoizedState = l.memoizedState;
    a.updateQueue = l.updateQueue;
    t = l.dependencies;
    a.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    };
    a.sibling = l.sibling;
    a.index = l.index;
    a.ref = l.ref;
    a.refCleanup = l.refCleanup;
    return a;
  }
  function l0(l, t) {
    l.flags &= 65011714;
    var a = l.alternate;
    if (a === null) {
      l.childLanes = 0;
      l.lanes = t;
      l.child = null;
      l.subtreeFlags = 0;
      l.memoizedProps = null;
      l.memoizedState = null;
      l.updateQueue = null;
      l.dependencies = null;
      l.stateNode = null;
    } else {
      l.childLanes = a.childLanes;
      l.lanes = a.lanes;
      l.child = a.child;
      l.subtreeFlags = 0;
      l.deletions = null;
      l.memoizedProps = a.memoizedProps;
      l.memoizedState = a.memoizedState;
      l.updateQueue = a.updateQueue;
      l.type = a.type;
      t = a.dependencies;
      l.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
      };
    }
    return l;
  }
  function Me(l, t, a, u, e, n) {
    var f = 0;
    u = l;
    if (typeof l == "function") {
      if (hf(l)) {
        f = 1;
      }
    } else if (typeof l == "string") {
      f = Mh(l, a, Wl.current) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    } else {
      l: switch (l) {
        case Hn:
          l = Ul(31, a, t, e);
          l.elementType = Hn;
          l.lanes = n;
          return l;
        case da:
          return ta(a.children, e, n, t);
        case rc:
          f = 8;
          e |= 24;
          break;
        case Mn:
          l = Ul(12, a, t, e | 2);
          l.elementType = Mn;
          l.lanes = n;
          return l;
        case On:
          l = Ul(13, a, t, e);
          l.elementType = On;
          l.lanes = n;
          return l;
        case Dn:
          l = Ul(19, a, t, e);
          l.elementType = Dn;
          l.lanes = n;
          return l;
        default:
          if (typeof l == "object" && l !== null) {
            switch (l.$$typeof) {
              case Pl:
                f = 10;
                break l;
              case Ic:
                f = 9;
                break l;
              case on:
                f = 11;
                break l;
              case Un:
                f = 14;
                break l;
              case At:
                f = 16;
                u = null;
                break l;
            }
          }
          f = 29;
          a = Error(g(130, l === null ? "null" : typeof l, ""));
          u = null;
      }
    }
    t = Ul(f, a, t, e);
    t.elementType = l;
    t.type = u;
    t.lanes = n;
    return t;
  }
  function ta(l, t, a, u) {
    l = Ul(7, l, u, t);
    l.lanes = a;
    return l;
  }
  function df(l, t, a) {
    l = Ul(6, l, null, t);
    l.lanes = a;
    return l;
  }
  function t0(l) {
    var t = Ul(18, null, null, 0);
    t.stateNode = l;
    return t;
  }
  function Sf(l, t, a) {
    t = Ul(4, l.children !== null ? l.children : [], l.key, t);
    t.lanes = a;
    t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    };
    return t;
  }
  var a0 = new WeakMap();
  function Ql(l, t) {
    if (typeof l == "object" && l !== null) {
      var a = a0.get(l);
      if (a !== undefined) {
        return a;
      } else {
        t = {
          value: l,
          source: t,
          stack: ti(t)
        };
        a0.set(l, t);
        return t;
      }
    }
    return {
      value: l,
      source: t,
      stack: ti(t)
    };
  }
  var Ba = [];
  var qa = 0;
  var oe = null;
  var Au = 0;
  var Cl = [];
  var Zl = 0;
  var Ot = null;
  var $l = 1;
  var wl = "";
  function et(l, t) {
    Ba[qa++] = Au;
    Ba[qa++] = oe;
    oe = l;
    Au = t;
  }
  function u0(l, t, a) {
    Cl[Zl++] = $l;
    Cl[Zl++] = wl;
    Cl[Zl++] = Ot;
    Ot = l;
    var u = $l;
    l = wl;
    var e = 32 - Ol(u) - 1;
    u &= ~(1 << e);
    a += 1;
    var n = 32 - Ol(t) + e;
    if (n > 30) {
      var f = e - e % 5;
      n = (u & (1 << f) - 1).toString(32);
      u >>= f;
      e -= f;
      $l = 1 << 32 - Ol(t) + e | a << e | u;
      wl = n + l;
    } else {
      $l = 1 << n | a << e | u;
      wl = l;
    }
  }
  function gf(l) {
    if (l.return !== null) {
      et(l, 1);
      u0(l, 1, 0);
    }
  }
  function zf(l) {
    while (l === oe) {
      oe = Ba[--qa];
      Ba[qa] = null;
      Au = Ba[--qa];
      Ba[qa] = null;
    }
    while (l === Ot) {
      Ot = Cl[--Zl];
      Cl[Zl] = null;
      wl = Cl[--Zl];
      Cl[Zl] = null;
      $l = Cl[--Zl];
      Cl[Zl] = null;
    }
  }
  function e0(l, t) {
    Cl[Zl++] = $l;
    Cl[Zl++] = wl;
    Cl[Zl++] = Ot;
    $l = t.id;
    wl = t.overflow;
    Ot = l;
  }
  var vl = null;
  var L = null;
  var q = false;
  var Dt = null;
  var Rl = false;
  var sf = Error(g(519));
  function Ut(l) {
    var t = Error(g(418, arguments.length > 1 && arguments[1] !== undefined && arguments[1] ? "text" : "HTML", ""));
    Tu(Ql(t, l));
    throw sf;
  }
  function n0(l) {
    var t = l.stateNode;
    var a = l.type;
    var u = l.memoizedProps;
    t[il] = l;
    t[Sl] = u;
    switch (a) {
      case "dialog":
        N("cancel", t);
        N("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        N("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < xu.length; a++) {
          N(xu[a], t);
        }
        break;
      case "source":
        N("error", t);
        break;
      case "img":
      case "image":
      case "link":
        N("error", t);
        N("load", t);
        break;
      case "details":
        N("toggle", t);
        break;
      case "input":
        N("invalid", t);
        bi(t, u.value, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name, true);
        break;
      case "select":
        N("invalid", t);
        break;
      case "textarea":
        N("invalid", t);
        Ti(t, u.value, u.defaultValue, u.children);
    }
    a = u.children;
    if (typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || u.suppressHydrationWarning === true || Mv(t.textContent, a)) {
      if (u.popover != null) {
        N("beforetoggle", t);
        N("toggle", t);
      }
      if (u.onScroll != null) {
        N("scroll", t);
      }
      if (u.onScrollEnd != null) {
        N("scrollend", t);
      }
      if (u.onClick != null) {
        t.onclick = tt;
      }
      t = true;
    } else {
      t = false;
    }
    if (!t) {
      Ut(l, true);
    }
  }
  function f0(l) {
    for (vl = l.return; vl;) {
      switch (vl.tag) {
        case 5:
        case 31:
        case 13:
          Rl = false;
          return;
        case 27:
        case 3:
          Rl = true;
          return;
        default:
          vl = vl.return;
      }
    }
  }
  function Ya(l) {
    if (l !== vl) {
      return false;
    }
    if (!q) {
      f0(l);
      q = true;
      return false;
    }
    var t = l.tag;
    var a;
    if (a = t !== 3 && t !== 27) {
      if (a = t === 5) {
        a = l.type;
        a = a === "form" || a === "button" || Qc(l.type, l.memoizedProps);
      }
      a = !a;
    }
    if (a && L) {
      Ut(l);
    }
    f0(l);
    if (t === 13) {
      l = l.memoizedState;
      l = l !== null ? l.dehydrated : null;
      if (!l) {
        throw Error(g(317));
      }
      L = qv(l);
    } else if (t === 31) {
      l = l.memoizedState;
      l = l !== null ? l.dehydrated : null;
      if (!l) {
        throw Error(g(317));
      }
      L = qv(l);
    } else if (t === 27) {
      t = L;
      if (jt(l.type)) {
        l = jc;
        jc = null;
        L = l;
      } else {
        L = t;
      }
    } else {
      L = vl ? jl(l.stateNode.nextSibling) : null;
    }
    return true;
  }
  function aa() {
    L = vl = null;
    q = false;
  }
  function bf() {
    var l = Dt;
    if (l !== null) {
      if (Al === null) {
        Al = l;
      } else {
        Al.push.apply(Al, l);
      }
      Dt = null;
    }
    return l;
  }
  function Tu(l) {
    if (Dt === null) {
      Dt = [l];
    } else {
      Dt.push(l);
    }
  }
  var Af = Jl(null);
  var ua = null;
  var nt = null;
  function Ht(l, t, a) {
    K(Af, t._currentValue);
    t._currentValue = a;
  }
  function ft(l) {
    l._currentValue = Af.current;
    el(Af);
  }
  function Tf(l, t, a) {
    while (l !== null) {
      var u = l.alternate;
      if ((l.childLanes & t) !== t) {
        l.childLanes |= t;
        if (u !== null) {
          u.childLanes |= t;
        }
      } else if (u !== null && (u.childLanes & t) !== t) {
        u.childLanes |= t;
      }
      if (l === a) {
        break;
      }
      l = l.return;
    }
  }
  function Ef(l, t, a, u) {
    var e = l.child;
    for (e !== null && (e.return = l); e !== null;) {
      var n = e.dependencies;
      if (n !== null) {
        var f = e.child;
        n = n.firstContext;
        l: while (n !== null) {
          var c = n;
          n = e;
          for (var i = 0; i < t.length; i++) {
            if (c.context === t[i]) {
              n.lanes |= a;
              c = n.alternate;
              if (c !== null) {
                c.lanes |= a;
              }
              Tf(n.return, a, l);
              if (!u) {
                f = null;
              }
              break l;
            }
          }
          n = c.next;
        }
      } else if (e.tag === 18) {
        f = e.return;
        if (f === null) {
          throw Error(g(341));
        }
        f.lanes |= a;
        n = f.alternate;
        if (n !== null) {
          n.lanes |= a;
        }
        Tf(f, a, l);
        f = null;
      } else {
        f = e.child;
      }
      if (f !== null) {
        f.return = e;
      } else {
        for (f = e; f !== null;) {
          if (f === l) {
            f = null;
            break;
          }
          e = f.sibling;
          if (e !== null) {
            e.return = f.return;
            f = e;
            break;
          }
          f = f.return;
        }
      }
      e = f;
    }
  }
  function Xa(l, t, a, u) {
    l = null;
    for (var e = t, n = false; e !== null;) {
      if (!n) {
        if ((e.flags & 524288) !== 0) {
          n = true;
        } else if ((e.flags & 262144) !== 0) {
          break;
        }
      }
      if (e.tag === 10) {
        var f = e.alternate;
        if (f === null) {
          throw Error(g(387));
        }
        f = f.memoizedProps;
        if (f !== null) {
          var c = e.type;
          if (!Dl(e.pendingProps.value, f.value)) {
            if (l !== null) {
              l.push(c);
            } else {
              l = [c];
            }
          }
        }
      } else if (e === le.current) {
        f = e.alternate;
        if (f === null) {
          throw Error(g(387));
        }
        if (f.memoizedState.memoizedState !== e.memoizedState.memoizedState) {
          if (l !== null) {
            l.push($u);
          } else {
            l = [$u];
          }
        }
      }
      e = e.return;
    }
    if (l !== null) {
      Ef(t, l, a, u);
    }
    t.flags |= 262144;
  }
  function Oe(l) {
    for (l = l.firstContext; l !== null;) {
      if (!Dl(l.context._currentValue, l.memoizedValue)) {
        return true;
      }
      l = l.next;
    }
    return false;
  }
  function ea(l) {
    ua = l;
    nt = null;
    l = l.dependencies;
    if (l !== null) {
      l.firstContext = null;
    }
  }
  function yl(l) {
    return c0(ua, l);
  }
  function De(l, t) {
    if (ua === null) {
      ea(l);
    }
    return c0(l, t);
  }
  function c0(l, t) {
    var a = t._currentValue;
    t = {
      context: t,
      memoizedValue: a,
      next: null
    };
    if (nt === null) {
      if (l === null) {
        throw Error(g(308));
      }
      nt = t;
      l.dependencies = {
        lanes: 0,
        firstContext: t
      };
      l.flags |= 524288;
    } else {
      nt = nt.next = t;
    }
    return a;
  }
  var bm = typeof AbortController !== "undefined" ? AbortController : function () {
    var l = [];
    var t = this.signal = {
      aborted: false,
      addEventListener: function (a, u) {
        l.push(u);
      }
    };
    this.abort = function () {
      t.aborted = true;
      l.forEach(function (a) {
        return a();
      });
    };
  };
  var Am = E.unstable_scheduleCallback;
  var Tm = E.unstable_NormalPriority;
  var I = {
    $$typeof: Pl,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Mf() {
    return {
      controller: new bm(),
      data: new Map(),
      refCount: 0
    };
  }
  function Eu(l) {
    l.refCount--;
    if (l.refCount === 0) {
      Am(Tm, function () {
        l.controller.abort();
      });
    }
  }
  var Mu = null;
  var of = 0;
  var Ga = 0;
  var Qa = null;
  function Em(l, t) {
    if (Mu === null) {
      var a = Mu = [];
      of = 0;
      Ga = Uc();
      Qa = {
        status: "pending",
        value: undefined,
        then: function (u) {
          a.push(u);
        }
      };
    }
    of++;
    t.then(i0, i0);
    return t;
  }
  function i0() {
    if (--of === 0 && Mu !== null) {
      if (Qa !== null) {
        Qa.status = "fulfilled";
      }
      var l = Mu;
      Mu = null;
      Ga = 0;
      Qa = null;
      for (var t = 0; t < l.length; t++) {
        (0, l[t])();
      }
    }
  }
  function Mm(l, t) {
    var a = [];
    var u = {
      status: "pending",
      value: null,
      reason: null,
      then: function (e) {
        a.push(e);
      }
    };
    l.then(function () {
      u.status = "fulfilled";
      u.value = t;
      for (var e = 0; e < a.length; e++) {
        (0, a[e])(t);
      }
    }, function (e) {
      u.status = "rejected";
      u.reason = e;
      e = 0;
      for (; e < a.length; e++) {
        (0, a[e])(undefined);
      }
    });
    return u;
  }
  var v0 = O.S;
  O.S = function (l, t) {
    W1 = Ml();
    if (typeof t == "object" && t !== null && typeof t.then == "function") {
      Em(l, t);
    }
    if (v0 !== null) {
      v0(l, t);
    }
  };
  var na = Jl(null);
  function Of() {
    var l = na.current;
    if (l !== null) {
      return l;
    } else {
      return x.pooledCache;
    }
  }
  function Ue(l, t) {
    if (t === null) {
      K(na, na.current);
    } else {
      K(na, t.pool);
    }
  }
  function y0() {
    var l = Of();
    if (l === null) {
      return null;
    } else {
      return {
        parent: I._currentValue,
        pool: l
      };
    }
  }
  var Ca = Error(g(460));
  var Df = Error(g(474));
  var He = Error(g(542));
  var Ne = {
    then: function () {}
  };
  function m0(l) {
    l = l.status;
    return l === "fulfilled" || l === "rejected";
  }
  function h0(l, t, a) {
    a = l[a];
    if (a === undefined) {
      l.push(t);
    } else if (a !== t) {
      t.then(tt, tt);
      t = a;
    }
    switch (t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        l = t.reason;
        S0(l);
        throw l;
      default:
        if (typeof t.status == "string") {
          t.then(tt, tt);
        } else {
          l = x;
          if (l !== null && l.shellSuspendCounter > 100) {
            throw Error(g(482));
          }
          l = t;
          l.status = "pending";
          l.then(function (u) {
            if (t.status === "pending") {
              var e = t;
              e.status = "fulfilled";
              e.value = u;
            }
          }, function (u) {
            if (t.status === "pending") {
              var e = t;
              e.status = "rejected";
              e.reason = u;
            }
          });
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            l = t.reason;
            S0(l);
            throw l;
        }
        ca = t;
        throw Ca;
    }
  }
  function fa(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (ca = a, Ca) : a;
    }
  }
  var ca = null;
  function d0() {
    if (ca === null) {
      throw Error(g(459));
    }
    var l = ca;
    ca = null;
    return l;
  }
  function S0(l) {
    if (l === Ca || l === He) {
      throw Error(g(483));
    }
  }
  var Za = null;
  var ou = 0;
  function _e(l) {
    var t = ou;
    ou += 1;
    if (Za === null) {
      Za = [];
    }
    return h0(Za, l, t);
  }
  function Ou(l, t) {
    t = t.props.ref;
    l.ref = t !== undefined ? t : null;
  }
  function Be(l, t) {
    throw t.$$typeof === Pu ? Error(g(525)) : (l = Object.prototype.toString.call(t), Error(g(31, l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l)));
  }
  function g0(l) {
    function t(y, v) {
      if (l) {
        var m = y.deletions;
        if (m === null) {
          y.deletions = [v];
          y.flags |= 16;
        } else {
          m.push(v);
        }
      }
    }
    function a(y, v) {
      if (!l) {
        return null;
      }
      while (v !== null) {
        t(y, v);
        v = v.sibling;
      }
      return null;
    }
    function u(y) {
      var v = new Map();
      for (; y !== null;) {
        if (y.key !== null) {
          v.set(y.key, y);
        } else {
          v.set(y.index, y);
        }
        y = y.sibling;
      }
      return v;
    }
    function e(y, v) {
      y = ut(y, v);
      y.index = 0;
      y.sibling = null;
      return y;
    }
    function n(y, v, m) {
      y.index = m;
      if (l) {
        m = y.alternate;
        if (m !== null) {
          m = m.index;
          if (m < v) {
            y.flags |= 67108866;
            return v;
          } else {
            return m;
          }
        } else {
          y.flags |= 67108866;
          return v;
        }
      } else {
        y.flags |= 1048576;
        return v;
      }
    }
    function f(y) {
      if (l && y.alternate === null) {
        y.flags |= 67108866;
      }
      return y;
    }
    function c(y, v, m, s) {
      if (v === null || v.tag !== 6) {
        v = df(m, y.mode, s);
        v.return = y;
        return v;
      } else {
        v = e(v, m);
        v.return = y;
        return v;
      }
    }
    function i(y, v, m, s) {
      var M = m.type;
      if (M === da) {
        return z(y, v, m.props.children, s, m.key);
      } else if (v !== null && (v.elementType === M || typeof M == "object" && M !== null && M.$$typeof === At && fa(M) === v.type)) {
        v = e(v, m.props);
        Ou(v, m);
        v.return = y;
        return v;
      } else {
        v = Me(m.type, m.key, m.props, null, y.mode, s);
        Ou(v, m);
        v.return = y;
        return v;
      }
    }
    function h(y, v, m, s) {
      if (v === null || v.tag !== 4 || v.stateNode.containerInfo !== m.containerInfo || v.stateNode.implementation !== m.implementation) {
        v = Sf(m, y.mode, s);
        v.return = y;
        return v;
      } else {
        v = e(v, m.children || []);
        v.return = y;
        return v;
      }
    }
    function z(y, v, m, s, M) {
      if (v === null || v.tag !== 7) {
        v = ta(m, y.mode, s, M);
        v.return = y;
        return v;
      } else {
        v = e(v, m);
        v.return = y;
        return v;
      }
    }
    function b(y, v, m) {
      if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint") {
        v = df("" + v, y.mode, m);
        v.return = y;
        return v;
      }
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case Il:
            m = Me(v.type, v.key, v.props, null, y.mode, m);
            Ou(m, v);
            m.return = y;
            return m;
          case El:
            v = Sf(v, y.mode, m);
            v.return = y;
            return v;
          case At:
            v = fa(v);
            return b(y, v, m);
        }
        if (uu(v) || au(v)) {
          v = ta(v, y.mode, m, null);
          v.return = y;
          return v;
        }
        if (typeof v.then == "function") {
          return b(y, _e(v), m);
        }
        if (v.$$typeof === Pl) {
          return b(y, De(y, v), m);
        }
        Be(y, v);
      }
      return null;
    }
    function d(y, v, m, s) {
      var M = v !== null ? v.key : null;
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint") {
        if (M !== null) {
          return null;
        } else {
          return c(y, v, "" + m, s);
        }
      }
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case Il:
            if (m.key === M) {
              return i(y, v, m, s);
            } else {
              return null;
            }
          case El:
            if (m.key === M) {
              return h(y, v, m, s);
            } else {
              return null;
            }
          case At:
            m = fa(m);
            return d(y, v, m, s);
        }
        if (uu(m) || au(m)) {
          if (M !== null) {
            return null;
          } else {
            return z(y, v, m, s, null);
          }
        }
        if (typeof m.then == "function") {
          return d(y, v, _e(m), s);
        }
        if (m.$$typeof === Pl) {
          return d(y, v, De(y, m), s);
        }
        Be(y, m);
      }
      return null;
    }
    function S(y, v, m, s, M) {
      if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint") {
        y = y.get(m) || null;
        return c(v, y, "" + s, M);
      }
      if (typeof s == "object" && s !== null) {
        switch (s.$$typeof) {
          case Il:
            y = y.get(s.key === null ? m : s.key) || null;
            return i(v, y, s, M);
          case El:
            y = y.get(s.key === null ? m : s.key) || null;
            return h(v, y, s, M);
          case At:
            s = fa(s);
            return S(y, v, m, s, M);
        }
        if (uu(s) || au(s)) {
          y = y.get(m) || null;
          return z(v, y, s, M, null);
        }
        if (typeof s.then == "function") {
          return S(y, v, m, _e(s), M);
        }
        if (s.$$typeof === Pl) {
          return S(y, v, m, De(v, s), M);
        }
        Be(v, s);
      }
      return null;
    }
    function A(y, v, m, s) {
      var M = null;
      var Y = null;
      for (var T = v, U = v = 0, B = null; T !== null && U < m.length; U++) {
        if (T.index > U) {
          B = T;
          T = null;
        } else {
          B = T.sibling;
        }
        var X = d(y, T, m[U], s);
        if (X === null) {
          if (T === null) {
            T = B;
          }
          break;
        }
        if (l && T && X.alternate === null) {
          t(y, T);
        }
        v = n(X, v, U);
        if (Y === null) {
          M = X;
        } else {
          Y.sibling = X;
        }
        Y = X;
        T = B;
      }
      if (U === m.length) {
        a(y, T);
        if (q) {
          et(y, U);
        }
        return M;
      }
      if (T === null) {
        for (; U < m.length; U++) {
          T = b(y, m[U], s);
          if (T !== null) {
            v = n(T, v, U);
            if (Y === null) {
              M = T;
            } else {
              Y.sibling = T;
            }
            Y = T;
          }
        }
        if (q) {
          et(y, U);
        }
        return M;
      }
      for (T = u(T); U < m.length; U++) {
        B = S(T, y, U, m[U], s);
        if (B !== null) {
          if (l && B.alternate !== null) {
            T.delete(B.key === null ? U : B.key);
          }
          v = n(B, v, U);
          if (Y === null) {
            M = B;
          } else {
            Y.sibling = B;
          }
          Y = B;
        }
      }
      if (l) {
        T.forEach(function (Jt) {
          return t(y, Jt);
        });
      }
      if (q) {
        et(y, U);
      }
      return M;
    }
    function o(y, v, m, s) {
      if (m == null) {
        throw Error(g(151));
      }
      var M = null;
      var Y = null;
      for (var T = v, U = v = 0, B = null, X = m.next(); T !== null && !X.done; U++, X = m.next()) {
        if (T.index > U) {
          B = T;
          T = null;
        } else {
          B = T.sibling;
        }
        var Jt = d(y, T, X.value, s);
        if (Jt === null) {
          if (T === null) {
            T = B;
          }
          break;
        }
        if (l && T && Jt.alternate === null) {
          t(y, T);
        }
        v = n(Jt, v, U);
        if (Y === null) {
          M = Jt;
        } else {
          Y.sibling = Jt;
        }
        Y = Jt;
        T = B;
      }
      if (X.done) {
        a(y, T);
        if (q) {
          et(y, U);
        }
        return M;
      }
      if (T === null) {
        for (; !X.done; U++, X = m.next()) {
          X = b(y, X.value, s);
          if (X !== null) {
            v = n(X, v, U);
            if (Y === null) {
              M = X;
            } else {
              Y.sibling = X;
            }
            Y = X;
          }
        }
        if (q) {
          et(y, U);
        }
        return M;
      }
      for (T = u(T); !X.done; U++, X = m.next()) {
        X = S(T, y, U, X.value, s);
        if (X !== null) {
          if (l && X.alternate !== null) {
            T.delete(X.key === null ? U : X.key);
          }
          v = n(X, v, U);
          if (Y === null) {
            M = X;
          } else {
            Y.sibling = X;
          }
          Y = X;
        }
      }
      if (l) {
        T.forEach(function (Xh) {
          return t(y, Xh);
        });
      }
      if (q) {
        et(y, U);
      }
      return M;
    }
    function V(y, v, m, s) {
      if (typeof m == "object" && m !== null && m.type === da && m.key === null) {
        m = m.props.children;
      }
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case Il:
            l: {
              var M = m.key;
              for (; v !== null;) {
                if (v.key === M) {
                  M = m.type;
                  if (M === da) {
                    if (v.tag === 7) {
                      a(y, v.sibling);
                      s = e(v, m.props.children);
                      s.return = y;
                      y = s;
                      break l;
                    }
                  } else if (v.elementType === M || typeof M == "object" && M !== null && M.$$typeof === At && fa(M) === v.type) {
                    a(y, v.sibling);
                    s = e(v, m.props);
                    Ou(s, m);
                    s.return = y;
                    y = s;
                    break l;
                  }
                  a(y, v);
                  break;
                } else {
                  t(y, v);
                }
                v = v.sibling;
              }
              if (m.type === da) {
                s = ta(m.props.children, y.mode, s, m.key);
                s.return = y;
                y = s;
              } else {
                s = Me(m.type, m.key, m.props, null, y.mode, s);
                Ou(s, m);
                s.return = y;
                y = s;
              }
            }
            return f(y);
          case El:
            l: {
              for (M = m.key; v !== null;) {
                if (v.key === M) {
                  if (v.tag === 4 && v.stateNode.containerInfo === m.containerInfo && v.stateNode.implementation === m.implementation) {
                    a(y, v.sibling);
                    s = e(v, m.children || []);
                    s.return = y;
                    y = s;
                    break l;
                  } else {
                    a(y, v);
                    break;
                  }
                } else {
                  t(y, v);
                }
                v = v.sibling;
              }
              s = Sf(m, y.mode, s);
              s.return = y;
              y = s;
            }
            return f(y);
          case At:
            m = fa(m);
            return V(y, v, m, s);
        }
        if (uu(m)) {
          return A(y, v, m, s);
        }
        if (au(m)) {
          M = au(m);
          if (typeof M != "function") {
            throw Error(g(150));
          }
          m = M.call(m);
          return o(y, v, m, s);
        }
        if (typeof m.then == "function") {
          return V(y, v, _e(m), s);
        }
        if (m.$$typeof === Pl) {
          return V(y, v, De(y, m), s);
        }
        Be(y, m);
      }
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint") {
        m = "" + m;
        if (v !== null && v.tag === 6) {
          a(y, v.sibling);
          s = e(v, m);
          s.return = y;
          y = s;
        } else {
          a(y, v);
          s = df(m, y.mode, s);
          s.return = y;
          y = s;
        }
        return f(y);
      } else {
        return a(y, v);
      }
    }
    return function (y, v, m, s) {
      try {
        ou = 0;
        var M = V(y, v, m, s);
        Za = null;
        return M;
      } catch (T) {
        if (T === Ca || T === He) {
          throw T;
        }
        var Y = Ul(29, T, null, y.mode);
        Y.lanes = s;
        Y.return = y;
        return Y;
      }
    };
  }
  var ia = g0(true);
  var z0 = g0(false);
  var Nt = false;
  function Uf(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        lanes: 0,
        hiddenCallbacks: null
      },
      callbacks: null
    };
  }
  function Hf(l, t) {
    l = l.updateQueue;
    if (t.updateQueue === l) {
      t.updateQueue = {
        baseState: l.baseState,
        firstBaseUpdate: l.firstBaseUpdate,
        lastBaseUpdate: l.lastBaseUpdate,
        shared: l.shared,
        callbacks: null
      };
    }
  }
  function _t(l) {
    return {
      lane: l,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }
  function Bt(l, t, a) {
    var u = l.updateQueue;
    if (u === null) {
      return null;
    }
    u = u.shared;
    if ((Q & 2) !== 0) {
      var e = u.pending;
      if (e === null) {
        t.next = t;
      } else {
        t.next = e.next;
        e.next = t;
      }
      u.pending = t;
      t = Ee(l);
      Pi(l, null, a);
      return t;
    }
    Te(l, u, t, a);
    return Ee(l);
  }
  function Du(l, t, a) {
    t = t.updateQueue;
    if (t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var u = t.lanes;
      u &= l.pendingLanes;
      a |= u;
      t.lanes = a;
      ci(l, a);
    }
  }
  function Nf(l, t) {
    var a = l.updateQueue;
    var u = l.alternate;
    if (u !== null && (u = u.updateQueue, a === u)) {
      var e = null;
      var n = null;
      a = a.firstBaseUpdate;
      if (a !== null) {
        do {
          var f = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          if (n === null) {
            e = n = f;
          } else {
            n = n.next = f;
          }
          a = a.next;
        } while (a !== null);
        if (n === null) {
          e = n = t;
        } else {
          n = n.next = t;
        }
      } else {
        e = n = t;
      }
      a = {
        baseState: u.baseState,
        firstBaseUpdate: e,
        lastBaseUpdate: n,
        shared: u.shared,
        callbacks: u.callbacks
      };
      l.updateQueue = a;
      return;
    }
    l = a.lastBaseUpdate;
    if (l === null) {
      a.firstBaseUpdate = t;
    } else {
      l.next = t;
    }
    a.lastBaseUpdate = t;
  }
  var _f = false;
  function Uu() {
    if (_f) {
      var l = Qa;
      if (l !== null) {
        throw l;
      }
    }
  }
  function Hu(l, t, a, u) {
    _f = false;
    var e = l.updateQueue;
    Nt = false;
    var n = e.firstBaseUpdate;
    var f = e.lastBaseUpdate;
    var c = e.shared.pending;
    if (c !== null) {
      e.shared.pending = null;
      var i = c;
      var h = i.next;
      i.next = null;
      if (f === null) {
        n = h;
      } else {
        f.next = h;
      }
      f = i;
      var z = l.alternate;
      if (z !== null) {
        z = z.updateQueue;
        c = z.lastBaseUpdate;
        if (c !== f) {
          if (c === null) {
            z.firstBaseUpdate = h;
          } else {
            c.next = h;
          }
          z.lastBaseUpdate = i;
        }
      }
    }
    if (n !== null) {
      var b = e.baseState;
      f = 0;
      z = h = i = null;
      c = n;
      do {
        var d = c.lane & -536870913;
        var S = d !== c.lane;
        if (S ? (_ & d) === d : (u & d) === d) {
          if (d !== 0 && d === Ga) {
            _f = true;
          }
          if (z !== null) {
            z = z.next = {
              lane: 0,
              tag: c.tag,
              payload: c.payload,
              callback: null,
              next: null
            };
          }
          l: {
            var A = l;
            var o = c;
            d = t;
            var V = a;
            switch (o.tag) {
              case 1:
                A = o.payload;
                if (typeof A == "function") {
                  b = A.call(V, b, d);
                  break l;
                }
                b = A;
                break l;
              case 3:
                A.flags = A.flags & -65537 | 128;
              case 0:
                A = o.payload;
                d = typeof A == "function" ? A.call(V, b, d) : A;
                if (d == null) {
                  break l;
                }
                b = C({}, b, d);
                break l;
              case 2:
                Nt = true;
            }
          }
          d = c.callback;
          if (d !== null) {
            l.flags |= 64;
            if (S) {
              l.flags |= 8192;
            }
            S = e.callbacks;
            if (S === null) {
              e.callbacks = [d];
            } else {
              S.push(d);
            }
          }
        } else {
          S = {
            lane: d,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          };
          if (z === null) {
            h = z = S;
            i = b;
          } else {
            z = z.next = S;
          }
          f |= d;
        }
        c = c.next;
        if (c === null) {
          c = e.shared.pending;
          if (c === null) {
            break;
          }
          S = c;
          c = S.next;
          S.next = null;
          e.lastBaseUpdate = S;
          e.shared.pending = null;
        }
      } while (true);
      if (z === null) {
        i = b;
      }
      e.baseState = i;
      e.firstBaseUpdate = h;
      e.lastBaseUpdate = z;
      if (n === null) {
        e.shared.lanes = 0;
      }
      Qt |= f;
      l.lanes = f;
      l.memoizedState = b;
    }
  }
  function s0(l, t) {
    if (typeof l != "function") {
      throw Error(g(191, l));
    }
    l.call(t);
  }
  function b0(l, t) {
    var a = l.callbacks;
    if (a !== null) {
      l.callbacks = null;
      l = 0;
      for (; l < a.length; l++) {
        s0(a[l], t);
      }
    }
  }
  var Ra = Jl(null);
  var qe = Jl(0);
  function A0(l, t) {
    l = gt;
    K(qe, l);
    K(Ra, t);
    gt = l | t.baseLanes;
  }
  function Bf() {
    K(qe, gt);
    K(Ra, Ra.current);
  }
  function qf() {
    gt = qe.current;
    el(Ra);
    el(qe);
  }
  var Hl = Jl(null);
  var pl = null;
  function qt(l) {
    var t = l.alternate;
    K(F, F.current & 1);
    K(Hl, l);
    if (pl === null && (t === null || Ra.current !== null || t.memoizedState !== null)) {
      pl = l;
    }
  }
  function Yf(l) {
    K(F, F.current);
    K(Hl, l);
    if (pl === null) {
      pl = l;
    }
  }
  function T0(l) {
    if (l.tag === 22) {
      K(F, F.current);
      K(Hl, l);
      if (pl === null) {
        pl = l;
      }
    } else {
      Yt();
    }
  }
  function Yt() {
    K(F, F.current);
    K(Hl, Hl.current);
  }
  function Nl(l) {
    el(Hl);
    if (pl === l) {
      pl = null;
    }
    el(F);
  }
  var F = Jl(0);
  function Ye(l) {
    for (var t = l; t !== null;) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Rc(a) || pc(a))) {
          return t;
        }
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) {
          return t;
        }
      } else if (t.child !== null) {
        t.child.return = t;
        t = t.child;
        continue;
      }
      if (t === l) {
        break;
      }
      while (t.sibling === null) {
        if (t.return === null || t.return === l) {
          return null;
        }
        t = t.return;
      }
      t.sibling.return = t.return;
      t = t.sibling;
    }
    return null;
  }
  var ct = 0;
  var D = null;
  var p = null;
  var P = null;
  var Xe = false;
  var pa = false;
  var va = false;
  var Ge = 0;
  var Nu = 0;
  var ja = null;
  var om = 0;
  function $() {
    throw Error(g(321));
  }
  function Xf(l, t) {
    if (t === null) {
      return false;
    }
    for (var a = 0; a < t.length && a < l.length; a++) {
      if (!Dl(l[a], t[a])) {
        return false;
      }
    }
    return true;
  }
  function Gf(l, t, a, u, e, n) {
    ct = n;
    D = t;
    t.memoizedState = null;
    t.updateQueue = null;
    t.lanes = 0;
    O.H = l === null || l.memoizedState === null ? u1 : Ff;
    va = false;
    n = a(u, e);
    va = false;
    if (pa) {
      n = M0(t, a, u, e);
    }
    E0(l);
    return n;
  }
  function E0(l) {
    O.H = qu;
    var t = p !== null && p.next !== null;
    ct = 0;
    P = p = D = null;
    Xe = false;
    Nu = 0;
    ja = null;
    if (t) {
      throw Error(g(300));
    }
    if (l !== null && !ll) {
      l = l.dependencies;
      if (l !== null && Oe(l)) {
        ll = true;
      }
    }
  }
  function M0(l, t, a, u) {
    D = l;
    var e = 0;
    do {
      if (pa) {
        ja = null;
      }
      Nu = 0;
      pa = false;
      if (e >= 25) {
        throw Error(g(301));
      }
      e += 1;
      P = p = null;
      if (l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null;
        n.events = null;
        n.stores = null;
        if (n.memoCache != null) {
          n.memoCache.index = 0;
        }
      }
      O.H = e1;
      n = t(a, u);
    } while (pa);
    return n;
  }
  function Om() {
    var l = O.H;
    var t = l.useState()[0];
    t = typeof t.then == "function" ? _u(t) : t;
    l = l.useState()[0];
    if ((p !== null ? p.memoizedState : null) !== l) {
      D.flags |= 1024;
    }
    return t;
  }
  function Qf() {
    var l = Ge !== 0;
    Ge = 0;
    return l;
  }
  function Cf(l, t, a) {
    t.updateQueue = l.updateQueue;
    t.flags &= -2053;
    l.lanes &= ~a;
  }
  function Zf(l) {
    if (Xe) {
      for (l = l.memoizedState; l !== null;) {
        var t = l.queue;
        if (t !== null) {
          t.pending = null;
        }
        l = l.next;
      }
      Xe = false;
    }
    ct = 0;
    P = p = D = null;
    pa = false;
    Nu = Ge = 0;
    ja = null;
  }
  function dl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    if (P === null) {
      D.memoizedState = P = l;
    } else {
      P = P.next = l;
    }
    return P;
  }
  function k() {
    if (p === null) {
      var l = D.alternate;
      l = l !== null ? l.memoizedState : null;
    } else {
      l = p.next;
    }
    var t = P === null ? D.memoizedState : P.next;
    if (t !== null) {
      P = t;
      p = l;
    } else {
      if (l === null) {
        throw D.alternate === null ? Error(g(467)) : Error(g(310));
      }
      p = l;
      l = {
        memoizedState: p.memoizedState,
        baseState: p.baseState,
        baseQueue: p.baseQueue,
        queue: p.queue,
        next: null
      };
      if (P === null) {
        D.memoizedState = P = l;
      } else {
        P = P.next = l;
      }
    }
    return P;
  }
  function Qe() {
    return {
      lastEffect: null,
      events: null,
      stores: null,
      memoCache: null
    };
  }
  function _u(l) {
    var t = Nu;
    Nu += 1;
    if (ja === null) {
      ja = [];
    }
    l = h0(ja, l, t);
    t = D;
    if ((P === null ? t.memoizedState : P.next) === null) {
      t = t.alternate;
      O.H = t === null || t.memoizedState === null ? u1 : Ff;
    }
    return l;
  }
  function Ce(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") {
        return _u(l);
      }
      if (l.$$typeof === Pl) {
        return yl(l);
      }
    }
    throw Error(g(438, String(l)));
  }
  function Rf(l) {
    var t = null;
    var a = D.updateQueue;
    if (a !== null) {
      t = a.memoCache;
    }
    if (t == null) {
      var u = D.alternate;
      if (u !== null) {
        u = u.updateQueue;
        if (u !== null) {
          u = u.memoCache;
          if (u != null) {
            t = {
              data: u.data.map(function (e) {
                return e.slice();
              }),
              index: 0
            };
          }
        }
      }
    }
    if (t == null) {
      t = {
        data: [],
        index: 0
      };
    }
    if (a === null) {
      a = Qe();
      D.updateQueue = a;
    }
    a.memoCache = t;
    a = t.data[t.index];
    if (a === undefined) {
      a = t.data[t.index] = Array(l);
      u = 0;
      for (; u < l; u++) {
        a[u] = vy;
      }
    }
    t.index++;
    return a;
  }
  function it(l, t) {
    if (typeof t == "function") {
      return t(l);
    } else {
      return t;
    }
  }
  function Ze(l) {
    var t = k();
    return pf(t, p, l);
  }
  function pf(l, t, a) {
    var u = l.queue;
    if (u === null) {
      throw Error(g(311));
    }
    u.lastRenderedReducer = a;
    var e = l.baseQueue;
    var n = u.pending;
    if (n !== null) {
      if (e !== null) {
        var f = e.next;
        e.next = n.next;
        n.next = f;
      }
      t.baseQueue = e = n;
      u.pending = null;
    }
    n = l.baseState;
    if (e === null) {
      l.memoizedState = n;
    } else {
      t = e.next;
      var c = f = null;
      var i = null;
      var h = t;
      var z = false;
      do {
        var b = h.lane & -536870913;
        if (b !== h.lane ? (_ & b) === b : (ct & b) === b) {
          var d = h.revertLane;
          if (d === 0) {
            if (i !== null) {
              i = i.next = {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: h.action,
                hasEagerState: h.hasEagerState,
                eagerState: h.eagerState,
                next: null
              };
            }
            if (b === Ga) {
              z = true;
            }
          } else if ((ct & d) === d) {
            h = h.next;
            if (d === Ga) {
              z = true;
            }
            continue;
          } else {
            b = {
              lane: 0,
              revertLane: h.revertLane,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            };
            if (i === null) {
              c = i = b;
              f = n;
            } else {
              i = i.next = b;
            }
            D.lanes |= d;
            Qt |= d;
          }
          b = h.action;
          if (va) {
            a(n, b);
          }
          n = h.hasEagerState ? h.eagerState : a(n, b);
        } else {
          d = {
            lane: b,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          };
          if (i === null) {
            c = i = d;
            f = n;
          } else {
            i = i.next = d;
          }
          D.lanes |= b;
          Qt |= b;
        }
        h = h.next;
      } while (h !== null && h !== t);
      if (i === null) {
        f = n;
      } else {
        i.next = c;
      }
      if (!Dl(n, l.memoizedState) && (ll = true, z && (a = Qa, a !== null))) {
        throw a;
      }
      l.memoizedState = n;
      l.baseState = f;
      l.baseQueue = i;
      u.lastRenderedState = n;
    }
    if (e === null) {
      u.lanes = 0;
    }
    return [l.memoizedState, u.dispatch];
  }
  function jf(l) {
    var t = k();
    var a = t.queue;
    if (a === null) {
      throw Error(g(311));
    }
    a.lastRenderedReducer = l;
    var u = a.dispatch;
    var e = a.pending;
    var n = t.memoizedState;
    if (e !== null) {
      a.pending = null;
      var f = e = e.next;
      do {
        n = l(n, f.action);
        f = f.next;
      } while (f !== e);
      if (!Dl(n, t.memoizedState)) {
        ll = true;
      }
      t.memoizedState = n;
      if (t.baseQueue === null) {
        t.baseState = n;
      }
      a.lastRenderedState = n;
    }
    return [n, u];
  }
  function o0(l, t, a) {
    var u = D;
    var e = k();
    var n = q;
    if (n) {
      if (a === undefined) {
        throw Error(g(407));
      }
      a = a();
    } else {
      a = t();
    }
    var f = !Dl((p || e).memoizedState, a);
    if (f) {
      e.memoizedState = a;
      ll = true;
    }
    e = e.queue;
    Kf(U0.bind(null, u, e, l), [l]);
    if (e.getSnapshot !== t || f || P !== null && P.memoizedState.tag & 1) {
      u.flags |= 2048;
      Va(9, {
        destroy: undefined
      }, D0.bind(null, u, e, a, t), null);
      if (x === null) {
        throw Error(g(349));
      }
      if (!n && (ct & 127) === 0) {
        O0(u, t, a);
      }
    }
    return a;
  }
  function O0(l, t, a) {
    l.flags |= 16384;
    l = {
      getSnapshot: t,
      value: a
    };
    t = D.updateQueue;
    if (t === null) {
      t = Qe();
      D.updateQueue = t;
      t.stores = [l];
    } else {
      a = t.stores;
      if (a === null) {
        t.stores = [l];
      } else {
        a.push(l);
      }
    }
  }
  function D0(l, t, a, u) {
    t.value = a;
    t.getSnapshot = u;
    if (H0(t)) {
      N0(l);
    }
  }
  function U0(l, t, a) {
    return a(function () {
      if (H0(t)) {
        N0(l);
      }
    });
  }
  function H0(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var a = t();
      return !Dl(l, a);
    } catch {
      return true;
    }
  }
  function N0(l) {
    var t = la(l, 2);
    if (t !== null) {
      Tl(t, l, 2);
    }
  }
  function Vf(l) {
    var t = dl();
    if (typeof l == "function") {
      var a = l;
      l = a();
      if (va) {
        Et(true);
        try {
          a();
        } finally {
          Et(false);
        }
      }
    }
    t.memoizedState = t.baseState = l;
    t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: it,
      lastRenderedState: l
    };
    return t;
  }
  function _0(l, t, a, u) {
    l.baseState = a;
    return pf(l, p, typeof u == "function" ? u : it);
  }
  function Dm(l, t, a, u, e) {
    if (je(l)) {
      throw Error(g(485));
    }
    l = t.action;
    if (l !== null) {
      var n = {
        payload: e,
        action: l,
        next: null,
        isTransition: true,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          n.listeners.push(f);
        }
      };
      if (O.T !== null) {
        a(true);
      } else {
        n.isTransition = false;
      }
      u(n);
      a = t.pending;
      if (a === null) {
        n.next = t.pending = n;
        B0(t, n);
      } else {
        n.next = a.next;
        t.pending = a.next = n;
      }
    }
  }
  function B0(l, t) {
    var a = t.action;
    var u = t.payload;
    var e = l.state;
    if (t.isTransition) {
      var n = O.T;
      var f = {};
      O.T = f;
      try {
        var c = a(e, u);
        var i = O.S;
        if (i !== null) {
          i(f, c);
        }
        q0(l, t, c);
      } catch (h) {
        xf(l, t, h);
      } finally {
        if (n !== null && f.types !== null) {
          n.types = f.types;
        }
        O.T = n;
      }
    } else {
      try {
        n = a(e, u);
        q0(l, t, n);
      } catch (h) {
        xf(l, t, h);
      }
    }
  }
  function q0(l, t, a) {
    if (a !== null && typeof a == "object" && typeof a.then == "function") {
      a.then(function (u) {
        Y0(l, t, u);
      }, function (u) {
        return xf(l, t, u);
      });
    } else {
      Y0(l, t, a);
    }
  }
  function Y0(l, t, a) {
    t.status = "fulfilled";
    t.value = a;
    X0(t);
    l.state = a;
    t = l.pending;
    if (t !== null) {
      a = t.next;
      if (a === t) {
        l.pending = null;
      } else {
        a = a.next;
        t.next = a;
        B0(l, a);
      }
    }
  }
  function xf(l, t, a) {
    var u = l.pending;
    l.pending = null;
    if (u !== null) {
      u = u.next;
      do {
        t.status = "rejected";
        t.reason = a;
        X0(t);
        t = t.next;
      } while (t !== u);
    }
    l.action = null;
  }
  function X0(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) {
      (0, l[t])();
    }
  }
  function G0(l, t) {
    return t;
  }
  function Q0(l, t) {
    if (q) {
      var a = x.formState;
      if (a !== null) {
        l: {
          var u = D;
          if (q) {
            if (L) {
              t: {
                for (var e = L, n = Rl; e.nodeType !== 8;) {
                  if (!n) {
                    e = null;
                    break t;
                  }
                  e = jl(e.nextSibling);
                  if (e === null) {
                    e = null;
                    break t;
                  }
                }
                n = e.data;
                e = n === "F!" || n === "F" ? e : null;
              }
              if (e) {
                L = jl(e.nextSibling);
                u = e.data === "F!";
                break l;
              }
            }
            Ut(u);
          }
          u = false;
        }
        if (u) {
          t = a[0];
        }
      }
    }
    a = dl();
    a.memoizedState = a.baseState = t;
    u = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: G0,
      lastRenderedState: t
    };
    a.queue = u;
    a = l1.bind(null, D, u);
    u.dispatch = a;
    u = Vf(false);
    n = wf.bind(null, D, false, u.queue);
    u = dl();
    e = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    };
    u.queue = e;
    a = Dm.bind(null, D, e, n, a);
    e.dispatch = a;
    u.memoizedState = l;
    return [t, a, false];
  }
  function C0(l) {
    var t = k();
    return Z0(t, p, l);
  }
  function Z0(l, t, a) {
    t = pf(l, t, G0)[0];
    l = Ze(it)[0];
    if (typeof t == "object" && t !== null && typeof t.then == "function") {
      try {
        var u = _u(t);
      } catch (f) {
        throw f === Ca ? He : f;
      }
    } else {
      u = t;
    }
    t = k();
    var e = t.queue;
    var n = e.dispatch;
    if (a !== t.memoizedState) {
      D.flags |= 2048;
      Va(9, {
        destroy: undefined
      }, Um.bind(null, e, a), null);
    }
    return [u, n, l];
  }
  function Um(l, t) {
    l.action = t;
  }
  function R0(l) {
    var t = k();
    var a = p;
    if (a !== null) {
      return Z0(t, a, l);
    }
    k();
    t = t.memoizedState;
    a = k();
    var u = a.queue.dispatch;
    a.memoizedState = l;
    return [t, u, false];
  }
  function Va(l, t, a, u) {
    l = {
      tag: l,
      create: a,
      deps: u,
      inst: t,
      next: null
    };
    t = D.updateQueue;
    if (t === null) {
      t = Qe();
      D.updateQueue = t;
    }
    a = t.lastEffect;
    if (a === null) {
      t.lastEffect = l.next = l;
    } else {
      u = a.next;
      a.next = l;
      l.next = u;
      t.lastEffect = l;
    }
    return l;
  }
  function p0() {
    return k().memoizedState;
  }
  function Re(l, t, a, u) {
    var e = dl();
    D.flags |= l;
    e.memoizedState = Va(t | 1, {
      destroy: undefined
    }, a, u === undefined ? null : u);
  }
  function pe(l, t, a, u) {
    var e = k();
    u = u === undefined ? null : u;
    var n = e.memoizedState.inst;
    if (p !== null && u !== null && Xf(u, p.memoizedState.deps)) {
      e.memoizedState = Va(t, n, a, u);
    } else {
      D.flags |= l;
      e.memoizedState = Va(t | 1, n, a, u);
    }
  }
  function j0(l, t) {
    Re(8390656, 8, l, t);
  }
  function Kf(l, t) {
    pe(2048, 8, l, t);
  }
  function Hm(l) {
    D.flags |= 4;
    var t = D.updateQueue;
    if (t === null) {
      t = Qe();
      D.updateQueue = t;
      t.events = [l];
    } else {
      var a = t.events;
      if (a === null) {
        t.events = [l];
      } else {
        a.push(l);
      }
    }
  }
  function V0(l) {
    var t = k().memoizedState;
    Hm({
      ref: t,
      nextImpl: l
    });
    return function () {
      if ((Q & 2) !== 0) {
        throw Error(g(440));
      }
      return t.impl.apply(undefined, arguments);
    };
  }
  function x0(l, t) {
    return pe(4, 2, l, t);
  }
  function K0(l, t) {
    return pe(4, 4, l, t);
  }
  function L0(l, t) {
    if (typeof t == "function") {
      l = l();
      var a = t(l);
      return function () {
        if (typeof a == "function") {
          a();
        } else {
          t(null);
        }
      };
    }
    if (t != null) {
      l = l();
      t.current = l;
      return function () {
        t.current = null;
      };
    }
  }
  function J0(l, t, a) {
    a = a != null ? a.concat([l]) : null;
    pe(4, 4, L0.bind(null, t, l), a);
  }
  function Lf() {}
  function W0(l, t) {
    var a = k();
    t = t === undefined ? null : t;
    var u = a.memoizedState;
    if (t !== null && Xf(t, u[1])) {
      return u[0];
    } else {
      a.memoizedState = [l, t];
      return l;
    }
  }
  function $0(l, t) {
    var a = k();
    t = t === undefined ? null : t;
    var u = a.memoizedState;
    if (t !== null && Xf(t, u[1])) {
      return u[0];
    }
    u = l();
    if (va) {
      Et(true);
      try {
        l();
      } finally {
        Et(false);
      }
    }
    a.memoizedState = [u, t];
    return u;
  }
  function Jf(l, t, a) {
    if (a === undefined || (ct & 1073741824) !== 0 && (_ & 261930) === 0) {
      return l.memoizedState = t;
    } else {
      l.memoizedState = a;
      l = w1();
      D.lanes |= l;
      Qt |= l;
      return a;
    }
  }
  function w0(l, t, a, u) {
    if (Dl(a, t)) {
      return a;
    } else if (Ra.current !== null) {
      l = Jf(l, a, u);
      if (!Dl(l, t)) {
        ll = true;
      }
      return l;
    } else if ((ct & 42) === 0 || (ct & 1073741824) !== 0 && (_ & 261930) === 0) {
      ll = true;
      return l.memoizedState = a;
    } else {
      l = w1();
      D.lanes |= l;
      Qt |= l;
      return t;
    }
  }
  function F0(l, t, a, u, e) {
    var n = G.p;
    G.p = n !== 0 && n < 8 ? n : 8;
    var f = O.T;
    var c = {};
    O.T = c;
    wf(l, false, t, a);
    try {
      var i = e();
      var h = O.S;
      if (h !== null) {
        h(c, i);
      }
      if (i !== null && typeof i == "object" && typeof i.then == "function") {
        var z = Mm(i, u);
        Bu(l, t, z, ql(l));
      } else {
        Bu(l, t, u, ql(l));
      }
    } catch (b) {
      Bu(l, t, {
        then: function () {},
        status: "rejected",
        reason: b
      }, ql());
    } finally {
      G.p = n;
      if (f !== null && c.types !== null) {
        f.types = c.types;
      }
      O.T = f;
    }
  }
  function Nm() {}
  function Wf(l, t, a, u) {
    if (l.tag !== 5) {
      throw Error(g(476));
    }
    var e = k0(l).queue;
    F0(l, e, t, $t, a === null ? Nm : function () {
      r0(l);
      return a(u);
    });
  }
  function k0(l) {
    var t = l.memoizedState;
    if (t !== null) {
      return t;
    }
    t = {
      memoizedState: $t,
      baseState: $t,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: it,
        lastRenderedState: $t
      },
      next: null
    };
    var a = {};
    t.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: it,
        lastRenderedState: a
      },
      next: null
    };
    l.memoizedState = t;
    l = l.alternate;
    if (l !== null) {
      l.memoizedState = t;
    }
    return t;
  }
  function r0(l) {
    var t = k0(l);
    if (t.next === null) {
      t = l.alternate.memoizedState;
    }
    Bu(l, t.next.queue, {}, ql());
  }
  function $f() {
    return yl($u);
  }
  function I0() {
    return k().memoizedState;
  }
  function P0() {
    return k().memoizedState;
  }
  function _m(l) {
    for (var t = l.return; t !== null;) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = ql();
          l = _t(a);
          var u = Bt(t, l, a);
          if (u !== null) {
            Tl(u, t, a);
            Du(u, t, a);
          }
          t = {
            cache: Mf()
          };
          l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Bm(l, t, a) {
    var u = ql();
    a = {
      lane: u,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (je(l)) {
      t1(t, a);
    } else {
      a = mf(l, t, a, u);
      if (a !== null) {
        Tl(a, l, u);
        a1(a, t, u);
      }
    }
  }
  function l1(l, t, a) {
    var u = ql();
    Bu(l, t, a, u);
  }
  function Bu(l, t, a, u) {
    var e = {
      lane: u,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (je(l)) {
      t1(t, e);
    } else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null)) {
        try {
          var f = t.lastRenderedState;
          var c = n(f, a);
          e.hasEagerState = true;
          e.eagerState = c;
          if (Dl(c, f)) {
            Te(l, t, e, 0);
            if (x === null) {
              Ae();
            }
            return false;
          }
        } catch {}
      }
      a = mf(l, t, e, u);
      if (a !== null) {
        Tl(a, l, u);
        a1(a, t, u);
        return true;
      }
    }
    return false;
  }
  function wf(l, t, a, u) {
    u = {
      lane: 2,
      revertLane: Uc(),
      gesture: null,
      action: u,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (je(l)) {
      if (t) {
        throw Error(g(479));
      }
    } else {
      t = mf(l, a, u, 2);
      if (t !== null) {
        Tl(t, l, 2);
      }
    }
  }
  function je(l) {
    var t = l.alternate;
    return l === D || t !== null && t === D;
  }
  function t1(l, t) {
    pa = Xe = true;
    var a = l.pending;
    if (a === null) {
      t.next = t;
    } else {
      t.next = a.next;
      a.next = t;
    }
    l.pending = t;
  }
  function a1(l, t, a) {
    if ((a & 4194048) !== 0) {
      var u = t.lanes;
      u &= l.pendingLanes;
      a |= u;
      t.lanes = a;
      ci(l, a);
    }
  }
  var qu = {
    readContext: yl,
    use: Ce,
    useCallback: $,
    useContext: $,
    useEffect: $,
    useImperativeHandle: $,
    useLayoutEffect: $,
    useInsertionEffect: $,
    useMemo: $,
    useReducer: $,
    useRef: $,
    useState: $,
    useDebugValue: $,
    useDeferredValue: $,
    useTransition: $,
    useSyncExternalStore: $,
    useId: $,
    useHostTransitionStatus: $,
    useFormState: $,
    useActionState: $,
    useOptimistic: $,
    useMemoCache: $,
    useCacheRefresh: $
  };
  qu.useEffectEvent = $;
  var u1 = {
    readContext: yl,
    use: Ce,
    useCallback: function (l, t) {
      dl().memoizedState = [l, t === undefined ? null : t];
      return l;
    },
    useContext: yl,
    useEffect: j0,
    useImperativeHandle: function (l, t, a) {
      a = a != null ? a.concat([l]) : null;
      Re(4194308, 4, L0.bind(null, t, l), a);
    },
    useLayoutEffect: function (l, t) {
      return Re(4194308, 4, l, t);
    },
    useInsertionEffect: function (l, t) {
      Re(4, 2, l, t);
    },
    useMemo: function (l, t) {
      var a = dl();
      t = t === undefined ? null : t;
      var u = l();
      if (va) {
        Et(true);
        try {
          l();
        } finally {
          Et(false);
        }
      }
      a.memoizedState = [u, t];
      return u;
    },
    useReducer: function (l, t, a) {
      var u = dl();
      if (a !== undefined) {
        var e = a(t);
        if (va) {
          Et(true);
          try {
            a(t);
          } finally {
            Et(false);
          }
        }
      } else {
        e = t;
      }
      u.memoizedState = u.baseState = e;
      l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: e
      };
      u.queue = l;
      l = l.dispatch = Bm.bind(null, D, l);
      return [u.memoizedState, l];
    },
    useRef: function (l) {
      var t = dl();
      l = {
        current: l
      };
      return t.memoizedState = l;
    },
    useState: function (l) {
      l = Vf(l);
      var t = l.queue;
      var a = l1.bind(null, D, t);
      t.dispatch = a;
      return [l.memoizedState, a];
    },
    useDebugValue: Lf,
    useDeferredValue: function (l, t) {
      var a = dl();
      return Jf(a, l, t);
    },
    useTransition: function () {
      var l = Vf(false);
      l = F0.bind(null, D, l.queue, true, false);
      dl().memoizedState = l;
      return [false, l];
    },
    useSyncExternalStore: function (l, t, a) {
      var u = D;
      var e = dl();
      if (q) {
        if (a === undefined) {
          throw Error(g(407));
        }
        a = a();
      } else {
        a = t();
        if (x === null) {
          throw Error(g(349));
        }
        if ((_ & 127) === 0) {
          O0(u, t, a);
        }
      }
      e.memoizedState = a;
      var n = {
        value: a,
        getSnapshot: t
      };
      e.queue = n;
      j0(U0.bind(null, u, n, l), [l]);
      u.flags |= 2048;
      Va(9, {
        destroy: undefined
      }, D0.bind(null, u, n, a, t), null);
      return a;
    },
    useId: function () {
      var l = dl();
      var t = x.identifierPrefix;
      if (q) {
        var a = wl;
        var u = $l;
        a = (u & ~(1 << 32 - Ol(u) - 1)).toString(32) + a;
        t = "_" + t + "R_" + a;
        a = Ge++;
        if (a > 0) {
          t += "H" + a.toString(32);
        }
        t += "_";
      } else {
        a = om++;
        t = "_" + t + "r_" + a.toString(32) + "_";
      }
      return l.memoizedState = t;
    },
    useHostTransitionStatus: $f,
    useFormState: Q0,
    useActionState: Q0,
    useOptimistic: function (l) {
      var t = dl();
      t.memoizedState = t.baseState = l;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      t.queue = a;
      t = wf.bind(null, D, true, a);
      a.dispatch = t;
      return [l, t];
    },
    useMemoCache: Rf,
    useCacheRefresh: function () {
      return dl().memoizedState = _m.bind(null, D);
    },
    useEffectEvent: function (l) {
      var t = dl();
      var a = {
        impl: l
      };
      t.memoizedState = a;
      return function () {
        if ((Q & 2) !== 0) {
          throw Error(g(440));
        }
        return a.impl.apply(undefined, arguments);
      };
    }
  };
  var Ff = {
    readContext: yl,
    use: Ce,
    useCallback: W0,
    useContext: yl,
    useEffect: Kf,
    useImperativeHandle: J0,
    useInsertionEffect: x0,
    useLayoutEffect: K0,
    useMemo: $0,
    useReducer: Ze,
    useRef: p0,
    useState: function () {
      return Ze(it);
    },
    useDebugValue: Lf,
    useDeferredValue: function (l, t) {
      var a = k();
      return w0(a, p.memoizedState, l, t);
    },
    useTransition: function () {
      var l = Ze(it)[0];
      var t = k().memoizedState;
      return [typeof l == "boolean" ? l : _u(l), t];
    },
    useSyncExternalStore: o0,
    useId: I0,
    useHostTransitionStatus: $f,
    useFormState: C0,
    useActionState: C0,
    useOptimistic: function (l, t) {
      var a = k();
      return _0(a, p, l, t);
    },
    useMemoCache: Rf,
    useCacheRefresh: P0
  };
  Ff.useEffectEvent = V0;
  var e1 = {
    readContext: yl,
    use: Ce,
    useCallback: W0,
    useContext: yl,
    useEffect: Kf,
    useImperativeHandle: J0,
    useInsertionEffect: x0,
    useLayoutEffect: K0,
    useMemo: $0,
    useReducer: jf,
    useRef: p0,
    useState: function () {
      return jf(it);
    },
    useDebugValue: Lf,
    useDeferredValue: function (l, t) {
      var a = k();
      if (p === null) {
        return Jf(a, l, t);
      } else {
        return w0(a, p.memoizedState, l, t);
      }
    },
    useTransition: function () {
      var l = jf(it)[0];
      var t = k().memoizedState;
      return [typeof l == "boolean" ? l : _u(l), t];
    },
    useSyncExternalStore: o0,
    useId: I0,
    useHostTransitionStatus: $f,
    useFormState: R0,
    useActionState: R0,
    useOptimistic: function (l, t) {
      var a = k();
      if (p !== null) {
        return _0(a, p, l, t);
      } else {
        a.baseState = l;
        return [l, a.queue.dispatch];
      }
    },
    useMemoCache: Rf,
    useCacheRefresh: P0
  };
  e1.useEffectEvent = V0;
  function kf(l, t, a, u) {
    t = l.memoizedState;
    a = a(u, t);
    a = a == null ? t : C({}, t, a);
    l.memoizedState = a;
    if (l.lanes === 0) {
      l.updateQueue.baseState = a;
    }
  }
  var rf = {
    enqueueSetState: function (l, t, a) {
      l = l._reactInternals;
      var u = ql();
      var e = _t(u);
      e.payload = t;
      if (a != null) {
        e.callback = a;
      }
      t = Bt(l, e, u);
      if (t !== null) {
        Tl(t, l, u);
        Du(t, l, u);
      }
    },
    enqueueReplaceState: function (l, t, a) {
      l = l._reactInternals;
      var u = ql();
      var e = _t(u);
      e.tag = 1;
      e.payload = t;
      if (a != null) {
        e.callback = a;
      }
      t = Bt(l, e, u);
      if (t !== null) {
        Tl(t, l, u);
        Du(t, l, u);
      }
    },
    enqueueForceUpdate: function (l, t) {
      l = l._reactInternals;
      var a = ql();
      var u = _t(a);
      u.tag = 2;
      if (t != null) {
        u.callback = t;
      }
      t = Bt(l, u, a);
      if (t !== null) {
        Tl(t, l, a);
        Du(t, l, a);
      }
    }
  };
  function n1(l, t, a, u, e, n, f) {
    l = l.stateNode;
    if (typeof l.shouldComponentUpdate == "function") {
      return l.shouldComponentUpdate(u, n, f);
    } else if (t.prototype && t.prototype.isPureReactComponent) {
      return !su(a, u) || !su(e, n);
    } else {
      return true;
    }
  }
  function f1(l, t, a, u) {
    l = t.state;
    if (typeof t.componentWillReceiveProps == "function") {
      t.componentWillReceiveProps(a, u);
    }
    if (typeof t.UNSAFE_componentWillReceiveProps == "function") {
      t.UNSAFE_componentWillReceiveProps(a, u);
    }
    if (t.state !== l) {
      rf.enqueueReplaceState(t, t.state, null);
    }
  }
  function ya(l, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var u in t) {
        if (u !== "ref") {
          a[u] = t[u];
        }
      }
    }
    if (l = l.defaultProps) {
      if (a === t) {
        a = C({}, a);
      }
      for (var e in l) {
        if (a[e] === undefined) {
          a[e] = l[e];
        }
      }
    }
    return a;
  }
  function c1(l) {
    be(l);
  }
  function i1(l) {
    console.error(l);
  }
  function v1(l) {
    be(l);
  }
  function Ve(l, t) {
    try {
      var a = l.onUncaughtError;
      a(t.value, {
        componentStack: t.stack
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function y1(l, t, a) {
    try {
      var u = l.onCaughtError;
      u(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function If(l, t, a) {
    a = _t(a);
    a.tag = 3;
    a.payload = {
      element: null
    };
    a.callback = function () {
      Ve(l, t);
    };
    return a;
  }
  function m1(l) {
    l = _t(l);
    l.tag = 3;
    return l;
  }
  function h1(l, t, a, u) {
    var e = a.type.getDerivedStateFromError;
    if (typeof e == "function") {
      var n = u.value;
      l.payload = function () {
        return e(n);
      };
      l.callback = function () {
        y1(t, a, u);
      };
    }
    var f = a.stateNode;
    if (f !== null && typeof f.componentDidCatch == "function") {
      l.callback = function () {
        y1(t, a, u);
        if (typeof e != "function") {
          if (Ct === null) {
            Ct = new Set([this]);
          } else {
            Ct.add(this);
          }
        }
        var c = u.stack;
        this.componentDidCatch(u.value, {
          componentStack: c !== null ? c : ""
        });
      };
    }
  }
  function qm(l, t, a, u, e) {
    a.flags |= 32768;
    if (u !== null && typeof u == "object" && typeof u.then == "function") {
      t = a.alternate;
      if (t !== null) {
        Xa(t, a, e, true);
      }
      a = Hl.current;
      if (a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            if (pl === null) {
              Pe();
            } else if (a.alternate === null && w === 0) {
              w = 3;
            }
            a.flags &= -257;
            a.flags |= 65536;
            a.lanes = e;
            if (u === Ne) {
              a.flags |= 16384;
            } else {
              t = a.updateQueue;
              if (t === null) {
                a.updateQueue = new Set([u]);
              } else {
                t.add(u);
              }
              oc(l, u, e);
            }
            return false;
          case 22:
            a.flags |= 65536;
            if (u === Ne) {
              a.flags |= 16384;
            } else {
              t = a.updateQueue;
              if (t === null) {
                t = {
                  transitions: null,
                  markerInstances: null,
                  retryQueue: new Set([u])
                };
                a.updateQueue = t;
              } else {
                a = t.retryQueue;
                if (a === null) {
                  t.retryQueue = new Set([u]);
                } else {
                  a.add(u);
                }
              }
              oc(l, u, e);
            }
            return false;
        }
        throw Error(g(435, a.tag));
      }
      oc(l, u, e);
      Pe();
      return false;
    }
    if (q) {
      t = Hl.current;
      if (t !== null) {
        if ((t.flags & 65536) === 0) {
          t.flags |= 256;
        }
        t.flags |= 65536;
        t.lanes = e;
        if (u !== sf) {
          l = Error(g(422), {
            cause: u
          });
          Tu(Ql(l, a));
        }
      } else {
        if (u !== sf) {
          t = Error(g(423), {
            cause: u
          });
          Tu(Ql(t, a));
        }
        l = l.current.alternate;
        l.flags |= 65536;
        e &= -e;
        l.lanes |= e;
        u = Ql(u, a);
        e = If(l.stateNode, u, e);
        Nf(l, e);
        if (w !== 4) {
          w = 2;
        }
      }
      return false;
    }
    var n = Error(g(520), {
      cause: u
    });
    n = Ql(n, a);
    if (pu === null) {
      pu = [n];
    } else {
      pu.push(n);
    }
    if (w !== 4) {
      w = 2;
    }
    if (t === null) {
      return true;
    }
    u = Ql(u, a);
    a = t;
    do {
      switch (a.tag) {
        case 3:
          a.flags |= 65536;
          l = e & -e;
          a.lanes |= l;
          l = If(a.stateNode, u, l);
          Nf(a, l);
          return false;
        case 1:
          t = a.type;
          n = a.stateNode;
          if ((a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Ct === null || !Ct.has(n)))) {
            a.flags |= 65536;
            e &= -e;
            a.lanes |= e;
            e = m1(e);
            h1(e, l, a, u);
            Nf(a, e);
            return false;
          }
      }
      a = a.return;
    } while (a !== null);
    return false;
  }
  var Pf = Error(g(461));
  var ll = false;
  function ml(l, t, a, u) {
    t.child = l === null ? z0(t, null, a, u) : ia(t, l.child, a, u);
  }
  function d1(l, t, a, u, e) {
    a = a.render;
    var n = t.ref;
    if ("ref" in u) {
      var f = {};
      for (var c in u) {
        if (c !== "ref") {
          f[c] = u[c];
        }
      }
    } else {
      f = u;
    }
    ea(t);
    u = Gf(l, t, a, f, n, e);
    c = Qf();
    if (l !== null && !ll) {
      Cf(l, t, e);
      return vt(l, t, e);
    } else {
      if (q && c) {
        gf(t);
      }
      t.flags |= 1;
      ml(l, t, u, e);
      return t.child;
    }
  }
  function S1(l, t, a, u, e) {
    if (l === null) {
      var n = a.type;
      if (typeof n == "function" && !hf(n) && n.defaultProps === undefined && a.compare === null) {
        t.tag = 15;
        t.type = n;
        return g1(l, t, n, u, e);
      } else {
        l = Me(a.type, null, u, t, t.mode, e);
        l.ref = t.ref;
        l.return = t;
        return t.child = l;
      }
    }
    n = l.child;
    if (!cc(l, e)) {
      var f = n.memoizedProps;
      a = a.compare;
      a = a !== null ? a : su;
      if (a(f, u) && l.ref === t.ref) {
        return vt(l, t, e);
      }
    }
    t.flags |= 1;
    l = ut(n, u);
    l.ref = t.ref;
    l.return = t;
    return t.child = l;
  }
  function g1(l, t, a, u, e) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (su(n, u) && l.ref === t.ref) {
        ll = false;
        t.pendingProps = u = n;
        if (cc(l, e)) {
          if ((l.flags & 131072) !== 0) {
            ll = true;
          }
        } else {
          t.lanes = l.lanes;
          return vt(l, t, e);
        }
      }
    }
    return lc(l, t, a, u, e);
  }
  function z1(l, t, a, u) {
    var e = u.children;
    var n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null) {
      t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      };
    }
    if (u.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        n = n !== null ? n.baseLanes | a : a;
        if (l !== null) {
          u = t.child = l.child;
          e = 0;
          while (u !== null) {
            e = e | u.lanes | u.childLanes;
            u = u.sibling;
          }
          u = e & ~n;
        } else {
          u = 0;
          t.child = null;
        }
        return s1(l, t, n, a, u);
      }
      if ((a & 536870912) !== 0) {
        t.memoizedState = {
          baseLanes: 0,
          cachePool: null
        };
        if (l !== null) {
          Ue(t, n !== null ? n.cachePool : null);
        }
        if (n !== null) {
          A0(t, n);
        } else {
          Bf();
        }
        T0(t);
      } else {
        u = t.lanes = 536870912;
        return s1(l, t, n !== null ? n.baseLanes | a : a, a, u);
      }
    } else if (n !== null) {
      Ue(t, n.cachePool);
      A0(t, n);
      Yt();
      t.memoizedState = null;
    } else {
      if (l !== null) {
        Ue(t, null);
      }
      Bf();
      Yt();
    }
    ml(l, t, e, a);
    return t.child;
  }
  function Yu(l, t) {
    if ((l === null || l.tag !== 22) && t.stateNode === null) {
      t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      };
    }
    return t.sibling;
  }
  function s1(l, t, a, u, e) {
    var n = Of();
    n = n === null ? null : {
      parent: I._currentValue,
      pool: n
    };
    t.memoizedState = {
      baseLanes: a,
      cachePool: n
    };
    if (l !== null) {
      Ue(t, null);
    }
    Bf();
    T0(t);
    if (l !== null) {
      Xa(l, t, u, true);
    }
    t.childLanes = e;
    return null;
  }
  function xe(l, t) {
    t = Le({
      mode: t.mode,
      children: t.children
    }, l.mode);
    t.ref = l.ref;
    l.child = t;
    t.return = l;
    return t;
  }
  function b1(l, t, a) {
    ia(t, l.child, null, a);
    l = xe(t, t.pendingProps);
    l.flags |= 2;
    Nl(t);
    t.memoizedState = null;
    return l;
  }
  function Ym(l, t, a) {
    var u = t.pendingProps;
    var e = (t.flags & 128) !== 0;
    t.flags &= -129;
    if (l === null) {
      if (q) {
        if (u.mode === "hidden") {
          l = xe(t, u);
          t.lanes = 536870912;
          return Yu(null, l);
        }
        Yf(t);
        if (l = L) {
          l = Bv(l, Rl);
          l = l !== null && l.data === "&" ? l : null;
          if (l !== null) {
            t.memoizedState = {
              dehydrated: l,
              treeContext: Ot !== null ? {
                id: $l,
                overflow: wl
              } : null,
              retryLane: 536870912,
              hydrationErrors: null
            };
            a = t0(l);
            a.return = t;
            t.child = a;
            vl = t;
            L = null;
          }
        } else {
          l = null;
        }
        if (l === null) {
          throw Ut(t);
        }
        t.lanes = 536870912;
        return null;
      }
      return xe(t, u);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var f = n.dehydrated;
      Yf(t);
      if (e) {
        if (t.flags & 256) {
          t.flags &= -257;
          t = b1(l, t, a);
        } else if (t.memoizedState !== null) {
          t.child = l.child;
          t.flags |= 128;
          t = null;
        } else {
          throw Error(g(558));
        }
      } else {
        if (!ll) {
          Xa(l, t, a, false);
        }
        e = (a & l.childLanes) !== 0;
        if (ll || e) {
          u = x;
          if (u !== null && (f = ii(u, a), f !== 0 && f !== n.retryLane)) {
            n.retryLane = f;
            la(l, f);
            Tl(u, l, f);
            throw Pf;
          }
          Pe();
          t = b1(l, t, a);
        } else {
          l = n.treeContext;
          L = jl(f.nextSibling);
          vl = t;
          q = true;
          Dt = null;
          Rl = false;
          if (l !== null) {
            e0(t, l);
          }
          t = xe(t, u);
          t.flags |= 4096;
        }
      }
      return t;
    }
    l = ut(l.child, {
      mode: u.mode,
      children: u.children
    });
    l.ref = t.ref;
    t.child = l;
    l.return = t;
    return l;
  }
  function Ke(l, t) {
    var a = t.ref;
    if (a === null) {
      if (l !== null && l.ref !== null) {
        t.flags |= 4194816;
      }
    } else {
      if (typeof a != "function" && typeof a != "object") {
        throw Error(g(284));
      }
      if (l === null || l.ref !== a) {
        t.flags |= 4194816;
      }
    }
  }
  function lc(l, t, a, u, e) {
    ea(t);
    a = Gf(l, t, a, u, undefined, e);
    u = Qf();
    if (l !== null && !ll) {
      Cf(l, t, e);
      return vt(l, t, e);
    } else {
      if (q && u) {
        gf(t);
      }
      t.flags |= 1;
      ml(l, t, a, e);
      return t.child;
    }
  }
  function A1(l, t, a, u, e, n) {
    ea(t);
    t.updateQueue = null;
    a = M0(t, u, a, e);
    E0(l);
    u = Qf();
    if (l !== null && !ll) {
      Cf(l, t, n);
      return vt(l, t, n);
    } else {
      if (q && u) {
        gf(t);
      }
      t.flags |= 1;
      ml(l, t, a, n);
      return t.child;
    }
  }
  function T1(l, t, a, u, e) {
    ea(t);
    if (t.stateNode === null) {
      var n = _a;
      var f = a.contextType;
      if (typeof f == "object" && f !== null) {
        n = yl(f);
      }
      n = new a(u, n);
      t.memoizedState = n.state ?? null;
      n.updater = rf;
      t.stateNode = n;
      n._reactInternals = t;
      n = t.stateNode;
      n.props = u;
      n.state = t.memoizedState;
      n.refs = {};
      Uf(t);
      f = a.contextType;
      n.context = typeof f == "object" && f !== null ? yl(f) : _a;
      n.state = t.memoizedState;
      f = a.getDerivedStateFromProps;
      if (typeof f == "function") {
        kf(t, a, f, u);
        n.state = t.memoizedState;
      }
      if (typeof a.getDerivedStateFromProps != "function" && typeof n.getSnapshotBeforeUpdate != "function" && (typeof n.UNSAFE_componentWillMount == "function" || typeof n.componentWillMount == "function")) {
        f = n.state;
        if (typeof n.componentWillMount == "function") {
          n.componentWillMount();
        }
        if (typeof n.UNSAFE_componentWillMount == "function") {
          n.UNSAFE_componentWillMount();
        }
        if (f !== n.state) {
          rf.enqueueReplaceState(n, n.state, null);
        }
        Hu(t, u, n, e);
        Uu();
        n.state = t.memoizedState;
      }
      if (typeof n.componentDidMount == "function") {
        t.flags |= 4194308;
      }
      u = true;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps;
      var i = ya(a, c);
      n.props = i;
      var h = n.context;
      var z = a.contextType;
      f = _a;
      if (typeof z == "object" && z !== null) {
        f = yl(z);
      }
      var b = a.getDerivedStateFromProps;
      z = typeof b == "function" || typeof n.getSnapshotBeforeUpdate == "function";
      c = t.pendingProps !== c;
      if (!z && (typeof n.UNSAFE_componentWillReceiveProps == "function" || typeof n.componentWillReceiveProps == "function")) {
        if (c || h !== f) {
          f1(t, n, u, f);
        }
      }
      Nt = false;
      var d = t.memoizedState;
      n.state = d;
      Hu(t, u, n, e);
      Uu();
      h = t.memoizedState;
      if (c || d !== h || Nt) {
        if (typeof b == "function") {
          kf(t, a, b, u);
          h = t.memoizedState;
        }
        if (i = Nt || n1(t, a, i, u, d, h, f)) {
          if (!z && (typeof n.UNSAFE_componentWillMount == "function" || typeof n.componentWillMount == "function")) {
            if (typeof n.componentWillMount == "function") {
              n.componentWillMount();
            }
            if (typeof n.UNSAFE_componentWillMount == "function") {
              n.UNSAFE_componentWillMount();
            }
          }
          if (typeof n.componentDidMount == "function") {
            t.flags |= 4194308;
          }
        } else {
          if (typeof n.componentDidMount == "function") {
            t.flags |= 4194308;
          }
          t.memoizedProps = u;
          t.memoizedState = h;
        }
        n.props = u;
        n.state = h;
        n.context = f;
        u = i;
      } else {
        if (typeof n.componentDidMount == "function") {
          t.flags |= 4194308;
        }
        u = false;
      }
    } else {
      n = t.stateNode;
      Hf(l, t);
      f = t.memoizedProps;
      z = ya(a, f);
      n.props = z;
      b = t.pendingProps;
      d = n.context;
      h = a.contextType;
      i = _a;
      if (typeof h == "object" && h !== null) {
        i = yl(h);
      }
      c = a.getDerivedStateFromProps;
      if (!(h = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") && (typeof n.UNSAFE_componentWillReceiveProps == "function" || typeof n.componentWillReceiveProps == "function")) {
        if (f !== b || d !== i) {
          f1(t, n, u, i);
        }
      }
      Nt = false;
      d = t.memoizedState;
      n.state = d;
      Hu(t, u, n, e);
      Uu();
      var S = t.memoizedState;
      if (f !== b || d !== S || Nt || l !== null && l.dependencies !== null && Oe(l.dependencies)) {
        if (typeof c == "function") {
          kf(t, a, c, u);
          S = t.memoizedState;
        }
        if (z = Nt || n1(t, a, z, u, d, S, i) || l !== null && l.dependencies !== null && Oe(l.dependencies)) {
          if (!h && (typeof n.UNSAFE_componentWillUpdate == "function" || typeof n.componentWillUpdate == "function")) {
            if (typeof n.componentWillUpdate == "function") {
              n.componentWillUpdate(u, S, i);
            }
            if (typeof n.UNSAFE_componentWillUpdate == "function") {
              n.UNSAFE_componentWillUpdate(u, S, i);
            }
          }
          if (typeof n.componentDidUpdate == "function") {
            t.flags |= 4;
          }
          if (typeof n.getSnapshotBeforeUpdate == "function") {
            t.flags |= 1024;
          }
        } else {
          if (typeof n.componentDidUpdate == "function" && (f !== l.memoizedProps || d !== l.memoizedState)) {
            t.flags |= 4;
          }
          if (typeof n.getSnapshotBeforeUpdate == "function" && (f !== l.memoizedProps || d !== l.memoizedState)) {
            t.flags |= 1024;
          }
          t.memoizedProps = u;
          t.memoizedState = S;
        }
        n.props = u;
        n.state = S;
        n.context = i;
        u = z;
      } else {
        if (typeof n.componentDidUpdate == "function" && (f !== l.memoizedProps || d !== l.memoizedState)) {
          t.flags |= 4;
        }
        if (typeof n.getSnapshotBeforeUpdate == "function" && (f !== l.memoizedProps || d !== l.memoizedState)) {
          t.flags |= 1024;
        }
        u = false;
      }
    }
    n = u;
    Ke(l, t);
    u = (t.flags & 128) !== 0;
    if (n || u) {
      n = t.stateNode;
      a = u && typeof a.getDerivedStateFromError != "function" ? null : n.render();
      t.flags |= 1;
      if (l !== null && u) {
        t.child = ia(t, l.child, null, e);
        t.child = ia(t, null, a, e);
      } else {
        ml(l, t, a, e);
      }
      t.memoizedState = n.state;
      l = t.child;
    } else {
      l = vt(l, t, e);
    }
    return l;
  }
  function E1(l, t, a, u) {
    aa();
    t.flags |= 256;
    ml(l, t, a, u);
    return t.child;
  }
  var tc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ac(l) {
    return {
      baseLanes: l,
      cachePool: y0()
    };
  }
  function uc(l, t, a) {
    l = l !== null ? l.childLanes & ~a : 0;
    if (t) {
      l |= Bl;
    }
    return l;
  }
  function M1(l, t, a) {
    var u = t.pendingProps;
    var e = false;
    var n = (t.flags & 128) !== 0;
    var f;
    if (!(f = n)) {
      f = l !== null && l.memoizedState === null ? false : (F.current & 2) !== 0;
    }
    if (f) {
      e = true;
      t.flags &= -129;
    }
    f = (t.flags & 32) !== 0;
    t.flags &= -33;
    if (l === null) {
      if (q) {
        if (e) {
          qt(t);
        } else {
          Yt();
        }
        if (l = L) {
          l = Bv(l, Rl);
          l = l !== null && l.data !== "&" ? l : null;
          if (l !== null) {
            t.memoizedState = {
              dehydrated: l,
              treeContext: Ot !== null ? {
                id: $l,
                overflow: wl
              } : null,
              retryLane: 536870912,
              hydrationErrors: null
            };
            a = t0(l);
            a.return = t;
            t.child = a;
            vl = t;
            L = null;
          }
        } else {
          l = null;
        }
        if (l === null) {
          throw Ut(t);
        }
        if (pc(l)) {
          t.lanes = 32;
        } else {
          t.lanes = 536870912;
        }
        return null;
      }
      var c = u.children;
      u = u.fallback;
      if (e) {
        Yt();
        e = t.mode;
        c = Le({
          mode: "hidden",
          children: c
        }, e);
        u = ta(u, e, a, null);
        c.return = t;
        u.return = t;
        c.sibling = u;
        t.child = c;
        u = t.child;
        u.memoizedState = ac(a);
        u.childLanes = uc(l, f, a);
        t.memoizedState = tc;
        return Yu(null, u);
      } else {
        qt(t);
        return ec(t, c);
      }
    }
    var i = l.memoizedState;
    if (i !== null && (c = i.dehydrated, c !== null)) {
      if (n) {
        if (t.flags & 256) {
          qt(t);
          t.flags &= -257;
          t = nc(l, t, a);
        } else if (t.memoizedState !== null) {
          Yt();
          t.child = l.child;
          t.flags |= 128;
          t = null;
        } else {
          Yt();
          c = u.fallback;
          e = t.mode;
          u = Le({
            mode: "visible",
            children: u.children
          }, e);
          c = ta(c, e, a, null);
          c.flags |= 2;
          u.return = t;
          c.return = t;
          u.sibling = c;
          t.child = u;
          ia(t, l.child, null, a);
          u = t.child;
          u.memoizedState = ac(a);
          u.childLanes = uc(l, f, a);
          t.memoizedState = tc;
          t = Yu(null, u);
        }
      } else {
        qt(t);
        if (pc(c)) {
          f = c.nextSibling && c.nextSibling.dataset;
          if (f) {
            var h = f.dgst;
          }
          f = h;
          u = Error(g(419));
          u.stack = "";
          u.digest = f;
          Tu({
            value: u,
            source: null,
            stack: null
          });
          t = nc(l, t, a);
        } else {
          if (!ll) {
            Xa(l, t, a, false);
          }
          f = (a & l.childLanes) !== 0;
          if (ll || f) {
            f = x;
            if (f !== null && (u = ii(f, a), u !== 0 && u !== i.retryLane)) {
              i.retryLane = u;
              la(l, u);
              Tl(f, l, u);
              throw Pf;
            }
            if (!Rc(c)) {
              Pe();
            }
            t = nc(l, t, a);
          } else if (Rc(c)) {
            t.flags |= 192;
            t.child = l.child;
            t = null;
          } else {
            l = i.treeContext;
            L = jl(c.nextSibling);
            vl = t;
            q = true;
            Dt = null;
            Rl = false;
            if (l !== null) {
              e0(t, l);
            }
            t = ec(t, u.children);
            t.flags |= 4096;
          }
        }
      }
      return t;
    }
    if (e) {
      Yt();
      c = u.fallback;
      e = t.mode;
      i = l.child;
      h = i.sibling;
      u = ut(i, {
        mode: "hidden",
        children: u.children
      });
      u.subtreeFlags = i.subtreeFlags & 65011712;
      if (h !== null) {
        c = ut(h, c);
      } else {
        c = ta(c, e, a, null);
        c.flags |= 2;
      }
      c.return = t;
      u.return = t;
      u.sibling = c;
      t.child = u;
      Yu(null, u);
      u = t.child;
      c = l.child.memoizedState;
      if (c === null) {
        c = ac(a);
      } else {
        e = c.cachePool;
        if (e !== null) {
          i = I._currentValue;
          e = e.parent !== i ? {
            parent: i,
            pool: i
          } : e;
        } else {
          e = y0();
        }
        c = {
          baseLanes: c.baseLanes | a,
          cachePool: e
        };
      }
      u.memoizedState = c;
      u.childLanes = uc(l, f, a);
      t.memoizedState = tc;
      return Yu(l.child, u);
    } else {
      qt(t);
      a = l.child;
      l = a.sibling;
      a = ut(a, {
        mode: "visible",
        children: u.children
      });
      a.return = t;
      a.sibling = null;
      if (l !== null) {
        f = t.deletions;
        if (f === null) {
          t.deletions = [l];
          t.flags |= 16;
        } else {
          f.push(l);
        }
      }
      t.child = a;
      t.memoizedState = null;
      return a;
    }
  }
  function ec(l, t) {
    t = Le({
      mode: "visible",
      children: t
    }, l.mode);
    t.return = l;
    return l.child = t;
  }
  function Le(l, t) {
    l = Ul(22, l, null, t);
    l.lanes = 0;
    return l;
  }
  function nc(l, t, a) {
    ia(t, l.child, null, a);
    l = ec(t, t.pendingProps.children);
    l.flags |= 2;
    t.memoizedState = null;
    return l;
  }
  function o1(l, t, a) {
    l.lanes |= t;
    var u = l.alternate;
    if (u !== null) {
      u.lanes |= t;
    }
    Tf(l.return, t, a);
  }
  function fc(l, t, a, u, e, n) {
    var f = l.memoizedState;
    if (f === null) {
      l.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: u,
        tail: a,
        tailMode: e,
        treeForkCount: n
      };
    } else {
      f.isBackwards = t;
      f.rendering = null;
      f.renderingStartTime = 0;
      f.last = u;
      f.tail = a;
      f.tailMode = e;
      f.treeForkCount = n;
    }
  }
  function O1(l, t, a) {
    var u = t.pendingProps;
    var e = u.revealOrder;
    var n = u.tail;
    u = u.children;
    var f = F.current;
    var c = (f & 2) !== 0;
    if (c) {
      f = f & 1 | 2;
      t.flags |= 128;
    } else {
      f &= 1;
    }
    K(F, f);
    ml(l, t, u, a);
    u = q ? Au : 0;
    if (!c && l !== null && (l.flags & 128) !== 0) {
      l: for (l = t.child; l !== null;) {
        if (l.tag === 13) {
          if (l.memoizedState !== null) {
            o1(l, a, t);
          }
        } else if (l.tag === 19) {
          o1(l, a, t);
        } else if (l.child !== null) {
          l.child.return = l;
          l = l.child;
          continue;
        }
        if (l === t) {
          break l;
        }
        while (l.sibling === null) {
          if (l.return === null || l.return === t) {
            break l;
          }
          l = l.return;
        }
        l.sibling.return = l.return;
        l = l.sibling;
      }
    }
    switch (e) {
      case "forwards":
        a = t.child;
        e = null;
        while (a !== null) {
          l = a.alternate;
          if (l !== null && Ye(l) === null) {
            e = a;
          }
          a = a.sibling;
        }
        a = e;
        if (a === null) {
          e = t.child;
          t.child = null;
        } else {
          e = a.sibling;
          a.sibling = null;
        }
        fc(t, false, e, a, n, u);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        a = null;
        e = t.child;
        t.child = null;
        while (e !== null) {
          l = e.alternate;
          if (l !== null && Ye(l) === null) {
            t.child = e;
            break;
          }
          l = e.sibling;
          e.sibling = a;
          a = e;
          e = l;
        }
        fc(t, true, a, null, n, u);
        break;
      case "together":
        fc(t, false, null, null, undefined, u);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function vt(l, t, a) {
    if (l !== null) {
      t.dependencies = l.dependencies;
    }
    Qt |= t.lanes;
    if ((a & t.childLanes) === 0) {
      if (l !== null) {
        Xa(l, t, a, false);
        if ((a & t.childLanes) === 0) {
          return null;
        }
      } else {
        return null;
      }
    }
    if (l !== null && t.child !== l.child) {
      throw Error(g(153));
    }
    if (t.child !== null) {
      l = t.child;
      a = ut(l, l.pendingProps);
      t.child = a;
      a.return = t;
      while (l.sibling !== null) {
        l = l.sibling;
        a = a.sibling = ut(l, l.pendingProps);
        a.return = t;
      }
      a.sibling = null;
    }
    return t.child;
  }
  function cc(l, t) {
    if ((l.lanes & t) !== 0) {
      return true;
    } else {
      l = l.dependencies;
      return l !== null && !!Oe(l);
    }
  }
  function Xm(l, t, a) {
    switch (t.tag) {
      case 3:
        te(t, t.stateNode.containerInfo);
        Ht(t, I, l.memoizedState.cache);
        aa();
        break;
      case 27:
      case 5:
        Bn(t);
        break;
      case 4:
        te(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ht(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) {
          t.flags |= 128;
          Yf(t);
          return null;
        }
        break;
      case 13:
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null) {
            qt(t);
            t.flags |= 128;
            return null;
          } else if ((a & t.child.childLanes) !== 0) {
            return M1(l, t, a);
          } else {
            qt(t);
            l = vt(l, t, a);
            if (l !== null) {
              return l.sibling;
            } else {
              return null;
            }
          }
        }
        qt(t);
        break;
      case 19:
        var e = (l.flags & 128) !== 0;
        u = (a & t.childLanes) !== 0;
        if (!u) {
          Xa(l, t, a, false);
          u = (a & t.childLanes) !== 0;
        }
        if (e) {
          if (u) {
            return O1(l, t, a);
          }
          t.flags |= 128;
        }
        e = t.memoizedState;
        if (e !== null) {
          e.rendering = null;
          e.tail = null;
          e.lastEffect = null;
        }
        K(F, F.current);
        if (u) {
          break;
        }
        return null;
      case 22:
        t.lanes = 0;
        return z1(l, t, a, t.pendingProps);
      case 24:
        Ht(t, I, l.memoizedState.cache);
    }
    return vt(l, t, a);
  }
  function D1(l, t, a) {
    if (l !== null) {
      if (l.memoizedProps !== t.pendingProps) {
        ll = true;
      } else {
        if (!cc(l, a) && (t.flags & 128) === 0) {
          ll = false;
          return Xm(l, t, a);
        }
        ll = (l.flags & 131072) !== 0;
      }
    } else {
      ll = false;
      if (q && (t.flags & 1048576) !== 0) {
        u0(t, Au, t.index);
      }
    }
    t.lanes = 0;
    switch (t.tag) {
      case 16:
        l: {
          var u = t.pendingProps;
          l = fa(t.elementType);
          t.type = l;
          if (typeof l == "function") {
            if (hf(l)) {
              u = ya(l, u);
              t.tag = 1;
              t = T1(null, t, l, u, a);
            } else {
              t.tag = 0;
              t = lc(null, t, l, u, a);
            }
          } else {
            if (l != null) {
              var e = l.$$typeof;
              if (e === on) {
                t.tag = 11;
                t = d1(null, t, l, u, a);
                break l;
              } else if (e === Un) {
                t.tag = 14;
                t = S1(null, t, l, u, a);
                break l;
              }
            }
            t = Nn(l) || l;
            throw Error(g(306, t, ""));
          }
        }
        return t;
      case 0:
        return lc(l, t, t.type, t.pendingProps, a);
      case 1:
        u = t.type;
        e = ya(u, t.pendingProps);
        return T1(l, t, u, e, a);
      case 3:
        l: {
          te(t, t.stateNode.containerInfo);
          if (l === null) {
            throw Error(g(387));
          }
          u = t.pendingProps;
          var n = t.memoizedState;
          e = n.element;
          Hf(l, t);
          Hu(t, u, null, a);
          var f = t.memoizedState;
          u = f.cache;
          Ht(t, I, u);
          if (u !== n.cache) {
            Ef(t, [I], a, true);
          }
          Uu();
          u = f.element;
          if (n.isDehydrated) {
            n = {
              element: u,
              isDehydrated: false,
              cache: f.cache
            };
            t.updateQueue.baseState = n;
            t.memoizedState = n;
            if (t.flags & 256) {
              t = E1(l, t, u, a);
              break l;
            } else if (u !== e) {
              e = Ql(Error(g(424)), t);
              Tu(e);
              t = E1(l, t, u, a);
              break l;
            } else {
              l = t.stateNode.containerInfo;
              if (l.nodeType === 9) {
                l = l.body;
              } else {
                l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              L = jl(l.firstChild);
              vl = t;
              q = true;
              Dt = null;
              Rl = true;
              a = z0(t, null, u, a);
              t.child = a;
              while (a) {
                a.flags = a.flags & -3 | 4096;
                a = a.sibling;
              }
            }
          } else {
            aa();
            if (u === e) {
              t = vt(l, t, a);
              break l;
            }
            ml(l, t, u, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        Ke(l, t);
        if (l === null) {
          if (a = Cv(t.type, null, t.pendingProps, null)) {
            t.memoizedState = a;
          } else if (!q) {
            a = t.type;
            l = t.pendingProps;
            u = fn(Tt.current).createElement(a);
            u[il] = t;
            u[Sl] = l;
            hl(u, a, l);
            nl(u);
            t.stateNode = u;
          }
        } else {
          t.memoizedState = Cv(t.type, l.memoizedProps, t.pendingProps, l.memoizedState);
        }
        return null;
      case 27:
        Bn(t);
        if (l === null && q) {
          u = t.stateNode = Xv(t.type, t.pendingProps, Tt.current);
          vl = t;
          Rl = true;
          e = L;
          if (jt(t.type)) {
            jc = e;
            L = jl(u.firstChild);
          } else {
            L = e;
          }
        }
        ml(l, t, t.pendingProps.children, a);
        Ke(l, t);
        if (l === null) {
          t.flags |= 4194304;
        }
        return t.child;
      case 5:
        if (l === null && q) {
          if (e = u = L) {
            u = vh(u, t.type, t.pendingProps, Rl);
            if (u !== null) {
              t.stateNode = u;
              vl = t;
              L = jl(u.firstChild);
              Rl = false;
              e = true;
            } else {
              e = false;
            }
          }
          if (!e) {
            Ut(t);
          }
        }
        Bn(t);
        e = t.type;
        n = t.pendingProps;
        f = l !== null ? l.memoizedProps : null;
        u = n.children;
        if (Qc(e, n)) {
          u = null;
        } else if (f !== null && Qc(e, f)) {
          t.flags |= 32;
        }
        if (t.memoizedState !== null) {
          e = Gf(l, t, Om, null, null, a);
          $u._currentValue = e;
        }
        Ke(l, t);
        ml(l, t, u, a);
        return t.child;
      case 6:
        if (l === null && q) {
          if (l = a = L) {
            a = yh(a, t.pendingProps, Rl);
            if (a !== null) {
              t.stateNode = a;
              vl = t;
              L = null;
              l = true;
            } else {
              l = false;
            }
          }
          if (!l) {
            Ut(t);
          }
        }
        return null;
      case 13:
        return M1(l, t, a);
      case 4:
        te(t, t.stateNode.containerInfo);
        u = t.pendingProps;
        if (l === null) {
          t.child = ia(t, null, u, a);
        } else {
          ml(l, t, u, a);
        }
        return t.child;
      case 11:
        return d1(l, t, t.type, t.pendingProps, a);
      case 7:
        ml(l, t, t.pendingProps, a);
        return t.child;
      case 8:
        ml(l, t, t.pendingProps.children, a);
        return t.child;
      case 12:
        ml(l, t, t.pendingProps.children, a);
        return t.child;
      case 10:
        u = t.pendingProps;
        Ht(t, t.type, u.value);
        ml(l, t, u.children, a);
        return t.child;
      case 9:
        e = t.type._context;
        u = t.pendingProps.children;
        ea(t);
        e = yl(e);
        u = u(e);
        t.flags |= 1;
        ml(l, t, u, a);
        return t.child;
      case 14:
        return S1(l, t, t.type, t.pendingProps, a);
      case 15:
        return g1(l, t, t.type, t.pendingProps, a);
      case 19:
        return O1(l, t, a);
      case 31:
        return Ym(l, t, a);
      case 22:
        return z1(l, t, a, t.pendingProps);
      case 24:
        ea(t);
        u = yl(I);
        if (l === null) {
          e = Of();
          if (e === null) {
            e = x;
            n = Mf();
            e.pooledCache = n;
            n.refCount++;
            if (n !== null) {
              e.pooledCacheLanes |= a;
            }
            e = n;
          }
          t.memoizedState = {
            parent: u,
            cache: e
          };
          Uf(t);
          Ht(t, I, e);
        } else {
          if ((l.lanes & a) !== 0) {
            Hf(l, t);
            Hu(t, null, null, a);
            Uu();
          }
          e = l.memoizedState;
          n = t.memoizedState;
          if (e.parent !== u) {
            e = {
              parent: u,
              cache: u
            };
            t.memoizedState = e;
            if (t.lanes === 0) {
              t.memoizedState = t.updateQueue.baseState = e;
            }
            Ht(t, I, u);
          } else {
            u = n.cache;
            Ht(t, I, u);
            if (u !== e.cache) {
              Ef(t, [I], a, true);
            }
          }
        }
        ml(l, t, t.pendingProps.children, a);
        return t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(g(156, t.tag));
  }
  function yt(l) {
    l.flags |= 4;
  }
  function ic(l, t, a, u, e) {
    if (t = (l.mode & 32) !== 0) {
      t = false;
    }
    if (t) {
      l.flags |= 16777216;
      if ((e & 335544128) === e) {
        if (l.stateNode.complete) {
          l.flags |= 8192;
        } else if (I1()) {
          l.flags |= 8192;
        } else {
          ca = Ne;
          throw Df;
        }
      }
    } else {
      l.flags &= -16777217;
    }
  }
  function U1(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) {
      l.flags &= -16777217;
    } else {
      l.flags |= 16777216;
      if (!Vv(t)) {
        if (I1()) {
          l.flags |= 8192;
        } else {
          ca = Ne;
          throw Df;
        }
      }
    }
  }
  function Je(l, t) {
    if (t !== null) {
      l.flags |= 4;
    }
    if (l.flags & 16384) {
      t = l.tag !== 22 ? ni() : 536870912;
      l.lanes |= t;
      Ja |= t;
    }
  }
  function Xu(l, t) {
    if (!q) {
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          var a = null;
          for (; t !== null;) {
            if (t.alternate !== null) {
              a = t;
            }
            t = t.sibling;
          }
          if (a === null) {
            l.tail = null;
          } else {
            a.sibling = null;
          }
          break;
        case "collapsed":
          a = l.tail;
          var u = null;
          for (; a !== null;) {
            if (a.alternate !== null) {
              u = a;
            }
            a = a.sibling;
          }
          if (u === null) {
            if (t || l.tail === null) {
              l.tail = null;
            } else {
              l.tail.sibling = null;
            }
          } else {
            u.sibling = null;
          }
      }
    }
  }
  function J(l) {
    var t = l.alternate !== null && l.alternate.child === l.child;
    var a = 0;
    var u = 0;
    if (t) {
      for (var e = l.child; e !== null;) {
        a |= e.lanes | e.childLanes;
        u |= e.subtreeFlags & 65011712;
        u |= e.flags & 65011712;
        e.return = l;
        e = e.sibling;
      }
    } else {
      for (e = l.child; e !== null;) {
        a |= e.lanes | e.childLanes;
        u |= e.subtreeFlags;
        u |= e.flags;
        e.return = l;
        e = e.sibling;
      }
    }
    l.subtreeFlags |= u;
    l.childLanes = a;
    return t;
  }
  function Gm(l, t, a) {
    var u = t.pendingProps;
    zf(t);
    switch (t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        J(t);
        return null;
      case 1:
        J(t);
        return null;
      case 3:
        a = t.stateNode;
        u = null;
        if (l !== null) {
          u = l.memoizedState.cache;
        }
        if (t.memoizedState.cache !== u) {
          t.flags |= 2048;
        }
        ft(I);
        ga();
        if (a.pendingContext) {
          a.context = a.pendingContext;
          a.pendingContext = null;
        }
        if (l === null || l.child === null) {
          if (Ya(t)) {
            yt(t);
          } else if (l !== null && (!l.memoizedState.isDehydrated || (t.flags & 256) !== 0)) {
            t.flags |= 1024;
            bf();
          }
        }
        J(t);
        return null;
      case 26:
        var e = t.type;
        var n = t.memoizedState;
        if (l === null) {
          yt(t);
          if (n !== null) {
            J(t);
            U1(t, n);
          } else {
            J(t);
            ic(t, e, null, u, a);
          }
        } else if (n) {
          if (n !== l.memoizedState) {
            yt(t);
            J(t);
            U1(t, n);
          } else {
            J(t);
            t.flags &= -16777217;
          }
        } else {
          l = l.memoizedProps;
          if (l !== u) {
            yt(t);
          }
          J(t);
          ic(t, e, l, u, a);
        }
        return null;
      case 27:
        ae(t);
        a = Tt.current;
        e = t.type;
        if (l !== null && t.stateNode != null) {
          if (l.memoizedProps !== u) {
            yt(t);
          }
        } else {
          if (!u) {
            if (t.stateNode === null) {
              throw Error(g(166));
            }
            J(t);
            return null;
          }
          l = Wl.current;
          if (Ya(t)) {
            n0(t);
          } else {
            l = Xv(e, u, a);
            t.stateNode = l;
            yt(t);
          }
        }
        J(t);
        return null;
      case 5:
        ae(t);
        e = t.type;
        if (l !== null && t.stateNode != null) {
          if (l.memoizedProps !== u) {
            yt(t);
          }
        } else {
          if (!u) {
            if (t.stateNode === null) {
              throw Error(g(166));
            }
            J(t);
            return null;
          }
          n = Wl.current;
          if (Ya(t)) {
            n0(t);
          } else {
            var f = fn(Tt.current);
            switch (n) {
              case 1:
                n = f.createElementNS("http://www.w3.org/2000/svg", e);
                break;
              case 2:
                n = f.createElementNS("http://www.w3.org/1998/Math/MathML", e);
                break;
              default:
                switch (e) {
                  case "svg":
                    n = f.createElementNS("http://www.w3.org/2000/svg", e);
                    break;
                  case "math":
                    n = f.createElementNS("http://www.w3.org/1998/Math/MathML", e);
                    break;
                  case "script":
                    n = f.createElement("div");
                    n.innerHTML = "<script></script>";
                    n = n.removeChild(n.firstChild);
                    break;
                  case "select":
                    n = typeof u.is == "string" ? f.createElement("select", {
                      is: u.is
                    }) : f.createElement("select");
                    if (u.multiple) {
                      n.multiple = true;
                    } else if (u.size) {
                      n.size = u.size;
                    }
                    break;
                  default:
                    n = typeof u.is == "string" ? f.createElement(e, {
                      is: u.is
                    }) : f.createElement(e);
                }
            }
            n[il] = t;
            n[Sl] = u;
            l: for (f = t.child; f !== null;) {
              if (f.tag === 5 || f.tag === 6) {
                n.appendChild(f.stateNode);
              } else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f;
                f = f.child;
                continue;
              }
              if (f === t) {
                break l;
              }
              while (f.sibling === null) {
                if (f.return === null || f.return === t) {
                  break l;
                }
                f = f.return;
              }
              f.sibling.return = f.return;
              f = f.sibling;
            }
            t.stateNode = n;
            hl(n, e, u);
            l: switch (e) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                u = !!u.autoFocus;
                break l;
              case "img":
                u = true;
                break l;
              default:
                u = false;
            }
            if (u) {
              yt(t);
            }
          }
        }
        J(t);
        ic(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, a);
        return null;
      case 6:
        if (l && t.stateNode != null) {
          if (l.memoizedProps !== u) {
            yt(t);
          }
        } else {
          if (typeof u != "string" && t.stateNode === null) {
            throw Error(g(166));
          }
          l = Tt.current;
          if (Ya(t)) {
            l = t.stateNode;
            a = t.memoizedProps;
            u = null;
            e = vl;
            if (e !== null) {
              switch (e.tag) {
                case 27:
                case 5:
                  u = e.memoizedProps;
              }
            }
            l[il] = t;
            l = l.nodeValue === a || u !== null && u.suppressHydrationWarning === true || !!Mv(l.nodeValue, a);
            if (!l) {
              Ut(t, true);
            }
          } else {
            l = fn(l).createTextNode(u);
            l[il] = t;
            t.stateNode = l;
          }
        }
        J(t);
        return null;
      case 31:
        a = t.memoizedState;
        if (l === null || l.memoizedState !== null) {
          u = Ya(t);
          if (a !== null) {
            if (l === null) {
              if (!u) {
                throw Error(g(318));
              }
              l = t.memoizedState;
              l = l !== null ? l.dehydrated : null;
              if (!l) {
                throw Error(g(557));
              }
              l[il] = t;
            } else {
              aa();
              if ((t.flags & 128) === 0) {
                t.memoizedState = null;
              }
              t.flags |= 4;
            }
            J(t);
            l = false;
          } else {
            a = bf();
            if (l !== null && l.memoizedState !== null) {
              l.memoizedState.hydrationErrors = a;
            }
            l = true;
          }
          if (!l) {
            if (t.flags & 256) {
              Nl(t);
              return t;
            } else {
              Nl(t);
              return null;
            }
          }
          if ((t.flags & 128) !== 0) {
            throw Error(g(558));
          }
        }
        J(t);
        return null;
      case 13:
        u = t.memoizedState;
        if (l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          e = Ya(t);
          if (u !== null && u.dehydrated !== null) {
            if (l === null) {
              if (!e) {
                throw Error(g(318));
              }
              e = t.memoizedState;
              e = e !== null ? e.dehydrated : null;
              if (!e) {
                throw Error(g(317));
              }
              e[il] = t;
            } else {
              aa();
              if ((t.flags & 128) === 0) {
                t.memoizedState = null;
              }
              t.flags |= 4;
            }
            J(t);
            e = false;
          } else {
            e = bf();
            if (l !== null && l.memoizedState !== null) {
              l.memoizedState.hydrationErrors = e;
            }
            e = true;
          }
          if (!e) {
            if (t.flags & 256) {
              Nl(t);
              return t;
            } else {
              Nl(t);
              return null;
            }
          }
        }
        Nl(t);
        if ((t.flags & 128) !== 0) {
          t.lanes = a;
          return t;
        } else {
          a = u !== null;
          l = l !== null && l.memoizedState !== null;
          if (a) {
            u = t.child;
            e = null;
            if (u.alternate !== null && u.alternate.memoizedState !== null && u.alternate.memoizedState.cachePool !== null) {
              e = u.alternate.memoizedState.cachePool.pool;
            }
            n = null;
            if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
              n = u.memoizedState.cachePool.pool;
            }
            if (n !== e) {
              u.flags |= 2048;
            }
          }
          if (a !== l && a) {
            t.child.flags |= 8192;
          }
          Je(t, t.updateQueue);
          J(t);
          return null;
        }
      case 4:
        ga();
        if (l === null) {
          Bc(t.stateNode.containerInfo);
        }
        J(t);
        return null;
      case 10:
        ft(t.type);
        J(t);
        return null;
      case 19:
        el(F);
        u = t.memoizedState;
        if (u === null) {
          J(t);
          return null;
        }
        e = (t.flags & 128) !== 0;
        n = u.rendering;
        if (n === null) {
          if (e) {
            Xu(u, false);
          } else {
            if (w !== 0 || l !== null && (l.flags & 128) !== 0) {
              for (l = t.child; l !== null;) {
                n = Ye(l);
                if (n !== null) {
                  t.flags |= 128;
                  Xu(u, false);
                  l = n.updateQueue;
                  t.updateQueue = l;
                  Je(t, l);
                  t.subtreeFlags = 0;
                  l = a;
                  a = t.child;
                  while (a !== null) {
                    l0(a, l);
                    a = a.sibling;
                  }
                  K(F, F.current & 1 | 2);
                  if (q) {
                    et(t, u.treeForkCount);
                  }
                  return t.child;
                }
                l = l.sibling;
              }
            }
            if (u.tail !== null && Ml() > ke) {
              t.flags |= 128;
              e = true;
              Xu(u, false);
              t.lanes = 4194304;
            }
          }
        } else {
          if (!e) {
            l = Ye(n);
            if (l !== null) {
              t.flags |= 128;
              e = true;
              l = l.updateQueue;
              t.updateQueue = l;
              Je(t, l);
              Xu(u, true);
              if (u.tail === null && u.tailMode === "hidden" && !n.alternate && !q) {
                J(t);
                return null;
              }
            } else if (Ml() * 2 - u.renderingStartTime > ke && a !== 536870912) {
              t.flags |= 128;
              e = true;
              Xu(u, false);
              t.lanes = 4194304;
            }
          }
          if (u.isBackwards) {
            n.sibling = t.child;
            t.child = n;
          } else {
            l = u.last;
            if (l !== null) {
              l.sibling = n;
            } else {
              t.child = n;
            }
            u.last = n;
          }
        }
        if (u.tail !== null) {
          l = u.tail;
          u.rendering = l;
          u.tail = l.sibling;
          u.renderingStartTime = Ml();
          l.sibling = null;
          a = F.current;
          K(F, e ? a & 1 | 2 : a & 1);
          if (q) {
            et(t, u.treeForkCount);
          }
          return l;
        } else {
          J(t);
          return null;
        }
      case 22:
      case 23:
        Nl(t);
        qf();
        u = t.memoizedState !== null;
        if (l !== null) {
          if (l.memoizedState !== null !== u) {
            t.flags |= 8192;
          }
        } else if (u) {
          t.flags |= 8192;
        }
        if (u) {
          if ((a & 536870912) !== 0 && (t.flags & 128) === 0) {
            J(t);
            if (t.subtreeFlags & 6) {
              t.flags |= 8192;
            }
          }
        } else {
          J(t);
        }
        a = t.updateQueue;
        if (a !== null) {
          Je(t, a.retryQueue);
        }
        a = null;
        if (l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null) {
          a = l.memoizedState.cachePool.pool;
        }
        u = null;
        if (t.memoizedState !== null && t.memoizedState.cachePool !== null) {
          u = t.memoizedState.cachePool.pool;
        }
        if (u !== a) {
          t.flags |= 2048;
        }
        if (l !== null) {
          el(na);
        }
        return null;
      case 24:
        a = null;
        if (l !== null) {
          a = l.memoizedState.cache;
        }
        if (t.memoizedState.cache !== a) {
          t.flags |= 2048;
        }
        ft(I);
        J(t);
        return null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(g(156, t.tag));
  }
  function Qm(l, t) {
    zf(t);
    switch (t.tag) {
      case 1:
        l = t.flags;
        if (l & 65536) {
          t.flags = l & -65537 | 128;
          return t;
        } else {
          return null;
        }
      case 3:
        ft(I);
        ga();
        l = t.flags;
        if ((l & 65536) !== 0 && (l & 128) === 0) {
          t.flags = l & -65537 | 128;
          return t;
        } else {
          return null;
        }
      case 26:
      case 27:
      case 5:
        ae(t);
        return null;
      case 31:
        if (t.memoizedState !== null) {
          Nl(t);
          if (t.alternate === null) {
            throw Error(g(340));
          }
          aa();
        }
        l = t.flags;
        if (l & 65536) {
          t.flags = l & -65537 | 128;
          return t;
        } else {
          return null;
        }
      case 13:
        Nl(t);
        l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null) {
            throw Error(g(340));
          }
          aa();
        }
        l = t.flags;
        if (l & 65536) {
          t.flags = l & -65537 | 128;
          return t;
        } else {
          return null;
        }
      case 19:
        el(F);
        return null;
      case 4:
        ga();
        return null;
      case 10:
        ft(t.type);
        return null;
      case 22:
      case 23:
        Nl(t);
        qf();
        if (l !== null) {
          el(na);
        }
        l = t.flags;
        if (l & 65536) {
          t.flags = l & -65537 | 128;
          return t;
        } else {
          return null;
        }
      case 24:
        ft(I);
        return null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function H1(l, t) {
    zf(t);
    switch (t.tag) {
      case 3:
        ft(I);
        ga();
        break;
      case 26:
      case 27:
      case 5:
        ae(t);
        break;
      case 4:
        ga();
        break;
      case 31:
        if (t.memoizedState !== null) {
          Nl(t);
        }
        break;
      case 13:
        Nl(t);
        break;
      case 19:
        el(F);
        break;
      case 10:
        ft(t.type);
        break;
      case 22:
      case 23:
        Nl(t);
        qf();
        if (l !== null) {
          el(na);
        }
        break;
      case 24:
        ft(I);
    }
  }
  function Gu(l, t) {
    try {
      var a = t.updateQueue;
      var u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var e = u.next;
        a = e;
        do {
          if ((a.tag & l) === l) {
            u = undefined;
            var n = a.create;
            var f = a.inst;
            u = n();
            f.destroy = u;
          }
          a = a.next;
        } while (a !== e);
      }
    } catch (c) {
      R(t, t.return, c);
    }
  }
  function Xt(l, t, a) {
    try {
      var u = t.updateQueue;
      var e = u !== null ? u.lastEffect : null;
      if (e !== null) {
        var n = e.next;
        u = n;
        do {
          if ((u.tag & l) === l) {
            var f = u.inst;
            var c = f.destroy;
            if (c !== undefined) {
              f.destroy = undefined;
              e = t;
              var i = a;
              var h = c;
              try {
                h();
              } catch (z) {
                R(e, i, z);
              }
            }
          }
          u = u.next;
        } while (u !== n);
      }
    } catch (z) {
      R(t, t.return, z);
    }
  }
  function N1(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var a = l.stateNode;
      try {
        b0(t, a);
      } catch (u) {
        R(l, l.return, u);
      }
    }
  }
  function _1(l, t, a) {
    a.props = ya(l.type, l.memoizedProps);
    a.state = l.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (u) {
      R(l, t, u);
    }
  }
  function Qu(l, t) {
    try {
      var a = l.ref;
      if (a !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var u = l.stateNode;
            break;
          case 30:
            u = l.stateNode;
            break;
          default:
            u = l.stateNode;
        }
        if (typeof a == "function") {
          l.refCleanup = a(u);
        } else {
          a.current = u;
        }
      }
    } catch (e) {
      R(l, t, e);
    }
  }
  function Fl(l, t) {
    var a = l.ref;
    var u = l.refCleanup;
    if (a !== null) {
      if (typeof u == "function") {
        try {
          u();
        } catch (e) {
          R(l, t, e);
        } finally {
          l.refCleanup = null;
          l = l.alternate;
          if (l != null) {
            l.refCleanup = null;
          }
        }
      } else if (typeof a == "function") {
        try {
          a(null);
        } catch (e) {
          R(l, t, e);
        }
      } else {
        a.current = null;
      }
    }
  }
  function B1(l) {
    var t = l.type;
    var a = l.memoizedProps;
    var u = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          if (a.autoFocus) {
            u.focus();
          }
          break l;
        case "img":
          if (a.src) {
            u.src = a.src;
          } else if (a.srcSet) {
            u.srcset = a.srcSet;
          }
      }
    } catch (e) {
      R(l, l.return, e);
    }
  }
  function vc(l, t, a) {
    try {
      var u = l.stateNode;
      uh(u, l.type, a, t);
      u[Sl] = t;
    } catch (e) {
      R(l, l.return, e);
    }
  }
  function q1(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && jt(l.type) || l.tag === 4;
  }
  function yc(l) {
    l: while (true) {
      while (l.sibling === null) {
        if (l.return === null || q1(l.return)) {
          return null;
        }
        l = l.return;
      }
      l.sibling.return = l.return;
      l = l.sibling;
      while (l.tag !== 5 && l.tag !== 6 && l.tag !== 18) {
        if (l.tag === 27 && jt(l.type) || l.flags & 2 || l.child === null || l.tag === 4) {
          continue l;
        }
        l.child.return = l;
        l = l.child;
      }
      if (!(l.flags & 2)) {
        return l.stateNode;
      }
    }
  }
  function mc(l, t, a) {
    var u = l.tag;
    if (u === 5 || u === 6) {
      l = l.stateNode;
      if (t) {
        (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(l, t);
      } else {
        t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a;
        t.appendChild(l);
        a = a._reactRootContainer;
        if (a == null && t.onclick === null) {
          t.onclick = tt;
        }
      }
    } else if (u !== 4 && (u === 27 && jt(l.type) && (a = l.stateNode, t = null), l = l.child, l !== null)) {
      mc(l, t, a);
      l = l.sibling;
      while (l !== null) {
        mc(l, t, a);
        l = l.sibling;
      }
    }
  }
  function We(l, t, a) {
    var u = l.tag;
    if (u === 5 || u === 6) {
      l = l.stateNode;
      if (t) {
        a.insertBefore(l, t);
      } else {
        a.appendChild(l);
      }
    } else if (u !== 4 && (u === 27 && jt(l.type) && (a = l.stateNode), l = l.child, l !== null)) {
      We(l, t, a);
      l = l.sibling;
      while (l !== null) {
        We(l, t, a);
        l = l.sibling;
      }
    }
  }
  function Y1(l) {
    var t = l.stateNode;
    var a = l.memoizedProps;
    try {
      var u = l.type;
      for (var e = t.attributes; e.length;) {
        t.removeAttributeNode(e[0]);
      }
      hl(t, u, a);
      t[il] = l;
      t[Sl] = a;
    } catch (n) {
      R(l, l.return, n);
    }
  }
  var mt = false;
  var tl = false;
  var hc = false;
  var X1 = typeof WeakSet == "function" ? WeakSet : Set;
  var fl = null;
  function Cm(l, t) {
    l = l.containerInfo;
    Xc = Sn;
    l = Ji(l);
    if (ef(l)) {
      if ("selectionStart" in l) {
        var a = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      } else {
        l: {
          a = (a = l.ownerDocument) && a.defaultView || window;
          var u = a.getSelection && a.getSelection();
          if (u && u.rangeCount !== 0) {
            a = u.anchorNode;
            var e = u.anchorOffset;
            var n = u.focusNode;
            u = u.focusOffset;
            try {
              a.nodeType;
              n.nodeType;
            } catch {
              a = null;
              break l;
            }
            var f = 0;
            var c = -1;
            var i = -1;
            var h = 0;
            var z = 0;
            var b = l;
            var d = null;
            t: while (true) {
              for (var S; b !== a || e !== 0 && b.nodeType !== 3 || (c = f + e), b !== n || u !== 0 && b.nodeType !== 3 || (i = f + u), b.nodeType === 3 && (f += b.nodeValue.length), (S = b.firstChild) !== null;) {
                d = b;
                b = S;
              }
              while (true) {
                if (b === l) {
                  break t;
                }
                if (d === a && ++h === e) {
                  c = f;
                }
                if (d === n && ++z === u) {
                  i = f;
                }
                if ((S = b.nextSibling) !== null) {
                  break;
                }
                b = d;
                d = b.parentNode;
              }
              b = S;
            }
            a = c === -1 || i === -1 ? null : {
              start: c,
              end: i
            };
          } else {
            a = null;
          }
        }
      }
      a = a || {
        start: 0,
        end: 0
      };
    } else {
      a = null;
    }
    Gc = {
      focusedElem: l,
      selectionRange: a
    };
    Sn = false;
    fl = t;
    while (fl !== null) {
      t = fl;
      l = t.child;
      if ((t.subtreeFlags & 1028) !== 0 && l !== null) {
        l.return = t;
        fl = l;
      } else {
        while (fl !== null) {
          t = fl;
          n = t.alternate;
          l = t.flags;
          switch (t.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null)) {
                for (a = 0; a < l.length; a++) {
                  e = l[a];
                  e.ref.impl = e.nextImpl;
                }
              }
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                l = undefined;
                a = t;
                e = n.memoizedProps;
                n = n.memoizedState;
                u = a.stateNode;
                try {
                  var A = ya(a.type, e);
                  l = u.getSnapshotBeforeUpdate(A, n);
                  u.__reactInternalSnapshotBeforeUpdate = l;
                } catch (o) {
                  R(a, a.return, o);
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                l = t.stateNode.containerInfo;
                a = l.nodeType;
                if (a === 9) {
                  Zc(l);
                } else if (a === 1) {
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Zc(l);
                      break;
                    default:
                      l.textContent = "";
                  }
                }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) {
                throw Error(g(163));
              }
          }
          l = t.sibling;
          if (l !== null) {
            l.return = t.return;
            fl = l;
            break;
          }
          fl = t.return;
        }
      }
    }
  }
  function G1(l, t, a) {
    var u = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        dt(l, a);
        if (u & 4) {
          Gu(5, a);
        }
        break;
      case 1:
        dt(l, a);
        if (u & 4) {
          l = a.stateNode;
          if (t === null) {
            try {
              l.componentDidMount();
            } catch (f) {
              R(a, a.return, f);
            }
          } else {
            var e = ya(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              l.componentDidUpdate(e, t, l.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              R(a, a.return, f);
            }
          }
        }
        if (u & 64) {
          N1(a);
        }
        if (u & 512) {
          Qu(a, a.return);
        }
        break;
      case 3:
        dt(l, a);
        if (u & 64 && (l = a.updateQueue, l !== null)) {
          t = null;
          if (a.child !== null) {
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          }
          try {
            b0(l, t);
          } catch (f) {
            R(a, a.return, f);
          }
        }
        break;
      case 27:
        if (t === null && u & 4) {
          Y1(a);
        }
      case 26:
      case 5:
        dt(l, a);
        if (t === null && u & 4) {
          B1(a);
        }
        if (u & 512) {
          Qu(a, a.return);
        }
        break;
      case 12:
        dt(l, a);
        break;
      case 31:
        dt(l, a);
        if (u & 4) {
          Z1(l, a);
        }
        break;
      case 13:
        dt(l, a);
        if (u & 4) {
          R1(l, a);
        }
        if (u & 64) {
          l = a.memoizedState;
          if (l !== null) {
            l = l.dehydrated;
            if (l !== null) {
              a = Jm.bind(null, a);
              mh(l, a);
            }
          }
        }
        break;
      case 22:
        u = a.memoizedState !== null || mt;
        if (!u) {
          t = t !== null && t.memoizedState !== null || tl;
          e = mt;
          var n = tl;
          mt = u;
          if ((tl = t) && !n) {
            St(l, a, (a.subtreeFlags & 8772) !== 0);
          } else {
            dt(l, a);
          }
          mt = e;
          tl = n;
        }
        break;
      case 30:
        break;
      default:
        dt(l, a);
    }
  }
  function Q1(l) {
    var t = l.alternate;
    if (t !== null) {
      l.alternate = null;
      Q1(t);
    }
    l.child = null;
    l.deletions = null;
    l.sibling = null;
    if (l.tag === 5) {
      t = l.stateNode;
      if (t !== null) {
        Vn(t);
      }
    }
    l.stateNode = null;
    l.return = null;
    l.dependencies = null;
    l.memoizedProps = null;
    l.memoizedState = null;
    l.pendingProps = null;
    l.stateNode = null;
    l.updateQueue = null;
  }
  var W = null;
  var zl = false;
  function ht(l, t, a) {
    for (a = a.child; a !== null;) {
      C1(l, t, a);
      a = a.sibling;
    }
  }
  function C1(l, t, a) {
    if (ol && typeof ol.onCommitFiberUnmount == "function") {
      try {
        ol.onCommitFiberUnmount(nu, a);
      } catch {}
    }
    switch (a.tag) {
      case 26:
        if (!tl) {
          Fl(a, t);
        }
        ht(l, t, a);
        if (a.memoizedState) {
          a.memoizedState.count--;
        } else if (a.stateNode) {
          a = a.stateNode;
          a.parentNode.removeChild(a);
        }
        break;
      case 27:
        if (!tl) {
          Fl(a, t);
        }
        var u = W;
        var e = zl;
        if (jt(a.type)) {
          W = a.stateNode;
          zl = false;
        }
        ht(l, t, a);
        Lu(a.stateNode);
        W = u;
        zl = e;
        break;
      case 5:
        if (!tl) {
          Fl(a, t);
        }
      case 6:
        u = W;
        e = zl;
        W = null;
        ht(l, t, a);
        W = u;
        zl = e;
        if (W !== null) {
          if (zl) {
            try {
              (W.nodeType === 9 ? W.body : W.nodeName === "HTML" ? W.ownerDocument.body : W).removeChild(a.stateNode);
            } catch (n) {
              R(a, t, n);
            }
          } else {
            try {
              W.removeChild(a.stateNode);
            } catch (n) {
              R(a, t, n);
            }
          }
        }
        break;
      case 18:
        if (W !== null) {
          if (zl) {
            l = W;
            Nv(l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, a.stateNode);
            Pa(l);
          } else {
            Nv(W, a.stateNode);
          }
        }
        break;
      case 4:
        u = W;
        e = zl;
        W = a.stateNode.containerInfo;
        zl = true;
        ht(l, t, a);
        W = u;
        zl = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Xt(2, a, t);
        if (!tl) {
          Xt(4, a, t);
        }
        ht(l, t, a);
        break;
      case 1:
        if (!tl) {
          Fl(a, t);
          u = a.stateNode;
          if (typeof u.componentWillUnmount == "function") {
            _1(a, t, u);
          }
        }
        ht(l, t, a);
        break;
      case 21:
        ht(l, t, a);
        break;
      case 22:
        tl = (u = tl) || a.memoizedState !== null;
        ht(l, t, a);
        tl = u;
        break;
      default:
        ht(l, t, a);
    }
  }
  function Z1(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Pa(l);
      } catch (a) {
        R(t, t.return, a);
      }
    }
  }
  function R1(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null)))) {
      try {
        Pa(l);
      } catch (a) {
        R(t, t.return, a);
      }
    }
  }
  function Zm(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        if (t === null) {
          t = l.stateNode = new X1();
        }
        return t;
      case 22:
        l = l.stateNode;
        t = l._retryCache;
        if (t === null) {
          t = l._retryCache = new X1();
        }
        return t;
      default:
        throw Error(g(435, l.tag));
    }
  }
  function $e(l, t) {
    var a = Zm(l);
    t.forEach(function (u) {
      if (!a.has(u)) {
        a.add(u);
        var e = Wm.bind(null, l, u);
        u.then(e, e);
      }
    });
  }
  function sl(l, t) {
    var a = t.deletions;
    if (a !== null) {
      for (var u = 0; u < a.length; u++) {
        var e = a[u];
        var n = l;
        var f = t;
        var c = f;
        l: while (c !== null) {
          switch (c.tag) {
            case 27:
              if (jt(c.type)) {
                W = c.stateNode;
                zl = false;
                break l;
              }
              break;
            case 5:
              W = c.stateNode;
              zl = false;
              break l;
            case 3:
            case 4:
              W = c.stateNode.containerInfo;
              zl = true;
              break l;
          }
          c = c.return;
        }
        if (W === null) {
          throw Error(g(160));
        }
        C1(n, f, e);
        W = null;
        zl = false;
        n = e.alternate;
        if (n !== null) {
          n.return = null;
        }
        e.return = null;
      }
    }
    if (t.subtreeFlags & 13886) {
      for (t = t.child; t !== null;) {
        p1(t, l);
        t = t.sibling;
      }
    }
  }
  var Kl = null;
  function p1(l, t) {
    var a = l.alternate;
    var u = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        sl(t, l);
        bl(l);
        if (u & 4) {
          Xt(3, l, l.return);
          Gu(3, l);
          Xt(5, l, l.return);
        }
        break;
      case 1:
        sl(t, l);
        bl(l);
        if (u & 512) {
          if (!tl && a !== null) {
            Fl(a, a.return);
          }
        }
        if (u & 64 && mt) {
          l = l.updateQueue;
          if (l !== null) {
            u = l.callbacks;
            if (u !== null) {
              a = l.shared.hiddenCallbacks;
              l.shared.hiddenCallbacks = a === null ? u : a.concat(u);
            }
          }
        }
        break;
      case 26:
        var e = Kl;
        sl(t, l);
        bl(l);
        if (u & 512) {
          if (!tl && a !== null) {
            Fl(a, a.return);
          }
        }
        if (u & 4) {
          var n = a !== null ? a.memoizedState : null;
          u = l.memoizedState;
          if (a === null) {
            if (u === null) {
              if (l.stateNode === null) {
                l: {
                  u = l.type;
                  a = l.memoizedProps;
                  e = e.ownerDocument || e;
                  t: switch (u) {
                    case "title":
                      n = e.getElementsByTagName("title")[0];
                      if (!n || n[iu] || n[il] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) {
                        n = e.createElement(u);
                        e.head.insertBefore(n, e.querySelector("head > title"));
                      }
                      hl(n, u, a);
                      n[il] = l;
                      nl(n);
                      u = n;
                      break l;
                    case "link":
                      var f = pv("link", "href", e).get(u + (a.href || ""));
                      if (f) {
                        for (var c = 0; c < f.length; c++) {
                          n = f[c];
                          if (n.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && n.getAttribute("rel") === (a.rel == null ? null : a.rel) && n.getAttribute("title") === (a.title == null ? null : a.title) && n.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            f.splice(c, 1);
                            break t;
                          }
                        }
                      }
                      n = e.createElement(u);
                      hl(n, u, a);
                      e.head.appendChild(n);
                      break;
                    case "meta":
                      if (f = pv("meta", "content", e).get(u + (a.content || ""))) {
                        for (c = 0; c < f.length; c++) {
                          n = f[c];
                          if (n.getAttribute("content") === (a.content == null ? null : "" + a.content) && n.getAttribute("name") === (a.name == null ? null : a.name) && n.getAttribute("property") === (a.property == null ? null : a.property) && n.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && n.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            f.splice(c, 1);
                            break t;
                          }
                        }
                      }
                      n = e.createElement(u);
                      hl(n, u, a);
                      e.head.appendChild(n);
                      break;
                    default:
                      throw Error(g(468, u));
                  }
                  n[il] = l;
                  nl(n);
                  u = n;
                }
                l.stateNode = u;
              } else {
                jv(e, l.type, l.stateNode);
              }
            } else {
              l.stateNode = Rv(e, u, l.memoizedProps);
            }
          } else if (n !== u) {
            if (n === null) {
              if (a.stateNode !== null) {
                a = a.stateNode;
                a.parentNode.removeChild(a);
              }
            } else {
              n.count--;
            }
            if (u === null) {
              jv(e, l.type, l.stateNode);
            } else {
              Rv(e, u, l.memoizedProps);
            }
          } else if (u === null && l.stateNode !== null) {
            vc(l, l.memoizedProps, a.memoizedProps);
          }
        }
        break;
      case 27:
        sl(t, l);
        bl(l);
        if (u & 512) {
          if (!tl && a !== null) {
            Fl(a, a.return);
          }
        }
        if (a !== null && u & 4) {
          vc(l, l.memoizedProps, a.memoizedProps);
        }
        break;
      case 5:
        sl(t, l);
        bl(l);
        if (u & 512) {
          if (!tl && a !== null) {
            Fl(a, a.return);
          }
        }
        if (l.flags & 32) {
          e = l.stateNode;
          try {
            Ma(e, "");
          } catch (A) {
            R(l, l.return, A);
          }
        }
        if (u & 4 && l.stateNode != null) {
          e = l.memoizedProps;
          vc(l, e, a !== null ? a.memoizedProps : e);
        }
        if (u & 1024) {
          hc = true;
        }
        break;
      case 6:
        sl(t, l);
        bl(l);
        if (u & 4) {
          if (l.stateNode === null) {
            throw Error(g(162));
          }
          u = l.memoizedProps;
          a = l.stateNode;
          try {
            a.nodeValue = u;
          } catch (A) {
            R(l, l.return, A);
          }
        }
        break;
      case 3:
        yn = null;
        e = Kl;
        Kl = cn(t.containerInfo);
        sl(t, l);
        Kl = e;
        bl(l);
        if (u & 4 && a !== null && a.memoizedState.isDehydrated) {
          try {
            Pa(t.containerInfo);
          } catch (A) {
            R(l, l.return, A);
          }
        }
        if (hc) {
          hc = false;
          j1(l);
        }
        break;
      case 4:
        u = Kl;
        Kl = cn(l.stateNode.containerInfo);
        sl(t, l);
        bl(l);
        Kl = u;
        break;
      case 12:
        sl(t, l);
        bl(l);
        break;
      case 31:
        sl(t, l);
        bl(l);
        if (u & 4) {
          u = l.updateQueue;
          if (u !== null) {
            l.updateQueue = null;
            $e(l, u);
          }
        }
        break;
      case 13:
        sl(t, l);
        bl(l);
        if (l.child.flags & 8192 && l.memoizedState !== null != (a !== null && a.memoizedState !== null)) {
          Fe = Ml();
        }
        if (u & 4) {
          u = l.updateQueue;
          if (u !== null) {
            l.updateQueue = null;
            $e(l, u);
          }
        }
        break;
      case 22:
        e = l.memoizedState !== null;
        var i = a !== null && a.memoizedState !== null;
        var h = mt;
        var z = tl;
        mt = h || e;
        tl = z || i;
        sl(t, l);
        tl = z;
        mt = h;
        bl(l);
        if (u & 8192) {
          t = l.stateNode;
          t._visibility = e ? t._visibility & -2 : t._visibility | 1;
          if (e) {
            if (a !== null && !i && !mt && !tl) {
              ma(l);
            }
          }
          a = null;
          t = l;
          l: while (true) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                i = a = t;
                try {
                  n = i.stateNode;
                  if (e) {
                    f = n.style;
                    if (typeof f.setProperty == "function") {
                      f.setProperty("display", "none", "important");
                    } else {
                      f.display = "none";
                    }
                  } else {
                    c = i.stateNode;
                    var b = i.memoizedProps.style;
                    var d = b != null && b.hasOwnProperty("display") ? b.display : null;
                    c.style.display = d == null || typeof d == "boolean" ? "" : ("" + d).trim();
                  }
                } catch (A) {
                  R(i, i.return, A);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                i = t;
                try {
                  i.stateNode.nodeValue = e ? "" : i.memoizedProps;
                } catch (A) {
                  R(i, i.return, A);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                i = t;
                try {
                  var S = i.stateNode;
                  if (e) {
                    _v(S, true);
                  } else {
                    _v(i.stateNode, false);
                  }
                } catch (A) {
                  R(i, i.return, A);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
              t.child.return = t;
              t = t.child;
              continue;
            }
            if (t === l) {
              break l;
            }
            while (t.sibling === null) {
              if (t.return === null || t.return === l) {
                break l;
              }
              if (a === t) {
                a = null;
              }
              t = t.return;
            }
            if (a === t) {
              a = null;
            }
            t.sibling.return = t.return;
            t = t.sibling;
          }
        }
        if (u & 4) {
          u = l.updateQueue;
          if (u !== null) {
            a = u.retryQueue;
            if (a !== null) {
              u.retryQueue = null;
              $e(l, a);
            }
          }
        }
        break;
      case 19:
        sl(t, l);
        bl(l);
        if (u & 4) {
          u = l.updateQueue;
          if (u !== null) {
            l.updateQueue = null;
            $e(l, u);
          }
        }
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        sl(t, l);
        bl(l);
    }
  }
  function bl(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        var a;
        for (var u = l.return; u !== null;) {
          if (q1(u)) {
            a = u;
            break;
          }
          u = u.return;
        }
        if (a == null) {
          throw Error(g(160));
        }
        switch (a.tag) {
          case 27:
            var e = a.stateNode;
            var n = yc(l);
            We(l, n, e);
            break;
          case 5:
            var f = a.stateNode;
            if (a.flags & 32) {
              Ma(f, "");
              a.flags &= -33;
            }
            var c = yc(l);
            We(l, c, f);
            break;
          case 3:
          case 4:
            var i = a.stateNode.containerInfo;
            var h = yc(l);
            mc(l, h, i);
            break;
          default:
            throw Error(g(161));
        }
      } catch (z) {
        R(l, l.return, z);
      }
      l.flags &= -3;
    }
    if (t & 4096) {
      l.flags &= -4097;
    }
  }
  function j1(l) {
    if (l.subtreeFlags & 1024) {
      for (l = l.child; l !== null;) {
        var t = l;
        j1(t);
        if (t.tag === 5 && t.flags & 1024) {
          t.stateNode.reset();
        }
        l = l.sibling;
      }
    }
  }
  function dt(l, t) {
    if (t.subtreeFlags & 8772) {
      for (t = t.child; t !== null;) {
        G1(l, t.alternate, t);
        t = t.sibling;
      }
    }
  }
  function ma(l) {
    for (l = l.child; l !== null;) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Xt(4, t, t.return);
          ma(t);
          break;
        case 1:
          Fl(t, t.return);
          var a = t.stateNode;
          if (typeof a.componentWillUnmount == "function") {
            _1(t, t.return, a);
          }
          ma(t);
          break;
        case 27:
          Lu(t.stateNode);
        case 26:
        case 5:
          Fl(t, t.return);
          ma(t);
          break;
        case 22:
          if (t.memoizedState === null) {
            ma(t);
          }
          break;
        case 30:
          ma(t);
          break;
        default:
          ma(t);
      }
      l = l.sibling;
    }
  }
  function St(l, t, a) {
    a = a && (t.subtreeFlags & 8772) !== 0;
    t = t.child;
    while (t !== null) {
      var u = t.alternate;
      var e = l;
      var n = t;
      var f = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          St(e, n, a);
          Gu(4, n);
          break;
        case 1:
          St(e, n, a);
          u = n;
          e = u.stateNode;
          if (typeof e.componentDidMount == "function") {
            try {
              e.componentDidMount();
            } catch (h) {
              R(u, u.return, h);
            }
          }
          u = n;
          e = u.updateQueue;
          if (e !== null) {
            var c = u.stateNode;
            try {
              var i = e.shared.hiddenCallbacks;
              if (i !== null) {
                e.shared.hiddenCallbacks = null;
                e = 0;
                for (; e < i.length; e++) {
                  s0(i[e], c);
                }
              }
            } catch (h) {
              R(u, u.return, h);
            }
          }
          if (a && f & 64) {
            N1(n);
          }
          Qu(n, n.return);
          break;
        case 27:
          Y1(n);
        case 26:
        case 5:
          St(e, n, a);
          if (a && u === null && f & 4) {
            B1(n);
          }
          Qu(n, n.return);
          break;
        case 12:
          St(e, n, a);
          break;
        case 31:
          St(e, n, a);
          if (a && f & 4) {
            Z1(e, n);
          }
          break;
        case 13:
          St(e, n, a);
          if (a && f & 4) {
            R1(e, n);
          }
          break;
        case 22:
          if (n.memoizedState === null) {
            St(e, n, a);
          }
          Qu(n, n.return);
          break;
        case 30:
          break;
        default:
          St(e, n, a);
      }
      t = t.sibling;
    }
  }
  function dc(l, t) {
    var a = null;
    if (l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null) {
      a = l.memoizedState.cachePool.pool;
    }
    l = null;
    if (t.memoizedState !== null && t.memoizedState.cachePool !== null) {
      l = t.memoizedState.cachePool.pool;
    }
    if (l !== a) {
      if (l != null) {
        l.refCount++;
      }
      if (a != null) {
        Eu(a);
      }
    }
  }
  function Sc(l, t) {
    l = null;
    if (t.alternate !== null) {
      l = t.alternate.memoizedState.cache;
    }
    t = t.memoizedState.cache;
    if (t !== l) {
      t.refCount++;
      if (l != null) {
        Eu(l);
      }
    }
  }
  function Ll(l, t, a, u) {
    if (t.subtreeFlags & 10256) {
      for (t = t.child; t !== null;) {
        V1(l, t, a, u);
        t = t.sibling;
      }
    }
  }
  function V1(l, t, a, u) {
    var e = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ll(l, t, a, u);
        if (e & 2048) {
          Gu(9, t);
        }
        break;
      case 1:
        Ll(l, t, a, u);
        break;
      case 3:
        Ll(l, t, a, u);
        if (e & 2048) {
          l = null;
          if (t.alternate !== null) {
            l = t.alternate.memoizedState.cache;
          }
          t = t.memoizedState.cache;
          if (t !== l) {
            t.refCount++;
            if (l != null) {
              Eu(l);
            }
          }
        }
        break;
      case 12:
        if (e & 2048) {
          Ll(l, t, a, u);
          l = t.stateNode;
          try {
            var n = t.memoizedProps;
            var f = n.id;
            var c = n.onPostCommit;
            if (typeof c == "function") {
              c(f, t.alternate === null ? "mount" : "update", l.passiveEffectDuration, -0);
            }
          } catch (i) {
            R(t, t.return, i);
          }
        } else {
          Ll(l, t, a, u);
        }
        break;
      case 31:
        Ll(l, t, a, u);
        break;
      case 13:
        Ll(l, t, a, u);
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode;
        f = t.alternate;
        if (t.memoizedState !== null) {
          if (n._visibility & 2) {
            Ll(l, t, a, u);
          } else {
            Cu(l, t);
          }
        } else if (n._visibility & 2) {
          Ll(l, t, a, u);
        } else {
          n._visibility |= 2;
          xa(l, t, a, u, (t.subtreeFlags & 10256) !== 0 || false);
        }
        if (e & 2048) {
          dc(f, t);
        }
        break;
      case 24:
        Ll(l, t, a, u);
        if (e & 2048) {
          Sc(t.alternate, t);
        }
        break;
      default:
        Ll(l, t, a, u);
    }
  }
  function xa(l, t, a, u, e) {
    e = e && ((t.subtreeFlags & 10256) !== 0 || false);
    t = t.child;
    while (t !== null) {
      var n = l;
      var f = t;
      var c = a;
      var i = u;
      var h = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          xa(n, f, c, i, e);
          Gu(8, f);
          break;
        case 23:
          break;
        case 22:
          var z = f.stateNode;
          if (f.memoizedState !== null) {
            if (z._visibility & 2) {
              xa(n, f, c, i, e);
            } else {
              Cu(n, f);
            }
          } else {
            z._visibility |= 2;
            xa(n, f, c, i, e);
          }
          if (e && h & 2048) {
            dc(f.alternate, f);
          }
          break;
        case 24:
          xa(n, f, c, i, e);
          if (e && h & 2048) {
            Sc(f.alternate, f);
          }
          break;
        default:
          xa(n, f, c, i, e);
      }
      t = t.sibling;
    }
  }
  function Cu(l, t) {
    if (t.subtreeFlags & 10256) {
      for (t = t.child; t !== null;) {
        var a = l;
        var u = t;
        var e = u.flags;
        switch (u.tag) {
          case 22:
            Cu(a, u);
            if (e & 2048) {
              dc(u.alternate, u);
            }
            break;
          case 24:
            Cu(a, u);
            if (e & 2048) {
              Sc(u.alternate, u);
            }
            break;
          default:
            Cu(a, u);
        }
        t = t.sibling;
      }
    }
  }
  var Zu = 8192;
  function Ka(l, t, a) {
    if (l.subtreeFlags & Zu) {
      for (l = l.child; l !== null;) {
        x1(l, t, a);
        l = l.sibling;
      }
    }
  }
  function x1(l, t, a) {
    switch (l.tag) {
      case 26:
        Ka(l, t, a);
        if (l.flags & Zu && l.memoizedState !== null) {
          oh(a, Kl, l.memoizedState, l.memoizedProps);
        }
        break;
      case 5:
        Ka(l, t, a);
        break;
      case 3:
      case 4:
        var u = Kl;
        Kl = cn(l.stateNode.containerInfo);
        Ka(l, t, a);
        Kl = u;
        break;
      case 22:
        if (l.memoizedState === null) {
          u = l.alternate;
          if (u !== null && u.memoizedState !== null) {
            u = Zu;
            Zu = 16777216;
            Ka(l, t, a);
            Zu = u;
          } else {
            Ka(l, t, a);
          }
        }
        break;
      default:
        Ka(l, t, a);
    }
  }
  function K1(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do {
        t = l.sibling;
        l.sibling = null;
        l = t;
      } while (l !== null);
    }
  }
  function Ru(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null) {
        for (var a = 0; a < t.length; a++) {
          var u = t[a];
          fl = u;
          J1(u, l);
        }
      }
      K1(l);
    }
    if (l.subtreeFlags & 10256) {
      for (l = l.child; l !== null;) {
        L1(l);
        l = l.sibling;
      }
    }
  }
  function L1(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Ru(l);
        if (l.flags & 2048) {
          Xt(9, l, l.return);
        }
        break;
      case 3:
        Ru(l);
        break;
      case 12:
        Ru(l);
        break;
      case 22:
        var t = l.stateNode;
        if (l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13)) {
          t._visibility &= -3;
          we(l);
        } else {
          Ru(l);
        }
        break;
      default:
        Ru(l);
    }
  }
  function we(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null) {
        for (var a = 0; a < t.length; a++) {
          var u = t[a];
          fl = u;
          J1(u, l);
        }
      }
      K1(l);
    }
    for (l = l.child; l !== null;) {
      t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          Xt(8, t, t.return);
          we(t);
          break;
        case 22:
          a = t.stateNode;
          if (a._visibility & 2) {
            a._visibility &= -3;
            we(t);
          }
          break;
        default:
          we(t);
      }
      l = l.sibling;
    }
  }
  function J1(l, t) {
    while (fl !== null) {
      var a = fl;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Xt(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var u = a.memoizedState.cachePool.pool;
            if (u != null) {
              u.refCount++;
            }
          }
          break;
        case 24:
          Eu(a.memoizedState.cache);
      }
      u = a.child;
      if (u !== null) {
        u.return = a;
        fl = u;
      } else {
        l: for (a = l; fl !== null;) {
          u = fl;
          var e = u.sibling;
          var n = u.return;
          Q1(u);
          if (u === a) {
            fl = null;
            break l;
          }
          if (e !== null) {
            e.return = n;
            fl = e;
            break l;
          }
          fl = n;
        }
      }
    }
  }
  var Rm = {
    getCacheForType: function (l) {
      var t = yl(I);
      var a = t.data.get(l);
      if (a === undefined) {
        a = l();
        t.data.set(l, a);
      }
      return a;
    },
    cacheSignal: function () {
      return yl(I).controller.signal;
    }
  };
  var pm = typeof WeakMap == "function" ? WeakMap : Map;
  var Q = 0;
  var x = null;
  var H = null;
  var _ = 0;
  var Z = 0;
  var _l = null;
  var Gt = false;
  var La = false;
  var gc = false;
  var gt = 0;
  var w = 0;
  var Qt = 0;
  var ha = 0;
  var zc = 0;
  var Bl = 0;
  var Ja = 0;
  var pu = null;
  var Al = null;
  var sc = false;
  var Fe = 0;
  var W1 = 0;
  var ke = Infinity;
  var re = null;
  var Ct = null;
  var al = 0;
  var Zt = null;
  var Wa = null;
  var zt = 0;
  var bc = 0;
  var Ac = null;
  var $1 = null;
  var ju = 0;
  var Tc = null;
  function ql() {
    if ((Q & 2) !== 0 && _ !== 0) {
      return _ & -_;
    } else if (O.T !== null) {
      return Uc();
    } else {
      return vi();
    }
  }
  function w1() {
    if (Bl === 0) {
      if ((_ & 536870912) === 0 || q) {
        var l = ne;
        ne <<= 1;
        if ((ne & 3932160) === 0) {
          ne = 262144;
        }
        Bl = l;
      } else {
        Bl = 536870912;
      }
    }
    l = Hl.current;
    if (l !== null) {
      l.flags |= 32;
    }
    return Bl;
  }
  function Tl(l, t, a) {
    if (l === x && (Z === 2 || Z === 9) || l.cancelPendingCommit !== null) {
      $a(l, 0);
      Rt(l, _, Bl, false);
    }
    cu(l, a);
    if ((Q & 2) === 0 || l !== x) {
      if (l === x) {
        if ((Q & 2) === 0) {
          ha |= a;
        }
        if (w === 4) {
          Rt(l, _, Bl, false);
        }
      }
      kl(l);
    }
  }
  function F1(l, t, a) {
    if ((Q & 6) !== 0) {
      throw Error(g(327));
    }
    var u = !a && (t & 127) === 0 && (t & l.expiredLanes) === 0 || fu(l, t);
    var e = u ? xm(l, t) : Mc(l, t, true);
    var n = u;
    do {
      if (e === 0) {
        if (La && !u) {
          Rt(l, t, 0, false);
        }
        break;
      } else {
        a = l.current.alternate;
        if (n && !jm(a)) {
          e = Mc(l, t, false);
          n = false;
          continue;
        }
        if (e === 2) {
          n = t;
          if (l.errorRecoveryDisabledLanes & n) {
            var f = 0;
          } else {
            f = l.pendingLanes & -536870913;
            f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          }
          if (f !== 0) {
            t = f;
            l: {
              var c = l;
              e = pu;
              var i = c.current.memoizedState.isDehydrated;
              if (i) {
                $a(c, f).flags |= 256;
              }
              f = Mc(c, f, false);
              if (f !== 2) {
                if (gc && !i) {
                  c.errorRecoveryDisabledLanes |= n;
                  ha |= n;
                  e = 4;
                  break l;
                }
                n = Al;
                Al = e;
                if (n !== null) {
                  if (Al === null) {
                    Al = n;
                  } else {
                    Al.push.apply(Al, n);
                  }
                }
              }
              e = f;
            }
            n = false;
            if (e !== 2) {
              continue;
            }
          }
        }
        if (e === 1) {
          $a(l, 0);
          Rt(l, t, 0, true);
          break;
        }
        l: {
          u = l;
          n = e;
          switch (n) {
            case 0:
            case 1:
              throw Error(g(345));
            case 4:
              if ((t & 4194048) !== t) {
                break;
              }
            case 6:
              Rt(u, t, Bl, !Gt);
              break l;
            case 2:
              Al = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(g(329));
          }
          if ((t & 62914560) === t && (e = Fe + 300 - Ml(), e > 10)) {
            Rt(u, t, Bl, !Gt);
            if (ce(u, 0, true) !== 0) {
              break l;
            }
            zt = t;
            u.timeoutHandle = Uv(k1.bind(null, u, a, Al, re, sc, t, Bl, ha, Ja, Gt, n, "Throttled", -0, 0), e);
            break l;
          }
          k1(u, a, Al, re, sc, t, Bl, ha, Ja, Gt, n, null, -0, 0);
        }
      }
      break;
    } while (true);
    kl(l);
  }
  function k1(l, t, a, u, e, n, f, c, i, h, z, b, d, S) {
    l.timeoutHandle = -1;
    b = t.subtreeFlags;
    if (b & 8192 || (b & 16785408) === 16785408) {
      b = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: true,
        waitingForViewTransition: false,
        unsuspend: tt
      };
      x1(t, n, b);
      var A = (n & 62914560) === n ? Fe - Ml() : (n & 4194048) === n ? W1 - Ml() : 0;
      A = Oh(b, A);
      if (A !== null) {
        zt = n;
        l.cancelPendingCommit = A(ev.bind(null, l, t, n, a, u, e, f, c, i, z, b, null, d, S));
        Rt(l, n, f, !h);
        return;
      }
    }
    ev(l, t, n, a, u, e, f, c, i);
  }
  function jm(l) {
    var t = l;
    for (;;) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null))) {
        for (var u = 0; u < a.length; u++) {
          var e = a[u];
          var n = e.getSnapshot;
          e = e.value;
          try {
            if (!Dl(n(), e)) {
              return false;
            }
          } catch {
            return false;
          }
        }
      }
      a = t.child;
      if (t.subtreeFlags & 16384 && a !== null) {
        a.return = t;
        t = a;
      } else {
        if (t === l) {
          break;
        }
        while (t.sibling === null) {
          if (t.return === null || t.return === l) {
            return true;
          }
          t = t.return;
        }
        t.sibling.return = t.return;
        t = t.sibling;
      }
    }
    return true;
  }
  function Rt(l, t, a, u) {
    t &= ~zc;
    t &= ~ha;
    l.suspendedLanes |= t;
    l.pingedLanes &= ~t;
    if (u) {
      l.warmLanes |= t;
    }
    u = l.expirationTimes;
    for (var e = t; e > 0;) {
      var n = 31 - Ol(e);
      var f = 1 << n;
      u[n] = -1;
      e &= ~f;
    }
    if (a !== 0) {
      fi(l, a, t);
    }
  }
  function Ie() {
    if ((Q & 6) === 0) {
      Vu(0);
      return false;
    } else {
      return true;
    }
  }
  function Ec() {
    if (H !== null) {
      if (Z === 0) {
        var l = H.return;
      } else {
        l = H;
        nt = ua = null;
        Zf(l);
        Za = null;
        ou = 0;
        l = H;
      }
      while (l !== null) {
        H1(l.alternate, l);
        l = l.return;
      }
      H = null;
    }
  }
  function $a(l, t) {
    var a = l.timeoutHandle;
    if (a !== -1) {
      l.timeoutHandle = -1;
      fh(a);
    }
    a = l.cancelPendingCommit;
    if (a !== null) {
      l.cancelPendingCommit = null;
      a();
    }
    zt = 0;
    Ec();
    x = l;
    H = a = ut(l.current, null);
    _ = t;
    Z = 0;
    _l = null;
    Gt = false;
    La = fu(l, t);
    gc = false;
    Ja = Bl = zc = ha = Qt = w = 0;
    Al = pu = null;
    sc = false;
    if ((t & 8) !== 0) {
      t |= t & 32;
    }
    var u = l.entangledLanes;
    if (u !== 0) {
      l = l.entanglements;
      u &= t;
      while (u > 0) {
        var e = 31 - Ol(u);
        var n = 1 << e;
        t |= l[e];
        u &= ~n;
      }
    }
    gt = t;
    Ae();
    return a;
  }
  function r1(l, t) {
    D = null;
    O.H = qu;
    if (t === Ca || t === He) {
      t = d0();
      Z = 3;
    } else if (t === Df) {
      t = d0();
      Z = 4;
    } else {
      Z = t === Pf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1;
    }
    _l = t;
    if (H === null) {
      w = 1;
      Ve(l, Ql(t, l.current));
    }
  }
  function I1() {
    var l = Hl.current;
    if (l === null) {
      return true;
    } else if ((_ & 4194048) === _) {
      return pl === null;
    } else if ((_ & 62914560) === _ || (_ & 536870912) !== 0) {
      return l === pl;
    } else {
      return false;
    }
  }
  function P1() {
    var l = O.H;
    O.H = qu;
    if (l === null) {
      return qu;
    } else {
      return l;
    }
  }
  function lv() {
    var l = O.A;
    O.A = Rm;
    return l;
  }
  function Pe() {
    w = 4;
    if (!Gt && ((_ & 4194048) === _ || Hl.current === null)) {
      La = true;
    }
    if (((Qt & 134217727) !== 0 || (ha & 134217727) !== 0) && x !== null) {
      Rt(x, _, Bl, false);
    }
  }
  function Mc(l, t, a) {
    var u = Q;
    Q |= 2;
    var e = P1();
    var n = lv();
    if (x !== l || _ !== t) {
      re = null;
      $a(l, t);
    }
    t = false;
    var f = w;
    l: do {
      try {
        if (Z !== 0 && H !== null) {
          var c = H;
          var i = _l;
          switch (Z) {
            case 8:
              Ec();
              f = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              if (Hl.current === null) {
                t = true;
              }
              var h = Z;
              Z = 0;
              _l = null;
              wa(l, c, i, h);
              if (a && La) {
                f = 0;
                break l;
              }
              break;
            default:
              h = Z;
              Z = 0;
              _l = null;
              wa(l, c, i, h);
          }
        }
        Vm();
        f = w;
        break;
      } catch (z) {
        r1(l, z);
      }
    } while (true);
    if (t) {
      l.shellSuspendCounter++;
    }
    nt = ua = null;
    Q = u;
    O.H = e;
    O.A = n;
    if (H === null) {
      x = null;
      _ = 0;
      Ae();
    }
    return f;
  }
  function Vm() {
    while (H !== null) {
      tv(H);
    }
  }
  function xm(l, t) {
    var a = Q;
    Q |= 2;
    var u = P1();
    var e = lv();
    if (x !== l || _ !== t) {
      re = null;
      ke = Ml() + 500;
      $a(l, t);
    } else {
      La = fu(l, t);
    }
    l: do {
      try {
        if (Z !== 0 && H !== null) {
          t = H;
          var n = _l;
          t: switch (Z) {
            case 1:
              Z = 0;
              _l = null;
              wa(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (m0(n)) {
                Z = 0;
                _l = null;
                av(t);
                break;
              }
              t = function () {
                if ((Z === 2 || Z === 9) && x === l) {
                  Z = 7;
                }
                kl(l);
              };
              n.then(t, t);
              break l;
            case 3:
              Z = 7;
              break l;
            case 4:
              Z = 5;
              break l;
            case 7:
              if (m0(n)) {
                Z = 0;
                _l = null;
                av(t);
              } else {
                Z = 0;
                _l = null;
                wa(l, t, n, 7);
              }
              break;
            case 5:
              var f = null;
              switch (H.tag) {
                case 26:
                  f = H.memoizedState;
                case 5:
                case 27:
                  var c = H;
                  if (f ? Vv(f) : c.stateNode.complete) {
                    Z = 0;
                    _l = null;
                    var i = c.sibling;
                    if (i !== null) {
                      H = i;
                    } else {
                      var h = c.return;
                      if (h !== null) {
                        H = h;
                        ln(h);
                      } else {
                        H = null;
                      }
                    }
                    break t;
                  }
              }
              Z = 0;
              _l = null;
              wa(l, t, n, 5);
              break;
            case 6:
              Z = 0;
              _l = null;
              wa(l, t, n, 6);
              break;
            case 8:
              Ec();
              w = 6;
              break l;
            default:
              throw Error(g(462));
          }
        }
        Km();
        break;
      } catch (z) {
        r1(l, z);
      }
    } while (true);
    nt = ua = null;
    O.H = u;
    O.A = e;
    Q = a;
    if (H !== null) {
      return 0;
    } else {
      x = null;
      _ = 0;
      Ae();
      return w;
    }
  }
  function Km() {
    while (H !== null && !hy()) {
      tv(H);
    }
  }
  function tv(l) {
    var t = D1(l.alternate, l, gt);
    l.memoizedProps = l.pendingProps;
    if (t === null) {
      ln(l);
    } else {
      H = t;
    }
  }
  function av(l) {
    var t = l;
    var a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = A1(a, t, t.pendingProps, t.type, undefined, _);
        break;
      case 11:
        t = A1(a, t, t.pendingProps, t.type.render, t.ref, _);
        break;
      case 5:
        Zf(t);
      default:
        H1(a, t);
        t = H = l0(t, gt);
        t = D1(a, t, gt);
    }
    l.memoizedProps = l.pendingProps;
    if (t === null) {
      ln(l);
    } else {
      H = t;
    }
  }
  function wa(l, t, a, u) {
    nt = ua = null;
    Zf(t);
    Za = null;
    ou = 0;
    var e = t.return;
    try {
      if (qm(l, e, t, a, _)) {
        w = 1;
        Ve(l, Ql(a, l.current));
        H = null;
        return;
      }
    } catch (n) {
      if (e !== null) {
        H = e;
        throw n;
      }
      w = 1;
      Ve(l, Ql(a, l.current));
      H = null;
      return;
    }
    if (t.flags & 32768) {
      if (q || u === 1) {
        l = true;
      } else if (La || (_ & 536870912) !== 0) {
        l = false;
      } else {
        Gt = l = true;
        if (u === 2 || u === 9 || u === 3 || u === 6) {
          u = Hl.current;
          if (u !== null && u.tag === 13) {
            u.flags |= 16384;
          }
        }
      }
      uv(t, l);
    } else {
      ln(t);
    }
  }
  function ln(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        uv(t, Gt);
        return;
      }
      l = t.return;
      var a = Gm(t.alternate, t, gt);
      if (a !== null) {
        H = a;
        return;
      }
      t = t.sibling;
      if (t !== null) {
        H = t;
        return;
      }
      H = t = l;
    } while (t !== null);
    if (w === 0) {
      w = 5;
    }
  }
  function uv(l, t) {
    do {
      var a = Qm(l.alternate, l);
      if (a !== null) {
        a.flags &= 32767;
        H = a;
        return;
      }
      a = l.return;
      if (a !== null) {
        a.flags |= 32768;
        a.subtreeFlags = 0;
        a.deletions = null;
      }
      if (!t && (l = l.sibling, l !== null)) {
        H = l;
        return;
      }
      H = l = a;
    } while (l !== null);
    w = 6;
    H = null;
  }
  function ev(l, t, a, u, e, n, f, c, i) {
    l.cancelPendingCommit = null;
    do {
      tn();
    } while (al !== 0);
    if ((Q & 6) !== 0) {
      throw Error(g(327));
    }
    if (t !== null) {
      if (t === l.current) {
        throw Error(g(177));
      }
      n = t.lanes | t.childLanes;
      n |= yf;
      My(l, a, n, f, c, i);
      if (l === x) {
        H = x = null;
        _ = 0;
      }
      Wa = t;
      Zt = l;
      zt = a;
      bc = n;
      Ac = e;
      $1 = u;
      if ((t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0) {
        l.callbackNode = null;
        l.callbackPriority = 0;
        $m(ue, function () {
          vv();
          return null;
        });
      } else {
        l.callbackNode = null;
        l.callbackPriority = 0;
      }
      u = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || u) {
        u = O.T;
        O.T = null;
        e = G.p;
        G.p = 2;
        f = Q;
        Q |= 4;
        try {
          Cm(l, t, a);
        } finally {
          Q = f;
          G.p = e;
          O.T = u;
        }
      }
      al = 1;
      nv();
      fv();
      cv();
    }
  }
  function nv() {
    if (al === 1) {
      al = 0;
      var l = Zt;
      var t = Wa;
      var a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = O.T;
        O.T = null;
        var u = G.p;
        G.p = 2;
        var e = Q;
        Q |= 4;
        try {
          p1(t, l);
          var n = Gc;
          var f = Ji(l.containerInfo);
          var c = n.focusedElem;
          var i = n.selectionRange;
          if (f !== c && c && c.ownerDocument && Li(c.ownerDocument.documentElement, c)) {
            if (i !== null && ef(c)) {
              var h = i.start;
              var z = i.end;
              if (z === undefined) {
                z = h;
              }
              if ("selectionStart" in c) {
                c.selectionStart = h;
                c.selectionEnd = Math.min(z, c.value.length);
              } else {
                var b = c.ownerDocument || document;
                var d = b && b.defaultView || window;
                if (d.getSelection) {
                  var S = d.getSelection();
                  var A = c.textContent.length;
                  var o = Math.min(i.start, A);
                  var V = i.end === undefined ? o : Math.min(i.end, A);
                  if (!S.extend && o > V) {
                    f = V;
                    V = o;
                    o = f;
                  }
                  var y = Ki(c, o);
                  var v = Ki(c, V);
                  if (y && v && (S.rangeCount !== 1 || S.anchorNode !== y.node || S.anchorOffset !== y.offset || S.focusNode !== v.node || S.focusOffset !== v.offset)) {
                    var m = b.createRange();
                    m.setStart(y.node, y.offset);
                    S.removeAllRanges();
                    if (o > V) {
                      S.addRange(m);
                      S.extend(v.node, v.offset);
                    } else {
                      m.setEnd(v.node, v.offset);
                      S.addRange(m);
                    }
                  }
                }
              }
            }
            b = [];
            S = c;
            while (S = S.parentNode) {
              if (S.nodeType === 1) {
                b.push({
                  element: S,
                  left: S.scrollLeft,
                  top: S.scrollTop
                });
              }
            }
            if (typeof c.focus == "function") {
              c.focus();
            }
            c = 0;
            for (; c < b.length; c++) {
              var s = b[c];
              s.element.scrollLeft = s.left;
              s.element.scrollTop = s.top;
            }
          }
          Sn = !!Xc;
          Gc = Xc = null;
        } finally {
          Q = e;
          G.p = u;
          O.T = a;
        }
      }
      l.current = t;
      al = 2;
    }
  }
  function fv() {
    if (al === 2) {
      al = 0;
      var l = Zt;
      var t = Wa;
      var a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = O.T;
        O.T = null;
        var u = G.p;
        G.p = 2;
        var e = Q;
        Q |= 4;
        try {
          G1(l, t.alternate, t);
        } finally {
          Q = e;
          G.p = u;
          O.T = a;
        }
      }
      al = 3;
    }
  }
  function cv() {
    if (al === 4 || al === 3) {
      al = 0;
      dy();
      var l = Zt;
      var t = Wa;
      var a = zt;
      var u = $1;
      if ((t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0) {
        al = 5;
      } else {
        al = 0;
        Wa = Zt = null;
        iv(l, l.pendingLanes);
      }
      var e = l.pendingLanes;
      if (e === 0) {
        Ct = null;
      }
      pn(a);
      t = t.stateNode;
      if (ol && typeof ol.onCommitFiberRoot == "function") {
        try {
          ol.onCommitFiberRoot(nu, t, undefined, (t.current.flags & 128) === 128);
        } catch {}
      }
      if (u !== null) {
        t = O.T;
        e = G.p;
        G.p = 2;
        O.T = null;
        try {
          var n = l.onRecoverableError;
          for (var f = 0; f < u.length; f++) {
            var c = u[f];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          O.T = t;
          G.p = e;
        }
      }
      if ((zt & 3) !== 0) {
        tn();
      }
      kl(l);
      e = l.pendingLanes;
      if ((a & 261930) !== 0 && (e & 42) !== 0) {
        if (l === Tc) {
          ju++;
        } else {
          ju = 0;
          Tc = l;
        }
      } else {
        ju = 0;
      }
      Vu(0);
    }
  }
  function iv(l, t) {
    if ((l.pooledCacheLanes &= t) === 0) {
      t = l.pooledCache;
      if (t != null) {
        l.pooledCache = null;
        Eu(t);
      }
    }
  }
  function tn() {
    nv();
    fv();
    cv();
    return vv();
  }
  function vv() {
    if (al !== 5) {
      return false;
    }
    var l = Zt;
    var t = bc;
    bc = 0;
    var a = pn(zt);
    var u = O.T;
    var e = G.p;
    try {
      G.p = a < 32 ? 32 : a;
      O.T = null;
      a = Ac;
      Ac = null;
      var n = Zt;
      var f = zt;
      al = 0;
      Wa = Zt = null;
      zt = 0;
      if ((Q & 6) !== 0) {
        throw Error(g(331));
      }
      var c = Q;
      Q |= 4;
      L1(n.current);
      V1(n, n.current, f, a);
      Q = c;
      Vu(0, false);
      if (ol && typeof ol.onPostCommitFiberRoot == "function") {
        try {
          ol.onPostCommitFiberRoot(nu, n);
        } catch {}
      }
      return true;
    } finally {
      G.p = e;
      O.T = u;
      iv(l, t);
    }
  }
  function yv(l, t, a) {
    t = Ql(a, t);
    t = If(l.stateNode, t, 2);
    l = Bt(l, t, 2);
    if (l !== null) {
      cu(l, 2);
      kl(l);
    }
  }
  function R(l, t, a) {
    if (l.tag === 3) {
      yv(l, l, a);
    } else {
      while (t !== null) {
        if (t.tag === 3) {
          yv(t, l, a);
          break;
        } else if (t.tag === 1) {
          var u = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && (Ct === null || !Ct.has(u))) {
            l = Ql(a, l);
            a = m1(2);
            u = Bt(t, a, 2);
            if (u !== null) {
              h1(a, u, t, l);
              cu(u, 2);
              kl(u);
            }
            break;
          }
        }
        t = t.return;
      }
    }
  }
  function oc(l, t, a) {
    var u = l.pingCache;
    if (u === null) {
      u = l.pingCache = new pm();
      var e = new Set();
      u.set(t, e);
    } else {
      e = u.get(t);
      if (e === undefined) {
        e = new Set();
        u.set(t, e);
      }
    }
    if (!e.has(a)) {
      gc = true;
      e.add(a);
      l = Lm.bind(null, l, t, a);
      t.then(l, l);
    }
  }
  function Lm(l, t, a) {
    var u = l.pingCache;
    if (u !== null) {
      u.delete(t);
    }
    l.pingedLanes |= l.suspendedLanes & a;
    l.warmLanes &= ~a;
    if (x === l && (_ & a) === a) {
      if (w === 4 || w === 3 && (_ & 62914560) === _ && Ml() - Fe < 300) {
        if ((Q & 2) === 0) {
          $a(l, 0);
        }
      } else {
        zc |= a;
      }
      if (Ja === _) {
        Ja = 0;
      }
    }
    kl(l);
  }
  function mv(l, t) {
    if (t === 0) {
      t = ni();
    }
    l = la(l, t);
    if (l !== null) {
      cu(l, t);
      kl(l);
    }
  }
  function Jm(l) {
    var t = l.memoizedState;
    var a = 0;
    if (t !== null) {
      a = t.retryLane;
    }
    mv(l, a);
  }
  function Wm(l, t) {
    var a = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var u = l.stateNode;
        var e = l.memoizedState;
        if (e !== null) {
          a = e.retryLane;
        }
        break;
      case 19:
        u = l.stateNode;
        break;
      case 22:
        u = l.stateNode._retryCache;
        break;
      default:
        throw Error(g(314));
    }
    if (u !== null) {
      u.delete(t);
    }
    mv(l, a);
  }
  function $m(l, t) {
    return Qn(l, t);
  }
  var an = null;
  var Fa = null;
  var Oc = false;
  var un = false;
  var Dc = false;
  var pt = 0;
  function kl(l) {
    if (l !== Fa && l.next === null) {
      if (Fa === null) {
        an = Fa = l;
      } else {
        Fa = Fa.next = l;
      }
    }
    un = true;
    if (!Oc) {
      Oc = true;
      Fm();
    }
  }
  function Vu(l, t) {
    if (!Dc && un) {
      Dc = true;
      do {
        var a = false;
        for (var u = an; u !== null;) {
          if (l !== 0) {
            var e = u.pendingLanes;
            if (e === 0) {
              var n = 0;
            } else {
              var f = u.suspendedLanes;
              var c = u.pingedLanes;
              n = (1 << 31 - Ol(l | 42) + 1) - 1;
              n &= e & ~(f & ~c);
              n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            if (n !== 0) {
              a = true;
              gv(u, n);
            }
          } else {
            n = _;
            n = ce(u, u === x ? n : 0, u.cancelPendingCommit !== null || u.timeoutHandle !== -1);
            if ((n & 3) !== 0 && !fu(u, n)) {
              a = true;
              gv(u, n);
            }
          }
          u = u.next;
        }
      } while (a);
      Dc = false;
    }
  }
  function wm() {
    hv();
  }
  function hv() {
    un = Oc = false;
    var l = 0;
    if (pt !== 0 && nh()) {
      l = pt;
    }
    var t = Ml();
    var a = null;
    for (var u = an; u !== null;) {
      var e = u.next;
      var n = dv(u, t);
      if (n === 0) {
        u.next = null;
        if (a === null) {
          an = e;
        } else {
          a.next = e;
        }
        if (e === null) {
          Fa = a;
        }
      } else {
        a = u;
        if (l !== 0 || (n & 3) !== 0) {
          un = true;
        }
      }
      u = e;
    }
    if (al === 0 || al === 5) {
      Vu(l);
    }
    if (pt !== 0) {
      pt = 0;
    }
  }
  function dv(l, t) {
    var a = l.suspendedLanes;
    var u = l.pingedLanes;
    var e = l.expirationTimes;
    for (var n = l.pendingLanes & -62914561; n > 0;) {
      var f = 31 - Ol(n);
      var c = 1 << f;
      var i = e[f];
      if (i === -1) {
        if ((c & a) === 0 || (c & u) !== 0) {
          e[f] = Ey(c, t);
        }
      } else if (i <= t) {
        l.expiredLanes |= c;
      }
      n &= ~c;
    }
    t = x;
    a = _;
    a = ce(l, l === t ? a : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1);
    u = l.callbackNode;
    if (a === 0 || l === t && (Z === 2 || Z === 9) || l.cancelPendingCommit !== null) {
      if (u !== null && u !== null) {
        Cn(u);
      }
      l.callbackNode = null;
      return l.callbackPriority = 0;
    }
    if ((a & 3) === 0 || fu(l, a)) {
      t = a & -a;
      if (t === l.callbackPriority) {
        return t;
      }
      if (u !== null) {
        Cn(u);
      }
      switch (pn(a)) {
        case 2:
        case 8:
          a = ui;
          break;
        case 32:
          a = ue;
          break;
        case 268435456:
          a = ei;
          break;
        default:
          a = ue;
      }
      u = Sv.bind(null, l);
      a = Qn(a, u);
      l.callbackPriority = t;
      l.callbackNode = a;
      return t;
    }
    if (u !== null && u !== null) {
      Cn(u);
    }
    l.callbackPriority = 2;
    l.callbackNode = null;
    return 2;
  }
  function Sv(l, t) {
    if (al !== 0 && al !== 5) {
      l.callbackNode = null;
      l.callbackPriority = 0;
      return null;
    }
    var a = l.callbackNode;
    if (tn() && l.callbackNode !== a) {
      return null;
    }
    var u = _;
    u = ce(l, l === x ? u : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1);
    if (u === 0) {
      return null;
    } else {
      F1(l, u, t);
      dv(l, Ml());
      if (l.callbackNode != null && l.callbackNode === a) {
        return Sv.bind(null, l);
      } else {
        return null;
      }
    }
  }
  function gv(l, t) {
    if (tn()) {
      return null;
    }
    F1(l, t, true);
  }
  function Fm() {
    ch(function () {
      if ((Q & 6) !== 0) {
        Qn(ai, wm);
      } else {
        hv();
      }
    });
  }
  function Uc() {
    if (pt === 0) {
      var l = Ga;
      if (l === 0) {
        l = ee;
        ee <<= 1;
        if ((ee & 261888) === 0) {
          ee = 256;
        }
      }
      pt = l;
    }
    return pt;
  }
  function zv(l) {
    if (l == null || typeof l == "symbol" || typeof l == "boolean") {
      return null;
    } else if (typeof l == "function") {
      return l;
    } else {
      return me("" + l);
    }
  }
  function sv(l, t) {
    var a = t.ownerDocument.createElement("input");
    a.name = t.name;
    a.value = t.value;
    if (l.id) {
      a.setAttribute("form", l.id);
    }
    t.parentNode.insertBefore(a, t);
    l = new FormData(l);
    a.parentNode.removeChild(a);
    return l;
  }
  function km(l, t, a, u, e) {
    if (t === "submit" && a && a.stateNode === e) {
      var n = zv((e[Sl] || null).action);
      var f = u.submitter;
      if (f) {
        t = (t = f[Sl] || null) ? zv(t.formAction) : f.getAttribute("formAction");
        if (t !== null) {
          n = t;
          f = null;
        }
      }
      var c = new ge("action", "action", null, u, e);
      l.push({
        event: c,
        listeners: [{
          instance: null,
          listener: function () {
            if (u.defaultPrevented) {
              if (pt !== 0) {
                var i = f ? sv(e, f) : new FormData(e);
                Wf(a, {
                  pending: true,
                  data: i,
                  method: e.method,
                  action: n
                }, null, i);
              }
            } else if (typeof n == "function") {
              c.preventDefault();
              i = f ? sv(e, f) : new FormData(e);
              Wf(a, {
                pending: true,
                data: i,
                method: e.method,
                action: n
              }, n, i);
            }
          },
          currentTarget: e
        }]
      });
    }
  }
  for (var Hc = 0; Hc < vf.length; Hc++) {
    var Nc = vf[Hc];
    var rm = Nc.toLowerCase();
    var Im = Nc[0].toUpperCase() + Nc.slice(1);
    xl(rm, "on" + Im);
  }
  xl(wi, "onAnimationEnd");
  xl(Fi, "onAnimationIteration");
  xl(ki, "onAnimationStart");
  xl("dblclick", "onDoubleClick");
  xl("focusin", "onFocus");
  xl("focusout", "onBlur");
  xl(Sm, "onTransitionRun");
  xl(gm, "onTransitionStart");
  xl(zm, "onTransitionCancel");
  xl(ri, "onTransitionEnd");
  Ta("onMouseEnter", ["mouseout", "mouseover"]);
  Ta("onMouseLeave", ["mouseout", "mouseover"]);
  Ta("onPointerEnter", ["pointerout", "pointerover"]);
  Ta("onPointerLeave", ["pointerout", "pointerover"]);
  kt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  kt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  kt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  kt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  kt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  kt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var xu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
  var Pm = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(xu));
  function bv(l, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < l.length; a++) {
      var u = l[a];
      var e = u.event;
      u = u.listeners;
      l: {
        var n = undefined;
        if (t) {
          for (var f = u.length - 1; f >= 0; f--) {
            var c = u[f];
            var i = c.instance;
            var h = c.currentTarget;
            c = c.listener;
            if (i !== n && e.isPropagationStopped()) {
              break l;
            }
            n = c;
            e.currentTarget = h;
            try {
              n(e);
            } catch (z) {
              be(z);
            }
            e.currentTarget = null;
            n = i;
          }
        } else {
          for (f = 0; f < u.length; f++) {
            c = u[f];
            i = c.instance;
            h = c.currentTarget;
            c = c.listener;
            if (i !== n && e.isPropagationStopped()) {
              break l;
            }
            n = c;
            e.currentTarget = h;
            try {
              n(e);
            } catch (z) {
              be(z);
            }
            e.currentTarget = null;
            n = i;
          }
        }
      }
    }
  }
  function N(l, t) {
    var a = t[jn];
    if (a === undefined) {
      a = t[jn] = new Set();
    }
    var u = l + "__bubble";
    if (!a.has(u)) {
      Av(t, l, 2, false);
      a.add(u);
    }
  }
  function _c(l, t, a) {
    var u = 0;
    if (t) {
      u |= 4;
    }
    Av(a, l, u, t);
  }
  var en = "_reactListening" + Math.random().toString(36).slice(2);
  function Bc(l) {
    if (!l[en]) {
      l[en] = true;
      hi.forEach(function (a) {
        if (a !== "selectionchange") {
          if (!Pm.has(a)) {
            _c(a, false, l);
          }
          _c(a, true, l);
        }
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      if (t !== null && !t[en]) {
        t[en] = true;
        _c("selectionchange", false, t);
      }
    }
  }
  function Av(l, t, a, u) {
    switch (wv(t)) {
      case 2:
        var e = Hh;
        break;
      case 8:
        e = Nh;
        break;
      default:
        e = Jc;
    }
    a = e.bind(null, t, a, l);
    e = undefined;
    if (!!Fn && (t === "touchstart" || t === "touchmove" || t === "wheel")) {
      e = true;
    }
    if (u) {
      if (e !== undefined) {
        l.addEventListener(t, a, {
          capture: true,
          passive: e
        });
      } else {
        l.addEventListener(t, a, true);
      }
    } else if (e !== undefined) {
      l.addEventListener(t, a, {
        passive: e
      });
    } else {
      l.addEventListener(t, a, false);
    }
  }
  function qc(l, t, a, u, e) {
    var n = u;
    if ((t & 1) === 0 && (t & 2) === 0 && u !== null) {
      l: while (true) {
        if (u === null) {
          return;
        }
        var f = u.tag;
        if (f === 3 || f === 4) {
          var c = u.stateNode.containerInfo;
          if (c === e) {
            break;
          }
          if (f === 4) {
            for (f = u.return; f !== null;) {
              var i = f.tag;
              if ((i === 3 || i === 4) && f.stateNode.containerInfo === e) {
                return;
              }
              f = f.return;
            }
          }
          while (c !== null) {
            f = sa(c);
            if (f === null) {
              return;
            }
            i = f.tag;
            if (i === 5 || i === 6 || i === 26 || i === 27) {
              u = n = f;
              continue l;
            }
            c = c.parentNode;
          }
        }
        u = u.return;
      }
    }
    Oi(function () {
      var h = n;
      var z = $n(a);
      var b = [];
      l: {
        var d = Ii.get(l);
        if (d !== undefined) {
          var S = ge;
          var A = l;
          switch (l) {
            case "keypress":
              if (de(a) === 0) {
                break l;
              }
            case "keydown":
            case "keyup":
              S = Wy;
              break;
            case "focusin":
              A = "focus";
              S = Pn;
              break;
            case "focusout":
              A = "blur";
              S = Pn;
              break;
            case "beforeblur":
            case "afterblur":
              S = Pn;
              break;
            case "click":
              if (a.button === 2) {
                break l;
              }
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              S = Hi;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              S = Gy;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              S = Fy;
              break;
            case wi:
            case Fi:
            case ki:
              S = Zy;
              break;
            case ri:
              S = ry;
              break;
            case "scroll":
            case "scrollend":
              S = Yy;
              break;
            case "wheel":
              S = Py;
              break;
            case "copy":
            case "cut":
            case "paste":
              S = py;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              S = _i;
              break;
            case "toggle":
            case "beforetoggle":
              S = tm;
          }
          var o = (t & 4) !== 0;
          var V = !o && (l === "scroll" || l === "scrollend");
          var y = o ? d !== null ? d + "Capture" : null : d;
          o = [];
          for (var v = h, m; v !== null;) {
            var s = v;
            m = s.stateNode;
            s = s.tag;
            if ((s === 5 || s === 26 || s === 27) && m !== null && y !== null) {
              s = yu(v, y);
              if (s != null) {
                o.push(Ku(v, s, m));
              }
            }
            if (V) {
              break;
            }
            v = v.return;
          }
          if (o.length > 0) {
            d = new S(d, A, null, a, z);
            b.push({
              event: d,
              listeners: o
            });
          }
        }
      }
      if ((t & 7) === 0) {
        l: {
          d = l === "mouseover" || l === "pointerover";
          S = l === "mouseout" || l === "pointerout";
          if (d && a !== Wn && (A = a.relatedTarget || a.fromElement) && (sa(A) || A[za])) {
            break l;
          }
          if ((S || d) && (d = z.window === z ? z : (d = z.ownerDocument) ? d.defaultView || d.parentWindow : window, S ? (A = a.relatedTarget || a.toElement, S = h, A = A ? sa(A) : null, A !== null && (V = ul(A), o = A.tag, A !== V || o !== 5 && o !== 27 && o !== 6) && (A = null)) : (S = null, A = h), S !== A)) {
            o = Hi;
            s = "onMouseLeave";
            y = "onMouseEnter";
            v = "mouse";
            if (l === "pointerout" || l === "pointerover") {
              o = _i;
              s = "onPointerLeave";
              y = "onPointerEnter";
              v = "pointer";
            }
            V = S == null ? d : vu(S);
            m = A == null ? d : vu(A);
            d = new o(s, v + "leave", S, a, z);
            d.target = V;
            d.relatedTarget = m;
            s = null;
            if (sa(z) === h) {
              o = new o(y, v + "enter", A, a, z);
              o.target = m;
              o.relatedTarget = V;
              s = o;
            }
            V = s;
            if (S && A) {
              t: {
                o = lh;
                y = S;
                v = A;
                m = 0;
                s = y;
                for (; s; s = o(s)) {
                  m++;
                }
                s = 0;
                for (var M = v; M; M = o(M)) {
                  s++;
                }
                while (m - s > 0) {
                  y = o(y);
                  m--;
                }
                while (s - m > 0) {
                  v = o(v);
                  s--;
                }
                while (m--) {
                  if (y === v || v !== null && y === v.alternate) {
                    o = y;
                    break t;
                  }
                  y = o(y);
                  v = o(v);
                }
                o = null;
              }
            } else {
              o = null;
            }
            if (S !== null) {
              Tv(b, d, S, o, false);
            }
            if (A !== null && V !== null) {
              Tv(b, V, A, o, true);
            }
          }
        }
        l: {
          d = h ? vu(h) : window;
          S = d.nodeName && d.nodeName.toLowerCase();
          if (S === "select" || S === "input" && d.type === "file") {
            var Y = Zi;
          } else if (Qi(d)) {
            if (Ri) {
              Y = mm;
            } else {
              Y = vm;
              var T = im;
            }
          } else {
            S = d.nodeName;
            if (!S || S.toLowerCase() !== "input" || d.type !== "checkbox" && d.type !== "radio") {
              if (h && Jn(h.elementType)) {
                Y = Zi;
              }
            } else {
              Y = ym;
            }
          }
          if (Y &&= Y(l, h)) {
            Ci(b, Y, a, z);
            break l;
          }
          if (T) {
            T(l, d, h);
          }
          if (l === "focusout" && h && d.type === "number" && h.memoizedProps.value != null) {
            Ln(d, "number", d.value);
          }
        }
        T = h ? vu(h) : window;
        switch (l) {
          case "focusin":
            if (Qi(T) || T.contentEditable === "true") {
              Ua = T;
              nf = h;
              bu = null;
            }
            break;
          case "focusout":
            bu = nf = Ua = null;
            break;
          case "mousedown":
            ff = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ff = false;
            Wi(b, a, z);
            break;
          case "selectionchange":
            if (dm) {
              break;
            }
          case "keydown":
          case "keyup":
            Wi(b, a, z);
        }
        var U;
        if (tf) {
          l: {
            switch (l) {
              case "compositionstart":
                var B = "onCompositionStart";
                break l;
              case "compositionend":
                B = "onCompositionEnd";
                break l;
              case "compositionupdate":
                B = "onCompositionUpdate";
                break l;
            }
            B = undefined;
          }
        } else if (Da) {
          if (Xi(l, a)) {
            B = "onCompositionEnd";
          }
        } else if (l === "keydown" && a.keyCode === 229) {
          B = "onCompositionStart";
        }
        if (B) {
          if (Bi && a.locale !== "ko") {
            if (Da || B !== "onCompositionStart") {
              if (B === "onCompositionEnd" && Da) {
                U = Di();
              }
            } else {
              ot = z;
              kn = "value" in ot ? ot.value : ot.textContent;
              Da = true;
            }
          }
          T = nn(h, B);
          if (T.length > 0) {
            B = new Ni(B, l, null, a, z);
            b.push({
              event: B,
              listeners: T
            });
            if (U) {
              B.data = U;
            } else {
              U = Gi(a);
              if (U !== null) {
                B.data = U;
              }
            }
          }
        }
        if (U = um ? em(l, a) : nm(l, a)) {
          B = nn(h, "onBeforeInput");
          if (B.length > 0) {
            T = new Ni("onBeforeInput", "beforeinput", null, a, z);
            b.push({
              event: T,
              listeners: B
            });
            T.data = U;
          }
        }
        km(b, l, h, a, z);
      }
      bv(b, t);
    });
  }
  function Ku(l, t, a) {
    return {
      instance: l,
      listener: t,
      currentTarget: a
    };
  }
  function nn(l, t) {
    var a = t + "Capture";
    var u = [];
    for (; l !== null;) {
      var e = l;
      var n = e.stateNode;
      e = e.tag;
      if ((e === 5 || e === 26 || e === 27) && n !== null) {
        e = yu(l, a);
        if (e != null) {
          u.unshift(Ku(l, e, n));
        }
        e = yu(l, t);
        if (e != null) {
          u.push(Ku(l, e, n));
        }
      }
      if (l.tag === 3) {
        return u;
      }
      l = l.return;
    }
    return [];
  }
  function lh(l) {
    if (l === null) {
      return null;
    }
    do {
      l = l.return;
    } while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Tv(l, t, a, u, e) {
    var n = t._reactName;
    var f = [];
    for (; a !== null && a !== u;) {
      var c = a;
      var i = c.alternate;
      var h = c.stateNode;
      c = c.tag;
      if (i !== null && i === u) {
        break;
      }
      if ((c === 5 || c === 26 || c === 27) && h !== null) {
        i = h;
        if (e) {
          h = yu(a, n);
          if (h != null) {
            f.unshift(Ku(a, h, i));
          }
        } else if (!e) {
          h = yu(a, n);
          if (h != null) {
            f.push(Ku(a, h, i));
          }
        }
      }
      a = a.return;
    }
    if (f.length !== 0) {
      l.push({
        event: t,
        listeners: f
      });
    }
  }
  var th = /\r\n?/g;
  var ah = /\u0000|\uFFFD/g;
  function Ev(l) {
    return (typeof l == "string" ? l : "" + l).replace(th, `
`).replace(ah, "");
  }
  function Mv(l, t) {
    t = Ev(t);
    return Ev(l) === t;
  }
  function j(l, t, a, u, e, n) {
    switch (a) {
      case "children":
        if (typeof u == "string") {
          if (t !== "body" && (t !== "textarea" || u !== "")) {
            Ma(l, u);
          }
        } else if ((typeof u == "number" || typeof u == "bigint") && t !== "body") {
          Ma(l, "" + u);
        }
        break;
      case "className":
        ve(l, "class", u);
        break;
      case "tabIndex":
        ve(l, "tabindex", u);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ve(l, a, u);
        break;
      case "style":
        Mi(l, u, n);
        break;
      case "data":
        if (t !== "object") {
          ve(l, "data", u);
          break;
        }
      case "src":
      case "href":
        if (u === "" && (t !== "a" || a !== "href")) {
          l.removeAttribute(a);
          break;
        }
        if (u == null || typeof u == "function" || typeof u == "symbol" || typeof u == "boolean") {
          l.removeAttribute(a);
          break;
        }
        u = me("" + u);
        l.setAttribute(a, u);
        break;
      case "action":
      case "formAction":
        if (typeof u == "function") {
          l.setAttribute(a, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else if (typeof n == "function") {
          if (a === "formAction") {
            if (t !== "input") {
              j(l, t, "name", e.name, e, null);
            }
            j(l, t, "formEncType", e.formEncType, e, null);
            j(l, t, "formMethod", e.formMethod, e, null);
            j(l, t, "formTarget", e.formTarget, e, null);
          } else {
            j(l, t, "encType", e.encType, e, null);
            j(l, t, "method", e.method, e, null);
            j(l, t, "target", e.target, e, null);
          }
        }
        if (u == null || typeof u == "symbol" || typeof u == "boolean") {
          l.removeAttribute(a);
          break;
        }
        u = me("" + u);
        l.setAttribute(a, u);
        break;
      case "onClick":
        if (u != null) {
          l.onclick = tt;
        }
        break;
      case "onScroll":
        if (u != null) {
          N("scroll", l);
        }
        break;
      case "onScrollEnd":
        if (u != null) {
          N("scrollend", l);
        }
        break;
      case "dangerouslySetInnerHTML":
        if (u != null) {
          if (typeof u != "object" || !("__html" in u)) {
            throw Error(g(61));
          }
          a = u.__html;
          if (a != null) {
            if (e.children != null) {
              throw Error(g(60));
            }
            l.innerHTML = a;
          }
        }
        break;
      case "multiple":
        l.multiple = u && typeof u != "function" && typeof u != "symbol";
        break;
      case "muted":
        l.muted = u && typeof u != "function" && typeof u != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (u == null || typeof u == "function" || typeof u == "boolean" || typeof u == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        a = me("" + u);
        l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        if (u != null && typeof u != "function" && typeof u != "symbol") {
          l.setAttribute(a, "" + u);
        } else {
          l.removeAttribute(a);
        }
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        if (u && typeof u != "function" && typeof u != "symbol") {
          l.setAttribute(a, "");
        } else {
          l.removeAttribute(a);
        }
        break;
      case "capture":
      case "download":
        if (u === true) {
          l.setAttribute(a, "");
        } else if (u !== false && u != null && typeof u != "function" && typeof u != "symbol") {
          l.setAttribute(a, u);
        } else {
          l.removeAttribute(a);
        }
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        if (u != null && typeof u != "function" && typeof u != "symbol" && !isNaN(u) && u >= 1) {
          l.setAttribute(a, u);
        } else {
          l.removeAttribute(a);
        }
        break;
      case "rowSpan":
      case "start":
        if (u == null || typeof u == "function" || typeof u == "symbol" || isNaN(u)) {
          l.removeAttribute(a);
        } else {
          l.setAttribute(a, u);
        }
        break;
      case "popover":
        N("beforetoggle", l);
        N("toggle", l);
        ie(l, "popover", u);
        break;
      case "xlinkActuate":
        lt(l, "http://www.w3.org/1999/xlink", "xlink:actuate", u);
        break;
      case "xlinkArcrole":
        lt(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", u);
        break;
      case "xlinkRole":
        lt(l, "http://www.w3.org/1999/xlink", "xlink:role", u);
        break;
      case "xlinkShow":
        lt(l, "http://www.w3.org/1999/xlink", "xlink:show", u);
        break;
      case "xlinkTitle":
        lt(l, "http://www.w3.org/1999/xlink", "xlink:title", u);
        break;
      case "xlinkType":
        lt(l, "http://www.w3.org/1999/xlink", "xlink:type", u);
        break;
      case "xmlBase":
        lt(l, "http://www.w3.org/XML/1998/namespace", "xml:base", u);
        break;
      case "xmlLang":
        lt(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", u);
        break;
      case "xmlSpace":
        lt(l, "http://www.w3.org/XML/1998/namespace", "xml:space", u);
        break;
      case "is":
        ie(l, "is", u);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!(a.length > 2) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") {
          a = By.get(a) || a;
          ie(l, a, u);
        }
    }
  }
  function Yc(l, t, a, u, e, n) {
    switch (a) {
      case "style":
        Mi(l, u, n);
        break;
      case "dangerouslySetInnerHTML":
        if (u != null) {
          if (typeof u != "object" || !("__html" in u)) {
            throw Error(g(61));
          }
          a = u.__html;
          if (a != null) {
            if (e.children != null) {
              throw Error(g(60));
            }
            l.innerHTML = a;
          }
        }
        break;
      case "children":
        if (typeof u == "string") {
          Ma(l, u);
        } else if (typeof u == "number" || typeof u == "bigint") {
          Ma(l, "" + u);
        }
        break;
      case "onScroll":
        if (u != null) {
          N("scroll", l);
        }
        break;
      case "onScrollEnd":
        if (u != null) {
          N("scrollend", l);
        }
        break;
      case "onClick":
        if (u != null) {
          l.onclick = tt;
        }
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!di.hasOwnProperty(a)) {
          l: {
            if (a[0] === "o" && a[1] === "n" && (e = a.endsWith("Capture"), t = a.slice(2, e ? a.length - 7 : undefined), n = l[Sl] || null, n = n != null ? n[a] : null, typeof n == "function" && l.removeEventListener(t, n, e), typeof u == "function")) {
              if (typeof n != "function" && n !== null) {
                if (a in l) {
                  l[a] = null;
                } else if (l.hasAttribute(a)) {
                  l.removeAttribute(a);
                }
              }
              l.addEventListener(t, u, e);
              break l;
            }
            if (a in l) {
              l[a] = u;
            } else if (u === true) {
              l.setAttribute(a, "");
            } else {
              ie(l, a, u);
            }
          }
        }
    }
  }
  function hl(l, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        N("error", l);
        N("load", l);
        var u = false;
        var e = false;
        var n;
        for (n in a) {
          if (a.hasOwnProperty(n)) {
            var f = a[n];
            if (f != null) {
              switch (n) {
                case "src":
                  u = true;
                  break;
                case "srcSet":
                  e = true;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(g(137, t));
                default:
                  j(l, t, n, f, a, null);
              }
            }
          }
        }
        if (e) {
          j(l, t, "srcSet", a.srcSet, a, null);
        }
        if (u) {
          j(l, t, "src", a.src, a, null);
        }
        return;
      case "input":
        N("invalid", l);
        var c = n = f = e = null;
        var i = null;
        var h = null;
        for (u in a) {
          if (a.hasOwnProperty(u)) {
            var z = a[u];
            if (z != null) {
              switch (u) {
                case "name":
                  e = z;
                  break;
                case "type":
                  f = z;
                  break;
                case "checked":
                  i = z;
                  break;
                case "defaultChecked":
                  h = z;
                  break;
                case "value":
                  n = z;
                  break;
                case "defaultValue":
                  c = z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (z != null) {
                    throw Error(g(137, t));
                  }
                  break;
                default:
                  j(l, t, u, z, a, null);
              }
            }
          }
        }
        bi(l, n, c, i, h, f, e, false);
        return;
      case "select":
        N("invalid", l);
        u = f = n = null;
        for (e in a) {
          if (a.hasOwnProperty(e) && (c = a[e], c != null)) {
            switch (e) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                f = c;
                break;
              case "multiple":
                u = c;
              default:
                j(l, t, e, c, a, null);
            }
          }
        }
        t = n;
        a = f;
        l.multiple = !!u;
        if (t != null) {
          Ea(l, !!u, t, false);
        } else if (a != null) {
          Ea(l, !!u, a, true);
        }
        return;
      case "textarea":
        N("invalid", l);
        n = e = u = null;
        for (f in a) {
          if (a.hasOwnProperty(f) && (c = a[f], c != null)) {
            switch (f) {
              case "value":
                u = c;
                break;
              case "defaultValue":
                e = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) {
                  throw Error(g(91));
                }
                break;
              default:
                j(l, t, f, c, a, null);
            }
          }
        }
        Ti(l, u, e, n);
        return;
      case "option":
        for (i in a) {
          if (a.hasOwnProperty(i) && (u = a[i], u != null)) {
            if (i === "selected") {
              l.selected = u && typeof u != "function" && typeof u != "symbol";
            } else {
              j(l, t, i, u, a, null);
            }
          }
        }
        return;
      case "dialog":
        N("beforetoggle", l);
        N("toggle", l);
        N("cancel", l);
        N("close", l);
        break;
      case "iframe":
      case "object":
        N("load", l);
        break;
      case "video":
      case "audio":
        for (u = 0; u < xu.length; u++) {
          N(xu[u], l);
        }
        break;
      case "image":
        N("error", l);
        N("load", l);
        break;
      case "details":
        N("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        N("error", l);
        N("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (h in a) {
          if (a.hasOwnProperty(h) && (u = a[h], u != null)) {
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(g(137, t));
              default:
                j(l, t, h, u, a, null);
            }
          }
        }
        return;
      default:
        if (Jn(t)) {
          for (z in a) {
            if (a.hasOwnProperty(z)) {
              u = a[z];
              if (u !== undefined) {
                Yc(l, t, z, u, a, undefined);
              }
            }
          }
          return;
        }
    }
    for (c in a) {
      if (a.hasOwnProperty(c)) {
        u = a[c];
        if (u != null) {
          j(l, t, c, u, a, null);
        }
      }
    }
  }
  function uh(l, t, a, u) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var e = null;
        var n = null;
        var f = null;
        var c = null;
        var i = null;
        var h = null;
        var z = null;
        for (S in a) {
          var b = a[S];
          if (a.hasOwnProperty(S) && b != null) {
            switch (S) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                i = b;
              default:
                if (!u.hasOwnProperty(S)) {
                  j(l, t, S, null, u, b);
                }
            }
          }
        }
        for (var d in u) {
          var S = u[d];
          b = a[d];
          if (u.hasOwnProperty(d) && (S != null || b != null)) {
            switch (d) {
              case "type":
                n = S;
                break;
              case "name":
                e = S;
                break;
              case "checked":
                h = S;
                break;
              case "defaultChecked":
                z = S;
                break;
              case "value":
                f = S;
                break;
              case "defaultValue":
                c = S;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null) {
                  throw Error(g(137, t));
                }
                break;
              default:
                if (S !== b) {
                  j(l, t, d, S, u, b);
                }
            }
          }
        }
        Kn(l, f, c, i, h, z, n, e);
        return;
      case "select":
        S = f = c = d = null;
        for (n in a) {
          i = a[n];
          if (a.hasOwnProperty(n) && i != null) {
            switch (n) {
              case "value":
                break;
              case "multiple":
                S = i;
              default:
                if (!u.hasOwnProperty(n)) {
                  j(l, t, n, null, u, i);
                }
            }
          }
        }
        for (e in u) {
          n = u[e];
          i = a[e];
          if (u.hasOwnProperty(e) && (n != null || i != null)) {
            switch (e) {
              case "value":
                d = n;
                break;
              case "defaultValue":
                c = n;
                break;
              case "multiple":
                f = n;
              default:
                if (n !== i) {
                  j(l, t, e, n, u, i);
                }
            }
          }
        }
        t = c;
        a = f;
        u = S;
        if (d != null) {
          Ea(l, !!a, d, false);
        } else if (!!u != !!a) {
          if (t != null) {
            Ea(l, !!a, t, true);
          } else {
            Ea(l, !!a, a ? [] : "", false);
          }
        }
        return;
      case "textarea":
        S = d = null;
        for (c in a) {
          e = a[c];
          if (a.hasOwnProperty(c) && e != null && !u.hasOwnProperty(c)) {
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                j(l, t, c, null, u, e);
            }
          }
        }
        for (f in u) {
          e = u[f];
          n = a[f];
          if (u.hasOwnProperty(f) && (e != null || n != null)) {
            switch (f) {
              case "value":
                d = e;
                break;
              case "defaultValue":
                S = e;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (e != null) {
                  throw Error(g(91));
                }
                break;
              default:
                if (e !== n) {
                  j(l, t, f, e, u, n);
                }
            }
          }
        }
        Ai(l, d, S);
        return;
      case "option":
        for (var A in a) {
          d = a[A];
          if (a.hasOwnProperty(A) && d != null && !u.hasOwnProperty(A)) {
            if (A === "selected") {
              l.selected = false;
            } else {
              j(l, t, A, null, u, d);
            }
          }
        }
        for (i in u) {
          d = u[i];
          S = a[i];
          if (u.hasOwnProperty(i) && d !== S && (d != null || S != null)) {
            if (i === "selected") {
              l.selected = d && typeof d != "function" && typeof d != "symbol";
            } else {
              j(l, t, i, d, u, S);
            }
          }
        }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var o in a) {
          d = a[o];
          if (a.hasOwnProperty(o) && d != null && !u.hasOwnProperty(o)) {
            j(l, t, o, null, u, d);
          }
        }
        for (h in u) {
          d = u[h];
          S = a[h];
          if (u.hasOwnProperty(h) && d !== S && (d != null || S != null)) {
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (d != null) {
                  throw Error(g(137, t));
                }
                break;
              default:
                j(l, t, h, d, u, S);
            }
          }
        }
        return;
      default:
        if (Jn(t)) {
          for (var V in a) {
            d = a[V];
            if (a.hasOwnProperty(V) && d !== undefined && !u.hasOwnProperty(V)) {
              Yc(l, t, V, undefined, u, d);
            }
          }
          for (z in u) {
            d = u[z];
            S = a[z];
            if (!!u.hasOwnProperty(z) && d !== S && (d !== undefined || S !== undefined)) {
              Yc(l, t, z, d, u, S);
            }
          }
          return;
        }
    }
    for (var y in a) {
      d = a[y];
      if (a.hasOwnProperty(y) && d != null && !u.hasOwnProperty(y)) {
        j(l, t, y, null, u, d);
      }
    }
    for (b in u) {
      d = u[b];
      S = a[b];
      if (!!u.hasOwnProperty(b) && d !== S && (d != null || S != null)) {
        j(l, t, b, d, u, S);
      }
    }
  }
  function ov(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return true;
      default:
        return false;
    }
  }
  function eh() {
    if (typeof performance.getEntriesByType == "function") {
      var l = 0;
      var t = 0;
      for (var a = performance.getEntriesByType("resource"), u = 0; u < a.length; u++) {
        var e = a[u];
        var n = e.transferSize;
        var f = e.initiatorType;
        var c = e.duration;
        if (n && c && ov(f)) {
          f = 0;
          c = e.responseEnd;
          u += 1;
          for (; u < a.length; u++) {
            var i = a[u];
            var h = i.startTime;
            if (h > c) {
              break;
            }
            var z = i.transferSize;
            var b = i.initiatorType;
            if (z && ov(b)) {
              i = i.responseEnd;
              f += z * (i < c ? 1 : (c - h) / (i - h));
            }
          }
          --u;
          t += (n + f) * 8 / (e.duration / 1000);
          l++;
          if (l > 10) {
            break;
          }
        }
      }
      if (l > 0) {
        return t / l / 1000000;
      }
    }
    if (navigator.connection && (l = navigator.connection.downlink, typeof l == "number")) {
      return l;
    } else {
      return 5;
    }
  }
  var Xc = null;
  var Gc = null;
  function fn(l) {
    if (l.nodeType === 9) {
      return l;
    } else {
      return l.ownerDocument;
    }
  }
  function Ov(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Dv(l, t) {
    if (l === 0) {
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    }
    if (l === 1 && t === "foreignObject") {
      return 0;
    } else {
      return l;
    }
  }
  function Qc(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Cc = null;
  function nh() {
    var l = window.event;
    if (l && l.type === "popstate") {
      if (l === Cc) {
        return false;
      } else {
        Cc = l;
        return true;
      }
    } else {
      Cc = null;
      return false;
    }
  }
  var Uv = typeof setTimeout == "function" ? setTimeout : undefined;
  var fh = typeof clearTimeout == "function" ? clearTimeout : undefined;
  var Hv = typeof Promise == "function" ? Promise : undefined;
  var ch = typeof queueMicrotask == "function" ? queueMicrotask : typeof Hv !== "undefined" ? function (l) {
    return Hv.resolve(null).then(l).catch(ih);
  } : Uv;
  function ih(l) {
    setTimeout(function () {
      throw l;
    });
  }
  function jt(l) {
    return l === "head";
  }
  function Nv(l, t) {
    var a = t;
    var u = 0;
    do {
      var e = a.nextSibling;
      l.removeChild(a);
      if (e && e.nodeType === 8) {
        a = e.data;
        if (a === "/$" || a === "/&") {
          if (u === 0) {
            l.removeChild(e);
            Pa(t);
            return;
          }
          u--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") {
          u++;
        } else if (a === "html") {
          Lu(l.ownerDocument.documentElement);
        } else if (a === "head") {
          a = l.ownerDocument.head;
          Lu(a);
          for (var n = a.firstChild; n;) {
            var f = n.nextSibling;
            var c = n.nodeName;
            if (!n[iu] && c !== "SCRIPT" && c !== "STYLE" && (c !== "LINK" || n.rel.toLowerCase() !== "stylesheet")) {
              a.removeChild(n);
            }
            n = f;
          }
        } else if (a === "body") {
          Lu(l.ownerDocument.body);
        }
      }
      a = e;
    } while (a);
    Pa(t);
  }
  function _v(l, t) {
    var a = l;
    l = 0;
    do {
      var u = a.nextSibling;
      if (a.nodeType === 1) {
        if (t) {
          a._stashedDisplay = a.style.display;
          a.style.display = "none";
        } else {
          a.style.display = a._stashedDisplay || "";
          if (a.getAttribute("style") === "") {
            a.removeAttribute("style");
          }
        }
      } else if (a.nodeType === 3) {
        if (t) {
          a._stashedText = a.nodeValue;
          a.nodeValue = "";
        } else {
          a.nodeValue = a._stashedText || "";
        }
      }
      if (u && u.nodeType === 8) {
        a = u.data;
        if (a === "/$") {
          if (l === 0) {
            break;
          }
          l--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!") {
          l++;
        }
      }
      a = u;
    } while (a);
  }
  function Zc(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
      var a = t;
      t = t.nextSibling;
      switch (a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Zc(a);
          Vn(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") {
            continue;
          }
      }
      l.removeChild(a);
    }
  }
  function vh(l, t, a, u) {
    while (l.nodeType === 1) {
      var e = a;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!u && (l.nodeName !== "INPUT" || l.type !== "hidden")) {
          break;
        }
      } else if (u) {
        if (!l[iu]) {
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) {
                break;
              }
              return l;
            case "link":
              n = l.getAttribute("rel");
              if (n === "stylesheet" && l.hasAttribute("data-precedence")) {
                break;
              }
              if (n !== e.rel || l.getAttribute("href") !== (e.href == null || e.href === "" ? null : e.href) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin) || l.getAttribute("title") !== (e.title == null ? null : e.title)) {
                break;
              }
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) {
                break;
              }
              return l;
            case "script":
              n = l.getAttribute("src");
              if ((n !== (e.src == null ? null : e.src) || l.getAttribute("type") !== (e.type == null ? null : e.type) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop")) {
                break;
              }
              return l;
            default:
              return l;
          }
        }
      } else if (t === "input" && l.type === "hidden") {
        var n = e.name == null ? null : "" + e.name;
        if (e.type === "hidden" && l.getAttribute("name") === n) {
          return l;
        }
      } else {
        return l;
      }
      l = jl(l.nextSibling);
      if (l === null) {
        break;
      }
    }
    return null;
  }
  function yh(l, t, a) {
    if (t === "") {
      return null;
    }
    while (l.nodeType !== 3) {
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !a || (l = jl(l.nextSibling), l === null)) {
        return null;
      }
    }
    return l;
  }
  function Bv(l, t) {
    while (l.nodeType !== 8) {
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = jl(l.nextSibling), l === null)) {
        return null;
      }
    }
    return l;
  }
  function Rc(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function pc(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function mh(l, t) {
    var a = l.ownerDocument;
    if (l.data === "$~") {
      l._reactRetry = t;
    } else if (l.data !== "$?" || a.readyState !== "loading") {
      t();
    } else {
      var u = function () {
        t();
        a.removeEventListener("DOMContentLoaded", u);
      };
      a.addEventListener("DOMContentLoaded", u);
      l._reactRetry = u;
    }
  }
  function jl(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) {
        break;
      }
      if (t === 8) {
        t = l.data;
        if (t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") {
          break;
        }
        if (t === "/$" || t === "/&") {
          return null;
        }
      }
    }
    return l;
  }
  var jc = null;
  function qv(l) {
    l = l.nextSibling;
    var t = 0;
    for (; l;) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "/$" || a === "/&") {
          if (t === 0) {
            return jl(l.nextSibling);
          }
          t--;
        } else if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          t++;
        }
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Yv(l) {
    l = l.previousSibling;
    var t = 0;
    for (; l;) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) {
            return l;
          }
          t--;
        } else if (a === "/$" || a === "/&") {
          t++;
        }
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Xv(l, t, a) {
    t = fn(a);
    switch (l) {
      case "html":
        l = t.documentElement;
        if (!l) {
          throw Error(g(452));
        }
        return l;
      case "head":
        l = t.head;
        if (!l) {
          throw Error(g(453));
        }
        return l;
      case "body":
        l = t.body;
        if (!l) {
          throw Error(g(454));
        }
        return l;
      default:
        throw Error(g(451));
    }
  }
  function Lu(l) {
    for (var t = l.attributes; t.length;) {
      l.removeAttributeNode(t[0]);
    }
    Vn(l);
  }
  var Vl = new Map();
  var Gv = new Set();
  function cn(l) {
    if (typeof l.getRootNode == "function") {
      return l.getRootNode();
    } else if (l.nodeType === 9) {
      return l;
    } else {
      return l.ownerDocument;
    }
  }
  var st = G.d;
  G.d = {
    f: hh,
    r: dh,
    D: Sh,
    C: gh,
    L: zh,
    m: sh,
    X: Ah,
    S: bh,
    M: Th
  };
  function hh() {
    var l = st.f();
    var t = Ie();
    return l || t;
  }
  function dh(l) {
    var t = ba(l);
    if (t !== null && t.tag === 5 && t.type === "form") {
      r0(t);
    } else {
      st.r(l);
    }
  }
  var ka = typeof document === "undefined" ? null : document;
  function Qv(l, t, a) {
    var u = ka;
    if (u && typeof t == "string" && t) {
      var e = Xl(t);
      e = "link[rel=\"" + l + "\"][href=\"" + e + "\"]";
      if (typeof a == "string") {
        e += "[crossorigin=\"" + a + "\"]";
      }
      if (!Gv.has(e)) {
        Gv.add(e);
        l = {
          rel: l,
          crossOrigin: a,
          href: t
        };
        if (u.querySelector(e) === null) {
          t = u.createElement("link");
          hl(t, "link", l);
          nl(t);
          u.head.appendChild(t);
        }
      }
    }
  }
  function Sh(l) {
    st.D(l);
    Qv("dns-prefetch", l, null);
  }
  function gh(l, t) {
    st.C(l, t);
    Qv("preconnect", l, t);
  }
  function zh(l, t, a) {
    st.L(l, t, a);
    var u = ka;
    if (u && l && t) {
      var e = "link[rel=\"preload\"][as=\"" + Xl(t) + "\"]";
      if (t === "image" && a && a.imageSrcSet) {
        e += "[imagesrcset=\"" + Xl(a.imageSrcSet) + "\"]";
        if (typeof a.imageSizes == "string") {
          e += "[imagesizes=\"" + Xl(a.imageSizes) + "\"]";
        }
      } else {
        e += "[href=\"" + Xl(l) + "\"]";
      }
      var n = e;
      switch (t) {
        case "style":
          n = ra(l);
          break;
        case "script":
          n = Ia(l);
      }
      if (!Vl.has(n)) {
        l = C({
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? undefined : l,
          as: t
        }, a);
        Vl.set(n, l);
        if (u.querySelector(e) === null && (t !== "style" || !u.querySelector(Ju(n))) && (t !== "script" || !u.querySelector(Wu(n)))) {
          t = u.createElement("link");
          hl(t, "link", l);
          nl(t);
          u.head.appendChild(t);
        }
      }
    }
  }
  function sh(l, t) {
    st.m(l, t);
    var a = ka;
    if (a && l) {
      var u = t && typeof t.as == "string" ? t.as : "script";
      var e = "link[rel=\"modulepreload\"][as=\"" + Xl(u) + "\"][href=\"" + Xl(l) + "\"]";
      var n = e;
      switch (u) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Ia(l);
      }
      if (!Vl.has(n) && (l = C({
        rel: "modulepreload",
        href: l
      }, t), Vl.set(n, l), a.querySelector(e) === null)) {
        switch (u) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Wu(n))) {
              return;
            }
        }
        u = a.createElement("link");
        hl(u, "link", l);
        nl(u);
        a.head.appendChild(u);
      }
    }
  }
  function bh(l, t, a) {
    st.S(l, t, a);
    var u = ka;
    if (u && l) {
      var e = Aa(u).hoistableStyles;
      var n = ra(l);
      t = t || "default";
      var f = e.get(n);
      if (!f) {
        var c = {
          loading: 0,
          preload: null
        };
        if (f = u.querySelector(Ju(n))) {
          c.loading = 5;
        } else {
          l = C({
            rel: "stylesheet",
            href: l,
            "data-precedence": t
          }, a);
          if (a = Vl.get(n)) {
            Vc(l, a);
          }
          var i = f = u.createElement("link");
          nl(i);
          hl(i, "link", l);
          i._p = new Promise(function (h, z) {
            i.onload = h;
            i.onerror = z;
          });
          i.addEventListener("load", function () {
            c.loading |= 1;
          });
          i.addEventListener("error", function () {
            c.loading |= 2;
          });
          c.loading |= 4;
          vn(f, t, u);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: c
        };
        e.set(n, f);
      }
    }
  }
  function Ah(l, t) {
    st.X(l, t);
    var a = ka;
    if (a && l) {
      var u = Aa(a).hoistableScripts;
      var e = Ia(l);
      var n = u.get(e);
      if (!n) {
        n = a.querySelector(Wu(e));
        if (!n) {
          l = C({
            src: l,
            async: true
          }, t);
          if (t = Vl.get(e)) {
            xc(l, t);
          }
          n = a.createElement("script");
          nl(n);
          hl(n, "link", l);
          a.head.appendChild(n);
        }
        n = {
          type: "script",
          instance: n,
          count: 1,
          state: null
        };
        u.set(e, n);
      }
    }
  }
  function Th(l, t) {
    st.M(l, t);
    var a = ka;
    if (a && l) {
      var u = Aa(a).hoistableScripts;
      var e = Ia(l);
      var n = u.get(e);
      if (!n) {
        n = a.querySelector(Wu(e));
        if (!n) {
          l = C({
            src: l,
            async: true,
            type: "module"
          }, t);
          if (t = Vl.get(e)) {
            xc(l, t);
          }
          n = a.createElement("script");
          nl(n);
          hl(n, "link", l);
          a.head.appendChild(n);
        }
        n = {
          type: "script",
          instance: n,
          count: 1,
          state: null
        };
        u.set(e, n);
      }
    }
  }
  function Cv(l, t, a, u) {
    var e = (e = Tt.current) ? cn(e) : null;
    if (!e) {
      throw Error(g(446));
    }
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        if (typeof a.precedence == "string" && typeof a.href == "string") {
          t = ra(a.href);
          a = Aa(e).hoistableStyles;
          u = a.get(t);
          if (!u) {
            u = {
              type: "style",
              instance: null,
              count: 0,
              state: null
            };
            a.set(t, u);
          }
          return u;
        } else {
          return {
            type: "void",
            instance: null,
            count: 0,
            state: null
          };
        }
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          l = ra(a.href);
          var n = Aa(e).hoistableStyles;
          var f = n.get(l);
          if (!f) {
            e = e.ownerDocument || e;
            f = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: {
                loading: 0,
                preload: null
              }
            };
            n.set(l, f);
            if ((n = e.querySelector(Ju(l))) && !n._p) {
              f.instance = n;
              f.state.loading = 5;
            }
            if (!Vl.has(l)) {
              a = {
                rel: "preload",
                as: "style",
                href: a.href,
                crossOrigin: a.crossOrigin,
                integrity: a.integrity,
                media: a.media,
                hrefLang: a.hrefLang,
                referrerPolicy: a.referrerPolicy
              };
              Vl.set(l, a);
              if (!n) {
                Eh(e, l, a, f.state);
              }
            }
          }
          if (t && u === null) {
            throw Error(g(528, ""));
          }
          return f;
        }
        if (t && u !== null) {
          throw Error(g(529, ""));
        }
        return null;
      case "script":
        t = a.async;
        a = a.src;
        if (typeof a == "string" && t && typeof t != "function" && typeof t != "symbol") {
          t = Ia(a);
          a = Aa(e).hoistableScripts;
          u = a.get(t);
          if (!u) {
            u = {
              type: "script",
              instance: null,
              count: 0,
              state: null
            };
            a.set(t, u);
          }
          return u;
        } else {
          return {
            type: "void",
            instance: null,
            count: 0,
            state: null
          };
        }
      default:
        throw Error(g(444, l));
    }
  }
  function ra(l) {
    return "href=\"" + Xl(l) + "\"";
  }
  function Ju(l) {
    return "link[rel=\"stylesheet\"][" + l + "]";
  }
  function Zv(l) {
    return C({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function Eh(l, t, a, u) {
    if (l.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
      u.loading = 1;
    } else {
      t = l.createElement("link");
      u.preload = t;
      t.addEventListener("load", function () {
        return u.loading |= 1;
      });
      t.addEventListener("error", function () {
        return u.loading |= 2;
      });
      hl(t, "link", a);
      nl(t);
      l.head.appendChild(t);
    }
  }
  function Ia(l) {
    return "[src=\"" + Xl(l) + "\"]";
  }
  function Wu(l) {
    return "script[async]" + l;
  }
  function Rv(l, t, a) {
    t.count++;
    if (t.instance === null) {
      switch (t.type) {
        case "style":
          var u = l.querySelector("style[data-href~=\"" + Xl(a.href) + "\"]");
          if (u) {
            t.instance = u;
            nl(u);
            return u;
          }
          var e = C({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          u = (l.ownerDocument || l).createElement("style");
          nl(u);
          hl(u, "style", e);
          vn(u, a.precedence, l);
          return t.instance = u;
        case "stylesheet":
          e = ra(a.href);
          var n = l.querySelector(Ju(e));
          if (n) {
            t.state.loading |= 4;
            t.instance = n;
            nl(n);
            return n;
          }
          u = Zv(a);
          if (e = Vl.get(e)) {
            Vc(u, e);
          }
          n = (l.ownerDocument || l).createElement("link");
          nl(n);
          var f = n;
          f._p = new Promise(function (c, i) {
            f.onload = c;
            f.onerror = i;
          });
          hl(n, "link", u);
          t.state.loading |= 4;
          vn(n, a.precedence, l);
          return t.instance = n;
        case "script":
          n = Ia(a.src);
          if (e = l.querySelector(Wu(n))) {
            t.instance = e;
            nl(e);
            return e;
          } else {
            u = a;
            if (e = Vl.get(n)) {
              u = C({}, a);
              xc(u, e);
            }
            l = l.ownerDocument || l;
            e = l.createElement("script");
            nl(e);
            hl(e, "link", u);
            l.head.appendChild(e);
            return t.instance = e;
          }
        case "void":
          return null;
        default:
          throw Error(g(443, t.type));
      }
    } else if (t.type === "stylesheet" && (t.state.loading & 4) === 0) {
      u = t.instance;
      t.state.loading |= 4;
      vn(u, a.precedence, l);
    }
    return t.instance;
  }
  function vn(l, t, a) {
    for (var u = a.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), e = u.length ? u[u.length - 1] : null, n = e, f = 0; f < u.length; f++) {
      var c = u[f];
      if (c.dataset.precedence === t) {
        n = c;
      } else if (n !== e) {
        break;
      }
    }
    if (n) {
      n.parentNode.insertBefore(l, n.nextSibling);
    } else {
      t = a.nodeType === 9 ? a.head : a;
      t.insertBefore(l, t.firstChild);
    }
  }
  function Vc(l, t) {
    if (l.crossOrigin == null) {
      l.crossOrigin = t.crossOrigin;
    }
    if (l.referrerPolicy == null) {
      l.referrerPolicy = t.referrerPolicy;
    }
    if (l.title == null) {
      l.title = t.title;
    }
  }
  function xc(l, t) {
    if (l.crossOrigin == null) {
      l.crossOrigin = t.crossOrigin;
    }
    if (l.referrerPolicy == null) {
      l.referrerPolicy = t.referrerPolicy;
    }
    if (l.integrity == null) {
      l.integrity = t.integrity;
    }
  }
  var yn = null;
  function pv(l, t, a) {
    if (yn === null) {
      var u = new Map();
      var e = yn = new Map();
      e.set(a, u);
    } else {
      e = yn;
      u = e.get(a);
      if (!u) {
        u = new Map();
        e.set(a, u);
      }
    }
    if (u.has(l)) {
      return u;
    }
    u.set(l, null);
    a = a.getElementsByTagName(l);
    e = 0;
    for (; e < a.length; e++) {
      var n = a[e];
      if (!n[iu] && !n[il] && (l !== "link" || n.getAttribute("rel") !== "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = n.getAttribute(t) || "";
        f = l + f;
        var c = u.get(f);
        if (c) {
          c.push(n);
        } else {
          u.set(f, [n]);
        }
      }
    }
    return u;
  }
  function jv(l, t, a) {
    l = l.ownerDocument || l;
    l.head.insertBefore(a, t === "title" ? l.querySelector("head > title") : null);
  }
  function Mh(l, t, a) {
    if (a === 1 || t.itemProp != null) {
      return false;
    }
    switch (l) {
      case "meta":
      case "title":
        return true;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
          break;
        }
        return true;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
          break;
        }
        if (t.rel === "stylesheet") {
          l = t.disabled;
          return typeof t.precedence == "string" && l == null;
        } else {
          return true;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") {
          return true;
        }
    }
    return false;
  }
  function Vv(l) {
    return l.type !== "stylesheet" || (l.state.loading & 3) !== 0;
  }
  function oh(l, t, a, u) {
    if (a.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== false) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var e = ra(u.href);
        var n = t.querySelector(Ju(e));
        if (n) {
          t = n._p;
          if (t !== null && typeof t == "object" && typeof t.then == "function") {
            l.count++;
            l = mn.bind(l);
            t.then(l, l);
          }
          a.state.loading |= 4;
          a.instance = n;
          nl(n);
          return;
        }
        n = t.ownerDocument || t;
        u = Zv(u);
        if (e = Vl.get(e)) {
          Vc(u, e);
        }
        n = n.createElement("link");
        nl(n);
        var f = n;
        f._p = new Promise(function (c, i) {
          f.onload = c;
          f.onerror = i;
        });
        hl(n, "link", u);
        a.instance = n;
      }
      if (l.stylesheets === null) {
        l.stylesheets = new Map();
      }
      l.stylesheets.set(a, t);
      if ((t = a.state.preload) && (a.state.loading & 3) === 0) {
        l.count++;
        a = mn.bind(l);
        t.addEventListener("load", a);
        t.addEventListener("error", a);
      }
    }
  }
  var Kc = 0;
  function Oh(l, t) {
    if (l.stylesheets && l.count === 0) {
      dn(l, l.stylesheets);
    }
    if (l.count > 0 || l.imgCount > 0) {
      return function (a) {
        var u = setTimeout(function () {
          if (l.stylesheets) {
            dn(l, l.stylesheets);
          }
          if (l.unsuspend) {
            var n = l.unsuspend;
            l.unsuspend = null;
            n();
          }
        }, 60000 + t);
        if (l.imgBytes > 0 && Kc === 0) {
          Kc = eh() * 62500;
        }
        var e = setTimeout(function () {
          l.waitingForImages = false;
          if (l.count === 0 && (l.stylesheets && dn(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null;
            n();
          }
        }, (l.imgBytes > Kc ? 50 : 800) + t);
        l.unsuspend = a;
        return function () {
          l.unsuspend = null;
          clearTimeout(u);
          clearTimeout(e);
        };
      };
    } else {
      return null;
    }
  }
  function mn() {
    this.count--;
    if (this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) {
        dn(this, this.stylesheets);
      } else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null;
        l();
      }
    }
  }
  var hn = null;
  function dn(l, t) {
    l.stylesheets = null;
    if (l.unsuspend !== null) {
      l.count++;
      hn = new Map();
      t.forEach(Dh, l);
      hn = null;
      mn.call(l);
    }
  }
  function Dh(l, t) {
    if (!(t.state.loading & 4)) {
      var a = hn.get(l);
      if (a) {
        var u = a.get(null);
      } else {
        a = new Map();
        hn.set(l, a);
        for (var e = l.querySelectorAll("link[data-precedence],style[data-precedence]"), n = 0; n < e.length; n++) {
          var f = e[n];
          if (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") {
            a.set(f.dataset.precedence, f);
            u = f;
          }
        }
        if (u) {
          a.set(null, u);
        }
      }
      e = t.instance;
      f = e.getAttribute("data-precedence");
      n = a.get(f) || u;
      if (n === u) {
        a.set(null, e);
      }
      a.set(f, e);
      this.count++;
      u = mn.bind(this);
      e.addEventListener("load", u);
      e.addEventListener("error", u);
      if (n) {
        n.parentNode.insertBefore(e, n.nextSibling);
      } else {
        l = l.nodeType === 9 ? l.head : l;
        l.insertBefore(e, l.firstChild);
      }
      t.state.loading |= 4;
    }
  }
  var $u = {
    $$typeof: Pl,
    Provider: null,
    Consumer: null,
    _currentValue: $t,
    _currentValue2: $t,
    _threadCount: 0
  };
  function Uh(l, t, a, u, e, n, f, c, i) {
    this.tag = 1;
    this.containerInfo = l;
    this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
    this.callbackPriority = 0;
    this.expirationTimes = Zn(-1);
    this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = Zn(0);
    this.hiddenUpdates = Zn(null);
    this.identifierPrefix = u;
    this.onUncaughtError = e;
    this.onCaughtError = n;
    this.onRecoverableError = f;
    this.pooledCache = null;
    this.pooledCacheLanes = 0;
    this.formState = i;
    this.incompleteTransitions = new Map();
  }
  function xv(l, t, a, u, e, n, f, c, i, h, z, b) {
    l = new Uh(l, t, a, f, i, h, z, b, c);
    t = 1;
    if (n === true) {
      t |= 24;
    }
    n = Ul(3, null, null, t);
    l.current = n;
    n.stateNode = l;
    t = Mf();
    t.refCount++;
    l.pooledCache = t;
    t.refCount++;
    n.memoizedState = {
      element: u,
      isDehydrated: a,
      cache: t
    };
    Uf(n);
    return l;
  }
  function Kv(l) {
    if (l) {
      l = _a;
      return l;
    } else {
      return _a;
    }
  }
  function Lv(l, t, a, u, e, n) {
    e = Kv(e);
    if (u.context === null) {
      u.context = e;
    } else {
      u.pendingContext = e;
    }
    u = _t(t);
    u.payload = {
      element: a
    };
    n = n === undefined ? null : n;
    if (n !== null) {
      u.callback = n;
    }
    a = Bt(l, u, t);
    if (a !== null) {
      Tl(a, l, t);
      Du(a, l, t);
    }
  }
  function Jv(l, t) {
    l = l.memoizedState;
    if (l !== null && l.dehydrated !== null) {
      var a = l.retryLane;
      l.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Lc(l, t) {
    Jv(l, t);
    if (l = l.alternate) {
      Jv(l, t);
    }
  }
  function Wv(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = la(l, 67108864);
      if (t !== null) {
        Tl(t, l, 67108864);
      }
      Lc(l, 67108864);
    }
  }
  function $v(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ql();
      t = Rn(t);
      var a = la(l, t);
      if (a !== null) {
        Tl(a, l, t);
      }
      Lc(l, t);
    }
  }
  var Sn = true;
  function Hh(l, t, a, u) {
    var e = O.T;
    O.T = null;
    var n = G.p;
    try {
      G.p = 2;
      Jc(l, t, a, u);
    } finally {
      G.p = n;
      O.T = e;
    }
  }
  function Nh(l, t, a, u) {
    var e = O.T;
    O.T = null;
    var n = G.p;
    try {
      G.p = 8;
      Jc(l, t, a, u);
    } finally {
      G.p = n;
      O.T = e;
    }
  }
  function Jc(l, t, a, u) {
    if (Sn) {
      var e = Wc(u);
      if (e === null) {
        qc(l, t, u, gn, a);
        Fv(l, u);
      } else if (Bh(e, l, t, a, u)) {
        u.stopPropagation();
      } else {
        Fv(l, u);
        if (t & 4 && _h.indexOf(l) > -1) {
          while (e !== null) {
            var n = ba(e);
            if (n !== null) {
              switch (n.tag) {
                case 3:
                  n = n.stateNode;
                  if (n.current.memoizedState.isDehydrated) {
                    var f = Ft(n.pendingLanes);
                    if (f !== 0) {
                      var c = n;
                      c.pendingLanes |= 2;
                      c.entangledLanes |= 2;
                      while (f) {
                        var i = 1 << 31 - Ol(f);
                        c.entanglements[1] |= i;
                        f &= ~i;
                      }
                      kl(n);
                      if ((Q & 6) === 0) {
                        ke = Ml() + 500;
                        Vu(0);
                      }
                    }
                  }
                  break;
                case 31:
                case 13:
                  c = la(n, 2);
                  if (c !== null) {
                    Tl(c, n, 2);
                  }
                  Ie();
                  Lc(n, 2);
              }
            }
            n = Wc(u);
            if (n === null) {
              qc(l, t, u, gn, a);
            }
            if (n === e) {
              break;
            }
            e = n;
          }
          if (e !== null) {
            u.stopPropagation();
          }
        } else {
          qc(l, t, u, null, a);
        }
      }
    }
  }
  function Wc(l) {
    l = $n(l);
    return $c(l);
  }
  var gn = null;
  function $c(l) {
    gn = null;
    l = sa(l);
    if (l !== null) {
      var t = ul(l);
      if (t === null) {
        l = null;
      } else {
        var a = t.tag;
        if (a === 13) {
          l = Wt(t);
          if (l !== null) {
            return l;
          }
          l = null;
        } else if (a === 31) {
          l = lu(t);
          if (l !== null) {
            return l;
          }
          l = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) {
            if (t.tag === 3) {
              return t.stateNode.containerInfo;
            } else {
              return null;
            }
          }
          l = null;
        } else if (t !== l) {
          l = null;
        }
      }
    }
    gn = l;
    return null;
  }
  function wv(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Sy()) {
          case ai:
            return 2;
          case ui:
            return 8;
          case ue:
          case gy:
            return 32;
          case ei:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var wc = false;
  var Vt = null;
  var xt = null;
  var Kt = null;
  var wu = new Map();
  var Fu = new Map();
  var Lt = [];
  var _h = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function Fv(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Vt = null;
        break;
      case "dragenter":
      case "dragleave":
        xt = null;
        break;
      case "mouseover":
      case "mouseout":
        Kt = null;
        break;
      case "pointerover":
      case "pointerout":
        wu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Fu.delete(t.pointerId);
    }
  }
  function ku(l, t, a, u, e, n) {
    if (l === null || l.nativeEvent !== n) {
      l = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: u,
        nativeEvent: n,
        targetContainers: [e]
      };
      if (t !== null) {
        t = ba(t);
        if (t !== null) {
          Wv(t);
        }
      }
      return l;
    } else {
      l.eventSystemFlags |= u;
      t = l.targetContainers;
      if (e !== null && t.indexOf(e) === -1) {
        t.push(e);
      }
      return l;
    }
  }
  function Bh(l, t, a, u, e) {
    switch (t) {
      case "focusin":
        Vt = ku(Vt, l, t, a, u, e);
        return true;
      case "dragenter":
        xt = ku(xt, l, t, a, u, e);
        return true;
      case "mouseover":
        Kt = ku(Kt, l, t, a, u, e);
        return true;
      case "pointerover":
        var n = e.pointerId;
        wu.set(n, ku(wu.get(n) || null, l, t, a, u, e));
        return true;
      case "gotpointercapture":
        n = e.pointerId;
        Fu.set(n, ku(Fu.get(n) || null, l, t, a, u, e));
        return true;
    }
    return false;
  }
  function kv(l) {
    var t = sa(l.target);
    if (t !== null) {
      var a = ul(t);
      if (a !== null) {
        t = a.tag;
        if (t === 13) {
          t = Wt(a);
          if (t !== null) {
            l.blockedOn = t;
            yi(l.priority, function () {
              $v(a);
            });
            return;
          }
        } else if (t === 31) {
          t = lu(a);
          if (t !== null) {
            l.blockedOn = t;
            yi(l.priority, function () {
              $v(a);
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function zn(l) {
    if (l.blockedOn !== null) {
      return false;
    }
    for (var t = l.targetContainers; t.length > 0;) {
      var a = Wc(l.nativeEvent);
      if (a === null) {
        a = l.nativeEvent;
        var u = new a.constructor(a.type, a);
        Wn = u;
        a.target.dispatchEvent(u);
        Wn = null;
      } else {
        t = ba(a);
        if (t !== null) {
          Wv(t);
        }
        l.blockedOn = a;
        return false;
      }
      t.shift();
    }
    return true;
  }
  function rv(l, t, a) {
    if (zn(l)) {
      a.delete(t);
    }
  }
  function qh() {
    wc = false;
    if (Vt !== null && zn(Vt)) {
      Vt = null;
    }
    if (xt !== null && zn(xt)) {
      xt = null;
    }
    if (Kt !== null && zn(Kt)) {
      Kt = null;
    }
    wu.forEach(rv);
    Fu.forEach(rv);
  }
  function sn(l, t) {
    if (l.blockedOn === t) {
      l.blockedOn = null;
      if (!wc) {
        wc = true;
        E.unstable_scheduleCallback(E.unstable_NormalPriority, qh);
      }
    }
  }
  var bn = null;
  function Iv(l) {
    if (bn !== l) {
      bn = l;
      E.unstable_scheduleCallback(E.unstable_NormalPriority, function () {
        if (bn === l) {
          bn = null;
        }
        for (var t = 0; t < l.length; t += 3) {
          var a = l[t];
          var u = l[t + 1];
          var e = l[t + 2];
          if (typeof u != "function") {
            if ($c(u || a) === null) {
              continue;
            }
            break;
          }
          var n = ba(a);
          if (n !== null) {
            l.splice(t, 3);
            t -= 3;
            Wf(n, {
              pending: true,
              data: e,
              method: a.method,
              action: u
            }, u, e);
          }
        }
      });
    }
  }
  function Pa(l) {
    function t(i) {
      return sn(i, l);
    }
    if (Vt !== null) {
      sn(Vt, l);
    }
    if (xt !== null) {
      sn(xt, l);
    }
    if (Kt !== null) {
      sn(Kt, l);
    }
    wu.forEach(t);
    Fu.forEach(t);
    for (var a = 0; a < Lt.length; a++) {
      var u = Lt[a];
      if (u.blockedOn === l) {
        u.blockedOn = null;
      }
    }
    while (Lt.length > 0 && (a = Lt[0], a.blockedOn === null)) {
      kv(a);
      if (a.blockedOn === null) {
        Lt.shift();
      }
    }
    a = (l.ownerDocument || l).$$reactFormReplay;
    if (a != null) {
      for (u = 0; u < a.length; u += 3) {
        var e = a[u];
        var n = a[u + 1];
        var f = e[Sl] || null;
        if (typeof n == "function") {
          if (!f) {
            Iv(a);
          }
        } else if (f) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            e = n;
            if (f = n[Sl] || null) {
              c = f.formAction;
            } else if ($c(e) !== null) {
              continue;
            }
          } else {
            c = f.action;
          }
          if (typeof c == "function") {
            a[u + 1] = c;
          } else {
            a.splice(u, 3);
            u -= 3;
          }
          Iv(a);
        }
      }
    }
  }
  function Pv() {
    function l(n) {
      if (n.canIntercept && n.info === "react-transition") {
        n.intercept({
          handler: function () {
            return new Promise(function (f) {
              return e = f;
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
      }
    }
    function t() {
      if (e !== null) {
        e();
        e = null;
      }
      if (!u) {
        setTimeout(a, 20);
      }
    }
    function a() {
      if (!u && !navigation.transition) {
        var n = navigation.currentEntry;
        if (n && n.url != null) {
          navigation.navigate(n.url, {
            state: n.getState(),
            info: "react-transition",
            history: "replace"
          });
        }
      }
    }
    if (typeof navigation == "object") {
      var u = false;
      var e = null;
      navigation.addEventListener("navigate", l);
      navigation.addEventListener("navigatesuccess", t);
      navigation.addEventListener("navigateerror", t);
      setTimeout(a, 100);
      return function () {
        u = true;
        navigation.removeEventListener("navigate", l);
        navigation.removeEventListener("navigatesuccess", t);
        navigation.removeEventListener("navigateerror", t);
        if (e !== null) {
          e();
          e = null;
        }
      };
    }
  }
  function Fc(l) {
    this._internalRoot = l;
  }
  An.prototype.render = Fc.prototype.render = function (l) {
    var t = this._internalRoot;
    if (t === null) {
      throw Error(g(409));
    }
    var a = t.current;
    var u = ql();
    Lv(a, u, l, t, null, null);
  };
  An.prototype.unmount = Fc.prototype.unmount = function () {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      Lv(l.current, 2, null, l, null, null);
      Ie();
      t[za] = null;
    }
  };
  function An(l) {
    this._internalRoot = l;
  }
  An.prototype.unstable_scheduleHydration = function (l) {
    if (l) {
      var t = vi();
      l = {
        blockedOn: null,
        target: l,
        priority: t
      };
      for (var a = 0; a < Lt.length && t !== 0 && t < Lt[a].priority; a++);
      Lt.splice(a, 0, l);
      if (a === 0) {
        kv(l);
      }
    }
  };
  var ly = r.version;
  if (ly !== "19.2.5") {
    throw Error(g(527, ly, "19.2.5"));
  }
  G.findDOMNode = function (l) {
    var t = l._reactInternals;
    if (t === undefined) {
      throw typeof l.render == "function" ? Error(g(188)) : (l = Object.keys(l).join(","), Error(g(268, l)));
    }
    l = En(t);
    l = l !== null ? Iu(l) : null;
    l = l === null ? null : l.stateNode;
    return l;
  };
  var Yh = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
    var Tn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Tn.isDisabled && Tn.supportsFiber) {
      try {
        nu = Tn.inject(Yh);
        ol = Tn;
      } catch {}
    }
  }
  ru.createRoot = function (l, t) {
    if (!rl(l)) {
      throw Error(g(299));
    }
    var a = false;
    var u = "";
    var e = c1;
    var n = i1;
    var f = v1;
    if (t != null) {
      if (t.unstable_strictMode === true) {
        a = true;
      }
      if (t.identifierPrefix !== undefined) {
        u = t.identifierPrefix;
      }
      if (t.onUncaughtError !== undefined) {
        e = t.onUncaughtError;
      }
      if (t.onCaughtError !== undefined) {
        n = t.onCaughtError;
      }
      if (t.onRecoverableError !== undefined) {
        f = t.onRecoverableError;
      }
    }
    t = xv(l, 1, false, null, null, a, u, null, e, n, f, Pv);
    l[za] = t.current;
    Bc(l);
    return new Fc(t);
  };
  ru.hydrateRoot = function (l, t, a) {
    if (!rl(l)) {
      throw Error(g(299));
    }
    var u = false;
    var e = "";
    var n = c1;
    var f = i1;
    var c = v1;
    var i = null;
    if (a != null) {
      if (a.unstable_strictMode === true) {
        u = true;
      }
      if (a.identifierPrefix !== undefined) {
        e = a.identifierPrefix;
      }
      if (a.onUncaughtError !== undefined) {
        n = a.onUncaughtError;
      }
      if (a.onCaughtError !== undefined) {
        f = a.onCaughtError;
      }
      if (a.onRecoverableError !== undefined) {
        c = a.onRecoverableError;
      }
      if (a.formState !== undefined) {
        i = a.formState;
      }
    }
    t = xv(l, 1, true, t, a ?? null, u, e, i, n, f, c, Pv);
    t.context = Kv(null);
    a = t.current;
    u = ql();
    u = Rn(u);
    e = _t(u);
    e.callback = null;
    Bt(a, e, u);
    a = u;
    t.current.lanes = a;
    cu(t, a);
    kl(t);
    l[za] = t.current;
    Bc(l);
    return new An(t);
  };
  ru.version = "19.2.5";
  return ru;
}
var ay;
function Rh() {
  if (ay) {
    return kc.exports;
  }
  ay = 1;
  function E() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") {
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(E);
      } catch (r) {
        console.error(r);
      }
    }
  }
  E();
  kc.exports = Zh();
  return kc.exports;
}
var uy = Rh();
const ph = ({
  value: E,
  name: r,
  hydrate: cl = true
}) => {
  if (E == null || E.trim() === "") {
    return null;
  }
  const g = cl ? "astro-slot" : "astro-static-slot";
  return bt.createElement(g, {
    name: r,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: E
    }
  });
};
var cy = bt.memo(ph, () => true);
function jh(E) {
  for (const r in E) {
    if (r.startsWith("__reactContainer")) {
      return r;
    }
  }
}
const Vh = {
  class: "className",
  for: "htmlFor"
};
let ey = 0;
function iy(E, r, cl) {
  if (r === undefined) {
    ey += 1;
    r = ey;
    cl = 0;
  }
  let g = {};
  for (const ul of E.attributes) {
    const Wt = Vh[ul.name] || ul.name;
    g[Wt] = ul.value;
  }
  g.key = `${r}-${cl}`;
  if (E.firstChild === null) {
    return bt.createElement(E.localName, g);
  }
  let rl = 0;
  return bt.createElement(E.localName, g, Array.from(E.childNodes).map(ul => ul.nodeType === Node.TEXT_NODE ? ul.data : ul.nodeType === Node.ELEMENT_NODE ? (rl += 1, iy(ul, r, rl)) : undefined).filter(ul => !!ul));
}
function xh(E, r) {
  if (r && E) {
    let cl = [];
    let g = document.createElement("template");
    g.innerHTML = E;
    for (let rl of g.content.children) {
      cl.push(iy(rl));
    }
    return cl;
  } else if (E) {
    return bt.createElement(cy, {
      value: E
    });
  } else {
    return undefined;
  }
}
let ny = new WeakMap();
const fy = (E, r) => {
  let cl = ny.get(E);
  if (!cl) {
    cl = r();
    ny.set(E, cl);
  }
  return cl;
};
var Wh = E => (r, cl, {
  default: g,
  ...rl
}, {
  client: ul
}) => {
  if (!E.hasAttribute("ssr")) {
    return;
  }
  const Wt = E.getAttribute("data-action-key");
  const lu = E.getAttribute("data-action-name");
  const tu = E.getAttribute("data-action-result");
  const En = Wt && lu && tu ? [JSON.parse(tu), Wt, lu] : undefined;
  const Iu = {
    identifierPrefix: E.getAttribute("prefix"),
    formState: En
  };
  for (const [Il, El] of Object.entries(rl)) {
    cl[Il] = bt.createElement(cy, {
      value: El,
      name: Il
    });
  }
  const C = bt.createElement(r, cl, xh(g, E.hasAttribute("data-react-children")));
  const Pu = jh(E);
  if (Pu) {
    delete E[Pu];
  }
  if (ul === "only") {
    return bt.startTransition(() => {
      fy(E, () => {
        const El = uy.createRoot(E);
        E.addEventListener("astro:unmount", () => El.unmount(), {
          once: true
        });
        return El;
      }).render(C);
    });
  }
  bt.startTransition(() => {
    fy(E, () => {
      const El = uy.hydrateRoot(E, C, Iu);
      E.addEventListener("astro:unmount", () => El.unmount(), {
        once: true
      });
      return El;
    }).render(C);
  });
};
export { Wh as default }; //# sourceMappingURL=cFopMOmaf6oo.js.map
//# chunkId=019e03d7-352c-7452-a867-8eceed83e595