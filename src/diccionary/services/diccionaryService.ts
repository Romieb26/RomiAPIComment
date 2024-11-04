import { DiccionaryRepository } from "../repositories/DiccionaryRepository";
import { Diccionary } from "../models/Diccionary";

export class DiccionaryService {
    public static async getAllWords(): Promise<Diccionary[]> {
        return await DiccionaryRepository.findAll();
    }

    public static async searchWord(searchTerm: string): Promise<Diccionary[]> {
        return await DiccionaryRepository.findByWordOrInitial(searchTerm);
    }

    public static async addWord(word: Diccionary): Promise<Diccionary> {
        return await DiccionaryRepository.createWord(word);
    }

    public static async modifyWord(word_id: number, wordData: Partial<Diccionary>): Promise<boolean> {
        return await DiccionaryRepository.updateWord(word_id, wordData);
    }

    public static async deleteWord(word_id: number): Promise<boolean> {
        return await DiccionaryRepository.deleteWord(word_id);
    }

    public static async getWordsByInitialLetter(letter: string): Promise<Diccionary[]> {
        return await DiccionaryRepository.findByInitialLetter(letter);
    }
    
}
