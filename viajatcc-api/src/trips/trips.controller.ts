/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('trips')
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTripDto: any,
  ) {
    if (file) {
      const url = await this.cloudinary.uploadImage(file.path);
      createTripDto.imgLink = url;
    }
    return this.tripsService.create(createTripDto);
  }

  @Get()
  async findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tripsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTripDto: any) {
    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tripsService.remove(id);
  }
}
