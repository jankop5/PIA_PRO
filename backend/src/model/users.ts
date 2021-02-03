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
        type: String
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
    passwordChanged:{
        type: Boolean
    },
    type:{// 0 - admin, 1 - zaposleni, 2 - student
        type: Number
    },
    imageName:{
        type: String
    }
});

export default mongoose.model('Users', Users, 'users');