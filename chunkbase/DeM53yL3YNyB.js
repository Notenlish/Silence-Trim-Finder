(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019fb98d-ffd8-7892-9e88-4fef78907963";
    }
  } catch (e) {}
})();
import { i as Hr, j as w, d as Vr } from "./pBctXARMeKgM.js";
import { r as u, g as Yr, b as Kr, a as Bn } from "./CNSOJBbxx5q0.js";
import { t as $r, a as Gr } from "./25yRRMlDxsnb.js";
import { r as qr } from "./Dr8MHZPCjXL2.js";
function _t(e) {
  const t = u.useRef(e);
  t.current = e;
  return t;
}
const sn = Symbol("UNSET");
function Xr(e) {
  const t = u.useRef(sn);
  if (t.current === sn) {
    t.current = e();
  }
  return t;
}
function qi(e) {
  return Xr(e).current;
}
function Xi(e, t, n = {}) {
  const [r, o] = u.useState(null);
  const s = _t(t);
  u.useEffect(() => {
    if (e === null) {
      return;
    }
    let i = false;
    s.current(e, () => i).then(a => {
      if (!i) {
        o({
          value: e,
          result: a
        });
      }
    });
    return () => {
      i = true;
    };
  }, [e, s]);
  if (e == null) {
    return null;
  } else if (r?.value === e) {
    return r.result;
  } else if (n.returnStaleWhileLoading) {
    return r?.result;
  } else {
    return null;
  }
}
function zi(e) {
  const [t, n] = u.useState(null);
  u.useEffect(() => {
    const r = () => {
      const s = document.querySelector(e);
      const i = s ? !!s.offsetWidth || !!s.offsetHeight || !!s.getClientRects().length : false;
      n(s && i ? s.offsetHeight : null);
    };
    r();
    const o = new MutationObserver(r);
    o.observe(document.body, {
      childList: true,
      subtree: true
    });
    return () => o.disconnect();
  }, [e]);
  return t;
}
function gt() {
  return typeof window !== "undefined";
}
function re(e) {
  if (Bt(e)) {
    return (e.nodeName || "").toLowerCase();
  } else {
    return "#document";
  }
}
function pe(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? undefined : t.defaultView) || window;
}
function zr(e) {
  var t;
  if ((t = (Bt(e) ? e.ownerDocument : e.document) || window.document) == null) {
    return undefined;
  } else {
    return t.documentElement;
  }
}
function Bt(e) {
  if (gt()) {
    return e instanceof Node || e instanceof pe(e).Node;
  } else {
    return false;
  }
}
function Se(e) {
  if (gt()) {
    return e instanceof Element || e instanceof pe(e).Element;
  } else {
    return false;
  }
}
function Z(e) {
  if (gt()) {
    return e instanceof HTMLElement || e instanceof pe(e).HTMLElement;
  } else {
    return false;
  }
}
function _e(e) {
  if (!gt() || typeof ShadowRoot === "undefined") {
    return false;
  } else {
    return e instanceof ShadowRoot || e instanceof pe(e).ShadowRoot;
  }
}
function Ze(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Je(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && o !== "inline" && o !== "contents";
}
function Zi(e) {
  return /^(table|td|th)$/.test(re(e));
}
function Zr(e) {
  try {
    if (e.matches(":popover-open")) {
      return true;
    }
  } catch {}
  try {
    return e.matches(":modal");
  } catch {
    return false;
  }
}
const Jr = /transform|translate|scale|rotate|perspective|filter/;
const Qr = /paint|layout|strict|content/;
const Ie = e => !!e && e !== "none";
let Et;
function eo(e) {
  const t = Se(e) ? Je(e) : e;
  return Ie(t.transform) || Ie(t.translate) || Ie(t.scale) || Ie(t.rotate) || Ie(t.perspective) || !to() && (Ie(t.backdropFilter) || Ie(t.filter)) || Jr.test(t.willChange || "") || Qr.test(t.contain || "");
}
function Ji(e) {
  let t = ct(e);
  while (Z(t) && !Ke(t)) {
    if (eo(t)) {
      return t;
    }
    if (Zr(t)) {
      return null;
    }
    t = ct(t);
  }
  return null;
}
function to() {
  if (Et == null) {
    Et = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return Et;
}
function Ke(e) {
  return /^(html|body|#document)$/.test(re(e));
}
function Je(e) {
  return pe(e).getComputedStyle(e);
}
function Qi(e) {
  if (Se(e)) {
    return {
      scrollLeft: e.scrollLeft,
      scrollTop: e.scrollTop
    };
  } else {
    return {
      scrollLeft: e.scrollX,
      scrollTop: e.scrollY
    };
  }
}
function ct(e) {
  if (re(e) === "html") {
    return e;
  }
  const t = e.assignedSlot || e.parentNode || _e(e) && e.host || zr(e);
  if (_e(t)) {
    return t.host;
  } else {
    return t;
  }
}
function Wn(e) {
  const t = ct(e);
  if (Ke(t)) {
    if (e.ownerDocument) {
      return e.ownerDocument.body;
    } else {
      return e.body;
    }
  } else if (Z(t) && Ze(t)) {
    return t;
  } else {
    return Wn(t);
  }
}
function cn(e, t, n) {
  var r;
  if (t === undefined) {
    t = [];
  }
  if (n === undefined) {
    n = true;
  }
  const o = Wn(e);
  const s = o === ((r = e.ownerDocument) == null ? undefined : r.body);
  const i = pe(o);
  if (s) {
    const a = no(i);
    return t.concat(i, i.visualViewport || [], Ze(o) ? o : [], a && n ? cn(a) : []);
  } else {
    return t.concat(o, cn(o, [], n));
  }
}
function no(e) {
  if (e.parent && Object.getPrototypeOf(e.parent)) {
    return e.frameElement;
  } else {
    return null;
  }
}
function ec({
  isEnabled: e,
  onDismiss: t
}) {
  const n = _t(t);
  u.useEffect(() => {
    if (!e) {
      return;
    }
    const r = {
      dismiss: o => n.current(o)
    };
    if (Fe.length === 0) {
      window.addEventListener("keydown", an);
    }
    Fe.push(r);
    return () => {
      const o = Fe.indexOf(r);
      if (o !== -1) {
        Fe.splice(o, 1);
      }
      if (Fe.length === 0) {
        window.removeEventListener("keydown", an);
      }
    };
  }, [e, n]);
  jn(e, () => n.current("close-watcher"));
}
const Fe = [];
function an(e) {
  if (e.key !== "Escape" || e.defaultPrevented || e.isComposing) {
    return;
  }
  const t = Fe.at(-1);
  if (t) {
    e.preventDefault();
    t.dismiss("escape-key");
  }
}
function jn(e, t) {
  const n = _t(t);
  u.useEffect(() => {
    if (!e || !Hr()) {
      return;
    }
    const r = window.CloseWatcher;
    if (!r) {
      return;
    }
    const o = new r();
    o.addEventListener("close", () => n.current());
    return () => {
      o.destroy();
    };
  }, [e, n]);
}
var ht = qr();
const tc = Yr(ht);
function ro(e, t) {
  return function (r, ...o) {
    const s = new URL(e);
    s.searchParams.set("code", r.toString());
    o.forEach(i => s.searchParams.append("args[]", i));
    return `${t} error #${r}; visit ${s} for the full message.`;
  };
}
const Qe = ro("https://base-ui.com/production-error", "Base UI");
const Un = u.createContext(false);
const Hn = u.createContext(undefined);
function we(e) {
  const t = u.useContext(Hn);
  if (e === false && t === undefined) {
    throw new Error(Qe(27));
  }
  return t;
}
const un = {};
function ke(e, t) {
  const n = u.useRef(un);
  if (n.current === un) {
    n.current = e(t);
  }
  return n;
}
function at(e, t, n, r) {
  const o = ke(Vn).current;
  if (so(o, e, t, n, r)) {
    Yn(o, [e, t, n, r]);
  }
  return o.callback;
}
function oo(e) {
  const t = ke(Vn).current;
  if (io(t, e)) {
    Yn(t, e);
  }
  return t.callback;
}
function Vn() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function so(e, t, n, r, o) {
  return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== r || e.refs[3] !== o;
}
function io(e, t) {
  return e.refs.length !== t.length || e.refs.some((n, r) => n !== t[r]);
}
function Yn(e, t) {
  e.refs = t;
  if (t.every(n => n == null)) {
    e.callback = null;
    return;
  }
  e.callback = n => {
    if (e.cleanup) {
      e.cleanup();
      e.cleanup = null;
    }
    if (n != null) {
      const r = Array(t.length).fill(null);
      for (let o = 0; o < t.length; o += 1) {
        const s = t[o];
        if (s != null) {
          switch (typeof s) {
            case "function":
              {
                const i = s(n);
                if (typeof i == "function") {
                  r[o] = i;
                }
                break;
              }
            case "object":
              {
                s.current = n;
                break;
              }
          }
        }
      }
      e.cleanup = () => {
        for (let o = 0; o < t.length; o += 1) {
          const s = t[o];
          if (s != null) {
            switch (typeof s) {
              case "function":
                {
                  const i = r[o];
                  if (typeof i == "function") {
                    i();
                  } else {
                    s(null);
                  }
                  break;
                }
              case "object":
                {
                  s.current = null;
                  break;
                }
            }
          }
        }
      };
    }
  };
}
const co = parseInt(u.version, 10);
function Wt(e) {
  return co >= e;
}
function ln(e) {
  if (!u.isValidElement(e)) {
    return null;
  }
  const t = e;
  const n = t.props;
  return (Wt(19) ? n?.ref : t.ref) ?? null;
}
function At(e, t) {
  if (e && !t) {
    return e;
  }
  if (!e && t) {
    return t;
  }
  if (e || t) {
    return {
      ...e,
      ...t
    };
  }
}
function jt() {}
const nc = Object.freeze([]);
const J = Object.freeze({});
function ao(e, t) {
  const n = {};
  for (const r in e) {
    const o = e[r];
    if (t?.hasOwnProperty(r)) {
      const s = t[r](o);
      if (s != null) {
        Object.assign(n, s);
      }
      continue;
    }
    if (o === true) {
      n[`data-${r.toLowerCase()}`] = "";
    } else if (o) {
      n[`data-${r.toLowerCase()}`] = o.toString();
    }
  }
  return n;
}
function uo(e, t) {
  if (typeof e == "function") {
    return e(t);
  } else {
    return e;
  }
}
function lo(e, t) {
  if (typeof e == "function") {
    return e(t);
  } else {
    return e;
  }
}
const Ut = {};
function Ht(e, t, n, r, o) {
  if (!n && !r && !o && !e) {
    return ut(t);
  }
  let s = ut(e);
  if (t) {
    s = Ye(s, t);
  }
  if (n) {
    s = Ye(s, n);
  }
  if (r) {
    s = Ye(s, r);
  }
  if (o) {
    s = Ye(s, o);
  }
  return s;
}
function fo(e) {
  if (e.length === 0) {
    return Ut;
  }
  if (e.length === 1) {
    return ut(e[0]);
  }
  let t = ut(e[0]);
  for (let n = 1; n < e.length; n += 1) {
    t = Ye(t, e[n]);
  }
  return t;
}
function ut(e) {
  if (Vt(e)) {
    return {
      ...$n(e, Ut)
    };
  } else {
    return po(e);
  }
}
function Ye(e, t) {
  if (Vt(t)) {
    return $n(t, e);
  } else {
    return go(e, t);
  }
}
function po(e) {
  const t = {
    ...e
  };
  for (const n in t) {
    const r = t[n];
    if (Kn(n, r)) {
      t[n] = Gn(r);
    }
  }
  return t;
}
function go(e, t) {
  if (!t) {
    return e;
  }
  for (const n in t) {
    const r = t[n];
    switch (n) {
      case "style":
        {
          e[n] = At(e.style, r);
          break;
        }
      case "className":
        {
          e[n] = qn(e.className, r);
          break;
        }
      default:
        if (Kn(n, r)) {
          e[n] = ho(e[n], r);
        } else {
          e[n] = r;
        }
    }
  }
  return e;
}
function Kn(e, t) {
  const n = e.charCodeAt(0);
  const r = e.charCodeAt(1);
  const o = e.charCodeAt(2);
  return n === 111 && r === 110 && o >= 65 && o <= 90 && (typeof t == "function" || typeof t === "undefined");
}
function Vt(e) {
  return typeof e == "function";
}
function $n(e, t) {
  if (Vt(e)) {
    return e(t);
  } else {
    return e ?? Ut;
  }
}
function ho(e, t) {
  if (t) {
    if (e) {
      return (...n) => {
        const r = n[0];
        if (Xn(r)) {
          const s = r;
          lt(s);
          const i = t(...n);
          if (!s.baseUIHandlerPrevented) {
            e?.(...n);
          }
          return i;
        }
        const o = t(...n);
        e?.(...n);
        return o;
      };
    } else {
      return Gn(t);
    }
  } else {
    return e;
  }
}
function Gn(e) {
  return e && ((...t) => {
    const n = t[0];
    if (Xn(n)) {
      lt(n);
    }
    return e(...t);
  });
}
function lt(e) {
  e.preventBaseUIHandler = () => {
    e.baseUIHandlerPrevented = true;
  };
  return e;
}
function qn(e, t) {
  if (t) {
    if (e) {
      return t + " " + e;
    } else {
      return t;
    }
  } else {
    return e;
  }
}
function Xn(e) {
  return e != null && typeof e == "object" && "nativeEvent" in e;
}
function Ae(e, t, n = {}) {
  const r = t.render;
  const o = mo(t, n);
  if (n.enabled === false) {
    return null;
  }
  const s = n.state ?? J;
  return Eo(e, r, o, s);
}
function mo(e, t = {}) {
  const {
    className: n,
    style: r,
    render: o
  } = e;
  const {
    state: s = J,
    ref: i,
    props: a,
    stateAttributesMapping: f,
    enabled: c = true
  } = t;
  const l = c ? uo(n, s) : undefined;
  const g = c ? lo(r, s) : undefined;
  const d = c ? ao(s, f) : J;
  const p = c && a ? bo(a) : undefined;
  const m = c ? At(d, p) ?? {} : J;
  if (typeof document !== "undefined") {
    if (c) {
      if (Array.isArray(i)) {
        m.ref = oo([m.ref, ln(o), ...i]);
      } else {
        m.ref = at(m.ref, ln(o), i);
      }
    } else {
      at(null, null);
    }
  }
  if (c) {
    if (l !== undefined) {
      m.className = qn(m.className, l);
    }
    if (g !== undefined) {
      m.style = At(m.style, g);
    }
    return m;
  } else {
    return J;
  }
}
function bo(e) {
  if (Array.isArray(e)) {
    return fo(e);
  } else {
    return Ht(undefined, e);
  }
}
const yo = Symbol.for("react.lazy");
function Eo(e, t, n, r) {
  if (t) {
    if (typeof t == "function") {
      return t(n, r);
    }
    const o = Ht(n, t.props);
    o.ref = n.ref;
    let s = t;
    if (s?.$$typeof === yo) {
      s = u.Children.toArray(t)[0];
    }
    return u.cloneElement(s, o);
  }
  if (e && typeof e == "string") {
    return So(e, n);
  }
  throw new Error(Qe(8));
}
function So(e, t) {
  if (e === "button") {
    return u.createElement("button", {
      type: "button",
      ...t,
      key: t.key
    });
  } else if (e === "img") {
    return u.createElement("img", {
      alt: "",
      ...t,
      key: t.key
    });
  } else {
    return u.createElement(e, t);
  }
}
let qe = function (e) {
  e.startingStyle = "data-starting-style";
  e.endingStyle = "data-ending-style";
  return e;
}({});
const Ro = {
  [qe.startingStyle]: ""
};
const xo = {
  [qe.endingStyle]: ""
};
const Yt = {
  transitionStatus(e) {
    if (e === "starting") {
      return Ro;
    } else if (e === "ending") {
      return xo;
    } else {
      return null;
    }
  }
};
let ce = function (e) {
  e.open = "data-open";
  e.closed = "data-closed";
  e[e.startingStyle = qe.startingStyle] = "startingStyle";
  e[e.endingStyle = qe.endingStyle] = "endingStyle";
  e.anchorHidden = "data-anchor-hidden";
  e.side = "data-side";
  e.align = "data-align";
  return e;
}({});
let Nt = function (e) {
  e.popupOpen = "data-popup-open";
  e.pressed = "data-pressed";
  return e;
}({});
const vo = {
  [Nt.popupOpen]: ""
};
const wo = {
  [Nt.popupOpen]: "",
  [Nt.pressed]: ""
};
const To = {
  [ce.open]: ""
};
const Co = {
  [ce.closed]: ""
};
const Oo = {
  [ce.anchorHidden]: ""
};
const rc = {
  open(e) {
    if (e) {
      return vo;
    } else {
      return null;
    }
  }
};
const oc = {
  open(e) {
    if (e) {
      return wo;
    } else {
      return null;
    }
  }
};
const Kt = {
  open(e) {
    if (e) {
      return To;
    } else {
      return Co;
    }
  },
  anchorHidden(e) {
    if (e) {
      return Oo;
    } else {
      return null;
    }
  }
};
const Io = {
  ...Kt,
  ...Yt
};
const Po = u.forwardRef(function (t, n) {
  const {
    render: r,
    className: o,
    style: s,
    forceRender: i = false,
    ...a
  } = t;
  const {
    store: f
  } = we();
  const c = f.useState("open");
  const l = f.useState("nested");
  const g = f.useState("mounted");
  const d = f.useState("transitionStatus");
  return Ae("div", t, {
    state: {
      open: c,
      transitionStatus: d
    },
    ref: [f.context.backdropRef, n],
    stateAttributesMapping: Io,
    props: [{
      role: "presentation",
      hidden: !g,
      style: {
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, a],
    enabled: i || !l
  });
});
const $t = {
  ...Kr
};
const St = $t.useInsertionEffect;
const ko = St && St !== $t.useLayoutEffect ? St : e => e();
function q(e) {
  const t = ke(Ao).current;
  t.next = e;
  ko(t.effect);
  return t.trampoline;
}
function Ao() {
  const e = {
    next: undefined,
    callback: No,
    trampoline: (...t) => e.callback?.(...t),
    effect: () => {
      e.callback = e.next;
    }
  };
  return e;
}
function No() {}
const Mo = () => {};
const U = typeof document !== "undefined" ? u.useLayoutEffect : Mo;
const Do = u.createContext(undefined);
function Fo(e = false) {
  const t = u.useContext(Do);
  if (t === undefined && !e) {
    throw new Error(Qe(16));
  }
  return t;
}
function Lo(e) {
  const {
    focusableWhenDisabled: t,
    disabled: n,
    composite: r = false,
    tabIndex: o = 0,
    isNativeButton: s
  } = e;
  const i = r && t !== false;
  const a = r && t === false;
  return {
    props: u.useMemo(() => {
      const c = {
        onKeyDown(l) {
          if (n && t && l.key !== "Tab") {
            l.preventDefault();
          }
        }
      };
      if (!r) {
        c.tabIndex = o;
        if (!s && n) {
          c.tabIndex = t ? o : -1;
        }
      }
      if (s && (t || i) || !s && n) {
        c["aria-disabled"] = n;
      }
      if (s && (!t || a)) {
        c.disabled = n;
      }
      return c;
    }, [r, n, t, i, a, s, o])
  };
}
function _o(e = {}) {
  const {
    disabled: t = false,
    focusableWhenDisabled: n,
    tabIndex: r = 0,
    native: o = true,
    composite: s
  } = e;
  const i = u.useRef(null);
  const a = Fo(true);
  const f = s ?? a !== undefined;
  const {
    props: c
  } = Lo({
    focusableWhenDisabled: n,
    disabled: t,
    composite: f,
    tabIndex: r,
    isNativeButton: o
  });
  const l = u.useCallback(() => {
    const p = i.current;
    if (Rt(p) && f && t && c.disabled === undefined && p.disabled) {
      p.disabled = false;
    }
  }, [t, c.disabled, f]);
  U(l, [l]);
  const g = u.useCallback((p = {}) => {
    const {
      onClick: m,
      onMouseDown: S,
      onKeyUp: E,
      onKeyDown: R,
      onPointerDown: b,
      ...H
    } = p;
    return Ht({
      onClick(h) {
        if (t) {
          h.preventDefault();
          return;
        }
        m?.(h);
      },
      onMouseDown(h) {
        if (!t) {
          S?.(h);
        }
      },
      onKeyDown(h) {
        if (t || (lt(h), R?.(h), h.baseUIHandlerPrevented)) {
          return;
        }
        const T = h.target === h.currentTarget;
        const N = h.currentTarget;
        const I = Rt(N);
        const _ = !o && Bo(N);
        const M = T && (o ? I : !_);
        const G = h.key === "Enter";
        const te = h.key === " ";
        const V = N.getAttribute("role");
        const k = V?.startsWith("menuitem") || V === "option" || V === "gridcell";
        if (T && f && te) {
          if (h.defaultPrevented && k) {
            return;
          }
          h.preventDefault();
          if (_ || o && I) {
            N.click();
            h.preventBaseUIHandler();
          } else if (M) {
            m?.(h);
            h.preventBaseUIHandler();
          }
          return;
        }
        if (M) {
          if (!o && (te || G)) {
            h.preventDefault();
          }
          if (!o && G) {
            m?.(h);
          }
        }
      },
      onKeyUp(h) {
        if (!t) {
          lt(h);
          E?.(h);
          if (h.target === h.currentTarget && o && f && Rt(h.currentTarget) && h.key === " ") {
            h.preventDefault();
            return;
          }
          if (!h.baseUIHandlerPrevented) {
            if (h.target === h.currentTarget && !o && !f && h.key === " ") {
              m?.(h);
            }
          }
        }
      },
      onPointerDown(h) {
        if (t) {
          h.preventDefault();
          return;
        }
        b?.(h);
      }
    }, o ? {
      type: "button"
    } : {
      role: "button"
    }, c, H);
  }, [t, c, f, o]);
  const d = q(p => {
    i.current = p;
    l();
  });
  return {
    getButtonProps: g,
    buttonRef: d
  };
}
function Rt(e) {
  return Z(e) && e.tagName === "BUTTON";
}
function Bo(e) {
  return e?.tagName === "A" && !!e?.href;
}
const Wo = "none";
const jo = "trigger-press";
const Uo = "trigger-hover";
const zn = "outside-press";
const sc = "item-press";
const Ho = "close-press";
const ic = "increment-press";
const cc = "decrement-press";
const ac = "input-change";
const uc = "input-clear";
const lc = "input-blur";
const fc = "input-paste";
const Zn = "focus-out";
const Vo = "escape-key";
const dc = "close-watcher";
const pc = "list-navigation";
const gc = "keyboard";
const hc = "wheel";
const mc = "cancel-open";
const Yo = "imperative-action";
const bc = "swipe";
const yc = "window-resize";
function xe(e, t, n, r) {
  let o = false;
  let s = false;
  const i = r ?? J;
  return {
    reason: e,
    event: t ?? new Event("base-ui"),
    cancel() {
      o = true;
    },
    allowPropagation() {
      s = true;
    },
    get isCanceled() {
      return o;
    },
    get isPropagationAllowed() {
      return s;
    },
    trigger: n,
    ...i
  };
}
function Ec(e, t, n) {
  const r = J;
  return {
    reason: e,
    event: t ?? new Event("base-ui"),
    ...r
  };
}
const _Component5 = u.forwardRef(function (t, n) {
  const {
    render: r,
    className: o,
    style: s,
    disabled: i = false,
    nativeButton: a = true,
    ...f
  } = t;
  const {
    store: c
  } = we();
  const l = c.useState("open");
  const {
    getButtonProps: g,
    buttonRef: d
  } = _o({
    disabled: i,
    native: a
  });
  const p = {
    disabled: i
  };
  function m(S) {
    if (l) {
      c.setOpen(false, xe(Ho, S.nativeEvent));
    }
  }
  return Ae("button", t, {
    state: p,
    ref: [n, d],
    props: [{
      onClick: m
    }, f, g]
  });
});
let dn = 0;
function Ko(e, t = "mui") {
  const [n, r] = u.useState(e);
  const o = e || n;
  u.useEffect(() => {
    if (n == null) {
      dn += 1;
      r(`${t}-${dn}`);
    }
  }, [n, t]);
  return o;
}
const pn = $t.useId;
function mt(e, t) {
  if (pn !== undefined) {
    const n = pn();
    return e ?? (t ? `${t}-${n}` : n);
  }
  return Ko(e, t);
}
function Jn(e) {
  return mt(e, "base-ui");
}
const $o = u.forwardRef(function (t, n) {
  const {
    render: r,
    className: o,
    style: s,
    id: i,
    ...a
  } = t;
  const {
    store: f
  } = we();
  const c = Jn(i);
  f.useSyncedValueWithCleanup("descriptionElementId", c);
  return Ae("p", t, {
    ref: n,
    props: [{
      id: c
    }, a]
  });
});
const Go = [];
function Qn(e) {
  u.useEffect(e, Go);
}
const He = 0;
class Pe {
  static create() {
    return new Pe();
  }
  currentId = He;
  start(t, n) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = He;
      n();
    }, t);
  }
  isStarted() {
    return this.currentId !== He;
  }
  clear = () => {
    if (this.currentId !== He) {
      clearTimeout(this.currentId);
      this.currentId = He;
    }
  };
  disposeEffect = () => this.clear;
}
function ft() {
  const e = ke(Pe.create).current;
  Qn(e.disposeEffect);
  return e;
}
function qo() {
  if (typeof navigator === "undefined") {
    return {
      userAgent: "",
      platform: "",
      maxTouchPoints: 0
    };
  } else {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform ?? "",
      maxTouchPoints: navigator.maxTouchPoints ?? 0
    };
  }
}
const {
  userAgent: Xo,
  platform: zo,
  maxTouchPoints: Zo
} = qo();
const bt = Xo.toLowerCase();
const Xe = zo.toLowerCase();
const Gt = /^i(os$|p)/.test(Xe) || Xe === "macintel" && Zo > 1;
const gn = "android";
const Mt = Xe === gn || bt.includes(gn);
const Jo = !Gt && Xe.startsWith("mac");
Xe.startsWith("win");
const Qo = Jo || Gt;
const Be = typeof CSS !== "undefined" && !!CSS.supports?.("-webkit-backdrop-filter:none");
if (!Be) {
  bt.includes("firefox");
}
if (!Be) {
  bt.includes("chrom");
}
const es = Qo;
const ts = /jsdom|happydom/.test(bt);
function ns(e) {
  e.preventDefault();
  e.stopPropagation();
}
function rs(e) {
  return "nativeEvent" in e;
}
function os(e) {
  if (e.pointerType === "" && e.isTrusted) {
    return true;
  } else if (Mt && e.pointerType) {
    return e.type === "click" && e.buttons === 1;
  } else {
    return e.detail === 0 && !e.pointerType;
  }
}
function ss(e) {
  if (ts) {
    return false;
  } else {
    return !Mt && e.width === 0 && e.height === 0 || Mt && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
  }
}
function Sc(e, t) {
  const n = ["mouse", "pen"];
  if (!t) {
    n.push("", undefined);
  }
  return n.includes(e);
}
function is(e) {
  const t = e.type;
  return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
const Dt = "data-base-ui-focusable";
const er = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
const Rc = "ArrowLeft";
const xc = "ArrowRight";
const vc = "ArrowUp";
const wc = "ArrowDown";
function ye(e) {
  let t = e.activeElement;
  while (t?.shadowRoot?.activeElement != null) {
    t = t.shadowRoot.activeElement;
  }
  return t;
}
function L(e, t) {
  if (!e || !t) {
    return false;
  }
  const n = t.getRootNode?.();
  if (e.contains(t)) {
    return true;
  }
  if (n && _e(n)) {
    let r = t;
    while (r) {
      if (e === r) {
        return true;
      }
      r = r.parentNode || r.host;
    }
  }
  return false;
}
function ve(e) {
  if ("composedPath" in e) {
    return e.composedPath()[0];
  } else {
    return e.target;
  }
}
function Tc(e, t) {
  if (!Se(e)) {
    return false;
  }
  const n = e;
  if (t.hasElement(n)) {
    return !n.hasAttribute("data-trigger-disabled");
  }
  for (const [, r] of t.entries()) {
    if (L(r, n)) {
      return !r.hasAttribute("data-trigger-disabled");
    }
  }
  return false;
}
function xt(e, t) {
  if (t == null) {
    return false;
  }
  if ("composedPath" in e) {
    return e.composedPath().includes(t);
  }
  const n = e;
  return n.target != null && t.contains(n.target);
}
function cs(e) {
  return e.matches("html,body");
}
function tr(e) {
  return Z(e) && e.matches(er);
}
function Cc(e) {
  return e?.closest(`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${er}`) != null;
}
function hn(e) {
  if (e) {
    return e.getAttribute("role") === "combobox" && tr(e);
  } else {
    return false;
  }
}
function mn(e) {
  if (e) {
    if (e.hasAttribute(Dt)) {
      return e;
    } else {
      return e.querySelector(`[${Dt}]`) || e;
    }
  } else {
    return null;
  }
}
function W(e, t, n, r) {
  e.addEventListener(t, n, r);
  return () => {
    e.removeEventListener(t, n, r);
  };
}
function Le(...e) {
  return () => {
    for (let t = 0; t < e.length; t += 1) {
      const n = e[t];
      if (n) {
        n();
      }
    }
  };
}
function nt(e) {
  const t = ke(as, e).current;
  t.next = e;
  U(t.effect);
  return t;
}
function as(e) {
  const t = {
    current: e,
    next: e,
    effect: () => {
      t.current = t.next;
    }
  };
  return t;
}
const rt = null;
class us {
  callbacks = [];
  callbacksCount = 0;
  nextId = 1;
  startId = 1;
  isScheduled = false;
  tick = t => {
    this.isScheduled = false;
    const n = this.callbacks;
    const r = this.callbacksCount;
    this.callbacks = [];
    this.callbacksCount = 0;
    this.startId = this.nextId;
    if (r > 0) {
      for (let o = 0; o < n.length; o += 1) {
        n[o]?.(t);
      }
    }
  };
  request(t) {
    const n = this.nextId;
    this.nextId += 1;
    this.callbacks.push(t);
    this.callbacksCount += 1;
    if (!this.isScheduled) {
      requestAnimationFrame(this.tick);
      this.isScheduled = true;
    }
    return n;
  }
  cancel(t) {
    const n = t - this.startId;
    if (!(n < 0) && !(n >= this.callbacks.length)) {
      this.callbacks[n] = null;
      this.callbacksCount -= 1;
    }
  }
}
const ot = new us();
class de {
  static create() {
    return new de();
  }
  static request(t) {
    return ot.request(t);
  }
  static cancel(t) {
    return ot.cancel(t);
  }
  currentId = rt;
  request(t) {
    this.cancel();
    this.currentId = ot.request(() => {
      this.currentId = rt;
      t();
    });
  }
  cancel = () => {
    if (this.currentId !== rt) {
      ot.cancel(this.currentId);
      this.currentId = rt;
    }
  };
  disposeEffect = () => this.cancel;
}
function nr() {
  const e = ke(de.create).current;
  Qn(e.disposeEffect);
  return e;
}
function X(e) {
  return e?.ownerDocument || document;
}
const rr = {
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1
};
const ls = {
  ...rr,
  position: "fixed",
  top: 0,
  left: 0
};
const Oc = {
  ...rr,
  position: "absolute"
};
const _Component = u.forwardRef(function (t, n) {
  const [r, o] = u.useState();
  U(() => {
    if (es && Be) {
      o("button");
    }
  }, []);
  const s = {
    tabIndex: 0,
    role: r
  };
  return <span {...t} ref={n} style={ls} aria-hidden={r ? undefined : true} {...s} data-base-ui-focus-guard="" />;
});
function Ic(e, t) {
  return t < 0 || t >= e.length;
}
function Pc(e, t) {
  return or(e.current, {
    disabledIndices: t
  });
}
function kc(e, t) {
  return or(e.current, {
    decrement: true,
    startingIndex: e.current.length,
    disabledIndices: t
  });
}
function or(e, {
  startingIndex: t = -1,
  decrement: n = false,
  disabledIndices: r,
  amount: o = 1
} = {}) {
  let s = t;
  do {
    s += n ? -o : o;
  } while (s >= 0 && s <= e.length - 1 && fs(e, s, r));
  return s;
}
function fs(e, t, n) {
  if (typeof n == "function" ? n(t) : n?.includes(t) ?? false) {
    return true;
  }
  const o = e[t];
  if (o) {
    if (qt(o)) {
      return !n && (o.hasAttribute("disabled") || o.getAttribute("aria-disabled") === "true");
    } else {
      return true;
    }
  } else {
    return false;
  }
}
function ds(e) {
  return e.visibility === "hidden" || e.visibility === "collapse";
}
function qt(e, t = e ? Je(e) : null) {
  if (!e || !e.isConnected || !t || ds(t)) {
    return false;
  } else if (typeof e.checkVisibility == "function") {
    return e.checkVisibility();
  } else {
    return t.display !== "none" && t.display !== "contents";
  }
}
const ps = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
function gs(e) {
  const t = e.assignedSlot;
  if (t) {
    return t;
  }
  if (e.parentElement) {
    return e.parentElement;
  }
  const n = e.getRootNode();
  if (_e(n)) {
    return n.host;
  } else {
    return null;
  }
}
function Ft(e) {
  for (const t of Array.from(e.children)) {
    if (re(t) === "summary") {
      return t;
    }
  }
  return null;
}
function hs(e, t) {
  const n = Ft(t);
  return !!n && (e === n || L(n, e));
}
function sr(e) {
  const t = e ? re(e) : "";
  return e != null && e.matches(ps) && (t !== "summary" || e.parentElement != null && re(e.parentElement) === "details" && Ft(e.parentElement) === e) && (t !== "details" || Ft(e) == null) && (t !== "input" || e.type !== "hidden");
}
function ir(e) {
  if (!sr(e) || !e.isConnected || e.matches(":disabled")) {
    return false;
  }
  for (let t = e; t; t = gs(t)) {
    const n = t !== e;
    const r = re(t) === "slot";
    if (t.hasAttribute("inert") || n && re(t) === "details" && !t.open && !hs(e, t) || t.hasAttribute("hidden") || !r && !ms(t, n)) {
      return false;
    }
  }
  return true;
}
function ms(e, t) {
  const n = Je(e);
  if (t) {
    return n.display !== "none";
  } else {
    return qt(e, n);
  }
}
function cr(e) {
  const t = e.tabIndex;
  if (t < 0) {
    const n = re(e);
    if (n === "details" || n === "audio" || n === "video" || Z(e) && e.isContentEditable) {
      return 0;
    }
  }
  return t;
}
function vt(e) {
  if (re(e) !== "input") {
    return null;
  }
  const t = e;
  if (t.type === "radio" && t.name !== "") {
    return t;
  } else {
    return null;
  }
}
function bs(e, t) {
  const n = vt(e);
  if (!n) {
    return true;
  }
  const r = t.find(o => {
    const s = vt(o);
    return s?.name === n.name && s.form === n.form && s.checked;
  });
  if (r) {
    return r === n;
  } else {
    return t.find(o => {
      const s = vt(o);
      return s?.name === n.name && s.form === n.form;
    }) === n;
  }
}
function ar(e) {
  if (Z(e) && re(e) === "slot") {
    const t = e.assignedElements({
      flatten: true
    });
    if (t.length > 0) {
      return t;
    }
  }
  if (Z(e) && e.shadowRoot) {
    return Array.from(e.shadowRoot.children);
  } else {
    return Array.from(e.children);
  }
}
function ur(e, t) {
  ar(e).forEach(n => {
    if (sr(n)) {
      t.push(n);
    }
    ur(n, t);
  });
}
function lr(e, t, n) {
  ar(e).forEach(r => {
    if (Z(r) && r.matches(t)) {
      n.push(r);
    }
    lr(r, t, n);
  });
}
function Xt(e) {
  return ir(e) && cr(e) >= 0;
}
function fr(e) {
  const t = [];
  ur(e, t);
  return t.filter(ir);
}
function et(e) {
  const t = fr(e);
  return t.filter(n => cr(n) >= 0 && bs(n, t));
}
function dr(e, t) {
  const n = et(e);
  const r = n.length;
  if (r === 0) {
    return;
  }
  const o = ye(X(e));
  const s = n.indexOf(o);
  const i = s === -1 ? t === 1 ? 0 : r - 1 : s + t;
  return n[i];
}
function pr(e) {
  return dr(X(e).body, 1) || e;
}
function gr(e) {
  return dr(X(e).body, -1) || e;
}
function hr(e, t) {
  if (!e) {
    return null;
  }
  const n = et(X(e).body);
  const r = n.length;
  if (r === 0) {
    return null;
  }
  const o = n.indexOf(e);
  if (o === -1) {
    return null;
  }
  const s = (o + t + r) % r;
  return n[s];
}
function Ac(e) {
  return hr(e, 1);
}
function Nc(e) {
  return hr(e, -1);
}
function $e(e, t) {
  const n = t || e.currentTarget;
  const r = e.relatedTarget;
  return !r || !L(n, r);
}
function ys(e) {
  et(e).forEach(n => {
    n.dataset.tabindex = n.getAttribute("tabindex") || "";
    n.setAttribute("tabindex", "-1");
  });
}
function bn(e) {
  const t = [];
  lr(e, "[data-tabindex]", t);
  t.forEach(n => {
    const r = n.dataset.tabindex;
    delete n.dataset.tabindex;
    if (r) {
      n.setAttribute("tabindex", r);
    } else {
      n.removeAttribute("tabindex");
    }
  });
}
function ze(e, t, n = true) {
  return e.filter(o => o.parentId === t).flatMap(o => [...(!n || o.context?.open ? [o] : []), ...ze(e, o.id, n)]);
}
function yn(e, t) {
  let n = [];
  let r = e.find(o => o.id === t)?.parentId;
  while (r) {
    const o = e.find(s => s.id === r);
    r = o?.parentId;
    if (o) {
      n = n.concat(o);
    }
  }
  return n;
}
function pt(e) {
  return `data-base-ui-${e}`;
}
let st = 0;
function wt(e, t = {}) {
  const {
    preventScroll: n = false,
    sync: r = false,
    shouldFocus: o
  } = t;
  cancelAnimationFrame(st);
  function s() {
    if (!o || !!o()) {
      e?.focus({
        preventScroll: n
      });
    }
  }
  if (r) {
    s();
    return jt;
  }
  const i = requestAnimationFrame(s);
  st = i;
  return () => {
    if (st === i) {
      cancelAnimationFrame(i);
      st = 0;
    }
  };
}
const Tt = {
  inert: new WeakMap(),
  "aria-hidden": new WeakMap()
};
const En = "data-base-ui-inert";
const Lt = {
  inert: new WeakSet(),
  "aria-hidden": new WeakSet()
};
let Ve = new WeakMap();
let Ct = 0;
function Es(e) {
  return Lt[e];
}
function mr(e) {
  if (e) {
    if (_e(e)) {
      return e.host;
    } else {
      return mr(e.parentNode);
    }
  } else {
    return null;
  }
}
const Sn = (e, t) => t.map(n => {
  if (e.contains(n)) {
    return n;
  }
  const r = mr(n);
  if (e.contains(r)) {
    return r;
  } else {
    return null;
  }
}).filter(n => n != null);
const Rn = e => {
  const t = new Set();
  e.forEach(n => {
    let r = n;
    while (r && !t.has(r)) {
      t.add(r);
      r = r.parentNode;
    }
  });
  return t;
};
const xn = (e, t, n) => {
  const r = [];
  const o = s => {
    if (!!s && !n.has(s)) {
      Array.from(s.children).forEach(i => {
        if (re(i) !== "script") {
          if (t.has(i)) {
            o(i);
          } else {
            r.push(i);
          }
        }
      });
    }
  };
  o(e);
  return r;
};
function Ss(e, t, n, r, {
  mark: o = true
}) {
  let s = null;
  if (r) {
    s = "inert";
  } else if (n) {
    s = "aria-hidden";
  }
  let i = null;
  let a = null;
  const f = Sn(t, e);
  const c = o ? xn(t, Rn(f), new Set(f)) : [];
  const l = [];
  const g = [];
  if (s) {
    const d = Tt[s];
    const p = Es(s);
    a = p;
    i = d;
    const m = Sn(t, Array.from(t.querySelectorAll("[aria-live]")));
    const S = f.concat(m);
    xn(t, Rn(S), new Set(S)).forEach(R => {
      const b = R.getAttribute(s);
      const H = b !== null && b !== "false";
      const h = (d.get(R) || 0) + 1;
      d.set(R, h);
      l.push(R);
      if (h === 1 && H) {
        p.add(R);
      }
      if (!H) {
        R.setAttribute(s, s === "inert" ? "" : "true");
      }
    });
  }
  if (o) {
    c.forEach(d => {
      const p = (Ve.get(d) || 0) + 1;
      Ve.set(d, p);
      g.push(d);
      if (p === 1) {
        d.setAttribute(En, "");
      }
    });
  }
  Ct += 1;
  return () => {
    if (i) {
      l.forEach(d => {
        const m = (i.get(d) || 0) - 1;
        i.set(d, m);
        if (!m) {
          if (!a?.has(d) && s) {
            d.removeAttribute(s);
          }
          a?.delete(d);
        }
      });
    }
    if (o) {
      g.forEach(d => {
        const p = (Ve.get(d) || 0) - 1;
        Ve.set(d, p);
        if (!p) {
          d.removeAttribute(En);
        }
      });
    }
    Ct -= 1;
    if (!Ct) {
      Tt.inert = new WeakMap();
      Tt["aria-hidden"] = new WeakMap();
      Lt.inert = new WeakSet();
      Lt["aria-hidden"] = new WeakSet();
      Ve = new WeakMap();
    }
  };
}
function vn(e, t = {}) {
  const {
    ariaHidden: n = false,
    inert: r = false,
    mark: o = true
  } = t;
  const s = X(e[0]).body;
  return Ss(e, s, n, r, {
    mark: o
  });
}
const Mc = 500;
const Dc = {
  style: {
    transition: "none"
  }
};
const Rs = "data-base-ui-click-trigger";
const xs = "data-base-ui-swipe-ignore";
const Fc = `[${xs}]`;
const Lc = {
  fallbackAxisSide: "none"
};
const _c = {
  fallbackAxisSide: "end"
};
const vs = {
  clipPath: "inset(50%)",
  position: "fixed",
  top: 0,
  left: 0
};
const br = u.createContext(null);
const yr = () => u.useContext(br);
const ws = pt("portal");
function Ts(e = {}) {
  const {
    ref: t,
    container: n,
    componentProps: r = J,
    elementProps: o
  } = e;
  const s = mt();
  const a = yr()?.portalNode;
  const [f, c] = u.useState(null);
  const [l, g] = u.useState(null);
  const d = q(E => {
    if (E !== null) {
      g(E);
    }
  });
  const p = u.useRef(null);
  U(() => {
    if (n === null) {
      if (p.current) {
        p.current = null;
        g(null);
        c(null);
      }
      return;
    }
    if (s == null) {
      return;
    }
    const E = (n && (Bt(n) ? n : n.current)) ?? a ?? document.body;
    if (E == null) {
      if (p.current) {
        p.current = null;
        g(null);
        c(null);
      }
      return;
    }
    if (p.current !== E) {
      p.current = E;
      g(null);
      c(E);
    }
  }, [n, a, s]);
  const m = Ae("div", r, {
    ref: [t, d],
    props: [{
      id: s,
      [ws]: ""
    }, o]
  });
  return {
    portalNode: l,
    portalSubtree: f && m ? ht.createPortal(m, f) : null
  };
}
const Cs = u.forwardRef(function (t, n) {
  const {
    render: r,
    className: o,
    style: s,
    children: i,
    container: a,
    renderGuards: f,
    ...c
  } = t;
  const {
    portalNode: l,
    portalSubtree: g
  } = Ts({
    container: a,
    ref: n,
    componentProps: t,
    elementProps: c
  });
  const d = u.useRef(null);
  const p = u.useRef(null);
  const m = u.useRef(null);
  const S = u.useRef(null);
  const [E, R] = u.useState(null);
  const b = u.useRef(false);
  const H = E?.modal;
  const h = E?.open;
  const T = typeof f == "boolean" ? f : !!E && !E.modal && E.open && !!l;
  u.useEffect(() => {
    if (!l || H) {
      return;
    }
    function I(_) {
      if (l && _.relatedTarget && $e(_)) {
        if (_.type === "focusin") {
          if (b.current) {
            bn(l);
            b.current = false;
          }
        } else {
          ys(l);
          b.current = true;
        }
      }
    }
    return Le(W(l, "focusin", I, true), W(l, "focusout", I, true));
  }, [l, H]);
  U(() => {
    if (!!l && h === true && !!b.current) {
      bn(l);
      b.current = false;
    }
  }, [h, l]);
  const N = u.useMemo(() => ({
    beforeOutsideRef: d,
    afterOutsideRef: p,
    beforeInsideRef: m,
    afterInsideRef: S,
    portalNode: l,
    setFocusManagerState: R
  }), [l]);
  return <u.Fragment>{g}<br.Provider value={N}>{T && l && <_Component data-type="outside" ref={d} onFocus={I => {
        if ($e(I, l)) {
          m.current?.focus();
        } else {
          const _ = E ? E.domReference : null;
          gr(_)?.focus();
        }
      }} />}{T && l && <span aria-owns={l.id} style={vs} />}{l && ht.createPortal(i, l)}{T && l && <_Component data-type="outside" ref={p} onFocus={I => {
        if ($e(I, l)) {
          S.current?.focus();
        } else {
          const _ = E ? E.domReference : null;
          pr(_)?.focus();
          if (E?.closeOnFocusOut) {
            E?.onOpenChange(false, xe(Zn, I.nativeEvent));
          }
        }
      }} />}</br.Provider></u.Fragment>;
});
function Er() {
  const e = new Map();
  return {
    emit(t, n) {
      e.get(t)?.forEach(r => r(n));
    },
    on(t, n) {
      if (!e.has(t)) {
        e.set(t, new Set());
      }
      e.get(t).add(n);
    },
    off(t, n) {
      e.get(t)?.delete(n);
    }
  };
}
class Os {
  nodesRef = {
    current: []
  };
  events = Er();
  addNode(t) {
    this.nodesRef.current.push(t);
  }
  removeNode(t) {
    const n = this.nodesRef.current.findIndex(r => r === t);
    if (n !== -1) {
      this.nodesRef.current.splice(n, 1);
    }
  }
}
const Sr = u.createContext(null);
const Rr = u.createContext(null);
const zt = () => u.useContext(Sr)?.id || null;
const Zt = e => {
  const t = u.useContext(Rr);
  return e ?? t;
};
function Bc(e) {
  const t = mt();
  const n = Zt(e);
  const r = zt();
  U(() => {
    if (!t) {
      return;
    }
    const o = {
      id: t,
      parentId: r
    };
    n?.addNode(o);
    return () => {
      n?.removeNode(o);
    };
  }, [n, t, r]);
  return t;
}
function Wc(e) {
  const {
    children: t,
    id: n
  } = e;
  const r = zt();
  return <Sr.Provider value={u.useMemo(() => ({
    id: n,
    parentId: r
  }), [n, r])}>{t}</Sr.Provider>;
}
function jc(e) {
  const {
    children: t,
    externalTree: n
  } = e;
  const r = ke(() => n ?? new Os()).current;
  return <Rr.Provider value={r}>{t}</Rr.Provider>;
}
function Ee(e) {
  if (e == null) {
    return e;
  } else if ("current" in e) {
    return e.current;
  } else {
    return e;
  }
}
function Is(e, t) {
  const n = pe(ve(e));
  if (e instanceof n.KeyboardEvent) {
    return "keyboard";
  } else if (e instanceof n.FocusEvent) {
    return t || "keyboard";
  } else if ("pointerType" in e) {
    return e.pointerType || "keyboard";
  } else if ("touches" in e) {
    return "touch";
  } else if (e instanceof n.MouseEvent) {
    return t || (e.detail === 0 ? "keyboard" : "mouse");
  } else {
    return "";
  }
}
const wn = 20;
let Re = [];
function Jt() {
  Re = Re.filter(e => e.deref()?.isConnected);
}
function Tn(e) {
  Jt();
  if (e && re(e) !== "body") {
    Re.push(new WeakRef(e));
    if (Re.length > wn) {
      Re = Re.slice(-wn);
    }
  }
}
function Cn() {
  Jt();
  return Re[Re.length - 1]?.deref();
}
function Ps(e) {
  if (e) {
    if (Xt(e)) {
      return e;
    } else {
      return et(e)[0] || e;
    }
  } else {
    return null;
  }
}
function On(e) {
  if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !e.getAttribute("role")?.includes("dialog")) {
    return;
  }
  const n = fr(e).filter(o => {
    const s = o.getAttribute("data-tabindex") || "";
    return Xt(o) || o.hasAttribute("data-tabindex") && !s.startsWith("-");
  });
  const r = e.getAttribute("tabindex");
  if (n.length === 0) {
    if (r !== "0") {
      e.setAttribute("tabindex", "0");
      e.setAttribute("data-tabindex", "0");
    }
  } else if (r !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") {
    e.setAttribute("tabindex", "-1");
    e.setAttribute("data-tabindex", "-1");
  }
}
function _Component2(e) {
  const {
    context: t,
    children: n,
    disabled: r = false,
    initialFocus: o = true,
    returnFocus: s = true,
    restoreFocus: i = false,
    modal: a = true,
    closeOnFocusOut: f = true,
    openInteractionType: c = "",
    nextFocusableElement: l,
    previousFocusableElement: g,
    beforeContentFocusGuardRef: d,
    externalTree: p,
    getInsideElements: m
  } = e;
  const S = "rootStore" in t ? t.rootStore : t;
  const E = S.useState("open");
  const R = S.useState("domReferenceElement");
  const b = S.useState("floatingElement");
  const {
    events: H,
    dataRef: h
  } = S.context;
  const T = q(() => h.current.floatingContext?.nodeId);
  const N = o === false;
  const I = hn(R) && N;
  const _ = nt(o);
  const M = nt(s);
  const G = nt(c);
  const te = nt(E);
  const V = Zt(p);
  const k = yr();
  const K = u.useRef(false);
  const ge = u.useRef(false);
  const ae = u.useRef(false);
  const ue = u.useRef(null);
  const Ne = u.useRef("");
  const Te = u.useRef("");
  const Ce = u.useRef(null);
  const Me = u.useRef(null);
  const D = at(Ce, d, k?.beforeInsideRef);
  const oe = at(Me, k?.afterInsideRef);
  const he = ft();
  const me = ft();
  const We = nr();
  const tt = k != null;
  const O = mn(b);
  const le = q((P = O) => P ? et(P) : []);
  const ie = q(() => m?.().filter(P => P != null) ?? []);
  u.useEffect(() => {
    if (r || !a) {
      return;
    }
    function P(z) {
      if (z.key === "Tab" && L(O, ye(X(O))) && le().length === 0 && !I) {
        ns(z);
      }
    }
    const Y = X(O);
    return W(Y, "keydown", P);
  }, [r, O, a, I, le]);
  u.useEffect(() => {
    if (r || !E) {
      return;
    }
    const P = X(O);
    function Y() {
      ae.current = false;
    }
    function z(se) {
      const v = ve(se);
      const B = ie();
      const C = L(b, v) || L(R, v) || L(k?.portalNode, v) || B.some($ => $ === v || L($, v));
      ae.current = !C;
      Te.current = se.pointerType || "keyboard";
      if (v?.closest(`[${Rs}]`)) {
        ge.current = true;
        me.start(0, () => {
          ge.current = false;
        });
      }
    }
    function Q() {
      Te.current = "keyboard";
    }
    return Le(W(P, "pointerdown", z, true), W(P, "pointerup", Y, true), W(P, "pointercancel", Y, true), W(P, "keydown", Q, true), Y);
  }, [r, b, R, O, E, k, me, ie]);
  u.useEffect(() => {
    if (r || !f) {
      return;
    }
    const P = X(O);
    function Y() {
      ge.current = true;
      me.start(0, () => {
        ge.current = false;
      });
    }
    function z(B) {
      const C = ve(B);
      if (Xt(C)) {
        ue.current = C;
      }
    }
    function Q(B) {
      const C = B.relatedTarget;
      const $ = B.currentTarget;
      const ee = ve(B);
      if (a && C == null && ee != null && L(b, ee)) {
        Tn(ee);
      }
      queueMicrotask(() => {
        const j = T();
        const De = S.context.triggerElements;
        const y = ie();
        const x = C?.hasAttribute(pt("focus-guard")) && [Ce.current, Me.current, k?.beforeInsideRef.current, k?.afterInsideRef.current, k?.beforeOutsideRef.current, k?.afterOutsideRef.current, Ee(g), Ee(l)].includes(C);
        const ne = !L(R, C) && !L(b, C) && !L(C, b) && !L(k?.portalNode, C) && !y.some(F => F === C || L(F, C)) && (C == null || !De.hasElement(C)) && !De.hasMatchingElement(F => L(F, C)) && !x && (!V || !ze(V.nodesRef.current, j).find(F => L(F.context?.elements.floating, C) || L(F.context?.elements.domReference, C)) && !yn(V.nodesRef.current, j).find(F => [F.context?.elements.floating, mn(F.context?.elements.floating)].includes(C) || F.context?.elements.domReference === C));
        if ($ === R && O) {
          On(O);
        }
        if (i && $ !== R && !qt(ee) && ye(P) === P.body) {
          if (Z(O) && (O.focus(), i === "popup")) {
            We.request(() => {
              O.focus();
            });
            return;
          }
          const F = le();
          const be = ue.current;
          const je = (be && F.includes(be) ? be : null) || F[F.length - 1] || O;
          if (Z(je)) {
            je.focus();
          }
        }
        if (h.current.insideReactTree) {
          h.current.insideReactTree = false;
          return;
        }
        if ((I || !a) && C && ne && !ge.current && (I || C !== Cn())) {
          K.current = true;
          S.setOpen(false, xe(Zn, B));
        }
      });
    }
    function se() {
      if (!ae.current) {
        h.current.insideReactTree = true;
        he.start(0, () => {
          h.current.insideReactTree = false;
        });
      }
    }
    const v = Z(R) ? R : null;
    if (!!b || !!v) {
      return Le(v && W(v, "focusout", Q), v && W(v, "pointerdown", Y), b && W(b, "focusin", z), b && W(b, "focusout", Q), b && k && W(b, "focusout", se, true));
    }
  }, [r, R, b, O, a, V, k, S, f, i, le, I, T, h, he, me, We, l, g, ie]);
  u.useEffect(() => {
    if (r || !b || !E) {
      return;
    }
    const P = Array.from(k?.portalNode?.querySelectorAll(`[${pt("portal")}]`) || []);
    const z = (V ? yn(V.nodesRef.current, T()) : []).find($ => hn($.context?.elements.domReference || null))?.context?.elements.domReference;
    const se = [...[b, ...P, Ce.current, Me.current, k?.beforeOutsideRef.current, k?.afterOutsideRef.current, ...ie()], z, Ee(g), Ee(l), I ? R : null].filter($ => $ != null);
    const v = vn(se, {
      ariaHidden: a || I,
      mark: false
    });
    const B = [b, ...P].filter($ => $ != null);
    const C = vn(B);
    return () => {
      C();
      v();
    };
  }, [E, r, R, b, a, k, I, V, T, l, g, ie]);
  U(() => {
    if (!E || r || !Z(O)) {
      return;
    }
    const P = X(O);
    const Y = ye(P);
    queueMicrotask(() => {
      const z = _.current;
      const Q = typeof z == "function" ? z(G.current || "") : z;
      if (Q === undefined || Q === false || L(O, Y)) {
        return;
      }
      let v = null;
      const B = () => {
        if (v == null) {
          v = le(O);
        }
        return v[0] || O;
      };
      let C;
      if (Q === true || Q === null) {
        C = B();
      } else {
        C = Ee(Q);
      }
      C = C || B();
      const $ = L(O, ye(P));
      wt(C, {
        preventScroll: C === O,
        shouldFocus() {
          if (!te.current) {
            return false;
          }
          if ($) {
            return true;
          }
          const ee = ye(P);
          return ee === C || !L(O, ee);
        }
      });
    });
  }, [r, E, O, le, _, G, te]);
  U(() => {
    if (r || !O) {
      return;
    }
    const P = X(O);
    const Y = ye(P);
    const z = G.current == null;
    Tn(Y);
    function Q(v) {
      if (!v.open) {
        Ne.current = Is(v.nativeEvent, Te.current);
      }
      if (v.reason === Uo && v.nativeEvent.type === "mouseleave") {
        K.current = true;
      }
      if (v.reason === zn) {
        if (v.nested) {
          K.current = false;
        } else if (os(v.nativeEvent) || ss(v.nativeEvent)) {
          K.current = false;
        } else {
          let B = false;
          X(O).createElement("div").focus({
            get preventScroll() {
              B = true;
              return false;
            }
          });
          if (B) {
            K.current = false;
          } else {
            K.current = true;
          }
        }
      }
    }
    H.on("openchange", Q);
    function se() {
      const v = M.current;
      let B = typeof v == "function" ? v(Ne.current) : v;
      if (B === undefined || B === false) {
        return null;
      }
      if (B === null) {
        B = true;
      }
      const C = R?.isConnected ? R : null;
      const $ = Y?.isConnected && re(Y) !== "body" ? Y : null;
      let ee = z ? $ || C : C || $;
      ee ||= Cn() || null;
      if (typeof B == "boolean") {
        return ee;
      } else {
        return Ee(B) || ee || null;
      }
    }
    return () => {
      H.off("openchange", Q);
      const v = ye(P);
      const B = ie();
      const C = L(b, v) || B.some(j => j === v || L(j, v)) || V && ze(V.nodesRef.current, T(), false).some(j => L(j.context?.elements.floating, v));
      const $ = M.current;
      const ee = se();
      queueMicrotask(() => {
        const j = Ps(ee);
        const De = typeof $ != "boolean";
        if ($ && !K.current && Z(j) && (!!De || j === v || v === P.body || C)) {
          j.focus({
            preventScroll: true
          });
        }
        K.current = false;
      });
    };
  }, [r, b, O, M, G, H, V, R, T, ie]);
  U(() => {
    if (!Be || E || !b) {
      return;
    }
    const P = ye(X(b));
    if (!!Z(P) && !!tr(P)) {
      if (L(b, P)) {
        P.blur();
      }
    }
  }, [E, b]);
  U(() => {
    if (!r && !!k) {
      k.setFocusManagerState({
        modal: a,
        closeOnFocusOut: f,
        open: E,
        onOpenChange: S.setOpen,
        domReference: R
      });
      return () => {
        k.setFocusManagerState(null);
      };
    }
  }, [r, k, a, E, S, f, R]);
  U(() => {
    if (!r && !!O) {
      On(O);
      return () => {
        queueMicrotask(Jt);
      };
    }
  }, [r, O]);
  const Oe = !r && (a ? !I : true) && (tt || a);
  return <u.Fragment>{Oe && <_Component data-type="inside" ref={D} onFocus={P => {
      if (a) {
        const Y = le();
        wt(Y[Y.length - 1]);
      } else if (k?.portalNode) {
        K.current = false;
        if ($e(P, k.portalNode)) {
          pr(R)?.focus();
        } else {
          Ee(g ?? k.beforeOutsideRef)?.focus();
        }
      }
    }} />}{n}{Oe && <_Component data-type="inside" ref={oe} onFocus={P => {
      if (a) {
        wt(le()[0]);
      } else if (k?.portalNode) {
        if (f) {
          K.current = true;
        }
        if ($e(P, k.portalNode)) {
          gr(R)?.focus();
        } else {
          Ee(l ?? k.afterOutsideRef)?.focus();
        }
      }
    }} />}</u.Fragment>;
}
function As() {
  return false;
}
function Ns(e) {
  return {
    escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? false,
    outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? true
  };
}
function Ms(e, t = {}) {
  const {
    enabled: n = true,
    escapeKey: r = true,
    outsidePress: o = true,
    outsidePressEvent: s = "sloppy",
    referencePress: i = As,
    bubbles: a,
    externalTree: f
  } = t;
  const c = "rootStore" in e ? e.rootStore : e;
  const l = c.useState("open");
  const g = c.useState("floatingElement");
  const {
    dataRef: d
  } = c.context;
  const p = Zt(f);
  const m = q(typeof o == "function" ? o : () => false);
  const S = typeof o == "function" ? m : o;
  const E = S !== false;
  const R = q(() => s);
  const {
    escapeKey: b,
    outsidePress: H
  } = Ns(a);
  const h = u.useRef(false);
  const T = u.useRef(false);
  const N = u.useRef(false);
  const I = u.useRef(false);
  const _ = u.useRef("");
  const M = u.useRef(null);
  const G = ft();
  const te = ft();
  const V = q(() => {
    te.clear();
    d.current.insideReactTree = false;
  });
  const k = q(D => {
    const oe = d.current.floatingContext?.nodeId;
    return (p ? ze(p.nodesRef.current, oe) : []).some(me => me.context?.open && !me.context.dataRef.current[D]);
  });
  const K = q(D => xt(D, c.select("floatingElement")) || xt(D, c.select("domReferenceElement")));
  const ge = q(D => {
    if (i()) {
      c.setOpen(false, xe(jo, D.nativeEvent));
    }
  });
  const ae = q(D => {
    if (!l || !n || !r || D.key !== "Escape" || I.current || !b && k("__escapeKeyBubbles")) {
      return;
    }
    const oe = rs(D) ? D.nativeEvent : D;
    const he = xe(Vo, oe);
    c.setOpen(false, he);
    if (!he.isCanceled) {
      D.preventDefault();
    }
    if (!b && !he.isPropagationAllowed) {
      D.stopPropagation();
    }
  });
  const ue = q(() => {
    d.current.insideReactTree = true;
    te.start(0, V);
  });
  const Ne = q(D => {
    if (!l || !n || D.button !== 0) {
      return;
    }
    const oe = ve(D.nativeEvent);
    if (L(c.select("floatingElement"), oe)) {
      if (!h.current) {
        h.current = true;
        T.current = false;
      }
    }
  });
  const Te = q(D => {
    if (!!l && !!n) {
      if ((D.defaultPrevented || D.nativeEvent.defaultPrevented) && h.current) {
        T.current = true;
      }
    }
  });
  u.useEffect(() => {
    if (!l || !n) {
      return;
    }
    d.current.__escapeKeyBubbles = b;
    d.current.__outsidePressBubbles = H;
    const D = new Pe();
    const oe = new Pe();
    function he() {
      D.clear();
      I.current = true;
    }
    function me() {
      D.start(Be ? 5 : 0, () => {
        I.current = false;
      });
    }
    function We() {
      N.current = true;
      oe.start(0, () => {
        N.current = false;
      });
    }
    function tt() {
      h.current = false;
      T.current = false;
    }
    function O() {
      const y = _.current;
      const x = y === "pen" || !y ? "mouse" : y;
      const ne = R();
      const F = typeof ne == "function" ? ne() : ne;
      if (typeof F == "string") {
        return F;
      } else {
        return F[x];
      }
    }
    function le(y) {
      const x = O();
      return x === "intentional" && y.type !== "click" || x === "sloppy" && y.type === "click";
    }
    function ie(y) {
      const x = d.current.floatingContext?.nodeId;
      const ne = p && ze(p.nodesRef.current, x).some(F => xt(y, F.context?.elements.floating));
      return K(y) || ne;
    }
    function Oe(y) {
      if (le(y)) {
        if (y.type !== "click" && !K(y)) {
          oe.clear();
          N.current = false;
        }
        V();
        return;
      }
      if (d.current.insideReactTree) {
        V();
        return;
      }
      const x = ve(y);
      const ne = `[${pt("inert")}]`;
      const F = Se(x) ? x.getRootNode() : null;
      const be = Array.from((_e(F) ? F : X(c.select("floatingElement"))).querySelectorAll(ne));
      const je = c.context.triggerElements;
      if (x && (je.hasElement(x) || je.hasMatchingElement(fe => L(fe, x)))) {
        return;
      }
      let Ue = Se(x) ? x : null;
      while (Ue && !Ke(Ue)) {
        const fe = ct(Ue);
        if (Ke(fe) || !Se(fe)) {
          break;
        }
        Ue = fe;
      }
      if (!be.length || !Se(x) || !!cs(x) || !!L(x, c.select("floatingElement")) || !be.every(fe => !L(Ue, fe))) {
        if (Z(x) && !("touches" in y)) {
          const fe = Ke(x);
          const yt = Je(x);
          const on = /auto|scroll/;
          const Fr = fe || on.test(yt.overflowX);
          const Lr = fe || on.test(yt.overflowY);
          const _r = Fr && x.clientWidth > 0 && x.scrollWidth > x.clientWidth;
          const Br = Lr && x.clientHeight > 0 && x.scrollHeight > x.clientHeight;
          const Wr = yt.direction === "rtl";
          const jr = Br && (Wr ? y.offsetX <= x.offsetWidth - x.clientWidth : y.offsetX > x.clientWidth);
          const Ur = _r && y.offsetY > x.clientHeight;
          if (jr || Ur) {
            return;
          }
        }
        if (!ie(y)) {
          if (O() === "intentional" && N.current) {
            oe.clear();
            N.current = false;
            return;
          }
          if ((typeof S != "function" || !!S(y)) && !k("__outsidePressBubbles")) {
            c.setOpen(false, xe(zn, y));
            V();
          }
        }
      }
    }
    function P(y) {
      if (O() === "sloppy" && y.pointerType !== "touch" && !!c.select("open") && !!n && !K(y)) {
        Oe(y);
      }
    }
    function Y(y) {
      if (O() !== "sloppy" || !c.select("open") || !n || K(y)) {
        return;
      }
      const x = y.touches[0];
      if (x) {
        M.current = {
          startTime: Date.now(),
          startX: x.clientX,
          startY: x.clientY,
          dismissOnTouchEnd: false,
          dismissOnMouseDown: true
        };
        G.start(1000, () => {
          if (M.current) {
            M.current.dismissOnTouchEnd = false;
            M.current.dismissOnMouseDown = false;
          }
        });
      }
    }
    function z(y, x) {
      const ne = ve(y);
      if (!ne) {
        return;
      }
      const F = W(ne, y.type, () => {
        x(y);
        F();
      });
    }
    function Q(y) {
      _.current = "touch";
      z(y, Y);
    }
    function se(y) {
      G.clear();
      if (y.type === "pointerdown") {
        _.current = y.pointerType;
      }
      if (y.type !== "mousedown" || !M.current || !!M.current.dismissOnMouseDown) {
        z(y, x => {
          if (x.type === "pointerdown") {
            P(x);
          } else {
            Oe(x);
          }
        });
      }
    }
    function v(y) {
      if (!h.current) {
        return;
      }
      const x = T.current;
      tt();
      if (O() === "intentional") {
        if (y.type === "pointercancel") {
          if (x) {
            We();
          }
          return;
        }
        if (!ie(y)) {
          if (x) {
            We();
            return;
          }
          if (typeof S != "function" || !!S(y)) {
            oe.clear();
            N.current = true;
            V();
          }
        }
      }
    }
    function B(y) {
      if (O() !== "sloppy" || !M.current || K(y)) {
        return;
      }
      const x = y.touches[0];
      if (!x) {
        return;
      }
      const ne = Math.abs(x.clientX - M.current.startX);
      const F = Math.abs(x.clientY - M.current.startY);
      const be = Math.sqrt(ne * ne + F * F);
      if (be > 5) {
        M.current.dismissOnTouchEnd = true;
      }
      if (be > 10) {
        Oe(y);
        G.clear();
        M.current = null;
      }
    }
    function C(y) {
      z(y, B);
    }
    function $(y) {
      if (O() === "sloppy" && !!M.current && !K(y)) {
        if (M.current.dismissOnTouchEnd) {
          Oe(y);
        }
        G.clear();
        M.current = null;
      }
    }
    function ee(y) {
      z(y, $);
    }
    const j = X(g);
    const De = Le(r && Le(W(j, "keydown", ae), W(j, "compositionstart", he), W(j, "compositionend", me)), E && Le(W(j, "click", se, true), W(j, "pointerdown", se, true), W(j, "pointerup", v, true), W(j, "pointercancel", v, true), W(j, "mousedown", se, true), W(j, "mouseup", v, true), W(j, "touchstart", Q, true), W(j, "touchmove", C, true), W(j, "touchend", ee, true)));
    return () => {
      De();
      D.clear();
      oe.clear();
      tt();
      N.current = false;
    };
  }, [d, g, r, E, S, l, n, b, H, ae, V, R, k, K, p, c, G]);
  u.useEffect(V, [S, V]);
  const Ce = u.useMemo(() => ({
    onKeyDown: ae,
    onPointerDown: ge,
    onClick: ge
  }), [ae, ge]);
  const Me = u.useMemo(() => ({
    onKeyDown: ae,
    onPointerDown: Te,
    onMouseDown: Te,
    onClickCapture: ue,
    onMouseDownCapture(D) {
      ue();
      Ne(D);
    },
    onPointerDownCapture(D) {
      ue();
      Ne(D);
    },
    onMouseUpCapture: ue,
    onTouchEndCapture: ue,
    onTouchMoveCapture: ue
  }), [ae, ue, Ne, Te]);
  return u.useMemo(() => n ? {
    reference: Ce,
    floating: Me,
    trigger: Ce
  } : {}, [n, Ce, Me]);
}
function xr(e) {
  const t = u.useRef(true);
  if (t.current) {
    t.current = false;
    e();
  }
}
const A = (e, t, n, r, o, s, ...i) => {
  if (i.length > 0) {
    throw new Error(Qe(1));
  }
  let a;
  if (e) {
    a = e;
  } else {
    throw new Error("Missing arguments");
  }
  return a;
};
var Ot = {
  exports: {}
};
var It = {};
var In;
function Ds() {
  if (In) {
    return It;
  }
  In = 1;
  var e = Bn();
  function t(g, d) {
    return g === d && (g !== 0 || 1 / g === 1 / d) || g !== g && d !== d;
  }
  var n = typeof Object.is == "function" ? Object.is : t;
  var r = e.useState;
  var o = e.useEffect;
  var s = e.useLayoutEffect;
  var i = e.useDebugValue;
  function a(g, d) {
    var p = d();
    var m = r({
      inst: {
        value: p,
        getSnapshot: d
      }
    });
    var S = m[0].inst;
    var E = m[1];
    s(function () {
      S.value = p;
      S.getSnapshot = d;
      if (f(S)) {
        E({
          inst: S
        });
      }
    }, [g, p, d]);
    o(function () {
      if (f(S)) {
        E({
          inst: S
        });
      }
      return g(function () {
        if (f(S)) {
          E({
            inst: S
          });
        }
      });
    }, [g]);
    i(p);
    return p;
  }
  function f(g) {
    var d = g.getSnapshot;
    g = g.value;
    try {
      var p = d();
      return !n(g, p);
    } catch {
      return true;
    }
  }
  function c(g, d) {
    return d();
  }
  var l = typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined" ? c : a;
  It.useSyncExternalStore = e.useSyncExternalStore !== undefined ? e.useSyncExternalStore : l;
  return It;
}
var Pn;
function vr() {
  if (!Pn) {
    Pn = 1;
    Ot.exports = Ds();
  }
  return Ot.exports;
}
var Fs = vr();
var Pt = {
  exports: {}
};
var kt = {};
var kn;
function Ls() {
  if (kn) {
    return kt;
  }
  kn = 1;
  var e = Bn();
  var t = vr();
  function n(c, l) {
    return c === l && (c !== 0 || 1 / c === 1 / l) || c !== c && l !== l;
  }
  var r = typeof Object.is == "function" ? Object.is : n;
  var o = t.useSyncExternalStore;
  var s = e.useRef;
  var i = e.useEffect;
  var a = e.useMemo;
  var f = e.useDebugValue;
  kt.useSyncExternalStoreWithSelector = function (c, l, g, d, p) {
    var m = s(null);
    if (m.current === null) {
      var S = {
        hasValue: false,
        value: null
      };
      m.current = S;
    } else {
      S = m.current;
    }
    m = a(function () {
      function R(N) {
        if (!b) {
          b = true;
          H = N;
          N = d(N);
          if (p !== undefined && S.hasValue) {
            var I = S.value;
            if (p(I, N)) {
              return h = I;
            }
          }
          return h = N;
        }
        I = h;
        if (r(H, N)) {
          return I;
        }
        var _ = d(N);
        if (p !== undefined && p(I, _)) {
          H = N;
          return I;
        } else {
          H = N;
          return h = _;
        }
      }
      var b = false;
      var H;
      var h;
      var T = g === undefined ? null : g;
      return [function () {
        return R(l());
      }, T === null ? undefined : function () {
        return R(T());
      }];
    }, [l, g, d, p]);
    var E = o(c, m[0], m[1]);
    i(function () {
      S.hasValue = true;
      S.value = E;
    }, [E]);
    f(E);
    return E;
  };
  return kt;
}
var An;
function _s() {
  if (!An) {
    An = 1;
    Pt.exports = Ls();
  }
  return Pt.exports;
}
var Bs = _s();
const Ws = Wt(19);
const js = Ws ? Hs : Vs;
function wr(e, t, n, r, o) {
  return js(e, t, n, r, o);
}
function Us(e, t, n, r, o) {
  const s = u.useCallback(() => t(e.getSnapshot(), n, r, o), [e, t, n, r, o]);
  return Fs.useSyncExternalStore(e.subscribe, s, s);
}
function Hs(e, t, n, r, o) {
  return Us(e, t, n, r, o);
}
function Vs(e, t, n, r, o) {
  return Bs.useSyncExternalStoreWithSelector(e.subscribe, e.getSnapshot, e.getSnapshot, s => t(s, n, r, o));
}
class Ys {
  constructor(t) {
    this.state = t;
    this.listeners = new Set();
    this.updateTick = 0;
  }
  subscribe = t => {
    this.listeners.add(t);
    return () => {
      this.listeners.delete(t);
    };
  };
  getSnapshot = () => this.state;
  setState(t) {
    if (this.state === t) {
      return;
    }
    this.state = t;
    this.updateTick += 1;
    const n = this.updateTick;
    for (const r of this.listeners) {
      if (n !== this.updateTick) {
        return;
      }
      r(t);
    }
  }
  update(t) {
    for (const n in t) {
      if (!Object.is(this.state[n], t[n])) {
        this.setState({
          ...this.state,
          ...t
        });
        return;
      }
    }
  }
  set(t, n) {
    if (!Object.is(this.state[t], n)) {
      this.setState({
        ...this.state,
        [t]: n
      });
    }
  }
  notifyAll() {
    const t = {
      ...this.state
    };
    this.setState(t);
  }
  use(t, n, r, o) {
    return wr(this, t, n, r, o);
  }
}
class Tr extends Ys {
  constructor(t, n = {}, r) {
    super(t);
    this.context = n;
    this.selectors = r;
  }
  useSyncedValue(t, n) {
    u.useDebugValue(t);
    const r = this;
    U(() => {
      if (r.state[t] !== n) {
        r.set(t, n);
      }
    }, [r, t, n]);
  }
  useSyncedValueWithCleanup(t, n) {
    const r = this;
    U(() => {
      if (r.state[t] !== n) {
        r.set(t, n);
      }
      return () => {
        r.set(t, undefined);
      };
    }, [r, t, n]);
  }
  useSyncedValues(t) {
    const n = this;
    const r = Object.values(t);
    U(() => {
      n.update(t);
    }, [n, ...r]);
  }
  useControlledProp(t, n) {
    u.useDebugValue(t);
    const r = this;
    const o = n !== undefined;
    U(() => {
      if (o && !Object.is(r.state[t], n)) {
        r.setState({
          ...r.state,
          [t]: n
        });
      }
    }, [r, t, n, o]);
  }
  select(t, n, r, o) {
    const s = this.selectors[t];
    return s(this.state, n, r, o);
  }
  useState(t, n, r, o) {
    u.useDebugValue(t);
    return wr(this, this.selectors[t], n, r, o);
  }
  useContextCallback(t, n) {
    u.useDebugValue(t);
    const r = q(n ?? jt);
    this.context[t] = r;
  }
  useStateSetter(t) {
    const n = u.useRef(undefined);
    if (n.current === undefined) {
      n.current = r => {
        this.set(t, r);
      };
    }
    return n.current;
  }
  observe(t, n) {
    let r;
    if (typeof t == "function") {
      r = t;
    } else {
      r = this.selectors[t];
    }
    let o = r(this.state);
    n(o, o, this);
    return this.subscribe(s => {
      const i = r(s);
      if (!Object.is(o, i)) {
        const a = o;
        o = i;
        n(i, a, this);
      }
    });
  }
}
const Ks = {
  open: A(e => e.open),
  transitionStatus: A(e => e.transitionStatus),
  domReferenceElement: A(e => e.domReferenceElement),
  referenceElement: A(e => e.positionReference ?? e.referenceElement),
  floatingElement: A(e => e.floatingElement),
  floatingId: A(e => e.floatingId)
};
class Qt extends Tr {
  constructor(t) {
    const {
      syncOnly: n,
      nested: r,
      onOpenChange: o,
      triggerElements: s,
      ...i
    } = t;
    super({
      ...i,
      positionReference: i.referenceElement,
      domReferenceElement: i.referenceElement
    }, {
      onOpenChange: o,
      dataRef: {
        current: {}
      },
      events: Er(),
      nested: r,
      triggerElements: s
    }, Ks);
    this.syncOnly = n;
  }
  syncOpenEvent = (t, n) => {
    if (!t || !this.state.open || n != null && is(n)) {
      this.context.dataRef.current.openEvent = t ? n : undefined;
    }
  };
  dispatchOpenChange = (t, n) => {
    this.syncOpenEvent(t, n.event);
    const r = {
      open: t,
      reason: n.reason,
      nativeEvent: n.event,
      nested: this.context.nested,
      triggerElement: n.trigger
    };
    this.context.events.emit("openchange", r);
  };
  setOpen = (t, n) => {
    if (this.syncOnly) {
      this.context.onOpenChange?.(t, n);
      return;
    }
    this.dispatchOpenChange(t, n);
    this.context.onOpenChange?.(t, n);
  };
}
function $s(e) {
  const {
    popupStore: t,
    treatPopupAsFloatingElement: n = false,
    floatingRootContext: r,
    floatingId: o,
    nested: s,
    onOpenChange: i
  } = e;
  const a = t.useState("open");
  const f = t.useState("activeTriggerElement");
  const c = t.useState(n ? "popupElement" : "positionerElement");
  const l = t.context.triggerElements;
  const g = i;
  const d = u.useRef(null);
  if (r === undefined && d.current === null) {
    d.current = new Qt({
      open: a,
      transitionStatus: undefined,
      referenceElement: f,
      floatingElement: c,
      triggerElements: l,
      onOpenChange: g,
      floatingId: o,
      syncOnly: true,
      nested: s
    });
  }
  const p = r ?? d.current;
  t.useSyncedValue("floatingId", o);
  U(() => {
    const m = {
      open: a,
      floatingId: o,
      referenceElement: f,
      floatingElement: c
    };
    if (Se(f)) {
      m.domReferenceElement = f;
    }
    if (p.state.positionReference === p.state.referenceElement) {
      m.positionReference = f;
    }
    p.update(m);
  }, [a, o, f, c, p]);
  p.context.onOpenChange = g;
  p.context.nested = s;
  return p;
}
function Gs(e, t = false, n = false) {
  const [r, o] = u.useState(e && t ? "idle" : undefined);
  const [s, i] = u.useState(e);
  if (e && !s) {
    i(true);
    o("starting");
  }
  if (!e && s && r !== "ending" && !n) {
    o("ending");
  }
  if (!e && !s && r === "ending") {
    o(undefined);
  }
  U(() => {
    if (!e && s && r !== "ending" && n) {
      const a = de.request(() => {
        o("ending");
      });
      return () => {
        de.cancel(a);
      };
    }
  }, [e, s, r, n]);
  U(() => {
    if (!e || t) {
      return;
    }
    const a = de.request(() => {
      o(undefined);
    });
    return () => {
      de.cancel(a);
    };
  }, [t, e]);
  U(() => {
    if (!e || !t) {
      return;
    }
    if (e && s && r !== "idle") {
      o("starting");
    }
    const a = de.request(() => {
      o("idle");
    });
    return () => {
      de.cancel(a);
    };
  }, [t, e, s, r]);
  return {
    mounted: s,
    setMounted: i,
    transitionStatus: r
  };
}
function qs(e, t = false, n = true) {
  const r = nr();
  return q((o, s = null) => {
    r.cancel();
    const i = Ee(e);
    if (i == null) {
      return;
    }
    const a = i;
    const f = () => {
      ht.flushSync(o);
    };
    if (typeof a.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      o();
      return;
    }
    function c() {
      Promise.all(a.getAnimations().map(l => l.finished)).then(() => {
        if (!s?.aborted) {
          f();
        }
      }).catch(() => {
        if (n) {
          if (!s?.aborted) {
            f();
          }
          return;
        }
        const l = a.getAnimations();
        if (!s?.aborted && l.length > 0 && l.some(g => g.pending || g.playState !== "finished")) {
          c();
        }
      });
    }
    if (t) {
      const l = qe.startingStyle;
      if (!a.hasAttribute(l)) {
        r.request(c);
        return;
      }
      const g = new MutationObserver(() => {
        if (!a.hasAttribute(l)) {
          g.disconnect();
          c();
        }
      });
      g.observe(a, {
        attributes: true,
        attributeFilter: [l]
      });
      s?.addEventListener("abort", () => g.disconnect(), {
        once: true
      });
      return;
    }
    r.request(c);
  });
}
function Cr(e) {
  const {
    enabled: t = true,
    open: n,
    ref: r,
    onComplete: o
  } = e;
  const s = q(o);
  const i = qs(r, n, false);
  u.useEffect(() => {
    if (!t) {
      return;
    }
    const a = new AbortController();
    i(s, a.signal);
    return () => {
      a.abort();
    };
  }, [t, n, s, i]);
}
const Xs = {
  tabIndex: -1,
  [Dt]: ""
};
function zs(e) {
  return t => t === "touch" ? e.current : true;
}
function Zs(e, t, n = false) {
  const r = mt();
  const o = zt() != null;
  const s = u.useRef(null);
  if (e === undefined && s.current === null) {
    s.current = t(r, o);
  }
  const i = e ?? s.current;
  $s({
    popupStore: i,
    treatPopupAsFloatingElement: n,
    floatingRootContext: i.state.floatingRootContext,
    floatingId: r,
    nested: o,
    onOpenChange: i.setOpen
  });
  return {
    store: i,
    internalStore: s.current
  };
}
function Js(e, t) {
  const n = u.useRef(null);
  const r = u.useRef(null);
  return u.useCallback(o => {
    if (e === undefined) {
      return;
    }
    let s = false;
    if (n.current !== null) {
      const i = n.current;
      const a = r.current;
      const f = t.context.triggerElements.getById(i);
      if (a && f === a) {
        t.context.triggerElements.delete(i);
        s = true;
      }
      n.current = null;
      r.current = null;
    }
    if (o !== null) {
      n.current = e;
      r.current = o;
      t.context.triggerElements.add(e, o);
      s = true;
    }
    if (s) {
      const i = t.context.triggerElements.size;
      if (t.select("open") && t.state.triggerCount !== i) {
        t.set("triggerCount", i);
      }
    }
  }, [t, e]);
}
function Qs(e, t, n, r = false) {
  if (t) {
    e.preventUnmountingOnClose = false;
  } else if (r) {
    e.preventUnmountingOnClose = true;
  }
  const o = n?.id ?? null;
  if (o || t) {
    e.activeTriggerId = o;
    e.activeTriggerElement = n ?? null;
  }
}
function Uc(e) {
  let t = false;
  e.preventUnmountOnClose = () => {
    t = true;
  };
  return () => t;
}
function Hc(e, t, n, r) {
  xr(() => {
    if (t === undefined && e.state.open === false && n) {
      e.state = {
        ...e.state,
        open: true,
        activeTriggerId: r,
        preventUnmountingOnClose: false
      };
    }
  });
}
function Vc(e, t, n, r) {
  const o = n.useState("isMountedByTrigger", e);
  const s = Js(e, n);
  const i = q(a => {
    s(a);
    if (!a) {
      return;
    }
    const f = n.select("open");
    const c = n.select("activeTriggerId");
    if (c === e) {
      n.update({
        activeTriggerElement: a,
        ...(f ? r : null)
      });
      return;
    }
    if (c == null && f) {
      n.update({
        activeTriggerId: e,
        activeTriggerElement: a,
        ...r
      });
    }
  });
  U(() => {
    if (o) {
      n.update({
        activeTriggerElement: t.current,
        ...r
      });
    }
  }, [o, n, t, ...Object.values(r)]);
  return {
    registerTrigger: i,
    isMountedByThisTrigger: o
  };
}
function ei(e, t = {}) {
  const {
    closeOnActiveTriggerUnmount: n = false
  } = t;
  const r = e.useState("open");
  const o = e.useState("triggerCount");
  U(() => {
    if (!r) {
      if (e.state.triggerCount !== 0) {
        e.set("triggerCount", 0);
      }
      return;
    }
    const s = e.context.triggerElements.size;
    const i = {};
    if (e.state.triggerCount !== s) {
      i.triggerCount = s;
    }
    const a = e.select("activeTriggerId");
    let f = null;
    if (a) {
      const c = e.context.triggerElements.getById(a);
      if (c) {
        if (c !== e.state.activeTriggerElement) {
          i.activeTriggerElement = c;
        }
      } else {
        f = a;
      }
    }
    if (!f && !a && s === 1) {
      const c = e.context.triggerElements.entries().next();
      if (!c.done) {
        const [l, g] = c.value;
        i.activeTriggerId = l;
        i.activeTriggerElement = g;
      }
    }
    if (i.triggerCount !== undefined || i.activeTriggerId !== undefined || i.activeTriggerElement !== undefined) {
      e.update(i);
    }
    if (f && n) {
      queueMicrotask(() => {
        if (e.select("open") && e.select("activeTriggerId") === f && !e.context.triggerElements.getById(f)) {
          const c = xe(Wo);
          e.setOpen(false, c);
          if (!c.isCanceled) {
            e.update({
              activeTriggerId: null,
              activeTriggerElement: null
            });
          }
        }
      });
    }
  }, [r, e, o, n]);
}
function ti(e, t, n) {
  const {
    mounted: r,
    setMounted: o,
    transitionStatus: s
  } = Gs(e);
  const i = t.useState("preventUnmountingOnClose");
  const a = e ? false : i;
  t.useSyncedValues({
    mounted: r,
    transitionStatus: s,
    preventUnmountingOnClose: a
  });
  const f = q(() => {
    o(false);
    t.update({
      activeTriggerId: null,
      activeTriggerElement: null,
      mounted: false,
      preventUnmountingOnClose: false
    });
    n?.();
    t.context.onOpenChangeComplete?.(false);
  });
  Cr({
    enabled: r && !e && !a,
    open: e,
    ref: t.context.popupRef,
    onComplete() {
      if (!e) {
        f();
      }
    }
  });
  return {
    forceUnmount: f,
    transitionStatus: s
  };
}
function ni(e, t) {
  e.useSyncedValues(t);
  U(() => () => {
    e.update({
      activeTriggerProps: J,
      inactiveTriggerProps: J,
      popupProps: J
    });
  }, [e]);
}
function ri(e, t) {
  U(() => {
    if (!t && e.state.openMethod !== null) {
      e.set("openMethod", null);
    }
  }, [t, e]);
  U(() => () => {
    if (e.state.openMethod !== null) {
      e.set("openMethod", null);
    }
  }, [e]);
}
class Or {
  constructor() {
    this.elementsSet = new Set();
    this.idMap = new Map();
  }
  add(t, n) {
    const r = this.idMap.get(t);
    if (r !== n) {
      if (r !== undefined) {
        this.elementsSet.delete(r);
      }
      this.elementsSet.add(n);
      this.idMap.set(t, n);
    }
  }
  delete(t) {
    const n = this.idMap.get(t);
    if (n) {
      this.elementsSet.delete(n);
      this.idMap.delete(t);
    }
  }
  hasElement(t) {
    return this.elementsSet.has(t);
  }
  hasMatchingElement(t) {
    for (const n of this.elementsSet) {
      if (t(n)) {
        return true;
      }
    }
    return false;
  }
  getById(t) {
    return this.idMap.get(t);
  }
  entries() {
    return this.idMap.entries();
  }
  elements() {
    return this.elementsSet.values();
  }
  get size() {
    return this.idMap.size;
  }
}
function oi() {
  return new Qt({
    open: false,
    transitionStatus: undefined,
    floatingElement: null,
    referenceElement: null,
    triggerElements: new Or(),
    floatingId: undefined,
    syncOnly: false,
    nested: false,
    onOpenChange: undefined
  });
}
function si() {
  return {
    open: false,
    openProp: undefined,
    mounted: false,
    transitionStatus: undefined,
    floatingRootContext: oi(),
    floatingId: undefined,
    triggerCount: 0,
    preventUnmountingOnClose: false,
    payload: undefined,
    activeTriggerId: null,
    activeTriggerElement: null,
    triggerIdProp: undefined,
    popupElement: null,
    positionerElement: null,
    activeTriggerProps: J,
    inactiveTriggerProps: J,
    popupProps: J
  };
}
function ii(e, t, n = false) {
  return new Qt({
    open: false,
    transitionStatus: undefined,
    floatingElement: null,
    referenceElement: null,
    triggerElements: e,
    floatingId: t,
    syncOnly: true,
    nested: n,
    onOpenChange: undefined
  });
}
const Ge = A(e => e.triggerIdProp ?? e.activeTriggerId);
const en = A(e => e.openProp ?? e.open);
const Nn = A(e => (e.popupElement?.id ?? e.floatingId) || undefined);
function Ir(e, t) {
  return t !== undefined && en(e) && Ge(e) === t;
}
function ci(e, t) {
  if (Ir(e, t)) {
    return true;
  } else {
    return t !== undefined && en(e) && Ge(e) == null && e.triggerCount === 1;
  }
}
const ai = {
  open: en,
  mounted: A(e => e.mounted),
  transitionStatus: A(e => e.transitionStatus),
  floatingRootContext: A(e => e.floatingRootContext),
  triggerCount: A(e => e.triggerCount),
  preventUnmountingOnClose: A(e => e.preventUnmountingOnClose),
  payload: A(e => e.payload),
  activeTriggerId: Ge,
  activeTriggerElement: A(e => e.mounted ? e.activeTriggerElement : null),
  popupId: Nn,
  isTriggerActive: A((e, t) => t !== undefined && Ge(e) === t),
  isOpenedByTrigger: A((e, t) => Ir(e, t)),
  isMountedByTrigger: A((e, t) => t !== undefined && Ge(e) === t && e.mounted),
  triggerProps: A((e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps),
  triggerPopupId: A((e, t) => ci(e, t) ? Nn(e) : undefined),
  popupProps: A(e => e.popupProps),
  popupElement: A(e => e.popupElement),
  positionerElement: A(e => e.positionerElement)
};
let ui = function (e) {
  e.nestedDialogs = "--nested-dialogs";
  return e;
}({});
let li = function (e) {
  e[e.open = ce.open] = "open";
  e[e.closed = ce.closed] = "closed";
  e[e.startingStyle = ce.startingStyle] = "startingStyle";
  e[e.endingStyle = ce.endingStyle] = "endingStyle";
  e.nested = "data-nested";
  e.nestedDialogOpen = "data-nested-dialog-open";
  return e;
}({});
const Pr = u.createContext(undefined);
function kr() {
  const e = u.useContext(Pr);
  if (e === undefined) {
    throw new Error(Qe(26));
  }
  return e;
}
const Ar = "ArrowUp";
const Nr = "ArrowDown";
const Mr = "ArrowLeft";
const Dr = "ArrowRight";
const tn = "Home";
const nn = "End";
const fi = new Set([Mr, Dr]);
const Yc = new Set([Mr, Dr, tn, nn]);
const di = new Set([Ar, Nr]);
const Kc = new Set([Ar, Nr, tn, nn]);
const pi = new Set([...fi, ...di]);
const gi = new Set([...pi, tn, nn]);
const hi = "Shift";
const mi = "Control";
const bi = "Alt";
const yi = "Meta";
const $c = new Set([hi, mi, bi, yi]);
function Ei(e) {
  return Z(e) && e.tagName === "INPUT";
}
function Gc(e) {
  return !!Ei(e) && e.selectionStart != null || !!Z(e) && e.tagName === "TEXTAREA";
}
function qc(e, t, n, r) {
  if (!e || !t || !t.scrollTo) {
    return;
  }
  let o = e.scrollLeft;
  let s = e.scrollTop;
  const i = e.clientWidth < e.scrollWidth;
  const a = e.clientHeight < e.scrollHeight;
  if (i && r !== "vertical") {
    const f = Mn(e, t, "left");
    const c = it(e);
    const l = it(t);
    if (n === "ltr") {
      if (f + t.offsetWidth + l.scrollMarginRight > e.scrollLeft + e.clientWidth - c.scrollPaddingRight) {
        o = f + t.offsetWidth + l.scrollMarginRight - e.clientWidth + c.scrollPaddingRight;
      } else if (f - l.scrollMarginLeft < e.scrollLeft + c.scrollPaddingLeft) {
        o = f - l.scrollMarginLeft - c.scrollPaddingLeft;
      }
    }
    if (n === "rtl") {
      if (f - l.scrollMarginRight < e.scrollLeft + c.scrollPaddingLeft) {
        o = f - l.scrollMarginLeft - c.scrollPaddingLeft;
      } else if (f + t.offsetWidth + l.scrollMarginRight > e.scrollLeft + e.clientWidth - c.scrollPaddingRight) {
        o = f + t.offsetWidth + l.scrollMarginRight - e.clientWidth + c.scrollPaddingRight;
      }
    }
  }
  if (a && r !== "horizontal") {
    const f = Mn(e, t, "top");
    const c = it(e);
    const l = it(t);
    if (f - l.scrollMarginTop < e.scrollTop + c.scrollPaddingTop) {
      s = f - l.scrollMarginTop - c.scrollPaddingTop;
    } else if (f + t.offsetHeight + l.scrollMarginBottom > e.scrollTop + e.clientHeight - c.scrollPaddingBottom) {
      s = f + t.offsetHeight + l.scrollMarginBottom - e.clientHeight + c.scrollPaddingBottom;
    }
  }
  e.scrollTo({
    left: o,
    top: s,
    behavior: "auto"
  });
}
function Mn(e, t, n) {
  const r = n === "left" ? "offsetLeft" : "offsetTop";
  let o = 0;
  while (t.offsetParent && (o += t[r], t.offsetParent !== e)) {
    t = t.offsetParent;
  }
  return o;
}
function it(e) {
  const t = getComputedStyle(e);
  return {
    scrollMarginTop: parseFloat(t.scrollMarginTop) || 0,
    scrollMarginRight: parseFloat(t.scrollMarginRight) || 0,
    scrollMarginBottom: parseFloat(t.scrollMarginBottom) || 0,
    scrollMarginLeft: parseFloat(t.scrollMarginLeft) || 0,
    scrollPaddingTop: parseFloat(t.scrollPaddingTop) || 0,
    scrollPaddingRight: parseFloat(t.scrollPaddingRight) || 0,
    scrollPaddingBottom: parseFloat(t.scrollPaddingBottom) || 0,
    scrollPaddingLeft: parseFloat(t.scrollPaddingLeft) || 0
  };
}
const Si = {
  ...Kt,
  ...Yt,
  nestedDialogOpen(e) {
    if (e) {
      return {
        [li.nestedDialogOpen]: ""
      };
    } else {
      return null;
    }
  }
};
const Ri = u.forwardRef(function (t, n) {
  const {
    render: r,
    className: o,
    style: s,
    finalFocus: i,
    initialFocus: a,
    ...f
  } = t;
  const {
    store: c
  } = we();
  const l = c.useState("descriptionElementId");
  const g = c.useState("disablePointerDismissal");
  const d = c.useState("floatingRootContext");
  const p = c.useState("popupProps");
  const m = c.useState("modal");
  const S = c.useState("mounted");
  const E = c.useState("nested");
  const R = c.useState("nestedOpenDialogCount");
  const b = c.useState("open");
  const H = c.useState("openMethod");
  const h = c.useState("titleElementId");
  const T = c.useState("transitionStatus");
  const N = c.useState("role");
  const I = d.useState("floatingId");
  const _ = f.id ?? I;
  kr();
  Cr({
    open: b,
    ref: c.context.popupRef,
    onComplete() {
      if (b) {
        c.context.onOpenChangeComplete?.(true);
      }
    }
  });
  const M = a === undefined ? zs(c.context.popupRef) : a;
  const G = R > 0;
  const te = c.useStateSetter("popupElement");
  const k = Ae("div", t, {
    state: {
      open: b,
      nested: E,
      transitionStatus: T,
      nestedDialogOpen: G
    },
    props: [p, {
      id: _,
      "aria-labelledby": h ?? undefined,
      "aria-describedby": l ?? undefined,
      role: N,
      ...Xs,
      hidden: !S,
      onKeyDown(K) {
        if (gi.has(K.key)) {
          K.stopPropagation();
        }
      },
      style: {
        [ui.nestedDialogs]: R
      }
    }, f],
    ref: [n, c.context.popupRef, te],
    stateAttributesMapping: Si
  });
  return <_Component2 context={d} openInteractionType={H} disabled={!S} closeOnFocusOut={!g} initialFocus={M} returnFocus={i} modal={m !== false} restoreFocus="popup">{k}</_Component2>;
});
function xi(e) {
  if (Wt(19)) {
    return e;
  } else if (e) {
    return "true";
  } else {
    return undefined;
  }
}
const _Component3 = u.forwardRef(function (t, n) {
  const {
    cutout: r,
    ...o
  } = t;
  let s;
  if (r) {
    const i = r.getBoundingClientRect();
    s = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${i.left}px ${i.top}px,${i.left}px ${i.bottom}px,${i.right}px ${i.bottom}px,${i.right}px ${i.top}px,${i.left}px ${i.top}px)`;
  }
  return <div ref={n} role="presentation" data-base-ui-inert="" {...o} style={{
    position: "fixed",
    inset: 0,
    userSelect: "none",
    WebkitUserSelect: "none",
    clipPath: s
  }} />;
});
const _Component6 = u.forwardRef(function (t, n) {
  const {
    keepMounted: r = false,
    ...o
  } = t;
  const {
    store: s
  } = we();
  const i = s.useState("mounted");
  const a = s.useState("modal");
  const f = s.useState("open");
  if (i || r) {
    return <Pr.Provider value={r}><Cs ref={n} {...o}>{i && a === true && <_Component3 ref={s.context.internalBackdropRef} inert={xi(!f)} />}{t.children}</Cs></Pr.Provider>;
  } else {
    return null;
  }
});
let Dn = {};
let Fn = {};
let Ln = "";
function Ti(e) {
  if (typeof document === "undefined") {
    return false;
  }
  const t = X(e);
  return pe(t).innerWidth - t.documentElement.clientWidth > 0;
}
function Ci(e) {
  if (typeof CSS === "undefined" || !CSS.supports || !CSS.supports("scrollbar-gutter", "stable") || typeof document === "undefined") {
    return false;
  }
  const n = X(e);
  const r = n.documentElement;
  const o = n.body;
  const s = Ze(r) ? r : o;
  const i = s.style.overflowY;
  const a = r.style.scrollbarGutter;
  r.style.scrollbarGutter = "stable";
  s.style.overflowY = "scroll";
  const f = s.offsetWidth;
  s.style.overflowY = "hidden";
  const c = s.offsetWidth;
  s.style.overflowY = i;
  r.style.scrollbarGutter = a;
  return f === c;
}
function Oi(e) {
  const t = X(e);
  const n = t.documentElement;
  const r = t.body;
  const o = Ze(n) ? n : r;
  const s = {
    overflowY: o.style.overflowY,
    overflowX: o.style.overflowX
  };
  Object.assign(o.style, {
    overflowY: "hidden",
    overflowX: "hidden"
  });
  return () => {
    Object.assign(o.style, s);
  };
}
function Ii(e) {
  const t = X(e);
  const n = t.documentElement;
  const r = t.body;
  const o = pe(n);
  let s = 0;
  let i = 0;
  let a = false;
  const f = de.create();
  if (Be && (o.visualViewport?.scale ?? 1) !== 1) {
    return () => {};
  }
  function c() {
    const p = o.getComputedStyle(n);
    const m = o.getComputedStyle(r);
    const R = (p.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
    s = n.scrollTop;
    i = n.scrollLeft;
    Dn = {
      scrollbarGutter: n.style.scrollbarGutter,
      overflowY: n.style.overflowY,
      overflowX: n.style.overflowX
    };
    Ln = n.style.scrollBehavior;
    Fn = {
      position: r.style.position,
      height: r.style.height,
      width: r.style.width,
      boxSizing: r.style.boxSizing,
      overflowY: r.style.overflowY,
      overflowX: r.style.overflowX,
      scrollBehavior: r.style.scrollBehavior
    };
    const b = n.scrollHeight > n.clientHeight;
    const H = n.scrollWidth > n.clientWidth;
    const h = p.overflowY === "scroll" || m.overflowY === "scroll";
    const T = p.overflowX === "scroll" || m.overflowX === "scroll";
    const N = Math.max(0, o.innerWidth - r.clientWidth);
    const I = Math.max(0, o.innerHeight - r.clientHeight);
    const _ = parseFloat(m.marginTop) + parseFloat(m.marginBottom);
    const M = parseFloat(m.marginLeft) + parseFloat(m.marginRight);
    const G = Ze(n) ? n : r;
    a = Ci(e);
    if (a) {
      n.style.scrollbarGutter = R;
      G.style.overflowY = "hidden";
      G.style.overflowX = "hidden";
      return;
    }
    Object.assign(n.style, {
      scrollbarGutter: R,
      overflowY: "hidden",
      overflowX: "hidden"
    });
    if (b || h) {
      n.style.overflowY = "scroll";
    }
    if (H || T) {
      n.style.overflowX = "scroll";
    }
    Object.assign(r.style, {
      position: "relative",
      height: _ || I ? `calc(100dvh - ${_ + I}px)` : "100dvh",
      width: M || N ? `calc(100vw - ${M + N}px)` : "100vw",
      boxSizing: "border-box",
      overflow: "hidden",
      scrollBehavior: "unset"
    });
    r.scrollTop = s;
    r.scrollLeft = i;
    n.setAttribute("data-base-ui-scroll-locked", "");
    n.style.scrollBehavior = "unset";
  }
  function l() {
    Object.assign(n.style, Dn);
    Object.assign(r.style, Fn);
    if (!a) {
      n.scrollTop = s;
      n.scrollLeft = i;
      n.removeAttribute("data-base-ui-scroll-locked");
      n.style.scrollBehavior = Ln;
    }
  }
  function g() {
    l();
    f.request(c);
  }
  c();
  const d = W(o, "resize", g);
  return () => {
    f.cancel();
    l();
    if (typeof o.removeEventListener == "function") {
      d();
    }
  };
}
class Pi {
  lockCount = 0;
  restore = null;
  timeoutLock = Pe.create();
  timeoutUnlock = Pe.create();
  acquire(t) {
    this.lockCount += 1;
    if (this.lockCount === 1 && this.restore === null) {
      this.timeoutLock.start(0, () => this.lock(t));
    }
    return this.release;
  }
  release = () => {
    this.lockCount -= 1;
    if (this.lockCount === 0 && this.restore) {
      this.timeoutUnlock.start(0, this.unlock);
    }
  };
  unlock = () => {
    if (this.lockCount === 0 && this.restore) {
      this.restore?.();
      this.restore = null;
    }
  };
  lock(t) {
    if (this.lockCount === 0 || this.restore !== null) {
      return;
    }
    const r = X(t).documentElement;
    const o = pe(r).getComputedStyle(r).overflowY;
    if (o === "hidden" || o === "clip") {
      this.restore = jt;
      return;
    }
    const s = Gt || !Ti(t);
    this.restore = s ? Oi(t) : Ii(t);
  }
}
const ki = new Pi();
function Ai(e = true, t = null) {
  U(() => {
    if (e) {
      return ki.acquire(t);
    }
  }, [e, t]);
}
function Ni(e) {
  const {
    store: t,
    actionsRef: n
  } = e;
  const r = t.useState("open");
  ri(t, r);
  ei(t);
  const {
    forceUnmount: o
  } = ti(r, t);
  const s = u.useCallback(() => {
    t.setOpen(false, xe(Yo));
  }, [t]);
  u.useImperativeHandle(n, () => ({
    unmount: o,
    close: s
  }), [o, s]);
}
function Mi({
  store: e,
  parentContext: t,
  isDrawer: n
}) {
  const r = e.useState("open");
  const o = e.useState("disablePointerDismissal");
  const s = e.useState("modal");
  const i = e.useState("popupElement");
  const a = e.useState("floatingRootContext");
  const [f, c] = u.useState(0);
  const [l, g] = u.useState(0);
  const d = f === 0;
  const p = Ms(a, {
    outsidePressEvent() {
      if (e.context.internalBackdropRef.current || e.context.backdropRef.current) {
        return "intentional";
      } else {
        return {
          mouse: s === "trap-focus" ? "sloppy" : "intentional",
          touch: "sloppy"
        };
      }
    },
    outsidePress(R) {
      if (!e.context.outsidePressEnabledRef.current || "button" in R && R.button !== 0 || "touches" in R && R.touches.length !== 1) {
        return false;
      }
      const b = ve(R);
      if (d && !o) {
        if (s && (e.context.internalBackdropRef.current || e.context.backdropRef.current)) {
          return e.context.internalBackdropRef.current === b || e.context.backdropRef.current === b || L(b, i) && !b?.hasAttribute("data-base-ui-portal");
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    escapeKey: d
  });
  Ai(r && s === true, i);
  e.useContextCallback("onNestedDialogOpen", (R, b) => {
    c(R);
    g(b);
  });
  e.useContextCallback("onNestedDialogClose", () => {
    c(0);
    g(0);
  });
  u.useEffect(() => {
    if (t?.onNestedDialogOpen && r) {
      t.onNestedDialogOpen(f + 1, l + (n ? 1 : 0));
    }
    if (t?.onNestedDialogClose && !r) {
      t.onNestedDialogClose();
    }
    return () => {
      if (t?.onNestedDialogClose && r) {
        t.onNestedDialogClose();
      }
    };
  }, [n, r, f, l, t]);
  const m = p.reference ?? J;
  const S = p.trigger ?? J;
  const E = p.floating ?? J;
  ni(e, {
    activeTriggerProps: m,
    inactiveTriggerProps: S,
    popupProps: E,
    nestedOpenDialogCount: f,
    nestedOpenDrawerCount: l
  });
  return null;
}
const Di = {
  ...ai,
  modal: A(e => e.modal),
  nested: A(e => e.nested),
  nestedOpenDialogCount: A(e => e.nestedOpenDialogCount),
  nestedOpenDrawerCount: A(e => e.nestedOpenDrawerCount),
  disablePointerDismissal: A(e => e.disablePointerDismissal),
  openMethod: A(e => e.openMethod),
  descriptionElementId: A(e => e.descriptionElementId),
  titleElementId: A(e => e.titleElementId),
  viewportElement: A(e => e.viewportElement),
  role: A(e => e.role)
};
class rn extends Tr {
  constructor(t, n, r = false) {
    const o = new Or();
    const s = Fi(t);
    s.floatingRootContext = ii(o, n, r);
    super(s, {
      popupRef: u.createRef(),
      backdropRef: u.createRef(),
      internalBackdropRef: u.createRef(),
      outsidePressEnabledRef: {
        current: true
      },
      triggerElements: o,
      onOpenChange: undefined,
      onOpenChangeComplete: undefined
    }, Di);
  }
  setOpen = (t, n) => {
    n.preventUnmountOnClose = () => {
      this.set("preventUnmountingOnClose", true);
    };
    if (!t && n.trigger == null && this.state.activeTriggerId != null) {
      n.trigger = this.state.activeTriggerElement ?? undefined;
    }
    this.context.onOpenChange?.(t, n);
    if (n.isCanceled) {
      return;
    }
    this.state.floatingRootContext.dispatchOpenChange(t, n);
    const r = {
      open: t
    };
    Qs(r, t, n.trigger);
    this.update(r);
  };
  static useStore(t, n) {
    return Zs(t, (o, s) => new rn(n, o, s), true).store;
  }
}
function Fi(e = {}) {
  return {
    ...si(),
    modal: true,
    disablePointerDismissal: false,
    popupElement: null,
    viewportElement: null,
    descriptionElementId: undefined,
    titleElementId: undefined,
    openMethod: null,
    nested: false,
    nestedOpenDialogCount: 0,
    nestedOpenDrawerCount: 0,
    role: "dialog",
    ...e
  };
}
function Li(e, t = "dialog") {
  const {
    children: n,
    open: r,
    defaultOpen: o = false,
    onOpenChange: s,
    onOpenChangeComplete: i,
    disablePointerDismissal: a = false,
    modal: f = true,
    actionsRef: c,
    handle: l,
    triggerId: g,
    defaultTriggerId: d = null
  } = e;
  const p = t === "drawer";
  const m = t === "alert-dialog";
  const S = m ? true : f;
  const E = m || a;
  const R = m ? "alertdialog" : "dialog";
  const b = we(true);
  const h = {
    modal: S,
    disablePointerDismissal: E,
    nested: !!b,
    role: R
  };
  const T = rn.useStore(l?.store, {
    open: o,
    openProp: r,
    activeTriggerId: d,
    triggerIdProp: g,
    ...h
  });
  xr(() => {
    const te = r === undefined && T.state.open === false && o === true ? {
      open: true,
      activeTriggerId: d
    } : null;
    if (m) {
      T.update(te ? {
        ...h,
        ...te
      } : h);
    } else if (te) {
      T.update(te);
    }
  });
  T.useControlledProp("openProp", r);
  T.useControlledProp("triggerIdProp", g);
  T.useSyncedValues(h);
  T.useContextCallback("onOpenChange", s);
  T.useContextCallback("onOpenChangeComplete", i);
  const N = T.useState("open");
  const I = T.useState("mounted");
  const _ = T.useState("payload");
  Ni({
    store: T,
    actionsRef: c
  });
  const M = N || I;
  const G = u.useMemo(() => ({
    store: T
  }), [T]);
  return <Un.Provider value={false}><Hn.Provider value={G}>{M && <Mi store={T} parentContext={b?.store.context} isDrawer={p} />}{typeof n == "function" ? n({
        payload: _
      }) : n}</Hn.Provider></Un.Provider>;
}
function _i(e) {
  const t = u.useContext(Un) ? "drawer" : "dialog";
  return Li(e, t);
}
let _n = function (e) {
  e[e.open = ce.open] = "open";
  e[e.closed = ce.closed] = "closed";
  e[e.startingStyle = ce.startingStyle] = "startingStyle";
  e[e.endingStyle = ce.endingStyle] = "endingStyle";
  e.nested = "data-nested";
  e.nestedDialogOpen = "data-nested-dialog-open";
  return e;
}({});
const Bi = {
  ...Kt,
  ...Yt,
  nested(e) {
    if (e) {
      return {
        [_n.nested]: ""
      };
    } else {
      return null;
    }
  },
  nestedDialogOpen(e) {
    if (e) {
      return {
        [_n.nestedDialogOpen]: ""
      };
    } else {
      return null;
    }
  }
};
const Wi = u.forwardRef(function (t, n) {
  const {
    render: r,
    className: o,
    style: s,
    children: i,
    ...a
  } = t;
  const f = kr();
  const {
    store: c
  } = we();
  const l = c.useState("open");
  const g = c.useState("nested");
  const d = c.useState("transitionStatus");
  const p = c.useState("nestedOpenDialogCount");
  const m = c.useState("mounted");
  const S = c.useStateSetter("viewportElement");
  const E = p > 0;
  return Ae("div", t, {
    enabled: f || m,
    state: {
      open: l,
      nested: g,
      transitionStatus: d,
      nestedDialogOpen: E
    },
    ref: [n, S],
    stateAttributesMapping: Bi,
    props: [{
      role: "presentation",
      hidden: !m,
      style: {
        pointerEvents: l ? undefined : "none"
      },
      children: i
    }, a]
  });
});
const _Component4 = u.forwardRef(function (t, n) {
  const {
    render: r,
    className: o,
    style: s,
    id: i,
    ...a
  } = t;
  const {
    store: f
  } = we();
  const c = Jn(i);
  f.useSyncedValueWithCleanup("titleElementId", c);
  return Ae("h2", t, {
    ref: n,
    props: [{
      id: c
    }, a]
  });
});
const Ui = ["cb3finder-storage", "cb3seedfinder-storage"];
const Hi = ["cb_finder_lastseed", "cb_finder_lastplatform", "cb_finder_lastpois", "CB3_MAP_DATA"];
const Vi = "cb_finder_safemode";
function Xc({
  className: e,
  disabled: t,
  onSuccess: n
}) {
  const [r, o] = u.useState(false);
  const [s, i] = u.useState("idle");
  const [a, f] = u.useState(false);
  jn(r, () => o(false));
  async function c() {
    o(false);
    i("loading");
    try {
      await Promise.all(Ui.map(l => Vr(l)));
      for (const l of Hi) {
        try {
          localStorage.removeItem(l);
        } catch {}
      }
      if (a) {
        try {
          localStorage.setItem(Vi, "1");
        } catch {}
      }
      i("done");
      $r("CB_ChunkApp_ResetAppData", {
        safeMode: a
      });
      n?.();
    } catch (l) {
      console.error("Reset failed:", l);
      i("error");
      Gr(new Error("App data reset failed", {
        cause: l
      }));
    }
  }
  return <w.Fragment><button type="button" className={e} disabled={t || s === "loading"} onClick={() => o(true)}>{s === "loading" ? "Resetting…" : "Reset app data"}</button>{!n && s === "done" && <span className="text-sm text-green-800">App data cleared. Reload the page to start fresh.</span>}{s === "error" && <span className="text-sm text-red-600">Reset failed. Try clearing site data manually in your browser settings.</span>}<_i open={r} onOpenChange={o}><_Component6><Po className="fixed inset-0 z-40 bg-black/40 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" /><Wi className="fixed inset-0 z-50 flex items-center justify-center p-4"><Ri className="flex w-full flex-col overflow-hidden rounded-md border border-[#a5cbf1] bg-[#eaf4ff] shadow-[0_4px_24px_rgba(0,0,0,0.22)] transition-all duration-150 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 sm:max-w-[480px]"><div className="flex items-center justify-between border-b border-[#c0d9f0] px-5 py-3"><_Component4 className="text-md font-semibold text-[#333]">Reset app data</_Component4><_Component5 aria-label="Cancel" className="rounded p-1 text-[#666] transition-colors hover:bg-[#d0e8ff] hover:text-[#333] focus:outline-none"><svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg></_Component5></div><div className="px-5 py-3"><$o className="text-left text-sm leading-snug text-[#333]">This will clear all app data (seed, settings, markers, completed locations, seed finder state). Are you sure?</$o></div><div className="flex items-center justify-between gap-3 border-t border-[#c0d9f0] px-5 py-3"><label className="flex cursor-pointer items-center gap-2 text-sm text-[#5b7085]"><input type="checkbox" checked={a} onChange={l => f(l.target.checked)} className="h-4 w-4 cursor-pointer accent-blue-500" />Limit resource usage</label><div className="flex items-center gap-3"><_Component5 className="text-sm font-medium text-[#4f6f91] transition-colors hover:text-[#333]">Cancel</_Component5><button type="button" onClick={c} className="rounded bg-[#fce8e8] px-3 py-1 text-sm font-semibold text-[#b91c1c] hover:bg-[#fbd0d0] focus:outline-none">Reset</button></div></div></Ri></Wi></_Component6></_i></w.Fragment>;
}
export { at as $, os as A, ss as B, Rc as C, _i as D, xc as E, vc as F, wc as G, ft as H, fs as I, qt as J, nc as K, ec as L, _t as M, $o as N, Qe as O, A as P, Gs as Q, Xc as R, ke as S, wr as T, zn as U, Cr as V, Ms as W, Ht as X, Xs as Y, J as Z, xr as _, Ri as a, uc as a$, Oc as a0, ls as a1, Wo as a2, Ys as a3, pe as a4, ts as a5, _o as a6, Ae as a7, oc as a8, mc as a9, Qi as aA, no as aB, to as aC, ht as aD, tc as aE, jn as aF, Xi as aG, Sc as aH, jo as aI, tr as aJ, mt as aK, Qt as aL, Or as aM, Qn as aN, Pe as aO, Le as aP, Uo as aQ, Cc as aR, Tc as aS, ze as aT, Gt as aU, we as aV, Jn as aW, Vc as aX, Rs as aY, jt as aZ, ac as a_, rc as aa, Cs as ab, Lc as ac, _Component3 as ad, xi as ae, Be as af, W as ag, _Component2 as ah, yc as ai, Yt as aj, Kt as ak, gi as al, sc as am, zi as an, Se as ao, zr as ap, cn as aq, Je as ar, Zr as as, ct as at, Ke as au, Zi as av, eo as aw, Ji as ax, re as ay, Ze as az, _Component4 as b, Fc as b$, lc as b0, fc as b1, Ec as b2, hc as b3, ic as b4, cc as b5, gc as b6, _Component6 as b7, Po as b8, Wi as b9, qs as bA, Wc as bB, zs as bC, qc as bD, pi as bE, Gc as bF, tn as bG, nn as bH, Mr as bI, Dr as bJ, Nr as bK, Ar as bL, Kc as bM, di as bN, Yc as bO, fi as bP, $c as bQ, Do as bR, hi as bS, Fo as bT, ce as bU, kr as bV, Un as bW, Mt as bX, dc as bY, qe as bZ, bc as b_, Tr as ba, ii as bb, ai as bc, Vo as bd, Uc as be, Ho as bf, Mc as bg, Zs as bh, Qs as bi, si as bj, jc as bk, Hc as bl, ri as bm, ei as bn, ti as bo, Yo as bp, ni as bq, $e as br, Ac as bs, pr as bt, Nc as bu, _Component as bv, Dc as bw, Ai as bx, _c as by, Bc as bz, _Component5 as c, nt as d, zt as e, Zt as f, mn as g, q as h, hn as i, nr as j, wt as k, U as l, Ic as m, Pc as n, kc as o, ye as p, X as q, L as r, ns as s, xe as t, qi as u, pc as v, Z as w, or as x, ve as y, Zn as z };
/*! Chunk Base (c) Alexander Gundermann - https://www.chunkbase.com - unauthorized copying prohibited */
//# chunkId=019fb98d-ffd8-7892-9e88-4fef78907963