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
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: any,
  ) {
    if (file) {
      try {
        const secureUrl = await this.cloudinary.uploadImageBuffer(file.buffer);
        createUserDto.imgLink = secureUrl;
      } catch {
        throw new HttpException(
          'Erro ao processar imagem no create.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    if (!createUserDto.email || !createUserDto.senha) {
      throw new BadRequestException('Email e senha são obrigatórios');
    }
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuário ${id} não encontrado`);
    }
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDto: any,
  ) {
    if (!file) {
      throw new BadRequestException("Campo 'image' ausente no formulário.");
    }

    let secureUrl: string;
    try {
      secureUrl = await this.cloudinary.uploadImageBuffer(file.buffer);
    } catch {
      throw new HttpException(
        'Erro ao processar imagem no update.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    updateUserDto.imgLink = secureUrl;
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`Usuário ${id} não encontrado`);
    }
    return updatedUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
