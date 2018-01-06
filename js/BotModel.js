define(["AppUtils", "AbstractModel", "AbstractClassHelper", "MsdbService"],
	function (AppUtils, AbstractModel, AbstractClassHelper, MsdbService) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function BotModel(AbstractClassHelper, MsdbService) {
				AbstractModel.call(this, AbstractClassHelper, MsdbService);
			},
			parameters: [
				[AbstractClassHelper], [MsdbService]
			],
			functions: {
				_getInitData: function () {
					return {

					};
				}
			}
		});
	}
);