const mongoose = require('mongoose')
const personSchema = new mongoose.Schema(
  {
    name: {type: String, required:true},
    email : String,
    password: String
  }
)

const PersonModel = mongoose.model('persons',personSchema)
module.exports = PersonModel