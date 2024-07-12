self.addEventListener('message', function(e) {
  if (e.data === 'start') {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        self.postMessage({ lat: lat, lon: lon });
      }, function(error) {
        console.error('Erro ao obter localização no Worker:', error.message);
      }, { enableHighAccuracy: true });
    } else {
      console.error("Geolocalização não é suportada pelo navegador no Worker.");
    }
  }
});