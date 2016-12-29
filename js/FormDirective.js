define(["app:AbstractDirective"],
function(AbstractDirective)
{
	return ng.core.Directive({
		selector: "form"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, ng.core.Renderer,
			function FormDirective (ElementRef, Renderer)
			{
				AbstractDirective.call(this);
				
				this._element = ElementRef.nativeElement;
				this._renderer = Renderer;
			}
		],
		onInit:function()
		{
			this._renderer.setElementProperty(this._element, "action", "javascript:void(0);");
		}
	});
});