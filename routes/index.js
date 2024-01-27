//...This is the routes/index.js file...

const router = require('express').Router();
const passport = require('passport');
const mongodb = require('../data/database');

router.use('/', require('./swagger'));
router.use('/authors', require('./authors'));
router.use('/blogs', require('./blogs'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;