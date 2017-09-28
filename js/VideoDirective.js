define(["AbstractDirective", "AppUtils"],
	function (AbstractDirective, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractDirective,
			constructor: function VideoDirective() {
				AbstractDirective.call(this);
				this.onEvent = new ng.core.EventEmitter();
				this.src = undefined;
			},
			annotations: [
				new ng.core.Directive({
					selector: "video",
					inputs: ["source"],
					outputs: ["onEvent"],
					host: {
						"[attr.src]": "src",
						"(error)": "onError($event)",
						"(loadedmetadata)": "onLoadedmetadata($event)"
					}
				})
			],
			functions: {
				onError: function (event) {
					this.onEvent.emit(event);
				},
				onLoadedmetadata: function (event) {
					this.onEvent.emit(event);
				},
				onChanges: function (event) {
					if (event.hasOwnProperty("source")) {
						if (typeof event.source.currentValue === "string") {
							this.src = event.source.currentValue;
						}
					}
				}
			}
		});
	}
);