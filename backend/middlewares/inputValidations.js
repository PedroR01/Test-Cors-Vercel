import { AppError } from "../errors/appError.js";

export const validateResendData = (req, res, next) => {
  const { nombre, email, descripcion } = req.body;

  if (!nombre || !email || !descripcion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  if (!/^[A-Za-z\s]+$/.test(nombre)) {
    return res.status(400).json({ error: "Nombre inválido" });
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  if (descripcion.length > 200) {
    return res.status(400).json({ error: "La descripción es demasiado larga" });
  }

  next();
};

export const validateImageData = (req, res, next) => {
  const { imgName, folderName } = req.body;
  if (!folderName && !imgName) {
    throw new AppError(
      "ValidationError",
      400,
      "Todos los Campos son obligatorios"
    );
  }

  if (!/^[A-Za-z\s]+$/.test(folderName)) {
    throw new AppError(
      "ValidationError",
      400,
      "El título de la novedad solo puede poseer caracteres Alfabéticos"
    );
  }
  if (!/^[A-Za-z\s]+$/.test(imgName)) {
    throw new AppError(
      "ValidationError",
      400,
      "El nombre de la imagen debe poseer solo caracteres Alfabéticos"
    );
  }
  next();
};

const ValidationError = "ValidationError"; // Nombre del error como constante externa

export const validateBlogData = (req, res, next) => {
  const {
    tag,
    title,
    description,
    introduction,
    content_sections,
    featured_pos,
    bucket_folder_url,
  } = req.body;

  if (!tag || typeof tag !== "string" || tag.trim() === "") {
    throw new AppError(
      ValidationError,
      400,
      "El campo 'tag' es obligatorio y debe ser un string."
    );
  }

  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new AppError(
      ValidationError,
      400,
      "El campo 'title' es obligatorio y debe ser un string."
    );
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    throw new AppError(
      ValidationError,
      400,
      "El campo 'description' es obligatorio y debe ser un string."
    );
  }

  if (
    !introduction ||
    typeof introduction !== "string" ||
    introduction.trim() === ""
  ) {
    throw new AppError(
      ValidationError,
      400,
      "El campo 'introduction' es obligatorio y debe ser un string."
    );
  }

  if (!content_sections || typeof content_sections !== "object") {
    throw new AppError(
      ValidationError,
      400,
      "El campo 'content_sectic' es obligatorio y debe ser un objeto JSON."
    );
  }

  if (!Number.isInteger(featured_pos)) {
    throw new AppError(
      ValidationError,
      400,
      "El campo 'featured_pos' es obligatorio y debe ser un número entero."
    );
  }

  if (
    !bucket_folder_url ||
    typeof bucket_folder_url !== "string" ||
    bucket_folder_url.trim() === ""
  ) {
    throw new AppError(
      ValidationError,
      400,
      "El campo 'bucket_folder_' es obligatorio y debe ser un string."
    );
  }

  next(); // Continúa con el siguiente middleware si todo está correcto
};

export const validateLogin = (req, res, next) => {};
