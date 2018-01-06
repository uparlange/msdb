define(["AbstractDirective", "AbstractClassHelper", "AppUtils"],
	function (AbstractDirective, AbstractClassHelper, AppUtils) {
		return AppUtils.getClass({
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
					this.getEventBus().off(this._httpBegintEventEmitter);
					this.getEventBus().off(this._httpEndEventEmitter);
				},
				_hide: function () {
					this.display = "none";
				},
				_show: function () {
					this.display = "block";
				}
			}
		});
	}
);	