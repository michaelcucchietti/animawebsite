<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Anima - Coming soon</title>
    <meta name="description" content="Anima sta sviluppando soluzioni versatili e innovative dedicate alle imprese di ogni dimensione" />

    <script type="text/javascript" src="../js/base/utilityFramework.js"></script>
    <script type="text/javascript" src="../js/base/cssFramework.js"></script>
    <script type="text/javascript" src="../js/base/animationFramework.js"></script>
    <script type="text/javascript" src="../js/base/crossBrowserFramework.js"></script>
    <script type="text/javascript" src="../js/base/responsiveFramework.js"></script>
    <script type="text/javascript" src="../js/base/preloadFramework.js"></script>
    <script type="text/javascript" src="../js/scrollbar/scrollbar.js"></script>
    <script type="text/javascript" src="../js/detailsurfer/detailsurfer.js"></script>
    <script type="text/javascript" src="../js/IAnimaWebsite.js"></script>


    <link rel="stylesheet" type="text/css" href="../css/ArchStyles.css" />
    <link rel="stylesheet" type="text/css" href="../css/DesignStyles.css" />
    <link rel="stylesheet" type="text/css" href="../css/displaySupport.css" />
    <link rel="stylesheet" type="text/css" href="../css/Contents.css" />
    <link rel="stylesheet" type="text/css" href="../css/textcss.css" />
    <link rel="stylesheet" type="text/css" href="../css/scrollbar/scrollbar.css" />
    <link rel="stylesheet" type="text/css" href="../css/detailsurfer/detailsurfer.css" />


    <link rel='shortcut icon' type="image/x-icon" href="../favicon.ico" />

</head>
<body onload="AnimaLoader.loadComingSoon()">
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
    <section class="DefaultContainer SectionBlock" id="pagesection">

        <article class="ContentBlock AnimaComingSoon">
            <div class="data">
                <div class="videoContainer">
                    <video id="animaintro" loop autoplay muted="muted">
                        <source src="../videos/videoCS.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="textContainer">
                    <div class="surfer">
                        <div class="detailsurfer" slidetime="10000">
                            <div class="contentContainer">
                                <div class="content">
                                    <div class="articles">
                                        <div class="article">
                                            <h3>VIRTUAL MACHINES</h3>
                                            <p>
                                                Risparmia in spazio, costi fissi e corrente, lavora da dove vuoi tu, con tutta la potenza di cui necessiti.
                                            </p>
                                        </div>
                                        <div class="article">
                                            <h3>MODULAR TECHNOLOGY</h3>
                                            <p>
                                                In via di sviluppo una tecnologia modulare, flessibile, scalabile, sicura e affidabile, con la quale
                                                potrai potenziare la tua attivit&agrave; sotto ogni aspetto.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="navbar">
                                <div class="navigator">
                                </div>
                            </div>
                        </div>
                    </div>
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
</div>

</body>
</html>
