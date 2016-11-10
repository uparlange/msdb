define(["app:TranslatePipe", "app:NgForItemComponent", "app:LazyDirective"], 
function(TranslatePipe, NgForItemComponent, LazyDirective)
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
			LazyDirective
		],
		exports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.router.RouterModule,
			ng.material.MaterialModule,
			TranslatePipe,
			NgForItemComponent,
			LazyDirective
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});