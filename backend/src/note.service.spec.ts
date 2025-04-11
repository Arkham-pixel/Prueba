// note.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note/note.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './note/note.entity';
import { TagService } from './tag/tag.service';


describe('NoteService', () => {
    let service: NoteService;
  
    const mockNoteRepository = {
      findOne: jest.fn().mockResolvedValue({ id: 1, tags: [], save: jest.fn() }),
      save: jest.fn(),
    };
  
    const mockTagService = {
      findByName: jest.fn().mockResolvedValue({ name: 'Important' }),
    };
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          NoteService,
          { provide: getRepositoryToken(Note), useValue: mockNoteRepository },
          { provide: TagService, useValue: mockTagService },
        ],
      }).compile();
  
      service = module.get<NoteService>(NoteService);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    it('should add tags to note', async () => {
      const result = await service.addTagsToNote(1, ['Important']);
      expect(result.tags.length).toBe(1);
      expect(result.tags[0].name).toBe('Important');
    });
  });
