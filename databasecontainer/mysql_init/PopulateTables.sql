INSERT INTO `house` (`longitude`, `latitude`, `production`, `consumption`, `battery`) VALUES
( 65.373, 22.811, 55.3, 54.55, 100.0),
( 65.453, 22.921, 65.2, 34.55, 81.0),
( 65.533, 22.041, 73.4, 27.55, 121.0);

INSERT INTO `owners` ( `houseid`, `username`, `password`) VALUES (1,"a", "a1");
INSERT INTO `owners` ( `houseid`, `username`, `password`) VALUES (2,"b", "b1");
INSERT INTO `owners` ( `houseid`, `username`, `password`) VALUES (3,"c", "c1");

INSERT INTO `totalelectricity` (`id`, `totalconsumption`, `totalproduction`) VALUES (1, 2.0, 3.0);
