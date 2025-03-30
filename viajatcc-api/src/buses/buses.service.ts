/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bus, BusDocument } from './bus.schema';

@Injectable()
export class BusesService {
  constructor(@InjectModel(Bus.name) private busModel: Model<BusDocument>) {}

  async create(createBusDto: any): Promise<Bus> {
    const createdBus = new this.busModel(createBusDto);
    return createdBus.save();
  }

  async findAll(): Promise<Bus[]> {
    return this.busModel.find().populate('fornecedor_id').exec();
  }

  async findOne(id: string): Promise<Bus> {
    const bus = await this.busModel
      .findById(id)
      .populate('fornecedor_id')
      .exec();
    if (!bus) {
      throw new NotFoundException(`Ônibus com ID "${id}" não encontrado`);
    }
    return bus;
  }

  async update(id: string, updateBusDto: any): Promise<Bus> {
    const updatedBus = await this.busModel
      .findByIdAndUpdate(id, updateBusDto, { new: true })
      .populate('fornecedor_id')
      .exec();
    if (!updatedBus) {
      throw new NotFoundException(`Ônibus com ID "${id}" não encontrado`);
    }
    return updatedBus;
  }

  async remove(id: string): Promise<Bus> {
    const deletedBus = await this.busModel.findByIdAndDelete(id).exec();
    if (!deletedBus) {
      throw new NotFoundException(`Ônibus com ID "${id}" não encontrado`);
    }
    return deletedBus;
  }
}
