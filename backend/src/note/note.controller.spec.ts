import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { TagService } from '../tag/tag.service';
import { Tag } from '../tag/tag.entity';

describe('NoteController', () => {
  let controller: NoteController;
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        NoteService,
        TagService,
        {
          provide: getRepositoryToken(Note),
          useValue: { save: jest.fn() }, // Mock de NoteRepository
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: { save: jest.fn() }, // Mock de TagRepository
        },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Agrega pruebas para el controlador aquí
});
