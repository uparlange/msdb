define(["ProgressBarDirective", "TranslatePipe", "DriverComponent"], 
function(ProgressBarDirective, TranslatePipe, DriverComponent)
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
			DriverComponent
		],
		exports:[
			ProgressBarDirective,
			TranslatePipe,
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