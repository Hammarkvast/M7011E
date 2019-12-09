-- CREATE USER antom;
-- CREATE DATABASE antom;
-- GRANT ALL PRIVILEGES ON DATABASE antom TO antom;
-- ALTER DATABASE antom OWNER TO antom;

-- \c antom

-- CREATE DATABASE `antom`;

CREATE TABLE `antom`.`house` (
    `houseid` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `longitude` float, 
    `latitude` float,
    `lastwindspeed` float,
    `meanwind` float,
    `stddevwind` flaot,
    `production` float,
    `consumption` float,
    `battery` float,
    PRIMARY KEY (houseid)
);

-- ALTER TABLE house OWNER TO antom;

CREATE TABLE `antom`.`owners`(
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `houseid` int UNSIGNED NULL,
    `firstname` varchar(255) CHARACTER SET UTF8 DEFAULT NULL,
    `lastname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    `email` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    `username`  varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    `password`  varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (houseid) REFERENCES house(houseid)   
);

CREATE TABLE `antom`.`totalelectricity`(
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `totalproduction` float,
    `totalconsumption` float,
    PRIMARY KEY (id)
);
-- ALTER TABLE owners OWNER TO antom;   