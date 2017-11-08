const mongoose = require('mongoose');
// ES2015 restructuring is this
// const Schema = mongoose.Schema is the same as...
const { Schema } = mongoose;

const userSchema = new Schema({
	Id: String,
	name: String
});

mongoose.model('users', userSchema);
