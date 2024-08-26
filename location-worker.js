// location-worker.js

self.onmessage = function(e) {
    if (e.data === 'start') {
        // Configura um intervalo para obter a localização periodicamente
        setInterval(() => {
            // Obtém a localização do usuário
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                // Envia a localização de volta para o script principal
                self.postMessage({ lat: lat, lon: lon });
            });
        }, 5000); // Intervalo de 5 segundos (pode ser ajustado)
    }
};