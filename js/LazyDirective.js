import AbstractDirective from "./AbstractDirective.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class LazyDirective extends AbstractDirective {
	static get annotations() {
		return this.getAnnotations({
			selector: "[lazySrc]",
			inputs: ["lazySrc"],
			host: {
				"[class.b-lazy]": "true",
				"[attr.src]": "src",
				"[attr.data-src]": "dataSrc"
			}
		});
	}
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
		this.dataSrc = null;
		this.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
	}
	onChanges(event) {
		if (event.hasOwnProperty("lazySrc")) {
			if (typeof event.lazySrc.currentValue === "string") {
				this.dataSrc = event.lazySrc.currentValue;
				this.getLazy().refresh();
			}
		}
	}
}

export default LazyDirective;