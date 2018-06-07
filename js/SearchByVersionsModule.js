import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByVersionsView from "./SearchByVersionsView.js";
import SearchByVersionsModel from "./SearchByVersionsModel.js";

class SearchByVersionsModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByVersionsView }
				])
			],
			declarations: [
				SearchByVersionsView
			],
			providers: [
				SearchByVersionsModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default SearchByVersionsModule;