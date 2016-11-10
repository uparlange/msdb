define(["app:LazyManager"], 
function(LazyManager) 
{
	return ng.core.Directive({
		selector: "[lazySrc]",
		inputs: ["lazySrc"]
	}).Class({
		constructor: [ng.core.ElementRef, LazyManager,
			function (element, LazyManager)
			{
				this._element = element;
				
				this._blazyManager = LazyManager;
			}
		],
		ngOnInit:function()
		{
			const element = this._element.nativeElement;
			
			element.classList.add("b-lazy");
			element.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
		},
		ngOnChanges: function (event)
		{
			const element = this._element.nativeElement;
			
			if(event.hasOwnProperty("lazySrc"))
			{
				const lazySrc = event.lazySrc.currentValue || null;
				if(lazySrc !== null && element.src !== lazySrc)
				{
					element.dataset.src = lazySrc;
					
					this._blazyManager.register(element);
				}
			}
		},
		ngOnDestroy:function()
		{

		}
	});
});