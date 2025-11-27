const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors()); 
app.use(express.json());

// Connexion à MongoDB
mongoose
	.connect("mongodb://localhost:27017/todoApp")
	.then(() => console.log("Connecté à MongoDB"))
	.catch((err) => console.log("Erreur de connexion à MongoDB :", err));


// --- Schéma & Modèle ---
const taskSchema = new mongoose.Schema({
	title: { type: String, required: true },
	completed: { type: Boolean, default: false }
});

const Task = mongoose.model("Task", taskSchema);


// --- ROUTES ---

// GET : récupérer toutes les tâches
app.get("/api/tasks", async (req, res) => {
	const tasks = await Task.find();
	res.json(tasks);
});

// POST : ajouter une tâche
app.post("/api/tasks", async (req, res) => {
	const newTask = await Task.create({ title: req.body.title });
	res.json(newTask); // renvoie l'objet créé
});


app.listen(5000, () => {
	console.log("Serveur backend en cours d'exécution sur le port 5000");
});
