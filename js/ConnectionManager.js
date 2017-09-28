define(["AppUtils", "AbstractEventManager", "WindowRef"],
	function (AppUtils, AbstractEventManager, WindowRef) {
		return AppUtils.getClass({
			extends: AbstractEventManager,
			constructor: function ConnectionManager(WindowRef) {
				AbstractEventManager.call(this);
				this._window = WindowRef.nativeWindow;
				this.online = this._window.navigator.onLine;
				this._window.addEventListener("offline", () => {
					this._changeHandler();
				});
				this._window.addEventListener("online", () => {
					this._changeHandler();
				});
			},
			parameters: [
				[WindowRef]
			],
			functions: {
				_changeHandler: function () {
					this.online = this._window.navigator.onLine;
					this.emit("change", this.online);
				}
			}
		});
	}
);