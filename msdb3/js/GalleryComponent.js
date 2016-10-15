define(["app:AppUtils", "npm:photoswipe/dist/photoswipe.min.js", "npm:photoswipe/dist/photoswipe-ui-default.min.js", "npm:masonry-layout/dist/masonry.pkgd.js", "npm:photoswipe/dist/photoswipe.css", "npm:photoswipe/dist/default-skin/default-skin.css"], 
function(AppUtils, PhotoSwipe, PhotoSwipeUI_Default, Masonry) 
{
	const componentName = "gallery";
	
	return ng.core.Component({
		selector: componentName,
		templateUrl: AppUtils.getTemplateUrl(componentName),
		inputs:["folder", "provider", "colcount", "gap", "excludedExtensions"]
	}).Class({
		constructor: [ng.core.ElementRef,
			function (element)
			{
				this._element = element;
				
				this._gallery = null;
				
				this._masonry = null;
				
				this._resizeTimeout = null;
			}
		],
		ngOnInit:function()
		{
			this._windowResizeHandler = () =>
			{
				this._refreshMasonry();
			}
			
			window.addEventListener("resize", this._windowResizeHandler);
		},
		ngOnDestroy:function()
		{
			if(this._gallery !== null)
			{
				this._gallery.close();
			}
			
			if(this._masonry !== null)
			{
				this._masonry.destroy();
			}
			
			window.removeEventListener("resize", this._windowResizeHandler);
		},
		imageAllowed:function(image)
		{
			if(!Array.isArray(this.excludedExtensions))
			{
				return true;
			}
			else
			{
				const extension = image.name.split(".")[1];
				return (this.excludedExtensions.indexOf(extension) === -1);
			}
		},
		getImageUrl:function(image)
		{
			return this.folder + "/" + image.name;
		},
		getItemStyles:function(image)
		{
			const colwidth = this._getColWidth();
			
			const styles = {
				'float': 'left', 
				'width':colwidth + "px", 
				'height':this._getItemHeight(colwidth, image) + "px",
				'margin-bottom':this.gap + "px"
			};
			return styles;
		},
		openImage:function(image)
		{
			const provider = this._getAllowedImageProvider();
			provider.forEach((element, index, array) =>
			{
				if(element.name === image.name)
				{
					this._openPhotoSwift(index);
					return;
				}
			});
		},
		imagesCreated:function()
		{
			this._refreshMasonry();
		},
		_getAllowedImageProvider:function()
		{
			const images = [];
			this.provider.forEach((image, index, array) =>
			{
				if(this.imageAllowed(image))
				{
					images.push({
						name:image.name,
						src:this.getImageUrl(image),
						w:image.width,
						h:image.height
					});
				}
			});
			return images;
		},
		_getItemHeight:function(requiredWidth, image)
		{
			return Math.round(requiredWidth * image.height / image.width);
		},
		_refreshMasonry:function()
		{
			if(this._masonry !== null)
			{
				this._masonry.destroy();
			}
			
			this._masonry = new Masonry(".grid", {
				itemSelector: ".grid-item",
				columnWidth: this._getColWidth(),
				gutter:this.gap,
				resize:false
			});
		},
		_windowResizeHandler:function()
		{
			this._refreshMasonry();
		},
		_getGalleryContainer:function()
		{
			const element = this._element.nativeElement;
			
			return element.getElementsByClassName("gallery")[0];
		},
		_getPhotoSwipeContainer:function()
		{
			const element = this._element.nativeElement;
			
			return element.getElementsByClassName("pswp")[0];
		},
		_getColWidth:function()
		{
			const provider = this._getAllowedImageProvider();
			const colcount = Math.min(this.colcount, provider.length);
			return Math.round((this._getGalleryContainer().clientWidth - (colcount * this.gap)) / colcount);
		},
		_openPhotoSwift:function(index)
		{
			if(this._gallery !== null)
			{
				this._gallery.close();
			}
			
			const element = this._element.nativeElement;
			
			const items = this._getAllowedImageProvider();

			const options = {
				index: index,
				clickToCloseNonZoomable:false,
				shareEl:false,
				history:false
			};

			this._gallery = new PhotoSwipe(this._getPhotoSwipeContainer(), PhotoSwipeUI_Default, items, options);
			this._gallery.init();
		}
	});
});