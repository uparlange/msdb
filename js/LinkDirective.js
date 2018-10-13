import AbstractDirective from "./AbstractDirective.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class LinkDirective extends AbstractDirective {
	static get annotations() {
		return this.getAnnotations({
			selector: "a",
			inputs: ["target"],
			host: {
				"[attr.rel]": "rel",
				"(click)": "onClick($event)"
			}
		});
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
		this.rel = null;
	}
	onChanges(event) {
		if (event.hasOwnProperty("target")) {
			if (event.target.currentValue === "_blank") {
				this.rel = "noopener";
			}
		}
	}
	onClick() {
		this.getRouter().saveCurrentViewScrollPosition();
	}
}

export default LinkDirective;