import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from './note.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from '../tag/tag.service'; // Importa TagService


describe('NoteController', () => {
  let controller: NoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        {
          provide: NoteService,
          useValue: { addTagsToNote: jest.fn(), getTagsForNote: jest.fn() },
        },
        { provide: TagService, useValue: {} },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() note: Partial<Note>) {
    return this.noteService.create(note);
  }

  @Get('active')
  findAllActive() {
    return this.noteService.findAllActive();
  }

  @Get('archived')
  findAllArchived() {
    return this.noteService.findAllArchived();
  }

  @Get()
  findAll() {
  return this.noteService.findAll();
  }


  @Put(':id/tags')
  addTags(@Param('id') id: number, @Body() body: { tags: string[] }) {
    return this.noteService.addTagsToNote(id, body.tags);
  }



  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.noteService.delete(+id);
  }

  @Get(':id/tags')
  async getTagsForNote(@Param('id') id: number) {
    return this.noteService.getTagsForNote(id);  // Llamada al servicio
  }
  
  

  
}
