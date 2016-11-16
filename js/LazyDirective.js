define(["app:AbstractDirective", "app:LazyManager"], 
function(AbstractDirective, LazyManager) 
{
	const LazyDirective = function (element, LazyManager)
	{
		AbstractDirective.call(this, element);
		
		this._blazyManager = LazyManager;
	};
	
	return ng.core.Directive({
		selector: "[lazySrc]",
		inputs: ["lazySrc"]
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, LazyManager, LazyDirective],
		onInit:function(element)
		{
			element.classList.add("b-lazy");
			element.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
		},
		onChanges: function (element, event)
		{
			if(event.hasOwnProperty("lazySrc"))
			{
				const lazySrc = event.lazySrc.currentValue || null;
				if(lazySrc !== null && element.src !== lazySrc)
				{
					element.dataset.src = lazySrc;
					
					this._blazyManager.register(element);
				}
			}
		}
	});
});