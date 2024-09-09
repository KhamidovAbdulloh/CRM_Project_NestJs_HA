import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TutorEntity } from './entities/tutor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TutorService {
  constructor(@InjectRepository(TutorEntity) private tutorRepo: Repository<TutorEntity>){}
  async create(createTutorDto: CreateTutorDto) {
    const tutor = this.tutorRepo.create({group: {id: createTutorDto.groupId}, ...createTutorDto})
    return await this.tutorRepo.save(tutor)
  }

  async findAll() {
    return await this.tutorRepo.find()
  }

  async findOne(id: string) {
    const tutor = await this.tutorRepo.findOneBy({id})
    if(!tutor) throw new NotFoundException('Tutor not found!')
    return tutor
  }

  async update(id: string, updateTutorDto: UpdateTutorDto) {
    const tutor = await this.tutorRepo.findOneBy({id})
    if(!tutor) throw new NotFoundException('Tutor not found!')
    if(updateTutorDto.name) tutor.name = updateTutorDto.name
    if(updateTutorDto.phone_tutor) tutor.phone_tutor = updateTutorDto.phone_tutor
    if(updateTutorDto.photo) tutor.photo = updateTutorDto.photo
    return await this.tutorRepo.save(tutor)
  }

  async remove(id: string) {
    return await this.tutorRepo.delete(id), "Tutor successfuly deleted"
  }
}
