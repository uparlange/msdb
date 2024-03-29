import AbstractModule from "./AbstractModule.js";
import TranslatePipe from "./TranslatePipe.js";
import NgForItemComponent from "./NgForItemComponent.js";
import LazyDirective from "./LazyDirective.js";
import ScrollToTopDirective from "./ScrollToTopDirective.js";
import LinkDirective from "./LinkDirective.js";
import MaterialModule from "./MaterialModule.js";
import MdiIconComponent from "./MdiIconComponent.js";

class CommonModule extends AbstractModule {
	static get annotations() {
		return this.getAnnotations({
			imports: [
				ng.common.CommonModule,
				ng.forms.FormsModule,
				ng.common.http.HttpClientModule,
				MaterialModule
			],
			declarations: [
				TranslatePipe,
				NgForItemComponent,
				LazyDirective,
				ScrollToTopDirective,
				LinkDirective,
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
				LinkDirective,
				MdiIconComponent
			]
		});
	}
	constructor() {
		super();
	}
}

export default CommonModule;