import fs from "fs";
import { WASI } from "node:wasi";

const { argv, env } = require('node:process');

const wasi = new WASI({
  version: 'preview1',
  args: argv,
  env,
  preopens: {
    '/local': '/Users/jinjin/workspace/wasm/web-assembly/wasm-test2',
  },
});

const bytes = fs.readFileSync("hello.wasm");

const wasm = await WebAssembly.instantiate(bytes, {
  env: {
    putchar: c => process.stdout.write(String.fromCharCode(c))
  }
});

// _start 없이 직접 호출
wasm.instance.exports.say_hello();