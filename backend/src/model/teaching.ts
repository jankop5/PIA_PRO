import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Teaching = new Schema({
    username: {
        type: String
    },
    coursename: {
        type: String
    },
    group: {
        type: String
    }
});

export default mongoose.model('Teaching', Teaching, 'teaching');