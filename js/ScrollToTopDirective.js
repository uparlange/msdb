define(function() 
{
	return ng.core.Directive({
		selector: "[scrollToTop]"
	}).Class({
		constructor: [ng.core.ElementRef,
			function (element)
			{
				this._element = element;
			}
		],
		ngOnInit : function()
		{
			const element = this._element.nativeElement;
			
			this._clickHandler = function()
			{
				window.scrollTo(0,0);
			};
			
			element.addEventListener("click", this._clickHandler);
		},
		ngOnDestroy : function()
		{
			const element = this._element.nativeElement;
			
			element.removeEventListener("click", this._clickHandler);
		}
	});	
});	