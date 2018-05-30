import AppUtils from "./AppUtils.js";
import AbstractGuard from "./AbstractGuard.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

export default AppUtils.getClass({
	extends: AbstractGuard,
	constructor: function ConfigCanDeactivate(AbstractClassHelper) {
		AbstractGuard.call(this, AbstractClassHelper);
	},
	parameters: [
		[AbstractClassHelper]
	],
	functions: {
		canDeactivate: function (component) {
			const eventEmitter = new ng.core.EventEmitter();
			setTimeout(() => {
				if (component.model.hasChanges()) {
					this.getLabels().getValues(["L10N_CONFIRM_QUIT"]).subscribe((translations) => {
						eventEmitter.emit(this.getWindowRef().nativeWindow.confirm(translations.L10N_CONFIRM_QUIT));
					});
				}
				else {
					eventEmitter.emit(true);
				}
			}, 0);
			return eventEmitter;
		}
	}
});