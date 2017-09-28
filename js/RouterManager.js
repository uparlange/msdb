define(["AbstractManager", "CacheManager", "AppUtils"],
	function (AbstractManager, CacheManager, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractManager,
			constructor: function RouterManager(Router, Location, CacheManager) {
				AbstractManager.call(this);
				this._router = Router;
				this._location = Location;
				this._cacheManager = CacheManager;
				this._mutationObserver = null;
				this._bodyRef = document.querySelector("body");
				this._routerEventsSubscriber = this._router.events.subscribe((e) => {
					switch (e.constructor.name) {
						case "NavigationStart":
							if (e.id === 1) {
								if (AppUtils.getDevice().mobile() !== null) {
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
				[ng.router.Router], [ng.common.Location], [CacheManager]
			],
			functions: {
				init: function () {

				},
				saveCurrentViewScrollPosition: function () {
					const scrollTop = this._bodyRef.scrollTop;
					this._cacheManager.setItem("scrollTop_" + this._getCurrentPath(), scrollTop);
				},
				_restoreCurrentViewScrollPosition: function () {
					const scrollTop = this._cacheManager.getItem("scrollTop_" + this._getCurrentPath(), 0);
					this._bodyRef.scrollTop = scrollTop;
				},
				_saveLastView: function (url) {
					this._cacheManager.setItem("lastView", url);
				},
				_restoreLastView: function () {
					const lastView = this._cacheManager.getItem("lastView", "/home");
					this._router.navigateByUrl(lastView);
				},
				_getCurrentPath: function () {
					return this._location.path(true);
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
						this._mutationObserver.observe(this._bodyRef, config);
					}
				}
			}
		});
	}
);