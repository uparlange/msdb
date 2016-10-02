define(["TranslatePipe", "HrefDirective", "VideoDirective"], 
function(TranslatePipe, HrefDirective, VideoDirective)
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
			VideoDirective
		],
		exports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.router.RouterModule,
			ng.material.MaterialModule,
			TranslatePipe,
			HrefDirective,
			VideoDirective
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});