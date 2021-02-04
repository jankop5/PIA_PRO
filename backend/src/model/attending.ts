import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Attending = new Schema({
    username: {
        type: String
    },
    coursename: {
        type: String
    }
});

export default mongoose.model('Attending', Attending, 'attending');