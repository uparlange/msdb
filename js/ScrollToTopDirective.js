define(["AbstractDirective", "WindowRef", "AppUtils"],
function(AbstractDirective, WindowRef, AppUtils) 
{
	const conf = AppUtils.getDirectiveConfiguration("[scrollToTop]", {
		host:{
			"(click)":"onClick($event)"
		}
	});

	return ng.core.Directive(conf).Class(
	{
		extends:AbstractDirective,
		constructor: [WindowRef,
			function ScrollToTopDirective (WindowRef)
			{
				AbstractDirective.call(this);
				
				this._window = WindowRef.nativeWindow;

				this._scrollDuration = 500;
			}
		],
		onClick:function()
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
		}
	});	
});	