define(["AbstractManager", "CacheManager", "AppUtils", "WindowRef"],
	function (AbstractManager, CacheManager, AppUtils, WindowRef) {
		return AppUtils.getClass({
			extends: AbstractManager,
			constructor: function RouterManager(Router, CacheManager, NgZone, WindowRef) {
				AbstractManager.call(this);
				this._router = Router;
				this._cacheManager = CacheManager;
				this._ngZone = NgZone;
				this._window = WindowRef.nativeWindow;
				this._mutationObserver = null;
				this._routerEventsSubscriber = this._router.events.subscribe((e) => {
					switch (e.constructor.name) {
						case "NavigationStart":
							if (e.id === 1) {
								if (this._window.navigator.standalone == true) {
									this._restoreLastView();
								}
							}
							else {
								this.saveCurrentViewScrollPosition();
							}
							break;
						case "NavigationEnd":
							this._saveLastView(e.urlAfterRedirects);
							this._enableMutationObserver();
							break;
					}
				});
			},
			parameters: [
				[ng.router.Router], [CacheManager], [ng.core.NgZone], [WindowRef]
			],
			functions: {
				saveCurrentViewScrollPosition: function () {
					const scrollTop = (this._window.pageYOffset || document.documentElement.scrollTop);
					this._cacheManager.setItem("scrollTop_" + this._getCurrentPath(), scrollTop);
				},
				navigate: function (commands, extras) {
					this._ngZone.run(() => {
						this._router.navigate(commands, extras);
					});
				},
				getLocation: function () {
					return this._router.location;
				},
				_restoreCurrentViewScrollPosition: function () {
					const scrollTop = this._cacheManager.getItem("scrollTop_" + this._getCurrentPath(), 0);
					document.documentElement.scrollTop = scrollTop;
				},
				_saveLastView: function (url) {
					this._cacheManager.setItem("lastView", url);
				},
				_restoreLastView: function () {
					const lastView = this._cacheManager.getItem("lastView", "/home");
					this._router.navigateByUrl(lastView);
				},
				_getCurrentPath: function () {
					return this._router.location.path(true);
				},
				_disableMutationObserver: function () {
					if (this._mutationObserver !== null) {
						this._mutationObserver.disconnect();
						this._mutationObserver = null;
					}
				},
				_enableMutationObserver: function () {
					if (this._mutationObserver === null) {
						this._mutationObserver = new MutationObserver(() => {
							if (this._creationCompleteTimeout !== null) {
								clearTimeout(this._creationCompleteTimeout);
							}
							this._creationCompleteTimeout = setTimeout(() => {
								this._disableMutationObserver();
								this._restoreCurrentViewScrollPosition();
							}, 50);
						});
						const config = {
							childList: true,
							attributes: false,
							characterData: false,
							subtree: true
						};
						this._mutationObserver.observe(document.querySelector("body"), config);
					}
				}
			}
		});
	}
);