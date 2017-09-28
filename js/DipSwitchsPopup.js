define(["AbstractPopup", "DetailModel", "AppUtils"],
	function (AbstractPopup, DetailModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function DipSwitchsPopup(DetailModel, MdDialogRef) {
				AbstractPopup.call(this, DetailModel, MdDialogRef);
				this.provider = [];
			},
			parameters: [
				[DetailModel], [ng.material.MdDialogRef]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("dipSwitchs"))
			],
			functions: {
				onInit: function () {
					const map = {};
					const provider = [];
					this.model.data.game.dipswitchs.forEach((item) => {
						if (map[item.tag] === undefined) {
							map[item.tag] = { name: item.tag, switchs: [] };
							provider.push(map[item.tag]);
						}
						map[item.tag].switchs.push(item);
					});
					this.provider = provider;
				}
			}
		});
	}
);