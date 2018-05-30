import AppUtils from "./AppUtils.js";
import AbstractGuard from "./AbstractGuard.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

export default AppUtils.getClass({
	extends: AbstractGuard,
	constructor: function MyGamesCanActivate(AbstractClassHelper) {
		AbstractGuard.call(this, AbstractClassHelper);
	},
	parameters: [
		[AbstractClassHelper]
	],
	functions: {
		canActivate: function () {
			return AppUtils.runInNw();
		}
	}
});