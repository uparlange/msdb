define(["AppUtils", "AbstractClass"],
	function (AppUtils, AbstractClass) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function MyGamesCanActivate() {
				AbstractClass.call(this);
			},
			functions: {
				canActivate: function () {
					return AppUtils.runInNw();
				}
			}
		});
	}
);