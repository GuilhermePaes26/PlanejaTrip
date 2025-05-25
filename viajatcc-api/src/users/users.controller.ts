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
import { UsersService } from './users.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: any,
  ) {
    if (file) {
      const url = await this.cloudinary.uploadImage(file.path);
      createUserDto.imgLink = url;
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  @Post('login')
  async login(@Body() loginDto: any) {
    console.log('chegou aqui');
    const { email, password } = loginDto;
    const user = await this.usersService.findEmail(email);
    if (user.senha == password) {
      return user;
    } else {
      return false;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDto: any,
  ) {
    if (file) {
      updateUserDto.imgLink = await this.cloudinary.uploadImage(file.path);
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
