const db = require("../utils/db");

// Obtener todos los clientes
exports.getClients = (req, res) => {
    const clients = db.getClients();
    res.json(clients);
};

// Obtener un cliente por ID
exports.getClientById = (req, res) => {
    const clients = db.getClients();
    const client = clients.find(c => c.id === parseInt(req.params.id));

    if (!client) {
        return res.status(404).json({ message: "Client not found" });
    }

    res.json(client);
};

// Crear un nuevo cliente
exports.createClient = (req, res) => {
    const { name, email, phone, status } = req.body;

    if (!name || !email || !phone || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const clients = db.getClients();
    const newClient = { id: Date.now(), name, email, phone, status };

    clients.push(newClient);
    db.saveClients(clients);

    res.status(201).json({ message: "Client created successfully", client: newClient });
};

// Actualizar un cliente por ID
exports.updateClient = (req, res) => {
    const clients = db.getClients();
    const index = clients.findIndex(c => c.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Client not found" });
    }

    const updatedClient = { ...clients[index], ...req.body };
    clients[index] = updatedClient;
    db.saveClients(clients);

    res.json({ message: "Client updated successfully", client: updatedClient });
};

// Eliminar un cliente por ID
exports.deleteClient = (req, res) => {
    let clients = db.getClients();
    const index = clients.findIndex(c => c.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Client not found" });
    }

    clients.splice(index, 1);
    db.saveClients(clients);

    res.json({ message: "Client deleted successfully" });
    
};
