const {mongoose} = require('./mongoose');
var Schema = mongoose.Schema;

var SpecsSchema = new Schema({
	_id: { type: String, unique: true },
    specs: String,
    setup_pic: String
});

const Specs = mongoose.model('User', SpecsSchema);

module.exports = {
	Specs
}