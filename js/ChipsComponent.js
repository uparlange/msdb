define(["app:AbstractPopupComponent", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopupComponent, DetailModel, AppUtils) 
{
	const ChipsComponent = function (DetailModel, MdDialogRef)
	{
		AbstractPopupComponent.call(this, DetailModel, MdDialogRef);
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("chips")).Class(
	{
		extends:AbstractPopupComponent,
		constructor: [DetailModel, ng.material.MdDialogRef, ChipsComponent],
		ngOnInit:function()
		{
			const map = {};
			const provider = [];
			this.model.data.game.chips.forEach((item, index, array) => 
			{
                if(map[item.type] === undefined)
				{
					map[item.type] = {name:item.type.toUpperCase(), values:[]};
					provider.push(map[item.type]);
				}
				map[item.type].values.push(item);
            });
			this.provider = provider;
		}
	});	
});