import AppUtils from "./AppUtils.js";
import AbstractModule from "./AbstractModule.js";
import TranslatePipe from "./TranslatePipe.js";
import NgForItemComponent from "./NgForItemComponent.js";
import LazyDirective from "./LazyDirective.js";
import ScrollToTopDirective from "./ScrollToTopDirective.js";
import HrefDirective from "./HrefDirective.js";
import MaterialModule from "./MaterialModule.js";
import TreeComponent from "./TreeComponent.js";

export default AppUtils.getClass({
	extends: AbstractModule,
	constructor: function CommonModule() {
		AbstractModule.call(this);
	},
	annotations: [
		new ng.core.NgModule({
			imports: [
				ng.common.CommonModule,
				ng.forms.FormsModule,
				MaterialModule
			],
			declarations: [
				TranslatePipe,
				NgForItemComponent,
				LazyDirective,
				ScrollToTopDirective,
				HrefDirective,
				TreeComponent
			],
			exports: [
				ng.common.CommonModule,
				ng.forms.FormsModule,
				MaterialModule,
				TranslatePipe,
				NgForItemComponent,
				LazyDirective,
				ScrollToTopDirective,
				HrefDirective,
				TreeComponent
			]
		})
	]
});