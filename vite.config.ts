import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import svg from '@poppanator/sveltekit-svg'

export default defineConfig({
	build: {
		outDir: 'src/build'
	},
	plugins: [
		sveltekit(),
		svg({
			svgoOptions: {
			  multipass: true,
			  plugins: [
				{
				  name: 'preset-default',
				  params: { overrides: { removeViewBox: false } },
				}  
			  ],
			},
		  })
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		port: 3000,
		fs: {
			allow: ['static']
		}
	}
});
