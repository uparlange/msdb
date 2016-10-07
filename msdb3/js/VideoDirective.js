define(["EventManager"],
function(EventManager) 
{
	return ng.core.Directive({
		selector: "video",
		inputs:["source"],
		outputs:["onEvent"]
	}).Class({
		constructor: [ng.core.ElementRef, EventManager,
			function (element, eventManager)
			{
				this.onEvent = new ng.core.EventEmitter();
				
				this._element = element;
				this._eventManager = eventManager;
				
				this._loading = false;
				
				this._onEventHandler = (event) =>
				{
					if(event.type === "error" || event.type === "loadedmetadata")
					{
						this._loading = false;
						
						this._eventManager.emit("HTTP_END");
					}
					
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
				if(event.source.currentValue !== null)
				{
					element.src = event.source.currentValue;
					
					this._loading = true;
					
					this._eventManager.emit("HTTP_BEGIN");
				}
			}
		},
		ngOnDestroy:function()
		{
			const element = this._element.nativeElement;
			
			element.removeEventListener("error", this._onEventHandler);
			element.removeEventListener("loadedmetadata", this._onEventHandler);
			
			if(this._loading)
			{
				this._eventManager.emit("HTTP_END");
			}
		}
	});
});