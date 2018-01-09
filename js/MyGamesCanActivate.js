define(["AppUtils", "AbstractGuard", "AbstractClassHelper"],
	function (AppUtils, AbstractGuard, AbstractClassHelper) {
		return AppUtils.getClass({
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
	}
);