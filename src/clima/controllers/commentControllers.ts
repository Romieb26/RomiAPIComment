import { Request, Response } from 'express';
import { CommentService } from '../services/commentServices';

// Obtener todos los comentarios
export const getComments = async (_req: Request, res: Response) => {
    try {
        const comments = await CommentService.getAllComments();
        res.status(200).json(comments);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un comentario específico por ID
export const getCommentById = async (req: Request, res: Response) => {
    try {
        const commentId = parseInt(req.params.comment_id, 10);
        const comment = await CommentService.getCommentById(commentId);
        res.status(comment ? 200 : 404).json(comment || { message: "Comentario no encontrado." });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo comentario
export const createComment = async (req: Request, res: Response) => {
    try {
        const newComment = await CommentService.addComment(req.body);
        res.status(201).json(newComment);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un comentario existente por ID
export const updateComment = async (req: Request, res: Response) => {
    try {
        const success = await CommentService.modifyComment(parseInt(req.params.comment_id, 10), req.body);
        res.status(success ? 200 : 404).json(success ? { message: "Comentario actualizado." } : { message: "Comentario no encontrado." });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar (marcar como eliminado) un comentario por ID
export const deleteComment = async (req: Request, res: Response) => {
    try {
        const success = await CommentService.deleteComment(parseInt(req.params.comment_id, 10));
        res.status(success ? 200 : 404).json(success ? { message: "Comentario marcado como eliminado." } : { message: "Comentario no encontrado." });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
