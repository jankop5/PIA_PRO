import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Categories = new Schema({
    category: {
        type: String
    }
});

export default mongoose.model('Categories', Categories, 'categories');