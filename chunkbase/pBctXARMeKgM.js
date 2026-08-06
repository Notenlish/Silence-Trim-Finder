(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019fb98d-ffa6-7c91-a426-0485ccfc80e7";
    }
  } catch (e) {}
})();
import { r as m } from "./CNSOJBbxx5q0 (not important).js";
var d = {
  exports: {}
};
var a = {};
var h;
function w() {
  if (h) {
    return a;
  }
  h = 1;
  var e = Symbol.for("react.transitional.element");
  var n = Symbol.for("react.fragment");
  function t(i, r, o) {
    var u = null;
    if (o !== undefined) {
      u = "" + o;
    }
    if (r.key !== undefined) {
      u = "" + r.key;
    }
    if ("key" in r) {
      o = {};
      for (var c in r) {
        if (c !== "key") {
          o[c] = r[c];
        }
      }
    } else {
      o = r;
    }
    r = o.ref;
    return {
      $$typeof: e,
      type: i,
      key: u,
      ref: r !== undefined ? r : null,
      props: o
    };
  }
  a.Fragment = n;
  a.jsx = t;
  a.jsxs = t;
  return a;
}
var p;
function x() {
  if (!p) {
    p = 1;
    d.exports = w();
  }
  return d.exports;
}
var M = x();
function P(e, n, t, i) {
  e.addEventListener(n, t, i);
  return () => {
    e.removeEventListener(n, t, i);
  };
}
function S(e) {
  return m.useSyncExternalStore(n => typeof window === "undefined" ? () => {} : P(window.matchMedia(e), "change", n), () => typeof window === "undefined" ? false : window.matchMedia(e).matches, () => false);
}
function k() {
  if (typeof window === "undefined") {
    return "server";
  }
  const e = window.innerWidth;
  const n = window.innerHeight;
  const i = Math.max(e, n) < 950;
  if (T()) {
    return "ios";
  } else if (i) {
    return "mobile";
  } else {
    return "default";
  }
}
function R() {
  const e = navigator.userAgent || "";
  const n = /iPad/i.test(e) || navigator.platform === "iPad";
  const t = navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 1;
  return n || t;
}
function T() {
  const e = navigator.userAgent || "";
  return /iPhone|iPad|iPod/i.test(e) || R();
}
function D() {
  if (typeof window === "undefined") {
    return false;
  } else {
    return /Android/i.test(navigator.userAgent || "");
  }
}
let l;
function g() {
  if (typeof window === "undefined") {
    return null;
  } else {
    if (l == null) {
      l = matchMedia("(pointer: coarse)").matches;
    }
    return l;
  }
}
const _ = () => ({
  isPrimarilyTouchDevice: m.useSyncExternalStore(() => () => {}, () => g(), () => null)
});
const j = () => !S("(min-width: 640px)");
function s(e) {
  return new Promise((n, t) => {
    e.oncomplete = e.onsuccess = () => n(e.result);
    e.onabort = e.onerror = () => t(e.error);
  });
}
function E(e, n) {
  let t;
  const i = () => {
    if (t) {
      return t;
    }
    const r = indexedDB.open(e);
    r.onupgradeneeded = () => r.result.createObjectStore(n);
    t = s(r);
    t.then(o => {
      o.onclose = () => t = undefined;
    }, () => {});
    return t;
  };
  return (r, o) => i().then(u => o(u.transaction(n, r).objectStore(n)));
}
let f;
function v() {
  f ||= E("keyval-store", "keyval");
  return f;
}
function A(e, n = v()) {
  return n("readonly", t => s(t.get(e)));
}
function J(e, n, t = v()) {
  return t("readwrite", i => {
    i.put(n, e);
    return s(i.transaction);
  });
}
function I(e, n = v()) {
  return n("readwrite", t => {
    t.delete(e);
    return s(t.transaction);
  });
}
export { j as a, S as b, A as c, I as d, g as e, T as f, k as g, D as i, M as j, P as l, J as s, _ as u };
/*! Chunk Base (c) Alexander Gundermann - https://www.chunkbase.com - unauthorized copying prohibited */
//# chunkId=019fb98d-ffa6-7c91-a426-0485ccfc80e7