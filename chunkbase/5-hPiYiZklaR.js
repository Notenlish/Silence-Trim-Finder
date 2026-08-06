(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019fd253-75b6-7901-a811-9144a7b04bd5";
    }
  } catch (e) {}
})();
import { referenceTypes as Ks, multiValue as Zs, simd as Ys } from "./BzNVI6oet8GN.js";
import { a as q, b as Le, t as ne } from "./25yRRMlDxsnb.js";
import { L as De } from "./ViifaoL66WRL.js";
import { D as N, P as M, E as C, B as E, J as I, a as Qs, C as Q } from "./BtLKJFoOO27o.js";
import { C as ce, i as mt } from "./JtnYOKsFTYmX.js";
import { b as ht, j as qs, a as ei, s as ti, d as Rn, c as Zr, e as ni, f as Yr, g as Mn, o as ri, h as Qr, l as qr, w as On, i as oi, k as Bn, r as si, m as Fn, t as eo, n as Dn, p as to, q as no, u as ii, v as ai, x as li, y as ci, z as ui, A as Nn, B as di, C as Vn, D as fi, E as mi, F as hi, G as ro, H as oo, I as so, J as pi, K as Ln, L as zn, M as io, N as Un, O as gi, P as bi, Q as yi, R as Si, S as vi, T as _i, U as wi, V as ki, W as Ti, X as xi, Y as Ci, Z as Ei, _ as Ii, $ as ao, a0 as lo, a1 as jn, a2 as co, a3 as uo, a4 as Ai, a5 as Pi, a6 as Vt, a7 as Ri, a8 as Mi, a9 as Oi, aa as Bi } from "./B-gQtt52VZJd.js";
import { g as Fi, d as Di, s as Ni, c as Vi, l as Li, j as fn } from "./pBctXARMeKgM.js";
import { c as he } from "./-00YEiB8c-7X.js";
import { _ as zi } from "./CVfkMyKip8EO (not important).js";
import { R as $, r as ee } from "./CNSOJBbxx5q0 (not important).js";
const lr = e => {
  let t;
  const n = new Set();
  const r = (f, c) => {
    const p = typeof f == "function" ? f(t) : f;
    if (!Object.is(p, t)) {
      const g = t;
      t = c ?? (typeof p != "object" || p === null) ? p : Object.assign({}, t, p);
      n.forEach(m => m(t, g));
    }
  };
  const o = () => t;
  const a = {
    setState: r,
    getState: o,
    getInitialState: () => l,
    subscribe: f => {
      n.add(f);
      return () => n.delete(f);
    }
  };
  const l = t = e(r, o, a);
  return a;
};
const Ui = e => e ? lr(e) : lr;
const ji = e => e;
function Hi(e, t = ji) {
  const n = $.useSyncExternalStore(e.subscribe, $.useCallback(() => t(e.getState()), [e, t]), $.useCallback(() => t(e.getInitialState()), [e, t]));
  $.useDebugValue(n);
  return n;
}
const cr = e => {
  const t = Ui(e);
  const n = r => Hi(t, r);
  Object.assign(n, t);
  return n;
};
const Wi = e => e ? cr(e) : cr;
const ur = {
  ASSETS_PREFIX: undefined,
  BASE_URL: "/",
  DEV: false,
  MODE: "production",
  PROD: true,
  SITE: "https://www.chunkbase.com",
  SSR: false
};
const dr = e => !!e.dispatchFromDevtools && typeof e.dispatch == "function";
const ct = new Map();
const vt = e => {
  const t = ct.get(e);
  if (t) {
    return Object.fromEntries(Object.entries(t.stores).map(([n, r]) => [n, r.getState()]));
  } else {
    return {};
  }
};
const Gi = (e, t, n) => {
  if (e === undefined) {
    return {
      type: "untracked",
      connection: t.connect(n)
    };
  }
  const r = ct.get(n.name);
  if (r) {
    return {
      type: "tracked",
      store: e,
      ...r
    };
  }
  const o = {
    connection: t.connect(n),
    stores: {}
  };
  ct.set(n.name, o);
  return {
    type: "tracked",
    store: e,
    ...o
  };
};
const $i = (e, t) => {
  if (t === undefined) {
    return;
  }
  const n = ct.get(e);
  if (n) {
    delete n.stores[t];
    if (Object.keys(n.stores).length === 0) {
      ct.delete(e);
    }
  }
};
const Xi = e => {
  var t;
  var n;
  if (!e) {
    return;
  }
  const r = e.split(`
`);
  const o = r.findIndex(i => i.includes("api.setState"));
  if (o < 0) {
    return;
  }
  const s = ((t = r[o + 1]) == null ? undefined : t.trim()) || "";
  if ((n = /.+ (.+) .+/.exec(s)) == null) {
    return undefined;
  } else {
    return n[1];
  }
};
const Ji = (e, t = {}) => (n, r, o) => {
  const {
    enabled: s,
    anonymousActionType: i,
    store: a,
    ...l
  } = t;
  let f;
  try {
    f = (s ?? (ur ? "production" : undefined) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {}
  if (!f) {
    return e(n, r, o);
  }
  const {
    connection: c,
    ...p
  } = Gi(a, f, l);
  let g = true;
  o.setState = (S, b, v) => {
    const _ = n(S, b);
    if (!g) {
      return _;
    }
    const k = v === undefined ? {
      type: i || Xi(new Error().stack) || "anonymous"
    } : typeof v == "string" ? {
      type: v
    } : v;
    if (a === undefined) {
      c?.send(k, r());
      return _;
    } else {
      c?.send({
        ...k,
        type: `${a}/${k.type}`
      }, {
        ...vt(l.name),
        [a]: o.getState()
      });
      return _;
    }
  };
  o.devtools = {
    cleanup: () => {
      if (c && typeof c.unsubscribe == "function") {
        c.unsubscribe();
      }
      $i(l.name, a);
    }
  };
  const m = (...S) => {
    const b = g;
    g = false;
    n(...S);
    g = b;
  };
  const w = e(o.setState, r, o);
  if (p.type === "untracked") {
    c?.init(w);
  } else {
    p.stores[p.store] = o;
    c?.init(Object.fromEntries(Object.entries(p.stores).map(([S, b]) => [S, S === p.store ? w : b.getState()])));
  }
  if (dr(o)) {
    let S = false;
    const b = o.dispatch;
    o.dispatch = (...v) => {
      if ((ur ? "production" : undefined) !== "production" && v[0].type === "__setState" && !S) {
        console.warn("[zustand devtools middleware] \"__setState\" action type is reserved to set state from the devtools. Avoid using it.");
        S = true;
      }
      b(...v);
    };
  }
  c.subscribe(S => {
    var b;
    switch (S.type) {
      case "ACTION":
        if (typeof S.payload != "string") {
          console.error("[zustand devtools middleware] Unsupported action format");
          return;
        }
        return rn(S.payload, v => {
          if (v.type === "__setState") {
            if (a === undefined) {
              m(v.state);
              return;
            }
            if (Object.keys(v.state).length !== 1) {
              console.error(`
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);
            }
            const _ = v.state[a];
            if (_ == null) {
              return;
            }
            if (JSON.stringify(o.getState()) !== JSON.stringify(_)) {
              m(_);
            }
            return;
          }
          if (dr(o)) {
            o.dispatch(v);
          }
        });
      case "DISPATCH":
        switch (S.payload.type) {
          case "RESET":
            m(w);
            if (a === undefined) {
              return c?.init(o.getState());
            } else {
              return c?.init(vt(l.name));
            }
          case "COMMIT":
            if (a === undefined) {
              c?.init(o.getState());
              return;
            }
            return c?.init(vt(l.name));
          case "ROLLBACK":
            return rn(S.state, v => {
              if (a === undefined) {
                m(v);
                c?.init(o.getState());
                return;
              }
              m(v[a]);
              c?.init(vt(l.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return rn(S.state, v => {
              if (a === undefined) {
                m(v);
                return;
              }
              if (JSON.stringify(o.getState()) !== JSON.stringify(v[a])) {
                m(v[a]);
              }
            });
          case "IMPORT_STATE":
            {
              const {
                nextLiftedState: v
              } = S.payload;
              const _ = (b = v.computedStates.slice(-1)[0]) == null ? undefined : b.state;
              if (!_) {
                return;
              }
              m(a === undefined ? _ : _[a]);
              c?.send(null, v);
              return;
            }
          case "PAUSE_RECORDING":
            return g = !g;
        }
        return;
    }
  });
  return w;
};
const Ki = Ji;
const rn = (e, t) => {
  let n;
  try {
    n = JSON.parse(e);
  } catch (r) {
    console.error("[zustand devtools middleware] Could not parse the received json", r);
  }
  if (n !== undefined) {
    t(n);
  }
};
const Zi = e => (t, n, r) => {
  const o = r.subscribe;
  r.subscribe = (i, a, l) => {
    let f = i;
    if (a) {
      const c = l?.equalityFn || Object.is;
      let p = i(r.getState());
      f = g => {
        const m = i(g);
        if (!c(p, m)) {
          const w = p;
          a(p = m, w);
        }
      };
      if (l?.fireImmediately) {
        a(p, p);
      }
    }
    return o(f);
  };
  return e(t, n, r);
};
const Yi = Zi;
function fo(e, t) {
  let n;
  try {
    n = e();
  } catch {
    return;
  }
  return {
    getItem: o => {
      const i = l => l === null ? null : JSON.parse(l, undefined);
      const a = n.getItem(o) ?? null;
      if (a instanceof Promise) {
        return a.then(i);
      } else {
        return i(a);
      }
    },
    setItem: (o, s) => n.setItem(o, JSON.stringify(s, undefined)),
    removeItem: o => n.removeItem(o)
  };
}
const mn = e => t => {
  try {
    const n = e(t);
    if (n instanceof Promise) {
      return n;
    } else {
      return {
        then(r) {
          return mn(r)(n);
        },
        catch(r) {
          return this;
        }
      };
    }
  } catch (n) {
    return {
      then(r) {
        return this;
      },
      catch(r) {
        return mn(r)(n);
      }
    };
  }
};
const Qi = (e, t) => (n, r, o) => {
  let s = {
    storage: fo(() => window.localStorage),
    partialize: b => b,
    version: 0,
    merge: (b, v) => ({
      ...v,
      ...b
    }),
    ...t
  };
  let i = false;
  let a = 0;
  const l = new Set();
  const f = new Set();
  let c = s.storage;
  if (!c) {
    return e((...b) => {
      console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`);
      n(...b);
    }, r, o);
  }
  const p = () => {
    const b = s.partialize({
      ...r()
    });
    return c.setItem(s.name, {
      state: b,
      version: s.version
    });
  };
  const g = o.setState;
  o.setState = (b, v) => {
    g(b, v);
    return p();
  };
  const m = e((...b) => {
    n(...b);
    return p();
  }, r, o);
  o.getInitialState = () => m;
  let w;
  const S = () => {
    var v;
    if (!c) {
      return;
    }
    const _ = ++a;
    i = false;
    l.forEach(T => {
      return T(r() ?? m);
    });
    const k = ((v = s.onRehydrateStorage) == null ? undefined : v.call(s, r() ?? m)) || undefined;
    return mn(c.getItem.bind(c))(s.name).then(T => {
      if (T) {
        if (typeof T.version == "number" && T.version !== s.version) {
          if (s.migrate) {
            const d = s.migrate(T.state, T.version);
            if (d instanceof Promise) {
              return d.then(u => [true, u]);
            } else {
              return [true, d];
            }
          }
          console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
        } else {
          return [false, T.state];
        }
      }
      return [false, undefined];
    }).then(T => {
      if (_ !== a) {
        return;
      }
      const [u, y] = T;
      w = s.merge(y, r() ?? m);
      n(w, true);
      if (u) {
        return p();
      }
    }).then(() => {
      if (_ === a) {
        k?.(r(), undefined);
        w = r();
        i = true;
        f.forEach(T => T(w));
      }
    }).catch(T => {
      if (_ === a) {
        k?.(undefined, T);
      }
    });
  };
  o.persist = {
    setOptions: b => {
      s = {
        ...s,
        ...b
      };
      if (b.storage) {
        c = b.storage;
      }
    },
    clearStorage: () => {
      c?.removeItem(s.name);
    },
    getOptions: () => s,
    rehydrate: () => S(),
    hasHydrated: () => i,
    onHydrate: b => {
      l.add(b);
      return () => {
        l.delete(b);
      };
    },
    onFinishHydration: b => {
      f.add(b);
      return () => {
        f.delete(b);
      };
    }
  };
  if (!s.skipHydration) {
    S();
  }
  return w || m;
};
const qi = Qi;
const fr = [{
  label: "Object.hasOwn()",
  test: () => !!Object.hasOwn
}, {
  label: "Web Worker",
  test: () => typeof window !== "undefined" && "Worker" in window
}, {
  label: "WebGL",
  test: () => {
    if (typeof window === "undefined") {
      return false;
    }
    const t = document.createElement("canvas").getContext("webgl");
    t?.getExtension("WEBGL_lose_context")?.loseContext();
    return t instanceof WebGLRenderingContext;
  }
}, {
  label: "WebGL Sanity Check",
  test: () => {
    if (typeof window === "undefined") {
      return false;
    }
    const t = document.createElement("canvas").getContext("webgl");
    if (!t) {
      return false;
    }
    const n = t.getParameter(t.MAX_TEXTURE_SIZE);
    const r = typeof n == "number" && n > 0;
    t.getExtension("WEBGL_lose_context")?.loseContext();
    return r;
  }
}, {
  label: "Web Assembly",
  test: () => typeof window !== "undefined" && "WebAssembly" in window
}, {
  label: "Web Assembly Reference Types",
  test: () => Ks()
}, {
  label: "Web Assembly Multivalue",
  test: () => Zs()
}, {
  label: "CSS layers",
  test: () => typeof window !== "undefined" && window.CSSLayerBlockRule
}];
const ea = (async () => (await Promise.all(fr.map(async t => {
  try {
    return await t.test();
  } catch {
    return false;
  }
}))).map((t, n) => t ? null : fr[n].label).filter(Boolean))();
function ta() {
  return ea;
}
const re = {
  src: "/_astro/seed-map-pois.sprite.CmXjzmUu.png",
  width: 214,
  height: 209
};
const wm = typeof window !== "undefined" && window.devicePixelRatio || 1;
const be = 1;
const km = 0.125;
const Tm = 128;
const $e = 1.25;
const Xe = 2 / 3;
const xm = 30;
const Cm = 70;
const Em = 85;
async function na() {
  if (typeof window === "undefined") {
    return {
      default: re.src,
      selected: re.src
    };
  }
  const e = await new Promise((t, n) => {
    const r = new Image();
    r.crossOrigin = "anonymous";
    r.onload = () => t(r);
    r.onerror = o => n(o);
    r.src = re.src;
  });
  return {
    default: re.src,
    selected: on(e, $e),
    muted: on(e, Xe),
    mutedSelected: on(e, $e * Xe)
  };
}
function on(e, t) {
  const n = document.createElement("canvas");
  n.width = Math.ceil(e.width * be * t);
  n.height = Math.ceil(e.height * be * t);
  const r = n.getContext("2d");
  if (!r) {
    throw new Error("Can't find the image");
  }
  r.imageSmoothingEnabled = be * t <= 1;
  r.drawImage(e, 0, 0, n.width, n.height);
  return n.toDataURL("image/png");
}
const _t = {
  default: [Math.ceil(re.width * be) / re.width, Math.ceil(re.height * be) / re.height],
  selected: [Math.ceil(re.width * be * $e) / re.width, Math.ceil(re.height * be * $e) / re.height],
  muted: [Math.ceil(re.width * be * Xe) / re.width, Math.ceil(re.height * be * Xe) / re.height],
  mutedSelected: [Math.ceil(re.width * be * $e * Xe) / re.width, Math.ceil(re.height * be * $e * Xe) / re.height]
};
function Im(e, t, n) {
  if (n) {
    if (t) {
      return {
        src: e?.mutedSelected,
        scaling: _t.mutedSelected
      };
    } else {
      return {
        src: e?.muted,
        scaling: _t.muted
      };
    }
  } else if (t) {
    return {
      src: e?.selected,
      scaling: _t.selected
    };
  } else {
    return {
      src: e?.default,
      scaling: _t.default
    };
  }
}
function mo() {
  const e = Math.floor(Math.random() * 4294967296);
  const t = Math.floor(Math.random() * 4294967296);
  return De.fromBits(t, e).toString();
}
const mr = {
  [N.Overworld]: 1,
  [N.Nether]: 8,
  [N.End]: 1
};
function ut(e, t) {
  return mr[e] / mr[t];
}
function hn(e, t) {
  if (Object.is(e, t)) {
    return true;
  }
  if (typeof e != "object" || typeof t != "object" || e === null || t === null) {
    return false;
  }
  if (Array.isArray(e) || Array.isArray(t)) {
    if (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length) {
      return false;
    }
    for (let o = 0; o < e.length; o++) {
      if (!hn(e[o], t[o])) {
        return false;
      }
    }
    return true;
  }
  const n = Object.keys(e);
  const r = Object.keys(t);
  if (n.length !== r.length) {
    return false;
  }
  for (const o of n) {
    if (!Object.prototype.hasOwnProperty.call(t, o) || !hn(e[o], t[o])) {
      return false;
    }
  }
  return true;
}
function Hn(e, t) {
  return n => {
    const r = t();
    const o = typeof n == "function" ? n(r) : n;
    let s = false;
    for (const i in o) {
      if (!hn(r[i], o[i])) {
        s = true;
        break;
      }
    }
    if (s) {
      e(i => Object.assign({}, i, o));
    }
  };
}
const ra = {
  [M.AmethystGeode]: {
    [C.Java]: [I.V1_17, I.V26_3],
    [C.Bedrock]: [E.V1_17, E.V26_50]
  },
  [M.AncientCity]: {
    [C.Java]: [I.V1_19, I.V26_3],
    [C.Bedrock]: [E.V1_19, E.V26_50]
  },
  [M.BastionRemnant]: {
    [C.Java]: [I.V1_16, I.V26_3],
    [C.Bedrock]: [E.V1_16, E.V26_50]
  },
  [M.BuriedTreasure]: {
    [C.Java]: [I.V1_13, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.Cave]: {
    [C.Java]: [I.V1_18, I.V26_3],
    [C.Bedrock]: [E.V1_18, E.V26_50]
  },
  [M.DesertWell]: {
    [C.Java]: [I.V1_18, I.V26_3],
    [C.Bedrock]: [E.V1_18, E.V26_50]
  },
  [M.Dungeon]: {
    [C.Java]: [I.V1_13, I.V26_3],
    [C.Bedrock]: [E.V1_16, E.V26_50]
  },
  [M.EndCity]: {
    [C.Java]: [I.V1_13, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.EndGateway]: {
    [C.Java]: [I.V1_16, I.V26_3],
    [C.Bedrock]: [E.V1_16, E.V26_50]
  },
  [M.Fossil]: {
    [C.Java]: [I.V1_16, I.V26_3],
    [C.Bedrock]: [E.V1_16, E.V26_50]
  },
  [M.FossilNether]: {
    [C.Java]: [I.V1_16, I.V26_3],
    [C.Bedrock]: [E.V1_16, E.V26_50]
  },
  [M.ItemOverworld]: {
    [C.Java]: [I.V1_18, I.V26_3],
    [C.Bedrock]: [E.V1_18, E.V26_50]
  },
  [M.LavaPool]: {
    [C.Java]: [I.V1_18, I.V26_3],
    [C.Bedrock]: [E.V1_18, E.V26_50]
  },
  [M.Mineshaft]: {
    [C.Java]: [I.V1_7, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.NetherFortress]: {
    [C.Java]: [I.V1_7, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.OceanMonument]: {
    [C.Java]: [I.V1_8, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.OceanRuin]: {
    [C.Java]: [I.V1_16, I.V26_3],
    [C.Bedrock]: [E.V1_16, E.V26_50]
  },
  [M.OreVein]: {
    [C.Java]: [I.V1_18, I.V26_3],
    [C.Bedrock]: [E.V1_18, E.V26_50]
  },
  [M.PillagerOutpost]: {
    [C.Java]: [I.V1_14, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.Ravine]: {
    [C.Java]: [I.V1_16, I.V26_3],
    [C.Bedrock]: [E.V1_16, E.V26_50]
  },
  [M.RuinedPortalOverworld]: {
    [C.Java]: [I.V1_16, I.V26_3],
    [C.Bedrock]: [E.V1_16, E.V26_50]
  },
  [M.RuinedPortalNether]: {
    [C.Java]: [I.V1_16, I.V26_3],
    [C.Bedrock]: [E.V1_16, E.V26_50]
  },
  [M.DesertTemple]: {
    [C.Java]: [I.V1_7, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.JungleTemple]: {
    [C.Java]: [I.V1_7, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.WitchHut]: {
    [C.Java]: [I.V1_7, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.Igloo]: {
    [C.Java]: [I.V1_9, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.Shipwreck]: {
    [C.Java]: [I.V1_13, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.SlimeChunk]: {
    [C.Java]: [I.V1_7, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.Spawn]: {
    [C.Java]: [I.V1_7, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.Stronghold]: {
    [C.Java]: [I.V1_7, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.TrailRuin]: {
    [C.Java]: [I.V1_20, I.V26_3],
    [C.Bedrock]: [E.V1_20, E.V26_50]
  },
  [M.TrialChamber]: {
    [C.Java]: [I.V1_21, I.V26_3],
    [C.Bedrock]: [E.V1_21, E.V26_50]
  },
  [M.Village]: {
    [C.Java]: [I.V1_7, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.WoodlandMansion]: {
    [C.Java]: [I.V1_11, I.V26_3],
    [C.Bedrock]: [E.V1_14, E.V26_50]
  },
  [M.AbandonedCamp]: {
    [C.Java]: [I.V26_3, I.V26_3],
    [C.Bedrock]: [E.V26_50, E.V26_50]
  }
};
function Xt(e, t) {
  const n = ra[e][t.edition];
  if (!n) {
    return false;
  }
  const r = t.edition === C.Java ? t.javaVersion : t.bedrockVersion;
  return r >= n[0] && r <= n[1];
}
const hr = e => Symbol.iterator in e;
const pr = e => "entries" in e;
const gr = (e, t) => {
  const n = e instanceof Map ? e : new Map(e.entries());
  const r = t instanceof Map ? t : new Map(t.entries());
  if (n.size !== r.size) {
    return false;
  }
  for (const [o, s] of n) {
    if (!r.has(o) || !Object.is(s, r.get(o))) {
      return false;
    }
  }
  return true;
};
const oa = (e, t) => {
  const n = e[Symbol.iterator]();
  const r = t[Symbol.iterator]();
  let o = n.next();
  let s = r.next();
  while (!o.done && !s.done) {
    if (!Object.is(o.value, s.value)) {
      return false;
    }
    o = n.next();
    s = r.next();
  }
  return !!o.done && !!s.done;
};
function Ee(e, t) {
  if (Object.is(e, t)) {
    return true;
  } else if (typeof e != "object" || e === null || typeof t != "object" || t === null || Object.getPrototypeOf(e) !== Object.getPrototypeOf(t)) {
    return false;
  } else if (hr(e) && hr(t)) {
    if (pr(e) && pr(t)) {
      return gr(e, t);
    } else {
      return oa(e, t);
    }
  } else {
    return gr({
      entries: () => Object.entries(e)
    }, {
      entries: () => Object.entries(t)
    });
  }
}
function X(e, t) {
  let n;
  let r;
  let o;
  return s => {
    if (n !== undefined && n === s) {
      return o;
    }
    n = s;
    const i = e(s);
    if (r === undefined || !Ee(r, i)) {
      r = i;
      o = t(o, ...i);
    }
    return o;
  };
}
const sa = () => ({
  config: {
    type: "full"
  },
  theme: "light"
});
const ia = () => ({
  theme: {
    includeInUrl: () => false,
    stateToSearchParams: () => ({}),
    searchParamsToState: e => e.theme != null ? {
      theme: e.theme === "dark" ? "dark" : "light"
    } : {}
  }
});
function Wn(e) {
  switch (e.type) {
    case "full":
      return {
        forceDimBiomes: false,
        storageProfile: "seed-map"
      };
    case "biomes":
      return {
        forceShowBiomes: true,
        forceDimBiomes: false,
        forceShowCustomPins: true,
        forcePois: [],
        storageProfile: "seed-map",
        disableSearch: true
      };
    case "pois":
      return {
        forceShowCustomPins: true,
        forcePois: e.pois,
        allowedVersions: aa(e),
        allowedDimensions: fa(e.pois),
        forceRenderTerrain: false,
        forceHighlightBiomes: false,
        forceHighlightedBiomes: [],
        forceBiomeHeight: "depth0",
        constraintMaxResolutionToPois: true,
        storageProfile: "seed-map",
        disableSearch: true
      };
    case "embed":
      return {
        forceShowCustomPins: false,
        forceDimBiomes: false,
        embeddedUiMode: true,
        maxPois: 1,
        maxCanvasSize: [1024, 768],
        storageProfile: null,
        constraintMaxResolutionToPois: true,
        popoverMode: "minimal",
        disableSearch: true
      };
    case "seed-finder":
      return {
        forceShowCustomPins: false,
        forceHighlightBiomes: false,
        forceHighlightedBiomes: [],
        forceDimBiomes: false,
        storageProfile: "seed-finder",
        disableRouting: true,
        disableSearch: true,
        popoverMode: "no-actions",
        workerAutoPolicy: "seed-finder",
        liveWorkerResize: true
      };
  }
}
const pe = X(e => [e.config], (e, t) => Wn(t));
function Gn(e) {
  return pe(e).workerAutoPolicy ?? "map";
}
function Am(e) {
  return pe(e).popoverMode ?? "full";
}
function pn(e, t) {
  const n = {};
  if (e.pois != null) {
    if (t.forcePois != null) {
      const o = Object.fromEntries(t.forcePois.map(s => [s, true]));
      if (!Ee(o, e.pois)) {
        n.pois = o;
      }
    }
    const r = t.maxPois;
    if (r != null && Object.values(e.pois).filter(o => o).length > r) {
      let o = 0;
      n.pois = Object.fromEntries(Object.entries(e.pois).map(([s, i]) => !i || o >= r ? [s, false] : (o += 1, [s, true])));
    }
  }
  if (e.biomeHeight != null && t.forceBiomeHeight != null && e.biomeHeight !== t.forceBiomeHeight) {
    n.biomeHeight = t.forceBiomeHeight;
  }
  if (e.highlightBiomes != null && t.forceHighlightBiomes != null && e.highlightBiomes !== t.forceHighlightBiomes) {
    n.highlightBiomes = t.forceHighlightBiomes;
  }
  if (e.highlightedBiomes != null && t.forceHighlightedBiomes != null && !Ee(e.highlightedBiomes, t.forceHighlightedBiomes)) {
    n.highlightedBiomes = t.forceHighlightedBiomes;
  }
  if (t.forceRenderTerrain != null && e.renderTerrain !== t.forceRenderTerrain) {
    n.renderTerrain = t.forceRenderTerrain;
  }
  if (e.showBiomes != null && t.forceShowBiomes != null && e.showBiomes !== t.forceShowBiomes) {
    n.showBiomes = t.forceShowBiomes;
  }
  if (e.dimBiomes != null && t.forceDimBiomes != null && e.dimBiomes !== t.forceDimBiomes) {
    n.dimBiomes = t.forceDimBiomes;
  }
  if (e.showCustomPins != null && t.forceShowCustomPins != null && e.showCustomPins !== t.forceShowCustomPins) {
    n.showCustomPins = t.forceShowCustomPins;
  }
  if (e.version != null && t.allowedVersions != null && !t.allowedVersions.includes(e.version)) {
    n.version = Kn(t.allowedVersions);
  }
  if (e.dimension != null && t.allowedDimensions != null && !t.allowedDimensions.includes(e.dimension)) {
    n.dimension = t.allowedDimensions[0];
  }
  return {
    ...e,
    ...n
  };
}
const br = Object.keys(ce);
function aa(e) {
  if (e?.type !== "pois") {
    return br;
  } else {
    return br.filter(t => e.pois.every(n => Xt(n, ce[t].cb3World)));
  }
}
function G(e) {
  return {
    load: t => e(t) ? {
      isValid: true,
      value: t
    } : {
      isValid: false,
      value: null
    }
  };
}
const la = (e, t) => {
  const n = Hn(e, t);
  return {
    pois: {
      [M.Spawn]: true,
      [M.Village]: true,
      [M.BuriedTreasure]: true,
      [M.BastionRemnant]: true,
      [M.EndCity]: true,
      [M.TrialChamber]: true,
      [M.NetherFortress]: true,
      [M.RuinedPortalOverworld]: true,
      [M.AncientCity]: true,
      [M.SlimeChunk]: true,
      [M.WoodlandMansion]: true
    },
    poiLayerSprites: null,
    poiRenderMode: "icon",
    poiClusterRadius: 3,
    showPoi(r) {
      if (!t().pois[r]) {
        e({
          pois: {
            ...t().pois,
            [r]: true
          }
        });
      }
    },
    hidePoi(r) {
      const o = t().pois;
      if (!Object.hasOwn(o, r) || o[r]) {
        e({
          pois: {
            ...o,
            [r]: false
          }
        });
      }
    },
    showPois(r) {
      return n({
        pois: {
          ...t().pois,
          ...Object.fromEntries(r.map(o => [o, true]))
        }
      });
    },
    showExactlyPois(r) {
      return n({
        pois: Object.fromEntries(r.map(o => [o, true]))
      });
    },
    showPoisAndBiomes(r) {
      return n({
        pois: {
          ...t().pois,
          ...Object.fromEntries(r.map(o => [o, true]))
        },
        showBiomes: true,
        showCustomPins: true
      });
    },
    hidePoisAndBiomes(r) {
      return n({
        pois: {
          ...t().pois,
          ...Object.fromEntries(r.map(o => [o, false]))
        },
        showBiomes: false,
        showCustomPins: false
      });
    },
    setPoiRenderMode(r) {
      e({
        poiRenderMode: r
      });
    },
    setPoiClusterRadius(r) {
      e({
        poiClusterRadius: r
      });
    }
  };
};
const ca = () => ({
  pois: {
    load: e => {
      if (e == null || typeof e != "object") {
        return {
          isValid: false,
          value: null
        };
      }
      const t = Object.values(M);
      return {
        isValid: true,
        value: Object.fromEntries(Object.entries(e).filter(([r, o]) => t.includes(r) && typeof o == "boolean"))
      };
    }
  },
  poiRenderMode: G(e => e === "dot" || e === "icon"),
  poiClusterRadius: G(e => typeof e == "number" || e === "off")
});
const ua = () => ({
  pois: {
    includeInUrl: (e, t) => t && e.forcePois == null,
    stateToSearchParams: e => e.pois != null ? {
      pois: Object.entries(e.pois).filter(([, t]) => t).map(([t]) => Q[t].shortId).filter(Boolean).join("-")
    } : {},
    searchParamsToState: e => e.pois != null ? {
      pois: Object.fromEntries(e.pois.split("-").map(t => [Qs[t], true]).filter(([t]) => t))
    } : {}
  },
  poiIcons: {
    includeInUrl: (e, t) => t && ho(e),
    stateToSearchParams: e => ({
      poiMode: `${e.poiRenderMode}`
    }),
    searchParamsToState: e => e.poiMode === "icon" || e.poiMode === "dot" ? {
      poiRenderMode: e.poiMode
    } : {}
  }
});
const dt = X(e => [e.pois, e.dimension, e.resolution, e.version, pe(e)], (e, t, n, r, o, s) => {
  const i = ce[o].cb3World;
  const l = Object.values(M).filter(m => Xt(m, i)).filter(m => Q[m].dimension === n);
  const f = l.filter(m => t[m]);
  const c = s.constraintMaxResolutionToPois ? f : da(f, r);
  const p = {
    all: l,
    enabled: f,
    visible: c
  };
  if (!e) {
    return p;
  }
  const g = {
    all: Ee(e.all, p.all) ? e.all : p.all,
    enabled: Ee(e.enabled, p.enabled) ? e.enabled : p.enabled,
    visible: Ee(e.visible, p.visible) ? e.visible : p.visible
  };
  if (Ee(e, g)) {
    return e;
  } else {
    return g;
  }
});
function ho(e) {
  const t = e.forcePois;
  return t == null || t.some(n => !Q[n].preferFill);
}
function da(e, t) {
  return e.filter(n => Q[n].maxTileSize >= 256 || t <= Q[n].maxTileSize / 4);
}
function Lt(e) {
  return Math.min(...e.filter(t => Q[t].maxTileSize < 256).map(t => Q[t].maxTileSize / 4));
}
function fa(e) {
  const t = e.map(n => Q[n].dimension);
  return [t.includes(N.Overworld) ? N.Overworld : null, t.includes(N.Nether) ? N.Nether : null, t.includes(N.End) ? N.End : null].filter(Boolean);
}
function po(e) {
  return e.anchor.kind === "poi" && !Q[e.anchor.poi.type].preferFill;
}
function ma(e, t) {
  if (po(e)) {
    return {
      type: "poi",
      id: t.id
    };
  } else {
    return {
      type: "searchResult",
      id: t.id
    };
  }
}
function ha(e, t) {
  if (e == null || e.type === "searchOrigin" || e.type === "searchResult" || e.type === "poi" && po(t.searchQuery) && t.results.some(n => n.id === e.id)) {
    return null;
  } else {
    return e;
  }
}
function gn(e, t) {
  const n = e.searchScanState;
  if (!n || t?.type !== "poi" && t?.type !== "searchResult") {
    return null;
  }
  const r = n.results.findIndex(o => o.id === t.id);
  if (r < 0 || r === n.selectedResult) {
    return null;
  } else {
    return {
      searchScanState: {
        ...n,
        selectedResult: r
      }
    };
  }
}
const pa = 3;
const _e = 99;
const yr = 250;
const st = {
  INITIAL: {
    TRAILING: 2000,
    MAX: 5000
  },
  NEXT: {
    TRAILING: 2000,
    MAX: 15000
  },
  EXTEND: {
    MAX: 30000
  }
};
const Pm = X(e => [e.searchScanState?.selectedResult], (e, t) => t != null && t > 0);
const Rm = X(e => [e.searchScanState?.selectedResult, e.searchScanState?.results, e.searchScanState?.state], (e, t, n, r) => n == null ? "unavailable" : (t ?? -1) + 1 < n.length ? "immediate" : r === "scanning" ? "unavailable" : n.length < _e ? "scan" : "unavailable");
const Mm = X(e => [e.searchScanState?.results], (e, t) => t == null ? false : t.length >= _e);
const ga = X(e => [e.searchScanState?.results], (e, t) => t == null ? null : new Set(t.flatMap(n => n.anchorPois)));
const ba = X(e => [e.searchScanState?.selectedResult != null ? e.searchScanState.results[e.searchScanState.selectedResult] : null], (e, t) => t == null ? null : new Set([...t.anchorPois, ...t.regionPois]));
const ya = X(e => [e.searchScanState?.searchQuery, e.searchScanState?.results, e.dimension], (e, t, n, r) => {
  const o = t?.anchor;
  if (t == null || n == null || r !== t.dimension || o?.kind !== "poi" || Q[o.poi.type].preferFill) {
    return null;
  }
  const s = o.poi.type;
  return n.map(i => ({
    poi: s,
    chunk: i.chunk,
    poiId: i.id,
    poiData: i.data?.type === "poi" ? i.data.poiData : undefined
  }));
});
const Om = X(e => [e.selectedFeature, e.searchScanState?.origin], (e, t, n) => t?.type === "searchOrigin" ? n : undefined);
const Bm = X(e => [e.selectedFeature, e.searchScanState?.results, e.searchScanState?.searchQuery], (e, t, n, r) => {
  if (t?.type !== "searchResult" || n == null || r == null) {
    return;
  }
  const o = n.findIndex(s => s.id === t.id);
  if (!(o < 0)) {
    return {
      result: n[o],
      index: o,
      query: r
    };
  }
});
const $n = -51;
const Sa = [4, 8, 16, 32, 64];
const Qe = 4;
const va = {
  "biome-filter": true,
  "biome-variance": true,
  "terrain-height": true,
  flatness: true
};
function go(e) {
  return Object.hasOwn(va, e);
}
function bo(e) {
  return go(e.kind);
}
function Fm(e, t) {
  if (t === Qe) {
    if (e.sampleGrid === undefined) {
      return e;
    }
    const n = {
      ...e
    };
    delete n.sampleGrid;
    return n;
  }
  return {
    ...e,
    sampleGrid: t
  };
}
function Rt(e) {
  if (!go(e.kind)) {
    return e;
  }
  const t = e;
  if (t.sampleGrid !== Qe) {
    return e;
  }
  const n = {
    ...t
  };
  delete n.sampleGrid;
  return n;
}
const _a = 1;
const yo = 8192;
function Xn(e, t, n) {
  const r = ut(N.Overworld, n);
  return [Math.floor(e * r), Math.floor(t * r)];
}
function Jn(e) {
  if (e.seedSearchState?.selectedResult != null) {
    return e.seedSearchState.results[e.seedSearchState.selectedResult] ?? null;
  } else {
    return null;
  }
}
const Dm = X(e => [Jn(e), e.seedSearchState?.query.anchor.kind, e.dimension], (e, t, n, r) => {
  if (t == null || n == null || n === "spawn") {
    return null;
  }
  const [o, s] = Xn(t.anchorX, t.anchorZ, r);
  return {
    x: o,
    z: s
  };
});
const So = X(e => [Jn(e), e.dimension], (e, t, n) => t == null ? null : [...(n === N.Overworld ? t.anchorPois : []), ...(t.regionPois[n] ?? [])]);
const wa = X(e => [So(e)], (e, t) => t == null ? null : new Set(t.map(n => n.poiId)));
const Nm = X(e => [Jn(e), e.seedSearchState?.query.regions, e.dimension], (e, t, n, r) => {
  if (t == null) {
    return null;
  }
  const o = n?.[r] ?? [];
  const s = t.clusters[r] ?? [];
  const i = t.islands[r] ?? [];
  if (o.length < 1 && s.length < 1 && i.length < 1) {
    return null;
  }
  const [a, l] = Xn(t.anchorX, t.anchorZ, r);
  return {
    anchor: {
      x: a,
      z: l
    },
    regions: o,
    clusters: s,
    islands: i
  };
});
const ka = X(e => [ya(e), So(e)], (e, t, n) => t ?? (n != null && n.length > 0 ? n : null));
const Ta = new Set();
const vo = X(e => [ka(e)], (e, t) => t == null || t.length < 1 ? Ta : new Set(t.map(n => n.poiId)));
const xa = X(e => [dt(e).visible, vo(e)], (e, t, n) => (r, o) => n.has(o) ? "searchAnchor" : t.includes(r) ? "default" : "hidden");
const Vm = X(e => [dt(e).visible, vo(e)], (e, t, n) => t.length < 1 && n.size < 1);
const Lm = X(e => [e.searchScanState?.searchQuery, ga(e), ba(e), wa(e)], (e, t, n, r, o) => t != null ? {
  featuredPoiIds: r,
  highlightedPoiIds: n,
  unmatchedPoiHighlightState: "muted",
  searchQuery: t
} : o != null ? {
  featuredPoiIds: null,
  highlightedPoiIds: o,
  unmatchedPoiHighlightState: "default",
  searchQuery: null
} : null);
function _o(e) {
  if (e?.type === "seedCluster") {
    return null;
  } else {
    return e;
  }
}
function Mt(e) {
  if (e?.type === "seedCluster" || e?.type === "seedAnchor") {
    return null;
  } else {
    return e;
  }
}
const Ot = {
  centerX: 0,
  centerZ: 0,
  size: 59999968
};
const Ca = (e, t) => {
  const n = Hn(e, t);
  return {
    center: {
      x: 0,
      z: 0
    },
    resolution: 4,
    rotation: 0,
    isTheaterModeEnabled: false,
    isHoveringZoomButtons: false,
    pin: null,
    showGrid: false,
    worldBorder: Ot,
    selectedFeature: null,
    momentumPanning: true,
    enableRotation: true,
    setCenter(r) {
      n({
        center: r
      });
    },
    setResolution(r) {
      e({
        resolution: r
      });
    },
    setRotation(r) {
      e({
        rotation: r % (Math.PI * 2)
      });
    },
    goto(r) {
      n({
        center: r,
        pin: r,
        selectedFeature: {
          type: "pin"
        }
      });
    },
    setTheaterModeEnabled(r) {
      e({
        isTheaterModeEnabled: r
      });
    },
    setIsHoveringZoomButtons(r) {
      e({
        isHoveringZoomButtons: r
      });
    },
    setShowGrid(r) {
      e({
        showGrid: r
      });
    },
    setMomentumPanning(r) {
      e({
        momentumPanning: r
      });
    },
    setEnableRotation(r) {
      e({
        enableRotation: r
      });
    },
    setWorldBorder(r) {
      e({
        worldBorder: r
      });
    },
    setPin(r) {
      n({
        pin: r,
        selectedFeature: r != null ? {
          type: "pin"
        } : t().selectedFeature?.type === "pin" ? null : t().selectedFeature
      });
    },
    setPinSelected(r) {
      if (!r && t().selectedFeature?.type === "pin") {
        e({
          selectedFeature: null
        });
      } else if (r && t().selectedFeature?.type !== "pin") {
        e({
          selectedFeature: {
            type: "pin"
          }
        });
      }
    },
    setSelectedPoi(r) {
      if (r == null && t().selectedFeature?.type === "poi") {
        e({
          selectedFeature: null
        });
      } else if (r != null) {
        const o = {
          type: "poi",
          id: r
        };
        e({
          selectedFeature: o,
          ...gn(t(), o)
        });
      }
    },
    setSelectedCustomPin(r) {
      if (r == null && t().selectedFeature?.type === "customPin") {
        e({
          selectedFeature: null
        });
      } else if (r != null) {
        e({
          selectedFeature: {
            type: "customPin",
            id: r
          }
        });
      }
    },
    setSearchOriginSelected(r) {
      if (!r && t().selectedFeature?.type === "searchOrigin") {
        e({
          selectedFeature: null
        });
      } else if (r && t().selectedFeature?.type !== "searchOrigin") {
        e({
          selectedFeature: {
            type: "searchOrigin"
          }
        });
      }
    },
    setSelectedSearchResult(r) {
      if (r == null && t().selectedFeature?.type === "searchResult") {
        e({
          selectedFeature: null
        });
      } else if (r != null) {
        const o = {
          type: "searchResult",
          id: r
        };
        e({
          selectedFeature: o,
          ...gn(t(), o)
        });
      }
    },
    setSeedAnchorSelected(r) {
      if (!r && t().selectedFeature?.type === "seedAnchor") {
        e({
          selectedFeature: null
        });
      } else if (r && t().selectedFeature?.type !== "seedAnchor") {
        e({
          selectedFeature: {
            type: "seedAnchor"
          }
        });
      }
    },
    setSelectedSeedCluster(r) {
      if (r == null && t().selectedFeature?.type === "seedCluster") {
        e({
          selectedFeature: null
        });
      } else if (r != null) {
        e({
          selectedFeature: {
            type: "seedCluster",
            index: r
          }
        });
      }
    }
  };
};
const Ea = () => ({
  showGrid: G(e => typeof e == "boolean"),
  momentumPanning: G(e => typeof e == "boolean"),
  enableRotation: G(e => typeof e == "boolean"),
  worldBorder: G(e => e != null && typeof e == "object" && "centerX" in e && "centerZ" in e && "size" in e && typeof e.centerX == "number" && typeof e.centerZ == "number" && typeof e.size == "number"),
  pin: G(Sr),
  resolution: G(e => typeof e == "number"),
  rotation: G(e => typeof e == "number"),
  center: G(Sr),
  selectedFeature: {
    load: e => Aa(e) ? {
      isValid: true,
      value: e
    } : {
      isValid: false,
      value: null
    },
    save: Ra
  }
});
const Oe = "null";
const Ia = () => ({
  center: {
    includeInUrl: () => true,
    stateToSearchParams: e => e.center != null ? {
      x: `${Math.floor(e.center.x)}`,
      z: `${Math.floor(e.center.z)}`
    } : {},
    searchParamsToState: e => e.x != null && e.z != null ? {
      center: {
        x: wt(e.x, 0),
        z: wt(e.z, 0)
      }
    } : {}
  },
  resolution: {
    includeInUrl: () => true,
    stateToSearchParams: e => ({
      zoom: e.resolution != null ? `${Math.round((1 - Math.log(e.resolution) / Math.log(16)) * 1000) / 1000}` : null
    }),
    searchParamsToState: e => e.zoom != null ? {
      resolution: 16 ** (1 - vr(e.zoom, 0))
    } : {}
  },
  rotation: {
    includeInUrl: (e, t) => t,
    stateToSearchParams: e => ({
      rotation: e.rotation != null ? `${Math.round(e.rotation * 1000) / 1000}` : null
    }),
    searchParamsToState: e => e.rotation != null ? {
      rotation: vr(e.rotation, 0)
    } : {}
  },
  gridLines: {
    includeInUrl: (e, t) => t,
    stateToSearchParams: e => ({
      gridLines: `${e.showGrid}`
    }),
    searchParamsToState: e => e.gridLines != null ? {
      showGrid: e.gridLines !== "false"
    } : {}
  },
  pin: {
    includeInUrl: (e, t) => t,
    stateToSearchParams: e => ({
      pinX: e.pin?.x != null ? `${Math.round(e.pin.x)}` : Oe,
      pinZ: e.pin?.z != null ? `${Math.round(e.pin.z)}` : Oe
    }),
    searchParamsToState: e => e.pinX == null || e.pinZ == null ? {} : e.pinX === Oe || e.pinZ === Oe ? {
      pin: null
    } : {
      pin: {
        x: wt(e.pinX, 0),
        z: wt(e.pinZ, 0)
      }
    }
  },
  selectedFeature: {
    includeInUrl: (e, t) => t,
    stateToSearchParams: e => {
      let t;
      if (e.selectedFeature == null) {
        t = Oe;
      } else if (e.selectedFeature.type === "pin") {
        t = "pin";
      } else if (e.selectedFeature.type === "poi") {
        t = e.selectedFeature.id;
      } else if (e.selectedFeature.type === "customPin") {
        t = "pin-" + e.selectedFeature.id;
      } else if (e.selectedFeature.type === "searchOrigin" || e.selectedFeature.type === "searchResult") {
        t = Oe;
      } else {
        throw new Error("unexpected selected feature type");
      }
      return {
        selectedPoi: t
      };
    },
    searchParamsToState: e => e.selectedPoi == null ? {} : e.selectedPoi === Oe ? {
      selectedFeature: null
    } : e.selectedPoi === "pin" ? {
      selectedFeature: {
        type: "pin"
      }
    } : e.selectedPoi.startsWith("pin-") ? {
      selectedFeature: {
        type: "customPin",
        id: e.selectedPoi.slice(4)
      }
    } : {
      selectedFeature: {
        type: "poi",
        id: e.selectedPoi
      }
    }
  }
});
const zm = X(e => [pe(e), dt(e).enabled], (e, t, n) => !t.constraintMaxResolutionToPois || n.length < 1 ? null : Lt(n));
const Um = X(e => [e.selectedFeature, xa(e)], (e, t, n) => {
  if (t == null || t.type !== "poi") {
    return null;
  }
  const r = t.id.split("/")[0];
  if (n(r, t.id) !== "hidden") {
    return t.id;
  } else {
    return null;
  }
});
function Sr(e) {
  return e == null || typeof e == "object" && "x" in e && "z" in e && typeof e.x == "number" && typeof e.z == "number";
}
function Aa(e) {
  if (e == null) {
    return true;
  }
  if (typeof e != "object") {
    return false;
  }
  const t = e;
  if (t.type === "pin") {
    return true;
  } else if (t.type === "poi" || t.type === "customPin") {
    return typeof t.id == "string";
  } else {
    return false;
  }
}
function Pa(e) {
  return e?.type === "searchOrigin" || e?.type === "searchResult" || e?.type === "seedAnchor" || e?.type === "seedCluster";
}
function Ra(e) {
  if (Pa(e)) {
    return null;
  } else {
    return e;
  }
}
function wt(e, t) {
  if (!e) {
    return t;
  }
  try {
    const n = parseInt(e, 10);
    if (!isNaN(n)) {
      return n;
    }
  } catch {}
  return t;
}
function vr(e, t) {
  if (!e) {
    return t;
  }
  try {
    const n = parseFloat(e);
    if (!isNaN(n)) {
      return n;
    }
  } catch {}
  return t;
}
function Ma(e) {
  return Array.from(e).reduce((t, n) => Math.imul(31, t) + n.charCodeAt(0) | 0, 0);
}
const Oa = (e, t) => {
  const n = Hn(e, t);
  return {
    seed: "",
    fallbackSeed: "0",
    version: Kn(Object.keys(ce)),
    versionUiGroup: null,
    dimension: N.Overworld,
    setSeed(r) {
      e({
        seed: r
      });
    },
    setSeedAndEnsureEdition(r, o) {
      if (ce[t().version].cb3World.edition === o) {
        e({
          seed: r
        });
        return;
      }
      const s = Object.entries(ce).find(([, i]) => i.cb3World.edition === o && !i.cb3World.config.largeBiomes && !i.isExperimental);
      if (s == null) {
        e({
          seed: r
        });
      } else {
        e({
          seed: r,
          version: s[0],
          versionUiGroup: null
        });
      }
    },
    applyRandomSeed() {
      let r = mo();
      if (ce[t().version].use32BitSeed) {
        r = `${De.fromString(r).toInt()}`;
      }
      e({
        seed: r
      });
    },
    setVersion(r, o) {
      e({
        version: r,
        versionUiGroup: o
      });
    },
    setDimension(r) {
      const o = t();
      if (o.dimension === r) {
        return;
      }
      const s = ut(o.dimension, r);
      const i = {
        x: o.center.x * s,
        z: o.center.z * s
      };
      const a = o.pin ? {
        x: o.pin.x * s,
        z: o.pin.z * s
      } : null;
      n({
        dimension: r,
        center: i,
        pin: a,
        selectedFeature: Mt(o.selectedFeature)
      });
    },
    goToDimensionAndCenter(r, o, s) {
      const i = ut(t().dimension, r);
      const a = t();
      n({
        dimension: r,
        center: {
          x: o,
          z: s
        },
        pin: a.pin ? {
          x: a.pin.x * i,
          z: a.pin.z * i
        } : null,
        selectedFeature: _o(a.selectedFeature)
      });
    }
  };
};
const wo = () => ({
  seed: G(e => typeof e == "string"),
  dimension: G(e => typeof e == "string" && Object.values(N).includes(e)),
  version: G(e => typeof e == "string" && mt(e))
});
const Ba = () => ({
  seed: {
    includeInUrl: () => true,
    stateToSearchParams: e => e.seed ? {
      seed: e.seed
    } : e.fallbackSeed ? {
      seed: e.fallbackSeed
    } : {},
    searchParamsToState: e => e.seed != null ? {
      seed: e.seed
    } : {}
  },
  version: {
    includeInUrl: () => true,
    stateToSearchParams: e => e.version ? {
      platform: e.version
    } : {},
    searchParamsToState: e => e.platform != null && mt(e.platform) ? {
      version: e.platform
    } : {}
  },
  dimension: {
    includeInUrl: e => e.allowedDimensions == null || e.allowedDimensions.length >= 2,
    stateToSearchParams: e => e.dimension != null ? {
      dimension: e.dimension
    } : {},
    searchParamsToState: e => e.dimension ? Object.values(N).includes(e.dimension) ? {
      dimension: e.dimension
    } : {
      dimension: N.Overworld
    } : {}
  }
});
const ko = X(e => [e.seed, e.fallbackSeed, e.version], (e, t, n, r) => {
  const o = m => ce[r].use32BitSeed ? De.fromInt(m.toInt()) : m;
  let s = false;
  let i = false;
  let a = t.trim();
  if (a !== t) {
    s = true;
  }
  if (a === "") {
    const m = o(De.fromString(n));
    return {
      numerical: m.toString(),
      long: m,
      isTrimmed: s,
      isHashed: i,
      hasLeadingZeros: false
    };
  }
  let l = false;
  let f = false;
  let c = De.ONE;
  const p = /^\+\d/.test(a) ? a.slice(1) : a;
  try {
    c = De.fromString(p);
    if (c.toString() === p) {
      l = true;
    } else {
      const m = p.replace(/^(-?)0+/, "$1");
      const w = m === "" || m === "-";
      if ((w ? "0" : m) === c.toString()) {
        l = true;
        f = w ? p.replace(/^-/, "").length > 1 : true;
      }
    }
  } catch {}
  if (!l) {
    a = `${Ma(a)}`;
    c = De.fromString(a);
    i = true;
  }
  const g = o(c);
  return {
    numerical: g.toString(),
    long: g,
    isTrimmed: s,
    isHashed: i,
    hasLeadingZeros: f
  };
});
const ge = X(e => [ko(e).numerical, e.version], (e, t, n) => ({
  seed: t,
  ...ce[n].cb3World
}));
function Fa(e) {
  if (e.edition === C.Java) {
    return e.javaVersion >= I.V1_18;
  } else {
    return e.bedrockVersion >= E.V1_18;
  }
}
function To(e, t) {
  return t === N.Overworld && Fa(e);
}
function Kn(e) {
  return e.find(t => {
    const n = ce[t];
    return n.cb3World.edition === C.Java && !n.cb3World.config.largeBiomes && !n.isExperimental;
  }) ?? e[0];
}
const Da = ht.filter(e => e.dimension === N.Overworld).map(e => e.id);
const xo = [qs.id, ei.id, ti.id];
const Na = [Rn.id, Zr.id, ni.id, Yr.id];
const Va = [...Na, Mn.id, ri.id, Qr.id, qr.id, On.id];
oi.id;
Bn.id;
const La = [si.id, Fn.id];
eo.id;
Dn.id;
to.id;
no.id;
ii.id;
ai.id;
li.id;
ci.id;
ui.id;
Nn.id;
di.id;
Vn.id;
const Co = [fi.id, mi.id, hi.id];
ro.id;
oo.id;
so.id;
pi.id;
Ln.id;
zn.id;
io.id;
Un.id;
const Eo = [gi.id, bi.id, yi.id];
const Zn = [Si.id, vi.id, _i.id, wi.id, ki.id];
const Yn = [Ti.id, xi.id, Ci.id, Ei.id, Ii.id];
const za = [ao.id, lo.id, Ln.id, zn.id, Un.id, Mn.id, Rn.id, Nn.id, jn.id, Fn.id, Dn.id, Bn.id, ...Yn];
const Ua = [co.id, On.id, ...xo, ...Eo, ...Zn, ...Co, uo.id];
const ja = [ao.id, lo.id, Ln.id, zn.id, Un.id, Mn.id, Rn.id, Nn.id, jn.id, Fn.id, Dn.id, Bn.id, ...Yn, Qr.id, Zr.id, to.id, no.id, eo.id, oo.id, so.id, ro.id, io.id, Vn.id];
const Ha = [co.id, On.id, ...xo, ...Eo, ...Zn, ...Co, uo.id, Yr.id, qr.id];
const Wa = ht.filter(e => e.displayCategory === "legacy").map(e => e.id);
const kt = {
  IS_LEGACY: Wa,
  IS_OVERWORLD: Da,
  IS_OCEAN: Va,
  IS_RIVER: La,
  IS_NETHER: Zn,
  IS_END: Yn,
  SPAWNS_COLD_VARIANT_FROGS: za,
  SPAWNS_WARM_VARIANT_FROGS: Ua,
  SPAWNS_COLD_VARIANT_FARM_ANIMALS: ja,
  SPAWNS_WARM_VARIANT_FARM_ANIMALS: Ha
};
const Ga = (e, t) => ({
  selectedPoi: null,
  showBiomes: true,
  dimBiomes: true,
  biomeHeight: "depth0",
  highlightedBiomes: [],
  highlightBiomes: false,
  renderTerrain: false,
  fadeInBiomeTiles: true,
  setShowBiomes(n) {
    e({
      showBiomes: n
    });
  },
  setBiomesState(n) {
    if (n === "visible") {
      e({
        showBiomes: true,
        dimBiomes: false
      });
    } else if (n === "hidden") {
      e({
        showBiomes: false,
        dimBiomes: false
      });
    } else if (n === "dim") {
      e({
        showBiomes: true,
        dimBiomes: true
      });
    }
  },
  setRenderTerrain(n) {
    e({
      renderTerrain: n
    });
  },
  setFadeInBiomeTiles(n) {
    e({
      fadeInBiomeTiles: n
    });
  },
  setBiomeHeight(n) {
    e({
      biomeHeight: n
    });
  },
  updateHighlightedBiomes: n => {
    e({
      highlightBiomes: n.length > 0,
      highlightedBiomes: n
    });
  },
  updateHighlightedBiomesForCurrentDimension: n => {
    const r = t().dimension;
    const o = t().highlightedBiomes;
    const s = Io(o, r);
    const i = o.filter(a => !s.includes(a));
    e({
      highlightBiomes: n.length > 0,
      highlightedBiomes: [...i, ...n]
    });
  },
  setHighlightBiomes(n) {
    e({
      highlightBiomes: n
    });
  }
});
const $a = () => ({
  showBiomes: G(e => typeof e == "boolean"),
  dimBiomes: G(e => typeof e == "boolean"),
  highlightBiomes: G(e => typeof e == "boolean"),
  fadeInBiomeTiles: G(e => typeof e == "boolean"),
  renderTerrain: G(e => typeof e == "boolean"),
  biomeHeight: G(e => typeof e == "string" && Ao(e)),
  highlightedBiomes: G(e => Array.isArray(e) && e.every(t => !!ht[t]))
});
const Xa = () => ({
  showBiomes: {
    includeInUrl: (e, t) => t && e.forceShowBiomes == null,
    stateToSearchParams: e => e.showBiomes != null ? {
      showBiomes: `${e.showBiomes}`
    } : {},
    searchParamsToState: e => e.showBiomes != null ? {
      showBiomes: e.showBiomes !== "false"
    } : {}
  },
  dimBiomes: {
    includeInUrl: (e, t) => t && e.forceDimBiomes == null,
    stateToSearchParams: e => e.dimBiomes != null ? {
      dimBiomes: `${e.dimBiomes}`
    } : {},
    searchParamsToState: e => e.dimBiomes != null ? {
      dimBiomes: e.dimBiomes !== "false"
    } : {}
  },
  biomeHeight: {
    includeInUrl: (e, t) => t && e.forceBiomeHeight == null,
    stateToSearchParams: e => e.biomeHeight != null ? {
      biomeHeight: e.biomeHeight
    } : {},
    searchParamsToState: e => e.biomeHeight != null && Ao(e.biomeHeight) ? {
      biomeHeight: e.biomeHeight
    } : {}
  },
  renderTerrain: {
    includeInUrl: (e, t) => t && e.forceRenderTerrain == null,
    stateToSearchParams: e => e.renderTerrain != null ? {
      terrain: `${e.renderTerrain}`
    } : {},
    searchParamsToState: e => e.terrain != null ? {
      renderTerrain: e.terrain !== "false"
    } : {}
  },
  highlightedBiomes: {
    includeInUrl: (e, t) => t && e.forceHighlightedBiomes == null && e.forceHighlightBiomes == null,
    stateToSearchParams: e => e.highlightBiomes && e.highlightedBiomes && e.highlightedBiomes.length > 0 ? {
      biomeFilter: e.highlightedBiomes.join("-")
    } : {
      biomeFilter: "false"
    },
    searchParamsToState: e => {
      if (!e.biomeFilter) {
        return {};
      }
      if (e.biomeFilter === "false") {
        return {
          highlightBiomes: false
        };
      }
      const t = [];
      try {
        for (const n of e.biomeFilter.split("-")) {
          const r = parseInt(n, 10);
          if (isNaN(r) || !ht[r]) {
            return {};
          }
          t.push(r);
        }
      } catch {
        return {};
      }
      return {
        highlightBiomes: true,
        highlightedBiomes: t
      };
    }
  }
});
const Ja = X(e => [e.dimension, e.highlightedBiomes], (e, t, n) => Io(n, t));
const Ka = X(e => [e.showBiomes, e.dimBiomes], (e, t, n) => t ? n ? "dim" : "visible" : "hidden");
function Za(e) {
  return e.forceShowBiomes == null && e.forceDimBiomes == null && e.forcePois != null;
}
function Io(e, t) {
  if (t === N.Overworld) {
    return e.filter(n => !kt.IS_NETHER.includes(n) && !kt.IS_END.includes(n));
  }
  if (t === N.Nether) {
    return e.filter(n => kt.IS_NETHER.includes(n));
  }
  if (t === N.End) {
    return e.filter(n => kt.IS_END.includes(n));
  }
  throw new Error("Invalid dimension");
}
function Ao(e) {
  return ["depth0", "caveDepth", "bottom"].includes(e);
}
function Ya(e, t) {
  const n = t === "caveDepth" || t === "bottom";
  const r = t === "bottom";
  for (const o of e) {
    if ([Ai.id, Pi.id, Vt.id].includes(o) && !n) {
      if (o === Vt.id) {
        return "sulfurCavesAtWrongHeight";
      } else {
        return "caveBiomeAtWrongHeight";
      }
    }
    if (o === jn.id && !r) {
      return "bottomBiomeAtWrongHeight";
    }
  }
  return null;
}
function Qn(e) {
  if (e <= 0) {
    throw new Error("Input must be positive");
  }
  const t = Math.ceil(Math.log2(e));
  return Math.pow(2, t);
}
const ae = [];
for (let e = 0; e < 256; ++e) {
  ae.push((e + 256).toString(16).slice(1));
}
function Qa(e, t = 0) {
  return (ae[e[t + 0]] + ae[e[t + 1]] + ae[e[t + 2]] + ae[e[t + 3]] + "-" + ae[e[t + 4]] + ae[e[t + 5]] + "-" + ae[e[t + 6]] + ae[e[t + 7]] + "-" + ae[e[t + 8]] + ae[e[t + 9]] + "-" + ae[e[t + 10]] + ae[e[t + 11]] + ae[e[t + 12]] + ae[e[t + 13]] + ae[e[t + 14]] + ae[e[t + 15]]).toLowerCase();
}
const qa = new Uint8Array(16);
function el() {
  return crypto.getRandomValues(qa);
}
function qe(e, t, n) {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  } else {
    return tl(e);
  }
}
function tl(e, t, n) {
  e = e || {};
  const r = e.random ?? e.rng?.() ?? el();
  if (r.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  r[6] = r[6] & 15 | 64;
  r[8] = r[8] & 63 | 128;
  return Qa(r);
}
const _r = 50;
const nl = (e, t) => ({
  customPins: {},
  showCustomPins: false,
  setShowCustomPins(n) {
    e({
      showCustomPins: n
    });
  },
  saveAsCustomPin(n, r) {
    const o = at(ge(t()));
    const s = t().customPins;
    const i = t().dimension;
    const a = t().pin;
    if (!a) {
      throw new Error("No pin to save as custom pin");
    }
    const l = {
      uuid: qe(),
      color: r,
      label: n.trim().slice(0, _r).trim(),
      dimension: i,
      position: [a.x, a.z]
    };
    e({
      pin: null,
      showCustomPins: true,
      selectedFeature: {
        type: "customPin",
        id: l.uuid
      },
      customPins: {
        ...s,
        [o]: {
          ...s[o],
          [l.uuid]: l
        }
      }
    });
  },
  updateCustomPin(n, r, o) {
    const s = at(ge(t()));
    const i = t().customPins;
    const a = i[s][n];
    if (!a) {
      throw new Error(`Custom pin with uuid ${n} does not exist`);
    }
    e({
      showCustomPins: true,
      customPins: {
        ...i,
        [s]: {
          ...i[s],
          [n]: {
            ...a,
            label: r.trim().slice(0, _r).trim(),
            color: o
          }
        }
      }
    });
  },
  removeCustomPin(n) {
    const r = at(ge(t()));
    const o = t().customPins;
    const s = t().selectedFeature;
    e({
      selectedFeature: s?.type === "customPin" && s.id === n ? null : s,
      customPins: {
        ...o,
        [r]: Object.fromEntries(Object.entries(o[r]).filter(([i]) => i !== n))
      }
    });
  },
  validateAndImportCustomPins(n) {
    if (Po(n)) {
      e({
        customPins: n
      });
      return true;
    } else {
      return false;
    }
  }
});
const rl = () => ({
  showCustomPins: G(e => typeof e == "boolean"),
  customPins: G(Po)
});
function ol(e) {
  return typeof e == "object" && e != null && typeof e.uuid == "string" && Array.isArray(e.position) && e.position.length === 2 && typeof e.position[0] == "number" && typeof e.position[1] == "number" && typeof e.color == "string" && typeof e.label == "string";
}
function at(e) {
  return e.edition + "/" + e.seed;
}
function Po(e) {
  return typeof e == "object" && e != null && Object.values(e).every(t => typeof t == "object" && t != null && Object.values(t).every(ol));
}
const Ro = X(e => [ge(e), e.customPins], (e, t, n) => n[at(t)] ?? {});
const jm = X(e => [Ro(e), e.dimension], (e, t, n) => !!Object.values(t).find(r => r.dimension === n));
const Hm = X(e => [e.showCustomPins, e.selectedFeature, e.dimension, Ro(e)], (e, t, n, r, o) => {
  if (!t || n?.type !== "customPin") {
    return null;
  }
  const s = n.id;
  if (o[s] == null || o[s].dimension !== r) {
    return null;
  } else {
    return o[s];
  }
});
function Mo(e) {
  return Object.values(e).length;
}
function sl(e) {
  return Object.values(e.customPins).reduce((t, n) => t + Mo(n), 0);
}
function il(e) {
  const t = at(ge(e));
  return Mo(e.customPins[t] ?? {});
}
const al = (e, t) => ({
  markedPois: {},
  markPoi(n, r) {
    const o = t().markedPois;
    const s = ge(t());
    if (bn(s, o, n, r)) {
      return;
    }
    const i = zt(s);
    const a = Q[n].getHash(r);
    e({
      markedPois: {
        ...o,
        [i]: {
          ...o[i],
          [n]: {
            ...o[i]?.[n],
            [a]: true
          }
        }
      }
    });
  },
  unmarkPoi(n, r) {
    const o = t().markedPois;
    const s = ge(t());
    if (!bn(s, o, n, r)) {
      return;
    }
    const i = zt(s);
    const a = Q[n].getHash(r);
    e({
      markedPois: {
        ...o,
        [i]: {
          ...o[i],
          [n]: Object.fromEntries(Object.entries(o[i][n] ?? {}).filter(([l]) => l !== a))
        }
      }
    });
  },
  validateAndImportMarkedPois(n) {
    if (qn(n)) {
      e({
        markedPois: n
      });
      return true;
    } else {
      return false;
    }
  }
});
const ll = () => ({
  markedPois: G(qn)
});
function zt(e) {
  return e.edition + "/" + e.seed;
}
function bn(e, t, n, r) {
  const o = zt(e);
  const s = Q[n].getHash(r);
  return t[o]?.[n]?.[s] ?? false;
}
function Wm(e, t, n) {
  return bn(ge(e), e.markedPois, t, n);
}
function qn(e) {
  return typeof e == "object" && e != null && Object.values(e).every(t => typeof t == "object" && t != null && Object.values(t).every(n => typeof n == "object" && n != null && Object.values(n).every(r => typeof r == "boolean")));
}
function Oo(e) {
  return Object.values(e).reduce((t, n) => t + Object.values(n).filter(r => r).length, 0);
}
function cl(e) {
  return Object.values(e.markedPois).reduce((t, n) => t + Oo(n), 0);
}
function ul(e) {
  const t = zt(ge(e));
  const n = e.markedPois[t] ?? {};
  return Oo(n);
}
function dl(e) {
  return Math.abs(Math.atan2(Math.sin(e), Math.cos(e))) < 0.000001;
}
function Gm(e) {
  return e.getViewport().classList.contains("ol-touch");
}
const Bo = Symbol("Comlink.proxy");
const fl = Symbol("Comlink.endpoint");
const ml = Symbol("Comlink.releaseProxy");
const sn = Symbol("Comlink.finalizer");
const Bt = Symbol("Comlink.thrown");
const Fo = e => typeof e == "object" && e !== null || typeof e == "function";
const hl = {
  canHandle: e => Fo(e) && e[Bo],
  serialize(e) {
    const {
      port1: t,
      port2: n
    } = new MessageChannel();
    No(e, t);
    return [n, [n]];
  },
  deserialize(e) {
    e.start();
    return Lo(e);
  }
};
const pl = {
  canHandle: e => Fo(e) && Bt in e,
  serialize({
    value: e
  }) {
    let t;
    if (e instanceof Error) {
      t = {
        isError: true,
        value: {
          message: e.message,
          name: e.name,
          stack: e.stack
        }
      };
    } else {
      t = {
        isError: false,
        value: e
      };
    }
    return [t, []];
  },
  deserialize(e) {
    throw e.isError ? Object.assign(new Error(e.value.message), e.value) : e.value;
  }
};
const Do = new Map([["proxy", hl], ["throw", pl]]);
function gl(e, t) {
  for (const n of e) {
    if (t === n || n === "*" || n instanceof RegExp && n.test(t)) {
      return true;
    }
  }
  return false;
}
function No(e, t = globalThis, n = ["*"]) {
  t.addEventListener("message", function r(o) {
    if (!o || !o.data) {
      return;
    }
    if (!gl(n, o.origin)) {
      console.warn(`Invalid origin '${o.origin}' for comlink proxy`);
      return;
    }
    const {
      id: s,
      type: i,
      path: a
    } = Object.assign({
      path: []
    }, o.data);
    const l = (o.data.argumentList || []).map(Ne);
    let f;
    try {
      const c = a.slice(0, -1).reduce((g, m) => g[m], e);
      const p = a.reduce((g, m) => g[m], e);
      switch (i) {
        case "GET":
          f = p;
          break;
        case "SET":
          c[a.slice(-1)[0]] = Ne(o.data.value);
          f = true;
          break;
        case "APPLY":
          f = p.apply(c, l);
          break;
        case "CONSTRUCT":
          {
            const g = new p(...l);
            f = Sn(g);
          }
          break;
        case "ENDPOINT":
          {
            const {
              port1: g,
              port2: m
            } = new MessageChannel();
            No(e, m);
            f = _l(g, [g]);
          }
          break;
        case "RELEASE":
          f = undefined;
          break;
        default:
          return;
      }
    } catch (c) {
      f = {
        value: c,
        [Bt]: 0
      };
    }
    Promise.resolve(f).catch(c => ({
      value: c,
      [Bt]: 0
    })).then(c => {
      const [p, g] = Ht(c);
      t.postMessage(Object.assign(Object.assign({}, p), {
        id: s
      }), g);
      if (i === "RELEASE") {
        t.removeEventListener("message", r);
        Vo(t);
        if (sn in e && typeof e[sn] == "function") {
          e[sn]();
        }
      }
    }).catch(c => {
      const [p, g] = Ht({
        value: new TypeError("Unserializable return value"),
        [Bt]: 0
      });
      t.postMessage(Object.assign(Object.assign({}, p), {
        id: s
      }), g);
    });
  });
  if (t.start) {
    t.start();
  }
}
function bl(e) {
  return e.constructor.name === "MessagePort";
}
function Vo(e) {
  if (bl(e)) {
    e.close();
  }
}
function Lo(e, t) {
  const n = new Map();
  e.addEventListener("message", function (o) {
    const {
      data: s
    } = o;
    if (!s || !s.id) {
      return;
    }
    const i = n.get(s.id);
    if (i) {
      try {
        i(s);
      } finally {
        n.delete(s.id);
      }
    }
  });
  return yn(e, n, [], t);
}
function Tt(e) {
  if (e) {
    throw new Error("Proxy has been released and is not useable");
  }
}
function zo(e) {
  return Ge(e, new Map(), {
    type: "RELEASE"
  }).then(() => {
    Vo(e);
  });
}
const Ut = new WeakMap();
const jt = "FinalizationRegistry" in globalThis && new FinalizationRegistry(e => {
  const t = (Ut.get(e) || 0) - 1;
  Ut.set(e, t);
  if (t === 0) {
    zo(e);
  }
});
function yl(e, t) {
  const n = (Ut.get(t) || 0) + 1;
  Ut.set(t, n);
  if (jt) {
    jt.register(e, t, e);
  }
}
function Sl(e) {
  if (jt) {
    jt.unregister(e);
  }
}
function yn(e, t, n = [], r = function () {}) {
  let o = false;
  const s = new Proxy(r, {
    get(i, a) {
      Tt(o);
      if (a === ml) {
        return () => {
          Sl(s);
          zo(e);
          t.clear();
          o = true;
        };
      }
      if (a === "then") {
        if (n.length === 0) {
          return {
            then: () => s
          };
        }
        const l = Ge(e, t, {
          type: "GET",
          path: n.map(f => f.toString())
        }).then(Ne);
        return l.then.bind(l);
      }
      return yn(e, t, [...n, a]);
    },
    set(i, a, l) {
      Tt(o);
      const [f, c] = Ht(l);
      return Ge(e, t, {
        type: "SET",
        path: [...n, a].map(p => p.toString()),
        value: f
      }, c).then(Ne);
    },
    apply(i, a, l) {
      Tt(o);
      const f = n[n.length - 1];
      if (f === fl) {
        return Ge(e, t, {
          type: "ENDPOINT"
        }).then(Ne);
      }
      if (f === "bind") {
        return yn(e, t, n.slice(0, -1));
      }
      const [c, p] = wr(l);
      return Ge(e, t, {
        type: "APPLY",
        path: n.map(g => g.toString()),
        argumentList: c
      }, p).then(Ne);
    },
    construct(i, a) {
      Tt(o);
      const [l, f] = wr(a);
      return Ge(e, t, {
        type: "CONSTRUCT",
        path: n.map(c => c.toString()),
        argumentList: l
      }, f).then(Ne);
    }
  });
  yl(s, e);
  return s;
}
function vl(e) {
  return Array.prototype.concat.apply([], e);
}
function wr(e) {
  const t = e.map(Ht);
  return [t.map(n => n[0]), vl(t.map(n => n[1]))];
}
const Uo = new WeakMap();
function _l(e, t) {
  Uo.set(e, t);
  return e;
}
function Sn(e) {
  return Object.assign(e, {
    [Bo]: true
  });
}
function Ht(e) {
  for (const [t, n] of Do) {
    if (n.canHandle(e)) {
      const [r, o] = n.serialize(e);
      return [{
        type: "HANDLER",
        name: t,
        value: r
      }, o];
    }
  }
  return [{
    type: "RAW",
    value: e
  }, Uo.get(e) || []];
}
function Ne(e) {
  switch (e.type) {
    case "HANDLER":
      return Do.get(e.name).deserialize(e.value);
    case "RAW":
      return e.value;
  }
}
function Ge(e, t, n, r) {
  return new Promise(o => {
    const s = wl();
    t.set(s, o);
    if (e.start) {
      e.start();
    }
    e.postMessage(Object.assign({
      id: s
    }, n), r);
  });
}
function wl() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}
var Ft = Symbol("getEndpoint");
var kr = e => {
  const t = Lo(e);
  return new Proxy(t, {
    get(n, r, o) {
      if (r === Ft) {
        return e;
      } else {
        return Reflect.get(n, r, o);
      }
    }
  });
};
class kl extends Map {
  #n = 0;
  #e = new Map();
  #t = new Map();
  #o;
  #i;
  #s;
  constructor(t = {}) {
    super();
    if (!t.maxSize || !(t.maxSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }
    if (typeof t.maxAge == "number" && t.maxAge === 0) {
      throw new TypeError("`maxAge` must be a number greater than 0");
    }
    this.#o = t.maxSize;
    this.#i = t.maxAge || Number.POSITIVE_INFINITY;
    this.#s = t.onEviction;
  }
  get __oldCache() {
    return this.#t;
  }
  #a(t) {
    if (typeof this.#s == "function") {
      for (const [n, r] of t) {
        this.#s(n, r.value);
      }
    }
  }
  #r(t, n) {
    if (typeof n.expiry == "number" && n.expiry <= Date.now()) {
      if (typeof this.#s == "function") {
        this.#s(t, n.value);
      }
      return this.delete(t);
    } else {
      return false;
    }
  }
  #f(t, n) {
    if (this.#r(t, n) === false) {
      return n.value;
    }
  }
  #c(t, n) {
    if (n.expiry) {
      return this.#f(t, n);
    } else {
      return n.value;
    }
  }
  #u(t, n) {
    const r = n.get(t);
    return this.#c(t, r);
  }
  #d(t, n) {
    this.#e.set(t, n);
    this.#n++;
    if (this.#n >= this.#o) {
      this.#n = 0;
      this.#a(this.#t);
      this.#t = this.#e;
      this.#e = new Map();
    }
  }
  #m(t, n) {
    this.#t.delete(t);
    this.#d(t, n);
  }
  *#l() {
    for (const t of this.#t) {
      const [n, r] = t;
      if (!this.#e.has(n)) {
        if (this.#r(n, r) === false) {
          yield t;
        }
      }
    }
    for (const t of this.#e) {
      const [n, r] = t;
      if (this.#r(n, r) === false) {
        yield t;
      }
    }
  }
  get(t) {
    if (this.#e.has(t)) {
      const n = this.#e.get(t);
      return this.#c(t, n);
    }
    if (this.#t.has(t)) {
      const n = this.#t.get(t);
      if (this.#r(t, n) === false) {
        this.#m(t, n);
        return n.value;
      }
    }
  }
  set(t, n, {
    maxAge: r = this.#i
  } = {}) {
    const o = typeof r == "number" && r !== Number.POSITIVE_INFINITY ? Date.now() + r : undefined;
    if (this.#e.has(t)) {
      this.#e.set(t, {
        value: n,
        expiry: o
      });
    } else {
      this.#d(t, {
        value: n,
        expiry: o
      });
    }
    return this;
  }
  has(t) {
    if (this.#e.has(t)) {
      return !this.#r(t, this.#e.get(t));
    } else if (this.#t.has(t)) {
      return !this.#r(t, this.#t.get(t));
    } else {
      return false;
    }
  }
  peek(t) {
    if (this.#e.has(t)) {
      return this.#u(t, this.#e);
    }
    if (this.#t.has(t)) {
      return this.#u(t, this.#t);
    }
  }
  expiresIn(t) {
    const n = this.#e.get(t) ?? this.#t.get(t);
    if (n) {
      if (n.expiry) {
        return n.expiry - Date.now();
      } else {
        return Number.POSITIVE_INFINITY;
      }
    }
  }
  delete(t) {
    const n = this.#e.delete(t);
    if (n) {
      this.#n--;
    }
    return this.#t.delete(t) || n;
  }
  clear() {
    this.#e.clear();
    this.#t.clear();
    this.#n = 0;
  }
  resize(t) {
    if (!t || !(t > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }
    const n = [...this.#l()];
    const r = n.length - t;
    if (r < 0) {
      this.#e = new Map(n);
      this.#t = new Map();
      this.#n = n.length;
    } else {
      if (r > 0) {
        this.#a(n.slice(0, r));
      }
      this.#t = new Map(n.slice(r));
      this.#e = new Map();
      this.#n = 0;
    }
    this.#o = t;
  }
  evict(t = 1) {
    const n = Number(t);
    if (!n || n <= 0) {
      return;
    }
    const r = [...this.#l()];
    const o = Math.trunc(Math.min(n, Math.max(r.length - 1, 0)));
    if (!(o <= 0)) {
      this.#a(r.slice(0, o));
      this.#t = new Map(r.slice(o));
      this.#e = new Map();
      this.#n = 0;
    }
  }
  *keys() {
    for (const [t] of this) {
      yield t;
    }
  }
  *values() {
    for (const [, t] of this) {
      yield t;
    }
  }
  *[Symbol.iterator]() {
    for (const t of this.#e) {
      const [n, r] = t;
      if (this.#r(n, r) === false) {
        yield [n, r.value];
      }
    }
    for (const t of this.#t) {
      const [n, r] = t;
      if (!this.#e.has(n)) {
        if (this.#r(n, r) === false) {
          yield [n, r.value];
        }
      }
    }
  }
  *entriesDescending() {
    let t = [...this.#e];
    for (let n = t.length - 1; n >= 0; --n) {
      const r = t[n];
      const [o, s] = r;
      if (this.#r(o, s) === false) {
        yield [o, s.value];
      }
    }
    t = [...this.#t];
    for (let n = t.length - 1; n >= 0; --n) {
      const r = t[n];
      const [o, s] = r;
      if (!this.#e.has(o)) {
        if (this.#r(o, s) === false) {
          yield [o, s.value];
        }
      }
    }
  }
  *entriesAscending() {
    for (const [t, n] of this.#l()) {
      yield [t, n.value];
    }
  }
  get size() {
    if (!this.#n) {
      return this.#t.size;
    }
    let t = 0;
    for (const n of this.#t.keys()) {
      if (!this.#e.has(n)) {
        t++;
      }
    }
    return Math.min(this.#n + t, this.#o);
  }
  get maxSize() {
    return this.#o;
  }
  get maxAge() {
    return this.#i;
  }
  entries() {
    return this.entriesAscending();
  }
  forEach(t, n = this) {
    for (const [r, o] of this.entriesAscending()) {
      t.call(n, o, r, this);
    }
  }
  get [Symbol.toStringTag]() {
    return "QuickLRU";
  }
  toString() {
    return `QuickLRU(${this.size}/${this.maxSize})`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
}
const Tl = 10000;
const xl = 32;
const xt = Fi();
const Cl = {
  ios: 2,
  mobile: 4,
  default: 8
};
const El = {
  ios: 4,
  mobile: 8
};
const jo = {
  poi: 0,
  biome: 0,
  search: 1,
  "seed-search": 1
};
const Il = Math.max(...Object.values(jo)) + 1;
class Al {
  buckets = Array.from({
    length: Il
  }, () => []);
  _length = 0;
  get length() {
    return this._length;
  }
  push(t) {
    this.buckets[jo[t.category]].push(t);
    this._length++;
  }
  shift() {
    for (const t of this.buckets) {
      if (t.length > 0) {
        this._length--;
        return t.shift();
      }
    }
  }
}
const Ke = Rl();
if (typeof window !== "undefined") {
  Ke.preInit();
}
function Pl(e) {
  if (xt === "server") {
    return 1;
  }
  const t = navigator.hardwareConcurrency ?? 1;
  if (e === "map") {
    return he(t - 1, 1, Cl[xt]);
  } else if (xt === "default") {
    if (t <= 8) {
      return Math.max(1, t - 1);
    } else {
      return Math.max(8, Math.floor(t * 0.7));
    }
  } else {
    return he(t - 1, 1, El[xt]);
  }
}
function Wt(e, t) {
  const n = e !== "auto" ? e : Pl(t);
  return he(n, 1, xl);
}
function Rl() {
  const e = [];
  let t = null;
  const n = [];
  const r = new Al();
  const o = {};
  let s = 0;
  let i;
  const a = new Set();
  let l;
  const f = new Promise(d => {
    l = d;
  });
  let c = null;
  let p = null;
  function g(d, u) {
    if (d === "ui") {
      if (t == null) {
        throw new Error("Worker queue not initialized");
      }
      u(t).catch(y => q(new Error("Priority worker processing error", {
        cause: y
      })));
      return;
    }
    if (r.length >= Tl) {
      throw new Error("Worker queue is full");
    }
    r.push({
      category: d,
      task: u
    });
    new Promise(y => setTimeout(y, 0)).then(S);
  }
  const m = Ml();
  async function w() {
    if (e.length < 1) {
      throw new Error("Worker queue not initialized");
    }
    const d = n.findIndex(y => !y);
    if (d === -1 || d >= s) {
      return;
    }
    const u = r.shift();
    if (u) {
      n[d] = true;
      try {
        o[u.category] = (o[u.category] ?? 0) + 1;
        await u.task(e[d]);
      } finally {
        o[u.category] = (o[u.category] ?? 0) - 1;
        n[d] = false;
        await w();
      }
    }
  }
  function S() {
    w().catch(d => q(new Error("Worker queue processing error", {
      cause: d
    })));
  }
  function b(d) {
    return async (u, ...y) => {
      await f;
      return new Promise((h, x) => {
        g(u.category, async A => {
          if (u.isObsolete()) {
            h({
              isObsolete: true
            });
            return;
          }
          let O;
          try {
            O = await A[d](...y);
          } catch (W) {
            x(W);
            return;
          }
          h({
            isObsolete: false,
            value: O
          });
        });
      });
    };
  }
  function v(d) {
    e[d] = kr(new Worker(new URL("/_astro/DH_GAoGpObBX.js", import.meta.url), {
      type: "module"
    }));
    e[d][Ft].addEventListener("error", y => {
      q(new Error(`Worker ${d} error: ${y.message ?? "(no message)"}`));
    });
    n[d] = true;
    const u = e[d].initWorker();
    e[d].setSharedContextCallback(Sn(m));
    return u.then(() => {
      n[d] = false;
    });
  }
  function _() {
    t = kr(new Worker(new URL("/_astro/DH_GAoGpObBX.js", import.meta.url), {
      type: "module"
    }));
    t[Ft].addEventListener("error", y => {
      q(new Error(`Priority worker error: ${y.message ?? "(no message)"}`));
    });
    const d = t.initWorker();
    t.setSharedContextCallback(Sn(m));
    const u = v(0);
    c = Promise.all([d, u]);
  }
  function k(d, u) {
    if (c == null) {
      throw new Error("worker queue: must call preInit() first");
    }
    i = u;
    const y = Wt(d, u);
    s = y;
    const h = [c];
    for (let x = 1; x < y; x++) {
      h.push(v(x));
    }
    p = Promise.all(h).then(() => {
      l();
      Le("workers initialized", {
        count: e.length
      });
    });
    return p;
  }
  async function T(d) {
    if (p == null) {
      return;
    }
    await p;
    const u = Wt(d, i);
    const y = s;
    s = u;
    for (let A = y; A < Math.min(u, e.length); A++) {
      S();
    }
    const h = A => v(A).then(() => {
      S();
    }).catch(O => {
      a.add(A);
      e[A][Ft].terminate();
      q(new Error(`Worker ${A} failed to initialize`, {
        cause: O
      }));
    });
    const x = [];
    for (const A of a) {
      if (A < u) {
        a.delete(A);
        x.push(h(A));
      }
    }
    for (let A = e.length; A < u; A++) {
      x.push(h(A));
    }
    if (x.length > 0) {
      Le("workers resized", {
        count: u,
        spawned: x.length
      });
      await Promise.all(x);
    }
  }
  return {
    preInit: _,
    init: k,
    resize: T,
    getBiomeTileData: b("getBiomeTileData"),
    getNoiseBiomeYColumnOverworld: b("getNoiseBiomeYColumnOverworld"),
    getPois: b("getPois"),
    scanTile: b("scanTile"),
    findSeeds: b("findSeeds"),
    getAnchorDomain: b("getAnchorDomain"),
    cancelTask: d => {
      e.forEach((u, y) => {
        if (!a.has(y)) {
          u.cancelTask(d).catch(h => q(new Error("cancelTask error", {
            cause: h
          })));
        }
      });
    },
    clear: () => {
      throw new Error();
    },
    getLoadingByCategory: () => o
  };
}
function Ml() {
  const e = new kl({
    maxSize: 32
  });
  const t = {};
  return async (n, r) => {
    if (e.has(n)) {
      return e.get(n);
    }
    if (t[n]) {
      return t[n];
    }
    t[n] = r();
    try {
      const o = await t[n];
      e.set(n, o);
      return o;
    } catch (o) {
      q(new Error("Shared task error", {
        cause: o
      }));
      throw o;
    } finally {
      delete t[n];
    }
  };
}
function Ol(e) {
  if (e instanceof Error) {
    return e.message;
  } else {
    return null;
  }
}
function Ho(e, t, n) {
  Le(`storage localStorage ${e} error`, {
    key: t,
    message: Ol(n)
  });
}
function it(e) {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.localStorage.getItem(e);
  } catch (t) {
    Ho("getItem", e, t);
    return null;
  }
}
function Bl(e) {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(e);
    } catch (t) {
      Ho("removeItem", e, t);
    }
  }
}
const Fl = 90000;
const Dl = typeof window !== "undefined" ? Promise.all([ta(), na().then(e => ({
  ok: true,
  sprites: e,
  err: undefined
}), e => ({
  ok: false,
  err: e,
  sprites: undefined
}))]) : null;
const Nl = (e, t) => {
  const n = {
    hasHydrated: false,
    hasUsedBiomeGroups: false,
    browserTestFailures: [],
    _dismissibleUiAlerts: [],
    initializationFailures: [],
    copyCoordinatesWithTp: true,
    concurrentWorkers: "auto",
    _userConfiguredSettings: [],
    async onHydrate() {
      const [r, o] = await Dl;
      if (r.length > 0 || !o.ok) {
        e({
          browserTestFailures: r,
          initializationFailures: o.ok ? [] : [{
            code: "spriteLoadError"
          }]
        });
        if (r.length > 0) {
          ne("CB_ChunkApp_BrowserTestFailure", {
            missing: r.join(",")
          });
        }
        if (!o.ok) {
          q(o.err);
        }
        return false;
      } else {
        if (it("cb_finder_safemode") === "1") {
          Bl("cb_finder_safemode");
          e({
            concurrentWorkers: 1
          });
        }
        Ke.init(t().concurrentWorkers, Gn(t())).catch(s => {
          e({
            initializationFailures: [...t().initializationFailures, {
              code: "workerInitError",
              cause: s?.message ?? String(s)
            }]
          });
          q(new Error("Worker initialization failed", {
            cause: s
          }));
        });
        e({
          hasHydrated: true,
          poiLayerSprites: o.sprites,
          fallbackSeed: mo()
        });
        Le("app hydrated");
        n.scheduleTelemetryEvents();
        return true;
      }
    },
    scheduleTelemetryEvents() {
      setTimeout(async () => {
        const r = t();
        const o = await Ys();
        const s = {
          platform: r.version,
          finder: window.location.pathname,
          dimension: r.dimension,
          zoom: Qn(r.resolution),
          isRotated: !dl(r.rotation),
          biomeFilter: `${r.highlightBiomes ? "on" : "off"}-${r.highlightedBiomes.length}`,
          poisCount: dt(r).enabled.length,
          pois: dt(r).enabled.map(i => Q[i].shortId).concat(r.showBiomes ? ["Bi"] : []).join(""),
          theaterMode: r.isTheaterModeEnabled,
          nrMarkedPoisTotal: cl(r),
          nrMarkedPoisWorld: ul(r),
          nrCustomPinsTotal: sl(r),
          nrCustomPinsWorld: il(r),
          nrRecentSearches: r.recentSearches.length,
          poiRenderMode: ho(pe(r)) ? r.poiRenderMode : "N/A",
          hasUsedBiomeGroups: pe(r).forceHighlightedBiomes == null ? r.hasUsedBiomeGroups : "N/A",
          biomeVisibilityState: Za(pe(r)) ? Ka(r) : "N/A",
          momentumPanning: r.momentumPanning,
          fadeInBiomeTiles: r.fadeInBiomeTiles,
          copyCoordinatesWithTp: r.copyCoordinatesWithTp,
          enableRotation: r.enableRotation,
          poiClusterRadius: r.poiClusterRadius,
          concurrentWorkers: r.concurrentWorkers,
          showGrid: r.showGrid,
          worldBorderChanged: r.worldBorder.centerX !== Ot.centerX || r.worldBorder.centerZ !== Ot.centerZ || r.worldBorder.size !== Ot.size,
          version: "2026_2",
          wasmSimd: o
        };
        ne("CB_ChunkApp_Usage", s, "both");
      }, Fl);
    },
    setHasUsedBiomeGroups(r) {
      e({
        hasUsedBiomeGroups: r
      });
    },
    setCopyCoordinatesWithTp(r) {
      e({
        copyCoordinatesWithTp: r
      });
    },
    setConcurrentWorkers(r) {
      e({
        concurrentWorkers: r
      });
      if (pe(t()).liveWorkerResize) {
        Ke.resize(r).catch(o => q(new Error("Worker resize failed", {
          cause: o
        })));
      }
    },
    markUserConfigured(r) {
      const o = t()._userConfiguredSettings;
      if (!o.includes(r)) {
        e({
          _userConfiguredSettings: [...o, r]
        });
      }
    },
    unmarkUserConfigured(r) {
      const o = t()._userConfiguredSettings;
      const s = o.filter(i => !r.includes(i));
      if (s.length !== o.length) {
        e({
          _userConfiguredSettings: s
        });
      }
    },
    showUiAlert(r) {
      if (!t()._dismissibleUiAlerts.includes(r)) {
        e({
          _dismissibleUiAlerts: [...t()._dismissibleUiAlerts, r]
        });
      }
    },
    hideUiAlert(r) {
      if (t()._dismissibleUiAlerts.includes(r)) {
        e({
          _dismissibleUiAlerts: t()._dismissibleUiAlerts.filter(o => o !== r)
        });
      }
    },
    hideUiAlerts(r) {
      const o = t()._dismissibleUiAlerts.filter(s => !r.includes(s));
      if (!(o.length >= t()._dismissibleUiAlerts.length)) {
        e({
          _dismissibleUiAlerts: o
        });
      }
    }
  };
  return n;
};
const vn = () => ({
  copyCoordinatesWithTp: G(e => typeof e == "boolean"),
  concurrentWorkers: G(e => e === "auto" || typeof e == "number" && e >= 1),
  _userConfiguredSettings: G(e => Array.isArray(e) && e.every(t => typeof t == "string"))
});
const Vl = [];
const $m = X(e => [e._dismissibleUiAlerts, e.seed, ko(e), e.version, e.biomeHeight, e.highlightBiomes ? Ja(e) : Vl], (e, t, n, r, o, s, i) => {
  const a = [...t.map(c => ({
    alert: c,
    isDismissible: true,
    payload: null
  }))];
  const l = n.trim();
  if (r.hasLeadingZeros) {
    a.push({
      alert: "seedLeadingZeros",
      isDismissible: false,
      payload: null
    });
  } else if (l !== r.numerical && l.match(/^[-+]?\d+$/)) {
    a.push({
      alert: "seedTooLongNumber",
      isDismissible: false,
      payload: r.numerical
    });
  }
  if (ce[o].warning) {
    a.push({
      alert: "versionWarning",
      isDismissible: false,
      payload: ce[o].warning
    });
  }
  const f = Ya(i, s);
  if (f != null) {
    a.push({
      alert: f,
      isDismissible: false,
      payload: null
    });
  }
  return a;
});
function Ll(e) {
  return e.hasHydrated;
}
function _n(e, t = new WeakSet()) {
  if (e === null) {
    return "null";
  }
  switch (typeof e) {
    case "string":
    case "boolean":
      return JSON.stringify(e);
    case "number":
      if (!Number.isFinite(e)) {
        throw new TypeError("Cannot hash non-finite number");
      }
      return JSON.stringify(e);
    case "object":
      {
        if (t.has(e)) {
          throw new TypeError("Cannot hash cyclic object");
        }
        t.add(e);
        if (Array.isArray(e)) {
          const s = `[${e.map(i => _n(i, t)).join(",")}]`;
          t.delete(e);
          return s;
        }
        const n = e;
        const o = `{${Object.keys(n).sort().map(s => {
          const i = n[s];
          if (i !== undefined) {
            return `${JSON.stringify(s)}:${_n(i, t)}`;
          }
        }).filter(s => s !== undefined).join(",")}}`;
        t.delete(e);
        return o;
      }
    default:
      throw new TypeError(`Unsupported JSON value type: ${typeof e}`);
  }
}
function zl(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++) {
    t ^= e.charCodeAt(n);
    t = Math.imul(t, 16777619);
  }
  return t >>> 0;
}
function Ul(e) {
  return zl(_n(e)).toString(16).padStart(8, "0");
}
const jl = ([e, t]) => [e, -t];
const Wo = ([e, t]) => [e, -t];
const Hl = ([e, t, n, r]) => [e, -r, n, -t];
const Wl = ([e, t, n, r]) => [e, -r, n, -t];
const Xm = ([e, t, n, r]) => [e >> 4, t >> 4, n >> 4, r >> 4];
function Ue(e) {
  throw new Error(`Unexpected value: ${JSON.stringify(e)}`);
}
function Gl(e) {
  const t = new Set();
  switch (e.anchor.kind) {
    case "poi":
      t.add(e.anchor.poi.type);
      break;
    case "cluster":
      e.anchor.members.forEach(n => t.add(n.poi.type));
      break;
    case "biome-patch":
      break;
    default:
      Ue(e.anchor);
  }
  Go(e.regions, t);
  return Array.from(t);
}
function Go(e, t) {
  for (const n of e) {
    for (const r of n.conditions) {
      if (r.kind === "poi-presence") {
        t.add(r.poi.type);
      } else if (r.kind === "poi-cluster") {
        r.members.forEach(o => t.add(o.poi.type));
      }
    }
  }
}
function $l(e) {
  const t = new Set([M.Spawn]);
  for (const n of Object.values(e.regions)) {
    Go(n, t);
  }
  return Array.from(t);
}
function Xl(e) {
  return e.anchor.kind === "poi" && e.anchor.biomesAtPos == null && e.regions.length === 0;
}
function Jt(e) {
  return typeof e == "object" && e !== null;
}
function L(e) {
  const t = Object.entries(e);
  return n => Jt(n) && t.every(([r, o]) => o(n[r]));
}
function et(e) {
  const t = e;
  return n => {
    if (!Jt(n) || typeof n.kind != "string") {
      return false;
    }
    const r = t[n.kind];
    return r !== undefined && r(n);
  };
}
function we(e) {
  return t => typeof t == "string" && Object.hasOwn(e, t);
}
function te(e) {
  return t => t === e;
}
function le(e) {
  return t => t === undefined || e(t);
}
function se(e) {
  return t => Array.isArray(t) && t.every(e);
}
function $o(e) {
  const t = se(e);
  return n => t(n) && n.length >= 1;
}
const D = e => typeof e == "number" && Number.isFinite(e);
const tt = e => typeof e == "string";
const Jl = e => typeof e == "boolean";
const Je = e => typeof e == "number" && Sa.includes(e);
const Kl = new Set(Object.values(M));
const Xo = e => typeof e == "string" && Kl.has(e);
const Zl = new Set(Object.values(N));
const Jo = e => typeof e == "string" && Zl.has(e);
const Kt = L({
  type: Xo,
  variantId: le(tt)
});
const Ko = L({
  poi: Kt,
  minAmount: D
});
const Zo = L({
  meters: D,
  threeD: Jl
});
const Yo = et({
  surface: L({
    kind: te("surface"),
    surfaceKind: we({
      any: true,
      land: true
    })
  }),
  underground: L({
    kind: te("underground")
  }),
  fixed: L({
    kind: te("fixed"),
    y: D
  })
});
const Qo = et({
  "poi-presence": L({
    kind: te("poi-presence"),
    poi: Kt,
    minAmount: D,
    biomeAtPos: le(D)
  }),
  "poi-cluster": L({
    kind: te("poi-cluster"),
    members: $o(Ko),
    radius: Zo
  }),
  "biome-filter": L({
    kind: te("biome-filter"),
    mode: we({
      "includes-all": true,
      "includes-any": true,
      "excludes-all": true,
      "limited-to": true
    }),
    biomes: se(D),
    sampleGrid: le(Je),
    scanHeight: le(Yo)
  }),
  "biome-variance": L({
    kind: te("biome-variance"),
    comparator: we({
      "at-least": true,
      "at-most": true,
      exactly: true
    }),
    count: D,
    sampleGrid: le(Je)
  }),
  "terrain-height": L({
    kind: te("terrain-height"),
    minY: le(D),
    maxY: le(D),
    sampleGrid: le(Je)
  }),
  flatness: L({
    kind: te("flatness"),
    range: L({
      lowerPercentile: D,
      upperPercentile: D,
      maxBlocksAt128: D
    }),
    maxAverageSlope: D,
    sampleGrid: le(Je)
  })
});
const qo = L({
  shape: et({
    square: L({
      kind: te("square"),
      inradius: D
    }),
    circle: L({
      kind: te("circle"),
      radius: D
    })
  }),
  conditions: se(Qo)
});
const Yl = et({
  poi: L({
    kind: te("poi"),
    poi: Kt,
    biomesAtPos: le(se(D))
  }),
  cluster: L({
    kind: te("cluster"),
    members: $o(Ko),
    radius: Zo
  }),
  "biome-patch": L({
    kind: te("biome-patch"),
    biomes: se(D),
    scanHeight: Yo,
    minPatchSize: le(D)
  })
});
const Ql = L({
  anchor: Yl,
  regions: se(qo),
  dimension: Jo
});
const es = et({
  "anchor-biome": L({
    kind: te("anchor-biome"),
    mode: we({
      in: true,
      "not-in": true
    }),
    biomes: se(D)
  }),
  "anchor-terrain-height": L({
    kind: te("anchor-terrain-height"),
    minY: le(D),
    maxY: le(D)
  }),
  "anchor-island": L({
    kind: te("anchor-island"),
    mode: we({
      any: true,
      "includes-all": true,
      "includes-any": true,
      "excludes-all": true,
      "limited-to": true
    }),
    biomes: se(D),
    minChunks: D,
    maxChunks: D,
    sampleGrid: le(Je)
  })
});
const ql = et({
  spawn: L({
    kind: te("spawn")
  }),
  origin: L({
    kind: te("origin")
  }),
  custom: L({
    kind: te("custom"),
    x: D,
    z: D
  })
});
function lt(e) {
  return t => Jt(t) && !Array.isArray(t) && Object.entries(t).every(([n, r]) => Jo(n) && e(r));
}
const ec = L({
  anchor: ql,
  anchorConditions: lt(se(es)),
  regions: lt(se(qo))
});
function Ct(e) {
  if (e <= 0) {
    return 0;
  } else {
    return Qn(Math.ceil(e));
  }
}
function Zt(e) {
  const {
    anchor: t
  } = e;
  return {
    searchType: t.kind,
    advanced: e.regions.length > 0,
    nrConditions: e.regions.reduce((n, r) => n + r.conditions.length, 0),
    pois: tc(t),
    nrBiomes: nc(t),
    dimension: e.dimension
  };
}
function tc(e) {
  switch (e.kind) {
    case "poi":
      return Q[e.poi.type].shortId;
    case "cluster":
      return e.members.map(t => Q[t.poi.type].shortId).join("");
    case "biome-patch":
      return "";
  }
}
function nc(e) {
  switch (e.kind) {
    case "biome-patch":
      return e.biomes.length;
    case "poi":
      return e.biomesAtPos?.length ?? 0;
    case "cluster":
      return 0;
  }
}
function rc(e) {
  return e.regions.flatMap(t => t.conditions.filter(bo).map(n => n.sampleGrid ?? Qe));
}
function oc(e) {
  ne("CB_ChunkApp_SearchOpen", {
    source: e
  }, "both");
}
function sc(e, t) {
  const n = Zt(e);
  Le("search scan", {
    searchType: n.searchType,
    advanced: n.advanced,
    source: t
  });
  ne("CB_ChunkApp_SearchScan", {
    ...n,
    sample_grids: rc(e),
    source: t
  }, "posthog");
}
function ic(e, t, n) {
  ne("CB_ChunkApp_SearchScanEnd", {
    ...Zt(e),
    source: t,
    outcome: n.outcome,
    nrResults: Ct(n.nrResults),
    timeToFirstResultMs: n.timeToFirstResultMs == null ? -1 : Ct(n.timeToFirstResultMs),
    durationMs: Ct(n.durationMs),
    radiusCovered: Number.isFinite(n.radiusCovered) ? Ct(n.radiusCovered) : -1
  }, "both");
}
function ac(e) {
  ne("CB_ChunkApp_SearchExtend", Zt(e), "both");
}
function lc(e) {
  ne("CB_ChunkApp_SearchRestart", Zt(e), "both");
}
function cc(e) {
  ne("CB_ChunkApp_SearchStop", {
    source: e
  }, "both");
}
function Tr(e, t, n) {
  ne("CB_ChunkApp_SearchResultNav", {
    direction: e,
    source: t,
    triggeredScan: n
  }, "both");
}
function uc(e) {
  ne("CB_ChunkApp_AdvancedSearchOpen", {
    source: e
  }, "both");
}
function dc(e) {
  const t = mc(e);
  if (t === "caveDepth") {
    return {
      kind: "underground"
    };
  } else if (t === "bottom") {
    return {
      kind: "fixed",
      y: $n
    };
  } else {
    return {
      kind: "surface",
      surfaceKind: "any"
    };
  }
}
function fc(e) {
  switch (e.kind) {
    case "surface":
      return "depth0";
    case "fixed":
      if (e.y === $n) {
        return "bottom";
      } else {
        return null;
      }
    case "underground":
      return "caveDepth";
  }
}
function mc(e) {
  const t = {};
  for (const o of e) {
    const s = Ri(o);
    t[s] = (t[s] ?? 0) + 1;
  }
  let n = "depth0";
  let r = 0;
  for (const o of Object.keys(t)) {
    const s = t[o] ?? 0;
    if (s > r) {
      n = o;
      r = s;
    }
  }
  return n;
}
const Ze = 16;
const Ae = Ze * 16;
function hc(e) {
  return {
    scanId: e,
    ringIndex: 0,
    tileIndex: 0,
    cursor: null,
    domain: null
  };
}
const xr = {
  firstCursor: ts,
  advanceCursor: Sc,
  coveredRadius: e => Math.max(0, e - Math.SQRT2) * Ae,
  isExhausted: () => false
};
function pc(e, t) {
  const n = ns(t);
  const r = Math.min(Math.max(e[0], n.minX), n.maxX);
  const o = Math.min(Math.max(e[1], n.minZ), n.maxZ);
  const s = Math.hypot(r - e[0], o - e[1]);
  const i = Math.hypot(Math.max(e[0] - n.minX, n.maxX - e[0]), Math.max(e[1] - n.minZ, n.maxZ - e[1]));
  const a = l => xr.coveredRadius(l - 1) > i;
  return {
    ...xr,
    firstCursor: l => a(l) || (l + 2) * Ae < s ? null : ts(l),
    isExhausted: a
  };
}
function gc(e, t) {
  const {
    originTileX: n,
    originTileZ: r
  } = rs(t);
  const o = new Set();
  const s = [];
  for (const [a, l] of e) {
    const f = Math.floor(a / Ze) - n;
    const c = Math.floor(l / Ze) - r;
    const p = `${f},${c}`;
    if (!o.has(p)) {
      o.add(p);
      s.push({
        dx: f,
        dz: c
      });
    }
  }
  const i = ({
    dx: a,
    dz: l
  }) => {
    const f = (n + a + 0.5) * Ae - t[0];
    const c = (r + l + 0.5) * Ae - t[1];
    return f * f + c * c;
  };
  s.sort((a, l) => i(a) - i(l) || a.dx - l.dx || a.dz - l.dz);
  return {
    firstCursor: a => a === 0 && s.length > 0 ? {
      ...s[0],
      idx: 0
    } : null,
    advanceCursor: (a, l) => {
      const f = (l.idx ?? 0) + 1;
      if (f < s.length) {
        return {
          ...s[f],
          idx: f
        };
      } else {
        return null;
      }
    },
    coveredRadius: a => a >= 0 ? Infinity : 0,
    isExhausted: a => a >= 1
  };
}
function Cr(e, t, n) {
  if (e.kind === "finite") {
    return gc(e.chunks, t);
  } else {
    return pc(t, n);
  }
}
let bc = 0;
async function yc(e) {
  const {
    signal: t,
    world: n,
    query: r,
    origin: o,
    worldBorder: s,
    maxInFlight: i,
    progress: a,
    adapter: l,
    shouldContinue: f
  } = e;
  const c = ns(s);
  const p = new AbortController();
  const g = () => p.abort();
  if (t.aborted) {
    p.abort();
  } else {
    t.addEventListener("abort", g);
  }
  const m = p.signal;
  const w = new Promise(j => {
    if (m.aborted) {
      j();
    } else {
      m.addEventListener("abort", () => j(), {
        once: true
      });
    }
  });
  const S = `scan-run-${++bc}`;
  let b = 0;
  let v = 0;
  let _ = false;
  const k = new Set();
  const T = new Map();
  let d = 0;
  let u = false;
  let y;
  let h = a.tileIndex;
  let x = a.cursor;
  let A = x === null;
  let O = null;
  const W = () => O.coveredRadius(a.ringIndex - 1);
  const U = () => y !== undefined || m.aborted ? true : l.isSuperseded() ? (u = true, true) : false;
  const K = () => m.aborted || l.isSuperseded();
  const Z = j => {
    if (j.length === 0 || l.isSuperseded()) {
      return;
    }
    const fe = l.ingestTileMatches(j);
    if (fe !== 0) {
      d += fe;
      if (!f({
        newResults: d,
        totalResults: l.getResultCount(),
        totalRadius: W()
      })) {
        p.abort();
      }
    }
  };
  const V = () => {
    a.ringIndex++;
    a.tileIndex = 0;
    h = 0;
    a.cursor = O.firstCursor(a.ringIndex);
    x = a.cursor;
    A = x === null;
    T.clear();
    l.setCoverage(W());
  };
  const F = () => {
    while (T.has(a.tileIndex)) {
      const j = T.get(a.tileIndex);
      T.delete(a.tileIndex);
      Z(j);
      a.cursor = a.cursor === null ? null : O.advanceCursor(a.ringIndex, a.cursor);
      a.tileIndex++;
      if (U()) {
        return;
      }
    }
  };
  try {
    if (a.domain === null) {
      if (r.anchor.kind !== "poi") {
        a.domain = {
          kind: "unbounded"
        };
      } else {
        try {
          const j = await Ke.getAnchorDomain({
            category: "search",
            isObsolete: K
          }, n, r);
          if (!j.isObsolete) {
            a.domain = j.value;
          }
        } catch (j) {
          y = j;
        }
      }
      if (a.domain !== null) {
        O = Cr(a.domain, o, s);
        a.cursor = O.firstCursor(0);
        x = a.cursor;
        A = x === null;
      }
    } else {
      O = Cr(a.domain, o, s);
    }
    while (!U() && O !== null && (F(), !U())) {
      if (A) {
        if (k.size > 0) {
          await Promise.race([...k, w]);
          continue;
        }
        F();
        if (U() || (V(), !f({
          newResults: d,
          totalResults: l.getResultCount(),
          totalRadius: W()
        })) || O.isExhausted(a.ringIndex)) {
          break;
        }
      }
      while (k.size >= i && (await Promise.race([...k, w]), F(), !U()));
      if (U()) {
        break;
      }
      if (x === null) {
        A = true;
        continue;
      }
      const j = h;
      h++;
      const fe = x;
      x = O.advanceCursor(a.ringIndex, x);
      A = x === null;
      const {
        originTileX: B,
        originTileZ: Re
      } = rs(o);
      const ye = (B + fe.dx) * Ze;
      const He = (Re + fe.dz) * Ze;
      const Te = ye * 16;
      const H = He * 16;
      if (Te + Ae < c.minX || Te > c.maxX || H + Ae < c.minZ || H > c.maxZ) {
        T.set(j, []);
        continue;
      }
      const me = Ke.scanTile({
        category: "search",
        isObsolete: K
      }, n, r, ye, He, Ze, S).then(Me => {
        if (!Me.isObsolete && !m.aborted) {
          T.set(j, Me.value);
          F();
        }
      }, Me => {
        if (y === undefined) {
          y = Me;
        }
        p.abort();
      }).finally(() => {
        k.delete(me);
      });
      k.add(me);
    }
  } finally {
    p.abort();
    t.removeEventListener("abort", g);
    Ke.cancelTask(S);
    if (O !== null && !O.isExhausted(a.ringIndex) && y === undefined && !u && a.cursor === null && a.tileIndex === h) {
      V();
    }
  }
  return {
    superseded: u,
    error: y,
    exhausted: O !== null && O.isExhausted(a.ringIndex),
    settled: Promise.allSettled(k).then(() => {})
  };
}
function ts(e) {
  if (e === 0) {
    return {
      dx: 0,
      dz: 0
    };
  } else {
    return {
      dx: e,
      dz: 0
    };
  }
}
function Sc(e, t) {
  const n = e;
  if (n === 0) {
    return null;
  }
  const {
    dx: r,
    dz: o
  } = t;
  let s;
  let i;
  let a;
  if (r >= 1 && o >= 0) {
    s = 0;
    i = r;
    a = o;
  } else if (o >= 1 && r <= 0) {
    s = 1;
    i = o;
    a = -r;
  } else if (r <= -1 && o <= 0) {
    s = 2;
    i = -r;
    a = -o;
  } else {
    s = 3;
    i = -o;
    a = r;
  }
  const l = (n - 1) * (n - 1);
  const f = n * n;
  if (i > 1 && (i - 1) * (i - 1) + a * a > l) {
    i--;
  } else if (a < n - 1) {
    a++;
    if (i * i + a * a > f) {
      i--;
    }
  } else {
    s++;
    if (s === 4) {
      return null;
    }
    i = n;
    a = 0;
  }
  switch (s) {
    case 0:
      return {
        dx: i,
        dz: a
      };
    case 1:
      return {
        dx: -a,
        dz: i
      };
    case 2:
      return {
        dx: -i,
        dz: -a
      };
    default:
      return {
        dx: a,
        dz: -i
      };
  }
}
function ns(e) {
  const t = e.size / 2;
  return {
    minX: e.centerX - t,
    maxX: e.centerX + t,
    minZ: e.centerZ - t,
    maxZ: e.centerZ + t
  };
}
function rs(e) {
  return {
    originTileX: Math.floor(e[0] / Ae),
    originTileZ: Math.floor(e[1] / Ae)
  };
}
const Er = Mi;
const os = {
  "includes-all": "every",
  "includes-any": "some",
  "excludes-all": "none",
  "limited-to": "some"
};
const vc = {
  in: "some",
  "not-in": "none"
};
function de() {
  return {
    pois: [],
    biomeSets: [],
    usesTerrainHeights: false
  };
}
function _c(e) {
  switch (e.kind) {
    case "poi-presence":
      return {
        ...de(),
        pois: [{
          poi: e.poi.type,
          part: "poi"
        }],
        biomeSets: e.biomeAtPos != null ? [{
          biomes: [e.biomeAtPos],
          requirement: "every",
          part: "biomes"
        }] : []
      };
    case "poi-cluster":
      return {
        ...de(),
        pois: e.members.map(t => ({
          poi: t.poi.type,
          part: "clusterMembers"
        }))
      };
    case "biome-filter":
      return {
        ...de(),
        biomeSets: [{
          biomes: e.biomes,
          requirement: os[e.mode],
          part: "biomes"
        }]
      };
    case "biome-variance":
      return de();
    case "terrain-height":
    case "flatness":
      return {
        ...de(),
        usesTerrainHeights: true
      };
    default:
      return Ue(e);
  }
}
function wc(e) {
  switch (e.kind) {
    case "anchor-biome":
      return {
        ...de(),
        biomeSets: [{
          biomes: e.biomes,
          requirement: vc[e.mode],
          part: "biomes"
        }]
      };
    case "anchor-terrain-height":
      return {
        ...de(),
        usesTerrainHeights: true
      };
    case "anchor-island":
      return {
        ...de(),
        biomeSets: e.mode === "any" ? [] : [{
          biomes: e.biomes,
          requirement: os[e.mode],
          part: "biomes"
        }]
      };
    default:
      return Ue(e);
  }
}
function kc(e) {
  switch (e.kind) {
    case "poi":
      return {
        ...de(),
        pois: [{
          poi: e.poi.type,
          part: "poi"
        }],
        biomeSets: e.biomesAtPos != null ? [{
          biomes: e.biomesAtPos,
          requirement: "some",
          part: "biomes"
        }] : []
      };
    case "cluster":
      return {
        ...de(),
        pois: e.members.map(t => ({
          poi: t.poi.type,
          part: "clusterMembers"
        }))
      };
    case "biome-patch":
      return {
        ...de(),
        biomeSets: [{
          biomes: e.biomes,
          requirement: "some",
          part: "biomes"
        }],
        scanHeight: e.scanHeight
      };
    default:
      return Ue(e);
  }
}
function Tc(e) {
  switch (e.kind) {
    case "spawn":
      return {
        ...de(),
        pois: [{
          poi: M.Spawn,
          part: "poi"
        }]
      };
    case "origin":
    case "custom":
      return de();
    default:
      return Ue(e);
  }
}
function* xc(e) {
  if ("anchorConditions" in e) {
    yield* Ec(e);
  } else {
    yield* Cc(e);
  }
}
function* Cc(e) {
  yield {
    dimension: e.dimension,
    refs: kc(e.anchor),
    subject: {
      at: "search-anchor",
      anchor: e.anchor
    }
  };
  yield* ss(e.regions, e.dimension);
}
function* Ec(e) {
  yield {
    refs: Tc(e.anchor),
    subject: {
      at: "seed-finder-anchor",
      anchor: e.anchor
    }
  };
  for (const [t, n] of Object.entries(e.anchorConditions)) {
    for (const r of n) {
      yield {
        dimension: t,
        refs: wc(r),
        subject: {
          at: "anchor-condition",
          condition: r
        }
      };
    }
  }
  for (const [t, n] of Object.entries(e.regions)) {
    yield* ss(n, t);
  }
}
function* ss(e, t) {
  for (const n of e) {
    const r = Ic(n.shape);
    for (const o of n.conditions) {
      yield {
        dimension: t,
        refs: _c(o),
        subject: {
          at: "region-condition",
          condition: o,
          reach: r
        }
      };
    }
  }
}
function Ic(e) {
  if (e.kind === "circle") {
    return e.radius;
  } else {
    return e.inradius;
  }
}
function is(e, t) {
  return ls(e, t, {
    checkDimensions: false
  });
}
function as(e, t) {
  return ls(e, t, {
    checkDimensions: true
  });
}
function ls(e, t, n) {
  const r = Array.from(xc(e));
  return Pc(r, t) ?? (n.checkDimensions ? Rc(r) : null) ?? Bc(r, t) ?? Fc(r, t);
}
const Ac = "Terrain height and flatness require Overworld 1.18 or newer.";
const cs = {
  [N.Overworld]: "the Overworld",
  [N.Nether]: "the Nether",
  [N.End]: "the End"
};
function Pc(e, t) {
  const n = new Set();
  const r = [];
  for (const s of e) {
    for (const i of s.refs.pois) {
      if (!n.has(i.poi)) {
        n.add(i.poi);
        if (!Xt(i.poi, t)) {
          r.push(i.poi);
        }
      }
    }
  }
  if (r.length === 0) {
    return null;
  }
  const o = r.map(s => {
    const i = Q[s];
    return i.fullLabel ?? i.label;
  });
  if (o.length === 1) {
    return `${o[0]} is not available in the selected version.`;
  } else {
    return `${o.slice(0, -1).join(", ")} and ${o[o.length - 1]} are not available in the selected version.`;
  }
}
function Rc(e) {
  for (const t of e) {
    const {
      dimension: n
    } = t;
    if (n != null) {
      for (const r of t.refs.pois) {
        const o = Mc(r.poi, n);
        if (o != null) {
          return o;
        }
      }
      for (const r of t.refs.biomeSets) {
        const o = Oc(r, n);
        if (o != null) {
          return o;
        }
      }
    }
  }
  return null;
}
function Mc(e, t) {
  const n = Q[e];
  if (n.dimension === t) {
    return null;
  } else {
    return `${n.fullLabel ?? n.label} does not generate in ${cs[t]}.`;
  }
}
function Oc(e, t) {
  if (e.biomes.length === 0) {
    return null;
  }
  switch (e.requirement) {
    case "every":
      {
        for (const n of e.biomes) {
          const r = Er(n);
          if (r != null && r.dimension !== t) {
            return Ir(r.name, t);
          }
        }
        return null;
      }
    case "some":
      {
        const n = e.biomes.map(o => Er(o));
        if (n.some(o => o == null || o.dimension === t)) {
          return null;
        } else {
          return Ir(n[0].name, t);
        }
      }
    case "none":
      return null;
    default:
      return Ue(e.requirement);
  }
}
function Ir(e, t) {
  return `${e} does not generate in ${cs[t]}.`;
}
function Bc(e, t) {
  for (const n of e) {
    if (!!n.refs.usesTerrainHeights && n.dimension != null && !To(t, n.dimension)) {
      return Ac;
    }
  }
  return null;
}
function Fc(e, t) {
  for (const n of e) {
    const {
      scanHeight: r
    } = n.refs;
    if (r?.kind === "surface" && r.surfaceKind === "land" && n.dimension != null && !To(t, n.dimension)) {
      return "Surface (on land) requires Overworld 1.18 or newer.";
    }
  }
  return null;
}
function Dc(e, t) {
  let n = null;
  let r = new Set();
  let o = new Set();
  let s = null;
  let i = Promise.resolve();
  let a = 0;
  const l = () => {
    s?.();
  };
  const f = () => {
    n = null;
    r = new Set();
    o = new Set();
  };
  async function c(S, b, v, _, k) {
    const T = ++a;
    s?.();
    await i;
    if (T !== a) {
      return "superseded";
    }
    try {
      const d = t().searchScanState;
      if (!d || !d.searchQuery) {
        return "stopped";
      }
      if (d.id !== S) {
        return "superseded";
      }
      const u = d.id;
      const y = d.searchQuery;
      const h = d.origin;
      const x = ge(Ve.getState());
      const A = is(y, x);
      if (A != null) {
        g(u, F => ({
          ...F,
          state: "error",
          errorKind: "incompatible-query",
          errorMessage: A,
          scanStartTime: undefined,
          scanEndTime: undefined
        }));
        return "error";
      }
      if (!n || n.scanId !== u) {
        n = hc(u);
        r = new Set();
        o = new Set();
      }
      const O = new AbortController();
      const W = () => O.abort();
      s = W;
      const U = () => O.abort();
      if (b.aborted) {
        O.abort();
      } else {
        b.addEventListener("abort", U);
      }
      g(u, F => ({
        ...F,
        state: "scanning",
        errorKind: undefined,
        errorMessage: undefined
      }));
      const K = {
        isSuperseded: () => (t().searchScanState?.id ?? -1) !== u,
        getResultCount: () => t().searchScanState?.results.length ?? 0,
        ingestTileMatches: F => w(u, h, F, _),
        setCoverage: F => {
          g(u, j => F > j.scanRadiusFullyCovered ? {
            ...j,
            scanRadiusFullyCovered: F
          } : j);
          k?.(F);
        }
      };
      const Z = yc({
        signal: O.signal,
        world: x,
        query: y,
        origin: h,
        worldBorder: t().worldBorder,
        maxInFlight: Math.max(1, Wt(t().concurrentWorkers, Gn(t())) - 1),
        progress: n,
        adapter: K,
        shouldContinue: v
      });
      i = Z.then(F => F.settled, () => {});
      let V;
      try {
        V = await Z;
      } catch (F) {
        V = {
          superseded: false,
          error: F,
          exhausted: false
        };
      } finally {
        b.removeEventListener("abort", U);
        if (s === W) {
          s = null;
        }
      }
      if (V.error !== undefined) {
        const F = V.error instanceof Error ? V.error : new Error(String(V.error));
        q(new Error("Scan failed", {
          cause: F
        }));
        if (T === a) {
          g(u, j => ({
            ...j,
            state: "error",
            errorKind: "unexpected",
            errorMessage: F.message,
            scanStartTime: undefined,
            scanEndTime: undefined
          }));
        }
        return "error";
      }
      if (!V.superseded && T === a) {
        g(u, F => F.state === "scanning" ? {
          ...F,
          state: b.aborted ? "timeout" : "idle",
          scanStartTime: undefined,
          scanEndTime: undefined
        } : F);
      }
      if (V.superseded) {
        return "superseded";
      } else if (V.exhausted) {
        return "completed";
      } else {
        return "stopped";
      }
    } finally {
      if (T === a) {
        g(S, d => d.foregroundScan ? {
          ...d,
          foregroundScan: false
        } : d);
      }
    }
  }
  async function p(S, b) {
    const v = st.EXTEND;
    const _ = Date.now();
    const k = _ + v.MAX;
    b(_, k);
    const T = wn(v.MAX);
    try {
      await c(S, T.signal, ({
        totalResults: d
      }) => d < _e, () => {});
    } finally {
      T.dispose();
    }
  }
  function g(S, b) {
    const v = t().searchScanState;
    if (!v || v.id !== S) {
      return;
    }
    const _ = b(v);
    if (_ !== v) {
      e({
        searchScanState: _
      });
    }
  }
  function m(S, b) {
    if (S.anchor.kind !== "poi") {
      return qe();
    }
    const v = b.anchorPois[0];
    let _ = v;
    let k = 1;
    while (o.has(_)) {
      _ = `${v}/${k}`;
      k++;
    }
    o.add(_);
    return _;
  }
  function w(S, b, v, _) {
    const k = t().searchScanState;
    if (!k || k.id !== S) {
      return 0;
    }
    const T = [];
    for (const u of v) {
      if (u.dedupeKey !== undefined) {
        if (r.has(u.dedupeKey)) {
          continue;
        }
        r.add(u.dedupeKey);
      }
      const y = u.worldX - b[0];
      const h = u.worldZ - b[1];
      T.push({
        id: m(k.searchQuery, u),
        worldX: u.worldX,
        worldZ: u.worldZ,
        worldY: u.worldY,
        distance: Math.round(Math.sqrt(y * y + h * h)),
        chunk: u.chunk,
        data: u.data,
        dedupeKey: u.dedupeKey,
        anchorPois: u.anchorPois,
        regionPois: u.regionPois
      });
    }
    if (T.length === 0) {
      return 0;
    }
    T.sort((u, y) => u.distance - y.distance);
    const d = k.results.length;
    e({
      searchScanState: {
        ...k,
        results: [...k.results, ...T].slice(0, _e)
      }
    });
    for (let u = 0; u < T.length; u++) {
      _(T[u], d + u);
    }
    return T.length;
  }
  return {
    advanceScan: c,
    runTimedBackgroundScan: p,
    updateScanState: g,
    stopCurrentScan: l,
    resetScanBuffers: f
  };
}
function wn(e) {
  const t = new AbortController();
  const n = new Set();
  const r = o => {
    if (t.signal.aborted) {
      return;
    }
    const s = setTimeout(() => {
      n.delete(s);
      t.abort();
    }, o);
    n.add(s);
  };
  r(e);
  return {
    signal: t.signal,
    abortAfter: r,
    dispose() {
      for (const o of n) {
        clearTimeout(o);
      }
      n.clear();
    }
  };
}
function Nc(e) {
  const t = e?.filledArea;
  return typeof e == "object" && e !== null && e.type === "biome-patch" && typeof e.bounds == "object" && typeof t == "object" && t !== null && typeof t.blocks == "number" && typeof t.kind == "string";
}
const Et = [64, 64, 64, 64];
function Vc(e, t, n) {
  const r = e.getView().getResolution() ?? 1;
  const o = t.anchor;
  const s = Wo([n.worldX, n.worldZ]);
  const i = Lc(e, s, t, n);
  switch (o.kind) {
    case "cluster":
      {
        const a = o.radius.meters;
        const l = Math.max(i, kn(e, s, [n.worldX - a, n.worldZ - a, n.worldX + a, n.worldZ + a]));
        const f = Lt(o.members.map(c => c.poi.type));
        return he(r, l, f);
      }
    case "biome-patch":
      {
        if (!Nc(n.data)) {
          return he(r, i, Infinity);
        }
        const {
          minX: a,
          minZ: l,
          maxX: f,
          maxZ: c
        } = n.data.bounds;
        const p = Math.max(i, kn(e, s, [a, l, f, c]));
        return he(r, p, Infinity);
      }
    case "poi":
      {
        const a = Lt([o.poi.type]);
        return he(r, i, a);
      }
  }
}
function Lc(e, t, n, r) {
  let o = 0;
  for (const s of n.regions) {
    o = Math.max(o, s.shape.kind === "circle" ? s.shape.radius : s.shape.inradius);
  }
  if (o === 0) {
    return -Infinity;
  } else {
    return kn(e, t, [r.worldX - o, r.worldZ - o, r.worldX + o, r.worldZ + o]);
  }
}
function kn(e, t, n) {
  const r = e.getView();
  const o = e.getSize();
  if (!o) {
    return -Infinity;
  }
  const s = (o[0] - Et[1] - Et[3]) / 2;
  const i = (o[1] - Et[0] - Et[2]) / 2;
  if (s <= 0 || i <= 0) {
    return -Infinity;
  }
  const [a, l, f, c] = Wl(n);
  const p = r.getRotation();
  const g = Math.cos(p);
  const m = Math.sin(p);
  let w = 0;
  for (const [S, b] of [[a, l], [a, c], [f, l], [f, c]]) {
    const v = S - t[0];
    const _ = b - t[1];
    const k = g * v + m * _;
    const T = -m * v + g * _;
    w = Math.max(w, Math.abs(k) / s, Math.abs(T) / i);
  }
  if (Number.isFinite(w)) {
    return w;
  } else {
    return -Infinity;
  }
}
function zc(e, t, n) {
  const [r, o, s, i] = e;
  return Math.hypot((s - r) / 2 * t * n, (i - o) / 2 * t * n);
}
function Uc(e) {
  const t = e.getSize();
  if (t) {
    return Hl(e.getView().calculateExtent(t));
  } else {
    return null;
  }
}
function jc(e, t) {
  if (!Number.isFinite(e) || !Number.isFinite(t) || e <= 0 || t <= 0) {
    return 1;
  } else {
    return t / e;
  }
}
function Hc(e, t) {
  const n = e.getView().getResolution() ?? 1;
  const r = he(n, t.min ?? -Infinity, t.max ?? Infinity);
  return {
    changed: r !== n,
    currentResolution: n,
    resolution: r
  };
}
const Wc = (e, t) => {
  let n = null;
  let r = 1;
  const {
    advanceScan: o,
    runTimedBackgroundScan: s,
    updateScanState: i,
    stopCurrentScan: a,
    resetScanBuffers: l
  } = Dc(e, t);
  function f(g, m) {
    t().showPois(Gl(m));
    t().setDimension(m.dimension);
    if (m.anchor.kind === "biome-patch") {
      t().setShowBiomes(true);
      const w = fc(m.anchor.scanHeight);
      if (w != null) {
        t().setBiomeHeight(w);
      }
    }
  }
  function c(g, m) {
    const w = g.getView().getCenter();
    const S = w != null ? jl(w) : [t().center.x, t().center.z];
    const b = ut(t().dimension, m.dimension);
    return [Math.round(S[0] * b), Math.round(S[1] * b)];
  }
  function p(g, m, w) {
    f(g, m);
    g.getView().animate({
      center: Wo([w.worldX, w.worldZ]),
      resolution: Vc(g, m, w),
      duration: yr
    });
    e({
      selectedFeature: ma(m, w)
    });
  }
  return {
    searchUiState: "off",
    recentSearches: [],
    advancedSearchBetaDismissed: false,
    openSearch(g) {
      if (!pe(t()).disableSearch) {
        if (t().searchUiState === "off") {
          oc(g);
          e({
            searchUiState: "select"
          });
          n?.();
          n = $c(() => t().closeSearch());
        } else {
          t().openSearchSelect();
        }
      }
    },
    closeSearch() {
      a();
      l();
      n?.();
      e(g => ({
        searchUiState: "off",
        searchScanState: undefined,
        selectedFeature: g.selectedFeature?.type === "searchOrigin" || g.selectedFeature?.type === "searchResult" ? null : g.selectedFeature
      }));
    },
    openSearchSelect() {
      e({
        searchUiState: "select"
      });
    },
    closeSearchSelect() {
      if (t().searchScanState == null) {
        t().closeSearch();
      } else {
        e({
          searchUiState: "idle"
        });
      }
    },
    openScanResults() {
      e({
        searchUiState: "results"
      });
    },
    closeScanResults() {
      e({
        searchUiState: "idle"
      });
    },
    openAdvancedSearch(g) {
      uc(g);
      e({
        searchUiState: "advanced"
      });
    },
    closeAdvancedSearch() {
      if (t().searchScanState == null) {
        t().closeSearch();
      } else {
        e({
          searchUiState: "idle"
        });
      }
    },
    async startScan(g, m, w) {
      const S = Uc(g);
      if (S == null) {
        return;
      }
      sc(m, w);
      const b = performance.now();
      let v = null;
      a();
      const [_, k, T, d] = S;
      const u = ut(t().dimension, m.dimension);
      const y = [Math.round((_ + T) / 2 * u), Math.round((k + d) / 2 * u)];
      let h = 1;
      const x = ++r;
      let A = "";
      try {
        A = Ul(m);
      } catch (H) {
        q(H);
        A = qe();
      }
      e({
        searchUiState: "idle",
        searchScanState: {
          id: x,
          searchQuery: m,
          results: [],
          selectedResult: undefined,
          origin: y,
          scanRadiusFullyCovered: 0,
          state: "scanning",
          foregroundScan: true
        },
        recentSearches: [{
          id: A,
          query: m
        }, ...t().recentSearches.filter(H => H.id !== A)].slice(0, pa)
      });
      f(g, m);
      if (Xl(m)) {
        const {
          currentResolution: H,
          resolution: Y,
          changed: me
        } = Hc(g, {
          max: Lt([m.anchor.poi.type])
        });
        if (me) {
          h = jc(H, Y);
          g.getView().animate({
            resolution: Y
          }, {
            duration: yr
          });
        }
      }
      const O = wn(st.INITIAL.MAX);
      const W = zc(S, u, h);
      let U = false;
      let K = false;
      let Z = false;
      let V = false;
      let F = 0;
      let j = 0;
      const fe = () => {
        if (!V && !!K && !!Z) {
          V = true;
          O.abortAfter(st.INITIAL.TRAILING);
        }
      };
      let B;
      try {
        B = await o(x, O.signal, ({
          totalResults: H
        }) => H < _e, (H, Y) => {
          K = true;
          F = Math.max(F, Y + 1);
          if (v === null) {
            v = performance.now() - b;
          }
          fe();
          if (U) {
            return;
          }
          U = true;
          const me = t().searchScanState;
          if (x === me?.id) {
            e({
              searchScanState: {
                ...me,
                selectedResult: Y,
                foregroundScan: false
              }
            });
            p(g, m, H);
          }
        }, H => {
          j = Math.max(j, H);
          if (H >= W) {
            Z = true;
            fe();
          }
        });
      } finally {
        O.dispose();
      }
      const Re = O.signal.aborted || B === "completed";
      const ye = t().searchScanState;
      if (B !== "superseded" && (ye == null || ye.id === x)) {
        const H = Math.min(F, _e);
        const Y = B === "error" ? "error" : H > 0 ? "results" : Re ? "no-results" : "stopped";
        ic(m, w, {
          outcome: Y,
          nrResults: H,
          timeToFirstResultMs: v,
          durationMs: performance.now() - b,
          radiusCovered: j
        });
      }
      const Te = ye?.id === x && ye.errorKind === "incompatible-query";
      if ((!K && Re || Te) && t().searchUiState === "idle") {
        t().openScanResults();
      }
    },
    stopScan(g) {
      if (g != null && t().searchScanState?.state === "scanning") {
        cc(g);
      }
      a();
      const m = t().searchScanState;
      if (m && m.state !== "idle") {
        e({
          searchScanState: {
            ...m,
            state: "idle",
            scanStartTime: undefined,
            scanEndTime: undefined
          }
        });
      }
    },
    prevScanResult(g, m) {
      const w = t().searchScanState;
      if (w?.selectedResult == null) {
        return;
      }
      Tr("prev", m, false);
      const S = Math.max(0, w.selectedResult - 1);
      if (S !== w.selectedResult) {
        e({
          searchScanState: {
            ...w,
            selectedResult: S
          }
        });
      }
      p(g, w.searchQuery, w.results[S]);
    },
    async nextScanResult(g, m) {
      const w = t().searchScanState;
      if (w == null) {
        return;
      }
      const S = (w.selectedResult ?? -1) + 1;
      Tr("next", m, S >= w.results.length);
      const b = () => {
        let v;
        i(w.id, _ => {
          v = _.results[S];
          if (v) {
            return {
              ..._,
              selectedResult: S,
              foregroundScan: false
            };
          } else {
            return _;
          }
        });
        if (v) {
          p(g, w.searchQuery, v);
        }
      };
      if (S < w.results.length) {
        b();
      } else if (w.results.length < _e) {
        t().stopScan();
        let v = false;
        i(w.id, k => ({
          ...k,
          foregroundScan: true
        }));
        const _ = wn(st.NEXT.MAX);
        try {
          await o(w.id, _.signal, ({
            totalResults: k
          }) => k < _e, () => {
            if (!v && t().searchScanState?.id === w.id) {
              v = true;
              _.abortAfter(st.NEXT.TRAILING);
              b();
            }
          });
        } finally {
          _.dispose();
        }
      }
    },
    async extendScan() {
      const g = t().searchScanState;
      if (g != null && !(g.results.length >= _e)) {
        ac(g.searchQuery);
        t().stopScan();
        await s(g.id, (m, w) => {
          e(() => ({
            searchScanState: {
              ...g,
              state: "scanning",
              errorKind: undefined,
              errorMessage: undefined,
              foregroundScan: false,
              scanStartTime: m,
              scanEndTime: w
            }
          }));
        });
      }
    },
    async restartScanFromViewportCenter(g) {
      const m = t().searchScanState;
      if (m == null) {
        return;
      }
      lc(m.searchQuery);
      const w = c(g, m.searchQuery);
      t().stopScan();
      f(g, m.searchQuery);
      const S = ++r;
      await s(S, (b, v) => {
        e(_ => ({
          searchUiState: "results",
          selectedFeature: ha(_.selectedFeature, m),
          searchScanState: {
            ...m,
            id: S,
            results: [],
            selectedResult: undefined,
            origin: w,
            scanRadiusFullyCovered: 0,
            state: "scanning",
            errorKind: undefined,
            errorMessage: undefined,
            foregroundScan: false,
            scanStartTime: b,
            scanEndTime: v
          }
        }));
      });
    },
    selectScanResult(g, m) {
      const w = t().searchScanState;
      if (w != null && !(m < 0) && !(m >= w.results.length)) {
        e({
          searchScanState: {
            ...w,
            selectedResult: m
          }
        });
        p(g, w.searchQuery, w.results[m]);
      }
    },
    dismissAdvancedSearchBeta() {
      e({
        advancedSearchBetaDismissed: true
      });
    }
  };
};
const Gc = () => ({
  recentSearches: G(e => Array.isArray(e) && e.every(t => typeof t == "object" && t !== null && typeof t.id == "string" && Ql(t.query))),
  advancedSearchBetaDismissed: G(e => typeof e == "boolean")
});
function $c(e) {
  const t = ge(Ve.getState());
  const n = Ve.subscribe(() => {
    if (ge(Ve.getState()) !== t) {
      n();
      e();
    }
  });
  return n;
}
const an = 50;
const Xc = 50;
const Dt = 1000;
const It = 300000;
const Jc = 250;
function Kc() {
  if (typeof window === "undefined" || !window.__E2E__) {
    return null;
  }
  const e = new URLSearchParams(window.location.hash.slice(1)).get("e2eSeeds");
  if (e) {
    return {
      kind: "list",
      seeds: e.split(",")
    };
  } else {
    return null;
  }
}
const Jm = {
  [N.Overworld]: "Overworld",
  [N.Nether]: "The Nether",
  [N.End]: "The End"
};
function Nt(e, t) {
  switch (e.kind) {
    case "poi":
      if (e.poi) {
        return Q[e.poi.type].dimension;
      } else {
        return t;
      }
    case "biome-patch":
      return Zc(e.biomes, t);
    case "cluster":
      if (e.members[0]) {
        return Q[e.members[0].poi.type].dimension;
      } else {
        return t;
      }
  }
}
function Zc(e, t) {
  return ht.find(n => n?.id === e[0])?.dimension ?? t;
}
const us = 1;
const Km = 128;
const ds = 2048;
const Yc = 128;
const Qc = 1;
const qc = 512;
const eu = {
  meters: Yc,
  threeD: false
};
const fs = 1;
const tu = 1;
const nu = 999;
const Zm = 8;
const Ym = 2;
const ru = 2;
const ou = 64;
const Qm = 1;
const su = 1;
const iu = 99;
const qm = 60;
const eh = 90;
const au = -64;
const lu = 319;
function ms(e) {
  return nt(e, us, ds);
}
function er(e) {
  return {
    ...e,
    reach: ms(e.reach)
  };
}
function cu(e) {
  return nt(e, Qc, qc);
}
function Yt(e) {
  return {
    ...e,
    meters: cu(e.meters)
  };
}
function hs(e) {
  return nt(e, tu, nu);
}
function ps(e) {
  return nt(e, ru, ou);
}
function uu(e) {
  return nt(e, su, iu);
}
function Ar(e) {
  return nt(e, au, lu);
}
function nt(e, t, n) {
  if (Number.isFinite(e)) {
    return he(Math.round(e), t, n);
  } else {
    return t;
  }
}
function du() {
  return {
    poi: null,
    biomesAtPos: []
  };
}
function fu() {
  return {
    biomes: [],
    minPatchChunks: fs,
    surface: "surface",
    surfaceMode: "auto"
  };
}
function mu() {
  return {
    members: [],
    radius: {
      ...eu
    }
  };
}
function hu(e = N.Overworld) {
  return {
    anchorKind: "poi",
    poiAnchor: du(),
    biomePatchAnchor: fu(),
    clusterAnchor: mu(),
    filters: [],
    dimension: e
  };
}
const th = [{
  value: "surface",
  label: "Surface",
  hint: "Include ocean floors."
}, {
  value: "surface-land",
  label: "Surface (on land)",
  hint: "Exclude submerged terrain below sea level."
}, {
  value: "underground",
  label: "Underground",
  hint: "Height with most cave biomes."
}, {
  value: "bottom",
  label: "Bottom (Y -51)",
  hint: "Common deep dark layer."
}];
const nh = {
  surface: "at the surface",
  "surface-land": "on land",
  underground: "underground",
  bottom: "at the bottom"
};
function pu(e) {
  switch (e) {
    case "surface":
      return {
        kind: "surface",
        surfaceKind: "any"
      };
    case "surface-land":
      return {
        kind: "surface",
        surfaceKind: "land"
      };
    case "underground":
      return {
        kind: "underground"
      };
    case "bottom":
      return {
        kind: "fixed",
        y: $n
      };
  }
}
function gs(e) {
  if (e.kind === "surface") {
    if (e.surfaceKind === "land") {
      return "surface-land";
    } else {
      return "surface";
    }
  } else if (e.kind === "underground") {
    return "underground";
  } else {
    return "bottom";
  }
}
function bs(e) {
  return gs(dc(e));
}
function rh(e, t) {
  return {
    ...e,
    biomes: t,
    surface: e.surfaceMode === "auto" ? bs(t) : e.surface
  };
}
function oh(e, t) {
  return {
    ...e,
    surface: t,
    surfaceMode: "manual"
  };
}
function gu(e) {
  const t = er(e);
  if (t.shape === "circle") {
    return {
      kind: "circle",
      radius: t.reach
    };
  } else {
    return {
      kind: "square",
      inradius: t.reach
    };
  }
}
function bu(e) {
  const t = e.kind === "circle" ? e.radius : e.inradius;
  return {
    shape: e.kind,
    reach: ms(t)
  };
}
function yu(e) {
  const t = er(e);
  return `${t.shape}:${t.reach}`;
}
function sh(e) {
  const t = hu(e.dimension);
  t.anchorKind = e.anchor.kind;
  switch (e.anchor.kind) {
    case "poi":
      t.poiAnchor = {
        poi: e.anchor.poi,
        biomesAtPos: e.anchor.biomesAtPos ?? []
      };
      break;
    case "biome-patch":
      {
        const n = gs(e.anchor.scanHeight);
        t.biomePatchAnchor = {
          biomes: e.anchor.biomes,
          minPatchChunks: hs(Math.round((e.anchor.minPatchSize ?? fs * 256) / 256)),
          surface: n,
          surfaceMode: n === bs(e.anchor.biomes) ? "auto" : "manual"
        };
        break;
      }
    case "cluster":
      t.clusterAnchor = {
        members: e.anchor.members.map(n => ({
          ...n
        })),
        radius: Yt(e.anchor.radius)
      };
      break;
    default:
      Ue(e.anchor);
  }
  t.filters = e.regions.flatMap(n => {
    const r = bu(n.shape);
    return n.conditions.map(o => ({
      id: qe(),
      region: {
        ...r
      },
      condition: Su(o)
    }));
  });
  return t;
}
function Su(e) {
  const t = Rt(structuredClone(e));
  if (t.kind === "biome-variance") {
    return {
      kind: "biome-variance",
      count: ps(t.count),
      ...(t.sampleGrid !== undefined ? {
        sampleGrid: t.sampleGrid
      } : {})
    };
  } else if (t.kind === "poi-presence") {
    return {
      ...t,
      minAmount: uu(t.minAmount)
    };
  } else if (t.kind === "poi-cluster") {
    return {
      ...t,
      radius: Yt(t.radius)
    };
  } else if (t.kind === "terrain-height") {
    return tr(t);
  } else {
    return t;
  }
}
function Qt(e) {
  if (e.kind === "biome-variance") {
    return Rt({
      ...e,
      comparator: "at-least",
      count: ps(e.count)
    });
  } else if (e.kind === "poi-cluster") {
    return {
      ...e,
      radius: Yt(e.radius)
    };
  } else if (e.kind === "terrain-height") {
    return Rt(tr(e));
  } else {
    return Rt(e);
  }
}
function tr(e) {
  const t = e.minY == null ? undefined : Ar(e.minY);
  const n = e.maxY == null ? undefined : Ar(e.maxY);
  const r = {
    ...e
  };
  if (t != null && n != null && t > n) {
    r.minY = n;
    r.maxY = t;
    return r;
  } else {
    if (t == null) {
      delete r.minY;
    } else {
      r.minY = t;
    }
    if (n == null) {
      delete r.maxY;
    } else {
      r.maxY = n;
    }
    return r;
  }
}
function vu(e) {
  switch (e.anchorKind) {
    case "poi":
      return {
        kind: "poi",
        poi: e.poiAnchor.poi ?? {
          type: Pu()
        },
        ...(e.poiAnchor.biomesAtPos.length > 0 ? {
          biomesAtPos: e.poiAnchor.biomesAtPos
        } : {})
      };
    case "biome-patch":
      {
        const t = pu(e.biomePatchAnchor.surface);
        return {
          kind: "biome-patch",
          biomes: e.biomePatchAnchor.biomes,
          scanHeight: t.kind === "fixed" ? {
            kind: "fixed",
            y: t.y
          } : t,
          minPatchSize: hs(e.biomePatchAnchor.minPatchChunks) * 256
        };
      }
    case "cluster":
      return {
        kind: "cluster",
        members: e.clusterAnchor.members.map(t => ({
          ...t
        })),
        radius: Yt(e.clusterAnchor.radius)
      };
  }
}
function ys(e) {
  switch (e.anchorKind) {
    case "poi":
      return Nt({
        kind: "poi",
        poi: e.poiAnchor.poi
      }, e.dimension);
    case "biome-patch":
      return Nt({
        kind: "biome-patch",
        biomes: e.biomePatchAnchor.biomes
      }, e.dimension);
    case "cluster":
      return Nt({
        kind: "cluster",
        members: e.clusterAnchor.members
      }, e.dimension);
  }
}
function _u(e, t) {
  if (!Eu(e)) {
    return null;
  }
  const n = ys(e);
  if (wu(e, n)) {
    return {
      kind: "mixed-dimension-pois",
      dimension: n
    };
  }
  if (t?.world != null) {
    const r = is(Tu(e), t.world);
    if (r != null) {
      return {
        kind: "incompatible-query",
        message: r
      };
    }
  }
  return null;
}
function wu(e, t) {
  return Iu(e).some(n => Au(n, t) !== t);
}
function nr(e) {
  switch (e.kind) {
    case "poi-presence":
      return e.minAmount < 1;
    case "poi-cluster":
      return !Ss(e.members);
    case "biome-filter":
      return e.biomes.length < 1;
    case "biome-variance":
      return e.comparator === "at-least" && e.count <= 1;
    case "terrain-height":
      return e.minY == null && e.maxY == null;
    case "flatness":
      return false;
  }
}
function ku(e) {
  const t = new Set();
  const n = [];
  for (const r of e) {
    const o = JSON.stringify(r);
    if (!t.has(o)) {
      t.add(o);
      n.push(r);
    }
  }
  return n;
}
function Tu(e) {
  const t = new Map();
  for (const r of e.filters) {
    const o = Qt(r.condition);
    if (nr(o)) {
      continue;
    }
    const s = yu(r.region);
    const i = t.get(s);
    if (i) {
      i.conditions.push(o);
    } else {
      t.set(s, {
        region: er(r.region),
        conditions: [o]
      });
    }
  }
  const n = Array.from(t.values()).map(({
    region: r,
    conditions: o
  }) => ({
    shape: gu(r),
    conditions: ku(o)
  })).filter(r => r.conditions.length > 0).sort((r, o) => Pr(r.shape) - Pr(o.shape));
  return {
    anchor: vu(e),
    regions: n,
    dimension: ys(e)
  };
}
function Pr(e) {
  if (e.kind === "circle") {
    return e.radius;
  } else {
    return e.inradius;
  }
}
function xu(e) {
  return e.reduce((t, n) => t + Math.max(0, n.minAmount), 0);
}
function Ss(e) {
  return xu(e) >= 2;
}
function ih(e, t) {
  if (_u(e, t) != null) {
    return false;
  } else {
    return Cu(e);
  }
}
function Cu(e) {
  switch (e.anchorKind) {
    case "poi":
      return e.poiAnchor.poi != null;
    case "biome-patch":
      return e.biomePatchAnchor.biomes.length > 0;
    case "cluster":
      return Ss(e.clusterAnchor.members);
  }
}
function Eu(e) {
  switch (e.anchorKind) {
    case "poi":
      return e.poiAnchor.poi != null;
    case "biome-patch":
      return e.biomePatchAnchor.biomes.length > 0;
    case "cluster":
      return e.clusterAnchor.members.length > 0;
  }
}
function Iu(e) {
  const t = [];
  switch (e.anchorKind) {
    case "poi":
      if (e.poiAnchor.poi) {
        t.push(e.poiAnchor.poi);
      }
      break;
    case "cluster":
      t.push(...e.clusterAnchor.members.map(n => n.poi));
      break;
  }
  for (const n of e.filters) {
    const {
      condition: r
    } = n;
    if (r.kind === "poi-presence") {
      t.push(r.poi);
    } else if (r.kind === "poi-cluster") {
      t.push(...r.members.map(o => o.poi));
    }
  }
  return t;
}
function Au(e, t) {
  return Nt({
    kind: "poi",
    poi: e
  }, t);
}
function Pu() {
  return "village";
}
const Ru = [N.Overworld, N.Nether];
const ah = 60;
const lh = 100;
const ch = 1000;
function Rr(e) {
  return {
    id: qe(),
    condition: e
  };
}
function vs(e) {
  switch (e.kind) {
    case "anchor-biome":
      return e.biomes.length < 1;
    case "anchor-terrain-height":
      return e.minY == null && e.maxY == null;
    case "anchor-island":
      return false;
  }
}
const Mu = 128;
function Mr() {
  return {
    anchorConditions: [],
    nearbyFilters: []
  };
}
function Fe(e, t = null) {
  return {
    version: e,
    versionUiGroup: t,
    anchorKind: "spawn",
    custom: {
      x: 0,
      z: 0
    },
    dimensions: {
      [N.Overworld]: Mr(),
      [N.Nether]: Mr()
    }
  };
}
function Se(e, t = Mu) {
  return {
    id: qe(),
    region: {
      shape: "square",
      reach: t
    },
    condition: e
  };
}
const Ou = {
  [N.Overworld]: M.Village,
  [N.Nether]: M.NetherFortress
};
function uh(e, t) {
  const n = r => Q[r.type].dimension === t ? r : {
    type: Ou[t]
  };
  if (e.kind === "poi-presence") {
    return {
      ...e,
      poi: n(e.poi)
    };
  } else if (e.kind === "poi-cluster") {
    return {
      ...e,
      members: e.members.map(r => ({
        ...r,
        poi: n(r.poi)
      }))
    };
  } else {
    return e;
  }
}
function dh(e, t) {
  const {
    anchorConditions: n,
    nearbyFilters: r
  } = e.dimensions[t];
  const o = n.filter(i => !vs(i.condition)).length;
  const s = r.filter(i => !nr(Qt(i.condition))).length;
  return o + s;
}
function _s(e) {
  return he(Math.round(e), us, ds);
}
function Bu(e) {
  const t = _s(e.region.reach);
  return {
    shape: e.region.shape === "circle" ? {
      kind: "circle",
      radius: t
    } : {
      kind: "square",
      inradius: t
    },
    conditions: [Qt(e.condition)]
  };
}
function Fu(e) {
  const t = new Map();
  for (const n of e) {
    const r = Qt(n.condition);
    if (nr(r)) {
      continue;
    }
    const o = _s(n.region.reach);
    const s = `${n.region.shape}:${o}`;
    const i = t.get(s);
    if (i) {
      i.conditions.push(r);
    } else {
      t.set(s, Bu(n));
    }
  }
  return Array.from(t.values()).sort((n, r) => Or(n) - Or(r));
}
function Or(e) {
  if (e.shape.kind === "circle") {
    return e.shape.radius;
  } else {
    return e.shape.inradius;
  }
}
function Br(e) {
  return he(Math.round(e), _a, yo);
}
function Du(e) {
  const t = Br(e.minChunks);
  const n = Br(e.maxChunks);
  const r = e.mode !== "any" && e.biomes.length === 0 ? "any" : e.mode;
  const o = {
    kind: "anchor-island",
    mode: r,
    biomes: r === "any" ? [] : e.biomes,
    minChunks: Math.min(t, n),
    maxChunks: Math.max(t, n)
  };
  if (e.sampleGrid !== undefined && e.sampleGrid !== Qe) {
    o.sampleGrid = e.sampleGrid;
  }
  return o;
}
function Nu(e) {
  switch (e.kind) {
    case "anchor-biome":
      return e;
    case "anchor-terrain-height":
      return tr(e);
    case "anchor-island":
      return Du(e);
  }
}
function Vu(e) {
  return e.map(t => t.condition).filter(t => !vs(t)).map(Nu);
}
function Lu(e) {
  switch (e.anchorKind) {
    case "spawn":
      return {
        kind: "spawn"
      };
    case "origin":
      return {
        kind: "origin"
      };
    case "custom":
      return {
        kind: "custom",
        x: Math.round(e.custom.x),
        z: Math.round(e.custom.z)
      };
  }
}
function ws(e) {
  const t = {};
  const n = {};
  for (const r of Ru) {
    const o = e.dimensions[r];
    const s = Vu(o.anchorConditions);
    const i = Fu(o.nearbyFilters);
    if (s.length > 0) {
      t[r] = s;
    }
    if (i.length > 0) {
      n[r] = i;
    }
  }
  return {
    anchor: Lu(e),
    anchorConditions: t,
    regions: n
  };
}
function Fr(e) {
  return JSON.stringify(ws(e));
}
function zu(e) {
  const t = as(ws(e), ce[e.version].cb3World);
  if (t == null) {
    return null;
  } else {
    return {
      kind: "incompatible-query",
      message: t
    };
  }
}
function fh(e) {
  return zu(e) == null;
}
const Uu = [{
  id: "island-settlement",
  name: "Island Settlement",
  icon: "🏝️",
  description: "Spawn on island with Village nearby",
  makeDraft: (e, t) => {
    const n = Fe(e, t);
    n.anchorKind = "spawn";
    n.dimensions[N.Overworld].anchorConditions = [Rr({
      kind: "anchor-island",
      mode: "any",
      biomes: [],
      minChunks: 1,
      maxChunks: 500,
      sampleGrid: 16
    })];
    n.dimensions[N.Overworld].nearbyFilters = [Se({
      kind: "poi-presence",
      poi: {
        type: M.Village
      },
      minAmount: 1
    }, 160)];
    return n;
  }
}, {
  id: "village-cluster",
  name: "Village Cluster",
  icon: "🏘️",
  description: "3+ Villages near spawn",
  makeDraft: (e, t) => {
    const n = Fe(e, t);
    n.anchorKind = "spawn";
    n.dimensions[N.Overworld].nearbyFilters = [Se({
      kind: "poi-presence",
      poi: {
        type: M.Village
      },
      minAmount: 3
    }, 220)];
    return n;
  }
}, {
  id: "speedrun",
  name: "Speedrun",
  icon: "🏃",
  description: "Plains Village & Nether structures near spawn",
  makeDraft: (e, t) => {
    const n = Fe(e, t);
    n.anchorKind = "spawn";
    n.dimensions[N.Overworld].nearbyFilters = [Se({
      kind: "poi-presence",
      poi: {
        type: M.Village,
        variantId: "plains"
      },
      minAmount: 1
    }, 112)];
    n.dimensions[N.Nether].nearbyFilters = [Se({
      kind: "poi-presence",
      poi: {
        type: M.NetherFortress
      },
      minAmount: 1
    }, 192), Se({
      kind: "poi-presence",
      poi: {
        type: M.BastionRemnant
      },
      minAmount: 1
    }, 192)];
    return n;
  }
}, {
  id: "mushroom-origin",
  name: "Mushroom Origin",
  icon: "🍄",
  description: "Large mushroom island at 0/0",
  makeDraft: (e, t) => {
    const n = Fe(e, t);
    n.anchorKind = "origin";
    n.dimensions[N.Overworld].anchorConditions = [Rr({
      kind: "anchor-island",
      mode: "limited-to",
      biomes: [Oi.id, Bi.id],
      minChunks: 500,
      maxChunks: yo,
      sampleGrid: 16
    })];
    return n;
  }
}, {
  id: "sulfur-breach",
  name: "Sulfur Breach",
  icon: "🌋",
  description: "Exposed Sulfur Caves biome near spawn",
  makeDraft: (e, t) => {
    const n = Fe(e, t);
    n.anchorKind = "spawn";
    n.dimensions[N.Overworld].nearbyFilters = [Se({
      kind: "biome-filter",
      mode: "includes-all",
      biomes: [Vt.id],
      sampleGrid: 16,
      scanHeight: {
        kind: "surface",
        surfaceKind: "land"
      }
    }, 64)];
    return n;
  }
}, {
  id: "strange-new-world",
  name: "Strange New World",
  icon: "⛺",
  description: "Sulfur Cave, Abandoned Camp, and Dappled Forest near spawn",
  makeDraft: (e, t) => {
    const n = Fe(e, t);
    n.anchorKind = "spawn";
    n.dimensions[N.Overworld].nearbyFilters = [Se({
      kind: "poi-presence",
      poi: {
        type: M.AbandonedCamp,
        variantId: "copperChest"
      },
      minAmount: 1
    }, 256), Se({
      kind: "biome-filter",
      mode: "includes-all",
      biomes: [Vn.id],
      sampleGrid: 16
    }, 256), Se({
      kind: "poi-presence",
      poi: {
        type: M.Cave
      },
      biomeAtPos: Vt.id,
      minAmount: 1
    }, 256)];
    return n;
  }
}];
function ju(e) {
  const t = Fr(e);
  return Uu.find(n => Fr(n.makeDraft(e.version, e.versionUiGroup)) === t)?.id ?? null;
}
function rt(e) {
  if (e <= 0) {
    return 0;
  } else {
    return Qn(Math.ceil(e));
  }
}
function ks(e, t) {
  const n = rr(e);
  return {
    searchType: e.anchor.kind,
    preset: Hu(t),
    nrConditions: n.length,
    pois: Gu(e),
    nrBiomes: $u(n),
    dimension: Xu(e)
  };
}
function Hu(e) {
  if (e == null) {
    return "unknown";
  }
  try {
    return ju(e) ?? "custom";
  } catch {
    return "unknown";
  }
}
function rr(e) {
  return [...Object.values(e.anchorConditions).flat(), ...Object.values(e.regions).flat().flatMap(t => t.conditions)];
}
function Wu(e) {
  return e.kind.startsWith("anchor-");
}
function Gu(e) {
  const t = [];
  for (const n of Object.values(e.regions)) {
    for (const r of n) {
      for (const o of r.conditions) {
        if (o.kind === "poi-presence") {
          t.push(Q[o.poi.type].shortId);
        } else if (o.kind === "poi-cluster") {
          t.push(...o.members.map(s => Q[s.poi.type].shortId));
        }
      }
    }
  }
  return t.join("");
}
function $u(e) {
  const t = new Set();
  for (const n of e) {
    if ("biomes" in n) {
      n.biomes.forEach(r => t.add(r));
    }
    if ("biomeAtPos" in n && n.biomeAtPos != null) {
      t.add(n.biomeAtPos);
    }
  }
  return t.size;
}
function Xu(e) {
  const t = new Set([...Object.keys(e.anchorConditions), ...Object.keys(e.regions)]);
  if (t.size === 0) {
    return "none";
  } else if (t.size > 1) {
    return "both";
  } else {
    return [...t][0];
  }
}
function Ju(e) {
  return rr(e).map(t => t.kind);
}
function Ku(e) {
  return rr(e).flatMap(t => Wu(t) ? t.kind === "anchor-island" ? [t.sampleGrid ?? Qe] : [] : bo(t) ? [t.sampleGrid ?? Qe] : []);
}
function Zu(e, t) {
  const n = ks(e, t);
  Le("seed finder scan", {
    searchType: n.searchType,
    preset: n.preset,
    nrConditions: n.nrConditions
  });
  ne("CB_ChunkApp_SeedFinderScan", {
    ...n,
    condition_kinds: Ju(e),
    sample_grids: Ku(e)
  }, "posthog");
}
function Yu(e, t, n) {
  ne("CB_ChunkApp_SeedFinderScanEnd", {
    ...ks(e, t),
    outcome: n.outcome,
    ...(n.errorKind !== undefined && {
      errorKind: n.errorKind
    }),
    nrResults: rt(n.nrResults),
    seedsScanned: rt(n.scannedCount),
    durationMs: rt(n.activeMs),
    timeToFirstResultMs: n.timeToFirstResultMs == null ? -1 : rt(n.timeToFirstResultMs),
    seedsPerSec: n.activeMs > 0 ? rt(n.scannedCount / n.activeMs * 1000) : 0
  }, "both");
}
function mh(e, t) {
  ne("CB_ChunkApp_SeedFinderRunAction", {
    action: e,
    source: t
  }, "both");
}
function hh(e) {
  ne("CB_ChunkApp_SeedFinderPreset", {
    preset: e
  }, "both");
}
function ph(e, t) {
  ne("CB_ChunkApp_SeedFinderMapSetting", {
    setting: e,
    ...(t !== undefined && {
      value: t
    })
  }, "both");
}
function gh(e, t) {
  ne("CB_ChunkApp_SeedFinderResultAction", {
    action: e,
    source: t
  }, "both");
}
function bh(e, t, n) {
  ne("CB_ChunkApp_SeedFinderResultNav", {
    direction: e,
    source: t,
    triggeredScan: n
  }, "both");
}
function yh(e) {
  ne("CB_ChunkApp_SeedFinderDraftAction", {
    action: e
  }, "both");
}
function Gt(e, t = Date.now()) {
  return e.activeScanMs + (e.scanningSince === undefined ? 0 : t - e.scanningSince);
}
const Dr = 5000;
let ln = null;
function Tn() {
  ln ??= zi(() => import("./uq9uWlUPAtC4.js"), []).catch(e => {
    ln = null;
    throw e;
  });
  return ln;
}
async function Qu(e) {
  try {
    await Tn();
  } catch (n) {
    q(new Error("Seed search failed to load", {
      cause: n
    }));
    return null;
  }
  const t = ce[e.version];
  return {
    searchId: e.id,
    worldWithoutSeed: t.cb3World,
    seedSource: {
      kind: "random",
      use32Bit: !!t.use32BitSeed
    },
    listCursor: 0,
    seenSeeds: new Set(e.results.map(n => n.seed)),
    overflow: []
  };
}
function cn(e) {
  if (e.scanningSince === undefined) {
    return e;
  } else {
    return {
      ...e,
      activeScanMs: Gt(e),
      scanningSince: undefined
    };
  }
}
const qu = (e, t) => {
  let n = 0;
  let r = null;
  let o = null;
  let s = null;
  let i = null;
  let a = 0;
  let l = null;
  let f = null;
  let c = null;
  let p = -1;
  function g(d, u) {
    Yu(d.query, d.sourceDraft, {
      outcome: u,
      errorKind: d.errorKind,
      nrResults: d.results.length,
      scannedCount: d.scannedCount,
      activeMs: d.activeScanMs,
      timeToFirstResultMs: c?.searchId === d.id ? c.ms : null
    });
  }
  function m(d, u) {
    const y = t().seedSearchState;
    if (y?.id === d && p !== d) {
      p = d;
      g(y, u);
    }
  }
  function w(d, {
    totalResults: u,
    deadline: y,
    now: h
  }) {
    if (y === undefined || typeof document === "undefined") {
      return;
    }
    l ??= document.title;
    f = d;
    const x = Math.max(0, y - h);
    const A = Math.ceil(x / Dr) * Dr / 1000;
    const O = Math.floor(A / 60);
    const W = A % 60;
    const U = `⚡ ${u} · ${O}:${W.toString().padStart(2, "0")} - ${l}`;
    if (document.title !== U) {
      document.title = U;
    }
  }
  function S(d) {
    if (l !== null && typeof document !== "undefined" && (d === undefined || d === f)) {
      if (document.title !== l) {
        document.title = l;
      }
      l = null;
      f = null;
    }
  }
  function b(d, u) {
    const y = t().seedSearchState;
    if (!y || y.id !== d) {
      return;
    }
    const h = u(y);
    if (h !== y) {
      e({
        seedSearchState: h
      });
    }
  }
  function v(d, u, y) {
    const h = t().seedSearchState;
    if (!h || h.id !== d) {
      return;
    }
    if (u.seedSource.kind === "list") {
      u.listCursor = Math.min(u.listCursor + y.scannedCount, u.seedSource.seeds.length);
    }
    const x = [];
    for (const Z of y.matches) {
      if (!u.seenSeeds.has(Z.seed)) {
        u.seenSeeds.add(Z.seed);
        x.push(Z);
      }
    }
    const A = he(x.length, 0, h.resultLimit - h.results.length);
    const O = A > 0 ? [...h.results, ...x.slice(0, A)] : h.results;
    if (h.results.length === 0 && O.length > 0) {
      c = {
        searchId: d,
        ms: Gt(h)
      };
    }
    const W = Dt - O.length - u.overflow.length;
    if (x.length > A && W > 0) {
      u.overflow.push(...x.slice(A, A + W));
    }
    const U = h.state === "scanning";
    const K = U && h.results.length === 0 && O.length > 0 ? 0 : U && i?.searchId === d && i.index < O.length ? i.index : undefined;
    if (K !== undefined) {
      i = null;
    }
    e({
      seedSearchState: {
        ...h,
        scannedCount: h.scannedCount + y.scannedCount,
        results: O,
        selectedResult: K ?? h.selectedResult
      }
    });
    if (K !== undefined) {
      k(O[K]);
    }
  }
  function _() {
    const d = t().seedSearchState;
    if (d == null) {
      return;
    }
    const u = ce[t().version].cb3World;
    const y = t().seedSearchShowAllPois ? Object.values(M).filter(h => Xt(h, u)) : $l(d.query);
    t().showExactlyPois(y);
  }
  function k(d) {
    const u = t().seedSearchState;
    if (u != null && u.version !== t().version) {
      t().setVersion(u.version, null);
    }
    t().setSeed(d.seed);
    const y = t().dimension;
    const [h, x] = Xn(d.anchorX, d.anchorZ, y);
    t().goToDimensionAndCenter(y, h, x);
    _();
  }
  async function T(d) {
    const u = ++a;
    const {
      searchId: y
    } = d;
    const {
      runSeedScanLoop: h
    } = await Tn();
    if (u !== a || t().seedSearchState?.id !== y || t().seedSearchState?.state !== "scanning" || d.seedSource.kind === "list" && s !== null && (await s, u !== a || t().seedSearchState?.id !== y || t().seedSearchState?.state !== "scanning")) {
      return;
    }
    const x = new AbortController();
    o = () => x.abort();
    const A = t().seedSearchState;
    const O = Date.now();
    const W = O + Math.max(0, A.timeoutMs - Gt(A, O));
    const U = h({
      signal: x.signal,
      worldWithoutSeed: d.worldWithoutSeed,
      query: A.query,
      deadline: W,
      getMaxInFlight: () => Wt(t().concurrentWorkers, Gn(t())),
      seedSource: d.seedSource.kind === "list" ? {
        kind: "list",
        seeds: d.seedSource.seeds.slice(d.listCursor)
      } : d.seedSource,
      batchBudgetMs: Jc,
      adapter: {
        isSuperseded: () => (t().seedSearchState?.id ?? -1) !== y,
        ingestBatch: V => v(y, d, V),
        getResultCount: () => t().seedSearchState?.results.length ?? 0,
        onProgress: V => w(u, V),
        onLateError: V => q(new Error("Seed search batch failed after the run ended", {
          cause: V
        }))
      },
      shouldContinue: ({
        totalResults: V
      }) => {
        const F = t().seedSearchState;
        return F?.id === y && V < F.resultLimit;
      }
    });
    s = U;
    const K = await U.finally(() => S(u));
    const Z = u === a;
    if (Z) {
      o = null;
    }
    if (K.error !== undefined) {
      const V = K.error instanceof Error ? K.error : new Error(String(K.error));
      q(new Error("Seed search failed", {
        cause: V
      }));
      if (Z) {
        b(y, F => ({
          ...cn(F),
          state: "error",
          errorKind: "unexpected",
          errorMessage: V.message
        }));
        m(y, "error");
      }
      return;
    }
    if (Z && !K.superseded) {
      const V = t().seedSearchState?.id === y && t().seedSearchState?.state === "scanning";
      const F = K.timedOut ? "timeout" : "done";
      b(y, j => j.state === "scanning" ? {
        ...cn(j),
        state: F
      } : j);
      if (V) {
        m(y, F);
      }
    }
  }
  return {
    seedSearchFavorites: [],
    seedSearchShowAllPois: false,
    async startSeedSearch(d, u) {
      o?.();
      i = null;
      c = null;
      const y = t().version;
      const h = ce[y];
      const x = ++n;
      Zu(d, u);
      const A = as(d, h.cb3World);
      if (A != null) {
        r = null;
        e({
          selectedFeature: Mt(t().selectedFeature),
          seedSearchFavorites: [],
          seedSearchState: {
            id: x,
            query: d,
            version: y,
            results: [],
            resultLimit: an,
            timeoutMs: It,
            selectedResult: undefined,
            scannedCount: 0,
            activeScanMs: 0,
            state: "error",
            errorKind: "incompatible-query",
            errorMessage: A,
            sourceDraft: u
          }
        });
        m(x, "error");
        return;
      }
      try {
        await Tn();
      } catch (O) {
        q(new Error("Seed search failed to load", {
          cause: O
        }));
        if (x !== n) {
          return;
        }
        r = null;
        e({
          selectedFeature: Mt(t().selectedFeature),
          seedSearchFavorites: [],
          seedSearchState: {
            id: x,
            query: d,
            version: y,
            results: [],
            resultLimit: an,
            timeoutMs: It,
            selectedResult: undefined,
            scannedCount: 0,
            activeScanMs: 0,
            state: "error",
            errorKind: "load-failed",
            errorMessage: "The search could not be loaded. Check your connection and try again.",
            sourceDraft: u
          }
        });
        m(x, "error");
        return;
      }
      if (x === n) {
        r = {
          searchId: x,
          worldWithoutSeed: h.cb3World,
          seedSource: Kc() ?? {
            kind: "random",
            use32Bit: !!h.use32BitSeed
          },
          listCursor: 0,
          seenSeeds: new Set(),
          overflow: []
        };
        e({
          selectedFeature: Mt(t().selectedFeature),
          seedSearchFavorites: [],
          seedSearchState: {
            id: x,
            query: d,
            version: y,
            results: [],
            resultLimit: an,
            timeoutMs: It,
            selectedResult: undefined,
            scannedCount: 0,
            activeScanMs: 0,
            scanningSince: Date.now(),
            state: "scanning",
            sourceDraft: u
          }
        });
        await T(r);
      }
    },
    async extendSeedSearch(d) {
      const u = t().seedSearchState;
      let y = r;
      if (u == null || u.state !== "done" && u.state !== "timeout" || u.version !== t().version || u.results.length >= Dt) {
        return;
      }
      if (y?.searchId !== u.id) {
        y = await Qu(u);
        if (y == null || t().seedSearchState !== u) {
          return;
        }
        r = y;
        p = u.id;
      }
      const h = Math.min(u.results.length + Xc, Dt);
      const x = y.overflow.splice(0, h - u.results.length);
      const A = [...u.results, ...x];
      const O = A.length >= h;
      const W = d?.advanceSelection && x.length > 0 ? u.results.length : undefined;
      i = d?.advanceSelection && x.length === 0 ? {
        searchId: u.id,
        index: u.results.length
      } : null;
      b(u.id, U => O ? {
        ...U,
        resultLimit: h,
        results: A,
        selectedResult: W ?? U.selectedResult,
        state: "done"
      } : {
        ...U,
        resultLimit: h,
        results: A,
        selectedResult: W ?? U.selectedResult,
        timeoutMs: U.activeScanMs + It,
        state: "scanning",
        scanningSince: Date.now()
      });
      if (W !== undefined) {
        k(A[W]);
      }
      if (!O) {
        await T(y);
      }
    },
    stopSeedSearch() {
      i = null;
      const d = t().seedSearchState;
      b(d?.id ?? -1, u => u.state === "scanning" ? {
        ...cn(u),
        state: "done"
      } : u);
      if (d?.state === "scanning") {
        m(d.id, "stopped");
      }
      o?.();
      S();
    },
    selectSeedSearchResult(d) {
      const u = t().seedSearchState;
      if (u != null) {
        if (d === undefined || !(d < 0) && !(d >= u.results.length)) {
          i = null;
          e({
            seedSearchState: {
              ...u,
              selectedResult: d
            },
            selectedFeature: _o(t().selectedFeature)
          });
          if (d !== undefined) {
            k(u.results[d]);
          }
        }
      }
    },
    toggleSeedSearchFavorite(d) {
      const u = t().seedSearchState;
      if (u == null || !u.results.some(h => h.seed === d)) {
        return;
      }
      const y = t().seedSearchFavorites;
      e({
        seedSearchFavorites: y.includes(d) ? y.filter(h => h !== d) : [...y, d]
      });
    },
    setSeedSearchShowAllPois(d) {
      if (t().seedSearchShowAllPois !== d) {
        e({
          seedSearchShowAllPois: d
        });
        _();
      }
    }
  };
};
const ed = e => typeof e == "string" && mt(e);
const td = L({
  kind: te("biome-variance"),
  count: D,
  sampleGrid: le(Je)
});
function nd(e) {
  if (Jt(e) && e.kind === "biome-variance") {
    return td(e);
  } else {
    return Qo(e);
  }
}
const rd = L({
  id: tt,
  region: L({
    shape: we({
      square: true,
      circle: true
    }),
    reach: D
  }),
  condition: nd
});
const od = L({
  id: tt,
  condition: es
});
const Nr = L({
  anchorConditions: se(od),
  nearbyFilters: se(rd)
});
const or = L({
  version: ed,
  versionUiGroup: e => e === null || typeof e == "string",
  anchorKind: we({
    spawn: true,
    origin: true,
    custom: true
  }),
  custom: L({
    x: D,
    z: D
  }),
  dimensions: L({
    [N.Overworld]: Nr,
    [N.Nether]: Nr
  })
});
const sd = e => ({
  seedFinderDraft: Fe(Kn(Object.keys(ce))),
  setSeedFinderDraft(t) {
    e({
      seedFinderDraft: t
    });
  }
});
const id = () => ({
  seedFinderDraft: G(or)
});
const ad = e => (...t) => {
  const n = Wn(e);
  const r = {
    ...Nl(...t),
    ...la(...t),
    ...al(...t),
    ...nl(...t),
    ...sa(...t),
    ...Ca(...t),
    ...Oa(...t),
    ...Ga(...t),
    ...Wc(...t),
    ...qu(...t),
    ...sd(...t),
    config: e
  };
  return pn(r, n);
};
function un(e, t, n) {
  const r = {
    ...e,
    ...t
  };
  if (e.pois && t.pois) {
    if (n.poiMode === "disable-previous") {
      r.pois = {
        ...Object.fromEntries(Object.entries(e.pois).map(([o]) => [o, false])),
        ...t.pois
      };
    } else if (n.poiMode === "merge") {
      r.pois = {
        ...e.pois,
        ...t.pois
      };
    }
  }
  if (t.selectedFeature !== undefined) {
    Object.assign(r, gn(r, t.selectedFeature));
  }
  return r;
}
const Ye = 1;
const Vr = {
  1: e => {
    const n = Object.entries({
      momentumPanning: true,
      enableRotation: true,
      fadeInBiomeTiles: true,
      copyCoordinatesWithTp: true,
      poiClusterRadius: 3,
      concurrentWorkers: "auto",
      worldBorder: {
        centerX: 0,
        centerZ: 0,
        size: 59999968
      }
    }).filter(([r, o]) => r in e && !Ee(e[r], o)).map(([r]) => r);
    return {
      ...e,
      _userConfiguredSettings: n
    };
  }
};
function ld(e) {
  let t = e;
  for (let n = (e.version ?? 0) + 1; n <= Ye; n++) {
    if (Vr[n] != null) {
      t = {
        version: n,
        state: Vr[n](t.state)
      };
    }
  }
  return t;
}
function Ts(e, t, n) {
  const {
    noTrailing: r = false,
    noLeading: o = false,
    debounceMode: s = undefined
  } = n || {};
  let i;
  let a = false;
  let l = 0;
  function f() {
    if (i) {
      window.clearTimeout(i);
    }
  }
  function c(g) {
    const {
      upcomingOnly: m = false
    } = g || {};
    f();
    a = !m;
  }
  function p(...g) {
    const m = this;
    const w = Date.now() - l;
    if (a) {
      return;
    }
    function S() {
      l = Date.now();
      t.apply(m, g);
    }
    function b() {
      i = undefined;
    }
    if (!o && s && !i) {
      S();
    }
    f();
    if (s === undefined && w > e) {
      if (o) {
        l = Date.now();
        if (!r) {
          i = window.setTimeout(s ? b : S, e);
        }
      } else {
        S();
      }
    } else if (r !== true) {
      i = window.setTimeout(s ? b : S, s === undefined ? e - w : e);
    }
  }
  p.cancel = c;
  return p;
}
function cd(e) {
  if (e != null && e.state !== "error") {
    return {
      id: 0,
      query: e.query,
      version: e.version,
      results: e.results,
      resultLimit: e.resultLimit,
      timeoutMs: e.timeoutMs,
      scannedCount: e.scannedCount,
      activeScanMs: Gt(e),
      state: e.state === "timeout" ? "timeout" : "done",
      sourceDraft: e.sourceDraft
    };
  }
}
const ud = e => typeof e == "string" && mt(e);
const Lr = L({
  poiId: tt,
  poi: Xo,
  chunk: e => Array.isArray(e) && e.length === 2 && e.every(D),
  poiData: e => true
});
const dd = L({
  x: D,
  z: D,
  y: le(D),
  radius: D,
  members: se(Kt),
  witnessCount: D
});
const fd = L({
  bounds: L({
    minX: D,
    maxX: D,
    minZ: D,
    maxZ: D
  }),
  filledArea: L({
    blocks: D,
    kind: we({
      exact: true,
      "lower-bound": true,
      estimate: true
    })
  })
});
const md = L({
  seed: tt,
  anchorX: D,
  anchorZ: D,
  anchorPois: se(Lr),
  regionPois: lt(se(Lr)),
  clusters: lt(se(dd)),
  islands: lt(se(fd))
});
const hd = e => se(md)(e) && e.length <= Dt;
const pd = L({
  id: D,
  query: ec,
  version: ud,
  results: hd,
  resultLimit: D,
  timeoutMs: D,
  scannedCount: D,
  activeScanMs: D,
  state: we({
    done: true,
    timeout: true
  }),
  sourceDraft: le(or)
});
function gd(e) {
  if (typeof e != "object" || e === null || !("sourceDraft" in e) || or(e.sourceDraft)) {
    return e;
  }
  const t = {
    ...e
  };
  delete t.sourceDraft;
  return t;
}
const bd = () => ({
  seedSearchState: {
    load: e => G(pd).load(gd(e)),
    save: cd
  },
  seedSearchFavorites: G(se(tt)),
  seedSearchShowAllPois: G(e => typeof e == "boolean")
});
const yd = 1000;
const Sd = "Connection to Indexed Database server lost";
let xn = null;
function vd(e) {
  xn = e;
}
function _d(e) {
  return e instanceof Error && e.message.includes(Sd);
}
let zr = false;
function We(e, t) {
  if (_d(t)) {
    xn?.("safari-idb");
    ne("CB_ChunkApp_SafariIdbStoragePersistenceError");
    return;
  }
  Le(`storage ${e} error `, {
    message: t instanceof Error ? t.message : null
  });
  if (!zr) {
    zr = true;
    q(new Error(`storage ${e} error`, {
      cause: t
    }));
  }
  xn?.("generic");
}
function Ur(e, t, n) {
  let r = null;
  const o = fo(() => ({
    async getItem(c) {
      try {
        return (await Vi(c)) || null;
      } catch (p) {
        We("getItem", p);
        return null;
      }
    },
    async setItem(c, p) {
      if (r !== p) {
        try {
          await Ni(c, p);
        } catch (g) {
          We("setItem", g);
          return;
        }
        r = p;
      }
    },
    async removeItem(c) {
      try {
        await Di(c);
      } catch (p) {
        We("removeItem", p);
        return;
      }
    }
  }));
  const s = {
    async getItem(c) {
      let p;
      try {
        p = await o?.getItem(c);
      } catch (S) {
        We("getItem", S);
        return null;
      }
      if (!p || p.version == null) {
        return null;
      }
      const g = ld(p);
      const m = new Set(Object.keys(t));
      const w = Object.keys(g.state ?? {}).filter(S => !m.has(S));
      if (w.length > 0) {
        ne("CB_ChunkApp_StoreUnrecognizedPropsDropped", {
          keys: w
        });
      }
      return {
        version: Math.min(g.version ?? 0, Ye),
        state: Object.fromEntries(Object.keys(t).map(S => {
          const b = g.state[S];
          if (b == null) {
            return false;
          }
          const v = t[S]?.load(b);
          if (v?.isValid) {
            return [S, v.value];
          } else {
            q(new Error(`store validation error: ${S}`));
            return false;
          }
        }).filter(Boolean))
      };
    },
    async setItem(c, {
      version: p,
      state: g
    }) {
      const m = Object.fromEntries(Object.keys(t).map(w => {
        const S = w;
        const b = t[S];
        const v = g[S];
        return [w, v === undefined || b?.save == null ? v : b.save(v)];
      }));
      try {
        await o?.setItem(c, {
          version: p,
          state: m
        });
      } catch (w) {
        We("setItem", w);
      }
    },
    async removeItem(c) {
      try {
        await o?.removeItem(c);
      } catch (p) {
        We("removeItem", p);
      }
    }
  };
  async function i(c) {
    const p = await s?.getItem(c);
    return p ?? {
      version: Ye,
      state: n?.() ?? {}
    };
  }
  async function a(c, p) {
    await s.setItem(c, p);
  }
  const l = Ts(yd, a, {
    noLeading: false,
    noTrailing: false
  });
  async function f(c) {
    await s.removeItem(c);
  }
  return {
    key: e,
    loadState: i,
    saveState: l,
    clearState: f
  };
}
const wd = {
  ...vn(),
  ...$a(),
  ...Ea(),
  ...ca(),
  ...ll(),
  ...rl(),
  ...wo(),
  ...Gc()
};
const kd = {
  ...id(),
  ...bd(),
  version: wo().version,
  concurrentWorkers: vn().concurrentWorkers,
  _userConfiguredSettings: vn()._userConfiguredSettings
};
const Td = {
  "seed-map": Ur("cb3finder-storage", wd, Cd),
  "seed-finder": Ur("cb3seedfinder-storage", kd)
};
function xd(e) {
  return Td[e];
}
function Cd() {
  const e = {};
  try {
    const t = it("cb_finder_lastseed");
    if (t != null) {
      e.seed = t;
    }
    const n = it("cb_finder_lastplatform");
    if (n != null && mt(n)) {
      e.version = n;
    }
    const r = it("cb_finder_lastpois");
    if (r != null) {
      const s = JSON.parse(r);
      if (s?.pois && Array.isArray(s.pois?.on) && Array.isArray(s.pois?.off)) {
        const i = Object.values(M);
        e.pois = Object.fromEntries([...s.pois.on.map(a => [`${a}`, true]), ...s.pois.off.map(a => [`${a}`, false])].filter(([a]) => i.includes(a)));
        if (s.pois.on.includes("biomes")) {
          e.showBiomes = true;
        } else if (s.pois.off.includes("biomes")) {
          e.showBiomes = false;
        }
      }
    }
    const o = it("CB3_MAP_DATA");
    if (o != null) {
      const s = JSON.parse(o);
      if (qn(s)) {
        e.markedPois = s;
      } else {
        q(new Error("Invalid marked pois in localstorage"));
      }
    }
  } catch (t) {
    q(new Error("localStorage error", {
      cause: t
    }));
  }
  return e;
}
const Ed = 1000;
const xs = {
  ...Ba(),
  ...Xa(),
  ...ia(),
  ...Ia(),
  ...ua()
};
const Id = Ts(Ed, Ad, {
  noLeading: true,
  noTrailing: false
});
function Ad(e) {
  const t = Rd(e);
  if (t !== window.location.href) {
    window.history.replaceState(null, "", t);
  }
}
function Cs() {
  const e = window.location.hash.slice(1);
  return Od(e);
}
function Pd(e) {
  return Li(window, "hashchange", () => {
    const t = Cs();
    e(t);
  });
}
function Rd(e, t = false) {
  const n = Md(e, t);
  const r = new URL(window.location.href);
  r.hash = n;
  return r.toString();
}
function Md(e, t) {
  if (!e.config) {
    return "";
  }
  const n = pe(e);
  const r = {};
  Object.entries(xs).forEach(([, s]) => {
    if (s.includeInUrl(n, t)) {
      Object.assign(r, s.stateToSearchParams(e));
    }
  });
  const o = Object.fromEntries(Object.entries(r).filter(([s, i]) => i != null));
  return new URLSearchParams(o).toString();
}
function Od(e) {
  if (e.length > 0 && !e.includes("seed=")) {
    return Bd(e);
  }
  const n = Object.fromEntries(new URLSearchParams(e).entries());
  const r = {};
  Object.entries(xs).forEach(([, o]) => {
    Object.assign(r, o.searchParamsToState(n));
  });
  return r;
}
function Bd(e) {
  return {
    seed: e
  };
}
const Fd = typeof window !== "undefined" ? qi : e => e;
let Ve;
function Dd(e) {
  if (Ve != null && typeof window !== "undefined") {
    throw new Error("store can only be replaced on server");
  }
  Ve = Nd(e);
}
if (typeof window !== "undefined") {
  const e = document.getElementById("finder-app-config");
  if (!e) {
    throw new Error("config element not found");
  }
  const t = JSON.parse(e.dataset.config);
  Dd(t);
  window.__cbGetAppStateForDiagnostics = () => {
    const n = Ve.getState();
    return {
      hasHydrated: n.hasHydrated,
      initializationFailures: n.initializationFailures,
      showBiomes: n.showBiomes,
      dimBiomes: n.dimBiomes,
      renderTerrain: n.renderTerrain,
      dimension: n.dimension,
      resolution: n.resolution,
      version: n.version
    };
  };
}
function Nd(e) {
  const t = Wn(e);
  const n = t.storageProfile != null ? xd(t.storageProfile) : null;
  const r = Wi(Ki(Yi(Fd(ad(e), {
    name: n?.key ?? "cb3finder-storage",
    version: Ye,
    migrate: (o, s) => {
      q(new Error("store version mismatch. expected " + Ye + ", got " + s));
      return o;
    },
    onRehydrateStorage: o => async (s, i) => {
      if (i) {
        q(i);
      }
      if (await o.onHydrate()) {
        if (!t.disableRouting) {
          Pd(l => {
            const f = pn(l, pe(r.getState()));
            r.setState(un(r.getState(), f, {
              poiMode: "disable-previous"
            }));
          });
        }
      }
    },
    merge: (o, s) => {
      const i = o.fromStorage != null ? un(s, o.fromStorage, {
        poiMode: "merge"
      }) : s;
      const a = un(i, o.fromUrl, {
        poiMode: "disable-previous"
      });
      return pn(a, pe(s));
    },
    storage: {
      async getItem(o) {
        const s = t.disableRouting ? {} : Cs();
        if (Object.keys(s).length > 0) {
          ne("CB_ChunkApp_LaunchedWithRoute", {
            parameterCount: Object.keys(s).length
          });
        }
        const i = n == null ? {
          version: Ye,
          state: null
        } : await n.loadState(o);
        return {
          version: i.version,
          state: {
            fromStorage: i.state,
            fromUrl: s
          }
        };
      },
      async setItem(o, s) {
        if (Ll(s.state)) {
          if (n != null) {
            await n.saveState(o, s);
          }
          if (!t.disableRouting) {
            Id(s.state);
          }
        }
      },
      async removeItem(o) {
        await n?.clearState(o);
      }
    }
  })), {
    enabled: false
  }));
  vd(() => {
    r.getState().showUiAlert("storagePersistenceError");
  });
  return r;
}
function Es(e) {
  var t;
  var n;
  var r = "";
  if (typeof e == "string" || typeof e == "number") {
    r += e;
  } else if (typeof e == "object") {
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) {
        if (e[t] && (n = Es(e[t]))) {
          if (r) {
            r += " ";
          }
          r += n;
        }
      }
    } else {
      for (n in e) {
        if (e[n]) {
          if (r) {
            r += " ";
          }
          r += n;
        }
      }
    }
  }
  return r;
}
function Ie() {
  var e;
  var t;
  for (var n = 0, r = "", o = arguments.length; n < o; n++) {
    if ((e = arguments[n]) && (t = Es(e))) {
      if (r) {
        r += " ";
      }
      r += t;
    }
  }
  return r;
}
const Vd = (e, t) => {
  const n = new Array(e.length + t.length);
  for (let r = 0; r < e.length; r++) {
    n[r] = e[r];
  }
  for (let r = 0; r < t.length; r++) {
    n[e.length + r] = t[r];
  }
  return n;
};
const Ld = (e, t) => ({
  classGroupId: e,
  validator: t
});
const Is = (e = new Map(), t = null, n) => ({
  nextPart: e,
  validators: t,
  classGroupId: n
});
const $t = "-";
const jr = [];
const zd = "arbitrary..";
const Ud = e => {
  const t = Hd(e);
  const {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: i => {
      if (i.startsWith("[") && i.endsWith("]")) {
        return jd(i);
      }
      const a = i.split($t);
      const l = a[0] === "" && a.length > 1 ? 1 : 0;
      return As(a, l, t);
    },
    getConflictingClassGroupIds: (i, a) => {
      if (a) {
        const l = r[i];
        const f = n[i];
        if (l) {
          if (f) {
            return Vd(f, l);
          } else {
            return l;
          }
        } else {
          return f || jr;
        }
      }
      return n[i] || jr;
    }
  };
};
const As = (e, t, n) => {
  if (e.length - t === 0) {
    return n.classGroupId;
  }
  const o = e[t];
  const s = n.nextPart.get(o);
  if (s) {
    const f = As(e, t + 1, s);
    if (f) {
      return f;
    }
  }
  const i = n.validators;
  if (i === null) {
    return;
  }
  const a = t === 0 ? e.join($t) : e.slice(t).join($t);
  const l = i.length;
  for (let f = 0; f < l; f++) {
    const c = i[f];
    if (c.validator(a)) {
      return c.classGroupId;
    }
  }
};
const jd = e => e.slice(1, -1).indexOf(":") === -1 ? undefined : (() => {
  const t = e.slice(1, -1);
  const n = t.indexOf(":");
  const r = t.slice(0, n);
  if (r) {
    return zd + r;
  } else {
    return undefined;
  }
})();
const Hd = e => {
  const {
    theme: t,
    classGroups: n
  } = e;
  return Wd(n, t);
};
const Wd = (e, t) => {
  const n = Is();
  for (const r in e) {
    const o = e[r];
    sr(o, n, r, t);
  }
  return n;
};
const sr = (e, t, n, r) => {
  const o = e.length;
  for (let s = 0; s < o; s++) {
    const i = e[s];
    Gd(i, t, n, r);
  }
};
const Gd = (e, t, n, r) => {
  if (typeof e == "string") {
    $d(e, t, n);
    return;
  }
  if (typeof e == "function") {
    Xd(e, t, n, r);
    return;
  }
  Jd(e, t, n, r);
};
const $d = (e, t, n) => {
  const r = e === "" ? t : Ps(t, e);
  r.classGroupId = n;
};
const Xd = (e, t, n, r) => {
  if (Kd(e)) {
    sr(e(r), t, n, r);
    return;
  }
  if (t.validators === null) {
    t.validators = [];
  }
  t.validators.push(Ld(n, e));
};
const Jd = (e, t, n, r) => {
  const o = Object.entries(e);
  const s = o.length;
  for (let i = 0; i < s; i++) {
    const [a, l] = o[i];
    sr(l, Ps(t, a), n, r);
  }
};
const Ps = (e, t) => {
  let n = e;
  const r = t.split($t);
  const o = r.length;
  for (let s = 0; s < o; s++) {
    const i = r[s];
    let a = n.nextPart.get(i);
    if (!a) {
      a = Is();
      n.nextPart.set(i, a);
    }
    n = a;
  }
  return n;
};
const Kd = e => "isThemeGetter" in e && e.isThemeGetter === true;
const Zd = e => {
  if (e < 1) {
    return {
      get: () => {},
      set: () => {}
    };
  }
  let t = 0;
  let n = Object.create(null);
  let r = Object.create(null);
  const o = (s, i) => {
    n[s] = i;
    t++;
    if (t > e) {
      t = 0;
      r = n;
      n = Object.create(null);
    }
  };
  return {
    get(s) {
      let i = n[s];
      if (i !== undefined) {
        return i;
      }
      if ((i = r[s]) !== undefined) {
        o(s, i);
        return i;
      }
    },
    set(s, i) {
      if (s in n) {
        n[s] = i;
      } else {
        o(s, i);
      }
    }
  };
};
const Cn = "!";
const Hr = ":";
const Yd = [];
const Wr = (e, t, n, r, o) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: n,
  maybePostfixModifierPosition: r,
  isExternal: o
});
const Qd = e => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = o => {
    const s = [];
    let i = 0;
    let a = 0;
    let l = 0;
    let f;
    const c = o.length;
    for (let S = 0; S < c; S++) {
      const b = o[S];
      if (i === 0 && a === 0) {
        if (b === Hr) {
          s.push(o.slice(l, S));
          l = S + 1;
          continue;
        }
        if (b === "/") {
          f = S;
          continue;
        }
      }
      if (b === "[") {
        i++;
      } else if (b === "]") {
        i--;
      } else if (b === "(") {
        a++;
      } else if (b === ")") {
        a--;
      }
    }
    const p = s.length === 0 ? o : o.slice(l);
    let g = p;
    let m = false;
    if (p.endsWith(Cn)) {
      g = p.slice(0, -1);
      m = true;
    } else if (p.startsWith(Cn)) {
      g = p.slice(1);
      m = true;
    }
    const w = f && f > l ? f - l : undefined;
    return Wr(s, m, g, w);
  };
  if (t) {
    const o = t + Hr;
    const s = r;
    r = i => i.startsWith(o) ? s(i.slice(o.length)) : Wr(Yd, false, i, undefined, true);
  }
  if (n) {
    const o = r;
    r = s => n({
      className: s,
      parseClassName: o
    });
  }
  return r;
};
const qd = e => {
  const t = new Map();
  e.orderSensitiveModifiers.forEach((n, r) => {
    t.set(n, 1000000 + r);
  });
  return n => {
    const r = [];
    let o = [];
    for (let s = 0; s < n.length; s++) {
      const i = n[s];
      const a = i[0] === "[";
      const l = t.has(i);
      if (a || l) {
        if (o.length > 0) {
          o.sort();
          r.push(...o);
          o = [];
        }
        r.push(i);
      } else {
        o.push(i);
      }
    }
    if (o.length > 0) {
      o.sort();
      r.push(...o);
    }
    return r;
  };
};
const ef = e => ({
  cache: Zd(e.cacheSize),
  parseClassName: Qd(e),
  sortModifiers: qd(e),
  ...Ud(e)
});
const tf = /\s+/;
const nf = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: s
  } = t;
  const i = [];
  const a = e.trim().split(tf);
  let l = "";
  for (let f = a.length - 1; f >= 0; f -= 1) {
    const c = a[f];
    const {
      isExternal: p,
      modifiers: g,
      hasImportantModifier: m,
      baseClassName: w,
      maybePostfixModifierPosition: S
    } = n(c);
    if (p) {
      l = c + (l.length > 0 ? " " + l : l);
      continue;
    }
    let b = !!S;
    let v = r(b ? w.substring(0, S) : w);
    if (!v) {
      if (!b) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      v = r(w);
      if (!v) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      b = false;
    }
    const _ = g.length === 0 ? "" : g.length === 1 ? g[0] : s(g).join(":");
    const k = m ? _ + Cn : _;
    const T = k + v;
    if (i.indexOf(T) > -1) {
      continue;
    }
    i.push(T);
    const d = o(v, b);
    for (let u = 0; u < d.length; ++u) {
      const y = d[u];
      i.push(k + y);
    }
    l = c + (l.length > 0 ? " " + l : l);
  }
  return l;
};
const rf = (...e) => {
  let t = 0;
  let n;
  let r;
  let o = "";
  while (t < e.length) {
    if ((n = e[t++]) && (r = Rs(n))) {
      if (o) {
        o += " ";
      }
      o += r;
    }
  }
  return o;
};
const Rs = e => {
  if (typeof e == "string") {
    return e;
  }
  let t;
  let n = "";
  for (let r = 0; r < e.length; r++) {
    if (e[r] && (t = Rs(e[r]))) {
      if (n) {
        n += " ";
      }
      n += t;
    }
  }
  return n;
};
const of = (e, ...t) => {
  let n;
  let r;
  let o;
  let s;
  const i = l => {
    const f = t.reduce((c, p) => p(c), e());
    n = ef(f);
    r = n.cache.get;
    o = n.cache.set;
    s = a;
    return a(l);
  };
  const a = l => {
    const f = r(l);
    if (f) {
      return f;
    }
    const c = nf(l, n);
    o(l, c);
    return c;
  };
  s = i;
  return (...l) => s(rf(...l));
};
const sf = [];
const oe = e => {
  const t = n => n[e] || sf;
  t.isThemeGetter = true;
  return t;
};
const Ms = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const Os = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const af = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
const lf = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const cf = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const uf = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
const df = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const ff = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const xe = e => af.test(e);
const z = e => !!e && !Number.isNaN(Number(e));
const Ce = e => !!e && Number.isInteger(Number(e));
const dn = e => e.endsWith("%") && z(e.slice(0, -1));
const ve = e => lf.test(e);
const Bs = () => true;
const mf = e => cf.test(e) && !uf.test(e);
const ir = () => false;
const hf = e => df.test(e);
const pf = e => ff.test(e);
const gf = e => !P(e) && !R(e);
const bf = e => Pe(e, Ns, ir);
const P = e => Ms.test(e);
const Be = e => Pe(e, Vs, mf);
const Gr = e => Pe(e, xf, z);
const yf = e => Pe(e, zs, Bs);
const Sf = e => Pe(e, Ls, ir);
const $r = e => Pe(e, Fs, ir);
const vf = e => Pe(e, Ds, pf);
const At = e => Pe(e, Us, hf);
const R = e => Os.test(e);
const ot = e => je(e, Vs);
const _f = e => je(e, Ls);
const Xr = e => je(e, Fs);
const wf = e => je(e, Ns);
const kf = e => je(e, Ds);
const Pt = e => je(e, Us, true);
const Tf = e => je(e, zs, true);
const Pe = (e, t, n) => {
  const r = Ms.exec(e);
  if (r) {
    if (r[1]) {
      return t(r[1]);
    } else {
      return n(r[2]);
    }
  } else {
    return false;
  }
};
const je = (e, t, n = false) => {
  const r = Os.exec(e);
  if (r) {
    if (r[1]) {
      return t(r[1]);
    } else {
      return n;
    }
  } else {
    return false;
  }
};
const Fs = e => e === "position" || e === "percentage";
const Ds = e => e === "image" || e === "url";
const Ns = e => e === "length" || e === "size" || e === "bg-size";
const Vs = e => e === "length";
const xf = e => e === "number";
const Ls = e => e === "family-name";
const zs = e => e === "number" || e === "weight";
const Us = e => e === "shadow";
const Cf = () => {
  const e = oe("color");
  const t = oe("font");
  const n = oe("text");
  const r = oe("font-weight");
  const o = oe("tracking");
  const s = oe("leading");
  const i = oe("breakpoint");
  const a = oe("container");
  const l = oe("spacing");
  const f = oe("radius");
  const c = oe("shadow");
  const p = oe("inset-shadow");
  const g = oe("text-shadow");
  const m = oe("drop-shadow");
  const w = oe("blur");
  const S = oe("perspective");
  const b = oe("aspect");
  const v = oe("ease");
  const _ = oe("animate");
  const k = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const T = () => ["center", "top", "bottom", "left", "right", "top-left", "left-top", "top-right", "right-top", "bottom-right", "right-bottom", "bottom-left", "left-bottom"];
  const d = () => [...T(), R, P];
  const u = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const y = () => ["auto", "contain", "none"];
  const h = () => [R, P, l];
  const x = () => [xe, "full", "auto", ...h()];
  const A = () => [Ce, "none", "subgrid", R, P];
  const O = () => ["auto", {
    span: ["full", Ce, R, P]
  }, Ce, R, P];
  const W = () => [Ce, "auto", R, P];
  const U = () => ["auto", "min", "max", "fr", R, P];
  const K = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
  const Z = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
  const V = () => ["auto", ...h()];
  const F = () => [xe, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...h()];
  const j = () => [xe, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...h()];
  const fe = () => [xe, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...h()];
  const B = () => [e, R, P];
  const Re = () => [...T(), Xr, $r, {
    position: [R, P]
  }];
  const ye = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }];
  const He = () => ["auto", "cover", "contain", wf, bf, {
    size: [R, P]
  }];
  const Te = () => [dn, ot, Be];
  const H = () => ["", "none", "full", f, R, P];
  const Y = () => ["", z, ot, Be];
  const me = () => ["solid", "dashed", "dotted", "double"];
  const Me = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const ie = () => [z, dn, Xr, $r];
  const ar = () => ["", "none", w, R, P];
  const bt = () => ["none", z, R, P];
  const yt = () => ["none", z, R, P];
  const nn = () => [z, R, P];
  const St = () => [xe, "full", ...h()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ve],
      breakpoint: [ve],
      color: [Bs],
      container: [ve],
      "drop-shadow": [ve],
      ease: ["in", "out", "in-out"],
      font: [gf],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ve],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ve],
      shadow: [ve],
      spacing: ["px", z],
      text: [ve],
      "text-shadow": [ve],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", xe, P, R, b]
      }],
      container: ["container"],
      columns: [{
        columns: [z, P, R, a]
      }],
      "break-after": [{
        "break-after": k()
      }],
      "break-before": [{
        "break-before": k()
      }],
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      box: [{
        box: ["border", "content"]
      }],
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      sr: ["sr-only", "not-sr-only"],
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      "object-position": [{
        object: d()
      }],
      overflow: [{
        overflow: u()
      }],
      "overflow-x": [{
        "overflow-x": u()
      }],
      "overflow-y": [{
        "overflow-y": u()
      }],
      overscroll: [{
        overscroll: y()
      }],
      "overscroll-x": [{
        "overscroll-x": y()
      }],
      "overscroll-y": [{
        "overscroll-y": y()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: x()
      }],
      "inset-x": [{
        "inset-x": x()
      }],
      "inset-y": [{
        "inset-y": x()
      }],
      start: [{
        "inset-s": x(),
        start: x()
      }],
      end: [{
        "inset-e": x(),
        end: x()
      }],
      "inset-bs": [{
        "inset-bs": x()
      }],
      "inset-be": [{
        "inset-be": x()
      }],
      top: [{
        top: x()
      }],
      right: [{
        right: x()
      }],
      bottom: [{
        bottom: x()
      }],
      left: [{
        left: x()
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: [Ce, "auto", R, P]
      }],
      basis: [{
        basis: [xe, "full", "auto", a, ...h()]
      }],
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      flex: [{
        flex: [z, xe, "auto", "initial", "none", P]
      }],
      grow: [{
        grow: ["", z, R, P]
      }],
      shrink: [{
        shrink: ["", z, R, P]
      }],
      order: [{
        order: [Ce, "first", "last", "none", R, P]
      }],
      "grid-cols": [{
        "grid-cols": A()
      }],
      "col-start-end": [{
        col: O()
      }],
      "col-start": [{
        "col-start": W()
      }],
      "col-end": [{
        "col-end": W()
      }],
      "grid-rows": [{
        "grid-rows": A()
      }],
      "row-start-end": [{
        row: O()
      }],
      "row-start": [{
        "row-start": W()
      }],
      "row-end": [{
        "row-end": W()
      }],
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      "auto-cols": [{
        "auto-cols": U()
      }],
      "auto-rows": [{
        "auto-rows": U()
      }],
      gap: [{
        gap: h()
      }],
      "gap-x": [{
        "gap-x": h()
      }],
      "gap-y": [{
        "gap-y": h()
      }],
      "justify-content": [{
        justify: [...K(), "normal"]
      }],
      "justify-items": [{
        "justify-items": [...Z(), "normal"]
      }],
      "justify-self": [{
        "justify-self": ["auto", ...Z()]
      }],
      "align-content": [{
        content: ["normal", ...K()]
      }],
      "align-items": [{
        items: [...Z(), {
          baseline: ["", "last"]
        }]
      }],
      "align-self": [{
        self: ["auto", ...Z(), {
          baseline: ["", "last"]
        }]
      }],
      "place-content": [{
        "place-content": K()
      }],
      "place-items": [{
        "place-items": [...Z(), "baseline"]
      }],
      "place-self": [{
        "place-self": ["auto", ...Z()]
      }],
      p: [{
        p: h()
      }],
      px: [{
        px: h()
      }],
      py: [{
        py: h()
      }],
      ps: [{
        ps: h()
      }],
      pe: [{
        pe: h()
      }],
      pbs: [{
        pbs: h()
      }],
      pbe: [{
        pbe: h()
      }],
      pt: [{
        pt: h()
      }],
      pr: [{
        pr: h()
      }],
      pb: [{
        pb: h()
      }],
      pl: [{
        pl: h()
      }],
      m: [{
        m: V()
      }],
      mx: [{
        mx: V()
      }],
      my: [{
        my: V()
      }],
      ms: [{
        ms: V()
      }],
      me: [{
        me: V()
      }],
      mbs: [{
        mbs: V()
      }],
      mbe: [{
        mbe: V()
      }],
      mt: [{
        mt: V()
      }],
      mr: [{
        mr: V()
      }],
      mb: [{
        mb: V()
      }],
      ml: [{
        ml: V()
      }],
      "space-x": [{
        "space-x": h()
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": h()
      }],
      "space-y-reverse": ["space-y-reverse"],
      size: [{
        size: F()
      }],
      "inline-size": [{
        inline: ["auto", ...j()]
      }],
      "min-inline-size": [{
        "min-inline": ["auto", ...j()]
      }],
      "max-inline-size": [{
        "max-inline": ["none", ...j()]
      }],
      "block-size": [{
        block: ["auto", ...fe()]
      }],
      "min-block-size": [{
        "min-block": ["auto", ...fe()]
      }],
      "max-block-size": [{
        "max-block": ["none", ...fe()]
      }],
      w: [{
        w: [a, "screen", ...F()]
      }],
      "min-w": [{
        "min-w": [a, "screen", "none", ...F()]
      }],
      "max-w": [{
        "max-w": [a, "screen", "none", "prose", {
          screen: [i]
        }, ...F()]
      }],
      h: [{
        h: ["screen", "lh", ...F()]
      }],
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...F()]
      }],
      "max-h": [{
        "max-h": ["screen", "lh", ...F()]
      }],
      "font-size": [{
        text: ["base", n, ot, Be]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: [r, Tf, yf]
      }],
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", dn, P]
      }],
      "font-family": [{
        font: [_f, Sf, t]
      }],
      "font-features": [{
        "font-features": [P]
      }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      tracking: [{
        tracking: [o, R, P]
      }],
      "line-clamp": [{
        "line-clamp": [z, "none", R, Gr]
      }],
      leading: [{
        leading: [s, ...h()]
      }],
      "list-image": [{
        "list-image": ["none", R, P]
      }],
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      "list-style-type": [{
        list: ["disc", "decimal", "none", R, P]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "placeholder-color": [{
        placeholder: B()
      }],
      "text-color": [{
        text: B()
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...me(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: [z, "from-font", "auto", R, Be]
      }],
      "text-decoration-color": [{
        decoration: B()
      }],
      "underline-offset": [{
        "underline-offset": [z, "auto", R, P]
      }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      indent: [{
        indent: h()
      }],
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", R, P]
      }],
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      content: [{
        content: ["none", R, P]
      }],
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: Re()
      }],
      "bg-repeat": [{
        bg: ye()
      }],
      "bg-size": [{
        bg: He()
      }],
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ce, R, P],
          radial: ["", R, P],
          conic: [Ce, R, P]
        }, kf, vf]
      }],
      "bg-color": [{
        bg: B()
      }],
      "gradient-from-pos": [{
        from: Te()
      }],
      "gradient-via-pos": [{
        via: Te()
      }],
      "gradient-to-pos": [{
        to: Te()
      }],
      "gradient-from": [{
        from: B()
      }],
      "gradient-via": [{
        via: B()
      }],
      "gradient-to": [{
        to: B()
      }],
      rounded: [{
        rounded: H()
      }],
      "rounded-s": [{
        "rounded-s": H()
      }],
      "rounded-e": [{
        "rounded-e": H()
      }],
      "rounded-t": [{
        "rounded-t": H()
      }],
      "rounded-r": [{
        "rounded-r": H()
      }],
      "rounded-b": [{
        "rounded-b": H()
      }],
      "rounded-l": [{
        "rounded-l": H()
      }],
      "rounded-ss": [{
        "rounded-ss": H()
      }],
      "rounded-se": [{
        "rounded-se": H()
      }],
      "rounded-ee": [{
        "rounded-ee": H()
      }],
      "rounded-es": [{
        "rounded-es": H()
      }],
      "rounded-tl": [{
        "rounded-tl": H()
      }],
      "rounded-tr": [{
        "rounded-tr": H()
      }],
      "rounded-br": [{
        "rounded-br": H()
      }],
      "rounded-bl": [{
        "rounded-bl": H()
      }],
      "border-w": [{
        border: Y()
      }],
      "border-w-x": [{
        "border-x": Y()
      }],
      "border-w-y": [{
        "border-y": Y()
      }],
      "border-w-s": [{
        "border-s": Y()
      }],
      "border-w-e": [{
        "border-e": Y()
      }],
      "border-w-bs": [{
        "border-bs": Y()
      }],
      "border-w-be": [{
        "border-be": Y()
      }],
      "border-w-t": [{
        "border-t": Y()
      }],
      "border-w-r": [{
        "border-r": Y()
      }],
      "border-w-b": [{
        "border-b": Y()
      }],
      "border-w-l": [{
        "border-l": Y()
      }],
      "divide-x": [{
        "divide-x": Y()
      }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{
        "divide-y": Y()
      }],
      "divide-y-reverse": ["divide-y-reverse"],
      "border-style": [{
        border: [...me(), "hidden", "none"]
      }],
      "divide-style": [{
        divide: [...me(), "hidden", "none"]
      }],
      "border-color": [{
        border: B()
      }],
      "border-color-x": [{
        "border-x": B()
      }],
      "border-color-y": [{
        "border-y": B()
      }],
      "border-color-s": [{
        "border-s": B()
      }],
      "border-color-e": [{
        "border-e": B()
      }],
      "border-color-bs": [{
        "border-bs": B()
      }],
      "border-color-be": [{
        "border-be": B()
      }],
      "border-color-t": [{
        "border-t": B()
      }],
      "border-color-r": [{
        "border-r": B()
      }],
      "border-color-b": [{
        "border-b": B()
      }],
      "border-color-l": [{
        "border-l": B()
      }],
      "divide-color": [{
        divide: B()
      }],
      "outline-style": [{
        outline: [...me(), "none", "hidden"]
      }],
      "outline-offset": [{
        "outline-offset": [z, R, P]
      }],
      "outline-w": [{
        outline: ["", z, ot, Be]
      }],
      "outline-color": [{
        outline: B()
      }],
      shadow: [{
        shadow: ["", "none", c, Pt, At]
      }],
      "shadow-color": [{
        shadow: B()
      }],
      "inset-shadow": [{
        "inset-shadow": ["none", p, Pt, At]
      }],
      "inset-shadow-color": [{
        "inset-shadow": B()
      }],
      "ring-w": [{
        ring: Y()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: B()
      }],
      "ring-offset-w": [{
        "ring-offset": [z, Be]
      }],
      "ring-offset-color": [{
        "ring-offset": B()
      }],
      "inset-ring-w": [{
        "inset-ring": Y()
      }],
      "inset-ring-color": [{
        "inset-ring": B()
      }],
      "text-shadow": [{
        "text-shadow": ["none", g, Pt, At]
      }],
      "text-shadow-color": [{
        "text-shadow": B()
      }],
      opacity: [{
        opacity: [z, R, P]
      }],
      "mix-blend": [{
        "mix-blend": [...Me(), "plus-darker", "plus-lighter"]
      }],
      "bg-blend": [{
        "bg-blend": Me()
      }],
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      "mask-image-linear-pos": [{
        "mask-linear": [z]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": ie()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": ie()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": B()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": B()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": ie()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": ie()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": B()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": B()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": ie()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": ie()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": B()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": B()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": ie()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": ie()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": B()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": B()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": ie()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": ie()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": B()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": B()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": ie()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": ie()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": B()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": B()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": ie()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": ie()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": B()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": B()
      }],
      "mask-image-radial": [{
        "mask-radial": [R, P]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": ie()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": ie()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": B()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": B()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": T()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [z]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": ie()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": ie()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": B()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": B()
      }],
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      "mask-position": [{
        mask: Re()
      }],
      "mask-repeat": [{
        mask: ye()
      }],
      "mask-size": [{
        mask: He()
      }],
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      "mask-image": [{
        mask: ["none", R, P]
      }],
      filter: [{
        filter: ["", "none", R, P]
      }],
      blur: [{
        blur: ar()
      }],
      brightness: [{
        brightness: [z, R, P]
      }],
      contrast: [{
        contrast: [z, R, P]
      }],
      "drop-shadow": [{
        "drop-shadow": ["", "none", m, Pt, At]
      }],
      "drop-shadow-color": [{
        "drop-shadow": B()
      }],
      grayscale: [{
        grayscale: ["", z, R, P]
      }],
      "hue-rotate": [{
        "hue-rotate": [z, R, P]
      }],
      invert: [{
        invert: ["", z, R, P]
      }],
      saturate: [{
        saturate: [z, R, P]
      }],
      sepia: [{
        sepia: ["", z, R, P]
      }],
      "backdrop-filter": [{
        "backdrop-filter": ["", "none", R, P]
      }],
      "backdrop-blur": [{
        "backdrop-blur": ar()
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [z, R, P]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [z, R, P]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", z, R, P]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [z, R, P]
      }],
      "backdrop-invert": [{
        "backdrop-invert": ["", z, R, P]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [z, R, P]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [z, R, P]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": ["", z, R, P]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": h()
      }],
      "border-spacing-x": [{
        "border-spacing-x": h()
      }],
      "border-spacing-y": [{
        "border-spacing-y": h()
      }],
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      caption: [{
        caption: ["top", "bottom"]
      }],
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", R, P]
      }],
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      duration: [{
        duration: [z, "initial", R, P]
      }],
      ease: [{
        ease: ["linear", "initial", v, R, P]
      }],
      delay: [{
        delay: [z, R, P]
      }],
      animate: [{
        animate: ["none", _, R, P]
      }],
      backface: [{
        backface: ["hidden", "visible"]
      }],
      perspective: [{
        perspective: [S, R, P]
      }],
      "perspective-origin": [{
        "perspective-origin": d()
      }],
      rotate: [{
        rotate: bt()
      }],
      "rotate-x": [{
        "rotate-x": bt()
      }],
      "rotate-y": [{
        "rotate-y": bt()
      }],
      "rotate-z": [{
        "rotate-z": bt()
      }],
      scale: [{
        scale: yt()
      }],
      "scale-x": [{
        "scale-x": yt()
      }],
      "scale-y": [{
        "scale-y": yt()
      }],
      "scale-z": [{
        "scale-z": yt()
      }],
      "scale-3d": ["scale-3d"],
      skew: [{
        skew: nn()
      }],
      "skew-x": [{
        "skew-x": nn()
      }],
      "skew-y": [{
        "skew-y": nn()
      }],
      transform: [{
        transform: [R, P, "", "none", "gpu", "cpu"]
      }],
      "transform-origin": [{
        origin: d()
      }],
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      translate: [{
        translate: St()
      }],
      "translate-x": [{
        "translate-x": St()
      }],
      "translate-y": [{
        "translate-y": St()
      }],
      "translate-z": [{
        "translate-z": St()
      }],
      "translate-none": ["translate-none"],
      accent: [{
        accent: B()
      }],
      appearance: [{
        appearance: ["none", "auto"]
      }],
      "caret-color": [{
        caret: B()
      }],
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", R, P]
      }],
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      "scroll-m": [{
        "scroll-m": h()
      }],
      "scroll-mx": [{
        "scroll-mx": h()
      }],
      "scroll-my": [{
        "scroll-my": h()
      }],
      "scroll-ms": [{
        "scroll-ms": h()
      }],
      "scroll-me": [{
        "scroll-me": h()
      }],
      "scroll-mbs": [{
        "scroll-mbs": h()
      }],
      "scroll-mbe": [{
        "scroll-mbe": h()
      }],
      "scroll-mt": [{
        "scroll-mt": h()
      }],
      "scroll-mr": [{
        "scroll-mr": h()
      }],
      "scroll-mb": [{
        "scroll-mb": h()
      }],
      "scroll-ml": [{
        "scroll-ml": h()
      }],
      "scroll-p": [{
        "scroll-p": h()
      }],
      "scroll-px": [{
        "scroll-px": h()
      }],
      "scroll-py": [{
        "scroll-py": h()
      }],
      "scroll-ps": [{
        "scroll-ps": h()
      }],
      "scroll-pe": [{
        "scroll-pe": h()
      }],
      "scroll-pbs": [{
        "scroll-pbs": h()
      }],
      "scroll-pbe": [{
        "scroll-pbe": h()
      }],
      "scroll-pt": [{
        "scroll-pt": h()
      }],
      "scroll-pr": [{
        "scroll-pr": h()
      }],
      "scroll-pb": [{
        "scroll-pb": h()
      }],
      "scroll-pl": [{
        "scroll-pl": h()
      }],
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      "touch-pz": ["touch-pinch-zoom"],
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", R, P]
      }],
      fill: [{
        fill: ["none", ...B()]
      }],
      "stroke-w": [{
        stroke: [z, ot, Be, Gr]
      }],
      stroke: [{
        stroke: ["none", ...B()]
      }],
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
};
const Ef = of(Cf);
function If(...e) {
  return Ef(Ie(e));
}
var pt = e => typeof e == "number" && !isNaN(e);
var ze = e => typeof e == "string";
var ke = e => typeof e == "function";
var Af = e => ze(e) || pt(e);
var En = e => ze(e) || ke(e) ? e : null;
var Pf = (e, t) => e === false || pt(e) && e > 0 ? e : t;
var In = e => ee.isValidElement(e) || ze(e) || ke(e) || pt(e);
function Rf(e, t, n = 300) {
  let {
    scrollHeight: r,
    style: o
  } = e;
  requestAnimationFrame(() => {
    o.minHeight = "initial";
    o.height = r + "px";
    o.transition = `all ${n}ms`;
    requestAnimationFrame(() => {
      o.height = "0";
      o.padding = "0";
      o.margin = "0";
      setTimeout(t, n);
    });
  });
}
function Mf({
  enter: e,
  exit: t,
  appendPosition: n = false,
  collapse: r = true,
  collapseDuration: o = 300
}) {
  return function ({
    children: s,
    position: i,
    preventExitTransition: a,
    done: l,
    nodeRef: f,
    isIn: c,
    playToast: p
  }) {
    let g = n ? `${e}--${i}` : e;
    let m = n ? `${t}--${i}` : t;
    let w = ee.useRef(0);
    ee.useLayoutEffect(() => {
      let S = f.current;
      let b = g.split(" ");
      let v = _ => {
        if (_.target === f.current) {
          p();
          S.removeEventListener("animationend", v);
          S.removeEventListener("animationcancel", v);
          if (w.current === 0 && _.type !== "animationcancel") {
            S.classList.remove(...b);
          }
        }
      };
      S.classList.add(...b);
      S.addEventListener("animationend", v);
      S.addEventListener("animationcancel", v);
    }, []);
    ee.useEffect(() => {
      let S = f.current;
      let b = () => {
        S.removeEventListener("animationend", b);
        if (r) {
          Rf(S, l, o);
        } else {
          l();
        }
      };
      if (!c) {
        if (a) {
          b();
        } else {
          w.current = 1;
          S.className += ` ${m}`;
          S.addEventListener("animationend", b);
        }
      }
    }, [c]);
    return $.createElement($.Fragment, null, s);
  };
}
function Jr(e, t) {
  return {
    content: js(e.content, e.props),
    containerId: e.props.containerId,
    id: e.props.toastId,
    theme: e.props.theme,
    type: e.props.type,
    data: e.props.data || {},
    isLoading: e.props.isLoading,
    icon: e.props.icon,
    reason: e.removalReason,
    status: t
  };
}
function js(e, t, n = false) {
  if (ee.isValidElement(e) && !ze(e.type)) {
    return ee.cloneElement(e, {
      closeToast: t.closeToast,
      toastProps: t,
      data: t.data,
      isPaused: n
    });
  } else if (ke(e)) {
    return e({
      closeToast: t.closeToast,
      toastProps: t,
      data: t.data,
      isPaused: n
    });
  } else {
    return e;
  }
}
function Of({
  closeToast: e,
  theme: t,
  ariaLabel: n = "close"
}) {
  return $.createElement("button", {
    className: `Toastify__close-button Toastify__close-button--${t}`,
    type: "button",
    onClick: r => {
      r.stopPropagation();
      e(true);
    },
    "aria-label": n
  }, $.createElement("svg", {
    "aria-hidden": "true",
    viewBox: "0 0 14 16"
  }, $.createElement("path", {
    fillRule: "evenodd",
    d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
  })));
}
function Bf({
  delay: e,
  isRunning: t,
  closeToast: n,
  type: r = "default",
  hide: o,
  className: s,
  controlledProgress: i,
  progress: a,
  rtl: l,
  isIn: f,
  theme: c
}) {
  let p = o || i && a === 0;
  let g = {
    animationDuration: `${e}ms`,
    animationPlayState: t ? "running" : "paused"
  };
  if (i) {
    g.transform = `scaleX(${a})`;
  }
  let m = Ie("Toastify__progress-bar", i ? "Toastify__progress-bar--controlled" : "Toastify__progress-bar--animated", `Toastify__progress-bar-theme--${c}`, `Toastify__progress-bar--${r}`, {
    "Toastify__progress-bar--rtl": l
  });
  let w = ke(s) ? s({
    rtl: l,
    type: r,
    defaultClassName: m
  }) : Ie(m, s);
  let S = {
    [i && a >= 1 ? "onTransitionEnd" : "onAnimationEnd"]: i && a < 1 ? null : () => {
      if (f) {
        n();
      }
    }
  };
  return $.createElement("div", {
    className: "Toastify__progress-bar--wrp",
    "data-hidden": p
  }, $.createElement("div", {
    className: `Toastify__progress-bar--bg Toastify__progress-bar-theme--${c} Toastify__progress-bar--${r}`
  }), $.createElement("div", {
    role: "progressbar",
    "aria-hidden": p ? "true" : "false",
    "aria-label": "notification timer",
    "aria-valuenow": i ? Math.round(a * 100) : undefined,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    className: w,
    style: g,
    ...S
  }));
}
var Ff = 1;
var Hs = () => `${Ff++}`;
function Df(e, t, n) {
  let r = 1;
  let o = 0;
  let s = [];
  let i = [];
  let a = t;
  let l = new Map();
  let f = new Set();
  let c = _ => {
    f.add(_);
    return () => f.delete(_);
  };
  let p = () => {
    i = Array.from(l.values());
    f.forEach(_ => _());
  };
  let g = ({
    containerId: _,
    toastId: k,
    updateId: T
  }) => {
    let d = _ ? _ !== e : e !== 1;
    let u = l.has(k) && T == null;
    return d || u;
  };
  let m = (_, k) => {
    l.forEach(T => {
      var d;
      if (k == null || k === T.props.toastId) {
        if ((d = T.toggle) != null) {
          d.call(T, _);
        }
      }
    });
  };
  let w = _ => {
    var k;
    var T;
    if (_.isActive) {
      if ((T = (k = _.props) == null ? undefined : k.onClose) != null) {
        T.call(k, _.removalReason);
      }
      _.isActive = false;
      n(Jr(_, "removed"));
    }
  };
  let S = _ => {
    if (_ == null) {
      l.forEach(w);
    } else {
      let k = l.get(_);
      if (k) {
        w(k);
      }
    }
    p();
  };
  let b = () => {
    o -= s.length;
    s = [];
  };
  let v = _ => {
    var k;
    var T;
    let {
      toastId: d,
      updateId: u
    } = _.props;
    let y = u == null;
    if (_.staleId) {
      l.delete(_.staleId);
    }
    _.isActive = true;
    l.set(d, _);
    p();
    n(Jr(_, y ? "added" : "updated"));
    if (y) {
      if ((T = (k = _.props).onOpen) != null) {
        T.call(k);
      }
    }
  };
  return {
    id: e,
    props: a,
    observe: c,
    toggle: m,
    removeToast: S,
    toasts: l,
    clearQueue: b,
    buildToast: (_, k) => {
      if (g(k)) {
        return;
      }
      let {
        toastId: T,
        updateId: d,
        data: u,
        staleId: y,
        delay: h
      } = k;
      let x = d == null;
      if (x) {
        o++;
      }
      let A = {
        ...a,
        style: a.toastStyle,
        key: r++,
        ...Object.fromEntries(Object.entries(k).filter(([W, U]) => U != null)),
        toastId: T,
        updateId: d,
        data: u,
        isIn: false,
        className: En(k.className || a.toastClassName),
        progressClassName: En(k.progressClassName || a.progressClassName),
        autoClose: k.isLoading ? false : Pf(k.autoClose, a.autoClose),
        closeToast(W) {
          let U = l.get(T);
          if (U) {
            U.removalReason = W;
            S(T);
          }
        },
        deleteToast() {
          if (l.get(T) != null) {
            l.delete(T);
            o--;
            if (o < 0) {
              o = 0;
            }
            if (s.length > 0) {
              v(s.shift());
              return;
            }
            p();
          }
        }
      };
      A.closeButton = a.closeButton;
      if (k.closeButton === false || In(k.closeButton)) {
        A.closeButton = k.closeButton;
      } else if (k.closeButton === true) {
        A.closeButton = In(a.closeButton) ? a.closeButton : true;
      }
      let O = {
        content: _,
        props: A,
        staleId: y
      };
      if (a.limit && a.limit > 0 && o > a.limit && x) {
        s.push(O);
      } else if (pt(h)) {
        setTimeout(() => {
          v(O);
        }, h);
      } else {
        v(O);
      }
    },
    setProps(_) {
      a = _;
    },
    setToggle: (_, k) => {
      let T = l.get(_);
      if (T) {
        T.toggle = k;
      }
    },
    isToastActive: _ => {
      var k;
      if ((k = l.get(_)) == null) {
        return undefined;
      } else {
        return k.isActive;
      }
    },
    getSnapshot: () => i
  };
}
var ue = new Map();
var ft = [];
var An = new Set();
var Nf = e => An.forEach(t => t(e));
var Ws = () => ue.size > 0;
function Vf() {
  ft.forEach(e => $s(e.content, e.options));
  ft = [];
}
var Lf = (e, {
  containerId: t
}) => {
  var n;
  if ((n = ue.get(t || 1)) == null) {
    return undefined;
  } else {
    return n.toasts.get(e);
  }
};
function Gs(e, t) {
  var n;
  if (t) {
    return (n = ue.get(t)) != null && !!n.isToastActive(e);
  }
  let r = false;
  ue.forEach(o => {
    if (o.isToastActive(e)) {
      r = true;
    }
  });
  return r;
}
function zf(e) {
  if (!Ws()) {
    ft = ft.filter(t => e != null && t.options.toastId !== e);
    return;
  }
  if (e == null || Af(e)) {
    ue.forEach(t => {
      t.removeToast(e);
    });
  } else if (e && ("containerId" in e || "id" in e)) {
    let t = ue.get(e.containerId);
    if (t) {
      t.removeToast(e.id);
    } else {
      ue.forEach(n => {
        n.removeToast(e.id);
      });
    }
  }
}
var Uf = (e = {}) => {
  ue.forEach(t => {
    if (t.props.limit && (!e.containerId || t.id === e.containerId)) {
      t.clearQueue();
    }
  });
};
function $s(e, t) {
  if (In(e)) {
    if (!Ws()) {
      ft.push({
        content: e,
        options: t
      });
    }
    ue.forEach(n => {
      n.buildToast(e, t);
    });
  }
}
function jf(e) {
  var t;
  if ((t = ue.get(e.containerId || 1)) != null) {
    t.setToggle(e.id, e.fn);
  }
}
function Xs(e, t) {
  ue.forEach(n => {
    if (t == null || t == null || !t.containerId || t?.containerId === n.id) {
      n.toggle(e, t?.id);
    }
  });
}
function Hf(e) {
  let t = e.containerId || 1;
  return {
    subscribe(n) {
      let r = Df(t, e, Nf);
      ue.set(t, r);
      let o = r.observe(n);
      Vf();
      return () => {
        o();
        ue.delete(t);
      };
    },
    setProps(n) {
      var r;
      if ((r = ue.get(t)) != null) {
        r.setProps(n);
      }
    },
    getSnapshot() {
      var n;
      if ((n = ue.get(t)) == null) {
        return undefined;
      } else {
        return n.getSnapshot();
      }
    }
  };
}
function Wf(e) {
  An.add(e);
  return () => {
    An.delete(e);
  };
}
function Gf(e) {
  if (e && (ze(e.toastId) || pt(e.toastId))) {
    return e.toastId;
  } else {
    return Hs();
  }
}
function gt(e, t) {
  $s(e, t);
  return t.toastId;
}
function qt(e, t) {
  return {
    ...t,
    type: t && t.type || e,
    toastId: Gf(t)
  };
}
function en(e) {
  return (t, n) => gt(t, qt(e, n));
}
function J(e, t) {
  return gt(e, qt("default", t));
}
J.loading = (e, t) => gt(e, qt("default", {
  isLoading: true,
  autoClose: false,
  closeOnClick: false,
  closeButton: false,
  draggable: false,
  ...t
}));
function $f(e, {
  pending: t,
  error: n,
  success: r
}, o) {
  let s;
  if (t) {
    s = ze(t) ? J.loading(t, o) : J.loading(t.render, {
      ...o,
      ...t
    });
  }
  let i = {
    isLoading: null,
    autoClose: null,
    closeOnClick: null,
    closeButton: null,
    draggable: null
  };
  let a = (f, c, p) => {
    if (c == null) {
      J.dismiss(s);
      return;
    }
    let g = {
      type: f,
      ...i,
      ...o,
      data: p
    };
    let m = ze(c) ? {
      render: c
    } : c;
    if (s) {
      J.update(s, {
        ...g,
        ...m
      });
    } else {
      J(m.render, {
        ...g,
        ...m
      });
    }
    return p;
  };
  let l = ke(e) ? e() : e;
  l.then(f => a("success", r, f)).catch(f => a("error", n, f));
  return l;
}
J.promise = $f;
J.success = en("success");
J.info = en("info");
J.error = en("error");
J.warning = en("warning");
J.warn = J.warning;
J.dark = (e, t) => gt(e, qt("default", {
  theme: "dark",
  ...t
}));
function Xf(e) {
  zf(e);
}
J.dismiss = Xf;
J.clearWaitingQueue = Uf;
J.isActive = Gs;
J.update = (e, t = {}) => {
  let n = Lf(e, t);
  if (n) {
    let {
      props: r,
      content: o
    } = n;
    let s = {
      delay: 100,
      ...r,
      ...t,
      toastId: t.toastId || e,
      updateId: Hs()
    };
    if (s.toastId !== e) {
      s.staleId = e;
    }
    let i = s.render || o;
    delete s.render;
    gt(i, s);
  }
};
J.done = e => {
  J.update(e, {
    progress: 1
  });
};
J.onChange = Wf;
J.play = e => Xs(true, e);
J.pause = e => Xs(false, e);
function Jf(e) {
  var t;
  let {
    subscribe: n,
    getSnapshot: r,
    setProps: o
  } = ee.useRef(Hf(e)).current;
  o(e);
  let s = (t = ee.useSyncExternalStore(n, r, r)) == null ? undefined : t.slice();
  function i(a) {
    if (!s) {
      return [];
    }
    let l = new Map();
    if (e.newestOnTop) {
      s.reverse();
    }
    s.forEach(f => {
      let {
        position: c
      } = f.props;
      if (!l.has(c)) {
        l.set(c, []);
      }
      l.get(c).push(f);
    });
    return Array.from(l, f => a(f[0], f[1]));
  }
  return {
    getToastToRender: i,
    isToastActive: Gs,
    count: s?.length
  };
}
function Kf(e) {
  let [t, n] = ee.useState(false);
  let [r, o] = ee.useState(false);
  let s = ee.useRef(null);
  let i = ee.useRef({
    start: 0,
    delta: 0,
    removalDistance: 0,
    canCloseOnClick: true,
    canDrag: false,
    didMove: false
  }).current;
  let {
    autoClose: a,
    pauseOnHover: l,
    closeToast: f,
    onClick: c,
    closeOnClick: p
  } = e;
  jf({
    id: e.toastId,
    containerId: e.containerId,
    fn: n
  });
  ee.useEffect(() => {
    if (e.pauseOnFocusLoss) {
      g();
      return () => {
        m();
      };
    }
  }, [e.pauseOnFocusLoss]);
  function g() {
    if (!document.hasFocus()) {
      v();
    }
    window.addEventListener("focus", b);
    window.addEventListener("blur", v);
  }
  function m() {
    window.removeEventListener("focus", b);
    window.removeEventListener("blur", v);
  }
  function w(y) {
    if (e.draggable === true || e.draggable === y.pointerType) {
      _();
      let h = s.current;
      i.canCloseOnClick = true;
      i.canDrag = true;
      h.style.transition = "none";
      if (e.draggableDirection === "x") {
        i.start = y.clientX;
        i.removalDistance = h.offsetWidth * (e.draggablePercent / 100);
      } else {
        i.start = y.clientY;
        i.removalDistance = h.offsetHeight * (e.draggablePercent === 80 ? e.draggablePercent * 1.5 : e.draggablePercent) / 100;
      }
    }
  }
  function S(y) {
    let {
      top: h,
      bottom: x,
      left: A,
      right: O
    } = s.current.getBoundingClientRect();
    if (y.pointerType === "mouse" && e.pauseOnHover && y.clientX >= A && y.clientX <= O && y.clientY >= h && y.clientY <= x) {
      v();
    } else {
      b();
    }
  }
  function b() {
    n(true);
  }
  function v() {
    n(false);
  }
  function _() {
    i.didMove = false;
    document.addEventListener("pointermove", T);
    document.addEventListener("pointerup", d);
  }
  function k() {
    document.removeEventListener("pointermove", T);
    document.removeEventListener("pointerup", d);
  }
  function T(y) {
    let h = s.current;
    if (i.canDrag && h) {
      i.didMove = true;
      if (t) {
        v();
      }
      if (e.draggableDirection === "x") {
        i.delta = y.clientX - i.start;
      } else {
        i.delta = y.clientY - i.start;
      }
      if (i.start !== y.clientX) {
        i.canCloseOnClick = false;
      }
      let x = e.draggableDirection === "x" ? `${i.delta}px, var(--y)` : `0, calc(${i.delta}px + var(--y))`;
      h.style.transform = `translate3d(${x},0)`;
      h.style.opacity = `${1 - Math.abs(i.delta / i.removalDistance)}`;
    }
  }
  function d() {
    k();
    let y = s.current;
    if (i.canDrag && i.didMove && y) {
      i.canDrag = false;
      if (Math.abs(i.delta) > i.removalDistance) {
        o(true);
        e.closeToast(true);
        e.collapseAll();
        return;
      }
      y.style.transition = "transform 0.2s, opacity 0.2s";
      y.style.removeProperty("transform");
      y.style.removeProperty("opacity");
    }
  }
  let u = {
    onPointerDown: w,
    onPointerUp: S
  };
  if (a && l) {
    u.onMouseEnter = v;
    if (!e.stacked) {
      u.onMouseLeave = b;
    }
  }
  if (p) {
    u.onClick = y => {
      if (c) {
        c(y);
      }
      if (i.canCloseOnClick) {
        f(true);
      }
    };
  }
  return {
    playToast: b,
    pauseToast: v,
    isRunning: t,
    preventExitTransition: r,
    toastRef: s,
    eventHandlers: u
  };
}
var Js = typeof window !== "undefined" ? ee.useLayoutEffect : ee.useEffect;
var tn = ({
  theme: e,
  type: t,
  isLoading: n,
  ...r
}) => $.createElement("svg", {
  viewBox: "0 0 24 24",
  width: "100%",
  height: "100%",
  fill: e === "colored" ? "currentColor" : `var(--toastify-icon-color-${t})`,
  ...r
});
function Zf(e) {
  return $.createElement(tn, {
    ...e
  }, $.createElement("path", {
    d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"
  }));
}
function Yf(e) {
  return $.createElement(tn, {
    ...e
  }, $.createElement("path", {
    d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"
  }));
}
function Qf(e) {
  return $.createElement(tn, {
    ...e
  }, $.createElement("path", {
    d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"
  }));
}
function qf(e) {
  return $.createElement(tn, {
    ...e
  }, $.createElement("path", {
    d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"
  }));
}
function em() {
  return $.createElement("div", {
    className: "Toastify__spinner"
  });
}
var Pn = {
  info: Yf,
  warning: Zf,
  success: Qf,
  error: qf,
  spinner: em
};
var tm = e => e in Pn;
function nm({
  theme: e,
  type: t,
  isLoading: n,
  icon: r
}) {
  let o = null;
  let s = {
    theme: e,
    type: t
  };
  if (r !== false) {
    if (ke(r)) {
      o = r({
        ...s,
        isLoading: n
      });
    } else if (ee.isValidElement(r)) {
      o = ee.cloneElement(r, s);
    } else if (n) {
      o = Pn.spinner();
    } else if (tm(t)) {
      o = Pn[t](s);
    }
  }
  return o;
}
var rm = e => {
  let {
    isRunning: t,
    preventExitTransition: n,
    toastRef: r,
    eventHandlers: o,
    playToast: s
  } = Kf(e);
  let {
    closeButton: i,
    children: a,
    autoClose: l,
    onClick: f,
    type: c,
    hideProgressBar: p,
    closeToast: g,
    transition: m,
    position: w,
    className: S,
    style: b,
    progressClassName: v,
    updateId: _,
    role: k,
    progress: T,
    rtl: d,
    toastId: u,
    deleteToast: y,
    isIn: h,
    isLoading: x,
    closeOnClick: A,
    theme: O,
    ariaLabel: W
  } = e;
  let U = Ie("Toastify__toast", `Toastify__toast-theme--${O}`, `Toastify__toast--${c}`, {
    "Toastify__toast--rtl": d
  }, {
    "Toastify__toast--close-on-click": A
  });
  let K = ke(S) ? S({
    rtl: d,
    position: w,
    type: c,
    defaultClassName: U
  }) : Ie(U, S);
  let Z = nm(e);
  let V = !!T || !l;
  let F = {
    closeToast: g,
    type: c,
    theme: O
  };
  let j = null;
  if (i !== false) {
    if (ke(i)) {
      j = i(F);
    } else if (ee.isValidElement(i)) {
      j = ee.cloneElement(i, F);
    } else {
      j = Of(F);
    }
  }
  return $.createElement(m, {
    isIn: h,
    done: y,
    position: w,
    preventExitTransition: n,
    nodeRef: r,
    playToast: s
  }, $.createElement("div", {
    id: u,
    tabIndex: 0,
    onClick: f,
    "data-in": h,
    className: K,
    ...o,
    style: b,
    ref: r,
    ...(h && {
      role: k,
      "aria-label": W
    })
  }, Z != null && $.createElement("div", {
    className: Ie("Toastify__toast-icon", {
      "Toastify--animate-icon Toastify__zoom-enter": !x
    })
  }, Z), js(a, e, !t), j, !e.customProgressBar && $.createElement(Bf, {
    ...(_ && !V ? {
      key: `p-${_}`
    } : {}),
    rtl: d,
    theme: O,
    delay: l,
    isRunning: t,
    isIn: h,
    closeToast: g,
    hide: p,
    type: c,
    className: v,
    controlledProgress: V,
    progress: T || 0
  })));
};
var om = (e, t = false) => ({
  enter: `Toastify--animate Toastify__${e}-enter`,
  exit: `Toastify--animate Toastify__${e}-exit`,
  appendPosition: t
});
var sm = Mf(om("bounce", true));
var im = {
  position: "top-right",
  transition: sm,
  autoClose: 5000,
  closeButton: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  draggable: "touch",
  draggablePercent: 80,
  draggableDirection: "x",
  role: "alert",
  theme: "light",
  "aria-label": "Notifications Alt+T",
  hotKeys: e => e.altKey && e.code === "KeyT"
};
function am(e) {
  let t = {
    ...im,
    ...e
  };
  let n = e.stacked;
  let [r, o] = ee.useState(true);
  let s = ee.useRef(null);
  let {
    getToastToRender: i,
    isToastActive: a,
    count: l
  } = Jf(t);
  let {
    className: f,
    style: c,
    rtl: p,
    containerId: g,
    hotKeys: m
  } = t;
  function w(b) {
    let v = Ie("Toastify__toast-container", `Toastify__toast-container--${b}`, {
      "Toastify__toast-container--rtl": p
    });
    if (ke(f)) {
      return f({
        position: b,
        rtl: p,
        defaultClassName: v
      });
    } else {
      return Ie(v, En(f));
    }
  }
  function S() {
    if (n) {
      o(true);
      J.play();
    }
  }
  Js(() => {
    var b;
    if (n) {
      let v = s.current.querySelectorAll("[data-in=\"true\"]");
      let _ = 12;
      let k = (b = t.position) == null ? undefined : b.includes("top");
      let T = 0;
      let d = 0;
      Array.from(v).reverse().forEach((u, y) => {
        let h = u;
        h.classList.add("Toastify__toast--stacked");
        if (y > 0) {
          h.dataset.collapsed = `${r}`;
        }
        h.dataset.pos ||= k ? "top" : "bot";
        let x = T * (r ? 0.2 : 1) + (r ? 0 : _ * y);
        let A = Math.max(0.5, 1 - (r ? d : 0));
        h.style.setProperty("--y", `${k ? x : x * -1}px`);
        h.style.setProperty("--g", `${_}`);
        h.style.setProperty("--s", `${A}`);
        T += h.offsetHeight;
        d += 0.025;
      });
    }
  }, [r, l, n]);
  ee.useEffect(() => {
    function b(v) {
      var _;
      let k = s.current;
      if (m(v)) {
        if ((_ = k?.querySelector("[tabIndex=\"0\"]")) != null) {
          _.focus();
        }
        o(false);
        J.pause();
      }
      if (v.key === "Escape" && (document.activeElement === k || k != null && k.contains(document.activeElement))) {
        o(true);
        J.play();
      }
    }
    document.addEventListener("keydown", b);
    return () => {
      document.removeEventListener("keydown", b);
    };
  }, [m]);
  return $.createElement("section", {
    ref: s,
    className: "Toastify",
    id: g,
    onMouseEnter: () => {
      if (n) {
        o(false);
        J.pause();
      }
    },
    onMouseLeave: S,
    "aria-live": "polite",
    "aria-atomic": "false",
    "aria-relevant": "additions text",
    "aria-label": t["aria-label"]
  }, i((b, v) => {
    let _ = v.length ? {
      ...c
    } : {
      ...c,
      pointerEvents: "none"
    };
    return $.createElement("div", {
      tabIndex: -1,
      className: w(b),
      "data-stacked": n,
      style: _,
      key: `c-${b}`
    }, v.map(({
      content: k,
      props: T
    }) => $.createElement(rm, {
      ...T,
      stacked: n,
      collapseAll: S,
      isIn: a(T.toastId, T.containerId),
      key: `t-${T.key}`
    }, k)));
  }));
}
var lm = `:root {
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-info: #3498db;
  --toastify-color-success: #07bc0c;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: hsl(6, 78%, 57%);
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-container-width: fit-content;
  --toastify-toast-width: 320px;
  --toastify-toast-offset: 16px;
  --toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));
  --toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));
  --toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));
  --toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));
  --toastify-toast-background: #fff;
  --toastify-toast-padding: 14px;
  --toastify-toast-min-height: 64px;
  --toastify-toast-max-height: 800px;
  --toastify-toast-bd-radius: 6px;
  --toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;
  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;

  /* Used only for colored theme */
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;

  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;
  --toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
  --toastify-color-progress-dark: #bb86fc;
  --toastify-color-progress-info: var(--toastify-color-info);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-warning: var(--toastify-color-warning);
  --toastify-color-progress-error: var(--toastify-color-error);
  /* used to control the opacity of the progress trail */
  --toastify-color-progress-bgo: 0.2;
}

.Toastify__toast-container {
  z-index: var(--toastify-z-index);
  -webkit-transform: translate3d(0, 0, var(--toastify-z-index));
  position: fixed;
  width: var(--toastify-container-width);
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.Toastify__toast-container--top-left {
  top: var(--toastify-toast-top);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--top-center {
  top: var(--toastify-toast-top);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--top-right {
  top: var(--toastify-toast-top);
  right: var(--toastify-toast-right);
  align-items: end;
}
.Toastify__toast-container--bottom-left {
  bottom: var(--toastify-toast-bottom);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--bottom-center {
  bottom: var(--toastify-toast-bottom);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--bottom-right {
  bottom: var(--toastify-toast-bottom);
  right: var(--toastify-toast-right);
  align-items: end;
}

.Toastify__toast {
  --y: 0px;
  position: relative;
  touch-action: none;
  width: var(--toastify-toast-width);
  min-height: var(--toastify-toast-min-height);
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: var(--toastify-toast-padding);
  border-radius: var(--toastify-toast-bd-radius);
  box-shadow: var(--toastify-toast-shadow);
  max-height: var(--toastify-toast-max-height);
  font-family: var(--toastify-font-family);
  /* webkit only issue #791 */
  z-index: 0;
  /* inner swag */
  display: flex;
  flex: 1 auto;
  align-items: center;
  word-break: break-word;
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container {
    width: 100vw;
    left: env(safe-area-inset-left);
    margin: 0;
  }
  .Toastify__toast-container--top-left,
  .Toastify__toast-container--top-center,
  .Toastify__toast-container--top-right {
    top: env(safe-area-inset-top);
    transform: translateX(0);
  }
  .Toastify__toast-container--bottom-left,
  .Toastify__toast-container--bottom-center,
  .Toastify__toast-container--bottom-right {
    bottom: env(safe-area-inset-bottom);
    transform: translateX(0);
  }
  .Toastify__toast-container--rtl {
    right: env(safe-area-inset-right);
    left: initial;
  }
  .Toastify__toast {
    --toastify-toast-width: 100%;
    margin-bottom: 0;
    border-radius: 0;
  }
}

.Toastify__toast-container[data-stacked='true'] {
  width: var(--toastify-toast-width);
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container[data-stacked='true'] {
    width: 100vw;
  }
}

.Toastify__toast--stacked {
  position: absolute;
  width: 100%;
  transform: translate3d(0, var(--y), 0) scale(var(--s));
  transition: transform 0.3s;
}

.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,
.Toastify__toast--stacked[data-collapsed] .Toastify__close-button {
  transition: opacity 0.1s;
}

.Toastify__toast--stacked[data-collapsed='false'] {
  overflow: visible;
}

.Toastify__toast--stacked[data-collapsed='true']:not(:last-child) > * {
  opacity: 0;
}

.Toastify__toast--stacked:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: calc(var(--g) * 1px);
  bottom: 100%;
}

.Toastify__toast--stacked[data-pos='top'] {
  top: 0;
}

.Toastify__toast--stacked[data-pos='bot'] {
  bottom: 0;
}

.Toastify__toast--stacked[data-pos='bot'].Toastify__toast--stacked:before {
  transform-origin: top;
}

.Toastify__toast--stacked[data-pos='top'].Toastify__toast--stacked:before {
  transform-origin: bottom;
}

.Toastify__toast--stacked:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  transform: scaleY(3);
  z-index: -1;
}

.Toastify__toast--rtl {
  direction: rtl;
}

.Toastify__toast--close-on-click {
  cursor: pointer;
}

.Toastify__toast-icon {
  margin-inline-end: 10px;
  width: 22px;
  flex-shrink: 0;
  display: flex;
}

.Toastify--animate {
  animation-fill-mode: both;
  animation-duration: 0.5s;
}

.Toastify--animate-icon {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.Toastify__toast-theme--dark {
  background: var(--toastify-color-dark);
  color: var(--toastify-text-color-dark);
}

.Toastify__toast-theme--light {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--default {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--info {
  color: var(--toastify-text-color-info);
  background: var(--toastify-color-info);
}

.Toastify__toast-theme--colored.Toastify__toast--success {
  color: var(--toastify-text-color-success);
  background: var(--toastify-color-success);
}

.Toastify__toast-theme--colored.Toastify__toast--warning {
  color: var(--toastify-text-color-warning);
  background: var(--toastify-color-warning);
}

.Toastify__toast-theme--colored.Toastify__toast--error {
  color: var(--toastify-text-color-error);
  background: var(--toastify-color-error);
}

.Toastify__progress-bar-theme--light {
  background: var(--toastify-color-progress-light);
}

.Toastify__progress-bar-theme--dark {
  background: var(--toastify-color-progress-dark);
}

.Toastify__progress-bar--info {
  background: var(--toastify-color-progress-info);
}

.Toastify__progress-bar--success {
  background: var(--toastify-color-progress-success);
}

.Toastify__progress-bar--warning {
  background: var(--toastify-color-progress-warning);
}

.Toastify__progress-bar--error {
  background: var(--toastify-color-progress-error);
}

.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
  background: var(--toastify-color-transparent);
}

.Toastify__close-button {
  color: #fff;
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s ease;
  z-index: 1;
}

.Toastify__toast--rtl .Toastify__close-button {
  left: 6px;
  right: unset;
}

.Toastify__close-button--light {
  color: #000;
  opacity: 0.3;
}

.Toastify__close-button > svg {
  fill: currentColor;
  height: 16px;
  width: 14px;
}

.Toastify__close-button:hover,
.Toastify__close-button:focus {
  opacity: 1;
}

@keyframes Toastify__trackProgress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

.Toastify__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
  transform-origin: left;
}

.Toastify__progress-bar--animated {
  animation: Toastify__trackProgress linear 1 forwards;
}

.Toastify__progress-bar--controlled {
  transition: transform 0.2s;
}

.Toastify__progress-bar--rtl {
  right: 0;
  left: initial;
  transform-origin: right;
  border-bottom-left-radius: initial;
}

.Toastify__progress-bar--wrp {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  border-bottom-left-radius: var(--toastify-toast-bd-radius);
  border-bottom-right-radius: var(--toastify-toast-bd-radius);
}

.Toastify__progress-bar--wrp[data-hidden='true'] {
  opacity: 0;
}

.Toastify__progress-bar--bg {
  opacity: var(--toastify-color-progress-bgo);
  width: 100%;
  height: 100%;
}

.Toastify__spinner {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: var(--toastify-spinner-color-empty-area);
  border-right-color: var(--toastify-spinner-color);
  animation: Toastify__spin 0.65s linear infinite;
}

@keyframes Toastify__bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutRight {
  20% {
    opacity: 1;
    transform: translate3d(-20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }
  75% {
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    transform: translate3d(5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutLeft {
  20% {
    opacity: 1;
    transform: translate3d(20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(-2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes Toastify__bounceOutUp {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
}

@keyframes Toastify__bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutDown {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}

.Toastify__bounce-enter--top-left,
.Toastify__bounce-enter--bottom-left {
  animation-name: Toastify__bounceInLeft;
}

.Toastify__bounce-enter--top-right,
.Toastify__bounce-enter--bottom-right {
  animation-name: Toastify__bounceInRight;
}

.Toastify__bounce-enter--top-center {
  animation-name: Toastify__bounceInDown;
}

.Toastify__bounce-enter--bottom-center {
  animation-name: Toastify__bounceInUp;
}

.Toastify__bounce-exit--top-left,
.Toastify__bounce-exit--bottom-left {
  animation-name: Toastify__bounceOutLeft;
}

.Toastify__bounce-exit--top-right,
.Toastify__bounce-exit--bottom-right {
  animation-name: Toastify__bounceOutRight;
}

.Toastify__bounce-exit--top-center {
  animation-name: Toastify__bounceOutUp;
}

.Toastify__bounce-exit--bottom-center {
  animation-name: Toastify__bounceOutDown;
}

@keyframes Toastify__zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

@keyframes Toastify__zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: translate3d(0, var(--y), 0) scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
}

.Toastify__zoom-enter {
  animation-name: Toastify__zoomIn;
}

.Toastify__zoom-exit {
  animation-name: Toastify__zoomOut;
}

@keyframes Toastify__flipIn {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

@keyframes Toastify__flipOut {
  from {
    transform: translate3d(0, var(--y), 0) perspective(400px);
  }
  30% {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }
  to {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}

.Toastify__flip-enter {
  animation-name: Toastify__flipIn;
}

.Toastify__flip-exit {
  animation-name: Toastify__flipOut;
}

@keyframes Toastify__slideInRight {
  from {
    transform: translate3d(110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInLeft {
  from {
    transform: translate3d(-110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInUp {
  from {
    transform: translate3d(0, 110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInDown {
  from {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideOutRight {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutLeft {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(-110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutDown {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, 500px, 0);
  }
}

@keyframes Toastify__slideOutUp {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, -500px, 0);
  }
}

.Toastify__slide-enter--top-left,
.Toastify__slide-enter--bottom-left {
  animation-name: Toastify__slideInLeft;
}

.Toastify__slide-enter--top-right,
.Toastify__slide-enter--bottom-right {
  animation-name: Toastify__slideInRight;
}

.Toastify__slide-enter--top-center {
  animation-name: Toastify__slideInDown;
}

.Toastify__slide-enter--bottom-center {
  animation-name: Toastify__slideInUp;
}

.Toastify__slide-exit--top-left,
.Toastify__slide-exit--bottom-left {
  animation-name: Toastify__slideOutLeft;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-right,
.Toastify__slide-exit--bottom-right {
  animation-name: Toastify__slideOutRight;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-center {
  animation-name: Toastify__slideOutUp;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--bottom-center {
  animation-name: Toastify__slideOutDown;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

@keyframes Toastify__spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;
var Kr = new Map();
var cm = (e, t) => {
  Js(() => {
    if (typeof document === "undefined") {
      return;
    }
    let n = document;
    let r = Kr.get(n);
    if (r) {
      if (t) {
        r.setAttribute("nonce", t);
      }
      return;
    }
    let o = n.createElement("style");
    o.textContent = e;
    if (t) {
      o.setAttribute("nonce", t);
    }
    n.head.appendChild(o);
    Kr.set(n, o);
  }, [t]);
};
function _Component(e) {
  cm(lm, e.nonce);
  return $.createElement(am, {
    ...e
  });
}
function Sh() {
  return <_Component autoClose={4000} position="top-right" hideProgressBar={true} />;
}
function dm(e) {
  return <span className="text-base"><i className={If("toast-icon", e.data.type === "warning" || e.data.type === "error" ? "icon-exclamation-sign" : "icon-info-sign")} /> {e.data.text}</span>;
}
function vh(e) {
  J(dm, {
    autoClose: e.duration,
    className: `toastify toast-${e.type ?? "info"}`,
    data: e
  });
}
export { ph as $, bn as A, kt as B, sh as C, hu as D, ys as E, ih as F, _u as G, Jm as H, Tu as I, rh as J, tu as K, th as L, nu as M, oh as N, qc as O, be as P, Qc as Q, Km as R, nh as S, qe as T, po as U, Om as V, Bm as W, Sh as X, Dm as Y, $e as Z, Jn as _, $m as a, Xl as a$, Xn as a0, yr as a1, Fr as a2, Dt as a3, bh as a4, mh as a5, gh as a6, Nm as a7, ch as a8, _a as a9, Wl as aA, km as aB, Tm as aC, zm as aD, Wt as aE, Hl as aF, ut as aG, X as aH, Am as aI, Ie as aJ, kl as aK, Im as aL, xl as aM, wm as aN, xa as aO, Nc as aP, Um as aQ, ga as aR, Gm as aS, ka as aT, Lm as aU, Vm as aV, Em as aW, Cm as aX, da as aY, Xm as aZ, xm as a_, lh as aa, ah as ab, Fm as ac, yo as ad, Br as ae, Uu as af, zu as ag, fh as ah, ju as ai, hh as aj, Ru as ak, dh as al, yh as am, Fe as an, Rr as ao, Se as ap, Mu as aq, uh as ar, It as as, Gt as at, Tn as au, ws as av, jl as aw, Ts as ax, Qn as ay, dl as az, jm as b, Wm as b0, re as b1, dc as b2, Xt as b3, Nt as b4, $n as b5, Ss as b6, Zm as b7, Ym as b8, Qm as b9, eu as ba, eh as bb, qm as bc, ds as bd, us as be, iu as bf, su as bg, ou as bh, ru as bi, gs as bj, Qe as bk, lu as bl, au as bm, Ar as bn, pu as bo, Sa as bp, Ue as bq, If as c, dt as d, pe as e, Ja as f, Lt as g, ge as h, Ll as i, ko as j, Rd as k, Gn as l, Ka as m, To as n, Za as o, ho as p, Hm as q, Ro as r, vh as s, Wo as t, Ve as u, Ee as v, Ke as w, Mm as x, Rm as y, Pm as z };
/*! Chunk Base (c) Alexander Gundermann - https://www.chunkbase.com - unauthorized copying prohibited */
//# chunkId=019fd253-75b6-7901-a811-9144a7b04bd5