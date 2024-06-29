import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const getImageDescription = async (base64Image) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: [
                    { type: "text", text: "Describe the image in one sentence, max 30 words" },
                    {
                        type: "image_url",
                        image_url: {
                            "url": `${base64Image}`,
                        },
                    }
                ]
            }
        ],
        max_tokens: 100
    });

    return response.choices[0].message.content;
};

export default getImageDescription;
