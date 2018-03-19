define(["AppUtils", "AbstractManager", "TranslateManager", "WindowRef", "CacheManager"],
	function (AppUtils, AbstractManager, TranslateManager, WindowRef, CacheManager) {
		return AppUtils.getClass({
			extends: AbstractManager,
			constructor: function UpdateManager(TranslateManager, WindowRef, CacheManager) {
				AbstractManager.call(this);
				this._translateManager = TranslateManager;
				this._windowRef = WindowRef;
				this._cacheManager = CacheManager;
				this._checked = false;
			},
			parameters: [
				[TranslateManager], [WindowRef], [CacheManager]
			],
			functions: {
				init: function () {
					AbstractManager.prototype.init.call(this);
					this._windowRef.nativeWindow.applicationCache.addEventListener("updateready", () => {
						this._askForReload();
					});
					if (this._windowRef.nativeWindow.applicationCache.status === this._windowRef.nativeWindow.applicationCache.UPDATEREADY) {
						this._askForReload();
					}
				},
				_askForReload: function () {
					if (!this._checked) {
						this._cacheManager.clear();
						this._translateManager.getValues(["L10N_NEW_VERSION"]).subscribe((translations) => {
							if (confirm(translations.L10N_NEW_VERSION)) {
								this._checked = true;
								this._windowRef.nativeWindow.location.reload();
							}
						});
					}
				}
			}
		});
	}
);