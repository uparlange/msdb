define(["AbstractPopup", "DetailModel", "AppUtils"],
	function (AbstractPopup, DetailModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function DeviceRefsPopup(DetailModel, MdDialogRef) {
				AbstractPopup.call(this, DetailModel, MdDialogRef);
			},
			parameters: [
				[DetailModel], [ng.material.MatDialogRef]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("deviceRefs"))
			]
		});
	}
);