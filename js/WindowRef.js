import AbstractClass from "./AbstractClass.js";

class WindowRef extends AbstractClass {
	constructor() {
		super();
		this.nativeWindow = window;
	}
	isInWebApp() {
		return (this._isInWebAppiOS() || this._isInWebAppChrome());
	}
	scrollTo(x, y) {
		this.nativeWindow.scrollTo(x, y);
	}
	getScrollPosition() {
		return {
			x: this.nativeWindow.pageXOffset,
			y: this.nativeWindow.pageYOffset
		}
	}
	_isInWebAppiOS() {
		return (this.nativeWindow.navigator.standalone == true);
	}
	_isInWebAppChrome() {
		return (this.nativeWindow.matchMedia('(display-mode: standalone)').matches);
	}
}

export default WindowRef;