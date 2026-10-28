#!/usr/bin/env python3
"""Build the cubiomes library natively and/or as a WebAssembly module.

Examples:
    python build.py              # build native + wasm and copy wasm to frontend
    python build.py --native     # build the Windows library and CLI only
    python build.py --wasm       # build the wasm module and copy it to frontend

The wasm build needs an activated Emscripten SDK (emcc/emcmake on PATH).
"""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CUBIOMES = ROOT / "cubiomes"
FRONTEND_PUBLIC = ROOT / "frontend" / "public"

NATIVE_BUILD = CUBIOMES / "build-win"
WASM_BUILD = CUBIOMES / "build-wasm"

WASM_EXPORTS = ",".join(
    [
        "_find_silence_trims",
        "_find_silence_trims_with_biomes",
        "_find_ward_trims",
        "_searchAncientCityForTrims",
        "_malloc",
        "_free",
    ]
)


def run(command: list[str], *, cwd: Path = CUBIOMES, env: dict | None = None) -> None:
    print("+", " ".join(command), flush=True)
    subprocess.run(command, cwd=cwd, env=env, check=True)


def build_native() -> None:
    run(
        [
            "cmake",
            "--fresh",
            "-S",
            str(CUBIOMES),
            "-B",
            str(NATIVE_BUILD),
            "-G",
            "Ninja",
            "-DCMAKE_BUILD_TYPE=Release",
        ]
    )
    run(["cmake", "--build", str(NATIVE_BUILD), "-j", str(os.cpu_count() or 1)])

    # Build the command line tool against the static library.
    run(
        [
            "gcc",
            "ancient_city_silence_find.c",
            "-L",
            str(NATIVE_BUILD),
            "-lcubiomes_static",
            "-fwrapv",
            "-lm",
            "-static",
            "-o",
            "silence.exe",
        ]
    )
    print(f"Native build ready: {NATIVE_BUILD / 'libcubiomes_static.a'}")
    print(f"CLI ready:          {CUBIOMES / 'silence.exe'}")


def build_wasm() -> None:
    if not shutil.which("emcc") or not shutil.which("emcmake"):
        sys.exit(
            "emcc/emcmake not found. Install and activate the Emscripten SDK, "
            "then run this script from an emsdk environment."
        )

    env = os.environ.copy()
    env["CFLAGS"] = ((env.get("CFLAGS") or "") + " -sALLOW_MEMORY_GROWTH=1").strip()
    env["LDFLAGS"] = ((env.get("LDFLAGS") or "") + " -sALLOW_MEMORY_GROWTH=1").strip()

    run(
        [
            "emcmake",
            "cmake",
            "--fresh",
            "-S",
            str(CUBIOMES),
            "-B",
            str(WASM_BUILD),
            "-G",
            "Ninja",
            "-DCMAKE_BUILD_TYPE=Release",
        ],
        env=env,
    )
    run(
        ["cmake", "--build", str(WASM_BUILD), "-j", str(os.cpu_count() or 1)],
        env=env,
    )

    run(
        [
            "emcc",
            "ancient_city_silence_find.c",
            "-L",
            str(WASM_BUILD),
            "-lcubiomes_static",
            "-fwrapv",
            "-lm",
            f"-sEXPORTED_FUNCTIONS={WASM_EXPORTS}",
            "-sEXPORTED_RUNTIME_METHODS=ccall,cwrap,HEAP64",
            "-sINITIAL_MEMORY=67108864",
            "-sSTACK_SIZE=8388608",
            "-sALLOW_MEMORY_GROWTH=1",
            "-sMAXIMUM_MEMORY=2147483648",
            "-O3",
            "-Wall",
            "-Wextra",
            "-Wpedantic",
            "-o",
            "ancient.js",
        ],
        env=env,
    )

    for name in ("ancient.js", "ancient.wasm"):
        shutil.copy2(CUBIOMES / name, FRONTEND_PUBLIC / name)
        print(f"Copied {name} -> {FRONTEND_PUBLIC / name}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--native", action="store_true", help="build Windows library/CLI")
    parser.add_argument("--wasm", action="store_true", help="build wasm and copy to frontend")
    args = parser.parse_args()

    build_both = not args.native and not args.wasm
    if args.native or build_both:
        build_native()
    if args.wasm or build_both:
        build_wasm()


if __name__ == "__main__":
    main()
