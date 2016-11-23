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

window.GlobalConfig = {
	prod:true,
	logLevel:"off"
};