define(["ProgressBarDirective", "TranslatePipe", "HrefDirective", "DriverComponent"], 
function(ProgressBarDirective, TranslatePipe, HrefDirective, DriverComponent)
{
	return ng.core.NgModule({
		imports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.material.MaterialModule.forRoot()
		],
		declarations:[
			ProgressBarDirective,
			TranslatePipe,
			HrefDirective,
			DriverComponent
		],
		exports:[
			ProgressBarDirective,
			TranslatePipe,
			HrefDirective,
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.material.MaterialModule,
			DriverComponent
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