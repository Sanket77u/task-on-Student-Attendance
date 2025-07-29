const express=require('express');
const route=express.Router();
const fs=require('fs');
const path=require('path');
const { IncomingForm } = require('formidable');

const formidable=require('formidable');
const { ReadableStreamBYOBRequest } = require('stream/web');









route.post('/master', (req, res) => {
    const dataz = req.body;

    fs.readFile('student_masterinfo.json', 'utf-8', (err, fileData) => {
        let jsonData = [];

     
                jsonData = JSON.parse(fileData);
        
        

        jsonData.push(dataz);

        fs.writeFile('student_masterinfo.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.log("Error while writing data");
                return res.status(500).send("Error while uploading data");
            } else {
                console.log("Data added:", dataz);
                return res.json(dataz);
            }
        });
    });
});



route.post('/address', (req, res) => {
    const dataz = req.body;

    fs.readFile('student_addressinfo.json', 'utf-8', (err, fileData) => {
        let jsonData = [];

     
                jsonData = JSON.parse(fileData);
        
        

        jsonData.push(dataz);

        fs.writeFile('student_addressinfo.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.log("Error while writing data");
                return res.status(500).send("Error while uploading data");
            } else {
                console.log("Data added:", dataz);
                return res.json(dataz);
            }
        });
    });
});


route.post('/education', (req, res) => {
    const dataz = req.body;

    fs.readFile('student_educationinfo.json', 'utf-8', (err, fileData) => {
        let jsonData = [];

     
                jsonData = JSON.parse(fileData);
        
        

        jsonData.push(dataz);

        fs.writeFile('student_educationinfo.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.log("Error while writing data");
                return res.status(500).send("Error while uploading data");
            } else {
                console.log("Data added:", dataz);
                return res.json(dataz);
            }
        });
    });
});


route.post('/attendance', (req, res) => {
    const dataz = req.body;

    fs.readFile('student_addressinfo.json', 'utf-8', (err, fileData) => {
        let jsonData = [];

     
                jsonData = JSON.parse(fileData);
        
        

        jsonData.push(dataz);

        fs.writeFile('student_addressinfo.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.log("Error while writing data");
                return res.status(500).send("Error while uploading data");
            } else {
                console.log("Data added:", dataz);
                return res.json(dataz);
            }
        });
    });
});












































// route.post('/address',(req,res)=>{
//     const data=req.body;
//     // console.log(data);
//     fs.writeFile('student_addressinfo.json',JSON.stringify(data),(err)=>{
//        if(err){
//          console.log("error while uploading data");
//         res.send("error while uploading data");
//        }
//        console.log(data)
//        res.json(data);
//             res.send();
       
//     }
            
    
// )})
// route.post('/education',(req,res)=>{
//     const data=req.body;
//     // console.log(data);
//     fs.writeFile('student_educationinfo.json',JSON.stringify(data),(err)=>{
//        if(err){
//          console.log("error while uploading data");
//         res.send("error while uploading data");
//        }
//        console.log(data)
//        res.json(data);
//             res.send();
       
//     }
            
    
// )})



// route.post('/attendance',(req,res)=>{
//     const data=req.body;
//     // console.log(data);
//     fs.writeFile('student_attendanceinfo.json',JSON.stringify(data),(err)=>{
//        if(err){
//          console.log("error while uploading data");
//         res.send("error while uploading data");
//        }
//        console.log(data)
//        res.json(data);
//             res.send();
       
//     }
            
    
// )})



// route.post('/all', (req, res) => {
//   const students = req.body; 

  


// const masterData = [];
// const addressData = [];
// const educationData = [];
// const attendanceData = [];

// students.forEach(student => {

//   masterData.push(student.master);

//   addressData.push({...student.address,student_id: student.master.student_id });

//   educationData.push({...student.education,student_id: student.master.student_id });

//   attendanceData.push({...student.attendance,student_id: student.master.student_id});});

//   let files = 0;

//   const done = () => {
//     files++;
//     if (files === 4) {
//       console.log("All data written successfully.");
//       res.send({ message: "All student data saved to files." });
//     }
//   };

//   fs.writeFile('student_masterinfo.json', JSON.stringify(masterData, null, 2), err => {
//     if (err) console.log("Error writing master info");
//     done();
//   });

//   fs.writeFile('student_addressinfo.json', JSON.stringify(addressData, null, 2), err => {
//     if (err) console.log("Error writing address info");
//     done();
//   });

//   fs.writeFile('student_educationinfo.json', JSON.stringify(educationData, null, 2), err => {
//     if (err) console.log("Error writing education info");
//     done();
//   });

//   fs.writeFile('student_attendanceinfo.json', JSON.stringify(attendanceData, null, 2), err => {
//     if (err) console.log("Error writing attendance info");
//     done();
//   });
// });



route.post('/all', (req, res) => {
  const students = req.body;

  let masterData = [];
  let addressData = [];
  let educationData = [];
  let attendanceData = [];

  const readAndAppend = (file, newData, callback) => {
    fs.readFile(file, 'utf-8', (err, oldData) => {
      let existingData = [];

      if (!err && oldData && oldData.trim().startsWith('[')) {
        existingData = JSON.parse(oldData);
      }

      existingData.push(...newData);

      fs.writeFile(file, JSON.stringify(existingData, null, 2), err => {
        if (err) {
          console.log(`Error writing to ${file}`);
        }
        callback();
      });
    });
  };

  // Prepare arrays from incoming students
  students.forEach(student => {
    masterData.push(student.master);
    addressData.push({ ...student.address, student_id: student.master.student_id });
    educationData.push({ ...student.education, student_id: student.master.student_id });
    attendanceData.push({ ...student.attendance, student_id: student.master.student_id });
  });

  let files = 0;
  const done = () => {
    files++;
    if (files === 4) {
      console.log("All data appended successfully.");
      res.send({ message: "All student data appended to files." });
    }
  };

  // Read → Append → Write
  readAndAppend('student_masterinfo.json', masterData, done);
  readAndAppend('student_addressinfo.json', addressData, done);
  readAndAppend('student_educationinfo.json', educationData, done);
  readAndAppend('student_attendanceinfo.json', attendanceData, done);
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



