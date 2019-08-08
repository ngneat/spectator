/**
 * @deprecated Deprecated in favour of Spectator query methods and Spectator custom matchers
 *
 * To be removed in v4
 */
export function query(selector: string, parent?) {
  return (parent || document).querySelector(selector);
}

/**
 * @deprecated Deprecated in favour of Spectator query methods and Spectator custom matchers
 *
 * To be removed in v4
 */
export function queryAll(selector: string, parent?) {
  return (parent || document).querySelectorAll(selector);
}
