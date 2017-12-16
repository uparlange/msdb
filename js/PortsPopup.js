define(["AbstractPopup", "DetailModel", "AppUtils"],
	function (AbstractPopup, DetailModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function PortsPopup(DetailModel, MatDialogRef) {
				AbstractPopup.call(this, DetailModel, MatDialogRef);
			},
			parameters: [
				[DetailModel], [ng.material.MatDialogRef]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("ports"))
			],
			functions: {
				getPortValue: function (value) {
					return value.replace(/:/g, " > ");
				}
			}
		});
	}
);