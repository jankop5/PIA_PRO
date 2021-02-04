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
import filesinfo from './model/filesinfo';
import notices from './model/notices';

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
var uploadNotices = multer({ storage: storage }).single('notice');
var uploadImages = multer({ storage: storage }).single('image');

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

router.route('/getAllFilesInfoByCoursename').post((req, res)=>{
    let coursename = req.body.coursename;

    filesinfo.find({"coursename": coursename}, (err, f)=>{
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
    let showProject = req.body.showProject;
    let labInfo = req.body.labInfo;
    let projectInfo = req.body.projectInfo;
    
    
    courses.collection.updateOne({'coursename': coursename}, { $set: {
        "showExams": showExams, "showLabs": showLabs, "showProject": showProject,
        "labInfo": labInfo, "projectInfo": projectInfo
    }});
    
    
    res.json({message: 1});
});

router.route('/getNumOfNotices').get((req, res)=>{
    notices.countDocuments({}, (err, cnt)=>{
        res.json({num: cnt});
    })
});

router.route('/uploadNotice').post((req, res)=>{
    uploadNotices(req, res, function (err) {
        if(err){
            console.log(err);
        }
        else{
            notices.findOne({'idN' : Number(req.body.idN)}, (err, notice)=>{
                if(err) console.log(err);
                else {
                    if(!notice){
                        console.log(req.body);
                        let n = new notices({
                            idN: Number(req.body.idN),
                            title: req.body.title,
                            text: req.body.text,
                            originalNames: [req.file.originalname],
                            uploadNames: [req.file.filename],
                            codes: req.body.codes,
                            date: req.body.date,
                            teacher: req.body.teacher
                        });
                        n.save().then(succ => {
                            res.json({message: 1});
                        }).catch(err => {
                            res.json({message: -1});
                        })
                    }
                    else{
                        notices.collection.updateOne({'idN' : Number(req.body.idN)}, {$push: {
                            "uploadNames": req.file.filename,
                            "originalNames": req.file.originalname
                        }}, (err, succ)=>{
                            if(err) console.log(err);
                        });
                        res.json({message: 1});
                    }
                    
                }
            })

            
        }
  });     
});

router.route('/insertNotice').post((req, res)=>{

    let n = new notices({
        idN: Number(req.body.idN),
        title: req.body.title,
        text: req.body.text,
        originalNames: [],
        uploadNames: [],
        codes: req.body.codes,
        date: req.body.date,
        teacher: req.body.teacher
    });
    n.save().then(succ => {
        res.json({message: 1});
    }).catch(err => {
        res.json({message: -1});
    });
});

router.route('/getNoticesForCode').post((req, res)=>{
    let code = req.body.code;

    notices.find({'codes': code}, (err, n)=>{
        if(err) console.log(err);
        else res.json(n);
    })
});

router.route('/deleteNotice').post((req, res)=>{
    let idN = req.body.idN;

    notices.deleteOne({'idN': idN}, (err) => {
        if(err) console.log(err);
        else res.json({message: 1});
    })
});

router.route('/login').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    users.findOne({'username': username, 'password': password}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
});

router.route('/register').post((req, res)=>{

    users.findOne({'username': req.body.username}, (err, user)=>{
        if(err) console.log(err);
        else {
            if(user){
                res.json({message: 2});
            }
            else{
                let u = new users(req.body);
                u.save().then(succ => {
                    res.json({message: 1});
                }).catch(err => {
                    res.json({message: -1});
                });
            }
        }
    })

});

router.route('/registerWithImage').post((req, res)=>{

    uploadImages(req, res, function (err) {
        if(err){
            console.log(err);
        }
        else{
            users.findOne({'username': req.body.username}, (err, user)=>{
                if(err) console.log(err);
                else {
                    if(user){
                        res.json({message: 2});
                    }
                    else{
                        let u = new users({
                            username: req.body.username,
                            password: req.body.password,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            address: req.body.address,
                            phone: req.body.phone,
                            website: req.body.website,
                            personalData: req.body.personalData,
                            title: req.body.title,
                            cabinet: req.body.cabinet,
                            status: req.body.status,
                            imageName: req.file.filename,
                            type: 1
                        });
            
                        u.save().then(succ => {
                            res.json({message: 1});
                        }).catch(err => {
                            res.json({message: -1});
                        })
                    }
                }
            })
            
        }
  });     
});

router.route('/updateUser').post((req, res)=>{

    users.collection.updateOne({'username': req.body.username}, { $set: req.body});
    res.json({message: 1});
});

router.route('/deleteUser').post((req, res)=>{
    let username = req.body.username;

    users.deleteOne({'username': username}, (err) => {
        if(err) console.log(err);
        else res.json({message: 1});
    })
});

router.route('/getAllEmployees').get((req, res)=>{
    users.find({'type': 1}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
});

router.route('/getAllStudents').get((req, res)=>{
    users.find({'type': 2}, (err, user)=>{
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



router.route('/findByCoursename').post((req, res)=>{
    let coursename = req.body.coursename;

    courses.findOne({'coursename': coursename}, (err, course)=>{
        if(err) console.log(err);
        else res.json(course);
    })
});

router.route('/getAllCourses').get((req, res)=>{
    courses.find({}, (err, c)=>{
        if(err) console.log(err);
        else res.json(c);
    })
});

router.route('/deleteCourseInfo').post((req, res)=>{
    let code = req.body.code;
    let coursename = req.body.coursename;

    coursesinfo.deleteOne({'code': code}, (err) => {
        if(err) console.log(err);
        else {
            courses.findOne({'coursename': coursename}, (err, course)=>{
                if(err) console.log(err);
                else {
                    if(course.codes.length > 1){
                        courses.collection.updateOne({'coursename' : coursename}, {$pull: {
                            "codes": code
                        }});
                        res.json({message: 0});
                    }
                    else{
                        courses.deleteOne({'coursename': coursename}, (err) => {
                            if(err) console.log(err);
                            else res.json({message: 1});
                        })
                    }
                }
            })

        }
    })
});

router.route('/insertCourseInfo').post((req, res)=>{
    let code = req.body.code;
    let coursename = req.body.coursename;

    courses.findOne({'coursename': coursename}, (err, course)=>{
        if(err) console.log(err);
        else {
            if(!course){
                let c = new courses({
                    coursename: req.body.coursename,
                    codes: [req.body.code],
                    showExams: true,
                    showLabs: true,
                    showProject: true,
                    labInfo: "",
                    projectInfo: ""
                });

                c.save().then(succ => {
                }).catch(err => {
                    res.json({message: -1});
                });
            }
            else{
                courses.collection.updateOne({'coursename' : coursename}, {$push: {
                    "codes": code
                }});
            }

            let ci = new coursesinfo(req.body);
            ci.save().then(succ => {
                res.json({message: 1});
            }).catch(err => {
                res.json({message: -1});
            });
        }
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

router.route('/getCourseInfoByCode').post((req, res)=>{
    let code = req.body.code;
    
    coursesinfo.findOne({'code': code}, (err, ci)=>{
        if(err) console.log(err);
        else res.json(ci);
    })
});

router.route('/updateCourseInfo').post((req, res)=>{

    coursesinfo.collection.updateOne({'code': req.body.code }, { $set: req.body });
    res.json({message: 1});
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

router.route('/isTeaching').post((req, res)=>{
    let username = req.body.username;
    let coursename = req.body.coursename;

    teaching.findOne({'username' : username, 'coursename': coursename}, (err, t)=>{
        if(err) console.log(err);
        else res.json(t);
    })
});


router.route('/insertTeaching').post((req, res)=>{
    let username = req.body.username;
    let coursename = req.body.coursename;
    let group = req.body.group;

    teaching.findOne({'coursename': coursename, "group": group}, (err, t)=>{
        if(err) console.log(err);
        else {
            if(t){
                res.json({message: 2});
            }
            else{
                let t = new teaching({
                    username: username,
                    coursename: coursename,
                    group: group
                });
    
                t.save().then(succ => {
                    res.json({message: 1});
                }).catch(err => {
                    res.json({message: -1});
                })
            }
        }
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

router.route('/attendingCoursesByUsername').post((req, res)=>{
    let username = req.body.username;

    attending.find({'username': username}, (err, u)=>{
        if(err) console.log(err);
        else res.json(u);
    })
});

router.route('/insertAttending').post((req, res)=>{
    let username = req.body.username;
    let coursename = req.body.coursename;

    attending.findOne({'coursename': coursename, "username": username}, (err, a)=>{
        if(err) console.log(err);
        else {
            if(a){
                res.json({message: 2});
            }
            else{
                let a = new attending({
                    username: username,
                    coursename: coursename
                });
    
                a.save().then(succ => {
                    res.json({message: 1});
                }).catch(err => {
                    res.json({message: -1});
                })
            }
        }
    })
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));