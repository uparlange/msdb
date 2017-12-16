define(["AbstractPopup", "DetailModel", "AppUtils"],
	function (AbstractPopup, DetailModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function RomsPopup(DetailModel, MatDialogRef) {
				AbstractPopup.call(this, DetailModel, MatDialogRef);
			},
			parameters: [
				[DetailModel], [ng.material.MatDialogRef]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("roms"))
			]
		});
	}
);