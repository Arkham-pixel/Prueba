import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from './note/note.module';
import { Note } from './note/note.entity';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/tag.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'notesdb',
      entities: [Note, Tag],
      synchronize: true,
    }),
    NoteModule,
    TagModule, // 👈 esto debe estar
  ],
})
export class AppModule {}