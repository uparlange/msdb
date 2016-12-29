define(["app:AbstractDirective", "app:EventManager"], 
function(AbstractDirective, EventManager) 
{
	return ng.core.Directive({
		selector: "md-progress-bar"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, ng.core.Renderer, EventManager, 
			function ProgressBarDirective (ElementRef, Renderer, EventManager)
			{
				AbstractDirective.call(this);
				
				this._element = ElementRef.nativeElement;
				this._renderer = Renderer;
				this._eventManager = EventManager;
				
				this._httpBegintEventEmitter = null;
				this._httpEndEventEmitter = null;
				
				this._counter = 0;
			}
		],
		onInit : function()
		{
			this._hide();
			
			this._httpBegintEventEmitter = this._eventManager.on("HTTP_BEGIN").subscribe(() =>
			{
				this._counter++;
				
				this._show();
			});
			
			this._httpEndEventEmitter = this._eventManager.on("HTTP_END").subscribe(() =>
			{
				this._counter--;
				
				if(this._counter === 0)
				{
					this._hide();
				}
			});
		},
		onDestroy : function()
		{
			this._eventManager.off(this._httpBegintEventEmitter);
			this._eventManager.off(this._httpEndEventEmitter);
		},
		_hide:function()
		{
			this._renderer.setElementStyle(this._element, "display", "none");
		},
		_show:function()
		{
			this._renderer.setElementStyle(this._element, "display", "block");
		}
	});	
});	