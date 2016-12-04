define(["app:AbstractModule", "app:TranslatePipe", "app:NgForItemComponent", "app:LazyDirective", "app:ScrollToTopDirective",
		"app:FormDirective", "app:HrefDirective"], 
function(AbstractModule, TranslatePipe, NgForItemComponent, LazyDirective, ScrollToTopDirective,
		 FormDirective, HrefDirective)
{
	return ng.core.NgModule({
		imports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.material.MaterialModule.forRoot()
		],
		declarations:[
			TranslatePipe,
			NgForItemComponent,
			LazyDirective,
			ScrollToTopDirective,
			FormDirective,
			HrefDirective
		],
		exports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.material.MaterialModule,
			TranslatePipe,
			NgForItemComponent,
			LazyDirective,
			ScrollToTopDirective,
			FormDirective,
			HrefDirective
		]
	}).Class({
		extends:AbstractModule,
		constructor:[
			function CommonModule()
			{
				AbstractModule.call(this);
			}
		]
	});
});