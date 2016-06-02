<<<<<<< HEAD
##Steps
```
$ git clone https://github.com/abadri/myHealth.git
$ cd myHealth/
$ npm install .
$ node server.js 
```

##Sample endpoints


* Get Contacts: http://localhost:5000/api/getContacts/<UID>
* Get Appointments: http://localhost:5000/api/getAppointments/<UID>
* Get Presciptions: http://localhost:5000/api/getPrescriptions/<UID>

where <UID> is a parameter e.g. http://localhost:5000/api/getContacts/1234


##Installing Mongo DB on MAC

   

```
// update your packages
$ brew update

// install mongoDB
$ brew install mongodb

$ sudo mkdir -p /data/db

$ cd /
$ chmod 777 data
$ cd /data
$ chmod 777 db

//Starting mondodb
$ mongod

```


##External Hosting 


###Node App
Using Heroku to host the app

How to Heroku: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up


###Mongo DB
https://mongolab.com


To connect using the mongo shell:
```
mongo ds037175.mongolab.com:37175/health -u <dbuser> -p <dbpassword>
```
To connect using a driver via the standard MongoDB URI (what's this?):
``` 
mongodb://<dbuser>:<dbpassword>@ds037175.mongolab.com:37175/health
```




=======
# serverHepCat
server for HepCat project
>>>>>>> 7f347e498374de4994aea220cfa1908e5bc7f80f
