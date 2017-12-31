define(["AppUtils", "AbstractModel", "AbstractModelHelper", "CacheManager"],
	function (AppUtils, AbstractModel, AbstractModelHelper, CacheManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchByDescriptionModel(AbstractModelHelper, CacheManager) {
				AbstractModel.call(this, AbstractModelHelper);
				this._cacheManager = CacheManager;
			},
			parameters: [
				[AbstractModelHelper], [CacheManager]
			],
			functions: {
				onInit: function () {
					this.data.description = this._cacheManager.getItem("searchDescription", "");
				},
				onDestroy: function () {
					this._cacheManager.setItem("searchDescription", this.data.description);
				},
				_getInitData: function () {
					return {
						description: ""
					};
				}
			}
		});
	}
);