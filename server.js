const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();
const db = require('./database/index');
const USER = require('./database/Schema/User');
const FORM = require('./database/Schema/Form')

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 4000;


app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Welcome");
});

app.get('/forms', async (req,res)=> {
    
    const formsDB = await FORM.find({})
   
    res.json(formsDB);
})

app.post('/forms', async (req,res)=> {
    const username = req.body.username;
    const previous = req.body.previous;
    const current = req.body.current;
    const issues = req.body.issues;
    const breakthroughs = req.body.breakthroughs;
    const dateAdded = new Date();
    const newForm = await FORM.create({username, previous, current, issues, breakthroughs, dateAdded});
   console.log("new form created: " + newForm)
    res.json(newForm);
 
})

app.get('/users', async (req,res)=> {
    
    const usersDB = await USER.find({})
   
    res.json(usersDB);
 
})

app.post('/', async (req,res) => {
    const {username, email} = req.body;
    let pass = req.body.password;
    const password = await hashPassword(req.body.password);
    console.log({ username,email,password});
    const userDB = await USER.findOne({$or: [{email}]});
    
    if (!password || !email ) {
        res.status(406)
        return res.json({"message": `Enter Valid Details.`})
    } 
    
    else if (pass.length < 5) {
        res.status(401)
        res.json({"message": "Password too short (5 letters or more)."})
    } 
    
    else if (req.body.password !== req.body.passwordConfirm) {
        res.status(406)
        return res.json({"message": "Passwords don't match."})
    } 
    
    else if (userDB) {
        res.status(406)
        return res.json({"message": "User already Exists"})    } 
        
    else {
        const newUser = await USER.create({ username, email, password});
        console.log(newUser.username);
        req.session.user = newUser;
        req.session.save();
        res.status(200);
        if (newUser.imagename) {
            return res.json({"message": "Welcome", "token_id": newUser.id, "token_name": newUser.username, "token_email": newUser.email, "token_imagename": newUser.imagename});
        } else {
            return res.json({"message": "Welcome", "token_id": newUser.id, "token_name": newUser.username, "token_email": newUser.email, "token_imagename": ''});
        }    }  
})


// const mainURL = "https://team-hub.onrender.com"
app.listen(PORT, () => console.log(`Now listening`));




module.exports = app;

