/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: any): Promise<Omit<User, 'senha'>> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(createUserDto.senha, salt);
    const created = new this.userModel({ ...createUserDto, senha: hash });
    const user = await created.save();
    const obj = user.toObject();
    delete obj.senha;
    return obj;
  }

  async findAll(): Promise<Omit<User, 'senha'>[]> {
    const users = await this.userModel
      .find()
      .populate('viagens')
      .populate('pagamentos')
      .exec();

    return users.map((user) => {
      const obj = user.toObject();
      delete obj.senha;
      return obj;
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .populate('viagens')
      .populate('pagamentos')
      .exec();
    if (!user)
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado`);
    const obj = user.toObject();
    delete obj.senha;
    return obj;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    if (updateUserDto.senha) {
      const salt = await bcrypt.genSalt(10);
      updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, salt);
    }
    const updated = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updated)
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado`);
    const obj = updated.toObject();
    delete obj.senha;
    return obj;
  }

  async remove(id: string): Promise<User> {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleted)
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado`);
    const obj = deleted.toObject();
    delete obj.senha;
    return obj;
  }
}
