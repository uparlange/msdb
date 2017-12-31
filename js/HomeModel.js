define(["AppUtils", "AbstractModel", "AbstractModelHelper", "CacheManager"],
	function (AppUtils, AbstractModel, AbstractModelHelper, CacheManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function HomeModel(AbstractModelHelper, CacheManager) {
				AbstractModel.call(this, AbstractModelHelper);
				this._cacheManager = CacheManager;
			},
			parameters: [
				[AbstractModelHelper], [CacheManager]
			],
			functions: {
				onInit: function () {
					this.data.searchLastType = this._cacheManager.getItem("searchLastType", "description");
				},
				onRefresh: function (callback) {
					if (this.data.mame.build === null) {
						this.getServices().getMameInfos().subscribe((data) => {
							if (data !== null) {
								data.version = data.build.substr(0, data.build.indexOf("(")).trim();
								this.data.mame = data;
							}
							callback();
						});
					}
				},
				_getInitData: function () {
					return {
						searchLastType: null,
						mame: {
							build: null
						}
					};
				}
			}
		});
	}
);