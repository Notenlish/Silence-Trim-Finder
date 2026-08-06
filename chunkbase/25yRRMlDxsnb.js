(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019fb98d-ff81-79f2-b0a0-68e2872f4e6e";
    }
  } catch (e) {}
})();
function a(t, n, i = "gtag") {
  if (i !== "posthog") {
    window.gtag?.("event", t, n);
  }
  if (i !== "gtag") {
    window.posthog?.capture(t, n);
  }
}
function c() {
  return window.gtag;
}
function e(t) {
  window.posthog?.captureException(t);
  console.error(t);
}
const o = [];
function r(t, n) {
  if (typeof window === "undefined") {
    console.log("breadcrumb", t, n);
    return;
  }
  if (o.length >= 20) {
    o.shift();
  }
  o.push({
    timestamp: new Date().toISOString(),
    name: t,
    properties: n
  });
}
if (typeof window !== "undefined") {
  window.__cbGetBreadcrumbs = () => o;
}
export { e as a, r as b, c as i, a as t };
/*! Chunk Base (c) Alexander Gundermann - https://www.chunkbase.com - unauthorized copying prohibited */
//# chunkId=019fb98d-ff81-79f2-b0a0-68e2872f4e6e