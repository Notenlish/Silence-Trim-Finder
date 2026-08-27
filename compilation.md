## How to Compile IG

this assumes the file is named "find_biome_at.c":

cmake -G "MinGW Makefiles"

cmake --build . 

dynamic:
gcc ancient_city_silence_find.c -L. -lcubiomes -fwrapv -lm -o silence_find.exe

gcc print_versions.c build/libcubiomes_static.a -fwrapv -lm -o print_versions.exe