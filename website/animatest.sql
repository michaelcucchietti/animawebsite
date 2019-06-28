-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 28, 2019 alle 17:56
-- Versione del server: 10.1.28-MariaDB
-- Versione PHP: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `animatest`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `articles`
--

CREATE TABLE `articles` (
  `id` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `datacreazione` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `titolo` varchar(100) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `descrizione` varchar(1024) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dump dei dati per la tabella `articles`
--

INSERT INTO `articles` (`id`, `datacreazione`, `titolo`, `descrizione`) VALUES
('infografica_emozioni', '2019-06-28 16:18:24', 'Emozionarsi sul Web', 'Abbiamo chiesto agli imprenditori milanesi che emozione volessero trasmettere ai propri clienti. Questo è quello che ci hanno detto');

-- --------------------------------------------------------

--
-- Struttura della tabella `resourceclasses`
--

CREATE TABLE `resourceclasses` (
  `idA` varchar(50) COLLATE latin1_bin NOT NULL,
  `part_number` int(11) NOT NULL,
  `classname` varchar(30) COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Dump dei dati per la tabella `resourceclasses`
--

INSERT INTO `resourceclasses` (`idA`, `part_number`, `classname`) VALUES
('infografica_emozioni', 0, 'testo'),
('infografica_emozioni', 1, 'emozioni_copertina'),
('infografica_emozioni', 2, 'testo'),
('infografica_emozioni', 3, 'infografica_emozioni_granulare'),
('infografica_emozioni', 4, 'testo'),
('infografica_emozioni', 5, 'infografica_emozioni_generale'),
('infografica_emozioni', 6, 'testofinale');

-- --------------------------------------------------------

--
-- Struttura della tabella `resources`
--

CREATE TABLE `resources` (
  `idA` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `part_number` int(11) NOT NULL,
  `resourceType` int(11) NOT NULL,
  `value` varchar(2048) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dump dei dati per la tabella `resources`
--

INSERT INTO `resources` (`idA`, `part_number`, `resourceType`, `value`) VALUES
('infografica_emozioni', 0, 0, '<span>Nella vita ci capita di vivere emozioni di ogni forma e colore e il nostro vivere quotidiano &egrave; scandito da quei brevi istanti che le sanno regalare... Ma &egrave; possibile emozionarsi online?</span>\r\n\r\n<span>Anche navigando in rete la scintilla emotiva si accende in totale autonomia, in risposta a stimoli che ognuno di noi vive individualmente...</span>\r\n\r\n<span>\r\n...e se le statistiche dicono che sul web la nostra soglia di attenzione &egrave; molto bassa (appena 8 secondi in media sui social), come pu&ograve; pretendere un imprenditore milanese di rendere la propria idea virale?\r\n</span>'),
('infografica_emozioni', 1, 4, ''),
('infografica_emozioni', 2, 0, '<span>Nel marketing moderno il cliente &egrave; al centro di ogni pensiero e saperlo emozionare pu&ograve; davvero fare la differenza, sul web come in negozio.</span>\r\n\r\n<span>\r\nChe emozione scegliere allora?\r\n</span>\r\n\r\n<span>\r\nLo abbiamo chiesto a decine di imprenditori nella provincia di Milano, che alla domanda - \"quale emozione vorresti trasmettere ai tuoi clienti?\" - ci hanno risposto cos&igrave;:\r\n</span>'),
('infografica_emozioni', 3, 4, ''),
('infografica_emozioni', 4, 0, '<span>\r\nOgnuna delle emozioni citate rappresenta il secondo livello della scala emotiva presa in considerazione, che le raggruppa in tre pi&ugrave; grandi famiglie: Gioia, Amore e Meraviglia.\r\n</span>'),
('infografica_emozioni', 5, 4, ''),
('infografica_emozioni', 6, 0, '<span>La gioia estrema ci porta all\'estasi e nel marketing &egrave; il fulcro di un rapporto \"social\" con il cliente, fatto di spensieratezza, fiducia e condivisione. L\'aspetto pi&ugrave; critico di questa scelta &egrave; rappresentato dall\'impegno quotidianamente richiesto per mantenere vivo il rapporto.</span>\r\n\r\n<span>\r\nL\'amore &egrave; l\'emozione della fidelizzazione, proprio perch&eacute; slegarci da qualcosa verso cui proviamo attrazione, passione o desiderio pu&ograve; essere molto doloroso; tuttavia &egrave; anche un\'emozione \"rara\" e ha bisogno di tempo, cura e attenzione al dettaglio.</span>\r\n\r\n<span>\r\nLa meraviglia (o sorpresa, con connotazione pi&ugrave; generale) ci induce a prestare la massima attenzione, rimandando il giudizio ad un secondo momento. &Egrave; un\'emozione che pu&ograve; essere un\'arma a doppio taglio, ma di grande successo se l\'impatto &egrave; positivo.</span>\r\n\r\n<span>\r\nPossiamo scegliere l\'immagine emotiva in base alla nostra inclinazione naturale o ugualmente sulla base di un pensiero strategico, grazie a un\'intuizione o al nostro istinto.\r\nL\'importante &egrave; che l\'emozione scelta sia coerente con l\'identit&agrave; del brand e ben supportata da una corretta comunicazione: un impatto visivo efficace sui nostri principali mezzi di diffusione \r\n</span>');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `resourceclasses`
--
ALTER TABLE `resourceclasses`
  ADD PRIMARY KEY (`idA`,`part_number`,`classname`);

--
-- Indici per le tabelle `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`idA`,`part_number`),
  ADD KEY `resourcesImageUrls` (`idA`);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `resourceclasses`
--
ALTER TABLE `resourceclasses`
  ADD CONSTRAINT `classes_resources` FOREIGN KEY (`idA`,`part_number`) REFERENCES `resources` (`idA`, `part_number`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resourcesImageUrls` FOREIGN KEY (`idA`) REFERENCES `articles` (`id`) ON DELETE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
