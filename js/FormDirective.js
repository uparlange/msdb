define(["AbstractDirective", "AppUtils"],
function(AbstractDirective, AppUtils)
{
	const conf = AppUtils.getDirectiveConfiguration("form");

	return ng.core.Directive(conf).Class(
	{
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