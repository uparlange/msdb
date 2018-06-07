import AbstractDirective from "./AbstractDirective.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

class ScrollToTopDirective extends AbstractDirective {
	static get annotations() {
		return this.getAnnotations({
			selector: "[scrollToTop]",
			host: {
				"(click)": "onClick($event)"
			}
		});
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
		this._scrollDuration = 500;
	}
	onClick() {
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

export default ScrollToTopDirective;