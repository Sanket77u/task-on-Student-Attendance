const express=require('express');
const route=express.Router();
const fs=require('fs');
const path=require('path');
const { IncomingForm } = require('formidable');

const formidable=require('formidable');
const { ReadableStreamBYOBRequest } = require('stream/web');





route.post('/master',(req,res)=>{
    const data=req.body;
   
    fs.writeFile('student_masterinfo.json',JSON.stringify(data),(err)=>{
       if(err){
         console.log("error while uploading data");
        res.send("error while uploading data");
       }
       console.log(data);
       res.json(data);
            res.send();
       
    }
            
    
)})
route.post('/address',(req,res)=>{
    const data=req.body;
    // console.log(data);
    fs.writeFile('student_addressinfo.json',JSON.stringify(data),(err)=>{
       if(err){
         console.log("error while uploading data");
        res.send("error while uploading data");
       }
       console.log(data)
       res.json(data);
            res.send();
       
    }
            
    
)})
route.post('/education',(req,res)=>{
    const data=req.body;
    // console.log(data);
    fs.writeFile('student_educationinfo.json',JSON.stringify(data),(err)=>{
       if(err){
         console.log("error while uploading data");
        res.send("error while uploading data");
       }
       console.log(data)
       res.json(data);
            res.send();
       
    }
            
    
)})



route.post('/attendance',(req,res)=>{
    const data=req.body;
    // console.log(data);
    fs.writeFile('student_attendanceinfo.json',JSON.stringify(data),(err)=>{
       if(err){
         console.log("error while uploading data");
        res.send("error while uploading data");
       }
       console.log(data)
       res.json(data);
            res.send();
       
    }
            
    
)})

// posts for all

// route.post('/attendancedetails', (req, res) => {
//   const newEntry = req.body;
//   const filePath = path.join(__dirname, 'student_attendanceinfo.json');

//   fs.readFile(filePath, 'utf-8', (err, fileData) => {
//     let attendanceArray = [];

//     if (!err && fileData) {
//       try {
//         attendanceArray = JSON.parse(fileData);
//       } catch (parseErr) {
//         console.warn(" JSON parse error, starting with empty array.");
//       }
//     }

//     // Push the new entry
//     attendanceArray.push(newEntry);

//     // Write back to file
//     fs.writeFile(filePath, JSON.stringify(attendanceArray, null, 2), (err) => {
//       if (err) {
//         console.log(" Error writing to file:", err);
//         return res.status(500).send("Error saving data");
//       }

//       console.log("Data added:", newEntry);
//       res.json({ message: "Attendance entry added", entry: newEntry });
//     });
//   });
// });



/// post of all 

route.post('/all', (req, res) => {
  const students = req.body; 

  


const masterData = [];
const addressData = [];
const educationData = [];
const attendanceData = [];

students.forEach(student => {

  masterData.push(student.master);

  addressData.push({...student.address,student_id: student.master.student_id });

  educationData.push({...student.education,student_id: student.master.student_id });

  attendanceData.push({...student.attendance,student_id: student.master.student_id});});

  let files = 0;

  const done = () => {
    files++;
    if (files === 4) {
      console.log("All data written successfully.");
      res.send({ message: "All student data saved to files." });
    }
  };

  fs.writeFile('student_masterinfo.json', JSON.stringify(masterData, null, 2), err => {
    if (err) console.log("Error writing master info");
    done();
  });

  fs.writeFile('student_addressinfo.json', JSON.stringify(addressData, null, 2), err => {
    if (err) console.log("Error writing address info");
    done();
  });

  fs.writeFile('student_educationinfo.json', JSON.stringify(educationData, null, 2), err => {
    if (err) console.log("Error writing education info");
    done();
  });

  fs.writeFile('student_attendanceinfo.json', JSON.stringify(attendanceData, null, 2), err => {
    if (err) console.log("Error writing attendance info");
    done();
  });
});





route.post('/profilepic', (req, res) => {
  const form = new IncomingForm({
    uploadDir: path.join(__dirname, 'uploads'),
    keepExtensions: true,
    multiples: false,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed' });
    }

    
    const studentId = fields.id; 
    const file = files.file;    

    if (!studentId || !file) {
      return res.status(400).json({ error: 'Missing student ID or file' });
    }

    const imagePath = file.filepath.replace(/\\/g, "/");

    const jsonPath = path.join(__dirname, 'student_masterinfo.json');
    fs.readFile(jsonPath, 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading student data file' });
      }

      let students = JSON.parse(data);
      let studentFound = false;

      students = students.map((student) => {
        if (student.student_id == studentId) {
          student.profile_pic_url = imagePath;
          studentFound = true;
        }
        return student;
      });

      if (!studentFound) {
        return res.status(404).json({ error: 'Student not found' });
      }

      fs.writeFile(jsonPath, JSON.stringify(students, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error saving updated student data' });
        }

        res.json({
          message: 'Profile picture uploaded successfully!',
          profile_pic_url: imagePath, });
        });
    });
  });
});





module.exports=route;



