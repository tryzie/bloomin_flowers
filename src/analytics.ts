// Visitor statistics through GoatCounter (no cookies, no personal data).
// Does nothing until a GoatCounter code is set in src/config.ts.
declare global {
  interface Window {
    goatcounter?: { count: (o: { path: string; title?: string; event?: boolean }) => void };
  }
}

/** Record an action, e.g. track('add-to-basket', 'red-velvet-cloud'). */
export function track(action: string, detail?: string) {
  try {
    window.goatcounter?.count({ path: detail ? `${action}/${detail}` : action, title: action, event: true });
  } catch {
    /* statistics must never break the shop */
  }
}
