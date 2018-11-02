export function query(selector: string, parent?) {
  return (parent || document).querySelector(selector);
}

export function queryAll(selector: string, parent?) {
  return (parent || document).querySelectorAll(selector);
}
