define(["AbstractManager", "CacheManager", "AppUtils", "WindowRef"],
	function (AbstractManager, CacheManager, AppUtils, WindowRef) {
		return AppUtils.getClass({
			extends: AbstractManager,
			constructor: function RouterManager(Router, CacheManager, NgZone, WindowRef) {
				AbstractManager.call(this);
				this._router = Router;
				this._cacheManager = CacheManager;
				this._ngZone = NgZone;
				this._windowRef = WindowRef;
				this._mutationObserver = null;
				this._routerEventsSubscriber = null;
			},
			parameters: [
				[ng.router.Router], [CacheManager], [ng.core.NgZone], [WindowRef]
			],
			functions: {
				init: function () {
					AbstractManager.prototype.init.call(this);
					this._routerEventsSubscriber = this._router.events.subscribe((e) => {
						switch (e.constructor.name) {
							case "NavigationStart":
								if (e.id === 1) {
									if (this._windowRef.isInWebApp()) {
										this._restoreLastView();
									}
								}
								else {
									this.saveCurrentViewScrollPosition();
								}
								break;
							case "NavigationEnd":
								this._saveLastView(e.urlAfterRedirects);
								break;
						}
					});
				},
				saveCurrentViewScrollPosition: function () {
					const scrollPosition = this._windowRef.getScrollPosition();
					this._cacheManager.setItem("scrollTop_" + this._getCurrentPath(), scrollPosition.y);
				},
				navigate: function (commands, extras) {
					this._ngZone.run(() => {
						this._router.navigate(commands, extras);
					});
				},
				getUrlWithoutQueryParams: function () {
					let url = this._router.url;
					if (url.indexOf("?") !== -1) {
						url = url.substring(0, url.indexOf("?"));
					}
					return url;
				},
				getUrlQueryParams: function () {
					return this._router.parseUrl(this._router.url).queryParams;
				},
				restoreScrollPosition: function () {
					if (this._mutationObserver === null) {
						this._mutationObserver = new MutationObserver(() => {
							if (this._creationCompleteTimeout !== null) {
								clearTimeout(this._creationCompleteTimeout);
							}
							this._creationCompleteTimeout = setTimeout(() => {
								this._creationCompleteTimeout = null;
								if (this._mutationObserver !== null) {
									this._mutationObserver.disconnect();
									this._mutationObserver = null;
								}
								const scrollTop = this._cacheManager.getItem("scrollTop_" + this._getCurrentPath(), 0);
								this._windowRef.scrollTo(0, scrollTop);
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
				}
			}
		});
	}
);