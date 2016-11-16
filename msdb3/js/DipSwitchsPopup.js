define(["app:AbstractPopup", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopup, DetailModel, AppUtils) 
{
	const DipSwitchsPopup = function (DetailModel, MdDialogRef)
	{
		AbstractPopup.call(this, DetailModel, MdDialogRef);
		
		this.provider = [];
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("dipSwitchs")).Class(
	{
		extends:AbstractPopup,
		constructor: [DetailModel, ng.material.MdDialogRef, DipSwitchsPopup],
		ngOnInit:function()
		{
			const map = {};
			const provider = [];
			this.model.data.game.dipswitchs.forEach((item, index, array) => 
			{
                if(map[item.tag] === undefined)
				{
					map[item.tag] = {name:item.tag, switchs:[]};
					provider.push(map[item.tag]);
				}
				map[item.tag].switchs.push(item);
            });
			this.provider = provider;
		}
	});	
});