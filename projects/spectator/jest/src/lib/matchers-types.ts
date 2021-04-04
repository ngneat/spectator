declare namespace jest {
  interface Matchers<R> {
    toExist(): boolean;

    toHaveLength(expected: number): boolean;

    toHaveId(id: string | number): boolean;

    toHaveClass(className: string | string[], options?: { strict: boolean }): boolean;

    toHaveAttribute(attr: string | object, val?: string): boolean;

    toHaveProperty(prop: string | object, val?: string | boolean): boolean;

    toContainProperty(prop: string | object, val?: string): boolean;

    toHaveText(text: string | string[] | Function, exact?: boolean): boolean;

    toContainText(text: string | string[] | Function, exact?: boolean): boolean;

    toHaveExactText(text: string | string[] | Function): boolean;

    toHaveValue(value: string | string[]): boolean;

    toContainValue(value: string | string[]): boolean;

    toHaveStyle(style: { [styleKey: string]: any }): boolean;

    toHaveData({ data, val }: { data: string; val: string }): boolean;

    toBeChecked(): boolean;

    toBeDisabled(): boolean;

    toBeEmpty(): boolean;

    toBePartial(partial: object): boolean;

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
