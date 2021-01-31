import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Files = new Schema({
    uploadName: {
        type: String
    },
    originalName: {
        type: String
    }
});

export default mongoose.model('Files', Files, 'files');