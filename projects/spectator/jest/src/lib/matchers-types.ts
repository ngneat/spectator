declare namespace jest {
  interface Matchers<R> {
    toExist(): R;

    toHaveLength(expected: number): R;

    toHaveId(id: string | number): R;

    toHaveClass(className: string | string[], options?: { strict: boolean }): R;

    toHaveAttribute(attr: string | object, val?: string): R;

    toHaveProperty(prop: string | object, val?: string | boolean): R;

    toContainProperty(prop: string | object, val?: string): R;

    toHaveText(text: string | string[] | ((text: string) => boolean), exact?: boolean): R;

    toContainText(text: string | string[] | ((text: string) => boolean), exact?: boolean): R;

    toHaveExactText(text: string | string[] | ((text: string) => boolean), options?: { trim: boolean }): R;

    toHaveExactTrimmedText(text: string | string[] | ((text: string) => boolean)): R;

    toHaveValue(value: string | string[]): R;

    toContainValue(value: string | string[]): R;

    toHaveStyle(style: { [styleKey: string]: any }): R;

    toHaveData({ data, val }: { data: string; val: string }): R;

    toBeChecked(): R;

    toBeIndeterminate(): R;

    toBeDisabled(): R;

    toBeEmpty(): R;

    toBePartial(partial: object): R;

    toBeHidden(): R;

    toBeSelected(): R;

    toBeVisible(): R;

    toBeFocused(): R;

    toBeMatchedBy(selector: string | Element): R;

    toHaveDescendant(selector: string | Element): R;

    toHaveDescendantWithText({ selector, text }: { selector: string; text: string }): R;

    toHaveSelectedOptions(expected: string | string[] | HTMLOptionElement | HTMLOptionElement[]): R;
  }
}
