const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes')(app); // because the 'require' returns a function, using the () after CALLS THE FUNCTION IMMEDIATELY!
require('./routes/index')(app); // because the 'require' returns a function, using the () after CALLS THE FUNCTION IMMEDIATELY!

const PORT = process.env.PORT || 5000; // if there isn't an env var defined by someone (heroku) assign to 5000
app.listen(PORT);
