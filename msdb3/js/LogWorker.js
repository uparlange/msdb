onmessage = function(e) 
{
	const params = e.data[0];
	console[params.methodName](params.className, params.message);
}