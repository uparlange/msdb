import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByYearsView from "./SearchByYearsView.js";
import SearchByYearsModel from "./SearchByYearsModel.js";

class SearchByYearsModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByYearsView }
				])
			],
			declarations: [
				SearchByYearsView
			],
			providers: [
				SearchByYearsModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default SearchByYearsModule;