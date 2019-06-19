var AnimaScrollbar = {
    scrollbarObj: function() {
        this.boundedElement = null;                                         // contenitore che deve essere scrollable.
        this.scrollbarElem = null;                                          // elemento interno alla scrollbar
        this.scrollbarWider = null;                                         // Elemento sul quale agiscono gli eventi ("proxy" per Elem)
        this.scrollbarContainer = null;                                     // scrollbar intesta come tutta la barra verticale
        this.insideScrollbarWider = false;                                  // flag che determina se il puntatore è all'interno dello scrollElem
        this.insideScrollbarContainer = false;                              // flag che determina se il puntatore è all'interno della scrollbar
        this.enableMouseScrolling = false;                                  // se true la scrollbar segue il mouse (vedere inizializzazione eventi)
        this.initialMouseOffset = 0;                                        // offset calcolato durante il click sullo scrollElem
        this.scrollbarPosition = 0;                                         // posizione attuale dello scrollElem (relativo alla scrollbar)
        this.deltaWheel = convertValue('8vh');                              // variazione in valore assoluto della posizione dello scrollelem per ogni step di rotellina
        this.initialized = false;                                           // flag che determina se gli eventi sono stati inizializzati
        this.ScrollbarStates = function() {
            this.ScrollbarState = function(name) {
                this.name = name;
                this.attachedListener = [];
                this.transactions = [];
                this.indexOfListener = function (f) {
                    if (typeof f !== 'function')
                        return -1;

                    for (var i = 0; i < this.attachedListener.length; i++) {
                        if (this.attachedListener[i] === f)
                            return i;
                    }
                    return -1;
                };
                this.indexOfTransaction = function (t) {
                    for (var i = 0; i < this.transactions.length; i++) {
                        if (this.transactions[i] === t)
                            return i;
                    }
                    return -1;
                };
                this.addListener = function (f) {
                    if (typeof f !== 'function' || this.indexOfListener(f) >= 0)
                        return;

                    this.attachedListener.push(f);
                };
                this.addTransaction = function (t) {
                    if (this.indexOfTransaction(t) >= 0)
                        return;

                    this.transactions.push(t);
                };
                this.isState = function (nameOrState) {
                    return this.name === nameOrState || nameOrState.name === this.name;
                };
                this.activate = function() {                    
                    for(var i = 0; i < this.attachedListener.length; i++) {
                        var f = this.attachedListener[i];
                        if(typeof f === 'function')
                            f();
                    }
                };
                this.interrupt = function() {
                    for(var i = 0; i < this.transactions.length; i++) {
                        var t = this.transactions[i];
                        if(t.checkConditions()) {
                            t.activate();
                        }
                    }
                }
            };
            this.Transaction = function(targetState) {
                this.targetState = targetState;
                this.attachedConditions = [];
                this.indexOfCondition = function (f) {
                    if (typeof f !== 'function')
                        return -1;

                    for (var i = 0; i < this.attachedConditions.length; i++) {
                        if (this.attachedConditions[i] === f)
                            return i;
                    }
                    return -1;
                };
                this.checkConditions = function() {
                    var conditionResult = true;
                    for(var k = 0; k < this.attachedConditions.length; k++) {
                        var c = this.attachedConditions[k];
                        if(typeof c === 'function')
                            conditionResult = conditionResult && c();

                    }
                    return conditionResult;
                };
                this.addCondition = function (f) {
                    if (typeof f !== 'function' || this.indexOfCondition(f) >= 0)
                        return;

                    this.attachedConditions.push(f);
                };
                this.activate = function() {
                    AnimaScrollbar.scrollbar.states.lastState = AnimaScrollbar.scrollbar.states.selectedState;
                    AnimaScrollbar.scrollbar.states.selectedState = this.targetState;
                    AnimaScrollbar.scrollbar.states.selectedState.activate();
                }
            };
            this.lastState = null;
            this.selectedState = null;
            this.initialState = null;
            
            this.selectState = function() {
                if(this.selectedState == null) {
                    if(this.initialState != null) {
                        this.selectedState = this.initialState;
                        this.selectedState.activate();
                    }
                } else {
                    this.selectedState.interrupt();
                }
            };

            // State Animations
            function scrollbar_initialState() {
                var scrollbarAnimation = (new Animations.AnimationWidth(AnimaScrollbar.scrollbar.scrollbarContainer, 0.3, AnimationCurves.exponential, '0.8vw'));
                var widerAnimation = (new Animations.AnimationBackgroundColor(AnimaScrollbar.scrollbar.scrollbarElem, 0.3, AnimationCurves.exponential, [40,40,40,0.4]));
                widerAnimation.start();
                scrollbarAnimation.start();
            }
            function scrollbar_touchStart() {
                scrollbar_mouseInWider();
            }
            function scrollbar_mouseInScrollbar() {
                var scrollbarAnimation = (new Animations.AnimationWidth(AnimaScrollbar.scrollbar.scrollbarContainer, 0.3, AnimationCurves.exponential, '1.2vw'));
                var widerAnimation = (new Animations.AnimationBackgroundColor(AnimaScrollbar.scrollbar.scrollbarElem, 0.3, AnimationCurves.exponential, [224,224,224,1]));
                scrollbarAnimation.start();
                widerAnimation.start();
            }
            function scrollbar_mouseInWider() {
                var scrollbarAnimation = (new Animations.AnimationWidth(AnimaScrollbar.scrollbar.scrollbarContainer, 0.3, AnimationCurves.exponential, '1.2vw'));
                var widerAnimation = new Animations.AnimationBackgroundColor(AnimaScrollbar.scrollbar.scrollbarElem, 0.3, AnimationCurves.exponential, [46,190,186,1]);
                widerAnimation.start();
                scrollbarAnimation.start();
            }
            function scrollbar_mousePressed() {

            }
            
            // Inizializzazione degli eventi
            var ScrollbarState_initial = new this.ScrollbarState('initial');
            var ScrollbarState_touchStart = new this.ScrollbarState('touchStart');
            var ScrollbarState_mouseInScrollbar = new this.ScrollbarState('mouseInScrollbar');
            var ScrollbarState_mouseInWider = new this.ScrollbarState('mouseInWider');
            var ScrollbarState_mousePressedOnWider = new this.ScrollbarState('mouseDownWider');

            this.initialState = ScrollbarState_initial;

            // inizializzazione delle animazioni
            ScrollbarState_initial.addListener(scrollbar_initialState);
            ScrollbarState_touchStart.addListener(scrollbar_touchStart);
            ScrollbarState_mouseInScrollbar.addListener(scrollbar_mouseInScrollbar);
            ScrollbarState_mouseInWider.addListener(scrollbar_mouseInWider);
            ScrollbarState_mousePressedOnWider.addListener(scrollbar_mousePressed);


            // inizializzazione delle transizioni
            var s0_t0 = new this.Transaction(ScrollbarState_mouseInScrollbar);
            var s0_t1 = new this.Transaction(ScrollbarState_mouseInWider);
            var s0_t2 = new this.Transaction(ScrollbarState_touchStart);

            s0_t0.addCondition(function() {
                return (AnimaScrollbar.scrollbar.insideScrollbarContainer && !AnimaScrollbar.scrollbar.insideScrollbarWider);
            });
            s0_t1.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && AnimaScrollbar.scrollbar.insideScrollbarWider);
            });
            s0_t2.addCondition(function() {
                return ("ontouchstart" in window) && AnimaScrollbar.scrollbar.enableMouseScrolling;
            });

            var s1_t0 = new this.Transaction(ScrollbarState_initial);
            var s1_t1 = new this.Transaction(ScrollbarState_mouseInWider);
            s1_t0.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && !AnimaScrollbar.scrollbar.insideScrollbarWider);
            });
            s1_t1.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && AnimaScrollbar.scrollbar.insideScrollbarWider);
            });

            var s2_t0 = new this.Transaction(ScrollbarState_initial);
            var s2_t1 = new this.Transaction(ScrollbarState_mouseInScrollbar);
            var s2_t2 = new this.Transaction(ScrollbarState_mousePressedOnWider);
            s2_t0.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && !AnimaScrollbar.scrollbar.insideScrollbarWider);
            });
            s2_t1.addCondition(function() {
                return (AnimaScrollbar.scrollbar.insideScrollbarContainer && !AnimaScrollbar.scrollbar.insideScrollbarWider);
            });
            s2_t2.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && AnimaScrollbar.scrollbar.insideScrollbarWider && AnimaScrollbar.scrollbar.enableMouseScrolling);
            });

            var s3_t0 = new this.Transaction(ScrollbarState_initial);
            var s3_t1 = new this.Transaction(ScrollbarState_mouseInScrollbar);
            var s3_t2 = new this.Transaction(ScrollbarState_mouseInWider);
            s3_t0.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && !AnimaScrollbar.scrollbar.insideScrollbarWider && !AnimaScrollbar.scrollbar.enableMouseScrolling);
            });
            s3_t1.addCondition(function() {
                return (AnimaScrollbar.scrollbar.insideScrollbarContainer && !AnimaScrollbar.scrollbar.insideScrollbarWider && !AnimaScrollbar.scrollbar.enableMouseScrolling);
            });
            s3_t2.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && AnimaScrollbar.scrollbar.insideScrollbarWider && !AnimaScrollbar.scrollbar.enableMouseScrolling);
            });

            var s4_t0 = new this.Transaction(ScrollbarState_initial);
            s4_t0.addCondition(function() {
                return !AnimaScrollbar.scrollbar.enableMouseScrolling;
            });

            // Assegnazione stato-transizione
            ScrollbarState_initial.addTransaction(s0_t0);
            ScrollbarState_initial.addTransaction(s0_t1);
            ScrollbarState_initial.addTransaction(s0_t2);
            ScrollbarState_mouseInScrollbar.addTransaction(s1_t0);
            ScrollbarState_mouseInScrollbar.addTransaction(s1_t1);
            ScrollbarState_mouseInWider.addTransaction(s2_t0);
            ScrollbarState_mouseInWider.addTransaction(s2_t1);
            ScrollbarState_mouseInWider.addTransaction(s2_t2);
            ScrollbarState_mousePressedOnWider.addTransaction(s3_t0);
            ScrollbarState_mousePressedOnWider.addTransaction(s3_t1);
            ScrollbarState_mousePressedOnWider.addTransaction(s3_t2);
            ScrollbarState_touchStart.addTransaction(s4_t0);



        };                            // oggetto che gestisce gli stati della scrollbar
        this.states = new this.ScrollbarStates();
        this.onEndDocument = new CustomEvent('scrollbarEnd');
        this.onStartDocument = new CustomEvent('scrollbarStart');
        this.eventFired = false;
        this.eventChecker = this.eventChecker || setInterval(
            function() {
                var scrollObj = AnimaScrollbar.scrollbar;
                if(scrollObj == null || typeof scrollObj === 'undefined')
                    return;

                scrollObj.checkEvents();
            },
            50
        );


        // Oggetto che definisce la relazione che intercorre tra la posizione della scrollbar e lo scroll offset del contenitore collegato.
        // Permette quindi di determinare il massimo offset possibile per il contenitore scrollable e per la scrollbar.
        // Permette infine di determinare la quantità di spostamento di uno dei due, sapendo il valore dell'altro
        this.boundModel = function() {
            this.scrollbarHeight = 0;
            this.scrollElementHeight = 0;
            this.boundedElemHeight = 0;
            this.maxScrollbarTop = function() {return this.scrollbarHeight - this.scrollElementHeight;};
            this.calculateTopScrollElem = function(topofbounded) {
                var p = topofbounded / this.boundedElemHeight;
                if(p < 0) p = 0;
                if(p > 1) p = 1;
                var min = 0;
                var max = this.scrollbarHeight - this.scrollElementHeight;
                return (max-min)*p + min;
            };
            this.calculateTopBounded = function(scrollbarTop) {
                var p = scrollbarTop / (this.scrollbarHeight - this.scrollElementHeight);
                if(p < 0) p = 0;
                if(p > 1) p = 1;

                return this.boundedElemHeight*p;
            };
            this.calculateHeightAsSumOfChildren = function(elem) {
                var children = elem.children;
                var height = 0;
                for(var i = 0; i < children.length; i++) {
                    height += parseFloat(toFloat(getJSValue(children[i], 'height')));
                }
                // from height should be subtracted 100vh: you can scroll 100vh less because the first 100vh are already visible...
                height -= convertValue('100vh');
                return height;
            };
        };
        this.boundedParameters = new this.boundModel();
        this.checkEvents = function() {
            if(this.eventFired || !AnimaUtility.isElement(this.boundedElement))
                return;

            this.eventFired = true;
            if(this.scrollbarPosition === 0) {
                this.boundedElement.dispatchEvent(this.onStartDocument);
            } else if (this.scrollbarPosition === this.boundedParameters.maxScrollbarTop()) {
                this.boundedElement.dispatchEvent(this.onEndDocument);
            } else {
                this.eventFired = false;
            }
        };

        // Aggiunge il valore in ingresso alla posizione attuale della scrollbar, quindi aggiorna i cambiamenti
        this.addDelta = function(delta) {
            var sign = (delta / Math.abs(delta));
            this.scrollbarPosition += this.boundedParameters.calculateTopScrollElem(this.deltaWheel)*sign;
            if(this.scrollbarPosition < 0) {
                this.scrollbarPosition = 0;
            } else if( this.scrollbarPosition > this.boundedParameters.maxScrollbarTop()) {
                this.scrollbarPosition = this.boundedParameters.maxScrollbarTop();
            }

            this.applyChanges();
        };
        this.addDeltaWA = function(delta) {
            var sign = (delta / Math.abs(delta));
            this.scrollbarPosition += this.boundedParameters.calculateTopScrollElem(this.deltaWheel)*sign;
            if(this.scrollbarPosition < 0) {
                this.scrollbarPosition = 0;
            } else if( this.scrollbarPosition > this.boundedParameters.maxScrollbarTop()) {
                this.scrollbarPosition = this.boundedParameters.maxScrollbarTop();
            }
            this.applyChangesWA();
        };

        // Imposta il valore della posizione della scrollbar e applica i cambiamenti
        this.setScrollbarPosition = function (scrollPosition) {
            var needUpdate = false;

            if(scrollPosition <= 0) {
                scrollPosition = 0;
                needUpdate = true;
                this.boundedElement.dispatchEvent(this.onStartDocument);
            }
            else if(scrollPosition > this.boundedParameters.maxScrollbarTop()) {
                scrollPosition = this.boundedParameters.maxScrollbarTop();
                needUpdate = true;
            }

            if(Math.abs(this.scrollbarPosition - scrollPosition) > 20) needUpdate = true;

            if(needUpdate) {
                this.scrollbarPosition = scrollPosition;
                this.applyChanges();
            }
        };
        this.setScrollbarPositionWA = function(scrollPosition) {
            var needUpdate = false;

            if(scrollPosition <= 0) {
                scrollPosition = 0;
                needUpdate = true;
            }
            else if(scrollPosition > this.boundedParameters.maxScrollbarTop()) {
                scrollPosition = this.boundedParameters.maxScrollbarTop();
                needUpdate = true;
            }

            if(Math.abs(this.scrollbarPosition - scrollPosition) > 1) needUpdate = true;

            if(needUpdate) {
                this.scrollbarPosition = scrollPosition;
                this.applyChangesWA();
            }
        };

        // applica i cambiamenti e quindi esegue le animazioni che terranno aggiornato questo model e la view
        this.applyChanges = function(){
            var scrollValue = this.boundedParameters.calculateTopBounded(this.scrollbarPosition);

            var barAnim = new Animations.AnimationTop(this.scrollbarWider, 0.25, AnimationCurves.linear, this.scrollbarPosition + 'px');
            var elemAnim = new Animations.AnimationScrollToTop(this.boundedElement, 0.25, AnimationCurves.linear,scrollValue + 'px');
            barAnim.setSamplingFrequency(40);
            elemAnim.setSamplingFrequency(40);
            barAnim.start();
            elemAnim.start();
        };
        this.applyChangesWA = function() {
            this.scrollbarWider.style.top = this.scrollbarPosition + 'px';
            var scrollValue = this.boundedParameters.calculateTopBounded(this.scrollbarPosition);
            this.boundedElement.scrollTop = scrollValue;

        };

        // definisce i valori e quindi le relazioni che intercorrono tra scrollbar e container scrollable
        this.calculateBoundedParameters = function() {
            AnimaScrollbar.scrollbar.boundedParameters.boundedElemHeight = AnimaScrollbar.scrollbar.boundedParameters.calculateHeightAsSumOfChildren(AnimaScrollbar.scrollbar.boundedElement);
            AnimaScrollbar.scrollbar.boundedParameters.scrollbarHeight = parseFloat(toFloat(getJSValue(AnimaScrollbar.scrollbar.scrollbarContainer, 'height')));
            AnimaScrollbar.scrollbar.boundedParameters.scrollElementHeight = parseFloat(toFloat(getJSValue(AnimaScrollbar.scrollbar.scrollbarWider, 'height')));
        };

        // inizializza gli eventi della scrollbar
        this.initializeScrollBarEvents = function() {
            // setting graphics behavior
            function scrollbar_scrollWiderOut() {
                AnimaScrollbar.scrollbar.insideScrollbarWider = false;
            }
            function scrollbar_scrollWiderIn() {
                AnimaScrollbar.scrollbar.insideScrollbarWider = true;
            }
            function scrollbar_scrollbarContainerOut() {
                AnimaScrollbar.scrollbar.insideScrollbarContainer = false;
            }
            function scrollbar_scrollbarContainerIn() {
                AnimaScrollbar.scrollbar.insideScrollbarContainer = true;
            }
            function scrollbar_scrollbarWiderPressed() {
                AnimaScrollbar.scrollbar.enableMouseScrolling = true;
            }
            function scrollbar_scrollbarWiderReleased() {
                AnimaScrollbar.scrollbar.enableMouseScrolling = false;
            }


            /* A scrollbar should scroll in some cases. One of these is when left mouse button is pressed into the scrollbarElem
             * while moving it up or down. Instead, in case of touchscreen, the user should be allowed to press everywhere in order
             * to activate the scrolling event.
             */
            this.scrollbarWider.onmousedown = function(event) {
                /*if(isMobile())
                    return;*/
                event.stopPropagation();
                event.preventDefault();
                var buttonLeftClicked = event.button == 0;
                if(!buttonLeftClicked)
                    return;

                AnimaScrollbar.scrollbar.initialMouseOffset = event.offsetY + parseInt(toInt(getJSValue(AnimaScrollbar.scrollbar.scrollbarContainer, 'top')));
                scrollbar_scrollbarWiderPressed();
                AnimaScrollbar.scrollbar.states.selectState();
            };
            function ontouchstart(event) {
                AnimaScrollbar.scrollbar.initialMouseOffset = event.touches[0].clientY; // - parseInt(toInt(getJSValue(AnimaScrollbar.scrollbar.scrollbarWider, 'top')));
                AnimaScrollbar.scrollbar.enableMouseScrolling = true;
                AnimaScrollbar.scrollbar.states.selectState();
            }
            window.addEventListener("touchstart", function (ev) {
                ontouchstart(ev);
            });

            /*
             * While mouse scrolling event enabled, the scrollbar should follow the pointer. The event is bound to window because
             * while mouse scrolling enabled the pointer is allowed to move everywhere in order to scroll.
             */
            function scrollbar_mousemove(event) {
                /*if(isMobile())
                 return;*/

                if(!AnimaScrollbar.scrollbar.enableMouseScrolling)
                    return;

                event.preventDefault();
                var y = event.clientY - AnimaScrollbar.scrollbar.initialMouseOffset;
                AnimaScrollbar.scrollbar.setScrollbarPositionWA(y);
            }
            function scrollbar_touchmove(event) {
                if(!AnimaScrollbar.scrollbar.enableMouseScrolling)
                    return;

                var touchMultiplier = 0.15;
                var y = (event.touches[0].clientY - AnimaScrollbar.scrollbar.initialMouseOffset)*touchMultiplier;
                if(Math.abs(y) < 1)
                    return;
                AnimaScrollbar.scrollbar.initialMouseOffset = event.touches[0].clientY;

                AnimaScrollbar.scrollbar.addDeltaWA(-y);
            }
            window.addEventListener("mousemove", function (ev) { scrollbar_mousemove(ev) });
            window.addEventListener("touchmove", function (ev) { scrollbar_touchmove(ev) });


            /*
             * When mouseUp event (or touchend event) is fired, then avoid the scrollbarElem to follow the pointer.
             * Because of the fact that graphic behaviors such as leaving the scrollbar hasn't be triggered (while mousedown)
             * if mouse is now out of elem, or eventually the scrollbar itself, then execute pending graphics adjustment (resize scrollbar, etc.)
             */
            function scrollbar_mouseup() {
                scrollbar_scrollbarWiderReleased();
                AnimaScrollbar.scrollbar.initialMouseOffset = 0;
                AnimaScrollbar.scrollbar.states.selectState();
            }
            function scrollbar_touchend() {
                AnimaScrollbar.scrollbar.enableMouseScrolling = false;
                AnimaScrollbar.scrollbar.initialMouseOffset = 0;
                AnimaScrollbar.scrollbar.states.selectState();
            }
            window.addEventListener("mouseup", scrollbar_mouseup);
            window.addEventListener("touchend", scrollbar_touchend);


            // When window resizes, bounded parameters should be recalculated due to avoid undesirable behaviors
            window.addEventListener("resize", this.calculateBoundedParameters);


            // remaining graphics events
            this.scrollbarContainer.onmouseenter = function() {
                scrollbar_scrollbarContainerIn();
                AnimaScrollbar.scrollbar.states.selectState();
            };
            this.scrollbarContainer.onmouseleave = function () {
                scrollbar_scrollbarContainerOut();
                AnimaScrollbar.scrollbar.states.selectState();
            };
            this.scrollbarWider.onmouseenter = function() {
                scrollbar_scrollWiderIn();
                scrollbar_scrollbarContainerOut();
                AnimaScrollbar.scrollbar.states.selectState();
            };
            this.scrollbarWider.onmouseleave = function () {
                scrollbar_scrollWiderOut();
                scrollbar_scrollbarContainerIn();
                AnimaScrollbar.scrollbar.states.selectState();
            };
        };
        this.initializeScrollBarObject = function() {
            var s = document.getElementsByClassName('scrollbar');
            if(s.length !== 1)
                return;
            this.scrollbarContainer = s[0];

            s = this.scrollbarContainer.getElementsByClassName('wider');
            this.scrollbarWider = s[0];

            s = this.scrollbarWider.getElementsByClassName('seeker');
            if(s.length !== 1)
                return;

            this.scrollbarElem = s[0];
        };


        // collega un elemento come scrollable container alla scrollbar
        this.bind = function(elem) {
            /*if(!this.initialized && !isMobile()) {*/
            if(!this.initialized) {
                this.initialized = true;
                this.initializeScrollBarObject();
                this.initializeScrollBarEvents();
                this.states.selectState();          // select initial state;
            }

            this.boundedElement = elem;
            this.boundedParameters.boundedElemHeight = this.boundedParameters.calculateHeightAsSumOfChildren(elem);

            if(this.boundedParameters.boundedElemHeight === 0) {
                this.scrollbarContainer.addClass('displayNone');
                this.calculateBoundedParameters();
            } else {
                this.scrollbarContainer.removeClass('displayNone');

                /* Scrolling with mouse wheel is maybe the most natural approach to scroll at all */
                this.boundedElement.onwheel = function(event) {
                    if(event == null || typeof event === 'undefined')
                        event = {
                            deltaY: 0
                        };

                    AnimaScrollbar.scrollbar.addDelta(event.deltaY);
                };
                this.calculateBoundedParameters();


            }
        };
        this.rebind = function() {
            this.bind(this.boundedElement);
        }
    },
    scrollbar: null
};

// Creazione di un oggetto scrollbar
AnimaScrollbar.scrollbar = new AnimaScrollbar.scrollbarObj();