define(["AppUtils", "AbstractComponent"],
	function (AppUtils, AbstractComponent) {
		return AppUtils.getClass({
			extends: AbstractComponent,
			constructor: function AbstractPopup(AbstractClassHelper, Model) {
				AbstractComponent.call(this, AbstractClassHelper);
				this._afterOpenSubscriber = null;
				this._beforeCloseSubscriber = null;
				this.model = Model;
			},
			functions: {
				ngOnInit: function () {
					AbstractComponent.prototype.ngOnInit.call(this);
					this._afterOpenSubscriber = this._helper.getPopups().on("afterOpen").subscribe(() => {
						if (typeof this.afterOpen === "function") {
							this.afterOpen();
						}
					});
					this._beforeCloseSubscriber = this._helper.getPopups().on("beforeClose").subscribe(() => {
						if (typeof this.beforeClose === "function") {
							this.beforeClose();
						}
					});
				},
				ngOnDestroy: function () {
					AbstractComponent.prototype.ngOnDestroy.call(this);
					this._afterOpenSubscriber.unsubscribe();
					this._beforeCloseSubscriber.unsubscribe();
					this.model = null;
				},
				close: function () {
					this._helper.getPopups().closeActive();
				}
			}
		});
	}
);