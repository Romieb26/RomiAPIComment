import { Request, Response } from 'express';
import { DiccionaryService } from '../services/diccionaryService';

export const getWords = async (_req: Request, res: Response) => {
    try {
        const words = await DiccionaryService.getAllWords();
        res.status(200).json(words);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const searchWord = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.params.searchTerm;
        const words = await DiccionaryService.searchWord(searchTerm);
        res.status(200).json(words);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createWord = async (req: Request, res: Response) => {
    try {
        const newWord = await DiccionaryService.addWord(req.body);
        res.status(201).json(newWord);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateWord = async (req: Request, res: Response) => {
    try {
        const success = await DiccionaryService.modifyWord(parseInt(req.params.word_id, 10), req.body);
        res.status(success ? 200 : 404).json(success ? { message: "Palabra actualizada." } : { message: "Palabra no encontrada." });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteWord = async (req: Request, res: Response) => {
    try {
        const success = await DiccionaryService.deleteWord(parseInt(req.params.word_id, 10));
        res.status(success ? 200 : 404).json(success ? { message: "Palabra eliminada." } : { message: "Palabra no encontrada." });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }

    

};

export const getWordsByInitialLetter = async (req: Request, res: Response) => {
    try {
        const letter = req.params.letter;
        const words = await DiccionaryService.getWordsByInitialLetter(letter);
        res.status(200).json(words);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
