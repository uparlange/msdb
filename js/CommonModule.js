define(["AbstractModule", "TranslatePipe", "NgForItemComponent", "LazyDirective", "ScrollToTopDirective",
	"HrefDirective", "MaterialModule", "AppUtils"],
	function (AbstractModule, TranslatePipe, NgForItemComponent, LazyDirective, ScrollToTopDirective,
		HrefDirective, MaterialModule, AppUtils) {
		return AppUtils.getClass({
			extends: AbstractModule,
			constructor: function CommonModule() {
				AbstractModule.call(this);
			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						ng.common.CommonModule,
						ng.common.http.HttpClientModule,
						ng.forms.FormsModule,
						MaterialModule
					],
					declarations: [
						TranslatePipe,
						NgForItemComponent,
						LazyDirective,
						ScrollToTopDirective,
						HrefDirective
					],
					exports: [
						ng.common.CommonModule,
						ng.common.http.HttpClientModule,
						ng.forms.FormsModule,
						MaterialModule,
						TranslatePipe,
						NgForItemComponent,
						LazyDirective,
						ScrollToTopDirective,
						HrefDirective
					]
				})
			]
		});
	}
);