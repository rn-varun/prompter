import Prompt from "@models/prompt";
import { connectToDB } from "@utils/db";
export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json(); // extract data
    
    try {
        await connectToDB(); // connect to db
        const newPrompt = new Prompt({creator:userId,prompt, tag}) // create new model
        await newPrompt.save(); // saved it

        return new Response(JSON.stringify(newPrompt), {status: 201}) // returned 'hogaya' message
    } catch (error) {
        return new Response('laude lag gaye')
    }
}