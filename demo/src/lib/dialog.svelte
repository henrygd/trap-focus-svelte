<script lang="ts">
	import { listen } from 'svelte/internal'
	import { fade, fly } from 'svelte/transition'
	import { trapFocus } from '../../../index'

	export let toggleDialog

	function exitOnEscapePress(node: Element) {
		const destroy = listen(document, 'keydown', (e: KeyboardEvent) => {
			if (e.key == 'Escape') {
				toggleDialog()
				destroy()
			}
		})
		return {
			destroy,
		}
	}
</script>

<div class="modal-wrap" transition:fade use:exitOnEscapePress>
	<dialog open in:fly={{ y: 14 }} out:fly={{ y: -14 }} use:trapFocus>
		<div>
			<h2>Checkboxes</h2>
			<ul>
				{#each Array(70) as _, i}
					<li>
						<label for="checkbox{i + 1}">
							<input type="checkbox" id="checkbox{i + 1}" />
							<span>Checkbox {i + 1}</span>
						</label>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<button class="btn" on:click={toggleDialog}>Close</button>
			<button class="btn cta" on:click={toggleDialog}>Confirm</button>
		</div>
	</dialog>
</div>

<style>
	.modal-wrap {
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		width: var(--body-width, 100%);
		height: 100%;
		display: grid;
		place-items: center;
		z-index: 2;
		padding: 2em 6%;
		overflow: auto;
	}

	label {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.4em;
		/* margin: 0.5em 0; */
		padding: 0.2em 0;
		border-radius: 0.3em;
	}
	label:hover {
		background: #f9f9f9;
	}
	label:focus-within {
		background: #f1f1f1;
	}

	dialog {
		position: relative;
		border-radius: 8px;
		padding: 1.4rem 1.7rem 1.7rem;
		width: 400px;
		background: #fff;
		max-width: 96%;
		height: 90%;
		max-height: 600px;
		overflow-y: scroll;
		border: 0;
		color: #000;
		text-align: left;
	}
	dialog ul {
		padding: 0;
		list-style: none;
		font-size: 1.1em;
	}
	img {
		width: 78%;
		aspect-ratio: 1.288;
		margin: 10px 0 18px 0;
	}
	.btn {
		display: block;
		margin-top: 25px;
		width: 49%;
		padding: 11px 0;
		border: none;
		letter-spacing: 0.025em;
		color: #4d4c5c;
		cursor: pointer;
		background-color: #dee1e7;
		transition: background-color 0.1s;
	}
	.btn:hover {
		background-color: #d8dce2;
	}
	.btn:focus {
		outline: none;
		box-shadow:
			0 0 0 0.125rem #fff,
			0 0 0 0.25rem #6d6b87;
	}
	.btn.cta {
		background-color: #0066fe;
		color: white;
	}
	.btn.cta:hover {
		background-color: #1774ff;
	}
	.btn.cta:focus {
		box-shadow:
			0 0 0 0.125rem #fff,
			0 0 0 0.25rem #0066fe;
	}
	h2 {
		margin: 0 0 12px;
		font-weight: 700;
		line-height: 1.2;
		color: #312f42;
	}
	p {
		color: #696870;
		font-size: 15.5px;
		line-height: 1.6;
		margin: 0;
	}
	dialog div:last-child {
		text-align: center;
		display: flex;
		justify-content: space-between;
	}

	.close-btn {
		position: absolute;
		top: 0;
		right: 0;
		width: 46px;
		padding: 0;
		border: 0;
		background: none;
		padding: 8px;
		cursor: pointer;
		opacity: 0.4;
		transition: opacity 0.15s;
	}

	/* .close-btn:focus {
		opacity: 0.7;
		outline: none;
		box-shadow:
			0 0 0 0.125rem #fff,
			0 0 0 0.25rem #000;
	}

	.close-btn:hover {
		opacity: 1;
	} */
</style>
