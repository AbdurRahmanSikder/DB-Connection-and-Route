const passport = require('passport');
const person = require('./models/user');
const LoacalStrategy = require('passport-local').Strategy;


passport.use(new LoacalStrategy(async (USERNAME, password, done) => {
    try {
        const user = await person.findOne({ username: USERNAME });

        if (!user)
            return done(null, false, { message: 'Incorrect username' });

        const isMatch = user.comparePassword(password);

        if (isMatch) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: 'Incorrect Password' });
        }
    }
    catch (err) {
        return done(err);
    }
}))

module.exports = passport;