const router = require('express').Router();
let User = require('../models/user.model');

// Create a user
router.route('/').post((req, res) => {
    const name = req.body.name;
    const user = new User({ name });

    user.save()
        .then(() => res.status(200).json({ user }))
        .catch(err => res.status(400).json(err));
});

// Get all users
router.route('/').get((req, res) => {
    User.find({})
        .then(users => res.status(200).json({ users }))
        .catch(err => res.status(400).json(err));
});

module.exports = router;