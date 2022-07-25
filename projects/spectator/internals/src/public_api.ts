// This is a public API surface of @ngneat/spectator/internals. It's not intended to be used
// by consumers. Please, don't import anything from this entry-point.

// This is done to prevent tests, that are being run in a `fakeAsync` zone, from failing randomly.
// jQuery setups a timer internally if the `document.readyState` is `complete` by doing
// `window.setTimeout(jQuery.ready)` (see its source code). Unit tests might fail randomly that
// there're still timers in the queue, but the timer has been scheduled by jQuery, so we don't
// want to allow that to happen.
const patchedSetTimeout = window.setTimeout;
// The unpatched `setTimeout` can be retrieved through this property.
// We might have used `Zone.__symbol__('OriginalDelegate')`, which would also give us
// the current string, but accessing `Zone` requires messing up with types (like declaring it
// globally through `declare const Zone`). This is the safest way of doing that.
// This is done before importing jQuery since it will use the unpatched timer
// when its code is executed, which will not be captured by zone.js.
window.setTimeout = patchedSetTimeout['__zone_symbol__OriginalDelegate'] || patchedSetTimeout;

export function restoreSetTimeout() {
  window.setTimeout = patchedSetTimeout;
}
