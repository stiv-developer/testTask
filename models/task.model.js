const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en progreso', 'completada']
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaVencimiento: {
    type: Date
  }
},{collection: 'task'});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;