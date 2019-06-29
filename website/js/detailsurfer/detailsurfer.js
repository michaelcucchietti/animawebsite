var DetailSurfer = DetailSurfer || {
    surfers: [],
    surferEntry : function(surferElem, surfer) {
        this.element = surferElem;
        this.surferObj = surfer;

        this.equals = function(surferElem) {
            return this.element === surferElem;
        };
        this.isSurfer = function(surfer) {
            return this.surferObj === surfer;
        };
        this.getSurfer = function() {return this.surferObj;}
    },
    getIndexOf: function(surferElem) {
        for(var i = 0; i < this.surfers.length; i++) {
            if(this.surfers[i].equals(surferElem))
                return i;
        }

        return -1;
    },
    getIndexOfObj: function(surferObj) {
        for(var i = 0; i < DetailSurfer.surfers.length; i++) {
            if(DetailSurfer.surfers[i].isSurfer(surferObj))
                return i;
        }

        return -1;
    },
    createSurfer: function(surferElem) {
        var index = this.getIndexOf(surferElem);
        if(index == -1 && surferElem != null && typeof surferElem !== 'undefined') {
            this.surfers.push(new this.surferEntry(surferElem, new this.surfer(surferElem)));

        }
    },
    getSurferFromElem: function(surferElem) {
        if(surferElem == null || typeof surferElem === 'undefined')
            return null;
        var index = this.getIndexOf(surferElem);
        if(index === -1)
            return null;

        return this.surfers[index].getSurfer();
    },
    getSurferOfNode: function(node) {
        if(node == null || typeof node === 'undefined')
            return null;

        var parent = node.parentElement;
        while(parent != null && this.getIndexOf(parent) == -1) {parent = parent.parentElement;}

        if(parent == null)
            return null;

        return this.surfers[this.getIndexOf(parent)].getSurfer();

    },
    getSurferOfArticle: function(article) {
        if(article == null || typeof article === 'undefined')
            return null;

        var parent = article.parentElement;
        while(parent != null && this.getIndexOf(parent) == -1) {parent = parent.parentElement;}

        if(parent == null)
            return null;

        return this.surfers[this.getIndexOf(parent)].getSurfer();

    },
    startSurfer: function(surfer) {
        if(DetailSurfer.getIndexOfObj(surfer) == -1)
            return;

        surfer.start();
    },
    surfer: function(surferElem)  {
        this.surferElem = surferElem;
        this.navbar = surferElem.getElementsByClassName('navbar')[0];
        this.nav = surferElem.getElementsByClassName('navigator')[0];
        this.articles = surferElem.getElementsByClassName('articles')[0];
        this.articlesBaseWidth = null;
        this.timeoutInterval = parseInt(this.surferElem.getAttribute("slidetime")) || 3000;
        this.intervalReference = null;
        this.touchStartX = 0;
        this.touchEndX = 0;


        this.navigatorNode = function(surfer) {
            this.nodeEntry = function(node, article, surfer) {
                this.surferObj = surfer;
                this.node = node;
                this.articlebound = article;
            };
            this.activeOne = null;
            this.nodes = [];
            var nodeIndex = 0;
            this.surferObj = surfer;

            this.indexOfNode = function(nodeElement) {
                for(var i = 0; i < this.nodes.length; i++) {
                    if(this.nodes[i].node === nodeElement)
                        return i;
                }
                return -1;
            };
            this.setActive = function(node) {
                if(this.activeOne != null)
                    this.activeOne.removeClass('active');

                this.activeOne = node;
                node.addClass('active');

                var index = this.indexOfNode(node);
                if(index != -1)
                    nodeIndex = index;
            };
            this.getNextNode = function() {
                if(this.nodes.length == 0)
                    return null;

                var node = this.nodes[(nodeIndex+1) % this.nodes.length];
                return node;
            };
            this.getPreviousNode = function() {
                if(this.nodes.length == 0)
                    return null;

                var node = this.nodes[(nodeIndex+this.nodes.length -1) % this.nodes.length];
                return node;
            };
            this.getCurrentNode = function() {
                return this.nodes[nodeIndex];
            };
            this.getNodeEntry = function(nodeElement) {
                for(var i = 0; i < this.nodes.length; i++) {
                    if(this.nodes[i].node === nodeElement)
                        return this.nodes[i];
                }
                return null;
            };
            this.getCurrentNodeIndex = function() {return nodeIndex;};

            this.create = function(navigator, article)  {
                if( navigator != null && typeof navigator !== 'undefined' &&
                    article != null && typeof article !== 'undefined'
                )
                {
                    var node = document.createElement('div');
                    Element.prototype.setTimeoutID = function(id) {
                        this.setAttribute("t_id", id);
                    };
                    Element.prototype.getTimeoutID = function() {
                        return this.getAttribute("t_id");
                    };
                    node.addClass('navelement');

                    if(this.activeOne == null) {
                        node.addClass('active');
                        this.activeOne = node;

                    }

                    this.nodes.push(new this.nodeEntry(node, article, this.surferObj));


                    node.onclick = function() {
                        var surfer = DetailSurfer.getSurferOfNode(this);
                        surfer.pause();

                        var nodeEntry = surfer.navigatorNodeManager.getNodeEntry(this);
                        surfer.goToNode(nodeEntry);

                    };

                    navigator.appendChild(node);
                }
            }
        };


        this.navigatorNodeManager = new this.navigatorNode(this);

        this.start = function()  {
            if(this.intervalReference != null)
                return;

            this.intervalReference = setInterval(this.doAnimation, this.timeoutInterval, this);
        };
        this.stop = function() {
            if(this.intervalReference == null)
                return;

            clearInterval(this.intervalReference);
            this.intervalReference = null;
        };
        this.pause = function() {
            this.stop();
            if(this.surferElem.getTimeoutID && this.surferElem.getTimeoutID() != null && typeof this.surferElem.getTimeoutID() !== 'undefined')
                clearTimeout(this.surferElem.getTimeoutID());

            var id = setTimeout(DetailSurfer.startSurfer, Math.max(10000, 2*this.timeoutInterval), this);
            this.surferElem.setTimeoutID(id);
        };

        this.doAnimation = function(surfer) {
            if(surfer.intervalReference == null)
                return;

            var nodeEntry = surfer.navigatorNodeManager.getNextNode();
            surfer.goToNode(nodeEntry);

        };
        this.goToNode = function (nodeEntry) {
            var targetLeft = parseFloat(toFloat(getJSValue(nodeEntry.articlebound, 'left')));
            var offsetLeft = -targetLeft;
            var articlesPosition = parseFloat(toFloat(getJSValue(this.articles, 'left')));
            var finalArticlesPosition = articlesPosition + offsetLeft;
            finalArticlesPosition += 'px';

            (new Animations.AnimationLeft(this.articles, 1, AnimationCurves.exponential, finalArticlesPosition)).start();
            this.navigatorNodeManager.setActive(nodeEntry.node);
        };


        /* SURFER CONSTRUCTOR */
        var articleArray = this.articles.getElementsByClassName('article');
        for(var i = 0; i < articleArray.length; i++) {
            this.navigatorNodeManager.create(this.nav, articleArray[i]);
        }

        if(this.navbar != null && typeof this.navbar !== 'undefined') {
            this.navbar.onmouseenter = function () {
                var surfer = DetailSurfer.getSurferOfNode(this);
                (new Animations.AnimationHeight(surfer.nav, 0.6, AnimationCurves.exponential, '3vh')).start();
            };
            this.navbar.onmouseleave = function () {
                var surfer = DetailSurfer.getSurferOfNode(this);
                (new Animations.AnimationHeight(surfer.nav, 0.6, AnimationCurves.exponential, '1vh')).start();
            }
        }

        this.surferElem.addEventListener('touchstart', function(ev) {
            var surfer = DetailSurfer.getSurferFromElem(this);
            surfer.touchStartX = ev.touches[0].clientX;
        });
        this.surferElem.addEventListener('touchmove', function(ev) {
            var surfer = DetailSurfer.getSurferFromElem(this);
            surfer.touchEndX= ev.touches[0].clientX;
        });
        this.surferElem.addEventListener('touchend', function(ev) {
            var surfer = DetailSurfer.getSurferFromElem(this);

            var delta = surfer.touchEndX - surfer.touchStartX;
            var minTouchDelta = Math.max(parseFloat(convertValue('5vw')), parseFloat(convertValue('5vh')));

            var toLeft = (delta > 0 && Math.abs(delta) > minTouchDelta);
            var toRight = (delta < 0 && Math.abs(delta) > minTouchDelta);
            var targetNode;
            if(toLeft) {
                surfer.pause();
                targetNode = surfer.navigatorNodeManager.getPreviousNode();
            } else if(toRight) {
                surfer.pause();
                targetNode = surfer.navigatorNodeManager.getNextNode();
            } else {
                return;
            }
            surfer.goToNode(targetNode);
        });

        this.start();

    },
    updateSurferPosition: function() {
        for(var i = 0; i < DetailSurfer.surfers.length; i++) {
            var s = DetailSurfer.surfers[i];
            s.getSurfer().goToNode(s.getSurfer().navigatorNodeManager.getCurrentNode());
        }
    },
    loadSurfers: function(surferClassName) {
        if(surferClassName == null || typeof surferClassName !== 'string')
            return;

        var surfers = document.getElementsByClassName(surferClassName);
        for(var i = 0; i < surfers.length; i++) {
            var s = surfers[i];
            (DetailSurfer.createSurfer(s));
        }
    },
    updateSurferPositionOnResize: function() {
        var b = window; // || document.getElementsByTagName("body")[0];
        if(!AnimaUtility.isElement(b) && b !== window)
            return;

        b.addEventListener("resize", function() {
            DetailSurfer.updateSurferPosition();
        });
    }

};




