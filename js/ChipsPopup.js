define(["AbstractPopup", "AbstractClassHelper", "DetailModel", "AppUtils"],
	function (AbstractPopup, AbstractClassHelper, DetailModel, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractPopup,
			constructor: function ChipsPopup(AbstractClassHelper, DetailModel, MatDialogRef) {
				AbstractPopup.call(this, AbstractClassHelper, DetailModel, MatDialogRef);
			},
			parameters: [
				[AbstractClassHelper], [DetailModel], [ng.material.MatDialogRef]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("chips"))
			],
			functions: {
				onInit: function () {
					const map = {};
					const provider = [];
					this.model.data.game.chips.forEach((item) => {
						if (map[item.type] === undefined) {
							map[item.type] = { name: item.type.toUpperCase(), values: [] };
							provider.push(map[item.type]);
						}
						map[item.type].values.push(item);
					});
					this.provider = provider;
				}
			}
		});
	}
);