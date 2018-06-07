import AbstractPopup from "./AbstractPopup.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import DetailModel from "./DetailModel.js";

class ChipsPopup extends AbstractPopup {
	static get annotations() {
		return this.getAnnotations({ selector: "chips" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, DetailModel, ng.material.MatDialogRef);
	}
	constructor(AbstractClassHelper, DetailModel, MatDialogRef) {
		super(AbstractClassHelper, DetailModel, MatDialogRef);
	}
	onInit() {
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

export default ChipsPopup;