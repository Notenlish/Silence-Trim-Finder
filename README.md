# Silence Trim Finder

## Compilation
this uses emscripten to compile to WASM

https://emscripten.org/docs/getting_started/downloads.html

follow this

on windows, after installing and configuring env variables it might not work in your terminal
thats because windows has like 3 different profiles on VSC for the terminal(powershell, bash and cmd)

I chose bash, as that seemed to cause the least amount of problems.

https://emscripten.org/docs/compiling/Building-Projects.html#cmake-based-projects

this is for building the cubiomes library:

```bash
export CFLAGS="-sALLOW_MEMORY_GROWTH=1"
export LDFLAGS="-sALLOW_MEMORY_GROWTH=1"
emcmake cmake -B build
cmake --build build
```

and then you need to compile ancient_city_silence_find.c with emcc and load the compiled cubiomes library too.

emcc ancient_city_silence_find.c -L build -lcubiomes -fwrapv -lm -sEXPORTED_FUNCTIONS=_find_silence_trims -sEXPORTED_RUNTIME_METHODS=ccall,cwrap -sINITIAL_MEMORY=1073741824 -o ancient.js


emcc ancient_city_silence_find.c -L build -lcubiomes \
     -fwrapv -lm \
     -sEXPORTED_FUNCTIONS=_find_silence_trims \
     -sEXPORTED_RUNTIME_METHODS=ccall,cwrap \
     -sALLOW_MEMORY_GROWTH=1 \
     -sASSERTIONS=2 \
     -sSTACK_OVERFLOW_CHECK=2 \
     -g \
     -o ancient.js



run webserver to test index.html with py -m http.server 8000

## License

MIT

code in cubiomes is from https://github.com/Notenlish/cubiomes, `jigsawBastionVillage` branch, modified a bit to include the code for finding silence trim loot & fix errors when compiling for emscripten(I added `#include "../carver.h" to some files in features/*.c`).

