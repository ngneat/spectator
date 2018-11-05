declare namespace jasmine {
  interface Matchers<T> {
    toExist(): boolean;

    toHaveLength(expected: number): boolean;

    toHaveId(id: string | number): boolean;

    toHaveClass(className: string): boolean;
    /**
     * @deprecated
     */
    toHaveAttr({ attr, val }): boolean;
    toHaveAttribute(attr, val): boolean;
    /**
     * @deprecated
     */
    toHaveProp({ prop, val }): boolean;
    toHaveProperty(prop, val): boolean;

    toHaveProperty(prop, val): boolean;

    toHaveText(text: string | Function): boolean;

    toHaveValue(value: string): boolean;

    toHaveStyle(style: { [styleKey: string]: any }): boolean;

    toHaveData({ data, val }): boolean;

    toBeChecked(): boolean;

    toBeDisabled(): boolean;

    toBeEmpty(): boolean;

    toBeHidden(): boolean;

    toBeSelected(): boolean;

    toBeVisible(): boolean;

    toBeFocused(): boolean;

    toBeMatchedBy(selector: string | Element): boolean;

    toHaveDescendant(selector: string | Element): boolean;

    toHaveDescendantWithText({ selector, text }): boolean;
  }
}
