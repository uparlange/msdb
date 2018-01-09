define(["AbstractClass", "AppUtils", "Shell", "WindowRef"],
	function (AbstractClass, AppUtils, Shell, WindowRef) {
		return AppUtils.getClass({
			extends: AbstractClass,
			constructor: function AbstractClassHelper(Shell, WindowRef, Title, HttpClient, ActivatedRoute) {
				AbstractClass.call(this);
				this._title = Title;
				this._shell = Shell;
				this._httpClient = HttpClient;
				this._activatedRoute = ActivatedRoute;
				this._windowRef = WindowRef;
				// TODO right place ?
				this._shell.init();
			},
			parameters: [
				[Shell], [WindowRef], [ng.platformBrowser.Title], [ng.common.http.HttpClient], [ng.router.ActivatedRoute]
			],
			functions: {
				getEventBus: function () {
					return this._shell.getEventManager();
				},
				getConnection: function () {
					return this._shell.getConnectionManager();
				},
				getSocket: function () {
					return this._shell.getSocketManager();
				},
				getRouter: function () {
					return this._shell.getRouterManager();
				},
				getCache: function () {
					return this._shell.getCacheManager();
				},
				getLabels: function () {
					return this._shell.getTranslateManager();
				},
				getLazy: function () {
					return this._shell.getLazyManager();
				},
				getPopups: function () {
					return this._shell.getPopupManager();
				},
				getTitle: function () {
					return this._title;
				},
				getHttpClient: function () {
					return this._httpClient;
				},
				getActivatedRoute: function () {
					return this._activatedRoute;
				},
				getWindowRef: function () {
					return this._windowRef;
				}
			}
		});
	}
);