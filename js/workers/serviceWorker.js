const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
}

self.addEventListener('install', (event) => {
    console.log('installed.');
    event.waitUntill(addResourcesToCache([
        // resource files to cache here.
    ]));
});