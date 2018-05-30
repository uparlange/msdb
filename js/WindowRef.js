import AppUtils from "./AppUtils.js";
import AbstractClass from "./AbstractClass.js";

export default AppUtils.getClass({
	extends: AbstractClass,
	constructor: function WindowRef() {
		AbstractClass.call(this);
		this.nativeWindow = window;
	},
	functions: {
		isInWebApp: function () {
			return (this._isInWebAppiOS() || this._isInWebAppChrome());
		},
		scrollTo: function (x, y) {
			this.nativeWindow.scrollTo(x, y);
		},
		getScrollPosition: function () {
			return {
				x: this.nativeWindow.pageXOffset,
				y: this.nativeWindow.pageYOffset
			}
		},
		_isInWebAppiOS: function () {
			return (this.nativeWindow.navigator.standalone == true);
		},
		_isInWebAppChrome: function () {
			return (this.nativeWindow.matchMedia('(display-mode: standalone)').matches);
		}
	}
});