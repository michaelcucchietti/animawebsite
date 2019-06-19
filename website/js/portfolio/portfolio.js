var AnimaPortfolio = function() {
    this.section = document.getElementById('portfolio');
    this.section.data = this.section.getElementsByAttribute('anima-id', 'portfolioContent')[0];
    this.section.scrollUp = function() {
        if(this.hasOwnProperty('sectionManager'))
            this.sectionManager.scrollAllUp(this);
    };
    this.goBackPreviewsElement = this.section.getElementsByClassName('goBackPreviews')[0];

    this.Previews = function(section, portfolio) {
        this.element = section.getElementsByClassName('contentPortfolioPreviews')[0];
        this.dataLayer = this.element.getElementsByClassName('data')[0];
        this.previewElements = section.getElementsByClassName('preview');
        this.portfolio = portfolio;
        this.scrollPreviewPosition = 0;
        this.Preview = function(previewElement, portfolio) {
            this.preview = previewElement;
            this.portfolio = portfolio;
            this.galleryTarget = this.preview.getAttribute('anima-target');

            // init
            this.preview.handler = this;
            this.preview.layer = this.preview.getElementsByClassName('layer')[0];
            this.preview.galleryButton = this.preview.layer.getElementsByTagName('button')[0];
            this.preview.galleryButton.handler = this;


            if(!isMobile()) {
                this.preview.addEventListener('mouseenter', function (evt) {
                    var targetTop = '-' + parseFloat(toFloat(getJSValue(this, 'height'))) + 'px';
                    (new Animations.AnimationTop(this.layer, 0.2, AnimationCurves.linear, targetTop)).start();
                });
                this.preview.addEventListener('mouseleave', function (evt) {
                    (new Animations.AnimationTop(this.layer, 0.2, AnimationCurves.linear, '0px')).start();
                });
                this.preview.galleryButton.addEventListener('click', function(evt) {
                    if(this.handler.galleryTarget == null || typeof this.handler.galleryTarget === 'undefined') {
                        return;
                    }

                    this.handler.portfolio.showGallery(this.handler.galleryTarget);
                });
            } else {
                this.preview.addEventListener('click', function() {
                    if(this.handler.galleryTarget == null || typeof this.handler.galleryTarget === 'undefined') {
                        return;
                    }

                    this.handler.portfolio.showGallery(this.handler.galleryTarget);
                })
            }


        };

        this.setVisible = function(value) {
            if(value) {
                this.dataLayer.removeClass('displayNone');
            } else {
                this.dataLayer.addClasses('displayNone');
            }
        };

        for(var p = 0; p < this.previewElements.length; p++) {
            var preview = this.previewElements[p];
            (new this.Preview(preview, this.portfolio));                        // init preview element
        }
    };
    this.GalleryManager = function(section, portfolio) {
        this.galleryHandlerElement = section.getElementsByClassName('contentPortfolioGallery')[0];
        this.dataLayer = this.galleryHandlerElement.getElementsByClassName('data')[0];
        this.Gallery = function(galleryElement) {
            this.element = galleryElement;
            this.targetId = galleryElement.getAttribute('anima-id');
            this.slider = this.element.getElementsByClassName('slider')[0];
            this.controlsElement = this.slider.getElementsByClassName('controls')[0];
            this.Controls = function(controlsElement) {
                this.element = controlsElement;
                this.slider = this.element.parentElement;
                this.slider.images = this.slider.getElementsByClassName('images')[0];
                this.slider.controls = this;
                this.toLeftElement = this.element.getElementsByClassName('goLeft')[0];
                this.toRightElement = this.element.getElementsByClassName('goRight')[0];
                this.toLeftElement.controls = this;
                this.toRightElement.controls = this;
                this.counter = this.element.getElementsByClassName('counter')[0];
                this.imagesCount = this.slider.getElementsByClassName('sliderImage').length;
                this.currentIndex = 0;
                this.TouchParameters = function() {
                    this.startPoint = 0;
                    this.endPoint = 0;

                    this.isGestureLeft = function() {return this.endPoint < this.startPoint};
                    this.isGestureRight = function() {return this.endPoint > this.startPoint};
                };
                this.touchParameters = new this.TouchParameters();

                this.goRight = function() {
                    var left = parseFloat(toFloat(getJSValue(this.slider.images, 'width')));
                    var indexAdaptee = -(this.currentIndex + 1);
                    this.currentIndex++;
                    var leftValue = (indexAdaptee * left) + 'px';
                    (new Animations.AnimationLeft(this.slider.images, 0.2, AnimationCurves.linear, leftValue)).start();
                    this.updateControls();
                };
                this.goLeft = function() {
                    var left = parseFloat(toFloat(getJSValue(this.slider.images, 'width')));
                    var indexAdaptee = -(this.currentIndex - 1);
                    this.currentIndex--;
                    var leftValue = (indexAdaptee * left) + 'px';
                    (new Animations.AnimationLeft(this.slider.images, 0.2, AnimationCurves.linear, leftValue)).start();
                    this.updateControls();
                };
                this.updateControls = function() {
                    this.counter.innerText = (this.currentIndex + 1) + ' / ' + this.imagesCount;
                    if(this.currentIndex <= 0) {
                        this.toLeftElement.addClass('displayNone');
                    } else {
                        this.toLeftElement.removeClass('displayNone');
                    }
                    if(this.currentIndex >= this.imagesCount - 1) {
                        this.toRightElement.addClass('displayNone');
                    } else {
                        this.toRightElement.removeClass('displayNone');
                    }
                };

                this.toLeftElement.addEventListener('click', function() {
                    this.controls.goLeft();
                });
                this.toRightElement.addEventListener('click', function() {
                    this.controls.goRight();
                });
                this.slider.addEventListener('touchstart', function(evt) {
                    this.controls.touchParameters.startPoint = evt.touches[0].clientX;
                });
                this.slider.addEventListener('touchend', function(evt) {
                    var touchP = this.controls.touchParameters;
                    touchP.endPoint = evt.touches[0].clientX;
                    if(touchP.isGestureLeft()) {
                        this.controls.goRight();
                    } else if(touchP.isGestureRight()) {
                        this.controls.goLeft();
                    }

                });



                this.updateControls();
            };
            this.controls = new this.Controls(this.controlsElement);
            this.slider.controls = this.controls;

            this.equals = function(elementOrTargetId) {
                return this.element === elementOrTargetId || this.targetId === elementOrTargetId;
            };
            this.hide = function() {
                this.element.addClass('displayNone');
            };
            this.show = function() {
                this.element.removeClass('displayNone');
            };
        };
        this.galleries = [];
        this.currentVisibleGallery = null;
        this.goBackPreviewsElement = section.getElementsByClassName('goBackPreviews')[0];
        this.goBackPreviewsElement.portfolio = portfolio;

        if(!isMobile()) {
            this.goBackPreviewsElement.addEventListener('mouseenter', function () {
                (new Animations.AnimationWidth(this, 0.2, AnimationCurves.exponential, '28vh')).start();
            });
            this.goBackPreviewsElement.addEventListener('mouseleave', function () {
                (new Animations.AnimationWidth(this, 0.2, AnimationCurves.exponential, '8vh')).start();
            });
        }
        this.goBackPreviewsElement.addEventListener('click', function() {
            this.portfolio.showPreviews();
        });

        var galleryElements = this.galleryHandlerElement.getElementsByClassName('gallery');
        for(var i = 0; i < galleryElements.length; i++) {
            this.galleries.push(new this.Gallery(galleryElements[i]));
        }

        this.indexOfGallery = function(target) {
            if(target == null || typeof target === 'undefined')
                return -1;

            for(var i = 0; i < this.galleries.length; i++) {
                var g = this.galleries[i];
                if(g.equals(target))
                    return i;
            }
            return -1;
        };
        this.galleryExists = function(target) {
            return this.indexOfGallery(target) >= 0;
        };
        this.getGallery = function(target) {
            var index = this.indexOfGallery(target);
            if(index < 0)
                return null;
            else
                return this.galleries[index];
        };
        this.selectGallery = function(target) {
            var g = this.getGallery(target);
            if(g == null)
                return;

            if(this.currentVisibleGallery != null)
                this.currentVisibleGallery.hide();
            this.currentVisibleGallery = g;
            this.currentVisibleGallery.show();
        };


        this.setVisible = function(value) {
            if(value) {
                this.dataLayer.removeClass('displayNone');
            } else {
                this.dataLayer.addClasses('displayNone');
            }
        };
    };
    this.previews = new this.Previews(this.section, this);
    this.galleryHandler = new this.GalleryManager(this.section, this);
    this.galleryVisible = false;
    this.changingView = false;

    this.showGallery = function(target) {
        if(this.galleryVisible || this.changingView)
            return;

        this.changingView = true;
        this.previews.scrollPreviewPosition = AnimaScrollbar.scrollbar.scrollbarPosition;
        this.galleryHandler.setVisible(true);
        this.galleryVisible = true;
        this.galleryHandler.selectGallery(target);
        this.goBackPreviewsElement.removeClass('displayNone');

        var left = parseFloat(toFloat(getJSValue(this.previews.element, 'width')));
        left = (-left) + 'px';
        (new Animations.AnimationLeft(this.section.data, 0.2, AnimationCurves.linear, left)).start();
        setTimeout(function(portfolio) {
            portfolio.previews.setVisible(false);
            portfolio.changingView = false;
            portfolio.section.scrollUp();
        }, 210, this);

    };
    this.showPreviews = function() {
        if(!this.galleryVisible || this.changingView)
           return;

        this.changingView = true;
        this.previews.setVisible(true);
        this.galleryVisible = false;
        this.goBackPreviewsElement.addClass('displayNone');

        (new Animations.AnimationLeft(this.section.data, 0.2, AnimationCurves.linear, '0px')).start();
        setTimeout(function(portfolio) {
            portfolio.galleryHandler.setVisible(false);
            portfolio.changingView = false;
            if(!isMobile())
                AnimaScrollbar.scrollbar.bind(portfolio.section);
            AnimaSections.sectionManager.scrollTo(portfolio.previews.scrollPreviewPosition);
        }, 210, this);
    }
};