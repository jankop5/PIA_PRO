import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Lists = new Schema({
    idL: {
        type: Number
    },
    coursename: {
        type: String
    },
    usernames: [{
        type: String
    }],
    originalFileNames: [{
        type: String
    }],
    uploadFileNames: [{
        type: String
    }],
    title: {
        type: String
    },
    date: {
        type: String
    },
    place: {
        type: String
    },
    limit: {
        type: Number
    },
    closed: {
        type: Boolean
    }
});

export default mongoose.model('Lists', Lists, 'lists');