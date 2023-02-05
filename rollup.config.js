import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import size from 'rollup-plugin-size'
import modify from 'rollup-plugin-modify'
import typescript from '@rollup/plugin-typescript'

const terserOptions = {
	ecma: 2020,
	compress: {
		booleans_as_integers: true,
		pure_getters: true,
		drop_console: true,
		passes: 3,
	},
}

export default [
	{
		input: 'index.ts',
		output: {
			file: 'dist/trap-focus-svelte.svelte.js',
			format: 'esm',
		},
		external: ['svelte/internal'],
		plugins: [typescript(), terser(terserOptions), size()],
	},
	{
		input: 'index.ts',
		output: {
			file: 'dist/trap-focus-svelte.mjs',
			format: 'esm',
		},
		plugins: [
			typescript(),
			resolve(),
			modify({
				find: 'const resolved_promise = Promise.resolve();',
				replace: '',
			}),
			terser(terserOptions),
			size(),
		],
	},
	{
		input: 'index.ts',
		output: {
			file: 'dist/trap-focus-svelte.cjs',
			format: 'cjs',
			strict: false,
		},
		plugins: [
			typescript(),
			resolve(),
			modify({
				find: 'const resolved_promise = Promise.resolve();',
				replace: '',
			}),
			terser(terserOptions),
			size(),
		],
	},
]
