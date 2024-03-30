import {Schema, model, models} from 'mongoose';

// schema requires
const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId, // ObjectId - special type used by MongoDB to store document IDs, designed to be scalable providing unique identifier
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt required']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'],
    }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema );

export default Prompt;