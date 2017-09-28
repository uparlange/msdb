define(["AbstractDirective", "WindowRef", "AppUtils"],
	function (AbstractDirective, WindowRef, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractDirective,
			constructor: function ScrollToTopDirective(WindowRef) {
				AbstractDirective.call(this);
				this._window = WindowRef.nativeWindow;
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
					const cosParameter = this._window.scrollY / 2;
					let scrollCount = 0;
					let oldTimestamp = performance.now();
					const step = (newTimestamp) => {
						scrollCount += Math.PI / (this._scrollDuration / (newTimestamp - oldTimestamp));
						if (scrollCount >= Math.PI) {
							this._window.scrollTo(0, 0);
						}
						if (this._window.scrollY === 0) {
							return;
						}
						this._window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
						oldTimestamp = newTimestamp;
						this._window.requestAnimationFrame(step);
					}
					this._window.requestAnimationFrame(step);
				}
			}
		});
	}
);	