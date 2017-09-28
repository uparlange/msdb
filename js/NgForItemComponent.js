define(["AbstractComponent", "AppUtils"],
	function (AbstractComponent, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractComponent,
			constructor: function NgForItemComponent() {
				AbstractComponent.call(this);
				this.onLast = new ng.core.EventEmitter();
				this.last = false;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("ngForItem", {
					inputs: ["last"],
					outputs: ["onLast"]
				}))
			],
			functions: {
				afterContentInit: function () {
					if (this.last) {
						setTimeout(() => {
							this.onLast.emit();
						}, 0);
					}
				}
			}
		});
	}
);