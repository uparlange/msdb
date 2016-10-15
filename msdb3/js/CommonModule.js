define(["app:TranslatePipe", "app:HrefDirective", "app:NgForItemComponent"], 
function(TranslatePipe, HrefDirective, NgForItemComponent)
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
			HrefDirective,
			NgForItemComponent
		],
		exports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.router.RouterModule,
			ng.material.MaterialModule,
			TranslatePipe,
			HrefDirective,
			NgForItemComponent
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});