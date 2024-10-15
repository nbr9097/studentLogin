const path = require('path')//get directory path
const express = require('express')
const app = express()
const cors=require('cors');
//app.use(express.static('public'))
const port = 3000;

const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


const url = 'mongodb://localhost:27017/student';
const dbName = 'student';
let db;
//connect to mongodb
MongoClient.connect(url,
    { useNewUrlParser:true,
        useUnifiedTopology:true })
        .then(async client => {
            console.log("connected mongodb");
            db = client.db(dbName); 


            //create operation
            app.post('/signup', async (req, res)=> {
                try{
                    const user=req.body;
                    const result = await db.collection('studata').insertOne(user);
                    res.send({ message: 'student signup successfully'});
                }catch(err) {
                    res.status(500).send({ message: 'error creating user'});
                }
            });
            //start the server
               app.listen(port, () => {
                console.log(`example app listening on port ${port}`)
            })
        })

        .catch(err=>{
            console.log(err);
        });