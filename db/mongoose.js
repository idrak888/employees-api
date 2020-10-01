const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://mrabyss:8nov2016@cluster0.m6uzx.mongodb.net/clusterbite?retryWrites=true&w=majority');

module.exports = {
	mongoose
}