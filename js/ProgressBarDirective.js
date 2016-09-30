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
				
				this._httpBegintEventEmitter = new ng.core.EventEmitter();
				this._httpEndEventEmitter = new ng.core.EventEmitter();
			}
		],
		ngOnInit : function()
		{
			const element = this._element.nativeElement;
			element.style.display = "none";
			
			this._eventManager.on("HTTP_BEGIN", this._httpBegintEventEmitter).subscribe(() =>
			{
				element.style.display = "block";
			});
			
			this._eventManager.on("HTTP_END", this._httpEndEventEmitter).subscribe(() =>
			{
				element.style.display = "none";
			});
		},
		ngOnDestroy : function()
		{
			this._eventManager.off("HTTP_BEGIN", this._httpBegintEventEmitter).unsubscribe();
			this._eventManager.off("HTTP_END", this._httpEndEventEmitter).unsubscribe();
		}
	});	
});	