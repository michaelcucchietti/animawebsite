<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Anima - Get in touch</title>
    <meta name="description" content="Resta in contatto con Anima attraverso canali di comunicazione multipli" />

    <script type="text/javascript" src="../js/base/utilityFramework.js"></script>
    <script type="text/javascript" src="../js/base/cssFramework.js"></script>
    <script type="text/javascript" src="../js/base/animationFramework.js"></script>
    <script type="text/javascript" src="../js/base/crossBrowserFramework.js"></script>
    <script type="text/javascript" src="../js/base/responsiveFramework.js"></script>
    <script type="text/javascript" src="../js/base/preloadFramework.js"></script>
    <script type="text/javascript" src="../js/scrollbar/scrollbar.js"></script>
    <script type="text/javascript" src="../js/IAnimaWebsite.js"></script>


    <link rel="stylesheet" type="text/css" href="../css/ArchStyles.css" />
    <link rel="stylesheet" type="text/css" href="../css/DesignStyles.css" />
    <link rel="stylesheet" type="text/css" href="../css/displaySupport.css" />
    <link rel="stylesheet" type="text/css" href="../css/Contents.css" />
    <link rel="stylesheet" type="text/css" href="../css/textcss.css" />
    <link rel="stylesheet" type="text/css" href="../css/scrollbar/scrollbar.css" />


    <link rel='shortcut icon' type="image/x-icon" href="../favicon.ico" />

</head>
<body onload="AnimaLoader.loadContacts()">
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
        <article class="ContentBlock contentContacts" animasource="../images/contacts/contact.jpg">
            <div class="data dataCenterCenter">
                <div class="headerdiv">
                    <p>
                        Vuoi sapere di pi&ugrave;?<br />
                        Contattaci adesso.
                    </p>
                </div>
                <div class="middlediv">
                    <div class="container">
                        <div class="iconbox">
                            <div class="icon email" animasource="../images/contacts/items/email.png"></div>
                            <div class="caption"><p>info@inside-anima.com</p></div>
                        </div>
                        <div class="iconbox">
                            <div class="icon whatsapp" animasource="../images/contacts/items/whatsapp.png"></div>
                            <div class="caption"><p>391 4783052</p></div>
                        </div>
                        <a class="iconbox linkbox" href="https://www.instagram.com/logostudio.anima/?hl=it">
                            <div class="icon instagram" animasource="../images/contacts/items/instagram-circle.png;../images/contacts/items/instagram-icon.png">
                                <div class="circle" onmouseenter="(new Animations.AnimationRotate(this, 0.5, AnimationCurves.exponential, 'z', 360)).start()" onmouseleave="(new Animations.AnimationRotate(this, 0.5, AnimationCurves.exponential, 'z', -360)).start()"></div>
                            </div>
                            <div class="caption"><p>logostudio.anima</p></div>
                        </a>
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
