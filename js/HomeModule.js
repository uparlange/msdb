define(["app:AbstractModule", "app:CommonModule", "app:HomeView", "app:HomeModel"], 
function(AbstractModule, CommonModule, HomeView, HomeModel)
{
	const HomeModule = function ()
	{
		AbstractModule.call(this);
	};
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild([
				{path: "", component: HomeView}
			])
		],
		declarations:[
			HomeView
		],
		providers:[
			HomeModel
		]
	}).Class({
		extends:AbstractModule,
		constructor:[HomeModule] 
	});
});