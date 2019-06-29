/*
 * Questo componente gestisce eventuale javascript nella pagina news e anche il mini componente nella home che
 * mostra le ultime news
 */
var AnimaNews = AnimaNews || {
    mininewscomponentID: "mininews",
    mininewscomponent: null,
    miniexists: false,
    news_minopacitypercent: 25,
    news_maxopacitypercent: 100,
    news_deltaopacity : 0,
    news_rootLink : "/pages/news.php?",
    deactiveNews: function() {
        var children = AnimaNews.mininewscomponent.getElementsByTagName('form')[0].getElementsByTagName("span");
        var stepOpacity = children.length === 1 ? AnimaNews.news_deltaopacity : AnimaNews.news_deltaopacity / (children.length-1);
        for(var i = 0; i < children.length; i++) {
            var child = children[i];
            if(child != null && child.isElement()) {
                child.animateOpacity(1, AnimationCurves.exponential, AnimaNews.news_maxopacitypercent - i*stepOpacity);
            }
        }
    },
    activeNews: function() {
        var children = AnimaNews.mininewscomponent.getElementsByTagName('form')[0].getElementsByTagName("span");
        for(var i = 0; i < children.length; i++) {
            var child = children[i];
            if(child != null && child.isElement()) {
                child.animateOpacity(1, AnimationCurves.exponential, AnimaNews.news_maxopacitypercent);
            }
        }
    },
    deactiveComponent : function() {
        if(!AnimaNews.miniexists)
            return;

        AnimaNews.mininewscomponent.animateOpacity(1, AnimationCurves.exponential, 75);
    },
    activeComponent : function() {
        if(!AnimaNews.miniexists)
            return;

        AnimaNews.mininewscomponent.animateOpacity(1, AnimationCurves.exponential, 100);
    },
    activeAll : function() {
        AnimaNews.activeComponent();
        AnimaNews.activeNews();
    },
    deactiveAll : function() {
        AnimaNews.deactiveComponent();
        AnimaNews.deactiveNews();
    },
    loadChildrenEvents: function (children) {
        for(var i = 0; i < children.length; i++) {
            var child = children[i];
            child.addEventListener('click', function() {AnimaNews.open_mininews_element(this)});
        }
    },
    _loadervariables: function() {
        AnimaNews.mininewscomponent = document.getElementById(AnimaNews.mininewscomponentID);
        AnimaNews.miniexists =  AnimaNews.mininewscomponent  != null;
        AnimaNews.news_deltaopacity = AnimaNews.news_maxopacitypercent - AnimaNews.news_minopacitypercent;
    },
    loadmininews : function() {
        AnimaNews._loadervariables();

        if(!AnimaNews.miniexists)
            return;

        AnimaNews.mininewscomponent.addEventListener('mouseenter', AnimaNews.activeAll);
        AnimaNews.mininewscomponent.addEventListener('mouseleave', AnimaNews.deactiveAll);
        AnimaNews.loadChildrenEvents(AnimaNews.mininewscomponent.getElementsByTagName('form')[0].getElementsByTagName("span"));
        AnimaNews.deactiveAll();
    },
    open_mininews_element : function(element) {
        if(element == null || !element.isElement() || !element.hasAttribute('anima-article-id'))
            return;

        var articleID = element.getAttribute('anima-article-id');
        var form = element.parentElement;

        var hiddens = form.getElementsByAttribute('type', 'hidden');
        if(hiddens.length === 1) {
            var inputData = hiddens[0];
            inputData.setAttribute('value', articleID);
            form.submit();
        } else {
            location.href="/pages/news.php";        // if error open archive
        }
    }
};