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
import file from './model/file';
import files from './model/files';

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
  
var uploadSingle = multer({ storage: storage }).single('myFile');

router.route('/upload').post((req, res)=>{
    var path = '';
    uploadSingle(req, res, function (err) {
    //     if (err) {
    //       // An error occurred when uploading
    //       console.log(err);
    //       return res.status(422).send("an Error occured")
    //     }  
    //    // No error occured.
    //     path = req.file.path;
    //     return res.send("Upload Completed for "+path); 
        if(err){
            console.log(err);
        }
        else{
            let f = new files({
                originalName: req.file.originalname,
                uploadName: req.file.filename
            });

            f.save().then(succ => {
                res.json({message: 1});
            }).catch(err => {
                res.json({message: -1});
            })
        }
  });     
});

router.route('/getAllFiles').get((req, res)=>{
    files.find({}, (err, f)=>{
        if(err) console.log(err);
        else res.json(f);
    })
});

router.route('/download').post((req, res)=>{
    let filePath = path.join(__dirname, '../uploads') + '/' + req.body.fileName;
    res.sendFile(filePath);
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