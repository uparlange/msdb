define(["AbstractComponent", "AbstractClassHelper", "AppUtils"],
	function (AbstractComponent, AbstractClassHelper, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractComponent,
			constructor: function NgForItemComponent(AbstractClassHelper) {
				AbstractComponent.call(this, AbstractClassHelper);
				this.onLast = new ng.core.EventEmitter();
				this.last = false;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("ngForItem", {
					inputs: ["last"],
					outputs: ["onLast"]
				}))
			],
			parameters: [
				[AbstractClassHelper]
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