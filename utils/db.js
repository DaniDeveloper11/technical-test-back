const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "../database.json");

const readDB = () => {
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    } catch (error) {
        return { users: [] };
    }
};

const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

exports.getUsers = () => readDB().users;
exports.saveUsers = (users) => writeDB({ users });
