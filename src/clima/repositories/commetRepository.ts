import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from '../../shared/config/database';
import { Comment } from '../models/Comment';

export class CommentRepository {
    // Obtener todos los comentarios no eliminados
    public static async findAll(): Promise<Comment[]> {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT id, comentario, created_at, updated_at, deleted FROM comentarios WHERE deleted = 0',
                (error, results) => {
                    if (error) {
                        console.error("Error fetching comments:", error);
                        reject(error);
                    } else {
                        resolve(results as Comment[]);
                    }
                }
            );
        });
    }

    // Obtener un comentario específico por ID
    public static async findById(commentId: number): Promise<Comment | null> {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT id, comentario, created_at, updated_at, deleted FROM comentarios WHERE id = ? AND deleted = 0',
                [commentId],
                (error, results) => {
                    if (error) {
                        console.error("Error fetching comment by ID:", error);
                        reject(error);
                    } else {
                        const rows = results as RowDataPacket[];
                        resolve(rows.length > 0 ? (rows[0] as Comment) : null);
                    }
                }
            );
        });
    }

    // Crear un nuevo comentario
    public static async createComment(commentData: Comment): Promise<Comment> {
        const query = 'INSERT INTO comentarios (comentario, created_at, updated_at, deleted) VALUES (?, NOW(), NOW(), 0)';
        const { comentario } = commentData;
    
        if (!comentario) {
            throw new Error("The 'comentario' field is required and must be defined.");
        }
    
        return new Promise((resolve, reject) => {
            connection.execute(query, [comentario], (error, result: ResultSetHeader) => {
                if (error) {
                    console.error("Error inserting comment:", error);
                    reject(error);
                } else {
                    resolve({ ...commentData, id: result.insertId });
                }
            });
        });
    }
    
    // Actualizar un comentario existente por ID
    public static async updateComment(id: number, commentData: Partial<Comment>): Promise<boolean> {
        const query = 'UPDATE comentarios SET comentario = ?, updated_at = NOW() WHERE id = ? AND deleted = 0';
        return new Promise((resolve, reject) => {
            connection.execute(query, [commentData.comentario, id], (error) => {
                if (error) {
                    console.error("Error updating comment:", error);
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    // Marcar un comentario como eliminado por ID
    public static async deleteComment(id: number): Promise<boolean> {
        const query = 'UPDATE comentarios SET deleted = 1 WHERE id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [id], (error) => {
                if (error) {
                    console.error("Error deleting comment:", error);
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }
}
