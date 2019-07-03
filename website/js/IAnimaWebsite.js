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

var AnimaSections = AnimaSections || {
    SectionManager: function() {
        this.sectionLinkManager = function () {
            this.sectionLink = function(id, link) {
                this.id = id;
                this.link = link;

                this.open = function() {
                    location.href = this.link;
                }
            };

            this.sectionLinks = [];
            this.addSectionLink = function(id, link) {
                var l = new this.sectionLink(id, link);
                this.sectionLinks.push(l);
            };
            this.openID = function(id) {
                for(var i = 0; i < this.sectionLinks.length; i++) {
                    var slink = this.sectionLinks[i];
                    if(slink.id === id) {
                        slink.open();
                        return;
                    }
                }
            }
        };
        this.sections = new this.sectionLinkManager();

        this.sections.addSectionLink('home', 'index.php');
        this.sections.addSectionLink('digitals', 'digitals.php');
        this.sections.addSectionLink('logostudio', 'logostudio.php');
        this.sections.addSectionLink('comingsoon', 'comingsoon.php');
        this.sections.addSectionLink('contacts', 'contacts.php');
        this.sections.addSectionLink('portfolio', 'portfolio.php');
        this.sections.addSectionLink('sitemap', 'sitemap.php');
        this.sections.addSectionLink('publications', "news.php");

        this.open = function(sectionID) {
            this.sections.openID(sectionID);
        }
    },
    sectionManager: null,
    initialize: function() {
        AnimaSections.sectionManager = new AnimaSections.SectionManager();
    },
    open: function(linkedElement) {
        if(AnimaSections.sectionManager == null) {
            console.log("sectionManager has not been initialized");
        } else {
            if(linkedElement.isElement() && linkedElement.hasAttribute('link-id')) {
                AnimaSections.sectionManager.open(linkedElement.getAttribute('link-id'));
            } else {
                console.log("Item is not an element or has not got 'link-id' attribute set");
            }
        }
    },
    openID: function(id) {
        if(AnimaSections.sectionManager == null) {
            console.log("sectionManager has not been initialized");
        } else {
            if(typeof id === 'string') {
                AnimaSections.sectionManager.open(id);
            } else {
                console.log("input parameter is not a string");
            }
        }

    },
    bindScrollbar: function() {
        if(!isMobile()) {
            var target = document.getElementById("pagesection");
            if(target != null) {
                AnimaScrollbar.scrollbar.bind(target);
            }
        }
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
            var menu = AnimaMenu.mobileMenu;
            if(!menu.menuOpened) {
                menu.open();
            } else {
                menu.close();
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
                menu.close();
            } else {
                menu.open();
            }
            menu.disableDueAnimation(opened);

        };

        AnimaPreload.preloadElement(this.navigationBar);

        for(var i = 0; i < this.navLinks.length; i++) {
            var link = this.navLinks[i];
            link.onmouseenter = function() {
                if(AnimaMenu.desktopMenu.menuOpened) {
                    this.maintainEntryText = true;
                    AnimaMenu.desktopMenu.showTextEntry(this);
                }

            };
            link.onmouseleave = function() {
                this.maintainEntryText = false;
                AnimaMenu.desktopMenu.hideTextEntry(this);
            };
        }
        this.navigationBar.addClasses("displayNone");         // preclose menu


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
                element.onmouseenter = function(ev) {
                    //if(ev.button === 0)
                        AnimaMisc.statElementClick(this.detailItem);
                };
                element.onmouseleave = function() {
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
        var sectionAbout = document.getElementsByTagName("section")[0];
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
    loadBase: function() {
        AnimaLoader.showProgress();

        AnimaLoader.initTestResponsive();
        AnimaSections.initialize();
        AnimaMenu.initialize();                    // inizializza il menu
        AnimaSections.bindScrollbar();

        var body = document.body;
        body.addEventListener('preloaded', function() {
            AnimaLoader.hideProgress();
        });
        AnimaPreload.preloadElement(body);

    },
    loadHome: function() {
        AnimaLoader.loadBase();
        AnimaLoader.loadArrowAboutAnimation();
        AnimaMisc.initDescriptors();
        AnimaNews.loadmininews();
    },
    loadDigitals: function() {
        AnimaLoader.loadBase();
        DetailSurfer.loadSurfers('detailsurfer');                           // carica gli elementi di dettaglio (vedere js e css specifici di detailsurfer)
        DetailSurfer.updateSurferPositionOnResize();
    },
    loadLogoStudio: function() {
        AnimaLoader.loadBase();
        DetailSurfer.loadSurfers('detailsurfer');                           // carica gli elementi di dettaglio (vedere js e css specifici di detailsurfer)
        DetailSurfer.updateSurferPositionOnResize();
        AnimaLoader.loadStatsDetails();
        AnimaGallery.initGallery();
    },
    loadContacts: function() {
        AnimaLoader.loadBase();
    },
    loadPortfolio: function() {
        AnimaLoader.loadBase();
        (new AnimaPortfolio());                     // inizializza portfolio
    },
    loadSitemap: function() {
        AnimaLoader.loadBase();
        AnimaLoader.sitemapView = new AnimaSitemap.SitemapView();
    },
    loadComingSoon: function() {
        AnimaLoader.loadBase();
        AnimaLoader.loadCSVideo();
        DetailSurfer.loadSurfers('detailsurfer');                           // carica gli elementi di dettaglio (vedere js e css specifici di detailsurfer)
        DetailSurfer.updateSurferPositionOnResize();

    }
};