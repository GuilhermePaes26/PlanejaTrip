/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BusesService } from './buses.service';

@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Post()
  async create(@Body() createBusDto: any) {
    return this.busesService.create(createBusDto);
  }

  @Get()
  async findAll() {
    return this.busesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.busesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBusDto: any) {
    return this.busesService.update(id, updateBusDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.busesService.remove(id);
  }
}
