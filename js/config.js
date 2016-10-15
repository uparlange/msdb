SystemJS.config(
{
	paths : {
		"app:" : "js/",
		"npm:" : "node_modules/"
	},
	meta : {
		"*.css" : { 
			loader : "npm:systemjs-plugin-css/css.js" 
		}
	},
	packages : {
		"app:" : {
			defaultExtension : "js"
		}
	}
});