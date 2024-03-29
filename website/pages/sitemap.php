<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Anima - Sitemap</title>
    <meta name="description" content="Non perderti neanche un'informazione, utilizza la nostra sitemap per navigare nel sito Anima con velocità e comodamente" />

    <script type="text/javascript" src="../js/base/utilityFramework.js"></script>
    <script type="text/javascript" src="../js/base/cssFramework.js"></script>
    <script type="text/javascript" src="../js/base/animationFramework.js"></script>
    <script type="text/javascript" src="../js/base/crossBrowserFramework.js"></script>
    <script type="text/javascript" src="../js/base/responsiveFramework.js"></script>
    <script type="text/javascript" src="../js/base/preloadFramework.js"></script>
    <script type="text/javascript" src="../js/scrollbar/scrollbar.js"></script>
    <script type="text/javascript" src="../js/sitemap/sitemap.js"></script>
    <script type="text/javascript" src="../js/IAnimaWebsite.js"></script>


    <link rel="stylesheet" type="text/css" href="../css/ArchStyles.css" />
    <link rel="stylesheet" type="text/css" href="../css/DesignStyles.css" />
    <link rel="stylesheet" type="text/css" href="../css/displaySupport.css" />
    <link rel="stylesheet" type="text/css" href="../css/Contents.css" />
    <link rel="stylesheet" type="text/css" href="../css/textcss.css" />
    <link rel="stylesheet" type="text/css" href="../css/scrollbar/scrollbar.css" />
    <link rel="stylesheet" type="text/css" href="../css/sitemap/sitemap.css" />


    <link rel='shortcut icon' type="image/x-icon" href="../favicon.ico" />

</head>
<body onload="AnimaLoader.loadSitemap()">
<div class="DefaultContainer LoadingBlock" id="progress">
    <video id="loadingvideo" loop autoplay muted="muted">
        <source src="../videos/loading.mp4" type="video/mp4">
    </video>
</div>
<?php
    require "menuitems.php";
    echo (new SmartphoneMenu())->getHTML();
    echo (new DesktopMenu())->getHTML();
    ?>
<div class="scrollbar">
    <div class="wider">
        <div class="seeker"></div>
    </div>
</div>
<div class="DefaultContainer SectionsContainer" id="sectionContainer">
    <section class="DefaultContainer SectionBlock" id="pagesection" anima-id="sitemap">
        <article class="ContentBlock contentSiteMap">
            <div class="data">
                <div class="controls">
                    <div class="control" id="sitemapBackButton">
                        <div class="icon back" animasource="../images/sitemap/leftArrow.png"></div>
                        <span class="text">Indietro</span>
                    </div>
                    <div class="control" id="sitemapParentButton">
                        <div class="icon parent" animasource="../images/sitemap/upArrow.png"></div>
                        <span class="text">Livello superiore</span>
                    </div>
                    <div class="control" id="sitemapLinkButton">
                        <div class="icon link" animasource="../images/sitemap/link.png"></div>
                        <span class="text">Apri link</span>
                    </div>
                </div>
                <h2 anima-id="name"></h2>
                <p class="description" anima-id="description"></p>
                <div class="leavesBox" anima-id="leavesBox">

                </div>
            </div>
        </article>

        <footer class="contentAntracite">
            <div class="container links">
                <a link-id="contacts" onclick="AnimaSections.open(this)">Contatti</a>
                <a link-id="sitemap" onclick="AnimaSections.open(this)">Mappa del sito</a>
            </div>
            <div class="separatorFooter"></div>
            <div class="container anima">
                <div class="logo"></div>
            </div>
            <div class="separatorFooter"></div>
            <div class="container info">
                <p>
                    Official Anima Website - developed by Anima<br />
                    p.iva 10774500960<br />
                    Via Legnano 18, Bollate, 20021 MI
                </p>
            </div>
        </footer>
    </section>


    <div class="displayNone" anima-sitemap-type="root">
        <div anima-node-type="name">Menu</div>
        <div anima-node-type="description">Contiene i link alle sezioni principali</div>
        <div anima-node-type="children">
            <div anima-sitemap-type="node">
                <div anima-node-type="name">Home</div>
                <div anima-node-type="description">Contiene informazioni generali su Anima</div>
                <div anima-node-type="link">home</div>
                <div anima-node-type="children">
                    <div anima-sitemap-type="node">
                        <div anima-node-type="name">Portfolio loghi</div>
                        <div anima-node-type="link">portfolio</div>
                        <div anima-node-type="description">Galleria di loghi a marchio Anima</div>
                    </div>
                    <div anima-sitemap-type="node">
                        <div anima-node-type="name">Contatti</div>
                        <div anima-node-type="link">contacts</div>
                        <div anima-node-type="description">Contiene le informazioni necessarie a contattare Anima</div>
                    </div>
                </div>
            </div>
            <div anima-sitemap-type="node">
                <div anima-node-type="name">Digitals</div>
                <div anima-node-type="description">Contiene informazioni sul servizio Digitals</div>
                <div anima-node-type="link">digitals</div>
                <div anima-node-type="children">
                    <div anima-sitemap-type="node">
                        <div anima-node-type="name">Contatti</div>
                        <div anima-node-type="link">contacts</div>
                        <div anima-node-type="description">Contiene le informazioni necessarie a contattare Anima</div>
                    </div>
                </div>
            </div>
            <div anima-sitemap-type="node">
                <div anima-node-type="name">Logo Studio</div>
                <div anima-node-type="description">Contiene informazioni sul servizio LogoStudio</div>
                <div anima-node-type="link">logostudio</div>
                <div anima-node-type="children">
                    <div anima-sitemap-type="node">
                        <div anima-node-type="name">Portfolio loghi</div>
                        <div anima-node-type="link">portfolio</div>
                        <div anima-node-type="description">Galleria di loghi a marchio Anima</div>
                    </div>
                    <div anima-sitemap-type="node">
                        <div anima-node-type="name">Contatti</div>
                        <div anima-node-type="link">contacts</div>
                        <div anima-node-type="description">Contiene le informazioni necessarie a contattare Anima</div>
                    </div>
                </div>
            </div>
            <div anima-sitemap-type="node">
                <div anima-node-type="name">Coming Soon</div>
                <div anima-node-type="description">Contiene le prossime novità a marchio Anima</div>
                <div anima-node-type="link">comingsoon</div>
                <div anima-node-type="children">
                    <div anima-sitemap-type="node">
                        <div anima-node-type="name">Contatti</div>
                        <div anima-node-type="link">contacts</div>
                        <div anima-node-type="description">Contiene le informazioni necessarie a contattare Anima</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>
