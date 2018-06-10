import AbstractComponent from "./AbstractComponent.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class TreeComponent extends AbstractComponent {
	static get annotations() {
		return this.getAnnotations({
			selector: "tree",
			inputs: ["provider", "selectedItem"],
			outputs: ["onSelect", "onChange", "selectedItemChange"]
		});
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
		this.provider = [];
		this.selectedItem = null;
		this.selectedItemChange = new ng.core.EventEmitter();
		this.onSelect = new ng.core.EventEmitter();
		this.onChange = new ng.core.EventEmitter();
	}
	trackByLabel(index, item) {
		return item ? item.label : undefined;
	}
	toggleNode(item) {
		this.selectedItem = (item === this.selectedItem) ? null : item;
		this.selectedItemChange.emit(this.selectedItem);
		if (item.children == null || item.children.length == 0) {
			this.selectNode(item);
		} else {
			this.changeNode(item);
		}
	}
	selectNode(item) {
		this.onSelect.emit(item);
	}
	changeNode(item) {
		this.onChange.emit(item);
	}
}

export default TreeComponent;