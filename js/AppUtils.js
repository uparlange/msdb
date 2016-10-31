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
			return this._getBaseUrl() + "/games/" + game.name;
		},
		getServiceUrl:function(serviceName)
		{
			return this._getBaseUrl() + "/php/services/" + serviceName + ".php";
		},
		loadModule:function(moduleName)
		{
			return System.import("app:" + moduleName);
		},
		_getBaseUrl:function()
		{
			return "http://localhost/projects/msdb2/dist";
			//return "http://192.168.0.15/projects/msdb2/dist";
			//return "";
		}
	};
});