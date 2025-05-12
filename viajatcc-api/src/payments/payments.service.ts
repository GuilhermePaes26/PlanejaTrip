/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Payment, PaymentDocument } from './payment.schema';
import { User, UserDocument } from '../users/user.schema';
import { Trip, TripDocument } from '../trips/trip.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    const key = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY não está definido no ambiente');
    }
    this.stripe = new Stripe(key, { apiVersion: '2025-04-30.basil' });
  }

  async createPaymentIntent(
    dto: CreatePaymentIntentDto,
  ): Promise<{ clientSecret: string }> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: dto.amount,
        currency: dto.currency,
      });
      return { clientSecret: paymentIntent.client_secret };
    } catch (err) {
      throw new InternalServerErrorException(
        'Erro ao criar PaymentIntent no Stripe',
      );
    }
  }

  async processPayment(dto: ProcessPaymentDto): Promise<Payment> {
    console.log('Processando pagamento', dto);

    let pi: Stripe.PaymentIntent;
    try {
      pi = await this.stripe.paymentIntents.create({
        amount: Math.round(dto.valor * 100),
        currency: 'brl',
        payment_method: 'pm_card_visa',
        confirm: true,
        payment_method_types: ['card'],
      });
    } catch (err: any) {
      console.error('❌ Erro no PaymentIntent:', err);
      throw new BadRequestException(err.message);
    }

    if (pi.status !== 'succeeded') {
      throw new BadRequestException('Pagamento não aprovado');
    }

    // 2) Persiste no Mongo dentro de transação
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const createDto: CreatePaymentDto = {
        usuario_id: dto.usuario_id,
        viagem_id: dto.viagem_id,
        valor: dto.valor,
        metodo: 'card',
        data_pagamento: new Date(pi.created! * 1000),
      };
      const newPayment = new this.paymentModel(createDto);
      const saved = await newPayment.save({ session });

      await this.userModel.findByIdAndUpdate(
        dto.usuario_id,
        { $addToSet: { pagamentos: saved._id, viagens: dto.viagem_id } },
        { session },
      );
      await this.tripModel.findByIdAndUpdate(
        dto.viagem_id,
        { $addToSet: { passageiros: dto.usuario_id } },
        { session },
      );

      await session.commitTransaction();
      session.endSession();
      return saved;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(
        'Erro ao salvar o pagamento no banco',
      );
    }
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const newPayment = new this.paymentModel(createPaymentDto);
      const savedPayment = await newPayment.save({ session });

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
      throw new InternalServerErrorException(
        'Erro ao salvar pagamento no banco',
      );
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
      throw new NotFoundException(`Pagamento com ID "${id}" não encontrado"`);
    }
    return payment;
  }

  async update(
    id: string,
    updatePaymentDto: Partial<CreatePaymentDto>,
  ): Promise<Payment> {
    const updated = await this.paymentModel
      .findByIdAndUpdate(id, updatePaymentDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Pagamento com ID "${id}" não encontrado`);
    }
    return updated;
  }

  async remove(id: string): Promise<Payment> {
    const deleted = await this.paymentModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Pagamento com ID "${id}" não encontrado`);
    }
    return deleted;
  }
}
