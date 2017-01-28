define(["AbstractDirective", "WindowRef"],
function(AbstractDirective, WindowRef) 
{
	return ng.core.Directive({
		selector: "[scrollToTop]"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, ng.core.Renderer, WindowRef,
			function ScrollToTopDirective (ElementRef, Renderer, WindowRef)
			{
				AbstractDirective.call(this);
				
				this._element = ElementRef.nativeElement;
				this._renderer = Renderer;
				this._window = WindowRef.nativeWindow;
				
				this._elementClickHandler = null;

				this._scrollDuration = 500;
				
				this._onElementClickHandler = () =>
				{
					const cosParameter = this._window.scrollY / 2;
					
					let scrollCount = 0;
					let oldTimestamp = performance.now();
					
					const step = (newTimestamp) =>
					{
						scrollCount += Math.PI / (this._scrollDuration / (newTimestamp - oldTimestamp));
						if (scrollCount >= Math.PI) 
						{
							this._window.scrollTo(0, 0);
						}
						if (this._window.scrollY === 0)
						{
							return;
						}
						this._window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
						oldTimestamp = newTimestamp;
						this._window.requestAnimationFrame(step);
					}
					
					this._window.requestAnimationFrame(step);
				};
			}
		],
		onInit : function()
		{
			this._elementClickHandler = this._renderer.listen(this._element, "click", this._onElementClickHandler);
		},
		onDestroy : function()
		{
			this._elementClickHandler();
		}
	});	
});	