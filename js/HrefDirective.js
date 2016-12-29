define(["app:AbstractDirective", "app:RouterManager"], 
function(AbstractDirective, RouterManager) 
{
	return ng.core.Directive({
		selector: "[href]"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, ng.core.Renderer, RouterManager,
			function HrefDirective (ElementRef, Renderer, RouterManager)
			{
				AbstractDirective.call(this);
				
				this._element = ElementRef.nativeElement;
				this._renderer = Renderer;
				this._routerManager = RouterManager;

				this._elementClickHandler = null;
				
				this._onElementClickHandler = () =>
				{
					this._routerManager.saveCurrentViewScrollPosition();
				};
			}
		],
		onInit:function()
		{
			this._elementClickHandler = this._renderer.listen(this._element, "click", this._onElementClickHandler);
		},
		onDestroy:function()
		{
			this._elementClickHandler();
		}
	});
});