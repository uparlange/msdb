define(["app:AbstractModule", "app:TranslatePipe", "app:NgForItemComponent", "app:LazyDirective", "app:ScrollToTopDirective",
		"app:FormDirective"], 
function(AbstractModule, TranslatePipe, NgForItemComponent, LazyDirective, ScrollToTopDirective,
		 FormDirective)
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
			ScrollToTopDirective,
			FormDirective
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
			FormDirective
		]
	}).Class({
		extends:AbstractModule,
		constructor:[CommonModule]
	});
});