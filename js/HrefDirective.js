import AbstractDirective from "./AbstractDirective.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

class HrefDirective extends AbstractDirective {
	static get annotations() {
		return this.getAnnotations({
			selector: "[href]",
			host: {
				"(click)": "onClick($event)"
			}
		});
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
	}
	onClick() {
		this.getRouter().saveCurrentViewScrollPosition();
	}
}

export default HrefDirective;