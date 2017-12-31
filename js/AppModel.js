define(["AppUtils", "AbstractModel", "AbstractModelHelper", "CacheManager"],
	function (AppUtils, AbstractModel, AbstractModelHelper, CacheManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function AppModel(AbstractModelHelper, CacheManager) {
				AbstractModel.call(this, AbstractModelHelper);
				this._cacheManager = CacheManager;
				this._cacheManagerOnChangeSubscriber = null;
			},
			parameters: [
				[AbstractModelHelper], [CacheManager]
			],
			functions: {
				onInit: function () {
					this.data.searchLastType = this._cacheManager.getItem("searchLastType", "description");
					this._cacheManagerOnChangeSubscriber = this._cacheManager.on("change").subscribe((event) => {
						if (event.key === "searchLastType") {
							this.data.searchLastType = event.newValue;
						}
					});
				},
				onDestroy: function () {
					this._cacheManager.off(this._cacheManagerOnChangeSubscriber);
				},
				_getInitData: function () {
					return {
						searchLastType: null
					};
				}
			}
		});
	}
);