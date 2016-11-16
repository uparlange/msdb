define(["app:AbstractModule", "app:CommonModule", "app:SearchView", "app:SearchModel"], 
function(AbstractModule, CommonModule, SearchView, SearchModel)
{
	const SearchModule = function ()
	{
		AbstractModule.call(this);
	};
	
	return ng.core.NgModule({
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
		constructor:SearchModule
	});
});