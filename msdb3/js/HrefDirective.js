define(["app:AbstractDirective", "app:RouterManager"], 
function(AbstractDirective, RouterManager) 
{
	return ng.core.Directive({
		selector: "[href]"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, RouterManager,
			function HrefDirective (ElementRef, RouterManager)
			{
				AbstractDirective.call(this);
				
				this._element = ElementRef.nativeElement;
				this._routerManager = RouterManager;
				
				this._onClickHandler = () =>
				{
					this._routerManager.saveCurrentViewScrollPosition();
				};
			}
		],
		onInit:function()
		{
			this._element.addEventListener("click", this._onClickHandler);
		},
		onDestroy:function()
		{
			this._element.removeEventListener("click", this._onClickHandler);
		}
	});
});