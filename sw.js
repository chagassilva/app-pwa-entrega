const CACHE_NAME = "tld-entregas-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  // Adicione aqui imagens de logo locais se tiver
];

// Instalação do Service Worker (Guarda os arquivos no celular)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)),
  );
});

// Intercepta requisições de rede
self.addEventListener("fetch", (event) => {
  // Para chamadas da API do n8n, NÃO usa cache, tenta a rede direto
  if (event.request.url.includes("webhook")) {
    return;
  }

  // Para o HTML e layout, tenta a rede, se falhar (offline), puxa do cache
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    }),
  );
});
