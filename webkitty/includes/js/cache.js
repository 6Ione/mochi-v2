// Mochi integration: caching is optional and must never block initial loading.
// The upstream automatic AppCache redirect could loop forever on PS4 when
// caching failed or the browser reported UNCACHED on each reload.
// The WebKitty "Update cache" button still opens ./cache.html manually.
function terminateCache() {
    if (!window.applicationCache) return;
    try {
        if (window.applicationCache.status === window.applicationCache.DOWNLOADING ||
            window.applicationCache.status === window.applicationCache.CHECKING) {
            if (typeof window.applicationCache.abort === 'function') window.applicationCache.abort();
        }
    } catch (e) { console.log('Cache termination skipped:', e); }
}
