const {mongoose} = require('./mongoose');
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
	_id: { type: String, unique: true },
	full_name: String,
	position: String,
	department: String,
	gender: String
});

const Employee = mongoose.model('User', EmployeeSchema);

module.exports = {
	Employee
}