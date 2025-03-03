// middlewares/errorHandler.js

import { AppError } from "../errors/appError.js";
/*
Utilizado para manejar mejor los errores en el backend y dar respuesta al
frontend 
*/
const errorHandler = (err, req, res, next) => {
  // Verifica si el error es una instancia de AppError
  if (err instanceof AppError) {
    return res.status(err.httpCode || 500).json({
      message: err.message,
      description: err.description || 'Descripción no proporcionada',
    });
  }

  // Si no es un AppError, devuelve un error genérico
  res.status(500).json({
    message: 'Algo salió mal, por favor intente nuevamente más tarde.',
  });
};

export default errorHandler;
