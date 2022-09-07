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
    console.log(permission);
    if (!permission) {
        throw new Error('notification not permitted.')
    }
    return permission;
}

const run = async () => {
    const serviceWorkerRegistration = await registerServiceWorker();
    if (!serviceWorkerRegistration instanceof ServiceWorkerRegistration) {
        console.error(serviceWorkerRegistration);
        return;
    }
    const serviceWorker = registration.installing || registration.waiting || registration.active;
    console.log('serviceWorker installed.', serviceWorker);
    console.log(serviceWorker.scriptURL, serviceWorker.state);

    const permission = await requestNotificationPermission();
}

document.onload = run;