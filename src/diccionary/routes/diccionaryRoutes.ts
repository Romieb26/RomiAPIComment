import { Router } from 'express';
import { getWords, searchWord, createWord, updateWord, deleteWord, getWordsByInitialLetter } from '../controllers/diccionaryControllers';

const diccionaryRoutes: Router = Router();

diccionaryRoutes.get('/', getWords);
diccionaryRoutes.get('/search/:searchTerm', searchWord); // Endpoint de búsqueda exacta
diccionaryRoutes.post('/', createWord);
diccionaryRoutes.put('/:word_id', updateWord);
diccionaryRoutes.delete('/:word_id', deleteWord);
diccionaryRoutes.get('/filter/:letter', getWordsByInitialLetter);

export default diccionaryRoutes;
