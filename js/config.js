SystemJS.config(
{
	paths : {
		"app:" : "js/",
		"npm:" : "node_modules/"
	},
	packages : {
		"app:" : {
			defaultExtension : "js"
		}
	}
});

GlobalConfig = {};

if(window.location.search.indexOf("debug") === -1)
{
	GlobalConfig.PRODUCTION = true;
	GlobalConfig.LOG_LEVEL = "info";
}
else
{
	GlobalConfig.PRODUCTION = false;
	GlobalConfig.LOG_LEVEL = "all";
}

GlobalConfig.HTTP_REQUEST_TIMEOUT = 30000;