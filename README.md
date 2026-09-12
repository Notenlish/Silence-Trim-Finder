# Silence Trim Finder

This a local-only web tool for finding silence armor trim. It uses https://github.com/xpple/cubiomes spesifically the PR by https://github.com/xpple/cubiomes/pull/35 Colin-Henry, modified a bit for ancient city loot generation. 

code in cubiomes directory is from https://github.com/Notenlish/cubiomes `jigsawBastionVillage` branch, modified a bit, fixed an error when compiling for emscripten(I added `#include "../carver.h" to some files in features/*.c`).

TODO: make a python script for compiling to wasm / win64 using mingw

## Development
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

stack size needs to be bigger bcuz cubiomes initializes a bunch of things and 64kb isnt enough

67108864 bytes = 64mb

8388608 bytes = 8mb

```
emcc ancient_city_silence_find.c -L build -lcubiomes -fwrapv -lm -sEXPORTED_FUNCTIONS=_find_silence_trims,_searchAncientCitySilenceTrim,_searchAncientCityForTrims,_malloc,_free -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,HEAP64 -sINITIAL_MEMORY=67108864 -sSTACK_SIZE=8388608 -sSAFE_HEAP=1 -sASSERTIONS=2 -sALLOW_MEMORY_GROWTH=1 -sMAXIMUM_MEMORY=2147483648 -Wall -Wextra -Wpedantic -o ancient.js
```


emcc ancient_city_silence_find.c -L build -lcubiomes \
     -fwrapv -lm \
     -sEXPORTED_FUNCTIONS=_find_silence_trims,_searchAncientCitySilenceTrim,_malloc,_free \
     -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,HEAP64 \
     -sALLOW_MEMORY_GROWTH=1 \
     -sSAFE_HEAP=1 -sASSERTIONS=2 \
     -sMAXIMUM_MEMORY=2147483648 \
     -sSTACK_SIZE=8388608 \
     -Wall -Wextra -Wpedantic \
     -sASSERTIONS=2 \
     -sSTACK_OVERFLOW_CHECK=2 \
     -g \
     -o ancient.js


run webserver to test index.html with py -m http.server 8000

after that, take the wasm and js files and copy them to frontend/public directory.

run `pnpm install` and `pnpm run dev` to start dev server

to build run `pnpm run build`

## License

MIT


