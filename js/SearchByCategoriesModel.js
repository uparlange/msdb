import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";

class SearchByCategoriesModel extends AbstractModel {
	static get parameters() {
		return this.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
	}
	onRefresh(callback) {
		this._refreshList().subscribe(() => {
			this._refreshSelection();
			callback();
		});
	}
	_refreshSelection() {
		if (this.data.list !== null) {
			const params = this.getRouter().getUrlQueryParams();
			if (params.hasOwnProperty("category")) {
				this.data.list.forEach((element) => {
					if (element.label === params.category) {
						this.data.selectedItem = element;
						return;
					}
				});
			}
		}
	}
	_refreshList() {
		const eventEmitter = new ng.core.EventEmitter();
		if (this.data.list === null) {
			const categories = [];
			const category_map = {};
			this.getServices().getCategories().subscribe((data) => {
				data.forEach((item) => {
					const item_split = item.label.split("/");
					const category = item_split[0].trim();
					if (category_map[category] == null) {
						category_map[category] = {
							label: category,
							data: null,
							children: []
						}
						categories.push(category_map[category]);
					}
					category_map[category].children.push({
						label: (item_split.length > 1) ? item_split[1].trim() : category,
						data: item.label
					});
				});
				this.data.list = categories;
				eventEmitter.emit();
			});
		} else {
			setTimeout(() => {
				eventEmitter.emit();
			}, 0);
		}
		return eventEmitter;
	}
	_getInitData() {
		return {
			list: null,
			selectedItem: null
		};
	}
}

export default SearchByCategoriesModel;