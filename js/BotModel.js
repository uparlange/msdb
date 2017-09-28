define(["AppUtils", "AbstractModel", "MsdbService", "ConnectionManager"],
	function (AppUtils, AbstractModel, MsdbService, ConnectionManager) {
		return AppUtils.getClass({
			extends: AbstractModel,
			constructor: function BotModel(MsdbService, ConnectionManager, Title) {
				AbstractModel.call(this, MsdbService, ConnectionManager, Title);
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title]
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