INSERT INTO `owners` ( `username`, `password`) VALUES ("a", "a1");
INSERT INTO `owners` ( `username`, `password`) VALUES ("b", "b1");
INSERT INTO `owners` ( `username`, `password`) VALUES ("c", "c1");

INSERT INTO `house` (`ownerid`,`longitude`, `latitude`, `lastwindspeed`, `meanwind`, `stddevwind`,`broken`, `brokencount`, `brokenprobability`, `productionefficiency`,`production`,`meanconsumption`, `stddevconsumption`, `consumption`, `griddelta`, `batteryMax`, `battery`) VALUES
(1, 65.373, 22.811, 10.5, 7.77, 0.10, 0, 0, 0.01, 8, 55.3, 50, 0.8, 54.55, 0, 200,100.0),
(2, 65.453, 22.921, 9.99, 5.42, 0.05, 0, 0, 0.05, 8, 65.2, 45, 1.0, 34.55, 0, 250, 81.0),
(3, 65.533, 22.041, 8.05, 3.33, 0.70, 1, 2, 0.03, 8, 65.2, 70, 0.5, 73.40, 0, 150, 121.0);

INSERT INTO `totalelectricity` (`id`, `totalconsumption`, `totalproduction`) VALUES (1, 2.0, 3.0);
