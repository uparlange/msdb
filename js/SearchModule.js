define(["AbstractModule", "CommonModule", "SearchView", "SearchModel"], 
function(AbstractModule, CommonModule, SearchView, SearchModel)
{
	return {
		module:ng.core.NgModule({
			imports:[
				CommonModule,
				ng.router.RouterModule.forChild([
					{path: "", component: SearchView}
				])
			],
			declarations:[
				SearchView
			],
			providers:[
				SearchModel
			]
		}).Class({
			extends:AbstractModule,
			constructor:[
				function SearchModule ()
				{
					AbstractModule.call(this);
				}
			]
		})
	};
});