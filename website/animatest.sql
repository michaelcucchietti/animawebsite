-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 28, 2019 alle 12:13
-- Versione del server: 10.1.37-MariaDB
-- Versione PHP: 7.3.1

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
  `id` varchar(50) COLLATE utf8_bin NOT NULL,
  `datacreazione` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `titolo` varchar(100) COLLATE utf8_bin NOT NULL,
  `descrizione` varchar(1024) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dump dei dati per la tabella `articles`
--

INSERT INTO `articles` (`id`, `datacreazione`, `titolo`, `descrizione`) VALUES
('primo', '2019-06-28 10:58:53', 'Infografica', 'Abbiamo chiesto aagli imprenditori quali emozioni volessero trasmettere ai propri clienti e questo è quello che è uscito!'),
('quarto', '2019-06-28 11:39:07', 'Ultime news number #2', 'Anima è fantastica!'),
('quinto', '2019-06-28 11:39:29', 'Ultime news #3', 'Anima è fantastica!'),
('secondo', '2019-06-28 10:58:19', 'Fourier', 'Articolo che parla della traformata di fourier'),
('sesto', '2019-06-28 11:39:43', 'Ultime news number #4', 'Anima è fantastica!'),
('settimo', '2019-06-28 11:39:55', 'Ultime news number #5', 'Anima è fantastica!'),
('terzo', '2019-06-28 11:05:58', 'Ultime news', 'Anima è fantastica!');

-- --------------------------------------------------------

--
-- Struttura della tabella `resources`
--

CREATE TABLE `resources` (
  `id` varchar(50) COLLATE utf8_bin NOT NULL,
  `idA` varchar(50) COLLATE utf8_bin NOT NULL,
  `part_number` int(11) NOT NULL,
  `resourceType` int(11) NOT NULL,
  `value` varchar(200) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`,`part_number`),
  ADD KEY `resourcesImageUrls` (`idA`);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resourcesImageUrls` FOREIGN KEY (`idA`) REFERENCES `articles` (`id`) ON DELETE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
