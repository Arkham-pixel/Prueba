import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { TagService } from '../tag/tag.service'; 
import { Tag } from '../tag/tag.entity';  // Asegúrate de importar correctamente




Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    private tagService: TagService,  // Asegúrate de inyectar TagService
  ) {}
  

  create(note: Partial<Note>) {
    return this.noteRepository.save(note);
  }

  findAllActive() {
    return this.noteRepository.find({ where: { archived: false } });
  }

  findAllArchived() {
    return this.noteRepository.find({ where: { archived: true } });
  }
  findAll() {
    return this.noteRepository.find();
  }
  

  update(id: number, data: Partial<Note>) {
    return this.noteRepository.update(id, data);
  }

  delete(id: number) {
    return this.noteRepository.delete(id);
  }
  async addTagsToNote(noteId: number, tagNames: string[]): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['tags'],  // Relacionamos las etiquetas
    });

    if (!note) {
      throw new Error('Note not found');
    }

    // Busca las etiquetas por nombre
    const tags = await Promise.all(
      tagNames.map((name) => this.tagService.findByName(name)),
    );

    // Asocia las etiquetas a la nota
    note.tags = [...new Set([...note.tags, ...tags])];

    // Guarda la nota con las etiquetas asociadas
    return this.noteRepository.save(note);
  }

  async getTagsForNote(noteId: number): Promise<Tag[]> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['tags'],  // Asegura que las etiquetas asociadas se carguen
    });
  
    if (!note) {
      throw new Error('Note not found');
    }
  
    if (!note) {
      throw new Error('Note not found');
    }
  

  
    // Guarda la nota con las nuevas etiquetas
    return note.tags;  // Devuelve las etiquetas asociadas a la nota
  }
  
  
  
  
  
  
  
}