define(["AbstractPopup", "AbstractClassHelper", "DetailModel", "AppUtils"],
	function (AbstractPopup, AbstractClassHelper, DetailModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function DriverPopup(AbstractClassHelper, DetailModel, MatDialogRef) {
				AbstractPopup.call(this, AbstractClassHelper, DetailModel, MatDialogRef);
			},
			parameters: [
				[AbstractClassHelper], [DetailModel], [ng.material.MatDialogRef]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("driver"))
			],
			functions: {
				showGamesForMameVersion: function (version) {
					this.close();
					setTimeout(() => {
						this.getRouter().navigate(["/result"], { queryParams: { type: "mameversionadded", value: version } })
					}, 0);
				}
			}
		});
	}
);