define(["AbstractPopup", "AbstractClassHelper", "DetailModel", "AppUtils"],
	function (AbstractPopup, AbstractClassHelper, DetailModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function DriverPopup(AbstractClassHelper, DetailModel, MatDialogRef) {
				AbstractPopup.call(this, AbstractClassHelper, DetailModel, MatDialogRef);
				this._routerAction = null;
			},
			parameters: [
				[AbstractClassHelper], [DetailModel], [ng.material.MatDialogRef]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("driver"))
			],
			functions: {
				showGamesForMameVersion: function (version) {
					this._routerAction = {
						commands: ["/result"],
						extras: { queryParams: { type: "version", value: version } }
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