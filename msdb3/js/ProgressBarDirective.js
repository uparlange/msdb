define(["app:AbstractDirective", "app:EventManager"], 
function(AbstractDirective, EventManager) 
{
	return ng.core.Directive({
		selector: "md-progress-bar"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, EventManager, 
			function ProgressBarDirective (ElementRef, EventManager)
			{
				AbstractDirective.call(this);
				
				this._element = ElementRef.nativeElement;
				this._eventManager = EventManager;
				
				this._httpBegintEventEmitter = null;
				this._httpEndEventEmitter = null;
				
				this._counter = 0;
			}
		],
		onInit : function()
		{
			this._element.style.display = "none";
			
			this._httpBegintEventEmitter = this._eventManager.on("HTTP_BEGIN").subscribe(() =>
			{
				this._counter++;
				
				this._element.style.display = "block";
			});
			
			this._httpEndEventEmitter = this._eventManager.on("HTTP_END").subscribe(() =>
			{
				this._counter--;
				
				if(this._counter === 0)
				{
					this._element.style.display = "none";
				}
			});
		},
		onDestroy : function()
		{
			this._eventManager.off(this._httpBegintEventEmitter);
			this._eventManager.off(this._httpEndEventEmitter);
		}
	});	
});	