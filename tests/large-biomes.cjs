// Run with: node tests/large-biomes.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const publicDir = path.resolve(__dirname, '../frontend/public');
const context = vm.createContext({
  require, process, console: { log() {}, error: console.error },
  __dirname: publicDir, __filename: path.join(publicDir, 'ancient.js'),
  Buffer, setTimeout, clearTimeout,
  Module: {
    wasmBinary: fs.readFileSync(path.join(publicDir, 'ancient.wasm')),
    noInitialRun: true,
    print() {},
    onRuntimeInitialized() {
      try {
        const module = context.Module;
        const output = module._malloc(500 * 24);
        const types = ['bigint', ...Array(6).fill('number')];
        const legacy = module.cwrap('find_silence_trims', 'number', types);
        const find = module.cwrap('find_silence_trims_with_biomes', 'number',
          [...types, 'number']);
        function search(fn, seed, version, ...extra) {
          const count = fn(seed, 0, 0, 5000, 5000, version, output, ...extra);
          assert.ok(count >= 0 && count <= 500);
          return Array.from(module.HEAP64.slice(output / 8, output / 8 + count * 3));
        }
        let changed = false;
        for (const version of [25, 26, 30, 32, 33, 34, 35]) {
          const seed = 6705935532593347361n;
          const normal = search(find, seed, version, 0);
          assert.deepEqual(normal, search(legacy, seed, version),
            `Default-world compatibility for version ${version}`);
          const large = search(find, seed, version, 1);
          assert.ok(large.length > 0, `Large Biomes finds chests for version ${version}`);
          changed ||= String(normal) !== String(large);
          // Switching back must reset the biome generator.
          assert.deepEqual(search(find, seed, version, 0), normal);
        }
        assert.ok(changed, 'Large Biomes must change the search results');
        const negative = search(find, -1234567890123456789n, 35, 1);
        assert.deepEqual(search(find, -1234567890123456789n, 35, 1), negative);
        module._free(output);
        console.log('Large Biomes WASM checks passed for all 7 supported versions.');
      } catch (error) {
        console.error(error);
        process.exitCode = 1;
      }
    },
  },
});
vm.runInContext(fs.readFileSync(path.join(publicDir, 'ancient.js'), 'utf8'), context);
