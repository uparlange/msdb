import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import SearchByLanguagesView from "./SearchByLanguagesView.js";
import SearchByLanguagesModel from "./SearchByLanguagesModel.js";

class SearchByLanguagesModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: SearchByLanguagesView }
				])
			],
			declarations: [
				SearchByLanguagesView
			],
			providers: [
				SearchByLanguagesModel
			]
		});
	}
	constructor() {
		super();
	}
}

export default SearchByLanguagesModule;