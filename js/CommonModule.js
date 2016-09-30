define(["ProgressBarDirective", "TranslatePipe"], 
function(ProgressBarDirective, TranslatePipe)
{
	return ng.core.NgModule({
		imports:[
			ng.common.CommonModule,
			ng.http.HttpModule,
			ng.forms.FormsModule,
			md.toolbar.MdToolbarModule,
			md.card.MdCardModule,
			md.progressBar.MdProgressBarModule,
			md.input.MdInputModule,
			md.tabs.MdTabsModule,
			md.list.MdListModule,
			md.button.MdButtonModule
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
			md.toolbar.MdToolbarModule,
			md.card.MdCardModule,
			md.progressBar.MdProgressBarModule,
			md.input.MdInputModule,
			md.tabs.MdTabsModule,
			md.list.MdListModule,
			md.button.MdButtonModule
		]
	}).Class({
		constructor: function ()
		{
			
		}
	});
});