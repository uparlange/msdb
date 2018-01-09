define(["AbstractModule", "TranslatePipe", "NgForItemComponent", "LazyDirective", "ScrollToTopDirective",
	"HrefDirective", "MaterialModule", "AppUtils", "TreeComponent"],
	function (AbstractModule, TranslatePipe, NgForItemComponent, LazyDirective, ScrollToTopDirective,
		HrefDirective, MaterialModule, AppUtils, TreeComponent) {
		return AppUtils.getClass({
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
	}
);