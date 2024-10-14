import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const { Schema } = mongoose;

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        require: true
    },
    answer: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    
});

commentSchema.plugin(AutoIncrement, { inc_field: 'commentId' });
export default mongoose.model('comment', commentSchema);
