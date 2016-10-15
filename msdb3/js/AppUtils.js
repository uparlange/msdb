define(function () 
{
    return {
		getTemplateUrl:function(componentName)
		{
			return this.getHtmlUrl(componentName + "-component");
		},
		getHtmlUrl:function(pageName)
		{
			return "html/" + pageName + ".html";
		},
		getStyleUrls:function(componentName)
		{
			return ["css/" + componentName + "-component.css"];
		},
		getIconUrl:function(game)
		{
			return (game.icon !== null ? this.getGameFolder(game) + "/" + game.icon.name : "images/mame_joy_32px.png");
		},
		getGameFolder:function(game)
		{
			return "http://localhost/projects/msdb2/dist/games/" + game.name;
		},
		getServiceUrl:function(serviceName)
		{
			return "http://localhost/projects/msdb2/dist/php/services/" + serviceName + ".php";
		},
		loadModule:function(moduleName)
		{
			return System.import("app:" + moduleName);
		}
	};
});