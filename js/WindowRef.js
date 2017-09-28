define(["AppUtils", "AbstractClass"],
	function (AppUtils, AbstractClass) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function WindowRef() {
				AbstractClass.call(this);
				this.nativeWindow = window;
			}
		});
	}
);