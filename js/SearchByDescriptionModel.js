define(["AppUtils", "AbstractModel", "AbstractClassHelper", "MsdbService"],
	function (AppUtils, AbstractModel, AbstractClassHelper, MsdbService) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function SearchByDescriptionModel(AbstractClassHelper, MsdbService) {
				AbstractModel.call(this, AbstractClassHelper, MsdbService);
			},
			parameters: [
				[AbstractClassHelper], [MsdbService]
			],
			functions: {
				onInit: function () {
					this.data.description = this.getCache().getItem("searchDescription", "");
				},
				onDestroy: function () {
					this.getCache().setItem("searchDescription", this.data.description);
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