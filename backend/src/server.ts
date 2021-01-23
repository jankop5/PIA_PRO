import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import users from './model/users';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/rtidb');

const conn = mongoose.connection;

conn.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();


router.route('/login').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    users.findOne({'username': username, 'password': password}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
});


router.route('/allEmployees').post((req, res)=>{
    users.find({type: 1}, (err, user)=>{
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


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));