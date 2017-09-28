define(["AbstractPopup", "DetailModel", "AppUtils"],
	function (AbstractPopup, DetailModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function RomsPopup(DetailModel, MdDialogRef) {
				AbstractPopup.call(this, DetailModel, MdDialogRef);
			},
			parameters: [
				[DetailModel], [ng.material.MdDialogRef]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("roms"))
			]
		});
	}
);