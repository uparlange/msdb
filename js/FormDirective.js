define(["app:AbstractDirective"],
function(AbstractDirective)
{
	const FormDirective = function (element)
	{
		AbstractDirective.call(this);
		
		this._element = element.nativeElement;
	};
	
	return ng.core.Directive({
		selector: "form"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, FormDirective],
		onInit:function()
		{
			this._element.action = "javascript:void(0);";
		}
	});
});