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
    }
});

export default mongoose.model('Lists', Lists, 'lists');