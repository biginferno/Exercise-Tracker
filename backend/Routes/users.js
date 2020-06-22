const router = require('express').Router();
let User = require('../models/users');


router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error Get All Users: ', + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User Added!'))
        .catch(err => res.status(401).json('Error Adding User: ' + err));
});

module.exports = router;





