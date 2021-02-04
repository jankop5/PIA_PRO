import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let News = new Schema({
    idN: {
        type: Number
    },
    title: {
        type: String
    },
    text: {
        type: String
    },
    category: {
        type: String
    },
    date: {
        type: String
    }
});

export default mongoose.model('News', News, 'news');