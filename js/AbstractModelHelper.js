define(["AbstractClass", "AppUtils", "MsdbService", "ConnectionManager", "RouterManager"],
	function (AbstractClass, AppUtils, MsdbService, ConnectionManager, RouterManager) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function AbstractModelHelper(MsdbService, ConnectionManager, Title, RouterManager) {
				AbstractClass.call(this);
				this.msdbService = MsdbService;
				this.connectionManager = ConnectionManager;
				this.title = Title;
				this.routerManager = RouterManager;
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title], [RouterManager]
			]
		});
	}
);