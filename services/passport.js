const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('./../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	// first arg is always error if there is one
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('profile: ' + profile.name);
			// This query returns a PROMISE, which a tool to handle async code
			User.findOne({ userId: profile.id }).then(existingUser => {
				if (existingUser) {
					// Tells passport that we're done with the callback
					// Passes null as 'no issues', and existingUser as the user!
					done(null, existingUser);
				} else {
					// create new user
					new User({ userId: profile.id })
						// Save it to the DB
						.save()
						// tells passport done with this process and return user
						.then(user => done(null, user));
				}
			});
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookClientID,
			clientSecret: keys.facebookClientSecret,
			callbackURL: '/auth/facebook/return'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('profile: ' + profile.name);
			User.findOne({ userId: profile.id }).then(existingUser => {
				if (existingUser) {
					done(null, existingUser);
				} else {
					new User({ userId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
