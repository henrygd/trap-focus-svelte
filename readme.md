[npm-image]: https://flat.badgen.net/npm/v/trap-focus-svelte?color=blue
[npm-url]: https://www.npmjs.com/package/trap-focus-svelte

<!-- [size-image]: https://flat.badgen.net/badgesize/gzip/henrygd/trap-focus-svelte/main/dist/trap-focus-svelte.svelte.js?color=green -->

[size-image]: https://flat.badgen.net/static/gzip%20size/358%20bytes/green
[license-image]: https://flat.badgen.net/github/license/henrygd/trap-focus-svelte?color=purple
[license-url]: /license

# trap-focus-svelte

[![npm][npm-image]][npm-url] ![File Size][size-image] [![MIT license][license-image]][license-url]

Small 0.4kB focus trap that supports stacking, toggling, and dynamic content. Designed for Svelte but compatible with plain JavaScript or any framework.

Demo: https://trap-focus-svelte.henrygd.me

Svelte example: https://stackblitz.com/edit/vitejs-vite-k328kh?file=src/App.svelte

Vanilla example with TypeScript: https://stackblitz.com/edit/vitejs-vite-sesxte?file=src/main.ts

## Installation

```bash
pnpm install trap-focus-svelte
```

## Usage with Svelte

Add directly to an element as an action.

If the element is removed, the trap and event listeners are destroyed automatically.

```html
<script>
	import { trapFocus } from 'trap-focus-svelte'
</script>

<div use:trapFocus>
	<button>Inside trap</button>
	<button>Inside trap</button>
</div>
<button>Outside trap</button>
```

You can also toggle the trap on they fly:

<!-- prettier-ignore-start -->
```html
<script>
	import { trapFocus } from 'trap-focus-svelte'

	let active = true
	const toggleTrap = () => (active = !active)
</script>

<div use:trapFocus={active}>
	<button on:click={toggleTrap}>Toggle trap</button>
	<button>Inside trap</button>
</div>
<button>Outside trap</button>
```
<!-- prettier-ignore-end -->

## Usage with vanilla JavaScript or other frameworks

Import from `trap-focus-svelte/vanilla`

For an example of the demo site made without Svelte (with TypeScript / Vite) see [this StackBlitz](https://stackblitz.com/edit/vitejs-vite-sesxte?file=src/main.ts).

```html
<div id="buttons">
	<button>Inside trap</button>
	<button>Inside trap</button>
</div>
<button>Outside trap</button>
```

```js
import { trapFocus } from 'trap-focus-svelte/vanilla'

const buttons = document.getElementById('buttons')

// create trap (pass false as a second argument to start disabled)
const buttonTrap = trapFocus(buttons)

// toggle trap
buttonTrap.update(false)

// destory trap
buttonTrap.destroy()
```

## Notes

If you have multiple traps active at the same time, the focus will be within the latest trap created or activated.

When that trap is destroyed or deactivated, the focus will work backwards down the chain, eventually restoring focus to the [`document.activeElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement) at the time of the oldest trap's activation.

## License

MIT
