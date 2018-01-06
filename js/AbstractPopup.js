define(["AppUtils", "AbstractComponent"],
	function (AppUtils, AbstractComponent) {
		return AppUtils.getClass({
			extends: AbstractComponent,
			constructor: function AbstractPopup(AbstractClassHelper, Model, MatDialogRef) {
				AbstractComponent.call(this, AbstractClassHelper);
				this._matDialogRef = MatDialogRef;
				this.model = Model;
			},
			functions: {
				ngOnDestroy: function () {
					AbstractComponent.prototype.ngOnDestroy.call(this);
					this.model = null;
				},
				close: function () {
					this._matDialogRef.close();
				}
			}
		});
	}
);