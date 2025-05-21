/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body() dto: CreatePaymentIntentDto,
  ): Promise<{ clientSecret: string }> {
    return this.paymentsService.createPaymentIntent(dto);
  }

  @Post('process')
  async processPayment(@Body() dto: ProcessPaymentDto) {
    try {
      return await this.paymentsService.processPayment(dto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  async findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePaymentDto: any) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}
