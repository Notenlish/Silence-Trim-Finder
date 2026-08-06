!(function () {
  try {
    var e =
        "undefined" != typeof window
          ? window
          : "undefined" != typeof global
            ? global
            : "undefined" != typeof globalThis
              ? globalThis
              : "undefined" != typeof self
                ? self
                : {},
      n = new e.Error().stack;
    n &&
      ((e._posthogChunkIds = e._posthogChunkIds || {}),
      (e._posthogChunkIds[n] = "019fd253-75d6-7de1-9b14-3e6502f39967"));
  } catch (e) {}
})();
import { j as u } from "./pBctXARMeKgM.js";
import "./CNSOJBbxx5q0 (not important).js";
import { u as s, i as f, s as i } from "./5-hPiYiZklaR.js";
import { t as m } from "./25yRRMlDxsnb.js";
function w() {
  const t = s(f);
  function e() {
    const d = y(),
      o = new Blob([JSON.stringify(d)], { type: "application/json" }),
      a = URL.createObjectURL(o),
      r = document.createElement("a");
    r.href = a;
    const c = new Date().toISOString().slice(0, 10);
    ((r.download = "chunkbase-map-data-" + c + ".json"), r.click());
  }
  function n() {
    if (
      !window.confirm(
        "Loading markers and completed locations will overwrite your current ones. Are you sure you want to continue?",
      )
    )
      return;
    const o = document.createElement("input");
    ((o.type = "file"),
      (o.accept = ".json"),
      o.addEventListener("change", () => {
        const a = o.files?.[0];
        if (!a) return;
        const r = new FileReader();
        ((r.onerror = () => {
          i({ text: "Error reading file: " + r.error?.message, type: "error" });
        }),
          (r.onload = (c) => {
            const p = c.target?.result;
            if (typeof p != "string") {
              i({ text: "Error reading file", type: "error" });
              return;
            }
            let l;
            try {
              l = JSON.parse(p);
            } catch {
              m("CB_ChunkApp_UserDataImportJsonError");
            }
            if (!(l != null && k(l))) {
              i({ text: "Failed to load: invalid format", type: "error" });
              return;
            }
            (i({
              text: "Markers and completed locations loaded successfully!",
              type: "info",
            }),
              m("CB_ChunkApp_UserDataImportSuccess"));
          }),
          r.readAsText(a));
      }),
      o.click());
  }
  return u.jsxs("div", {
    className: "flex gap-2 pl-[15px]",
    children: [
      u.jsx("button", {
        className: "gh-button icon folder",
        type: "button",
        disabled: !t,
        onClick: e,
        children: "Save data...",
      }),
      u.jsx("button", {
        className: "gh-button icon curvedarrow",
        type: "button",
        disabled: !t,
        onClick: n,
        children: "Load data...",
      }),
    ],
  });
}
function y() {
  const t = s.getState().markedPois,
    e = s.getState().customPins;
  return { version: 1, markedPois: t, customPins: e };
}
function k(t) {
  return t == null || typeof t != "object"
    ? !1
    : t.version == null
      ? g(t)
      : t.version === 1
        ? b(t)
        : !1;
}
function g(t) {
  return s.getState().validateAndImportMarkedPois(t);
}
function b(t) {
  let e = !0;
  const n = t;
  return (
    n.markedPois != null &&
      (e = e && s.getState().validateAndImportMarkedPois(n.markedPois)),
    n.customPins != null &&
      (e = e && s.getState().validateAndImportCustomPins(n.customPins)),
    e
  );
}
export { w as HowToButtons };

/*! Chunk Base (c) Alexander Gundermann - https://www.chunkbase.com - unauthorized copying prohibited */

//# chunkId=019fd253-75d6-7de1-9b14-3e6502f39967
