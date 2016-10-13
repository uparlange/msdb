define(["app:TranslatePipe", "app:HrefDirective", "app:VideoDirective", "app:GalleryComponent", "app:NgForItemComponent"], 
function(TranslatePipe, HrefDirective, VideoDirective, GalleryComponent, NgForItemComponent)
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
			VideoDirective,
			GalleryComponent,
			NgForItemComponent
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});