build library:
cmake -S . -B build-zig -G Ninja \
     -DCMAKE_BUILD_TYPE=Release \
     -DCMAKE_C_COMPILER=zig -DCMAKE_C_COMPILER_ARG1=cc \
     -DCMAKE_CXX_COMPILER=zig -DCMAKE_CXX_COMPILER_ARG1=c++
   cmake --build build-zig -j4

build testing code:
zig cc silence_trim_find.c -Lbuild-zig -lcubiomes_static -fwrapv -lm -static -o silence.exe




