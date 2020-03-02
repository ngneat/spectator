export function isRunningInJsDom() {
  return navigator.userAgent.includes('Node.js') || navigator.userAgent.includes('jsdom');
}
