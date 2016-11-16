define(["app:AbstractDirective"],
function(AbstractDirective) 
{
	const ScrollToTopDirective = function (element)
	{
		AbstractDirective.call(this, element);
	};
	
	return ng.core.Directive({
		selector: "[scrollToTop]"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, ScrollToTopDirective],
		onInit : function(element)
		{
			this._clickHandler = function()
			{
				window.scrollTo(0,0);
			};
			
			element.addEventListener("click", this._clickHandler);
		},
		onDestroy : function(element)
		{
			element.removeEventListener("click", this._clickHandler);
		}
	});	
});	