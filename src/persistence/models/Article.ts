import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const { Schema } = mongoose;

const articleSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: false
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    tags: {
        type: Array,
        require: true
    },
    articleId: {
        type: Number,
        require: true
    }
});

articleSchema.plugin(AutoIncrement, { inc_field: 'articleId' });
export default mongoose.model('article', articleSchema);
