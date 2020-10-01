const express = require('express');
const bodyParser = require('body-parser');
const { Employee } = require('./db/Employee');
 
const app = express();
var port = process.env.PORT || 3100;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Expose-Headers", "X-Auth");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	}
	next();
});

app.use(bodyParser.json());

//get all employees
app.get("/employees", (req, res) => {
	Employee.find().then(doc => {
        res.send(doc);
    }).catch(e => {
		res.send(e);
	});
});

//get employees by department
app.get("/employee/:department", (req, res) => {
	var department = req.params.department;
 
	Employee.find({department}).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

//post new employee
app.post("/new_employee", (req, res) => {
	var NewEmployee = new Employee({
        _id: req.body.uid,
		full_name: req.body.full_name,
		position: req.body.position,
        department: req.body.department,
        gender: req.body.gender
	});

	NewEmployee.save().then((doc) => {
		res.send(doc);
	}).catch(e => {
        res.send(e);
    });
});

//update employee position
app.post("/update_employee_position/:id", (req, res) => {
	var _id = req.params.id;
	
	Employee.findOneAndUpdate({ _id }, { position: req.body.new_position }).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

//remove employee
app.delete("/employee/:id", (req, res) => {
	var _id = req.params.id;

	Employee.find({_id}).remove().then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});