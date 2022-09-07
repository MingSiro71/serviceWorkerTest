const checkRequirements = () => {
    if (!navigator.serviceWorker) {
        throw new Error('serviceWorker is not supported.');
    }
    if (!window.PushManager) {
        throw new Error('Push API is not supported.');
    }
}

const registerServiceWorker = async () => {
    console.log('install start.');
    return await navigator.serviceWorker.register('serviceWorker.js');
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    return permission === 'granted';
}

// const showLocalNotification = (title, body, serviceWorkerRegistration) => {
//     serviceWorkerRegistration.showNotification(title, {
//         body,
//         // icon,
//         // image,
//         // badge,
//         // vibrate,
//         // sound,
//         dir: 'auto',
//         // tag,
//         // data,
//         // requireInteraction,
//         // renotify",
//         // silent,
//         // actions,
//         // timestamp,
//     });
// }

const enablePushService = async () => {
    checkRequirements();

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
    if (!navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(() => {
            serviceWorker.postMessage({
                type: 'REQUIRE_CLAME'
            });
        });
    }
}

const communicateServiceWorker = () => {
    console.log(navigator.serviceWorker);
    if (!navigator.serviceWorker.controller) {
        return;
    }
    navigator.serviceWorker.controller.postMessage({
        type: 'PING'
    });
}

navigator.serviceWorker.onmessage = (event) => {
    console.log(event);
}
