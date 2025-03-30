/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { Bus, BusSchema } from './bus.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bus.name, schema: BusSchema }])],
  controllers: [BusesController],
  providers: [BusesService],
})
export class BusesModule {}
