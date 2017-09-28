define(["AppUtils", "AbstractComponent"],
	function (AppUtils, AbstractComponent) {
		return AppUtils.getClass({
			extends: AbstractComponent,
			constructor: function AbstractPopup(Model, MdDialogRef) {
				AbstractComponent.call(this);
				this.model = Model;
				this._mdDialogRef = MdDialogRef;
			},
			functions: {
				ngOnDestroy: function () {
					AbstractComponent.prototype.ngOnDestroy.call(this);
					this.model = null;
					this._mdDialogRef = null;
				},
				close: function () {
					this._mdDialogRef.close();
				}
			}
		});
	}
);