define(["app:AbstractDirective"],
function(AbstractDirective)
{
	const VideoDirective = function (element)
	{
		AbstractDirective.call(this);
		
		this._element = element.nativeElement;
		
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
		onInit:function()
		{
			this._element.addEventListener("error", this._onEventHandler);
			this._element.addEventListener("loadedmetadata", this._onEventHandler);
		},
		onChanges: function (event)
		{
			if(event.hasOwnProperty("source"))
			{
				if(event.source.currentValue !== null && this._element.src !== event.source.currentValue)
				{
					this._element.src = event.source.currentValue;
				}
			}
		},
		onDestroy:function()
		{
			this._element.removeEventListener("error", this._onEventHandler);
			this._element.removeEventListener("loadedmetadata", this._onEventHandler);
		}
	});
});