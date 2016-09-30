define(["EventManager"], 
function(EventManager) 
{
	return ng.core.Directive({
		selector: "md-progress-bar"
	}).Class({
		constructor: [ng.core.ElementRef, EventManager,
			function (element, eventManager)
			{
				this._element = element;
				this._eventManager = eventManager;
				
				this._httpBegintEventEmitter = null;
				this._httpEndEventEmitter = null;
			}
		],
		ngOnInit : function()
		{
			const element = this._element.nativeElement;
			element.style.display = "none";
			
			this._httpBegintEventEmitter = this._eventManager.on("HTTP_BEGIN").subscribe(() =>
			{
				element.style.display = "block";
			});
			
			this._httpEndEventEmitter = this._eventManager.on("HTTP_END").subscribe(() =>
			{
				element.style.display = "none";
			});
		},
		ngOnDestroy : function()
		{
			this._eventManager.off(this._httpBegintEventEmitter);
			this._eventManager.off(this._httpEndEventEmitter);
		}
	});	
});	