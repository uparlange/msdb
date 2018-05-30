import AppUtils from "./AppUtils.js";
import AbstractComponent from "./AbstractComponent.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

export default AppUtils.getClass({
	extends: AbstractComponent,
	constructor: function TreeComponent(AbstractClassHelper) {
		AbstractComponent.call(this, AbstractClassHelper);
		this.provider = [];
		this.selectedItem = null;
		this.selectedItemChange = new ng.core.EventEmitter();
		this.onSelect = new ng.core.EventEmitter();
		this.onChange = new ng.core.EventEmitter();
	},
	annotations: [
		new ng.core.Component(AppUtils.getComponentConfiguration("tree", {
			inputs: ["provider", "selectedItem"],
			outputs: ["onSelect", "onChange", "selectedItemChange"]
		}))
	],
	parameters: [
		[AbstractClassHelper]
	],
	functions: {
		trackByLabel: function (index, item) {
			return item ? item.label : undefined;
		},
		toggleNode: function (item) {
			this.selectedItem = (item === this.selectedItem) ? null : item;
			this.selectedItemChange.emit(this.selectedItem);
			if (item.children == null || item.children.length == 0) {
				this.selectNode(item);
			} else {
				this.changeNode(item);
			}
		},
		selectNode: function (item) {
			this.onSelect.emit(item);
		},
		changeNode: function (item) {
			this.onChange.emit(item);
		}
	}
});