import AppUtils from "./AppUtils.js";
import AbstractDirective from "./AbstractDirective.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

export default AppUtils.getClass({
	extends: AbstractDirective,
	constructor: function LazyDirective(AbstractClassHelper) {
		AbstractDirective.call(this, AbstractClassHelper);
		this.dataSrc = null;
		this.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
	},
	parameters: [
		[AbstractClassHelper]
	],
	annotations: [
		new ng.core.Directive({
			selector: "[lazySrc]",
			inputs: ["lazySrc"],
			host: {
				"[class.b-lazy]": "true",
				"[attr.src]": "src",
				"[attr.data-src]": "dataSrc"
			}
		})
	],
	functions: {
		onChanges: function (event) {
			if (event.hasOwnProperty("lazySrc")) {
				if (typeof event.lazySrc.currentValue === "string") {
					this.dataSrc = event.lazySrc.currentValue;
					this.getLazy().refresh();
				}
			}
		}
	}
});