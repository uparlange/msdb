define(["AbstractPopup", "DetailModel", "AppUtils", "RouterManager"],
	function (AbstractPopup, DetailModel, AppUtils, RouterManager) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function DeviceRefsPopup(DetailModel, MatDialogRef, RouterManager) {
				AbstractPopup.call(this, DetailModel, MatDialogRef);
				this._routerManager = RouterManager;
			},
			parameters: [
				[DetailModel], [ng.material.MatDialogRef], [RouterManager]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("deviceRefs"))
			],
			functions: {
				showDeviceDetail: function (name) {
					this.close();
					setTimeout(() => {
						this._routerManager.navigate(["/detail"], { queryParams: { name: name } })
					}, 0);
				}
			}
		});
	}
);