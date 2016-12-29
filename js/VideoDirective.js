define(["app:AbstractDirective"],
function(AbstractDirective)
{
	return ng.core.Directive({
		selector: "video",
		inputs:["source"],
		outputs:["onEvent"]
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, ng.core.Renderer,
			function VideoDirective (ElementRef, Renderer)
			{
				AbstractDirective.call(this);
				
				this._element = ElementRef.nativeElement;
				this._renderer = Renderer;
				
				this.onEvent = new ng.core.EventEmitter();

				this._elementErrorHandler = null;
				this._elementLoadedmetadataHandler = null;
				
				this._onElementEventHandler = (event) =>
				{
					this.onEvent.emit(event);
				};
			}
		],
		onInit:function()
		{
			this._elementErrorHandler = this._renderer.listen(this._element, "error", this._onElementEventHandler);
			this._elementLoadedmetadataHandler = this._renderer.listen(this._element, "loadedmetadata", this._onElementEventHandler);
		},
		onChanges: function (event)
		{
			if(event.hasOwnProperty("source"))
			{
				if(typeof event.source.currentValue === "string")
				{
					this._renderer.setElementProperty(this._element, "src", event.source.currentValue);
				}
			}
		},
		onDestroy:function()
		{
			this._elementErrorHandler();
			this._elementLoadedmetadataHandler();
		}
	});
});