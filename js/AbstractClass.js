define(["AppUtils", "LogUtils"],
	function (AppUtils, LogUtils) {
		return AppUtils.getClass({
			constructor: function AbstractClass() {
				this._logger = LogUtils.getLogger(this.constructor.name);
				this.getLogger().debug("constructor");
			},
			functions: {
				getLogger: function () {
					return this._logger;
				}
			}
		});
	}
);