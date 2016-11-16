define(["app:AbstractPopupComponent", "app:DetailModel", "app:AppUtils"], 
function(AbstractPopupComponent, DetailModel, AppUtils) 
{
	const DipSwitchsComponent = function (DetailModel, MdDialogRef)
	{
		AbstractPopupComponent.call(this, DetailModel, MdDialogRef);
		
		this.provider = [];
	};
	
	return ng.core.Component(AppUtils.getComponentConfiguration("dipSwitchs")).Class(
	{
		extends:AbstractPopupComponent,
		constructor: [DetailModel, ng.material.MdDialogRef, DipSwitchsComponent],
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