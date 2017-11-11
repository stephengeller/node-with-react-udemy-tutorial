const mongoose = require('mongoose');
// ES2015 restructuring is this
// const Schema = mongoose.Schema is the same as...
const { Schema } = mongoose;

const userSchema = new Schema({
	userId: String,
	name: String,
	credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
