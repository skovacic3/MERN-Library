const User = require('../models/User');

exports.getAll = (req, res) => {
    User.find({}, (err, users) => {
        res.send(users);
    });
}

exports.getUser = (req, res) => {
    const user = User.findOne({_id: req.params.id}).exec();
    return user;
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, docs) => {
        if(err) res.status(500).send({message: err})
        res.send({message: 'User deleted'});
    })
}