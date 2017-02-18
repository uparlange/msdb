define(["AbstractDirective", "AppUtils"],
function(AbstractDirective, AppUtils)
{
	const conf = AppUtils.getDirectiveConfiguration("form", {
		host: {
			"[attr.action]":"action"
		}
	});

	return ng.core.Directive(conf).Class(
	{
		extends:AbstractDirective,
		constructor: [
			function FormDirective ()
			{
				AbstractDirective.call(this);

				this.action = "javascript:void(0);"
			}
		]
	});
});