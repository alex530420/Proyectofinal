// Importando biblioteca de validacion
import * as Yup from 'yup';

import log from '../../config/winston';

// Creando un esquema de validación para el proyecto
const projectSchema = Yup.object().shape({
  Autor: Yup.string().required('Es necesario ingresar el nombre del Autor'),
  Categoria: Yup.string().required('Debe ingresar una Categoria'),
  ISBN: Yup.string().required('Es necesario ingresar un ISBN'),
  Existencias: Yup.string().required('Es necesario ingresar las Existencias'),
  Descripcion: Yup.string().required('Es necesario ingresar una Descripcion'),
});

// Creando el extractor de datos de la petición
const getProject = (req) => {
  // Extrayendo datos de la petición
  const { Nombre, Autor, Categoria, ISBN, Existencias, Descripcion } = req.body;
  log.info(
    `Se extraen datos de la petición: Nombre ${Nombre} ,Autor ${Autor}, Categoria: ${Categoria}, ISBN ${ISBN}, Descripcion ${Descripcion} `,
  );
  // Regresando el objeto proyecto
  return {
    Autor,
    Categoria,
    ISBN,
    Existencias,
    Descripcion,
    Nombre,
  };
};

export default {
  projectSchema,
  getProject,
};
