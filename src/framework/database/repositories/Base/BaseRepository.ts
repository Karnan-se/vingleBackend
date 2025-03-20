
import { Model } from "mongoose";
import { IBaseRepository } from "../../../../entitties/interfaces/BaseRepository.ts/IBaseRepository";

export class BaseRepository <T> implements IBaseRepository <T>{
    protected model: Model<T>

    constructor(model : Model<T> ){
        this.model = model

    }
   
  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

}