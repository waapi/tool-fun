




/*
Snippet

Mousewheel Gesture for Timelines
function(event) {
	var vertical = event.shiftKey && (event.wheelDeltaY || Math.abs(event.wheelDeltaX) === 120);
	var horizontal = Math.abs(event.wheelDeltaX) > Math.abs(event.wheelDeltaY) && !event.shiftKey;
	if(vertical) this._scroller.scrollTop -= (event.wheelDeltaY || event.wheelDeltaX) / 120 * this._root.offsetHeight / 8;
	else if(horizontal)
	{
		var shift = -event.wheelDeltaX * this._pixelToTime;
		this.handlePanGesture(shift);
	}
	else
	{
		var zoomSpeed = 1 / 120;
		this.handleZoomGesture(
			Math.pow(1.2, -(event.wheelDeltaY || event.wheelDeltaX) * zoomSpeed) - 1
		);
	}
}




_onMouseWheel: function(e) {
	var panVertically = e.shiftKey && (e.wheelDeltaY || Math.abs(e.wheelDeltaX) === 120);
	var panHorizontally = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) && !e.shiftKey;
	if (panVertically) {
		this._vScrollElement.scrollTop -= (e.wheelDeltaY || e.wheelDeltaX) / 120 * this._offsetHeight / 8;
	} else if (panHorizontally) {
		var shift = -e.wheelDeltaX * this._pixelToTime;
		this._muteAnimation = true;
		this._handlePanGesture(shift);
		this._muteAnimation = false;
	} else {
		const mouseWheelZoomSpeed = 1 / 120;
		this._handleZoomGesture(Math.pow(1.2, -(e.wheelDeltaY || e.wheelDeltaX) * mouseWheelZoomSpeed) - 1);
	}
	e.consume(true);
},

*/
