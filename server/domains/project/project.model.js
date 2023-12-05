// importando mongoose
import mongoose from 'mongoose';
// Desestructurando la funcion Schema Special
const { Schema } = mongoose;

// Construir un Schema
const ProjectSchema = new Schema({
  Nombre: {
    type: String,
    required: true,
  },
  Autor: {
    type: String,
    required: true,
  },
  Categoria: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  Existencias: {
    type: String,
    required: true,
  },
  Descripcion: {
    type: String,
    required: true,
  },
});

// Compilando el esquema para
// generar un modelo
export default mongoose.model('project', ProjectSchema);
