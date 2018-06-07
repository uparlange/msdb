import AbstractGuard from "./AbstractGuard.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

class ConfigCanDeactivate extends AbstractGuard {
	static get parameters() {
		return this.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
	}
	canDeactivate(component) {
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

export default ConfigCanDeactivate;