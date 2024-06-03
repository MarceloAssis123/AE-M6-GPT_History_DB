import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StoryService } from './story.service';

@Controller('story')
export class StoryController {
    constructor(private readonly storyService: StoryService) { }

    @Post('new')
    createStory(@Body() createStoryDto: { email: string; content: string }) {
        return this.storyService.createStory(createStoryDto);
    }

    @Get('all')
    getAllStories() {
        return this.storyService.findAllStory();
    }

    @Get('find')
    getStoryById(@Body() body: {id: string}) {
        return this.storyService.findStoryById(body.id);
    }

    @Post('update')
    updateStory(@Body() body: { id: string, email?: string; content?: string }) {
        const updateData = {};
        if (body.email) updateData['email'] = body.email;
        if (body.content) updateData['content'] = body.content;
        return this.storyService.updateStory(body.id, updateData);
    }

    @Post('delete')
    deleteStory(@Body() body: { id: string }) {
        return this.storyService.deleteStory(body.id);
    }

    @Post('gpt/new')
    newStoryGPT(@Body() body: { email: string, querry: string }) {
        return this.storyService.newStoryGPT(body.email, body.querry)
    }

    @Post('gpt/continuation')
    storyContinuationGPT(@Body() body: { email: string, querry: string, id: string }) {
        return this.storyService.storyContinuationGPT(body.email, body.querry, body.id)
    }
}