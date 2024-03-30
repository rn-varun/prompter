// get to read, patch to update, delete to delte

import { connectToDB } from "@utils/db";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator')

        if(!prompt){return new Response("Prompt not found", {status:404})}

        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch", {status: 500})
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("nhi mila", {status:404})

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
    } catch (error) {
        return new Response("Failed", {status:500})
    }
}
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted", {status: 200})
    } catch (error) {
        return new Response("failed to delete", {status: 500})
    }
}