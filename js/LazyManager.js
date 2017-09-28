define(["AppUtils", "AbstractManager"],
	function (AppUtils, AbstractManager) {
		return AppUtils.getClass({
			extends: AbstractManager,
			constructor: function LazyManager() {
				AbstractManager.call(this);
				this._blazy = new Blazy();
				this._timeoutInterval = null;
			},
			functions: {
				refresh: function () {
					if (this._timeoutInterval !== null) {
						clearTimeout(this._timeoutInterval);
					}
					this._timeoutInterval = setTimeout(() => {
						this._blazy.revalidate();
					}, 50);
				}
			}
		});
	}
);