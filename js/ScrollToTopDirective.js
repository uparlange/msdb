define(["AbstractDirective", "WindowRef", "AppUtils"],
	function (AbstractDirective, WindowRef, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractDirective,
			constructor: function ScrollToTopDirective(WindowRef) {
				AbstractDirective.call(this);
				this._windowRef = WindowRef;
				this._scrollDuration = 500;
			},
			parameters: [
				[WindowRef]
			],
			annotations: [
				new ng.core.Directive({
					selector: "[scrollToTop]",
					host: {
						"(click)": "onClick($event)"
					}
				})
			],
			functions: {
				onClick: function () {
					const cosParameter = this._windowRef.getScrollPosition().y / 2;
					let scrollCount = 0;
					let oldTimestamp = performance.now();
					const step = (newTimestamp) => {
						scrollCount += Math.PI / (this._scrollDuration / (newTimestamp - oldTimestamp));
						if (scrollCount >= Math.PI) {
							this._windowRef.scrollTo(0, 0);
						}
						if (this._windowRef.getScrollPosition().y === 0) {
							return;
						}
						this._windowRef.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
						oldTimestamp = newTimestamp;
						this._windowRef.nativeWindow.requestAnimationFrame(step);
					}
					this._windowRef.nativeWindow.requestAnimationFrame(step);
				}
			}
		});
	}
);	