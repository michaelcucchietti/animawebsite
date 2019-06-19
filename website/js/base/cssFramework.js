Object.prototype.addClass = function(className) {
    if(!AnimaUtility.isElement(this))
        return;

    var middle = new RegExp("\\s+" + className + "\\s+");      // middle class
    var start = new RegExp("^" + className + "\\W");         // start class
    var endClass = new RegExp("\\W" + className + "$");      // end line
    var wholeClassName = new RegExp("^" + className + "$");             // whole classname list

    if(start.test(this.className) || middle.test(this.className) || endClass.test(this.className) || wholeClassName.test(this.className)) {
        return;
    }

    this.className += ' ' + className;
};
Object.prototype.addClasses = function(classNames) {
    var classes = classNames.split(/\s+/);
    for(var c = 0; c < classes.length; c++) {
        var className = classes[c];
        if(className.length > 0)
            this.addClass(className);
    }
};
Object.prototype.removeClass = function(className) {
    if(!AnimaUtility.isElement(this))
        return;


    /*while(className.charAt(0) == ' ') {
        className = className.substring(1);
    }

    if(element.className.search(' '+className) == -1)
        return;

    element.className = element.className.replace(' ' + className, '');*/
    var classes = this.className.split(/\s+/);
    var newClassName = "";
    for(var c = 0; c < classes.length; c++) {
        if(classes[c] !== className)
            newClassName += classes[c] + " ";
    }

    this.className = newClassName;

};
Object.prototype.containsClass = function(className) {
    if(!AnimaUtility.isElement(this))
        return false;
    return this.className.search(className) >= 0;
};

/*
	Ottiene il valore della proprietà css valutata ed elaborata di un ceto elemento.

	Object (this): elemento a cui si fa riferimento.
	styleProp: indica il nome testuale della proprietà css, e.g.: font-size
*/
Object.prototype.getStyle = function(styleProp) {
    var value, defaultView = this.ownerDocument.defaultView;
    // W3C standard way:
    if (defaultView && defaultView.getComputedStyle) {
        // sanitize property name to css notation (hypen separated words eg. font-Size)
        styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
        return defaultView.getComputedStyle(this, null).getPropertyValue(styleProp);
    } else if (this.currentStyle) { // IE
        // sanitize property name to camelCase
        styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
            return letter.toUpperCase();
        });
        value = this.currentStyle[styleProp];
        // convert other units to pixels on IE
        if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
            return (function(value) {
                var oldLeft = this.style.left, oldRsLeft = this.runtimeStyle.left;
                this.runtimeStyle.left = this.currentStyle.left;
                this.style.left = value || 0;
                value = this.style.pixelLeft + "px";
                this.style.left = oldLeft;
                this.runtimeStyle.left = oldRsLeft;
                return value;
            })(value);
        }
        return value;
    }
};

