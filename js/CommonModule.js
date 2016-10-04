define(["TranslatePipe", "HrefDirective", "VideoDirective", "GalleryComponent", "NgForItemDirective"], 
function(TranslatePipe, HrefDirective, VideoDirective, GalleryComponent, NgForItemDirective)
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
			VideoDirective,
			GalleryComponent,
			NgForItemDirective
		],
		exports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			ng.router.RouterModule,
			ng.material.MaterialModule,
			TranslatePipe,
			HrefDirective,
			VideoDirective,
			GalleryComponent,
			NgForItemDirective
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});