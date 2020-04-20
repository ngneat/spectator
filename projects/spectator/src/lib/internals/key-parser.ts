import { isNumber, isString, KeyboardEventOptions, isObject } from '../types';

export interface ModifierKeys {
  alt?: boolean;
  control?: boolean;
  shift?: boolean;
  meta?: boolean;
}

export interface KeyOptions {
  key: string | false;
  keyCode: number | false;
  modifiers: ModifierKeys;
}

export const parseKeyOptions = (keyOrKeyCode: string | number | KeyboardEventOptions): KeyOptions => {
  if (isNumber(keyOrKeyCode) && keyOrKeyCode) {
    return { key: false, keyCode: keyOrKeyCode, modifiers: {} };
  }

  if (isString(keyOrKeyCode) && keyOrKeyCode) {
    return parseKey(keyOrKeyCode as string);
  }

  if (isObject(keyOrKeyCode) && keyOrKeyCode) {
    const parsedKey = parseKey(keyOrKeyCode.key);

    return {
      ...parsedKey,
      keyCode: keyOrKeyCode.keyCode
    };
  }

  throw new Error('keyboard.pressKey() requires a valid key or keyCode');
};

const parseKey = (keyStr: string): KeyOptions => {
  if (keyStr.indexOf('.') < 0 || '.' === keyStr) {
    return { key: keyStr, keyCode: false, modifiers: {} };
  }

  const keyParts = keyStr.split('.');
  const key = keyParts.pop() as string;
  const modifiers = keyParts.reduce(
    (mods, part) => {
      switch (part) {
        case 'control':
        case 'ctrl':
          mods.control = true;

          return mods;
        case 'shift':
          mods.shift = true;

          return mods;
        case 'alt':
          mods.alt = true;

          return mods;
        case 'meta':
        case 'cmd':
        case 'win':
          mods.meta = true;

          return mods;
        default:
          throw new Error(`invalid key modifier: ${part ? part : 'undefined'}, keyStr: ${keyStr}`);
      }
    },
    { alt: false, control: false, shift: false, meta: false }
  );

  return { key, keyCode: false, modifiers };
};
