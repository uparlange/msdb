import AppUtils from "./AppUtils.js";
import AbstractGuard from "./AbstractGuard.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

class ConfigCanActivate extends AbstractGuard {
	static get parameters() {
		return this.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
	}
	canActivate() {
		return AppUtils.runInNw();
	}
}

export default ConfigCanActivate;