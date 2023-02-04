import { listen } from 'svelte/internal'

interface StackData {
	wrap: HTMLElement
	/** previous document.activeElement (used to restore focus) */
	lastActiveElement: HTMLElement
}

interface TrapOptions {
	/** enables or disables wrap */
	active?: boolean
	/** wrapper element */
	wrap?: HTMLElement
}

let stack: StackData[] = []

// true if tabbing backwards with shift + tab
let shiftTab = false

listen(document, 'keydown', (e: KeyboardEvent) => {
	shiftTab = e.shiftKey && e.key === 'Tab'
})

/** Locks focus within a wrapper element */
function trapFocus(node: HTMLElement, options: TrapOptions = { active: true }) {
	let { wrap = node, active } = options

	const focusableEls = [...wrap.querySelectorAll('*')].filter(
		(element: HTMLElement) => element.tabIndex >= 0
	) as HTMLElement[]

	const firstFocusableEl = focusableEls.at(0) ?? wrap
	const lastFocusableEl = focusableEls.at(-1) ?? wrap

	// add to stack
	stack.push({
		wrap,
		lastActiveElement: document.activeElement as HTMLElement,
	})

	// set initial focus on first focusable el
	firstFocusableEl.focus()

	/** true if element is in the last trap added to stack */
	function inCurrentStack(el: HTMLElement = wrap) {
		return stack.at(-1).wrap.contains(el)
	}

	// use blur listeners to redirect focus before it leaves container\
	/** focus last element if focus leaves first element with shift */
	const firstElBlurListener = listen(firstFocusableEl, 'blur', () => {
		if (active && inCurrentStack()) {
			shiftTab && lastFocusableEl.focus()
		}
	})
	/** focus first element if focus leaves last element without shift */
	const lastElBlurListener = listen(lastFocusableEl, 'blur', () => {
		if (active && inCurrentStack()) {
			!shiftTab && firstFocusableEl.focus()
		}
	})

	/** listener for focus event, moves focus to container if away */
	const focusListener = listen(document, 'focusin', (e: FocusEvent) => {
		if (active && !inCurrentStack(e.target as HTMLElement)) {
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
			// focus previously focused element
			stack.pop().lastActiveElement.focus()
		},
	}
}

export { trapFocus }
