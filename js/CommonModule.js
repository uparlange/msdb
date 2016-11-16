define(["app:AbstractModule", "app:TranslatePipe", "app:NgForItemComponent", "app:LazyDirective", "app:ScrollToTopDirective"], 
function(AbstractModule, TranslatePipe, NgForItemComponent, LazyDirective, ScrollToTopDirective)
{
	const CommonModule = function()
	{
		AbstractModule.call(this);
	};
	
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
			ScrollToTopDirective
		],
		exports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.material.MaterialModule,
			TranslatePipe,
			NgForItemComponent,
			LazyDirective,
			ScrollToTopDirective
		]
	}).Class({
		extends:AbstractModule,
		constructor:CommonModule
	});
});