(module
  (type (;0;) (func (result i32)))
  (type (;1;) (func (param i32 i32 i32 i32) (result i32)))
  (func (;0;) (type 0) (result i32)
    global.get 0)
  (func (;1;) (type 1) (param i32 i32 i32 i32) (result i32)
    (local i64)
    local.get 0
    i64.extend_i32_u
    local.get 1
    i64.extend_i32_u
    i64.const 32
    i64.shl
    i64.or
    local.get 2
    i64.extend_i32_u
    local.get 3
    i64.extend_i32_u
    i64.const 32
    i64.shl
    i64.or
    i64.mul
    local.tee 4
    i64.const 32
    i64.shr_s
    i32.wrap_i64
    global.set 0
    local.get 4
    i32.wrap_i64)
  (func (;2;) (type 1) (param i32 i32 i32 i32) (result i32)
    (local i64)
    local.get 0
    i64.extend_i32_u
    local.get 1
    i64.extend_i32_u
    i64.const 32
    i64.shl
    i64.or
    local.get 2
    i64.extend_i32_u
    local.get 3
    i64.extend_i32_u
    i64.const 32
    i64.shl
    i64.or
    i64.div_s
    local.tee 4
    i64.const 32
    i64.shr_s
    i32.wrap_i64
    global.set 0
    local.get 4
    i32.wrap_i64)
  (func (;3;) (type 1) (param i32 i32 i32 i32) (result i32)
    (local i64)
    local.get 0
    i64.extend_i32_u
    local.get 1
    i64.extend_i32_u
    i64.const 32
    i64.shl
    i64.or
    local.get 2
    i64.extend_i32_u
    local.get 3
    i64.extend_i32_u
    i64.const 32
    i64.shl
    i64.or
    i64.div_u
    local.tee 4
    i64.const 32
    i64.shr_s
    i32.wrap_i64
    global.set 0
    local.get 4
    i32.wrap_i64)
  (func (;4;) (type 1) (param i32 i32 i32 i32) (result i32)
    (local i64)
    local.get 0
    i64.extend_i32_u
    local.get 1
    i64.extend_i32_u
    i64.const 32
    i64.shl
    i64.or
    local.get 2
    i64.extend_i32_u
    local.get 3
    i64.extend_i32_u
    i64.const 32
    i64.shl
    i64.or
    i64.rem_s
    local.tee 4
    i64.const 32
    i64.shr_s
    i32.wrap_i64
    global.set 0
    local.get 4
    i32.wrap_i64)
  (func (;5;) (type 1) (param i32 i32 i32 i32) (result i32)
    (local i64)
    local.get 0
    i64.extend_i32_u
    local.get 1
    i64.extend_i32_u
    i64.const 32
    i64.shl
    i64.or
    local.get 2
    i64.extend_i32_u
    local.get 3
    i64.extend_i32_u
    i64.const 32
    i64.shl
    i64.or
    i64.rem_u
    local.tee 4
    i64.const 32
    i64.shr_s
    i32.wrap_i64
    global.set 0
    local.get 4
    i32.wrap_i64)
  (global (;0;) (mut i32) (i32.const 0))
  (export "mul" (func 1))
  (export "div_s" (func 2))
  (export "div_u" (func 3))
  (export "rem_s" (func 4))
  (export "rem_u" (func 5))
  (export "get_high" (func 0)))
