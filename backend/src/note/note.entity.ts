import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  archived: boolean;

  @ManyToMany(() => Tag, (tag) => tag.notes, {
    cascade: true,
  })
  @JoinTable()
  tags: Tag[];
  
}
