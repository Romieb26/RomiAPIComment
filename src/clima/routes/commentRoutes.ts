import { Router } from 'express';
import { getComments, getCommentById, createComment, updateComment, deleteComment } from '../controllers/commentControllers';

const commentRoutes: Router = Router();

// Rutas para la funcionalidad de comentarios
commentRoutes.get('/', getComments);                        // Obtener todos los comentarios
commentRoutes.get('/:comment_id', getCommentById);          // Obtener un comentario por ID
commentRoutes.post('/', createComment);                     // Crear un nuevo comentario
commentRoutes.put('/:comment_id', updateComment);           // Actualizar un comentario por ID
commentRoutes.delete('/:comment_id', deleteComment);        // Marcar un comentario como eliminado

export default commentRoutes;
