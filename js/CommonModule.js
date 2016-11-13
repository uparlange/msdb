define(["app:TranslatePipe", "app:NgForItemComponent", "app:LazyDirective", "app:ScrollToTopDirective"], 
function(TranslatePipe, NgForItemComponent, LazyDirective, ScrollToTopDirective)
{
	return ng.core.NgModule({
		imports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.router.RouterModule,
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
			ng.router.RouterModule,
			ng.material.MaterialModule,
			TranslatePipe,
			NgForItemComponent,
			LazyDirective,
			ScrollToTopDirective
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});