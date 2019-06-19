var AnimaGallery = AnimaGallery || {
    page: 0,
    gallery: null,
    checkControlsVisibility: function() {
        var prev_control = document.getElementById('gallery_previous');
        var next_control = document.getElementById('gallery_next');
        if(AnimaGallery.page === 0) {
            // nascondi previous image
            prev_control.addClass('displayNone');
        } else if(AnimaGallery.page === 2) {
            next_control.addClass('displayNone');
        } else {
            prev_control.removeClass('displayNone');
            next_control.removeClass('displayNone');
        }
    },
    nextGalleryImage: function() {
        AnimaGallery.page++;
        AnimaGallery.page %= 3;

        AnimaGallery.checkControlsVisibility();

        var left = -(AnimaGallery.page)*100 + 6 + 'vw';
        (new Animations.AnimationLeft(AnimaGallery.gallery, 1, AnimationCurves.exponential, left)).start();
    },
    previousGalleryImage: function() {
        AnimaGallery.page--;
        if(AnimaGallery.page < 0)
            AnimaGallery.page = 2;

        AnimaGallery.checkControlsVisibility();

        var left = -(AnimaGallery.page)*100 + 6 + 'vw';
        (new Animations.AnimationLeft(AnimaGallery.gallery, 1, AnimationCurves.exponential, left)).start();
    },
    initGallery: function() {
        AnimaGallery.gallery = document.getElementById('statsGallery');
    }
};
var AnimaHashes = AnimaHashes || {
    HashEntry: function(hash, test, func, funcArgs) {
        this.hash = hash;
        this.test = test;
        this.operation = func;
        this.funcArgs = funcArgs;

        this.equals = function(entry) {
            return this.hash === entry.hash;
        };
    },
    HashManager: function() {
        this.entries = [];
        this.autoOpenSectionIntervalID = null;
        this.elaborating = false;
        this.lastElaborated = null;


        this.addEntry = function(hash, test, func, funcArgs) {
            var entry = new AnimaHashes.HashEntry(hash, test, func, funcArgs);
            this.entries.push(entry);
        };
        this.elaborate = function(hash) {
            if(hash === this.lastElaborated)
                return;

            for(var i = 0; i < this.entries.length; i++) {
                var entry = this.entries[i];
                if(entry.test(hash, entry.hash))
                    entry.operation(entry.funcArgs);
            }

            this.lastElaborated = hash;
        };
        this.readAndElaborate = function() {
            var hashValue = window.location.hash;
            if(!AnimaHashes.hashManager.elaborating) {
                AnimaHashes.hashManager.elaborating = true;
                AnimaHashes.hashManager.elaborate(hashValue);
                AnimaHashes.hashManager.elaborating = false;
            }
        };


        /* This lines "override" goBack and goForward browser's "functions". Using hash parameter of window location
         * we can determine which section has to be shown.
         * In this perspective showSection method just check eventually preloading needs and than changes the hash.
         * This interval triggers and, seeing the new hash is different from the opened one, calls the showSectionById method.
         * This method validate the passed parameter (checking null condition and section existence).
         * Once validated old section is hidden and new one is shown, with every state parameter updated.
         * This allows us to use back and forward browser's buttons :)
         */
        if(this.autoOpenSectionIntervalID != null)
            clearInterval(this.autoOpenSectionIntervalID);

        this.autoOpenSectionIntervalID = setInterval(this.readAndElaborate, 35);
    },
    hashManager: null,
    initialize: function() {
        AnimaHashes.hashManager = new AnimaHashes.HashManager();
    }
};

