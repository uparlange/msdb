define(function() 
{
	return ng.core.Directive({
		selector: "video",
		inputs:["source"],
		outputs:["onEvent"]
	}).Class({
		constructor: [ng.core.ElementRef,
			function (element)
			{
				this.onEvent = new ng.core.EventEmitter();
				
				this._element = element;
				
				this._onEventHandler = (event) =>
				{
					this.onEvent.emit(event);
				};
			}
		],
		ngOnInit:function()
		{
			const element = this._element.nativeElement;
			
			element.addEventListener("error", this._onEventHandler);
			element.addEventListener("loadedmetadata", this._onEventHandler);
		},
		ngOnChanges: function (event)
		{
			const element = this._element.nativeElement;
			
			if(event.hasOwnProperty("source"))
			{
				if(event.source.currentValue !== null && element.src !== event.source.currentValue)
				{
					element.src = event.source.currentValue;
				}
			}
		},
		ngOnDestroy:function()
		{
			const element = this._element.nativeElement;
			
			element.removeEventListener("error", this._onEventHandler);
			element.removeEventListener("loadedmetadata", this._onEventHandler);
		}
	});
});