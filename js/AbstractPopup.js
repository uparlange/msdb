define(["AppUtils", "AbstractComponent"],
	function (AppUtils, AbstractComponent) {
		return AppUtils.getClass({
			extends: AbstractComponent,
			constructor: function AbstractPopup(Model, MatDialogRef) {
				AbstractComponent.call(this);
				this.model = Model;
				this._matDialogRef = MatDialogRef;
			},
			functions: {
				ngOnDestroy: function () {
					AbstractComponent.prototype.ngOnDestroy.call(this);
					this.model = null;
					this._matDialogRef = null;
				},
				close: function () {
					this._matDialogRef.close();
				}
			}
		});
	}
);