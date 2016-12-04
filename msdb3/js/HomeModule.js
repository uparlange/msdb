define(["app:AbstractModule", "app:CommonModule", "app:HomeView", "app:HomeModel"], 
function(AbstractModule, CommonModule, HomeView, HomeModel)
{
	return {
		module:ng.core.NgModule({
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
			constructor:[
				function HomeModule ()
				{
					AbstractModule.call(this);
				}
			] 
		})
	};
});