-- CREATE USER antom;
-- CREATE DATABASE antom;
-- GRANT ALL PRIVILEGES ON DATABASE antom TO antom;
-- ALTER DATABASE antom OWNER TO antom;

-- \c antom

-- CREATE DATABASE `antom`;


-- ALTER TABLE house OWNER TO antom;

CREATE TABLE `antom`.`owners`(
    `ownerid` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `firstname` varchar(255) CHARACTER SET UTF8 DEFAULT NULL,
    `lastname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    `email` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    `username`  varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    `password`  varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    `lasttime` BIGINT DEFAULT NULL,
    `blockedtime` BIGINT DEFAULT NULL,
    `secondsblocked` int DEFAULT NULL,
    `manager` int not NULL DEFAULT 0,
    PRIMARY KEY (ownerid)
);

CREATE TABLE `antom`.`house` (
    `houseid` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `ownerid` int UNSIGNED NULL,
    `longitude` float, 
    `latitude` float,
    `lastwindspeed` float,
    `meanwind` float,
    `stddevwind` float,
    `broken` boolean,    
    `brokencount` int,      
    `brokenprobability` float,    
    `productionefficiency` float,
    `production` float,
    `meanconsumption` float,
    `stddevconsumption` float,
    `consumption` float,
    `griddelta` float,
    `gridbatterypercentage` float,
    `batteryMax` int,
    `battery` float,
    `blackout` int UNSIGNED null,
    `imgname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    `imgtype` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    `image` MEDIUMBLOB,
    PRIMARY KEY (houseid),
    FOREIGN KEY (ownerid) REFERENCES owners(ownerid)
);

CREATE TABLE `antom`.`powerplant`(
    `powerplantid` INT UNSIGNED NOT null AUTO_INCREMENT,
    `meanproduction` float,
    `stddevproduction` float,
    `production` float,
    `griddelta` float,
    `gridbufferpercentage` float,
    `bufferMax` int,
    `buffer` float,
    `onoroff` int,
    `changestatetime` BIGINT,
    PRIMARY KEY(powerplantid)
);

CREATE TABLE `antom`.`totalelectricity`(
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `manorsim` int DEFAULT 1,
    `totalproduction` float,
    `totalconsumption` float,
    `totalnetproduction` float,
    `totalelectricityPrice` float,
    PRIMARY KEY (id)
);

SET @@time_zone = 'SYSTEM';
-- ALTER TABLE owners OWNER TO antom;   