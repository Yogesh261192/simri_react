const express= require('express');
const app = express();
var bodyParser = require('body-parser')
const PORT= process.env.PORT || 3000
const bcrypt = require('bcrypt')
const connectToDB = require('./db');
const {getUserDetails} =require('./common/reusable_function')
let client;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            let resObj=
                {
                 error:false,
                 code:200,
                 login_details:{
                    username:'Yogesh',
                    type:'customer'
                 }

                }
            
            resolve(res.send(resObj))
        }, 3000);
    })
})
let responseObj= {
    error:false,
    code:200,
   }
app.get('/anchu', (req,res)=>{
    console.log(req.body);
    console.log(req.query);
    res.send('addnjdlkadk anchita')
})
app.post('/register',async (req,res)=>{
    console.log(req.body);
    
    let phone= req.body.phone;
    let user_list = await getUserDetails(req.body, client)
    if(user_list.length){
        responseObj.user_exist= true 
        responseObj.message= 'User already registered' 
    }
    else{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password= hashedPassword;
        await collection.insertOne(req.body)
        responseObj.message= 'User registered success'
        // res.send(responseObj)
    }
    res.send(responseObj);
    // console.log('Documents:', user_list);
})
app.post('/login', async(req,res)=>{
    console.log(req.body);
    console.log(req.query);
    const {phone, password}=req.body;
    let user_list = await getUserDetails(req.body, client)
    if(!user_list.length){
        responseObj.user_exist= false 
        responseObj.error= true ;
        responseObj.message= 'User not registered' 
        res.send(responseObj)
        return
    }

    const userInputPassword = password // Password entered by the user
const storedHashedPassword = user_list[0].password; // Password from the database

const isPasswordMatch = await bcrypt.compare(userInputPassword, storedHashedPassword);
if (isPasswordMatch) {
  console.log("Password matches");
  responseObj.user_exist= true 
  responseObj.message= 'Login success' 
  res.send(responseObj)
} else {
    console.log("Password matches");
    responseObj.error= true 
    responseObj.user_exist= true 
    responseObj.message= 'Wrong password' 
    res.send(responseObj)
  console.log("Password does not match");
}

})
connectToDB()
    .then((connectedClient) => {
        client = connectedClient; // Store the connected client
        // console.log(client, 'details')
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB. Server not started.', err);
    });
