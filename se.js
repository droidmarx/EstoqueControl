const CACHE_NAME = "estoque-control-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css", // Adicione os arquivos CSS
  "/script.js", // Adicione os arquivos JS
  "/logo.png"  // Se houver uma logo
];

// Instalando o Service Worker e armazenando os arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Interceptando requisições para servir do cache quando offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Atualizando o cache quando há uma nova versão do Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});