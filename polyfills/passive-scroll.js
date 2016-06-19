(function() {
	var originalAddEventListener = EventTarget.prototype.addEventListener;
	EventTarget.prototype.addEventListener = function(type, listener, options) {
		if(type === 'scroll' && typeof options !== 'object') options = { passive: true };
		originalAddEventListener.call(this, type, listener, options);
	};
})();
