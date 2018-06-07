import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByManufacturersView from "./SearchByManufacturersView.js";
import SearchByManufacturersModel from "./SearchByManufacturersModel.js";

class SearchByManufacturersModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByManufacturersView }
				])
			],
			declarations: [
				SearchByManufacturersView
			],
			providers: [
				SearchByManufacturersModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default SearchByManufacturersModule;