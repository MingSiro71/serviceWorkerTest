console.log('service worker is read.');

const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
}

self.addEventListener('install', (event) => {
    console.log('installed.');
    event.waitUntil(addResourcesToCache([
        // resource files to cache here.
    ]));
});

self.addEventListener('activate', async (_) => {
    console.log('activated.');
    try {
        const options = {}
        const subscription = await self.registration.pushManager.subscribe(options)
        console.log(JSON.stringify(subscription));
        showLocalNotification('something happened!', 'check it!', self.registration);
      } catch (error) {
        console.log(error)
      }
});

const showLocalNotification = (title, body, serviceWorkerRegistration) => {
    serviceWorkerRegistration.showNotification(title, {
        body,
        // icon,
        // image,
        // badge,
        // vibrate,
        // sound,
        dir: 'auto',
        // tag,
        // data,
        // requireInteraction,
        // renotify",
        // silent,
        // actions,
        // timestamp,
    });
}
