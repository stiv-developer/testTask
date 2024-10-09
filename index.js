const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task.model');
const app = express();

app.use(express.json());

// CONECCTION BD
mongoose.connect('mongodb://localhost:27017/task', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// ENDPOINTS

// GET /tasks - Obtener toodas las tareas poro ID
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        console.log(tasks);  // Agrega este log
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// GET /task/:id - Obtener tarea por ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /tasks - Crear nueva tarea

app.post('/tasks', async (req, res) => {
    if (!req.body.titulo) {
        return res.status(400).json({ message: "El campo 'titulo' es requerido" });
    }
    const task = new Task({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        fechaVencimiento: req.body.fechaVencimiento
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /task/:id - Actualizar tarea

app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

        task.titulo = req.body.titulo || task.titulo;
        task.fechaVencimiento = req.body.fechaVencimiento || task.fechaVencimiento;
        task.descripcion = req.body.descripcion || task.descripcion;
        task.estado = req.body.estado || task.estado;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /tasks/:id - Eliminar tarea
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

        res.json({ message: 'Tarea eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /filter-tasks - obtener todas las tareas con opción de filtro
app.get('/filter-tasks', async (req, res) => {

    const { titulo, estado } = req.query;

    const filter = {};

    if (titulo) {
        filter.titulo = new RegExp(titulo, 'i');
    }

    if (estado) {
        filter.estado = estado;
    }

    try {
        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// INICIANDO EL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});