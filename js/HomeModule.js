define(["app:AbstractModule", "app:CommonModule", "app:HomeComponent", "app:HomeModel"], 
function(AbstractModule, CommonModule, HomeComponent, HomeModel)
{
	const HomeModule = function ()
	{
		AbstractModule.call(this);
	};
	
	return ng.core.NgModule({
		imports:[
			CommonModule,
			ng.router.RouterModule.forChild([
				{path: "", component: HomeComponent}
			])
		],
		declarations:[
			HomeComponent
		],
		providers:[
			HomeModel
		]
	}).Class({
		extends:AbstractModule,
		constructor:[HomeModule] 
	});
});