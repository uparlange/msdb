define(["AbstractPopup", "AbstractClassHelper", "DetailModel", "AppUtils"],
	function (AbstractPopup, AbstractClassHelper, DetailModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function PortsPopup(AbstractClassHelper, DetailModel, MatDialogRef) {
				AbstractPopup.call(this, AbstractClassHelper, DetailModel, MatDialogRef);
			},
			parameters: [
				[AbstractClassHelper], [DetailModel], [ng.material.MatDialogRef]
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