define(["AppUtils", "AbstractManager"],
	function (AppUtils, AbstractManager) {
		return AppUtils.getClass({
			extends: AbstractManager,
			constructor: function EventManager() {
				AbstractManager.call(this);
			}
		});
	}
);