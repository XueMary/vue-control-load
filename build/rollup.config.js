import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
export default {
    input: 'src/index.js', // Path relative to package.json
    output: {
        name: 'MyComponent',
        exports: 'named',
    },
    plugins: [
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble({
            exclude: 'node_modules/**' // 只编译我们的源代码
        }), // Transpile to ES5
        resolve(),
        json(),
    ],
};