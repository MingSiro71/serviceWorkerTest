const installServiceWorker = () => {
    if (!navigator.serviceWorker) {
        console.log('serviceWorker is not supported.');
    } else {
        console.log('install start.');
        navigator.serviceWorker.register('./js/workers/serviceWorker.js')
            .then(
                () => {
                    console.log('serviceWorker installed.');
                },
                (error) => {
                    console.error(error);
                }
            );
    }
}

