import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TutorModule } from './tutor/tutor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from './group/group.module';
import { config } from 'dotenv';
import { PaymentModule } from './payment/payment.module';

config()

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true
  }), StudentModule, TutorModule, GroupModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
