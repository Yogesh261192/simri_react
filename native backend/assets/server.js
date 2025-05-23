const express= require('express');
const app = express();
const cors= require('cors')
var bodyParser = require('body-parser')
const PORT= process.env.PORT || 3000
const bcrypt = require('bcrypt')
const connectToDB = require('./db');
const {getUserDetails} =require('./common/reusable_function');
const nodemailer = require('nodemailer');
app.use(cors({
    origin: '*', // This allows requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., Gmail, Yahoo, etc.)
    auth: {
      user: 'yogeshmamgain2611@gmail.com', // Replace with your email
      pass: 'zeoy jdoy ziuw guid', // Replace with your email password or app password
    },
  });
  
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
    if(user_list){
        responseObj.user_exist= true 
        responseObj.message= 'User already registered' 
    }
    else{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const db = client.db("users");
    const collection = db.collection('user_details');
        req.body.password= hashedPassword;
        await collection.insertOne(req.body)

        responseObj.message= 'User registered success'
        const mailOptions = {
            from: 'yogeshmamgain2611@gmail.com', // Sender's email
            to: 'someshmamgain76@gmail.com ', // Recipient's email
            cc:'yogeshmamgain2611@gmail.com ',
            subject: 'New user details',
            text: `Someone registered from number ${phone}`,
          };
          
          // Send the email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent successfully:', info.response);
            }
          });
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
    if(!user_list){
        responseObj.user_exist= false 
        responseObj.error= true ;
        responseObj.message= 'User not registered' 
        res.send(responseObj)
        return
    }

    try {
        const userInputPassword = password // Password entered by the user
const storedHashedPassword = user_list.password; // Password from the database

const isPasswordMatch = await bcrypt.compare(userInputPassword, storedHashedPassword);
if (isPasswordMatch) {
  console.log("Password matches");
  responseObj.error= false 
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
    } catch (error) {
        res.send(JSON.stringify(error))
    }

})
app.post('/buy', async(req,res)=>{
    console.log(req.body);
    const mailOptions = {
        from: 'yogeshmamgain2611@gmail.com', // Sender's email
        to: 'someshmamgain76@gmail.com ', // Recipient's email
        cc:'ranakotianchita1997@gmail.com ',
        subject: 'Buy details',
        text: `${JSON.stringify(req.body)}`,
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent successfully:', info.response);
        }
      });
      responseObj.message='Order received'
      res.send(responseObj)
})

app.post('/delivery', async (req,res)=>{
    console.log(req.body);
    const mailOptions = {
        from: 'yogeshmamgain2611@gmail.com', // Sender's email
        to: 'someshmamgain76@gmail.com ', // Recipient's email
        cc:'yogeshmamgain2611@gmail.com',
        subject: 'Delivery details',
        text: `${JSON.stringify(req.body)}`,
      };


      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent successfully:', info.response);
        }
      });
      responseObj.message='Delivery order received'
      res.send(responseObj)
})
app.post('/ride', async (req,res)=>{
    console.log(req.body);
    const mailOptions = {
        from: 'yogeshmamgain2611@gmail.com', // Sender's email
        to: 'someshmamgain76@gmail.com ', // Recipient's email
        cc:'yogeshmamgain2611@gmail.com ',
        subject: 'Ride details',
        text: `${JSON.stringify(req.body)}`,
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent successfully:', info.response);
        }
      });
      responseObj.message='Ride request'
      res.send(responseObj)
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
