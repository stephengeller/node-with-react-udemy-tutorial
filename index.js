const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000; // if there isn't an env var defined by someone (heroku) assign to 5000
app.listen(PORT);
