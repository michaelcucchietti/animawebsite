/**
 * Created by Michael on 7/13/2018.
 */
var IDTestMobile;

function initResponsiveCheck(IDMobileTest) {
    IDTestMobile = IDMobileTest;
}

function isMobile() {
    // controlla se un oggetto che visibile solo per cellulari sia visibile
    var testingObj = document.getElementById(IDTestMobile);
    if(!AnimaUtility.isElement(testingObj))
        return false;

    return testingObj.getStyle("display") !== "none";
}
function isLandscape() {
    var clientWidth = window.innerWidth || document.documentElement.clientWidth || (document.getElementsByTagName("body")[0]).clientWidth,
        clientHeight = window.innerHeight || document.documentElement.clientHeight || (document.getElementsByTagName("body")[0]).clientHeight;
    var larger = clientWidth > clientHeight;
    return isMobile() && larger;
}
function isPortrait() {
    return isMobile() && !isLandscape();
}
function isTouch() {
    return (document.documentElement != null && typeof document.documentElement !== 'undefined' && 'ontouchstart' in document.documentElement);
}

var onLandscapeEvent, onPortraitEvent;
if(!AnimaBrowsers.isIE()) {
    onLandscapeEvent = new CustomEvent('landscapeMode');
    onPortraitEvent = new CustomEvent('portraitMode');
    window.addEventListener("resize", function() {
        if(isLandscape())
            this.dispatchEvent(onLandscapeEvent);
        else if(isPortrait())
            this.dispatchEvent(onPortraitEvent);
    });
} else {
    // IE 11 working code
    onLandscapeEvent = new CustomEvent('landscapeMode');
    onPortraitEvent = new CustomEvent('portraitMode');
    window.addEventListener("resize", function() {
        if(isLandscape())
            this.dispatchEvent(onLandscapeEvent);
        else if(isPortrait())
            this.dispatchEvent(onPortraitEvent);
    });
}

