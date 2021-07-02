var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema(
  {
    company_title: {type: String, required: true},
    tagline: {type: String, required: false},
    description: {type: String, required: false},
    emailAddress: {type: String, required: false},
    logo: {type: String, required: false},
    links: {type: String, required: false},
    members: {type: String, required: false}
  }
)

module.exports = mongoose.model('companys', CompanySchema);