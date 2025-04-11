import { Controller, Post, Get, Body } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags') // <== Este string define la ruta base
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.tagService.create(body.name);
  }
}

