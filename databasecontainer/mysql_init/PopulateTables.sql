INSERT INTO `owners` ( `username`, `password`,`firstname`, `lastname`) VALUES ("a", "a1", "Adam", "Andersson");
INSERT INTO `owners` ( `username`, `password`) VALUES ("b", "b1");
INSERT INTO `owners` ( `username`, `password`) VALUES ("test", "$2b$10$YOmPxgHMM2UMqxiYPN7jl.A2noHHbeIYuu177T5gotvx.UpL9TJ6K");
INSERT INTO `owners` ( `username`, `password`, `manager`) VALUES ("man", "$2b$10$5OP4Z6d7mCRcf3msIm6DsOiWIhcysiU/lzg5HWkkLzzOosYm7Gsxm", 1);

INSERT INTO `house` (`ownerid`,`longitude`, `latitude`, `lastwindspeed`, `meanwind`, `stddevwind`,`broken`, `brokencount`, `brokenprobability`, `productionefficiency`,`production`,`meanconsumption`, `stddevconsumption`, `consumption`, `griddelta`,`gridbatterypercentage`, `batteryMax`, `battery`) VALUES
(1, 65.373, 22.811, 10.5, 7.77, 0.10, 0, 0, 0.01, 8, 55.3, 50, 0.8, 54.55, 0, 50.0, 200,100.0),
(2, 65.453, 22.921, 9.99, 5.42, 0.05, 0, 0, 0.05, 8, 65.2, 45, 1.0, 34.55, 0, 50.0, 250, 81.0),
(3, 65.533, 22.041, 8.05, 3.33, 0.70, 1, 2, 0.03, 8, 65.2, 70, 0.5, 73.40, 0, 50.0, 150, 121.0);

INSERT INTO `totalelectricity` (`id`, `totalconsumption`, `totalproduction`, `totalnetproduction`, `totalelectricityprice`) VALUES (1, 2.0, 3.0, 6, 0.8);

INSERT INTO `powerplant` (`meanproduction`, `stddevproduction`, `production`, `griddelta`, `gridbufferpercentage`, `bufferMax`, `buffer`) VALUES
( 400.0, 0.1, 400.0, 200.0, 50.0, 10000.0, 5000.0);

