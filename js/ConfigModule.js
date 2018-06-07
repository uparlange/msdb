import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import ConfigView from "./ConfigView.js";
import ConfigModel from "./ConfigModel.js";
import ConfigCanActivate from "./ConfigCanActivate.js";
import ConfigCanDeactivate from "./ConfigCanDeactivate.js";

class ConfigModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				CommonModule,
				ng.router.RouterModule.forChild([
					{ path: "", component: ConfigView, canActivate: [ConfigCanActivate], canDeactivate: [ConfigCanDeactivate] }
				])
			],
			declarations: [
				ConfigView
			],
			providers: [
				ConfigModel,
				ConfigCanActivate,
				ConfigCanDeactivate
			]
		});
	}
	constructor() {
		super();
	}
}

export default ConfigModule;