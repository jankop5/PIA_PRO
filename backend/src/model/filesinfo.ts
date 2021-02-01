import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let FilesInfo = new Schema({
    uploadName: {
        type: String
    },
    originalName: {
        type: String
    },
    coursename: {
        type: String
    },
    type: {
        type: String
    },
    size: {
        type: Number
    },
    kind: {
        type: String
    },
    date: {
        type: String
    },
    teacher: {
        type: String
    },
    order: {
        type: Number
    }
});

export default mongoose.model('FilesInfo', FilesInfo, 'filesinfo');