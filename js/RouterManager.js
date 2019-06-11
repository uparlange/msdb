import AbstractManager from "./AbstractManager.js";
import CacheManager from "./CacheManager.js";
import WindowRef from "./WindowRef.js";
import AppUtils from "./AppUtils.js";
import AnalyticsManager from "./AnalyticsManager.js";

class RouterManager extends AbstractManager {
	static get parameters() {
		return AppUtils.getParameters(ng.router.Router, CacheManager, ng.core.NgZone, WindowRef, AnalyticsManager);
	}
	constructor(Router, CacheManager, NgZone, WindowRef, AnalyticsManager) {
		super();
		this._router = Router;
		this._cacheManager = CacheManager;
		this._ngZone = NgZone;
		this._windowRef = WindowRef;
		this._analyticsManager = AnalyticsManager;
		this._mutationObserver = null;
		this._routerEventsSubscriber = null;

	}
	init() {
		super.init();
		this._routerEventsSubscriber = this._router.events.subscribe((e) => {
			if (e instanceof ng.router.NavigationStart) {
				if (e.id === 1) {
					if (this._windowRef.isInWebApp()) {
						this._restoreLastView();
					}
				}
				else {
					this.saveCurrentViewScrollPosition();
				}
			} else if (e instanceof ng.router.NavigationEnd) {
				// update google analytics
				this._analyticsManager.setCurrentPage(e.urlAfterRedirects);
				// save current view
				this._saveLastView(e.urlAfterRedirects);
			}
		});
	}
	saveCurrentViewScrollPosition() {
		const scrollPosition = this._windowRef.getScrollPosition();
		this._cacheManager.setItem(`scrollTop_${this._getCurrentPath()}`, scrollPosition.y, "version");
	}
	navigate(commands, extras) {
		this._ngZone.run(() => {
			this._router.navigate(commands, extras);
		});
	}
	getUrl() {
		return this._router.url;
	}
	getUrlWithoutQueryParams() {
		let url = this.getUrl();
		if (url.indexOf("?") !== -1) {
			url = url.substring(0, url.indexOf("?"));
		}
		return url;
	}
	getUrlQueryParams() {
		return this._router.parseUrl(this._router.url).queryParams;
	}
	restoreScrollPosition() {
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
					this._cacheManager.getItem(`scrollTop_${this._getCurrentPath()}`, 0).subscribe((value) => {
						this._windowRef.scrollTo(0, value);
					});
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
	_saveLastView(url) {
		this._cacheManager.setItem("lastView", url, "version");
	}
	_restoreLastView() {
		this._cacheManager.getItem("lastView", "/home").subscribe((value) => {
			this._router.navigateByUrl(value);
		});
	}
	_getCurrentPath() {
		return this._router.location.path(true);
	}
}

export default RouterManager;