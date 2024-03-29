<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Anima - Portfolio</title>
    <meta name="description" content="Dai uno sguardo ai loghi targati Anima" />

    <script type="text/javascript" src="../js/base/utilityFramework.js"></script>
    <script type="text/javascript" src="../js/base/cssFramework.js"></script>
    <script type="text/javascript" src="../js/base/animationFramework.js"></script>
    <script type="text/javascript" src="../js/base/crossBrowserFramework.js"></script>
    <script type="text/javascript" src="../js/base/responsiveFramework.js"></script>
    <script type="text/javascript" src="../js/base/preloadFramework.js"></script>
    <script type="text/javascript" src="../js/scrollbar/scrollbar.js"></script>
    <script type="text/javascript" src="../js/portfolio/portfolio.js"></script>
    <script type="text/javascript" src="../js/IAnimaWebsite.js"></script>


    <link rel="stylesheet" type="text/css" href="../css/ArchStyles.css" />
    <link rel="stylesheet" type="text/css" href="../css/DesignStyles.css" />
    <link rel="stylesheet" type="text/css" href="../css/displaySupport.css" />
    <link rel="stylesheet" type="text/css" href="../css/Contents.css" />
    <link rel="stylesheet" type="text/css" href="../css/textcss.css" />
    <link rel="stylesheet" type="text/css" href="../css/portfolio/portfolio.css" />
    <link rel="stylesheet" type="text/css" href="../css/scrollbar/scrollbar.css" />


    <link rel='shortcut icon' type="image/x-icon" href="../favicon.ico" />

