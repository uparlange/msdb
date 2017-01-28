define(["AbstractDirective", "LazyManager"], 
function(AbstractDirective, LazyManager) 
{
	return ng.core.Directive({
		selector: "[lazySrc]",
		inputs: ["lazySrc"]
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, ng.core.Renderer, LazyManager, 
			function LazyDirective (ElementRef, Renderer, LazyManager)
			{
				AbstractDirective.call(this);
				
				this._element = ElementRef.nativeElement;
				this._renderer = Renderer;
				this._lazyManager = LazyManager;
			}
		],
		onInit:function()
		{
			this._renderer.setElementClass(this._element, "b-lazy", true);
			this._renderer.setElementProperty(this._element, "src", "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
		},
		onChanges: function (event)
		{
			if(event.hasOwnProperty("lazySrc"))
			{
				if(typeof event.lazySrc.currentValue === "string")
				{
					this._renderer.setElementAttribute(this._element, "data-src", event.lazySrc.currentValue);

					this._lazyManager.register(this._element);
				}
			}
		},
		onDestroy: function()
		{
			this._lazyManager.unRegister(this._element);
		}
	});
});