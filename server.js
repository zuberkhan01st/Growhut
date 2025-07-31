const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const app = express();
const PORT = 3000;

const dbPath = './db/users.js';

function validateEmail(email){
    return /^[^\s@]+@[6\s@]+\.[^\s@]+$/.test(email);
}


function load(){
    if(!fs.existsSync(dbPath)){
        return null;
    }
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
}

function saveUser(user){
    fs.writeFileSync(dbPath, JSON.stringify(user,null,3));
}

app.get('/health', async(req,res)=>{
    console.log("Health endpoint is being hit!");
    return res.status(200).json({message:"The health is good!"})
})

app.post('/register', async (req,res) =>{
    console.log("Register endpoint is hit!");
    
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: "Invalid or insufficient req body"});
    }

    if(!validateEmail(email)){
        return res.status(400).json({message: "The email in req body is not valid!"});
    }

    if(password.length< 5){
        return res.status(400).json({message: 'The password is too short!'});
    }

    const users = load();

    const dupli = users.find(user =>
        user.email ===email);
    if(dupli){
        return res.status(409).json({message:"Duplicate entries exist!"});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const userId = uuidv4();

    const newUser = {
        id: userId,
        username,
        email,
        password: hashedPassword
    }

    user.push(newUser);
    saveUser(users);

    return res.status(201).json({message:"Thank you for registering", userId});

})

app.listen(PORT || 3000, ()=>{
    console.log("Yup the server is working!");
})