</head>
<body onload="AnimaLoader.loadPortfolio()">
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
    <section class="DefaultContainer SectionBlock Portfolio" id="pagesection" anima-id="portfolioSection">
        <div class="data dataCenterCenter" anima-id="portfolioContent">
            <article class="ContentBlock contentPortfolioPreviews">
                <div class="data dataTopCenter">
                    <h1>Portfolio.</h1>
                    <h2>Dai uno sguardo ai loghi targati Anima!</h2>
                    <div class="previews">
                        <div class="preview" animasource="../images/portfolio/neozone.jpg" anima-target="neozone">
                            <div class="image logoNeozone"></div>
                            <div class="layer">
                                <button>Galleria</button>
                            </div>
                        </div>
                        <div class="preview" animasource="../images/portfolio/roxana.jpg" anima-target="roxana">
                            <div class="image logoRoxana"></div>
                            <div class="layer">
                                <button>Galleria</button>
                            </div>
                        </div>
                        <div class="preview" animasource="../images/portfolio/smash.jpg" anima-target="smash">
                            <div class="image logoSmash"></div>
                            <div class="layer">
                                <button>Galleria</button>
                            </div>
                        </div>
                        <div class="preview" animasource="../images/portfolio/plastix.jpg" anima-target="plastix">
                            <div class="image logoPlastix"></div>
                            <div class="layer">
                                <button>Galleria</button>
                            </div>
                        </div>
                        <div class="preview" animasource="../images/portfolio/bowlinghost.jpg" anima-target="bowlinghost">
                            <div class="image logoBowlinghost"></div>
                            <div class="layer">
                                <button>Galleria</button>
                            </div>
                        </div>
                        <div class="preview" animasource="../images/portfolio/E2.jpg" anima-target="E2">
                            <div class="image logoE2"></div>
                            <div class="layer">
                                <button>Galleria</button>
                            </div>
                        </div>
                        <div class="preview" animasource="../images/portfolio/digipix.jpg" anima-target="digipix">
                            <div class="image logoDigipix"></div>
                            <div class="layer">
                                <button>Galleria</button>
                            </div>
                        </div>
                        <div class="preview" animasource="../images/portfolio/geon.jpg" anima-target="geon">
                            <div class="image logoGeon"></div>
                            <div class="layer">
                                <button>Galleria</button>
                            </div>
                        </div>
                        <div class="preview" animasource="../images/portfolio/memini.jpg" anima-target="memini">
                            <div class="image logoMemini"></div>
                            <div class="layer">
                                <button>Galleria</button>
                            </div>
                        </div>
                        <div class="preview" animasource="../images/portfolio/nautilus.jpg" anima-target="nautilus">
                            <div class="image logoNautilus"></div>
                            <div class="layer">
                                <button>Galleria</button>
                            </div>
                        </div>
                        <div class="preview" animasource="../images/portfolio/safi.jpg" anima-target="safi">
                            <div class="image logoSafi"></div>
                            <div class="layer">
                                <button>Galleria</button>
                            </div>
                        </div>
                        <div class="preview" animasource="../images/portfolio/milli.jpg" anima-target="milli">
                            <div class="image logoMilli"></div>
                            <div class="layer">
                                <button>Galleria</button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <article class="ContentBlock contentPortfolioGallery">
                <div class="data dataTopCenter">
                    <div class="goBackPreviews displayNone">
                        <div class="arrow"></div>
                        <div class="text">Torna alle anteprime</div>
                    </div>
                    <div class="gallery displayNone" anima-id="neozone">
                        <div class="slider">
                            <div class="controls">
                                <div class="goLeft"></div>
                                <div class="goRight"></div>
                                <div class="counter"></div>
                            </div>
                            <div class="images">
                                <div class="sliderImage neozone000" animasource="../images/portfolio/neozone/000.png"></div>
                                <div class="sliderImage neozone001" animasource="../images/portfolio/neozone/001.png"></div>
                                <div class="sliderImage neozone002" animasource="../images/portfolio/neozone/002.png"></div>
                            </div>

                        </div>
                        <div class="didascalia">
                            <p>Logo dai colori e dalle forme giovanili, pensato per un'attività di fantasia che opera nel settore dell'intrattenimento in modo innovativo.</p>
                        </div>
                    </div>
                    <div class="gallery displayNone" anima-id="roxana">
                        <div class="slider">
                            <div class="controls">
                                <div class="goLeft"></div>
                                <div class="goRight"></div>
                                <div class="counter"></div>
                            </div>
                            <div class="images">
                                <div class="sliderImage roxana000" animasource="../images/portfolio/roxana/000.png"></div>
                                <div class="sliderImage roxana001" animasource="../images/portfolio/roxana/001.png"></div>
                                <div class="sliderImage roxana002" animasource="../images/portfolio/roxana/002.jpg"></div>
                            </div>

                        </div>
                        <div class="didascalia">
                            <p>Logo studiato per un'attività commerciale di prodotti legati alla cosmetica. Il pittogramma riprende le linee di un rossetto visto dall'alto.</p>
                        </div>
                    </div>
                    <div class="gallery displayNone" anima-id="smash">
                        <div class="slider">
                            <div class="controls">
                                <div class="goLeft"></div>
                                <div class="goRight"></div>
                                <div class="counter"></div>
                            </div>
                            <div class="images">
                                <div class="sliderImage smash000" animasource="../images/portfolio/smash/000.png"></div>
                                <div class="sliderImage smash001" animasource="../images/portfolio/smash/001.png"></div>
                                <div class="sliderImage smash002" animasource="../images/portfolio/smash/002.png"></div>
                            </div>

                        </div>
                        <div class="didascalia">
                            <p>Immaginaria attività di abbigliamento sportivo, dotta di logo sviluppato in "family brand" per differenziare i prodotti dedicati a sport di diversa natura.</p>
                        </div>
                    </div>
                    <div class="gallery displayNone" anima-id="plastix">
                        <div class="slider">
                            <div class="controls">
                                <div class="goLeft"></div>
                                <div class="goRight"></div>
                                <div class="counter"></div>
                            </div>
                            <div class="images">
                                <div class="sliderImage plastix000" animasource="../images/portfolio/plastix/000.png"></div>
                                <div class="sliderImage plastix001" animasource="../images/portfolio/plastix/001.png"></div>
                                <div class="sliderImage plastix002" animasource="../images/portfolio/plastix/002.png"></div>
                            </div>

                        </div>
                        <div class="didascalia">
                            <p>Logo pensato per un'attività di fantasia che si occupa di produzione e lavorazione di materie plastiche, richiamando concetti di rapidità e personalizzazione di servizio.</p>
                        </div>
                    </div>
                    <div class="gallery displayNone" anima-id="bowlinghost">
                        <div class="slider">
                            <div class="controls">
                                <div class="goLeft"></div>
                                <div class="goRight"></div>
                                <div class="counter"></div>
                            </div>
                            <div class="images">
                                <div class="sliderImage bowlinghost000" animasource="../images/portfolio/bowlinghost/000.png"></div>
                                <div class="sliderImage bowlinghost001" animasource="../images/portfolio/bowlinghost/001.png"></div>
                                <div class="sliderImage bowlinghost002" animasource="../images/portfolio/bowlinghost/002.png"></div>
                            </div>

                        </div>
                        <div class="didascalia">
                            <p>Logo realizzato per un'attività di intrattenimento e che sottolinea l'identità del brand e l' attività ludica di punta.</p>
                        </div>
                    </div>
                    <div class="gallery displayNone" anima-id="digipix">
                        <div class="slider">
                            <div class="controls">
                                <div class="goLeft"></div>
                                <div class="goRight"></div>
                                <div class="counter"></div>
                            </div>
                            <div class="images">
                                <div class="sliderImage digipix000" animasource="../images/portfolio/digipix/000.png"></div>
                                <div class="sliderImage digipix001" animasource="../images/portfolio/digipix/001.png"></div>
                                <div class="sliderImage digipix002" animasource="../images/portfolio/digipix/002.png"></div>
                            </div>

                        </div>
                        <div class="didascalia">
                            <p>Logo pensato per un'attività immaginaria che opera nel settore fotografico e digitali. Logotipo e pittogramma sono studiati per essere identificativi anche separatamente.</p>
                        </div>
                    </div>
                    <div class="gallery displayNone" anima-id="E2">
                        <div class="slider">
                            <div class="controls">
                                <div class="goLeft"></div>
                                <div class="goRight"></div>
                                <div class="counter"></div>
                            </div>
                            <div class="images">
                                <div class="sliderImage E2000" animasource="../images/portfolio/E2/000.png"></div>
                                <div class="sliderImage E2001" animasource="../images/portfolio/E2/001.png"></div>
                                <div class="sliderImage E2002" animasource="../images/portfolio/E2/002.png"></div>
                            </div>

                        </div>
                        <div class="didascalia">
                            <p>Logo realizzato per un salone da parrucchiere che combina due "E" specchiate che vicine evidenziano il numero "2" nello spazio negativo.</p>
                        </div>
                    </div>
                    <div class="gallery displayNone" anima-id="geon">
                        <div class="slider">
                            <div class="controls">
                                <div class="goLeft"></div>
                                <div class="goRight"></div>
                                <div class="counter"></div>
                            </div>
                            <div class="images">
                                <div class="sliderImage geon000" animasource="../images/portfolio/geon/000.png"></div>
                                <div class="sliderImage geon001" animasource="../images/portfolio/geon/001.png"></div>
                                <div class="sliderImage geon002" animasource="../images/portfolio/geon/002.png"></div>
                            </div>

                        </div>
                        <div class="didascalia">
                            <p>Logo di fantasia, realizzato per un museo itinerante dai contenuti prevalentemente archeologici, da cui lo studio del pittogramma.</p>
                        </div>
                    </div>
                    <div class="gallery displayNone" anima-id="memini">
                        <div class="slider">
                            <div class="controls">
                                <div class="goLeft"></div>
                                <div class="goRight"></div>
                                <div class="counter"></div>
                            </div>
                            <div class="images">
                                <div class="sliderImage memini000" animasource="../images/portfolio/memini/000.png"></div>
                                <div class="sliderImage memini001" animasource="../images/portfolio/memini/001.jpg"></div>
                                <div class="sliderImage memini002" animasource="../images/portfolio/memini/002.png"></div>
                            </div>

                        </div>
                        <div class="didascalia">
                            <p>Logo realizzato per un'attività di catering e organizzazione di eventi aziendali attraverso la ripetizione delle singole forme e la loro combinazione. Esempio di logo responsive.</p>
                        </div>
                    </div>
                    <div class="gallery displayNone" anima-id="nautilus">
                        <div class="slider">
                            <div class="controls">
                                <div class="goLeft"></div>
                                <div class="goRight"></div>
                                <div class="counter"></div>
                            </div>
                            <div class="images">
                                <div class="sliderImage nautilus000" animasource="../images/portfolio/nautilus/000.png"></div>
                                <div class="sliderImage nautilus001" animasource="../images/portfolio/nautilus/001.png"></div>
                                <div class="sliderImage nautilus002" animasource="../images/portfolio/nautilus/002.png"></div>
                            </div>

                        </div>
                        <div class="didascalia">
                            <p>Logo pensato per un'accademia nautica e dotato di un pittogramma che ricorda la rosa dei venti e un timone stilizzato e che nasconde una freccia che punta a nord-est.</p>
                        </div>
                    </div>
                    <div class="gallery displayNone" anima-id="safi">
                        <div class="slider">
                            <div class="controls">
                                <div class="goLeft"></div>
                                <div class="goRight"></div>
                                <div class="counter"></div>
                            </div>
                            <div class="images">
                                <div class="sliderImage safi000" animasource="../images/portfolio/safi/000.png"></div>
                                <div class="sliderImage safi001" animasource="../images/portfolio/safi/001.png"></div>
                                <div class="sliderImage safi002" animasource="../images/portfolio/safi/002.png"></div>
                            </div>

                        </div>
                        <div class="didascalia">
                            <p>Logo pensato per un'impresa di pulizie che offre tre servizi principali e mira a distinguersi per la qualità del servizio, richiamando una cura dell'ambiente e del dettaglio prettamente femminili.</p>
                        </div>
                    </div>
                    <div class="gallery displayNone" anima-id="milli">
                        <div class="slider">
                            <div class="controls">
                                <div class="goLeft"></div>
                                <div class="goRight"></div>
                                <div class="counter"></div>
                            </div>
                            <div class="images">
                                <div class="sliderImage milli000" animasource="../images/portfolio/milli/000.png"></div>
                                <div class="sliderImage milli001" animasource="../images/portfolio/milli/001.png"></div>
                                <div class="sliderImage milli002" animasource="../images/portfolio/milli/002.png"></div>
                            </div>

                        </div>
                        <div class="didascalia">
                            <p>Logo di fantasia privo di pittogramma, realizzato per una boutique multimarca specializzata in abbigliamento per donna, ma anche con una sezione "per lui".</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
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
