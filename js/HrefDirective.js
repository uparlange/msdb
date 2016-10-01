define(function () 
{
	return ng.core.Directive({
		selector: "[href]"
	}).Class({
		constructor: [ng.core.ElementRef,
			function (element)
			{
				this._element = element;
			}
		],
		ngOnInit: function ()
		{
			const element = this._element.nativeElement;
			
			element.addEventListener("click", (e) => 
			{
				if(window.location.href.indexOf(e.target.href) !== -1)
				{
					e.preventDefault();
				}	
			});
		},
		ngOnDestroy:function()
		{
			const element = this._element.nativeElement;
			
			element.removeEventListener("click");
		}
	}); 
});