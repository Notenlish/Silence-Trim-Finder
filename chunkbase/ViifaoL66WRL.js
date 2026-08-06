(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019d3f2c-0e96-71e1-89ac-74d765f91dc6";
    }
  } catch (e) {}
})();
var L = null;
try {
  L = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
} catch {}
function f(i, t, h) {
  this.low = i | 0;
  this.high = t | 0;
  this.unsigned = !!h;
}
f.prototype.__isLong__;
Object.defineProperty(f.prototype, "__isLong__", {
  value: true
});
function c(i) {
  return (i && i.__isLong__) === true;
}
function M(i) {
  var t = Math.clz32(i & -i);
  if (i) {
    return 31 - t;
  } else {
    return t;
  }
}
f.isLong = c;
var W = {};
var R = {};
function T(i, t) {
  var h;
  var e;
  var g;
  if (t) {
    i >>>= 0;
    if ((g = i >= 0 && i < 256) && (e = R[i], e)) {
      return e;
    } else {
      h = r(i, 0, true);
      if (g) {
        R[i] = h;
      }
      return h;
    }
  } else {
    i |= 0;
    if ((g = i >= -128 && i < 128) && (e = W[i], e)) {
      return e;
    } else {
      h = r(i, i < 0 ? -1 : 0, false);
      if (g) {
        W[i] = h;
      }
      return h;
    }
  }
}
f.fromInt = T;
function v(i, t) {
  if (isNaN(i)) {
    if (t) {
      return d;
    } else {
      return O;
    }
  }
  if (t) {
    if (i < 0) {
      return d;
    }
    if (i >= B) {
      return D;
    }
  } else {
    if (i <= -P) {
      return E;
    }
    if (i + 1 >= P) {
      return z;
    }
  }
  if (i < 0) {
    return v(-i, t).neg();
  } else {
    return r(i % y | 0, i / y | 0, t);
  }
}
f.fromNumber = v;
function r(i, t, h) {
  return new f(i, t, h);
}
f.fromBits = r;
var x = Math.pow;
function A(i, t, h) {
  if (i.length === 0) {
    throw Error("empty string");
  }
  if (typeof t == "number") {
    h = t;
    t = false;
  } else {
    t = !!t;
  }
  if (i === "NaN" || i === "Infinity" || i === "+Infinity" || i === "-Infinity") {
    if (t) {
      return d;
    } else {
      return O;
    }
  }
  h = h || 10;
  if (h < 2 || h > 36) {
    throw RangeError("radix");
  }
  var e;
  if ((e = i.indexOf("-")) > 0) {
    throw Error("interior hyphen");
  }
  if (e === 0) {
    return A(i.substring(1), t, h).neg();
  }
  var g = v(x(h, 8));
  var s = O;
  for (var u = 0; u < i.length; u += 8) {
    var w = Math.min(8, i.length - u);
    var _ = parseInt(i.substring(u, u + w), h);
    if (w < 8) {
      var l = v(x(h, w));
      s = s.mul(l).add(v(_));
    } else {
      s = s.mul(g);
      s = s.add(v(_));
    }
  }
  s.unsigned = t;
  return s;
}
f.fromString = A;
function q(i, t) {
  if (typeof i == "number") {
    return v(i, t);
  } else if (typeof i == "string") {
    return A(i, t);
  } else {
    return r(i.low, i.high, typeof t == "boolean" ? t : i.unsigned);
  }
}
f.fromValue = q;
var S = 65536;
var H = 16777216;
var y = S * S;
var B = y * y;
var P = B / 2;
var V = T(H);
var O = T(0);
f.ZERO = O;
var d = T(0, true);
f.UZERO = d;
var b = T(1);
f.ONE = b;
var m = T(1, true);
f.UONE = m;
var Z = T(-1);
f.NEG_ONE = Z;
var z = r(-1, 2147483647, false);
f.MAX_VALUE = z;
var D = r(-1, -1, true);
f.MAX_UNSIGNED_VALUE = D;
var E = r(0, -2147483648, false);
f.MIN_VALUE = E;
var n = f.prototype;
n.toInt = function () {
  if (this.unsigned) {
    return this.low >>> 0;
  } else {
    return this.low;
  }
};
n.toNumber = function () {
  if (this.unsigned) {
    return (this.high >>> 0) * y + (this.low >>> 0);
  } else {
    return this.high * y + (this.low >>> 0);
  }
};
n.toString = function (t) {
  t = t || 10;
  if (t < 2 || t > 36) {
    throw RangeError("radix");
  }
  if (this.isZero()) {
    return "0";
  }
  if (this.isNegative()) {
    if (this.eq(E)) {
      var h = v(t);
      var e = this.div(h);
      var g = e.mul(h).sub(this);
      return e.toString(t) + g.toInt().toString(t);
    } else {
      return "-" + this.neg().toString(t);
    }
  }
  var s = v(x(t, 6), this.unsigned);
  var u = this;
  var w = "";
  while (true) {
    var _ = u.div(s);
    var l = u.sub(_.mul(s)).toInt() >>> 0;
    var o = l.toString(t);
    u = _;
    if (u.isZero()) {
      return o + w;
    }
    while (o.length < 6) {
      o = "0" + o;
    }
    w = "" + o + w;
  }
};
n.getHighBits = function () {
  return this.high;
};
n.getHighBitsUnsigned = function () {
  return this.high >>> 0;
};
n.getLowBits = function () {
  return this.low;
};
n.getLowBitsUnsigned = function () {
  return this.low >>> 0;
};
n.getNumBitsAbs = function () {
  if (this.isNegative()) {
    if (this.eq(E)) {
      return 64;
    } else {
      return this.neg().getNumBitsAbs();
    }
  }
  for (var t = this.high != 0 ? this.high : this.low, h = 31; h > 0 && (t & 1 << h) == 0; h--);
  if (this.high != 0) {
    return h + 33;
  } else {
    return h + 1;
  }
};
n.isSafeInteger = function () {
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
n.isZero = function () {
  return this.high === 0 && this.low === 0;
};
n.eqz = n.isZero;
n.isNegative = function () {
  return !this.unsigned && this.high < 0;
};
n.isPositive = function () {
  return this.unsigned || this.high >= 0;
};
n.isOdd = function () {
  return (this.low & 1) === 1;
};
n.isEven = function () {
  return (this.low & 1) === 0;
};
n.equals = function (t) {
  if (!c(t)) {
    t = q(t);
  }
  if (this.unsigned !== t.unsigned && this.high >>> 31 === 1 && t.high >>> 31 === 1) {
    return false;
  } else {
    return this.high === t.high && this.low === t.low;
  }
};
n.eq = n.equals;
n.notEquals = function (t) {
  return !this.eq(t);
};
n.neq = n.notEquals;
n.ne = n.notEquals;
n.lessThan = function (t) {
  return this.comp(t) < 0;
};
n.lt = n.lessThan;
n.lessThanOrEqual = function (t) {
  return this.comp(t) <= 0;
};
n.lte = n.lessThanOrEqual;
n.le = n.lessThanOrEqual;
n.greaterThan = function (t) {
  return this.comp(t) > 0;
};
n.gt = n.greaterThan;
n.greaterThanOrEqual = function (t) {
  return this.comp(t) >= 0;
};
n.gte = n.greaterThanOrEqual;
n.ge = n.greaterThanOrEqual;
n.compare = function (t) {
  if (!c(t)) {
    t = q(t);
  }
  if (this.eq(t)) {
    return 0;
  }
  var h = this.isNegative();
  var e = t.isNegative();
  if (h && !e) {
    return -1;
  } else if (!h && e) {
    return 1;
  } else if (this.unsigned) {
    if (t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0) {
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
n.comp = n.compare;
n.negate = function () {
  if (!this.unsigned && this.eq(E)) {
    return E;
  } else {
    return this.not().add(b);
  }
};
n.neg = n.negate;
n.add = function (t) {
  if (!c(t)) {
    t = q(t);
  }
  var h = this.high >>> 16;
  var e = this.high & 65535;
  var g = this.low >>> 16;
  var s = this.low & 65535;
  var u = t.high >>> 16;
  var w = t.high & 65535;
  var _ = t.low >>> 16;
  var l = t.low & 65535;
  var o = 0;
  var I = 0;
  var a = 0;
  var N = 0;
  N += s + l;
  a += N >>> 16;
  N &= 65535;
  a += g + _;
  I += a >>> 16;
  a &= 65535;
  I += e + w;
  o += I >>> 16;
  I &= 65535;
  o += h + u;
  o &= 65535;
  return r(a << 16 | N, o << 16 | I, this.unsigned);
};
n.subtract = function (t) {
  if (!c(t)) {
    t = q(t);
  }
  return this.add(t.neg());
};
n.sub = n.subtract;
n.multiply = function (t) {
  if (this.isZero()) {
    return this;
  }
  if (!c(t)) {
    t = q(t);
  }
  if (L) {
    var h = L.mul(this.low, this.high, t.low, t.high);
    return r(h, L.get_high(), this.unsigned);
  }
  if (t.isZero()) {
    if (this.unsigned) {
      return d;
    } else {
      return O;
    }
  }
  if (this.eq(E)) {
    if (t.isOdd()) {
      return E;
    } else {
      return O;
    }
  }
  if (t.eq(E)) {
    if (this.isOdd()) {
      return E;
    } else {
      return O;
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
  if (this.lt(V) && t.lt(V)) {
    return v(this.toNumber() * t.toNumber(), this.unsigned);
  }
  var e = this.high >>> 16;
  var g = this.high & 65535;
  var s = this.low >>> 16;
  var u = this.low & 65535;
  var w = t.high >>> 16;
  var _ = t.high & 65535;
  var l = t.low >>> 16;
  var o = t.low & 65535;
  var I = 0;
  var a = 0;
  var N = 0;
  var U = 0;
  U += u * o;
  N += U >>> 16;
  U &= 65535;
  N += s * o;
  a += N >>> 16;
  N &= 65535;
  N += u * l;
  a += N >>> 16;
  N &= 65535;
  a += g * o;
  I += a >>> 16;
  a &= 65535;
  a += s * l;
  I += a >>> 16;
  a &= 65535;
  a += u * _;
  I += a >>> 16;
  a &= 65535;
  I += e * o + g * l + s * _ + u * w;
  I &= 65535;
  return r(N << 16 | U, I << 16 | a, this.unsigned);
};
n.mul = n.multiply;
n.divide = function (t) {
  if (!c(t)) {
    t = q(t);
  }
  if (t.isZero()) {
    throw Error("division by zero");
  }
  if (L) {
    if (!this.unsigned && this.high === -2147483648 && t.low === -1 && t.high === -1) {
      return this;
    }
    var h = (this.unsigned ? L.div_u : L.div_s)(this.low, this.high, t.low, t.high);
    return r(h, L.get_high(), this.unsigned);
  }
  if (this.isZero()) {
    if (this.unsigned) {
      return d;
    } else {
      return O;
    }
  }
  var e;
  var g;
  var s;
  if (this.unsigned) {
    if (!t.unsigned) {
      t = t.toUnsigned();
    }
    if (t.gt(this)) {
      return d;
    }
    if (t.gt(this.shru(1))) {
      return m;
    }
    s = d;
  } else {
    if (this.eq(E)) {
      if (t.eq(b) || t.eq(Z)) {
        return E;
      }
      if (t.eq(E)) {
        return b;
      }
      var u = this.shr(1);
      e = u.div(t).shl(1);
      if (e.eq(O)) {
        if (t.isNegative()) {
          return b;
        } else {
          return Z;
        }
      } else {
        g = this.sub(t.mul(e));
        s = e.add(g.div(t));
        return s;
      }
    } else if (t.eq(E)) {
      if (this.unsigned) {
        return d;
      } else {
        return O;
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
    s = O;
  }
  for (g = this; g.gte(t);) {
    e = Math.max(1, Math.floor(g.toNumber() / t.toNumber()));
    var w = Math.ceil(Math.log(e) / Math.LN2);
    var _ = w <= 48 ? 1 : x(2, w - 48);
    var l = v(e);
    for (var o = l.mul(t); o.isNegative() || o.gt(g);) {
      e -= _;
      l = v(e, this.unsigned);
      o = l.mul(t);
    }
    if (l.isZero()) {
      l = b;
    }
    s = s.add(l);
    g = g.sub(o);
  }
  return s;
};
n.div = n.divide;
n.modulo = function (t) {
  if (!c(t)) {
    t = q(t);
  }
  if (L) {
    var h = (this.unsigned ? L.rem_u : L.rem_s)(this.low, this.high, t.low, t.high);
    return r(h, L.get_high(), this.unsigned);
  }
  return this.sub(this.div(t).mul(t));
};
n.mod = n.modulo;
n.rem = n.modulo;
n.not = function () {
  return r(~this.low, ~this.high, this.unsigned);
};
n.countLeadingZeros = function () {
  if (this.high) {
    return Math.clz32(this.high);
  } else {
    return Math.clz32(this.low) + 32;
  }
};
n.clz = n.countLeadingZeros;
n.countTrailingZeros = function () {
  if (this.low) {
    return M(this.low);
  } else {
    return M(this.high) + 32;
  }
};
n.ctz = n.countTrailingZeros;
n.and = function (t) {
  if (!c(t)) {
    t = q(t);
  }
  return r(this.low & t.low, this.high & t.high, this.unsigned);
};
n.or = function (t) {
  if (!c(t)) {
    t = q(t);
  }
  return r(this.low | t.low, this.high | t.high, this.unsigned);
};
n.xor = function (t) {
  if (!c(t)) {
    t = q(t);
  }
  return r(this.low ^ t.low, this.high ^ t.high, this.unsigned);
};
n.shiftLeft = function (t) {
  if (c(t)) {
    t = t.toInt();
  }
  if ((t &= 63) === 0) {
    return this;
  } else if (t < 32) {
    return r(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned);
  } else {
    return r(0, this.low << t - 32, this.unsigned);
  }
};
n.shl = n.shiftLeft;
n.shiftRight = function (t) {
  if (c(t)) {
    t = t.toInt();
  }
  if ((t &= 63) === 0) {
    return this;
  } else if (t < 32) {
    return r(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned);
  } else {
    return r(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned);
  }
};
n.shr = n.shiftRight;
n.shiftRightUnsigned = function (t) {
  if (c(t)) {
    t = t.toInt();
  }
  if ((t &= 63) === 0) {
    return this;
  } else if (t < 32) {
    return r(this.low >>> t | this.high << 32 - t, this.high >>> t, this.unsigned);
  } else if (t === 32) {
    return r(this.high, 0, this.unsigned);
  } else {
    return r(this.high >>> t - 32, 0, this.unsigned);
  }
};
n.shru = n.shiftRightUnsigned;
n.shr_u = n.shiftRightUnsigned;
n.rotateLeft = function (t) {
  var h;
  if (c(t)) {
    t = t.toInt();
  }
  if ((t &= 63) === 0) {
    return this;
  } else if (t === 32) {
    return r(this.high, this.low, this.unsigned);
  } else if (t < 32) {
    h = 32 - t;
    return r(this.low << t | this.high >>> h, this.high << t | this.low >>> h, this.unsigned);
  } else {
    t -= 32;
    h = 32 - t;
    return r(this.high << t | this.low >>> h, this.low << t | this.high >>> h, this.unsigned);
  }
};
n.rotl = n.rotateLeft;
n.rotateRight = function (t) {
  var h;
  if (c(t)) {
    t = t.toInt();
  }
  if ((t &= 63) === 0) {
    return this;
  } else if (t === 32) {
    return r(this.high, this.low, this.unsigned);
  } else if (t < 32) {
    h = 32 - t;
    return r(this.high << h | this.low >>> t, this.low << h | this.high >>> t, this.unsigned);
  } else {
    t -= 32;
    h = 32 - t;
    return r(this.low << h | this.high >>> t, this.high << h | this.low >>> t, this.unsigned);
  }
};
n.rotr = n.rotateRight;
n.toSigned = function () {
  if (this.unsigned) {
    return r(this.low, this.high, false);
  } else {
    return this;
  }
};
n.toUnsigned = function () {
  if (this.unsigned) {
    return this;
  } else {
    return r(this.low, this.high, true);
  }
};
n.toBytes = function (t) {
  if (t) {
    return this.toBytesLE();
  } else {
    return this.toBytesBE();
  }
};
n.toBytesLE = function () {
  var t = this.high;
  var h = this.low;
  return [h & 255, h >>> 8 & 255, h >>> 16 & 255, h >>> 24, t & 255, t >>> 8 & 255, t >>> 16 & 255, t >>> 24];
};
n.toBytesBE = function () {
  var t = this.high;
  var h = this.low;
  return [t >>> 24, t >>> 16 & 255, t >>> 8 & 255, t & 255, h >>> 24, h >>> 16 & 255, h >>> 8 & 255, h & 255];
};
f.fromBytes = function (t, h, e) {
  if (e) {
    return f.fromBytesLE(t, h);
  } else {
    return f.fromBytesBE(t, h);
  }
};
f.fromBytesLE = function (t, h) {
  return new f(t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24, t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24, h);
};
f.fromBytesBE = function (t, h) {
  return new f(t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7], t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3], h);
};
if (typeof BigInt == "function") {
  f.fromBigInt = function (t, h) {
    var e = Number(BigInt.asIntN(32, t));
    var g = Number(BigInt.asIntN(32, t >> BigInt(32)));
    return r(e, g, h);
  };
  f.fromValue = function (t, h) {
    if (typeof t == "bigint") {
      return f.fromBigInt(t, h);
    } else {
      return q(t, h);
    }
  };
  n.toBigInt = function () {
    var t = BigInt(this.low >>> 0);
    var h = BigInt(this.unsigned ? this.high >>> 0 : this.high);
    return h << BigInt(32) | t;
  };
}
export { f as L }; //# sourceMappingURL=ViifaoL66WRL.js.map
//# chunkId=019d3f2c-0e96-71e1-89ac-74d765f91dc6