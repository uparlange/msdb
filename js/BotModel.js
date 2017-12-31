define(["AppUtils", "AbstractModel", "AbstractModelHelper"],
	function (AppUtils, AbstractModel, AbstractModelHelper) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function BotModel(AbstractModelHelper) {
				AbstractModel.call(this, AbstractModelHelper);
			},
			parameters: [
				[AbstractModelHelper]
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