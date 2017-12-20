define(["AbstractPopup", "DetailModel", "AppUtils", "RouterManager"],
	function (AbstractPopup, DetailModel, AppUtils, RouterManager) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function DriverPopup(DetailModel, MatDialogRef, RouterManager) {
				AbstractPopup.call(this, DetailModel, MatDialogRef);
				this._routerManager = RouterManager;
			},
			parameters: [
				[DetailModel], [ng.material.MatDialogRef], [RouterManager]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("driver"))
			],
			functions: {
				showGamesForMameVersion: function (version) {
					this.close();
					setTimeout(() => {
						this._routerManager.navigate(["/result"], { queryParams: { type: "mameversionadded", value: version } })
					}, 0);
				}
			}
		});
	}
);