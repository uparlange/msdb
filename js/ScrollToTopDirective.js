define(["AbstractDirective", "AbstractClassHelper", "AppUtils"],
	function (AbstractDirective, AbstractClassHelper, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractDirective,
			constructor: function ScrollToTopDirective(AbstractClassHelper) {
				AbstractDirective.call(this, AbstractClassHelper);
				this._scrollDuration = 500;
			},
			parameters: [
				[AbstractClassHelper]
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
					const cosParameter = this.getWindowRef().getScrollPosition().y / 2;
					let scrollCount = 0;
					let oldTimestamp = performance.now();
					const step = (newTimestamp) => {
						scrollCount += Math.PI / (this._scrollDuration / (newTimestamp - oldTimestamp));
						if (scrollCount >= Math.PI) {
							this.getWindowRef().scrollTo(0, 0);
						}
						if (this.getWindowRef().getScrollPosition().y === 0) {
							return;
						}
						this.getWindowRef().scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
						oldTimestamp = newTimestamp;
						this.getWindowRef().nativeWindow.requestAnimationFrame(step);
					}
					this.getWindowRef().nativeWindow.requestAnimationFrame(step);
				}
			}
		});
	}
);	