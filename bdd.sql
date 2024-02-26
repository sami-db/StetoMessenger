-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 08 Février 2024 à 23:13
-- Version du serveur :  5.7.11
-- Version de PHP :  5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `hackathon_steto test`
--

-- --------------------------------------------------------

--
-- Structure de la table `careteam`
--

CREATE TABLE `careteam` (
  `id` varchar(36) NOT NULL,
  `subjectId` varchar(36) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `careteam`
--

INSERT INTO `careteam` (`id`, `subjectId`, `isActive`, `createdAt`, `updatedAt`) VALUES
('uuid-careteam-1', 'uuid-patient-1', 1, '2024-02-08 23:03:00', '2024-02-08 23:03:00'),
('uuid-careteam-2', 'uuid-patient-2', 1, '2024-02-08 23:03:00', '2024-02-08 23:03:00'),
('uuid-careteam-3', 'uuid-patient-3', 1, '2024-02-08 23:02:43', '2024-02-08 23:02:43'),
('uuid-careteam-4', 'uuid-patient-4', 1, '2024-02-08 23:02:43', '2024-02-08 23:02:43'),
('uuid-careteam-5', 'uuid-patient-5', 1, '2024-02-08 23:03:27', '2024-02-08 23:03:27'),
('uuid-careteam-6', 'uuid-patient-6', 1, '2024-02-08 23:03:27', '2024-02-08 23:03:27'),
('uuid-careteam-7', 'uuid-patient-7', 1, '2024-02-08 23:04:03', '2024-02-08 23:04:03'),
('uuid-careteam-8', 'uuid-patient-8', 1, '2024-02-08 23:04:03', '2024-02-08 23:04:03');

-- --------------------------------------------------------

--
-- Structure de la table `careteamparticipant`
--

CREATE TABLE `careteamparticipant` (
  `id` varchar(36) NOT NULL,
  `careTeamId` varchar(36) DEFAULT NULL,
  `memberId` varchar(36) DEFAULT NULL,
  `role` enum('nurse','doctor') DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `careteamparticipant`
--

INSERT INTO `careteamparticipant` (`id`, `careTeamId`, `memberId`, `role`, `isActive`, `createdAt`, `updatedAt`) VALUES
('uuid-ctp-1', 'uuid-careteam-1', 'uuid-practitioner-1', 'doctor', 1, '2024-02-08 23:03:00', '2024-02-08 23:03:00'),
('uuid-ctp-2', 'uuid-careteam-2', 'uuid-practitioner-2', 'nurse', 1, '2024-02-08 23:03:00', '2024-02-08 23:03:00'),
('uuid-ctp-3', 'uuid-careteam-3', 'uuid-practitioner-3', 'nurse', 1, '2024-02-08 23:02:43', '2024-02-08 23:02:43'),
('uuid-ctp-4', 'uuid-careteam-4', 'uuid-practitioner-1', 'doctor', 1, '2024-02-08 23:05:55', '2024-02-08 23:02:43'),
('uuid-ctp-5', 'uuid-careteam-5', 'uuid-practitioner-2', 'doctor', 1, '2024-02-08 23:06:17', '2024-02-08 23:03:27'),
('uuid-ctp-6', 'uuid-careteam-6', 'uuid-practitioner-3', 'nurse', 1, '2024-02-08 23:06:22', '2024-02-08 23:03:27'),
('uuid-ctp-7', 'uuid-careteam-7', 'uuid-practitioner-4', 'doctor', 1, '2024-02-08 23:06:37', '2024-02-08 23:04:03'),
('uuid-ctp-8', 'uuid-careteam-8', 'uuid-practitioner-4', 'nurse', 1, '2024-02-08 23:06:41', '2024-02-08 23:04:03');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(36) NOT NULL,
  `careTeamId` varchar(36) NOT NULL,
  `senderId` varchar(36) NOT NULL,
  `content` varchar(512) NOT NULL,
  `createdAt` datetime NOT NULL,
  `messageType` enum('group','pro') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `message`
--

INSERT INTO `message` (`id`, `careTeamId`, `senderId`, `content`, `createdAt`, `messageType`) VALUES
(57, 'uuid-careteam-1', 'uuid-practitioner-1', 'zezeze', '2024-02-09 00:11:34', 'group'),
(58, 'uuid-careteam-1', 'uuid-practitioner-1', 'zeze', '2024-02-09 00:11:37', 'group'),
(59, 'uuid-careteam-1', 'uuid-practitioner-1', 'zezezzezezepro', '2024-02-09 00:11:43', 'pro');

-- --------------------------------------------------------

--
-- Structure de la table `patient`
--

CREATE TABLE `patient` (
  `id` varchar(36) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `diabetesType` enum('type1','type2','gestational') DEFAULT NULL,
  `insulinScheme` enum('mono','multi') DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `patient`
--

INSERT INTO `patient` (`id`, `firstname`, `lastname`, `email`, `diabetesType`, `insulinScheme`, `isActive`, `createdAt`, `updatedAt`) VALUES
('uuid-patient-1', 'Alice', 'Johnson', 'alice@example.com', 'type1', 'mono', 1, '2024-02-08 23:03:00', '2024-02-08 23:03:00'),
('uuid-patient-2', 'Bob', 'Williams', 'bob@example.com', 'type2', 'multi', 1, '2024-02-08 23:03:00', '2024-02-08 23:03:00'),
('uuid-patient-3', 'Carol', 'Green', 'carol@example.com', 'gestational', 'multi', 1, '2024-02-08 23:02:43', '2024-02-08 23:02:43'),
('uuid-patient-4', 'Mike', 'Thompson', 'mike@example.com', 'type1', 'mono', 1, '2024-02-08 23:02:43', '2024-02-08 23:02:43'),
('uuid-patient-5', 'Linda', 'White', 'linda@example.com', 'type1', 'multi', 1, '2024-02-08 23:03:27', '2024-02-08 23:03:27'),
('uuid-patient-6', 'Robert', 'Moore', 'robert@example.com', 'type2', 'mono', 1, '2024-02-08 23:03:27', '2024-02-08 23:03:27'),
('uuid-patient-7', 'Susan', 'Lee', 'susan@example.com', 'gestational', 'multi', 1, '2024-02-08 23:04:03', '2024-02-08 23:04:03'),
('uuid-patient-8', 'James', 'Walker', 'james@example.com', 'type1', 'mono', 1, '2024-02-08 23:04:03', '2024-02-08 23:04:03');

-- --------------------------------------------------------

--
-- Structure de la table `practitioner`
--

CREATE TABLE `practitioner` (
  `id` varchar(36) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `practitioner`
--

INSERT INTO `practitioner` (`id`, `firstname`, `lastname`, `isActive`, `createdAt`, `updatedAt`) VALUES
('uuid-practitioner-1', 'John', 'Doe', 1, '2024-02-08 23:03:00', '2024-02-08 23:03:00'),
('uuid-practitioner-2', 'Jane', 'Smith', 1, '2024-02-08 23:03:00', '2024-02-08 23:03:00'),
('uuid-practitioner-3', 'Emily', 'Taylor', 1, '2024-02-08 23:02:43', '2024-02-08 23:02:43'),
('uuid-practitioner-4', 'David', 'Brown', 1, '2024-02-08 23:02:43', '2024-02-08 23:02:43'),
('uuid-practitioner-5', 'Rachel', 'Adams', 1, '2024-02-08 23:03:27', '2024-02-08 23:03:27'),
('uuid-practitioner-6', 'Ethan', 'Clark', 1, '2024-02-08 23:03:27', '2024-02-08 23:03:27'),
('uuid-practitioner-7', 'Anna', 'Martinez', 1, '2024-02-08 23:04:03', '2024-02-08 23:04:03'),
('uuid-practitioner-8', 'John', 'Lewis', 1, '2024-02-08 23:04:03', '2024-02-08 23:04:03');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `careteam`
--
ALTER TABLE `careteam`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subjectId` (`subjectId`);

--
-- Index pour la table `careteamparticipant`
--
ALTER TABLE `careteamparticipant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `careTeamId` (`careTeamId`),
  ADD KEY `memberId` (`memberId`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `careTeamId` (`careTeamId`);

--
-- Index pour la table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `practitioner`
--
ALTER TABLE `practitioner`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(36) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `careteam`
--
ALTER TABLE `careteam`
  ADD CONSTRAINT `careteam_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `patient` (`id`);

--
-- Contraintes pour la table `careteamparticipant`
--
ALTER TABLE `careteamparticipant`
  ADD CONSTRAINT `careteamparticipant_ibfk_1` FOREIGN KEY (`careTeamId`) REFERENCES `careteam` (`id`),
  ADD CONSTRAINT `careteamparticipant_ibfk_2` FOREIGN KEY (`memberId`) REFERENCES `practitioner` (`id`);

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`careTeamId`) REFERENCES `careteam` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
