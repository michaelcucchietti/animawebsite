var AnimaUtility = AnimaUtility || {
    isElement: function(o) {
        return (typeof HTMLElement === 'object') ?
            o instanceof HTMLElement :
            (o) && (typeof o === 'object') && (o.nodeType === 1) && (typeof o.nodeName === 'string');
    },
    isInside: function(x, y, elem) {
        if(!elem.isElement())
            return false;

        var xOffset = parseFloat(toFloat(getJSValue(elem, 'left')));
        var yOffset = parseFloat(toFloat(getJSValue(elem, 'top')));
        var xMax = parseFloat(toFloat(getJSValue(elem, 'width')));
        var yMax = parseFloat(toFloat(getJSValue(elem, 'height')));

        var normalX = x - xOffset;
        var normalY = y - yOffset;

        return (normalX >= 0 && normalX <= xMax) && (normalY >= 0 && normalY <= yMax);
    }
};
Object.prototype.isElement = function() {
    return AnimaUtility.isElement(this);
};
Object.prototype.isInside = function(X, Y) {
    return AnimaUtility.isInside(X, Y, this);
};