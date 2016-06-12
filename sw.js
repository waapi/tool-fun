importScripts('localForage.js');

self.addEventListener('install', function(event) {
	event.waitUntil(self.skipWaiting()); // Go straight from 'installed' to 'activated'
});

self.addEventListener('activate', function(event) {
	event.waitUntil(self.clients.claim()); // Claim clients immediately, without having to reload
});

self.addEventListener('fetch', function(event) {
	const url = new URL(event.request.url);
	
	if(url.origin === location.origin)
	{
		if(url.pathname.startsWith('/live/'))
		{
			handleLiveCoding(event);
		}
	}
	
	// if(url.pathname.endsWith('.jpg'))
	// {
	// 	event.respondWith(
	// 		fetch('/cat.jpg')
	// 	);
	// }
	// 
	// 
	// event.respondWith(
	// 	fetch(event.request)
	// 	.then(response => {
	// 		if(response.status === 404) {
	// 			return fetch('/404.svg');
	// 		}
	// 		
	// 		return response;
	// 	})
	// )
	// 
	// 
	// event.respondWith(
	// 	new Response('Hello')
	// );
	
});



function handleLiveCoding(event) {
	const url = new URL(event.request.url);
	var path = url.pathname.replace('/live', '');
	event.respondWith(
		localforage.getItem(path)
		.then(content => {
			if(!content)
			{
				return new Response('404 File not found', { status: 404 });
			}
			
			if(content instanceof Blob)
			{
				return new Response(content);
			}
			
			else if(typeof content === 'string')
			{
				var mimeType = 'text/plain; charset=UTF-8';
				if(path.endsWith('.html')) mimeType = 'text/html; charset=UTF-8';
				else if(path.endsWith('.css')) mimeType = 'text/css; charset=UTF-8';
				else if(path.endsWith('.js')) mimeType = 'application/javascript; charset=UTF-8';
				
				// Just exit for now, need to write full mimetype list I guess?
				// Although others ought to be served as blobs, which come with types?
				if(!mimeType) return new Response('501 Unknown Mime Type', { status: 501 });
				
				return new Response(content, {
					headers: { 'Content-Type': mimeType }
				});
			}
		})
	);
}
