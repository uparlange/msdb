onmessage = function(e) 
{
	const params = e.data[0];
	const Console = console;
	Console[params.methodName](params.className, params.message);
};