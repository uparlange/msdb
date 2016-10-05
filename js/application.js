(function() {
	
	requirejs.config(
	{
		baseUrl:"js",
		paths: {
			npm: '../node_modules'
		}
	});

	requirejs(["AppModule"]);
	
})();