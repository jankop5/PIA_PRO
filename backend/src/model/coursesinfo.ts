import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let CoursesInfo = new Schema({
    coursename: {
        type: String
    },
    code: {
        type: String
    },
    type: { // obavezan, izborni
        type: String
    },
    lessions: {
        type: String
    },
    espb: {
        type: Number
    },
    terms: {
        type: String
    },
    module: { // SI, RTI, ostali, master
        type: String
    },
    semester: {
        type: Number
    },
    goal: {
        type: String
    },
    outcome: {
        type: String
    },
    propositions:{
        type: String
    }
});

export default mongoose.model('CoursesInfo', CoursesInfo, 'coursesinfo');