var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
  firstName:  String,
  lastName: String,
  gender: String,
  dob: Date,
  insurance: String,
  isHomeless: Boolean,
  race: String
});


// assign a function to the "methods" object of our animalSchema
patientSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Patient').find({ type: this.type }, cb);
}

var Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;