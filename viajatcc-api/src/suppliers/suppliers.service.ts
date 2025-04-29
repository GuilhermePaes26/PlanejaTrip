/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier, SupplierDocument } from './supplier.schema';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>,
  ) {}

  async create(createSupplierDto: any): Promise<Supplier> {
    const createdSupplier = new this.supplierModel(createSupplierDto);
    return createdSupplier.save();
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierModel.find().exec();
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await (await this.supplierModel.findById(id)).populated('buses').exec();
    if (!supplier) {
      throw new NotFoundException(`Fornecedor com ID "${id}" não encontrado`);
    }
    return supplier;
  }

  async update(id: string, updateSupplierDto: any): Promise<Supplier> {
    const updatedSupplier = await this.supplierModel
      .findByIdAndUpdate(id, updateSupplierDto, { new: true })
      .exec();
    if (!updatedSupplier) {
      throw new NotFoundException(`Fornecedor com ID "${id}" não encontrado`);
    }
    return updatedSupplier;
  }

  async remove(id: string): Promise<Supplier> {
    const deletedSupplier = await this.supplierModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedSupplier) {
      throw new NotFoundException(`Fornecedor com ID "${id}" não encontrado`);
    }
    return deletedSupplier;
  }
}
