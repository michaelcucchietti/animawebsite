var AnimaBrowsers = AnimaBrowsers || {
    UA: navigator.userAgent,
    isAndroid: function() {return AnimaBrowsers.UA.search(/[lL]inux.*[aA]ndroid/) >= 0},
    isIPhone: function() {return AnimaBrowsers.UA.search(/IPhone/) >= 0},
    isWindowsPhone: function() {return AnimaBrowsers.UA.search(/(Windows( )+Phone).*Trident/) >= 0},
    isWindows: function() {return AnimaBrowsers.UA.search(/Windows( )+NT/) >= 0},
    isLinux: function() {return AnimaBrowsers.UA.search(/(Debian|Ubuntu|X11.*Linux)/) >= 0},
    isMac: function() {return AnimaBrowsers.UA.search(/MAC( )+OS( )+X/) >= 0},
    isBlackBerry: function() {return AnimaBrowsers.UA.search(/BlackBerry/) >= 0},
    isChrome: function() {return AnimaBrowsers.UA.search(/Chrome/) >= 0},
    isIE: function() {return AnimaBrowsers.UA.search(/(MSIE (\d)+|Trident)/) >= 0},
    isIE10: function() {return AnimaBrowsers.UA.search(/MSIE (10|9).*Trident.+6/) >= 0},
    isIE11: function() {return AnimaBrowsers.UA.search(/Trident(.+)7/) >= 0},
    isFirefox: function() {return AnimaBrowsers.UA.search(/Firefox/) >= 0},
    isOperaMini: function() {return AnimaBrowsers.UA.search(/Opera( )+Mini/) >= 0},
    isOpera: function() {return AnimaBrowsers.UA.search(/Opera/) >= 0 && !AnimaBrowsers.isOperaMini()},
    isSafari: function() {return AnimaBrowsers.UA.search(/Safari/) >= 0 && !AnimaBrowsers.isChrome()}
};

(function () {
    if ( typeof window.Event === "function" || !AnimaBrowsers.isIE()) return false; //If not IE

    function CustomEvent(eventName, params) {
        params = params || {bubbles: false, cancelable: false, detail: undefined};
        var evt = document.createEvent('Event');
        evt.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();
