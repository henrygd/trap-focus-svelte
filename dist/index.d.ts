/** Traps focus within a wrapper element */
declare function trapFocus(wrap: HTMLElement, active?: boolean): {
    /** Enables / disables trap */
    update(active: boolean): void;
    /** Destroys trap and removes event listeners */
    destroy(): void;
};
export { trapFocus };
