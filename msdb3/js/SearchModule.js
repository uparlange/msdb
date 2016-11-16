define(["app:AbstractModule", "app:CommonModule", "app:SearchComponent", "app:SearchModel"], 
function(AbstractModule, CommonModule, SearchComponent, SearchModel)
{
	const SearchModule = function ()
	{
		AbstractModule.call(this);
	};
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild([
				{path: "", component: SearchComponent}
			])
		],
		declarations:[
			SearchComponent
		],
		providers:[
			SearchModel
		]
	}).Class({
		extends:AbstractModule,
		constructor:SearchModule
	});
});