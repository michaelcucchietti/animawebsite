<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Anima - Design & Communication</title>
    <meta name="description" content="In un mondo che corre verso il digitale, Anima offre supporto, strumenti e metodi a imprese e professionisti di ogni settore, per l'immagine e la comunicazione aziendale." />

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
    <link rel="stylesheet" type="text/css" href="../css/news/mininewscomponent.css" />



    <link rel='shortcut icon' type="image/x-icon" href="../favicon.ico" />

</head>
<body onload="AnimaLoader.loadHome()">
<div class="DefaultContainer LoadingBlock" id="progress">
    <video id="loadingvideo" loop autoplay muted="muted">
        <source src="../videos/loading.mp4" type="video/mp4">
    </video>
</div>
<?php
    require "menuitems.php";
?>
<div class="scrollbar">
    <div class="wider">
        <div class="seeker"></div>
    </div>
</div>
<div class="DefaultContainer SectionsContainer" id="sectionContainer">
    <section class="DefaultContainer SectionBlock" id="pagesection">
        <article class="ContentBlock contentAbout" >
            <div class="newscomponent whiteText" id="mininews">
                <span class="articleTitle">ultimi articoli</span>
                <?php
                    include "news/mininews.php";
                    $mini = new MiniNews();
                    echo $mini->getHTML();
                ?>
            </div>
            <div class="data">
                <div class="contentAnima"  >
                    <div class="writing" >

                    </div>
                </div>
                <h2 class="dataCenterCenter">
                    In un mondo che corre verso il digitale, Anima &egrave; una nuova realt&agrave;, tutta italiana, che offre supporto, strumenti e metodi a imprese e professionisti di ogni settore.
                </h2>
                <div id="downArrowAbout arrow" ></div>
            </div>
        </article>
        <article class="ContentBlock contentAboutDescription">
            <h1 anima-id="title">I servizi Anima</h1>
            <div class="data dataTopCenter">
                <div class="indexBox">
                    <div class="servicesEntry" anima-target="serviceLS">
                        <div class="text">Logo Studio</div>
                        <div class="underline"></div>
                    </div>
                    <div class="servicesEntry" anima-target="serviceUpgrade">
                        <div class="text">Upgrade</div>
                        <div class="underline"></div>
                    </div>
                    <div class="servicesEntry" anima-target="serviceDigitals">
                        <div class="text">Digitals</div>
                        <div class="underline"></div>
                    </div>
                    <div class="servicesEntry" anima-target="serviceDKit">
                        <div class="text">Digital kit</div>
                        <div class="underline"></div>
                    </div>
                </div>
                <div class="separatorServices"></div>
                <div class="contents">
                    <div class="target" anima-id="default">
                        <p>
                            Selezionare una voce per visualizzare maggiori dettagli.
                        </p>
                    </div>
                    <div class="target displayNone" anima-id="serviceLS">
                        <p>
                            Crea il tuo nuovo logo o effettua il restyling di quello attuale,
                            segui passo dopo passo lo sviluppo grafico e scopri come un logo
                            vincente può fare la differenza.
                        </p>
                        <a class="LSPortfolio" link-id="portfolio" onclick="AnimaSections.open(this)">Apri portfolio</a>
                    </div>
                    <div class="target displayNone" anima-id="serviceUpgrade">
                        <p>
                            Potenzia il tuo logo, rendendolo responsive e aumentandone l'efficacia con
                            speciali varianti create su misura per te.
                        </p>

                    </div>
                    <div class="target displayNone" anima-id="serviceDigitals">
                        <p>
                            Anima ti aiuta a migliorare la tua comunicazione digitale attraverso
                            l'utilizzo dei giusti contenuti visivi e testuali,
                            sia web che social, affiancandoti nella programmazione
                            di un piano editoriale efficace.
                        </p>

                    </div>
                    <div class="target displayNone" anima-id="serviceDKit">
                        <p>
                            Migliora la tua immagine completando il tuo corredo aziendale
                            con grafiche dedicate al web e per la stampa.
                        </p>
                    </div>

                </div>
            </div>
        </article>
        <article class="ContentBlock contentBeDigital" >
            <div class="data dataBottomLeft">
                <h1 class="dataCenterLeft">Be digital.</h1>
                <h2 class="dataCenterLeft">
                    <span>Anima ha l'obiettivo di dare supporto reale all'innovazione,</span>
                    <span>all'immagine e alla comunicazione digitale della tua azienda,</span>
                    <span>all'interno di un sistema pensato per evolversi</span>
                    <span>e dare forza alle tue idee.</span>
                </h2>
            </div>
        </article>
        <article class="ContentBlock contentAboutDescription">
            <h1 anima-id="title">Perch&eacute; Anima</h1>
            <div class="data dataTopCenter">
                <div class="contents">
                    <div class="target" anima-id="default">
                        Selezionare una voce a lato per visualizzare maggiori dettagli.
                    </div>
                    <div class="target displayNone" anima-id="causeService">
                        <p>
                            Anima si pone l'obiettivo di offrire un servizio in grado di generare
                            risultato, ponendo l'attenzione sui dettagli e sui dati misurabili,
                            da cui partire per garantire un servizio di alta qualità e su misura
                            per le tue esigenze.
                        </p>
                    </div>
                    <div class="target displayNone" anima-id="causeIdentity">
                        <p>
                            Anima è una realtà in crescita, moderna e fortemente proiettata al
                            futuro, con l'obiettivo di rappresentare un punto di riferimento
                            per l'innovazione digitale delle aziende.
                        </p>
                    </div>
                    <div class="target displayNone" anima-id="causePeople">
                        <p>
                            Ogni realtà imprenditoriale di successo nasce da un‘idea. Per questo
                            motivo Anima sceglie di mettere le persone al centro, per
                            valorizzarne le idee e i sogni.
                        </p>
                    </div>
                    <div class="target displayNone" anima-id="causeDirectContact">
                        <p>
                            Anima crede nel valore dei rapporti interpersonali e ti garantisce
                            un servizio trasparente, individuando un referente unico con cui
                            potrai avere in qualsiasi momento un confronto diretto.
                        </p>
                    </div>
                </div>
                <div class="separatorServices"></div>
                <div class="indexBox">
                    <div class="servicesEntry" anima-target="causeService">
                        <div class="text">Servizio</div>
                        <div class="underline"></div>
                    </div>
                    <div class="servicesEntry" anima-target="causeIdentity">
                        <div class="text">Identità</div>
                        <div class="underline"></div>
                    </div>
                    <div class="servicesEntry" anima-target="causePeople">
                        <div class="text">Persone</div>
                        <div class="underline"></div>
                    </div>
                    <div class="servicesEntry" anima-target="causeDirectContact">
                        <div class="text">Contatto diretto</div>
                        <div class="underline"></div>
                    </div>
                </div>
            </div>
        </article>
        <article class="ContentBlock contentDream" >
            <div class="data dataBottomRight">
                <h1 class="dataCenterRight">dream.</h1>
                <h2 class="dataCenterRight">
                        <span class="displayBlockDesktop">
                            Tutti sognano un mondo migliore per s&eacute; e per chi si ama.
                        </span>
                    <span class="displayBlockDesktop">
                            Dai valore ai tuoi sogni, scegli Anima.
                        </span>

                    <span class="displayBlockSmartphone">
                            Tutti sognano un mondo migliore<br />
                            per s&eacute; e per chi si ama.
                        </span>
                    <span class="displayBlockSmartphone">
                            Dai valore ai tuoi sogni,<br/>
                            scegli Anima.
                        </span>

                    <button class="info" link-id="contacts" onclick="AnimaSections.open(this)">+ info</button>
                </h2>
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
