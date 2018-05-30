import AppUtils from "./AppUtils.js";
import AbstractDirective from "./AbstractDirective.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

export default AppUtils.getClass({
	extends: AbstractDirective,
	constructor: function ProgressBarDirective(AbstractClassHelper) {
		AbstractDirective.call(this, AbstractClassHelper);
		this._httpBegintEventEmitter = null;
		this._httpEndEventEmitter = null;
		this.display = "none";
		this._counter = 0;
	},
	parameters: [
		[AbstractClassHelper]
	],
	annotations: [
		new ng.core.Directive({
			selector: "mat-progress-bar",
			host: {
				"[style.display]": "display"
			}
		})
	],
	functions: {
		onInit: function () {
			this._hide();
			this._httpBegintEventEmitter = this.getEventBus().on("HTTP_BEGIN").subscribe(() => {
				this._counter++;
				this._show();
			});
			this._httpEndEventEmitter = this.getEventBus().on("HTTP_END").subscribe(() => {
				this._counter--;
				if (this._counter === 0) {
					this._hide();
				}
			});
		},
		onDestroy: function () {
			this._httpBegintEventEmitter.unsubscribe();
			this._httpEndEventEmitter.unsubscribe();
		},
		_hide: function () {
			this.display = "none";
		},
		_show: function () {
			this.display = "block";
		}
	}
});