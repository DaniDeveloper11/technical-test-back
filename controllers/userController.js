const db = require("../utils/db");

exports.getUsers = (req, res) => {
    const users = db.getUsers().map(user => ({ id: user.id, username: user.username }));
    res.json(users);
};
