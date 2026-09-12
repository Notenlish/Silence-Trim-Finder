## How to Compile IG

cmake -G "MinGW Makefiles"

cmake --build . 

dynamic:
gcc ancient_city_silence_find.c -L. -lcubiomes -fwrapv -lm -o test.exe

gcc ancient_city_silence_find.c libcubiomes_static.a -fwrapv -lm -o test.exe


you may need to rm -rf build and do a fresh compilation

mkdir build
cd build
cmake -G "MinGW Makefiles" ..
cmake --build .





gcc print_versions.c build/libcubiomes_static.a -fwrapv -lm -o print_versions.exe