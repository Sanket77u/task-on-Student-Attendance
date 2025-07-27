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
//gets of one by one student 

app.use('/show',router);

// app.get('/addressinfo',router);

// app.get('/educationinfo',router);

// app.get('/attendanceinfo',router);

// // // all student infooo 
// app.get('/allstudentsinfo', router);



///posts of one by one 
app.use('/add',routerpost);

// app.post('/addressdetails',routerpost);

// app.post('/educationdetails',routerpost);

// app.post('/attendancedetails',routerpost);

// // // posts for all
// app.post('/uploadAll',routerpost);


app.use('/delete',routerdelete);


/// file uplaod through formidable 

// app.post('/profilepics',routerpost);


// user update valueee 

app.use('/update',routerupdate); 





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

app.use('/report',routerreport);

//report 3


// app.get('/addressreport',routerreport);

// app.get('/educationreport',routerreport);


// /// attendance report with total day present day and absent day 
// app.get('/attendancereport',routerreport);


app.listen(3440,()=>{
    console.log("running on 3440",()=>{
    console.log("Server is running on port 3440");
    });
});

