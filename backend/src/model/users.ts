import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Users = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    website: {
        type: String
    },
    personalData: {
        type: String
    },
    title: {
        type: String
    },
    cabinet: {
        type: Number
    },
    status: {
        type: String
    },
    index: {
        type: String
    },
    typeOfStudy:{
        type: String
    },
    type:{
        type: Number
    }
});

export default mongoose.model('Users', Users, 'users');