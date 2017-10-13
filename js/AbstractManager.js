define(["AppUtils", "AbstractEventManager"],
	function (AppUtils, AbstractEventManager) {
		return AppUtils.getClass({
			extends: AbstractEventManager,
			constructor: function AbstractManager() {
				AbstractEventManager.call(this);
			},
			functions: {
				init: function () {

				}
			}
		});
	}
);