var AnimaSections = AnimaSections || {
    SectionManager: function() {
        this.idToOpen = null;
        this.opening = false;
        this.openedID = null;
        this.currentVisible = null;
        this.availableSections = document.getElementsByClassName("SectionBlock");

        for(var i = 0; i < this.availableSections.length; i++) {
            var sectionHash = "#" + this.availableSections[i].id;
            AnimaHashes.hashManager.addEntry(
                sectionHash,
                function(currentHash, entryHash) {
                    var sectionID = currentHash.substring(1);
                    return !AnimaSections.sectionManager.opening && AnimaSections.sectionManager.openedID !== sectionID && currentHash === entryHash;
                },
                function (sectionID) {
                    AnimaSections.sectionManager.changeSection(sectionID);
                },
                this.availableSections[i].id
            );
        }

        this.defineSectionEvent = function(target) {
            if(target == null || !AnimaUtility.isElement(target))
                return;

            if(!target.hasOwnProperty('eventDefined'))
                target.eventDefined = true;
            else
                return;

            target.addEventListener('preloaded', this.preloadListener);
        };
        this.preloadListener = function() {
            var target = document.getElementById(AnimaSections.sectionManager.idToOpen);
            if(target == null || !AnimaUtility.isElement(target))
                return;

            target.removeEventListener('preloaded', this.preloadListener);
            AnimaLoader.hideProgress();
            AnimaSections.sectionManager.update();
        };
        this.showSection = function(idOrObj) {
            if(typeof idOrObj === 'string') {
                window.location.hash = "#" + idOrObj;
            } else if(AnimaUtility.isElement(idOrObj)) {
                window.location.hash = "#" + idOrObj.id;
            }
        };
        this.changeSection = function(id) {
            if(id == null || typeof id !== 'string' || !this.sectionExists(id)) {
                return;
            }

            this.opening = true;
            this.idToOpen = id;
            var target = document.getElementById(id);
            if(target == null || !AnimaUtility.isElement(target))
                return;
            this.defineSectionEvent(target);
            target.sectionManager = this;


            if(!AnimaLoader.preloaded && !AnimaPreload.cacheRegistry.isCached(target))
                AnimaLoader.showProgress();

            AnimaPreload.preloadElement(target);
        };
        this.update = function() {
            if(this.idToOpen === this.openedID)
                return;

            var target = document.getElementById(this.idToOpen);
            if(target == null || !AnimaUtility.isElement(target))
                return;

            if(this.openedID != null) {
                this.hideSection(this.openedID);
                this.currentVisible.removeChild(AnimaSections.footer);
            }

            target.appendChild(AnimaSections.footer);

            target.removeClass("displayNone");
            this.openedID = this.idToOpen;
            this.currentVisible = target;
            this.opening = false;

            target.dispatchEvent(new Event('shown'));

            this.scrollAllUp(this.currentVisible);
        };


        this.sectionExistsById = function(id) {
            if(id == null || typeof id !== 'string')
                return false;

            for(var index = 0; index < this.availableSections.length; index++) {
                if(id === this.availableSections[index].id)
                    return true;
            }

            return false;
        };
        this.sectionExistsByObj = function(o) {
            if(!AnimaUtility.isElement(o))
                return false;

            return this.sectionExistsById(o.id);
        };
        this.sectionExists = function(sectionIDorObj) {
            if(AnimaUtility.isElement(sectionIDorObj))
                return this.sectionExistsByObj(sectionIDorObj);
            else if (typeof sectionIDorObj === 'string')
                return this.sectionExistsById(sectionIDorObj);

            return false;
        };
        this.scrollAllUp = function(sectionElem) {
            if(isMobile()) {
                if(sectionElem.children.length > 0) {
                    var deltaHeight = getJSValue(sectionElem.children[0], 'top');
                    (new Animations.AnimationScrollTop(sectionElem, 0.5, AnimationCurves.exponential, deltaHeight)).start();
                }
            } else {
                AnimaScrollbar.scrollbar.bind(sectionElem);
                this.scrollTo(0);
            }
        };
        this.scrollTo = function(value) {
            if(value == null || typeof value !== 'number' || value < 0)
                return;

            if(isMobile()) {
                var maxValue = convertValue(getJSValue(sectionElem, 'height')) - convertValue('100vh');
                if(value > maxValue)
                    value = maxValue;

                if(sectionElem.children.length > 0) {
                    (new Animations.AnimationScrollTop(sectionElem, 0.5, AnimationCurves.exponential, value + 'px')).start();
                }
            } else {
                AnimaScrollbar.scrollbar.setScrollbarPosition(value);
            }
        };
        this.hideSectionById = function(id) {
            if(id == null || typeof id !== 'string' ||  id.length === 0) {
                return;
            }


            var elem = document.getElementById(id);
            if(elem == null || typeof elem === 'undefined')
                return;

            elem.addClass("displayNone");
        };
        this.hideSectionByObj = function(obj) {
            if(obj == null || !AnimaUtility.isElement(obj))
                return;
            
            obj.addClass("displayNone");
        };
        this.hideSection = function(sectionIdOrObj) {
            if(typeof sectionIdOrObj === 'string')
                this.hideSectionById(sectionIdOrObj);
            else if(AnimaUtility.isElement(sectionIdOrObj))
                this.hideSectionByObj(sectionIdOrObj);
            
            // In all other cases, just end this method
        };
        this.hideAllSections = function() {
            for(var counter = 0; counter < this.availableSections.length; counter++) {
                this.hideSection(this.availableSections[counter]);
            }
        };



    },
    sectionManager: null,
    footer: null,
    initialize: function() {
        AnimaSections.sectionManager = new AnimaSections.SectionManager();
        AnimaSections.footer = document.getElementsByTagName("footer")[0];
    }
};
var AnimaMenu = AnimaMenu || {
    AnimaMenuMobile: function() {
        this.menuID = 'menuBar_smartphone';
        this.menu = document.getElementById(this.menuID);
        this.menuButton = this.menu.getElementsByClassName("MenuButton")[0];
        this.navigationBar = this.menu.getElementsByClassName("MenuEntries")[0];
        this.navLinks = this.navigationBar.getElementsByClassName("MenuEntry");
        this.menuOpened = false;
        this.changeState = false;

        window.addEventListener('resize', function() {
            if(isMobile()) {
                AnimaMenu.mobileMenu.updateGUI();
            }
        });
        this.menuButton.addEventListener('click', function() {
            if(!AnimaMenu.mobileMenu.menuOpened) {
                window.location.hash = "#menu";
            } else {
                window.location.hash = "#" + AnimaSections.sectionManager.openedID;
            }
        });

        this.hideEntries = function() {
            for(var counter = 0; counter < this.navLinks.length; counter++) {
                (new Animations.AnimationOpacity(this.navLinks[counter], 0.4, AnimationCurves.exponential, 0)).start();
                setTimeout(function(entry) {
                    entry.removeClass("displayFlexSmartphone");
                }, 500, this.navLinks[counter]);
            }
        };
        this.showEntries = function() {
            for(var counter = 0; counter < this.navLinks.length; counter++) {
                this.navLinks[counter].addClass("displayFlexSmartphone");
                (new Animations.AnimationOpacity(this.navLinks[counter], 0.4, AnimationCurves.exponentialReversed, 100)).start();
            }
        };
        this.updateGUI = function() {
            var menu = AnimaMenu.mobileMenu;

            var openedWidth = null;
            var closedWidth = null;
            if(isLandscape()) {
                openedWidth = '100vw';
                closedWidth = '7vw';
            } else if(isPortrait()) {
                openedWidth = '60vw';
                closedWidth = '10vw';
            }

            var animationTime = 0.4;    // Seconds...
            var animationCurve = AnimationCurves.exponential;
            if(!menu.menuOpened) {
                (new Animations.AnimationWidth(menu.menu, animationTime, animationCurve, closedWidth)).start();
                menu.hideEntries();

                if(menu.changeState) {
                    menu.changeState = false;
                    if(menu.menuButton != null && AnimaUtility.isElement(menu.menuButton))
                        (new Animations.AnimationRotate(menu.menuButton, animationTime, animationCurve, 'z', 90)).start();

                }

            } else {
                (new Animations.AnimationWidth(menu.menu, animationTime, animationCurve, openedWidth)).start();
                menu.showEntries();

                if(menu.changeState) {
                    menu.changeState = false;
                    if (menu.menuButton != null && AnimaUtility.isElement(menu.menuButton))
                        (new Animations.AnimationRotate(menu.menuButton, animationTime, animationCurve, 'z', -90)).start();
                }
            }
        };
        this.open = function() {
            this.menuOpened = true;
            this.changeState = true;
            this.updateGUI();
        };
        this.close = function() {
            this.menuOpened = false;
            this.changeState = true;
            this.updateGUI();
        };
    },
    AnimaMenuDesktop: function() {
        this.menuID = 'menuBar_desktop';
        this.menu = document.getElementById(this.menuID);
        this.menuButton = this.menu.getElementsByClassName("MenuButton")[0];
        this.menuButton.initialRadius = null;
        this.navigationBar = this.menu.getElementsByClassName("MenuEntries")[0];
        this.navLinks = this.navigationBar.getElementsByClassName("MenuEntry");
        this.menuOpened = false;
        this.delayEntries_opening = 0.707;
        this.delayBetweenEntries_opening = 0.15;
        this.delayEntries_closing = 0.2;
        this.delayBetweenEntries_closing = 0.05;
        this.changingState = false;

        this.menuButton.onmouseenter = function (ev) {
            var child = this.getElementsByClassName("child")[0];
            if(child == null || !AnimaUtility.isElement(child))
                return;

            if(this.initialRadius == null)
                this.initialRadius = parseFloat(toFloat(getJSValue(child, 'height'))) / 2;

            var height = getJSValue(this, 'height');
            var width = getJSValue(this, 'width');
            var radiusValue = parseFloat(toFloat(height)) / 2;
            radiusValue += 'px';

            (new Animations.AnimationHeight(child, 0.25, AnimationCurves.linear, height)).start();
            (new Animations.AnimationWidth(child, 0.25, AnimationCurves.linear, width)).start();
            (new Animations.AnimationBorderRadius(child, 0.25, AnimationCurves.linear, [radiusValue])).start()
        };
        this.menuButton.onmouseleave = function (ev) {

            var child = this.getElementsByClassName("child")[0];
            if(child == null || !AnimaUtility.isElement(child))
                return;

            var height = this.initialRadius * 2 + 'px';
            var width = this.initialRadius * 2 + 'px';
            var radiusValue = this.initialRadius + 'px';

            (new Animations.AnimationHeight(child, 0.25, AnimationCurves.linear, height)).start();
            (new Animations.AnimationWidth(child, 0.25, AnimationCurves.linear, width)).start();
            (new Animations.AnimationBorderRadius(child, 0.25, AnimationCurves.linear, [radiusValue])).start()

        };
        this.menuButton.onclick = function (ev) {
            var menu = AnimaMenu.desktopMenu;
            if(menu.changingState)
                return;

            setNumberOfOscillations(2);
            menu.changingState = true;
            var opened = menu.menuOpened;
            if(opened) {
                window.location.hash = "#" + AnimaSections.sectionManager.openedID;
            } else {
                window.location.hash = "#menu";
            }
            menu.disableDueAnimation(opened);

        };

        AnimaPreload.preloadElement(this.navigationBar);

        for(var i = 0; i < this.navLinks.length; i++) {
            var link = this.navLinks[i];
            link.onmouseenter = function() {
                this.maintainEntryText = true;
                AnimaMenu.desktopMenu.showTextEntry(this);
            };
            link.onmouseleave = function() {
                this.maintainEntryText = false;
                AnimaMenu.desktopMenu.hideTextEntry(this);
            };
        }

        this.showTextEntry = function(entry) {
            var textElem = entry.getElementsByClassName("text")[0];
            textElem.addClass("displayFlexDesktop");
            var animationTime = 0.2;

            (new Animations.AnimationLeft(textElem, animationTime, AnimationCurves.exponential, '2vh')).start();
            (new Animations.AnimationOpacity(textElem, animationTime, AnimationCurves.linear, 100)).start();
        };
        this.hideTextEntry = function(entry) {
            var textElem = entry.getElementsByClassName("text")[0];
            var animationTime = 0.2;
            var delay = 0.5;

            setTimeout(function(textElem, entry) {
                if(entry.maintainEntryText)
                    return;

                (new Animations.AnimationLeft(textElem, 0.2, AnimationCurves.exponential, '-7vh')).start();
                (new Animations.AnimationOpacity(textElem, 0.2, AnimationCurves.exponential, 0)).start();
            }, (delay*1000), textElem, entry);
            setTimeout(
                function(textElem, entry) {
                    if(entry.maintainEntryText)
                        return;

                    textElem.removeClass("displayFlexDesktop");
                },
                (animationTime + delay) * 1.1 * 1000,
                textElem, entry
            );
        };
        this.hideEntry = function(entry, delay) {
            var iconObj = entry.getElementsByClassName("icon")[0];
            setTimeout(
                function(duration) {
                    (new Animations.AnimationHeight(iconObj, duration, AnimationCurves.linear, '0vh')).start();
                    (new Animations.AnimationWidth(iconObj, duration, AnimationCurves.linear, '0vh')).start();
                },
                delay,
                this.delayEntries_closing
            );
        };
        this.hideEntries = function() {
            var menu = AnimaMenu.desktopMenu;
            var links = menu.navLinks;
            for(var counter = 0; counter < links.length; counter++) {
                var entry = links[counter];
                var delay = counter*this.delayBetweenEntries_closing;
                this.hideEntry(entry, delay);

            }
        };
        this.showEntry = function(entry, delay) {
            var iconObj = entry.getElementsByClassName("icon")[0];
            Animations.startAfter(new Animations.AnimationHeight(iconObj, AnimaMenu.desktopMenu.delayEntries_opening, AnimationCurves.exponentialsincos, '9vh'), delay);
            Animations.startAfter(new Animations.AnimationWidth(iconObj, AnimaMenu.desktopMenu.delayEntries_opening, AnimationCurves.exponentialsincos, '9vh'), delay);
        };
        this.showEntries = function() {
            var menu = AnimaMenu.desktopMenu;
            var links = menu.navLinks;
            for(var counter = links.length - 1; counter >= 0; counter--) {
                var entry = links[counter];
                var delay = counter*menu.delayBetweenEntries_opening;
                menu.showEntry(entry, delay);
            }


        };
        this.openNav = function() {
            this.navigationBar.removeClass("displayNone");
            this.showEntries();
        };
        this.closeNav = function() {
            this.hideEntries();
            setTimeout(
                function(navBar) {
                        navBar.addClasses("displayNone");
                },
                (this.delayEntries_closing + this.delayBetweenEntries_closing * this.navLinks.length)*1000,
                this.navigationBar);

        };
        this.openButton = function() {
            var menu = AnimaMenu.menuManager.menuObj;
            (new Animations.AnimationRotate(menu.menuButton,0.4, AnimationCurves.linear, 'z', 360)).start();
        };
        this.closeButton = function() {
            var menu = AnimaMenu.menuManager.menuObj;
            (new Animations.AnimationRotate(menu.menuButton,0.4, AnimationCurves.linear, 'z', -360)).start();
        };
        this.disableDueAnimation = function(opened) {
            var menu = AnimaMenu.desktopMenu;
            var links = menu.navLinks;
            var totalDelay = 0;
            if(!opened)
                totalDelay += menu.delayEntries_opening + menu.delayBetweenEntries_opening * links.length;
            else
                totalDelay += menu.delayEntries_closing + menu.delayBetweenEntries_closing * links.length;

            setTimeout(function(menu) {
                menu.changingState = false;
            }, totalDelay*1100, menu);
        };

        this.updateGUI = function() {
            if(this.menuOpened) {
                this.openButton();
                this.openNav();
            } else {
                this.closeButton();
                this.closeNav();
            }
        };
        this.open = function() {
            this.menuOpened = true;
            this.updateGUI();
        };
        this.close = function() {
            this.menuOpened = false;
            this.updateGUI();
        };
    },
    MenuManager: function() {
        this.menuObj = isMobile() ? AnimaMenu.mobileMenu : AnimaMenu.desktopMenu;
        this.base_color_menu = [40,40,40];
        this.hashMenu = "#menu";

        AnimaHashes.hashManager.addEntry(
            this.hashMenu,
            function(hash, entryHash) {
                return hash === entryHash;
            },
            function() {
                AnimaMenu.menuManager.menuObj.open();
            }
        );
        AnimaHashes.hashManager.addEntry(
            this.hashMenu,
            function(hash, entryHash) {
                return AnimaMenu.menuManager.menuObj.menuOpened && hash !== entryHash;
            },
            function() {
                AnimaMenu.menuManager.menuObj.close();
            }
        );



        /* Behaviors */
        this.closePortraitMenuIfOutside = function(ev) {
            if(AnimaMenu.menuManager.menuObj.menuOpened) {
                var x = ev.clientX;
                var y = ev.clientY;
                var menu = AnimaMenu.menuManager.menuObj.menu;
                if(!menu.isInside(x, y))
                    AnimaMenu.menuManager.close();
            }
        };
        this.open = function() {
            if(this.menuObj.menuOpened)
                return;

            this.menuObj.menuButton.dispatchEvent(new CustomEvent('click'));

        };
        this.close = function() {
            if(!this.menuObj.menuOpened)
                return;

            this.menuObj.menuButton.dispatchEvent(new CustomEvent('click'));
        };


        /*
         * Initialization:
         * Viene dapprima definito il comportamento del menu durante il ridimensionamento della finestra:
         * Se è desktop, allora viene solo specificato che il menu attuale è quello desktop, smarthone altrimenti smartphone
         *
         * Vengono associati al menu desktop gli effetti di trasparenza
         *
         * Infine Viene gestito il caso in cui il dispositivo sia smartphone in modalità portrait e
         * viene assegnata alla finestra un evento secondo il quale, se il menu è aperto e il click è al di fuori del menu, questo si chiude.
         */
        window.addEventListener("resize", function(ev) {
            if (isMobile()) {
                AnimaMenu.menuManager.menuObj = AnimaMenu.mobileMenu;
            } else {
                AnimaMenu.menuManager.menuObj = AnimaMenu.desktopMenu;
            }
        });

        // set desktop effects
        var desktopMenu = AnimaMenu.desktopMenu;
        desktopMenu.onmouseenter = function (ev) {
            var color = [AnimaMenu.menuManager.base_color_menu[0], AnimaMenu.menuManager.base_color_menu[1], AnimaMenu.menuManager.base_color_menu[2], 1];
            (new Animations.AnimationBackgroundColor(this, 0.4, AnimationCurves.linear, color)).start();
        };
        desktopMenu.onmouseleave = function (ev) {
            var color = [AnimaMenu.menuManager.base_color_menu[0], AnimaMenu.menuManager.base_color_menu[1], AnimaMenu.menuManager.base_color_menu[2], 0.3];
            Animations.startAfter(new Animations.AnimationBackgroundColor(this, 0.4, AnimationCurves.linear, color), 0.5);
        };

        window.addEventListener("click", this.closePortraitMenuIfOutside);

    },
    menuManager: null,
    mobileMenu: null,
    desktopMenu: null,
    initialize: function() {
        AnimaMenu.mobileMenu = new AnimaMenu.AnimaMenuMobile();
        AnimaMenu.desktopMenu = new AnimaMenu.AnimaMenuDesktop();
        AnimaMenu.menuManager = new AnimaMenu.MenuManager();
    }
};
var AnimaMisc = AnimaMisc || {
    statElementClick: function(detail) {
        if(detail == null || typeof detail === 'undefined')
            return;

        var opened = parseInt(toInt(getJSValue(detail, 'height'))) > 0;
        if(!opened) {
            (new Animations.AnimationHeight(detail, 0.25, AnimationCurves.linear, '35vh')).start();
        } else {
            (new Animations.AnimationHeight(detail, 0.25, AnimationCurves.linear, '0vh')).start();
        }
    },

    /* ABOUT DESCRIPTION INIT & BEHAVIOR */
    AboutDescriptor: function(article) {
        this.articleBox = article;
        this.titleElement = article.getElementsByAttribute('anima-id', 'title')[0];
        this.indexElement = article.getElementsByClassName('indexBox')[0];
        this.contentElement = article.getElementsByClassName('contents')[0];
        this.defaultElement = article.getElementsByAttribute('anima-id', 'default')[0];
        this.activeElement = this.defaultElement;
        this.activeIndex = null;
        this.indicies = this.indexElement.getElementsByClassName('servicesEntry');

        this.setTitle = function(title) {
            this.titleElement.innerText = title;
        };
        this.hideElement = function() {
            if(!AnimaUtility.isElement(this.activeElement))
                return;

            this.activeElement.addClass('displayNone');
        };
        this.showElement = function(element) {
            if(!AnimaUtility.isElement(element))
                return;

            this.activeElement = element;
            element.removeClass('displayNone');
        };
        this.setActiveIndex = function(indexEntry) {
            this.activeIndex = indexEntry;
        };
        this.removeActiveState = function() {
            if(!AnimaUtility.isElement(this.activeIndex))
                return;

            var text = this.activeIndex.boundingReference.textElem;
            if(text == null || typeof text === 'undefined')
                return;

            text.removeClass('textActive');
        };
        this.setActiveState = function(indexEntry) {
            var text = indexEntry.boundingReference.textElem;
            if(text == null || typeof text === 'undefined')
                return;

            text.addClass('textActive');
        };

        this.BoundingDesktop = function(descriptor, indexEntry) {
            this.parent = descriptor;
            this.indexEntry = indexEntry;
            this.contentEntry = article.getElementsByAttribute('anima-id', indexEntry.getAttribute('anima-target'))[0];
            this.indexText = this.indexEntry.getElementsByClassName('text')[0].innerText;

            this.show = function() {
                this.parent.hideElement();
                this.parent.setTitle(this.indexText);
                this.parent.showElement(this.contentEntry);
            }
        };
        this.BoundingMobile = function(descriptor, indexEntry) {
            this.parent = descriptor;
            this.indexEntry = indexEntry;
            this.contentEntry = article.getElementsByAttribute('anima-id', indexEntry.getAttribute('anima-target'))[0];
            this.textElem = this.indexEntry.getElementsByClassName('text')[0];
            this.indexText = this.textElem.innerText;

            this.show = function() {
                this.parent.removeActiveState();
                this.parent.hideElement();
                this.parent.setActiveIndex(this.indexEntry);
                this.parent.showElement(this.contentEntry);
                this.parent.setActiveState(this.indexEntry);
            }
        };
        this.boundings = [];

        // init
        for(var i = 0; i < this.indicies.length; i++) {
            var elem = this.indicies[i];
            var boundingReference = isMobile() ? new this.BoundingMobile(this, elem) : new this.BoundingDesktop(this, elem);
            elem.boundingReference = boundingReference;
            this.boundings.push(boundingReference);
            elem.addEventListener('click', function() {
                this.boundingReference.show();
            });

            elem.addEventListener('mouseenter', function() {
                var underline = this.getElementsByClassName('underline')[0];
                (new Animations.AnimationLeft(underline, 0.3, AnimationCurves.linear, "0px")).start();
            });
            elem.addEventListener('mouseleave', function() {
                var width = parseFloat(toFloat(getJSValue(this, 'width')));
                var underline = this.getElementsByClassName('underline')[0];
                (new Animations.AnimationLeft(underline, 0.3, AnimationCurves.linear, width + 'px')).start();
                setTimeout(function(underline, width) {
                    underline.style.left = '-' + width + 'px';
                }, 310, underline, width);
            });
        }

    },
    descriptors: [],
    initDescriptors: function() {
        var desc = document.getElementsByClassName('contentAboutDescription');
        for(var i = 0; i < desc.length; i++) {
            var d = desc[i];
            var descElem = new AnimaMisc.AboutDescriptor(d);
            AnimaMisc.descriptors.push(descElem);
        }
    }

};
var AnimaLoader = AnimaLoader || {

    /*
     * These following "constants" determine how much speed connection needs to be in order to choose between
     * section-loading and all-loading.
     * An image, which we know path and size, is put into images folder.
     * Two objects Date will be created: one for the start downloading time and the second is set once the image is fully loaded
     * through the 'load' event.
     * A timer (which is set below) will stop the download (if not finished yet) and starting the real initialization.
     * Setting the timer value determines the minimum speed required to choose between the two types of loading, in fact
     * if T is the time in second to activate the timer, then the minimum connection speed is
     *
     *                          (imageSizeInKb)/T = [Kb/s]
     * T represents the maximum value that EndTime - StartTime can assume: after these time the loading section will stop the download.
     *
     * SECTION-LOADING
     * Every section will be downloaded separately and loaded once the first time opened.
     * The home section is loaded just after all initializations during the site loading.
     *
     * ALL-DOWNLOADING
     * Every page is loaded during the first loading page so no more loadings will be required.
     *
     */
    connectionSpeed: 0,
    speedImageTest: new Image(),
    loadingTimerValue: 2500,       // 2 seconds
    delayHidingProgress: 750,
    preloaded: false,
    sitemapView: null,

    testConnectionSpeed: function() {
        /*var speedImageUrl = "images/speedTestImage.png";
        var speedImageSize = 1334165;          // bytes
        var speedImageST, speedImageET;
        AnimaLoader.speedImageTest.addEventListener('load', function() {
            speedImageET = new Date();
            var delta = Math.abs(speedImageET - speedImageST) / 1000;
            var size = speedImageSize / 1024;
            AnimaLoader.connectionSpeed = size/delta;
        });
        speedImageST = new Date();
        AnimaLoader.speedImageTest.src = speedImageUrl;*/
        AnimaLoader.connectionSpeed = 1000;
    },
    stopConnectionSpeed: function() {
        if(AnimaLoader.speedImageTest.src.length > 0)
            AnimaLoader.speedImageTest.src = null;
    },
    initTestResponsive: function() {
        initResponsiveCheck("menuBar_smartphone");
    },
    preloadAllImages: function() {
        // Carica le altre immagini indipendentemente dal tipo di dispositivo

        var sections = document.getElementsByClassName("SectionBlock");
        for(var s = 0; s < sections.length; s++) {
            var section = sections[s];
            AnimaPreload.preloadElement(section);
        }

    },
    loadStatsDetails: function() {
        var elements = document.getElementsByClassName("statElement");
        for(var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var detail = element.getElementsByClassName("details");
            if(detail != null && typeof detail !== 'undefined' && detail.length > 0) {
                detail = detail[0];
                element.detailItem = detail;
                element.onclick = function(ev) {
                    if(ev.button === 0)
                        AnimaMisc.statElementClick(this.detailItem);
                }
            }

        }
    },
    changeHTMLIF_IE: function() {
        if(AnimaBrowsers.isIE()) {
            var h2s = document.getElementsByTagName("h2");
            for(var i = 0; i < h2s.length; i++) {
                if((h2s[i].getElementsByTagName("span")).length === 0) {
                    var newInnerHTML = "";
                    var oldInnerHTML = h2s[i].innerHTML;
                    var lines = [];
                    var words = oldInnerHTML.split(/\s+/);
                    var maxLineLength = 70;
                    for(var t = 0; t < words.length; t++) {
                        var line = "";
                        for(t; (t < words.length) && line.length < maxLineLength; t++) {
                            line += words[t] + " ";
                        }
                        t--;
                        lines.push(line);
                    }

                    for(var k = 0; k < lines.length; k++) {
                        newInnerHTML += "<span>" + lines[k] + "</span>";
                    }
                    h2s[i].innerHTML = newInnerHTML;
                    var spans = h2s[i].getElementsByTagName("span");
                    for(var z = 0; z < spans.length; z++) {
                        spans[z].addClass('IEElement');
                    }
                }
            }
        }
    },
    loadArrowAboutAnimation: function() {
        var arrow = document.getElementById("downArrowAbout");
        var sectionAbout = document.getElementById("about");
        var contentAbout = document.getElementsByClassName("contentAboutDescription")[0];


        if(arrow == null || typeof arrow === 'undefined')
            return;
        if(sectionAbout == null || typeof sectionAbout === 'undefined')
            return;
        if(contentAbout == null || typeof contentAbout === 'undefined')
            return;

        arrow.onclick = function(ev) {
            var height;
            if(isMobile()) {
                height = getJSValue(contentAbout, 'top');
                (new Animations.AnimationScrollTop(sectionAbout, 0.5, AnimationCurves.exponential, height)).start();
            } else {
                height = parseFloat(convertValue(getJSValue(contentAbout, 'top'))) + AnimaScrollbar.scrollbar.boundedElement.scrollTop;
                AnimaScrollbar.scrollbar.setScrollbarPosition(AnimaScrollbar.scrollbar.boundedParameters.calculateTopScrollElem(convertValue(height)));
            }
        };

        function resetArrowAnimation() {
            var down = '2.5vh';
            var up = '0.5vh';

            var animationDown = new Animations.AnimationBottom(arrow, 0.5, AnimationCurves.linear, down);
            var animationUp = new Animations.AnimationBottom(arrow, 0.5, AnimationCurves.linear, up);
            animationDown.onEndAnimation = function() {animationUp.start();};
            animationUp.onEndAnimation = function() {animationDown.start();};

            animationDown.start();
        }
        window.addEventListener('resize', resetArrowAnimation);
        resetArrowAnimation();



    },
    loadCSVideo: function() {
        var video = document.getElementById("animaintro");
        window.addEventListener("resize", function (ev) {
            video.width = pxFromPercentageWidth("100%", video);
        });
    },
    stopLoadingVideo: function() {
        var video = document.getElementById('loadingvideo');
        if(video != null && typeof video !== 'undefined') {
            video.pause();
        }
    },
    startLoadingVideo: function() {
        var video = document.getElementById('loadingvideo');
        if(video != null && typeof video !== 'undefined') {
            video.play();
        }
    },
    hideProgress: function() {
        var timerValue = AnimaLoader.connectionSpeed === 0 ? AnimaLoader.delayHidingProgress : 100;

        setTimeout(function() {
            var elem = document.getElementById("progress");
            if(!AnimaUtility.isElement(elem))
                return;

            if(elem.isDisplayed()) {
                elem.style.display = "none";
                AnimaLoader.stopLoadingVideo();
            }
        }, timerValue);
    },
    showProgress: function() {
        var elem = document.getElementById("progress");
        if(!AnimaUtility.isElement(elem))
            return;

        if(!elem.isDisplayed()) {
            AnimaLoader.startLoadingVideo();
            elem.style.display = "flex";
        }
    },
    // creare showProgress con startLoadingVideo e migliorare hide progress inserendo stopLoaingVideo
    loadHome: function() {
        AnimaHashes.initialize();
        AnimaLoader.loadArrowAboutAnimation();
        AnimaMenu.initialize();                    // inizializza il menu
        AnimaMisc.initDescriptors();
    },
    loader: function() {
        AnimaLoader.testConnectionSpeed();
        AnimaHashes.initialize();
        setTimeout(function() {
            AnimaLoader.initTestResponsive();                                   // Inizializza i test che determinano i risultati della funzione "isMobile()"
            if (AnimaLoader.connectionSpeed > 0) {
                AnimaLoader.preloadAllImages();                                 // Carica le immagini
                AnimaLoader.preloaded = true;
            } else {
                AnimaLoader.stopConnectionSpeed();
            }

            DetailSurfer.loadSurfers('detailsurfer');                           // carica gli elementi di dettaglio (vedere js e css specifici di detailsurfer)
            AnimaLoader.loadCSVideo();                                          // Carica il video del coming soon (A che sfarfalla)
            AnimaLoader.loadStatsDetails();
            AnimaLoader.changeHTMLIF_IE();                                      // Cambia alcune proprietà per una visualizzazione corretta e compatibile.
            DetailSurfer.updateSurferPositionOnResize();
            AnimaGallery.initGallery();

            AnimaSections.initialize();
            (new AnimaPortfolio());                     // inizializza portfolio
            AnimaLoader.sitemapView = new AnimaSitemap.SitemapView();

            AnimaSections.sectionManager.hideAllSections();
            AnimaSections.sectionManager.showSection("");
            AnimaHashes.hashManager.readAndElaborate();                         // force changing hash (for reload)
            AnimaSections.sectionManager.showSection("about");

        }, AnimaLoader.loadingTimerValue);
    }
};