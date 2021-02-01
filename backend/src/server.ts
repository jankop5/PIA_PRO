import express, { Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { Error } from 'mongoose';
import users from './model/users';
import courses from './model/courses';
import teaching from './model/teaching';
import coursesinfo from './model/coursesinfo';
import attending from './model/attending';
import multer from 'multer';
import path from 'path';
import files from './model/files';
import filesinfo from './model/filesinfo';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/rtidb');

const conn = mongoose.connection;

conn.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
  
var uploadFilesInfo = multer({ storage: storage }).single('fileInfo');

router.route('/upload').post((req, res)=>{
    uploadFilesInfo(req, res, function (err) {
        if(err){
            console.log(err);
        }
        else{
            let f = new filesinfo({
                originalName: req.file.originalname,
                uploadName: req.file.filename,
                coursename: req.body.coursename,
                type: req.body.type,
                size: req.body.size,
                kind: req.body.kind,
                date: req.body.date,
                teacher: req.body.teacher,
                order: 0
            });

            f.save().then(succ => {
                res.json({message: 1});
            }).catch(err => {
                res.json({message: -1});
            })
        }
  });     
});

/*router.route('/insertFileInfo').post((req, res)=>{
    let fi = new filesinfo(req.body);
    filesinfo.findOne({'originalName': req.body.originalName}, (err, user)=>{
        if(err) console.log(err);
        else {
            if(user){
                filesinfo.updateOne({'originalName': req.body.originalName}, {
                    $set: {
                        "coursename" : req.body.coursename, 
                        "type" : req.body.type,
                        "size" : req.body.size,
                        "kind" : req.body.kind,
                        "date" : req.header.
                }
                });
            }
        }
    })
     
});*/

router.route('/getAllFilesInfo').get((req, res)=>{
    filesinfo.find({}, (err, f)=>{
        if(err) console.log(err);
        else res.json(f);
    })
});

router.route('/download').post((req, res)=>{
    let filePath = path.join(__dirname, '../uploads') + '/' + req.body.fileName;
    res.sendFile(filePath);
});

router.route('/deleteFilesInfo').post((req, res)=>{
    let uploadName = req.body.uploadName;

    filesinfo.deleteOne({'uploadName': uploadName}, (err) => {
        if(err) console.log(err);
        else res.json({message: 1});
    })
});

// router.route('/updateFilesInfoOrder').post((req, res)=>{
//     let uploadName = req.body.uploadName;
//     let order = req.body.order;
//     console.log(uploadName);
//     console.log(order);
//     filesinfo.collection.updateOne({'uploadName': uploadName}, { $set: {"order": order} });
//     res.json({message: 1});
// });

router.route('/updateFilesInfoOrder').post((req, res)=>{
    let uploadNames: string[] = req.body.uploadNames;
    let orders: number[] = req.body.orders;
    
    for (let i = 0; i < uploadNames.length; i++) {
        filesinfo.collection.updateOne({'uploadName': uploadNames[i]}, { $set: {"order": orders[i]} });
    }
    
    res.json({message: 1});
});

router.route('/updateCourseShow').post((req, res)=>{
    let coursename = req.body.coursename;
    let showExams = req.body.showExams;
    let showLabs = req.body.showLabs;
    let showProjects = req.body.showProjects;
    let labInfo = req.body.labInfo;
    let projectInfo = req.body.projectInfo;
    
    
    courses.collection.updateOne({'coursename': coursename}, { $set: {
        "showExams": showExams, "showLabs": showLabs, "showProjects": showProjects,
        "labInfo": labInfo, "projectInfo": projectInfo
    }});
    
    
    res.json({message: 1});
});

router.route('/login').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    users.findOne({'username': username, 'password': password}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
});


router.route('/allEmployees').post((req, res)=>{
    users.find({'type': 1}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
});

router.route('/findByUsername').post((req, res)=>{
    let username = req.body.username;

    users.findOne({'username': username}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
});

router.route('/teachingCoursesByUsername').post((req, res)=>{
    let username = req.body.username;

    teaching.find({'username': username}, (err, t)=>{
        if(err) console.log(err);
        else res.json(t);
    })
});

router.route('/teachingCoursesByCoursename').post((req, res)=>{
    let coursename = req.body.coursename;

    teaching.find({'coursename': coursename}, (err, t)=>{
        if(err) console.log(err);
        else res.json(t);
    })
});

// ne koristim al neka ga
router.route('/teachersByCoursename').post((req, res)=>{
    let coursename = req.body.coursename;

    teaching.find({'coursename': coursename}, (err, t: any[])=>{
        if(err) console.log(err);
        else {
            users.find({ username: { $in: t.map(x => x.username) } }, (err, emp) => {
                if(err) console.log(err);
                else res.json(emp);
            });
        }
    })
});

router.route('/findByCoursename').post((req, res)=>{
    let coursename = req.body.coursename;

    courses.findOne({'coursename': coursename}, (err, course)=>{
        if(err) console.log(err);
        else res.json(course);
    })
});

router.route('/allCoursesByModule').post((req, res)=>{
    let module = req.body.module;

    coursesinfo.find({'module': module}, (err, ci)=>{
        if(err) console.log(err);
        else res.json(ci);
    })
});

router.route('/courseInfosByCoursename').post((req, res)=>{
    let coursename = req.body.coursename;
    
    coursesinfo.find({'coursename': coursename}, (err, ci)=>{
        if(err) console.log(err);
        else res.json(ci);
    })
});

router.route('/changePassword').post((req, res)=>{
    let username = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    users.findOne({'username': username, 'password': oldPassword}, (err, user: any)=>{
        if(err) console.log(err);
        else {
            if(user){
                user.passwordChanged = true;
                user.password = newPassword;
                user.save().then(()=>{
                    res.json("success");
                }).catch(()=>{
                    res.json("failed");
                });
            }
            else{
                res.json("failure");
            }
        }
    })
});

router.route('/isTeaching').post((req, res)=>{
    let username = req.body.username;
    let coursename = req.body.coursename;

    teaching.findOne({'username' : username, 'coursename': coursename}, (err, t)=>{
        if(err) console.log(err);
        else res.json(t);
    })
});

router.route('/isAttending').post((req, res)=>{
    let username = req.body.username;
    let coursename = req.body.coursename;

    attending.findOne({'username' : username, 'coursename': coursename}, (err, a)=>{
        if(err) console.log(err);
        else res.json(a);
    })
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));