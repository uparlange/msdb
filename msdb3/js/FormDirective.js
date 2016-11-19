define(["app:AbstractDirective"],
function(AbstractDirective)
{
	const FormDirective = function (element)
	{
		AbstractDirective.call(this, element);
	};
	
	return ng.core.Directive({
		selector: "form"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, FormDirective],
		onInit:function(element)
		{
			element.action = "javascript:void(0);";
		}
	});
});