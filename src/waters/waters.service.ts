import { Injectable } from '@nestjs/common'
import { CreateWaterInput } from './dto/create-water.input'
import { UpdateWaterInput } from './dto/update-water.input'

@Injectable()
export class WatersService {
  create(createWaterInput: CreateWaterInput) {
    return 'This action adds a new water'
  }

  findAll() {
    return 'This action returns all waters'
  }

  findOne(id: number) {
    return `This action returns a #${id} water`
  }

  update(id: number, updateWaterInput: UpdateWaterInput) {
    return `This action updates a #${id} water`
  }

  remove(id: number) {
    return `This action removes a #${id} water`
  }
}
