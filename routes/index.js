//...This is the routes/index.js file...

const router = require('express').Router();
const passport = require('passport');
const mongodb = require('../data/database');

router.use('/', require('./swagger'));
router.use('/authors', require('./authors'));
router.use('/blogs', require('./blogs'));
router.use('/comments', require('./comments'));
router.use('/reactions', require('./reactions'));

router.get('/login', passport.authenticate('github'), (req, res) => {
    console.log(req.session);
});

router.get('/logout', function(req, res, next) {
    console.log(req.session);
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;