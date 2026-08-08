## How to Compile IG

this assumes the file is named "find_biome_at.c":

cmake -G "MinGW Makefiles"


cmake . --build

dynamic:
gcc find_biome_at.c -L. -lcubiomes -fwrapv -lm -o findbiomes.exe
