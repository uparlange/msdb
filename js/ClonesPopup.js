define(["AbstractPopup", "AbstractClassHelper", "DetailModel", "AppUtils"],
	function (AbstractPopup, AbstractClassHelper, DetailModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function ClonesPopup(AbstractClassHelper, DetailModel, MatDialogRef) {
				AbstractPopup.call(this, AbstractClassHelper, DetailModel, MatDialogRef);
				this._routerAction = null;
			},
			parameters: [
				[AbstractClassHelper], [DetailModel], [ng.material.MatDialogRef]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("clones"))
			],
			functions: {
				showCloneDetail: function (name) {
					this._routerAction = {
						commands: ["/detail"],
						extras: { queryParams: { name: name } }
					};
					this.close();
				},
				beforeClose: function () {
					if (this._routerAction != null) {
						this.getRouter().navigate(this._routerAction.commands, this._routerAction.extras);
						this._routerAction = null;
					}
				}
			}
		});
	}
);