(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019e03d7-3533-7153-ab6d-613f504c1f56";
    }
  } catch (e) {}
})();
var U = {
  exports: {}
};
var j = {};
var E;
function W() {
  if (!E) {
    E = 1;
    (function (l) {
      function S(e, a) {
        var n = e.length;
        e.push(a);
        e: while (n > 0) {
          var u = n - 1 >>> 1;
          var r = e[u];
          if (m(r, a) > 0) {
            e[u] = a;
            e[n] = r;
            n = u;
          } else {
            break e;
          }
        }
      }
      function i(e) {
        if (e.length === 0) {
          return null;
        } else {
          return e[0];
        }
      }
      function k(e) {
        if (e.length === 0) {
          return null;
        }
        var a = e[0];
        var n = e.pop();
        if (n !== a) {
          e[0] = n;
          e: for (var u = 0, r = e.length, P = r >>> 1; u < P;) {
            var T = (u + 1) * 2 - 1;
            var I = e[T];
            var o = T + 1;
            var C = e[o];
            if (m(I, n) < 0) {
              if (o < r && m(C, I) < 0) {
                e[u] = C;
                e[o] = n;
                u = o;
              } else {
                e[u] = I;
                e[T] = n;
                u = T;
              }
            } else if (o < r && m(C, n) < 0) {
              e[u] = C;
              e[o] = n;
              u = o;
            } else {
              break e;
            }
          }
        }
        return a;
      }
      function m(e, a) {
        var n = e.sortIndex - a.sortIndex;
        if (n !== 0) {
          return n;
        } else {
          return e.id - a.id;
        }
      }
      l.unstable_now = undefined;
      if (typeof performance == "object" && typeof performance.now == "function") {
        var J = performance;
        l.unstable_now = function () {
          return J.now();
        };
      } else {
        var F = Date;
        var K = F.now();
        l.unstable_now = function () {
          return F.now() - K;
        };
      }
      var s = [];
      var c = [];
      var O = 1;
      var f = null;
      var t = 3;
      var g = false;
      var d = false;
      var y = false;
      var q = false;
      var Q = typeof setTimeout == "function" ? setTimeout : null;
      var Y = typeof clearTimeout == "function" ? clearTimeout : null;
      var B = typeof setImmediate !== "undefined" ? setImmediate : null;
      function w(e) {
        for (var a = i(c); a !== null;) {
          if (a.callback === null) {
            k(c);
          } else if (a.startTime <= e) {
            k(c);
            a.sortIndex = a.expirationTime;
            S(s, a);
          } else {
            break;
          }
          a = i(c);
        }
      }
      function R(e) {
        y = false;
        w(e);
        if (!d) {
          if (i(s) !== null) {
            d = true;
            if (!b) {
              b = true;
              v();
            }
          } else {
            var a = i(c);
            if (a !== null) {
              D(R, a.startTime - e);
            }
          }
        }
      }
      var b = false;
      var _ = -1;
      var M = 5;
      var N = -1;
      function z() {
        if (q) {
          return true;
        } else {
          return !(l.unstable_now() - N < M);
        }
      }
      function H() {
        q = false;
        if (b) {
          var e = l.unstable_now();
          N = e;
          var a = true;
          try {
            e: {
              d = false;
              if (y) {
                y = false;
                Y(_);
                _ = -1;
              }
              g = true;
              var n = t;
              try {
                n: {
                  w(e);
                  f = i(s);
                  while (f !== null && (!(f.expirationTime > e) || !z())) {
                    var u = f.callback;
                    if (typeof u == "function") {
                      f.callback = null;
                      t = f.priorityLevel;
                      var r = u(f.expirationTime <= e);
                      e = l.unstable_now();
                      if (typeof r == "function") {
                        f.callback = r;
                        w(e);
                        a = true;
                        break n;
                      }
                      if (f === i(s)) {
                        k(s);
                      }
                      w(e);
                    } else {
                      k(s);
                    }
                    f = i(s);
                  }
                  if (f !== null) {
                    a = true;
                  } else {
                    var P = i(c);
                    if (P !== null) {
                      D(R, P.startTime - e);
                    }
                    a = false;
                  }
                }
                break e;
              } finally {
                f = null;
                t = n;
                g = false;
              }
              a = undefined;
            }
          } finally {
            if (a) {
              v();
            } else {
              b = false;
            }
          }
        }
      }
      var v;
      if (typeof B == "function") {
        v = function () {
          B(H);
        };
      } else if (typeof MessageChannel !== "undefined") {
        var A = new MessageChannel();
        var V = A.port2;
        A.port1.onmessage = H;
        v = function () {
          V.postMessage(null);
        };
      } else {
        v = function () {
          Q(H, 0);
        };
      }
      function D(e, a) {
        _ = Q(function () {
          e(l.unstable_now());
        }, a);
      }
      l.unstable_IdlePriority = 5;
      l.unstable_ImmediatePriority = 1;
      l.unstable_LowPriority = 4;
      l.unstable_NormalPriority = 3;
      l.unstable_Profiling = null;
      l.unstable_UserBlockingPriority = 2;
      l.unstable_cancelCallback = function (e) {
        e.callback = null;
      };
      l.unstable_forceFrameRate = function (e) {
        if (e < 0 || e > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        } else {
          M = e > 0 ? Math.floor(1000 / e) : 5;
        }
      };
      l.unstable_getCurrentPriorityLevel = function () {
        return t;
      };
      l.unstable_next = function (e) {
        switch (t) {
          case 1:
          case 2:
          case 3:
            var a = 3;
            break;
          default:
            a = t;
        }
        var n = t;
        t = a;
        try {
          return e();
        } finally {
          t = n;
        }
      };
      l.unstable_requestPaint = function () {
        q = true;
      };
      l.unstable_runWithPriority = function (e, a) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var n = t;
        t = e;
        try {
          return a();
        } finally {
          t = n;
        }
      };
      l.unstable_scheduleCallback = function (e, a, n) {
        var u = l.unstable_now();
        if (typeof n == "object" && n !== null) {
          n = n.delay;
          n = typeof n == "number" && n > 0 ? u + n : u;
        } else {
          n = u;
        }
        switch (e) {
          case 1:
            var r = -1;
            break;
          case 2:
            r = 250;
            break;
          case 5:
            r = 1073741823;
            break;
          case 4:
            r = 10000;
            break;
          default:
            r = 5000;
        }
        r = n + r;
        e = {
          id: O++,
          callback: a,
          priorityLevel: e,
          startTime: n,
          expirationTime: r,
          sortIndex: -1
        };
        if (n > u) {
          e.sortIndex = n;
          S(c, e);
          if (i(s) === null && e === i(c)) {
            if (y) {
              Y(_);
              _ = -1;
            } else {
              y = true;
            }
            D(R, n - u);
          }
        } else {
          e.sortIndex = r;
          S(s, e);
          if (!d && !g) {
            d = true;
            if (!b) {
              b = true;
              v();
            }
          }
        }
        return e;
      };
      l.unstable_shouldYield = z;
      l.unstable_wrapCallback = function (e) {
        var a = t;
        return function () {
          var n = t;
          t = a;
          try {
            return e.apply(this, arguments);
          } finally {
            t = n;
          }
        };
      };
    })(j);
  }
  return j;
}
var G;
function X() {
  if (!G) {
    G = 1;
    U.exports = W();
  }
  return U.exports;
}
export { X as r }; //# sourceMappingURL=7OC5HNn7-IcQ.js.map
//# chunkId=019e03d7-3533-7153-ab6d-613f504c1f56