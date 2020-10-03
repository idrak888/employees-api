const express = require('express');
const bodyParser = require('body-parser');
const { Employee } = require('./db/Employee');
const { Specs } = require('./db/Specs');
 
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

app.post("/register_spec", (req, res) => {
	var NewSpecsInfo = new Specs({
        _id: req.body.user_id,
		specs: req.body.specs,
		setup_pic: req.body.setup_pic
	});

	NewSpecsInfo.save().then((doc) => {
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






//discord pc specs bot stuff
app.get("/all_specs", (req, res) => {
	Specs.find().then(doc => {
        res.send(doc);
    }).catch(e => {
		res.send(e);
	});
});

app.get("/specs/:id", (req, res) => {
	var _id = req.params.id;
 
	Specs.find({_id}).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.post("/register_spec", (req, res) => {
	var NewSpecsInfo = new Specs({
        _id: req.body.user_id,
		specs: req.body.specs,
		setup_pic: req.body.setup_pic
	});

	NewSpecsInfo.save().then((doc) => {
		res.send(doc);
	}).catch(e => {
        res.send(e);
    });
});

app.post("/update_specs/:id", (req, res) => {
	var _id = req.params.id;
	
	if (req.body.specs !== "" && req.body.setup_pic !== "") {
		Specs.findOneAndUpdate({ _id }, { specs: req.body.specs, setup_pic: req.body.setup_pic }).then(doc => {
			res.send(doc);
		}).catch(e => {
			res.send(e);
		});
	} else if (req.body.specs !== "") {
		Specs.findOneAndUpdate({ _id }, { specs: req.body.specs }).then(doc => {
			res.send(doc);
		}).catch(e => {
			res.send(e);
		});
	} else if (req.body.setup_pic !== "") {
		Specs.findOneAndUpdate({ _id }, { setup_pic: req.body.setup_pic }).then(doc => {
			res.send(doc);
		}).catch(e => {
			res.send(e);
		});
	}
	
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});