const registerServiceWorker = async () => {
    if (!navigator.serviceWorker) {
        console.log('serviceWorker is not supported.');
        return;
    } else {
        console.log('install start.');
        return await navigator.serviceWorker.register('./js/workers/serviceWorker.js');
    }
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    return permission === 'granted';
}

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

const run = async () => {
    const serviceWorkerRegistration = await registerServiceWorker();
    if (!serviceWorkerRegistration instanceof ServiceWorkerRegistration) {
        console.error(serviceWorkerRegistration);
        return;
    }
    const serviceWorker = serviceWorkerRegistration.installing
        || serviceWorkerRegistration.waiting
        || serviceWorkerRegistration.active;
    console.log('serviceWorker installed.', serviceWorker);
    console.log(serviceWorker.scriptURL, serviceWorker.state);

    const isNotifiable = await requestNotificationPermission();
    if (!isNotifiable) {
        console.log('notification is disable.');
    }
    showLocalNotification('something happened!', 'check it!', serviceWorkerRegistration);
}

window.onload = run;