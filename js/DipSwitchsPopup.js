import AbstractPopup from "./AbstractPopup.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import DetailModel from "./DetailModel.js";

class DipSwitchsPopup extends AbstractPopup {
	static get annotations() {
		return this.getAnnotations({ selector: "dipSwitchs" });
	}
	static get parameters() {
		return this.getParameters(AbstractClassHelper, DetailModel, ng.material.MatDialogRef);
	}
	constructor(AbstractClassHelper, DetailModel, MatDialogRef) {
		super(AbstractClassHelper, DetailModel, MatDialogRef);
		this.provider = [];
	}
	onInit() {
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

export default DipSwitchsPopup;