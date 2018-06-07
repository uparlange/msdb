import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import DetailView from "./DetailView.js";
import DetailModel from "./DetailModel.js";
import DriverPopup from "./DriverPopup.js";
import RomsPopup from "./RomsPopup.js";
import ClonesPopup from "./ClonesPopup.js";
import GalleryComponent from "./GalleryComponent.js";
import DipSwitchsPopup from "./DipSwitchsPopup.js";
import ChipsPopup from "./ChipsPopup.js";
import BiossetsPopup from "./BiossetsPopup.js";
import PortsPopup from "./PortsPopup.js";
import DeviceRefsPopup from "./DeviceRefsPopup.js";

class DetailModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: DetailView }
				])
			],
			declarations: [
				DetailView,
				DriverPopup,
				RomsPopup,
				ClonesPopup,
				GalleryComponent,
				DipSwitchsPopup,
				ChipsPopup,
				BiossetsPopup,
				PortsPopup,
				DeviceRefsPopup
			],
			providers: [
				DetailModel
			],
			entryComponents: [
				DriverPopup,
				RomsPopup,
				ClonesPopup,
				DipSwitchsPopup,
				ChipsPopup,
				BiossetsPopup,
				PortsPopup,
				DeviceRefsPopup
			]
		});
	}
	constructor() {
		super();
	}
}

export default DetailModule;