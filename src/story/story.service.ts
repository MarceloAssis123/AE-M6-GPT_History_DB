import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Story } from './story.schema';
import { newStory, storyContinuation } from './openAi';

@Injectable()
export class StoryService {
    constructor(@InjectModel(Story.name) private storyModel: Model<Story>) { }

    async createStory(createStoryDto: { email: string; content: string }): Promise<Story> {
        const newStory = new this.storyModel(createStoryDto);
        return newStory.save();
    }

    async findAllStory(): Promise<Story[]> {
        return this.storyModel.find().exec();
    }

    async findStoryById(id: string): Promise<Story> {
        const story = await this.storyModel.findById(id).exec();
        if (!story) {
            throw new NotFoundException(`História com o id ${id} não existe`);
        }
        return story;
    }

    async updateStory(id: string, updateStoryDto: { email?: string; content?: string }): Promise<Story> {
        const updatedStory = await this.storyModel.findByIdAndUpdate(id, updateStoryDto, { new: true }).exec();
        if (!updatedStory) {
            throw new NotFoundException(`História com o id ${id} não existe`);
        }
        return updatedStory;
    }

    async deleteStory(id: string): Promise<{ deleted: boolean } | string> {
        const result = await this.storyModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`História com o id ${id} not found`);
        }

        return { deleted: true }
    }

    async newStoryGPT(email: string, query: string) {
        const newStoryContent = await newStory(query)

        const createStoryDto = {
            email: email,
            content: newStoryContent
        }
        const newStoryDB = new this.storyModel(createStoryDto);
        return newStoryDB.save();
    }

    async storyContinuationGPT(email: string, querry: string, id: string) {
        const story = await this.storyModel.findById(id).exec();
        if (!story) {
            throw new NotFoundException(`História com o id ${id} não existe`);
        }
        const newStoryContent = await storyContinuation(querry, story.content)
        const updateStoryDto = {
            email,
            content: `${story.content} ${newStoryContent}`
        }
        const updatedStory = await this.storyModel.findByIdAndUpdate(id, updateStoryDto, { new: true }).exec();
        return updatedStory;
    }
}