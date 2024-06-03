import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(createUserDto: { name: string; email: string; age: number }): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    async findAllUser(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findUserByEmail(email: string): Promise<User | string> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new NotFoundException(`Usuário com o email ${email} não existe`);
        }
        return user;
    }

    async deleteUserByEmail(email: string): Promise<{ deleted: boolean } | string> {
        const result = await this.userModel.deleteOne({ email }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Usuário com o email ${email} não existe`);
        }
        return { deleted: true };
    }

    async updateUserByEmail(email: string, updateUserDto: any): Promise<User> {
        const updatedUser = await this.userModel.findOneAndUpdate({ email }, { $set: updateUserDto }, { new: true }).exec();
        if (!updatedUser) {
            throw new NotFoundException(`Usuário com o email ${email} não existe`);
        }
        return updatedUser;
    }
}
