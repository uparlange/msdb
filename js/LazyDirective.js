define(["app:AbstractDirective", "app:LazyManager"], 
function(AbstractDirective, LazyManager) 
{
	const LazyDirective = function (element, LazyManager)
	{
		AbstractDirective.call(this);
		
		this._element = element.nativeElement;
		
		this._blazyManager = LazyManager;
	};
	
	return ng.core.Directive({
		selector: "[lazySrc]",
		inputs: ["lazySrc"]
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, LazyManager, LazyDirective],
		onInit:function()
		{
			this._element.classList.add("b-lazy");
			this._element.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
		},
		onChanges: function (event)
		{
			if(event.hasOwnProperty("lazySrc"))
			{
				const lazySrc = event.lazySrc.currentValue || null;
				if(lazySrc !== null && this._element.src !== lazySrc)
				{
					this._element.dataset.src = lazySrc;
					
					this._blazyManager.register(this._element);
				}
			}
		},
		onDestroy: function()
		{
			this._blazyManager.unRegister(this._element);
		}
	});
});