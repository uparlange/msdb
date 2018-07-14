import AbstractModule from "./AbstractModule.js";
import TranslatePipe from "./TranslatePipe.js";
import NgForItemComponent from "./NgForItemComponent.js";
import LazyDirective from "./LazyDirective.js";
import ScrollToTopDirective from "./ScrollToTopDirective.js";
import HrefDirective from "./HrefDirective.js";
import MaterialModule from "./MaterialModule.js";
import MdiIconComponent from "./MdiIconComponent.js";

class CommonModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
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
				MdiIconComponent
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
				MdiIconComponent
			]
		});
	}
	constructor() {
		super();
	}
}

export default CommonModule;