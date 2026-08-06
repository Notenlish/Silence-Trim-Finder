(function () {
  try {
    var e =
      typeof window != "undefined"
        ? window
        : typeof global != "undefined"
          ? global
          : typeof globalThis != "undefined"
            ? globalThis
            : typeof self != "undefined"
              ? self
              : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019fb98d-ff79-7831-a0b6-94310238695c";
    }
  } catch (e) {}
})();
const Go = Symbol("Comlink.proxy");
const Sa = Symbol("Comlink.endpoint");
const xa = Symbol("Comlink.releaseProxy");
const ur = Symbol("Comlink.finalizer");
const wn = Symbol("Comlink.thrown");
const jo = (e) =>
  (typeof e == "object" && e !== null) || typeof e == "function";
const Ca = {
  canHandle: (e) => jo(e) && e[Go],
  serialize(e) {
    const { port1: t, port2: n } = new MessageChannel();
    Qr(e, t);
    return [n, [n]];
  },
  deserialize(e) {
    e.start();
    return Ia(e);
  },
};
const Ta = {
  canHandle: (e) => jo(e) && wn in e,
  serialize({ value: e }) {
    let t;
    if (e instanceof Error) {
      t = {
        isError: true,
        value: {
          message: e.message,
          name: e.name,
          stack: e.stack,
        },
      };
    } else {
      t = {
        isError: false,
        value: e,
      };
    }
    return [t, []];
  },
  deserialize(e) {
    throw e.isError
      ? Object.assign(new Error(e.value.message), e.value)
      : e.value;
  },
};
const Uo = new Map([
  ["proxy", Ca],
  ["throw", Ta],
]);
function Ba(e, t) {
  for (const n of e) {
    if (t === n || n === "*" || (n instanceof RegExp && n.test(t))) {
      return true;
    }
  }
  return false;
}
function Qr(e, t = globalThis, n = ["*"]) {
  t.addEventListener("message", function r(i) {
    if (!i || !i.data) {
      return;
    }
    if (!Ba(n, i.origin)) {
      console.warn(`Invalid origin '${i.origin}' for comlink proxy`);
      return;
    }
    const {
      id: o,
      type: s,
      path: a,
    } = Object.assign(
      {
        path: [],
      },
      i.data,
    );
    const c = (i.data.argumentList || []).map(ct);
    let l;
    try {
      const u = a.slice(0, -1).reduce((f, g) => f[g], e);
      const d = a.reduce((f, g) => f[g], e);
      switch (s) {
        case "GET":
          l = d;
          break;
        case "SET":
          u[a.slice(-1)[0]] = ct(i.data.value);
          l = true;
          break;
        case "APPLY":
          l = d.apply(u, c);
          break;
        case "CONSTRUCT":
          {
            const f = new d(...c);
            l = Qo(f);
          }
          break;
        case "ENDPOINT":
          {
            const { port1: f, port2: g } = new MessageChannel();
            Qr(e, g);
            l = $o(f, [f]);
          }
          break;
        case "RELEASE":
          l = undefined;
          break;
        default:
          return;
      }
    } catch (u) {
      l = {
        value: u,
        [wn]: 0,
      };
    }
    Promise.resolve(l)
      .catch((u) => ({
        value: u,
        [wn]: 0,
      }))
      .then((u) => {
        const [d, f] = Vn(u);
        t.postMessage(
          Object.assign(Object.assign({}, d), {
            id: o,
          }),
          f,
        );
        if (s === "RELEASE") {
          t.removeEventListener("message", r);
          Zo(t);
          if (ur in e && typeof e[ur] == "function") {
            e[ur]();
          }
        }
      })
      .catch((u) => {
        const [d, f] = Vn({
          value: new TypeError("Unserializable return value"),
          [wn]: 0,
        });
        t.postMessage(
          Object.assign(Object.assign({}, d), {
            id: o,
          }),
          f,
        );
      });
  });
  if (t.start) {
    t.start();
  }
}
function Ea(e) {
  return e.constructor.name === "MessagePort";
}
function Zo(e) {
  if (Ea(e)) {
    e.close();
  }
}
function Ia(e, t) {
  const n = new Map();
  e.addEventListener("message", function (i) {
    const { data: o } = i;
    if (!o || !o.id) {
      return;
    }
    const s = n.get(o.id);
    if (s) {
      try {
        s(o);
      } finally {
        n.delete(o.id);
      }
    }
  });
  return br(e, n, [], t);
}
function ln(e) {
  if (e) {
    throw new Error("Proxy has been released and is not useable");
  }
}
function Jo(e) {
  return xt(e, new Map(), {
    type: "RELEASE",
  }).then(() => {
    Zo(e);
  });
}
const En = new WeakMap();
const In =
  "FinalizationRegistry" in globalThis &&
  new FinalizationRegistry((e) => {
    const t = (En.get(e) || 0) - 1;
    En.set(e, t);
    if (t === 0) {
      Jo(e);
    }
  });
function Va(e, t) {
  const n = (En.get(t) || 0) + 1;
  En.set(t, n);
  if (In) {
    In.register(e, t, e);
  }
}
function ka(e) {
  if (In) {
    In.unregister(e);
  }
}
function br(e, t, n = [], r = function () {}) {
  let i = false;
  const o = new Proxy(r, {
    get(s, a) {
      ln(i);
      if (a === xa) {
        return () => {
          ka(o);
          Jo(e);
          t.clear();
          i = true;
        };
      }
      if (a === "then") {
        if (n.length === 0) {
          return {
            then: () => o,
          };
        }
        const c = xt(e, t, {
          type: "GET",
          path: n.map((l) => l.toString()),
        }).then(ct);
        return c.then.bind(c);
      }
      return br(e, t, [...n, a]);
    },
    set(s, a, c) {
      ln(i);
      const [l, u] = Vn(c);
      return xt(
        e,
        t,
        {
          type: "SET",
          path: [...n, a].map((d) => d.toString()),
          value: l,
        },
        u,
      ).then(ct);
    },
    apply(s, a, c) {
      ln(i);
      const l = n[n.length - 1];
      if (l === Sa) {
        return xt(e, t, {
          type: "ENDPOINT",
        }).then(ct);
      }
      if (l === "bind") {
        return br(e, t, n.slice(0, -1));
      }
      const [u, d] = Ei(c);
      return xt(
        e,
        t,
        {
          type: "APPLY",
          path: n.map((f) => f.toString()),
          argumentList: u,
        },
        d,
      ).then(ct);
    },
    construct(s, a) {
      ln(i);
      const [c, l] = Ei(a);
      return xt(
        e,
        t,
        {
          type: "CONSTRUCT",
          path: n.map((u) => u.toString()),
          argumentList: c,
        },
        l,
      ).then(ct);
    },
  });
  Va(o, e);
  return o;
}
function Oa(e) {
  return Array.prototype.concat.apply([], e);
}
function Ei(e) {
  const t = e.map(Vn);
  return [t.map((n) => n[0]), Oa(t.map((n) => n[1]))];
}
const Xo = new WeakMap();
function $o(e, t) {
  Xo.set(e, t);
  return e;
}
function Qo(e) {
  return Object.assign(e, {
    [Go]: true,
  });
}
function Vn(e) {
  for (const [t, n] of Uo) {
    if (n.canHandle(e)) {
      const [r, i] = n.serialize(e);
      return [
        {
          type: "HANDLER",
          name: t,
          value: r,
        },
        i,
      ];
    }
  }
  return [
    {
      type: "RAW",
      value: e,
    },
    Xo.get(e) || [],
  ];
}
function ct(e) {
  switch (e.type) {
    case "HANDLER":
      return Uo.get(e.name).deserialize(e.value);
    case "RAW":
      return e.value;
  }
}
function xt(e, t, n, r) {
  return new Promise((i) => {
    const o = Ma();
    t.set(o, i);
    if (e.start) {
      e.start();
    }
    e.postMessage(
      Object.assign(
        {
          id: o,
        },
        n,
      ),
      r,
    );
  });
}
function Ma() {
  return new Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
    .join("-");
}
var Aa = "/_astro/C7JH1X7RM_Zo.simd.wasm";
var Ko = "/_astro/W1j9-2TfgIvK.wasm";
class vr {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Vi.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_a_free(t, 0);
  }
  a(t, n) {
    return v.a_a(this.__wbg_ptr, t, n);
  }
  constructor(t, n) {
    K(t, ce);
    var r = t.__destroy_into_raw();
    const i = Yo(n, v.__wbindgen_malloc, v.__wbindgen_realloc);
    const o = kn;
    const s = v.a_new(r, i, o);
    this.__wbg_ptr = s;
    Vi.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  vr.prototype[Symbol.dispose] = vr.prototype.free;
}
class Sr {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ki.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_b_free(t, 0);
  }
  a(t, n) {
    v.b_a(this.__wbg_ptr, t, n);
  }
  b(t) {
    return v.b_b(this.__wbg_ptr, t);
  }
  c() {
    return v.b_c(this.__wbg_ptr);
  }
  d() {
    return v.b_d(this.__wbg_ptr) >>> 0;
  }
  e(t, n) {
    return v.b_e(this.__wbg_ptr, t, n);
  }
  f() {
    return v.b_f(this.__wbg_ptr);
  }
  g() {
    return v.b_g(this.__wbg_ptr);
  }
  h() {
    return v.b_h(this.__wbg_ptr) !== 0;
  }
  constructor(t, n) {
    const r = v.b_new(t, n);
    this.__wbg_ptr = r;
    ki.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  Sr.prototype[Symbol.dispose] = Sr.prototype.free;
}
class xr {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Oi.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_c_free(t, 0);
  }
  a(t, n, r, i) {
    const o = v.c_a(this.__wbg_ptr, t, n, r, i);
    var s = ze(o[0], o[1]).slice();
    v.__wbindgen_free(o[0], o[1] * 4, 4);
    return s;
  }
  b(t, n, r, i) {
    const o = v.c_b(this.__wbg_ptr, t, n, r, i);
    var s = ze(o[0], o[1]).slice();
    v.__wbindgen_free(o[0], o[1] * 4, 4);
    return s;
  }
  constructor(t) {
    K(t, ce);
    var n = t.__destroy_into_raw();
    const r = v.c_new(n);
    this.__wbg_ptr = r;
    Oi.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  xr.prototype[Symbol.dispose] = xr.prototype.free;
}
class Cr {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Mi.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_d_free(t, 0);
  }
  a(t, n) {
    return v.d_a(this.__wbg_ptr, t, n);
  }
  b(t, n) {
    return v.d_b(this.__wbg_ptr, t, n);
  }
  c(t, n, r, i, o) {
    const s = v.d_c(this.__wbg_ptr, t, n, r, i, o);
    var a = bn(s[0], s[1]).slice();
    v.__wbindgen_free(s[0], s[1] * 1, 1);
    return a;
  }
  constructor(t) {
    K(t, ce);
    var n = t.__destroy_into_raw();
    const r = v.d_new(n);
    this.__wbg_ptr = r;
    Mi.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  Cr.prototype[Symbol.dispose] = Cr.prototype.free;
}
class Tr {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Ai.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_e_free(t, 0);
  }
  a(t, n, r, i, o) {
    K(t, ae);
    return v.e_a(this.__wbg_ptr, t.__wbg_ptr, n, r, i, o);
  }
  constructor(t) {
    K(t, ce);
    var n = t.__destroy_into_raw();
    const r = v.e_new(n);
    this.__wbg_ptr = r;
    Ai.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  Tr.prototype[Symbol.dispose] = Tr.prototype.free;
}
class Br {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Ri.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_f_free(t, 0);
  }
  a(t, n) {
    const r = v.f_a(this.__wbg_ptr, t, n);
    var i = ze(r[0], r[1]).slice();
    v.__wbindgen_free(r[0], r[1] * 4, 4);
    return i;
  }
  constructor(t) {
    K(t, ce);
    var n = t.__destroy_into_raw();
    const r = v.f_new(n);
    this.__wbg_ptr = r;
    Ri.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  Br.prototype[Symbol.dispose] = Br.prototype.free;
}
class Er {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Fi.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_g_free(t, 0);
  }
  a(t, n, r, i, o) {
    K(t, ae);
    return v.g_a(this.__wbg_ptr, t.__wbg_ptr, n, r, i, o);
  }
  b(t, n, r, i) {
    return v.g_b(this.__wbg_ptr, t, n, r, i);
  }
  constructor(t) {
    K(t, ce);
    var n = t.__destroy_into_raw();
    const r = v.g_new(n);
    this.__wbg_ptr = r;
    Fi.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  Er.prototype[Symbol.dispose] = Er.prototype.free;
}
class Ir {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    zi.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_h_free(t, 0);
  }
  a(t, n) {
    v.h_a(this.__wbg_ptr, t, n);
  }
  b() {
    const t = v.h_b(this.__wbg_ptr);
    var n = ze(t[0], t[1]).slice();
    v.__wbindgen_free(t[0], t[1] * 4, 4);
    return n;
  }
  c(t, n) {
    v.h_c(this.__wbg_ptr, t, n);
  }
  d(t) {
    return v.h_d(this.__wbg_ptr, t);
  }
  e(t) {
    return v.h_e(this.__wbg_ptr, t);
  }
  f() {
    return v.h_f(this.__wbg_ptr);
  }
  g() {
    const t = v.h_g(this.__wbg_ptr);
    var n = ze(t[0], t[1]).slice();
    v.__wbindgen_free(t[0], t[1] * 4, 4);
    return n;
  }
  h() {
    return v.h_h(this.__wbg_ptr);
  }
  i() {
    return v.h_i(this.__wbg_ptr);
  }
  j() {
    return v.h_j(this.__wbg_ptr) !== 0;
  }
  k(t) {
    v.h_k(this.__wbg_ptr, t);
  }
  constructor(t, n) {
    const r = v.h_new(t, n);
    this.__wbg_ptr = r;
    zi.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  Ir.prototype[Symbol.dispose] = Ir.prototype.free;
}
class Vr {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Li.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_i_free(t, 0);
  }
  a(t, n, r, i, o) {
    K(t, ae);
    return v.i_a(this.__wbg_ptr, t.__wbg_ptr, n, r, i, o);
  }
  constructor(t) {
    K(t, ce);
    var n = t.__destroy_into_raw();
    const r = v.i_new(n);
    this.__wbg_ptr = r;
    Li.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  Vr.prototype[Symbol.dispose] = Vr.prototype.free;
}
class kr {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Pi.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_j_free(t, 0);
  }
  a(t, n) {
    K(t, ae);
    return v.j_a(this.__wbg_ptr, t.__wbg_ptr, n);
  }
  b(t, n, r, i, o) {
    K(t, ae);
    return v.j_b(this.__wbg_ptr, t.__wbg_ptr, n, r, i, o);
  }
  constructor(t) {
    K(t, ce);
    var n = t.__destroy_into_raw();
    const r = v.j_new(n);
    this.__wbg_ptr = r;
    Pi.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  kr.prototype[Symbol.dispose] = kr.prototype.free;
}
class ae {
  static __wrap(t) {
    const n = Object.create(ae.prototype);
    n.__wbg_ptr = t;
    Ni.register(n, n.__wbg_ptr, n);
    return n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Ni.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_k_free(t, 0);
  }
  static a(t) {
    K(t, ce);
    var n = t.__destroy_into_raw();
    const r = v.k_a(n);
    return ae.__wrap(r);
  }
  static b(t) {
    K(t, ce);
    var n = t.__destroy_into_raw();
    const r = v.k_b(n);
    return ae.__wrap(r);
  }
  c(t, n, r) {
    return v.k_c(this.__wbg_ptr, t, n, r);
  }
  d(t, n, r) {
    return v.k_d(this.__wbg_ptr, t, n, r);
  }
  e(t, n, r) {
    return v.k_e(this.__wbg_ptr, t, n, r);
  }
  f(t, n, r, i) {
    return v.k_f(this.__wbg_ptr, t, n, r, i);
  }
  g(t, n, r, i) {
    return v.k_g(this.__wbg_ptr, t, n, r, i);
  }
  h(t, n, r, i, o, s, a) {
    const c = v.k_h(this.__wbg_ptr, t, n, r, i, o, s, a);
    var l = ze(c[0], c[1]).slice();
    v.__wbindgen_free(c[0], c[1] * 4, 4);
    return l;
  }
  i(t, n, r, i, o, s, a) {
    const c = v.k_i(this.__wbg_ptr, t, n, r, i, o, s, a);
    var l = bn(c[0], c[1]).slice();
    v.__wbindgen_free(c[0], c[1] * 1, 1);
    return l;
  }
  j(t, n, r, i, o, s) {
    const a = v.k_j(this.__wbg_ptr, t, n, r, i, o, s);
    var c = bn(a[0], a[1]).slice();
    v.__wbindgen_free(a[0], a[1] * 1, 1);
    return c;
  }
  k() {
    const t = v.k_k(this.__wbg_ptr);
    var n = ze(t[0], t[1]).slice();
    v.__wbindgen_free(t[0], t[1] * 4, 4);
    return n;
  }
  l(t, n) {
    return v.k_l(this.__wbg_ptr, t, n);
  }
  m(t, n, r, i) {
    return v.k_m(this.__wbg_ptr, t, n, r, i);
  }
  n(t, n, r) {
    const i = v.k_n(this.__wbg_ptr, t, n, r);
    var o = bn(i[0], i[1]).slice();
    v.__wbindgen_free(i[0], i[1] * 1, 1);
    return o;
  }
  o(t, n, r, i, o, s, a, c) {
    const l = v.k_o(this.__wbg_ptr, t, n, r, i, o, s, a, c);
    var u = ze(l[0], l[1]).slice();
    v.__wbindgen_free(l[0], l[1] * 4, 4);
    return u;
  }
}
if (Symbol.dispose) {
  ae.prototype[Symbol.dispose] = ae.prototype.free;
}
class Or {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Hi.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_l_free(t, 0);
  }
  a(t, n, r, i, o) {
    K(o, ae);
    return v.l_a(this.__wbg_ptr, t, n, r, i, o.__wbg_ptr);
  }
  constructor(t) {
    K(t, ce);
    var n = t.__destroy_into_raw();
    const r = v.l_new(n);
    this.__wbg_ptr = r;
    Hi.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  Or.prototype[Symbol.dispose] = Or.prototype.free;
}
class Mr {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Di.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_m_free(t, 0);
  }
  a(t, n, r, i, o) {
    K(t, ae);
    return v.m_a(this.__wbg_ptr, t.__wbg_ptr, n, r, i, o);
  }
  constructor(t) {
    K(t, ce);
    var n = t.__destroy_into_raw();
    const r = v.m_new(n);
    this.__wbg_ptr = r;
    Di.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  Mr.prototype[Symbol.dispose] = Mr.prototype.free;
}
class ce {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Wi.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_n_free(t, 0);
  }
  constructor(t, n, r, i, o, s) {
    const a = v.n_new(t, n, r, i, qo(o) ? Number.MAX_SAFE_INTEGER : o >> 0, s);
    this.__wbg_ptr = a;
    Wi.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  ce.prototype[Symbol.dispose] = ce.prototype.free;
}
class ft {
  static __wrap(t) {
    const n = Object.create(ft.prototype);
    n.__wbg_ptr = t;
    fr.register(n, n.__wbg_ptr, n);
    return n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    fr.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_p_free(t, 0);
  }
  static a(t, n) {
    const r = v.p_a(t, n);
    return ft.__wrap(r);
  }
  b(t, n) {
    v.p_b(this.__wbg_ptr, t, n);
  }
  c(t) {
    return v.p_c(this.__wbg_ptr, t);
  }
  d() {
    const t = v.p_d(this.__wbg_ptr);
    var n = ze(t[0], t[1]).slice();
    v.__wbindgen_free(t[0], t[1] * 4, 4);
    return n;
  }
  e() {
    return v.p_e(this.__wbg_ptr);
  }
  f() {
    return v.p_f(this.__wbg_ptr);
  }
  g(t) {
    v.p_g(this.__wbg_ptr, t);
  }
  constructor(t, n, r, i) {
    const o = v.p_new(t, n, r, i);
    this.__wbg_ptr = o;
    fr.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  ft.prototype[Symbol.dispose] = ft.prototype.free;
}
class Ar {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    Ii.unregister(this);
    return t;
  }
  free() {
    const t = this.__destroy_into_raw();
    v.__wbg_q_free(t, 0);
  }
  a(t, n, r, i, o) {
    K(t, ae);
    const s = v.q_a(this.__wbg_ptr, t.__wbg_ptr, n, r, i, o);
    var a = ze(s[0], s[1]).slice();
    v.__wbindgen_free(s[0], s[1] * 4, 4);
    return a;
  }
  constructor(t) {
    K(t, ce);
    var n = t.__destroy_into_raw();
    const r = v.q_new(n);
    this.__wbg_ptr = r;
    Ii.register(this, this.__wbg_ptr, this);
    return this;
  }
}
if (Symbol.dispose) {
  Ar.prototype[Symbol.dispose] = Ar.prototype.free;
}
function Ra() {
  return {
    __proto__: null,
    "./rust_wasm_bg.js": {
      __proto__: null,
      __wbg___wbindgen_throw_9c75d47bf9e7731e: function (t, n) {
        throw new Error(ji(t, n));
      },
      __wbg_parse_96694afe7f805200: function (t, n) {
        let r;
        let i;
        try {
          r = t;
          i = n;
          return JSON.parse(ji(t, n));
        } finally {
          v.__wbindgen_free(r, i, 1);
        }
      },
      __wbg_stringify_f469d2b07ec0ff60: function (t, n) {
        const r = JSON.stringify(n);
        var i = qo(r) ? 0 : Yo(r, v.__wbindgen_malloc, v.__wbindgen_realloc);
        var o = kn;
        Gi().setInt32(t + 4, o, true);
        Gi().setInt32(t + 0, i, true);
      },
      __wbindgen_init_externref_table: function () {
        const t = v.__wbindgen_externrefs;
        const n = t.grow(4);
        t.set(0, undefined);
        t.set(n + 0, undefined);
        t.set(n + 1, null);
        t.set(n + 2, true);
        t.set(n + 3, false);
      },
    },
  };
}
const Ii =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_q_free(e, 1));
const Vi =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_a_free(e, 1));
const ki =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_b_free(e, 1));
const Oi =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_c_free(e, 1));
const Mi =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_d_free(e, 1));
const Ai =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_e_free(e, 1));
const Ri =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_f_free(e, 1));
const Fi =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_g_free(e, 1));
const zi =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_h_free(e, 1));
const Li =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_i_free(e, 1));
const Pi =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_j_free(e, 1));
const Ni =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_k_free(e, 1));
const Hi =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_l_free(e, 1));
const Di =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_m_free(e, 1));
const Wi =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_n_free(e, 1));
if (typeof FinalizationRegistry !== "undefined") {
  new FinalizationRegistry((e) => v.__wbg_o_free(e, 1));
}
const fr =
  typeof FinalizationRegistry === "undefined"
    ? {
        register: () => {},
        unregister: () => {},
      }
    : new FinalizationRegistry((e) => v.__wbg_p_free(e, 1));
function K(e, t) {
  if (!(e instanceof t)) {
    throw new Error(`expected instance of ${t.name}`);
  }
}
function ze(e, t) {
  e = e >>> 0;
  return Fa().subarray(e / 4, e / 4 + t);
}
function bn(e, t) {
  e = e >>> 0;
  return Dt().subarray(e / 1, e / 1 + t);
}
let st = null;
function Gi() {
  if (
    st === null ||
    st.buffer.detached === true ||
    (st.buffer.detached === undefined && st.buffer !== v.memory.buffer)
  ) {
    st = new DataView(v.memory.buffer);
  }
  return st;
}
let Nt = null;
function Fa() {
  if (Nt === null || Nt.byteLength === 0) {
    Nt = new Int32Array(v.memory.buffer);
  }
  return Nt;
}
function ji(e, t) {
  return La(e >>> 0, t);
}
let Ht = null;
function Dt() {
  if (Ht === null || Ht.byteLength === 0) {
    Ht = new Uint8Array(v.memory.buffer);
  }
  return Ht;
}
function qo(e) {
  return e == null;
}
function Yo(e, t, n) {
  if (n === undefined) {
    const a = Wt.encode(e);
    const c = t(a.length, 1) >>> 0;
    Dt()
      .subarray(c, c + a.length)
      .set(a);
    kn = a.length;
    return c;
  }
  let r = e.length;
  let i = t(r, 1) >>> 0;
  const o = Dt();
  let s = 0;
  for (; s < r; s++) {
    const a = e.charCodeAt(s);
    if (a > 127) {
      break;
    }
    o[i + s] = a;
  }
  if (s !== r) {
    if (s !== 0) {
      e = e.slice(s);
    }
    i = n(i, r, (r = s + e.length * 3), 1) >>> 0;
    const a = Dt().subarray(i + s, i + r);
    const c = Wt.encodeInto(e, a);
    s += c.written;
    i = n(i, r, s, 1) >>> 0;
  }
  kn = s;
  return i;
}
let vn = new TextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});
vn.decode();
const za = 2146435072;
let dr = 0;
function La(e, t) {
  dr += t;
  if (dr >= za) {
    vn = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true,
    });
    vn.decode();
    dr = t;
  }
  return vn.decode(Dt().subarray(e, e + t));
}
const Wt = new TextEncoder();
if (!("encodeInto" in Wt)) {
  Wt.encodeInto = function (e, t) {
    const n = Wt.encode(e);
    t.set(n);
    return {
      read: e.length,
      written: n.length,
    };
  };
}
let kn = 0;
let v;
function Pa(e, t) {
  v = e.exports;
  st = null;
  Nt = null;
  Ht = null;
  v.__wbindgen_start();
  return v;
}
async function Na(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function") {
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (i) {
        if (
          e.ok &&
          n(e.type) &&
          e.headers.get("Content-Type") !== "application/wasm"
        ) {
          console.warn(
            "`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
            i,
          );
        } else {
          throw i;
        }
      }
    }
    const r = await e.arrayBuffer();
    return await WebAssembly.instantiate(r, t);
  } else {
    const r = await WebAssembly.instantiate(e, t);
    if (r instanceof WebAssembly.Instance) {
      return {
        instance: r,
        module: e,
      };
    } else {
      return r;
    }
  }
  function n(r) {
    switch (r) {
      case "basic":
      case "cors":
      case "default":
        return true;
    }
    return false;
  }
}
async function Ha(e) {
  if (v !== undefined) {
    return v;
  }
  if (e !== undefined) {
    if (Object.getPrototypeOf(e) === Object.prototype) {
      ({ module_or_path: e } = e);
    } else {
      console.warn(
        "using deprecated parameters for the initialization function; pass a single object instead",
      );
    }
  }
  if (e === undefined) {
    e = Ko;
  }
  const t = Ra();
  if (
    typeof e == "string" ||
    (typeof Request == "function" && e instanceof Request) ||
    (typeof URL == "function" && e instanceof URL)
  ) {
    e = fetch(e);
  }
  const { instance: n, module: r } = await Na(await e, t);
  return Pa(n);
}
const Da = async () =>
  WebAssembly.validate(
    new Uint8Array([
      0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10,
      1, 8, 0, 65, 0, 253, 15, 253, 98, 11,
    ]),
  );
let gr;
async function Wa() {
  if (!gr) {
    const t = (await Da().catch((n) => {
      console.error("wasm-feature-detect failed, defaulting to SIMD build", n);
      return true;
    }))
      ? Aa
      : Ko;
    gr = await Ha({
      module_or_path: t,
    });
  }
  return gr;
}
const Ga = 64;
const Tt = new Set();
function ja(e) {
  Tt.add(e);
  if (Tt.size > Ga) {
    for (const t of Tt) {
      Tt.delete(t);
      break;
    }
  }
}
class Et extends Error {
  constructor() {
    super("task cancelled");
  }
}
const Be = async () => {};
const Ua = 200;
function es(e) {
  if (e === undefined) {
    return Be;
  }
  let t = performance.now();
  return async () => {
    if (Tt.has(e)) {
      throw new Et();
    }
    if (
      !(performance.now() - t < Ua) &&
      (await Za(), (t = performance.now()), Tt.has(e))
    ) {
      throw new Et();
    }
  };
}
function Za() {
  return new Promise((e) => {
    const { port1: t, port2: n } = new MessageChannel();
    t.onmessage = () => {
      t.close();
      e();
    };
    n.postMessage(null);
  });
}
class Ja extends Map {
  #n = 0;
  #e = new Map();
  #t = new Map();
  #i;
  #s;
  #o;
  constructor(t = {}) {
    super();
    if (!t.maxSize || !(t.maxSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }
    if (typeof t.maxAge == "number" && t.maxAge === 0) {
      throw new TypeError("`maxAge` must be a number greater than 0");
    }
    this.#i = t.maxSize;
    this.#s = t.maxAge || Number.POSITIVE_INFINITY;
    this.#o = t.onEviction;
  }
  get __oldCache() {
    return this.#t;
  }
  #a(t) {
    if (typeof this.#o == "function") {
      for (const [n, r] of t) {
        this.#o(n, r.value);
      }
    }
  }
  #r(t, n) {
    if (typeof n.expiry == "number" && n.expiry <= Date.now()) {
      if (typeof this.#o == "function") {
        this.#o(t, n.value);
      }
      return this.delete(t);
    } else {
      return false;
    }
  }
  #d(t, n) {
    if (this.#r(t, n) === false) {
      return n.value;
    }
  }
  #l(t, n) {
    if (n.expiry) {
      return this.#d(t, n);
    } else {
      return n.value;
    }
  }
  #u(t, n) {
    const r = n.get(t);
    return this.#l(t, r);
  }
  #f(t, n) {
    this.#e.set(t, n);
    this.#n++;
    if (this.#n >= this.#i) {
      this.#n = 0;
      this.#a(this.#t);
      this.#t = this.#e;
      this.#e = new Map();
    }
  }
  #g(t, n) {
    this.#t.delete(t);
    this.#f(t, n);
  }
  *#c() {
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
      return this.#l(t, n);
    }
    if (this.#t.has(t)) {
      const n = this.#t.get(t);
      if (this.#r(t, n) === false) {
        this.#g(t, n);
        return n.value;
      }
    }
  }
  set(t, n, { maxAge: r = this.#s } = {}) {
    const i =
      typeof r == "number" && r !== Number.POSITIVE_INFINITY
        ? Date.now() + r
        : undefined;
    if (this.#e.has(t)) {
      this.#e.set(t, {
        value: n,
        expiry: i,
      });
    } else {
      this.#f(t, {
        value: n,
        expiry: i,
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
    const n = [...this.#c()];
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
    this.#i = t;
  }
  evict(t = 1) {
    const n = Number(t);
    if (!n || n <= 0) {
      return;
    }
    const r = [...this.#c()];
    const i = Math.trunc(Math.min(n, Math.max(r.length - 1, 0)));
    if (!(i <= 0)) {
      this.#a(r.slice(0, i));
      this.#t = new Map(r.slice(i));
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
      const [i, o] = r;
      if (this.#r(i, o) === false) {
        yield [i, o.value];
      }
    }
    t = [...this.#t];
    for (let n = t.length - 1; n >= 0; --n) {
      const r = t[n];
      const [i, o] = r;
      if (!this.#e.has(i)) {
        if (this.#r(i, o) === false) {
          yield [i, o.value];
        }
      }
    }
  }
  *entriesAscending() {
    for (const [t, n] of this.#c()) {
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
    return Math.min(this.#n + t, this.#i);
  }
  get maxSize() {
    return this.#i;
  }
  get maxAge() {
    return this.#s;
  }
  entries() {
    return this.entriesAscending();
  }
  forEach(t, n = this) {
    for (const [r, i] of this.entriesAscending()) {
      t.call(n, i, r, this);
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
const Kr = new Ja({
  maxSize: 1024,
});
function Xa(e) {
  return Kr.get(e);
}
function $a(e, t) {
  Kr.set(e, t);
}
function Qa() {
  Kr.clear();
}
var Ce = null;
try {
  Ce = new WebAssembly.Instance(
    new WebAssembly.Module(
      new Uint8Array([
        0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127,
        127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11,
        7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5,
        100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114,
        101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0,
        10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173,
        66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4,
        66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32,
        1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127,
        34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0,
        173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134,
        132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126,
        32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66,
        32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36,
        1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3,
        173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167,
        11,
      ]),
    ),
    {},
  ).exports;
} catch {}
function k(e, t, n) {
  this.low = e | 0;
  this.high = t | 0;
  this.unsigned = !!n;
}
k.prototype.__isLong__;
Object.defineProperty(k.prototype, "__isLong__", {
  value: true,
});
function le(e) {
  return (e && e.__isLong__) === true;
}
function Ui(e) {
  var t = Math.clz32(e & -e);
  if (e) {
    return 31 - t;
  } else {
    return t;
  }
}
k.isLong = le;
var Zi = {};
var Ji = {};
function yt(e, t) {
  var n;
  var r;
  var i;
  if (t) {
    e >>>= 0;
    if ((i = e >= 0 && e < 256) && ((r = Ji[e]), r)) {
      return r;
    } else {
      n = j(e, 0, true);
      if (i) {
        Ji[e] = n;
      }
      return n;
    }
  } else {
    e |= 0;
    if ((i = e >= -128 && e < 128) && ((r = Zi[e]), r)) {
      return r;
    } else {
      n = j(e, e < 0 ? -1 : 0, false);
      if (i) {
        Zi[e] = n;
      }
      return n;
    }
  }
}
k.fromInt = yt;
function Te(e, t) {
  if (isNaN(e)) {
    if (t) {
      return We;
    } else {
      return Oe;
    }
  }
  if (t) {
    if (e < 0) {
      return We;
    }
    if (e >= ts) {
      return is;
    }
  } else {
    if (e <= -$i) {
      return ge;
    }
    if (e + 1 >= $i) {
      return rs;
    }
  }
  if (e < 0) {
    return Te(-e, t).neg();
  } else {
    return j((e % It) | 0, (e / It) | 0, t);
  }
}
k.fromNumber = Te;
function j(e, t, n) {
  return new k(e, t, n);
}
k.fromBits = j;
var On = Math.pow;
function qr(e, t, n) {
  if (e.length === 0) {
    throw Error("empty string");
  }
  if (typeof t == "number") {
    n = t;
    t = false;
  } else {
    t = !!t;
  }
  if (
    e === "NaN" ||
    e === "Infinity" ||
    e === "+Infinity" ||
    e === "-Infinity"
  ) {
    if (t) {
      return We;
    } else {
      return Oe;
    }
  }
  n = n || 10;
  if (n < 2 || n > 36) {
    throw RangeError("radix");
  }
  var r;
  if ((r = e.indexOf("-")) > 0) {
    throw Error("interior hyphen");
  }
  if (r === 0) {
    return qr(e.substring(1), t, n).neg();
  }
  var i = Te(On(n, 8));
  var o = Oe;
  for (var s = 0; s < e.length; s += 8) {
    var a = Math.min(8, e.length - s);
    var c = parseInt(e.substring(s, s + a), n);
    if (a < 8) {
      var l = Te(On(n, a));
      o = o.mul(l).add(Te(c));
    } else {
      o = o.mul(i);
      o = o.add(Te(c));
    }
  }
  o.unsigned = t;
  return o;
}
k.fromString = qr;
function Ee(e, t) {
  if (typeof e == "number") {
    return Te(e, t);
  } else if (typeof e == "string") {
    return qr(e, t);
  } else {
    return j(e.low, e.high, typeof t == "boolean" ? t : e.unsigned);
  }
}
k.fromValue = Ee;
var Xi = 65536;
var Ka = 16777216;
var It = Xi * Xi;
var ts = It * It;
var $i = ts / 2;
var Qi = yt(Ka);
var Oe = yt(0);
k.ZERO = Oe;
var We = yt(0, true);
k.UZERO = We;
var Bt = yt(1);
k.ONE = Bt;
var ns = yt(1, true);
k.UONE = ns;
var Rr = yt(-1);
k.NEG_ONE = Rr;
var rs = j(-1, 2147483647, false);
k.MAX_VALUE = rs;
var is = j(-1, -1, true);
k.MAX_UNSIGNED_VALUE = is;
var ge = j(0, -2147483648, false);
k.MIN_VALUE = ge;
var T = k.prototype;
T.toInt = function () {
  if (this.unsigned) {
    return this.low >>> 0;
  } else {
    return this.low;
  }
};
T.toNumber = function () {
  if (this.unsigned) {
    return (this.high >>> 0) * It + (this.low >>> 0);
  } else {
    return this.high * It + (this.low >>> 0);
  }
};
T.toString = function (t) {
  t = t || 10;
  if (t < 2 || t > 36) {
    throw RangeError("radix");
  }
  if (this.isZero()) {
    return "0";
  }
  if (this.isNegative()) {
    if (this.eq(ge)) {
      var n = Te(t);
      var r = this.div(n);
      var i = r.mul(n).sub(this);
      return r.toString(t) + i.toInt().toString(t);
    } else {
      return "-" + this.neg().toString(t);
    }
  }
  var o = Te(On(t, 6), this.unsigned);
  var s = this;
  var a = "";
  while (true) {
    var c = s.div(o);
    var l = s.sub(c.mul(o)).toInt() >>> 0;
    var u = l.toString(t);
    s = c;
    if (s.isZero()) {
      return u + a;
    }
    while (u.length < 6) {
      u = "0" + u;
    }
    a = "" + u + a;
  }
};
T.getHighBits = function () {
  return this.high;
};
T.getHighBitsUnsigned = function () {
  return this.high >>> 0;
};
T.getLowBits = function () {
  return this.low;
};
T.getLowBitsUnsigned = function () {
  return this.low >>> 0;
};
T.getNumBitsAbs = function () {
  if (this.isNegative()) {
    if (this.eq(ge)) {
      return 64;
    } else {
      return this.neg().getNumBitsAbs();
    }
  }
  for (
    var t = this.high != 0 ? this.high : this.low, n = 31;
    n > 0 && (t & (1 << n)) == 0;
    n--
  );
  if (this.high != 0) {
    return n + 33;
  } else {
    return n + 1;
  }
};
T.isSafeInteger = function () {
  var t = this.high >> 21;
  if (t) {
    if (this.unsigned) {
      return false;
    } else {
      return t === -1 && (this.low !== 0 || this.high !== -2097152);
    }
  } else {
    return true;
  }
};
T.isZero = function () {
  return this.high === 0 && this.low === 0;
};
T.eqz = T.isZero;
T.isNegative = function () {
  return !this.unsigned && this.high < 0;
};
T.isPositive = function () {
  return this.unsigned || this.high >= 0;
};
T.isOdd = function () {
  return (this.low & 1) === 1;
};
T.isEven = function () {
  return (this.low & 1) === 0;
};
T.equals = function (t) {
  if (!le(t)) {
    t = Ee(t);
  }
  if (
    this.unsigned !== t.unsigned &&
    this.high >>> 31 === 1 &&
    t.high >>> 31 === 1
  ) {
    return false;
  } else {
    return this.high === t.high && this.low === t.low;
  }
};
T.eq = T.equals;
T.notEquals = function (t) {
  return !this.eq(t);
};
T.neq = T.notEquals;
T.ne = T.notEquals;
T.lessThan = function (t) {
  return this.comp(t) < 0;
};
T.lt = T.lessThan;
T.lessThanOrEqual = function (t) {
  return this.comp(t) <= 0;
};
T.lte = T.lessThanOrEqual;
T.le = T.lessThanOrEqual;
T.greaterThan = function (t) {
  return this.comp(t) > 0;
};
T.gt = T.greaterThan;
T.greaterThanOrEqual = function (t) {
  return this.comp(t) >= 0;
};
T.gte = T.greaterThanOrEqual;
T.ge = T.greaterThanOrEqual;
T.compare = function (t) {
  if (!le(t)) {
    t = Ee(t);
  }
  if (this.eq(t)) {
    return 0;
  }
  var n = this.isNegative();
  var r = t.isNegative();
  if (n && !r) {
    return -1;
  } else if (!n && r) {
    return 1;
  } else if (this.unsigned) {
    if (
      t.high >>> 0 > this.high >>> 0 ||
      (t.high === this.high && t.low >>> 0 > this.low >>> 0)
    ) {
      return -1;
    } else {
      return 1;
    }
  } else if (this.sub(t).isNegative()) {
    return -1;
  } else {
    return 1;
  }
};
T.comp = T.compare;
T.negate = function () {
  if (!this.unsigned && this.eq(ge)) {
    return ge;
  } else {
    return this.not().add(Bt);
  }
};
T.neg = T.negate;
T.add = function (t) {
  if (!le(t)) {
    t = Ee(t);
  }
  var n = this.high >>> 16;
  var r = this.high & 65535;
  var i = this.low >>> 16;
  var o = this.low & 65535;
  var s = t.high >>> 16;
  var a = t.high & 65535;
  var c = t.low >>> 16;
  var l = t.low & 65535;
  var u = 0;
  var d = 0;
  var f = 0;
  var g = 0;
  g += o + l;
  f += g >>> 16;
  g &= 65535;
  f += i + c;
  d += f >>> 16;
  f &= 65535;
  d += r + a;
  u += d >>> 16;
  d &= 65535;
  u += n + s;
  u &= 65535;
  return j((f << 16) | g, (u << 16) | d, this.unsigned);
};
T.subtract = function (t) {
  if (!le(t)) {
    t = Ee(t);
  }
  return this.add(t.neg());
};
T.sub = T.subtract;
T.multiply = function (t) {
  if (this.isZero()) {
    return this;
  }
  if (!le(t)) {
    t = Ee(t);
  }
  if (Ce) {
    var n = Ce.mul(this.low, this.high, t.low, t.high);
    return j(n, Ce.get_high(), this.unsigned);
  }
  if (t.isZero()) {
    if (this.unsigned) {
      return We;
    } else {
      return Oe;
    }
  }
  if (this.eq(ge)) {
    if (t.isOdd()) {
      return ge;
    } else {
      return Oe;
    }
  }
  if (t.eq(ge)) {
    if (this.isOdd()) {
      return ge;
    } else {
      return Oe;
    }
  }
  if (this.isNegative()) {
    if (t.isNegative()) {
      return this.neg().mul(t.neg());
    } else {
      return this.neg().mul(t).neg();
    }
  }
  if (t.isNegative()) {
    return this.mul(t.neg()).neg();
  }
  if (this.lt(Qi) && t.lt(Qi)) {
    return Te(this.toNumber() * t.toNumber(), this.unsigned);
  }
  var r = this.high >>> 16;
  var i = this.high & 65535;
  var o = this.low >>> 16;
  var s = this.low & 65535;
  var a = t.high >>> 16;
  var c = t.high & 65535;
  var l = t.low >>> 16;
  var u = t.low & 65535;
  var d = 0;
  var f = 0;
  var g = 0;
  var h = 0;
  h += s * u;
  g += h >>> 16;
  h &= 65535;
  g += o * u;
  f += g >>> 16;
  g &= 65535;
  g += s * l;
  f += g >>> 16;
  g &= 65535;
  f += i * u;
  d += f >>> 16;
  f &= 65535;
  f += o * l;
  d += f >>> 16;
  f &= 65535;
  f += s * c;
  d += f >>> 16;
  f &= 65535;
  d += r * u + i * l + o * c + s * a;
  d &= 65535;
  return j((g << 16) | h, (d << 16) | f, this.unsigned);
};
T.mul = T.multiply;
T.divide = function (t) {
  if (!le(t)) {
    t = Ee(t);
  }
  if (t.isZero()) {
    throw Error("division by zero");
  }
  if (Ce) {
    if (
      !this.unsigned &&
      this.high === -2147483648 &&
      t.low === -1 &&
      t.high === -1
    ) {
      return this;
    }
    var n = (this.unsigned ? Ce.div_u : Ce.div_s)(
      this.low,
      this.high,
      t.low,
      t.high,
    );
    return j(n, Ce.get_high(), this.unsigned);
  }
  if (this.isZero()) {
    if (this.unsigned) {
      return We;
    } else {
      return Oe;
    }
  }
  var r;
  var i;
  var o;
  if (this.unsigned) {
    if (!t.unsigned) {
      t = t.toUnsigned();
    }
    if (t.gt(this)) {
      return We;
    }
    if (t.gt(this.shru(1))) {
      return ns;
    }
    o = We;
  } else {
    if (this.eq(ge)) {
      if (t.eq(Bt) || t.eq(Rr)) {
        return ge;
      }
      if (t.eq(ge)) {
        return Bt;
      }
      var s = this.shr(1);
      r = s.div(t).shl(1);
      if (r.eq(Oe)) {
        if (t.isNegative()) {
          return Bt;
        } else {
          return Rr;
        }
      } else {
        i = this.sub(t.mul(r));
        o = r.add(i.div(t));
        return o;
      }
    } else if (t.eq(ge)) {
      if (this.unsigned) {
        return We;
      } else {
        return Oe;
      }
    }
    if (this.isNegative()) {
      if (t.isNegative()) {
        return this.neg().div(t.neg());
      } else {
        return this.neg().div(t).neg();
      }
    }
    if (t.isNegative()) {
      return this.div(t.neg()).neg();
    }
    o = Oe;
  }
  for (i = this; i.gte(t); ) {
    r = Math.max(1, Math.floor(i.toNumber() / t.toNumber()));
    var a = Math.ceil(Math.log(r) / Math.LN2);
    var c = a <= 48 ? 1 : On(2, a - 48);
    var l = Te(r);
    for (var u = l.mul(t); u.isNegative() || u.gt(i); ) {
      r -= c;
      l = Te(r, this.unsigned);
      u = l.mul(t);
    }
    if (l.isZero()) {
      l = Bt;
    }
    o = o.add(l);
    i = i.sub(u);
  }
  return o;
};
T.div = T.divide;
T.modulo = function (t) {
  if (!le(t)) {
    t = Ee(t);
  }
  if (Ce) {
    var n = (this.unsigned ? Ce.rem_u : Ce.rem_s)(
      this.low,
      this.high,
      t.low,
      t.high,
    );
    return j(n, Ce.get_high(), this.unsigned);
  }
  return this.sub(this.div(t).mul(t));
};
T.mod = T.modulo;
T.rem = T.modulo;
T.not = function () {
  return j(~this.low, ~this.high, this.unsigned);
};
T.countLeadingZeros = function () {
  if (this.high) {
    return Math.clz32(this.high);
  } else {
    return Math.clz32(this.low) + 32;
  }
};
T.clz = T.countLeadingZeros;
T.countTrailingZeros = function () {
  if (this.low) {
    return Ui(this.low);
  } else {
    return Ui(this.high) + 32;
  }
};
T.ctz = T.countTrailingZeros;
T.and = function (t) {
  if (!le(t)) {
    t = Ee(t);
  }
  return j(this.low & t.low, this.high & t.high, this.unsigned);
};
T.or = function (t) {
  if (!le(t)) {
    t = Ee(t);
  }
  return j(this.low | t.low, this.high | t.high, this.unsigned);
};
T.xor = function (t) {
  if (!le(t)) {
    t = Ee(t);
  }
  return j(this.low ^ t.low, this.high ^ t.high, this.unsigned);
};
T.shiftLeft = function (t) {
  if (le(t)) {
    t = t.toInt();
  }
  if ((t &= 63) === 0) {
    return this;
  } else if (t < 32) {
    return j(
      this.low << t,
      (this.high << t) | (this.low >>> (32 - t)),
      this.unsigned,
    );
  } else {
    return j(0, this.low << (t - 32), this.unsigned);
  }
};
T.shl = T.shiftLeft;
T.shiftRight = function (t) {
  if (le(t)) {
    t = t.toInt();
  }
  if ((t &= 63) === 0) {
    return this;
  } else if (t < 32) {
    return j(
      (this.low >>> t) | (this.high << (32 - t)),
      this.high >> t,
      this.unsigned,
    );
  } else {
    return j(this.high >> (t - 32), this.high >= 0 ? 0 : -1, this.unsigned);
  }
};
T.shr = T.shiftRight;
T.shiftRightUnsigned = function (t) {
  if (le(t)) {
    t = t.toInt();
  }
  if ((t &= 63) === 0) {
    return this;
  } else if (t < 32) {
    return j(
      (this.low >>> t) | (this.high << (32 - t)),
      this.high >>> t,
      this.unsigned,
    );
  } else if (t === 32) {
    return j(this.high, 0, this.unsigned);
  } else {
    return j(this.high >>> (t - 32), 0, this.unsigned);
  }
};
T.shru = T.shiftRightUnsigned;
T.shr_u = T.shiftRightUnsigned;
T.rotateLeft = function (t) {
  var n;
  if (le(t)) {
    t = t.toInt();
  }
  if ((t &= 63) === 0) {
    return this;
  } else if (t === 32) {
    return j(this.high, this.low, this.unsigned);
  } else if (t < 32) {
    n = 32 - t;
    return j(
      (this.low << t) | (this.high >>> n),
      (this.high << t) | (this.low >>> n),
      this.unsigned,
    );
  } else {
    t -= 32;
    n = 32 - t;
    return j(
      (this.high << t) | (this.low >>> n),
      (this.low << t) | (this.high >>> n),
      this.unsigned,
    );
  }
};
T.rotl = T.rotateLeft;
T.rotateRight = function (t) {
  var n;
  if (le(t)) {
    t = t.toInt();
  }
  if ((t &= 63) === 0) {
    return this;
  } else if (t === 32) {
    return j(this.high, this.low, this.unsigned);
  } else if (t < 32) {
    n = 32 - t;
    return j(
      (this.high << n) | (this.low >>> t),
      (this.low << n) | (this.high >>> t),
      this.unsigned,
    );
  } else {
    t -= 32;
    n = 32 - t;
    return j(
      (this.low << n) | (this.high >>> t),
      (this.high << n) | (this.low >>> t),
      this.unsigned,
    );
  }
};
T.rotr = T.rotateRight;
T.toSigned = function () {
  if (this.unsigned) {
    return j(this.low, this.high, false);
  } else {
    return this;
  }
};
T.toUnsigned = function () {
  if (this.unsigned) {
    return this;
  } else {
    return j(this.low, this.high, true);
  }
};
T.toBytes = function (t) {
  if (t) {
    return this.toBytesLE();
  } else {
    return this.toBytesBE();
  }
};
T.toBytesLE = function () {
  var t = this.high;
  var n = this.low;
  return [
    n & 255,
    (n >>> 8) & 255,
    (n >>> 16) & 255,
    n >>> 24,
    t & 255,
    (t >>> 8) & 255,
    (t >>> 16) & 255,
    t >>> 24,
  ];
};
T.toBytesBE = function () {
  var t = this.high;
  var n = this.low;
  return [
    t >>> 24,
    (t >>> 16) & 255,
    (t >>> 8) & 255,
    t & 255,
    n >>> 24,
    (n >>> 16) & 255,
    (n >>> 8) & 255,
    n & 255,
  ];
};
k.fromBytes = function (t, n, r) {
  if (r) {
    return k.fromBytesLE(t, n);
  } else {
    return k.fromBytesBE(t, n);
  }
};
k.fromBytesLE = function (t, n) {
  return new k(
    t[0] | (t[1] << 8) | (t[2] << 16) | (t[3] << 24),
    t[4] | (t[5] << 8) | (t[6] << 16) | (t[7] << 24),
    n,
  );
};
k.fromBytesBE = function (t, n) {
  return new k(
    (t[4] << 24) | (t[5] << 16) | (t[6] << 8) | t[7],
    (t[0] << 24) | (t[1] << 16) | (t[2] << 8) | t[3],
    n,
  );
};
if (typeof BigInt == "function") {
  k.fromBigInt = function (t, n) {
    var r = Number(BigInt.asIntN(32, t));
    var i = Number(BigInt.asIntN(32, t >> BigInt(32)));
    return j(r, i, n);
  };
  k.fromValue = function (t, n) {
    if (typeof t == "bigint") {
      return k.fromBigInt(t, n);
    } else {
      return Ee(t, n);
    }
  };
  T.toBigInt = function () {
    var t = BigInt(this.low >>> 0);
    var n = BigInt(this.unsigned ? this.high >>> 0 : this.high);
    return (n << BigInt(32)) | t;
  };
}
var _ = ((e) => {
  e.Java = "Java";
  e.Bedrock = "Bedrock";
  return e;
})(_ || {});
var p = ((e) => {
  e[(e.V1_7 = 100700)] = "V1_7";
  e[(e.V1_8 = 100800)] = "V1_8";
  e[(e.V1_9 = 100900)] = "V1_9";
  e[(e.V1_10 = 101000)] = "V1_10";
  e[(e.V1_11 = 101100)] = "V1_11";
  e[(e.V1_12 = 101200)] = "V1_12";
  e[(e.V1_13 = 101300)] = "V1_13";
  e[(e.V1_14 = 101400)] = "V1_14";
  e[(e.V1_15 = 101500)] = "V1_15";
  e[(e.V1_16 = 101600)] = "V1_16";
  e[(e.V1_17 = 101700)] = "V1_17";
  e[(e.V1_18 = 101800)] = "V1_18";
  e[(e.V1_19 = 101900)] = "V1_19";
  e[(e.V1_19_3 = 101903)] = "V1_19_3";
  e[(e.V1_20 = 102000)] = "V1_20";
  e[(e.V1_21 = 102100)] = "V1_21";
  e[(e.V1_21_2 = 102102)] = "V1_21_2";
  e[(e.V1_21_4 = 102104)] = "V1_21_4";
  e[(e.V1_21_5 = 102105)] = "V1_21_5";
  e[(e.V1_21_6 = 102106)] = "V1_21_6";
  e[(e.V1_21_9 = 102109)] = "V1_21_9";
  e[(e.V26_2 = 260200)] = "V26_2";
  e[(e.V26_3 = 260300)] = "V26_3";
  return e;
})(p || {});
var S = ((e) => {
  e[(e.V1_14 = 101400)] = "V1_14";
  e[(e.V1_16 = 101600)] = "V1_16";
  e[(e.V1_17 = 101700)] = "V1_17";
  e[(e.V1_18 = 101800)] = "V1_18";
  e[(e.V1_19 = 101900)] = "V1_19";
  e[(e.V1_20 = 102000)] = "V1_20";
  e[(e.V1_20_60 = 102006)] = "V1_20_60";
  e[(e.V1_21 = 102100)] = "V1_21";
  e[(e.V1_21_40 = 102104)] = "V1_21_40";
  e[(e.V1_21_50 = 102105)] = "V1_21_50";
  e[(e.V1_21_60 = 102106)] = "V1_21_60";
  e[(e.V1_21_70 = 102107)] = "V1_21_70";
  e[(e.V1_21_80 = 102108)] = "V1_21_80";
  e[(e.V1_21_90 = 102109)] = "V1_21_90";
  e[(e.V1_21_110 = 102111)] = "V1_21_110";
  e[(e.V1_21_120 = 102112)] = "V1_21_120";
  e[(e.V26_30 = 263000)] = "V26_30";
  e[(e.V26_40 = 264000)] = "V26_40";
  e[(e.V26_50 = 265000)] = "V26_50";
  return e;
})(S || {});
var y = ((e) => {
  e.Overworld = "overworld";
  e.Nether = "nether";
  e.End = "end";
  return e;
})(y || {});
var ye = ((e) => {
  e[(e.ZOMBIE = 0)] = "ZOMBIE";
  e[(e.SPIDER = 1)] = "SPIDER";
  e[(e.SKELETON = 2)] = "SKELETON";
  return e;
})(ye || {});
var m = ((e) => {
  e.AbandonedCamp = "abandonedCamp";
  e.BastionRemnant = "bastionRemnant";
  e.BuriedTreasure = "buriedTreasure";
  e.Dungeon = "dungeon";
  e.EndCity = "endCity";
  e.NetherFortress = "netherFortress";
  e.SlimeChunk = "slimeChunk";
  e.Stronghold = "stronghold";
  e.Village = "village";
  e.Mineshaft = "mineshaft";
  e.WoodlandMansion = "woodlandMansion";
  e.PillagerOutpost = "pillagerOutpost";
  e.OceanRuin = "oceanRuin";
  e.OceanMonument = "oceanMonument";
  e.Shipwreck = "shipwreck";
  e.DesertTemple = "desertTemple";
  e.JungleTemple = "jungleTemple";
  e.WitchHut = "witchHut";
  e.Igloo = "igloo";
  e.RuinedPortalOverworld = "ruinedPortalOverworld";
  e.RuinedPortalNether = "ruinedPortalNether";
  e.Spawn = "spawn";
  e.Fossil = "fossil";
  e.FossilNether = "fossilNether";
  e.Ravine = "ravine";
  e.EndGateway = "endGateway";
  e.AmethystGeode = "amethystGeode";
  e.AncientCity = "ancientCity";
  e.ItemOverworld = "itemOverworld";
  e.OreVein = "oreVein";
  e.Cave = "cave";
  e.DesertWell = "desertWell";
  e.TrailRuin = "trailRuin";
  e.TrialChamber = "trialChamber";
  e.LavaPool = "lavaPool";
  return e;
})(m || {});
const he = 0;
const Nn = "none";
const Fe = [];
const qa = {};
const Xe = B({
  id: 0,
  key: "ocean",
  name: "Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1,
  rgb: [0, 0, 112],
  dimension: y.Overworld,
  displayCategory: "water",
});
const Ie = B({
  id: 1,
  key: "plains",
  name: "Plains",
  category: "plains",
  temperature: 0.8,
  precipitation: "rain",
  depth: 0.125,
  rgb: [141, 179, 96],
  dimension: y.Overworld,
  displayCategory: "plains",
});
const Y = B({
  id: 2,
  key: "desert",
  name: "Desert",
  category: "desert",
  temperature: 2,
  precipitation: "none",
  depth: 0.125,
  rgb: [250, 148, 24],
  dimension: y.Overworld,
  displayCategory: "sandy",
});
const Jt = B({
  id: 3,
  key: "windswept_hills",
  name: "Windswept Hills",
  oldNames: ["Mountains"],
  category: "extreme_hills",
  temperature: 0.2,
  precipitation: "rain",
  depth: 1,
  rgb: [96, 96, 96],
  dimension: y.Overworld,
  displayCategory: "mountains",
});
const Xt = B({
  id: 4,
  key: "forest",
  name: "Forest",
  category: "forest",
  temperature: 0.7,
  precipitation: "rain",
  depth: 0.1,
  rgb: [5, 102, 33],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const pe = B({
  id: 5,
  key: "taiga",
  name: "Taiga",
  category: "taiga",
  temperature: 0.25,
  precipitation: "rain",
  depth: 0.2,
  rgb: [11, 102, 89],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const dt = B({
  id: 6,
  key: "swamp",
  name: "Swamp",
  category: "swamp",
  temperature: 0.8,
  precipitation: "rain",
  depth: -0.2,
  rgb: [7, 249, 178],
  dimension: y.Overworld,
  displayCategory: "swamps",
});
const Yr = B({
  id: 7,
  key: "river",
  name: "River",
  category: "river",
  temperature: 0.5,
  precipitation: "rain",
  depth: -0.5,
  rgb: [0, 0, 255],
  dimension: y.Overworld,
  displayCategory: "water",
});
const ei = B({
  id: 8,
  key: "nether_wastes",
  name: "Nether Wastes",
  category: "nether",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [191, 59, 59],
  climates: [
    {
      temperature: 0,
      humidity: 0,
      altitude: 0,
      weirdness: 0,
      offset: 0,
    },
  ],
  dimension: y.Nether,
  displayCategory: "nether",
});
const Ya = B({
  id: 9,
  key: "the_end",
  name: "The End",
  category: "the_end",
  temperature: 0.5,
  precipitation: "none",
  depth: 0.1,
  rgb: [128, 128, 255],
  dimension: y.End,
  displayCategory: "end",
});
const Le = B({
  id: 10,
  key: "frozen_ocean",
  name: "Frozen Ocean",
  category: "ocean",
  temperature: 0,
  precipitation: "snow",
  depth: -1,
  rgb: [112, 112, 214],
  dimension: y.Overworld,
  displayCategory: "water",
});
const $t = B({
  id: 11,
  key: "frozen_river",
  name: "Frozen River",
  category: "river",
  temperature: 0,
  precipitation: "snow",
  depth: -0.5,
  rgb: [160, 160, 255],
  dimension: y.Overworld,
  displayCategory: "water",
});
const Ve = B({
  id: 12,
  key: "snowy_plains",
  name: "Snowy Plains",
  oldNames: ["Snowy Tundra"],
  category: "icy",
  temperature: 0,
  precipitation: "snow",
  depth: 0.125,
  rgb: [255, 255, 255],
  dimension: y.Overworld,
  displayCategory: "plains",
});
const ec = B({
  id: 13,
  name: "Snowy Mountains",
  category: "icy",
  temperature: 0,
  precipitation: "snow",
  depth: 0.45,
  rgb: [160, 160, 160],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const os = B({
  id: 14,
  key: "mushroom_fields",
  name: "Mushroom Fields",
  category: "mushroom",
  temperature: 0.9,
  precipitation: "rain",
  depth: 0.2,
  rgb: [255, 0, 255],
  dimension: y.Overworld,
  displayCategory: "plains",
});
const Hn = B({
  id: 15,
  name: "Mushroom Fields Shore",
  category: "mushroom",
  temperature: 0.9,
  precipitation: "rain",
  depth: 0,
  rgb: [160, 0, 255],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const lt = B({
  id: 16,
  key: "beach",
  name: "Beach",
  category: "beach",
  temperature: 0.8,
  precipitation: "rain",
  depth: 0,
  rgb: [250, 222, 85],
  dimension: y.Overworld,
  displayCategory: "sandy",
});
const ss = B({
  id: 17,
  name: "Desert Hills",
  category: "desert",
  temperature: 2,
  precipitation: "none",
  depth: 0.45,
  rgb: [210, 95, 18],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const Qt = B({
  id: 18,
  key: "windswept_forest",
  name: "Windswept Forest",
  oldNames: ["Wooded Hills"],
  category: "forest",
  temperature: 0.7,
  precipitation: "rain",
  depth: 0.45,
  rgb: [34, 85, 28],
  dimension: y.Overworld,
  displayCategory: "mountains",
});
const Kt = B({
  id: 19,
  name: "Taiga Hills",
  category: "taiga",
  temperature: 0.25,
  precipitation: "rain",
  depth: 0.45,
  rgb: [22, 57, 51],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const tc = B({
  id: 20,
  name: "Mountain Edge",
  category: "extreme_hills",
  temperature: 0.2,
  precipitation: "rain",
  depth: 0.8,
  rgb: [114, 120, 154],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const wt = B({
  id: 21,
  key: "jungle",
  name: "Jungle",
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.1,
  rgb: [83, 123, 9],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const ti = B({
  id: 22,
  name: "Jungle Hills",
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.45,
  rgb: [44, 66, 5],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const Dn = B({
  id: 23,
  key: "sparse_jungle",
  name: "Sparse Jungle",
  oldNames: ["Jungle Edge"],
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.1,
  rgb: [98, 139, 23],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const Pe = B({
  id: 24,
  key: "deep_ocean",
  name: "Deep Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1.8,
  rgb: [0, 0, 48],
  dimension: y.Overworld,
  displayCategory: "water",
});
const as = B({
  id: 25,
  key: "stony_shore",
  name: "Stony Shore",
  oldNames: ["Stone Shore"],
  category: "none",
  temperature: 0.2,
  precipitation: "rain",
  depth: 0.1,
  rgb: [162, 162, 132],
  dimension: y.Overworld,
  displayCategory: "mountains",
});
const Ge = B({
  id: 26,
  key: "snowy_beach",
  name: "Snowy Beach",
  category: "beach",
  temperature: 0.05,
  precipitation: "snow",
  depth: 0,
  rgb: [250, 240, 192],
  dimension: y.Overworld,
  displayCategory: "sandy",
});
const Wn = B({
  id: 27,
  key: "birch_forest",
  name: "Birch Forest",
  category: "forest",
  temperature: 0.6,
  precipitation: "rain",
  depth: 0.1,
  rgb: [48, 116, 68],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const cs = B({
  id: 28,
  name: "Birch Forest Hills",
  category: "forest",
  temperature: 0.6,
  precipitation: "rain",
  depth: 0.45,
  rgb: [31, 95, 50],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const rt = B({
  id: 29,
  key: "dark_forest",
  name: "Dark Forest",
  category: "forest",
  temperature: 0.7,
  precipitation: "rain",
  depth: 0.1,
  rgb: [64, 81, 26],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const Ae = B({
  id: 30,
  key: "snowy_taiga",
  name: "Snowy Taiga",
  category: "taiga",
  temperature: -0.5,
  precipitation: "snow",
  depth: 0.2,
  rgb: [49, 85, 74],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const Gn = B({
  id: 31,
  name: "Snowy Taiga Hills",
  category: "taiga",
  temperature: -0.5,
  precipitation: "snow",
  depth: 0.45,
  rgb: [36, 63, 54],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const kt = B({
  id: 32,
  key: "old_growth_pine_taiga",
  name: "Old Growth Pine Taiga",
  oldNames: ["Giant Tree Taiga"],
  category: "taiga",
  temperature: 0.3,
  precipitation: "rain",
  depth: 0.2,
  rgb: [89, 102, 81],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const ls = B({
  id: 33,
  name: "Giant Tree Taiga Hills",
  category: "taiga",
  temperature: 0.3,
  precipitation: "rain",
  depth: 0.45,
  rgb: [69, 79, 62],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const us = B({
  id: 34,
  name: "Wooded Mountains",
  category: "extreme_hills",
  temperature: 0.2,
  precipitation: "rain",
  depth: 1,
  rgb: [80, 112, 80],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const ke = B({
  id: 35,
  key: "savanna",
  name: "Savanna",
  category: "savanna",
  temperature: 1.2,
  precipitation: "none",
  depth: 0.125,
  rgb: [189, 178, 95],
  dimension: y.Overworld,
  displayCategory: "plains",
});
const jn = B({
  id: 36,
  key: "savanna_plateau",
  name: "Savanna Plateau",
  category: "savanna",
  temperature: 1,
  precipitation: "none",
  depth: 1.5,
  rgb: [167, 157, 100],
  dimension: y.Overworld,
  displayCategory: "mountains",
});
const Un = B({
  id: 37,
  key: "badlands",
  name: "Badlands",
  category: "mesa",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [217, 69, 21],
  dimension: y.Overworld,
  displayCategory: "sandy",
});
const Zn = B({
  id: 38,
  key: "wooded_badlands",
  name: "Wooded Badlands",
  oldNames: ["Wooded Badlands Plateau"],
  category: "mesa",
  temperature: 2,
  precipitation: "none",
  depth: 1.5,
  rgb: [176, 151, 101],
  dimension: y.Overworld,
  displayCategory: "sandy",
});
const fs = B({
  id: 39,
  name: "Badlands Plateau",
  category: "mesa",
  temperature: 2,
  precipitation: "none",
  depth: 1.5,
  rgb: [202, 140, 101],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const nc = B({
  id: 40,
  key: "small_end_islands",
  name: "Small End Islands",
  category: "the_end",
  temperature: 0.5,
  precipitation: "none",
  depth: 0.1,
  rgb: [0, 0, 42],
  dimension: y.End,
  displayCategory: "end",
});
const ds = B({
  id: 41,
  key: "end_midlands",
  name: "End Midlands",
  category: "the_end",
  temperature: 0.5,
  precipitation: "none",
  depth: 0.1,
  rgb: [235, 248, 182],
  dimension: y.End,
  displayCategory: "end",
});
const qt = B({
  id: 42,
  key: "end_highlands",
  name: "End Highlands",
  category: "the_end",
  temperature: 0.5,
  precipitation: "none",
  depth: 0.1,
  rgb: [195, 189, 137],
  dimension: y.End,
  displayCategory: "end",
});
const rc = B({
  id: 43,
  key: "end_barrens",
  name: "End Barrens",
  category: "the_end",
  temperature: 0.5,
  precipitation: "none",
  depth: 0.1,
  rgb: [144, 144, 114],
  dimension: y.End,
  displayCategory: "end",
});
const $e = B({
  id: 44,
  key: "warm_ocean",
  name: "Warm Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1,
  rgb: [0, 0, 172],
  dimension: y.Overworld,
  displayCategory: "water",
});
const gt = B({
  id: 45,
  key: "lukewarm_ocean",
  name: "Lukewarm Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1,
  rgb: [0, 0, 144],
  dimension: y.Overworld,
  displayCategory: "water",
});
const mt = B({
  id: 46,
  key: "cold_ocean",
  name: "Cold Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1,
  rgb: [32, 32, 112],
  dimension: y.Overworld,
  displayCategory: "water",
});
const Yt = B({
  id: 47,
  key: "deep_warm_ocean",
  name: "Deep Warm Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1.8,
  rgb: [0, 0, 80],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const Qe = B({
  id: 48,
  key: "deep_lukewarm_ocean",
  name: "Deep Lukewarm Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1.8,
  rgb: [0, 0, 64],
  dimension: y.Overworld,
  displayCategory: "water",
});
const Ke = B({
  id: 49,
  key: "deep_cold_ocean",
  name: "Deep Cold Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1.8,
  rgb: [32, 32, 56],
  dimension: y.Overworld,
  displayCategory: "water",
});
const Ne = B({
  id: 50,
  key: "deep_frozen_ocean",
  name: "Deep Frozen Ocean",
  category: "ocean",
  temperature: 0.5,
  precipitation: "rain",
  depth: -1.8,
  rgb: [64, 64, 144],
  dimension: y.Overworld,
  displayCategory: "water",
});
const en = B({
  id: 129,
  name: "Sunflower Plains",
  key: "sunflower_plains",
  category: "plains",
  temperature: 0.8,
  precipitation: "rain",
  depth: 0.125,
  rgb: [181, 219, 136],
  parent: Ie.id,
  dimension: y.Overworld,
  displayCategory: "plains",
});
const ic = B({
  id: 130,
  name: "Desert Lakes",
  category: "desert",
  temperature: 2,
  precipitation: "none",
  depth: 0.125,
  rgb: [255, 188, 64],
  parent: Y.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const Jn = B({
  id: 131,
  key: "windswept_gravelly_hills",
  name: "Windswept Gravelly Hills",
  oldNames: ["Gravelly Mountains"],
  category: "extreme_hills",
  temperature: 0.2,
  precipitation: "rain",
  depth: 1,
  rgb: [136, 136, 136],
  parent: Jt.id,
  dimension: y.Overworld,
  displayCategory: "mountains",
});
const ni = B({
  id: 132,
  key: "flower_forest",
  name: "Flower Forest",
  category: "forest",
  temperature: 0.7,
  precipitation: "rain",
  depth: 0.1,
  rgb: [45, 142, 73],
  parent: Xt.id,
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const oc = B({
  id: 133,
  name: "Taiga Mountains",
  category: "taiga",
  temperature: 0.25,
  precipitation: "rain",
  depth: 0.3,
  rgb: [51, 142, 129],
  parent: pe.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const gs = B({
  id: 134,
  name: "Swamp Hills",
  category: "swamp",
  temperature: 0.8,
  precipitation: "rain",
  depth: -0.1,
  rgb: [47, 255, 218],
  parent: dt.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const Xn = B({
  id: 140,
  key: "ice_spikes",
  name: "Ice Spikes",
  category: "icy",
  temperature: 0,
  precipitation: "snow",
  depth: 0.425,
  rgb: [180, 220, 220],
  parent: Ve.id,
  dimension: y.Overworld,
  displayCategory: "plains",
});
const sc = B({
  id: 149,
  name: "Modified Jungle",
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.2,
  rgb: [123, 163, 49],
  parent: wt.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const ac = B({
  id: 151,
  name: "Modified Jungle Edge",
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.2,
  rgb: [138, 179, 63],
  parent: Dn.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const $n = B({
  id: 155,
  key: "old_growth_birch_forest",
  name: "Old Growth Birch Forest",
  oldNames: ["Tall Birch Forest"],
  category: "forest",
  temperature: 0.6,
  precipitation: "rain",
  depth: 0.2,
  rgb: [88, 156, 108],
  parent: Wn.id,
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const cc = B({
  id: 156,
  name: "Tall Birch Hills",
  category: "forest",
  temperature: 0.6,
  precipitation: "rain",
  depth: 0.55,
  rgb: [71, 135, 90],
  parent: cs.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const tn = B({
  id: 157,
  name: "Dark Forest Hills",
  category: "forest",
  temperature: 0.7,
  precipitation: "rain",
  depth: 0.2,
  rgb: [104, 121, 66],
  parent: rt.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const lc = B({
  id: 158,
  name: "Snowy Taiga Mountains",
  category: "taiga",
  temperature: -0.5,
  precipitation: "snow",
  depth: 0.3,
  rgb: [89, 125, 114],
  parent: Ae.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const nn = B({
  id: 160,
  key: "old_growth_spruce_taiga",
  name: "Old Growth Spruce Taiga",
  oldNames: ["Giant Spruce Taiga"],
  category: "taiga",
  temperature: 0.25,
  precipitation: "rain",
  depth: 0.2,
  rgb: [129, 142, 121],
  parent: kt.id,
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const uc = B({
  id: 161,
  name: "Giant Spruce Taiga Hills",
  category: "taiga",
  temperature: 0.25,
  precipitation: "rain",
  depth: 0.2,
  rgb: [109, 119, 102],
  parent: ls.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const fc = B({
  id: 162,
  name: "Gravelly Mountains+",
  category: "extreme_hills",
  temperature: 0.2,
  precipitation: "rain",
  depth: 1,
  rgb: [120, 152, 120],
  parent: us.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const ri = B({
  id: 163,
  key: "windswept_savanna",
  name: "Windswept Savanna",
  oldNames: ["Shattered Savanna"],
  category: "savanna",
  temperature: 1.1,
  precipitation: "none",
  depth: 0.3625,
  rgb: [229, 218, 135],
  parent: ke.id,
  dimension: y.Overworld,
  displayCategory: "mountains",
});
const dc = B({
  id: 164,
  name: "Shattered Savanna Plateau",
  category: "savanna",
  temperature: 1,
  precipitation: "none",
  rgb: [207, 197, 140],
  depth: 1.05,
  parent: jn.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const ii = B({
  id: 165,
  key: "eroded_badlands",
  name: "Eroded Badlands",
  category: "mesa",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [255, 109, 61],
  parent: Un.id,
  dimension: y.Overworld,
  displayCategory: "sandy",
});
const gc = B({
  id: 166,
  name: "Modified Wooded Badlands Plateau",
  category: "mesa",
  temperature: 2,
  precipitation: "none",
  depth: 0.45,
  rgb: [216, 191, 141],
  parent: Zn.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const mc = B({
  id: 167,
  name: "Modified Badlands Plateau",
  category: "mesa",
  temperature: 2,
  precipitation: "none",
  depth: 0.45,
  rgb: [242, 180, 141],
  parent: fs.id,
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const Qn = B({
  id: 168,
  key: "bamboo_jungle",
  name: "Bamboo Jungle",
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.1,
  rgb: [118, 142, 20],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const ms = B({
  id: 169,
  name: "Bamboo Jungle Hills",
  category: "jungle",
  temperature: 0.95,
  precipitation: "rain",
  depth: 0.45,
  rgb: [59, 71, 10],
  dimension: y.Overworld,
  displayCategory: "legacy",
});
const hs = B({
  id: 170,
  key: "soul_sand_valley",
  name: "Soul Sand Valley",
  category: "nether",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [94, 56, 48],
  climates: [
    {
      temperature: 0,
      humidity: -0.5,
      altitude: 0,
      weirdness: 0,
      offset: 0,
    },
  ],
  dimension: y.Nether,
  displayCategory: "nether",
});
const ps = B({
  id: 171,
  key: "crimson_forest",
  name: "Crimson Forest",
  category: "nether",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [221, 8, 8],
  climates: [
    {
      temperature: 0.4,
      humidity: 0,
      altitude: 0,
      weirdness: 0,
      offset: 0,
    },
  ],
  dimension: y.Nether,
  displayCategory: "nether",
});
const _s = B({
  id: 172,
  key: "warped_forest",
  name: "Warped Forest",
  category: "nether",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [73, 144, 123],
  climates: [
    {
      temperature: 0,
      humidity: 0.5,
      altitude: 0,
      weirdness: 0,
      offset: 0.375,
    },
  ],
  dimension: y.Nether,
  displayCategory: "nether",
});
const hc = B({
  id: 173,
  key: "basalt_deltas",
  name: "Basalt Deltas",
  category: "nether",
  temperature: 2,
  precipitation: "none",
  depth: 0.1,
  rgb: [64, 54, 54],
  climates: [
    {
      temperature: -0.5,
      humidity: 0,
      altitude: 0,
      weirdness: 0,
      offset: 0.175,
    },
  ],
  dimension: y.Nether,
  displayCategory: "nether",
});
const Kn = B({
  id: 174,
  key: "dripstone_caves",
  name: "Dripstone Caves",
  category: "none",
  temperature: 0.8,
  precipitation: "rain",
  depth: he,
  rgb: [193, 165, 143],
  dimension: y.Overworld,
  displayCategory: "caves",
});
const qn = B({
  id: 175,
  key: "lush_caves",
  name: "Lush Caves",
  category: "none",
  temperature: 0.5,
  precipitation: "rain",
  depth: he,
  rgb: [223, 150, 52],
  dimension: y.Overworld,
  displayCategory: "caves",
});
const bt = B({
  id: 177,
  key: "meadow",
  name: "Meadow",
  category: "mountain",
  temperature: 0.5,
  precipitation: "rain",
  depth: he,
  rgb: [140, 164, 112],
  dimension: y.Overworld,
  displayCategory: "mountains",
});
const Ot = B({
  id: 178,
  key: "grove",
  name: "Grove",
  category: "forest",
  temperature: -0.2,
  precipitation: "snow",
  depth: he,
  rgb: [146, 178, 160],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const vt = B({
  id: 179,
  key: "snowy_slopes",
  name: "Snowy Slopes",
  category: "mountain",
  temperature: -0.3,
  precipitation: "snow",
  depth: he,
  rgb: [218, 241, 241],
  dimension: y.Overworld,
  displayCategory: "mountains",
});
const Mt = B({
  id: 180,
  key: "frozen_peaks",
  name: "Frozen Peaks",
  category: "mountain",
  temperature: -0.7,
  precipitation: "snow",
  depth: he,
  rgb: [234, 251, 251],
  dimension: y.Overworld,
  displayCategory: "mountains",
});
const At = B({
  id: 181,
  key: "jagged_peaks",
  name: "Jagged Peaks",
  category: "mountain",
  temperature: -0.7,
  precipitation: "snow",
  depth: he,
  rgb: [186, 188, 182],
  dimension: y.Overworld,
  displayCategory: "mountains",
});
const rn = B({
  id: 182,
  key: "stony_peaks",
  name: "Stony Peaks",
  category: "mountain",
  temperature: 1,
  precipitation: "rain",
  depth: he,
  rgb: [209, 209, 209],
  dimension: y.Overworld,
  displayCategory: "mountains",
});
const ht = B({
  id: 183,
  key: "deep_dark",
  name: "Deep Dark",
  category: "none",
  temperature: 0.8,
  precipitation: "rain",
  depth: he,
  rgb: [0, 0, 0],
  dimension: y.Overworld,
  displayCategory: "caves",
});
const Yn = B({
  id: 184,
  key: "mangrove_swamp",
  name: "Mangrove Swamp",
  category: "none",
  temperature: 0.8,
  precipitation: "rain",
  depth: he,
  rgb: [36, 196, 142],
  dimension: y.Overworld,
  displayCategory: "swamps",
});
const ys = B({
  id: 185,
  key: "cherry_grove",
  name: "Cherry Grove",
  category: "mountain",
  temperature: 0.5,
  precipitation: Nn,
  depth: he,
  rgb: [247, 185, 220],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const er = B({
  id: 186,
  key: "pale_garden",
  name: "Pale Garden",
  category: "forest",
  temperature: 0.7,
  precipitation: Nn,
  depth: he,
  rgb: [108, 111, 150],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
const tr = B({
  id: 187,
  key: "sulfur_caves",
  name: "Sulfur Caves",
  category: "none",
  temperature: 0.8,
  precipitation: Nn,
  depth: he,
  rgb: [200, 200, 40],
  dimension: y.Overworld,
  displayCategory: "caves",
});
const ws = B({
  id: 188,
  key: "dappled_forest",
  name: "Dappled Forest",
  category: "forest",
  temperature: 0.6,
  precipitation: Nn,
  depth: he,
  rgb: [154, 63, 53],
  dimension: y.Overworld,
  displayCategory: "woodlands",
});
function B(e) {
  Fe[e.id] = e;
  if (e.parent != null) {
    qa[e.parent] = e.id;
  }
  return e;
}
function Je(e) {
  if (e >= 0 && e <= Fe.length) {
    return Fe[e];
  } else {
    return Xe;
  }
}
function pc(e) {
  if (_c(e)) {
    return "caveDepth";
  } else if (yc(e)) {
    return "bottom";
  } else {
    return "depth0";
  }
}
function _c(e) {
  return [qn.id, Kn.id, tr.id].includes(e);
}
function yc(e) {
  return e === ht.id;
}
function we(e) {
  if (typeof e.seed == "string") {
    throw new Error(
      "toRustWorld received a PlainWorld — call fromPlainWorld() first",
    );
  }
  return new ce(
    e.seed.low,
    e.seed.high,
    e.edition === _.Java ? 1 : 2,
    e.edition === _.Java ? e.javaVersion : e.bedrockVersion,
    e.config.biomeSize,
    !!e.config.largeBiomes,
  );
}
class wc {
  provider;
  constructor(t) {
    const n = we(t);
    this.provider = new xr(n);
  }
  getInts(t, n, r, i) {
    return this.provider.a(t, n, r, i);
  }
  getInts1(t, n, r, i) {
    return this.provider.b(t, n, r, i);
  }
  free() {
    this.provider.free();
  }
}
class bc {
  provider;
  constructor(t) {
    const n = we(t);
    this.provider = new Cr(n);
  }
  getChunkBiome(t, n) {
    return this.provider.a(t, n);
  }
  getNoiseBiome(t, n) {
    return this.provider.b(t, n);
  }
  getBiomeArea(t, n, r, i, o) {
    return this.provider.c(t, n, r, i, o);
  }
  free() {
    this.provider.free();
  }
}
class re {
  rng;
  constructor(t) {
    const n = typeof t == "number" ? k.fromInt(t) : t;
    this.rng = new Sr(n.low, n.high);
  }
  setSeed(t) {
    const n = typeof t == "number" ? k.fromInt(t) : t;
    this.rng.a(n.low, n.high);
  }
  nextInt(t) {
    if (t == null) {
      return this.rng.c();
    } else {
      return this.rng.b(t);
    }
  }
  nextIntRaw() {
    return this.rng.d();
  }
  nextIntRange(t, n) {
    return this.rng.e(t, n);
  }
  nextFloat() {
    return this.rng.f();
  }
  nextDouble() {
    return this.rng.g();
  }
  nextBoolean() {
    return this.rng.h();
  }
  free() {
    this.rng.free();
  }
}
const Ki = (e) => e.map((t) => [t.x, t.y, t.z, ye[t.dungeon_type]]);
class vc {
  rustFinder;
  constructor(t) {
    this.rustFinder = new Er(we(t));
  }
  find(t, n) {
    return Ki(this.rustFinder.a(t.provider, n.x, n.z, n.sizeX, n.sizeZ));
  }
  findLegacy(t) {
    return Ki(this.rustFinder.b(t.x, t.z, t.sizeX, t.sizeZ));
  }
  free() {
    this.rustFinder.free();
  }
}
class be {
  rng;
  constructor(t = k.ZERO) {
    this.rng = new Ir(t.low, t.high);
  }
  setSeed(t) {
    this.rng.a(t.low, t.high);
  }
  getSeed() {
    const t = Array.from(this.rng.b());
    return k.fromBits(t[0], t[1]);
  }
  restoreSeed(t) {
    this.rng.c(t.low, t.high);
  }
  nextInt(t) {
    if (t == null) {
      return this.rng.f();
    } else {
      return this.rng.e(t);
    }
  }
  nextIntVoid(t) {
    if (t == null) {
      this.rng.k(1);
      return;
    }
    this.rng.e(t);
  }
  nextLong() {
    const t = Array.from(this.rng.g());
    return k.fromBits(t[0], t[1]);
  }
  nextLongVoid() {
    this.rng.g();
  }
  nextFloat() {
    return this.rng.h();
  }
  nextFloatVoid() {
    this.rng.h();
  }
  nextDouble() {
    return this.rng.i();
  }
  nextDoubleVoid() {
    this.rng.i();
  }
  nextBoolean() {
    return this.rng.j();
  }
  _next(t) {
    return this.rng.d(t);
  }
  _nextVoid() {
    this.rng.k(1);
  }
  consumeCount(t) {
    this.rng.k(t);
  }
  free() {
    this.rng.free();
  }
}
class Sc {
  chunkGen;
  constructor(t) {
    const n = we(t);
    this.chunkGen = new Br(n);
  }
  buildHeightmap(t, n) {
    return this.chunkGen.a(t, n);
  }
  free() {
    this.chunkGen.free();
  }
}
class jt {
  rng;
  constructor(t) {
    this.rng = t;
  }
  static fromLoHi(t, n) {
    return new jt(new ft(t.low, t.high, n.low, n.high));
  }
  static fromSeed(t) {
    return new jt(ft.a(t.low, t.high));
  }
  setSeed(t) {
    this.rng.b(t.low, t.high);
  }
  nextInt(t) {
    return this.rng.c(t);
  }
  nextLong() {
    const t = Array.from(this.rng.d());
    return k.fromBits(t[0], t[1]);
  }
  nextFloat() {
    return this.rng.e();
  }
  nextDouble() {
    return this.rng.f();
  }
  skipNextN(t) {
    return this.rng.g(t);
  }
  free() {
    this.rng.free();
  }
}
class xc {
  rustFinder;
  constructor(t) {
    this.rustFinder = new Mr(we(t));
  }
  find(t, n) {
    return this.rustFinder
      .a(n.provider, t.x, t.z, t.sizeX, t.sizeZ)
      .map((r) => ({
        min: r.min,
        max: r.max,
        reference: r.reference,
        count: r.count,
        type: r.vein_type === "COPPER" ? "copper" : "iron",
        oreCount: r.ore_count,
      }));
  }
  free() {
    this.rustFinder.free();
  }
}
const qi = 4;
const Cc = 1;
function Tc(e, t) {
  let n = new Ar(we(e));
  return Object.assign(
    (r) => {
      if (!n) {
        throw new Error("freed");
      }
      const i = n.a(t.provider, r.x, r.z, r.sizeX, r.sizeZ);
      const o = new Array(i.length / qi);
      for (let s = 0, a = 0; s < i.length; s += qi, a++) {
        o[a] = {
          x: i[s],
          y: i[s + 1],
          z: i[s + 2],
          hasSecretChest: (i[s + 3] & Cc) !== 0,
        };
      }
      return o;
    },
    {
      free() {
        n?.free();
        n = undefined;
      },
    },
  );
}
var Gt = ((e) => {
  e[(e.Unset = 0)] = "Unset";
  e[(e.DefaultCaveStone = 254)] = "DefaultCaveStone";
  e[(e.Stone = 1)] = "Stone";
  e[(e.Water = 9)] = "Water";
  e[(e.Lava = 11)] = "Lava";
  e[(e.Chest = 54)] = "Chest";
  e[(e.Air = 255)] = "Air";
  return e;
})(Gt || {});
Object.freeze(Gt);
const it = {
  caveDepth: 3,
  worldSurface: 1,
  oceanFloor: 2,
  bottom: 4,
  depth0: 5,
};
const un = {
  fastApproximate: 1,
  enhanced: 3,
  enhancedNoCaves: 2,
  topmostAccurate: 4,
};
class qe {
  provider;
  static newOverworld(t) {
    const n = ae.a(we(t));
    return new qe(n);
  }
  static newNether(t) {
    const n = ae.b(we(t));
    return new qe(n);
  }
  constructor(t) {
    this.provider = t;
  }
  getNoiseBiome(t, n, r) {
    return this.provider.c(t, n, r);
  }
  getNoiseBiomeBlock(t, n, r) {
    return this.provider.d(t, n, r);
  }
  getNoiseBiomeAtHeightType(t, n, r) {
    return this.provider.e(t, n, it[r]);
  }
  getSurface(t, n, r, i) {
    return this.provider.f(t, n, it[r], un[i]);
  }
  getSurfaceBlock(t, n, r, i) {
    return this.provider.g(t, n, it[r], un[i]);
  }
  getSurfaceArea(t, n, r, i, o, s, a) {
    return this.provider.h(t, n, r, i, o, it[s], un[a]);
  }
  getNoiseBiomeArea(t, n, r, i, o, s, a) {
    return this.provider.i(t, n, r, i, o, s, a);
  }
  getNoiseBiomeAreaAtHeightType(t, n, r, i, o, s) {
    return this.provider.j(t, n, r, i, o, it[s]);
  }
  findSpawnPosition() {
    return Array.from(this.provider.k());
  }
  getPreliminarySurfaceLevel(t, n) {
    return Math.min(312, Math.max(-64, this.provider.l(t, n)));
  }
  getNoiseBlock(t, n, r, i) {
    return this.provider.m(t, n, r, i);
  }
  getNoiseBiomeYColumn(t, n, r) {
    return this.provider.n(t, n, r);
  }
  getNoiseBiomeAreaAtHeightTypeWithSurface(t, n, r, i, o, s, a, c) {
    const l = this.provider.o(t, n, r, i, o, it[s], it[a], un[c]);
    const u = r * i;
    return {
      biomes: l.slice(0, u),
      heights: l.slice(u),
    };
  }
  free() {
    this.provider.free();
  }
}
function Bc(e) {
  return e === 1 || e === 254;
}
function Ec(e, t, n, r, i, o, s) {
  const a = t >> 2;
  const c = n >> 2;
  const l = r >> 2;
  const u = i >> 2;
  let d = null;
  let f = 0;
  for (let g = -u; g <= u; g++) {
    for (let h = -u; h <= u; h++) {
      const w = a + h;
      const b = l + g;
      const x = Je(e.getNoiseBiome(w, c, b));
      if (o(x)) {
        if (d == null || s.nextInt(f + 1) === 0) {
          d = [w << 2, n, b << 2];
        }
        f += 1;
      }
    }
  }
  return d;
}
class oi {
  static getBiome(t, n, r) {
    return new oi(t).getBiomeAtChunk(n, r);
  }
  provider;
  constructor(t) {
    this.provider = new bc(t);
  }
  getBiomeAtChunk(t, n) {
    return Je(this.provider.getChunkBiome(t, n));
  }
  getNoiseBiome(t, n, r) {
    return this.provider.getNoiseBiome(t, r);
  }
  getBiomeArea(t, n, r, i, o) {
    return this.provider.getBiomeArea(t, n, r, i, o);
  }
  free() {
    this.provider.free();
  }
}
function me(e, t, n, r, i) {
  const o = r ? e.seed.add(r) : e.seed;
  if (i === "java" || (e.edition === _.Java && i !== "bedrock")) {
    const s = new be(o);
    const a = k.fromInt(t).multiply(s.nextLong());
    const c = k.fromInt(n).multiply(s.nextLong());
    s.setSeed(a.xor(c).xor(o));
    return s;
  } else {
    const s = new re(o);
    const a = k.fromInt(t).multiply(s.nextInt());
    const c = k.fromInt(n).multiply(s.nextInt());
    s.setSeed(a.xor(c).xor(o));
    return s;
  }
}
let Sn;
try {
  Sn = new WebAssembly.Instance(
    new WebAssembly.Module(
      new Uint8Array([
        0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127,
        127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11,
        7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5,
        100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114,
        101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0,
        10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173,
        66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4,
        66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32,
        1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127,
        34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0,
        173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134,
        132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126,
        32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66,
        32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36,
        1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3,
        173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167,
        11,
      ]),
    ),
    {},
  ).exports;
} catch {}
function Yi(e) {
  e.low = -e.low & -1;
  e.high = ~e.high;
  if (e.low === 0) {
    e.high = (e.high + 1) & -1;
  }
}
function xn(e, t) {
  const n = e.high >>> 16;
  const r = e.high & 65535;
  const i = e.low >>> 16;
  const o = e.low & 65535;
  const s = t.high >>> 16;
  const a = t.high & 65535;
  const c = t.low >>> 16;
  const l = t.low & 65535;
  let u = 0;
  let d = 0;
  let f = 0;
  let g = 0;
  g += o + l;
  f += g >>> 16;
  g &= 65535;
  f += i + c;
  d += f >>> 16;
  f &= 65535;
  d += r + a;
  u += d >>> 16;
  d &= 65535;
  u += n + s;
  u &= 65535;
  e.low = (f << 16) | g;
  e.high = (u << 16) | d;
}
function eo(e, t) {
  if (e.isZero()) {
    return;
  }
  if (Sn) {
    e.low = Sn.mul(e.low, e.high, t.low, t.high);
    e.high = Sn.get_high();
    return;
  }
  let n;
  let r;
  let i;
  let o;
  let s;
  let a;
  let c;
  let l;
  let u;
  let d;
  let f;
  let g;
  let h;
  if (e.low === 0 && e.high === -2147483648) {
    if ((t.low & 1) === 0) {
      e.high = 0;
    }
    return;
  } else if (t.low === 0 && t.high === -2147483648) {
    if ((e.low & 1) === 0) {
      e.high = 0;
    }
    return;
  } else {
    h = false;
    if (e.high < 0) {
      Yi(e);
      h = !h;
    }
    if (t.high < 0) {
      t = t.negate();
      h = !h;
    }
    n = e.low & 65535;
    r = e.low >>> 16;
    i = e.high & 65535;
    o = e.high >>> 16;
    s = t.low & 65535;
    a = t.low >>> 16;
    c = t.high & 65535;
    l = t.high >>> 16;
    u = d = f = g = 0;
    u += n * s;
    d += u >>> 16;
    u &= 65535;
    d += r * s;
    f += d >>> 16;
    d &= 65535;
    d += n * a;
    f += d >>> 16;
    d &= 65535;
    f += i * s;
    g += f >>> 16;
    f &= 65535;
    f += r * a;
    g += f >>> 16;
    f &= 65535;
    f += n * c;
    g += f >>> 16;
    f &= 65535;
    g += o * s + i * a + r * c + n * l;
    g &= 65535;
    e.low = u | (d << 16);
    e.high = f | (g << 16);
    if (h) {
      Yi(e);
    }
  }
}
const Ic = k.fromString("341873128712");
const Vc = k.fromString("132897987541");
function bs(e, t, n, r, i) {
  const o = k.fromNumber(t);
  eo(o, Ic);
  const s = k.fromNumber(n);
  eo(s, Vc);
  xn(o, s);
  xn(o, e.seed);
  xn(o, k.fromNumber(r));
  let a = i;
  if (a == null) {
    a = e.edition === _.Bedrock ? "bedrock" : "java";
  }
  if (a === "bedrock") {
    return new re(o);
  } else {
    return new be(o);
  }
}
function vs(e, t, n) {
  const r = e.javaVersion >= p.V1_18 ? jt.fromSeed(e.seed) : new be(e.seed);
  const i = r.nextLong().or(k.ONE);
  const o = r.nextLong().or(k.ONE);
  r.free();
  return k
    .fromNumber(t)
    .multiply(i)
    .add(k.fromNumber(n).multiply(o))
    .xor(e.seed);
}
function Mn(e) {
  if (e >= 0) {
    return Math.floor(e);
  } else {
    return Math.ceil(e);
  }
}
function kc(e) {
  return (t, n, r, i) => {
    const o = (t - r) >> 2;
    const s = (n - r) >> 2;
    const a = (t + r) >> 2;
    const c = (n + r) >> 2;
    const l = a - o + 1;
    const u = c - s + 1;
    const d = e(o, s, l, u);
    for (let f = 0; f < l * u; ++f) {
      const g = Je(d[f]);
      if (!i.includes(g)) {
        return false;
      }
    }
    return true;
  };
}
function Oc(e, t, n, r, i, o) {
  const s = o.map((d) => d.id);
  const a = (t - i) >> 2;
  const c = (r - i) >> 2;
  const l = (t + i) >> 2;
  const u = (r + i) >> 2;
  for (let d = c; d <= u; d++) {
    for (let f = a; f <= l; f++) {
      const g = e.getNoiseBiome(f, n >> 2, d);
      if (!s.includes(g)) {
        return false;
      }
    }
  }
  return true;
}
class si {
  constructor(t) {
    this.world = t;
    this.provider = new wc(t);
  }
  provider;
  getBiomeGenAt(t, n, r, i) {
    this.assertBedrockOrJava115OrLess();
    const o = [];
    const s = this.provider.getInts1(t, n, r, i);
    for (let a = 0; a < r * i; ++a) {
      o[a] = Je(s[a]);
    }
    return o;
  }
  getInts(t, n, r, i) {
    return this.provider.getInts(t, n, r, i);
  }
  getInts1(t, n, r, i) {
    this.assertBedrockOrJava115OrLess();
    return this.provider.getInts1(t, n, r, i);
  }
  findBiomePosition(t, n, r, i, o) {
    const s = (t - r) >> 2;
    const a = (n - r) >> 2;
    const c = (t + r) >> 2;
    const l = (n + r) >> 2;
    const u = c - s + 1;
    const d = l - a + 1;
    const f = this.provider.getInts(s, a, u, d);
    let g = null;
    let h = 0;
    for (let w = 0; w < u * d; ++w) {
      const b = (s + (w % u)) << 2;
      const x = (a + Mn(w / u)) << 2;
      const C = Je(f[w]);
      if (!i.includes(C)) {
        continue;
      }
      let I = g == null;
      I ||= o.nextInt(h + 1) === 0;
      if (I) {
        g = [b, 0, x];
      }
      if (
        I ||
        this.world.edition === _.Bedrock ||
        this.world.javaVersion >= p.V1_13
      ) {
        ++h;
      }
    }
    return g;
  }
  assertJava116Plus() {
    if (this.world.edition !== _.Java || this.world.javaVersion < p.V1_16) {
      throw new Error("method is only meant to be used with Java 1.16+");
    }
  }
  assertBedrockOrJava115OrLess() {
    if (this.world.edition === _.Java && this.world.javaVersion >= p.V1_16) {
      throw new Error("method should not be used with Java 1.16+");
    }
  }
  getNoiseBiome(t, n) {
    this.assertJava116Plus();
    return Je(this.provider.getInts(t, n, 1, 1)[0]);
  }
  getBiomeForStructure(t, n) {
    if (this.world.edition === _.Bedrock || this.world.javaVersion < p.V1_13) {
      return this.getBiomeGenAt(t * 16 + 8, n * 16 + 8, 1, 1)[0];
    } else if (this.world.javaVersion < p.V1_16) {
      return this.getBiomeGenAt(t * 16 + 9, n * 16 + 9, 1, 1)[0];
    } else {
      return this.getNoiseBiome((t << 2) + 2, (n << 2) + 2);
    }
  }
  _getBiomeArea(t, n, r, i, o) {
    const s = r - t + 1;
    const a = i - n + 1;
    const c = o(t, n, s, a);
    return (l, u) => {
      if (l < t || l > r || u < n || u > i) {
        throw new Error("biome access out of bounds");
      }
      const d = l - t;
      const f = u - n;
      const g = d + f * s;
      return Je(c[g]);
    };
  }
  getNoiseBiomeArea(t, n, r, i) {
    return this._getBiomeArea(
      t,
      n,
      r,
      i,
      this.provider.getInts.bind(this.provider),
    );
  }
  getBiomeArea(t, n, r, i) {
    this.assertBedrockOrJava115OrLess();
    return this._getBiomeArea(
      t,
      n,
      r,
      i,
      this.provider.getInts1.bind(this.provider),
    );
  }
  areBiomesViable = kc((...t) => this.provider.getInts(...t));
  free() {
    this.provider.free();
  }
}
function ai(e) {
  return (
    (e.edition === _.Java && e.javaVersion >= p.V1_18) ||
    (e.edition === _.Bedrock && e.bedrockVersion >= S.V1_18)
  );
}
function Ss(e) {
  return (
    (e.edition === _.Java && e.javaVersion >= p.V1_16) ||
    (e.edition === _.Bedrock && e.bedrockVersion >= S.V1_16)
  );
}
class xs {
  biomeId;
  constructor(t) {
    this.biomeId = t;
  }
  getBiome() {
    return this.biomeId;
  }
  free() {}
}
const Mc = (e) => {
  if (ai(e)) {
    const t = Object.assign(qe.newOverworld(e), {
      legacy: () => {
        throw new Error("Wrong biome provider");
      },
      noise: () => t,
    });
    return t;
  } else {
    const t = Object.assign(new si(e), {
      legacy: () => t,
      noise: () => {
        throw new Error("Wrong biome provider");
      },
    });
    return t;
  }
};
const Ac = (e) => {
  if (Ss(e)) {
    const t = Object.assign(qe.newNether(e), {
      legacy: () => {
        throw new Error("Wrong biome provider");
      },
      noise: () => t,
    });
    return t;
  } else {
    const t = Object.assign(new xs(ei.id), {
      legacy: () => t,
      noise: () => {
        throw new Error("Wrong biome provider");
      },
    });
    return t;
  }
};
Fe.filter((e) => e.dimension === y.Overworld).map((e) => e.id);
const Cs = [wt.id, Qn.id, Dn.id];
const Rc = [Ne.id, Ke.id, Pe.id, Qe.id];
const Fc = [...Rc, Le.id, Xe.id, mt.id, gt.id, $e.id];
const zc = [lt.id, Ge.id];
const Lc = [Yr.id, $t.id];
pe.id;
Ae.id;
kt.id;
nn.id;
Xt.id;
ni.id;
Wn.id;
$n.id;
rt.id;
Ot.id;
er.id;
ws.id;
const Ts = [Un.id, ii.id, Zn.id];
Jt.id;
Qt.id;
Jn.id;
bt.id;
Mt.id;
At.id;
rn.id;
vt.id;
const Bs = [ke.id, jn.id, ri.id];
const Es = [ei.id, hs.id, ps.id, _s.id, hc.id];
const Is = [Ya.id, qt.id, ds.id, nc.id, rc.id];
[
  Ve.id,
  Xn.id,
  Mt.id,
  At.id,
  vt.id,
  Le.id,
  Ne.id,
  Ot.id,
  ht.id,
  $t.id,
  Ae.id,
  Ge.id,
  ...Is,
];
[Y.id, $e.id, ...Cs, ...Bs, ...Es, ...Ts, Yn.id];
[
  Ve.id,
  Xn.id,
  Mt.id,
  At.id,
  vt.id,
  Le.id,
  Ne.id,
  Ot.id,
  ht.id,
  $t.id,
  Ae.id,
  Ge.id,
  ...Is,
  mt.id,
  Ke.id,
  kt.id,
  nn.id,
  pe.id,
  Qt.id,
  Jn.id,
  Jt.id,
  rn.id,
  ws.id,
];
[Y.id, $e.id, ...Cs, ...Bs, ...Es, ...Ts, Yn.id, Qe.id, gt.id];
Fe.filter((e) => e.displayCategory === "legacy").map((e) => e.id);
const Fr = {
  IS_OCEAN: Fc,
  IS_BEACH: zc,
  IS_RIVER: Lc,
};
function Pc(e, t, n) {
  return new re(Nc(e, t, n));
}
function Nc(e, t, n) {
  return nr(e)(t, n);
}
function nr(e) {
  const t = new re(e.seed);
  const r = t.nextInt() | 1;
  const o = t.nextInt() | 1;
  t.free();
  const s = e.seed.toInt();
  return function (a, c) {
    return s ^ (Math.imul(o, c) + Math.imul(r, a));
  };
}
const je = Je;
const zr = (e, t, n) => Math.min(n, Math.max(t, e));
function Lr(e) {
  if (e.edition === _.Java) {
    return [
      "java",
      e.seed.toString(),
      e.javaVersion,
      e.config.flat ?? false,
      e.config.biomeSize ?? null,
      e.config.largeBiomes ?? false,
    ].join("//");
  } else {
    return [
      "bedrock",
      e.seed.toString(),
      e.bedrockVersion,
      e.config.flat ?? false,
      e.config.biomeSize ?? null,
      e.config.largeBiomes ?? false,
    ].join("//");
  }
}
function Rt(e) {
  return {
    ...e,
    seed: k.fromString(e.seed),
  };
}
const Hc = [208, 227, 240];
function Dc(e, t, n) {
  let r = "";
  let i;
  let o = false;
  return (s) => {
    const a = n(s);
    if (!o || a !== r) {
      r = a;
      if (o) {
        t(i);
      }
      i = e(s);
      o = true;
    }
    return i;
  };
}
function Ye(e, { x: t, z: n }) {
  return t >= e.x && t < e.x + e.sizeX && n >= e.z && n < e.z + e.sizeZ;
}
function Ft(e, t = {}) {
  const { x0: n = 0, x1: r = 0, z0: i = 0, z1: o = 0 } = t;
  return {
    x: e.x + n,
    z: e.z + i,
    sizeX: e.sizeX - n + r,
    sizeZ: e.sizeZ - i + o,
  };
}
function ci(e, t) {
  const n = to(
    {
      x: e.x,
      z: e.z,
    },
    t,
  );
  const r = to(
    {
      x: e.x + e.sizeX - 1,
      z: e.z + e.sizeZ - 1,
    },
    t,
  );
  return {
    x: n.x,
    z: n.z,
    sizeX: r.x - n.x + 1,
    sizeZ: r.z - n.z + 1,
  };
}
function to(e, t) {
  return {
    x: Math.floor(e.x / t),
    z: Math.floor(e.z / t),
  };
}
function ue(e, t) {
  for (let n = e.z; n < e.z + e.sizeZ; n++) {
    for (let r = e.x; r < e.x + e.sizeX; r++) {
      t(r, n);
    }
  }
}
async function Vs(e, t) {
  for (let n = e.z; n < e.z + e.sizeZ; n++) {
    for (let r = e.x; r < e.x + e.sizeX; r++) {
      await t(r, n);
    }
  }
}
function ks(e, t) {
  const n = [];
  ue(e, (r, i) => {
    if (t(r, i)) {
      n.push([r, i]);
    }
  });
  return n;
}
function Wc(e, t) {
  const n = [];
  ue(e, (r, i) => {
    n.push(...t(r, i));
  });
  return n;
}
function Gc(e, t) {
  return `${e},${t}`;
}
function jc(e) {
  return e.split(",").map((t) => parseInt(t, 10));
}
function Ue(e, t) {
  const n = e.reduce((r, i) => {
    const [o, s] = t(i);
    const a = Gc(o, s);
    r[a] ||= [];
    r[a].push(i);
    return r;
  }, {});
  return Object.entries(n).map(([r, i]) => {
    const [o, s] = jc(r);
    return [o, s, i];
  });
}
function Os(e, t, n) {
  const r = e.filter((i) => {
    const o = n(i);
    return Ye(t, {
      x: o[0],
      z: o[1],
    });
  });
  return Ue(r, n);
}
function Uc(e, t, n, r) {
  const i = Math.floor(t / r.spacing);
  const o = Math.floor(n / r.spacing);
  const { rng: s, chunkX: a, chunkZ: c } = Ms(e, i, o, r);
  return {
    rng: s,
    isFeatureChunk: a === t && c === n,
  };
}
function Ms(e, t, n, r) {
  const i = bs(e, t, n, r.salt, r.forceRngType);
  let o;
  let s;
  if (r.linearSeparation) {
    o = i.nextInt(r.spacing - r.separation);
    s = i.nextInt(r.spacing - r.separation);
  } else {
    o = Mn(
      (i.nextInt(r.spacing - r.separation) +
        i.nextInt(r.spacing - r.separation)) /
        2,
    );
    s = Mn(
      (i.nextInt(r.spacing - r.separation) +
        i.nextInt(r.spacing - r.separation)) /
        2,
    );
  }
  const a = t * r.spacing + o;
  const c = n * r.spacing + s;
  return {
    chunkX: a,
    chunkZ: c,
    rng: i,
  };
}
function q(e, t, n, r, i, o, s) {
  return async (a) => {
    const c = [];
    const l = i ? Ft(a, i) : a;
    const u = ci(l, t.spacing);
    await Vs(u, async (g, h) => {
      const { chunkX: w, chunkZ: b, rng: x } = Ms(e, g, h, t);
      try {
        if (
          !Ye(l, {
            x: w,
            z: b,
          })
        ) {
          return;
        }
        const C = await n(w, b, x);
        if (!C) {
          return;
        }
        if (r) {
          c.push([w, b, r(w, b, x, C)]);
        } else {
          c.push([w, b]);
        }
      } finally {
        x.free();
      }
    });
    if (!o) {
      return c;
    }
    const d = c.map((g) => g[2]).filter(Boolean);
    const f = Ue(d, o).filter((g) =>
      Ye(a, {
        x: g[0],
        z: g[1],
      }),
    );
    if (s) {
      return f.map((g) => [g[0], g[1], g[2][0]]);
    } else {
      return f;
    }
  };
}
async function Zc(e, t, n) {
  return (await q(e, t, async () => true)(n)).length > 0;
}
const Jc = {
  [m.AmethystGeode]: {
    [_.Java]: [p.V1_17, p.V26_3],
    [_.Bedrock]: [S.V1_17, S.V26_50],
  },
  [m.AncientCity]: {
    [_.Java]: [p.V1_19, p.V26_3],
    [_.Bedrock]: [S.V1_19, S.V26_50],
  },
  [m.BastionRemnant]: {
    [_.Java]: [p.V1_16, p.V26_3],
    [_.Bedrock]: [S.V1_16, S.V26_50],
  },
  [m.BuriedTreasure]: {
    [_.Java]: [p.V1_13, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.Cave]: {
    [_.Java]: [p.V1_18, p.V26_3],
    [_.Bedrock]: [S.V1_18, S.V26_50],
  },
  [m.DesertWell]: {
    [_.Java]: [p.V1_18, p.V26_3],
    [_.Bedrock]: [S.V1_18, S.V26_50],
  },
  [m.Dungeon]: {
    [_.Java]: [p.V1_13, p.V26_3],
    [_.Bedrock]: [S.V1_16, S.V26_50],
  },
  [m.EndCity]: {
    [_.Java]: [p.V1_13, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.EndGateway]: {
    [_.Java]: [p.V1_16, p.V26_3],
    [_.Bedrock]: [S.V1_16, S.V26_50],
  },
  [m.Fossil]: {
    [_.Java]: [p.V1_16, p.V26_3],
    [_.Bedrock]: [S.V1_16, S.V26_50],
  },
  [m.FossilNether]: {
    [_.Java]: [p.V1_16, p.V26_3],
    [_.Bedrock]: [S.V1_16, S.V26_50],
  },
  [m.ItemOverworld]: {
    [_.Java]: [p.V1_18, p.V26_3],
    [_.Bedrock]: [S.V1_18, S.V26_50],
  },
  [m.LavaPool]: {
    [_.Java]: [p.V1_18, p.V26_3],
    [_.Bedrock]: [S.V1_18, S.V26_50],
  },
  [m.Mineshaft]: {
    [_.Java]: [p.V1_7, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.NetherFortress]: {
    [_.Java]: [p.V1_7, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.OceanMonument]: {
    [_.Java]: [p.V1_8, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.OceanRuin]: {
    [_.Java]: [p.V1_16, p.V26_3],
    [_.Bedrock]: [S.V1_16, S.V26_50],
  },
  [m.OreVein]: {
    [_.Java]: [p.V1_18, p.V26_3],
    [_.Bedrock]: [S.V1_18, S.V26_50],
  },
  [m.PillagerOutpost]: {
    [_.Java]: [p.V1_14, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.Ravine]: {
    [_.Java]: [p.V1_16, p.V26_3],
    [_.Bedrock]: [S.V1_16, S.V26_50],
  },
  [m.RuinedPortalOverworld]: {
    [_.Java]: [p.V1_16, p.V26_3],
    [_.Bedrock]: [S.V1_16, S.V26_50],
  },
  [m.RuinedPortalNether]: {
    [_.Java]: [p.V1_16, p.V26_3],
    [_.Bedrock]: [S.V1_16, S.V26_50],
  },
  [m.DesertTemple]: {
    [_.Java]: [p.V1_7, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.JungleTemple]: {
    [_.Java]: [p.V1_7, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.WitchHut]: {
    [_.Java]: [p.V1_7, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.Igloo]: {
    [_.Java]: [p.V1_9, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.Shipwreck]: {
    [_.Java]: [p.V1_13, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.SlimeChunk]: {
    [_.Java]: [p.V1_7, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.Spawn]: {
    [_.Java]: [p.V1_7, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.Stronghold]: {
    [_.Java]: [p.V1_7, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.TrailRuin]: {
    [_.Java]: [p.V1_20, p.V26_3],
    [_.Bedrock]: [S.V1_20, S.V26_50],
  },
  [m.TrialChamber]: {
    [_.Java]: [p.V1_21, p.V26_3],
    [_.Bedrock]: [S.V1_21, S.V26_50],
  },
  [m.Village]: {
    [_.Java]: [p.V1_7, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.WoodlandMansion]: {
    [_.Java]: [p.V1_11, p.V26_3],
    [_.Bedrock]: [S.V1_14, S.V26_50],
  },
  [m.AbandonedCamp]: {
    [_.Java]: [p.V26_3, p.V26_3],
    [_.Bedrock]: [S.V26_50, S.V26_50],
  },
};
function W(e, t) {
  const n = Jc[e][t.edition];
  if (!n) {
    return false;
  }
  const r = t.edition === _.Java ? t.javaVersion : t.bedrockVersion;
  return r >= n[0] && r <= n[1];
}
const no = [
  (e, t, n) => [e, t, n],
  (e, t, n) => [-n, t, e],
  (e, t, n) => [-e, t, -n],
  (e, t, n) => [n, t, -e],
];
const As = (e, t) => {
  const n = e.reduce((i, o) => i + o[1], 0);
  let r = t.nextInt(n);
  for (const i of e) {
    r -= i[1];
    if (r < 0) {
      return i;
    }
  }
  throw new Error("Unable to find structure");
};
function zt({
  world: e,
  biomeProvider: t,
  chunkX: n,
  chunkZ: r,
  initialY: i,
  projectionY: o,
  allowedBiomes: s,
  structures: a,
  namedStartPos: c,
  mapResult: l,
}) {
  const u = me(e, n, r, undefined, "java");
  try {
    let d =
      typeof i == "number"
        ? i
        : i({
            rng: u,
          });
    const f = no[u.nextInt(no.length)];
    const g = As(a, u);
    const [h, , w] = g;
    const b = a.indexOf(g);
    const x = f(w[0] - 1, w[1] - 1, w[2] - 1);
    let C = [0, 0];
    if (c) {
      if (o) {
        throw new Error("not supported");
      }
      const F = f(c[0], 0, c[1]);
      C = [-F[0], -F[2]];
    }
    const I = (C[0] + (n * 16 + n * 16 + x[0]) / 2) | 0;
    const V = (C[1] + (r * 16 + r * 16 + x[2]) / 2) | 0;
    if (o) {
      d = d + t.getSurfaceBlock(I, V, o.heightType, o.surfaceCheckType) + 1;
    }
    let O;
    let E = null;
    if (s === "all") {
      O = true;
    } else {
      E = je(t.getNoiseBiome(I >> 2, d >> 2, V >> 2));
      if (typeof s == "function") {
        O = s(E);
      } else {
        O = s.includes(E);
      }
    }
    const A = (d - 1 + x[1] / 2) | 0;
    if (!O) {
      return false;
    }
    const z = {
      key: h,
      x: I,
      y: A,
      z: V,
      yBase: d,
    };
    if (l) {
      return l(z, {
        rng: u,
        biome: E,
        structureIndex: b,
      });
    } else {
      return z;
    }
  } finally {
    u.free();
  }
}
const Xc = (e) => (t, n) => {
  const r = e.reduce((i, o) => i + o.weight, 0);
  return (i, o) => {
    const s = me(t, i, o);
    try {
      let a = [...e];
      let c = r;
      while (a.length > 0) {
        let l = s.nextInt(c);
        let u = a[0];
        for (const f of a) {
          l -= f.weight;
          if (l < 0) {
            u = f;
            break;
          }
        }
        const d = u.canGenerate(i, o);
        if (d) {
          if (u.poi === n) {
            return d;
          } else {
            return false;
          }
        }
        c -= u.weight;
        a = a.filter((f) => f !== u);
      }
      return false;
    } finally {
      s.free();
    }
  };
};
const Rs = (e, t, n) =>
  Xc([
    {
      poi: m.NetherFortress,
      weight: 2,
      canGenerate: () => true,
    },
    {
      poi: m.BastionRemnant,
      weight: 3,
      canGenerate: (r, i) => Qc(e, t[y.Nether], r, i),
    },
  ])(e, n);
const $c = {
  supportsWorld: (e) => W(m.BastionRemnant, e),
  create: Kc,
};
const Pr = [ps, ei, hs, _s];
function ro(e, t, n, r) {
  if (e.edition === _.Java && e.javaVersion >= p.V1_18) {
    const i = me(e, t, n);
    const o = i.nextInt(5) >= 2;
    i.free();
    return o;
  } else {
    const i = e.edition === _.Bedrock ? 6 : 5;
    return r.nextInt(i) >= 2;
  }
}
function Qc(e, t, n, r) {
  const i = zt({
    world: e,
    biomeProvider: t.noise(),
    chunkX: n,
    chunkZ: r,
    initialY: 33,
    projectionY: null,
    allowedBiomes: Pr,
    structures: [
      ["units", 1, [46, 24, 46]],
      ["hoglin_stable", 1, [30, 24, 48]],
      ["treasure", 1, [38, 48, 38]],
      ["bridge", 1, [16, 32, 32]],
    ],
  });
  if (i) {
    return i.key;
  } else {
    return false;
  }
}
async function Kc(e, t) {
  const n = t.nether.noise();
  const r = Rs(e, t, m.BastionRemnant);
  return q(
    e,
    {
      spacing: e.edition === _.Bedrock ? 30 : 27,
      separation: 4,
      salt: 30084232,
      linearSeparation: true,
    },
    async (i, o, s) => {
      if (e.edition === _.Java) {
        if (e.javaVersion >= p.V1_18) {
          const a = r(i, o);
          if (a) {
            return {
              type: a,
            };
          } else {
            return false;
          }
        } else {
          if (
            !ro(e, i, o, s) ||
            !Pr.includes(je(n.getNoiseBiome(i * 4 + 2, 0, o * 4 + 2)))
          ) {
            return false;
          }
          const a = me(e, i, o);
          a.nextInt(4);
          const c = a.nextInt(4);
          a.free();
          return {
            type: ["units", "hoglin_stable", "treasure", "bridge"][c],
          };
        }
      } else if (!ro(e, i, o, s) || !Oc(n, i * 16 + 8, 0, o * 16 + 8, 2, Pr)) {
        return false;
      } else {
        s.nextInt(4);
        return {
          type: ["bridge", "treasure", "hoglin_stable", "units"][s.nextInt(4)],
        };
      }
    },
    (i, o, s, a) => a,
  );
}
const pt = (e, t, n, r) =>
  je(e.getNoiseBiomeAtHeightType(t * 4 + 2, n * 4 + 2, r));
const rr = (e, t, n, r) => je(e.getNoiseBiomeBlock(t, n, r));
const ut = (e, t, n, r, i, o) => !!li(e, t, n, r, i, o);
const li = (e, t, n, r, i, o) => {
  const s = o.map((V) => V.id);
  const a = t - i;
  const c = n - i;
  const l = r - i;
  const u = t + i;
  const d = n + i;
  const f = r + i;
  let g;
  const h = Math.floor((u - a + 4) / 4);
  const w = a + Math.floor(h / 2) * 4;
  const b = Math.floor((d - c + 4) / 4);
  const x = c + Math.floor(b / 2) * 4;
  const C = Math.floor((f - l + 4) / 4);
  const I = l + Math.floor(C / 2) * 4;
  for (let V = c; V <= d; V += 4) {
    for (let O = a; O <= u; O += 4) {
      for (let E = l; E <= f; E += 4) {
        const A = e.getNoiseBiomeBlock(O, V, E);
        if (!s.includes(A)) {
          return false;
        }
        if (O === w && V === x && E === I) {
          g = je(A);
        }
      }
    }
  }
  return g ?? je(e.getNoiseBiomeBlock(t, n, r));
};
const qc = (e, t, n, r, i) =>
  [
    [t, n],
    [t + r, n],
    [t, n + i],
    [t + r, n + i],
  ].map((o) =>
    e.getSurfaceBlock(o[0], o[1], "worldSurface", "topmostAccurate"),
  );
const io = (e, t, n, r, i) => {
  const o = qc(e, t * 16, n * 16, r, i);
  return Math.min(...o);
};
const Yc = {
  supportsWorld: (e) => W(m.BuriedTreasure, e),
  create: el,
};
async function el(e, t) {
  if (e.edition === _.Java) {
    return rl(e, t.overworld);
  } else {
    return nl(e, t.overworld);
  }
}
const oo = [lt, Ge, as, Hn];
const tl = [lt, Ge];
function nl(e, t) {
  return q(
    e,
    {
      salt: 16842397,
      spacing: 4,
      separation: 2,
      linearSeparation: false,
    },
    async (n, r) => {
      if (e.bedrockVersion >= S.V1_18) {
        const i = t.noise();
        const o = i.getPreliminarySurfaceLevel(n * 4, r * 4);
        return ut(i, n * 16 + 8, o, r * 16 + 8, 3, oo);
      } else {
        return t.legacy().areBiomesViable(n * 16 + 8, r * 16 + 8, 3, oo);
      }
    },
  );
}
function rl(e, t) {
  return async (n) => {
    const r = [];
    ue(n, (i, o) => {
      const s = bs(e, i, o, 10387320);
      if (s.nextFloat() >= 0.01) {
        s.free();
        return;
      }
      const a =
        e.javaVersion >= p.V1_18
          ? pt(t.noise(), i, o, "oceanFloor")
          : t.legacy().getBiomeForStructure(i, o);
      if (tl.includes(a)) {
        r.push([i, o]);
      }
      s.free();
    });
    return r;
  };
}
const ui = (e, t) => async (n) => {
  if (n.sizeX <= t && n.sizeZ <= t) {
    return e(n);
  }
  const r = ci(n, t);
  const i = [];
  await Vs(r, async (o, s) => {
    const a = await e({
      x: o * t,
      z: s * t,
      sizeX: t,
      sizeZ: t,
    });
    i.push(...a);
  });
  return i.filter((o) =>
    Ye(n, {
      x: o[0],
      z: o[1],
    }),
  );
};
function Fs(e) {
  return async (t) => async (n) => ks(n, (r, i) => e(t, r, i));
}
const zs = {
  supportsWorld: (e) => W(m.Mineshaft, e),
  create: Fs(il),
};
function il(e, t, n) {
  if (e.edition === _.Bedrock) {
    return sl(e, t, n);
  } else {
    return ol(e, t, n);
  }
}
function ol(e, t, n) {
  const r = me(e, t, n);
  try {
    if (e.javaVersion < p.V1_13) {
      r.nextIntVoid();
    }
    if (r.nextDouble() >= 0.004) {
      return false;
    }
    if (e.javaVersion >= p.V1_13) {
      return true;
    }
    const i = Math.max(Math.abs(t), Math.abs(n));
    if (i >= 80) {
      return true;
    } else {
      return r.nextInt(80) < i;
    }
  } finally {
    r.free();
  }
}
function sl(e, t, n) {
  const r = me(e, t, n);
  r.nextInt();
  if (r.nextFloat() >= 0.004) {
    r.free();
    return false;
  }
  const o = r.nextInt(80) < Math.max(Math.abs(t), Math.abs(n));
  r.free();
  return o;
}
const al = {
  supportsWorld: (e) => W(m.Dungeon, e),
  create: async (e, t) => {
    const n = new vc(e);
    const i = ai(e) ? t.overworld.noise() : undefined;
    const o = e.edition === _.Bedrock ? [await cl(e)] : [];
    const s = ui(async (c) => {
      const l = i ? n.find(i, c) : n.findLegacy(c);
      return Ue(l, (u) => [u[0] >> 4, u[2] >> 4]);
    }, 16);
    const a = async (c) => {
      let l = await s(c);
      for (const u of o) {
        l = await u(c, l);
      }
      return l;
    };
    a.free = () => {
      o.forEach((c) => c.free?.());
      n.free();
    };
    return a;
  },
};
const Pt = 6;
const cl = async (e) => {
  const t = await zs.create(e);
  const n = async (r, i) => {
    const o = await t(
      Ft(r, {
        x0: -Pt - 1,
        z0: -Pt - 1,
        x1: Pt,
        z1: Pt,
      }),
    );
    i = i.filter((s) => {
      s[2] = s[2].filter((a) => {
        const c = (a[0] - 8) >> 4;
        const l = (a[2] - 8) >> 4;
        return !o.find(
          (u) =>
            Math.sqrt((c - u[0]) * (c - u[0]) + (l - u[1]) * (l - u[1])) < Pt,
        );
      });
      return s[2].length > 0;
    });
    return i;
  };
  n.free = () => {
    t.free?.();
  };
  return n;
};
class Ls {
  chunkGen;
  constructor(t) {
    this.chunkGen = new Sc(t);
  }
  buildHeightmap(t, n) {
    return this.chunkGen.buildHeightmap(t, n);
  }
  free() {
    this.chunkGen.free();
  }
}
const ll = {
  supportsWorld: (e) => W(m.EndCity, e),
  create: async (e, t) => {
    const n = t.end;
    const r = new Ls(e);
    const i = q(
      e,
      {
        spacing: 20,
        separation: 11,
        salt: 10387313,
        linearSeparation: false,
      },
      async (o, s) => ul(e, r, n, o, s),
      (o, s, a) => {
        if (e.edition === _.Java) {
          const c = me(e, o, s);
          c.nextInt(4);
          const l = so(c);
          c.free();
          return {
            hasShip: l,
          };
        }
        return {
          hasShip: so(a),
        };
      },
    );
    i.free = () => {
      r.free();
    };
    return i;
  },
};
function ul(e, t, n, r, i) {
  const o = n.getBiomeAtChunk(r, i);
  if ([qt, ds].includes(o)) {
    return fl(e, r, i, t) >= 60;
  } else {
    return false;
  }
}
const fn = (e, t) => e * 16 + t;
function fl(e, t, n, r) {
  const i = r.buildHeightmap(t, n);
  let o;
  if (e.edition === _.Java) {
    if (e.javaVersion >= p.V1_19) {
      o = me(e, t, n);
    } else {
      o = new be(k.fromNumber(t).add(k.fromNumber(n).mul(10387313)));
    }
  } else {
    o = new re(n * 10387313 + t);
  }
  const s = o.nextInt(4);
  o.free();
  let a = 5;
  let c = 5;
  if (s === 1) {
    a = -5;
  } else if (s === 2) {
    a = -5;
    c = -5;
  } else if (s === 3) {
    c = -5;
  }
  const l = i[fn(7, 7)];
  const u = i[fn(7, 7 + c)];
  const d = i[fn(7 + a, 7)];
  const f = i[fn(7 + a, 7 + c)];
  return Math.min(l, u, d, f) + (e.edition === _.Bedrock ? 1 : 0);
}
function so(e) {
  const t = {
    hasShip: false,
  };
  Ct("TOWER_GENERATOR", 1, e, t);
  return t.hasShip;
}
const dl = {
  TOWER_GENERATOR: (e, t, n) => {
    t.nextInt(2);
    t.nextInt(2);
    let r = t.nextInt(3) === 0;
    const i = 1 + t.nextInt(3);
    for (let o = 0; o < i; o++) {
      if (!(o >= i - 1) && !!t.nextBoolean()) {
        r = true;
      }
    }
    if (r) {
      for (let o = 0; o < 4; o++) {
        if (t.nextBoolean()) {
          Ct("TOWER_BRIDGE_GENERATOR", e + 1, t, n);
        }
      }
    } else if (e !== 7) {
      return Ct("FAT_TOWER_GENERATOR", e + 1, t, n);
    }
    return true;
  },
  TOWER_BRIDGE_GENERATOR: (e, t, n) => {
    const r = t.nextInt(4) + 1;
    for (let i = 0; i < r; i++) {
      if (!t.nextBoolean()) {
        t.nextBoolean();
      }
    }
    if (n.hasShip || t.nextInt(10 - e) !== 0) {
      if (!Ct("HOUSE_TOWER_GENERATOR", e + 1, t, n)) {
        return false;
      }
    } else {
      t.nextInt(8);
      t.nextInt(10);
      n.hasShip = true;
    }
    return true;
  },
  HOUSE_TOWER_GENERATOR: (e, t, n) => {
    if (e > 8) {
      return false;
    }
    const r = t.nextInt(3);
    if (r === 1 || r === 2) {
      Ct("TOWER_GENERATOR", e + 1, t, n);
    }
    return true;
  },
  FAT_TOWER_GENERATOR: (e, t, n) => {
    for (let r = 0; r < 2 && t.nextInt(3) !== 0; r++) {
      for (let i = 0; i < 4; i++) {
        if (t.nextBoolean()) {
          Ct("TOWER_BRIDGE_GENERATOR", e + 1, t, n);
        }
      }
    }
    return true;
  },
};
function Ct(e, t, n, r) {
  if (t > 8 || r.hasShip) {
    return false;
  } else if (dl[e](t, n, r)) {
    n.nextInt();
    return true;
  } else {
    return false;
  }
}
const gl = (e) => async (t) =>
  ks(t, (n, r) => {
    const i = n >> 4;
    const o = r >> 4;
    const s = k.fromNumber(i ^ (o << 4)).xor(e.seed);
    const a = e.edition === _.Bedrock ? new re(s) : new be(s);
    try {
      a.nextInt();
      if (a.nextInt(3) !== 0) {
        return false;
      }
      const c = (i << 4) + 4 + a.nextInt(8);
      if (n !== c) {
        return false;
      }
      const l = (o << 4) + 4 + a.nextInt(8);
      return r === l;
    } finally {
      a.free();
    }
  });
const ml = (e, t) => {
  const n = Rs(e, t, m.NetherFortress);
  return q(
    e,
    {
      spacing: e.edition === _.Bedrock ? 30 : 27,
      separation: 4,
      salt: 30084232,
      linearSeparation: true,
    },
    async (r, i, o) =>
      e.edition === _.Java && e.javaVersion >= p.V1_18
        ? !!n(r, i)
        : o.nextInt(e.edition === _.Bedrock ? 6 : 5) < 2,
  );
};
const hl = {
  supportsWorld: (e) => W(m.NetherFortress, e),
  create: async (e, t) =>
    (e.edition === _.Java && e.javaVersion < p.V1_16) ||
    (e.edition === _.Bedrock && e.bedrockVersion < S.V1_16)
      ? gl(e)
      : ml(e, t),
};
const Nr = 63;
const pl = -64;
const ao = [Xe, Pe, Yr, Le, $t];
const dn = [Ke, Ne, Qe, Pe, Yt];
const gn = [Xe, Le, Pe, $e, gt, mt, Yt, Qe, Ke, Ne, Yr, $t];
const Ps = {
  spacing: 32,
  separation: 5,
  salt: 10387313,
  linearSeparation: false,
};
const fi = {
  supportsWorld: (e) => W(m.OceanMonument, e),
  create: async (e, t) => q(e, Ps, async (n, r) => _l(e, t.overworld, n, r)),
};
function _l(e, t, n, r) {
  if (e.edition === _.Java) {
    if (e.javaVersion >= p.V1_18) {
      const i = t.noise();
      return (
        dn.includes(pt(i, n, r, "oceanFloor")) &&
        ut(i, n * 16 + 9, Nr, r * 16 + 9, 29, gn)
      );
    } else if (e.javaVersion >= p.V1_13) {
      const i = t.legacy();
      return (
        i.areBiomesViable(n * 16 + 9, r * 16 + 9, 16, dn) &&
        i.areBiomesViable(n * 16 + 9, r * 16 + 9, 29, gn)
      );
    } else if (e.javaVersion >= p.V1_9) {
      const i = t.legacy();
      return (
        i.areBiomesViable(n * 16 + 8, r * 16 + 8, 16, [Pe]) &&
        i.areBiomesViable(n * 16 + 8, r * 16 + 8, 29, ao)
      );
    } else {
      const i = t.legacy();
      return (
        i.getBiomeGenAt(n * 16 + 8, r * 16 + 8, 1, 1)[0] === Pe &&
        i.areBiomesViable(n * 16 + 8, r * 16 + 8, 29, ao)
      );
    }
  } else if (e.bedrockVersion >= S.V1_18) {
    const i = t.noise();
    const o = i.getPreliminarySurfaceLevel(n * 4, r * 4);
    return (
      ut(i, n * 16 + 8, o, r * 16 + 8, 16, dn) &&
      ut(i, n * 16 + 8, o, r * 16 + 8, 29, gn)
    );
  } else {
    const i = t.legacy();
    return (
      i.areBiomesViable(n * 16 + 8, r * 16 + 8, 16, dn) &&
      i.areBiomesViable(n * 16 + 8, r * 16 + 8, 29, gn)
    );
  }
}
const yl = {
  supportsWorld: (e) => W(m.RuinedPortalOverworld, e),
  create: async (e) =>
    q(
      e,
      {
        spacing: 40,
        separation: 15,
        salt: e.edition === _.Bedrock ? 40552231 : 34222645,
        linearSeparation: true,
      },
      async () => true,
    ),
};
const wl = {
  supportsWorld: (e) => W(m.RuinedPortalNether, e),
  create: async (e) =>
    q(
      e,
      e.edition === _.Java && e.javaVersion >= p.V1_18
        ? {
            spacing: 40,
            separation: 15,
            salt: 34222645,
            linearSeparation: true,
          }
        : {
            spacing: 25,
            separation: 10,
            salt: e.edition === _.Bedrock ? 40552231 : 34222645,
            linearSeparation: true,
          },
      async () => true,
    ),
};
const mn = (e) => e.edition === _.Java && e.javaVersion >= p.V1_13;
const bl = (e) => e.edition === _.Java && e.javaVersion >= p.V1_16;
const Cn = (e) => e.edition === _.Java && e.javaVersion >= p.V1_18;
const Ns = (e) => e.edition === _.Bedrock && e.bedrockVersion >= S.V1_18;
const vl = {
  SHIPWRECK: (e) =>
    e.edition === _.Bedrock
      ? {
          ...(Ns(e)
            ? {
                spacing: 24,
                separation: 4,
              }
            : {
                spacing: 10,
                separation: 5,
                linearSeparation: false,
              }),
          salt: 165745295,
          allowedBiomes: [lt, Ge, Hn, Xe, Pe, mt, Ke, gt, Qe, Le, Ne, $e],
          checkChunk: (t, ...n) => Bl(e, ...n),
        }
      : {
          ...(bl(e)
            ? {
                spacing: 24,
                separation: 4,
              }
            : {
                spacing: 16,
                separation: 8,
              }),
          salt: mn(e) ? 165745295 : 14357617,
          checkBiome: Cn(e)
            ? (t, n, r, i, o) => {
                const s = [lt, Ge];
                const a = o.filter((u) => !s.includes(u));
                const c = pt(n.noise(), r, i, "worldSurface");
                if (s.includes(c)) {
                  return c;
                }
                const l = pt(n.noise(), r, i, "oceanFloor");
                if (a.includes(l)) {
                  return l;
                } else {
                  return false;
                }
              }
            : undefined,
          allowedBiomes: [lt, Ge, Le, Xe, mt, gt, $e, Ne, Ke, Pe, Qe, Yt],
        },
  DESERT_TEMPLE: (e) => ({
    spacing: 32,
    separation: 8,
    salt: 14357617,
    allowedBiomes: [Y, ss],
    checkChunk: Cn(e)
      ? async (t, n, r, i, o, s) => io(n.noise(), o, s, 21, 21) >= Nr
      : undefined,
  }),
  JUNGLE_TEMPLE: (e) => ({
    spacing: 32,
    separation: 8,
    salt: mn(e) ? 14357619 : 14357617,
    allowedBiomes: [wt, ti, ...(e.edition !== _.Bedrock ? [Qn, ms] : [])],
    checkChunk: Cn(e)
      ? async (t, n, r, i, o, s) => io(n.noise(), o, s, 12, 15) >= Nr
      : undefined,
  }),
  IGLOO: (e) => ({
    spacing: 32,
    separation: 8,
    salt: mn(e) ? 14357618 : 14357617,
    allowedBiomes: [Ve, Ae, vt],
  }),
  WITCH_HUT: (e) => ({
    spacing: 32,
    separation: 8,
    salt: mn(e) ? 14357620 : 14357617,
    allowedBiomes: e.edition === _.Java ? [dt] : [dt, gs],
  }),
};
const Hs = {
  supportsWorld: (e) => W(m.DesertTemple, e),
  create: (e, t, n) => on("DESERT_TEMPLE", e, t.overworld, n),
};
const Sl = {
  supportsWorld: (e) => W(m.JungleTemple, e),
  create: (e, t, n) => on("JUNGLE_TEMPLE", e, t.overworld, n),
};
const xl = {
  supportsWorld: (e) => W(m.WitchHut, e),
  create: (e, t, n) => on("WITCH_HUT", e, t.overworld, n),
};
const Cl = {
  supportsWorld: (e) => W(m.Igloo, e),
  create: (e, t, n) =>
    on("IGLOO", e, t.overworld, n, (r, i) => {
      if (e.edition === _.Bedrock) {
        const a = Pc(e, r, i);
        a.nextInt();
        const c = a.nextDouble() >= 0.5;
        a.free();
        return {
          hasBasement: c,
        };
      }
      if (e.javaVersion < p.V1_13) {
        return {
          hasBasement: null,
        };
      }
      const o = me(e, r, i);
      o.nextInt(4);
      const s = o.nextDouble() < 0.5;
      o.free();
      return {
        hasBasement: s,
      };
    }),
};
const Tl = {
  supportsWorld: (e) => W(m.Shipwreck, e),
  create: (e, t, n) => on("SHIPWRECK", e, t.overworld, n),
};
async function Bl(e, t, n, r, i, o) {
  const a = [Ge, lt, Hn].includes(r) ? 10 : 20;
  if (
    e.bedrockVersion >= S.V1_18
      ? ut(
          t.noise(),
          i * 16 + 8,
          t.noise().getPreliminarySurfaceLevel(i * 4, o * 4),
          o * 16 + 8,
          a,
          [r],
        )
      : t.legacy().areBiomesViable((i << 4) + 8, (o << 4) + 8, a, [r])
  ) {
    return (
      (
        await (
          await fi.create(
            e,
            {
              overworld: t,
            },
            n,
          )
        )({
          x: i - 5,
          z: o - 5,
          sizeX: 10,
          sizeZ: 10,
        })
      ).length < 1
    );
  } else {
    return false;
  }
}
function El(e, t, n, r, i) {
  const o = Cn(e)
    ? pt(t.noise(), n, r, "worldSurface")
    : Ns(e)
      ? rr(
          t.noise(),
          n * 16 + 8,
          t.noise().getPreliminarySurfaceLevel(n * 4, r * 4),
          r * 16 + 8,
        )
      : t.legacy().getBiomeForStructure(n, r);
  if (i.includes(o)) {
    return o;
  } else {
    return false;
  }
}
async function on(e, t, n, r, i) {
  const { allowedBiomes: o, checkBiome: s, checkChunk: a, ...c } = vl[e](t);
  const l = {
    linearSeparation: true,
    ...c,
  };
  const u = s || El;
  const d = async (f, g) => {
    const h = u(t, n, f, g, o);
    if (h) {
      return !a || (await a(t, n, r, h, f, g));
    } else {
      return false;
    }
  };
  if (i) {
    return q(t, l, d, i);
  } else {
    return q(t, l, d);
  }
}
const Il = {
  supportsWorld: (e) => W(m.SlimeChunk, e),
  create: Fs(Vl),
};
function Vl(e, t, n) {
  if (e.edition === _.Bedrock) {
    return zl(t, n);
  } else {
    return Fl(e.seed, t, n);
  }
}
const kl = 4987142;
const Ol = 5947611;
const Ml = k.fromInt(4392871);
const Al = 389711;
const Rl = k.fromInt(987234911);
function Fl(e, t, n) {
  const r = e
    .add(k.fromInt(Math.imul(Math.imul(t, t), kl)))
    .add(k.fromInt(Math.imul(t, Ol)))
    .add(k.fromInt(Math.imul(n, n)).multiply(Ml))
    .add(k.fromInt(Math.imul(n, Al)))
    .xor(Rl);
  const i = new be(r);
  const o = i.nextInt(10) === 0;
  i.free();
  return o;
}
function zl(e, t) {
  const n = new re(Math.imul(e, 522133279) ^ t);
  const r = n.nextInt(10) === 0;
  n.free();
  return r;
}
const di = {
  supportsWorld: (e) => W(m.Village, e),
  create: Ll,
};
function Ds(e) {
  return {
    spacing: e.javaVersion >= p.V1_18 ? 34 : 32,
    separation: 8,
    salt: 10387312,
    linearSeparation: true,
  };
}
async function Ll(e, t) {
  if (e.edition === _.Java) {
    const r = Ds(e);
    if (e.javaVersion >= p.V1_18) {
      return q(
        e,
        r,
        async (i, o) => Hl(e, t.overworld, i, o),
        (i, o, s, a) => a,
      );
    } else {
      return q(
        e,
        r,
        async (i, o) => Nl(e, t.overworld, i, o),
        (i, o, s, a) => {
          if (a === true) {
            return {
              type: null,
              zombie: null,
            };
          }
          if (e.javaVersion < p.V1_15) {
            return {
              type: null,
              zombie: null,
            };
          }
          const c = lo(a);
          const l = me(e, i, o);
          l.nextIntVoid(4);
          const u = As(Gs[c], l);
          l.free();
          return {
            type: c,
            zombie: js(u[0]),
          };
        },
      );
    }
  }
  const n = t.overworld;
  return q(
    e,
    {
      spacing: e.bedrockVersion >= S.V1_18 ? 34 : 27,
      separation: e.bedrockVersion >= S.V1_18 ? 8 : 10,
      salt: 10387312,
      linearSeparation: false,
    },
    async (r, i) =>
      e.bedrockVersion >= S.V1_18
        ? li(
            n.noise(),
            r * 16 + 8,
            n.noise().getPreliminarySurfaceLevel(r * 4, i * 4),
            i * 16 + 8,
            2,
            co,
          )
        : n.legacy().areBiomesViable(r * 16 + 8, i * 16 + 8, 2, co),
    (r, i, o, s) => {
      const a =
        typeof s != "boolean"
          ? s
          : e.bedrockVersion >= S.V1_18
            ? rr(
                n.noise(),
                r * 16 + 8,
                n.noise().getPreliminarySurfaceLevel(r * 4, i * 4),
                i * 16 + 8,
              )
            : n.legacy().getBiomeForStructure(r, i);
      o.nextInt(4);
      const c = e.bedrockVersion >= S.V1_18 ? 0.02 : 0.2;
      return {
        type: lo(a),
        zombie: o.nextDouble() < c,
      };
    },
  );
}
const mr = [Ie, Y, ke];
const hn = [Ie, Y, ke, pe];
const pn = [Ie, Y, ke, pe, Ve];
const ve = [Y, Ie, bt, ke, Ve, pe];
const Ws = {
  [p.V1_7]: mr,
  [p.V1_8]: mr,
  [p.V1_9]: mr,
  [p.V1_10]: hn,
  [p.V1_11]: hn,
  [p.V1_12]: hn,
  [p.V1_13]: hn,
  [p.V1_14]: pn,
  [p.V1_15]: pn,
  [p.V1_16]: pn,
  [p.V1_17]: pn,
  [p.V1_18]: ve,
  [p.V1_19]: ve,
  [p.V1_19_3]: ve,
  [p.V1_20]: ve,
  [p.V1_21]: ve,
  [p.V1_21_2]: ve,
  [p.V1_21_4]: ve,
  [p.V1_21_5]: ve,
  [p.V1_21_6]: ve,
  [p.V1_21_9]: ve,
  [p.V26_2]: ve,
  [p.V26_3]: ve,
};
const co = [Ie, en, ke, Ve, pe, Kt, Ae, Gn, Y, bt];
const gi = {
  desert: [Y],
  plains: [Ie, en, bt],
  savanna: [ke],
  snowy: [Ve],
  taiga: [pe, Kt, Ae, Gn],
};
const Pl = Object.keys(gi);
const lo = (e) => {
  for (const t of Pl) {
    if (gi[t].includes(e)) {
      return t;
    }
  }
  throw new Error(`Unexpected biome for village: ${e.id}`);
};
function Nl(e, t, n, r) {
  const i = Ws[e.javaVersion];
  const o = t.legacy();
  if (e.javaVersion < p.V1_13) {
    return o.areBiomesViable(n * 16 + 8, r * 16 + 8, 0, i);
  }
  const s = o.getBiomeForStructure(n, r);
  if (i.includes(s)) {
    return s;
  } else {
    return false;
  }
}
const Gs = {
  desert: [
    ["desert_meeting_point_1", 98, [17, 6, 9]],
    ["desert_meeting_point_2", 98, [12, 6, 12]],
    ["desert_meeting_point_3", 49, [15, 6, 15]],
    ["zombie/desert_meeting_point_1", 2, [17, 6, 9]],
    ["zombie/desert_meeting_point_2", 2, [12, 6, 12]],
    ["zombie/desert_meeting_point_3", 1, [15, 6, 15]],
  ],
  plains: [
    ["plains_fountain_01", 50, [9, 4, 9]],
    ["plains_meeting_point_1", 50, [10, 7, 10]],
    ["plains_meeting_point_2", 50, [8, 5, 15]],
    ["plains_meeting_point_3", 50, [11, 9, 11]],
    ["zombie/plains_fountain_01", 1, [9, 6, 9]],
    ["zombie/plains_meeting_point_1", 1, [10, 7, 10]],
    ["zombie/plains_meeting_point_2", 1, [8, 5, 15]],
    ["zombie/plains_meeting_point_3", 1, [11, 9, 11]],
  ],
  savanna: [
    ["savanna_meeting_point_1", 100, [14, 5, 12]],
    ["savanna_meeting_point_2", 50, [11, 6, 11]],
    ["savanna_meeting_point_3", 150, [9, 6, 11]],
    ["savanna_meeting_point_4", 150, [9, 6, 9]],
    ["zombie/savanna_meeting_point_1", 2, [14, 6, 12]],
    ["zombie/savanna_meeting_point_2", 1, [11, 6, 11]],
    ["zombie/savanna_meeting_point_3", 3, [9, 6, 11]],
    ["zombie/savanna_meeting_point_4", 3, [9, 6, 9]],
  ],
  snowy: [
    ["snowy_meeting_point_1", 100, [12, 8, 8]],
    ["snowy_meeting_point_2", 50, [11, 5, 9]],
    ["snowy_meeting_point_3", 150, [7, 7, 7]],
    ["zombie/snowy_meeting_point_1", 2, [12, 8, 8]],
    ["zombie/snowy_meeting_point_2", 1, [11, 6, 9]],
    ["zombie/snowy_meeting_point_3", 3, [7, 7, 7]],
  ],
  taiga: [
    ["taiga_meeting_point_1", 49, [22, 3, 18]],
    ["taiga_meeting_point_2", 49, [9, 7, 9]],
    ["zombie/taiga_meeting_point_1", 1, [22, 6, 18]],
    ["zombie/taiga_meeting_point_2", 1, [9, 7, 9]],
  ],
};
const js = (e) => e.startsWith("zombie/");
function Hl(e, t, n, r) {
  const i = Ws[e.javaVersion];
  const o = t.noise();
  const s = ["plains", "desert", "savanna", "snowy", "taiga"];
  for (const a of s) {
    const c = gi[a].filter((u) => i.includes(u));
    if (c.length < 1) {
      continue;
    }
    const l = zt({
      world: e,
      biomeProvider: o,
      chunkX: n,
      chunkZ: r,
      initialY: 0,
      projectionY: {
        heightType: "worldSurface",
        surfaceCheckType: "topmostAccurate",
      },
      allowedBiomes: c,
      structures: Gs[a],
    });
    if (l) {
      return {
        type: a,
        zombie: js(l.key),
      };
    }
  }
  return false;
}
const Dl = {
  supportsWorld: (e) => W(m.Stronghold, e),
  finiteGenerationArea: (e) =>
    e.edition === _.Java
      ? {
          x: -1536,
          z: -1536,
          sizeX: 3072,
          sizeZ: 3072,
        }
      : null,
  create: async (e, t, n) => {
    const r = await n.sharedTask("StrongholdFinder.staticStrongholds", () =>
      Wl(e, t.overworld, n),
    );
    return async (i) => [
      ...r.filter(([o, s]) =>
        Ye(i, {
          x: o,
          z: s,
        }),
      ),
      ...Gl(e, i),
    ];
  },
};
async function Wl(e, t, n) {
  if (e.edition === _.Bedrock) {
    return await Jl(e, t, n);
  } else if (e.javaVersion >= p.V1_9) {
    return jl(e, t);
  } else {
    return Zl(e, t.legacy());
  }
}
function Gl(e, t) {
  if (e.edition === _.Bedrock) {
    return Ul(e, t);
  } else {
    return [];
  }
}
const Tn = 32;
const Us = 3;
const at = [
  Ie,
  Y,
  Jt,
  Xt,
  pe,
  Ve,
  ec,
  os,
  ss,
  Qt,
  Kt,
  tc,
  wt,
  ti,
  Dn,
  as,
  Wn,
  cs,
  rt,
  Ae,
  Gn,
  kt,
  ls,
  us,
  ke,
  jn,
  Un,
  Zn,
  fs,
  en,
  ic,
  Jn,
  ni,
  oc,
  Xn,
  sc,
  ac,
  $n,
  cc,
  tn,
  lc,
  nn,
  uc,
  fc,
  ri,
  dc,
  ii,
  gc,
  mc,
];
const Bn = [...at, Hn];
const uo = [...Bn, Qn, ms];
const Se = [
  Ie,
  Y,
  Jt,
  Xt,
  pe,
  Ve,
  os,
  Qt,
  wt,
  Dn,
  Wn,
  rt,
  Ae,
  kt,
  ke,
  jn,
  Un,
  Zn,
  en,
  Jn,
  ni,
  Xn,
  $n,
  nn,
  ri,
  ii,
  Qn,
  Kn,
  qn,
  bt,
  Ot,
  vt,
  Mt,
  At,
  rn,
  er,
  tr,
];
const Hr = {
  [p.V1_7]: at,
  [p.V1_8]: at,
  [p.V1_9]: at,
  [p.V1_10]: at,
  [p.V1_11]: at,
  [p.V1_12]: at,
  [p.V1_13]: Bn,
  [p.V1_14]: uo,
  [p.V1_15]: uo,
  [p.V1_16]: Bn,
  [p.V1_17]: Bn,
  [p.V1_18]: Se,
  [p.V1_19]: Se,
  [p.V1_19_3]: Se,
  [p.V1_20]: Se,
  [p.V1_21]: Se,
  [p.V1_21_2]: Se,
  [p.V1_21_4]: Se,
  [p.V1_21_5]: Se,
  [p.V1_21_6]: Se,
  [p.V1_21_9]: Se,
  [p.V26_2]: Se,
  [p.V26_3]: Se,
};
function jl(e, t) {
  const r = new be(e.seed);
  let i = r.nextDouble() * 3.141592653589793 * 2;
  const o = [];
  let s = 0;
  let a = 0;
  let c = Us;
  for (let l = 0; l < 128; ++l) {
    const u = r.nextDouble();
    const d = Tn * 4 + Tn * s * 6 + (u - 0.5) * Tn * 2.5;
    let f = Math.round(Math.cos(i) * d);
    let g = Math.round(Math.sin(i) * d);
    const h = e.javaVersion >= p.V1_19_3 ? new be(r.nextLong()) : null;
    const w =
      e.javaVersion >= p.V1_18
        ? Ec(
            t.noise(),
            (f << 4) + 8,
            0,
            (g << 4) + 8,
            112,
            (b) => Hr[e.javaVersion].includes(b),
            e.javaVersion >= p.V1_19_3 ? h : r,
          )
        : t
            .legacy()
            .findBiomePosition(
              (f << 4) + 8,
              (g << 4) + 8,
              112,
              Hr[e.javaVersion],
              r,
            );
    h?.free();
    if (w != null) {
      f = w[0] >> 4;
      g = w[2] >> 4;
    }
    o.push([f, g]);
    i += 6.283185307179586 / c;
    a += 1;
    if (a === c) {
      s++;
      a = 0;
      c += Mn((c * 2) / (s + 1));
      c = Math.min(c, 128 - l);
      i += r.nextDouble() * 3.141592653589793 * 2;
    }
  }
  r.free();
  return o;
}
function Ul(e, t) {
  const o = ci(t, 200);
  return Wc(o, (s, a) => {
    const c = s * 200 + Math.floor(100);
    const l = a * 200 + Math.floor(100);
    const u =
      (((Math.imul(-1683231919, c) -
        Math.imul(1100435783, l) +
        e.seed.toInt()) |
        0) +
        97858791) |
      0;
    const d = new re(u);
    const f = s * 200 + 200 - 150;
    const g = a * 200 + 200 - 150;
    const h = s * 200 + 150;
    const w = a * 200 + 150;
    const b = d.nextIntRange(f, h);
    const x = d.nextIntRange(g, w);
    const C = d.nextFloat() < 0.25;
    d.free();
    if (C) {
      return [[b, x]];
    } else {
      return [];
    }
  }).filter(([s, a]) =>
    Ye(t, {
      x: s,
      z: a,
    }),
  );
}
function Zl(e, t) {
  const r = new be(e.seed);
  let i = r.nextDouble() * 3.141592653589793 * 2;
  let o = 1;
  const s = [];
  let a = Us;
  for (let c = 0; c < 3; ++c) {
    const l = r.nextDouble();
    const u = (o * 1.25 + l) * Tn * o;
    let d = Math.round(Math.cos(i) * u);
    let f = Math.round(Math.sin(i) * u);
    const g = t.findBiomePosition(
      (d << 4) + 8,
      (f << 4) + 8,
      112,
      Hr[e.javaVersion],
      r,
    );
    if (g != null) {
      d = g[0] >> 4;
      f = g[2] >> 4;
    }
    s.push([d, f]);
    i += (o * 6.283185307179586) / a;
    if (c === a) {
      o += 2 + r.nextInt(5);
      a += 1 + r.nextInt(2);
    }
  }
  r.free();
  return s;
}
async function Jl(e, t, n) {
  const i = [];
  const o = await di.create(
    e,
    {
      overworld: t,
    },
    n,
  );
  const s = new re(e.seed);
  let a = s.nextFloat() * Math.PI * 2;
  let c = s.nextInt(16) + 40;
  s.free();
  let l = 0;
  while (l < 3) {
    const u = Math.floor(c * Math.cos(a));
    const d = Math.floor(c * Math.sin(a));
    let f = false;
    e: for (let g = u - 8; g < u + 8; g++) {
      for (let h = d - 8; h < d + 8; h++) {
        if (
          (
            await o({
              x: g,
              z: h,
              sizeX: 1,
              sizeZ: 1,
            })
          ).length > 0
        ) {
          i[l++] = [g, h];
          f = true;
          break e;
        }
      }
    }
    if (f) {
      a += Math.PI * 0.6;
      c += 8;
    } else {
      a += Math.PI * 0.25;
      c += 4;
    }
  }
  return i;
}
const Xl = [rt, tn];
const $l = [rt, tn, er];
const Ql = [rt, tn, qn, Kn];
const Kl = [rt, tn, qn, Kn, er, tr];
const ql = (e) =>
  e.edition === _.Java
    ? e.javaVersion >= p.V1_21_5
      ? $l
      : Xl
    : e.bedrockVersion >= S.V1_21_60
      ? Kl
      : Ql;
const Yl = {
  supportsWorld: (e) => W(m.WoodlandMansion, e),
  create: async (e, t) =>
    q(
      e,
      {
        spacing: 80,
        separation: 20,
        linearSeparation: false,
        salt: 10387319,
      },
      async (n, r) => eu(e, t.overworld, n, r),
    ),
};
function eu(e, t, n, r) {
  const i = ql(e);
  if (e.edition === _.Java && e.javaVersion >= p.V1_18) {
    const s = t
      .noise()
      .getNoiseBiomeAtHeightType(
        (n * 16 + 7) >> 2,
        (r * 16 + 7) >> 2,
        "worldSurface",
      );
    return i.includes(je(s));
  } else if (e.edition === _.Bedrock && e.bedrockVersion >= S.V1_18) {
    return ut(
      t.noise(),
      n * 16 + 8,
      t.noise().getPreliminarySurfaceLevel(n * 4, r * 4),
      r * 16 + 8,
      32,
      i,
    );
  }
  const o = e.edition !== _.Bedrock && e.javaVersion >= p.V1_13 ? 9 : 8;
  return t.legacy().areBiomesViable(n * 16 + o, r * 16 + o, 32, i);
}
const fo = [Ie, Y, pe, Ve, ke, Ot, bt, Mt, At, rn, vt, ys];
const Zs = [Ie, en, ke, Ve, pe, Kt, Gn, Y];
const tu = [...Zs, Ae, bt, Mt, At, rn, vt, Ot, ys];
const nu = {
  supportsWorld: (e) => W(m.PillagerOutpost, e),
  create: async (e, t, n) => {
    if (e.edition === _.Bedrock) {
      return q(
        e,
        {
          spacing: 80,
          separation: 24,
          salt: 165745296,
          linearSeparation: false,
        },
        async (i, o) => ru(e, t.overworld, i, o),
      );
    }
    const r = await di.create(e, t, n);
    return q(
      e,
      {
        spacing: 32,
        separation: 8,
        salt: 165745296,
        linearSeparation: true,
      },
      async (i, o) => await iu(e, t.overworld, r, i, o),
    );
  },
};
function ru(e, t, n, r) {
  if (e.bedrockVersion >= S.V1_18) {
    return ut(
      t.noise(),
      n * 16 + 8,
      t.noise().getPreliminarySurfaceLevel(n * 4, r * 4),
      r * 16 + 8,
      0,
      tu,
    );
  } else {
    return t.legacy().areBiomesViable(n * 16 + 8, r * 16 + 8, 0, Zs);
  }
}
async function iu(e, t, n, r, i) {
  const o = r >> 4;
  const s = i >> 4;
  const a = k.fromNumber(o ^ (s << 4)).xor(e.seed);
  const c = new be(a);
  c.nextIntVoid();
  const l = c.nextInt(5);
  c.free();
  if (l !== 0 || !ou(e, t, r, i)) {
    return false;
  }
  const u = {
    x: r - 10,
    z: i - 10,
    sizeX: 21,
    sizeZ: 21,
  };
  if (e.javaVersion >= p.V1_16) {
    return !(await Zc(e, Ds(e), u));
  } else {
    return (await n(u)).length <= 0;
  }
}
function ou(e, t, n, r) {
  if (e.javaVersion >= p.V1_18) {
    return !!zt({
      world: e,
      biomeProvider: t.noise(),
      chunkX: n,
      chunkZ: r,
      initialY: 0,
      projectionY: {
        heightType: "worldSurface",
        surfaceCheckType: "topmostAccurate",
      },
      allowedBiomes: fo,
      structures: [["outpost", 1, [16, 30, 16]]],
    });
  } else {
    return fo.includes(t.getBiomeForStructure(n, r));
  }
}
const ot = {
  warm: [Qe, Yt, gt, $e],
  cold: [mt, Ke, Ne, Pe, Le, Xe],
};
const su = new Map([
  [
    Le,
    {
      type: "cold",
      largeProbability: 0.3,
      clusterProbability: 0.25,
    },
  ],
  [
    Xe,
    {
      type: "cold",
      largeProbability: 0.3,
      clusterProbability: 0.25,
    },
  ],
  [
    Pe,
    {
      type: "cold",
      largeProbability: 0.5,
      clusterProbability: 0.4,
    },
  ],
  [
    $e,
    {
      type: "warm",
      largeProbability: 0.3,
      clusterProbability: 0.5,
    },
  ],
  [
    Yt,
    {
      type: "warm",
      largeProbability: 0.3,
      clusterProbability: 0.5,
    },
  ],
  [
    gt,
    {
      type: "warm",
      largeProbability: 0.3,
      clusterProbability: 0.5,
    },
  ],
  [
    Qe,
    {
      type: "warm",
      largeProbability: 0.3,
      clusterProbability: 0.5,
    },
  ],
  [
    mt,
    {
      type: "cold",
      largeProbability: 0.3,
      clusterProbability: 0.25,
    },
  ],
  [
    Ke,
    {
      type: "cold",
      largeProbability: 0.5,
      clusterProbability: 0.4,
    },
  ],
  [
    Ne,
    {
      type: "cold",
      largeProbability: 0.5,
      clusterProbability: 0.4,
    },
  ],
]);
const au = {
  supportsWorld: (e) => W(m.OceanRuin, e),
  async create(e, t, n) {
    const r = e.edition === _.Bedrock ? await fi.create(e, t, n) : null;
    return q(
      e,
      e.edition === _.Java || e.bedrockVersion >= S.V1_18
        ? {
            spacing: 20,
            separation: 8,
            linearSeparation: true,
            salt: 14357621,
          }
        : {
            spacing: 12,
            separation: 7,
            linearSeparation: false,
            salt: 14357621,
          },
      async (i, o) => {
        if (e.edition === _.Bedrock) {
          if (
            (
              await r({
                x: i - 5,
                z: o - 5,
                sizeX: 10,
                sizeZ: 10,
              })
            ).length >= 1
          ) {
            return false;
          }
          const a = [...ot.cold, ...ot.warm];
          let c;
          if (e.bedrockVersion >= S.V1_18) {
            const l = t.overworld.noise();
            const u = l.getPreliminarySurfaceLevel(i * 4, o * 4);
            c = li(l, i * 16 + 8, u, o * 16 + 8, 0, a);
            if (!c) {
              return false;
            }
          } else {
            if (
              !t.overworld
                .legacy()
                .areBiomesViable(i * 16 + 8, o * 16 + 8, 0, a)
            ) {
              return false;
            }
            c = t.overworld.legacy().getBiomeForStructure(i, o);
          }
          if ([...ot.cold, ...ot.warm].includes(c)) {
            return c;
          } else {
            return false;
          }
        } else {
          const s =
            e.javaVersion >= p.V1_18
              ? pt(t.overworld.noise(), i, o, "oceanFloor")
              : t.overworld.legacy().getBiomeForStructure(i, o);
          if ([...ot.cold, ...ot.warm].includes(s)) {
            return s;
          } else {
            return false;
          }
        }
      },
      (i, o, s, a) => {
        const c =
          e.edition === _.Bedrock
            ? su.get(a)
            : {
                type: ot.cold.includes(a) ? "cold" : "warm",
                largeProbability: 0.3,
                clusterProbability: 0.9,
              };
        if (!c) {
          throw new Error("Unexpected biome");
        }
        const l =
          e.edition === _.Bedrock ? Uc(e, i + 4, o + 4, Ps).rng : me(e, i, o);
        l.nextInt(4);
        const u = l.nextFloat() <= c.largeProbability;
        let d = 0;
        if (u && (l.nextInt(), l.nextFloat() <= c.clusterProbability)) {
          for (let f = 0; f < 16; f++) {
            l.nextInt();
          }
          d = 4 + l.nextInt(5);
        }
        l.free();
        return {
          type: c.type,
          isLarge: u,
          clusterSize: d,
        };
      },
    );
  },
};
const Js = [wt, ti, Ie, Xt, Qt, pe, Kt];
function cu(e, t) {
  if (e.bedrockVersion >= S.V1_18) {
    const [r, , i] = t.noise().findSpawnPosition();
    return [r, i];
  }
  let n = 40;
  while (n < 20000) {
    const r = t.legacy().getBiomeArea(n, 0, n + 40, 40);
    for (let i = 1; i < 9; i++) {
      for (let o = 1; o < 9; o++) {
        if (
          [
            [n + o * 4 + 0, i * 4 + 0],
            [n + o * 4 - 4, i * 4 + 0],
            [n + o * 4 + 4, i * 4 + 0],
            [n + o * 4 + 0, i * 4 - 4],
            [n + o * 4 + 0, i * 4 + 4],
          ].every((c) => Js.includes(r(c[0], c[1])))
        ) {
          return [n + o * 4, i * 4];
        }
      }
    }
    n += 40;
  }
  return [0, 0];
}
function lu(e, t) {
  if (e.javaVersion >= p.V1_18) {
    const [n, , r] = t.noise().findSpawnPosition();
    return [n, r];
  } else {
    const n = new be(e.seed);
    const [r, , i] = t.legacy().findBiomePosition(0, 0, 256, Js, n) || [
      0, 0, 0,
    ];
    n.free();
    return [r, i];
  }
}
const uu = {
  supportsWorld: (e) => W(m.Spawn, e),
  finiteGenerationArea(e) {
    if (e.edition === _.Bedrock && e.bedrockVersion < S.V1_18) {
      return {
        x: 0,
        z: 0,
        sizeX: 1253,
        sizeZ: 3,
      };
    } else {
      return {
        x: -512,
        z: -512,
        sizeX: 1024,
        sizeZ: 1024,
      };
    }
  },
  async create(e, { overworld: t }) {
    const n = e.edition === _.Java ? lu(e, t) : cu(e, t);
    const r = {
      x: n[0] >> 4,
      z: n[1] >> 4,
    };
    return async (i) =>
      Ye(i, r)
        ? [
            [
              r.x,
              r.z,
              {
                x: n[0],
                z: n[1],
              },
            ],
          ]
        : [];
  },
};
function Xs(e, t, n, r) {
  const i = t.add(n);
  xn(i, k.fromNumber(r * 10000));
  if (e.javaVersion >= p.V1_18) {
    return jt.fromSeed(i);
  } else {
    return new be(i);
  }
}
function fu(e) {
  const t = e;
  if (t.decorator) {
    return t.decorator;
  } else {
    return t.placement.reverse();
  }
}
function et(e, t, n, r) {
  const { decorationStepOrdinal: i, featureIndex: o, feature: s } = r;
  const a = fu(r);
  const c = [t * 16, 0, n * 16];
  const l = vs(e, c[0], c[2]);
  const u = Xs(e, l, o, i);
  const d = [];
  const f = {
    random: u,
  };
  a.reduce(
    (h, w) => (b, x, C) => {
      w(b, x, (I) => h(I, x, C));
    },
    (h) => d.push(s(h, f)),
  )(c, f, (h) => {
    const w = s(h, f);
    d.push(w);
  });
  u.free();
  return d;
}
const tt = (e) => (t, n, r) => {
  if (n.random.nextFloat() < 1 / e.chance) {
    r(t);
  }
};
const sn = () => (e) => [e];
const go = (e) => (t) => {
  const { minInclusive: n, maxInclusive: r } = e;
  if (n > r) {
    return r;
  } else {
    return t.nextInt(r - n + 1) + n;
  }
};
const du = (e) => (t) => {
  const { minInclusive: n, maxInclusive: r, plateau: i = 0 } = e;
  if (n > r) {
    console.warn("3276386391");
    return r;
  }
  const o = r - n;
  if (i >= o) {
    return hr(t, n, r);
  }
  const s = Math.floor((o - i) / 2);
  const a = o - s;
  return n + hr(t, 0, a) + hr(t, 0, s);
};
function hr(e, t, n) {
  return e.nextInt(n - t + 1) + t;
}
const gu = (e) => (t, n, r) => {
  const i = e(n.random);
  r([t[0], i, t[2]]);
};
const pr = (e) => (t) => gu(e(t));
const An = {
  uniform: pr(go),
  triangle: pr(du),
  range_8_8_nether: pr(() =>
    go({
      minInclusive: 8,
      maxInclusive: 119,
    }),
  ),
};
const Ut =
  ({ provider: e, allowedBiomes: t, disallowedBiomes: n }) =>
  (r, i, o) => {
    const s = je(e.getNoiseBiome(r[0] >> 2, r[1] >> 2, r[2] >> 2));
    if ((!t || !!t.includes(s)) && (!n || !n.includes(s))) {
      o(r);
    }
  };
const _t = () => (e, t, n) => {
  const { random: r } = t;
  const i = e[0] + r.nextInt(16);
  const o = e[2] + r.nextInt(16);
  n([i, e[1], o]);
};
const mo = (e) => (t, n) => {
  const { random: r } = n;
  r.nextInt(4);
  r.nextInt(4);
  const i = Math.min(
    t[1],
    e.getSurfaceBlock(t[0], t[2], "oceanFloor", "topmostAccurate"),
  );
  const o = Math.max(i - 15 - r.nextInt(10), pl + 10);
  return [[t[0], o, t[2]]];
};
class Rn {
  gen;
  constructor(t, n) {
    const r = we(t);
    this.gen = new vr(r, n);
  }
  getSeedForChunk(t, n) {
    return this.gen.a(t, n);
  }
  free() {
    this.gen.free();
  }
}
class mu {
  finder;
  constructor(t) {
    this.finder = new Or(we(t));
  }
  find(t, n) {
    return this.finder.a(t.x, t.z, t.sizeX, t.sizeZ, n.provider);
  }
  free() {
    this.finder.free();
  }
}
const hu = {
  supportsWorld: (e) => W(m.Fossil, e),
  create: async function (e, t) {
    if (e.edition === _.Java) {
      if (e.javaVersion >= p.V1_18) {
        return pu(e, t.overworld.noise());
      } else {
        return yu(e, t.overworld.legacy());
      }
    } else {
      return wu(e, t.overworld);
    }
  },
};
const ho = [Y, dt, Yn];
function pu(e, t) {
  return async (n) => {
    const r = [];
    ue(n, (i, o) => {
      const s = et(e, i, o, {
        decorationStepOrdinal: 3,
        featureIndex: 0,
        placement: [
          tt({
            chance: 64,
          }),
          _t(),
          An.uniform({
            minInclusive: 0,
            maxInclusive: 319,
          }),
          Ut({
            provider: t,
            allowedBiomes: ho,
          }),
        ],
        feature: mo(t),
      });
      const a = et(e, i, o, {
        decorationStepOrdinal: 3,
        featureIndex: 1,
        placement: [
          tt({
            chance: 64,
          }),
          _t(),
          An.uniform({
            minInclusive: -64,
            maxInclusive: -8,
          }),
          Ut({
            provider: t,
            allowedBiomes: ho,
          }),
        ],
        feature: mo(t),
      });
      const c = [];
      if (s.length > 0) {
        c.push([...s[0][0], "coal"]);
      }
      if (a.length > 0) {
        c.push([...a[0][0], "diamond"]);
      }
      if (c.length > 0) {
        r.push([i, o, c]);
      }
    });
    return r;
  };
}
const _u = {
  [Y.id]: 0,
  [dt.id]: 0,
  [gs.id]: 1,
};
function yu(e, t) {
  return async (n) => {
    const r = [];
    const i = t.getNoiseBiomeArea(
      n.x * 4 + 2,
      n.z * 4 + 2,
      (n.x + n.sizeX) * 4 - 2,
      (n.z + n.sizeZ) * 4 - 2,
    );
    ue(n, (o, s) => {
      const a = i(o * 4 + 2, s * 4 + 2).id;
      const c = _u[a];
      if (c == null) {
        return;
      }
      if (
        et(e, o, s, {
          decorationStepOrdinal: 3,
          featureIndex: c + 2,
          decorator: [
            tt({
              chance: 64,
            }),
          ],
          feature: sn(),
        }).length > 0
      ) {
        r.push([o, s, undefined]);
      }
    });
    return r;
  };
}
function po(e, t, n) {
  if (n === "default") {
    return t === Y.id || t === dt.id;
  } else {
    return (
      n === "deep" &&
      e >= S.V1_18 &&
      (t === Y.id || t === dt.id || (t === Yn.id && e >= S.V1_21_60))
    );
  }
}
function wu(e, t) {
  const n = e.bedrockVersion >= S.V1_18;
  const r = new Rn(e, "minecraft:desert_or_swamp_after_surface_fossil_feature");
  const i = n
    ? new Rn(
        e,
        "minecraft:desert_or_swamp_after_surface_fossil_deepslate_feature",
      )
    : null;
  const o = async (s) => {
    const a = [];
    const c = n
      ? null
      : t
          .legacy()
          .getBiomeArea(
            s.x * 16,
            s.z * 16,
            (s.x + s.sizeX) * 16,
            (s.z + s.sizeZ) * 16,
          );
    ue(s, (l, u) => {
      const d = c
        ? c(l * 16 + 15, u * 16 + 15)
        : rr(t.noise(), l * 16, 0, u * 16);
      const f = po(e.bedrockVersion, d.id, "default");
      const g = po(e.bedrockVersion, d.id, "deep");
      if (!f && !g) {
        return;
      }
      const h = [];
      if (f) {
        const w = r.getSeedForChunk(l, u);
        const b = new re(w);
        if (b.nextInt(64) < 1) {
          h.push([null, null, null, "coal"]);
        }
        b.free();
      }
      if (g && i) {
        const w = i.getSeedForChunk(l, u);
        const b = new re(w);
        if (b.nextInt(64) < 1) {
          h.push([null, null, null, "diamond"]);
        }
        b.free();
      }
      if (h.length > 0) {
        a.push([l, u, h]);
      }
    });
    return a;
  };
  o.free = () => {
    r.free();
    i?.free();
  };
  return o;
}
const bu = {
  supportsWorld: (e) => W(m.FossilNether, e),
  create: async function (e, t) {
    return vu(e, t.nether.noise());
  },
};
function vu(e, t) {
  const n = new mu(e);
  const r = async (i) => {
    const o = n.find(i, t).map((s) => [
      s.x,
      s.y,
      s.z,
      {
        variant: s.variant,
        hasDriedGhast: s.hasDriedGhast,
      },
    ]);
    return Ue(o, (s) => [s[0] >> 4, s[2] >> 4]);
  };
  r.free = () => {
    n.free();
  };
  return r;
}
const ir = (e, t, n) => e.nextInt(n - t + 1) + t;
const Dr = (e, t, n) => ir(e, t, n - 1);
const Su = (e, t, n, r) => {
  const i = n - t;
  const o = (i - r) / 2;
  const s = i - o;
  return t + e.nextFloat() * s + e.nextFloat() * o;
};
const xu = {
  supportsWorld: (e) => W(m.Ravine, e),
  create: async (e, { overworld: t }) =>
    e.edition === _.Java
      ? e.javaVersion >= p.V1_18
        ? Cu(e)
        : Bu(e, t.legacy())
      : Eu(e, t),
};
function Cu(e) {
  return async (t) => {
    const n = [];
    ue(t, (r, i) => {
      const o = [];
      const s = me(e, r, i, 2);
      if (s.nextFloat() < 0.01) {
        const a = Tu(s, r, i);
        o.push(a);
      }
      s.free();
      if (o.length > 0) {
        n.push([r, i, o]);
      }
    });
    return n;
  };
}
function Tu(e, t, n) {
  const r = t * 16 + e.nextInt(16);
  const i = ir(e, 10, 67);
  const o = n * 16 + e.nextInt(16);
  e.nextFloat();
  e.nextFloat();
  const s = Su(e, 0, 6, 2);
  return {
    x: r,
    y: i,
    z: o,
    thickness: s,
    isUnderwater: false,
    isMegaRavine: false,
  };
}
function Bu(e, t) {
  return async (n) => {
    const r = [];
    const i = t.getNoiseBiomeArea(
      (n.x - 8) * 4,
      (n.z - 8) * 4,
      (n.x + n.sizeX + 8) * 4,
      (n.z + n.sizeZ + 8) * 4,
    );
    ue(n, (o, s) => {
      const a = [];
      const c = me(e, o, s, 1);
      if (c.nextFloat() < 0.02) {
        const u = _o(c, o, s, false);
        a.push(u);
      }
      c.free();
      const l = me(e, o, s, 0);
      if (l.nextFloat() < 0.02 && i(o * 4, s * 4).category === "ocean") {
        a.push(_o(l, o, s, true));
      }
      l.free();
      if (a.length > 0) {
        r.push([o, s, a]);
      }
    });
    return r;
  };
}
function _o(e, t, n, r) {
  const i = t * 16 + e.nextInt(16);
  const o = e.nextInt(e.nextInt(40) + 8) + 20;
  const s = n * 16 + e.nextInt(16);
  e.nextFloat();
  e.nextFloat();
  const a = (e.nextFloat() * 2 + e.nextFloat()) * 2;
  return {
    x: i,
    y: o,
    z: s,
    thickness: a,
    isUnderwater: r,
    isMegaRavine: false,
  };
}
function Eu(e, t) {
  const n = nr(e);
  return async (r) => {
    const i = [];
    ue(r, (o, s) => {
      const a = new re(n(o, s));
      try {
        if (a.nextInt(e.bedrockVersion >= S.V1_21_60 ? 100 : 150) !== 0) {
          return;
        }
        const c = a.nextInt(16) + o * 16;
        let l;
        if (e.bedrockVersion >= S.V1_21_60) {
          l = ir(a, 10, 67);
          a.nextInt();
        } else {
          const w = a.nextInt(40);
          l = a.nextInt(w + 8) + 20;
        }
        a.nextInt();
        const u = a.nextInt(16) + s * 16;
        a.nextFloat();
        a.nextFloat();
        let d = a.nextFloat() * 3 + a.nextFloat() * 3;
        const f = a.nextFloat() < 0.05;
        if (f) {
          d = d * 2;
        }
        const h =
          (e.bedrockVersion < S.V1_18
            ? t.legacy().getBiomeGenAt(c, u, 1, 1)[0]
            : pt(t.noise(), o, s, "oceanFloor")
          ).category === "ocean";
        if (
          !h ||
          e.bedrockVersion < S.V1_18 ||
          e.bedrockVersion >= S.V1_21_60
        ) {
          i.push([
            o,
            s,
            [
              {
                x: c,
                y: l,
                z: u,
                thickness: d,
                isMegaRavine: f,
                isUnderwater: h,
              },
            ],
          ]);
        }
      } finally {
        a.free();
      }
    });
    return i;
  };
}
function Iu(e, t) {
  const n = new Map();
  const r = new Map();
  let i;
  let o;
  let s;
  const a = (f, g) => {
    if (s != null && i === f && o === g) {
      return s;
    }
    let h = r.get(f);
    if (h == null) {
      h = new Map();
      r.set(f, h);
    }
    let w = h.get(g);
    if (w == null) {
      w = e.buildHeightmap(f, g);
      h.set(g, w);
    }
    i = f;
    o = g;
    s = w;
    return w;
  };
  const c = (f, g, h) => {
    let w = n.get(f);
    if (w == null) {
      w = new Map();
      n.set(f, w);
    }
    let b = w.get(h);
    if (b == null) {
      b = new Set();
      w.set(h, b);
    }
    b.add(g);
  };
  const l = (f, g, h) => {
    const w = f >> 4;
    const b = g >> 4;
    const x = a(w, b);
    const C = (f & 15) * 16 + (g & 15);
    return x[C];
  };
  return {
    setBlock: c,
    hasBlock: (f, g, h) => {
      const w = l(f, h);
      if (g <= w) {
        return true;
      } else {
        return n.get(f)?.get(h)?.has(g) ?? false;
      }
    },
    getHeight: l,
    resetBlocks: () => {
      n.clear();
    },
  };
}
function Vu(e, t, n) {
  const [r, i, o] = n;
  e.setBlock(r, i, o);
  $s(e, r, i, o, r, o, t, 0);
}
const ne = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};
const ku = {
  [ne.NORTH]: ne.SOUTH,
  [ne.SOUTH]: ne.NORTH,
  [ne.EAST]: ne.WEST,
  [ne.WEST]: ne.EAST,
};
function yo(e, t, n, r, i) {
  return (
    (i === ne.EAST || !e.hasBlock(t + 1, n, r)) &&
    (i === ne.WEST || !e.hasBlock(t - 1, n, r)) &&
    (i === ne.SOUTH || !e.hasBlock(t, n, r + 1)) &&
    (i === ne.NORTH || !e.hasBlock(t, n, r - 1))
  );
}
function $s(e, t, n, r, i, o, s, a) {
  let l = s.nextInt(4) + 1;
  if (a === 0) {
    l += 1;
  }
  for (let d = 0; d < l; d++) {
    const f = n + d + 1;
    if (!yo(e, t, f, r)) {
      return;
    }
    e.setBlock(t, f, r);
    e.setBlock(t, f - 1, r);
  }
  let u = false;
  if (a < 4) {
    let d = s.nextInt(4);
    if (a === 0) {
      d += 1;
    }
    const f = n + l;
    for (let g = 0; g < d; g++) {
      const h = s.nextInt(4);
      let w = t;
      let b = r;
      if (h === ne.NORTH) {
        b -= 1;
      } else if (h === ne.EAST) {
        w += 1;
      } else if (h === ne.SOUTH) {
        b += 1;
      } else {
        w -= 1;
      }
      if (
        !(w <= i - 8) &&
        !(w >= i + 8) &&
        !(b <= o - 8) &&
        !(b >= o + 8) &&
        !e.hasBlock(w, f, b) &&
        !e.hasBlock(w, f - 1, b) &&
        !!yo(e, w, f, b, ku[h])
      ) {
        u = true;
        e.setBlock(w, f, b);
        if (h === ne.NORTH) {
          e.setBlock(w, f, b + 1);
        } else if (h === ne.EAST) {
          e.setBlock(w - 1, f, b);
        } else if (h === ne.SOUTH) {
          e.setBlock(w, f, b - 1);
        } else {
          e.setBlock(w + 1, f, b);
        }
        $s(e, w, f, b, i, o, s, a + 1);
      }
    }
  }
  if (!u) {
    e.setBlock(t, n + 1, r);
  }
}
const Ou = () => (e, t, n) => {
  const { random: r } = t;
  if (r.nextInt(700) !== 0) {
    return;
  }
  const i = 0;
  const o = e[0] + r.nextInt(16);
  const s = e[2] + r.nextInt(16);
  n([o, i, s]);
};
const Mu = {
  supportsWorld: (e) => W(m.EndGateway, e),
  create: async function (e, t) {
    if (e.edition === _.Java) {
      if (e.javaVersion >= p.V1_18) {
        return Au(e, t.end);
      } else {
        return Ru(e, t.end);
      }
    } else {
      return Fu(e, t.end);
    }
  },
};
function Au(e, t) {
  return async (n) => {
    const r = [];
    ue(n, (i, o) => {
      const s = et(e, i, o, {
        decorationStepOrdinal: 4,
        featureIndex: 0,
        placement: [
          tt({
            chance: 700,
          }),
          _t(),
          Ut({
            provider: t,
            allowedBiomes: [qt],
          }),
        ],
        feature: sn(),
      });
      if (!(s.length < 1)) {
        r.push([
          i,
          o,
          [
            {
              x: s[0][0][0],
              z: s[0][0][2],
            },
          ],
        ]);
      }
    });
    return r;
  };
}
function Ru(e, t) {
  return async (n) => {
    const r = [];
    ue(n, (i, o) => {
      const s = et(e, i, o, {
        decorationStepOrdinal: 4,
        featureIndex: 13,
        decorator:
          e.javaVersion >= p.V1_17
            ? [
                _t(),
                tt({
                  chance: 700,
                }),
              ]
            : [Ou()],
        feature: sn(),
      });
      if (
        !(s.length < 1) &&
        t.getNoiseBiome(i * 4 + 2, 0, o * 4 + 2) === qt.id
      ) {
        r.push([
          i,
          o,
          [
            {
              x: s[0][0][0],
              z: s[0][0][2],
            },
          ],
        ]);
      }
    });
    return r;
  };
}
function Fu(e, t) {
  const n = new Ls(e);
  const r = new re(e.seed);
  const i = e.bedrockVersion >= S.V1_18;
  const o = qt.id;
  const s = async (a) => {
    const c = nr(e);
    const l = Iu(n);
    const u = new Map();
    const d = a.x + a.sizeX;
    const f = a.z + a.sizeZ;
    const g = Ft(a, {
      x0: -1,
      z0: -1,
    });
    const h = g.sizeX;
    const w = t.getBiomeArea(g.x * 4, g.z * 4, h, g.sizeZ, 4);
    let b = 0;
    for (let C = g.z; C < g.z + g.sizeZ; C++) {
      for (let I = g.x; I < g.x + g.sizeX; I++) {
        if (w[b] !== o) {
          b += 1;
          continue;
        }
        b += 1;
        l.resetBlocks();
        const V = c(I, C);
        r.setSeed(V);
        if (i) {
          r.nextInt();
        }
        const O = r.nextInt(5);
        const E = I * 16 + 8;
        const A = C * 16 + 8;
        for (let U = 0; U < O; U++) {
          const J = E + r.nextInt(16);
          const $ = A + r.nextInt(16);
          const G = l.getHeight(J, $) + 1;
          if (!(G <= 0)) {
            Vu(l, r, [J, G, $]);
          }
        }
        if (r.nextInt(700) !== 0) {
          continue;
        }
        const z = E + r.nextInt(16);
        const F = A + r.nextInt(16);
        if (l.getHeight(z, F, true) <= 0) {
          continue;
        }
        const L = z >> 4;
        const R = F >> 4;
        if (L < a.x || L >= d || R < a.z || R >= f) {
          continue;
        }
        let M = u.get(L);
        if (M == null) {
          M = new Map();
          u.set(L, M);
        }
        let P = M.get(R);
        if (P == null) {
          P = [];
          M.set(R, P);
        }
        P.push({
          x: z,
          z: F,
        });
      }
    }
    const x = [];
    for (const [C, I] of u) {
      for (const [V, O] of I) {
        x.push([C, V, O]);
      }
    }
    return x;
  };
  s.free = () => {
    r.free();
    n.free();
  };
  return s;
}
const zu = (e) => (t) => {
  const { x: n = 0, y: r = 0, z: i = 0 } = e;
  return [[t[0] + n, t[1] + r, t[2] + i]];
};
const Lu = {
  supportsWorld: (e) => W(m.AmethystGeode, e),
  create: async (e, t) => (e.edition === _.Java ? Nu(e, t.overworld) : Hu(e)),
};
const Pu = (e) => ([Le.id, Ne.id].includes(e) ? 2 : 0);
function Nu(e, t) {
  return async (n) => {
    const r = Ft(n, {
      x0: -1,
      z0: -1,
    });
    const i = [];
    const o =
      e.javaVersion < p.V1_18
        ? t
            .legacy()
            .getNoiseBiomeArea(
              r.x * 4 + 2,
              r.z * 4 + 2,
              (r.x + r.sizeX) * 4 - 2,
              (r.z + r.sizeZ) * 4 - 2,
            )
        : null;
    ue(r, (s, a) => {
      const c = o?.(s * 4 + 2, a * 4 + 2).id;
      const l = et(e, s, a, {
        decorationStepOrdinal: 2,
        featureIndex: c == null || e.javaVersion >= p.V1_18 ? 2 : Pu(c),
        decorator: [
          An.uniform({
            minInclusive: e.javaVersion >= p.V1_18 ? -58 : 6,
            maxInclusive: e.javaVersion >= p.V1_18 ? 30 : 46,
          }),
          _t(),
          tt({
            chance: e.javaVersion >= p.V1_18 ? 24 : 53,
          }),
        ],
        feature: zu({
          x: 4,
          y: 4,
          z: 4,
        }),
      });
      if (l.length > 0) {
        i.push(l[0][0]);
      }
    });
    return Os(i, n, (s) => [s[0] >> 4, s[2] >> 4]);
  };
}
function Hu(e) {
  const t = new Rn(e, "minecraft:overworld_amethyst_geode_feature");
  const n = e.bedrockVersion >= S.V1_18 ? 24 : 53;
  const r = e.bedrockVersion >= S.V1_18 ? [-58, 30] : [6, 47];
  const i = async (o) => {
    const s = [];
    ue(o, (a, c) => {
      const l = t.getSeedForChunk(a, c);
      const u = new re(l);
      if (u.nextInt(n) < 1) {
        const d = Dr(u, r[0], r[1]);
        s.push([a * 16 + 4, d + 4, c * 16 + 4]);
      }
      u.free();
    });
    return Os(s, o, (a) => [a[0] >> 4, a[2] >> 4]);
  };
  i.free = () => {
    t.free();
  };
  return i;
}
const Du = [
  ["city_center_1", 1, [18, 31, 41]],
  ["city_center_2", 1, [18, 31, 41]],
  ["city_center_3", 1, [18, 31, 41]],
];
const Wu = {
  supportsWorld: (e) => W(m.AncientCity, e),
  create: async (e, t) => {
    const n = t.overworld.noise();
    return q(
      e,
      {
        spacing: 24,
        separation: 8,
        salt: 20083232,
        linearSeparation: e.edition !== _.Bedrock,
      },
      async (r, i) =>
        e.edition === _.Java
          ? !!zt({
              world: e,
              biomeProvider: t.overworld.noise(),
              chunkX: r,
              chunkZ: i,
              initialY: -27,
              projectionY: null,
              allowedBiomes: [ht],
              structures: Du,
              namedStartPos: [13, 20],
            })
          : n.getNoiseBiomeBlock(r * 16, -27, i * 16) === ht.id,
    );
  },
};
const Gu = "minecraft:chest";
const ju = [
  {
    bonus_rolls: 0,
    entries: [
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 3,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:diamond",
        weight: 5,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 5,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:iron_ingot",
        weight: 15,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 7,
              min: 2,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:gold_ingot",
        weight: 15,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 3,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:emerald",
        weight: 15,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 6,
              min: 4,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:bone",
        weight: 25,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 3,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:spider_eye",
        weight: 25,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 7,
              min: 3,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:rotten_flesh",
        weight: 25,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 5,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:leather",
        weight: 20,
      },
      {
        type: "minecraft:item",
        name: "minecraft:copper_horse_armor",
        weight: 15,
      },
      {
        type: "minecraft:item",
        name: "minecraft:iron_horse_armor",
        weight: 15,
      },
      {
        type: "minecraft:item",
        name: "minecraft:golden_horse_armor",
        weight: 10,
      },
      {
        type: "minecraft:item",
        name: "minecraft:diamond_horse_armor",
        weight: 5,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            function: "minecraft:enchant_randomly",
            options: "#minecraft:on_random_loot",
          },
        ],
        name: "minecraft:book",
        weight: 20,
      },
      {
        type: "minecraft:item",
        name: "minecraft:golden_apple",
        weight: 20,
      },
      {
        type: "minecraft:item",
        name: "minecraft:enchanted_golden_apple",
        weight: 2,
      },
      {
        type: "minecraft:empty",
        weight: 15,
      },
    ],
    rolls: {
      type: "minecraft:uniform",
      max: 4,
      min: 2,
    },
  },
  {
    bonus_rolls: 0,
    entries: [
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 8,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:bone",
        weight: 10,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 8,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:gunpowder",
        weight: 10,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 8,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:rotten_flesh",
        weight: 10,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 8,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:string",
        weight: 10,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 8,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:sand",
        weight: 10,
      },
    ],
    rolls: 4,
  },
  {
    bonus_rolls: 0,
    entries: [
      {
        type: "minecraft:empty",
        weight: 6,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: 2,
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:dune_armor_trim_smithing_template",
      },
    ],
    rolls: 1,
  },
];
const Uu = "minecraft:chests/desert_pyramid";
var Zu = {
  type: Gu,
  pools: ju,
  random_sequence: Uu,
};
const Ju = "minecraft:chest";
const Xu = [
  {
    bonus_rolls: 0,
    entries: [
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 3,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:diamond",
        weight: 5,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 5,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:iron_ingot",
        weight: 15,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 7,
              min: 2,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:gold_ingot",
        weight: 15,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 3,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:emerald",
        weight: 15,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 6,
              min: 4,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:bone",
        weight: 25,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 3,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:spider_eye",
        weight: 25,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 7,
              min: 3,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:rotten_flesh",
        weight: 25,
      },
      {
        type: "minecraft:item",
        name: "minecraft:saddle",
        weight: 20,
      },
      {
        type: "minecraft:item",
        name: "minecraft:iron_horse_armor",
        weight: 15,
      },
      {
        type: "minecraft:item",
        name: "minecraft:golden_horse_armor",
        weight: 10,
      },
      {
        type: "minecraft:item",
        name: "minecraft:diamond_horse_armor",
        weight: 5,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            function: "minecraft:enchant_randomly",
          },
        ],
        name: "minecraft:book",
        weight: 20,
      },
      {
        type: "minecraft:item",
        name: "minecraft:golden_apple",
        weight: 20,
      },
      {
        type: "minecraft:item",
        name: "minecraft:enchanted_golden_apple",
        weight: 2,
      },
      {
        type: "minecraft:empty",
        weight: 15,
      },
    ],
    rolls: {
      type: "minecraft:uniform",
      max: 4,
      min: 2,
    },
  },
  {
    bonus_rolls: 0,
    entries: [
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 8,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:bone",
        weight: 10,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 8,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:gunpowder",
        weight: 10,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 8,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:rotten_flesh",
        weight: 10,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 8,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:string",
        weight: 10,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: {
              type: "minecraft:uniform",
              max: 8,
              min: 1,
            },
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:sand",
        weight: 10,
      },
    ],
    rolls: 4,
  },
  {
    bonus_rolls: 0,
    entries: [
      {
        type: "minecraft:empty",
        weight: 6,
      },
      {
        type: "minecraft:item",
        functions: [
          {
            add: false,
            count: 2,
            function: "minecraft:set_count",
          },
        ],
        name: "minecraft:dune_armor_trim_smithing_template",
      },
    ],
    rolls: 1,
  },
];
var $u = {
  type: Ju,
  pools: Xu,
};
const Qu = [
  {
    rolls: {
      min: 2,
      max: 4,
    },
    entries: [
      {
        type: "item",
        name: "minecraft:diamond",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 3,
            },
          },
        ],
        weight: 5,
      },
      {
        type: "item",
        name: "minecraft:iron_ingot",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 5,
            },
          },
        ],
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:gold_ingot",
        functions: [
          {
            function: "set_count",
            count: {
              min: 2,
              max: 7,
            },
          },
        ],
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:emerald",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 3,
            },
          },
        ],
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:bone",
        functions: [
          {
            function: "set_count",
            count: {
              min: 4,
              max: 6,
            },
          },
        ],
        weight: 25,
      },
      {
        type: "item",
        name: "minecraft:spider_eye",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 3,
            },
          },
        ],
        weight: 25,
      },
      {
        type: "item",
        name: "minecraft:rotten_flesh",
        functions: [
          {
            function: "set_count",
            count: {
              min: 3,
              max: 7,
            },
          },
        ],
        weight: 25,
      },
      {
        type: "item",
        name: "minecraft:leather",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 5,
            },
            add: false,
          },
        ],
        weight: 20,
      },
      {
        type: "item",
        name: "minecraft:horsearmoriron",
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:horsearmorgold",
        weight: 10,
      },
      {
        type: "item",
        name: "minecraft:horsearmordiamond",
        weight: 5,
      },
      {
        type: "item",
        name: "minecraft:book",
        weight: 20,
        functions: [
          {
            function: "enchant_randomly",
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:golden_apple",
        weight: 20,
      },
      {
        type: "item",
        name: "minecraft:appleEnchanted",
        weight: 2,
      },
      {
        type: "empty",
        weight: 15,
      },
    ],
  },
  {
    rolls: 4,
    entries: [
      {
        type: "item",
        name: "minecraft:bone",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:gunpowder",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:rotten_flesh",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:string",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:sand",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
    ],
  },
  {
    rolls: 1,
    entries: [
      {
        type: "empty",
        weight: 6,
      },
      {
        type: "item",
        name: "minecraft:dune_armor_trim_smithing_template",
        weight: 1,
        functions: [
          {
            function: "set_count",
            count: 2,
          },
        ],
      },
    ],
  },
];
var Ku = {
  pools: Qu,
};
const qu = [
  {
    rolls: {
      min: 2,
      max: 4,
    },
    entries: [
      {
        type: "item",
        name: "minecraft:diamond",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 3,
            },
          },
        ],
        weight: 5,
      },
      {
        type: "item",
        name: "minecraft:iron_ingot",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 5,
            },
          },
        ],
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:gold_ingot",
        functions: [
          {
            function: "set_count",
            count: {
              min: 2,
              max: 7,
            },
          },
        ],
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:emerald",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 3,
            },
          },
        ],
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:bone",
        functions: [
          {
            function: "set_count",
            count: {
              min: 4,
              max: 6,
            },
          },
        ],
        weight: 25,
      },
      {
        type: "item",
        name: "minecraft:spider_eye",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 3,
            },
          },
        ],
        weight: 25,
      },
      {
        type: "item",
        name: "minecraft:rotten_flesh",
        functions: [
          {
            function: "set_count",
            count: {
              min: 3,
              max: 7,
            },
          },
        ],
        weight: 25,
      },
      {
        type: "item",
        name: "minecraft:saddle",
        weight: 20,
      },
      {
        type: "item",
        name: "minecraft:horsearmoriron",
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:horsearmorgold",
        weight: 10,
      },
      {
        type: "item",
        name: "minecraft:horsearmordiamond",
        weight: 5,
      },
      {
        type: "item",
        name: "minecraft:book",
        weight: 20,
        functions: [
          {
            function: "enchant_randomly",
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:golden_apple",
        weight: 20,
      },
      {
        type: "item",
        name: "minecraft:appleEnchanted",
        weight: 2,
      },
      {
        type: "empty",
        weight: 15,
      },
    ],
  },
  {
    rolls: 4,
    entries: [
      {
        type: "item",
        name: "minecraft:bone",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:gunpowder",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:rotten_flesh",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:string",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:sand",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
    ],
  },
];
var Yu = {
  pools: qu,
};
const ef = [
  {
    rolls: {
      min: 2,
      max: 4,
    },
    entries: [
      {
        type: "item",
        name: "minecraft:diamond",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 3,
            },
          },
        ],
        weight: 5,
      },
      {
        type: "item",
        name: "minecraft:iron_ingot",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 5,
            },
          },
        ],
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:gold_ingot",
        functions: [
          {
            function: "set_count",
            count: {
              min: 2,
              max: 7,
            },
          },
        ],
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:emerald",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 3,
            },
          },
        ],
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:bone",
        functions: [
          {
            function: "set_count",
            count: {
              min: 4,
              max: 6,
            },
          },
        ],
        weight: 25,
      },
      {
        type: "item",
        name: "minecraft:spider_eye",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 3,
            },
          },
        ],
        weight: 25,
      },
      {
        type: "item",
        name: "minecraft:rotten_flesh",
        functions: [
          {
            function: "set_count",
            count: {
              min: 3,
              max: 7,
            },
          },
        ],
        weight: 25,
      },
      {
        type: "item",
        name: "minecraft:leather",
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 5,
            },
            add: false,
          },
        ],
        weight: 20,
      },
      {
        type: "item",
        name: "minecraft:horsearmoriron",
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:copper_horse_armor",
        weight: 15,
      },
      {
        type: "item",
        name: "minecraft:horsearmorgold",
        weight: 10,
      },
      {
        type: "item",
        name: "minecraft:horsearmordiamond",
        weight: 5,
      },
      {
        type: "item",
        name: "minecraft:book",
        weight: 20,
        functions: [
          {
            function: "enchant_randomly",
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:golden_apple",
        weight: 20,
      },
      {
        type: "item",
        name: "minecraft:appleEnchanted",
        weight: 2,
      },
      {
        type: "empty",
        weight: 15,
      },
    ],
  },
  {
    rolls: 4,
    entries: [
      {
        type: "item",
        name: "minecraft:bone",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:gunpowder",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:rotten_flesh",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:string",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
      {
        type: "item",
        name: "minecraft:sand",
        weight: 10,
        functions: [
          {
            function: "set_count",
            count: {
              min: 1,
              max: 8,
            },
          },
        ],
      },
    ],
  },
  {
    rolls: 1,
    entries: [
      {
        type: "empty",
        weight: 6,
      },
      {
        type: "item",
        name: "minecraft:dune_armor_trim_smithing_template",
        weight: 1,
        functions: [
          {
            function: "set_count",
            count: 2,
          },
        ],
      },
    ],
  },
];
var tf = {
  pools: ef,
};
const Wr = (e, t) => {
  if (Array.isArray(e)) {
    for (let n = 0; n < e.length; n++) {
      if (typeof e[n] == "string") {
        e[n] = t(e[n]);
      } else {
        Wr(e[n], t);
      }
    }
  }
  if (typeof e == "object" && e !== null) {
    const n = e;
    for (const [r, i] of Object.entries(e)) {
      if (typeof i == "string") {
        n[r] = t(i);
      } else {
        Wr(n[r], t);
      }
    }
  }
};
const nf = (e, t) => {
  if (e.edition === _.Java && e.javaVersion >= p.V1_21_9) {
    return Zu;
  }
  if (e.edition === _.Java && e.javaVersion >= p.V1_18) {
    return $u;
  }
  if (e.edition === _.Bedrock && e.bedrockVersion >= S.V1_21_110) {
    return tf;
  }
  if (e.edition === _.Bedrock && e.bedrockVersion >= S.V1_21_90) {
    return Ku;
  }
  if (e.edition === _.Bedrock && e.bedrockVersion >= S.V1_18) {
    return Yu;
  }
  throw new Error(`Loot table ${t} not found`);
};
const rf = (e, t) => {
  const n = nf(e, t);
  Wr(n, (r) => (r.startsWith("minecraft:") ? r.slice(10) : r));
  return n;
};
const of = [
  {
    name: "protection",
    category: "ARMOR",
    minLevel: 1,
    maxLevel: 4,
  },
  {
    name: "fire_protection",
    category: "ARMOR",
    minLevel: 1,
    maxLevel: 4,
  },
  {
    name: "feather_falling",
    category: "ARMOR_FEET",
    minLevel: 1,
    maxLevel: 4,
  },
  {
    name: "blast_protection",
    category: "ARMOR",
    minLevel: 1,
    maxLevel: 4,
  },
  {
    name: "projectile_protection",
    category: "ARMOR",
    minLevel: 1,
    maxLevel: 4,
  },
  {
    name: "respiration",
    category: "ARMOR_HEAD",
    minLevel: 1,
    maxLevel: 3,
  },
  {
    name: "aqua_affinity",
    category: "ARMOR_HEAD",
    minLevel: 1,
    maxLevel: 1,
  },
  {
    name: "thorns",
    category: "ARMOR_CHEST",
    minLevel: 1,
    maxLevel: 3,
  },
  {
    name: "depth_strider",
    category: "ARMOR_FEET",
    minLevel: 1,
    maxLevel: 3,
  },
  {
    name: "frost_walker",
    category: "ARMOR_FEET",
    minLevel: 1,
    maxLevel: 2,
  },
  {
    name: "binding_curse",
    category: "WEARABLE",
    minLevel: 1,
    maxLevel: 1,
  },
  {
    name: "sharpness",
    category: "WEAPON",
    minLevel: 1,
    maxLevel: 5,
  },
  {
    name: "smite",
    category: "WEAPON",
    minLevel: 1,
    maxLevel: 5,
  },
  {
    name: "bane_of_arthropods",
    category: "WEAPON",
    minLevel: 1,
    maxLevel: 5,
  },
  {
    name: "knockback",
    category: "WEAPON",
    minLevel: 1,
    maxLevel: 2,
  },
  {
    name: "fire_aspect",
    category: "WEAPON",
    minLevel: 1,
    maxLevel: 2,
  },
  {
    name: "looting",
    category: "WEAPON",
    minLevel: 1,
    maxLevel: 3,
  },
  {
    name: "sweeping",
    category: "WEAPON",
    minLevel: 1,
    maxLevel: 3,
  },
  {
    name: "efficiency",
    category: "DIGGER",
    minLevel: 1,
    maxLevel: 5,
  },
  {
    name: "silk_touch",
    category: "DIGGER",
    minLevel: 1,
    maxLevel: 1,
  },
  {
    name: "unbreaking",
    category: "BREAKABLE",
    minLevel: 1,
    maxLevel: 3,
  },
  {
    name: "fortune",
    category: "DIGGER",
    minLevel: 1,
    maxLevel: 3,
  },
  {
    name: "power",
    category: "BOW",
    minLevel: 1,
    maxLevel: 5,
  },
  {
    name: "punch",
    category: "BOW",
    minLevel: 1,
    maxLevel: 2,
  },
  {
    name: "flame",
    category: "BOW",
    minLevel: 1,
    maxLevel: 1,
  },
  {
    name: "infinity",
    category: "BOW",
    minLevel: 1,
    maxLevel: 1,
  },
  {
    name: "luck_of_the_sea",
    category: "FISHING_ROD",
    minLevel: 1,
    maxLevel: 3,
  },
  {
    name: "lure",
    category: "FISHING_ROD",
    minLevel: 1,
    maxLevel: 3,
  },
  {
    name: "loyalty",
    category: "TRIDENT",
    minLevel: 1,
    maxLevel: 3,
  },
  {
    name: "impaling",
    category: "TRIDENT",
    minLevel: 1,
    maxLevel: 5,
  },
  {
    name: "riptide",
    category: "TRIDENT",
    minLevel: 1,
    maxLevel: 3,
  },
  {
    name: "channeling",
    category: "TRIDENT",
    minLevel: 1,
    maxLevel: 1,
  },
  {
    name: "multishot",
    category: "CROSSBOW",
    minLevel: 1,
    maxLevel: 1,
  },
  {
    name: "quick_charge",
    category: "CROSSBOW",
    minLevel: 1,
    maxLevel: 3,
  },
  {
    name: "piercing",
    category: "CROSSBOW",
    minLevel: 1,
    maxLevel: 4,
  },
  {
    name: "mending",
    category: "BREAKABLE",
    minLevel: 1,
    maxLevel: 1,
  },
  {
    name: "vanishing_curse",
    category: "VANISHABLE",
    minLevel: 1,
    maxLevel: 1,
  },
];
const sf = {
  golden_sword: [11, 12, 13, 14, 15, 16, 17, 20, 35, 36],
  golden_axe: [11, 12, 13, 18, 19, 20, 21, 35, 36],
  golden_hoe: [18, 19, 20, 21, 35, 36],
  golden_shovel: [18, 19, 20, 21, 35, 36],
  golden_pickaxe: [18, 19, 20, 21, 35, 36],
  golden_boots: [0, 1, 2, 3, 4, 7, 8, 9, 10, 20, 35, 36],
  golden_chestplate: [0, 1, 3, 4, 7, 10, 20, 35, 36],
  golden_helmet: [0, 1, 3, 4, 5, 6, 7, 10, 20, 35, 36],
  golden_leggings: [0, 1, 3, 4, 7, 10, 20, 35, 36],
};
const af = (e) => of;
const cf = (e, t) => {
  const n = af();
  if (t === "book") {
    return n;
  }
  const r = sf[t];
  if (!r) {
    throw new Error("Enchantments for " + t + " unknown");
  }
  return r.map((i) => n[i]);
};
function lf({ world: e, lootTableKey: t, randomSeed: n }) {
  const r = rf(e, t);
  const i = e.edition === _.Java ? new be(n) : new re(n);
  const o = [];
  try {
    for (const s of r.pools) {
      const a = s.entries.reduce((l, u) => l + (u.weight ?? 1), 0);
      if (a <= 0 || s.entries.length < 1) {
        continue;
      }
      let c = null;
      if (e.edition === _.Bedrock) {
        i.nextFloat();
      }
      if (typeof s.rolls == "number") {
        if (e.edition === _.Bedrock) {
          i.nextInt();
        }
        c = s.rolls;
      } else {
        c = Gr(s.rolls.min, s.rolls.max, i);
      }
      for (let l = 0; l < c; l++) {
        if (e.edition === _.Java && s.entries.length === 1) {
          if (s.entries[0].type === "item") {
            o.push(wo(s.entries[0], i, e));
          }
        } else {
          let u = i.nextInt(a);
          for (const d of s.entries) {
            u -= d.weight ?? 1;
            if (u < 0) {
              if (d.type === "item") {
                o.push(wo(d, i, e));
              }
              break;
            }
          }
        }
      }
    }
  } finally {
    i.free();
  }
  return o;
}
function wo(e, t, n) {
  return (e.functions || []).reduce((r, i) => uf(r, i, t, n), {
    name: e.name,
    count: 1,
  });
}
function uf(e, t, n, r) {
  if (t.function === "set_data") {
    return e;
  }
  if (t.function === "set_count") {
    if (r.edition === _.Bedrock && t.count.min === t.count.max) {
      n.nextInt(1);
    }
    return {
      ...e,
      count: Gr(t.count.min, t.count.max, n),
    };
  }
  if (t.function === "enchant_randomly") {
    if (r.edition === _.Bedrock) {
      n.nextInt();
      return {
        ...e,
        enchantment: "unknown",
      };
    }
    const i = cf(r, e.name);
    const { name: o, minLevel: s, maxLevel: a } = i[n.nextInt(i.length)];
    const c = Gr(s, a, n);
    return {
      name: e.name === "book" ? "enchanted_book" : e.name,
      count: 1,
      enchantment: {
        name: o,
        level: c,
      },
    };
  }
  throw new Error(`Function ${t.function} not implemented`);
}
function Gr(e, t, n) {
  const r = Math.floor(e);
  const i = Math.floor(t);
  if (r >= i) {
    return r;
  } else {
    return n.nextInt(i - r + 1) + r;
  }
}
const ff = (e) => e.reduce((t, n) => t.concat(n), []);
const df = {
  enchanted_golden_apple: ["enchanted_golden_apple", "appleEnchanted"],
};
const gf = {
  supportsWorld: (e) => W(m.ItemOverworld, e),
  create: async (e, t, n) => {
    const r = await Hs.create(e, t, n);
    const i = mf(e);
    return async (o) => {
      const s = await r(o);
      const a = [];
      for (const c of s) {
        const l = i(c);
        if (
          ff(
            l.map((f) =>
              lf({
                world: e,
                lootTableKey: "desert_pyramid",
                randomSeed: f,
              }),
            ),
          ).find((f) => df.enchanted_golden_apple.includes(f.name))
        ) {
          a.push([
            ...c,
            [
              {
                item: "enchanted_golden_apple",
              },
            ],
          ]);
        }
      }
      return a;
    };
  },
};
const mf = (e) => {
  if (e.edition === _.Bedrock) {
    const t = nr(e);
    return (n) => {
      const r = new re(t(n[0], n[1]));
      r.nextInt();
      const i = [
        k.fromInt(r.nextInt()),
        k.fromInt(r.nextInt()),
        k.fromInt(r.nextInt()),
        k.fromInt(r.nextInt()),
      ];
      r.free();
      return i;
    };
  } else {
    return (t) => {
      const n = vs(e, t[0] * 16, t[1] * 16);
      const r = Xs(e, n, e.javaVersion >= p.V1_19_3 ? 1 : 3, 4);
      r.nextInt(3);
      const i = [r.nextLong(), r.nextLong(), r.nextLong(), r.nextLong()];
      r.free();
      return i;
    };
  }
};
const hf = {
  supportsWorld: (e) => W(m.OreVein, e),
  async create(e, t) {
    const n = new xc(e);
    const r = t.overworld.noise();
    const i = async (o) => {
      const s = n.find(o, r);
      return Ue(s, (a) => [a.reference[0] >> 4, a.reference[2] >> 4]);
    };
    i.free = () => n.free();
    return i;
  },
};
class pf {
  rustFinder;
  constructor(t) {
    this.rustFinder = new Tr(we(t));
  }
  find(t, n) {
    return this.rustFinder.a(t.provider, n.x, n.z, n.sizeX, n.sizeZ);
  }
  free() {
    this.rustFinder.free();
  }
}
const _f = {
  supportsWorld: (e) => W(m.Cave, e),
  async create(e, t) {
    const n = new pf(e);
    const r = t.overworld.noise();
    const i = async (o) => {
      const s = n.find(r, o);
      return Ue(s, (a) => [a.reference.pos[0] >> 4, a.reference.pos[2] >> 4]);
    };
    i.free = () => n.free();
    return i;
  },
};
const yf =
  ({ provider: e, heightType: t }) =>
  (n, r, i) => {
    i([n[0], e.getSurfaceBlock(n[0], n[2], t, "topmostAccurate"), n[2]]);
  };
const wf = {
  supportsWorld: (e) => W(m.DesertWell, e),
  create: async function (e, t) {
    if (e.edition === _.Java) {
      return bf(e, t.overworld.noise());
    } else {
      return vf(e, t.overworld);
    }
  },
};
function Qs(e, t) {
  const n = t[0];
  let r = t[1] + 1;
  const i = t[2];
  let o = null;
  while ((o = e.getNoiseBlock(n, r, i, false)) === Gt.Air) {
    r -= 1;
  }
  if (!Bc(o)) {
    return null;
  }
  for (let s = -2; s <= 2; s++) {
    for (let a = -2; a <= 2; a++) {
      if (
        e.getNoiseBlock(n + s, r - 1, i + a, false) === Gt.Air &&
        e.getNoiseBlock(n + s, r - 2, i + a, false) === Gt.Air
      ) {
        return null;
      }
    }
  }
  return r;
}
function bf(e, t) {
  return async (n) => {
    const r = [];
    ue(n, (i, o) => {
      const s = et(e, i, o, {
        decorationStepOrdinal: 4,
        featureIndex: 2,
        placement: [
          tt({
            chance: 1000,
          }),
          _t(),
          yf({
            provider: t,
            heightType: "oceanFloor",
          }),
          Ut({
            provider: t,
            allowedBiomes: [Y],
          }),
        ],
        feature: sn(),
      });
      if (s.length < 1) {
        return;
      }
      const a = Qs(t, s[0][0]);
      if (a == null) {
        return;
      }
      const c = [s[0][0][0], a, s[0][0][2]];
      r.push([i, o, c]);
    });
    return r;
  };
}
function vf(e, t) {
  const n = t.noise();
  const r = new Rn(e, "minecraft:desert_after_surface_desert_well_feature");
  const i = (s, a, c) => rr(n, s, a, c) === Y;
  const o = async (s) => {
    const a = [];
    ue(s, (c, l) => {
      if (!i(c * 16 + 8, 128, l * 16 + 8)) {
        return;
      }
      const u = r.getSeedForChunk(c, l);
      const d = new re(u);
      if (d.nextInt(500) >= 1) {
        d.free();
        return;
      }
      const f = l * 16 + Dr(d, 0, 16);
      const g = c * 16 + Dr(d, 0, 16);
      d.free();
      if (!i(g, 128, f)) {
        return;
      }
      const h = n.getSurfaceBlock(g, f, "oceanFloor", "topmostAccurate");
      const w = Qs(n, [g, h, f]);
      if (w != null) {
        a.push([c, l, [g, w, f]]);
      }
    });
    return a;
  };
  o.free = () => {
    r.free();
  };
  return o;
}
const Sf = [
  ["tower_1", 1, [5, 13, 5]],
  ["tower_2", 1, [5, 13, 5]],
  ["tower_3", 1, [7, 13, 7]],
  ["tower_4", 1, [7, 13, 7]],
  ["tower_5", 1, [7, 13, 7]],
];
const bo = [pe, Ae, kt, nn, $n, wt];
const xf = {
  supportsWorld: (e) => W(m.TrailRuin, e),
  create: async (e, t) => {
    const n = t.overworld.noise();
    const r = e.edition === _.Bedrock && e.bedrockVersion >= S.V1_20_60;
    return q(
      e,
      {
        spacing: 34,
        separation: 8,
        salt: 83469867,
        linearSeparation: e.edition === _.Java || r,
        forceRngType: r ? "java" : undefined,
      },
      async (i, o) => {
        if (e.edition === _.Java || r) {
          const c = zt({
            world: e,
            biomeProvider: t.overworld.noise(),
            chunkX: i,
            chunkZ: o,
            initialY: -15,
            projectionY: {
              heightType: "worldSurface",
              surfaceCheckType: "topmostAccurate",
            },
            allowedBiomes: bo,
            structures: Sf,
          });
          if (c) {
            return [c.x, c.y + 10, c.z];
          } else {
            return false;
          }
        }
        const s = n.getPreliminarySurfaceLevel(i * 4, o * 4);
        const a = je(n.getNoiseBiomeBlock(i * 16, s - 20, o * 16));
        if (bo.includes(a)) {
          return [i * 16 + 8, null, o * 16 + 8];
        } else {
          return false;
        }
      },
      (i, o, s, a) => a,
      {
        x0: 0,
        z0: 0,
        x1: 1,
        z1: 1,
      },
      (i) => [i[0] >> 4, i[2] >> 4],
      true,
    );
  },
};
const Cf = (e, t) => e !== ht && (t.edition === _.Java || e !== tr);
const Tf = [
  ["end_1", 1, [19, 20, 19]],
  ["end_2", 1, [19, 20, 19]],
];
const Bf = {
  supportsWorld: (e) => W(m.TrialChamber, e),
  async create(e, t) {
    return q(
      e,
      {
        spacing: 34,
        separation: 12,
        linearSeparation: true,
        salt: 94251327,
        forceRngType: "java",
      },
      async (n, r) =>
        zt({
          world: e,
          biomeProvider: t.overworld.noise(),
          chunkX: n,
          chunkZ: r,
          initialY: ({ rng: i }) => ir(i, -40, -20),
          projectionY: null,
          allowedBiomes: (i) => Cf(i, e),
          structures: Tf,
        }),
      (n, r, i, o) => [o.x, o.y, o.z],
      {
        x0: 0,
        z0: 0,
        x1: 1,
        z1: 1,
      },
      (n) => [n[0] >> 4, n[2] >> 4],
      true,
    );
  },
};
class Ef {
  rustFinder;
  constructor(t) {
    this.rustFinder = new Vr(we(t));
  }
  find(t, n) {
    return this.rustFinder.a(t.provider, n.x, n.z, n.sizeX, n.sizeZ);
  }
  free() {
    this.rustFinder.free();
  }
}
class If {
  helper;
  constructor(t) {
    this.helper = new kr(we(t));
  }
  findPositionsBedrock(t, n, r, i, o) {
    return this.helper.b(t.provider, n, r, i, o);
  }
  testFeaturePositionsJava(t, n) {
    return this.helper.a(t.provider, n);
  }
  free() {
    this.helper.free();
  }
}
const Vf = {
  supportsWorld: (e) => W(m.LavaPool, e),
  create: async (e, t) => {
    const n = new Ef(e);
    const r = new If(e);
    const i = t.overworld.noise();
    const o = async (s) => {
      const a = n.find(i, s);
      const c =
        e.edition === _.Bedrock ? await kf(e, s, r, i) : await Of(e, s, r, i);
      const l = [
        ...a.map((u) => ({
          type: "cave",
          pos: u.reference.pos,
          count: u.count,
        })),
        ...c.map((u) => ({
          type: "undergroundLake",
          pos: u,
        })),
      ];
      return Ue(l, (u) => [u.pos[0] >> 4, u.pos[2] >> 4]).filter((u) =>
        Ye(s, {
          x: u[0],
          z: u[1],
        }),
      );
    };
    o.free = () => {
      n.free();
      r.free();
    };
    return o;
  },
};
async function kf(e, t, n, r) {
  const i = Ft(t, {
    x1: 1,
    z1: 1,
  });
  return (
    await ui(async (s) => {
      const a = n.findPositionsBedrock(r, s.x, s.z, s.sizeX, s.sizeZ);
      return Ue(a, (c) => [c[0] >> 4, c[2] >> 4]);
    }, 20)(i)
  ).reduce((s, a) => {
    s.push(...a[2]);
    return s;
  }, []);
}
async function Of(e, t, n, r) {
  const i = Ft(t, {
    x0: -1,
    z0: -1,
  });
  return (
    await ui(async (s) => {
      const a = [];
      ue(s, (l, u) => {
        const d = et(e, l, u, {
          decorationStepOrdinal: 1,
          featureIndex: 0,
          placement: [
            tt({
              chance: 9,
            }),
            _t(),
            An.uniform({
              minInclusive: 0,
              maxInclusive: 319,
            }),
            Ut({
              provider: r,
              disallowedBiomes: [ht],
            }),
          ],
          feature: sn(),
        }).flat();
        a.push(...d);
      });
      if (a.length < 1) {
        return [];
      }
      const c = n.testFeaturePositionsJava(r, a);
      return Ue(c, (l) => [l[0] >> 4, l[2] >> 4]);
    }, 20)(i)
  ).reduce((s, a) => {
    s.push(...a[2]);
    return s;
  }, []);
}
const Mf = {
  supportsWorld: (e) => W(m.AbandonedCamp, e),
  async create(e, t) {
    const n = t.overworld.noise();
    const r = Tc(e, n);
    const i = async (o) => r(o).map((s) => [s.x >> 4, s.z >> 4, s]);
    i.free = r.free;
    return i;
  },
};
const jr = {
  [m.BuriedTreasure]: Yc,
  [m.Dungeon]: al,
  [m.NetherFortress]: hl,
  [m.BastionRemnant]: $c,
  [m.EndCity]: ll,
  [m.SlimeChunk]: Il,
  [m.Stronghold]: Dl,
  [m.Village]: di,
  [m.Mineshaft]: zs,
  [m.WoodlandMansion]: Yl,
  [m.PillagerOutpost]: nu,
  [m.OceanRuin]: au,
  [m.OceanMonument]: fi,
  [m.Shipwreck]: Tl,
  [m.DesertTemple]: Hs,
  [m.JungleTemple]: Sl,
  [m.WitchHut]: xl,
  [m.Igloo]: Cl,
  [m.RuinedPortalOverworld]: yl,
  [m.RuinedPortalNether]: wl,
  [m.Spawn]: uu,
  [m.Fossil]: hu,
  [m.FossilNether]: bu,
  [m.Ravine]: xu,
  [m.EndGateway]: Mu,
  [m.AmethystGeode]: Lu,
  [m.AncientCity]: Wu,
  [m.ItemOverworld]: gf,
  [m.OreVein]: hf,
  [m.Cave]: _f,
  [m.DesertWell]: wf,
  [m.TrailRuin]: xf,
  [m.TrialChamber]: Bf,
  [m.LavaPool]: Vf,
  [m.AbandonedCamp]: Mf,
};
const Ks = (e, t) => jr[e].finiteGenerationArea?.(t) ?? null;
const Af = (e, t, n) => {
  let r = "idle";
  const i = {};
  const o = async (s, a) => {
    if (r !== "idle") {
      throw new Error(`illegal state for finding pois: ${r}`);
    }
    r = "running";
    try {
      const c = await Promise.all(
        a.map(async (l) => {
          if (!i[l]) {
            if (!jr[l].supportsWorld(e)) {
              return [l, []];
            }
            i[l] = await jr[l].create(e, t, n);
          }
          return [l, await i[l](s)];
        }),
      );
      return Object.fromEntries(c);
    } finally {
      r = "idle";
    }
  };
  o.free = () => {
    if (r !== "idle") {
      throw new Error(`illegal state freeing pois: ${r}`);
    }
    Object.values(i).forEach((s) => {
      if (s.free) {
        s.free();
      }
    });
    r = "freed";
  };
  return o;
};
let Ur;
function Rf(e) {
  Ur = e;
}
const Lt = Dc(
  (e) => {
    const t = {};
    const n = {
      get [y.Overworld]() {
        return (t[y.Overworld] ??= Mc(e));
      },
      get [y.Nether]() {
        return (t[y.Nether] ??= Ac(e));
      },
      get [y.End]() {
        return (t[y.End] ??= new oi(e));
      },
    };
    const r = Af(e, n, {
      sharedTask: async (o, s) => {
        const a = Lr(e);
        if (Ur) {
          return await Ur(a + "--" + o, Qo(s));
        } else {
          return await s();
        }
      },
    });
    return {
      providers: n,
      poiFinder: r,
      freeBuiltProviders: () => {
        t[y.Overworld]?.free();
        t[y.Nether]?.free();
        t[y.End]?.free();
      },
    };
  },
  ({ freeBuiltProviders: e, poiFinder: t }) => {
    e();
    t.free();
  },
  Lr,
);
const qs = 1e-9;
function Ys(e, t, n) {
  const r = e[0] - t[0];
  const i = e[2] - t[2];
  const o = n && e[1] != null && t[1] != null ? e[1] - t[1] : 0;
  return r * r + o * o + i * i;
}
function mi(e) {
  return Math.max(1, Math.abs(e)) * qs;
}
function D(e, t) {
  return Math.floor(e / t);
}
function Fn(e, t) {
  return e - D(e, t) * t;
}
function Ff(e, t, n, r) {
  const i = n[0] - t[0];
  const o = n[2] - t[2];
  const s = i * i + o * o;
  if (s === 0 || s > r * 4) {
    return;
  }
  const a = (t[0] + n[0]) / 2;
  const c = (t[2] + n[2]) / 2;
  const l = r - s / 4;
  if (l <= 0) {
    e.push([a, null, c]);
    return;
  }
  const u = Math.sqrt(l / s);
  const d = -o * u;
  const f = i * u;
  e.push([a + d, null, c + f], [a - d, null, c - f]);
}
function zf(e, t, n, r, i) {
  const o = t[1];
  const s = n[0] - t[0];
  const a = n[1] - o;
  const c = n[2] - t[2];
  const l = r[0] - t[0];
  const u = r[1] - o;
  const d = r[2] - t[2];
  const f = s * s + a * a + c * c;
  const g = l * l + u * u + d * d;
  const h = s * l + a * u + c * d;
  const w = f * g - h * h;
  if (w < 1e-9) {
    return;
  }
  const b = ((f / 2) * g - (g / 2) * h) / w;
  const x = (f * (g / 2) - h * (f / 2)) / w;
  const C = t[0] + b * s + x * l;
  const I = o + b * a + x * u;
  const V = t[2] + b * c + x * d;
  const O =
    (C - t[0]) * (C - t[0]) + (I - o) * (I - o) + (V - t[2]) * (V - t[2]);
  const E = i - O;
  if (E < 0) {
    return;
  }
  if (E === 0) {
    e.push([C, I, V]);
    return;
  }
  const A = a * d - c * u;
  const z = c * l - s * d;
  const F = s * u - a * l;
  const L = Math.sqrt(E / w);
  e.push([C + A * L, I + z * L, V + F * L], [C - A * L, I - z * L, V - F * L]);
}
const vo = "depth0";
const Lf = "oceanFloor";
const Pf = "enhancedNoCaves";
const hi = 62;
async function Nf(e, t, n, r, i, o, s, a) {
  const c = Rt(e);
  const { providers: l } = Lt(c);
  const { biomes: u, heights: d } = Me(
    l,
    t,
    n,
    r,
    i,
    o,
    s,
    a.mode === "biomes"
      ? {
          mode: "biomes",
          getBiomesAt: a.getBiomesAt ?? vo,
        }
      : {
          mode: "biomesAndHeights",
          getBiomesAt: a.getBiomesAt ?? vo,
          getHeightLevelAt: a.getHeightLevelAt ?? Lf,
          surfaceCheckType: a.surfaceCheckType ?? Pf,
        },
  );
  const f =
    d && a.mode === "biomesAndHeights" && a.enableTerrainShading
      ? Df(d, i, o, s)
      : null;
  const g = new Uint8Array(i * o * 4);
  const h = new Uint8Array(i * o * 3);
  const w = a.biomeFilter ?? false;
  for (let b = 0; b < u.length; b++) {
    const x = u[b];
    const C = d?.[b];
    const I = Gf({
      biome: x,
      height: C,
      shadingData: f?.[b],
      biomeFilter: w,
    });
    g.set(I, b * 4);
    h[b * 3] = x;
    if (C != null) {
      let V = Math.max(-16384, Math.min(16383, C));
      if (V < 0) {
        V += 32768;
      }
      V |= 32768;
      h[b * 3 + 1] = V & 255;
      h[b * 3 + 2] = (V >> 8) & 255;
    }
  }
  return $o(
    {
      rgba: g,
      data: h,
    },
    [g.buffer, h.buffer],
  );
}
function Me(e, t, n, r, i, o, s, a) {
  if (t === y.End) {
    if (a.mode === "heights") {
      throw new Error("End does not support heights mode");
    }
    return Hf(e, n, r, i, o, s);
  }
  const c = e[t];
  if (c instanceof qe) {
    if (a.mode === "heights") {
      return {
        biomes: new Uint8Array(i * o),
        heights: c.getSurfaceArea(
          n,
          r,
          i,
          o,
          s,
          a.getHeightLevelAt,
          a.surfaceCheckType,
        ),
      };
    } else if (a.mode === "biomes") {
      if (typeof a.getBiomesAt == "number") {
        return {
          biomes: c.getNoiseBiomeArea(n, a.getBiomesAt >> 2, r, i, 1, o, s),
          heights: null,
        };
      } else {
        return {
          biomes: c.getNoiseBiomeAreaAtHeightType(n, r, i, o, s, a.getBiomesAt),
          heights: null,
        };
      }
    } else {
      return c.getNoiseBiomeAreaAtHeightTypeWithSurface(
        n,
        r,
        i,
        o,
        s,
        a.getBiomesAt,
        a.getHeightLevelAt,
        a.surfaceCheckType,
      );
    }
  }
  if (c instanceof si) {
    if (a.mode === "heights") {
      throw new Error("Legacy provider does not support heights mode");
    }
    const l = new Uint8Array(i * o);
    const u = c.getInts(n, r, i * s, o * s);
    for (let d = 0; d < o; d++) {
      for (let f = 0; f < i; f++) {
        const g = d * i + f;
        const h = Math.floor((d + 0.5) * s) * i * s + Math.floor((f + 0.5) * s);
        l[g] = u[h];
      }
    }
    return {
      biomes: l,
      heights: null,
    };
  }
  if (c instanceof xs) {
    if (a.mode === "heights") {
      throw new Error("Single biome provider does not support heights mode");
    }
    const l = new Uint8Array(i * o);
    l.fill(c.getBiome());
    return {
      biomes: l,
      heights: null,
    };
  }
  throw new Error("Unknown biome provider");
}
function Hf(e, t, n, r, i, o) {
  if (o >= 4) {
    return {
      biomes: e[y.End].getBiomeArea(t, n, r, i, o),
      heights: null,
    };
  }
  if (o !== 1 && o !== 2) {
    throw new Error("Invalid step");
  }
  const s = D(t, 4);
  const a = D(n, 4);
  const c = D(t + (r - 1) * o, 4) - s + 1;
  const l = D(n + (i - 1) * o, 4) - a + 1;
  const u = e[y.End].getBiomeArea(s * 4, a * 4, c, l, 4);
  const d = new Uint8Array(r * i);
  for (let f = 0; f < i; f++) {
    const g = (D(n + f * o, 4) - a) * c;
    for (let h = 0; h < r; h++) {
      d[f * r + h] = u[g + D(t + h * o, 4) - s];
    }
  }
  return {
    biomes: d,
    heights: null,
  };
}
function Df(e, t, n, r) {
  const i = [];
  const s = (1 / Math.sqrt(0.5)) * Math.sqrt(r / 4);
  const a = 45;
  const c = 315;
  const l = s * 1;
  const u = (Math.PI * a) / 180;
  const d = (Math.PI * c) / 180;
  const f = Math.cos(u);
  const g = Math.sin(u);
  for (let h = 0; h < n; h++) {
    const w = Math.max(h - 1, 0);
    const b = Math.min(h + 1, n - 1);
    for (let x = 0; x < t; x++) {
      const C = Math.max(x - 1, 0);
      const I = Math.min(x + 1, t - 1);
      const V = e[h * t + C] * 0.025;
      const O = e[h * t + I] * 0.025;
      const E = e[w * t + x] * 0.025;
      const A = e[b * t + x] * 0.025;
      const z = (O - V) / l;
      const F = (A - E) / l;
      const L = Math.atan(Math.sqrt(z * z + F * F));
      let R = Math.atan2(F, -z);
      if (R < 0) {
        R = Math.PI / 2 - R;
      } else if (R > Math.PI / 2) {
        R = Math.PI * 2 - R + Math.PI / 2;
      } else {
        R = Math.PI / 2 - R;
      }
      const M = g * Math.cos(L) + f * Math.sin(L) * Math.cos(d - R);
      i[h * t + x] = zr(Math.floor((M - 0.20710678118654746) * 256), 0, 255);
    }
  }
  return i;
}
function Wf(e, t, n) {
  return [
    Math.round(e[0] * (1 - n) + t[0] * n),
    Math.round(e[1] * (1 - n) + t[1] * n),
    Math.round(e[2] * (1 - n) + t[2] * n),
  ];
}
function _r(e, t) {
  const n = e / 256;
  const r = t / 256;
  if (n < 0.5) {
    return zr(Math.floor(n * 2 * r * 256), 0, 255);
  } else {
    return zr(Math.floor((1 - (1 - n) * 2 * (1 - r)) * 256), 0, 255);
  }
}
function Gf({ biome: e, height: t, shadingData: n, biomeFilter: r }) {
  if (e === 255) {
    return [0, 0, 0, 0];
  }
  const i = Fe[e];
  let o = i.rgb;
  if (t != null && n != null) {
    const a = t < hi;
    const c = i.category === "ocean" || i.category === "river";
    const l = i.temperature <= 0.1;
    if (a && !c) {
      if (l) {
        o = Fe[11].rgb;
      } else {
        o = Fe[7].rgb;
      }
    } else if (!a && c) {
      if (l) {
        o = Fe[26].rgb;
      } else {
        o = Fe[16].rgb;
      }
    }
    o = [_r(n, o[0]), _r(n, o[1]), _r(n, o[2])];
  }
  const s = [...o, 255];
  if (r) {
    if (r.includes(e)) {
      s[0] = Math.round(o[0] * 0.6);
      s[1] = Math.round(o[1] * 0.6);
      s[2] = Math.round(o[2] * 0.6);
    } else {
      const a = Wf(Hc, o, 0.1255);
      s[0] = a[0];
      s[1] = a[1];
      s[2] = a[2];
    }
  }
  return s;
}
async function jf(e, t, n, r) {
  const i = Rt(e);
  const { providers: o } = Lt(i);
  return o[y.Overworld].noise().getNoiseBiomeYColumn(t, n, r);
}
async function Uf(e, t, n, r, i, o) {
  const s = {
    x: n,
    z: r,
    sizeX: i,
    sizeZ: o,
  };
  const a = Rt(e);
  const { poiFinder: c } = Lt(a);
  return await c(s, t);
}
const ea = {
  witnessPoiIds: Object.freeze([]),
  pois: Object.freeze([]),
  clusters: Object.freeze([]),
};
const Zt = Object.freeze({
  passed: false,
  ...ea,
});
const Zf = Object.freeze({
  passed: true,
  ...ea,
});
function Jf(e, t, n) {
  if (e.shape.kind === "square") {
    const i = Math.max(1, Math.round(e.shape.inradius * 2));
    const o = (i - 1) >> 1;
    return {
      centerX: t,
      centerZ: n,
      minX: t - o,
      maxX: t + (i - 1 - o),
      minZ: n - o,
      maxZ: n + (i - 1 - o),
    };
  }
  const r = e.shape.radius;
  return {
    centerX: t,
    centerZ: n,
    minX: Math.floor(t - r),
    maxX: Math.ceil(t + r),
    minZ: Math.floor(n - r),
    maxZ: Math.ceil(n + r),
  };
}
function Xf(e, t, n, r) {
  if (e.shape.kind === "square") {
    return n >= t.minX && n <= t.maxX && r >= t.minZ && r <= t.maxZ;
  }
  const i = n - t.centerX;
  const o = r - t.centerZ;
  return i * i + o * o <= e.shape.radius * e.shape.radius;
}
async function an(e, t, n, r, i) {
  const o = e.stepQ ?? 1;
  const s = Math.max(0, Math.ceil(((n.minX >> 2) - e.xQ0) / o));
  const a = Math.min(e.xLen, Math.floor(((n.maxX >> 2) - e.xQ0) / o) + 1);
  const c = Math.max(0, Math.ceil(((n.minZ >> 2) - e.zQ0) / o));
  const l = Math.min(e.zLen, Math.floor(((n.maxZ >> 2) - e.zQ0) / o) + 1);
  for (let u = c; u < l; u++) {
    await r();
    const d = (e.zQ0 + u * o) * 4;
    const f = d + 2;
    for (let g = s; g < a; g++) {
      const h = (e.xQ0 + g * o) * 4;
      const w = h + 2;
      if ($f(t, n, h, d)) {
        i(u * e.xLen + g, w, f);
      }
    }
  }
}
function $f(e, t, n, r) {
  const i = n + 3;
  const o = r + 3;
  if (e.shape.kind === "square") {
    return i >= t.minX && n <= t.maxX && o >= t.minZ && r <= t.maxZ;
  }
  const s = Math.max(n, Math.min(t.centerX, i));
  const a = Math.max(r, Math.min(t.centerZ, o));
  const c = s - t.centerX;
  const l = a - t.centerZ;
  return c * c + l * l <= e.shape.radius * e.shape.radius;
}
function X(e) {
  e = Math.round(e * 10) / 10;
  return (e + "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function De(e) {
  return e[2].map(function (t) {
    return [e[0], e[1], t];
  });
}
function Qf(e) {
  const t = e[2];
  if (t) {
    return De([e[0], e[1], t]);
  } else {
    return [[e[0], e[1], undefined]];
  }
}
function So(e, t) {
  if (t.edition === _.Java && t.javaVersion >= p.V1_18) {
    return [e[0] * 16, null, e[1] * 16];
  } else {
    return [e[0] * 16 + 8, null, e[1] * 16 + 8];
  }
}
const H = {
  chunkClassifier: 8,
  veryBig: 16,
  big: 32,
  normal: 128,
  small: 256,
};
const N = {
  chunk: function (e) {
    return e[0] + "//" + e[1];
  },
  xzBlock: function (e, t) {
    return e + "/" + t;
  },
  xyBlockArr: function (e) {
    return N.xzBlock(e[2][0], e[2][2]);
  },
};
function xo(e) {
  if (e.count < 600) {
    return "small";
  } else if (e.count < 1800) {
    return "medium";
  } else if (e.count < 5400) {
    return "large";
  } else {
    return "huge";
  }
}
function yr(e) {
  return !!e && e[0] != null && e[2] != null;
}
function Co(e) {
  if (e) {
    if (e === "units") {
      return "Housing units";
    } else if (e === "hoglin_stable") {
      return "Hoglin stables";
    } else if (e === "treasure") {
      return "Treasure room";
    } else if (e === "bridge") {
      return "Bridges";
    } else {
      return null;
    }
  } else {
    return null;
  }
}
function To(e) {
  if (e === ye.ZOMBIE) {
    return "Zombie";
  } else if (e === ye.SKELETON) {
    return "Skeleton";
  } else if (e === ye.SPIDER) {
    return "Spider";
  } else {
    return null;
  }
}
function Bo(e) {
  return [
    e.isLarge ? "Large," : "Small,",
    e.type === "warm" ? "Warm" : "Cold",
    "Ruin",
    e.clusterSize > 0 && "with Cluster (" + e.clusterSize + " small ruins)",
  ]
    .filter(Boolean)
    .join(" ");
}
function Kf(e) {
  if (e.oreCount < 6) {
    return "small";
  } else if (e.oreCount < 9) {
    return "medium";
  } else {
    return "large";
  }
}
function Eo(e) {
  if (e.type == null) {
    return null;
  }
  let t = {
    desert: "Desert Village",
    plains: "Plains Village",
    savanna: "Savanna Village",
    taiga: "Taiga Village",
    snowy: "Snowy Village",
  }[e.type];
  if (e.zombie) {
    t = "Zombie " + t;
  }
  return t;
}
const He = (e) => e;
const Z = (e) => e;
const nt = {
  [m.AbandonedCamp]: Z({
    shortId: "Ab",
    label: "Camp",
    fullLabel: "Abandoned Camp",
    icon: "abandoned-camp",
    imgSrc: {
      default: "abandoned-camp.png",
      secretChest: "abandoned-camp-special-copper.png",
    },
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.normal,
    getTooltipText: function (e) {
      if (e[2].hasSecretChest) {
        return "Abandoned Camp (Copper Chest)";
      } else {
        return "Abandoned Camp";
      }
    },
    getImg: function (e) {
      if (e.hasSecretChest) {
        return "secretChest";
      } else {
        return "default";
      }
    },
    getCoords: function (e) {
      const { x: t, y: n, z: r } = e[2];
      return [t, n, r];
    },
    fillColor: "154,63,53",
    getHash: N.chunk,
  }),
  [m.AmethystGeode]: He({
    shortId: "Ag",
    label: "Geode",
    fullLabel: "Amethyst Geode",
    icon: "amethyst",
    imgSrc: "amethyst.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: H.chunkClassifier,
    splitPois: De,
    getHoverText: function (e) {
      return (
        "Likely Geode @ " +
        e[2]
          .map(function (n) {
            return X(n[0]) + " / " + X(n[1]) + " / " + X(n[2]);
          })
          .join(", ")
      );
    },
    getTooltipText: function () {
      return "Likely Amethyst Geode";
    },
    getCoords: function (e) {
      return e[2];
    },
    fillColor: "98,69,149",
    getHash: N.xyBlockArr,
  }),
  [m.AncientCity]: Z({
    shortId: "Ac",
    label: "Ancient City",
    icon: "ancient-city",
    imgSrc: "ancient-city.png",
    dimension: y.Overworld,
    biomeScanHeights: ["bottom"],
    maxTileSize: H.normal,
    getTooltipText: function () {
      return "Ancient City";
    },
    getCoords: function (e) {
      return [e[0] * 16 + 8, -51, e[1] * 16 + 8];
    },
    getHoverText: function (e, t) {
      const n = nt[m.AncientCity].getCoords?.(e, t) ?? [0, 0, 0];
      return "Ancient City @ " + X(n[0]) + " / " + n[1] + " / " + X(n[2]);
    },
    fillColor: "5,35,30",
    getHash: N.chunk,
  }),
  [m.BastionRemnant]: Z({
    shortId: "Br",
    label: "Bastion",
    fullLabel: "Bastion Remnant",
    icon: "piglin",
    imgSrc: {
      default: "bastion.png",
      bridge: "bastion-bridge.png",
      stables: "bastion-stables.png",
      units: "bastion-units.png",
      treasure: "bastion-treasure.png",
    },
    dimension: y.Nether,
    maxTileSize: H.big,
    getCoords: function (e) {
      return [e[0] * 16, null, e[1] * 16];
    },
    getHoverText: function (e) {
      const t = Co(e[2].type);
      if (t == null) {
        return null;
      } else {
        return "Type: " + t;
      }
    },
    getTooltipText: function (e) {
      return "Bastion (" + Co(e[2].type) + ")";
    },
    getImg: function (e) {
      if (e.type === "hoglin_stable") {
        return "stables";
      } else if (e.type === "treasure") {
        return "treasure";
      } else if (e.type === "bridge") {
        return "bridge";
      } else {
        return "units";
      }
    },
    fillColor: function (e) {
      if (e?.type == null || e.type === "units") {
        return "140,140,140";
      } else if (e.type === "hoglin_stable") {
        return "245,0,122";
      } else if (e.type === "treasure") {
        return "139,69,19";
      } else if (e.type === "bridge") {
        return "8,145,17";
      } else {
        return "0,0,0";
      }
    },
    getHash: N.chunk,
  }),
  [m.BuriedTreasure]: Z({
    shortId: "Bt",
    label: "Treasure",
    fullLabel: "Buried Treasure",
    icon: "buried-treasure",
    imgSrc: "buried-treasure.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.big,
    getHoverText: function (e, t) {
      const n = nt[m.BuriedTreasure].getCoords?.(e, t) ?? [0, 0, 0];
      return "Treasure @ " + X(n[0]) + " / " + X(n[2]);
    },
    getTooltipText: function () {
      return "Buried Treasure";
    },
    getCoords: function (e, t) {
      const n = t.edition === _.Java ? 9 : 8;
      return [e[0] * 16 + n, null, e[1] * 16 + n];
    },
    fillColor: "190,140,100",
    getHash: N.chunk,
  }),
  [m.Cave]: He({
    shortId: "Ca",
    label: "Cave",
    fullLabel: "Cheese Cave",
    icon: "cave",
    imgSrc: {
      default: "cave.png",
      special: "cave-special.png",
    },
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: H.veryBig,
    splitPois: De,
    getCoords: function (e) {
      return e[2].reference.pos;
    },
    getTooltipText: function (e) {
      return "Cheese Cave (" + xo(e[2]) + ")";
    },
    getImg: function (e) {
      if (xo(e) === "huge") {
        return "special";
      } else {
        return "default";
      }
    },
    fillColor: function () {
      return "80,80,80";
    },
    getHash: function (e) {
      return N.xzBlock(e[2].reference.pos[0], e[2].reference.pos[2]);
    },
  }),
  [m.DesertTemple]: Z({
    shortId: "Dt",
    label: "Desert Temple",
    icon: "desert-temple",
    imgSrc: "desert-temple.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.normal,
    getTooltipText: function (e, t) {
      if (t.edition === _.Java && t.javaVersion >= p.V1_18) {
        return "Likely Desert Temple";
      } else {
        return "Desert Temple";
      }
    },
    fillColor: "120,100,20",
    getHash: N.chunk,
  }),
  [m.DesertWell]: Z({
    shortId: "Dw",
    label: "Desert Well",
    icon: "desert-well",
    imgSrc: "desert-well.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.big,
    getTooltipText: function (e) {
      return "Likely Desert Well";
    },
    getCoords: function (e) {
      return e[2].slice(0, 3);
    },
    fillColor: "40,57,161",
    getHash: N.chunk,
  }),
  [m.Dungeon]: He({
    shortId: "D",
    label: "Dungeon",
    icon: "dungeon",
    imgSrc: {
      default: "dungeon.png",
      zombie: "dungeon-zombie.png",
      spider: "dungeon-spider.png",
      skeleton: "dungeon-skeleton.png",
    },
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: H.chunkClassifier,
    getImg: function (e) {
      const t = e[3];
      if (t === ye.ZOMBIE) {
        return "zombie";
      } else if (t === ye.SKELETON) {
        return "skeleton";
      } else {
        return "spider";
      }
    },
    fillColor: function (e) {
      if (e == null || e.length > 1) {
        return "220,120,20";
      } else if (e[0][3] === ye.ZOMBIE) {
        return "70,109,29";
      } else if (e[0][3] === ye.SKELETON) {
        return "125,125,125";
      } else if (e[0][3] === ye.SPIDER) {
        return "168,46,0";
      } else {
        return "0,0,0";
      }
    },
    splitPois: De,
    getCoords: function (e) {
      return e[2].slice(0, 3);
    },
    getTooltipText: function (e, t) {
      const n = To(e[2][3]) || "Unknown Mob";
      return (
        ((t.edition === _.Bedrock && t.bedrockVersion >= S.V1_18) ||
        (t.edition === _.Java && t.javaVersion >= p.V1_18)
          ? "Possible"
          : "Likely") +
        " Dungeon (" +
        n +
        ")"
      );
    },
    getHoverText: function (e) {
      return e[2]
        .map(function (t) {
          return (
            (To(t[3]) || "Dungeon") +
            " @ " +
            [X(t[0]), t[1], X(t[2])].join(" / ")
          );
        }, "")
        .join(", ");
    },
    getHash: function (e) {
      return N.xyBlockArr([e[0], e[1], [e[2][0], e[2][1], e[2][2]]]);
    },
  }),
  [m.Fossil]: He({
    shortId: "F",
    label: "Fossil",
    icon: "fossil",
    imgSrc: "fossil.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: H.chunkClassifier,
    fillColor: "90,90,90",
    splitPois: Qf,
    getCoords: function (e) {
      if (yr(e[2])) {
        return e[2].slice(0, 3);
      } else {
        return [e[0] * 16 + 8, null, e[1] * 16 + 8];
      }
    },
    getTooltipText: function (e) {
      let t = e[2] && e[2][3] === "diamond" ? "Diamond Fossil" : "Fossil";
      if (!yr(e[2])) {
        t += " (Estimated)";
      }
      return t;
    },
    getHoverText: function (e) {
      const t = e[2].filter(Boolean);
      if (yr(t[0])) {
        return t
          .map(function (n) {
            return (
              "Fossil @ " +
              [X(n?.[0] ?? 0), n?.[1], X(n?.[2] ?? 0)]
                .filter(Boolean)
                .join(" / ")
            );
          }, "")
          .join(", ");
      } else {
        return null;
      }
    },
    getHash: N.chunk,
  }),
  [m.FossilNether]: He({
    shortId: "Fn",
    label: "Nether Fossil",
    icon: "fossil",
    imgSrc: {
      default: "fossil.png",
      ghast: "fossil-ghast.png",
    },
    dimension: y.Nether,
    maxTileSize: H.chunkClassifier,
    fillColor: function (e) {
      if (e != null && e[0][3].hasDriedGhast) {
        return "0,122,108";
      } else {
        return "90,90,90";
      }
    },
    splitPois: De,
    getImg: function (e) {
      if (e[3].hasDriedGhast) {
        return "ghast";
      } else {
        return "default";
      }
    },
    getCoords: function (e) {
      return e[2].slice(0, 3);
    },
    getTooltipText: function (e, t) {
      let n;
      if (t.edition === _.Bedrock) {
        n = "Likely Nether Fossil";
      } else {
        n = "Nether Fossil";
      }
      if (e[2][3].hasDriedGhast) {
        n += " (Ghast)";
      }
      return n;
    },
    getHoverText: function (e) {
      return e[2]
        .map(function (t) {
          return (
            "Fossil " +
            (t[3].hasDriedGhast ? "(Ghast)" : "") +
            " @ " +
            [X(t[0]), t[1], X(t[2])].filter(Boolean).join(" / ")
          );
        }, "")
        .join(", ");
    },
    getHash: N.chunk,
  }),
  [m.EndCity]: Z({
    shortId: "E",
    label: "End City",
    icon: "end-city",
    imgSrc: {
      default: "end-city.png",
      ship: "end-city-ship.png",
    },
    dimension: y.End,
    maxTileSize: H.normal,
    getImg: function (e) {
      if (e.hasShip == null || e.hasShip) {
        return "ship";
      } else {
        return "default";
      }
    },
    fillColor: function (e) {
      if (e == null || e.hasShip == null || e.hasShip) {
        return "73,49,73";
      } else {
        return "130,130,130";
      }
    },
    getTooltipText: function (e) {
      return (
        "Likely " +
        (e[2].hasShip == null
          ? "End City"
          : e[2].hasShip
            ? "End City (with ship)"
            : "End City (without ship)")
      );
    },
    getHoverText: function (e) {
      if (e[2].hasShip == null) {
        return null;
      } else if (e[2].hasShip) {
        return "End City with ship";
      } else {
        return "End City without ship";
      }
    },
    getHash: N.chunk,
  }),
  [m.EndGateway]: He({
    shortId: "Eg",
    label: "End Gateway",
    icon: "end-gateway",
    imgSrc: "end-gateway.png",
    dimension: y.End,
    maxTileSize: H.normal,
    fillColor: "20,100,85",
    splitPois: De,
    getCoords: function (e) {
      return [e[2].x, null, e[2].z];
    },
    getHoverText: function (e) {
      return "End Gateway @ " + X(e[2][0].x) + " / " + X(e[2][0].z);
    },
    getTooltipText: function () {
      return "End Gateway";
    },
    getHash: function (e) {
      return N.xzBlock(e[2].x, e[2].z);
    },
  }),
  [m.NetherFortress]: Z({
    shortId: "N",
    label: "Nether Fortress",
    icon: "nether-fortress2",
    imgSrc: "nether-fortress.png",
    dimension: y.Nether,
    maxTileSize: H.big,
    fillColor: "195,65,55",
    getCoords: function (e) {
      return [e[0] * 16 + 11, null, e[1] * 16 + 11];
    },
    getTooltipText: function () {
      return "Nether Fortress (Crossing)";
    },
    getHoverText: function (e) {
      return "Crossing @ " + X((e[0] << 4) + 11) + " / " + X((e[1] << 4) + 11);
    },
    getHash: N.chunk,
  }),
  [m.Igloo]: Z({
    shortId: "I",
    label: "Igloo",
    icon: "igloo2",
    imgSrc: {
      default: "igloo.png",
      basement: "igloo-basement.png",
    },
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.normal,
    getImg: function (e) {
      if (e.hasBasement) {
        return "basement";
      } else {
        return "default";
      }
    },
    fillColor: function (e) {
      if (e?.hasBasement) {
        return "35,87,205";
      } else {
        return "100,100,100";
      }
    },
    getTooltipText: function (e) {
      if (e[2].hasBasement == null) {
        return "Igloo";
      } else if (e[2].hasBasement) {
        return "Igloo (with basement)";
      } else {
        return "Igloo (without basement)";
      }
    },
    getHoverText: function (e) {
      if (e[2].hasBasement == null) {
        return null;
      } else if (e[2].hasBasement) {
        return "Igloo with basement";
      } else {
        return "Igloo without basement";
      }
    },
    getHash: N.chunk,
  }),
  [m.JungleTemple]: Z({
    shortId: "J",
    label: "Jungle Temple",
    icon: "jungle-temple",
    imgSrc: "jungle-temple.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.normal,
    getTooltipText: function (e, t) {
      if (t.edition === _.Java && t.javaVersion >= p.V1_18) {
        return "Likely Jungle Temple";
      } else {
        return "Jungle Temple";
      }
    },
    fillColor: "114,133,10",
    getHash: N.chunk,
  }),
  [m.WoodlandMansion]: Z({
    shortId: "Ma",
    label: "Mansion",
    fullLabel: "Woodland Mansion",
    icon: "mansion3",
    imgSrc: "mansion.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.small,
    getTooltipText: function (e, t) {
      if (t.edition === _.Java && t.javaVersion >= p.V1_18) {
        return "Likely Woodland Mansion";
      } else {
        return "Woodland Mansion";
      }
    },
    fillColor: "160,82,45",
    getHash: N.chunk,
  }),
  [m.LavaPool]: He({
    shortId: "Lp",
    label: "Lava Pool",
    fullLabel: "Underground Lava Pool",
    icon: "lava",
    imgSrc: {
      default: "lava.png",
      bucket: "lava-bucket.png",
      cave: "lava-cave.png",
    },
    getImg: function (e) {
      if (e.type === "undergroundLake") {
        return "bucket";
      } else {
        return "cave";
      }
    },
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: H.chunkClassifier,
    splitPois: De,
    fillColor: "240,90,20",
    getHash: function (e) {
      return N.xzBlock(e[2].pos[0], e[2].pos[2]);
    },
    getTooltipText: function (e) {
      if (e[2].type === "cave") {
        return "Lava-Flooded Cave";
      } else {
        return "Likely Underground Lava Lake";
      }
    },
    getTooltipAdditionalText: function () {
      return "Never dig straight down";
    },
    getCoords: function (e) {
      return e[2].pos;
    },
  }),
  [m.Mineshaft]: Z({
    shortId: "M",
    label: "Mineshaft",
    icon: "mineshaft2",
    imgSrc: "mineshaft.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: H.veryBig,
    getTooltipText: function () {
      return "Mineshaft";
    },
    fillColor: "160,130,10",
    getHash: N.chunk,
  }),
  [m.OceanMonument]: Z({
    shortId: "Om",
    label: "Monument",
    fullLabel: "Ocean Monument",
    icon: "ocean-monument2",
    imgSrc: "ocean-monument.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.normal,
    getTooltipText: function () {
      return "Ocean Monument";
    },
    fillColor: "100,100,220",
    getHash: N.chunk,
  }),
  [m.OceanRuin]: Z({
    shortId: "Or",
    label: "Ocean Ruins",
    icon: "ocean-ruin",
    imgSrc: {
      default: "ocean-ruin.png",
      special: "ocean-ruin-special.png",
    },
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.big,
    getImg: function (e) {
      if (e.isLarge && e.clusterSize > 0) {
        return "special";
      } else {
        return "default";
      }
    },
    fillColor: function (e) {
      if (e?.type === "cold") {
        if (e.isLarge && e.clusterSize > 0) {
          return "51,102,255";
        } else {
          return "80,98,149";
        }
      } else if (e?.isLarge && e?.clusterSize > 0) {
        return "255,82,51";
      } else {
        return "149,91,80";
      }
    },
    getTooltipText: function (e) {
      return Bo(e[2]);
    },
    getHoverText: function (e) {
      return Bo(e[2]);
    },
    getHash: N.chunk,
  }),
  [m.PillagerOutpost]: Z({
    shortId: "Po",
    label: "Outpost",
    fullLabel: "Pillager Outpost",
    icon: "pillager-outpost2",
    imgSrc: "pillager-outpost.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    getCoords: So,
    maxTileSize: H.normal,
    getTooltipText: function () {
      return "Pillager Outpost";
    },
    fillColor: "80,50,20",
    getHash: N.chunk,
  }),
  [m.Ravine]: He({
    shortId: "Rv",
    label: "Ravine",
    icon: "ravine",
    imgSrc: {
      default: "ravine.png",
      special: "ravine-special.png",
      underwater: "ravine-underwater.png",
      underwaterSpecial: "ravine-underwater-special.png",
    },
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: H.chunkClassifier,
    splitPois: De,
    getCoords: function (e) {
      return [e[2].x, e[2].y, e[2].z];
    },
    getImg: function (e) {
      if (e.isUnderwater) {
        if (e.isMegaRavine) {
          return "underwaterSpecial";
        } else {
          return "underwater";
        }
      } else if (e.isMegaRavine) {
        return "special";
      } else {
        return "default";
      }
    },
    getTooltipText: function (e) {
      const t = e[2];
      return [
        t.isMegaRavine && "Mega",
        t.isUnderwater && "Underwater",
        "Ravine",
        t.thickness && "(Width: " + X(t.thickness) + ")",
      ]
        .filter(Boolean)
        .join(" ");
    },
    getHoverText: function (e) {
      const t = e[2][0];
      return [
        t.isMegaRavine && "Mega",
        t.isUnderwater && "Underwater",
        "Ravine",
        "@ " + X(t.x) + " / " + X(t.y) + " / " + X(t.z),
      ]
        .filter(Boolean)
        .join(" ");
    },
    fillColor: function (e) {
      if (e == null) {
        return "20,90,0";
      }
      const t = e[0];
      if (t.isUnderwater) {
        if (t.isMegaRavine) {
          return "168,7,213";
        } else {
          return "0,0,255";
        }
      } else if (t.isMegaRavine) {
        return "128,25,0";
      } else {
        return "20,90,0";
      }
    },
    getHash: function (e) {
      return N.xzBlock(e[2].x, e[2].z);
    },
  }),
  [m.OreVein]: He({
    shortId: "Ov",
    label: "Ore Veins",
    icon: "ore-vein",
    imgSrc: {
      default: "raw-iron.png",
      copper: "raw-copper.png",
      iron: "raw-iron.png",
    },
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    splitPois: De,
    getCoords: function (e) {
      return e[2].reference;
    },
    getImg: function (e) {
      return e.type;
    },
    maxTileSize: H.chunkClassifier,
    getTooltipText: function (e) {
      return [
        e[2].type === "copper" ? "Copper Vein" : "Iron Vein",
        "(" + Kf(e[2]) + ")",
      ].join(" ");
    },
    fillColor: "110,75,40",
    getHash: function (e) {
      return N.xzBlock(e[2].reference[0], e[2].reference[2]);
    },
  }),
  [m.RuinedPortalOverworld]: Z({
    shortId: "Rp",
    label: "Ruined Portal",
    fullLabel: "Ruined Portal Overworld",
    icon: "ruined-portal",
    imgSrc: "ruined-portal.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: H.big,
    getTooltipText: function () {
      return "Estimated Ruined Portal";
    },
    fillColor: "109,9,109",
    getHash: N.chunk,
  }),
  [m.RuinedPortalNether]: Z({
    shortId: "Rpn",
    label: "Ruined Portal",
    fullLabel: "Ruined Portal Nether",
    icon: "ruined-portal",
    imgSrc: "ruined-portal.png",
    dimension: y.Nether,
    maxTileSize: H.big,
    getTooltipText: function () {
      return "Estimated Ruined Portal";
    },
    fillColor: "109,9,109",
    getHash: N.chunk,
  }),
  [m.Shipwreck]: Z({
    shortId: "Sw",
    label: "Shipwreck",
    icon: "shipwreck2",
    imgSrc: "shipwreck.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.big,
    getTooltipText: function () {
      return "Shipwreck";
    },
    fillColor: "108,88,97",
    getHash: N.chunk,
  }),
  [m.SlimeChunk]: Z({
    shortId: "Sc",
    label: "Slime Chunk",
    icon: "slime",
    imgSrc: "slime.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: H.chunkClassifier,
    getTooltipText: function () {
      return "Slime Chunk";
    },
    fillColor: "29,145,44",
    fillColorOuter: "40,199,60",
    getHash: N.chunk,
    canOverlay: true,
    preferFill: true,
  }),
  [m.Spawn]: Z({
    shortId: "Sp",
    label: "Spawn Point",
    icon: "spawn",
    imgSrc: "spawn.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.small,
    getCoords: function (e) {
      return [e[2].x, null, e[2].z];
    },
    getTooltipText: function () {
      return "Estimated Spawn Point";
    },
    fillColor: "40,40,40",
    getHash: N.chunk,
  }),
  [m.Stronghold]: Z({
    shortId: "St",
    label: "Stronghold",
    icon: "stronghold",
    imgSrc: "stronghold.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: H.small,
    fillColor: "195,65,55",
    getCoords: function (e) {
      return [e[0] * 16 + 4, null, e[1] * 16 + 4];
    },
    getTooltipText: function () {
      return "Stronghold (Stairway)";
    },
    getHoverText: function (e) {
      return (
        "Stronghold stairway @ " +
        X((e[0] << 4) + 4) +
        " / " +
        X((e[1] << 4) + 4)
      );
    },
    getHash: N.chunk,
  }),
  [m.TrailRuin]: Z({
    shortId: "Tr",
    label: "Trail Ruins",
    icon: "trail-ruin",
    imgSrc: "trail-ruin.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground"],
    maxTileSize: H.normal,
    getTooltipText: function (e) {
      return "Trail Ruins";
    },
    getCoords: function (e) {
      return e[2].slice(0, 3);
    },
    fillColor: "123,80,20",
    getHash: N.chunk,
  }),
  [m.TrialChamber]: Z({
    shortId: "Tc",
    label: "Trial Chamber",
    icon: "trial-chamber",
    imgSrc: "trial-chamber.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface", "underground", "bottom"],
    maxTileSize: H.big,
    getTooltipText: function () {
      return "Trial Chamber";
    },
    getCoords: function (e) {
      return e[2] ?? [e[0] * 16, null, e[1] * 16];
    },
    fillColor: "113,45,25",
    getHash: N.chunk,
  }),
  [m.Village]: Z({
    shortId: "V",
    label: "Village",
    icon: "village2",
    imgSrc: {
      default: "village.png",
      zombie: "village-zombie.png",
    },
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.normal,
    getImg: function (e) {
      if (e.zombie) {
        return "zombie";
      } else {
        return "default";
      }
    },
    getCoords: So,
    fillColor: function (e) {
      if (e?.zombie) {
        return "200,0,190";
      } else if (e?.type == null) {
        return "179,163,60";
      } else {
        return {
          desert: "180,101,4",
          plains: "100,131,63",
          savanna: "138,128,56",
          taiga: "11,102,89",
          snowy: "120,120,120",
        }[e.type];
      }
    },
    getTooltipText: function (e) {
      return Eo(e[2]) || "Village";
    },
    getHoverText: function (e) {
      return Eo(e[2]);
    },
    getHash: N.chunk,
  }),
  [m.WitchHut]: Z({
    shortId: "Wh",
    label: "Witch Hut",
    icon: "witch-hut2",
    imgSrc: "witch-hut.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.normal,
    getTooltipText: function () {
      return "Witch Hut";
    },
    fillColor: "169,44,212",
    getHash: N.chunk,
  }),
  [m.ItemOverworld]: Z({
    shortId: "IOw",
    label: "Apple",
    fullLabel: "Enchanted Golden Apple",
    icon: "golden-apple",
    imgSrc: "golden-apple.png",
    dimension: y.Overworld,
    biomeScanHeights: ["surface"],
    maxTileSize: H.small,
    fillColor: "145,81,13",
    getTooltipText: function () {
      return "Likely Enchanted Apple (temple chest)";
    },
    getHoverText: function () {
      return "Likely Enchanted Apple (temple chest)";
    },
    getHash: N.chunk,
    canOverlay: true,
  }),
};
Object.fromEntries(Object.entries(nt).map((e) => [e[1].shortId, e[0]]));
function qf(e, t) {
  return `${e}/${nt[e].getHash(t)}`;
}
const Yf = [
  m.Spawn,
  m.SlimeChunk,
  m.Village,
  m.AncientCity,
  m.Dungeon,
  m.Stronghold,
  m.WoodlandMansion,
  m.OceanMonument,
  m.PillagerOutpost,
  m.Mineshaft,
  m.RuinedPortalOverworld,
  m.JungleTemple,
  m.DesertTemple,
  m.WitchHut,
  m.BuriedTreasure,
  m.Shipwreck,
  m.Igloo,
  m.OceanRuin,
  m.Fossil,
  m.Cave,
  m.Ravine,
  m.LavaPool,
  m.EndCity,
  m.EndGateway,
  m.NetherFortress,
  m.BastionRemnant,
  m.RuinedPortalNether,
  m.AmethystGeode,
  m.ItemOverworld,
  m.OreVein,
  m.DesertWell,
  m.TrailRuin,
  m.TrialChamber,
  m.FossilNether,
  m.AbandonedCamp,
];
Yf.map((e) => ({
  key: e,
  ...nt[e],
}));
function ed(e, t, n) {
  return nt[e].getCoords?.(t, n) ?? [t[0] * 16 + 8, null, t[1] * 16 + 8];
}
function td(e, t, n) {
  return {
    poi: e,
    coords: ed(e, t, n),
    data: t[2],
    chunk: [t[0], t[1]],
    poiId: qf(e, t),
  };
}
function nd(e, t, n) {
  const r = nt[e];
  const i = [];
  for (const o of t) {
    const s = r.splitPois ? r.splitPois(o) : [o];
    for (const a of s) {
      i.push(td(e, a, n));
    }
  }
  return i;
}
const rd = {
  [m.BastionRemnant]: _e()({
    Bridge: (e) => e.type === "bridge",
    Stables: (e) => e.type === "hoglin_stable",
    Units: (e) => e.type === "units",
    Treasure: (e) => e.type === "treasure",
  }),
  [m.BuriedTreasure]: {},
  [m.Dungeon]: _e()({
    Zombie: (e) => e[3] === ye.ZOMBIE,
    Skeleton: (e) => e[3] === ye.SKELETON,
    Spider: (e) => e[3] === ye.SPIDER,
  }),
  [m.EndCity]: _e()({
    Ship: (e) => e.hasShip,
  }),
  [m.NetherFortress]: {},
  [m.SlimeChunk]: {},
  [m.Stronghold]: {},
  [m.Village]: _e()({
    Zombie: (e) => !!e.zombie,
    Desert: (e) => e.type === "desert",
    Plains: (e) => e.type === "plains",
    Savanna: (e) => e.type === "savanna",
    Taiga: (e) => e.type === "taiga",
    Snowy: (e) => e.type === "snowy",
  }),
  [m.Mineshaft]: {},
  [m.WoodlandMansion]: {},
  [m.PillagerOutpost]: {},
  [m.OceanRuin]: _e()({
    Large: (e) => e.isLarge,
    Cluster: (e) => e.clusterSize > 0,
    Warm: (e) => e.type === "warm",
    Cold: (e) => e.type === "cold",
  }),
  [m.OceanMonument]: {},
  [m.Shipwreck]: {},
  [m.DesertTemple]: {},
  [m.JungleTemple]: {},
  [m.WitchHut]: {},
  [m.Igloo]: _e()({
    Basement: (e) => !!e.hasBasement,
  }),
  [m.RuinedPortalOverworld]: {},
  [m.RuinedPortalNether]: {},
  [m.Spawn]: {},
  [m.Fossil]: _e()({
    Diamond: (e) => e[3] === "diamond",
    Coal: (e) => e[3] === "coal",
  }),
  [m.FossilNether]: _e()({
    Ghast: (e) => !!e[3].hasDriedGhast,
  }),
  [m.Ravine]: _e()({
    Mega: (e) => e.isMegaRavine,
    Underwater: (e) => e.isUnderwater,
  }),
  [m.EndGateway]: {},
  [m.AmethystGeode]: {},
  [m.AncientCity]: {},
  [m.ItemOverworld]: {},
  [m.OreVein]: _e()({
    Copper: (e) => e.type === "copper",
    Iron: (e) => e.type === "iron",
    Small: (e) => wr(e) === "small",
    Medium: (e) => wr(e) === "medium",
    Large: (e) => wr(e) === "large",
  }),
  [m.Cave]: _e()({
    Small: (e) => _n(e) === "small",
    Medium: (e) => _n(e) === "medium",
    Large: (e) => _n(e) === "large",
    Huge: (e) => _n(e) === "huge",
  }),
  [m.DesertWell]: {},
  [m.TrailRuin]: {},
  [m.TrialChamber]: {},
  [m.LavaPool]: _e()({
    UndergroundLake: (e) => e.type === "undergroundLake",
    Cave: (e) => e.type === "cave",
  }),
  [m.AbandonedCamp]: _e()({
    CopperChest: (e) => e.hasSecretChest,
  }),
};
function _e() {
  return (e) => e;
}
function id(e, t) {
  const n = rd[e];
  if (!n) {
    throw new Error(`No tags defined for POI: ${e}`);
  }
  return Object.entries(n)
    .filter(([r, i]) => i(t))
    .map(([r]) => r);
}
const od = ({
  tags: e,
  include: t = [],
  exclude: n = [],
  includeAny: r = [],
}) =>
  !n.some((i) => e.includes(i)) &&
  t.every((i) => e.includes(i)) &&
  (r.length === 0 || r.some((i) => e.includes(i)));
function wr(e) {
  if (e.oreCount < 6) {
    return "small";
  } else if (e.oreCount < 9) {
    return "medium";
  } else {
    return "large";
  }
}
function _n(e) {
  if (e.count < 600) {
    return "small";
  } else if (e.count < 1800) {
    return "medium";
  } else if (e.count < 5400) {
    return "large";
  } else {
    return "huge";
  }
}
const sd = {
  [m.BastionRemnant]: {
    units: {
      include: ["Units"],
      label: "Bastion (Housing Units)",
      imgSrcKey: "units",
    },
    stables: {
      include: ["Stables"],
      label: "Bastion (Hoglin Stables)",
      imgSrcKey: "stables",
    },
    treasure: {
      include: ["Treasure"],
      label: "Bastion (Treasure Room)",
      imgSrcKey: "treasure",
    },
    bridge: {
      include: ["Bridge"],
      label: "Bastion (Bridge)",
      imgSrcKey: "bridge",
    },
  },
  [m.Cave]: {
    small: {
      include: ["Small"],
      label: "Small Cheese Cave",
    },
    mediumPlus: {
      includeAny: ["Medium", "Large", "Huge"],
      label: "Medium+ Cheese Cave",
    },
    largePlus: {
      includeAny: ["Large", "Huge"],
      label: "Large+ Cheese Cave",
    },
    huge: {
      include: ["Huge"],
      label: "Huge Cheese Cave",
      imgSrcKey: "special",
    },
  },
  [m.Dungeon]: {
    zombie: {
      include: ["Zombie"],
      label: "Zombie Dungeon",
      imgSrcKey: "zombie",
    },
    skeleton: {
      include: ["Skeleton"],
      label: "Skeleton Dungeon",
      imgSrcKey: "skeleton",
    },
    spider: {
      include: ["Spider"],
      label: "Spider Dungeon",
      imgSrcKey: "spider",
    },
  },
  [m.EndCity]: {
    ship: {
      include: ["Ship"],
      label: "End City with Ship",
      imgSrcKey: "ship",
    },
    "no-ship": {
      exclude: ["Ship"],
      label: "End City without Ship",
    },
  },
  [m.Fossil]: {
    diamond: {
      include: ["Diamond"],
      label: "Diamond Fossil",
    },
    coal: {
      include: ["Coal"],
      label: "Coal Fossil",
    },
  },
  [m.FossilNether]: {
    ghast: {
      include: ["Ghast"],
      label: "Nether Fossil (Dried Ghast)",
      imgSrcKey: "ghast",
    },
  },
  [m.Igloo]: {
    basement: {
      include: ["Basement"],
      label: "Igloo With Basement",
      imgSrcKey: "basement",
    },
    "no-basement": {
      exclude: ["Basement"],
      label: "Igloo Without Basement",
    },
  },
  [m.LavaPool]: {
    lake: {
      include: ["UndergroundLake"],
      label: "Underground Lava Lake",
      imgSrcKey: "bucket",
    },
    cave: {
      include: ["Cave"],
      label: "Lava-Flooded Cave",
      imgSrcKey: "cave",
    },
  },
  [m.OceanRuin]: {
    large: {
      include: ["Large"],
      label: "Large Ocean Ruins",
    },
    small: {
      exclude: ["Large"],
      label: "Small Ocean Ruins",
    },
    cluster: {
      include: ["Cluster"],
      label: "Ocean Ruins with Cluster",
      imgSrcKey: "special",
    },
    warm: {
      include: ["Warm"],
      label: "Warm Ocean Ruins",
    },
    cold: {
      include: ["Cold"],
      label: "Cold Ocean Ruins",
    },
  },
  [m.OreVein]: {
    copper: {
      include: ["Copper"],
      label: "Copper Vein",
      imgSrcKey: "copper",
    },
    iron: {
      include: ["Iron"],
      label: "Iron Vein",
      imgSrcKey: "iron",
    },
    small: {
      include: ["Small"],
      label: "Small Vein",
    },
    mediumPlus: {
      includeAny: ["Medium", "Large"],
      label: "Medium+ Vein",
    },
    large: {
      includeAny: ["Large"],
      label: "Large Vein",
    },
  },
  [m.Ravine]: {
    mega: {
      include: ["Mega"],
      label: "Mega Ravine",
      imgSrcKey: "special",
    },
    underwater: {
      include: ["Underwater"],
      label: "Underwater Ravine",
      imgSrcKey: "underwater",
    },
  },
  [m.Village]: {
    zombie: {
      include: ["Zombie"],
      label: "Zombie Village",
      imgSrcKey: "zombie",
    },
    desert: {
      include: ["Desert"],
      label: "Desert Village",
    },
    plains: {
      include: ["Plains"],
      label: "Plains Village",
    },
    savanna: {
      include: ["Savanna"],
      label: "Savanna Village",
    },
    taiga: {
      include: ["Taiga"],
      label: "Taiga Village",
    },
  },
  [m.AbandonedCamp]: {
    copperChest: {
      include: ["CopperChest"],
      label: "Camp (Copper Chest)",
      imgSrcKey: "secretChest",
    },
  },
};
function ad(e, t) {
  if (!t) {
    return {};
  }
  const n = sd[e]?.[t];
  if (n) {
    return {
      includeTags: n.include,
      includeAnyTags: n.includeAny,
      excludeTags: n.exclude,
    };
  } else {
    return {};
  }
}
function cd(e, t) {
  const { includeTags: n, includeAnyTags: r, excludeTags: i } = ad(e, t);
  return (o, s) => {
    if (e !== o) {
      return false;
    }
    const a = id(o, s);
    return od({
      tags: a,
      include: n,
      exclude: i,
      includeAny: r,
    });
  };
}
async function zn(e, t, n) {
  const r = e.get(t);
  if (r !== undefined || e.has(t)) {
    return r;
  }
  const i = Promise.resolve(n());
  e.set(t, i);
  try {
    const o = await i;
    e.set(t, o);
    return o;
  } catch (o) {
    e.delete(t);
    throw o;
  }
}
const Ze = 4;
async function pi(e, t, n, r, i = Be) {
  const o = [...new Set(n)];
  const s = D(r.minX >> 4, Ze);
  const a = D(r.minZ >> 4, Ze);
  const c = D(r.maxX >> 4, Ze);
  const l = D(r.maxZ >> 4, Ze);
  const u = {};
  for (const d of o) {
    const f = [];
    for (let g = a; g <= l; g++) {
      for (let h = s; h <= c; h++) {
        await i();
        const w = `poi-tile:${d}:${h},${g}`;
        const b = await zn(
          e,
          w,
          async () =>
            (
              await t(
                {
                  x: h * Ze,
                  z: g * Ze,
                  sizeX: Ze,
                  sizeZ: Ze,
                },
                [d],
              )
            )[d] ?? [],
        );
        if (b.length > 0) {
          f.push(b);
        }
      }
    }
    u[d] = f.flat();
  }
  return u;
}
async function ld(e, t, n, r, i, o, s, a = Be) {
  const c = r * 16;
  const l = i * 16;
  const u = (r + o) * 16 - 1;
  const d = (i + s) * 16 - 1;
  return pi(
    e,
    t,
    n,
    {
      minX: c,
      maxX: u,
      minZ: l,
      maxZ: d,
    },
    a,
  );
}
function ta(e, t) {
  if (e < t) {
    return -1;
  } else if (e > t) {
    return 1;
  } else {
    return 0;
  }
}
function _i(e) {
  return {
    poiId: e.poiId,
    poi: e.poi,
    chunk: e.chunk,
    poiData: e.data,
  };
}
function yi(e, t, n, r) {
  const i = cd(e, t);
  return nd(e, n, r).filter((o) => i(e, o.data));
}
function na(e, t, n, r, i, o) {
  return yi(e, t, n, r).filter((s) => Xf(i, o, s.coords[0], s.coords[2]));
}
function ud(e) {
  const t = new Set();
  const n = [];
  for (const r of [...e].sort((i, o) => ta(i.poiId, o.poiId))) {
    if (!t.has(r.poiId)) {
      t.add(r.poiId);
      n.push(r);
    }
  }
  return n;
}
const Io = {
  [y.Overworld]: 1,
  [y.Nether]: 8,
  [y.End]: 1,
};
function fd(e, t) {
  return Io[e] / Io[t];
}
const dd = 4;
const gd = 0.6;
const md = 2.25;
function hd(e, t) {
  const n =
    t.shape.kind === "square" ? t.shape.inradius * 2 : t.shape.radius * 2;
  const r = Math.min(md, Math.max(gd, Math.sqrt(n / 128)));
  return Math.round(e * r);
}
function ra(e, t, n) {
  const r = fd(y.Overworld, n);
  return [Math.floor(e * r), Math.floor(t * r)];
}
const xe = 16;
function Zr(e) {
  if (e.mode === "biomes") {
    return ["biomes", e.getBiomesAt].join(":");
  } else if (e.mode === "heights") {
    return ["heights", e.getHeightLevelAt, e.surfaceCheckType].join(":");
  } else {
    return [
      "biomesAndHeights",
      e.getBiomesAt,
      e.getHeightLevelAt,
      e.surfaceCheckType,
    ].join(":");
  }
}
const or = Object.freeze({
  xQ: 0,
  zQ: 0,
});
const ia = 4096;
const pd = 512;
const _d = 256;
function oa(e, t) {
  const n = D((e.maxX >> 2) - (e.minX >> 2), t) + 2;
  const r = D((e.maxZ >> 2) - (e.minZ >> 2), t) + 2;
  return n * r;
}
function sr(e, t, n) {
  if (n && oa(e, t) > pd) {
    return "tiles";
  } else {
    return "rect";
  }
}
async function ar(e, t, n, r, i, o = Be, s = 1, a = or, c = "tiles") {
  const l = r.minX >> 2;
  const u = r.minZ >> 2;
  if (l === r.maxX >> 2 && u === r.maxZ >> 2) {
    const M = `biome-point:${n}:${Zr(i)}:${l},${u}`;
    const P = await zn(e, M, () => Me(t, n, l, u, 1, 1, 1, i));
    return {
      biomes: P.biomes,
      heights: P.heights ?? null,
      xQ0: l,
      zQ0: u,
      xLen: 1,
      zLen: 1,
      stepQ: 1,
    };
  }
  if (c === "rect") {
    return yd(e, t, n, r, i, o, s, a);
  }
  const d = xe * s;
  const f = D((r.minX >> 2) - a.xQ, d);
  const g = D((r.minZ >> 2) - a.zQ, d);
  const h = D((r.maxX >> 2) - a.xQ, d);
  const w = D((r.maxZ >> 2) - a.zQ, d);
  const b = h - f + 1;
  const x = w - g + 1;
  const C = f * d + a.xQ;
  const I = g * d + a.zQ;
  const V = b * xe;
  const O = x * xe;
  const E = `biome-tile:${n}:${Zr(i)}:s${s}:p${a.xQ},${a.zQ}`;
  const A = [];
  for (let M = g; M <= w; M++) {
    for (let P = f; P <= h; P++) {
      const U = `${E}:${P},${M}`;
      await o();
      A.push(
        zn(e, U, () => Me(t, n, P * d + a.xQ, M * d + a.zQ, xe, xe, s, i)),
      );
    }
  }
  const z = await Promise.all(A);
  const F = new Uint8Array(V * O);
  const L = i.mode !== "biomes" ? new Int32Array(V * O) : null;
  let R = false;
  for (let M = 0; M < x; M++) {
    for (let P = 0; P < b; P++) {
      const U = z[M * b + P];
      for (let J = 0; J < xe; J++) {
        const $ = (M * xe + J) * V + P * xe;
        const G = J * xe;
        for (let ee = 0; ee < xe; ee++) {
          F[$ + ee] = U.biomes[G + ee];
        }
        if (L) {
          if (U.heights) {
            for (let ee = 0; ee < xe; ee++) {
              L[$ + ee] = U.heights[G + ee];
            }
          } else {
            R = true;
          }
        }
      }
    }
  }
  return {
    biomes: F,
    heights: R ? null : L,
    xQ0: C,
    zQ0: I,
    xLen: V,
    zLen: O,
    stepQ: s,
  };
}
async function yd(e, t, n, r, i, o, s, a) {
  const c = r.minX >> 2;
  const l = r.minZ >> 2;
  const u = c - Fn(c - a.xQ, s);
  const d = l - Fn(l - a.zQ, s);
  const f = D((r.maxX >> 2) - u, s) + 1;
  const g = D((r.maxZ >> 2) - d, s) + 1;
  const h = `biome-rect:${n}:${Zr(i)}:s${s}:${u},${d}:${f}x${g}`;
  const w = await zn(e, h, async () => {
    const b = Math.max(1, Math.floor(ia / f));
    if (b >= g) {
      await o();
      const V = Me(t, n, u, d, f, g, s, i);
      return {
        biomes: V.biomes,
        heights: V.heights ?? null,
      };
    }
    const x = new Uint8Array(f * g);
    const C = i.mode !== "biomes" ? new Int32Array(f * g) : null;
    let I = false;
    for (let V = 0; V < g; V += b) {
      await o();
      const O = Math.min(b, g - V);
      const E = Me(t, n, u, d + V * s, f, O, s, i);
      x.set(E.biomes, V * f);
      if (C) {
        if (E.heights) {
          C.set(E.heights, V * f);
        } else {
          I = true;
        }
      }
    }
    return {
      biomes: x,
      heights: I ? null : C,
    };
  });
  return {
    biomes: w.biomes,
    heights: w.heights,
    xQ0: u,
    zQ0: d,
    xLen: f,
    zLen: g,
    stepQ: s,
  };
}
const Vo = 4;
const wd = 4;
function Vt(e, t, n) {
  if (t === 1) {
    return or;
  } else {
    return wi(e, n);
  }
}
function sa(e, t, n, r = 1, i = "tiles") {
  if (e[t] instanceof si) {
    return null;
  }
  if (i === "rect") {
    if (oa(n, r) >= _d) {
      return Vo * r;
    } else {
      return null;
    }
  }
  const o = Vo * r;
  const s = ko(n, r, Vt(n, r, r));
  const a = ko(n, o, Vt(n, r, o));
  if (s >= wd * a) {
    return o;
  } else {
    return null;
  }
}
function bd(e, t) {
  if (t === y.End) {
    return true;
  } else {
    return e[t] instanceof qe;
  }
}
function cn(e, t, n) {
  const r = (n ?? dd) / 4;
  if (r === 1) {
    return 1;
  } else if (bd(e, t)) {
    return r;
  } else {
    return 1;
  }
}
function wi(e, t) {
  return {
    xQ: Fn(e.centerX >> 2, t),
    zQ: Fn(e.centerZ >> 2, t),
  };
}
function ko(e, t, n) {
  const r = xe * t;
  const i = D((e.maxX >> 2) - n.xQ, r) - D((e.minX >> 2) - n.xQ, r) + 1;
  const o = D((e.maxZ >> 2) - n.zQ, r) - D((e.minZ >> 2) - n.zQ, r) + 1;
  return i * o;
}
const Jr = ["depth0", "bottom", "caveDepth"];
function bi(e, t) {
  if (t === y.Overworld) {
    if (ai(e)) {
      return Jr;
    } else {
      return ["depth0"];
    }
  } else if (t === y.Nether) {
    if (Ss(e)) {
      return Jr;
    } else {
      return ["depth0"];
    }
  } else {
    return ["depth0"];
  }
}
function aa(e) {
  switch (e.kind) {
    case "surface":
      return {
        mode: "biomes",
        getBiomesAt: "depth0",
      };
    case "underground":
      return {
        mode: "biomes",
        getBiomesAt: "caveDepth",
      };
    case "fixed":
      return {
        mode: "biomes",
        getBiomesAt: e.y,
      };
  }
}
function ca(e) {
  return {
    mode: "biomes",
    getBiomesAt: e,
  };
}
function vd(e) {
  return Jr.includes(e);
}
function Oo(e, t, n, r, i) {
  const { biomes: o } = Me(e, t, n >> 2, r >> 2, 1, 1, 1, {
    mode: "biomes",
    getBiomesAt: i,
  });
  return o[0];
}
async function Sd(e, t, n, r, i, o, s, a, c, l, u = Be) {
  const d = await pi(l, t, [s.type], o, u);
  const f = [];
  const g = na(s.type, s.variantId, d[s.type] ?? [], n, i, o);
  if (g.length < a) {
    return Zt;
  }
  g.sort((h, w) => ta(h.poiId, w.poiId));
  if (c !== undefined) {
    const h = Math.max(a, Mo);
    for (const w of g) {
      await u();
      if (la(e, n, r, s.type, w.coords, [c]) && (f.push(w), f.length >= h)) {
        break;
      }
    }
  } else {
    f.push(...g);
  }
  if (f.length < a) {
    return Zt;
  } else {
    return {
      passed: true,
      witnessPoiIds: f.slice(0, a).map((h) => h.poiId),
      pois: f.slice(0, Mo).map(_i),
      clusters: [],
    };
  }
}
const Mo = 100;
const xd = {
  surface: "depth0",
  underground: "caveDepth",
  bottom: "bottom",
};
function la(e, t, n, r, i, o) {
  const [s, a, c] = i;
  if (a != null) {
    return o.includes(Oo(e, n, s, c, a));
  }
  const l = nt[r].biomeScanHeights ?? ["surface"];
  let d = bi(t, n).filter((f) => l.some((g) => xd[g] === f));
  if (d.length === 0) {
    d = ["depth0"];
  }
  return d.some((f) => o.includes(Oo(e, n, s, c, f)));
}
function Cd(e, t) {
  if (e.length === 0) {
    return [0, null, 0];
  }
  const n = e.every((s) => s[1] != null);
  const r = t && n ? 3 : 2;
  const i = e.map((s) => (r === 3 ? [s[0], s[1], s[2]] : [s[0], s[2]]));
  const o = Td(i, r);
  if (r === 3) {
    return [o.center[0], o.center[1], o.center[2]];
  } else {
    return [o.center[0], null, o.center[1]];
  }
}
function Td(e, t) {
  return Xr(Bd(e), e.length, [], t);
}
function Xr(e, t, n, r) {
  if (t === 0 || n.length === r + 1) {
    return Ed(n, r);
  }
  const i = e[t - 1];
  const o = Xr(e, t - 1, n, r);
  if (ua(o, i)) {
    return o;
  } else {
    return Xr(e, t - 1, [...n, i], r);
  }
}
function Bd(e) {
  return [...e].sort((t, n) => Ro(t) - Ro(n) || kd(t, n));
}
function Ed(e, t) {
  if (e.length === 0) {
    return {
      center: Array(t).fill(0),
      r2: -1,
    };
  }
  let n = null;
  const r = 1 << e.length;
  for (let i = 1; i < r; i++) {
    const o = e.filter((a, c) => (i & (1 << c)) !== 0);
    const s = Id(o, t);
    if (s && e.every((a) => ua(s, a))) {
      n = n == null || s.r2 < n.r2 - mi(n.r2) ? s : n;
    }
  }
  return (
    n ?? {
      center: [...e[0]],
      r2: 0,
    }
  );
}
function Id(e, t) {
  if (e.length === 1) {
    return {
      center: [...e[0]],
      r2: 0,
    };
  }
  const n = e[0];
  const r = e.slice(1).map((c) => c.map((l, u) => l - n[u]));
  const i = r.map((c) => r.map((l) => Ao(c, l) * 2));
  const o = r.map((c) => Ao(c, c));
  const s = Vd(i, o);
  if (!s) {
    return null;
  }
  const a = [...n];
  for (let c = 0; c < r.length; c++) {
    for (let l = 0; l < t; l++) {
      a[l] += s[c] * r[c][l];
    }
  }
  return {
    center: a,
    r2: fa(a, n),
  };
}
function Vd(e, t) {
  const n = t.length;
  const r = e.map((i, o) => [...i, t[o]]);
  for (let i = 0; i < n; i++) {
    let o = i;
    for (let a = i + 1; a < n; a++) {
      if (Math.abs(r[a][i]) > Math.abs(r[o][i])) {
        o = a;
      }
    }
    if (Math.abs(r[o][i]) <= qs) {
      return null;
    }
    [r[i], r[o]] = [r[o], r[i]];
    const s = r[i][i];
    for (let a = i; a <= n; a++) {
      r[i][a] /= s;
    }
    for (let a = 0; a < n; a++) {
      if (a === i) {
        continue;
      }
      const c = r[a][i];
      for (let l = i; l <= n; l++) {
        r[a][l] -= c * r[i][l];
      }
    }
  }
  return r.map((i) => i[n]);
}
function ua(e, t) {
  return e.r2 >= 0 && fa(e.center, t) <= e.r2 + mi(e.r2);
}
function fa(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) {
    const i = e[r] - t[r];
    n += i * i;
  }
  return n;
}
function Ao(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) {
    n += e[r] * t[r];
  }
  return n;
}
function Ro(e) {
  let t = 2166136261;
  for (const n of e) {
    t = Math.imul(t ^ Math.round(n * 1024), 16777619);
  }
  return t >>> 0;
}
function kd(e, t) {
  for (let n = 0; n < e.length; n++) {
    if (e[n] !== t[n]) {
      return e[n] - t[n];
    }
  }
  return e.length - t.length;
}
async function Od(e, t, n, r, i, o, s = Be) {
  const a = await da(e, t, n, r, i, o, s, 1);
  const [c] = a;
  if (c == null) {
    return Zt;
  } else {
    return {
      passed: true,
      witnessPoiIds: c.witnesses.map((l) => l.poiId),
      pois: c.witnesses.map(_i),
      clusters: [
        {
          x: c.coords[0],
          z: c.coords[2],
          y: c.coords[1] ?? undefined,
          radius: i.radius.meters,
          members: i.members.map((l) => l.poi),
          witnessCount: c.witnesses.length,
        },
      ],
    };
  }
}
async function Md(e, t, n, r, i, o, s, a, c = Be) {
  const l = i * 16;
  const u = o * 16;
  const d = (i + s) * 16 - 1;
  const f = (o + a) * 16 - 1;
  const g = Math.max(0, r.radius.meters);
  const h = {
    centerX: (l + d) / 2,
    centerZ: (u + f) / 2,
    minX: Math.floor(l - g),
    maxX: Math.ceil(d + g),
    minZ: Math.floor(u - g),
    maxZ: Math.ceil(f + g),
  };
  const w = {
    shape: {
      kind: "square",
      inradius: (h.maxX - h.minX + 1) / 2,
    },
  };
  return (await da(t, n, w, h, r, e, c)).filter((x) => {
    const C = Math.floor(x.coords[0]);
    const I = Math.floor(x.coords[2]);
    return C >= l && C <= d && I >= u && I <= f;
  });
}
async function da(e, t, n, r, i, o, s, a) {
  if (i.members.length === 0) {
    return [];
  }
  const c = i.members.map((E) => E.poi.type);
  const l = await pi(o, e, c, r, s);
  const u = i.members.map((E) =>
    na(E.poi.type, E.poi.variantId, l[E.poi.type] ?? [], t, n, r),
  );
  for (let E = 0; E < i.members.length; E++) {
    if (u[E].length < i.members[E].minAmount) {
      return [];
    }
  }
  const d = [].concat(...u).map((E) => E.coords);
  const { meters: f, threeD: g } = i.radius;
  const h = f * f;
  const w = g && d.every((E) => E[1] != null);
  const b = (E, A) => Ys(E, A, w) <= h + mi(h);
  const x = [...d];
  let C = 0;
  if (w) {
    for (let E = 0; E < d.length; E++) {
      const A = d[E];
      for (let z = E + 1; z < d.length; z++) {
        if (++C % 250 === 0) {
          await s();
        }
        const F = d[z];
        const L = A[0] - F[0];
        const R = A[2] - F[2];
        const M = A[1] - F[1];
        if (L * L + R * R + M * M > h * 4) {
          continue;
        }
        const P = (A[1] + F[1]) / 2;
        x.push([(A[0] + F[0]) / 2, P, (A[2] + F[2]) / 2]);
        for (let U = z + 1; U < d.length; U++) {
          if (++C % 250 === 0) {
            await s();
          }
          const J = d[U];
          zf(x, A, F, J, h);
        }
      }
    }
  } else {
    for (let E = 0; E < d.length; E++) {
      for (let A = E + 1; A < d.length; A++) {
        if (++C % 250 === 0) {
          await s();
        }
        Ff(x, d[E], d[A], h);
      }
    }
  }
  const I = [];
  const V = [];
  const O = new Set();
  for (const E of x) {
    if (++C % 50 === 0) {
      await s();
    }
    const A = [];
    let z = true;
    for (let U = 0; U < i.members.length; U++) {
      const J = i.members[U].minAmount;
      let $ = 0;
      for (const G of u[U]) {
        if (b(E, G.coords)) {
          A.push(G);
          $++;
        }
      }
      if ($ < J) {
        z = false;
        break;
      }
    }
    if (!z) {
      continue;
    }
    const F = ud(A);
    const L = F.map((U) => U.poiId);
    const R = L.join("|");
    if (O.has(R)) {
      continue;
    }
    O.add(R);
    const M = Ad(F, w);
    const P = {
      coords: M.coords,
      maxDistance: M.maxDistance,
      witnesses: F,
    };
    if (Rd(I, V, P, L) && a !== undefined && I.length >= a) {
      return I;
    }
  }
  return I;
}
function Ad(e, t) {
  const n = Cd(
    e.map((i) => i.coords),
    t,
  );
  let r = 0;
  for (const i of e) {
    r = Math.max(r, Ys(i.coords, n, t));
  }
  return {
    coords: n,
    maxDistance: Math.sqrt(r),
  };
}
function Rd(e, t, n, r) {
  const i = new Set(r);
  for (const o of t) {
    if (Fo(i, o)) {
      return false;
    }
  }
  for (let o = e.length - 1; o >= 0; o--) {
    if (Fo(t[o], i)) {
      e.splice(o, 1);
      t.splice(o, 1);
    }
  }
  e.push(n);
  t.push(i);
  return true;
}
function Fo(e, t) {
  for (const n of e) {
    if (!t.has(n)) {
      return false;
    }
  }
  return true;
}
async function Fd(e, t, n, r, i, o, s, a, c, l, u = Be, d = false) {
  const f = Ld(e, t, n, o, s, c);
  const g = new Set(s);
  const h = cn(e, n, a);
  const w = sr(i, h, d);
  const b = sa(e, n, i, h, w);
  if (b !== null) {
    const x = await zo(e, n, r, i, f, o, g, l, u, b, Vt(i, h, b), w, false);
    switch (o) {
      case "includes-all":
      case "includes-any":
        if (x) {
          return true;
        }
        break;
      case "excludes-all":
      case "limited-to":
        if (!x) {
          return false;
        }
        break;
    }
  }
  return zo(e, n, r, i, f, o, g, l, u, h, Vt(i, h, h), w, true);
}
async function zo(e, t, n, r, i, o, s, a, c, l, u, d, f) {
  const g = new Set();
  let h = true;
  for (const w of i) {
    const b = await ar(a, e, t, r, w.options, c, l, u, d);
    if (w.gateLand) {
      if (await Nd(e, t, n, r, b, o, s, g, c, f)) {
        h = false;
      }
    } else {
      await an(b, n, r, c, (x) => {
        const C = b.biomes[x];
        if (s.has(C)) {
          g.add(C);
        } else if (o === "limited-to") {
          h = false;
        }
      });
    }
    switch (o) {
      case "includes-all":
        if (g.size === s.size) {
          return true;
        }
        break;
      case "includes-any":
        if (g.size > 0) {
          return true;
        }
        break;
      case "excludes-all":
        if (g.size > 0) {
          return false;
        }
        break;
      case "limited-to":
        if (!h) {
          return false;
        }
        break;
    }
  }
  switch (o) {
    case "includes-all":
      return g.size === s.size;
    case "includes-any":
      return g.size > 0;
    case "excludes-all":
      return g.size === 0;
    case "limited-to":
      return h && (!f || g.size > 0);
  }
}
async function zd(e, t, n, r, i, o, s, a, c, l = Be, u = false) {
  const d = bi(t, n);
  const f = cn(e, n, a);
  const g = sr(i, f, u);
  const h = sa(e, n, i, f, g);
  if (h !== null) {
    const b = await Lo(e, n, r, i, d, s, c, l, h, Vt(i, f, h), g);
    switch (o) {
      case "at-least":
        if (b.size >= s) {
          return true;
        }
        break;
      case "at-most":
      case "exactly":
        if (b.size > s) {
          return false;
        }
        break;
    }
  }
  const w = await Lo(e, n, r, i, d, s, c, l, f, Vt(i, f, f), g);
  switch (o) {
    case "at-least":
      return w.size >= s;
    case "at-most":
      return w.size <= s;
    case "exactly":
      return w.size === s;
  }
}
async function Lo(e, t, n, r, i, o, s, a, c, l, u) {
  const d = new Set();
  for (const f of i) {
    const g = await ar(s, e, t, r, ca(f), a, c, l, u);
    await an(g, n, r, a, (h) => {
      d.add(g.biomes[h]);
    });
    if (d.size > o) {
      return d;
    }
  }
  return d;
}
function Ld(e, t, n, r, i, o) {
  if (o !== undefined && n === y.Overworld && e[n] instanceof qe) {
    const s = o.kind === "surface" && o.surfaceKind === "land";
    return [
      {
        options: aa(o),
        gateLand: s,
      },
    ];
  }
  return Pd(t, n, r, i).map((s) => ({
    options: ca(s),
    gateLand: false,
  }));
}
function Pd(e, t, n, r) {
  const i = bi(e, t);
  if (n !== "includes-all" && n !== "includes-any") {
    return i;
  }
  const o = new Set();
  for (const s of r) {
    const a = pc(s);
    if (vd(a)) {
      o.add(a);
    }
  }
  return i.filter((s) => o.has(s));
}
async function Nd(e, t, n, r, i, o, s, a, c, l) {
  const u = [];
  let d = i.xLen;
  let f = -1;
  let g = -1;
  await an(i, n, r, c, (I) => {
    if (!(o === "limited-to" ? l || !s.has(i.biomes[I]) : s.has(i.biomes[I]))) {
      return;
    }
    u.push(I);
    const O = I % i.xLen;
    const E = Math.floor(I / i.xLen);
    if (O < d) {
      d = O;
    }
    if (O > f) {
      f = O;
    }
    if (E > g) {
      g = E;
    }
  });
  if (u.length === 0) {
    return false;
  }
  const h = f - d + 1;
  const w = Math.max(1, Math.floor(ia / h));
  let b = 0;
  let x = 0;
  let C = null;
  for (const I of u) {
    const V = I % i.xLen;
    const O = Math.floor(I / i.xLen);
    if (O >= x) {
      await c();
      b = O;
      x = Math.min(g + 1, O + w);
      ({ heights: C } = Me(
        e,
        t,
        i.xQ0 + d * i.stepQ,
        i.zQ0 + b * i.stepQ,
        h,
        x - b,
        i.stepQ,
        {
          mode: "heights",
          getHeightLevelAt: "oceanFloor",
          surfaceCheckType: "fastApproximate",
        },
      ));
    }
    if (C !== null && C[(O - b) * h + (V - d)] < hi) {
      continue;
    }
    const E = i.biomes[I];
    if (s.has(E)) {
      a.add(E);
      if (o === "includes-all") {
        if (a.size === s.size) {
          break;
        }
      } else if (o !== "limited-to") {
        break;
      }
    } else {
      return true;
    }
  }
  return false;
}
async function Hd(e, t, n, r, i, o, s, a, c = Be, l = false) {
  if (i === undefined && o === undefined) {
    return true;
  }
  const u = cn(e, t, s);
  const d = await ar(
    a,
    e,
    t,
    r,
    {
      mode: "heights",
      getHeightLevelAt: "oceanFloor",
      surfaceCheckType: "fastApproximate",
    },
    c,
    u,
    u > 1 ? wi(r, u) : or,
    sr(r, u, l),
  );
  if (!d.heights) {
    return true;
  }
  const f = [];
  let g = Infinity;
  let h = -Infinity;
  await an(d, n, r, c, (x) => {
    const C = d.heights[x];
    f.push(C);
    if (C < g) {
      g = C;
    }
    if (C > h) {
      h = C;
    }
  });
  if (f.length === 0) {
    return true;
  }
  const w = ga(f, g, h);
  const b = g + $r(w, Math.floor(f.length / 2));
  return (i === undefined || !(b < i)) && (o === undefined || !(b > o));
}
async function Dd(e, t, n, r, i, o, s, a, c = Be, l = false) {
  const u = cn(e, t, s);
  const d = await ar(
    a,
    e,
    t,
    r,
    {
      mode: "heights",
      getHeightLevelAt: "oceanFloor",
      surfaceCheckType: "fastApproximate",
    },
    c,
    u,
    u > 1 ? wi(r, u) : or,
    sr(r, u, l),
  );
  if (!d.heights) {
    return true;
  }
  const f = [];
  const g = new Uint8Array(d.heights.length);
  let h = Infinity;
  let w = -Infinity;
  await an(d, n, r, c, (R) => {
    const M = d.heights[R];
    f.push(M);
    g[R] = 1;
    if (M < h) {
      h = M;
    }
    if (M > w) {
      w = M;
    }
  });
  if (f.length === 0) {
    return true;
  }
  const b = ga(f, h, w);
  const x = Math.min(
    f.length - 1,
    Math.max(0, Math.floor((i.lowerPercentile / 100) * f.length)),
  );
  const C = Math.min(
    f.length - 1,
    Math.max(0, Math.ceil((i.upperPercentile / 100) * f.length) - 1),
  );
  const I = h + $r(b, x);
  if (h + $r(b, C) - I > hd(i.maxBlocksAt128, n)) {
    return false;
  }
  const O = d.heights;
  const E = new Int32Array(w - h + 1);
  let A = 0;
  for (let R = 0; R < d.zLen; R++) {
    await c();
    for (let M = 0; M < d.xLen; M++) {
      const P = R * d.xLen + M;
      if (g[P]) {
        if (M + 1 < d.xLen && g[P + 1]) {
          E[Math.abs(O[P + 1] - O[P])]++;
          A++;
        }
        if (R + 1 < d.zLen && g[P + d.xLen]) {
          E[Math.abs(O[P + d.xLen] - O[P])]++;
          A++;
        }
      }
    }
  }
  if (A === 0) {
    return true;
  }
  const z = Math.max(1, Math.ceil(A * 0.95));
  let F = 0;
  let L = z;
  for (let R = 0; R < E.length && L > 0; R++) {
    const M = Math.min(E[R], L);
    F += R * M;
    L -= M;
  }
  return F / (u * 4) / z <= o;
}
function ga(e, t, n) {
  const r = new Int32Array(n - t + 1);
  for (const i of e) {
    r[i - t]++;
  }
  return r;
}
function $r(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++) {
    n += e[r];
    if (n > t) {
      return r;
    }
  }
  return e.length - 1;
}
async function ma(e, t, n, r, i, o, s, a, c = Be, l = false) {
  const u = [];
  const d = [];
  const f = [];
  for (const g of s) {
    const h = Jf(g, i, o);
    for (const w of g.conditions) {
      const b = await Wd(e, t, n, r, g, h, w, a, c, l);
      if (!b.passed) {
        return Zt;
      }
      u.push(...b.witnessPoiIds);
      d.push(...b.pois);
      f.push(...b.clusters);
    }
  }
  return {
    passed: true,
    witnessPoiIds: u,
    pois: d,
    clusters: f,
  };
}
async function Wd(e, t, n, r, i, o, s, a, c, l) {
  switch (s.kind) {
    case "poi-presence":
      return Sd(e, t, n, r, i, o, s.poi, s.minAmount, s.biomeAtPos, a, c);
    case "poi-cluster":
      return Od(t, n, i, o, s, a, c);
    case "biome-filter":
      return yn(
        await Fd(
          e,
          n,
          r,
          i,
          o,
          s.mode,
          s.biomes,
          s.sampleGrid,
          s.scanHeight,
          a,
          c,
          l,
        ),
      );
    case "biome-variance":
      return yn(
        await zd(e, n, r, i, o, s.comparator, s.count, s.sampleGrid, a, c, l),
      );
    case "terrain-height":
      return yn(await Hd(e, r, i, o, s.minY, s.maxY, s.sampleGrid, a, c, l));
    case "flatness":
      return yn(
        await Dd(e, r, i, o, s.range, s.maxAverageSlope, s.sampleGrid, a, c, l),
      );
  }
}
function yn(e) {
  if (e) {
    return Zf;
  } else {
    return Zt;
  }
}
const Gd = 400;
const vi = 1;
const fe = 10;
const Ln = 4;
const oe = 4;
const se = 2;
const jd = 255;
function Si(e) {
  const t = e * Ln;
  if (t % se !== 0) {
    throw new Error(
      `Biome patch tile quart length ${t} must be divisible by stride ${se}`,
    );
  }
  return t / se;
}
function Pn(e, t, n = 1) {
  const r = Math.max(vi, t);
  const i = n * oe;
  return e * i * i >= r;
}
function xi(e, t) {
  const n = e.qStride * oe;
  return {
    blocks: e.cellCount * n * n,
    kind: t,
  };
}
function Ud(e, t) {
  return {
    blocks: (e.maxX - e.minX + 1) * (e.maxZ - e.minZ + 1),
    kind: t,
  };
}
function Zd(e) {
  const t = Si(e);
  return fe * fe * t * t;
}
function ha(e) {
  return {
    minX: e.minQX * oe,
    maxX: e.maxQX * oe + e.qStride * oe - 1,
    minZ: e.minQZ * oe,
    maxZ: e.maxQZ * oe + e.qStride * oe - 1,
  };
}
function pa(e) {
  const t = (e.qStride * oe) / 2;
  return {
    worldX: Math.round((e.sumQX / e.cellCount) * oe + t),
    worldZ: Math.round((e.sumQZ / e.cellCount) * oe + t),
  };
}
function _a(e) {
  return {
    worldX: Math.round((e.minX + e.maxX) / 2),
    worldZ: Math.round((e.minZ + e.maxZ) / 2),
  };
}
function ya(e, t) {
  const n = D(e.scanTileX, fe) * fe;
  const r = D(e.scanTileZ, fe) * fe;
  const i = n * t * 16;
  const o = r * t * 16;
  const s = fe * t * 16;
  return {
    minX: i,
    maxX: i + s - 1,
    minZ: o,
    maxZ: o + s - 1,
  };
}
function Ci(e) {
  const t = new Uint8Array(Math.max(...e) + 1);
  for (const n of e) {
    t[n] = 1;
  }
  return t;
}
function Jd(e) {
  return e.scanHeight.kind === "surface" && e.scanHeight.surfaceKind === "land";
}
function Xd(e, t, n, r, i) {
  return `biome-patch-tile:${Lr(e)}:${t.dimension}:${r}:${n}:stride=${se}:${i}:`;
}
function Ti(e, t, n, r, i, o, s, a) {
  const c = a + r + "," + i;
  const l = Xa(c);
  if (l) {
    return l;
  }
  const u = D(r, o);
  const d = D(i, o);
  const f = Si(o);
  const g = r * Ln;
  const h = i * Ln;
  const w = Jd(n.anchor);
  const { biomes: b } = Me(
    t,
    n.dimension,
    g,
    h,
    f,
    f,
    se,
    aa(n.anchor.scanHeight),
  );
  let x = false;
  let C = b.length > 0;
  let I = f;
  let V = -1;
  let O = f;
  let E = -1;
  for (let z = 0; z < b.length; z++) {
    const F = s[b[z]] === 1;
    x = x || F;
    C = C && F;
    if (w && F) {
      const L = z % f;
      const R = Math.floor(z / f);
      if (L < I) {
        I = L;
      }
      if (L > V) {
        V = L;
      }
      if (R < O) {
        O = R;
      }
      if (R > E) {
        E = R;
      }
    }
  }
  if (w && x) {
    const z = V - I + 1;
    const F = E - O + 1;
    const { heights: L } = Me(
      t,
      n.dimension,
      g + I * se,
      h + O * se,
      z,
      F,
      se,
      {
        mode: "heights",
        getHeightLevelAt: "oceanFloor",
        surfaceCheckType: "fastApproximate",
      },
    );
    if (L) {
      x = false;
      let R = false;
      for (let M = 0; M < F; M++) {
        for (let P = 0; P < z; P++) {
          const U = (O + M) * f + (I + P);
          if (s[b[U]] === 1) {
            if (L[M * z + P] < hi) {
              b[U] = jd;
              R = true;
            } else {
              x = true;
            }
          }
        }
      }
      C = C && !R;
    }
  }
  const A = {
    chunkX: r,
    chunkZ: i,
    scanTileX: u,
    scanTileZ: d,
    qX0: g,
    qZ0: h,
    qLen: f,
    qStride: se,
    biomes: b,
    anyTarget: x,
    allTarget: C,
  };
  $a(c, A);
  return A;
}
async function $d(e, t, n, r, i, o, s, a) {
  const c = D(r.scanTileX, fe) * fe;
  const l = D(r.scanTileZ, fe) * fe;
  for (let u = 0; u < fe; u++) {
    for (let d = 0; d < fe; d++) {
      await a();
      if (!Ti(e, t, n, (c + d) * i, (l + u) * i, i, o, s).allTarget) {
        return false;
      }
    }
  }
  return true;
}
const Qd = 67108864;
function Kd(e, t, n, r) {
  const i = e.qLen;
  const o = [n];
  let s = 0;
  r[n] = 1;
  let a = 0;
  let c = 0;
  let l = 0;
  let u = Infinity;
  let d = -Infinity;
  let f = Infinity;
  let g = -Infinity;
  let h = false;
  while (s < o.length) {
    const w = o[s++];
    const b = w % i;
    const x = Math.floor(w / i);
    const C = e.qX0 + b * e.qStride;
    const I = e.qZ0 + x * e.qStride;
    a++;
    c += C;
    l += I;
    u = Math.min(u, C);
    d = Math.max(d, C);
    f = Math.min(f, I);
    g = Math.max(g, I);
    h = h || b === 0 || x === 0 || b === i - 1 || x === i - 1;
    for (let V = -1; V <= 1; V++) {
      for (let O = -1; O <= 1; O++) {
        if (O === 0 && V === 0) {
          continue;
        }
        const E = b + O;
        const A = x + V;
        if (!(E < 0) && !(E >= i) && !(A < 0) && !(A >= i)) {
          qd(o, r, e, t, A * i + E);
        }
      }
    }
  }
  return {
    qStride: e.qStride,
    seedQX: e.qX0 + (n % i) * e.qStride,
    seedQZ: e.qZ0 + Math.floor(n / i) * e.qStride,
    cellCount: a,
    sumQX: c,
    sumQZ: l,
    minQX: u,
    maxQX: d,
    minQZ: f,
    maxQZ: g,
    touchesEdge: h,
  };
}
function qd(e, t, n, r, i) {
  if (!t[i] && r[n.biomes[i]] === 1) {
    t[i] = 1;
    e.push(i);
  }
}
async function Yd(e, t, n, r, i, o, s, a, c, l) {
  const u = Si(r);
  const d = r * Ln;
  const f = new Map();
  const g = new Set();
  const h = [];
  const w = [];
  let b = 0;
  let x = 0;
  let C = 0;
  let I = 0;
  let V = Infinity;
  let O = -Infinity;
  let E = Infinity;
  let A = -Infinity;
  let z = null;
  const F = () => ({
    exceededMaxTiles: true,
    filledArea: xi(
      {
        qStride: se,
        cellCount: z ?? x,
      },
      "lower-bound",
    ),
  });
  let L = null;
  let R = null;
  let M = 0;
  let P = 0;
  const U = (J, $) => {
    let G = L;
    if (
      G === null ||
      J < G.qX0 ||
      J >= G.qX0 + P ||
      $ < G.qZ0 ||
      $ >= G.qZ0 + P
    ) {
      const de = D(J, d);
      const ie = D($, d);
      G = Ti(e, t, n, de * r, ie * r, r, i, c);
      L = G;
      P = G.qLen * G.qStride;
      M = de * Qd + ie;
      R = f.get(M) ?? null;
    }
    const ee = Math.floor((J - G.qX0) / G.qStride);
    const te = Math.floor(($ - G.qZ0) / G.qStride) * u + ee;
    if (i[G.biomes[te]] !== 1) {
      return true;
    }
    let Q = R;
    if (Q === null) {
      Q = new Uint8Array(G.biomes.length);
      f.set(M, Q);
      R = Q;
    }
    if (Q[te]) {
      return true;
    } else {
      Q[te] = 1;
      g.add(M);
      if (g.size > Gd && Pn(x + 1, a, se)) {
        z = x + 1;
        return false;
      } else {
        h.push(J);
        w.push($);
        x++;
        C += J;
        I += $;
        V = Math.min(V, J);
        O = Math.max(O, J);
        E = Math.min(E, $);
        A = Math.max(A, $);
        return true;
      }
    }
  };
  if (!U(o, s)) {
    return F();
  }
  while (b < h.length) {
    if (b % 50 === 0) {
      await l();
    }
    const J = h[b];
    const $ = w[b];
    b++;
    for (let G = -1; G <= 1; G++) {
      for (let ee = -1; ee <= 1; ee++) {
        if ((ee !== 0 || G !== 0) && !U(J + ee * se, $ + G * se)) {
          return F();
        }
      }
    }
  }
  return {
    exceededMaxTiles: false,
    qStride: se,
    cellCount: x,
    sumQX: C,
    sumQZ: I,
    minQX: V,
    maxQX: O,
    minQZ: E,
    maxQZ: A,
  };
}
function wa(e, t, n, r) {
  return [
    "biome-patch",
    e.dimension,
    n,
    t,
    "finite",
    `stride=${r.qStride}`,
    r.minQX,
    r.minQZ,
    r.maxQX,
    r.maxQZ,
    r.cellCount,
  ].join(":");
}
function ba(e, t, n, r) {
  const i = D(t.scanTileX, fe);
  const o = D(t.scanTileZ, fe);
  return ["biome-patch", e.dimension, r, n, "split", `stride=${se}`, i, o].join(
    ":",
  );
}
function eg(e) {
  return [...new Set(e)].sort((t, n) => t - n).join(",");
}
function tg(e) {
  if (e.kind === "fixed") {
    return `fixed:${e.y}`;
  } else if (e.kind === "surface") {
    return `surface:${e.surfaceKind}`;
  } else {
    return e.kind;
  }
}
async function ng(e, t, n, r, i, o, s, a) {
  const c = n.anchor;
  if (c.biomes.length === 0) {
    return [];
  }
  const l = Ci(c.biomes);
  const u = eg(c.biomes);
  const d = tg(c.scanHeight);
  const f = Xd(t, n, u, d, o);
  const g = Ti(s, e, n, r, i, o, l, f);
  if (!g.anyTarget) {
    return [];
  }
  const h = [];
  const w = c.minPatchSize ?? vi;
  if (g.allTarget && Pn(Zd(o), w, se) && (await $d(s, e, n, g, o, l, f, a))) {
    const x = ya(g, o);
    return [
      Po(n, {
        dedupeKey: ba(n, g, u, d),
        center: _a(x),
        bounds: x,
        filledArea: Ud(x, "lower-bound"),
        split: true,
      }),
    ];
  }
  const b = new Uint8Array(g.biomes.length);
  for (let x = 0; x < g.biomes.length; x++) {
    if (x % 1000 === 0) {
      await a();
    }
    if (b[x] || l[g.biomes[x]] !== 1) {
      continue;
    }
    const C = Kd(g, l, x, b);
    const I = C.touchesEdge
      ? await rg(s, e, n, g, o, l, u, d, f, C, a)
      : Pn(C.cellCount, w, C.qStride)
        ? {
            dedupeKey: wa(n, u, d, {
              qStride: C.qStride,
              cellCount: C.cellCount,
              minQX: C.minQX,
              maxQX: C.maxQX,
              minQZ: C.minQZ,
              maxQZ: C.maxQZ,
            }),
            center: pa(C),
            bounds: ha(C),
            filledArea: xi(C, "exact"),
            split: false,
          }
        : null;
    if (I) {
      h.push(Po(n, I));
    }
  }
  return h;
}
async function rg(e, t, n, r, i, o, s, a, c, l, u) {
  const d = n.anchor.minPatchSize ?? vi;
  const f = await Yd(e, t, n, i, o, l.seedQX, l.seedQZ, d, c, u);
  if (f.exceededMaxTiles) {
    const g = ya(r, i);
    return {
      dedupeKey: ba(n, r, s, a),
      center: _a(g),
      bounds: g,
      filledArea: f.filledArea,
      split: true,
    };
  }
  if (Pn(f.cellCount, d, f.qStride)) {
    return {
      dedupeKey: wa(n, s, a, f),
      center: pa(f),
      bounds: ha(f),
      filledArea: xi(f, "exact"),
      split: false,
    };
  } else {
    return null;
  }
}
function Po(e, t) {
  const { worldX: n, worldZ: r } = t.center;
  return {
    worldX: n,
    worldZ: r,
    chunk: [n >> 4, r >> 4],
    data: {
      type: "biome-patch",
      biomes: e.anchor.biomes,
      scanHeight: e.anchor.scanHeight,
      minPatchSize: e.anchor.minPatchSize,
      bounds: t.bounds,
      filledArea: t.filledArea,
      split: t.split,
    },
    dedupeKey: t.dedupeKey,
    anchorPois: [],
    regionPois: [],
  };
}
const ig = new Set([
  m.SlimeChunk,
  m.Dungeon,
  m.Fossil,
  m.FossilNether,
  m.AmethystGeode,
  m.Cave,
  m.LavaPool,
]);
function og(e) {
  return e.anchor.kind === "poi" && ig.has(e.anchor.poi.type);
}
async function sg(e, t, n, r, i, o) {
  let a = 0;
  const c = es(o);
  try {
    const l = Rt(e);
    const { poiFinder: u, providers: d } = Lt(l);
    const f = new Map();
    const g = await ag(d, u, l, t, n, r, i, f, c);
    if (t.regions.length === 0) {
      a = g.length;
      return g;
    }
    const h = og(t);
    const w = [];
    for (const b of g) {
      await c();
      const x = await ma(
        d,
        u,
        l,
        t.dimension,
        b.worldX,
        b.worldZ,
        t.regions,
        f,
        c,
        h,
      );
      if (x.passed) {
        b.regionPois = x.pois.map((C) => C.poiId);
        w.push(b);
      }
    }
    a = w.length;
    return w;
  } catch (l) {
    if (l instanceof Et) {
      return [];
    }
    throw l;
  }
}
async function ag(e, t, n, r, i, o, s, a, c) {
  switch (r.anchor.kind) {
    case "biome-patch":
      return ng(e, n, r, i, o, s, a, c);
    case "cluster":
      return (await Md(a, t, n, r.anchor, i, o, s, s, c)).map((u) => {
        const d = u.witnesses.map((f) => f.poiId);
        return {
          worldX: u.coords[0],
          worldY: u.coords[1] ?? undefined,
          worldZ: u.coords[2],
          chunk: [u.coords[0] >> 4, u.coords[2] >> 4],
          data: {
            type: "cluster",
            maxDistance: u.maxDistance,
          },
          dedupeKey: `witness:${d.join("|")}`,
          anchorPois: d,
          regionPois: [],
        };
      });
    case "poi": {
      const l = r.anchor.poi;
      const d = (await ld(a, t, [l.type], i, o, s, s, c))[l.type]?.filter(
        (g) => g[0] >= i && g[0] < i + s && g[1] >= o && g[1] < o + s,
      );
      if (!d) {
        return [];
      }
      const f = [];
      for (const g of yi(l.type, l.variantId, d, n)) {
        if (
          r.anchor.biomesAtPos === undefined ||
          !(await c(),
          !la(e, n, r.dimension, l.type, g.coords, r.anchor.biomesAtPos))
        ) {
          f.push({
            worldX: g.coords[0],
            worldZ: g.coords[2],
            chunk: g.chunk,
            data: {
              type: "poi",
              poiData: g.data,
            },
            anchorPois: [g.poiId],
            regionPois: [],
          });
        }
      }
      return f;
    }
  }
}
const No = 16;
const Re = 16;
const cg = 67108864;
const Ho = Ci(Fr.IS_OCEAN);
const lg = [...Fr.IS_BEACH, ...Fr.IS_RIVER];
async function ug(e, t, n, r, i, o, s) {
  const a = cn(e, t, i.sampleGrid);
  const c = n >> 2;
  const l = r >> 2;
  const u = a * a;
  const d = i.minChunks * No;
  const f = i.maxChunks * No;
  const g = Re * a;
  const h = `island-tile:${t}:s${a}:a${c},${l}:`;
  const w = new Uint32Array(256);
  const b = new Map();
  const x = [];
  const C = [];
  let I = 0;
  let V = 0;
  let O = Infinity;
  let E = -Infinity;
  let A = Infinity;
  let z = -Infinity;
  let F = Infinity;
  let L = Infinity;
  let R = new Uint8Array(0);
  let M = null;
  let P = 0;
  const U = (te, Q) => {
    F = te;
    L = Q;
    P = te * cg + Q;
    const de = h + te + "," + Q;
    let ie = o.get(de);
    if (ie === undefined) {
      ({ biomes: ie } = Me(e, t, c + te * g, l + Q * g, Re, Re, a, {
        mode: "biomes",
        getBiomesAt: "depth0",
      }));
      o.set(de, ie);
    }
    R = ie;
    M = b.get(P) ?? null;
  };
  const J = (te, Q) => {
    const de = D(te, Re);
    const ie = D(Q, Re);
    if (de !== F || ie !== L) {
      U(de, ie);
    }
    const va = te - de * Re;
    const lr = (Q - ie * Re) * Re + va;
    const Bi = R[lr];
    if (Ho[Bi] === 1) {
      return true;
    }
    let St = M;
    if (St === null) {
      St = new Uint8Array(Re * Re);
      b.set(P, St);
      M = St;
    }
    if (St[lr]) {
      return true;
    } else {
      St[lr] = 1;
      V += u;
      if (V > f) {
        return false;
      } else {
        w[Bi]++;
        if (te < O) {
          O = te;
        }
        if (te > E) {
          E = te;
        }
        if (Q < A) {
          A = Q;
        }
        if (Q > z) {
          z = Q;
        }
        x.push(te);
        C.push(Q);
        return true;
      }
    }
  };
  const { biomes: $ } = Me(e, t, c, l, 1, 1, a, {
    mode: "biomes",
    getBiomesAt: "depth0",
  });
  if (Ho[$[0]] === 1 || (U(0, 0), !J(0, 0))) {
    return null;
  }
  while (I < x.length) {
    if (I % 50 === 0) {
      await s();
    }
    const te = x[I];
    const Q = C[I];
    I++;
    for (let de = -1; de <= 1; de++) {
      for (let ie = -1; ie <= 1; ie++) {
        if ((ie !== 0 || de !== 0) && !J(te + ie, Q + de)) {
          return null;
        }
      }
    }
  }
  if (V < d || !fg(i, w)) {
    return null;
  }
  const G = a * oe;
  const ee = c * oe;
  const cr = l * oe;
  return {
    bounds: {
      minX: ee + O * G,
      maxX: ee + (E + 1) * G - 1,
      minZ: cr + A * G,
      maxZ: cr + (z + 1) * G - 1,
    },
    filledArea: {
      blocks: V * oe * oe,
      kind: a === 1 ? "exact" : "estimate",
    },
  };
}
function fg(e, t) {
  switch (e.mode) {
    case "any":
      return true;
    case "includes-any":
      return e.biomes.some((n) => t[n] > 0);
    case "includes-all":
      return e.biomes.every((n) => t[n] > 0);
    case "excludes-all":
      return !e.biomes.some((n) => t[n] > 0);
    case "limited-to": {
      const n = Ci([...e.biomes, ...lg]);
      for (let r = 0; r < t.length; r++) {
        if (t[r] > 0 && n[r] !== 1) {
          return false;
        }
      }
      return e.biomes.some((r) => t[r] > 0);
    }
  }
}
function dg() {
  const e = Math.floor(Math.random() * 4294967296);
  const t = Math.floor(Math.random() * 4294967296);
  return k.fromBits(t, e).toString();
}
const Do = 10000;
async function gg(e, t, n, r, i, o) {
  if (t.kind === "random" && (o === undefined || !(o > 0) || !(o <= Do))) {
    throw new Error(
      `findSeeds: a random seed source requires a batch budget in (0, ${Do}] ms, got ${o}`,
    );
  }
  const s = performance.now();
  const a = mg(t);
  const c = es(r);
  const l = async () => {
    if (i !== undefined && Date.now() >= i) {
      throw new Et();
    }
    await c();
    if (i !== undefined && Date.now() >= i) {
      throw new Et();
    }
  };
  const u = [];
  let d = 0;
  const f = () => o === undefined || performance.now() - s < o;
  try {
    for (let g = a(); g !== null && f(); g = a()) {
      await l();
      const h = await hg(e, g, n, l);
      d++;
      if (h !== null) {
        u.push(h);
      }
    }
  } catch (g) {
    if (!(g instanceof Et)) {
      throw g;
    }
  }
  return {
    matches: u,
    scannedCount: d,
  };
}
function mg(e) {
  switch (e.kind) {
    case "random": {
      const { use32Bit: t } = e;
      return () => {
        const n = dg();
        if (t) {
          return `${k.fromString(n).toInt()}`;
        } else {
          return n;
        }
      };
    }
    case "list": {
      let t = 0;
      return () => (t < e.seeds.length ? e.seeds[t++] : null);
    }
  }
}
async function hg(e, t, n, r) {
  const i = Rt({
    ...e,
    seed: t,
  });
  const { providers: o, poiFinder: s } = Lt(i);
  const a = new Map();
  const c = await bg(s, i, n);
  const l = {
    providers: o,
    poiFinder: s,
    world: i,
    cache: a,
    checkpoint: r,
    anchorX: c.x,
    anchorZ: c.z,
    regionPois: {},
    clusters: {},
    islands: {},
  };
  for (const [u, d] of Object.entries(n.anchorConditions)) {
    if (d.length === 0) {
      continue;
    }
    const f = d.filter(pg);
    if (f.length > 0 && !(await Wo(l, u, [_g(f)]))) {
      return null;
    }
    for (const g of d) {
      if (g.kind === "anchor-island" && !(await wg(l, u, g))) {
        return null;
      }
    }
  }
  for (const [u, d] of Object.entries(n.regions)) {
    if (d.length !== 0 && !(await Wo(l, u, d))) {
      return null;
    }
  }
  return {
    seed: t,
    anchorX: c.x,
    anchorZ: c.z,
    anchorPois: c.pois,
    regionPois: l.regionPois,
    clusters: l.clusters,
    islands: l.islands,
  };
}
async function Wo(e, t, n) {
  const [r, i] = ra(e.anchorX, e.anchorZ, t);
  const o = await ma(
    e.providers,
    e.poiFinder,
    e.world,
    t,
    r,
    i,
    n,
    e.cache,
    e.checkpoint,
    false,
  );
  if (o.passed) {
    if (o.pois.length > 0) {
      e.regionPois[t] = [...(e.regionPois[t] ?? []), ...o.pois];
    }
    if (o.clusters.length > 0) {
      e.clusters[t] = [...(e.clusters[t] ?? []), ...o.clusters];
    }
    return true;
  } else {
    return false;
  }
}
function pg(e) {
  return e.kind !== "anchor-island";
}
function _g(e) {
  return {
    shape: {
      kind: "square",
      inradius: 0,
    },
    conditions: e.map(yg),
  };
}
function yg(e) {
  switch (e.kind) {
    case "anchor-biome":
      return {
        kind: "biome-filter",
        mode: e.mode === "in" ? "includes-any" : "excludes-all",
        biomes: e.biomes,
      };
    case "anchor-terrain-height":
      return {
        kind: "terrain-height",
        minY: e.minY,
        maxY: e.maxY,
      };
  }
}
async function wg(e, t, n) {
  const [r, i] = ra(e.anchorX, e.anchorZ, t);
  const o = await ug(e.providers, t, r, i, n, e.cache, e.checkpoint);
  if (o === null) {
    return false;
  } else {
    e.islands[t] = [...(e.islands[t] ?? []), o];
    return true;
  }
}
async function bg(e, t, n) {
  switch (n.anchor.kind) {
    case "origin":
      return {
        x: 0,
        z: 0,
        pois: [],
      };
    case "custom":
      return {
        x: n.anchor.x,
        z: n.anchor.z,
        pois: [],
      };
    case "spawn": {
      const r = Ks(m.Spawn, t);
      if (r === null) {
        throw new Error("spawn anchor: expected a finite generation area");
      }
      const i = (await e(r, [m.Spawn]))[m.Spawn] ?? [];
      const o = yi(m.Spawn, undefined, i, t)[0];
      if (o == null) {
        throw new Error("spawn anchor: unsupported world");
      }
      return {
        x: o.coords[0],
        z: o.coords[2],
        pois: [_i(o)],
      };
    }
  }
}
async function vg(e, t) {
  if (t.anchor.kind !== "poi") {
    return {
      kind: "unbounded",
    };
  }
  const n = Rt(e);
  const r = t.anchor.poi.type;
  const i = Ks(r, n);
  if (i === null) {
    return {
      kind: "unbounded",
    };
  }
  const { poiFinder: o } = Lt(n);
  const s = (await o(i, [r]))[r] ?? [];
  const a = new Set();
  const c = [];
  for (const l of s) {
    const u = `${l[0]},${l[1]}`;
    if (!a.has(u)) {
      a.add(u);
      c.push([l[0], l[1]]);
    }
  }
  return {
    kind: "finite",
    chunks: c,
  };
}
function Sg(e) {
  ja(e);
  Qa();
}
async function xg() {
  await Wa();
}
self.addEventListener("unhandledrejection", (e) => {
  throw e.reason;
});
var Cg = Object.freeze({
  __proto__: null,
  cancelTask: Sg,
  findSeeds: gg,
  getAnchorDomain: vg,
  getBiomeTileData: Nf,
  getNoiseBiomeYColumnOverworld: jf,
  getPois: Uf,
  initWorker: xg,
  scanTile: sg,
  setSharedContextCallback: Rf,
});
Qr(Cg);
/*! Chunk Base (c) Alexander Gundermann - https://www.chunkbase.com - unauthorized copying prohibited */
//# chunkId=019fb98d-ff79-7831-a0b6-94310238695c!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="019fb98d-ff79-7831-a0b6-94310238695c")}catch(e){}}();const Go=Symbol("Comlink.proxy"),Sa=Symbol("Comlink.endpoint"),xa=Symbol("Comlink.releaseProxy"),ur=Symbol("Comlink.finalizer"),wn=Symbol("Comlink.thrown"),jo=e=>typeof e=="object"&&e!==null||typeof e=="function",Ca={canHandle:e=>jo(e)&&e[Go],serialize(e){const{port1:t,port2:n}=new MessageChannel;return Qr(e,t),[n,[n]]},deserialize(e){return e.start(),Ia(e)}},Ta={canHandle:e=>jo(e)&&wn in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},Uo=new Map([["proxy",Ca],["throw",Ta]]);function Ba(e,t){for(const n of e)if(t===n||n==="*"||n instanceof RegExp&&n.test(t))return!0;return!1}function Qr(e,t=globalThis,n=["*"]){t.addEventListener("message",function r(i){if(!i||!i.data)return;if(!Ba(n,i.origin)){console.warn(`Invalid origin '${i.origin}' for comlink proxy`);return}const{id:o,type:s,path:a}=Object.assign({path:[]},i.data),c=(i.data.argumentList||[]).map(ct);let l;try{const u=a.slice(0,-1).reduce((f,g)=>f[g],e),d=a.reduce((f,g)=>f[g],e);switch(s){case"GET":l=d;break;case"SET":u[a.slice(-1)[0]]=ct(i.data.value),l=!0;break;case"APPLY":l=d.apply(u,c);break;case"CONSTRUCT":{const f=new d(...c);l=Qo(f)}break;case"ENDPOINT":{const{port1:f,port2:g}=new MessageChannel;Qr(e,g),l=$o(f,[f])}break;case"RELEASE":l=void 0;break;default:return}}catch(u){l={value:u,[wn]:0}}Promise.resolve(l).catch(u=>({value:u,[wn]:0})).then(u=>{const[d,f]=Vn(u);t.postMessage(Object.assign(Object.assign({},d),{id:o}),f),s==="RELEASE"&&(t.removeEventListener("message",r),Zo(t),ur in e&&typeof e[ur]=="function"&&e[ur]())}).catch(u=>{const[d,f]=Vn({value:new TypeError("Unserializable return value"),[wn]:0});t.postMessage(Object.assign(Object.assign({},d),{id:o}),f)})}),t.start&&t.start()}function Ea(e){return e.constructor.name==="MessagePort"}function Zo(e){Ea(e)&&e.close()}function Ia(e,t){const n=new Map;return e.addEventListener("message",function(i){const{data:o}=i;if(!o||!o.id)return;const s=n.get(o.id);if(s)try{s(o)}finally{n.delete(o.id)}}),br(e,n,[],t)}function ln(e){if(e)throw new Error("Proxy has been released and is not useable")}function Jo(e){return xt(e,new Map,{type:"RELEASE"}).then(()=>{Zo(e)})}const En=new WeakMap,In="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(En.get(e)||0)-1;En.set(e,t),t===0&&Jo(e)});function Va(e,t){const n=(En.get(t)||0)+1;En.set(t,n),In&&In.register(e,t,e)}function ka(e){In&&In.unregister(e)}function br(e,t,n=[],r=function(){}){let i=!1;const o=new Proxy(r,{get(s,a){if(ln(i),a===xa)return()=>{ka(o),Jo(e),t.clear(),i=!0};if(a==="then"){if(n.length===0)return{then:()=>o};const c=xt(e,t,{type:"GET",path:n.map(l=>l.toString())}).then(ct);return c.then.bind(c)}return br(e,t,[...n,a])},set(s,a,c){ln(i);const[l,u]=Vn(c);return xt(e,t,{type:"SET",path:[...n,a].map(d=>d.toString()),value:l},u).then(ct)},apply(s,a,c){ln(i);const l=n[n.length-1];if(l===Sa)return xt(e,t,{type:"ENDPOINT"}).then(ct);if(l==="bind")return br(e,t,n.slice(0,-1));const[u,d]=Ei(c);return xt(e,t,{type:"APPLY",path:n.map(f=>f.toString()),argumentList:u},d).then(ct)},construct(s,a){ln(i);const[c,l]=Ei(a);return xt(e,t,{type:"CONSTRUCT",path:n.map(u=>u.toString()),argumentList:c},l).then(ct)}});return Va(o,e),o}function Oa(e){return Array.prototype.concat.apply([],e)}function Ei(e){const t=e.map(Vn);return[t.map(n=>n[0]),Oa(t.map(n=>n[1]))]}const Xo=new WeakMap;function $o(e,t){return Xo.set(e,t),e}function Qo(e){return Object.assign(e,{[Go]:!0})}function Vn(e){for(const[t,n]of Uo)if(n.canHandle(e)){const[r,i]=n.serialize(e);return[{type:"HANDLER",name:t,value:r},i]}return[{type:"RAW",value:e},Xo.get(e)||[]]}function ct(e){switch(e.type){case"HANDLER":return Uo.get(e.name).deserialize(e.value);case"RAW":return e.value}}function xt(e,t,n,r){return new Promise(i=>{const o=Ma();t.set(o,i),e.start&&e.start(),e.postMessage(Object.assign({id:o},n),r)})}function Ma(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var Aa="/_astro/C7JH1X7RM_Zo.simd.wasm",Ko="/_astro/W1j9-2TfgIvK.wasm";class vr{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Vi.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_a_free(t,0)}a(t,n){return v.a_a(this.__wbg_ptr,t,n)}constructor(t,n){K(t,ce);var r=t.__destroy_into_raw();const i=Yo(n,v.__wbindgen_malloc,v.__wbindgen_realloc),o=kn,s=v.a_new(r,i,o);return this.__wbg_ptr=s,Vi.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(vr.prototype[Symbol.dispose]=vr.prototype.free);class Sr{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,ki.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_b_free(t,0)}a(t,n){v.b_a(this.__wbg_ptr,t,n)}b(t){return v.b_b(this.__wbg_ptr,t)}c(){return v.b_c(this.__wbg_ptr)}d(){return v.b_d(this.__wbg_ptr)>>>0}e(t,n){return v.b_e(this.__wbg_ptr,t,n)}f(){return v.b_f(this.__wbg_ptr)}g(){return v.b_g(this.__wbg_ptr)}h(){return v.b_h(this.__wbg_ptr)!==0}constructor(t,n){const r=v.b_new(t,n);return this.__wbg_ptr=r,ki.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(Sr.prototype[Symbol.dispose]=Sr.prototype.free);class xr{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Oi.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_c_free(t,0)}a(t,n,r,i){const o=v.c_a(this.__wbg_ptr,t,n,r,i);var s=ze(o[0],o[1]).slice();return v.__wbindgen_free(o[0],o[1]*4,4),s}b(t,n,r,i){const o=v.c_b(this.__wbg_ptr,t,n,r,i);var s=ze(o[0],o[1]).slice();return v.__wbindgen_free(o[0],o[1]*4,4),s}constructor(t){K(t,ce);var n=t.__destroy_into_raw();const r=v.c_new(n);return this.__wbg_ptr=r,Oi.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(xr.prototype[Symbol.dispose]=xr.prototype.free);class Cr{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Mi.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_d_free(t,0)}a(t,n){return v.d_a(this.__wbg_ptr,t,n)}b(t,n){return v.d_b(this.__wbg_ptr,t,n)}c(t,n,r,i,o){const s=v.d_c(this.__wbg_ptr,t,n,r,i,o);var a=bn(s[0],s[1]).slice();return v.__wbindgen_free(s[0],s[1]*1,1),a}constructor(t){K(t,ce);var n=t.__destroy_into_raw();const r=v.d_new(n);return this.__wbg_ptr=r,Mi.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(Cr.prototype[Symbol.dispose]=Cr.prototype.free);class Tr{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Ai.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_e_free(t,0)}a(t,n,r,i,o){return K(t,ae),v.e_a(this.__wbg_ptr,t.__wbg_ptr,n,r,i,o)}constructor(t){K(t,ce);var n=t.__destroy_into_raw();const r=v.e_new(n);return this.__wbg_ptr=r,Ai.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(Tr.prototype[Symbol.dispose]=Tr.prototype.free);class Br{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Ri.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_f_free(t,0)}a(t,n){const r=v.f_a(this.__wbg_ptr,t,n);var i=ze(r[0],r[1]).slice();return v.__wbindgen_free(r[0],r[1]*4,4),i}constructor(t){K(t,ce);var n=t.__destroy_into_raw();const r=v.f_new(n);return this.__wbg_ptr=r,Ri.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(Br.prototype[Symbol.dispose]=Br.prototype.free);class Er{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Fi.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_g_free(t,0)}a(t,n,r,i,o){return K(t,ae),v.g_a(this.__wbg_ptr,t.__wbg_ptr,n,r,i,o)}b(t,n,r,i){return v.g_b(this.__wbg_ptr,t,n,r,i)}constructor(t){K(t,ce);var n=t.__destroy_into_raw();const r=v.g_new(n);return this.__wbg_ptr=r,Fi.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(Er.prototype[Symbol.dispose]=Er.prototype.free);class Ir{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,zi.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_h_free(t,0)}a(t,n){v.h_a(this.__wbg_ptr,t,n)}b(){const t=v.h_b(this.__wbg_ptr);var n=ze(t[0],t[1]).slice();return v.__wbindgen_free(t[0],t[1]*4,4),n}c(t,n){v.h_c(this.__wbg_ptr,t,n)}d(t){return v.h_d(this.__wbg_ptr,t)}e(t){return v.h_e(this.__wbg_ptr,t)}f(){return v.h_f(this.__wbg_ptr)}g(){const t=v.h_g(this.__wbg_ptr);var n=ze(t[0],t[1]).slice();return v.__wbindgen_free(t[0],t[1]*4,4),n}h(){return v.h_h(this.__wbg_ptr)}i(){return v.h_i(this.__wbg_ptr)}j(){return v.h_j(this.__wbg_ptr)!==0}k(t){v.h_k(this.__wbg_ptr,t)}constructor(t,n){const r=v.h_new(t,n);return this.__wbg_ptr=r,zi.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(Ir.prototype[Symbol.dispose]=Ir.prototype.free);class Vr{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Li.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_i_free(t,0)}a(t,n,r,i,o){return K(t,ae),v.i_a(this.__wbg_ptr,t.__wbg_ptr,n,r,i,o)}constructor(t){K(t,ce);var n=t.__destroy_into_raw();const r=v.i_new(n);return this.__wbg_ptr=r,Li.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(Vr.prototype[Symbol.dispose]=Vr.prototype.free);class kr{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Pi.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_j_free(t,0)}a(t,n){return K(t,ae),v.j_a(this.__wbg_ptr,t.__wbg_ptr,n)}b(t,n,r,i,o){return K(t,ae),v.j_b(this.__wbg_ptr,t.__wbg_ptr,n,r,i,o)}constructor(t){K(t,ce);var n=t.__destroy_into_raw();const r=v.j_new(n);return this.__wbg_ptr=r,Pi.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(kr.prototype[Symbol.dispose]=kr.prototype.free);class ae{static __wrap(t){const n=Object.create(ae.prototype);return n.__wbg_ptr=t,Ni.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Ni.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_k_free(t,0)}static a(t){K(t,ce);var n=t.__destroy_into_raw();const r=v.k_a(n);return ae.__wrap(r)}static b(t){K(t,ce);var n=t.__destroy_into_raw();const r=v.k_b(n);return ae.__wrap(r)}c(t,n,r){return v.k_c(this.__wbg_ptr,t,n,r)}d(t,n,r){return v.k_d(this.__wbg_ptr,t,n,r)}e(t,n,r){return v.k_e(this.__wbg_ptr,t,n,r)}f(t,n,r,i){return v.k_f(this.__wbg_ptr,t,n,r,i)}g(t,n,r,i){return v.k_g(this.__wbg_ptr,t,n,r,i)}h(t,n,r,i,o,s,a){const c=v.k_h(this.__wbg_ptr,t,n,r,i,o,s,a);var l=ze(c[0],c[1]).slice();return v.__wbindgen_free(c[0],c[1]*4,4),l}i(t,n,r,i,o,s,a){const c=v.k_i(this.__wbg_ptr,t,n,r,i,o,s,a);var l=bn(c[0],c[1]).slice();return v.__wbindgen_free(c[0],c[1]*1,1),l}j(t,n,r,i,o,s){const a=v.k_j(this.__wbg_ptr,t,n,r,i,o,s);var c=bn(a[0],a[1]).slice();return v.__wbindgen_free(a[0],a[1]*1,1),c}k(){const t=v.k_k(this.__wbg_ptr);var n=ze(t[0],t[1]).slice();return v.__wbindgen_free(t[0],t[1]*4,4),n}l(t,n){return v.k_l(this.__wbg_ptr,t,n)}m(t,n,r,i){return v.k_m(this.__wbg_ptr,t,n,r,i)}n(t,n,r){const i=v.k_n(this.__wbg_ptr,t,n,r);var o=bn(i[0],i[1]).slice();return v.__wbindgen_free(i[0],i[1]*1,1),o}o(t,n,r,i,o,s,a,c){const l=v.k_o(this.__wbg_ptr,t,n,r,i,o,s,a,c);var u=ze(l[0],l[1]).slice();return v.__wbindgen_free(l[0],l[1]*4,4),u}}Symbol.dispose&&(ae.prototype[Symbol.dispose]=ae.prototype.free);class Or{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Hi.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_l_free(t,0)}a(t,n,r,i,o){return K(o,ae),v.l_a(this.__wbg_ptr,t,n,r,i,o.__wbg_ptr)}constructor(t){K(t,ce);var n=t.__destroy_into_raw();const r=v.l_new(n);return this.__wbg_ptr=r,Hi.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(Or.prototype[Symbol.dispose]=Or.prototype.free);class Mr{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Di.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_m_free(t,0)}a(t,n,r,i,o){return K(t,ae),v.m_a(this.__wbg_ptr,t.__wbg_ptr,n,r,i,o)}constructor(t){K(t,ce);var n=t.__destroy_into_raw();const r=v.m_new(n);return this.__wbg_ptr=r,Di.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(Mr.prototype[Symbol.dispose]=Mr.prototype.free);class ce{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Wi.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_n_free(t,0)}constructor(t,n,r,i,o,s){const a=v.n_new(t,n,r,i,qo(o)?Number.MAX_SAFE_INTEGER:o>>0,s);return this.__wbg_ptr=a,Wi.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(ce.prototype[Symbol.dispose]=ce.prototype.free);class ft{static __wrap(t){const n=Object.create(ft.prototype);return n.__wbg_ptr=t,fr.register(n,n.__wbg_ptr,n),n}__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,fr.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_p_free(t,0)}static a(t,n){const r=v.p_a(t,n);return ft.__wrap(r)}b(t,n){v.p_b(this.__wbg_ptr,t,n)}c(t){return v.p_c(this.__wbg_ptr,t)}d(){const t=v.p_d(this.__wbg_ptr);var n=ze(t[0],t[1]).slice();return v.__wbindgen_free(t[0],t[1]*4,4),n}e(){return v.p_e(this.__wbg_ptr)}f(){return v.p_f(this.__wbg_ptr)}g(t){v.p_g(this.__wbg_ptr,t)}constructor(t,n,r,i){const o=v.p_new(t,n,r,i);return this.__wbg_ptr=o,fr.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(ft.prototype[Symbol.dispose]=ft.prototype.free);class Ar{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,Ii.unregister(this),t}free(){const t=this.__destroy_into_raw();v.__wbg_q_free(t,0)}a(t,n,r,i,o){K(t,ae);const s=v.q_a(this.__wbg_ptr,t.__wbg_ptr,n,r,i,o);var a=ze(s[0],s[1]).slice();return v.__wbindgen_free(s[0],s[1]*4,4),a}constructor(t){K(t,ce);var n=t.__destroy_into_raw();const r=v.q_new(n);return this.__wbg_ptr=r,Ii.register(this,this.__wbg_ptr,this),this}}Symbol.dispose&&(Ar.prototype[Symbol.dispose]=Ar.prototype.free);function Ra(){return{__proto__:null,"./rust_wasm_bg.js":{__proto__:null,__wbg___wbindgen_throw_9c75d47bf9e7731e:function(t,n){throw new Error(ji(t,n))},__wbg_parse_96694afe7f805200:function(t,n){let r,i;try{return r=t,i=n,JSON.parse(ji(t,n))}finally{v.__wbindgen_free(r,i,1)}},__wbg_stringify_f469d2b07ec0ff60:function(t,n){const r=JSON.stringify(n);var i=qo(r)?0:Yo(r,v.__wbindgen_malloc,v.__wbindgen_realloc),o=kn;Gi().setInt32(t+4,o,!0),Gi().setInt32(t+0,i,!0)},__wbindgen_init_externref_table:function(){const t=v.__wbindgen_externrefs,n=t.grow(4);t.set(0,void 0),t.set(n+0,void 0),t.set(n+1,null),t.set(n+2,!0),t.set(n+3,!1)}}}}const Ii=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_q_free(e,1)),Vi=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_a_free(e,1)),ki=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_b_free(e,1)),Oi=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_c_free(e,1)),Mi=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_d_free(e,1)),Ai=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_e_free(e,1)),Ri=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_f_free(e,1)),Fi=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_g_free(e,1)),zi=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_h_free(e,1)),Li=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_i_free(e,1)),Pi=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_j_free(e,1)),Ni=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_k_free(e,1)),Hi=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_l_free(e,1)),Di=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_m_free(e,1)),Wi=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_n_free(e,1));typeof FinalizationRegistry>"u"||new FinalizationRegistry(e=>v.__wbg_o_free(e,1));const fr=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>v.__wbg_p_free(e,1));function K(e,t){if(!(e instanceof t))throw new Error(`expected instance of ${t.name}`)}function ze(e,t){return e=e>>>0,Fa().subarray(e/4,e/4+t)}function bn(e,t){return e=e>>>0,Dt().subarray(e/1,e/1+t)}let st=null;function Gi(){return(st===null||st.buffer.detached===!0||st.buffer.detached===void 0&&st.buffer!==v.memory.buffer)&&(st=new DataView(v.memory.buffer)),st}let Nt=null;function Fa(){return(Nt===null||Nt.byteLength===0)&&(Nt=new Int32Array(v.memory.buffer)),Nt}function ji(e,t){return La(e>>>0,t)}let Ht=null;function Dt(){return(Ht===null||Ht.byteLength===0)&&(Ht=new Uint8Array(v.memory.buffer)),Ht}function qo(e){return e==null}function Yo(e,t,n){if(n===void 0){const a=Wt.encode(e),c=t(a.length,1)>>>0;return Dt().subarray(c,c+a.length).set(a),kn=a.length,c}let r=e.length,i=t(r,1)>>>0;const o=Dt();let s=0;for(;s<r;s++){const a=e.charCodeAt(s);if(a>127)break;o[i+s]=a}if(s!==r){s!==0&&(e=e.slice(s)),i=n(i,r,r=s+e.length*3,1)>>>0;const a=Dt().subarray(i+s,i+r),c=Wt.encodeInto(e,a);s+=c.written,i=n(i,r,s,1)>>>0}return kn=s,i}let vn=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});vn.decode();const za=2146435072;let dr=0;function La(e,t){return dr+=t,dr>=za&&(vn=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}),vn.decode(),dr=t),vn.decode(Dt().subarray(e,e+t))}const Wt=new TextEncoder;"encodeInto"in Wt||(Wt.encodeInto=function(e,t){const n=Wt.encode(e);return t.set(n),{read:e.length,written:n.length}});let kn=0,v;function Pa(e,t){return v=e.exports,st=null,Nt=null,Ht=null,v.__wbindgen_start(),v}async function Na(e,t){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,t)}catch(i){if(e.ok&&n(e.type)&&e.headers.get("Content-Type")!=="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",i);else throw i}const r=await e.arrayBuffer();return await WebAssembly.instantiate(r,t)}else{const r=await WebAssembly.instantiate(e,t);return r instanceof WebAssembly.Instance?{instance:r,module:e}:r}function n(r){switch(r){case"basic":case"cors":case"default":return!0}return!1}}async function Ha(e){if(v!==void 0)return v;e!==void 0&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),e===void 0&&(e=Ko);const t=Ra();(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:n,module:r}=await Na(await e,t);return Pa(n)}const Da=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]));let gr;async function Wa(){if(!gr){const t=await Da().catch(n=>(console.error("wasm-feature-detect failed, defaulting to SIMD build",n),!0))?Aa:Ko;gr=await Ha({module_or_path:t})}return gr}const Ga=64,Tt=new Set;function ja(e){if(Tt.add(e),Tt.size>Ga)for(const t of Tt){Tt.delete(t);break}}class Et extends Error{constructor(){super("task cancelled")}}const Be=async()=>{},Ua=200;function es(e){if(e===void 0)return Be;let t=performance.now();return async()=>{if(Tt.has(e))throw new Et;if(!(performance.now()-t<Ua)&&(await Za(),t=performance.now(),Tt.has(e)))throw new Et}}function Za(){return new Promise(e=>{const{port1:t,port2:n}=new MessageChannel;t.onmessage=()=>{t.close(),e()},n.postMessage(null)})}class Ja extends Map{#n=0;#e=new Map;#t=new Map;#i;#s;#o;constructor(t={}){if(super(),!(t.maxSize&&t.maxSize>0))throw new TypeError("`maxSize` must be a number greater than 0");if(typeof t.maxAge=="number"&&t.maxAge===0)throw new TypeError("`maxAge` must be a number greater than 0");this.#i=t.maxSize,this.#s=t.maxAge||Number.POSITIVE_INFINITY,this.#o=t.onEviction}get __oldCache(){return this.#t}#a(t){if(typeof this.#o=="function")for(const[n,r]of t)this.#o(n,r.value)}#r(t,n){return typeof n.expiry=="number"&&n.expiry<=Date.now()?(typeof this.#o=="function"&&this.#o(t,n.value),this.delete(t)):!1}#d(t,n){if(this.#r(t,n)===!1)return n.value}#l(t,n){return n.expiry?this.#d(t,n):n.value}#u(t,n){const r=n.get(t);return this.#l(t,r)}#f(t,n){this.#e.set(t,n),this.#n++,this.#n>=this.#i&&(this.#n=0,this.#a(this.#t),this.#t=this.#e,this.#e=new Map)}#g(t,n){this.#t.delete(t),this.#f(t,n)}*#c(){for(const t of this.#t){const[n,r]=t;this.#e.has(n)||this.#r(n,r)===!1&&(yield t)}for(const t of this.#e){const[n,r]=t;this.#r(n,r)===!1&&(yield t)}}get(t){if(this.#e.has(t)){const n=this.#e.get(t);return this.#l(t,n)}if(this.#t.has(t)){const n=this.#t.get(t);if(this.#r(t,n)===!1)return this.#g(t,n),n.value}}set(t,n,{maxAge:r=this.#s}={}){const i=typeof r=="number"&&r!==Number.POSITIVE_INFINITY?Date.now()+r:void 0;return this.#e.has(t)?this.#e.set(t,{value:n,expiry:i}):this.#f(t,{value:n,expiry:i}),this}has(t){return this.#e.has(t)?!this.#r(t,this.#e.get(t)):this.#t.has(t)?!this.#r(t,this.#t.get(t)):!1}peek(t){if(this.#e.has(t))return this.#u(t,this.#e);if(this.#t.has(t))return this.#u(t,this.#t)}expiresIn(t){const n=this.#e.get(t)??this.#t.get(t);if(n)return n.expiry?n.expiry-Date.now():Number.POSITIVE_INFINITY}delete(t){const n=this.#e.delete(t);return n&&this.#n--,this.#t.delete(t)||n}clear(){this.#e.clear(),this.#t.clear(),this.#n=0}resize(t){if(!(t&&t>0))throw new TypeError("`maxSize` must be a number greater than 0");const n=[...this.#c()],r=n.length-t;r<0?(this.#e=new Map(n),this.#t=new Map,this.#n=n.length):(r>0&&this.#a(n.slice(0,r)),this.#t=new Map(n.slice(r)),this.#e=new Map,this.#n=0),this.#i=t}evict(t=1){const n=Number(t);if(!n||n<=0)return;const r=[...this.#c()],i=Math.trunc(Math.min(n,Math.max(r.length-1,0)));i<=0||(this.#a(r.slice(0,i)),this.#t=new Map(r.slice(i)),this.#e=new Map,this.#n=0)}*keys(){for(const[t]of this)yield t}*values(){for(const[,t]of this)yield t}*[Symbol.iterator](){for(const t of this.#e){const[n,r]=t;this.#r(n,r)===!1&&(yield[n,r.value])}for(const t of this.#t){const[n,r]=t;this.#e.has(n)||this.#r(n,r)===!1&&(yield[n,r.value])}}*entriesDescending(){let t=[...this.#e];for(let n=t.length-1;n>=0;--n){const r=t[n],[i,o]=r;this.#r(i,o)===!1&&(yield[i,o.value])}t=[...this.#t];for(let n=t.length-1;n>=0;--n){const r=t[n],[i,o]=r;this.#e.has(i)||this.#r(i,o)===!1&&(yield[i,o.value])}}*entriesAscending(){for(const[t,n]of this.#c())yield[t,n.value]}get size(){if(!this.#n)return this.#t.size;let t=0;for(const n of this.#t.keys())this.#e.has(n)||t++;return Math.min(this.#n+t,this.#i)}get maxSize(){return this.#i}get maxAge(){return this.#s}entries(){return this.entriesAscending()}forEach(t,n=this){for(const[r,i]of this.entriesAscending())t.call(n,i,r,this)}get[Symbol.toStringTag](){return"QuickLRU"}toString(){return`QuickLRU(${this.size}/${this.maxSize})`}[Symbol.for("nodejs.util.inspect.custom")](){return this.toString()}}const Kr=new Ja({maxSize:1024});function Xa(e){return Kr.get(e)}function $a(e,t){Kr.set(e,t)}function Qa(){Kr.clear()}var Ce=null;try{Ce=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function k(e,t,n){this.low=e|0,this.high=t|0,this.unsigned=!!n}k.prototype.__isLong__;Object.defineProperty(k.prototype,"__isLong__",{value:!0});function le(e){return(e&&e.__isLong__)===!0}function Ui(e){var t=Math.clz32(e&-e);return e?31-t:t}k.isLong=le;var Zi={},Ji={};function yt(e,t){var n,r,i;return t?(e>>>=0,(i=0<=e&&e<256)&&(r=Ji[e],r)?r:(n=j(e,0,!0),i&&(Ji[e]=n),n)):(e|=0,(i=-128<=e&&e<128)&&(r=Zi[e],r)?r:(n=j(e,e<0?-1:0,!1),i&&(Zi[e]=n),n))}k.fromInt=yt;function Te(e,t){if(isNaN(e))return t?We:Oe;if(t){if(e<0)return We;if(e>=ts)return is}else{if(e<=-$i)return ge;if(e+1>=$i)return rs}return e<0?Te(-e,t).neg():j(e%It|0,e/It|0,t)}k.fromNumber=Te;function j(e,t,n){return new k(e,t,n)}k.fromBits=j;var On=Math.pow;function qr(e,t,n){if(e.length===0)throw Error("empty string");if(typeof t=="number"?(n=t,t=!1):t=!!t,e==="NaN"||e==="Infinity"||e==="+Infinity"||e==="-Infinity")return t?We:Oe;if(n=n||10,n<2||36<n)throw RangeError("radix");var r;if((r=e.indexOf("-"))>0)throw Error("interior hyphen");if(r===0)return qr(e.substring(1),t,n).neg();for(var i=Te(On(n,8)),o=Oe,s=0;s<e.length;s+=8){var a=Math.min(8,e.length-s),c=parseInt(e.substring(s,s+a),n);if(a<8){var l=Te(On(n,a));o=o.mul(l).add(Te(c))}else o=o.mul(i),o=o.add(Te(c))}return o.unsigned=t,o}k.fromString=qr;function Ee(e,t){return typeof e=="number"?Te(e,t):typeof e=="string"?qr(e,t):j(e.low,e.high,typeof t=="boolean"?t:e.unsigned)}k.fromValue=Ee;var Xi=65536,Ka=1<<24,It=Xi*Xi,ts=It*It,$i=ts/2,Qi=yt(Ka),Oe=yt(0);k.ZERO=Oe;var We=yt(0,!0);k.UZERO=We;var Bt=yt(1);k.ONE=Bt;var ns=yt(1,!0);k.UONE=ns;var Rr=yt(-1);k.NEG_ONE=Rr;var rs=j(-1,2147483647,!1);k.MAX_VALUE=rs;var is=j(-1,-1,!0);k.MAX_UNSIGNED_VALUE=is;var ge=j(0,-2147483648,!1);k.MIN_VALUE=ge;var T=k.prototype;T.toInt=function(){return this.unsigned?this.low>>>0:this.low};T.toNumber=function(){return this.unsigned?(this.high>>>0)*It+(this.low>>>0):this.high*It+(this.low>>>0)};T.toString=function(t){if(t=t||10,t<2||36<t)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(ge)){var n=Te(t),r=this.div(n),i=r.mul(n).sub(this);return r.toString(t)+i.toInt().toString(t)}else return"-"+this.neg().toString(t);for(var o=Te(On(t,6),this.unsigned),s=this,a="";;){var c=s.div(o),l=s.sub(c.mul(o)).toInt()>>>0,u=l.toString(t);if(s=c,s.isZero())return u+a;for(;u.length<6;)u="0"+u;a=""+u+a}};T.getHighBits=function(){return this.high};T.getHighBitsUnsigned=function(){return this.high>>>0};T.getLowBits=function(){return this.low};T.getLowBitsUnsigned=function(){return this.low>>>0};T.getNumBitsAbs=function(){if(this.isNegative())return this.eq(ge)?64:this.neg().getNumBitsAbs();for(var t=this.high!=0?this.high:this.low,n=31;n>0&&(t&1<<n)==0;n--);return this.high!=0?n+33:n+1};T.isSafeInteger=function(){var t=this.high>>21;return t?this.unsigned?!1:t===-1&&!(this.low===0&&this.high===-2097152):!0};T.isZero=function(){return this.high===0&&this.low===0};T.eqz=T.isZero;T.isNegative=function(){return!this.unsigned&&this.high<0};T.isPositive=function(){return this.unsigned||this.high>=0};T.isOdd=function(){return(this.low&1)===1};T.isEven=function(){return(this.low&1)===0};T.equals=function(t){return le(t)||(t=Ee(t)),this.unsigned!==t.unsigned&&this.high>>>31===1&&t.high>>>31===1?!1:this.high===t.high&&this.low===t.low};T.eq=T.equals;T.notEquals=function(t){return!this.eq(t)};T.neq=T.notEquals;T.ne=T.notEquals;T.lessThan=function(t){return this.comp(t)<0};T.lt=T.lessThan;T.lessThanOrEqual=function(t){return this.comp(t)<=0};T.lte=T.lessThanOrEqual;T.le=T.lessThanOrEqual;T.greaterThan=function(t){return this.comp(t)>0};T.gt=T.greaterThan;T.greaterThanOrEqual=function(t){return this.comp(t)>=0};T.gte=T.greaterThanOrEqual;T.ge=T.greaterThanOrEqual;T.compare=function(t){if(le(t)||(t=Ee(t)),this.eq(t))return 0;var n=this.isNegative(),r=t.isNegative();return n&&!r?-1:!n&&r?1:this.unsigned?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.sub(t).isNegative()?-1:1};T.comp=T.compare;T.negate=function(){return!this.unsigned&&this.eq(ge)?ge:this.not().add(Bt)};T.neg=T.negate;T.add=function(t){le(t)||(t=Ee(t));var n=this.high>>>16,r=this.high&65535,i=this.low>>>16,o=this.low&65535,s=t.high>>>16,a=t.high&65535,c=t.low>>>16,l=t.low&65535,u=0,d=0,f=0,g=0;return g+=o+l,f+=g>>>16,g&=65535,f+=i+c,d+=f>>>16,f&=65535,d+=r+a,u+=d>>>16,d&=65535,u+=n+s,u&=65535,j(f<<16|g,u<<16|d,this.unsigned)};T.subtract=function(t){return le(t)||(t=Ee(t)),this.add(t.neg())};T.sub=T.subtract;T.multiply=function(t){if(this.isZero())return this;if(le(t)||(t=Ee(t)),Ce){var n=Ce.mul(this.low,this.high,t.low,t.high);return j(n,Ce.get_high(),this.unsigned)}if(t.isZero())return this.unsigned?We:Oe;if(this.eq(ge))return t.isOdd()?ge:Oe;if(t.eq(ge))return this.isOdd()?ge:Oe;if(this.isNegative())return t.isNegative()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t.isNegative())return this.mul(t.neg()).neg();if(this.lt(Qi)&&t.lt(Qi))return Te(this.toNumber()*t.toNumber(),this.unsigned);var r=this.high>>>16,i=this.high&65535,o=this.low>>>16,s=this.low&65535,a=t.high>>>16,c=t.high&65535,l=t.low>>>16,u=t.low&65535,d=0,f=0,g=0,h=0;return h+=s*u,g+=h>>>16,h&=65535,g+=o*u,f+=g>>>16,g&=65535,g+=s*l,f+=g>>>16,g&=65535,f+=i*u,d+=f>>>16,f&=65535,f+=o*l,d+=f>>>16,f&=65535,f+=s*c,d+=f>>>16,f&=65535,d+=r*u+i*l+o*c+s*a,d&=65535,j(g<<16|h,d<<16|f,this.unsigned)};T.mul=T.multiply;T.divide=function(t){if(le(t)||(t=Ee(t)),t.isZero())throw Error("division by zero");if(Ce){if(!this.unsigned&&this.high===-2147483648&&t.low===-1&&t.high===-1)return this;var n=(this.unsigned?Ce.div_u:Ce.div_s)(this.low,this.high,t.low,t.high);return j(n,Ce.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?We:Oe;var r,i,o;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.gt(this))return We;if(t.gt(this.shru(1)))return ns;o=We}else{if(this.eq(ge)){if(t.eq(Bt)||t.eq(Rr))return ge;if(t.eq(ge))return Bt;var s=this.shr(1);return r=s.div(t).shl(1),r.eq(Oe)?t.isNegative()?Bt:Rr:(i=this.sub(t.mul(r)),o=r.add(i.div(t)),o)}else if(t.eq(ge))return this.unsigned?We:Oe;if(this.isNegative())return t.isNegative()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t.isNegative())return this.div(t.neg()).neg();o=Oe}for(i=this;i.gte(t);){r=Math.max(1,Math.floor(i.toNumber()/t.toNumber()));for(var a=Math.ceil(Math.log(r)/Math.LN2),c=a<=48?1:On(2,a-48),l=Te(r),u=l.mul(t);u.isNegative()||u.gt(i);)r-=c,l=Te(r,this.unsigned),u=l.mul(t);l.isZero()&&(l=Bt),o=o.add(l),i=i.sub(u)}return o};T.div=T.divide;T.modulo=function(t){if(le(t)||(t=Ee(t)),Ce){var n=(this.unsigned?Ce.rem_u:Ce.rem_s)(this.low,this.high,t.low,t.high);return j(n,Ce.get_high(),this.unsigned)}return this.sub(this.div(t).mul(t))};T.mod=T.modulo;T.rem=T.modulo;T.not=function(){return j(~this.low,~this.high,this.unsigned)};T.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};T.clz=T.countLeadingZeros;T.countTrailingZeros=function(){return this.low?Ui(this.low):Ui(this.high)+32};T.ctz=T.countTrailingZeros;T.and=function(t){return le(t)||(t=Ee(t)),j(this.low&t.low,this.high&t.high,this.unsigned)};T.or=function(t){return le(t)||(t=Ee(t)),j(this.low|t.low,this.high|t.high,this.unsigned)};T.xor=function(t){return le(t)||(t=Ee(t)),j(this.low^t.low,this.high^t.high,this.unsigned)};T.shiftLeft=function(t){return le(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?j(this.low<<t,this.high<<t|this.low>>>32-t,this.unsigned):j(0,this.low<<t-32,this.unsigned)};T.shl=T.shiftLeft;T.shiftRight=function(t){return le(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?j(this.low>>>t|this.high<<32-t,this.high>>t,this.unsigned):j(this.high>>t-32,this.high>=0?0:-1,this.unsigned)};T.shr=T.shiftRight;T.shiftRightUnsigned=function(t){return le(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?j(this.low>>>t|this.high<<32-t,this.high>>>t,this.unsigned):t===32?j(this.high,0,this.unsigned):j(this.high>>>t-32,0,this.unsigned)};T.shru=T.shiftRightUnsigned;T.shr_u=T.shiftRightUnsigned;T.rotateLeft=function(t){var n;return le(t)&&(t=t.toInt()),(t&=63)===0?this:t===32?j(this.high,this.low,this.unsigned):t<32?(n=32-t,j(this.low<<t|this.high>>>n,this.high<<t|this.low>>>n,this.unsigned)):(t-=32,n=32-t,j(this.high<<t|this.low>>>n,this.low<<t|this.high>>>n,this.unsigned))};T.rotl=T.rotateLeft;T.rotateRight=function(t){var n;return le(t)&&(t=t.toInt()),(t&=63)===0?this:t===32?j(this.high,this.low,this.unsigned):t<32?(n=32-t,j(this.high<<n|this.low>>>t,this.low<<n|this.high>>>t,this.unsigned)):(t-=32,n=32-t,j(this.low<<n|this.high>>>t,this.high<<n|this.low>>>t,this.unsigned))};T.rotr=T.rotateRight;T.toSigned=function(){return this.unsigned?j(this.low,this.high,!1):this};T.toUnsigned=function(){return this.unsigned?this:j(this.low,this.high,!0)};T.toBytes=function(t){return t?this.toBytesLE():this.toBytesBE()};T.toBytesLE=function(){var t=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,t&255,t>>>8&255,t>>>16&255,t>>>24]};T.toBytesBE=function(){var t=this.high,n=this.low;return[t>>>24,t>>>16&255,t>>>8&255,t&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};k.fromBytes=function(t,n,r){return r?k.fromBytesLE(t,n):k.fromBytesBE(t,n)};k.fromBytesLE=function(t,n){return new k(t[0]|t[1]<<8|t[2]<<16|t[3]<<24,t[4]|t[5]<<8|t[6]<<16|t[7]<<24,n)};k.fromBytesBE=function(t,n){return new k(t[4]<<24|t[5]<<16|t[6]<<8|t[7],t[0]<<24|t[1]<<16|t[2]<<8|t[3],n)};typeof BigInt=="function"&&(k.fromBigInt=function(t,n){var r=Number(BigInt.asIntN(32,t)),i=Number(BigInt.asIntN(32,t>>BigInt(32)));return j(r,i,n)},k.fromValue=function(t,n){return typeof t=="bigint"?k.fromBigInt(t,n):Ee(t,n)},T.toBigInt=function(){var t=BigInt(this.low>>>0),n=BigInt(this.unsigned?this.high>>>0:this.high);return n<<BigInt(32)|t});var _=(e=>(e.Java="Java",e.Bedrock="Bedrock",e))(_||{}),p=(e=>(e[e.V1_7=100700]="V1_7",e[e.V1_8=100800]="V1_8",e[e.V1_9=100900]="V1_9",e[e.V1_10=101e3]="V1_10",e[e.V1_11=101100]="V1_11",e[e.V1_12=101200]="V1_12",e[e.V1_13=101300]="V1_13",e[e.V1_14=101400]="V1_14",e[e.V1_15=101500]="V1_15",e[e.V1_16=101600]="V1_16",e[e.V1_17=101700]="V1_17",e[e.V1_18=101800]="V1_18",e[e.V1_19=101900]="V1_19",e[e.V1_19_3=101903]="V1_19_3",e[e.V1_20=102e3]="V1_20",e[e.V1_21=102100]="V1_21",e[e.V1_21_2=102102]="V1_21_2",e[e.V1_21_4=102104]="V1_21_4",e[e.V1_21_5=102105]="V1_21_5",e[e.V1_21_6=102106]="V1_21_6",e[e.V1_21_9=102109]="V1_21_9",e[e.V26_2=260200]="V26_2",e[e.V26_3=260300]="V26_3",e))(p||{}),S=(e=>(e[e.V1_14=101400]="V1_14",e[e.V1_16=101600]="V1_16",e[e.V1_17=101700]="V1_17",e[e.V1_18=101800]="V1_18",e[e.V1_19=101900]="V1_19",e[e.V1_20=102e3]="V1_20",e[e.V1_20_60=102006]="V1_20_60",e[e.V1_21=102100]="V1_21",e[e.V1_21_40=102104]="V1_21_40",e[e.V1_21_50=102105]="V1_21_50",e[e.V1_21_60=102106]="V1_21_60",e[e.V1_21_70=102107]="V1_21_70",e[e.V1_21_80=102108]="V1_21_80",e[e.V1_21_90=102109]="V1_21_90",e[e.V1_21_110=102111]="V1_21_110",e[e.V1_21_120=102112]="V1_21_120",e[e.V26_30=263e3]="V26_30",e[e.V26_40=264e3]="V26_40",e[e.V26_50=265e3]="V26_50",e))(S||{}),y=(e=>(e.Overworld="overworld",e.Nether="nether",e.End="end",e))(y||{}),ye=(e=>(e[e.ZOMBIE=0]="ZOMBIE",e[e.SPIDER=1]="SPIDER",e[e.SKELETON=2]="SKELETON",e))(ye||{}),m=(e=>(e.AbandonedCamp="abandonedCamp",e.BastionRemnant="bastionRemnant",e.BuriedTreasure="buriedTreasure",e.Dungeon="dungeon",e.EndCity="endCity",e.NetherFortress="netherFortress",e.SlimeChunk="slimeChunk",e.Stronghold="stronghold",e.Village="village",e.Mineshaft="mineshaft",e.WoodlandMansion="woodlandMansion",e.PillagerOutpost="pillagerOutpost",e.OceanRuin="oceanRuin",e.OceanMonument="oceanMonument",e.Shipwreck="shipwreck",e.DesertTemple="desertTemple",e.JungleTemple="jungleTemple",e.WitchHut="witchHut",e.Igloo="igloo",e.RuinedPortalOverworld="ruinedPortalOverworld",e.RuinedPortalNether="ruinedPortalNether",e.Spawn="spawn",e.Fossil="fossil",e.FossilNether="fossilNether",e.Ravine="ravine",e.EndGateway="endGateway",e.AmethystGeode="amethystGeode",e.AncientCity="ancientCity",e.ItemOverworld="itemOverworld",e.OreVein="oreVein",e.Cave="cave",e.DesertWell="desertWell",e.TrailRuin="trailRuin",e.TrialChamber="trialChamber",e.LavaPool="lavaPool",e))(m||{});const he=0,Nn="none",Fe=[],qa={},Xe=B({id:0,key:"ocean",name:"Ocean",category:"ocean",temperature:.5,precipitation:"rain",depth:-1,rgb:[0,0,112],dimension:y.Overworld,displayCategory:"water"}),Ie=B({id:1,key:"plains",name:"Plains",category:"plains",temperature:.8,precipitation:"rain",depth:.125,rgb:[141,179,96],dimension:y.Overworld,displayCategory:"plains"}),Y=B({id:2,key:"desert",name:"Desert",category:"desert",temperature:2,precipitation:"none",depth:.125,rgb:[250,148,24],dimension:y.Overworld,displayCategory:"sandy"}),Jt=B({id:3,key:"windswept_hills",name:"Windswept Hills",oldNames:["Mountains"],category:"extreme_hills",temperature:.2,precipitation:"rain",depth:1,rgb:[96,96,96],dimension:y.Overworld,displayCategory:"mountains"}),Xt=B({id:4,key:"forest",name:"Forest",category:"forest",temperature:.7,precipitation:"rain",depth:.1,rgb:[5,102,33],dimension:y.Overworld,displayCategory:"woodlands"}),pe=B({id:5,key:"taiga",name:"Taiga",category:"taiga",temperature:.25,precipitation:"rain",depth:.2,rgb:[11,102,89],dimension:y.Overworld,displayCategory:"woodlands"}),dt=B({id:6,key:"swamp",name:"Swamp",category:"swamp",temperature:.8,precipitation:"rain",depth:-.2,rgb:[7,249,178],dimension:y.Overworld,displayCategory:"swamps"}),Yr=B({id:7,key:"river",name:"River",category:"river",temperature:.5,precipitation:"rain",depth:-.5,rgb:[0,0,255],dimension:y.Overworld,displayCategory:"water"}),ei=B({id:8,key:"nether_wastes",name:"Nether Wastes",category:"nether",temperature:2,precipitation:"none",depth:.1,rgb:[191,59,59],climates:[{temperature:0,humidity:0,altitude:0,weirdness:0,offset:0}],dimension:y.Nether,displayCategory:"nether"}),Ya=B({id:9,key:"the_end",name:"The End",category:"the_end",temperature:.5,precipitation:"none",depth:.1,rgb:[128,128,255],dimension:y.End,displayCategory:"end"}),Le=B({id:10,key:"frozen_ocean",name:"Frozen Ocean",category:"ocean",temperature:0,precipitation:"snow",depth:-1,rgb:[112,112,214],dimension:y.Overworld,displayCategory:"water"}),$t=B({id:11,key:"frozen_river",name:"Frozen River",category:"river",temperature:0,precipitation:"snow",depth:-.5,rgb:[160,160,255],dimension:y.Overworld,displayCategory:"water"}),Ve=B({id:12,key:"snowy_plains",name:"Snowy Plains",oldNames:["Snowy Tundra"],category:"icy",temperature:0,precipitation:"snow",depth:.125,rgb:[255,255,255],dimension:y.Overworld,displayCategory:"plains"}),ec=B({id:13,name:"Snowy Mountains",category:"icy",temperature:0,precipitation:"snow",depth:.45,rgb:[160,160,160],dimension:y.Overworld,displayCategory:"legacy"}),os=B({id:14,key:"mushroom_fields",name:"Mushroom Fields",category:"mushroom",temperature:.9,precipitation:"rain",depth:.2,rgb:[255,0,255],dimension:y.Overworld,displayCategory:"plains"}),Hn=B({id:15,name:"Mushroom Fields Shore",category:"mushroom",temperature:.9,precipitation:"rain",depth:0,rgb:[160,0,255],dimension:y.Overworld,displayCategory:"legacy"}),lt=B({id:16,key:"beach",name:"Beach",category:"beach",temperature:.8,precipitation:"rain",depth:0,rgb:[250,222,85],dimension:y.Overworld,displayCategory:"sandy"}),ss=B({id:17,name:"Desert Hills",category:"desert",temperature:2,precipitation:"none",depth:.45,rgb:[210,95,18],dimension:y.Overworld,displayCategory:"legacy"}),Qt=B({id:18,key:"windswept_forest",name:"Windswept Forest",oldNames:["Wooded Hills"],category:"forest",temperature:.7,precipitation:"rain",depth:.45,rgb:[34,85,28],dimension:y.Overworld,displayCategory:"mountains"}),Kt=B({id:19,name:"Taiga Hills",category:"taiga",temperature:.25,precipitation:"rain",depth:.45,rgb:[22,57,51],dimension:y.Overworld,displayCategory:"legacy"}),tc=B({id:20,name:"Mountain Edge",category:"extreme_hills",temperature:.2,precipitation:"rain",depth:.8,rgb:[114,120,154],dimension:y.Overworld,displayCategory:"legacy"}),wt=B({id:21,key:"jungle",name:"Jungle",category:"jungle",temperature:.95,precipitation:"rain",depth:.1,rgb:[83,123,9],dimension:y.Overworld,displayCategory:"woodlands"}),ti=B({id:22,name:"Jungle Hills",category:"jungle",temperature:.95,precipitation:"rain",depth:.45,rgb:[44,66,5],dimension:y.Overworld,displayCategory:"legacy"}),Dn=B({id:23,key:"sparse_jungle",name:"Sparse Jungle",oldNames:["Jungle Edge"],category:"jungle",temperature:.95,precipitation:"rain",depth:.1,rgb:[98,139,23],dimension:y.Overworld,displayCategory:"woodlands"}),Pe=B({id:24,key:"deep_ocean",name:"Deep Ocean",category:"ocean",temperature:.5,precipitation:"rain",depth:-1.8,rgb:[0,0,48],dimension:y.Overworld,displayCategory:"water"}),as=B({id:25,key:"stony_shore",name:"Stony Shore",oldNames:["Stone Shore"],category:"none",temperature:.2,precipitation:"rain",depth:.1,rgb:[162,162,132],dimension:y.Overworld,displayCategory:"mountains"}),Ge=B({id:26,key:"snowy_beach",name:"Snowy Beach",category:"beach",temperature:.05,precipitation:"snow",depth:0,rgb:[250,240,192],dimension:y.Overworld,displayCategory:"sandy"}),Wn=B({id:27,key:"birch_forest",name:"Birch Forest",category:"forest",temperature:.6,precipitation:"rain",depth:.1,rgb:[48,116,68],dimension:y.Overworld,displayCategory:"woodlands"}),cs=B({id:28,name:"Birch Forest Hills",category:"forest",temperature:.6,precipitation:"rain",depth:.45,rgb:[31,95,50],dimension:y.Overworld,displayCategory:"legacy"}),rt=B({id:29,key:"dark_forest",name:"Dark Forest",category:"forest",temperature:.7,precipitation:"rain",depth:.1,rgb:[64,81,26],dimension:y.Overworld,displayCategory:"woodlands"}),Ae=B({id:30,key:"snowy_taiga",name:"Snowy Taiga",category:"taiga",temperature:-.5,precipitation:"snow",depth:.2,rgb:[49,85,74],dimension:y.Overworld,displayCategory:"woodlands"}),Gn=B({id:31,name:"Snowy Taiga Hills",category:"taiga",temperature:-.5,precipitation:"snow",depth:.45,rgb:[36,63,54],dimension:y.Overworld,displayCategory:"legacy"}),kt=B({id:32,key:"old_growth_pine_taiga",name:"Old Growth Pine Taiga",oldNames:["Giant Tree Taiga"],category:"taiga",temperature:.3,precipitation:"rain",depth:.2,rgb:[89,102,81],dimension:y.Overworld,displayCategory:"woodlands"}),ls=B({id:33,name:"Giant Tree Taiga Hills",category:"taiga",temperature:.3,precipitation:"rain",depth:.45,rgb:[69,79,62],dimension:y.Overworld,displayCategory:"legacy"}),us=B({id:34,name:"Wooded Mountains",category:"extreme_hills",temperature:.2,precipitation:"rain",depth:1,rgb:[80,112,80],dimension:y.Overworld,displayCategory:"legacy"}),ke=B({id:35,key:"savanna",name:"Savanna",category:"savanna",temperature:1.2,precipitation:"none",depth:.125,rgb:[189,178,95],dimension:y.Overworld,displayCategory:"plains"}),jn=B({id:36,key:"savanna_plateau",name:"Savanna Plateau",category:"savanna",temperature:1,precipitation:"none",depth:1.5,rgb:[167,157,100],dimension:y.Overworld,displayCategory:"mountains"}),Un=B({id:37,key:"badlands",name:"Badlands",category:"mesa",temperature:2,precipitation:"none",depth:.1,rgb:[217,69,21],dimension:y.Overworld,displayCategory:"sandy"}),Zn=B({id:38,key:"wooded_badlands",name:"Wooded Badlands",oldNames:["Wooded Badlands Plateau"],category:"mesa",temperature:2,precipitation:"none",depth:1.5,rgb:[176,151,101],dimension:y.Overworld,displayCategory:"sandy"}),fs=B({id:39,name:"Badlands Plateau",category:"mesa",temperature:2,precipitation:"none",depth:1.5,rgb:[202,140,101],dimension:y.Overworld,displayCategory:"legacy"}),nc=B({id:40,key:"small_end_islands",name:"Small End Islands",category:"the_end",temperature:.5,precipitation:"none",depth:.1,rgb:[0,0,42],dimension:y.End,displayCategory:"end"}),ds=B({id:41,key:"end_midlands",name:"End Midlands",category:"the_end",temperature:.5,precipitation:"none",depth:.1,rgb:[235,248,182],dimension:y.End,displayCategory:"end"}),qt=B({id:42,key:"end_highlands",name:"End Highlands",category:"the_end",temperature:.5,precipitation:"none",depth:.1,rgb:[195,189,137],dimension:y.End,displayCategory:"end"}),rc=B({id:43,key:"end_barrens",name:"End Barrens",category:"the_end",temperature:.5,precipitation:"none",depth:.1,rgb:[144,144,114],dimension:y.End,displayCategory:"end"}),$e=B({id:44,key:"warm_ocean",name:"Warm Ocean",category:"ocean",temperature:.5,precipitation:"rain",depth:-1,rgb:[0,0,172],dimension:y.Overworld,displayCategory:"water"}),gt=B({id:45,key:"lukewarm_ocean",name:"Lukewarm Ocean",category:"ocean",temperature:.5,precipitation:"rain",depth:-1,rgb:[0,0,144],dimension:y.Overworld,displayCategory:"water"}),mt=B({id:46,key:"cold_ocean",name:"Cold Ocean",category:"ocean",temperature:.5,precipitation:"rain",depth:-1,rgb:[32,32,112],dimension:y.Overworld,displayCategory:"water"}),Yt=B({id:47,key:"deep_warm_ocean",name:"Deep Warm Ocean",category:"ocean",temperature:.5,precipitation:"rain",depth:-1.8,rgb:[0,0,80],dimension:y.Overworld,displayCategory:"legacy"}),Qe=B({id:48,key:"deep_lukewarm_ocean",name:"Deep Lukewarm Ocean",category:"ocean",temperature:.5,precipitation:"rain",depth:-1.8,rgb:[0,0,64],dimension:y.Overworld,displayCategory:"water"}),Ke=B({id:49,key:"deep_cold_ocean",name:"Deep Cold Ocean",category:"ocean",temperature:.5,precipitation:"rain",depth:-1.8,rgb:[32,32,56],dimension:y.Overworld,displayCategory:"water"}),Ne=B({id:50,key:"deep_frozen_ocean",name:"Deep Frozen Ocean",category:"ocean",temperature:.5,precipitation:"rain",depth:-1.8,rgb:[64,64,144],dimension:y.Overworld,displayCategory:"water"}),en=B({id:129,name:"Sunflower Plains",key:"sunflower_plains",category:"plains",temperature:.8,precipitation:"rain",depth:.125,rgb:[181,219,136],parent:Ie.id,dimension:y.Overworld,displayCategory:"plains"}),ic=B({id:130,name:"Desert Lakes",category:"desert",temperature:2,precipitation:"none",depth:.125,rgb:[255,188,64],parent:Y.id,dimension:y.Overworld,displayCategory:"legacy"}),Jn=B({id:131,key:"windswept_gravelly_hills",name:"Windswept Gravelly Hills",oldNames:["Gravelly Mountains"],category:"extreme_hills",temperature:.2,precipitation:"rain",depth:1,rgb:[136,136,136],parent:Jt.id,dimension:y.Overworld,displayCategory:"mountains"}),ni=B({id:132,key:"flower_forest",name:"Flower Forest",category:"forest",temperature:.7,precipitation:"rain",depth:.1,rgb:[45,142,73],parent:Xt.id,dimension:y.Overworld,displayCategory:"woodlands"}),oc=B({id:133,name:"Taiga Mountains",category:"taiga",temperature:.25,precipitation:"rain",depth:.3,rgb:[51,142,129],parent:pe.id,dimension:y.Overworld,displayCategory:"legacy"}),gs=B({id:134,name:"Swamp Hills",category:"swamp",temperature:.8,precipitation:"rain",depth:-.1,rgb:[47,255,218],parent:dt.id,dimension:y.Overworld,displayCategory:"legacy"}),Xn=B({id:140,key:"ice_spikes",name:"Ice Spikes",category:"icy",temperature:0,precipitation:"snow",depth:.425,rgb:[180,220,220],parent:Ve.id,dimension:y.Overworld,displayCategory:"plains"}),sc=B({id:149,name:"Modified Jungle",category:"jungle",temperature:.95,precipitation:"rain",depth:.2,rgb:[123,163,49],parent:wt.id,dimension:y.Overworld,displayCategory:"legacy"}),ac=B({id:151,name:"Modified Jungle Edge",category:"jungle",temperature:.95,precipitation:"rain",depth:.2,rgb:[138,179,63],parent:Dn.id,dimension:y.Overworld,displayCategory:"legacy"}),$n=B({id:155,key:"old_growth_birch_forest",name:"Old Growth Birch Forest",oldNames:["Tall Birch Forest"],category:"forest",temperature:.6,precipitation:"rain",depth:.2,rgb:[88,156,108],parent:Wn.id,dimension:y.Overworld,displayCategory:"woodlands"}),cc=B({id:156,name:"Tall Birch Hills",category:"forest",temperature:.6,precipitation:"rain",depth:.55,rgb:[71,135,90],parent:cs.id,dimension:y.Overworld,displayCategory:"legacy"}),tn=B({id:157,name:"Dark Forest Hills",category:"forest",temperature:.7,precipitation:"rain",depth:.2,rgb:[104,121,66],parent:rt.id,dimension:y.Overworld,displayCategory:"legacy"}),lc=B({id:158,name:"Snowy Taiga Mountains",category:"taiga",temperature:-.5,precipitation:"snow",depth:.3,rgb:[89,125,114],parent:Ae.id,dimension:y.Overworld,displayCategory:"legacy"}),nn=B({id:160,key:"old_growth_spruce_taiga",name:"Old Growth Spruce Taiga",oldNames:["Giant Spruce Taiga"],category:"taiga",temperature:.25,precipitation:"rain",depth:.2,rgb:[129,142,121],parent:kt.id,dimension:y.Overworld,displayCategory:"woodlands"}),uc=B({id:161,name:"Giant Spruce Taiga Hills",category:"taiga",temperature:.25,precipitation:"rain",depth:.2,rgb:[109,119,102],parent:ls.id,dimension:y.Overworld,displayCategory:"legacy"}),fc=B({id:162,name:"Gravelly Mountains+",category:"extreme_hills",temperature:.2,precipitation:"rain",depth:1,rgb:[120,152,120],parent:us.id,dimension:y.Overworld,displayCategory:"legacy"}),ri=B({id:163,key:"windswept_savanna",name:"Windswept Savanna",oldNames:["Shattered Savanna"],category:"savanna",temperature:1.1,precipitation:"none",depth:.3625,rgb:[229,218,135],parent:ke.id,dimension:y.Overworld,displayCategory:"mountains"}),dc=B({id:164,name:"Shattered Savanna Plateau",category:"savanna",temperature:1,precipitation:"none",rgb:[207,197,140],depth:1.05,parent:jn.id,dimension:y.Overworld,displayCategory:"legacy"}),ii=B({id:165,key:"eroded_badlands",name:"Eroded Badlands",category:"mesa",temperature:2,precipitation:"none",depth:.1,rgb:[255,109,61],parent:Un.id,dimension:y.Overworld,displayCategory:"sandy"}),gc=B({id:166,name:"Modified Wooded Badlands Plateau",category:"mesa",temperature:2,precipitation:"none",depth:.45,rgb:[216,191,141],parent:Zn.id,dimension:y.Overworld,displayCategory:"legacy"}),mc=B({id:167,name:"Modified Badlands Plateau",category:"mesa",temperature:2,precipitation:"none",depth:.45,rgb:[242,180,141],parent:fs.id,dimension:y.Overworld,displayCategory:"legacy"}),Qn=B({id:168,key:"bamboo_jungle",name:"Bamboo Jungle",category:"jungle",temperature:.95,precipitation:"rain",depth:.1,rgb:[118,142,20],dimension:y.Overworld,displayCategory:"woodlands"}),ms=B({id:169,name:"Bamboo Jungle Hills",category:"jungle",temperature:.95,precipitation:"rain",depth:.45,rgb:[59,71,10],dimension:y.Overworld,displayCategory:"legacy"}),hs=B({id:170,key:"soul_sand_valley",name:"Soul Sand Valley",category:"nether",temperature:2,precipitation:"none",depth:.1,rgb:[94,56,48],climates:[{temperature:0,humidity:-.5,altitude:0,weirdness:0,offset:0}],dimension:y.Nether,displayCategory:"nether"}),ps=B({id:171,key:"crimson_forest",name:"Crimson Forest",category:"nether",temperature:2,precipitation:"none",depth:.1,rgb:[221,8,8],climates:[{temperature:.4,humidity:0,altitude:0,weirdness:0,offset:0}],dimension:y.Nether,displayCategory:"nether"}),_s=B({id:172,key:"warped_forest",name:"Warped Forest",category:"nether",temperature:2,precipitation:"none",depth:.1,rgb:[73,144,123],climates:[{temperature:0,humidity:.5,altitude:0,weirdness:0,offset:.375}],dimension:y.Nether,displayCategory:"nether"}),hc=B({id:173,key:"basalt_deltas",name:"Basalt Deltas",category:"nether",temperature:2,precipitation:"none",depth:.1,rgb:[64,54,54],climates:[{temperature:-.5,humidity:0,altitude:0,weirdness:0,offset:.175}],dimension:y.Nether,displayCategory:"nether"}),Kn=B({id:174,key:"dripstone_caves",name:"Dripstone Caves",category:"none",temperature:.8,precipitation:"rain",depth:he,rgb:[193,165,143],dimension:y.Overworld,displayCategory:"caves"}),qn=B({id:175,key:"lush_caves",name:"Lush Caves",category:"none",temperature:.5,precipitation:"rain",depth:he,rgb:[223,150,52],dimension:y.Overworld,displayCategory:"caves"}),bt=B({id:177,key:"meadow",name:"Meadow",category:"mountain",temperature:.5,precipitation:"rain",depth:he,rgb:[140,164,112],dimension:y.Overworld,displayCategory:"mountains"}),Ot=B({id:178,key:"grove",name:"Grove",category:"forest",temperature:-.2,precipitation:"snow",depth:he,rgb:[146,178,160],dimension:y.Overworld,displayCategory:"woodlands"}),vt=B({id:179,key:"snowy_slopes",name:"Snowy Slopes",category:"mountain",temperature:-.3,precipitation:"snow",depth:he,rgb:[218,241,241],dimension:y.Overworld,displayCategory:"mountains"}),Mt=B({id:180,key:"frozen_peaks",name:"Frozen Peaks",category:"mountain",temperature:-.7,precipitation:"snow",depth:he,rgb:[234,251,251],dimension:y.Overworld,displayCategory:"mountains"}),At=B({id:181,key:"jagged_peaks",name:"Jagged Peaks",category:"mountain",temperature:-.7,precipitation:"snow",depth:he,rgb:[186,188,182],dimension:y.Overworld,displayCategory:"mountains"}),rn=B({id:182,key:"stony_peaks",name:"Stony Peaks",category:"mountain",temperature:1,precipitation:"rain",depth:he,rgb:[209,209,209],dimension:y.Overworld,displayCategory:"mountains"}),ht=B({id:183,key:"deep_dark",name:"Deep Dark",category:"none",temperature:.8,precipitation:"rain",depth:he,rgb:[0,0,0],dimension:y.Overworld,displayCategory:"caves"}),Yn=B({id:184,key:"mangrove_swamp",name:"Mangrove Swamp",category:"none",temperature:.8,precipitation:"rain",depth:he,rgb:[36,196,142],dimension:y.Overworld,displayCategory:"swamps"}),ys=B({id:185,key:"cherry_grove",name:"Cherry Grove",category:"mountain",temperature:.5,precipitation:Nn,depth:he,rgb:[247,185,220],dimension:y.Overworld,displayCategory:"woodlands"}),er=B({id:186,key:"pale_garden",name:"Pale Garden",category:"forest",temperature:.7,precipitation:Nn,depth:he,rgb:[108,111,150],dimension:y.Overworld,displayCategory:"woodlands"}),tr=B({id:187,key:"sulfur_caves",name:"Sulfur Caves",category:"none",temperature:.8,precipitation:Nn,depth:he,rgb:[200,200,40],dimension:y.Overworld,displayCategory:"caves"}),ws=B({id:188,key:"dappled_forest",name:"Dappled Forest",category:"forest",temperature:.6,precipitation:Nn,depth:he,rgb:[154,63,53],dimension:y.Overworld,displayCategory:"woodlands"});function B(e){return Fe[e.id]=e,e.parent!=null&&(qa[e.parent]=e.id),e}function Je(e){return e>=0&&e<=Fe.length?Fe[e]:Xe}function pc(e){return _c(e)?"caveDepth":yc(e)?"bottom":"depth0"}function _c(e){return[qn.id,Kn.id,tr.id].includes(e)}function yc(e){return e===ht.id}function we(e){if(typeof e.seed=="string")throw new Error("toRustWorld received a PlainWorld — call fromPlainWorld() first");return new ce(e.seed.low,e.seed.high,e.edition===_.Java?1:2,e.edition===_.Java?e.javaVersion:e.bedrockVersion,e.config.biomeSize,!!e.config.largeBiomes)}class wc{provider;constructor(t){const n=we(t);this.provider=new xr(n)}getInts(t,n,r,i){return this.provider.a(t,n,r,i)}getInts1(t,n,r,i){return this.provider.b(t,n,r,i)}free(){this.provider.free()}}class bc{provider;constructor(t){const n=we(t);this.provider=new Cr(n)}getChunkBiome(t,n){return this.provider.a(t,n)}getNoiseBiome(t,n){return this.provider.b(t,n)}getBiomeArea(t,n,r,i,o){return this.provider.c(t,n,r,i,o)}free(){this.provider.free()}}class re{rng;constructor(t){const n=typeof t=="number"?k.fromInt(t):t;this.rng=new Sr(n.low,n.high)}setSeed(t){const n=typeof t=="number"?k.fromInt(t):t;this.rng.a(n.low,n.high)}nextInt(t){return t==null?this.rng.c():this.rng.b(t)}nextIntRaw(){return this.rng.d()}nextIntRange(t,n){return this.rng.e(t,n)}nextFloat(){return this.rng.f()}nextDouble(){return this.rng.g()}nextBoolean(){return this.rng.h()}free(){this.rng.free()}}const Ki=e=>e.map(t=>[t.x,t.y,t.z,ye[t.dungeon_type]]);class vc{rustFinder;constructor(t){this.rustFinder=new Er(we(t))}find(t,n){return Ki(this.rustFinder.a(t.provider,n.x,n.z,n.sizeX,n.sizeZ))}findLegacy(t){return Ki(this.rustFinder.b(t.x,t.z,t.sizeX,t.sizeZ))}free(){this.rustFinder.free()}}class be{rng;constructor(t=k.ZERO){this.rng=new Ir(t.low,t.high)}setSeed(t){this.rng.a(t.low,t.high)}getSeed(){const t=Array.from(this.rng.b());return k.fromBits(t[0],t[1])}restoreSeed(t){this.rng.c(t.low,t.high)}nextInt(t){return t==null?this.rng.f():this.rng.e(t)}nextIntVoid(t){if(t==null){this.rng.k(1);return}this.rng.e(t)}nextLong(){const t=Array.from(this.rng.g());return k.fromBits(t[0],t[1])}nextLongVoid(){this.rng.g()}nextFloat(){return this.rng.h()}nextFloatVoid(){this.rng.h()}nextDouble(){return this.rng.i()}nextDoubleVoid(){this.rng.i()}nextBoolean(){return this.rng.j()}_next(t){return this.rng.d(t)}_nextVoid(){this.rng.k(1)}consumeCount(t){this.rng.k(t)}free(){this.rng.free()}}class Sc{chunkGen;constructor(t){const n=we(t);this.chunkGen=new Br(n)}buildHeightmap(t,n){return this.chunkGen.a(t,n)}free(){this.chunkGen.free()}}class jt{rng;constructor(t){this.rng=t}static fromLoHi(t,n){return new jt(new ft(t.low,t.high,n.low,n.high))}static fromSeed(t){return new jt(ft.a(t.low,t.high))}setSeed(t){this.rng.b(t.low,t.high)}nextInt(t){return this.rng.c(t)}nextLong(){const t=Array.from(this.rng.d());return k.fromBits(t[0],t[1])}nextFloat(){return this.rng.e()}nextDouble(){return this.rng.f()}skipNextN(t){return this.rng.g(t)}free(){this.rng.free()}}class xc{rustFinder;constructor(t){this.rustFinder=new Mr(we(t))}find(t,n){return this.rustFinder.a(n.provider,t.x,t.z,t.sizeX,t.sizeZ).map(r=>({min:r.min,max:r.max,reference:r.reference,count:r.count,type:r.vein_type==="COPPER"?"copper":"iron",oreCount:r.ore_count}))}free(){this.rustFinder.free()}}const qi=4,Cc=1;function Tc(e,t){let n=new Ar(we(e));return Object.assign(r=>{if(!n)throw new Error("freed");const i=n.a(t.provider,r.x,r.z,r.sizeX,r.sizeZ),o=new Array(i.length/qi);for(let s=0,a=0;s<i.length;s+=qi,a++)o[a]={x:i[s],y:i[s+1],z:i[s+2],hasSecretChest:(i[s+3]&Cc)!==0};return o},{free(){n?.free(),n=void 0}})}var Gt=(e=>(e[e.Unset=0]="Unset",e[e.DefaultCaveStone=254]="DefaultCaveStone",e[e.Stone=1]="Stone",e[e.Water=9]="Water",e[e.Lava=11]="Lava",e[e.Chest=54]="Chest",e[e.Air=255]="Air",e))(Gt||{});Object.freeze(Gt);const it={caveDepth:3,worldSurface:1,oceanFloor:2,bottom:4,depth0:5},un={fastApproximate:1,enhanced:3,enhancedNoCaves:2,topmostAccurate:4};class qe{provider;static newOverworld(t){const n=ae.a(we(t));return new qe(n)}static newNether(t){const n=ae.b(we(t));return new qe(n)}constructor(t){this.provider=t}getNoiseBiome(t,n,r){return this.provider.c(t,n,r)}getNoiseBiomeBlock(t,n,r){return this.provider.d(t,n,r)}getNoiseBiomeAtHeightType(t,n,r){return this.provider.e(t,n,it[r])}getSurface(t,n,r,i){return this.provider.f(t,n,it[r],un[i])}getSurfaceBlock(t,n,r,i){return this.provider.g(t,n,it[r],un[i])}getSurfaceArea(t,n,r,i,o,s,a){return this.provider.h(t,n,r,i,o,it[s],un[a])}getNoiseBiomeArea(t,n,r,i,o,s,a){return this.provider.i(t,n,r,i,o,s,a)}getNoiseBiomeAreaAtHeightType(t,n,r,i,o,s){return this.provider.j(t,n,r,i,o,it[s])}findSpawnPosition(){return Array.from(this.provider.k())}getPreliminarySurfaceLevel(t,n){return Math.min(312,Math.max(-64,this.provider.l(t,n)))}getNoiseBlock(t,n,r,i){return this.provider.m(t,n,r,i)}getNoiseBiomeYColumn(t,n,r){return this.provider.n(t,n,r)}getNoiseBiomeAreaAtHeightTypeWithSurface(t,n,r,i,o,s,a,c){const l=this.provider.o(t,n,r,i,o,it[s],it[a],un[c]),u=r*i;return{biomes:l.slice(0,u),heights:l.slice(u)}}free(){this.provider.free()}}function Bc(e){return e===1||e===254}function Ec(e,t,n,r,i,o,s){const a=t>>2,c=n>>2,l=r>>2,u=i>>2;let d=null,f=0;for(let g=-u;g<=u;g++)for(let h=-u;h<=u;h++){const w=a+h,b=l+g,x=Je(e.getNoiseBiome(w,c,b));o(x)&&((d==null||s.nextInt(f+1)===0)&&(d=[w<<2,n,b<<2]),f+=1)}return d}class oi{static getBiome(t,n,r){return new oi(t).getBiomeAtChunk(n,r)}provider;constructor(t){this.provider=new bc(t)}getBiomeAtChunk(t,n){return Je(this.provider.getChunkBiome(t,n))}getNoiseBiome(t,n,r){return this.provider.getNoiseBiome(t,r)}getBiomeArea(t,n,r,i,o){return this.provider.getBiomeArea(t,n,r,i,o)}free(){this.provider.free()}}function me(e,t,n,r,i){const o=r?e.seed.add(r):e.seed;if(i==="java"||e.edition===_.Java&&i!=="bedrock"){const s=new be(o),a=k.fromInt(t).multiply(s.nextLong()),c=k.fromInt(n).multiply(s.nextLong());return s.setSeed(a.xor(c).xor(o)),s}else{const s=new re(o),a=k.fromInt(t).multiply(s.nextInt()),c=k.fromInt(n).multiply(s.nextInt());return s.setSeed(a.xor(c).xor(o)),s}}let Sn;try{Sn=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function Yi(e){e.low=-e.low&-1,e.high=~e.high,e.low===0&&(e.high=e.high+1&-1)}function xn(e,t){const n=e.high>>>16,r=e.high&65535,i=e.low>>>16,o=e.low&65535,s=t.high>>>16,a=t.high&65535,c=t.low>>>16,l=t.low&65535;let u=0,d=0,f=0,g=0;g+=o+l,f+=g>>>16,g&=65535,f+=i+c,d+=f>>>16,f&=65535,d+=r+a,u+=d>>>16,d&=65535,u+=n+s,u&=65535,e.low=f<<16|g,e.high=u<<16|d}function eo(e,t){if(e.isZero())return;if(Sn){e.low=Sn.mul(e.low,e.high,t.low,t.high),e.high=Sn.get_high();return}let n,r,i,o,s,a,c,l,u,d,f,g,h;if(e.low===0&&e.high===-2147483648){(t.low&1)===0&&(e.high=0);return}else if(t.low===0&&t.high===-2147483648){(e.low&1)===0&&(e.high=0);return}else h=!1,e.high<0&&(Yi(e),h=!h),t.high<0&&(t=t.negate(),h=!h),n=e.low&65535,r=e.low>>>16,i=e.high&65535,o=e.high>>>16,s=t.low&65535,a=t.low>>>16,c=t.high&65535,l=t.high>>>16,u=d=f=g=0,u+=n*s,d+=u>>>16,u&=65535,d+=r*s,f+=d>>>16,d&=65535,d+=n*a,f+=d>>>16,d&=65535,f+=i*s,g+=f>>>16,f&=65535,f+=r*a,g+=f>>>16,f&=65535,f+=n*c,g+=f>>>16,f&=65535,g+=o*s+i*a+r*c+n*l,g&=65535,e.low=u|d<<16,e.high=f|g<<16,h&&Yi(e)}const Ic=k.fromString("341873128712"),Vc=k.fromString("132897987541");function bs(e,t,n,r,i){const o=k.fromNumber(t);eo(o,Ic);const s=k.fromNumber(n);eo(s,Vc),xn(o,s),xn(o,e.seed),xn(o,k.fromNumber(r));let a=i;return a==null&&(a=e.edition===_.Bedrock?"bedrock":"java"),a==="bedrock"?new re(o):new be(o)}function vs(e,t,n){const r=e.javaVersion>=p.V1_18?jt.fromSeed(e.seed):new be(e.seed),i=r.nextLong().or(k.ONE),o=r.nextLong().or(k.ONE);return r.free(),k.fromNumber(t).multiply(i).add(k.fromNumber(n).multiply(o)).xor(e.seed)}function Mn(e){return e>=0?Math.floor(e):Math.ceil(e)}function kc(e){return(t,n,r,i)=>{const o=t-r>>2,s=n-r>>2,a=t+r>>2,c=n+r>>2,l=a-o+1,u=c-s+1,d=e(o,s,l,u);for(let f=0;f<l*u;++f){const g=Je(d[f]);if(!i.includes(g))return!1}return!0}}function Oc(e,t,n,r,i,o){const s=o.map(d=>d.id),a=t-i>>2,c=r-i>>2,l=t+i>>2,u=r+i>>2;for(let d=c;d<=u;d++)for(let f=a;f<=l;f++){const g=e.getNoiseBiome(f,n>>2,d);if(!s.includes(g))return!1}return!0}class si{constructor(t){this.world=t,this.provider=new wc(t)}provider;getBiomeGenAt(t,n,r,i){this.assertBedrockOrJava115OrLess();const o=[],s=this.provider.getInts1(t,n,r,i);for(let a=0;a<r*i;++a)o[a]=Je(s[a]);return o}getInts(t,n,r,i){return this.provider.getInts(t,n,r,i)}getInts1(t,n,r,i){return this.assertBedrockOrJava115OrLess(),this.provider.getInts1(t,n,r,i)}findBiomePosition(t,n,r,i,o){const s=t-r>>2,a=n-r>>2,c=t+r>>2,l=n+r>>2,u=c-s+1,d=l-a+1,f=this.provider.getInts(s,a,u,d);let g=null,h=0;for(let w=0;w<u*d;++w){const b=s+w%u<<2,x=a+Mn(w/u)<<2,C=Je(f[w]);if(!i.includes(C))continue;let I=g==null;I||(I=o.nextInt(h+1)===0),I&&(g=[b,0,x]),(I||this.world.edition===_.Bedrock||this.world.javaVersion>=p.V1_13)&&++h}return g}assertJava116Plus(){if(this.world.edition!==_.Java||this.world.javaVersion<p.V1_16)throw new Error("method is only meant to be used with Java 1.16+")}assertBedrockOrJava115OrLess(){if(this.world.edition===_.Java&&this.world.javaVersion>=p.V1_16)throw new Error("method should not be used with Java 1.16+")}getNoiseBiome(t,n){return this.assertJava116Plus(),Je(this.provider.getInts(t,n,1,1)[0])}getBiomeForStructure(t,n){return this.world.edition===_.Bedrock||this.world.javaVersion<p.V1_13?this.getBiomeGenAt(t*16+8,n*16+8,1,1)[0]:this.world.javaVersion<p.V1_16?this.getBiomeGenAt(t*16+9,n*16+9,1,1)[0]:this.getNoiseBiome((t<<2)+2,(n<<2)+2)}_getBiomeArea(t,n,r,i,o){const s=r-t+1,a=i-n+1,c=o(t,n,s,a);return(l,u)=>{if(l<t||l>r||u<n||u>i)throw new Error("biome access out of bounds");const d=l-t,f=u-n,g=d+f*s;return Je(c[g])}}getNoiseBiomeArea(t,n,r,i){return this._getBiomeArea(t,n,r,i,this.provider.getInts.bind(this.provider))}getBiomeArea(t,n,r,i){return this.assertBedrockOrJava115OrLess(),this._getBiomeArea(t,n,r,i,this.provider.getInts1.bind(this.provider))}areBiomesViable=kc((...t)=>this.provider.getInts(...t));free(){this.provider.free()}}function ai(e){return e.edition===_.Java&&e.javaVersion>=p.V1_18||e.edition===_.Bedrock&&e.bedrockVersion>=S.V1_18}function Ss(e){return e.edition===_.Java&&e.javaVersion>=p.V1_16||e.edition===_.Bedrock&&e.bedrockVersion>=S.V1_16}class xs{biomeId;constructor(t){this.biomeId=t}getBiome(){return this.biomeId}free(){}}const Mc=e=>{if(ai(e)){const t=Object.assign(qe.newOverworld(e),{legacy:()=>{throw new Error("Wrong biome provider")},noise:()=>t});return t}else{const t=Object.assign(new si(e),{legacy:()=>t,noise:()=>{throw new Error("Wrong biome provider")}});return t}},Ac=e=>{if(Ss(e)){const t=Object.assign(qe.newNether(e),{legacy:()=>{throw new Error("Wrong biome provider")},noise:()=>t});return t}else{const t=Object.assign(new xs(ei.id),{legacy:()=>t,noise:()=>{throw new Error("Wrong biome provider")}});return t}};Fe.filter(e=>e.dimension===y.Overworld).map(e=>e.id);const Cs=[wt.id,Qn.id,Dn.id],Rc=[Ne.id,Ke.id,Pe.id,Qe.id],Fc=[...Rc,Le.id,Xe.id,mt.id,gt.id,$e.id],zc=[lt.id,Ge.id],Lc=[Yr.id,$t.id];pe.id,Ae.id,kt.id,nn.id;Xt.id,ni.id,Wn.id,$n.id,rt.id,Ot.id,er.id,ws.id;const Ts=[Un.id,ii.id,Zn.id];Jt.id,Qt.id,Jn.id;bt.id,Mt.id,At.id,rn.id,vt.id;const Bs=[ke.id,jn.id,ri.id],Es=[ei.id,hs.id,ps.id,_s.id,hc.id],Is=[Ya.id,qt.id,ds.id,nc.id,rc.id];[Ve.id,Xn.id,Mt.id,At.id,vt.id,Le.id,Ne.id,Ot.id,ht.id,$t.id,Ae.id,Ge.id,...Is];[Y.id,$e.id,...Cs,...Bs,...Es,...Ts,Yn.id];[Ve.id,Xn.id,Mt.id,At.id,vt.id,Le.id,Ne.id,Ot.id,ht.id,$t.id,Ae.id,Ge.id,...Is,mt.id,Ke.id,kt.id,nn.id,pe.id,Qt.id,Jn.id,Jt.id,rn.id,ws.id];[Y.id,$e.id,...Cs,...Bs,...Es,...Ts,Yn.id,Qe.id,gt.id];Fe.filter(e=>e.displayCategory==="legacy").map(e=>e.id);const Fr={IS_OCEAN:Fc,IS_BEACH:zc,IS_RIVER:Lc};function Pc(e,t,n){return new re(Nc(e,t,n))}function Nc(e,t,n){return nr(e)(t,n)}function nr(e){const t=new re(e.seed),r=t.nextInt()|1,o=t.nextInt()|1;t.free();const s=e.seed.toInt();return function(a,c){return s^Math.imul(o,c)+Math.imul(r,a)}}const je=Je,zr=(e,t,n)=>Math.min(n,Math.max(t,e));function Lr(e){return e.edition===_.Java?["java",e.seed.toString(),e.javaVersion,e.config.flat??!1,e.config.biomeSize??null,e.config.largeBiomes??!1].join("//"):["bedrock",e.seed.toString(),e.bedrockVersion,e.config.flat??!1,e.config.biomeSize??null,e.config.largeBiomes??!1].join("//")}function Rt(e){return{...e,seed:k.fromString(e.seed)}}const Hc=[208,227,240];function Dc(e,t,n){let r="",i,o=!1;return s=>{const a=n(s);return o&&a===r||(r=a,o&&t(i),i=e(s),o=!0),i}}function Ye(e,{x:t,z:n}){return t>=e.x&&t<e.x+e.sizeX&&n>=e.z&&n<e.z+e.sizeZ}function Ft(e,t={}){const{x0:n=0,x1:r=0,z0:i=0,z1:o=0}=t;return{x:e.x+n,z:e.z+i,sizeX:e.sizeX-n+r,sizeZ:e.sizeZ-i+o}}function ci(e,t){const n=to({x:e.x,z:e.z},t),r=to({x:e.x+e.sizeX-1,z:e.z+e.sizeZ-1},t);return{x:n.x,z:n.z,sizeX:r.x-n.x+1,sizeZ:r.z-n.z+1}}function to(e,t){return{x:Math.floor(e.x/t),z:Math.floor(e.z/t)}}function ue(e,t){for(let n=e.z;n<e.z+e.sizeZ;n++)for(let r=e.x;r<e.x+e.sizeX;r++)t(r,n)}async function Vs(e,t){for(let n=e.z;n<e.z+e.sizeZ;n++)for(let r=e.x;r<e.x+e.sizeX;r++)await t(r,n)}function ks(e,t){const n=[];return ue(e,(r,i)=>{t(r,i)&&n.push([r,i])}),n}function Wc(e,t){const n=[];return ue(e,(r,i)=>{n.push(...t(r,i))}),n}function Gc(e,t){return`${e},${t}`}function jc(e){return e.split(",").map(t=>parseInt(t,10))}function Ue(e,t){const n=e.reduce((r,i)=>{const[o,s]=t(i),a=Gc(o,s);return r[a]||(r[a]=[]),r[a].push(i),r},{});return Object.entries(n).map(([r,i])=>{const[o,s]=jc(r);return[o,s,i]})}function Os(e,t,n){const r=e.filter(i=>{const o=n(i);return Ye(t,{x:o[0],z:o[1]})});return Ue(r,n)}function Uc(e,t,n,r){const i=Math.floor(t/r.spacing),o=Math.floor(n/r.spacing),{rng:s,chunkX:a,chunkZ:c}=Ms(e,i,o,r);return{rng:s,isFeatureChunk:a===t&&c===n}}function Ms(e,t,n,r){const i=bs(e,t,n,r.salt,r.forceRngType);let o,s;r.linearSeparation?(o=i.nextInt(r.spacing-r.separation),s=i.nextInt(r.spacing-r.separation)):(o=Mn((i.nextInt(r.spacing-r.separation)+i.nextInt(r.spacing-r.separation))/2),s=Mn((i.nextInt(r.spacing-r.separation)+i.nextInt(r.spacing-r.separation))/2));const a=t*r.spacing+o,c=n*r.spacing+s;return{chunkX:a,chunkZ:c,rng:i}}function q(e,t,n,r,i,o,s){return async a=>{const c=[],l=i?Ft(a,i):a,u=ci(l,t.spacing);if(await Vs(u,async(g,h)=>{const{chunkX:w,chunkZ:b,rng:x}=Ms(e,g,h,t);try{if(!Ye(l,{x:w,z:b}))return;const C=await n(w,b,x);if(!C)return;r?c.push([w,b,r(w,b,x,C)]):c.push([w,b])}finally{x.free()}}),!o)return c;const d=c.map(g=>g[2]).filter(Boolean),f=Ue(d,o).filter(g=>Ye(a,{x:g[0],z:g[1]}));return s?f.map(g=>[g[0],g[1],g[2][0]]):f}}async function Zc(e,t,n){return(await q(e,t,async()=>!0)(n)).length>0}const Jc={[m.AmethystGeode]:{[_.Java]:[p.V1_17,p.V26_3],[_.Bedrock]:[S.V1_17,S.V26_50]},[m.AncientCity]:{[_.Java]:[p.V1_19,p.V26_3],[_.Bedrock]:[S.V1_19,S.V26_50]},[m.BastionRemnant]:{[_.Java]:[p.V1_16,p.V26_3],[_.Bedrock]:[S.V1_16,S.V26_50]},[m.BuriedTreasure]:{[_.Java]:[p.V1_13,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.Cave]:{[_.Java]:[p.V1_18,p.V26_3],[_.Bedrock]:[S.V1_18,S.V26_50]},[m.DesertWell]:{[_.Java]:[p.V1_18,p.V26_3],[_.Bedrock]:[S.V1_18,S.V26_50]},[m.Dungeon]:{[_.Java]:[p.V1_13,p.V26_3],[_.Bedrock]:[S.V1_16,S.V26_50]},[m.EndCity]:{[_.Java]:[p.V1_13,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.EndGateway]:{[_.Java]:[p.V1_16,p.V26_3],[_.Bedrock]:[S.V1_16,S.V26_50]},[m.Fossil]:{[_.Java]:[p.V1_16,p.V26_3],[_.Bedrock]:[S.V1_16,S.V26_50]},[m.FossilNether]:{[_.Java]:[p.V1_16,p.V26_3],[_.Bedrock]:[S.V1_16,S.V26_50]},[m.ItemOverworld]:{[_.Java]:[p.V1_18,p.V26_3],[_.Bedrock]:[S.V1_18,S.V26_50]},[m.LavaPool]:{[_.Java]:[p.V1_18,p.V26_3],[_.Bedrock]:[S.V1_18,S.V26_50]},[m.Mineshaft]:{[_.Java]:[p.V1_7,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.NetherFortress]:{[_.Java]:[p.V1_7,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.OceanMonument]:{[_.Java]:[p.V1_8,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.OceanRuin]:{[_.Java]:[p.V1_16,p.V26_3],[_.Bedrock]:[S.V1_16,S.V26_50]},[m.OreVein]:{[_.Java]:[p.V1_18,p.V26_3],[_.Bedrock]:[S.V1_18,S.V26_50]},[m.PillagerOutpost]:{[_.Java]:[p.V1_14,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.Ravine]:{[_.Java]:[p.V1_16,p.V26_3],[_.Bedrock]:[S.V1_16,S.V26_50]},[m.RuinedPortalOverworld]:{[_.Java]:[p.V1_16,p.V26_3],[_.Bedrock]:[S.V1_16,S.V26_50]},[m.RuinedPortalNether]:{[_.Java]:[p.V1_16,p.V26_3],[_.Bedrock]:[S.V1_16,S.V26_50]},[m.DesertTemple]:{[_.Java]:[p.V1_7,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.JungleTemple]:{[_.Java]:[p.V1_7,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.WitchHut]:{[_.Java]:[p.V1_7,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.Igloo]:{[_.Java]:[p.V1_9,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.Shipwreck]:{[_.Java]:[p.V1_13,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.SlimeChunk]:{[_.Java]:[p.V1_7,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.Spawn]:{[_.Java]:[p.V1_7,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.Stronghold]:{[_.Java]:[p.V1_7,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.TrailRuin]:{[_.Java]:[p.V1_20,p.V26_3],[_.Bedrock]:[S.V1_20,S.V26_50]},[m.TrialChamber]:{[_.Java]:[p.V1_21,p.V26_3],[_.Bedrock]:[S.V1_21,S.V26_50]},[m.Village]:{[_.Java]:[p.V1_7,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.WoodlandMansion]:{[_.Java]:[p.V1_11,p.V26_3],[_.Bedrock]:[S.V1_14,S.V26_50]},[m.AbandonedCamp]:{[_.Java]:[p.V26_3,p.V26_3],[_.Bedrock]:[S.V26_50,S.V26_50]}};function W(e,t){const n=Jc[e][t.edition];if(!n)return!1;const r=t.edition===_.Java?t.javaVersion:t.bedrockVersion;return r>=n[0]&&r<=n[1]}const no=[(e,t,n)=>[e,t,n],(e,t,n)=>[-n,t,e],(e,t,n)=>[-e,t,-n],(e,t,n)=>[n,t,-e]],As=(e,t)=>{const n=e.reduce((i,o)=>i+o[1],0);let r=t.nextInt(n);for(const i of e)if(r-=i[1],r<0)return i;throw new Error("Unable to find structure")};function zt({world:e,biomeProvider:t,chunkX:n,chunkZ:r,initialY:i,projectionY:o,allowedBiomes:s,structures:a,namedStartPos:c,mapResult:l}){const u=me(e,n,r,void 0,"java");try{let d=typeof i=="number"?i:i({rng:u});const f=no[u.nextInt(no.length)],g=As(a,u),[h,,w]=g,b=a.indexOf(g),x=f(w[0]-1,w[1]-1,w[2]-1);let C=[0,0];if(c){if(o)throw new Error("not supported");const F=f(c[0],0,c[1]);C=[-F[0],-F[2]]}const I=C[0]+(n*16+n*16+x[0])/2|0,V=C[1]+(r*16+r*16+x[2])/2|0;o&&(d=d+t.getSurfaceBlock(I,V,o.heightType,o.surfaceCheckType)+1);let O,E=null;s==="all"?O=!0:(E=je(t.getNoiseBiome(I>>2,d>>2,V>>2)),typeof s=="function"?O=s(E):O=s.includes(E));const A=d-1+x[1]/2|0;if(!O)return!1;const z={key:h,x:I,y:A,z:V,yBase:d};return l?l(z,{rng:u,biome:E,structureIndex:b}):z}finally{u.free()}}const Xc=e=>(t,n)=>{const r=e.reduce((i,o)=>i+o.weight,0);return(i,o)=>{const s=me(t,i,o);try{let a=[...e],c=r;for(;a.length>0;){let l=s.nextInt(c),u=a[0];for(const f of a)if(l-=f.weight,l<0){u=f;break}const d=u.canGenerate(i,o);if(d)return u.poi===n?d:!1;c-=u.weight,a=a.filter(f=>f!==u)}return!1}finally{s.free()}}},Rs=(e,t,n)=>Xc([{poi:m.NetherFortress,weight:2,canGenerate:()=>!0},{poi:m.BastionRemnant,weight:3,canGenerate:(r,i)=>Qc(e,t[y.Nether],r,i)}])(e,n),$c={supportsWorld:e=>W(m.BastionRemnant,e),create:Kc},Pr=[ps,ei,hs,_s];function ro(e,t,n,r){if(e.edition===_.Java&&e.javaVersion>=p.V1_18){const i=me(e,t,n),o=i.nextInt(5)>=2;return i.free(),o}else{const i=e.edition===_.Bedrock?6:5;return r.nextInt(i)>=2}}function Qc(e,t,n,r){const i=zt({world:e,biomeProvider:t.noise(),chunkX:n,chunkZ:r,initialY:33,projectionY:null,allowedBiomes:Pr,structures:[["units",1,[46,24,46]],["hoglin_stable",1,[30,24,48]],["treasure",1,[38,48,38]],["bridge",1,[16,32,32]]]});return i?i.key:!1}async function Kc(e,t){const n=t.nether.noise(),r=Rs(e,t,m.BastionRemnant);return q(e,{spacing:e.edition===_.Bedrock?30:27,separation:4,salt:30084232,linearSeparation:!0},async(i,o,s)=>{if(e.edition===_.Java)if(e.javaVersion>=p.V1_18){const a=r(i,o);return a?{type:a}:!1}else{if(!ro(e,i,o,s)||!Pr.includes(je(n.getNoiseBiome(i*4+2,0,o*4+2))))return!1;const a=me(e,i,o);a.nextInt(4);const c=a.nextInt(4);return a.free(),{type:["units","hoglin_stable","treasure","bridge"][c]}}else return!ro(e,i,o,s)||!Oc(n,i*16+8,0,o*16+8,2,Pr)?!1:(s.nextInt(4),{type:["bridge","treasure","hoglin_stable","units"][s.nextInt(4)]})},(i,o,s,a)=>a)}const pt=(e,t,n,r)=>je(e.getNoiseBiomeAtHeightType(t*4+2,n*4+2,r)),rr=(e,t,n,r)=>je(e.getNoiseBiomeBlock(t,n,r)),ut=(e,t,n,r,i,o)=>!!li(e,t,n,r,i,o),li=(e,t,n,r,i,o)=>{const s=o.map(V=>V.id),a=t-i,c=n-i,l=r-i,u=t+i,d=n+i,f=r+i;let g;const h=Math.floor((u-a+4)/4),w=a+Math.floor(h/2)*4,b=Math.floor((d-c+4)/4),x=c+Math.floor(b/2)*4,C=Math.floor((f-l+4)/4),I=l+Math.floor(C/2)*4;for(let V=c;V<=d;V+=4)for(let O=a;O<=u;O+=4)for(let E=l;E<=f;E+=4){const A=e.getNoiseBiomeBlock(O,V,E);if(!s.includes(A))return!1;O===w&&V===x&&E===I&&(g=je(A))}return g??je(e.getNoiseBiomeBlock(t,n,r))},qc=(e,t,n,r,i)=>[[t,n],[t+r,n],[t,n+i],[t+r,n+i]].map(o=>e.getSurfaceBlock(o[0],o[1],"worldSurface","topmostAccurate")),io=(e,t,n,r,i)=>{const o=qc(e,t*16,n*16,r,i);return Math.min(...o)},Yc={supportsWorld:e=>W(m.BuriedTreasure,e),create:el};async function el(e,t){return e.edition===_.Java?rl(e,t.overworld):nl(e,t.overworld)}const oo=[lt,Ge,as,Hn],tl=[lt,Ge];function nl(e,t){return q(e,{salt:16842397,spacing:4,separation:2,linearSeparation:!1},async(n,r)=>{if(e.bedrockVersion>=S.V1_18){const i=t.noise(),o=i.getPreliminarySurfaceLevel(n*4,r*4);return ut(i,n*16+8,o,r*16+8,3,oo)}else return t.legacy().areBiomesViable(n*16+8,r*16+8,3,oo)})}function rl(e,t){return async n=>{const r=[];return ue(n,(i,o)=>{const s=bs(e,i,o,10387320);if(s.nextFloat()>=.01){s.free();return}const a=e.javaVersion>=p.V1_18?pt(t.noise(),i,o,"oceanFloor"):t.legacy().getBiomeForStructure(i,o);tl.includes(a)&&r.push([i,o]),s.free()}),r}}const ui=(e,t)=>async n=>{if(n.sizeX<=t&&n.sizeZ<=t)return e(n);const r=ci(n,t),i=[];return await Vs(r,async(o,s)=>{const a=await e({x:o*t,z:s*t,sizeX:t,sizeZ:t});i.push(...a)}),i.filter(o=>Ye(n,{x:o[0],z:o[1]}))};function Fs(e){return async t=>async n=>ks(n,(r,i)=>e(t,r,i))}const zs={supportsWorld:e=>W(m.Mineshaft,e),create:Fs(il)};function il(e,t,n){return e.edition===_.Bedrock?sl(e,t,n):ol(e,t,n)}function ol(e,t,n){const r=me(e,t,n);try{if(e.javaVersion<p.V1_13&&r.nextIntVoid(),r.nextDouble()>=.004)return!1;if(e.javaVersion>=p.V1_13)return!0;const i=Math.max(Math.abs(t),Math.abs(n));return i>=80?!0:r.nextInt(80)<i}finally{r.free()}}function sl(e,t,n){const r=me(e,t,n);if(r.nextInt(),r.nextFloat()>=.004)return r.free(),!1;const o=r.nextInt(80)<Math.max(Math.abs(t),Math.abs(n));return r.free(),o}const al={supportsWorld:e=>W(m.Dungeon,e),create:async(e,t)=>{const n=new vc(e),i=ai(e)?t.overworld.noise():void 0,o=e.edition===_.Bedrock?[await cl(e)]:[],s=ui(async c=>{const l=i?n.find(i,c):n.findLegacy(c);return Ue(l,u=>[u[0]>>4,u[2]>>4])},16),a=async c=>{let l=await s(c);for(const u of o)l=await u(c,l);return l};return a.free=()=>{o.forEach(c=>c.free?.()),n.free()},a}},Pt=6,cl=async e=>{const t=await zs.create(e),n=async(r,i)=>{const o=await t(Ft(r,{x0:-Pt-1,z0:-Pt-1,x1:Pt,z1:Pt}));return i=i.filter(s=>(s[2]=s[2].filter(a=>{const c=a[0]-8>>4,l=a[2]-8>>4;return!o.find(u=>Math.sqrt((c-u[0])*(c-u[0])+(l-u[1])*(l-u[1]))<Pt)}),s[2].length>0)),i};return n.free=()=>{t.free?.()},n};class Ls{chunkGen;constructor(t){this.chunkGen=new Sc(t)}buildHeightmap(t,n){return this.chunkGen.buildHeightmap(t,n)}free(){this.chunkGen.free()}}const ll={supportsWorld:e=>W(m.EndCity,e),create:async(e,t)=>{const n=t.end,r=new Ls(e),i=q(e,{spacing:20,separation:11,salt:10387313,linearSeparation:!1},async(o,s)=>ul(e,r,n,o,s),(o,s,a)=>{if(e.edition===_.Java){const c=me(e,o,s);c.nextInt(4);const l=so(c);return c.free(),{hasShip:l}}return{hasShip:so(a)}});return i.free=()=>{r.free()},i}};function ul(e,t,n,r,i){const o=n.getBiomeAtChunk(r,i);return[qt,ds].includes(o)?fl(e,r,i,t)>=60:!1}const fn=(e,t)=>e*16+t;function fl(e,t,n,r){const i=r.buildHeightmap(t,n);let o;e.edition===_.Java?e.javaVersion>=p.V1_19?o=me(e,t,n):o=new be(k.fromNumber(t).add(k.fromNumber(n).mul(10387313))):o=new re(10387313*n+t);const s=o.nextInt(4);o.free();let a=5,c=5;s===1?a=-5:s===2?(a=-5,c=-5):s===3&&(c=-5);const l=i[fn(7,7)],u=i[fn(7,7+c)],d=i[fn(7+a,7)],f=i[fn(7+a,7+c)];return Math.min(l,u,d,f)+(e.edition===_.Bedrock?1:0)}function so(e){const t={hasShip:!1};return Ct("TOWER_GENERATOR",1,e,t),t.hasShip}const dl={TOWER_GENERATOR:(e,t,n)=>{t.nextInt(2),t.nextInt(2);let r=t.nextInt(3)===0;const i=1+t.nextInt(3);for(let o=0;o<i;o++)o>=i-1||!t.nextBoolean()||(r=!0);if(r)for(let o=0;o<4;o++)t.nextBoolean()&&Ct("TOWER_BRIDGE_GENERATOR",e+1,t,n);else if(e!==7)return Ct("FAT_TOWER_GENERATOR",e+1,t,n);return!0},TOWER_BRIDGE_GENERATOR:(e,t,n)=>{const r=t.nextInt(4)+1;for(let i=0;i<r;i++)t.nextBoolean()||t.nextBoolean();if(n.hasShip||t.nextInt(10-e)!==0){if(!Ct("HOUSE_TOWER_GENERATOR",e+1,t,n))return!1}else t.nextInt(8),t.nextInt(10),n.hasShip=!0;return!0},HOUSE_TOWER_GENERATOR:(e,t,n)=>{if(e>8)return!1;const r=t.nextInt(3);return(r===1||r===2)&&Ct("TOWER_GENERATOR",e+1,t,n),!0},FAT_TOWER_GENERATOR:(e,t,n)=>{for(let r=0;r<2&&t.nextInt(3)!==0;r++)for(let i=0;i<4;i++)t.nextBoolean()&&Ct("TOWER_BRIDGE_GENERATOR",e+1,t,n);return!0}};function Ct(e,t,n,r){return t>8||r.hasShip?!1:dl[e](t,n,r)?(n.nextInt(),!0):!1}const gl=e=>async t=>ks(t,(n,r)=>{const i=n>>4,o=r>>4,s=k.fromNumber(i^o<<4).xor(e.seed),a=e.edition===_.Bedrock?new re(s):new be(s);try{if(a.nextInt(),a.nextInt(3)!==0)return!1;const c=(i<<4)+4+a.nextInt(8);if(n!==c)return!1;const l=(o<<4)+4+a.nextInt(8);return r===l}finally{a.free()}}),ml=(e,t)=>{const n=Rs(e,t,m.NetherFortress);return q(e,{spacing:e.edition===_.Bedrock?30:27,separation:4,salt:30084232,linearSeparation:!0},async(r,i,o)=>e.edition===_.Java&&e.javaVersion>=p.V1_18?!!n(r,i):o.nextInt(e.edition===_.Bedrock?6:5)<2)},hl={supportsWorld:e=>W(m.NetherFortress,e),create:async(e,t)=>e.edition===_.Java&&e.javaVersion<p.V1_16||e.edition===_.Bedrock&&e.bedrockVersion<S.V1_16?gl(e):ml(e,t)},Nr=63,pl=-64,ao=[Xe,Pe,Yr,Le,$t],dn=[Ke,Ne,Qe,Pe,Yt],gn=[Xe,Le,Pe,$e,gt,mt,Yt,Qe,Ke,Ne,Yr,$t],Ps={spacing:32,separation:5,salt:10387313,linearSeparation:!1},fi={supportsWorld:e=>W(m.OceanMonument,e),create:async(e,t)=>q(e,Ps,async(n,r)=>_l(e,t.overworld,n,r))};function _l(e,t,n,r){if(e.edition===_.Java)if(e.javaVersion>=p.V1_18){const i=t.noise();return dn.includes(pt(i,n,r,"oceanFloor"))&&ut(i,n*16+9,Nr,r*16+9,29,gn)}else if(e.javaVersion>=p.V1_13){const i=t.legacy();return i.areBiomesViable(n*16+9,r*16+9,16,dn)&&i.areBiomesViable(n*16+9,r*16+9,29,gn)}else if(e.javaVersion>=p.V1_9){const i=t.legacy();return i.areBiomesViable(n*16+8,r*16+8,16,[Pe])&&i.areBiomesViable(n*16+8,r*16+8,29,ao)}else{const i=t.legacy();return i.getBiomeGenAt(n*16+8,r*16+8,1,1)[0]===Pe&&i.areBiomesViable(n*16+8,r*16+8,29,ao)}else if(e.bedrockVersion>=S.V1_18){const i=t.noise(),o=i.getPreliminarySurfaceLevel(n*4,r*4);return ut(i,n*16+8,o,r*16+8,16,dn)&&ut(i,n*16+8,o,r*16+8,29,gn)}else{const i=t.legacy();return i.areBiomesViable(n*16+8,r*16+8,16,dn)&&i.areBiomesViable(n*16+8,r*16+8,29,gn)}}const yl={supportsWorld:e=>W(m.RuinedPortalOverworld,e),create:async e=>q(e,{spacing:40,separation:15,salt:e.edition===_.Bedrock?40552231:34222645,linearSeparation:!0},async()=>!0)},wl={supportsWorld:e=>W(m.RuinedPortalNether,e),create:async e=>q(e,e.edition===_.Java&&e.javaVersion>=p.V1_18?{spacing:40,separation:15,salt:34222645,linearSeparation:!0}:{spacing:25,separation:10,salt:e.edition===_.Bedrock?40552231:34222645,linearSeparation:!0},async()=>!0)},mn=e=>e.edition===_.Java&&e.javaVersion>=p.V1_13,bl=e=>e.edition===_.Java&&e.javaVersion>=p.V1_16,Cn=e=>e.edition===_.Java&&e.javaVersion>=p.V1_18,Ns=e=>e.edition===_.Bedrock&&e.bedrockVersion>=S.V1_18,vl={SHIPWRECK:e=>e.edition===_.Bedrock?{...Ns(e)?{spacing:24,separation:4}:{spacing:10,separation:5,linearSeparation:!1},salt:165745295,allowedBiomes:[lt,Ge,Hn,Xe,Pe,mt,Ke,gt,Qe,Le,Ne,$e],checkChunk:(t,...n)=>Bl(e,...n)}:{...bl(e)?{spacing:24,separation:4}:{spacing:16,separation:8},salt:mn(e)?165745295:14357617,checkBiome:Cn(e)?(t,n,r,i,o)=>{const s=[lt,Ge],a=o.filter(u=>!s.includes(u)),c=pt(n.noise(),r,i,"worldSurface");if(s.includes(c))return c;const l=pt(n.noise(),r,i,"oceanFloor");return a.includes(l)?l:!1}:void 0,allowedBiomes:[lt,Ge,Le,Xe,mt,gt,$e,Ne,Ke,Pe,Qe,Yt]},DESERT_TEMPLE:e=>({spacing:32,separation:8,salt:14357617,allowedBiomes:[Y,ss],checkChunk:Cn(e)?async(t,n,r,i,o,s)=>io(n.noise(),o,s,21,21)>=Nr:void 0}),JUNGLE_TEMPLE:e=>({spacing:32,separation:8,salt:mn(e)?14357619:14357617,allowedBiomes:[wt,ti,...e.edition!==_.Bedrock?[Qn,ms]:[]],checkChunk:Cn(e)?async(t,n,r,i,o,s)=>io(n.noise(),o,s,12,15)>=Nr:void 0}),IGLOO:e=>({spacing:32,separation:8,salt:mn(e)?14357618:14357617,allowedBiomes:[Ve,Ae,vt]}),WITCH_HUT:e=>({spacing:32,separation:8,salt:mn(e)?14357620:14357617,allowedBiomes:e.edition===_.Java?[dt]:[dt,gs]})},Hs={supportsWorld:e=>W(m.DesertTemple,e),create:(e,t,n)=>on("DESERT_TEMPLE",e,t.overworld,n)},Sl={supportsWorld:e=>W(m.JungleTemple,e),create:(e,t,n)=>on("JUNGLE_TEMPLE",e,t.overworld,n)},xl={supportsWorld:e=>W(m.WitchHut,e),create:(e,t,n)=>on("WITCH_HUT",e,t.overworld,n)},Cl={supportsWorld:e=>W(m.Igloo,e),create:(e,t,n)=>on("IGLOO",e,t.overworld,n,(r,i)=>{if(e.edition===_.Bedrock){const a=Pc(e,r,i);a.nextInt();const c=a.nextDouble()>=.5;return a.free(),{hasBasement:c}}if(e.javaVersion<p.V1_13)return{hasBasement:null};const o=me(e,r,i);o.nextInt(4);const s=o.nextDouble()<.5;return o.free(),{hasBasement:s}})},Tl={supportsWorld:e=>W(m.Shipwreck,e),create:(e,t,n)=>on("SHIPWRECK",e,t.overworld,n)};async function Bl(e,t,n,r,i,o){const a=[Ge,lt,Hn].includes(r)?10:20;return(e.bedrockVersion>=S.V1_18?ut(t.noise(),i*16+8,t.noise().getPreliminarySurfaceLevel(i*4,o*4),o*16+8,a,[r]):t.legacy().areBiomesViable((i<<4)+8,(o<<4)+8,a,[r]))?(await(await fi.create(e,{overworld:t},n))({x:i-5,z:o-5,sizeX:10,sizeZ:10})).length<1:!1}function El(e,t,n,r,i){const o=Cn(e)?pt(t.noise(),n,r,"worldSurface"):Ns(e)?rr(t.noise(),n*16+8,t.noise().getPreliminarySurfaceLevel(n*4,r*4),r*16+8):t.legacy().getBiomeForStructure(n,r);return i.includes(o)?o:!1}async function on(e,t,n,r,i){const{allowedBiomes:o,checkBiome:s,checkChunk:a,...c}=vl[e](t),l={linearSeparation:!0,...c},u=s||El,d=async(f,g)=>{const h=u(t,n,f,g,o);return h?!a||await a(t,n,r,h,f,g):!1};return i?q(t,l,d,i):q(t,l,d)}const Il={supportsWorld:e=>W(m.SlimeChunk,e),create:Fs(Vl)};function Vl(e,t,n){return e.edition===_.Bedrock?zl(t,n):Fl(e.seed,t,n)}const kl=4987142,Ol=5947611,Ml=k.fromInt(4392871),Al=389711,Rl=k.fromInt(987234911);function Fl(e,t,n){const r=e.add(k.fromInt(Math.imul(Math.imul(t,t),kl))).add(k.fromInt(Math.imul(t,Ol))).add(k.fromInt(Math.imul(n,n)).multiply(Ml)).add(k.fromInt(Math.imul(n,Al))).xor(Rl),i=new be(r),o=i.nextInt(10)===0;return i.free(),o}function zl(e,t){const n=new re(Math.imul(e,522133279)^t),r=n.nextInt(10)===0;return n.free(),r}const di={supportsWorld:e=>W(m.Village,e),create:Ll};function Ds(e){return{spacing:e.javaVersion>=p.V1_18?34:32,separation:8,salt:10387312,linearSeparation:!0}}async function Ll(e,t){if(e.edition===_.Java){const r=Ds(e);return e.javaVersion>=p.V1_18?q(e,r,async(i,o)=>Hl(e,t.overworld,i,o),(i,o,s,a)=>a):q(e,r,async(i,o)=>Nl(e,t.overworld,i,o),(i,o,s,a)=>{if(a===!0)return{type:null,zombie:null};if(e.javaVersion<p.V1_15)return{type:null,zombie:null};const c=lo(a),l=me(e,i,o);l.nextIntVoid(4);const u=As(Gs[c],l);return l.free(),{type:c,zombie:js(u[0])}})}const n=t.overworld;return q(e,{spacing:e.bedrockVersion>=S.V1_18?34:27,separation:e.bedrockVersion>=S.V1_18?8:10,salt:10387312,linearSeparation:!1},async(r,i)=>e.bedrockVersion>=S.V1_18?li(n.noise(),r*16+8,n.noise().getPreliminarySurfaceLevel(r*4,i*4),i*16+8,2,co):n.legacy().areBiomesViable(r*16+8,i*16+8,2,co),(r,i,o,s)=>{const a=typeof s!="boolean"?s:e.bedrockVersion>=S.V1_18?rr(n.noise(),r*16+8,n.noise().getPreliminarySurfaceLevel(r*4,i*4),i*16+8):n.legacy().getBiomeForStructure(r,i);o.nextInt(4);const c=e.bedrockVersion>=S.V1_18?.02:.2;return{type:lo(a),zombie:o.nextDouble()<c}})}const mr=[Ie,Y,ke],hn=[Ie,Y,ke,pe],pn=[Ie,Y,ke,pe,Ve],ve=[Y,Ie,bt,ke,Ve,pe],Ws={[p.V1_7]:mr,[p.V1_8]:mr,[p.V1_9]:mr,[p.V1_10]:hn,[p.V1_11]:hn,[p.V1_12]:hn,[p.V1_13]:hn,[p.V1_14]:pn,[p.V1_15]:pn,[p.V1_16]:pn,[p.V1_17]:pn,[p.V1_18]:ve,[p.V1_19]:ve,[p.V1_19_3]:ve,[p.V1_20]:ve,[p.V1_21]:ve,[p.V1_21_2]:ve,[p.V1_21_4]:ve,[p.V1_21_5]:ve,[p.V1_21_6]:ve,[p.V1_21_9]:ve,[p.V26_2]:ve,[p.V26_3]:ve},co=[Ie,en,ke,Ve,pe,Kt,Ae,Gn,Y,bt],gi={desert:[Y],plains:[Ie,en,bt],savanna:[ke],snowy:[Ve],taiga:[pe,Kt,Ae,Gn]},Pl=Object.keys(gi),lo=e=>{for(const t of Pl)if(gi[t].includes(e))return t;throw new Error(`Unexpected biome for village: ${e.id}`)};function Nl(e,t,n,r){const i=Ws[e.javaVersion],o=t.legacy();if(e.javaVersion<p.V1_13)return o.areBiomesViable(n*16+8,r*16+8,0,i);const s=o.getBiomeForStructure(n,r);return i.includes(s)?s:!1}const Gs={desert:[["desert_meeting_point_1",98,[17,6,9]],["desert_meeting_point_2",98,[12,6,12]],["desert_meeting_point_3",49,[15,6,15]],["zombie/desert_meeting_point_1",2,[17,6,9]],["zombie/desert_meeting_point_2",2,[12,6,12]],["zombie/desert_meeting_point_3",1,[15,6,15]]],plains:[["plains_fountain_01",50,[9,4,9]],["plains_meeting_point_1",50,[10,7,10]],["plains_meeting_point_2",50,[8,5,15]],["plains_meeting_point_3",50,[11,9,11]],["zombie/plains_fountain_01",1,[9,6,9]],["zombie/plains_meeting_point_1",1,[10,7,10]],["zombie/plains_meeting_point_2",1,[8,5,15]],["zombie/plains_meeting_point_3",1,[11,9,11]]],savanna:[["savanna_meeting_point_1",100,[14,5,12]],["savanna_meeting_point_2",50,[11,6,11]],["savanna_meeting_point_3",150,[9,6,11]],["savanna_meeting_point_4",150,[9,6,9]],["zombie/savanna_meeting_point_1",2,[14,6,12]],["zombie/savanna_meeting_point_2",1,[11,6,11]],["zombie/savanna_meeting_point_3",3,[9,6,11]],["zombie/savanna_meeting_point_4",3,[9,6,9]]],snowy:[["snowy_meeting_point_1",100,[12,8,8]],["snowy_meeting_point_2",50,[11,5,9]],["snowy_meeting_point_3",150,[7,7,7]],["zombie/snowy_meeting_point_1",2,[12,8,8]],["zombie/snowy_meeting_point_2",1,[11,6,9]],["zombie/snowy_meeting_point_3",3,[7,7,7]]],taiga:[["taiga_meeting_point_1",49,[22,3,18]],["taiga_meeting_point_2",49,[9,7,9]],["zombie/taiga_meeting_point_1",1,[22,6,18]],["zombie/taiga_meeting_point_2",1,[9,7,9]]]},js=e=>e.startsWith("zombie/");function Hl(e,t,n,r){const i=Ws[e.javaVersion],o=t.noise(),s=["plains","desert","savanna","snowy","taiga"];for(const a of s){const c=gi[a].filter(u=>i.includes(u));if(c.length<1)continue;const l=zt({world:e,biomeProvider:o,chunkX:n,chunkZ:r,initialY:0,projectionY:{heightType:"worldSurface",surfaceCheckType:"topmostAccurate"},allowedBiomes:c,structures:Gs[a]});if(l)return{type:a,zombie:js(l.key)}}return!1}const Dl={supportsWorld:e=>W(m.Stronghold,e),finiteGenerationArea:e=>e.edition===_.Java?{x:-1536,z:-1536,sizeX:3072,sizeZ:3072}:null,create:async(e,t,n)=>{const r=await n.sharedTask("StrongholdFinder.staticStrongholds",()=>Wl(e,t.overworld,n));return async i=>[...r.filter(([o,s])=>Ye(i,{x:o,z:s})),...Gl(e,i)]}};async function Wl(e,t,n){return e.edition===_.Bedrock?await Jl(e,t,n):e.javaVersion>=p.V1_9?jl(e,t):Zl(e,t.legacy())}function Gl(e,t){return e.edition===_.Bedrock?Ul(e,t):[]}const Tn=32,Us=3,at=[Ie,Y,Jt,Xt,pe,Ve,ec,os,ss,Qt,Kt,tc,wt,ti,Dn,as,Wn,cs,rt,Ae,Gn,kt,ls,us,ke,jn,Un,Zn,fs,en,ic,Jn,ni,oc,Xn,sc,ac,$n,cc,tn,lc,nn,uc,fc,ri,dc,ii,gc,mc],Bn=[...at,Hn],uo=[...Bn,Qn,ms],Se=[Ie,Y,Jt,Xt,pe,Ve,os,Qt,wt,Dn,Wn,rt,Ae,kt,ke,jn,Un,Zn,en,Jn,ni,Xn,$n,nn,ri,ii,Qn,Kn,qn,bt,Ot,vt,Mt,At,rn,er,tr],Hr={[p.V1_7]:at,[p.V1_8]:at,[p.V1_9]:at,[p.V1_10]:at,[p.V1_11]:at,[p.V1_12]:at,[p.V1_13]:Bn,[p.V1_14]:uo,[p.V1_15]:uo,[p.V1_16]:Bn,[p.V1_17]:Bn,[p.V1_18]:Se,[p.V1_19]:Se,[p.V1_19_3]:Se,[p.V1_20]:Se,[p.V1_21]:Se,[p.V1_21_2]:Se,[p.V1_21_4]:Se,[p.V1_21_5]:Se,[p.V1_21_6]:Se,[p.V1_21_9]:Se,[p.V26_2]:Se,[p.V26_3]:Se};function jl(e,t){const r=new be(e.seed);let i=r.nextDouble()*3.141592653589793*2;const o=[];let s=0,a=0,c=Us;for(let l=0;l<128;++l){const u=r.nextDouble(),d=4*Tn+Tn*s*6+(u-.5)*Tn*2.5;let f=Math.round(Math.cos(i)*d),g=Math.round(Math.sin(i)*d);const h=e.javaVersion>=p.V1_19_3?new be(r.nextLong()):null,w=e.javaVersion>=p.V1_18?Ec(t.noise(),(f<<4)+8,0,(g<<4)+8,112,b=>Hr[e.javaVersion].includes(b),e.javaVersion>=p.V1_19_3?h:r):t.legacy().findBiomePosition((f<<4)+8,(g<<4)+8,112,Hr[e.javaVersion],r);h?.free(),w!=null&&(f=w[0]>>4,g=w[2]>>4),o.push([f,g]),i+=6.283185307179586/c,a+=1,a===c&&(s++,a=0,c+=Mn(2*c/(s+1)),c=Math.min(c,128-l),i+=r.nextDouble()*3.141592653589793*2)}return r.free(),o}function Ul(e,t){const o=ci(t,200);return Wc(o,(s,a)=>{const c=s*200+Math.floor(100),l=a*200+Math.floor(200/2),u=(Math.imul(-1683231919,c)-Math.imul(1100435783,l)+e.seed.toInt()|0)+97858791|0,d=new re(u),f=200*s+200-150,g=200*a+200-150,h=200*s+150,w=200*a+150,b=d.nextIntRange(f,h),x=d.nextIntRange(g,w),C=d.nextFloat()<.25;return d.free(),C?[[b,x]]:[]}).filter(([s,a])=>Ye(t,{x:s,z:a}))}function Zl(e,t){const r=new be(e.seed);let i=r.nextDouble()*3.141592653589793*2,o=1;const s=[];let a=Us;for(let c=0;c<3;++c){const l=r.nextDouble(),u=(1.25*o+l)*Tn*o;let d=Math.round(Math.cos(i)*u),f=Math.round(Math.sin(i)*u);const g=t.findBiomePosition((d<<4)+8,(f<<4)+8,112,Hr[e.javaVersion],r);g!=null&&(d=g[0]>>4,f=g[2]>>4),s.push([d,f]),i+=3.141592653589793*2*o/a,c===a&&(o+=2+r.nextInt(5),a+=1+r.nextInt(2))}return r.free(),s}async function Jl(e,t,n){const i=[],o=await di.create(e,{overworld:t},n),s=new re(e.seed);let a=s.nextFloat()*Math.PI*2,c=s.nextInt(16)+40;s.free();let l=0;for(;l<3;){const u=Math.floor(c*Math.cos(a)),d=Math.floor(c*Math.sin(a));let f=!1;e:for(let g=u-8;g<u+8;g++)for(let h=d-8;h<d+8;h++)if((await o({x:g,z:h,sizeX:1,sizeZ:1})).length>0){i[l++]=[g,h],f=!0;break e}f?(a+=.6*Math.PI,c+=8):(a+=.25*Math.PI,c+=4)}return i}const Xl=[rt,tn],$l=[rt,tn,er],Ql=[rt,tn,qn,Kn],Kl=[rt,tn,qn,Kn,er,tr],ql=e=>e.edition===_.Java?e.javaVersion>=p.V1_21_5?$l:Xl:e.bedrockVersion>=S.V1_21_60?Kl:Ql,Yl={supportsWorld:e=>W(m.WoodlandMansion,e),create:async(e,t)=>q(e,{spacing:80,separation:20,linearSeparation:!1,salt:10387319},async(n,r)=>eu(e,t.overworld,n,r))};function eu(e,t,n,r){const i=ql(e);if(e.edition===_.Java&&e.javaVersion>=p.V1_18){const s=t.noise().getNoiseBiomeAtHeightType(n*16+7>>2,r*16+7>>2,"worldSurface");return i.includes(je(s))}else if(e.edition===_.Bedrock&&e.bedrockVersion>=S.V1_18)return ut(t.noise(),n*16+8,t.noise().getPreliminarySurfaceLevel(n*4,r*4),r*16+8,32,i);const o=e.edition!==_.Bedrock&&e.javaVersion>=p.V1_13?9:8;return t.legacy().areBiomesViable(n*16+o,r*16+o,32,i)}const fo=[Ie,Y,pe,Ve,ke,Ot,bt,Mt,At,rn,vt,ys],Zs=[Ie,en,ke,Ve,pe,Kt,Gn,Y],tu=[...Zs,Ae,bt,Mt,At,rn,vt,Ot,ys],nu={supportsWorld:e=>W(m.PillagerOutpost,e),create:async(e,t,n)=>{if(e.edition===_.Bedrock)return q(e,{spacing:80,separation:24,salt:165745296,linearSeparation:!1},async(i,o)=>ru(e,t.overworld,i,o));const r=await di.create(e,t,n);return q(e,{spacing:32,separation:8,salt:165745296,linearSeparation:!0},async(i,o)=>await iu(e,t.overworld,r,i,o))}};function ru(e,t,n,r){return e.bedrockVersion>=S.V1_18?ut(t.noise(),n*16+8,t.noise().getPreliminarySurfaceLevel(n*4,r*4),r*16+8,0,tu):t.legacy().areBiomesViable(n*16+8,r*16+8,0,Zs)}async function iu(e,t,n,r,i){const o=r>>4,s=i>>4,a=k.fromNumber(o^s<<4).xor(e.seed),c=new be(a);c.nextIntVoid();const l=c.nextInt(5);if(c.free(),l!==0||!ou(e,t,r,i))return!1;const u={x:r-10,z:i-10,sizeX:21,sizeZ:21};return e.javaVersion>=p.V1_16?!await Zc(e,Ds(e),u):(await n(u)).length<=0}function ou(e,t,n,r){return e.javaVersion>=p.V1_18?!!zt({world:e,biomeProvider:t.noise(),chunkX:n,chunkZ:r,initialY:0,projectionY:{heightType:"worldSurface",surfaceCheckType:"topmostAccurate"},allowedBiomes:fo,structures:[["outpost",1,[16,30,16]]]}):fo.includes(t.getBiomeForStructure(n,r))}const ot={warm:[Qe,Yt,gt,$e],cold:[mt,Ke,Ne,Pe,Le,Xe]},su=new Map([[Le,{type:"cold",largeProbability:.3,clusterProbability:.25}],[Xe,{type:"cold",largeProbability:.3,clusterProbability:.25}],[Pe,{type:"cold",largeProbability:.5,clusterProbability:.4}],[$e,{type:"warm",largeProbability:.3,clusterProbability:.5}],[Yt,{type:"warm",largeProbability:.3,clusterProbability:.5}],[gt,{type:"warm",largeProbability:.3,clusterProbability:.5}],[Qe,{type:"warm",largeProbability:.3,clusterProbability:.5}],[mt,{type:"cold",largeProbability:.3,clusterProbability:.25}],[Ke,{type:"cold",largeProbability:.5,clusterProbability:.4}],[Ne,{type:"cold",largeProbability:.5,clusterProbability:.4}]]),au={supportsWorld:e=>W(m.OceanRuin,e),async create(e,t,n){const r=e.edition===_.Bedrock?await fi.create(e,t,n):null;return q(e,e.edition===_.Java||e.bedrockVersion>=S.V1_18?{spacing:20,separation:8,linearSeparation:!0,salt:14357621}:{spacing:12,separation:7,linearSeparation:!1,salt:14357621},async(i,o)=>{if(e.edition===_.Bedrock){if((await r({x:i-5,z:o-5,sizeX:10,sizeZ:10})).length>=1)return!1;const a=[...ot.cold,...ot.warm];let c;if(e.bedrockVersion>=S.V1_18){const l=t.overworld.noise(),u=l.getPreliminarySurfaceLevel(i*4,o*4);if(c=li(l,i*16+8,u,o*16+8,0,a),!c)return!1}else{if(!t.overworld.legacy().areBiomesViable(i*16+8,o*16+8,0,a))return!1;c=t.overworld.legacy().getBiomeForStructure(i,o)}return[...ot.cold,...ot.warm].includes(c)?c:!1}else{const s=e.javaVersion>=p.V1_18?pt(t.overworld.noise(),i,o,"oceanFloor"):t.overworld.legacy().getBiomeForStructure(i,o);return[...ot.cold,...ot.warm].includes(s)?s:!1}},(i,o,s,a)=>{const c=e.edition===_.Bedrock?su.get(a):{type:ot.cold.includes(a)?"cold":"warm",largeProbability:.3,clusterProbability:.9};if(!c)throw new Error("Unexpected biome");const l=e.edition===_.Bedrock?Uc(e,i+4,o+4,Ps).rng:me(e,i,o);l.nextInt(4);const u=l.nextFloat()<=c.largeProbability;let d=0;if(u&&(l.nextInt(),l.nextFloat()<=c.clusterProbability)){for(let f=0;f<16;f++)l.nextInt();d=4+l.nextInt(5)}return l.free(),{type:c.type,isLarge:u,clusterSize:d}})}},Js=[wt,ti,Ie,Xt,Qt,pe,Kt];function cu(e,t){if(e.bedrockVersion>=S.V1_18){const[r,,i]=t.noise().findSpawnPosition();return[r,i]}let n=40;for(;n<2e4;){const r=t.legacy().getBiomeArea(n,0,n+40,40);for(let i=1;i<9;i++)for(let o=1;o<9;o++)if([[n+o*4+0,i*4+0],[n+o*4-4,i*4+0],[n+o*4+4,i*4+0],[n+o*4+0,i*4-4],[n+o*4+0,i*4+4]].every(c=>Js.includes(r(c[0],c[1]))))return[n+4*o,4*i];n+=40}return[0,0]}function lu(e,t){if(e.javaVersion>=p.V1_18){const[n,,r]=t.noise().findSpawnPosition();return[n,r]}else{const n=new be(e.seed),[r,,i]=t.legacy().findBiomePosition(0,0,256,Js,n)||[0,0,0];return n.free(),[r,i]}}const uu={supportsWorld:e=>W(m.Spawn,e),finiteGenerationArea(e){return e.edition===_.Bedrock&&e.bedrockVersion<S.V1_18?{x:0,z:0,sizeX:1253,sizeZ:3}:{x:-512,z:-512,sizeX:1024,sizeZ:1024}},async create(e,{overworld:t}){const n=e.edition===_.Java?lu(e,t):cu(e,t),r={x:n[0]>>4,z:n[1]>>4};return async i=>Ye(i,r)?[[r.x,r.z,{x:n[0],z:n[1]}]]:[]}};function Xs(e,t,n,r){const i=t.add(n);return xn(i,k.fromNumber(1e4*r)),e.javaVersion>=p.V1_18?jt.fromSeed(i):new be(i)}function fu(e){const t=e;return t.decorator?t.decorator:t.placement.reverse()}function et(e,t,n,r){const{decorationStepOrdinal:i,featureIndex:o,feature:s}=r,a=fu(r),c=[t*16,0,n*16],l=vs(e,c[0],c[2]),u=Xs(e,l,o,i),d=[],f={random:u};return a.reduce((h,w)=>(b,x,C)=>{w(b,x,I=>h(I,x,C))},h=>d.push(s(h,f)))(c,f,h=>{const w=s(h,f);d.push(w)}),u.free(),d}const tt=e=>(t,n,r)=>{n.random.nextFloat()<1/e.chance&&r(t)},sn=()=>e=>[e],go=e=>t=>{const{minInclusive:n,maxInclusive:r}=e;return n>r?r:t.nextInt(r-n+1)+n},du=e=>t=>{const{minInclusive:n,maxInclusive:r,plateau:i=0}=e;if(n>r)return console.warn("3276386391"),r;const o=r-n;if(i>=o)return hr(t,n,r);const s=Math.floor((o-i)/2),a=o-s;return n+hr(t,0,a)+hr(t,0,s)};function hr(e,t,n){return e.nextInt(n-t+1)+t}const gu=e=>(t,n,r)=>{const i=e(n.random);r([t[0],i,t[2]])},pr=e=>t=>gu(e(t)),An={uniform:pr(go),triangle:pr(du),range_8_8_nether:pr(()=>go({minInclusive:8,maxInclusive:119}))},Ut=({provider:e,allowedBiomes:t,disallowedBiomes:n})=>(r,i,o)=>{const s=je(e.getNoiseBiome(r[0]>>2,r[1]>>2,r[2]>>2));t&&!t.includes(s)||n&&n.includes(s)||o(r)},_t=()=>(e,t,n)=>{const{random:r}=t,i=e[0]+r.nextInt(16),o=e[2]+r.nextInt(16);n([i,e[1],o])},mo=e=>(t,n)=>{const{random:r}=n;r.nextInt(4),r.nextInt(4);const i=Math.min(t[1],e.getSurfaceBlock(t[0],t[2],"oceanFloor","topmostAccurate")),o=Math.max(i-15-r.nextInt(10),pl+10);return[[t[0],o,t[2]]]};class Rn{gen;constructor(t,n){const r=we(t);this.gen=new vr(r,n)}getSeedForChunk(t,n){return this.gen.a(t,n)}free(){this.gen.free()}}class mu{finder;constructor(t){this.finder=new Or(we(t))}find(t,n){return this.finder.a(t.x,t.z,t.sizeX,t.sizeZ,n.provider)}free(){this.finder.free()}}const hu={supportsWorld:e=>W(m.Fossil,e),create:async function(e,t){return e.edition===_.Java?e.javaVersion>=p.V1_18?pu(e,t.overworld.noise()):yu(e,t.overworld.legacy()):wu(e,t.overworld)}},ho=[Y,dt,Yn];function pu(e,t){return async n=>{const r=[];return ue(n,(i,o)=>{const s=et(e,i,o,{decorationStepOrdinal:3,featureIndex:0,placement:[tt({chance:64}),_t(),An.uniform({minInclusive:0,maxInclusive:319}),Ut({provider:t,allowedBiomes:ho})],feature:mo(t)}),a=et(e,i,o,{decorationStepOrdinal:3,featureIndex:1,placement:[tt({chance:64}),_t(),An.uniform({minInclusive:-64,maxInclusive:-8}),Ut({provider:t,allowedBiomes:ho})],feature:mo(t)}),c=[];s.length>0&&c.push([...s[0][0],"coal"]),a.length>0&&c.push([...a[0][0],"diamond"]),c.length>0&&r.push([i,o,c])}),r}}const _u={[Y.id]:0,[dt.id]:0,[gs.id]:1};function yu(e,t){return async n=>{const r=[],i=t.getNoiseBiomeArea(n.x*4+2,n.z*4+2,(n.x+n.sizeX)*4-2,(n.z+n.sizeZ)*4-2);return ue(n,(o,s)=>{const a=i(o*4+2,s*4+2).id,c=_u[a];if(c==null)return;et(e,o,s,{decorationStepOrdinal:3,featureIndex:c+2,decorator:[tt({chance:64})],feature:sn()}).length>0&&r.push([o,s,void 0])}),r}}function po(e,t,n){return n==="default"?t===Y.id||t===dt.id:n==="deep"&&e>=S.V1_18&&(t===Y.id||t===dt.id||t===Yn.id&&e>=S.V1_21_60)}function wu(e,t){const n=e.bedrockVersion>=S.V1_18,r=new Rn(e,"minecraft:desert_or_swamp_after_surface_fossil_feature"),i=n?new Rn(e,"minecraft:desert_or_swamp_after_surface_fossil_deepslate_feature"):null,o=async s=>{const a=[],c=n?null:t.legacy().getBiomeArea(s.x*16,s.z*16,(s.x+s.sizeX)*16,(s.z+s.sizeZ)*16);return ue(s,(l,u)=>{const d=c?c(l*16+15,u*16+15):rr(t.noise(),l*16,0,u*16),f=po(e.bedrockVersion,d.id,"default"),g=po(e.bedrockVersion,d.id,"deep");if(!f&&!g)return;const h=[];if(f){const w=r.getSeedForChunk(l,u),b=new re(w);b.nextInt(64)<1&&h.push([null,null,null,"coal"]),b.free()}if(g&&i){const w=i.getSeedForChunk(l,u),b=new re(w);b.nextInt(64)<1&&h.push([null,null,null,"diamond"]),b.free()}h.length>0&&a.push([l,u,h])}),a};return o.free=()=>{r.free(),i?.free()},o}const bu={supportsWorld:e=>W(m.FossilNether,e),create:async function(e,t){return vu(e,t.nether.noise())}};function vu(e,t){const n=new mu(e),r=async i=>{const o=n.find(i,t).map(s=>[s.x,s.y,s.z,{variant:s.variant,hasDriedGhast:s.hasDriedGhast}]);return Ue(o,s=>[s[0]>>4,s[2]>>4])};return r.free=()=>{n.free()},r}const ir=(e,t,n)=>e.nextInt(n-t+1)+t,Dr=(e,t,n)=>ir(e,t,n-1),Su=(e,t,n,r)=>{const i=n-t,o=(i-r)/2,s=i-o;return t+e.nextFloat()*s+e.nextFloat()*o},xu={supportsWorld:e=>W(m.Ravine,e),create:async(e,{overworld:t})=>e.edition===_.Java?e.javaVersion>=p.V1_18?Cu(e):Bu(e,t.legacy()):Eu(e,t)};function Cu(e){return async t=>{const n=[];return ue(t,(r,i)=>{const o=[],s=me(e,r,i,2);if(s.nextFloat()<.01){const a=Tu(s,r,i);o.push(a)}s.free(),o.length>0&&n.push([r,i,o])}),n}}function Tu(e,t,n){const r=t*16+e.nextInt(16),i=ir(e,10,67),o=n*16+e.nextInt(16);e.nextFloat(),e.nextFloat();const s=Su(e,0,6,2);return{x:r,y:i,z:o,thickness:s,isUnderwater:!1,isMegaRavine:!1}}function Bu(e,t){return async n=>{const r=[],i=t.getNoiseBiomeArea((n.x-8)*4,(n.z-8)*4,(n.x+n.sizeX+8)*4,(n.z+n.sizeZ+8)*4);return ue(n,(o,s)=>{const a=[],c=me(e,o,s,1);if(c.nextFloat()<.02){const u=_o(c,o,s,!1);a.push(u)}c.free();const l=me(e,o,s,0);l.nextFloat()<.02&&i(o*4,s*4).category==="ocean"&&a.push(_o(l,o,s,!0)),l.free(),a.length>0&&r.push([o,s,a])}),r}}function _o(e,t,n,r){const i=t*16+e.nextInt(16),o=e.nextInt(e.nextInt(40)+8)+20,s=n*16+e.nextInt(16);e.nextFloat(),e.nextFloat();const a=(e.nextFloat()*2+e.nextFloat())*2;return{x:i,y:o,z:s,thickness:a,isUnderwater:r,isMegaRavine:!1}}function Eu(e,t){const n=nr(e);return async r=>{const i=[];return ue(r,(o,s)=>{const a=new re(n(o,s));try{if(a.nextInt(e.bedrockVersion>=S.V1_21_60?100:150)!==0)return;const c=a.nextInt(16)+o*16;let l;if(e.bedrockVersion>=S.V1_21_60)l=ir(a,10,67),a.nextInt();else{const w=a.nextInt(40);l=a.nextInt(w+8)+20}a.nextInt();const u=a.nextInt(16)+s*16;a.nextFloat(),a.nextFloat();let d=3*a.nextFloat()+3*a.nextFloat();const f=a.nextFloat()<.05;f&&(d=2*d);const h=(e.bedrockVersion<S.V1_18?t.legacy().getBiomeGenAt(c,u,1,1)[0]:pt(t.noise(),o,s,"oceanFloor")).category==="ocean";(!h||e.bedrockVersion<S.V1_18||e.bedrockVersion>=S.V1_21_60)&&i.push([o,s,[{x:c,y:l,z:u,thickness:d,isMegaRavine:f,isUnderwater:h}]])}finally{a.free()}}),i}}function Iu(e,t){const n=new Map,r=new Map;let i,o,s;const a=(f,g)=>{if(s!=null&&i===f&&o===g)return s;let h=r.get(f);h==null&&(h=new Map,r.set(f,h));let w=h.get(g);return w==null&&(w=e.buildHeightmap(f,g),h.set(g,w)),i=f,o=g,s=w,w},c=(f,g,h)=>{let w=n.get(f);w==null&&(w=new Map,n.set(f,w));let b=w.get(h);b==null&&(b=new Set,w.set(h,b)),b.add(g)},l=(f,g,h)=>{const w=f>>4,b=g>>4,x=a(w,b),C=(f&15)*16+(g&15);return x[C]};return{setBlock:c,hasBlock:(f,g,h)=>{const w=l(f,h);return g<=w?!0:n.get(f)?.get(h)?.has(g)??!1},getHeight:l,resetBlocks:()=>{n.clear()}}}function Vu(e,t,n){const[r,i,o]=n;e.setBlock(r,i,o),$s(e,r,i,o,r,o,t,0)}const ne={NORTH:0,EAST:1,SOUTH:2,WEST:3},ku={[ne.NORTH]:ne.SOUTH,[ne.SOUTH]:ne.NORTH,[ne.EAST]:ne.WEST,[ne.WEST]:ne.EAST};function yo(e,t,n,r,i){return(i===ne.EAST||!e.hasBlock(t+1,n,r))&&(i===ne.WEST||!e.hasBlock(t-1,n,r))&&(i===ne.SOUTH||!e.hasBlock(t,n,r+1))&&(i===ne.NORTH||!e.hasBlock(t,n,r-1))}function $s(e,t,n,r,i,o,s,a){let l=s.nextInt(4)+1;a===0&&(l+=1);for(let d=0;d<l;d++){const f=n+d+1;if(!yo(e,t,f,r))return;e.setBlock(t,f,r),e.setBlock(t,f-1,r)}let u=!1;if(a<4){let d=s.nextInt(4);a===0&&(d+=1);const f=n+l;for(let g=0;g<d;g++){const h=s.nextInt(4);let w=t,b=r;h===ne.NORTH?b-=1:h===ne.EAST?w+=1:h===ne.SOUTH?b+=1:w-=1,!(w<=i-8||w>=i+8||b<=o-8||b>=o+8||e.hasBlock(w,f,b)||e.hasBlock(w,f-1,b)||!yo(e,w,f,b,ku[h]))&&(u=!0,e.setBlock(w,f,b),h===ne.NORTH?e.setBlock(w,f,b+1):h===ne.EAST?e.setBlock(w-1,f,b):h===ne.SOUTH?e.setBlock(w,f,b-1):e.setBlock(w+1,f,b),$s(e,w,f,b,i,o,s,a+1))}}u||e.setBlock(t,n+1,r)}const Ou=()=>(e,t,n)=>{const{random:r}=t;if(r.nextInt(700)!==0)return;const i=0,o=e[0]+r.nextInt(16),s=e[2]+r.nextInt(16);n([o,i,s])},Mu={supportsWorld:e=>W(m.EndGateway,e),create:async function(e,t){return e.edition===_.Java?e.javaVersion>=p.V1_18?Au(e,t.end):Ru(e,t.end):Fu(e,t.end)}};function Au(e,t){return async n=>{const r=[];return ue(n,(i,o)=>{const s=et(e,i,o,{decorationStepOrdinal:4,featureIndex:0,placement:[tt({chance:700}),_t(),Ut({provider:t,allowedBiomes:[qt]})],feature:sn()});s.length<1||r.push([i,o,[{x:s[0][0][0],z:s[0][0][2]}]])}),r}}function Ru(e,t){return async n=>{const r=[];return ue(n,(i,o)=>{const s=et(e,i,o,{decorationStepOrdinal:4,featureIndex:13,decorator:e.javaVersion>=p.V1_17?[_t(),tt({chance:700})]:[Ou()],feature:sn()});s.length<1||t.getNoiseBiome(i*4+2,0,o*4+2)!==qt.id||r.push([i,o,[{x:s[0][0][0],z:s[0][0][2]}]])}),r}}function Fu(e,t){const n=new Ls(e),r=new re(e.seed),i=e.bedrockVersion>=S.V1_18,o=qt.id,s=async a=>{const c=nr(e),l=Iu(n),u=new Map,d=a.x+a.sizeX,f=a.z+a.sizeZ,g=Ft(a,{x0:-1,z0:-1}),h=g.sizeX,w=t.getBiomeArea(g.x*4,g.z*4,h,g.sizeZ,4);let b=0;for(let C=g.z;C<g.z+g.sizeZ;C++)for(let I=g.x;I<g.x+g.sizeX;I++){if(w[b]!==o){b+=1;continue}b+=1,l.resetBlocks();const V=c(I,C);r.setSeed(V),i&&r.nextInt();const O=r.nextInt(5),E=I*16+8,A=C*16+8;for(let U=0;U<O;U++){const J=E+r.nextInt(16),$=A+r.nextInt(16),G=l.getHeight(J,$)+1;G<=0||Vu(l,r,[J,G,$])}if(r.nextInt(700)!==0)continue;const z=E+r.nextInt(16),F=A+r.nextInt(16);if(l.getHeight(z,F,!0)<=0)continue;const L=z>>4,R=F>>4;if(L<a.x||L>=d||R<a.z||R>=f)continue;let M=u.get(L);M==null&&(M=new Map,u.set(L,M));let P=M.get(R);P==null&&(P=[],M.set(R,P)),P.push({x:z,z:F})}const x=[];for(const[C,I]of u)for(const[V,O]of I)x.push([C,V,O]);return x};return s.free=()=>{r.free(),n.free()},s}const zu=e=>t=>{const{x:n=0,y:r=0,z:i=0}=e;return[[t[0]+n,t[1]+r,t[2]+i]]},Lu={supportsWorld:e=>W(m.AmethystGeode,e),create:async(e,t)=>e.edition===_.Java?Nu(e,t.overworld):Hu(e)},Pu=e=>[Le.id,Ne.id].includes(e)?2:0;function Nu(e,t){return async n=>{const r=Ft(n,{x0:-1,z0:-1}),i=[],o=e.javaVersion<p.V1_18?t.legacy().getNoiseBiomeArea(r.x*4+2,r.z*4+2,(r.x+r.sizeX)*4-2,(r.z+r.sizeZ)*4-2):null;return ue(r,(s,a)=>{const c=o?.(s*4+2,a*4+2).id,l=et(e,s,a,{decorationStepOrdinal:2,featureIndex:c==null||e.javaVersion>=p.V1_18?2:Pu(c),decorator:[An.uniform({minInclusive:e.javaVersion>=p.V1_18?-58:6,maxInclusive:e.javaVersion>=p.V1_18?30:46}),_t(),tt({chance:e.javaVersion>=p.V1_18?24:53})],feature:zu({x:4,y:4,z:4})});l.length>0&&i.push(l[0][0])}),Os(i,n,s=>[s[0]>>4,s[2]>>4])}}function Hu(e){const t=new Rn(e,"minecraft:overworld_amethyst_geode_feature"),n=e.bedrockVersion>=S.V1_18?24:53,r=e.bedrockVersion>=S.V1_18?[-58,30]:[6,47],i=async o=>{const s=[];return ue(o,(a,c)=>{const l=t.getSeedForChunk(a,c),u=new re(l);if(u.nextInt(n)<1){const d=Dr(u,r[0],r[1]);s.push([a*16+4,d+4,c*16+4])}u.free()}),Os(s,o,a=>[a[0]>>4,a[2]>>4])};return i.free=()=>{t.free()},i}const Du=[["city_center_1",1,[18,31,41]],["city_center_2",1,[18,31,41]],["city_center_3",1,[18,31,41]]],Wu={supportsWorld:e=>W(m.AncientCity,e),create:async(e,t)=>{const n=t.overworld.noise();return q(e,{spacing:24,separation:8,salt:20083232,linearSeparation:e.edition!==_.Bedrock},async(r,i)=>e.edition===_.Java?!!zt({world:e,biomeProvider:t.overworld.noise(),chunkX:r,chunkZ:i,initialY:-27,projectionY:null,allowedBiomes:[ht],structures:Du,namedStartPos:[13,20]}):n.getNoiseBiomeBlock(r*16,-27,i*16)===ht.id)}},Gu="minecraft:chest",ju=[{bonus_rolls:0,entries:[{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:3,min:1},function:"minecraft:set_count"}],name:"minecraft:diamond",weight:5},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:5,min:1},function:"minecraft:set_count"}],name:"minecraft:iron_ingot",weight:15},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:7,min:2},function:"minecraft:set_count"}],name:"minecraft:gold_ingot",weight:15},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:3,min:1},function:"minecraft:set_count"}],name:"minecraft:emerald",weight:15},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:6,min:4},function:"minecraft:set_count"}],name:"minecraft:bone",weight:25},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:3,min:1},function:"minecraft:set_count"}],name:"minecraft:spider_eye",weight:25},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:7,min:3},function:"minecraft:set_count"}],name:"minecraft:rotten_flesh",weight:25},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:5,min:1},function:"minecraft:set_count"}],name:"minecraft:leather",weight:20},{type:"minecraft:item",name:"minecraft:copper_horse_armor",weight:15},{type:"minecraft:item",name:"minecraft:iron_horse_armor",weight:15},{type:"minecraft:item",name:"minecraft:golden_horse_armor",weight:10},{type:"minecraft:item",name:"minecraft:diamond_horse_armor",weight:5},{type:"minecraft:item",functions:[{function:"minecraft:enchant_randomly",options:"#minecraft:on_random_loot"}],name:"minecraft:book",weight:20},{type:"minecraft:item",name:"minecraft:golden_apple",weight:20},{type:"minecraft:item",name:"minecraft:enchanted_golden_apple",weight:2},{type:"minecraft:empty",weight:15}],rolls:{type:"minecraft:uniform",max:4,min:2}},{bonus_rolls:0,entries:[{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:8,min:1},function:"minecraft:set_count"}],name:"minecraft:bone",weight:10},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:8,min:1},function:"minecraft:set_count"}],name:"minecraft:gunpowder",weight:10},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:8,min:1},function:"minecraft:set_count"}],name:"minecraft:rotten_flesh",weight:10},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:8,min:1},function:"minecraft:set_count"}],name:"minecraft:string",weight:10},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:8,min:1},function:"minecraft:set_count"}],name:"minecraft:sand",weight:10}],rolls:4},{bonus_rolls:0,entries:[{type:"minecraft:empty",weight:6},{type:"minecraft:item",functions:[{add:!1,count:2,function:"minecraft:set_count"}],name:"minecraft:dune_armor_trim_smithing_template"}],rolls:1}],Uu="minecraft:chests/desert_pyramid";var Zu={type:Gu,pools:ju,random_sequence:Uu};const Ju="minecraft:chest",Xu=[{bonus_rolls:0,entries:[{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:3,min:1},function:"minecraft:set_count"}],name:"minecraft:diamond",weight:5},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:5,min:1},function:"minecraft:set_count"}],name:"minecraft:iron_ingot",weight:15},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:7,min:2},function:"minecraft:set_count"}],name:"minecraft:gold_ingot",weight:15},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:3,min:1},function:"minecraft:set_count"}],name:"minecraft:emerald",weight:15},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:6,min:4},function:"minecraft:set_count"}],name:"minecraft:bone",weight:25},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:3,min:1},function:"minecraft:set_count"}],name:"minecraft:spider_eye",weight:25},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:7,min:3},function:"minecraft:set_count"}],name:"minecraft:rotten_flesh",weight:25},{type:"minecraft:item",name:"minecraft:saddle",weight:20},{type:"minecraft:item",name:"minecraft:iron_horse_armor",weight:15},{type:"minecraft:item",name:"minecraft:golden_horse_armor",weight:10},{type:"minecraft:item",name:"minecraft:diamond_horse_armor",weight:5},{type:"minecraft:item",functions:[{function:"minecraft:enchant_randomly"}],name:"minecraft:book",weight:20},{type:"minecraft:item",name:"minecraft:golden_apple",weight:20},{type:"minecraft:item",name:"minecraft:enchanted_golden_apple",weight:2},{type:"minecraft:empty",weight:15}],rolls:{type:"minecraft:uniform",max:4,min:2}},{bonus_rolls:0,entries:[{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:8,min:1},function:"minecraft:set_count"}],name:"minecraft:bone",weight:10},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:8,min:1},function:"minecraft:set_count"}],name:"minecraft:gunpowder",weight:10},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:8,min:1},function:"minecraft:set_count"}],name:"minecraft:rotten_flesh",weight:10},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:8,min:1},function:"minecraft:set_count"}],name:"minecraft:string",weight:10},{type:"minecraft:item",functions:[{add:!1,count:{type:"minecraft:uniform",max:8,min:1},function:"minecraft:set_count"}],name:"minecraft:sand",weight:10}],rolls:4},{bonus_rolls:0,entries:[{type:"minecraft:empty",weight:6},{type:"minecraft:item",functions:[{add:!1,count:2,function:"minecraft:set_count"}],name:"minecraft:dune_armor_trim_smithing_template"}],rolls:1}];var $u={type:Ju,pools:Xu};const Qu=[{rolls:{min:2,max:4},entries:[{type:"item",name:"minecraft:diamond",functions:[{function:"set_count",count:{min:1,max:3}}],weight:5},{type:"item",name:"minecraft:iron_ingot",functions:[{function:"set_count",count:{min:1,max:5}}],weight:15},{type:"item",name:"minecraft:gold_ingot",functions:[{function:"set_count",count:{min:2,max:7}}],weight:15},{type:"item",name:"minecraft:emerald",functions:[{function:"set_count",count:{min:1,max:3}}],weight:15},{type:"item",name:"minecraft:bone",functions:[{function:"set_count",count:{min:4,max:6}}],weight:25},{type:"item",name:"minecraft:spider_eye",functions:[{function:"set_count",count:{min:1,max:3}}],weight:25},{type:"item",name:"minecraft:rotten_flesh",functions:[{function:"set_count",count:{min:3,max:7}}],weight:25},{type:"item",name:"minecraft:leather",functions:[{function:"set_count",count:{min:1,max:5},add:!1}],weight:20},{type:"item",name:"minecraft:horsearmoriron",weight:15},{type:"item",name:"minecraft:horsearmorgold",weight:10},{type:"item",name:"minecraft:horsearmordiamond",weight:5},{type:"item",name:"minecraft:book",weight:20,functions:[{function:"enchant_randomly"}]},{type:"item",name:"minecraft:golden_apple",weight:20},{type:"item",name:"minecraft:appleEnchanted",weight:2},{type:"empty",weight:15}]},{rolls:4,entries:[{type:"item",name:"minecraft:bone",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]},{type:"item",name:"minecraft:gunpowder",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]},{type:"item",name:"minecraft:rotten_flesh",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]},{type:"item",name:"minecraft:string",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]},{type:"item",name:"minecraft:sand",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]}]},{rolls:1,entries:[{type:"empty",weight:6},{type:"item",name:"minecraft:dune_armor_trim_smithing_template",weight:1,functions:[{function:"set_count",count:2}]}]}];var Ku={pools:Qu};const qu=[{rolls:{min:2,max:4},entries:[{type:"item",name:"minecraft:diamond",functions:[{function:"set_count",count:{min:1,max:3}}],weight:5},{type:"item",name:"minecraft:iron_ingot",functions:[{function:"set_count",count:{min:1,max:5}}],weight:15},{type:"item",name:"minecraft:gold_ingot",functions:[{function:"set_count",count:{min:2,max:7}}],weight:15},{type:"item",name:"minecraft:emerald",functions:[{function:"set_count",count:{min:1,max:3}}],weight:15},{type:"item",name:"minecraft:bone",functions:[{function:"set_count",count:{min:4,max:6}}],weight:25},{type:"item",name:"minecraft:spider_eye",functions:[{function:"set_count",count:{min:1,max:3}}],weight:25},{type:"item",name:"minecraft:rotten_flesh",functions:[{function:"set_count",count:{min:3,max:7}}],weight:25},{type:"item",name:"minecraft:saddle",weight:20},{type:"item",name:"minecraft:horsearmoriron",weight:15},{type:"item",name:"minecraft:horsearmorgold",weight:10},{type:"item",name:"minecraft:horsearmordiamond",weight:5},{type:"item",name:"minecraft:book",weight:20,functions:[{function:"enchant_randomly"}]},{type:"item",name:"minecraft:golden_apple",weight:20},{type:"item",name:"minecraft:appleEnchanted",weight:2},{type:"empty",weight:15}]},{rolls:4,entries:[{type:"item",name:"minecraft:bone",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]},{type:"item",name:"minecraft:gunpowder",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]},{type:"item",name:"minecraft:rotten_flesh",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]},{type:"item",name:"minecraft:string",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]},{type:"item",name:"minecraft:sand",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]}]}];var Yu={pools:qu};const ef=[{rolls:{min:2,max:4},entries:[{type:"item",name:"minecraft:diamond",functions:[{function:"set_count",count:{min:1,max:3}}],weight:5},{type:"item",name:"minecraft:iron_ingot",functions:[{function:"set_count",count:{min:1,max:5}}],weight:15},{type:"item",name:"minecraft:gold_ingot",functions:[{function:"set_count",count:{min:2,max:7}}],weight:15},{type:"item",name:"minecraft:emerald",functions:[{function:"set_count",count:{min:1,max:3}}],weight:15},{type:"item",name:"minecraft:bone",functions:[{function:"set_count",count:{min:4,max:6}}],weight:25},{type:"item",name:"minecraft:spider_eye",functions:[{function:"set_count",count:{min:1,max:3}}],weight:25},{type:"item",name:"minecraft:rotten_flesh",functions:[{function:"set_count",count:{min:3,max:7}}],weight:25},{type:"item",name:"minecraft:leather",functions:[{function:"set_count",count:{min:1,max:5},add:!1}],weight:20},{type:"item",name:"minecraft:horsearmoriron",weight:15},{type:"item",name:"minecraft:copper_horse_armor",weight:15},{type:"item",name:"minecraft:horsearmorgold",weight:10},{type:"item",name:"minecraft:horsearmordiamond",weight:5},{type:"item",name:"minecraft:book",weight:20,functions:[{function:"enchant_randomly"}]},{type:"item",name:"minecraft:golden_apple",weight:20},{type:"item",name:"minecraft:appleEnchanted",weight:2},{type:"empty",weight:15}]},{rolls:4,entries:[{type:"item",name:"minecraft:bone",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]},{type:"item",name:"minecraft:gunpowder",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]},{type:"item",name:"minecraft:rotten_flesh",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]},{type:"item",name:"minecraft:string",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]},{type:"item",name:"minecraft:sand",weight:10,functions:[{function:"set_count",count:{min:1,max:8}}]}]},{rolls:1,entries:[{type:"empty",weight:6},{type:"item",name:"minecraft:dune_armor_trim_smithing_template",weight:1,functions:[{function:"set_count",count:2}]}]}];var tf={pools:ef};const Wr=(e,t)=>{if(Array.isArray(e))for(let n=0;n<e.length;n++)typeof e[n]=="string"?e[n]=t(e[n]):Wr(e[n],t);if(typeof e=="object"&&e!==null){const n=e;for(const[r,i]of Object.entries(e))typeof i=="string"?n[r]=t(i):Wr(n[r],t)}},nf=(e,t)=>{if(e.edition===_.Java&&e.javaVersion>=p.V1_21_9)return Zu;if(e.edition===_.Java&&e.javaVersion>=p.V1_18)return $u;if(e.edition===_.Bedrock&&e.bedrockVersion>=S.V1_21_110)return tf;if(e.edition===_.Bedrock&&e.bedrockVersion>=S.V1_21_90)return Ku;if(e.edition===_.Bedrock&&e.bedrockVersion>=S.V1_18)return Yu;throw new Error(`Loot table ${t} not found`)},rf=(e,t)=>{const n=nf(e,t);return Wr(n,r=>r.startsWith("minecraft:")?r.slice(10):r),n},of=[{name:"protection",category:"ARMOR",minLevel:1,maxLevel:4},{name:"fire_protection",category:"ARMOR",minLevel:1,maxLevel:4},{name:"feather_falling",category:"ARMOR_FEET",minLevel:1,maxLevel:4},{name:"blast_protection",category:"ARMOR",minLevel:1,maxLevel:4},{name:"projectile_protection",category:"ARMOR",minLevel:1,maxLevel:4},{name:"respiration",category:"ARMOR_HEAD",minLevel:1,maxLevel:3},{name:"aqua_affinity",category:"ARMOR_HEAD",minLevel:1,maxLevel:1},{name:"thorns",category:"ARMOR_CHEST",minLevel:1,maxLevel:3},{name:"depth_strider",category:"ARMOR_FEET",minLevel:1,maxLevel:3},{name:"frost_walker",category:"ARMOR_FEET",minLevel:1,maxLevel:2},{name:"binding_curse",category:"WEARABLE",minLevel:1,maxLevel:1},{name:"sharpness",category:"WEAPON",minLevel:1,maxLevel:5},{name:"smite",category:"WEAPON",minLevel:1,maxLevel:5},{name:"bane_of_arthropods",category:"WEAPON",minLevel:1,maxLevel:5},{name:"knockback",category:"WEAPON",minLevel:1,maxLevel:2},{name:"fire_aspect",category:"WEAPON",minLevel:1,maxLevel:2},{name:"looting",category:"WEAPON",minLevel:1,maxLevel:3},{name:"sweeping",category:"WEAPON",minLevel:1,maxLevel:3},{name:"efficiency",category:"DIGGER",minLevel:1,maxLevel:5},{name:"silk_touch",category:"DIGGER",minLevel:1,maxLevel:1},{name:"unbreaking",category:"BREAKABLE",minLevel:1,maxLevel:3},{name:"fortune",category:"DIGGER",minLevel:1,maxLevel:3},{name:"power",category:"BOW",minLevel:1,maxLevel:5},{name:"punch",category:"BOW",minLevel:1,maxLevel:2},{name:"flame",category:"BOW",minLevel:1,maxLevel:1},{name:"infinity",category:"BOW",minLevel:1,maxLevel:1},{name:"luck_of_the_sea",category:"FISHING_ROD",minLevel:1,maxLevel:3},{name:"lure",category:"FISHING_ROD",minLevel:1,maxLevel:3},{name:"loyalty",category:"TRIDENT",minLevel:1,maxLevel:3},{name:"impaling",category:"TRIDENT",minLevel:1,maxLevel:5},{name:"riptide",category:"TRIDENT",minLevel:1,maxLevel:3},{name:"channeling",category:"TRIDENT",minLevel:1,maxLevel:1},{name:"multishot",category:"CROSSBOW",minLevel:1,maxLevel:1},{name:"quick_charge",category:"CROSSBOW",minLevel:1,maxLevel:3},{name:"piercing",category:"CROSSBOW",minLevel:1,maxLevel:4},{name:"mending",category:"BREAKABLE",minLevel:1,maxLevel:1},{name:"vanishing_curse",category:"VANISHABLE",minLevel:1,maxLevel:1}],sf={golden_sword:[11,12,13,14,15,16,17,20,35,36],golden_axe:[11,12,13,18,19,20,21,35,36],golden_hoe:[18,19,20,21,35,36],golden_shovel:[18,19,20,21,35,36],golden_pickaxe:[18,19,20,21,35,36],golden_boots:[0,1,2,3,4,7,8,9,10,20,35,36],golden_chestplate:[0,1,3,4,7,10,20,35,36],golden_helmet:[0,1,3,4,5,6,7,10,20,35,36],golden_leggings:[0,1,3,4,7,10,20,35,36]},af=e=>of,cf=(e,t)=>{const n=af();if(t==="book")return n;const r=sf[t];if(!r)throw new Error("Enchantments for "+t+" unknown");return r.map(i=>n[i])};function lf({world:e,lootTableKey:t,randomSeed:n}){const r=rf(e,t),i=e.edition===_.Java?new be(n):new re(n),o=[];try{for(const s of r.pools){const a=s.entries.reduce((l,u)=>l+(u.weight??1),0);if(a<=0||s.entries.length<1)continue;let c=null;e.edition===_.Bedrock&&i.nextFloat(),typeof s.rolls=="number"?(e.edition===_.Bedrock&&i.nextInt(),c=s.rolls):c=Gr(s.rolls.min,s.rolls.max,i);for(let l=0;l<c;l++)if(e.edition===_.Java&&s.entries.length===1)s.entries[0].type==="item"&&o.push(wo(s.entries[0],i,e));else{let u=i.nextInt(a);for(const d of s.entries)if(u-=d.weight??1,u<0){d.type==="item"&&o.push(wo(d,i,e));break}}}}finally{i.free()}return o}function wo(e,t,n){return(e.functions||[]).reduce((r,i)=>uf(r,i,t,n),{name:e.name,count:1})}function uf(e,t,n,r){if(t.function==="set_data")return e;if(t.function==="set_count")return r.edition===_.Bedrock&&t.count.min===t.count.max&&n.nextInt(1),{...e,count:Gr(t.count.min,t.count.max,n)};if(t.function==="enchant_randomly"){if(r.edition===_.Bedrock)return n.nextInt(),{...e,enchantment:"unknown"};const i=cf(r,e.name),{name:o,minLevel:s,maxLevel:a}=i[n.nextInt(i.length)],c=Gr(s,a,n);return{name:e.name==="book"?"enchanted_book":e.name,count:1,enchantment:{name:o,level:c}}}throw new Error(`Function ${t.function} not implemented`)}function Gr(e,t,n){const r=Math.floor(e),i=Math.floor(t);return r>=i?r:n.nextInt(i-r+1)+r}const ff=e=>e.reduce((t,n)=>t.concat(n),[]),df={enchanted_golden_apple:["enchanted_golden_apple","appleEnchanted"]},gf={supportsWorld:e=>W(m.ItemOverworld,e),create:async(e,t,n)=>{const r=await Hs.create(e,t,n),i=mf(e);return async o=>{const s=await r(o),a=[];for(const c of s){const l=i(c);ff(l.map(f=>lf({world:e,lootTableKey:"desert_pyramid",randomSeed:f}))).find(f=>df.enchanted_golden_apple.includes(f.name))&&a.push([...c,[{item:"enchanted_golden_apple"}]])}return a}}},mf=e=>{if(e.edition===_.Bedrock){const t=nr(e);return n=>{const r=new re(t(n[0],n[1]));r.nextInt();const i=[k.fromInt(r.nextInt()),k.fromInt(r.nextInt()),k.fromInt(r.nextInt()),k.fromInt(r.nextInt())];return r.free(),i}}else return t=>{const n=vs(e,t[0]*16,t[1]*16),r=Xs(e,n,e.javaVersion>=p.V1_19_3?1:3,4);r.nextInt(3);const i=[r.nextLong(),r.nextLong(),r.nextLong(),r.nextLong()];return r.free(),i}},hf={supportsWorld:e=>W(m.OreVein,e),async create(e,t){const n=new xc(e),r=t.overworld.noise(),i=async o=>{const s=n.find(o,r);return Ue(s,a=>[a.reference[0]>>4,a.reference[2]>>4])};return i.free=()=>n.free(),i}};class pf{rustFinder;constructor(t){this.rustFinder=new Tr(we(t))}find(t,n){return this.rustFinder.a(t.provider,n.x,n.z,n.sizeX,n.sizeZ)}free(){this.rustFinder.free()}}const _f={supportsWorld:e=>W(m.Cave,e),async create(e,t){const n=new pf(e),r=t.overworld.noise(),i=async o=>{const s=n.find(r,o);return Ue(s,a=>[a.reference.pos[0]>>4,a.reference.pos[2]>>4])};return i.free=()=>n.free(),i}},yf=({provider:e,heightType:t})=>(n,r,i)=>{i([n[0],e.getSurfaceBlock(n[0],n[2],t,"topmostAccurate"),n[2]])},wf={supportsWorld:e=>W(m.DesertWell,e),create:async function(e,t){return e.edition===_.Java?bf(e,t.overworld.noise()):vf(e,t.overworld)}};function Qs(e,t){const n=t[0];let r=t[1]+1;const i=t[2];let o=null;for(;(o=e.getNoiseBlock(n,r,i,!1))===Gt.Air;)r-=1;if(!Bc(o))return null;for(let s=-2;s<=2;s++)for(let a=-2;a<=2;a++)if(e.getNoiseBlock(n+s,r-1,i+a,!1)===Gt.Air&&e.getNoiseBlock(n+s,r-2,i+a,!1)===Gt.Air)return null;return r}function bf(e,t){return async n=>{const r=[];return ue(n,(i,o)=>{const s=et(e,i,o,{decorationStepOrdinal:4,featureIndex:2,placement:[tt({chance:1e3}),_t(),yf({provider:t,heightType:"oceanFloor"}),Ut({provider:t,allowedBiomes:[Y]})],feature:sn()});if(s.length<1)return;const a=Qs(t,s[0][0]);if(a==null)return;const c=[s[0][0][0],a,s[0][0][2]];r.push([i,o,c])}),r}}function vf(e,t){const n=t.noise(),r=new Rn(e,"minecraft:desert_after_surface_desert_well_feature"),i=(s,a,c)=>rr(n,s,a,c)===Y,o=async s=>{const a=[];return ue(s,(c,l)=>{if(!i(c*16+8,128,l*16+8))return;const u=r.getSeedForChunk(c,l),d=new re(u);if(d.nextInt(500)>=1){d.free();return}const f=l*16+Dr(d,0,16),g=c*16+Dr(d,0,16);if(d.free(),!i(g,128,f))return;const h=n.getSurfaceBlock(g,f,"oceanFloor","topmostAccurate"),w=Qs(n,[g,h,f]);w!=null&&a.push([c,l,[g,w,f]])}),a};return o.free=()=>{r.free()},o}const Sf=[["tower_1",1,[5,13,5]],["tower_2",1,[5,13,5]],["tower_3",1,[7,13,7]],["tower_4",1,[7,13,7]],["tower_5",1,[7,13,7]]],bo=[pe,Ae,kt,nn,$n,wt],xf={supportsWorld:e=>W(m.TrailRuin,e),create:async(e,t)=>{const n=t.overworld.noise(),r=e.edition===_.Bedrock&&e.bedrockVersion>=S.V1_20_60;return q(e,{spacing:34,separation:8,salt:83469867,linearSeparation:e.edition===_.Java||r,forceRngType:r?"java":void 0},async(i,o)=>{if(e.edition===_.Java||r){const c=zt({world:e,biomeProvider:t.overworld.noise(),chunkX:i,chunkZ:o,initialY:-15,projectionY:{heightType:"worldSurface",surfaceCheckType:"topmostAccurate"},allowedBiomes:bo,structures:Sf});return c?[c.x,c.y+10,c.z]:!1}const s=n.getPreliminarySurfaceLevel(i*4,o*4),a=je(n.getNoiseBiomeBlock(i*16,s-20,o*16));return bo.includes(a)?[i*16+8,null,o*16+8]:!1},(i,o,s,a)=>a,{x0:0,z0:0,x1:1,z1:1},i=>[i[0]>>4,i[2]>>4],!0)}},Cf=(e,t)=>e!==ht&&(t.edition===_.Java||e!==tr),Tf=[["end_1",1,[19,20,19]],["end_2",1,[19,20,19]]],Bf={supportsWorld:e=>W(m.TrialChamber,e),async create(e,t){return q(e,{spacing:34,separation:12,linearSeparation:!0,salt:94251327,forceRngType:"java"},async(n,r)=>zt({world:e,biomeProvider:t.overworld.noise(),chunkX:n,chunkZ:r,initialY:({rng:i})=>ir(i,-40,-20),projectionY:null,allowedBiomes:i=>Cf(i,e),structures:Tf}),(n,r,i,o)=>[o.x,o.y,o.z],{x0:0,z0:0,x1:1,z1:1},n=>[n[0]>>4,n[2]>>4],!0)}};class Ef{rustFinder;constructor(t){this.rustFinder=new Vr(we(t))}find(t,n){return this.rustFinder.a(t.provider,n.x,n.z,n.sizeX,n.sizeZ)}free(){this.rustFinder.free()}}class If{helper;constructor(t){this.helper=new kr(we(t))}findPositionsBedrock(t,n,r,i,o){return this.helper.b(t.provider,n,r,i,o)}testFeaturePositionsJava(t,n){return this.helper.a(t.provider,n)}free(){this.helper.free()}}const Vf={supportsWorld:e=>W(m.LavaPool,e),create:async(e,t)=>{const n=new Ef(e),r=new If(e),i=t.overworld.noise(),o=async s=>{const a=n.find(i,s),c=e.edition===_.Bedrock?await kf(e,s,r,i):await Of(e,s,r,i),l=[...a.map(u=>({type:"cave",pos:u.reference.pos,count:u.count})),...c.map(u=>({type:"undergroundLake",pos:u}))];return Ue(l,u=>[u.pos[0]>>4,u.pos[2]>>4]).filter(u=>Ye(s,{x:u[0],z:u[1]}))};return o.free=()=>{n.free(),r.free()},o}};async function kf(e,t,n,r){const i=Ft(t,{x1:1,z1:1});return(await ui(async s=>{const a=n.findPositionsBedrock(r,s.x,s.z,s.sizeX,s.sizeZ);return Ue(a,c=>[c[0]>>4,c[2]>>4])},20)(i)).reduce((s,a)=>(s.push(...a[2]),s),[])}async function Of(e,t,n,r){const i=Ft(t,{x0:-1,z0:-1});return(await ui(async s=>{const a=[];if(ue(s,(l,u)=>{const d=et(e,l,u,{decorationStepOrdinal:1,featureIndex:0,placement:[tt({chance:9}),_t(),An.uniform({minInclusive:0,maxInclusive:319}),Ut({provider:r,disallowedBiomes:[ht]})],feature:sn()}).flat();a.push(...d)}),a.length<1)return[];const c=n.testFeaturePositionsJava(r,a);return Ue(c,l=>[l[0]>>4,l[2]>>4])},20)(i)).reduce((s,a)=>(s.push(...a[2]),s),[])}const Mf={supportsWorld:e=>W(m.AbandonedCamp,e),async create(e,t){const n=t.overworld.noise(),r=Tc(e,n),i=async o=>r(o).map(s=>[s.x>>4,s.z>>4,s]);return i.free=r.free,i}},jr={[m.BuriedTreasure]:Yc,[m.Dungeon]:al,[m.NetherFortress]:hl,[m.BastionRemnant]:$c,[m.EndCity]:ll,[m.SlimeChunk]:Il,[m.Stronghold]:Dl,[m.Village]:di,[m.Mineshaft]:zs,[m.WoodlandMansion]:Yl,[m.PillagerOutpost]:nu,[m.OceanRuin]:au,[m.OceanMonument]:fi,[m.Shipwreck]:Tl,[m.DesertTemple]:Hs,[m.JungleTemple]:Sl,[m.WitchHut]:xl,[m.Igloo]:Cl,[m.RuinedPortalOverworld]:yl,[m.RuinedPortalNether]:wl,[m.Spawn]:uu,[m.Fossil]:hu,[m.FossilNether]:bu,[m.Ravine]:xu,[m.EndGateway]:Mu,[m.AmethystGeode]:Lu,[m.AncientCity]:Wu,[m.ItemOverworld]:gf,[m.OreVein]:hf,[m.Cave]:_f,[m.DesertWell]:wf,[m.TrailRuin]:xf,[m.TrialChamber]:Bf,[m.LavaPool]:Vf,[m.AbandonedCamp]:Mf},Ks=(e,t)=>jr[e].finiteGenerationArea?.(t)??null,Af=(e,t,n)=>{let r="idle";const i={},o=async(s,a)=>{if(r!=="idle")throw new Error(`illegal state for finding pois: ${r}`);r="running";try{const c=await Promise.all(a.map(async l=>{if(!i[l]){if(!jr[l].supportsWorld(e))return[l,[]];i[l]=await jr[l].create(e,t,n)}return[l,await i[l](s)]}));return Object.fromEntries(c)}finally{r="idle"}};return o.free=()=>{if(r!=="idle")throw new Error(`illegal state freeing pois: ${r}`);Object.values(i).forEach(s=>{s.free&&s.free()}),r="freed"},o};let Ur;function Rf(e){Ur=e}const Lt=Dc(e=>{const t={},n={get[y.Overworld](){return t[y.Overworld]??=Mc(e)},get[y.Nether](){return t[y.Nether]??=Ac(e)},get[y.End](){return t[y.End]??=new oi(e)}},r=Af(e,n,{sharedTask:async(o,s)=>{const a=Lr(e);return Ur?await Ur(a+"--"+o,Qo(s)):await s()}});return{providers:n,poiFinder:r,freeBuiltProviders:()=>{t[y.Overworld]?.free(),t[y.Nether]?.free(),t[y.End]?.free()}}},({freeBuiltProviders:e,poiFinder:t})=>{e(),t.free()},Lr),qs=1e-9;function Ys(e,t,n){const r=e[0]-t[0],i=e[2]-t[2],o=n&&e[1]!=null&&t[1]!=null?e[1]-t[1]:0;return r*r+o*o+i*i}function mi(e){return Math.max(1,Math.abs(e))*qs}function D(e,t){return Math.floor(e/t)}function Fn(e,t){return e-D(e,t)*t}function Ff(e,t,n,r){const i=n[0]-t[0],o=n[2]-t[2],s=i*i+o*o;if(s===0||s>4*r)return;const a=(t[0]+n[0])/2,c=(t[2]+n[2])/2,l=r-s/4;if(l<=0){e.push([a,null,c]);return}const u=Math.sqrt(l/s),d=-o*u,f=i*u;e.push([a+d,null,c+f],[a-d,null,c-f])}function zf(e,t,n,r,i){const o=t[1],s=n[0]-t[0],a=n[1]-o,c=n[2]-t[2],l=r[0]-t[0],u=r[1]-o,d=r[2]-t[2],f=s*s+a*a+c*c,g=l*l+u*u+d*d,h=s*l+a*u+c*d,w=f*g-h*h;if(w<1e-9)return;const b=(f/2*g-g/2*h)/w,x=(f*(g/2)-h*(f/2))/w,C=t[0]+b*s+x*l,I=o+b*a+x*u,V=t[2]+b*c+x*d,O=(C-t[0])*(C-t[0])+(I-o)*(I-o)+(V-t[2])*(V-t[2]),E=i-O;if(E<0)return;if(E===0){e.push([C,I,V]);return}const A=a*d-c*u,z=c*l-s*d,F=s*u-a*l,L=Math.sqrt(E/w);e.push([C+A*L,I+z*L,V+F*L],[C-A*L,I-z*L,V-F*L])}const vo="depth0",Lf="oceanFloor",Pf="enhancedNoCaves",hi=62;async function Nf(e,t,n,r,i,o,s,a){const c=Rt(e),{providers:l}=Lt(c),{biomes:u,heights:d}=Me(l,t,n,r,i,o,s,a.mode==="biomes"?{mode:"biomes",getBiomesAt:a.getBiomesAt??vo}:{mode:"biomesAndHeights",getBiomesAt:a.getBiomesAt??vo,getHeightLevelAt:a.getHeightLevelAt??Lf,surfaceCheckType:a.surfaceCheckType??Pf}),f=d&&a.mode==="biomesAndHeights"&&a.enableTerrainShading?Df(d,i,o,s):null,g=new Uint8Array(i*o*4),h=new Uint8Array(i*o*3),w=a.biomeFilter??!1;for(let b=0;b<u.length;b++){const x=u[b],C=d?.[b],I=Gf({biome:x,height:C,shadingData:f?.[b],biomeFilter:w});if(g.set(I,b*4),h[b*3]=x,C!=null){let V=Math.max(-16384,Math.min(16383,C));V<0&&(V+=32768),V|=32768,h[b*3+1]=V&255,h[b*3+2]=V>>8&255}}return $o({rgba:g,data:h},[g.buffer,h.buffer])}function Me(e,t,n,r,i,o,s,a){if(t===y.End){if(a.mode==="heights")throw new Error("End does not support heights mode");return Hf(e,n,r,i,o,s)}const c=e[t];if(c instanceof qe)return a.mode==="heights"?{biomes:new Uint8Array(i*o),heights:c.getSurfaceArea(n,r,i,o,s,a.getHeightLevelAt,a.surfaceCheckType)}:a.mode==="biomes"?typeof a.getBiomesAt=="number"?{biomes:c.getNoiseBiomeArea(n,a.getBiomesAt>>2,r,i,1,o,s),heights:null}:{biomes:c.getNoiseBiomeAreaAtHeightType(n,r,i,o,s,a.getBiomesAt),heights:null}:c.getNoiseBiomeAreaAtHeightTypeWithSurface(n,r,i,o,s,a.getBiomesAt,a.getHeightLevelAt,a.surfaceCheckType);if(c instanceof si){if(a.mode==="heights")throw new Error("Legacy provider does not support heights mode");const l=new Uint8Array(i*o),u=c.getInts(n,r,i*s,o*s);for(let d=0;d<o;d++)for(let f=0;f<i;f++){const g=d*i+f,h=Math.floor((d+.5)*s)*i*s+Math.floor((f+.5)*s);l[g]=u[h]}return{biomes:l,heights:null}}if(c instanceof xs){if(a.mode==="heights")throw new Error("Single biome provider does not support heights mode");const l=new Uint8Array(i*o);return l.fill(c.getBiome()),{biomes:l,heights:null}}throw new Error("Unknown biome provider")}function Hf(e,t,n,r,i,o){if(o>=4)return{biomes:e[y.End].getBiomeArea(t,n,r,i,o),heights:null};if(o!==1&&o!==2)throw new Error("Invalid step");const s=D(t,4),a=D(n,4),c=D(t+(r-1)*o,4)-s+1,l=D(n+(i-1)*o,4)-a+1,u=e[y.End].getBiomeArea(s*4,a*4,c,l,4),d=new Uint8Array(r*i);for(let f=0;f<i;f++){const g=(D(n+f*o,4)-a)*c;for(let h=0;h<r;h++)d[f*r+h]=u[g+D(t+h*o,4)-s]}return{biomes:d,heights:null}}function Df(e,t,n,r){const i=[],s=1/Math.sqrt(.5)*Math.sqrt(r/4),a=45,c=315,l=s*1,u=Math.PI*a/180,d=Math.PI*c/180,f=Math.cos(u),g=Math.sin(u);for(let h=0;h<n;h++){const w=Math.max(h-1,0),b=Math.min(h+1,n-1);for(let x=0;x<t;x++){const C=Math.max(x-1,0),I=Math.min(x+1,t-1),V=.025*e[h*t+C],O=.025*e[h*t+I],E=.025*e[w*t+x],A=.025*e[b*t+x],z=(O-V)/l,F=(A-E)/l,L=Math.atan(Math.sqrt(z*z+F*F));let R=Math.atan2(F,-z);R<0?R=Math.PI/2-R:R>Math.PI/2?R=2*Math.PI-R+Math.PI/2:R=Math.PI/2-R;const M=g*Math.cos(L)+f*Math.sin(L)*Math.cos(d-R);i[h*t+x]=zr(Math.floor(256*(M-.20710678118654746)),0,255)}}return i}function Wf(e,t,n){return[Math.round(e[0]*(1-n)+t[0]*n),Math.round(e[1]*(1-n)+t[1]*n),Math.round(e[2]*(1-n)+t[2]*n)]}function _r(e,t){const n=e/256,r=t/256;return n<.5?zr(Math.floor(2*n*r*256),0,255):zr(Math.floor((1-2*(1-n)*(1-r))*256),0,255)}function Gf({biome:e,height:t,shadingData:n,biomeFilter:r}){if(e===255)return[0,0,0,0];const i=Fe[e];let o=i.rgb;if(t!=null&&n!=null){const a=t<hi,c=i.category==="ocean"||i.category==="river",l=i.temperature<=.1;a&&!c?l?o=Fe[11].rgb:o=Fe[7].rgb:!a&&c&&(l?o=Fe[26].rgb:o=Fe[16].rgb),o=[_r(n,o[0]),_r(n,o[1]),_r(n,o[2])]}const s=[...o,255];if(r)if(r.includes(e))s[0]=Math.round(o[0]*.6),s[1]=Math.round(o[1]*.6),s[2]=Math.round(o[2]*.6);else{const a=Wf(Hc,o,.1255);s[0]=a[0],s[1]=a[1],s[2]=a[2]}return s}async function jf(e,t,n,r){const i=Rt(e),{providers:o}=Lt(i);return o[y.Overworld].noise().getNoiseBiomeYColumn(t,n,r)}async function Uf(e,t,n,r,i,o){const s={x:n,z:r,sizeX:i,sizeZ:o},a=Rt(e),{poiFinder:c}=Lt(a);return await c(s,t)}const ea={witnessPoiIds:Object.freeze([]),pois:Object.freeze([]),clusters:Object.freeze([])},Zt=Object.freeze({passed:!1,...ea}),Zf=Object.freeze({passed:!0,...ea});function Jf(e,t,n){if(e.shape.kind==="square"){const i=Math.max(1,Math.round(e.shape.inradius*2)),o=i-1>>1;return{centerX:t,centerZ:n,minX:t-o,maxX:t+(i-1-o),minZ:n-o,maxZ:n+(i-1-o)}}const r=e.shape.radius;return{centerX:t,centerZ:n,minX:Math.floor(t-r),maxX:Math.ceil(t+r),minZ:Math.floor(n-r),maxZ:Math.ceil(n+r)}}function Xf(e,t,n,r){if(e.shape.kind==="square")return n>=t.minX&&n<=t.maxX&&r>=t.minZ&&r<=t.maxZ;const i=n-t.centerX,o=r-t.centerZ;return i*i+o*o<=e.shape.radius*e.shape.radius}async function an(e,t,n,r,i){const o=e.stepQ??1,s=Math.max(0,Math.ceil(((n.minX>>2)-e.xQ0)/o)),a=Math.min(e.xLen,Math.floor(((n.maxX>>2)-e.xQ0)/o)+1),c=Math.max(0,Math.ceil(((n.minZ>>2)-e.zQ0)/o)),l=Math.min(e.zLen,Math.floor(((n.maxZ>>2)-e.zQ0)/o)+1);for(let u=c;u<l;u++){await r();const d=(e.zQ0+u*o)*4,f=d+2;for(let g=s;g<a;g++){const h=(e.xQ0+g*o)*4,w=h+2;$f(t,n,h,d)&&i(u*e.xLen+g,w,f)}}}function $f(e,t,n,r){const i=n+3,o=r+3;if(e.shape.kind==="square")return i>=t.minX&&n<=t.maxX&&o>=t.minZ&&r<=t.maxZ;const s=Math.max(n,Math.min(t.centerX,i)),a=Math.max(r,Math.min(t.centerZ,o)),c=s-t.centerX,l=a-t.centerZ;return c*c+l*l<=e.shape.radius*e.shape.radius}function X(e){return e=Math.round(e*10)/10,(e+"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,")}function De(e){return e[2].map(function(t){return[e[0],e[1],t]})}function Qf(e){const t=e[2];return t?De([e[0],e[1],t]):[[e[0],e[1],void 0]]}function So(e,t){return t.edition===_.Java&&t.javaVersion>=p.V1_18?[e[0]*16,null,e[1]*16]:[e[0]*16+8,null,e[1]*16+8]}const H={chunkClassifier:8,veryBig:16,big:32,normal:128,small:256},N={chunk:function(e){return e[0]+"//"+e[1]},xzBlock:function(e,t){return e+"/"+t},xyBlockArr:function(e){return N.xzBlock(e[2][0],e[2][2])}};function xo(e){return e.count<600?"small":e.count<1800?"medium":e.count<5400?"large":"huge"}function yr(e){return!!(e&&e[0]!=null&&e[2]!=null)}function Co(e){return e?e==="units"?"Housing units":e==="hoglin_stable"?"Hoglin stables":e==="treasure"?"Treasure room":e==="bridge"?"Bridges":null:null}function To(e){return e===ye.ZOMBIE?"Zombie":e===ye.SKELETON?"Skeleton":e===ye.SPIDER?"Spider":null}function Bo(e){return[e.isLarge?"Large,":"Small,",e.type==="warm"?"Warm":"Cold","Ruin",e.clusterSize>0&&"with Cluster ("+e.clusterSize+" small ruins)"].filter(Boolean).join(" ")}function Kf(e){return e.oreCount<6?"small":e.oreCount<9?"medium":"large"}function Eo(e){if(e.type==null)return null;let t={desert:"Desert Village",plains:"Plains Village",savanna:"Savanna Village",taiga:"Taiga Village",snowy:"Snowy Village"}[e.type];return e.zombie&&(t="Zombie "+t),t}const He=e=>e,Z=e=>e,nt={[m.AbandonedCamp]:Z({shortId:"Ab",label:"Camp",fullLabel:"Abandoned Camp",icon:"abandoned-camp",imgSrc:{default:"abandoned-camp.png",secretChest:"abandoned-camp-special-copper.png"},dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.normal,getTooltipText:function(e){return e[2].hasSecretChest?"Abandoned Camp (Copper Chest)":"Abandoned Camp"},getImg:function(e){return e.hasSecretChest?"secretChest":"default"},getCoords:function(e){const{x:t,y:n,z:r}=e[2];return[t,n,r]},fillColor:"154,63,53",getHash:N.chunk}),[m.AmethystGeode]:He({shortId:"Ag",label:"Geode",fullLabel:"Amethyst Geode",icon:"amethyst",imgSrc:"amethyst.png",dimension:y.Overworld,biomeScanHeights:["surface","underground","bottom"],maxTileSize:H.chunkClassifier,splitPois:De,getHoverText:function(e){return"Likely Geode @ "+e[2].map(function(n){return X(n[0])+" / "+X(n[1])+" / "+X(n[2])}).join(", ")},getTooltipText:function(){return"Likely Amethyst Geode"},getCoords:function(e){return e[2]},fillColor:"98,69,149",getHash:N.xyBlockArr}),[m.AncientCity]:Z({shortId:"Ac",label:"Ancient City",icon:"ancient-city",imgSrc:"ancient-city.png",dimension:y.Overworld,biomeScanHeights:["bottom"],maxTileSize:H.normal,getTooltipText:function(){return"Ancient City"},getCoords:function(e){return[e[0]*16+8,-51,e[1]*16+8]},getHoverText:function(e,t){const n=nt[m.AncientCity].getCoords?.(e,t)??[0,0,0];return"Ancient City @ "+X(n[0])+" / "+n[1]+" / "+X(n[2])},fillColor:"5,35,30",getHash:N.chunk}),[m.BastionRemnant]:Z({shortId:"Br",label:"Bastion",fullLabel:"Bastion Remnant",icon:"piglin",imgSrc:{default:"bastion.png",bridge:"bastion-bridge.png",stables:"bastion-stables.png",units:"bastion-units.png",treasure:"bastion-treasure.png"},dimension:y.Nether,maxTileSize:H.big,getCoords:function(e){return[e[0]*16,null,e[1]*16]},getHoverText:function(e){const t=Co(e[2].type);return t==null?null:"Type: "+t},getTooltipText:function(e){return"Bastion ("+Co(e[2].type)+")"},getImg:function(e){return e.type==="hoglin_stable"?"stables":e.type==="treasure"?"treasure":e.type==="bridge"?"bridge":"units"},fillColor:function(e){return e?.type==null||e.type==="units"?"140,140,140":e.type==="hoglin_stable"?"245,0,122":e.type==="treasure"?"139,69,19":e.type==="bridge"?"8,145,17":"0,0,0"},getHash:N.chunk}),[m.BuriedTreasure]:Z({shortId:"Bt",label:"Treasure",fullLabel:"Buried Treasure",icon:"buried-treasure",imgSrc:"buried-treasure.png",dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.big,getHoverText:function(e,t){const n=nt[m.BuriedTreasure].getCoords?.(e,t)??[0,0,0];return"Treasure @ "+X(n[0])+" / "+X(n[2])},getTooltipText:function(){return"Buried Treasure"},getCoords:function(e,t){const n=t.edition===_.Java?9:8;return[e[0]*16+n,null,e[1]*16+n]},fillColor:"190,140,100",getHash:N.chunk}),[m.Cave]:He({shortId:"Ca",label:"Cave",fullLabel:"Cheese Cave",icon:"cave",imgSrc:{default:"cave.png",special:"cave-special.png"},dimension:y.Overworld,biomeScanHeights:["surface","underground","bottom"],maxTileSize:H.veryBig,splitPois:De,getCoords:function(e){return e[2].reference.pos},getTooltipText:function(e){return"Cheese Cave ("+xo(e[2])+")"},getImg:function(e){return xo(e)==="huge"?"special":"default"},fillColor:function(){return"80,80,80"},getHash:function(e){return N.xzBlock(e[2].reference.pos[0],e[2].reference.pos[2])}}),[m.DesertTemple]:Z({shortId:"Dt",label:"Desert Temple",icon:"desert-temple",imgSrc:"desert-temple.png",dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.normal,getTooltipText:function(e,t){return t.edition===_.Java&&t.javaVersion>=p.V1_18?"Likely Desert Temple":"Desert Temple"},fillColor:"120,100,20",getHash:N.chunk}),[m.DesertWell]:Z({shortId:"Dw",label:"Desert Well",icon:"desert-well",imgSrc:"desert-well.png",dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.big,getTooltipText:function(e){return"Likely Desert Well"},getCoords:function(e){return e[2].slice(0,3)},fillColor:"40,57,161",getHash:N.chunk}),[m.Dungeon]:He({shortId:"D",label:"Dungeon",icon:"dungeon",imgSrc:{default:"dungeon.png",zombie:"dungeon-zombie.png",spider:"dungeon-spider.png",skeleton:"dungeon-skeleton.png"},dimension:y.Overworld,biomeScanHeights:["surface","underground","bottom"],maxTileSize:H.chunkClassifier,getImg:function(e){const t=e[3];return t===ye.ZOMBIE?"zombie":t===ye.SKELETON?"skeleton":"spider"},fillColor:function(e){return e==null||e.length>1?"220,120,20":e[0][3]===ye.ZOMBIE?"70,109,29":e[0][3]===ye.SKELETON?"125,125,125":e[0][3]===ye.SPIDER?"168,46,0":"0,0,0"},splitPois:De,getCoords:function(e){return e[2].slice(0,3)},getTooltipText:function(e,t){const n=To(e[2][3])||"Unknown Mob";return(t.edition===_.Bedrock&&t.bedrockVersion>=S.V1_18||t.edition===_.Java&&t.javaVersion>=p.V1_18?"Possible":"Likely")+" Dungeon ("+n+")"},getHoverText:function(e){return e[2].map(function(t){return(To(t[3])||"Dungeon")+" @ "+[X(t[0]),t[1],X(t[2])].join(" / ")},"").join(", ")},getHash:function(e){return N.xyBlockArr([e[0],e[1],[e[2][0],e[2][1],e[2][2]]])}}),[m.Fossil]:He({shortId:"F",label:"Fossil",icon:"fossil",imgSrc:"fossil.png",dimension:y.Overworld,biomeScanHeights:["surface","underground","bottom"],maxTileSize:H.chunkClassifier,fillColor:"90,90,90",splitPois:Qf,getCoords:function(e){return yr(e[2])?e[2].slice(0,3):[e[0]*16+8,null,e[1]*16+8]},getTooltipText:function(e){let t=e[2]&&e[2][3]==="diamond"?"Diamond Fossil":"Fossil";return yr(e[2])||(t+=" (Estimated)"),t},getHoverText:function(e){const t=e[2].filter(Boolean);return yr(t[0])?t.map(function(n){return"Fossil @ "+[X(n?.[0]??0),n?.[1],X(n?.[2]??0)].filter(Boolean).join(" / ")},"").join(", "):null},getHash:N.chunk}),[m.FossilNether]:He({shortId:"Fn",label:"Nether Fossil",icon:"fossil",imgSrc:{default:"fossil.png",ghast:"fossil-ghast.png"},dimension:y.Nether,maxTileSize:H.chunkClassifier,fillColor:function(e){return e!=null&&e[0][3].hasDriedGhast?"0,122,108":"90,90,90"},splitPois:De,getImg:function(e){return e[3].hasDriedGhast?"ghast":"default"},getCoords:function(e){return e[2].slice(0,3)},getTooltipText:function(e,t){let n;return t.edition===_.Bedrock?n="Likely Nether Fossil":n="Nether Fossil",e[2][3].hasDriedGhast&&(n+=" (Ghast)"),n},getHoverText:function(e){return e[2].map(function(t){return"Fossil "+(t[3].hasDriedGhast?"(Ghast)":"")+" @ "+[X(t[0]),t[1],X(t[2])].filter(Boolean).join(" / ")},"").join(", ")},getHash:N.chunk}),[m.EndCity]:Z({shortId:"E",label:"End City",icon:"end-city",imgSrc:{default:"end-city.png",ship:"end-city-ship.png"},dimension:y.End,maxTileSize:H.normal,getImg:function(e){return e.hasShip==null||e.hasShip?"ship":"default"},fillColor:function(e){return e==null||e.hasShip==null||e.hasShip?"73,49,73":"130,130,130"},getTooltipText:function(e){return"Likely "+(e[2].hasShip==null?"End City":e[2].hasShip?"End City (with ship)":"End City (without ship)")},getHoverText:function(e){return e[2].hasShip==null?null:e[2].hasShip?"End City with ship":"End City without ship"},getHash:N.chunk}),[m.EndGateway]:He({shortId:"Eg",label:"End Gateway",icon:"end-gateway",imgSrc:"end-gateway.png",dimension:y.End,maxTileSize:H.normal,fillColor:"20,100,85",splitPois:De,getCoords:function(e){return[e[2].x,null,e[2].z]},getHoverText:function(e){return"End Gateway @ "+X(e[2][0].x)+" / "+X(e[2][0].z)},getTooltipText:function(){return"End Gateway"},getHash:function(e){return N.xzBlock(e[2].x,e[2].z)}}),[m.NetherFortress]:Z({shortId:"N",label:"Nether Fortress",icon:"nether-fortress2",imgSrc:"nether-fortress.png",dimension:y.Nether,maxTileSize:H.big,fillColor:"195,65,55",getCoords:function(e){return[e[0]*16+11,null,e[1]*16+11]},getTooltipText:function(){return"Nether Fortress (Crossing)"},getHoverText:function(e){return"Crossing @ "+X((e[0]<<4)+11)+" / "+X((e[1]<<4)+11)},getHash:N.chunk}),[m.Igloo]:Z({shortId:"I",label:"Igloo",icon:"igloo2",imgSrc:{default:"igloo.png",basement:"igloo-basement.png"},dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.normal,getImg:function(e){return e.hasBasement?"basement":"default"},fillColor:function(e){return e?.hasBasement?"35,87,205":"100,100,100"},getTooltipText:function(e){return e[2].hasBasement==null?"Igloo":e[2].hasBasement?"Igloo (with basement)":"Igloo (without basement)"},getHoverText:function(e){return e[2].hasBasement==null?null:e[2].hasBasement?"Igloo with basement":"Igloo without basement"},getHash:N.chunk}),[m.JungleTemple]:Z({shortId:"J",label:"Jungle Temple",icon:"jungle-temple",imgSrc:"jungle-temple.png",dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.normal,getTooltipText:function(e,t){return t.edition===_.Java&&t.javaVersion>=p.V1_18?"Likely Jungle Temple":"Jungle Temple"},fillColor:"114,133,10",getHash:N.chunk}),[m.WoodlandMansion]:Z({shortId:"Ma",label:"Mansion",fullLabel:"Woodland Mansion",icon:"mansion3",imgSrc:"mansion.png",dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.small,getTooltipText:function(e,t){return t.edition===_.Java&&t.javaVersion>=p.V1_18?"Likely Woodland Mansion":"Woodland Mansion"},fillColor:"160,82,45",getHash:N.chunk}),[m.LavaPool]:He({shortId:"Lp",label:"Lava Pool",fullLabel:"Underground Lava Pool",icon:"lava",imgSrc:{default:"lava.png",bucket:"lava-bucket.png",cave:"lava-cave.png"},getImg:function(e){return e.type==="undergroundLake"?"bucket":"cave"},dimension:y.Overworld,biomeScanHeights:["surface","underground","bottom"],maxTileSize:H.chunkClassifier,splitPois:De,fillColor:"240,90,20",getHash:function(e){return N.xzBlock(e[2].pos[0],e[2].pos[2])},getTooltipText:function(e){return e[2].type==="cave"?"Lava-Flooded Cave":"Likely Underground Lava Lake"},getTooltipAdditionalText:function(){return"Never dig straight down"},getCoords:function(e){return e[2].pos}}),[m.Mineshaft]:Z({shortId:"M",label:"Mineshaft",icon:"mineshaft2",imgSrc:"mineshaft.png",dimension:y.Overworld,biomeScanHeights:["surface","underground","bottom"],maxTileSize:H.veryBig,getTooltipText:function(){return"Mineshaft"},fillColor:"160,130,10",getHash:N.chunk}),[m.OceanMonument]:Z({shortId:"Om",label:"Monument",fullLabel:"Ocean Monument",icon:"ocean-monument2",imgSrc:"ocean-monument.png",dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.normal,getTooltipText:function(){return"Ocean Monument"},fillColor:"100,100,220",getHash:N.chunk}),[m.OceanRuin]:Z({shortId:"Or",label:"Ocean Ruins",icon:"ocean-ruin",imgSrc:{default:"ocean-ruin.png",special:"ocean-ruin-special.png"},dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.big,getImg:function(e){return e.isLarge&&e.clusterSize>0?"special":"default"},fillColor:function(e){return e?.type==="cold"?e.isLarge&&e.clusterSize>0?"51,102,255":"80,98,149":e?.isLarge&&e?.clusterSize>0?"255,82,51":"149,91,80"},getTooltipText:function(e){return Bo(e[2])},getHoverText:function(e){return Bo(e[2])},getHash:N.chunk}),[m.PillagerOutpost]:Z({shortId:"Po",label:"Outpost",fullLabel:"Pillager Outpost",icon:"pillager-outpost2",imgSrc:"pillager-outpost.png",dimension:y.Overworld,biomeScanHeights:["surface"],getCoords:So,maxTileSize:H.normal,getTooltipText:function(){return"Pillager Outpost"},fillColor:"80,50,20",getHash:N.chunk}),[m.Ravine]:He({shortId:"Rv",label:"Ravine",icon:"ravine",imgSrc:{default:"ravine.png",special:"ravine-special.png",underwater:"ravine-underwater.png",underwaterSpecial:"ravine-underwater-special.png"},dimension:y.Overworld,biomeScanHeights:["surface","underground","bottom"],maxTileSize:H.chunkClassifier,splitPois:De,getCoords:function(e){return[e[2].x,e[2].y,e[2].z]},getImg:function(e){return e.isUnderwater?e.isMegaRavine?"underwaterSpecial":"underwater":e.isMegaRavine?"special":"default"},getTooltipText:function(e){const t=e[2];return[t.isMegaRavine&&"Mega",t.isUnderwater&&"Underwater","Ravine",t.thickness&&"(Width: "+X(t.thickness)+")"].filter(Boolean).join(" ")},getHoverText:function(e){const t=e[2][0];return[t.isMegaRavine&&"Mega",t.isUnderwater&&"Underwater","Ravine","@ "+X(t.x)+" / "+X(t.y)+" / "+X(t.z)].filter(Boolean).join(" ")},fillColor:function(e){if(e==null)return"20,90,0";const t=e[0];return t.isUnderwater?t.isMegaRavine?"168,7,213":"0,0,255":t.isMegaRavine?"128,25,0":"20,90,0"},getHash:function(e){return N.xzBlock(e[2].x,e[2].z)}}),[m.OreVein]:He({shortId:"Ov",label:"Ore Veins",icon:"ore-vein",imgSrc:{default:"raw-iron.png",copper:"raw-copper.png",iron:"raw-iron.png"},dimension:y.Overworld,biomeScanHeights:["surface","underground","bottom"],splitPois:De,getCoords:function(e){return e[2].reference},getImg:function(e){return e.type},maxTileSize:H.chunkClassifier,getTooltipText:function(e){return[e[2].type==="copper"?"Copper Vein":"Iron Vein","("+Kf(e[2])+")"].join(" ")},fillColor:"110,75,40",getHash:function(e){return N.xzBlock(e[2].reference[0],e[2].reference[2])}}),[m.RuinedPortalOverworld]:Z({shortId:"Rp",label:"Ruined Portal",fullLabel:"Ruined Portal Overworld",icon:"ruined-portal",imgSrc:"ruined-portal.png",dimension:y.Overworld,biomeScanHeights:["surface","underground","bottom"],maxTileSize:H.big,getTooltipText:function(){return"Estimated Ruined Portal"},fillColor:"109,9,109",getHash:N.chunk}),[m.RuinedPortalNether]:Z({shortId:"Rpn",label:"Ruined Portal",fullLabel:"Ruined Portal Nether",icon:"ruined-portal",imgSrc:"ruined-portal.png",dimension:y.Nether,maxTileSize:H.big,getTooltipText:function(){return"Estimated Ruined Portal"},fillColor:"109,9,109",getHash:N.chunk}),[m.Shipwreck]:Z({shortId:"Sw",label:"Shipwreck",icon:"shipwreck2",imgSrc:"shipwreck.png",dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.big,getTooltipText:function(){return"Shipwreck"},fillColor:"108,88,97",getHash:N.chunk}),[m.SlimeChunk]:Z({shortId:"Sc",label:"Slime Chunk",icon:"slime",imgSrc:"slime.png",dimension:y.Overworld,biomeScanHeights:["surface","underground","bottom"],maxTileSize:H.chunkClassifier,getTooltipText:function(){return"Slime Chunk"},fillColor:"29,145,44",fillColorOuter:"40,199,60",getHash:N.chunk,canOverlay:!0,preferFill:!0}),[m.Spawn]:Z({shortId:"Sp",label:"Spawn Point",icon:"spawn",imgSrc:"spawn.png",dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.small,getCoords:function(e){return[e[2].x,null,e[2].z]},getTooltipText:function(){return"Estimated Spawn Point"},fillColor:"40,40,40",getHash:N.chunk}),[m.Stronghold]:Z({shortId:"St",label:"Stronghold",icon:"stronghold",imgSrc:"stronghold.png",dimension:y.Overworld,biomeScanHeights:["surface","underground","bottom"],maxTileSize:H.small,fillColor:"195,65,55",getCoords:function(e){return[e[0]*16+4,null,e[1]*16+4]},getTooltipText:function(){return"Stronghold (Stairway)"},getHoverText:function(e){return"Stronghold stairway @ "+X((e[0]<<4)+4)+" / "+X((e[1]<<4)+4)},getHash:N.chunk}),[m.TrailRuin]:Z({shortId:"Tr",label:"Trail Ruins",icon:"trail-ruin",imgSrc:"trail-ruin.png",dimension:y.Overworld,biomeScanHeights:["surface","underground"],maxTileSize:H.normal,getTooltipText:function(e){return"Trail Ruins"},getCoords:function(e){return e[2].slice(0,3)},fillColor:"123,80,20",getHash:N.chunk}),[m.TrialChamber]:Z({shortId:"Tc",label:"Trial Chamber",icon:"trial-chamber",imgSrc:"trial-chamber.png",dimension:y.Overworld,biomeScanHeights:["surface","underground","bottom"],maxTileSize:H.big,getTooltipText:function(){return"Trial Chamber"},getCoords:function(e){return e[2]!=null?e[2]:[e[0]*16,null,e[1]*16]},fillColor:"113,45,25",getHash:N.chunk}),[m.Village]:Z({shortId:"V",label:"Village",icon:"village2",imgSrc:{default:"village.png",zombie:"village-zombie.png"},dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.normal,getImg:function(e){return e.zombie?"zombie":"default"},getCoords:So,fillColor:function(e){return e?.zombie?"200,0,190":e?.type==null?"179,163,60":{desert:"180,101,4",plains:"100,131,63",savanna:"138,128,56",taiga:"11,102,89",snowy:"120,120,120"}[e.type]},getTooltipText:function(e){return Eo(e[2])||"Village"},getHoverText:function(e){return Eo(e[2])},getHash:N.chunk}),[m.WitchHut]:Z({shortId:"Wh",label:"Witch Hut",icon:"witch-hut2",imgSrc:"witch-hut.png",dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.normal,getTooltipText:function(){return"Witch Hut"},fillColor:"169,44,212",getHash:N.chunk}),[m.ItemOverworld]:Z({shortId:"IOw",label:"Apple",fullLabel:"Enchanted Golden Apple",icon:"golden-apple",imgSrc:"golden-apple.png",dimension:y.Overworld,biomeScanHeights:["surface"],maxTileSize:H.small,fillColor:"145,81,13",getTooltipText:function(){return"Likely Enchanted Apple (temple chest)"},getHoverText:function(){return"Likely Enchanted Apple (temple chest)"},getHash:N.chunk,canOverlay:!0})};Object.fromEntries(Object.entries(nt).map(e=>[e[1].shortId,e[0]]));function qf(e,t){return`${e}/${nt[e].getHash(t)}`}const Yf=[m.Spawn,m.SlimeChunk,m.Village,m.AncientCity,m.Dungeon,m.Stronghold,m.WoodlandMansion,m.OceanMonument,m.PillagerOutpost,m.Mineshaft,m.RuinedPortalOverworld,m.JungleTemple,m.DesertTemple,m.WitchHut,m.BuriedTreasure,m.Shipwreck,m.Igloo,m.OceanRuin,m.Fossil,m.Cave,m.Ravine,m.LavaPool,m.EndCity,m.EndGateway,m.NetherFortress,m.BastionRemnant,m.RuinedPortalNether,m.AmethystGeode,m.ItemOverworld,m.OreVein,m.DesertWell,m.TrailRuin,m.TrialChamber,m.FossilNether,m.AbandonedCamp];Yf.map(e=>({key:e,...nt[e]}));function ed(e,t,n){return nt[e].getCoords?.(t,n)??[t[0]*16+8,null,t[1]*16+8]}function td(e,t,n){return{poi:e,coords:ed(e,t,n),data:t[2],chunk:[t[0],t[1]],poiId:qf(e,t)}}function nd(e,t,n){const r=nt[e],i=[];for(const o of t){const s=r.splitPois?r.splitPois(o):[o];for(const a of s)i.push(td(e,a,n))}return i}const rd={[m.BastionRemnant]:_e()({Bridge:e=>e.type==="bridge",Stables:e=>e.type==="hoglin_stable",Units:e=>e.type==="units",Treasure:e=>e.type==="treasure"}),[m.BuriedTreasure]:{},[m.Dungeon]:_e()({Zombie:e=>e[3]===ye.ZOMBIE,Skeleton:e=>e[3]===ye.SKELETON,Spider:e=>e[3]===ye.SPIDER}),[m.EndCity]:_e()({Ship:e=>e.hasShip}),[m.NetherFortress]:{},[m.SlimeChunk]:{},[m.Stronghold]:{},[m.Village]:_e()({Zombie:e=>!!e.zombie,Desert:e=>e.type==="desert",Plains:e=>e.type==="plains",Savanna:e=>e.type==="savanna",Taiga:e=>e.type==="taiga",Snowy:e=>e.type==="snowy"}),[m.Mineshaft]:{},[m.WoodlandMansion]:{},[m.PillagerOutpost]:{},[m.OceanRuin]:_e()({Large:e=>e.isLarge,Cluster:e=>e.clusterSize>0,Warm:e=>e.type==="warm",Cold:e=>e.type==="cold"}),[m.OceanMonument]:{},[m.Shipwreck]:{},[m.DesertTemple]:{},[m.JungleTemple]:{},[m.WitchHut]:{},[m.Igloo]:_e()({Basement:e=>!!e.hasBasement}),[m.RuinedPortalOverworld]:{},[m.RuinedPortalNether]:{},[m.Spawn]:{},[m.Fossil]:_e()({Diamond:e=>e[3]==="diamond",Coal:e=>e[3]==="coal"}),[m.FossilNether]:_e()({Ghast:e=>!!e[3].hasDriedGhast}),[m.Ravine]:_e()({Mega:e=>e.isMegaRavine,Underwater:e=>e.isUnderwater}),[m.EndGateway]:{},[m.AmethystGeode]:{},[m.AncientCity]:{},[m.ItemOverworld]:{},[m.OreVein]:_e()({Copper:e=>e.type==="copper",Iron:e=>e.type==="iron",Small:e=>wr(e)==="small",Medium:e=>wr(e)==="medium",Large:e=>wr(e)==="large"}),[m.Cave]:_e()({Small:e=>_n(e)==="small",Medium:e=>_n(e)==="medium",Large:e=>_n(e)==="large",Huge:e=>_n(e)==="huge"}),[m.DesertWell]:{},[m.TrailRuin]:{},[m.TrialChamber]:{},[m.LavaPool]:_e()({UndergroundLake:e=>e.type==="undergroundLake",Cave:e=>e.type==="cave"}),[m.AbandonedCamp]:_e()({CopperChest:e=>e.hasSecretChest})};function _e(){return e=>e}function id(e,t){const n=rd[e];if(!n)throw new Error(`No tags defined for POI: ${e}`);return Object.entries(n).filter(([r,i])=>i(t)).map(([r])=>r)}const od=({tags:e,include:t=[],exclude:n=[],includeAny:r=[]})=>!n.some(i=>e.includes(i))&&t.every(i=>e.includes(i))&&(r.length===0||r.some(i=>e.includes(i)));function wr(e){return e.oreCount<6?"small":e.oreCount<9?"medium":"large"}function _n(e){return e.count<600?"small":e.count<1800?"medium":e.count<5400?"large":"huge"}const sd={[m.BastionRemnant]:{units:{include:["Units"],label:"Bastion (Housing Units)",imgSrcKey:"units"},stables:{include:["Stables"],label:"Bastion (Hoglin Stables)",imgSrcKey:"stables"},treasure:{include:["Treasure"],label:"Bastion (Treasure Room)",imgSrcKey:"treasure"},bridge:{include:["Bridge"],label:"Bastion (Bridge)",imgSrcKey:"bridge"}},[m.Cave]:{small:{include:["Small"],label:"Small Cheese Cave"},mediumPlus:{includeAny:["Medium","Large","Huge"],label:"Medium+ Cheese Cave"},largePlus:{includeAny:["Large","Huge"],label:"Large+ Cheese Cave"},huge:{include:["Huge"],label:"Huge Cheese Cave",imgSrcKey:"special"}},[m.Dungeon]:{zombie:{include:["Zombie"],label:"Zombie Dungeon",imgSrcKey:"zombie"},skeleton:{include:["Skeleton"],label:"Skeleton Dungeon",imgSrcKey:"skeleton"},spider:{include:["Spider"],label:"Spider Dungeon",imgSrcKey:"spider"}},[m.EndCity]:{ship:{include:["Ship"],label:"End City with Ship",imgSrcKey:"ship"},"no-ship":{exclude:["Ship"],label:"End City without Ship"}},[m.Fossil]:{diamond:{include:["Diamond"],label:"Diamond Fossil"},coal:{include:["Coal"],label:"Coal Fossil"}},[m.FossilNether]:{ghast:{include:["Ghast"],label:"Nether Fossil (Dried Ghast)",imgSrcKey:"ghast"}},[m.Igloo]:{basement:{include:["Basement"],label:"Igloo With Basement",imgSrcKey:"basement"},"no-basement":{exclude:["Basement"],label:"Igloo Without Basement"}},[m.LavaPool]:{lake:{include:["UndergroundLake"],label:"Underground Lava Lake",imgSrcKey:"bucket"},cave:{include:["Cave"],label:"Lava-Flooded Cave",imgSrcKey:"cave"}},[m.OceanRuin]:{large:{include:["Large"],label:"Large Ocean Ruins"},small:{exclude:["Large"],label:"Small Ocean Ruins"},cluster:{include:["Cluster"],label:"Ocean Ruins with Cluster",imgSrcKey:"special"},warm:{include:["Warm"],label:"Warm Ocean Ruins"},cold:{include:["Cold"],label:"Cold Ocean Ruins"}},[m.OreVein]:{copper:{include:["Copper"],label:"Copper Vein",imgSrcKey:"copper"},iron:{include:["Iron"],label:"Iron Vein",imgSrcKey:"iron"},small:{include:["Small"],label:"Small Vein"},mediumPlus:{includeAny:["Medium","Large"],label:"Medium+ Vein"},large:{includeAny:["Large"],label:"Large Vein"}},[m.Ravine]:{mega:{include:["Mega"],label:"Mega Ravine",imgSrcKey:"special"},underwater:{include:["Underwater"],label:"Underwater Ravine",imgSrcKey:"underwater"}},[m.Village]:{zombie:{include:["Zombie"],label:"Zombie Village",imgSrcKey:"zombie"},desert:{include:["Desert"],label:"Desert Village"},plains:{include:["Plains"],label:"Plains Village"},savanna:{include:["Savanna"],label:"Savanna Village"},taiga:{include:["Taiga"],label:"Taiga Village"}},[m.AbandonedCamp]:{copperChest:{include:["CopperChest"],label:"Camp (Copper Chest)",imgSrcKey:"secretChest"}}};function ad(e,t){if(!t)return{};const n=sd[e]?.[t];return n?{includeTags:n.include,includeAnyTags:n.includeAny,excludeTags:n.exclude}:{}}function cd(e,t){const{includeTags:n,includeAnyTags:r,excludeTags:i}=ad(e,t);return(o,s)=>{if(e!==o)return!1;const a=id(o,s);return od({tags:a,include:n,exclude:i,includeAny:r})}}async function zn(e,t,n){const r=e.get(t);if(r!==void 0||e.has(t))return r;const i=Promise.resolve(n());e.set(t,i);try{const o=await i;return e.set(t,o),o}catch(o){throw e.delete(t),o}}const Ze=4;async function pi(e,t,n,r,i=Be){const o=[...new Set(n)],s=D(r.minX>>4,Ze),a=D(r.minZ>>4,Ze),c=D(r.maxX>>4,Ze),l=D(r.maxZ>>4,Ze),u={};for(const d of o){const f=[];for(let g=a;g<=l;g++)for(let h=s;h<=c;h++){await i();const w=`poi-tile:${d}:${h},${g}`,b=await zn(e,w,async()=>(await t({x:h*Ze,z:g*Ze,sizeX:Ze,sizeZ:Ze},[d]))[d]??[]);b.length>0&&f.push(b)}u[d]=f.flat()}return u}async function ld(e,t,n,r,i,o,s,a=Be){const c=r*16,l=i*16,u=(r+o)*16-1,d=(i+s)*16-1;return pi(e,t,n,{minX:c,maxX:u,minZ:l,maxZ:d},a)}function ta(e,t){return e<t?-1:e>t?1:0}function _i(e){return{poiId:e.poiId,poi:e.poi,chunk:e.chunk,poiData:e.data}}function yi(e,t,n,r){const i=cd(e,t);return nd(e,n,r).filter(o=>i(e,o.data))}function na(e,t,n,r,i,o){return yi(e,t,n,r).filter(s=>Xf(i,o,s.coords[0],s.coords[2]))}function ud(e){const t=new Set,n=[];for(const r of[...e].sort((i,o)=>ta(i.poiId,o.poiId)))t.has(r.poiId)||(t.add(r.poiId),n.push(r));return n}const Io={[y.Overworld]:1,[y.Nether]:8,[y.End]:1};function fd(e,t){return Io[e]/Io[t]}const dd=4,gd=.6,md=2.25;function hd(e,t){const n=t.shape.kind==="square"?t.shape.inradius*2:t.shape.radius*2,r=Math.min(md,Math.max(gd,Math.sqrt(n/128)));return Math.round(e*r)}function ra(e,t,n){const r=fd(y.Overworld,n);return[Math.floor(e*r),Math.floor(t*r)]}const xe=16;function Zr(e){return e.mode==="biomes"?["biomes",e.getBiomesAt].join(":"):e.mode==="heights"?["heights",e.getHeightLevelAt,e.surfaceCheckType].join(":"):["biomesAndHeights",e.getBiomesAt,e.getHeightLevelAt,e.surfaceCheckType].join(":")}const or=Object.freeze({xQ:0,zQ:0}),ia=4096,pd=512,_d=256;function oa(e,t){const n=D((e.maxX>>2)-(e.minX>>2),t)+2,r=D((e.maxZ>>2)-(e.minZ>>2),t)+2;return n*r}function sr(e,t,n){return n&&oa(e,t)>pd?"tiles":"rect"}async function ar(e,t,n,r,i,o=Be,s=1,a=or,c="tiles"){const l=r.minX>>2,u=r.minZ>>2;if(l===r.maxX>>2&&u===r.maxZ>>2){const M=`biome-point:${n}:${Zr(i)}:${l},${u}`,P=await zn(e,M,()=>Me(t,n,l,u,1,1,1,i));return{biomes:P.biomes,heights:P.heights??null,xQ0:l,zQ0:u,xLen:1,zLen:1,stepQ:1}}if(c==="rect")return yd(e,t,n,r,i,o,s,a);const d=xe*s,f=D((r.minX>>2)-a.xQ,d),g=D((r.minZ>>2)-a.zQ,d),h=D((r.maxX>>2)-a.xQ,d),w=D((r.maxZ>>2)-a.zQ,d),b=h-f+1,x=w-g+1,C=f*d+a.xQ,I=g*d+a.zQ,V=b*xe,O=x*xe,E=`biome-tile:${n}:${Zr(i)}:s${s}:p${a.xQ},${a.zQ}`,A=[];for(let M=g;M<=w;M++)for(let P=f;P<=h;P++){const U=`${E}:${P},${M}`;await o(),A.push(zn(e,U,()=>Me(t,n,P*d+a.xQ,M*d+a.zQ,xe,xe,s,i)))}const z=await Promise.all(A),F=new Uint8Array(V*O),L=i.mode!=="biomes"?new Int32Array(V*O):null;let R=!1;for(let M=0;M<x;M++)for(let P=0;P<b;P++){const U=z[M*b+P];for(let J=0;J<xe;J++){const $=(M*xe+J)*V+P*xe,G=J*xe;for(let ee=0;ee<xe;ee++)F[$+ee]=U.biomes[G+ee];if(L)if(U.heights)for(let ee=0;ee<xe;ee++)L[$+ee]=U.heights[G+ee];else R=!0}}return{biomes:F,heights:R?null:L,xQ0:C,zQ0:I,xLen:V,zLen:O,stepQ:s}}async function yd(e,t,n,r,i,o,s,a){const c=r.minX>>2,l=r.minZ>>2,u=c-Fn(c-a.xQ,s),d=l-Fn(l-a.zQ,s),f=D((r.maxX>>2)-u,s)+1,g=D((r.maxZ>>2)-d,s)+1,h=`biome-rect:${n}:${Zr(i)}:s${s}:${u},${d}:${f}x${g}`,w=await zn(e,h,async()=>{const b=Math.max(1,Math.floor(ia/f));if(b>=g){await o();const V=Me(t,n,u,d,f,g,s,i);return{biomes:V.biomes,heights:V.heights??null}}const x=new Uint8Array(f*g),C=i.mode!=="biomes"?new Int32Array(f*g):null;let I=!1;for(let V=0;V<g;V+=b){await o();const O=Math.min(b,g-V),E=Me(t,n,u,d+V*s,f,O,s,i);x.set(E.biomes,V*f),C&&(E.heights?C.set(E.heights,V*f):I=!0)}return{biomes:x,heights:I?null:C}});return{biomes:w.biomes,heights:w.heights,xQ0:u,zQ0:d,xLen:f,zLen:g,stepQ:s}}const Vo=4,wd=4;function Vt(e,t,n){return t===1?or:wi(e,n)}function sa(e,t,n,r=1,i="tiles"){if(e[t]instanceof si)return null;if(i==="rect")return oa(n,r)>=_d?Vo*r:null;const o=Vo*r,s=ko(n,r,Vt(n,r,r)),a=ko(n,o,Vt(n,r,o));return s>=wd*a?o:null}function bd(e,t){return t===y.End?!0:e[t]instanceof qe}function cn(e,t,n){const r=(n??dd)/4;return r===1?1:bd(e,t)?r:1}function wi(e,t){return{xQ:Fn(e.centerX>>2,t),zQ:Fn(e.centerZ>>2,t)}}function ko(e,t,n){const r=xe*t,i=D((e.maxX>>2)-n.xQ,r)-D((e.minX>>2)-n.xQ,r)+1,o=D((e.maxZ>>2)-n.zQ,r)-D((e.minZ>>2)-n.zQ,r)+1;return i*o}const Jr=["depth0","bottom","caveDepth"];function bi(e,t){return t===y.Overworld?ai(e)?Jr:["depth0"]:t===y.Nether?Ss(e)?Jr:["depth0"]:["depth0"]}function aa(e){switch(e.kind){case"surface":return{mode:"biomes",getBiomesAt:"depth0"};case"underground":return{mode:"biomes",getBiomesAt:"caveDepth"};case"fixed":return{mode:"biomes",getBiomesAt:e.y}}}function ca(e){return{mode:"biomes",getBiomesAt:e}}function vd(e){return Jr.includes(e)}function Oo(e,t,n,r,i){const{biomes:o}=Me(e,t,n>>2,r>>2,1,1,1,{mode:"biomes",getBiomesAt:i});return o[0]}async function Sd(e,t,n,r,i,o,s,a,c,l,u=Be){const d=await pi(l,t,[s.type],o,u),f=[],g=na(s.type,s.variantId,d[s.type]??[],n,i,o);if(g.length<a)return Zt;if(g.sort((h,w)=>ta(h.poiId,w.poiId)),c!==void 0){const h=Math.max(a,Mo);for(const w of g)if(await u(),la(e,n,r,s.type,w.coords,[c])&&(f.push(w),f.length>=h))break}else f.push(...g);return f.length<a?Zt:{passed:!0,witnessPoiIds:f.slice(0,a).map(h=>h.poiId),pois:f.slice(0,Mo).map(_i),clusters:[]}}const Mo=100,xd={surface:"depth0",underground:"caveDepth",bottom:"bottom"};function la(e,t,n,r,i,o){const[s,a,c]=i;if(a!=null)return o.includes(Oo(e,n,s,c,a));const l=nt[r].biomeScanHeights??["surface"];let d=bi(t,n).filter(f=>l.some(g=>xd[g]===f));return d.length===0&&(d=["depth0"]),d.some(f=>o.includes(Oo(e,n,s,c,f)))}function Cd(e,t){if(e.length===0)return[0,null,0];const n=e.every(s=>s[1]!=null),r=t&&n?3:2,i=e.map(s=>r===3?[s[0],s[1],s[2]]:[s[0],s[2]]),o=Td(i,r);return r===3?[o.center[0],o.center[1],o.center[2]]:[o.center[0],null,o.center[1]]}function Td(e,t){return Xr(Bd(e),e.length,[],t)}function Xr(e,t,n,r){if(t===0||n.length===r+1)return Ed(n,r);const i=e[t-1],o=Xr(e,t-1,n,r);return ua(o,i)?o:Xr(e,t-1,[...n,i],r)}function Bd(e){return[...e].sort((t,n)=>Ro(t)-Ro(n)||kd(t,n))}function Ed(e,t){if(e.length===0)return{center:Array(t).fill(0),r2:-1};let n=null;const r=1<<e.length;for(let i=1;i<r;i++){const o=e.filter((a,c)=>(i&1<<c)!==0),s=Id(o,t);s&&e.every(a=>ua(s,a))&&(n=n==null||s.r2<n.r2-mi(n.r2)?s:n)}return n??{center:[...e[0]],r2:0}}function Id(e,t){if(e.length===1)return{center:[...e[0]],r2:0};const n=e[0],r=e.slice(1).map(c=>c.map((l,u)=>l-n[u])),i=r.map(c=>r.map(l=>2*Ao(c,l))),o=r.map(c=>Ao(c,c)),s=Vd(i,o);if(!s)return null;const a=[...n];for(let c=0;c<r.length;c++)for(let l=0;l<t;l++)a[l]+=s[c]*r[c][l];return{center:a,r2:fa(a,n)}}function Vd(e,t){const n=t.length,r=e.map((i,o)=>[...i,t[o]]);for(let i=0;i<n;i++){let o=i;for(let a=i+1;a<n;a++)Math.abs(r[a][i])>Math.abs(r[o][i])&&(o=a);if(Math.abs(r[o][i])<=qs)return null;[r[i],r[o]]=[r[o],r[i]];const s=r[i][i];for(let a=i;a<=n;a++)r[i][a]/=s;for(let a=0;a<n;a++){if(a===i)continue;const c=r[a][i];for(let l=i;l<=n;l++)r[a][l]-=c*r[i][l]}}return r.map(i=>i[n])}function ua(e,t){return e.r2>=0&&fa(e.center,t)<=e.r2+mi(e.r2)}function fa(e,t){let n=0;for(let r=0;r<e.length;r++){const i=e[r]-t[r];n+=i*i}return n}function Ao(e,t){let n=0;for(let r=0;r<e.length;r++)n+=e[r]*t[r];return n}function Ro(e){let t=2166136261;for(const n of e)t=Math.imul(t^Math.round(n*1024),16777619);return t>>>0}function kd(e,t){for(let n=0;n<e.length;n++)if(e[n]!==t[n])return e[n]-t[n];return e.length-t.length}async function Od(e,t,n,r,i,o,s=Be){const a=await da(e,t,n,r,i,o,s,1),[c]=a;return c==null?Zt:{passed:!0,witnessPoiIds:c.witnesses.map(l=>l.poiId),pois:c.witnesses.map(_i),clusters:[{x:c.coords[0],z:c.coords[2],y:c.coords[1]??void 0,radius:i.radius.meters,members:i.members.map(l=>l.poi),witnessCount:c.witnesses.length}]}}async function Md(e,t,n,r,i,o,s,a,c=Be){const l=i*16,u=o*16,d=(i+s)*16-1,f=(o+a)*16-1,g=Math.max(0,r.radius.meters),h={centerX:(l+d)/2,centerZ:(u+f)/2,minX:Math.floor(l-g),maxX:Math.ceil(d+g),minZ:Math.floor(u-g),maxZ:Math.ceil(f+g)},w={shape:{kind:"square",inradius:(h.maxX-h.minX+1)/2}};return(await da(t,n,w,h,r,e,c)).filter(x=>{const C=Math.floor(x.coords[0]),I=Math.floor(x.coords[2]);return C>=l&&C<=d&&I>=u&&I<=f})}async function da(e,t,n,r,i,o,s,a){if(i.members.length===0)return[];const c=i.members.map(E=>E.poi.type),l=await pi(o,e,c,r,s),u=i.members.map(E=>na(E.poi.type,E.poi.variantId,l[E.poi.type]??[],t,n,r));for(let E=0;E<i.members.length;E++)if(u[E].length<i.members[E].minAmount)return[];const d=[].concat(...u).map(E=>E.coords),{meters:f,threeD:g}=i.radius,h=f*f,w=g&&d.every(E=>E[1]!=null),b=(E,A)=>Ys(E,A,w)<=h+mi(h),x=[...d];let C=0;if(w)for(let E=0;E<d.length;E++){const A=d[E];for(let z=E+1;z<d.length;z++){++C%250===0&&await s();const F=d[z],L=A[0]-F[0],R=A[2]-F[2],M=A[1]-F[1];if(L*L+R*R+M*M>4*h)continue;const P=(A[1]+F[1])/2;x.push([(A[0]+F[0])/2,P,(A[2]+F[2])/2]);for(let U=z+1;U<d.length;U++){++C%250===0&&await s();const J=d[U];zf(x,A,F,J,h)}}}else for(let E=0;E<d.length;E++)for(let A=E+1;A<d.length;A++)++C%250===0&&await s(),Ff(x,d[E],d[A],h);const I=[],V=[],O=new Set;for(const E of x){++C%50===0&&await s();const A=[];let z=!0;for(let U=0;U<i.members.length;U++){const J=i.members[U].minAmount;let $=0;for(const G of u[U])b(E,G.coords)&&(A.push(G),$++);if($<J){z=!1;break}}if(!z)continue;const F=ud(A),L=F.map(U=>U.poiId),R=L.join("|");if(O.has(R))continue;O.add(R);const M=Ad(F,w),P={coords:M.coords,maxDistance:M.maxDistance,witnesses:F};if(Rd(I,V,P,L)&&a!==void 0&&I.length>=a)return I}return I}function Ad(e,t){const n=Cd(e.map(i=>i.coords),t);let r=0;for(const i of e)r=Math.max(r,Ys(i.coords,n,t));return{coords:n,maxDistance:Math.sqrt(r)}}function Rd(e,t,n,r){const i=new Set(r);for(const o of t)if(Fo(i,o))return!1;for(let o=e.length-1;o>=0;o--)Fo(t[o],i)&&(e.splice(o,1),t.splice(o,1));return e.push(n),t.push(i),!0}function Fo(e,t){for(const n of e)if(!t.has(n))return!1;return!0}async function Fd(e,t,n,r,i,o,s,a,c,l,u=Be,d=!1){const f=Ld(e,t,n,o,s,c),g=new Set(s),h=cn(e,n,a),w=sr(i,h,d),b=sa(e,n,i,h,w);if(b!==null){const x=await zo(e,n,r,i,f,o,g,l,u,b,Vt(i,h,b),w,!1);switch(o){case"includes-all":case"includes-any":if(x)return!0;break;case"excludes-all":case"limited-to":if(!x)return!1;break}}return zo(e,n,r,i,f,o,g,l,u,h,Vt(i,h,h),w,!0)}async function zo(e,t,n,r,i,o,s,a,c,l,u,d,f){const g=new Set;let h=!0;for(const w of i){const b=await ar(a,e,t,r,w.options,c,l,u,d);switch(w.gateLand?await Nd(e,t,n,r,b,o,s,g,c,f)&&(h=!1):await an(b,n,r,c,x=>{const C=b.biomes[x];s.has(C)?g.add(C):o==="limited-to"&&(h=!1)}),o){case"includes-all":if(g.size===s.size)return!0;break;case"includes-any":if(g.size>0)return!0;break;case"excludes-all":if(g.size>0)return!1;break;case"limited-to":if(!h)return!1;break}}switch(o){case"includes-all":return g.size===s.size;case"includes-any":return g.size>0;case"excludes-all":return g.size===0;case"limited-to":return h&&(!f||g.size>0)}}async function zd(e,t,n,r,i,o,s,a,c,l=Be,u=!1){const d=bi(t,n),f=cn(e,n,a),g=sr(i,f,u),h=sa(e,n,i,f,g);if(h!==null){const b=await Lo(e,n,r,i,d,s,c,l,h,Vt(i,f,h),g);switch(o){case"at-least":if(b.size>=s)return!0;break;case"at-most":case"exactly":if(b.size>s)return!1;break}}const w=await Lo(e,n,r,i,d,s,c,l,f,Vt(i,f,f),g);switch(o){case"at-least":return w.size>=s;case"at-most":return w.size<=s;case"exactly":return w.size===s}}async function Lo(e,t,n,r,i,o,s,a,c,l,u){const d=new Set;for(const f of i){const g=await ar(s,e,t,r,ca(f),a,c,l,u);if(await an(g,n,r,a,h=>{d.add(g.biomes[h])}),d.size>o)return d}return d}function Ld(e,t,n,r,i,o){if(o!==void 0&&n===y.Overworld&&e[n]instanceof qe){const s=o.kind==="surface"&&o.surfaceKind==="land";return[{options:aa(o),gateLand:s}]}return Pd(t,n,r,i).map(s=>({options:ca(s),gateLand:!1}))}function Pd(e,t,n,r){const i=bi(e,t);if(n!=="includes-all"&&n!=="includes-any")return i;const o=new Set;for(const s of r){const a=pc(s);vd(a)&&o.add(a)}return i.filter(s=>o.has(s))}async function Nd(e,t,n,r,i,o,s,a,c,l){const u=[];let d=i.xLen,f=-1,g=-1;if(await an(i,n,r,c,I=>{if(!(o==="limited-to"?l||!s.has(i.biomes[I]):s.has(i.biomes[I])))return;u.push(I);const O=I%i.xLen,E=Math.floor(I/i.xLen);O<d&&(d=O),O>f&&(f=O),E>g&&(g=E)}),u.length===0)return!1;const h=f-d+1,w=Math.max(1,Math.floor(ia/h));let b=0,x=0,C=null;for(const I of u){const V=I%i.xLen,O=Math.floor(I/i.xLen);if(O>=x&&(await c(),b=O,x=Math.min(g+1,O+w),{heights:C}=Me(e,t,i.xQ0+d*i.stepQ,i.zQ0+b*i.stepQ,h,x-b,i.stepQ,{mode:"heights",getHeightLevelAt:"oceanFloor",surfaceCheckType:"fastApproximate"})),C!==null&&C[(O-b)*h+(V-d)]<hi)continue;const E=i.biomes[I];if(s.has(E)){if(a.add(E),o==="includes-all"){if(a.size===s.size)break}else if(o!=="limited-to")break}else return!0}return!1}async function Hd(e,t,n,r,i,o,s,a,c=Be,l=!1){if(i===void 0&&o===void 0)return!0;const u=cn(e,t,s),d=await ar(a,e,t,r,{mode:"heights",getHeightLevelAt:"oceanFloor",surfaceCheckType:"fastApproximate"},c,u,u>1?wi(r,u):or,sr(r,u,l));if(!d.heights)return!0;const f=[];let g=1/0,h=-1/0;if(await an(d,n,r,c,x=>{const C=d.heights[x];f.push(C),C<g&&(g=C),C>h&&(h=C)}),f.length===0)return!0;const w=ga(f,g,h),b=g+$r(w,Math.floor(f.length/2));return!(i!==void 0&&b<i||o!==void 0&&b>o)}async function Dd(e,t,n,r,i,o,s,a,c=Be,l=!1){const u=cn(e,t,s),d=await ar(a,e,t,r,{mode:"heights",getHeightLevelAt:"oceanFloor",surfaceCheckType:"fastApproximate"},c,u,u>1?wi(r,u):or,sr(r,u,l));if(!d.heights)return!0;const f=[],g=new Uint8Array(d.heights.length);let h=1/0,w=-1/0;if(await an(d,n,r,c,R=>{const M=d.heights[R];f.push(M),g[R]=1,M<h&&(h=M),M>w&&(w=M)}),f.length===0)return!0;const b=ga(f,h,w),x=Math.min(f.length-1,Math.max(0,Math.floor(i.lowerPercentile/100*f.length))),C=Math.min(f.length-1,Math.max(0,Math.ceil(i.upperPercentile/100*f.length)-1)),I=h+$r(b,x);if(h+$r(b,C)-I>hd(i.maxBlocksAt128,n))return!1;const O=d.heights,E=new Int32Array(w-h+1);let A=0;for(let R=0;R<d.zLen;R++){await c();for(let M=0;M<d.xLen;M++){const P=R*d.xLen+M;g[P]&&(M+1<d.xLen&&g[P+1]&&(E[Math.abs(O[P+1]-O[P])]++,A++),R+1<d.zLen&&g[P+d.xLen]&&(E[Math.abs(O[P+d.xLen]-O[P])]++,A++))}}if(A===0)return!0;const z=Math.max(1,Math.ceil(A*.95));let F=0,L=z;for(let R=0;R<E.length&&L>0;R++){const M=Math.min(E[R],L);F+=R*M,L-=M}return F/(4*u)/z<=o}function ga(e,t,n){const r=new Int32Array(n-t+1);for(const i of e)r[i-t]++;return r}function $r(e,t){let n=0;for(let r=0;r<e.length;r++)if(n+=e[r],n>t)return r;return e.length-1}async function ma(e,t,n,r,i,o,s,a,c=Be,l=!1){const u=[],d=[],f=[];for(const g of s){const h=Jf(g,i,o);for(const w of g.conditions){const b=await Wd(e,t,n,r,g,h,w,a,c,l);if(!b.passed)return Zt;u.push(...b.witnessPoiIds),d.push(...b.pois),f.push(...b.clusters)}}return{passed:!0,witnessPoiIds:u,pois:d,clusters:f}}async function Wd(e,t,n,r,i,o,s,a,c,l){switch(s.kind){case"poi-presence":return Sd(e,t,n,r,i,o,s.poi,s.minAmount,s.biomeAtPos,a,c);case"poi-cluster":return Od(t,n,i,o,s,a,c);case"biome-filter":return yn(await Fd(e,n,r,i,o,s.mode,s.biomes,s.sampleGrid,s.scanHeight,a,c,l));case"biome-variance":return yn(await zd(e,n,r,i,o,s.comparator,s.count,s.sampleGrid,a,c,l));case"terrain-height":return yn(await Hd(e,r,i,o,s.minY,s.maxY,s.sampleGrid,a,c,l));case"flatness":return yn(await Dd(e,r,i,o,s.range,s.maxAverageSlope,s.sampleGrid,a,c,l))}}function yn(e){return e?Zf:Zt}const Gd=400,vi=1,fe=10,Ln=4,oe=4,se=2,jd=255;function Si(e){const t=e*Ln;if(t%se!==0)throw new Error(`Biome patch tile quart length ${t} must be divisible by stride ${se}`);return t/se}function Pn(e,t,n=1){const r=Math.max(vi,t),i=n*oe;return e*i*i>=r}function xi(e,t){const n=e.qStride*oe;return{blocks:e.cellCount*n*n,kind:t}}function Ud(e,t){return{blocks:(e.maxX-e.minX+1)*(e.maxZ-e.minZ+1),kind:t}}function Zd(e){const t=Si(e);return fe*fe*t*t}function ha(e){return{minX:e.minQX*oe,maxX:e.maxQX*oe+e.qStride*oe-1,minZ:e.minQZ*oe,maxZ:e.maxQZ*oe+e.qStride*oe-1}}function pa(e){const t=e.qStride*oe/2;return{worldX:Math.round(e.sumQX/e.cellCount*oe+t),worldZ:Math.round(e.sumQZ/e.cellCount*oe+t)}}function _a(e){return{worldX:Math.round((e.minX+e.maxX)/2),worldZ:Math.round((e.minZ+e.maxZ)/2)}}function ya(e,t){const n=D(e.scanTileX,fe)*fe,r=D(e.scanTileZ,fe)*fe,i=n*t*16,o=r*t*16,s=fe*t*16;return{minX:i,maxX:i+s-1,minZ:o,maxZ:o+s-1}}function Ci(e){const t=new Uint8Array(Math.max(...e)+1);for(const n of e)t[n]=1;return t}function Jd(e){return e.scanHeight.kind==="surface"&&e.scanHeight.surfaceKind==="land"}function Xd(e,t,n,r,i){return`biome-patch-tile:${Lr(e)}:${t.dimension}:${r}:${n}:stride=${se}:${i}:`}function Ti(e,t,n,r,i,o,s,a){const c=a+r+","+i,l=Xa(c);if(l)return l;const u=D(r,o),d=D(i,o),f=Si(o),g=r*Ln,h=i*Ln,w=Jd(n.anchor),{biomes:b}=Me(t,n.dimension,g,h,f,f,se,aa(n.anchor.scanHeight));let x=!1,C=b.length>0,I=f,V=-1,O=f,E=-1;for(let z=0;z<b.length;z++){const F=s[b[z]]===1;if(x=x||F,C=C&&F,w&&F){const L=z%f,R=Math.floor(z/f);L<I&&(I=L),L>V&&(V=L),R<O&&(O=R),R>E&&(E=R)}}if(w&&x){const z=V-I+1,F=E-O+1,{heights:L}=Me(t,n.dimension,g+I*se,h+O*se,z,F,se,{mode:"heights",getHeightLevelAt:"oceanFloor",surfaceCheckType:"fastApproximate"});if(L){x=!1;let R=!1;for(let M=0;M<F;M++)for(let P=0;P<z;P++){const U=(O+M)*f+(I+P);s[b[U]]===1&&(L[M*z+P]<hi?(b[U]=jd,R=!0):x=!0)}C=C&&!R}}const A={chunkX:r,chunkZ:i,scanTileX:u,scanTileZ:d,qX0:g,qZ0:h,qLen:f,qStride:se,biomes:b,anyTarget:x,allTarget:C};return $a(c,A),A}async function $d(e,t,n,r,i,o,s,a){const c=D(r.scanTileX,fe)*fe,l=D(r.scanTileZ,fe)*fe;for(let u=0;u<fe;u++)for(let d=0;d<fe;d++)if(await a(),!Ti(e,t,n,(c+d)*i,(l+u)*i,i,o,s).allTarget)return!1;return!0}const Qd=2**26;function Kd(e,t,n,r){const i=e.qLen,o=[n];let s=0;r[n]=1;let a=0,c=0,l=0,u=1/0,d=-1/0,f=1/0,g=-1/0,h=!1;for(;s<o.length;){const w=o[s++],b=w%i,x=Math.floor(w/i),C=e.qX0+b*e.qStride,I=e.qZ0+x*e.qStride;a++,c+=C,l+=I,u=Math.min(u,C),d=Math.max(d,C),f=Math.min(f,I),g=Math.max(g,I),h=h||b===0||x===0||b===i-1||x===i-1;for(let V=-1;V<=1;V++)for(let O=-1;O<=1;O++){if(O===0&&V===0)continue;const E=b+O,A=x+V;E<0||E>=i||A<0||A>=i||qd(o,r,e,t,A*i+E)}}return{qStride:e.qStride,seedQX:e.qX0+n%i*e.qStride,seedQZ:e.qZ0+Math.floor(n/i)*e.qStride,cellCount:a,sumQX:c,sumQZ:l,minQX:u,maxQX:d,minQZ:f,maxQZ:g,touchesEdge:h}}function qd(e,t,n,r,i){t[i]||r[n.biomes[i]]!==1||(t[i]=1,e.push(i))}async function Yd(e,t,n,r,i,o,s,a,c,l){const u=Si(r),d=r*Ln,f=new Map,g=new Set,h=[],w=[];let b=0,x=0,C=0,I=0,V=1/0,O=-1/0,E=1/0,A=-1/0,z=null;const F=()=>({exceededMaxTiles:!0,filledArea:xi({qStride:se,cellCount:z??x},"lower-bound")});let L=null,R=null,M=0,P=0;const U=(J,$)=>{let G=L;if(G===null||J<G.qX0||J>=G.qX0+P||$<G.qZ0||$>=G.qZ0+P){const de=D(J,d),ie=D($,d);G=Ti(e,t,n,de*r,ie*r,r,i,c),L=G,P=G.qLen*G.qStride,M=de*Qd+ie,R=f.get(M)??null}const ee=Math.floor((J-G.qX0)/G.qStride),te=Math.floor(($-G.qZ0)/G.qStride)*u+ee;if(i[G.biomes[te]]!==1)return!0;let Q=R;return Q===null&&(Q=new Uint8Array(G.biomes.length),f.set(M,Q),R=Q),Q[te]?!0:(Q[te]=1,g.add(M),g.size>Gd&&Pn(x+1,a,se)?(z=x+1,!1):(h.push(J),w.push($),x++,C+=J,I+=$,V=Math.min(V,J),O=Math.max(O,J),E=Math.min(E,$),A=Math.max(A,$),!0))};if(!U(o,s))return F();for(;b<h.length;){b%50===0&&await l();const J=h[b],$=w[b];b++;for(let G=-1;G<=1;G++)for(let ee=-1;ee<=1;ee++)if(!(ee===0&&G===0)&&!U(J+ee*se,$+G*se))return F()}return{exceededMaxTiles:!1,qStride:se,cellCount:x,sumQX:C,sumQZ:I,minQX:V,maxQX:O,minQZ:E,maxQZ:A}}function wa(e,t,n,r){return["biome-patch",e.dimension,n,t,"finite",`stride=${r.qStride}`,r.minQX,r.minQZ,r.maxQX,r.maxQZ,r.cellCount].join(":")}function ba(e,t,n,r){const i=D(t.scanTileX,fe),o=D(t.scanTileZ,fe);return["biome-patch",e.dimension,r,n,"split",`stride=${se}`,i,o].join(":")}function eg(e){return[...new Set(e)].sort((t,n)=>t-n).join(",")}function tg(e){return e.kind==="fixed"?`fixed:${e.y}`:e.kind==="surface"?`surface:${e.surfaceKind}`:e.kind}async function ng(e,t,n,r,i,o,s,a){const c=n.anchor;if(c.biomes.length===0)return[];const l=Ci(c.biomes),u=eg(c.biomes),d=tg(c.scanHeight),f=Xd(t,n,u,d,o),g=Ti(s,e,n,r,i,o,l,f);if(!g.anyTarget)return[];const h=[],w=c.minPatchSize??vi;if(g.allTarget&&Pn(Zd(o),w,se)&&await $d(s,e,n,g,o,l,f,a)){const x=ya(g,o);return[Po(n,{dedupeKey:ba(n,g,u,d),center:_a(x),bounds:x,filledArea:Ud(x,"lower-bound"),split:!0})]}const b=new Uint8Array(g.biomes.length);for(let x=0;x<g.biomes.length;x++){if(x%1e3===0&&await a(),b[x]||l[g.biomes[x]]!==1)continue;const C=Kd(g,l,x,b),I=C.touchesEdge?await rg(s,e,n,g,o,l,u,d,f,C,a):Pn(C.cellCount,w,C.qStride)?{dedupeKey:wa(n,u,d,{qStride:C.qStride,cellCount:C.cellCount,minQX:C.minQX,maxQX:C.maxQX,minQZ:C.minQZ,maxQZ:C.maxQZ}),center:pa(C),bounds:ha(C),filledArea:xi(C,"exact"),split:!1}:null;I&&h.push(Po(n,I))}return h}async function rg(e,t,n,r,i,o,s,a,c,l,u){const d=n.anchor.minPatchSize??vi,f=await Yd(e,t,n,i,o,l.seedQX,l.seedQZ,d,c,u);if(f.exceededMaxTiles){const g=ya(r,i);return{dedupeKey:ba(n,r,s,a),center:_a(g),bounds:g,filledArea:f.filledArea,split:!0}}return Pn(f.cellCount,d,f.qStride)?{dedupeKey:wa(n,s,a,f),center:pa(f),bounds:ha(f),filledArea:xi(f,"exact"),split:!1}:null}function Po(e,t){const{worldX:n,worldZ:r}=t.center;return{worldX:n,worldZ:r,chunk:[n>>4,r>>4],data:{type:"biome-patch",biomes:e.anchor.biomes,scanHeight:e.anchor.scanHeight,minPatchSize:e.anchor.minPatchSize,bounds:t.bounds,filledArea:t.filledArea,split:t.split},dedupeKey:t.dedupeKey,anchorPois:[],regionPois:[]}}const ig=new Set([m.SlimeChunk,m.Dungeon,m.Fossil,m.FossilNether,m.AmethystGeode,m.Cave,m.LavaPool]);function og(e){return e.anchor.kind==="poi"&&ig.has(e.anchor.poi.type)}async function sg(e,t,n,r,i,o){let a=0;const c=es(o);try{const l=Rt(e),{poiFinder:u,providers:d}=Lt(l),f=new Map,g=await ag(d,u,l,t,n,r,i,f,c);if(t.regions.length===0)return a=g.length,g;const h=og(t),w=[];for(const b of g){await c();const x=await ma(d,u,l,t.dimension,b.worldX,b.worldZ,t.regions,f,c,h);x.passed&&(b.regionPois=x.pois.map(C=>C.poiId),w.push(b))}return a=w.length,w}catch(l){if(l instanceof Et)return[];throw l}}async function ag(e,t,n,r,i,o,s,a,c){switch(r.anchor.kind){case"biome-patch":return ng(e,n,r,i,o,s,a,c);case"cluster":return(await Md(a,t,n,r.anchor,i,o,s,s,c)).map(u=>{const d=u.witnesses.map(f=>f.poiId);return{worldX:u.coords[0],worldY:u.coords[1]??void 0,worldZ:u.coords[2],chunk:[u.coords[0]>>4,u.coords[2]>>4],data:{type:"cluster",maxDistance:u.maxDistance},dedupeKey:`witness:${d.join("|")}`,anchorPois:d,regionPois:[]}});case"poi":{const l=r.anchor.poi,d=(await ld(a,t,[l.type],i,o,s,s,c))[l.type]?.filter(g=>g[0]>=i&&g[0]<i+s&&g[1]>=o&&g[1]<o+s);if(!d)return[];const f=[];for(const g of yi(l.type,l.variantId,d,n))r.anchor.biomesAtPos!==void 0&&(await c(),!la(e,n,r.dimension,l.type,g.coords,r.anchor.biomesAtPos))||f.push({worldX:g.coords[0],worldZ:g.coords[2],chunk:g.chunk,data:{type:"poi",poiData:g.data},anchorPois:[g.poiId],regionPois:[]});return f}}}const No=16,Re=16,cg=2**26,Ho=Ci(Fr.IS_OCEAN),lg=[...Fr.IS_BEACH,...Fr.IS_RIVER];async function ug(e,t,n,r,i,o,s){const a=cn(e,t,i.sampleGrid),c=n>>2,l=r>>2,u=a*a,d=i.minChunks*No,f=i.maxChunks*No,g=Re*a,h=`island-tile:${t}:s${a}:a${c},${l}:`,w=new Uint32Array(256),b=new Map,x=[],C=[];let I=0,V=0,O=1/0,E=-1/0,A=1/0,z=-1/0,F=1/0,L=1/0,R=new Uint8Array(0),M=null,P=0;const U=(te,Q)=>{F=te,L=Q,P=te*cg+Q;const de=h+te+","+Q;let ie=o.get(de);ie===void 0&&({biomes:ie}=Me(e,t,c+te*g,l+Q*g,Re,Re,a,{mode:"biomes",getBiomesAt:"depth0"}),o.set(de,ie)),R=ie,M=b.get(P)??null},J=(te,Q)=>{const de=D(te,Re),ie=D(Q,Re);(de!==F||ie!==L)&&U(de,ie);const va=te-de*Re,lr=(Q-ie*Re)*Re+va,Bi=R[lr];if(Ho[Bi]===1)return!0;let St=M;return St===null&&(St=new Uint8Array(Re*Re),b.set(P,St),M=St),St[lr]?!0:(St[lr]=1,V+=u,V>f?!1:(w[Bi]++,te<O&&(O=te),te>E&&(E=te),Q<A&&(A=Q),Q>z&&(z=Q),x.push(te),C.push(Q),!0))},{biomes:$}=Me(e,t,c,l,1,1,a,{mode:"biomes",getBiomesAt:"depth0"});if(Ho[$[0]]===1||(U(0,0),!J(0,0)))return null;for(;I<x.length;){I%50===0&&await s();const te=x[I],Q=C[I];I++;for(let de=-1;de<=1;de++)for(let ie=-1;ie<=1;ie++)if(!(ie===0&&de===0)&&!J(te+ie,Q+de))return null}if(V<d||!fg(i,w))return null;const G=a*oe,ee=c*oe,cr=l*oe;return{bounds:{minX:ee+O*G,maxX:ee+(E+1)*G-1,minZ:cr+A*G,maxZ:cr+(z+1)*G-1},filledArea:{blocks:V*oe*oe,kind:a===1?"exact":"estimate"}}}function fg(e,t){switch(e.mode){case"any":return!0;case"includes-any":return e.biomes.some(n=>t[n]>0);case"includes-all":return e.biomes.every(n=>t[n]>0);case"excludes-all":return!e.biomes.some(n=>t[n]>0);case"limited-to":{const n=Ci([...e.biomes,...lg]);for(let r=0;r<t.length;r++)if(t[r]>0&&n[r]!==1)return!1;return e.biomes.some(r=>t[r]>0)}}}function dg(){const e=Math.floor(Math.random()*4294967296),t=Math.floor(Math.random()*4294967296);return k.fromBits(t,e).toString()}const Do=1e4;async function gg(e,t,n,r,i,o){if(t.kind==="random"&&!(o!==void 0&&o>0&&o<=Do))throw new Error(`findSeeds: a random seed source requires a batch budget in (0, ${Do}] ms, got ${o}`);const s=performance.now(),a=mg(t),c=es(r),l=async()=>{if(i!==void 0&&Date.now()>=i)throw new Et;if(await c(),i!==void 0&&Date.now()>=i)throw new Et},u=[];let d=0;const f=()=>o===void 0||performance.now()-s<o;try{for(let g=a();g!==null&&f();g=a()){await l();const h=await hg(e,g,n,l);d++,h!==null&&u.push(h)}}catch(g){if(!(g instanceof Et))throw g}return{matches:u,scannedCount:d}}function mg(e){switch(e.kind){case"random":{const{use32Bit:t}=e;return()=>{const n=dg();return t?`${k.fromString(n).toInt()}`:n}}case"list":{let t=0;return()=>t<e.seeds.length?e.seeds[t++]:null}}}async function hg(e,t,n,r){const i=Rt({...e,seed:t}),{providers:o,poiFinder:s}=Lt(i),a=new Map,c=await bg(s,i,n),l={providers:o,poiFinder:s,world:i,cache:a,checkpoint:r,anchorX:c.x,anchorZ:c.z,regionPois:{},clusters:{},islands:{}};for(const[u,d]of Object.entries(n.anchorConditions)){if(d.length===0)continue;const f=d.filter(pg);if(f.length>0&&!await Wo(l,u,[_g(f)]))return null;for(const g of d)if(g.kind==="anchor-island"&&!await wg(l,u,g))return null}for(const[u,d]of Object.entries(n.regions))if(d.length!==0&&!await Wo(l,u,d))return null;return{seed:t,anchorX:c.x,anchorZ:c.z,anchorPois:c.pois,regionPois:l.regionPois,clusters:l.clusters,islands:l.islands}}async function Wo(e,t,n){const[r,i]=ra(e.anchorX,e.anchorZ,t),o=await ma(e.providers,e.poiFinder,e.world,t,r,i,n,e.cache,e.checkpoint,!1);return o.passed?(o.pois.length>0&&(e.regionPois[t]=[...e.regionPois[t]??[],...o.pois]),o.clusters.length>0&&(e.clusters[t]=[...e.clusters[t]??[],...o.clusters]),!0):!1}function pg(e){return e.kind!=="anchor-island"}function _g(e){return{shape:{kind:"square",inradius:0},conditions:e.map(yg)}}function yg(e){switch(e.kind){case"anchor-biome":return{kind:"biome-filter",mode:e.mode==="in"?"includes-any":"excludes-all",biomes:e.biomes};case"anchor-terrain-height":return{kind:"terrain-height",minY:e.minY,maxY:e.maxY}}}async function wg(e,t,n){const[r,i]=ra(e.anchorX,e.anchorZ,t),o=await ug(e.providers,t,r,i,n,e.cache,e.checkpoint);return o===null?!1:(e.islands[t]=[...e.islands[t]??[],o],!0)}async function bg(e,t,n){switch(n.anchor.kind){case"origin":return{x:0,z:0,pois:[]};case"custom":return{x:n.anchor.x,z:n.anchor.z,pois:[]};case"spawn":{const r=Ks(m.Spawn,t);if(r===null)throw new Error("spawn anchor: expected a finite generation area");const i=(await e(r,[m.Spawn]))[m.Spawn]??[],o=yi(m.Spawn,void 0,i,t)[0];if(o==null)throw new Error("spawn anchor: unsupported world");return{x:o.coords[0],z:o.coords[2],pois:[_i(o)]}}}}async function vg(e,t){if(t.anchor.kind!=="poi")return{kind:"unbounded"};const n=Rt(e),r=t.anchor.poi.type,i=Ks(r,n);if(i===null)return{kind:"unbounded"};const{poiFinder:o}=Lt(n),s=(await o(i,[r]))[r]??[],a=new Set,c=[];for(const l of s){const u=`${l[0]},${l[1]}`;a.has(u)||(a.add(u),c.push([l[0],l[1]]))}return{kind:"finite",chunks:c}}function Sg(e){ja(e),Qa()}async function xg(){await Wa()}self.addEventListener("unhandledrejection",e=>{throw e.reason});var Cg=Object.freeze({__proto__:null,cancelTask:Sg,findSeeds:gg,getAnchorDomain:vg,getBiomeTileData:Nf,getNoiseBiomeYColumnOverworld:jf,getPois:Uf,initWorker:xg,scanTile:sg,setSharedContextCallback:Rf});Qr(Cg);
/*! Chunk Base (c) Alexander Gundermann - https://www.chunkbase.com - unauthorized copying prohibited */
//# chunkId=019fb98d-ff79-7831-a0b6-94310238695c
