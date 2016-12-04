define(["app:AbstractDirective"],
function(AbstractDirective) 
{
	return ng.core.Directive({
		selector: "[scrollToTop]"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, 
			function ScrollToTopDirective (ElementRef)
			{
				AbstractDirective.call(this);
				
				this._element = ElementRef.nativeElement;
			}
		],
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