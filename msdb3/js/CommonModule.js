define(["ProgressBarDirective", "TranslatePipe"], 
function(ProgressBarDirective, TranslatePipe)
{
	return ng.core.NgModule({
		imports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.material.MaterialModule
		],
		declarations:[
			ProgressBarDirective,
			TranslatePipe
		],
		exports:[
			ProgressBarDirective,
			TranslatePipe,
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.material.MaterialModule
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});