const express=require('express');
const fs=require('fs');
const path=require('path');
const { IncomingForm } = require('formidable');

const formidable=require('formidable');


app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router=require('./routersget');
const routerpost=require('./routerspost');
const routerdelete=require('./routerdelete');
const routerupdate=require('./routerupdate');
const routerreport=require('./routerreport');


app.use('/show',router); //master,address,attendance,education,all 

app.use('/add',routerpost); //master,address,attendance,education,all,profilepic

app.use('/delete',routerdelete);  //:id

app.use('/update',routerupdate);   //:id/file/attribute

app.use('/report',routerreport);   //master,address,attendance,education,all , week/:number,quarter/:number,month/:number

app.listen(3440,(err)=>{
    if(err){
        console.log("error while running server");
    }
      console.log("Server is running on port 3440");
    });



// app.get('/addressinfo',router);

// app.get('/educationinfo',router);

// app.get('/attendanceinfo',router);

// // // all student infooo 
// app.get('/allstudentsinfo', router);



///posts of one by one 


// app.post('/addressdetails',routerpost);

// app.post('/educationdetails',routerpost);

// app.post('/attendancedetails',routerpost);

// // // posts for all
// app.post('/uploadAll',routerpost);




/// file uplaod through formidable 

// app.post('/profilepics',routerpost);


// user update valueee 






//add attendance info 
// app.post('/addattend', (req, res) => {
//     const datazz = req.body;

//     fs.readFile('student_attendanceinfo.json', 'utf-8', (err, data) => {
//         if (err) {
//             console.log("Error while reading file");
//             return res.status(500).send("Error reading file");
//         }

//         let parsedData;
      
//             parsedData = JSON.parse(data); 
       

//         if (!Array.isArray(parsedData)) {
//             console.log("Data is not an array");
//             return res.status(500).send("Invalid data structure");
//         }

//         parsedData.push(...datazz);
 
//         fs.writeFile('student_attendanceinfo.json', JSON.stringify(parsedData, null, 2), (err) => {
//             if (err) {
//                 console.log("Error writing file");
//                 return res.status(500).send("Error writing to file");
//             }

//             console.log("Attendance added");
//             res.send("Attendance added successfully");
//         });
//     });
// });


//attendance info student with name 


//report 3


// app.get('/addressreport',routerreport);

// app.get('/educationreport',routerreport);


// /// attendance report with total day present day and absent day 
// app.get('/attendancereport',routerreport);




