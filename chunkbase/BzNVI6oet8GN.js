(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019dcbdb-ac25-7ab0-ad49-6dd6d3141eaa";
    }
  } catch (e) {}
})();
const a = () => (async e => {
  try {
    return (await WebAssembly.instantiate(e)).instance.exports.b(BigInt(0)) === BigInt(0);
  } catch {
    return false;
  }
})(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 1, 126, 1, 126, 3, 2, 1, 0, 7, 5, 1, 1, 98, 0, 0, 10, 6, 1, 4, 0, 32, 0, 11]));
const t = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11]));
const s = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 6, 64, 25, 11, 11]));
const A = () => (async () => {
  try {
    new WebAssembly.Module(Uint8Array.from("\0asm\0\0\0`\0\0\0\n\0i@\0\0\0", e => e.codePointAt(0)));
    return true;
  } catch {
    return false;
  }
})();
const r = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 5, 3, 1, 0, 1, 11, 9, 1, 0, 65, 1, 65, 2, 106, 11, 0]));
const y = () => (async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 95, 1, 120, 0])))();
const i = () => (async () => {
  try {
    await WebAssembly.instantiate(Uint8Array.from("\0asm\0\0\0`owasm:js-stringtest\0\0", e => e.codePointAt(0)), {}, {
      builtins: ["js-string"]
    });
    return true;
  } catch {
    return false;
  }
})();
const l = () => (async () => "Suspending" in WebAssembly)();
const b = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 5, 3, 1, 4, 1]));
const c = () => (async () => {
  try {
    new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 5, 5, 2, 0, 0, 0, 0]));
    return true;
  } catch {
    return false;
  }
})();
const m = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 0, 2, 127, 127, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 65, 0, 11]));
const o = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 2, 8, 1, 1, 97, 1, 98, 3, 127, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 5, 1, 1, 97, 3, 1]));
const d = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 7, 1, 5, 0, 208, 112, 26, 11]));
const u = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 15, 1, 13, 0, 65, 1, 253, 15, 65, 2, 253, 15, 253, 128, 2, 11]));
const w = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 12, 1, 10, 0, 67, 0, 0, 0, 0, 252, 0, 26, 11]));
const B = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 192, 26, 11]));
const W = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]));
const g = () => (async () => "compileStreaming" in WebAssembly)();
const U = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 6, 1, 4, 0, 18, 0, 11]));
const f = () => (async e => {
  try {
    if (typeof MessageChannel !== "undefined") {
      new MessageChannel().port1.postMessage(new SharedArrayBuffer(1));
    }
    return WebAssembly.validate(e);
  } catch {
    return false;
  }
})(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
const p = () => (async () => "Function" in WebAssembly)();
const v = () => (async () => {
  try {
    new WebAssembly.Module(Uint8Array.from("\0asm\0\0\0``d\0`\0\0\t\0\n\0A\nA* \0\0j\0 \0Aj\0Ò\0", e => e.codePointAt(0)));
    return true;
  } catch {
    return false;
  }
})();
export { a as bigInt, t as bulkMemory, s as exceptions, A as exceptionsFinal, r as extendedConst, y as gc, i as jsStringBuiltins, l as jspi, b as memory64, c as multiMemory, m as multiValue, o as mutableGlobals, d as referenceTypes, u as relaxedSimd, w as saturatedFloatToInt, B as signExtensions, W as simd, g as streamingCompilation, U as tailCall, f as threads, p as typeReflection, v as typedFunctionReferences }; //# sourceMappingURL=BzNVI6oet8GN.js.map
//# chunkId=019dcbdb-ac25-7ab0-ad49-6dd6d3141eaa