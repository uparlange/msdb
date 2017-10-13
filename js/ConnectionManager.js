define(["AppUtils", "AbstractManager", "WindowRef"],
	function (AppUtils, AbstractManager, WindowRef) {
		return AppUtils.getClass({
			extends: AbstractManager,
			constructor: function ConnectionManager(WindowRef) {
				AbstractManager.call(this);
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