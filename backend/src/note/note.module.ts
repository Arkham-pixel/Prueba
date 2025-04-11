import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TagModule } from '../tag/tag.module'; // 👈 importante

@Module({
  imports: [TypeOrmModule.forFeature([Note]), TagModule], // 👈 agrega aquí
  providers: [NoteService],
  controllers: [NoteController],
})
export class NoteModule {}
