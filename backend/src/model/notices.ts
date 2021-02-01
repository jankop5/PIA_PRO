import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Notices = new Schema({
    idN: {
        type: Number
    },
    title: {
        type: String
    },
    text: {
        type: String
    },
    uploadNames: {
        type: Array
    },
    originalNames: {
        type: Array
    },
    codes: {
        type: Array
    },
    date: {
        type: String
    },
    teacher: {
        type: String
    }
});

export default mongoose.model('Notices', Notices, 'notices');