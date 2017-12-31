define(["AppUtils", "AbstractManager", "WindowRef"],
	function (AppUtils, AbstractManager, WindowRef) {
		return AppUtils.getClass({
			extends: AbstractManager,
			constructor: function ConnectionManager(WindowRef) {
				AbstractManager.call(this);
				this._windowRef = WindowRef;
				this.online = this._windowRef.nativeWindow.navigator.onLine;
			},
			parameters: [
				[WindowRef]
			],
			functions: {
				init: function () {
					AbstractManager.prototype.init.call(this);
					this._windowRef.nativeWindow.addEventListener("offline", () => {
						this._changeHandler();
					});
					this._windowRef.nativeWindow.addEventListener("online", () => {
						this._changeHandler();
					});
				},
				_changeHandler: function () {
					this.online = this._windowRef.nativeWindow.navigator.onLine;
					this.emit("change", this.online);
				}
			}
		});
	}
);