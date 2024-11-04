import { CommentRepository } from "../repositories/commetRepository";
import { Comment } from "../models/Comment";

export class CommentService {
    // Obtener todos los comentarios
    public static async getAllComments(): Promise<Comment[]> {
        return await CommentRepository.findAll();
    }

    // Obtener un comentario específico por ID
    public static async getCommentById(commentId: number): Promise<Comment | null> {
        return await CommentRepository.findById(commentId);
    }

    // Agregar un nuevo comentario
    public static async addComment(comment: Comment): Promise<Comment> {
        return await CommentRepository.createComment(comment);
    }

    // Modificar un comentario existente por ID
    public static async modifyComment(id: number, commentData: Partial<Comment>): Promise<boolean> {
        return await CommentRepository.updateComment(id, commentData);
    }

    // Marcar un comentario como eliminado por ID
    public static async deleteComment(id: number): Promise<boolean> {
        return await CommentRepository.deleteComment(id);
    }
}
