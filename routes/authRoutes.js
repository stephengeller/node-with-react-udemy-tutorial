const passport = require('passport');

// passes app as the argument to our routes, so it can be used in index.js
module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email ']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get(
		'/auth/facebook/return',
		passport.authenticate('facebook', { failureRedirect: '/login' }),
		function(req, res) {
			res.redirect('/');
		}
	);
};
