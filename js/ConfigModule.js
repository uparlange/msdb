import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import CommonModule from "./CommonModule.js";
import ConfigView from "./ConfigView.js";
import ConfigModel from "./ConfigModel.js";
import ConfigCanActivate from "./ConfigCanActivate.js";
import ConfigCanDeactivate from "./ConfigCanDeactivate.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function ConfigModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
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
		})
	]
});