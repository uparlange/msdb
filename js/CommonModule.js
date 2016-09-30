define(["ProgressBarDirective", "TranslatePipe", "HrefDirective", "DriverComponent"], 
function(ProgressBarDirective, TranslatePipe, HrefDirective, DriverComponent)
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
			ProgressBarDirective,
			TranslatePipe,
			HrefDirective,
			DriverComponent
		],
		exports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.router.RouterModule,
			ng.material.MaterialModule,
			ProgressBarDirective,
			TranslatePipe,
			HrefDirective
		],
		entryComponents:[
			DriverComponent
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});