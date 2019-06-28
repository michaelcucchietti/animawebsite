<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Anima - News</title>
    <meta name="description" content="Tieniti aggiornato sulle ultime pubblicazioni Anima" />

    <script type="text/javascript" src="../js/base/utilityFramework.js"></script>
    <script type="text/javascript" src="../js/base/cssFramework.js"></script>
    <script type="text/javascript" src="../js/base/animationFramework.js"></script>
    <script type="text/javascript" src="../js/base/crossBrowserFramework.js"></script>
    <script type="text/javascript" src="../js/base/responsiveFramework.js"></script>
    <script type="text/javascript" src="../js/base/preloadFramework.js"></script>
    <script type="text/javascript" src="../js/scrollbar/scrollbar.js"></script>
    <script type="text/javascript" src="../js/IAnimaWebsite.js"></script>
    <script type="text/javascript" src="../js/news/news.js"></script>


    <link rel="stylesheet" type="text/css" href="../css/ArchStyles.css" />
    <link rel="stylesheet" type="text/css" href="../css/DesignStyles.css" />
    <link rel="stylesheet" type="text/css" href="../css/displaySupport.css" />
    <link rel="stylesheet" type="text/css" href="../css/Contents.css" />
    <link rel="stylesheet" type="text/css" href="../css/textcss.css" />
    <link rel="stylesheet" type="text/css" href="../css/scrollbar/scrollbar.css" />
    <link rel="stylesheet" type="text/css" href="../css/news/news.css" />



    <link rel='shortcut icon' type="image/x-icon" href="../favicon.ico" />

</head>
<body onload="AnimaLoader.loadHome()">
<div class="DefaultContainer LoadingBlock" id="progress">
    <video id="loadingvideo" loop autoplay muted="muted">
        <source src="../videos/loading.mp4" type="video/mp4">
    </video>
</div>
<div class="MenuBar displayFlexSmartphone" id="menuBar_smartphone">
    <a class="MenuButton"></a>
    <nav class="MenuEntries">
        <a class="MenuEntry" link-id="home" onclick="AnimaSections.open(this)">Home</a>
        <a class="MenuEntry" link-id="digitals" onclick="AnimaSections.open(this)">Digitals</a>
        <a class="MenuEntry" link-id="logostudio" onclick="AnimaSections.open(this)">Logo Studio</a>
        <a class="MenuEntry" link-id="comingsoon" onclick="AnimaSections.open(this)">Coming Soon</a>
    </nav>
</div>
<div class="MenuBar displayFlexDesktop" id="menuBar_desktop">
    <a class="MenuButton">
        <div class="child"><div class="icon"></div> </div>
    </a>
    <nav class="MenuEntries displayNone">
        <a class="MenuEntry" link-id="home" onclick="AnimaSections.open(this)">
            <div class="aligner">
                <div class="icon">
                    <div class="media about" ></div>
                </div>
            </div>

            <div class="text">Home</div>
        </a>
        <a class="MenuEntry" link-id="digitals" onclick="AnimaSections.open(this)">
            <div class="aligner">
                <div class="icon">
                    <div class="media digitals" ></div>
                </div>
            </div>

            <div class="text">Digitals</div>
        </a>
        <a class="MenuEntry" link-id="logostudio" onclick="AnimaSections.open(this)">
            <div class="aligner">
                <div class="icon">
                    <div class="media logostudio" ></div>
                </div>
            </div>

            <div class="text">Logo Studio</div>
        </a>
        <a class="MenuEntry" link-id="comingsoon" onclick="AnimaSections.open(this)">
            <div class="aligner">
                <div class="icon">
                    <div class="media cs" ></div>
                </div>
            </div>

            <div class="text">Coming Soon</div>
        </a>
    </nav>
</div>
<div class="scrollbar">
    <div class="wider">
        <div class="seeker"></div>
    </div>
</div>
<div class="DefaultContainer SectionsContainer" id="sectionContainer">
    <section class="DefaultContainer SectionBlock" id="pagesection">
        <?php
            if(count($_GET) == 0) {
                include "news/articles.php";
            } else {
                include "news/article.php";
            }
        ?>

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
</div>

</body>
</html>