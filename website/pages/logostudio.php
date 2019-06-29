<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Anima - LogoStudio</title>
    <meta name="description" content="Scopri come distinguerti e avere successo con un logo unico, scalabile e responsive!" />

    <script type="text/javascript" src="../js/base/utilityFramework.js"></script>
    <script type="text/javascript" src="../js/base/cssFramework.js"></script>
    <script type="text/javascript" src="../js/base/animationFramework.js"></script>
    <script type="text/javascript" src="../js/base/crossBrowserFramework.js"></script>
    <script type="text/javascript" src="../js/base/responsiveFramework.js"></script>
    <script type="text/javascript" src="../js/base/preloadFramework.js"></script>
    <script type="text/javascript" src="../js/detailsurfer/detailsurfer.js"></script>
    <script type="text/javascript" src="../js/scrollbar/scrollbar.js"></script>
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
<body onload="AnimaLoader.loadLogoStudio()">
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
        <article class="ContentBlock contentLogoStudio" animasource="../images/logo_studio/011.jpg" >
        </article>
        <article class="ContentBlock contentAntracite contentLogoStudioDetails">
            <div class="data dataTopCenter">
                <h1 class="dataCenterCenter">logo studio.</h1>
                <h2 class="dataCenterCenter">
                    "Gli occhi sono lo specchio dell'anima e ci permettono di dare colore al mondo"
                </h2>
                <div class="line"></div>
                <div class="logostudiodetailbox dataTopCenter">
                    <p class="displayBlockDesktop">
                        <span>
                            Occorre replicare in digitale l'anima della tua azienda,<br />
                            la sua essenza, l'identit&agrave; e la missione.
                        </span>
                        <span>
                            Esistono molte soluzioni a livello di marketing,<br />
                            dalla creazione di un sito web alla scelta dei social,<br />
                            dalla pubblicit&agrave; fino a iniziative e promozioni<br />
                            mirate al raggiungimento di questi obiettivi.
                        </span>
                        <span>
                            Tutte queste soluzioni sono comunque subordinate all'esistenza<br />
                            di un segno riconoscibile e unico,<br />
                            il simbolo della tua azienda nel mondo digitale:<br />
                            il logo.
                        </span>
                    </p>
                    <p class="displayBlockSmartphone">
                        <span>
                            Occorre replicare in digitale <br />
                            l'anima della tua azienda,<br />
                            la sua essenza,<br />
                            l'identit&agrave; e la missione.
                        </span>
                        <span>
                            Per riuscirci serve un segno<br />
                            riconoscibile e unico,<br />
                            simbolo dell'esistenza <br />
                            della tua azienda <br />
                            nel mondo digitale: il logo.
                        </span>
                    </p>
                </div>
            </div>
        </article>
        <div class="separator"></div>
        <article class="ContentBlock contentEmotions" animasource="../images/logo_studio/012.jpg" >
            <div class="dataBottomCenter data" animasource="../images/logo_studio/items/emotions_overlay.png" >
                <h1>Emotions.</h1>
                <h2>
                    Presentarsi &egrave; l'inizio di ogni storia d'amore, ma anche di un rapporto professionale o commerciale.
                    Riuscirci al meglio &egrave; la chiave per farsi ricordare.
                </h2>
            </div>
        </article>
        <article class="ContentBlock contentPalette displayFlexDesktop contentStats" animasource="../images/logo_studio/015.jpg" >
            <div class="galleryControl galleryControlPrevious displayNone" onclick="AnimaGallery.previousGalleryImage()" id="gallery_previous"><img src="../images/logo_studio/items/leftarrow.png" alt="go left" /></div>
            <div class="contentDataGallery" id="statsGallery">
                <div class="dataGalleryContainer first">
                    <div class="data dataCenterLeft">
                        <h1 class="dataCenterCenter">Tasks.</h1>
                        <div class="content dataCenterLeft">
                            <div class="statElements">
                                <div class="statElement">
                                    <div class="icon identita" animasource="../images/logo_studio/items/identita.png" ></div>
                                    <div class="details"><p>Un logo che rispecchia l'essenza della tua attivit&agrave; favorisce idee di chiarezza, trasparenza e continuit&agrave;; in questo modo sar&agrave; pi&ugrave; semplice instaurare un rapporto di fiducia con i clienti.</p></div>
                                    <h2>IDENTIT&Agrave;</h2>
                                </div>
                                <div class="statElement">
                                    <div class="icon ricordo" animasource="../images/logo_studio/items/ricordo.png" ></div>
                                    <div class="details"><p>Un logo che si ricorda &egrave; un logo capace di vincere anche il tempo, restando attuale e, anzi, aumentando la propria efficacia.</p></div>
                                    <h2>RICORDO</h2>
                                </div>
                                <div class="statElement">
                                    <div class="icon messaggio" animasource="../images/logo_studio/items/messaggio.png" ></div>
                                    <div class="details"><p>Il tuo logo, per funzionare, deve riuscire a parlare alle persone, attraverso emozioni, sensazioni e pensieri trasmessi visivamente.</p></div>
                                    <h2>MESSAGGIO</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataGalleryContainer second">
                    <div class="data dataCenterLeft">
                        <h1 class="dataCenterCenter light">stats.</h1>
                        <div class="content dataCenterLeft">
                            <div class="statElements">
                                <div class="statElement">
                                    <div class="icon novantatrepercento" animasource="../images/logo_studio/items/001.png" ></div>
                                    <h2 class="light">Parte visiva della comunicazione umana</h2>
                                </div>
                                <div class="statElement">
                                    <div class="icon sessantak" animasource="../images/logo_studio/items/002.png" ></div>
                                    <h2 class="light">Immagini elaborate dal cervello nel tempo utile per comprendere un testo</h2>
                                </div>
                                <div class="statElement">
                                    <div class="icon zerovirgolauno" animasource="../images/logo_studio/items/003.png" ></div>
                                    <h2 class="light">Secondi impiegati dal cervello per elaborare un'immagine</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dataGalleryContainer third">
                    <div class="data dataCenterLeft">
                        <h1 class="dataCenterCenter">Features.</h1>
                        <div class="content dataCenterLeft">
                            <div class="statElements">
                                <div class="statElement">
                                    <div class="icon unicita" animasource="../images/logo_studio/items/unicita.png" ></div>
                                    <div class="details"><p>Rendere il tuo logo unico nel suo genere &egrave; la chiave giusta per distiguersi e farsi ricordare.</p></div>
                                    <h2>UNICIT&Agrave;</h2>
                                </div>
                                <div class="statElement">
                                    <div class="icon semplicita" animasource="../images/logo_studio/items/semplicita.png" ></div>
                                    <div class="details"><p>Un logo semplice &egrave; immediatamente comprensibile all'occhio umano e questo contribuisce a renderlo accattivante e piacevole alla vista.</p></div>
                                    <h2>SEMPLICIT&Agrave;</h2>
                                </div>
                                <div class="statElement">
                                    <div class="icon scalabilita" animasource="../images/logo_studio/items/scalabilita.png" ></div>
                                    <div class="details"><p>Lo sviluppo in grafica vettoriale permette al tuo logo di adattarsi a qualsiasi dimensione di utilizzo, mantenendo inalterate chiarezza e qualit&agrave;.</p></div>
                                    <h2>SCALABILIT&Agrave;</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="galleryControl galleryControlNext" onclick="AnimaGallery.nextGalleryImage()" id="gallery_next"><img src="../images/logo_studio/items/rightarrow.png" alt="go left" />;</div>
        </article>
        <article class="ContentBlock contentPalette displayFlexSmartphone contentStats" animasource="../images/logo_studio/015.jpg" >
            <div class="contentDataGallery">
                <div class="dataGalleryContainer second">
                    <div class="data dataCenterLeft">
                        <h1 class="dataCenterCenter light">stats.</h1>
                        <div class="contents dataCenterLeft">
                            <div class="statElements">
                                <div class="statElement">
                                    <div class="icon novantatrepercento"></div>
                                    <span class="light">Parte visiva della comunicazione umana</span>
                                </div>
                                <div class="statElement">
                                    <div class="icon sessantak"></div>
                                    <span class="light">Immagini elaborate dal cervello nel tempo utile per comprendere un testo</span>
                                </div>
                                <div class="statElement">
                                    <div class="icon zerovirgolauno"></div>
                                    <span class="light">Secondi impiegati dal cervello per elaborare un'immagine</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <div class="separator"></div>
        <article class="ContentBlock contentPalette contentStrategy" animasource="../images/logo_studio/013.jpg" >
            <div class="data dataCenterCenter">
                <h1 class="dataCenterCenter">Strategy.</h1>
                <h2 class="dataCenterCenter">
                    Per un'azienda il logo &egrave; la prima sensazione suscitata nel consumatore e diventa uno strumento capace di canalizzare
                    l'interesse del giusto target, rappresenta l'identit&agrave; aziendale e racchiude in un'immagine<br/>
                    il cuore della tua attivit&agrave;.
                </h2>
                <div class="surfer displayFlexDesktop">
                    <div class="detailsurfer" slidetime="10000">
                        <div class="navbar">
                            <div class="navigator">
                            </div>
                        </div>
                        <div class="contentContainer">
                            <div class="content">
                                <div class="articles">
                                    <div class="article">
                                        <p>
                                            La ricetta del logo perfetto &egrave; in costante cambiamento, ma rimane comunque legata alla moda del mercato,
                                            alla percezione visiva dell'utente e alle regole di struttura dettate dal mondo digital.
                                        </p>
                                    </div>
                                    <div class="article">
                                        <p>
                                            I gusti artistici preferiti dal mercato si possono capire leggendo e confrontando dati e statistiche in riferimento ai competitor
                                            diretti e quelli di maggiore successo, differenziando le caratteristiche forti dalle mode momentanee.
                                        </p>
                                    </div>
                                    <div class="article">
                                        <p>
                                            Marketing, psicologia e comunicazione offrono la possibilit&agrave; di abbinare l'estetica del logo alla sua funzionalit&agrave;,
                                            rievocando associazioni di pensiero che immediatamente riconducono ai punti di forza e ai valori dell'impresa.
                                        </p>
                                    </div>
                                    <div class="article">
                                        <p>
                                            Gli aspetti strutturali sono legati agli strumenti e ai modi in cui il logo sar&agrave; visibile: quello giusto
                                            deve essere responsive, scalabile e declinabile secondo le necessit&agrave;.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <div class="separator"></div>
        <article class="ContentBlock contentSteps" animasource="../images/logo_studio/014.jpg" >
            <div class="surfer displayFlexDesktop">
                <div class="detailsurfer" slidetime="15000">
                    <div class="contentContainer">
                        <div class="content">
                            <div class="articles">
                                <div class="article">
                                    <h2>Intervista.</h2>
                                    <p>
                                        Il primo incontro sar&agrave; utile a presentarti gi&agrave; da subito un'antemprima del mercato dal punto di vista degli stili grafici
                                        adottati dai competitor del tuo settore, in relazione al loro grado di successo.
                                        In questo modo potrai concordare delle regole generali su come procedere, come ad esempio le forme e i colori, unitamente ai tuoi obiettivi.
                                    </p>
                                </div>
                                <div class="article">
                                    <h2>Forme e colori.</h2>
                                    <p>
                                        Con i dati raccolti durante l'intervista inizia lo studio del tuo logo, nella forma e nel colore, fino allo sviluppo di tre bozze, gi&agrave; in formato digitale,
                                        tra cui puoi scegliere quella da finalizzare.
                                        Le bozze sono legate soprattutto alla forma del logo e per ognuna &egrave; possibile richiedere un'anteprima degli abbinamenti di colore.
                                    </p>
                                </div>
                                <div class="article">
                                    <h2>Upgrade.</h2>
                                    <p>
                                        Se quello che cerchi &egrave; un servizio senza limiti, con l'upgrade, in aggiunta al servizio standard, resti in contatto diretto con il responsabile grafico e segui lo sviluppo del tuo logo da vicino,
                                        attraverso feedback e anteprime del tuo progetto in corso d'opera.
                                    </p>
                                </div>
                                <div class="article">
                                    <h2>Finito... ?</h2>
                                    <p>
                                        Al termine del progetto ricevi il tuo logo nei formati svg, eps, pdf, png, jpg, e un report progettuale che delinea le regole
                                        di forma e di colore per la riproducibilit&agrave; e per la declinazione del logo.
                                        Vuoi di pi&ugrave;? Sviluppa il tuo Digital Kit in abbinamento allo stile del tuo logo e dai ancora pi&ugrave; forza alla tua identit&agrave; con gli elementi grafici.
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
            <div class="data dataBottomCenter">
                <h1 class="dataCenterCenter">steps.</h1>
                <h2 class="dataCenterCenter">
                    Dall'analisi del mercato, dei competitor diretti e maggiori e dei tuoi obiettivi, prendono vita lo studio della forma e del colore del tuo nuovo logo.
                </h2>
            </div>
        </article>
        <div class="separator"></div>
        <article class="ContentBlock contentFindMore" animasource="../images/logo_studio/016.jpg" >
            <div class="data dataCenterLeft">
                <h1 class="dataCenterLeft">Find More.</h1>
                <div class="dataCenterCenter">
                    <h2>Scopri di pi&ugrave;,<br />
                        Contattaci adesso</h2>
                    <div class="UI">
                        <button class="info" link-id="contacts" onclick="AnimaSections.open(this)">+ INFO</button>
                        <span class="otherwise">Oppure</span>
                        <a class="portfolio" link-id="portfolio" onclick="AnimaSections.open(this)">Apri portfolio</a>
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
