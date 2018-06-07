import AbstractComponent from "./AbstractComponent.js";
import AbstractClassHelper from "./AbstractClassHelper.js";

class GalleryComponent extends AbstractComponent {
	static get annotations() {
		return this.getAnnotations({
			selector: "gallery",
			inputs: ["folder", "provider", "colcount", "gap", "excludedExtensions"]
		});
	}
	static get parameters() {
		return this.getParameters(ng.core.ElementRef, ng.core.Renderer, AbstractClassHelper);
	}
	constructor(ElementRef, Renderer, AbstractClassHelper) {
		super(AbstractClassHelper);
		this._element = ElementRef.nativeElement;
		this._renderer = Renderer;
		this._windowResizeHandler = null;
		this._gallery = null;
		this._masonry = null;
		this._resizeTimeout = null;
	}
	onInit() {
		this._onWindowResizeHandler = () => {
			this._refreshMasonry();
		};
		this._windowResizeHandler = this._renderer.listen(this.getWindowRef().nativeWindow, "resize", this._onWindowResizeHandler);
	}
	onDestroy() {
		if (this._gallery !== null) {
			this._gallery.close();
		}
		if (this._masonry !== null) {
			this._masonry.destroy();
		}
		this._windowResizeHandler();
	}
	trackByName(index, item) {
		return item ? item.name : undefined;
	}
	imageAllowed(image) {
		if (!Array.isArray(this.excludedExtensions)) {
			return true;
		}
		else {
			const extension = image.name.split(".")[1];
			return (this.excludedExtensions.indexOf(extension) === -1);
		}
	}
	getImageUrl(image) {
		return this.folder + "/" + image.name;
	}
	getItemStyles(image) {
		const colwidth = this._getColWidth();
		const styles = {
			'float': 'left',
			'width': colwidth + "px",
			'height': this._getItemHeight(colwidth, image) + "px",
			'margin-bottom': this.gap + "px"
		};
		return styles;
	}
	openImage(image) {
		const provider = this._getAllowedImageProvider();
		provider.forEach((element, index) => {
			if (element.name === image.name) {
				this._openPhotoSwift(index);
				return;
			}
		});
	}
	imagesCreated() {
		this._refreshMasonry();
	}
	_getAllowedImageProvider() {
		const images = [];
		this.provider.forEach((image) => {
			if (this.imageAllowed(image)) {
				images.push({
					name: image.name,
					src: this.getImageUrl(image),
					w: image.width,
					h: image.height
				});
			}
		});
		return images;
	}
	_getItemHeight(requiredWidth, image) {
		return Math.round(requiredWidth * image.height / image.width);
	}
	_refreshMasonry() {
		if (this._masonry !== null) {
			this._masonry.destroy();
		}
		this._masonry = new Masonry(".grid", {
			itemSelector: ".grid-item",
			columnWidth: this._getColWidth(),
			gutter: this.gap,
			resize: false
		});
	}
	_windowResizeHandler() {
		this._refreshMasonry();
	}
	_getGalleryContainer() {
		/* TODO get reference in other way ? */
		return this._element.getElementsByClassName("gallery")[0];
	}
	_getPhotoSwipeContainer() {
		/* TODO get reference in other way ? */
		return this._element.getElementsByClassName("pswp")[0];
	}
	_getColWidth() {
		const provider = this._getAllowedImageProvider();
		const colcount = Math.min(this.colcount, provider.length);
		return Math.round((this._getGalleryContainer().clientWidth - (colcount * this.gap)) / colcount);
	}
	_openPhotoSwift(index) {
		if (this._gallery !== null) {
			this._gallery.close();
		}
		const items = this._getAllowedImageProvider();
		const options = {
			index: index,
			clickToCloseNonZoomable: false,
			shareEl: false,
			history: false
		};
		this._gallery = new PhotoSwipe(this._getPhotoSwipeContainer(), PhotoSwipeUI_Default, items, options);
		this._gallery.init();
	}
}

export default GalleryComponent;