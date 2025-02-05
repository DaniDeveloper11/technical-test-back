const db = require("../utils/db");

const getClients = (req, res) => {
    const userId = req.user?.id; 

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    console.log("User ID en getClients:", userId); 

    const clients = db.getClients();
    console.log("Clientes antes de filtrar:", clients); 

    const filteredClients = clients.filter(client => client.userId === userId);
    console.log("Clientes después de filtrar:", filteredClients); 

    res.json(filteredClients);
};

const getClientById = (req, res) => {
    const clients = db.getClients();
    const client = clients.find(c => c.id === parseInt(req.params.id));
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
};

const createClient = (req, res) => {
    const { name, email, phone, status } = req.body;
    const userId = req.user?.id; // 👈 Asegurar que `req.user.id` existe

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    if (!name || !email || !phone || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const clients = db.getClients();
    const newClient = { id: Date.now(), name, email, phone, status, userId }; // 👈 Agregar `userId`

    clients.push(newClient);
    db.saveClients(clients);

    res.status(201).json({ message: "Client created successfully", client: newClient });
};


const updateClient = (req, res) => {
    const clients = db.getClients();
    const index = clients.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Client not found" });
    clients[index] = { ...clients[index], ...req.body };
    db.saveClients(clients);
    res.json({ message: "Client updated successfully", client: clients[index] });
};

const deleteClient = (req, res) => {
    let clients = db.getClients();
    const index = clients.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Client not found" });
    clients.splice(index, 1);
    db.saveClients(clients);
    res.json({ message: "Client deleted successfully" });
};

// Exportar correctamente
module.exports = { getClients, getClientById, createClient, updateClient, deleteClient };
