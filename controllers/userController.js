const db = require("../utils/db");

exports.getUsers = (req, res) => {
    const users = db.getUsers().map(user => ({
        email: user.email,
        password: user.password 
    }));

    res.json(users);
};