Object.prototype.containComputedProperty = function(propertyName, propertyValue) {
    if(!AnimaUtility.isElement(this))
        return false;

    var value = this.getStyle(propertyName);
    return value === propertyValue;
};
Object.prototype.containProperty = function(propertyName, propertyValue) {
    if(!AnimaUtility.isElement(this))
        return false;

    var selectorsArray = document.getSelectorsByStyleProperty(propertyName, propertyValue);
    var selectors = "";
    for(var sIndex = 0; sIndex < selectorsArray.length; sIndex++) {
        selectors += selectorsArray[sIndex] + " ";
    }

    var pattern;


    // selectors is a string that now contains all selector with propertyName (and eventually propertyValue) specified
    // testing with regex will return true if and only if selectors contains at least one class of element
    var classes = this.classList;
    for(var index = 0; index < classes.length; index++) {
        pattern = new RegExp("\\." + classes[index] + "[\\{|\\s+]");
        if(pattern.test(selectors))
            return true;
    }

    return false;
};
Object.prototype.getAllElements = function() {
    if(!AnimaUtility.isElement(this))
        return null;

    var elements = [this];
    var children = this.children || this.childNodes;

    for(var k = 0; k < children.length; k++) {
        Array.prototype.push.apply(elements, (children[k]).getAllElements());
    }

    return elements;
};
Object.prototype.isDisplayed = function() {
    return this.getStyle('display') !== 'none' || (this.style != null && typeof this.style === 'string' && this.style.display !== 'none');
};
Object.prototype.getElementsByAttributeName = function(attributeName) {
    var inners = this.getAllElements();
    var elementsFiltered = [];
    for(var i = 0; i < inners.length; i++) {
        var elem = inners[i];
        if(elem != null && typeof elem !== 'undefined' && elem.hasAttribute(attributeName))
            elementsFiltered.push(elem);
    }

    return elementsFiltered;
};
Object.prototype.getElementsByAttribute = function(attributeName, value) {
    var elements = this.getElementsByAttributeName(attributeName);
    var result = [];
    for(var i = 0; i < elements.length; i++) {
        var elemValue = elements[i].getAttribute(attributeName);
        if(value === elemValue)
            result.push(elements[i]);
    }
    return result;
};
document.getElementsBySelectorString = function(selectorString) {
    var selectorElements = selectorString.split(",");
    var elements = [];

    for(var i = 0; i < selectorElements.length; i++) {
        /*
         * SelectorString is a css selector string that follows css syntax (e.g.: div.data  a.buttons, table, .candyMan, a:hover    div)
         * SelectorString is at first normalized reducing redundant spaces to one single space and removing that ones before element selector.
         * After this operation, the example selectorString will become: div.data a.buttons,table,.candyMan,a:hover div.
         * Then just split by comma and found all element selectors (classes).
         */
        var selector = selectorElements[i].replace(/(.+)\s+/g, "$1 ").replace(/^\s+/, '');
        var classes = selector.split(/\s+/);
        var nodes = [];
        for(var k = 0; k < classes.length; k++) {
            /*
             * Finding classes is not enough. The elements must be pushed into result respecting the css syntax.
             * For example div.data a.buttons refers only to a.buttons elements inside div.data etc.
             */
            var newNodes = [];

            // removing pseudo-things
            classes[k] = classes[k].replace(/:\w*/, '');

            // checking if class-name, id-name or tag_name
            if(/.*\..*/.test(classes[k])) {
                // class name
                var className = classes[k].replace(/.*\.(.*)/, "$1");
                if(k === 0) {
                    Array.prototype.push.apply(newNodes, document.getElementsByClassName(className));
                } else {
                    for(var n = 0; n < nodes.length; n++) {
                        var node = nodes[n];
                        Array.prototype.push.apply(newNodes, node.getElementsByClassName(className));
                    }
                }
            }
            else if(/#.*/.test(classes[k])) {
                // id name
                var idName = classes[k].replace("#(.*)", "$1");
                if(k === 0) {
                    var elem = document.getElementById(idName);
                    if(elem != null && typeof elem !== 'undefined')
                        newNodes.push(elem);
                } else {
                    for(n = 0; n < nodes.length; n++) {
                        node = nodes[n];

                        var e = node.getElementById(idName);
                        if(e != null && typeof e !== 'undefined')
                            newNodes.push(e);
                    }
                }
            }
            else if(classes[k].length > 0) {
                // tagName
                var tagName = classes[k];
                if(k === 0) {
                    Array.prototype.push.apply(newNodes, document.getElementsByTagName(tagName));
                } else {
                    for(n = 0; n < nodes.length; n++) {
                        node = nodes[n];
                        Array.prototype.push.apply(newNodes, node.getElementsByTagName(tagName));
                    }
                }
            }

            nodes = newNodes;
        }


        Array.prototype.push.apply(elements, nodes);
    }
    return elements;
};
document.getSelectorsByStyleProperty = function(propertyName, propertyValue) {
    var selectors = [];
    var sheets = document.styleSheets;
    var regexTest = new RegExp(propertyName + ":\\s*" + propertyValue);
    var isMedia = new RegExp("@media");

    for(var s = 0; s < sheets.length; s++) {
        var rules = sheets[s].rules || sheets[s].cssRules;
        for(var r = 0; r < rules.length; r++) {
            var cssText = rules[r].cssText || rules[r].style.cssText;

            if(isMedia.test(cssText))  {
                var innerRules = rules[r].cssRules || rules[r].rules;
                for(var ir = 0; ir < innerRules.length; ir++) {
                    cssText = innerRules[ir].cssText;
                    if(regexTest.test(cssText)) {
                        selectors.push(innerRules[ir].selectorText)
                    }
                }
            } else {
                if(regexTest.test(cssText)) {
                    selectors.push(rules[r].selectorText);
                }
            }

        }
    }

    return selectors;
};
document.getElementsByStyleProperty = function(propertyName, propertyValue) {

    if(propertyName == null || typeof propertyName === 'undefined')
        return [];
    if(typeof propertyValue === 'undefined')
        propertyValue = null;


    var selectorsArray = document.getSelectorsByStyleProperty(propertyName, propertyValue);      // getting all css selectors with propertyName and (eventually) propertyValue specified
    var selectors = "";
    for(var sIndex = 0; sIndex < selectorsArray.length; sIndex++) {
        selectors += selectorsArray[sIndex] + ",";                                      // adapting selector list for regex
    }
    selectors = selectors.substring(0, selectors.length-1);


    return document.getElementsBySelectorString(selectors);
};