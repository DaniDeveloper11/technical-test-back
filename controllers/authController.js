const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../utils/db");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { email, password, name, phone, role, status } = req.body;

    if (!email || !password || !name || !phone || !role || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const users = db.getUsers();
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { 
        id: Date.now(), 
        email, 
        password: hashedPassword, 
        name, 
        phone, 
        role, 
        status 
    };

    users.push(newUser);
    db.saveUsers(users);

    res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const users = db.getUsers();
    const user = users.find(user => user.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        phone: user.phone, 
        role: user.role, 
        status: user.status 
    }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ 
        token, 
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            role: user.role,
            status: user.status
        }
    });
};
