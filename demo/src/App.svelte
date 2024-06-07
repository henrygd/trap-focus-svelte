<script lang="ts">
	import { trapFocus } from '../../index'
	import Dialog from './lib/dialog.svelte'

	let trapActive = true

	let dialogActive = false

	function toggleTrap() {
		trapActive = !trapActive
	}

	function toggleDialog() {
		dialogActive = !dialogActive
	}
</script>

<main>
	<h1>a focus trap for svelte</h1>
	<p>
		Small 0.4kB focus trap that supports stacking, toggling, and dynamic content. You may <a
			href="https://github.com/henrygd/trap-focus-svelte">view this project on GitHub</a
		>
		by disabling the active focus trap.
	</p>

	<div use:trapFocus={trapActive}>
		<div class="btns">
			<button on:click={toggleTrap}>Toggle Trap ({trapActive ? 'Enabled' : 'Disabled'})</button>
			<button on:click={toggleDialog}>Open Modal</button>
		</div>
	</div>

	{#if dialogActive}
		<Dialog {toggleDialog} />
	{/if}

	<div class="badges">
		<a href="https://www.npmjs.com/package/trap-focus-svelte">
			<img height="20" src="https://flat.badgen.net/npm/v/trap-focus-svelte?color=blue" alt="NPM" />
		</a>
		<a href="https://github.com/henrygd/trap-focus-svelte/blob/main/dist/trap-focus-svelte.mjs">
			<!-- <img
				height="20"
				src="https://flat.badgen.net/badgesize/gzip/henrygd/trap-focus-svelte/main/dist/trap-focus-svelte.mjs?color=green"
				alt="current library size"
			/> -->
			<img
				height="20"
				src="https://flat.badgen.net/static/gzip%20size/358%20bytes/green"
				alt="358 bytes"
			/>
		</a>
		<a href="https://github.com/henrygd/trap-focus-svelte/blob/main/license">
			<img
				height="20"
				src="https://flat.badgen.net/github/license/henrygd/trap-focus-svelte?color=purple"
				alt="MIT license"
			/>
		</a>
	</div>
</main>

<style>
	.badges {
		display: flex;
		justify-content: center;
	}
	.badges :where(a, div) {
		display: inline-block;
		margin: 3px;
	}
	p {
		margin: 0 0 0.2em;
		line-height: 1.6;
	}
	img {
		display: block;
	}
	.btns {
		margin: 1.5em 0;
	}
	button {
		margin: 5px 3px;
	}
</style>
