import AbstractComponent from "./AbstractComponent.js";
import AbstractClassHelper from "./AbstractClassHelper.js";
import AppUtils from "./AppUtils.js";

class MdiIconComponent extends AbstractComponent {
    static get annotations() {
        return this.getAnnotations({
            selector: "mdiIcon",
            inputs: ["alt", "name", "size"],
            host: {
                "role": "img",
                "[attr.alt]": "alt"
            }
        });
    }
    static get parameters() {
        return AppUtils.getParameters(AbstractClassHelper);
    }
    constructor(AbstractClassHelper) {
        super(AbstractClassHelper);
        this.name = "";
        this.alt = "";
        this.size = 24;
        this.iconAvailable = false;
    }
    onInit() {
        this._refresh();
    }
    onChanges(event) {
        if (event.hasOwnProperty("name")) {
            this._refresh();
        }
    }
    _refresh() {
        this._refreshAltProperty();
        this._refreshIconAvailable();
    }
    _refreshAltProperty() {
        this.alt = this.name + "-icon";
    }
    _refreshIconAvailable() {
        this.iconAvailable = this._iconAvailable();
    }
    _iconAvailable() {
        const styleSheetsCount = document.styleSheets.length;
        for (let i = 0; i < styleSheetsCount; i++) {
            const styleSheet = document.styleSheets[i];
            if (styleSheet.href && styleSheet.href.indexOf("@mdi") != -1) {
                const rulesCount = styleSheet.rules.length;
                for (let j = 0; j < rulesCount; j++) {
                    const rule = styleSheet.rules[j];
                    if (rule.selectorText == ".mdi-" + this.name + "::before") {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

export default MdiIconComponent;