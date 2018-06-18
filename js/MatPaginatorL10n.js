import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class MatPaginatorL10n extends ng.material.MatPaginatorIntl {
    static get parameters() {
        return AppUtils.getParameters(AbstractClassHelper);
    }
    constructor(AbstractClassHelper) {
        super();
        this._helper = AbstractClassHelper;
        this._refreshTranslation();
        this._onLanguageChangeSubscriber = this.getLabels().on("languageChange").subscribe(() => {
            this._refreshTranslation();
        });
        // TODO optimize
        this.getRangeLabel = function (page, pageSize, length) {
            if (length == 0 || pageSize == 0) {
                return `0 / ${length}`;
            }
            length = Math.max(length, 0);
            const startIndex = page * pageSize;
            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
            return `${(startIndex + 1)}...${endIndex} / ${length}`;
        }
    }
    getLabels() {
        return this._helper.getLabels();
    }
    _refreshTranslation() {
        this.getLabels().getValues(["L10N_FIRST_PAGE", "L10N_LAST_PAGE", "L10N_NEXT_PAGE", "L10N_PREVIOUS_PAGE", "L10N_ITEMS_PER_PAGE"]).subscribe((translations) => {
            this.firstPageLabel = translations.L10N_FIRST_PAGE;
            this.itemsPerPageLabel = translations.L10N_ITEMS_PER_PAGE;
            this.lastPageLabel = translations.L10N_LAST_PAGE;
            this.nextPageLabel = translations.L10N_NEXT_PAGE;
            this.previousPageLabel = translations.L10N_PREVIOUS_PAGE;
        });
    }
}

export default MatPaginatorL10n;