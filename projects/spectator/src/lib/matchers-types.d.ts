declare namespace jasmine {
  interface Matchers<T> {
    toExist(): boolean;

    toHaveLength(expected: number): boolean;

    toHaveId(id: string | number): boolean;

    toHaveClass(className: string): boolean;

    toHaveAttribute(attr: string, val?: string): boolean;

    toHaveProperty(prop: string, val: string | boolean): boolean;

    toHaveText(text: string | Function, exact?: boolean): boolean;

    toHaveExactText(text: string | Function): boolean;

    toHaveValue(value: string): boolean;

    toHaveStyle(style: { [styleKey: string]: any }): boolean;

    toHaveData({ data, val }: { data: string; val: string }): boolean;

    toBeChecked(): boolean;

    toBeDisabled(): boolean;

    toBeEmpty(): boolean;

    toBeHidden(): boolean;

    toBeSelected(): boolean;

    toBeVisible(): boolean;

    toBeFocused(): boolean;

    toBeMatchedBy(selector: string | Element): boolean;

    toHaveDescendant(selector: string | Element): boolean;

    toHaveDescendantWithText({ selector, text }: { selector: string; text: string }): boolean;

    toHaveSelectedOptions(expected: string | string[] | HTMLOptionElement | HTMLOptionElement[]): boolean;
  }
}
