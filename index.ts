let stack: HTMLElement[] = []

/** adds event listener to node and returns function that removes the listener */
function listen(node: Node, event: string, handler: EventListenerOrEventListenerObject) {
	node.addEventListener(event, handler)
	return () => node.removeEventListener(event, handler)
}

/** Traps focus within a wrapper element */
function trapFocus(wrap: HTMLElement, active = true) {
	/** return the first and last focusable children */
	function getFirstAndLastFocusable() {
		const els = [...wrap.querySelectorAll('*')].filter(
			(element: HTMLElement) => element.tabIndex >= 0
		)
		return [els.at(0) ?? wrap, els.at(-1) ?? wrap] as HTMLElement[]
	}

	// store document.activeElement to restore focus when untrapped
	let lastActiveElement: HTMLElement

	/** activates trap (adds to stack) and focuses inside */
	function addToStack() {
		stack.push(wrap)
		lastActiveElement = document.activeElement as HTMLElement
		getFirstAndLastFocusable().at(0).focus()
	}
	/** deactivates trap (removes from stack) and restores focus to lastActiveElement */
	function removeFromStack() {
		stack.pop()
		lastActiveElement.focus()
	}

	// add to stack if active
	if (active) {
		addToStack()
	}

	/** true if element is in the trap most recently added to stack */
	const inCurrentTrap = (el: HTMLElement) => stack.at(-1)?.contains(el)

	/** moves focus back to wrap if something outside the wrap is focused */
	const focusInListener = listen(document, 'focusin', (e: FocusEvent) => {
		// return if ths trap is not active
		// return if focus is inside the trap
		if (!inCurrentTrap(wrap) || inCurrentTrap(e.target as HTMLElement)) {
			return
		}

		const [firstFocusable, lastFocusable] = getFirstAndLastFocusable()
		const previousFocusable = e.relatedTarget as HTMLElement

		// if no previousFocusable, focus first focusable
		// if previousFocusable is not in the trap, focus first focusable
		// if last element, focus first focusable
		if (
			!previousFocusable ||
			!inCurrentTrap(previousFocusable) ||
			previousFocusable === lastFocusable
		) {
			firstFocusable.focus()
			return
		}

		// if first element and shift tab within time, focus last element
		if (previousFocusable === firstFocusable || previousFocusable === wrap) {
			lastFocusable.focus()
			return
		}
		// fall back to focus on previousFocusable (we made sure it was in current trap above)
		previousFocusable.focus()
	})

	return {
		/** Enables / disables trap */
		update(active: boolean) {
			if (active) {
				addToStack()
			} else {
				removeFromStack()
			}
		},
		/** Destroys trap and removes event listeners */
		destroy() {
			// shiftTabListener()
			focusInListener()
			// focusOutListener()
			removeFromStack()
		},
	}
}

export { trapFocus }
