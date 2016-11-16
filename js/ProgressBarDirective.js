define(["app:AbstractDirective", "app:EventManager"], 
function(AbstractDirective, EventManager) 
{
	const ProgressBarDirective = function (element, eventManager)
	{
		AbstractDirective.call(this, element);
		
		this._eventManager = eventManager;
		
		this._httpBegintEventEmitter = null;
		this._httpEndEventEmitter = null;
		
		this._counter = 0;
	};
	
	return ng.core.Directive({
		selector: "md-progress-bar"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, EventManager, ProgressBarDirective],
		onInit : function(element)
		{
			element.style.display = "none";
			
			this._httpBegintEventEmitter = this._eventManager.on("HTTP_BEGIN").subscribe(() =>
			{
				this._counter++;
				
				element.style.display = "block";
			});
			
			this._httpEndEventEmitter = this._eventManager.on("HTTP_END").subscribe(() =>
			{
				this._counter--;
				
				if(this._counter === 0)
				{
					element.style.display = "none";
				}
			});
		},
		onDestroy : function(element)
		{
			this._eventManager.off(this._httpBegintEventEmitter);
			this._eventManager.off(this._httpEndEventEmitter);
		}
	});	
});	