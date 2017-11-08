const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// app.use is using middleware!

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
require('./routes/index')(app);

// if there isn't an env var defined by someone (heroku),
// assign to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
