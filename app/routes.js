var mongojs = require('mongojs');
var adminDB = mongojs('adminReg',['adminReg']);
var patientDB = mongojs('patientReg',['patientReg']);
var doctorDB = mongojs('doctorReg',['doctorReg']);
var mongoose = require('mongoose');
var Patient = require('../model/patient');

mongoose.connect('mongodb://localhost/adminReg');



var kitty = new Patient({
  firstName:  'John',
  lastName: 'Doe',
  gender: 'M',
  dob: new Date(),
  insurance: 'Test k',
  isHomeless: true,
  race: 'Asian'
});

kitty.save(function (err, sata) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow', sata);
  }
});

kitty.findSimilarTypes(function (err, dogs) {
  console.log(dogs); // woof
});

module.exports = function(app) {


    app.get('/adminReg/:fName', function(req, res) {
        console.log("I recieved a GET request");
        var name = req.params.fName;
        console.log(name);
        adminDB.adminReg.find({ fName: name }, function(err, doc) {
            console.log(doc);
            if (doc.length) {
                console.log("User exists");
                res.json(doc);
            } else {
                console.log("User doesn't exist");
                res.json(doc);
            }
        });
    });

    app.post('/adminReg', function(req, res) {
        console.log("Inserted");
        console.log(req.body);
        adminDB.adminReg.insert(req.body, function(err, docs) {
            console.log("in server " + docs);
            res.json(docs);
        });
    });


    app.post('/patientReg', function(req, res) {
        console.log("Inserted Patient");
        console.log(req.body);
        patientDB.patientReg.insert(req.body, function(err, docs) {
            console.log("Inserting in DB " + docs);
            res.json(docs);
        });
    });

    app.put('/updatePatient/:id', function(req, res) {
        console.log("I received PUT request from patient.");
        var id = req.params.id;
        patientDB.patientReg.findAndModify({
                query: { _id: mongojs.ObjectId(id) },
                update: { $set: { genderVal: req.body.genderVal, selRace: req.body.selRace, insr: req.body.insr, isHomls: req.body.isHomls } },
                new: "true"
            },
            function(err, doc) {
                console.log(doc);
                res.json(doc);
            });
    });

    app.get('/checkPatient/:fName', function(req, res) {
        console.log("I received get request from Patient.");
        var name = req.params.fName;
        patientDB.patientReg.find({ fName: name }, function(err, doc) {
            console.log(doc);
            var dataLen = doc.length;
            console.log("dataLen: " + dataLen);
            if (dataLen > 0) {
                $scope.message = "Patient already exists;"
            } else {

            }
        });
    });

    app.post('/doctorReg', function(req, res) {
        console.log("Inside Doctor registration at Server");
        console.log(req.body);
        doctorDB.doctorReg.insert(req.body, function(err, doc) {
            console.log("Inserting in DB " + doc)
            res.json(doc);
        });
    });

    app.get('/doctorDetails/:fName', function(req, res) {
        console.log("I received a GET request");
        var name = req.params.fName;
        console.log("Name: " + name);
        doctorDB.doctorReg.find({ fName: name }, function(err, doc) {
            res.json(doc);
        });
    });

    app.get('/adminView', function(req, res) {
        console.log("I received a GET request.");
        adminDB.adminReg.find(function(err, doc) {
            res.json(doc);
        });
    });

    app.get('/patientView', function(req, res) {
        console.log("Received patient get requrest.");
        patientDB.patientReg.find(function(err, docs) {
            console.log("res from server" + docs);
            res.json(docs);
        });
    });

    app.get('/viewDoctor', function(req, res) {
        console.log("Recieved get request for Doctors");
        doctorDB.doctorReg.find(function(err, doc) {
            res.json(doc);
        });
    });

    app.delete('/deleteAdmin/:fName', function(req, res) {
        console.log("I recieved a delete request.");
        var name = req.params.fName;
        adminDB.adminReg.remove({ fName: name }, function(err, doc) {
            res.json(doc);
        });
    });

    app.delete('/deletePatient/:fName', function(req, res) {
        console.log("I received a request to delete.");
        var name = req.params.fName;
        console.log("name: " + name);
        patientDB.patientReg.remove({ fName: name }, function(err, doc) {
            res.json(doc);
        });
    });

    app.delete('/deleteDoctor/:fName', function(req, res) {
        console.log("I received a request to delete a doctor.");
        var name = req.params.fName;
        console.log("name: " + name);
        doctorDB.doctorReg.remove({ fName: name }, function(err, doc) {
            res.json(doc);
        });
    });

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/api/getContacts/:uid', function(req, res) {
        var contacts = [{
            name: 'Anna',
            phone: '408 123 4567',
            info: 'Doctor'
        }, {
            name: 'John Doe',
            phone: '408 123 1223',
            info: 'co-ordinator'
        }, {
            name: 'David M',
            phone: '123 121 1223',
            info: 'Doctor'
        }, {
            name: 'Hari',
            phone: '408 123 1566',
            info: 'insurance agent'
        }, {
            name: 'Jan Yan',
            phone: '408 123 3333',
            info: 'doctor'
        }, {
            name: 'Kaiser Santa Clara',
            phone: '180 000 0000',
            info: 'Hospital'
        }];
        res.json(contacts);
    });


    // sample api route
    app.get('/api/getPrescriptions/:uid', function(req, res) {
        var medicines = [{
            name: 'Abacavir Sulfate',
            qty: '10',
            time: '10:30 am'
        }, {
            name: 'Plenaxis',
            qty: '2',
            time: '12.00 pm'
        }, {
            name: 'Accolate',
            qty: '50',
            time: '3:00 pm'
        }, {
            name: 'Aminosyn HF 8%',
            qty: '23',
            time: '7:00 pm'
        }, {
            name: 'Azulfidine EN',
            qty: '44',
            time: '5:00 pm'
        }, {
            name: 'Azactam',
            qty: '34',
            time: '9:00 am'
        }];
        res.json(medicines);
    });

    // sample api route
    app.get('/api/getAppointments/:uid', function(req, res) {
        var contacts = [{
            name: 'Dr. Abilash',
            date: '12/01/2016',
            time: '1:00 pm',
            location: 'Kaiser Permanente Santa Clara ',
            address: '700 Lawrence Expressway, Santa Clara, CA 95051',
            description: 'General check up'
        }, {
            name: 'Dr. Jim carry',
            date: '22/01/2016',
            time: '11:00 am',
            location: 'Palo Alto Medical Foundation',
            address: '2734 El Camino Real, Santa Clara, CA 95051',
            description: 'Blood Pressure screening'
        }, {
            name: 'Dr. Margaret Mahony',
            date: '12/02/2016',
            time: '2:00 pm',
            location: 'Kaiser Permanente Santa Clara ',
            address: '700 Lawrence Expressway, Santa Clara, CA 95051',
            description: 'General check up'
        }, {
            name: 'Dr. Hu Rona Jane MD',
            date: '22/02/2016',
            time: '10:40 am',
            location: 'Stanford medical center',
            address: '401 Quarry Rd, Palo Alto, CA 94304',
            description: 'Specialist check up'
        }];
        res.json(contacts);
    });

    // sample api route
    app.post('/api/authenticate', function(req, res) {
        var data = req.body;
        var user;


        if (data.username === 123) {
            user = {
                error: 'User not found'
            };
        } else {
            user = {
                name: 'John Doe',
                phone: '408 123 1234',
                uid: 1234
            };
        }


        res.json(user);
    });

    app.get('/api/authenticate', function(req, res) {
        console.log("connected to server");
    });


    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load our public/index.html file
    });

};
