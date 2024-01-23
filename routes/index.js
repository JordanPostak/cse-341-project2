//...This is the routes/index.js file...

const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World, swagger data on home page']
res.send('Hello World, this is the data on the home page');
});

router.use('/users', require('./users'));

module.exports = router;