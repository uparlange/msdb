import AppUtils from "./AppUtils.js";
import AbstractDirective from "./AbstractDirective.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

export default AppUtils.getClass({
	extends: AbstractDirective,
	constructor: function HrefDirective(AbstractClassHelper) {
		AbstractDirective.call(this, AbstractClassHelper);
	},
	parameters: [
		[AbstractClassHelper]
	],
	annotations: [
		new ng.core.Directive({
			selector: "[href]",
			host: {
				"(click)": "onClick($event)"
			}
		})
	],
	functions: {
		onClick: function () {
			this.getRouter().saveCurrentViewScrollPosition();
		}
	}
});