define(["app:TranslatePipe", "app:NgForItemComponent"], 
function(TranslatePipe, NgForItemComponent)
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
			NgForItemComponent
		],
		exports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.router.RouterModule,
			ng.material.MaterialModule,
			TranslatePipe,
			NgForItemComponent
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});