var AnimaPreload = AnimaPreload || {
    cacheRegistry: null,
    CacheEntry: function(element, cached) {
        this.element = element;
        this.cached = cached;

        this.setCached = function(value) {
            this.cached = value;
        };
        this.isCached = function() {
            return this.cached;
        };
        this.isElement = function(element) {
            return this.element === element;
        }
    },
    CacheRegistry: function() {
        this.entries = [];
        this.indexOf = function(elem) {
            for(var i = 0; i < this.entries.length; i++) {
                var entry = this.entries[i];
                if(entry.isElement(elem))
                    return i;
            }

            return -1;
        };
        this.exists = function(elem) {
            return this.indexOf(elem) >= 0;
        };
        this.addEntry = function(elem) {
            if(!this.exists(elem) && AnimaUtility.isElement(elem))
                this.entries.push(new AnimaPreload.CacheEntry(elem, false));
        };
        this.setCached = function(elem) {
            if(!AnimaUtility.isElement(elem))
                return;

            var index = this.indexOf(elem);
            if(index < 0) {
                this.addEntry(elem);
                this.setCached(elem);
            } else {
                var entry = this.entries[index];
                entry.setCached(true);
            }
        };
        this.isCached = function(elem) {
            var element;
            if(typeof elem === 'string') {
                element = document.getElementById(elem);
                return this.isCached(element);
            } else if(AnimaUtility.isElement(elem))
                element = elem;
            else
                return true;                // there is nothing to cache, so by the fact nothing is cached, all that to cache is actually cached

            var index = this.indexOf(element);
            return index >= 0 && this.entries[index].isCached();
        };

    },
    PreloadingEngine: function(elem) {
        this.images = [];
        this.preloadingElement = elem;
        this.elementToPreload = 0;

        this._preload = function() {
            for (var i = 0; i < this._preload.arguments.length; i++) {
                this.images[i] = new Image();
                this.images[i].engine = this;
                this.images[i].addEventListener("load", function() {
                    this.engine.checkPreloadComplete();
                });
                this.images[i].src = this._preload.arguments[i];
            }
        };
        this.preloadElement = function() {
            var eTarget = this.preloadingElement;


            var preloadSources = eTarget.getElementsByAttributeName("animasource");
            // var preloadClasses = eTarget.getElementsByAttributeName("anima-addclasses");

            if(preloadSources.length === 0)
                this.checkPreloadComplete();        // no elements to preload (call preloaded)

            for(var s = 0; s < preloadSources.length; s++) {
                var sourceElement = preloadSources[s];
                var sourceValue = sourceElement.getAttribute("animasource");

                if(sourceValue != null && typeof sourceValue === 'string' && sourceValue.length > 0) {
                    var values = sourceValue.split(";");
                    this.elementToPreload += values.length;
                    for(var v = 0; v < values.length; v++) {
                        var value = values[v];
                        if(value != null && typeof value === 'string') {
                            this._preload(value);
                        }
                    }
                }
            }
            /*for(var c = 0; c < preloadClasses.length; c++) {
                var classElement = preloadClasses[c];
                var classValue = classElement.getAttribute("anima-addclasses");

                if(classValue != null && typeof classValue === 'string' && classValue.length > 0) {
                    classElement.addClasses(classValue);
                }
            }*/


        };
        this.checkPreloadComplete = function() {
            if(this.preloadingElement == null || !AnimaUtility.isElement(this.preloadingElement))
                return;

            this.elementToPreload--;
            if(this.elementToPreload <= 0) {
                try {
                    AnimaPreload.cacheRegistry.setCached(this.preloadingElement);
                    this.preloadingElement.dispatchEvent(new CustomEvent('preloaded'));
                } catch(e) {
                    console.log("Cannot fire preloaded event on " + this.preloadingElement);
                }
            }
        };
        this.preload = function() {
            // initialize needed variable
            this.elementToPreload = 0;

            if(AnimaPreload.cacheRegistry.isCached(this.preloadingElement))
                this.checkPreloadComplete();
            else
                this.preloadElement();
        }
    },

    preloadElement: function(elem) {
        if(elem == null)
            return;
        if(typeof elem === 'string') {
            AnimaPreload.preloadElement(document.getElementById(elem));
            return;
        } else if(!AnimaUtility.isElement(elem))
            return;

        (new AnimaPreload.PreloadingEngine(elem)).preload();
    }

};

AnimaPreload.cacheRegistry = new AnimaPreload.CacheRegistry();