define(["app:TranslatePipe", "app:NgForItemComponent", "app:BlazyDirective"], 
function(TranslatePipe, NgForItemComponent, BlazyDirective)
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
			BlazyDirective
		],
		exports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.router.RouterModule,
			ng.material.MaterialModule,
			TranslatePipe,
			NgForItemComponent,
			BlazyDirective
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});