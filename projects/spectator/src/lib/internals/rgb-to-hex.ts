/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

/**
 *
 * @param hex
 * @returns
 */
export function hex2rgb(hex) {
  let h = hex.replace('#', '');
  h = h.match(new RegExp('(.{' + h.length / 3 + '})', 'g'));

  for (let i = 0; i < h.length; i++) {
    h[i] = parseInt(h[i].length === 1 ? h[i] + h[i] : h[i], 16);
  }

  return 'rgb(' + h.join(',') + ')';
}

/**
 *
 * @param value
 * @returns
 */
export function isHex(value: string) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

/**
 *
 * @param value
 * @returns
 */
export function trim(value: string) {
  return value.replace(/\s/g, '');
}
