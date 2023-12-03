// importando mongoose
import mongoose from 'mongoose';
// Desestructurando la funcion Schema Special
const { Schema } = mongoose;

// Construir un Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Compilando el esquema para
// generar un modelo
export default mongoose.model('project', ProjectSchema);
