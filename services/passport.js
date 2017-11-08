const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./../config/keys');

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('accessToken: ' + accessToken);
			console.log('refreshToken: ' + refreshToken);
			console.log('profile: ' + profile.id);
			console.log('profile: ' + profile.name.familyName);
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: '199997663877358',
			clientSecret: '51d374c35ead52b6e7c53ebfa65cb8a5',
			callbackURL: 'http://localhost:5000/auth/facebook/return'
		},
		function(accessToken, refreshToken, profile, cb) {
			console.log(profile);
		}
	)
);
