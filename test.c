#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>

/*
Ok so apparently:

11111100
^^^^^^
upper 6 bits / most significant 6 bits

00111111
  ^^^^^^
  lower 6 bits / least significant 6 bits
*/

int main() {
    uint64_t seed = 3075358256516822746;
    //                              16                         48
    uint64_t lower_48_mask = 0b0000000000000000111111111111111111111111111111111111111111111111;
    uint64_t lower_48_bits = seed & lower_48_mask;

    printf("seed is %" PRIu64 "\n", seed);
    printf("lower_48_mask is %" PRIu64 "\n", lower_48_mask);
    printf("lower 48 bits is %" PRIu64 "\n", lower_48_bits);

    return 0;
}