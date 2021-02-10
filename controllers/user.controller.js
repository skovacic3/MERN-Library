const User = require('../models/User');

exports.getAll = (req, res) => {
    User.find({}, (err, users) => {
        res.send(users);
    });
}