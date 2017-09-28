define(["AppUtils", "AbstractClass"],
	function (AppUtils, AbstractClass) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function ConfigCanActivate() {
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