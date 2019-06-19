function generateNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1))
}
function generateLowerChar() {
    return String.fromCharCode(generateNumber(97, 122));
}
function generateUpperChar() {
    return String.fromCharCode(generateNumber(65, 90))
}
function generateStringNumber() {
    return String.fromCharCode(generateNumber(48, 57));
}
function generateRandomChar() {
    var what = generateNumber(0, 2);
    if(what === 0)
        return generateLowerChar();
    else if(what === 1)
        return generateUpperChar();
    else if(what === 2)
        return generateStringNumber();
}
function generateID(minLength, maxLength) {
    var length = generateNumber(minLength, maxLength);
    var resultID = "";
    for(var i = 0; i < length; i++) {
        resultID += generateRandomChar();
    }

    return resultID;
}

var AnimaSitemap = AnimaSitemap || {
    Stack: function() {
        this.stack = [];
        this.length = 0;
        this.push = function(node) {
            if(node == null || typeof node === 'undefined')
                return;

            this.stack.push(node);
            this.length++;
        };
        this.pop = function() {
            if(this.length === 0)
                return null;

            this.length--;
            var prev = this.stack.length;
            var node = this.stack.pop();
            var next = this.stack.length;
            return node;
        }
    },
    Node: function(element, isRoot) {
        this.element = element;
       this.parent = null;
       this.history = new AnimaSitemap.Stack();
       this.sitemapChildren = {};
       this.internalID = generateID(8, 24);
       this.is_Root = isRoot;
       this.description = null;
       this.name = null;
       this.link = null;
       this.length = 0;

       this.isRoot = function() {return this.is_Root;};
       this.getChildren = function() {
           var c = [];
           for(var child in this.sitemapChildren) {
               var node = this.sitemapChildren[child];
               if(node != null && typeof node !== 'undefined' && 'isValidNode' in node && node.isValidNode())
                   c.push(node);
           }
           return c;
       };
       this.getDescription = function() {return this.description;};
       this.getName = function() {return this.name;};
       this.getParent = function () {
           return this.parent;
       };
       this.getLink = function() {
           return this.link;
       };
       this.getBack = function() {
           return this.history.pop();
       };

        this.hasLink = function() {
            return typeof this.link === 'string';
        };
        this.hasParent = function() {
            return this.parent != null && typeof this.parent !== 'undefined';
        };
        this.hasBack = function() {
            return this.history.length > 0;
        };

        this.setBack = function(node) {
            this.history.push(node);
        };


        /* private methods */
        this.isValidNode = function() {
            return 'internalID' in this;
        };
        this.containChild = function(child) {
            if(child == null || typeof child === 'undefined' || child.internalID == null || typeof child.internalID !== 'string')
                return false;

            return child.internalID in this.sitemapChildren;
        };
        this.setParent = function(parentNode) {
            this.parent = parentNode;
        };
        this.addChild = function (child) {
            if(this.containChild(child))
                return;

            this.sitemapChildren[child.internalID] = child;
            child.setParent(this);
            this.length++;
        };
        this.initChildren = function(childrenElem) {
            var children = childrenElem.children;
            for(var i = 0; i < children.length; i++) {
                var child = children[i];
                this.addChild(new AnimaSitemap.Node(child, false));
            }
        };
        this.readInners = function() {
            var children = this.element.children;
            for(var i = 0; i < children.length; i++) {
                var child = children[i];
                if(child.hasAttribute('anima-node-type')) {
                    var value = child.getAttribute('anima-node-type');

                    if(value === 'name')
                        this.name = child.innerText;
                    else if(value === 'description')
                        this.description = child.innerText;
                    else if(value === 'link')
                        this.link = child.innerText;
                    else if(value === 'children')
                        this.initChildren(child);
                }
            }
        };


        // init
        this.readInners();

    },
    Button: function(element) {
        this.buttonElement = element;
        this.buttonElement.animaReference = this;
        this.enabled = true;
        this.enable = function() {
            this.enabled = true;
        };
        this.disable = function() {
            this.enabled = false;
            this.leave();
        };
        this.isEnabled = function() {return this.enabled};
        this.work = function() {};
        this.hover = function() {};
        this.leave = function() {};

        this.buttonElement.addEventListener('mouseenter', function() {
            if(this.animaReference.isEnabled())
                this.animaReference.hover();

        });
        this.buttonElement.addEventListener('mouseleave', function() {
            if(this.animaReference.isEnabled())
                this.animaReference.leave();

        });
        this.buttonElement.addEventListener('click', function() {
            if(this.animaReference.isEnabled())
                this.animaReference.work();
        })
    },
    ParentButton: function(controller) {
        AnimaSitemap.Button.call(this, document.getElementById('sitemapParentButton'));
        this.controller = controller;
        this.work = function() {
            this.controller.goToParent();
        };
        this.hover = function() {
            if(!this.isEnabled())
                return;

            this.buttonElement.addClass('parentHover');
        };
        this.leave = function() {
            this.buttonElement.removeClass('parentHover');
        };
    },
    LinkButton: function(controller) {
        AnimaSitemap.Button.call(this, document.getElementById('sitemapLinkButton'));
        this.controller = controller;
        this.work = function() {
            this.controller.goLink();
        };
        this.hover = function() {
            this.buttonElement.addClass('linkHover');
        };
        this.leave = function() {
            this.buttonElement.removeClass('linkHover');
        }
    },
    BackButton: function(controller) {
        AnimaSitemap.Button.call(this, document.getElementById('sitemapBackButton'));
        this.controller = controller;
        this.work = function() {
            this.controller.goBack();
        }
        this.hover = function() {
            if(!this.isEnabled())
                return;

            this.buttonElement.addClass('backHover');
        };
        this.leave = function() {
            this.buttonElement.removeClass('backHover');
        }
    },
    SiteMap: function() {
       this.rootElement = document.documentElement.getElementsByAttribute('anima-sitemap-type', 'root')[0];
       this.rootNode = new AnimaSitemap.Node(this.rootElement, true);                                                             // inizializzazione albero
       this.currentNode = null;

       this.selectNode = function(node, chain) {
           if(chain)
                node.setBack(this.currentNode);
           this.currentNode = node;
       };
       this.getChildren = function() {
           if(this.currentNode == null)
               return [];
           return this.currentNode.getChildren();
       };
       this.getName = function() {
           return this.currentNode.getName();
       };
       this.getDescription = function() {
           return this.currentNode.getDescription();
       };
       this.getParent = function() {
           return this.currentNode.getParent();
       };
       this.getLink = function() {
           return this.currentNode.getLink();
       };
       this.getBack = function() {
           return this.currentNode.getBack();
       };
       this.getRootNode = function() {return this.rootNode;};

       this.hasParent = function() {
           return this.currentNode.hasParent();
       };
       this.hasLink = function() {
           return this.currentNode.hasLink();
       };
       this.hasBack = function() {
           return this.currentNode.hasBack();
       };
       this.hasChildren = function() {
           return this.currentNode.length > 0;
       };
       this.isRoot = function() {
           return this.currentNode.isRoot();
       };
    },
    SitemapController: function(view) {
        this.view = view;
        this.map = new AnimaSitemap.SiteMap();                                                                              // init tree
        this.parentButton = new AnimaSitemap.ParentButton(this);
        this.backButton = new AnimaSitemap.BackButton(this);
        this.linkButton = new AnimaSitemap.LinkButton(this);

        this.open = function(node, chain) {
            this.map.selectNode(node, chain);
            this.updateButtons();
            this.view.update();

        };
        this.openNode = function(node) {
            this.open(node, true);
        };
        this.openRoot = function() {
           this.openNode(this.map.getRootNode());
        };
        this.goToParent = function() {
            if(this.map.hasParent()) {
                this.openNode(this.map.getParent());
            }
        };
        this.goBack = function() {
            if(this.map.hasBack())
                this.open(this.map.getBack(), false);
        };
        this.goLink = function() {
            if(this.map.hasLink())
                AnimaSections.openID(this.map.getLink());
        };
        this.getChildren = function() {
            return this.map.getChildren();
        };
        this.getName = function() {
            return this.map.getName();
        };
        this.getDescription = function() {
            return this.map.getDescription();
        };
        this.getBackButton = function() {return this.backButton;};
        this.getParentButton = function() {return this.parentButton;};
        this.getLinkButton = function() {return this.linkButton;};

        this.updateParent = function() {
            if(this.map.hasParent())
                this.parentButton.enable();
            else
                this.parentButton.disable();
        };
        this.updateLink = function() {
            if(this.map.hasLink())
                this.linkButton.enable();
            else
                this.linkButton.disable();
        };
        this.updateBack = function() {
            if(this.map.hasBack())
                this.backButton.enable();
            else
                this.backButton.disable();
        };
        this.updateButtons = function() {
            this.updateBack();
            this.updateLink();
            this.updateParent();
        };


    },
    SitemapView: function() {
        this.controller = new AnimaSitemap.SitemapController(this);
        this.section = document.body.getElementsByAttribute('anima-id', 'sitemap')[0];
        this.section.controller = this.controller;
        this.nameElement = this.section.getElementsByAttribute('anima-id', 'name')[0];
        this.descElement = this.section.getElementsByAttribute('anima-id', 'description')[0];
        this.childrenElement = this.section.getElementsByAttribute('anima-id', 'leavesBox')[0];


        this.update = function() {
            this.updateMainNode();
            this.updateChildren();
            this.updateButtons();
        };

        // private methods
        this.updateButtons = function() {
            var bButton = this.controller.getBackButton();
            var pButton = this.controller.getParentButton();
            var lButton = this.controller.getLinkButton();

            if(bButton.isEnabled())
                bButton.buttonElement.removeClass('backDisabled');
            else
                bButton.buttonElement.addClass('backDisabled');

            if(pButton.isEnabled())
                pButton.buttonElement.removeClass('parentDisabled');
            else
                pButton.buttonElement.addClass('parentDisabled');

            if(lButton.isEnabled())
                lButton.buttonElement.removeClass('linkDisabled');
            else
                lButton.buttonElement.addClass('linkDisabled');

        };
        this.updateName = function(name) {
            if(name == null || typeof name !== 'string')
                return;

            this.nameElement.innerText = name;
        };
        this.updateDescription = function(description) {
            if(description == null || typeof description !== 'string')
                return;

            this.descElement.innerText = description;
        };
        this.updateMainNode = function() {
            this.updateName(this.controller.getName());
            this.updateDescription(this.controller.getDescription());
        };
        this.clearChildren = function() {
            while(this.childrenElement.children.length > 0) {
                var child = this.childrenElement.children[0];
                this.childrenElement.removeChild(child);
            }
        };
        this.createChild = function(node) {
            var child = document.createElement('div');
            child.addClass('leaf');

            var childContent = document.createElement('div');
            childContent.addClass('childElement');

            var nameField = document.createElement('h2');
            var descField = document.createElement('div');
            var openButton = document.createElement('div');
            nameField.addClass('nameField');
            descField.addClass('descField');
            openButton.addClass('openButton');

            nameField.innerText = node.getName();
            descField.innerText = node.getDescription();
            openButton.innerText = "Apri";

            openButton.nodeReference = node;
            openButton.controller = this.controller;
            openButton.addEventListener('click', function() {
                this.controller.openNode(this.nodeReference);
            });

            childContent.appendChild(nameField);
            childContent.appendChild(descField);
            childContent.appendChild(openButton);

            child.appendChild(childContent);


            return child;
        };
        this.addChild = function(element) {
            this.childrenElement.appendChild(element);
        };
        this.updateChildren = function() {
            this.clearChildren();
            var children = this.controller.getChildren();
            for(var i = 0; i < children.length; i++) {
                var childNode = children[i];
                this.addChild(this.createChild(childNode));
            }
        };

        /*this.section.addEventListener('shown', function () {
            this.controller.openRoot();
        })*/

        this.controller.openRoot();
    }
};

// initialization
AnimaSitemap.ParentButton.prototype = Object.create(AnimaSitemap.Button.prototype);
AnimaSitemap.LinkButton.prototype = Object.create(AnimaSitemap.Button.prototype);
AnimaSitemap.BackButton.prototype = Object.create(AnimaSitemap.Button.prototype);
AnimaSitemap.ParentButton.constructor = AnimaSitemap.ParentButton;
AnimaSitemap.LinkButton.constructor = AnimaSitemap.LinkButton;
AnimaSitemap.BackButton.constructor = AnimaSitemap.BackButton;

