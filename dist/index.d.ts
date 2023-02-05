interface TrapOptions {
    /** enables or disables wrap */
    active?: boolean;
    /** wrapper element */
    wrap?: HTMLElement;
}
/** Traps focus within a wrapper element */
declare function trapFocus(node: HTMLElement, options?: TrapOptions): {
    update(options: TrapOptions): void;
    destroy(): void;
};
export { trapFocus };
