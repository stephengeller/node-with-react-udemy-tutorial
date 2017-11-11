const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// app.use is using middleware!

app.use(bodyParser.json());
app.use(
	cookieSession({
		// how long cookie can exist before expiring
		// this is 30 days
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// encrypts cookies
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

// because the 'require' returns a function, using the () after
// CALLS THE FUNCTION IMMEDIATELY!
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Make sure express serves up production assets
	// like our main.js file or main.css file
	app.use(express.static('client/build'));
	// if not...
	// express serves up index.html file if it doesn't recognize the file
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// if there isn't an env var defined by someone (heroku),
// assign to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
