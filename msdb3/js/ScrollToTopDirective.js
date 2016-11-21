define(["app:AbstractDirective"],
function(AbstractDirective) 
{
	const ScrollToTopDirective = function (element)
	{
		AbstractDirective.call(this, element);
		
		this._element = element.nativeElement;
	};
	
	return ng.core.Directive({
		selector: "[scrollToTop]"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, ScrollToTopDirective],
		onInit : function()
		{
			this._clickHandler = function()
			{
				window.scrollTo(0,0);
			};
			
			this._element.addEventListener("click", this._clickHandler);
		},
		onDestroy : function()
		{
			this._element.removeEventListener("click", this._clickHandler);
		}
	});	
});	