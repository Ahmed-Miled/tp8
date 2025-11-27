import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	// Récupérer les tâches depuis le backend
	useEffect(() => {
		axios
			.get("http://localhost:5000/api/tasks")
			.then((response) => setTasks(response.data))
			.catch((err) => console.error("Erreur :", err));
	}, []);

	const handleAddTask = () => {
		if (newTask) {
			axios
				.post("http://localhost:5000/api/tasks", { title: newTask })
				.then((response) => {
					setTasks([...tasks, response.data]);
					setNewTask("");
				})
				.catch((err) => console.error("Erreur :", err));
		}
	};

	return (
		<div>
			<h1>Liste des tâches</h1>

			<input
				type="text"
				value={newTask}
				onChange={(e) => setNewTask(e.target.value)}
				placeholder="Ajouter une tâche"
			/>

			<button onClick={handleAddTask}>Ajouter</button>

			<ul>
				{tasks.map((task) => (
					<li key={task._id}>{task.title}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
