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

window.GlobalConfig = {}
if(window.location.search.indexOf("debug") === -1)
{
	window.GlobalConfig.prod = true;
	window.GlobalConfig.logLevel = "info"
}
else
{
	window.GlobalConfig.prod = false;
	window.GlobalConfig.logLevel = "all";
}