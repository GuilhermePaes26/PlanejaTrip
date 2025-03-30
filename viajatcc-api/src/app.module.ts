/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';
import { PaymentsModule } from './payments/payments.module';
import { BusesModule } from './buses/buses.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/viajatcc'),
    UsersModule,
    TripsModule,
    PaymentsModule,
    BusesModule,
    SuppliersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
