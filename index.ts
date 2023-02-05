import { listen } from 'svelte/internal'

interface TrapOptions {
	/** enables or disables wrap */
	active?: boolean
	/** wrapper element */
	wrap?: HTMLElement
}

let stack: HTMLElement[] = []

// true if tabbing backwards with shift + tab
let shiftTab = false

listen(document, 'keydown', (e: KeyboardEvent) => {
	shiftTab = e.shiftKey && e.key === 'Tab'
})

/** Traps focus within a wrapper element */
function trapFocus(node: HTMLElement, options: TrapOptions = { active: true }) {
	let { wrap = node, active } = options

	const focusableEls = [...wrap.querySelectorAll('*')].filter(
		(element: HTMLElement) => element.tabIndex >= 0
	) as HTMLElement[]

	const firstFocusableEl = focusableEls.at(0) ?? wrap
	const lastFocusableEl = focusableEls.at(-1) ?? wrap
	const lastActiveElement = document.activeElement as HTMLElement

	// add to stack
	stack.push(wrap)

	// set initial focus on first focusable el
	firstFocusableEl.focus()

	/** true if element is in the last trap added to stack */
	const inCurrentTrap = (el: HTMLElement = wrap) => stack.at(-1).contains(el)

	// use blur listeners to redirect focus before it leaves container\
	/** focus last element if focus leaves first element with shift */
	const firstElBlurListener = listen(firstFocusableEl, 'blur', () => {
		if (active && inCurrentTrap()) {
			shiftTab && lastFocusableEl.focus()
		}
	})
	/** focus first element if focus leaves last element without shift */
	const lastElBlurListener = listen(lastFocusableEl, 'blur', () => {
		if (active && inCurrentTrap()) {
			!shiftTab && firstFocusableEl.focus()
		}
	})

	/** listener for focus event, moves focus to container if away */
	const focusListener = listen(document, 'focusin', (e: FocusEvent) => {
		if (active && !inCurrentTrap(e.target as HTMLElement)) {
			let focusEl = shiftTab ? lastFocusableEl : firstFocusableEl
			focusEl.focus()
		}
	})

	return {
		update(options: TrapOptions) {
			active = options.active
		},
		destroy() {
			// remove listeners
			focusListener()
			firstElBlurListener()
			lastElBlurListener()
			// remove from stack & focus previously focused element
			stack = stack.filter((el) => el !== wrap)
			lastActiveElement.focus()
		},
	}
}

export { trapFocus }
