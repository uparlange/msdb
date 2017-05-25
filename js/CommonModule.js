define(["AbstractModule", "TranslatePipe", "NgForItemComponent", "LazyDirective", "ScrollToTopDirective",
		"FormDirective", "HrefDirective"], 
function(AbstractModule, TranslatePipe, NgForItemComponent, LazyDirective, ScrollToTopDirective,
		FormDirective, HrefDirective)
{
	return ng.core.NgModule({
		imports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.material.material.MaterialModule
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
			ng.material.material.MaterialModule,
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