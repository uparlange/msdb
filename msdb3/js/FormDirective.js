/*jshint scripturl:true*/
define(["app:AbstractDirective"],
function(AbstractDirective)
{
	return ng.core.Directive({
		selector: "form"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, 
			function FormDirective (ElementRef)
			{
				AbstractDirective.call(this);
				
				this._element = ElementRef.nativeElement;
			}
		],
		onInit:function()
		{
			this._element.action = "javascript:void(0);";
		}
	});
});