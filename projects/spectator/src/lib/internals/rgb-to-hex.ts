/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

export function hex2rgb(hex: string): string {
  const h = hex.replace('#', '');
  const matches = h.match(new RegExp('(.{' + h.length / 3 + '})', 'g'))!;
  const [r, g, b] = matches.map((match) => parseInt(match.length === 1 ? match + match : match, 16));

  return `rgb(${r},${g},${b})`;
}

export function isHex(value: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

export function trim(value: string): string {
  return (value || '').replace(/\s/g, '');
}
