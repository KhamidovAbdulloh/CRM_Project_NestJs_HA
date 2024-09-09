import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorEntity } from './entities/tutor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TutorEntity])],
  controllers: [TutorController],
  providers: [TutorService]
})
export class TutorModule {}
