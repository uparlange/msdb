define(["AbstractComponent", "AppUtils"],
	function (AbstractComponent, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractComponent,
			constructor: function TreeComponent() {
				AbstractComponent.call(this);
				this.provider = [];
				this.selectedItem = null;
				this.selectedItemChange = new ng.core.EventEmitter();
				this.onClick = new ng.core.EventEmitter();
				this.onChange = new ng.core.EventEmitter();
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("tree", {
					inputs: ["provider", "selectedItem"],
					outputs: ["onToggle", "onClick", "onChange", "selectedItemChange"]
				}))
			],
			functions: {
				trackByLabel: function (index, item) {
					return item ? item.label : undefined;
				},
				toggleNode: function (panelHeaderRef, item) {
					this.selectedItem = (item === this.selectedItem) ? null : item;
					this.selectedItemChange.emit(this.selectedItem);
					this.onChange.emit({
						item: this.selectedItem,
						headerRef: panelHeaderRef._element.nativeElement
					});
				},
				selectNode: function (item) {
					this.onClick.emit(item);
				}
			}
		});
	}
);