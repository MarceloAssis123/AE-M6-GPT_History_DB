import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export async function newStory(querry: string): Promise<string> {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{
            role: 'system',
            content: `Você agora é um gerador de histórias, crie novas histórias a partir do contexto que o usuário informar, suas histórias devem ser de no máximo 300 caracteres`
        },
        {
            role: 'user',
            content: querry
        }
        ],
        model: 'gpt-3.5-turbo',
    });
    return chatCompletion.choices[0].message.content
}

export async function storyContinuation(querry: string, historyContent: string): Promise<string> {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{
            role: 'system',
            content: `Você agora é um gerador de histórias, crie continuações de histórias a partir de uma anterior, suas continuações devem ser de no máximo 100 caracteres`
        },
        {
            role: 'system',
            content: `Faça uma continuação dessa história:
            ${historyContent}`
        },
        {
            role: 'user',
            content: querry
        }
        ],
        model: 'gpt-3.5-turbo',
    });
    return chatCompletion.choices[0].message.content
}