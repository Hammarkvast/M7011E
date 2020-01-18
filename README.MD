# Setup guide
In order to be able to set everything up you need to get docker on your machine.
**Install docker**

`https://docs.docker.com/get-docker/`

After this is done you need to need to install the docker-compose package

**Install docker-compose**

`sudo apt-get install docker-compose`

**Create .env files**

Now you need to create a .env file in both the simulationContainer and the databaseContainer respectively. 
 You need to add the following data to both files:

`DB_HOST=localhost`

`DB_USER=root`

`DB_PASS=* Your db password *`

`DB_DATABASE=antom`

**Starting the database and simulation**

Now, in order to start the website you first need to start the database by doing the following:

`cd databaseContainer`

`sudo docker-compose up --build`

Now you need to enter the mysql terminal:

`sudo docker exec -t -i mydb /bin/bash`

After youve signed in, do this:

`mysql -uroot -p(password)`

where (password) is the password you gave the database.

Then enter the antom database:

`USE antom;`

and finally execute the following command:

`ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY *your db password*`

Now navigate to the simulationContainer and start it:

`cd simulationContainer`

`sudo docker-compose up --build`

Now you should be able to access the website by going to the localhast ip:

`http://127.0.0.1:3000`

If you want to access the manager side of the site, just go to:

`http://127.0.0.1:3000/signin_manager`
