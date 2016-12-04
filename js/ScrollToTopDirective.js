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
				
				this._onClickHandler = () =>
				{
					window.scrollTo(0,0);
				};
			}
		],
		onInit : function()
		{
			this._element.addEventListener("click", this._onClickHandler);
		},
		onDestroy : function()
		{
			this._element.removeEventListener("click", this._onClickHandler);
		}
	});	
});	