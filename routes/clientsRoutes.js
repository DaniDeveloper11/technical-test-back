const express = require("express");
const clientsController = require("../controllers/clientsController.js"); 
const authenticateUser = require("../middleware/authMiddleware.js"); 

console.log("clientsController:", clientsController);
console.log("authenticateUser:", authenticateUser);


const router = express.Router();

// Definir las rutas asegurando que las funciones existen
router.get("/", authenticateUser, clientsController.getClients);
router.get("/:id", authenticateUser, clientsController.getClientById);
router.post("/", authenticateUser, clientsController.createClient);
router.put("/:id", authenticateUser, clientsController.updateClient);
router.delete("/:id", authenticateUser, clientsController.deleteClient);

module.exports = router;
