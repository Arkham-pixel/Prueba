import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { TagService } from '../tag/tag.service';
import { Tag } from '../tag/tag.entity';

describe('NoteService', () => {
  let service: NoteService;
  let noteRepository: any;
  let tagRepository: any;  // Mock de TagRepository

  beforeEach(async () => {
    // Mock para NoteRepository
    noteRepository = {
      save: jest.fn().mockResolvedValue({ tags: [] }),
      findOne: jest.fn().mockResolvedValue({ tags: [] }),
    };

    // Mock para TagRepository
    tagRepository = {
      save: jest.fn().mockResolvedValue({ name: 'Important' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        TagService,
        {
          provide: getRepositoryToken(Note),
          useValue: noteRepository,
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: tagRepository,
        },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add tags to note', async () => {
    // Simula el comportamiento de addTagsToNote
    const result = await service.addTagsToNote(1, ['Important']);
    
    expect(result.tags).toBeDefined();
    expect(result.tags.length).toBe(1);
    expect(result.tags[0].name).toBe('Important');
  });

  // Agrega más pruebas si es necesario
});
