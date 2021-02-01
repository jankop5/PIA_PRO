import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Courses = new Schema({
    coursename: {
        type: String
    },
    codes: [{
        type: String
    }],
    showExams: {
        type: Boolean
    },
    showLabs: {
        type: Boolean
    },
    showProject: {
        type: Boolean
    },
    labInfo: {
        type: String
    },
    projectInfo: {
        type: String
    }
});

export default mongoose.model('Courses', Courses, 'courses');