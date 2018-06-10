import AbstractDirective from "./AbstractDirective.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class ProgressBarDirective extends AbstractDirective {
	static get annotations() {
		return this.getAnnotations({
			selector: "mat-progress-bar",
			host: {
				"[style.display]": "display"
			}
		});
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
		this._httpBegintEventEmitter = null;
		this._httpEndEventEmitter = null;
		this.display = "none";
		this._counter = 0;
	}
	onInit() {
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
	}
	onDestroy() {
		this._httpBegintEventEmitter.unsubscribe();
		this._httpEndEventEmitter.unsubscribe();
	}
	_hide() {
		this.display = "none";
	}
	_show() {
		this.display = "block";
	}
}

export default ProgressBarDirective;