(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019be151-af6d-7601-81c8-7da6ef24105c";
    }
  } catch (e) {}
})();
const m = (a, t, c) => Math.min(c, Math.max(t, a));
export { m as c }; //# sourceMappingURL=-00YEiB8c-7X.js.map
//# chunkId=019be151-af6d-7601-81c8-7da6ef24105c