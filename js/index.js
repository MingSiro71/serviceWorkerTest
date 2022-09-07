const installServiceWorker = () => {
    if (!navigator.serviceWorker) {
        console.log('serviceWorker is not supported.');
    } else {
        console.log('install start.');
        navigator.serviceWorker.register('./js/workers/serviceWorker.js')
            .then(
                (registration) => {
                    const serviceWorker = registration.installing || registration.waiting || registration.active;
                    console.log('serviceWorker installed.', serviceWorker);
                },
                (error) => {
                    console.error(error);
                }
            );
    }
}

window.onload = installServiceWorker;
