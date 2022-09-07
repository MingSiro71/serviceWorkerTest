console.log('service worker is read.');

const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
}

self.addEventListener('install', (event) => {
    console.log('installed.');
    event.waitUntil(self.skipWaiting());
    // event.waitUntil(addResourcesToCache([
    //     // resource files to cache here.
    // ]));
});

self.addEventListener('activate', async (event) => {
    console.log('activated.');
    event.waitUntil(self.clients.claim());
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

self.addEventListener('message', (event) => {
    console.debug(event.data.type);
    if (event.data.type === 'PING') {
        console.log('send notification.');
        showLocalNotification('something happened!', 'check it!', self.registration);
        self.clients.matchAll({
            includeUncontrolled: true,
            type: 'window', 
        }).then((clients) => {
            if (!clients) {
                return;
            }
            clients.map((client) => {
                console.log(client);
                client.postMessage({
                    type: 'PONG',
                    time: Date.now(),
                })
            })
        });
    } else if (event.data.type === 'REQUIRE_CLAME') {
        console.log('require clame', self.clients);
        event.waitUntil(self.clients.claim());
    }
});
