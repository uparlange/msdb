define(["AbstractPopup", "AbstractClassHelper", "DetailModel", "AppUtils"],
	function (AbstractPopup, AbstractClassHelper, DetailModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function DipSwitchsPopup(AbstractClassHelper, DetailModel, MatDialogRef) {
				AbstractPopup.call(this, AbstractClassHelper, DetailModel, MatDialogRef);
				this.provider = [];
			},
			parameters: [
				[AbstractClassHelper], [DetailModel], [ng.material.MatDialogRef]
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