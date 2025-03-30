/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip, TripDocument } from './trip.schema';

@Injectable()
export class TripsService {
  constructor(@InjectModel(Trip.name) private tripModel: Model<TripDocument>) {}

  async create(createTripDto: any): Promise<Trip> {
    const createdTrip = new this.tripModel(createTripDto);
    return createdTrip.save();
  }

  async findAll(): Promise<Trip[]> {
    return this.tripModel
      .find()
      .populate('onibus')
      .populate('passageiros')
      .exec();
  }

  async findOne(id: string): Promise<Trip> {
    const trip = await this.tripModel
      .findById(id)
      .populate('onibus')
      .populate('passageiros')
      .exec();
    if (!trip) {
      throw new NotFoundException(`Viagem com ID "${id}" não encontrada`);
    }
    return trip;
  }

  async update(id: string, updateTripDto: any): Promise<Trip> {
    const updatedTrip = await this.tripModel
      .findByIdAndUpdate(id, updateTripDto, { new: true })
      .exec();
    if (!updatedTrip) {
      throw new NotFoundException(`Viagem com ID "${id}" não encontrada`);
    }
    return updatedTrip;
  }

  async remove(id: string): Promise<Trip> {
    const deletedTrip = await this.tripModel.findByIdAndDelete(id).exec();
    if (!deletedTrip) {
      throw new NotFoundException(`Viagem com ID "${id}" não encontrada`);
    }
    return deletedTrip;
  }
}
