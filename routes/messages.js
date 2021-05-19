const router = require('express').Router();
let Message = require('../models/message.model');

// Create a message
router.route('/').post((req, res) => {
    const content = req.body.content;
    const sender = req.body.sender;

    const message = new Message({ content, sender });

    message.save()
        .then(() => res.status(200).json({ message }))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
});

// Get all messages
router.route('/').get((req, res) => {
    Message.find({})
        .then(messages => res.status(200).json({ messages }))
        .catch(err => res.status(400).json(err));
});

module.exports = router;