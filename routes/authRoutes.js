const passport = require('passport');

// passes app as the argument to our routes, so it can be used in index.js
module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email ']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google')),
		(req, res) => {
			res.redirect('/api/current_user');
		};

	app.get('/api/current_user', (req, res) => {
		// passport automatically attaches req.user, as it's from the cookie
		res.send(req.user);
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get(
		'/auth/facebook/return',
		passport.authenticate('facebook', { failureRedirect: '/login' }),
		(req, res) => {
			res.redirect('/api/current_user');
		}
	);
};
