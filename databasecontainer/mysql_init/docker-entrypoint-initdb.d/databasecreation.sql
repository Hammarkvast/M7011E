
CREATE DATABASE `antom`;

CREATE TABLE `house` (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `longitude` float, 
    `latitude` float,
    `production` float,
    `consumption` float,
    `battery` float,
    PRIMARY KEY (id),
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `owner`(
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `houseid`int,
    `användarnamn`  varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    `lösenord`  varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    PRIMARY KEY id,
    FOREIGN KEY (houseid) REFERENCES house(id)   
)

INSERT INTO `house` (`id`, `longitude`, `latitude`, `production`, `consumption`, `battery`) VALUES
(1, 65.373, 22.811, 55.3, 54.55, 100.0),
(2, 65.453, 22.921, 65.2, 34.55, 81.0),
(3, 65.533, 22.041, 73.4, 27.55, 121.0);

INSERT INTO `owner` (`id`, `houseid`, `användarnamn`, `lösenord`) VALUES
(1, 1, `legenden Anton`, `lösenord`),
(2, 2, `Sopan tom`, `password`)
(3, 3, `rapport skrivaren micke`, `pswd` );

