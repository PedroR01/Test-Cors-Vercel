import { Router } from "express";
import { BlogRepository } from "./blogRepository.js";
import { AppError } from "../../errors/appError.js";

const blogInfoRouter = Router();

blogInfoRouter.get("/", async (req, res, next) => {
  try {
    const data = await BlogRepository.getAllBlogsInfo();
    res.send(data);
  } catch (e) {
    next(e);
  }
});

blogInfoRouter.post("/", async (req, res, next) => {
  try {
    const {
      content_sections,
      tag,
      title,
      description,
      featured_pos,
      bucket_folder_url,
    } = req.body;
    const { data, error } = await BlogRepository.addBlog(
      content_sections,
      tag,
      title,
      description,
      featured_pos,
      bucket_folder_url
    );
    if (error)
      throw new AppError(
        error.code,
        error.status,
        "No se añadió el blog correctamente. Revise las credenciales"
      );
    res.send(data);
  } catch (e) {
    // next(e);
    console.log(e);
  }
});

blogInfoRouter.delete("/", async (req, res, next) => {
  try {
    const { title } = req.body;
    const data = await BlogRepository.deleteBlog(title);
    res.send(data);
  } catch (e) {
    next(e);
  }
});

blogInfoRouter.get("/:title", async (req, res, next) => {
  try {
    const { title } = req.params; // El título del blog a actualizar
    const { data, error } = await BlogRepository.getSpecificBlog(title);
    if (error) throw new AppError(error.code, error.status, error.code);
    return res.json(data);
  } catch (err) {
    // Correct
    next(err);
  }
});

blogInfoRouter.put("/update/:oldTitle", async (req, res, next) => {
  try {
    const { oldTitle } = req.params; // El título del blog a actualizar
    const {
      content_sections,
      tag,
      title,
      description,
      featured_pos,
      bucket_folder_url,
    } = req.body;
    const validFields = Object.fromEntries(
      Object.entries({
        content_sections,
        tag,
        title,
        description,
        featured_pos,
        bucket_folder_url,
      }).filter(([_, value]) => value !== null && value !== undefined)
    );

    const { data, error } = await BlogRepository.modifyBlog(
      oldTitle,
      validFields
    );
    if (error) throw new AppError(error.code, error.status, error.code);
    return res.json(data);
  } catch (err) {
    // Correct
    next(err);
  }
});

export default blogInfoRouter;
