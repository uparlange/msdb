import AbstractComponent from "./AbstractComponent.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class NgForItemComponent extends AbstractComponent {
	static get annotations() {
		return this.getAnnotations({
			selector: "ngForItem",
			inputs: ["last"],
			outputs: ["onLast"]
		});
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
		this.onLast = new ng.core.EventEmitter();
		this.last = false;
	}
	afterContentInit() {
		if (this.last) {
			this.onLast.emit();
		}
	}
}

export default NgForItemComponent;