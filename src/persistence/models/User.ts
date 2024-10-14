import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        require: false
    },
    bio: {
        type: String,
        require: false
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    savedArticle: [
        new Schema({
            article: {
                type: Schema.Types.ObjectId,
                ref: 'Article'
            }
        })
    ]
});

userSchema.plugin(AutoIncrement, { inc_field: 'userId' });
export default mongoose.model('user', userSchema);
