import AbstractModel from "./AbstractModel.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import MsdbService from "./MsdbService.js";
import AppUtils from "./AppUtils.js";

class SearchByCategoriesModel extends AbstractModel {
	static get parameters() {
		return AppUtils.getParameters(AbstractClassHelper, MsdbService);
	}
	constructor(AbstractClassHelper, MsdbService) {
		super(AbstractClassHelper, MsdbService);
	}
	hasChild(_, _nodeData) {
		return _nodeData.expandable;
	}
	onRefresh(callback) {
		const categories = [];
		const category_map = {};
		this.getServices().getCategories().subscribe((data) => {
			data.forEach((item) => {
				const item_split = item.label.split("/");
				const category = item_split[0].trim();
				if (category_map[category] == null) {
					category_map[category] = {
						label: category,
						data: category,
						children: []
					}
					categories.push(category_map[category]);
				}
				category_map[category].children.push({
					label: (item_split.length > 1) ? item_split[1].trim() : category,
					data: item.label
				});
			});
			this.data.dataSource.data = categories;
			callback();
		});
	}
	trackByData(index, item) {
		return item ? item.data : undefined;
	}
	_transformer(node, level) {
		return {
			label: node.label,
			data: node.data,
			level: level,
			expandable: !!node.children
		};
	}
	_getLevel(node) {
		return node.level;
	}
	_isExpandable(node) {
		return node.expandable;
	}
	_getChildren(node) {
		return rxjs.of(node.children);
	}
	_getInitData() {
		const treeControl = new ng.cdk.tree.FlatTreeControl(this._getLevel, this._isExpandable);
		const treeFlattener = new ng.material.MatTreeFlattener(this._transformer, this._getLevel, this._isExpandable, this._getChildren);
		return {
			dataSource: new ng.material.MatTreeFlatDataSource(treeControl, treeFlattener, []),
			treeControl: treeControl,
			selectedItem: null
		};
	}
}

export default SearchByCategoriesModel;