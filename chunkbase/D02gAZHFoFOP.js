(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019fb98d-ff81-79f2-b0a0-690b45e79732";
    }
  } catch (e) {}
})();
import { E as i, J as s, B as n, D as r } from "./BtLKJFoOO27o.js";
function o(e) {
  return e.edition === i.Java && e.javaVersion >= s.V1_18 || e.edition === i.Bedrock && e.bedrockVersion >= n.V1_18;
}
function a(e) {
  return e.edition === i.Java && e.javaVersion >= s.V1_16 || e.edition === i.Bedrock && e.bedrockVersion >= n.V1_16;
}
const u = e => o(e);
function V(e, t) {
  switch (t) {
    case r.End:
      return true;
    case r.Overworld:
      return o(e);
    case r.Nether:
      return a(e);
  }
}
export { V as a, u as s };
/*! Chunk Base (c) Alexander Gundermann - https://www.chunkbase.com - unauthorized copying prohibited */
//# chunkId=019fb98d-ff81-79f2-b0a0-690b45e79732