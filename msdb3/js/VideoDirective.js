define(["app:AbstractDirective"],
function(AbstractDirective)
{
	const VideoDirective = function (element)
	{
		AbstractDirective.call(this, element);
		
		this.onEvent = new ng.core.EventEmitter();
		
		this._onEventHandler = (event) =>
		{
			this.onEvent.emit(event);
		};
	};
	
	return ng.core.Directive({
		selector: "video",
		inputs:["source"],
		outputs:["onEvent"]
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, VideoDirective],
		onInit:function(element)
		{
			element.addEventListener("error", this._onEventHandler);
			element.addEventListener("loadedmetadata", this._onEventHandler);
		},
		onChanges: function (element, event)
		{
			if(event.hasOwnProperty("source"))
			{
				if(event.source.currentValue !== null && element.src !== event.source.currentValue)
				{
					element.src = event.source.currentValue;
				}
			}
		},
		onDestroy:function(element)
		{
			element.removeEventListener("error", this._onEventHandler);
			element.removeEventListener("loadedmetadata", this._onEventHandler);
		}
	});
});