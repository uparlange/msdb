define(["AbstractDirective", "LazyManager", "AppUtils"],
	function (AbstractDirective, LazyManager, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractDirective,
			constructor: function LazyDirective(LazyManager) {
				AbstractDirective.call(this);
				this._lazyManager = LazyManager;
				this.dataSrc = null;
				this.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
			},
			parameters: [
				[LazyManager]
			],
			annotations: [
				new ng.core.Directive({
					selector: "[lazySrc]",
					inputs: ["lazySrc"],
					host: {
						"[class.b-lazy]": "true",
						"[attr.src]": "src",
						"[attr.data-src]": "dataSrc"
					}
				})
			],
			functions: {
				onChanges: function (event) {
					if (event.hasOwnProperty("lazySrc")) {
						if (typeof event.lazySrc.currentValue === "string") {
							this.dataSrc = event.lazySrc.currentValue;
							this._lazyManager.refresh();
						}
					}
				}
			}
		});
	}
);