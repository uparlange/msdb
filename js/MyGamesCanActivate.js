import AppUtils from "./AppUtils.js";
import AbstractGuard from "./AbstractGuard.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

class MyGamesCanActivate extends AbstractGuard {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper);
	}
	constructor(AbstractClassHelper) {
		super(AbstractClassHelper);
	}
	canActivate() {
		return AppUtils.runInNw();
	}
}

export default MyGamesCanActivate;