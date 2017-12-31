define(["AbstractClass", "AppUtils", "MsdbService", "ConnectionManager", "RouterManager",
	"SocketManager"],
	function (AbstractClass, AppUtils, MsdbService, ConnectionManager, RouterManager,
		SocketManager) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function AbstractModelHelper(MsdbService, ConnectionManager, Title, RouterManager, SocketManager) {
				AbstractClass.call(this);
				this.msdbService = MsdbService;
				this.connectionManager = ConnectionManager;
				this.title = Title;
				this.routerManager = RouterManager;
				this.socketManager = SocketManager;
			},
			parameters: [
				[MsdbService], [ConnectionManager], [ng.platformBrowser.Title], [RouterManager], [SocketManager]
			]
		});
	}
);