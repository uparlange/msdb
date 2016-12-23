define(["app:AbstractDirective"],
function(AbstractDirective) 
{
	return ng.core.Directive({
		selector: "[scrollToTop]"
	}).Class({
		extends:AbstractDirective,
		constructor: [ng.core.ElementRef, 
			function ScrollToTopDirective (ElementRef)
			{
				AbstractDirective.call(this);
				
				this._element = ElementRef.nativeElement;
				
				this._scrollDuration = 500;
				
				this._onClickHandler = () =>
				{
					const cosParameter = window.scrollY / 2;
					
					let scrollCount = 0;
					let oldTimestamp = performance.now();
					
					const step = (newTimestamp) =>
					{
						scrollCount += Math.PI / (this._scrollDuration / (newTimestamp - oldTimestamp));
						if (scrollCount >= Math.PI) 
						{
							window.scrollTo(0, 0);
						}
						if (window.scrollY === 0)
						{
							return;
						}
						window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
						oldTimestamp = newTimestamp;
						window.requestAnimationFrame(step);
					}
					
					window.requestAnimationFrame(step);
				};
			}
		],
		onInit : function()
		{
			this._element.addEventListener("click", this._onClickHandler);
		},
		onDestroy : function()
		{
			this._element.removeEventListener("click", this._onClickHandler);
		}
	});	
});	