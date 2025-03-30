/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Payment, PaymentDocument } from './payment.schema';
import { User, UserDocument } from '../users/user.schema';
import { Trip, TripDocument } from '../trips/trip.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(createPaymentDto: any): Promise<Payment> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const createdPayment = new this.paymentModel(createPaymentDto);
      const savedPayment = await createdPayment.save({ session });
      await this.userModel.findByIdAndUpdate(
        createPaymentDto.usuario_id,
        {
          $addToSet: {
            pagamentos: savedPayment._id,
            viagens: createPaymentDto.viagem_id,
          },
        },
        { session },
      );
      await this.tripModel.findByIdAndUpdate(
        createPaymentDto.viagem_id,
        {
          $addToSet: {
            passageiros: createPaymentDto.usuario_id,
          },
        },
        { session },
      );

      await session.commitTransaction();
      session.endSession();

      return savedPayment;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel
      .find()
      .populate('usuario_id')
      .populate('viagem_id')
      .exec();
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentModel
      .findById(id)
      .populate('usuario_id')
      .populate('viagem_id')
      .exec();
    if (!payment) {
      throw new NotFoundException(`Pagamento com ID "${id}" não encontrado`);
    }
    return payment;
  }

  async update(id: string, updatePaymentDto: any): Promise<Payment> {
    const updatedPayment = await this.paymentModel
      .findByIdAndUpdate(id, updatePaymentDto, { new: true })
      .exec();
    if (!updatedPayment) {
      throw new NotFoundException(`Pagamento com ID "${id}" não encontrado`);
    }
    return updatedPayment;
  }

  async remove(id: string): Promise<Payment> {
    const deletedPayment = await this.paymentModel.findByIdAndDelete(id).exec();
    if (!deletedPayment) {
      throw new NotFoundException(`Pagamento com ID "${id}" não encontrado`);
    }
    return deletedPayment;
  }
}
